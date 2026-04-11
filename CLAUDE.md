# Tour de Fore — Claude Code Instructions

## Deploy Workflow

As of 2026-04-10 this project is connected to GitHub via the Vercel GitHub App. A push to `main` auto-builds and auto-promotes `tour-de-fore` to production.

- **Deploy:** `git add` → `git commit` → `git push origin main`. Vercel handles the rest.
- **Do NOT run `vercel --prod` manually** unless a build is stuck or Nick explicitly asks.
- PRs automatically get preview URLs.

## Post-deploy smoke test (MANDATORY for any fulfillment/pricing/shop change)

After ANY deploy that touches `src/lib/printful.ts`, `src/lib/shop-fulfillment.ts`,
`src/app/api/verify-order/**`, `src/app/api/cron/**`, `src/app/api/checkout/**`,
or `src/app/api/health/**`, run:

```bash
npx vercel env pull .env.prod --environment production --yes
source .env.prod
npx tsx scripts/post-deploy-smoke.ts
rm .env.prod
```

The script asserts: (1) all 10 products have positive net margin after Stripe fees,
(2) `/api/health/orders` returns 200 ok, (3) `verify-order` on a known session
returns `already_submitted`. Exits non-zero on any failure — if it fails, roll
back the deploy immediately (`git revert HEAD && git push`).

## Shop fulfillment invariants (NEVER violate)

1. **No Stripe webhook.** Shop fulfillment goes through `fulfillShopOrder()` in
   `src/lib/shop-fulfillment.ts`, called from `/api/verify-order` (success page)
   and `/api/cron/sync-orders` (every 5 min). If you see `src/app/api/webhook/`,
   it's a regression — delete it.
2. **Never pass `expand: ["shipping_details"]` to stripe retrieve.** Stripe's
   current SDK rejects it. Shipping is on the base session object; `extractShipping`
   handles all fallbacks.
3. **External IDs ≤32 chars.** Printful's real limit is 32 (docs say 64 but
   they lie). Always use `buildExternalId(sessionId)` — never inline construction.
4. **Pricing MUST use `estimate-costs`, not `products/variant/{id}`.** The
   latter returns the BLANK catalog cost and will silently underprice any
   embroidered item. `fetchShopProducts` excludes any product with net ≤ 0
   from the catalog as a last-ditch safety net.
5. **Margins guarded by a daily cron.** `/api/cron/check-margins` runs daily
   at 13:00 UTC and emails `info@tourdefore.com` if any product drops below
   10% net or 5% net (critical).
