import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { sendEmail } from "@/lib/email";
import type { StoredPlan } from "@/lib/plan-types";
import {
  decideNudge,
  buildReengageEmail,
  nudgeDedupeKey,
  optoutKey,
  dedupeTtlSeconds,
} from "@/lib/reengage";

// ── Returning-user re-engagement cron ──
//
// Runs once a day (vercel.json). Enumerates saved plans, and for any plan whose
// trip is exactly T-30 / T-14 / T-3 days out with a FIRM future date + organizer
// email, nudges the organizer to come back, lock tee times, and re-share with
// the crew. Belt-and-suspenders against double-sends:
//   - decideNudge fires per window only on the exact day count
//   - Redis SET NX de-dupe key trip-nudge:{planId}:{window}
//   - organizer opt-out key reengage-optout:{email}
// Sends are non-fatal (sendEmail swallows + records failures). Also callable
// manually with Authorization: Bearer $CRON_SECRET for debugging.
//
// Set `?dry=1` (cron-authed) to compute the selection WITHOUT sending or
// writing de-dupe keys — used by scripts/reengage-dryrun.ts indirectly and for
// safe production spot-checks.

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Only match top-level plan documents, not the plan:{id}:attendees /
// plan:{id}:emailed sub-keys. Those contain a second colon segment.
function isPlanDocKey(key: string): boolean {
  return /^plan:[^:]+$/.test(key);
}

export async function GET(req: NextRequest) {
  const cronSecret = req.headers.get("authorization")?.replace("Bearer ", "");
  const isCron =
    req.headers.get("x-vercel-cron") === "true" ||
    (!!process.env.CRON_SECRET && cronSecret === process.env.CRON_SECRET);
  if (!isCron) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dryRun = req.nextUrl.searchParams.get("dry") === "1";
  const now = new Date();
  const r = getRedis();

  // 1) Enumerate all plan documents via SCAN (matches kv.ts pattern).
  const planKeys: string[] = [];
  let cursor = "0";
  do {
    const [next, keys] = await r.scan(cursor, "MATCH", "plan:*", "COUNT", 200);
    cursor = next;
    for (const k of keys) if (isPlanDocKey(k)) planKeys.push(k);
  } while (cursor !== "0");

  let scanned = 0;
  let eligible = 0;
  let sent = 0;
  let skippedOptout = 0;
  let skippedDuplicate = 0;
  let failed = 0;
  const fired: Array<{ planId: string; window: number; days: number }> = [];

  if (planKeys.length > 0) {
    // Batch-fetch all plan JSON in one pipeline.
    const pipe = r.pipeline();
    for (const k of planKeys) pipe.get(k);
    const results = (await pipe.exec()) || [];

    for (let i = 0; i < results.length; i++) {
      const raw = results[i]?.[1];
      if (typeof raw !== "string") continue;
      scanned++;

      let plan: StoredPlan;
      try {
        plan = JSON.parse(raw) as StoredPlan;
      } catch {
        continue; // corrupt entry — skip
      }

      const decision = decideNudge(plan, now);
      if (!decision) continue;
      eligible++;

      // Opt-out gate.
      const optedOut = await r.get(optoutKey(decision.organizerEmail));
      if (optedOut) {
        skippedOptout++;
        continue;
      }

      const dedupeKey = nudgeDedupeKey(decision.planId, decision.window);

      if (dryRun) {
        // Don't send, don't claim the key — just report what WOULD fire,
        // but still respect an existing de-dupe key so the report is honest.
        const already = await r.get(dedupeKey);
        if (already) {
          skippedDuplicate++;
          continue;
        }
        fired.push({ planId: decision.planId, window: decision.window, days: decision.days });
        sent++;
        continue;
      }

      // Claim the (planId, window) slot atomically — SET NX with a TTL that
      // expires just past the trip. If the key already exists, we've already
      // nudged this window: skip.
      const ttl = dedupeTtlSeconds(decision.days);
      const claimed = await r.set(dedupeKey, "1", "EX", ttl, "NX");
      if (claimed !== "OK") {
        skippedDuplicate++;
        continue;
      }

      // Build + send. sendEmail is non-fatal (records failures to Redis).
      try {
        const { subject, html } = buildReengageEmail(plan, decision.window);
        await sendEmail({ to: decision.organizerEmail, subject, html });
        sent++;
        fired.push({ planId: decision.planId, window: decision.window, days: decision.days });
      } catch (err) {
        // Should not throw (sendEmail swallows), but be defensive: release the
        // claim so a future run can retry this window.
        failed++;
        await r.del(dedupeKey).catch(() => {});
        console.error("[trip-reminders] send failed:", err instanceof Error ? err.message : err);
      }
    }
  }

  const summary = {
    dryRun,
    plans: planKeys.length,
    scanned,
    eligible,
    sent,
    skippedOptout,
    skippedDuplicate,
    failed,
    fired,
  };
  console.log("[trip-reminders]", JSON.stringify(summary));
  return NextResponse.json(summary);
}
