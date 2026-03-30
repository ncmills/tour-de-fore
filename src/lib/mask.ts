import type { GeneratedPlan, ThreePlanResult } from "./plan-types";

/**
 * Masks specific venue names, links, and contact info for free users.
 * Keeps: tier, style, price range, ratings, amenities, descriptions, schedule structure.
 * Hides: exact names, URLs, addresses, booking links.
 */

const courseLabels: Record<string, string> = {
  "bucket-list": "Bucket-List Course",
  "premium": "Premium Course",
  "solid": "Solid Mid-Tier Course",
  "budget": "Budget-Friendly Course",
};

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

function maskName(realName: string, fallback: string, index: number): string {
  // Keep the first word if it's generic (e.g., "The"), otherwise use fallback
  return `${fallback} ${String.fromCharCode(65 + index)}`; // "Premium Course A", "Steakhouse B"
}

export function maskPlan(plan: GeneratedPlan): GeneratedPlan {
  return {
    ...plan,
    lodging: {
      ...plan.lodging,
      name: `${plan.lodging.type} Option`,
      address: "Location revealed with subscription",
      url: undefined,
      rationale: plan.lodging.rationale, // keep the reasoning
    },
    lodgingAlternatives: plan.lodgingAlternatives?.map((alt, i) => ({
      ...alt,
      name: `Alternative ${String.fromCharCode(65 + i)}`,
    })),
    courses: plan.courses.map((c, i) => ({
      ...c,
      name: maskName(c.name, courseLabels[c.whyThisCourse?.includes("bucket") ? "bucket-list" : "solid"] || "Golf Course", i),
      url: undefined,
      imageSearch: undefined,
    })),
    courseAlternatives: plan.courseAlternatives?.map((alt, i) => ({
      ...alt,
      name: `Alternative Course ${String.fromCharCode(65 + i)}`,
    })),
    dining: plan.dining.map((d, i) => ({
      ...d,
      name: maskName(d.name, diningLabels[d.type] || "Restaurant", i),
      url: undefined,
      imageSearch: undefined,
    })),
    diningAlternatives: plan.diningAlternatives?.map((alt, i) => ({
      ...alt,
      name: `Alternative ${String.fromCharCode(65 + i)}`,
    })),
    bars: plan.bars.map((b, i) => ({
      ...b,
      name: `${b.vibe.charAt(0).toUpperCase() + b.vibe.slice(1)} Bar ${String.fromCharCode(65 + i)}`,
      url: undefined,
    })),
    // Keep schedule structure but mask venue names in activities
    schedule: plan.schedule.map((day) => ({
      ...day,
      items: day.items.map((item) => ({
        ...item,
        // Keep times and types, mask specific venue references in activity text
        detail: item.detail ? item.detail.replace(/https?:\/\/[^\s]+/g, "[link hidden]") : item.detail,
      })),
    })),
    // Keep pro tips but strip any URLs
    proTips: plan.proTips.map((tip) =>
      tip.replace(/https?:\/\/[^\s]+/g, "[link — subscribe to reveal]")
    ),
    groupLogistics: {
      ...plan.groupLogistics,
      transport: plan.groupLogistics.transport.replace(/https?:\/\/[^\s]+/g, "[link hidden]"),
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
