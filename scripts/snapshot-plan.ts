/**
 * snapshot-plan.ts — DETERMINISTIC before-migration baseline for the TDF wizard.
 *
 * Purpose: capture the DETERMINISTIC layer of the planner — the destination
 * picker `getThreeDestinations(state)` (src/lib/planner-prompt.ts) which wraps
 * `pickThreeDestinations` (src/data/query.ts) over `allDestinations`
 * (src/data/index.ts). The LLM step is intentionally IGNORED. This snapshot
 * gates a data migration for selection-identical regression: re-run after the
 * migration and diff /tmp/tdf-before-keep.json against the new /tmp/tdf-before.json.
 *
 * What it captures, per representative WizardState input:
 *   - the picked destination ids (IN PICK ORDER — order is part of the selection)
 *   - each picked destination's full attached sub-catalogs, as sorted identity
 *     keys (courses, lodging, dining, bars, activities, partyBuses, privateChefs)
 *   - the picker's per-pick price tier label + score + priceIndex (+ reasons)
 *
 * Determinism notes:
 *   - The picker reads injected popularity/viewCount maps via setPopularityScores();
 *     we never call it, so both default to empty Maps → deterministic.
 *   - No Date()/now/random anywhere on the picker path. We still pin season by
 *     holding tripMonth = "June" (→ "summer") so seasonFromWizardState is a
 *     pure constant and never branches on ambient time.
 *   - priceIndex is float; we round to 4 dp for stable serialization.
 *
 * Run: npx tsx scripts/snapshot-plan.ts
 */

import { getThreeDestinations } from "../src/lib/planner-prompt";
import { allDestinations } from "../src/data/index";
import type { WizardState } from "../src/lib/plan-types";
import type { Destination } from "../src/data/types";
import * as fs from "fs";

// ── Enumerable input space (mirrors the wizard UI option arrays) ──
const REGIONS = [
  "Southwest", "Pacific NW", "Mountain West", "Midwest", "Southeast",
  "Northeast", "South Central", "California", "International",
] as const;

const BUDGETS = ["$2K per person", "$4K per person", "$6K per person", "Fat pockets"] as const;
const COURSE_QUALITY = ["Cheap & fun", "Mix of public & resort", "Bucket list only", "Whatever fits budget"] as const;
const GROUP_SIZES = [4, 8, 16] as const;
const ROUNDS_PER_DAY = ["One (18)", "Two (36)", "Let AI decide"] as const;
const NIGHTLIFE = ["Going out every night", "Couple nights", "In bed by 10", "Point us to a bar"] as const;
const DINING = ["Steakhouses", "Casual & local", "Private chef", "Mix"] as const;
const LODGING = ["One big house", "Hotel / Resort", "Split houses", "Don't care"] as const;
const WALKING = ["Walking", "Riding", "Mix / Don't care"] as const;
const SKILL_MIX = ["All similar", "Wide range", "Mostly beginners", "Here for the vibes"] as const;
const AGE_RANGE = ["20s", "30s", "40s", "Mixed"] as const;
const BUDGET_PRIORITIES = ["Best courses", "Best lodging", "Best dining", "Keep balanced"] as const;

// Activity multiselect samples: none, single, mid pair, full sweep, alt pair.
const ACTIVITY_SETS: string[][] = [
  [],
  ["Fishing"],
  ["Casino", "Spa"],
  ["Fishing", "ATV", "Casino", "Spa", "Brewery", "Shooting", "Water Sports"],
  ["Brewery", "Water Sports"],
];

// 8 sampled specific cities (fuzzy-matched by the picker's specificCity path).
// Marquee golf + an international + a small/tiny town, spread across regions.
const SAMPLE_CITIES = [
  "Scottsdale",   // Southwest, medium — marquee
  "Pinehurst",    // Southeast, small  — marquee golf
  "Bandon",       // Pacific NW, tiny  — marquee + small
  "Monterey",     // California        — Pebble-area marquee
  "Charleston",   // Southeast, medium
  "St Andrews",   // International
  "Streamsong",   // Southeast, tiny   — small marquee
  "Los Cabos",    // International (non-US) — second international
] as const;

