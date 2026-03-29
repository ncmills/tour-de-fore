import { Destination } from "./types";

export const midwestDestinations: Destination[] = [
  // ─── 1. Kohler, WI ────────────────────────────────────────────────
  {
    id: "kohler-wi",
    city: "Kohler",
    state: "WI",
    region: "Midwest",
    tagline: "Ryder Cup country meets heartland hospitality",
    description:
      "Home to Whistling Straits (2021 Ryder Cup) and Blackwolf Run, Kohler is a bucket-list golf destination tucked along Lake Michigan's shore. Add Erin Hills — host of the 2017 US Open — just 45 minutes south, and you've got one of the densest collections of championship golf in America.",
    population: "tiny",
    tdfTested: true,
    tdfYear: 2026,
    nearestAirport: {
      code: "GRB",
      name: "Green Bay Austin Straubel International Airport",
      driveMinutes: 60,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "Whistling Straits - Straits Course",
        tier: "bucket-list",
        greenFeeRange: [395, 520],
        holes: 18,
        par: 72,
        yardage: 7790,
        slope: 152,
        rating: 77.2,
        walkable: true,
        style: "links",
        driveMinutes: 5,
        url: "https://www.destinationkohler.com/golf/whistling-straits",
        highlight:
          "2021 Ryder Cup, 3-time PGA Championship host — lakeside links that rival anything in the British Isles",
      },
      {
        name: "Whistling Straits - Irish Course",
        tier: "premium",
        greenFeeRange: [220, 290],
        holes: 18,
        par: 72,
        yardage: 7201,
        slope: 139,
        rating: 74.6,
        walkable: true,
        style: "links",
        driveMinutes: 5,
        url: "https://www.destinationkohler.com/golf/whistling-straits",
        highlight:
          "The 'other' Straits course — still world-class links with Lake Michigan views at a fraction of the price",
      },
      {
        name: "Blackwolf Run - River Course",
        tier: "bucket-list",
        greenFeeRange: [340, 450],
        holes: 18,
        par: 72,
        yardage: 6991,
        slope: 151,
        rating: 75.3,
        walkable: true,
        style: "parkland",
        driveMinutes: 2,
        url: "https://www.destinationkohler.com/golf/blackwolf-run",
        highlight:
          "Pete Dye's inland masterpiece — dramatic elevation changes along the Sheboygan River",
      },
      {
        name: "Blackwolf Run - Meadow Valleys",
        tier: "premium",
        greenFeeRange: [220, 290],
        holes: 18,
        par: 72,
        yardage: 7250,
        slope: 143,
        rating: 75.6,
        walkable: true,
        style: "parkland",
        driveMinutes: 2,
        url: "https://www.destinationkohler.com/golf/blackwolf-run",
        highlight:
          "Wider fairways than the River Course but no less challenging — great for a second-day loop",
      },
      {
        name: "Erin Hills",
        tier: "bucket-list",
        greenFeeRange: [275, 395],
        holes: 18,
        par: 72,
        yardage: 7823,
        slope: 152,
        rating: 78.3,
        walkable: true,
        style: "links",
        driveMinutes: 45,
        url: "https://erinhills.com",
        highlight:
          "2017 US Open host — walk-only links on rolling glacial terrain, one of the purest golf experiences in the US",
      },
      {
        name: "The Bull at Pinehurst Farms",
        tier: "premium",
        greenFeeRange: [99, 165],
        holes: 18,
        par: 72,
        yardage: 7339,
        slope: 146,
        rating: 76.2,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.thebullgolfclub.com",
        highlight:
          "Jack Nicklaus design with broad fairways and demanding greens — top public course in Wisconsin",
      },
      {
        name: "Quit Qui Oc Golf Club",
        tier: "budget",
        greenFeeRange: [39, 59],
        holes: 27,
        par: 72,
        yardage: 6708,
        slope: 127,
        rating: 72.1,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.quitquiocgolf.com",
        highlight:
          "Affordable 27-hole layout perfect for a warm-up round or extra loops",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [12, 16],
        nightlyRange: [800, 1800],
        amenities: [
          "full kitchen",
          "fire pit",
          "grill",
          "hot tub",
          "lake access",
          "game room",
        ],
        areaDescription:
          "Sheboygan/Kohler area lakefront homes and large properties",
        searchUrl:
          "https://www.vrbo.com/search?destination=Kohler%2C+Wisconsin&adults=16",
        notes:
          "Book Elkhart Lake and Sheboygan-area homes — 10-20 min to courses. The American Club resort is walkable to Blackwolf Run but pricier for large groups.",
      },
      {
        type: "house",
        sleeps: [8, 12],
        nightlyRange: [500, 1200],
        amenities: ["full kitchen", "parking", "grill", "washer/dryer"],
        areaDescription: "Sheboygan residential neighborhoods",
        searchUrl:
          "https://www.airbnb.com/s/Sheboygan--Wisconsin/homes?adults=12",
        notes:
          "May need two houses for 16 — Sheboygan has good inventory 15 min from Whistling Straits",
      },
    ],
    dining: [
      {
        name: "The Immigrant Restaurant",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "AAA Four Diamond dining inside The American Club — six themed rooms, outstanding wine list",
        reservationNeeded: true,
      },
      {
        name: "River Wildlife",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Rustic log cabin on the Sheboygan River — game meats, steaks, prix fixe wilderness dining",
        reservationNeeded: true,
      },
      {
        name: "Horse & Plow",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Gastropub inside The American Club — cheese curds, burgers, great beer list",
        reservationNeeded: false,
      },
      {
        name: "Rupp's Lodge",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Old-school Wisconsin supper club in Sheboygan — prime rib, old fashioneds, wood-paneled vibes",
        reservationNeeded: true,
      },
      {
        name: "Black Pig",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Upscale farm-to-table in downtown Sheboygan with craft cocktails and rotating seasonal menu",
        reservationNeeded: true,
      },
      {
        name: "Il Ritrovo",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Neapolitan pizza and pasta in Sheboygan — wood-fired oven, casual but excellent",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "3 Sheeps Brewing",
        vibe: "brewpub",
        highlight:
          "Local craft brewery with a taproom and outdoor patio — try the Baad Boy Black Wheat",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Horse & Plow Bar",
        vibe: "whiskey-bar",
        highlight:
          "Wisconsin old fashioneds and a deep whiskey list inside The American Club",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Paradigm Coffee & Music",
        vibe: "dive",
        highlight:
          "Live music venue in Sheboygan that doubles as a late-night hangout",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Duke of Devon Pub",
        vibe: "sports-bar",
        highlight:
          "British-style pub inside the Shops at Woodlake — pub grub and pints after a round",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Lake Michigan Charter Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [100, 175],
        groupFriendly: true,
        highlight:
          "Salmon and trout charters out of Sheboygan — one of the best Great Lakes ports",
        bestFor: "rest day",
        provider: "Sheboygan Fishing Charters",
      },
      {
        name: "Kohler Waters Spa",
        type: "spa",
        duration: "2-3 hours",
        pricePerPerson: [75, 200],
        groupFriendly: true,
        highlight:
          "World-class spa at The American Club — hydrotherapy, massages, sauna",
        bestFor: "rest day",
        provider: "Destination Kohler",
      },
      {
        name: "Road America",
        type: "go-karts",
        duration: "half day",
        pricePerPerson: [100, 350],
        groupFriendly: true,
        highlight:
          "Legendary 4-mile road course in Elkhart Lake — driving experiences and track tours available",
        bestFor: "rest day",
        provider: "Road America",
      },
      {
        name: "Hops & Props Brewery Tour",
        type: "brewery",
        duration: "3-4 hours",
        pricePerPerson: [25, 50],
        groupFriendly: true,
        highlight:
          "Hit 3 Sheeps, 8th Street Ale Haus, and Plymouth Brewing in one afternoon",
        bestFor: "arrival day",
      },
      {
        name: "Sheboygan Marsh Kayaking",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "Paddle through 14,000-acre wetland preserve — wildlife spotting and flat water",
        bestFor: "morning before golf",
        provider: "Sheboygan County Parks",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 24],
        hourlyRate: [175, 275],
        providers: [
          "Lakeshore Limousine",
          "Party Bus Sheboygan",
          "Class Act Limo",
        ],
        notes:
          "Book early for summer weekends. Most do airport pickups from MKE or GRB plus course-hopping runs.",
      },
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [125, 200],
        providers: ["Executive Coach", "Kohler Transportation"],
        notes:
          "Good for smaller groups — Destination Kohler also offers shuttles between their properties",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 150],
        providers: [
          "Take a Chef",
          "Kohler Catering",
          "Chef Tony's Catering Sheboygan",
        ],
        mealTypes: [
          "Wisconsin fish boil",
          "steak dinner",
          "BBQ cookout",
          "breakfast spread",
        ],
        notes:
          "Wisconsin fish boil is the move — whitefish, potatoes, onions cooked over an open fire. Kohler's catering arm does private events at rental properties.",
      },
    ],
  },

  // ─── 2. Traverse City, MI ─────────────────────────────────────────
  {
    id: "traverse-city-mi",
    city: "Traverse City",
    state: "MI",
    region: "Midwest",
    tagline: "Wine country golf on the shores of Grand Traverse Bay",
    description:
      "Northern Michigan's crown jewel pairs world-class golf — headlined by the clifftop links of Arcadia Bluffs — with a booming wine trail, craft beer scene, and stunning Lake Michigan sunsets. Traverse City delivers a full-spectrum trip.",
    population: "medium",
    nearestAirport: {
      code: "TVC",
      name: "Cherry Capital Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Arcadia Bluffs - Bluffs Course",
        tier: "bucket-list",
        greenFeeRange: [175, 275],
        holes: 18,
        par: 73,
        yardage: 7300,
        slope: 146,
        rating: 76.1,
        walkable: true,
        style: "links",
        driveMinutes: 50,
        url: "https://www.arcadiabluffs.com",
        highlight:
          "Clifftop links 200 feet above Lake Michigan — jaw-dropping views on every hole",
      },
      {
        name: "Arcadia Bluffs - South Course",
        tier: "premium",
        greenFeeRange: [125, 195],
        holes: 18,
        par: 72,
        yardage: 6888,
        slope: 136,
        rating: 73.4,
        walkable: true,
        style: "heathland",
        driveMinutes: 50,
        url: "https://www.arcadiabluffs.com",
        highlight:
          "Reversible heathland-style course inspired by The Old Course — play it in two directions",
      },
      {
        name: "Bay Harbor Golf Club - Links/Quarry/Preserve",
        tier: "premium",
        greenFeeRange: [130, 225],
        holes: 27,
        par: 72,
        yardage: 6820,
        slope: 142,
        rating: 74.2,
        walkable: false,
        style: "links",
        driveMinutes: 60,
        url: "https://www.bayharborgolf.com",
        highlight:
          "27 holes by Arthur Hills — the Links nine along Little Traverse Bay is the signature stretch",
      },
      {
        name: "Crystal Downs Country Club",
        tier: "bucket-list",
        greenFeeRange: [0, 0],
        holes: 18,
        par: 70,
        yardage: 6518,
        slope: 139,
        rating: 72.7,
        walkable: true,
        style: "links",
        driveMinutes: 25,
        highlight:
          "Top-10 course in the world (Alister MacKenzie/Perry Maxwell) — strictly private, need a member invite",
      },
      {
        name: "Manitou Passage Golf Club",
        tier: "solid",
        greenFeeRange: [69, 99],
        holes: 18,
        par: 72,
        yardage: 6805,
        slope: 133,
        rating: 73.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.manitoupassagegolfclub.com",
        highlight:
          "Arnold Palmer design through cedar forests and wetlands — outstanding value for the quality",
      },
      {
        name: "Shanty Creek - The Legend",
        tier: "solid",
        greenFeeRange: [79, 139],
        holes: 18,
        par: 72,
        yardage: 6764,
        slope: 137,
        rating: 73.4,
        walkable: false,
        style: "resort",
        driveMinutes: 35,
        url: "https://www.shantycreek.com",
        highlight:
          "Arnold Palmer design at a full-service resort — Cedar River and Schuss Mountain courses also available",
      },
      {
        name: "The Bear at Grand Traverse Resort",
        tier: "premium",
        greenFeeRange: [99, 175],
        holes: 18,
        par: 72,
        yardage: 7078,
        slope: 146,
        rating: 75.6,
        walkable: false,
        style: "resort",
        driveMinutes: 10,
        url: "https://www.grandtraverseresort.com",
        highlight:
          "Jack Nicklaus design — brutally tough from the tips but a marquee resort experience",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [800, 2500],
        amenities: [
          "full kitchen",
          "lake access",
          "fire pit",
          "hot tub",
          "dock",
          "game room",
        ],
        areaDescription:
          "Old Mission Peninsula and East/West Bay lakefront homes",
        searchUrl:
          "https://www.vrbo.com/search?destination=Traverse+City%2C+Michigan&adults=16",
        notes:
          "Old Mission Peninsula homes put you between wineries and downtown. Book 6+ months out for summer.",
      },
      {
        type: "resort-house",
        sleeps: [12, 16],
        nightlyRange: [600, 1500],
        amenities: [
          "full kitchen",
          "resort pool access",
          "golf on-site",
          "spa",
        ],
        areaDescription: "Grand Traverse Resort & Spa area",
        searchUrl: "https://www.grandtraverseresort.com",
        notes:
          "Condos and townhouses at the resort — walkable to The Bear course. Group rates available.",
      },
    ],
    dining: [
      {
        name: "The Boathouse Restaurant",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Right on the water at the Traverse City marina — Great Lakes perch and whitefish",
        reservationNeeded: true,
      },
      {
        name: "Trattoria Stella",
        style: "italian",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Northern Italian in a converted psychiatric hospital — one of the best restaurants in Michigan",
        reservationNeeded: true,
      },
      {
        name: "Red Ginger",
        style: "sushi",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Pan-Asian with excellent sushi — private dining room fits big groups",
        reservationNeeded: true,
      },
      {
        name: "Firefly",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "New American with local farm partnerships — outdoor patio overlooking downtown",
        reservationNeeded: true,
      },
      {
        name: "Bubba's",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "No-frills BBQ joint with massive portions — brisket, pulled pork, and smoked chicken",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "The Workshop Brewing Company",
        vibe: "brewpub",
        highlight:
          "Craft beer in a converted warehouse — large outdoor area, food trucks, live music",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "7 Monks Taproom",
        vibe: "sports-bar",
        highlight:
          "50+ taps of Michigan craft beer, TVs everywhere, solid food menu",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Rare Bird Brewpub",
        vibe: "brewpub",
        highlight:
          "Neighborhood brewery with award-winning IPAs and a laid-back patio",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Low Bar",
        vibe: "cocktail",
        highlight:
          "Speakeasy-style cocktail lounge below street level — craft drinks, dim lighting",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "U&I Lounge",
        vibe: "dive",
        highlight:
          "Beloved local dive bar since 1938 — cheap drinks, pool tables, zero pretense",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Old Mission Peninsula Wine Tour",
        type: "winery",
        duration: "half day",
        pricePerPerson: [30, 80],
        groupFriendly: true,
        highlight:
          "9 wineries on a single peninsula — Riesling, Pinot Grigio, and cherry wines with bay views",
        bestFor: "rest day",
        provider: "TC Wine Tours",
      },
      {
        name: "Grand Traverse Bay Boat Rental",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [60, 120],
        groupFriendly: true,
        highlight:
          "Pontoon or powerboat on crystal-clear Grand Traverse Bay — swimming, tubing, sunset cruises",
        bestFor: "rest day",
        provider: "TC Watersports",
      },
      {
        name: "Sleeping Bear Dunes Hike",
        type: "hiking",
        duration: "3-4 hours",
        pricePerPerson: [0, 20],
        groupFriendly: true,
        highlight:
          "Named 'Most Beautiful Place in America' by Good Morning America — massive sand dunes on Lake Michigan",
        bestFor: "rest day",
      },
      {
        name: "TC Brewery Crawl",
        type: "brewery",
        duration: "3-4 hours",
        pricePerPerson: [25, 50],
        groupFriendly: true,
        highlight:
          "Hit Workshop, Rare Bird, Right Brain, and Filling Station — all walkable downtown",
        bestFor: "arrival day",
      },
      {
        name: "Traverse City Fly Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [150, 250],
        groupFriendly: false,
        highlight:
          "Wade or float the Boardman, Manistee, or Pere Marquette rivers for trout and salmon",
        bestFor: "morning before golf",
        provider: "Northern Michigan Fly Fishing",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 28],
        hourlyRate: [175, 300],
        providers: [
          "TC Party Bus",
          "Northern Michigan Limo",
          "Cherry Capital Limousine",
        ],
        notes:
          "Wine tour buses are the local specialty — most do course-hopping too. Book early for July/August.",
      },
      {
        type: "trolley",
        capacity: [20, 30],
        hourlyRate: [200, 350],
        providers: ["TC Trolley Co", "Traverse Wine & Beer Tours"],
        notes:
          "Open-air trolleys are perfect for winery hops on warm days",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 140],
        providers: [
          "Take a Chef",
          "Epicure Catering TC",
          "Blue Goat Catering",
        ],
        mealTypes: [
          "Great Lakes fish fry",
          "steak dinner",
          "BBQ cookout",
          "farm-to-table tasting",
          "breakfast",
        ],
        notes:
          "Local whitefish and cherry-based dishes are the regional specialties. Many chefs source from local farms.",
      },
    ],
  },

  // ─── 3. Galena, IL ────────────────────────────────────────────────
  {
    id: "galena-il",
    city: "Galena",
    state: "IL",
    region: "Midwest",
    tagline: "Historic charm and hilltop golf in the Driftless Region",
    description:
      "This beautifully preserved 1800s mining town in northwest Illinois punches above its weight with Eagle Ridge Resort's four courses spread across rolling Driftless terrain. Main Street is packed with restaurants and bars — perfect for a group that wants culture with their golf.",
    population: "tiny",
    nearestAirport: {
      code: "DBQ",
      name: "Dubuque Regional Airport",
      driveMinutes: 25,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "Eagle Ridge - The General",
        tier: "premium",
        greenFeeRange: [129, 199],
        holes: 18,
        par: 72,
        yardage: 6820,
        slope: 142,
        rating: 74.0,
        walkable: false,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.eagleridge.com",
        highlight:
          "The flagship — dramatic elevation changes and pristine conditioning on every hole",
      },
      {
        name: "Eagle Ridge - North Course",
        tier: "solid",
        greenFeeRange: [79, 129],
        holes: 18,
        par: 72,
        yardage: 6836,
        slope: 132,
        rating: 73.2,
        walkable: false,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.eagleridge.com",
        highlight:
          "Tight fairways through hardwood forest — the toughest of the four courses for some",
      },
      {
        name: "Eagle Ridge - South Course",
        tier: "solid",
        greenFeeRange: [69, 109],
        holes: 18,
        par: 72,
        yardage: 6762,
        slope: 130,
        rating: 72.4,
        walkable: false,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.eagleridge.com",
        highlight:
          "The most playable of the four — wide fairways with rolling hills and lake views",
      },
      {
        name: "Eagle Ridge - East Course",
        tier: "solid",
        greenFeeRange: [49, 79],
        holes: 18,
        par: 64,
        yardage: 4086,
        slope: 108,
        rating: 61.7,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.eagleridge.com",
        highlight:
          "Executive-length course — great for warm-up rounds or afternoon scrambles",
      },
      {
        name: "Lacoma Golf Club",
        tier: "budget",
        greenFeeRange: [29, 55],
        holes: 36,
        par: 72,
        yardage: 6700,
        slope: 125,
        rating: 71.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.lacomagolf.com",
        highlight:
          "36 holes of affordable golf across the river in East Dubuque — two solid layouts",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [600, 1500],
        amenities: [
          "full kitchen",
          "hot tub",
          "fire pit",
          "game room",
          "deck",
          "grill",
        ],
        areaDescription:
          "Eagle Ridge Resort area and surrounding countryside",
        searchUrl:
          "https://www.vrbo.com/search?destination=Galena%2C+Illinois&adults=16",
        notes:
          "Large resort homes at Eagle Ridge fit 12-16 easily — many have golf course views. Book through Eagle Ridge or VRBO.",
      },
      {
        type: "cabin",
        sleeps: [8, 12],
        nightlyRange: [400, 900],
        amenities: [
          "full kitchen",
          "fireplace",
          "hot tub",
          "wooded setting",
        ],
        areaDescription: "Galena Territory gated community",
        searchUrl:
          "https://www.airbnb.com/s/Galena--Illinois/homes?adults=12",
        notes:
          "May need two cabins for 16. The Galena Territory is a 6,800-acre resort community with its own golf course.",
      },
    ],
    dining: [
      {
        name: "Fried Green Tomatoes",
        style: "italian",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Italian fine dining in a historic Main Street building — the go-to special-occasion spot in Galena",
        reservationNeeded: true,
      },
      {
        name: "One Eleven Main",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Farm-to-table tasting menus in a beautifully restored space — wine pairings available",
        reservationNeeded: true,
      },
      {
        name: "Vinny Vanucchi's",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Red-sauce Italian with massive portions — garlic bread and house wine for the table",
        reservationNeeded: true,
      },
      {
        name: "Log Cabin Steakhouse",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Greek-style steakhouse with hand-cut steaks — a Galena institution since 1937",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Blaum Bros. Distilling Co.",
        vibe: "whiskey-bar",
        highlight:
          "Craft distillery with a tasting room — bourbon, gin, and vodka all made on-site",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Galena Brewing Company",
        vibe: "brewpub",
        highlight:
          "Local brewery on Main Street with solid pub food and their own craft beers",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Grape Escape",
        vibe: "patio",
        highlight:
          "Wine bar with a courtyard patio — flights, cheese boards, and live music weekends",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "VFW Post 2665",
        vibe: "dive",
        highlight:
          "Cheap drinks, pool tables, and locals — the real Galena after dark",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Blaum Bros. Distillery Tour",
        type: "distillery",
        duration: "1-2 hours",
        pricePerPerson: [15, 30],
        groupFriendly: true,
        highlight:
          "Grain-to-glass whiskey tour and tasting at a beautiful craft distillery",
        bestFor: "arrival day",
        provider: "Blaum Bros. Distilling Co.",
      },
      {
        name: "Chestnut Mountain ATV Tours",
        type: "atv",
        duration: "2-3 hours",
        pricePerPerson: [60, 100],
        groupFriendly: true,
        highlight:
          "ATV trails through bluffs overlooking the Mississippi River",
        bestFor: "rest day",
        provider: "Chestnut Mountain Resort",
      },
      {
        name: "Mississippi River Kayaking",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [40, 70],
        groupFriendly: true,
        highlight:
          "Paddle the backwaters of the Mississippi — eagles, bluffs, and calm water",
        bestFor: "morning before golf",
        provider: "Fever River Outfitters",
      },
      {
        name: "Galena Brewery Crawl",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [20, 40],
        groupFriendly: true,
        highlight:
          "Walk Main Street hitting Galena Brewing, plus tastings at Blaum Bros and the wine bars",
        bestFor: "arrival day",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [12, 20],
        hourlyRate: [100, 175],
        providers: ["Galena Trolley Tours", "Royal Limo Service"],
        notes:
          "Galena is compact enough that a shuttle handles everything — Main Street to Eagle Ridge is only 10 min",
      },
      {
        type: "party-bus",
        capacity: [14, 24],
        hourlyRate: [175, 275],
        providers: [
          "Dubuque Party Bus",
          "Royal Limo Service",
          "Leisure Services Limo",
        ],
        notes:
          "Book from Dubuque — more inventory than tiny Galena. Most will serve the whole Jo Daviess County area.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 120],
        providers: [
          "Take a Chef",
          "Eagle Ridge Catering",
          "Galena Personal Chef Services",
        ],
        mealTypes: [
          "steak dinner",
          "Italian family-style",
          "BBQ cookout",
          "breakfast",
        ],
        notes:
          "Eagle Ridge resort properties have full kitchens that work well for private chefs. Book through the resort or independently.",
      },
    ],
  },

  // ─── 4. Lake Geneva, WI ───────────────────────────────────────────
  {
    id: "lake-geneva-wi",
    city: "Lake Geneva",
    state: "WI",
    region: "Midwest",
    tagline: "Chicago's escape — resorts, lake life, and championship golf",
    description:
      "Just 90 minutes from O'Hare, Lake Geneva has been the Midwest's premier getaway since the Gilded Age. Three Geneva National courses by Palmer, Player, and Trevino anchor the golf, while the lake and downtown keep the non-golf hours full.",
    population: "small",
    nearestAirport: {
      code: "ORD",
      name: "O'Hare International Airport",
      driveMinutes: 90,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "Geneva National - Palmer Course",
        tier: "premium",
        greenFeeRange: [99, 179],
        holes: 18,
        par: 72,
        yardage: 7171,
        slope: 140,
        rating: 75.0,
        walkable: false,
        style: "resort",
        driveMinutes: 5,
        url: "https://www.genevanationalresort.com",
        highlight:
          "Arnold Palmer design with water on 13 holes — the most scenic of the three GN courses",
      },
      {
        name: "Geneva National - Player Course",
        tier: "premium",
        greenFeeRange: [99, 179],
        holes: 18,
        par: 72,
        yardage: 7120,
        slope: 143,
        rating: 75.3,
        walkable: false,
        style: "resort",
        driveMinutes: 5,
        url: "https://www.genevanationalresort.com",
        highlight:
          "Gary Player's design philosophy on full display — strategic bunkering and elevation changes",
      },
      {
        name: "Geneva National - Trevino Course",
        tier: "premium",
        greenFeeRange: [99, 179],
        holes: 18,
        par: 72,
        yardage: 7120,
        slope: 138,
        rating: 74.6,
        walkable: false,
        style: "resort",
        driveMinutes: 5,
        url: "https://www.genevanationalresort.com",
        highlight:
          "Lee Trevino's only Midwest design — the most forgiving of the three but still plenty of teeth",
      },
      {
        name: "Grand Geneva Resort - The Brute",
        tier: "solid",
        greenFeeRange: [89, 159],
        holes: 18,
        par: 72,
        yardage: 6997,
        slope: 143,
        rating: 74.5,
        walkable: false,
        style: "resort",
        driveMinutes: 5,
        url: "https://www.grandgeneva.com",
        highlight:
          "Lives up to its name — a brawny resort course with tight fairways and demanding greens",
      },
      {
        name: "Grand Geneva Resort - The Highlands",
        tier: "solid",
        greenFeeRange: [69, 119],
        holes: 18,
        par: 71,
        yardage: 6308,
        slope: 128,
        rating: 71.0,
        walkable: true,
        style: "resort",
        driveMinutes: 5,
        url: "https://www.grandgeneva.com",
        highlight:
          "Links-inspired layout with Scottish-style mounding — more playable than The Brute",
      },
      {
        name: "Hawk's View Golf Club",
        tier: "solid",
        greenFeeRange: [59, 99],
        holes: 36,
        par: 72,
        yardage: 6904,
        slope: 132,
        rating: 73.2,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.hawksviewgolfclub.com",
        highlight:
          "36 holes — the Como Crossings links-style nine is the hidden gem in the Lake Geneva area",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [800, 2500],
        amenities: [
          "full kitchen",
          "lake views",
          "hot tub",
          "fire pit",
          "dock",
          "game room",
        ],
        areaDescription: "Lake Geneva lakefront and surrounding area",
        searchUrl:
          "https://www.vrbo.com/search?destination=Lake+Geneva%2C+Wisconsin&adults=16",
        notes:
          "Lakefront homes go fast in summer — book early. Properties on the lake path are walkable to town.",
      },
      {
        type: "resort-house",
        sleeps: [12, 16],
        nightlyRange: [500, 1200],
        amenities: [
          "full kitchen",
          "resort pool",
          "spa access",
          "golf on-site",
        ],
        areaDescription: "Grand Geneva Resort & Geneva National",
        searchUrl: "https://www.grandgeneva.com",
        notes:
          "Geneva National has large condos and homes; Grand Geneva has suites. Both walkable to first tees.",
      },
    ],
    dining: [
      {
        name: "Sopra Bistro",
        style: "italian",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Upscale Italian on Main Street with a great wine list and handmade pasta",
        reservationNeeded: true,
      },
      {
        name: "Geneva ChopHouse",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Prime steaks and an extensive bourbon list inside Grand Geneva Resort",
        reservationNeeded: true,
      },
      {
        name: "Oakfire Pizza",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Wood-fired Neapolitan pizza and craft cocktails — casual and group-friendly",
        reservationNeeded: false,
      },
      {
        name: "Hunt Club Steakhouse",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "White-tablecloth steakhouse at The Abbey Resort — lake views and classic supper club feel",
        reservationNeeded: true,
      },
      {
        name: "Egg Harbor Cafe",
        style: "casual",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Top breakfast spot — skillets, pancakes, and strong coffee before an early tee time",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Thumbs Up Pub",
        vibe: "dive",
        highlight:
          "Cash-only dive bar that's been a Lake Geneva institution — cheap drinks and pool",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Sprecher's Restaurant & Pub",
        vibe: "brewpub",
        highlight:
          "Sprecher craft beers on tap with solid pub food — lively on weekends",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Pier 290",
        vibe: "patio",
        highlight:
          "Lakefront bar with a massive patio — sunset cocktails right on Geneva Lake",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Topsy Turvy Brewery",
        vibe: "brewpub",
        highlight:
          "Local microbrewery with inventive beers and a chill taproom",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Geneva Lake Boat Tour",
        type: "boat-rental",
        duration: "2-3 hours",
        pricePerPerson: [35, 80],
        groupFriendly: true,
        highlight:
          "Cruise past Gilded Age mansions and historic estates — narrated tours or private pontoon rentals",
        bestFor: "rest day",
        provider: "Lake Geneva Cruise Line",
      },
      {
        name: "Timber Ridge Water Park",
        type: "water-sports",
        duration: "half day",
        pricePerPerson: [30, 55],
        groupFriendly: true,
        highlight:
          "Indoor/outdoor waterpark at Grand Geneva — slides, lazy river, wave pool",
        bestFor: "rest day",
        provider: "Grand Geneva Resort",
      },
      {
        name: "Lake Geneva Ziplines & Adventures",
        type: "zipline",
        duration: "2-3 hours",
        pricePerPerson: [50, 89],
        groupFriendly: true,
        highlight:
          "Zipline canopy tour through the woods — 9 lines and 2 sky bridges",
        bestFor: "rest day",
        provider: "Lake Geneva Canopy Tours",
      },
      {
        name: "Geneva Lake Brewing Company",
        type: "brewery",
        duration: "1-2 hours",
        pricePerPerson: [15, 30],
        groupFriendly: true,
        highlight:
          "Local craft brewery with tours and tastings — laid-back pre-dinner spot",
        bestFor: "arrival day",
        provider: "Geneva Lake Brewing Company",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 28],
        hourlyRate: [175, 300],
        providers: [
          "Lake Geneva Party Bus",
          "Above & Beyond Limousine",
          "Geneva Lakes Limo",
        ],
        notes:
          "Huge party bus market serving the Chicago weekend crowd — plenty of inventory year-round",
      },
      {
        type: "trolley",
        capacity: [20, 30],
        hourlyRate: [200, 350],
        providers: ["Lake Geneva Trolley"],
        notes:
          "Classic trolley runs through downtown and to the resorts — fun for a group dinner crawl",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 130],
        providers: [
          "Take a Chef",
          "Grand Geneva Catering",
          "Lake Geneva Personal Chef",
        ],
        mealTypes: [
          "steak dinner",
          "BBQ cookout",
          "brunch spread",
          "Wisconsin fish boil",
          "Italian family-style",
        ],
        notes:
          "Lakefront rental kitchens are usually well-equipped. Grand Geneva's catering can deliver to off-site properties.",
      },
    ],
  },

  // ─── 5. French Lick, IN ───────────────────────────────────────────
  {
    id: "french-lick-in",
    city: "French Lick",
    state: "IN",
    region: "Midwest",
    tagline: "Historic resort golf, casino, and bourbon country",
    description:
      "French Lick Resort has hosted everyone from Al Capone to FDR, and the golf matches the history. Pete Dye's hilltop masterpiece and the restored Donald Ross course deliver championship caliber, while the casino, spa, and proximity to bourbon country fill every off-course hour.",
    population: "tiny",
    nearestAirport: {
      code: "SDF",
      name: "Louisville Muhammad Ali International Airport",
      driveMinutes: 90,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "Pete Dye Course at French Lick",
        tier: "bucket-list",
        greenFeeRange: [199, 349],
        holes: 18,
        par: 72,
        yardage: 8102,
        slope: 151,
        rating: 78.4,
        walkable: false,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.frenchlick.com/golf",
        highlight:
          "Pete Dye's mountaintop opus — 300-foot elevation changes and panoramic Hoosier National Forest views",
      },
      {
        name: "Donald Ross Course at French Lick",
        tier: "premium",
        greenFeeRange: [129, 229],
        holes: 18,
        par: 70,
        yardage: 7082,
        slope: 136,
        rating: 74.1,
        walkable: true,
        style: "parkland",
        driveMinutes: 0,
        url: "https://www.frenchlick.com/golf",
        highlight:
          "Fully restored 1917 Donald Ross classic — hosted the 1924 PGA Championship (Walter Hagen won)",
      },
      {
        name: "Sultan's Run Golf Club",
        tier: "solid",
        greenFeeRange: [55, 89],
        holes: 18,
        par: 72,
        yardage: 6858,
        slope: 134,
        rating: 73.6,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.sultansrun.com",
        highlight:
          "Tim Liddy design through rolling hills and creeks — top public course in Indiana",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [12, 16],
        nightlyRange: [400, 1000],
        amenities: [
          "resort pool",
          "spa access",
          "casino",
          "golf on-site",
          "restaurants on-site",
        ],
        areaDescription: "French Lick Resort — West Baden Springs or French Lick Springs Hotel",
        searchUrl: "https://www.frenchlick.com",
        notes:
          "Book suites at both historic hotels or get a block of rooms. West Baden's atrium dome is a must-see. Group rates available for 12+.",
      },
      {
        type: "cabin",
        sleeps: [8, 14],
        nightlyRange: [300, 700],
        amenities: [
          "full kitchen",
          "fire pit",
          "hot tub",
          "wooded setting",
          "grill",
        ],
        areaDescription: "Patoka Lake and surrounding Hoosier National Forest",
        searchUrl:
          "https://www.vrbo.com/search?destination=French+Lick%2C+Indiana&adults=12",
        notes:
          "Cabin rentals near Patoka Lake are 15-20 min from the resort — more private, great for groups that want their own space",
      },
    ],
    dining: [
      {
        name: "1875 - The Steakhouse",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "The resort's flagship — dry-aged steaks, tableside Caesar, and an excellent bourbon list",
        reservationNeeded: true,
      },
      {
        name: "Hagen's Club House",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Clubhouse dining at the Donald Ross Course — great for post-round burgers and beers",
        reservationNeeded: false,
      },
      {
        name: "33 Brick Street",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "New American in a converted brick building — seasonal menus and craft cocktails",
        reservationNeeded: true,
      },
      {
        name: "West Baden Springs Dining Room",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Fine dining under West Baden's legendary 200-foot atrium dome — unforgettable setting",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "West Baden Casino Bar",
        vibe: "casino-bar",
        highlight:
          "Cocktails and gambling under the historic dome — the most dramatic bar setting in the Midwest",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Lobby Bar at French Lick Springs",
        vibe: "cocktail",
        highlight:
          "Classic cocktails in a grand historic lobby — bourbon flights are the move",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Power Plant Bar & Grill",
        vibe: "sports-bar",
        highlight:
          "Casual bar near the casino floor — watch games and play some hands",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "French Lick Casino",
        type: "casino",
        duration: "2-4 hours",
        pricePerPerson: [0, 200],
        groupFriendly: true,
        highlight:
          "Full casino with table games, slots, and poker — right inside the resort",
        bestFor: "arrival day",
        provider: "French Lick Resort",
      },
      {
        name: "French Lick Winery",
        type: "winery",
        duration: "1-2 hours",
        pricePerPerson: [10, 25],
        groupFriendly: true,
        highlight:
          "Award-winning wines from Indiana grapes — tasting room on a hilltop with great views",
        bestFor: "arrival day",
        provider: "French Lick Winery",
      },
      {
        name: "Patoka Lake Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [50, 120],
        groupFriendly: true,
        highlight:
          "8,800-acre reservoir stocked with bass, walleye, and catfish — boat rentals available",
        bestFor: "rest day",
        provider: "Patoka Lake Marina",
      },
      {
        name: "West Baden Springs Spa",
        type: "spa",
        duration: "2-3 hours",
        pricePerPerson: [75, 200],
        groupFriendly: true,
        highlight:
          "Full-service spa in the historic West Baden Springs Hotel — mineral baths, massages, sauna",
        bestFor: "rest day",
        provider: "French Lick Resort",
      },
      {
        name: "Kentucky Bourbon Trail Day Trip",
        type: "distillery",
        duration: "full day",
        pricePerPerson: [50, 150],
        groupFriendly: true,
        highlight:
          "Maker's Mark, Jim Beam, and others are 90 min south — combine with a rest day",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [12, 20],
        hourlyRate: [100, 175],
        providers: [
          "French Lick Resort Transportation",
          "Hoosier Hills Limo",
        ],
        notes:
          "The resort runs its own trolley between properties. For off-site trips, book a private shuttle from the Louisville area.",
      },
      {
        type: "party-bus",
        capacity: [14, 24],
        hourlyRate: [175, 300],
        providers: [
          "Derby City Limousine (Louisville)",
          "Elite Limousine (Evansville)",
        ],
        notes:
          "Party buses come from Louisville or Evansville — book early and confirm they'll service French Lick (rural area).",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 130],
        providers: [
          "Take a Chef",
          "French Lick Resort Catering",
        ],
        mealTypes: [
          "steak dinner",
          "BBQ cookout",
          "bourbon-paired dinner",
          "breakfast",
          "southern comfort",
        ],
        notes:
          "The resort's catering handles private group events in dedicated dining spaces. For cabin rentals, book an independent chef through Take a Chef.",
      },
    ],
  },

  // ─── 6. Duluth, MN ────────────────────────────────────────────────
  {
    id: "duluth-mn",
    city: "Duluth",
    state: "MN",
    region: "Midwest",
    tagline: "North Shore golf with Lake Superior as your backdrop",
    description:
      "Duluth sits where the forests meet Lake Superior, offering rugged beauty and a no-frills golf trip vibe. Superior National headlines a solid collection of affordable courses, while the city's booming brewery scene and North Shore adventures keep the trip full.",
    population: "medium",
    nearestAirport: {
      code: "DLH",
      name: "Duluth International Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["summer"],
    courses: [
      {
        name: "Superior National at Lutsen",
        tier: "premium",
        greenFeeRange: [79, 125],
        holes: 27,
        par: 72,
        yardage: 6553,
        slope: 138,
        rating: 72.4,
        walkable: false,
        style: "mountain",
        driveMinutes: 80,
        url: "https://www.superiornational.com",
        highlight:
          "27 holes carved through Sawtooth Mountains birch forest — the crown jewel of Minnesota golf",
      },
      {
        name: "Enger Park Golf Course",
        tier: "budget",
        greenFeeRange: [35, 50],
        holes: 27,
        par: 72,
        yardage: 6349,
        slope: 122,
        rating: 70.3,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.golfduluth.com",
        highlight:
          "City muni with stunning Lake Superior panoramas — best bang-for-buck views in Midwest golf",
      },
      {
        name: "Lester Park Golf Course",
        tier: "budget",
        greenFeeRange: [35, 50],
        holes: 27,
        par: 72,
        yardage: 6484,
        slope: 127,
        rating: 71.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.golfduluth.com",
        highlight:
          "Scenic 27-hole layout along Lester River — tight tree-lined holes and excellent value",
      },
      {
        name: "Ridgeview Country Club",
        tier: "solid",
        greenFeeRange: [45, 70],
        holes: 18,
        par: 71,
        yardage: 6232,
        slope: 126,
        rating: 70.2,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        highlight:
          "Semi-private club open to public play — well-maintained fairways and fast greens",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [500, 1500],
        amenities: [
          "full kitchen",
          "lake views",
          "fire pit",
          "hot tub",
          "sauna",
          "deck",
        ],
        areaDescription: "Park Point and North Shore lakefront properties",
        searchUrl:
          "https://www.vrbo.com/search?destination=Duluth%2C+Minnesota&adults=16",
        notes:
          "Park Point has beach homes on a sandy peninsula. North Shore cabins (toward Two Harbors) are more secluded.",
      },
      {
        type: "cabin",
        sleeps: [8, 12],
        nightlyRange: [300, 800],
        amenities: [
          "full kitchen",
          "fireplace",
          "sauna",
          "wooded setting",
          "lake access",
        ],
        areaDescription: "North Shore Highway 61 corridor",
        searchUrl:
          "https://www.airbnb.com/s/North-Shore--Minnesota/homes?adults=12",
        notes:
          "May need two cabins for 16. Closer to Superior National at Lutsen if you stay further up the shore.",
      },
    ],
    dining: [
      {
        name: "Boat Club Restaurant",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Fine dining in the historic Duluth Harbor — walleye, lake trout, and great steaks",
        reservationNeeded: true,
      },
      {
        name: "Zeitgeist Cafe & Kunst",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Arts-oriented eatery with seasonal menus and an artsy vibe — one of Duluth's best",
        reservationNeeded: true,
      },
      {
        name: "Duluth Grill",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Farm-to-table diner with massive portions — benedicts, burgers, and locally sourced everything",
        reservationNeeded: false,
      },
      {
        name: "Valentini's Supper Club",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Old-school Italian supper club — family-style pasta and meatballs, BYOB allowed",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Bent Paddle Brewing",
        vibe: "brewpub",
        highlight:
          "Duluth's flagship brewery — Cold Press Black, Bent Hop IPA, spacious taproom with games",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Hoops Brewing",
        vibe: "brewpub",
        highlight:
          "Small-batch brewery from a legendary local brewmaster — rotating taps and a cozy taproom",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Sir Benedict's Tavern",
        vibe: "dive",
        highlight:
          "Live music every night in a cozy basement bar — folk, bluegrass, and open mics",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Carmody Irish Pub",
        vibe: "sports-bar",
        highlight:
          "Irish pub vibes with a great beer list and TVs — solid late-night spot",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Vikre Distillery Cocktail Room",
        vibe: "cocktail",
        highlight:
          "Craft gin and aquavit distillery with a gorgeous cocktail room on the harbor",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Duluth Brewery Trail",
        type: "brewery",
        duration: "3-4 hours",
        pricePerPerson: [20, 50],
        groupFriendly: true,
        highlight:
          "Bent Paddle, Hoops, Castle Danger, Ursa Minor, Earth Rider — Duluth is a craft beer powerhouse",
        bestFor: "arrival day",
      },
      {
        name: "Lake Superior Charter Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [125, 200],
        groupFriendly: true,
        highlight:
          "Chase lake trout and salmon on the biggest Great Lake — book multiple boats for the full crew",
        bestFor: "rest day",
        provider: "Duluth Charter Fishing",
      },
      {
        name: "North Shore Scenic Drive & Hike",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [0, 10],
        groupFriendly: true,
        highlight:
          "Drive Highway 61 and hike Gooseberry Falls, Split Rock Lighthouse, or Tettegouche State Park",
        bestFor: "rest day",
      },
      {
        name: "Kayak Lake Superior",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [50, 85],
        groupFriendly: true,
        highlight:
          "Sea kayak along the shore and into sea caves — guided tours available for all skill levels",
        bestFor: "morning before golf",
        provider: "Spirit of the Lake Kayak",
      },
      {
        name: "Vikre Distillery Tour",
        type: "distillery",
        duration: "1-2 hours",
        pricePerPerson: [15, 25],
        groupFriendly: true,
        highlight:
          "Tour a harbor-front craft distillery making gin, aquavit, and whiskey from local grains",
        bestFor: "arrival day",
        provider: "Vikre Distillery",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 24],
        hourlyRate: [150, 250],
        providers: [
          "Duluth Party Bus",
          "North Shore Limousine",
          "Premier Transportation Duluth",
        ],
        notes:
          "Factor in the 80-min drive to Superior National when booking — you'll want transport for a full day up the shore.",
      },
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [100, 175],
        providers: ["North Shore Navigator", "Duluth Transit Charter"],
        notes:
          "Sprinter vans work well for the brewery crawl — most taprooms are spread around town, not walkable between all of them",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [55, 110],
        providers: [
          "Take a Chef",
          "Northern Waters Catering",
          "At Sara's Table Catering",
        ],
        mealTypes: [
          "walleye shore lunch",
          "steak dinner",
          "BBQ cookout",
          "smoked fish spread",
          "breakfast",
        ],
        notes:
          "Smoked lake fish and wild rice are the local specialties. Northern Waters Smokehaus does incredible fish — ask about catering platters.",
      },
    ],
  },

  // ─── 7. Harbor Springs / Petoskey, MI ─────────────────────────────
  {
    id: "harbor-springs-petoskey-mi",
    city: "Harbor Springs / Petoskey",
    state: "MI",
    region: "Midwest",
    tagline: "Northern Michigan's resort golf corridor",
    description:
      "The Harbor Springs–Petoskey stretch along Little Traverse Bay is old-money Michigan resort country with exceptional golf to match. Bay Harbor's dramatic lakeside holes, Boyne Highlands' four courses, and charming harbor towns create a premium trip that still feels unpretentious.",
    population: "small",
    nearestAirport: {
      code: "PLN",
      name: "Pellston Regional Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Bay Harbor Golf Club - Links/Quarry/Preserve",
        tier: "premium",
        greenFeeRange: [130, 225],
        holes: 27,
        par: 72,
        yardage: 6820,
        slope: 142,
        rating: 74.2,
        walkable: false,
        style: "links",
        driveMinutes: 15,
        url: "https://www.bayharborgolf.com",
        highlight:
          "Arthur Hills design — the Links nine is perched on Lake Michigan bluffs with postcard views on every hole",
      },
      {
        name: "Crooked Tree Golf Club",
        tier: "solid",
        greenFeeRange: [69, 119],
        holes: 18,
        par: 71,
        yardage: 6596,
        slope: 137,
        rating: 72.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.crookedtreegolfclub.com",
        highlight:
          "Harry Bowers design through hardwood forest with dramatic elevation changes — overlooking Little Traverse Bay",
      },
      {
        name: "Little Traverse Bay Golf Club",
        tier: "solid",
        greenFeeRange: [59, 99],
        holes: 18,
        par: 72,
        yardage: 6903,
        slope: 132,
        rating: 73.4,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.ltbgc.com",
        highlight:
          "Jeff Gorney design with wide fairways and great conditioning — excellent value for northern Michigan",
      },
      {
        name: "Boyne Highlands - The Heather",
        tier: "premium",
        greenFeeRange: [99, 169],
        holes: 18,
        par: 72,
        yardage: 7210,
        slope: 140,
        rating: 75.0,
        walkable: false,
        style: "resort",
        driveMinutes: 10,
        url: "https://www.boyne.com/boyne-highlands",
        highlight:
          "Robert Trent Jones Sr. design — the flagship of Boyne's four courses, tournament-worthy conditioning",
      },
      {
        name: "Boyne Highlands - Arthur Hills",
        tier: "premium",
        greenFeeRange: [89, 149],
        holes: 18,
        par: 72,
        yardage: 6890,
        slope: 138,
        rating: 73.8,
        walkable: false,
        style: "resort",
        driveMinutes: 10,
        url: "https://www.boyne.com/boyne-highlands",
        highlight:
          "Strategic bunkering and rolling terrain — plays slightly easier than The Heather but just as scenic",
      },
      {
        name: "Boyne Highlands - The Moor",
        tier: "solid",
        greenFeeRange: [69, 119],
        holes: 18,
        par: 72,
        yardage: 7179,
        slope: 133,
        rating: 74.0,
        walkable: false,
        style: "resort",
        driveMinutes: 10,
        url: "https://www.boyne.com/boyne-highlands",
        highlight:
          "Longest of the four courses — wide fairways through meadows, great for scoring",
      },
      {
        name: "Boyne Highlands - Donald Ross Memorial",
        tier: "solid",
        greenFeeRange: [69, 119],
        holes: 18,
        par: 72,
        yardage: 6840,
        slope: 135,
        rating: 73.2,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.boyne.com/boyne-highlands",
        highlight:
          "Tribute to classic Ross design — replica holes from Pinehurst, Seminole, and Oakland Hills",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [800, 2500],
        amenities: [
          "full kitchen",
          "lake views",
          "fire pit",
          "hot tub",
          "dock",
          "game room",
        ],
        areaDescription:
          "Harbor Springs, Bay Harbor, and Petoskey lakefront",
        searchUrl:
          "https://www.vrbo.com/search?destination=Harbor+Springs%2C+Michigan&adults=16",
        notes:
          "Bay Harbor condos are walkable to the course. Harbor Springs has large waterfront homes. Book 6+ months out for summer.",
      },
      {
        type: "lodge",
        sleeps: [12, 16],
        nightlyRange: [500, 1200],
        amenities: [
          "golf on-site",
          "pool",
          "spa",
          "restaurants",
          "fitness center",
        ],
        areaDescription: "Boyne Highlands Resort",
        searchUrl: "https://www.boyne.com/boyne-highlands",
        notes:
          "Condo suites and chalets at the resort — walkable to all four courses. Group packages with golf included.",
      },
    ],
    dining: [
      {
        name: "Chandler's: A Restaurant",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Petoskey's best steakhouse — dry-aged prime beef, Great Lakes fish, and an outstanding wine cellar",
        reservationNeeded: true,
      },
      {
        name: "Stafford's Pier Restaurant",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Waterfront dining in Harbor Springs — lake perch, whitefish, and sunset views over the harbor",
        reservationNeeded: true,
      },
      {
        name: "City Park Grill",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Hemingway's old hangout in downtown Petoskey — great burgers, craft beer, and historical charm",
        reservationNeeded: false,
      },
      {
        name: "Palette Bistro",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Creative seasonal menus with local ingredients — small plates and excellent cocktails",
        reservationNeeded: true,
      },
      {
        name: "The New York Restaurant",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Harbor Springs institution since 1904 — classic supper club with steaks and seafood",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Beards Brewery",
        vibe: "brewpub",
        highlight:
          "Petoskey's best taproom — solid IPAs and stouts in a relaxed downtown space",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "City Park Grill Bar",
        vibe: "whiskey-bar",
        highlight:
          "Hemingway drank here — beautiful historic bar with craft cocktails and Michigan spirits",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Noggin Room at Stafford's Perry Hotel",
        vibe: "cocktail",
        highlight:
          "Upscale hotel bar with a fireplace and old-world feel — bourbon and classic cocktails",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Barrel Back Restaurant & Bar",
        vibe: "patio",
        highlight:
          "Walloon Lake waterfront bar — fire pits, dock seating, and sunset drinks",
        lateNight: false,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Lake Charlevoix Boat Rental",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [60, 120],
        groupFriendly: true,
        highlight:
          "Pontoon or speedboat on one of Michigan's most beautiful inland lakes — swimming, tubing, and coves",
        bestFor: "rest day",
        provider: "Irish Boat Shop",
      },
      {
        name: "Petoskey Wine Region Tour",
        type: "winery",
        duration: "half day",
        pricePerPerson: [30, 75],
        groupFriendly: true,
        highlight:
          "Mackinaw Trail Winery, Petoskey Farms Vineyard, and others — Michigan's northern wine region",
        bestFor: "rest day",
        provider: "Petoskey Wine Tours",
      },
      {
        name: "Little Traverse Bay Kayaking",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [40, 70],
        groupFriendly: true,
        highlight:
          "Paddle crystal-clear Little Traverse Bay — Petoskey stone hunting along the shore",
        bestFor: "morning before golf",
        provider: "Bear River Canoe & Kayak",
      },
      {
        name: "Petoskey Brewery Crawl",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [20, 40],
        groupFriendly: true,
        highlight:
          "Beards Brewery, Petoskey Brewing, and taprooms all within walking distance downtown",
        bestFor: "arrival day",
      },
      {
        name: "Headlands International Dark Sky Park",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 10],
        groupFriendly: true,
        highlight:
          "One of the darkest spots east of the Mississippi — incredible stargazing from Lake Michigan bluffs",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 24],
        hourlyRate: [175, 275],
        providers: [
          "Northern Michigan Party Bus",
          "Little Traverse Limousine",
        ],
        notes:
          "Smaller market — book early for summer weekends. Most operators cover Harbor Springs to Charlevoix corridor.",
      },
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [125, 200],
        providers: ["Boyne Country Transportation", "Resort Express"],
        notes:
          "Boyne Highlands offers resort shuttles. Sprinter vans work well for bouncing between Harbor Springs, Petoskey, and the courses.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 140],
        providers: [
          "Take a Chef",
          "Harbor Springs Catering Co",
          "Boyne Resort Catering",
        ],
        mealTypes: [
          "Great Lakes fish dinner",
          "steak dinner",
          "BBQ cookout",
          "farm-to-table tasting",
          "breakfast",
        ],
        notes:
          "Lake whitefish, morel mushrooms (spring), and cherries are the local stars. Boyne's catering arm handles resort property events.",
      },
    ],
  },

  // ─── 8. Grand Rapids, MI ───────────────────────────────────────────
  {
    id: "grand-rapids-mi",
    city: "Grand Rapids",
    state: "MI",
    region: "Midwest",
    tagline: "Beer City USA meets surprisingly great golf",
    description:
      "Grand Rapids is a craft beer powerhouse with 80+ breweries, a walkable downtown, and access to excellent west Michigan golf. Courses range from championship-caliber to affordable hidden gems, and the Airbnb/VRBO scene in the surrounding lake neighborhoods can easily sleep a large crew.",
    population: "medium",
    nearestAirport: {
      code: "GRR",
      name: "Gerald R. Ford International Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "Thousand Oaks Golf Club",
        tier: "solid",
        greenFeeRange: [45, 75],
        holes: 18,
        par: 72,
        yardage: 6901,
        slope: 133,
        rating: 73.2,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.thousandoaksgolfclub.com",
        highlight:
          "Best public value in the GR metro — mature trees, rolling terrain, and consistently excellent greens",
      },
      {
        name: "Pilgrims Run Golf Club",
        tier: "premium",
        greenFeeRange: [59, 99],
        holes: 18,
        par: 72,
        yardage: 6889,
        slope: 140,
        rating: 73.6,
        walkable: true,
        style: "heathland",
        driveMinutes: 25,
        url: "https://www.pilgrimsrun.com",
        highlight:
          "Walk-only heathland design through native fescue and wildflowers — feels like Scotland on a Michigan budget",
      },
      {
        name: "The Mines Golf Course",
        tier: "solid",
        greenFeeRange: [42, 69],
        holes: 18,
        par: 72,
        yardage: 6901,
        slope: 131,
        rating: 72.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.theminesgolf.com",
        highlight:
          "Built on reclaimed sand mine land — unique elevation changes and wide fairways make it fun for all skill levels",
      },
      {
        name: "Egypt Valley Country Club (public days)",
        tier: "premium",
        greenFeeRange: [65, 110],
        holes: 18,
        par: 72,
        yardage: 6975,
        slope: 137,
        rating: 73.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "Semi-private club that opens to the public — championship conditioning in a beautiful hardwood setting",
      },
      {
        name: "Ravines Golf Club",
        tier: "premium",
        greenFeeRange: [55, 95],
        holes: 18,
        par: 72,
        yardage: 6655,
        slope: 137,
        rating: 72.6,
        walkable: true,
        style: "parkland",
        driveMinutes: 30,
        url: "https://www.ravinesgolfclub.com",
        highlight:
          "Dramatic ravine crossings and elevation drops through dense Michigan forest — the most scenic track in the area",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [600, 1500],
        amenities: [
          "full kitchen",
          "hot tub",
          "fire pit",
          "game room",
          "parking",
          "grill",
        ],
        areaDescription: "East Grand Rapids and Reeds Lake area",
        searchUrl:
          "https://www.vrbo.com/search?destination=Grand+Rapids%2C+Michigan&adults=16",
        notes:
          "East GR lakefront homes sleep 12-16 and are 10 min from downtown. Also check Ada and Cascade for larger estates.",
      },
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [400, 1000],
        amenities: ["full kitchen", "parking", "grill", "washer/dryer"],
        areaDescription: "Heritage Hill and Eastown neighborhoods",
        searchUrl:
          "https://www.airbnb.com/s/Grand-Rapids--Michigan/homes?adults=14",
        notes:
          "Historic neighborhoods walkable to downtown breweries. May need two houses for 16+.",
      },
    ],
    dining: [
      {
        name: "The Chop House",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Downtown GR's premier steakhouse — dry-aged beef, private dining room for groups",
        reservationNeeded: true,
      },
      {
        name: "HopCat",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "130 taps of craft beer and their famous Crack Fries — the original location of the now-national chain",
        reservationNeeded: false,
      },
      {
        name: "San Chez Bistro",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Tapas-style shared plates — perfect for a big group that wants variety and a festive vibe",
        reservationNeeded: true,
      },
      {
        name: "Leo's Seafood",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Best seafood in west Michigan — oyster bar, Great Lakes fish, and strong cocktails",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Founders Brewing Co.",
        vibe: "brewpub",
        highlight:
          "World-famous taproom where KBS and All Day IPA were born — massive space perfect for groups",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Brewery Vivant",
        vibe: "brewpub",
        highlight:
          "Belgian-inspired brewery in a converted funeral chapel — farmhouse ales and outstanding food",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Reserve Wine & Food Bar",
        vibe: "cocktail",
        highlight:
          "Upscale cocktail lounge with exposed brick and a curated wine list — great for a nightcap",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Stella's Lounge",
        vibe: "dive",
        highlight:
          "Award-winning burgers, pinball machines, and cheap whiskey — the best dive bar in Michigan",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Grand Rapids Brewery Tour",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [25, 50],
        groupFriendly: true,
        highlight:
          "Hit Founders, Brewery Vivant, Perrin, and more — Beer City USA lives up to the name",
        bestFor: "arrival day",
      },
      {
        name: "Grand River Kayaking",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [35, 60],
        groupFriendly: true,
        highlight:
          "Paddle the Grand River through downtown — urban kayaking with a surprisingly scenic stretch",
        bestFor: "morning before golf",
        provider: "Grand Rapids Kayak",
      },
      {
        name: "Craig's Cruisers Go-Karts",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [25, 50],
        groupFriendly: true,
        highlight:
          "Multi-level go-kart tracks, mini golf, and arcade — competitive group fun",
        bestFor: "rest day",
        provider: "Craig's Cruisers",
      },
      {
        name: "Robinette's Apple Haus & Winery",
        type: "winery",
        duration: "2-3 hours",
        pricePerPerson: [10, 30],
        groupFriendly: true,
        highlight:
          "Michigan winery with hard cider tastings, corn maze (fall), and apple cannons",
        bestFor: "rest day",
        provider: "Robinette's",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 28],
        hourlyRate: [175, 300],
        providers: ["West Michigan Party Bus", "GR Limo & Party Bus"],
        notes:
          "Brewery crawl packages available. Most operators know the Founders-Vivant-Perrin circuit well.",
      },
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [125, 200],
        providers: ["Grand Rapids Shuttle", "West Michigan Rides"],
        notes:
          "Sprinter vans work great for course-to-house-to-downtown loops.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [55, 120],
        providers: ["Take a Chef", "West Michigan Catering Co"],
        mealTypes: [
          "steak dinner",
          "BBQ cookout",
          "Michigan cherry-themed dinner",
          "breakfast",
        ],
        notes:
          "Local specialty is anything with Montmorency cherries. Craft beer pairings are a popular add-on.",
      },
    ],
  },

  // ─── 9. Door County, WI ───────────────────────────────────────────
  {
    id: "door-county-wi",
    city: "Door County",
    state: "WI",
    region: "Midwest",
    tagline: "The Cape Cod of the Midwest with links to match",
    description:
      "Door County is a narrow peninsula jutting into Lake Michigan with charming harbor towns, fish boils, cherry orchards, and waterfront golf. The pace is slow, the scenery is stunning, and the group house inventory along the bay is ideal for a crew of 12-16.",
    population: "small",
    nearestAirport: {
      code: "GRB",
      name: "Green Bay Austin Straubel International Airport",
      driveMinutes: 60,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Horseshoe Bay Golf Club",
        tier: "premium",
        greenFeeRange: [69, 110],
        holes: 18,
        par: 72,
        yardage: 6662,
        slope: 130,
        rating: 72.4,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.horseshoebaygolfclub.com",
        highlight:
          "Door County's premier course — mature hardwoods and bay glimpses on a classic Midwest layout",
      },
      {
        name: "Peninsula State Park Golf Course",
        tier: "solid",
        greenFeeRange: [39, 62],
        holes: 18,
        par: 71,
        yardage: 6348,
        slope: 123,
        rating: 70.4,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.peninsulagolf.org",
        highlight:
          "State park course with Eagle Bluff views over Green Bay — one of the most scenic budget rounds in the Midwest",
      },
      {
        name: "Idlewild Golf Course",
        tier: "solid",
        greenFeeRange: [35, 55],
        holes: 18,
        par: 72,
        yardage: 6576,
        slope: 126,
        rating: 71.2,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.idlewildgolf.com",
        highlight:
          "Sturgeon Bay's solid daily-fee course — well-conditioned with a friendly pace for a fun round",
      },
      {
        name: "Cherry Hills Golf Course",
        tier: "budget",
        greenFeeRange: [29, 45],
        holes: 18,
        par: 72,
        yardage: 6430,
        slope: 121,
        rating: 69.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        highlight:
          "Affordable Sturgeon Bay track through cherry orchards — low-pressure warm-up round",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [700, 2200],
        amenities: [
          "full kitchen",
          "lake views",
          "fire pit",
          "hot tub",
          "dock",
          "kayaks",
        ],
        areaDescription: "Egg Harbor, Fish Creek, and Ephraim waterfront",
        searchUrl:
          "https://www.vrbo.com/search?destination=Door+County%2C+Wisconsin&adults=16",
        notes:
          "Fish Creek and Egg Harbor have the best large-home inventory. Book 6+ months out for July/August. Many homes come with kayaks and bikes.",
      },
      {
        type: "cabin",
        sleeps: [10, 14],
        nightlyRange: [400, 1000],
        amenities: [
          "full kitchen",
          "fire pit",
          "grill",
          "wooded setting",
          "parking",
        ],
        areaDescription: "Baileys Harbor and Jacksonport",
        searchUrl:
          "https://www.airbnb.com/s/Door-County--Wisconsin/homes?adults=14",
        notes:
          "The quiet side of the peninsula — larger cabin properties with more privacy. 15-20 min to Fish Creek action.",
      },
    ],
    dining: [
      {
        name: "White Gull Inn",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Famous Door County fish boil with the dramatic fire flare — a must-do group experience",
        reservationNeeded: true,
      },
      {
        name: "Mr. Helsinki",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Scandinavian-inspired small plates with local ingredients — the best fine dining on the peninsula",
        reservationNeeded: true,
      },
      {
        name: "Wild Tomato Wood-Fired Pizza",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Fish Creek staple — excellent wood-fired pizza and local cherry salads on a big patio",
        reservationNeeded: false,
      },
      {
        name: "The Cookery",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Fish Creek's go-to for whitefish, cherry pie, and hearty breakfasts",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Husby's Food & Spirits",
        vibe: "dive",
        highlight:
          "Sister Bay's legendary dive bar — cheap drinks, live music, and the social hub of Door County",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Door County Brewing Co.",
        vibe: "brewpub",
        highlight:
          "Taproom and music hall in Baileys Harbor — local brews and a great outdoor stage",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Bayside Tavern",
        vibe: "sports-bar",
        highlight:
          "Fish Creek's main sports bar — burgers, beers, and TVs for catching the game after golf",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Garage Bar at Top Deck",
        vibe: "patio",
        highlight:
          "Rooftop/deck bar in Sister Bay — great cocktails with views of the marina",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Door County Fish Boil",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [20, 35],
        groupFriendly: true,
        highlight:
          "A Door County tradition — whitefish, potatoes, and onions boiled over an open fire with the dramatic 'boilover' finale",
        bestFor: "arrival day",
        provider: "White Gull Inn / Pelletier's",
      },
      {
        name: "Cave Point County Park Kayaking",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [45, 80],
        groupFriendly: true,
        highlight:
          "Paddle through sea caves and along dramatic limestone cliffs on Lake Michigan",
        bestFor: "rest day",
        provider: "Door County Kayak Tours",
      },
      {
        name: "Door County Wine Trail",
        type: "winery",
        duration: "half day",
        pricePerPerson: [25, 60],
        groupFriendly: true,
        highlight:
          "Simon Creek, Door Peninsula Winery, and a half-dozen others — cherry wine is the local specialty",
        bestFor: "rest day",
      },
      {
        name: "Peninsula State Park Biking",
        type: "mountain-biking",
        duration: "2-3 hours",
        pricePerPerson: [15, 35],
        groupFriendly: true,
        highlight:
          "Scenic paved and mountain bike trails through 3,776 acres of forests and bluffs",
        bestFor: "morning before golf",
        provider: "Nor Door Sport & Cyclery",
      },
    ],
    partyBuses: [
      {
        type: "trolley",
        capacity: [14, 24],
        hourlyRate: [175, 275],
        providers: ["Door County Trolley"],
        notes:
          "The trolley is a Door County institution — wine tours, scenic tours, and custom group charters along the peninsula.",
      },
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [100, 175],
        providers: ["Door County Tours", "Peninsula Shuttle"],
        notes:
          "Smaller market — sprinter vans and trolleys are the main options. Book early for summer.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [55, 120],
        providers: ["Take a Chef", "Door County Catering"],
        mealTypes: [
          "fish boil dinner",
          "cherry-glazed pork",
          "steak dinner",
          "BBQ cookout",
          "breakfast",
        ],
        notes:
          "Door County cherries and fresh Lake Michigan whitefish are the local stars. Many chefs will do a traditional fish boil at your rental.",
      },
    ],
  },

  // ─── 10. Madison, WI ──────────────────────────────────────────────
  {
    id: "madison-wi",
    city: "Madison",
    state: "WI",
    region: "Midwest",
    tagline: "College-town energy with championship-caliber public golf",
    description:
      "Madison punches above its weight with a walkable downtown isthmus between two lakes, a top-tier food and bar scene driven by UW-Madison, and several excellent public courses. University Ridge hosted the NCAA Division I championships and Steve Stricker's AmFam Championship is a PGA Tour Champions stop.",
    population: "medium",
    nearestAirport: {
      code: "MSN",
      name: "Dane County Regional Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "University Ridge Golf Course",
        tier: "premium",
        greenFeeRange: [69, 115],
        holes: 18,
        par: 72,
        yardage: 6888,
        slope: 142,
        rating: 73.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.universityridge.com",
        highlight:
          "Home of the AmFam Championship — Robert Trent Jones Jr. design with tournament conditioning and stunning views of the Wisconsin hills",
      },
      {
        name: "The Oaks Golf Course",
        tier: "solid",
        greenFeeRange: [42, 70],
        holes: 18,
        par: 72,
        yardage: 6889,
        slope: 132,
        rating: 73.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.theoaksgc.com",
        highlight:
          "Cottage Grove's well-conditioned track through oak groves — great value and excellent greens",
      },
      {
        name: "Hawks Landing Golf Club",
        tier: "solid",
        greenFeeRange: [49, 79],
        holes: 18,
        par: 72,
        yardage: 6805,
        slope: 130,
        rating: 72.6,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.hawkslandinggolf.com",
        highlight:
          "Arnold Palmer design on the west side — great for groups with a comfortable layout and strong facilities",
      },
      {
        name: "Pleasant View Golf Course",
        tier: "budget",
        greenFeeRange: [35, 55],
        holes: 27,
        par: 72,
        yardage: 6710,
        slope: 127,
        rating: 71.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.pleasantviewgc.com",
        highlight:
          "27-hole county facility — excellent conditioning for the price, great warm-up or double-round option",
      },
      {
        name: "The Legend at Bergamont",
        tier: "premium",
        greenFeeRange: [55, 89],
        holes: 18,
        par: 72,
        yardage: 6845,
        slope: 135,
        rating: 73.1,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.legendatbergamont.com",
        highlight:
          "Oregon, WI gem with dramatic elevation and wooded holes — feels more northern Wisconsin than suburban Madison",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [600, 1800],
        amenities: [
          "full kitchen",
          "lake views",
          "fire pit",
          "dock",
          "hot tub",
          "parking",
        ],
        areaDescription: "Lake Mendota and Lake Monona shoreline",
        searchUrl:
          "https://www.vrbo.com/search?destination=Madison%2C+Wisconsin&adults=16",
        notes:
          "Lakefront homes on Mendota or Monona are ideal. The Maple Bluff neighborhood has large estates 10 min from downtown and courses.",
      },
      {
        type: "house",
        sleeps: [10, 14],
        nightlyRange: [400, 1000],
        amenities: [
          "full kitchen",
          "parking",
          "grill",
          "washer/dryer",
          "game room",
        ],
        areaDescription: "Middleton and Verona suburbs",
        searchUrl:
          "https://www.airbnb.com/s/Madison--Wisconsin/homes?adults=14",
        notes:
          "Western suburbs put you closer to University Ridge and Hawks Landing. Newer inventory with good space for groups.",
      },
    ],
    dining: [
      {
        name: "Tornado Steak House",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Madison institution — old-school supper club with huge steaks, strong pours, and a retro vibe",
        reservationNeeded: true,
      },
      {
        name: "The Old Fashioned",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Wisconsin comfort food — cheese curds, brats, Friday fish fry, and the state's best brandy Old Fashioned",
        reservationNeeded: false,
      },
      {
        name: "Heritage Tavern",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Refined farm-to-table on Capitol Square — creative seasonal menus with Wisconsin ingredients",
        reservationNeeded: true,
      },
      {
        name: "Graze",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Dane County farmers' market-driven menu right on the Capitol Square — great brunch spot too",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "The Tipsy Cow",
        vibe: "dive",
        highlight:
          "Capitol Square dive with strong drinks and a rowdy late-night scene — classic college-town energy",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Karben4 Brewing",
        vibe: "brewpub",
        highlight:
          "Madison's favorite taproom — creative brews, trivia nights, and a spacious beer garden",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Merchant",
        vibe: "cocktail",
        highlight:
          "Prohibition-era craft cocktail bar — exposed brick, dim lighting, and expertly made drinks",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Terrace at Memorial Union",
        vibe: "patio",
        highlight:
          "UW-Madison's legendary lakeside terrace — pitchers of Spotted Cow and sunset views over Lake Mendota",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Capitol Square Bar Crawl",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [20, 40],
        groupFriendly: true,
        highlight:
          "Walk the full square hitting dive bars, cocktail lounges, and brewpubs — everything is within blocks",
        bestFor: "arrival day",
      },
      {
        name: "Lake Mendota Boat Rental",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [40, 80],
        groupFriendly: true,
        highlight:
          "Pontoon or speedboat on Lake Mendota — swimming, tubing, and views of the Capitol dome",
        bestFor: "rest day",
        provider: "Betty Lou Cruises / Marshall Boats",
      },
      {
        name: "Vitense Golfland",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [15, 35],
        groupFriendly: true,
        highlight:
          "Driving range, mini golf, go-karts, and batting cages — competitive group warm-up",
        bestFor: "arrival day",
        provider: "Vitense Golfland",
      },
      {
        name: "Cave of the Mounds",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [20, 30],
        groupFriendly: true,
        highlight:
          "National Natural Landmark — guided underground cave tour 25 min west of Madison",
        bestFor: "rest day",
        provider: "Cave of the Mounds",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 28],
        hourlyRate: [175, 300],
        providers: ["Madison Party Bus", "Badger Bus"],
        notes:
          "Game-day infrastructure means good availability. Capitol Square bar crawl packages are popular.",
      },
      {
        type: "trolley",
        capacity: [14, 24],
        hourlyRate: [150, 250],
        providers: ["Madison Trolley Company"],
        notes:
          "Open-air trolley for brewery tours or course-to-downtown loops.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [50, 110],
        providers: ["Take a Chef", "Madison Catering Company"],
        mealTypes: [
          "Wisconsin supper club dinner",
          "steak dinner",
          "BBQ cookout",
          "brunch",
          "Friday fish fry",
        ],
        notes:
          "The Dane County farmers' market (largest producer-only market in the US) means outstanding local ingredients. Request a cheese course with local creamery selections.",
      },
    ],
  },

  // ─── 11. Brainerd / Baxter, MN ────────────────────────────────────
  {
    id: "brainerd-mn",
    city: "Brainerd",
    state: "MN",
    region: "Midwest",
    tagline: "Minnesota lake country with world-class resort golf",
    description:
      "The Brainerd Lakes area is Minnesota's premier golf destination, anchored by two massive resorts — Madden's and Grand View Lodge — plus Cragun's and The Classic. With 460+ lakes, endless cabin rentals, and a laid-back Up North vibe, it's built for groups who want to play 36 and fish at sunset.",
    population: "small",
    nearestAirport: {
      code: "BRD",
      name: "Brainerd Lakes Regional Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "The Classic at Madden's",
        tier: "premium",
        greenFeeRange: [89, 149],
        holes: 18,
        par: 72,
        yardage: 7102,
        slope: 140,
        rating: 74.2,
        walkable: false,
        style: "resort",
        driveMinutes: 15,
        url: "https://www.maddens.com/golf",
        highlight:
          "Scott Hoch design on Gull Lake — the best resort course in Minnesota with dramatic water holes and immaculate conditioning",
      },
      {
        name: "Deacon's Lodge Golf Course",
        tier: "premium",
        greenFeeRange: [99, 159],
        holes: 18,
        par: 72,
        yardage: 6995,
        slope: 143,
        rating: 74.0,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.deaconslodge.com",
        highlight:
          "Arnold Palmer's only Minnesota design — carved through 600 acres of forests and wetlands",
      },
      {
        name: "The Pines at Grand View Lodge",
        tier: "premium",
        greenFeeRange: [79, 139],
        holes: 27,
        par: 72,
        yardage: 6884,
        slope: 138,
        rating: 73.4,
        walkable: false,
        style: "resort",
        driveMinutes: 20,
        url: "https://www.grandviewlodge.com/golf",
        highlight:
          "27 holes through northern Minnesota pines and lakes — three distinct nines that all deliver",
      },
      {
        name: "Cragun's Resort - Dutch Legacy",
        tier: "solid",
        greenFeeRange: [59, 99],
        holes: 18,
        par: 72,
        yardage: 6836,
        slope: 134,
        rating: 72.8,
        walkable: false,
        style: "resort",
        driveMinutes: 10,
        url: "https://www.craguns.com/golf",
        highlight:
          "Robert Trent Jones Jr. design on Gull Lake — resort golf with teeth, especially the back nine",
      },
      {
        name: "Madden's Pine Beach East",
        tier: "solid",
        greenFeeRange: [49, 79],
        holes: 18,
        par: 67,
        yardage: 5100,
        slope: 117,
        rating: 64.8,
        walkable: true,
        style: "resort",
        driveMinutes: 15,
        url: "https://www.maddens.com/golf",
        highlight:
          "Social par-67 layout perfect for a warm-up round — walking-friendly with cold beers at the turn",
      },
    ],
    lodging: [
      {
        type: "lakehouse",
        sleeps: [12, 18],
        nightlyRange: [700, 2500],
        amenities: [
          "full kitchen",
          "lake access",
          "dock",
          "boat slip",
          "fire pit",
          "hot tub",
          "game room",
        ],
        areaDescription: "Gull Lake and Mille Lacs area",
        searchUrl:
          "https://www.vrbo.com/search?destination=Brainerd%2C+Minnesota&adults=16",
        notes:
          "Gull Lake has the best large-home inventory — many come with pontoon boats included. Book early for summer weekends.",
      },
      {
        type: "lodge",
        sleeps: [12, 16],
        nightlyRange: [500, 1400],
        amenities: [
          "golf on-site",
          "pool",
          "spa",
          "restaurants",
          "marina",
          "fitness center",
        ],
        areaDescription: "Madden's on Gull Lake or Grand View Lodge",
        searchUrl: "https://www.maddens.com",
        notes:
          "Both resorts offer multi-bedroom cabins and lodge suites. Golf/stay packages with breakfast are the way to go.",
      },
    ],
    dining: [
      {
        name: "Ernies on Gull",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Lakeside steakhouse on Gull Lake — prime cuts with sunset views from the patio",
        reservationNeeded: true,
      },
      {
        name: "Prairie Bay",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Baxter's best — creative American menu, large wine list, and a private dining room for groups",
        reservationNeeded: true,
      },
      {
        name: "The Rustic",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Smoked meats and craft beer on the water — laid-back lakeside BBQ that handles big groups well",
        reservationNeeded: false,
      },
      {
        name: "Black Bear Lodge & Saloon",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Northwoods tavern with burgers, walleye, and a huge bar — the go-to casual group spot",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Zorbaz on the Lake",
        vibe: "patio",
        highlight:
          "Legendary Minnesota chain — trashy pizza, lake views, and the best patio bar vibe in Brainerd",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Moonlite Bay Bar",
        vibe: "dive",
        highlight:
          "Classic lake dive bar — cheap drinks, jukebox, and the locals' favorite after-dark spot",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Jack Pine Brewery",
        vibe: "brewpub",
        highlight:
          "Baxter's craft brewery — solid IPAs and a relaxed taproom with food trucks on weekends",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Bar 218",
        vibe: "sports-bar",
        highlight:
          "Downtown Brainerd sports bar — TVs everywhere, pool tables, and strong drinks",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Gull Lake Fishing Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [60, 120],
        groupFriendly: true,
        highlight:
          "Walleye, bass, and northern pike on one of Minnesota's premier fishing lakes",
        bestFor: "rest day",
        provider: "Gull Lake Guide Service",
      },
      {
        name: "Brainerd International Raceway Go-Karts",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "High-speed go-kart racing at the same facility that hosts NHRA drag races — competitive group fun",
        bestFor: "rest day",
        provider: "Brainerd International Raceway",
      },
      {
        name: "Cuyuna Mountain Biking",
        type: "mountain-biking",
        duration: "half day",
        pricePerPerson: [15, 40],
        groupFriendly: true,
        highlight:
          "IMBA Gold-level trail system through reclaimed iron ore mines — turquoise pit lakes and red rock terrain",
        bestFor: "rest day",
        provider: "Cuyuna Lakes Mountain Bike Trails",
      },
      {
        name: "Pontoon Boat Rental on Gull Lake",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [40, 80],
        groupFriendly: true,
        highlight:
          "Rent a big pontoon and cruise Gull Lake — swimming, tubing, and sunset beers on the water",
        bestFor: "rest day",
        provider: "Ernie's on Gull / Madden's Marina",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 24],
        hourlyRate: [175, 275],
        providers: ["Lakes Area Limo", "Brainerd Party Bus"],
        notes:
          "Course-to-lakehouse loops are the primary use. Smaller market so book 2+ months out for summer.",
      },
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [100, 175],
        providers: ["Lakes Express Shuttle"],
        notes:
          "Resort shuttles from Madden's and Grand View cover their own courses. Sprinter vans fill the gap for off-resort rounds.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [55, 120],
        providers: ["Take a Chef", "Lakes Area Catering"],
        mealTypes: [
          "walleye shore lunch",
          "steak dinner",
          "BBQ cookout",
          "breakfast",
          "fish fry",
        ],
        notes:
          "A traditional walleye shore lunch on the lake is the Brainerd signature. Most lakehouse kitchens are fully equipped for big group meals.",
      },
    ],
  },

  // ─── 12. Cincinnati, OH ───────────────────────────────────────────
  {
    id: "cincinnati-oh",
    city: "Cincinnati",
    state: "OH",
    region: "Midwest",
    tagline: "Underrated food city with surprisingly hilly, challenging golf",
    description:
      "Cincinnati sits on the Ohio River with a revitalized OTR (Over-the-Rhine) neighborhood that rivals any food and bar scene in the Midwest. The rolling terrain produces surprisingly challenging golf, and large houses across the river in Northern Kentucky expand lodging options. Fly into CVG for cheap fares and you're 15 minutes from downtown.",
    population: "medium",
    nearestAirport: {
      code: "CVG",
      name: "Cincinnati/Northern Kentucky International Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "Shaker Run Golf Club",
        tier: "premium",
        greenFeeRange: [59, 99],
        holes: 27,
        par: 72,
        yardage: 6969,
        slope: 138,
        rating: 73.6,
        walkable: false,
        style: "parkland",
        driveMinutes: 30,
        url: "https://www.shakerrun.com",
        highlight:
          "Arthur Hills design with 27 holes through rolling farmland and mature hardwoods — 3-time Ohio Golf Course of the Year",
      },
      {
        name: "TPC River's Bend",
        tier: "premium",
        greenFeeRange: [79, 130],
        holes: 18,
        par: 70,
        yardage: 6750,
        slope: 140,
        rating: 73.2,
        walkable: false,
        style: "parkland",
        driveMinutes: 35,
        url: "https://www.tpc.com/rivers-bend",
        highlight:
          "TPC network course on the Little Miami River — tournament-caliber conditioning and a demanding layout",
      },
      {
        name: "Glenview Golf Course",
        tier: "solid",
        greenFeeRange: [34, 52],
        holes: 18,
        par: 71,
        yardage: 6283,
        slope: 125,
        rating: 70.4,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.greatparks.org/golf/glenview",
        highlight:
          "Hilltop municipal gem with panoramic city skyline views — best public value in Hamilton County",
      },
      {
        name: "Aston Oaks Golf Club",
        tier: "solid",
        greenFeeRange: [49, 79],
        holes: 18,
        par: 72,
        yardage: 6841,
        slope: 132,
        rating: 72.4,
        walkable: true,
        style: "parkland",
        driveMinutes: 25,
        highlight:
          "Denis Griffiths design through North Bend's river bluffs — long, challenging, and well-maintained",
      },
      {
        name: "Stonelick Hills Golf Club",
        tier: "solid",
        greenFeeRange: [39, 65],
        holes: 18,
        par: 72,
        yardage: 6600,
        slope: 129,
        rating: 71.6,
        walkable: true,
        style: "parkland",
        driveMinutes: 35,
        highlight:
          "Clermont County's best daily-fee course — hilly terrain through wooded ravines",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [600, 1800],
        amenities: [
          "full kitchen",
          "rooftop deck",
          "parking",
          "hot tub",
          "game room",
          "fire pit",
        ],
        areaDescription:
          "OTR, Mount Adams, and Northern Kentucky riverfront",
        searchUrl:
          "https://www.vrbo.com/search?destination=Cincinnati%2C+Ohio&adults=16",
        notes:
          "OTR has walkable townhomes near bars. Northern Kentucky (Covington/Newport) offers cheaper, larger properties with skyline views. Mount Adams has mid-size homes near Eden Park.",
      },
      {
        type: "house",
        sleeps: [10, 14],
        nightlyRange: [400, 1000],
        amenities: ["full kitchen", "parking", "grill", "washer/dryer"],
        areaDescription: "Hyde Park and Oakley neighborhoods",
        searchUrl:
          "https://www.airbnb.com/s/Cincinnati--Ohio/homes?adults=14",
        notes:
          "Eastern suburbs with their own bar/restaurant strip. 15 min to downtown, closer to eastern courses.",
      },
    ],
    dining: [
      {
        name: "Jeff Ruby's Steakhouse",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Cincinnati's legendary steakhouse — A5 wagyu, live entertainment, and a private dining room for groups",
        reservationNeeded: true,
      },
      {
        name: "Sotto",
        style: "italian",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Underground Italian in OTR — handmade pasta and an award-winning wine program",
        reservationNeeded: true,
      },
      {
        name: "Senate",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Gourmet hot dogs and craft cocktails in OTR — the crab rangoon dog is legendary",
        reservationNeeded: false,
      },
      {
        name: "Montgomery Inn Boathouse",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Ribs on the Ohio River — a Cincinnati institution since 1951 with great riverfront views",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Rhinegeist Brewery",
        vibe: "brewpub",
        highlight:
          "Massive OTR brewery in a historic bottling plant — cornhole, ping pong, and 20+ taps in a cathedral-sized space",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Sundry and Vice",
        vibe: "cocktail",
        highlight:
          "Colorful craft cocktail bar in OTR — inventive drinks and a party atmosphere",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "MOTR Pub",
        vibe: "dive",
        highlight:
          "OTR's best dive — live music nightly in the basement, cheap beer, and late-night vibes",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Top of the Park at The Phelps",
        vibe: "rooftop",
        highlight:
          "Rooftop bar with panoramic Cincinnati skyline views — craft cocktails and small plates",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "OTR Brewery & Bar Crawl",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [20, 40],
        groupFriendly: true,
        highlight:
          "Walk Vine Street hitting Rhinegeist, Taft's Ale House, Braxton, and more — all within blocks",
        bestFor: "arrival day",
      },
      {
        name: "Top Golf West Chester",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "Three-level driving range with food and drinks — competitive group fun before the real golf",
        bestFor: "arrival day",
        provider: "Topgolf",
      },
      {
        name: "BB Riverboats Cruise",
        type: "boat-rental",
        duration: "2-3 hours",
        pricePerPerson: [30, 55],
        groupFriendly: true,
        highlight:
          "Dinner or sightseeing cruise on the Ohio River — passing under the Roebling Bridge with skyline views",
        bestFor: "rest day",
        provider: "BB Riverboats",
      },
      {
        name: "Newport Aquarium & Levee",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [25, 35],
        groupFriendly: true,
        highlight:
          "Walk-through shark tunnel and touch tanks, plus the Levee entertainment district right next door",
        bestFor: "rest day",
        provider: "Newport Aquarium",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 28],
        hourlyRate: [175, 300],
        providers: ["Cincinnati Party Bus", "Queen City Party Rides"],
        notes:
          "OTR brewery crawls are the most popular route. Drivers know the bar circuit well.",
      },
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [125, 200],
        providers: ["Cincy Rides", "Executive Transportation"],
        notes:
          "Sprinter vans work well for course-to-OTR loops. Northern Kentucky pickup is common.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [55, 120],
        providers: ["Take a Chef", "Cincinnati Culinary Connection"],
        mealTypes: [
          "steak dinner",
          "Cincinnati-style brunch",
          "BBQ cookout",
          "Italian feast",
          "breakfast",
        ],
        notes:
          "Cincinnati's food scene is top-tier. Request goetta (local sausage) for breakfast and Graeter's ice cream for dessert.",
      },
    ],
  },

  // ─── 13. Columbus, OH ─────────────────────────────────────────────
  {
    id: "columbus-oh",
    city: "Columbus",
    state: "OH",
    region: "Midwest",
    tagline: "Big Ten energy with Jack Nicklaus' backyard golf",
    description:
      "Columbus is Ohio's biggest city and Jack Nicklaus' hometown, so the public golf scene benefits from that legacy. The Short North and German Village neighborhoods deliver a walkable bar and restaurant scene, and the Ohio State game-day infrastructure means large-group logistics are second nature here.",
    population: "medium",
    nearestAirport: {
      code: "CMH",
      name: "John Glenn Columbus International Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "Longaberger Golf Club",
        tier: "premium",
        greenFeeRange: [69, 110],
        holes: 18,
        par: 72,
        yardage: 7095,
        slope: 143,
        rating: 74.6,
        walkable: false,
        style: "parkland",
        driveMinutes: 45,
        url: "https://www.longabergergolfclub.com",
        highlight:
          "Arthur Hills design through Appalachian foothills — consistently rated among Ohio's best public courses",
      },
      {
        name: "The Golf Club at Little Turtle",
        tier: "solid",
        greenFeeRange: [49, 79],
        holes: 18,
        par: 72,
        yardage: 6749,
        slope: 130,
        rating: 72.2,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        highlight:
          "Westerville's best public track — mature trees and well-maintained greens in a residential setting",
      },
      {
        name: "Darby Creek Golf Course",
        tier: "solid",
        greenFeeRange: [35, 59],
        holes: 18,
        par: 72,
        yardage: 6747,
        slope: 129,
        rating: 72.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.metroparks.net/golf",
        highlight:
          "Metro Parks course along Big Darby Creek — excellent value with scenic creek-side holes",
      },
      {
        name: "New Albany Links Golf Club",
        tier: "solid",
        greenFeeRange: [45, 75],
        holes: 18,
        par: 72,
        yardage: 6951,
        slope: 131,
        rating: 73.0,
        walkable: true,
        style: "links",
        driveMinutes: 25,
        highlight:
          "Links-style layout in New Albany — open fairways, pot bunkers, and firm conditions",
      },
      {
        name: "Cumberland Trail Golf Club",
        tier: "solid",
        greenFeeRange: [39, 65],
        holes: 18,
        par: 72,
        yardage: 6678,
        slope: 128,
        rating: 71.4,
        walkable: true,
        style: "parkland",
        driveMinutes: 40,
        highlight:
          "Hilly Pataskala track through woods and ravines — feels like Appalachian golf for half the price",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [500, 1500],
        amenities: [
          "full kitchen",
          "parking",
          "hot tub",
          "game room",
          "fire pit",
          "grill",
        ],
        areaDescription: "German Village and Short North area",
        searchUrl:
          "https://www.vrbo.com/search?destination=Columbus%2C+Ohio&adults=16",
        notes:
          "German Village has beautiful brick homes walkable to bars. Short North offers a younger vibe. Both neighborhoods have large rental inventory.",
      },
      {
        type: "house",
        sleeps: [10, 14],
        nightlyRange: [350, 900],
        amenities: [
          "full kitchen",
          "parking",
          "grill",
          "washer/dryer",
          "game room",
        ],
        areaDescription: "Dublin and Westerville suburbs",
        searchUrl:
          "https://www.airbnb.com/s/Columbus--Ohio/homes?adults=14",
        notes:
          "Suburbs offer newer, larger homes closer to courses. Dublin is near Muirfield (private but in the area) and Westerville is near Little Turtle.",
      },
    ],
    dining: [
      {
        name: "The Top Steakhouse",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Bexley's retro steakhouse institution since 1955 — huge cuts, strong drinks, and old-school atmosphere",
        reservationNeeded: true,
      },
      {
        name: "Wolf's Ridge Brewing",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Upstairs fine dining and downstairs taproom — best brewery food in Columbus",
        reservationNeeded: true,
      },
      {
        name: "Schmidt's Sausage Haus",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "German Village landmark — giant bratwurst, cream puffs, and an oompah band on weekends",
        reservationNeeded: false,
      },
      {
        name: "The Pearl",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Short North oyster bar and seafood — great raw bar, craft cocktails, and a buzzy atmosphere",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Seventh Son Brewing",
        vibe: "brewpub",
        highlight:
          "Italian Village taproom with a great outdoor space — hop-forward beers and a loyal local following",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Walrus",
        vibe: "dive",
        highlight:
          "Short North's best dive bar — pinball, cheap PBR, and the kind of unpretentious vibe every crew needs",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Denmark on High",
        vibe: "cocktail",
        highlight:
          "Speakeasy-style cocktail bar hidden in a Short North alley — inventive drinks and a moody atmosphere",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Pins Mechanical Company",
        vibe: "sports-bar",
        highlight:
          "Duckpin bowling, pinball, and craft beer — the ultimate group hangout spot",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Short North Gallery Hop & Bar Crawl",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [20, 40],
        groupFriendly: true,
        highlight:
          "Walk High Street from Short North through Italian Village — art galleries, breweries, and cocktail bars",
        bestFor: "arrival day",
      },
      {
        name: "Topgolf Columbus",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "Three-level driving range with food and drinks — perfect competitive warm-up",
        bestFor: "arrival day",
        provider: "Topgolf",
      },
      {
        name: "Scioto River Kayaking",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [30, 55],
        groupFriendly: true,
        highlight:
          "Paddle the Scioto River through downtown Columbus — urban scenery and an easy float",
        bestFor: "morning before golf",
        provider: "Scioto Paddle Co",
      },
      {
        name: "Pins Mechanical Duckpin Bowling",
        type: "axe-throwing",
        duration: "2-3 hours",
        pricePerPerson: [15, 30],
        groupFriendly: true,
        highlight:
          "Duckpin bowling lanes plus bocce and pinball — competitive group fun with craft beer",
        bestFor: "rest day",
        provider: "Pins Mechanical Co",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 28],
        hourlyRate: [175, 300],
        providers: ["Columbus Party Bus", "Buckeye Party Rides"],
        notes:
          "Ohio State game-day infrastructure means lots of options. Short North brewery crawl is the go-to group route.",
      },
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [125, 200],
        providers: ["614 Transportation", "Executive Express"],
        notes:
          "Sprinter vans cover course-to-Short North loops efficiently.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [50, 110],
        providers: ["Take a Chef", "Columbus Culinary Co"],
        mealTypes: [
          "steak dinner",
          "BBQ cookout",
          "German Village-style dinner",
          "brunch",
          "breakfast",
        ],
        notes:
          "Columbus is a serious food town. Request a cream puff dessert course in honor of Schmidt's.",
      },
    ],
  },

  // ─── 14. Indianapolis, IN ─────────────────────────────────────────
  {
    id: "indianapolis-in",
    city: "Indianapolis",
    state: "IN",
    region: "Midwest",
    tagline: "Brickyard swagger meets Pete Dye's home turf",
    description:
      "Indianapolis is the crossroads of America and the backyard of legendary course architect Pete Dye. Fort Golf Resort is under an hour away, the public courses benefit from Indiana's flat-but-strategic terrain, and Mass Ave and Broad Ripple deliver a walkable bar scene. Plus, the Indy Motor Speedway experience adds an activity no other golf trip destination can match.",
    population: "medium",
    nearestAirport: {
      code: "IND",
      name: "Indianapolis International Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "The Fort Golf Resort",
        tier: "premium",
        greenFeeRange: [69, 110],
        holes: 18,
        par: 72,
        yardage: 7148,
        slope: 140,
        rating: 74.8,
        walkable: false,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.thefortgolfresort.com",
        highlight:
          "Pete Dye design built on Fort Harrison — the best public course in the Indianapolis metro with championship conditioning",
      },
      {
        name: "Brickyard Crossing Golf Club",
        tier: "premium",
        greenFeeRange: [59, 99],
        holes: 18,
        par: 72,
        yardage: 6985,
        slope: 135,
        rating: 73.6,
        walkable: false,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.brickyardcrossing.com",
        highlight:
          "Pete Dye design with 4 holes inside the Indianapolis Motor Speedway — one of the most unique golf experiences anywhere",
      },
      {
        name: "The Trophy Club",
        tier: "solid",
        greenFeeRange: [49, 79],
        holes: 18,
        par: 72,
        yardage: 6716,
        slope: 130,
        rating: 72.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 25,
        highlight:
          "Lebanon's best public course — well-groomed with strategic bunkering and good pace of play",
      },
      {
        name: "Smock Golf Course",
        tier: "solid",
        greenFeeRange: [28, 45],
        holes: 18,
        par: 72,
        yardage: 6696,
        slope: 125,
        rating: 71.4,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.indy.gov/activity/golf",
        highlight:
          "Best Indy Parks muni — a Gary Kern design with more character than you'd expect from a city course",
      },
      {
        name: "Prairie View Golf Club",
        tier: "solid",
        greenFeeRange: [42, 69],
        holes: 18,
        par: 72,
        yardage: 6862,
        slope: 131,
        rating: 72.6,
        walkable: true,
        style: "parkland",
        driveMinutes: 30,
        url: "https://www.prairieviewgc.com",
        highlight:
          "Carmel's public gem — Robert Trent Jones Jr. design with rolling terrain and top-notch conditioning for the price",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [500, 1500],
        amenities: [
          "full kitchen",
          "parking",
          "hot tub",
          "game room",
          "fire pit",
          "grill",
        ],
        areaDescription: "Broad Ripple and Meridian-Kessler neighborhoods",
        searchUrl:
          "https://www.vrbo.com/search?destination=Indianapolis%2C+Indiana&adults=16",
        notes:
          "Broad Ripple has a walkable bar strip and larger rental homes. Meridian-Kessler offers beautiful older homes 10 min from downtown.",
      },
      {
        type: "house",
        sleeps: [10, 14],
        nightlyRange: [350, 900],
        amenities: ["full kitchen", "parking", "grill", "washer/dryer"],
        areaDescription: "Mass Ave and Fountain Square",
        searchUrl:
          "https://www.airbnb.com/s/Indianapolis--Indiana/homes?adults=14",
        notes:
          "Urban neighborhoods walkable to downtown nightlife. May need two properties for 16+ but location is unbeatable.",
      },
    ],
    dining: [
      {
        name: "St. Elmo Steak House",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Indianapolis institution since 1902 — famous for the world's spiciest shrimp cocktail and prime steaks",
        reservationNeeded: true,
      },
      {
        name: "Milktooth",
        style: "farm-to-table",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Bon Appetit-recognized brunch spot in Fletcher Place — creative dishes in a converted garage",
        reservationNeeded: false,
      },
      {
        name: "Bru Burger Bar",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Mass Ave's upscale burger spot — house-ground patties, great beer list, and a group-friendly layout",
        reservationNeeded: false,
      },
      {
        name: "Tinker Street",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Broad Ripple's best dinner — seasonal menus with a creative cocktail program and intimate vibe",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Sun King Brewing",
        vibe: "brewpub",
        highlight:
          "Indy's flagship craft brewery — massive downtown taproom with 20+ beers and a lively atmosphere",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Slippery Noodle Inn",
        vibe: "dive",
        highlight:
          "Indiana's oldest bar (1850) — live blues nightly in a beautifully worn building",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Hotel Tango Artisan Distillery",
        vibe: "whiskey-bar",
        highlight:
          "Veteran-owned craft distillery in Fletcher Place — bourbon, whiskey, and excellent cocktails",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Kilroy's Bar & Grill",
        vibe: "sports-bar",
        highlight:
          "Broad Ripple's rowdiest sports bar — big TVs, bucket specials, and the energy of a Big Ten bar",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Indianapolis Motor Speedway Tour",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [15, 30],
        groupFriendly: true,
        highlight:
          "Tour the Brickyard, kiss the bricks, and visit the Hall of Fame Museum — play Brickyard Crossing the same day for the full experience",
        bestFor: "rest day",
        provider: "Indianapolis Motor Speedway",
      },
      {
        name: "Mass Ave Bar Crawl",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [20, 40],
        groupFriendly: true,
        highlight:
          "Walk Mass Ave from Sun King to Hotel Tango to the Rathskeller — all within a few blocks",
        bestFor: "arrival day",
      },
      {
        name: "Topgolf Fishers",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "Three-level driving range with climate-controlled bays — group competition before the real golf",
        bestFor: "arrival day",
        provider: "Topgolf",
      },
      {
        name: "Eagle Creek Reservoir Boating",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "Pontoon rental on Indy's largest reservoir — swimming, fishing, and a scenic escape from the city",
        bestFor: "rest day",
        provider: "Eagle Creek Outfitters",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 28],
        hourlyRate: [175, 300],
        providers: ["Indy Party Bus", "Circle City Limo"],
        notes:
          "Race-weekend infrastructure means excellent party bus availability. Mass Ave and Broad Ripple crawls are popular group routes.",
      },
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [125, 200],
        providers: ["Indy Executive Transportation", "Go Express Travel"],
        notes:
          "Sprinter vans cover the course-to-downtown loop efficiently.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [50, 110],
        providers: ["Take a Chef", "Indy Private Dining"],
        mealTypes: [
          "steak dinner",
          "BBQ cookout",
          "pork tenderloin dinner",
          "brunch",
          "breakfast",
        ],
        notes:
          "The breaded pork tenderloin sandwich is the state icon. Request a sugar cream pie for dessert — Indiana's official state pie.",
      },
    ],
  },

  // ─── 15. Des Moines, IA ───────────────────────────────────────────
  {
    id: "des-moines-ia",
    city: "Des Moines",
    state: "IA",
    region: "Midwest",
    tagline: "Iowa's sleeper food city with big-value golf",
    description:
      "Des Moines has quietly become one of the Midwest's best food and drink cities, with the East Village and Court Avenue districts rivaling cities twice its size. The golf is sneaky good — Waveland is the second-oldest public course west of the Mississippi, and several newer designs offer championship-caliber golf at Iowa prices.",
    population: "medium",
    nearestAirport: {
      code: "DSM",
      name: "Des Moines International Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "Tournament Club of Iowa",
        tier: "premium",
        greenFeeRange: [59, 99],
        holes: 18,
        par: 72,
        yardage: 7049,
        slope: 139,
        rating: 74.0,
        walkable: false,
        style: "parkland",
        driveMinutes: 30,
        url: "https://www.thetournamentclubofiowa.com",
        highlight:
          "Arnold Palmer design and former Korn Ferry Tour host — the best public course in Iowa with tournament-level conditioning",
      },
      {
        name: "Otter Creek Golf Course",
        tier: "solid",
        greenFeeRange: [32, 55],
        holes: 18,
        par: 72,
        yardage: 6600,
        slope: 130,
        rating: 71.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.ankenyiowa.gov/otter-creek",
        highlight:
          "Ankeny municipal that plays way above its price point — rolling terrain with well-maintained greens",
      },
      {
        name: "Waveland Golf Course",
        tier: "budget",
        greenFeeRange: [22, 38],
        holes: 18,
        par: 72,
        yardage: 6412,
        slope: 120,
        rating: 69.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        highlight:
          "Opened in 1901, the second-oldest public course west of the Mississippi — old-school charm right in the city",
      },
      {
        name: "Copper Creek Golf Course",
        tier: "solid",
        greenFeeRange: [35, 59],
        holes: 18,
        par: 72,
        yardage: 6737,
        slope: 128,
        rating: 72.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 25,
        highlight:
          "Pleasant Hill's well-designed public course — good mix of challenge and playability through Iowa prairie",
      },
      {
        name: "Jester Park Golf Course",
        tier: "solid",
        greenFeeRange: [29, 49],
        holes: 18,
        par: 72,
        yardage: 6806,
        slope: 127,
        rating: 72.2,
        walkable: true,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.jesterparkgolf.com",
        highlight:
          "Polk County course along Saylorville Lake — scenic water views and a great practice facility",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [400, 1200],
        amenities: [
          "full kitchen",
          "parking",
          "fire pit",
          "game room",
          "grill",
          "hot tub",
        ],
        areaDescription: "Sherman Hill and Beaverdale neighborhoods",
        searchUrl:
          "https://www.vrbo.com/search?destination=Des+Moines%2C+Iowa&adults=16",
        notes:
          "Sherman Hill is walkable to downtown. Beaverdale has charming larger homes 10 min out. Des Moines is extremely affordable compared to other Midwest cities.",
      },
      {
        type: "house",
        sleeps: [10, 14],
        nightlyRange: [300, 800],
        amenities: ["full kitchen", "parking", "grill", "washer/dryer"],
        areaDescription: "East Village and Drake neighborhood",
        searchUrl:
          "https://www.airbnb.com/s/Des-Moines--Iowa/homes?adults=14",
        notes:
          "East Village is walkable to bars and restaurants. Drake area near the university has good rental inventory.",
      },
    ],
    dining: [
      {
        name: "801 Chophouse",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Des Moines' best steakhouse — dry-aged prime beef, private dining room, and a power-dinner atmosphere",
        reservationNeeded: true,
      },
      {
        name: "Fong's Pizza",
        style: "casual",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Chinese-pizza fusion in a former Chinese restaurant — crab rangoon pizza is the move, and the bar is excellent",
        reservationNeeded: false,
      },
      {
        name: "Harbinger",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "James Beard-nominated seasonal tasting menus — the best fine dining in Iowa by a wide margin",
        reservationNeeded: true,
      },
      {
        name: "Smokey Row Coffee & Kitchen",
        style: "casual",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "All-day cafe and brunch spot — biscuits and gravy, breakfast burritos, and great coffee",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Exile Brewing Company",
        vibe: "brewpub",
        highlight:
          "Des Moines' flagship brewery — great IPAs in a sprawling industrial taproom with games",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Hessen Haus",
        vibe: "sports-bar",
        highlight:
          "German beer hall with boot-drinking challenges and live music — the most fun group bar in DSM",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Hello, Marjorie",
        vibe: "cocktail",
        highlight:
          "East Village craft cocktail bar — inventive drinks in a stylish, intimate space",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Lefty's Live Music",
        vibe: "dive",
        highlight:
          "Dive bar with live music and cheap drinks — the late-night anchor of the Court Avenue scene",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Court Avenue District Bar Crawl",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [20, 40],
        groupFriendly: true,
        highlight:
          "Walk Court Ave and East Village hitting Exile, Hessen Haus, Fong's, and more — all walkable",
        bestFor: "arrival day",
      },
      {
        name: "Adventureland Park",
        type: "go-karts",
        duration: "half day",
        pricePerPerson: [40, 55],
        groupFriendly: true,
        highlight:
          "Iowa's amusement park — roller coasters, go-karts, and group-friendly fun 15 min from downtown",
        bestFor: "rest day",
        provider: "Adventureland Park",
      },
      {
        name: "Saylorville Lake Boating",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "Pontoon rental on the big reservoir north of town — swimming, fishing, and lake cruising",
        bestFor: "rest day",
        provider: "Saylorville Lake Marina",
      },
      {
        name: "Jasper Winery Tasting",
        type: "winery",
        duration: "2-3 hours",
        pricePerPerson: [15, 30],
        groupFriendly: true,
        highlight:
          "Urban winery with live music on the patio — right in Des Moines with a great outdoor atmosphere",
        bestFor: "arrival day",
        provider: "Jasper Winery",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 24],
        hourlyRate: [150, 250],
        providers: ["Des Moines Party Bus", "Iowa Party Express"],
        notes:
          "Smaller market but reliable. Court Ave crawls and course-to-house loops are the main use.",
      },
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [100, 175],
        providers: ["DSM Shuttle", "Executive Transportation"],
        notes:
          "Budget-friendly option for golf course shuttles.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [45, 100],
        providers: ["Take a Chef", "Des Moines Catering Co"],
        mealTypes: [
          "Iowa pork chop dinner",
          "steak dinner",
          "BBQ cookout",
          "breakfast",
          "farm-to-table",
        ],
        notes:
          "Iowa pork is world-class — request a thick-cut pork chop dinner as the centerpiece. Everything in DSM is a great value compared to coastal cities.",
      },
    ],
  },

  // ─── 16. Marquette, MI ────────────────────────────────────────────
  {
    id: "marquette-mi",
    city: "Marquette",
    state: "MI",
    region: "Midwest",
    tagline: "Upper Peninsula gem with Lake Superior drama",
    description:
      "Marquette is the unofficial capital of Michigan's Upper Peninsula — a rugged, outdoorsy college town on Lake Superior with surprisingly good golf, excellent craft breweries, and pristine natural beauty. Greywalls at Marquette Golf Club is a top-50 public course, and the UP's quiet roads and wilderness trails add adventure you won't find at resort destinations.",
    population: "small",
    nearestAirport: {
      code: "MQT",
      name: "Sawyer International Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Marquette Golf Club - Greywalls",
        tier: "premium",
        greenFeeRange: [89, 139],
        holes: 18,
        par: 72,
        yardage: 6828,
        slope: 145,
        rating: 73.8,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.marquettegolfclub.com",
        highlight:
          "Mike DeVries design carved into granite cliffs above Lake Superior — a top-50 public course with views that rival Pebble Beach",
      },
      {
        name: "Marquette Golf Club - Heritage",
        tier: "solid",
        greenFeeRange: [39, 65],
        holes: 18,
        par: 71,
        yardage: 6330,
        slope: 127,
        rating: 70.6,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.marquettegolfclub.com",
        highlight:
          "Classic 1926 course through mature pines — the 'other' Marquette course is still excellent golf at a fraction of Greywalls' price",
      },
      {
        name: "Sweetgrass Golf Club",
        tier: "premium",
        greenFeeRange: [65, 99],
        holes: 18,
        par: 72,
        yardage: 7201,
        slope: 140,
        rating: 74.2,
        walkable: true,
        style: "parkland",
        driveMinutes: 40,
        url: "https://www.sweetgrassgolfclub.com",
        highlight:
          "Paul Albanese design at Island Resort & Casino — big, bold, and beautifully routed through UP wilderness",
      },
      {
        name: "Timber Ridge Golf Course",
        tier: "solid",
        greenFeeRange: [35, 55],
        holes: 18,
        par: 72,
        yardage: 6400,
        slope: 125,
        rating: 70.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 45,
        highlight:
          "Escanaba area track through northern hardwoods — well-maintained and affordable UP golf",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [500, 1800],
        amenities: [
          "full kitchen",
          "Lake Superior views",
          "fire pit",
          "hot tub",
          "grill",
          "sauna",
        ],
        areaDescription: "Marquette lakeshore and Big Bay area",
        searchUrl:
          "https://www.vrbo.com/search?destination=Marquette%2C+Michigan&adults=16",
        notes:
          "Lake Superior shoreline homes are stunning but book fast for summer. Big Bay (25 min north) has large remote properties. Sauna is a UP tradition — look for homes that have one.",
      },
      {
        type: "cabin",
        sleeps: [10, 14],
        nightlyRange: [350, 900],
        amenities: [
          "full kitchen",
          "fire pit",
          "grill",
          "wooded setting",
          "parking",
        ],
        areaDescription: "Ishpeming and Negaunee area",
        searchUrl:
          "https://www.airbnb.com/s/Marquette--Michigan/homes?adults=14",
        notes:
          "Iron Range towns 15 min west of Marquette have larger cabin properties at lower prices. Close to Greywalls.",
      },
    ],
    dining: [
      {
        name: "The Lagniappe Cajun Creole",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Cajun-Creole meets UP — jambalaya, crawfish, and Lake Superior whitefish in a cozy downtown space",
        reservationNeeded: true,
      },
      {
        name: "Iron Bay Restaurant & Drinkery",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Historic ore dock building with a huge menu — burgers, steaks, and a massive beer selection",
        reservationNeeded: false,
      },
      {
        name: "Steinhaus",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "German beer hall vibes — brats, pretzels, and boot-drinking in a fun group atmosphere",
        reservationNeeded: false,
      },
      {
        name: "Donckers",
        style: "casual",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Marquette institution since 1896 — breakfast, hand-dipped chocolates, and a soda fountain",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Blackrocks Brewery",
        vibe: "brewpub",
        highlight:
          "Marquette's beloved brewery in a converted house — 51K IPA is legendary, and the vibe is pure UP",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Ore Dock Brewing Company",
        vibe: "brewpub",
        highlight:
          "Art gallery meets taproom — rotating local art and creative beers in a beautiful downtown space",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Upfront & Company",
        vibe: "dive",
        highlight:
          "Comedy club and dive bar combo — live comedy, open mic nights, and cheap drinks",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Barrel + Beam",
        vibe: "whiskey-bar",
        highlight:
          "Farmhouse brewery in a restored barn — sour beers and barrel-aged specialties 20 min from downtown",
        lateNight: false,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Pictured Rocks Boat Cruise",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [45, 65],
        groupFriendly: true,
        highlight:
          "Cruise along the stunning multicolored sandstone cliffs of Pictured Rocks National Lakeshore — a bucket-list Great Lakes experience",
        bestFor: "rest day",
        provider: "Pictured Rocks Cruises",
      },
      {
        name: "Marquette Brewery Crawl",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [20, 40],
        groupFriendly: true,
        highlight:
          "Hit Blackrocks, Ore Dock, and Barrel + Beam — the UP's best beer within a small radius",
        bestFor: "arrival day",
      },
      {
        name: "Presque Isle Park Hiking",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 5],
        groupFriendly: true,
        highlight:
          "328-acre peninsula park on Lake Superior — cliff trails, black bear sightings, and sunset views from the rocks",
        bestFor: "morning before golf",
      },
      {
        name: "Lake Superior Kayaking",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [50, 90],
        groupFriendly: true,
        highlight:
          "Paddle the crystal-clear Lake Superior shoreline — sea caves, sandstone arches, and pristine water",
        bestFor: "rest day",
        provider: "Great Lakes Kayak",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [100, 175],
        providers: ["Marquette Transportation", "UP Shuttle Service"],
        notes:
          "Small market — sprinter vans are the primary option. Most brewery crawls are walkable downtown. Book well in advance for summer.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [55, 120],
        providers: ["Take a Chef", "UP Catering Co"],
        mealTypes: [
          "Lake Superior whitefish dinner",
          "pasty dinner",
          "steak dinner",
          "BBQ cookout",
          "breakfast",
        ],
        notes:
          "The UP pasty (meat pie) is the iconic local food. Lake Superior whitefish is pristine. Many rental homes have outdoor Finnish saunas — pair with a lakeside cookout.",
      },
    ],
  },

  // ─── 17. St. Louis, MO ───────────────────────────────────────────
  {
    id: "st-louis-mo",
    city: "St. Louis",
    state: "MO",
    region: "Midwest",
    tagline: "Gateway to great golf with a world-class beer and BBQ scene",
    description:
      "St. Louis has a proud golf heritage — it hosted the 1904 Olympic golf event, multiple US Opens, and the PGA Championship. The public courses benefit from the rolling Missouri terrain, and the city's beer scene (beyond just Budweiser) and affordable group lodging make it a high-value trip. The Grove and Soulard neighborhoods bring serious nightlife energy.",
    population: "medium",
    nearestAirport: {
      code: "STL",
      name: "St. Louis Lambert International Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "Tapawingo National Golf Club",
        tier: "premium",
        greenFeeRange: [59, 99],
        holes: 18,
        par: 72,
        yardage: 7100,
        slope: 140,
        rating: 74.2,
        walkable: false,
        style: "parkland",
        driveMinutes: 40,
        url: "https://www.tapawingonational.com",
        highlight:
          "Gary Nicklaus design through Ozark foothills — dramatic elevation changes and championship conditioning at a public price",
      },
      {
        name: "Gateway National Golf Links",
        tier: "solid",
        greenFeeRange: [39, 69],
        holes: 18,
        par: 71,
        yardage: 6898,
        slope: 130,
        rating: 72.6,
        walkable: true,
        style: "links",
        driveMinutes: 15,
        url: "https://www.gatewaynational.com",
        highlight:
          "Links-style layout across the river in Madison, IL — firm and fast with views of the Gateway Arch",
      },
      {
        name: "Missouri Bluffs Golf Club",
        tier: "solid",
        greenFeeRange: [45, 75],
        holes: 18,
        par: 71,
        yardage: 6817,
        slope: 132,
        rating: 72.8,
        walkable: false,
        style: "parkland",
        driveMinutes: 30,
        url: "https://www.missouribluffs.com",
        highlight:
          "Tom Fazio design on the Missouri River bluffs — dramatic holes with 200-foot elevation drops",
      },
      {
        name: "Pevely Farms Golf Club",
        tier: "solid",
        greenFeeRange: [42, 69],
        holes: 18,
        par: 72,
        yardage: 6894,
        slope: 131,
        rating: 72.6,
        walkable: true,
        style: "parkland",
        driveMinutes: 35,
        url: "https://www.pevelyfarms.com",
        highlight:
          "Arthur Hills design south of the city — well-conditioned with interesting routing through farmland and woods",
      },
      {
        name: "Riverside Golf Course",
        tier: "budget",
        greenFeeRange: [25, 42],
        holes: 18,
        par: 71,
        yardage: 6277,
        slope: 119,
        rating: 69.4,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        highlight:
          "Fenton municipal right on the Meramec River — the best budget option near downtown St. Louis",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [500, 1500],
        amenities: [
          "full kitchen",
          "parking",
          "fire pit",
          "hot tub",
          "game room",
          "grill",
        ],
        areaDescription: "Soulard, The Grove, and Central West End",
        searchUrl:
          "https://www.vrbo.com/search?destination=St+Louis%2C+Missouri&adults=16",
        notes:
          "Soulard has large brick rowhouses walkable to bars. Central West End offers upscale homes near Forest Park. The Grove has newer lofts with a vibrant nightlife strip.",
      },
      {
        type: "house",
        sleeps: [10, 14],
        nightlyRange: [350, 900],
        amenities: ["full kitchen", "parking", "grill", "washer/dryer"],
        areaDescription: "Kirkwood and Webster Groves suburbs",
        searchUrl:
          "https://www.airbnb.com/s/St-Louis--Missouri/homes?adults=14",
        notes:
          "Charming inner-ring suburbs with larger homes and easy access to courses south and west of the city.",
      },
    ],
    dining: [
      {
        name: "Pappy's Smokehouse",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Nationally ranked BBQ — ribs that sell out daily, so get there early. Worth planning the round around it.",
        reservationNeeded: false,
      },
      {
        name: "Sidney Street Cafe",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Benton Park's James Beard-nominated fine dining — creative seasonal menus in an intimate space",
        reservationNeeded: true,
      },
      {
        name: "Broadway Oyster Bar",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Cajun-Creole dive with live blues — oysters, gumbo, and the best late-night food in St. Louis",
        reservationNeeded: false,
      },
      {
        name: "Sugarfire Smoke House",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Creative BBQ with rotating specials — brisket, pulled pork, and excellent sides in a big group-friendly space",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "4 Hands Brewing Co.",
        vibe: "brewpub",
        highlight:
          "LaSalle Park taproom with a huge indoor/outdoor space — creative craft beers and a lively atmosphere",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Venice Cafe",
        vibe: "dive",
        highlight:
          "Benton Park art-covered dive — mosaic walls, live music, and a fire pit courtyard that's pure St. Louis weirdness",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Handlebar",
        vibe: "patio",
        highlight:
          "The Grove's sprawling outdoor bar with sand volleyball, firepits, and a festival vibe",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Taste Bar",
        vibe: "cocktail",
        highlight:
          "Central West End craft cocktail bar — inventive drinks in an intimate, stylish space",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Gateway Arch & Riverfront",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [15, 25],
        groupFriendly: true,
        highlight:
          "Ride to the top of the 630-foot Gateway Arch — iconic views of the Mississippi River and downtown",
        bestFor: "arrival day",
        provider: "Gateway Arch National Park",
      },
      {
        name: "Anheuser-Busch Brewery Tour",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [0, 35],
        groupFriendly: true,
        highlight:
          "Tour the historic Budweiser brewery with the famous Clydesdales — free samples included on the basic tour",
        bestFor: "rest day",
        provider: "Anheuser-Busch",
      },
      {
        name: "STL Brewery District Crawl",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [20, 40],
        groupFriendly: true,
        highlight:
          "Hit 4 Hands, Urban Chestnut, and Side Project — all within a few miles of downtown",
        bestFor: "arrival day",
      },
      {
        name: "Top Golf Chesterfield",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "Three-level driving range with food and drinks — competitive group warm-up",
        bestFor: "arrival day",
        provider: "Topgolf",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 28],
        hourlyRate: [175, 300],
        providers: ["STL Party Bus", "Gateway Party Express"],
        notes:
          "Soulard Mardi Gras and Cardinals game-day infrastructure means lots of bus options. Brewery crawls are the most popular group route.",
      },
      {
        type: "trolley",
        capacity: [14, 24],
        hourlyRate: [150, 250],
        providers: ["STL Fun Trolley"],
        notes:
          "Open-air trolley for brewery tours and downtown loops.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [50, 110],
        providers: ["Take a Chef", "STL Private Dining Co"],
        mealTypes: [
          "steak dinner",
          "BBQ cookout",
          "STL-style pork steak dinner",
          "Italian feast (The Hill style)",
          "breakfast",
        ],
        notes:
          "St. Louis pork steaks (grilled with Maull's BBQ sauce) are the city's signature. Toasted ravioli is the essential appetizer. The Hill neighborhood's Italian heritage means amazing chefs.",
      },
    ],
  },

  // ─── 18. Kansas City, MO ──────────────────────────────────────────
  {
    id: "kansas-city-mo",
    city: "Kansas City",
    state: "MO",
    region: "Midwest",
    tagline: "BBQ capital of the world with sneaky-good public golf",
    description:
      "Kansas City is where you go for the best BBQ in America, a jazz-fueled nightlife scene in the Power & Light District and Crossroads, and public golf that benefits from the rolling KC terrain. The city straddles the Missouri-Kansas border, doubling your course and lodging options. Cheap flights and affordable everything make it a high-value trip.",
    population: "medium",
    nearestAirport: {
      code: "MCI",
      name: "Kansas City International Airport",
      driveMinutes: 25,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "Creekmoor Golf Club",
        tier: "solid",
        greenFeeRange: [39, 65],
        holes: 18,
        par: 72,
        yardage: 6877,
        slope: 134,
        rating: 72.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.playcreekmoor.com",
        highlight:
          "Raymore's hidden gem — rolling terrain through creeks and hardwoods with excellent conditioning for the price",
      },
      {
        name: "Shoal Creek Golf Course",
        tier: "solid",
        greenFeeRange: [35, 59],
        holes: 18,
        par: 71,
        yardage: 6749,
        slope: 131,
        rating: 72.2,
        walkable: true,
        style: "parkland",
        driveMinutes: 30,
        url: "https://www.shoalcreekgolf.com",
        highlight:
          "KC Northland's best public course — strategically bunkered with elevation changes through native Missouri landscape",
      },
      {
        name: "Swope Memorial Golf Course",
        tier: "solid",
        greenFeeRange: [25, 45],
        holes: 18,
        par: 72,
        yardage: 6274,
        slope: 127,
        rating: 71.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.swopememorialgc.com",
        highlight:
          "A.W. Tillinghast design in Swope Park — one of the great municipal courses in America, recently restored",
      },
      {
        name: "Falcon Ridge Golf Club",
        tier: "solid",
        greenFeeRange: [42, 69],
        holes: 18,
        par: 72,
        yardage: 6920,
        slope: 133,
        rating: 73.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 30,
        highlight:
          "Lenexa, KS course with dramatic elevation and mature trees — plays long and challenging from the tips",
      },
      {
        name: "Sycamore Ridge Golf Club",
        tier: "solid",
        greenFeeRange: [35, 59],
        holes: 18,
        par: 72,
        yardage: 6700,
        slope: 129,
        rating: 71.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 25,
        highlight:
          "Spring Hill, KS course with wide fairways and fast greens — great for scoring and group-friendly pace",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [500, 1500],
        amenities: [
          "full kitchen",
          "parking",
          "fire pit",
          "hot tub",
          "game room",
          "grill",
        ],
        areaDescription: "Brookside, Waldo, and Westport neighborhoods",
        searchUrl:
          "https://www.vrbo.com/search?destination=Kansas+City%2C+Missouri&adults=16",
        notes:
          "Brookside and Waldo have large craftsman homes 10 min from downtown. Westport puts you walkable to the best bars. Kansas side (Overland Park) has newer, larger homes near courses.",
      },
      {
        type: "house",
        sleeps: [10, 14],
        nightlyRange: [350, 900],
        amenities: ["full kitchen", "parking", "grill", "washer/dryer"],
        areaDescription: "Crossroads and River Market",
        searchUrl:
          "https://www.airbnb.com/s/Kansas-City--Missouri/homes?adults=14",
        notes:
          "Urban lofts and condos walkable to Power & Light and BBQ joints. May need two units for 16+.",
      },
    ],
    dining: [
      {
        name: "Joe's Kansas City Bar-B-Que",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "The Z-Man sandwich and burnt ends are legendary — housed in a gas station, nationally ranked #1 BBQ multiple times",
        reservationNeeded: false,
      },
      {
        name: "Q39",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Upscale KC BBQ with craft cocktails — the best sit-down BBQ experience for a group dinner",
        reservationNeeded: true,
      },
      {
        name: "Stock Hill",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "KC's best steakhouse — dry-aged prime beef, private dining, and a world-class bourbon selection",
        reservationNeeded: true,
      },
      {
        name: "Town Topic Hamburgers",
        style: "casual",
        priceRange: "$",
        capacity: "medium",
        highlight:
          "24-hour diner with smash burgers since 1937 — the essential late-night KC stop",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Boulevard Brewing Co.",
        vibe: "brewpub",
        highlight:
          "KC's flagship brewery — massive beer hall with 20+ taps, tours, and a rooftop deck with skyline views",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "John's Big Deck",
        vibe: "patio",
        highlight:
          "Westport's sprawling rooftop/deck bar — the go-to party spot with games and a DJ on weekends",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Manifesto",
        vibe: "cocktail",
        highlight:
          "Hidden speakeasy below The Rieger — one of the best cocktail bars in the country, accessed through an unmarked door",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Knuckleheads Saloon",
        vibe: "honky-tonk",
        highlight:
          "East Bottoms roadhouse with live blues, country, and rock — outdoor stages, train tracks, and KC grit",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "KC BBQ Tour",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "Hit Joe's, Q39, Arthur Bryant's, and Gates BBQ — the ultimate burnt ends and brisket crawl",
        bestFor: "arrival day",
      },
      {
        name: "18th & Vine Jazz District",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [10, 30],
        groupFriendly: true,
        highlight:
          "Historic jazz district where Charlie Parker learned to play — live music, the Jazz Museum, and the Negro Leagues Baseball Museum",
        bestFor: "rest day",
      },
      {
        name: "Power & Light District Bar Crawl",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [20, 40],
        groupFriendly: true,
        highlight:
          "KC's downtown entertainment district — bars, live music, and big-screen sports all within one block",
        bestFor: "arrival day",
      },
      {
        name: "Chicken N Pickle",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [20, 40],
        groupFriendly: true,
        highlight:
          "Pickleball, yard games, and fried chicken — the most KC group activity possible",
        bestFor: "rest day",
        provider: "Chicken N Pickle",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 28],
        hourlyRate: [175, 300],
        providers: ["KC Party Bus", "Midwest Motorcoach"],
        notes:
          "Chiefs game-day and Power & Light infrastructure means excellent bus availability. BBQ tour packages are a thing.",
      },
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [125, 200],
        providers: ["KC Executive Transportation", "Metro Rides"],
        notes:
          "Sprinter vans for course-to-Westport or course-to-Power & Light loops.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [50, 110],
        providers: ["Take a Chef", "KC Culinary Co"],
        mealTypes: [
          "KC-style BBQ feast",
          "steak dinner",
          "burnt ends cookout",
          "brunch",
          "breakfast",
        ],
        notes:
          "Kansas City BBQ is the obvious centerpiece — request a full spread with burnt ends, ribs, brisket, and all the fixings. A good KC pitmaster will bring their own smoker.",
      },
    ],
  },

  // ─── 19. Milwaukee, WI ────────────────────────────────────────────
  {
    id: "milwaukee-wi",
    city: "Milwaukee",
    state: "WI",
    region: "Midwest",
    tagline: "Brew City with lakefront links and Big Ten energy",
    description:
      "Milwaukee is a beer-and-brats paradise on Lake Michigan with a surprisingly deep public golf scene anchored by Brown Deer Park (former PGA Tour host) and several excellent county courses. The Third Ward, Brady Street, and Bay View neighborhoods deliver walkable nightlife, and the city's affordable lodging makes it easy to house a crew of 16.",
    population: "medium",
    nearestAirport: {
      code: "MKE",
      name: "Milwaukee Mitchell International Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "Brown Deer Park Golf Course",
        tier: "premium",
        greenFeeRange: [49, 85],
        holes: 18,
        par: 71,
        yardage: 6759,
        slope: 135,
        rating: 72.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.countyparks.com/golf/brown-deer",
        highlight:
          "Former PGA Tour Greater Milwaukee Open host — Andy North won here, and the course still has championship bones at a county price",
      },
      {
        name: "Oakwood Park Golf Course",
        tier: "solid",
        greenFeeRange: [32, 52],
        holes: 18,
        par: 71,
        yardage: 6429,
        slope: 124,
        rating: 70.6,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.countyparks.com/golf/oakwood",
        highlight:
          "South Milwaukee county course with Lake Michigan views — excellent value with surprisingly good greens",
      },
      {
        name: "Whitnall Park Golf Course",
        tier: "solid",
        greenFeeRange: [32, 52],
        holes: 18,
        par: 71,
        yardage: 6522,
        slope: 126,
        rating: 71.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.countyparks.com/golf/whitnall",
        highlight:
          "Hales Corners county course with mature oaks and tight fairways — the most challenging of the Milwaukee county tracks",
      },
      {
        name: "Fire Ridge Golf Club",
        tier: "solid",
        greenFeeRange: [45, 75],
        holes: 18,
        par: 72,
        yardage: 6890,
        slope: 134,
        rating: 73.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 35,
        url: "https://www.fireridgegc.com",
        highlight:
          "Grafton's best public course — links-parkland hybrid with excellent conditioning and challenging green complexes",
      },
      {
        name: "Washington County Golf Course",
        tier: "solid",
        greenFeeRange: [39, 65],
        holes: 18,
        par: 72,
        yardage: 6743,
        slope: 131,
        rating: 72.4,
        walkable: true,
        style: "parkland",
        driveMinutes: 40,
        url: "https://www.washingtoncountygolf.com",
        highlight:
          "Arthur Hills design through Kettle Moraine terrain — glacial ridges create unique elevation changes you don't expect in Wisconsin",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [500, 1500],
        amenities: [
          "full kitchen",
          "parking",
          "fire pit",
          "hot tub",
          "grill",
          "game room",
        ],
        areaDescription: "Bay View and Walker's Point neighborhoods",
        searchUrl:
          "https://www.vrbo.com/search?destination=Milwaukee%2C+Wisconsin&adults=16",
        notes:
          "Bay View has the best bar strip in the city. Walker's Point puts you walkable to the Third Ward. East Side near Brady Street also has large rental homes near nightlife.",
      },
      {
        type: "house",
        sleeps: [10, 14],
        nightlyRange: [350, 900],
        amenities: ["full kitchen", "parking", "grill", "washer/dryer"],
        areaDescription: "East Side and Shorewood",
        searchUrl:
          "https://www.airbnb.com/s/Milwaukee--Wisconsin/homes?adults=14",
        notes:
          "Lake Michigan-adjacent neighborhoods with good inventory. Walkable to Brady Street bars. UWM area has larger homes.",
      },
    ],
    dining: [
      {
        name: "Carson's Prime Steaks & Famous Barbecue",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Milwaukee classic — prime steaks and baby back ribs in a clubby downtown setting",
        reservationNeeded: true,
      },
      {
        name: "Lakefront Brewery",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "The most fun brewery tour in America (Friday fish fry included) — polka music and all-you-can-eat cheese curds",
        reservationNeeded: true,
      },
      {
        name: "Odd Duck",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Bay View's nationally recognized small-plates restaurant — creative seasonal dishes with local ingredients",
        reservationNeeded: true,
      },
      {
        name: "Kopp's Frozen Custard",
        style: "casual",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Milwaukee institution — the best frozen custard in the world with massive burgers. Three locations.",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Lakefront Brewery Taproom",
        vibe: "brewpub",
        highlight:
          "Massive riverfront taproom with the best Friday fish fry in the city — get the tour for the full experience",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Bryant's Cocktail Lounge",
        vibe: "cocktail",
        highlight:
          "No-menu cocktail lounge since 1938 — tell the bartender what you like and they'll make something perfect",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Wolski's Tavern",
        vibe: "dive",
        highlight:
          "Milwaukee's most famous dive — 'I Closed Wolski's' bumper stickers are a badge of honor. Open till 2:30 AM.",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "The Garage on Brady",
        vibe: "sports-bar",
        highlight:
          "Brady Street sports bar with a huge patio — the best spot to watch Bucks and Brewers games with a group",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Milwaukee Brewery Tour",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [25, 50],
        groupFriendly: true,
        highlight:
          "Hit Lakefront, Third Space, Good City, and MKE Brewing — Beer City #2 (sorry, GR) delivers",
        bestFor: "arrival day",
      },
      {
        name: "Lakefront Boat Cruise",
        type: "boat-rental",
        duration: "2-3 hours",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "Lake Michigan and Milwaukee River cruise — skyline views and sunset drinks on the water",
        bestFor: "rest day",
        provider: "Milwaukee Boat Line",
      },
      {
        name: "Axe MKE",
        type: "axe-throwing",
        duration: "2-3 hours",
        pricePerPerson: [25, 40],
        groupFriendly: true,
        highlight:
          "Competitive axe throwing with BYOB — the ideal group activity for a crew that likes to compete",
        bestFor: "rest day",
        provider: "Axe MKE",
      },
      {
        name: "Milwaukee Kayak Company",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [35, 60],
        groupFriendly: true,
        highlight:
          "Paddle the Milwaukee River through downtown — urban kayaking past breweries and under bridges",
        bestFor: "morning before golf",
        provider: "Milwaukee Kayak Company",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 28],
        hourlyRate: [175, 300],
        providers: ["Milwaukee Party Bus", "Brew City Rides"],
        notes:
          "Bucks/Brewers game-day infrastructure means excellent availability. Brewery crawl packages are the most popular group route.",
      },
      {
        type: "trolley",
        capacity: [14, 24],
        hourlyRate: [150, 250],
        providers: ["Milwaukee Trolley Loop"],
        notes:
          "Open-air trolley for brewery tours — hits the Third Ward, Walker's Point, and Brady Street.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [50, 110],
        providers: ["Take a Chef", "Milwaukee Catering Co"],
        mealTypes: [
          "Wisconsin supper club dinner",
          "steak dinner",
          "Friday fish fry",
          "brat & beer cookout",
          "breakfast",
        ],
        notes:
          "Friday fish fry is sacred in Milwaukee — request it if your trip includes a Friday. Cheese curds are the mandatory appetizer. Pair with Lakefront Brewery or Spotted Cow.",
      },
    ],
  },

  // ─── 20. Omaha, NE ────────────────────────────────────────────────
  {
    id: "omaha-ne",
    city: "Omaha",
    state: "NE",
    region: "Midwest",
    tagline: "Steak capital with championship-pedigree public golf",
    description:
      "Omaha is America's steak capital — home to the original Omaha Steaks and a beef culture that permeates every restaurant. Indian Creek, a former PGA Tour stop, anchors the public golf scene alongside several strong municipal and daily-fee courses. The Old Market district delivers walkable nightlife, and the Berkshire Hathaway city's Midwestern hospitality makes groups feel welcome everywhere.",
    population: "medium",
    nearestAirport: {
      code: "OMA",
      name: "Eppley Airfield",
      driveMinutes: 10,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "Indian Creek Golf Course",
        tier: "premium",
        greenFeeRange: [49, 85],
        holes: 18,
        par: 72,
        yardage: 7218,
        slope: 138,
        rating: 74.4,
        walkable: false,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.indiancreekgolfcourse.com",
        highlight:
          "Former PGA Tour site — the best public course in Nebraska with tournament conditioning and a challenging layout through mature trees",
      },
      {
        name: "Quarry Oaks Golf Club",
        tier: "premium",
        greenFeeRange: [59, 99],
        holes: 18,
        par: 72,
        yardage: 7015,
        slope: 140,
        rating: 74.0,
        walkable: false,
        style: "parkland",
        driveMinutes: 35,
        url: "https://www.quarryoaks.com",
        highlight:
          "Carved from a limestone quarry along the Missouri River bluffs — dramatic 200-foot elevation changes and stunning views",
      },
      {
        name: "Tiburon Golf Club",
        tier: "solid",
        greenFeeRange: [39, 65],
        holes: 27,
        par: 72,
        yardage: 6871,
        slope: 131,
        rating: 72.6,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "27 holes in west Omaha — three distinct nines with good variety and consistently well-maintained greens",
      },
      {
        name: "The Knolls Golf Course",
        tier: "solid",
        greenFeeRange: [25, 45],
        holes: 18,
        par: 71,
        yardage: 6296,
        slope: 123,
        rating: 70.2,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.theknollsgolfcourse.com",
        highlight:
          "City of Omaha's best muni — hilly and fun with mature trees and the best budget green fees in the metro",
      },
      {
        name: "Willow Lakes Golf Course",
        tier: "budget",
        greenFeeRange: [22, 38],
        holes: 18,
        par: 71,
        yardage: 6180,
        slope: 118,
        rating: 68.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        highlight:
          "Affordable warm-up round in Bellevue — flat and forgiving with some nice water features",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [400, 1200],
        amenities: [
          "full kitchen",
          "parking",
          "fire pit",
          "hot tub",
          "game room",
          "grill",
        ],
        areaDescription: "Dundee and Benson neighborhoods",
        searchUrl:
          "https://www.vrbo.com/search?destination=Omaha%2C+Nebraska&adults=16",
        notes:
          "Dundee has large craftsman homes near Warren Buffett's house (literally). Benson has a walkable bar strip. Both are 10-15 min from downtown. Omaha is extremely affordable.",
      },
      {
        type: "house",
        sleeps: [10, 14],
        nightlyRange: [300, 800],
        amenities: ["full kitchen", "parking", "grill", "washer/dryer"],
        areaDescription: "Old Market and Midtown",
        searchUrl:
          "https://www.airbnb.com/s/Omaha--Nebraska/homes?adults=14",
        notes:
          "Old Market lofts put you walkable to the best restaurants and bars. Midtown has more space for less money.",
      },
    ],
    dining: [
      {
        name: "Gorat's Steakhouse",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Warren Buffett's favorite steakhouse — old-school Omaha beef at its finest. T-bones and prime rib are the move.",
        reservationNeeded: true,
      },
      {
        name: "The Drover",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Omaha institution since 1968 — the whiskey-marinated filet is legendary among steak aficionados",
        reservationNeeded: true,
      },
      {
        name: "Block 16",
        style: "casual",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "James Beard-nominated sandwich shop — the Croque Garcon and Korean-inspired dishes are incredible",
        reservationNeeded: false,
      },
      {
        name: "Leadbelly",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Benson's best restaurant — creative comfort food, great burgers, and a packed bar scene",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Brickway Brewery & Distillery",
        vibe: "brewpub",
        highlight:
          "Old Market brewery and distillery combo — craft beer, bourbon, and a great downtown atmosphere",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Berry & Rye",
        vibe: "cocktail",
        highlight:
          "Omaha's best speakeasy — hidden entrance, craft cocktails, and a moody prohibition-era vibe",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Sydney",
        vibe: "dive",
        highlight:
          "Benson's beloved dive — cheap drinks, live music, and the heart of Omaha's best bar strip",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Rathskeller Bier Haus",
        vibe: "patio",
        highlight:
          "German-style beer garden in the Old Market — massive outdoor space, imported beers, and a lively atmosphere",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Old Market District Crawl",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [20, 40],
        groupFriendly: true,
        highlight:
          "Walk the cobblestone streets of the Old Market — breweries, cocktail bars, and restaurants all within blocks",
        bestFor: "arrival day",
      },
      {
        name: "Henry Doorly Zoo",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [20, 30],
        groupFriendly: true,
        highlight:
          "Consistently ranked the #1 zoo in the world — the indoor desert dome and jungle are genuinely incredible",
        bestFor: "rest day",
        provider: "Omaha's Henry Doorly Zoo",
      },
      {
        name: "Topgolf Omaha",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "Three-level driving range with food and drinks — the standard pre-trip warm-up competition",
        bestFor: "arrival day",
        provider: "Topgolf",
      },
      {
        name: "Benson Brewery & Bar Crawl",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [15, 35],
        groupFriendly: true,
        highlight:
          "Walk Maple Street in Benson — Omaha's best bar strip with 10+ spots all within a few blocks",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 24],
        hourlyRate: [150, 250],
        providers: ["Omaha Party Bus", "Good Life Limo"],
        notes:
          "CWS (College World Series) infrastructure means decent bus availability. Old Market and Benson crawls are the popular routes.",
      },
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [100, 175],
        providers: ["Omaha Executive Shuttle"],
        notes:
          "Course-to-Old Market loops. Affordable market overall.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [50, 110],
        providers: ["Take a Chef", "Omaha Catering Co"],
        mealTypes: [
          "Omaha steak dinner",
          "prime rib dinner",
          "BBQ cookout",
          "breakfast",
          "Nebraska corn-fed feast",
        ],
        notes:
          "This is steak country — a prime rib or filet dinner with Nebraska corn is the obvious play. Request a Reuben sandwich spread for lunch (the Reuben was invented in Omaha).",
      },
    ],
  },
];
