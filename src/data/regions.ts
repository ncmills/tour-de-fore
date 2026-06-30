// ── Wizard region → selectable state chips ──
//
// Single source of truth for the region picker in PlanWizardClient. Kept as a
// hand-maintained compact map (NOT derived from allDestinations) so the client
// bundle never has to pull the full 234-destination dataset just to render the
// state chips.
//
// IT MUST STAY IN SYNC WITH THE DATA. `scripts/audit-region-reachability.ts`
// proves every tdf-destination's (region, state) is reachable through this map
// and fails CI/locally if a state is missing. Last synced 2026-06-30 against
// the 234-destination shared-data universe (was drifting behind the expansion —
// KS/ND/SD/WV were data-only, unreachable via the chips).
//
// NOTE: this is the DATA region partition (matches Destination.region), which
// is distinct from the cosmetic geographic partition in RegionMap.tsx used only
// to highlight the SVG map thumbnail. Do not conflate the two.

export const REGION_NAMES = [
  "Southwest",
  "Pacific NW",
  "Mountain West",
  "Midwest",
  "Southeast",
  "Northeast",
  "South Central",
  "California",
  "International",
] as const;

export const REGION_STATES: Record<string, string[]> = {
  "Southwest": ["AZ", "NM", "NV", "UT"],
  "Pacific NW": ["ID", "OR", "WA"],
  "Mountain West": ["CO", "ID", "MT", "SD", "UT", "WY"],
  "Midwest": ["IA", "IL", "IN", "KS", "MI", "MN", "MO", "ND", "NE", "OH", "SD", "WI"],
  "Southeast": ["AL", "FL", "GA", "KY", "MS", "NC", "SC", "TN", "VA"],
  "Northeast": ["CT", "MA", "MD", "ME", "NH", "NJ", "NY", "PA", "RI", "VA", "VT", "WV"],
  "South Central": ["AR", "KY", "LA", "MO", "OK", "TX"],
  "California": ["CA"],
  "International": ["Bahamas", "Dominican Republic", "Ireland", "Mexico", "Northern Ireland", "Portugal", "Scotland", "Spain"],
};
