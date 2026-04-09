import { NextResponse } from "next/server";

/**
 * Sitemap index — rewritten from /sitemap.xml via next.config.ts.
 * Served from /sitemap-index (not /api/) so robots.txt doesn't block it.
 */
export async function GET() {
  const base = "https://tourdefore.com";
  const sitemapIds = Array.from({ length: 10 }, (_, i) => i);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapIds.map((id) => `  <sitemap>
    <loc>${base}/sitemap/${id}.xml</loc>
  </sitemap>`).join("\n")}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
