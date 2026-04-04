import { NextRequest, NextResponse } from "next/server";
import { recordDestinationSelect } from "@/lib/kv";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    // Generous limit — just prevents bot abuse, won't affect real users
    const ip = getClientIp(req);
    const rl = await rateLimit(`track:${ip}`, 30, 3600);
    if (!rl.allowed) {
      return NextResponse.json({ ok: true }); // silent drop, don't reveal rate limiting
    }

    const { destinationId, tier } = await req.json();
    if (!destinationId) {
      return NextResponse.json({ error: "Missing destinationId" }, { status: 400 });
    }
    await recordDestinationSelect(destinationId, tier || "unknown");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to track" }, { status: 500 });
  }
}
