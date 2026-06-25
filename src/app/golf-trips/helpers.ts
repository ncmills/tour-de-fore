import { Region } from "@/data/types";
import { allDestinations } from "@/data";

// ── Compare-page pair generation ──────────────────────────────────────────
// Single source of truth for which /golf-trips/compare/[matchup] URLs exist.
// Both the compare-page generator (generateStaticParams) and consumers like
// /golf-trips/[slug] (which surface "head-to-head" links) must agree, or
// city pages will link to 404 compare URLs.
const POPULAR_COMPARE_DESTS = [
  "scottsdale-az", "myrtle-beach-sc", "pinehurst-nc", "kiawah-island-sc",
  "bend-or", "bandon-or", "kohler-wi", "traverse-city-mi", "austin-tx",
  "las-vegas-nv", "st-george-ut", "park-city-ut", "hilton-head-sc",
  "napa-ca", "palm-springs-ca", "savannah-ga", "charleston-sc",
  "boise-id", "steamboat-springs-co", "cape-cod-ma",
];

export function generateComparePairs(): { slug1: string; slug2: string }[] {
  const pairs: { slug1: string; slug2: string }[] = [];
  const seen = new Set<string>();
  function addPair(s1: string, s2: string) {
    const key = [s1, s2].sort().join("|");
    if (!seen.has(key) && allDestinations.some((d) => d.id === s1) && allDestinations.some((d) => d.id === s2)) {
      seen.add(key);
      pairs.push({ slug1: s1, slug2: s2 });
    }
  }
  for (let i = 0; i < POPULAR_COMPARE_DESTS.length; i++) {
    for (let j = i + 1; j < POPULAR_COMPARE_DESTS.length; j++) {
      addPair(POPULAR_COMPARE_DESTS[i], POPULAR_COMPARE_DESTS[j]);
    }
  }
  const regionGroups = new Map<string, typeof allDestinations>();
  for (const d of allDestinations) {
    if (!regionGroups.has(d.region)) regionGroups.set(d.region, []);
    regionGroups.get(d.region)!.push(d);
  }
  for (const [, dests] of regionGroups) {
    const top = [...dests].sort((a, b) => b.courses.length - a.courses.length).slice(0, 5);
    for (let i = 0; i < top.length; i++) {
      for (let j = i + 1; j < top.length; j++) {
        addPair(top[i].id, top[j].id);
      }
    }
  }
  // Same-region density (2026-06-01): pair EVERY destination with its top-4
  // region peers (by course count), not just the top-5 within each region. The
  // top-5-combos-only graph left ~80% of the 133 cities with zero compare
  // partners — so most city pages had no compare internal links and most compare
  // URLs that could rank (the surface already hitting pos 1-5) never existed.
  // Ported from BMHQ's generator per the 05-10 GSC memo: compare URLs need
  // internal-link density to escape sitemap-only purgatory.
  for (const [, dests] of regionGroups) {
    const sorted = [...dests].sort((a, b) => b.courses.length - a.courses.length);
    for (const d of sorted) {
      const partners = sorted.filter((p) => p.id !== d.id).slice(0, 4);
      for (const p of partners) addPair(d.id, p.id);
    }
  }
  const stateGroups = new Map<string, typeof allDestinations>();
  for (const d of allDestinations) {
    if (!stateGroups.has(d.state)) stateGroups.set(d.state, []);
    stateGroups.get(d.state)!.push(d);
  }
  for (const [, dests] of stateGroups) {
    if (dests.length < 2) continue;
    const top = [...dests].sort((a, b) => b.courses.length - a.courses.length).slice(0, 4);
    for (let i = 0; i < top.length; i++) {
      for (let j = i + 1; j < top.length; j++) {
        addPair(top[i].id, top[j].id);
      }
    }
  }
  return pairs;
}

// Pre-computed once per build so per-destination lookups are O(1).
const COMPARE_PARTNERS_BY_DEST: Map<string, string[]> = (() => {
  const map = new Map<string, string[]>();
  for (const { slug1, slug2 } of generateComparePairs()) {
    if (!map.has(slug1)) map.set(slug1, []);
    if (!map.has(slug2)) map.set(slug2, []);
    map.get(slug1)!.push(slug2);
    map.get(slug2)!.push(slug1);
  }
  return map;
})();

