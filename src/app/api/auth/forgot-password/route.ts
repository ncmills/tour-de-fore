import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createMagicToken, hasPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const hasPw = await hasPassword(normalizedEmail);
    if (!hasPw) {
      // Always return 200 to prevent email enumeration
      return NextResponse.json({ ok: true });
    }

    const token = await createMagicToken(normalizedEmail);
    const origin = req.headers.get("origin") || "https://tourdefore.com";
    const link = `${origin}/api/auth/verify?token=${token}&returnTo=/set-password`;

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Tour de Fore <noreply@tourdefore.com>",
      to: normalizedEmail,
      subject: "Reset Your Tour de Fore Password",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 30px; text-align: center;">
          <h1 style="font-size: 24px; font-weight: 300; color: #c87941; margin: 0 0 24px;">Tour de Fore</h1>
          <p style="color: #555; margin-bottom: 32px;">Click below to reset your password.</p>
          <a href="${link}" style="display: inline-block; background: #c87941; color: #fff; text-decoration: none; padding: 14px 40px; border-radius: 4px; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase;">
            Reset Password
          </a>
          <p style="color: #999; font-size: 12px; margin-top: 32px;">This link expires in 15 minutes.</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json({ error: "Failed to send reset email" }, { status: 500 });
  }
}
