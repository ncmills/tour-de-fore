import type { GeneratedPlan, ThreePlanResult } from "./plan-types";

/**
 * Masks specific venue names, links, and contact info for free users.
 * Keeps: tier, style, price range, ratings, amenities, descriptions, schedule structure.
 * Hides: exact names, URLs, addresses, booking links.
 */

const diningLabels: Record<string, string> = {
  "steakhouse": "Steakhouse",
  "bbq": "BBQ Joint",
  "seafood": "Seafood Spot",
  "upscale": "Upscale Restaurant",
  "casual": "Casual Eatery",
  "brewpub": "Brewpub",
  "mexican": "Mexican Restaurant",
  "italian": "Italian Restaurant",
  "southern": "Southern Kitchen",
  "farm-to-table": "Farm-to-Table",
  "sushi": "Sushi Bar",
};

/**
 * Build a list of all real venue names from the plan so we can
 * search-and-replace them out of any text field.
 */
function collectRealNames(plan: GeneratedPlan): string[] {
  const names: string[] = [];

  // Course names
  names.push(...plan.courses.map((c) => c.name));
  if (plan.courseAlternatives) names.push(...plan.courseAlternatives.map((a) => a.name));

  // Dining names
  names.push(...plan.dining.map((d) => d.name));
  if (plan.diningAlternatives) names.push(...plan.diningAlternatives.map((a) => a.name));

  // Bar names
  names.push(...plan.bars.map((b) => b.name));

  // Lodging name
  names.push(plan.lodging.name);
  if (plan.lodgingAlternatives) names.push(...plan.lodgingAlternatives.map((a) => a.name));

  // Filter out very short/generic names that would cause false matches
  return names.filter((n) => n.length > 4);
}

/**
 * Replace all real venue names in a text string with [subscribe to reveal].
 */
function scrubNames(text: string, realNames: string[]): string {
  let result = text;
  // Sort by length descending so longer names are replaced first
  const sorted = [...realNames].sort((a, b) => b.length - a.length);
  for (const name of sorted) {
    // Case-insensitive replacement
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    result = result.replace(new RegExp(escaped, "gi"), "[venue — subscribe to reveal]");
  }
  // Also strip URLs
  result = result.replace(/https?:\/\/[^\s)]+/g, "[link — subscribe to reveal]");
  return result;
}

export function maskPlan(plan: GeneratedPlan): GeneratedPlan {
  const realNames = collectRealNames(plan);

  return {
    ...plan,
    lodging: {
      ...plan.lodging,
      name: `${plan.lodging.type} Option`,
      address: "Location revealed with subscription",
      url: undefined,
      rationale: scrubNames(plan.lodging.rationale, realNames),
      imageSearch: undefined,
    },
    lodgingAlternatives: plan.lodgingAlternatives?.map((alt, i) => ({
      ...alt,
      name: `Alternative ${String.fromCharCode(65 + i)}`,
      description: scrubNames(alt.description, realNames),
    })),
    courses: plan.courses.map((c, i) => {
      // Determine tier label from green fee range as a heuristic
      const avgFee = parseInt(c.greenFee.replace(/[^0-9]/g, "")) || 100;
      const tierLabel = avgFee > 250 ? "Bucket-List Course" : avgFee > 120 ? "Premium Course" : avgFee > 60 ? "Solid Mid-Tier Course" : "Budget-Friendly Course";
      return {
        ...c,
        name: `${tierLabel} ${String.fromCharCode(65 + i)}`,
        url: undefined,
        imageSearch: undefined,
        whyThisCourse: scrubNames(c.whyThisCourse, realNames),
      };
    }),
    courseAlternatives: plan.courseAlternatives?.map((alt, i) => ({
      ...alt,
      name: `Alternative Course ${String.fromCharCode(65 + i)}`,
      description: scrubNames(alt.description, realNames),
    })),
    dining: plan.dining.map((d, i) => ({
      ...d,
      name: `${diningLabels[d.type] || "Restaurant"} ${String.fromCharCode(65 + i)}`,
      url: undefined,
      imageSearch: undefined,
      description: scrubNames(d.description, realNames),
    })),
    diningAlternatives: plan.diningAlternatives?.map((alt, i) => ({
      ...alt,
      name: `Alternative ${String.fromCharCode(65 + i)}`,
      description: scrubNames(alt.description, realNames),
    })),
    bars: plan.bars.map((b, i) => ({
      ...b,
      name: `${b.vibe.charAt(0).toUpperCase() + b.vibe.slice(1)} Bar ${String.fromCharCode(65 + i)}`,
      url: undefined,
      description: scrubNames(b.description, realNames),
    })),
    schedule: plan.schedule.map((day) => ({
      ...day,
      items: day.items.map((item) => ({
        ...item,
        activity: scrubNames(item.activity, realNames),
        detail: item.detail ? scrubNames(item.detail, realNames) : undefined,
        proTip: item.proTip ? scrubNames(item.proTip, realNames) : undefined,
      })),
    })),
    proTips: plan.proTips.map((tip) => scrubNames(tip, realNames)),
    groupLogistics: {
      ...plan.groupLogistics,
      transport: scrubNames(plan.groupLogistics.transport, realNames),
      teeTimeStrategy: scrubNames(plan.groupLogistics.teeTimeStrategy, realNames),
    },
  };
}

export function maskAllPlans(plans: ThreePlanResult): ThreePlanResult {
  return {
    imp: maskPlan(plans.imp),
    devil: maskPlan(plans.devil),
    demonKing: maskPlan(plans.demonKing),
  };
}
