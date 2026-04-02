/**
 * Tour de Fore Engine Bias Audit
 *
 * Generates thousands of wizard input combos, runs them through
 * pickThreeDestinations(), and reports on destination bias,
 * regional distribution, and input sensitivity.
 *
 * Usage: npx tsx scripts/audit-engine.ts
 */

import { filterDestinations, pickThreeDestinations, setPopularityScores } from "../src/data/query";
import { allDestinations } from "../src/data/index";
import type { Region } from "../src/data/types";
import * as fs from "fs";
import * as path from "path";

// ── Input generation ──

const REGIONS = ["Southwest", "Pacific NW", "Mountain West", "Midwest", "Southeast", "Northeast", "South Central"];
const SEASONS = ["spring", "summer", "fall"];
const GROUP_SIZES = [4, 8, 12, 16, 24, 32];
const DURATIONS = [3, 4, 5];
const BUDGETS = ["Under $500", "$500\u20131K", "$1K\u20132K", "$2K+", "Money is no object"];
const COURSE_QUALITIES = ["Cheap & fun", "Mix of public & resort", "Bucket list only", "Whatever fits budget"];
const SINGLE_ACTIVITIES = ["Fishing", "ATV", "Casino", "Spa", "Brewery", "Shooting", "Water Sports"];
const MULTI_ACTIVITIES = [
  ["Fishing", "Brewery"],
  ["Casino", "Spa"],
  ["ATV", "Shooting", "Fishing"],
  ["Brewery", "Water Sports"],
];

interface TestInput {
  region?: string;
  season?: string;
  groupSize: number;
  numberOfDays: number;
  budget: string;
  courseQuality: string;
  activities: string[];
}

function generateInputs(): TestInput[] {
  const inputs: TestInput[] = [];

  // Layer 1: Full cartesian on core dims (no activities, no season)
  for (const region of [...REGIONS, undefined]) {
    for (const budget of BUDGETS) {
      for (const courseQuality of COURSE_QUALITIES) {
        for (const groupSize of GROUP_SIZES) {
          for (const numberOfDays of DURATIONS) {
            inputs.push({
              region,
              groupSize,
              numberOfDays,
              budget,
              courseQuality,
              activities: [],
            });
          }
        }
      }
    }
  }

  // Layer 2: Season combos (fixed group=12, days=3, budget=$2K+, quality=Whatever)
  for (const region of [...REGIONS, undefined]) {
    for (const season of SEASONS) {
      inputs.push({
        region,
        season,
        groupSize: 12,
        numberOfDays: 3,
        budget: "$2K+",
        courseQuality: "Whatever fits budget",
        activities: [],
      });
    }
  }

  // Layer 3: Activity combos (fixed group=12, days=4, budget=$2K+, quality=Mix)
  for (const region of [...REGIONS, undefined]) {
    for (const activity of SINGLE_ACTIVITIES) {
      inputs.push({
        region,
        groupSize: 12,
        numberOfDays: 4,
        budget: "$2K+",
        courseQuality: "Mix of public & resort",
        activities: [activity],
      });
    }
    for (const combo of MULTI_ACTIVITIES) {
      inputs.push({
        region,
        groupSize: 12,
        numberOfDays: 4,
        budget: "$2K+",
        courseQuality: "Mix of public & resort",
        activities: combo,
      });
    }
  }

  return inputs;
}

// ── Runner ──

interface RunResult {
  input: TestInput;
  picks: { id: string; city: string; state: string; region: string; score: number; priceLevel: string }[];
  candidatePoolSize: number;
}

function runAudit(inputs: TestInput[]): RunResult[] {
  setPopularityScores(new Map());
  return inputs.map((input) => {
    const filterOpts = {
      region: input.region,
      season: input.season as any,
      groupSize: input.groupSize,
      numberOfDays: input.numberOfDays,
      budget: input.budget,
      courseQuality: input.courseQuality,
      activities: input.activities,
    };
    const candidates = filterDestinations(filterOpts);
    const picks = pickThreeDestinations(filterOpts);
    return {
      input,
      picks: picks.map((p) => ({
        id: p.destination.id,
        city: p.destination.city,
        state: p.destination.state,
        region: p.destination.region,
        score: p.score,
        priceLevel: p.priceLevel,
      })),
      candidatePoolSize: candidates.length,
    };
  });
}

