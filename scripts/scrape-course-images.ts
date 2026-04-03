/**
 * Scrapes OG images from golf course websites and outputs
 * a JSON mapping of { courseName → imageUrl }.
 *
 * Run: npx tsx scripts/scrape-course-images.ts
 *
 * After running, use the output to populate imageUrl fields
 * in destination data files.
 */

import { allDestinations } from "../src/data/index";

interface Result {
  destination: string;
  course: string;
  url: string;
  imageUrl: string | null;
  error?: string;
}

async function scrapeOgImage(url: string): Promise<string | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });
    if (!res.ok) return null;
    const html = await res.text();

    // Try og:image first
    const ogMatch = html.match(
      /<meta\s+(?:property|name)=["']og:image["']\s+content=["']([^"']+)["']/i
    ) || html.match(
      /<meta\s+content=["']([^"']+)["']\s+(?:property|name)=["']og:image["']/i
    );
    if (ogMatch?.[1]) {
      let img = ogMatch[1];
      // Handle relative URLs
      if (img.startsWith("/")) {
        const u = new URL(url);
        img = `${u.protocol}//${u.host}${img}`;
      }
      return img;
    }

    // Fallback: twitter:image
    const twMatch = html.match(
      /<meta\s+(?:property|name)=["']twitter:image["']\s+content=["']([^"']+)["']/i
    ) || html.match(
      /<meta\s+content=["']([^"']+)["']\s+(?:property|name)=["']twitter:image["']/i
    );
    if (twMatch?.[1]) {
      let img = twMatch[1];
      if (img.startsWith("/")) {
        const u = new URL(url);
        img = `${u.protocol}//${u.host}${img}`;
      }
      return img;
    }

    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  const results: Result[] = [];
  const coursesWithUrl: { dest: string; name: string; url: string }[] = [];

  for (const dest of allDestinations) {
    for (const course of dest.courses) {
      if (course.url) {
        coursesWithUrl.push({
          dest: `${dest.city}, ${dest.state}`,
          name: course.name,
          url: course.url,
        });
      }
    }
  }

  console.log(`Found ${coursesWithUrl.length} courses with URLs. Scraping OG images...\n`);

  // Process in batches of 10 to avoid overwhelming
  const BATCH_SIZE = 10;
  let found = 0;
  let failed = 0;

  for (let i = 0; i < coursesWithUrl.length; i += BATCH_SIZE) {
    const batch = coursesWithUrl.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(
      batch.map(async ({ dest, name, url }) => {
        const imageUrl = await scrapeOgImage(url);
        if (imageUrl) found++;
        else failed++;
        return { destination: dest, course: name, url, imageUrl };
      })
    );
    results.push(...batchResults);
    console.log(`  Progress: ${Math.min(i + BATCH_SIZE, coursesWithUrl.length)}/${coursesWithUrl.length} (${found} found, ${failed} failed)`);
  }

  console.log(`\nDone! Found ${found} images out of ${coursesWithUrl.length} courses.\n`);

  // Output as JSON for easy processing
  const output = results
    .filter((r) => r.imageUrl)
    .reduce(
      (acc, r) => {
        acc[r.course] = r.imageUrl!;
        return acc;
      },
      {} as Record<string, string>
    );

  // Write results to a file
  const fs = await import("fs");
  fs.writeFileSync(
    "scripts/course-images.json",
    JSON.stringify(output, null, 2)
  );
  console.log(`Wrote ${Object.keys(output).length} image URLs to scripts/course-images.json`);

  // Also log failures for manual review
  const failures = results.filter((r) => !r.imageUrl);
  if (failures.length > 0) {
    console.log(`\n${failures.length} courses without images:`);
    for (const f of failures) {
      console.log(`  - ${f.course} (${f.destination}) → ${f.url}`);
    }
  }

  // Collect unique domains for next.config.ts
  const domains = new Set<string>();
  for (const url of Object.values(output)) {
    try {
      const u = new URL(url);
      domains.add(u.hostname);
    } catch {}
  }
  console.log(`\nUnique image domains (${domains.size}):`);
  for (const d of [...domains].sort()) {
    console.log(`  ${d}`);
  }
}

main().catch(console.error);
