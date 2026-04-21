# TDF Wizard Audit — 2026-04-22

Format ported from MOH/BESTMAN wizard-audit deliverables (`docs/wizard-audit-2026-04-16.md` on each). Ranks every `WizardState` field by engine impact with file:line citations, identifies dead/low inputs, and proposes step consolidations + feature gaps vs. sibling-engine parity.

## Methodology

- **HIGH** = gates destination filter OR dominates scoring (> ~20 pts swing) OR drives pricing
- **MEDIUM** = moves scoring by 3-15 pts OR meaningfully steers the LLM prompt
- **LOW** = <3 pts impact OR narrow wiring (e.g. only one enum value scored, rest neutral)
- **DEAD** = reaches neither scoring nor prompt (should not exist after this audit)
- **PROMPT-ONLY** = no scoring, but steers the LLM in ways that materially affect output

All file:line references are against `main` as of 2026-04-22 post-commit `f48ad48`.

## Step-by-step field audit

### Step 1 — q-where (destination)

| Field | Type | Rank | Reach | Citation | Notes |
|---|---|---|---|---|---|
| `destinationType` | `"specific" \| "region"` | HIGH | filter + scoring | `query.ts:108-126` | Gates whether we short-circuit to single-city triple or spread across region. |
| `destination` | string | HIGH | filter | `query.ts:108-118` | Required when `destinationType === "specific"`. Fuzzy city/state match. |
| `region` | string | HIGH | filter + scoring | `query.ts:120-126`, `:481-487` (regional diversity) | Gates region filter. |

### Step 2 — q-when (timing + duration)

| Field | Type | Rank | Reach | Citation | Notes |
|---|---|---|---|---|---|
| `flexible` | bool | LOW | prompt derivation | `planner-prompt.ts:231` | Only used to branch display text between "season" vs "target dates". |
| `preferredSeason` | string | MEDIUM | scoring (soft re-rank) | `query.ts:128-132` (filter comment), `:546-548` (soft penalty), `planner-prompt.ts:285-291` | -8 penalty in scoring if destination's `bestSeasons` doesn't include this season. Used to be a hard filter; fixed 2026-04-22. |
| `tripMonth` | string | MEDIUM | prompt + season derivation | `planner-prompt.ts:231,293-298` | Derives season for scoring when user picks a specific month. |
| `tripYear` | string | **LOW** | display only | `planner-prompt.ts:231` | Never affects scoring or filters. Passes through to the LLM prompt as part of a date string. Could be removed with no loss. |
| `numberOfDays` | number (2-7) | HIGH | pricing | `query.ts:173,205` (computePriceIndex), `route.ts:~80-130` (computePriceTargets), `free-plan.ts:55-57` | Drives lodging nights, golf rounds, food days. Also validated in truncation detection (`schedule.length === numberOfDays`). |

### Step 3 — q-crew (crew + skill)

| Field | Type | Rank | Reach | Citation | Notes |
|---|---|---|---|---|---|
| `groupSize` | number (4-20) | HIGH | filter (lodging fit) + scoring + pricing | `query.ts:132-138` (filter), signals.fitsGroup, party-bus fit | Filters out destinations with no lodging ≥ groupSize. Validation caps at 20. Per memory, only ~38 destinations fit 20 guests. |
| `skillMix` | `"All similar" \| "Wide range" \| "Mostly beginners" \| "Here for the vibes"` | MEDIUM | scoring | `query.ts:~555-568` | **Newly wired 2026-04-22** — was PROMPT-ONLY. "Mostly beginners" penalizes bucket-list-heavy destinations (-6) + rewards solid/budget tier (+4). "Wide range" rewards tier spread (+6). "Here for the vibes" shifts weight to nightlife + arrival-day. "All similar" intentionally neutral. |
| `ageRange` | `"20s" \| "30s" \| "40s" \| "Mixed"` | MEDIUM | scoring | `query.ts:~570-580` | **Newly wired 2026-04-22** — was PROMPT-ONLY. "20s" adds late-night + walkable-bar weight. "40s" adds scenic/spa + penalizes party-district overkill. "Mixed" rewards steakhouse + variety. "30s" intentionally neutral. |

### Step 4 — q-golf

