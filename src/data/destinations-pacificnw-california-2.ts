import { Destination } from "./types";

export const pacificNwCalifornia2Destinations: Destination[] = [
  // ─── University Place (Chambers Bay), WA ──────────────────────────
  {
    id: "university-place-wa",
    city: "University Place",
    state: "WA",
    region: "Pacific NW",
    tagline: "Play the 2015 U.S. Open links on the shores of Puget Sound",
    description:
      "Home to Chambers Bay — the Robert Trent Jones Jr. links that hosted the 2015 U.S. Open and the first major in the Pacific Northwest. It's a walking-only fescue gauntlet on Puget Sound, 20 minutes from Tacoma's bars and a quick run to a dozen more Pierce County tracks. Bucket-list golf without the bucket-list flight.",
    population: "small",
    nearestAirport: {
      code: "SEA",
      name: "Seattle-Tacoma International Airport",
      driveMinutes: 40,
    },
    bestSeasons: ["summer", "fall"],
    groceryNotes:
      "Safeway and Fred Meyer in University Place; Costco and Total Wine 15 min in Tacoma",
    courses: [
      {
        name: "Chambers Bay",
        tier: "bucket-list",
        greenFeeRange: [170, 230],
        holes: 18,
        par: 72,
        yardage: 7585,
        walkable: true,
        style: "links",
        driveMinutes: 5,
        url: "https://chambersbaygolf.com/golf/",
        highlight:
          "2015 U.S. Open host — fine-fescue links on Puget Sound, walking-only and one of the toughest walks in golf",
        googleRating: 4.5,
        reviewCount: 2100,
        hypeTag: "TOURNAMENT HOST",
        rankNote: "2015 U.S. Open & 2010 U.S. Amateur Host",
      },
      {
        name: "Brookdale Golf Club",
        tier: "solid",
        greenFeeRange: [40, 65],
        holes: 18,
        par: 72,
        yardage: 6425,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "Classic mature parkland muni in Tacoma — affordable, walkable warm-up before the Chambers Bay grind",
        googleRating: 4.2,
        reviewCount: 600,
      },
      {
        name: "Meadow Park Golf Course (Lake Course)",
        tier: "budget",
        greenFeeRange: [30, 50],
        holes: 18,
        par: 71,
        yardage: 6109,
        walkable: true,
        style: "parkland",
        driveMinutes: 12,
        url: "https://www.parkstacoma.gov/place/meadow-park-golf-course/",
        highlight:
          "Tacoma's century-old muni — cheap, flat, and friendly, the perfect filler round on a budget day",
        googleRating: 4.2,
        reviewCount: 700,
      },
      {
        name: "The Home Course",
        tier: "premium",
        greenFeeRange: [70, 110],
        holes: 18,
        par: 72,
        yardage: 7196,
        walkable: true,
        style: "links",
        driveMinutes: 15,
        url: "https://www.thehomecourse.com",
        highlight:
          "WA Golf's own links-style course in DuPont — wide fescue fairways and Puget Sound views, a great Chambers Bay companion",
        googleRating: 4.5,
        reviewCount: 450,
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [400, 900],
        amenities: ["hot tub", "deck", "big kitchen", "water views", "fire pit"],
        areaDescription:
          "University Place and Tacoma's North End — residential homes minutes from Chambers Bay",
        searchUrl:
          "https://www.vrbo.com/search?destination=University+Place%2C+WA&groupSize=12",
        notes:
          "Stay close to Chambers Bay in University Place, or pick Tacoma's North End for walkable bars and restaurants. Book summer weekends early — Seattle weekenders compete for the same homes.",
        avgRating: 4.6,
        bedsBreakdown: "3 kings + 2 queens + bunks = 12 guys",
      },
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [200, 400],
        amenities: ["downtown location", "rooftop bar", "fitness center", "restaurants"],
        areaDescription:
          "Downtown Tacoma hotel block near the waterfront and Stadium District",
        searchUrl:
          "https://www.marriott.com/search/findHotels.mi?t=tacoma+wa",
        notes:
          "Book 5-8 rooms at McMenamins Elks Temple or the Hotel Murano downtown. Puts the crew steps from Tacoma's bar scene with an easy 20-min ride to Chambers Bay.",
        avgRating: 4.4,
      },
    ],
    dining: [
      {
        name: "The Lobster Shop",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Waterfront seafood on Commencement Bay — Dungeness crab, lobster, and a sunset view over the water",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "El Gaucho Tacoma",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Old-school tableside steakhouse with Chateaubriand carved at the table — the big-night dinner spot",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Engine House No. 9",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Historic firehouse brewpub in the 6th Ave district — burgers, house beer, and zero pretension",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "Pho King",
        style: "casual",
        priceRange: "$",
        capacity: "medium",
        highlight:
          "Beloved Tacoma pho joint — exactly the hangover cure the crew needs before an early tee time",
        reservationNeeded: false,
        googleRating: 4.5,
      },
    ],
    bars: [
      {
        name: "The Spar Tavern",
        vibe: "dive",
        highlight:
          "Old Town Tacoma institution since 1908 — stiff pours, history on the walls, and burgers till late",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.4,
      },
      {
        name: "7 Seas Brewing",
        vibe: "brewpub",
        highlight:
          "Big garage-door taproom in the Brewery District — long tables that swallow a 16-man crew",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
      {
        name: "Doyle's Public House",
        vibe: "sports-bar",
        highlight:
          "Downtown Irish pub with 30+ taps and every game on — the default late-round watering hole",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
    ],
    activities: [
      {
        name: "Puget Sound Fishing Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [150, 250],
        groupFriendly: true,
        highlight:
          "Chase salmon and bottomfish on Puget Sound — multiple boats can split a big group",
        bestFor: "rest day",
        provider: "All Star Fishing Charters",
      },
      {
        name: "Point Defiance Park & Zoo",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 25],
        groupFriendly: true,
        highlight:
          "700-acre waterfront park with old-growth trails and Five Mile Drive — easy recovery-day legs",
        bestFor: "rest day",
        provider: "Metro Parks Tacoma",
      },
      {
        name: "Tacoma Brewery Crawl",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [40, 80],
        groupFriendly: true,
        highlight:
          "Hit 7 Seas, Wingman, and Narrows in the Brewery District — walkable craft-beer afternoon",
        bestFor: "arrival day",
        provider: "self-guided",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 30],
        hourlyRate: [150, 300],
        fullDayRate: [1200, 2400],
        canDoGolfAndBars: true,
        providers: [
          "Seattle Party Bus",
          "Northwest Limousine",
          "Tacoma Party Bus",
        ],
        notes:
          "Most Seattle-Tacoma operators will run morning golf shuttles and evening bar runs. Book 4-6 weeks ahead for summer weekends.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 150],
        providers: ["Take a Chef", "Cozymeal", "Hire a Chef Seattle"],
        mealTypes: ["fresh seafood feast", "steak dinner", "crab boil", "breakfast spread"],
        notes:
          "Bring in a chef for a Dungeness crab boil or steak night at the rental. Tacoma/Seattle chefs travel to University Place easily. Book 2 weeks ahead.",
      },
    ],
  },

  // ─── Brewster (Gamble Sands), WA ──────────────────────────────────
  {
    id: "brewster-wa",
    city: "Brewster",
    state: "WA",
    region: "Pacific NW",
    tagline: "The top-ranked links destination hiding in Washington's high desert",
    description:
      "Gamble Sands is the reason you fly to a tiny apple town on the Columbia River. Two David McLay Kidd championship courses, a 14-hole short course, and a massive putting green make this a 50-hole, stay-and-play paradise ranked top-40 public in America. Remote, sandy, and built for buddies who came to play golf — not chase nightlife.",
    population: "tiny",
    nearestAirport: {
      code: "GEG",
      name: "Spokane International Airport",
      driveMinutes: 150,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "Limited in Brewster — stock up at the Safeway/Walmart in Omak (30 min) or bring it in; the resort has dining on-site",
    courses: [
      {
        name: "Gamble Sands (Sands Course)",
        tier: "bucket-list",
        greenFeeRange: [225, 245],
        holes: 18,
        par: 72,
        yardage: 7169,
        walkable: true,
        style: "links",
        driveMinutes: 5,
        url: "https://www.gamblesands.com/",
        highlight:
          "David McLay Kidd's wide, fast, fun fescue links high above the Columbia — Top 40 Greatest Public in America",
        googleRating: 4.9,
        reviewCount: 600,
        hypeTag: "TOP 100 PUBLIC",
        rankNote: "No. 31 — Golf Digest America's 100 Greatest Public 2025-26",
      },
      {
        name: "Scarecrow at Gamble Sands",
        tier: "bucket-list",
        greenFeeRange: [225, 245],
        holes: 18,
        par: 72,
        yardage: 7000,
        walkable: true,
        style: "links",
        driveMinutes: 5,
        url: "https://www.gamblesands.com/",
        highlight:
          "Dramatic 2025 clifftop McLay Kidd design over the Columbia River — Golf Digest's Best New Public Course of 2025",
        googleRating: 4.9,
        reviewCount: 150,
        hypeTag: "BUCKET LIST",
        rankNote: "Best New Public Course 2025 — Golf Digest",
      },
      {
        name: "Quicksands (Short Course)",
        tier: "premium",
        greenFeeRange: [60, 90],
        holes: 14,
        par: 37,
        yardage: 2100,
        walkable: true,
        style: "links",
        driveMinutes: 5,
        url: "https://www.gamblesands.com/",
        highlight:
          "14-hole McLay Kidd par-3/short course built for skins games, sunset rounds, and beers in hand",
        googleRating: 4.8,
        reviewCount: 120,
        hypeTag: "HIDDEN GEM",
      },
    ],
    lodging: [
      {
        type: "lodge",
        sleeps: [8, 16],
        nightlyRange: [300, 600],
        amenities: ["on-site golf", "restaurant", "fire pits", "view rooms", "shuttle"],
        areaDescription:
          "The Inn at Gamble Sands — on-property rooms steps from the first tee",
        searchUrl: "https://www.gamblesands.com/stay/",
        notes:
          "Book a block of rooms or the cabins at the Inn at Gamble Sands. Staying on-site is the move — it's a 2.5-hour drive from Spokane and there's nothing else nearby.",
        avgRating: 4.8,
        bedsBreakdown: "Book 8 rooms with 2 beds each = 16 guys",
      },
      {
        type: "house",
        sleeps: [8, 12],
        nightlyRange: [250, 500],
        amenities: ["kitchen", "river access", "deck", "hot tub"],
        areaDescription:
          "Vacation homes in Brewster and Pateros along the Columbia/Methow rivers",
        searchUrl:
          "https://www.vrbo.com/search?destination=Brewster%2C+WA&groupSize=12",
        notes:
          "A handful of river-house rentals in Brewster and nearby Pateros for crews that want a kitchen and a deck on the water. Limited inventory — book early.",
        avgRating: 4.6,
      },
    ],
    dining: [
      {
        name: "Danny Boy Bar & Grill (Gamble Sands)",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "The resort's clubhouse grill — burgers, beers, and the obvious post-round gathering spot",
        reservationNeeded: false,
        googleRating: 4.5,
      },
      {
        name: "Tumbleweeds at Gamble Sands",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "On-site sit-down restaurant with a wood-fired menu and Columbia Valley wines",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Sunny's Restaurant",
        style: "mexican",
        priceRange: "$",
        capacity: "medium",
        highlight:
          "Honest small-town Mexican in Brewster — cheap, big plates, the off-resort dinner option",
        reservationNeeded: false,
        googleRating: 4.4,
      },
    ],
    bars: [
      {
        name: "Danny Boy Bar (Gamble Sands)",
        vibe: "patio",
        highlight:
          "Fire-pit patio over the 18th — where every round ends with a cold one and the day's bets settled",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.6,
      },
      {
        name: "The Cascades Putting Course Bar",
        vibe: "patio",
        highlight:
          "Beers in hand while you battle on the 100,000-sq-ft putting course at dusk",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Pateros Brewing",
        vibe: "brewpub",
        highlight:
          "Tiny riverside brewery in nearby Pateros for a low-key off-property pint",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.5,
      },
    ],
    activities: [
      {
        name: "Cascades Putting Course",
        type: "go-karts",
        duration: "1-2 hours",
        pricePerPerson: [25, 40],
        groupFriendly: true,
        highlight:
          "100,000-sq-ft McLay Kidd putting course — a beers-and-bets institution after the last round",
        bestFor: "arrival day",
        provider: "Gamble Sands",
      },
      {
        name: "Columbia River Jet Boat / Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [120, 220],
        groupFriendly: true,
        highlight:
          "Salmon, steelhead, and walleye on the Columbia right below the resort",
        bestFor: "rest day",
        provider: "Local Columbia River guides",
      },
      {
        name: "Lake Chelan Wine Tasting",
        type: "winery",
        duration: "half day",
        pricePerPerson: [40, 90],
        groupFriendly: true,
        highlight:
          "Day trip to the Lake Chelan AVA (45 min) for lakeside tasting rooms and a boat-rental crowd",
        bestFor: "rest day",
        provider: "Lake Chelan wineries",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 24],
        hourlyRate: [120, 250],
        fullDayRate: [900, 1800],
        canDoGolfAndBars: false,
        providers: ["Wenatchee charter operators", "Gamble Sands resort shuttle"],
        notes:
          "This is a fly-in-and-stay-put destination — most groups rent SUVs in Spokane or Wenatchee. The resort runs an on-property shuttle between lodging, courses, and the putting green.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [80, 160],
        providers: ["Wenatchee-area private chefs", "Take a Chef"],
        mealTypes: ["steak dinner", "Columbia salmon", "BBQ cookout"],
        notes:
          "Remote location limits options — the resort restaurants cover most groups. A Wenatchee chef can travel in for a private steak or salmon night if booked well ahead.",
      },
    ],
  },

  // ─── Cle Elum (Suncadia), WA ──────────────────────────────────────
  {
    id: "cle-elum-wa",
    city: "Cle Elum",
    state: "WA",
    region: "Pacific NW",
    tagline: "Mountain-resort golf 80 minutes from Seattle over the pass",
    description:
      "Suncadia Resort packs 36 holes of championship mountain golf onto 6,400 forested acres just over Snoqualmie Pass. The Prospector and Rope Rider courses thread through pines and old coal-mining country, and the resort handles lodging, dining, and a spa in one place. Easy fly-in, easy logistics, big-views golf.",
    population: "tiny",
    nearestAirport: {
      code: "SEA",
      name: "Seattle-Tacoma International Airport",
      driveMinutes: 90,
    },
    bestSeasons: ["summer", "fall"],
    groceryNotes:
      "Safeway and a Grocery Outlet in Cle Elum; the resort has markets and dining on-site",
    courses: [
      {
        name: "Suncadia Resort — Prospector Course",
        tier: "premium",
        greenFeeRange: [110, 175],
        holes: 18,
        par: 72,
        yardage: 7100,
        walkable: false,
        style: "mountain",
        driveMinutes: 10,
        url: "https://suncadia.com/experiences/golf/golf-courses/prospector-golf-course/",
        highlight:
          "Arnold Palmer mountain design with rolling, well-bunkered fairways and big Cascade views",
        googleRating: 4.6,
        reviewCount: 400,
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "Suncadia Resort — Rope Rider Course",
        tier: "premium",
        greenFeeRange: [110, 175],
        holes: 18,
        par: 72,
        yardage: 7300,
        walkable: false,
        style: "mountain",
        driveMinutes: 5,
        url: "https://suncadia.com/experiences/golf/golf-courses/",
        highlight:
          "Built over historic Roslyn coal-mine sites with dramatic elevation change and a 120-foot tailings rise",
        googleRating: 4.6,
        reviewCount: 350,
      },
      {
        name: "Sun Country Golf Course",
        tier: "budget",
        greenFeeRange: [35, 60],
        holes: 18,
        par: 70,
        yardage: 5900,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "Friendly riverside muni near Cle Elum — the cheap-and-cheerful filler round off the resort",
        googleRating: 4.3,
        reviewCount: 200,
      },
    ],
    lodging: [
      {
        type: "lodge",
        sleeps: [8, 16],
        nightlyRange: [300, 700],
        amenities: ["on-site golf", "spa", "pools", "restaurants", "fire pits"],
        areaDescription:
          "The Lodge at Suncadia and resort suites — steps from golf, spa, and dining",
        searchUrl: "https://suncadia.com/stay/",
        notes:
          "Book a block at the Lodge at Suncadia or Inn at Suncadia for one-stop logistics. Everything — golf, spa, dining, pools — is on the property.",
        avgRating: 4.5,
        bedsBreakdown: "Book 8 rooms = 16 guys at 2/room",
      },
      {
        type: "house",
        sleeps: [10, 18],
        nightlyRange: [500, 1200],
        amenities: ["hot tub", "game room", "deck", "fire pit", "big kitchen", "ski-area access"],
        areaDescription:
          "Suncadia vacation homes and Roslyn cabins inside or just outside the resort",
        searchUrl:
          "https://www.vrbo.com/search?destination=Cle+Elum%2C+WA&groupSize=16",
        notes:
          "Tons of large rental homes inside Suncadia and around Roslyn with hot tubs and game rooms. Best value for a 12-16 man crew that wants a basecamp with a kitchen.",
        avgRating: 4.7,
        bedsBreakdown: "4 kings + 3 queens + bunks = 16 guys",
      },
    ],
    dining: [
      {
        name: "Swiftwater Cellars",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "On-resort winery and restaurant with a big patio over the Prospector course — the group dinner default",
        reservationNeeded: true,
        googleRating: 4.4,
      },
      {
        name: "The Brick Saloon (Roslyn)",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Washington's oldest operating saloon (1889) with a running-water spittoon bar — pure Northwest Exposure vibes",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "Pioneer Coffee Roasting Co.",
        style: "casual",
        priceRange: "$",
        capacity: "medium",
        highlight:
          "Cle Elum's go-to breakfast and coffee stop before an early tee time",
        reservationNeeded: false,
        googleRating: 4.5,
      },
    ],
    bars: [
      {
        name: "The Brick Saloon",
        vibe: "saloon",
        highlight:
          "1889 saloon in Roslyn with the famous 23-foot running-water bar rail — a must-do night out",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.4,
      },
      {
        name: "Swiftwater Cellars Bar",
        vibe: "patio",
        highlight:
          "Wine, cocktails, and a fire-pit patio over the golf course right at the resort",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.4,
      },
      {
        name: "Roslyn Beer Garden",
        vibe: "patio",
        highlight:
          "Laid-back outdoor beer garden in historic Roslyn for an easy afternoon pint",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.4,
      },
    ],
    activities: [
      {
        name: "Cle Elum River Float / Rafting",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [60, 110],
        groupFriendly: true,
        highlight:
          "Mellow scenic float on the Cle Elum or Yakima River — cooler-friendly rest-day move",
        bestFor: "rest day",
        provider: "Local Cle Elum outfitters",
      },
      {
        name: "Suncadia Mountain Bike & Trails",
        type: "mountain-biking",
        duration: "half day",
        pricePerPerson: [40, 80],
        groupFriendly: true,
        highlight:
          "40+ miles of resort trails through the Cascade foothills, bike rentals on-site",
        bestFor: "rest day",
        provider: "Suncadia Resort",
      },
      {
        name: "Suncadia Spa",
        type: "spa",
        duration: "2-3 hours",
        pricePerPerson: [120, 300],
        groupFriendly: true,
        highlight:
          "Full-service resort spa for the crew that overdid it at The Brick the night before",
        bestFor: "rest day",
        provider: "Glade Spring Spa at Suncadia",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 24],
        hourlyRate: [120, 250],
        fullDayRate: [1000, 2000],
        canDoGolfAndBars: true,
        providers: [
          "Seattle Party Bus",
          "Ellensburg charter operators",
          "Suncadia resort shuttle",
        ],
        notes:
          "Resort runs internal shuttles between lodging, courses, and dining. For Roslyn bar runs or airport transfers, book a Seattle/Ellensburg charter 3-4 weeks ahead.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 160],
        providers: ["Take a Chef", "Cozymeal", "Suncadia in-home dining"],
        mealTypes: ["steak dinner", "BBQ cookout", "breakfast spread"],
        notes:
          "Suncadia offers in-home private chef service at rental homes, or bring in a Seattle/Ellensburg chef. Steak night at the cabin pairs perfectly with Swiftwater wine.",
      },
    ],
  },

  // ─── Gleneden Beach (Salishan), OR ────────────────────────────────
  {
    id: "gleneden-beach-or",
    city: "Gleneden Beach",
    state: "OR",
    region: "Pacific NW",
    tagline: "Scottish-style coastal links on the central Oregon coast",
    description:
      "Salishan Coastal Lodge anchors a quiet stretch of the central Oregon coast with an 18-hole links-style course that runs from forest down toward Siletz Bay. It's a low-key, scenery-first golf-and-seafood trip — pair it with the casinos and beaches of nearby Lincoln City for a fuller weekend.",
    population: "tiny",
    nearestAirport: {
      code: "PDX",
      name: "Portland International Airport",
      driveMinutes: 135,
    },
    bestSeasons: ["summer", "fall"],
    groceryNotes:
      "Safeway and a small market in Lincoln City (10 min); pre-order for the rental there",
    courses: [
      {
        name: "Salishan Golf Links",
        tier: "premium",
        greenFeeRange: [85, 130],
        holes: 18,
        par: 71,
        yardage: 6400,
        slope: 134,
        walkable: true,
        style: "links",
        driveMinutes: 2,
        url: "https://salishan.com/golf/",
        highlight:
          "Scottish links-style course running from coastal forest down toward Siletz Bay with ocean breezes in play",
        googleRating: 4.4,
        reviewCount: 350,
        hypeTag: "LOCALS' FAVORITE",
      },
      {
        name: "Chinook Winds Golf Resort",
        tier: "solid",
        greenFeeRange: [50, 85],
        holes: 18,
        par: 71,
        yardage: 6109,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://chinookwindsgolf.com",
        highlight:
          "Tribe-owned tree-lined course in Lincoln City tied to the Chinook Winds Casino — easy second round",
        googleRating: 4.3,
        reviewCount: 300,
      },
      {
        name: "Olalla Valley Golf Course",
        tier: "budget",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 71,
        yardage: 5500,
        walkable: true,
        style: "parkland",
        driveMinutes: 30,
        highlight:
          "Quirky, hilly inland muni in Toledo — the cheap, fun filler track when the crew wants more holes",
        googleRating: 4.4,
        reviewCount: 120,
      },
    ],
    lodging: [
      {
        type: "lodge",
        sleeps: [8, 16],
        nightlyRange: [200, 450],
        amenities: ["on-site golf", "spa", "restaurants", "forest setting", "trails"],
        areaDescription:
          "Salishan Coastal Lodge — rooms tucked in the trees above the golf course",
        searchUrl: "https://salishan.com/",
        notes:
          "Book a block of rooms at Salishan Coastal Lodge for on-site golf, spa, and dining. The all-in-one option for a low-hassle coastal weekend.",
        avgRating: 4.3,
        bedsBreakdown: "Book 8 rooms = 16 guys at 2/room",
      },
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [350, 800],
        amenities: ["ocean views", "hot tub", "deck", "big kitchen", "beach access"],
        areaDescription:
          "Oceanfront vacation homes in Gleneden Beach and Lincoln City",
        searchUrl:
          "https://www.vrbo.com/search?destination=Gleneden+Beach%2C+OR&groupSize=12",
        notes:
          "Loads of beachfront rental homes between Gleneden Beach and Lincoln City with hot tubs and ocean views. Best pick for a crew that wants a kitchen and a deck on the sand.",
        avgRating: 4.6,
        bedsBreakdown: "3 kings + 2 queens + bunks = 12 guys",
      },
    ],
    dining: [
      {
        name: "Side Door Cafe",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Gleneden Beach favorite with fresh Oregon seafood and live music — the nice dinner",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Mo's Seafood & Chowder",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Oregon-coast institution for clam chowder and fish & chips — handles a big hungry group",
        reservationNeeded: false,
        googleRating: 4.3,
      },
      {
        name: "Rusty Truck Brewing",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Lincoln City brewpub with house beer, burgers, and room for the whole crew",
        reservationNeeded: false,
        googleRating: 4.3,
      },
    ],
    bars: [
      {
        name: "Chinook Winds Casino Bar",
        vibe: "casino-bar",
        highlight:
          "Beachfront casino with bars, blackjack, and live shows — the only real late-night action nearby",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.1,
      },
      {
        name: "Rusty Truck Brewing Taproom",
        vibe: "brewpub",
        highlight:
          "Easy-going coastal brewpub bar for post-round pints in Lincoln City",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.3,
      },
      {
        name: "Snug Harbor Bar & Grill",
        vibe: "dive",
        highlight:
          "Friendly Lincoln City dive with stiff drinks and a fireplace — locals' late-night spot",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.4,
      },
    ],
    activities: [
      {
        name: "Salmon River / Bay Fishing Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [120, 220],
        groupFriendly: true,
        highlight:
          "Crab, bottomfish, and salmon out of Siletz Bay and Depoe Bay — splittable across boats",
        bestFor: "rest day",
        provider: "Dockside Charters (Depoe Bay)",
      },
      {
        name: "Depoe Bay Whale Watching",
        type: "boat-rental",
        duration: "2-3 hours",
        pricePerPerson: [40, 70],
        groupFriendly: true,
        highlight:
          "Year-round gray whales out of the world's smallest harbor, 15 minutes south",
        bestFor: "rest day",
        provider: "Dockside Charters",
      },
      {
        name: "Chinook Winds Casino",
        type: "casino",
        duration: "half day",
        pricePerPerson: [50, 300],
        groupFriendly: true,
        highlight:
          "Beachfront casino with tables, slots, and a sportsbook — the bad-weather backup plan",
        bestFor: "rest day",
        provider: "Chinook Winds Casino Resort",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 24],
        hourlyRate: [120, 250],
        fullDayRate: [900, 1800],
        canDoGolfAndBars: true,
        providers: ["Lincoln City shuttle operators", "Salem/Portland charters"],
        notes:
          "Limited local options — most groups rent SUVs at PDX. A Salem or Portland charter can run airport transfers and casino-night shuttles if booked ahead.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 150],
        providers: ["Take a Chef", "Oregon coast private chefs"],
        mealTypes: ["Dungeness crab feast", "fresh seafood", "steak dinner"],
        notes:
          "A coast chef doing a Dungeness crab and salmon night at the beach house is the move. Book 2-3 weeks ahead — coast chef supply is thinner than the cities.",
      },
    ],
  },

  // ─── Sisters (Black Butte Ranch), OR ──────────────────────────────
  {
    id: "sisters-or",
    city: "Sisters",
    state: "OR",
    region: "Pacific NW",
    tagline: "Two beloved courses under the Three Sisters in Central Oregon",
    description:
      "Black Butte Ranch sits in a meadow under the snow-capped Cascades with two of Oregon's most-loved resort courses — Big Meadow and the renovated Glaze Meadow. It's the quieter, more affordable Central Oregon alternative to Bend, with cabins, a charming Western town, and high-desert scenery on every hole.",
    population: "tiny",
    nearestAirport: {
      code: "RDM",
      name: "Roberts Field — Redmond Municipal Airport",
      driveMinutes: 30,
    },
    bestSeasons: ["summer", "fall"],
    groceryNotes:
      "Ray's Food Place in Sisters (15 min); the ranch has a market and dining on-site",
    courses: [
      {
        name: "Black Butte Ranch — Glaze Meadow",
        tier: "premium",
        greenFeeRange: [97, 119],
        holes: 18,
        par: 72,
        yardage: 6574,
        walkable: true,
        style: "mountain",
        driveMinutes: 12,
        url: "https://www.blackbutteranch.com/golf/golf-courses/",
        highlight:
          "John Fought-renovated layout widely called the most iconic in Central Oregon, framed by the Three Sisters",
        googleRating: 4.7,
        reviewCount: 350,
        hypeTag: "LOCALS' FAVORITE",
      },
      {
        name: "Black Butte Ranch — Big Meadow",
        tier: "premium",
        greenFeeRange: [97, 119],
        holes: 18,
        par: 72,
        yardage: 6850,
        walkable: true,
        style: "mountain",
        driveMinutes: 12,
        url: "https://www.blackbutteranch.com/golf/golf-courses/",
        highlight:
          "Robert Muir Graves classic in a high-desert meadow — wide, walkable, and big on Cascade views",
        googleRating: 4.6,
        reviewCount: 300,
      },
      {
        name: "Aspen Lakes Golf Course",
        tier: "solid",
        greenFeeRange: [70, 110],
        holes: 18,
        par: 72,
        yardage: 7302,
        walkable: true,
        style: "mountain",
        driveMinutes: 10,
        url: "https://www.aspenlakes.com",
        highlight:
          "Family-owned Sisters course famous for its red cinder-rock bunkers and big mountain backdrop",
        googleRating: 4.7,
        reviewCount: 250,
        hypeTag: "HIDDEN GEM",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 18],
        nightlyRange: [400, 1000],
        amenities: ["hot tub", "deck", "big kitchen", "bikes", "ranch pools", "fire pit"],
        areaDescription:
          "Black Butte Ranch homes and cabins inside the gated meadow community",
        searchUrl:
          "https://www.blackbutteranch.com/stay/",
        notes:
          "Rent a big home or cabin inside Black Butte Ranch for on-site golf, pools, and bike paths. The cleanest logistics for a 12-16 man crew in Central Oregon.",
        avgRating: 4.7,
        bedsBreakdown: "4 kings + 3 queens + bunks = 16 guys",
      },
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [300, 700],
        amenities: ["hot tub", "deck", "kitchen", "town access"],
        areaDescription:
          "Vacation rentals in the town of Sisters and along the Cascade Lakes corridor",
        searchUrl:
          "https://www.vrbo.com/search?destination=Sisters%2C+OR&groupSize=12",
        notes:
          "Rentals in walkable downtown Sisters put the crew near bars and restaurants. Bend is 30 minutes for more nightlife and courses.",
        avgRating: 4.6,
      },
    ],
    dining: [
      {
        name: "The Lodge at Black Butte Ranch",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "On-ranch lodge restaurant with a wraparound deck and unbeatable Cascade views — the group dinner",
        reservationNeeded: true,
        googleRating: 4.4,
      },
      {
        name: "Three Creeks Brewing",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Sisters' own brewery with big tables, house beer, and burgers — the easy crew dinner",
        reservationNeeded: false,
        googleRating: 4.5,
      },
      {
        name: "The Open Door",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Wine bar and small-plates spot in downtown Sisters — the nicer, quieter option",
        reservationNeeded: true,
        googleRating: 4.6,
      },
    ],
    bars: [
      {
        name: "Three Creeks Brewing Pub",
        vibe: "brewpub",
        highlight:
          "Sisters' main brewpub — patio, fire pit, and the post-round gathering point",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
      {
        name: "Bronco Billy's Ranch Grill & Saloon",
        vibe: "saloon",
        highlight:
          "Old-West saloon in the historic Sisters Hotel with stiff pours and Western kitsch",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.4,
      },
      {
        name: "The Suttle Lodge Boathouse",
        vibe: "patio",
        highlight:
          "Lakeside boathouse bar at Suttle Lake (15 min) for cocktails on the dock",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.5,
      },
    ],
    activities: [
      {
        name: "Cascade Lakes Fly Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [150, 300],
        groupFriendly: true,
        highlight:
          "Guided fly fishing on the Metolius River and Cascade lakes — gin-clear water and big trout",
        bestFor: "rest day",
        provider: "Camp Sherman / Metolius guides",
      },
      {
        name: "Suttle Lake Kayak & Boat Rental",
        type: "kayaking",
        duration: "half day",
        pricePerPerson: [30, 70],
        groupFriendly: true,
        highlight:
          "Paddle or boat the alpine Suttle Lake with the Boathouse bar waiting at the dock",
        bestFor: "rest day",
        provider: "The Suttle Lodge",
      },
      {
        name: "Three Sisters Brewery & Distillery Tour",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [40, 80],
        groupFriendly: true,
        highlight:
          "Sisters and Bend's beer-and-spirits trail (Three Creeks, Bend Distillery) for a tasting afternoon",
        bestFor: "arrival day",
        provider: "self-guided",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 24],
        hourlyRate: [120, 250],
        fullDayRate: [900, 1900],
        canDoGolfAndBars: true,
        providers: [
          "Bend charter operators",
          "Central Oregon Party Bus",
          "Cog Wild shuttles",
        ],
        notes:
          "Bend-based operators (20-30 min away) cover golf shuttles, brewery crawls, and airport runs. Book 3-4 weeks ahead for summer.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [80, 160],
        providers: ["Take a Chef", "Bend-area private chefs", "Cozymeal"],
        mealTypes: ["steak dinner", "BBQ cookout", "trout/seafood night", "breakfast spread"],
        notes:
          "Bend has a deep bench of private chefs who travel to Sisters/Black Butte. A steak or fresh-trout dinner at the cabin is the standout night. Book 2 weeks ahead.",
      },
    ],
  },

  // ─── Worley (Circling Raven), ID ──────────────────────────────────
  {
    id: "worley-id",
    city: "Worley",
    state: "ID",
    region: "Pacific NW",
    tagline: "Idaho's No. 1 public course with a casino attached",
    description:
      "Circling Raven is the headline — Idaho's top-ranked public course, a sprawling 7,189-yard layout meandering through 620 acres of Palouse wetlands and pines. It's attached to the Coeur d'Alene Casino Resort, so golf, gaming, dining, and a spa all live under one roof, 50 minutes south of Spokane.",
    population: "tiny",
    nearestAirport: {
      code: "GEG",
      name: "Spokane International Airport",
      driveMinutes: 50,
    },
    bestSeasons: ["summer", "fall"],
    groceryNotes:
      "Limited near Worley — stock up in Coeur d'Alene (40 min) or rely on the resort's dining",
    courses: [
      {
        name: "Circling Raven Golf Club",
        tier: "bucket-list",
        greenFeeRange: [75, 130],
        holes: 18,
        par: 72,
        yardage: 7189,
        walkable: false,
        style: "parkland",
        driveMinutes: 2,
        url: "https://www.cdacasino.com/golf/",
        highlight:
          "Idaho's No. 1 public course — Gene Bates design winding through 620 acres of Palouse wetlands and forest",
        googleRating: 4.8,
        reviewCount: 700,
        hypeTag: "TOP 100 PUBLIC",
        rankNote: "No. 1 Public in Idaho — Golf Digest, Golfweek & GOLF",
      },
      {
        name: "The Coeur d'Alene Resort Golf Course",
        tier: "bucket-list",
        greenFeeRange: [200, 350],
        holes: 18,
        par: 71,
        yardage: 6804,
        walkable: false,
        style: "resort",
        driveMinutes: 45,
        url: "https://www.cdaresort.com/play/golf",
        highlight:
          "The famous floating green 14th — a movable island par-3 reached by mahogany shuttle boat (45 min north)",
        googleRating: 4.7,
        reviewCount: 900,
        hypeTag: "BUCKET LIST",
      },
      {
        name: "StoneRidge Golf Club",
        tier: "solid",
        greenFeeRange: [45, 75],
        holes: 18,
        par: 72,
        yardage: 6700,
        walkable: true,
        style: "mountain",
        driveMinutes: 35,
        url: "https://www.stoneridgeidaho.com",
        highlight:
          "Hilly, tree-lined value track in Blanchard — the affordable third round near the casino",
        googleRating: 4.5,
        reviewCount: 250,
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [150, 350],
        amenities: ["on-site golf", "casino", "spa", "restaurants", "pool"],
        areaDescription:
          "Coeur d'Alene Casino Resort Hotel — rooms steps from Circling Raven and the casino floor",
        searchUrl: "https://www.cdacasino.com/stay/",
        notes:
          "Book a block at the Coeur d'Alene Casino Resort Hotel for golf, gaming, dining, and spa all on-site. Stay-and-play packages bundle Circling Raven rounds with rooms.",
        avgRating: 4.4,
        bedsBreakdown: "Book 8 rooms = 16 guys at 2/room",
      },
      {
        type: "lakehouse",
        sleeps: [10, 16],
        nightlyRange: [400, 1000],
        amenities: ["lake access", "hot tub", "deck", "dock", "big kitchen"],
        areaDescription:
          "Lake Coeur d'Alene vacation homes 30-45 minutes north for a lakefront basecamp",
        searchUrl:
          "https://www.vrbo.com/search?destination=Coeur+d%27Alene%2C+ID&groupSize=12",
        notes:
          "For a lake-and-golf split, base in a Coeur d'Alene lakehouse and day-trip to Circling Raven. Adds a boat day and a livelier downtown bar scene.",
        avgRating: 4.7,
      },
    ],
    dining: [
      {
        name: "Twisted Earth Grill (Circling Raven)",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Circling Raven's clubhouse grill overlooking the course — the obvious post-round lunch and beers",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "Red Tail Bar & Grill",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Casino steakhouse with a big group room — the dress-up dinner after the last round",
        reservationNeeded: true,
        googleRating: 4.3,
      },
      {
        name: "Chinook Steak, Pasta & Spirits",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "On-resort steak-and-pasta restaurant for a quieter, sit-down crew dinner",
        reservationNeeded: true,
        googleRating: 4.3,
      },
    ],
    bars: [
      {
        name: "Chinook Lounge (Casino)",
        vibe: "casino-bar",
        highlight:
          "Casino lounge with live music and tables a few steps away — the on-site late-night hub",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.2,
      },
      {
        name: "Twisted Earth Grill Bar",
        vibe: "patio",
        highlight:
          "Clubhouse bar and patio over the 18th — where the day's bets get settled",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.3,
      },
      {
        name: "Moon Time (Coeur d'Alene)",
        vibe: "sports-bar",
        highlight:
          "Beloved CdA gastropub with deep taps and late food, 40 min north for a real night out",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.5,
      },
    ],
    activities: [
      {
        name: "Coeur d'Alene Casino Floor",
        type: "casino",
        duration: "half day",
        pricePerPerson: [50, 500],
        groupFriendly: true,
        highlight:
          "Slots, tables, and a sportsbook attached to the golf — the built-in rainy-day plan",
        bestFor: "rest day",
        provider: "Coeur d'Alene Casino Resort",
      },
      {
        name: "Lake Coeur d'Alene Boat Day",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [80, 200],
        groupFriendly: true,
        highlight:
          "Rent a pontoon on Lake Coeur d'Alene (40 min) for a cooler-and-cove afternoon",
        bestFor: "rest day",
        provider: "Coeur d'Alene boat rentals",
      },
      {
        name: "Circling Raven Spa (Spa Ssakwa'q'n)",
        type: "spa",
        duration: "2-3 hours",
        pricePerPerson: [120, 300],
        groupFriendly: true,
        highlight:
          "Full-service resort spa on-site for the crew that needs to recover before the next 18",
        bestFor: "rest day",
        provider: "Spa Ssakwa'q'n",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 24],
        hourlyRate: [120, 250],
        fullDayRate: [1000, 2000],
        canDoGolfAndBars: true,
        providers: [
          "Spokane Party Bus",
          "Coeur d'Alene charter operators",
          "Coeur d'Alene Casino shuttle",
        ],
        notes:
          "Casino runs shuttles from Spokane and CdA. For golf-plus-bar runs to downtown Coeur d'Alene, book a Spokane or CdA charter 3-4 weeks out.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 160],
        providers: ["Take a Chef", "Coeur d'Alene private chefs", "Cozymeal"],
        mealTypes: ["steak dinner", "BBQ cookout", "breakfast spread"],
        notes:
          "Best for crews staying in a lakehouse rather than the casino hotel. A CdA chef can run a steak or BBQ night at the rental; book 2 weeks ahead.",
      },
    ],
  },

  // ─── Bakersfield, CA ──────────────────────────────────────────────
  {
    id: "bakersfield-ca",
    city: "Bakersfield",
    state: "CA",
    region: "California",
    tagline: "Cheap, year-round golf and honky-tonk nights in Buck Owens country",
    description:
      "Bakersfield is the budget buddy-trip play in Southern California — a dozen affordable, walkable courses that stay open all year, anchored by a genuine country-music nightlife scene. Fly into a small airport, golf cheap, and end the night at the Crystal Palace. Two hours from LA with a fraction of the price tag.",
    population: "medium",
    nearestAirport: {
      code: "BFL",
      name: "Meadows Field Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes: "Vons, WinCo, and Total Wine all central; cheap and plentiful",
    courses: [
      {
        name: "The Links at RiverLakes Ranch",
        tier: "solid",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 72,
        yardage: 6800,
        walkable: true,
        style: "parkland",
        driveMinutes: 12,
        url: "https://www.riverlakesgolf.com",
        highlight:
          "Bakersfield's best public daily-fee — well-kept links-style layout with water in play",
        googleRating: 4.3,
        reviewCount: 500,
        hypeTag: "BEST VALUE",
      },
      {
        name: "Kern River Golf Course",
        tier: "budget",
        greenFeeRange: [25, 45],
        holes: 18,
        par: 72,
        yardage: 6458,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "Scenic muni along the Kern River with Sierra Nevada views — cheap and walkable",
        googleRating: 4.3,
        reviewCount: 400,
      },
      {
        name: "Buena Vista Golf Course",
        tier: "budget",
        greenFeeRange: [25, 45],
        holes: 18,
        par: 72,
        yardage: 6810,
        walkable: true,
        style: "parkland",
        driveMinutes: 25,
        highlight:
          "Wide-open lakeside muni just outside town — forgiving fairways for the high-handicap crowd",
        googleRating: 4.2,
        reviewCount: 350,
      },
      {
        name: "North Kern Golf Course",
        tier: "budget",
        greenFeeRange: [20, 40],
        holes: 18,
        par: 72,
        yardage: 6754,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "1953 straightforward muni with minimal hazards — the relaxing, dirt-cheap filler round",
        googleRating: 4.2,
        reviewCount: 300,
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [250, 550],
        amenities: ["pool", "hot tub", "big kitchen", "patio", "game room"],
        areaDescription:
          "Northwest Bakersfield and Seven Oaks — newer homes with pools near RiverLakes",
        searchUrl:
          "https://www.vrbo.com/search?destination=Bakersfield%2C+CA&groupSize=12",
        notes:
          "Cheap, plentiful rental homes with pools in NW Bakersfield. Stay near RiverLakes for the courses or central for the country bars. Great value for a budget crew.",
        avgRating: 4.5,
        bedsBreakdown: "3 kings + 2 queens + sofa = 12 guys",
      },
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [120, 250],
        amenities: ["pool", "free breakfast", "fitness center", "central location"],
        areaDescription:
          "Hotel block off Hwy 99 / Rosedale near the airport and courses",
        searchUrl:
          "https://www.marriott.com/search/findHotels.mi?t=bakersfield+ca",
        notes:
          "Book 5-8 rooms at a Marriott or Hampton near the airport. Per-room pricing is low and it keeps the crew close to courses and the 99.",
        avgRating: 4.2,
      },
    ],
    dining: [
      {
        name: "Wool Growers Restaurant",
        style: "upscale",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Iconic family-style Basque feast — endless courses served at long tables, a Bakersfield rite of passage",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Benji's French Basque Restaurant",
        style: "upscale",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "The other great Basque table in town — pickled tongue, oxtail stew, and a crew-sized spread",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Salty's BBQ & Catering",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Tri-tip and brisket done right — central-valley BBQ that feeds a hungry golf crew",
        reservationNeeded: false,
        googleRating: 4.5,
      },
      {
        name: "Mexicali",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Longtime Bakersfield Mexican spot with big margaritas and bigger combo plates",
        reservationNeeded: false,
        googleRating: 4.4,
      },
    ],
    bars: [
      {
        name: "Buck Owens' Crystal Palace",
        vibe: "honky-tonk",
        highlight:
          "Bakersfield's legendary country music hall — live bands, a dance floor, and Buck's guitars on the wall",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.6,
      },
      {
        name: "Trout's Nightclub (Oildale)",
        vibe: "honky-tonk",
        highlight:
          "Gritty, historic Bakersfield Sound honky-tonk with live country and two-stepping till late",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.4,
      },
      {
        name: "Temblor Brewing Company",
        vibe: "brewpub",
        highlight:
          "Big taproom with house beer, food, and room for a 16-man group to spread out",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.5,
      },
    ],
    activities: [
      {
        name: "Kern River Whitewater Rafting",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [70, 150],
        groupFriendly: true,
        highlight:
          "Class III-IV whitewater on the Kern (45 min east) in spring/summer — the big adrenaline day",
        bestFor: "rest day",
        provider: "Kern River Outfitters",
      },
      {
        name: "Five Dogs Range / Shooting",
        type: "shooting",
        duration: "1-2 hours",
        pricePerPerson: [40, 120],
        groupFriendly: true,
        highlight:
          "Local ranges for pistol and rifle — an easy competitive arrival-day activity",
        bestFor: "arrival day",
        provider: "Bakersfield-area ranges",
      },
      {
        name: "Bakersfield Brewery Crawl",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [40, 80],
        groupFriendly: true,
        highlight:
          "Temblor, Lengthwise, and Great Change make a tidy central-valley beer crawl",
        bestFor: "arrival day",
        provider: "self-guided",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 30],
        hourlyRate: [130, 250],
        fullDayRate: [1000, 2000],
        canDoGolfAndBars: true,
        providers: [
          "Bakersfield Party Bus",
          "Kern County Limousine",
          "Central Valley Party Bus",
        ],
        notes:
          "Solid local party-bus market — most will run morning golf shuttles and a honky-tonk loop at night. Cheaper than coastal California. Book 3-4 weeks ahead.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 130],
        providers: ["Take a Chef", "Cozymeal", "Bakersfield private chefs"],
        mealTypes: ["tri-tip BBQ cookout", "Basque-style dinner", "steak dinner", "breakfast"],
        notes:
          "A central-valley tri-tip BBQ at the rental is the move. Chef rates run lower here than the coast. Book 1-2 weeks ahead.",
      },
    ],
  },

  // ─── South Lake Tahoe, CA ─────────────────────────────────────────
  {
    id: "south-lake-tahoe-ca",
    city: "South Lake Tahoe",
    state: "CA",
    region: "California",
    tagline: "Lakeside championship golf with casinos a short walk away",
    description:
      "South Lake Tahoe pairs alpine golf with the only Nevada-line casino strip in the Sierra. Edgewood Tahoe's lakeshore finish is the headline round, Heavenly looms over town, and the Stateline casinos keep the night going. It's the rare golf trip with serious nightlife built in at 6,200 feet.",
    population: "medium",
    nearestAirport: {
      code: "RNO",
      name: "Reno-Tahoe International Airport",
      driveMinutes: 70,
    },
    bestSeasons: ["summer", "fall"],
    groceryNotes:
      "Safeway and Raley's in town; Nevada-side liquor stores at Stateline are cheaper",
    courses: [
      {
        name: "Edgewood Tahoe Golf Course",
        tier: "bucket-list",
        greenFeeRange: [200, 350],
        holes: 18,
        par: 72,
        yardage: 7445,
        walkable: false,
        style: "mountain",
        driveMinutes: 5,
        url: "https://edgewoodtahoe.com/golf/",
        highlight:
          "George & Tom Fazio lakeshore course with two holes on the water — host of the American Century celebrity championship",
        googleRating: 4.7,
        reviewCount: 800,
        hypeTag: "TOURNAMENT HOST",
        rankNote: "Host — American Century Championship",
      },
      {
        name: "Lake Tahoe Golf Course",
        tier: "solid",
        greenFeeRange: [70, 120],
        holes: 18,
        par: 71,
        yardage: 6741,
        walkable: true,
        style: "mountain",
        driveMinutes: 12,
        url: "https://www.laketahoegc.com",
        highlight:
          "Walkable valley course along the Upper Truckee River — the affordable everyday round in town",
        googleRating: 4.4,
        reviewCount: 400,
      },
      {
        name: "Bijou Municipal Golf Course",
        tier: "budget",
        greenFeeRange: [20, 35],
        holes: 9,
        par: 32,
        yardage: 2200,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        highlight:
          "Cheap 9-hole muni in the middle of town — a quick, fun warm-up or hungover-morning round",
        googleRating: 4.3,
        reviewCount: 200,
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 18],
        nightlyRange: [400, 1200],
        amenities: ["hot tub", "deck", "game room", "fire pit", "lake access", "big kitchen"],
        areaDescription:
          "South Lake Tahoe cabins near the lake and Stateline — A-frames with hot tubs",
        searchUrl:
          "https://www.vrbo.com/search?destination=South+Lake+Tahoe%2C+CA&groupSize=16",
        notes:
          "Tons of big cabins with hot tubs and game rooms near the lake. Stay close to Stateline to walk to the casinos. Book early for summer weekends.",
        avgRating: 4.6,
        bedsBreakdown: "4 kings + 3 queens + bunks = 16 guys",
      },
      {
        type: "resort-house",
        sleeps: [12, 20],
        nightlyRange: [200, 450],
        amenities: ["casino", "restaurants", "pool", "nightlife", "lake views"],
        areaDescription:
          "Stateline casino hotels (Harrah's, Harveys) right on the Nevada line",
        searchUrl:
          "https://www.caesars.com/harrahs-tahoe",
        notes:
          "Book a block at Harrah's or Harveys to sleep on top of the casino floor and nightlife. Per-room pricing is competitive and it removes all the late-night logistics.",
        avgRating: 4.2,
      },
    ],
    dining: [
      {
        name: "Edgewood Tahoe — The Bistro",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Lakefront fine dining at Edgewood — the big-night steak-and-seafood dinner with a view",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Base Camp Pizza Co.",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Lively pizza-and-beer spot at Heavenly Village — easy, loud, crew-friendly dinner",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "The Brewery at Lake Tahoe",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "South Shore institution with house beer and big plates — the default group dinner",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "Off the Hook Sushi",
        style: "sushi",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Surprisingly excellent mountain-town sushi for the crew that wants a change of pace",
        reservationNeeded: true,
        googleRating: 4.6,
      },
    ],
    bars: [
      {
        name: "Harrah's & Harveys Casinos",
        vibe: "casino-bar",
        highlight:
          "The Stateline strip — tables, slots, sportsbooks, and bars open all night a short walk over the line",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.2,
      },
      {
        name: "McP's Taphouse Grill",
        vibe: "sports-bar",
        highlight:
          "Irish pub at Heavenly Village with live music and late food — the post-casino landing spot",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.4,
      },
      {
        name: "Whiskey Dick's Saloon",
        vibe: "dive",
        highlight:
          "Beloved South Shore dive with live bands and stiff pours — locals' late-night party bar",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.4,
      },
    ],
    activities: [
      {
        name: "Lake Tahoe Boat & Jet Ski Rental",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [100, 250],
        groupFriendly: true,
        highlight:
          "Rent a boat or jet skis on the bluest water in the country — the can't-miss rest-day move",
        bestFor: "rest day",
        provider: "Tahoe Keys / Zephyr Cove rentals",
      },
      {
        name: "Heavenly Gondola & Hiking",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [50, 90],
        groupFriendly: true,
        highlight:
          "Ride the gondola to 9,000 feet for lake views and easy alpine trails right from Stateline",
        bestFor: "rest day",
        provider: "Heavenly Mountain Resort",
      },
      {
        name: "Stateline Casinos",
        type: "casino",
        duration: "half day",
        pricePerPerson: [50, 500],
        groupFriendly: true,
        highlight:
          "Harrah's and Harveys tables and sportsbooks — the built-in night plan and rainy-day backup",
        bestFor: "rest day",
        provider: "Caesars Entertainment",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 30],
        hourlyRate: [150, 300],
        fullDayRate: [1200, 2400],
        canDoGolfAndBars: true,
        providers: [
          "Tahoe Party Bus",
          "Reno Limousine",
          "Lake Tahoe Transportation",
        ],
        notes:
          "Reno- and Tahoe-based operators run RNO airport transfers, golf shuttles, and casino loops. Book 4-6 weeks ahead for summer and the celebrity-tournament week in July.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [80, 170],
        providers: ["Take a Chef", "Tahoe private chefs", "Cozymeal"],
        mealTypes: ["steak dinner", "fresh seafood", "BBQ cookout", "breakfast spread"],
        notes:
          "A chef-cooked steak or seafood night at the cabin is a highlight, especially with a lake-view deck. Tahoe chef supply is decent — book 2-3 weeks ahead for summer.",
      },
    ],
  },

  // ─── San Francisco, CA ────────────────────────────────────────────
  {
    id: "san-francisco-ca",
    city: "San Francisco",
    state: "CA",
    region: "California",
    tagline: "Major-championship muni golf with a world-class city behind it",
    description:
      "San Francisco hides a stack of great public golf inside the city limits — TPC Harding Park hosted the 2020 PGA Championship, and Presidio and Lincoln Park serve up cliffside ocean views for muni prices. Pair the golf with one of the best food-and-bar cities in the country and you've got a buddy trip with range.",
    population: "medium",
    nearestAirport: {
      code: "SFO",
      name: "San Francisco International Airport",
      driveMinutes: 25,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes: "Safeway, Trader Joe's, and Total Wine throughout the city",
    courses: [
      {
        name: "TPC Harding Park",
        tier: "bucket-list",
        greenFeeRange: [120, 250],
        holes: 18,
        par: 72,
        yardage: 7169,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        url: "https://tpc.com/hardingpark/",
        highlight:
          "Tree-lined muni on Lake Merced that hosted the 2020 PGA Championship and a Presidents Cup",
        googleRating: 4.6,
        reviewCount: 1100,
        hypeTag: "TOURNAMENT HOST",
        rankNote: "Host — 2020 PGA Championship",
      },
      {
        name: "Presidio Golf Course",
        tier: "premium",
        greenFeeRange: [85, 175],
        holes: 18,
        par: 72,
        yardage: 6477,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.presidiogolf.com",
        highlight:
          "Historic 1895 layout climbing through cypress and eucalyptus in the Presidio — one of the country's best munis",
        googleRating: 4.6,
        reviewCount: 900,
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "Lincoln Park Golf Course",
        tier: "solid",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 68,
        yardage: 5149,
        walkable: true,
        style: "coastal",
        driveMinutes: 20,
        url: "http://www.lincolnparkgolfcourse.com",
        highlight:
          "SF's oldest muni with knockout Golden Gate Bridge views from the cliffs above Lands End",
        googleRating: 4.4,
        reviewCount: 700,
        hypeTag: "BEST VALUE",
      },
      {
        name: "Sharp Park Golf Course",
        tier: "solid",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 72,
        yardage: 6300,
        walkable: true,
        style: "links",
        driveMinutes: 25,
        url: "https://sfrecpark.org",
        highlight:
          "Alister MacKenzie seaside layout in Pacifica — a rare MacKenzie design you can play for muni money",
        googleRating: 4.4,
        reviewCount: 500,
        hypeTag: "HIDDEN GEM",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [500, 1500],
        amenities: ["city location", "big kitchen", "rooftop deck", "multiple floors"],
        areaDescription:
          "Marina, Cow Hollow, or the Sunset — multi-floor city homes near bars and the courses",
        searchUrl:
          "https://www.vrbo.com/search?destination=San+Francisco%2C+CA&groupSize=12",
        notes:
          "Rent a big multi-floor home in the Marina or Cow Hollow to be walkable to nightlife, or the Sunset/Richmond to be near the courses. City rentals run pricey — book early.",
        avgRating: 4.6,
        bedsBreakdown: "3 kings + 2 queens + sofa = 12 guys",
      },
      {
        type: "resort-house",
        sleeps: [12, 20],
        nightlyRange: [250, 600],
        amenities: ["downtown location", "bars", "restaurants", "fitness center"],
        areaDescription:
          "Union Square / SoMa hotel block central to nightlife and transit",
        searchUrl:
          "https://www.marriott.com/search/findHotels.mi?t=san+francisco+ca",
        notes:
          "Book a block of rooms near Union Square or the Marina. Puts the crew on top of bars and restaurants with easy rideshare to the courses on the west side.",
        avgRating: 4.4,
      },
    ],
    dining: [
      {
        name: "House of Prime Rib",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "SF institution carving prime rib tableside since 1949 — the must-book big-crew dinner",
        reservationNeeded: true,
        googleRating: 4.7,
      },
      {
        name: "Tony's Pizza Napoletana",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Award-winning North Beach pizza — loud, casual, and built for a hungry group",
        reservationNeeded: false,
        googleRating: 4.5,
      },
      {
        name: "Swan Oyster Depot",
        style: "seafood",
        priceRange: "$$$",
        capacity: "small",
        highlight:
          "Legendary counter for Dungeness crab and oysters — split into pairs, it's worth the line",
        reservationNeeded: false,
        googleRating: 4.7,
      },
      {
        name: "La Taqueria",
        style: "mexican",
        priceRange: "$",
        capacity: "medium",
        highlight:
          "Mission-style burritos that win national best-of lists — the perfect cheap recovery lunch",
        reservationNeeded: false,
        googleRating: 4.5,
      },
    ],
    bars: [
      {
        name: "The Bus Stop Saloon (Marina)",
        vibe: "sports-bar",
        highlight:
          "Marina sports-bar staple with every game on — the easy walkable crew HQ",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.4,
      },
      {
        name: "Comstock Saloon",
        vibe: "cocktail",
        highlight:
          "Gold Rush-era saloon in North Beach pouring classic cocktails — the dress-up first stop",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
      {
        name: "Tonga Room & Hurricane Bar",
        vibe: "tiki",
        highlight:
          "Over-the-top tiki bar with an indoor thunderstorm and a floating band — an only-in-SF night",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
      {
        name: "Bourbon & Branch",
        vibe: "whiskey-bar",
        highlight:
          "Password-entry speakeasy with a deep whiskey list — the late, low-lit nightcap",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
    ],
    activities: [
      {
        name: "San Francisco Bay Sailing Charter",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [90, 200],
        groupFriendly: true,
        highlight:
          "Private charter under the Golden Gate and around Alcatraz — the showpiece rest-day move",
        bestFor: "rest day",
        provider: "SF Bay sailing charters",
      },
      {
        name: "Napa / Sonoma Wine Day Trip",
        type: "winery",
        duration: "full day",
        pricePerPerson: [120, 250],
        groupFriendly: true,
        highlight:
          "Hire a van north to wine country (60-75 min) for a tasting day between rounds",
        bestFor: "rest day",
        provider: "Bay Area wine-tour operators",
      },
      {
        name: "City Bar & Food Crawl (North Beach)",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [40, 90],
        groupFriendly: true,
        highlight:
          "Walk North Beach and the Marina hitting old saloons and breweries — the arrival-night warm-up",
        bestFor: "arrival day",
        provider: "self-guided",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 35],
        hourlyRate: [180, 350],
        fullDayRate: [1400, 2800],
        canDoGolfAndBars: true,
        providers: [
          "Bay Area Party Bus",
          "SF Limo",
          "Black Tie Transportation",
        ],
        notes:
          "Deep Bay Area market — operators run SFO transfers, golf shuttles to the west-side courses, and bar/wine-country loops. Book 4-6 weeks ahead; city traffic adds time.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [90, 200],
        providers: ["Take a Chef", "Cozymeal", "Bay Area private chefs"],
        mealTypes: ["fresh seafood feast", "steak dinner", "Dungeness crab night", "brunch"],
        notes:
          "Deep bench of Bay Area chefs — a Dungeness crab or steak night at the city rental is a standout. Book 2 weeks ahead; rates run higher than the rest of the state.",
      },
    ],
  },

  // ─── Aptos (Santa Cruz / Pasatiempo), CA ──────────────────────────
  {
    id: "aptos-ca",
    city: "Aptos",
    state: "CA",
    region: "California",
    tagline: "MacKenzie's finest work and beach-town golf above Monterey Bay",
    description:
      "The Santa Cruz coast around Aptos is a sleeper golf destination anchored by Pasatiempo — Alister MacKenzie's home course and, in his own words, his finest work. Add the cliffside Seascape, the surf-town bars of Santa Cruz, and easy boardwalk-and-beach rest days, and it's a laid-back coastal weekend with a bucket-list round.",
    population: "small",
    nearestAirport: {
      code: "SJC",
      name: "San Jose International Airport",
      driveMinutes: 45,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "Safeway and New Leaf markets in Aptos and Santa Cruz; pre-order for the rental",
    courses: [
      {
        name: "Pasatiempo Golf Club",
        tier: "bucket-list",
        greenFeeRange: [195, 325],
        holes: 18,
        par: 70,
        yardage: 6500,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.pasatiempo.com/",
        highlight:
          "Alister MacKenzie's home course, restored to his 1929 design — he called it his finest work",
        googleRating: 4.7,
        reviewCount: 600,
        hypeTag: "DESIGNER CLASSIC",
        rankNote: "Top 100 in America — Golf Digest & GOLF",
      },
      {
        name: "Seascape Golf Club",
        tier: "premium",
        greenFeeRange: [70, 120],
        holes: 18,
        par: 71,
        yardage: 6122,
        walkable: true,
        style: "coastal",
        driveMinutes: 5,
        url: "https://www.seascapegc.com",
        highlight:
          "Cliffside Aptos layout with Monterey Bay views and ocean breezes through the back nine",
        googleRating: 4.4,
        reviewCount: 400,
      },
      {
        name: "DeLaveaga Golf Course",
        tier: "solid",
        greenFeeRange: [50, 90],
        holes: 18,
        par: 72,
        yardage: 6010,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.delaveagagolf.com",
        highlight:
          "Hilly, tree-lined Santa Cruz muni with a famous canyon-carry 'Top of the World' par-5",
        googleRating: 4.4,
        reviewCount: 350,
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [400, 1000],
        amenities: ["hot tub", "deck", "ocean views", "big kitchen", "beach access"],
        areaDescription:
          "Aptos and Rio Del Mar — beach-adjacent homes near Seascape",
        searchUrl:
          "https://www.vrbo.com/search?destination=Aptos%2C+CA&groupSize=12",
        notes:
          "Rent a beach house in Aptos or Rio Del Mar near Seascape for a quiet basecamp, or stay in Santa Cruz to be walkable to the surf-town bars. Book summer weekends early.",
        avgRating: 4.6,
        bedsBreakdown: "3 kings + 2 queens + bunks = 12 guys",
      },
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [200, 450],
        amenities: ["ocean views", "pool", "restaurant", "near golf"],
        areaDescription:
          "Seascape Beach Resort and Santa Cruz hotels along the bay",
        searchUrl:
          "https://www.seascaperesort.com",
        notes:
          "Book a block at Seascape Beach Resort to sit on the bluff above the beach and the golf course. Per-suite pricing works for groups and keeps logistics simple.",
        avgRating: 4.4,
      },
    ],
    dining: [
      {
        name: "Shadowbrook Restaurant",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Iconic Capitola hillside restaurant reached by cable car — the memorable big-night dinner",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Cafe Sparrow",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Cozy Aptos Village French-California spot — the quieter, nicer crew dinner",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Woodstock's Pizza (Santa Cruz)",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Loud, beer-soaked downtown pizza joint — easy big-group dinner near the bars",
        reservationNeeded: false,
        googleRating: 4.4,
      },
    ],
    bars: [
      {
        name: "Sanderlings / Seascape Bar",
        vibe: "patio",
        highlight:
          "Bluff-top resort bar above the beach in Aptos — sunset drinks after the round",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.3,
      },
      {
        name: "The Crepe Place / Catalyst (Santa Cruz)",
        vibe: "dive",
        highlight:
          "Santa Cruz live-music dives and venues downtown — the surf-town late-night scene",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.4,
      },
      {
        name: "Sante Adairius Rustic Ales",
        vibe: "brewpub",
        highlight:
          "World-renowned Capitola/Santa Cruz brewery — a must-stop for the beer crowd",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.7,
      },
    ],
    activities: [
      {
        name: "Monterey Bay Fishing / Whale Watch Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [90, 200],
        groupFriendly: true,
        highlight:
          "Rockfish, salmon, and whales out of Santa Cruz harbor on Monterey Bay",
        bestFor: "rest day",
        provider: "Santa Cruz Whale Watching / charters",
      },
      {
        name: "Santa Cruz Beach Boardwalk & Surf",
        type: "water-sports",
        duration: "half day",
        pricePerPerson: [30, 100],
        groupFriendly: true,
        highlight:
          "Classic boardwalk, surf lessons at Cowell's, and beach time — the easy hangover rest day",
        bestFor: "rest day",
        provider: "Santa Cruz Boardwalk / Club Ed Surf",
      },
      {
        name: "Santa Cruz Mountains Wine Tasting",
        type: "winery",
        duration: "half day",
        pricePerPerson: [50, 110],
        groupFriendly: true,
        highlight:
          "Tasting rooms in the redwoods above town — a mellow alternative to a third round",
        bestFor: "rest day",
        provider: "Santa Cruz Mountains wineries",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 28],
        hourlyRate: [150, 300],
        fullDayRate: [1200, 2400],
        canDoGolfAndBars: true,
        providers: [
          "Santa Cruz Party Bus",
          "Monterey Bay Limousine",
          "Bay Area charters",
        ],
        notes:
          "Santa Cruz and San Jose operators run airport transfers, golf shuttles, and bar/wine loops. Book 4 weeks ahead for summer beach-season weekends.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [85, 180],
        providers: ["Take a Chef", "Cozymeal", "Santa Cruz private chefs"],
        mealTypes: ["fresh seafood feast", "steak dinner", "farm-to-table", "brunch"],
        notes:
          "A coast chef doing a fresh-catch seafood night at the Aptos beach house is the highlight. Bay Area chef supply is strong; book 2 weeks ahead.",
      },
    ],
  },

  // ─── Lompoc (La Purisima), CA ─────────────────────────────────────
  {
    id: "lompoc-ca",
    city: "Lompoc",
    state: "CA",
    region: "California",
    tagline: "One of California's toughest public tests in quiet wine country",
    description:
      "Lompoc is the budget Central Coast play — built around La Purisima, a 7,100-yard Robert Muir Graves bruiser locals call 'La Piranha' that once hosted PGA Tour Q-School. It sits in the Santa Rita Hills wine AVA between Santa Barbara and Pismo Beach, so you get a serious golf test, real wine country, and prices a fraction of Santa Barbara's.",
    population: "small",
    nearestAirport: {
      code: "SBA",
      name: "Santa Barbara Airport",
      driveMinutes: 55,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Vons and Albertsons in Lompoc; wine pickups direct from Santa Rita Hills tasting rooms",
    courses: [
      {
        name: "La Purisima Golf Course",
        tier: "premium",
        greenFeeRange: [45, 80],
        holes: 18,
        par: 72,
        yardage: 7105,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://lapurisimagolf.com/",
        highlight:
          "Robert Muir Graves' 7,100-yard 'La Piranha' — a windy, demanding test that hosted PGA Tour Q-School",
        googleRating: 4.5,
        reviewCount: 450,
        hypeTag: "BEST VALUE",
      },
      {
        name: "The Mission Club",
        tier: "solid",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 72,
        yardage: 6800,
        walkable: true,
        style: "parkland",
        driveMinutes: 8,
        url: "https://www.themissionclub.com",
        highlight:
          "Tree-lined Lompoc layout (formerly Village CC) — the easier, scenic second round in town",
        googleRating: 4.3,
        reviewCount: 200,
      },
      {
        name: "Rancho Maria Golf Club",
        tier: "solid",
        greenFeeRange: [40, 65],
        holes: 18,
        par: 72,
        yardage: 6321,
        walkable: true,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.ranchomariagolf.com",
        highlight:
          "Rolling Santa Maria course with valley views — a value third round on the way up the coast",
        googleRating: 4.3,
        reviewCount: 250,
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [250, 600],
        amenities: ["hot tub", "deck", "big kitchen", "patio", "wine-country views"],
        areaDescription:
          "Lompoc and the Santa Rita Hills — ranch homes near the vineyards and courses",
        searchUrl:
          "https://www.vrbo.com/search?destination=Lompoc%2C+CA&groupSize=12",
        notes:
          "Rent a ranch or wine-country home around Lompoc for a quiet, affordable basecamp. Solvang (30 min) is an alternative with more rentals and a livelier downtown.",
        avgRating: 4.5,
        bedsBreakdown: "3 kings + 2 queens + sofa = 12 guys",
      },
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [120, 280],
        amenities: ["pool", "free breakfast", "central location", "near golf"],
        areaDescription:
          "Hotel block in Lompoc near La Purisima and Hwy 1",
        searchUrl:
          "https://www.marriott.com/search/findHotels.mi?t=lompoc+ca",
        notes:
          "Book 5-8 rooms at a Hampton or Holiday Inn Express in Lompoc. Cheap per-room pricing keeps the crew minutes from La Purisima.",
        avgRating: 4.2,
      },
    ],
    dining: [
      {
        name: "The Hitching Post II (Buellton)",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Santa Maria oak-grilled steaks and its own Pinot — the Sideways-famous big-night dinner (25 min)",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Floriano's Mexican Restaurant",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Lompoc's go-to Mexican spot with strong margaritas and big combo plates",
        reservationNeeded: false,
        googleRating: 4.5,
      },
      {
        name: "Solvang Brewing Company",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Danish-village brewpub in Solvang (30 min) with house beer and crew-sized tables",
        reservationNeeded: false,
        googleRating: 4.3,
      },
    ],
    bars: [
      {
        name: "Cold Coast Brewing Co.",
        vibe: "brewpub",
        highlight:
          "Lompoc's own craft brewery taproom — the easy post-round local pint",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.6,
      },
      {
        name: "The Red Barn (Santa Ynez)",
        vibe: "honky-tonk",
        highlight:
          "Wine-country roadhouse with steaks, live music, and a dance floor (30 min east)",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.5,
      },
      {
        name: "Maverick Saloon (Santa Ynez)",
        vibe: "saloon",
        highlight:
          "Classic Old-West saloon with live country bands — the real night-out move in the valley",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.5,
      },
    ],
    activities: [
      {
        name: "Santa Rita Hills Wine Tasting",
        type: "winery",
        duration: "half day",
        pricePerPerson: [50, 120],
        groupFriendly: true,
        highlight:
          "Tour the cool-climate Pinot and Chardonnay tasting rooms minutes from La Purisima",
        bestFor: "rest day",
        provider: "Santa Rita Hills Wine Trail",
      },
      {
        name: "Surf Beach / Jalama Coast",
        type: "water-sports",
        duration: "half day",
        pricePerPerson: [0, 40],
        groupFriendly: true,
        highlight:
          "Wild, empty Central Coast beaches at Surf and Jalama for a windswept rest-day drive",
        bestFor: "rest day",
        provider: "self-guided",
      },
      {
        name: "Santa Ynez Valley Distillery Tour",
        type: "distillery",
        duration: "half day",
        pricePerPerson: [40, 90],
        groupFriendly: true,
        highlight:
          "Spirits tasting in the Santa Ynez Valley for the crew that's wined-out",
        bestFor: "arrival day",
        provider: "Santa Ynez Valley distilleries",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 24],
        hourlyRate: [130, 280],
        fullDayRate: [1000, 2200],
        canDoGolfAndBars: true,
        providers: [
          "Santa Barbara Wine Tours",
          "Central Coast Limousine",
          "Breakaway Tours",
        ],
        notes:
          "Santa Barbara and Santa Ynez wine-tour operators cover golf shuttles and tasting loops — they know the valley cold. Book 3-4 weeks ahead.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 160],
        providers: ["Take a Chef", "Cozymeal", "Santa Barbara private chefs"],
        mealTypes: ["Santa Maria tri-tip BBQ", "steak dinner", "wine-pairing dinner", "breakfast"],
        notes:
          "A Santa Maria-style tri-tip BBQ paired with Santa Rita Hills Pinot is the move. Santa Barbara chefs travel up to Lompoc; book 2 weeks ahead.",
      },
    ],
  },

  // ─── Tri-Cities (Kennewick / Richland / Pasco), WA ────────────────
  {
    id: "tri-cities-wa",
    city: "Tri-Cities",
    state: "WA",
    region: "Pacific NW",
    tagline: "Sunny desert golf and big-time wine where the rivers meet",
    description:
      "The Tri-Cities — Kennewick, Richland, and Pasco — sit at the confluence of three rivers in Washington's sunniest, driest corner, surrounded by the Columbia Valley's biggest wine country. Golf is cheap and plays year-round, the wineries rival Walla Walla's, and the riverfront makes for easy boat-and-beer rest days.",
    population: "medium",
    nearestAirport: {
      code: "PSC",
      name: "Tri-Cities Airport (Pasco)",
      driveMinutes: 15,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "Winco, Fred Meyer, and Total Wine across the Tri-Cities; wine direct from the tasting rooms",
    courses: [
      {
        name: "Canyon Lakes Golf Course",
        tier: "premium",
        greenFeeRange: [55, 80],
        holes: 18,
        par: 72,
        yardage: 7038,
        walkable: true,
        style: "desert",
        driveMinutes: 10,
        url: "https://www.canyonlakesgolfcourse.com/",
        highlight:
          "The Tri-Cities' top-rated course — 4.5 stars from Golf Digest with the largest green in the Pacific NW",
        googleRating: 4.5,
        reviewCount: 500,
        hypeTag: "LOCALS' FAVORITE",
      },
      {
        name: "Horn Rapids Golf Course",
        tier: "solid",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 72,
        yardage: 7060,
        walkable: true,
        style: "desert",
        driveMinutes: 15,
        url: "https://www.golfhornrapids.com",
        highlight:
          "Links-style Richland course with live music and food at Rewsters Bar & Grill",
        googleRating: 4.4,
        reviewCount: 350,
      },
      {
        name: "Sun Willows Golf Course",
        tier: "budget",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 72,
        yardage: 6700,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.golfsunwillows.com",
        highlight:
          "Mature tree-lined Pasco muni — the affordable, walkable everyday round",
        googleRating: 4.3,
        reviewCount: 300,
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [250, 550],
        amenities: ["pool", "hot tub", "big kitchen", "river access", "patio"],
        areaDescription:
          "Richland and Kennewick riverfront homes near the Columbia and the courses",
        searchUrl:
          "https://www.vrbo.com/search?destination=Richland%2C+WA&groupSize=12",
        notes:
          "Plenty of newer homes with pools near the Columbia in Richland and Kennewick. Cheap relative to Seattle/Walla Walla and central to golf and wineries.",
        avgRating: 4.5,
        bedsBreakdown: "3 kings + 2 queens + sofa = 12 guys",
      },
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [130, 280],
        amenities: ["river views", "pool", "restaurant", "central location"],
        areaDescription:
          "Columbia Point / riverfront hotel block in Richland",
        searchUrl:
          "https://www.marriott.com/search/findHotels.mi?t=richland+wa",
        notes:
          "Book a block at The Lodge at Columbia Point or a riverfront Marriott in Richland. Low per-room pricing, walkable to the river path and tasting rooms.",
        avgRating: 4.4,
      },
    ],
    dining: [
      {
        name: "Anthony's at Columbia Point",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Riverfront Northwest seafood with a big group room and Columbia views — the nice dinner",
        reservationNeeded: true,
        googleRating: 4.4,
      },
      {
        name: "Porter's Real Barbecue",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Smoked brisket and ribs in Kennewick — the easy, crew-sized BBQ dinner",
        reservationNeeded: false,
        googleRating: 4.5,
      },
      {
        name: "Frost Me Sweet / Bombing Range Brewing",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "West Richland brewpub with house beer and big tables for the group",
        reservationNeeded: false,
        googleRating: 4.5,
      },
    ],
    bars: [
      {
        name: "Branding Iron Lounge",
        vibe: "dive",
        highlight:
          "No-frills Tri-Cities dive with stiff pours and a pool table — the locals' late-night spot",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.3,
      },
      {
        name: "Bombing Range Brewing Co.",
        vibe: "brewpub",
        highlight:
          "Atomic-themed West Richland taproom — house beer and patio for post-round pints",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.5,
      },
      {
        name: "The Tap & Barrel (Kennewick)",
        vibe: "sports-bar",
        highlight:
          "Big-screen sports bar with deep taps and late food — the game-day landing spot",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.4,
      },
    ],
    activities: [
      {
        name: "Columbia Valley Wine Tasting",
        type: "winery",
        duration: "half day",
        pricePerPerson: [40, 100],
        groupFriendly: true,
        highlight:
          "200+ wineries in the Columbia Valley — Red Mountain and Walla Walla's juice without the price",
        bestFor: "rest day",
        provider: "Columbia Valley / Red Mountain AVA",
      },
      {
        name: "Columbia & Snake River Boat Day",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [80, 200],
        groupFriendly: true,
        highlight:
          "Rent a boat where the Columbia, Snake, and Yakima meet for a cooler-and-cove afternoon",
        bestFor: "rest day",
        provider: "Tri-Cities boat rentals",
      },
      {
        name: "Columbia River Walleye Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [120, 220],
        groupFriendly: true,
        highlight:
          "Guided walleye, salmon, and steelhead on the Columbia — splittable across boats",
        bestFor: "rest day",
        provider: "Tri-Cities fishing guides",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 28],
        hourlyRate: [130, 260],
        fullDayRate: [1000, 2100],
        canDoGolfAndBars: true,
        providers: [
          "Tri-Cities Party Bus",
          "Columbia Basin Limousine",
          "Sunset Coach Tours",
        ],
        notes:
          "Local operators specialize in winery tours and will fold in golf shuttles and bar runs. Wine-country logistics are their bread and butter. Book 3-4 weeks ahead.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 150],
        providers: ["Take a Chef", "Cozymeal", "Tri-Cities private chefs"],
        mealTypes: ["steak dinner", "BBQ cookout", "wine-pairing dinner", "breakfast spread"],
        notes:
          "A chef-cooked steak night paired with Red Mountain Cab at the river house is the highlight. Wine-country chefs travel easily across the Tri-Cities; book 2 weeks ahead.",
      },
    ],
  },
];
