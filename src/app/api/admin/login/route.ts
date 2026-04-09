import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/auth";
import { verifyAdmin, setSessionCookie } from "@/lib/shared-constants";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

/**
 * Admin login — creates a session for any email without magic link.
 * POST /api/admin/login { email, secret } → sets session cookie, returns redirect URL
 * Also supports GET for backwards compat but reads secret from header.
 */
export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = await rateLimit(`admin-login:${ip}`, 5, 3600);
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many attempts" }, { status: 429, headers: { "Retry-After": String(rl.resetIn) } });
  }

  const { email, secret } = await req.json();

  if (!verifyAdmin(secret) || !email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sessionId = await createSession(email);
  const response = NextResponse.json({ ok: true, redirect: "/my-trips" });
  setSessionCookie(response, sessionId);
  return response;
}

export async function GET(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = await rateLimit(`admin-login:${ip}`, 5, 3600);
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many attempts" }, { status: 429, headers: { "Retry-After": String(rl.resetIn) } });
  }

  const email = req.nextUrl.searchParams.get("email");
  const secret = req.headers.get("x-admin-secret");

  if (!verifyAdmin(secret) || !email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sessionId = await createSession(email);
  const response = NextResponse.redirect(new URL("/my-trips", req.url));
  setSessionCookie(response, sessionId);
  return response;
}
