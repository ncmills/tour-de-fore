import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createMagicToken } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const { email, returnTo, wizardState } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // Rate limit: 3 magic links per email per 15 minutes
    const normalizedEmail = email.toLowerCase().trim();
    const rl = await rateLimit(`magic:${normalizedEmail}`, 3, 900);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Too many login attempts. Try again in a few minutes." }, { status: 429 });
    }

    const token = await createMagicToken(email, wizardState);
    const origin = req.headers.get("origin") || "https://tourdefore.com";
    const returnParam = returnTo ? `&returnTo=${encodeURIComponent(returnTo)}` : "";
    const link = `${origin}/api/auth/verify?token=${token}${returnParam}`;

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Tour de Fore <noreply@tourdefore.com>",
      to: email,
      subject: "Your Tour de Fore Login Link",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 30px; text-align: center;">
          <h1 style="font-size: 24px; font-weight: 300; color: #c87941; margin: 0 0 24px;">Tour de Fore</h1>
          <p style="color: #555; margin-bottom: 32px;">Click below to verify your email and generate your trip plan.</p>
          <a href="${link}" style="display: inline-block; background: #c87941; color: #fff; text-decoration: none; padding: 14px 40px; border-radius: 4px; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase;">
            Verify & Plan
          </a>
          <p style="color: #999; font-size: 12px; margin-top: 32px;">This link expires in 15 minutes.</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("Magic link error:", msg, err);
    return NextResponse.json({ error: `Failed to send link: ${msg}` }, { status: 500 });
  }
}
