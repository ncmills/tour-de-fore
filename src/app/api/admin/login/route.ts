import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/auth";
import { verifyAdmin, setSessionCookie } from "@/lib/shared-constants";

/**
 * Admin login — creates a session for any email without magic link.
 * GET /api/admin/login?email=X&secret=Y → sets session cookie, redirects to /my-trips
 */
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  const secret = req.nextUrl.searchParams.get("secret");

  if (!verifyAdmin(secret) || !email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sessionId = await createSession(email);
  const response = NextResponse.redirect(new URL("/my-trips", req.url));
  setSessionCookie(response, sessionId);
  return response;
}
