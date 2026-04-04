import { NextResponse } from "next/server";
import { fetchShopProducts } from "@/lib/printful";

export const revalidate = 300; // ISR: revalidate every 5 minutes

export async function GET() {
  try {
    const products = await fetchShopProducts();
    return NextResponse.json(products, {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=60",
      },
    });
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return NextResponse.json([], { status: 500 });
  }
}
