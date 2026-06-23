#!/usr/bin/env tsx
/**
 * One-time (re-runnable) backfill of Tour de Fore ORDERS and ACCOUNTS from
 * Redis into the shared Supabase project. Idempotent upserts — safe to run
 * repeatedly, never produces duplicates. Every row is stamped site='tdf'.
 *
 * Reads live Redis (REDIS_URL) and writes Supabase via the service-role key.
 * Does NOT mutate or delete any Redis data — purely additive.
 *
 * Run (loads .env.local for creds):
 *   set -a && source .env.local && set +a && npx tsx scripts/migrate-to-supabase.ts
 *
 * Flags:
 *   --orders-only     backfill orders only
 *   --accounts-only   backfill accounts only
 *   (default: both)
 */

import Redis from "ioredis";
import { createClient } from "@supabase/supabase-js";

const REDIS_URL = process.env.REDIS_URL;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
const SITE = "tdf";

if (!REDIS_URL) throw new Error("REDIS_URL not set");
if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error("Supabase creds not set");

const redis = new Redis(REDIS_URL, {
  ...(REDIS_URL.startsWith("rediss://") ? { tls: { rejectUnauthorized: false } } : {}),
  maxRetriesPerRequest: 3,
});
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

const args = process.argv.slice(2);
const ordersOnly = args.includes("--orders-only");
const accountsOnly = args.includes("--accounts-only");

async function scanKeys(pattern: string): Promise<string[]> {
  const keys: string[] = [];
  let cursor = "0";
  do {
    const [next, batch] = await redis.scan(cursor, "MATCH", pattern, "COUNT", 200);
    cursor = next;
    keys.push(...batch);
  } while (cursor !== "0");
  return keys;
}

function extractAmountCents(o: Record<string, unknown>): number | null {
  const v = o.amountCents ?? o.amount_cents ?? o.amount_total ?? null;
  return typeof v === "number" && Number.isFinite(v) ? Math.round(v) : null;
}
function extractCurrency(o: Record<string, unknown>): string | null {
  const v = o.currency;
  return typeof v === "string" && v ? v : null;
}

async function migrateOrders(): Promise<number> {
  // Bare TDF order keys only: `order:<id>` (exclude any `order:*:*` sub-keys).
  const all = await scanKeys("order:*");
  const orderKeys = all.filter((k) => k.split(":").length === 2);
  console.log(`[orders] found ${orderKeys.length} order:* keys in Redis`);

  let migrated = 0;
  const rows: Record<string, unknown>[] = [];
  for (const key of orderKeys) {
    const raw = await redis.get(key);
    if (!raw) continue;
    let order: Record<string, unknown>;
    try {
      order = JSON.parse(raw);
    } catch {
      console.warn(`[orders] skip unparseable ${key}`);
      continue;
    }
    const id = (order.id as string) || key.slice("order:".length);
    rows.push({
      id,
      site: SITE,
      email: (order.email as string) || null,
      status: (order.status as string) || null,
      amount_cents: extractAmountCents(order),
      currency: extractCurrency(order),
      data: order,
    });
  }

  if (rows.length > 0) {
    const { error } = await supabase.from("orders").upsert(rows, { onConflict: "id" });
    if (error) throw new Error(`orders upsert failed: ${error.message}`);
    migrated = rows.length;
  }
  console.log(`[orders] upserted ${migrated} rows into Supabase`);
  return migrated;
}

async function migrateAccounts(): Promise<number> {
  // Distinct emails = users that have a password key.
  const pwKeys = await scanKeys("user:*:password");
  console.log(`[accounts] found ${pwKeys.length} user:*:password keys in Redis`);

  const rows: Record<string, unknown>[] = [];
  for (const pwKey of pwKeys) {
    // key form: user:<email>:password  — email may itself contain ':' is not
    // expected, but reconstruct safely by stripping the known prefix/suffix.
    const email = pwKey.slice("user:".length, pwKey.length - ":password".length);
    const pipe = redis.pipeline();
    pipe.get(`user:${email}:name`);
    pipe.get(`user:${email}:password`);
    pipe.smembers(`user:${email}:plans`);
    pipe.smembers(`user:${email}:attended`);
    const res = await pipe.exec();
    if (!res) continue;
    const name = (res[0]?.[1] as string | null) ?? null;
    const passwordHash = (res[1]?.[1] as string | null) ?? null;
    const plans = (res[2]?.[1] as string[] | null) ?? [];
    const attended = (res[3]?.[1] as string[] | null) ?? [];
    rows.push({
      site: SITE,
      email,
      name,
      password_hash: passwordHash,
      data: { plans, attended },
    });
  }

  let migrated = 0;
  if (rows.length > 0) {
    const { error } = await supabase
      .from("accounts")
      .upsert(rows, { onConflict: "site,email" });
    if (error) throw new Error(`accounts upsert failed: ${error.message}`);
    migrated = rows.length;
  }
  console.log(`[accounts] upserted ${migrated} rows into Supabase`);
  return migrated;
}

async function main() {
  if (!accountsOnly) {
    const n = await migrateOrders();
    const { count } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("site", SITE);
    console.log(`[orders] Supabase now holds ${count} tdf orders (migrated this run: ${n})`);
  }
  if (!ordersOnly) {
    const n = await migrateAccounts();
    const { count } = await supabase
      .from("accounts")
      .select("*", { count: "exact", head: true })
      .eq("site", SITE);
    console.log(`[accounts] Supabase now holds ${count} tdf accounts (migrated this run: ${n})`);
  }
  await redis.quit();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
