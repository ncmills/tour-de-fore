import { Destination, Region, Season, CourseTier, ActivityType } from "./types";
import { allDestinations } from "./index";
import type { PriceLevel } from "@/lib/plan-types";

// ── Simple deterministic hash for input-sensitive tie-breaking ──
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & 0x7FFFFFFF; // keep positive 31-bit
  }
  return hash;
}

// ── Popularity cache (injected from server-side before picking) ──
let _popularityScores: Map<string, number> = new Map();
let _viewCounts: Map<string, number> = new Map();

export function setPopularityScores(scores: Map<string, number>, viewCounts?: Map<string, number>) {
  _popularityScores = scores;
  _viewCounts = viewCounts || new Map();
}

// ── Pre-computed region sizes for diversity scoring ──
const _regionSizes = new Map<string, number>();
for (const d of allDestinations) {
  _regionSizes.set(d.region, (_regionSizes.get(d.region) || 0) + 1);
}

// ── Filter destinations by wizard inputs ──

interface FilterOptions {
  region?: string;
  specificCity?: string;
  season?: Season;
  groupSize?: number;
  numberOfDays?: number;
  roundsPerDay?: string;
  budget?: string;
  courseQuality?: string;
  activities?: string[];
  // Wizard preferences that influence scoring
  nightlife?: string;
  dining?: string;
  lodgingPref?: string;
  budgetPriorities?: string[];
  mustPlayCourses?: string;
}

function roundsPerDayMultiplier(roundsPerDay?: string): number {
  if (roundsPerDay === "One (18)") return 1;
  return 2; // "Two (36)", "Let AI decide", or default
}

function budgetToRange(budget: string): [number, number] {
  switch (budget) {
    // Wizard values (current UI)
    case "$2K per person": return [0, 2000];
    case "$4K per person": return [0, 4000];
    case "$6K per person": return [0, 6000];
    case "Fat pockets": return [0, 99999];
    // Legacy audit-engine values
    case "Under $500": return [0, 500];
    case "$500–$1K": return [500, 1000];
    case "$1K–$2K": return [1000, 2000];
    case "$2K+": return [2000, 5000];
    case "Money is no object": return [0, 99999];
    default: return [0, 99999];
  }
}

function courseQualityToTiers(quality: string): CourseTier[] {
  switch (quality) {
    case "Cheap & fun": return ["budget", "solid"];
    case "Mix of public & resort": return ["solid", "premium"];
    case "Bucket list only": return ["bucket-list", "premium"];
    case "Whatever fits budget": return ["budget", "solid", "premium", "bucket-list"];
    default: return ["budget", "solid", "premium", "bucket-list"];
  }
}

function wizardActivityToType(activity: string): ActivityType | null {
  const map: Record<string, ActivityType> = {
    "Fishing": "fishing",
    "ATV": "atv",
    "Casino": "casino",
    "Spa": "spa",
    "Brewery": "brewery",
    "Shooting": "shooting",
    "Water Sports": "water-sports",
  };
  return map[activity] || null;
}

const VALID_REGIONS = new Set<Region>(["Southwest", "Pacific NW", "Midwest", "Southeast", "Northeast", "Mountain West", "South Central"]);

function regionLabelToRegion(label: string): Region | null {
  return VALID_REGIONS.has(label as Region) ? (label as Region) : null;
}

// ── Filter destinations ──

export function filterDestinations(options: FilterOptions): Destination[] {
  let results: Destination[] = allDestinations;

  // Filter by specific city (fuzzy match)
  if (options.specificCity) {
    const query = options.specificCity.toLowerCase();
    const exact = results.filter(
      (d) =>
        d.city.toLowerCase().includes(query) ||
        d.state.toLowerCase().includes(query) ||
        `${d.city}, ${d.state}`.toLowerCase().includes(query)
    );
    if (exact.length > 0) return exact;
    return results;
  }

  // Filter by region
  if (options.region) {
    const region = regionLabelToRegion(options.region);
    if (region) {
      results = results.filter((d) => d.region === region);
    }
  }

  // Filter by season
  if (options.season) {
    results = results.filter((d) => d.bestSeasons.includes(options.season!));
  }

  // Filter by group size (lodging can accommodate)
  if (options.groupSize) {
    results = results.filter((d) =>
      d.lodging.some((l) => options.groupSize! <= l.sleeps[1])
    );
  }

  // Filter by activities requested
  if (options.activities && options.activities.length > 0) {
    const requestedTypes = options.activities
      .map(wizardActivityToType)
      .filter(Boolean) as ActivityType[];

    if (requestedTypes.length > 0) {
      const withActivities = results.filter((d) =>
        requestedTypes.some((type) =>
          d.activities.some((a) => a.type === type)
        )
      );
      if (withActivities.length > 0) results = withActivities;
    }
  }

  return results;
}