// ── Analysis ──

interface DestFreq {
  id: string;
  city: string;
  state: string;
  region: string;
  count: number;
  asBudget: number;
  asMid: number;
  asPremium: number;
  pct: string;
}

function analyzeFrequency(results: RunResult[]): DestFreq[] {
  const freq = new Map<string, DestFreq>();
  const totalSlots = results.reduce((s, r) => s + r.picks.length, 0);

  for (const r of results) {
    for (const p of r.picks) {
      const existing = freq.get(p.id) || {
        id: p.id, city: p.city, state: p.state, region: p.region,
        count: 0, asBudget: 0, asMid: 0, asPremium: 0, pct: "0",
      };
      existing.count++;
      if (p.priceLevel === "budget") existing.asBudget++;
      else if (p.priceLevel === "mid") existing.asMid++;
      else existing.asPremium++;
      freq.set(p.id, existing);
    }
  }

  const sorted = [...freq.values()].sort((a, b) => b.count - a.count);
  for (const d of sorted) {
    d.pct = ((d.count / totalSlots) * 100).toFixed(2);
  }
  return sorted;
}

function analyzeRegionalDistribution(results: RunResult[]) {
  const regionCounts = new Map<string, number>();
  const expectedShares = new Map<string, number>();
  const totalDests = allDestinations.length;
  let totalSlots = 0;

  for (const d of allDestinations) {
    expectedShares.set(d.region, (expectedShares.get(d.region) || 0) + 1 / totalDests);
  }

  for (const r of results) {
    for (const p of r.picks) {
      regionCounts.set(p.region, (regionCounts.get(p.region) || 0) + 1);
      totalSlots++;
    }
  }

  return REGIONS.map((region) => {
    const actual = (regionCounts.get(region) || 0) / totalSlots;
    const expected = expectedShares.get(region) || 0;
    return {
      region,
      destCount: allDestinations.filter((d) => d.region === region).length,
      actualPct: (actual * 100).toFixed(1),
      expectedPct: (expected * 100).toFixed(1),
      ratio: expected > 0 ? (actual / expected).toFixed(2) : "N/A",
    };
  });
}

