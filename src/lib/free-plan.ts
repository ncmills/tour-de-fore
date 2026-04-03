import type { Destination } from "@/data/types";
import type { WizardState, FreePreview, PriceLevel } from "./plan-types";

/**
 * Build a free preview from database data alone — no Claude API call.
 * Shows just enough to excite the user: 1 house, 3 courses, estimated budget,
 * plus teasers for activities, bars, party bus, and private chef.
 */
export function buildFreePreview(
  destination: Destination,
  state: WizardState,
  priceLevel: PriceLevel,
  reasons: string[] = []
): FreePreview {
  // Pick the best-fit lodging (largest capacity that fits group)
  const sortedLodging = [...destination.lodging].sort((a, b) => {
    // Prefer lodging that fits the group, then by rating
    const aFits = state.groupSize <= a.sleeps[1] ? 1 : 0;
    const bFits = state.groupSize <= b.sleeps[1] ? 1 : 0;
    if (aFits !== bFits) return bFits - aFits;
    return (b.avgRating || 4.5) - (a.avgRating || 4.5);
  });
  const bestLodging = sortedLodging[0];

  // Pick 3 courses — mix tiers based on user preference
  const desiredTiers = getCourseQualityTiers(state.courseQuality);
  const matchingCourses = destination.courses
    .filter((c) => desiredTiers.includes(c.tier))
    .sort((a, b) => (b.googleRating || 4.5) - (a.googleRating || 4.5));
  const otherCourses = destination.courses
    .filter((c) => !desiredTiers.includes(c.tier))
    .sort((a, b) => (b.googleRating || 4.5) - (a.googleRating || 4.5));
  const selectedCourses = [...matchingCourses, ...otherCourses].slice(0, 3);

  // Estimate budget per person
  const golfDays = Math.max(state.numberOfDays - 1, 1);
  const rounds = golfDays * 2;
  const avgGreenFee = selectedCourses.length > 0
    ? selectedCourses.reduce((s, c) => s + (c.greenFeeRange[0] + c.greenFeeRange[1]) / 2, 0) / selectedCourses.length
    : 100;
  const nights = state.numberOfDays + 1;
  const lodgingPerPerson = bestLodging
    ? ((bestLodging.nightlyRange[0] + bestLodging.nightlyRange[1]) / 2 * nights) / Math.max(state.groupSize, 8)
    : 200;
  const foodPerDay = 75;
  const totalEstimate = Math.round(avgGreenFee * rounds + lodgingPerPerson + foodPerDay * state.numberOfDays + 200);

  // Format budget range
  const low = Math.round(totalEstimate * 0.8);
  const high = Math.round(totalEstimate * 1.3);
  const estimatedBudget = `$${Math.round(low / 100) * 100}–$${Math.round(high / 100) * 100}`;

  // Build teasers — one visible item per category to hook the user
  const arrivalActivity = destination.activities.find((a) => a.bestFor === "arrival day" && a.groupFriendly)
    || destination.activities[0];
  const activityTeaser = arrivalActivity ? {
    name: arrivalActivity.name,
    type: arrivalActivity.type,
    priceRange: `$${arrivalActivity.pricePerPerson[0]}–$${arrivalActivity.pricePerPerson[1]}`,
  } : undefined;

  const bestBar = destination.bars.find((b) => b.walkableFromDowntown && b.lateNight)
    || destination.bars[0];
  const barTeaser = bestBar ? {
    name: bestBar.name,
    vibe: bestBar.vibe,
  } : undefined;

  const partyBus = destination.partyBuses.find((b) => b.canDoGolfAndBars) || destination.partyBuses[0];
  const partyBusAvailable = partyBus ? {
    hourlyRange: partyBus.hourlyRate,
  } : undefined;

  const chef = destination.privateChefs[0];
  const privateChefAvailable = chef ? {
    pricePerPersonRange: chef.pricePerPerson,
  } : undefined;

  return {
    destinationId: destination.id,
    city: destination.city,
    state: destination.state,
    tagline: destination.tagline,
    description: destination.description,
    priceLevel,
    reasons,
    lodgingPreview: {
      type: bestLodging.type,
      sleeps: bestLodging.sleeps,
      nightlyRange: bestLodging.nightlyRange,
      amenities: bestLodging.amenities.slice(0, 4),
      areaDescription: bestLodging.areaDescription,
      avgRating: bestLodging.avgRating,
      bedsBreakdown: bestLodging.bedsBreakdown,
    },
    coursePreview: selectedCourses.map((c) => ({
      name: c.name,
      tier: c.tier,
      greenFeeRange: c.greenFeeRange,
      highlight: c.highlight,
      googleRating: c.googleRating,
      hypeTag: c.hypeTag,
    })),
    estimatedBudgetPerPerson: estimatedBudget,
    numberOfDays: state.numberOfDays,
    groupSize: state.groupSize,
    activityTeaser,
    barTeaser,
    partyBusAvailable,
    privateChefAvailable,
    lockedCounts: {
      moreHouses: Math.max(destination.lodging.length - 1, 0),
      restaurants: destination.dining.length,
      bars: destination.bars.length,
      activities: destination.activities.length,
      partyBusOptions: destination.partyBuses.length,
      privateChefOptions: destination.privateChefs.length,
    },
  };
}

function getCourseQualityTiers(quality: string): string[] {
  switch (quality) {
    case "Cheap & fun": return ["budget", "solid"];
    case "Mix of public & resort": return ["solid", "premium"];
    case "Bucket list only": return ["bucket-list", "premium"];
    case "Whatever fits budget": return ["budget", "solid", "premium", "bucket-list"];
    default: return ["budget", "solid", "premium", "bucket-list"];
  }
}
