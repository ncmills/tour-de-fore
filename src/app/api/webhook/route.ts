import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getPlan, storePlan, storeOrder } from "@/lib/kv";
import { addPlanToUser, setSubscription } from "@/lib/auth";
import { createPrintfulOrder } from "@/lib/printful";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder");
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

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

  // Handle checkout completion (one-time plan purchases — legacy)
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

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
        const customerEmail = session.customer_details?.email || "";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sessionAny = session as any;
        // Stripe SDK v20+: shipping_details moved to collected_information.shipping_details
        const shipping = (sessionAny.collected_information?.shipping_details || sessionAny.shipping_details || sessionAny.shipping) as { name?: string; address?: { line1?: string; line2?: string; city?: string; state?: string; country?: string; postal_code?: string } } | undefined;
        const itemsJson = session.metadata.items;

        if (!shipping?.address) {
          console.error("Shop order webhook: no shipping address found on session", session.id);
        }

        if (shipping?.address && itemsJson) {
          const rawItems = JSON.parse(itemsJson) as ({ syncVariantId?: number; quantity?: number; productId?: string; color?: string; size?: string; s?: number; q?: number; p?: string; c?: string; z?: string })[];
          const items = rawItems.map(i => ({
            syncVariantId: i.syncVariantId ?? i.s ?? 0,
            quantity: i.quantity ?? i.q ?? 1,
            productId: i.productId ?? i.p ?? "",
            color: i.color ?? i.c ?? "",
            size: i.size ?? i.z,
          }));

          // Create Printful order
          let printfulResult: { id: number; status: string } | null = null;
          try {
            printfulResult = await createPrintfulOrder(
              items.map((i) => ({ sync_variant_id: i.syncVariantId, quantity: i.quantity })),
              {
                name: shipping.name || "Customer",
                address1: shipping.address.line1 || "",
                address2: shipping.address.line2 || undefined,
                city: shipping.address.city || "",
                state_code: shipping.address.state || "",
                country_code: shipping.address.country || "US",
                zip: shipping.address.postal_code || "",
                email: customerEmail,
              },
              session.id
            );
          } catch (printfulErr) {
            console.error("Printful order creation failed:", printfulErr);
          }

          // Store order in Redis (use session ID for idempotency)
          const orderId = session.id;
          try {
            await storeOrder({
              id: orderId,
              email: customerEmail,
              items: items.map((i) => ({ productId: i.productId, color: i.color, size: i.size, quantity: i.quantity })),
              stripeSessionId: session.id,
              printfulOrderId: printfulResult?.id || null,
              status: printfulResult ? "submitted" : "payment_received",
              createdAt: new Date().toISOString(),
            });
          } catch (redisErr) {
            console.error("Redis order storage failed:", redisErr);
          }

          // Send confirmation email
          if (customerEmail && process.env.RESEND_API_KEY) {
            try {
              const resend = new Resend(process.env.RESEND_API_KEY);
              await resend.emails.send({
                from: "Tour de Fore <noreply@tourdefore.com>",
                to: customerEmail,
                subject: "Your TDF Pro Shop Order is Confirmed",
                html: `
                  <div style="font-family: -apple-system, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 30px; text-align: center;">
                    <h1 style="font-size: 24px; color: #c87941; margin: 0 0 20px;">Tour de Fore</h1>
                    <h2 style="font-size: 20px; margin: 0 0 16px;">Order Confirmed</h2>
                    <p style="color: #555;">Your gear is being prepared. You'll get a shipping confirmation with tracking once it ships.</p>
                    <p style="color: #999; font-size: 12px; margin-top: 30px;">Sent from Tour de Fore Pro Shop</p>
                  </div>
                `,
              });
            } catch (emailErr) {
              console.error("Confirmation email failed:", emailErr);
            }
          }

          console.log(`Shop order ${orderId} created. Printful: ${printfulResult?.id || "pending"}`);
        }
      } catch (shopErr) {
        console.error("Shop order processing failed:", shopErr);
      }
    }

    // Subscription payment
    const email = session.metadata?.email || session.customer_email;
    if (email && session.subscription) {
      const subId = typeof session.subscription === "string" ? session.subscription : session.subscription.id;
      const expiresAt = new Date();
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      await setSubscription(email, subId, expiresAt);
      console.log(`Subscription activated for ${email} (${subId})`);
    }
  }

  // Handle subscription renewal
  if (event.type === "invoice.paid") {
    const invoice = event.data.object as Stripe.Invoice;
    const email = invoice.customer_email;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawSub = (invoice as any).subscription;
    const subId = typeof rawSub === "string" ? rawSub : rawSub?.id;
    if (email && subId) {
      const expiresAt = new Date();
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      await setSubscription(email, subId, expiresAt);
      console.log(`Subscription renewed for ${email}`);
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
