import { NextRequest, NextResponse } from "next/server";
import { createPrintfulOrder } from "@/lib/printful";
import { storeOrder, getOrder } from "@/lib/kv";
import { getStripe } from "@/lib/stripe";
import {
  parseOrderItems,
  resolveVariants,
  extractShipping,
  buildRecipient,
  buildExternalId,
} from "@/lib/order-utils";

// Called by the success page to ensure this specific order made it to Printful
export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
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

    const items = parseOrderItems(itemsJson);

    // Only resolve items that don't already have a syncVariantId
    for (const item of items) {
      if (!item.syncVariantId && item.productId && item.color) {
        const { findVariant } = await import("@/lib/printful");
        const variant = await findVariant(item.productId, item.color, item.size);
        if (variant) item.syncVariantId = variant.syncVariantId;
      }
    }

    const shipping = extractShipping(session);

    if (!shipping.address) {
      return NextResponse.json({ status: "no_shipping" });
    }

    const validItems = items.filter((i) => i.syncVariantId && i.syncVariantId > 0);
    if (validItems.length === 0) {
      return NextResponse.json({ status: "error", message: "No valid variants" }, { status: 400 });
    }

    const printfulResult = await createPrintfulOrder(
      validItems.map(i => ({ sync_variant_id: i.syncVariantId, quantity: i.quantity })),
      buildRecipient(shipping),
      buildExternalId(sessionId)
    );

    await storeOrder({
      id: sessionId, email: shipping.email,
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
