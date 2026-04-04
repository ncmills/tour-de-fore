/**
 * Populates imageUrl (and url where missing) fields for dining/bars
 * in destination data files.
 *
 * Run: npx tsx scripts/populate-dining-bar-images.ts
 */

import * as fs from "fs";
import * as path from "path";

const imagesPath = path.join(__dirname, "dining-bar-images.json");
const urlsPath = path.join(__dirname, "dining-bar-urls.json");

const imageMap: Record<string, string> = JSON.parse(fs.readFileSync(imagesPath, "utf-8"));
const urlMap: Record<string, string> = JSON.parse(fs.readFileSync(urlsPath, "utf-8"));

const dataDir = path.join(__dirname, "..", "src", "data");
const files = fs.readdirSync(dataDir).filter((f) => f.startsWith("destinations-") && f.endsWith(".ts"));

let totalUrlsAdded = 0;
let totalImagesAdded = 0;

for (const file of files) {
  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, "utf-8");
  let urlsAdded = 0;
  let imagesAdded = 0;

  // Process URLs first (add url field where missing)
  for (const [name, url] of Object.entries(urlMap)) {
    const nameEscaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Check if this name exists in the file and doesn't already have a url
    const namePattern = new RegExp(`name:\\s*"${nameEscaped}"`, "m");
    if (!namePattern.test(content)) continue;

    // Find the entry and check if it already has url
    const entryPattern = new RegExp(
      `(name:\\s*"${nameEscaped}"[\\s\\S]*?)(googleRating:|reviewCount:|\\},)`,
      "m"
    );
    const match = content.match(entryPattern);
    if (!match) continue;

    // If already has url, skip
    if (match[1].includes("url:")) continue;

    // Add url before the matched ending
    const insertBefore = match[2];
    const indent = match[1].match(/(\s+)name:/)?.[1] || "      ";
    content = content.replace(
      match[0],
      `${match[1]}${indent}url: "${url}",\n${indent}${insertBefore}`
    );
    urlsAdded++;
  }

  // Process images
  for (const [name, imageUrl] of Object.entries(imageMap)) {
    const nameEscaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Find entry with this name that has a url field
    const pattern = new RegExp(
      `(name:\\s*"${nameEscaped}"[\\s\\S]*?url:\\s*"[^"]*",)\\n`,
      "m"
    );
    const match = content.match(pattern);
    if (!match) continue;

    // Check if imageUrl already exists
    const afterMatch = content.slice(
      content.indexOf(match[0]) + match[0].length,
      content.indexOf(match[0]) + match[0].length + 100
    );
    if (afterMatch.includes("imageUrl:")) continue;

    const urlLineMatch = match[1].match(/(\s+)url:/);
    const indent = urlLineMatch ? urlLineMatch[1] : "        ";

    content = content.replace(
      match[0],
      `${match[1]}\n${indent}imageUrl: "${imageUrl}",\n`
    );
    imagesAdded++;
  }

  if (urlsAdded > 0 || imagesAdded > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`${file}: +${urlsAdded} URLs, +${imagesAdded} images`);
    totalUrlsAdded += urlsAdded;
    totalImagesAdded += imagesAdded;
  } else {
    console.log(`${file}: no changes`);
  }
}

console.log(`\nTotal: +${totalUrlsAdded} URLs, +${totalImagesAdded} images`);
