/**
 * Dry-run verification for the returning-user re-engagement system.
 *
 *   npx tsx scripts/reengage-dryrun.ts
 *
 * No live Redis, no Resend, NO real emails. It:
 *   1. Seeds plans at T-31/30/15/14/4/3/2 days, plus a flexible and a past trip.
 *   2. Runs the PURE selection logic (decideNudge) → asserts only T-30/14/3 fire,
 *      exactly once each; flexible + past + off-window are skipped.
 *   3. Simulates the cron's de-dupe + opt-out against an in-memory Redis →
 *      asserts a second run sends nothing (de-dupe) and that an opted-out
 *      organizer is suppressed.
 *   4. Verifies the email is constructed correctly (subject/links/unsubscribe)
 *      and that the send path is a no-op when RESEND_API_KEY is empty
 *      (intercepts the global fetch — proves no network blast).
 *
 * Exits non-zero on any failed assertion.
 */

import type { StoredPlan, WizardState } from "../src/lib/plan-types";
import {
  decideNudge,
  buildReengageEmail,
  nudgeDedupeKey,
  optoutKey,
  dedupeTtlSeconds,
  REENGAGE_WINDOWS,
} from "../src/lib/reengage";

let failures = 0;
function check(name: string, cond: boolean, extra?: unknown) {
  const tag = cond ? "PASS" : "FAIL";
  if (!cond) failures++;
  console.log(`  [${tag}] ${name}${extra !== undefined && !cond ? ` — ${JSON.stringify(extra)}` : ""}`);
}

// ── Fixed clock. Pick a date far from month boundaries so day math is clean. ──
const NOW = new Date(2026, 6, 15, 12, 0, 0); // 2026-07-15 noon

function baseInputs(over: Partial<WizardState>): WizardState {
  return {
    destinationType: "specific", destination: "Scottsdale", region: "", states: [],
    tripMonth: "", flexible: false, preferredSeason: "", numberOfDays: 3,
    groupSize: 12, skillMix: "", ageRange: "", roundsPerDay: "Two (36)",
    courseQuality: "", walkingOrRiding: "", mustPlayCourses: "", handicap: "",
    lodging: "", dining: [], nightlife: "", activities: [], budget: "",
    budgetPriorities: [], specialRequests: "",
    organizerName: "Nick", organizerEmail: "organizer@example.com", attendees: [],
    authMode: "new", authPassword: "",
    ...over,
  };
}

function makePlan(id: string, over: Partial<WizardState>): StoredPlan {
  return {
    id,
    inputs: baseInputs(over),
    createdAt: NOW.toISOString(),
    emailsSent: false,
    destinations: {
      // Minimal shape so buildReengageEmail can read mid.plans.devil.tripName.
      mid: { plans: { devil: { tripName: "Scottsdale Send-Off" } } },
    } as unknown as StoredPlan["destinations"],
  };
}

console.log(`\n=== Re-engagement dry-run (clock: ${NOW.toISOString()}) ===\n`);

// Firm trips anchor to a month's 1st (resolveTripStart). To exercise exact
// T-31/30/15/14/4/3/2 day counts we hold ONE firm month fixed and slide a
// per-scenario "now" to sit N days before it — isolating the windowing rule.
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

import { getTripCountdown } from "../src/lib/trip-dates";

// Anchor month = next January (firm). Its 1st is a fixed date; we slide a
// per-scenario "now" to sit N days before it.
const ANCHOR_MONTH_IDX = 0; // January
const anchorYear = ANCHOR_MONTH_IDX < NOW.getMonth() ? NOW.getFullYear() + 1 : NOW.getFullYear();
const ANCHOR = new Date(anchorYear, ANCHOR_MONTH_IDX, 1);
function nowNDaysBefore(n: number): Date {
  const d = new Date(ANCHOR.getFullYear(), ANCHOR.getMonth(), ANCHOR.getDate() - n);
  d.setHours(12, 0, 0, 0);
  return d;
}

const firmPlan = makePlan("firm", { tripMonth: monthNames[ANCHOR_MONTH_IDX] });
const flexiblePlan = makePlan("flex", { flexible: true, preferredSeason: "summer", tripMonth: "" });
const flexNoSeason = makePlan("flex-noseason", { flexible: true, tripMonth: "", preferredSeason: "" });

console.log("1) Selection windowing (firm plan, per-day clock):");
const scenarios: Array<{ days: number; expectWindow: number | null }> = [
  { days: 31, expectWindow: null },
  { days: 30, expectWindow: 30 },
  { days: 15, expectWindow: null },
  { days: 14, expectWindow: 14 },
  { days: 4, expectWindow: null },
  { days: 3, expectWindow: 3 },
  { days: 2, expectWindow: null },
];
for (const s of scenarios) {
  const clock = nowNDaysBefore(s.days);
  const cd = getTripCountdown(
    { tripMonth: firmPlan.inputs.tripMonth, flexible: false }, clock
  );
  const decision = decideNudge(firmPlan, clock);
  const got = decision?.window ?? null;
  check(
    `T-${s.days} (countdown.days=${cd.days}) → window ${got ?? "none"} (expect ${s.expectWindow ?? "none"})`,
    got === s.expectWindow && cd.days === s.days,
    { cd: cd.days, got }
  );
}

