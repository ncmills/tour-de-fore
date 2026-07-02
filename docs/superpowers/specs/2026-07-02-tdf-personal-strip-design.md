# Tour de Fore — Phase 2: Strip to Personal Site (Design Spec)

**Date:** 2026-07-02
**Status:** Design (Option A chosen while Nick away; **pending Nick's review + explicit merge/deploy confirm**)
**Owner:** Nick
**Depends on:** `2026-07-02-handicaphq-split-design.md` Phase 1 (COMPLETE + verified). handicaphq.com live; wizard parity **proven** (see Parity Gate below).

## Summary

handicaphq.com now hosts the full golf-trip planner (wizard, atlas, blog, ~1,676 pSEO pages, plan/result/itinerary, lead-gen). This phase guts **tour-de-fore** (`tourdefore.com`) down to a small **personal golf site**: keep the immersive Tempest intro, the "body of work" past-trips, the personal trip pages, and the pro shop. Remove every planner/wizard/SEO surface. Add 301s so old planner URLs land on handicaphq.com. Delist tourdefore.com from the enhancing agents.

This is **destructive to the live tourdefore.com**, which hosts a real Stripe/Printful shop. Therefore: build on a branch, verify a preview deploy, and **do not merge to `main` (auto-prod) without Nick's explicit confirmation.**

## Parity Gate (PASSED — 2026-07-02)

Precondition before any strip: handicaphq's wizard must be a functional **superset** of TDF's. Verified:

- **No TDF source changed after the fork.** handicap-hq was seeded from a snapshot at `87471b8` (2026-07-02 08:14). TDF's only later commits (`258f0e0`, `a8df041`) are docs-only. `git diff e0e2b94..HEAD -- ':(exclude)*.md' ':(exclude)docs/'` is empty → the clone holds 100% of TDF's wizard code.
- **All wizard routes + APIs + dynamic routes present in both repos.**
- **Planning engine identical line-for-line** (`generate-plan` 861L, `planner-prompt` 354L, `derive` 249L, `plan-types` — only diff is the tier-name comment + the removed Stripe field).
- **3 components absent in hq are all non-wizard:** `PlanUpsellSection` (dead code), `USMap` (personal-only; stays in TDF), `TierSelectionClient` (referenced only by a comment).
- **`PlanWizardClient` (−245L)** deep-audited → FULL PARITY (shrink = dead-code + `DevilPinataScene`→`RouteLoader`).
- **`PlanResultClient` (−670L)** deep-audited → FULL PARITY (shrink = extraction into `ScorecardTable`/`RouteMap`/`YardageCard`; every section/control/API preserved; hq adds RouteMap + scorecard).
- One cosmetic-only delta: hq itinerary drops emoji type-icons (text preserved). Not a data/feature loss.

**Conclusion: safe to delete TDF's wizard — nothing is lost that isn't in handicaphq or intentionally personal-only.**

## Decisions (locked)

| Decision | Choice |
|---|---|
| What TDF becomes | Personal golf site: immersive intro/home, `/past-trips`(+`[year]`), personal `/trip/[slug]`, `/shop`, legal. millsetc-style — no SEO, delisted from enhancing agents. |
| Kept pages | Home/intro, past-trips, personal trip pages, pro shop stay **100% as-is visually**. |
| Wizard references on kept pages | **Option A — fully strip.** Remove `GeneratorShowcase` home section; remove `/plan` + `/my-trips` links from Nav/Footer. `HomeClient` immersive intro untouched (has no wizard links). Rationale: Nick's repeated instruction "strip the wizard + related content (SEO etc.) out"; a personal site shouldn't advertise/redirect to a SaaS on another domain. Reversible via git; flagged for Nick's review. |
| Deploy safety | **Branch + preview, then merge.** Branch `phase2-personal-strip`; verify preview (kept pages render, shop `post-deploy-smoke` green, path 301s work); merge only on Nick's go. |
| Dead code | **Delete orphans** — remove planner routes/APIs then delete now-unused planner components/lib, verified by grep + green build. |
| Old planner URLs | 301-redirect to handicaphq.com same-path (see map). `concierge*` → handicaphq.com `/` (concierge dropped on hq). |
| Shop | Untouched. All Stripe/Printful/cron/verify code + invariants preserved. |
| Internal tag | Unchanged. tourdefore shop keeps Stripe `metadata.site:"tdf"`. |

## Route disposition

### KEEP (personal)
- `/` (`page.tsx` → `HomeClient` immersive intro; **remove the `GeneratorShowcase` section only**)
- `/past-trips`, `/past-trips/[year]` + `PastTripsClient`/`PastTripDetailClient`
- `/trip/[slug]` (personal trip pages) + `TripPageClient` + `lib/trips.ts`
- `/shop`, `/shop/success` + `ShopClient`/`ShopGate`/`ShopPageClient`/`OrderVerifier`
- Legal: `/privacy`, `/terms`, `/do-not-sell`
- Shop/personal APIs: `api/checkout`, `api/verify-order`, `api/products`, `api/cron/sync-orders`, `api/cron/check-margins`, `api/health/orders`, `api/privacy/do-not-sell`

### REMOVE (planner/wizard/SEO)
- Routes: `atlas`, `atlas/[slug]`, `blog`, `blog/[slug]`, `concierge`, `concierge/success`, `data`, `data/golf-trip-cost-index`, `golf-trips/**`, `guides`, `guides/[slug]`, `my-trips`, `plan`, `plan/build`, `plan/gallery`, `plan/itinerary`, `plan/result`, `plan-a-trip`, `trip/plan`, `login`, `set-password`, `site-map`, `sitemap-index`
- APIs: `admin/**`, `auth/**`, `claim-plans`, `concierge-checkout`, `crew-response`, `generate-plan`, `indexnow`, `lead`, `plans/**`, `profile`, `save-selections`, `send-plan-emails`, `signals`, `swap`, `track-selection`, `unsubscribe`, `cron/trip-reminders`
- Now-orphaned planner components + lib (grep + build verified): e.g. `PlanWizardClient`, `PlanResultClient`, `PlanFlowClient`, `PlanLandingClient`, `PlanSelectionClient`, `TierSelectionClient`, `TripBuilderClient`, `ItineraryClient`, `GalleryClient`, `MyTripsClient`, `ShareableTripClient`, `TierCompareTable`, `CrewVotePanel`, `CrewTally`, `SwapDrawer`, `EmailCapture`, `SelectionCard`, `WizardStep`, `WizardProgress`, `PlanBreadcrumb`, `PlanGate`, `PlanUpsellSection`, `AcquisitionBeacon`, `RegionMap`, `Breadcrumbs`, `ProseOverview`, `home/GeneratorShowcase`, `home/showcase-plan`, blog components; lib `anon-plans`, `anthropic`, `auth`, `blog`, `booking-links`, `derive`, `free-plan`, `heartbeat`, `indexnow`, `insights`, `lead-capture`, `lead-profile`, `plan-types`, `planner-prompt`, `reengage`, `signals`, `signals-client`, `tdf-voice`, `trip-dates`, `vid`. **The build + `grep` are the safety net — only delete a file once no kept route imports it.**

> **Split subtlety:** `/trip` is split — `/trip/[slug]` = personal (KEEP), `/trip/plan/[id]` = wizard share (REMOVE + redirect). Redirect source `/trip/plan/:path*` does not match `/trip/[slug]`.

## 301 redirect map (in `next.config.ts` `redirects()`)

Each planner prefix → `https://handicaphq.com/<same>` (permanent). Keep the existing www→apex + legacy redirects.

```
/plan            + /plan/:path*        → handicaphq.com/plan[...]
/plan-a-trip                            → handicaphq.com/plan-a-trip
/golf-trips      + /golf-trips/:path*   → handicaphq.com/golf-trips[...]
/atlas           + /atlas/:path*        → handicaphq.com/atlas[...]
/guides          + /guides/:path*       → handicaphq.com/guides[...]
/blog            + /blog/:path*         → handicaphq.com/blog[...]
/data            + /data/:path*         → handicaphq.com/data[...]
/my-trips                               → handicaphq.com/my-trips
/trip/plan       + /trip/plan/:path*    → handicaphq.com/trip/plan[...]
/login                                  → handicaphq.com/login
/set-password                           → handicaphq.com/set-password
/site-map                               → handicaphq.com/site-map
/concierge       + /concierge/:path*    → handicaphq.com/     (concierge dropped on hq)
```

## Config trims
- `next.config.ts`: add the redirect block; remove the `/sitemap.xml → /sitemap-index` rewrite; drop planner `remotePatterns` (keep only shop/merch hosts + `images.unsplash.com` if still used by kept pages); keep security headers (trim CSP `connect-src`/`frame-src` to Stripe + Vercel only if easy — else leave, harmless).
- `vercel.json`: remove the `cron/trip-reminders` cron; keep `sync-orders` + `check-margins`.
- `sitemap.ts`: rewrite to a single flat sitemap of personal URLs only — `/`, `/past-trips`(+ the 5 years), personal `/trip/[slug]` (from `lib/trips`), `/shop`, `/privacy`, `/terms`, `/do-not-sell`. Remove `generateSitemaps`/region/pSEO/blog logic.
- `robots.ts`: simplify to `allow: "/"`, `disallow: ["/api/", "/shop/success"]`, sitemap `https://tourdefore.com/sitemap.xml`.
- IndexNow: remove postbuild submit + key (no SEO).

## Delist from enhancing agents (verify + finish — mostly done in Phase 1)
- **Blog engine** (`~/second-nick/blog`): confirm tour-de-fore row removed from `manifest.py SITES` + `answers.py PORTFOLIO_SITES` (repointed to handicaphq in Phase 1 — verify no residual tourdefore.com).
- **Image cache** (`~/shared-image-cache`): query loader `TDF_DATA_DIR` already repointed to `~/handicap-hq/src/data`. **Leftover:** `HOOK_TDF` still points at tourdefore's deploy hook → create a handicaphq deploy hook + update the GH Actions secret (harmless but wrong). tourdefore (3 static pages) drops out naturally.
- **Stewards** (`~/second-nick/stewards` + daemons): `tdf.json` profile + `qa_steward`/`data_coverage` `tdf` blocks repointed to handicaphq in Phase 1 — verify no residual tourdefore wizard target.
- **GSC sweep** (`~/claude/peptide-stack/scripts`): optionally drop `sc-domain:tourdefore.com` from sweep lists (personal/no-SEO). Low priority.

## Phase 3 verify
- 301 spot-checks: `curl -sI https://tourdefore.com/plan-a-trip` (and /atlas, /golf-trips/..., /blog, /concierge) → 308/301 to handicaphq.
- handicaphq wizard: **one** live generation smoke (credits cost money) → renders end-to-end.
- tourdefore shop: `scripts/post-deploy-smoke.ts` green (margins, `/api/health/orders`, verify-order).
- GSC/sitemap: handicaphq property + sitemap already submitted; tourdefore sitemap now minimal.
- Update `~/PROJECTS.md` + MEMORY.

## Risks
- **Deleting a file a kept route needs** → mitigated: remove routes first, then delete orphans only when grep shows no kept-route importer + build stays green.
- **Redirect-map holes** → equity leak / 404s. Use prefix `:path*` catch-alls so every planner sub-URL is covered.
- **Shop regression** → mitigated by keeping all shop code untouched + `post-deploy-smoke` gate on the preview before merge.
- **Kept pages secretly import a planner lib** (e.g. shared constants) → build will fail; resolve by keeping that specific shared file.

## Non-goals
- No redesign of the kept personal pages (keep existing Tempest brand).
- No rename of the internal `tdf` tag.
- No new SEO on tourdefore.
- No touching handicaphq in this phase (it's done).
