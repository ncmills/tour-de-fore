# Handicap HQ — Split & Rebrand Design Spec

**Date:** 2026-07-02
**Status:** Approved (design); pending spec review → writing-plans
**Owner:** Nick

## Summary

Split the golf-trip site **Tour de Fore** (`~/tour-de-fore`, `tourdefore.com`) into two:

1. **handicaphq.com (new)** — the golf-trip **planner** (wizard, atlas, guides, blog, ~1,676 SEO pages, plan/trip/concierge, lead-gen rails), rebranded from "Tour de Fore" to "Handicap HQ" with a **custom, market-researched design** ("The Pilgrimage"). Joins the trip-planning suite (BestManHQ / MaidOfHonorHQ / OffsiteOutpost family) — full SEO, blog engine, shared infra, enhancing/steward agents.
2. **tourdefore.com (residual)** — a small **personal** golf site: home, `/past-trips` (= "body of work"), `/shop` (= "pro shop"), intro gate, legal. Keeps its **existing** branding (Tempest tagline "Hell is empty, all the devils are here," ember accent, current fonts, TubeTv/ExplosionGate immersive vibe). Becomes a millsetc.com-style personal project: **no SEO**, excluded from the enhancing agents. Keeps the merch shop's Stripe/Printful wiring untouched.

**Core insight from the infra map:** the planner moves *wholesale* to the new repo, and nearly all portfolio wiring keys on the internal tag **`tdf`** / repo `tour-de-fore`. So the rewire is mostly **"repoint the existing `tdf` planner registrations from `~/tour-de-fore` + tourdefore.com → `~/handicap-hq` + handicaphq.com,"** not "register new everywhere + delete everywhere." This means **zero data migration**: shared-data destinations stay tagged `tdf`; SQL enums, signals, and image-cache keys keep working.

## Decisions (locked)

| Decision | Choice |
|---|---|
| HandicapHQ identity | Same planner product, rebranded + custom design. Full SEO/suite member. |
| TDF residual | Personal golf site + merch. Keep existing branding on the 4 pages. No SEO; delisted from enhancing agents. |
| Repo strategy | Clone `tour-de-fore` → new `~/handicap-hq` (`ncmills/handicap-hq`) → strip + rebrand. `tour-de-fore` repo stays put, gutted to 4 pages. |
| Old URLs | 301-redirect tourdefore.com golf/SEO/blog/wizard URLs → handicaphq.com equivalents. |
| Shop split | Shop is **TDF-only**. handicaphq has **no** e-commerce (planner + lead-gen only; Stripe/Printful stripped from the clone). |
| Sequencing | **Build-then-cutover.** Phase 1 fully built + **audited** + Nick-confirmed good before any TDF strip. |
| Internal data/engine tag | Keep `tdf` (no data migration). New **domain/brand identity** everywhere user-facing. |
| Design direction | **"The Pilgrimage"** — heritage/editorial-map + yardage-book/scorecard backbone + candid-crew warmth. |

### Open calls (default if unanswered)
- **Display font:** default **Fraunces** (free, variable, editorial). Alt: license **Canela** if budget approved.
- **tourdefore.com GSC:** default **drop from SEO sweep** (personal/no-SEO). Alt: keep as a light millsetc-style property.

## Design system — "The Pilgrimage"

Built via the design-system-rebrand pattern: semantic token layer first (backward-compat aliases so it ships incrementally) → static UI primitive lib → motion layer → per-page reskin. Executable taste gates FAIL-FIRST. SDD: implementer + adversarial reviewer per task, phase-by-phase live verify.