// ── Held-constant fields (documented; not part of the swept space) ──
// numberOfDays=3, tripMonth="June" (→ season "summer", deterministic),
// flexible=false, preferredSeason="", handicap="", mustPlayCourses="",
// specialRequests="", organizer/attendee/auth fields empty (none read by picker).
const HELD = {
  numberOfDays: 3,
  tripMonth: "June",
  flexible: false,
  preferredSeason: "",
  handicap: "",
  mustPlayCourses: "",
  specialRequests: "",
};

// Base context for the one-factor-at-a-time (OFAT) sampled blocks.
const BASE = {
  region: "Southwest",
  budget: "$4K per person",
  courseQuality: "Mix of public & resort",
  groupSize: 8,
  roundsPerDay: "Two (36)",
  activities: [] as string[],
  nightlife: "Couple nights",
  dining: ["Mix"] as string[],
  lodging: "One big house",
  walkingOrRiding: "Riding",
  skillMix: "All similar",
  ageRange: "30s",
  budgetPriorities: ["Keep balanced"] as string[],
};

interface MatrixInput {
  destinationType: "region" | "specific";
  destination?: string;
  region?: string;
  budget: string;
  courseQuality: string;
  groupSize: number;
  roundsPerDay: string;
  activities: string[];
  nightlife: string;
  dining: string[];
  lodging: string;
  walkingOrRiding: string;
  skillMix: string;
  ageRange: string;
  budgetPriorities: string[];
}

function makeInput(over: Partial<MatrixInput>): MatrixInput {
  return {
    destinationType: "region",
    destination: "",
    region: BASE.region,
    budget: BASE.budget,
    courseQuality: BASE.courseQuality,
    groupSize: BASE.groupSize,
    roundsPerDay: BASE.roundsPerDay,
    activities: BASE.activities,
    nightlife: BASE.nightlife,
    dining: BASE.dining,
    lodging: BASE.lodging,
    walkingOrRiding: BASE.walkingOrRiding,
    skillMix: BASE.skillMix,
    ageRange: BASE.ageRange,
    budgetPriorities: BASE.budgetPriorities,
    ...over,
  };
}

function toWizardState(i: MatrixInput): WizardState {
  return {
    destinationType: i.destinationType,
    destination: i.destinationType === "specific" ? (i.destination || "") : "",
    region: i.destinationType === "region" ? (i.region || "") : "",
    states: [],
    tripMonth: HELD.tripMonth,
    flexible: HELD.flexible,
    preferredSeason: HELD.preferredSeason,
    numberOfDays: HELD.numberOfDays,
    groupSize: i.groupSize,
    skillMix: i.skillMix,
    ageRange: i.ageRange,
    roundsPerDay: i.roundsPerDay,
    courseQuality: i.courseQuality,
    walkingOrRiding: i.walkingOrRiding,
    mustPlayCourses: HELD.mustPlayCourses,
    handicap: HELD.handicap,
    lodging: i.lodging,
    dining: i.dining,
    nightlife: i.nightlife,
    activities: i.activities,
    budget: i.budget,
    budgetPriorities: i.budgetPriorities,
    specialRequests: HELD.specialRequests,
    organizerName: "",
    organizerEmail: "",
    attendees: [],
    authMode: "new",
    authPassword: "",
  };
}

