import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

/**
 * C2 — "Do Not Sell or Share My Personal Information".
 *
 * Takes an email and flips the opt-out flags on every wp_leads row for that
 * email (across brands — a single opt-out covers the portfolio): sets
 * do_not_sell=true AND consent_share=false so the row can never be exported
 * or sold. Best-effort + idempotent. Always returns ok so the form can show a
 * neutral confirmation without leaking whether the email is on file.
 *
 * GPC requests (Sec-GPC:1) hitting this endpoint are honored the same way.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rl = await rateLimit(`do-not-sell:${ip}`, 5, 60 * 60).catch(() => ({ allowed: true }));
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!EMAIL_REGEX.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  console.log("[do-not-sell]", JSON.stringify({ email, ip }));

  if (supabase) {
    try {
      const { error } = await supabase
        .from("wp_leads")
        .update({
          do_not_sell: true,
          consent_share: false,
          updated_at: new Date().toISOString(),
        })
        .eq("email", email);
      if (error) {
        console.error("[do-not-sell] update failed:", error.message);
      }
    } catch (err) {
      console.error("[do-not-sell] update threw:", err);
    }
  }

  // Neutral ok regardless — don't disclose whether the email exists.
  return NextResponse.json({ ok: true });
}
