import Anthropic from "@anthropic-ai/sdk";

let _client: Anthropic | null = null;
let _healthClient: Anthropic | null = null;

/** Shared Anthropic client with 4-min timeout (for streaming plan generation) */
export function getAnthropicClient(): Anthropic {
  return (_client ??= new Anthropic({ timeout: 240_000 }));
}

/** Short-timeout client for health checks */
export function getAnthropicHealthClient(): Anthropic {
  return (_healthClient ??= new Anthropic({ timeout: 30_000 }));
}
