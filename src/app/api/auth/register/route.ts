import { NextRequest, NextResponse } from "next/server";
import { createSession, setPassword, setUserName, setEmailVerified, hasPassword } from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 5 registrations per IP per hour
    const rl = await rateLimit(`register:${getClientIp(req)}`, 5, 3600);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Too many registrations. Try again later." },
        { status: 429, headers: { "Retry-After": String(rl.resetIn) } }
      );
    }

    const { email, password, name } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }
    if (!password || password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if account already exists
    const exists = await hasPassword(normalizedEmail);
    if (exists) {
      return NextResponse.json({ error: "Account already exists. Try signing in." }, { status: 409 });
    }

    // Create account
    await setPassword(normalizedEmail, password);
    await setEmailVerified(normalizedEmail);
    if (name) await setUserName(normalizedEmail, name);

    // Create session
    const sessionId = await createSession(normalizedEmail);

    const response = NextResponse.json({ ok: true });
    response.cookies.set("tdf-session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
