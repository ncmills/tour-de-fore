/**
 * Shared types, helpers, and constants for TDF engine tests.
 */

import type { WizardState } from "../src/lib/plan-types";
import type { Season } from "../src/data/types";

// ── Types ──

export interface TestCase {
  name: string;
  suite: string;
  wizardOverrides: Partial<WizardState>;
  filterOptions: FilterInput;
  expectedZero?: boolean;
}

export interface FilterInput {
  region?: string;
  specificCity?: string;
  season?: Season;
  groupSize?: number;
  numberOfDays?: number;
  budget?: string;
  courseQuality?: string;
  activities?: string[];
}

export interface TestResult extends TestCase {
  candidateCount: number;
  pickCount: number;
  picks: { city: string; state: string; priceLevel: string; score: number }[];
  passed: boolean;
}

export interface StreamMessage {
  type: "status" | "ping" | "done" | "error";
  message?: string;
  planId?: string;
  freePreviews?: Record<string, unknown>;
  error?: string;
  debug?: string;
}

export interface ApiTestResult {
  name: string;
  passed: boolean;
  duration: number;
  planId?: string;
  error?: string;
  destinations?: string[];
  messages: StreamMessage[];
}

// ── Constants ──

export const REGIONS = [
  "Southwest", "Pacific NW", "Mountain West", "Midwest",
  "Southeast", "Northeast", "South Central",
];

export const SEASONS: Season[] = ["spring", "summer", "fall"];

export const WIZARD_BUDGETS = [
  "$2K per person", "$4K per person", "$6K per person", "Fat pockets",
];

export const COURSE_QUALITIES = [
  "Cheap & fun", "Mix of public & resort", "Bucket list only", "Whatever fits budget",
];

export const ACTIVITIES = [
  "Fishing", "ATV", "Casino", "Spa", "Brewery", "Shooting", "Water Sports",
];

export const MULTI_ACTIVITIES = [
  ["Fishing", "Brewery"],
  ["Casino", "Spa"],
  ["ATV", "Shooting", "Fishing"],
  ["Brewery", "Water Sports"],
];

export const SPECIFIC_CITIES = [
  "Scottsdale", "Pinehurst", "Austin", "Bandon", "Myrtle Beach",
  "Las Vegas", "Branson", "Bend", "Hilton Head", "Charleston",
  "Traverse City", "Pebble Beach",
];

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// ── Known zero-result combos (expected failures) ──

export const KNOWN_ZEROS: { region?: string; season?: Season; groupSize?: number; desc: string }[] = [
  { groupSize: 32, desc: "groupSize=32 exceeds most lodging capacity" },
  { region: "Pacific NW", season: "spring", desc: "No Pacific NW destinations have spring in bestSeasons" },
  { region: "Midwest", groupSize: 20, desc: "Midwest max lodging sleeps < 20" },
  { region: "Southwest", season: "summer", groupSize: 20, desc: "Southwest summer + group=20: no survivors" },
  { region: "South Central", season: "spring", groupSize: 24, desc: "South Central spring + group=24: no survivors" },
];

export function isKnownZero(opts: FilterInput): boolean {
  if (opts.groupSize && opts.groupSize >= 32) return true;
  // Pacific NW has no spring destinations
  if (opts.region === "Pacific NW" && opts.season === "spring") return true;
  // Midwest lodging can't handle 20+
  if (opts.region === "Midwest" && opts.groupSize && opts.groupSize >= 20) return true;
  // Southwest summer + large group
  if (opts.region === "Southwest" && opts.season === "summer" && opts.groupSize && opts.groupSize >= 20) return true;
  // South Central spring + very large group
  if (opts.region === "South Central" && opts.season === "spring" && opts.groupSize && opts.groupSize >= 24) return true;
  return false;
}

// ── WizardState builder ──

export function buildWizardState(overrides: Partial<WizardState> = {}): WizardState {
  return {
    destinationType: "region",
    destination: "",
    region: "Southeast",
    tripMonth: "",
    tripYear: "2026",
    flexible: true,
    preferredSeason: "Fall",
    numberOfDays: 3,
    groupSize: 12,
    skillMix: "Wide range",
    ageRange: "30s",
    roundsPerDay: "Two (36)",
    courseQuality: "Mix of public & resort",
    walkingOrRiding: "Riding",
    mustPlayCourses: "",
    lodging: "One big house",
    dining: "Mix",
    nightlife: "Couple nights",
    activities: [],
    budget: "$4K per person",
    budgetPriorities: ["Best courses", "Keep balanced"],
    specialRequests: "",
    organizerName: "TDF Test Bot",
    organizerEmail: "nicholauscmills@gmail.com",
    attendees: [],
    authMode: "login",
    authPassword: "",
    ...overrides,
  };
}

// ── Convert wizard state to filter options (mirrors getThreeDestinations) ──

function seasonFromMonth(month: string): Season | undefined {
  const m = month.toLowerCase();
  if (["march", "april", "may"].includes(m)) return "spring";
  if (["june", "july", "august"].includes(m)) return "summer";
  if (["september", "october", "november"].includes(m)) return "fall";
  return undefined;
}

export function wizardToFilterOptions(state: Partial<WizardState>): FilterInput {
  const opts: FilterInput = {};

  if (state.destinationType === "region" && state.region) {
    opts.region = state.region;
  } else if (state.destinationType === "specific" && state.destination) {
    opts.specificCity = state.destination;
  }

  if (state.flexible && state.preferredSeason) {
    const map: Record<string, Season> = { Spring: "spring", Summer: "summer", Fall: "fall" };
    opts.season = map[state.preferredSeason];
  } else if (state.tripMonth) {
    opts.season = seasonFromMonth(state.tripMonth);
  }

  if (state.groupSize) opts.groupSize = state.groupSize;
  if (state.numberOfDays) opts.numberOfDays = state.numberOfDays;
  if (state.budget) opts.budget = state.budget;
  if (state.courseQuality) opts.courseQuality = state.courseQuality;
  if (state.activities && state.activities.length > 0) opts.activities = state.activities;

  return opts;
}

// ── NDJSON stream parser ──

export async function parseNDJSONStream(response: Response): Promise<StreamMessage[]> {
  const messages: StreamMessage[] = [];
  if (!response.body) return messages;

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        messages.push(JSON.parse(line));
      } catch {
        // skip malformed lines
      }
    }
  }

  // Handle remaining buffer
  if (buffer.trim()) {
    try {
      messages.push(JSON.parse(buffer));
    } catch {
      // skip
    }
  }

  return messages;
}
