import { findVariant } from "@/lib/printful";

export interface RawOrderItem {
  syncVariantId?: number;
  quantity?: number;
  productId?: string;
  color?: string;
  size?: string;
  s?: number;
  q?: number;
  p?: string;
  c?: string;
  z?: string;
}

export interface ParsedOrderItem {
  syncVariantId: number;
  quantity: number;
  productId: string;
  color: string;
  size?: string;
}

export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export interface ExtractedShipping {
  name: string;
  email: string;
  address: ShippingAddress | null;
}

export interface PrintfulRecipient {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state_code: string;
  country_code: string;
  zip: string;
  email: string;
}

/**
 * Parse order items from Stripe metadata JSON. Handles both long-form and
 * compressed key formats (productId/p, syncVariantId/s, etc.).
 */
export function parseOrderItems(itemsJson: string): ParsedOrderItem[] {
  let rawItems: RawOrderItem[];
  try {
    rawItems = JSON.parse(itemsJson) as RawOrderItem[];
  } catch {
    console.error("parseOrderItems: invalid JSON:", itemsJson?.slice(0, 200));
    return [];
  }
  if (!Array.isArray(rawItems)) {
    console.error("parseOrderItems: expected array, got:", typeof rawItems);
    return [];
  }
  return rawItems.map((i) => ({
    syncVariantId: i.syncVariantId ?? i.s ?? 0,
    quantity: i.quantity ?? i.q ?? 1,
    productId: i.productId ?? i.p ?? "",
    color: i.color ?? i.c ?? "",
    size: i.size ?? i.z,
  }));
}

/**
 * Resolve and re-validate syncVariantIds against the live Printful catalog.
 * Mutates items in place — sets syncVariantId to latest ID or 0 if not found.
 */
export async function resolveVariants(
  items: ParsedOrderItem[],
  logPrefix = "order"
): Promise<void> {
  for (const item of items) {
    if (item.productId && item.color) {
      const variant = await findVariant(item.productId, item.color, item.size);
      if (variant) {
        item.syncVariantId = variant.syncVariantId;
      } else {
        if (item.syncVariantId) {
          console.warn(
            `${logPrefix}: variant ${item.syncVariantId} for ${item.productId}/${item.color}/${item.size} not found in catalog`
          );
        }
        item.syncVariantId = 0;
      }
    }
  }
}

/**
 * Extract shipping address and customer info from a Stripe checkout session.
 * Handles multiple Stripe API response formats.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractShipping(session: any): ExtractedShipping {
  const shippingObj =
    session.collected_information?.shipping_details ||
    session.shipping_details ||
    session.shipping;

  const customerAddr = session.customer_details?.address;

  const rawAddress =
    shippingObj?.address ||
    (customerAddr
      ? {
          line1: customerAddr.line1,
          line2: customerAddr.line2,
          city: customerAddr.city,
          state: customerAddr.state,
          country: customerAddr.country,
          postal_code: customerAddr.postal_code,
        }
      : null);

  const address: ShippingAddress | null = rawAddress?.line1
    ? {
        line1: rawAddress.line1 || "",
        line2: rawAddress.line2 || undefined,
        city: rawAddress.city || "",
        state: rawAddress.state || "",
        country: rawAddress.country || "US",
        zip: rawAddress.postal_code || "",
      }
    : null;

  // Validate required address fields — incomplete addresses will fail at Printful
  if (address && (!address.line1 || !address.city || !address.state || !address.zip)) {
    console.error("extractShipping: incomplete address — missing required fields", {
      line1: !!address.line1, city: !!address.city, state: !!address.state, zip: !!address.zip,
    });
  }

  return {
    name:
      shippingObj?.name ||
      session.customer_details?.name ||
      "Customer",
    email: session.customer_details?.email || "",
    address,
  };
}

/**
 * Build a Printful recipient object from extracted shipping data.
 */
export function buildRecipient(shipping: ExtractedShipping): PrintfulRecipient {
  const addr = shipping.address!;
  return {
    name: shipping.name,
    address1: addr.line1,
    address2: addr.line2,
    city: addr.city,
    state_code: addr.state,
    country_code: addr.country,
    zip: addr.zip,
    email: shipping.email,
  };
}

/**
 * Build the external_id used for Printful dedup.
 */
export function buildExternalId(sessionId: string): string {
  return `tdf-${sessionId.slice(-56)}`;
}
