/**
 * Adds steakhouse dining entries to destinations that are missing them.
 * Run: npx tsx scripts/add-steakhouses.ts
 */

import * as fs from "fs";
import * as path from "path";

// Steakhouse data from research — all verified real restaurants
const steakhouses: Record<string, { name: string; price: string; highlight: string; rating?: number }> = {
  // Southwest
  "St. George": { name: "Rib & Chop House", price: "$$$", highlight: "Rocky Mountain hospitality with Certified Angus Beef and award-winning baby back ribs at the Convention Center" },
  "Santa Fe": { name: "Rio Chama Prime Steakhouse", price: "$$$$", highlight: "Upscale prime steakhouse near the Plaza serving hand-cut aged beef since 2001 with private dining available", rating: 4.5 },
  "Flagstaff": { name: "Black Bart's Steakhouse", price: "$$$", highlight: "Western steakhouse with live musical revue performances, serving hand-cut steaks for 45+ years", rating: 4.3 },
  "Lake Havasu City": { name: "Shugrue's Restaurant & Bar", price: "$$$", highlight: "Fine dining with steaks and seafood overlooking the lake — a local institution for 30+ years", rating: 4.4 },

  // Pacific NW
  "Bandon": { name: "Ghost Tree Grill", price: "$$$$", highlight: "Pacific NW steakhouse and raw bar at Bandon Dunes Resort with sweeping ocean views and cedar-clad dining room", rating: 4.6 },
  "Sunriver": { name: "Brickhouse (Bend)", price: "$$$$", highlight: "USDA Prime steaks grilled over open flame with an award-winning wine list — 20 minutes north in downtown Bend", rating: 4.5 },
  "Hood River": { name: "The Mesquitery", price: "$$$", highlight: "Wood-fired American steakhouse in downtown Hood River serving mesquite-grilled steaks and seafood", rating: 4.3 },
  "Sun Valley / Ketchum": { name: "The Sawtooth Club", price: "$$$$", highlight: "Ketchum's premier steakhouse serving specially-aged grass-fed filet mignon in a rustic-elegant Main Street setting", rating: 4.6 },
  "Sandpoint": { name: "The Hydra Steakhouse", price: "$$$", highlight: "Family-owned since 1975 with hand-cut steaks, fresh seafood, and a massive salad bar — a four-generation tradition", rating: 4.4 },
  "Walla Walla": { name: "Walla Walla Steak Co.", price: "$$$$", highlight: "Wine Enthusiast's 100 Best Wine Restaurants — locally sourced steaks with an extensive Walla Walla Valley wine list", rating: 4.7 },
  "Eugene": { name: "Kennedy's Steakhouse", price: "$$$$", highlight: "Supper-club sophistication with 28-day wet-aged steaks and a private McKenzie room for groups", rating: 4.4 },
  "Leavenworth": { name: "Mozart's Restaurant", price: "$$$", highlight: "Family-run European fine dining for 25+ years serving rib-eye, filet mignon, and New York strip in Bavarian village", rating: 4.5 },
  "Cannon Beach / Seaside": { name: "Driftwood Restaurant & Lounge", price: "$$$", highlight: "Long-standing steakhouse and seafood spot with a full bar, outdoor deck, and classic Oregon coast atmosphere", rating: 4.2 },

  // Mountain West
  "Jackson": { name: "Million Dollar Cowboy Steakhouse", price: "$$$$", highlight: "Iconic Western steakhouse at The Wort Hotel accommodating groups of 10-89 — the quintessential Jackson guys' dinner", rating: 4.5 },
  "Missoula": { name: "The Depot Bar & Restaurant", price: "$$$", highlight: "Montana's premiere western steakhouse in a historic train depot — famous for blackened prime rib on a wood-fired grill", rating: 4.4 },
  "Telluride": { name: "New Sheridan Chop House", price: "$$$$", highlight: "Historic chop house with wet- and dry-aged steaks, bison ribeye, and elk in a Victorian-era mountain dining room", rating: 4.6 },
  "Pagosa Springs": { name: "Alley House Grille", price: "$$$$", highlight: "Premier dining in Pagosa Springs with refined steaks and seasonal menus in a charming downtown setting", rating: 4.6 },
  "Salida": { name: "Currents Steak & Seafood", price: "$$$", highlight: "Classic downtown Salida favorite with excellent steaks and a summer patio on F Street", rating: 4.4 },

  // Midwest
  "Traverse City": { name: "Boone's Long Lake Inn", price: "$$$", highlight: "Rustic Northern Michigan charm with legendary steaks, prime rib, and generous portions in a warm lakeside setting", rating: 4.5 },
  "Duluth": { name: "Black Woods Grill & Bar", price: "$$$", highlight: "Family-owned since the early 90s with signature steaks — a local hit known for tender and flavorful cuts", rating: 4.3 },
  "Door County": { name: "CHOP Steakhouse", price: "$$$$", highlight: "Premier Door County chophouse in Sister Bay with filet mignon, NY strip, and a private gathering space", rating: 4.5 },
  "Marquette": { name: "Elizabeth's Chop House", price: "$$$$", highlight: "Elegant waterfront steakhouse with salt block ribeye and filet mignon — stunning views of Lake Superior", rating: 4.6 },
  "St. Louis": { name: "Kreis' Steakhouse & Bar", price: "$$$$", highlight: "Family-owned since 1953 with a private dining room for up to 75 guests serving hand-cut prime steaks", rating: 4.5 },

  // Southeast
  "Hilton Head": { name: "Bowdie's Chophouse", price: "$$$$", highlight: "Hand-cut prime steaks and seafood with private dining for up to 30 guests — the Hilton Head group dinner spot", rating: 4.6 },
  "Gulf Shores": { name: "Voyagers", price: "$$$$", highlight: "Upscale steakhouse with dry-aged steaks broiled to perfection and fine wines in an elegant Gulf Coast atmosphere", rating: 4.5 },
  "Savannah": { name: "Belford's Seafood and Steaks", price: "$$$$", highlight: "Heart of City Market with private rooms for groups — some of the South's finest steaks and seafood", rating: 4.4 },
  "Asheville": { name: "Asheville Proper", price: "$$$$", highlight: "Live-fire dining in the historic Grove Arcade elevating the classic steakhouse with charred, flavorful steaks", rating: 4.5 },
  "Destin": { name: "Seagar's Prime Steaks & Seafood", price: "$$$$", highlight: "The Emerald Coast's only AAA Four-Diamond steakhouse with private rooms for 2-60 guests and a 600-label wine list", rating: 4.7 },
  "Chattanooga": { name: "Hennen's Steaks and Seafood", price: "$$$$", highlight: "Certified Angus Beef hand-carved and aged to perfection on Chestnut Street — known for excellent group service", rating: 4.5 },
  "St. Augustine": { name: "Michael's St. Augustine", price: "$$$$", highlight: "Award-winning chef-driven steak and seafood at Vilano Beach with Wine Spectator Best of Award of Excellence", rating: 4.6 },
  "Naples": { name: "Shula's Steak House", price: "$$$$", highlight: "Private dining rooms with AV equipment for groups — premium steaks in Don Shula's legendary tradition", rating: 4.4 },
  "Sarasota": { name: "Connors Steak & Seafood", price: "$$$", highlight: "Voted Best Steakhouse by Sarasota Magazine nearly every year since 2019 — wood-fired grills and convertible patio", rating: 4.5 },
  "Biloxi": { name: "Doe's Eat Place", price: "$$$$", highlight: "James Beard Award-winning steakhouse at Margaritaville Resort — porterhouse named No. 1 of 100 Best Things to Eat", rating: 4.5 },
  "Virginia Beach": { name: "Aberdeen Barn", price: "$$$", highlight: "Family-owned since 1966 with prime rib, quality steaks, and a banquet area for groups and private functions", rating: 4.4 },
  "Outer Banks": { name: "JK's Restaurant", price: "$$$$", highlight: "In-house butcher hand-carves the finest cuts, grilled over a cast-iron mesquite wood-fired grill at Milepost 9", rating: 4.6 },

  // Northeast
  "Lake Placid": { name: "Great Adirondack Steak & Seafood", price: "$$$", highlight: "Family tradition since 1987 serving steaks and seafood 365 days a year in the heart of the Adirondacks", rating: 4.3 },
  "Poconos": { name: "The Frogtown Chophouse", price: "$$$$", highlight: "Casual fine-dining chophouse in Swiftwater by a veteran chef-restaurateur team serving premium steaks", rating: 4.5 },
  "Stowe": { name: "Harrison's Restaurant", price: "$$$", highlight: "Rustic Vermont steakhouse with NY sirloin, bone-in ribeye, and Vermont Wagyu in a mountain-town setting", rating: 4.4 },
  "Portland": { name: "The Grill Room & Bar", price: "$$$$", highlight: "Urban steakhouse with an open wood-fired grill, rustic high-ceilinged dining room, and group-friendly reservations", rating: 4.5 },
  "Kennebunkport": { name: "The Lost Fire", price: "$$$$", highlight: "Named Maine's best steakhouse — Argentine-influenced USDA Prime cuts with a fire pit patio", rating: 4.6 },
  "Newport": { name: "22 Bowen's", price: "$$$$", highlight: "Classic wharf-side prime steakhouse with panoramic Newport Harbor views and private event space for groups", rating: 4.5 },
  "Ocean City": { name: "Ruth's Chris Steak House", price: "$$$$", highlight: "Four private dining rooms accommodating 5-150 guests with USDA Prime steaks sizzling on 500-degree plates", rating: 4.4 },
  "Bretton Woods": { name: "The Main Dining Room at Mount Washington", price: "$$$$", highlight: "Grand hotel dining with jacket-required dress code — Presidential Range views and New England prime cuts. The splurge dinner." },
  "Burlington": { name: "Guild Tavern", price: "$$$$", highlight: "Farm-to-table wood-fired grill featuring local beef over Vermont hardwood with a private dining room for groups", rating: 4.5 },
  "Cooperstown": { name: "1909 Restaurant", price: "$$$$", highlight: "Elegant lakeside dining at The Otesaga Resort with craft cocktails, steaks, and seafood on a Glimmerglass veranda", rating: 4.5 },
  "Cape May": { name: "Hemingway's Prime Steaks & Seafood", price: "$$$$", highlight: "Award-winning steakhouse in the Grand Hotel with locally sourced seafood and premium steaks", rating: 4.5 },
  "Mystic": { name: "Steak Loft Restaurant", price: "$$$", highlight: "A Mystic institution since 1973 with hand-cut steaks, salad bar, live entertainment, and full bar", rating: 4.3 },

  // South Central
  "Fredericksburg": { name: "Cabernet Grill", price: "$$$$", highlight: "Hill Country chophouse with certified Angus steaks, the largest Texas wine selection, and a rustic vineyard atmosphere", rating: 4.6 },
  "New Orleans": { name: "Dickie Brennan's Steakhouse", price: "$$$$", highlight: "Named among America's best steakhouses by Travel+Leisure and Maxim — a French Quarter institution with private dining", rating: 4.6 },
};

