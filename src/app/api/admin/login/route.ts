import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/auth";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "tdf-admin-2026";

/**
 * Admin login — creates a session for any email without magic link.
 * GET /api/admin/login?email=X&secret=Y → sets session cookie, redirects to /my-trips
 */
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== ADMIN_SECRET || !email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sessionId = await createSession(email);

  const response = NextResponse.redirect(new URL("/my-trips", req.url));
  response.cookies.set("tdf-session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return response;
}
