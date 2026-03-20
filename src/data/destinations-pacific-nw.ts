import { Destination } from "./types";

export const pacificNWDestinations: Destination[] = [
  // ── Bend, OR ──────────────────────────────────────────────────────────
  {
    id: "bend-or",
    city: "Bend",
    state: "OR",
    region: "Pacific NW",
    tagline: "High desert golf with a brewery on every corner",
    description:
      "Bend delivers elite destination golf surrounded by the Cascades, craft beer culture that rivals any city in America, and enough outdoor activities to fill a week. Pronghorn and Tetherow headline the golf, Deschutes Brewery anchors the drinking, and the Deschutes River keeps the non-golf hours packed.",
    population: "medium",
    nearestAirport: {
      code: "RDM",
      name: "Redmond Municipal Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["summer", "fall"],
    tdfTested: true,
    tdfYear: 2024,
    courses: [
      {
        name: "Pronghorn Resort (Nicklaus Course)",
        tier: "bucket-list",
        greenFeeRange: [200, 325],
        holes: 18,
        par: 72,
        yardage: 7379,
        slope: 143,
        rating: 75.4,
        walkable: false,
        style: "desert",
        driveMinutes: 15,
        url: "https://www.pronghornresort.com",
        highlight:
          "Jack Nicklaus signature design carved through high desert lava rock and juniper",
      },
      {
        name: "Tetherow Golf Club",
        tier: "premium",
        greenFeeRange: [150, 250],
        holes: 18,
        par: 72,
        yardage: 7298,
        slope: 145,
        rating: 75.1,
        walkable: true,
        style: "links",
        driveMinutes: 10,
        url: "https://www.tetherow.com",
        highlight:
          "David McLay Kidd links-style design with panoramic Cascade Mountain views",
      },
      {
        name: "Juniper Golf Course",
        tier: "solid",
        greenFeeRange: [50, 80],
        holes: 18,
        par: 72,
        yardage: 6556,
        slope: 126,
        rating: 71.0,
        walkable: true,
        style: "desert",
        driveMinutes: 5,
        url: "https://www.playjuniper.com",
        highlight:
          "Best muni value in Central Oregon with views of eight Cascade peaks",
      },
      {
        name: "Crosswater Golf Club",
        tier: "bucket-list",
        greenFeeRange: [175, 295],
        holes: 18,
        par: 72,
        yardage: 7683,
        slope: 146,
        rating: 76.1,
        walkable: false,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.crosswater.com",
        highlight:
          "Bob Cupp design winding through wetlands along the Deschutes and Little Deschutes rivers",
      },
      {
        name: "Widgi Creek Golf Club",
        tier: "solid",
        greenFeeRange: [60, 99],
        holes: 18,
        par: 72,
        yardage: 6905,
        slope: 131,
        rating: 72.9,
        walkable: true,
        style: "parkland",
        driveMinutes: 8,
        url: "https://www.widgi.com",
        highlight:
          "Robert Muir Graves design with Mt. Bachelor views and tree-lined fairways",
      },
      {
        name: "Brasada Canyons Golf Course",
        tier: "premium",
        greenFeeRange: [120, 195],
        holes: 18,
        par: 72,
        yardage: 7295,
        slope: 140,
        rating: 74.7,
        walkable: false,
        style: "desert",
        driveMinutes: 25,
        url: "https://www.brasada.com",
        highlight:
          "Peter Jacobsen design through canyon terrain with dramatic elevation changes",
      },
      {
        name: "Eagle Crest Resort (Ridge Course)",
        tier: "solid",
        greenFeeRange: [55, 89],
        holes: 18,
        par: 72,
        yardage: 6927,
        slope: 128,
        rating: 72.3,
        walkable: true,
        style: "desert",
        driveMinutes: 15,
        url: "https://www.eagle-crest.com",
        highlight:
          "Juniper-lined fairways with Cascade views at a resort-friendly price point",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [600, 1500],
        amenities: [
          "hot tub",
          "fire pit",
          "game room",
          "large kitchen",
          "multiple living areas",
          "garage",
        ],
        areaDescription:
          "Northwest Crossing or River West neighborhoods, walkable to breweries and downtown",
        searchUrl:
          "https://www.vrbo.com/search?destination=Bend%2C+Oregon&guests=14",
        notes:
          "Book 3-6 months ahead for summer. Lots of 5-6BR options in the NW Crossing and Broken Top areas. Many homes have golf course views.",
      },
      {
        type: "cabin",
        sleeps: [10, 16],
        nightlyRange: [500, 1200],
        amenities: [
          "hot tub",
          "fire pit",
          "mountain views",
          "BBQ",
          "game room",
        ],
        areaDescription:
          "Sunriver or Caldera Springs resort communities, 15-25 min south of town",
        searchUrl:
          "https://www.airbnb.com/s/Bend--Oregon/homes?adults=14",
        notes:
          "Resort community cabins offer shared pools and recreation amenities. Great for groups that want a compound feel.",
      },
    ],
    dining: [
      {
        name: "McKay Cottage Restaurant",
        style: "farm-to-table",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Converted 1916 cottage serving the best brunch in Bend with local ingredients",
        reservationNeeded: true,
      },
      {
        name: "Jackalope Grill",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Upscale Northwest steakhouse with a wine list to match and a big-group-friendly layout",
        reservationNeeded: true,
      },
      {
        name: "Greg's Grill",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Old Bend staple with rooftop patio and big enough to seat 16 without a fuss",
        reservationNeeded: false,
      },
      {
        name: "Zydeco Kitchen & Cocktails",
        style: "southern",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Southern-inspired dishes with creative cocktails in a lively atmosphere",
        reservationNeeded: true,
      },
      {
        name: "Deschutes Brewery & Public House",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "The OG Bend brewery — flagship pub with solid food and fresh-from-the-tank pours",
        reservationNeeded: false,
      },
      {
        name: "Brother Jon's Public House",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Low-key pub grub with a huge tap list and sports on every screen",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "10 Barrel Brewing Bend Pub",
        vibe: "brewpub",
        highlight:
          "Large patio with fire pits, perfect for a group to post up after a round",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Boneyard Beer Pub",
        vibe: "brewpub",
        highlight: "Cult-favorite IPAs in a no-frills taproom with outdoor seating",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "The Capitol",
        vibe: "cocktail",
        highlight:
          "Craft cocktails in a swanky downtown setting — the closest thing to a nightclub Bend has",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Astro Lounge",
        vibe: "dive",
        highlight:
          "Beloved dive bar with cheap drinks, pool tables, and late-night energy",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Bend Brewing Company",
        vibe: "patio",
        highlight:
          "Brewpub right on Mirror Pond with one of the best patios in town",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Deschutes River Float",
        type: "rafting",
        duration: "2-3 hours",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "Lazy river float through town on the Deschutes — tubes, beers, and sunshine",
        bestFor: "rest day",
        provider: "Tumalo Creek Kayak & Canoe",
      },
      {
        name: "Big Eddy Whitewater Rafting",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [60, 95],
        groupFriendly: true,
        highlight: "Class III-IV rapids on the upper Deschutes for an adrenaline hit",
        bestFor: "rest day",
        provider: "Sun Country Tours",
      },
      {
        name: "Phil's Trail Mountain Biking",
        type: "mountain-biking",
        duration: "2-3 hours",
        pricePerPerson: [50, 85],
        groupFriendly: true,
        highlight:
          "World-class singletrack right at the edge of town — rentals available for all levels",
        bestFor: "rest day",
        provider: "Pine Mountain Sports",
      },
      {
        name: "Bend Ale Trail",
        type: "brewery",
        duration: "3-4 hours",
        pricePerPerson: [0, 50],
        groupFriendly: true,
        highlight:
          "30+ breweries in town — self-guided or guided tours through the craft beer capital of Oregon",
        bestFor: "arrival day",
        provider: "Bend Ale Trail / Wanderlust Tours",
      },
      {
        name: "Smith Rock Hiking",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [0, 10],
        groupFriendly: true,
        highlight:
          "Iconic desert spires and canyon trails 25 minutes north of Bend — Misery Ridge is a must",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [150, 225],
        providers: ["Bend Party Bus", "Epic Limo & Party Bus"],
        notes:
          "Sprinter vans are the move in Bend for brewery crawls and course shuttles. Book early for summer weekends.",
      },
      {
        type: "party-bus",
        capacity: [14, 24],
        hourlyRate: [200, 350],
        providers: ["Epic Limo & Party Bus", "Cascade Limousine"],
        notes:
          "Full party buses available for larger groups. Great for the brewery circuit.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 150],
        providers: ["Take a Chef", "Bend Private Chef Co."],
        mealTypes: [
          "steak dinner",
          "BBQ cookout",
          "Pacific NW seafood boil",
          "breakfast spread",
        ],
        notes:
          "Several private chef options in Bend. Steaks and salmon are the go-to for group dinners. Book 2-4 weeks ahead in summer.",
      },
    ],
  },

  // ── Bandon, OR ────────────────────────────────────────────────────────
  {
    id: "bandon-or",
    city: "Bandon",
    state: "OR",
    region: "Pacific NW",
    tagline: "Bucket-list links golf on the Oregon coast",
    description:
      "Bandon Dunes is a pilgrimage for any serious golfer — five world-class walking-only courses perched on rugged Pacific Ocean cliffs. It's remote, it's windswept, and it's absolutely legendary. You come here to play golf. Everything else is secondary.",
    population: "tiny",
    nearestAirport: {
      code: "OTH",
      name: "Southwest Oregon Regional Airport (North Bend)",
      driveMinutes: 25,
    },
    bestSeasons: ["summer"],
    courses: [
      {
        name: "Bandon Dunes",
        tier: "bucket-list",
        greenFeeRange: [275, 395],
        holes: 18,
        par: 72,
        yardage: 6732,
        slope: 144,
        rating: 74.1,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://www.bandondunesgolf.com",
        highlight:
          "The course that started it all — oceanside links designed by David McLay Kidd",
      },
      {
        name: "Pacific Dunes",
        tier: "bucket-list",
        greenFeeRange: [275, 395],
        holes: 18,
        par: 71,
        yardage: 6633,
        slope: 142,
        rating: 73.0,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://www.bandondunesgolf.com",
        highlight:
          "Tom Doak masterpiece — consistently rated top 15 in the world, perched on ocean bluffs",
      },
      {
        name: "Old Macdonald",
        tier: "bucket-list",
        greenFeeRange: [275, 395],
        holes: 18,
        par: 71,
        yardage: 6942,
        slope: 131,
        rating: 73.4,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://www.bandondunesgolf.com",
        highlight:
          "Tribute to C.B. Macdonald with massive greens and strategic template holes",
      },
      {
        name: "Sheep Ranch",
        tier: "bucket-list",
        greenFeeRange: [275, 395],
        holes: 18,
        par: 72,
        yardage: 6996,
        slope: 137,
        rating: 74.3,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://www.bandondunesgolf.com",
        highlight:
          "The newest course with the most ocean exposure — every hole has a Pacific view",
      },
      {
        name: "Bandon Trails",
        tier: "bucket-list",
        greenFeeRange: [275, 395],
        holes: 18,
        par: 71,
        yardage: 6765,
        slope: 137,
        rating: 73.5,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://www.bandondunesgolf.com",
        highlight:
          "Inland layout through dunes and coastal forest — the most diverse routing on property",
      },
    ],
    lodging: [
      {
        type: "lodge",
        sleeps: [12, 16],
        nightlyRange: [800, 2400],
        amenities: [
          "on-site dining",
          "golf concierge",
          "practice facility",
          "shuttles between courses",
        ],
        areaDescription: "Bandon Dunes Resort — stay on-site for maximum convenience",
        searchUrl: "https://www.bandondunesgolf.com/lodging",
        notes:
          "On-resort lodging in multi-bedroom suites or Chrome Lake cottages is the move. Book 6-12 months ahead. Groups can get multi-room packages.",
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [400, 1000],
        amenities: ["kitchen", "ocean views", "fire pit", "hot tub"],
        areaDescription: "Town of Bandon, 15 minutes from the resort",
        searchUrl:
          "https://www.vrbo.com/search?destination=Bandon%2C+Oregon&guests=14",
        notes:
          "Limited inventory in the town of Bandon itself. Staying on-resort is strongly recommended.",
      },
    ],
    dining: [
      {
        name: "The Gallery Restaurant (Bandon Dunes)",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "On-resort fine dining with ocean views and Pacific NW-focused menu",
        reservationNeeded: true,
      },
      {
        name: "McKee's Pub (Bandon Dunes)",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "The 19th hole — casual pub grub, cold beers, and trading war stories after the round",
        reservationNeeded: false,
      },
      {
        name: "Alloro Wine Bar & Restaurant",
        style: "italian",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Surprisingly excellent Italian in tiny Bandon — wood-fired dishes and Oregon wines",
        reservationNeeded: true,
      },
      {
        name: "Tony's Crab Shack",
        style: "seafood",
        priceRange: "$",
        capacity: "medium",
        highlight:
          "Cash-only crab shack on the harbor — fresh Dungeness crab and clam chowder",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "McKee's Pub",
        vibe: "sports-bar",
        highlight:
          "The only bar that matters — on-resort, full of golfers, and the energy is always high",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "The Bunker Bar (Bandon Dunes)",
        vibe: "whiskey-bar",
        highlight: "Intimate resort bar with a deep whiskey selection and fireplace",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Bandon Brewing Company",
        vibe: "brewpub",
        highlight: "Small-town brewery in old-town Bandon with solid IPAs and pub fare",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Bandon Dunes Punchbowl",
        type: "hiking",
        duration: "1-2 hours",
        pricePerPerson: [0, 0],
        groupFriendly: true,
        highlight:
          "Free par-3 putting course on-resort — perfect for friendly competitions",
        bestFor: "arrival day",
      },
      {
        name: "Bandon Beach & Face Rock Walk",
        type: "hiking",
        duration: "1-2 hours",
        pricePerPerson: [0, 0],
        groupFriendly: true,
        highlight:
          "Walk the dramatic sea stacks and tide pools on Bandon's beach — Face Rock is iconic",
        bestFor: "morning before golf",
      },
      {
        name: "Coquille River Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [100, 200],
        groupFriendly: false,
        highlight: "Salmon and steelhead fishing on the Coquille River with local guides",
        bestFor: "rest day",
        provider: "Bandon Fishing Charters",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [8, 14],
        hourlyRate: [100, 175],
        providers: ["Bandon Dunes Resort Shuttles", "South Coast Tours"],
        notes:
          "The resort has its own shuttles between courses and lodging. For off-resort transport, options are very limited — plan ahead.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [80, 175],
        providers: ["Take a Chef", "Bandon Dunes Resort Catering"],
        mealTypes: [
          "Dungeness crab dinner",
          "steak dinner",
          "Pacific NW seafood boil",
        ],
        notes:
          "Resort catering is the easiest option for group meals. Private chef availability outside the resort is very limited due to the remote location.",
      },
    ],
  },

  // ── Sunriver, OR ──────────────────────────────────────────────────────
  {
    id: "sunriver-or",
    city: "Sunriver",
    state: "OR",
    region: "Pacific NW",
    tagline: "Resort golf in the Cascades with a laid-back compound vibe",
    description:
      "Sunriver is a sprawling resort community 15 minutes south of Bend with its own golf courses, bike paths, and a lodge feel. Crosswater is the crown jewel, but Meadows and Woodlands keep the group busy for a multi-day trip. It's quieter than Bend but works perfectly as a base camp.",
    population: "tiny",
    nearestAirport: {
      code: "RDM",
      name: "Redmond Municipal Airport",
      driveMinutes: 35,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Crosswater Golf Club",
        tier: "bucket-list",
        greenFeeRange: [175, 295],
        holes: 18,
        par: 72,
        yardage: 7683,
        slope: 146,
        rating: 76.1,
        walkable: false,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.sunriverresort.com/golf/crosswater",
        highlight:
          "Bob Cupp design through pristine wetlands — one of the top resort courses in the country",
      },
      {
        name: "Sunriver Meadows",
        tier: "solid",
        greenFeeRange: [70, 110],
        holes: 18,
        par: 71,
        yardage: 6940,
        slope: 129,
        rating: 72.4,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.sunriverresort.com/golf/meadows",
        highlight:
          "Robert Trent Jones Jr. redesign with Cascade Mountain views and wide fairways",
      },
      {
        name: "Sunriver Woodlands",
        tier: "solid",
        greenFeeRange: [60, 95],
        holes: 18,
        par: 72,
        yardage: 6880,
        slope: 127,
        rating: 72.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.sunriverresort.com/golf/woodlands",
        highlight:
          "Tree-lined classic layout through the ponderosa pines — forgiving but fun",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [12, 20],
        nightlyRange: [500, 1800],
        amenities: [
          "hot tub",
          "bikes included",
          "fire pit",
          "BBQ",
          "game room",
          "SHARC pool access",
        ],
        areaDescription:
          "Sunriver Resort community — homes clustered near golf courses and the Village",
        searchUrl:
          "https://www.vrbo.com/search?destination=Sunriver%2C+Oregon&guests=14",
        notes:
          "Tons of large homes available in the resort community. Many come with complimentary bikes and pool passes. The compound feel is perfect for groups.",
      },
    ],
    dining: [
      {
        name: "Carson's American Kitchen",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Sunriver Lodge's main restaurant — solid American fare with a big patio",
        reservationNeeded: true,
      },
      {
        name: "South Bend Bistro",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight: "Upscale bistro in the Village with creative Pacific NW dishes",
        reservationNeeded: true,
      },
      {
        name: "Hola! Mexican Restaurant",
        style: "mexican",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Colorful cantina in the Village with strong margaritas and group-friendly seating",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Owl's Nest Pub",
        vibe: "sports-bar",
        highlight: "Sunriver Lodge's sports pub — cold beer, big screens, post-round vibe",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Sunriver Brewing Company",
        vibe: "brewpub",
        highlight: "Solid craft beer in the Village with a relaxed outdoor seating area",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Deschutes River Float (Sunriver stretch)",
        type: "rafting",
        duration: "2-3 hours",
        pricePerPerson: [25, 50],
        groupFriendly: true,
        highlight: "Gentle float on the Deschutes with tube rentals right in the resort",
        bestFor: "rest day",
        provider: "Sunriver Marina",
      },
      {
        name: "Sunriver Bike Paths",
        type: "mountain-biking",
        duration: "1-3 hours",
        pricePerPerson: [0, 30],
        groupFriendly: true,
        highlight:
          "33 miles of paved bike paths through the ponderosa pine forest — most homes include bikes",
        bestFor: "morning before golf",
      },
      {
        name: "Newberry Volcanic Monument Hike",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [0, 5],
        groupFriendly: true,
        highlight:
          "Paulina Falls and obsidian flows 20 minutes away — dramatic volcanic scenery",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [8, 14],
        hourlyRate: [125, 200],
        providers: ["Bend Party Bus", "Cascade Limousine"],
        notes:
          "Most transport is to/from Bend for nightlife. Within Sunriver, bikes and golf carts are the primary transport.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 140],
        providers: ["Take a Chef", "Bend Private Chef Co."],
        mealTypes: ["steak dinner", "BBQ cookout", "breakfast spread", "taco bar"],
        notes:
          "Same private chef pool as Bend since it's 15 minutes south. Kitchens in the resort homes are typically well-equipped for group cooking.",
      },
    ],
  },

  // ── Coeur d'Alene, ID ────────────────────────────────────────────────
  {
    id: "coeur-dalene-id",
    city: "Coeur d'Alene",
    state: "ID",
    region: "Pacific NW",
    tagline: "Lake town golf with a floating green",
    description:
      "Coeur d'Alene is a stunning mountain lake town with a golf resort famous for its par-3 island green that you reach by boat. Beyond the resort course, Circling Raven and The Idaho Club offer serious golf. The downtown lakefront packs plenty of restaurants and bars for group nightlife.",
    population: "medium",
    nearestAirport: {
      code: "SFF",
      name: "Spokane International Airport (GEG)",
      driveMinutes: 40,
    },
    bestSeasons: ["summer"],
    courses: [
      {
        name: "Coeur d'Alene Resort Golf Course",
        tier: "bucket-list",
        greenFeeRange: [200, 350],
        holes: 18,
        par: 71,
        yardage: 6803,
        slope: 133,
        rating: 72.4,
        walkable: false,
        style: "resort",
        driveMinutes: 5,
        url: "https://www.cdaresort.com/golf",
        highlight:
          "Home of the famous floating green on hole 14 — reached by boat, one of golf's most unique experiences",
      },
      {
        name: "Circling Raven Golf Club",
        tier: "premium",
        greenFeeRange: [100, 175],
        holes: 18,
        par: 72,
        yardage: 7189,
        slope: 140,
        rating: 74.6,
        walkable: true,
        style: "parkland",
        driveMinutes: 30,
        url: "https://www.cdacasino.com/golf",
        highlight:
          "Gene Bates design through wetlands and timber on the Coeur d'Alene Tribe reservation — top 50 public course",
      },
      {
        name: "The Idaho Club",
        tier: "premium",
        greenFeeRange: [125, 225],
        holes: 18,
        par: 72,
        yardage: 7059,
        slope: 138,
        rating: 73.8,
        walkable: true,
        style: "mountain",
        driveMinutes: 60,
        url: "https://www.theidahoclub.com",
        highlight:
          "Jack Nicklaus design on the shores of Lake Pend Oreille — pristine mountain golf in Sandpoint",
      },
      {
        name: "Gozzer Ranch Golf & Lake Club",
        tier: "bucket-list",
        greenFeeRange: [250, 400],
        holes: 18,
        par: 72,
        yardage: 7143,
        slope: 143,
        rating: 74.5,
        walkable: false,
        style: "mountain",
        driveMinutes: 25,
        url: "https://www.gozzerranchclub.com",
        highlight:
          "Ultra-exclusive Tom Fazio design overlooking Lake Coeur d'Alene — private but member guests can play",
      },
    ],
    lodging: [
      {
        type: "lakehouse",
        sleeps: [12, 18],
        nightlyRange: [700, 2500],
        amenities: [
          "lake access",
          "dock",
          "hot tub",
          "fire pit",
          "large kitchen",
          "boat slip",
        ],
        areaDescription:
          "Lake Coeur d'Alene waterfront or Hayden Lake — 5-15 min from downtown",
        searchUrl:
          "https://www.vrbo.com/search?destination=Coeur+d%27Alene%2C+Idaho&guests=14",
        notes:
          "Lakefront homes are the play here. Boat access makes rest days incredible. Book 4-6 months ahead for peak summer.",
      },
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [500, 1500],
        amenities: ["hot tub", "game room", "large kitchen", "mountain views"],
        areaDescription:
          "Downtown CDA or East Side neighborhoods, walkable to restaurants and lakefront",
        searchUrl:
          "https://www.airbnb.com/s/Coeur-d-Alene--Idaho/homes?adults=14",
        notes:
          "Downtown-adjacent homes give you walkability to nightlife. Slightly less inventory than lake houses.",
      },
    ],
    dining: [
      {
        name: "Beverly's Restaurant",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "7th-floor fine dining at The Coeur d'Alene Resort with panoramic lake views",
        reservationNeeded: true,
      },
      {
        name: "Tony's on the Lake",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight: "Waterfront steaks and seafood with outdoor seating on the lake",
        reservationNeeded: true,
      },
      {
        name: "Daft Badger Brewing",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight: "Downtown brewpub with creative food menu and strong IPAs",
        reservationNeeded: false,
      },
      {
        name: "Crafted Tap House + Kitchen",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "40 taps, big TVs, and a scratch kitchen — great group gathering spot",
        reservationNeeded: false,
      },
      {
        name: "Satay Bistro",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight: "Southeast Asian-Pacific NW fusion with creative small plates",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "The Iron Horse Bar & Grill",
        vibe: "sports-bar",
        highlight: "Downtown sports bar with great energy, pool tables, and a packed weekend scene",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Whiskey Bar (CDA Resort)",
        vibe: "whiskey-bar",
        highlight: "Upscale whiskey lounge in the resort with lake views and a deep bourbon list",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Midtown Bluebird",
        vibe: "cocktail",
        highlight: "Hip craft cocktail bar in a converted midtown space — great drinks, cool vibe",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Capone's Pub & Grill",
        vibe: "dive",
        highlight: "No-frills dive with cheap drinks, darts, and a jukebox — a group favorite",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Lake Coeur d'Alene Boat Cruise",
        type: "water-sports",
        duration: "2-3 hours",
        pricePerPerson: [30, 75],
        groupFriendly: true,
        highlight:
          "Scenic cruise or pontoon boat rental on one of the most beautiful lakes in the country",
        bestFor: "rest day",
        provider: "Coeur d'Alene Cruises",
      },
      {
        name: "Coeur d'Alene Casino",
        type: "casino",
        duration: "2-4 hours",
        pricePerPerson: [0, 100],
        groupFriendly: true,
        highlight:
          "Full casino on the Coeur d'Alene Tribe reservation — play Circling Raven and hit the tables",
        bestFor: "arrival day",
        provider: "Coeur d'Alene Casino Resort",
      },
      {
        name: "Tubbs Hill Hike",
        type: "hiking",
        duration: "1-2 hours",
        pricePerPerson: [0, 0],
        groupFriendly: true,
        highlight:
          "2.3-mile loop trail on a peninsula right downtown with lake views — perfect morning shakeout",
        bestFor: "morning before golf",
      },
      {
        name: "Lake Coeur d'Alene Kayaking",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [35, 65],
        groupFriendly: true,
        highlight: "Paddle the crystal-clear lake with kayak and SUP rentals on the waterfront",
        bestFor: "rest day",
        provider: "ROW Adventure Center",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 24],
        hourlyRate: [175, 300],
        providers: [
          "Spokane Party Bus",
          "Coeur d'Alene Limousine",
          "Arrow Limousine",
        ],
        notes:
          "Most party bus companies operate out of Spokane and serve the CDA area. Book early for summer weekends.",
      },
      {
        type: "sprinter-van",
        capacity: [10, 14],
        hourlyRate: [125, 200],
        providers: ["Arrow Limousine", "CDA Shuttle Service"],
        notes:
          "Sprinter vans work well for golf course shuttles and brewery hops between CDA and Spokane.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 160],
        providers: ["Take a Chef", "CDA Private Dining"],
        mealTypes: [
          "steak dinner",
          "lake trout cookout",
          "BBQ cookout",
          "breakfast",
        ],
        notes:
          "Lakehouse dinners with a private chef are perfect here. Fresh local trout and elk are regional specialties.",
      },
    ],
  },

  // ── Boise, ID ─────────────────────────────────────────────────────────
  {
    id: "boise-id",
    city: "Boise",
    state: "ID",
    region: "Pacific NW",
    tagline: "Underrated golf town with a legit downtown bar scene",
    description:
      "Boise punches above its weight for a boys trip — affordable golf across multiple solid courses, a surprisingly fun downtown bar scene, and enough activities to keep non-golfers happy. Osprey Meadows at Tamarack is worth the drive for a bucket-list mountain round.",
    population: "medium",
    nearestAirport: {
      code: "BOI",
      name: "Boise Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["summer", "fall"],
    tdfTested: true,
    tdfYear: 2022,
    courses: [
      {
        name: "Falcon Crest Golf Club",
        tier: "premium",
        greenFeeRange: [60, 110],
        holes: 18,
        par: 72,
        yardage: 6938,
        slope: 136,
        rating: 73.1,
        walkable: true,
        style: "desert",
        driveMinutes: 20,
        url: "https://www.falconcrestgolf.com",
        highlight:
          "Best public course in the Boise area — dramatic canyon setting with rattlesnake-avoidance vibes",
      },
      {
        name: "Quail Hollow Golf Club",
        tier: "solid",
        greenFeeRange: [45, 75],
        holes: 18,
        par: 72,
        yardage: 6584,
        slope: 125,
        rating: 70.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.quailhollowboise.com",
        highlight:
          "Affordable and well-maintained parkland course that plays fast — solid value round",
      },
      {
        name: "Shadow Valley Golf Course",
        tier: "solid",
        greenFeeRange: [40, 65],
        holes: 18,
        par: 72,
        yardage: 6823,
        slope: 122,
        rating: 71.3,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.shadowvalleygolf.com",
        highlight:
          "Long and flat with tree-lined fairways — a good warm-up round at a budget price",
      },
      {
        name: "BanBury Golf Course",
        tier: "solid",
        greenFeeRange: [50, 85],
        holes: 18,
        par: 71,
        yardage: 6857,
        slope: 132,
        rating: 72.0,
        walkable: true,
        style: "desert",
        driveMinutes: 25,
        url: "https://www.banburygolf.com",
        highlight:
          "John Harbottle design in Eagle with canyon views and challenging elevation changes",
      },
      {
        name: "Osprey Meadows (Tamarack Resort)",
        tier: "premium",
        greenFeeRange: [85, 160],
        holes: 18,
        par: 72,
        yardage: 7300,
        slope: 142,
        rating: 74.8,
        walkable: false,
        style: "mountain",
        driveMinutes: 100,
        url: "https://www.tamarackidaho.com/golf",
        highlight:
          "Robert Trent Jones II design in the mountains above Donnelly — worth the drive for a spectacular mountain round",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [400, 1100],
        amenities: [
          "hot tub",
          "game room",
          "large kitchen",
          "fire pit",
          "garage",
        ],
        areaDescription:
          "North End or East Boise neighborhoods, 5-10 min from downtown bars and restaurants",
        searchUrl:
          "https://www.vrbo.com/search?destination=Boise%2C+Idaho&guests=14",
        notes:
          "Good inventory of large homes. The North End gives walkability to downtown. East Boise near the Greenbelt is also great for groups.",
      },
    ],
    dining: [
      {
        name: "Chandlers Steakhouse",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Boise's best steakhouse with a private dining room that handles groups perfectly",
        reservationNeeded: true,
      },
      {
        name: "Barbacoa",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Latin-inspired steakhouse downtown with craft cocktails and a lively vibe",
        reservationNeeded: true,
      },
      {
        name: "Payette Brewing Tap Room",
        style: "brewpub",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Spacious taproom with food trucks and a massive outdoor area — ideal for a big crew",
        reservationNeeded: false,
      },
      {
        name: "Bar Gernika",
        style: "casual",
        priceRange: "$",
        capacity: "medium",
        highlight:
          "Basque pub in the Basque Block — croquetas, lamb grinders, and Kalimotxo (red wine & Coke)",
        reservationNeeded: false,
      },
      {
        name: "Fork",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Upscale farm-to-table in a historic building — excellent brunch and dinner",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Neurolux",
        vibe: "dive",
        highlight:
          "Iconic Boise dive bar with cheap drinks, live music, and late-night chaos",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Balcony Club",
        vibe: "cocktail",
        highlight:
          "Rooftop cocktail bar on 8th Street with a great view of downtown",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Pengilly's Saloon",
        vibe: "saloon",
        highlight:
          "Oldest bar in Boise — dark, loud, and the right kind of rowdy for a guys trip",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Boise Brewing",
        vibe: "brewpub",
        highlight:
          "Neighborhood brewery with a chill patio and solid craft beer in a no-pretense setting",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Reef",
        vibe: "tiki",
        highlight: "Tiki bar downtown with strong tropical drinks and a fun group atmosphere",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Boise River Float",
        type: "rafting",
        duration: "2-3 hours",
        pricePerPerson: [15, 35],
        groupFriendly: true,
        highlight:
          "Float the Boise River through town on tubes — a summer ritual with easy entry/exit points",
        bestFor: "rest day",
        provider: "Epley's Whitewater Adventures",
      },
      {
        name: "Boise Brewery Circuit",
        type: "brewery",
        duration: "3-4 hours",
        pricePerPerson: [0, 50],
        groupFriendly: true,
        highlight:
          "Payette, Boise Brewing, Woodland Empire, and more — very walkable downtown brewery scene",
        bestFor: "arrival day",
      },
      {
        name: "Table Rock Hike",
        type: "hiking",
        duration: "1-2 hours",
        pricePerPerson: [0, 0],
        groupFriendly: true,
        highlight:
          "Short steep hike to the cross overlooking all of Boise — great morning sweat",
        bestFor: "morning before golf",
      },
      {
        name: "Bogus Basin Mountain Biking",
        type: "mountain-biking",
        duration: "half day",
        pricePerPerson: [40, 75],
        groupFriendly: true,
        highlight:
          "Downhill mountain biking at the ski resort 16 miles from downtown with chairlift access",
        bestFor: "rest day",
        provider: "Bogus Basin Mountain Recreation Area",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 22],
        hourlyRate: [175, 300],
        providers: ["Boise Party Bus", "Premier Transportation"],
        notes:
          "Boise party bus scene is solid. Great for brewery tours and downtown bar crawls.",
      },
      {
        type: "sprinter-van",
        capacity: [10, 14],
        hourlyRate: [125, 200],
        providers: ["Premier Transportation", "Boise Limo"],
        notes:
          "Sprinter vans are ideal for golf course shuttles, especially for the long drive to Tamarack.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 130],
        providers: ["Take a Chef", "Chef's Table Boise"],
        mealTypes: [
          "steak dinner",
          "BBQ cookout",
          "Basque-inspired dinner",
          "breakfast spread",
        ],
        notes:
          "Boise has a growing private chef scene. Basque-inspired group dinners are a unique local option.",
      },
    ],
  },

  // ── Hood River, OR ────────────────────────────────────────────────────
  {
    id: "hood-river-or",
    city: "Hood River",
    state: "OR",
    region: "Pacific NW",
    tagline: "Columbia Gorge views, craft beer, and sneaky-good golf",
    description:
      "Hood River sits in the heart of the Columbia River Gorge with Mt. Hood as a backdrop. The golf is more limited but the overall trip experience is elite — world-class windsurfing, a walkable downtown loaded with breweries and tasting rooms, and dramatic scenery everywhere you look. It works best as a 2-3 day trip.",
    population: "small",
    nearestAirport: {
      code: "PDX",
      name: "Portland International Airport",
      driveMinutes: 65,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Indian Creek Golf Course",
        tier: "solid",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 72,
        yardage: 6150,
        slope: 120,
        rating: 68.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.indiancreekgolf.com",
        highlight:
          "Charming course right in Hood River with Mt. Hood and Mt. Adams views from nearly every hole",
      },
      {
        name: "Windham Golf Course",
        tier: "budget",
        greenFeeRange: [25, 45],
        holes: 9,
        par: 35,
        yardage: 2906,
        slope: 112,
        rating: 66.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 30,
        highlight:
          "Affordable 9-hole track in the Gorge — play it twice for a relaxed 18 with mountain views",
      },
      {
        name: "Elk Ridge Golf Course",
        tier: "solid",
        greenFeeRange: [35, 55],
        holes: 18,
        par: 72,
        yardage: 6301,
        slope: 119,
        rating: 69.2,
        walkable: true,
        style: "parkland",
        driveMinutes: 45,
        highlight:
          "Well-maintained 18 in Goldendale, WA with views of Mt. Adams — worth the drive across the river",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [500, 1500],
        amenities: [
          "Gorge views",
          "hot tub",
          "large deck",
          "fire pit",
          "large kitchen",
        ],
        areaDescription:
          "Hood River Heights or West Side — walkable to downtown or with epic Gorge views",
        searchUrl:
          "https://www.vrbo.com/search?destination=Hood+River%2C+Oregon&guests=14",
        notes:
          "Smaller inventory than Bend but there are some excellent large homes with Gorge or Mt. Hood views. Book 3-4 months ahead for summer.",
      },
      {
        type: "cabin",
        sleeps: [10, 14],
        nightlyRange: [400, 1200],
        amenities: [
          "mountain views",
          "hot tub",
          "fire pit",
          "BBQ",
          "wraparound deck",
        ],
        areaDescription:
          "Parkdale or Mt. Hood foothills — 15-20 min from downtown in orchard country",
        searchUrl:
          "https://www.airbnb.com/s/Hood-River--Oregon/homes?adults=14",
        notes:
          "Foothill cabins offer more space and privacy but you'll need cars or a shuttle to get to town.",
      },
    ],
    dining: [
      {
        name: "Celilo Restaurant & Bar",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Upscale Pacific NW cuisine using hyper-local ingredients — the best dinner in Hood River",
        reservationNeeded: true,
      },
      {
        name: "pFriem Family Brewers",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "World-class Belgian-style ales with a waterfront tasting room and elevated pub food",
        reservationNeeded: false,
      },
      {
        name: "Double Mountain Brewery",
        style: "brewpub",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Hood River staple with some of the best pizza in Oregon and hop-forward beers",
        reservationNeeded: false,
      },
      {
        name: "Broder Ost",
        style: "farm-to-table",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Scandinavian-inspired brunch and dinner spot — lefse, Swedish pancakes, and creative entrees",
        reservationNeeded: true,
      },
      {
        name: "Solstice Wood Fire Cafe",
        style: "casual",
        priceRange: "$$",
        capacity: "medium",
        highlight: "Wood-fired pizza and local wines in a cozy downtown space",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Full Sail Brewing Tasting Room",
        vibe: "brewpub",
        highlight:
          "OG Hood River brewery with a rooftop patio overlooking the Columbia River and windsurfers",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Ferment Brewing",
        vibe: "brewpub",
        highlight: "New-school brewery with mixed fermentation beers and a stylish taproom",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Ruins",
        vibe: "cocktail",
        highlight:
          "Craft cocktails and small plates in a beautifully renovated space — Hood River's best bar",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "River City Saloon",
        vibe: "dive",
        highlight:
          "Classic small-town dive with pool, cheap beer, and a friendly crowd",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Columbia Gorge Windsurfing/Kiteboarding",
        type: "water-sports",
        duration: "2-4 hours",
        pricePerPerson: [80, 150],
        groupFriendly: true,
        highlight:
          "Hood River is the windsurfing capital of the US — lessons available for beginners at the Event Site",
        bestFor: "rest day",
        provider: "Hood River WaterPlay / Big Winds",
      },
      {
        name: "Fruit Loop Wine & Brewery Tour",
        type: "winery",
        duration: "half day",
        pricePerPerson: [20, 60],
        groupFriendly: true,
        highlight:
          "35-mile scenic loop through orchards, wineries, and cideries south of town",
        bestFor: "rest day",
        provider: "Self-guided or Martin's Gorge Tours",
      },
      {
        name: "Hood River Brewery Crawl",
        type: "brewery",
        duration: "3-4 hours",
        pricePerPerson: [0, 50],
        groupFriendly: true,
        highlight:
          "pFriem, Double Mountain, Full Sail, Ferment — all walkable downtown. World-class beer in a tiny town.",
        bestFor: "arrival day",
      },
      {
        name: "Mt. Hood Meadows Mountain Biking",
        type: "mountain-biking",
        duration: "half day",
        pricePerPerson: [50, 90],
        groupFriendly: true,
        highlight:
          "Lift-served mountain biking at the ski resort 35 minutes from town",
        bestFor: "rest day",
        provider: "Mt. Hood Meadows",
      },
      {
        name: "Columbia River Kayaking",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [40, 75],
        groupFriendly: true,
        highlight:
          "Paddle the Columbia with Gorge walls rising on both sides — rentals available at the waterfront",
        bestFor: "morning before golf",
        provider: "Gorge Paddling Center",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [10, 14],
        hourlyRate: [125, 200],
        providers: ["Mt. Hood Limo", "Gorge Shuttle Services"],
        notes:
          "Sprinter vans are the best option for the Fruit Loop and course shuttles. Downtown is walkable so you mainly need transport for wine tours and golf.",
      },
      {
        type: "shuttle",
        capacity: [8, 12],
        hourlyRate: [100, 175],
        providers: ["Columbia Gorge Express", "Martin's Gorge Tours"],
        notes:
          "Shuttle services can handle airport transfers from PDX and local winery tours.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 145],
        providers: ["Take a Chef", "Gorge Private Chef"],
        mealTypes: [
          "Pacific NW salmon dinner",
          "farm-to-table seasonal",
          "BBQ cookout",
          "brunch",
        ],
        notes:
          "Hood River's farm-to-table scene means private chefs have access to incredible local produce, orchard fruits, and Columbia River salmon.",
      },
    ],
  },
];
