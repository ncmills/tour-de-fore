import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function POST(req: NextRequest) {
  // Invalidate session in Redis before clearing cookie
  const sessionId = req.cookies.get("tdf-session")?.value;
  if (sessionId) {
    await getRedis().del(`session:${sessionId}`);
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.delete("tdf-session");
  return response;
}
