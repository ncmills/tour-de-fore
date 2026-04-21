/**
 * TDF itinerary deliverables audit.
 *
 * SCANs Redis for stored plans and reports field-by-field coverage — how
 * many generated plans actually populate `url`, `address`, `alternatives`,
 * `imageSearch`, `proTips`, `tierTagline`, etc.
 *
 * Pattern ported from MOH commit 49f5218 (2026-04-12 itinerary deliverables
 * audit), which uncovered that Claude was generating ~60% more content
 * than the UI ever rendered (100% of url/bar/dining URLs populated but
 * never displayed, 95% of lodging.address populated but never shown, etc.).
 *
 * Run:
 *   vercel env pull .env.prod --environment production --yes
 *   source .env.prod
 *   npx tsx scripts/audit-sample-plan.ts
 *   rm .env.prod
 *
 * Output: per-field populated/total counts + percentages, across all
 * stored plans (or a sample if there are many). Cross-reference the
 * "populated" percentages against what actually renders in
 * GalleryClient / TripBuilderClient / ItineraryClient — any field
 * with high coverage and no render path is wasted engine output.
 */

import { getRedis } from "../src/lib/redis";
import type { StoredPlan, GeneratedPlan } from "../src/lib/plan-types";

type FieldKey = string;
interface FieldStats {
  populated: number;
  total: number;
  sampleValues?: string[];
}

const stats = new Map<FieldKey, FieldStats>();

function bump(field: FieldKey, isPopulated: boolean, sample?: string) {
  let s = stats.get(field);
  if (!s) {
    s = { populated: 0, total: 0, sampleValues: [] };
    stats.set(field, s);
  }
  s.total += 1;
  if (isPopulated) {
    s.populated += 1;
    if (sample && s.sampleValues && s.sampleValues.length < 3) s.sampleValues.push(sample);
  }
}

function hasText(v: unknown): boolean {
  return typeof v === "string" && v.trim().length > 0;
}

function auditPlan(plan: GeneratedPlan, tag: string) {
  // Top-level narrative fields
  bump(`${tag}.tripName`, hasText(plan.tripName), plan.tripName);
  bump(`${tag}.tagline`, hasText(plan.tagline), plan.tagline);
  bump(`${tag}.tierTagline`, hasText(plan.tierTagline), plan.tierTagline);
  bump(`${tag}.dates`, hasText(plan.dates), plan.dates);
  bump(`${tag}.destination`, hasText(plan.destination), plan.destination);

  // Lodging
  bump(`${tag}.lodging.name`, hasText(plan.lodging?.name));
  bump(`${tag}.lodging.type`, hasText(plan.lodging?.type));
  bump(`${tag}.lodging.address`, hasText(plan.lodging?.address), plan.lodging?.address);
  bump(`${tag}.lodging.costPerNight`, hasText(plan.lodging?.costPerNight));
  bump(`${tag}.lodging.rationale`, hasText(plan.lodging?.rationale));
  bump(`${tag}.lodging.url (SHOULD BE EMPTY)`, hasText(plan.lodging?.url));
  bump(`${tag}.lodging.imageSearch`, hasText(plan.lodging?.imageSearch));
  bump(`${tag}.lodgingAlternatives[]`, (plan.lodgingAlternatives?.length || 0) > 0);

  // Courses — coverage per field across the entire course array
  for (const c of plan.courses || []) {
    bump(`${tag}.courses[].url`, hasText(c.url));
    bump(`${tag}.courses[].imageSearch`, hasText(c.imageSearch));
    bump(`${tag}.courses[].imageUrl`, hasText(c.imageUrl));
    bump(`${tag}.courses[].whyThisCourse`, hasText(c.whyThisCourse));
  }
  bump(`${tag}.courseAlternatives[]`, (plan.courseAlternatives?.length || 0) > 0);

  // Dining / bars URLs
  for (const d of plan.dining || []) bump(`${tag}.dining[].url`, hasText(d.url));
  for (const b of plan.bars || []) bump(`${tag}.bars[].url`, hasText(b.url));
  bump(`${tag}.diningAlternatives[]`, (plan.diningAlternatives?.length || 0) > 0);

  // Pro tips + logistics
  bump(`${tag}.proTips[]`, (plan.proTips?.length || 0) > 0);
  bump(`${tag}.groupLogistics.teeTimeStrategy`, hasText(plan.groupLogistics?.teeTimeStrategy));
  bump(`${tag}.groupLogistics.transport`, hasText(plan.groupLogistics?.transport));
  bump(`${tag}.groupLogistics.packingList`, (plan.groupLogistics?.packingList?.length || 0) > 0);
}

async function main() {
  const redis = getRedis();
  const keys: string[] = [];
  let cursor = "0";
  do {
    const [next, batch] = await redis.scan(cursor, "MATCH", "plan:*", "COUNT", 100);
    cursor = next;
    for (const k of batch) {
      // Skip child keys like plan:{id}:attendees, plan:{id}:emailed
      if (k.split(":").length === 2) keys.push(k);
    }
  } while (cursor !== "0");

  if (keys.length === 0) {
    console.log("No stored plans found. Exiting.");
    process.exit(0);
  }

  console.log(`Found ${keys.length} stored plan(s). Auditing...\n`);

  let planCount = 0;
  let tierPlanCount = 0;

  for (const key of keys) {
    const raw = await redis.get(key);
    if (!raw) continue;
    let stored: StoredPlan;
    try {
      stored = JSON.parse(raw);
    } catch {
      continue;
    }
    planCount += 1;
    const destinations = stored.destinations;
    if (!destinations) continue;

    for (const level of ["budget", "mid", "premium"] as const) {
      const rec = destinations[level];
      if (!rec) continue;
      const tiers = rec.plans;
      if (!tiers) continue;
      for (const tier of ["imp", "devil", "demonKing"] as const) {
        const p = tiers[tier];
        if (!p) continue;
        auditPlan(p, "plan");
        tierPlanCount += 1;
      }
    }
  }

  // Report
  console.log("─".repeat(76));
  console.log(`TDF itinerary deliverables coverage — ${planCount} plan(s), ${tierPlanCount} tier(s)`);
  console.log("─".repeat(76));

  const entries = Array.from(stats.entries()).sort((a, b) => {
    const ap = a[1].total > 0 ? a[1].populated / a[1].total : 0;
    const bp = b[1].total > 0 ? b[1].populated / b[1].total : 0;
    return ap - bp;
  });

  for (const [field, s] of entries) {
    const pct = s.total > 0 ? Math.round((s.populated / s.total) * 100) : 0;
    const bar = "█".repeat(Math.round(pct / 5)) + "░".repeat(20 - Math.round(pct / 5));
    const flag =
      field.includes("SHOULD BE EMPTY") && s.populated > 0 ? " ⚠️ " :
      pct >= 80 ? " ✓ " :
      pct >= 20 ? "   " :
      " ⚠️ ";
    console.log(`${flag}${field.padEnd(54)} ${bar} ${pct.toString().padStart(3)}%  (${s.populated}/${s.total})`);
  }

  console.log();
  console.log(
    `Next step: cross-reference each field with ≥80% coverage against the components that\n` +
    `should render it (GalleryClient, TripBuilderClient, ItineraryClient, PlanResultClient).\n` +
    `Any field populated by Claude but never surfaced = wasted engine output.`
  );

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
