import { NextRequest, NextResponse } from "next/server";
import { createPrintfulOrder } from "@/lib/printful";
import { storeOrder, getOrder } from "@/lib/kv";
import { getStripe } from "@/lib/stripe";
import { sendEmail } from "@/lib/email";
import {
  parseOrderItems,
  resolveVariants,
  extractShipping,
  buildRecipient,
  buildExternalId,
} from "@/lib/order-utils";

export async function GET(req: NextRequest) {
  // Vercel cron sends this header; also accept manual calls with the secret
  const cronSecret = req.headers.get("authorization")?.replace("Bearer ", "");
  const isCron = req.headers.get("x-vercel-cron") === "true"
    || cronSecret === process.env.CRON_SECRET;

  if (!isCron) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: { sessionId: string; status: string; detail?: string }[] = [];

  try {
    // Look back 48 hours for any paid shop orders
    const since = Math.floor(Date.now() / 1000) - 48 * 60 * 60;
    const stripe = getStripe();
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

      // Parse items and resolve variants against live catalog
      const items = parseOrderItems(itemsJson);
      await resolveVariants(items, "Cron");

      // Get shipping — retrieve full session
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fullSession = await stripe.checkout.sessions.retrieve(session.id) as any;
      const shipping = extractShipping(fullSession);

      if (!shipping.address) {
        results.push({ sessionId: session.id, status: "needs_attention", detail: "No shipping address" });
        await storeOrder({
          id: session.id, email: shipping.email,
          items: items.map(i => ({ productId: i.productId, color: i.color, size: i.size, quantity: i.quantity })),
          stripeSessionId: session.id, printfulOrderId: null,
          status: "needs_attention", createdAt: new Date().toISOString(),
        });
        continue;
      }

      // Filter out unresolved variants
      const validItems = items.filter((i) => i.syncVariantId && i.syncVariantId > 0);
      if (validItems.length === 0) {
        results.push({ sessionId: session.id, status: "needs_attention", detail: "No valid variant IDs" });
        continue;
      }

      // Create Printful order
      try {
        const printfulResult = await createPrintfulOrder(
          validItems.map(i => ({ sync_variant_id: i.syncVariantId, quantity: i.quantity })),
          buildRecipient(shipping),
          buildExternalId(session.id)
        );

        await storeOrder({
          id: session.id, email: shipping.email,
          items: items.map(i => ({ productId: i.productId, color: i.color, size: i.size, quantity: i.quantity })),
          stripeSessionId: session.id,
          printfulOrderId: printfulResult?.id || null,
          status: printfulResult ? "submitted" : "payment_received",
          createdAt: new Date().toISOString(),
        });

        // Send alert if this was a rescue (webhook had failed)
        if (printfulResult) {
          await sendEmail({
            to: "info@tourdefore.com",
            subject: "Cron rescued a missed order",
            html: `<p>The hourly sync caught a paid order that the webhook missed.</p><p><strong>Session:</strong> ${session.id}</p><p><strong>Printful Order:</strong> #${printfulResult.id}</p><p><strong>Customer:</strong> ${shipping.email}</p>`,
          });
        }

        results.push({ sessionId: session.id, status: "rescued", detail: `Printful #${printfulResult?.id}` });
      } catch (err) {
        results.push({ sessionId: session.id, status: "printful_error", detail: err instanceof Error ? err.message : String(err) });
      }
    }
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Sync failed" }, { status: 500 });
  }

  // Alert on any failures that need manual attention
  const failures = results.filter(r => r.status === "printful_error" || r.status === "needs_attention");
  if (failures.length > 0) {
    await sendEmail({
      to: "info@tourdefore.com",
      subject: `ALERT: ${failures.length} order(s) need attention`,
      html: `<p>The cron sync found paid orders that could not be fulfilled:</p><pre>${JSON.stringify(failures, null, 2)}</pre><p>Check Stripe dashboard and manually create Printful orders or refund.</p>`,
    });
  }

  return NextResponse.json({ checked: results.length, rescued: results.filter(r => r.status === "rescued").length, results });
}
