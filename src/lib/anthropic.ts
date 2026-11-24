import Anthropic from "@anthropic-ai/sdk";

let _client: Anthropic | null = null;

/** Shared Anthropic client with 4-min timeout (for streaming plan generation) */
export function getAnthropicClient(): Anthropic {
  return (_client ??= new Anthropic({ timeout: 240_000 }));
}
