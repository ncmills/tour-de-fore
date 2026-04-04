import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const FROM_ADDRESS = "Tour de Fore <noreply@tourdefore.com>";

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
