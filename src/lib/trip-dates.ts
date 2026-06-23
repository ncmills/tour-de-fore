// ── Trip date resolution (single source of truth) ──
//
// The human-readable trip-dates string and the .ics calendar export must agree.
// Both derive from the user's STRUCTURED timing inputs (tripMonth / preferredSeason
// / flexible) — never from the LLM's free-text `plan.dates`, which drifts (it has
// rendered "flexible" for firm months and even emitted past years).
//
// Consumers:
//   - generateICSFile (ItineraryClient) → resolveTripStart for DTSTART
//   - PlanResultClient result header     → formatTripDates
//   - /api/send-plan-emails template     → formatTripDates

export interface TripTiming {
  tripMonth?: string;
  preferredSeason?: string;
  flexible?: boolean;
}

export const MONTH_INDEX: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Representative month for each season in the Northern Hemisphere — the
// midpoint, so a "suggested" Summer date lands in July, etc.
export const SEASON_MONTH: Record<string, number> = {
  spring: 3, // April
  summer: 6, // July
  fall: 9,   // October
  autumn: 9,
  winter: 0, // January (next year handled below)
};

const SEASON_LABEL: Record<string, string> = {
  spring: "Spring",
  summer: "Summer",
  fall: "Fall",
  autumn: "Fall",
  winter: "Winter",
};

/**
 * Resolve a concrete start Date for the trip from the user's selected timing.
 * Returns the anchor date plus whether it's a firm month or a soft "suggested"
 * season placeholder. Falls back to a near-future date (~6 weeks out) when no
 * timing was captured. Never returns a past date.
 */
export function resolveTripStart(timing?: TripTiming | null): { start: Date; suggested: boolean } {
  const now = new Date();

  const pickMonth = (monthIdx: number): Date => {
    // First of the month. Roll to next year if the target month is already
    // in the past this year, so we never anchor to a past month.
    const year = monthIdx < now.getMonth() ? now.getFullYear() + 1 : now.getFullYear();
    return new Date(year, monthIdx, 1);
  };

  if (timing) {
    if (!timing.flexible && timing.tripMonth) {
      const idx = MONTH_INDEX[timing.tripMonth.trim().toLowerCase()];
      if (idx !== undefined) return { start: pickMonth(idx), suggested: false };
    }
    if (timing.preferredSeason) {
      const idx = SEASON_MONTH[timing.preferredSeason.trim().toLowerCase()];
      if (idx !== undefined) return { start: pickMonth(idx), suggested: true };
    }
  }

  // No timing info — suggest a near-future date ~6 weeks out.
  const fallback = new Date(now.getTime() + 42 * 24 * 60 * 60 * 1000);
  fallback.setHours(0, 0, 0, 0);
  return { start: fallback, suggested: true };
}

/**
 * Human-readable trip-dates string, derived from the SAME structured timing the
 * .ics export uses. Examples:
 *   - firm month:      "May 2027"
 *   - flexible season: "Flexible — Spring 2027"
 *   - no timing:       "Flexible — dates TBD"
 * Never emits a past year (resolveTripStart rolls a past month to next year).
 */
export function formatTripDates(timing?: TripTiming | null): string {
  // Flexible with a stated season → "Flexible — <Season> <Year>"
  if (timing?.flexible && timing.preferredSeason) {
    const key = timing.preferredSeason.trim().toLowerCase();
    const label = SEASON_LABEL[key];
    if (label) {
      const { start } = resolveTripStart(timing);
      return `Flexible — ${label} ${start.getFullYear()}`;
    }
  }

  // Firm month (flexible:false + tripMonth) → "<Month> <Year>"
  if (timing && !timing.flexible && timing.tripMonth) {
    const idx = MONTH_INDEX[timing.tripMonth.trim().toLowerCase()];
    if (idx !== undefined) {
      const { start } = resolveTripStart(timing);
      return `${MONTH_NAMES[idx]} ${start.getFullYear()}`;
    }
  }

  // Anything else (no usable timing, or flexible with no season) → TBD.
  return "Flexible — dates TBD";
}
