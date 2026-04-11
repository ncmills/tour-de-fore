import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { sendEmail } from "@/lib/email";
import { fulfillShopOrder, type FulfillResult } from "@/lib/shop-fulfillment";

// Runs every 5 minutes via vercel.json cron. Also callable manually with
// Authorization: Bearer $CRON_SECRET for debugging.
// This is the safety net for shop fulfillment — if a customer closes their
// browser before the success page runs OrderVerifier, this catches the gap.
export async function GET(req: NextRequest) {
  const cronSecret = req.headers.get("authorization")?.replace("Bearer ", "");
  const isCron =
    req.headers.get("x-vercel-cron") === "true" ||
    (!!process.env.CRON_SECRET && cronSecret === process.env.CRON_SECRET);

  if (!isCron) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const flat: Array<{ sessionId: string } & FulfillResult> = [];

  try {
    // Look back 72 hours for any paid shop orders (buffer for any transient failures)
    const since = Math.floor(Date.now() / 1000) - 72 * 60 * 60;
    const stripe = getStripe();
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      created: { gte: since },
    });

    for (const session of sessions.data) {
      if (session.payment_status !== "paid" || session.metadata?.type !== "shop") continue;
      const result = await fulfillShopOrder(session.id, stripe, "cron");
      flat.push({ sessionId: session.id, ...result });
    }
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Sync failed" },
      { status: 500 }
    );
  }

  // Alert on any failures that need manual attention
  const failures = flat.filter(
    (r) => r.status === "failed" || r.status === "needs_attention"
  );
  if (failures.length > 0) {
    await sendEmail({
      to: "info@tourdefore.com",
      subject: `ALERT: ${failures.length} shop order(s) need attention`,
      html: `<p>The 5-minute sync found paid orders that could not be fulfilled:</p><pre>${JSON.stringify(
        failures,
        null,
        2
      )}</pre><p>Check Stripe dashboard and manually create Printful orders or refund.</p>`,
      critical: true,
    });
  }

  const rescued = flat.filter((r) => r.status === "rescued" || r.status === "submitted").length;

  return NextResponse.json({
    checked: flat.length,
    rescued,
    failures: failures.length,
    results: flat,
  });
}
