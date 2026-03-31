import { NextRequest, NextResponse } from "next/server";
import { verifyMagicToken, createSession, getWizardStateForToken, setUserName, addPlanToUser, canGenerateFreePlan, recordFreePlanGeneration } from "@/lib/auth";
import { WizardState } from "@/lib/plan-types";
import { storePlan } from "@/lib/kv";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/?skip=1", req.url));
  }

  // Grab wizard state BEFORE verifying (which deletes the token)
  const wizardState = await getWizardStateForToken(token);

  const email = await verifyMagicToken(token);
  if (!email) {
    // Token expired or invalid — redirect to planner with expired flag
    return NextResponse.redirect(new URL("/plan-a-trip?auth=expired", req.url));
  }

  // Create session
  const sessionId = await createSession(email);

  let redirectUrl = "/my-trips";

  // If wizard state exists, generate the plan
  if (wizardState) {
    try {
      const state = wizardState as WizardState;

      // Save user name
      if (state.organizerName) {
        await setUserName(email, state.organizerName);
      }

      // Check free plan limit
      const canGenerate = await canGenerateFreePlan(email);
      if (!canGenerate) {
        redirectUrl = "/plan-a-trip?error=limit";
      } else {
        // Generate plan via internal API call
        const origin = `https://${req.headers.get("host") || "tourdefore.com"}`;
        const generateRes = await fetch(`${origin}/api/generate-plan`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cookie": `tdf-session=${sessionId}`,
          },
          body: JSON.stringify(state),
        });

        if (generateRes.ok) {
          const data = await generateRes.json();
          redirectUrl = `/plan/result/${data.planId}`;
        } else {
          // Plan generation failed — redirect to planner
          redirectUrl = "/plan-a-trip?error=generate";
        }
      }
    } catch (err) {
      console.error("Auto-generate failed:", err);
      redirectUrl = "/plan-a-trip?error=generate";
    }
  }

  const response = NextResponse.redirect(new URL(redirectUrl, req.url));
  response.cookies.set("tdf-session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  return response;
}
