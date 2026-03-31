// ── Printful API Client + Product Catalog ──

const PRINTFUL_TOKEN = (process.env.PRINTFUL_API_TOKEN || "").trim();
const PRINTFUL_API = "https://api.printful.com";

// ── Product Catalog (synced from Printful) ──

export interface ProductVariant {
  syncVariantId: number; // Printful sync_variant ID (used for orders)
  color: string;
  size?: string;
  sku: string;
}

export interface ShopProduct {
  id: string; // our internal ID
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
  category: "apparel" | "headwear";
}

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "polo",
    printfulProductId: 426229688,
    name: "TDF Polo",
    description: "Performance stretch polo. Embroidered TDF crest on chest.",
    price: 10000,
    displayPrice: "$100",
    thumbnailUrl: "https://files.cdn.printful.com/files/3bf/3bf9d4b707e593640195fe7615462a69_preview.png",
    previewUrl: "https://files.cdn.printful.com/files/3bf/3bf9d4b707e593640195fe7615462a69_preview.png",
    colorPreviews: {
      "Black Melange": "https://files.cdn.printful.com/files/3bf/3bf9d4b707e593640195fe7615462a69_preview.png",
      "Collegiate Navy Melange": "https://files.cdn.printful.com/files/a02/a024d009706208073e7e53e1c9ff7776_preview.png",
      "Collegiate Royal Melange": "https://files.cdn.printful.com/files/2fd/2fd4f33419096416bc7d4969f0b485ba_preview.png",
      "Grey One Heather": "https://files.cdn.printful.com/files/bed/bedd53460cf90c0dee1788e0b451db57_preview.png",
    },
    category: "apparel",
    colors: ["Black Melange", "Collegiate Navy Melange", "Collegiate Royal Melange", "Grey One Heather"],
    sizes: ["L", "XL", "2XL", "3XL"],
    variants: [
      { syncVariantId: 5252493756, color: "Black Melange", size: "L", sku: "69CBD61F91D5D_Black-Melange-L" },
      { syncVariantId: 5252493757, color: "Black Melange", size: "XL", sku: "69CBD61F91D5D_Black-Melange-XL" },
      { syncVariantId: 5252493758, color: "Black Melange", size: "2XL", sku: "69CBD61F91D5D_Black-Melange-2XL" },
      { syncVariantId: 5252493759, color: "Black Melange", size: "3XL", sku: "69CBD61F91D5D_Black-Melange-3XL" },
      { syncVariantId: 5252493760, color: "Collegiate Navy Melange", size: "L", sku: "69CBD61F91D5D_Collegiate-Navy-Melange-L" },
      { syncVariantId: 5252493761, color: "Collegiate Navy Melange", size: "XL", sku: "69CBD61F91D5D_Collegiate-Navy-Melange-XL" },
      { syncVariantId: 5252493762, color: "Collegiate Navy Melange", size: "2XL", sku: "69CBD61F91D5D_Collegiate-Navy-Melange-2XL" },
      { syncVariantId: 5252493763, color: "Collegiate Navy Melange", size: "3XL", sku: "69CBD61F91D5D_Collegiate-Navy-Melange-3XL" },
      { syncVariantId: 5252493764, color: "Collegiate Royal Melange", size: "L", sku: "69CBD61F91D5D_Collegiate-Royal-Melange-L" },
      { syncVariantId: 5252493765, color: "Collegiate Royal Melange", size: "XL", sku: "69CBD61F91D5D_Collegiate-Royal-Melange-XL" },
      { syncVariantId: 5252493766, color: "Collegiate Royal Melange", size: "2XL", sku: "69CBD61F91D5D_Collegiate-Royal-Melange-2XL" },
      { syncVariantId: 5252493767, color: "Collegiate Royal Melange", size: "3XL", sku: "69CBD61F91D5D_Collegiate-Royal-Melange-3XL" },
      { syncVariantId: 5252493768, color: "Grey One Heather", size: "L", sku: "69CBD61F91D5D_Grey-One-Heather-L" },
      { syncVariantId: 5252493769, color: "Grey One Heather", size: "XL", sku: "69CBD61F91D5D_Grey-One-Heather-XL" },
      { syncVariantId: 5252493770, color: "Grey One Heather", size: "2XL", sku: "69CBD61F91D5D_Grey-One-Heather-2XL" },
      { syncVariantId: 5252493771, color: "Grey One Heather", size: "3XL", sku: "69CBD61F91D5D_Grey-One-Heather-3XL" },
    ],
  },
  {
    id: "qzip",
    printfulProductId: 426229505,
    name: "TDF Quarter-Zip",
    description: "Performance stretch fleece. Embroidered TDF crest on chest.",
    price: 15000,
    displayPrice: "$150",
    thumbnailUrl: "https://files.cdn.printful.com/files/af7/af71457c0e6c826d3ad34576b68ac573_preview.png",
    previewUrl: "https://files.cdn.printful.com/files/af7/af71457c0e6c826d3ad34576b68ac573_preview.png",
    colorPreviews: {
      "Black": "https://files.cdn.printful.com/files/af7/af71457c0e6c826d3ad34576b68ac573_preview.png",
      "Collegiate Navy": "https://files.cdn.printful.com/files/b2c/b2ce4da89fd9431a9e13dda85d16ebb9_preview.png",
      "Black Heather": "https://files.cdn.printful.com/files/5ec/5ec79803000c50c4c45d09a94de870fe_preview.png",
      "White": "https://files.cdn.printful.com/files/11d/11d353905deccefa96dc65405a55970a_preview.png",
    },
    category: "apparel",
    colors: ["Black", "Collegiate Navy", "Black Heather", "White"],
    sizes: ["L", "XL", "2XL", "3XL"],
    variants: [
      { syncVariantId: 5252492585, color: "Black", size: "L", sku: "69CBD5B5607B9_Black-L" },
      { syncVariantId: 5252492586, color: "Black", size: "XL", sku: "69CBD5B5607B9_Black-XL" },
      { syncVariantId: 5252492587, color: "Black", size: "2XL", sku: "69CBD5B5607B9_Black-2XL" },
      { syncVariantId: 5252492588, color: "Black", size: "3XL", sku: "69CBD5B5607B9_Black-3XL" },
      { syncVariantId: 5252492589, color: "Collegiate Navy", size: "L", sku: "69CBD5B5607B9_Collegiate-Navy-L" },
      { syncVariantId: 5252492590, color: "Collegiate Navy", size: "XL", sku: "69CBD5B5607B9_Collegiate-Navy-XL" },
      { syncVariantId: 5252492591, color: "Collegiate Navy", size: "2XL", sku: "69CBD5B5607B9_Collegiate-Navy-2XL" },
      { syncVariantId: 5252492592, color: "Collegiate Navy", size: "3XL", sku: "69CBD5B5607B9_Collegiate-Navy-3XL" },
      { syncVariantId: 5252492593, color: "Black Heather", size: "L", sku: "69CBD5B5607B9_Black-Heather-L" },
      { syncVariantId: 5252492594, color: "Black Heather", size: "XL", sku: "69CBD5B5607B9_Black-Heather-XL" },
      { syncVariantId: 5252492596, color: "Black Heather", size: "2XL", sku: "69CBD5B5607B9_Black-Heather-2XL" },
      { syncVariantId: 5252492597, color: "Black Heather", size: "3XL", sku: "69CBD5B5607B9_Black-Heather-3XL" },
      { syncVariantId: 5252492598, color: "White", size: "L", sku: "69CBD5B5607B9_White-L" },
      { syncVariantId: 5252492600, color: "White", size: "XL", sku: "69CBD5B5607B9_White-XL" },
      { syncVariantId: 5252492601, color: "White", size: "2XL", sku: "69CBD5B5607B9_White-2XL" },
      { syncVariantId: 5252492602, color: "White", size: "3XL", sku: "69CBD5B5607B9_White-3XL" },
    ],
  },
  {
    id: "bucket-hat",
    printfulProductId: 426229361,
    name: "TDF Bucket Hat",
    description: "Embroidered TDF crest. One size fits most.",
    price: 7500,
    displayPrice: "$75",
    thumbnailUrl: "https://files.cdn.printful.com/files/20e/20ed4575a571655a1ce668ce4c228432_preview.png",
    previewUrl: "https://files.cdn.printful.com/files/20e/20ed4575a571655a1ce668ce4c228432_preview.png",
    colorPreviews: {
      "Collegiate Navy": "https://files.cdn.printful.com/files/20e/20ed4575a571655a1ce668ce4c228432_preview.png",
      "Grill": "https://files.cdn.printful.com/files/5ff/5ffe5bb76cb8fc6fc9a9fc13cbe906c4_preview.png",
    },
    category: "headwear",
    colors: ["Collegiate Navy", "Grill"],
    sizes: [],
    variants: [
      { syncVariantId: 5252491845, color: "Collegiate Navy", sku: "69CBD564AA111_Collegiate-Navy" },
      { syncVariantId: 5252491846, color: "Grill", sku: "69CBD564AA111_Grill" },
    ],
  },
  {
    id: "cap",
    printfulProductId: 426229150,
    name: "TDF Cap",
    description: "Structured cap with embroidered TDF crest.",
    price: 5000,
    displayPrice: "$50",
    thumbnailUrl: "https://files.cdn.printful.com/files/a39/a39ce4cdac1ea86a980ebca0a9d783bd_preview.png",
    previewUrl: "https://files.cdn.printful.com/files/a39/a39ce4cdac1ea86a980ebca0a9d783bd_preview.png",
    colorPreviews: {
      "Black": "https://files.cdn.printful.com/files/a39/a39ce4cdac1ea86a980ebca0a9d783bd_preview.png",
      "Oxford Navy": "https://files.cdn.printful.com/files/504/50400c61b3605cae50c431fbaa9e2d57_preview.png",
      "Dark Olive": "https://files.cdn.printful.com/files/9d2/9d277725c39980a823ce7d78ea111595_preview.png",
    },
    category: "headwear",
    colors: ["Black", "Oxford Navy", "Dark Olive"],
    sizes: [],
    variants: [
      { syncVariantId: 5252490018, color: "Black", sku: "69CBD4D41C880_Black" },
      { syncVariantId: 5252490019, color: "Oxford Navy", sku: "69CBD4D41C880_Oxford-Navy" },
      { syncVariantId: 5252490020, color: "Dark Olive", sku: "69CBD4D41C880_Dark-Olive" },
    ],
  },
];

export function getProductById(id: string): ShopProduct | undefined {
  return SHOP_PRODUCTS.find((p) => p.id === id);
}

export function findVariant(productId: string, color: string, size?: string): ProductVariant | undefined {
  const product = getProductById(productId);
  if (!product) return undefined;
  return product.variants.find((v) =>
    v.color === color && (size ? v.size === size : true)
  );
}

// ── Printful API ──

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

export async function createPrintfulOrder(
  items: PrintfulOrderItem[],
  recipient: PrintfulRecipient,
  externalId?: string
): Promise<{ id: number; status: string } | null> {
  if (!PRINTFUL_TOKEN) {
    console.error("PRINTFUL_API_TOKEN not set");
    return null;
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
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Printful order creation failed:", err);
    return null;
  }

  const data = await res.json();
  return { id: data.result.id, status: data.result.status };
}
