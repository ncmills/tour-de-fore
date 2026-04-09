import { NextRequest, NextResponse } from "next/server";
import { getSessionEmail, verifyPassword, changeUserEmail, createSession } from "@/lib/auth";
import { setSessionCookie } from "@/lib/shared-constants";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rl = await rateLimit(`change-email:${ip}`, 5, 3600);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429, headers: { "Retry-After": String(rl.resetIn) } });
    }

    const email = await getSessionEmail();
    if (!email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { newEmail, password } = await req.json();

    if (!newEmail || !password) {
      return NextResponse.json({ error: "New email and password are required" }, { status: 400 });
    }

    const normalized = newEmail.toLowerCase().trim();
    if (normalized === email) {
      return NextResponse.json({ error: "That's already your email" }, { status: 400 });
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Verify current password
    const valid = await verifyPassword(email, password);
    if (!valid) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }

    // Migrate all user data to new email
    await changeUserEmail(email, normalized);

    // Create new session under new email
    const sessionId = await createSession(normalized);
    const response = NextResponse.json({ ok: true, email: normalized });
    setSessionCookie(response, sessionId);
    return response;
  } catch (err) {
    console.error("Change email error:", err);
    return NextResponse.json({ error: "Failed to change email" }, { status: 500 });
  }
}
