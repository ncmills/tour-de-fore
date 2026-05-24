// ── Printful API Client + Dynamic Product Catalog ──

const PRINTFUL_TOKEN = (process.env.PRINTFUL_API_TOKEN || "").trim();
const PRINTFUL_API = "https://api.printful.com";

// ── Product Types ──

export interface ProductVariant {
  syncVariantId: number; // Printful sync_variant ID (used for orders)
  catalogVariantId: number; // Printful catalog variant ID (used for cost/shipping lookups)
  color: string;
  size?: string;
  sku: string;
}

export interface ShopProduct {
  id: string; // derived from Printful name (e.g. "polo", "bucket")
  printfulProductId: number;
  name: string;
  description: string;
  price: number; // in cents
  displayPrice: string;
  thumbnailUrl: string;
  previewUrl: string;
  colorPreviews: Record<string, string>; // color → preview image URL
  variants: ProductVariant[];
  colors: string[];
  sizes: string[];
  category: "apparel" | "headwear" | "accessories";
}

// ── In-memory cache (5 min TTL) ──

let cachedProducts: ShopProduct[] | null = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000;

// ── Fetch all products from Printful ──

async function printfulGet(path: string) {
  const res = await fetch(`${PRINTFUL_API}${path}`, {
    headers: { Authorization: `Bearer ${PRINTFUL_TOKEN}` },
    next: { revalidate: 300 },
    signal: AbortSignal.timeout(12000), // 12s timeout — keeps webhook under Stripe's 3-min limit
  });
  if (!res.ok) throw new Error(`Printful ${res.status}: ${await res.text()}`);
  return res.json();
}

