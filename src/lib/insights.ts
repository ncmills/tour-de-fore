/**
 * Smart Insights Engine — powers contextual hints, quality badges,
 * logistics warnings, and TDF auto-pick in the trip builder.
 *
 * Bridges raw Destination data (ratings, drive times, capacity, etc.)
 * with the builder's Option cards (which only have name + price from Claude).
 */

import type { Destination, GolfCourse, DiningSpot, Bar, Activity, LodgingOption, PartyBus, PrivateChef } from "@/data/types";

// ── Insight types (plain serializable objects for client props) ──

export interface CourseInsight {
  driveMinutes: number;
  walkable: boolean;
  googleRating?: number;
  reviewCount?: number;
  golfpassRating?: number;
  rankNote?: string;
  hypeTag?: string;
  style: string;
  greenFeeRange: [number, number];
  imageUrl?: string;
}

export interface DiningInsight {
  googleRating?: number;
  reviewCount?: number;
  capacity: "small" | "medium" | "large-group";
  reservationNeeded: boolean;
  priceRange: string;
  style: string;
  imageUrl?: string;
}

export interface BarInsight {
  googleRating?: number;
  walkableFromDowntown: boolean;
  lateNight: boolean;
  vibe: string;
  imageUrl?: string;
}

export interface ActivityInsight {
  duration: string;
  groupFriendly: boolean;
  bestFor: string;
  googleRating?: number;
  reviewCount?: number;
  pricePerPerson: [number, number];
}

export interface LodgingInsight {
  avgRating?: number;
  amenities: string[];
  sleeps: [number, number];
  areaDescription: string;
  bedsBreakdown?: string;
}

export interface PartyBusInsight {
  type: string;
  capacity: [number, number];
  hourlyRate: [number, number];
  fullDayRate?: [number, number];
  canDoGolfAndBars?: boolean;
}

export interface PrivateChefInsight {
  pricePerPerson: [number, number];
  mealTypes: string[];
}

export interface InsightsContext {
  courses: Record<string, CourseInsight>;
  dining: Record<string, DiningInsight>;
  bars: Record<string, BarInsight>;
  activities: Record<string, ActivityInsight>;
  lodging: Record<string, LodgingInsight>;
  partyBuses: PartyBusInsight[];
  privateChefs: PrivateChefInsight[];
  groupSize: number;
}

// ── Fuzzy name matching ──

function normalizeKey(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
}

function fuzzyMatch(dbName: string, optionName: string): boolean {
  const a = normalizeKey(dbName);
  const b = normalizeKey(optionName);
  return a === b || a.includes(b) || b.includes(a);
}

// ── Build context from destination data ──

