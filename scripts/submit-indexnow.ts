// Post-deploy IndexNow bulk submit.
//   npx tsx scripts/submit-indexnow.ts
// Fetches the live sitemap (and any sub-sitemaps if it's a sitemap index),
// extracts <loc> URLs, and submits in chunks. Run after every vercel --prod.

const INDEXNOW_KEY = "1a2f2ae1dc5846a194019a0d9c7a677f";
const INDEXNOW_HOST = "tourdefore.com";
const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const SITEMAP_URL = `https://${INDEXNOW_HOST}/sitemap.xml`;
const CHUNK_SIZE = 1000;

async function fetchUrls(sitemap: string): Promise<string[]> {
  const res = await fetch(sitemap);
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  const locs = (xml.match(/<loc>([^<]+)<\/loc>/g) ?? []).map((m) =>
    m.replace(/<\/?loc>/g, "").trim()
  );
  // If this is a sitemap index, recurse into each sub-sitemap.
  if (xml.includes("<sitemapindex")) {
    const all: string[] = [];
    for (const sub of locs) {
      try {
        const subUrls = await fetchUrls(sub);
        all.push(...subUrls);
      } catch (err) {
        console.warn(`[indexnow] failed sub-sitemap ${sub}: ${err}`);
      }
    }
    return all;
  }
  return locs;
}

async function submit(urlList: string[]): Promise<void> {
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: INDEXNOW_HOST,
      key: INDEXNOW_KEY,
      keyLocation: INDEXNOW_KEY_LOCATION,
      urlList,
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`IndexNow submit failed: ${res.status} ${text}`);
  }
}

async function main(): Promise<void> {
  console.log(`[indexnow] fetching ${SITEMAP_URL}`);
  const urls = await fetchUrls(SITEMAP_URL);
  console.log(`[indexnow] parsed ${urls.length} URLs`);
  if (urls.length === 0) {
    console.log("[indexnow] nothing to submit");
    return;
  }
  for (let i = 0; i < urls.length; i += CHUNK_SIZE) {
    const chunk = urls.slice(i, i + CHUNK_SIZE);
    console.log(`[indexnow] submitting chunk ${i / CHUNK_SIZE + 1} (${chunk.length} URLs)`);
    await submit(chunk);
  }
  console.log(`[indexnow] done — submitted ${urls.length} URLs`);
}

main().catch((err) => {
  console.error("[indexnow] error:", err);
  process.exitCode = 1;
});
