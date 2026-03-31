import { NextRequest, NextResponse } from "next/server";
import { verifyMagicToken, createSession, getWizardStateForToken, storeWizardState, setUserName } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/?skip=1", req.url));
  }

  // Grab wizard state BEFORE verifying (which deletes the token)
  const wizardState = await getWizardStateForToken(token);

  const email = await verifyMagicToken(token);
  if (!email) {
    return NextResponse.redirect(new URL("/plan-a-trip?auth=expired", req.url));
  }

  // Create session
  const sessionId = await createSession(email);

  let redirectUrl = "/my-trips";

  // If wizard state exists, store it and redirect to auto-generate page
  if (wizardState) {
    const ws = wizardState as { organizerName?: string };
    if (ws.organizerName) {
      await setUserName(email, ws.organizerName);
    }
    const wizardId = await storeWizardState(email, wizardState);
    redirectUrl = `/plan/auto-generate?wid=${wizardId}`;
  }

  const response = NextResponse.redirect(new URL(redirectUrl, req.url));
  response.cookies.set("tdf-session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return response;
}
