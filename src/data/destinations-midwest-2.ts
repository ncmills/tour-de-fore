import { Destination } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Midwest, Part 2 — destination-golf gaps (Sand Valley, Erin Hills, the Michigan
// golf-mecca corridor, Ohio's tournament classics, the Kansas dunes, and the
// Dakotas). All data web-verified June 2026 from course websites, Golf Digest,
// GolfPass, bluegolf scorecards, and resort sources.
// ─────────────────────────────────────────────────────────────────────────────

export const midwest2Destinations: Destination[] = [
  // ─── Sand Valley, WI ─────────────────────────────────────────────────
  {
    id: "sand-valley-wi",
    city: "Sand Valley",
    state: "WI",
    region: "Midwest",
    tagline: "Wisconsin's answer to Bandon — sand-dune golf in the middle of nowhere",
    description:
      "Mike Keiser's inland Bandon: firm, fast, walking-only links carved from 12,000 acres of prehistoric sand dunes in central Wisconsin. Coore & Crenshaw, David McLay Kidd, and Tom Doak all built here. This is a pure golf pilgrimage — you stay on property, you walk, and you play until you can't.",
    population: "tiny",
    nearestAirport: {
      code: "CWA",
      name: "Central Wisconsin Airport (Mosinee)",
      driveMinutes: 45,
    },
    bestSeasons: ["summer", "fall"],
    groceryNotes:
      "Remote — stock up in Wisconsin Rapids (25 min) or Nekoosa before arrival. On-site dining (Mammoth Bar, Craig's Porch, Aldo's) covers most meals.",
    courses: [
      {
        name: "Sand Valley (Coore & Crenshaw)",
        tier: "bucket-list",
        greenFeeRange: [195, 395],
        holes: 18,
        par: 72,
        yardage: 6913,
        rating: 73.2,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://www.sandvalley.com/golf-courses",
        highlight:
          "The original Bill Coore & Ben Crenshaw design that started it all — heaving sandy fairways and exposed dunes",
        hypeTag: "TOP 100 PUBLIC",
        rankNote: "Top 100 Public — Golf Digest",
      },
      {
        name: "Mammoth Dunes (David McLay Kidd)",
        tier: "bucket-list",
        greenFeeRange: [195, 395],
        holes: 18,
        par: 73,
        yardage: 6988,
        rating: 72.4,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://www.sandvalley.com/golf-courses/mammoth-dunes",
        highlight:
          "David McLay Kidd's wide, generous, dramatic dunescape — playable for the whole crew but visually massive",
        hypeTag: "TOP 100 PUBLIC",
        rankNote: "Top 100 Public — Golf Digest",
      },
      {
        name: "Sedge Valley (Tom Doak)",
        tier: "premium",
        greenFeeRange: [150, 325],
        holes: 18,
        par: 68,
        yardage: 5829,
        rating: 68.3,
        walkable: true,
        style: "heathland",
        driveMinutes: 0,
        url: "https://www.sandvalley.com/golf-courses",
        highlight:
          "Tom Doak's 2024 heathland tribute to England's classics — short par 68 that plays bigger than the card",
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "The Lido (Tom Doak recreation)",
        tier: "bucket-list",
        greenFeeRange: [250, 450],
        holes: 18,
        par: 72,
        yardage: 7000,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://www.sandvalley.com/golf-courses",
        highlight:
          "A faithful recreation of C.B. Macdonald's lost 1917 Long Island masterpiece — golf archaeology you can play",
        hypeTag: "BUCKET LIST",
      },
      {
        name: "The Sandbox (par-3 course)",
        tier: "premium",
        greenFeeRange: [75, 150],
        holes: 17,
        par: 51,
        yardage: 1652,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://www.sandvalley.com/golf-courses",
        highlight:
          "17-hole Coore & Crenshaw par-3 with cold beers, big bets, and zero stress — the best afternoon on property",
        hypeTag: "HIDDEN GEM",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [4, 16],
        nightlyRange: [400, 1600],
        amenities: [
          "on-site golf",
          "walk to first tee",
          "multiple restaurants",
          "fire pits",
          "caddie program",
        ],
        areaDescription:
          "On-resort cottages and lodge rooms at Sand Valley — book a cluster of cottages for the group",
        searchUrl: "https://www.sandvalley.com/stay",
        notes:
          "Staying on property is the whole point — you walk to golf and the social scene (Mammoth Bar, fire pits) is right there. Book the cottages or Sand Box lodging blocks early; summer sells out a year ahead.",
      },
      {
        type: "house",
        sleeps: [8, 16],
        nightlyRange: [300, 800],
        amenities: ["full kitchen", "lake access", "deck", "grill"],
        areaDescription:
          "Lake-area rentals around Wisconsin Rapids / Nekoosa / Castle Rock Lake, 20-30 min from the resort",
        searchUrl:
          "https://www.vrbo.com/search?destination=Wisconsin%20Rapids%2C%20WI&groupSize=12",
        notes:
          "Off-property lake houses are cheaper and good for a self-catering crew, but you'll drive in for golf and miss the resort social scene.",
      },
    ],
    dining: [
      {
        name: "Mammoth Bar",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "The resort's social hub — burgers, beers, and the post-round scene overlooking Mammoth Dunes",
        reservationNeeded: false,
      },
      {
        name: "Aldo's Farm to Table",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Resort's upscale farm-to-table dining room for the big group steak-and-wine night",
        reservationNeeded: true,
      },
      {
        name: "Craig's Porch",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Sandwiches, breakfast, and turn food at the Sandbox — easy daytime fuel between loops",
        reservationNeeded: false,
      },
      {
        name: "Lake Hub (Wisconsin Rapids)",
        style: "brewpub",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Local Wisconsin Rapids gastropub if you want to get off-property one night",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Mammoth Bar",
        vibe: "patio",
        highlight:
          "Big patio, fire pits, and dune views — where every Sand Valley night begins and ends",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Volcano (fire-pit lounge)",
        vibe: "patio",
        highlight:
          "Open-air fire-pit gathering spot for cigars, whiskey, and settling the day's bets",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Sandbox Bar",
        vibe: "patio",
        highlight:
          "Order a beer at the turn and play the 17-hole par-3 with a drink in hand",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Lake Leopold paddle & swim",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [0, 40],
        groupFriendly: true,
        highlight:
          "Kayaks, paddleboards, and a spring-fed swimming lake right on the resort for a rest-day reset",
        bestFor: "rest day",
        provider: "Sand Valley Resort",
      },
      {
        name: "Sand Valley Tennis & Pickleball",
        type: "go-karts",
        duration: "1-2 hours",
        pricePerPerson: [20, 50],
        groupFriendly: true,
        highlight:
          "On-property grass tennis and pickleball courts for a non-golf competitive outlet",
        bestFor: "rest day",
        provider: "Sand Valley Resort",
      },
      {
        name: "Central Sands fishing & hunting",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [50, 150],
        groupFriendly: true,
        highlight:
          "Guided fishing on the area's lakes and rivers, or sporting clays nearby in the off-golf hours",
        bestFor: "rest day",
        provider: "Local guides",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [8, 24],
        hourlyRate: [120, 250],
        providers: [
          "Sand Valley Resort shuttles",
          "Coach USA (Wausau)",
          "Wisconsin Rapids charter services",
        ],
        notes:
          "On-property shuttles handle airport runs from CWA and movement between lodging and courses. Limited nightlife means a party bus is rarely needed — this is a stay-on-property golf retreat.",
        canDoGolfAndBars: false,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 175],
        providers: [
          "Sand Valley private dining",
          "Cozymeal (Central Wisconsin)",
        ],
        mealTypes: ["steak dinner", "cookout", "breakfast spread"],
        notes:
          "The resort can arrange private group dining and chef-driven dinners; for off-property rentals, book a central-Wisconsin chef 2+ weeks out.",
      },
    ],
  },

  // ─── Erin Hills, WI ──────────────────────────────────────────────────
  {
    id: "erin-hills-wi",
    city: "Erin Hills",
    state: "WI",
    region: "Midwest",
    tagline: "Walk the 2017 U.S. Open links 35 minutes from Milwaukee",
    description:
      "The fescue-framed, walking-only links that hosted the 2017 U.S. Open (Brooks Koepka, -16). Nearly 8,000 yards of glacial-terrain golf with no homes, no carts, and a serious lodge on site. A pure bucket-list day-trip from Milwaukee or a centerpiece for a Wisconsin golf swing.",
    population: "tiny",
    nearestAirport: {
      code: "MKE",
      name: "Milwaukee Mitchell International Airport",
      driveMinutes: 50,
    },
    bestSeasons: ["summer", "fall"],
    groceryNotes:
      "Rural Washington County — stock up in Hartford or Hwy 60 corridor; on-site dining at the lodge covers golf-day meals.",
    courses: [
      {
        name: "Erin Hills Golf Course",
        tier: "bucket-list",
        greenFeeRange: [280, 350],
        holes: 18,
        par: 72,
        yardage: 7800,
        rating: 75.0,
        slope: 139,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://erinhills.com",
        highlight:
          "2017 U.S. Open host — walking-only, caddie-driven links over rumpled glacial terrain with brutal fescue",
        hypeTag: "TOURNAMENT HOST",
        rankNote: "2017 U.S. Open Host — USGA",
      },
      {
        name: "The Lawsonia Links",
        tier: "bucket-list",
        greenFeeRange: [110, 180],
        holes: 18,
        par: 72,
        yardage: 6764,
        walkable: true,
        style: "links",
        driveMinutes: 65,
        url: "https://www.golfwisconsin.com/golfcourses/lawsonia-links",
        highlight:
          "Add the 1930 Langford & Moreau template classic at Green Lake for a two-course links day",
        hypeTag: "TOP 100 PUBLIC",
        rankNote: "Top 100 Public — Golf Digest / Golfweek Top 100 You Can Play",
      },
      {
        name: "Washington County Golf Course",
        tier: "solid",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 72,
        yardage: 7065,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.washcogolf.com",
        highlight:
          "Arthur Hills-designed county muni minutes from Erin Hills — a serious, affordable warm-up round",
        hypeTag: "BEST VALUE",
      },
      {
        name: "Erin Hills Short Course",
        tier: "premium",
        greenFeeRange: [50, 90],
        holes: 10,
        par: 30,
        yardage: 1200,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://erinhills.com",
        highlight:
          "On-site short course and putting course for evening games and side bets after the big loop",
        hypeTag: "HIDDEN GEM",
      },
    ],
    lodging: [
      {
        type: "lodge",
        sleeps: [4, 16],
        nightlyRange: [300, 650],
        amenities: [
          "on-site golf",
          "walk to first tee",
          "fitness center",
          "lodge dining",
          "fire pit",
        ],
        areaDescription:
          "The Lodge and cottages at Erin Hills — book a block to stay steps from the first tee",
        searchUrl: "https://erinhills.com/stay/",
        notes:
          "Staying on site gets you early/late access and the caddie-yard culture. Limited rooms — book a year out for prime summer dates.",
      },
      {
        type: "house",
        sleeps: [8, 16],
        nightlyRange: [250, 600],
        amenities: ["full kitchen", "deck", "grill", "lake access"],
        areaDescription:
          "Lake-country and Holy Hill-area rentals around Hartford / Hubertus, 15-25 min from Erin Hills",
        searchUrl:
          "https://www.vrbo.com/search?destination=Hartford%2C%20WI&groupSize=12",
        notes:
          "Off-property houses near Hartford or Pike Lake are cheaper for a self-catering group and put you between Erin Hills and Milwaukee nightlife.",
      },
    ],
    dining: [
      {
        name: "Erin Hills Lodge Dining",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "On-site lodge restaurant for a group steak-and-bourbon dinner after the round",
        reservationNeeded: true,
      },
      {
        name: "The Olympia (Oconomowoc area)",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Classic Wisconsin supper-club energy — broasted chicken, relish trays, and brandy old-fashioneds",
        reservationNeeded: false,
      },
      {
        name: "Linie's (Hartford)",
        style: "brewpub",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Local Hartford pub and grill for an easy off-property dinner near the courses",
        reservationNeeded: false,
      },
      {
        name: "Fork in the Road (Hartford)",
        style: "casual",
        priceRange: "$",
        capacity: "medium",
        highlight:
          "Hearty Wisconsin breakfast spot to fuel up before an 8,000-yard walk",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Erin Hills Lodge Bar",
        vibe: "whiskey-bar",
        highlight:
          "Deep bourbon list and U.S. Open memorabilia — the natural 19th hole",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Holy Hill Art Farm & Cidery patio",
        vibe: "patio",
        highlight:
          "Rural cidery patio near Holy Hill for a relaxed afternoon beer with the crew",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Hartford taverns (Main St)",
        vibe: "dive",
        highlight:
          "Small-town Wisconsin corner bars in Hartford for cheap rounds and a jukebox",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Holy Hill Basilica & scenic drive",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 15],
        groupFriendly: true,
        highlight:
          "Climb the basilica tower for the best view in southeast Wisconsin on a rest-day morning",
        bestFor: "rest day",
        provider: "Basilica of Holy Hill",
      },
      {
        name: "Pike Lake / Kettle Moraine paddle",
        type: "kayaking",
        duration: "half day",
        pricePerPerson: [25, 60],
        groupFriendly: true,
        highlight:
          "Kayak rentals and trails in the Kettle Moraine State Forest minutes from Erin Hills",
        bestFor: "rest day",
        provider: "Kettle Moraine State Forest",
      },
      {
        name: "MillerCoors / Milwaukee brewery tour",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [20, 50],
        groupFriendly: true,
        highlight:
          "Tack on a Milwaukee brewery crawl (Miller, Lakefront, Third Space) 45 min south",
        bestFor: "arrival day",
        provider: "Various Milwaukee breweries",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 30],
        hourlyRate: [120, 260],
        providers: [
          "Lamers Bus Lines",
          "Milwaukee party bus operators",
          "Go Riteway",
        ],
        notes:
          "Shuttle from MKE and between Erin Hills, Lawsonia, and Milwaukee nightlife. Pair AM golf with a PM Milwaukee bar run on the big night.",
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 160],
        providers: ["Cozymeal (Milwaukee)", "Take a Chef", "Local Hartford caterers"],
        mealTypes: ["steak dinner", "Wisconsin fish fry", "breakfast spread"],
        notes:
          "Book a Milwaukee-area chef for a private dinner at your lake house; a Friday fish fry is the move for a Wisconsin trip.",
      },
    ],
  },

  // ─── Green Lake, WI ──────────────────────────────────────────────────
  {
    id: "green-lake-wi",
    city: "Green Lake",
    state: "WI",
    region: "Midwest",
    tagline: "Wisconsin's deepest lake and a 1930 links time capsule",
    description:
      "Lawsonia Links is one of the great Golden-Age courses in America — a 1930 William Langford & Theodore Moreau masterpiece of bold geometric bunkering and elevated greens, untouched for nearly a century. Pair it with Wisconsin's deepest inland lake for a low-key, high-golf retreat.",
    population: "tiny",
    nearestAirport: {
      code: "MKE",
      name: "Milwaukee Mitchell International Airport",
      driveMinutes: 90,
    },
    bestSeasons: ["summer", "fall"],
    groceryNotes:
      "Small-town grocery in Green Lake / Ripon; bigger stores in Fond du Lac (35 min). Pre-order for a lake-house crew.",
    courses: [
      {
        name: "The Links at Lawsonia",
        tier: "bucket-list",
        greenFeeRange: [110, 180],
        holes: 18,
        par: 72,
        yardage: 6764,
        walkable: true,
        style: "links",
        driveMinutes: 5,
        url: "https://www.golfwisconsin.com/golfcourses/lawsonia-links",
        highlight:
          "1930 Langford & Moreau original — 90+ geometric bunkers, plateau greens, and the famous boxcar par 3",
        hypeTag: "TOP 100 PUBLIC",
        rankNote: "Golfweek Top 100 You Can Play / Golf Digest 100 Greatest Public",
      },
      {
        name: "The Woodlands at Lawsonia",
        tier: "premium",
        greenFeeRange: [70, 120],
        holes: 18,
        par: 72,
        yardage: 6618,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://lawsonia.com",
        highlight:
          "Lawsonia's second course — a tighter, tree-lined parkland round that complements the Links",
        hypeTag: "BEST VALUE",
      },
      {
        name: "Tuscumbia Country Club",
        tier: "solid",
        greenFeeRange: [50, 90],
        holes: 18,
        par: 71,
        yardage: 6243,
        walkable: true,
        style: "parkland",
        driveMinutes: 8,
        url: "https://www.tuscumbia.com",
        highlight:
          "Wisconsin's oldest golf course (1896) on the shore of Green Lake — a charming, walkable classic",
        hypeTag: "HIDDEN GEM",
      },
      {
        name: "Mascoutin Golf Club",
        tier: "solid",
        greenFeeRange: [45, 75],
        holes: 18,
        par: 72,
        yardage: 6855,
        walkable: true,
        style: "parkland",
        driveMinutes: 12,
        url: "https://www.mascoutin.com",
        highlight:
          "Solid value parkland 27-hole facility nearby in Berlin to round out a multi-day trip",
        hypeTag: "BEST VALUE",
      },
    ],
    lodging: [
      {
        type: "lakehouse",
        sleeps: [8, 16],
        nightlyRange: [350, 900],
        amenities: [
          "private dock",
          "lake access",
          "boat slip",
          "deck",
          "grill",
          "fire pit",
        ],
        areaDescription:
          "Green Lake shoreline homes — Wisconsin's deepest lake, with docks and boats included",
        searchUrl:
          "https://www.vrbo.com/search?destination=Green%20Lake%2C%20WI&groupSize=12",
        notes:
          "A lake house on Green Lake is the play — golf by day, boat and bonfire by night. Book early for July/August weekends.",
      },
      {
        type: "resort-house",
        sleeps: [4, 16],
        nightlyRange: [200, 450],
        amenities: ["on-site golf", "lodge rooms", "restaurant", "lake nearby"],
        areaDescription:
          "Lodging at Lawsonia and the Heidel House resort area on Green Lake",
        searchUrl: "https://lawsonia.com",
        notes:
          "Lawsonia and nearby resorts offer room blocks if you'd rather walk to the first tee than self-cater.",
      },
    ],
    dining: [
      {
        name: "Goose Blind Grill & Bar",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Green Lake's go-to burgers-and-beers joint with a big group-friendly room",
        reservationNeeded: false,
      },
      {
        name: "Norton's of Green Lake",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Lakefront supper club with prime rib, walleye, and dock-up boat access",
        reservationNeeded: true,
      },
      {
        name: "The Foundry (Ripon)",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Ripon farm-to-table spot for a nicer group dinner off the lake",
        reservationNeeded: true,
      },
      {
        name: "Tuscumbia clubhouse grill",
        style: "casual",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Old-school clubhouse lunch overlooking Wisconsin's oldest fairways",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Goose Blind",
        vibe: "sports-bar",
        highlight:
          "Green Lake's social anchor — patio, big screens, and a deep beer list",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Norton's dock bar",
        vibe: "patio",
        highlight:
          "Boat-up lakeside bar for sunset cocktails after golf",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Knockers Pub & Grill (Ripon)",
        vibe: "dive",
        highlight:
          "Friendly Ripon corner bar for cheap pitchers and pool when you want off the lake",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Green Lake pontoon & boat rental",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [40, 100],
        groupFriendly: true,
        highlight:
          "Rent a pontoon on Wisconsin's deepest lake for a rest-day cruise with a cooler aboard",
        bestFor: "rest day",
        provider: "Green Lake area marinas",
      },
      {
        name: "Green Lake fishing charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [75, 175],
        groupFriendly: true,
        highlight:
          "Guided lake trout and walleye fishing on a 237-foot-deep glacial lake",
        bestFor: "morning before golf",
        provider: "Local Green Lake guides",
      },
      {
        name: "Thrasher Opera House / town stroll",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [20, 50],
        groupFriendly: true,
        highlight:
          "Small-town Green Lake nightlife and local taprooms for a relaxed evening",
        bestFor: "arrival day",
        provider: "Downtown Green Lake",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [8, 24],
        hourlyRate: [110, 240],
        providers: ["Lamers Bus Lines", "Fox Valley charter operators"],
        notes:
          "Limited local nightlife means a shuttle is mainly for airport runs from MKE/ATW and course transfers. Boat is the real transport here.",
        canDoGolfAndBars: false,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 150],
        providers: ["Cozymeal (Fox Valley)", "Local Green Lake caterers"],
        mealTypes: ["steak dinner", "fish boil", "breakfast spread"],
        notes:
          "Hire a chef for a dock-side dinner at the lake house; a Wisconsin fish fry or boil is the signature move.",
      },
    ],
  },

  // ─── Gaylord, MI ─────────────────────────────────────────────────────
  {
    id: "gaylord-mi",
    city: "Gaylord",
    state: "MI",
    region: "Midwest",
    tagline: "Michigan's Golf Mecca — dozens of courses on one I-75 exit",
    description:
      "Northern Michigan's golf capital: Treetops Resort alone packs 81 holes by Robert Trent Jones Sr., Tom Fazio, and Rick Smith, and a dozen more designer tracks (Otsego, Black Forest, The Loon) cluster within 20 minutes. Cheap, abundant, and built for a high-volume buddy trip.",
    population: "small",
    nearestAirport: {
      code: "PLN",
      name: "Pellston Regional Airport",
      driveMinutes: 45,
    },
    bestSeasons: ["summer", "fall"],
    groceryNotes:
      "Full-size grocery (Meijer, Walmart) and liquor right in Gaylord off I-75 — easy stock-up for a rental.",
    courses: [
      {
        name: "Treetops Resort — Masterpiece (RTJ Sr.)",
        tier: "premium",
        greenFeeRange: [90, 175],
        holes: 18,
        par: 71,
        yardage: 7060,
        walkable: false,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.treetops.com",
        highlight:
          "Robert Trent Jones Sr.'s dramatic, elevation-charged signature course — the one that made Gaylord famous",
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "Treetops Resort — Premier (Fazio)",
        tier: "premium",
        greenFeeRange: [85, 160],
        holes: 18,
        par: 72,
        yardage: 6701,
        walkable: false,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.treetops.com",
        highlight:
          "Tom Fazio's only Michigan design — a 4.5-star Golf Digest track winding through hardwood ridges",
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "Treetops Resort — Threetops (par 3)",
        tier: "premium",
        greenFeeRange: [40, 75],
        holes: 9,
        par: 27,
        yardage: 1400,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.treetops.com",
        highlight:
          "Rick Smith's famed par-3 course — host of ESPN's old Par-3 Shootout and a money-game classic",
        hypeTag: "HIDDEN GEM",
      },
      {
        name: "Black Forest at Wilderness Valley",
        tier: "premium",
        greenFeeRange: [60, 110],
        holes: 18,
        par: 73,
        yardage: 7044,
        walkable: false,
        style: "mountain",
        driveMinutes: 15,
        url: "https://www.blackforestgolf.com",
        highlight:
          "Tom Doak's brawny early design — big, bold, and one of the toughest tests in northern Michigan",
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "Otsego Club — The Tribute",
        tier: "premium",
        greenFeeRange: [55, 100],
        holes: 18,
        par: 72,
        yardage: 7349,
        walkable: false,
        style: "mountain",
        driveMinutes: 8,
        url: "https://www.otsegoclub.com",
        highlight:
          "Sweeping valley views and dramatic elevation changes overlooking the Sturgeon River Valley",
        hypeTag: "LOCALS' FAVORITE",
      },
      {
        name: "The Loon Golf Resort",
        tier: "solid",
        greenFeeRange: [45, 80],
        holes: 18,
        par: 72,
        yardage: 6700,
        walkable: false,
        style: "parkland",
        driveMinutes: 12,
        url: "https://www.theloongolf.com",
        highlight:
          "Friendly, well-conditioned value track — great for the round where you just want to score",
        hypeTag: "BEST VALUE",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [8, 20],
        nightlyRange: [250, 700],
        amenities: [
          "on-site golf",
          "ski-in cottages",
          "hot tub",
          "multiple restaurants",
          "fire pits",
        ],
        areaDescription:
          "Treetops and Otsego Club cottages and chalets — stay-and-play packages bundle rooms with tee times",
        searchUrl: "https://www.treetops.com/stay/",
        notes:
          "Stay-and-play packages are the smart buy in Gaylord — they bundle lodging, carts, and multiple courses at a steep discount. Book the cottages for the group.",
      },
      {
        type: "cabin",
        sleeps: [8, 16],
        nightlyRange: [200, 550],
        amenities: ["full kitchen", "lake access", "deck", "grill", "fire pit"],
        areaDescription:
          "Lake-area cabins around Otsego Lake and Gaylord, minutes from the courses and I-75",
        searchUrl:
          "https://www.vrbo.com/search?destination=Gaylord%2C%20MI&groupSize=12",
        notes:
          "Otsego Lake cabins give you a self-catering base with lake access; central to the whole Gaylord course cluster.",
      },
    ],
    dining: [
      {
        name: "Treetops — Legends Restaurant",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Resort steakhouse with valley views for the group's big-dinner night",
        reservationNeeded: true,
      },
      {
        name: "BLT's (Big Buck Brewery)",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Gaylord's iconic Big Buck Brewery — house beers, burgers, and a huge group room",
        reservationNeeded: false,
      },
      {
        name: "Diana's Delights / Mary's Tavern",
        style: "casual",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Classic up-north tavern grub and breakfast to fuel a 36-hole day",
        reservationNeeded: false,
      },
      {
        name: "Bennethum's Northern Inn",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Long-running northern-Michigan supper club — whitefish, steaks, and a fireplace room",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Big Buck Brewery",
        vibe: "brewpub",
        highlight:
          "Gaylord's brewery institution — pours, pool, and the natural 19th-hole HQ",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Treetops Sports Bar",
        vibe: "sports-bar",
        highlight:
          "On-resort sports bar to settle bets and watch games after the round",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Iron Pig Smokehouse bar",
        vibe: "patio",
        highlight:
          "BBQ-and-bourbon bar with a patio for a relaxed Gaylord evening",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Pigeon River ATV / off-road tour",
        type: "atv",
        duration: "half day",
        pricePerPerson: [90, 180],
        groupFriendly: true,
        highlight:
          "Ride the trails of the Pigeon River Country State Forest — elk country and big northern woods",
        bestFor: "rest day",
        provider: "Local ATV outfitters",
      },
      {
        name: "Sturgeon / AuSable River fly fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [100, 250],
        groupFriendly: true,
        highlight:
          "Blue-ribbon trout streams minutes from town for the anglers in the crew",
        bestFor: "morning before golf",
        provider: "Northern Michigan guides",
      },
      {
        name: "Call of the Wild / downtown brewery crawl",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [25, 60],
        groupFriendly: true,
        highlight:
          "Big Buck plus Alpine Tavern and downtown Gaylord's Alpine-themed Main Street",
        bestFor: "arrival day",
        provider: "Downtown Gaylord",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 30],
        hourlyRate: [110, 250],
        providers: [
          "Treetops resort shuttles",
          "Northern Michigan charter operators",
          "Indian Trails",
        ],
        notes:
          "Resort shuttles and local charters handle course-to-course transfers across the Gaylord cluster. Bundle AM golf + PM brewery run on the big night.",
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 150],
        providers: ["Cozymeal (Northern MI)", "Local Gaylord caterers"],
        mealTypes: ["steak dinner", "whitefish dinner", "BBQ cookout", "breakfast"],
        notes:
          "Book a northern-Michigan chef for a cabin dinner; planked whitefish or a steak night pairs well with a lake-cabin base.",
      },
    ],
  },

  // ─── Roscommon, MI (Forest Dunes) ────────────────────────────────────
  {
    id: "roscommon-mi",
    city: "Roscommon",
    state: "MI",
    region: "Midwest",
    tagline: "Tom Doak's reversible course in the middle of the Michigan woods",
    description:
      "Forest Dunes is a destination unto itself: a Tom Weiskopf championship course plus The Loop — Tom Doak's fully reversible 18 that plays clockwise one day and counterclockwise the next, two courses on one piece of ground. Remote, walking-friendly, and pure golf-nerd catnip.",
    population: "tiny",
    nearestAirport: {
      code: "MBS",
      name: "MBS International Airport (Saginaw)",
      driveMinutes: 75,
    },
    bestSeasons: ["summer", "fall"],
    groceryNotes:
      "Very rural — stock up in Grayling (20 min) or Houghton Lake before arrival. On-site dining covers golf-day meals.",
    courses: [
      {
        name: "Forest Dunes Golf Club (Weiskopf)",
        tier: "bucket-list",
        greenFeeRange: [120, 250],
        holes: 18,
        par: 72,
        yardage: 7141,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://www.forestdunesgolf.com",
        highlight:
          "Tom Weiskopf's sandy, pine-framed masterpiece — perennially ranked among America's best public courses",
        hypeTag: "TOP 100 PUBLIC",
        rankNote: "Top 100 Public — Golf Digest",
      },
      {
        name: "The Loop — Black (clockwise)",
        tier: "bucket-list",
        greenFeeRange: [110, 230],
        holes: 18,
        par: 70,
        yardage: 6704,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://www.forestdunesgolf.com",
        highlight:
          "Tom Doak's reversible routing played clockwise — walking-only, no carts, a genuine architectural marvel",
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "The Loop — Red (counterclockwise)",
        tier: "bucket-list",
        greenFeeRange: [110, 230],
        holes: 18,
        par: 70,
        yardage: 6841,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://www.forestdunesgolf.com",
        highlight:
          "Same 18 greens, opposite direction — a completely different course you play the very next day",
        hypeTag: "BUCKET LIST",
      },
      {
        name: "The Bootlegger (par 3)",
        tier: "premium",
        greenFeeRange: [40, 80],
        holes: 10,
        par: 30,
        yardage: 1100,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://www.forestdunesgolf.com",
        highlight:
          "On-site par-3 short course for sunset games and gambling after 36 holes",
        hypeTag: "HIDDEN GEM",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [4, 16],
        nightlyRange: [300, 900],
        amenities: [
          "on-site golf",
          "walk to first tee",
          "cottages",
          "lodge dining",
          "fire pit",
        ],
        areaDescription:
          "Lake AuSable Lodge and cottages at Forest Dunes — the only sensible base given how remote it is",
        searchUrl: "https://www.forestdunesgolf.com/stay/",
        notes:
          "Staying on property is essentially required — it's deep in the Huron National Forest. Book cottages for the group and play sunup to sundown.",
      },
      {
        type: "cabin",
        sleeps: [8, 14],
        nightlyRange: [200, 500],
        amenities: ["full kitchen", "river/lake access", "deck", "fire pit"],
        areaDescription:
          "AuSable River and Higgins/Houghton Lake cabins, 20-30 min from Forest Dunes",
        searchUrl:
          "https://www.vrbo.com/search?destination=Grayling%2C%20MI&groupSize=10",
        notes:
          "Off-property river cabins are cheaper and pair golf with AuSable canoeing, but you'll drive in for every round.",
      },
    ],
    dining: [
      {
        name: "Forest Dunes — Lake AuSable Lodge dining",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "On-site lodge restaurant — the group dinner spot since there's nothing else for miles",
        reservationNeeded: true,
      },
      {
        name: "Spike's Keg O' Nails (Grayling)",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Legendary Grayling burger-and-beer dive — an up-north institution",
        reservationNeeded: false,
      },
      {
        name: "Bear's Den Pizzeria (Grayling)",
        style: "casual",
        priceRange: "$",
        capacity: "medium",
        highlight:
          "Easy pizza-and-pitchers night when you want off-property",
        reservationNeeded: false,
      },
      {
        name: "Coyote Cabin (Houghton Lake)",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Up-north steaks and prime rib near Houghton Lake for a nicer night out",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Forest Dunes lodge bar",
        vibe: "whiskey-bar",
        highlight:
          "The clubhouse bar — bourbon, fire, and settling the reversible-course bets",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Spike's Keg O' Nails",
        vibe: "dive",
        highlight:
          "Classic Grayling dive for cheap beer and northern-Michigan character",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "The Lumberjack (Grayling)",
        vibe: "dive",
        highlight:
          "Small-town tavern with pool and a jukebox for the off-property night",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "AuSable River canoe / kayak",
        type: "kayaking",
        duration: "half day",
        pricePerPerson: [25, 60],
        groupFriendly: true,
        highlight:
          "Paddle the famous AuSable — Michigan's premier canoeing river runs right through the area",
        bestFor: "rest day",
        provider: "Grayling area liveries",
      },
      {
        name: "AuSable trout fly fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [100, 250],
        groupFriendly: true,
        highlight:
          "World-class trout water — the AuSable is the birthplace of Trout Unlimited",
        bestFor: "morning before golf",
        provider: "Local fly-fishing guides",
      },
      {
        name: "Huron National Forest ATV trails",
        type: "atv",
        duration: "half day",
        pricePerPerson: [90, 180],
        groupFriendly: true,
        highlight:
          "Miles of forest two-track and ORV trails right around the resort",
        bestFor: "rest day",
        provider: "Local ATV outfitters",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [8, 20],
        hourlyRate: [110, 240],
        providers: ["Forest Dunes shuttles", "Northern Michigan charter operators"],
        notes:
          "Mostly airport runs from MBS and the occasional Grayling dinner run — this is a stay-on-property, walk-the-courses retreat.",
        canDoGolfAndBars: false,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 165],
        providers: ["Cozymeal (Northern MI)", "Local Grayling caterers"],
        mealTypes: ["steak dinner", "trout dinner", "breakfast spread"],
        notes:
          "Forest Dunes can arrange private group dining; for river cabins, book a northern-Michigan chef well ahead given the remoteness.",
      },
    ],
  },

  // ─── Bay Harbor, MI ──────────────────────────────────────────────────
  {
    id: "bay-harbor-mi",
    city: "Bay Harbor",
    state: "MI",
    region: "Midwest",
    tagline: "Cliffside Lake Michigan golf at the BOYNE flagship",
    description:
      "Bay Harbor Golf Club is northern Michigan's most scenic 27 holes — Arthur Hills routed The Links, Quarry, and Preserve nines along towering bluffs and a shale quarry on Little Traverse Bay. It anchors the BOYNE golf empire (Bay Harbor, The Highlands, Crooked Tree), making this a luxe Lake Michigan golf base.",
    population: "small",
    nearestAirport: {
      code: "PLN",
      name: "Pellston Regional Airport",
      driveMinutes: 25,
    },
    bestSeasons: ["summer", "fall"],
    groceryNotes:
      "Full grocery and liquor in nearby Petoskey; Bay Harbor village has upscale markets. Easy stock-up.",
    courses: [
      {
        name: "Bay Harbor Golf Club — Links/Quarry",
        tier: "bucket-list",
        greenFeeRange: [150, 295],
        holes: 18,
        par: 72,
        yardage: 6845,
        rating: 74.3,
        slope: 146,
        walkable: false,
        style: "coastal",
        driveMinutes: 0,
        url: "https://www.bayharborgolf.com",
        highlight:
          "Cliff-edge holes over Little Traverse Bay plus a dramatic shale-quarry nine — 'Pebble Beach of the Midwest'",
        hypeTag: "TOP 100 PUBLIC",
        rankNote: "Top 100 Public — Golf Digest",
      },
      {
        name: "Bay Harbor Golf Club — Preserve",
        tier: "premium",
        greenFeeRange: [120, 250],
        holes: 9,
        par: 35,
        yardage: 3268,
        walkable: false,
        style: "parkland",
        driveMinutes: 0,
        url: "https://www.bayharborgolf.com",
        highlight:
          "The wooded, hillside Preserve nine — combine with Links or Quarry for a fresh 18 each day",
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "The Highlands — The Heather (RTJ Sr.)",
        tier: "premium",
        greenFeeRange: [90, 175],
        holes: 18,
        par: 72,
        yardage: 7210,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.highlandsharborsprings.com",
        highlight:
          "Robert Trent Jones Sr.'s northern-Michigan classic at BOYNE's Highlands resort",
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "Crooked Tree Golf Club",
        tier: "solid",
        greenFeeRange: [60, 120],
        holes: 18,
        par: 71,
        yardage: 6608,
        walkable: false,
        style: "parkland",
        driveMinutes: 8,
        url: "https://www.crookedtreegolfclub.com",
        highlight:
          "Hillside Harry Bowers design with Lake Michigan views from nearly every hole — strong value round",
        hypeTag: "BEST VALUE",
      },
      {
        name: "The Highlands — Donald Ross Memorial",
        tier: "premium",
        greenFeeRange: [90, 175],
        holes: 18,
        par: 72,
        yardage: 6814,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.highlandsharborsprings.com",
        highlight:
          "Eighteen recreated holes from Donald Ross's most famous courses — a greatest-hits design tour",
        hypeTag: "DESIGNER CLASSIC",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [8, 20],
        nightlyRange: [350, 1200],
        amenities: [
          "on-site golf",
          "marina access",
          "multiple restaurants",
          "spa",
          "lake views",
        ],
        areaDescription:
          "Bay Harbor village condos and the Inn at Bay Harbor — upscale Lake Michigan resort base",
        searchUrl: "https://www.boyne.com/baYharbor",
        notes:
          "BOYNE stay-and-play packages bundle Bay Harbor village lodging with all the BOYNE courses. Village condos suit a group that wants the marina-and-restaurant scene at the door.",
      },
      {
        type: "lakehouse",
        sleeps: [8, 16],
        nightlyRange: [400, 1100],
        amenities: ["private dock", "lake access", "deck", "grill", "fire pit"],
        areaDescription:
          "Little Traverse Bay and Walloon Lake homes around Petoskey/Harbor Springs",
        searchUrl:
          "https://www.vrbo.com/search?destination=Petoskey%2C%20MI&groupSize=12",
        notes:
          "Lake homes around Petoskey give a self-catering crew water access and central position to the whole BOYNE cluster.",
      },
    ],
    dining: [
      {
        name: "Sagamore Room (Inn at Bay Harbor)",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Bay Harbor's signature fine-dining room overlooking the marina and bay",
        reservationNeeded: true,
      },
      {
        name: "Knot Just a Bar",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Marina-side burgers, beers, and a deck — the easy group post-round spot in Bay Harbor village",
        reservationNeeded: false,
      },
      {
        name: "City Park Grill (Petoskey)",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Historic Petoskey restaurant and bar where Hemingway drank — steaks, seafood, and character",
        reservationNeeded: true,
      },
      {
        name: "Palette Bistro (Petoskey)",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Bayfront farm-to-table with sunset views over Little Traverse Bay",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Knot Just a Bar",
        vibe: "patio",
        highlight:
          "Marina deck bar in Bay Harbor village — the natural 19th hole",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "City Park Grill (Petoskey)",
        vibe: "cocktail",
        highlight:
          "Long mahogany bar in a Hemingway haunt — strong pours and history",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Beards Brewery (Petoskey)",
        vibe: "brewpub",
        highlight:
          "Petoskey craft brewery with a big taproom for a group beer night",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Little Traverse Bay charter & boat rental",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [60, 150],
        groupFriendly: true,
        highlight:
          "Rent a boat or charter on Lake Michigan's Little Traverse Bay for a rest-day cruise",
        bestFor: "rest day",
        provider: "Bay Harbor Marina",
      },
      {
        name: "Lake Michigan / Bear River fishing charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [125, 275],
        groupFriendly: true,
        highlight:
          "Salmon and trout charters out of Petoskey — big-water fishing for the crew",
        bestFor: "morning before golf",
        provider: "Petoskey fishing charters",
      },
      {
        name: "Petoskey breweries & downtown crawl",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [25, 60],
        groupFriendly: true,
        highlight:
          "Beards, Petoskey Brewing, and the Gaslight District for an evening off the course",
        bestFor: "arrival day",
        provider: "Downtown Petoskey",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 30],
        hourlyRate: [120, 270],
        providers: [
          "BOYNE resort shuttles",
          "Northern Michigan charter operators",
          "Petoskey limo services",
        ],
        notes:
          "BOYNE shuttles move groups between Bay Harbor, the Highlands, and Crooked Tree. Pair AM golf with a PM Petoskey bar run on the big night.",
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [80, 175],
        providers: ["Cozymeal (Northern MI)", "Take a Chef", "Local Petoskey caterers"],
        mealTypes: ["steak dinner", "Lake Michigan whitefish", "breakfast spread"],
        notes:
          "Hire a chef for a bay-view dinner at the condo or lake house; planked whitefish is the regional signature.",
      },
    ],
  },

  // ─── Acme, MI (Grand Traverse) ───────────────────────────────────────
  {
    id: "acme-mi",
    city: "Acme",
    state: "MI",
    region: "Midwest",
    tagline: "The Bear and three resort courses on Grand Traverse Bay",
    description:
      "Grand Traverse Resort is the big-resort golf base just east of Traverse City — Jack Nicklaus's notoriously tough 'The Bear,' Gary Player's 'The Wolverine,' and the Spruce Run resort course, all on one property overlooking East Grand Traverse Bay. Big lodging, casino next door, and wine country at the gate.",
    population: "tiny",
    nearestAirport: {
      code: "TVC",
      name: "Cherry Capital Airport (Traverse City)",
      driveMinutes: 15,
    },
    bestSeasons: ["summer", "fall"],
    groceryNotes:
      "Full grocery and Meijer in Traverse City (15 min); Acme has convenience stores. Easy stock-up for a rental.",
    courses: [
      {
        name: "Grand Traverse Resort — The Bear (Nicklaus)",
        tier: "premium",
        greenFeeRange: [110, 215],
        holes: 18,
        par: 72,
        yardage: 7065,
        walkable: false,
        style: "links",
        driveMinutes: 0,
        url: "https://www.grandtraverseresort.com/golf/courses/the-bear",
        highlight:
          "Jack Nicklaus's brutal Scottish-style test — terraced fairways, deep pot bunkers, once ranked among America's toughest",
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "Grand Traverse Resort — The Wolverine (Player)",
        tier: "premium",
        greenFeeRange: [95, 185],
        holes: 18,
        par: 71,
        yardage: 7064,
        walkable: false,
        style: "parkland",
        driveMinutes: 0,
        url: "https://www.grandtraverseresort.com/golf/overview",
        highlight:
          "Gary Player's more playable, scenic counterpart — wide fairways and bay views",
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "Grand Traverse Resort — Spruce Run",
        tier: "solid",
        greenFeeRange: [55, 110],
        holes: 18,
        par: 72,
        yardage: 6741,
        walkable: true,
        style: "parkland",
        driveMinutes: 0,
        url: "https://www.grandtraverseresort.com/golf/overview",
        highlight:
          "The original William Newcomb resort course — walkable, fair, and the value round of the trio",
        hypeTag: "BEST VALUE",
      },
      {
        name: "A-Ga-Ming Golf Resort — Sundance",
        tier: "solid",
        greenFeeRange: [50, 100],
        holes: 18,
        par: 72,
        yardage: 6900,
        walkable: false,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.a-ga-ming.com",
        highlight:
          "Bluff-top course over Torch Lake nearby in Kewadin — stunning water views to round out the trip",
        hypeTag: "HIDDEN GEM",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [8, 20],
        nightlyRange: [250, 800],
        amenities: [
          "on-site golf",
          "casino nearby",
          "spa",
          "multiple restaurants",
          "indoor pool",
          "bay access",
        ],
        areaDescription:
          "Grand Traverse Resort tower rooms and condos — full-service resort with golf, spa, and casino next door",
        searchUrl: "https://www.grandtraverseresort.com/stay",
        notes:
          "Stay-and-play packages bundle the resort condos with all three courses. Turtle Creek Casino is adjacent — easy night-out logistics.",
      },
      {
        type: "lakehouse",
        sleeps: [8, 16],
        nightlyRange: [350, 1000],
        amenities: ["private dock", "bay/lake access", "deck", "grill", "fire pit"],
        areaDescription:
          "East Bay and Old Mission Peninsula homes minutes from the resort and Traverse City",
        searchUrl:
          "https://www.vrbo.com/search?destination=Traverse%20City%2C%20MI&groupSize=12",
        notes:
          "Old Mission Peninsula lake homes drop you in the middle of the wineries and put the bay at your door — great self-catering base.",
      },
    ],
    dining: [
      {
        name: "Aerie Restaurant & Lounge",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "16th-floor resort restaurant with panoramic Grand Traverse Bay views for the big dinner",
        reservationNeeded: true,
      },
      {
        name: "The Cooks' House (Traverse City)",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "small",
        highlight:
          "TC's celebrated farm-to-table — book ahead for a memorable smaller-group meal",
        reservationNeeded: true,
      },
      {
        name: "Mission Table (Old Mission Peninsula)",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Historic peninsula inn surrounded by vineyards — great group dinner in wine country",
        reservationNeeded: true,
      },
      {
        name: "Sami's / Slabtown burgers (TC)",
        style: "casual",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Easy Traverse City burger-and-beer night when you want to keep it casual",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Turtle Creek Casino bars",
        vibe: "casino-bar",
        highlight:
          "Casino gaming and bars adjacent to the resort — easy late-night option",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "The Filling Station Microbrewery (TC)",
        vibe: "brewpub",
        highlight:
          "Traverse City brewery in a restored depot with a big patio and wood-fired pizza",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Union Street Station (TC)",
        vibe: "dive",
        highlight:
          "Downtown Traverse City late-night staple with live music and a younger crowd",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Old Mission / Leelanau wine tour",
        type: "winery",
        duration: "half day",
        pricePerPerson: [60, 150],
        groupFriendly: true,
        highlight:
          "Two world-class wine peninsulas at the door — riesling, pinot, and bay views by the busload",
        bestFor: "rest day",
        provider: "TC wine tour operators",
      },
      {
        name: "Grand Traverse Bay charter & boat rental",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [60, 150],
        groupFriendly: true,
        highlight:
          "Rent a boat or charter on Grand Traverse Bay — turquoise water and sandbar swims",
        bestFor: "rest day",
        provider: "Traverse City marinas",
      },
      {
        name: "Traverse City brewery & distillery crawl",
        type: "distillery",
        duration: "2-3 hours",
        pricePerPerson: [30, 70],
        groupFriendly: true,
        highlight:
          "Right Brain, Mackinaw Trail, and Grand Traverse Distillery in one of the Midwest's best craft towns",
        bestFor: "arrival day",
        provider: "Downtown Traverse City",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [12, 30],
        hourlyRate: [150, 320],
        providers: [
          "Traverse City party bus operators",
          "Grand Traverse Resort shuttles",
          "TC wine-tour buses",
        ],
        notes:
          "TC has a strong wine-tour bus and party-bus market — use it for the winery day and the downtown bar run. AM golf + PM bar runs are routine.",
        fullDayRate: [1200, 2400],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [80, 175],
        providers: ["Cozymeal (Traverse City)", "Take a Chef", "Local TC chefs"],
        mealTypes: ["steak dinner", "Lake Michigan whitefish", "cherry-glazed cookout", "breakfast"],
        notes:
          "Traverse City has a deep food scene — book a chef for a bay-house dinner pairing local cherries, whitefish, and Old Mission wines.",
      },
    ],
  },

  // ─── Akron, OH (Firestone) ───────────────────────────────────────────
  {
    id: "akron-oh",
    city: "Akron",
    state: "OH",
    region: "Midwest",
    tagline: "Play 'The Monster' where the World Golf Championship lived",
    description:
      "Firestone Country Club's South Course — Donald Ross's 'Monster,' host of three PGA Championships and decades of WGC-Bridgestone Invitationals — is the crown jewel of a deep northeast-Ohio golf scene that also includes a strong slate of public tracks. Tournament golf, blue-collar bars, and a central Cleveland/Canton location.",
    population: "medium",
    nearestAirport: {
      code: "CAK",
      name: "Akron-Canton Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "Full-service grocery and liquor everywhere in metro Akron — no logistics issues for a rental.",
    courses: [
      {
        name: "Firestone Country Club — South Course",
        tier: "bucket-list",
        greenFeeRange: [250, 400],
        holes: 18,
        par: 70,
        yardage: 7400,
        rating: 75.1,
        slope: 128,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.invitedclubs.com/clubs/firestone-country-club",
        highlight:
          "Donald Ross's 'Monster' — host of 3 PGA Championships and the WGC-Bridgestone; access via stay-and-play packages",
        hypeTag: "TOURNAMENT HOST",
        rankNote: "Former WGC-Bridgestone Invitational Host",
      },
      {
        name: "Firestone Country Club — Fazio (West)",
        tier: "premium",
        greenFeeRange: [200, 325],
        holes: 18,
        par: 72,
        yardage: 7400,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.invitedclubs.com/clubs/firestone-country-club",
        highlight:
          "Firestone's Fazio-renovated West Course — a championship test in its own right, part of the package",
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "The Quarry Golf Club (Canton)",
        tier: "premium",
        greenFeeRange: [55, 95],
        holes: 18,
        par: 72,
        yardage: 6504,
        walkable: false,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.golfthequarry.com",
        highlight:
          "Dramatic public course built around a former sandstone quarry — strong-value second round near Canton",
        hypeTag: "BEST VALUE",
      },
      {
        name: "Sand Ridge Golf Club",
        tier: "premium",
        greenFeeRange: [90, 160],
        holes: 18,
        par: 72,
        yardage: 7088,
        walkable: false,
        style: "parkland",
        driveMinutes: 50,
        url: "https://www.sandridgegc.com",
        highlight:
          "Top-ranked Tom Fazio Ohio design northeast of Akron — wetlands, sand, and serious shot values",
        hypeTag: "DESIGNER CLASSIC",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 16],
        nightlyRange: [200, 500],
        amenities: ["full kitchen", "deck", "grill", "game room", "fire pit"],
        areaDescription:
          "Suburban Akron homes in Fairlawn / Bath / Hudson, central to Firestone and downtown",
        searchUrl:
          "https://www.vrbo.com/search?destination=Akron%2C%20OH&groupSize=12",
        notes:
          "Plenty of large suburban rentals in metro Akron at reasonable prices — easy base for a tournament-golf trip.",
      },
      {
        type: "resort-house",
        sleeps: [4, 16],
        nightlyRange: [150, 350],
        amenities: ["on-site golf", "lodge rooms", "restaurant", "spa"],
        areaDescription:
          "Firestone stay-and-play lodging blocks plus downtown Akron hotels",
        searchUrl: "https://www.invitedclubs.com/clubs/firestone-country-club",
        notes:
          "Firestone's stay-and-play packages are the way to get on the South Course — bundle rooms with guaranteed Monster tee times.",
      },
    ],
    dining: [
      {
        name: "Ken Stewart's Grille",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Akron's premier steakhouse — the group dinner spot for a tournament-golf trip",
        reservationNeeded: true,
      },
      {
        name: "Swensons Drive-In",
        style: "casual",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Iconic Akron drive-in — the Galley Boy burger is a non-negotiable group stop",
        reservationNeeded: false,
      },
      {
        name: "Luigi's Restaurant",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Akron institution since 1949 — old-school pizza and red sauce, cash-friendly group room",
        reservationNeeded: false,
      },
      {
        name: "The Rail Burger (Fairlawn)",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Local-beef burgers and a deep tap list — easy post-round group spot",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Thursday's Lounge",
        vibe: "dive",
        highlight:
          "Beloved Akron dive with cheap beer and a no-frills crowd",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Hoppin' Frog Brewery",
        vibe: "brewpub",
        highlight:
          "Nationally rated Akron brewery — big imperial stouts and a taproom",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Lockview / Northside District",
        vibe: "cocktail",
        highlight:
          "Downtown Akron's Northside bars and grilled-cheese-and-beer scene",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Pro Football Hall of Fame (Canton)",
        type: "casino",
        duration: "half day",
        pricePerPerson: [30, 50],
        groupFriendly: true,
        highlight:
          "The shrine of pro football is 25 minutes away in Canton — a must for a sports crew",
        bestFor: "rest day",
        provider: "Pro Football Hall of Fame",
      },
      {
        name: "Cuyahoga Valley National Park",
        type: "mountain-biking",
        duration: "half day",
        pricePerPerson: [0, 60],
        groupFriendly: true,
        highlight:
          "Bike the towpath, hike Brandywine Falls, or ride the scenic railroad between Akron and Cleveland",
        bestFor: "rest day",
        provider: "Cuyahoga Valley National Park",
      },
      {
        name: "Akron brewery & distillery crawl",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [25, 60],
        groupFriendly: true,
        highlight:
          "Hoppin' Frog, Thirsty Dog, and the downtown taproom scene",
        bestFor: "arrival day",
        provider: "Downtown Akron",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [12, 36],
        hourlyRate: [140, 300],
        providers: [
          "Akron party bus operators",
          "Cleveland-area limo & coach services",
          "Premier Transportation",
        ],
        notes:
          "Metro Akron and nearby Cleveland have a deep party-bus market. Easy to run AM golf at Firestone + PM bar run downtown.",
        fullDayRate: [1100, 2200],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 150],
        providers: ["Cozymeal (Akron/Cleveland)", "Take a Chef", "Local NE Ohio chefs"],
        mealTypes: ["steak dinner", "BBQ cookout", "breakfast spread"],
        notes:
          "Plenty of NE Ohio chefs available for a private steak night at the rental — book a week or two out.",
      },
    ],
  },

  // ─── Toledo, OH ──────────────────────────────────────────────────────
  {
    id: "toledo-oh",
    city: "Toledo",
    state: "OH",
    region: "Midwest",
    tagline: "Lake Erie public golf plus a brush with U.S. Open history",
    description:
      "Toledo pairs Arthur Hills's lakeside Maumee Bay State Park course and a strong public slate with the gravitational pull of Inverness Club, the four-time U.S. Open host downtown. An affordable, easy-to-reach northwest-Ohio base on Lake Erie at the Michigan line.",
    population: "medium",
    nearestAirport: {
      code: "DTW",
      name: "Detroit Metropolitan Airport",
      driveMinutes: 50,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "Full grocery and liquor across metro Toledo; Maumee Bay area has stores nearby. No logistics issues.",
    courses: [
      {
        name: "Maumee Bay State Park Golf Course",
        tier: "premium",
        greenFeeRange: [40, 75],
        holes: 18,
        par: 72,
        yardage: 6941,
        walkable: true,
        style: "links",
        driveMinutes: 20,
        url: "https://ohiogolf.com/golfcourses/maumee-bay-state-park-golf-course",
        highlight:
          "Arthur Hills's open, windswept Scottish-style course on the Lake Erie shore — Ohio's best public value",
        hypeTag: "BEST VALUE",
      },
      {
        name: "Stone Oak Country Club",
        tier: "solid",
        greenFeeRange: [50, 90],
        holes: 18,
        par: 72,
        yardage: 6625,
        slope: 132,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.golfdigest.com/courses/oh/stone-oak-country-club-stone-oak",
        highlight:
          "Well-conditioned semi-private parkland in Holland — water in play and a strong member-guest feel",
        hypeTag: "LOCALS' FAVORITE",
      },
      {
        name: "Belmont Country Club (Perrysburg)",
        tier: "solid",
        greenFeeRange: [45, 85],
        holes: 18,
        par: 71,
        yardage: 6580,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.belmontcc.org",
        highlight:
          "Tree-lined Perrysburg layout, a longtime northwest-Ohio favorite for outings",
        hypeTag: "LOCALS' FAVORITE",
      },
      {
        name: "Carrington Golf Club (Monclova)",
        tier: "solid",
        greenFeeRange: [35, 65],
        holes: 18,
        par: 72,
        yardage: 6705,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.carringtongolfclub.com",
        highlight:
          "Solid daily-fee value west of Toledo — fair, walkable, and easy to book for a group",
        hypeTag: "BEST VALUE",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 16],
        nightlyRange: [180, 450],
        amenities: ["full kitchen", "deck", "grill", "game room"],
        areaDescription:
          "Suburban rentals in Perrysburg / Sylvania / Maumee, central to the courses and downtown",
        searchUrl:
          "https://www.vrbo.com/search?destination=Toledo%2C%20OH&groupSize=12",
        notes:
          "Affordable large rentals across metro Toledo. Perrysburg/Maumee puts you between the public courses and the Levis Commons nightlife.",
      },
      {
        type: "resort-house",
        sleeps: [4, 16],
        nightlyRange: [120, 300],
        amenities: ["lake access", "on-site golf", "indoor pool", "restaurant"],
        areaDescription:
          "Maumee Bay Lodge on Lake Erie — stay right at the state-park course",
        searchUrl: "https://www.maumeebaylodge.com",
        notes:
          "Maumee Bay Lodge bundles lakefront rooms with the golf course and a nature setting — easy self-contained base.",
      },
    ],
    dining: [
      {
        name: "Mancy's Steakhouse",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Toledo's classic steakhouse since 1921 — the group's big-dinner anchor",
        reservationNeeded: true,
      },
      {
        name: "Tony Packo's Cafe",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "The Hungarian hot-dog institution made famous by M*A*S*H — a required Toledo group stop",
        reservationNeeded: false,
      },
      {
        name: "Registry Bistro",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Downtown farm-to-table for a nicer smaller-group dinner",
        reservationNeeded: true,
      },
      {
        name: "Rudy's Hot Dog",
        style: "casual",
        priceRange: "$",
        capacity: "medium",
        highlight:
          "Cheap, fast Toledo coney institution — great pre-golf fuel",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Maumee Bay Brew Pub (Oliver House)",
        vibe: "brewpub",
        highlight:
          "Historic downtown brewpub in the Oliver House — Toledo's signature beer hall",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Bronze Boar (Warehouse District)",
        vibe: "dive",
        highlight:
          "Downtown Toledo dive with a big bourbon list and late hours",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Earnest Brew Works",
        vibe: "brewpub",
        highlight:
          "Local craft taproom for a relaxed group beer night",
        lateNight: false,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Lake Erie walleye charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [90, 200],
        groupFriendly: true,
        highlight:
          "Western Lake Erie is the 'Walleye Capital of the World' — limit-out charters out of the Toledo area",
        bestFor: "morning before golf",
        provider: "Lake Erie charter captains",
      },
      {
        name: "Maumee Bay State Park kayaking",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [25, 50],
        groupFriendly: true,
        highlight:
          "Paddle the Lake Erie marshes and boardwalk trails at the state park",
        bestFor: "rest day",
        provider: "Maumee Bay State Park",
      },
      {
        name: "Hollywood Casino Toledo",
        type: "casino",
        duration: "evening",
        pricePerPerson: [50, 300],
        groupFriendly: true,
        highlight:
          "Riverfront casino downtown for table games and a late night",
        bestFor: "rest day",
        provider: "Hollywood Casino",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [12, 36],
        hourlyRate: [130, 280],
        providers: [
          "Toledo party bus operators",
          "All Occasions Transportation",
          "Detroit-area coach services",
        ],
        notes:
          "Toledo and nearby Detroit have ample party-bus options. Easy to combine AM golf with a PM downtown bar/casino run.",
        fullDayRate: [1000, 2000],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 140],
        providers: ["Cozymeal (Toledo/Detroit)", "Take a Chef", "Local NW Ohio chefs"],
        mealTypes: ["steak dinner", "Lake Erie walleye fry", "BBQ cookout", "breakfast"],
        notes:
          "Book a chef for a walleye fry at the rental — the regional move with the catch from a morning charter.",
      },
    ],
  },

  // ─── Dayton, OH ──────────────────────────────────────────────────────
  {
    id: "dayton-oh",
    city: "Dayton",
    state: "OH",
    region: "Midwest",
    tagline: "Award-winning public golf in the birthplace of aviation",
    description:
      "Dayton over-delivers for buddy golf: Yankee Trace has been the area's best public course for two decades, NCR Country Club hosted a PGA Championship and U.S. Women's Open, and a deep value slate fills out the week. Central, affordable, and 45 minutes from Cincinnati and Columbus alike.",
    population: "medium",
    nearestAirport: {
      code: "DAY",
      name: "Dayton International Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "Full grocery and liquor across metro Dayton — no logistics issues for a rental.",
    courses: [
      {
        name: "The Golf Club at Yankee Trace — Championship",
        tier: "premium",
        greenFeeRange: [50, 85],
        holes: 18,
        par: 72,
        yardage: 7142,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.yankeetrace.org",
        highlight:
          "Dayton's best public course 20 years running — a top-5 Ohio muni and top-50 in the country",
        hypeTag: "TOP 100 PUBLIC",
        rankNote: "Top 50 Municipal Course — USA",
      },
      {
        name: "Heatherwoode Golf Club (Springboro)",
        tier: "solid",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 71,
        yardage: 6754,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://golfheatherwoode.com",
        highlight:
          "Well-regarded Denis Griffiths design in Springboro — a reliable, scoreable value round",
        hypeTag: "BEST VALUE",
      },
      {
        name: "Beavercreek Golf Club",
        tier: "solid",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 72,
        yardage: 6938,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.beavercreekgolfclub.com",
        highlight:
          "Popular daily-fee track east of Dayton — fair and group-friendly",
        hypeTag: "LOCALS' FAVORITE",
      },
      {
        name: "Walnut Grove Country Club (Dayton)",
        tier: "solid",
        greenFeeRange: [45, 80],
        holes: 18,
        par: 71,
        yardage: 6602,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.walnutgrovecc.com",
        highlight:
          "Classic tree-lined semi-private layout — a tidy parkland round to fill the week",
        hypeTag: "LOCALS' FAVORITE",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 16],
        nightlyRange: [180, 450],
        amenities: ["full kitchen", "deck", "grill", "game room", "fire pit"],
        areaDescription:
          "Suburban rentals in Centerville / Springboro / Beavercreek, central to the courses",
        searchUrl:
          "https://www.vrbo.com/search?destination=Dayton%2C%20OH&groupSize=12",
        notes:
          "Affordable large rentals across the southern Dayton suburbs put you minutes from Yankee Trace and Heatherwoode.",
      },
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [150, 350],
        amenities: ["full kitchen", "deck", "grill"],
        areaDescription:
          "Oregon District / downtown Dayton homes for a crew that wants nightlife at the door",
        searchUrl:
          "https://www.vrbo.com/search?destination=Dayton%2C%20OH&groupSize=10",
        notes:
          "Staying near the Oregon District trades course proximity for the best bar scene in the city.",
      },
    ],
    dining: [
      {
        name: "The Pine Club",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Dayton's legendary cash-only steakhouse since 1947 — the group's big-night institution",
        reservationNeeded: false,
      },
      {
        name: "El Meson",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Award-winning Spanish/Latin spot with tapas and a big group room",
        reservationNeeded: true,
      },
      {
        name: "Lily's Bistro (Oregon District)",
        style: "farm-to-table",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Oregon District farm-to-table for a nicer smaller-group meal",
        reservationNeeded: true,
      },
      {
        name: "Tank's Bar & Grill",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Beloved Dayton burgers-and-wings joint — easy post-round group spot",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Oregon District bars (Fifth Street)",
        vibe: "cocktail",
        highlight:
          "Dayton's nightlife row — a walkable strip of bars, patios, and live music",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Warped Wing Brewing Co.",
        vibe: "brewpub",
        highlight:
          "Dayton's flagship brewery with a huge taproom for a group beer night",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Century Bar",
        vibe: "whiskey-bar",
        highlight:
          "Oregon District whiskey bar with one of Ohio's deepest bourbon lists",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "National Museum of the U.S. Air Force",
        type: "casino",
        duration: "half day",
        pricePerPerson: [0, 20],
        groupFriendly: true,
        highlight:
          "The world's largest military aviation museum — free, massive, and a genuine bucket-list rest-day stop",
        bestFor: "rest day",
        provider: "Wright-Patterson AFB",
      },
      {
        name: "Little Miami River kayaking",
        type: "kayaking",
        duration: "half day",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "Float the scenic Little Miami National Wild & Scenic River with a cooler aboard",
        bestFor: "rest day",
        provider: "Local liveries",
      },
      {
        name: "Dayton brewery & distillery crawl",
        type: "distillery",
        duration: "2-3 hours",
        pricePerPerson: [25, 60],
        groupFriendly: true,
        highlight:
          "Warped Wing, Dayton Beer Co., and the Oregon District distilleries",
        bestFor: "arrival day",
        provider: "Downtown Dayton",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [12, 36],
        hourlyRate: [130, 280],
        providers: [
          "Dayton party bus operators",
          "Premier Transportation",
          "Cincinnati/Columbus coach services",
        ],
        notes:
          "Solid Dayton party-bus market plus Cincinnati and Columbus operators an hour away. AM golf + PM Oregon District run is routine.",
        fullDayRate: [1000, 2000],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 140],
        providers: ["Cozymeal (Dayton/Cincinnati)", "Take a Chef", "Local SW Ohio chefs"],
        mealTypes: ["steak dinner", "BBQ cookout", "breakfast spread"],
        notes:
          "Plenty of SW Ohio chefs for a private steak night at the rental — book a week or two ahead.",
      },
    ],
  },

  // ─── Dublin, OH ──────────────────────────────────────────────────────
  {
    id: "dublin-oh",
    city: "Dublin",
    state: "OH",
    region: "Midwest",
    tagline: "Memorial Tournament country in Columbus's golf suburb",
    description:
      "Dublin is the affluent Columbus suburb built around Jack Nicklaus's Muirfield Village — home of the Memorial Tournament — with Arnold Palmer's Tartan Fields and a strong public slate filling out a serious golf week. Upscale dining, a lively Bridge Park scene, and Columbus nightlife 20 minutes south.",
    population: "medium",
    nearestAirport: {
      code: "CMH",
      name: "John Glenn Columbus International Airport",
      driveMinutes: 25,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "Upscale grocery (Giant Eagle Market District, Kroger) and liquor throughout Dublin — easy stock-up.",
    courses: [
      {
        name: "Golf Club of Dublin",
        tier: "premium",
        greenFeeRange: [55, 95],
        holes: 18,
        par: 72,
        yardage: 7021,
        walkable: false,
        style: "links",
        driveMinutes: 5,
        url: "https://www.golfclubofdublin.com",
        highlight:
          "Dublin's premier public course — a links-influenced Brian Huntley design and the area's best non-private play",
        hypeTag: "LOCALS' FAVORITE",
      },
      {
        name: "The Players Club at Foxfire",
        tier: "solid",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 72,
        yardage: 7117,
        walkable: false,
        style: "parkland",
        driveMinutes: 35,
        url: "https://www.foxfiregolf.com",
        highlight:
          "Long, well-conditioned public test south of Columbus — strong value second round",
        hypeTag: "BEST VALUE",
      },
      {
        name: "Cooke's Creek Golf Club",
        tier: "solid",
        greenFeeRange: [35, 60],
        holes: 18,
        par: 72,
        yardage: 6800,
        walkable: true,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.cookescreek.com",
        highlight:
          "Friendly daily-fee track north of Columbus — fair, walkable, and easy to book for a group",
        hypeTag: "BEST VALUE",
      },
      {
        name: "The Pinnacle Golf Club (Grove City)",
        tier: "solid",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 72,
        yardage: 6900,
        walkable: false,
        style: "parkland",
        driveMinutes: 35,
        url: "https://www.pinnaclegolfclub.com",
        highlight:
          "Well-regarded public layout in Grove City to round out a multi-day Columbus-area trip",
        hypeTag: "LOCALS' FAVORITE",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 16],
        nightlyRange: [250, 600],
        amenities: ["full kitchen", "deck", "grill", "game room", "fire pit"],
        areaDescription:
          "Upscale Dublin and Muirfield-area homes near Bridge Park and the courses",
        searchUrl:
          "https://www.vrbo.com/search?destination=Dublin%2C%20OH&groupSize=12",
        notes:
          "Big homes in the Muirfield/Bridge Park area put you walking distance to Dublin's best dining and bars. Book well ahead for Memorial week.",
      },
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [200, 500],
        amenities: ["full kitchen", "deck", "grill"],
        areaDescription:
          "Short North / downtown Columbus rentals for a crew prioritizing nightlife",
        searchUrl:
          "https://www.vrbo.com/search?destination=Columbus%2C%20OH&groupSize=10",
        notes:
          "Staying in the Short North trades Dublin course proximity for Columbus's best bar and restaurant district.",
      },
    ],
    dining: [
      {
        name: "Hudson 29 (Bridge Park)",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Cameron Mitchell's polished Bridge Park kitchen-and-bar — Dublin's group-dinner anchor",
        reservationNeeded: true,
      },
      {
        name: "The Avenue Steak Tavern (Bridge Park)",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Classic steakhouse in Bridge Park for the big-night steak-and-bourbon dinner",
        reservationNeeded: true,
      },
      {
        name: "Brazenhead Irish Pub",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Dublin's namesake Irish pub — easy, group-friendly, and walkable post-round",
        reservationNeeded: false,
      },
      {
        name: "Doc's Smokehouse / North Market favorites",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Casual BBQ for a low-key group lunch or dinner between rounds",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Bridge Park bars (Dublin)",
        vibe: "rooftop",
        highlight:
          "Dublin's walkable Bridge Park district — rooftops, patios, and craft cocktails",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Fado / Short North (Columbus)",
        vibe: "cocktail",
        highlight:
          "Columbus's Short North strip 20 min south — the metro's best bar district",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "BrewDog DogTap (Canal Winchester)",
        vibe: "brewpub",
        highlight:
          "BrewDog's flagship U.S. brewery and taproom for a big group beer outing",
        lateNight: false,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Scioto River kayaking",
        type: "kayaking",
        duration: "half day",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "Paddle the Scioto through Dublin's riverfront parks on a rest-day morning",
        bestFor: "rest day",
        provider: "Local outfitters",
      },
      {
        name: "Topgolf Columbus",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [35, 65],
        groupFriendly: true,
        highlight:
          "Three-story driving range with food and drinks for a competitive warm-up night",
        bestFor: "arrival day",
        provider: "Topgolf",
      },
      {
        name: "Columbus brewery & distillery crawl",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [25, 60],
        groupFriendly: true,
        highlight:
          "BrewDog, Land-Grant, and the Short North taprooms — Columbus is a top craft-beer town",
        bestFor: "arrival day",
        provider: "Columbus breweries",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [12, 40],
        hourlyRate: [150, 320],
        providers: [
          "Columbus party bus operators",
          "Premier Transportation",
          "Buckeye Limo & coach services",
        ],
        notes:
          "Columbus has a deep party-bus market. Easy to run AM golf in Dublin with a PM Bridge Park or Short North bar run.",
        fullDayRate: [1200, 2400],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 160],
        providers: ["Cozymeal (Columbus)", "Take a Chef", "Local Columbus chefs"],
        mealTypes: ["steak dinner", "BBQ cookout", "breakfast spread"],
        notes:
          "Columbus has a strong chef market — book a private steak night at the Dublin rental a week or two ahead.",
      },
    ],
  },

  // ─── Bloomington, IN ─────────────────────────────────────────────────
  {
    id: "bloomington-in",
    city: "Bloomington",
    state: "IN",
    region: "Midwest",
    tagline: "Indiana University's new Pfau course meets a great college-town scene",
    description:
      "Bloomington pairs the acclaimed Pfau Course — Indiana University's Steve Smyers-redesigned championship test that now hosts NCAA and national events — with the energy of a Big Ten college town. Limestone-quarry scenery, a walkable downtown bar scene, and Lake Monroe at the door.",
    population: "medium",
    nearestAirport: {
      code: "IND",
      name: "Indianapolis International Airport",
      driveMinutes: 60,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "Full grocery and liquor across Bloomington — easy stock-up for a rental near campus or the lake.",
    courses: [
      {
        name: "The Pfau Course at Indiana University",
        tier: "premium",
        greenFeeRange: [60, 110],
        holes: 18,
        par: 71,
        yardage: 7715,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.golfpass.com/travel-advisor/courses/5651-pfau-golf-course-at-indiana-university",
        highlight:
          "Steve Smyers's 2020 redesign — a 7,700-yard championship test that hosts NCAA regionals, open to public play",
        hypeTag: "TOURNAMENT HOST",
        rankNote: "NCAA Championship Host Venue",
      },
      {
        name: "Eagle Pointe Golf Resort",
        tier: "solid",
        greenFeeRange: [45, 80],
        holes: 18,
        par: 72,
        yardage: 6612,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.eaglepointe.com",
        highlight:
          "Resort course on Lake Monroe with lodging on site — a self-contained stay-and-play option",
        hypeTag: "BEST VALUE",
      },
      {
        name: "Cascades Golf Course",
        tier: "solid",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 71,
        yardage: 6398,
        walkable: true,
        style: "parkland",
        driveMinutes: 8,
        url: "https://bloomington.in.gov/parks/golf",
        highlight:
          "Scenic, walkable city muni tucked in a wooded valley — a fun, affordable value round",
        hypeTag: "BEST VALUE",
      },
      {
        name: "Bloomington Country Club",
        tier: "solid",
        greenFeeRange: [50, 90],
        holes: 18,
        par: 71,
        yardage: 6470,
        walkable: false,
        style: "parkland",
        driveMinutes: 12,
        url: "https://www.bloomingtoncountryclub.org",
        highlight:
          "Classic tree-lined semi-private layout for an outing round to fill the week",
        hypeTag: "LOCALS' FAVORITE",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 16],
        nightlyRange: [200, 500],
        amenities: ["full kitchen", "deck", "grill", "game room", "fire pit"],
        areaDescription:
          "Homes near campus and downtown Bloomington — walkable to the bar scene",
        searchUrl:
          "https://www.vrbo.com/search?destination=Bloomington%2C%20IN&groupSize=12",
        notes:
          "Big rentals near campus put you walking distance to Kirkwood Avenue's bars. Avoid IU home-football weekends — prices spike and inventory vanishes.",
      },
      {
        type: "lakehouse",
        sleeps: [8, 14],
        nightlyRange: [250, 600],
        amenities: ["lake access", "dock", "deck", "grill", "fire pit"],
        areaDescription:
          "Lake Monroe homes south of town — Indiana's largest lake at your door",
        searchUrl:
          "https://www.vrbo.com/search?destination=Lake%20Monroe%2C%20IN&groupSize=12",
        notes:
          "Lake Monroe houses pair golf with boating and fishing; central to Eagle Pointe and a short drive to the Pfau Course.",
      },
    ],
    dining: [
      {
        name: "Janko's Little Zagreb",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Bloomington's legendary Croatian steakhouse — the group's big-night institution",
        reservationNeeded: true,
      },
      {
        name: "The Tap",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Massive beer hall on Kirkwood with 40+ taps and a big group room",
        reservationNeeded: false,
      },
      {
        name: "FARMbloomington",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Downtown farm-to-table for a nicer smaller-group meal",
        reservationNeeded: true,
      },
      {
        name: "Nick's English Hut",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "The iconic IU bar-and-grill since 1927 — burgers, Sink the Biz, and required college-town atmosphere",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Nick's English Hut",
        vibe: "sports-bar",
        highlight:
          "The definitive IU bar on Kirkwood — play Sink the Biz and soak in the history",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Kilroy's on Kirkwood",
        vibe: "sports-bar",
        highlight:
          "Loud, crowded Kirkwood Avenue staple — peak college-town energy",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Upland Brewing Co.",
        vibe: "brewpub",
        highlight:
          "Indiana's flagship craft brewery with a big taproom and patio",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Lake Monroe boat rental & charter",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [40, 100],
        groupFriendly: true,
        highlight:
          "Indiana's largest lake — rent a pontoon for a rest-day cruise with a cooler aboard",
        bestFor: "rest day",
        provider: "Lake Monroe marinas",
      },
      {
        name: "Oliver Winery tour & tasting",
        type: "winery",
        duration: "2-3 hours",
        pricePerPerson: [30, 70],
        groupFriendly: true,
        highlight:
          "Indiana's largest winery just north of town — scenic grounds and group tastings",
        bestFor: "arrival day",
        provider: "Oliver Winery",
      },
      {
        name: "Hoosier National Forest hiking & ziplines",
        type: "zipline",
        duration: "half day",
        pricePerPerson: [50, 110],
        groupFriendly: true,
        highlight:
          "Trails, limestone caves, and canopy zipline tours in the nearby Hoosier National Forest",
        bestFor: "rest day",
        provider: "Local outfitters",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [12, 36],
        hourlyRate: [130, 290],
        providers: [
          "Bloomington party bus operators",
          "Indianapolis coach & limo services",
          "Premier Transportation",
        ],
        notes:
          "Local operators plus Indianapolis services an hour north. Easy to combine AM golf with a PM Kirkwood Avenue bar run.",
        fullDayRate: [1050, 2100],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 150],
        providers: ["Cozymeal (Bloomington/Indy)", "Take a Chef", "Local Bloomington chefs"],
        mealTypes: ["steak dinner", "BBQ cookout", "breakfast spread"],
        notes:
          "Book a chef for a steak night at the campus rental or a lakeside cookout at Lake Monroe — reserve a week or two out.",
      },
    ],
  },

  // ─── Wichita, KS ─────────────────────────────────────────────────────
  {
    id: "wichita-ks",
    city: "Wichita",
    state: "KS",
    region: "Midwest",
    tagline: "Sand Creek Station and the friendliest golf value in America",
    description:
      "Wichita anchors a surprisingly strong south-central Kansas golf scene led by Sand Creek Station — a links-style public course in nearby Newton with a Road Hole replica that's ranked #1 in U.S. customer loyalty for over a decade. Cheap golf, a real brewery-and-Old-Town scene, and easy big-group logistics.",
    population: "medium",
    nearestAirport: {
      code: "ICT",
      name: "Wichita Dwight D. Eisenhower National Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "Full grocery and liquor everywhere in metro Wichita — no logistics issues for a rental.",
    courses: [
      {
        name: "Sand Creek Station Golf Club (Newton)",
        tier: "premium",
        greenFeeRange: [45, 75],
        holes: 18,
        par: 72,
        yardage: 7400,
        walkable: true,
        style: "links",
        driveMinutes: 30,
        url: "https://sandcreekgolfclub.com",
        highlight:
          "Jeff Brauer links-style design with a Road Hole replica green — Kansas's #1 public and a customer-loyalty legend",
        hypeTag: "TOP 100 PUBLIC",
        rankNote: "Best in State — Golf Digest (Kansas)",
      },
      {
        name: "Tex Consolver Golf Course",
        tier: "solid",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 72,
        yardage: 7104,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.wichita.gov/parkandrec/golf",
        highlight:
          "Wichita's best muni — long, well-conditioned, and a strong value second round",
        hypeTag: "BEST VALUE",
      },
      {
        name: "Reflection Ridge Golf Club",
        tier: "solid",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 71,
        yardage: 6750,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.reflectionridge.com",
        highlight:
          "Well-kept semi-private west-side layout with water in play — a solid outing round",
        hypeTag: "LOCALS' FAVORITE",
      },
      {
        name: "Buffalo Dunes Golf Course (Garden City)",
        tier: "premium",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 72,
        yardage: 7076,
        walkable: true,
        style: "links",
        driveMinutes: 180,
        url: "https://www.gcgov.org/golf",
        highlight:
          "Cult-favorite western-Kansas links muni — a wild, windswept value worth the road trip for the diehards",
        hypeTag: "HIDDEN GEM",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 16],
        nightlyRange: [180, 450],
        amenities: ["full kitchen", "deck", "grill", "game room", "fire pit"],
        areaDescription:
          "Suburban west-Wichita and College Hill rentals, central to the courses and Old Town",
        searchUrl:
          "https://www.vrbo.com/search?destination=Wichita%2C%20KS&groupSize=12",
        notes:
          "Affordable large rentals across metro Wichita. College Hill or downtown-adjacent puts you near the Old Town bar district.",
      },
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [150, 350],
        amenities: ["full kitchen", "deck", "grill"],
        areaDescription:
          "Newton-area rentals for a crew that wants to base near Sand Creek Station",
        searchUrl:
          "https://www.vrbo.com/search?destination=Newton%2C%20KS&groupSize=10",
        notes:
          "Basing in Newton puts the marquee course at your door, with Wichita 30 minutes south for nightlife.",
      },
    ],
    dining: [
      {
        name: "The Anchor",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Old Town gastropub with a huge craft list and big group room — Wichita's go-to",
        reservationNeeded: false,
      },
      {
        name: "Chester's Chophouse & Wine Bar",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Wichita's top steakhouse for the group's big-night dinner",
        reservationNeeded: true,
      },
      {
        name: "Doo-Dah Diner",
        style: "casual",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Award-winning downtown breakfast spot to fuel an early tee time",
        reservationNeeded: false,
      },
      {
        name: "Bite Me BBQ",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Solid Kansas BBQ for an easy, group-friendly dinner between rounds",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Old Town district",
        vibe: "cocktail",
        highlight:
          "Wichita's walkable brick warehouse nightlife district — bars, patios, and live music",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Central Standard Brewing",
        vibe: "brewpub",
        highlight:
          "Wichita's flagship craft brewery with a big beer garden",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Emerson Biggins (Old Town)",
        vibe: "sports-bar",
        highlight:
          "Old Town sports bar with a deep tap wall and late hours",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Flint Hills sporting clays & shooting",
        type: "shooting",
        duration: "half day",
        pricePerPerson: [60, 160],
        groupFriendly: true,
        highlight:
          "Sporting clays and shooting ranges around Wichita — a classic Kansas group outing",
        bestFor: "rest day",
        provider: "Local shooting clubs",
      },
      {
        name: "Cheney Reservoir boat rental",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [40, 100],
        groupFriendly: true,
        highlight:
          "Pontoon and ski-boat rentals at Cheney Reservoir west of town for a rest-day on the water",
        bestFor: "rest day",
        provider: "Cheney State Park marinas",
      },
      {
        name: "Old Town brewery & distillery crawl",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [25, 60],
        groupFriendly: true,
        highlight:
          "Central Standard, Wichita Brewing Co., and Old Town's distilleries",
        bestFor: "arrival day",
        provider: "Downtown Wichita",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [12, 36],
        hourlyRate: [130, 280],
        providers: [
          "Wichita party bus operators",
          "ICT limo & coach services",
          "Premier Transportation",
        ],
        notes:
          "Wichita has a reliable party-bus market. Easy to run AM golf at Sand Creek + PM Old Town bar run.",
        fullDayRate: [1000, 2000],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 140],
        providers: ["Cozymeal (Wichita)", "Take a Chef", "Local Kansas chefs"],
        mealTypes: ["steak dinner", "Kansas BBQ cookout", "breakfast spread"],
        notes:
          "Book a chef for a Kansas steak-and-BBQ night at the rental — reserve a week or two ahead.",
      },
    ],
  },

  // ─── Hutchinson, KS (Prairie Dunes) ──────────────────────────────────
  {
    id: "hutchinson-ks",
    city: "Hutchinson",
    state: "KS",
    region: "Midwest",
    tagline: "Make the pilgrimage to Prairie Dunes — Kansas's top-25 sandhills classic",
    description:
      "Hutchinson is home to Prairie Dunes Country Club, Perry Maxwell's 1937 sandhills masterpiece routinely ranked top-25 in America and a multiple national-championship host. Access is private and visitor-friendly via a letter of introduction or outing — a true golf-architecture pilgrimage on the Kansas plains, with a quirky salt-mine museum nearby.",
    population: "small",
    nearestAirport: {
      code: "ICT",
      name: "Wichita Dwight D. Eisenhower National Airport",
      driveMinutes: 60,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "Full grocery and liquor in Hutchinson; Wichita (1 hr) for bigger runs. Easy stock-up for a rental.",
    courses: [
      {
        name: "Prairie Dunes Country Club",
        tier: "bucket-list",
        greenFeeRange: [200, 350],
        holes: 18,
        par: 70,
        yardage: 6947,
        rating: 75.5,
        slope: 148,
        walkable: true,
        style: "links",
        driveMinutes: 5,
        url: "https://www.prairiedunes.com",
        highlight:
          "Perry Maxwell's 1937 sandhills masterpiece — top-25 in America, host of multiple USGA championships; private, access by introduction or outing",
        hypeTag: "BUCKET LIST",
        rankNote: "#25 — Golf Digest America's 100 Greatest",
      },
      {
        name: "Carey Park Golf Course",
        tier: "solid",
        greenFeeRange: [25, 45],
        holes: 18,
        par: 71,
        yardage: 6535,
        walkable: true,
        style: "parkland",
        driveMinutes: 8,
        url: "https://www.hutchgov.com/golf",
        highlight:
          "Hutchinson's value muni — a fun, affordable round to fill out the trip around the Prairie Dunes day",
        hypeTag: "BEST VALUE",
      },
      {
        name: "Sand Creek Station Golf Club (Newton)",
        tier: "premium",
        greenFeeRange: [45, 75],
        holes: 18,
        par: 72,
        yardage: 7400,
        walkable: true,
        style: "links",
        driveMinutes: 35,
        url: "https://sandcreekgolfclub.com",
        highlight:
          "Pair Prairie Dunes with this links-style public course in nearby Newton for a two-day Kansas sandhills swing",
        hypeTag: "TOP 100 PUBLIC",
        rankNote: "Best in State — Golf Digest (Kansas)",
      },
      {
        name: "Tex Consolver Golf Course (Wichita)",
        tier: "solid",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 72,
        yardage: 7104,
        walkable: true,
        style: "parkland",
        driveMinutes: 55,
        url: "https://www.wichita.gov/parkandrec/golf",
        highlight:
          "Wichita's best muni an hour away — a long, well-kept value round to round out a regional trip",
        hypeTag: "BEST VALUE",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [150, 350],
        amenities: ["full kitchen", "deck", "grill", "game room"],
        areaDescription:
          "Hutchinson homes near Prairie Dunes and the historic downtown",
        searchUrl:
          "https://www.vrbo.com/search?destination=Hutchinson%2C%20KS&groupSize=10",
        notes:
          "Limited but affordable rental inventory in Hutchinson; some groups base in Wichita (1 hr) for more options and nightlife.",
      },
      {
        type: "house",
        sleeps: [8, 16],
        nightlyRange: [180, 450],
        amenities: ["full kitchen", "deck", "grill", "fire pit"],
        areaDescription:
          "Wichita-area rentals an hour south for a bigger crew wanting more nightlife",
        searchUrl:
          "https://www.vrbo.com/search?destination=Wichita%2C%20KS&groupSize=12",
        notes:
          "Basing in Wichita gives you more lodging and bars, with a manageable hour drive to Prairie Dunes for the marquee round.",
      },
    ],
    dining: [
      {
        name: "Roy's Hickory Pit BBQ",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Hutchinson BBQ institution — easy, group-friendly post-round dinner",
        reservationNeeded: false,
      },
      {
        name: "The Anchor Inn",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Beloved local Mexican spot with a huge group room and margaritas",
        reservationNeeded: false,
      },
      {
        name: "Carl's Bar & Delicatessen",
        style: "casual",
        priceRange: "$",
        capacity: "medium",
        highlight:
          "Historic downtown bar-and-deli — sandwiches and cheap beer for a low-key night",
        reservationNeeded: false,
      },
      {
        name: "Prairie Dunes clubhouse dining",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Classic club lunch or dinner the day you play the Maxwell masterpiece",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Salt City Brewing Co.",
        vibe: "brewpub",
        highlight:
          "Hutchinson's downtown craft brewery — the local 19th-hole hub",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Carl's Bar",
        vibe: "dive",
        highlight:
          "Long-running downtown dive for cheap rounds and Kansas character",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Metropolitan Coffee / downtown taps",
        vibe: "patio",
        highlight:
          "Relaxed downtown Hutchinson spots for an easy evening before the early tee time",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Strataca (Kansas Underground Salt Museum)",
        type: "casino",
        duration: "half day",
        pricePerPerson: [20, 35],
        groupFriendly: true,
        highlight:
          "Descend 650 feet into a working salt mine — one of the most unusual rest-day stops in the Midwest",
        bestFor: "rest day",
        provider: "Strataca",
      },
      {
        name: "Cosmosphere space museum",
        type: "casino",
        duration: "2-3 hours",
        pricePerPerson: [15, 30],
        groupFriendly: true,
        highlight:
          "World-class space-history museum in Hutchinson — real Apollo and Soviet hardware",
        bestFor: "rest day",
        provider: "Cosmosphere",
      },
      {
        name: "Flint Hills sporting clays & shooting",
        type: "shooting",
        duration: "half day",
        pricePerPerson: [60, 160],
        groupFriendly: true,
        highlight:
          "Sporting clays and shooting on the Kansas plains — a fitting group outing",
        bestFor: "rest day",
        provider: "Local shooting clubs",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 30],
        hourlyRate: [120, 260],
        providers: [
          "Hutchinson charter services",
          "Wichita party bus & coach operators",
          "Premier Transportation",
        ],
        notes:
          "Local shuttles plus Wichita operators handle airport runs from ICT and course transfers. Pair AM golf with a downtown Hutch or Wichita bar run.",
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 140],
        providers: ["Cozymeal (Wichita)", "Take a Chef", "Local Kansas chefs"],
        mealTypes: ["steak dinner", "Kansas BBQ cookout", "breakfast spread"],
        notes:
          "Book a Wichita-area chef for a steak-and-BBQ night at the rental — reserve a week or two ahead given the smaller market.",
      },
    ],
  },

  // ─── Bismarck, ND (Hawktree) ─────────────────────────────────────────
  {
    id: "bismarck-nd",
    city: "Bismarck",
    state: "ND",
    region: "Midwest",
    tagline: "Black-sand links golf above the Missouri River",
    description:
      "Bismarck's Hawktree Golf Club is one of the great off-the-radar destinations in American golf — a top-100 public Jim Engh design with signature black-sand bunkers (crushed coal slag) and links-style holes sculpted from native prairie above the Missouri River. Wide-open, windswept, and a genuine bucket-list surprise on the northern plains.",
    population: "small",
    nearestAirport: {
      code: "BIS",
      name: "Bismarck Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["summer", "fall"],
    groceryNotes:
      "Full grocery and liquor across Bismarck-Mandan — no logistics issues for a rental.",
    courses: [
      {
        name: "Hawktree Golf Club",
        tier: "bucket-list",
        greenFeeRange: [60, 100],
        holes: 18,
        par: 72,
        yardage: 7085,
        walkable: false,
        style: "links",
        driveMinutes: 15,
        url: "https://hawktree.com",
        highlight:
          "Jim Engh links design with signature black-sand bunkers and dramatic prairie elevation — a nationally ranked top-100 public",
        hypeTag: "TOP 100 PUBLIC",
        rankNote: "Top 100 Public — Golf Digest",
      },
      {
        name: "Riverwood Golf Course",
        tier: "solid",
        greenFeeRange: [35, 60],
        holes: 27,
        par: 72,
        yardage: 7095,
        walkable: true,
        style: "parkland",
        driveMinutes: 12,
        url: "https://www.riverwoodgolf.net",
        highlight:
          "Bismarck's 27-hole tree-lined muni along the Missouri — a strong, affordable value round",
        hypeTag: "BEST VALUE",
      },
      {
        name: "Prairie West Golf Course (Mandan)",
        tier: "solid",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 72,
        yardage: 6700,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.prairiewestgolf.com",
        highlight:
          "Well-kept Mandan muni with water in play — fair, walkable, and great value across the river",
        hypeTag: "BEST VALUE",
      },
      {
        name: "Apple Creek Country Club",
        tier: "solid",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 72,
        yardage: 6900,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.applecreekcc.com",
        highlight:
          "Semi-private Bismarck club to round out a multi-day northern-plains trip",
        hypeTag: "LOCALS' FAVORITE",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [150, 400],
        amenities: ["full kitchen", "deck", "grill", "game room", "fire pit"],
        areaDescription:
          "Bismarck-Mandan rentals near the river and downtown",
        searchUrl:
          "https://www.vrbo.com/search?destination=Bismarck%2C%20ND&groupSize=12",
        notes:
          "Affordable large rentals across Bismarck-Mandan; downtown-adjacent puts you near the bar scene with quick course access.",
      },
      {
        type: "cabin",
        sleeps: [8, 12],
        nightlyRange: [150, 350],
        amenities: ["river access", "deck", "grill", "fire pit"],
        areaDescription:
          "Missouri River cabins and lake homes around the Bismarck area",
        searchUrl:
          "https://www.vrbo.com/search?destination=Bismarck%2C%20ND&groupSize=10",
        notes:
          "River-side cabins pair golf with Missouri River fishing and boating; a relaxed self-catering base.",
      },
    ],
    dining: [
      {
        name: "Butterhorn",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Downtown Bismarck's standout farm-to-table — the group's nicer dinner spot",
        reservationNeeded: true,
      },
      {
        name: "Pirogue Grille",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Long-running downtown bistro featuring local game and bison",
        reservationNeeded: true,
      },
      {
        name: "Laughing Sun Brewing",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Downtown brewery with food and a big group room — easy post-round spot",
        reservationNeeded: false,
      },
      {
        name: "Kroll's Diner",
        style: "casual",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "North Dakota diner institution — knoephla and big breakfasts to fuel a tee time",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Laughing Sun Brewing",
        vibe: "brewpub",
        highlight:
          "Bismarck's flagship craft brewery and the natural 19th-hole HQ",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Lonesome Dove",
        vibe: "honky-tonk",
        highlight:
          "Downtown Bismarck honky-tonk with line dancing and live country",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Peacock Alley",
        vibe: "cocktail",
        highlight:
          "Historic hotel bar downtown — classic cocktails in a 1930s setting",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Missouri River fishing charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [90, 220],
        groupFriendly: true,
        highlight:
          "Walleye and northern-pike charters on the Missouri — prime northern-plains fishing",
        bestFor: "morning before golf",
        provider: "Bismarck river guides",
      },
      {
        name: "Missouri River kayak / boat rental",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [40, 100],
        groupFriendly: true,
        highlight:
          "Paddle or cruise the big river for a rest-day on the water",
        bestFor: "rest day",
        provider: "Bismarck-Mandan marinas",
      },
      {
        name: "Fort Abraham Lincoln & Custer history",
        type: "horseback",
        duration: "half day",
        pricePerPerson: [25, 90],
        groupFriendly: true,
        highlight:
          "Tour Custer's reconstructed fort and ride or hike the bluffs above the Missouri at Mandan",
        bestFor: "rest day",
        provider: "Fort Abraham Lincoln State Park",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 28],
        hourlyRate: [120, 260],
        providers: [
          "Bismarck-Mandan charter services",
          "Local limo & coach operators",
        ],
        notes:
          "Local shuttles handle airport runs from BIS and course transfers; downtown bar runs are short and walkable. Pair AM golf with a PM downtown run.",
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 140],
        providers: ["Cozymeal (Bismarck)", "Take a Chef", "Local ND chefs"],
        mealTypes: ["steak dinner", "bison/game cookout", "walleye fry", "breakfast"],
        notes:
          "Book a chef for a bison-and-steak night at the rental, or a walleye fry with a morning river catch — reserve well ahead given the smaller market.",
      },
    ],
  },

  // ─── Sioux Falls, SD ─────────────────────────────────────────────────
  {
    id: "sioux-falls-sd",
    city: "Sioux Falls",
    state: "SD",
    region: "Midwest",
    tagline: "Award-winning city golf and an underrated bar scene",
    description:
      "Sioux Falls runs three award-winning municipal courses — led by Prairie Green, voted #2 in South Dakota — plus a strong public slate, all for buddy-trip prices. Add a genuinely good downtown restaurant-and-brewery district and the namesake waterfalls, and it's a sneaky-great eastern-Dakota golf base.",
    population: "medium",
    nearestAirport: {
      code: "FSD",
      name: "Sioux Falls Regional Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["summer", "fall"],
    groceryNotes:
      "Full grocery and liquor across Sioux Falls — no logistics issues for a rental.",
    courses: [
      {
        name: "Prairie Green Golf Course",
        tier: "premium",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 72,
        yardage: 7200,
        slope: 134,
        walkable: true,
        style: "links",
        driveMinutes: 15,
        url: "https://www.siouxfallsgolf.com",
        highlight:
          "Voted #2 course in South Dakota — a long, links-influenced city championship course at a muni price",
        hypeTag: "BEST VALUE",
        rankNote: "#2 in South Dakota — Golfweek",
      },
      {
        name: "Willow Run Golf Course",
        tier: "solid",
        greenFeeRange: [35, 60],
        holes: 18,
        par: 70,
        yardage: 6520,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://willowrungolfcourse.com",
        highlight:
          "4-star Golf Digest muni rambling through rolling hills east of town — scenery plus a fair test",
        hypeTag: "BEST VALUE",
      },
      {
        name: "Elmwood Golf Course",
        tier: "solid",
        greenFeeRange: [30, 55],
        holes: 27,
        par: 72,
        yardage: 6900,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.siouxfallsgolf.com",
        highlight:
          "Sioux Falls's classic 27-hole parkland muni — tree-lined, domed greens, and great value",
        hypeTag: "LOCALS' FAVORITE",
      },
      {
        name: "Central Valley Golf Course (Hartford)",
        tier: "solid",
        greenFeeRange: [30, 50],
        holes: 18,
        par: 72,
        yardage: 6850,
        walkable: true,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.golfcentralvalley.com",
        highlight:
          "Well-regarded daily-fee track just west of the city to round out a multi-day trip",
        hypeTag: "BEST VALUE",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 16],
        nightlyRange: [180, 450],
        amenities: ["full kitchen", "deck", "grill", "game room", "fire pit"],
        areaDescription:
          "Suburban Sioux Falls rentals near the courses and downtown",
        searchUrl:
          "https://www.vrbo.com/search?destination=Sioux%20Falls%2C%20SD&groupSize=12",
        notes:
          "Affordable large rentals across metro Sioux Falls. Downtown-adjacent puts you near the best restaurant and bar district.",
      },
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [150, 350],
        amenities: ["full kitchen", "deck", "grill"],
        areaDescription:
          "Downtown / Phillips Avenue area homes for a crew that wants nightlife at the door",
        searchUrl:
          "https://www.vrbo.com/search?destination=Sioux%20Falls%2C%20SD&groupSize=10",
        notes:
          "Staying near Phillips Avenue puts you walking distance to the city's best bars and breweries.",
      },
    ],
    dining: [
      {
        name: "Minervas",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Sioux Falls's long-standing upscale steakhouse — the group's big-night anchor",
        reservationNeeded: true,
      },
      {
        name: "Bread & Circus Sandwich Kitchen",
        style: "casual",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Award-winning downtown sandwich spot for an easy lunch between rounds",
        reservationNeeded: false,
      },
      {
        name: "Parker's Bistro",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Downtown fine-dining bistro for a nicer smaller-group dinner",
        reservationNeeded: true,
      },
      {
        name: "JL Beers / Phillips Avenue Diner",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Burgers, beers, and a retro diner downtown — easy group-friendly stops",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Phillips Avenue district",
        vibe: "cocktail",
        highlight:
          "Sioux Falls's walkable downtown nightlife strip — bars, patios, and live music",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Fernson Brewing / Remedy Brewing",
        vibe: "brewpub",
        highlight:
          "Sioux Falls's flagship craft breweries with big taprooms for a group night",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Wiley's Tavern",
        vibe: "dive",
        highlight:
          "Downtown dive with cheap beer and a deep tap wall — easy late-night option",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Big Sioux River kayaking",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [25, 55],
        groupFriendly: true,
        highlight:
          "Paddle the Big Sioux and see Falls Park — the city's namesake cascades — on a rest-day morning",
        bestFor: "rest day",
        provider: "Local outfitters",
      },
      {
        name: "Eastern SD sporting clays & shooting",
        type: "shooting",
        duration: "half day",
        pricePerPerson: [60, 160],
        groupFriendly: true,
        highlight:
          "Sporting clays and pheasant-country shooting ranges around Sioux Falls",
        bestFor: "rest day",
        provider: "Local shooting clubs",
      },
      {
        name: "Downtown brewery & distillery crawl",
        type: "distillery",
        duration: "2-3 hours",
        pricePerPerson: [25, 60],
        groupFriendly: true,
        highlight:
          "Fernson, Remedy, and Obstinate Daughter distillery along the Phillips Avenue corridor",
        bestFor: "arrival day",
        provider: "Downtown Sioux Falls",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [12, 30],
        hourlyRate: [130, 280],
        providers: [
          "Sioux Falls party bus operators",
          "FSD limo & coach services",
          "Premier Transportation",
        ],
        notes:
          "Sioux Falls has a solid party-bus market. Easy to run AM golf at the city courses with a PM Phillips Avenue bar run.",
        fullDayRate: [1000, 2000],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 140],
        providers: ["Cozymeal (Sioux Falls)", "Take a Chef", "Local SD chefs"],
        mealTypes: ["steak dinner", "pheasant/game cookout", "BBQ cookout", "breakfast"],
        notes:
          "Book a chef for a steak-and-game night at the rental — South Dakota pheasant is a fitting regional touch. Reserve a week or two ahead.",
      },
    ],
  },
];
