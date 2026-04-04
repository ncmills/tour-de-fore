import { NextResponse } from "next/server";
import { getSessionEmail } from "@/lib/auth";
import { getRedis } from "@/lib/redis";
import { UNLIMITED_EMAILS, getWeekKey } from "@/lib/shared-constants";

const WEEKLY_PLAN_LIMIT = 3;

export async function GET() {
  try {
    const email = await getSessionEmail();
    if (!email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const unlimited = UNLIMITED_EMAILS.includes(email);
    const weekKey = getWeekKey();
    const countRaw = await getRedis().get(`user:${email}:plans:${weekKey}`);
    const plansUsed = countRaw ? parseInt(countRaw) : 0;
    const canPlan = unlimited || plansUsed < WEEKLY_PLAN_LIMIT;

    return NextResponse.json({
      canPlan,
      plansUsed,
      plansLimit: WEEKLY_PLAN_LIMIT,
      unlimited,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch status" }, { status: 500 });
  }
}
