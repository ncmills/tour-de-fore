import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getPlan, storePlan } from "@/lib/kv";
import { addPlanToUser } from "@/lib/auth";

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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const planId = session.metadata?.planId;
    const dest = session.metadata?.dest;

    if (planId && dest) {
      const stored = await getPlan(planId);
      if (stored) {
        // Mark as paid server-side (authoritative — not trusting redirect)
        stored.paid = true;
        stored.paidAt = new Date().toISOString();
        stored.paidDestination = dest as "budget" | "mid" | "premium";
        await storePlan(stored);

        // Associate with user profile
        if (stored.inputs?.organizerEmail) {
          await addPlanToUser(stored.inputs.organizerEmail, planId);
        }

        console.log(`Plan ${planId} marked as paid via webhook (dest: ${dest})`);
      }
    }
  }

  return NextResponse.json({ received: true });
}