// ── Deterministic compact input key ──
function inputKey(i: MatrixInput): string {
  const a = (arr: string[]) => [...arr].sort().join(",");
  return [
    `type=${i.destinationType}`,
    `region=${i.destinationType === "region" ? (i.region || "") : ""}`,
    `city=${i.destinationType === "specific" ? (i.destination || "") : ""}`,
    `budget=${i.budget}`,
    `cq=${i.courseQuality}`,
    `gs=${i.groupSize}`,
    `rpd=${i.roundsPerDay}`,
    `nd=${HELD.numberOfDays}`,
    `season=summer`,
    `act=${a(i.activities)}`,
    `night=${i.nightlife}`,
    `din=${a(i.dining)}`,
    `lodg=${i.lodging}`,
    `wor=${i.walkingOrRiding}`,
    `skill=${i.skillMix}`,
    `age=${i.ageRange}`,
    `prio=${a(i.budgetPriorities)}`,
  ].join("|");
}

// ── Sub-catalog item identity keys (entity name + a discriminator) ──
function courseKeys(d: Destination): string[] {
  return d.courses.map((c) => `${c.name} [${c.tier}]`).sort();
}
function lodgingKeys(d: Destination): string[] {
  // No name field on LodgingOption → discriminate by type + area.
  return d.lodging.map((l) => `${l.type} @ ${l.areaDescription}`).sort();
}
function diningKeys(d: Destination): string[] {
  return d.dining.map((x) => `${x.name} [${x.style}]`).sort();
}
function barKeys(d: Destination): string[] {
  return d.bars.map((b) => `${b.name} [${b.vibe}]`).sort();
}
function activityKeys(d: Destination): string[] {
  return d.activities.map((a) => `${a.name} [${a.type}]`).sort();
}
function partyBusKeys(d: Destination): string[] {
  // No name field → discriminate by type + sorted provider list.
  return d.partyBuses.map((b) => `${b.type} (${[...b.providers].sort().join("/")})`).sort();
}
function privateChefKeys(d: Destination): string[] {
  // No name/type → discriminate by sorted providers + price band.
  return d.privateChefs
    .map((c) => `chef:${[...c.providers].sort().join("/")} [$${c.pricePerPerson[0]}-${c.pricePerPerson[1]}]`)
    .sort();
}

function attachedFor(d: Destination) {
  return {
    courses: courseKeys(d),
    lodging: lodgingKeys(d),
    dining: diningKeys(d),
    bars: barKeys(d),
    activities: activityKeys(d),
    partyBuses: partyBusKeys(d),
    privateChefs: privateChefKeys(d),
  };
}

interface SnapshotRecord {
  inputKey: string;
  destinationIds: string[];
  attached: Record<string, ReturnType<typeof attachedFor>>;
  scores: Array<{
    id: string;
    priceLevel: string;
    score: number;
    priceIndex: number;
    reasons: string[];
  }>;
}

function buildRecord(i: MatrixInput): SnapshotRecord {
  const picks = getThreeDestinations(toWizardState(i));
  const destinationIds = picks.map((p) => p.destination.id); // pick order preserved
  const attached: Record<string, ReturnType<typeof attachedFor>> = {};
  for (const p of picks) {
    attached[p.destination.id] = attachedFor(p.destination);
  }
  const scores = picks.map((p) => ({
    id: p.destination.id,
    priceLevel: p.priceLevel,
    score: p.score,
    priceIndex: Number(p.priceIndex.toFixed(4)),
    reasons: p.reasons,
  }));
  return { inputKey: inputKey(i), destinationIds, attached, scores };
}

// ── Build the input matrix ──
const inputs: MatrixInput[] = [];

// Block A — full-factorial region × budget × courseQuality × groupSize.
for (const region of REGIONS) {
  for (const budget of BUDGETS) {
    for (const courseQuality of COURSE_QUALITY) {
      for (const groupSize of GROUP_SIZES) {
        inputs.push(makeInput({ destinationType: "region", region, budget, courseQuality, groupSize }));
      }
    }
  }
}

// Block B — specific cities × budget × groupSize (courseQuality held at base).
for (const city of SAMPLE_CITIES) {
  for (const budget of BUDGETS) {
    for (const groupSize of GROUP_SIZES) {
      inputs.push(makeInput({ destinationType: "specific", destination: city, region: "", budget, groupSize }));
    }
  }
}

