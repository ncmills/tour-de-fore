import Redis from "ioredis";

let redis: Redis;

export function getRedis(): Redis {
  if (!redis) {
    const url = process.env.REDIS_URL!;
    redis = new Redis(url, {
      ...(url.startsWith("rediss://") ? { tls: { rejectUnauthorized: false } } : {}),
      maxRetriesPerRequest: 3,
    });
    redis.on("error", (err) => {
      console.error("[Redis]", err.message);
    });
  }
  return redis;
}
