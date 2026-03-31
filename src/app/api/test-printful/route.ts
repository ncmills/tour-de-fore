// Quick test: add to src/app/api/test-printful/route.ts temporarily
import { NextResponse } from "next/server";

export async function GET() {
  const token = (process.env.PRINTFUL_API_TOKEN || "").trim();
  const tokenPreview = token.substring(0, 6) + "..." + token.substring(token.length - 4);
  
  try {
    const res = await fetch("https://api.printful.com/orders?limit=1", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return NextResponse.json({ 
      tokenPreview, 
      tokenLength: token.length,
      status: res.status, 
      code: data.code,
      error: data.error?.message,
      orderCount: data.result?.length 
    });
  } catch (err) {
    return NextResponse.json({ tokenPreview, tokenLength: token.length, error: String(err) });
  }
}
