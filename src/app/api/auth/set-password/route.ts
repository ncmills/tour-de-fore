import { NextResponse } from "next/server";
import { getSessionEmail, setPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const email = await getSessionEmail();
    if (!email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { password } = await req.json();
    if (!password || password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    await setPassword(email, password);

    // Send confirmation email (non-critical)
    const { sendEmail } = await import("@/lib/email");
    await sendEmail({
      to: email,
      subject: "Your Password Was Changed",
      html: `<div style="font-family: -apple-system, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 30px; text-align: center;"><h1 style="font-size: 24px; font-weight: 300; color: #c87941; margin: 0 0 24px;">Tour de Fore</h1><p style="color: #555; margin-bottom: 16px;">Your password was successfully changed.</p><p style="color: #999; font-size: 13px;">If you didn't make this change, contact us immediately at <a href="mailto:info@tourdefore.com" style="color: #c87941;">info@tourdefore.com</a>.</p></div>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Set password error:", err);
    return NextResponse.json({ error: "Failed to set password" }, { status: 500 });
  }
}
