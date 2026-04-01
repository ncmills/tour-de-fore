import { NextRequest, NextResponse } from "next/server";
import { getSessionEmail } from "@/lib/auth";
import { getPlan } from "@/lib/kv";
import Redis from "ioredis";

let redis: Redis;
function getRedis() {
  if (!redis) redis = new Redis(process.env.REDIS_URL!);
  return redis;
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const email = await getSessionEmail();
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const plan = await getPlan(id);
  if (!plan) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }

  if (plan.inputs?.organizerEmail !== email) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const r = getRedis();
  await Promise.all([
    r.del(`plan:${id}`),
    r.del(`plan:${id}:attendees`),
    r.del(`plan:${id}:emailed`),
    r.srem(`user:${email}:plans`, id),
  ]);

  return NextResponse.json({ ok: true });
}
