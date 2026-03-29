import { NextRequest, NextResponse } from "next/server";
import { recordDestinationSelect } from "@/lib/kv";

export async function POST(req: NextRequest) {
  try {
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
