import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// TODO: Add STRIPE_SECRET_KEY to your .env.local file
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder", {
  apiVersion: "2026-02-25.clover",
});

export interface CartItem {
  name: string;
  price: number; // in cents
  quantity: number;
  image?: string;
}

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe not configured. Add STRIPE_SECRET_KEY to .env.local" }, { status: 500 });
  }

  const { items, successUrl, cancelUrl }: { items: CartItem[]; successUrl: string; cancelUrl: string } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: successUrl,
    cancel_url: cancelUrl,
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
  });

  return NextResponse.json({ url: session.url });
}
