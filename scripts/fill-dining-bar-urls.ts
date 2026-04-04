/**
 * Fills URLs for dining spots and bars by searching for their websites.
 * Uses a name+city pattern to construct likely Google search URLs,
 * then tries common restaurant/bar website patterns.
 *
 * Run: npx tsx scripts/fill-dining-bar-urls.ts
 */

import * as fs from "fs";
import * as path from "path";
import { allDestinations } from "../src/data/index";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[''\u2019]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Try to find a working URL for a venue by checking common patterns */
async function findUrl(name: string, city: string, state: string): Promise<string | null> {
  const slug = slugify(name);
  const candidates = [
    `https://www.${slug}.com`,
    `https://${slug}.com`,
  ];

  for (const url of candidates) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(url, {
        method: "HEAD",
        signal: controller.signal,
        redirect: "follow",
        headers: { "User-Agent": "Mozilla/5.0" },
      });
      clearTimeout(timeout);
      if (res.ok || res.status === 403) return url; // 403 means site exists but blocks HEAD
    } catch {}
  }
  return null;
}

/** Scrape OG image from a URL */
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

    const ogMatch = html.match(/<meta\s+(?:property|name)=["']og:image["']\s+content=["']([^"']+)["']/i)
      || html.match(/<meta\s+content=["']([^"']+)["']\s+(?:property|name)=["']og:image["']/i);
    if (ogMatch?.[1]) {
      let img = ogMatch[1];
      if (img.startsWith("/")) { const u = new URL(url); img = `${u.protocol}//${u.host}${img}`; }
      // Skip logos
      const lower = img.toLowerCase();
      if (lower.includes("logo") || lower.includes("icon") || lower.includes("emblem") || lower.includes("favicon")) return null;
      return img;
    }

    const twMatch = html.match(/<meta\s+(?:property|name)=["']twitter:image["']\s+content=["']([^"']+)["']/i)
      || html.match(/<meta\s+content=["']([^"']+)["']\s+(?:property|name)=["']twitter:image["']/i);
    if (twMatch?.[1]) {
      let img = twMatch[1];
      if (img.startsWith("/")) { const u = new URL(url); img = `${u.protocol}//${u.host}${img}`; }
      const lower = img.toLowerCase();
      if (lower.includes("logo") || lower.includes("icon") || lower.includes("emblem")) return null;
      return img;
    }
    return null;
  } catch { return null; } finally { clearTimeout(timeout); }
}

async function main() {
  // Collect all dining + bars that already have URLs
  const existingUrls: { name: string; url: string; category: string; city: string; state: string }[] = [];
  const needsUrl: { name: string; category: string; city: string; state: string }[] = [];

  for (const dest of allDestinations) {
    for (const d of dest.dining) {
      if (d.url) existingUrls.push({ name: d.name, url: d.url, category: "dining", city: dest.city, state: dest.state });
      else needsUrl.push({ name: d.name, category: "dining", city: dest.city, state: dest.state });
    }
    for (const b of dest.bars) {
      if (b.url) existingUrls.push({ name: b.name, url: b.url, category: "bar", city: dest.city, state: dest.state });
      else needsUrl.push({ name: b.name, category: "bar", city: dest.city, state: dest.state });
    }
  }

  console.log(`${existingUrls.length} with URLs, ${needsUrl.length} need URLs`);

  // Step 1: Scrape existing URLs for images
  console.log("\n--- Scraping existing URLs ---");
  const imageMap: Record<string, string> = {};
  const BATCH = 10;

  for (let i = 0; i < existingUrls.length; i += BATCH) {
    const batch = existingUrls.slice(i, i + BATCH);
    await Promise.all(batch.map(async ({ name, url }) => {
      const img = await scrapeOgImage(url);
      if (img) imageMap[name] = img;
    }));
  }
  console.log(`Got ${Object.keys(imageMap).length} images from existing URLs`);

  // Step 2: Try to find URLs + images for venues without URLs
  console.log("\n--- Finding URLs for venues ---");
  const urlMap: Record<string, string> = {};
  let found = 0;

  for (let i = 0; i < needsUrl.length; i += BATCH) {
    const batch = needsUrl.slice(i, i + BATCH);
    await Promise.all(batch.map(async ({ name, city, state }) => {
      const url = await findUrl(name, city, state);
      if (url) {
        urlMap[name] = url;
        found++;
        // Also try to get an image
        const img = await scrapeOgImage(url);
        if (img) imageMap[name] = img;
      }
    }));
    if ((i + BATCH) % 100 === 0 || i + BATCH >= needsUrl.length) {
      console.log(`  Progress: ${Math.min(i + BATCH, needsUrl.length)}/${needsUrl.length} (${found} URLs found, ${Object.keys(imageMap).length} images total)`);
    }
  }

  console.log(`\n--- Results ---`);
  console.log(`URLs found: ${Object.keys(urlMap).length}`);
  console.log(`Images found: ${Object.keys(imageMap).length}`);

  // Write results
  fs.writeFileSync(path.join(__dirname, "dining-bar-urls.json"), JSON.stringify(urlMap, null, 2));
  fs.writeFileSync(path.join(__dirname, "dining-bar-images.json"), JSON.stringify(imageMap, null, 2));
  console.log(`\nWrote to dining-bar-urls.json and dining-bar-images.json`);
}

main().catch(console.error);
