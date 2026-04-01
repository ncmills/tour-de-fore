import { getRedis } from "./redis";

/**
 * Simple sliding-window rate limiter using Redis.
 * Returns { allowed, remaining, resetIn }
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number; resetIn: number }> {
  const r = getRedis();
  const now = Math.floor(Date.now() / 1000);
  const windowKey = `rl:${key}:${Math.floor(now / windowSeconds)}`;

  const current = await r.incr(windowKey);
  if (current === 1) {
    await r.expire(windowKey, windowSeconds);
  }

  const remaining = Math.max(limit - current, 0);
  const resetIn = windowSeconds - (now % windowSeconds);

  return {
    allowed: current <= limit,
    remaining,
    resetIn,
  };
}

/**
 * Get client IP from request headers (works behind Vercel/Cloudflare).
 * Prefer Vercel's trusted header over spoofable x-forwarded-for.
 */
export function getClientIp(req: Request): string {
  return (
    req.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}
