import { NextResponse } from "next/server";
import { getSessionEmail } from "@/lib/auth";
import { getRedis } from "@/lib/redis";
import { UNLIMITED_EMAILS, getMonthKey, getNextMonthReset } from "@/lib/shared-constants";
import { isSubscribed } from "@/lib/auth";

const MONTHLY_PLAN_LIMIT = 3;

export async function GET() {
  try {
    const email = await getSessionEmail();
    if (!email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const unlimited = UNLIMITED_EMAILS.includes(email);
    const subscribed = !unlimited && await isSubscribed(email);
    const monthKey = getMonthKey();
    const countRaw = await getRedis().get(`user:${email}:plans:${monthKey}`);
    const plansUsed = countRaw ? parseInt(countRaw) : 0;
    const canPlan = unlimited || subscribed || plansUsed < MONTHLY_PLAN_LIMIT;

    return NextResponse.json({
      canPlan,
      plansUsed,
      plansLimit: MONTHLY_PLAN_LIMIT,
      unlimited,
      subscribed,
      resetsAt: getNextMonthReset(),
    }, {
      headers: { "Cache-Control": "private, max-age=60" },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch status" }, { status: 500 });
  }
}
