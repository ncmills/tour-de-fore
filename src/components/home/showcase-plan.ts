import { allDestinations } from "@/data";
import unsplashCache from "@/data/unsplash-cache.json";
import type {
  Destination,
  GolfCourse,
  LodgingOption,
  DiningSpot,
  Bar,
  Activity,
} from "@/data/types";

/**
 * pickShowcasePlans — three tiered, REAL sample plans for the homepage
 * product-shot (GeneratorShowcase).
 *
 * Data honesty (hard constraint): this NEVER invents a destination, course,
 * lodging, venue, or price. Every field resolves to a real record in
 * `src/data` (the shared golf universe), and every per-person figure is
 * derived with the SAME honest formula the live wizard uses
 * (`computePriceTargets` in src/app/api/generate-plan/route.ts) — replicated
 * here as a pure, deterministic function so the static server render is stable
 * across builds and requests (no Math.random / Date).
 *
 * The three tiers map to TDF's real tier ladder — imp / devil / demon-king —
 * and each is a GENUINELY DIFFERENT real destination spanning price: we rank
 * every full-slate destination by an honest per-person proxy and take a low /
 * mid / high pick, then price each at the matching tier. So the homepage leads
 * with a real range (a $600 buddy-trip vs a $3k+ bucket-list run), not
 * marketing fiction.
 */

const IMAGES = unsplashCache.destinations as Record<
  string,
  { url: string; alt?: string } | undefined
>;

// Reference trip the estimates assume — surfaced in the UI so the numbers are
// honest about their inputs (a group of 12 on a 4-day trip).
export const SHOWCASE_GROUP = 12;
export const SHOWCASE_DAYS = 4;

export type ShowcaseTierKey = "imp" | "devil" | "demon-king";

export interface ShowcaseTier {
  key: ShowcaseTierKey;
  /** TDF's real display label — "The Imp" / "The Devil" / "The Demon King". */
  tierName: string;
  /** TDF's real tier icon. */
  icon: string;
  /** Devil is the recommended tier (mirrors TierSelectionClient). */
  recommended: boolean;
  /** Tier accent color (mirrors PlanResultClient tierColors). */
  accent: string;
  dest: Pick<Destination, "id" | "city" | "state" | "region">;
  /** The destination's marquee course (top by tier rank, then rating). */
  course: Pick<GolfCourse, "name" | "tier" | "style" | "highlight">;
  /** Tier-appropriate real lodging (cheapest / median / priciest on-site). */
  lodging: Pick<LodgingOption, "type" | "areaDescription">;
  dining: Pick<DiningSpot, "name">;
  bar: Pick<Bar, "name"> | null;
  activity: Pick<Activity, "name"> | null;
  /** Honest per-person estimate for this tier + destination (whole dollars). */
  perPerson: number;
  imageUrl: string | null;
  imageAlt: string;
}

const COURSE_TIER_RANK: Record<GolfCourse["tier"], number> = {
  "bucket-list": 0,
  premium: 1,
  solid: 2,
  budget: 3,
};

const TIER_ACCENT: Record<ShowcaseTierKey, string> = {
  imp: "#4ade80", // var(--color-success)
  devil: "#f97316", // ember-orange (recommended)
  "demon-king": "#ef4444",
};

const TIER_NAME: Record<ShowcaseTierKey, string> = {
  imp: "The Imp",
  devil: "The Devil",
  "demon-king": "The Demon King",
};

const TIER_ICON: Record<ShowcaseTierKey, string> = {
  imp: "👿",
  devil: "😈",
  "demon-king": "👹",
};

interface TierPrices {
  imp: number;
  devil: number;
  demonKing: number;
}

/**
 * Honest per-person price per tier — a faithful, deterministic port of the
 * wizard's `computePriceTargets` (group of {SHOWCASE_GROUP}, {SHOWCASE_DAYS}
 * days). Returns whole-dollar point estimates (not ranges) for a compact UI.
 */
function tierPrices(d: Destination): TierPrices {
  const golfDays = Math.max(SHOWCASE_DAYS - 1, 1);
  const rounds = golfDays * 2; // two rounds/day
  const nights = SHOWCASE_DAYS + 1;
  const gs = Math.max(SHOWCASE_GROUP, 2);

  const coursesByFee = [...d.courses].sort(
    (a, b) =>
      (a.greenFeeRange[0] + a.greenFeeRange[1]) / 2 -
      (b.greenFeeRange[0] + b.greenFeeRange[1]) / 2,
  );
  const budgetCourses = coursesByFee.slice(
    0,
    Math.max(3, Math.ceil(coursesByFee.length / 3)),
  );
  const budgetAvgFee =
    budgetCourses.reduce((s, c) => s + c.greenFeeRange[0], 0) /
    budgetCourses.length;
  const premCourses = coursesByFee.slice(
    -Math.max(3, Math.ceil(coursesByFee.length / 3)),
  );
  const premAvgFee =
    premCourses.reduce((s, c) => s + c.greenFeeRange[1], 0) / premCourses.length;
  const midAvgFee =
    coursesByFee.reduce(
      (s, c) => s + (c.greenFeeRange[0] + c.greenFeeRange[1]) / 2,
      0,
    ) / coursesByFee.length;

  const lodgingByPrice = [...d.lodging].sort(
    (a, b) =>
      (a.nightlyRange[0] + a.nightlyRange[1]) / 2 -
      (b.nightlyRange[0] + b.nightlyRange[1]) / 2,
  );
  const cheapLodging = lodgingByPrice[0];
  const expLodging = lodgingByPrice[lodgingByPrice.length - 1];
  const midLodging = lodgingByPrice[Math.floor(lodgingByPrice.length / 2)];

  const budgetLodgingPP = (cheapLodging.nightlyRange[0] * nights) / gs;
  const midLodgingPP =
    (((midLodging.nightlyRange[0] + midLodging.nightlyRange[1]) / 2) * nights) /
    gs;
  const premLodgingPP = (expLodging.nightlyRange[1] * nights) / gs;

  const budgetTotal = Math.round(
    budgetAvgFee * rounds + budgetLodgingPP + 50 * SHOWCASE_DAYS + 100,
  );
  const midTotal = Math.round(
    midAvgFee * rounds + midLodgingPP + 75 * SHOWCASE_DAYS + 200,
  );
  const premTotal = Math.round(
    premAvgFee * rounds + premLodgingPP + 120 * SHOWCASE_DAYS + 400,
  );

  const adjustedMid = Math.max(midTotal, Math.round(budgetTotal * 1.2));
  const adjustedPrem = Math.max(premTotal, Math.round(adjustedMid * 1.3));

  const round50 = (n: number) => Math.round(n / 50) * 50;
  return {
    imp: round50(budgetTotal),
    devil: round50(adjustedMid),
    demonKing: round50(adjustedPrem),
  };
}

