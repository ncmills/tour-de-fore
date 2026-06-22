# Tour de Fore — Design System

> **Status:** Codified 2026-06-21 from the live brand. This is a *descriptive* system — it
> documents what `src/app/globals.css` + `src/app/layout.tsx` already ship, names the intended
> brand, and flags the drift to migrate toward over time. It is **not** a redesign. Nothing here
> changes the look of the site.
>
> **Source of truth:** tokens live in `src/app/globals.css` (`@theme inline`), fonts in
> `src/app/layout.tsx`. When you change those, update this doc.
>
> **Visual companion:** `docs/design-system.html` — open it in a browser to see swatches, font
> specimens, and live component examples rendered in the real fonts.

---

## 1. Brand essence

Tour de Fore is a **raunchy bachelor golf-trip** brand with a **dive-bar-after-dark** soul.
Six years of fairways, questionable handicaps, and devils. The tagline — *"Hell is empty, all the
devils are here."* — sets the register: irreverent, a little dangerous, never corporate.

The visual North Star is **"dark but readable."** Backgrounds are near-black zinc; the one hot
accent is **ember orange**; type swings from clean (Space Grotesk / Inter) to neon-sign and
circus-poster faces depending on the "scene" (homepage, wizard, shop). Motion is flickering neon,
not smooth corporate easing.

**Feels like:** a neon bar sign at 1am · a vintage golf-club crest gone rogue · a Vegas marquee.
**Never:** blue corporate SaaS · flat material design · uppercase-everything · sterile.

---

## 2. Logo & brand mark

The mark is a **devil's trident topped with a golf flag** — the whole brand pun in one icon
(trident = hell/devil, flag = "Fore"). All variants below are **canonical: do not recolor, redraw,
or restyle them.** Pick the right variant for the context; never regenerate the art. Rendered
versions are in `docs/design-system.html`.

| Variant | Asset | Dimensions | Component / use |
|---------|-------|-----------|-----------------|
| **Primary mark** | `/logo-icon.png` | 660×977 | `<Logo/>` — nav, footer, small accents. Gold-bronze trident + ember flag. THE icon. |
| **Glow variant** | `/logo.webp` | 1664×2586 | Luminous white-hot trident+flag for dark neon / hero moments. |
| **Horizontal lockup** | `/logo-full.webp` | 4504×3776 | `<LogoFull/>` — hero, large displays. Outline trident + "TOUR DE FORE · EST. 2021" wordmark. |
| **Lockup master** | `/tdf-logo.png` | 4504×3776 | Hi-res source of the lockup. Use `logo-full.webp` in-app; this is the export master. |
| **Stacked badge** | `/logo-est2021.webp` | 3968×4232 | Compact vertical badge — trident over serif "Est. 2021". |
| **Simplified icon** | `/icon-fancy.png` | 1920×2196 | Flatter gold trident+flag — alternative icon. |
| **Devil avatar** | `/devil-avatar.png` | 552×452 | Round red devil face — login / avatar UI. Personality mark, *not* the logo. |
| **Devil mascot** | `/devil-mascot.webp` | 1838×2304 | Full-body red devil with trident — playful big moments. Character, *not* the logo. |

**Logo rules**
- **Never alter these assets** — no recolor, no redraw, no AI-regenerated variants.
- Ember flag + gold trident is the canonical mark. Reach for `<Logo/>` (icon) or `<LogoFull/>` (lockup).
- Glow variant only on dark neon scenes; wordmark lockup for hero/large.
- The devil **avatar/mascot are personality, not the logo** — never substitute them for the mark.

The two React entry points live in `src/components/Logo.tsx` (`Logo`, `LogoFull`).

---

## 3. Color system

All colors are `@theme inline` tokens in `globals.css`, consumable as Tailwind utilities
(`bg-bg`, `text-accent`, `border-border`, …). Grouped by **role**:

### Surfaces (the dark stack)
| Token | Hex | Role |
|-------|-----|------|
| `--color-bg` | `#18181B` | Page background. The base everything sits on. |
| `--color-bg-alt` / `--color-bg-warm` | `#1E1E22` | Alternating section / slightly-warmer panel. |
| `--color-bg-card` | `#27272A` | Card / raised surface. |
| `--color-surface` | `#F5F0E8` | The one **light** surface (warm cream) — for inverted/paper contexts (e.g. print, light cards). Use sparingly. |
| `--color-border` | `#3F3F46` | Default hairline border. |
| `--color-border-light` | `#52525B` | Higher-contrast border / hover. |

