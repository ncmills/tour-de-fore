/**
 * Fills missing course URLs by generating them from course names
 * and known resort/brand patterns.
 *
 * Run: npx tsx scripts/fill-urls.ts
 */

import * as fs from "fs";
import * as path from "path";
import { allDestinations } from "../src/data/index";

// Brand/chain URL patterns
const brandUrls: Record<string, string> = {
  "TPC": "https://www.tpc.com",
  "Omni": "https://www.omnihotels.com",
  "Ritz-Carlton": "https://www.ritzcarlton.com",
};

// Generate a URL from course name
function generateUrl(name: string, city: string): string | null {
  // Strip common suffixes
  let slug = name
    .replace(/ Golf Course$/, "")
    .replace(/ Golf Club$/, "")
    .replace(/ Country Club.*$/, "")
    .replace(/ Golf & Country Club$/, "")
    .replace(/ Golf & Tennis.*$/, "")
    .replace(/ Golf Links$/, "")
    .replace(/ Golf Resort$/, "")
    .replace(/ Resort & Country Club$/, "")
    .replace(/ Golf & Ski Resort$/, "")
    .replace(/ Golf & Athletic Club$/, "")
    .replace(/ \(.*\)$/, "") // Remove parenthetical
    .replace(/ - .*$/, "") // Remove "- Subtitle"
    .trim();

  // Generate slug for URL
  const urlSlug = slug.toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "")
    .trim();

  if (urlSlug.length < 3) return null;

  return `https://www.${urlSlug}golf.com`;
}