console.log("\n2) Flexible / past / no-email skipped:");
// Flexible plan never fires regardless of clock.
{
  const clock = nowNDaysBefore(14);
  check("flexible (season) → no nudge", decideNudge(flexiblePlan, clock) === null);
  check("flexible (no season) → no nudge", decideNudge(flexNoSeason, clock) === null);
}
// Past trip: clock AFTER the firm month.
{
  const pastClock = new Date(ANCHOR.getFullYear(), ANCHOR.getMonth() + 1, 5, 12, 0, 0);
  check("past trip → no nudge", decideNudge(firmPlan, pastClock) === null);
}
// Missing organizer email.
{
  const noEmail = makePlan("noemail", { tripMonth: monthNames[ANCHOR_MONTH_IDX], organizerEmail: "" });
  check("no organizer email → no nudge", decideNudge(noEmail, nowNDaysBefore(30)) === null);
}

// ── 3) In-memory Redis to exercise de-dupe + opt-out exactly as the cron does. ──
console.log("\n3) De-dupe + opt-out (in-memory Redis simulation):");

class FakeRedis {
  store = new Map<string, string>();
  async get(k: string) { return this.store.has(k) ? this.store.get(k)! : null; }
  async set(k: string, v: string, ..._args: unknown[]) {
    const nx = _args.includes("NX");
    if (nx && this.store.has(k)) return null;
    this.store.set(k, v);
    return "OK";
  }
  async del(k: string) { return this.store.delete(k) ? 1 : 0; }
}

// Simulate one cron pass over a set of plans at a given clock.
function simulateCronPass(
  redis: FakeRedis,
  plans: StoredPlan[],
  clock: Date,
  sink: { sends: Array<{ to: string; subject: string; html: string; window: number }> }
) {
  let sent = 0, skippedOptout = 0, skippedDup = 0;
  for (const plan of plans) {
    const decision = decideNudge(plan, clock);
    if (!decision) continue;
    // opt-out
    // (sync over the fake — fine for the sim)
    const opted = redis.store.get(optoutKey(decision.organizerEmail));
    if (opted) { skippedOptout++; continue; }
    const key = nudgeDedupeKey(decision.planId, decision.window);
    if (redis.store.has(key)) { skippedDup++; continue; }
    redis.store.set(key, "1"); // SET NX claim
    void dedupeTtlSeconds(decision.days); // exercise TTL calc
    const { subject, html } = buildReengageEmail(plan, decision.window);
    sink.sends.push({ to: decision.organizerEmail, subject, html, window: decision.window });
    sent++;
  }
  return { sent, skippedOptout, skippedDup };
}

{
  const redis = new FakeRedis();
  const clock = nowNDaysBefore(30); // firm plan is exactly T-30 here
  const sink = { sends: [] as Array<{ to: string; subject: string; html: string; window: number }> };

  const r1 = simulateCronPass(redis, [firmPlan, flexiblePlan], clock, sink);
  check("first pass sends exactly 1 (firm @ T-30; flexible skipped)", r1.sent === 1, r1);

  const r2 = simulateCronPass(redis, [firmPlan, flexiblePlan], clock, sink);
  check("second pass same day sends 0 (de-dupe held)", r2.sent === 0 && r2.skippedDup === 1, r2);

  // Opt-out the organizer, advance to T-14 (a fresh window) → still suppressed.
  redis.store.set(optoutKey(firmPlan.inputs.organizerEmail), "1");
  const clock14 = nowNDaysBefore(14);
  const r3 = simulateCronPass(redis, [firmPlan], clock14, { sends: [] });
  check("opted-out organizer suppressed at next window", r3.sent === 0 && r3.skippedOptout === 1, r3);
}

// ── 4) Email construction + windows distinct + unsubscribe present. ──
console.log("\n4) Email content / links / unsubscribe:");
for (const w of REENGAGE_WINDOWS) {
  const { subject, html } = buildReengageEmail(firmPlan, w);
  check(`T-${w} subject non-empty`, !!subject && subject.length > 5, subject);
  check(`T-${w} links to /plan/result/${firmPlan.id}`, html.includes(`/plan/result/${firmPlan.id}`));
  check(`T-${w} has unsubscribe link`, html.includes("/api/unsubscribe?email="));
  check(`T-${w} unsubscribe email url-encoded`, html.includes(encodeURIComponent(firmPlan.inputs.organizerEmail)));
  check(`T-${w} mentions tee times / lock / crew`, /tee time|lock|crew|foursome/i.test(html));
}
// Subjects differ per window.
{
  const subs = REENGAGE_WINDOWS.map((w) => buildReengageEmail(firmPlan, w).subject);
  check("subjects are distinct per window", new Set(subs).size === subs.length, subs);
}

// ── 5) Send path is a no-op without RESEND_API_KEY (intercept fetch). ──
console.log("\n5) Send path interception (RESEND_API_KEY empty → no network):");
(async () => {
  const prevKey = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  let fetchCalls = 0;
  const origFetch = globalThis.fetch;
  globalThis.fetch = (async (...args: Parameters<typeof fetch>) => {
    fetchCalls++;
    return origFetch(...args);
  }) as typeof fetch;
  try {
    const { sendEmail } = await import("../src/lib/email");
    // Also prevent the failure-recorder from touching Redis in this no-key path:
    // sendEmail returns early when RESEND_API_KEY is unset, so no Redis/fetch.
    await sendEmail({ to: "test@example.com", subject: "x", html: "<p>x</p>" });
    check("sendEmail made zero network calls when key is empty", fetchCalls === 0, { fetchCalls });
  } finally {
    globalThis.fetch = origFetch;
    if (prevKey !== undefined) process.env.RESEND_API_KEY = prevKey;
  }

  console.log(`\n=== ${failures === 0 ? "ALL CHECKS PASSED" : failures + " CHECK(S) FAILED"} ===\n`);
  process.exit(failures === 0 ? 0 : 1);
})();