### Text
| Token | Hex | Role |
|-------|-----|------|
| `--color-text` | `#FAFAFA` | Primary text. |
| `--color-text-muted` | `#A1A1AA` | Secondary / supporting copy. |
| `--color-text-dim` | `#71717A` | Tertiary / captions / disabled. |

### Accent — **ember is the one true accent**
| Token | Hex | Role |
|-------|-----|------|
| `--color-accent` / `--color-fire` / `--color-ember` | `#EA580C` | **The** brand accent. Primary buttons, links, focus ring, selection. All three names alias the same orange — prefer `--color-accent`. |
| `--color-accent-hover` / `--color-fire-hover` / `--color-ember-dim` | `#C2410C` | Hover/pressed state of the accent. |
| `--color-accent-light` | `#F97316` | Lighter ember for highlights/gradients. |
| `--color-neon` | `#FF6A28` | Neon-sign orange — only for glowing neon text (`.neon-stats-text`, taglines). Brighter than accent because it carries a text-shadow glow. |

### Secondary brand colors (use intentionally, not decoratively)
| Token | Hex | Role |
|-------|-----|------|
| `--color-gold` | `#D4A843` | Premium / tier / "pick" highlight. |
| `--color-gold-dim` | `#B8922F` | Dimmer gold. |
| `--color-green` | `#2D5A3F` | Golf-course green — fairway/course accents. |
| `--color-green-light` | `#3A7050` | Lighter course green. |

### Tag/category accents (chips & badges ONLY)
Trip-builder and destination pages tag venues/courses by category. These are the **only**
sanctioned colors for those chips — brand-adjacent neon, *not* general-purpose accents. Never use
them for buttons, links, or chrome.

| Token | Hex | Used by |
|-------|-----|---------|
| `--color-magenta` | `#DB2777` | **Nightlife / "Late Night"** chips — neon dive-bar pink. (Replaced the off-brand `#7c3aed` purple, 2026-06-22.) |
| `--color-amber` | `#F59E0B` | **"Balances Budget"** / value-signal chips. (Replaced the off-brand `#93c5fd` blue, 2026-06-22.) |

Low-alpha chip text variants live in `TripBuilderClient.tsx` `TAG_COLORS` (`magenta` → `#f472b6`,
`amber` → `#fbbf24`). Tier/notability chips reuse `gold`; value/walkable chips reuse `green`; the
hero "pick" reuses `accent`/`red`.

**Rules**
- **Ember `#EA580C` is the only accent.** Don't introduce blues, purples, or a second "brand"
  color. Gold/green are *secondary* and scene-specific, not general-purpose accents. The
  `--color-magenta`/`--color-amber` tag tokens are the **sole** exception — small category chips
  only, never chrome.
- The three ember aliases (`accent` / `fire` / `ember`) are intentional synonyms — pick
  `--color-accent` for new work; the others exist for legacy call-sites.
- `--color-surface` (cream) is the only light value — never use it as a general text color on dark.

---

## 4. Typography

The brand ships **12 typefaces** (loaded in `layout.tsx`, all `display: swap`). That's a lot — but
they form a clear **3-tier hierarchy**. Each font is exposed as a CSS var; reach for the right tier,
don't sprinkle scene fonts everywhere.

### Tier 1 — Core (the everyday system)
| Var | Typeface | Weights | Use for | Files |
|-----|----------|---------|---------|-------|
| `--font-body` (= `--font-inter`) | **Inter** | 400–700 | All body copy, UI, buttons, forms. The default. | 21 |
| `--font-display` (= `--font-space`) | **Space Grotesk** | 500/600/700 | Clean headings (`h1–h4` default per `globals.css`). | 4 |
| `--font-accent` (= `--font-instrument`) | **Instrument Serif** | 400 + italic | Editorial accent / pull quotes / elegant contrast. | 3 |

> ⚠️ **Documented drift:** `globals.css` sets `h1–h4` to `--font-display` (Space Grotesk), but the
> most-used display face on the site is actually **Bebas Neue** (`--font-plan-block`, 37 files —
> see Tier 2). Space Grotesk is the *intended* clean-heading default; Bebas is the *de facto* neon
> display face. Both are correct in their scenes — just know which you're reaching for. Don't
> "fix" this by mass-swapping; it's two different jobs.