function analyzeInputSensitivity(results: RunResult[]) {
  // For each parameter, hold others constant and measure how many unique output sets we get
  const sensitivities: { param: string; uniqueOutputSets: number; totalTests: number; sensitivityPct: string }[] = [];

  // Budget sensitivity: fix region=none, group=12, days=3, quality=Whatever, activities=[]
  const budgetOutputs = new Set<string>();
  for (const budget of BUDGETS) {
    const match = results.find(
      (r) =>
        !r.input.region &&
        !r.input.season &&
        r.input.groupSize === 12 &&
        r.input.numberOfDays === 3 &&
        r.input.budget === budget &&
        r.input.courseQuality === "Whatever fits budget" &&
        r.input.activities.length === 0
    );
    if (match) budgetOutputs.add(match.picks.map((p) => p.id).sort().join(","));
  }
  sensitivities.push({
    param: "Budget",
    uniqueOutputSets: budgetOutputs.size,
    totalTests: BUDGETS.length,
    sensitivityPct: ((budgetOutputs.size / BUDGETS.length) * 100).toFixed(0),
  });

  // Course quality sensitivity
  const qualityOutputs = new Set<string>();
  for (const cq of COURSE_QUALITIES) {
    const match = results.find(
      (r) =>
        !r.input.region &&
        !r.input.season &&
        r.input.groupSize === 12 &&
        r.input.numberOfDays === 3 &&
        r.input.budget === "$2K+" &&
        r.input.courseQuality === cq &&
        r.input.activities.length === 0
    );
    if (match) qualityOutputs.add(match.picks.map((p) => p.id).sort().join(","));
  }
  sensitivities.push({
    param: "Course Quality",
    uniqueOutputSets: qualityOutputs.size,
    totalTests: COURSE_QUALITIES.length,
    sensitivityPct: ((qualityOutputs.size / COURSE_QUALITIES.length) * 100).toFixed(0),
  });

  // Group size sensitivity
  const groupOutputs = new Set<string>();
  for (const gs of GROUP_SIZES) {
    const match = results.find(
      (r) =>
        !r.input.region &&
        !r.input.season &&
        r.input.groupSize === gs &&
        r.input.numberOfDays === 3 &&
        r.input.budget === "$2K+" &&
        r.input.courseQuality === "Whatever fits budget" &&
        r.input.activities.length === 0
    );
    if (match) groupOutputs.add(match.picks.map((p) => p.id).sort().join(","));
  }
  sensitivities.push({
    param: "Group Size",
    uniqueOutputSets: groupOutputs.size,
    totalTests: GROUP_SIZES.length,
    sensitivityPct: ((groupOutputs.size / GROUP_SIZES.length) * 100).toFixed(0),
  });

  // Region sensitivity
  const regionOutputs = new Set<string>();
  for (const region of REGIONS) {
    const match = results.find(
      (r) =>
        r.input.region === region &&
        !r.input.season &&
        r.input.groupSize === 12 &&
        r.input.numberOfDays === 3 &&
        r.input.budget === "$2K+" &&
        r.input.courseQuality === "Whatever fits budget" &&
        r.input.activities.length === 0
    );
    if (match) regionOutputs.add(match.picks.map((p) => p.id).sort().join(","));
  }
  sensitivities.push({
    param: "Region",
    uniqueOutputSets: regionOutputs.size,
    totalTests: REGIONS.length,
    sensitivityPct: ((regionOutputs.size / REGIONS.length) * 100).toFixed(0),
  });

  // Activity sensitivity
  const actOutputs = new Set<string>();
  for (const act of SINGLE_ACTIVITIES) {
    const match = results.find(
      (r) =>
        !r.input.region &&
        !r.input.season &&
        r.input.groupSize === 12 &&
        r.input.numberOfDays === 4 &&
        r.input.budget === "$2K+" &&
        r.input.courseQuality === "Mix of public & resort" &&
        r.input.activities.length === 1 &&
        r.input.activities[0] === act
    );
    if (match) actOutputs.add(match.picks.map((p) => p.id).sort().join(","));
  }
  sensitivities.push({
    param: "Activity",
    uniqueOutputSets: actOutputs.size,
    totalTests: SINGLE_ACTIVITIES.length,
    sensitivityPct: ((actOutputs.size / SINGLE_ACTIVITIES.length) * 100).toFixed(0),
  });

  return sensitivities;
}

function analyzeDominance(results: RunResult[]) {
  // Find destinations that appear in > threshold % of all runs
  const totalRuns = results.length;
  const destRunCounts = new Map<string, number>();

  for (const r of results) {
    const ids = new Set(r.picks.map((p) => p.id));
    for (const id of ids) {
      destRunCounts.set(id, (destRunCounts.get(id) || 0) + 1);
    }
  }

  const dominant = [...destRunCounts.entries()]
    .map(([id, count]) => {
      const d = allDestinations.find((d) => d.id === id)!;
      return {
        id,
        city: d.city,
        state: d.state,
        region: d.region,
        appearsInPct: ((count / totalRuns) * 100).toFixed(1),
        count,
      };
    })
    .sort((a, b) => b.count - a.count);

  // Also count unique output sets
  const uniqueSets = new Set(results.map((r) => r.picks.map((p) => p.id).sort().join(",")));

  return { dominant, uniqueOutputSets: uniqueSets.size, totalRuns };
}

