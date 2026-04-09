import { NextRequest, NextResponse } from "next/server";

const INDEXNOW_KEY = "1a2f2ae1dc5846a194019a0d9c7a677f";
const SITE_HOST = "https://tourdefore.com";
const ADMIN_SECRET = process.env.ADMIN_SECRET;

/**
 * POST /api/indexnow — submit URLs to IndexNow (Bing, Yandex, Naver, Seznam).
 * Body: { urls: string[] } or { all: true } to submit all sitemap URLs.
 * Requires ADMIN_SECRET header for auth.
 *
 * Google doesn't support IndexNow directly but Bing shares crawl data with Google.
 */
export async function POST(req: NextRequest) {
  // Auth check
  const secret = req.headers.get("x-admin-secret");
  if (!ADMIN_SECRET || secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  let urls: string[] = body.urls || [];

  // If "all" flag, fetch all sitemap URLs
  if (body.all) {
    urls = await fetchAllSitemapUrls();
  }

  if (!urls.length) {
    return NextResponse.json({ error: "No URLs provided" }, { status: 400 });
  }

  // IndexNow accepts up to 10,000 URLs per request
  const batches = [];
  for (let i = 0; i < urls.length; i += 10000) {
    batches.push(urls.slice(i, i + 10000));
  }

  const results = [];
  for (const batch of batches) {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: "tourdefore.com",
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_HOST}/${INDEXNOW_KEY}.txt`,
        urlList: batch,
      }),
    });
    results.push({ status: res.status, count: batch.length });
  }

  return NextResponse.json({
    submitted: urls.length,
    batches: results,
  });
}

async function fetchAllSitemapUrls(): Promise<string[]> {
  const urls: string[] = [];
  for (let i = 0; i < 10; i++) {
    try {
      const res = await fetch(`${SITE_HOST}/sitemap/${i}.xml`);
      const xml = await res.text();
      const matches = xml.matchAll(/<loc>([^<]+)<\/loc>/g);
      for (const m of matches) urls.push(m[1]);
    } catch {
      // Skip failed sitemaps
    }
  }
  return urls;
}
