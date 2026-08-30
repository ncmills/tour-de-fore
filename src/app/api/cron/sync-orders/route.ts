import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { sendEmail } from "@/lib/email";
import { fulfillShopOrder, type FulfillResult } from "@/lib/shop-fulfillment";
import { heartbeat } from "@/lib/heartbeat";

// Runs every 5 minutes via vercel.json cron. Also callable manually with
// Authorization: Bearer $CRON_SECRET for debugging.
// This is the safety net for shop fulfillment — if a customer closes their
// browser before the success page runs OrderVerifier, this catches the gap.
export async function GET(req: NextRequest) {
  // THE BEARER IS THE ONLY CREDENTIAL (2026-08-30).
  //
  // This route used to read `x-vercel-cron === "true"` OR the bearer. Vercel never sends
  // "true", so the header branch could admit NO ONE and the bearer was the whole gate. PR #8
  // "fixed" the dead literal to "1" — the value Vercel does send — and in doing so turned a
  // branch that admitted nobody into one that admits anybody who can set the header, on a route
  // that syncs Stripe orders and calls Printful. Restoring a dead branch restored a bypass.
  //
  // Whether Vercel strips an inbound `x-vercel-cron` is NOT MEASURED, and deliberately so:
  // finding out means sending a forged header at a live money route, which is the one thing the
  // fence forbids. This shape is correct in BOTH worlds — if the platform strips it the header
  // was worthless as a credential, and if it does not the header was a bypass.
  //
  // So: `Authorization: Bearer $CRON_SECRET` decides, and nothing else. Vercel sends it
  // automatically when CRON_SECRET is set, which is the mechanism its own docs prescribe. The
  // cron header is read for the LOG only — it never appears in a condition.
  const secret = process.env.CRON_SECRET;
  const bearer = req.headers.get("authorization")?.replace("Bearer ", "");
  const vercelCron = req.headers.get("x-vercel-cron"); // logged, never a condition

  if (!secret) {
    // NO SECRET IS A 401 IN PRODUCTION, not an open door. The old code's `!!process.env
    // .CRON_SECRET &&` meant an unset secret fell through to the header branch; with the header
    // gone there is nothing to fall through to, and failing closed is the only safe reading.
    if (process.env.NODE_ENV === "production") {
      console.error("[cron] CRON_SECRET is not set — refusing the run", { vercelCron });
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // The one named escape: local development, where there is no secret to send.
    console.warn("[cron] CRON_SECRET unset — allowed because NODE_ENV is not production");
  } else if (bearer !== secret) {
    console.warn("[cron] rejected: bearer absent or wrong", { vercelCron });
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
    await heartbeat("tour-de-fore", "/api/cron/sync-orders", { ok: false, error: err });
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

  await heartbeat("tour-de-fore", "/api/cron/sync-orders", {
    ok: failures.length === 0,
    error: failures.length ? `${failures.length} order(s) need attention` : undefined,
  });

  return NextResponse.json({
    checked: flat.length,
    rescued,
    failures: failures.length,
    results: flat,
  });
}
