import Redis from "ioredis";
import { StoredPlan, Attendee } from "./plan-types";

const PLAN_TTL = 60 * 60 * 24 * 90; // 90 days

let redis: Redis;

function getRedis() {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL!);
  }
  return redis;
}

export async function storePlan(plan: StoredPlan): Promise<void> {
  await getRedis().set(`plan:${plan.id}`, JSON.stringify(plan), "EX", PLAN_TTL);
}

export async function getPlan(id: string): Promise<StoredPlan | null> {
  const raw = await getRedis().get(`plan:${id}`);
  if (!raw) return null;
  return JSON.parse(raw);
}

export async function storeAttendees(
  planId: string,
  attendees: Attendee[]
): Promise<void> {
  await getRedis().set(
    `plan:${planId}:attendees`,
    JSON.stringify(attendees),
    "EX",
    PLAN_TTL
  );
}

export async function getAttendees(planId: string): Promise<Attendee[]> {
  const raw = await getRedis().get(`plan:${planId}:attendees`);
  if (!raw) return [];
  return JSON.parse(raw);
}

export async function markEmailsSent(planId: string): Promise<boolean> {
  // SET NX = only set if not exists, returns "OK" if set, null if already exists
  const result = await getRedis().set(
    `plan:${planId}:emailed`,
    "1",
    "EX",
    PLAN_TTL,
    "NX"
  );
  return result === "OK";
}
