import { NextRequest, NextResponse } from "next/server";
import { fetchShopProducts } from "@/lib/printful";
import { sendEmail } from "@/lib/email";

// Runs daily. Recomputes real Printful cost for every product via estimate-costs
// and alerts if any product's net margin drops below 5% (fatal) or 10% (warn).
// This is the safety net for Printful cost changes that would otherwise silently
// squeeze margins — e.g. Printful raising embroidery fees between cache refreshes.
//
// Note: fetchShopProducts already excludes products with <=0 net margin at fetch time
// (see src/lib/printful.ts). This cron is the UPSTREAM detector — it catches drift
// before products get excluded, so Nick has time to respond.

const STRIPE_PERCENT = 0.029;
const STRIPE_FIXED = 0.30;
const WARN_MARGIN = 0.10; // alert if below 10% net
const CRITICAL_MARGIN = 0.05; // CRITICAL alert if below 5% net

export async function GET(req: NextRequest) {
  const cronSecret = req.headers.get("authorization")?.replace("Bearer ", "");
  const isCron =
    req.headers.get("x-vercel-cron") === "true" ||
    (!!process.env.CRON_SECRET && cronSecret === process.env.CRON_SECRET);
  if (!isCron) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const printfulToken = process.env.PRINTFUL_API_TOKEN;
  if (!printfulToken) {
    return NextResponse.json({ ok: false, error: "PRINTFUL_API_TOKEN not set" }, { status: 500 });
  }

  const products = await fetchShopProducts();
  const report: Array<{
    id: string;
    retail: number;
    cost: number;
    net: number;
    marginPct: number;
    level: "ok" | "warn" | "critical";
  }> = [];

  for (const p of products) {
    const firstSyncId = p.variants[0]?.syncVariantId;
    if (!firstSyncId) continue;
    try {
      const res = await fetch("https://api.printful.com/orders/estimate-costs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${printfulToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient: {
            address1: "123 Main St",
            city: "Chicago",
            state_code: "IL",
            country_code: "US",
            zip: "60601",
          },
          items: [{ sync_variant_id: firstSyncId, quantity: 1 }],
        }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) continue;
      const data = await res.json();
      const cost = parseFloat(data.result?.costs?.total || "0");
      if (cost <= 0) continue;

      const retail = p.price / 100;
      const stripeFees = retail * STRIPE_PERCENT + STRIPE_FIXED;
      const net = retail - cost - stripeFees;
      const marginPct = net / retail;
      const level: "ok" | "warn" | "critical" =
        marginPct < CRITICAL_MARGIN ? "critical" : marginPct < WARN_MARGIN ? "warn" : "ok";

      report.push({ id: p.id, retail, cost, net, marginPct, level });
    } catch {
      // skip — transient Printful error, next run will retry
    }
  }

  const criticals = report.filter((r) => r.level === "critical");
  const warns = report.filter((r) => r.level === "warn");

  if (criticals.length > 0 || warns.length > 0) {
    const lines = [...criticals, ...warns]
      .map(
        (r) =>
          `<li><strong>${r.level.toUpperCase()}</strong> ${r.id}: retail $${r.retail.toFixed(2)}, cost $${r.cost.toFixed(2)}, net $${r.net.toFixed(2)} (${(r.marginPct * 100).toFixed(1)}%)</li>`
      )
      .join("");
    await sendEmail({
      to: "info@tourdefore.com",
      subject:
        criticals.length > 0
          ? `CRITICAL: ${criticals.length} shop product(s) below 5% margin`
          : `WARN: ${warns.length} shop product(s) below 10% margin`,
      html: `<p>Daily margin check found drift. Consider raising retail prices (edit Printful or bump the safety buffer in src/lib/printful.ts).</p><ul>${lines}</ul>`,
      critical: criticals.length > 0,
    });
  }

  return NextResponse.json({ checked: report.length, report });
}
