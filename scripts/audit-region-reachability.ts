/**
 * Region-reachability audit.
 *
 * Proves the wizard's REGION_STATES map (src/data/regions.ts) can actually
 * REACH every destination in the data. The wizard lets a user narrow a region
 * pick to a state subset via chips; if a destination's state isn't listed under
 * its region, that destination is only reachable by picking the whole region —
 * never via a state chip. That drift is silent: the destination still exists,
 * still ranks, but a user filtering by state can't surface it.
 *
 * This is the regression guard for the 2026-06-30 sync (KS/ND/SD/WV were
 * data-only and unreachable). Run after ANY change to destination regions/states
 * or to src/data/regions.ts.
 *
 * Checks:
 *   1. REACHABILITY — every destination's state is listed under its region.
 *   2. REGION COVERAGE — every data region is present in REGION_NAMES + REGION_STATES.
 *   3. NO PHANTOM STATES — every state listed under a region has ≥1 destination
 *      there (a listed state with no data is dead UI / a typo).
 *
 * Run: `npx tsx scripts/audit-region-reachability.ts`
 * Exits non-zero when any FAIL fires.
 */

import { allDestinations } from "../src/data";
import { REGION_NAMES, REGION_STATES } from "../src/data/regions";

const FAIL: string[] = [];
const WARN: string[] = [];

// Truth: region → set of states that actually have destinations.
const dataRegionStates = new Map<string, Set<string>>();
for (const d of allDestinations) {
  if (!dataRegionStates.has(d.region)) dataRegionStates.set(d.region, new Set());
  dataRegionStates.get(d.region)!.add(d.state);
}

// ── 1. Reachability — every destination reachable via a state chip ──
for (const d of allDestinations) {
  const chips = REGION_STATES[d.region];
  if (!chips) {
    FAIL.push(`${d.id}: region "${d.region}" has no REGION_STATES entry — destination unreachable by state chip`);
    continue;
  }
  if (!chips.includes(d.state)) {
    FAIL.push(`${d.id}: state "${d.state}" missing from REGION_STATES["${d.region}"] — reachable only via whole-region pick`);
  }
}

// ── 2. Region coverage — every data region selectable + named ──
for (const region of dataRegionStates.keys()) {
  if (!REGION_STATES[region]) FAIL.push(`region "${region}" exists in data but has no REGION_STATES entry`);
  if (!REGION_NAMES.includes(region as (typeof REGION_NAMES)[number]))
    FAIL.push(`region "${region}" exists in data but is missing from REGION_NAMES`);
}

// ── 3. Phantom states — listed chip with no backing data ──
for (const [region, states] of Object.entries(REGION_STATES)) {
  const dataStates = dataRegionStates.get(region) || new Set<string>();
  for (const st of states) {
    if (!dataStates.has(st))
      WARN.push(`REGION_STATES["${region}"] lists "${st}" but no destination has that (region,state) — dead chip`);
  }
}

// ── Report ──
console.log("─".repeat(60));
console.log(`Region-reachability audit — ${allDestinations.length} destinations`);
console.log("─".repeat(60));

if (FAIL.length === 0 && WARN.length === 0) {
  console.log(`\n✅ FAIL:0  WARN:0 — every destination reachable by state chip\n`);
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
console.log();
process.exit(FAIL.length > 0 ? 1 : 0);
