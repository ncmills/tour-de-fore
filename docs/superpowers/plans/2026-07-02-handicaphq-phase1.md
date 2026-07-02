# Handicap HQ — Phase 1 Implementation Plan (stand up handicaphq.com)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up handicaphq.com as the golf-trip planner cloned from Tour de Fore, rebranded to "Handicap HQ" with the custom "Pilgrimage" design system, shop-stripped, self-canonical, wired into the trip-planning-suite infra — deployed and live, ready for the Phase 1.5 audit gate.

**Architecture:** Clone `~/tour-de-fore` → new `~/handicap-hq` repo + new Vercel project on `handicaphq.com`. Strip the 4 personal pages + all Stripe/Printful shop code. Swap domain identity (canonical/OG/sitemap/IndexNow) to handicaphq with **self-canonicals** (no redirects yet). Build the Pilgrimage design system via the design-system-rebrand SDD pattern (token layer → primitives → motion → per-page reskin) with FAIL-FIRST taste gates. Repoint the existing `tdf` planner registrations in second-nick / shared-image-cache / GSC scripts from the old repo+domain to the new one. Keep the internal `tdf` data/engine tag (zero data migration).

**Tech Stack:** Next.js (match tour-de-fore's version), TypeScript, CSS `@theme` tokens, Fraunces + Inter Tight + a grotesque mono, Motion (`motion/react`), Vercel (ncmillsionaire scope), GitHub `ncmills/handicap-hq`.

## Global Constraints

- **Vercel scope = `ncmillsionaire`.** Run `vercel switch ncmillsionaire` (or `--scope ncmillsionaire`) BEFORE the first deploy. Default scope is `uppersonlys-projects` (Mike) — must not be used.
- **Deploy = push to `main`** (Vercel GitHub App auto-builds + promotes). Do NOT run `vercel --prod` manually unless a build is stuck.
- **handicaphq has NO shop / NO Stripe / NO Printful.** Strip all of it.
- **Keep internal tag `tdf`** for data/engine/image-cache continuity. Do NOT rename it. (Brand/domain identity changes; the tag is a functional key.)
- **~~Stripe concierge tag~~ — N/A.** Concierge (Stripe) was dropped in B1; handicaphq is fully payment-free. No Stripe metadata step remains.
- **Palette guardrails (FAIL-FIRST):** ban fairway-green (`#008854` family) and navy+gold as primaries. Clay `#A6552E` is the ONLY hero accent.
- **Self-canonical only.** Every handicaphq page canonicals to `https://handicaphq.com/...`. NO 301s from tourdefore yet (that's Phase 2).
- **Palette:** Bone `#EDE7D9`, Fescue `#C9B78E`, Pine ink `#1E3A2F`, Graphite `#2A2A28`, Clay `#A6552E`.
- **Type:** Display Fraunces (variable, free) unless Canela licensed; Body Inter Tight; Data grotesque mono (Geist Mono / Spline Sans Mono).
- **Spec:** `docs/superpowers/specs/2026-07-02-handicaphq-split-design.md` (authoritative for scope/route-map/infra paths).

---

## File / work structure

Work happens in the **new `~/handicap-hq` repo** except the infra-repoint task group, which touches sibling repos (`~/second-nick`, `~/shared-image-cache`, `~/claude/peptide-stack`). Task groups:

- **A. Bootstrap** — clone → new repo → new Vercel project → domain → env → green build.
- **B. Strip** — remove personal pages + shop/Stripe/Printful; planner home placeholder.
- **C. Domain identity** — canonical/OG/sitemap/robots/IndexNow/metadataBase/Stripe-tag swap; self-canonical.
- **D. Design system (Pilgrimage)** — SDD sub-block: tokens → taste gates → fonts → primitives → new components → motion → per-page reskin → planner home.
- **E. Rebrand copy** — Tour de Fore → Handicap HQ everywhere user-facing; voice/OG.
- **F. Infra repoint** — second-nick, shared-image-cache, GSC scripts.
- **G. Deploy + smoke** — live on handicaphq.com, self-canonical, planner flow verified.

Each task ends with an independently verifiable deliverable. For mechanical migration tasks the "test" is a build/grep/live check, not a forced unit test; for new code (taste gates, redirect map, new components) use TDD.

---

## Task Group A — Bootstrap

### Task A1: Clone tour-de-fore into a new handicap-hq repo

**Files:**
- Create: `~/handicap-hq/` (full working tree)

- [ ] **Step 1: Clone the working tree without git history**

```bash
cd ~
rsync -a --exclude node_modules --exclude .next --exclude .git --exclude .vercel \
  tour-de-fore/ handicap-hq/
cd ~/handicap-hq && git init -q && git add -A && git commit -q -m "chore: seed handicap-hq from tour-de-fore snapshot"
```

- [ ] **Step 2: Create the GitHub repo and push**

```bash
cd ~/handicap-hq
gh repo create ncmills/handicap-hq --private --source=. --remote=origin --push
```

- [ ] **Step 3: Verify install + build green (baseline before any change)**

```bash
cd ~/handicap-hq && npm install && npm run build
```
Expected: build succeeds (still branded Tour de Fore — that's fine; this is the baseline).

- [ ] **Step 4: Commit lockfile if changed**

```bash
cd ~/handicap-hq && git add package-lock.json && git commit -q -m "chore: lockfile" || echo "no change"
```

### Task A2: Create the Vercel project + link handicaphq.com

**Files:**
- Modify: `~/handicap-hq/.vercel/` (generated by link)

- [ ] **Step 1: Switch scope + link a new project**

```bash
cd ~/handicap-hq
vercel switch ncmillsionaire
vercel link --yes --project handicap-hq
```

- [ ] **Step 2: Pull env from tour-de-fore, drop shop/Stripe/Printful keys, push planner keys**

Pull the existing planner env (Supabase, Anthropic, Redis, lead-gen) from tour-de-fore's Vercel project and set them on handicap-hq. EXCLUDE: `STRIPE_*`, `PRINTFUL_*`, shop webhook secrets. (List each key explicitly when running — do not blind-copy.)

```bash
cd ~/tour-de-fore && vercel env pull .env.tdf --environment production --yes
# Review .env.tdf; for each PLANNER key (NOT STRIPE_/PRINTFUL_/shop), set on handicap-hq:
cd ~/handicap-hq
# e.g. vercel env add ANTHROPIC_API_KEY production < value  (repeat per key)
rm ~/tour-de-fore/.env.tdf
```

- [ ] **Step 3: Add the domain**

```bash
cd ~/handicap-hq && vercel domains add handicaphq.com || vercel domains inspect handicaphq.com
# Attach to project via dashboard if CLI defers; confirm apex + www resolve to this project.
```

- [ ] **Step 4: Commit**

```bash
cd ~/handicap-hq && git add -A && git commit -q -m "chore: vercel link handicap-hq (ncmillsionaire)"
```

---

## Task Group B — Strip personal pages + shop

### Task B1: Remove the shop + all Stripe/Printful code

**Files (delete):** `src/app/shop/`, `src/app/api/checkout/`, `src/app/api/verify-order/`, `src/app/api/cron/sync-orders/`, `src/app/api/cron/check-margins/`, `src/lib/printful.ts`, `src/lib/shop-fulfillment.ts`, `test-printful.ts`, `scripts/post-deploy-smoke.ts` (shop-only), and any `scripts/enrich-places.ts` shop bits if shop-only.
**Files (modify):** `vercel.json` (drop shop crons), `package.json` (drop shop scripts/deps if unused), any imports referencing deleted files.

- [ ] **Step 1: Delete shop routes + libs**

```bash
cd ~/handicap-hq
git rm -r src/app/shop src/app/api/checkout src/app/api/verify-order \
  src/app/api/cron/sync-orders src/app/api/cron/check-margins \
  src/lib/printful.ts src/lib/shop-fulfillment.ts test-printful.ts scripts/post-deploy-smoke.ts
```

- [ ] **Step 2: Remove shop crons from vercel.json**

Open `vercel.json`; delete the `/api/cron/sync-orders` and `/api/cron/check-margins` cron entries. Keep `/api/cron/trip-reminders` (planner).

- [ ] **Step 3: Find + fix dangling references**

```bash
cd ~/handicap-hq && grep -rIl -e "printful" -e "shop-fulfillment" -e "/shop" -e "verify-order" src/ | grep -v node_modules
```
For each hit: remove the shop link/import (e.g. `PlanUpsellSection.tsx`, `ItineraryClient.tsx`, nav/footer components, `robots.ts` disallow, `sitemap.ts` shop entry). Remove Stripe deps from `package.json` if nothing else uses them.

- [ ] **Step 4: Verify build green + no shop refs**

```bash
cd ~/handicap-hq && npm run build && \
  ! grep -rI -e "printful" -e "shop-fulfillment" src/ | grep -v node_modules
```
Expected: build passes; grep returns nothing.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "strip: remove shop + Stripe/Printful (handicaphq is planner-only)"
```

### Task B2: Remove the personal pages (past-trips, immersive home bits)

**Files (delete):** `src/app/past-trips/`, personal-only components (`TubeTv`, `VideoGrid`, `ExplosionGate`, `RotatingTagline`, `PastTripsClient`) IF not reused by the planner. **Verify each is personal-only before deleting** (grep for imports).
**Files (modify):** `src/app/page.tsx` — replaced entirely in Task D8 (planner home). For now, reduce to a minimal valid placeholder so the build stays green.

- [ ] **Step 1: Confirm personal-only components**

```bash
cd ~/handicap-hq
for c in TubeTv VideoGrid ExplosionGate RotatingTagline PastTripsClient; do
  echo "== $c =="; grep -rIl "$c" src/ | grep -v node_modules
done
```
Delete only components used solely by `page.tsx`/`past-trips`. Keep anything the wizard/planner imports.

- [ ] **Step 2: Delete past-trips + confirmed personal-only components**

```bash
git rm -r src/app/past-trips
# git rm each confirmed personal-only component file
```

- [ ] **Step 3: Minimal placeholder home (real home built in Task D8)**

Replace `src/app/page.tsx` with a minimal server component that renders a placeholder + a link into `/plan-a-trip`, so the build compiles. (Full planner home comes in Task D8.)

- [ ] **Step 4: Build green**

```bash
cd ~/handicap-hq && npm run build
```
Expected: passes.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "strip: remove personal pages (past-trips + immersive home); placeholder home"
```

---

## Task Group C — Domain identity swap (self-canonical)

### Task C1: metadataBase + canonical/OG host swap across planner pages

**Files (modify):** `src/app/layout.tsx:107` (`metadataBase`), and every planner page with a hardcoded `https://tourdefore.com` canonical/OG (60+ files incl. `blog/page.tsx:7`, `blog/[slug]/page.tsx:10` `SITE_URL`; all `golf-trips/**`, `guides`, `atlas`, `data`, `plan*`, `concierge`, `trip`, `site-map`, `my-trips`, `login`, `set-password`).

- [ ] **Step 1: Inventory every hardcoded host**

```bash
cd ~/handicap-hq && grep -rIn "tourdefore.com" src/ | grep -v node_modules > /tmp/tdf-hosts.txt; wc -l /tmp/tdf-hosts.txt
```

- [ ] **Step 2: Swap host → handicaphq.com**

```bash
cd ~/handicap-hq
grep -rIl "tourdefore.com" src/ | grep -v node_modules | xargs sed -i '' 's#https://tourdefore.com#https://handicaphq.com#g; s#tourdefore\.com#handicaphq.com#g'
```

- [ ] **Step 3: Verify zero residual + self-canonical is correct**

```bash
cd ~/handicap-hq && grep -rIn "tourdefore" src/ | grep -v node_modules
```
Expected: empty (or only intentional references — there should be none in the planner clone). Spot-check 3 pages' `alternates.canonical` now point to `https://handicaphq.com/...`.

- [ ] **Step 4: Build green + commit**

```bash
cd ~/handicap-hq && npm run build && git add -A && git commit -m "chore: swap canonical/OG host tourdefore.com -> handicaphq.com (self-canonical)"
```

### Task C2: sitemap, robots, next.config redirect, Stripe tag, IndexNow

**Files (modify):** `src/app/sitemap.ts:95` (base), `src/app/robots.ts:24` (sitemap host), `next.config.ts:58-60` (`www.handicaphq.com`→apex; also update CSP `media-src` host and drop shop redirects), `src/app/api/concierge-checkout/route.ts:74` (`metadata.site` → `"hqcx"`), `scripts/submit-indexnow.ts:6-10` + `src/lib/indexnow.ts` + `src/app/api/indexnow/route.ts` (new key + host).

- [ ] **Step 1: sitemap + robots host**

Set `sitemap.ts` `base = "https://handicaphq.com"`; `robots.ts` sitemap → `https://handicaphq.com/sitemap.xml`. Remove residual-page-only entries that no longer apply (past-trips/shop) from `sitemap.ts`.

- [ ] **Step 2: next.config www→apex + CSP + drop shop redirects**

In `next.config.ts`: change the www redirect source to `www.handicaphq.com` → `https://handicaphq.com`; update CSP `media-src` to `https://handicaphq.com`; remove any shop-only redirects; keep planner legacy redirects.

- [x] **Step 3: New Stripe concierge tag — N/A (concierge + Stripe removed in B1).**

- [ ] **Step 4: New IndexNow key**

Generate a fresh IndexNow key; place `public/<key>.txt`; set `INDEXNOW_KEY` + `INDEXNOW_HOST="handicaphq.com"` in `scripts/submit-indexnow.ts`, `src/lib/indexnow.ts`, `api/indexnow/route.ts`. Remove the old TDF key file.

- [ ] **Step 5: Build green + commit**

```bash
cd ~/handicap-hq && npm run build && git add -A && git commit -m "chore: handicaphq sitemap/robots/redirect/indexnow/stripe-tag identity"
```

---

## Task Group D — Design system: "The Pilgrimage"

> **Execution note:** This group is the creative core. Execute it via subagent-driven-development following Nick's **design-system-rebrand pattern** (token-layer-first, backward-compat aliases, static primitive lib, motion layer, per-page reskin; implementer + adversarial reviewer per task). The taste gates (Task D2) are the executable acceptance harness — they must FAIL before the reskin and PASS after. Ship phase-by-phase (each sub-task independently deployable behind the alias layer).

### Task D1: Token layer + palette (TDD via contrast test)

**Files:** `src/app/globals.css` (`@theme` + semantic aliases), Create `src/lib/color-contrast.ts` (port from wizard-readability), Test `src/lib/color-contrast.test.ts`.

- [ ] **Step 1: Failing test — accent clamp meets WCAG AA on bone**

```ts
// color-contrast.test.ts
import { contrastRatio, clampAccentOn } from "./color-contrast";
test("clay accent clamped on bone is >= 4.5:1", () => {
  const c = clampAccentOn("#A6552E", "#EDE7D9");
  expect(contrastRatio(c, "#EDE7D9")).toBeGreaterThanOrEqual(4.5);
});
```

- [ ] **Step 2: Run — fails (module missing)**

```bash
cd ~/handicap-hq && npx vitest run src/lib/color-contrast.test.ts
```
Expected: FAIL.

- [ ] **Step 3: Implement `color-contrast.ts`** (relative-luminance contrast + `clampAccentOn` that darkens toward `--accent-ink` until AA). Show full implementation.

- [ ] **Step 4: Run — passes.**

- [ ] **Step 5: Define tokens in `globals.css`**

Add `@theme` raw palette (bone/fescue/pine/graphite/clay) + semantic aliases `--bg/--surface/--surface-warm/--ink/--text/--text-muted/--accent/--accent-ink/--border-hairline`. Add **backward-compat aliases** mapping the OLD TDF token names (`--color-bg`, `--color-neon`, `--color-border`, ember `#EA580C`) to the new semantic values so existing components render immediately.

- [ ] **Step 6: Build green + commit**

```bash
git add -A && git commit -m "feat(design): Pilgrimage token layer + contrast clamp + compat aliases"
```

### Task D2: Executable taste gates (FAIL-FIRST)

**Files:** Create `scripts/taste-gate.ts` (+ npm script `taste`), Test `scripts/taste-gate.test.ts`.

- [ ] **Step 1: Failing test — gate rejects banned colors**

```ts
test("brand-drift gate flags fairway-green + navy+gold primaries", () => {
  expect(scanForBannedColors(":root{--accent:#008854}")).toContain("#008854");
  expect(scanForBannedColors("--primary:#14213D;--gold:#C9A227")).not.toEqual([]);
});
test("contrast gate flags accent below AA on bg", () => {
  expect(auditContrast({accent:"#C9B78E", bg:"#EDE7D9"}).pass).toBe(false);
});
```

- [ ] **Step 2: Run — fails.**

- [ ] **Step 3: Implement `taste-gate.ts`** — scans `globals.css` + component styles for `#008854`-family greens and navy+gold-as-primary, and runs the contrast audit on accent/text/heading vs surfaces. Exits non-zero on any violation. Add `"taste": "tsx scripts/taste-gate.ts"` to package.json.

- [ ] **Step 4: Run against current tree — expected FAIL** (old ember/dark still present). This proves the gate bites.

```bash
cd ~/handicap-hq && npm run taste; echo "exit=$?"
```
Expected: non-zero now; will pass after the reskin lands.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "test(design): FAIL-FIRST taste gates (brand-drift + contrast)"
```

### Task D3: Fonts (Fraunces / Inter Tight / mono)

**Files:** `src/app/layout.tsx` (font imports via `next/font`), `src/app/_fonts/` if self-hosted, `globals.css` (font-family tokens).

- [ ] **Step 1:** Wire Fraunces (display), Inter Tight (body), Geist Mono / Spline Sans Mono (data) via `next/font/google` (or self-host). Map `--font-display/--font-body/--font-mono`. Retire the 12-font TDF stack (keep aliases only where an existing component references an old font var, pointing it at the new tier).
- [ ] **Step 2:** Build green; visually confirm on one page via `npm run dev` screenshot.
- [ ] **Step 3:** Commit `feat(design): Pilgrimage type — Fraunces/Inter Tight/mono`.

### Task D4: Primitive reskin (WizardShell, ActionBar, ResultGrid, StepTracker, MobileNav)

**Files:** the existing primitive components (ported from OO/BMHQ patterns) in `src/components/`.

- [ ] **Step 1–N (per primitive, SDD):** Reskin each to the token layer (surfaces = bone/pine, hairline borders, clay accent, mono for data). No inline hex — tokens only (taste gate enforces). Adversarial reviewer checks each against the spec's motif + guardrails.
- [ ] **Verify:** `npm run build && npm run taste` (taste still fails until all pages done, but reskinned primitives must not introduce NEW violations); screenshot each primitive.
- [ ] **Commit per primitive.**

### Task D5: New components — YardageCard / ScorecardTable / RouteMap

**Files:** Create `src/components/pilgrimage/YardageCard.tsx`, `ScorecardTable.tsx`, `RouteMap.tsx`, with tests where logic exists (e.g. RouteMap path math).

- [ ] **Step 1:** `ScorecardTable` — mono figures, hairline grid, hole/yardage columns; the itinerary renders as a yardage book.
- [ ] **Step 2:** `YardageCard` — destination card with generated contour/hole-map SVG treatment (generated, not bespoke — see Phase 0 lever).
- [ ] **Step 3:** `RouteMap` — dotted route-line connecting trip days/destinations (TDD the path/segment math).
- [ ] **Verify + commit** per component.

### Task D6: Motion layer (route-draw)

**Files:** `src/components/pilgrimage/` + itinerary/plan pages.

- [ ] **Step 1:** Route-line draw-on animation as the itinerary builds (Motion `pathLength`); scorecard tally reveal. Restrained — one signature move.
- [ ] **Verify:** dev screenshot/recording; respects `prefers-reduced-motion`. Commit.

### Task D7: Per-page reskin (planner surfaces)

**Files:** `plan-a-trip`, `plan/*`, `trip/[slug]`, `golf-trips/**` (pSEO templates — high SEO value, must read premium), `guides`, `atlas`, `data`, `blog`, `concierge`, `site-map`, legal.

- [ ] **Step 1–N (SDD, per surface):** Apply tokens/type/primitives; wire ScorecardTable into the itinerary output; wire YardageCard into destination/pSEO templates; RouteMap into trip pages. Adversarial review per surface against guardrails + motif.
- [ ] **Verify:** `npm run build && npm run taste` (must now PASS) + screenshots each surface desktop+mobile. Commit per surface.

### Task D8: New planner home

**Files:** `src/app/page.tsx` (replace placeholder), `src/components/home/*`.

- [ ] **Step 1:** Build the Pilgrimage planner home — hero (positioning: camaraderie + pilgrimage; "Handicap HQ — home base for the golf trip"), a GeneratorShowcase-style real-itinerary product shot rendered as a yardage book, destination strip using YardageCards, clear CTA into `/plan-a-trip`. Follow OO/BMHQ home structure, not their look.
- [ ] **Step 2:** `npm run build && npm run taste` PASS; screenshots desktop+mobile. Commit `feat(design): Pilgrimage planner home`.

---

## Task Group E — Rebrand copy (Tour de Fore → Handicap HQ)

### Task E1: Brand string + voice swap

**Files:** all user-facing copy with "Tour de Fore"; `src/app/layout.tsx` metadata; `opengraph-image.tsx`; brand/nav/footer; `tdf-branding` skill (repoint to planner voice, update name).

- [ ] **Step 1: Inventory**

```bash
cd ~/handicap-hq && grep -rIn "Tour de Fore\|Tour de For\|TourdeFore" src/ | grep -v node_modules
```

- [ ] **Step 2:** Replace brand name → "Handicap HQ" in all user-facing copy, titles, OG. Update the immersive tagline/positioning to the Pilgrimage voice (camaraderie + pilgrimage; handicap = the equalizer). Update `opengraph-image.tsx` art to the new brand. Do NOT change the internal `tdf` tag or code identifiers.
- [ ] **Step 3:** `npm run build`; spot-check 5 page `<title>`s + OG. Commit `feat: rebrand copy Tour de Fore -> Handicap HQ`.

---

## Task Group F — Infra repoint (sibling repos)

> Each sub-task edits a DIFFERENT repo. After editing second-nick configs, verify the daemons pick up the new site (deployed-vs-running discipline) — a git edit is not a running-config change.

### Task F1: Blog engine + stewards (~/second-nick)

**Files:** `blog/manifest.py:41` (SITES row → repo `handicap-hq` path + `handicaphq.com`), `daemons/answers.py:31` (`PORTFOLIO_SITES` swap), `ingestors/ingest_gmail.py:37`, `stewards/wizard-profiles/tdf.json` (domain/base_url/repo → handicaphq), `wizard-audit-rotation.json`, `daemons/qa_steward.py:305-320`, `daemons/data_coverage.py:504-515`.

- [ ] **Step 1:** Repoint each to the new repo path + `handicaphq.com` base_url. Keep the `tdf` key where it's an internal id.
- [ ] **Step 2:** Verify: run the blog-engine dry-run / `sn today` and confirm handicaphq.com appears and tourdefore.com's planner surface no longer targeted. Commit in ~/second-nick.

### Task F2: Image cache (~/shared-image-cache)

**Files:** `scripts/queries/tdf.ts:17` (`TDF_DATA_DIR` → `~/handicap-hq/src/data`), `.github/workflows/daily-maxout.yml:101,126` + `fetch-images.yml` (`HOOK_TDF` → handicaphq deploy hook), GitHub secret `HOOK_TDF` value.

- [ ] **Step 1:** Repoint the data dir + deploy hook. Create the handicaphq Vercel deploy hook; update the `HOOK_TDF` GitHub Actions secret value.
- [ ] **Step 2:** Verify: manual `fetch-images.yml` dispatch for `tdf` reads from the new dir and, on new images, hits the handicaphq hook. Confirm "N added > 0" (silent-401 gotcha). Commit.

### Task F3: GSC scripts + property (~/claude/peptide-stack)

**Files:** `scripts/gsc-overview.ts`, `gsc-status.ts`, `gsc-indexing.ts`, `gsc-resubmit.ts`, `gsc-lag-diag.ts` (add `sc-domain:handicaphq.com`), Create `scripts/gsc-inspect-hq.ts`.

- [ ] **Step 1:** Add the new property to the sweep lists. Register `sc-domain:handicaphq.com` in Google Search Console (verify via DNS). Submit `https://handicaphq.com/sitemap.xml`.
- [ ] **Step 2:** Verify `npx tsx scripts/gsc-status.ts` includes handicaphq. Commit.

---

## Task Group G — Deploy + smoke

### Task G1: Deploy to production + verify live self-canonical

- [ ] **Step 1:** Ensure taste gate + build pass, then push main.

```bash
cd ~/handicap-hq && npm run build && npm run taste && git push origin main
```

- [ ] **Step 2:** Wait for Vercel promote; verify live.

```bash
curl -sI https://handicaphq.com | head -5
curl -s https://handicaphq.com | grep -o 'canonical[^>]*handicaphq.com' | head
curl -sI https://www.handicaphq.com | grep -i location   # -> apex
```
Expected: 200; canonical is handicaphq.com; www→apex.

- [ ] **Step 3:** Smoke the planner flow end-to-end (real generate).

```bash
# POST /api/generate-plan with a sample payload; assert 200 + a plan body.
```
Expected: a plan renders; itinerary shows the yardage-book/ScorecardTable; no Stripe/shop references anywhere.

- [ ] **Step 4:** Confirm tourdefore.com is UNCHANGED and still fully live (no Phase-2 work yet).

- [ ] **Step 5:** Update task tracker; hand to Phase 1.5 audit gate.

---

## Self-review (spec coverage)

- Repo/Vercel/domain (spec §1) → A1–A2. ✓
- Shop-only on TDF / strip from handicaphq (spec Decisions) → B1. ✓
- Personal pages removed from clone (spec route map) → B2. ✓
- Domain identity / self-canonical / Stripe tag / IndexNow (spec §3, risks) → C1–C2. ✓
- Pilgrimage design system incl. tokens/type/motif/taste gates (spec §2) → D1–D8. ✓
- Rebrand copy (spec §1) → E1. ✓
- Infra repoint: blog/stewards/image-cache/GSC (spec §3) → F1–F3. ✓
- Deploy + planner smoke, self-canonical, TDF untouched (spec Phase 1) → G1. ✓
- 60+ hardcoded host swap risk → C1 (inventory + verify). ✓
- Stripe metadata collision risk → C2 Step 3 (`"hqcx"`). ✓
- Deployed-vs-running risk → F group note + F1 Step 2. ✓

**Deferred to later plans (gated):** Phase 1.5 audit (own checklist), Phase 2 strip TDF + 301 redirect map + agent delist, Phase 3 verify. Written after the audit gate, informed by handicaphq's real final state.

**Cost-control lever (from Phase 0):** if Task Group D runs long, ship the token+type+primitive reskin (D1–D4, D7 core, D8) and defer bespoke motif depth (D5 hole-map art fidelity, D6 flourishes) to backlog. Differentiation survives on palette + scorecard system.