### Tier 2 — Scene workhorses (recurring, themed)
| Var | Typeface | Use for | Files |
|-----|----------|---------|-------|
| `--font-plan-block` | **Bebas Neue** | The neon-sign display face — homepage stats, taglines, plan blocks. Pairs with `.neon-stats-text`. The real workhorse. | 37 |
| `--font-scrawl` | **Permanent Marker** | Hand-scrawled labels, "drunk" / graffiti energy. | 11 |
| `--font-plan-groovy` | **Lilita One** | Chunky rounded headers in the plan/wizard flow. | 8 |
| `--font-plan-script` | **Pacifico** | Casual script accents in the plan flow. | 5 |
| `--font-script` | **Caveat** | Handwritten notes / captions. | 4 |

### Tier 3 — One-off scene fonts (use only in their scene)
| Var | Typeface | Scene | Files |
|-----|----------|-------|-------|
| `--font-shop-circus` | **Rye** | Shop — circus/Western poster headers. | 2 |
| `--font-shop-script` | **Lobster** | Shop — retro script. | 2 |
| `--font-slab-cold` | **Alfa Slab One** | Heavy cold slab display (impact moments). | 2 |
| `--font-blackletter` | **Blaka Hollow** | Gothic/blackletter (devil/"hell" moments). | 2 |

### Type rules
- **Headings are sentence-case, never `text-transform: uppercase`** (explicit rule in
  `globals.css`). Bebas Neue *looks* all-caps because the glyphs are — that's fine; don't add
  `uppercase` on top.
- `h1–h4`: `line-height: 1.2`, `font-weight: 700`, `letter-spacing: -0.02em`.
- Body: `line-height: 1.6`, `font-size: 16px`.
- Tier-3 fonts are `preload: false` — only `Inter` + `Space Grotesk` preload. Don't promote a
  scene font to a global heading without considering the load cost.

---

## 5. Spacing & radius scale

### Spacing
Use the Tailwind v4 default spacing scale (`p-2` = 8px, `p-4` = 16px, …). Section rhythm in the
wild clusters on **4 / 8 / 12 / 16 / 24 px**. Prefer Tailwind utilities over inline `style`.

### Radius — **canonical scale (migrate toward this)**
Inline `borderRadius` is currently drift: the codebase ships 1, 2, 3, 4, 5, 6, 8, 10, 12, 16px with
no system. The intended scale:

| Token (proposed) | px | Use for |
|------|-----|---------|
| `xs` | 4px | Chips, tags, tiny controls. |
| `sm` | 6px | Inputs, small cards. |
| `md` | 10px | **Buttons** (`.btn-primary`/`.btn-outline` use 10px), default cards. |
| `lg` | 16px | Large feature cards / modals. |
| `full` | 9999px | Pills, avatars. |

**Rule:** new work should pick from this scale, not invent a new px value. Buttons are 10px — match
that for primary interactive elements.

---

## 6. Component primitives

These are the real reusable building blocks already in `globals.css` / `src/components/`. **Use a
primitive before inline-styling a new one** — most current buttons are hand-rolled inline (only
3 files use `.btn-primary`), which is the drift this system exists to reverse.

### CSS-class primitives (`globals.css`)
| Primitive | What it is | Use when |
|-----------|-----------|----------|
| `.btn-primary` | Solid ember button, 10px radius, 15/35 padding, weight 600, no uppercase. | Primary CTA. |
| `.btn-outline` | Transparent + 2px ember border, fills ember on hover. | Secondary CTA. |
| `.rule-accent` | 1px horizontal rule, transparent→border→transparent gradient. | Neutral section divider. |
| `.rule-ember` | Same, but ember-tinted. | Accented divider / hot section break. |
| `.card-hover` | Lift + shadow on hover (`translateY(-4px)`, cubic-bezier). | Interactive cards. |
| `.nav-glass` | Frosted nav: `rgba(24,24,27,.92)` + `blur(20px) saturate(1.3)`. | Sticky/fixed nav bars. |
| `.neon-stats-text` | Bebas Neue, uppercase, ember-neon `#FF6A28` with layered text-shadow glow. | Glowing neon stat/marquee text. Pair with `.neon-stats` for the flicker animation. |
| `.flame-glow` | Pulsing ember box-shadow (2.5s loop). | "TDF PICK" / hot cards in the trip builder. |
| `.img-shimmer` | Zinc shimmer loading placeholder. | Image skeletons. |
| `.skip-to-content` | Accessible skip link (off-screen until focus). | Top of every page. |
| `.home-link` | Homepage nav link with ember text-shadow hover. | Homepage-scene nav only. |

