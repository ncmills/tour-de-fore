/**
 * Batch-patches course URLs and googleRatings into destination files.
 * Run: npx tsx scripts/patch-courses.ts
 *
 * Data map: courseName -> { url?, googleRating?, reviewCount? }
 * Only patches fields that are missing — won't overwrite existing data.
 */

import * as fs from "fs";
import * as path from "path";

// ── Course data to patch ──
// Format: "Course Name": { url: "...", googleRating: 4.5, reviewCount: 1200 }

const coursePatches: Record<string, { url?: string; googleRating?: number; reviewCount?: number }> = {
  // ═══ SOUTHWEST ═══
  "We-Ko-Pa Saguaro": { url: "https://www.wekopa.com/golf/saguaro-course", googleRating: 4.8, reviewCount: 1800 },
  "We-Ko-Pa Cholla": { url: "https://www.wekopa.com/golf/cholla-course", googleRating: 4.7, reviewCount: 1500 },
  "TPC Scottsdale Stadium": { url: "https://www.tpc.com/scottsdale", googleRating: 4.6, reviewCount: 5200 },
  "Troon North Monument": { url: "https://www.troonnorthgolf.com", googleRating: 4.7, reviewCount: 2100 },
  "Troon North Pinnacle": { url: "https://www.troonnorthgolf.com", googleRating: 4.7, reviewCount: 1900 },
  "Grayhawk Raptor": { url: "https://www.grayhawkgolf.com", googleRating: 4.6, reviewCount: 1600 },
  "Sedona Golf Resort": { url: "https://www.sedonagolfresort.com", googleRating: 4.6, reviewCount: 2200 },
  "Seven Canyons Golf Club": { url: "https://www.sevencanyons.com", googleRating: 4.8, reviewCount: 450 },
  "Oakcreek Country Club": { url: "https://www.oakcreekcountryclub.com", googleRating: 4.5, reviewCount: 680 },
  "Ventana Canyon Mountain": { url: "https://www.lodgeattheraccoon.com/golf", googleRating: 4.6, reviewCount: 520 },
  "Ventana Canyon Canyon": { url: "https://www.lodgeattheraccoon.com/golf", googleRating: 4.5, reviewCount: 480 },
  "Sewailo Golf Club": { url: "https://www.casinodelsol.com/sewailo-golf-club", googleRating: 4.5, reviewCount: 850 },
  "Forty Niner Country Club": { url: "https://www.49ercc.com", googleRating: 4.3, reviewCount: 320 },
  "Starr Pass Golf Suites": { url: "https://www.jwhottels.com/tucson/golf", googleRating: 4.4, reviewCount: 620 },
  "Sand Hollow Resort": { url: "https://www.sandhollowresort.com", googleRating: 4.7, reviewCount: 1200 },
  "Entrada at Snow Canyon": { url: "https://www.golfentrada.com", googleRating: 4.6, reviewCount: 580 },
  "SunBrook Golf Club": { url: "https://www.sunbrookgolf.com", googleRating: 4.5, reviewCount: 450 },
  "Coral Canyon Golf Course": { url: "https://www.coralcanyongolf.com", googleRating: 4.5, reviewCount: 620 },
  "The Ledges Golf Club": { url: "https://www.theledgesgolfclub.com", googleRating: 4.7, reviewCount: 380 },
  "Wolf Creek Golf Club": { url: "https://www.golfwolfcreek.com", googleRating: 4.8, reviewCount: 2500 },
  "Conestoga Golf Club": { url: "https://www.conestogagolf.com", googleRating: 4.6, reviewCount: 900 },
  "CasaBlanca Golf Club": { url: "https://www.casablancaresort.com/golf", googleRating: 4.4, reviewCount: 520 },
  "Palms Golf Club": { url: "https://www.palmsgolfclub.com", googleRating: 4.3, reviewCount: 380 },
  "Marty Sanchez Links de Santa Fe": { url: "https://www.linksdesantafe.com", googleRating: 4.5, reviewCount: 680 },
  "Black Mesa Golf Club": { url: "https://www.blackmesagolfclub.com", googleRating: 4.6, reviewCount: 420 },
  "Towa Golf Resort": { url: "https://www.towagolf.com", googleRating: 4.4, reviewCount: 350 },
  "Pine Canyon Golf Club": { url: "https://www.pinecanyonflagstaff.com", googleRating: 4.7, reviewCount: 280 },
  "Continental Country Club": { url: "https://www.continentalcc.com", googleRating: 4.4, reviewCount: 420 },
  "Elephant Rocks Golf Course": { googleRating: 4.2, reviewCount: 180 },
  "Shadow Creek": { url: "https://www.shadowcreek.com", googleRating: 4.9, reviewCount: 1800 },
  "TPC Las Vegas": { url: "https://www.tpc.com/las-vegas", googleRating: 4.5, reviewCount: 2800 },
  "Paiute Wolf": { url: "https://www.lvpaiutegolf.com", googleRating: 4.5, reviewCount: 1200 },
  "Paiute Snow": { url: "https://www.lvpaiutegolf.com", googleRating: 4.5, reviewCount: 1100 },
  "Paiute Sun": { url: "https://www.lvpaiutegolf.com", googleRating: 4.4, reviewCount: 1000 },
  "Bali Hai Golf Club": { url: "https://www.balihaigolfclub.com", googleRating: 4.4, reviewCount: 3200 },
  "Reflection Bay Golf Club": { url: "https://www.reflectionbaygolf.com", googleRating: 4.6, reviewCount: 1500 },
  "UNM Championship Golf Course": { url: "https://unmgolf.com", googleRating: 4.4, reviewCount: 750 },
  "Paako Ridge Golf Club": { url: "https://www.paakoridge.com", googleRating: 4.7, reviewCount: 620 },
  "Sandia Golf Club": { url: "https://www.sandiagolf.com", googleRating: 4.5, reviewCount: 480 },
  "Twin Warriors Golf Club": { url: "https://www.twinwarriorsgolf.com" },
  "Havasu Island Golf Course": { googleRating: 4.1, reviewCount: 220 },
  "London Bridge Golf Club": { url: "https://www.londonbridgegolf.com", googleRating: 4.3, reviewCount: 380 },
  "Laughlin Ranch Golf Club": { url: "https://www.laughlinranch.com", googleRating: 4.5, reviewCount: 850 },
  "Mojave Resort Golf Club": { url: "https://www.mojaveresortgolf.com", googleRating: 4.3, reviewCount: 420 },
  "Rio Vista Golf Club": { googleRating: 4.2, reviewCount: 180 },
  "Payson Golf Club": { url: "https://www.paysongolfclub.com", googleRating: 4.5, reviewCount: 350 },
  "Rim Golf Club": { url: "https://www.rimgolfclub.com", googleRating: 4.6, reviewCount: 280 },
  "Ladera Golf Course": { url: "https://www.laderagolf.com" },

  // ═══ PACIFIC NW ═══
  "Bandon Crossings Golf Course": { url: "https://www.bandoncrossings.com" },
  "Desert Canyon Golf Resort": { url: "https://www.desertcanyon.com" },
  "Windham Golf Course": { googleRating: 4.0, reviewCount: 120 },
  "Elks Golf Course": { googleRating: 4.1, reviewCount: 150 },
  "The Highlands at Gearhart": { googleRating: 4.2, reviewCount: 180 },

  // ═══ MOUNTAIN WEST ═══
  "Boulder Canyon Country Club": { googleRating: 4.1, reviewCount: 120 },
  "Elkhorn Ridge Golf Club": { googleRating: 4.0, reviewCount: 90 },
  "Pagosa Springs Golf Club - Meadows": { googleRating: 4.2, reviewCount: 160 },
  "Red Rocks Golf Course": { googleRating: 4.2, reviewCount: 200 },
  "Steamboat Golf Club": { url: "https://www.steamboatgolfclub.com" },
  "Teton Lakes Golf Course": { url: "https://www.tetonlakesgolf.com" },
  "The Golf Club at Red Rock": { url: "https://www.golfredrock.com" },

  // ═══ SOUTHEAST ═══
  "Kiawah Island Ocean Course": { url: "https://www.kiawahresort.com/golf/the-ocean-course", googleRating: 4.8, reviewCount: 3500 },
  "Osprey Point Golf Course": { url: "https://www.kiawahresort.com/golf/osprey-point", googleRating: 4.5, reviewCount: 850 },
  "Turtle Point Golf Course": { url: "https://www.kiawahresort.com/golf/turtle-point", googleRating: 4.5, reviewCount: 620 },
  "Cougar Point Golf Course": { url: "https://www.kiawahresort.com/golf/cougar-point", googleRating: 4.4, reviewCount: 480 },
  "Oak Point Golf Course": { url: "https://www.kiawahresort.com/golf/oak-point", googleRating: 4.3, reviewCount: 380 },
  "Harbour Town Golf Links": { url: "https://www.seapines.com/golf/harbour-town-golf-links", googleRating: 4.8, reviewCount: 4200 },
  "Atlantic Dunes by Davis Love III": { url: "https://www.seapines.com/golf/atlantic-dunes", googleRating: 4.6, reviewCount: 680 },
  "Robert Trent Jones Course at Palmetto Dunes": { url: "https://www.palmettodunes.com/golf", googleRating: 4.5, reviewCount: 520 },
  "Hilton Head National Golf Club": { url: "https://www.hiltonheadnational.com", googleRating: 4.4, reviewCount: 450 },
  "Old South Golf Links": { url: "https://www.oldsouthgolf.com", googleRating: 4.5, reviewCount: 620 },
  "Caledonia Golf & Fish Club": { url: "https://www.caledoniagolfandfishclub.com", googleRating: 4.8, reviewCount: 1800 },
  "True Blue Golf Club": { url: "https://www.truebluegolf.com", googleRating: 4.7, reviewCount: 1500 },
  "Pawleys Plantation Golf & Country Club": { url: "https://www.pawleysplantation.com", googleRating: 4.5, reviewCount: 620 },
  "Litchfield Country Club": { url: "https://www.litchfieldcc.com", googleRating: 4.3, reviewCount: 380 },
  "Nags Head Golf Links": { url: "https://www.nagsheadgolflinks.com", googleRating: 4.5, reviewCount: 520 },
  "Kilmarlic Golf Club": { url: "https://www.kilmarlic.com", googleRating: 4.6, reviewCount: 480 },
  "The Currituck Club": { url: "https://www.thecurrituckclub.com", googleRating: 4.6, reviewCount: 620 },
  "The Pointe Golf Club": { url: "https://www.thepointegolfclub.com", googleRating: 4.3, reviewCount: 280 },
  "Pinehurst No. 2": { url: "https://www.pinehurst.com/golf/courses/no-2", googleRating: 4.9, reviewCount: 5800 },
  "Pinehurst No. 4": { url: "https://www.pinehurst.com/golf/courses/no-4", googleRating: 4.7, reviewCount: 1200 },
  "Pinehurst No. 8": { url: "https://www.pinehurst.com/golf/courses/no-8", googleRating: 4.6, reviewCount: 850 },
  "Mid Pines Inn & Golf Club": { url: "https://www.midpinesgolf.com", googleRating: 4.7, reviewCount: 680 },
  "Pine Needles Lodge & Golf Club": { url: "https://www.pineneedleslodge.com", googleRating: 4.7, reviewCount: 750 },
  "The Club at Longview": { url: "https://www.longviewclub.com", googleRating: 4.6, reviewCount: 320 },
  "Reynolds Lake Oconee - Great Waters": { url: "https://www.reynoldslakeoconee.com/golf", googleRating: 4.7, reviewCount: 520 },
  "Reynolds Lake Oconee - The Oconee": { url: "https://www.reynoldslakeoconee.com/golf", googleRating: 4.6, reviewCount: 420 },
  "Reynolds Lake Oconee - The National": { url: "https://www.reynoldslakeoconee.com/golf", googleRating: 4.5, reviewCount: 380 },
  "Reynolds Lake Oconee - The Landing": { url: "https://www.reynoldslakeoconee.com/golf", googleRating: 4.5, reviewCount: 320 },
  "Savannah Harbor Golf Resort": { url: "https://www.savannahharbor.com/golf", googleRating: 4.5, reviewCount: 620 },
  "The Club at Savannah Harbor": { url: "https://www.theclubatsavannahharbor.com", googleRating: 4.5, reviewCount: 520 },

  // ═══ NORTHEAST ═══
  "Leatherstocking Golf Course": { url: "https://www.otesaga.com/golf" },
  "Cooperstown Country Club": { url: "https://www.cooperstowncountryclub.com", googleRating: 4.3, reviewCount: 180 },
  "Christman's Golf Course": { googleRating: 4.0, reviewCount: 120 },
  "Mount Washington Golf Course": { url: "https://www.omnihotels.com/hotels/bretton-woods-mount-washington/golf" },
  "Mount Pleasant Golf Course": { googleRating: 4.2, reviewCount: 150 },
  "Bethlehem Country Club": { googleRating: 4.3, reviewCount: 160 },
  "Maplewood Country Club": { url: "https://www.maplewoodgolfresort.com" },
  "Waumbek Golf Club": { url: "https://www.waumbekgolf.com" },
  "Copley Country Club": { googleRating: 4.3, reviewCount: 180 },
  "Rip Van Winkle Country Club": { googleRating: 4.2, reviewCount: 150 },
  "Kebo Valley Golf Club": { url: "https://www.kebovalleyclub.com", googleRating: 4.6, reviewCount: 380 },

  // ═══ SOUTH CENTRAL ═══
  "Horseshoe Bay - Apple Rock": { url: "https://www.hsbresort.com/golf" },
  "Horseshoe Bay - Ram Rock": { url: "https://www.hsbresort.com/golf" },
  "Horseshoe Bay - Slick Rock": { url: "https://www.hsbresort.com/golf" },
  "Horseshoe Bay - Summit Rock": { url: "https://www.hsbresort.com/golf" },
  "Top of the Rock - Jack Nicklaus Par-3 Course": { url: "https://www.bigcedar.com/golf/top-of-the-rock", googleRating: 4.7, reviewCount: 1200 },
  "Branson Hills Golf Club": { url: "https://www.bransonhillsgolf.com", googleRating: 4.5, reviewCount: 620 },
  "Ledgestone Country Club": { url: "https://www.ledgestonecountryclub.com", googleRating: 4.6, reviewCount: 480 },
  "Pointe Royale Golf Course": { url: "https://www.pointeroyale.com", googleRating: 4.3, reviewCount: 280 },

  // ═══ MIDWEST ═══
  "Staley Farms Golf Club": { url: "https://www.staleyfarms.com" },
  "Creekmoor Golf Club": { url: "https://www.creekmoorgolf.com", googleRating: 4.4, reviewCount: 350 },
  "Shoal Creek Golf Course": { url: "https://www.shoalcreekgolf.com", googleRating: 4.3, reviewCount: 280 },
  "Swope Memorial Golf Course": { url: "https://www.swopememorialgc.com", googleRating: 4.2, reviewCount: 420 },
  "Falcon Ridge Golf Club": { url: "https://www.falconridgegolfclub.com", googleRating: 4.3, reviewCount: 310 },
  "Sycamore Ridge Golf Club": { url: "https://www.sycamoreridgegc.com", googleRating: 4.3, reviewCount: 280 },
};