| Field | Type | Rank | Reach | Citation | Notes |
|---|---|---|---|---|---|
| `roundsPerDay` | `"One (18)" \| "Two (36)" \| "Let AI decide"` | HIGH | pricing multiplier | `query.ts:51-54,173`, `route.ts:~79-82`, `free-plan.ts:56` | Halves or doubles green-fee cost. "Let AI decide" treated as 2. |
| `courseQuality` | 4 options | HIGH | filter + scoring | `query.ts:73-81,214,240-246` | Maps to `desiredTiers` used for `matchingCourses` count (scored). |
| `walkingOrRiding` | `"Walking" \| "Riding" \| "Mix / Don't care"` | MEDIUM | scoring | `query.ts:~582-590` | **Newly wired 2026-04-22** — was PROMPT-ONLY. "Walking" rewards `sig.walkableCourses` (+4 each, cap 3). "Riding" + "Mix" intentionally neutral. |
| `mustPlayCourses` | free text | HIGH (when filled) | scoring + force-inclusion | `query.ts:220-237,429-433` | +50 pts if course name matched, +30 for city match. Force-includes destination in mid slot. Dominant signal. |

### Step 5 — q-offcourse

| Field | Type | Rank | Reach | Citation | Notes |
|---|---|---|---|---|---|
| `lodging` | `"One big house" \| "Hotel / Resort" \| "Split houses" \| "Don't care"` | MEDIUM | scoring | `query.ts:370-388` | "One big house" +5/-3. "Split houses" +3. **"Hotel / Resort" wired 2026-04-22** (+5 if resort-style available, +3 if medium-population city). "Don't care" intentionally neutral. |
| `dining` | single string | MEDIUM | scoring (after 2026-04-22) | `query.ts:296-330` | **Multi-value wiring added 2026-04-22** — was only scoring "Private chef". Now scores "Steakhouses" (+6/+10 based on density), "Casual & local" (+3/+6), "Mix" (+5 for diversity), "Private chef" (+6, unchanged). **GAP: single-select field** — see parity-gap section. |
| `nightlife` | 4 options | HIGH | scoring (bar weights) | `query.ts:266-294` | "In bed by 10" zeroes bar scoring + pool/tub bonus. "Going out every night" boosts walkable + late-night bars. Others default. |
| `activities` | string[] | MEDIUM | filter + scoring | `query.ts:140-155,334-349` | 7 wizard options → 7 `ActivityType` enum values. Match bonus capped at `min(count, 3) * 8`. |

### Step 6 — q-budget

| Field | Type | Rank | Reach | Citation | Notes |
|---|---|---|---|---|---|
| `budget` | 4 options | HIGH | scoring (gradient) | `query.ts:56-71,249-260` | Gradient scoring: 20 - distance/midBudget * 30. Legacy audit-engine values preserved for backwards compat. |
| `budgetPriorities` | string[] (max 2) | MEDIUM | scoring multipliers | `query.ts:221-223,242,302-307,391-397` | "Best courses" 1.4x course score. "Best dining" 2x + $$$$ bonus. "Best lodging" +4/+3. **"Keep balanced" intentionally neutral** — wizard allows but scoring no-op. |
| `specialRequests` | free text (max 1000) | PROMPT-ONLY | LLM steering | `planner-prompt.ts:277` | Conditionally inserted into user message when non-empty (`"- Special requests: {value}"`). No scoring. Legit free-text escape hatch — keep as-is. |

### Step 7 — q-roster (auth + generate)

| Field | Type | Rank | Reach | Citation | Notes |
|---|---|---|---|---|---|
| `organizerName` | string | LOW | display only | stored, emailed back | Not in scoring or prompt. |
| `organizerEmail` | string | HIGH | auth gate | validated required, stored | Drives session + plan ownership + monthly limits. |
| `attendees` | array | LOW | storage only | passed to `storeAttendees` | Sent share-plan emails can reach them. |
| `authMode` | `"new" \| "login"` | N/A | auth branch | auth path, not scoring | |
| `authPassword` | string | N/A | auth only | stripped before prompt | |

## Recommended cuts

### DEAD (safe to remove)
None after the 2026-04-22 dead-input wire-through.

### LOW candidates (remove or upgrade)
- **`tripYear`** — display-only, never affects scoring. Could derive from `new Date().getFullYear()` or just drop. Low priority.
- **(`specialRequests` was flagged in an earlier draft — retracted: it IS surfaced at `planner-prompt.ts:277` when non-empty. Keep as-is.)**

## Step consolidation proposals (parity with MOH/BESTMAN 9→5 refactor)

TDF currently has **7 steps** (indices 0-6). MOH/BESTMAN went from 9→5 on 2026-04-16. Three proposals:

