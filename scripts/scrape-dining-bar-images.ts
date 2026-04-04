/**
 * Scrapes OG images from dining and bar websites.
 * Run: npx tsx scripts/scrape-dining-bar-images.ts
 */

import { allDestinations } from "../src/data/index";
import * as fs from "fs";
import * as path from "path";

async function scrapeOgImage(url: string): Promise<string | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });
    if (!res.ok) return null;
    const html = await res.text();

    // og:image
    const ogMatch = html.match(/<meta\s+(?:property|name)=["']og:image["']\s+content=["']([^"']+)["']/i)
      || html.match(/<meta\s+content=["']([^"']+)["']\s+(?:property|name)=["']og:image["']/i);
    if (ogMatch?.[1]) {
      let img = ogMatch[1];
      if (img.startsWith("/")) { const u = new URL(url); img = `${u.protocol}//${u.host}${img}`; }
      return img;
    }

    // twitter:image
    const twMatch = html.match(/<meta\s+(?:property|name)=["']twitter:image["']\s+content=["']([^"']+)["']/i)
      || html.match(/<meta\s+content=["']([^"']+)["']\s+(?:property|name)=["']twitter:image["']/i);
    if (twMatch?.[1]) {
      let img = twMatch[1];
      if (img.startsWith("/")) { const u = new URL(url); img = `${u.protocol}//${u.host}${img}`; }
      return img;
    }

    return null;
  } catch { return null; } finally { clearTimeout(timeout); }
}

async function main() {
  const items: { category: string; dest: string; name: string; url: string }[] = [];

  for (const dest of allDestinations) {
    for (const d of dest.dining) {
      if (d.url) items.push({ category: "dining", dest: `${dest.city}, ${dest.state}`, name: d.name, url: d.url });
    }
    for (const b of dest.bars) {
      if (b.url) items.push({ category: "bar", dest: `${dest.city}, ${dest.state}`, name: b.name, url: b.url });
    }
  }

  console.log(`Found ${items.length} dining/bar URLs. Scraping OG images...\n`);

  const BATCH_SIZE = 10;
  let found = 0;
  const results: Record<string, string> = {};

  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(async ({ name, url }) => {
      const img = await scrapeOgImage(url);
      if (img) {
        const lower = img.toLowerCase();
        if (!lower.includes("logo") && !lower.includes("icon") && !lower.includes("emblem") && !lower.includes("favicon")) {
          results[name] = img;
          found++;
        }
      }
    }));
    console.log(`  Progress: ${Math.min(i + BATCH_SIZE, items.length)}/${items.length} (${found} found)`);
  }

  console.log(`\nDone! Found ${found} images out of ${items.length} URLs.`);

  fs.writeFileSync(path.join(__dirname, "dining-bar-images.json"), JSON.stringify(results, null, 2));
  console.log(`Wrote ${Object.keys(results).length} image URLs to scripts/dining-bar-images.json`);

  // Unique domains
  const domains = new Set<string>();
  for (const url of Object.values(results)) {
    try { domains.add(new URL(url).hostname); } catch {}
  }
  console.log(`\nUnique image domains (${domains.size}):`);
  for (const d of [...domains].sort()) console.log(`  ${d}`);
}

main().catch(console.error);
