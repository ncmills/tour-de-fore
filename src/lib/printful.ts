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

// Headwear Printful category IDs (hats, caps, beanies, headbands, truckers, etc.)
const HEADWEAR_CATEGORIES = new Set([40, 42, 46, 217]);

// Accessories: drinkware, koozies, cards, etc.
const ACCESSORIES_CATEGORIES = new Set([112, 238, 264, 292]);

// ── Cost-aware pricing: fetch catalog cost + shipping, ensure 10% margin ──

// Reference shipping address for rate estimation (rates are flat across US)
const SHIPPING_REF_RECIPIENT = {
  address1: "123 Main St",
  city: "Chicago",
  state_code: "IL",
  country_code: "US",
  zip: "60601",
};

async function getCatalogVariantCost(catalogVariantId: number): Promise<number> {
  try {
    const data = await printfulGet(`/products/variant/${catalogVariantId}`);
    return parseFloat(data.result?.variant?.price || "0");
  } catch {
    return 0;
  }
}

async function getShippingRate(catalogVariantId: number): Promise<number> {
  try {
    const res = await fetch(`${PRINTFUL_API}/shipping/rates`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PRINTFUL_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipient: SHIPPING_REF_RECIPIENT,
        items: [{ variant_id: catalogVariantId, quantity: 1 }],
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return 0;
    const data = await res.json();
    const std = data.result?.find((r: { id: string }) => r.id === "STANDARD") || data.result?.[0];
    return parseFloat(std?.rate || "0");
  } catch {
    return 0;
  }
}

// Price = (totalCost + Stripe fixed fee) / (1 - target margin - Stripe %)
// Ensures 10% net profit AFTER Stripe fees AND Printful overhead (tax, digitization, surcharges)
const TARGET_MARGIN = 0.10;
const STRIPE_PERCENT = 0.029;
const STRIPE_FIXED = 0.30;
const PRINTFUL_OVERHEAD = 0.15; // 15% buffer for Printful sales tax (~8%) + digitization + surcharges

function priceWithMarginAfterFees(cost: number, shipping: number): number {
  const totalCost = (cost + shipping) * (1 + PRINTFUL_OVERHEAD);
  return Math.ceil((totalCost + STRIPE_FIXED) / (1 - TARGET_MARGIN - STRIPE_PERCENT));
}

/* eslint-disable @typescript-eslint/no-explicit-any */
async function transformProduct(result: any): Promise<ShopProduct | null> {
  const sp = result.sync_product;
  const svs: any[] = result.sync_variants || [];

  if (svs.length === 0) return null;

  const retailPrice = parseFloat(svs[0].retail_price || "0");
  if (retailPrice <= 0) return null;

  // Fetch cost + shipping for first variant to determine price floor
  const catalogVariantId = svs[0].variant_id;
  const [cost, shipping] = await Promise.all([
    getCatalogVariantCost(catalogVariantId),
    getShippingRate(catalogVariantId),
  ]);

  // Price guarantees 10% net profit after Stripe fees (2.9% + $0.30) and all costs
  const finalPrice = (cost > 0) ? priceWithMarginAfterFees(cost, shipping) : retailPrice;
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

    for (const detail of details) {
      if (!detail) continue;
      const product = await transformProduct(detail.result);
      if (product) products.push(product);
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
