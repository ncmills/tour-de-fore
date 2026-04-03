import { NextResponse } from "next/server";
import { getSessionEmail } from "@/lib/auth";
import { getRedis } from "@/lib/redis";

const UNLIMITED_EMAILS = ["nicholauscmills@gmail.com", "matt@sixtenmgmt.com"];
const WEEKLY_PLAN_LIMIT = 3;

function getWeekKey(): string {
  const d = new Date();
  const jan1 = new Date(d.getFullYear(), 0, 1);
  const days = Math.floor((d.getTime() - jan1.getTime()) / 86400000);
  const week = Math.ceil((days + jan1.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${String(week).padStart(2, "0")}`;
}

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
