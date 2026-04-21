/**
 * TDF Engine Permutation Test — Tier 1: Dry-Run Filtering
 *
 * Tests ~200 input permutations against pickThreeDestinations()
 * with zero API calls. Validates every meaningful combo returns
 * at least 1 destination or documents expected zeros.
 *
 * Usage: npx tsx scripts/test-filtering.ts
 */

import { pickThreeDestinations, setPopularityScores } from "../src/data/query";
import { allDestinations } from "../src/data/index";
import * as fs from "fs";
import * as path from "path";
import type { Season } from "../src/data/types";
import {
  REGIONS, SEASONS, WIZARD_BUDGETS, COURSE_QUALITIES, ACTIVITIES,
  MULTI_ACTIVITIES, SPECIFIC_CITIES, MONTHS,
  isKnownZero,
  type FilterInput, type TestCase, type TestResult,
} from "./test-shared";

// Initialize with zero popularity (same as audit-engine)
setPopularityScores(new Map(), new Map());

const TOTAL_DESTINATIONS = allDestinations.length;
console.log(`\nLoaded ${TOTAL_DESTINATIONS} destinations across ${new Set(allDestinations.map(d => d.region)).size} regions\n`);

// ── Build test suites ──

const suites: TestCase[] = [];

// Suite 1: Region × Season (21 cases)
for (const region of REGIONS) {
  for (const season of SEASONS) {
    const opts: FilterInput = { region, season, groupSize: 12, numberOfDays: 3, courseQuality: "Mix of public & resort" };
    suites.push({
      name: `${region} × ${season}`,
      suite: "Region × Season",
      wizardOverrides: { region, preferredSeason: season.charAt(0).toUpperCase() + season.slice(1), flexible: true, groupSize: 12 },
      filterOptions: opts,
      expectedZero: isKnownZero(opts),
    });
  }
}

// Suite 2: Region × Group Size (35 cases)
const GROUP_SIZES = [4, 8, 12, 20, 32];
for (const region of REGIONS) {
  for (const groupSize of GROUP_SIZES) {
    const opts: FilterInput = { region, season: "fall", groupSize, numberOfDays: 3, courseQuality: "Mix of public & resort" };
    suites.push({
      name: `${region} × group=${groupSize}`,
      suite: "Region × Group Size",
      wizardOverrides: { region, groupSize },
      filterOptions: opts,
      expectedZero: isKnownZero(opts),
    });
  }
}

// Suite 3: Specific Months (12 cases)
const monthToSeason: Record<string, Season | undefined> = {
  January: undefined, February: undefined, March: "spring", April: "spring",
  May: "spring", June: "summer", July: "summer", August: "summer",
  September: "fall", October: "fall", November: "fall", December: undefined,
};
for (const month of MONTHS) {
  const season = monthToSeason[month];
  const opts: FilterInput = { season, groupSize: 12, numberOfDays: 3 };
  suites.push({
    name: `Month: ${month} → season=${season || "none"}`,
    suite: "Specific Months",
    wizardOverrides: { flexible: false, tripMonth: month, destinationType: "region", region: "" },
    filterOptions: opts,
  });
}

// Suite 4: Activities × Region (49 cases)
for (const activity of ACTIVITIES) {
  for (const region of REGIONS) {
    const opts: FilterInput = { region, season: "fall", groupSize: 12, numberOfDays: 4, activities: [activity] };
    suites.push({
      name: `${activity} × ${region}`,
      suite: "Activities × Region",
      wizardOverrides: { region, activities: [activity], numberOfDays: 4 },
      filterOptions: opts,
    });
  }
}

// Suite 5: Activity Combos (16 cases)
const COMBO_REGIONS = ["Southwest", "Pacific NW", "Southeast", "Midwest"];
for (const combo of MULTI_ACTIVITIES) {
  for (const region of COMBO_REGIONS) {
    const opts: FilterInput = { region, season: "fall", groupSize: 12, numberOfDays: 3, activities: combo };
    suites.push({
      name: `[${combo.join("+")}] × ${region}`,
      suite: "Activity Combos",
      wizardOverrides: { region, activities: combo },
      filterOptions: opts,
    });
  }
}

// Suite 6: Course Quality (28 cases)
for (const quality of COURSE_QUALITIES) {
  for (const region of REGIONS) {
    const opts: FilterInput = { region, season: "fall", groupSize: 12, numberOfDays: 3, courseQuality: quality };
    suites.push({
      name: `${quality} × ${region}`,
      suite: "Course Quality",
      wizardOverrides: { region, courseQuality: quality },
      filterOptions: opts,
    });
  }
}

// Suite 7: Budget Levels (16 cases)
for (const budget of WIZARD_BUDGETS) {
  for (const region of COMBO_REGIONS) {
    const opts: FilterInput = { region, season: "fall", groupSize: 12, numberOfDays: 3, budget };
    suites.push({
      name: `${budget} × ${region}`,
      suite: "Budget Levels",
      wizardOverrides: { region, budget },
      filterOptions: opts,
    });
  }
}

// Suite 8: Specific Cities (12 cases)
for (const city of SPECIFIC_CITIES) {
  const opts: FilterInput = { specificCity: city, groupSize: 12, numberOfDays: 3 };
  suites.push({
    name: `City: ${city}`,
    suite: "Specific Cities",
    wizardOverrides: { destinationType: "specific", destination: city },
    filterOptions: opts,
  });
}

