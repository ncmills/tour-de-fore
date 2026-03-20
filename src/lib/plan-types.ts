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
};

// ── Generated Plan Types ──

export interface GeneratedPlan {
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
  lodging: {
    name: string;
    type: string;
    address: string;
    costPerNight: string;
    rationale: string;
    url?: string;
  };
  courses: PlanCourse[];
  schedule: PlanDay[];
  dining: PlanDining[];
  proTips: string[];
  groupLogistics: {
    teeTimeStrategy: string;
    transport: string;
    packingList: string[];
  };
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
}

// ── Storage Types ──

export interface StoredPlan {
  id: string;
  plan: GeneratedPlan;
  inputs: WizardState;
  createdAt: string;
  emailsSent: boolean;
}