// ── Price range helpers ──

function priceRangeToNumber(priceRange: string): number {
  switch (priceRange) {
    case "$": return 40;
    case "$$": return 65;
    case "$$$": return 100;
    case "$$$$": return 150;
    default: return 75;
  }
}

// ── Compute price index for a destination ──

function computePriceIndex(d: Destination, groupSize: number, numberOfDays: number = 3, roundsPerDay?: string): number {
  const avgGreenFee =
    d.courses.reduce((sum, c) => sum + (c.greenFeeRange[0] + c.greenFeeRange[1]) / 2, 0) /
    d.courses.length;

  // Rounds per golf day: 1 for "One (18)", 2 for "Two (36)" or default
  const golfDays = Math.max(numberOfDays - 1, 1);
  const rounds = golfDays * roundsPerDayMultiplier(roundsPerDay);
  const nights = numberOfDays + 1; // arrive night before, leave after last day

  // Lodging: use actual group size for per-person split
  // Small groups (<6) won't fill a big house — use cheapest lodging option that fits
  const lodgingCosts = d.lodging.map((l) => (l.nightlyRange[0] + l.nightlyRange[1]) / 2).sort((a, b) => a - b);
  const medianLodging = lodgingCosts[Math.floor(lodgingCosts.length / 2)];
  const smallGroupLodging = lodgingCosts[0]; // cheapest option for small groups
  const effectiveLodging = groupSize < 6 ? smallGroupLodging : medianLodging;
  const lodgingPerPerson = (effectiveLodging * nights) / Math.max(groupSize, 2);

  // Data-driven food estimate from actual dining prices (2.5 meals/day)
  const foodPerDay = d.dining.length > 0
    ? Math.round(d.dining.reduce((sum, r) => sum + priceRangeToNumber(r.priceRange), 0) / d.dining.length * 2.5)
    : 75;
  const foodEstimate = numberOfDays * foodPerDay;

  // Activity cost estimate (1 activity/day for up to 2 days)
  const activityEstimate = d.activities.length > 0
    ? Math.round(
        d.activities.reduce((sum, a) => sum + (a.pricePerPerson[0] + a.pricePerPerson[1]) / 2, 0) /
        d.activities.length * Math.min(numberOfDays, 2)
      )
    : 0;

  return avgGreenFee * rounds + lodgingPerPerson + foodEstimate + activityEstimate;
}

// ── Score a destination based on user preferences ──

interface ScoreResult {
  score: number;
  reasons: string[];
}