// Specific known URLs for common courses (exact matches)
const exactUrls: Record<string, string> = {
  // Southwest
  "Aguila Golf Course": "https://www.phoenix.gov/parks/golf/courses/aguila",
  "SunRiver Golf Club": "https://www.sunrivergolf.com",
  "Southgate Golf Club": "https://www.southgategolf.com",
  "Pine Canyon Club": "https://www.pinecanyonflagstaff.com",
  "London Bridge Golf Club (East Course)": "https://www.londonbridgegolf.com",
  "London Bridge Golf Club (West Course)": "https://www.londonbridgegolf.com",
  "Havasu Springs Resort Golf Course": "https://www.havasusprings.com/golf",
  "Emerald River Golf Course": "https://www.emeraldrivergolf.com",
  "Desert Lakes Golf Course": "https://www.desertlakesgc.com",
  "Chaparral Country Club": "https://www.chaparralcc.com",
  "Chaparral Pines Golf Club": "https://www.chaparralpines.com",
  // Pacific NW
  "Lost Tracks Golf Club": "https://www.losttracks.com",
  "Widgi Creek Golf Club": "https://www.widgi.com",
  "The Dalles Golf & Country Club": "https://www.thedallesgolf.com",
  "Elk Ridge Golf Course": "https://www.elkridgegolf.com",
  "Priest Lake Golf Course": "https://www.priestlakegolf.com",
  "Walla Walla Country Club": "https://www.wallawallacountryclub.com",
  "Fiddler's Green Golf Course": "https://www.fiddlersgreengolf.com",
  "Seaside Golf Course": "https://www.seasidegolfcourse.com",
  "Astoria Golf & Country Club": "https://www.astoriagolf.com",
  // Mountain West
  "Spearfish Canyon Country Club": "https://www.spearfishcanyoncc.com",
  "Jug Mountain Ranch Golf Course": "https://www.jugmountainranch.com",
  "Red Rocks Golf Course": "https://www.redrocksgolf.com",
  "Osprey Meadows at Tamarack Resort": "https://www.tamarackidaho.com/golf",
  // Midwest
  "Crystal Downs Country Club": "https://www.crystaldowns.org",
  "Ridgeview Country Club": "https://www.ridgeviewcc.com",
  "Egypt Valley Country Club (public days)": "https://www.egyptvalley.com",
  "Cherry Hills Golf Course": "https://www.cherryhillsgolf.com",
  "Aston Oaks Golf Club": "https://www.astonoaks.com",
  "Stonelick Hills Golf Club": "https://www.stonelickhills.com",
  "The Golf Club at Little Turtle": "https://www.littleturtlegolf.com",
  "New Albany Links Golf Club": "https://www.newalbanylinks.com",
  "Cumberland Trail Golf Club": "https://www.cumberlandtrailgolf.com",
  "The Trophy Club": "https://www.thetrophyclub.com",
  "Waveland Golf Course": "https://www.wavelandgolf.com",
  "Copper Creek Golf Course": "https://www.coppercreekgolf.com",
  "Timber Ridge Golf Course": "https://www.timberridgegolf.com",
  "Riverside Golf Course": "https://www.riversidegolfstl.com",
  "Tiburon Golf Club": "https://www.tiburongolf.com",
  "Willow Lakes Golf Course": "https://www.willowlakesgolf.com",
  // Southeast
  "Henderson Golf Club": "https://www.hendersongolfclub.com",
  "Kearney Hill Golf Links": "https://www.kearneyhill.com",
  "Cherry Blossom Golf Course": "https://www.cherryblossomgolf.com",
  "University Club of Kentucky - Big Blue": "https://www.uclubky.com",
  "Keene Trace Golf Club - Champions Course": "https://www.keenetrace.com",
  "Biltmore Forest Country Club": "https://www.biltmoreforestcc.com",
  "The Cliffs at Walnut Cove": "https://www.cliffsliving.com/golf",
  "TPC Myrtle Beach": "https://www.tpc.com/myrtle-beach",
  "Barefoot Resort - Dye Course": "https://www.barefootgolf.com",
  "Tidewater Golf Club": "https://www.tidewatergolf.com",
  "Myrtlewood Palmetto Course": "https://www.myrtlewoodgolf.com",
  "Gaylord Springs Golf Links": "https://www.gaylordsprings.com",
  "Hermitage Golf Course - Presidents Reserve": "https://www.hermitagegolf.com",
  "Nashville Golf & Athletic Club": "https://www.nashvillegolfclub.com",
  "Old Hickory Country Club (public times)": "https://www.oldhickorycc.com",
  "The Honors Course": "https://www.thehonorscourse.com",
  "The Course at Sewanee": "https://www.sewanee.edu/golf",
  "Bear Trace at Harrison Bay": "https://www.beartracegolf.com",
  "Lookout Mountain Golf Club": "https://www.lookoutmountaingc.com",
  "Omni Amelia Island - Oak Marsh": "https://www.omnihotels.com/hotels/amelia-island/golf",
  "Amelia Island Club at Long Point": "https://www.ameliaislandclub.com",
  "Amelia National Golf & Country Club": "https://www.amelianational.com",
  "TPC Sawgrass - Stadium Course": "https://www.tpc.com/sawgrass",
  "World Golf Village - King & Bear": "https://www.worldgolfvillage.com/golf",
  "World Golf Village - Slammer & Squire": "https://www.worldgolfvillage.com/golf",
  "St. Johns Golf & Country Club": "https://www.stjohnsgolf.com",
  "Tiburon Golf Club - Gold Course": "https://www.ritzcarlton.com/en/hotels/naples/golf",
  "Lely Resort - Flamingo Island": "https://www.lelyresort.com/golf",
  "Lely Resort - Mustang Course": "https://www.lelyresort.com/golf",
  "Naples Beach Hotel Golf Club": "https://www.naplesbeachhotel.com/golf",
  "The Concession Golf Club": "https://www.theconcessiongolfclub.com",
  "University Park Country Club": "https://www.universitypark-fl.com/golf",
  "The Links at Greenfield Plantation": "https://www.greenfieldplantation.com",
  "Ritz-Carlton Members Club": "https://www.ritzcarlton.com/en/hotels/sarasota/golf",
  "ChampionsGate - International Course": "https://www.championsgate.com/golf",
  "Orange County National - Panther Lake": "https://www.ocngolf.com",
  "Reunion Resort - Watson Course": "https://www.reunionresort.com/golf",
  "Shingle Creek Golf Club": "https://www.shinglecreekgolf.com",
  "Fallen Oak": "https://www.fallenoak.com",
  "Grand Bear Golf Course": "https://www.grandbeargolf.com",
  "Windance Country Club": "https://www.windancecountryclub.com",
  "Sea Island Golf Club - Seaside": "https://www.seaisland.com/golf",
  "Sea Island Golf Club - Plantation": "https://www.seaisland.com/golf",
  "Reynolds Lake Oconee - Great Waters": "https://www.reynoldslakeoconee.com/golf",
  "Reynolds Lake Oconee - The Oconee": "https://www.reynoldslakeoconee.com/golf",
  "Reynolds Lake Oconee - The National": "https://www.reynoldslakeoconee.com/golf",
  "Reynolds Lake Oconee - The Landing": "https://www.reynoldslakeoconee.com/golf",
  "Bay Point Golf Club - Nicklaus Design": "https://www.baypointgolf.com",
  "Regatta Bay Golf & Yacht Club": "https://www.regattabay.com",
  "Kelly Plantation Golf Club": "https://www.kellyplantationgolf.com",
  "Sandestin - Raven Golf Club": "https://www.sandestin.com/golf",
  "Bayou Oaks at City Park - Championship": "https://www.bayouoaksgolf.com",
  "TPC Louisiana": "https://www.tpc.com/louisiana",
  "Audubon Park Golf Course": "https://www.audubonnatureinstitute.org/golf",
  "English Turn Golf & Country Club": "https://www.englishturn.com",
  // Northeast
  "Kebo Valley Golf Club": "https://www.kebovalleyclub.com",
  "Cooperstown Country Club": "https://www.cooperstowncountryclub.com",
  // South Central
  "La Cantera - The Resort Course": "https://www.lacanteragolfclub.com",
  "TPC San Antonio - AT&T Oaks": "https://www.tpc.com/san-antonio",
  "Brackenridge Park Golf Course": "https://www.alamocitygolftrail.com",
  "Vaaler Creek Golf Club": "https://www.vaalercreek.com",
  "Lady Bird Johnson Golf Course": "https://www.ladybirdjohnsongolf.com",
  "Grey Rock Golf Club": "https://www.greyrockgc.com",
  "Wolfdancer Golf Club": "https://www.wolfdancergolfclub.com",
  "Pointe Royale Golf Course": "https://www.pointeroyale.com",
  "Southern Hills Country Club": "https://www.southernhillscc.com",
  "The Club at Indian Springs": "https://www.indianspringsgolf.com",
  "Karsten Creek Golf Club": "https://www.karstencreek.com",
  "Hot Springs Country Club - Arlington": "https://www.hotspringscc.com",
  "Hot Springs Village - Balboa": "https://www.explorethevillage.com/golf",
  "Hot Springs Village - DeSoto": "https://www.explorethevillage.com/golf",
  "Mountain Ranch Golf Club": "https://www.mountainranchgolfclub.com",
  "The Old Course at Broken Sound": "https://www.brokensoundclub.com/golf",
  "Porto Cima Golf Club": "https://www.portocima.com",
  "The Cove Golf Course": "https://www.thecovegolf.com",
  "Osage National Golf Club": "https://www.osagenational.com",
};

// Apply URLs
const dataDir = path.join(__dirname, "..", "src", "data");
const files = fs.readdirSync(dataDir).filter(f => f.startsWith("destinations-") && f.endsWith(".ts"));

let urlsAdded = 0;

for (const file of files) {
  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, "utf-8");
  let modified = false;

  for (const [courseName, url] of Object.entries(exactUrls)) {
    const nameStr = `name: "${courseName}"`;
    const idx = content.indexOf(nameStr);
    if (idx === -1) continue;

    // Find course block
    let bc = 0, cs = content.lastIndexOf("{", idx), ce = cs;
    for (let i = cs; i < content.length; i++) {
      if (content[i] === "{") bc++;
      if (content[i] === "}") bc--;
      if (bc === 0) { ce = i; break; }
    }
    const block = content.slice(cs, ce + 1);

    if (!block.includes("url:")) {
      const hi = block.indexOf("highlight:");
      if (hi > 0) {
        const insertAt = cs + hi;
        content = content.slice(0, insertAt) + `url: "${url}",\n        ` + content.slice(insertAt);
        modified = true;
        urlsAdded++;
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${file}`);
  }
}

console.log(`\nURLs added: ${urlsAdded}`);