function analyzeScoreBreakdown() {
  // For each destination, compute what its score looks like with neutral inputs
  const neutralOpts = {
    budget: "$2K+",
    courseQuality: "Whatever fits budget",
    groupSize: 12,
    numberOfDays: 3,
    activities: [] as string[],
  };

  // We need to manually compute score components since scoreDestination is private
  // Replicate the logic to show breakdowns
  function budgetToRange(budget: string): [number, number] {
    switch (budget) {
      case "Under $500": return [0, 500];
      case "$500\u20131K": return [500, 1000];
      case "$1K\u20132K": return [1000, 2000];
      case "$2K+": return [2000, 5000];
      case "Money is no object": return [0, 99999];
      default: return [0, 99999];
    }
  }

  const allTiers = ["budget", "solid", "premium", "bucket-list"] as const;

  function budgetToRange(budget: string): [number, number] {
    switch (budget) {
      case "Under $500": return [0, 500];
      case "$500\u20131K": return [500, 1000];
      case "$1K\u20132K": return [1000, 2000];
      case "$2K+": return [2000, 5000];
      case "Money is no object": return [0, 99999];
      default: return [0, 99999];
    }
  }

  const budgetRange = budgetToRange(neutralOpts.budget);

  return allDestinations.map((d) => {
    const matchingCourses = d.courses.filter((c) => allTiers.includes(c.tier as any));
    const courseQualityPts = Math.min(matchingCourses.length, 3) * 10;

    const avgGreenFee = d.courses.reduce((s, c) => s + (c.greenFeeRange[0] + c.greenFeeRange[1]) / 2, 0) / d.courses.length;
    const golfDays = Math.max(neutralOpts.numberOfDays - 1, 1);
    const rounds = golfDays * 2;
    const nights = neutralOpts.numberOfDays + 1;
    const lodgingCosts = d.lodging.map((l) => (l.nightlyRange[0] + l.nightlyRange[1]) / 2).sort((a, b) => a - b);
    const medianLodging = lodgingCosts[Math.floor(lodgingCosts.length / 2)];
    const lodgingPerPerson = (medianLodging * nights) / Math.max(neutralOpts.groupSize, 8);
    const foodEstimate = neutralOpts.numberOfDays * 75;
    const estimatedPerPerson = avgGreenFee * rounds + lodgingPerPerson + foodEstimate;

    // Budget fit — gradient scoring
    let budgetFitPts: number;
    if (budgetRange[1] < 99999) {
      const midBudget = (budgetRange[0] + budgetRange[1]) / 2;
      const distance = Math.abs(estimatedPerPerson - midBudget) / Math.max(midBudget, 1);
      budgetFitPts = Math.round(Math.max(0, 20 - distance * 30));
    } else {
      budgetFitPts = 10;
    }

    // Course count — flat bonus
    const courseCountPts = d.courses.length >= 3 ? 8 : 0;

    const walkableBars = d.bars.filter((b) => b.walkableFromDowntown).length;
    const walkableBarPts = Math.min(walkableBars, 4) * 4;
    const lateNightPts = Math.min(d.bars.filter((b) => b.lateNight).length, 3) * 2;
    const diningPts = Math.min(d.dining.length, 4) * 2;
    const activityPts = Math.min(d.activities.length, 4) * 3;

    let airportPts = 0;
    if (d.nearestAirport.driveMinutes <= 30) airportPts = 5;
    else if (d.nearestAirport.driveMinutes <= 60) airportPts = 3;

    const arrivalActivityPts = d.activities.some((a) => a.bestFor === "arrival day" && a.groupFriendly) ? 8 : 0;

    // Regional diversity bonus (no region specified in neutral test)
    const regionSize = allDestinations.filter((dd) => dd.region === d.region).length;
    const avgRegionSize = allDestinations.length / 7;
    const diversityPts = Math.round((avgRegionSize / regionSize) * 3);

    const total = courseQualityPts + budgetFitPts + courseCountPts + walkableBarPts + lateNightPts + diningPts + activityPts + airportPts + arrivalActivityPts + diversityPts;

    return {
      id: d.id,
      city: d.city,
      state: d.state,
      region: d.region,
      total,
      courseQuality: courseQualityPts,
      budgetFit: budgetFitPts,
      courseCount: courseCountPts,
      walkableBars: walkableBarPts,
      lateNight: lateNightPts,
      dining: diningPts,
      activities: activityPts,
      airport: airportPts,
      arrivalActivity: arrivalActivityPts,
      walkableBarCount: walkableBars,
      estimatedPP: Math.round(estimatedPerPerson),
    };
  }).sort((a, b) => b.total - a.total);
}

