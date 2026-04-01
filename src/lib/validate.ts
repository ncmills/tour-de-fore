import type { WizardState } from "./plan-types";

/**
 * Validate and sanitize WizardState input.
 * Returns cleaned state or throws with a message.
 */
export function validateWizardState(raw: unknown): WizardState {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid request body");
  }

  const s = raw as Record<string, unknown>;

  // Required strings
  const organizerName = sanitizeString(s.organizerName, 100);
  const organizerEmail = sanitizeEmail(s.organizerEmail);

  if (!organizerEmail) throw new Error("Valid organizer email is required");

  // Enum validations
  const destinationType = s.destinationType === "specific" ? "specific" : "region";
  const destination = sanitizeString(s.destination, 200);
  const region = sanitizeString(s.region, 50);

  if (destinationType === "specific" && !destination) {
    throw new Error("Destination is required when selecting a specific place");
  }

  // Numbers with bounds
  const numberOfDays = clampInt(s.numberOfDays, 2, 7, 3);
  const groupSize = clampInt(s.groupSize, 4, 32, 12);

  return {
    destinationType,
    destination,
    region,
    tripMonth: sanitizeString(s.tripMonth, 20),
    tripYear: sanitizeString(s.tripYear, 10),
    flexible: Boolean(s.flexible),
    preferredSeason: sanitizeString(s.preferredSeason, 20),
    numberOfDays,
    groupSize,
    skillMix: sanitizeString(s.skillMix, 50),
    ageRange: sanitizeString(s.ageRange, 20),
    roundsPerDay: sanitizeString(s.roundsPerDay, 30),
    courseQuality: sanitizeString(s.courseQuality, 50),
    walkingOrRiding: sanitizeString(s.walkingOrRiding, 30),
    mustPlayCourses: sanitizeString(s.mustPlayCourses, 500),
    lodging: sanitizeString(s.lodging, 50),
    dining: sanitizeString(s.dining, 50),
    nightlife: sanitizeString(s.nightlife, 50),
    activities: sanitizeStringArray(s.activities, 20, 30),
    budget: sanitizeString(s.budget, 50),
    budgetPriorities: sanitizeStringArray(s.budgetPriorities, 5, 50),
    specialRequests: sanitizeString(s.specialRequests, 1000),
    organizerName,
    organizerEmail,
    attendees: [], // sanitize out attendee data for now
    authMode: (s.authMode === "login" ? "login" : "new") as "new" | "login",
    authPassword: "", // never send password to plan generation
  };
}

function sanitizeString(val: unknown, maxLen: number): string {
  if (typeof val !== "string") return "";
  return val.slice(0, maxLen).trim();
}

function sanitizeEmail(val: unknown): string {
  const s = sanitizeString(val, 254);
  if (!s.includes("@") || !s.includes(".")) return "";
  return s.toLowerCase();
}

function sanitizeStringArray(val: unknown, maxItems: number, maxItemLen: number): string[] {
  if (!Array.isArray(val)) return [];
  return val
    .slice(0, maxItems)
    .filter((v) => typeof v === "string")
    .map((v) => (v as string).slice(0, maxItemLen).trim())
    .filter(Boolean);
}

function clampInt(val: unknown, min: number, max: number, fallback: number): number {
  const n = typeof val === "number" ? Math.round(val) : fallback;
  return Math.max(min, Math.min(max, n));
}
