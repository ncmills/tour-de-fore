import Redis from "ioredis";
import { StoredPlan, Attendee, WizardState } from "./plan-types";

const PLAN_TTL = 60 * 60 * 24 * 90; // 90 days
const SIGNAL_TTL = 60 * 60 * 24 * 365; // 1 year for learning signals

let redis: Redis;

function getRedis() {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL!);
  }
  return redis;
}

// ── Plan storage ──

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
  const result = await getRedis().set(
    `plan:${planId}:emailed`,
    "1",
    "EX",
    PLAN_TTL,
    "NX"
  );
  return result === "OK";
}

// ── Learning engine signals ──
// Track user interactions to improve recommendations over time

/**
 * Record when a destination is shown to a user (impression)
 */
export async function recordDestinationView(
  destinationId: string,
  inputs: WizardState
): Promise<void> {
  const r = getRedis();
  const key = `signal:views:${destinationId}`;
  await r.hincrby(key, "total", 1);
  if (inputs.region) {
    await r.hincrby(key, `region:${inputs.region}`, 1);
  }
  if (inputs.budget) {
    await r.hincrby(key, `budget:${inputs.budget}`, 1);
  }
  await r.expire(key, SIGNAL_TTL);
}

/**
 * Record when a user clicks into a specific destination (selection)
 */
export async function recordDestinationSelect(
  destinationId: string,
  tier: string
): Promise<void> {
  const r = getRedis();
  const key = `signal:selects:${destinationId}`;
  await r.hincrby(key, "total", 1);
  await r.hincrby(key, `tier:${tier}`, 1);
  await r.expire(key, SIGNAL_TTL);
}

/**
 * Get popularity score for a destination (selects / views ratio)
 * Returns 0-1 score, higher = users choose this more when shown
 */
export async function getDestinationPopularity(
  destinationId: string
): Promise<number> {
  const r = getRedis();
  const views = parseInt(await r.hget(`signal:views:${destinationId}`, "total") || "0");
  const selects = parseInt(await r.hget(`signal:selects:${destinationId}`, "total") || "0");
  if (views === 0) return 0;
  return selects / views;
}

/**
 * Get popularity scores for all destinations that have signals
 */
export async function getAllPopularityScores(): Promise<Map<string, number>> {
  const r = getRedis();
  const scores = new Map<string, number>();

  // Scan for all view keys
  let cursor = "0";
  do {
    const [nextCursor, keys] = await r.scan(cursor, "MATCH", "signal:views:*", "COUNT", 100);
    cursor = nextCursor;

    for (const key of keys) {
      const destId = key.replace("signal:views:", "");
      const views = parseInt(await r.hget(key, "total") || "0");
      const selects = parseInt(await r.hget(`signal:selects:${destId}`, "total") || "0");
      if (views > 0) {
        scores.set(destId, selects / views);
      }
    }
  } while (cursor !== "0");

  return scores;
}
