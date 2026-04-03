/**
 * Adds second lodging option to 7 destinations that only have 1.
 * Run: npx tsx scripts/add-lodging.ts
 */

import * as fs from "fs";
import * as path from "path";

interface LodgingEntry {
  type: string;
  sleeps: [number, number];
  nightlyRange: [number, number];
  amenities: string[];
  areaDescription: string;
  searchUrl?: string;
  notes: string;
  avgRating?: number;
  bedsBreakdown?: string;
}

const newLodging: Record<string, LodgingEntry> = {
  "St. George": {
    type: "resort-house",
    sleeps: [8, 14],
    nightlyRange: [300, 900],
    amenities: ["pool", "hot tub", "golf course views", "full kitchen", "fire pit"],
    areaDescription: "Entrada / Snow Canyon area",
    searchUrl: "https://www.vrbo.com/search?destination=St.+George%2C+Utah&adults=14",
    notes: "Vacation homes in the Entrada or Sunbrook communities offer golf course views, resort pool access, and proximity to Snow Canyon State Park.",
    avgRating: 4.6,
    bedsBreakdown: "3 kings + 3 queens = 12 guys at 2/bed",
  },
  "Mesquite": {
    type: "resort-house",
    sleeps: [8, 14],
    nightlyRange: [250, 800],
    amenities: ["pool access", "golf views", "full kitchen", "garage", "patio"],
    areaDescription: "Wolf Creek / CasaBlanca area",
    searchUrl: "https://www.vrbo.com/search?destination=Mesquite%2C+Nevada&adults=14",
    notes: "Golf community homes near Wolf Creek and CasaBlanca are affordable and put you steps from the first tee. Book early for spring season.",
    avgRating: 4.5,
    bedsBreakdown: "3 kings + 2 queens = 10 guys at 2/bed",
  },
  "Santa Fe": {
    type: "lodge",
    sleeps: [8, 14],
    nightlyRange: [400, 1200],
    amenities: ["adobe architecture", "fire pit", "mountain views", "hot tub", "full kitchen"],
    areaDescription: "Canyon Road / Eastside Santa Fe",
    searchUrl: "https://www.airbnb.com/s/Santa-Fe--NM/homes?adults=14",
    notes: "Adobe-style homes and casitas near Canyon Road offer walkable access to galleries, restaurants, and the plaza. The Santa Fe vibe is part of the trip.",
    avgRating: 4.7,
    bedsBreakdown: "3 kings + 3 queens = 12 guys at 2/bed",
  },
  "Flagstaff": {
    type: "house",
    sleeps: [12, 18],
    nightlyRange: [400, 1400],
    amenities: ["hot tub", "fire pit", "mountain views", "game room", "full kitchen"],
    areaDescription: "Continental Country Club / Kachina Village area",
    searchUrl: "https://www.vrbo.com/search?destination=Flagstaff%2C+Arizona&adults=16",
    notes: "Large homes near Continental CC or in the pines south of town give the group room to spread out. Flagstaff nights get cool even in summer — fire pits are key.",
    avgRating: 4.6,
    bedsBreakdown: "4 kings + 3 queens = 14 guys at 2/bed",
  },
  "Sunriver": {
    type: "cabin",
    sleeps: [8, 14],
    nightlyRange: [300, 1000],
    amenities: ["hot tub", "fire pit", "BBQ", "mountain views", "game room"],
    areaDescription: "Sunriver Village / River area",
    searchUrl: "https://www.airbnb.com/s/Sunriver--OR/homes?adults=14",
    notes: "Smaller cabins closer to the Village are more affordable and walkable to restaurants and bars. Great for groups that don't need the big compound.",
    avgRating: 4.5,
    bedsBreakdown: "3 kings + 3 queens = 12 guys at 2/bed",
  },
  "Boise": {
    type: "cabin",
    sleeps: [10, 16],
    nightlyRange: [350, 1100],
    amenities: ["hot tub", "river access", "mountain views", "fire pit", "full kitchen"],
    areaDescription: "Bogus Basin Road / East Boise foothills",
    searchUrl: "https://www.airbnb.com/s/Boise--ID/homes?adults=14",
    notes: "Mountain cabins in the foothills above Boise offer a different vibe than downtown homes. Close to Bogus Basin and the Boise River Greenbelt.",
    avgRating: 4.6,
    bedsBreakdown: "4 kings + 3 queens = 14 guys at 2/bed",
  },
  "Gulf Shores": {
    type: "resort-house",
    sleeps: [10, 16],
    nightlyRange: [350, 1200],
    amenities: ["pool", "beach access", "full kitchen", "balcony", "parking"],
    areaDescription: "Orange Beach / Perdido Key area",
    searchUrl: "https://www.vrbo.com/search?destination=Orange+Beach%2C+Alabama&adults=16",
    notes: "Orange Beach condos and resort homes are slightly upscale from Gulf Shores with better restaurant access and newer properties. Walkable to The Wharf entertainment district.",
    avgRating: 4.5,
    bedsBreakdown: "4 kings + 3 queens = 14 guys at 2/bed",
  },
};

const dataDir = path.join(__dirname, "..", "src", "data");
const files = fs.readdirSync(dataDir).filter(f => f.startsWith("destinations-") && f.endsWith(".ts"));

let added = 0;

for (const file of files) {
  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, "utf-8");
  let modified = false;

  for (const [city, lodging] of Object.entries(newLodging)) {
    const cityStr = `city: "${city}"`;
    const idx = content.indexOf(cityStr);
    if (idx === -1) continue;

    // Find "lodging: [" after this city
    const lodgingIdx = content.indexOf("lodging: [", idx);
    if (lodgingIdx === -1 || lodgingIdx > idx + 5000) continue;

    // Find the closing "]," of the lodging array
    let bracketCount = 0;
    let lodgingStart = lodgingIdx + "lodging: [".length;
    let lodgingEnd = lodgingStart;
    bracketCount = 1;
    for (let i = lodgingStart; i < content.length; i++) {
      if (content[i] === "[") bracketCount++;
      if (content[i] === "]") bracketCount--;
      if (bracketCount === 0) { lodgingEnd = i; break; }
    }

    // Count existing lodging entries
    const lodgingBlock = content.slice(lodgingStart, lodgingEnd);
    const existingCount = (lodgingBlock.match(/type: "/g) || []).length;
    if (existingCount >= 2) continue;

    // Build new entry
    const amenitiesStr = lodging.amenities.map(a => `"${a}"`).join(", ");
    const searchUrlLine = lodging.searchUrl ? `\n        searchUrl: "${lodging.searchUrl}",` : "";
    const ratingLine = lodging.avgRating ? `\n        avgRating: ${lodging.avgRating},` : "";
    const bedsLine = lodging.bedsBreakdown ? `\n        bedsBreakdown: "${lodging.bedsBreakdown}",` : "";

    const newEntry = `
      {
        type: "${lodging.type}",
        sleeps: [${lodging.sleeps[0]}, ${lodging.sleeps[1]}],
        nightlyRange: [${lodging.nightlyRange[0]}, ${lodging.nightlyRange[1]}],
        amenities: [${amenitiesStr}],
        areaDescription: "${lodging.areaDescription}",${searchUrlLine}
        notes: "${lodging.notes}",${ratingLine}${bedsLine}
      },`;

    // Insert before closing "]"
    content = content.slice(0, lodgingEnd) + newEntry + "\n    " + content.slice(lodgingEnd);
    modified = true;
    added++;
    console.log(`  Added lodging to: ${city}`);
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${file}\n`);
  }
}

console.log(`Lodging options added: ${added}`);
