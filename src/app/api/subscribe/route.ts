import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getSessionEmail } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder");

/**
 * Creates a Stripe Checkout session for the $199/year "Become a Devil" subscription.
 */
export async function POST(req: NextRequest) {
  try {
    const email = await getSessionEmail();
    if (!email) {
      return NextResponse.json({ error: "Sign in first" }, { status: 401 });
    }

    const { returnUrl } = await req.json().catch(() => ({}));
    const origin = req.headers.get("origin") || "https://tourdefore.com";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Tour de Fore — Devil Membership",
              description: "Unlimited trip plans with full venue names, booking links, and detailed itineraries for 1 year.",
            },
            unit_amount: 19900, // $199
            recurring: { interval: "year" },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: returnUrl || `${origin}/my-trips`,
      metadata: { email },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Subscription checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
