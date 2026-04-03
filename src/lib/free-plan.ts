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
  // Pick lodging appropriate to the tier
  const fittingLodging = [...destination.lodging]
    .filter((l) => state.groupSize <= l.sleeps[1])
    .sort((a, b) => {
      const aCost = (a.nightlyRange[0] + a.nightlyRange[1]) / 2;
      const bCost = (b.nightlyRange[0] + b.nightlyRange[1]) / 2;
      // budget = cheapest, premium = most expensive, mid = median
      return priceLevel === "premium" ? bCost - aCost : aCost - bCost;
    });
  const allLodgingSorted = fittingLodging.length > 0
    ? fittingLodging
    : [...destination.lodging].sort((a, b) => {
        const aCost = (a.nightlyRange[0] + a.nightlyRange[1]) / 2;
        const bCost = (b.nightlyRange[0] + b.nightlyRange[1]) / 2;
        return priceLevel === "premium" ? bCost - aCost : aCost - bCost;
      });
  const bestLodging = priceLevel === "mid" && allLodgingSorted.length > 1
    ? allLodgingSorted[Math.floor(allLodgingSorted.length / 2)]
    : allLodgingSorted[0];

  // Pick courses appropriate to the tier
  const tierPriority: Record<PriceLevel, string[]> = {
    budget: ["budget", "solid"],
    mid: ["solid", "premium"],
    premium: ["bucket-list", "premium"],
  };
  const preferredTiers = tierPriority[priceLevel];
  const coursesForTier = destination.courses
    .filter((c) => preferredTiers.includes(c.tier))
    .sort((a, b) => {
      const aFee = (a.greenFeeRange[0] + a.greenFeeRange[1]) / 2;
      const bFee = (b.greenFeeRange[0] + b.greenFeeRange[1]) / 2;
      return priceLevel === "premium" ? bFee - aFee : aFee - bFee;
    });
  const otherCourses = destination.courses
    .filter((c) => !preferredTiers.includes(c.tier))
    .sort((a, b) => (b.googleRating || 4.5) - (a.googleRating || 4.5));
  const selectedCourses = [...coursesForTier, ...otherCourses].slice(0, 3);

  // Tier-aware pricing
  const golfDays = Math.max(state.numberOfDays - 1, 1);
  const rounds = golfDays * 2;
  // For budget use low end of fees, premium use high end, mid use midpoint
  const feeSelector: Record<PriceLevel, (c: typeof selectedCourses[0]) => number> = {
    budget: (c) => c.greenFeeRange[0],
    mid: (c) => (c.greenFeeRange[0] + c.greenFeeRange[1]) / 2,
    premium: (c) => c.greenFeeRange[1],
  };
  const avgGreenFee = selectedCourses.length > 0
    ? selectedCourses.reduce((s, c) => s + feeSelector[priceLevel](c), 0) / selectedCourses.length
    : 100;
  const nights = state.numberOfDays + 1;
  // For budget use low end of lodging, premium use high end
  const lodgingNightly = bestLodging
    ? (priceLevel === "budget" ? bestLodging.nightlyRange[0]
       : priceLevel === "premium" ? bestLodging.nightlyRange[1]
       : (bestLodging.nightlyRange[0] + bestLodging.nightlyRange[1]) / 2)
    : 300;
  const lodgingPerPerson = (lodgingNightly * nights) / Math.max(state.groupSize, 2);
  // Data-driven food estimate from actual dining prices
  const priceToNum: Record<string, number> = { "$": 30, "$$": 60, "$$$": 100, "$$$$": 150 };
  const tierDiningSelector: Record<PriceLevel, (spots: typeof destination.dining) => number> = {
    budget: (spots) => {
      const cheap = spots.filter(d => d.priceRange === "$" || d.priceRange === "$$");
      const pool = cheap.length > 0 ? cheap : spots;
      return pool.reduce((s, d) => s + (priceToNum[d.priceRange] || 60), 0) / pool.length;
    },
    mid: (spots) => spots.reduce((s, d) => s + (priceToNum[d.priceRange] || 60), 0) / spots.length,
    premium: (spots) => {
      const upscale = spots.filter(d => d.priceRange === "$$$" || d.priceRange === "$$$$");
      const pool = upscale.length > 0 ? upscale : spots;
      return pool.reduce((s, d) => s + (priceToNum[d.priceRange] || 100), 0) / pool.length;
    },
  };
  // 2 meals/day out (breakfast at the house)
  const foodPerDay = destination.dining.length > 0
    ? Math.round(tierDiningSelector[priceLevel](destination.dining) * 2)
    : ({ budget: 50, mid: 75, premium: 120 })[priceLevel];

  // Data-driven activity estimate (arrival day activity)
  const activityEstimate = destination.activities.length > 0
    ? Math.round(
        destination.activities.reduce((s, a) =>
          s + (priceLevel === "budget" ? a.pricePerPerson[0] : priceLevel === "premium" ? a.pricePerPerson[1] : (a.pricePerPerson[0] + a.pricePerPerson[1]) / 2), 0
        ) / destination.activities.length
      )
    : 0;

  // Transport estimate: party bus for mid/premium if available, rental car for budget
  const gs = Math.max(state.groupSize, 2);
  let transportEstimate = 50 * state.numberOfDays; // default: rental car split
  if (priceLevel !== "budget" && destination.partyBuses.length > 0 && gs >= 8) {
    const bus = destination.partyBuses[0];
    const hourlyRate = priceLevel === "premium" ? bus.hourlyRate[1] : (bus.hourlyRate[0] + bus.hourlyRate[1]) / 2;
    // ~6 hours/day for golf days
    transportEstimate = Math.round((hourlyRate * 6 * golfDays) / gs);
  }

  // Private chef estimate (1 night for mid, 2 for premium)
  let chefEstimate = 0;
  if (destination.privateChefs.length > 0 && priceLevel !== "budget") {
    const chef = destination.privateChefs[0];
    const ppCost = priceLevel === "premium" ? chef.pricePerPerson[1] : chef.pricePerPerson[0];
    const chefNights = priceLevel === "premium" ? 2 : 1;
    chefEstimate = ppCost * chefNights;
  }

  const totalEstimate = Math.round(
    avgGreenFee * rounds + lodgingPerPerson + foodPerDay * state.numberOfDays +
    activityEstimate + transportEstimate + chefEstimate
  );

  // Format budget range (tighter: ±15%)
  const low = Math.round(totalEstimate * 0.85);
  const high = Math.round(totalEstimate * 1.15);
  const estimatedBudget = `$${Math.round(low / 50) * 50}–$${Math.round(high / 50) * 50}`;

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
