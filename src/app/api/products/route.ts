import { NextResponse } from "next/server";
import { fetchShopProducts } from "@/lib/printful";

// Force dynamic — printful.ts has its own 5-min in-memory cache,
// so this always runs the function but rarely hits the Printful API.
// Avoids ISR staleness that prevented new products from appearing.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await fetchShopProducts();
    return NextResponse.json(products, {
      headers: {
        // Short CDN cache with stale-while-revalidate for fast responses
        "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return NextResponse.json([], { status: 500 });
  }
}