export function getComparePartners(destId: string): string[] {
  return COMPARE_PARTNERS_BY_DEST.get(destId) ?? [];
}


export const REGION_SLUGS: Record<Region, string> = {
  Southwest: "southwest",
  "Pacific NW": "pacific-nw",
  "Mountain West": "mountain-west",
  Midwest: "midwest",
  Southeast: "southeast",
  Northeast: "northeast",
  "South Central": "south-central",
  California: "california",
  International: "international",
};

export const REGION_LABELS: Record<string, string> = {
  southwest: "Southwest",
  "pacific-nw": "Pacific NW",
  "mountain-west": "Mountain West",
  midwest: "Midwest",
  southeast: "Southeast",
  northeast: "Northeast",
  "south-central": "South Central",
  california: "California",
  international: "International",
};

export const STATE_NAMES: Record<string, string> = {
  AZ: "Arizona",
  UT: "Utah",
  NV: "Nevada",
  NM: "New Mexico",
  OR: "Oregon",
  ID: "Idaho",
  WA: "Washington",
  MT: "Montana",
  CO: "Colorado",
  WY: "Wyoming",
  SD: "South Dakota",
  WI: "Wisconsin",
  MI: "Michigan",
  IL: "Illinois",
  IN: "Indiana",
  MN: "Minnesota",
  OH: "Ohio",
  IA: "Iowa",
  MO: "Missouri",
  NE: "Nebraska",
  NC: "North Carolina",
  SC: "South Carolina",
  AL: "Alabama",
  GA: "Georgia",
  KY: "Kentucky",
  FL: "Florida",
  TN: "Tennessee",
  MS: "Mississippi",
  VA: "Virginia",
  MA: "Massachusetts",
  NY: "New York",
  PA: "Pennsylvania",
  VT: "Vermont",
  ME: "Maine",
  RI: "Rhode Island",
  NJ: "New Jersey",
  MD: "Maryland",
  NH: "New Hampshire",
  CT: "Connecticut",
  TX: "Texas",
  AR: "Arkansas",
  LA: "Louisiana",
  OK: "Oklahoma",
  CA: "California",
  HI: "Hawaii",
  WV: "West Virginia",
  DE: "Delaware",
  DC: "District of Columbia",
  KS: "Kansas",
  ND: "North Dakota",
};

export function stateSlug(abbr: string): string {
  const name = STATE_NAMES[abbr];
  return name ? name.toLowerCase().replace(/\s+/g, "-") : abbr.toLowerCase();
}

export function regionSlug(region: Region): string {
  return REGION_SLUGS[region];
}

export function tierLabel(tier: string): string {
  switch (tier) {
    case "bucket-list":
      return "Bucket List";
    case "premium":
      return "Premium";
    case "solid":
      return "Solid";
    case "budget":
      return "Budget";
    default:
      return tier;
  }
}

export function tierColor(tier: string): string {
  switch (tier) {
    case "bucket-list":
      return "#D4A843";
    case "premium":
      return "#EA580C";
    case "solid":
      return "#3a7050";
    case "budget":
      return "#71717A";
    default:
      return "#A1A1AA";
  }
}

export function seasonLabel(seasons: string[]): string {
  return seasons.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(", ");
}

export function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** Truncate text at a sentence or clause boundary within maxLen chars */
export function metaDescription(text: string, maxLen = 155): string {
  if (text.length <= maxLen) return text;
  const truncated = text.slice(0, maxLen);
  const lastPeriod = truncated.lastIndexOf(". ");
  const lastComma = truncated.lastIndexOf(", ");
  const lastDash = truncated.lastIndexOf(" — ");
  const breakPoint = Math.max(lastPeriod, lastComma, lastDash);
  if (breakPoint > maxLen * 0.5) return text.slice(0, breakPoint + 1).trim();
  const lastSpace = truncated.lastIndexOf(" ");
  return lastSpace > 0 ? text.slice(0, lastSpace).trim() + "…" : truncated.trim() + "…";
}
