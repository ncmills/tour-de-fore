import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createPrintfulOrder, findVariant } from "@/lib/printful";
import { storeOrder, getOrder } from "@/lib/kv";

const stripe = new Stripe((process.env.STRIPE_SECRET_KEY ?? "").trim());

// Shared secret to protect this endpoint — set SYNC_ORDERS_SECRET in env, or falls back to first 16 chars of Stripe key
const SYNC_SECRET = process.env.SYNC_ORDERS_SECRET || (process.env.STRIPE_SECRET_KEY ?? "").trim().slice(0, 16);

export async function POST(req: NextRequest) {
  // Auth check
  const auth = req.headers.get("x-sync-secret") || new URL(req.url).searchParams.get("secret");
  if (!auth || auth !== SYNC_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: { sessionId: string; status: string; detail?: string }[] = [];

  try {
    // Fetch recent paid checkout sessions with shop metadata (last 48h)
    const since = Math.floor(Date.now() / 1000) - 48 * 60 * 60;
    const sessions = await stripe.checkout.sessions.list({
      limit: 50,
      created: { gte: since },
    });

    for (const session of sessions.data) {
      // Only process paid shop orders
      if (session.payment_status !== "paid" || session.metadata?.type !== "shop") {
        continue;
      }

      // Check if we already have a successful order stored
      const existing = await getOrder(session.id);
      if (existing && existing.printfulOrderId && existing.status === "submitted") {
        results.push({ sessionId: session.id, status: "already_submitted", detail: `Printful #${existing.printfulOrderId}` });
        continue;
      }

      // Parse items from metadata
      const itemsJson = session.metadata?.items;
      if (!itemsJson) {
        results.push({ sessionId: session.id, status: "skipped", detail: "No items metadata" });
        continue;
      }

      const rawItems = JSON.parse(itemsJson) as { s?: number; q?: number; p?: string; c?: string; z?: string; syncVariantId?: number; quantity?: number; productId?: string; color?: string; size?: string }[];
      const items = rawItems.map(i => ({
        syncVariantId: i.syncVariantId ?? i.s ?? 0,
        quantity: i.quantity ?? i.q ?? 1,
        productId: i.productId ?? i.p ?? "",
        color: i.color ?? i.c ?? "",
        size: i.size ?? i.z,
      }));

      // Resolve any missing syncVariantIds from the catalog
      for (const item of items) {
        if (!item.syncVariantId && item.productId && item.color) {
          const variant = findVariant(item.productId, item.color, item.size);
          if (variant) item.syncVariantId = variant.syncVariantId;
        }
      }

      // Get shipping address — try multiple locations
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["shipping_details"],
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rawFull = fullSession as any;
      const shipping = (rawFull.collected_information?.shipping_details
        || rawFull.shipping_details
        || rawFull.shipping) as { name?: string; address?: { line1?: string; line2?: string; city?: string; state?: string; country?: string; postal_code?: string } } | undefined;

      const customerAddress = fullSession.customer_details?.address;
      const shippingAddress = shipping?.address || (customerAddress ? {
        line1: customerAddress.line1 ?? undefined,
        line2: customerAddress.line2 ?? undefined,
        city: customerAddress.city ?? undefined,
        state: customerAddress.state ?? undefined,
        country: customerAddress.country ?? undefined,
        postal_code: customerAddress.postal_code ?? undefined,
      } : undefined);
      const shippingName = shipping?.name || fullSession.customer_details?.name || "Customer";

      if (!shippingAddress?.line1) {
        results.push({ sessionId: session.id, status: "needs_attention", detail: "No shipping address" });

        await storeOrder({
          id: session.id,
          email: fullSession.customer_details?.email || "",
          items: items.map(i => ({ productId: i.productId, color: i.color, size: i.size, quantity: i.quantity })),
          stripeSessionId: session.id,
          printfulOrderId: null,
          status: "needs_attention",
          createdAt: new Date().toISOString(),
        });
        continue;
      }

      // Create Printful order
      try {
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
            email: fullSession.customer_details?.email || "",
          },
          `tdf-sync-${session.id.slice(-10)}`
        );

        await storeOrder({
          id: session.id,
          email: fullSession.customer_details?.email || "",
          items: items.map(i => ({ productId: i.productId, color: i.color, size: i.size, quantity: i.quantity })),
          stripeSessionId: session.id,
          printfulOrderId: printfulResult?.id || null,
          status: printfulResult ? "submitted" : "payment_received",
          createdAt: new Date().toISOString(),
        });

        results.push({ sessionId: session.id, status: "synced", detail: `Printful #${printfulResult?.id}` });
      } catch (err) {
        results.push({ sessionId: session.id, status: "printful_error", detail: err instanceof Error ? err.message : String(err) });
      }
    }
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Sync failed" }, { status: 500 });
  }

  return NextResponse.json({ synced: results.length, results });
}
