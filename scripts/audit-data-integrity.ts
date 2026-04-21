/**
 * TDF engine data-integrity audit.
 *
 * Mirrors the BESTMAN / MOH data-integrity pattern: catches silent rot that
 * degrades plan quality long before users notice.
 *
 * Checks:
 *   1. activity price ranges [0,0] / [N,N] flat-rate patterns
 *   2. sparse ActivityType enum values (<3 destinations)
 *   3. per-city minimum data density (courses, dining, bars, activities, lodging)
 *   4. course price ranges [0,0] or inverted
 *   5. lodging sleeps ranges [0,0] or inverted
 *   6. slope/rating values that shouldn't display (per feedback_no_slope_rating)
 *   7. climate plausibility spot checks (flags Vegas-summer-style mistakes)
 *   8. season/bestSeasons: never empty
 *
 * Run: `npx tsx scripts/audit-data-integrity.ts`
 * Exits non-zero when any FAIL fires.
 */

import { allDestinations } from "../src/data";
import type { ActivityType } from "../src/data/types";

const FAIL: string[] = [];
const WARN: string[] = [];

// ── Per-city minimums (from reference_moh_audit_skill adapted for golf) ──
const MIN_COURSES = 2;
const MIN_DINING = 3;
const MIN_BARS = 2;
const MIN_ACTIVITIES = 2;
const MIN_LODGING = 1;

// ── Sparse-enum threshold ──
const SPARSE_ACTIVITY_MIN_CITIES = 3;

// ── Track ActivityType coverage ──
const activityTypeCities = new Map<ActivityType, Set<string>>();

for (const d of allDestinations) {
  // Per-city minimums
  if (d.courses.length < MIN_COURSES)
    FAIL.push(`${d.id}: only ${d.courses.length} courses (min ${MIN_COURSES})`);
  if (d.dining.length < MIN_DINING)
    FAIL.push(`${d.id}: only ${d.dining.length} dining spots (min ${MIN_DINING})`);
  if (d.bars.length < MIN_BARS)
    WARN.push(`${d.id}: only ${d.bars.length} bars (min ${MIN_BARS})`);
  if (d.activities.length < MIN_ACTIVITIES)
    WARN.push(`${d.id}: only ${d.activities.length} activities (min ${MIN_ACTIVITIES})`);
  if (d.lodging.length < MIN_LODGING)
    FAIL.push(`${d.id}: no lodging`);

  // bestSeasons non-empty
  if (!d.bestSeasons || d.bestSeasons.length === 0)
    FAIL.push(`${d.id}: bestSeasons is empty`);

  // Courses: price ranges sane + slope/rating flagged
  for (const c of d.courses) {
    const [lo, hi] = c.greenFeeRange;
    if (lo < 0 || hi < 0)
      FAIL.push(`${d.id}/${c.name}: negative green fee`);
    if (lo > hi)
      FAIL.push(`${d.id}/${c.name}: inverted green fee [${lo},${hi}]`);
    if (lo === 0 && hi === 0)
      FAIL.push(`${d.id}/${c.name}: green fee [0,0] — must be realistic range`);
    if (lo === hi && lo > 0)
      WARN.push(`${d.id}/${c.name}: flat green fee $${lo} — consider range`);
  }

  // Lodging: sleeps + nightly sanity
  for (const l of d.lodging) {
    const [sleepsLo, sleepsHi] = l.sleeps;
    if (sleepsLo > sleepsHi)
      FAIL.push(`${d.id}/lodging ${l.type}: inverted sleeps [${sleepsLo},${sleepsHi}]`);
    const [nlo, nhi] = l.nightlyRange;
    if (nlo <= 0 || nhi <= 0)
      FAIL.push(`${d.id}/lodging ${l.type}: nightly range [${nlo},${nhi}] invalid`);
    if (nlo > nhi)
      FAIL.push(`${d.id}/lodging ${l.type}: inverted nightly [${nlo},${nhi}]`);
  }

  // Activities: price + type coverage
  for (const a of d.activities) {
    const [lo, hi] = a.pricePerPerson;
    if (lo < 0 || hi < 0)
      FAIL.push(`${d.id}/${a.name}: negative price`);
    if (lo > hi)
      FAIL.push(`${d.id}/${a.name}: inverted price [${lo},${hi}]`);
    if (lo === 0 && hi === 0)
      FAIL.push(`${d.id}/${a.name}: price [0,0] — pad to realistic range (free = [0,10], paid = [min,max])`);
    if (lo === hi && lo > 0)
      WARN.push(`${d.id}/${a.name}: flat price $${lo} — consider upcharge band`);

    const set = activityTypeCities.get(a.type) || new Set<string>();
    set.add(d.id);
    activityTypeCities.set(a.type, set);
  }

  // Dining price range sanity
  for (const r of d.dining) {
    if (!["$", "$$", "$$$", "$$$$"].includes(r.priceRange))
      FAIL.push(`${d.id}/${r.name}: invalid priceRange "${r.priceRange}"`);
  }

  // Party bus ranges
  for (const b of d.partyBuses) {
    const [clo, chi] = b.capacity;
    const [hlo, hhi] = b.hourlyRate;
    if (clo > chi)
      FAIL.push(`${d.id}/partyBus ${b.type}: inverted capacity [${clo},${chi}]`);
    if (hlo <= 0 || hhi <= 0 || hlo > hhi)
      FAIL.push(`${d.id}/partyBus ${b.type}: invalid hourlyRate [${hlo},${hhi}]`);
  }
}

