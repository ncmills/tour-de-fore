/**
 * Canonical shop fulfillment — turns a paid Stripe Checkout Session into a
 * Printful order. Called from /api/verify-order (success page) and /api/cron/sync-orders.
 *
 * Idempotent at three levels:
 *   1. Redis fast path (getOrder → status: "submitted")
 *   2. Printful external_id check (checkPrintfulOrderExists)
 *   3. Distributed lock inside createPrintfulOrder
 *
 * Trusts the `s` (syncVariantId) baked into session.metadata at checkout time.
 * Only re-resolves variants on a Printful "variant" error, and only once.
 */

import type Stripe from "stripe";
import { createPrintfulOrder, checkPrintfulOrderExists, getProductById } from "@/lib/printful";
import { storeOrder, getOrder } from "@/lib/kv";
import { sendEmail } from "@/lib/email";
import {
  parseOrderItems,
  resolveVariants,
  extractShipping,
  buildRecipient,
  buildExternalId,
  type ParsedOrderItem,
} from "@/lib/order-utils";

export type FulfillTrigger = "verify" | "cron" | "manual";

export interface FulfillResult {
  status:
    | "already_submitted"
    | "submitted"
    | "rescued"
    | "not_paid"
    | "not_shop_order"
    | "no_items"
    | "needs_attention"
    | "failed";
  printfulOrderId?: number | null;
  retried?: boolean;
  trigger: FulfillTrigger;
  detail?: string;
}

async function sendConfirmationEmail(
  toEmail: string,
  items: ParsedOrderItem[]
): Promise<void> {
  try {
    const itemRows = await Promise.all(
      items.map(async (i) => {
        const product = await getProductById(i.productId);
        const imgUrl = product?.colorPreviews?.[i.color] || product?.thumbnailUrl || "";
        const name = product?.name || i.productId;
        return `<tr><td style="padding: 12px 0; border-bottom: 1px solid #eee;">${
          imgUrl
            ? `<img src="${imgUrl}" alt="${name}" style="width: 80px; height: 80px; object-fit: contain; border-radius: 8px;" />`
            : ""
        }</td><td style="padding: 12px 16px; border-bottom: 1px solid #eee; vertical-align: middle;"><strong style="color: #333;">${name}</strong><br/><span style="color: #888; font-size: 13px;">${
          i.color
        }${i.size ? ` / ${i.size}` : ""} &times; ${i.quantity}</span></td></tr>`;
      })
    );

    await sendEmail({
      to: toEmail,
      subject: "Your TDF Pro Shop Order is Confirmed",
      html: `<div style="font-family: -apple-system, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 30px; text-align: center;"><img src="https://tourdefore.com/icon-fancy.png" alt="Tour de Fore" style="width: 64px; height: 64px; margin-bottom: 16px;" /><h1 style="font-size: 22px; color: #c87941; margin: 0 0 8px; font-weight: 600;">Tour de Fore</h1><h2 style="font-size: 18px; margin: 0 0 24px; color: #333; font-weight: 500;">Order Confirmed</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; text-align: left;">${itemRows.join(
        ""
      )}</table><p style="color: #555; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">Your gear is being prepared. You'll get a shipping confirmation with tracking once it ships.</p><hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" /><p style="color: #999; font-size: 12px;">Questions? Contact us at <a href="mailto:info@tourdefore.com" style="color: #c87941;">info@tourdefore.com</a></p><p style="color: #bbb; font-size: 11px; margin-top: 16px;">Tour de Fore Pro Shop</p></div>`,
    });
  } catch (err) {
    console.error("Shop confirmation email failed:", err);
  }
}