// Suite 9: Edge Cases (10 cases)
const EDGE_CASES: { name: string; opts: FilterInput; expectedZero?: boolean }[] = [
  { name: "Pacific NW + spring + group=20", opts: { region: "Pacific NW", season: "spring", groupSize: 20, numberOfDays: 3 } },
  { name: "Midwest + fall + group=20", opts: { region: "Midwest", season: "fall", groupSize: 20, numberOfDays: 3 } },
  { name: "Southwest + summer + group=20", opts: { region: "Southwest", season: "summer", groupSize: 20, numberOfDays: 3 } },
  { name: "Northeast + spring + group=16", opts: { region: "Northeast", season: "spring", groupSize: 16, numberOfDays: 3 } },
  { name: "South Central + spring + group=24", opts: { region: "South Central", season: "spring", groupSize: 24, numberOfDays: 3 } },
  { name: "All filters maxed", opts: { region: "Pacific NW", season: "spring", groupSize: 32, numberOfDays: 5, activities: ["Casino"], courseQuality: "Bucket list only" }, expectedZero: true },
  { name: "No region, no season, group=4", opts: { groupSize: 4, numberOfDays: 3 } },
  { name: "No region, fall, group=12", opts: { season: "fall", groupSize: 12, numberOfDays: 3 } },
  { name: "Southeast + summer + group=4", opts: { region: "Southeast", season: "summer", groupSize: 4, numberOfDays: 5 } },
  { name: "Mountain West + fall + group=8 + ATV", opts: { region: "Mountain West", season: "fall", groupSize: 8, numberOfDays: 4, activities: ["ATV"] } },
];
for (const ec of EDGE_CASES) {
  suites.push({
    name: ec.name,
    suite: "Edge Cases",
    wizardOverrides: {},
    filterOptions: ec.opts,
    expectedZero: ec.expectedZero || isKnownZero(ec.opts),
  });
}

// Suite 10: numberOfDays (9 cases)
const DAY_REGIONS = ["Southwest", "Southeast", "Mountain West"];
for (const days of [3, 4, 5]) {
  for (const region of DAY_REGIONS) {
    const opts: FilterInput = { region, season: "fall", groupSize: 12, numberOfDays: days };
    suites.push({
      name: `${days} days × ${region}`,
      suite: "numberOfDays",
      wizardOverrides: { region, numberOfDays: days },
      filterOptions: opts,
    });
  }
}

// ── Run tests ──

console.log(`Running ${suites.length} test cases...\n`);

const results: TestResult[] = [];

for (const tc of suites) {
  const picks = pickThreeDestinations(tc.filterOptions);
  const passed = picks.length > 0 || !!tc.expectedZero;

  results.push({
    ...tc,
    candidateCount: picks.length,
    pickCount: picks.length,
    picks: picks.map(p => ({
      city: p.destination.city,
      state: p.destination.state,
      priceLevel: p.priceLevel,
      score: p.score,
    })),
    passed,
  });
}

// ── Report ──

const suiteNames = [...new Set(results.map(r => r.suite))];
const summaryRows: string[] = [];

console.log("Suite                     | Total | Pass | Zero | Unexpected Zero");
console.log("--------------------------|-------|------|------|----------------");

let totalPass = 0;
let totalFail = 0;

for (const suite of suiteNames) {
  const suiteResults = results.filter(r => r.suite === suite);
  const pass = suiteResults.filter(r => r.passed).length;
  const zero = suiteResults.filter(r => r.pickCount === 0).length;
  const unexpectedZero = suiteResults.filter(r => r.pickCount === 0 && !r.expectedZero).length;
  totalPass += pass;
  totalFail += suiteResults.length - pass;

  const row = `${suite.padEnd(25)} | ${String(suiteResults.length).padStart(5)} | ${String(pass).padStart(4)} | ${String(zero).padStart(4)} | ${String(unexpectedZero).padStart(15)}`;
  console.log(row);
  summaryRows.push(row);
}

console.log("--------------------------|-------|------|------|----------------");
console.log(`${"TOTAL".padEnd(25)} | ${String(results.length).padStart(5)} | ${String(totalPass).padStart(4)} | ${String(results.filter(r => r.pickCount === 0).length).padStart(4)} | ${String(results.filter(r => r.pickCount === 0 && !r.expectedZero).length).padStart(15)}`);

// Show unexpected zeros
const unexpectedZeros = results.filter(r => r.pickCount === 0 && !r.expectedZero);
if (unexpectedZeros.length > 0) {
  console.log(`\n⚠ UNEXPECTED ZERO-RESULT COMBOS (${unexpectedZeros.length}):`);
  for (const r of unexpectedZeros) {
    console.log(`  - [${r.suite}] ${r.name}`);
    console.log(`    Options: ${JSON.stringify(r.filterOptions)}`);
  }
}

// Show budget mapping issue
const budgetResults = results.filter(r => r.suite === "Budget Levels");
const budgetPicks = new Map<string, string[]>();
for (const r of budgetResults) {
  const key = `${r.filterOptions.region}`;
  const picks = r.picks.map(p => `${p.city}(${p.priceLevel})`).join(", ");
  if (!budgetPicks.has(key)) budgetPicks.set(key, []);
  budgetPicks.get(key)!.push(`${r.filterOptions.budget}: ${picks}`);
}
let budgetVaries = false;
for (const [region, entries] of budgetPicks) {
  const unique = new Set(entries.map(e => e.split(": ")[1]));
  if (unique.size > 1) budgetVaries = true;
}
if (!budgetVaries) {
  console.log("\n⚠ BUG CONFIRMED: Budget has NO effect on destination picks.");
  console.log("  All wizard budget values fall through to default [0, 99999] in budgetToRange().");
  console.log("  Fix: update budgetToRange() in src/data/query.ts to handle wizard values.");
}

console.log(`\n✓ ${totalPass} passed, ✗ ${totalFail} failed out of ${results.length} total`);

// Save results
const outPath = path.join(__dirname, "test-results-filtering.json");
fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
console.log(`\nResults saved to ${outPath}`);
