// ── Wizard Input Types ──

export interface WizardState {
  // Step 1
  destinationType: "specific" | "region";
  destination: string;
  region: string;
  tripMonth: string;
  tripYear: string;
  flexible: boolean;
  preferredSeason: string;
  numberOfDays: number;

  // Step 2
  groupSize: number;
  skillMix: string;
  ageRange: string;

  // Step 3
  roundsPerDay: string;
  courseQuality: string;
  walkingOrRiding: string;
  mustPlayCourses: string;

  // Step 4
  lodging: string;
  dining: string;
  nightlife: string;
  activities: string[];

  // Step 5
  budget: string;
  budgetPriorities: string[];
  specialRequests: string;

  // Step 6
  organizerName: string;
  organizerEmail: string;
  attendees: Attendee[];

  // Auth (wizard step 7)
  authMode: "new" | "login";
  authPassword: string;
}

export interface Attendee {
  name: string;
  email: string;
}

export const initialWizardState: WizardState = {
  destinationType: "specific",
  destination: "",
  region: "",
  tripMonth: "",
  tripYear: "",
  flexible: false,
  preferredSeason: "",
  numberOfDays: 3,
  groupSize: 12,
  skillMix: "",
  ageRange: "",
  roundsPerDay: "Two (36)",
  courseQuality: "",
  walkingOrRiding: "",
  mustPlayCourses: "",
  lodging: "One big house",
  dining: "",
  nightlife: "",
  activities: [],
  budget: "",
  budgetPriorities: [],
  specialRequests: "",
  organizerName: "",
  organizerEmail: "",
  attendees: Array.from({ length: 7 }, () => ({ name: "", email: "" })),
  authMode: "new",
  authPassword: "",
};

// ── Tier Types ──

export type TripTier = "imp" | "devil" | "demon-king";

// ── Generated Plan Types ──

export interface SectionAlternative {
  name: string;
  description: string;
  costDelta: string; // e.g. "+$75/person" or "-$50/person"
  direction: "upgrade" | "downgrade";
}

export interface GeneratedPlan {
  tierName: string; // "The Imp", "The Devil", "The Demon King"
  tierTagline: string;
  tripName: string;
  tagline: string;
  destination: string;
  dates: string;
  groupSize: number;
  numberOfDays: number;
  estimatedBudget: {
    perPerson: string;
    breakdown: BudgetItem[];
  };
  lodging: PlanLodging;
  lodgingAlternatives?: SectionAlternative[];
  courses: PlanCourse[];
  courseAlternatives?: SectionAlternative[];
  schedule: PlanDay[];
  dining: PlanDining[];
  diningAlternatives?: SectionAlternative[];
  bars: PlanBar[];
  proTips: string[];
  groupLogistics: {
    teeTimeStrategy: string;
    transport: string;
    packingList: string[];
  };
}

export interface PlanLodging {
  name: string;
  type: string;
  address: string;
  costPerNight: string;
  rationale: string;
  url?: string;
  imageSearch?: string; // search term for finding an image
}

export interface BudgetItem {
  category: string;
  perPerson: string;
}

export interface PlanCourse {
  name: string;
  day: number;
  session: "AM" | "PM";
  greenFee: string;
  whyThisCourse: string;
  url?: string;
  imageSearch?: string;
  imageUrl?: string;
}

export interface PlanDay {
  day: number;
  label: string;
  items: PlanScheduleItem[];
}

export interface PlanScheduleItem {
  time: string;
  activity: string;
  detail?: string;
  proTip?: string;
  type: "golf" | "dining" | "activity" | "nightlife" | "travel" | "lodging";
}

export interface PlanDining {
  name: string;
  type: string;
  description: string;
  priceRange: string;
  url?: string;
  imageSearch?: string;
}

export interface PlanBar {
  name: string;
  vibe: string;
  description: string;
  url?: string;
}

// ── Three-Tier Result ──

export interface ThreePlanResult {
  imp: GeneratedPlan;
  devil: GeneratedPlan;
  demonKing: GeneratedPlan;
}

// ── Three-Destination Result ──

export type PriceLevel = "budget" | "mid" | "premium";

export interface DestinationRecommendation {
  destinationId: string; // matches Destination.id
  city: string;
  state: string;
  tagline: string;
  priceLevel: PriceLevel;
  plans: ThreePlanResult;
}

export interface ThreeDestinationResult {
  budget: DestinationRecommendation;
  mid: DestinationRecommendation;
  premium: DestinationRecommendation;
}

// ── Freemium Types ──

export interface FreePreview {
  destinationId: string;
  city: string;
  state: string;
  tagline: string;
  description: string;
  priceLevel: PriceLevel;
  // Why the engine picked this destination
  reasons: string[];
  // Visible in free plan
  lodgingPreview: {
    type: string;
    sleeps: [number, number];
    nightlyRange: [number, number];
    amenities: string[];
    areaDescription: string;
    avgRating?: number;
    bedsBreakdown?: string;
  };
  coursePreview: {
    name: string;
    tier: string;
    greenFeeRange: [number, number];
    highlight: string;
    googleRating?: number;
    hypeTag?: string;
  }[];
  estimatedBudgetPerPerson: string;
  numberOfDays: number;
  groupSize: number;
  // Teasers (visible, hooks the user)
  activityTeaser?: { name: string; type: string; priceRange: string };
  barTeaser?: { name: string; vibe: string };
  partyBusAvailable?: { hourlyRange: [number, number] };
  privateChefAvailable?: { pricePerPersonRange: [number, number] };
  // Locked counts (visible but grayed)
  lockedCounts: {
    moreHouses: number;
    restaurants: number;
    bars: number;
    activities: number;
    partyBusOptions: number;
    privateChefOptions: number;
  };
}

export interface ThreeFreePreview {
  budget: FreePreview;
  mid: FreePreview;
  premium: FreePreview;
}

// ── Storage Types ──

export interface StoredPlan {
  id: string;
  // Freemium: free previews stored on generation, paid plans stored on payment
  freePreviews?: ThreeFreePreview;
  destinations?: ThreeDestinationResult;
  /** @deprecated kept for backwards compat with old single-destination plans */
  plans?: ThreePlanResult;
  inputs: WizardState;
  createdAt: string;
  emailsSent: boolean;
  // Paid plan state
  paidDestination?: PriceLevel; // which destination the user paid for
  paid?: boolean;
  paidAt?: string;
  // User selections (trip builder)
  selectedOptions?: Record<string, string[]>; // category → selected option IDs
}