**Palette (light-forward — a shift from TDF's dark `#18181B`):**
- Bone `#EDE7D9` — paper / bg
- Fescue/oat `#C9B78E` — warm secondary surface
- Pine ink `#1E3A2F` — dark sections / ink
- Graphite `#2A2A28` — text
- **Clay `#A6552E` — sole hero accent**

Semantic aliases: `--bg`, `--surface`, `--surface-warm`, `--ink`, `--text`, `--text-muted`, `--accent`, `--accent-ink`, `--border-hairline`. Accent/heading/text run through a WCAG contrast-clamp (reuse `color-contrast.ts` from the wizard-readability work).

**Type (3-tier, replaces TDF's 12-font system):**
- Display — high-contrast editorial serif: **Fraunces** (default) / Canela (if licensed)
- Body — **Inter Tight** (free; matches OO)
- Data — grotesque **mono** (Geist Mono / Spline Sans Mono) for yardages, dates, hole numbers, distances

**Signature motif system (the moat):**
- Per-destination hole-map / routing-line illustration (start with generated topo/contour SVG treatment; bespoke per-destination art is backlog)
- **Yardage-book itinerary output** component: scorecard grid, mono figures, route-line draw-on animation, printable/shareable artifact
- Topographic contour-line textures + hairline rules as section dividers
- Passport-stamp course collection (gamification — optional/backlog)
- Candid-crew photography to keep it warm, not stuffy

**Primitives:** reskin the OO/BMHQ set (`WizardShell`, `ActionBar`, `ResultGrid`, `StepTracker`, `MobileNav`) + new `YardageCard` / `ScorecardTable` / `RouteMap`.

**Executable taste gates (FAIL-FIRST):**
- Contrast checker (accent/text WCAG clamp)
- Brand-drift check: **ban fairway-green (`#008854` family) and navy+gold as primaries**; enforce clay `#A6552E` as the only hero accent

**Positioning / voice:** camaraderie + pilgrimage lead; competition is a wink. Reframe "handicap" as the great equalizer that makes the buddy trip fair. "HQ" = basecamp/clubhouse equity shared with sibling brands. Candidate one-liner: *"Handicap HQ — home base for the golf trip."* (Final copy in implementation.)

## Route map

**PLANNER routes → move to handicaphq.com** (`src/app/`): `atlas/`, `blog/`, `data/`, `golf-trips/**` (all pSEO), `guides/`, `my-trips/`, `plan/`, `plan-a-trip/`, `trip/plan/[id]` (generated-plan share — NOT `trip/[slug]`), `login/`, `set-password/`, `site-map/`, `sitemap-index/`, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, and most of `api/` (`generate-plan`, `lead`, `auth/*`, `unsubscribe`, `indexnow`, `cron/trip-reminders`).

> **Corrections during build (2026-07-02):** (1) `concierge/` + `concierge-checkout` **dropped entirely** — handicaphq is fully Stripe-free (see Decisions). (2) **`trip/[slug]` is PERSONAL** (reads `lib/trips` = Nick's real 2021–2026 trips) — it is body-of-work content, NOT planner output; it moves to the residual list below. Only `trip/plan/[id]` (the generated-plan share) is planner.

**RESIDUAL routes → stay on tourdefore.com:**
- `page.tsx` (home) — **currently 100% planner-branded; needs light rewrite** to a personal intro/home (drop `GeneratorShowcase` + planner funnel; keep TubeTv/ExplosionGate/RotatingTagline/Tempest brand).
- `past-trips/` (+ `[year]/`) — **this IS "body of work"** (OG title literally *"Body of Work — Past Golf Trips"*). Keep.
- `trip/[slug]` + `components/{TripPageClient,PastTripDetailClient}` + `lib/trips.ts` — the **personal trip detail pages** (year-based, incl. the live-trip guest portal). Keep on tourdefore; removed from handicaphq in build task B2b.
- `shop/` — **the "pro shop."** Keep. Depends on `api/checkout`, `api/verify-order`, `api/cron/{sync-orders,check-margins}`, `lib/{printful,shop-fulfillment}.ts` — all stay.
- Legal: `privacy/`, `terms/`, `do-not-sell/` — needed on both.
- **Intro:** no `intro` route exists. Use the `ExplosionGate` splash as intro (or a thin new route).

## Infra rewire (repoint, don't rebuild)

Concrete paths from the infra map (2026-07-02).

### handicaphq.com — repoint the `tdf`/`tour-de-fore` planner registrations to `~/handicap-hq` + `handicaphq.com`
- **Blog engine:** `~/second-nick/blog/manifest.py:41` `SITES` row `_s("tour-de-fore", "tourdefore.com", ...)` → new repo path + `handicaphq.com` (gsc_property auto-derives). `daemons/answers.py:31` `PORTFOLIO_SITES` → swap domain. `ingestors/ingest_gmail.py:37` domain→project map.
- **Stewards:** `stewards/wizard-profiles/tdf.json` (domain/base_url/repo → handicaphq), `wizard-audit-rotation.json`, `daemons/qa_steward.py:305-320` `SITES["tdf"]`, `daemons/data_coverage.py:504-515` `WIZARDS["tour-de-fore"]` (src paths).
- **Image cache:** `~/shared-image-cache/scripts/queries/tdf.ts:17` `TDF_DATA_DIR` → `~/handicap-hq/src/data`; `.github/workflows/daily-maxout.yml:101,126` + `fetch-images.yml` `HOOK_TDF` secret → handicaphq's new Vercel deploy hook. Consumer `~/handicap-hq/scripts/sync-image-cache.ts` keeps `tdf/*` keys (no re-fetch).
- **GSC scripts** (`~/claude/peptide-stack/scripts/`): add `sc-domain:handicaphq.com` to `gsc-overview.ts`, `gsc-status.ts`, `gsc-indexing.ts`, `gsc-resubmit.ts`, `gsc-lag-diag.ts`; add `gsc-inspect-hq.ts` (clone of `gsc-inspect-tdf.ts`). Register property in GSC + submit `https://handicaphq.com/sitemap.xml`.
- **App internals:** new `metadataBase` (`layout.tsx:107`); swap all 60+ hardcoded `https://tourdefore.com` canonical/OG hosts on planner pages (incl. `blog/page.tsx:7`, `blog/[slug]/page.tsx:10` `SITE_URL`); `sitemap.ts:95` base; `robots.ts:24` sitemap host; IndexNow: new key uploaded + host swap in `scripts/submit-indexnow.ts:6-10`, `src/lib/indexnow.ts`, `api/indexnow`; `next.config.ts:58-60` www→apex for `www.handicaphq.com`; **Stripe `concierge-checkout` `metadata.site` → new distinct tag** (avoid collision with tourdefore shop's `site:"tdf"`); move `cron/trip-reminders`.
- **Net-new domain assets:** Vercel project (ncmillsionaire), GSC property, Vercel deploy hook, IndexNow key, DMARC/SPF DNS for the new sending domain.
- **Skills:** repoint `tdf-audit`/`tdf-branding` → planner; add `handicaphq.com` rows to `infra-hygiene`, `wizard-audit`, `site-audit`, `seo-deploy`, `gsc-portfolio-sweep`.

### tourdefore.com — delist from enhancing agents (personal, no SEO)
- Remove/rewrite blog `Site` row; drop from `PORTFOLIO_SITES` (or keep light per open call).
- Delete `tdf.json` wizard profile + rotation entry + `qa_steward.py`/`data_coverage.py` `tdf` blocks (no wizard remains).
- Image cache: residual 3-static-page site drops out naturally once `HOOK_TDF` + query loader follow the planner.
- GSC: drop tourdefore.com from sweep lists + `gsc-inspect-tdf.ts` (default), or shrink to 4 residual URLs.
- App: strip planner routes + planner `api/*` + `cron/trip-reminders`; rewrite `sitemap.ts` to only `/`, intro, `/past-trips`(+years), `/shop`, legal; trim `robots.ts`; remove IndexNow (no SEO); drop planner `remotePatterns`; keep only shop crons in `vercel.json`. Keep shop Stripe `checkout/route.ts` `metadata.site:"tdf"`.
- Rewrite `page.tsx` to personal home; ensure intro route.
- Skills: mark `tdf-branding` as planner-voice; consider new `tourdefore-personal` audit (model on `knicklaus-audit`).

## Phases

### Phase 1 — Stand up handicaphq.com
1. New `~/handicap-hq` repo (clone of `tour-de-fore`) + new Vercel project (ncmillsionaire) + `handicaphq.com` domain.
2. Build "The Pilgrimage" design system (tokens → primitives → motion → per-page reskin) via SDD + taste gates.
3. Rebrand all "Tour de Fore" → "Handicap HQ" (brand, copy, OG, canonical); new planner home.
4. Strip the 4 personal pages + all shop/Stripe/Printful code from the clone.
5. Rewire infra (repoint list above). New domain assets.
6. Deploy + verify live with **self-canonicals** (no redirects yet; both domains serve golf content briefly — safe because handicaphq self-canonicals and tourdefore is unchanged).

### Phase 1.5 — Audit gate
Full audit of handicaphq.com: **site-audit, wizard-audit (planner flow), mobile-audit, perf-audit, seo-audit.** Fix findings. **Nick confirms "good"** → proceed. (order-audit N/A — no shop.)

### Phase 2 — Cutover (only after 1.5 passes)
1. Strip tourdefore.com down to the 4 personal pages (keep existing branding).
2. 301-redirect old tourdefore.com golf/SEO/blog/wizard URLs → handicaphq.com equivalents (exhaustive map).
3. Delist tourdefore.com from all enhancing agents (delist list above).

### Phase 3 — Verify
GSC property for handicaphq + sitemap resubmit; 301 redirect spot-checks; smoke both sites (planner flow on handicaphq; shop fulfillment still healthy on tourdefore, run `post-deploy-smoke.ts`). Update `~/PROJECTS.md` + MEMORY.

## Risks
- **60+ hardcoded `tourdefore.com` strings** in the clone — scriptable swap, but must be verified page-by-page (canonical/OG correctness is load-bearing for SEO).
- **Redirect map completeness** — the ~1,676 pages + blog must map exhaustively old→new or equity leaks / 404s.
- **Stripe `metadata.site` collision** — handicaphq concierge must use a distinct tag from tourdefore shop `site:"tdf"`, or order reconciliation confuses the two.
- **Deployed-vs-running for the enhancing agents** — after repointing second-nick configs, verify the daemons pick up the new site (per the deployed-vs-running discipline).
- **Dup-content window** — mitigated by self-canonical on handicaphq until Phase 2 redirects flip.

## Non-goals
- No redesign of the residual tourdefore.com pages (keep existing brand).
- No new e-commerce on handicaphq.
- No rename of the internal `tdf` data/engine tag (functional churn, zero gain).
- Bespoke per-destination hole-map art is backlog, not launch-blocking.
