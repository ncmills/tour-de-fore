import { NextResponse } from "next/server";
import { getSessionEmail, canGenerateFreePlan, getFreePlanCount, isSubscribed } from "@/lib/auth";

const UNLIMITED_EMAILS = ["nicholauscmills@gmail.com", "matt@sixtenmgmt.com"];
const FREE_PLAN_LIMIT = 1;

export async function GET() {
  try {
    const email = await getSessionEmail();
    if (!email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const unlimited = UNLIMITED_EMAILS.includes(email);
    const plansUsed = await getFreePlanCount(email);
    const subscribed = await isSubscribed(email);
    const canPlan = unlimited || subscribed || (await canGenerateFreePlan(email));

    return NextResponse.json({
      canPlan,
      plansUsed,
      plansLimit: FREE_PLAN_LIMIT,
      unlimited,
      subscribed,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch status" }, { status: 500 });
  }
}
