// ── TDF voice wrap (deterministic, no LLM) ──
//
// The shared-data destination `tagline`/`description` are written in a neutral
// SEO/travel register and were reaching the user UNREWRITTEN on the free-plan
// selection cards (src/lib/free-plan.ts → PlanSelectionClient). The paid plan
// copy gets the TDF devil/dive-bar voice from the Claude prompt; the free
// preview has no LLM in the path, so we re-register the shared strings here
// deterministically instead of passing brochure copy straight through.
//
// This does NOT invent facts or venues — it only swaps a tight, curated set of
// corporate/travel-brochure clichés for the TDF register ("raunchy bachelor
// golf-trip", "dive-bar-after-dark", per docs/design-system.md). Replacements
// are grammar-safe: bare-word swaps stay consonant→consonant (so a preceding
// "a"/"an" never breaks), and article-bearing phrases carry their corrected
// article inside the match.

interface VoiceSub {
  re: RegExp;
  to: string;
}

// Order matters: article-bearing phrases first so their article is corrected
// before the bare-word rules could touch the noun.
const SUBS: VoiceSub[] = [
  { re: /\ban?\s+hidden gem\b/gi, to: "an under-the-radar gem" },
  { re: /\bhidden gem\b/gi, to: "under-the-radar gem" },
  { re: /\boff the beaten path\b/gi, to: "off the radar" },
  { re: /\bsomething for everyone\b/gi, to: "something for every degenerate" },
  { re: /\bworld[- ]class\b/gi, to: "world-beating" },
  { re: /\bpicturesque\b/gi, to: "stupid-good" },
  { re: /\bbreathtaking\b/gi, to: "stupid-good" },
  { re: /\bstunning\b/gi, to: "ridiculous" },
  { re: /\bnestled\b/gi, to: "tucked" },
  { re: /\bboasts\b/gi, to: "packs" },
  { re: /\bboast\b/gi, to: "pack" },
  { re: /\bpremier\b/gi, to: "top-shelf" },
  { re: /\bluxurious\b/gi, to: "top-shelf" },
  { re: /\bvibrant\b/gi, to: "rowdy" },
  { re: /\bbustling\b/gi, to: "buzzing" },
];

// Re-capitalize the first letter of each sentence (a mid-sentence cliché swapped
// to a lowercase replacement is fine; a sentence-initial one needs fixing).
function fixSentenceCaps(s: string): string {
  return s.replace(/(^|[.!?]\s+)([a-z])/g, (_m, lead, ch) => lead + ch.toUpperCase());
}

/**
 * Re-register a single shared string into the TDF voice. Idempotent and safe on
 * empty/undefined input. Pure string transform — no network, no LLM.
 */
export function toTdfVoice(raw: string | undefined | null): string {
  if (!raw) return "";
  let out = raw;
  for (const { re, to } of SUBS) out = out.replace(re, to);
  out = out.replace(/\s+/g, " ").trim();
  return fixSentenceCaps(out);
}