function analyzeEmptyPools(results: RunResult[]) {
  return results.filter((r) => r.picks.length === 0).map((r) => r.input);
}

function analyzeNeverPicked() {
  const allIds = new Set(allDestinations.map((d) => d.id));
  return allIds;
}

// ── Reporter ──

function generateReport(
  results: RunResult[],
  freq: DestFreq[],
  regional: ReturnType<typeof analyzeRegionalDistribution>,
  sensitivity: ReturnType<typeof analyzeInputSensitivity>,
  dominance: ReturnType<typeof analyzeDominance>,
  scoreBreakdown: ReturnType<typeof analyzeScoreBreakdown>,
  emptyPools: TestInput[],
  label: string
): string {
  const totalRuns = results.length;
  const totalSlots = results.reduce((s, r) => s + r.picks.length, 0);
  const pickedIds = new Set(results.flatMap((r) => r.picks.map((p) => p.id)));
  const neverPicked = allDestinations.filter((d) => !pickedIds.has(d.id));

  let report = `# Engine Bias Audit Report — ${label}\n\n`;
  report += `- **Total input combos tested:** ${totalRuns.toLocaleString()}\n`;
  report += `- **Total destination slots filled:** ${totalSlots.toLocaleString()}\n`;
  report += `- **Unique output sets:** ${dominance.uniqueOutputSets} / ${totalRuns} (${((dominance.uniqueOutputSets / totalRuns) * 100).toFixed(1)}% unique)\n`;
  report += `- **Destinations in database:** ${allDestinations.length}\n`;
  report += `- **Destinations ever picked:** ${pickedIds.size}\n`;
  report += `- **Destinations NEVER picked:** ${neverPicked.length}\n`;
  report += `- **Empty result combos:** ${emptyPools.length}\n\n`;

  // Top 20 most picked
  report += `## Top 20 Most-Picked Destinations\n\n`;
  report += `| Rank | City | Region | Count | % of Slots | Budget | Mid | Premium |\n`;
  report += `|------|------|--------|-------|-----------|--------|-----|--------|\n`;
  for (let i = 0; i < Math.min(20, freq.length); i++) {
    const d = freq[i];
    report += `| ${i + 1} | ${d.city}, ${d.state} | ${d.region} | ${d.count} | ${d.pct}% | ${d.asBudget} | ${d.asMid} | ${d.asPremium} |\n`;
  }

  // Bottom 20 (least picked, excluding never-picked)
  const picked = freq.filter((d) => d.count > 0);
  report += `\n## Bottom 20 Least-Picked Destinations\n\n`;
  report += `| Rank | City | Region | Count | % of Slots |\n`;
  report += `|------|------|--------|-------|----------|\n`;
  const bottom = picked.slice(-20).reverse();
  for (const d of bottom) {
    report += `| ${picked.indexOf(d) + 1} | ${d.city}, ${d.state} | ${d.region} | ${d.count} | ${d.pct}% |\n`;
  }

  // Never picked
  if (neverPicked.length > 0) {
    report += `\n## Destinations NEVER Picked (${neverPicked.length})\n\n`;
    for (const d of neverPicked) {
      report += `- ${d.city}, ${d.state} (${d.region})\n`;
    }
  }

  // Regional distribution
  report += `\n## Regional Distribution\n\n`;
  report += `| Region | Dests | Expected % | Actual % | Ratio (1.0 = fair) |\n`;
  report += `|--------|-------|-----------|---------|-------------------|\n`;
  for (const r of regional) {
    const ratioNum = parseFloat(r.ratio as string);
    const flag = ratioNum > 1.5 || ratioNum < 0.5 ? " **BIASED**" : "";
    report += `| ${r.region} | ${r.destCount} | ${r.expectedPct}% | ${r.actualPct}% | ${r.ratio}${flag} |\n`;
  }

  // Input sensitivity
  report += `\n## Input Sensitivity\n\n`;
  report += `| Parameter | Unique Outputs | Total Values | Sensitivity |\n`;
  report += `|-----------|---------------|-------------|------------|\n`;
  for (const s of sensitivity) {
    const flag = parseInt(s.sensitivityPct) < 50 ? " **LOW**" : "";
    report += `| ${s.param} | ${s.uniqueOutputSets} | ${s.totalTests} | ${s.sensitivityPct}%${flag} |\n`;
  }

  // Score breakdown — top 10 highest scorers
  report += `\n## Score Breakdown (Neutral Inputs — Top 15)\n\n`;
  report += `| City | Region | Total | CourseQ | Budget | CourseN | WalkBars | LateNt | Dining | Acts | Airport | Arrival | WalkBarCount | Est$/pp |\n`;
  report += `|------|--------|-------|--------|--------|---------|----------|--------|--------|------|---------|---------|-------------|--------|\n`;
  for (let i = 0; i < Math.min(15, scoreBreakdown.length); i++) {
    const d = scoreBreakdown[i];
    report += `| ${d.city}, ${d.state} | ${d.region} | ${d.total} | ${d.courseQuality} | ${d.budgetFit} | ${d.courseCount} | ${d.walkableBars} | ${d.lateNight} | ${d.dining} | ${d.activities} | ${d.airport} | ${d.arrivalActivity} | ${d.walkableBarCount} | $${d.estimatedPP} |\n`;
  }

  // Dominance — top 10
  report += `\n## Dominance (Destinations appearing in most runs)\n\n`;
  report += `| City | Region | Appears In | % of Runs |\n`;
  report += `|------|--------|-----------|----------|\n`;
  for (let i = 0; i < Math.min(10, dominance.dominant.length); i++) {
    const d = dominance.dominant[i];
    report += `| ${d.city}, ${d.state} | ${d.region} | ${d.count} | ${d.appearsInPct}% |\n`;
  }

  // Concentration metrics
  const top5Pct = freq.slice(0, 5).reduce((s, d) => s + parseFloat(d.pct), 0);
  const top10Pct = freq.slice(0, 10).reduce((s, d) => s + parseFloat(d.pct), 0);
  report += `\n## Concentration Metrics\n\n`;
  report += `- **Top 5 destinations hold:** ${top5Pct.toFixed(1)}% of all slots\n`;
  report += `- **Top 10 destinations hold:** ${top10Pct.toFixed(1)}% of all slots\n`;
  report += `- **Fair share per destination:** ${(100 / allDestinations.length).toFixed(2)}%\n`;
  const maxFairRatio = parseFloat(freq[0]?.pct || "0") / (100 / allDestinations.length);
  report += `- **Most over-represented:** ${freq[0]?.city}, ${freq[0]?.state} at ${maxFairRatio.toFixed(1)}x fair share\n`;

  return report;
}

