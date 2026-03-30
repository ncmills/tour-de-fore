import Redis from "ioredis";

let redis: Redis;
function getRedis() {
  if (!redis) redis = new Redis(process.env.REDIS_URL!);
  return redis;
}

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
 * Get client IP from request headers (works behind Vercel/Cloudflare)
 */
export function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}
