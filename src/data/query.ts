import { Destination, Region, Season, CourseTier, ActivityType } from "./types";
import { allDestinations } from "./index";

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
  };
  return map[label] || null;
}

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
    // If no exact match, return all (Claude will pick from general knowledge)
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
      // Prefer destinations that have at least one requested activity
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

// ── Score and rank destinations ──

export function rankDestinations(
  destinations: Destination[],
  options: FilterOptions
): Destination[] {
  const budgetRange = budgetToRange(options.budget || "");
  const desiredTiers = courseQualityToTiers(options.courseQuality || "");

  return destinations
    .map((d) => {
      let score = 0;

      // Course quality match
      const matchingCourses = d.courses.filter((c) =>
        desiredTiers.includes(c.tier)
      );
      score += matchingCourses.length * 10;

      // Budget fit: check average green fee vs budget
      const avgGreenFee =
        d.courses.reduce((sum, c) => sum + (c.greenFeeRange[0] + c.greenFeeRange[1]) / 2, 0) /
        d.courses.length;
      const estimatedPerPerson = avgGreenFee * 6 + // 6 rounds
        (d.lodging[0]?.nightlyRange[0] || 500) / (options.groupSize || 12) * 4 + // 4 nights
        300; // food/drinks estimate
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

      // TDF tested bonus
      if (d.tdfTested) score += 5;

      // Airport convenience
      if (d.nearestAirport.driveMinutes <= 30) score += 5;
      else if (d.nearestAirport.driveMinutes <= 60) score += 3;

      return { destination: d, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((item) => item.destination);
}

// ── Build context string for Claude prompt ──

export function buildDestinationContext(
  destinations: Destination[],
  maxDestinations: number = 5
): string {
  const top = destinations.slice(0, maxDestinations);

  return top
    .map((d) => {
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
    })
    .join("\n");
}
