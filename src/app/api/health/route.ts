import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const checks: Record<string, string> = {};

  // Redis
  try {
    await getRedis().ping();
    checks.redis = "ok";
  } catch (e) {
    checks.redis = `fail: ${e instanceof Error ? e.message : String(e)}`;
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

  const allOk = Object.values(checks).every((v) => v === "ok" || v === "set");
  return NextResponse.json({ status: allOk ? "healthy" : "degraded", checks });
}
