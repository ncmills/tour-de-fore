import { Region } from "@/data/types";

export const REGION_SLUGS: Record<Region, string> = {
  Southwest: "southwest",
  "Pacific NW": "pacific-nw",
  "Mountain West": "mountain-west",
  Midwest: "midwest",
  Southeast: "southeast",
  Northeast: "northeast",
  "South Central": "south-central",
};

export const REGION_LABELS: Record<string, string> = {
  southwest: "Southwest",
  "pacific-nw": "Pacific NW",
  "mountain-west": "Mountain West",
  midwest: "Midwest",
  southeast: "Southeast",
  northeast: "Northeast",
  "south-central": "South Central",
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
