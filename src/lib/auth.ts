import { cookies } from "next/headers";
import { hash as bcryptHash, compare as bcryptCompare } from "bcryptjs";
import { getRedis } from "./redis";

const SESSION_TTL = 60 * 60 * 24 * 30; // 30 days
const TOKEN_TTL = 60 * 15; // 15 min for magic link

export async function createMagicToken(email: string, wizardState?: unknown): Promise<string> {
  const token = crypto.randomUUID();
  const r = getRedis();
  const pipe = r.pipeline();
  pipe.set(`magic:${token}`, email, "EX", TOKEN_TTL);
  if (wizardState) {
    pipe.set(`magic:${token}:wizard`, JSON.stringify(wizardState), "EX", TOKEN_TTL);
  }
  await pipe.exec();
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
  const pipe = r.pipeline();
  pipe.sadd(key, planId);
  pipe.expire(key, SESSION_TTL * 12); // 1 year
  await pipe.exec();
}

export async function getUserPlans(email: string): Promise<string[]> {
  return await getRedis().smembers(`user:${email}:plans`);
}

// Past trip attendance: store which TDF years a user attended
export async function setUserPastTrips(email: string, years: number[]): Promise<void> {
  const r = getRedis();
  const key = `user:${email}:attended`;
  const pipe = r.pipeline();
  pipe.del(key);
  if (years.length > 0) {
    pipe.sadd(key, ...years.map(String));
    pipe.expire(key, SESSION_TTL * 12);
  }
  await pipe.exec();
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
  const pipe = r.pipeline();
  pipe.incr(key);
  pipe.expire(key, 60 * 60 * 24 * 35); // ~35 days
  await pipe.exec();
}

export function getMonthKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export async function getFreePlanCount(email: string): Promise<number> {
  const count = await getRedis().get(`user:${email}:freeplans:${getMonthKey()}`);
  return count ? parseInt(count) : 0;
}

// ── Change Email ──

export async function changeUserEmail(oldEmail: string, newEmail: string): Promise<void> {
  const r = getRedis();
  const monthKey = getMonthKey();

  // Bulk read all old user data in one pipeline
  const readPipe = r.pipeline();
  readPipe.get(`user:${oldEmail}:name`);
  readPipe.get(`user:${oldEmail}:password`);
  readPipe.smembers(`user:${oldEmail}:plans`);
  readPipe.get(`user:${oldEmail}:sub`);
  readPipe.ttl(`user:${oldEmail}:sub`);
  readPipe.smembers(`user:${oldEmail}:attended`);
  readPipe.get(`user:${oldEmail}:freeplans:${monthKey}`);
  readPipe.ttl(`user:${oldEmail}:freeplans:${monthKey}`);
  const results = await readPipe.exec();
  if (!results) return;

  const name = results[0]?.[1] as string | null;
  const passwordHash = results[1]?.[1] as string | null;
  const plans = results[2]?.[1] as string[] | null;
  const sub = results[3]?.[1] as string | null;
  const subTtl = results[4]?.[1] as number;
  const attended = results[5]?.[1] as string[] | null;
  const freePlanCount = results[6]?.[1] as string | null;
  const freeplanTtl = results[7]?.[1] as number;

  // Bulk write all migrations in one pipeline
  const writePipe = r.pipeline();

  if (name) {
    writePipe.set(`user:${newEmail}:name`, name, "EX", PROFILE_TTL);
    writePipe.del(`user:${oldEmail}:name`);
  }
  if (passwordHash) {
    writePipe.set(`user:${newEmail}:password`, passwordHash, "EX", PROFILE_TTL);
    writePipe.del(`user:${oldEmail}:password`);
  }
  if (plans && plans.length > 0) {
    writePipe.sadd(`user:${newEmail}:plans`, ...plans);
    writePipe.expire(`user:${newEmail}:plans`, SESSION_TTL * 12);
    writePipe.del(`user:${oldEmail}:plans`);
  }
  if (sub) {
    writePipe.set(`user:${newEmail}:sub`, sub, "EX", subTtl > 0 ? subTtl : PROFILE_TTL);
    writePipe.del(`user:${oldEmail}:sub`);
  }
  if (attended && attended.length > 0) {
    writePipe.sadd(`user:${newEmail}:attended`, ...attended);
    writePipe.expire(`user:${newEmail}:attended`, SESSION_TTL * 12);
    writePipe.del(`user:${oldEmail}:attended`);
  }
  if (freePlanCount) {
    writePipe.set(`user:${newEmail}:freeplans:${monthKey}`, freePlanCount, "EX", freeplanTtl > 0 ? freeplanTtl : 60 * 60 * 24 * 35);
    writePipe.del(`user:${oldEmail}:freeplans:${monthKey}`);
  }

  // Delete old email_verified (don't migrate — new email needs its own verification)
  writePipe.del(`user:${oldEmail}:email_verified`);

  await writePipe.exec();
}

// ── Password Auth ──

const PROFILE_TTL = 60 * 60 * 24 * 365; // 1 year

export async function setPassword(email: string, password: string): Promise<void> {
  const hashed = await bcryptHash(password, 10);
  await getRedis().set(`user:${email}:password`, hashed, "EX", PROFILE_TTL);
}

export async function verifyPassword(email: string, password: string): Promise<boolean> {
  const hash = await getRedis().get(`user:${email}:password`);
  if (!hash) return false;
  return bcryptCompare(password, hash);
}

export async function hasPassword(email: string): Promise<boolean> {
  return !!(await getRedis().get(`user:${email}:password`));
}

export async function setEmailVerified(email: string): Promise<void> {
  await getRedis().set(`user:${email}:email_verified`, "1", "EX", PROFILE_TTL);
}

export async function isEmailVerified(email: string): Promise<boolean> {
  return (await getRedis().get(`user:${email}:email_verified`)) === "1";
}