function scoreDestination(d: Destination, options: FilterOptions): ScoreResult {
  const budgetRange = budgetToRange(options.budget || "");
  const desiredTiers = courseQualityToTiers(options.courseQuality || "");
  let score = 0;
  const reasons: Array<{ pts: number; text: string }> = [];

  const hasBudgetPriority = (p: string) =>
    options.budgetPriorities?.includes(p) ?? false;

  // ── Must-play course match (dominant signal) ──
  if (options.mustPlayCourses) {
    const query = options.mustPlayCourses.toLowerCase();
    const matchedCourse = d.courses.find((c) =>
      c.name.toLowerCase().includes(query)
    );
    if (matchedCourse) {
      score += 50;
      reasons.push({ pts: 50, text: `Your must-play course ${matchedCourse.name} is here` });
    } else if (d.city.toLowerCase().includes(query)) {
      score += 30;
      reasons.push({ pts: 30, text: `Matches your must-play destination` });
    }
  }

  // ── Course quality match (capped at 3 to avoid data-richness bias) ──
  const matchingCourses = d.courses.filter((c) => desiredTiers.includes(c.tier));
  let courseScore = Math.min(matchingCourses.length, 3) * 7;
  if (hasBudgetPriority("Best courses")) courseScore = Math.round(courseScore * 1.4);
  score += courseScore;
  if (matchingCourses.length >= 2) {
    reasons.push({ pts: courseScore, text: `${matchingCourses.length} courses match your preference` });
  }

  // ── Budget fit — gradient scoring instead of binary cliff ──
  const estimatedPerPerson = computePriceIndex(d, options.groupSize || 12, options.numberOfDays || 3, options.roundsPerDay);
  if (budgetRange[1] < 99999) {
    const midBudget = (budgetRange[0] + budgetRange[1]) / 2;
    const distance = Math.abs(estimatedPerPerson - midBudget) / Math.max(midBudget, 1);
    const budgetScore = Math.round(Math.max(0, 20 - distance * 30));
    score += budgetScore;
    if (budgetScore >= 14) {
      reasons.push({ pts: budgetScore, text: `Fits your budget well` });
    }
  } else {
    score += 10;
  }

  // ── Has enough courses (flat bonus) ──
  if (d.courses.length >= 3) score += 8;

  // ── Bar/nightlife — adjusted by nightlife preference ──
  const walkableBars = d.bars.filter((b) => b.walkableFromDowntown).length;
  const lateNightBars = d.bars.filter((b) => b.lateNight).length;
  const nightlifePref = options.nightlife || "";

  if (nightlifePref === "In bed by 10") {
    // Zero bar scoring; bonus for lodging amenities instead
    const hasPoolOrTub = d.lodging.some((l) =>
      l.amenities.some((a) => /pool|hot tub|jacuzzi/i.test(a))
    );
    if (hasPoolOrTub) {
      score += 5;
      reasons.push({ pts: 5, text: "Great lodging with pool/hot tub for relaxing" });
    }
  } else if (nightlifePref === "Going out every night") {
    // Boosted bar scoring
    score += Math.min(walkableBars, 3) * 5;
    score += Math.min(lateNightBars, 2) * 4;
    if (walkableBars >= 3) {
      score += 5;
      reasons.push({ pts: 28, text: `Active nightlife scene with ${walkableBars} walkable bars` });
    }
  } else {
    // Default bar scoring (Couple nights / Point us to a bar)
    score += Math.min(walkableBars, 3) * 4;
    score += Math.min(lateNightBars, 2) * 3;
    if (walkableBars >= 2) {
      reasons.push({ pts: walkableBars * 4, text: `${walkableBars} walkable bars for after-dinner drinks` });
    }
  }

  // ── Dining options — weighted higher for dining-focused trips ──
  let diningScore = Math.min(d.dining.length, 4) * 3;
  // Bonus for variety: steakhouse + at least 2 other styles
  const hasSteak = d.dining.some((r) => r.style === "steakhouse");
  const diningStyles = new Set(d.dining.map((r) => r.style));
  if (hasSteak && diningStyles.size >= 3) diningScore += 5;
  if (hasBudgetPriority("Best dining")) {
    diningScore = Math.round(diningScore * 2);
    if (d.dining.some((r) => r.priceRange === "$$$$")) {
      diningScore += 6;
      reasons.push({ pts: diningScore, text: "Top-tier dining options available" });
    }
  }
  score += diningScore;

  // ── Activity options ──
  score += Math.min(d.activities.length, 3) * 3;

  // ── Airport convenience ──
  if (d.nearestAirport.driveMinutes <= 30) score += 5;
  else if (d.nearestAirport.driveMinutes <= 60) score += 3;

  // ── Arrival day activities (TDF tradition — boosted) ──
  const arrivalActivities = d.activities.filter((a) =>
    a.bestFor === "arrival day" && a.groupFriendly
  );
  if (arrivalActivities.length > 0) {
    score += 8;
    if (arrivalActivities.length >= 2) {
      score += 3;
      const names = arrivalActivities.slice(0, 2).map((a) => a.name);
      reasons.push({ pts: 11, text: `Great arrival-day options: ${names.join(", ")}` });
    }
  }

  // ── Activity type diversity ──
  const uniqueActivityTypes = new Set(d.activities.map((a) => a.type));
  score += Math.min(uniqueActivityTypes.size, 4) * 2;

  // ── Activity match bonus (capped at 3) ──
  if (options.activities && options.activities.length > 0) {
    const requestedTypes = options.activities
      .map(wizardActivityToType)
      .filter(Boolean) as ActivityType[];
    const matchCount = requestedTypes.filter((type) =>
      d.activities.some((a) => a.type === type)
    ).length;
    score += Math.min(matchCount, 3) * 8;
    if (matchCount > 0) {
      const matched = requestedTypes
        .filter((type) => d.activities.some((a) => a.type === type))
        .slice(0, 2);
      reasons.push({ pts: matchCount * 8, text: `Has your requested activities: ${matched.join(", ")}` });
    }
  }

  // ── Party bus scoring ──
  const fittingBus = d.partyBuses.find((b) =>
    b.canDoGolfAndBars && (options.groupSize || 12) <= b.capacity[1]
  );
  if (fittingBus) {
    score += 8;
    reasons.push({ pts: 8, text: `Party bus available for up to ${fittingBus.capacity[1]}` });
  } else if (d.partyBuses.some((b) => b.canDoGolfAndBars)) {
    score += 5;
  }

  // ── Private chef scoring ──
  if (d.privateChefs.length > 0) {
    score += 4;
    if (options.dining === "Private chef") {
      score += 6;
      reasons.push({ pts: 10, text: "Private chef options match your dining preference" });
    }
  }

  // ── Lodging preference ──
  if (options.lodgingPref === "One big house") {
    const bigHouse = d.lodging.find((l) => (options.groupSize || 12) <= l.sleeps[1]);
    if (bigHouse) {
      score += 5;
    } else {
      score -= 3;
    }
  } else if (options.lodgingPref === "Split houses") {
    if (d.lodging.length >= 2) score += 3;
  }

  // ── Best lodging priority ──
  if (hasBudgetPriority("Best lodging")) {
    const groupSize = options.groupSize || 12;
    const fitsWell = d.lodging.some((l) =>
      groupSize >= l.sleeps[0] && groupSize <= l.sleeps[1] + 2
    );
    if (fitsWell) score += 4;
    if (d.lodging.length >= 2) score += 3;
  }

  // ── Thin data penalty — destinations missing key categories rank lower ──
  if (d.bars.length === 0) score -= 10;
  else if (d.bars.length === 1) score -= 4;
  if (d.dining.length === 0) score -= 12;
  else if (d.dining.length <= 2) score -= 5;
  if (d.activities.length === 0) score -= 8;
  if (d.partyBuses.length === 0 && (options.groupSize || 12) >= 8) score -= 4;

  // ── Popularity bonus — requires minimum impressions ──
  const popularity = _popularityScores.get(d.id) || 0;
  const viewCount = _viewCounts.get(d.id) || 0;
  if (viewCount >= 10) {
    score += Math.round(popularity * 10);
  }

  // ── Regional diversity bonus (when no region specified) ──
  if (!options.region) {
    const regionSize = _regionSizes.get(d.region) || 1;
    const avgRegionSize = allDestinations.length / 7;
    score += Math.round((avgRegionSize / regionSize) * 5);
  }

  // Return top 3 reasons by impact
  const topReasons = reasons
    .sort((a, b) => b.pts - a.pts)
    .slice(0, 3)
    .map((r) => r.text);

  return { score, reasons: topReasons };
}

