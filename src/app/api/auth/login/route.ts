import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createSession } from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { setSessionCookie } from "@/lib/shared-constants";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Rate limit: 5 attempts per email per 15 min + 20 per IP per 15 min
    const normalizedEmail = email.toLowerCase().trim();
    const emailRl = await rateLimit(`login:${normalizedEmail}`, 5, 900);
    if (!emailRl.allowed) {
      return NextResponse.json(
        { error: "Too many login attempts. Try again in a few minutes." },
        { status: 429, headers: { "Retry-After": String(emailRl.resetIn) } }
      );
    }
    const ipRl = await rateLimit(`login-ip:${getClientIp(req)}`, 20, 900);
    if (!ipRl.allowed) {
      return NextResponse.json(
        { error: "Too many login attempts. Try again in a few minutes." },
        { status: 429, headers: { "Retry-After": String(ipRl.resetIn) } }
      );
    }

    const valid = await verifyPassword(normalizedEmail, password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const sessionId = await createSession(normalizedEmail);
    const response = NextResponse.json({ ok: true });
    setSessionCookie(response, sessionId);
    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
