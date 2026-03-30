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
      code: "GEG",
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

  // ── Portland, OR ──────────────────────────────────────────────────────
  {
    id: "portland-or",
    city: "Portland",
    state: "OR",
    region: "Pacific NW",
    tagline: "Craft beer capital meets surprisingly great urban golf",
    description:
      "Portland delivers a world-class food and drink scene with more breweries per capita than any US city, plus several quality courses within 30 minutes of downtown. The bar scene is legendary, group lodging options are plentiful, and the non-golf activities rival any PNW destination. Best for groups who want nightlife alongside their golf.",
    population: "medium",
    nearestAirport: {
      code: "PDX",
      name: "Portland International Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Pumpkin Ridge Golf Club (Ghost Creek)",
        tier: "bucket-list",
        greenFeeRange: [150, 250],
        holes: 18,
        par: 71,
        yardage: 6839,
        slope: 140,
        rating: 73.4,
        walkable: true,
        style: "parkland",
        driveMinutes: 30,
        url: "https://www.pumpkinridge.com",
        highlight:
          "Former US Amateur host carved through old-growth forest — PNW golf at its most pristine",
      },
      {
        name: "Reserve Vineyards & Golf Club (South Course)",
        tier: "premium",
        greenFeeRange: [75, 130],
        holes: 18,
        par: 72,
        yardage: 7015,
        slope: 135,
        rating: 73.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.reservegolf.com",
        highlight:
          "John Fought design with tour-quality conditioning and excellent practice facilities",
      },
      {
        name: "Langdon Farms Golf Club",
        tier: "premium",
        greenFeeRange: [65, 110],
        holes: 18,
        par: 71,
        yardage: 6935,
        slope: 130,
        rating: 73.0,
        walkable: true,
        style: "links",
        driveMinutes: 20,
        url: "https://www.langdonfarms.com",
        highlight:
          "Links-style layout with a massive red barn clubhouse and views of Mt. Hood",
      },
      {
        name: "Heron Lakes Golf Club (Great Blue Course)",
        tier: "solid",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 72,
        yardage: 6902,
        slope: 132,
        rating: 73.1,
        walkable: true,
        style: "links",
        driveMinutes: 15,
        url: "https://www.heronlakesgolf.com",
        highlight:
          "Robert Trent Jones II design — best public course value inside Portland city limits",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 18],
        nightlyRange: [500, 1800],
        amenities: [
          "hot tub",
          "large kitchen",
          "game room",
          "fire pit",
          "multiple living areas",
        ],
        areaDescription:
          "Alberta Arts District, Hawthorne, or Southeast — walkable to bars and restaurants",
        searchUrl:
          "https://www.vrbo.com/search?destination=Portland%2C+Oregon&guests=14",
        notes:
          "Portland has excellent large-home inventory. SE Portland offers best walkability to bars; Alberta Arts for more eclectic vibes. Book 2-3 months ahead for summer.",
      },
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [700, 2500],
        amenities: [
          "river views",
          "hot tub",
          "large deck",
          "fire pit",
          "BBQ",
          "parking",
        ],
        areaDescription:
          "West Hills or Lake Oswego — upscale with more space and views",
        searchUrl:
          "https://www.airbnb.com/s/Portland--Oregon/homes?adults=14",
        notes:
          "West Hills homes offer stunning views and more square footage but you'll need cars to get downtown.",
      },
    ],
    dining: [
      {
        name: "Ox Restaurant",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Argentine-inspired wood-fire grill with bone marrow, whole-animal cuts, and an incredible wine list",
        reservationNeeded: true,
      },
      {
        name: "Screen Door",
        style: "southern",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Southern comfort food with a PNW twist — famous for brunch but dinner is the move for groups",
        reservationNeeded: true,
      },
      {
        name: "Andina",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Peruvian fine dining in the Pearl District with a private dining room for groups",
        reservationNeeded: true,
      },
      {
        name: "Lardo",
        style: "casual",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Best sandwiches in Portland — pork-forward menu with craft beer and a big patio",
        reservationNeeded: false,
      },
      {
        name: "Departure Restaurant + Lounge",
        style: "sushi",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Rooftop Asian fusion with panoramic city views — great for a night-one dinner",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Ecliptic Brewing",
        vibe: "brewpub",
        highlight:
          "John Harris (ex-Deschutes brewmaster) makes some of Portland's best beer with a huge patio",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Multnomah Whiskey Library",
        vibe: "whiskey-bar",
        highlight:
          "2,000+ bottle whiskey collection in a jaw-dropping library setting — book the private room",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Loyal Legion",
        vibe: "sports-bar",
        highlight:
          "99 taps of Oregon-only beer with a sausage menu — group-friendly with long communal tables",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Rum Club",
        vibe: "cocktail",
        highlight:
          "Intimate craft cocktail bar with tiki-adjacent drinks and a late-night crowd",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Willamette Valley Wine Tour",
        type: "winery",
        duration: "half day",
        pricePerPerson: [30, 80],
        groupFriendly: true,
        highlight:
          "World-class Pinot Noir 45 minutes from downtown — dozens of tasting rooms in Dundee Hills",
        bestFor: "rest day",
        provider: "Oregon Wine Tours / Pinot Car",
      },
      {
        name: "Portland Brewery Crawl",
        type: "brewery",
        duration: "3-4 hours",
        pricePerPerson: [0, 50],
        groupFriendly: true,
        highlight:
          "60+ breweries in the city — hit Great Notion, Breakside, Wayfinder, and Culmination in one afternoon",
        bestFor: "arrival day",
      },
      {
        name: "Willamette River Jetboat Tour",
        type: "water-sports",
        duration: "2 hours",
        pricePerPerson: [40, 65],
        groupFriendly: true,
        highlight:
          "High-speed jetboat through downtown Portland on the Willamette River",
        bestFor: "rest day",
        provider: "Willamette Jetboat Excursions",
      },
      {
        name: "Portland Axe Throwing",
        type: "axe-throwing",
        duration: "1-2 hours",
        pricePerPerson: [25, 40],
        groupFriendly: true,
        highlight:
          "Multiple venues with group packages — BYOB at some locations",
        bestFor: "arrival day",
        provider: "Blade & Bull / Bad Axe Throwing",
      },
      {
        name: "Columbia River Gorge Hike",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [0, 10],
        groupFriendly: true,
        highlight:
          "Multnomah Falls and dozens of stunning waterfall hikes within 30-45 minutes of the city",
        bestFor: "rest day",
      },
      {
        name: "TopGolf Portland",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "Multi-level driving range with food, drinks, and group bays — great for a competitive warm-up",
        bestFor: "arrival day",
        provider: "TopGolf",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [12, 25],
        hourlyRate: [175, 350],
        providers: ["Portland Party Bus", "Rose City Party Bus"],
        notes:
          "Party buses run brewery crawl and wine tour packages. Downtown is walkable/rideshare-friendly, so buses are mainly for wine country and course shuttles.",
      },
      {
        type: "sprinter-van",
        capacity: [10, 14],
        hourlyRate: [125, 225],
        providers: ["EcoShuttle", "MWT Limo"],
        notes:
          "Sprinter vans are the practical choice for airport transfers and golf course shuttles.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 140],
        providers: ["Take a Chef", "Portland Private Dining", "Cozymeal"],
        mealTypes: [
          "Pacific NW salmon dinner",
          "farm-to-table seasonal",
          "steakhouse night",
          "brunch",
          "BBQ cookout",
        ],
        notes:
          "Portland's chef scene is deep — many options for group dinners featuring local salmon, hazelnuts, and Willamette Valley wines.",
      },
    ],
  },

  // ── Seattle, WA ───────────────────────────────────────────────────────
  {
    id: "seattle-wa",
    city: "Seattle",
    state: "WA",
    region: "Pacific NW",
    tagline: "Emerald City golf with world-class food and drink",
    description:
      "Seattle brings a loaded roster of quality public courses within 30 minutes, an elite food and bar scene, and enough group activities to fill a week. The summer weather is perfect for golf, the seafood is among the best in the country, and the nightlife options are endless. Big-city trips with big-city fun.",
    population: "medium",
    nearestAirport: {
      code: "SEA",
      name: "Seattle-Tacoma International Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Chambers Bay",
        tier: "bucket-list",
        greenFeeRange: [175, 299],
        holes: 18,
        par: 72,
        yardage: 7585,
        slope: 142,
        rating: 76.7,
        walkable: true,
        style: "links",
        driveMinutes: 40,
        url: "https://www.chambersbaygolf.com",
        highlight:
          "2015 US Open venue — walking-only links carved from a gravel quarry on Puget Sound",
      },
      {
        name: "The Home Course",
        tier: "solid",
        greenFeeRange: [40, 75],
        holes: 18,
        par: 72,
        yardage: 7209,
        slope: 132,
        rating: 74.7,
        walkable: true,
        style: "links",
        driveMinutes: 45,
        url: "https://www.thehomecourse.com",
        highlight:
          "Stunning links-style muni near Chambers Bay — best value in Washington state golf",
      },
      {
        name: "Washington National Golf Club",
        tier: "premium",
        greenFeeRange: [80, 150],
        holes: 18,
        par: 72,
        yardage: 7304,
        slope: 138,
        rating: 75.6,
        walkable: true,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.washingtonnational.com",
        highlight:
          "John Fought design with views of Mt. Rainier from nearly every hole",
      },
      {
        name: "Newcastle Golf Club (Coal Creek Course)",
        tier: "premium",
        greenFeeRange: [65, 120],
        holes: 18,
        par: 72,
        yardage: 6610,
        slope: 134,
        rating: 72.2,
        walkable: false,
        style: "mountain",
        driveMinutes: 20,
        url: "https://www.newcastlegolf.com",
        highlight:
          "Perched above Lake Washington with panoramic views of the Seattle skyline and Cascades",
      },
      {
        name: "Trophy Lake Golf & Casting Club",
        tier: "solid",
        greenFeeRange: [45, 85],
        holes: 18,
        par: 72,
        yardage: 7206,
        slope: 131,
        rating: 74.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 50,
        url: "https://www.trophylakegolf.com",
        highlight:
          "Hidden gem on the Kitsap Peninsula with a fly-fishing pond and excellent conditioning",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 18],
        nightlyRange: [600, 2200],
        amenities: [
          "water views",
          "hot tub",
          "large kitchen",
          "game room",
          "fire pit",
          "multiple bedrooms",
        ],
        areaDescription:
          "Capitol Hill, Ballard, or Fremont — walkable neighborhoods with bars and restaurants",
        searchUrl:
          "https://www.vrbo.com/search?destination=Seattle%2C+Washington&guests=14",
        notes:
          "Seattle's hilly terrain means many homes have water or mountain views. Ballard is best for brewery access; Capitol Hill for nightlife. Book 3+ months ahead in summer.",
      },
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [800, 3000],
        amenities: [
          "Puget Sound views",
          "private dock",
          "hot tub",
          "large deck",
          "fire pit",
          "BBQ",
        ],
        areaDescription:
          "West Seattle or Bainbridge Island — waterfront with more space",
        searchUrl:
          "https://www.airbnb.com/s/Seattle--Washington/homes?adults=14",
        notes:
          "Waterfront homes offer incredible views but are farther from nightlife. West Seattle is a good compromise.",
      },
    ],
    dining: [
      {
        name: "El Gaucho",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Iconic Seattle steakhouse with tableside prep, private rooms, and a retro supper-club vibe",
        reservationNeeded: true,
      },
      {
        name: "Taylor Shellfish Oyster Bar",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Farm-direct oysters and Pacific NW shellfish — multiple locations, Capitol Hill is best for groups",
        reservationNeeded: false,
      },
      {
        name: "Fremont Brewing Beer Garden",
        style: "brewpub",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Huge outdoor beer garden with some of the best IPAs in the Pacific NW — bring your own food",
        reservationNeeded: false,
      },
      {
        name: "Walrus and the Carpenter",
        style: "seafood",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Acclaimed raw bar in Ballard with pristine oysters and inventive small plates",
        reservationNeeded: true,
      },
      {
        name: "Biscuit Bitch",
        style: "southern",
        priceRange: "$",
        capacity: "medium",
        highlight:
          "Irreverent Southern-style biscuit sandwiches — the move for a group hangover brunch",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Canon",
        vibe: "whiskey-bar",
        highlight:
          "4,000+ bottles of whiskey and spirits — regularly named one of America's best bars",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Rhein Haus",
        vibe: "sports-bar",
        highlight:
          "German beer hall with indoor bocce courts, giant pretzels, and boot-shaped beer glasses",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Optimism Brewing",
        vibe: "brewpub",
        highlight:
          "Massive open taproom with board games, rotating food trucks, and a great patio",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Flatstick Pub",
        vibe: "sports-bar",
        highlight:
          "Indoor mini golf and duffleboard with local craft beer — built for groups",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Pike Place Market Tour",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [0, 30],
        groupFriendly: true,
        highlight:
          "Iconic market with the original Starbucks, fish throwing, and endless food stalls",
        bestFor: "arrival day",
      },
      {
        name: "Seattle Brewery Crawl (Ballard)",
        type: "brewery",
        duration: "3-4 hours",
        pricePerPerson: [0, 60],
        groupFriendly: true,
        highlight:
          "Ballard has 15+ breweries in walking distance — Stoup, Reuben's, and Lucky Envelope are musts",
        bestFor: "rest day",
      },
      {
        name: "Puget Sound Fishing Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [150, 250],
        groupFriendly: true,
        highlight:
          "Salmon fishing on the Sound with Mt. Rainier and the Olympic Mountains as your backdrop",
        bestFor: "rest day",
        provider: "All Star Fishing Charters",
      },
      {
        name: "Seattle Axe Throwing",
        type: "axe-throwing",
        duration: "1-2 hours",
        pricePerPerson: [25, 45],
        groupFriendly: true,
        highlight:
          "Multiple venues with group competitions and BYOB options",
        bestFor: "arrival day",
        provider: "Blade & Bull / Axe & Grind",
      },
      {
        name: "Kayaking on Lake Union",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [25, 50],
        groupFriendly: true,
        highlight:
          "Paddle past houseboats (including the Sleepless in Seattle house) with the city skyline behind you",
        bestFor: "morning before golf",
        provider: "Northwest Outdoor Center / Moss Bay",
      },
      {
        name: "Woodinville Wine Country Tour",
        type: "winery",
        duration: "half day",
        pricePerPerson: [20, 60],
        groupFriendly: true,
        highlight:
          "100+ tasting rooms 30 minutes from Seattle — Chateau Ste. Michelle, Mark Ryan, DeLille",
        bestFor: "rest day",
        provider: "Bon Vivant Tours",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 28],
        hourlyRate: [200, 400],
        providers: ["Seattle Party Bus", "Emerald City Party Bus"],
        notes:
          "Party buses are great for Woodinville wine tours and brewery crawls. Downtown/Capitol Hill is walkable and rideshare-friendly.",
      },
      {
        type: "sprinter-van",
        capacity: [10, 14],
        hourlyRate: [150, 250],
        providers: ["Shuttle Express", "Seattle Limo Bus"],
        notes:
          "Sprinters work best for airport transfers and golf course shuttles to Chambers Bay.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 155],
        providers: ["Take a Chef", "Cozymeal", "Seattle Private Chef"],
        mealTypes: [
          "Pacific NW salmon dinner",
          "Dungeness crab feast",
          "farm-to-table seasonal",
          "steakhouse night",
          "brunch",
        ],
        notes:
          "Seattle's chef pool is deep. Expect fresh Copper River salmon, Dungeness crab, and Penn Cove mussels featured heavily.",
      },
    ],
  },

  // ── Spokane, WA ───────────────────────────────────────────────────────
  {
    id: "spokane-wa",
    city: "Spokane",
    state: "WA",
    region: "Pacific NW",
    tagline: "Affordable Inland NW golf with a punchy downtown bar scene",
    description:
      "Spokane is the best-value golf trip in the Pacific NW with multiple quality courses under $80 and a surprisingly strong downtown bar and dining scene along the Spokane River. Riverfront Park anchors the city, the craft beer scene punches above its weight, and lodging costs are a fraction of Seattle or Portland.",
    population: "medium",
    nearestAirport: {
      code: "GEG",
      name: "Spokane International Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Circling Raven Golf Club",
        tier: "bucket-list",
        greenFeeRange: [100, 175],
        holes: 18,
        par: 72,
        yardage: 7189,
        slope: 140,
        rating: 74.9,
        walkable: true,
        style: "parkland",
        driveMinutes: 35,
        url: "https://www.circlingraven.com",
        highlight:
          "Gene Bates design through Coeur d'Alene tribal land — consistently rated top public course in Idaho",
      },
      {
        name: "Indian Canyon Golf Course",
        tier: "solid",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 72,
        yardage: 6255,
        slope: 123,
        rating: 69.7,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.spokanecity.org/indian-canyon",
        highlight:
          "Historic muni perched on a basalt canyon rim — routinely named one of the best municipal courses in America",
      },
      {
        name: "The Creek at Qualchan Golf Course",
        tier: "solid",
        greenFeeRange: [30, 50],
        holes: 18,
        par: 72,
        yardage: 6586,
        slope: 127,
        rating: 71.3,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.spokanecity.org/qualchan",
        highlight:
          "Best-conditioned Spokane muni with Latah Creek winding through the layout",
      },
      {
        name: "MeadowWood Golf Course",
        tier: "solid",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 72,
        yardage: 6874,
        slope: 124,
        rating: 72.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.meadowwoodgolf.com",
        highlight:
          "Robert Muir Graves design in Liberty Lake — long, well-maintained, and affordable",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [350, 1200],
        amenities: [
          "hot tub",
          "large kitchen",
          "fire pit",
          "BBQ",
          "game room",
        ],
        areaDescription:
          "South Hill or Browne's Addition — close to downtown with good restaurants nearby",
        searchUrl:
          "https://www.vrbo.com/search?destination=Spokane%2C+Washington&guests=14",
        notes:
          "Spokane lodging is excellent value. South Hill has the nicest homes; Browne's Addition is walkable to downtown. Book 2 months ahead for summer.",
      },
      {
        type: "house",
        sleeps: [10, 18],
        nightlyRange: [400, 1500],
        amenities: [
          "lake access",
          "hot tub",
          "fire pit",
          "dock",
          "large deck",
        ],
        areaDescription:
          "Liberty Lake or Newman Lake — 15-20 minutes east with waterfront options",
        searchUrl:
          "https://www.airbnb.com/s/Spokane--Washington/homes?adults=14",
        notes:
          "Lake properties offer a resort feel at a fraction of Coeur d'Alene pricing. Great if you want water activities between rounds.",
      },
    ],
    dining: [
      {
        name: "Churchill's Steakhouse",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Classic white-tablecloth steakhouse with a cigar lounge — Spokane's best for a group dinner",
        reservationNeeded: true,
      },
      {
        name: "Clinkerdagger",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Riverside fine dining with panoramic Spokane Falls views from every table",
        reservationNeeded: true,
      },
      {
        name: "No-Li Brewhouse",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Spokane's flagship brewery right on the river with a huge outdoor deck and solid pub food",
        reservationNeeded: false,
      },
      {
        name: "Ruins",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "New American small plates in a beautifully restored building — Spokane's best dinner",
        reservationNeeded: true,
      },
      {
        name: "Frank's Diner",
        style: "casual",
        priceRange: "$",
        capacity: "medium",
        highlight:
          "Breakfast in a converted 1906 rail car — massive portions and a Spokane institution",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Maryhill Winery Tasting Room",
        vibe: "patio",
        highlight:
          "Downtown tasting room with an expansive patio and excellent Washington wines",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Viking Bar",
        vibe: "dive",
        highlight:
          "Legendary Spokane dive with cheap drinks, pool tables, and zero pretension",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Hogwash Whiskey Den",
        vibe: "whiskey-bar",
        highlight:
          "Speakeasy-style whiskey bar hidden in an alley — craft cocktails and a great vibe",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Iron Goat Brewing",
        vibe: "brewpub",
        highlight:
          "Award-winning small-batch brewery with a chill taproom atmosphere",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Spokane River Float",
        type: "water-sports",
        duration: "2-3 hours",
        pricePerPerson: [10, 30],
        groupFriendly: true,
        highlight:
          "Lazy river float through downtown Spokane — rent tubes and drift past Riverfront Park",
        bestFor: "rest day",
        provider: "REI Co-op / local outfitters",
      },
      {
        name: "Spokane Brewery Crawl",
        type: "brewery",
        duration: "3-4 hours",
        pricePerPerson: [0, 50],
        groupFriendly: true,
        highlight:
          "No-Li, Iron Goat, Lumberbeard, Perry Street — all walkable or a short rideshare apart",
        bestFor: "arrival day",
      },
      {
        name: "Coeur d'Alene Casino",
        type: "casino",
        duration: "3-4 hours",
        pricePerPerson: [0, 100],
        groupFriendly: true,
        highlight:
          "Full casino with tables, slots, and restaurants — 30 minutes from downtown Spokane",
        bestFor: "arrival day",
        provider: "Coeur d'Alene Casino Resort",
      },
      {
        name: "Silverwood Theme Park",
        type: "go-karts",
        duration: "full day",
        pricePerPerson: [55, 75],
        groupFriendly: true,
        highlight:
          "Northwest's largest theme park with roller coasters and a water park — 45 minutes north",
        bestFor: "rest day",
        provider: "Silverwood Theme Park",
      },
      {
        name: "Riverside State Park Hiking",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 10],
        groupFriendly: true,
        highlight:
          "Bowl & Pitcher suspension bridge and basalt rock formations along the Spokane River",
        bestFor: "morning before golf",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [12, 22],
        hourlyRate: [150, 300],
        providers: ["Spokane Party Bus", "VIP Limo Spokane"],
        notes:
          "Party buses work well for the casino trip and brewery crawl. Downtown is compact and walkable.",
      },
      {
        type: "shuttle",
        capacity: [10, 14],
        hourlyRate: [100, 175],
        providers: ["Arrow Shuttle", "Wheatland Express"],
        notes:
          "Shuttles handle airport transfers and course shuttles to Circling Raven.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [55, 120],
        providers: ["Take a Chef", "Cozymeal"],
        mealTypes: [
          "steakhouse night",
          "BBQ cookout",
          "brunch",
          "Pacific NW seasonal",
        ],
        notes:
          "Smaller chef market than Seattle/Portland but solid options available. Local ingredients include huckleberries, wild game, and Columbia Basin produce.",
      },
    ],
  },

  // ── Sun Valley / Ketchum, ID ──────────────────────────────────────────
  {
    id: "sun-valley-id",
    city: "Sun Valley / Ketchum",
    state: "ID",
    region: "Pacific NW",
    tagline: "Mountain resort golf at Idaho's most iconic destination",
    description:
      "Sun Valley combines world-class mountain resort golf with a walkable, upscale village in Ketchum. The courses are stunning, the scenery is jaw-dropping, and the après-golf scene in Ketchum punches well above what you'd expect for a town this size. Premium trip for groups who want scenery and quality over budget.",
    population: "tiny",
    nearestAirport: {
      code: "SUN",
      name: "Friedman Memorial Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Sun Valley Resort (Trail Creek Course)",
        tier: "premium",
        greenFeeRange: [100, 175],
        holes: 18,
        par: 72,
        yardage: 6932,
        slope: 131,
        rating: 72.3,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.sunvalley.com/golf",
        highlight:
          "Robert Trent Jones Jr. design winding through aspens and cottonwoods with Baldy Mountain views",
      },
      {
        name: "Sun Valley Resort (White Clouds Course)",
        tier: "solid",
        greenFeeRange: [70, 120],
        holes: 18,
        par: 72,
        yardage: 6503,
        slope: 122,
        rating: 70.0,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.sunvalley.com/golf",
        highlight:
          "More forgiving resort course with wide fairways and the same stunning mountain backdrop",
      },
      {
        name: "Bigwood Golf Course",
        tier: "solid",
        greenFeeRange: [55, 95],
        holes: 18,
        par: 71,
        yardage: 6488,
        slope: 125,
        rating: 70.5,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.bigwoodgolf.com",
        highlight:
          "Tight mountain course right in Ketchum — beautiful but bring your A game off the tee",
      },
    ],
    lodging: [
      {
        type: "lodge",
        sleeps: [10, 16],
        nightlyRange: [600, 2500],
        amenities: [
          "mountain views",
          "hot tub",
          "fire pit",
          "large kitchen",
          "ski-in/ski-out (winter)",
        ],
        areaDescription:
          "Ketchum village or Warm Springs — walkable to restaurants and bars",
        searchUrl:
          "https://www.vrbo.com/search?destination=Ketchum%2C+Idaho&guests=14",
        notes:
          "Ketchum lodges are pricey but high quality. Summer rates are significantly lower than ski season. Book 2+ months ahead.",
      },
      {
        type: "house",
        sleeps: [10, 18],
        nightlyRange: [500, 2200],
        amenities: [
          "mountain views",
          "hot tub",
          "game room",
          "large deck",
          "BBQ",
        ],
        areaDescription:
          "Hailey or Bellevue — 10-15 minutes south with more space and lower prices",
        searchUrl:
          "https://www.airbnb.com/s/Sun-Valley--Idaho/homes?adults=14",
        notes:
          "Hailey offers better value and larger homes. You'll need cars but the drive to Ketchum is easy and scenic.",
      },
    ],
    dining: [
      {
        name: "The Kneadery",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Ketchum breakfast institution — enormous portions and a group-friendly patio",
        reservationNeeded: false,
      },
      {
        name: "Enoteca",
        style: "italian",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Upscale Italian with a phenomenal wine list in a cozy Ketchum setting",
        reservationNeeded: true,
      },
      {
        name: "The Cellar Pub",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Bustling underground pub with burgers, beer, and a lively group-friendly atmosphere",
        reservationNeeded: false,
      },
      {
        name: "Globus",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "New American fine dining in a converted church — Sun Valley's best splurge dinner",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Sawtooth Brewery Tap Room",
        vibe: "brewpub",
        highlight:
          "Ketchum's own craft brewery with a rotating tap list and relaxed mountain-town vibe",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Whiskey Jacques'",
        vibe: "saloon",
        highlight:
          "Legendary Ketchum dive open since 1957 — live music, strong pours, and ski-town energy year-round",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Casino Bar",
        vibe: "dive",
        highlight:
          "Cash-only classic bar with cheap drinks, pool, and a no-frills atmosphere",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Big Wood River Fly Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [200, 350],
        groupFriendly: true,
        highlight:
          "World-class trout fishing on the Big Wood and Silver Creek with mountain scenery",
        bestFor: "rest day",
        provider: "Silver Creek Outfitters / Lost River Outfitters",
      },
      {
        name: "Sun Valley Mountain Biking",
        type: "mountain-biking",
        duration: "half day",
        pricePerPerson: [50, 90],
        groupFriendly: true,
        highlight:
          "Lift-served trails on Baldy and miles of singletrack in the surrounding mountains",
        bestFor: "rest day",
        provider: "Sun Valley Resort",
      },
      {
        name: "Sawtooth Scenic Byway Drive",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [0, 10],
        groupFriendly: true,
        highlight:
          "One of the most scenic drives in America through the Sawtooth Range with hot springs and alpine lakes",
        bestFor: "rest day",
      },
      {
        name: "Sun Valley Shooting Range",
        type: "shooting",
        duration: "2-3 hours",
        pricePerPerson: [40, 80],
        groupFriendly: true,
        highlight:
          "Sporting clays and trap shooting with mountain views",
        bestFor: "morning before golf",
        provider: "Sun Valley Gun Club",
      },
      {
        name: "White Water Rafting (Salmon River)",
        type: "rafting",
        duration: "full day",
        pricePerPerson: [100, 175],
        groupFriendly: true,
        highlight:
          "Class III-IV rapids on the Salmon River — about 60 minutes north but absolutely worth the drive",
        bestFor: "rest day",
        provider: "Sawtooth Adventure Company",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [10, 14],
        hourlyRate: [150, 250],
        providers: ["Sun Valley Limo", "Mountain Rides"],
        notes:
          "Ketchum is walkable for bars and restaurants. Sprinters are mainly for airport transfers and course shuttles.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [80, 175],
        providers: ["Take a Chef", "Sun Valley Private Chefs"],
        mealTypes: [
          "elk/bison dinner",
          "steakhouse night",
          "BBQ cookout",
          "brunch",
        ],
        notes:
          "Sun Valley attracts high-end culinary talent. Expect premium pricing but excellent quality with local game, trout, and seasonal produce.",
      },
    ],
  },

  // ── Sandpoint, ID ─────────────────────────────────────────────────────
  {
    id: "sandpoint-id",
    city: "Sandpoint",
    state: "ID",
    region: "Pacific NW",
    tagline: "Lake Pend Oreille vibes with mountain golf and small-town charm",
    description:
      "Sandpoint sits on the shore of massive Lake Pend Oreille with the Selkirk Mountains rising behind it. The golf is solid, the lake activities are incredible, and the walkable downtown has a surprisingly good bar and restaurant scene for a town of 9,000. It's Coeur d'Alene's cooler, less-discovered neighbor.",
    population: "tiny",
    nearestAirport: {
      code: "GEG",
      name: "Spokane Felts Field / GEG (Spokane International)",
      driveMinutes: 80,
    },
    bestSeasons: ["summer"],
    courses: [
      {
        name: "The Idaho Club",
        tier: "premium",
        greenFeeRange: [100, 175],
        holes: 18,
        par: 72,
        yardage: 7069,
        slope: 136,
        rating: 73.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.theidahoclub.com",
        highlight:
          "Jack Nicklaus design through towering pines with views of Lake Pend Oreille and the Cabinet Mountains",
      },
      {
        name: "Elks Golf Course",
        tier: "budget",
        greenFeeRange: [25, 45],
        holes: 9,
        par: 34,
        yardage: 2800,
        slope: 110,
        rating: 65.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        highlight:
          "Charming 9-hole walking course right in Sandpoint — play it twice for a fun casual 18",
      },
      {
        name: "Hidden Lakes Golf Resort",
        tier: "solid",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 71,
        yardage: 6561,
        slope: 126,
        rating: 70.7,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.hiddenlakesgolf.com",
        highlight:
          "Well-kept resort course with mountain views and a relaxed pace of play",
      },
      {
        name: "Priest Lake Golf Course",
        tier: "budget",
        greenFeeRange: [30, 50],
        holes: 18,
        par: 71,
        yardage: 5968,
        slope: 117,
        rating: 67.5,
        walkable: true,
        style: "mountain",
        driveMinutes: 45,
        highlight:
          "Scenic mountain course near Priest Lake — worth the drive for the setting alone",
      },
    ],
    lodging: [
      {
        type: "lakehouse",
        sleeps: [10, 16],
        nightlyRange: [500, 2000],
        amenities: [
          "lake access",
          "private dock",
          "hot tub",
          "fire pit",
          "kayaks",
          "large deck",
        ],
        areaDescription:
          "Lake Pend Oreille waterfront — Sagle or Hope side for best value",
        searchUrl:
          "https://www.vrbo.com/search?destination=Sandpoint%2C+Idaho&guests=14",
        notes:
          "Lakefront homes are the move here. Some include boats and kayaks. Book 3+ months ahead for summer — inventory is limited.",
      },
      {
        type: "cabin",
        sleeps: [10, 14],
        nightlyRange: [350, 1200],
        amenities: [
          "mountain views",
          "hot tub",
          "fire pit",
          "BBQ",
          "large kitchen",
        ],
        areaDescription:
          "Schweitzer Mountain area or Pack River — 15-20 minutes from downtown",
        searchUrl:
          "https://www.airbnb.com/s/Sandpoint--Idaho/homes?adults=14",
        notes:
          "Mountain cabins are more affordable than lakefront and offer great views. You'll need cars.",
      },
    ],
    dining: [
      {
        name: "Trinity at City Beach",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Lakefront fine dining with a huge patio overlooking City Beach and the Selkirks",
        reservationNeeded: true,
      },
      {
        name: "Ivano's Ristorante",
        style: "italian",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Authentic Italian in a cozy downtown space — Sandpoint's best dinner date spot",
        reservationNeeded: true,
      },
      {
        name: "MickDuff's Brewing Company",
        style: "brewpub",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Sandpoint's flagship brewery with solid pub food and a group-friendly beer garden",
        reservationNeeded: false,
      },
      {
        name: "Pend d'Oreille Winery",
        style: "farm-to-table",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Local wines with small plates in a charming downtown tasting room",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "MickDuff's Beer Hall",
        vibe: "brewpub",
        highlight:
          "Second MickDuff's location with a bigger beer hall vibe and outdoor seating",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Eichardt's Pub",
        vibe: "dive",
        highlight:
          "Sandpoint institution since 1987 — live music, strong drinks, and a late-night crowd",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The 219 Lounge",
        vibe: "cocktail",
        highlight:
          "Upscale cocktail bar with a speakeasy feel — the nicest drink in Sandpoint",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Lake Pend Oreille Boat Day",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [50, 100],
        groupFriendly: true,
        highlight:
          "Rent a pontoon or ski boat on Idaho's largest lake — crystal-clear water with mountain views on all sides",
        bestFor: "rest day",
        provider: "Action Water Sports Sandpoint",
      },
      {
        name: "Schweitzer Mountain Hiking",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [0, 20],
        groupFriendly: true,
        highlight:
          "Chairlift-accessible alpine hiking with panoramic views of the lake and three states",
        bestFor: "rest day",
        provider: "Schweitzer Mountain Resort",
      },
      {
        name: "Sandpoint Brewery Crawl",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [0, 40],
        groupFriendly: true,
        highlight:
          "MickDuff's, Laughing Dog, Utara — small-town brewery scene that's walkable and fun",
        bestFor: "arrival day",
      },
      {
        name: "Lake Pend Oreille Kayaking",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "Paddle the crystal-clear lake with mountain views and sandy beach stops",
        bestFor: "morning before golf",
        provider: "Outdoor Experience Sandpoint",
      },
      {
        name: "Fly Fishing (Clark Fork River)",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [150, 275],
        groupFriendly: true,
        highlight:
          "Trophy trout fishing on the Clark Fork or Pack River with licensed guides",
        bestFor: "rest day",
        provider: "Sandpoint Fly Fishing Guides",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [10, 14],
        hourlyRate: [125, 225],
        providers: ["Sandpoint Shuttle", "Selkirk Limo"],
        notes:
          "Downtown is walkable. Sprinters needed for airport transfers from Spokane (80 min) and golf course shuttles.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 140],
        providers: ["Take a Chef", "Sandpoint Private Dining"],
        mealTypes: [
          "lakeside BBQ cookout",
          "steakhouse night",
          "brunch",
          "fresh trout dinner",
        ],
        notes:
          "Smaller chef market but lakefront home dinners are the highlight. Fresh trout and local produce available.",
      },
    ],
  },

  // ── Walla Walla, WA ──────────────────────────────────────────────────
  {
    id: "walla-walla-wa",
    city: "Walla Walla",
    state: "WA",
    region: "Pacific NW",
    tagline: "Wine country golf in Washington's best-kept secret",
    description:
      "Walla Walla is Washington's premier wine destination with 120+ wineries, a charming walkable downtown, and solid golf options. The trip is more wine-and-dine than pure golf, but the courses are good and the tasting room crawl is genuinely world-class. Excellent for groups who want a more refined, less rowdy trip.",
    population: "small",
    nearestAirport: {
      code: "ALW",
      name: "Walla Walla Regional Airport",
      driveMinutes: 5,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Wine Valley Golf Club",
        tier: "premium",
        greenFeeRange: [70, 125],
        holes: 18,
        par: 72,
        yardage: 7360,
        slope: 137,
        rating: 75.3,
        walkable: true,
        style: "links",
        driveMinutes: 5,
        url: "https://www.winevalleygolfclub.com",
        highlight:
          "Dan Hixson links design through rolling wheat fields — one of the best public courses in Washington",
      },
      {
        name: "Veterans Memorial Golf Course",
        tier: "solid",
        greenFeeRange: [30, 50],
        holes: 18,
        par: 72,
        yardage: 6641,
        slope: 122,
        rating: 70.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.wallawallawa.gov/veterans-memorial-golf",
        highlight:
          "Well-maintained muni with mature trees and Blue Mountain views — great value for the money",
      },
      {
        name: "Walla Walla Country Club",
        tier: "solid",
        greenFeeRange: [50, 85],
        holes: 18,
        par: 72,
        yardage: 6439,
        slope: 120,
        rating: 70.1,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        highlight:
          "Semi-private course that welcomes outside play — classic parkland layout in wine country",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [400, 1400],
        amenities: [
          "hot tub",
          "large kitchen",
          "fire pit",
          "BBQ",
          "wine cellar",
          "patio",
        ],
        areaDescription:
          "Downtown or South Walla Walla — walkable to tasting rooms and restaurants",
        searchUrl:
          "https://www.vrbo.com/search?destination=Walla+Walla%2C+Washington&guests=14",
        notes:
          "Downtown homes put you walking distance to 30+ tasting rooms. Book 2-3 months ahead for harvest season (Sept-Oct).",
      },
      {
        type: "house",
        sleeps: [10, 14],
        nightlyRange: [350, 1100],
        amenities: [
          "vineyard views",
          "hot tub",
          "fire pit",
          "large deck",
          "BBQ",
        ],
        areaDescription:
          "Southside vineyards — surrounded by wineries, 10 minutes from downtown",
        searchUrl:
          "https://www.airbnb.com/s/Walla-Walla--Washington/homes?adults=14",
        notes:
          "Vineyard properties offer incredible scenery. You'll need cars but the wineries are right next door.",
      },
    ],
    dining: [
      {
        name: "Whitehouse-Crawford",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Pacific NW fine dining in a converted planing mill — the best dinner in Walla Walla with a world-class wine list",
        reservationNeeded: true,
      },
      {
        name: "Saffron Mediterranean Kitchen",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Mediterranean small plates with an emphasis on local ingredients and Washington wines",
        reservationNeeded: true,
      },
      {
        name: "Brasserie Four",
        style: "farm-to-table",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "French-inspired bistro with a great wine program and group-friendly atmosphere",
        reservationNeeded: true,
      },
      {
        name: "T Maccarone's",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Beloved Italian spot with housemade pasta and a lively vibe — Walla Walla staple",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Downtown Walla Walla Wine Walk",
        vibe: "patio",
        highlight:
          "30+ tasting rooms within walking distance downtown — the best wine crawl in Washington",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Green Lantern",
        vibe: "dive",
        highlight:
          "Cash bar with karaoke, pool, and zero pretension — the counterweight to all the wine tasting",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Quirk Brewing",
        vibe: "brewpub",
        highlight:
          "Craft beer alternative to wine with a relaxed taproom and outdoor seating",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Walla Walla Wine Tasting Tour",
        type: "winery",
        duration: "half day",
        pricePerPerson: [20, 75],
        groupFriendly: true,
        highlight:
          "120+ wineries producing world-class Syrah, Cab, and Merlot — walkable downtown or drive the southside vineyards",
        bestFor: "rest day",
        provider: "Blue Stocking Tours / self-guided",
      },
      {
        name: "Hot Air Balloon Ride",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [200, 300],
        groupFriendly: false,
        highlight:
          "Sunrise balloon flights over the Blue Mountains and vineyard-covered valley",
        bestFor: "rest day",
        provider: "Vista Balloon Adventures",
      },
      {
        name: "Blue Mountains Hiking",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [0, 10],
        groupFriendly: true,
        highlight:
          "Trails into the Blue Mountains with old-growth forest and wildflower meadows",
        bestFor: "morning before golf",
      },
      {
        name: "Walla Walla Distillery Tours",
        type: "distillery",
        duration: "2-3 hours",
        pricePerPerson: [15, 40],
        groupFriendly: true,
        highlight:
          "Small-batch whiskey and gin distilleries popping up alongside the wineries",
        bestFor: "arrival day",
      },
      {
        name: "Fort Walla Walla Museum",
        type: "hiking",
        duration: "1-2 hours",
        pricePerPerson: [10, 15],
        groupFriendly: true,
        highlight:
          "Pioneer history museum with 17 historic buildings and a 33-mule-team exhibit",
        bestFor: "arrival day",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [10, 14],
        hourlyRate: [125, 225],
        providers: ["Blue Stocking Tours", "Walla Walla Wine Tours"],
        notes:
          "Wine tour vans are the primary transport option. Downtown is walkable for tasting rooms and restaurants.",
      },
      {
        type: "shuttle",
        capacity: [8, 12],
        hourlyRate: [100, 175],
        providers: ["Valley Transit", "Walla Walla Shuttle"],
        notes:
          "Shuttles handle airport transfers and vineyard tours on the southside.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 150],
        providers: ["Take a Chef", "Walla Walla Private Chef"],
        mealTypes: [
          "wine-paired dinner",
          "farm-to-table seasonal",
          "BBQ cookout",
          "brunch",
        ],
        notes:
          "Wine-paired dinners are the signature move here. Local chefs can source from farms and vineyards minutes away.",
      },
    ],
  },

  // ── Eugene, OR ────────────────────────────────────────────────────────
  {
    id: "eugene-or",
    city: "Eugene",
    state: "OR",
    region: "Pacific NW",
    tagline: "College-town energy with sneaky good Willamette Valley golf",
    description:
      "Eugene delivers affordable, quality golf in the Willamette Valley alongside a strong craft beer and dining scene fueled by University of Oregon culture. The courses are well-maintained and reasonably priced, the bar scene goes late, and the proximity to wine country and outdoor activities makes for a well-rounded trip at a fraction of Portland prices.",
    population: "medium",
    nearestAirport: {
      code: "EUG",
      name: "Eugene Airport (Mahlon Sweet Field)",
      driveMinutes: 15,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Tokatee Golf Club",
        tier: "premium",
        greenFeeRange: [55, 85],
        holes: 18,
        par: 72,
        yardage: 6845,
        slope: 130,
        rating: 72.5,
        walkable: true,
        style: "mountain",
        driveMinutes: 50,
        url: "https://www.tokatee.com",
        highlight:
          "Stunning McKenzie River Valley course with Cascade Mountain views — regularly rated top public course in Oregon",
      },
      {
        name: "Shadow Hills Country Club",
        tier: "solid",
        greenFeeRange: [40, 65],
        holes: 18,
        par: 72,
        yardage: 6339,
        slope: 124,
        rating: 70.2,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.shadowhillscc.com",
        highlight:
          "Semi-private club welcoming outside play with well-conditioned fairways and reasonable rates",
      },
      {
        name: "Emerald Valley Golf Club",
        tier: "solid",
        greenFeeRange: [35, 60],
        holes: 18,
        par: 72,
        yardage: 6811,
        slope: 128,
        rating: 72.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.emeraldvalleygolf.com",
        highlight:
          "Mature parkland layout with excellent conditioning and views of the Coast Range foothills",
      },
      {
        name: "Fiddler's Green Golf Course",
        tier: "budget",
        greenFeeRange: [25, 45],
        holes: 18,
        par: 72,
        yardage: 6507,
        slope: 119,
        rating: 69.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        highlight:
          "Best bang-for-buck in Eugene with a driving range and a relaxed pace",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [350, 1200],
        amenities: [
          "hot tub",
          "large kitchen",
          "fire pit",
          "BBQ",
          "game room",
        ],
        areaDescription:
          "South Eugene or Friendly Street area — close to campus and restaurants",
        searchUrl:
          "https://www.vrbo.com/search?destination=Eugene%2C+Oregon&guests=14",
        notes:
          "Excellent value compared to Portland or Bend. Avoid booking during UO football weekends (fall) when prices spike and inventory disappears.",
      },
      {
        type: "cabin",
        sleeps: [10, 14],
        nightlyRange: [300, 1000],
        amenities: [
          "river access",
          "hot tub",
          "fire pit",
          "large deck",
          "BBQ",
        ],
        areaDescription:
          "McKenzie River corridor — 30-40 minutes east on the way to Tokatee",
        searchUrl:
          "https://www.airbnb.com/s/Eugene--Oregon/homes?adults=14",
        notes:
          "McKenzie River cabins offer incredible scenery and proximity to Tokatee. Worth the drive for groups who want a mountain-cabin feel.",
      },
    ],
    dining: [
      {
        name: "Beppe & Gianni's Trattoria",
        style: "italian",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Eugene's best Italian with housemade pasta and a great wine list",
        reservationNeeded: true,
      },
      {
        name: "Ninkasi Better Living Room",
        style: "brewpub",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Ninkasi's tasting room with the full lineup of their beers and a big outdoor patio",
        reservationNeeded: false,
      },
      {
        name: "Marche",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "French-inspired farm-to-table in the Fifth Street Market — Eugene's finest with a private dining room",
        reservationNeeded: true,
      },
      {
        name: "The Wheel Apizza Pub",
        style: "casual",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "New Haven-style pizza with craft beer in a group-friendly industrial space",
        reservationNeeded: false,
      },
      {
        name: "Party Downtown",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Texas-style BBQ with brisket, ribs, and a solid beer selection in a fun atmosphere",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Falling Sky Brewing",
        vibe: "brewpub",
        highlight:
          "Award-winning brewery with creative seasonal beers and a lively patio",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Horsehead Bar",
        vibe: "dive",
        highlight:
          "Legendary Eugene dive — cheap drinks, taxidermy decor, and the spot where everyone ends up at midnight",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Starlight Lounge",
        vibe: "cocktail",
        highlight:
          "Craft cocktails and dim lighting in Eugene's best upscale bar — cocktail menu rotates seasonally",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Oakshire Brewing Public House",
        vibe: "brewpub",
        highlight:
          "Excellent IPAs and sours in a spacious Whiteaker neighborhood taproom",
        lateNight: false,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "McKenzie River Trail Hike",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [0, 10],
        groupFriendly: true,
        highlight:
          "World-famous trail through old-growth forest along a crystal-clear volcanic river",
        bestFor: "rest day",
      },
      {
        name: "Willamette Valley Wine Tour (South)",
        type: "winery",
        duration: "half day",
        pricePerPerson: [20, 60],
        groupFriendly: true,
        highlight:
          "Southern Willamette Valley Pinot Noir tasting rooms — less crowded than Dundee Hills",
        bestFor: "rest day",
        provider: "Oregon Wine Tours",
      },
      {
        name: "Eugene Brewery Crawl",
        type: "brewery",
        duration: "3-4 hours",
        pricePerPerson: [0, 50],
        groupFriendly: true,
        highlight:
          "Ninkasi, Oakshire, Falling Sky, Hop Valley — 10+ breweries walkable or a short ride apart",
        bestFor: "arrival day",
      },
      {
        name: "Autzen Stadium / UO Campus Tour",
        type: "hiking",
        duration: "1-2 hours",
        pricePerPerson: [0, 10],
        groupFriendly: true,
        highlight:
          "Walk the iconic UO campus and see Autzen Stadium, Hayward Field, and the Nike legacy",
        bestFor: "arrival day",
      },
      {
        name: "McKenzie River Rafting",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [60, 100],
        groupFriendly: true,
        highlight:
          "Class II-III rapids through gorgeous old-growth forest canyon",
        bestFor: "rest day",
        provider: "Oregon River Experiences",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [12, 20],
        hourlyRate: [150, 275],
        providers: ["Eugene Party Bus", "Emerald City Limo"],
        notes:
          "Party buses work well for wine tours and brewery crawls. Downtown Eugene is walkable.",
      },
      {
        type: "shuttle",
        capacity: [8, 12],
        hourlyRate: [100, 175],
        providers: ["Oregon Shuttle", "EUG Airport Shuttle"],
        notes:
          "Shuttles for airport transfers and Tokatee day trips.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [55, 120],
        providers: ["Take a Chef", "Cozymeal"],
        mealTypes: [
          "farm-to-table seasonal",
          "BBQ cookout",
          "brunch",
          "wine-paired dinner",
        ],
        notes:
          "Eugene's farm-to-table culture means chefs have excellent local ingredients. Willamette Valley wines pair beautifully.",
      },
    ],
  },

  // ── Leavenworth, WA ──────────────────────────────────────────────────
  {
    id: "leavenworth-wa",
    city: "Leavenworth",
    state: "WA",
    region: "Pacific NW",
    tagline: "Bavarian village charm meets Cascade Mountain golf",
    description:
      "Leavenworth is a walkable Bavarian-themed village tucked in the Cascades with solid golf, excellent beer halls, and outdoor activities everywhere. It's a unique trip setting that feels like a European golf holiday without leaving Washington. The village is compact, group-friendly, and the scenery is unmatched.",
    population: "tiny",
    nearestAirport: {
      code: "PAE",
      name: "Paine Field (Everett) / SEA (Seattle-Tacoma)",
      driveMinutes: 120,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Leavenworth Golf Club",
        tier: "solid",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 71,
        yardage: 5711,
        slope: 119,
        rating: 67.5,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.leavenworthgolf.com",
        highlight:
          "Mountain course right in the village with Cascade peaks on every hole — short but scenic",
      },
      {
        name: "Kahler Glen Golf & Ski Resort",
        tier: "solid",
        greenFeeRange: [45, 80],
        holes: 18,
        par: 71,
        yardage: 5974,
        slope: 122,
        rating: 68.6,
        walkable: true,
        style: "mountain",
        driveMinutes: 20,
        url: "https://www.kahlerglen.com",
        highlight:
          "Beautiful Lake Wenatchee course surrounded by national forest with mountain views in every direction",
      },
      {
        name: "Highlander Golf Course",
        tier: "solid",
        greenFeeRange: [35, 60],
        holes: 18,
        par: 72,
        yardage: 6441,
        slope: 121,
        rating: 70.1,
        walkable: true,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.highlandergolf.com",
        highlight:
          "Well-maintained East Wenatchee course with Columbia River views and excellent value",
      },
    ],
    lodging: [
      {
        type: "cabin",
        sleeps: [10, 16],
        nightlyRange: [400, 1600],
        amenities: [
          "mountain views",
          "hot tub",
          "fire pit",
          "large kitchen",
          "game room",
          "BBQ",
        ],
        areaDescription:
          "Icicle Road or Plain — 5-15 minutes from the village in mountain settings",
        searchUrl:
          "https://www.vrbo.com/search?destination=Leavenworth%2C+Washington&guests=14",
        notes:
          "Mountain cabins are the play here. Icicle Road puts you closest to the village; Plain has larger properties. Book 3+ months ahead for summer.",
      },
      {
        type: "lodge",
        sleeps: [10, 14],
        nightlyRange: [500, 1800],
        amenities: [
          "Bavarian decor",
          "mountain views",
          "hot tub",
          "fireplace",
          "walkable to village",
        ],
        areaDescription:
          "In or adjacent to the village — walkable to all restaurants and beer halls",
        searchUrl:
          "https://www.airbnb.com/s/Leavenworth--Washington/homes?adults=14",
        notes:
          "In-village lodges are more expensive but eliminate driving. Many have Bavarian character.",
      },
    ],
    dining: [
      {
        name: "Andreas Keller Restaurant",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Underground Bavarian beer hall with bratwurst, schnitzel, and long communal tables — perfect for groups",
        reservationNeeded: false,
      },
      {
        name: "South Restaurant & Bar",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "PNW fine dining with a creative seasonal menu — Leavenworth's best upscale dinner",
        reservationNeeded: true,
      },
      {
        name: "Munchen Haus",
        style: "casual",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Outdoor sausage garden with craft beer and a fire pit — the quintessential Leavenworth lunch",
        reservationNeeded: false,
      },
      {
        name: "Watershed Cafe",
        style: "farm-to-table",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Pacific NW farm-to-table brunch and lunch with excellent coffee and mountain views",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Icicle Brewing Company",
        vibe: "brewpub",
        highlight:
          "Leavenworth's craft brewery with a big taproom, great IPAs, and a patio with mountain views",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Andreas Keller",
        vibe: "brewpub",
        highlight:
          "Bavarian beer cellar with boots of beer, accordion music, and a raucous group atmosphere",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Loft Bar",
        vibe: "cocktail",
        highlight:
          "Upstairs cocktail bar with a more chill vibe and craft drinks above the village bustle",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Wenatchee River Rafting",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [60, 100],
        groupFriendly: true,
        highlight:
          "Class II-III rapids through stunning Cascade canyon scenery — excellent for groups",
        bestFor: "rest day",
        provider: "Osprey Rafting / Blue Sky Outfitters",
      },
      {
        name: "Icicle Creek Hiking",
        type: "hiking",
        duration: "2-4 hours",
        pricePerPerson: [0, 10],
        groupFriendly: true,
        highlight:
          "Alpine trail system right out of the village with lakes, waterfalls, and wildflower meadows",
        bestFor: "morning before golf",
      },
      {
        name: "Leavenworth Wine Walk",
        type: "winery",
        duration: "2-3 hours",
        pricePerPerson: [15, 40],
        groupFriendly: true,
        highlight:
          "Several tasting rooms in the village featuring Washington wines in Bavarian settings",
        bestFor: "arrival day",
      },
      {
        name: "Bavarian Village Brewery Crawl",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [0, 40],
        groupFriendly: true,
        highlight:
          "Icicle Brewing, Doghaus Brewery, and the beer halls — all walkable in the compact village",
        bestFor: "arrival day",
      },
      {
        name: "Lake Wenatchee Kayaking",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "Pristine alpine lake 20 minutes north with turquoise water and mountain panoramas",
        bestFor: "rest day",
        provider: "Lake Wenatchee Outfitters",
      },
      {
        name: "Zip Line Adventure",
        type: "zipline",
        duration: "2-3 hours",
        pricePerPerson: [80, 130],
        groupFriendly: true,
        highlight:
          "Multiple zip lines through old-growth forest with Cascade Mountain views",
        bestFor: "rest day",
        provider: "Leavenworth Ziplines",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [10, 14],
        hourlyRate: [150, 250],
        providers: ["Cascade Limo", "Leavenworth Shuttle"],
        notes:
          "The village is walkable for bars and dining. Sprinters needed for airport transfers from SEA/PAE (2+ hours) and golf course shuttles.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 140],
        providers: ["Take a Chef", "Leavenworth Private Dining"],
        mealTypes: [
          "Bavarian feast",
          "steakhouse night",
          "BBQ cookout",
          "brunch",
        ],
        notes:
          "Bavarian-themed group dinners in a mountain cabin are the signature Leavenworth move. Chefs can source from Wenatchee Valley farms.",
      },
    ],
  },

  // ── Cannon Beach / Seaside, OR ────────────────────────────────────────
  {
    id: "cannon-beach-or",
    city: "Cannon Beach / Seaside",
    state: "OR",
    region: "Pacific NW",
    tagline: "Oregon coast golf with Haystack Rock as your backdrop",
    description:
      "The Cannon Beach / Seaside corridor offers a unique coastal golf trip experience with Gearhart Golf Links — one of the oldest courses west of the Mississippi. The ocean air, dramatic coastline, and laid-back beach town vibe make this a memorable trip even if the golf is secondary. Seaside adds a livelier bar scene to complement Cannon Beach's charm.",
    population: "small",
    nearestAirport: {
      code: "PDX",
      name: "Portland International Airport",
      driveMinutes: 90,
    },
    bestSeasons: ["summer"],
    courses: [
      {
        name: "Gearhart Golf Links",
        tier: "premium",
        greenFeeRange: [55, 95],
        holes: 18,
        par: 72,
        yardage: 6218,
        slope: 122,
        rating: 69.6,
        walkable: true,
        style: "links",
        driveMinutes: 10,
        url: "https://www.gearhartgolflinks.com",
        highlight:
          "Established 1892 — one of the oldest courses in the West with true links turf and ocean breezes",
      },
      {
        name: "The Highlands at Gearhart",
        tier: "solid",
        greenFeeRange: [30, 55],
        holes: 9,
        par: 34,
        yardage: 2647,
        slope: 116,
        rating: 65.2,
        walkable: true,
        style: "links",
        driveMinutes: 10,
        highlight:
          "Companion 9-hole course at Gearhart — play it as a warm-up or double it for a relaxed 18",
      },
      {
        name: "Astoria Golf & Country Club",
        tier: "solid",
        greenFeeRange: [40, 65],
        holes: 18,
        par: 72,
        yardage: 6478,
        slope: 125,
        rating: 70.4,
        walkable: true,
        style: "coastal",
        driveMinutes: 25,
        highlight:
          "Scenic coastal course near the Columbia River with views of the Astoria-Megler Bridge",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [500, 1800],
        amenities: [
          "ocean views",
          "hot tub",
          "fire pit",
          "large kitchen",
          "beach access",
          "game room",
        ],
        areaDescription:
          "Cannon Beach oceanfront or Tolovana Park — steps from the beach with Haystack Rock views",
        searchUrl:
          "https://www.vrbo.com/search?destination=Cannon+Beach%2C+Oregon&guests=14",
        notes:
          "Oceanfront homes in Cannon Beach are stunning but book fast. Tolovana Park (south Cannon Beach) has more large-home inventory. Book 4-6 months ahead for summer.",
      },
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [400, 1200],
        amenities: [
          "hot tub",
          "game room",
          "large kitchen",
          "fire pit",
          "beach access",
        ],
        areaDescription:
          "Seaside or Gearhart — more affordable than Cannon Beach with closer proximity to golf and nightlife",
        searchUrl:
          "https://www.vrbo.com/search?destination=Seaside%2C+Oregon&guests=14",
        notes:
          "Gearhart and Seaside have more large-home options at lower prices. Seaside has the better bar scene.",
      },
    ],
    dining: [
      {
        name: "Newman's at 988",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "French-Italian fine dining in a Cannon Beach cottage — the best restaurant on the Oregon coast",
        reservationNeeded: true,
      },
      {
        name: "Driftwood Restaurant & Lounge",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Classic Oregon coast seafood with a retro lounge attached — been there since 1946",
        reservationNeeded: false,
      },
      {
        name: "Mo's Seafood & Chowder",
        style: "seafood",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Oregon coast institution — clam chowder and fried fish in a no-frills oceanview setting",
        reservationNeeded: false,
      },
      {
        name: "Pig 'n Pancake",
        style: "casual",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Oregon coast breakfast chain institution — massive pancakes and a group-friendly layout",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Bill's Tavern & Brewhouse",
        vibe: "brewpub",
        highlight:
          "Cannon Beach's go-to brewery with solid IPAs and a cozy atmosphere on the main drag",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Lumberyard Rotisserie & Grill",
        vibe: "sports-bar",
        highlight:
          "Big TVs, cold beer, and rotisserie chicken — Seaside's best sports watching spot",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Seaside Brewing Company",
        vibe: "brewpub",
        highlight:
          "Craft beer in a converted city jail — great vibe and the best brewery on this stretch of coast",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Haystack Rock Tide Pool Exploration",
        type: "hiking",
        duration: "1-2 hours",
        pricePerPerson: [0, 0],
        groupFriendly: true,
        highlight:
          "Walk to Haystack Rock at low tide to see starfish, anemones, and puffins — iconic Oregon coast",
        bestFor: "morning before golf",
      },
      {
        name: "Cannon Beach to Seaside Hike (Tillamook Head)",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [0, 0],
        groupFriendly: true,
        highlight:
          "6-mile trail over Tillamook Head with stunning ocean views — Lewis and Clark walked this path",
        bestFor: "rest day",
      },
      {
        name: "Ecola State Park Hike",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 5],
        groupFriendly: true,
        highlight:
          "Dramatic coastal viewpoints just north of Cannon Beach — Indian Beach is a surfer spot",
        bestFor: "morning before golf",
      },
      {
        name: "Deep Sea Fishing Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [125, 225],
        groupFriendly: true,
        highlight:
          "Salmon, halibut, and lingcod out of Astoria or Garibaldi — bring back dinner for the chef",
        bestFor: "rest day",
        provider: "Astoria Fishing Charters",
      },
      {
        name: "Seaside Aquarium Visit",
        type: "hiking",
        duration: "1-2 hours",
        pricePerPerson: [5, 15],
        groupFriendly: true,
        highlight:
          "Feed the seals and check out marine life — a quick low-key activity on the boardwalk",
        bestFor: "arrival day",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [10, 14],
        hourlyRate: [125, 225],
        providers: ["Coast Party Bus", "Portland Party Bus"],
        notes:
          "Most transport companies come from Portland. Useful for PDX airport runs and course shuttles. The towns themselves are walkable.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 155],
        providers: ["Take a Chef", "Oregon Coast Private Chef"],
        mealTypes: [
          "Dungeness crab dinner",
          "Pacific seafood boil",
          "steak dinner",
          "breakfast spread",
        ],
        notes:
          "Oceanfront house dinners with fresh-caught seafood are spectacular here. Local Dungeness crab, razor clams, and salmon are the highlights.",
      },
    ],
  },

  // ── Gig Harbor, WA ────────────────────────────────────────────────────
  {
    id: "gig-harbor-wa",
    city: "Gig Harbor",
    state: "WA",
    region: "Pacific NW",
    tagline: "Puget Sound harbor town with Chambers Bay next door",
    description:
      "Gig Harbor is a charming harbor town on the Puget Sound that puts you within striking distance of Chambers Bay, Gold Mountain, and several other quality courses. The waterfront downtown has enough restaurants and bars to keep a group happy, and you're close to both Tacoma and Seattle if you want a bigger night out.",
    population: "small",
    nearestAirport: {
      code: "SEA",
      name: "Seattle-Tacoma International Airport",
      driveMinutes: 45,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Chambers Bay Golf Course",
        tier: "bucket-list",
        greenFeeRange: [175, 289],
        holes: 18,
        par: 72,
        yardage: 7585,
        slope: 142,
        rating: 76.7,
        walkable: true,
        style: "links",
        driveMinutes: 25,
        url: "https://www.chambersbaygolf.com",
        highlight:
          "2015 US Open host — links-style course on Puget Sound built on a reclaimed gravel mine",
      },
      {
        name: "Gold Mountain Golf Club (Olympic Course)",
        tier: "premium",
        greenFeeRange: [55, 95],
        holes: 18,
        par: 72,
        yardage: 7002,
        slope: 134,
        rating: 73.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 30,
        url: "https://www.goldmountaingolf.com",
        highlight:
          "Consistently rated a top public course in WA — John Harbottle design through the Kitsap Peninsula forest",
      },
      {
        name: "Gold Mountain Golf Club (Cascade Course)",
        tier: "solid",
        greenFeeRange: [35, 60],
        holes: 18,
        par: 71,
        yardage: 6707,
        slope: 127,
        rating: 72.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 30,
        url: "https://www.goldmountaingolf.com",
        highlight:
          "Companion course at Gold Mountain — excellent value with mature trees and rolling terrain",
      },
      {
        name: "Trophy Lake Golf & Casting Club",
        tier: "solid",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 72,
        yardage: 7206,
        slope: 130,
        rating: 74.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.trophylakegolf.com",
        highlight:
          "Long challenging layout near the harbor with water features and mountain views",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [500, 1600],
        amenities: [
          "waterfront",
          "hot tub",
          "fire pit",
          "large kitchen",
          "deck",
          "views",
        ],
        areaDescription:
          "Gig Harbor waterfront or Fox Island — Puget Sound views with harbor proximity",
        searchUrl:
          "https://www.vrbo.com/search?destination=Gig+Harbor%2C+Washington&guests=14",
        notes:
          "Waterfront homes with Puget Sound views are the play. Fox Island has more space and privacy. Harbor-adjacent gives walkability to restaurants.",
      },
      {
        type: "house",
        sleeps: [10, 14],
        nightlyRange: [400, 1100],
        amenities: [
          "hot tub",
          "large kitchen",
          "fire pit",
          "game room",
          "multiple bedrooms",
        ],
        areaDescription:
          "North Gig Harbor or Key Peninsula — residential neighborhoods with more space",
        searchUrl:
          "https://www.airbnb.com/s/Gig-Harbor--Washington/homes?adults=14",
        notes:
          "Good inventory of large homes at reasonable prices compared to Seattle. 5-10 min drive to the harbor.",
      },
    ],
    dining: [
      {
        name: "Brix 25",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Upscale waterfront dining with steaks, seafood, and harbor views — the big dinner spot",
        reservationNeeded: true,
      },
      {
        name: "Tides Tavern",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Iconic waterfront tavern on the harbor — pizza, fish & chips, and cold beer with boat-watching",
        reservationNeeded: false,
      },
      {
        name: "El Gaucho Tacoma",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "15 minutes away in Tacoma — tableside Caesar salads, dry-aged steaks, and old-school service",
        reservationNeeded: true,
      },
      {
        name: "7 Seas Brewing",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Gig Harbor's best brewery with a spacious taproom, food trucks, and a waterfront location",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "7 Seas Brewing Taproom",
        vibe: "brewpub",
        highlight:
          "Big taproom right on the harbor with 15+ taps and a great outdoor area",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Tides Tavern Bar",
        vibe: "patio",
        highlight:
          "Over-water patio bar that's been a Gig Harbor institution since 1973 — sunset beers are a must",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Hub Saloon",
        vibe: "dive",
        highlight:
          "Classic small-town bar with pool, cheap drinks, and local character",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Gig Harbor Kayak Tour",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [35, 65],
        groupFriendly: true,
        highlight:
          "Paddle the harbor and Puget Sound with views of Mt. Rainier — rentals right on the waterfront",
        bestFor: "rest day",
        provider: "Gig Harbor Kayak Tours",
      },
      {
        name: "Point Defiance Park (Tacoma)",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 0],
        groupFriendly: true,
        highlight:
          "760-acre park 15 min away with trails, a zoo, and stunning Puget Sound views",
        bestFor: "morning before golf",
      },
      {
        name: "Gig Harbor Brewery Walk",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [0, 40],
        groupFriendly: true,
        highlight:
          "7 Seas, Heritage Distilling, and several tasting rooms along the harbor — easy walkable loop",
        bestFor: "arrival day",
      },
      {
        name: "Puget Sound Fishing Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [125, 225],
        groupFriendly: true,
        highlight:
          "Salmon and halibut fishing on Puget Sound departing from the harbor",
        bestFor: "rest day",
        provider: "Gig Harbor Charters",
      },
      {
        name: "Heritage Distillery Tour",
        type: "distillery",
        duration: "1-2 hours",
        pricePerPerson: [15, 30],
        groupFriendly: true,
        highlight:
          "Award-winning BSB (Brown Sugar Bourbon) distillery with tastings right on the harbor",
        bestFor: "arrival day",
        provider: "Heritage Distilling Co.",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [10, 14],
        hourlyRate: [150, 250],
        providers: ["A&A Limousine", "Tacoma Party Bus"],
        notes:
          "Sprinter vans handle course shuttles well, especially for the run to Chambers Bay and Gold Mountain. The harbor area is walkable.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 145],
        providers: ["Take a Chef", "Puget Sound Private Chef"],
        mealTypes: [
          "Pacific NW seafood dinner",
          "steak dinner",
          "oyster & crab cookout",
          "brunch",
        ],
        notes:
          "Waterfront house dinners with local oysters, Dungeness crab, and salmon are the move. Good chef availability from the Tacoma/Seattle market.",
      },
    ],
  },
  // McCall removed — exists in destinations-mountain-west.ts
];