// ── Pick 3 destinations at different price levels ──

export interface PickedDestination {
  destination: Destination;
  priceLevel: PriceLevel;
  score: number;
  priceIndex: number;
  reasons: string[];
}

export function pickThreeDestinations(
  options: FilterOptions
): PickedDestination[] {
  // Get primary region destinations
  const primaryDestinations = filterDestinations(options);

  // If specific city, return all 3 price tiers for that same destination
  if (options.specificCity && primaryDestinations.length > 0) {
    const d = primaryDestinations[0];
    const { score, reasons } = scoreDestination(d, options);
    const priceIndex = computePriceIndex(d, options.groupSize || 12, options.numberOfDays || 3, options.roundsPerDay);
    return [
      { destination: d, priceLevel: "budget" as PriceLevel, score, priceIndex, reasons },
      { destination: d, priceLevel: "mid" as PriceLevel, score, priceIndex, reasons },
      { destination: d, priceLevel: "premium" as PriceLevel, score, priceIndex, reasons },
    ];
  }

  // Score and sort primary destinations
  const scoredPrimary = primaryDestinations.map((d) => {
    const { score, reasons } = scoreDestination(d, options);
    return {
      destination: d,
      score,
      priceIndex: computePriceIndex(d, options.groupSize || 12, options.numberOfDays || 3, options.roundsPerDay),
      reasons,
    };
  });

  // Must-play force-inclusion: if a course name matches, guarantee that destination appears
  let forcedPick: typeof scoredPrimary[0] | null = null;
  if (options.mustPlayCourses) {
    const query = options.mustPlayCourses.toLowerCase();
    forcedPick = scoredPrimary.find((s) =>
      s.destination.courses.some((c) => c.name.toLowerCase().includes(query))
    ) || scoredPrimary.find((s) =>
      s.destination.city.toLowerCase().includes(query)
    ) || null;
  }

  // Sort primary by price to classify into tiers
  const byPrice = [...scoredPrimary].sort((a, b) => a.priceIndex - b.priceIndex);

  if (byPrice.length === 0) {
    return [];
  }

  if (byPrice.length === 1) {
    return [{ ...byPrice[0], priceLevel: "mid" }];
  }

  if (byPrice.length === 2) {
    return [
      { ...byPrice[0], priceLevel: "budget" },
      { ...byPrice[1], priceLevel: "premium" },
    ];
  }

  // Classify into thirds by price
  const thirdSize = Math.ceil(byPrice.length / 3);
  const budgetPool = byPrice.slice(0, thirdSize);
  const midPool = byPrice.slice(thirdSize, thirdSize * 2);
  const premiumPool = byPrice.slice(thirdSize * 2);

  // Pick from top candidates in a pool using input-sensitive selection
  // This ensures different user inputs produce different picks among similarly-scored destinations
  const inputHash = simpleHash(JSON.stringify(options));
  const pickBest = (
    pool: typeof byPrice,
    excludeCities?: Set<string>,
    excludeRegions?: Set<string>
  ) => {
    let filtered = pool;
    if (excludeCities && excludeCities.size > 0) {
      const afterCity = filtered.filter((d) => !excludeCities.has(d.destination.id));
      if (afterCity.length > 0) filtered = afterCity;
    }
    if (excludeRegions && excludeRegions.size > 0) {
      const afterRegion = filtered.filter((d) => !excludeRegions.has(d.destination.region));
      if (afterRegion.length > 0) filtered = afterRegion;
    }
    // Sort by score descending
    const sorted = [...filtered].sort((a, b) => b.score - a.score);
    // Consider top candidates within 85% of best score for more variety
    const bestScore = sorted[0].score;
    const threshold = bestScore * 0.85;
    const topCandidates = sorted.filter((d) => d.score >= threshold);
    // Use input hash to deterministically select among top candidates
    return topCandidates[inputHash % topCandidates.length];
  };

  // Always enforce city diversity — never return the same city twice
  const usedCities = new Set<string>();
  // When no region is specified, also enforce regional diversity (unless must-play overrides)
  const enforceRegionDiversity = !options.region && !forcedPick;
  const usedRegions = new Set<string>();

  // If must-play matched, force that destination into the mid slot first
  let midPick: typeof byPrice[0] = forcedPick || byPrice[0]; // overwritten below if not forced
  if (forcedPick) {
    usedCities.add(midPick.destination.id);
  }

  const budgetPick = pickBest(budgetPool, usedCities, enforceRegionDiversity ? usedRegions : undefined);
  usedCities.add(budgetPick.destination.id);
  if (enforceRegionDiversity) usedRegions.add(budgetPick.destination.region);

  const premiumPick = pickBest(
    premiumPool.length > 0 ? premiumPool : midPool,
    usedCities,
    enforceRegionDiversity ? usedRegions : undefined
  );
  usedCities.add(premiumPick.destination.id);
  if (enforceRegionDiversity) usedRegions.add(premiumPick.destination.region);

  // For mid: pick best from mid pool if not already forced
  if (!forcedPick) {
    const midCandidates = midPool.filter(
      (d) => !usedCities.has(d.destination.id)
    );

    if (midCandidates.length > 0) {
      midPick = pickBest(midCandidates, usedCities, enforceRegionDiversity ? usedRegions : undefined);
    } else {
      const remaining = byPrice.filter(
        (d) => !usedCities.has(d.destination.id)
      );
      midPick = remaining.length > 0
        ? pickBest(remaining, usedCities, enforceRegionDiversity ? usedRegions : undefined)
        : budgetPick;
    }
  }
  usedCities.add(midPick.destination.id);

  const result: PickedDestination[] = [
    { ...budgetPick, priceLevel: "budget" },
    { ...midPick, priceLevel: "mid" },
    { ...premiumPick, priceLevel: "premium" },
  ];

  // Ensure all 3 are different cities (safety net)
  const seen = new Set<string>();
  const deduped: PickedDestination[] = [];
  for (const pick of result) {
    if (!seen.has(pick.destination.id)) {
      seen.add(pick.destination.id);
      deduped.push(pick);
    }
  }

  // Backfill only from primary region destinations (never neighbors)
  if (deduped.length < 3) {
    const backfillCandidates = scoredPrimary
      .filter((d) => !seen.has(d.destination.id))
      .sort((a, b) => b.score - a.score);

    for (const candidate of backfillCandidates) {
      if (deduped.length >= 3) break;
      const level: PriceLevel = deduped.length === 1 ? "mid" : "premium";
      deduped.push({ ...candidate, priceLevel: level });
      seen.add(candidate.destination.id);
    }
  }

  return deduped;
}

