// SWEEP-1413: /api/health must never call the model. No new deps: transpiles
// the route with the repo's own TypeScript and stubs its imports.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);
const src = readFileSync(new URL("../src/app/api/health/route.ts", import.meta.url), "utf8");
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;

let createCalls = 0;
const redis = { set: async () => "OK", del: async () => 1 };
const stubs = {
  "next/server": { NextResponse: { json: (body, init) => ({ status: init?.status ?? 200, body }) } },
  "@/lib/redis": { getRedis: () => redis },
  "@/lib/anthropic": {
    getAnthropicClient: () => ({ messages: { create: async () => { createCalls++; return {}; } } }),
    getAnthropicHealthClient: () => ({ messages: { create: async () => { createCalls++; return { model: "m", usage: {} }; } } }),
  },
  "@anthropic-ai/sdk": { default: class { messages = { create: async () => { createCalls++; return {}; } }; } },
};
const mod = { exports: {} };
new Function("exports", "require", "module", js)(mod.exports, (id) => {
  if (id in stubs) return stubs[id];
  throw new Error(`unstubbed import ${id}`);
}, mod);
const { GET } = mod.exports;
const req = (secret) => ({ headers: { get: (k) => (k === "x-admin-secret" ? secret : null) } });

test("with secret: 200, anthropicKey set, model never called", async () => {
  process.env.ADMIN_SECRET = "s";
  process.env.ANTHROPIC_API_KEY = "k";
  delete process.env.PRINTFUL_API_TOKEN;
  createCalls = 0;
  const res = await GET(req("s"));
  assert.equal(res.status, 200);
  assert.equal(res.body.checks.anthropicKey, "set");
  assert.equal(res.body.status, "healthy");
  assert.equal("anthropicApi" in res.body.checks, false);
  assert.equal(createCalls, 0);
});

test("without secret: 401", async () => {
  process.env.ADMIN_SECRET = "s";
  const res = await GET(req(null));
  assert.equal(res.status, 401);
});
