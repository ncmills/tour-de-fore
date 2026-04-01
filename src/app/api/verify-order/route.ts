import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createPrintfulOrder, findVariant } from "@/lib/printful";
import { storeOrder, getOrder } from "@/lib/kv";

const stripe = new Stripe((process.env.STRIPE_SECRET_KEY ?? "").trim());

// Called by the success page to ensure this specific order made it to Printful
export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    // Already processed?
    const existing = await getOrder(sessionId);
    if (existing?.printfulOrderId && existing.status === "submitted") {
      return NextResponse.json({ status: "already_submitted", printfulOrderId: existing.printfulOrderId });
    }

    // Fetch session from Stripe
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = await stripe.checkout.sessions.retrieve(sessionId) as any;

    if (session.payment_status !== "paid" || session.metadata?.type !== "shop") {
      return NextResponse.json({ status: "not_shop_order" });
    }

    const itemsJson = session.metadata?.items;
    if (!itemsJson) {
      return NextResponse.json({ status: "no_items" });
    }

    const rawItems = JSON.parse(itemsJson) as { s?: number; q?: number; p?: string; c?: string; z?: string; syncVariantId?: number; quantity?: number; productId?: string; color?: string; size?: string }[];
    const items = rawItems.map(i => ({
      syncVariantId: i.syncVariantId ?? i.s ?? 0,
      quantity: i.quantity ?? i.q ?? 1,
      productId: i.productId ?? i.p ?? "",
      color: i.color ?? i.c ?? "",
      size: i.size ?? i.z,
    }));

    for (const item of items) {
      if (!item.syncVariantId && item.productId && item.color) {
        const variant = findVariant(item.productId, item.color, item.size);
        if (variant) item.syncVariantId = variant.syncVariantId;
      }
    }

    const shippingObj = session.collected_information?.shipping_details
      || session.shipping_details || session.shipping;
    const customerAddr = session.customer_details?.address;
    const shippingAddress = shippingObj?.address || (customerAddr ? {
      line1: customerAddr.line1, line2: customerAddr.line2,
      city: customerAddr.city, state: customerAddr.state,
      country: customerAddr.country, postal_code: customerAddr.postal_code,
    } : null);
    const shippingName = shippingObj?.name || session.customer_details?.name || "Customer";
    const customerEmail = session.customer_details?.email || "";

    if (!shippingAddress?.line1) {
      return NextResponse.json({ status: "no_shipping" });
    }

    const printfulResult = await createPrintfulOrder(
      items.map(i => ({ sync_variant_id: i.syncVariantId, quantity: i.quantity })),
      {
        name: shippingName,
        address1: shippingAddress.line1 || "",
        address2: shippingAddress.line2 || undefined,
        city: shippingAddress.city || "",
        state_code: shippingAddress.state || "",
        country_code: shippingAddress.country || "US",
        zip: shippingAddress.postal_code || "",
        email: customerEmail,
      },
      `tdf-${sessionId}`
    );

    await storeOrder({
      id: sessionId, email: customerEmail,
      items: items.map(i => ({ productId: i.productId, color: i.color, size: i.size, quantity: i.quantity })),
      stripeSessionId: sessionId,
      printfulOrderId: printfulResult?.id || null,
      status: printfulResult ? "submitted" : "payment_received",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ status: "submitted", printfulOrderId: printfulResult?.id });
  } catch (err) {
    console.error("verify-order error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed" }, { status: 500 });
  }
}
