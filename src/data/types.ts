// ── Tour de Fore Destination Database Types ──

export type Region =
  | "Southwest"
  | "Pacific NW"
  | "Mountain West"
  | "Midwest"
  | "Southeast"
  | "Northeast"
  | "South Central"
  | "California"
  | "International";

export type CourseTier = "bucket-list" | "premium" | "solid" | "budget";
export type CourseStyle = "links" | "parkland" | "desert" | "mountain" | "resort" | "coastal" | "heathland";
export type Season = "spring" | "summer" | "fall";
export type ActivityType = "atv" | "fishing" | "shooting" | "casino" | "brewery" | "spa" | "water-sports" | "horseback" | "hiking" | "rafting" | "zipline" | "go-karts" | "axe-throwing" | "skeet" | "boat-rental" | "kayaking" | "winery" | "distillery" | "paintball" | "mountain-biking";
export type DiningStyle = "steakhouse" | "bbq" | "seafood" | "upscale" | "casual" | "brewpub" | "mexican" | "italian" | "southern" | "farm-to-table" | "sushi";
export type BarVibe = "dive" | "sports-bar" | "rooftop" | "cocktail" | "brewpub" | "honky-tonk" | "casino-bar" | "patio" | "whiskey-bar" | "tiki" | "saloon";
export type HypeTag = "BUCKET LIST" | "HIDDEN GEM" | "TOURNAMENT HOST" | "TOP 100 PUBLIC" | "LOCALS' FAVORITE" | "DESIGNER CLASSIC" | "BEST VALUE";

export interface Airport {
  code: string;
  name: string;
  driveMinutes: number;
}

export interface GolfCourse {
  name: string;
  tier: CourseTier;
  greenFeeRange: [number, number]; // [low, high] per person with cart
  holes: number;
  par: number;
  yardage: number;
  slope?: number;
  rating?: number;
  walkable: boolean;
  style: CourseStyle;
  driveMinutes: number; // from city center
  url?: string;
  imageUrl?: string; // OG image from course website
  highlight: string; // one-line sell
  // Sentiment / hype fields
  googleRating?: number; // e.g. 4.6
  reviewCount?: number; // e.g. 1200
  golfpassRating?: number; // e.g. 8.5 out of 10
  rankNote?: string; // e.g. "Top 100 Public — Golf Digest 2025"
  hypeTag?: HypeTag;
}

export interface LodgingOption {
  type: "house" | "lodge" | "ranch" | "cabin" | "lakehouse" | "resort-house";
  sleeps: [number, number]; // [min, max] guest range available
  nightlyRange: [number, number]; // [low, high] per night for whole property
  amenities: string[];
  areaDescription: string; // neighborhood / area
  searchUrl?: string; // Airbnb/VRBO search link pattern
  notes: string;
  // Sentiment + beds
  avgRating?: number; // Airbnb/VRBO avg rating
  bedsBreakdown?: string; // e.g. "4 kings + 2 queens = 12 guys, 2/bed"
}

export interface DiningSpot {
  name: string;
  style: DiningStyle;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  capacity: "small" | "medium" | "large-group"; // can handle 16?
  highlight: string;
  reservationNeeded: boolean;
  // Sentiment
  googleRating?: number;
  reviewCount?: number;
  url?: string;
  imageUrl?: string;
}

export interface Bar {
  name: string;
  vibe: BarVibe;
  highlight: string;
  lateNight: boolean; // open past midnight?
  walkableFromDowntown: boolean;
  googleRating?: number;
  url?: string;
  imageUrl?: string;
}

export interface Activity {
  name: string;
  type: ActivityType;
  duration: string; // "2-3 hours", "half day", "full day"
  pricePerPerson: [number, number];
  groupFriendly: boolean; // can handle 12-16?
  highlight: string;
  bestFor: string; // "arrival day", "rest day", "morning before golf"
  provider?: string;
  googleRating?: number;
  reviewCount?: number;
  url?: string;
}

export interface PartyBus {
  type: "party-bus" | "shuttle" | "limo" | "sprinter-van" | "trolley";
  capacity: [number, number];
  hourlyRate: [number, number];
  fullDayRate?: [number, number]; // full-day rate (better value)
  canDoGolfAndBars?: boolean; // true if they'll do AM golf + PM bar runs
  providers: string[]; // company names in the area
  notes: string;
}

export interface PrivateChef {
  pricePerPerson: [number, number];
  providers: string[]; // company/platform names
  mealTypes: string[]; // "steak dinner", "BBQ cookout", "breakfast"
  notes: string;
}

export interface Destination {
  id: string;
  city: string;
  state: string;
  region: Region;
  tagline: string; // one-line pitch
  description: string; // 2-3 sentence sell
  // OPTIONAL: 400–600 word unique editorial overview written for SEO depth.
  // When present, rendered on the destination page after description as a
  // multi-paragraph narrative that differentiates this city from peer cities.
  // Without it, Google deduplicates the templated city pages — populate this
  // field per destination to escape "Discovered – currently not indexed."
  proseOverview?: string;
  population: "tiny" | "small" | "medium"; // <10k, 10-50k, 50-200k
  nearestAirport: Airport;
  bestSeasons: Season[];
  courses: GolfCourse[];
  lodging: LodgingOption[];
  dining: DiningSpot[];
  bars: Bar[];
  activities: Activity[];
  partyBuses: PartyBus[];
  privateChefs: PrivateChef[];
  tdfTested?: boolean; // true if TDF has been here
  tdfYear?: number;
  groceryNotes?: string; // grocery/alcohol pre-order info for the area
}
