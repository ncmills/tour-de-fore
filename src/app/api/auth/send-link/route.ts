import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createMagicToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const token = await createMagicToken(email);
    const origin = req.headers.get("origin") || "https://tourdefore.com";
    const link = `${origin}/api/auth/verify?token=${token}`;

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Tour de Fore <noreply@tourdefore.com>",
      to: email,
      subject: "Your Tour de Fore Login Link",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 500px; margin: 0 auto; background: #0a0a0a; color: #ece8e1; padding: 40px 30px; text-align: center;">
          <h1 style="font-size: 24px; font-weight: 300; color: #c87941; margin: 0 0 24px;">Tour de Fore</h1>
          <p style="color: #9a9590; margin-bottom: 32px;">Click below to access your saved trips.</p>
          <a href="${link}" style="display: inline-block; background: #c87941; color: #fff; text-decoration: none; padding: 14px 40px; border-radius: 4px; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase;">
            Sign In
          </a>
          <p style="color: #5a5550; font-size: 12px; margin-top: 32px;">This link expires in 15 minutes.</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Magic link error:", err);
    return NextResponse.json({ error: "Failed to send link" }, { status: 500 });
  }
}
