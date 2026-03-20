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
];
