import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { verifyAdmin } from "@/lib/shared-constants";

export async function POST(req: NextRequest) {
  const { email, secret } = await req.json();
  if (!verifyAdmin(secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const d = new Date();
  const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  const key = `user:${email}:freeplans:${monthKey}`;
  await getRedis().del(key);

  return NextResponse.json({ ok: true, deleted: key });
}
