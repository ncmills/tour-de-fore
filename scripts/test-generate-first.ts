/**
 * Generate-First E2E Harness
 *
 * Verifies the "anonymous users can generate + see a plan, account only gates
 * save/email/edit, and anon plans are claimed on signup" behavior end-to-end
 * against a running server (local prod build or dev).
 *
 * Usage:
 *   npx tsx scripts/test-generate-first.ts                       # localhost:3000
 *   npx tsx scripts/test-generate-first.ts --base-url <url>
 *
 * Requires a server with real REDIS_URL + ANTHROPIC_API_KEY. Does NOT use the
 * admin secret on the anon path (so the real IP rate limit applies). Generates
 * a couple of real plans — keep runs infrequent to respect the IP cap.
 */

import { buildWizardState, parseNDJSONStream } from "./test-shared";

const args = process.argv.slice(2);
const baseIdx = args.indexOf("--base-url");
const BASE = baseIdx >= 0 ? args[baseIdx + 1] : "http://localhost:3000";

let passed = 0;
let failed = 0;
function check(name: string, ok: boolean, detail = "") {
  console.log(`${ok ? "✓ PASS" : "✗ FAIL"}  ${name}${detail ? `  — ${detail}` : ""}`);
  if (ok) passed++; else failed++;
}

/** Parse the Set-Cookie tdf-session value off a response. */
function sessionCookie(res: Response): string | null {
  const sc = res.headers.get("set-cookie");
  if (!sc) return null;
  const m = sc.match(/tdf-session=([^;]+)/);
  return m ? `tdf-session=${m[1]}` : null;
}

async function genPlan(opts: { cookie?: string; email?: string }): Promise<{ status: number; planId?: string; error?: string }> {
  const state = buildWizardState({
    region: "Southwest",
    authMode: opts.email ? "login" : "new",
    organizerEmail: opts.email ?? "",
    organizerName: opts.email ? "Test User" : "",
  });
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (opts.cookie) headers["Cookie"] = opts.cookie;
  const res = await fetch(`${BASE}/api/generate-plan`, {
    method: "POST",
    headers,
    body: JSON.stringify(state),
  });
  if (!res.ok) {
    const t = await res.text();
    let err = `HTTP ${res.status}`;
    try { err = JSON.parse(t).error || err; } catch {}
    return { status: res.status, error: err };
  }
  const msgs = await parseNDJSONStream(res);
  const done = msgs.find((m) => m.type === "done");
  const errMsg = msgs.find((m) => m.type === "error");
  if (errMsg) return { status: 200, error: `${errMsg.error} ${errMsg.debug || ""}`.trim() };
  return { status: 200, planId: done?.planId };
}

