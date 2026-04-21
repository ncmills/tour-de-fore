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
  const groupSize = clampInt(s.groupSize, 4, 20, 12);

  return {
    destinationType,
    destination,
    region,
    tripMonth: sanitizeString(s.tripMonth, 20),
    flexible: Boolean(s.flexible),
    preferredSeason: sanitizeString(s.preferredSeason, 20),
    numberOfDays,
    groupSize,
    skillMix: sanitizeString(s.skillMix, 50) || "Wide range",
    ageRange: sanitizeString(s.ageRange, 20) || "25-45",
    roundsPerDay: sanitizeString(s.roundsPerDay, 30) || "Two (36)",
    courseQuality: sanitizeString(s.courseQuality, 50) || "Mix of public & resort",
    walkingOrRiding: sanitizeString(s.walkingOrRiding, 30) || "Riding",
    mustPlayCourses: sanitizeString(s.mustPlayCourses, 500),
    lodging: sanitizeString(s.lodging, 50) || "One big house",
    dining: sanitizeDining(s.dining),
    nightlife: sanitizeString(s.nightlife, 50) || "Bars after dinner",
    activities: sanitizeStringArray(s.activities, 20, 30),
    budget: sanitizeString(s.budget, 50) || "$1,000-$1,500/person",
    budgetPriorities: sanitizeStringArray(s.budgetPriorities, 5, 50),
    specialRequests: sanitizeString(s.specialRequests, 1000),
    organizerName,
    organizerEmail,
    attendees: sanitizeAttendees(s.attendees),
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

/**
 * Dining accepts both the legacy single-string shape and the new array
 * shape. Legacy clients (stored plans in Redis) emit "Mix of local spots"
 * as a string; new wizard emits ["Steakhouses", "Private chef"]. Coerce
 * both to string[] without losing data.
 */
function sanitizeDining(val: unknown): string[] {
  if (Array.isArray(val)) {
    return val
      .filter((v): v is string => typeof v === "string")
      .map((v) => v.slice(0, 50).trim())
      .filter(Boolean)
      .slice(0, 5);
  }
  if (typeof val === "string") {
    const cleaned = val.slice(0, 50).trim();
    return cleaned ? [cleaned] : [];
  }
  return [];
}

function sanitizeStringArray(val: unknown, maxItems: number, maxItemLen: number): string[] {
  if (!Array.isArray(val)) return [];
  return val
    .slice(0, maxItems)
    .filter((v) => typeof v === "string")
    .map((v) => (v as string).slice(0, maxItemLen).trim())
    .filter(Boolean);
}

function sanitizeAttendees(val: unknown): { name: string; email: string }[] {
  if (!Array.isArray(val)) return [];
  return val
    .slice(0, 20) // cap at 20 attendees
    .filter((a) => a && typeof a === "object")
    .map((a: Record<string, unknown>) => ({
      name: sanitizeString(a.name, 100),
      email: sanitizeEmail(a.email),
    }))
    .filter((a) => a.email); // only keep entries with valid emails
}

function clampInt(val: unknown, min: number, max: number, fallback: number): number {
  const n = typeof val === "number" ? Math.round(val) : fallback;
  return Math.max(min, Math.min(max, n));
}
