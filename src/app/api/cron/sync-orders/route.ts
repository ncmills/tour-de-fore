import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createPrintfulOrder, findVariant } from "@/lib/printful";
import { storeOrder, getOrder } from "@/lib/kv";
import { Resend } from "resend";

const stripe = new Stripe((process.env.STRIPE_SECRET_KEY ?? "").trim());

export async function GET(req: NextRequest) {
  // Vercel cron sends this header; also accept manual calls with the secret
  const cronSecret = req.headers.get("authorization")?.replace("Bearer ", "");
  const isCron = req.headers.get("x-vercel-cron") === "true"
    || cronSecret === process.env.CRON_SECRET;

  if (!isCron && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: { sessionId: string; status: string; detail?: string }[] = [];

  try {
    // Look back 48 hours for any paid shop orders
    const since = Math.floor(Date.now() / 1000) - 48 * 60 * 60;
    const sessions = await stripe.checkout.sessions.list({
      limit: 50,
      created: { gte: since },
    });

    for (const session of sessions.data) {
      if (session.payment_status !== "paid" || session.metadata?.type !== "shop") continue;

      // Already successfully processed?
      const existing = await getOrder(session.id);
      if (existing?.printfulOrderId && existing.status === "submitted") {
        results.push({ sessionId: session.id, status: "already_submitted" });
        continue;
      }

      const itemsJson = session.metadata?.items;
      if (!itemsJson) {
        results.push({ sessionId: session.id, status: "skipped", detail: "No items metadata" });
        continue;
      }

      // Parse items
      const rawItems = JSON.parse(itemsJson) as { s?: number; q?: number; p?: string; c?: string; z?: string; syncVariantId?: number; quantity?: number; productId?: string; color?: string; size?: string }[];
      const items = rawItems.map(i => ({
        syncVariantId: i.syncVariantId ?? i.s ?? 0,
        quantity: i.quantity ?? i.q ?? 1,
        productId: i.productId ?? i.p ?? "",
        color: i.color ?? i.c ?? "",
        size: i.size ?? i.z,
      }));

      // Resolve missing syncVariantIds
      for (const item of items) {
        if (!item.syncVariantId && item.productId && item.color) {
          const variant = findVariant(item.productId, item.color, item.size);
          if (variant) item.syncVariantId = variant.syncVariantId;
        }
      }

      // Get shipping — retrieve full session
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fullSession = await stripe.checkout.sessions.retrieve(session.id) as any;
      const shippingObj = fullSession.collected_information?.shipping_details
        || fullSession.shipping_details
        || fullSession.shipping;
      const customerAddr = fullSession.customer_details?.address;
      const shippingAddress = shippingObj?.address || (customerAddr ? {
        line1: customerAddr.line1, line2: customerAddr.line2,
        city: customerAddr.city, state: customerAddr.state,
        country: customerAddr.country, postal_code: customerAddr.postal_code,
      } : null);
      const shippingName = shippingObj?.name || fullSession.customer_details?.name || "Customer";
      const customerEmail = fullSession.customer_details?.email || "";

      if (!shippingAddress?.line1) {
        results.push({ sessionId: session.id, status: "needs_attention", detail: "No shipping address" });
        await storeOrder({
          id: session.id, email: customerEmail,
          items: items.map(i => ({ productId: i.productId, color: i.color, size: i.size, quantity: i.quantity })),
          stripeSessionId: session.id, printfulOrderId: null,
          status: "needs_attention", createdAt: new Date().toISOString(),
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
            email: customerEmail,
          },
          `tdf-cron-${session.id.slice(-10)}`
        );

        await storeOrder({
          id: session.id, email: customerEmail,
          items: items.map(i => ({ productId: i.productId, color: i.color, size: i.size, quantity: i.quantity })),
          stripeSessionId: session.id,
          printfulOrderId: printfulResult?.id || null,
          status: printfulResult ? "submitted" : "payment_received",
          createdAt: new Date().toISOString(),
        });

        // Send alert if this was a rescue (webhook had failed)
        if (printfulResult && process.env.RESEND_API_KEY) {
          try {
            const resend = new Resend(process.env.RESEND_API_KEY);
            await resend.emails.send({
              from: "Tour de Fore <noreply@tourdefore.com>",
              to: "info@tourdefore.com",
              subject: "Cron rescued a missed order",
              html: `<p>The hourly sync caught a paid order that the webhook missed.</p><p><strong>Session:</strong> ${session.id}</p><p><strong>Printful Order:</strong> #${printfulResult.id}</p><p><strong>Customer:</strong> ${customerEmail}</p>`,
            });
          } catch { /* non-critical */ }
        }

        results.push({ sessionId: session.id, status: "rescued", detail: `Printful #${printfulResult?.id}` });
      } catch (err) {
        results.push({ sessionId: session.id, status: "printful_error", detail: err instanceof Error ? err.message : String(err) });
      }
    }
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Sync failed" }, { status: 500 });
  }

  return NextResponse.json({ checked: results.length, rescued: results.filter(r => r.status === "rescued").length, results });
}