export function buildInsightsContext(destination: Destination, groupSize: number): InsightsContext {
  const courses: Record<string, CourseInsight> = {};
  for (const c of destination.courses) {
    courses[normalizeKey(c.name)] = {
      driveMinutes: c.driveMinutes,
      walkable: c.walkable,
      googleRating: c.googleRating,
      reviewCount: c.reviewCount,
      golfpassRating: c.golfpassRating,
      rankNote: c.rankNote,
      hypeTag: c.hypeTag,
      style: c.style,
      greenFeeRange: c.greenFeeRange,
      imageUrl: c.imageUrl,
    };
  }

  const dining: Record<string, DiningInsight> = {};
  for (const d of destination.dining) {
    dining[normalizeKey(d.name)] = {
      googleRating: d.googleRating,
      reviewCount: d.reviewCount,
      capacity: d.capacity,
      reservationNeeded: d.reservationNeeded,
      priceRange: d.priceRange,
      style: d.style,
      imageUrl: d.imageUrl,
    };
  }

  const bars: Record<string, BarInsight> = {};
  for (const b of destination.bars) {
    bars[normalizeKey(b.name)] = {
      googleRating: b.googleRating,
      walkableFromDowntown: b.walkableFromDowntown,
      lateNight: b.lateNight,
      vibe: b.vibe,
      imageUrl: b.imageUrl,
    };
  }

  const activities: Record<string, ActivityInsight> = {};
  for (const a of destination.activities) {
    activities[normalizeKey(a.name)] = {
      duration: a.duration,
      groupFriendly: a.groupFriendly,
      bestFor: a.bestFor,
      googleRating: a.googleRating,
      reviewCount: a.reviewCount,
      pricePerPerson: a.pricePerPerson,
    };
  }

  const lodgingMap: Record<string, LodgingInsight> = {};
  for (const l of destination.lodging) {
    // Lodging doesn't have names in data — key by type + area
    const key = normalizeKey(`${l.type} ${l.areaDescription}`);
    lodgingMap[key] = {
      avgRating: l.avgRating,
      amenities: l.amenities,
      sleeps: l.sleeps,
      areaDescription: l.areaDescription,
      bedsBreakdown: l.bedsBreakdown,
    };
  }

  return {
    courses,
    dining,
    bars,
    activities,
    lodging: lodgingMap,
    partyBuses: destination.partyBuses.map((b) => ({
      type: b.type,
      capacity: b.capacity,
      hourlyRate: b.hourlyRate,
      fullDayRate: b.fullDayRate,
      canDoGolfAndBars: b.canDoGolfAndBars,
    })),
    privateChefs: destination.privateChefs.map((c) => ({
      pricePerPerson: c.pricePerPerson,
      mealTypes: c.mealTypes,
    })),
    groupSize,
  };
}

// ── Look up an insight by option name (fuzzy) ──

export function lookupCourse(ctx: InsightsContext, name: string): CourseInsight | undefined {
  const key = normalizeKey(name);
  return ctx.courses[key] || Object.values(ctx.courses).find((_, i) => {
    const dbKey = Object.keys(ctx.courses)[i];
    return dbKey.includes(key) || key.includes(dbKey);
  });
}

export function lookupDining(ctx: InsightsContext, name: string): DiningInsight | undefined {
  const key = normalizeKey(name);
  return ctx.dining[key] || Object.values(ctx.dining).find((_, i) => {
    const dbKey = Object.keys(ctx.dining)[i];
    return dbKey.includes(key) || key.includes(dbKey);
  });
}

export function lookupBar(ctx: InsightsContext, name: string): BarInsight | undefined {
  const key = normalizeKey(name);
  return ctx.bars[key] || Object.values(ctx.bars).find((_, i) => {
    const dbKey = Object.keys(ctx.bars)[i];
    return dbKey.includes(key) || key.includes(dbKey);
  });
}

// ── Format helpers ──

export function formatReviewCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return String(count);
}

export function estimateDriveBetween(ctx: InsightsContext, course1: string, course2: string): number | null {
  const c1 = lookupCourse(ctx, course1);
  const c2 = lookupCourse(ctx, course2);
  if (c1?.driveMinutes == null || c2?.driveMinutes == null) return null;
  // Both are minutes from city center — rough estimate of distance between them
  return Math.abs(c1.driveMinutes - c2.driveMinutes) + 10;
}

// ── Inline hints for a day's selections ──

export interface DayHint {
  slot: "round1" | "round2" | "dinner" | "bar" | "activity" | "travel" | "lodging";
  text: string;
  type: "info" | "warning" | "positive" | "tip";
}