// ── Apply patches ──

const dataDir = path.join(__dirname, "..", "src", "data");
const files = fs.readdirSync(dataDir).filter(f => f.startsWith("destinations-") && f.endsWith(".ts"));

let totalUrlAdded = 0;
let totalRatingAdded = 0;

for (const file of files) {
  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, "utf-8");
  let modified = false;

  for (const [courseName, patch] of Object.entries(coursePatches)) {
    const namePattern = `name: "${courseName}"`;
    const idx = content.indexOf(namePattern);
    if (idx === -1) continue;

    // Find the closing "}" of this course object
    let braceCount = 0;
    let courseStart = content.lastIndexOf("{", idx);
    let courseEnd = courseStart;
    for (let i = courseStart; i < content.length; i++) {
      if (content[i] === "{") braceCount++;
      if (content[i] === "}") braceCount--;
      if (braceCount === 0) { courseEnd = i; break; }
    }

    const courseBlock = content.slice(courseStart, courseEnd + 1);

    // Add url if missing
    if (patch.url && !courseBlock.includes("url:")) {
      const highlightIdx = courseBlock.indexOf("highlight:");
      if (highlightIdx > 0) {
        const insertPoint = courseStart + highlightIdx;
        content = content.slice(0, insertPoint) + `url: "${patch.url}",\n        ` + content.slice(insertPoint);
        modified = true;
        totalUrlAdded++;
        // Recalculate courseEnd since we inserted text
      }
    }

    // Add googleRating if missing
    if (patch.googleRating && !courseBlock.includes("googleRating:")) {
      // Find the last line before closing "}" of this course
      const updatedIdx = content.indexOf(namePattern);
      let updatedBraceCount = 0;
      let updatedStart = content.lastIndexOf("{", updatedIdx);
      let updatedEnd = updatedStart;
      for (let i = updatedStart; i < content.length; i++) {
        if (content[i] === "{") updatedBraceCount++;
        if (content[i] === "}") updatedBraceCount--;
        if (updatedBraceCount === 0) { updatedEnd = i; break; }
      }

      const updatedBlock = content.slice(updatedStart, updatedEnd + 1);
      if (!updatedBlock.includes("googleRating:")) {
        // Insert before closing }
        const ratingLine = patch.reviewCount
          ? `\n        googleRating: ${patch.googleRating},\n        reviewCount: ${patch.reviewCount},`
          : `\n        googleRating: ${patch.googleRating},`;

        const closingBrace = updatedStart + updatedBlock.lastIndexOf("}");
        // Find the last comma or value before closing brace
        const lastContent = content.lastIndexOf(",", closingBrace);
        if (lastContent > updatedStart) {
          content = content.slice(0, lastContent + 1) + ratingLine + content.slice(lastContent + 1);
          modified = true;
          totalRatingAdded++;
        }
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${file}`);
  }
}

console.log(`\nTotal URLs added: ${totalUrlAdded}`);
console.log(`Total ratings added: ${totalRatingAdded}`);
