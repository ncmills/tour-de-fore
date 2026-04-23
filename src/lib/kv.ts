import { StoredPlan, Attendee, WizardState } from "./plan-types";
import { getRedis } from "./redis";

const PLAN_TTL = 60 * 60 * 24 * 21; // 21 days
const SIGNAL_TTL = 60 * 60 * 24 * 365; // 1 year for learning signals

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
  const pipe = r.pipeline();
  pipe.hincrby(key, "total", 1);
  if (inputs.region) {
    pipe.hincrby(key, `region:${inputs.region}`, 1);
  }
  if (inputs.budget) {
    pipe.hincrby(key, `budget:${inputs.budget}`, 1);
  }
  pipe.expire(key, SIGNAL_TTL);
  await pipe.exec();
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
  const pipe = r.pipeline();
  pipe.hincrby(key, "total", 1);
  pipe.hincrby(key, `tier:${tier}`, 1);
  pipe.expire(key, SIGNAL_TTL);
  await pipe.exec();
}

/**
 * Get popularity scores and view counts for all destinations that have signals.
 * Uses a cached sorted set (popularity:cache) rebuilt every 5 minutes to avoid
 * expensive SCAN on every plan generation request.
 */
export async function getAllPopularityScores(): Promise<{ scores: Map<string, number>; viewCounts: Map<string, number> }> {
  const r = getRedis();
  const scores = new Map<string, number>();
  const viewCounts = new Map<string, number>();

  const CACHE_KEY = "popularity:cache";
  const CACHE_TTL = 300; // 5 min

  // Try cached version first
  const cached = await r.get(CACHE_KEY);
  if (cached) {
    const parsed: { destId: string; score: number; views: number }[] = JSON.parse(cached);
    for (const entry of parsed) {
      scores.set(entry.destId, entry.score);
      viewCounts.set(entry.destId, entry.views);
    }
    return { scores, viewCounts };
  }

  // Cache miss — rebuild from SCAN (runs at most once every 5 min)
  const allKeys: string[] = [];
  let cursor = "0";
  do {
    const [nextCursor, keys] = await r.scan(cursor, "MATCH", "signal:views:*", "COUNT", 100);
    cursor = nextCursor;
    allKeys.push(...keys);
  } while (cursor !== "0");

  if (allKeys.length === 0) return { scores, viewCounts };

  // Batch all hget calls in a single pipeline
  const pipe = r.pipeline();
  for (const key of allKeys) {
    const destId = key.replace("signal:views:", "");
    pipe.hget(key, "total");
    pipe.hget(`signal:selects:${destId}`, "total");
  }
  const results = await pipe.exec();
  if (!results) return { scores, viewCounts };

  const cacheEntries: { destId: string; score: number; views: number }[] = [];
  for (let i = 0; i < allKeys.length; i++) {
    const destId = allKeys[i].replace("signal:views:", "");
    const views = parseInt((results[i * 2]?.[1] as string) || "0");
    const selects = parseInt((results[i * 2 + 1]?.[1] as string) || "0");
    if (views > 0) {
      const score = selects / views;
      scores.set(destId, score);
      viewCounts.set(destId, views);
      cacheEntries.push({ destId, score, views });
    }
  }

  // Cache the results (non-blocking)
  r.set(CACHE_KEY, JSON.stringify(cacheEntries), "EX", CACHE_TTL).catch(() => {});

  return { scores, viewCounts };
}

// ── Shop Orders ──

export interface ShopOrder {
  id: string;
  email: string;
  items: { productId: string; color: string; size?: string; quantity: number }[];
  stripeSessionId: string;
  printfulOrderId: number | null;
  status: string;
  createdAt: string;
}

const ORDER_TTL = 60 * 60 * 24 * 365; // 1 year

export async function storeOrder(order: ShopOrder): Promise<void> {
  const r = getRedis();
  const pipe = r.pipeline();
  pipe.set(`order:${order.id}`, JSON.stringify(order), "EX", ORDER_TTL);
  if (order.email) {
    pipe.sadd(`user:${order.email}:orders`, order.id);
    pipe.expire(`user:${order.email}:orders`, ORDER_TTL);
  }
  await pipe.exec();
}

export async function getOrder(id: string): Promise<ShopOrder | null> {
  const raw = await getRedis().get(`order:${id}`);
  if (!raw) return null;
  return JSON.parse(raw);
}
