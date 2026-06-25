/**
 * lead-capture — the B2 bridge (TDF local port; no shared-engine).
 *
 * Given a captured email + the visitor's `vid`, gather the visitor's anonymous
 * behavioral signal rows + latest explicit wizard answers, derive the scoreable
 * scalars, build the unified lead profile (§2E), and UPSERT the rich wp_leads
 * row (brand 'tdf', ON CONFLICT email,brand).
 *
 * HARD INVARIANTS:
 *  - Best-effort / NEVER throws. Capture endpoints must still ack + send their
 *    email even if profile assembly or the DB write fails.
 *  - consent_share is set true ONLY when consent === true. Default false.
 *  - Additive: preserves created_at on existing rows; keeps the tdf_subscribers
 *    dual-write owned by the caller.
 */

import { supabase } from "@/lib/supabase";
import {
  buildLeadProfile,
  assembleBehavior,
  type SignalRow,
} from "@/lib/lead-profile";
import { deriveLeadFields, type DeriveInput, type DerivedLeadFields } from "@/lib/derive";
import type { WizardState } from "@/lib/plan-types";

export interface CaptureLeadArgs {
  email: string;
  brand: "bestman" | "moh" | "tdf";
  vid?: string | null;
  source?: string | null;
  /** Explicit, verbatim consent to share/sell. NEVER inferred. */
  consent?: boolean;
  /** The exact consent-checkbox label shown to the user (stored verbatim). */
  consentText?: string | null;
  phone?: string | null;
}

/** Max signal rows pulled per table for a vid (recent-first). */
const ROW_CAP = 200;

/**
 * Parse a TDF freeform per-person budget label → number (mirror of the
 * generate-plan parser). "Fat pockets" / "sky's the limit" → unknown.
 */
