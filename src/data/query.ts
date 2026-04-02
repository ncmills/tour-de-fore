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
  budget?: string;
  courseQuality?: string;
  activities?: string[];
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

function regionLabelToRegion(label: string): Region | null {
  const map: Record<string, Region> = {
    "Southwest": "Southwest",
    "Pacific NW": "Pacific NW",
    "Midwest": "Midwest",
    "Southeast": "Southeast",
    "Northeast": "Northeast",
    "Mountain West": "Mountain West",
    "South Central": "South Central",
  };
  return map[label] || null;
}

// ── Neighbor regions for diversity ──

const neighborRegions: Record<Region, Region[]> = {
  "Southwest": ["Mountain West", "South Central"],
  "Pacific NW": ["Mountain West"],
  "Mountain West": ["Pacific NW", "Southwest", "Midwest"],
  "Midwest": ["Mountain West", "Northeast", "Southeast"],
  "Southeast": ["South Central", "Northeast", "Midwest"],
  "Northeast": ["Midwest", "Southeast"],
  "South Central": ["Southwest", "Southeast", "Midwest"],
};

// ── Filter destinations ──

export function filterDestinations(options: FilterOptions): Destination[] {
  let results = [...allDestinations];

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

// ── Compute price index for a destination ──

function computePriceIndex(d: Destination, groupSize: number, numberOfDays: number = 3): number {
  const avgGreenFee =
    d.courses.reduce((sum, c) => sum + (c.greenFeeRange[0] + c.greenFeeRange[1]) / 2, 0) /
    d.courses.length;

  // Rounds = 2 per golf day (arrival day has no golf, so golf days = numberOfDays - 1)
  const golfDays = Math.max(numberOfDays - 1, 1);
  const rounds = golfDays * 2;
  const nights = numberOfDays + 1; // arrive night before, leave after last day

  // Use median lodging cost (not just cheapest floor) for better price differentiation
  const lodgingCosts = d.lodging.map((l) => (l.nightlyRange[0] + l.nightlyRange[1]) / 2).sort((a, b) => a - b);
  const medianLodging = lodgingCosts[Math.floor(lodgingCosts.length / 2)];
  const lodgingPerPerson = (medianLodging * nights) / Math.max(groupSize, 8);

  // Food scales with days: ~$75/person/day
  const foodEstimate = numberOfDays * 75;

  return avgGreenFee * rounds + lodgingPerPerson + foodEstimate;
}

// ── Score a destination based on user preferences ──

function scoreDestination(d: Destination, options: FilterOptions): number {
  const budgetRange = budgetToRange(options.budget || "");
  const desiredTiers = courseQualityToTiers(options.courseQuality || "");
  let score = 0;

  // Course quality match (capped at 3 to avoid data-richness bias)
  const matchingCourses = d.courses.filter((c) => desiredTiers.includes(c.tier));
  score += Math.min(matchingCourses.length, 3) * 10;

  // Budget fit — gradient scoring instead of binary cliff
  const estimatedPerPerson = computePriceIndex(d, options.groupSize || 12, options.numberOfDays || 3);
  if (budgetRange[1] < 99999) {
    const midBudget = (budgetRange[0] + budgetRange[1]) / 2;
    const distance = Math.abs(estimatedPerPerson - midBudget) / Math.max(midBudget, 1);
    score += Math.round(Math.max(0, 20 - distance * 30));
  } else {
    score += 10; // "Money is no object" — slight baseline, no strong preference
  }

  // Has enough courses (flat bonus, no double-stacking)
  if (d.courses.length >= 3) score += 8;

  // Bar/nightlife — capped to prevent data-richness domination
  const walkableBars = d.bars.filter((b) => b.walkableFromDowntown).length;
  score += Math.min(walkableBars, 3) * 3;
  score += Math.min(d.bars.filter((b) => b.lateNight).length, 2) * 2;

  // Dining options
  score += Math.min(d.dining.length, 3) * 2;

  // Activity options
  score += Math.min(d.activities.length, 3) * 3;

  // Airport convenience
  if (d.nearestAirport.driveMinutes <= 30) score += 5;
  else if (d.nearestAirport.driveMinutes <= 60) score += 3;

  // Arrival day activity bonus (TDF tradition) — reduced from 8 to avoid penalizing resort destinations
  const arrivalActivities = d.activities.filter((a) =>
    a.bestFor === "arrival day" && a.groupFriendly
  );
  if (arrivalActivities.length > 0) score += 5;

  // Activity type diversity — credit destinations with varied activity types
  const uniqueActivityTypes = new Set(d.activities.map((a) => a.type));
  score += Math.min(uniqueActivityTypes.size, 4) * 2;

  // Activity match bonus (capped at 3 matches to avoid runaway scoring)
  if (options.activities && options.activities.length > 0) {
    const requestedTypes = options.activities
      .map(wizardActivityToType)
      .filter(Boolean) as ActivityType[];
    const matchCount = requestedTypes.filter((type) =>
      d.activities.some((a) => a.type === type)
    ).length;
    score += Math.min(matchCount, 3) * 8;
  }

  // Popularity bonus — requires minimum impressions to avoid cold-start bias
  const popularity = _popularityScores.get(d.id) || 0;
  const viewCount = _viewCounts.get(d.id) || 0;
  if (viewCount >= 10) {
    score += Math.round(popularity * 10);
  }

  // Regional diversity bonus (when no region specified, boost underrepresented regions)
  if (!options.region) {
    const regionSize = _regionSizes.get(d.region) || 1;
    const avgRegionSize = allDestinations.length / 7;
    score += Math.round((avgRegionSize / regionSize) * 5);
  }

  return score;
}

// ── Pick 3 destinations at different price levels ──

export interface PickedDestination {
  destination: Destination;
  priceLevel: PriceLevel;
  score: number;
  priceIndex: number;
}

export function pickThreeDestinations(
  options: FilterOptions
): PickedDestination[] {
  // Get primary region destinations
  let primaryDestinations = filterDestinations(options);

  // If specific city, just return that city at all price levels
  if (options.specificCity && primaryDestinations.length > 0) {
    const d = primaryDestinations[0];
    return [{
      destination: d,
      priceLevel: "mid" as PriceLevel,
      score: scoreDestination(d, options),
      priceIndex: computePriceIndex(d, options.groupSize || 12, options.numberOfDays || 3),
    }];
  }

  // Get neighbor destinations for the wild card slot
  let neighborDestinations: Destination[] = [];
  if (options.region) {
    const region = regionLabelToRegion(options.region);
    if (region) {
      const neighbors = neighborRegions[region] || [];
      neighborDestinations = allDestinations.filter(
        (d) => neighbors.includes(d.region)
      );

      // Apply same season/size/activity filters to neighbors
      if (options.season) {
        neighborDestinations = neighborDestinations.filter((d) =>
          d.bestSeasons.includes(options.season!)
        );
      }
      if (options.groupSize) {
        neighborDestinations = neighborDestinations.filter((d) =>
          d.lodging.some((l) => options.groupSize! <= l.sleeps[1])
        );
      }
    }
  }

  // Score and sort primary destinations
  const scoredPrimary = primaryDestinations.map((d) => ({
    destination: d,
    score: scoreDestination(d, options),
    priceIndex: computePriceIndex(d, options.groupSize || 12, options.numberOfDays || 3),
  }));

  // Score neighbor destinations
  const scoredNeighbors = neighborDestinations.map((d) => ({
    destination: d,
    score: scoreDestination(d, options),
    priceIndex: computePriceIndex(d, options.groupSize || 12, options.numberOfDays || 3),
  }));

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
  const pickBest = (pool: typeof byPrice, excludeRegions?: Set<string>) => {
    const filtered = excludeRegions
      ? pool.filter((d) => !excludeRegions.has(d.destination.region))
      : pool;
    const candidates = filtered.length > 0 ? filtered : pool;
    // Sort by score descending
    const sorted = [...candidates].sort((a, b) => b.score - a.score);
    // Consider top candidates within 85% of best score for more variety
    const bestScore = sorted[0].score;
    const threshold = bestScore * 0.85;
    const topCandidates = sorted.filter((d) => d.score >= threshold);
    // Use input hash to deterministically select among top candidates
    return topCandidates[inputHash % topCandidates.length];
  };

  // When no region is specified, enforce regional diversity across the 3 picks
  const enforceRegionDiversity = !options.region;
  const usedRegions = new Set<string>();

  const budgetPick = pickBest(budgetPool);
  if (enforceRegionDiversity) usedRegions.add(budgetPick.destination.region);

  const premiumPick = pickBest(
    premiumPool.length > 0 ? premiumPool : midPool,
    enforceRegionDiversity ? usedRegions : undefined
  );
  if (enforceRegionDiversity) usedRegions.add(premiumPick.destination.region);

  // For mid: pick best from mid pool, excluding budget/premium picks and used regions
  const midCandidates = midPool.filter(
    (d) =>
      d.destination.id !== budgetPick.destination.id &&
      d.destination.id !== premiumPick.destination.id
  );

  let midPick: typeof budgetPick;
  if (midCandidates.length > 0) {
    midPick = pickBest(midCandidates, enforceRegionDiversity ? usedRegions : undefined);
  } else {
    const remaining = byPrice.filter(
      (d) =>
        d.destination.id !== budgetPick.destination.id &&
        d.destination.id !== premiumPick.destination.id
    );
    midPick = remaining.length > 0
      ? pickBest(remaining, enforceRegionDiversity ? usedRegions : undefined)
      : budgetPick;
  }

  // When region IS specified, try swapping mid with a neighbor region pick
  const result: PickedDestination[] = [
    { ...budgetPick, priceLevel: "budget" },
    { ...midPick, priceLevel: "mid" },
    { ...premiumPick, priceLevel: "premium" },
  ];

  if (options.region && scoredNeighbors.length > 0) {
    const bestNeighbor = scoredNeighbors.reduce((best, curr) =>
      curr.score > best.score ? curr : best
    );

    if (bestNeighbor.score >= midPick.score * 0.8) {
      let neighborLevel: PriceLevel;
      if (bestNeighbor.priceIndex <= budgetPick.priceIndex * 1.1) {
        neighborLevel = "budget";
      } else if (bestNeighbor.priceIndex >= premiumPick.priceIndex * 0.9) {
        neighborLevel = "premium";
      } else {
        neighborLevel = "mid";
      }

      const slotIndex = result.findIndex((r) => r.priceLevel === neighborLevel);
      if (slotIndex >= 0) {
        result[slotIndex] = {
          ...bestNeighbor,
          priceLevel: neighborLevel,
        };
      }
    }
  }

  // Ensure all 3 are different cities
  const seen = new Set<string>();
  const deduped: PickedDestination[] = [];
  for (const pick of result) {
    if (!seen.has(pick.destination.id)) {
      seen.add(pick.destination.id);
      deduped.push(pick);
    }
  }

  if (deduped.length < 3) {
    const allCandidates = [...scoredPrimary, ...scoredNeighbors]
      .filter((d) => !seen.has(d.destination.id))
      .sort((a, b) => b.score - a.score);

    for (const candidate of allCandidates) {
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
        `  - ${c.name} (${c.tier}) — $${c.greenFeeRange[0]}-${c.greenFeeRange[1]}/person, ${c.holes}h par ${c.par}, ${c.yardage}yd, slope ${c.slope}, rating ${c.rating}, ${c.style}${c.walkable ? ", walkable" : ""}, ${c.driveMinutes} min drive — ${c.highlight}${c.url ? ` | ${c.url}` : ""}`
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