// ── Main ──

console.log("Tour de Fore Engine Bias Audit");
console.log("==============================\n");

console.log(`Database: ${allDestinations.length} destinations across ${REGIONS.length} regions`);

const inputs = generateInputs();
console.log(`Generated ${inputs.length} input combinations\n`);

console.log("Running baseline audit (popularity = 0)...");
const results = runAudit(inputs);
console.log(`Completed ${results.length} runs\n`);

const freq = analyzeFrequency(results);
const regional = analyzeRegionalDistribution(results);
const sensitivity = analyzeInputSensitivity(results);
const dominance = analyzeDominance(results);
const scoreBreakdown = analyzeScoreBreakdown();
const emptyPools = analyzeEmptyPools(results);

const report = generateReport(results, freq, regional, sensitivity, dominance, scoreBreakdown, emptyPools, "BASELINE (pre-fix)");

// Print summary to console
console.log("=== TOP 10 MOST PICKED ===");
for (let i = 0; i < Math.min(10, freq.length); i++) {
  const d = freq[i];
  console.log(`  ${i + 1}. ${d.city}, ${d.state} (${d.region}) — ${d.count} picks (${d.pct}%)`);
}

console.log("\n=== NEVER PICKED ===");
const pickedIds = new Set(results.flatMap((r) => r.picks.map((p) => p.id)));
const neverPicked = allDestinations.filter((d) => !pickedIds.has(d.id));
for (const d of neverPicked) {
  console.log(`  - ${d.city}, ${d.state} (${d.region})`);
}
if (neverPicked.length === 0) console.log("  (none)");

