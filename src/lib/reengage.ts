// ── Returning-user re-engagement engine ──
//
// A daily cron (src/app/api/cron/trip-reminders/route.ts) enumerates saved
// plans and nudges the trip ORGANIZER as their golf trip approaches, pulling
// them back to lock tee times and re-share with the crew.
//
// This module holds the *pure* selection + content logic so it can be
// dry-run/unit-tested without Redis or Resend. The cron route wires it to the
// live stores. Date math reuses the single-source-of-truth trip-date resolver
// (getTripCountdown) so a nudge can only fire on the SAME firm date the result
// header and .ics export show — never the LLM's drifty free-text dates.

import type { StoredPlan } from "./plan-types";
import { getTripCountdown } from "./trip-dates";

// Nudge windows, in whole days-until-trip. A plan fires AT MOST once per window.
// Wider-to-tighter cadence as the trip nears.
export const REENGAGE_WINDOWS = [30, 14, 3] as const;
export type ReengageWindow = (typeof REENGAGE_WINDOWS)[number];

/**
 * Which window (if any) does this exact days-until-trip count map to?
 *
 * Crons run once a day, so a trip will pass through each target day exactly
 * once. We match on the exact day rather than a range to guarantee a single
 * fire per window even before the Redis de-dupe guard (which is the durable
 * belt-and-suspenders against re-runs / catch-up runs).
 */
export function windowForDays(days: number | null): ReengageWindow | null {
  if (days == null) return null;
  for (const w of REENGAGE_WINDOWS) {
    if (days === w) return w;
  }
  return null;
}

/**
 * Is this plan eligible to be considered for a nudge at all?
 *
 * Gate: must have an organizer email AND a FIRM future trip date. "Firm" means
 * a concrete picked month (flexible:false + a real tripMonth) — NOT a soft
 * "suggested" season placeholder and NOT a flexible/TBD trip. We deliberately
 * never nudge flexible/no-date plans: there's no real deadline to rally around.
 */
export function isFirmFutureTrip(plan: StoredPlan, now: Date = new Date()): boolean {
  const inputs = plan.inputs;
  if (!inputs) return false;

  // Firm = explicitly not flexible AND has a usable tripMonth.
  if (inputs.flexible) return false;
  if (!inputs.tripMonth || !inputs.tripMonth.trim()) return false;

  const countdown = getTripCountdown(
    { tripMonth: inputs.tripMonth, preferredSeason: inputs.preferredSeason, flexible: inputs.flexible },
    now
  );
  // tbd guards the case where tripMonth isn't a recognized month name.
  if (countdown.tbd || countdown.past) return false;
  if (countdown.days == null || countdown.days < 0) return false;

  return true;
}

export interface NudgeDecision {
  planId: string;
  organizerEmail: string;
  window: ReengageWindow;
  days: number;
}

/**
 * Pure decision: given a plan + the current time, return the nudge to send
 * (window + recipient) or null if this plan doesn't hit a window today / isn't
 * eligible. De-dupe and opt-out are layered ON TOP of this by the cron, since
 * they need Redis. This function is intentionally side-effect free.
 */
export function decideNudge(plan: StoredPlan, now: Date = new Date()): NudgeDecision | null {
  const organizerEmail = plan.inputs?.organizerEmail?.trim();
  if (!organizerEmail || !organizerEmail.includes("@")) return null;
  if (!isFirmFutureTrip(plan, now)) return null;

  const countdown = getTripCountdown(
    {
      tripMonth: plan.inputs.tripMonth,
      preferredSeason: plan.inputs.preferredSeason,
      flexible: plan.inputs.flexible,
    },
    now
  );
  const window = windowForDays(countdown.days);
  if (window == null) return null;

  return { planId: plan.id, organizerEmail, window, days: countdown.days! };
}

// ── Redis key helpers (de-dupe + opt-out) ──

export function nudgeDedupeKey(planId: string, window: ReengageWindow): string {
  return `trip-nudge:${planId}:${window}`;
}

export function optoutKey(email: string): string {
  // Normalize so opt-out is case-insensitive and whitespace-tolerant.
  return `reengage-optout:${email.trim().toLowerCase()}`;
}

/**
 * Seconds from `now` until a little past the trip start, so the de-dupe key
 * self-expires after the trip is over (no unbounded growth in the shared
 * 30MB Redis). Floored to a sane minimum so a near-trip nudge still persists
 * a few days. Capped so a far-out T-30 key can't outlive the 21-day plan TTL
 * by a lot.
 */
