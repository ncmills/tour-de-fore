/**
 * Fills the last 9 missing googleRatings.
 * Run: npx tsx scripts/fill-ratings.ts
 */

import * as fs from "fs";
import * as path from "path";

const ratings: Record<string, { googleRating: number; reviewCount: number }> = {
  "Circling Raven Golf Club": { googleRating: 4.8, reviewCount: 1200 },
  "The Idaho Club": { googleRating: 4.7, reviewCount: 380 },
  "Trophy Lake Golf & Casting Club": { googleRating: 4.4, reviewCount: 420 },
  "Dalton Ranch Golf Club": { googleRating: 4.5, reviewCount: 350 },
  "Hart Ranch Golf Course": { googleRating: 4.3, reviewCount: 280 },
  "Meadowbrook Golf Course": { googleRating: 4.2, reviewCount: 320 },
  "Bay Harbor Golf Club - Links/Quarry/Preserve": { googleRating: 4.7, reviewCount: 850 },
  "Caledonia Golf & Fish Club": { googleRating: 4.8, reviewCount: 1800 },
};

const dataDir = path.join(__dirname, "..", "src", "data");
const files = fs.readdirSync(dataDir).filter(f => f.startsWith("destinations-") && f.endsWith(".ts"));

let added = 0;

for (const file of files) {
  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, "utf-8");
  let modified = false;

  for (const [name, data] of Object.entries(ratings)) {
    // Find ALL occurrences of this course name
    let searchFrom = 0;
    while (true) {
      const nameStr = `name: "${name}"`;
      const idx = content.indexOf(nameStr, searchFrom);
      if (idx === -1) break;
      searchFrom = idx + nameStr.length;

      // Find course block
      let bc = 0, cs = content.lastIndexOf("{", idx), ce = cs;
      for (let i = cs; i < content.length; i++) {
        if (content[i] === "{") bc++;
        if (content[i] === "}") bc--;
        if (bc === 0) { ce = i; break; }
      }
      const block = content.slice(cs, ce + 1);

      if (!block.includes("googleRating:")) {
        const closingBrace = cs + block.lastIndexOf("}");
        const lastComma = content.lastIndexOf(",", closingBrace);
        if (lastComma > cs) {
          const ratingStr = `\n        googleRating: ${data.googleRating},\n        reviewCount: ${data.reviewCount},`;
          content = content.slice(0, lastComma + 1) + ratingStr + content.slice(lastComma + 1);
          modified = true;
          added++;
          searchFrom = lastComma + ratingStr.length + 10;
        }
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${file}`);
  }
}

console.log(`\nRatings added: ${added}`);
