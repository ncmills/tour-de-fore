import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getProductById } from "@/lib/printful";

interface CheckoutItem {
  productId: string; // our internal product ID
  color: string;
  size?: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const { items }: { items: CheckoutItem[] } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items" }, { status: 400 });
    }
    if (items.length > 20) {
      return NextResponse.json({ error: "Too many items (max 20)" }, { status: 400 });
    }
    for (const item of items) {
      if (!item.quantity || item.quantity < 1 || item.quantity > 10) {
        return NextResponse.json({ error: `Invalid quantity for ${item.productId} (1-10)` }, { status: 400 });
      }
    }

    // Validate items against server-side catalog (no client-sent prices)
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const orderItems: { productId: string; color: string; size?: string; quantity: number; syncVariantId: number }[] = [];

    for (const item of items) {
      const product = await getProductById(item.productId);
      if (!product) {
        return NextResponse.json({ error: `Unknown product: ${item.productId}` }, { status: 400 });
      }

      const variant = product.variants.find(
        (v) => v.color === item.color && (item.size ? v.size === item.size : true)
      );
      if (!variant) {
        return NextResponse.json({ error: `Invalid variant: ${item.productId} ${item.color} ${item.size}` }, { status: 400 });
      }

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: `${item.color}${item.size ? ` / ${item.size}` : ""}`,
            images: [product.colorPreviews[item.color] || product.thumbnailUrl],
          },
          unit_amount: product.price,
        },
        quantity: item.quantity,
      });

      orderItems.push({
        productId: item.productId,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        syncVariantId: variant.syncVariantId,
      });
    }

    const origin = req.headers.get("origin") || "https://tourdefore.com";

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop`,
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      automatic_tax: { enabled: true },
      consent_collection: {
        terms_of_service: "required",
      },
      custom_text: {
        terms_of_service_acceptance: {
          message: "All sales are final. No returns, exchanges, or refunds.",
        },
      },
      metadata: {
        site: "tdf",
        type: "shop",
        items: JSON.stringify(orderItems.map(i => ({ s: i.syncVariantId, q: i.quantity, p: i.productId, c: i.color, z: i.size }))),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