### React component primitives (`src/components/`)
| Component | Purpose |
|-----------|---------|
| `SelectionCard.tsx` | The canonical selectable option card (wizard / trip builder). |
| `Nav.tsx` / `Footer.tsx` | Site chrome. |
| `NetworkFooter.tsx` | Cross-portfolio network footer (shared infra — `sameAs` interlink). |
| `FadeIn.tsx` | Scroll-reveal wrapper (respects reduced-motion). |
| `Breadcrumbs.tsx` / `PlanBreadcrumb.tsx` | Breadcrumb trails. |
| `MulliganButton.tsx` / `HomeButton.tsx` | The themed back ("mulligan") + home controls. |
| `EmailCapture.tsx` | Email opt-in block. |

> For the full 55-component inventory, see `src/components/`. The table above is the primitives you
> should reuse rather than rebuild.

---

## 7. Motion

Named keyframes in `globals.css`. The brand's motion identity is **flickering neon**, not smooth
corporate easing.

| Animation | What it does | Used by |
|-----------|--------------|---------|
| `neonFlicker` / `neonTaglineFlicker` | Irregular opacity flicker like a failing neon sign. | `.neon-stats`, neon taglines. Has a separate gentler mobile variant. |
| `flameGlow` | Pulsing ember box-shadow. | `.flame-glow` cards. |
| `glowPulse` | Soft ember glow pulse for CTA emphasis. | CTA emphasis. |
| `shimmer` | Loading-skeleton sweep. | `.img-shimmer`. |
| `bloodDrip` | Drip-down reveal (devil/hell theming). | Themed accents. |
| `beerCanDraw` | SVG stroke-draw of a beer can. | `MulliganButton`. |

**Contract:** every animation must degrade under `prefers-reduced-motion: reduce` — `globals.css`
globally kills animation/transition/transform under that query. Don't ship motion that ignores it.

---

## 8. Accessibility & print

- **Focus ring:** `:focus-visible` → 2px ember outline + 4px ember glow. Don't remove it (the only
  exception is `.wizard-input`, intentionally suppressed).
- **Skip link:** `.skip-to-content` present on every page; targets `#main-content`.
- **Tap targets:** mobile controls enforce **44×44px minimum** (see the `@media (max-width:640px)`
  block — mulligan/home/tier/cart buttons all preserve 44px even when visuals shrink).
- **Mobile-first fixes never break desktop:** all responsive overrides are scoped inside
  `@media (max-width: 640px)`. Keep them there.
- **Print:** a full `@media print` stylesheet turns itineraries light, strips nav/footer/animations,
  expands clamped content, and appends URLs to external links. Test any itinerary change against
  print.

---

## 9. Do / Don't

**Do**
- Use **ember `#EA580C`** as the single accent. Reach for `--color-accent`.
- Reuse a **primitive** (`.btn-primary`, `SelectionCard`, …) before inline-styling a new one.
- Pick fonts by **tier** — Inter/Space for the everyday system; scene fonts only in their scene.
- Pick radius/spacing from the **scale** (buttons = 10px).
- Keep responsive overrides inside `@media (max-width:640px)`; preserve 44px tap targets.
- Respect `prefers-reduced-motion` on every animation.

**Don't**
- ❌ Add a second brand/accent color (no blue, no purple).
- ❌ `text-transform: uppercase` on headings (Bebas is already caps-shaped).
- ❌ Inline-style a one-off button/card when a primitive exists.
- ❌ Promote a Tier-3 scene font (Rye, Lobster, Blaka Hollow…) to a global heading.
- ❌ Invent a new `borderRadius` px value outside the scale.
- ❌ Let a mobile fix change desktop layout.
- ❌ Go corporate. This is a neon dive-bar, not a SaaS dashboard.
