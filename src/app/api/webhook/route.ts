import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getPlan, storePlan, storeOrder } from "@/lib/kv";
import { addPlanToUser, setSubscription } from "@/lib/auth";
import { createPrintfulOrder } from "@/lib/printful";
import { getStripe } from "@/lib/stripe";
import { sendEmail } from "@/lib/email";
import {
  parseOrderItems,
  resolveVariants,
  extractShipping,
  buildRecipient,
  buildExternalId,
} from "@/lib/order-utils";
import { createLogger } from "@/lib/logger";

const log = createLogger("webhook");

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  const stripe = getStripe();

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    log.error("Signature verification failed", { err: err instanceof Error ? err.message : String(err) });
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  log.info("Received", { type: event.type, id: event.id });

  // Idempotency: atomic SET NX prevents race condition with concurrent webhook deliveries
  const { getRedis } = await import("@/lib/redis");
  const redis = getRedis();
  const idempotencyKey = `webhook:processed:${event.id}`;
  const wasNew = await redis.set(idempotencyKey, "1", "EX", 60 * 60 * 48, "NX"); // 48h TTL
  if (!wasNew) {
    log.info("Already processed, skipping", { id: event.id });
    return NextResponse.json({ received: true });
  }

  // Handle checkout completion (one-time plan purchases — legacy)
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    log.info("Checkout completed", { sessionId: session.id, type: session.metadata?.type });

    // Legacy per-plan payment
    const planId = session.metadata?.planId;
    const dest = session.metadata?.dest;
    if (planId && dest) {
      const stored = await getPlan(planId);
      if (stored) {
        stored.paid = true;
        stored.paidAt = new Date().toISOString();
        stored.paidDestination = dest as "budget" | "mid" | "premium";
        await storePlan(stored);
        if (stored.inputs?.organizerEmail) {
          await addPlanToUser(stored.inputs.organizerEmail, planId);
        }
      }
    }

    // Shop order — create Printful order
    if (session.metadata?.type === "shop") {
      try {
        // Fetch full session via SDK to get shipping details reliably
        const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ["shipping_details"],
        });
        const shipping = extractShipping(fullSession);
        const itemsJson = session.metadata?.items || fullSession.metadata?.items;

        if (!shipping.address) {
          log.error("No shipping address", { sessionId: session.id });

          // Still store the order so paid orders don't silently disappear
          if (itemsJson) {
            try {
              const items = parseOrderItems(itemsJson);
              await storeOrder({
                id: session.id,
                email: shipping.email,
                items: items.map(i => ({ productId: i.productId, color: i.color, size: i.size, quantity: i.quantity })),
                stripeSessionId: session.id,
                printfulOrderId: null,
                status: "needs_attention",
                createdAt: new Date().toISOString(),
              });
              log.warn("Order stored as needs_attention — missing shipping", { sessionId: session.id });

              if (shipping.email) {
                await sendEmail({
                  to: shipping.email,
                  subject: "Action Needed: Your TDF Pro Shop Order",
                  html: `<div style="font-family: -apple-system, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 30px; text-align: center;"><h1 style="font-size: 22px; color: #c87941;">Tour de Fore</h1><p style="color: #555; line-height: 1.6;">We received your payment but couldn't find a shipping address for your order. Please reply to this email or contact us at <a href="mailto:info@tourdefore.com" style="color: #c87941;">info@tourdefore.com</a> with your shipping address so we can get your gear on its way.</p></div>`,
                });
              }
            } catch (storeErr) {
              log.error("Failed to store needs_attention order", { err: storeErr instanceof Error ? storeErr.message : String(storeErr) });
            }
          }
        }

        if (shipping.address && itemsJson) {
          const items = parseOrderItems(itemsJson);
          await resolveVariants(items, "Webhook");

          // Check for unresolved variant IDs
          const validItems = items.filter((i) => i.syncVariantId && i.syncVariantId > 0);
          const droppedItems = items.filter((i) => !i.syncVariantId || i.syncVariantId <= 0);
          if (droppedItems.length > 0) {
            log.error("Unresolved variant IDs", { sessionId: session.id, dropped: droppedItems.length });
            await sendEmail({
              to: "info@tourdefore.com",
              subject: `ALERT: ${droppedItems.length} item(s) could not be resolved — manual fulfillment needed`,
              html: `<p>Customer paid for items but variant IDs could not be resolved.</p><p><strong>Session:</strong> ${session.id}</p><p><strong>Customer:</strong> ${shipping.email}</p><p><strong>Unresolved items:</strong></p><pre>${JSON.stringify(droppedItems, null, 2)}</pre><p>${validItems.length > 0 ? "Resolved items are being fulfilled. Manually fulfill or refund the unresolved items." : "NO items could be resolved. Entire order needs manual fulfillment or refund."}</p>`,
              critical: true,
            });
            // Also notify the customer if ALL items failed
            if (validItems.length === 0 && shipping.email) {
              await sendEmail({
                to: shipping.email,
                subject: "Issue With Your TDF Pro Shop Order",
                html: `<div style="font-family: -apple-system, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 30px; text-align: center;"><h1 style="font-size: 22px; color: #c87941;">Tour de Fore</h1><p style="color: #555; line-height: 1.6;">We received your payment but encountered an issue processing your order. Our team has been notified and will reach out shortly to resolve this.</p><p style="color: #999; font-size: 13px;">Questions? <a href="mailto:info@tourdefore.com" style="color: #c87941;">info@tourdefore.com</a></p></div>`,
              });
            }
          }

          // Create Printful order
          const recipient = buildRecipient(shipping);
          if (!recipient) {
            log.error("buildRecipient returned null — incomplete address", { sessionId: session.id });
          }
          log.info("Creating Printful order", { items: validItems.length, name: shipping.name, city: shipping.address?.city, state: shipping.address?.state });
          let printfulResult: { id: number; status: string } | null = null;
          try {
            printfulResult = (validItems.length > 0 && recipient) ? await createPrintfulOrder(
              validItems.map((i) => ({ sync_variant_id: i.syncVariantId, quantity: i.quantity })),
              recipient,
              buildExternalId(session.id)
            ) : null;
          } catch (printfulErr) {
            log.error("Printful order creation failed", { err: printfulErr instanceof Error ? printfulErr.message : String(printfulErr) });
          }

          log.info("Printful result", { orderId: printfulResult?.id || null, status: printfulResult?.status || "FAILED" });

          if (!printfulResult) {
            await sendEmail({
              to: "info@tourdefore.com",
              subject: "ALERT: Printful order creation failed",
              html: `<p>A shop order was paid but Printful order creation failed.</p><p><strong>Session ID:</strong> ${session.id}</p><p><strong>Customer email:</strong> ${shipping.email || "unknown"}</p><p>Check logs and retry manually.</p>`,
              critical: true,
            });
          }

          // Store order in Redis (use session ID for idempotency)
          try {
            await storeOrder({
              id: session.id,
              email: shipping.email,
              items: items.map((i) => ({ productId: i.productId, color: i.color, size: i.size, quantity: i.quantity })),
              stripeSessionId: session.id,
              printfulOrderId: printfulResult?.id || null,
              status: printfulResult ? "submitted" : "payment_received",
              createdAt: new Date().toISOString(),
            });
          } catch (redisErr) {
            log.error("Redis order storage failed", { err: redisErr instanceof Error ? redisErr.message : String(redisErr) });
          }

          // Send confirmation email with product images
          if (shipping.email) {
            try {
              const { getProductById } = await import("@/lib/printful");
              const itemRows = await Promise.all(items.map(async (i) => {
                const product = await getProductById(i.productId);
                const imgUrl = product?.colorPreviews?.[i.color] || product?.thumbnailUrl || "";
                const name = product?.name || i.productId;
                return `<tr><td style="padding: 12px 0; border-bottom: 1px solid #eee;">${imgUrl ? `<img src="${imgUrl}" alt="${name}" style="width: 80px; height: 80px; object-fit: contain; border-radius: 8px;" />` : ""}</td><td style="padding: 12px 16px; border-bottom: 1px solid #eee; vertical-align: middle;"><strong style="color: #333;">${name}</strong><br/><span style="color: #888; font-size: 13px;">${i.color}${i.size ? ` / ${i.size}` : ""} &times; ${i.quantity}</span></td></tr>`;
              }));

              await sendEmail({
                to: shipping.email,
                subject: "Your TDF Pro Shop Order is Confirmed",
                html: `<div style="font-family: -apple-system, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 30px; text-align: center;"><img src="https://tourdefore.com/icon-fancy.png" alt="Tour de Fore" style="width: 64px; height: 64px; margin-bottom: 16px;" /><h1 style="font-size: 22px; color: #c87941; margin: 0 0 8px; font-weight: 600;">Tour de Fore</h1><h2 style="font-size: 18px; margin: 0 0 24px; color: #333; font-weight: 500;">Order Confirmed</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; text-align: left;">${itemRows.join("")}</table><p style="color: #555; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">Your gear is being prepared. You'll get a shipping confirmation with tracking once it ships.</p><hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" /><p style="color: #999; font-size: 12px;">Questions? Contact us at <a href="mailto:info@tourdefore.com" style="color: #c87941;">info@tourdefore.com</a></p><p style="color: #bbb; font-size: 11px; margin-top: 16px;">Tour de Fore Pro Shop</p></div>`,
              });
            } catch (emailErr) {
              log.error("Confirmation email failed", { err: emailErr instanceof Error ? emailErr.message : String(emailErr) });
            }
          }

          log.info("Shop order complete", { sessionId: session.id, printfulId: printfulResult?.id || "pending" });
        }
      } catch (shopErr) {
        log.error("Shop order processing failed", { err: shopErr instanceof Error ? shopErr.message : String(shopErr) });
        // ALWAYS alert on shop order failure — never let a paid order fail silently
        const customerEmail = session.customer_details?.email || "unknown";
        const errDetail = shopErr instanceof Error ? shopErr.message : String(shopErr);
        await sendEmail({
          to: "info@tourdefore.com",
          subject: "CRITICAL: Shop order failed — paid but not fulfilled",
          html: `<p><strong>A customer paid but their order was NOT created in Printful.</strong></p><p><strong>Session:</strong> ${session.id}</p><p><strong>Customer:</strong> ${customerEmail}</p><p><strong>Items:</strong> ${session.metadata?.items || "unknown"}</p><p><strong>Error:</strong> ${errDetail}</p><p>Action required: manually create this order in Printful or refund the customer.</p>`,
          critical: true,
        });
      }
    }

    // Subscription payment — use Stripe's actual period end
    const email = session.metadata?.email || session.customer_email;
    if (email && session.subscription) {
      const subId = typeof session.subscription === "string" ? session.subscription : session.subscription.id;
      try {
        const sub = await stripe.subscriptions.retrieve(subId);
        // Stripe v20 moved current_period_end to items — fall back to item-level period
        const periodEnd = sub.items?.data?.[0]?.current_period_end;
        const expiresAt = periodEnd ? new Date(periodEnd * 1000) : new Date();
        if (!periodEnd) expiresAt.setMonth(expiresAt.getMonth() + 1);
        await setSubscription(email, subId, expiresAt);
        log.info("Subscription activated", { email, subId, expiresAt: expiresAt.toISOString() });
      } catch {
        // Fallback if subscription retrieval fails
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 1);
        await setSubscription(email, subId, expiresAt);
        log.warn("Subscription activated with fallback expiry", { email, subId });
      }
    }
  }

  // Handle subscription renewal — use invoice period end
  if (event.type === "invoice.paid") {
    const invoice = event.data.object as Stripe.Invoice;
    const email = invoice.customer_email;
    const rawSub = (invoice as unknown as { subscription: string | { id: string } | null }).subscription;
    const subId = typeof rawSub === "string" ? rawSub : rawSub?.id;
    if (email && subId) {
      // Use invoice line item period end for accurate expiry
      const periodEnd = invoice.lines?.data?.[0]?.period?.end;
      const expiresAt = periodEnd ? new Date(periodEnd * 1000) : new Date();
      if (!periodEnd) expiresAt.setMonth(expiresAt.getMonth() + 1);
      await setSubscription(email, subId, expiresAt);
      log.info("Subscription renewed", { email, expiresAt: expiresAt.toISOString() });
    }
  }

  // Handle subscription cancellation
  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;
    // Find customer email from Stripe
    if (sub.customer) {
      try {
        const customer = await stripe.customers.retrieve(sub.customer as string);
        if ("email" in customer && customer.email) {
          const { cancelSubscription } = await import("@/lib/auth");
          await cancelSubscription(customer.email);
          log.info("Subscription cancelled", { email: customer.email });
        }
      } catch { /* silent */ }
    }
  }

  // Handle failed charges — notify customer
  if (event.type === "charge.failed") {
    const charge = event.data.object as Stripe.Charge;
    const email = charge.billing_details?.email || charge.receipt_email;
    if (email) {
      await sendEmail({
        to: email,
        subject: "Payment Failed — Tour de Fore",
        html: `<div style="font-family: -apple-system, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 30px; text-align: center;"><h1 style="font-size: 22px; color: #c87941;">Tour de Fore</h1><p style="color: #555; line-height: 1.6;">Your payment could not be processed. Please try again or use a different payment method.</p><p style="color: #999; font-size: 13px;">If you believe this is an error, contact us at <a href="mailto:info@tourdefore.com" style="color: #c87941;">info@tourdefore.com</a>.</p></div>`,
      });
    }
    await sendEmail({
      to: "info@tourdefore.com",
      subject: `Payment failed: ${email || "unknown customer"}`,
      html: `<p><strong>Charge ID:</strong> ${charge.id}</p><p><strong>Customer:</strong> ${email || "unknown"}</p><p><strong>Failure reason:</strong> ${charge.failure_message || "unknown"}</p>`,
      critical: true,
    });
  }

  return NextResponse.json({ received: true });
}