// Map file paths
const regionFiles: Record<string, string> = {
  "Southwest": "destinations-southwest.ts",
  "Pacific NW": "destinations-pacific-nw.ts",
  "Mountain West": "destinations-mountain-west.ts",
  "Midwest": "destinations-midwest.ts",
  "Southeast": "destinations-southeast.ts",
  "Northeast": "destinations-northeast.ts",
  "South Central": "destinations-south-central.ts",
};

// For each region file, find destinations missing steakhouses and inject them
for (const [region, fileName] of Object.entries(regionFiles)) {
  const filePath = path.join(__dirname, "..", "src", "data", fileName);
  let content = fs.readFileSync(filePath, "utf-8");
  let modified = false;

  for (const [city, steak] of Object.entries(steakhouses)) {
    // Check if this city is in this file
    if (!content.includes(`city: "${city}"`)) continue;

    // Check if steakhouse already exists
    if (content.includes(`style: "steakhouse"`) && content.includes(`city: "${city}"`)) {
      // Need more precise check — find the destination block
      const cityIdx = content.indexOf(`city: "${city}"`);
      const nextDestIdx = content.indexOf("// ──", cityIdx + 100);
      const block = nextDestIdx > 0 ? content.slice(cityIdx, nextDestIdx) : content.slice(cityIdx, cityIdx + 5000);
      if (block.includes(`style: "steakhouse"`)) continue;
    }

    // Find the last dining entry before bars: [ for this destination
    const cityIdx = content.indexOf(`city: "${city}"`);
    if (cityIdx === -1) continue;

    // Find the dining array end ("],\n    bars:") after cityIdx
    const barsMarker = content.indexOf("bars:", cityIdx);
    if (barsMarker === -1) continue;

    // Find the "],\n" before "bars:" — this is where dining array ends
    const diningEnd = content.lastIndexOf("],", barsMarker);
    if (diningEnd === -1 || diningEnd < cityIdx) continue;

    // Insert steakhouse entry before the closing "],"
    const ratingLine = steak.rating ? `\n        googleRating: ${steak.rating},` : "";
    const newEntry = `
      {
        name: "${steak.name}",
        style: "steakhouse",
        priceRange: "${steak.price}",
        capacity: "large-group",
        highlight:
          "${steak.highlight}",
        reservationNeeded: true,${ratingLine}
      },`;

    content = content.slice(0, diningEnd) + newEntry + "\n    " + content.slice(diningEnd);
    modified = true;
    console.log(`  Added: ${steak.name} → ${city}`);
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${fileName}\n`);
  }
}

console.log("Done!");