function deriveId(name: string): string {
  // "TDF POLO" → "polo", "TDF BUCKET" → "bucket", "TDF QZIP" → "qzip"
  return name
    .replace(/^TDF\s+/i, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function deriveDisplayName(name: string): string {
  // "TDF POLO" → "TDF Polo", "TDF BUCKET" → "TDF Bucket"
  return name
    .split(/\s+/)
    .map((w, i) => (i === 0 ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join(" ");
}

// Headwear Printful category IDs (hats, caps, beanies, headbands, truckers,
// rope hats (41), visors (47), etc.)
const HEADWEAR_CATEGORIES = new Set([40, 41, 42, 46, 47, 217]);

// Accessories: drinkware, koozies, cards, etc.
const ACCESSORIES_CATEGORIES = new Set([112, 238, 264, 292]);

// ── Cost-aware pricing: fetch REAL decorated cost (incl. shipping + tax + digitization)
//    via estimate-costs, then price to ensure TARGET_MARGIN (25%) net AFTER Stripe fees ──
//
// HISTORICAL BUG (fixed 2026-04-10): the previous implementation called
// `/products/variant/{id}` which returns the BLANK CATALOG cost (unprinted item).
// That ignored embroidery/print cost, digitization, and Printful tax — and priced
// the trucker at $23 against a real $24.64 cost, losing money on every sale.
// The fix is to call `/orders/estimate-costs` with the sync_variant_id, which
// returns the full decorated cost Printful will actually charge.

// Reference recipient for cost estimation (Illinois is mid-range US tax)
const COST_REF_RECIPIENT = {
  address1: "123 Main St",
  city: "Chicago",
  state_code: "IL",
  country_code: "US",
  zip: "60601",
};

/**
 * Calls Printful /orders/estimate-costs for a single sync_variant and returns
 * the full Printful cost (items + shipping + digitization + tax). This is the
 * ONLY correct cost basis for retail pricing — the blank catalog cost from
 * /products/variant/{id} ignores decoration and will underprice every embroidered item.
 */
async function estimateSyncVariantCost(syncVariantId: number): Promise<number> {
  try {
    const res = await fetch(`${PRINTFUL_API}/orders/estimate-costs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PRINTFUL_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipient: COST_REF_RECIPIENT,
        items: [{ sync_variant_id: syncVariantId, quantity: 1 }],
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      console.error(`estimate-costs ${res.status} for sync_variant ${syncVariantId}`);
      return 0;
    }
    const data = await res.json();
    const total = parseFloat(data.result?.costs?.total || "0");
    return total;
  } catch (err) {
    console.error(`estimate-costs threw for sync_variant ${syncVariantId}:`, err);
    return 0;
  }
}

// Price = (realCost + safetyBuffer + Stripe fixed fee) / (1 - target margin - Stripe %)
// Guarantees TARGET_MARGIN net profit after Stripe fees on the representative cost.
// The 5% safety buffer absorbs state-to-state tax variance (CA > IL by ~3%) and
// Printful price bumps between cache refreshes.
const TARGET_MARGIN = 0.25;
const STRIPE_PERCENT = 0.029;
const STRIPE_FIXED = 0.30;
const COST_SAFETY_BUFFER = 0.05; // 5% cushion on top of estimate-costs total

function priceWithMarginAfterFees(realCost: number): number {
  const paddedCost = realCost * (1 + COST_SAFETY_BUFFER);
  return Math.ceil((paddedCost + STRIPE_FIXED) / (1 - TARGET_MARGIN - STRIPE_PERCENT));
}

/* eslint-disable @typescript-eslint/no-explicit-any */
async function transformProduct(result: any): Promise<ShopProduct | null> {
  const sp = result.sync_product;
  const allSvs: any[] = result.sync_variants || [];

  // Only sell variants Printful can actually fulfill. `availability_status`
  // catches restock gaps like "temporary_out_of_stock" (e.g. ROPE / Yellow-Navy)
  // — a swatch the customer can select but Printful can't ship produces a failed
  // order. Variants flagged anything other than "active" are dropped so the color
  // never appears. (Catalog-level discontinuations report "active" but fail at
  // estimate-costs — those are caught by the unfulfillable guard in fetchShopProducts.)
  const svs = allSvs.filter((sv) => sv.availability_status === "active");
  if (svs.length === 0) return null;

  const retailPrice = parseFloat(svs[0].retail_price || "0");
  if (retailPrice <= 0) return null;

  // Fetch REAL decorated cost (items + shipping + digitization + tax) via
  // /orders/estimate-costs. This is the ONLY correct cost basis — the blank
  // catalog cost from /products/variant/{id} ignores embroidery and underprices.
  const syncVariantId = svs[0].id;
  const realCost = await estimateSyncVariantCost(syncVariantId);

  // Price guarantees 10% net profit after Stripe fees on the real Printful cost.
  // If estimate-costs failed (returned 0), fall back to whatever retail_price
  // Nick set in Printful — that's better than underpricing at blank cost.
  const finalPrice = (realCost > 0) ? priceWithMarginAfterFees(realCost) : retailPrice;
  const priceCents = Math.round(finalPrice * 100);

  // Build variants, colors, sizes, and colorPreviews
  const variants: ProductVariant[] = [];
  const colorSet = new Set<string>();
  const sizeSet = new Set<string>();
  const colorPreviews: Record<string, string> = {};

  for (const sv of svs) {
    const color = sv.color || "Default";
    const size = sv.size || undefined;
    colorSet.add(color);
    if (size) sizeSet.add(size);

    variants.push({
      syncVariantId: sv.id,
      catalogVariantId: sv.variant_id,
      color,
      size,
      sku: sv.sku || "",
    });

    // Extract preview image for this color from files
    if (!colorPreviews[color]) {
      const previewFile = (sv.files || []).find((f: any) => f.type === "preview");
      if (previewFile?.preview_url) {
        colorPreviews[color] = previewFile.preview_url;
      }
    }
  }

  const mainCat = svs[0].main_category_id;
  const category = HEADWEAR_CATEGORIES.has(mainCat)
    ? "headwear"
    : ACCESSORIES_CATEGORIES.has(mainCat)
      ? "accessories"
      : "apparel";

  return {
    id: deriveId(sp.name),
    printfulProductId: sp.id,
    name: deriveDisplayName(sp.name),
    description: "Embroidered TDF crest.",
    price: priceCents,
    displayPrice: `$${finalPrice.toFixed(0)}`,
    thumbnailUrl: sp.thumbnail_url || "",
    previewUrl: sp.thumbnail_url || "",
    colorPreviews,
    variants,
    colors: [...colorSet],
    sizes: [...sizeSet],
    category,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function fetchShopProducts(): Promise<ShopProduct[]> {
  // Return cache if fresh
  if (cachedProducts && Date.now() - cacheTime < CACHE_TTL) {
    return cachedProducts;
  }

  if (!PRINTFUL_TOKEN) {
    console.error("PRINTFUL_API_TOKEN not set — returning empty catalog");
    return cachedProducts || [];
  }

  try {
    const listData = await printfulGet("/store/products");
    const ids: number[] = (listData.result || []).map((p: { id: number }) => p.id);

    const products: ShopProduct[] = [];
    // Fetch product details with concurrency limit (5 at a time to avoid Printful rate limits)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const details: (any | null)[] = [];
    for (let i = 0; i < ids.length; i += 5) {
      const batch = ids.slice(i, i + 5);
      const batchResults = await Promise.all(
        batch.map((id) => printfulGet(`/store/products/${id}`).catch(() => null))
      );
      details.push(...batchResults);
    }

    // Track products EXCLUDED (negative margin OR unfulfillable) so we can alert Nick.
    const excluded: Array<{ id: string; reason: string; price?: number; cost?: number; netLoss?: number }> = [];

    for (const detail of details) {
      if (!detail) continue;
      const product = await transformProduct(detail.result);
      if (!product) continue;

      // SAFETY NET: never serve a product we can't fulfill or that loses money.
      // Estimate the FIRST AVAILABLE variant (transformProduct already dropped
      // out-of-stock ones). A failed estimate (cost 0) means the catalog variant
      // is unavailable/discontinued even though the sync status reads "active"
      // (e.g. BUCKET / Columbia Booney Hat) — selling it would produce an
      // unfulfillable order, so it must NOT go live.
      const firstSync = product.variants[0]?.syncVariantId;
      if (firstSync) {
        const realCost = await estimateSyncVariantCost(firstSync);
        if (realCost <= 0) {
          excluded.push({ id: product.id, reason: "unfulfillable — Printful cost estimate failed (discontinued/unavailable catalog variant)" });
          continue; // DO NOT add — customers would place an order Printful cannot ship
        }
        const retail = product.price / 100; // cents → dollars
        const stripeFees = retail * STRIPE_PERCENT + STRIPE_FIXED;
        const net = retail - realCost - stripeFees;
        if (net <= 0) {
          excluded.push({ id: product.id, reason: "negative margin", price: retail, cost: realCost, netLoss: net });
          continue; // DO NOT add — customers literally cannot buy a losing-money product
        }
      }

      products.push(product);
    }

    // If anything was excluded, fire a critical alert email (non-blocking)
    if (excluded.length > 0) {
      import("./email").then(({ sendEmail }) => {
        sendEmail({
          to: "info@tourdefore.com",
          subject: `CRITICAL: ${excluded.length} shop product(s) excluded (negative margin or unfulfillable)`,
          html: `<p>The following shop products were HIDDEN from the catalog — either retail is below Printful cost + Stripe fees, or Printful cannot fulfill the variant (discontinued/out-of-stock catalog variant):</p><pre>${JSON.stringify(excluded, null, 2)}</pre><p>Action required: raise retail prices, or fix/replace the unavailable Printful variant (re-pick an in-stock product or color). The shop is still live but these items cannot be sold until fixed.</p>`,
          critical: true,
        }).catch(() => {});
      }).catch(() => {});
      console.error("Shop products excluded (negative margin or unfulfillable):", excluded);
    }

    // Sort: apparel → headwear → accessories, alphabetical within each group
    const catOrder = { apparel: 0, headwear: 1, accessories: 2 };
    products.sort((a, b) => {
      const ca = catOrder[a.category] ?? 9, cb = catOrder[b.category] ?? 9;
      if (ca !== cb) return ca - cb;
      return a.name.localeCompare(b.name);
    });

    cachedProducts = products;
    cacheTime = Date.now();
    return products;
  } catch (err) {
    console.error("Failed to fetch Printful products:", err);
    // Return stale cache if available
    return cachedProducts || [];
  }
}

// ── Lookup helpers (async — fetches catalog if needed) ──

export async function getProductById(id: string): Promise<ShopProduct | undefined> {
  const products = await fetchShopProducts();
  return products.find((p) => p.id === id);
}

export async function findVariant(productId: string, color: string, size?: string): Promise<ProductVariant | undefined> {
  const product = await getProductById(productId);
  if (!product) return undefined;
  return product.variants.find((v) =>
    v.color === color && (size ? v.size === size : true)
  );
}

// ── Printful API (order management) ──

interface PrintfulOrderItem {
  sync_variant_id: number;
  quantity: number;
}

interface PrintfulRecipient {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state_code: string;
  country_code: string;
  zip: string;
  email: string;
}

// Check if a Printful order already exists with a given external_id
// Returns { id, status } if found, null if confirmed not found, throws on network error
export async function checkPrintfulOrderExists(externalId: string): Promise<{ id: number; status: string } | null> {
  if (!PRINTFUL_TOKEN) return null;

  const res = await fetch(`${PRINTFUL_API}/orders/@${externalId}`, {
    headers: { Authorization: `Bearer ${PRINTFUL_TOKEN}` },
    signal: AbortSignal.timeout(8000),
  });

  if (res.ok) {
    const data = await res.json();
    if (data.result?.id) {
      return { id: data.result.id, status: data.result.status };
    }
  }

  // 404 means order truly doesn't exist — safe to create
  if (res.status === 404) return null;

  // Any other error (500, 429, network) — throw so caller can decide to retry or halt
  throw new Error(`Printful order check failed for ${externalId}: ${res.status}`);
}

export async function createPrintfulOrder(
  items: PrintfulOrderItem[],
  recipient: PrintfulRecipient,
  externalId?: string
): Promise<{ id: number; status: string } | null> {
  if (!PRINTFUL_TOKEN) {
    console.error("PRINTFUL_API_TOKEN not set");
    return null;
  }

  // Distributed lock: prevent concurrent creation of the same order
  let lockKey: string | null = null;
  let redis: Awaited<ReturnType<typeof import("./redis")["getRedis"]>> | null = null;

  if (externalId) {
    const { getRedis } = await import("./redis");
    redis = getRedis();
    lockKey = `order-lock:${externalId}`;
    const acquired = await redis.set(lockKey, "1", "EX", 30, "NX"); // 30s lock
    if (!acquired) {
      // Another process is creating this order — poll until it appears or timeout
      for (let i = 0; i < 5; i++) {
        const existing = await checkPrintfulOrderExists(externalId);
        if (existing) return existing;
        await new Promise((r) => setTimeout(r, 1000));
      }
      console.warn(`Order lock timeout for ${externalId} — order not found after 5s`);
      return null;
    }
  }

  try {
    // Dedup: check if this order already exists in Printful
    if (externalId) {
      const existing = await checkPrintfulOrderExists(externalId);
      if (existing) {
        console.log(`Printful order already exists for ${externalId}: #${existing.id} (${existing.status})`);
        return existing;
      }
    }

    const res = await fetch(`${PRINTFUL_API}/orders?confirm=true`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PRINTFUL_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        external_id: externalId,
        recipient,
        items,
      }),
      signal: AbortSignal.timeout(15000), // 15s timeout for order creation
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Printful order creation failed:", res.status, err);
      throw new Error(`Printful ${res.status}: ${err}`);
    }

    const data = await res.json();
    return { id: data.result.id, status: data.result.status };
  } finally {
    if (lockKey && redis) {
      await redis.del(lockKey).catch(() => {});
    }
  }
}