// Block C — roundsPerDay sweep across 3 regions × 2 budgets.
for (const region of ["Southwest", "Southeast", "Mountain West"]) {
  for (const budget of ["$2K per person", "$6K per person"]) {
    for (const roundsPerDay of ROUNDS_PER_DAY) {
      inputs.push(makeInput({ region, budget, roundsPerDay }));
    }
  }
}

// Block D — activities multiselect samples across 3 regions.
for (const region of ["Southwest", "Pacific NW", "Southeast"]) {
  for (const activities of ACTIVITY_SETS) {
    inputs.push(makeInput({ region, activities }));
  }
}

// Block E — OFAT samples of the remaining preference dimensions, against 2 regions.
for (const region of ["Southwest", "Northeast"]) {
  for (const nightlife of NIGHTLIFE) inputs.push(makeInput({ region, nightlife }));
  for (const dining of [["Steakhouses"], ["Casual & local"], ["Private chef"], ["Steakhouses", "Private chef"]]) {
    inputs.push(makeInput({ region, dining }));
  }
  for (const lodging of LODGING) inputs.push(makeInput({ region, lodging }));
  for (const walkingOrRiding of WALKING) inputs.push(makeInput({ region, walkingOrRiding }));
  for (const skillMix of SKILL_MIX) inputs.push(makeInput({ region, skillMix }));
  for (const ageRange of AGE_RANGE) inputs.push(makeInput({ region, ageRange }));
  for (const budgetPriorities of [["Best courses"], ["Best lodging"], ["Best dining"], ["Keep balanced"]]) {
    inputs.push(makeInput({ region, budgetPriorities }));
  }
}

// ── Execute, deduping by inputKey ──
const byKey = new Map<string, SnapshotRecord>();
for (const i of inputs) {
  const rec = buildRecord(i);
  byKey.set(rec.inputKey, rec); // identical inputKey collapses
}

const records = [...byKey.values()].sort((a, b) => (a.inputKey < b.inputKey ? -1 : a.inputKey > b.inputKey ? 1 : 0));

// ── Stable serialization: recursively sort object keys; preserve array order ──
function sortKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(value as Record<string, unknown>).sort()) {
      out[k] = sortKeys((value as Record<string, unknown>)[k]);
    }
    return out;
  }
  return value;
}

const payload = sortKeys({ records });
const json = JSON.stringify(payload, null, 2);

const OUT = "/tmp/tdf-before.json";
const KEEP = "/tmp/tdf-before-keep.json";
fs.writeFileSync(OUT, json);
fs.writeFileSync(KEEP, json); // preserved baseline (re-run overwrites OUT, not KEEP)

// ── Report ──
const partial: string[] = [];
for (const r of records) {
  const tooFew = r.destinationIds.length < 3;
  let emptyCatalog = false;
  for (const id of Object.keys(r.attached)) {
    const cats = r.attached[id];
    for (const cat of Object.keys(cats) as (keyof typeof cats)[]) {
      if (cats[cat].length === 0) emptyCatalog = true;
    }
  }
  if (tooFew || emptyCatalog) partial.push(r.inputKey);
}

const distinct = new Set<string>();
for (const r of records) for (const id of r.destinationIds) distinct.add(id);

console.log("──────────────────────────────────────────────");
console.log("TDF before-migration snapshot");
console.log("──────────────────────────────────────────────");
console.log(`wrote: ${OUT}`);
console.log(`wrote: ${KEEP}  (preserved baseline)`);
console.log(`total enumerated inputs: ${inputs.length}`);
console.log(`total snapshot rows (deduped by inputKey): ${records.length}`);
console.log(`distinct destinations ever picked: ${distinct.size} / ${allDestinations.length} in catalog`);
console.log("");
console.log(`rows with <3 destinations OR any empty attached catalog: ${partial.length}`);
for (const k of partial) console.log(`  PARTIAL: ${k}`);
console.log("──────────────────────────────────────────────");