export function getDayHints(
  ctx: InsightsContext,
  round1: string | null,
  round2: string | null,
  dinner: string | null,
  bar: string | null,
  isArrivalDay: boolean
): DayHint[] {
  const hints: DayHint[] = [];

  // Course drive time
  if (round1) {
    const c1 = lookupCourse(ctx, round1);
    if (c1 && c1.driveMinutes > 40) {
      hints.push({ slot: "round1", text: `${c1.driveMinutes}min drive from town`, type: "info" });
    }
  }

  // Drive between courses
  if (round1 && round2 && round1 !== round2) {
    const est = estimateDriveBetween(ctx, round1, round2);
    if (est != null) {
      hints.push({
        slot: "travel",
        text: est > 30
          ? `~${est}min between courses — party bus recommended`
          : `~${est}min between courses`,
        type: est > 30 ? "warning" : "info",
      });
    }
  }

  // Dinner capacity
  if (dinner) {
    const d = lookupDining(ctx, dinner);
    if (d) {
      if (d.capacity === "small" && ctx.groupSize > 8) {
        hints.push({ slot: "dinner", text: `Seats ≤8 — call ahead for your group of ${ctx.groupSize}`, type: "warning" });
      }
      if (d.reservationNeeded) {
        hints.push({ slot: "dinner", text: "Reservation required — book 2+ weeks ahead", type: "warning" });
      }
    }
  }

  // Bar walkability
  if (bar) {
    const b = lookupBar(ctx, bar);
    if (b) {
      if (b.walkableFromDowntown) {
        hints.push({ slot: "bar", text: "Walkable from downtown — no Uber needed", type: "positive" });
      } else {
        hints.push({ slot: "bar", text: "Not walkable — arrange a ride", type: "info" });
      }
    }
  }

  // Walkable course savings
  if (round1) {
    const c1 = lookupCourse(ctx, round1);
    if (c1?.walkable) {
      hints.push({ slot: "round1", text: "Walkable — saves ~$25/person in cart fees", type: "tip" });
    }
  }

  return hints;
}

// ── TDF Picks — the objectively best option for every slot ──

interface OptionLike {
  id: string;
  name: string;
  price?: string;
  rating?: number;
  recommended?: boolean;
}

export interface TdfPicks {
  lodging: string; // option id
  transport: string;
  days: Array<{
    round1: string;
    round2: string;
    dinner: string;
    bar: string;
  }>;
}

function scoreCourse(name: string, ctx: InsightsContext): number {
  const c = lookupCourse(ctx, name);
  if (!c) return 0;
  let s = 0;
  if (c.googleRating) s += c.googleRating * 15;
  if (c.golfpassRating) s += c.golfpassRating * 10;
  if (c.hypeTag) s += 20;
  if (c.rankNote) s += 15;
  if (c.walkable) s += 5;
  if (c.driveMinutes > 40) s -= 10;
  return s;
}

function scoreDining(name: string, ctx: InsightsContext): number {
  const d = lookupDining(ctx, name);
  if (!d) return 0;
  let s = 0;
  if (d.googleRating) s += d.googleRating * 15;
  // Prefer restaurants that can seat the group
  if (d.capacity === "large-group") s += 10;
  else if (d.capacity === "medium") s += 5;
  else if (ctx.groupSize > 8) s -= 10;
  return s;
}

function scoreBar(name: string, ctx: InsightsContext): number {
  const b = lookupBar(ctx, name);
  if (!b) return 0;
  let s = 0;
  if (b.googleRating) s += b.googleRating * 10;
  if (b.lateNight) s += 10;
  if (b.walkableFromDowntown) s += 10;
  return s;
}

function scoreLodging(name: string, ctx: InsightsContext, allLodging: OptionLike[]): number {
  // Lodging matching is harder — try rating from option, then amenity keywords
  // For now use the option's own rating if available
  const opt = allLodging.find((l) => l.id === name);
  let s = (opt?.rating || 4.5) * 15;
  // Check if any lodging insight fits the group
  for (const l of Object.values(ctx.lodging)) {
    if (ctx.groupSize <= l.sleeps[1]) s += 15;
    const amenityScore = l.amenities.reduce((sum, a) => {
      if (/pool/i.test(a)) return sum + 5;
      if (/hot tub|jacuzzi/i.test(a)) return sum + 5;
      if (/fire pit/i.test(a)) return sum + 3;
      if (/game room|game/i.test(a)) return sum + 3;
      return sum;
    }, 0);
    s += amenityScore;
    break; // use first match
  }
  return s;
}

