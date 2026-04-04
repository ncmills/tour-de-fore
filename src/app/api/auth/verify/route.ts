import { NextRequest, NextResponse } from "next/server";
import { verifyMagicToken, createSession, setEmailVerified, hasPassword } from "@/lib/auth";
import { setSessionCookie } from "@/lib/shared-constants";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/?skip=1", req.url));
  }

  const email = await verifyMagicToken(token);
  if (!email) {
    return NextResponse.redirect(new URL("/plan-a-trip?auth=expired", req.url));
  }

  const sessionId = await createSession(email);
  await setEmailVerified(email);

  const returnTo = req.nextUrl.searchParams.get("returnTo");
  const hasPw = await hasPassword(email);

  let redirectUrl: string;
  if (!hasPw) {
    // New user or password reset — send to set password page
    const setPasswordReturn = returnTo || "/my-trips";
    redirectUrl = `/set-password?returnTo=${encodeURIComponent(setPasswordReturn)}`;
  } else {
    redirectUrl = returnTo && returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/my-trips";
  }

  const response = NextResponse.redirect(new URL(redirectUrl, req.url));
  setSessionCookie(response, sessionId, "lax");
  return response;
}