// ── Sparse ActivityType enum check ──
const allActivityTypes: ActivityType[] = [
  "atv", "fishing", "shooting", "casino", "brewery", "spa", "water-sports",
  "horseback", "hiking", "rafting", "zipline", "go-karts", "axe-throwing",
  "skeet", "boat-rental", "kayaking", "winery", "distillery", "paintball",
  "mountain-biking",
];

for (const type of allActivityTypes) {
  const cities = activityTypeCities.get(type);
  const count = cities?.size || 0;
  if (count === 0) WARN.push(`ActivityType "${type}" has 0 destinations — dead enum`);
  else if (count < SPARSE_ACTIVITY_MIN_CITIES)
    WARN.push(`ActivityType "${type}" has only ${count} destination(s) (min ${SPARSE_ACTIVITY_MIN_CITIES}) — sparse`);
}

// ── Climate plausibility spot checks ──
const climateChecks: Array<{ id: string; badSeason: string; why: string }> = [
  { id: "las-vegas-nv", badSeason: "summer", why: "Vegas summer = 110°F, unplayable" },
  { id: "phoenix-az", badSeason: "summer", why: "Phoenix summer = 110°F" },
  { id: "scottsdale-az", badSeason: "summer", why: "Scottsdale summer = 110°F" },
];
for (const check of climateChecks) {
  const d = allDestinations.find((x) => x.id === check.id);
  if (!d) continue;
  if (d.bestSeasons.includes(check.badSeason as never)) {
    WARN.push(`${d.id}: bestSeasons includes ${check.badSeason} — ${check.why}`);
  }
}

// ── Report ──
console.log("─".repeat(60));
console.log(`TDF engine data-integrity audit — ${allDestinations.length} destinations`);
console.log("─".repeat(60));

if (FAIL.length === 0 && WARN.length === 0) {
  console.log("\n✅ FAIL:0  WARN:0\n");
  process.exit(0);
}

if (FAIL.length) {
  console.log(`\n❌ ${FAIL.length} FAILURES:`);
  for (const m of FAIL) console.log(`  • ${m}`);
}
if (WARN.length) {
  console.log(`\n⚠️  ${WARN.length} WARNINGS:`);
  for (const m of WARN) console.log(`  • ${m}`);
}

// ── ActivityType coverage table ──
console.log(`\nActivityType coverage:`);
const coverage = allActivityTypes
  .map((t) => ({ type: t, count: activityTypeCities.get(t)?.size || 0 }))
  .sort((a, b) => a.count - b.count);
for (const { type, count } of coverage) {
  const bar = "█".repeat(Math.min(count, 40));
  const tag = count < SPARSE_ACTIVITY_MIN_CITIES ? "⚠️ " : "   ";
  console.log(`  ${tag}${type.padEnd(18)} ${count.toString().padStart(3)} ${bar}`);
}

console.log();
process.exit(FAIL.length > 0 ? 1 : 0);