export function computeTdfPicks(
  ctx: InsightsContext,
  allCourses: OptionLike[],
  allDining: OptionLike[],
  allBars: OptionLike[],
  allLodging: OptionLike[],
  numDays: number
): TdfPicks {
  // Score and rank courses
  const rankedCourses = [...allCourses]
    .map((c) => ({ ...c, score: scoreCourse(c.name, ctx) }))
    .sort((a, b) => b.score - a.score);

  // Score and rank dining
  const rankedDining = [...allDining]
    .map((d) => ({ ...d, score: scoreDining(d.name, ctx) }))
    .sort((a, b) => b.score - a.score);

  // Score and rank bars
  const rankedBars = [...allBars]
    .map((b) => ({ ...b, score: scoreBar(b.name, ctx) }))
    .sort((a, b) => b.score - a.score);

  // Best lodging
  const rankedLodging = [...allLodging]
    .map((l) => ({ ...l, score: scoreLodging(l.name, ctx, allLodging) }))
    .sort((a, b) => b.score - a.score);

  // Assign courses across days — avoid same course on same day if possible,
  // maximize variety across the trip
  const usedCoursesPerDay: string[][] = [];
  const days: TdfPicks["days"] = [];
  const usedDining = new Set<string>();
  const usedBars = new Set<string>();

  for (let d = 0; d < numDays; d++) {
    // Pick top course for AM that wasn't already AM on a previous day
    const prevAM = usedCoursesPerDay.map((dc) => dc[0]).filter(Boolean);
    const am = rankedCourses.find((c) => !prevAM.includes(c.id)) || rankedCourses[0];

    // Pick a different course for PM (prefer close to AM course)
    const amInsight = lookupCourse(ctx, am?.id || "");
    const pmCandidates = rankedCourses.filter((c) => c.id !== am?.id);
    let pm: typeof rankedCourses[0];
    if (amInsight && pmCandidates.length > 0) {
      // Sort PM candidates by proximity to AM course
      const withDist = pmCandidates.map((c) => {
        const ci = lookupCourse(ctx, c.name);
        const dist = ci ? Math.abs(ci.driveMinutes - amInsight.driveMinutes) : 999;
        return { ...c, dist };
      }).sort((a, b) => {
        // Balance proximity vs quality: within 15 min, prefer higher score
        if (Math.abs(a.dist - b.dist) < 15) return b.score - a.score;
        return a.dist - b.dist;
      });
      pm = withDist[0];
    } else {
      pm = pmCandidates[0] || am;
    }

    usedCoursesPerDay.push([am?.id, pm?.id]);

    // Pick dinner — avoid repeats across days
    const dinnerPick = rankedDining.find((r) => !usedDining.has(r.id)) || rankedDining[0];
    if (dinnerPick) usedDining.add(dinnerPick.id);

    // Pick bar — avoid repeats across days
    const barPick = rankedBars.find((b) => !usedBars.has(b.id)) || rankedBars[0];
    if (barPick) usedBars.add(barPick.id);

    days.push({
      round1: am?.id || "",
      round2: pm?.id || am?.id || "",
      dinner: dinnerPick?.id || "",
      bar: barPick?.id || "",
    });
  }

  // Transport — prefer party bus if it fits the group
  const fittingBus = ctx.partyBuses.find((b) => b.canDoGolfAndBars && ctx.groupSize <= b.capacity[1]);
  const transport = fittingBus ? "party-bus" : "rental-car";

  return {
    lodging: rankedLodging[0]?.id || "",
    transport,
    days,
  };
}

// ── Check if an option is a TDF pick ──

export function isTdfPick(picks: TdfPicks, category: "lodging" | "transport" | "course" | "dining" | "bar", optionId: string): boolean {
  if (category === "lodging") return picks.lodging === optionId;
  if (category === "transport") return picks.transport === optionId;
  for (const day of picks.days) {
    if (category === "course" && (day.round1 === optionId || day.round2 === optionId)) return true;
    if (category === "dining" && day.dinner === optionId) return true;
    if (category === "bar" && day.bar === optionId) return true;
  }
  return false;
}
