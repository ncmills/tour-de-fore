import { cookies } from "next/headers";
import Redis from "ioredis";

const SESSION_TTL = 60 * 60 * 24 * 30; // 30 days
const TOKEN_TTL = 60 * 15; // 15 min for magic link

let redis: Redis;
function getRedis() {
  if (!redis) redis = new Redis(process.env.REDIS_URL!);
  return redis;
}

export async function createMagicToken(email: string, wizardState?: unknown): Promise<string> {
  const token = crypto.randomUUID();
  const r = getRedis();
  await r.set(`magic:${token}`, email, "EX", TOKEN_TTL);
  if (wizardState) {
    await r.set(`magic:${token}:wizard`, JSON.stringify(wizardState), "EX", TOKEN_TTL);
  }
  return token;
}

export async function getWizardStateForToken(token: string): Promise<unknown | null> {
  const raw = await getRedis().get(`magic:${token}:wizard`);
  if (!raw) return null;
  return JSON.parse(raw);
}

export async function verifyMagicToken(token: string): Promise<string | null> {
  const r = getRedis();
  const email = await r.get(`magic:${token}`);
  if (!email) return null;
  await r.del(`magic:${token}`); // one-time use
  return email;
}

export async function createSession(email: string): Promise<string> {
  const sessionId = crypto.randomUUID();
  await getRedis().set(`session:${sessionId}`, email, "EX", SESSION_TTL);
  return sessionId;
}

export async function getSessionEmail(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("tdf-session")?.value;
  if (!sessionId) return null;
  return await getRedis().get(`session:${sessionId}`);
}

// User profile: store plan IDs associated with an email
export async function addPlanToUser(email: string, planId: string): Promise<void> {
  const r = getRedis();
  const key = `user:${email}:plans`;
  await r.sadd(key, planId);
  await r.expire(key, SESSION_TTL * 12); // 1 year
}

export async function getUserPlans(email: string): Promise<string[]> {
  return await getRedis().smembers(`user:${email}:plans`);
}

// Past trip attendance: store which TDF years a user attended
export async function setUserPastTrips(email: string, years: number[]): Promise<void> {
  const r = getRedis();
  const key = `user:${email}:attended`;
  await r.del(key);
  if (years.length > 0) {
    await r.sadd(key, ...years.map(String));
    await r.expire(key, SESSION_TTL * 12);
  }
}

export async function getUserPastTrips(email: string): Promise<number[]> {
  const years = await getRedis().smembers(`user:${email}:attended`);
  return years.map(Number).sort((a, b) => b - a);
}

// User display name
export async function setUserName(email: string, name: string): Promise<void> {
  await getRedis().set(`user:${email}:name`, name, "EX", SESSION_TTL * 12);
}

export async function getUserName(email: string): Promise<string | null> {
  return await getRedis().get(`user:${email}:name`);
}

// ── Subscription ("Become a Devil") ──

export async function setSubscription(email: string, stripeSubId: string, expiresAt: Date): Promise<void> {
  const r = getRedis();
  const ttl = Math.max(Math.floor((expiresAt.getTime() - Date.now()) / 1000), 86400);
  await r.set(`user:${email}:sub`, JSON.stringify({ stripeSubId, expiresAt: expiresAt.toISOString() }), "EX", ttl);
}

export async function isSubscribed(email: string): Promise<boolean> {
  const raw = await getRedis().get(`user:${email}:sub`);
  if (!raw) return false;
  const sub = JSON.parse(raw);
  return new Date(sub.expiresAt) > new Date();
}

export async function cancelSubscription(email: string): Promise<void> {
  await getRedis().del(`user:${email}:sub`);
}

// ── Free plan rate limiting (1 per month) ──

export async function canGenerateFreePlan(email: string): Promise<boolean> {
  const count = await getRedis().get(`user:${email}:freeplans:${getMonthKey()}`);
  return !count || parseInt(count) < 1;
}

export async function recordFreePlanGeneration(email: string): Promise<void> {
  const r = getRedis();
  const key = `user:${email}:freeplans:${getMonthKey()}`;
  await r.incr(key);
  await r.expire(key, 60 * 60 * 24 * 35); // ~35 days
}

function getMonthKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
