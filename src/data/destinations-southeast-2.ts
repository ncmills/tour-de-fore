import { Destination } from "./types";

export const southeast2Destinations: Destination[] = [
  // ─── Streamsong, FL ────────────────────────────────────────────────
  {
    id: "streamsong-fl",
    city: "Streamsong",
    state: "FL",
    region: "Southeast",
    tagline: "Three top-100 courses rising out of a Florida sand quarry",
    description:
      "A golf-only pilgrimage in the middle of nowhere central Florida. Coore & Crenshaw (Red), Tom Doak (Blue), and Gil Hanse (Black) built three world-ranked courses on reclaimed phosphate-mine land — massive dunes, firm turf, and walking-caddie golf. No nightlife, all golf: this is a pure buddies-trip mecca.",
    population: "tiny",
    nearestAirport: {
      code: "TPA",
      name: "Tampa International Airport",
      driveMinutes: 75,
    },
    bestSeasons: ["fall", "spring"],
    groceryNotes:
      "Remote — nearest Publix is ~25 min in Bartow/Fort Meade. Stock up before arriving; the resort handles all on-site food/drink.",
    courses: [
      {
        name: "Streamsong Red",
        tier: "bucket-list",
        greenFeeRange: [150, 419],
        holes: 18,
        par: 72,
        yardage: 7148,
        slope: 130,
        rating: 73.8,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://www.streamsongresort.com/golf/",
        highlight:
          "Coore & Crenshaw routing over huge sand dunes — wide, strategic, and endlessly playable",
        googleRating: 4.8,
        reviewCount: 320,
        hypeTag: "TOP 100 PUBLIC",
        rankNote: "Top 100 Public — Golf Digest",
      },
      {
        name: "Streamsong Blue",
        tier: "bucket-list",
        greenFeeRange: [150, 419],
        holes: 18,
        par: 72,
        yardage: 7176,
        slope: 134,
        rating: 74.2,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://www.streamsongresort.com/golf/",
        highlight:
          "Tom Doak's bold, undulating layout weaving wild grasses and deep-water ponds",
        googleRating: 4.8,
        reviewCount: 290,
        hypeTag: "TOP 100 PUBLIC",
        rankNote: "Top 100 Public — Golf Digest",
      },
      {
        name: "Streamsong Black",
        tier: "bucket-list",
        greenFeeRange: [150, 419],
        holes: 18,
        par: 73,
        yardage: 7331,
        slope: 132,
        rating: 75.0,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://www.streamsongresort.com/golf/",
        highlight:
          "Gil Hanse's Australian-Sandbelt-inspired beast — massive fairways and the most demanding greens on property",
        googleRating: 4.7,
        reviewCount: 240,
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "The Roundabout (Gauntlet Putting Course)",
        tier: "solid",
        greenFeeRange: [30, 60],
        holes: 18,
        par: 54,
        yardage: 2000,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://www.streamsongresort.com/golf/",
        highlight:
          "Two-acre putting course where the after-round beers-and-bets games get serious",
        hypeTag: "LOCALS' FAVORITE",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [12, 16],
        nightlyRange: [300, 550],
        amenities: [
          "on-site golf",
          "spa",
          "multiple restaurants",
          "rooftop bar",
          "infinity pool",
          "bass fishing lake",
        ],
        areaDescription:
          "The Lodge at Streamsong — the main resort hotel right on the courses",
        searchUrl: "https://www.streamsongresort.com/",
        notes:
          "Book a block of rooms at The Lodge or the smaller Clubhouse. Stay-and-play packages are the only sane way to do Streamsong — everything is on-site.",
        avgRating: 4.6,
        bedsBreakdown: "8 rooms with 2 queens each = 16 guys at 2/bed",
      },
      {
        type: "resort-house",
        sleeps: [12, 16],
        nightlyRange: [250, 450],
        amenities: [
          "on-site golf",
          "walk to clubhouse",
          "grille",
          "putting course access",
        ],
        areaDescription:
          "The Clubhouse at Streamsong — closer to the Red and Blue first tees",
        searchUrl: "https://www.streamsongresort.com/",
        notes:
          "Smaller, golfer-focused lodge steps from the courses. Better for a tight crew that wants to roll out of bed onto the tee.",
        avgRating: 4.6,
      },
    ],
    dining: [
      {
        name: "SottoTerra",
        style: "italian",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Underground Italian steakhouse in The Lodge — the marquee group dinner on property",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "P2O5",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Rooftop fine dining with floor-to-ceiling views over the courses and lakes",
        reservationNeeded: true,
        googleRating: 4.4,
      },
      {
        name: "Fragmentary Blue (Rooftop Bar & Grill)",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Rooftop bar with shareable plates and sunset views — the default first-night spot",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "The Restaurant at the Clubhouse",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Classic golf-clubhouse grille with big breakfasts before early tee times",
        reservationNeeded: false,
        googleRating: 4.3,
      },
    ],
    bars: [
      {
        name: "Fragmentary Blue Rooftop Bar",
        vibe: "rooftop",
        highlight:
          "Streamsong's social hub — craft cocktails and cold beer over the dunes at golden hour",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "AcquaPietra Bar (The Lodge Lobby)",
        vibe: "cocktail",
        highlight:
          "Slick lobby cocktail bar for the late settle-up after dinner",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Bunker Bar",
        vibe: "sports-bar",
        highlight:
          "Casual halfway-house-style bar near the Clubhouse — recap the round over a draft",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Bass Fishing on Streamsong's Lakes",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [150, 350],
        groupFriendly: true,
        highlight:
          "Guided trophy-bass fishing on the resort's reclaimed quarry lakes — a legit non-golf draw here",
        bestFor: "rest day",
        provider: "Streamsong Resort Guided Fishing",
      },
      {
        name: "Sporting Clays at Streamsong",
        type: "shooting",
        duration: "2-3 hours",
        pricePerPerson: [75, 150],
        groupFriendly: true,
        highlight:
          "On-property clays course for a competitive rest-day round of shooting",
        bestFor: "rest day",
        provider: "Streamsong Resort",
      },
      {
        name: "AcquaPietra Spa",
        type: "spa",
        duration: "2-3 hours",
        pricePerPerson: [150, 350],
        groupFriendly: true,
        highlight:
          "Full-service resort spa with grotto pool for the crew that overdid the walking",
        bestFor: "rest day",
        provider: "Streamsong Resort",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 24],
        hourlyRate: [120, 250],
        providers: [
          "Mears Transportation (Tampa/Orlando)",
          "Streamsong Resort Shuttle",
          "Spirit Coach Tampa",
        ],
        notes:
          "No bar-hopping here — book a shuttle from TPA or Orlando for the group ride in. On-site you walk or use resort carts.",
        fullDayRate: [900, 1800],
        canDoGolfAndBars: false,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 150],
        providers: ["Streamsong Resort Private Dining", "SottoTerra Private Events"],
        mealTypes: [
          "private steak dinner",
          "Italian feast",
          "group buffet",
        ],
        notes:
          "Off-site catering is impractical — book a private dining room at SottoTerra or P2O5 through the resort for the big group steak night.",
      },
    ],
  },

  // ─── Ponte Vedra Beach, FL ─────────────────────────────────────────
  {
    id: "ponte-vedra-beach-fl",
    city: "Ponte Vedra Beach",
    state: "FL",
    region: "Southeast",
    tagline: "Tee it up where the pros do at TPC Sawgrass' island green",
    description:
      "Home of THE PLAYERS Championship and the most famous par-3 in golf — the island-green 17th. Ponte Vedra is upscale Atlantic-coast Florida: TPC Sawgrass, Sawgrass Country Club, and a stack of resort courses just 30 minutes from Jacksonville, with a beach-town bar scene to match.",
    population: "small",
    nearestAirport: {
      code: "JAX",
      name: "Jacksonville International Airport",
      driveMinutes: 35,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Publix and Total Wine in Ponte Vedra/Sawgrass Village within 10 min of most rentals.",
    courses: [
      {
        name: "TPC Sawgrass (THE PLAYERS Stadium Course)",
        tier: "bucket-list",
        greenFeeRange: [550, 750],
        holes: 18,
        par: 72,
        yardage: 7245,
        slope: 155,
        rating: 76.8,
        walkable: false,
        style: "resort",
        driveMinutes: 5,
        url: "https://tpc.com/sawgrass/",
        highlight:
          "Pete Dye's masterpiece and the island-green 17th — every golfer's bucket-list round",
        googleRating: 4.7,
        reviewCount: 1100,
        hypeTag: "TOURNAMENT HOST",
        rankNote: "PGA Tour Host — THE PLAYERS Championship",
      },
      {
        name: "TPC Sawgrass (Dye's Valley Course)",
        tier: "premium",
        greenFeeRange: [200, 350],
        holes: 18,
        par: 72,
        yardage: 6864,
        slope: 138,
        rating: 73.5,
        walkable: false,
        style: "resort",
        driveMinutes: 5,
        url: "https://tpc.com/sawgrass/",
        highlight:
          "The Stadium's sibling — a Korn Ferry Tour host that plays a fraction of the price",
        googleRating: 4.5,
        reviewCount: 380,
      },
      {
        name: "Sawgrass Country Club",
        tier: "premium",
        greenFeeRange: [150, 250],
        holes: 27,
        par: 72,
        yardage: 6890,
        walkable: false,
        style: "resort",
        driveMinutes: 8,
        url: "https://www.sawgrasscountryclub.com",
        highlight:
          "The original Players Championship host (1977–81) — 27 holes of classic coastal Florida golf",
        googleRating: 4.5,
        reviewCount: 210,
      },
      {
        name: "The King & Bear at World Golf Village",
        tier: "premium",
        greenFeeRange: [90, 180],
        holes: 18,
        par: 72,
        yardage: 7279,
        walkable: false,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.wgv.com",
        highlight:
          "The only course co-designed by Arnold Palmer and Jack Nicklaus — a true collaboration",
        googleRating: 4.5,
        reviewCount: 640,
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "Slammer & Squire at World Golf Village",
        tier: "solid",
        greenFeeRange: [80, 150],
        holes: 18,
        par: 72,
        yardage: 6939,
        walkable: false,
        style: "resort",
        driveMinutes: 25,
        url: "https://www.wgv.com",
        highlight:
          "Bobby Weed design named for Sam Snead and Gene Sarazen, wrapping the World Golf Hall of Fame village",
        googleRating: 4.3,
        reviewCount: 520,
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [600, 1800],
        amenities: [
          "private pool",
          "beach access",
          "game room",
          "outdoor grill",
          "screened lanai",
        ],
        areaDescription:
          "Ponte Vedra Beach oceanfront and Sawgrass — luxury homes near the courses and the Atlantic",
        searchUrl:
          "https://www.vrbo.com/search?destination=Ponte+Vedra+Beach%2C+FL&groupSize=16",
        notes:
          "Big beach houses in the Sawgrass gates and along Ponte Vedra Blvd. Book early for spring; PLAYERS week (March) is impossible.",
        avgRating: 4.7,
        bedsBreakdown: "4 kings + 4 queens = 16 guys at 2/bed",
      },
      {
        type: "resort-house",
        sleeps: [12, 16],
        nightlyRange: [220, 450],
        amenities: [
          "on-site golf",
          "spa",
          "multiple restaurants",
          "pool",
          "fitness center",
        ],
        areaDescription:
          "Sawgrass Marriott Golf Resort — steps from TPC Sawgrass",
        searchUrl:
          "https://www.marriott.com/search/findHotels.mi?t=sawgrass",
        notes:
          "The Sawgrass Marriott is the classic stay-and-play base. Book 4+ rooms and bundle TPC tee times through the resort.",
        avgRating: 4.4,
        bedsBreakdown: "8 rooms with 2 queens each = 16 guys at 2/bed",
      },
    ],
    dining: [
      {
        name: "Nineteen at TPC Sawgrass",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Clubhouse restaurant overlooking the 18th and 9th greens — the post-round trophy dinner",
        reservationNeeded: true,
        googleRating: 4.4,
      },
      {
        name: "The Lodge & Club / restaurants at Sawgrass",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Fresh Atlantic seafood and oysters with an oceanfront patio",
        reservationNeeded: true,
        googleRating: 4.4,
      },
      {
        name: "Aqua Grill",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Ponte Vedra mainstay for stone crab, grouper, and a big wine list",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Pusser's Bar & Grille",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Caribbean-themed Sawgrass Village spot — Painkillers and a loose group vibe",
        reservationNeeded: false,
        googleRating: 4.3,
      },
    ],
    bars: [
      {
        name: "Pusser's Caribbean Grille",
        vibe: "tiki",
        highlight:
          "Rum-soaked Sawgrass Village bar with the famous Painkiller and a deck for the crew",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Lillie's Coffee Bar / Nightlife strip",
        vibe: "patio",
        highlight:
          "Walkable Sawgrass Village patio scene — easy first-stop on the bar crawl",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Tap Room at Sawgrass Marriott",
        vibe: "sports-bar",
        highlight:
          "On-property sports bar for the late round of drinks without an Uber",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Surfer The Bar (Jacksonville Beach)",
        vibe: "rooftop",
        highlight:
          "Live-music beach bar 15 min south at the Beaches — where the big nights end up",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Inshore & Offshore Fishing Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [125, 300],
        groupFriendly: true,
        highlight:
          "Charter out of the Intracoastal for redfish and trout, or run offshore for the bigger crew",
        bestFor: "rest day",
        provider: "Ponte Vedra / Jacksonville charter fleet",
      },
      {
        name: "Beach Day at Ponte Vedra Beach",
        type: "water-sports",
        duration: "half day",
        pricePerPerson: [0, 50],
        groupFriendly: true,
        highlight:
          "Wide hard-packed Atlantic sand — beach volleyball, coolers, and a recovery afternoon",
        bestFor: "rest day",
        provider: "Public beach access",
      },
      {
        name: "Topgolf Jacksonville",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [35, 65],
        groupFriendly: true,
        highlight:
          "Three-level driving range with games and drinks — the arrival-night warm-up",
        bestFor: "arrival day",
        provider: "Topgolf",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 30],
        hourlyRate: [150, 350],
        providers: [
          "Jacksonville Party Bus",
          "First Coast Limousine",
          "A1A Limo & Transportation",
        ],
        notes:
          "Plenty of Jacksonville operators run golf-AM/beach-bar-PM packages. Book a few weeks out for spring weekends.",
        fullDayRate: [1200, 2600],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 150],
        providers: ["Take a Chef", "Cozymeal", "First Coast Private Chefs"],
        mealTypes: [
          "fresh seafood boil",
          "steak dinner",
          "low-country breakfast",
        ],
        notes:
          "A seafood-boil night at the beach house is the move. Book 1–2 weeks ahead, especially around PLAYERS week.",
      },
    ],
  },

  // ─── Tampa / Palm Harbor, FL ───────────────────────────────────────
  {
    id: "tampa-fl",
    city: "Tampa",
    state: "FL",
    region: "Southeast",
    tagline: "Innisbrook's Copperhead plus a downtown that actually parties",
    description:
      "The best of both worlds: PGA Tour-grade golf at Innisbrook's Copperhead just north in Palm Harbor, and a genuine big-city nightlife scene in Tampa's Ybor City and Water Street. Easy airport, tons of rentals, and Streamsong an hour away for a side trip.",
    population: "medium",
    nearestAirport: {
      code: "TPA",
      name: "Tampa International Airport",
      driveMinutes: 25,
    },
    bestSeasons: ["fall", "spring"],
    groceryNotes:
      "Publix, Costco, and Total Wine everywhere across Tampa and Palm Harbor.",
    courses: [
      {
        name: "Innisbrook Resort (Copperhead Course)",
        tier: "bucket-list",
        greenFeeRange: [150, 350],
        holes: 18,
        par: 71,
        yardage: 7340,
        slope: 140,
        rating: 75.4,
        walkable: false,
        style: "parkland",
        driveMinutes: 35,
        url: "https://www.innisbrookgolfresort.com",
        highlight:
          "Host of the PGA Tour's Valspar Championship — the tree-lined 'Snake Pit' finish is brutal and iconic",
        googleRating: 4.7,
        reviewCount: 1100,
        hypeTag: "TOURNAMENT HOST",
        rankNote: "PGA Tour Host — Valspar Championship",
      },
      {
        name: "Innisbrook Resort (Island Course)",
        tier: "premium",
        greenFeeRange: [120, 250],
        holes: 18,
        par: 72,
        yardage: 7340,
        walkable: false,
        style: "parkland",
        driveMinutes: 35,
        url: "https://www.innisbrookgolfresort.com",
        highlight:
          "Innisbrook's #2 track — tight, watery, and a worthy second round on a stay-and-play",
        googleRating: 4.5,
        reviewCount: 320,
      },
      {
        name: "Streamsong Black",
        tier: "bucket-list",
        greenFeeRange: [150, 419],
        holes: 18,
        par: 73,
        yardage: 7331,
        walkable: true,
        style: "links",
        driveMinutes: 75,
        url: "https://www.streamsongresort.com/golf/",
        highlight:
          "Worth the hour drive — Gil Hanse's Sandbelt-inspired marvel as a day-trip bucket-list round",
        googleRating: 4.7,
        reviewCount: 240,
        hypeTag: "TOP 100 PUBLIC",
        rankNote: "Top 100 Public — Golf Digest",
      },
      {
        name: "TPC Tampa Bay",
        tier: "premium",
        greenFeeRange: [90, 200],
        holes: 18,
        par: 71,
        yardage: 6898,
        walkable: false,
        style: "parkland",
        driveMinutes: 30,
        url: "https://tpc.com/tampabay/",
        highlight:
          "Bobby Weed/Chi-Chi Rodriguez design and former PGA Tour Champions host in Lutz",
        googleRating: 4.4,
        reviewCount: 520,
      },
      {
        name: "The Claw at USF",
        tier: "solid",
        greenFeeRange: [40, 75],
        holes: 18,
        par: 71,
        yardage: 6863,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.usfgolfcourse.com",
        highlight:
          "Surprisingly good value university course near downtown — the budget round of the trip",
        googleRating: 4.3,
        reviewCount: 480,
        hypeTag: "BEST VALUE",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [500, 1500],
        amenities: [
          "private pool",
          "hot tub",
          "game room",
          "outdoor kitchen",
          "near water",
        ],
        areaDescription:
          "South Tampa, Davis Islands, or near Clearwater Beach — pool homes with easy course and downtown access",
        searchUrl:
          "https://www.vrbo.com/search?destination=Tampa%2C+FL&groupSize=16",
        notes:
          "South Tampa keeps you close to nightlife; Palm Harbor/Clearwater keeps you close to Innisbrook. Pick based on the crew's priority.",
        avgRating: 4.6,
        bedsBreakdown: "4 kings + 4 queens = 16 guys at 2/bed",
      },
      {
        type: "resort-house",
        sleeps: [12, 16],
        nightlyRange: [200, 450],
        amenities: [
          "on-site golf",
          "spa",
          "multiple restaurants",
          "pools",
          "fitness center",
        ],
        areaDescription:
          "Innisbrook Resort condos/suites — right on the Copperhead",
        searchUrl: "https://www.innisbrookgolfresort.com",
        notes:
          "Innisbrook stay-and-play is the cleanest way to lock Copperhead tee times. Book lodge suites for the group and bundle rounds.",
        avgRating: 4.4,
        bedsBreakdown: "8 suites with 2 queens each = 16 guys at 2/bed",
      },
    ],
    dining: [
      {
        name: "Bern's Steak House",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Tampa institution — legendary aged steaks and the upstairs Harry Waugh Dessert Room",
        reservationNeeded: true,
        googleRating: 4.7,
      },
      {
        name: "Columbia Restaurant (Ybor City)",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Florida's oldest restaurant — Spanish/Cuban feast with flamenco and a 1905 dining room",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Ulele",
        style: "southern",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Riverwalk spot with native-inspired plates, in-house brewery, and a big patio",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Eddie & Sam's / Tampa pizza & casual",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "NY-style pies for the low-key group night after a long round",
        reservationNeeded: false,
        googleRating: 4.5,
      },
    ],
    bars: [
      {
        name: "Ybor City strip (7th Avenue)",
        vibe: "honky-tonk",
        highlight:
          "Tampa's historic nightlife district — bars, clubs, and cigar lounges all walkable on 7th Ave",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Sparkman Wharf / Water Street",
        vibe: "patio",
        highlight:
          "Open-air beer garden and patio bars in the revitalized downtown waterfront",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Hub Bar",
        vibe: "dive",
        highlight:
          "Beloved downtown Tampa dive with stiff pours — the locals' classic",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Caddy's / Clearwater Beach bars",
        vibe: "rooftop",
        highlight:
          "Beach-bar sprawl at Clearwater for the daytime-drinking rest-day crowd",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Inshore / Flats Fishing Charter (Tampa Bay)",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [125, 275],
        groupFriendly: true,
        highlight:
          "Tampa Bay flats for snook and redfish, or run offshore for grouper with the bigger crew",
        bestFor: "rest day",
        provider: "Tampa Bay charter fleet",
      },
      {
        name: "Clearwater Beach Boat Day",
        type: "boat-rental",
        duration: "full day",
        pricePerPerson: [75, 200],
        groupFriendly: true,
        highlight:
          "Pontoon or charter out to Caladesi Island sandbars for the ultimate rest-day beer cruise",
        bestFor: "rest day",
        provider: "Clearwater boat charters",
      },
      {
        name: "Cigar City Brewing Tour",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [25, 60],
        groupFriendly: true,
        highlight:
          "Tour and taproom at Tampa's flagship craft brewery — Jai Alai IPA on tap",
        bestFor: "arrival day",
        provider: "Cigar City Brewing",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 36],
        hourlyRate: [160, 375],
        providers: [
          "Tampa Bay Party Bus",
          "Elite Limousine Tampa",
          "555 Limo & Party Bus",
        ],
        notes:
          "Big-market supply — Ybor bar crawls and golf shuttles are standard packages. Book ahead for spring training and football weekends.",
        fullDayRate: [1300, 2800],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 150],
        providers: ["Take a Chef", "Cozymeal", "Tampa Bay Private Chefs"],
        mealTypes: [
          "seafood boil",
          "steak dinner",
          "Cuban feast",
          "breakfast spread",
        ],
        notes:
          "A Cuban-themed chef night or a Gulf seafood boil at the pool house both land well. Book 1–2 weeks out.",
      },
    ],
  },

  // ─── Bluffton, SC ──────────────────────────────────────────────────
  {
    id: "bluffton-sc",
    city: "Bluffton",
    state: "SC",
    region: "Southeast",
    tagline: "Lowcountry golf and oak-shaded charm next door to Hilton Head",
    description:
      "The mainland gateway to Hilton Head, with a fraction of the crowds and prices. Davis Love III and Pete Dye courses wind through tidal marsh and old forest, historic Old Town Bluffton serves oysters and craft beer, and you can be on the beach in 20 minutes.",
    population: "small",
    nearestAirport: {
      code: "SAV",
      name: "Savannah/Hilton Head International Airport",
      driveMinutes: 30,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Publix, Kroger, and a Costco nearby; ABC stores for liquor. Easy stock-up for any rental.",
    courses: [
      {
        name: "May River Golf Club (Montage Palmetto Bluff)",
        tier: "bucket-list",
        greenFeeRange: [200, 350],
        holes: 18,
        par: 72,
        yardage: 7171,
        slope: 134,
        rating: 74.8,
        walkable: true,
        style: "coastal",
        driveMinutes: 15,
        url: "https://www.montagehotels.com/palmettobluff/golf/",
        highlight:
          "Jack Nicklaus signature weaving along the May River — walking-caddie golf at its best (resort guests only)",
        googleRating: 4.8,
        reviewCount: 180,
        hypeTag: "BUCKET LIST",
      },
      {
        name: "Eagle's Pointe Golf Club",
        tier: "premium",
        greenFeeRange: [60, 110],
        holes: 18,
        par: 72,
        yardage: 6738,
        walkable: false,
        style: "parkland",
        driveMinutes: 10,
        url: "https://eaglespointegc.com/",
        highlight:
          "Davis Love III design with great value and wildlife-filled Lowcountry corridors",
        googleRating: 4.4,
        reviewCount: 420,
        hypeTag: "BEST VALUE",
      },
      {
        name: "Old South Golf Links",
        tier: "premium",
        greenFeeRange: [60, 120],
        holes: 18,
        par: 72,
        yardage: 6772,
        walkable: false,
        style: "coastal",
        driveMinutes: 10,
        url: "https://www.oldsouthgolf.com",
        highlight:
          "Holes routed through forest, open meadow, and tidal salt marsh — postcard Lowcountry golf",
        googleRating: 4.5,
        reviewCount: 510,
      },
      {
        name: "Hilton Head National",
        tier: "solid",
        greenFeeRange: [55, 110],
        holes: 27,
        par: 72,
        yardage: 6779,
        walkable: false,
        style: "parkland",
        driveMinutes: 12,
        url: "https://www.golfhiltonheadnational.com",
        highlight:
          "Gary Player and Bobby Weed contrasting nines — 27 holes of well-conditioned value",
        googleRating: 4.4,
        reviewCount: 480,
      },
      {
        name: "Crescent Pointe Golf Club",
        tier: "solid",
        greenFeeRange: [45, 95],
        holes: 18,
        par: 71,
        yardage: 6447,
        walkable: false,
        style: "parkland",
        driveMinutes: 8,
        url: "https://www.crescentpointegolf.com",
        highlight:
          "Arnold Palmer design with plenty of water — a fair, fun fourth round",
        googleRating: 4.2,
        reviewCount: 360,
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [400, 1200],
        amenities: [
          "private pool",
          "screened porch",
          "outdoor grill",
          "game room",
          "near marsh",
        ],
        areaDescription:
          "Palmetto Bluff, Hampton Lake, or Old Town Bluffton — Lowcountry homes under the oaks",
        searchUrl:
          "https://www.vrbo.com/search?destination=Bluffton%2C+SC&groupSize=16",
        notes:
          "Bluffton rentals run cheaper than Hilton Head proper for similar quality. Old Town puts you walking distance to the bars.",
        avgRating: 4.7,
        bedsBreakdown: "4 kings + 4 queens = 16 guys at 2/bed",
      },
      {
        type: "resort-house",
        sleeps: [12, 16],
        nightlyRange: [350, 800],
        amenities: [
          "on-site golf",
          "spa",
          "river access",
          "multiple restaurants",
          "pool",
        ],
        areaDescription:
          "Montage Palmetto Bluff cottages — the splurge that unlocks May River tee times",
        searchUrl: "https://www.montagehotels.com/palmettobluff/",
        notes:
          "Staying at Montage Palmetto Bluff is the only reliable way onto May River. Pricey but a true bucket-list base.",
        avgRating: 4.8,
      },
    ],
    dining: [
      {
        name: "The Old Oyster Factory (Hilton Head)",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Waterfront seafood built on a former oyster cannery — sunset views over Broad Creek",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Old Town Dispensary",
        style: "southern",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Open-air Old Town courtyard bar and kitchen — Lowcountry plates and live music",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "FARM Bluffton",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Acclaimed farm-to-table spot in Old Town for the nicer group dinner",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Captain Woody's",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Casual fish-shack grouper bites and cold buckets of beer — easy crew lunch or dinner",
        reservationNeeded: false,
        googleRating: 4.4,
      },
    ],
    bars: [
      {
        name: "Old Town Dispensary",
        vibe: "patio",
        highlight:
          "The heart of Old Town nightlife — courtyard bar with live bands and a deep whiskey list",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Corks Wine Co. / Bluffton Room",
        vibe: "cocktail",
        highlight:
          "Cozy Old Town cocktail and wine spot for a slower first stop",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Roasting Room Lounge",
        vibe: "cocktail",
        highlight:
          "Upstairs listening-room and craft-cocktail lounge above the Dispensary",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Salty Dog (Hilton Head)",
        vibe: "tiki",
        highlight:
          "Iconic island beach bar 20 min away for the big night with the whole group",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Inshore Fishing & Dolphin Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [100, 250],
        groupFriendly: true,
        highlight:
          "Lowcountry creeks for redfish and trout with dolphin sightings throughout",
        bestFor: "rest day",
        provider: "Bluffton / May River charters",
      },
      {
        name: "May River Kayak / SUP Tour",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [45, 85],
        groupFriendly: true,
        highlight:
          "Paddle the tidal May River through the marsh — chill recovery morning",
        bestFor: "rest day",
        provider: "Native Guide Tours / Outside Hilton Head",
      },
      {
        name: "Oyster Roast & Lowcountry Boil Charter",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [80, 200],
        groupFriendly: true,
        highlight:
          "Private boat to a sandbar for an oyster roast — peak Lowcountry buddies day",
        bestFor: "rest day",
        provider: "Bluffton boat charters",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [12, 28],
        hourlyRate: [120, 300],
        providers: [
          "Lowcountry Party Bus",
          "Hilton Head Transit & Limo",
          "Diamond Transportation Bluffton",
        ],
        notes:
          "Smaller market — book shuttles/limos for golf and the Old Town/Hilton Head bar runs a few weeks ahead.",
        fullDayRate: [1000, 2200],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 150],
        providers: ["Take a Chef", "Cozymeal", "Lowcountry Private Chefs"],
        mealTypes: [
          "Lowcountry boil",
          "fresh local seafood",
          "oyster roast",
          "breakfast spread",
        ],
        notes:
          "A Lowcountry boil or shrimp-and-grits chef night at the house is the signature Bluffton move. Book 1–2 weeks ahead.",
      },
    ],
  },

  // ─── Aiken, SC ─────────────────────────────────────────────────────
  {
    id: "aiken-sc",
    city: "Aiken",
    state: "SC",
    region: "Southeast",
    tagline: "Donald Ross golf and horse-town charm 25 minutes from Augusta",
    description:
      "A genteel Thoroughbred town stacked with design pedigree: Donald Ross, Alister MacKenzie, and Arnold Palmer all left their mark here. Aiken is a savvy, affordable base for a Masters-week golf trip — close to Augusta National's gravity without Augusta's price tag.",
    population: "small",
    nearestAirport: {
      code: "AGS",
      name: "Augusta Regional Airport",
      driveMinutes: 30,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Publix and Kroger in town; SC ABC stores for spirits. Easy stock-up.",
    courses: [
      {
        name: "The Aiken Golf Club",
        tier: "premium",
        greenFeeRange: [25, 55],
        holes: 18,
        par: 70,
        yardage: 5919,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://aikengolfclub.net/",
        highlight:
          "A 1912 Donald Ross routing through pines and elevation — one of the great bargains in American golf",
        googleRating: 4.7,
        reviewCount: 380,
        hypeTag: "HIDDEN GEM",
      },
      {
        name: "Cedar Creek Golf Club",
        tier: "premium",
        greenFeeRange: [44, 75],
        holes: 18,
        par: 72,
        yardage: 7206,
        slope: 135,
        walkable: false,
        style: "parkland",
        driveMinutes: 10,
        url: "https://cedarcreekgolfclub.com/",
        highlight:
          "Arthur Hills design with dramatic green complexes and natural streams — the area's premier daily-fee",
        googleRating: 4.5,
        reviewCount: 460,
      },
      {
        name: "Houndslake Country Club",
        tier: "premium",
        greenFeeRange: [50, 95],
        holes: 27,
        par: 72,
        yardage: 6896,
        walkable: false,
        style: "parkland",
        driveMinutes: 8,
        url: "https://www.houndslake.com",
        highlight:
          "Joe Lee-designed 27 holes — book limited guest play for a polished private-club round",
        googleRating: 4.4,
        reviewCount: 210,
      },
      {
        name: "Mount Vintage Plantation Golf Club",
        tier: "solid",
        greenFeeRange: [45, 85],
        holes: 27,
        par: 72,
        yardage: 7100,
        walkable: false,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.mountvintage.com",
        highlight:
          "Tom Jackson design across rolling plantation land near North Augusta — three scenic nines",
        googleRating: 4.5,
        reviewCount: 240,
      },
      {
        name: "Midland Valley Country Club",
        tier: "budget",
        greenFeeRange: [30, 60],
        holes: 18,
        par: 72,
        yardage: 6855,
        walkable: false,
        style: "parkland",
        driveMinutes: 12,
        url: "https://www.midlandvalleycc.com",
        highlight:
          "Ellis Maples classic and longtime local favorite — a fair, affordable fourth round",
        googleRating: 4.3,
        reviewCount: 190,
        hypeTag: "BEST VALUE",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [350, 1500],
        amenities: [
          "fireplace",
          "porch",
          "outdoor grill",
          "near downtown",
          "yard",
        ],
        areaDescription:
          "Historic downtown Aiken and the Horse District — charming homes walkable to bars and restaurants",
        searchUrl:
          "https://www.vrbo.com/search?destination=Aiken%2C+SC&groupSize=16",
        notes:
          "Aiken rentals are a steal except during Masters week (early April), when prices and demand spike hard. Book that window a year out.",
        avgRating: 4.7,
        bedsBreakdown: "4 kings + 4 queens = 16 guys at 2/bed",
      },
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [600, 2500],
        amenities: [
          "private pool",
          "acreage",
          "multiple living areas",
          "grill",
          "fire pit",
        ],
        areaDescription:
          "Larger estate homes on the outskirts toward the courses — room for a big crew",
        searchUrl:
          "https://www.vrbo.com/search?destination=Aiken%2C+SC&groupSize=20",
        notes:
          "Aiken's horse-country estates rent as event/golf-trip homes. Great value outside Masters week for a 16+ group.",
        avgRating: 4.6,
      },
    ],
    dining: [
      {
        name: "The Willcox",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Aiken's grand historic inn — the marquee fine-dining group dinner with a clubby bar",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Whiskey Alley",
        style: "southern",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Downtown gastropub with serious bourbon list and elevated Southern plates",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Variety Restaurant",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Local seafood-and-steaks staple that handles big groups easily",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "Takosushi",
        style: "sushi",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Popular downtown sushi-and-taco mashup — a lighter night with margaritas",
        reservationNeeded: false,
        googleRating: 4.4,
      },
    ],
    bars: [
      {
        name: "The Alley (downtown Aiken)",
        vibe: "patio",
        highlight:
          "Aiken's downtown bar alley — multiple spots clustered for an easy crawl",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Whiskey Alley Bar",
        vibe: "whiskey-bar",
        highlight:
          "Deep bourbon and rye selection in a warm downtown setting",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Bar / Aiken Brewing Company",
        vibe: "brewpub",
        highlight:
          "South Carolina's oldest brewpub downtown — house pints and pub grub",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Willcox Bar",
        vibe: "cocktail",
        highlight:
          "Old-money lounge with crackling fireplace and proper cocktails",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Sporting Clays at Cedar Creek",
        type: "shooting",
        duration: "2-3 hours",
        pricePerPerson: [60, 130],
        groupFriendly: true,
        highlight:
          "Wooded sporting-clays course — a competitive rest-day round in horse country",
        bestFor: "rest day",
        provider: "Cedar Creek Sporting Clays / area outfitters",
      },
      {
        name: "Hitchcock Woods Trail Ride",
        type: "horseback",
        duration: "2-3 hours",
        pricePerPerson: [60, 120],
        groupFriendly: true,
        highlight:
          "Aiken is horse country — guided rides through one of the largest urban forests in the U.S.",
        bestFor: "rest day",
        provider: "Aiken-area stables",
      },
      {
        name: "Lake Murray / Savannah River Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [90, 200],
        groupFriendly: true,
        highlight:
          "Guided bass and catfish trips on nearby lakes and the Savannah River",
        bestFor: "rest day",
        provider: "Aiken-area guides",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [12, 28],
        hourlyRate: [110, 280],
        providers: [
          "Augusta Party Bus",
          "CSRA Limousine",
          "Aiken Black Car & Limo",
        ],
        notes:
          "Augusta-area operators serve Aiken. Book well ahead for Masters week; off-season supply is easy.",
        fullDayRate: [900, 2000],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 140],
        providers: ["Take a Chef", "Cozymeal", "CSRA Private Chefs"],
        mealTypes: [
          "Southern steak dinner",
          "low-country boil",
          "BBQ cookout",
          "breakfast spread",
        ],
        notes:
          "A Southern steak-and-bourbon chef night fits Aiken's vibe perfectly. Book 1–2 weeks ahead, earlier for Masters week.",
      },
    ],
  },

  // ─── Greenville, SC ────────────────────────────────────────────────
  {
    id: "greenville-sc",
    city: "Greenville",
    state: "SC",
    region: "Southeast",
    tagline: "Upstate golf and a downtown that punches way above its weight",
    description:
      "One of the South's best small cities, with a buzzing walkable downtown, a waterfall in the middle of it, and a deep bench of public golf at Furman, The Preserve at Verdae, and Cherokee Valley. Blue Ridge foothills mean cooler air and scenery you don't get on the coast.",
    population: "medium",
    nearestAirport: {
      code: "GSP",
      name: "Greenville-Spartanburg International Airport",
      driveMinutes: 25,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Publix, Harris Teeter, Costco, and Total Wine all close to most rentals.",
    courses: [
      {
        name: "The Preserve at Verdae",
        tier: "premium",
        greenFeeRange: [65, 110],
        holes: 18,
        par: 72,
        yardage: 7021,
        slope: 138,
        walkable: false,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.thepreserveatverdae.com/",
        highlight:
          "Willard Byrd design with rolling terrain and pristine greens — the closest premium round to downtown",
        googleRating: 4.4,
        reviewCount: 520,
      },
      {
        name: "Furman University Golf Club",
        tier: "premium",
        greenFeeRange: [45, 80],
        holes: 18,
        par: 72,
        yardage: 7004,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.furmangolfclub.com/",
        highlight:
          "Top-rated public course in Upstate SC — a long, classic Robert Trent Jones-era layout",
        googleRating: 4.5,
        reviewCount: 410,
        hypeTag: "LOCALS' FAVORITE",
      },
      {
        name: "Cherokee Valley Golf Club",
        tier: "premium",
        greenFeeRange: [40, 75],
        holes: 18,
        par: 72,
        yardage: 6728,
        walkable: false,
        style: "mountain",
        driveMinutes: 25,
        url: "https://www.cherokeevalley.com",
        highlight:
          "P.B. Dye design climbing into the Blue Ridge foothills in Travelers Rest — dramatic and scenic",
        googleRating: 4.5,
        reviewCount: 430,
      },
      {
        name: "Pebble Creek Country Club (Creekside)",
        tier: "solid",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 71,
        yardage: 6376,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.pebblecreekgolfclub.net",
        highlight:
          "Tom Jackson-designed Creekside course — solid, fair, and good value north of town",
        googleRating: 4.2,
        reviewCount: 320,
      },
      {
        name: "Paris Mountain / Bonnie Brae Golf Club",
        tier: "budget",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 72,
        yardage: 6708,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.bonniebraegolf.com",
        highlight:
          "Easygoing daily-fee track for the budget round of the trip",
        googleRating: 4.2,
        reviewCount: 260,
        hypeTag: "BEST VALUE",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [400, 1400],
        amenities: [
          "near downtown",
          "porch",
          "outdoor grill",
          "game room",
          "yard",
        ],
        areaDescription:
          "Downtown Greenville and the West End — homes walkable to Main Street nightlife",
        searchUrl:
          "https://www.vrbo.com/search?destination=Greenville%2C+SC&groupSize=16",
        notes:
          "Staying near Main Street means you can walk the whole bar/restaurant scene. Great value relative to coastal trips.",
        avgRating: 4.7,
        bedsBreakdown: "4 kings + 4 queens = 16 guys at 2/bed",
      },
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [500, 2000],
        amenities: [
          "private pool",
          "mountain views",
          "fire pit",
          "multiple living areas",
          "grill",
        ],
        areaDescription:
          "Travelers Rest and the foothills — bigger homes near Cherokee Valley with cooler mountain air",
        searchUrl:
          "https://www.vrbo.com/search?destination=Travelers+Rest%2C+SC&groupSize=20",
        notes:
          "Foothills rentals put you near the scenic courses and the Swamp Rabbit Trail breweries. 20 min to downtown.",
        avgRating: 4.6,
      },
    ],
    dining: [
      {
        name: "Halls Chophouse Greenville",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "The marquee Main Street steakhouse — wet-aged ribeyes and a high-energy room",
        reservationNeeded: true,
        googleRating: 4.7,
      },
      {
        name: "Soby's New South Cuisine",
        style: "southern",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Elevated Southern cooking in a historic West End building — strong group dinner",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Jianna",
        style: "italian",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "House-made pasta and an oyster bar with rooftop views over Falls Park",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Fireforge / Greenville brewpubs",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Downtown brewpub for the low-key night — house beers and shareable plates",
        reservationNeeded: false,
        googleRating: 4.5,
      },
    ],
    bars: [
      {
        name: "Main Street (downtown Greenville)",
        vibe: "patio",
        highlight:
          "Tree-lined Main Street packed with walkable bars and patios from end to end",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Up on the Roof",
        vibe: "rooftop",
        highlight:
          "Downtown rooftop bar overlooking the city — the sunset spot to start the night",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Whale / craft beer halls",
        vibe: "brewpub",
        highlight:
          "Greenville's deep craft-beer scene — taprooms and bottle shops all over the West End",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Trappe Door",
        vibe: "dive",
        highlight:
          "Belgian-beer basement bar with a cult following — great late-night hideout",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Swamp Rabbit Trail Brewery Crawl",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [40, 90],
        groupFriendly: true,
        highlight:
          "Bike or van the Swamp Rabbit Trail between Greenville's best breweries in Travelers Rest",
        bestFor: "rest day",
        provider: "Greenville brewery tour operators",
      },
      {
        name: "Saluda River / Green River Whitewater Rafting",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [60, 120],
        groupFriendly: true,
        highlight:
          "Blue Ridge whitewater within an hour of town — an adventurous rest-day option",
        bestFor: "rest day",
        provider: "Wildwater / Green River outfitters",
      },
      {
        name: "Paris Mountain State Park Hike",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 20],
        groupFriendly: true,
        highlight:
          "Easy foothills trails minutes from downtown to clear the head before the round",
        bestFor: "morning before golf",
        provider: "Paris Mountain State Park",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 30],
        hourlyRate: [140, 320],
        providers: [
          "Greenville Party Bus",
          "Upstate Limousine",
          "Carolina Party Bus",
        ],
        notes:
          "Good supply for a college town — Main Street crawls and brewery loops are standard. Book ahead for fall football weekends.",
        fullDayRate: [1100, 2400],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 140],
        providers: ["Take a Chef", "Cozymeal", "Upstate Private Chefs"],
        mealTypes: [
          "Southern steak dinner",
          "BBQ cookout",
          "low-country boil",
          "breakfast spread",
        ],
        notes:
          "A Southern steak or BBQ chef night at the downtown house keeps the crew off the clock. Book 1–2 weeks ahead.",
      },
    ],
  },

  // ─── Birmingham, AL (RTJ Oxmoor Valley) ────────────────────────────
  {
    id: "birmingham-al",
    city: "Birmingham",
    state: "AL",
    region: "Southeast",
    tagline: "RTJ Trail golf and a surprise-hit food-and-bar city",
    description:
      "The Robert Trent Jones Golf Trail's Oxmoor Valley sits minutes from a downtown that's become one of the South's best food cities. Big elevation changes on former mining land, James Beard-winning restaurants, and a revitalized nightlife scene make Birmingham a value-packed surprise.",
    population: "medium",
    nearestAirport: {
      code: "BHM",
      name: "Birmingham-Shuttlesworth International Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Publix and Costco around town; AL state ABC stores for liquor. Easy stock-up.",
    courses: [
      {
        name: "RTJ Golf Trail at Oxmoor Valley (Ridge Course)",
        tier: "premium",
        greenFeeRange: [55, 95],
        holes: 18,
        par: 72,
        yardage: 7055,
        slope: 142,
        rating: 74.6,
        walkable: false,
        style: "mountain",
        driveMinutes: 15,
        url: "https://www.rtjgolf.com/oxmoorvalley/",
        highlight:
          "Dramatic elevation changes and heavy tree cover on former U.S. Steel land — the photogenic RTJ Trail headliner here",
        googleRating: 4.5,
        reviewCount: 620,
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "RTJ Golf Trail at Oxmoor Valley (Valley Course)",
        tier: "premium",
        greenFeeRange: [50, 90],
        holes: 18,
        par: 72,
        yardage: 7027,
        slope: 134,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.rtjgolf.com/oxmoorvalley/",
        highlight:
          "Renovated in 2021 with new TifEagle greens — a flatter, more forgiving complement to the Ridge",
        googleRating: 4.4,
        reviewCount: 410,
      },
      {
        name: "Ross Bridge (RTJ Trail)",
        tier: "bucket-list",
        greenFeeRange: [80, 140],
        holes: 18,
        par: 72,
        yardage: 8191,
        slope: 138,
        rating: 77.6,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.rtjgolf.com/rossbridge/",
        highlight:
          "One of the longest courses in the world, wrapped around a Renaissance resort with a waterfall between 9 and 18",
        googleRating: 4.6,
        reviewCount: 540,
        hypeTag: "BUCKET LIST",
      },
      {
        name: "Highland Park Golf Course",
        tier: "solid",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 70,
        yardage: 6010,
        walkable: true,
        style: "parkland",
        driveMinutes: 8,
        url: "https://www.highlandparkgolfcourse.org",
        highlight:
          "1903 in-town classic and walkable budget round near Five Points South",
        googleRating: 4.4,
        reviewCount: 380,
        hypeTag: "BEST VALUE",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [400, 1300],
        amenities: [
          "near downtown",
          "porch",
          "outdoor grill",
          "game room",
          "yard",
        ],
        areaDescription:
          "Highland Park, Forest Park, or downtown — homes near the bars and restaurants",
        searchUrl:
          "https://www.vrbo.com/search?destination=Birmingham%2C+AL&groupSize=16",
        notes:
          "Birmingham rentals are a strong value. Stay near Avondale/downtown for nightlife or Hoover for proximity to the courses.",
        avgRating: 4.6,
        bedsBreakdown: "4 kings + 4 queens = 16 guys at 2/bed",
      },
      {
        type: "resort-house",
        sleeps: [12, 16],
        nightlyRange: [200, 450],
        amenities: [
          "on-site golf",
          "spa",
          "multiple restaurants",
          "pool",
          "concierge",
        ],
        areaDescription:
          "Renaissance Ross Bridge Golf Resort — stay on the RTJ Trail course",
        searchUrl:
          "https://www.marriott.com/search/findHotels.mi?t=ross+bridge",
        notes:
          "Ross Bridge resort lets you bundle RTJ Trail tee times and roll out of bed onto the course. Book room blocks for the group.",
        avgRating: 4.4,
        bedsBreakdown: "8 rooms with 2 queens each = 16 guys at 2/bed",
      },
    ],
    dining: [
      {
        name: "Highlands Bar & Grill",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Frank Stitt's James Beard-honored flagship — Birmingham's signature fine-dining splurge",
        reservationNeeded: true,
        googleRating: 4.7,
      },
      {
        name: "Saw's BBQ",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Alabama-style smoked pork and the famous white-sauce chicken — peak group lunch",
        reservationNeeded: false,
        googleRating: 4.6,
      },
      {
        name: "The Essential / Pizitz Food Hall",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Downtown food hall and adjacent bistros — everyone gets what they want, easy with 16",
        reservationNeeded: false,
        googleRating: 4.5,
      },
      {
        name: "Automatic Seafood & Oysters",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Buzzy modern seafood spot — Gulf oysters and a great cocktail program",
        reservationNeeded: true,
        googleRating: 4.6,
      },
    ],
    bars: [
      {
        name: "Avondale Brewing / Avondale district",
        vibe: "brewpub",
        highlight:
          "Birmingham's brewery-and-bar district — walkable cluster of taprooms and music venues",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "The Collins Bar",
        vibe: "cocktail",
        highlight:
          "Downtown craft-cocktail favorite with a periodic-table menu and easy crowd",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Louis Bar (rooftop)",
        vibe: "rooftop",
        highlight:
          "Rooftop bar atop the Pizitz with skyline views — the kickoff spot",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The J. Clyde",
        vibe: "dive",
        highlight:
          "Five Points beer-geek pub with a massive draft list and a porch",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Barber Motorsports / Vintage Racing Museum",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [25, 120],
        groupFriendly: true,
        highlight:
          "World-class motorcycle museum and racetrack — go-karts and track experiences for gearheads",
        bestFor: "rest day",
        provider: "Barber Motorsports Park",
      },
      {
        name: "Civil Rights District Walking Tour",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 40],
        groupFriendly: true,
        highlight:
          "Powerful, easy downtown walk through the historic Civil Rights District",
        bestFor: "morning before golf",
        provider: "Birmingham Civil Rights Institute",
      },
      {
        name: "Avondale Brewery Tour",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [25, 60],
        groupFriendly: true,
        highlight:
          "Tour and taproom crawl through Birmingham's craft-beer scene",
        bestFor: "arrival day",
        provider: "Avondale / Good People Brewing",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 30],
        hourlyRate: [140, 320],
        providers: [
          "Birmingham Party Bus",
          "Magic City Limo",
          "Alabama Limousine",
        ],
        notes:
          "Solid supply for a city of this size — golf shuttles plus Avondale/downtown bar runs. Book ahead for Alabama/Auburn game weekends.",
        fullDayRate: [1100, 2400],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 145],
        providers: ["Take a Chef", "Cozymeal", "Birmingham Private Chefs"],
        mealTypes: [
          "Southern steak dinner",
          "Alabama BBQ cookout",
          "shrimp & grits",
          "breakfast spread",
        ],
        notes:
          "Birmingham's deep food scene means strong private-chef options. An Alabama BBQ or steak night is a layup. Book 1–2 weeks ahead.",
      },
    ],
  },

  // ─── Auburn-Opelika, AL (RTJ Grand National) ───────────────────────
  {
    id: "auburn-opelika-al",
    city: "Auburn-Opelika",
    state: "AL",
    region: "Southeast",
    tagline: "Grand National — the crown jewel of the RTJ Golf Trail",
    description:
      "Robert Trent Jones Sr. called this the single greatest natural site for golf he'd ever seen. Grand National's 54 holes drape along 600-acre Lake Saugahatchee, anchoring a buddies trip with SEC-town energy in Auburn just minutes away. World-class golf at public prices.",
    population: "small",
    nearestAirport: {
      code: "ATL",
      name: "Hartsfield-Jackson Atlanta International Airport",
      driveMinutes: 105,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Publix and Kroger in Auburn/Opelika; AL ABC stores for spirits. Easy stock-up near the resort.",
    courses: [
      {
        name: "RTJ Golf Trail at Grand National (Lake Course)",
        tier: "bucket-list",
        greenFeeRange: [65, 110],
        holes: 18,
        par: 72,
        yardage: 7149,
        slope: 142,
        rating: 74.6,
        walkable: false,
        style: "parkland",
        driveMinutes: 12,
        url: "https://www.rtjgolf.com/grandnational/",
        highlight:
          "Twelve holes hug 600-acre Lake Saugahatchee — voted the #1 public golf facility in America by Golf World readers",
        googleRating: 4.7,
        reviewCount: 720,
        hypeTag: "TOP 100 PUBLIC",
        rankNote: "RTJ Trail flagship — hosted PGA Tour, LPGA & Korn Ferry events",
      },
      {
        name: "RTJ Golf Trail at Grand National (Links Course)",
        tier: "bucket-list",
        greenFeeRange: [65, 110],
        holes: 18,
        par: 72,
        yardage: 7311,
        slope: 145,
        rating: 75.3,
        walkable: false,
        style: "parkland",
        driveMinutes: 12,
        url: "https://www.rtjgolf.com/grandnational/",
        highlight:
          "Every bit as scenic as the Lake — long, demanding, and routinely top-ranked among U.S. public courses",
        googleRating: 4.7,
        reviewCount: 660,
        hypeTag: "TOP 100 PUBLIC",
        rankNote: "Top 100 Public — Golf Digest",
      },
      {
        name: "RTJ Golf Trail at Grand National (Short Course)",
        tier: "premium",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 54,
        yardage: 3328,
        walkable: true,
        style: "parkland",
        driveMinutes: 12,
        url: "https://www.rtjgolf.com/grandnational/",
        highlight:
          "An 18-hole par-3 with lakeside holes — the afternoon money game after 18 on the big tracks",
        googleRating: 4.6,
        reviewCount: 240,
      },
      {
        name: "Moore's Mill Club",
        tier: "solid",
        greenFeeRange: [45, 85],
        holes: 18,
        par: 72,
        yardage: 6973,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.mooresmillclub.com",
        highlight:
          "John LaFoy design through Auburn rolling hills — a worthy non-Trail fourth round",
        googleRating: 4.4,
        reviewCount: 180,
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [350, 1200],
        amenities: [
          "near campus",
          "porch",
          "outdoor grill",
          "game room",
          "yard",
        ],
        areaDescription:
          "Auburn near campus/downtown — homes walkable to the SEC bar scene",
        searchUrl:
          "https://www.vrbo.com/search?destination=Auburn%2C+AL&groupSize=16",
        notes:
          "Auburn rentals spike hard on home football Saturdays — avoid those weekends or book a year out. Great value otherwise.",
        avgRating: 4.6,
        bedsBreakdown: "4 kings + 4 queens = 16 guys at 2/bed",
      },
      {
        type: "resort-house",
        sleeps: [12, 16],
        nightlyRange: [180, 400],
        amenities: [
          "on-site golf",
          "spa",
          "lake views",
          "restaurant",
          "pool",
        ],
        areaDescription:
          "Marriott Auburn Opelika Grand National — directly on the RTJ Trail courses",
        searchUrl:
          "https://www.marriott.com/search/findHotels.mi?t=grand+national",
        notes:
          "The Grand National Marriott is the obvious base — wake up on the course. Book room blocks and bundle RTJ Trail rounds.",
        avgRating: 4.5,
        bedsBreakdown: "8 rooms with 2 queens each = 16 guys at 2/bed",
      },
    ],
    dining: [
      {
        name: "Acre",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Auburn's standout farm-to-table — the nicer group dinner of the trip",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Niffer's Place",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Beloved Auburn wings-and-burgers joint that handles big rowdy groups",
        reservationNeeded: false,
        googleRating: 4.5,
      },
      {
        name: "Ariccia (The Hotel at Auburn)",
        style: "italian",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Upscale Italian at the campus hotel — easy for a polished crew dinner",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Hamilton's on Magnolia",
        style: "southern",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Downtown Auburn Southern spot with shareable plates and a full bar",
        reservationNeeded: true,
        googleRating: 4.5,
      },
    ],
    bars: [
      {
        name: "Skybar Cafe",
        vibe: "honky-tonk",
        highlight:
          "Auburn's legendary game-day bar on the corner — the rowdy heart of campus nightlife",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "1716 / downtown Auburn strip",
        vibe: "patio",
        highlight:
          "Cluster of college bars on the downtown corner — easy crawl on foot",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Hound",
        vibe: "whiskey-bar",
        highlight:
          "Craft cocktails and whiskey with a more grown-up feel for the early night",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Bourbon Street Bar",
        vibe: "dive",
        highlight:
          "No-frills downtown dive for late-night pours after the crawl",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Lake Saugahatchee / Lake Martin Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [90, 200],
        groupFriendly: true,
        highlight:
          "Bass fishing on the lake that frames Grand National, or run to nearby Lake Martin",
        bestFor: "rest day",
        provider: "Auburn-area guides",
      },
      {
        name: "Lake Martin Boat Day",
        type: "boat-rental",
        duration: "full day",
        pricePerPerson: [75, 200],
        groupFriendly: true,
        highlight:
          "Pontoon day on one of Alabama's best lakes — Chimney Rock cliff jumping included",
        bestFor: "rest day",
        provider: "Lake Martin boat rentals",
      },
      {
        name: "Auburn Sporting Clays / Shooting",
        type: "shooting",
        duration: "2-3 hours",
        pricePerPerson: [60, 130],
        groupFriendly: true,
        highlight:
          "Area sporting-clays courses for a competitive rest-day round",
        bestFor: "rest day",
        provider: "Auburn-area outfitters",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [12, 28],
        hourlyRate: [130, 300],
        providers: [
          "Auburn Party Bus",
          "Tiger Limousine",
          "Columbus/Montgomery Limo",
        ],
        notes:
          "Supply spikes around home football games — book a year ahead for those, easy otherwise. Golf shuttle + downtown bar runs standard.",
        fullDayRate: [1000, 2200],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 140],
        providers: ["Take a Chef", "Cozymeal", "Auburn-area private chefs"],
        mealTypes: [
          "Southern steak dinner",
          "Alabama BBQ cookout",
          "low-country boil",
          "breakfast spread",
        ],
        notes:
          "An Alabama BBQ or steak chef night at the lake/campus house is a great call. Book 1–2 weeks ahead.",
      },
    ],
  },

  // ─── Mobile, AL (RTJ Magnolia Grove) ───────────────────────────────
  {
    id: "mobile-al",
    city: "Mobile",
    state: "AL",
    region: "Southeast",
    tagline: "RTJ Trail golf, Gulf seafood, and the original Mardi Gras",
    description:
      "Alabama's port city pairs RTJ Trail golf at Magnolia Grove with Gulf-fresh seafood, a historic downtown, and a real party heritage — Mobile invented Mardi Gras. Easy 45 minutes from the Gulf Shores beaches if you want to split the trip.",
    population: "medium",
    nearestAirport: {
      code: "MOB",
      name: "Mobile Regional Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Publix, Winn-Dixie, and ABC stores around town; seafood markets for fresh Gulf catch.",
    courses: [
      {
        name: "RTJ Golf Trail at Magnolia Grove (Crossings Course)",
        tier: "premium",
        greenFeeRange: [55, 95],
        holes: 18,
        par: 72,
        yardage: 7150,
        slope: 137,
        rating: 74.4,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.rtjgolf.com/magnoliagrove/",
        highlight:
          "Rolling, tree-lined RTJ Trail track — the more open of Magnolia Grove's two championship 18s",
        googleRating: 4.5,
        reviewCount: 480,
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "RTJ Golf Trail at Magnolia Grove (Falls Course)",
        tier: "premium",
        greenFeeRange: [55, 95],
        holes: 18,
        par: 72,
        yardage: 7239,
        slope: 140,
        rating: 75.0,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.rtjgolf.com/magnoliagrove/",
        highlight:
          "Former LPGA Tour host with waterfalls and dramatic elevation — the tougher of the pair",
        googleRating: 4.5,
        reviewCount: 440,
        hypeTag: "TOURNAMENT HOST",
      },
      {
        name: "RTJ Golf Trail at Magnolia Grove (Short Course)",
        tier: "solid",
        greenFeeRange: [30, 50],
        holes: 18,
        par: 54,
        yardage: 3140,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.rtjgolf.com/magnoliagrove/",
        highlight:
          "An 18-hole par-3 that's a legit challenge — the afternoon side-bet round",
        googleRating: 4.5,
        reviewCount: 160,
      },
      {
        name: "Rock Creek Golf Club",
        tier: "solid",
        greenFeeRange: [45, 85],
        holes: 18,
        par: 72,
        yardage: 6920,
        walkable: false,
        style: "parkland",
        driveMinutes: 30,
        url: "https://www.rockcreekgolf.com",
        highlight:
          "Earl Stone design across Fairhope's rolling pines — a scenic Eastern Shore fourth round",
        googleRating: 4.5,
        reviewCount: 260,
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [350, 1200],
        amenities: [
          "near downtown",
          "porch",
          "outdoor grill",
          "game room",
          "yard",
        ],
        areaDescription:
          "Downtown Mobile or midtown — historic homes near the bars and restaurants",
        searchUrl:
          "https://www.vrbo.com/search?destination=Mobile%2C+AL&groupSize=16",
        notes:
          "Mobile rentals are good value; downtown puts you walking distance to Dauphin Street. Mardi Gras (Feb) is the exception — book a year out.",
        avgRating: 4.5,
        bedsBreakdown: "4 kings + 4 queens = 16 guys at 2/bed",
      },
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [500, 2000],
        amenities: [
          "private pool",
          "bay views",
          "dock",
          "outdoor kitchen",
          "fire pit",
        ],
        areaDescription:
          "Fairhope / Eastern Shore — bigger bay-side homes 30 min across the bay",
        searchUrl:
          "https://www.vrbo.com/search?destination=Fairhope%2C+AL&groupSize=20",
        notes:
          "Fairhope/Eastern Shore homes are scenic and roomy, near Rock Creek and an easy run to the Gulf beaches.",
        avgRating: 4.6,
      },
    ],
    dining: [
      {
        name: "Wintzell's Oyster House",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Mobile institution since 1938 — oysters 'fried, stewed, or nude' and a wall of one-liners",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "The Noble South",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Downtown farm-to-table for the nicer group dinner — Gulf-driven menu",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Felix's Fish Camp",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "On-the-causeway seafood with bay views — big-group seafood feast",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Dreamland BBQ",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Alabama ribs and white sauce — the easy, rowdy crew lunch",
        reservationNeeded: false,
        googleRating: 4.4,
      },
    ],
    bars: [
      {
        name: "Dauphin Street (downtown Mobile)",
        vibe: "honky-tonk",
        highlight:
          "Mobile's nightlife strip — live music, dive bars, and the LoDa party scene all walkable",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Callaghan's Irish Social Club",
        vibe: "dive",
        highlight:
          "Beloved Oakleigh neighborhood pub with a famous burger — local institution",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "The Haberdasher",
        vibe: "cocktail",
        highlight:
          "Downtown craft-cocktail bar for a sharper start to the night",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Garage / LoDa bars",
        vibe: "sports-bar",
        highlight:
          "Easygoing downtown sports-and-music bars in the Lower Dauphin district",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Deep-Sea / Offshore Fishing Charter",
        type: "fishing",
        duration: "full day",
        pricePerPerson: [150, 350],
        groupFriendly: true,
        highlight:
          "Run out of the bay for red snapper and offshore species — the marquee rest-day trip",
        bestFor: "rest day",
        provider: "Mobile Bay / Gulf charter fleet",
      },
      {
        name: "USS Alabama Battleship Tour",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [15, 30],
        groupFriendly: true,
        highlight:
          "Walk the decks of a WWII battleship in the harbor — a great arrival-day stop",
        bestFor: "arrival day",
        provider: "USS Alabama Battleship Memorial Park",
      },
      {
        name: "Dauphin Island Boat & Beach Day",
        type: "boat-rental",
        duration: "full day",
        pricePerPerson: [75, 200],
        groupFriendly: true,
        highlight:
          "Boat out to Dauphin Island sandbars — the laid-back Gulf rest day",
        bestFor: "rest day",
        provider: "Mobile Bay boat rentals",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 30],
        hourlyRate: [130, 300],
        providers: [
          "Mobile Party Bus",
          "Gulf Coast Limousine",
          "Azalea City Limo",
        ],
        notes:
          "Decent supply — golf shuttles plus Dauphin Street bar runs. Mardi Gras is the busy window; book far ahead for February.",
        fullDayRate: [1000, 2200],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 145],
        providers: ["Take a Chef", "Cozymeal", "Gulf Coast Private Chefs"],
        mealTypes: [
          "Gulf seafood boil",
          "fresh catch dinner",
          "Southern steak",
          "breakfast spread",
        ],
        notes:
          "A Gulf seafood boil with the day's catch is the signature Mobile chef night. Book 1–2 weeks ahead.",
      },
    ],
  },

  // ─── Florence / The Shoals, AL (RTJ The Shoals) ────────────────────
  {
    id: "florence-shoals-al",
    city: "Florence",
    state: "AL",
    region: "Southeast",
    tagline: "8,000-yard RTJ golf above the river in Muscle Shoals music country",
    description:
      "The Shoals' Fighting Joe was the first RTJ Trail course to break 8,000 yards, perched high above Wilson Lake on the Tennessee River. Pair championship golf with the music-history pull of Muscle Shoals — FAME Studios and the Swampers — for a trip with a soundtrack.",
    population: "small",
    nearestAirport: {
      code: "BHM",
      name: "Birmingham-Shuttlesworth International Airport",
      driveMinutes: 120,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Publix and Kroger in Florence/Muscle Shoals; AL ABC stores for spirits.",
    courses: [
      {
        name: "RTJ Golf Trail at The Shoals (Fighting Joe Course)",
        tier: "bucket-list",
        greenFeeRange: [55, 95],
        holes: 18,
        par: 72,
        yardage: 8092,
        slope: 146,
        rating: 78.6,
        walkable: false,
        style: "parkland",
        driveMinutes: 12,
        url: "https://www.rtjgolf.com/theshoals/",
        highlight:
          "The first Trail course past 8,000 yards — expansive fairways and bentgrass greens high above Wilson Lake",
        googleRating: 4.7,
        reviewCount: 380,
        hypeTag: "BUCKET LIST",
        rankNote: "78.6 / 146 from the tips",
      },
      {
        name: "RTJ Golf Trail at The Shoals (Schoolmaster Course)",
        tier: "premium",
        greenFeeRange: [55, 95],
        holes: 18,
        par: 72,
        yardage: 7921,
        slope: 148,
        rating: 77.6,
        walkable: false,
        style: "parkland",
        driveMinutes: 12,
        url: "https://www.rtjgolf.com/theshoals/",
        highlight:
          "Shorter but narrower and meaner than Fighting Joe — demanding approaches ratchet up the challenge",
        googleRating: 4.6,
        reviewCount: 300,
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "Turtle Point Yacht & Country Club",
        tier: "solid",
        greenFeeRange: [45, 85],
        holes: 18,
        par: 72,
        yardage: 6905,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.turtlepointcc.com",
        highlight:
          "Lakeside George Cobb design in Killen — a scenic non-Trail change of pace",
        googleRating: 4.4,
        reviewCount: 120,
      },
      {
        name: "Cypress Lakes Golf Course",
        tier: "budget",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 72,
        yardage: 6700,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.cypresslakesgolfcourse.com",
        highlight:
          "Easygoing daily-fee track for the budget round of the trip",
        googleRating: 4.2,
        reviewCount: 140,
        hypeTag: "BEST VALUE",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [300, 1100],
        amenities: [
          "near river",
          "porch",
          "outdoor grill",
          "game room",
          "yard",
        ],
        areaDescription:
          "Downtown Florence near the University of North Alabama and the riverfront",
        searchUrl:
          "https://www.vrbo.com/search?destination=Florence%2C+AL&groupSize=16",
        notes:
          "Florence rentals are a real value. Downtown puts you walking distance to the bars and the music-history sights.",
        avgRating: 4.5,
        bedsBreakdown: "4 kings + 4 queens = 16 guys at 2/bed",
      },
      {
        type: "resort-house",
        sleeps: [12, 16],
        nightlyRange: [160, 350],
        amenities: [
          "on-site golf",
          "spa",
          "river views",
          "restaurant",
          "pool",
        ],
        areaDescription:
          "The Marriott Shoals Hotel & Spa — on the river by the RTJ Trail courses",
        searchUrl:
          "https://www.marriott.com/search/findHotels.mi?t=marriott+shoals",
        notes:
          "The Marriott Shoals (with its riverside 360 restaurant tower) is the obvious base. Bundle RTJ Trail rounds and book room blocks.",
        avgRating: 4.5,
        bedsBreakdown: "8 rooms with 2 queens each = 16 guys at 2/bed",
      },
    ],
    dining: [
      {
        name: "360 Grille (Renaissance Tower)",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Revolving rooftop restaurant atop the riverside tower — the marquee group dinner with a view",
        reservationNeeded: true,
        googleRating: 4.4,
      },
      {
        name: "Odette",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Acclaimed downtown Florence farm-to-table — the foodie night of the trip",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Big Bad Breakfast",
        style: "southern",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "John Currence's big Southern breakfast — fuel before an early tee time",
        reservationNeeded: false,
        googleRating: 4.5,
      },
      {
        name: "Ricatoni's Italian Grill",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Downtown Italian staple that handles big groups easily",
        reservationNeeded: false,
        googleRating: 4.4,
      },
    ],
    bars: [
      {
        name: "Downtown Florence strip (Court Street)",
        vibe: "patio",
        highlight:
          "Walkable cluster of downtown bars and patios near UNA — easy crawl",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Pegasus Records / Singin' River Brewing",
        vibe: "brewpub",
        highlight:
          "Local brewery taproom in Florence — house pints and music-town atmosphere",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Wildwood Tavern",
        vibe: "dive",
        highlight:
          "No-frills downtown tavern with live music and stiff pours",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Swampers Bar & Grille (Marriott Shoals)",
        vibe: "sports-bar",
        highlight:
          "Music-themed bar at the resort with live acts — named for the Muscle Shoals Rhythm Section",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "FAME Studios & Muscle Shoals Sound Tour",
        type: "distillery",
        duration: "2-3 hours",
        pricePerPerson: [20, 50],
        groupFriendly: true,
        highlight:
          "Tour the legendary studios where Aretha, the Stones, and Skynyrd recorded — pure Muscle Shoals lore",
        bestFor: "rest day",
        provider: "FAME Recording Studios / Muscle Shoals Sound Studio",
      },
      {
        name: "Wilson Lake / Tennessee River Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [90, 200],
        groupFriendly: true,
        highlight:
          "Trophy bass on Wilson Lake — one of the best smallmouth fisheries in the South",
        bestFor: "rest day",
        provider: "Shoals-area guides",
      },
      {
        name: "Tennessee River Boat Day",
        type: "boat-rental",
        duration: "full day",
        pricePerPerson: [70, 200],
        groupFriendly: true,
        highlight:
          "Pontoon day on the river below Wilson Dam — the laid-back rest day",
        bestFor: "rest day",
        provider: "Shoals-area boat rentals",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [12, 26],
        hourlyRate: [110, 260],
        providers: [
          "Shoals Limousine",
          "Florence Black Car Service",
          "North Alabama Charters",
        ],
        notes:
          "Small market — book shuttles/limos for golf and the downtown bar runs a few weeks ahead.",
        fullDayRate: [900, 1900],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 135],
        providers: ["Take a Chef", "Cozymeal", "North Alabama private chefs"],
        mealTypes: [
          "Southern steak dinner",
          "Alabama BBQ cookout",
          "fish fry",
          "breakfast spread",
        ],
        notes:
          "A Southern steak or fish-fry chef night at the river house fits the Shoals vibe. Book 1–2 weeks ahead.",
      },
    ],
  },

  // ─── Greensboro, NC ────────────────────────────────────────────────
  {
    id: "greensboro-nc",
    city: "Greensboro",
    state: "NC",
    region: "Southeast",
    tagline: "Wyndham Championship golf country with public 36-hole value",
    description:
      "The Triad's golf hub, home to the PGA Tour's Wyndham Championship at Donald Ross's Sedgefield. The public play is the draw for a group: Bryan Park's two championship 18s and Grandover's resort courses give you 36-plus holes a day at fair prices, with downtown Greensboro nightlife close by.",
    population: "medium",
    nearestAirport: {
      code: "GSO",
      name: "Piedmont Triad International Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Harris Teeter, Publix, and Total Wine across town. Easy stock-up.",
    courses: [
      {
        name: "Bryan Park (Champions Course)",
        tier: "premium",
        greenFeeRange: [51, 70],
        holes: 18,
        par: 72,
        yardage: 7135,
        slope: 140,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://bryanpark.com/",
        highlight:
          "Rees Jones design on Lake Townsend — routinely ranked among the best public courses in North Carolina",
        googleRating: 4.6,
        reviewCount: 720,
        hypeTag: "TOP 100 PUBLIC",
      },
      {
        name: "Bryan Park (Players Course)",
        tier: "premium",
        greenFeeRange: [45, 63],
        holes: 18,
        par: 72,
        yardage: 7076,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://bryanpark.com/",
        highlight:
          "George Cobb original, renovated by Rees Jones — the second great 18 at the same facility",
        googleRating: 4.5,
        reviewCount: 480,
        hypeTag: "BEST VALUE",
      },
      {
        name: "Grandover Resort (East Course)",
        tier: "premium",
        greenFeeRange: [70, 130],
        holes: 18,
        par: 72,
        yardage: 7100,
        walkable: false,
        style: "resort",
        driveMinutes: 12,
        url: "https://www.grandover.com",
        highlight:
          "Polished resort golf with rolling fairways — bundle a stay-and-play for the group",
        googleRating: 4.5,
        reviewCount: 360,
      },
      {
        name: "Grandover Resort (West Course)",
        tier: "solid",
        greenFeeRange: [70, 130],
        holes: 18,
        par: 72,
        yardage: 6800,
        walkable: false,
        style: "resort",
        driveMinutes: 12,
        url: "https://www.grandover.com",
        highlight:
          "The shorter, tighter Grandover 18 — a fun, scoreable second resort round",
        googleRating: 4.4,
        reviewCount: 240,
      },
      {
        name: "Tanglewood Park (Championship Course)",
        tier: "premium",
        greenFeeRange: [45, 80],
        holes: 18,
        par: 72,
        yardage: 7101,
        slope: 140,
        walkable: false,
        style: "parkland",
        driveMinutes: 30,
        url: "https://www.tanglewoodpark.org",
        highlight:
          "A Robert Trent Jones Sr. design and former PGA Championship host in nearby Clemmons",
        googleRating: 4.5,
        reviewCount: 420,
        hypeTag: "TOURNAMENT HOST",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [350, 1100],
        amenities: [
          "near downtown",
          "porch",
          "outdoor grill",
          "game room",
          "yard",
        ],
        areaDescription:
          "Downtown Greensboro and Fisher Park — homes near the bars and restaurants",
        searchUrl:
          "https://www.vrbo.com/search?destination=Greensboro%2C+NC&groupSize=16",
        notes:
          "Greensboro rentals are solid value; downtown keeps the bar scene walkable. Book ahead for Wyndham week (August).",
        avgRating: 4.5,
        bedsBreakdown: "4 kings + 4 queens = 16 guys at 2/bed",
      },
      {
        type: "resort-house",
        sleeps: [12, 16],
        nightlyRange: [180, 400],
        amenities: [
          "on-site golf",
          "spa",
          "multiple restaurants",
          "pool",
          "fitness center",
        ],
        areaDescription:
          "Grandover Resort — stay on the courses with full resort amenities",
        searchUrl: "https://www.grandover.com",
        notes:
          "Grandover stay-and-play is the cleanest group base — two courses, spa, and dining on-site. Book room blocks.",
        avgRating: 4.5,
        bedsBreakdown: "8 rooms with 2 queens each = 16 guys at 2/bed",
      },
    ],
    dining: [
      {
        name: "Undercurrent Restaurant",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Downtown Greensboro's standout — the nicer group dinner of the trip",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Stamey's Barbecue",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Lexington-style NC pork since 1930 — the classic group lunch",
        reservationNeeded: false,
        googleRating: 4.5,
      },
      {
        name: "1618 Seafood Grille",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Polished seafood and a deep wine list for the dressed-up dinner",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Crafted / Greensboro casual",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Easy downtown comfort food for the low-key night with the crew",
        reservationNeeded: false,
        googleRating: 4.4,
      },
    ],
    bars: [
      {
        name: "Elm Street (downtown Greensboro)",
        vibe: "patio",
        highlight:
          "Greensboro's nightlife spine — bars, patios, and music venues all walkable",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Joymongers Brewing",
        vibe: "brewpub",
        highlight:
          "Popular downtown brewery taproom — house pints and a big patio",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "M'Coul's Public House",
        vibe: "dive",
        highlight:
          "Beloved downtown Irish pub for late pints and a relaxed crew night",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Worx / rooftop bars",
        vibe: "rooftop",
        highlight:
          "Downtown rooftop scene for the sunset kickoff",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Lake Townsend / Belews Lake Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [80, 180],
        groupFriendly: true,
        highlight:
          "Bass fishing on the lake that frames Bryan Park, or run to Belews Lake",
        bestFor: "rest day",
        provider: "Triad-area guides",
      },
      {
        name: "Greensboro Brewery Crawl",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [30, 70],
        groupFriendly: true,
        highlight:
          "Van the city's craft breweries — Joymongers, Pig Pounder, Gibb's Hundred and more",
        bestFor: "rest day",
        provider: "Triad brewery tour operators",
      },
      {
        name: "Wet'n Wild Emerald Pointe / Topgolf-style range",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "Area entertainment complexes for the competitive arrival-day warm-up",
        bestFor: "arrival day",
        provider: "Greensboro entertainment venues",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 30],
        hourlyRate: [140, 320],
        providers: [
          "Greensboro Party Bus",
          "Triad Limousine",
          "Carolina Party Bus",
        ],
        notes:
          "Good Triad supply — golf shuttles plus downtown/brewery crawls. Book ahead for Wyndham week and ACC tournament weekends.",
        fullDayRate: [1100, 2400],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 140],
        providers: ["Take a Chef", "Cozymeal", "Triad Private Chefs"],
        mealTypes: [
          "NC BBQ cookout",
          "Southern steak dinner",
          "low-country boil",
          "breakfast spread",
        ],
        notes:
          "A North Carolina BBQ or steak chef night at the house is the easy call. Book 1–2 weeks ahead.",
      },
    ],
  },

  // ─── Wilmington, NC ────────────────────────────────────────────────
  {
    id: "wilmington-nc",
    city: "Wilmington",
    state: "NC",
    region: "Southeast",
    tagline: "Cape Fear coast golf and a riverwalk full of bars",
    description:
      "Coastal North Carolina golf with a real downtown to go with it. Public and semi-private courses wind through long-needle pines and Cape Fear estuaries, the historic riverfront downtown is packed with bars and restaurants, and Wrightsville Beach is ten minutes away.",
    population: "medium",
    nearestAirport: {
      code: "ILM",
      name: "Wilmington International Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Harris Teeter, Publix, and ABC stores around town and the beaches.",
    courses: [
      {
        name: "Cape Fear National",
        tier: "premium",
        greenFeeRange: [80, 160],
        holes: 18,
        par: 72,
        yardage: 7217,
        slope: 142,
        walkable: false,
        style: "coastal",
        driveMinutes: 20,
        url: "https://www.capefearnational.com",
        highlight:
          "Tim Cate design at Brunswick Forest with sculpted bunkering and water — the area's top public round",
        googleRating: 4.6,
        reviewCount: 480,
        hypeTag: "LOCALS' FAVORITE",
      },
      {
        name: "Beau Rivage Golf & Resort",
        tier: "premium",
        greenFeeRange: [55, 110],
        holes: 18,
        par: 72,
        yardage: 6565,
        walkable: false,
        style: "coastal",
        driveMinutes: 20,
        url: "https://www.beaurivagegolf.com/",
        highlight:
          "Wilmington's premier public facility — wooded hills, rolling dunes, and Cape Fear water in play",
        googleRating: 4.4,
        reviewCount: 520,
      },
      {
        name: "Magnolia Greens Golf Plantation",
        tier: "solid",
        greenFeeRange: [45, 95],
        holes: 27,
        par: 72,
        yardage: 7022,
        walkable: false,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.magnoliagreensgolf.com",
        highlight:
          "27 holes of championship golf in Leland — good value and host of qualifying events",
        googleRating: 4.4,
        reviewCount: 380,
      },
      {
        name: "Wilmington Municipal Golf Course",
        tier: "budget",
        greenFeeRange: [25, 50],
        holes: 18,
        par: 71,
        yardage: 6442,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.wilmingtonmunigolf.com",
        highlight:
          "A 1926 Donald Ross design in the heart of town — a walkable, century-old budget classic",
        googleRating: 4.4,
        reviewCount: 460,
        hypeTag: "BEST VALUE",
      },
      {
        name: "Compass Pointe Golf Club",
        tier: "premium",
        greenFeeRange: [60, 120],
        holes: 18,
        par: 72,
        yardage: 7234,
        walkable: false,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.compasspointegolf.com",
        highlight:
          "Rick Robbins design in Leland with wide corridors and big greens — a fun fourth round",
        googleRating: 4.5,
        reviewCount: 290,
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [400, 1500],
        amenities: [
          "near downtown",
          "porch",
          "outdoor grill",
          "game room",
          "near water",
        ],
        areaDescription:
          "Historic downtown Wilmington along the Cape Fear riverfront — walk to the bars",
        searchUrl:
          "https://www.vrbo.com/search?destination=Wilmington%2C+NC&groupSize=16",
        notes:
          "Downtown homes put you on the Riverwalk bar scene; Wrightsville Beach rentals trade nightlife for sand. Book early for summer.",
        avgRating: 4.6,
        bedsBreakdown: "4 kings + 4 queens = 16 guys at 2/bed",
      },
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [600, 2500],
        amenities: [
          "private pool",
          "beach access",
          "outdoor kitchen",
          "screened porch",
          "game room",
        ],
        areaDescription:
          "Wrightsville Beach / Carolina Beach — oceanfront homes 10–25 min from downtown",
        searchUrl:
          "https://www.vrbo.com/search?destination=Wrightsville+Beach%2C+NC&groupSize=20",
        notes:
          "Beach homes give the crew oceanfront mornings; Uber into downtown for the big nights. Premium in peak summer.",
        avgRating: 4.7,
      },
    ],
    dining: [
      {
        name: "PinPoint Restaurant",
        style: "seafood",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Downtown coastal-Carolina cooking from a James Beard semifinalist — the foodie dinner",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Rx Restaurant & Bar",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Hyper-local farm-to-table in a former pharmacy — Wilmington's chef-driven standout",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "The George on the Riverwalk",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Riverfront seafood with a big deck — easy group dinner on the water",
        reservationNeeded: true,
        googleRating: 4.4,
      },
      {
        name: "Cape Fear Seafood Co. / casual",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Reliable, big-group seafood spot — no fuss, plenty of fried baskets",
        reservationNeeded: false,
        googleRating: 4.5,
      },
    ],
    bars: [
      {
        name: "Front Street (downtown Riverwalk)",
        vibe: "patio",
        highlight:
          "Wilmington's bar spine along the Cape Fear — pubs, rooftops, and patios all walkable",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Blind Elephant",
        vibe: "cocktail",
        highlight:
          "Hidden downtown speakeasy with serious cocktails — a sharp first stop",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Front Street Brewery",
        vibe: "brewpub",
        highlight:
          "Downtown brewpub institution — house pints and a packed weekend crowd",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Palm Room (Wrightsville Beach)",
        vibe: "tiki",
        highlight:
          "Classic beach bar 10 min away for the big night by the sand",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Offshore / Gulf Stream Fishing Charter",
        type: "fishing",
        duration: "full day",
        pricePerPerson: [150, 350],
        groupFriendly: true,
        highlight:
          "Run out of Wrightsville for mahi, wahoo, and king mackerel — the marquee rest-day trip",
        bestFor: "rest day",
        provider: "Wrightsville / Cape Fear charter fleet",
      },
      {
        name: "Wrightsville Beach Boat & Sandbar Day",
        type: "boat-rental",
        duration: "full day",
        pricePerPerson: [75, 200],
        groupFriendly: true,
        highlight:
          "Pontoon to Masonboro Island sandbars — the laid-back coastal rest day",
        bestFor: "rest day",
        provider: "Wrightsville boat rentals",
      },
      {
        name: "Cape Fear Riverboat Brewery / Distillery Tour",
        type: "distillery",
        duration: "2-3 hours",
        pricePerPerson: [25, 60],
        groupFriendly: true,
        highlight:
          "Tour local breweries and the End of Days distillery downtown",
        bestFor: "arrival day",
        provider: "Wilmington brewery/distillery tours",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 30],
        hourlyRate: [140, 320],
        providers: [
          "Wilmington Party Bus",
          "Port City Limousine",
          "Cape Fear Transportation",
        ],
        notes:
          "Decent coastal supply — golf shuttles plus Riverwalk and beach bar runs. Book ahead for summer weekends.",
        fullDayRate: [1100, 2400],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 150],
        providers: ["Take a Chef", "Cozymeal", "Cape Fear Private Chefs"],
        mealTypes: [
          "fresh-catch seafood boil",
          "low-country boil",
          "steak dinner",
          "breakfast spread",
        ],
        notes:
          "A Cape Fear seafood boil at the beach house is the signature move. Book 1–2 weeks ahead.",
      },
    ],
  },

  // ─── Columbus, GA ──────────────────────────────────────────────────
  {
    id: "columbus-ga",
    city: "Columbus",
    state: "GA",
    region: "Southeast",
    tagline: "36 holes of public golf and the world's longest urban whitewater",
    description:
      "An underrated value play on the Georgia-Alabama line: Bull Creek's 36 holes of top public golf, an army-town energy from Fort Moore, and the longest urban whitewater course in the world running right through downtown on the Chattahoochee.",
    population: "medium",
    nearestAirport: {
      code: "ATL",
      name: "Hartsfield-Jackson Atlanta International Airport",
      driveMinutes: 100,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Publix and Kroger in town; GA package stores for liquor. Easy stock-up.",
    courses: [
      {
        name: "Bull Creek Golf Course (East Course)",
        tier: "premium",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 72,
        yardage: 6705,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://columbusga.gov/golf/courses/bull-creek",
        highlight:
          "Joe Lee/Ward Northrup design — one of the finest public 18s in Georgia at a giveaway price",
        googleRating: 4.4,
        reviewCount: 520,
        hypeTag: "BEST VALUE",
      },
      {
        name: "Bull Creek Golf Course (West Course)",
        tier: "premium",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 72,
        yardage: 6921,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://columbusga.gov/golf/courses/bull-creek",
        highlight:
          "The longer, tougher of Bull Creek's two 36-hole tracks — same great value",
        googleRating: 4.4,
        reviewCount: 410,
      },
      {
        name: "Maple Ridge Golf Club",
        tier: "solid",
        greenFeeRange: [45, 75],
        holes: 18,
        par: 72,
        yardage: 6617,
        slope: 133,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.mapleridgegolfclub.com",
        highlight:
          "Tree-lined daily-fee with rolling terrain — a solid second course in town",
        googleRating: 4.3,
        reviewCount: 320,
      },
      {
        name: "Grand Oaks Golf Club",
        tier: "solid",
        greenFeeRange: [35, 65],
        holes: 18,
        par: 72,
        yardage: 6800,
        walkable: false,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.grandoaksgc.com",
        highlight:
          "Easygoing area daily-fee — a fair, affordable fourth round",
        googleRating: 4.2,
        reviewCount: 180,
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [300, 1000],
        amenities: [
          "near downtown",
          "porch",
          "outdoor grill",
          "game room",
          "yard",
        ],
        areaDescription:
          "Historic downtown Columbus near the Riverwalk and Broadway bars",
        searchUrl:
          "https://www.vrbo.com/search?destination=Columbus%2C+GA&groupSize=16",
        notes:
          "Columbus rentals are a genuine value. Downtown puts you on the Riverwalk and walking distance to Broadway nightlife.",
        avgRating: 4.5,
        bedsBreakdown: "4 kings + 4 queens = 16 guys at 2/bed",
      },
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [500, 1800],
        amenities: [
          "private pool",
          "acreage",
          "multiple living areas",
          "grill",
          "fire pit",
        ],
        areaDescription:
          "Larger homes in north Columbus / Harris County — room for a big crew near the courses",
        searchUrl:
          "https://www.vrbo.com/search?destination=Columbus%2C+GA&groupSize=20",
        notes:
          "Bigger estate-style rentals north of town are great value for a 16+ group and close to Bull Creek.",
        avgRating: 4.5,
      },
    ],
    dining: [
      {
        name: "Epic Restaurant",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Columbus's upscale steakhouse on Broadway — the marquee group dinner",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "The Black Cow",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Downtown chophouse-style spot with a strong bar — easy crew dinner",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Country's Barbecue",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Columbus BBQ institution in an old bus station — the rowdy group lunch",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "Houlihan's / casual Broadway",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Easy downtown comfort food for the low-key night",
        reservationNeeded: false,
        googleRating: 4.3,
      },
    ],
    bars: [
      {
        name: "Broadway (downtown Columbus)",
        vibe: "patio",
        highlight:
          "Columbus's historic nightlife strip — bars and patios clustered on Broadway",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Loft",
        vibe: "sports-bar",
        highlight:
          "Longtime downtown live-music and sports bar — a reliable crew anchor",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Nonic Beer Bar & Bottle Shoppe",
        vibe: "brewpub",
        highlight:
          "Craft-beer-focused downtown bar with a deep tap list",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Bare Bulb / Mabella rooftop scene",
        vibe: "rooftop",
        highlight:
          "Downtown rooftop and lounge options for the sunset kickoff",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Chattahoochee Whitewater Rafting",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [40, 100],
        groupFriendly: true,
        highlight:
          "The world's longest urban whitewater course runs right through downtown — a can't-miss rest day",
        bestFor: "rest day",
        provider: "Whitewater Express",
      },
      {
        name: "Blue Heron Adventure Zipline",
        type: "zipline",
        duration: "2-3 hours",
        pricePerPerson: [50, 90],
        groupFriendly: true,
        highlight:
          "Zip across the Chattahoochee from Georgia to Alabama over the rapids",
        bestFor: "rest day",
        provider: "Whitewater Express / Blue Heron",
      },
      {
        name: "National Infantry Museum Tour",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 25],
        groupFriendly: true,
        highlight:
          "World-class military museum at Fort Moore's gate — an easy, powerful arrival-day stop",
        bestFor: "arrival day",
        provider: "National Infantry Museum",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [12, 28],
        hourlyRate: [130, 300],
        providers: [
          "Columbus Party Bus",
          "Chattahoochee Limousine",
          "River City Transportation",
        ],
        notes:
          "Decent supply for an army town — golf shuttles plus Broadway bar runs. Book ahead for graduation/Ranger weekends at Fort Moore.",
        fullDayRate: [1000, 2200],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 135],
        providers: ["Take a Chef", "Cozymeal", "Columbus-area private chefs"],
        mealTypes: [
          "Georgia BBQ cookout",
          "Southern steak dinner",
          "low-country boil",
          "breakfast spread",
        ],
        notes:
          "A Georgia BBQ or steak chef night at the house is the easy call. Book 1–2 weeks ahead.",
      },
    ],
  },

  // ─── Augusta, GA ───────────────────────────────────────────────────
  {
    id: "augusta-ga",
    city: "Augusta",
    state: "GA",
    region: "Southeast",
    tagline: "Play in the shadow of the Masters on real public Augusta golf",
    description:
      "You can't play Augusta National — but you can play a Donald Ross course minutes from its gates, breathe the Masters mystique, and post up on Riverwalk Augusta for the nightlife. Forest Hills and Jones Creek give a group genuine championship golf at public prices.",
    population: "medium",
    nearestAirport: {
      code: "AGS",
      name: "Augusta Regional Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Kroger, Publix, and package stores around town. Masters week (early April) is a different planet — book everything a year out.",
    courses: [
      {
        name: "The Forest Hills Golf Course",
        tier: "premium",
        greenFeeRange: [45, 90],
        holes: 18,
        par: 72,
        yardage: 7140,
        slope: 138,
        walkable: false,
        style: "parkland",
        driveMinutes: 10,
        url: "https://theforesthillsgolfcourse.com/",
        highlight:
          "1926 Donald Ross design (Palmer-renovated) minutes from Augusta National — voted Augusta's best public course",
        googleRating: 4.6,
        reviewCount: 420,
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "Jones Creek Golf Club",
        tier: "premium",
        greenFeeRange: [50, 95],
        holes: 18,
        par: 72,
        yardage: 7008,
        slope: 140,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.jonescreekgolf.com",
        highlight:
          "Rees Jones design just six miles from Augusta National — long the area's top daily-fee track",
        googleRating: 4.4,
        reviewCount: 360,
      },
      {
        name: "Augusta Municipal (The Patch)",
        tier: "budget",
        greenFeeRange: [25, 50],
        holes: 18,
        par: 71,
        yardage: 6470,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.augustaga.gov",
        highlight:
          "The legendary 'Patch' — a walkable, dirt-cheap muni a stone's throw from the National",
        googleRating: 4.3,
        reviewCount: 480,
        hypeTag: "BEST VALUE",
      },
      {
        name: "Champions Retreat Golf Club",
        tier: "bucket-list",
        greenFeeRange: [150, 350],
        holes: 27,
        par: 72,
        yardage: 7468,
        walkable: false,
        style: "parkland",
        driveMinutes: 30,
        url: "https://www.championsretreat.net",
        highlight:
          "Three nines by Palmer, Nicklaus, and Player; host of the Augusta National Women's Amateur first round (limited access)",
        googleRating: 4.7,
        reviewCount: 140,
        hypeTag: "BUCKET LIST",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [350, 1500],
        amenities: [
          "near downtown",
          "porch",
          "outdoor grill",
          "game room",
          "yard",
        ],
        areaDescription:
          "Downtown Augusta along the Savannah River / Summerville — homes near Broad Street nightlife",
        searchUrl:
          "https://www.vrbo.com/search?destination=Augusta%2C+GA&groupSize=16",
        notes:
          "Augusta rentals are reasonable except Masters week, when even modest homes rent for thousands a night — book that window a year ahead.",
        avgRating: 4.5,
        bedsBreakdown: "4 kings + 4 queens = 16 guys at 2/bed",
      },
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [600, 3000],
        amenities: [
          "private pool",
          "acreage",
          "multiple living areas",
          "grill",
          "fire pit",
        ],
        areaDescription:
          "Larger estate homes in west Augusta / Columbia County near the courses",
        searchUrl:
          "https://www.vrbo.com/search?destination=Augusta%2C+GA&groupSize=20",
        notes:
          "West-side estate rentals fit a big crew and sit near Forest Hills and Champions Retreat. Masters week pricing is its own beast.",
        avgRating: 4.5,
      },
    ],
    dining: [
      {
        name: "Frog Hollow Tavern",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Augusta's chef-driven standout on Broad Street — the nicer group dinner",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Abel Brown Southern Kitchen",
        style: "southern",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Oysters and elevated Southern plates — easy, lively crew dinner",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Whiskey Bar Kitchen",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Downtown gastropub with a huge whiskey list and global plates",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "Sconyers Bar-B-Que",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Augusta BBQ institution since 1956 — the classic group lunch",
        reservationNeeded: false,
        googleRating: 4.5,
      },
    ],
    bars: [
      {
        name: "Broad Street (downtown Augusta)",
        vibe: "patio",
        highlight:
          "Augusta's nightlife spine — bars, patios, and music venues all walkable on Broad",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Pinnacle Club / rooftop scene",
        vibe: "rooftop",
        highlight:
          "Downtown rooftop views over the Savannah River for the kickoff",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Soy Noodle House / Metro Coffeehouse & Pub",
        vibe: "dive",
        highlight:
          "Beloved late-night Broad Street dive with stiff pours",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Whiskey Bar Kitchen Bar",
        vibe: "whiskey-bar",
        highlight:
          "Deep brown-spirits list downtown — the proper start to the night",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Savannah River Fishing Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [90, 220],
        groupFriendly: true,
        highlight:
          "Striped bass and catfish on the Savannah River and Clarks Hill Lake",
        bestFor: "rest day",
        provider: "Augusta-area guides",
      },
      {
        name: "Clarks Hill / Thurmond Lake Boat Day",
        type: "boat-rental",
        duration: "full day",
        pricePerPerson: [75, 200],
        groupFriendly: true,
        highlight:
          "Pontoon day on one of the Southeast's biggest lakes 30 min away",
        bestFor: "rest day",
        provider: "Clarks Hill Lake rentals",
      },
      {
        name: "Riverwalk Brewery Crawl",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [25, 60],
        groupFriendly: true,
        highlight:
          "Savannah River Brewing and downtown taprooms along the Riverwalk",
        bestFor: "arrival day",
        provider: "Augusta brewery tours",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 30],
        hourlyRate: [140, 350],
        providers: [
          "Augusta Party Bus",
          "CSRA Limousine",
          "Garden City Transportation",
        ],
        notes:
          "Solid supply most of the year — golf shuttles plus Broad Street crawls. Masters week supply evaporates and prices triple; book a year out.",
        fullDayRate: [1100, 2600],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 150],
        providers: ["Take a Chef", "Cozymeal", "CSRA Private Chefs"],
        mealTypes: [
          "Southern steak dinner",
          "Georgia BBQ cookout",
          "low-country boil",
          "breakfast spread",
        ],
        notes:
          "A Southern steak-and-bourbon chef night fits Augusta perfectly. Book 1–2 weeks ahead, far earlier for Masters week.",
      },
    ],
  },

  // ─── Knoxville, TN ─────────────────────────────────────────────────
  {
    id: "knoxville-tn",
    city: "Knoxville",
    state: "TN",
    region: "Southeast",
    tagline: "Smoky Mountain views, lake golf, and a college-town Old City",
    description:
      "East Tennessee golf with the Great Smoky Mountains as a backdrop. Public courses with mountain and lake views, a revitalized downtown and Old City packed with bars, and the Smokies and Tennessee River lakes within easy reach for the rest day.",
    population: "medium",
    nearestAirport: {
      code: "TYS",
      name: "McGhee Tyson Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Kroger, Publix, and Food City around town; TN liquor stores for spirits.",
    courses: [
      {
        name: "Three Ridges Golf Course",
        tier: "premium",
        greenFeeRange: [25, 45],
        holes: 18,
        par: 72,
        yardage: 6745,
        walkable: false,
        style: "mountain",
        driveMinutes: 15,
        url: "https://www.knoxcounty.org/golf/three_ridges/",
        highlight:
          "Knox County's flagship muni with bentgrass greens and Smoky Mountain views — strong public value",
        googleRating: 4.3,
        reviewCount: 480,
        hypeTag: "BEST VALUE",
      },
      {
        name: "Egwani Farms Golf Course",
        tier: "premium",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 72,
        yardage: 6708,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.egwanifarms.com",
        highlight:
          "Scenic riverside course along the Little River in Rockford — a local favorite",
        googleRating: 4.5,
        reviewCount: 360,
        hypeTag: "LOCALS' FAVORITE",
      },
      {
        name: "Avalon Golf & Country Club",
        tier: "premium",
        greenFeeRange: [40, 75],
        holes: 18,
        par: 72,
        yardage: 7038,
        walkable: false,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.avalongolf.org",
        highlight:
          "Joe Lee design in Lenoir City with rolling fairways and mountain views — a polished semi-private round",
        googleRating: 4.5,
        reviewCount: 240,
      },
      {
        name: "Gettysvue Country Club",
        tier: "solid",
        greenFeeRange: [60, 110],
        holes: 18,
        par: 72,
        yardage: 6900,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.gettysvue.com",
        highlight:
          "Hilly West Knoxville club with views to the Smokies — book limited guest play for a private-club feel",
        googleRating: 4.5,
        reviewCount: 160,
      },
      {
        name: "Tennessee National Golf Club",
        tier: "bucket-list",
        greenFeeRange: [90, 160],
        holes: 18,
        par: 72,
        yardage: 7393,
        slope: 140,
        walkable: false,
        style: "parkland",
        driveMinutes: 40,
        url: "https://www.tennesseenational.com",
        highlight:
          "Greg Norman signature on a peninsula in the Tennessee River — five holes play to or from the water (limited access)",
        googleRating: 4.7,
        reviewCount: 180,
        hypeTag: "DESIGNER CLASSIC",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [350, 1300],
        amenities: [
          "near downtown",
          "porch",
          "outdoor grill",
          "game room",
          "mountain views",
        ],
        areaDescription:
          "Downtown Knoxville / Old City — homes walkable to the bars and Market Square",
        searchUrl:
          "https://www.vrbo.com/search?destination=Knoxville%2C+TN&groupSize=16",
        notes:
          "Downtown keeps the Old City bar scene walkable. Avoid (or book a year out for) Tennessee home football Saturdays.",
        avgRating: 4.6,
        bedsBreakdown: "4 kings + 4 queens = 16 guys at 2/bed",
      },
      {
        type: "lakehouse",
        sleeps: [12, 20],
        nightlyRange: [500, 2200],
        amenities: [
          "private dock",
          "lake views",
          "hot tub",
          "outdoor kitchen",
          "fire pit",
        ],
        areaDescription:
          "Tellico Lake / Fort Loudoun Lake — lake homes 30–40 min from town near Tennessee National",
        searchUrl:
          "https://www.vrbo.com/search?destination=Tellico+Lake%2C+TN&groupSize=20",
        notes:
          "Lake homes give the crew dock mornings and easy access to the river-peninsula courses. Drive into downtown for the big nights.",
        avgRating: 4.7,
      },
    ],
    dining: [
      {
        name: "The Chop House / Knoxville steakhouses",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Reliable big-group steak dinner downtown — easy with 16",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "J.C. Holdway",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "James Beard-winning chef's wood-fired Appalachian cooking — the foodie dinner",
        reservationNeeded: true,
        googleRating: 4.7,
      },
      {
        name: "Calhoun's on the River",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Riverside ribs with a deck on the Tennessee River — the rowdy group spot",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "Market Square restaurants",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Walkable cluster of restaurants on Market Square — something for everyone",
        reservationNeeded: false,
        googleRating: 4.5,
      },
    ],
    bars: [
      {
        name: "Old City (downtown Knoxville)",
        vibe: "patio",
        highlight:
          "Knoxville's nightlife district — bars, breweries, and music venues all walkable",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Preservation Pub (Market Square)",
        vibe: "dive",
        highlight:
          "Three-floor Market Square institution with live music nightly",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Pretentious Beer Co.",
        vibe: "brewpub",
        highlight:
          "Old City brewery that blows its own glassware — house pours and a patio",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Peter Kern Library",
        vibe: "cocktail",
        highlight:
          "Hidden speakeasy in the Oliver Hotel — sharp cocktails for the early night",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Great Smoky Mountains Hike",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [0, 30],
        groupFriendly: true,
        highlight:
          "The most-visited national park in the U.S. is an hour away — easy waterfall hikes to Clingmans Dome",
        bestFor: "rest day",
        provider: "Great Smoky Mountains National Park",
      },
      {
        name: "Pigeon River Whitewater Rafting",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [40, 90],
        groupFriendly: true,
        highlight:
          "Class III-IV whitewater near the Smokies — a high-energy rest day",
        bestFor: "rest day",
        provider: "Pigeon River outfitters",
      },
      {
        name: "Tennessee River / Fort Loudoun Lake Boat Day",
        type: "boat-rental",
        duration: "full day",
        pricePerPerson: [70, 200],
        groupFriendly: true,
        highlight:
          "Pontoon day on the river through downtown (the 'Vol Navy' route) — laid-back rest day",
        bestFor: "rest day",
        provider: "Knoxville-area boat rentals",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 30],
        hourlyRate: [140, 320],
        providers: [
          "Knoxville Party Bus",
          "Rocky Top Limousine",
          "East TN Transportation",
        ],
        notes:
          "Good college-town supply — golf shuttles plus Old City/Market Square crawls. Book a year out for Tennessee home football weekends.",
        fullDayRate: [1100, 2400],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 145],
        providers: ["Take a Chef", "Cozymeal", "East TN Private Chefs"],
        mealTypes: [
          "Appalachian steak dinner",
          "Tennessee BBQ cookout",
          "fish fry",
          "breakfast spread",
        ],
        notes:
          "A steak or BBQ chef night at the lake house is the call. Book 1–2 weeks ahead.",
      },
    ],
  },

  // ─── Memphis, TN ───────────────────────────────────────────────────
  {
    id: "memphis-tn",
    city: "Memphis",
    state: "TN",
    region: "Southeast",
    tagline: "Justin Timberlake's course, Delta golf, and Beale Street",
    description:
      "Memphis brings the party: Beale Street's blues-and-bar gauntlet, world-class BBQ, and a golf scene anchored by Justin Timberlake's acclaimed Mirimichi and the public Delta courses down in Tunica, Mississippi. A big-city buddies trip with serious nightlife.",
    population: "medium",
    nearestAirport: {
      code: "MEM",
      name: "Memphis International Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Kroger, Costco, and liquor stores around town. Tunica casinos handle food/drink down south.",
    courses: [
      {
        name: "Mirimichi Golf Course",
        tier: "bucket-list",
        greenFeeRange: [70, 130],
        holes: 18,
        par: 72,
        yardage: 7400,
        slope: 140,
        walkable: false,
        style: "parkland",
        driveMinutes: 30,
        url: "https://www.mirimichi.com",
        highlight:
          "Founded by Justin Timberlake — the only GEO-certified green course in the Americas, with four waterfalls and water on 15 holes",
        googleRating: 4.5,
        reviewCount: 520,
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "Tunica National Golf & Tennis (MS)",
        tier: "premium",
        greenFeeRange: [45, 90],
        holes: 18,
        par: 72,
        yardage: 7210,
        slope: 134,
        walkable: false,
        style: "parkland",
        driveMinutes: 40,
        url: "https://www.tunicanational.com",
        highlight:
          "Championship Delta golf with strategic water and native grasses — the casino-trip golf headliner in Tunica",
        googleRating: 4.4,
        reviewCount: 420,
      },
      {
        name: "The Links at Galloway",
        tier: "solid",
        greenFeeRange: [25, 50],
        holes: 18,
        par: 71,
        yardage: 6013,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.golfmemphis.org",
        highlight:
          "Kevin Tucker-designed in-town favorite near the University of Memphis — a walkable budget round",
        googleRating: 4.3,
        reviewCount: 380,
        hypeTag: "BEST VALUE",
      },
      {
        name: "Cherokee Valley Golf Club (Olive Branch, MS)",
        tier: "premium",
        greenFeeRange: [45, 85],
        holes: 18,
        par: 72,
        yardage: 7530,
        slope: 138,
        walkable: false,
        style: "parkland",
        driveMinutes: 30,
        url: "https://www.cherokeevalleygc.com",
        highlight:
          "Long, scenic daily-fee just over the Mississippi line in Olive Branch — a strong second round",
        googleRating: 4.4,
        reviewCount: 300,
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [400, 1500],
        amenities: [
          "near downtown",
          "porch",
          "outdoor grill",
          "game room",
          "near Beale",
        ],
        areaDescription:
          "Downtown Memphis / South Main — homes walkable to Beale Street and the riverfront",
        searchUrl:
          "https://www.vrbo.com/search?destination=Memphis%2C+TN&groupSize=16",
        notes:
          "Downtown/South Main puts you walking distance to Beale Street. Strong value relative to the nightlife on offer.",
        avgRating: 4.5,
        bedsBreakdown: "4 kings + 4 queens = 16 guys at 2/bed",
      },
      {
        type: "resort-house",
        sleeps: [12, 16],
        nightlyRange: [120, 300],
        amenities: [
          "casino",
          "multiple restaurants",
          "spa",
          "pool",
          "nightlife",
        ],
        areaDescription:
          "Tunica, MS casino resorts — 40 min south, pairing golf with casino floors",
        searchUrl:
          "https://www.tunicatravel.com",
        notes:
          "Book casino-resort room blocks in Tunica to pair Tunica National golf with gambling and nightlife. Cheap rooms, comped on play.",
        avgRating: 4.2,
        bedsBreakdown: "8 rooms with 2 queens each = 16 guys at 2/bed",
      },
    ],
    dining: [
      {
        name: "Charlie Vergos' Rendezvous",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Memphis's legendary dry-rubbed ribs in a downtown alley basement — a must-do group dinner",
        reservationNeeded: false,
        googleRating: 4.5,
      },
      {
        name: "Flight Restaurant & Wine Bar",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Downtown small-plate flights and a big wine list — the dressed-up dinner",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Central BBQ",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Local-favorite smoked brisket and nachos — the rowdy crew lunch",
        reservationNeeded: false,
        googleRating: 4.5,
      },
      {
        name: "Gus's World Famous Fried Chicken",
        style: "southern",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Spicy fried chicken institution — cheap, fast, and beloved",
        reservationNeeded: false,
        googleRating: 4.5,
      },
    ],
    bars: [
      {
        name: "Beale Street",
        vibe: "honky-tonk",
        highlight:
          "The blues-and-bar gauntlet — live music, open containers, and a club on every corner",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "B.B. King's Blues Club",
        vibe: "honky-tonk",
        highlight:
          "Live blues and barbecue on Beale — the marquee Memphis night",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Earnestine & Hazel's",
        vibe: "dive",
        highlight:
          "Famously haunted South Main dive with the legendary 'Soul Burger' and an upstairs jukebox",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Paula & Raiford's Disco",
        vibe: "cocktail",
        highlight:
          "Memphis's beloved disco club — late-night dance floor that has to be seen",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Tunica Casino Day",
        type: "casino",
        duration: "full day",
        pricePerPerson: [50, 500],
        groupFriendly: true,
        highlight:
          "Hit the Tunica casino floors 40 min south — pair it with a round at Tunica National",
        bestFor: "rest day",
        provider: "Tunica, MS casinos",
      },
      {
        name: "Graceland & Sun Studio Tour",
        type: "distillery",
        duration: "half day",
        pricePerPerson: [30, 90],
        groupFriendly: true,
        highlight:
          "Elvis's Graceland and the Sun Studio birthplace of rock 'n' roll — peak Memphis lore",
        bestFor: "rest day",
        provider: "Graceland / Sun Studio",
      },
      {
        name: "Mississippi River Riverboat / Brewery Crawl",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [25, 70],
        groupFriendly: true,
        highlight:
          "Wiseacre and Memphis Made taprooms, or a riverboat cruise on the Mississippi",
        bestFor: "arrival day",
        provider: "Memphis brewery / riverboat tours",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 36],
        hourlyRate: [150, 375],
        providers: [
          "Memphis Party Bus",
          "Bluff City Limousine",
          "901 Party Bus",
        ],
        notes:
          "Strong supply — Beale Street crawls, Tunica casino runs, and golf shuttles all standard. Book ahead for festival weekends (Memphis in May).",
        fullDayRate: [1300, 2800],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 145],
        providers: ["Take a Chef", "Cozymeal", "Memphis Private Chefs"],
        mealTypes: [
          "Memphis BBQ cookout",
          "Southern steak dinner",
          "Delta fish fry",
          "breakfast spread",
        ],
        notes:
          "A Memphis BBQ chef night at the downtown house is the obvious move. Book 1–2 weeks ahead.",
      },
    ],
  },
];
