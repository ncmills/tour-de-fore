import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getPlan, storePlan } from "@/lib/kv";
import { addPlanToUser, setSubscription } from "@/lib/auth";

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
