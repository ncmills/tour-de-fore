import { Resend } from "resend";

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
    await getResend().emails.send({
      from: FROM_ADDRESS,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    });
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

export { FROM_ADDRESS };