console.log("\n=== REGIONAL BALANCE ===");
for (const r of regional) {
  console.log(`  ${r.region}: ${r.actualPct}% actual vs ${r.expectedPct}% expected (ratio: ${r.ratio})`);
}

console.log("\n=== INPUT SENSITIVITY ===");
for (const s of sensitivity) {
  console.log(`  ${s.param}: ${s.uniqueOutputSets}/${s.totalTests} unique outputs (${s.sensitivityPct}%)`);
}

console.log("\n=== CONCENTRATION ===");
const top5Pct = freq.slice(0, 5).reduce((s, d) => s + parseFloat(d.pct), 0);
const top10Pct = freq.slice(0, 10).reduce((s, d) => s + parseFloat(d.pct), 0);
console.log(`  Top 5 hold ${top5Pct.toFixed(1)}% of all slots`);
console.log(`  Top 10 hold ${top10Pct.toFixed(1)}% of all slots`);
console.log(`  Fair share: ${(100 / allDestinations.length).toFixed(2)}% per destination`);

console.log("\n=== SCORE BREAKDOWN (Top 5 neutral-input scores) ===");
for (let i = 0; i < Math.min(5, scoreBreakdown.length); i++) {
  const d = scoreBreakdown[i];
  console.log(`  ${d.city}, ${d.state}: total=${d.total} [courseQ=${d.courseQuality}, budget=${d.budgetFit}, courseN=${d.courseCount}, walkBars=${d.walkableBars}(${d.walkableBarCount} bars), dining=${d.dining}, acts=${d.activities}, airport=${d.airport}, arrival=${d.arrivalActivity}]`);
}

// ── Filter funnel analysis: why are destinations never picked? ──
console.log("\n=== FILTER FUNNEL ANALYSIS (never-picked destinations) ===");
const neverPickedDests = allDestinations.filter((d) => !pickedIds.has(d.id));
for (const d of neverPickedDests.slice(0, 15)) {
  const seasons = d.bestSeasons.join(",");
  const maxSleeps = Math.max(...d.lodging.map((l) => l.sleeps[1]));
  const courseCount = d.courses.length;
  const barCount = d.bars.length;
  const walkBars = d.bars.filter((b) => b.walkableFromDowntown).length;
  const actTypes = [...new Set(d.activities.map((a) => a.type))];
  const arrivalActs = d.activities.filter((a) => a.bestFor === "arrival day" && a.groupFriendly).length;
  console.log(`  ${d.city}, ${d.state} (${d.region}): seasons=[${seasons}], maxSleeps=${maxSleeps}, courses=${courseCount}, bars=${barCount}(${walkBars} walk), actTypes=[${actTypes.join(",")}], arrivalActs=${arrivalActs}`);
}

// Check: how many destinations survive each filter for the "no region, no season, group=12" baseline?
const baseFilter = filterDestinations({ groupSize: 12, budget: "$2K+", courseQuality: "Whatever fits budget" });
console.log(`\n  Baseline filter (group=12, no region, no season): ${baseFilter.length}/${allDestinations.length} survive`);
const baseFilterIds = new Set(baseFilter.map((d) => d.id));
const filteredOut = allDestinations.filter((d) => !baseFilterIds.has(d.id));
console.log(`  Filtered out by group size 12:`);
for (const d of filteredOut) {
  const maxSleeps = Math.max(...d.lodging.map((l) => l.sleeps[1]));
  console.log(`    - ${d.city}, ${d.state} (maxSleeps=${maxSleeps})`);
}

// Save report
const reportPath = path.join(__dirname, "AUDIT-REPORT.md");
fs.writeFileSync(reportPath, report);
console.log(`\nFull report saved to: ${reportPath}`);
