import type { MetadataRoute } from "next";
import { allDestinations } from "@/data";
import { REGION_SLUGS, stateSlug, slugify } from "./golf-trips/helpers";

/**
 * Sitemap index: splits 1400+ URLs into multiple sitemaps for faster Google processing.
 * IDs: 0 = static + navigation, 1-7 = regions (destinations + courses),
 *      8 = guide + cost pages, 9 = bachelor party + comparison pages
 */
const regionIds = Object.values(REGION_SLUGS);

// Bachelor party destinations (3+ bars, non-tiny)
const bachelorDests = allDestinations.filter(
  (d) => d.bars.length >= 3 && d.population !== "tiny"
);

// Comparison pairs — cross-region, same-region, same-state
function generateComparisonPairs(): string[] {
  const pairs: string[] = [];
  const seen = new Set<string>();

  function addPair(s1: string, s2: string) {
    const key = [s1, s2].sort().join("|");
    if (!seen.has(key)) {
      seen.add(key);
      pairs.push(`${s1}-vs-${s2}`);
    }
  }

  const popular = [
    "scottsdale-az", "myrtle-beach-sc", "pinehurst-nc", "kiawah-island-sc",
    "bend-or", "bandon-or", "kohler-wi", "traverse-city-mi", "austin-tx",
    "las-vegas-nv", "st-george-ut", "park-city-ut", "hilton-head-sc",
    "napa-ca", "palm-springs-ca", "savannah-ga", "charleston-sc",
    "boise-id", "steamboat-springs-co", "cape-cod-ma",
  ].filter((s) => allDestinations.some((d) => d.id === s));

  for (let i = 0; i < popular.length; i++) {
    for (let j = i + 1; j < popular.length; j++) {
      addPair(popular[i], popular[j]);
    }
  }

  // Same-region top 5
  const regionGroups = new Map<string, string[]>();
  for (const d of allDestinations) {
    if (!regionGroups.has(d.region)) regionGroups.set(d.region, []);
    regionGroups.get(d.region)!.push(d.id);
  }
  for (const ids of regionGroups.values()) {
    const top = ids.slice(0, 5);
    for (let i = 0; i < top.length; i++) for (let j = i + 1; j < top.length; j++) addPair(top[i], top[j]);
  }

  // Same-state top 4
  const stateGroups = new Map<string, string[]>();
  for (const d of allDestinations) {
    if (!stateGroups.has(d.state)) stateGroups.set(d.state, []);
    stateGroups.get(d.state)!.push(d.id);
  }
  for (const ids of stateGroups.values()) {
    if (ids.length < 2) continue;
    const top = ids.slice(0, 4);
    for (let i = 0; i < top.length; i++) for (let j = i + 1; j < top.length; j++) addPair(top[i], top[j]);
  }

  return pairs;
}

const comparisonPairs = generateComparisonPairs();

// Fixed build date — avoids telling Google "everything changed" on every deploy
const LAST_MODIFIED = new Date("2026-04-04");

export async function generateSitemaps() {
  return [
    { id: 0 }, // static pages, navigation, tiers, activities, themes
    ...regionIds.map((_, i) => ({ id: i + 1 })), // 1-7: regions
    { id: 8 }, // guide + cost pages
    { id: 9 }, // bachelor party + comparison pages
  ];
}