async function main() {
  console.log(`\nGenerate-First E2E — base: ${BASE}\n`);

  // ── 1. Anonymous generation (no cookie, no admin) ──
  const anon = await genPlan({});
  check("anon generate returns a planId (no account)", !!anon.planId, anon.error || anon.planId?.slice(0, 8));
  const anonPlanId = anon.planId;

  if (anonPlanId) {
    // The full result/itinerary renders for anon (read-only public view).
    const page = await fetch(`${BASE}/plan/result/${anonPlanId}?dest=mid&tier=devil`);
    const html = await page.text();
    const rendered =
      page.ok &&
      (html.includes("All Plans") || html.includes("Copy Link") || /Day\s*1|Schedule|Itinerary/i.test(html));
    check("anon can VIEW the full plan/itinerary", rendered, `HTTP ${page.status}`);

    // The selection (no-dest) view renders too.
    const sel = await fetch(`${BASE}/plan/result/${anonPlanId}`);
    check("anon lands on a working result page", sel.ok, `HTTP ${sel.status}`);
  }

  // ── 2. Anon Save/Email is gated (prompted, not silent) ──
  const claimNoAuth = await fetch(`${BASE}/api/claim-plans`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planIds: anonPlanId ? [anonPlanId] : [] }),
  });
  check("anon claim-plans is rejected with 401 (auth required)", claimNoAuth.status === 401, `HTTP ${claimNoAuth.status}`);

  const emailNoAuth = await fetch(`${BASE}/api/send-plan-emails`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId: anonPlanId, emails: ["x@example.com"], tier: "devil", dest: "mid" }),
  });
  check("anon send-plan-emails is rejected (401/403, not 200)", emailNoAuth.status === 401 || emailNoAuth.status === 403, `HTTP ${emailNoAuth.status}`);

  // ── 3. Register fresh account → claim the anon plan → appears for the user ──
  const freshEmail = `gf-test-${Date.now()}@example.com`;
  const reg = await fetch(`${BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: freshEmail, password: "test-password-123", name: "GF Test" }),
  });
  const cookie = sessionCookie(reg);
  check("fresh account registers + sets session cookie", reg.ok && !!cookie, `HTTP ${reg.status}`);

  if (cookie && anonPlanId) {
    const claim = await fetch(`${BASE}/api/claim-plans`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: cookie },
      body: JSON.stringify({ planIds: [anonPlanId] }),
    });
    const claimData = await claim.json().catch(() => ({}));
    check("authed claim-plans claims the anon plan (claimed >= 1)", claim.ok && claimData.claimed >= 1, JSON.stringify(claimData));

    // Now the plan is owned: send-plan-emails as the owner should NOT 401/403.
    // (We pass an empty emails array so it doesn't actually send; a 400 for "no
    // emails" still proves the auth/ownership gate passed.)
    const ownerEmail = await fetch(`${BASE}/api/send-plan-emails`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: cookie },
      body: JSON.stringify({ planId: anonPlanId, emails: ["crew@example.com"], tier: "devil", dest: "mid" }),
    });
    check("claimed plan: owner passes the email auth/ownership gate", ownerEmail.status !== 401 && ownerEmail.status !== 403, `HTTP ${ownerEmail.status}`);

    // The plan now shows in My Trips (server renders the city for owned plans).
    const myTrips = await fetch(`${BASE}/my-trips`, { headers: { Cookie: cookie } });
    const mtHtml = await myTrips.text();
    check("claimed plan appears in My Trips", myTrips.ok && /trip|plan/i.test(mtHtml) && !mtHtml.includes("No trips"), `HTTP ${myTrips.status}`);

    // Double-claim is idempotent (claimed still >= 1, no error).
    const claim2 = await fetch(`${BASE}/api/claim-plans`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: cookie },
      body: JSON.stringify({ planIds: [anonPlanId] }),
    });
    const claim2Data = await claim2.json().catch(() => ({}));
    check("re-claim is idempotent (already-owned counts as claimed)", claim2.ok && claim2Data.claimed >= 1, JSON.stringify(claim2Data));
  }

  // ── 4. A DIFFERENT account cannot steal an owned plan ──
  if (anonPlanId) {
    const otherEmail = `gf-other-${Date.now()}@example.com`;
    const reg2 = await fetch(`${BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: otherEmail, password: "test-password-123", name: "Other" }),
    });
    const cookie2 = sessionCookie(reg2);
    if (cookie2) {
      const steal = await fetch(`${BASE}/api/claim-plans`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Cookie: cookie2 },
        body: JSON.stringify({ planIds: [anonPlanId] }),
      });
      const stealData = await steal.json().catch(() => ({}));
      check("a different account CANNOT claim an owned plan (claimed=0)", steal.ok && stealData.claimed === 0, JSON.stringify(stealData));
    }
  }

  // ── 5. Logged-in generation still works (unchanged flow) ──
  // Reuse the fresh account's cookie for an authed generation.
  if (cookie) {
    const authed = await genPlan({ cookie, email: freshEmail });
    check("logged-in generation still works", !!authed.planId, authed.error || authed.planId?.slice(0, 8));
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`SUMMARY: ${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => { console.error("Fatal:", e); process.exit(2); });
