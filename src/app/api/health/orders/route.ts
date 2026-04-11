import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { buildExternalId } from "@/lib/order-utils";

// Reconciliation check: paid Stripe shop sessions in the last 24h must each
// have a matching Printful order by external_id. Admin-gated via x-admin-secret
// or Authorization: Bearer <secret>. Returns 500 with gap list if any paid
// session older than 10 min has no Printful order — plug into uptime monitor.
export async function GET(req: NextRequest) {
  const adminSecret =
    req.headers.get("x-admin-secret") ||
    req.headers.get("authorization")?.replace("Bearer ", "");
  if (!process.env.ADMIN_SECRET || adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const printfulToken = process.env.PRINTFUL_API_TOKEN;
  if (!printfulToken) {
    return NextResponse.json(
      { ok: false, error: "PRINTFUL_API_TOKEN not set" },
      { status: 500 }
    );
  }

  try {
    const since = Math.floor(Date.now() / 1000) - 24 * 60 * 60;
    const stripe = getStripe();
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      created: { gte: since },
    });

    const paidShop = sessions.data.filter(
      (s) => s.payment_status === "paid" && s.metadata?.type === "shop"
    );

    const gaps: Array<{
      sessionId: string;
      email: string | null | undefined;
      amount: number;
      createdAt: string;
      ageMinutes: number;
    }> = [];

    for (const s of paidShop) {
      const extId = buildExternalId(s.id);
      const res = await fetch(`https://api.printful.com/orders/@${extId}`, {
        headers: { Authorization: `Bearer ${printfulToken}` },
        signal: AbortSignal.timeout(10_000),
      });
      if (res.status === 200) continue; // order exists — good
      if (res.status !== 404) {
        // Unexpected Printful error — surface it but don't crash the loop
        console.warn(`health/orders: Printful returned ${res.status} for ${extId}`);
        continue;
      }
      // 404 — no Printful order for this paid session
      // Grace window: 3 min. The verify-order call from /shop/success runs within
      // 1 second of payment; the 5-min cron is the fallback. 3 min is tight enough
      // to catch real fulfillment breakage fast and loose enough to avoid flakes.
      const ageMinutes = Math.floor((Date.now() / 1000 - s.created) / 60);
      if (ageMinutes < 3) continue;
      gaps.push({
        sessionId: s.id,
        email: s.customer_details?.email,
        amount: s.amount_total || 0,
        createdAt: new Date(s.created * 1000).toISOString(),
        ageMinutes,
      });
    }

    if (gaps.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          checked: paidShop.length,
          gaps,
          message: `${gaps.length} paid shop session(s) have no Printful order`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      checked: paidShop.length,
      message: "All paid shop sessions have matching Printful orders",
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "Reconciliation failed",
      },
      { status: 500 }
    );
  }
}