export function dedupeTtlSeconds(daysUntilTrip: number): number {
  const DAY = 60 * 60 * 24;
  // Keep through the trip + 3-day buffer; min 3 days, max 35 days.
  const ttl = (daysUntilTrip + 3) * DAY;
  return Math.min(Math.max(ttl, 3 * DAY), 35 * DAY);
}

// ── Email content (TDF irreverent voice) ──

const SITE = "https://tourdefore.com";

function windowCopy(window: ReengageWindow): { kicker: string; headline: string; body: string; cta: string } {
  switch (window) {
    case 30:
      return {
        kicker: "T-minus 30 days",
        headline: "Your golf trip is a month out. Time to stop talking and start booking.",
        body:
          "Tee sheets fill up — the good morning times go first, and they go fast. Pop back into your plan, lock the courses you want, and drop the link in the group chat so the crew can quit asking you \"so is this actually happening?\"",
        cta: "Lock in the plan",
      };
    case 14:
      return {
        kicker: "Two weeks out",
        headline: "Trip's in ~2 weeks. Lock your tee times before someone else does.",
        body:
          "This is the window where it gets real. Confirm your foursomes, square away the tee times, and make sure everyone's actually paid you back. Re-send the plan to the crew — the stragglers always need a second nudge.",
        cta: "Finalize tee times",
      };
    case 3:
      return {
        kicker: "Game week",
        headline: "3 days out. Get the final foursomes from the crew and go.",
        body:
          "No more dithering. Double-check the tee times, confirm the house and the ride, and shoot the final plan to everyone one last time so nobody shows up to the wrong course at the wrong hour. Then go play some golf.",
        cta: "Review the final plan",
      };
  }
}

/**
 * Build the re-engagement nudge email (subject + HTML) for a plan + window.
 * Uses the TDF dark/ember design language (matches buildPlanReadyEmail) and
 * always includes an unsubscribe link. `unsubscribeUrl` is passed in so the
 * cron can sign/route it; falls back to the bare /api/unsubscribe link.
 */
export function buildReengageEmail(
  plan: StoredPlan,
  window: ReengageWindow,
  opts: { unsubscribeUrl?: string } = {}
): { subject: string; html: string } {
  const planUrl = `${SITE}/plan/result/${plan.id}`;
  const organizerEmail = plan.inputs?.organizerEmail || "";
  const unsubscribeUrl =
    opts.unsubscribeUrl ||
    `${SITE}/api/unsubscribe?email=${encodeURIComponent(organizerEmail)}`;

  // Trip name if we have a generated plan; otherwise a generic but on-brand line.
  const tripName =
    plan.destinations?.mid?.plans?.devil?.tripName ||
    plan.plans?.devil?.tripName ||
    "Your Golf Trip";

  const c = windowCopy(window);
  const subject =
    window === 30
      ? `${tripName} is a month out — lock it in`
      : window === 14
        ? `2 weeks out: lock your tee times for ${tripName}`
        : `Game week — final call on ${tripName}`;

  const html = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ece8e1; padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="font-size: 28px; font-weight: 300; color: #c87941; margin: 0;">Tour de Fore</h1>
            </div>

            <p style="color: #c87941; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 8px;">
              ${c.kicker}
            </p>
            <h2 style="font-size: 22px; font-weight: 600; margin: 0 0 16px; line-height: 1.3;">
              ${c.headline}
            </h2>
            <p style="color: #cfc9c1; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
              ${c.body}
            </p>

            <div style="background: #111111; border: 1px solid #1e1e1e; border-radius: 4px; padding: 16px 20px; margin-bottom: 24px;">
              <p style="margin: 0; color: #9a9590; font-size: 14px;">
                <strong style="color: #c87941;">Trip:</strong> ${tripName}
              </p>
            </div>

            <div style="text-align: center; margin: 32px 0;">
              <a href="${planUrl}" style="display: inline-block; background: #c87941; color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 4px; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase;">
                ${c.cta}
              </a>
            </div>

            <p style="color: #9a9590; font-size: 13px; text-align: center; margin: 24px 0 4px;">
              Forward this or drop the link in the group chat &mdash; anyone with it can view the plan.
            </p>
            <p style="word-break: break-all; text-align: center; margin: 0 0 32px;">
              <a href="${planUrl}" style="color: #c87941; font-size: 12px; text-decoration: none;">${planUrl}</a>
            </p>

            <p style="color: #5a5550; font-size: 12px; text-align: center; margin-top: 40px;">
              Sent via Tour de Fore &mdash; tourdefore.com<br />
              You're getting this because you organized a trip with us.
              <a href="${unsubscribeUrl}" style="color: #7a756e; text-decoration: underline;">Stop these reminders</a>.
            </p>
          </div>
        `;

  return { subject, html };
}