export default async function sitemap({ id }: { id: number | Promise<string | undefined> }): Promise<MetadataRoute.Sitemap> {
  // Next.js 16 passes id as a Promise<string>; resolve and coerce to number
  const numId = typeof id === "number" ? id : Number(await id);
  const base = "https://tourdefore.com";

  // Sitemap 0: static + navigation pages
  if (numId === 0) {
    const uniqueStates = [...new Set(allDestinations.map((d) => d.state))];
    const activityTypes = ["atv", "fishing", "shooting", "casino", "brewery", "spa", "water-sports", "horseback", "hiking", "rafting", "zipline", "go-karts", "axe-throwing", "skeet", "boat-rental", "kayaking", "winery", "distillery", "paintball", "mountain-biking"];

    return [
      { url: base, lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 1 },
      { url: `${base}/plan`, lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 0.9 },
      { url: `${base}/plan-a-trip`, lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 0.9 },
      { url: `${base}/golf-trips`, lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 0.9 },
      { url: `${base}/concierge`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
      { url: `${base}/past-trips`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
      { url: `${base}/past-trips/2025`, lastModified: LAST_MODIFIED, changeFrequency: "yearly", priority: 0.6 },
      { url: `${base}/past-trips/2024`, lastModified: LAST_MODIFIED, changeFrequency: "yearly", priority: 0.6 },
      { url: `${base}/past-trips/2023`, lastModified: LAST_MODIFIED, changeFrequency: "yearly", priority: 0.5 },
      { url: `${base}/past-trips/2022`, lastModified: LAST_MODIFIED, changeFrequency: "yearly", priority: 0.5 },
      { url: `${base}/past-trips/2021`, lastModified: LAST_MODIFIED, changeFrequency: "yearly", priority: 0.5 },
      { url: `${base}/shop`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.6 },
      { url: `${base}/site-map`, lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 0.5 },
      // Regions
      ...regionIds.map((slug) => ({
        url: `${base}/golf-trips/region/${slug}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      // States
      ...uniqueStates.map((s) => ({
        url: `${base}/golf-trips/state/${stateSlug(s)}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      // Tiers
      ...["bucket-list", "premium", "solid", "budget"].map((t) => ({
        url: `${base}/golf-trips/courses/${t}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      // Activities
      ...activityTypes.map((t) => ({
        url: `${base}/golf-trips/activities/${t}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
      // Themes — routes live at `/golf-trips/bachelor-party`,
      // `/golf-trips/budget-trips`, `/golf-trips/bucket-list-trips`. The
      // `-trips` suffix is required on budget/bucket-list (missing suffix 404s).
      ...["bachelor-party", "budget-trips", "bucket-list-trips"].map((t) => ({
        url: `${base}/golf-trips/${t}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      // Guides index + individual guides
      { url: `${base}/guides`, lastModified: LAST_MODIFIED, changeFrequency: "weekly" as const, priority: 0.8 },
      ...["how-to-plan-a-group-golf-trip", "best-golf-trip-destinations-by-month", "best-walkable-golf-courses", "golf-trip-budget-guide", "golf-trip-packing-list", "best-golf-trips-under-500", "desert-vs-coastal-vs-mountain-golf", "best-golf-destinations-for-large-groups", "top-bucket-list-golf-courses", "first-time-golf-trip-mistakes"].map((slug) => ({
        url: `${base}/guides/${slug}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];
  }

  // Sitemaps 1-7: one per region with destinations + their courses
  if (numId >= 1 && numId <= 7) {
    const regionSlug = regionIds[numId - 1];
    const regionDests = allDestinations.filter(
      (d) => REGION_SLUGS[d.region] === regionSlug
    );
    const entries: MetadataRoute.Sitemap = [];
    for (const d of regionDests) {
      entries.push({
        url: `${base}/golf-trips/${d.id}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.8,
      });
      for (const c of d.courses) {
        entries.push({
          url: `${base}/golf-trips/${d.id}/courses/${slugify(c.name)}`,
          lastModified: LAST_MODIFIED,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
    return entries;
  }

  // Sitemap 8: guide + cost pages (266 pages)
  if (numId === 8) {
    const entries: MetadataRoute.Sitemap = [];
    for (const d of allDestinations) {
      entries.push({
        url: `${base}/golf-trips/${d.id}/guide`,
        lastModified: LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.8,
      });
      entries.push({
        url: `${base}/golf-trips/${d.id}/cost`,
        lastModified: LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
    return entries;
  }

  // Sitemap 9: bachelor party + comparison pages
  if (numId === 9) {
    return [
      ...bachelorDests.map((d) => ({
        url: `${base}/golf-trips/${d.id}/bachelor-party`,
        lastModified: LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      ...comparisonPairs.map((matchup) => ({
        url: `${base}/golf-trips/compare/${matchup}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  }

  return [];
}
