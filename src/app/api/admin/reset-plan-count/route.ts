import { NextRequest, NextResponse } from "next/server";
import Redis from "ioredis";

let redis: Redis;
function getRedis() {
  if (!redis) redis = new Redis(process.env.REDIS_URL!);
  return redis;
}

export async function POST(req: NextRequest) {
  const { email, secret } = await req.json();
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const d = new Date();
  const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  const key = `user:${email}:freeplans:${monthKey}`;
  await getRedis().del(key);

  return NextResponse.json({ ok: true, deleted: key });
}
