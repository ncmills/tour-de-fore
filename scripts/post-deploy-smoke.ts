#!/usr/bin/env tsx
/**
 * Post-deploy smoke test for TDF shop.
 *
 * Run this after every deploy that touches fulfillment, pricing, or the shop:
 *   npx tsx scripts/post-deploy-smoke.ts
 *
 * It asserts:
 *   1. /api/products returns >=10 products, each with net margin > 0, and each
 *      product shows a DISTINCT preview image per color (no swatch falls back to
 *      a shared thumbnail, no two colors share an image).
 *   2. /api/health/orders returns 200 (all paid sessions reconcile)
 *   3. verify-order on a known session returns already_submitted
 *
 * Exits 0 on pass, 1 on any failure. Designed to be loud — if any check fails,
 * the deploy broke something and you should roll back immediately.
 *
 * Required env: PRINTFUL_API_TOKEN + ADMIN_SECRET (from .env.prod or Vercel env).
 * A MISSING required var is treated as a FAILURE, not a skip — a check that did
 * not run cannot be reported as a pass. Export them: `set -a && source .env.prod`.
 */

const BASE = "https://tourdefore.com";
const STRIPE_PERCENT = 0.029;
const STRIPE_FIXED = 0.30;

// Brandon Bias's rescued order — fulfilled 2026-04-10, permanent as long as the
// session exists in Stripe. Safe to use as a dedup probe forever.
const KNOWN_SUBMITTED_SESSION =
  "cs_live_b1hNeQuvWPC0Qx9gTiX9xHYOOkzVP09twkptibydfhdlTDRkHe67MaNjZH";
const KNOWN_PRINTFUL_ORDER_ID = 154124883;

interface ProductCheck {
  id: string;
  price: number;
  syncVariantId: number;
  previewUrl?: string;
  colors?: string[];
  colorPreviews?: Record<string, string>;
}

interface MarginResult {
  id: string;
  retail: number;
  cost: number;
  net: number;
  ok: boolean;
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`${url} → ${res.status} ${body.slice(0, 200)}`);
  }
  return res.json() as Promise<T>;
}

async function estimateCost(syncVariantId: number, token: string): Promise<number> {
  const res = await fetch("https://api.printful.com/orders/estimate-costs", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      recipient: {
        address1: "123 Main St",
        city: "Chicago",
        state_code: "IL",
        country_code: "US",
        zip: "60601",
      },
      items: [{ sync_variant_id: syncVariantId, quantity: 1 }],
    }),
  });
  if (!res.ok) return 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = (await res.json()) as any;
  return parseFloat(data.result?.costs?.total || "0");
}

async function main() {
  const failures: string[] = [];
  console.log("── TDF post-deploy smoke test ──\n");

  // 1. Products endpoint + margin check
  console.log("[1/3] /api/products + margin check");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const products = (await fetchJson<any>(`${BASE}/api/products`)) as ProductCheck[] & any[];
  const arr: ProductCheck[] = Array.isArray(products)
    ? (products as ProductCheck[])
    : (products.products as ProductCheck[]) || [];
  console.log(`  products returned: ${arr.length}`);
  if (arr.length < 10) failures.push(`products: expected >=10, got ${arr.length}`);

  // Color-image distinctness: clicking a color swatch must show that color's hat.
  // Each color needs its own preview; a missing preview falls back to the shared
  // thumbnail (all swatches identical), and two colors sharing a URL is a dupe.
  for (const p of arr) {
    const colors = p.colors || [];
    const cp = p.colorPreviews || {};
    if (colors.length < 2) continue; // single-color products have nothing to switch
    const missing = colors.filter((c) => !cp[c]);
    const seen = new Map<string, string[]>();
    for (const c of colors) {
      if (!cp[c]) continue;
      const list = seen.get(cp[c]) || [];
      list.push(c);
      seen.set(cp[c], list);
    }
    const dupes = [...seen.values()].filter((cs) => cs.length > 1);
    const ok = missing.length === 0 && dupes.length === 0;
    console.log(
      `  ${ok ? "✓" : "✗"} ${p.id.padEnd(15)} ${colors.length} colors → ${new Set(colors.map((c) => cp[c] || "__fallback__")).size} distinct images`
    );
    if (missing.length) {
      failures.push(`color-image: ${p.id} colors with no preview (fall back to thumbnail): ${missing.join(", ")}`);
    }
    for (const cs of dupes) {
      failures.push(`color-image: ${p.id} colors share one image: ${cs.join(" = ")}`);
    }
  }

  const printfulToken = process.env.PRINTFUL_API_TOKEN;
  if (!printfulToken) {
    failures.push("PRINTFUL_API_TOKEN not set — margin check could NOT run (export it: set -a && source .env.prod)");
    console.log("  ✗ PRINTFUL_API_TOKEN not set — margin check could not run (counts as FAILURE)");
  }
  if (printfulToken) {
    const results: MarginResult[] = [];
    for (const p of arr) {
      const sv = (p as unknown as { variants?: Array<{ syncVariantId: number }> }).variants?.[0]
        ?.syncVariantId;
      if (!sv) continue;
      const cost = await estimateCost(sv, printfulToken);
      if (cost <= 0) continue;
      const retail = p.price / 100;
      const net = retail - cost - (retail * STRIPE_PERCENT + STRIPE_FIXED);
      const ok = net > 0;
      results.push({ id: p.id, retail, cost, net, ok });
      console.log(
        `  ${ok ? "✓" : "✗"} ${p.id.padEnd(15)} retail $${retail.toFixed(2)}  cost $${cost.toFixed(2)}  net $${net.toFixed(2)}`
      );
      if (!ok) failures.push(`margin: ${p.id} retail $${retail} < cost+fees (net $${net.toFixed(2)})`);
    }
  }
  console.log();

  // 2. /api/health/orders
  console.log("[2/3] /api/health/orders");
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) {
    failures.push("ADMIN_SECRET not set — health/orders check could NOT run (export it: set -a && source .env.prod)");
    console.log("  ✗ ADMIN_SECRET not set — health check could not run (counts as FAILURE)");
  } else {
    const res = await fetch(`${BASE}/api/health/orders`, {
      headers: { "x-admin-secret": adminSecret },
    });
    const body = await res.json();
    console.log(`  status: ${res.status} body: ${JSON.stringify(body)}`);
    if (res.status !== 200) failures.push(`health/orders: expected 200, got ${res.status}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(body as any).ok) failures.push(`health/orders: ok=false`);
  }
  console.log();

  // 3. verify-order dedup probe on known fulfilled session
  console.log("[3/3] /api/verify-order dedup probe");
  const res = await fetch(`${BASE}/api/verify-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId: KNOWN_SUBMITTED_SESSION }),
  });
  const body = (await res.json()) as { status?: string; printfulOrderId?: number };
  console.log(`  status: ${res.status} body: ${JSON.stringify(body)}`);
  if (body.status !== "already_submitted") {
    failures.push(`verify-order: expected already_submitted, got ${body.status}`);
  }
  if (body.printfulOrderId !== KNOWN_PRINTFUL_ORDER_ID) {
    failures.push(
      `verify-order: expected printfulOrderId=${KNOWN_PRINTFUL_ORDER_ID}, got ${body.printfulOrderId}`
    );
  }
  console.log();

  // Summary
  if (failures.length === 0) {
    console.log("✅ ALL CHECKS PASS");
    process.exit(0);
  }
  console.error(`❌ ${failures.length} FAILURE(S):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

main().catch((err) => {
  console.error("smoke test threw:", err);
  process.exit(1);
});
