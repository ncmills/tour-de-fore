import { StoredPlan, Attendee, WizardState } from "./plan-types";
import { getRedis } from "./redis";
import { supabase } from "./supabase";

const SITE = "tdf";

const PLAN_TTL = 60 * 60 * 24 * 21; // 21 days
// Learning signals are aggregate popularity/view counts — recent data carries
// the signal, and stale rows just bloat the shared 30MB Redis. Cap at ~30 days.
const SIGNAL_TTL = 60 * 60 * 24 * 30; // 30 days for learning signals

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

// Orders are real purchase records — keep them around long enough for
// fulfillment lookups, support, and refund windows, but still bound them so
// they don't accumulate forever in the shared 30MB Redis. ~180 days.
const ORDER_TTL = 60 * 60 * 24 * 180; // 180 days

// Extract a top-level integer amount-in-cents from an order object if present.
// ShopOrder doesn't carry one today, but future/back-filled rows may include
// `amountCents` / `amount_cents`; we persist it to the dedicated Supabase column.
function extractAmountCents(order: ShopOrder): number | null {
  const o = order as unknown as Record<string, unknown>;
  const v = o.amountCents ?? o.amount_cents ?? o.amount_total ?? null;
  return typeof v === "number" && Number.isFinite(v) ? Math.round(v) : null;
}

function extractCurrency(order: ShopOrder): string | null {
  const o = order as unknown as Record<string, unknown>;
  const v = o.currency;
  return typeof v === "string" && v ? v : null;
}

// Mirror a single order into Supabase. Idempotent upsert keyed on (id).
// Non-fatal: Supabase is the durable store but Redis remains a live write path,
// so a Supabase blip must never break fulfillment. Logs and swallows errors.
export async function upsertOrderToSupabase(order: ShopOrder): Promise<void> {
  if (!supabase) return;
  try {
    const { error } = await supabase.from("orders").upsert(
      {
        id: order.id,
        site: SITE,
        email: order.email || null,
        status: order.status || null,
        amount_cents: extractAmountCents(order),
        currency: extractCurrency(order),
        data: order,
      },
      { onConflict: "id" }
    );
    if (error) console.error("[supabase orders upsert]", error.message);
  } catch (err) {
    console.error("[supabase orders upsert]", err instanceof Error ? err.message : String(err));
  }
}

export async function storeOrder(order: ShopOrder): Promise<void> {
  // Durable source of truth first (idempotent upsert), then keep the Redis
  // dual-write so the fast path / fallback stays warm and nothing breaks.
  await upsertOrderToSupabase(order);

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
  // Read Supabase FIRST (durable source of truth); fall back to Redis on miss
  // so in-flight orders not yet mirrored, or a Supabase blip, still resolve.
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("data")
        .eq("site", SITE)
        .eq("id", id)
        .maybeSingle();
      if (!error && data?.data) return data.data as ShopOrder;
    } catch (err) {
      console.error("[supabase getOrder]", err instanceof Error ? err.message : String(err));
    }
  }

  const raw = await getRedis().get(`order:${id}`);
  if (!raw) return null;
  return JSON.parse(raw);
}

/**
 * All orders for a user, newest first. Reads Supabase FIRST (durable source of
 * truth), falling back to the Redis `user:<email>:orders` set on miss/error so
 * nothing breaks if Supabase is unavailable or an order isn't mirrored yet.
 */
export async function getUserOrders(email: string): Promise<ShopOrder[]> {
  if (!email) return [];

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("data, created_at")
        .eq("site", SITE)
        .eq("email", email)
        .order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        return data.map((row) => row.data as ShopOrder);
      }
    } catch (err) {
      console.error("[supabase getUserOrders]", err instanceof Error ? err.message : String(err));
    }
  }

  // Redis fallback: resolve the id set, then fetch each order JSON.
  const r = getRedis();
  const ids = await r.smembers(`user:${email}:orders`);
  if (ids.length === 0) return [];
  const pipe = r.pipeline();
  for (const id of ids) pipe.get(`order:${id}`);
  const results = await pipe.exec();
  if (!results) return [];
  const orders: ShopOrder[] = [];
  for (const [, raw] of results) {
    if (typeof raw === "string") {
      try {
        orders.push(JSON.parse(raw) as ShopOrder);
      } catch {
        /* skip corrupt entry */
      }
    }
  }
  return orders.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
}
