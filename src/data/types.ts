// ── Tour de Fore Destination Database Types ──

export type Region =
  | "Southwest"
  | "Pacific NW"
  | "Mountain West"
  | "Midwest"
  | "Southeast"
  | "Northeast"
  | "South Central";

export type CourseTier = "bucket-list" | "premium" | "solid" | "budget";
export type CourseStyle = "links" | "parkland" | "desert" | "mountain" | "resort" | "coastal" | "heathland";
export type Season = "spring" | "summer" | "fall";
export type ActivityType = "atv" | "fishing" | "shooting" | "casino" | "brewery" | "spa" | "water-sports" | "horseback" | "hiking" | "rafting" | "zipline" | "go-karts" | "axe-throwing" | "skeet" | "boat-rental" | "kayaking" | "winery" | "distillery" | "paintball" | "mountain-biking";
export type DiningStyle = "steakhouse" | "bbq" | "seafood" | "upscale" | "casual" | "brewpub" | "mexican" | "italian" | "southern" | "farm-to-table" | "sushi";
export type BarVibe = "dive" | "sports-bar" | "rooftop" | "cocktail" | "brewpub" | "honky-tonk" | "casino-bar" | "patio" | "whiskey-bar" | "tiki" | "saloon";

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
  slope: number;
  rating: number;
  walkable: boolean;
  style: CourseStyle;
  driveMinutes: number; // from city center
  url?: string;
  highlight: string; // one-line sell
}

export interface LodgingOption {
  type: "house" | "lodge" | "ranch" | "cabin" | "lakehouse" | "resort-house";
  sleeps: [number, number]; // [min, max] guest range available
  nightlyRange: [number, number]; // [low, high] per night for whole property
  amenities: string[];
  areaDescription: string; // neighborhood / area
  searchUrl?: string; // Airbnb/VRBO search link pattern
  notes: string;
}

export interface DiningSpot {
  name: string;
  style: DiningStyle;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  capacity: "small" | "medium" | "large-group"; // can handle 16?
  highlight: string;
  reservationNeeded: boolean;
}

export interface Bar {
  name: string;
  vibe: BarVibe;
  highlight: string;
  lateNight: boolean; // open past midnight?
  walkableFromDowntown: boolean;
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
}

export interface PartyBus {
  type: "party-bus" | "shuttle" | "limo" | "sprinter-van" | "trolley";
  capacity: [number, number];
  hourlyRate: [number, number];
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
}
