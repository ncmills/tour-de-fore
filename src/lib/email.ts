import { Resend } from "resend";
import type { StoredPlan } from "./plan-types";
import { formatTripDates } from "./trip-dates";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const FROM_ADDRESS = "Tour de Fore <info@tourdefore.com>";

/**
 * Record email failure in Redis for monitoring.
 * Stores last 50 failures with 7-day TTL.
 */
async function recordEmailFailure(to: string, subject: string, error: string): Promise<void> {
  try {
    const { getRedis } = await import("./redis");
    const r = getRedis();
    const entry = JSON.stringify({ to, subject, error, at: new Date().toISOString() });
    const pipe = r.pipeline();
    pipe.lpush("email:failures", entry);
    pipe.ltrim("email:failures", 0, 49); // keep last 50
    pipe.expire("email:failures", 60 * 60 * 24 * 7); // 7 day TTL
    await pipe.exec();
  } catch {
    // Don't let failure tracking break the caller
  }
}

/**
 * Send an email via Resend. Non-critical by default (swallows errors).
 * Set `critical: true` to let errors propagate.
 */
export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  critical?: boolean;
}): Promise<void> {
  try {
    if (!process.env.RESEND_API_KEY) return;
    const { data, error } = await getResend().emails.send({
      from: FROM_ADDRESS,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    });
    if (error) {
      throw new Error(`Resend send failed: ${(error as { name?: string }).name || "unknown"} — ${error.message || String(error)}`);
    }
    if (!data?.id) {
      throw new Error("Resend send returned no id");
    }
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    await recordEmailFailure(opts.to, opts.subject, errMsg);
    if (opts.critical) throw err;
    console.error("Email send failed (non-critical):", err);
  }
}

/**
 * Send multiple emails in parallel via Resend. Returns the Resend instance
 * for cases needing direct access (e.g., Promise.all with custom logic).
 */
export function getResendClient(): Resend {
  return getResend();
}

/**
 * Build the "your plan is ready" email (subject + HTML) for a stored plan.
 * Single source of truth shared by /api/send-plan-emails (crew blast) and the
 * generate-plan "email me when it's done" notification. Uses the mid
 * destination's devil tier for the headline numbers and the user's STRUCTURED
 * timing for dates (matches the .ics export), not the LLM's free-text dates.
 */
export function buildPlanReadyEmail(
  stored: StoredPlan,
  opts: { isOrganizer?: boolean } = {}
): { subject: string; html: string } {
  const plan = stored.destinations!.mid.plans.devil;
  const tripDates = formatTripDates(
    stored.inputs
      ? {
          tripMonth: stored.inputs.tripMonth,
          preferredSeason: stored.inputs.preferredSeason,
          flexible: stored.inputs.flexible,
        }
      : null
  );
  const planUrl = `https://tourdefore.com/plan/result/${stored.id}`;
  const isOrganizer = !!opts.isOrganizer;

  const subject = `${plan.tripName} — Your Golf Trip Plan is Ready`;
  const html = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ece8e1; padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="font-size: 28px; font-weight: 300; color: #c87941; margin: 0;">Tour de Fore</h1>
            </div>

            <h2 style="font-size: 24px; font-weight: 600; margin: 0 0 8px;">
              ${plan.tripName}
            </h2>
            <p style="color: #9a9590; font-style: italic; margin: 0 0 24px;">
              "${plan.tagline}"
            </p>

            <div style="background: #111111; border: 1px solid #1e1e1e; border-radius: 4px; padding: 20px; margin-bottom: 24px;">
              <p style="margin: 0 0 8px;"><strong style="color: #c87941;">Destination:</strong> ${plan.destination}</p>
              <p style="margin: 0 0 8px;"><strong style="color: #c87941;">Dates:</strong> ${tripDates}</p>
              <p style="margin: 0 0 8px;"><strong style="color: #c87941;">Group:</strong> ${plan.groupSize} people</p>
              <p style="margin: 0;"><strong style="color: #c87941;">Budget:</strong> ${plan.estimatedBudget.perPerson} per person</p>
            </div>

            ${isOrganizer ? '<p style="background: #1a1510; border-left: 3px solid #c87941; padding: 12px 16px; color: #c9a96e; font-size: 14px;">You\'re the organizer for this trip. Rally the crew!</p>' : ""}

            <div style="text-align: center; margin: 32px 0;">
              <a href="${planUrl}" style="display: inline-block; background: #c87941; color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 4px; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase;">
                View Full Plan
              </a>
            </div>

            <p style="color: #9a9590; font-size: 13px; text-align: center; margin: 24px 0 4px;">
              Forward this email or drop the link in the group chat &mdash; anyone with it can view the plan.
            </p>
            <p style="word-break: break-all; text-align: center; margin: 0 0 32px;">
              <a href="${planUrl}" style="color: #c87941; font-size: 12px; text-decoration: none;">${planUrl}</a>
            </p>

            <p style="color: #5a5550; font-size: 12px; text-align: center; margin-top: 40px;">
              Sent via Tour de Fore &mdash; tourdefore.com
            </p>
          </div>
        `;
  return { subject, html };
}

export { FROM_ADDRESS };
