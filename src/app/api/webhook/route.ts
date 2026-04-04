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

const stripe = getStripe();
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log("Webhook received:", event.type, event.id);

  // Idempotency: skip already-processed events
  const { getRedis } = await import("@/lib/redis");
  const redis = getRedis();
  const idempotencyKey = `webhook:processed:${event.id}`;
  const alreadyProcessed = await redis.get(idempotencyKey);
  if (alreadyProcessed) {
    console.log("Webhook already processed:", event.id);
    return NextResponse.json({ received: true });
  }
  await redis.set(idempotencyKey, "1", "EX", 60 * 60 * 48); // 48h TTL

  // Handle checkout completion (one-time plan purchases — legacy)
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("Checkout completed:", session.id, "type:", session.metadata?.type);

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
          console.error("Shop order webhook: no shipping address found on session", session.id);

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
              console.error(`Shop order ${session.id} stored with status needs_attention — missing shipping address`);

              if (shipping.email) {
                await sendEmail({
                  to: shipping.email,
                  subject: "Action Needed: Your TDF Pro Shop Order",
                  html: `<div style="font-family: -apple-system, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 30px; text-align: center;"><h1 style="font-size: 22px; color: #c87941;">Tour de Fore</h1><p style="color: #555; line-height: 1.6;">We received your payment but couldn't find a shipping address for your order. Please reply to this email or contact us at <a href="mailto:info@tourdefore.com" style="color: #c87941;">info@tourdefore.com</a> with your shipping address so we can get your gear on its way.</p></div>`,
                });
              }
            } catch (storeErr) {
              console.error("Failed to store needs_attention order:", storeErr);
            }
          }
        }

        if (shipping.address && itemsJson) {
          const items = parseOrderItems(itemsJson);
          await resolveVariants(items, "Webhook");

          // Check for unresolved variant IDs — don't partially fulfill
          const validItems = items.filter((i) => i.syncVariantId && i.syncVariantId > 0);
          if (validItems.length < items.length) {
            const droppedCount = items.length - validItems.length;
            console.error(`Webhook: ${droppedCount} item(s) had unresolved syncVariantId`);
            const droppedItems = items.filter((i) => !i.syncVariantId || i.syncVariantId <= 0);
            await sendEmail({
              to: "info@tourdefore.com",
              subject: `ALERT: ${droppedCount} item(s) dropped from order — variant not found`,
              html: `<p>Customer paid for items but variant IDs could not be resolved.</p><p><strong>Session:</strong> ${session.id}</p><p><strong>Customer:</strong> ${shipping.email}</p><p><strong>Dropped items:</strong></p><pre>${JSON.stringify(droppedItems, null, 2)}</pre><p>Manually fulfill or refund these items.</p>`,
            });
          }

          // Create Printful order
          const recipient = buildRecipient(shipping);
          console.log("Creating Printful order for", validItems.length, "items. Shipping:", shipping.name, shipping.address.city, shipping.address.state);
          let printfulResult: { id: number; status: string } | null = null;
          try {
            printfulResult = validItems.length > 0 ? await createPrintfulOrder(
              validItems.map((i) => ({ sync_variant_id: i.syncVariantId, quantity: i.quantity })),
              recipient,
              buildExternalId(session.id)
            ) : null;
          } catch (printfulErr) {
            console.error("Printful order creation failed:", printfulErr);
          }

          console.log("Printful result:", printfulResult ? `ID ${printfulResult.id} Status ${printfulResult.status}` : "FAILED (null)");

          if (!printfulResult) {
            await sendEmail({
              to: "info@tourdefore.com",
              subject: "ALERT: Printful order creation failed",
              html: `<p>A shop order was paid but Printful order creation failed.</p><p><strong>Session ID:</strong> ${session.id}</p><p><strong>Customer email:</strong> ${shipping.email || "unknown"}</p><p>Check logs and retry manually.</p>`,
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
            console.error("Redis order storage failed:", redisErr);
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
              console.error("Confirmation email failed:", emailErr);
            }
          }

          console.log(`Shop order ${session.id} created. Printful: ${printfulResult?.id || "pending"}`);
        }
      } catch (shopErr) {
        console.error("Shop order processing failed:", shopErr);
        // ALWAYS alert on shop order failure — never let a paid order fail silently
        const customerEmail = session.customer_details?.email || "unknown";
        const errDetail = shopErr instanceof Error ? shopErr.message : String(shopErr);
        await sendEmail({
          to: "info@tourdefore.com",
          subject: "CRITICAL: Shop order failed — paid but not fulfilled",
          html: `<p><strong>A customer paid but their order was NOT created in Printful.</strong></p><p><strong>Session:</strong> ${session.id}</p><p><strong>Customer:</strong> ${customerEmail}</p><p><strong>Items:</strong> ${session.metadata?.items || "unknown"}</p><p><strong>Error:</strong> ${errDetail}</p><p>Action required: manually create this order in Printful or refund the customer.</p>`,
        });
      }
    }

    // Subscription payment — use Stripe's actual period end
    const email = session.metadata?.email || session.customer_email;
    if (email && session.subscription) {
      const subId = typeof session.subscription === "string" ? session.subscription : session.subscription.id;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sub = await stripe.subscriptions.retrieve(subId) as any;
        const expiresAt = new Date((sub.current_period_end ?? sub.data?.current_period_end) * 1000);
        await setSubscription(email, subId, expiresAt);
        console.log(`Subscription activated for ${email} (${subId}) until ${expiresAt.toISOString()}`);
      } catch {
        // Fallback if subscription retrieval fails
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 1);
        await setSubscription(email, subId, expiresAt);
        console.log(`Subscription activated for ${email} (${subId}) with fallback expiry`);
      }
    }
  }

  // Handle subscription renewal — use invoice period end
  if (event.type === "invoice.paid") {
    const invoice = event.data.object as Stripe.Invoice;
    const email = invoice.customer_email;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawSub = (invoice as any).subscription;
    const subId = typeof rawSub === "string" ? rawSub : rawSub?.id;
    if (email && subId) {
      // Use invoice line item period end for accurate expiry
      const periodEnd = invoice.lines?.data?.[0]?.period?.end;
      const expiresAt = periodEnd ? new Date(periodEnd * 1000) : new Date();
      if (!periodEnd) expiresAt.setMonth(expiresAt.getMonth() + 1);
      await setSubscription(email, subId, expiresAt);
      console.log(`Subscription renewed for ${email} until ${expiresAt.toISOString()}`);
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
          console.log(`Subscription cancelled for ${customer.email}`);
        }
      } catch { /* silent */ }
    }
  }

  return NextResponse.json({ received: true });
}