function hasFullSlate(d: Destination): boolean {
  return !!(
    d.courses?.length &&
    d.lodging?.length &&
    d.dining?.length &&
    d.bars?.length
  );
}

function marqueeCourse(d: Destination): GolfCourse {
  return [...d.courses].sort((a, b) => {
    const t = COURSE_TIER_RANK[a.tier] - COURSE_TIER_RANK[b.tier];
    return t !== 0 ? t : (b.googleRating ?? 0) - (a.googleRating ?? 0);
  })[0];
}

/** Cheapest / median / priciest lodging, matching the tier's price basis. */
function lodgingForTier(d: Destination, key: ShowcaseTierKey): LodgingOption {
  const byPrice = [...d.lodging].sort(
    (a, b) =>
      (a.nightlyRange[0] + a.nightlyRange[1]) / 2 -
      (b.nightlyRange[0] + b.nightlyRange[1]) / 2,
  );
  if (key === "imp") return byPrice[0];
  if (key === "demon-king") return byPrice[byPrice.length - 1];
  return byPrice[Math.floor(byPrice.length / 2)];
}

function buildTier(
  d: Destination,
  key: ShowcaseTierKey,
  perPerson: number,
): ShowcaseTier {
  const course = marqueeCourse(d);
  const lodging = lodgingForTier(d, key);
  const img = IMAGES[d.id];
  return {
    key,
    tierName: TIER_NAME[key],
    icon: TIER_ICON[key],
    recommended: key === "devil",
    accent: TIER_ACCENT[key],
    dest: { id: d.id, city: d.city, state: d.state, region: d.region },
    course: {
      name: course.name,
      tier: course.tier,
      style: course.style,
      highlight: course.highlight,
    },
    lodging: { type: lodging.type, areaDescription: lodging.areaDescription },
    dining: { name: d.dining[0].name },
    bar: d.bars[0] ? { name: d.bars[0].name } : null,
    activity: d.activities?.[0] ? { name: d.activities[0].name } : null,
    perPerson,
    imageUrl: img?.url ?? null,
    imageAlt: img?.alt || `${d.city}, ${d.state}`,
  };
}

/**
 * Returns the three tiered sample plans, budget → luxe, in tier order
 * [imp, devil, demon-king]. Deterministic. Only destinations with a full real
 * slate + a cached hero image are eligible (so the product-shot thumbnail
 * always renders); ranked by an honest mid-tier per-person proxy, then a
 * low / mid / high pick is priced at its matching tier. Guards guarantee three
 * DISTINCT destinations with strictly ascending prices.
 */
export function pickShowcasePlans(): [ShowcaseTier, ShowcaseTier, ShowcaseTier] {
  const pool = allDestinations
    .filter((d) => hasFullSlate(d) && IMAGES[d.id])
    .map((d) => ({ d, prices: tierPrices(d) }))
    .sort(
      (a, b) => a.prices.devil - b.prices.devil || a.d.id.localeCompare(b.d.id),
    );

  const n = pool.length;
  const at = (frac: number) =>
    Math.min(n - 1, Math.max(0, Math.round(frac * (n - 1))));

  let bi = at(0.15);
  let mi = at(0.55);
  let li = at(0.92);

  // Guarantee distinctness (walk outward if percentiles collide on small pools).
  while (mi <= bi && mi < n - 1) mi++;
  while (li <= mi && li < n - 1) li++;
  while (bi >= mi && bi > 0) bi--;

  const budget = buildTier(pool[bi].d, "imp", pool[bi].prices.imp);
  const mid = buildTier(pool[mi].d, "devil", pool[mi].prices.devil);
  const luxe = buildTier(pool[li].d, "demon-king", pool[li].prices.demonKing);

  // Guarantee strictly ascending displayed prices. With a low/mid/high pick
  // priced at ascending tiers this holds on real data; the walk is a safety
  // net if the dataset ever compresses.
  let liGuard = li;
  while (luxe.perPerson <= mid.perPerson && liGuard < n - 1) {
    liGuard++;
    const t = buildTier(pool[liGuard].d, "demon-king", pool[liGuard].prices.demonKing);
    luxe.perPerson = t.perPerson;
    Object.assign(luxe, t);
  }
  let biGuard = bi;
  while (budget.perPerson >= mid.perPerson && biGuard > 0) {
    biGuard--;
    const t = buildTier(pool[biGuard].d, "imp", pool[biGuard].prices.imp);
    Object.assign(budget, t);
  }

  return [budget, mid, luxe];
}