export async function fulfillShopOrder(
  sessionId: string,
  stripe: Stripe,
  trigger: FulfillTrigger
): Promise<FulfillResult> {
  // 1. Redis fast path — cron calls every 5 min, most are no-ops on already-fulfilled orders.
  const cached = await getOrder(sessionId);
  if (cached?.printfulOrderId && cached.status === "submitted") {
    return {
      status: "already_submitted",
      printfulOrderId: cached.printfulOrderId,
      trigger,
    };
  }

  // 2. Fetch Stripe session.
  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["shipping_details"],
    });
  } catch (err) {
    return {
      status: "failed",
      trigger,
      detail: `Stripe retrieve failed: ${err instanceof Error ? err.message : String(err)}`,
    };
  }

  if (session.payment_status !== "paid") {
    return { status: "not_paid", trigger };
  }
  if (session.metadata?.type !== "shop") {
    return { status: "not_shop_order", trigger };
  }

  const itemsJson = session.metadata?.items;
  if (!itemsJson) {
    return { status: "no_items", trigger, detail: "Missing metadata.items" };
  }

  const externalId = buildExternalId(sessionId);

  // 3. Printful-level dedup — covers the case where Redis was cleared but Printful has the order.
  try {
    const existing = await checkPrintfulOrderExists(externalId);
    if (existing) {
      const items = parseOrderItems(itemsJson);
      const shipping = extractShipping(session);
      await storeOrder({
        id: sessionId,
        email: shipping.email,
        items: items.map((i) => ({
          productId: i.productId,
          color: i.color,
          size: i.size,
          quantity: i.quantity,
        })),
        stripeSessionId: sessionId,
        printfulOrderId: existing.id,
        status: "submitted",
        createdAt: new Date().toISOString(),
      });
      return {
        status: "already_submitted",
        printfulOrderId: existing.id,
        trigger,
      };
    }
  } catch (err) {
    // Non-fatal — checkPrintfulOrderExists throws on non-404 errors. Log and continue; creation
    // attempt below will hit the same error and route to the alert path.
    console.warn("checkPrintfulOrderExists failed (non-fatal):", err);
  }

  // 4. Parse items, trust the pre-resolved syncVariantIds baked in at checkout time.
  const items = parseOrderItems(itemsJson);
  const shipping = extractShipping(session);

  // 5. Missing shipping — store as needs_attention and email the customer to follow up.
  if (!shipping.address) {
    await storeOrder({
      id: sessionId,
      email: shipping.email,
      items: items.map((i) => ({
        productId: i.productId,
        color: i.color,
        size: i.size,
        quantity: i.quantity,
      })),
      stripeSessionId: sessionId,
      printfulOrderId: null,
      status: "needs_attention",
      createdAt: new Date().toISOString(),
    });
    if (shipping.email) {
      await sendEmail({
        to: shipping.email,
        subject: "Action Needed: Your TDF Pro Shop Order",
        html: `<div style="font-family: -apple-system, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 30px; text-align: center;"><h1 style="font-size: 22px; color: #c87941;">Tour de Fore</h1><p style="color: #555; line-height: 1.6;">We received your payment but couldn't find a shipping address for your order. Please reply to this email or contact us at <a href="mailto:info@tourdefore.com" style="color: #c87941;">info@tourdefore.com</a> with your shipping address so we can get your gear on its way.</p></div>`,
      });
    }
    return {
      status: "needs_attention",
      trigger,
      detail: "No shipping address on session",
    };
  }

  const recipient = buildRecipient(shipping);
  if (!recipient) {
    return {
      status: "needs_attention",
      trigger,
      detail: "Incomplete shipping address (buildRecipient returned null)",
    };
  }

  // 6. Try creation with items as-is (trusting baked-in syncVariantIds).
  const tryCreate = async (itemsToSend: ParsedOrderItem[]) => {
    const validItems = itemsToSend.filter((i) => i.syncVariantId && i.syncVariantId > 0);
    if (validItems.length === 0) return null;
    return createPrintfulOrder(
      validItems.map((i) => ({ sync_variant_id: i.syncVariantId, quantity: i.quantity })),
      recipient,
      externalId
    );
  };

  let printfulResult: { id: number; status: string } | null = null;
  let retried = false;
  try {
    printfulResult = await tryCreate(items);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    // 7. Retry-on-stale-variant: Printful rejected a variant. Re-resolve and try once more.
    if (/variant|sync_variant/i.test(msg)) {
      console.warn("Printful variant error, re-resolving and retrying:", msg);
      try {
        await resolveVariants(items, trigger);
        retried = true;
        printfulResult = await tryCreate(items);
      } catch (retryErr) {
        printfulResult = null;
        console.error("Printful retry failed:", retryErr);
      }
    } else {
      console.error("Printful order creation failed:", msg);
    }
  }

  // 8. Success: store + confirmation email.
  if (printfulResult) {
    await storeOrder({
      id: sessionId,
      email: shipping.email,
      items: items.map((i) => ({
        productId: i.productId,
        color: i.color,
        size: i.size,
        quantity: i.quantity,
      })),
      stripeSessionId: sessionId,
      printfulOrderId: printfulResult.id,
      status: "submitted",
      createdAt: new Date().toISOString(),
    });

    if (shipping.email) {
      await sendConfirmationEmail(shipping.email, items);
    }

    return {
      status: retried ? "rescued" : "submitted",
      printfulOrderId: printfulResult.id,
      retried,
      trigger,
    };
  }

  // 9. Total failure — store as needs_attention and alert ops.
  await storeOrder({
    id: sessionId,
    email: shipping.email,
    items: items.map((i) => ({
      productId: i.productId,
      color: i.color,
      size: i.size,
      quantity: i.quantity,
    })),
    stripeSessionId: sessionId,
    printfulOrderId: null,
    status: "needs_attention",
    createdAt: new Date().toISOString(),
  });

  await sendEmail({
    to: "info@tourdefore.com",
    subject: "CRITICAL: Shop order failed — paid but not fulfilled",
    html: `<p><strong>A customer paid but their order was NOT created in Printful.</strong></p><p><strong>Session:</strong> ${sessionId}</p><p><strong>Trigger:</strong> ${trigger}</p><p><strong>Customer:</strong> ${shipping.email || "unknown"}</p><p><strong>Items:</strong> ${itemsJson}</p><p>Action required: manually create this order in Printful or refund the customer.</p>`,
    critical: true,
  });

  return {
    status: "failed",
    trigger,
    detail: "Printful order creation failed after retry",
  };
}