// ── Build context string for a single destination (for Claude prompt) ──

export function buildDestinationContext(destination: Destination): string {
  const d = destination;

  const courseList = d.courses
    .map(
      (c) =>
        `  - ${c.name} (${c.tier}) — $${c.greenFeeRange[0]}-${c.greenFeeRange[1]}/person, ${c.holes}h par ${c.par}, ${c.yardage}yd, ${c.style}${c.walkable ? ", walkable" : ""}, ${c.driveMinutes} min drive — ${c.highlight}${c.url ? ` | ${c.url}` : ""}`
    )
    .join("\n");

  const lodgingList = d.lodging
    .map(
      (l) =>
        `  - ${l.type} (sleeps ${l.sleeps[0]}-${l.sleeps[1]}) — $${l.nightlyRange[0]}-${l.nightlyRange[1]}/night — ${l.amenities.join(", ")} — ${l.areaDescription} — ${l.notes}${l.searchUrl ? ` | ${l.searchUrl}` : ""}`
    )
    .join("\n");

  const diningList = d.dining
    .map(
      (r) =>
        `  - ${r.name} (${r.style}, ${r.priceRange}) — ${r.highlight}${r.capacity === "large-group" ? " [handles 16+]" : ""}${r.reservationNeeded ? " [reservation needed]" : ""}`
    )
    .join("\n");

  const barList = d.bars
    .map(
      (b) =>
        `  - ${b.name} (${b.vibe}) — ${b.highlight}${b.lateNight ? " [late night]" : ""}${b.walkableFromDowntown ? " [walkable from downtown]" : ""}`
    )
    .join("\n");

  const activityList = d.activities
    .map(
      (a) =>
        `  - ${a.name} (${a.type}) — $${a.pricePerPerson[0]}-${a.pricePerPerson[1]}/person, ${a.duration} — ${a.highlight} [${a.bestFor}]${a.groupFriendly ? " [group-friendly]" : ""}${a.provider ? ` — Provider: ${a.provider}` : ""}`
    )
    .join("\n");

  const transportList = d.partyBuses
    .map(
      (t) =>
        `  - ${t.type} (${t.capacity[0]}-${t.capacity[1]} pax) — $${t.hourlyRate[0]}-${t.hourlyRate[1]}/hr — Providers: ${t.providers.join(", ")} — ${t.notes}`
    )
    .join("\n");

  const chefList = d.privateChefs
    .map(
      (c) =>
        `  - $${c.pricePerPerson[0]}-${c.pricePerPerson[1]}/person — Providers: ${c.providers.join(", ")} — Meals: ${c.mealTypes.join(", ")} — ${c.notes}`
    )
    .join("\n");

  return `
═══ ${d.city}, ${d.state} ═══
${d.tagline}
${d.description}
Population: ${d.population} | Airport: ${d.nearestAirport.code} (${d.nearestAirport.driveMinutes} min) | Best seasons: ${d.bestSeasons.join(", ")}${d.tdfTested ? ` | TDF TESTED (${d.tdfYear})` : ""}

GOLF COURSES:
${courseList}

LODGING:
${lodgingList}

DINING:
${diningList}

BARS & NIGHTLIFE:
${barList}

ACTIVITIES:
${activityList}

TRANSPORT:
${transportList}

PRIVATE CHEF:
${chefList}
`;
}