function parseTdfPerPersonBudget(budget: string | undefined | null): number | null {
  if (!budget) return null;
  const s = budget.toLowerCase();
  const k = s.match(/\$?\s*(\d+(?:\.\d+)?)\s*k\b/);
  if (k) return Math.round(parseFloat(k[1]) * 1000);
  const dollars = s.match(/\$\s*([\d,]+)/);
  if (dollars) {
    const n = parseInt(dollars[1].replace(/,/g, ""), 10);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return null;
}

/**
 * Map a TDF WizardState → the brand-agnostic DeriveInput (mirror of the
 * generate-plan mapper). TDF has month only (no year) + golf fields.
 */
function wizardToDeriveInput(state: WizardState): DeriveInput {
  return {
    eventMonth: state.tripMonth || null,
    eventYear: null,
    season: state.preferredSeason || null,
    groupSize: state.groupSize ?? null,
    perPersonBudgetUsd: parseTdfPerPersonBudget(state.budget),
    activityTokens: state.activities ?? [],
    lodgingTokens: state.lodging ? [state.lodging] : [],
    nightlifeTokens: state.nightlife ? [state.nightlife] : [],
    diningTokens: state.dining ?? [],
    golfTokens: [
      ...(state.courseQuality ? [state.courseQuality] : []),
      ...(state.roundsPerDay ? [state.roundsPerDay] : []),
      ...(state.mustPlayCourses ? [state.mustPlayCourses] : []),
      ...(state.walkingOrRiding ? [state.walkingOrRiding] : []),
    ],
  };
}

/** Compact a WizardState into the `explicit` profile block (PII dropped). */
function compactExplicit(state: WizardState): Record<string, unknown> {
  return {
    destination_type: state.destinationType,
    destination: state.destination,
    region: state.region,
    trip_month: state.tripMonth,
    number_of_days: state.numberOfDays,
    group_size: state.groupSize,
    skill_mix: state.skillMix,
    age_range: state.ageRange,
    rounds_per_day: state.roundsPerDay,
    course_quality: state.courseQuality,
    walking_or_riding: state.walkingOrRiding,
    must_play_courses: state.mustPlayCourses,
    lodging: state.lodging,
    dining: state.dining,
    nightlife: state.nightlife,
    activities: state.activities,
    budget: state.budget,
  };
}

interface PlanInputsRow {
  payload: Record<string, unknown> | null;
  created_at: string | null;
}

async function gatherSignals(vid: string): Promise<{
  rows: SignalRow[];
  latestInputs: PlanInputsRow | null;
  firstSeen: string | null;
  lastSeen: string | null;
}> {
  const empty = { rows: [] as SignalRow[], latestInputs: null, firstSeen: null, lastSeen: null };
  if (!supabase) return empty;

  const tables = [
    "wp_plan_inputs",
    "wp_plan_selections",
    "wp_acquisition_log",
    "wp_plan_bookmarks",
  ];

  const queryTable = async (t: string): Promise<SignalRow[]> => {
    try {
      const { data, error } = await supabase!
        .from(t)
        .select("session_id, brand, payload, created_at")
        .filter("payload->>vid", "eq", vid)
        .order("created_at", { ascending: false })
        .limit(ROW_CAP);
      if (error) {
        console.warn(`[lead-capture] ${t} query failed:`, error.message);
        return [];
      }
      return (data ?? []).map((r) => ({ ...r, table: t })) as SignalRow[];
    } catch (err) {
      console.warn(`[lead-capture] ${t} query threw:`, err);
      return [];
    }
  };

  try {
    const results = await Promise.all(tables.map((t) => queryTable(t)));

    const rows = results.flat();
    const planInputsRows = results[0] ?? [];
    const latestInputs: PlanInputsRow | null = planInputsRows[0]
      ? { payload: planInputsRows[0].payload ?? null, created_at: planInputsRows[0].created_at ?? null }
      : null;

    let firstSeen: string | null = null;
    let lastSeen: string | null = null;
    for (const r of rows) {
      const ts = r.created_at ?? null;
      if (!ts) continue;
      if (!firstSeen || ts < firstSeen) firstSeen = ts;
      if (!lastSeen || ts > lastSeen) lastSeen = ts;
    }

    return { rows, latestInputs, firstSeen, lastSeen };
  } catch (err) {
    console.warn("[lead-capture] gatherSignals failed:", err);
    return empty;
  }
}

function collectPlanIds(rows: SignalRow[]): string[] {
  const out = new Set<string>();
  for (const r of rows) {
    const p = r.payload;
    if (!p) continue;
    const id = (p as { planId?: unknown }).planId;
    if (typeof id === "string" && id.length > 0) out.add(id);
  }
  return [...out];
}

/**
 * Best-effort rich-lead capture into wp_leads (brand 'tdf'). NEVER throws.
 */
export async function captureLead(args: CaptureLeadArgs): Promise<{ upserted: boolean }> {
  const { email, brand, vid, source, consent, consentText, phone } = args;
  if (!supabase) {
    console.warn("[lead-capture] supabase unavailable — profile not persisted");
    return { upserted: false };
  }

  try {
    let derived: DerivedLeadFields | null = null;
    let explicit: Record<string, unknown> = {};
    let behaviorRows: SignalRow[] = [];
    let firstSeen: string | null = null;
    let lastSeen: string | null = null;
    let planIds: string[] = [];

    if (vid) {
      const gathered = await gatherSignals(vid);
      behaviorRows = gathered.rows;
      firstSeen = gathered.firstSeen;
      lastSeen = gathered.lastSeen;
      planIds = collectPlanIds(gathered.rows);

      const inputsPayload = gathered.latestInputs?.payload;
      if (inputsPayload && typeof inputsPayload === "object") {
        const state = inputsPayload as unknown as WizardState;
        try {
          const carried = (inputsPayload as { derived?: unknown }).derived;
          derived =
            carried && typeof carried === "object"
              ? (carried as DerivedLeadFields)
              : deriveLeadFields(wizardToDeriveInput(state), new Date());
        } catch (err) {
          console.warn("[lead-capture] derive failed (non-fatal):", err);
        }
        try {
          explicit = compactExplicit(state);
        } catch {
          /* keep explicit empty */
        }
      }
    }

    const behavior = assembleBehavior(behaviorRows);
    const profile = buildLeadProfile({
      explicit,
      derived,
      behavior,
      provenance: { first_seen: firstSeen, last_seen: lastSeen, plan_ids: planIds },
    });

    const row: Record<string, unknown> = {
      email,
      brand,
      updated_at: new Date().toISOString(),
      profile,
    };
    if (source) row.source = source;
    if (vid) row.vid = vid;
    if (phone) row.phone = phone;
    if (derived) {
      if (derived.event_date != null) row.event_date = derived.event_date;
      if (derived.days_to_event != null) row.days_to_event = derived.days_to_event;
      if (derived.group_size != null) row.group_size = derived.group_size;
      if (derived.est_spend_usd != null) row.est_spend_usd = derived.est_spend_usd;
      if (derived.spend_tier != null) row.spend_tier = derived.spend_tier;
    }

    // CONSENT — set true ONLY on explicit consent===true. Never otherwise.
    if (consent === true) {
      row.consent_share = true;
      row.consent_text = consentText ?? null;
      row.consent_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from("wp_leads")
      .upsert(row, { onConflict: "email,brand" });
    if (error) {
      console.error("[lead-capture] upsert failed:", error.message);
      return { upserted: false };
    }
    return { upserted: true };
  } catch (err) {
    console.error("[lead-capture] captureLead threw (swallowed):", err);
    return { upserted: false };
  }
}