### Option A — Aggressive 7→5
- Step 1 = Where (`destinationType` + `destination`/`region`)
- Step 2 = When + Crew (`flexible`, `preferredSeason`/`tripMonth`+`tripYear`, `numberOfDays`, `groupSize`, `skillMix`, `ageRange`)
- Step 3 = The Trip (`roundsPerDay`, `courseQuality`, `walkingOrRiding`, `mustPlayCourses`, `lodging`)
- Step 4 = Off-Course + Budget (`dining`, `nightlife`, `activities`, `budget`, `budgetPriorities`, `specialRequests`)
- Step 5 = Roster + Auth (organizer + attendees + password/login)

Saves 2 steps. Steps 2 + 3 become scroll-y but each reveal-on-answer pattern stays.

### Option B — Moderate 7→6
Merge only Step 5 + 6 (Off-Course + Budget) — keeps Crew and Golf steps separate for cleaner progression.

### Option C — Keep 7, cut fields only
Drop `tripYear`, decide on `specialRequests` (wire or cut). No structural change.

**Recommendation: Option C first** (quick win, no refactor risk), then consider Option B after measuring drop-off on steps 3/4.

## Parity gaps vs MOH/BESTMAN wizards

Features MOH/BESTMAN have post-audit that TDF does not:

| # | Feature | MOH/BESTMAN commit | TDF status | Scope |
|---|---|---|---|---|
| 1 | `canAdvance(N)` validation gates per step | MOH PartyWizardClient | **MISSING** — advance is unconditional via Continue button; auto-advance for steppers. User can pass through empty steps. | Logic (in scope) |
| 2 | Multi-select `dining` (`string → string[]`) | MOH 54118b7 | **MISSING** — TDF forces one mode even when users want a mix. | Logic (in scope) |
| 3 | Region + state-subset (`states: string[]`) | MOH ff82652 | **MISSING** — binary region-OR-specific only; can't pick a 2-state subset of a region. | Logic (in scope) |
| 4 | Weekly/monthly quota pill above wizard + loading | MOH/BESTMAN `src/lib/quota.ts` | **MISSING** — TDF has monthly limit in route (`route.ts:337-349`) but no visible indicator. | Logic + light UI |
| 5 | Loading progress bar (server milestones) | BESTMAN 4ceb116 | **MISSING** — TDF has `LOADING_MESSAGES` rotation only. No `progress` events from route. | Logic (server-side events) |
| 6 | "Edit your selections" back CTA from plan result | MOH ff82652 | **MISSING** — user can hit mulligan button on wizard but no explicit back-to-wizard from `/plan/result/[id]`. | Logic + light UI |
| 7 | Per-step canAdvance hint (tells user what's missing) | MOH | **MISSING** | Logic + UI text |
| 8 | Live Playwright smoke as fresh test user | Session verification | **NOT RUN** — I didn't live-test the full flow. | Verification |

## Items I did verify this session

- NDJSON terminal-event guard — client already throws on `!result?.planId` (line ~540), server now emits final error in finally block
- Multi-destination per-tier rendering — `plan/result/[id]/page.tsx` correctly selects `stored.destinations[destLevel]` per tier
- Email `baseUrl` pinned to `https://tourdefore.com` literal — no `VERCEL_URL` fallback bug
- Back-nav preserves state — wizard uses `useReducer` + sessionStorage, back button just `setCurrentQ - 1` (component stays mounted)
- Defense-in-depth array coercion at POST entry — prevents TypeError-missing-array class

## Recommended action set

**Do now (low risk, high value):**
- [ ] Option C: drop `tripYear` (`specialRequests` retracted — verified present at `planner-prompt.ts:277`)
- [ ] Gap #1: `canAdvance` gates per step
- [ ] Gap #4: quota pill above wizard (exists in route, just needs client plumbing)
- [ ] Gap #6: "Edit selections" back CTA on plan result

**Do next (medium — structural):**
- [ ] Gap #2: multi-select `dining: string[]`
- [ ] Gap #5: loading progress bar with 4 server milestones (scouting / generating / enriching / saving)
- [ ] Gap #3: region + state-subset selection

**Defer (separate session, more invasive):**
- [ ] Option B step consolidation (7 → 6)
- [ ] Gap #8: live Playwright smoke verification

## Regression lock-in

Once a decision is made on each gap, update `/tdf-audit` SKILL.md with the final shape. Future audits should flag regressions (e.g., if `dining` reverts to single-select, or if `canAdvance` is removed).
