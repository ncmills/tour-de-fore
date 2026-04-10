// READ-ONLY Printful integration test
// Usage: PRINTFUL_API_TOKEN="..." npx tsx test-printful.ts

import { fetchShopProducts, findVariant } from "./src/lib/printful";
import type { ShopProduct } from "./src/lib/printful";

const VALID_CATEGORIES = new Set(["apparel", "headwear", "accessories"]);

async function main() {
  console.log("=== Printful Integration Test ===\n");

  // 1. Fetch all products
  console.log("[1] Fetching shop products...");
  const products = await fetchShopProducts();
  console.log(`    Loaded ${products.length} products\n`);

  if (products.length === 0) {
    console.error("FAIL: No products returned!");
    process.exit(1);
  }

  let allPass = true;
  const issues: string[] = [];

  // Per-product checks
  for (const p of products) {
    const pIssues: string[] = [];

    // 2. Valid price > 0
    if (p.price <= 0) {
      pIssues.push(`$0 price (${p.price} cents)`);
    }

    // 3. At least one variant with valid syncVariantId
    if (p.variants.length === 0) {
      pIssues.push("no variants");
    } else {
      const hasValidSync = p.variants.some((v) => v.syncVariantId > 0);
      if (!hasValidSync) pIssues.push("no valid syncVariantId");
    }

    // 4. catalogVariantId populated on ALL variants
    const missingCatalog = p.variants.filter((v) => !v.catalogVariantId || v.catalogVariantId <= 0);
    if (missingCatalog.length > 0) {
      pIssues.push(`${missingCatalog.length}/${p.variants.length} variants missing catalogVariantId`);
    }

    // 5. Valid category
    if (!VALID_CATEGORIES.has(p.category)) {
      pIssues.push(`invalid category: ${p.category}`);
    }

    if (pIssues.length > 0) {
      allPass = false;
      issues.push(`${p.name}: ${pIssues.join(", ")}`);
    }
  }

  // 3. Test findVariant() for each product with a real color/size combo
  console.log("[2] Testing findVariant() for each product...");
  for (const p of products) {
    const testColor = p.colors[0];
    const testSize = p.sizes.length > 0 ? p.sizes[0] : undefined;
    const variant = await findVariant(p.id, testColor, testSize);
    if (!variant) {
      allPass = false;
      issues.push(`findVariant(${p.id}, ${testColor}, ${testSize}) returned undefined`);
      console.log(`    FAIL: ${p.name} - findVariant returned undefined for color=${testColor} size=${testSize}`);
    } else {
      console.log(`    OK: ${p.name} -> syncVariantId=${variant.syncVariantId}, catalogVariantId=${variant.catalogVariantId}`);
    }
  }

  // Summary table
  console.log("\n=== Product Summary ===\n");
  console.log(
    "Product".padEnd(25) +
    "Price".padEnd(10) +
    "Variants".padEnd(10) +
    "Colors".padEnd(10) +
    "Sizes".padEnd(10) +
    "Category"
  );
  console.log("-".repeat(75));

  for (const p of products) {
    console.log(
      p.name.padEnd(25) +
      p.displayPrice.padEnd(10) +
      String(p.variants.length).padEnd(10) +
      String(p.colors.length).padEnd(10) +
      String(p.sizes.length).padEnd(10) +
      p.category
    );
  }

  // Final result
  console.log("\n=== Results ===\n");
  if (issues.length > 0) {
    console.log("Issues found:");
    issues.forEach((i) => console.log(`  - ${i}`));
  }
  console.log(`\nTotal products: ${products.length}`);
  console.log(`Status: ${allPass ? "ALL PASS" : "FAILURES DETECTED"}`);
  process.exit(allPass ? 0 : 1);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
