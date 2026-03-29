import { Destination, Region, Season, CourseTier, ActivityType } from "./types";
import { allDestinations } from "./index";
import type { PriceLevel } from "@/lib/plan-types";

// ── Popularity cache (injected from server-side before picking) ──
let _popularityScores: Map<string, number> = new Map();

export function setPopularityScores(scores: Map<string, number>) {
  _popularityScores = scores;
}

// ── Filter destinations by wizard inputs ──

interface FilterOptions {
  region?: string;
  specificCity?: string;
  season?: Season;
  groupSize?: number;
  budget?: string;
  courseQuality?: string;
  activities?: string[];
}

function budgetToRange(budget: string): [number, number] {
  switch (budget) {
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

function computePriceIndex(d: Destination, groupSize: number): number {
  const avgGreenFee =
    d.courses.reduce((sum, c) => sum + (c.greenFeeRange[0] + c.greenFeeRange[1]) / 2, 0) /
    d.courses.length;

  const cheapestLodging = Math.min(...d.lodging.map((l) => l.nightlyRange[0]));
  const lodgingPerPerson = (cheapestLodging * 4) / Math.max(groupSize, 8); // 4 nights

  // 6 rounds of golf + lodging + food estimate
  return avgGreenFee * 6 + lodgingPerPerson + 300;
}

// ── Score a destination based on user preferences ──

function scoreDestination(d: Destination, options: FilterOptions): number {
  const budgetRange = budgetToRange(options.budget || "");
  const desiredTiers = courseQualityToTiers(options.courseQuality || "");
  let score = 0;

  // Course quality match
  const matchingCourses = d.courses.filter((c) => desiredTiers.includes(c.tier));
  score += matchingCourses.length * 10;

  // Budget fit
  const estimatedPerPerson = computePriceIndex(d, options.groupSize || 12);
  if (estimatedPerPerson >= budgetRange[0] && estimatedPerPerson <= budgetRange[1]) {
    score += 20;
  }

  // Number of courses available
  score += Math.min(d.courses.length, 6) * 3;

  // Bar/nightlife scene
  score += Math.min(d.bars.length, 5) * 2;

  // Dining options
  score += Math.min(d.dining.length, 5) * 2;

  // Activity options
  score += Math.min(d.activities.length, 4) * 3;

  // Airport convenience
  if (d.nearestAirport.driveMinutes <= 30) score += 5;
  else if (d.nearestAirport.driveMinutes <= 60) score += 3;

  // Activity match bonus
  if (options.activities && options.activities.length > 0) {
    const requestedTypes = options.activities
      .map(wizardActivityToType)
      .filter(Boolean) as ActivityType[];
    const matchCount = requestedTypes.filter((type) =>
      d.activities.some((a) => a.type === type)
    ).length;
    score += matchCount * 8;
  }

  // Popularity bonus from user feedback (learning engine)
  // Max +15 points for destinations users consistently choose
  const popularity = _popularityScores.get(d.id) || 0;
  score += Math.round(popularity * 15);

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
      priceIndex: computePriceIndex(d, options.groupSize || 12),
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
    priceIndex: computePriceIndex(d, options.groupSize || 12),
  }));

  // Score neighbor destinations
  const scoredNeighbors = neighborDestinations.map((d) => ({
    destination: d,
    score: scoreDestination(d, options),
    priceIndex: computePriceIndex(d, options.groupSize || 12),
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

  // Pick the highest-scored from each pool
  const pickBest = (pool: typeof byPrice) =>
    pool.reduce((best, curr) => (curr.score > best.score ? curr : best));

  const budgetPick = pickBest(budgetPool);
  const premiumPick = pickBest(premiumPool.length > 0 ? premiumPool : midPool);

  // For mid: pick best from mid pool, excluding budget/premium picks
  const midCandidates = midPool.filter(
    (d) =>
      d.destination.id !== budgetPick.destination.id &&
      d.destination.id !== premiumPick.destination.id
  );

  let midPick: typeof budgetPick;
  if (midCandidates.length > 0) {
    midPick = pickBest(midCandidates);
  } else {
    // Fallback: pick from all remaining
    const remaining = byPrice.filter(
      (d) =>
        d.destination.id !== budgetPick.destination.id &&
        d.destination.id !== premiumPick.destination.id
    );
    midPick = remaining.length > 0 ? pickBest(remaining) : budgetPick;
  }

  // Now decide: 2 from primary region + 1 neighbor, or all 3 from primary
  const result: PickedDestination[] = [
    { ...budgetPick, priceLevel: "budget" },
    { ...midPick, priceLevel: "mid" },
    { ...premiumPick, priceLevel: "premium" },
  ];

  // Try to swap one slot (preferably the mid) with a good neighbor
  if (scoredNeighbors.length > 0) {
    const bestNeighbor = scoredNeighbors.reduce((best, curr) =>
      curr.score > best.score ? curr : best
    );

    // Only swap if the neighbor scores reasonably well (within 80% of mid pick)
    if (bestNeighbor.score >= midPick.score * 0.8) {
      // Determine neighbor's price level
      let neighborLevel: PriceLevel;
      if (bestNeighbor.priceIndex <= budgetPick.priceIndex * 1.1) {
        neighborLevel = "budget";
      } else if (bestNeighbor.priceIndex >= premiumPick.priceIndex * 0.9) {
        neighborLevel = "premium";
      } else {
        neighborLevel = "mid";
      }

      // Replace the matching tier slot with the neighbor
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

  // If we lost a slot due to dedup, fill from remaining
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
        `  - ${c.name} (${c.tier}) — $${c.greenFeeRange[0]}-${c.greenFeeRange[1]}/person, ${c.holes}h par ${c.par}, slope ${c.slope}, ${c.style}${c.walkable ? ", walkable" : ""} — ${c.highlight}${c.url ? ` | ${c.url}` : ""}`
    )
    .join("\n");

  const lodgingList = d.lodging
    .map(
      (l) =>
        `  - ${l.type} (sleeps ${l.sleeps[0]}-${l.sleeps[1]}) — $${l.nightlyRange[0]}-${l.nightlyRange[1]}/night — ${l.amenities.join(", ")} — ${l.notes}`
    )
    .join("\n");

  const diningList = d.dining
    .map(
      (r) =>
        `  - ${r.name} (${r.style}, ${r.priceRange}) — ${r.highlight}${r.capacity === "large-group" ? " [handles 16+]" : ""}`
    )
    .join("\n");

  const barList = d.bars
    .map(
      (b) =>
        `  - ${b.name} (${b.vibe}) — ${b.highlight}${b.lateNight ? " [late night]" : ""}`
    )
    .join("\n");

  const activityList = d.activities
    .map(
      (a) =>
        `  - ${a.name} (${a.type}) — $${a.pricePerPerson[0]}-${a.pricePerPerson[1]}/person, ${a.duration} — ${a.highlight} [${a.bestFor}]`
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
