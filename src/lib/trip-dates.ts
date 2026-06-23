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

export interface TripCountdown {
  /** Short human-readable countdown label, e.g. "32 days out", "This weekend!", "Past". */
  label: string;
  /** Whole days until the trip start. Negative once the start is behind us. null = no firm/soft date. */
  days: number | null;
  /** True when the trip is within 30 days and still in the future — the "lock it in" window. */
  urgent: boolean;
  /** True when the trip start has passed. */
  past: boolean;
  /** True when there's no usable date (flexible / no timing) — "Dates TBD". */
  tbd: boolean;
}

/**
 * Countdown label for a saved trip, derived from the SAME structured timing the
 * dates string and .ics export use. A flexible/no-date trip → "Dates TBD".
 *
 * Note: for firm months we anchor to the 1st (resolveTripStart). A "suggested"
 * season placeholder still produces a countdown but we soften the copy since
 * the date isn't locked.
 */
export function getTripCountdown(timing?: TripTiming | null, now: Date = new Date()): TripCountdown {
  const tbd: TripCountdown = { label: "Dates TBD", days: null, urgent: false, past: false, tbd: true };

  // No usable date at all → TBD.
  const hasFirmMonth = !!(timing && !timing.flexible && timing.tripMonth &&
    MONTH_INDEX[timing.tripMonth.trim().toLowerCase()] !== undefined);
  const hasSeason = !!(timing?.preferredSeason &&
    SEASON_MONTH[timing.preferredSeason.trim().toLowerCase()] !== undefined);
  if (!hasFirmMonth && !hasSeason) return tbd;

  const { start, suggested } = resolveTripStart(timing);
  const startMidnight = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.round((startMidnight.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));

  if (days < 0) return { label: "Past", days, urgent: false, past: true, tbd: false };

  const urgent = days <= 30;
  let label: string;
  if (days === 0) label = "Today!";
  else if (days === 1) label = "Tomorrow!";
  else if (days <= 3) label = "This weekend!";
  else if (days <= 7) label = "This week!";
  else if (days <= 30) label = `${days} days out`;
  else if (suggested) {
    // Soft season placeholder — don't imply a locked day count far out.
    const months = Math.round(days / 30);
    label = `~${months} month${months === 1 ? "" : "s"} out`;
  } else {
    label = `${days} days out`;
  }

  return { label, days, urgent, past: false, tbd: false };
}
