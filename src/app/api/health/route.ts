import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const checks: Record<string, string> = {};

  // Redis — write-probe, not just PING. A full-memory instance still answers
  // PING but rejects writes (OOM), so a tiny SET (auto-expiring) + DEL is the
  // only way to detect that the cache can actually accept data.
  try {
    const r = getRedis();
    const probeKey = `health:probe:${Date.now()}`;
    const setRes = await r.set(probeKey, "1", "EX", 30);
    if (setRes !== "OK") throw new Error(`SET returned ${setRes ?? "null"}`);
    await r.del(probeKey);
    checks.redis = "ok";
  } catch (e) {
    checks.redis = `fail: ${e instanceof Error ? e.message : String(e)}`;
  }

  // Printful API
  if (process.env.PRINTFUL_API_TOKEN) {
    try {
      const res = await fetch("https://api.printful.com/store", {
        headers: { Authorization: `Bearer ${process.env.PRINTFUL_API_TOKEN.trim()}` },
        signal: AbortSignal.timeout(5000),
      });
      checks.printfulApi = res.ok ? "ok" : `fail: ${res.status}`;
    } catch (e) {
      checks.printfulApi = `fail: ${e instanceof Error ? e.message : String(e)}`;
    }
  } else {
    checks.printfulApi = "NOT_SET";
  }

  // Anthropic API key presence
  checks.anthropicKey = process.env.ANTHROPIC_API_KEY ? "set" : "MISSING";

  // Anthropic API quick test
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const { getAnthropicHealthClient } = await import("@/lib/anthropic");
      const client = getAnthropicHealthClient();
      const msg = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 5,
        messages: [{ role: "user", content: "Say ok" }],
      });
      checks.anthropicApi = "ok";
      checks.anthropicModel = msg.model;
      checks.anthropicTokens = `in:${msg.usage.input_tokens} out:${msg.usage.output_tokens}`;
    } catch (e) {
      checks.anthropicApi = `fail: ${e instanceof Error ? e.message : String(e)}`;
    }
  }

  const allOk = Object.values(checks).every((v) => v === "ok" || v === "set" || v === "NOT_SET");
  return NextResponse.json({ status: allOk ? "healthy" : "degraded", checks });
}
