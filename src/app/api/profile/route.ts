import { NextRequest, NextResponse } from "next/server";
import { getSessionEmail, setUserName, setUserPastTrips } from "@/lib/auth";
import { UNLIMITED_EMAILS, getMonthKey, getNextMonthReset } from "@/lib/shared-constants";
import { getRedis } from "@/lib/redis";

const PLANS_PER_MONTH = 3;

// Session + plan-quota check. 200 { email, plansUsed, plansLimit, canPlan, unlimited }
// if logged in, 401 otherwise. Used by HomeClient, MyTripsClient, PlanFlowClient.
export async function GET() {
  const email = await getSessionEmail();
  if (!email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const unlimited = UNLIMITED_EMAILS.includes(email);
  const monthKey = getMonthKey();
  const countRaw = await getRedis().get(`user:${email}:plans:${monthKey}`);
  const plansUsed = countRaw ? parseInt(countRaw) : 0;

  return NextResponse.json({
    email,
    plansUsed,
    plansLimit: PLANS_PER_MONTH,
    plansRemaining: Math.max(0, PLANS_PER_MONTH - plansUsed),
    canPlan: unlimited || plansUsed < PLANS_PER_MONTH,
    unlimited,
    resetsAt: getNextMonthReset(),
  });
}

export async function POST(req: NextRequest) {
  try {
    const email = await getSessionEmail();
    if (!email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { name, attendedYears } = await req.json();

    if (name) {
      await setUserName(email, name);
    }
    if (attendedYears && Array.isArray(attendedYears)) {
      await setUserPastTrips(email, attendedYears);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
