/**
 * Reads scraped image URLs from course-images.json and injects
 * imageUrl fields into the destination data files.
 *
 * Run: npx tsx scripts/populate-course-images.ts
 */

import * as fs from "fs";
import * as path from "path";

const imagesPath = path.join(__dirname, "course-images.json");
const imageMap: Record<string, string> = JSON.parse(
  fs.readFileSync(imagesPath, "utf-8")
);

// Filter out likely logos/icons (small images, PNGs with "logo" in name, etc.)
const filtered: Record<string, string> = {};
for (const [name, url] of Object.entries(imageMap)) {
  const lower = url.toLowerCase();
  // Skip obvious logos
  if (lower.includes("logo") || lower.includes("icon") || lower.includes("emblem") || lower.includes("favicon")) continue;
  // Skip tiny images (format hints)
  if (lower.includes("format=100") || lower.includes("w_100")) continue;
  filtered[name] = url;
}

console.log(`${Object.keys(imageMap).length} total images, ${Object.keys(filtered).length} after filtering logos\n`);

const dataDir = path.join(__dirname, "..", "src", "data");
const files = fs.readdirSync(dataDir).filter((f) => f.startsWith("destinations-") && f.endsWith(".ts"));

let totalPatched = 0;

for (const file of files) {
  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, "utf-8");
  let patched = 0;

  for (const [courseName, imageUrl] of Object.entries(filtered)) {
    // Find the course entry and add imageUrl after the url field
    // Match: url: "...", followed by newline (the url line for this course)
    // We need to match the specific course by finding its name nearby

    // Strategy: find `name: "CourseName"` then find the next `url:` line and add imageUrl after it
    const nameEscaped = courseName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(
      `(name:\\s*"${nameEscaped}"[\\s\\S]*?url:\\s*"[^"]*",)\\n`,
      "m"
    );
    const match = content.match(pattern);
    if (match) {
      // Check if imageUrl already exists for this course
      const afterMatch = content.slice(
        (content.indexOf(match[0]) || 0) + match[0].length,
        (content.indexOf(match[0]) || 0) + match[0].length + 100
      );
      if (afterMatch.includes("imageUrl:")) continue;

      // Get the indentation from the url line
      const urlLineMatch = match[1].match(/(\s+)url:/);
      const indent = urlLineMatch ? urlLineMatch[1] : "        ";

      content = content.replace(
        match[0],
        `${match[1]}\n${indent}imageUrl: "${imageUrl}",\n`
      );
      patched++;
    }
  }

  if (patched > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`${file}: patched ${patched} courses`);
    totalPatched += patched;
  } else {
    console.log(`${file}: no changes`);
  }
}

console.log(`\nTotal: ${totalPatched} courses patched with imageUrl`);
