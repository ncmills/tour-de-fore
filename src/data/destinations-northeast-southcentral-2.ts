import { Destination } from "./types";

export const northeastSouthCentral2Destinations: Destination[] = [
  // ─── White Sulphur Springs, WV (The Greenbrier) ───────────────────
  {
    id: "white-sulphur-springs-wv",
    city: "White Sulphur Springs",
    state: "WV",
    region: "Northeast",
    tagline: "America's grandest resort — golf, casino, and bourbon in the Alleghenies",
    description:
      "The Greenbrier is a self-contained playground: Old White TPC (a former PGA Tour host), an underground casino, a shooting club, 20 restaurants, and a 710-room National Historic Landmark. One property handles golf, gambling, and the whole crew under one roof.",
    population: "tiny",
    nearestAirport: {
      code: "LWB",
      name: "Greenbrier Valley Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "On-property dining covers most meals; a Kroger and Walmart in Lewisburg are ~15 min for snack/beverage runs",
    courses: [
      {
        name: "The Old White (TPC)",
        tier: "bucket-list",
        greenFeeRange: [550, 665],
        holes: 18,
        par: 70,
        yardage: 7292,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.greenbrier.com/golf/courses-at-the-greenbrier/the-old-white/",
        highlight:
          "C.B. Macdonald 1914 classic and former PGA Tour Greenbrier Classic host — West Virginia's best course",
        googleRating: 4.7,
        hypeTag: "TOURNAMENT HOST",
        rankNote: "No. 39 Public — Golf Digest 2025/26",
      },
      {
        name: "The Meadows",
        tier: "premium",
        greenFeeRange: [150, 280],
        holes: 18,
        par: 71,
        yardage: 6807,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.greenbrier.com/golf/",
        highlight:
          "Scenic resort course winding along Howard's Creek — the most relaxed of the Greenbrier rounds",
        googleRating: 4.4,
      },
      {
        name: "The Greenbrier (Course)",
        tier: "premium",
        greenFeeRange: [200, 350],
        holes: 18,
        par: 72,
        yardage: 7035,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.greenbrier.com/golf/",
        highlight:
          "Jack Nicklaus redesign that hosted the 1979 Ryder Cup and 1994 Solheim Cup",
        googleRating: 4.5,
        rankNote: "1979 Ryder Cup host",
      },
      {
        name: "Oakhurst Links",
        tier: "solid",
        greenFeeRange: [75, 100],
        holes: 9,
        par: 35,
        yardage: 2235,
        walkable: true,
        style: "links",
        driveMinutes: 10,
        highlight:
          "Play 1884 golf with hickory clubs and gutta-percha balls — America's oldest organized golf course, a bucket-list novelty round",
        hypeTag: "HIDDEN GEM",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [12, 20],
        nightlyRange: [600, 2000],
        amenities: [
          "on-site golf",
          "casino",
          "spa",
          "multiple restaurants",
          "shooting club",
          "bowling",
        ],
        areaDescription:
          "The Greenbrier estate cottages and guesthouses on the resort grounds",
        searchUrl: "https://www.greenbrier.com/stay/",
        notes:
          "Book a cluster of estate cottages or a block of resort rooms. Everything — golf, casino, dining, falconry, off-roading — is walkable or shuttled on-property. Dress code applies (jackets after 6pm in main areas).",
        avgRating: 4.6,
      },
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [400, 900],
        amenities: ["full kitchen", "deck", "mountain views", "fire pit"],
        areaDescription:
          "Lewisburg / Greenbrier County rental homes ~15 min from the resort",
        searchUrl:
          "https://www.vrbo.com/search?destination=Lewisburg%2C+WV",
        notes:
          "If the resort runs too rich, base in Lewisburg (a genuinely cool small town) and day-trip to the Greenbrier for golf and the casino.",
        avgRating: 4.7,
      },
    ],
    dining: [
      {
        name: "Prime 44 West",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Sam Snead-themed steakhouse inside the Greenbrier — the marquee group dinner",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "The Forum",
        style: "italian",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Wood-fired Italian on-property — easy crowd-pleaser after a long round",
        reservationNeeded: true,
        googleRating: 4.4,
      },
      {
        name: "The French Goat",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Acclaimed French bistro in downtown Lewisburg for a step off the resort",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Hill and Holler",
        style: "southern",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Appalachian comfort food and local brews in Lewisburg — relaxed group night",
        reservationNeeded: false,
        googleRating: 4.4,
      },
    ],
    bars: [
      {
        name: "Twelve Oaks Bar",
        vibe: "cocktail",
        highlight:
          "The Greenbrier's signature lounge — live piano, deep bourbon list, jackets encouraged",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.5,
      },
      {
        name: "The Casino Club Bar",
        vibe: "casino-bar",
        highlight:
          "Inside the resort's hidden underground casino — cocktails between blackjack hands",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "The Wild Bean",
        vibe: "dive",
        highlight:
          "Laid-back Lewisburg spot for coffee by day and beers by night",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
      {
        name: "The Asylum Brewing",
        vibe: "brewpub",
        highlight:
          "Lewisburg craft brewery with a roomy taproom for the whole crew",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
    ],
    activities: [
      {
        name: "The Greenbrier Casino",
        type: "casino",
        duration: "half day",
        pricePerPerson: [50, 500],
        groupFriendly: true,
        highlight:
          "A hidden, dress-code-required casino tucked beneath the resort — tables, slots, and a buzzing bar",
        bestFor: "after dinner",
        provider: "The Greenbrier",
      },
      {
        name: "Off-Road Driving School",
        type: "atv",
        duration: "2-3 hours",
        pricePerPerson: [150, 300],
        groupFriendly: true,
        highlight:
          "Tackle the resort's off-road course in Land Rovers and side-by-sides through the mountains",
        bestFor: "arrival day",
        provider: "The Greenbrier",
      },
      {
        name: "Greenbrier Gun Club",
        type: "shooting",
        duration: "2 hours",
        pricePerPerson: [100, 250],
        groupFriendly: true,
        highlight:
          "Sporting clays, trap, and skeet on the resort's championship shooting grounds",
        bestFor: "morning before golf",
        provider: "The Greenbrier",
      },
      {
        name: "Greenbrier River Whitewater",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [80, 150],
        groupFriendly: true,
        highlight:
          "Raft or tube the Greenbrier River — easy summer rest-day water time",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 24],
        hourlyRate: [120, 250],
        providers: [
          "The Greenbrier transportation desk",
          "Mountain Transit (Lewisburg)",
        ],
        notes:
          "On-property everything means you mostly need a shuttle for the Lewisburg dinner-and-bars run, ~15 min each way. Arrange through the resort concierge.",
        fullDayRate: [800, 1600],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [100, 250],
        providers: ["The Greenbrier in-room dining", "Take a Chef"],
        mealTypes: ["steak dinner", "Appalachian cookout", "breakfast spread"],
        notes:
          "On-resort, lean on the Greenbrier's private dining and butler service. In a Lewisburg rental, book a regional private chef for a cabin steak night.",
      },
    ],
  },

  // ─── Farmington, PA (Nemacolin) ───────────────────────────────────
  {
    id: "farmington-pa",
    city: "Farmington",
    state: "PA",
    region: "Northeast",
    tagline: "Pete Dye in the Laurel Highlands — golf, casino, and a private wildlife park",
    description:
      "Nemacolin is a sprawling Laurel Highlands resort with two strong 18s (Pete Dye's Mystic Rock plus Shepherd's Rock), an on-site casino, a private wildlife habitat, and off-road and shooting academies. A complete one-property buddy-trip base 70 minutes from Pittsburgh.",
    population: "tiny",
    nearestAirport: {
      code: "PIT",
      name: "Pittsburgh International Airport",
      driveMinutes: 80,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "Resort-centric; Uniontown (~25 min) has full grocery and liquor for pre-trip stocking",
    courses: [
      {
        name: "Mystic Rock",
        tier: "bucket-list",
        greenFeeRange: [195, 245],
        holes: 18,
        par: 72,
        yardage: 7526,
        walkable: false,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.nemacolin.com/golf/mystic-rock/",
        highlight:
          "Brawny Pete Dye design with rectangular bunkers and rock outcrops — former PGA Tour 84 Lumber Classic host",
        googleRating: 4.5,
        hypeTag: "TOURNAMENT HOST",
        rankNote: "Former PGA Tour host (84 Lumber Classic)",
      },
      {
        name: "Shepherd's Rock",
        tier: "premium",
        greenFeeRange: [150, 225],
        holes: 18,
        par: 72,
        yardage: 7165,
        walkable: false,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.nemacolin.com/golf/",
        highlight:
          "Newer Pete Dye design with dramatic elevation changes and big mountain views — more playable foil to Mystic Rock",
        googleRating: 4.6,
      },
      {
        name: "Nemacolin Links (par-3 course)",
        tier: "solid",
        greenFeeRange: [40, 75],
        holes: 9,
        par: 27,
        yardage: 1200,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        highlight:
          "Lit par-3 short course — perfect for a sundown betting game with beers",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [12, 20],
        nightlyRange: [500, 1800],
        amenities: [
          "on-site golf",
          "casino",
          "spa",
          "multiple restaurants",
          "off-road academy",
          "wildlife park",
        ],
        areaDescription: "Nemacolin resort townhomes and Falling Rock luxury rooms",
        searchUrl: "https://www.nemacolin.com/stay/",
        notes:
          "Block a row of resort townhomes or Chateau rooms. Everything — golf, casino (Lady Luck), shooting academy, off-roading — is on-property and shuttled. Big-group package coordinators available.",
        avgRating: 4.5,
      },
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [350, 800],
        amenities: ["full kitchen", "hot tub", "deck", "mountain views"],
        areaDescription:
          "Laurel Highlands / Ohiopyle cabin rentals ~20 min from the resort",
        searchUrl:
          "https://www.vrbo.com/search?destination=Ohiopyle%2C+PA",
        notes:
          "Rent a large Laurel Highlands cabin near Ohiopyle for a cheaper base, then day-trip to Nemacolin for golf, casino, and adventure.",
        avgRating: 4.7,
      },
    ],
    dining: [
      {
        name: "Lautrec",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Forbes Five-Star fine dining at Nemacolin — the splurge night for the crew",
        reservationNeeded: true,
        googleRating: 4.7,
      },
      {
        name: "Rockwell's",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Resort steakhouse with a roomy dining room built for big tables",
        reservationNeeded: true,
        googleRating: 4.4,
      },
      {
        name: "Autumn",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Relaxed all-day spot at the Chateau — easy breakfasts and casual group dinners",
        reservationNeeded: false,
        googleRating: 4.3,
      },
      {
        name: "Caddyshack",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Golf-themed pub between the courses — burgers, beers, and post-round trash talk",
        reservationNeeded: false,
        googleRating: 4.2,
      },
    ],
    bars: [
      {
        name: "Cigar Bar at Falling Rock",
        vibe: "whiskey-bar",
        highlight:
          "Bourbon and cigars in a clubby lounge at Nemacolin's flagship hotel",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.5,
      },
      {
        name: "Lady Luck Casino Bar",
        vibe: "casino-bar",
        highlight:
          "Drinks alongside the slots and tables of the on-property casino",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Tavern at Caddyshack",
        vibe: "sports-bar",
        highlight:
          "TVs, pool, and cold drafts — the default late-afternoon gathering point",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.2,
      },
    ],
    activities: [
      {
        name: "Lady Luck Casino",
        type: "casino",
        duration: "half day",
        pricePerPerson: [40, 400],
        groupFriendly: true,
        highlight:
          "On-property casino with tables and slots — walk over after the steak dinner",
        bestFor: "after dinner",
        provider: "Nemacolin",
      },
      {
        name: "Off-Road Driving Academy",
        type: "atv",
        duration: "2-3 hours",
        pricePerPerson: [150, 350],
        groupFriendly: true,
        highlight:
          "Hummers, Jeeps, and side-by-sides on Nemacolin's purpose-built off-road course",
        bestFor: "arrival day",
        provider: "Nemacolin",
      },
      {
        name: "Shooting Academy",
        type: "shooting",
        duration: "2 hours",
        pricePerPerson: [100, 275],
        groupFriendly: true,
        highlight:
          "Sporting clays, trap, and pistol on the resort's expansive shooting grounds",
        bestFor: "morning before golf",
        provider: "Nemacolin",
      },
      {
        name: "Ohiopyle Whitewater Rafting",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [60, 120],
        groupFriendly: true,
        highlight:
          "Raft the Lower Yough — Pennsylvania's best whitewater, ~20 min away",
        bestFor: "rest day",
        provider: "Wilderness Voyageurs",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 28],
        hourlyRate: [120, 250],
        providers: ["Nemacolin transportation", "Lenzner Coach (Pittsburgh)"],
        notes:
          "Most movement is on-property shuttle. Arrange resort transport for the Uniontown or Ohiopyle runs. For PIT airport transfers, book a Pittsburgh charter coach.",
        fullDayRate: [800, 1600],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [90, 200],
        providers: ["Nemacolin private dining", "Take a Chef", "Cozymeal"],
        mealTypes: ["steak dinner", "wild-game tasting", "breakfast spread"],
        notes:
          "On-resort, use Nemacolin's private dining team. In a Laurel Highlands cabin, book a regional private chef for an in-house steak or game night.",
      },
    ],
  },

  // ─── Philadelphia, PA ─────────────────────────────────────────────
  {
    id: "philadelphia-pa",
    city: "Philadelphia",
    state: "PA",
    region: "Northeast",
    tagline: "Big-city nightlife with classic public golf in the suburbs",
    description:
      "Philly pairs serious public golf in its suburbs with a loud, accessible big-city scene — cheesesteaks, dive bars, casinos, and walkable nightlife districts. Fly into PHL, base downtown or in the suburbs, and mix muni-classic rounds with a real city after dark.",
    population: "medium",
    nearestAirport: {
      code: "PHL",
      name: "Philadelphia International Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "Wegmans and ACME everywhere in the suburbs; PA state stores (Fine Wine & Good Spirits) for liquor",
    courses: [
      {
        name: "Makefield Highlands Golf Club",
        tier: "premium",
        greenFeeRange: [60, 110],
        holes: 18,
        par: 72,
        yardage: 7058,
        walkable: true,
        style: "links",
        driveMinutes: 45,
        url: "https://makefieldhighlandsgolf.com/",
        highlight:
          "Rick Jacobson links-style design in Bucks County — top public course in the metro and group-outing favorite",
        googleRating: 4.4,
      },
      {
        name: "Downingtown Country Club",
        tier: "solid",
        greenFeeRange: [50, 90],
        holes: 18,
        par: 72,
        yardage: 6619,
        walkable: true,
        style: "parkland",
        driveMinutes: 45,
        highlight:
          "George Fazio / Tom Fazio design in Chester County — mature, tree-lined, and a fair value",
        googleRating: 4.3,
      },
      {
        name: "Hartefeld National",
        tier: "premium",
        greenFeeRange: [70, 130],
        holes: 18,
        par: 72,
        yardage: 6969,
        walkable: false,
        style: "parkland",
        driveMinutes: 50,
        highlight:
          "Tom Fazio design near the DE line — rolling, polished, and a clear notch above muni golf",
        googleRating: 4.5,
      },
      {
        name: "Jericho National Golf Club",
        tier: "premium",
        greenFeeRange: [90, 160],
        holes: 18,
        par: 71,
        yardage: 7088,
        walkable: false,
        style: "parkland",
        driveMinutes: 50,
        highlight:
          "Upscale Bucks County semi-private along the Delaware — the splurge round of the trip",
        googleRating: 4.6,
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [400, 1200],
        amenities: ["full kitchen", "rowhome charm", "walkable neighborhood"],
        areaDescription:
          "Center City / Fishtown / Northern Liberties — big rowhomes near the bars",
        searchUrl:
          "https://www.airbnb.com/s/Philadelphia--PA/homes?adults=16",
        notes:
          "Base in Fishtown or Northern Liberties for walkable nightlife, or Center City for everything. Golf is a 40-50 min suburban drive, so plan a van for course days.",
        avgRating: 4.6,
      },
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [250, 600],
        amenities: ["multiple hotel rooms", "downtown", "rooftop bar nearby"],
        areaDescription: "Center City hotel block near Rittenhouse or Old City",
        searchUrl:
          "https://www.marriott.com/search/findHotels.mi?t=philadelphia+pa",
        notes:
          "Block 5-8 rooms downtown for a low-logistics setup with bars at the doorstep. Easy Uber to suburban courses.",
        avgRating: 4.4,
      },
    ],
    dining: [
      {
        name: "Barclay Prime",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Stephen Starr's clubby steakhouse with the famous $150 cheesesteak — the marquee dinner",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Pat's & Geno's (cheesesteak corner)",
        style: "casual",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "The rival cheesesteak shrines facing off in South Philly — a mandatory group pilgrimage",
        reservationNeeded: false,
        googleRating: 4.2,
      },
      {
        name: "Bottle Bar East",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Massive beer list and pub fare in Fishtown — relaxed crew dinner near the bars",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "Tony Luke's",
        style: "casual",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Cult roast pork and cheesesteak spot — the local insiders' counter-pick",
        reservationNeeded: false,
        googleRating: 4.4,
      },
    ],
    bars: [
      {
        name: "Frankford Hall",
        vibe: "patio",
        highlight:
          "Cavernous Fishtown beer garden with steins, ping pong, and a big back patio — built for groups",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.4,
      },
      {
        name: "McGillin's Olde Ale House",
        vibe: "dive",
        highlight:
          "Philly's oldest continuously operating bar (1860) — loud, sticky, and perfect",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.6,
      },
      {
        name: "Bok Bar (rooftop)",
        vibe: "rooftop",
        highlight:
          "Seasonal rooftop atop an old school with a killer skyline view (summer)",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.5,
      },
      {
        name: "Yards Brewing Co.",
        vibe: "brewpub",
        highlight:
          "Big-tank brewery taproom near the waterfront with long communal tables",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.6,
      },
    ],
    activities: [
      {
        name: "Live! Casino & Hotel Philadelphia",
        type: "casino",
        duration: "half day",
        pricePerPerson: [40, 400],
        groupFriendly: true,
        highlight:
          "Full casino in the South Philly stadium district — tables, slots, and sports bars",
        bestFor: "after dinner",
        provider: "Live! Casino",
      },
      {
        name: "Philly Brewery Crawl",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [40, 90],
        groupFriendly: true,
        highlight:
          "Hit Yards, Evil Genius, and Love City on a Fishtown/Kensington brewery loop",
        bestFor: "arrival day",
      },
      {
        name: "Philadelphia Distilling Tour",
        type: "distillery",
        duration: "2 hours",
        pricePerPerson: [25, 50],
        groupFriendly: true,
        highlight:
          "Bluecoat Gin distillery tour and tasting in Fishtown",
        bestFor: "rest day",
        provider: "Philadelphia Distilling",
      },
      {
        name: "Topgolf Mount Laurel",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [35, 65],
        groupFriendly: true,
        highlight:
          "Three-level Topgolf just across the river in NJ for a competitive warm-up night",
        bestFor: "arrival day",
        provider: "Topgolf",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 40],
        hourlyRate: [150, 350],
        providers: [
          "Philadelphia Party Bus",
          "USA Charter Bus Philadelphia",
          "Bucks County Limousine",
        ],
        notes:
          "Plenty of charter operators. Book a bus for course days (suburban courses are spread out) and bar nights. Center City traffic is heavy — pad your timing.",
        fullDayRate: [1200, 2800],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 175],
        providers: ["Take a Chef", "Cozymeal", "Hungry (Philadelphia)"],
        mealTypes: ["steak dinner", "Italian feast", "breakfast spread"],
        notes:
          "Strong private-chef market. A South-Philly-Italian feast or a steak night in the rowhome is a great low-key evening between bar nights.",
      },
    ],
  },

  // ─── Long Island, NY (Bethpage) ───────────────────────────────────
  {
    id: "long-island-ny",
    city: "Long Island (Farmingdale)",
    state: "NY",
    region: "Northeast",
    tagline: "Bethpage Black and a wall of world-class public golf",
    description:
      "Long Island is a public-golf mecca anchored by Bethpage Black — a major and Ryder Cup venue you can actually book — plus four more Bethpage courses and Montauk Downs. World-class golf at municipal prices, with NYC nightlife a train ride away.",
    population: "medium",
    nearestAirport: {
      code: "JFK",
      name: "John F. Kennedy International Airport",
      driveMinutes: 40,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "Stop & Shop and King Kullen across Nassau County; NY liquor stores closed Sundays in some towns — stock Saturday",
    courses: [
      {
        name: "Bethpage Black",
        tier: "bucket-list",
        greenFeeRange: [140, 160],
        holes: 18,
        par: 71,
        yardage: 7468,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.bethpagegolfcourse.com/",
        highlight:
          "A.W. Tillinghast brute that hosted two U.S. Opens and the 2025 Ryder Cup — walking-only, with the famous warning sign",
        googleRating: 4.7,
        hypeTag: "TOURNAMENT HOST",
        rankNote: "No. 5 Public — Golf.com; 2025 Ryder Cup host",
      },
      {
        name: "Bethpage Red",
        tier: "premium",
        greenFeeRange: [70, 95],
        holes: 18,
        par: 70,
        yardage: 6756,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.bethpagegolfcourse.com/",
        highlight:
          "The 'other' Tillinghast at Bethpage — a genuinely great course in the Black's shadow at a fraction of the fee",
        googleRating: 4.6,
      },
      {
        name: "Bethpage Blue",
        tier: "solid",
        greenFeeRange: [50, 75],
        holes: 18,
        par: 72,
        yardage: 6684,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.bethpagegolfcourse.com/",
        highlight:
          "Solid, fun member-style track at the Bethpage complex — easy second round of the day",
        googleRating: 4.3,
      },
      {
        name: "Montauk Downs State Park",
        tier: "premium",
        greenFeeRange: [60, 90],
        holes: 18,
        par: 72,
        yardage: 6762,
        walkable: true,
        style: "links",
        driveMinutes: 95,
        highlight:
          "Robert Trent Jones Sr. seaside design at the tip of the island — windswept and worth the drive",
        googleRating: 4.6,
        rankNote: "Top public course — New York State Parks",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [500, 1500],
        amenities: ["full kitchen", "yard", "deck", "near Bethpage"],
        areaDescription:
          "Nassau County (Farmingdale / Bethpage / Massapequa) — homes minutes from the courses",
        searchUrl:
          "https://www.vrbo.com/search?destination=Farmingdale%2C+NY",
        notes:
          "Stay near Bethpage to nail early walk-up tee times for the Black. Big suburban homes are limited — book very early. The LIRR runs into NYC for a night out.",
        avgRating: 4.5,
      },
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [250, 600],
        amenities: ["multiple hotel rooms", "near courses", "free parking"],
        areaDescription:
          "Hotels along the Route 110 / Melville corridor near Bethpage",
        searchUrl:
          "https://www.marriott.com/search/findHotels.mi?t=melville+ny",
        notes:
          "Block rooms in Melville or Plainview to be 10 min from the first tee. Per-room pricing keeps it reasonable for big groups.",
        avgRating: 4.3,
      },
    ],
    dining: [
      {
        name: "Blackstone Steakhouse",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Melville power steakhouse with a big bar scene — the marquee group dinner",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Umberto's of New Hyde Park",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Legendary Long Island grandma-slice and red-sauce Italian — a mandatory stop",
        reservationNeeded: false,
        googleRating: 4.5,
      },
      {
        name: "Croxley's Ale House",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Wings, beers, and TVs in Farmingdale — easy casual night near the courses",
        reservationNeeded: false,
        googleRating: 4.3,
      },
      {
        name: "Library Cafe (Farmingdale)",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Main Street Farmingdale bar-and-grill at the heart of the nightlife strip",
        reservationNeeded: false,
        googleRating: 4.2,
      },
    ],
    bars: [
      {
        name: "Main Street, Farmingdale (bar strip)",
        vibe: "sports-bar",
        highlight:
          "A walkable cluster of bars and breweries on Farmingdale's Main Street — the post-round HQ",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.4,
      },
      {
        name: "Sand City Brewing",
        vibe: "brewpub",
        highlight:
          "Northport craft brewery with a roomy taproom — easy big-group hangout",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.6,
      },
      {
        name: "Mulcahy's (Wantagh)",
        vibe: "sports-bar",
        highlight:
          "Long Island institution with live music and a packed weekend crowd",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.3,
      },
    ],
    activities: [
      {
        name: "NYC Night Out (LIRR)",
        type: "casino",
        duration: "half day",
        pricePerPerson: [50, 300],
        groupFriendly: true,
        highlight:
          "Take the LIRR from Bethpage straight into Manhattan for a no-DD big-city night",
        bestFor: "after golf",
      },
      {
        name: "Topgolf Holtsville",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [35, 65],
        groupFriendly: true,
        highlight:
          "Long Island Topgolf for a competitive arrival-night warm-up",
        bestFor: "arrival day",
        provider: "Topgolf",
      },
      {
        name: "Montauk Charter Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [125, 250],
        groupFriendly: true,
        highlight:
          "Run out to Montauk — the 'Sport Fishing Capital' — for striped bass and fluke (pairs with a Montauk Downs round)",
        bestFor: "rest day",
      },
      {
        name: "Long Island Wine Trail (North Fork)",
        type: "winery",
        duration: "half day",
        pricePerPerson: [50, 120],
        groupFriendly: true,
        highlight:
          "North Fork tasting loop — surprisingly good, and a chill rest-day option",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 40],
        hourlyRate: [180, 400],
        providers: [
          "M&V Limousines",
          "Long Island Party Bus",
          "All Island Transportation",
        ],
        notes:
          "Big Long Island limo/party-bus market. Book a bus for course days and the Farmingdale/Montauk runs. For NYC nights, the LIRR is simpler than driving in.",
        fullDayRate: [1400, 3000],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [80, 180],
        providers: ["Take a Chef", "Cozymeal", "Long Island private chefs"],
        mealTypes: ["steak dinner", "Italian feast", "seafood boil"],
        notes:
          "Strong private-chef and caterer market. A red-sauce Italian feast or a clam-and-lobster boil in the rental is a great Long Island theme night.",
      },
    ],
  },

  // ─── Verona, NY (Turning Stone) ───────────────────────────────────
  {
    id: "verona-ny",
    city: "Verona",
    state: "NY",
    region: "Northeast",
    tagline: "Three championship courses and a full casino under one roof",
    description:
      "Turning Stone Resort & Casino packs three highly rated 18s — Tom Fazio's PGA-Tour-tested Atunyote among them — into one upstate property with a 100,000-sq-ft casino, multiple hotels, restaurants, and a nightclub. The most self-contained golf-and-gamble base in the Northeast.",
    population: "tiny",
    nearestAirport: {
      code: "SYR",
      name: "Syracuse Hancock International Airport",
      driveMinutes: 35,
    },
    bestSeasons: ["summer", "fall"],
    groceryNotes:
      "Resort dining covers most needs; a Hannaford and liquor store in nearby Oneida (~10 min)",
    courses: [
      {
        name: "Atunyote",
        tier: "bucket-list",
        greenFeeRange: [150, 225],
        holes: 18,
        par: 72,
        yardage: 7315,
        walkable: false,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.turningstone.com/golf/atunyote",
        highlight:
          "Tom Fazio parkland stunner that hosted the PGA Tour's Turning Stone Championship (2007-2010) — the flagship round",
        googleRating: 4.7,
        hypeTag: "TOURNAMENT HOST",
        rankNote: "Former PGA Tour host (Turning Stone Championship)",
      },
      {
        name: "Kaluhyat",
        tier: "premium",
        greenFeeRange: [90, 150],
        holes: 18,
        par: 72,
        yardage: 7105,
        walkable: false,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.turningstone.com/golf/kaluhyat",
        highlight:
          "Robert Trent Jones Jr. design with up to 50-foot elevation swings and big upstate vistas",
        googleRating: 4.5,
      },
      {
        name: "Shenendoah",
        tier: "premium",
        greenFeeRange: [80, 130],
        holes: 18,
        par: 72,
        yardage: 7129,
        walkable: false,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.turningstone.com/golf/shenendoah",
        highlight:
          "Rick Smith design mixing tree-lined parkland and open links-style holes — the most playable of the three",
        googleRating: 4.4,
      },
      {
        name: "Pleasant Knolls (par-3 / pitch & putt)",
        tier: "solid",
        greenFeeRange: [20, 40],
        holes: 9,
        par: 27,
        yardage: 1100,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        highlight:
          "Short course for a quick betting game before the casino opens up",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [12, 20],
        nightlyRange: [300, 1000],
        amenities: [
          "on-site golf",
          "casino",
          "spa",
          "multiple restaurants",
          "nightclub",
          "bowling",
        ],
        areaDescription:
          "Turning Stone's hotels (The Tower, The Lodge, The Inn) on the resort grounds",
        searchUrl: "https://www.turningstone.com/stay",
        notes:
          "Block a set of Tower or Lodge rooms. Golf, casino, spa, restaurants, and the nightclub are all walkable on-property — zero driving once you arrive. Multi-Play golf passes save real money over 3 days.",
        avgRating: 4.5,
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [250, 600],
        amenities: ["full kitchen", "deck", "lake access", "fire pit"],
        areaDescription:
          "Oneida Lake / Sylvan Beach rental homes ~20 min from the resort",
        searchUrl:
          "https://www.vrbo.com/search?destination=Oneida+Lake%2C+NY",
        notes:
          "For a cheaper base, rent a lake house near Oneida Lake and day-trip to Turning Stone for golf and the casino.",
        avgRating: 4.6,
      },
    ],
    dining: [
      {
        name: "TS Steakhouse",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Turning Stone's AAA Four-Diamond rooftop steakhouse — the marquee dinner",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Wildflowers",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Refined American dining on-property for a step up from the casino floor",
        reservationNeeded: true,
        googleRating: 4.4,
      },
      {
        name: "Peach Blossom (Asian)",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Open-late Asian kitchen for a post-gambling group feed",
        reservationNeeded: false,
        googleRating: 4.2,
      },
      {
        name: "The Cabin (Exit 33)",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Smoked meats and beers near the resort — easy casual group night",
        reservationNeeded: false,
        googleRating: 4.3,
      },
    ],
    bars: [
      {
        name: "Lava Nightclub",
        vibe: "cocktail",
        highlight:
          "Turning Stone's nightclub with DJs and bottle service — the late-night anchor",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.1,
      },
      {
        name: "The Falls Lounge",
        vibe: "casino-bar",
        highlight:
          "Casino-floor lounge with live music — drinks between blackjack hands",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Tin Rooster",
        vibe: "honky-tonk",
        highlight:
          "On-property country bar with line dancing and live bands",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.2,
      },
    ],
    activities: [
      {
        name: "Turning Stone Casino",
        type: "casino",
        duration: "half day",
        pricePerPerson: [50, 500],
        groupFriendly: true,
        highlight:
          "A 100,000-sq-ft casino — tables, poker room, slots, and sportsbook steps from your room",
        bestFor: "after dinner",
        provider: "Turning Stone",
      },
      {
        name: "Sportsplex / Bowling",
        type: "go-karts",
        duration: "2 hours",
        pricePerPerson: [20, 50],
        groupFriendly: true,
        highlight:
          "On-property bowling and games for a low-key competitive arrival night",
        bestFor: "arrival day",
        provider: "Turning Stone",
      },
      {
        name: "Sylvan Beach Amusement & Boating",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [30, 100],
        groupFriendly: true,
        highlight:
          "Oneida Lake boating and a throwback lakeside amusement park ~20 min away",
        bestFor: "rest day",
      },
      {
        name: "Skeet & Trap (Turning Stone Sportsmen's)",
        type: "skeet",
        duration: "2 hours",
        pricePerPerson: [60, 140],
        groupFriendly: true,
        highlight:
          "Sporting clays and trap at the resort's shooting grounds",
        bestFor: "morning before golf",
        provider: "Turning Stone",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 24],
        hourlyRate: [110, 250],
        providers: [
          "Turning Stone transportation",
          "Birnie Bus (Syracuse)",
          "Roman's Limousine",
        ],
        notes:
          "Everything's on-property, so you mainly need transport for SYR airport transfers and the optional Oneida Lake / Sylvan Beach run. The resort runs its own shuttles.",
        fullDayRate: [700, 1500],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [90, 200],
        providers: ["Turning Stone private dining", "Take a Chef"],
        mealTypes: ["steak dinner", "breakfast spread", "wild-game cookout"],
        notes:
          "On-resort, use Turning Stone's private dining. In an Oneida Lake rental, book a Syracuse-area private chef for a lake-house steak night.",
      },
    ],
  },

  // ─── Lake George, NY (The Sagamore) ───────────────────────────────
  {
    id: "lake-george-ny",
    city: "Lake George",
    state: "NY",
    region: "Northeast",
    tagline: "Donald Ross lakeside golf in the Adirondacks",
    description:
      "Lake George pairs a Donald Ross resort course at The Sagamore with a summer lake-town scene — boat cruises, lakeside bars, and an old-school arcade strip. A scenic Adirondack base for a relaxed summer golf-and-lake trip.",
    population: "tiny",
    nearestAirport: {
      code: "ALB",
      name: "Albany International Airport",
      driveMinutes: 60,
    },
    bestSeasons: ["summer", "fall"],
    groceryNotes:
      "Price Chopper and a state liquor store in Lake George Village and Queensbury (~15 min)",
    courses: [
      {
        name: "The Sagamore Golf Club",
        tier: "premium",
        greenFeeRange: [120, 215],
        holes: 18,
        par: 70,
        yardage: 6890,
        walkable: true,
        style: "mountain",
        driveMinutes: 15,
        url: "https://www.opalcollection.com/sagamore/golf/",
        highlight:
          "Donald Ross 1928 design with narrow tree-lined fairways and Lake George views — the marquee round",
        googleRating: 4.6,
        rankNote: "Top public course in the Adirondacks",
      },
      {
        name: "Top of the World Golf Resort",
        tier: "solid",
        greenFeeRange: [50, 90],
        holes: 18,
        par: 71,
        yardage: 6088,
        walkable: true,
        style: "mountain",
        driveMinutes: 10,
        highlight:
          "Hilltop course with some of the best panoramic lake views in the region — fun, scenic, and a fair value",
        googleRating: 4.5,
      },
      {
        name: "Cronin's Golf Resort",
        tier: "solid",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 70,
        yardage: 5694,
        walkable: true,
        style: "parkland",
        driveMinutes: 12,
        highlight:
          "Family-run Adirondack track in Warrensburg — relaxed, walkable, and budget-friendly",
        googleRating: 4.4,
      },
      {
        name: "Queensbury Country Club",
        tier: "solid",
        greenFeeRange: [40, 75],
        holes: 18,
        par: 71,
        yardage: 6500,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        highlight:
          "Semi-private parkland course south of the lake — easy second round of the day",
        googleRating: 4.3,
      },
    ],
    lodging: [
      {
        type: "lakehouse",
        sleeps: [12, 18],
        nightlyRange: [500, 2000],
        amenities: [
          "private dock",
          "lake access",
          "deck",
          "fire pit",
          "boat parking",
        ],
        areaDescription:
          "Lakefront homes along Lake George — Bolton Landing, Diamond Point, and the eastern shore",
        searchUrl:
          "https://www.vrbo.com/search?destination=Lake+George%2C+NY",
        notes:
          "A lakefront house with a dock is the move — rent boats and run the lake by day. Summer books out months ahead. Bolton Landing puts you near The Sagamore.",
        avgRating: 4.7,
        bedsBreakdown: "Many 4-6 bedroom lake homes sleep 12-16 at 2/bed",
      },
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [300, 700],
        amenities: ["on-site golf", "lake access", "pool", "multiple restaurants"],
        areaDescription: "The Sagamore Resort on Green Island in Bolton Landing",
        searchUrl: "https://www.opalcollection.com/sagamore/",
        notes:
          "Block rooms at The Sagamore for on-site golf, a private island setting, and lake views without managing a rental.",
        avgRating: 4.4,
      },
    ],
    dining: [
      {
        name: "The Log Jam",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Classic Adirondack log-cabin steakhouse with a big salad bar — the group dinner staple",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Bistro LeRoux",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Polished bistro in Lake George for a step up from lakeside bar food",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "The Boathouse Restaurant",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Waterfront dining and drinks with boat-up access in Bolton Landing",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "Adirondack Pub & Brewery",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Local brewery with a big taproom and pub menu in Lake George Village",
        reservationNeeded: false,
        googleRating: 4.4,
      },
    ],
    bars: [
      {
        name: "Adirondack Pub & Brewery Taproom",
        vibe: "brewpub",
        highlight:
          "Roomy taproom with a full lineup of house beers — easy big-group hangout",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.4,
      },
      {
        name: "Duffy's Tavern",
        vibe: "dive",
        highlight:
          "No-frills Lake George Village dive — the late-night post-dinner spot",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.3,
      },
      {
        name: "Lake George Beach Club",
        vibe: "patio",
        highlight:
          "Lakeside patio bar with music and a young summer crowd",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.2,
      },
    ],
    activities: [
      {
        name: "Lake George Boat Rental",
        type: "boat-rental",
        duration: "full day",
        pricePerPerson: [60, 150],
        groupFriendly: true,
        highlight:
          "Rent pontoons or a powerboat and run the lake — the centerpiece rest-day activity",
        bestFor: "rest day",
        provider: "Lake George Boat Rentals",
      },
      {
        name: "Lake George Parasailing & Water Sports",
        type: "water-sports",
        duration: "half day",
        pricePerPerson: [60, 120],
        groupFriendly: true,
        highlight:
          "Parasailing, tubing, and jet skis off the village docks",
        bestFor: "rest day",
      },
      {
        name: "Saratoga Race Course Day Trip",
        type: "casino",
        duration: "half day",
        pricePerPerson: [40, 200],
        groupFriendly: true,
        highlight:
          "In summer, day-trip to Saratoga's thoroughbred track or casino ~40 min south",
        bestFor: "rest day",
      },
      {
        name: "Lake George Fishing Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [100, 200],
        groupFriendly: true,
        highlight:
          "Charter for lake trout and bass on one of the cleanest lakes in the Northeast",
        bestFor: "morning before golf",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [12, 30],
        hourlyRate: [120, 280],
        providers: [
          "Premiere Transportation (Albany)",
          "Upstate Transit",
          "Lake George Limousine",
        ],
        notes:
          "Albany-area operators serve the lake. Book a bus for course days (courses are spread around the lake) and the village bar run. Summer weekends book early.",
        fullDayRate: [900, 2000],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [80, 175],
        providers: ["Take a Chef", "Cozymeal", "Adirondack private chefs"],
        mealTypes: ["steak dinner", "lakeside cookout", "fish fry"],
        notes:
          "Book an Adirondack-area private chef for a steak or fresh-catch dinner on the lake-house deck — a high point of a Lake George trip.",
      },
    ],
  },

  // ─── Mashantucket, CT (Foxwoods / Lake of Isles) ──────────────────
  {
    id: "mashantucket-ct",
    city: "Mashantucket",
    state: "CT",
    region: "Northeast",
    tagline: "Rees Jones golf wired straight into Foxwoods Casino",
    description:
      "Lake of Isles puts a top-ranked Rees Jones course right beside Foxwoods — one of the largest casinos in North America. Golf by day, then walk into tables, slots, clubs, and concerts at night. Mohegan Sun is 15 minutes away for a second casino night.",
    population: "tiny",
    nearestAirport: {
      code: "PVD",
      name: "T.F. Green International Airport (Providence)",
      driveMinutes: 50,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "Stop & Shop in nearby Mystic/North Stonington (~15 min); CT liquor stores close early — stock midday",
    courses: [
      {
        name: "Lake of Isles (North Course)",
        tier: "bucket-list",
        greenFeeRange: [120, 195],
        holes: 18,
        par: 72,
        yardage: 7325,
        walkable: false,
        style: "parkland",
        driveMinutes: 5,
        url: "https://foxwoods.com/golf",
        highlight:
          "Rees Jones design with island tees and greens, ranked the No. 1 public course in Connecticut — adjacent to Foxwoods",
        googleRating: 4.6,
        hypeTag: "TOP 100 PUBLIC",
        rankNote: "No. 1 Public in CT — Golf Digest",
      },
      {
        name: "Pequot Golf Club (Stonington)",
        tier: "solid",
        greenFeeRange: [45, 80],
        holes: 18,
        par: 70,
        yardage: 5903,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        highlight:
          "Mature, walkable Stonington course near the shore — easy second round of the day",
        googleRating: 4.3,
      },
      {
        name: "Shennecossett Golf Course (Groton)",
        tier: "premium",
        greenFeeRange: [50, 90],
        holes: 18,
        par: 72,
        yardage: 6562,
        walkable: true,
        style: "links",
        driveMinutes: 25,
        highlight:
          "Donald Ross seaside muni on Long Island Sound — classic, breezy, and a great value",
        googleRating: 4.5,
        rankNote: "Donald Ross design (1919)",
      },
      {
        name: "Stonington Country Club (semi-private)",
        tier: "solid",
        greenFeeRange: [40, 75],
        holes: 9,
        par: 35,
        yardage: 3100,
        walkable: true,
        style: "parkland",
        driveMinutes: 22,
        highlight:
          "Pretty 9-holer near the shoreline — quick filler round before the casino",
        googleRating: 4.2,
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [12, 20],
        nightlyRange: [250, 800],
        amenities: [
          "casino",
          "spa",
          "multiple restaurants",
          "nightclubs",
          "on-site golf nearby",
          "concert venues",
        ],
        areaDescription:
          "Foxwoods hotels (Grand Pequot, Great Cedar, The Fox Tower) on the casino campus",
        searchUrl: "https://foxwoods.com/hotels/",
        notes:
          "Block rooms across the Foxwoods towers. Casino, clubs, restaurants, and bowling are all under-roof; Lake of Isles is a 5-min shuttle. Per-room pricing is friendly for big groups.",
        avgRating: 4.3,
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [350, 900],
        amenities: ["full kitchen", "deck", "near Mystic", "fire pit"],
        areaDescription:
          "Mystic / North Stonington rental homes ~15 min from Foxwoods",
        searchUrl:
          "https://www.vrbo.com/search?destination=Mystic%2C+CT",
        notes:
          "Base in charming Mystic for a non-casino vibe and day-trip to Foxwoods for golf and gambling. Mystic's downtown adds great dining and bars.",
        avgRating: 4.6,
      },
    ],
    dining: [
      {
        name: "David Burke Prime",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Foxwoods' marquee dry-aged steakhouse — the splurge dinner before the tables",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Caputo Trattoria",
        style: "italian",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Hearty Italian on the casino floor — easy crowd-pleaser for the group",
        reservationNeeded: true,
        googleRating: 4.3,
      },
      {
        name: "Oyster Club (Mystic)",
        style: "seafood",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Acclaimed farm-and-sea spot in Mystic for a step off the casino floor",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Mystic Pizza",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "The movie-famous pizza joint — a fun, cheap, mandatory group stop",
        reservationNeeded: false,
        googleRating: 4.2,
      },
    ],
    bars: [
      {
        name: "Shrine (Foxwoods)",
        vibe: "cocktail",
        highlight:
          "Asian-inspired nightclub-lounge with DJs and bottle service inside the casino",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.1,
      },
      {
        name: "Centrale (Foxwoods)",
        vibe: "casino-bar",
        highlight:
          "Sports-bar-meets-lounge on the casino floor with big screens and a long bar",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.2,
      },
      {
        name: "Daniel Packer Inne (Mystic)",
        vibe: "dive",
        highlight:
          "1756 riverside tavern in Mystic with a low-ceiling cellar bar — full of character",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.6,
      },
    ],
    activities: [
      {
        name: "Foxwoods Casino",
        type: "casino",
        duration: "half day",
        pricePerPerson: [50, 500],
        groupFriendly: true,
        highlight:
          "One of North America's biggest casinos — tables, poker, slots, sportsbook, and a HighFlyer zipline",
        bestFor: "after dinner",
        provider: "Foxwoods",
      },
      {
        name: "Foxwoods HighFlyer Zipline",
        type: "zipline",
        duration: "1-2 hours",
        pricePerPerson: [40, 70],
        groupFriendly: true,
        highlight:
          "Quarter-mile zipline soaring between the casino towers — a unique arrival-day stunt",
        bestFor: "arrival day",
        provider: "Foxwoods",
      },
      {
        name: "Mystic Brewery & Distillery Crawl",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [40, 90],
        groupFriendly: true,
        highlight:
          "Hit Beer'd Brewing and area distilleries around Mystic/Stonington",
        bestFor: "rest day",
      },
      {
        name: "Mohegan Sun Night",
        type: "casino",
        duration: "half day",
        pricePerPerson: [50, 400],
        groupFriendly: true,
        highlight:
          "Second casino 15 min away — easy two-casino itinerary if the crew wants variety",
        bestFor: "after golf",
        provider: "Mohegan Sun",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 36],
        hourlyRate: [150, 350],
        providers: [
          "M&J Bus",
          "Eastern Connecticut Limousine",
          "Mystic Limousine",
        ],
        notes:
          "Casino, golf, and Mystic are all close. Book a bus for course days plus the Mystic dining/bar run and the Mohegan Sun hop. Foxwoods also runs shuttles to Lake of Isles.",
        fullDayRate: [1200, 2800],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [85, 185],
        providers: ["Take a Chef", "Cozymeal", "Mystic-area private chefs"],
        mealTypes: ["steak dinner", "New England seafood boil", "breakfast spread"],
        notes:
          "In a Mystic rental, book a shoreline private chef for a lobster-and-clam boil or steak night — a great change of pace from casino dining.",
      },
    ],
  },

  // ─── Carrabassett Valley, ME (Sugarloaf) ──────────────────────────
  {
    id: "carrabassett-valley-me",
    city: "Carrabassett Valley",
    state: "ME",
    region: "Northeast",
    tagline: "Maine's mountain golf — RTJ II in the Western Mountains",
    description:
      "Sugarloaf is Maine's top mountain course: a Robert Trent Jones Jr. design carved into the Western Mountains with a brutal, beautiful 'string of pearls' river stretch. A remote, scenic golf-and-ski-town base for a crew that wants quiet, dramatic golf and a lodge to themselves.",
    population: "tiny",
    nearestAirport: {
      code: "PWM",
      name: "Portland International Jetport",
      driveMinutes: 150,
    },
    bestSeasons: ["summer", "fall"],
    groceryNotes:
      "Limited local stores; do a big stock-up at the Hannaford in Farmington (~45 min) on the way in",
    courses: [
      {
        name: "Sugarloaf Golf Club",
        tier: "bucket-list",
        greenFeeRange: [100, 166],
        holes: 18,
        par: 72,
        yardage: 6956,
        slope: 151,
        rating: 74.4,
        walkable: false,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.sugarloaf.com/golf",
        highlight:
          "Robert Trent Jones Jr. mountain masterpiece with the famous Carrabassett River 'snowfields' stretch — Maine's best course",
        googleRating: 4.7,
        rankNote: "No. 1 in Maine — Golf Digest",
      },
      {
        name: "Sugarloaf Academy (par-3)",
        tier: "solid",
        greenFeeRange: [25, 50],
        holes: 9,
        par: 27,
        yardage: 1100,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        highlight:
          "Short course and academy for a warm-up loop or a quick betting game",
      },
      {
        name: "Mingo Springs Golf Course (Rangeley)",
        tier: "solid",
        greenFeeRange: [45, 75],
        holes: 18,
        par: 70,
        yardage: 5667,
        walkable: true,
        style: "mountain",
        driveMinutes: 45,
        highlight:
          "Scenic, walkable Rangeley-area course with lake-and-mountain views — a relaxed second round",
        googleRating: 4.5,
      },
    ],
    lodging: [
      {
        type: "lodge",
        sleeps: [12, 20],
        nightlyRange: [400, 1200],
        amenities: [
          "ski-in/out base",
          "hot tub",
          "fireplace",
          "multiple bedrooms",
          "mountain views",
        ],
        areaDescription:
          "Sugarloaf base-area condos and slopeside houses — walking distance to golf and the village",
        searchUrl:
          "https://www.sugarloaf.com/lodging",
        notes:
          "Rent a cluster of base-area condos or one big slopeside house. Off-season (summer) golf rates make the lodging a relative bargain. It's remote — plan meals around the small village.",
        avgRating: 4.5,
      },
      {
        type: "cabin",
        sleeps: [10, 16],
        nightlyRange: [300, 800],
        amenities: ["full kitchen", "deck", "river access", "fire pit"],
        areaDescription:
          "Carrabassett Valley / Kingfield cabins along the river ~15 min from the course",
        searchUrl:
          "https://www.vrbo.com/search?destination=Carrabassett+Valley%2C+ME",
        notes:
          "A riverside cabin is the move for a quiet, self-catered crew. Bring/stock everything — the nearest real grocery is in Farmington.",
        avgRating: 4.6,
      },
    ],
    dining: [
      {
        name: "The Bag & Kettle",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Sugarloaf's iconic base-area pub — wood-fired pizza, burgers, and beers after the round",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "One Stanley Avenue (Kingfield)",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Beloved Victorian-house fine-dining spot in Kingfield for the splurge night",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Rolling Fatties",
        style: "casual",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Burritos and quick eats in the valley — easy fuel before or after golf",
        reservationNeeded: false,
        googleRating: 4.5,
      },
      {
        name: "Tufulio's",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Valley Italian spot with pizza and pasta — reliable big-group dinner",
        reservationNeeded: false,
        googleRating: 4.3,
      },
    ],
    bars: [
      {
        name: "The Rack BBQ & Bar",
        vibe: "sports-bar",
        highlight:
          "Sugarloaf's après bar with BBQ, big screens, and live music — the social anchor",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.3,
      },
      {
        name: "The Bag & Kettle Bar",
        vibe: "brewpub",
        highlight:
          "House Bag-brewed beers in the iconic base-area pub",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.4,
      },
      {
        name: "Widowmaker Lounge",
        vibe: "patio",
        highlight:
          "Base-lodge lounge with a deck and mountain views — easy group après spot",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.2,
      },
    ],
    activities: [
      {
        name: "Carrabassett River Fly Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [120, 250],
        groupFriendly: true,
        highlight:
          "Guided fly fishing for brook trout and salmon on the Carrabassett",
        bestFor: "morning before golf",
        provider: "Sugarloaf Outdoor Center",
      },
      {
        name: "Sugarloaf ATV / UTV Tours",
        type: "atv",
        duration: "2-3 hours",
        pricePerPerson: [120, 220],
        groupFriendly: true,
        highlight:
          "Ride the Western Maine trail network through the mountains",
        bestFor: "arrival day",
      },
      {
        name: "Sugarloaf Mountain Biking",
        type: "mountain-biking",
        duration: "half day",
        pricePerPerson: [50, 110],
        groupFriendly: true,
        highlight:
          "Lift-served and cross-country trails right off the base — a real rest-day workout",
        bestFor: "rest day",
        provider: "Sugarloaf Outdoor Center",
      },
      {
        name: "Dead River / Kennebec Whitewater Rafting",
        type: "rafting",
        duration: "full day",
        pricePerPerson: [90, 160],
        groupFriendly: true,
        highlight:
          "Run the Dead or Kennebec — some of the East's best whitewater ~45 min away",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 24],
        hourlyRate: [120, 250],
        providers: ["Sugarloaf Explorer", "Northern Charter (Portland)"],
        notes:
          "It's remote — the resort runs a base-area shuttle, and you'll want a charter for the long PWM airport transfer. Most of the trip you stay put at the base.",
        fullDayRate: [900, 1800],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [100, 220],
        providers: ["Sugarloaf private dining", "Western Maine private chefs"],
        mealTypes: ["steak dinner", "lobster bake", "wild-game cookout"],
        notes:
          "Given the remoteness, a private chef for a lodge steak or lobster night is high-value. Arrange through Sugarloaf or a Portland-based chef who'll travel up.",
      },
    ],
  },

  // ─── Manchester, VT (Equinox / Green Mountains) ───────────────────
  {
    id: "manchester-vt",
    city: "Manchester",
    state: "VT",
    region: "Northeast",
    tagline: "Walter Travis golf and Green Mountain charm",
    description:
      "Manchester is a polished Vermont mountain town: a 1927 Walter Travis course at The Equinox, the bigger Stratton tracks nearby, and a walkable village of taverns, distilleries, and farm-to-table dining. Fall foliage golf here is among the prettiest in the country.",
    population: "tiny",
    nearestAirport: {
      code: "ALB",
      name: "Albany International Airport",
      driveMinutes: 75,
    },
    bestSeasons: ["summer", "fall"],
    groceryNotes:
      "Shaws and Price Chopper in Manchester Center; Vermont state liquor agency stores for spirits",
    courses: [
      {
        name: "The Golf Club at Equinox",
        tier: "premium",
        greenFeeRange: [90, 165],
        holes: 18,
        par: 71,
        yardage: 6423,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.equinoxresort.com/southern_vt_golf/",
        highlight:
          "1927 Walter Travis design with undulating greens and Green Mountain views — Golf Digest Top-75 nod and the marquee round",
        googleRating: 4.5,
        rankNote: "Top 3 in Vermont — Golfweek",
      },
      {
        name: "Stratton Mountain Country Club",
        tier: "premium",
        greenFeeRange: [70, 140],
        holes: 27,
        par: 72,
        yardage: 6526,
        walkable: false,
        style: "mountain",
        driveMinutes: 30,
        highlight:
          "Geoffrey Cornish 27-hole mountain complex (Lake/Mountain/Forest nines) — variety for a multi-day group",
        googleRating: 4.4,
      },
      {
        name: "Dorset Field Club",
        tier: "solid",
        greenFeeRange: [60, 120],
        holes: 18,
        par: 71,
        yardage: 6206,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "America's oldest continuously operating golf club (1886) — classic, walkable, and a piece of history",
        googleRating: 4.5,
        rankNote: "Oldest golf club in continuous operation (1886)",
      },
      {
        name: "Tater Hill Golf Club (Windham)",
        tier: "solid",
        greenFeeRange: [45, 85],
        holes: 18,
        par: 72,
        yardage: 6651,
        walkable: true,
        style: "mountain",
        driveMinutes: 40,
        highlight:
          "Scenic, affordable mountain track near Chester — easy value round",
        googleRating: 4.4,
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [450, 1300],
        amenities: [
          "full kitchen",
          "hot tub",
          "fireplace",
          "mountain views",
          "deck",
        ],
        areaDescription:
          "Manchester / Dorset rental homes near the village and golf",
        searchUrl:
          "https://www.vrbo.com/search?destination=Manchester%2C+VT",
        notes:
          "Rent a big mountain home near Manchester Center for walkable dining and short drives to all the courses. Fall foliage weekends book out far ahead — reserve early.",
        avgRating: 4.7,
      },
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [300, 700],
        amenities: ["on-site golf", "spa", "multiple restaurants", "tavern"],
        areaDescription: "The Equinox Golf Resort & Spa in Manchester Village",
        searchUrl: "https://www.equinoxresort.com/",
        notes:
          "Block rooms at The Equinox for on-site golf, a historic main hotel, and an in-house tavern — minimal logistics.",
        avgRating: 4.4,
      },
    ],
    dining: [
      {
        name: "Chop House at The Equinox (Marsh Tavern)",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Historic tavern steakhouse at The Equinox — the cozy marquee dinner",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "The Silver Fork",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Intimate, acclaimed fine dining in Manchester for a special night",
        reservationNeeded: true,
        googleRating: 4.7,
      },
      {
        name: "The Crooked Ram",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Craft beer and wood-fired pizza in Manchester Center — relaxed group dinner",
        reservationNeeded: false,
        googleRating: 4.6,
      },
      {
        name: "Up For Breakfast",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Cult Manchester breakfast spot to fuel up before an early tee time",
        reservationNeeded: false,
        googleRating: 4.5,
      },
    ],
    bars: [
      {
        name: "Marsh Tavern",
        vibe: "whiskey-bar",
        highlight:
          "Colonial-era tavern bar at The Equinox — fireplaces, bourbon, and live music",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.5,
      },
      {
        name: "The Falcon Bar",
        vibe: "cocktail",
        highlight:
          "Clubby cocktail lounge at The Equinox with a billiards room",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.4,
      },
      {
        name: "Bonnet & Main",
        vibe: "cocktail",
        highlight:
          "Craft cocktail bar in Manchester Center — the village's go-to night spot",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
    ],
    activities: [
      {
        name: "Battenkill Fly Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [150, 300],
        groupFriendly: true,
        highlight:
          "Guided trout fishing on the legendary Battenkill — Orvis country, with the flagship Orvis store in town",
        bestFor: "morning before golf",
        provider: "Orvis / local guides",
      },
      {
        name: "Wilburton Clay Shooting",
        type: "skeet",
        duration: "2 hours",
        pricePerPerson: [80, 180],
        groupFriendly: true,
        highlight:
          "Sporting clays in the Green Mountains — a classic group morning",
        bestFor: "arrival day",
      },
      {
        name: "Vermont Distillery & Brewery Crawl",
        type: "distillery",
        duration: "half day",
        pricePerPerson: [40, 90],
        groupFriendly: true,
        highlight:
          "Hit local distilleries and breweries around Manchester and the Mad River corridor",
        bestFor: "rest day",
      },
      {
        name: "Land Rover Off-Road Experience",
        type: "atv",
        duration: "2-3 hours",
        pricePerPerson: [150, 300],
        groupFriendly: true,
        highlight:
          "Drive the Equinox off-road course up the mountain in Land Rovers",
        bestFor: "arrival day",
        provider: "The Equinox",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 24],
        hourlyRate: [110, 250],
        providers: [
          "Premiere Transportation (Albany)",
          "Green Mountain Transit charters",
        ],
        notes:
          "Courses are spread across southern Vermont, so book a shuttle for golf days and the village dinner run. Plan a charter for the ALB airport transfer.",
        fullDayRate: [800, 1700],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [90, 200],
        providers: ["Take a Chef", "Vermont private chefs", "Cozymeal"],
        mealTypes: ["steak dinner", "farm-to-table feast", "breakfast spread"],
        notes:
          "Vermont's farm-to-table scene makes a private-chef night a highlight — book a local chef for a steak or harvest dinner at the rental.",
      },
    ],
  },

  // ─── Roanoke, VA (Primland / Blue Ridge) ──────────────────────────
  {
    id: "roanoke-va",
    city: "Roanoke",
    state: "VA",
    region: "Northeast",
    tagline: "Mountaintop golf at Primland in the Blue Ridge",
    description:
      "The Roanoke / Blue Ridge corridor anchors a trip around Primland's Highland Course — the No. 1 public course in Virginia, perched on a 12,000-acre mountain estate. Add a city base in Roanoke with a real downtown brewery-and-bar scene, plus shooting, ATVs, and Parkway drives.",
    population: "medium",
    nearestAirport: {
      code: "ROA",
      name: "Roanoke-Blacksburg Regional Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "Kroger and ABC stores throughout Roanoke; stock in the city before heading up to Primland (~80 min)",
    courses: [
      {
        name: "The Highland Course at Primland",
        tier: "bucket-list",
        greenFeeRange: [175, 295],
        holes: 18,
        par: 72,
        yardage: 7053,
        walkable: false,
        style: "mountain",
        driveMinutes: 80,
        url: "https://auberge.com/primland/experiences/golf/",
        highlight:
          "Donald Steel mountaintop design ranked No. 1 public in Virginia — cliff-edge holes on a 12,000-acre Blue Ridge estate",
        googleRating: 4.8,
        hypeTag: "BUCKET LIST",
        rankNote: "No. 1 Public in VA — Golf Digest & Golfweek",
      },
      {
        name: "Ballyhack Golf Club (Roanoke)",
        tier: "premium",
        greenFeeRange: [120, 200],
        holes: 18,
        par: 72,
        yardage: 7741,
        walkable: true,
        style: "links",
        driveMinutes: 20,
        highlight:
          "Lester George big-scale links-style course in the hills near Roanoke — limited-access, so book through a stay-and-play",
        googleRating: 4.7,
      },
      {
        name: "Hanging Rock Golf Club (Salem)",
        tier: "premium",
        greenFeeRange: [50, 90],
        holes: 18,
        par: 72,
        yardage: 6828,
        walkable: false,
        style: "mountain",
        driveMinutes: 15,
        url: "https://www.hangingrockgolf.com/",
        highlight:
          "Russell Breeden mountain-valley design — the area's best daily-fee course and a strong value",
        googleRating: 4.5,
      },
      {
        name: "The River Course at Virginia Tech (Radford)",
        tier: "solid",
        greenFeeRange: [45, 80],
        holes: 18,
        par: 72,
        yardage: 7019,
        walkable: false,
        style: "parkland",
        driveMinutes: 40,
        highlight:
          "Pete Dye design along the New River — affordable, scenic, and surprisingly demanding",
        googleRating: 4.5,
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [350, 1000],
        amenities: ["full kitchen", "mountain views", "deck", "fire pit"],
        areaDescription:
          "Roanoke / Smith Mountain Lake rental homes for a city or lake base",
        searchUrl:
          "https://www.vrbo.com/search?destination=Roanoke%2C+VA",
        notes:
          "Base in Roanoke for downtown nightlife, or at Smith Mountain Lake for a lake house. Either way, plan one full day for the Primland round (~80 min each way).",
        avgRating: 4.6,
      },
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [500, 1500],
        amenities: [
          "on-site golf",
          "spa",
          "observatory",
          "shooting grounds",
          "fine dining",
        ],
        areaDescription: "Primland resort lodge and cottages on the mountain estate",
        searchUrl: "https://auberge.com/primland/",
        notes:
          "For the splurge, stay a night or two at Primland itself — on-site golf, sporting clays, an observatory, and tree-house cottages. Pricey but unforgettable.",
        avgRating: 4.7,
      },
    ],
    dining: [
      {
        name: "Frankie Rowland's Steakhouse",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Downtown Roanoke's marquee steakhouse — the group's big dinner night",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Lucky",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Buzzy small-plates spot in downtown Roanoke for a step up from bar food",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Martin's Downtown",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Beers, burgers, and live music in the heart of Roanoke's bar district",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "Texas Tavern",
        style: "casual",
        priceRange: "$",
        capacity: "small",
        highlight:
          "24-hour 10-stool greasy-spoon institution — a mandatory late-night chili-dog stop",
        reservationNeeded: false,
        googleRating: 4.6,
      },
    ],
    bars: [
      {
        name: "Big Lick Brewing Company",
        vibe: "brewpub",
        highlight:
          "Roomy downtown Roanoke brewery taproom — easy big-group hangout",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
      {
        name: "Stellina (rooftop)",
        vibe: "rooftop",
        highlight:
          "Downtown rooftop bar with skyline and mountain views",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.4,
      },
      {
        name: "The Coffee Pot",
        vibe: "honky-tonk",
        highlight:
          "Historic roadhouse music venue that's hosted everyone from Janis Joplin onward",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.5,
      },
    ],
    activities: [
      {
        name: "Primland Sporting Clays",
        type: "shooting",
        duration: "2-3 hours",
        pricePerPerson: [100, 250],
        groupFriendly: true,
        highlight:
          "Sporting clays across Primland's mountain estate — pair it with the Highland round",
        bestFor: "morning before golf",
        provider: "Primland",
      },
      {
        name: "Blue Ridge Parkway ATV / Off-Road",
        type: "atv",
        duration: "half day",
        pricePerPerson: [120, 250],
        groupFriendly: true,
        highlight:
          "Guided off-road tours through the mountains around Roanoke and Primland",
        bestFor: "arrival day",
      },
      {
        name: "Smith Mountain Lake Boat Day",
        type: "boat-rental",
        duration: "full day",
        pricePerPerson: [60, 150],
        groupFriendly: true,
        highlight:
          "Pontoon or wakeboard boat on Smith Mountain Lake ~40 min from Roanoke",
        bestFor: "rest day",
      },
      {
        name: "Roanoke Brewery Trail",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [40, 90],
        groupFriendly: true,
        highlight:
          "Hit Big Lick, Parkway, and Soaring Ridge on a downtown brewery loop",
        bestFor: "arrival day",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [12, 30],
        hourlyRate: [120, 280],
        providers: [
          "Star City Limo",
          "Roanoke Party Bus",
          "Mountain View Transportation",
        ],
        notes:
          "Book a bus for course days — Primland is a long haul and Ballyhack/River Course are spread out — plus the downtown Roanoke bar run.",
        fullDayRate: [900, 2000],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [85, 200],
        providers: ["Take a Chef", "Cozymeal", "Roanoke private chefs"],
        mealTypes: ["steak dinner", "Appalachian cookout", "breakfast spread"],
        notes:
          "Book a Roanoke-area private chef for a steak or mountain cookout at the rental or lake house — a great rest-night setup.",
      },
    ],
  },

  // ─── Frisco, TX (PGA Frisco / Fields Ranch) ───────────────────────
  {
    id: "frisco-tx",
    city: "Frisco",
    state: "TX",
    region: "South Central",
    tagline: "The new home of the PGA of America — two championship courses",
    description:
      "Frisco is the freshly minted golf capital of Texas: Omni PGA Frisco's Fields Ranch East and West (Gil Hanse / Beau Welling) headline a $520M complex with a 10-hole lit short course, a swim-up bar, and the PGA HQ. Add Dallas-suburb steakhouses, breweries, and a stacked entertainment district.",
    population: "medium",
    nearestAirport: {
      code: "DFW",
      name: "Dallas/Fort Worth International Airport",
      driveMinutes: 35,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "H-E-B, Tom Thumb, and Total Wine all within 10 min of most Frisco/Plano rentals",
    courses: [
      {
        name: "Fields Ranch East (Omni PGA Frisco)",
        tier: "bucket-list",
        greenFeeRange: [225, 330],
        holes: 18,
        par: 72,
        yardage: 7390,
        walkable: true,
        style: "links",
        driveMinutes: 10,
        url: "https://www.pgafrisco.com/golf/courses-programs/fields-ranch-east-west/",
        highlight:
          "Gil Hanse & Beau Welling tournament course — walking-only with caddies, slated to host PGA Championships and a Ryder Cup",
        googleRating: 4.6,
        hypeTag: "TOURNAMENT HOST",
        rankNote: "Future PGA Championship & Ryder Cup host",
      },
      {
        name: "Fields Ranch West (Omni PGA Frisco)",
        tier: "bucket-list",
        greenFeeRange: [175, 280],
        holes: 18,
        par: 72,
        yardage: 7199,
        walkable: false,
        style: "links",
        driveMinutes: 10,
        url: "https://www.pgafrisco.com/golf/courses-programs/fields-ranch-east-west/",
        highlight:
          "Beau Welling's swashbuckling, playable foil to the East — big roller-coaster greens and wide fairways",
        googleRating: 4.6,
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "The Swing (10-hole short course)",
        tier: "solid",
        greenFeeRange: [40, 90],
        holes: 10,
        par: 30,
        yardage: 1500,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.pgafrisco.com/golf/",
        highlight:
          "Lit 10-hole par-3 course with a putting course and swim-up bar — the ultimate sundown betting game",
        hypeTag: "HIDDEN GEM",
      },
      {
        name: "The Trails of Frisco Golf Club",
        tier: "solid",
        greenFeeRange: [45, 85],
        holes: 18,
        par: 71,
        yardage: 6904,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "Solid local daily-fee course in Frisco — easy value round to balance the resort fees",
        googleRating: 4.3,
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [12, 20],
        nightlyRange: [350, 1200],
        amenities: [
          "on-site golf",
          "lazy river",
          "swim-up bar",
          "multiple restaurants",
          "spa",
          "PGA HQ",
        ],
        areaDescription:
          "Omni PGA Frisco resort rooms and ranch houses on the golf complex",
        searchUrl:
          "https://www.omnihotels.com/hotels/pga-frisco",
        notes:
          "Block Omni rooms or one of the 4-bedroom ranch houses on-property — golf, pools, the lazy river, and dining are all walkable. Ranch houses are ideal for a tight crew.",
        avgRating: 4.6,
      },
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [400, 1200],
        amenities: ["private pool", "game room", "outdoor kitchen", "hot tub"],
        areaDescription:
          "Frisco / Plano / McKinney suburban rental homes with pools",
        searchUrl:
          "https://www.vrbo.com/search?destination=Frisco%2C+TX&groupSize=16",
        notes:
          "Plenty of big suburban homes with pools 10-20 min from PGA Frisco — cheaper than the resort and close to Legacy West and The Star nightlife.",
        avgRating: 4.6,
        bedsBreakdown: "5-6 bedroom homes sleep 12-16 at 2/bed",
      },
    ],
    dining: [
      {
        name: "Ryder (Omni PGA Frisco)",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "The resort's signature steakhouse — the on-property marquee dinner",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Del Frisco's Double Eagle (The Star)",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Power steakhouse at the Cowboys' Star district — clubby and built for big tables",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Hard Eight BBQ",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Pick-your-meat-off-the-pit Texas BBQ — a mandatory group lunch",
        reservationNeeded: false,
        googleRating: 4.5,
      },
      {
        name: "Mesero (Legacy West)",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Upscale Tex-Mex and margaritas in the Legacy West entertainment district",
        reservationNeeded: false,
        googleRating: 4.3,
      },
    ],
    bars: [
      {
        name: "The Lounge by Top Golf (The Colony)",
        vibe: "sports-bar",
        highlight:
          "Topgolf flagship nearby with a huge bar scene — peak group warm-up energy",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.4,
      },
      {
        name: "PGA Frisco Swim-Up Bar",
        vibe: "patio",
        highlight:
          "Swim-up bar beside the short course and lazy river — daytime drinking between rounds",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.5,
      },
      {
        name: "Legacy Hall (Plano)",
        vibe: "brewpub",
        highlight:
          "Three-story food hall and beer garden with live music in Legacy West — group HQ",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.4,
      },
      {
        name: "The Rustic (Dallas)",
        vibe: "honky-tonk",
        highlight:
          "Sprawling Texas patio bar with live country music ~30 min south",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.5,
      },
    ],
    activities: [
      {
        name: "Topgolf The Colony",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [35, 65],
        groupFriendly: true,
        highlight:
          "Flagship Topgolf for a competitive arrival-night warm-up",
        bestFor: "arrival day",
        provider: "Topgolf",
      },
      {
        name: "The Star (Cowboys HQ) Tour",
        type: "casino",
        duration: "2 hours",
        pricePerPerson: [30, 75],
        groupFriendly: true,
        highlight:
          "Tour the Dallas Cowboys' world HQ and practice facility in Frisco",
        bestFor: "rest day",
        provider: "The Star",
      },
      {
        name: "DFW Gun Range",
        type: "shooting",
        duration: "1-2 hours",
        pricePerPerson: [40, 120],
        groupFriendly: true,
        highlight:
          "Indoor ranges across the metro with big firearm selections",
        bestFor: "arrival day",
      },
      {
        name: "Lake Lewisville Boat Day",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [50, 130],
        groupFriendly: true,
        highlight:
          "Pontoon or party boat on Lake Lewisville ~25 min away",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 40],
        hourlyRate: [150, 350],
        providers: [
          "Dallas Party Bus",
          "Premier Transportation DFW",
          "Echo Limousine",
        ],
        notes:
          "Big DFW charter market. Book a bus for the spread-out courses and the Legacy West / The Star / Dallas bar runs. Traffic is real — pad timing.",
        fullDayRate: [1200, 2800],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 175],
        providers: ["Take a Chef", "Cozymeal", "DFW private chefs"],
        mealTypes: ["steak dinner", "Texas BBQ cookout", "breakfast spread"],
        notes:
          "Deep DFW private-chef market. A brisket-and-steak cookout at a pool house is a great Texas theme night between resort dinners.",
      },
    ],
  },

  // ─── New Braunfels, TX (Hill Country) ─────────────────────────────
  {
    id: "new-braunfels-tx",
    city: "New Braunfels",
    state: "TX",
    region: "South Central",
    tagline: "Tubing, beer halls, and Hill Country golf between Austin and San Antonio",
    description:
      "New Braunfels is the Hill Country's party town: tube the spring-fed Comal and Guadalupe rivers, drink at the world's largest river-fed beer scene, and play Hill Country golf at courses like The Bandit and Lakecliff. Halfway between Austin and San Antonio, it's a river-and-golf crew's dream.",
    population: "medium",
    nearestAirport: {
      code: "SAT",
      name: "San Antonio International Airport",
      driveMinutes: 35,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "H-E-B and Total Wine in New Braunfels; cooler/tube rentals everywhere for river days",
    courses: [
      {
        name: "The Bandit Golf Club",
        tier: "premium",
        greenFeeRange: [55, 95],
        holes: 18,
        par: 71,
        yardage: 6300,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.thebanditgolf.com/",
        highlight:
          "Keith Foster design along Lake McQueeney with Hill Country and water views — the area's most fun daily-fee track",
        googleRating: 4.5,
      },
      {
        name: "Lakecliff Country Club (Spring Branch)",
        tier: "premium",
        greenFeeRange: [70, 140],
        holes: 18,
        par: 72,
        yardage: 6817,
        walkable: false,
        style: "mountain",
        driveMinutes: 35,
        highlight:
          "Arnold Palmer design with rare bentgrass greens and dramatic Hill Country elevation — the splurge round",
        googleRating: 4.5,
      },
      {
        name: "Landa Park Golf at Comal Springs",
        tier: "solid",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 71,
        yardage: 6038,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.landaparkgolfcourse.com/",
        highlight:
          "Walkable municipal course along the spring-fed Comal River in town — a fun, cheap value round",
        googleRating: 4.4,
      },
      {
        name: "Vaaler Creek Golf Club (Blanco)",
        tier: "solid",
        greenFeeRange: [40, 75],
        holes: 18,
        par: 72,
        yardage: 6924,
        walkable: false,
        style: "mountain",
        driveMinutes: 45,
        highlight:
          "Scenic Hill Country layout near Blanco with big elevation and few crowds",
        googleRating: 4.4,
      },
    ],
    lodging: [
      {
        type: "lakehouse",
        sleeps: [12, 18],
        nightlyRange: [400, 1400],
        amenities: [
          "river/lake access",
          "private pool",
          "hot tub",
          "outdoor kitchen",
          "fire pit",
        ],
        areaDescription:
          "Riverfront and Hill Country homes along the Comal/Guadalupe and Lake McQueeney",
        searchUrl:
          "https://www.vrbo.com/search?destination=New+Braunfels%2C+TX&groupSize=16",
        notes:
          "Get a riverfront or lake house so you can tube and cookout from the doorstep. Summer weekends book out months ahead — reserve early.",
        avgRating: 4.6,
        bedsBreakdown: "5-6 bedroom river homes sleep 12-16 at 2/bed",
      },
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [250, 600],
        amenities: ["water park access", "pool", "multiple rooms", "lazy river"],
        areaDescription: "Schlitterbahn-area resorts and hotels in New Braunfels",
        searchUrl:
          "https://www.vrbo.com/search?destination=New+Braunfels%2C+TX",
        notes:
          "If the crew wants the waterpark angle, base near Schlitterbahn. Otherwise a river house beats a hotel for this trip.",
        avgRating: 4.3,
      },
    ],
    dining: [
      {
        name: "McAdoo's Seafood Company",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Gulf seafood in a historic downtown post office building — a solid group dinner",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Gristmill River Restaurant (Gruene)",
        style: "southern",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Iconic riverside Texas spot in historic Gruene — burgers, ribs, and a big deck over the Guadalupe",
        reservationNeeded: false,
        googleRating: 4.5,
      },
      {
        name: "Krause's Biergarten",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Massive beer hall with 70+ taps and German-Texan fare — built for big rowdy groups",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "Buttermilk Cafe",
        style: "casual",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Big Texas breakfast to fuel up before an early tee time or river day",
        reservationNeeded: false,
        googleRating: 4.5,
      },
    ],
    bars: [
      {
        name: "Gruene Hall",
        vibe: "honky-tonk",
        highlight:
          "Texas's oldest dance hall (1878) with live music nightly — a bucket-list bar night",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.8,
      },
      {
        name: "Phoenix Saloon",
        vibe: "saloon",
        highlight:
          "Historic downtown saloon — the spot that claims to have invented the cheeseburger",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
      {
        name: "Krause's Biergarten Bar",
        vibe: "patio",
        highlight:
          "70-plus taps and a giant patio — the go-to big-group drinking spot",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.4,
      },
    ],
    activities: [
      {
        name: "Comal / Guadalupe River Tubing",
        type: "water-sports",
        duration: "3-4 hours",
        pricePerPerson: [20, 40],
        groupFriendly: true,
        highlight:
          "Float the spring-fed rivers with a cooler of beers — the centerpiece of any New Braunfels trip",
        bestFor: "rest day",
        provider: "Rockin' R River Rides",
      },
      {
        name: "Lake McQueeney Boat & Wakeboard Day",
        type: "boat-rental",
        duration: "full day",
        pricePerPerson: [60, 150],
        groupFriendly: true,
        highlight:
          "Wakeboard boat or pontoon on Lake McQueeney near The Bandit",
        bestFor: "rest day",
      },
      {
        name: "Natural Bridge Hill Country Shooting",
        type: "shooting",
        duration: "2 hours",
        pricePerPerson: [50, 130],
        groupFriendly: true,
        highlight:
          "Sporting clays and ranges in the Hill Country around New Braunfels",
        bestFor: "arrival day",
      },
      {
        name: "Hill Country Winery & Distillery Tour",
        type: "winery",
        duration: "half day",
        pricePerPerson: [50, 120],
        groupFriendly: true,
        highlight:
          "Run the wineries and distilleries between New Braunfels and Fredericksburg",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 40],
        hourlyRate: [150, 320],
        providers: [
          "San Antonio Party Bus",
          "New Braunfels Limousine",
          "Texas Party Bus Co.",
        ],
        notes:
          "San Antonio and Austin operators serve the area. Book a bus for the tubing shuttle, Gruene Hall nights, and spread-out Hill Country courses. Summer books up fast.",
        fullDayRate: [1100, 2600],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 160],
        providers: ["Take a Chef", "Cozymeal", "Hill Country private chefs"],
        mealTypes: ["Texas BBQ cookout", "steak dinner", "fajita fiesta"],
        notes:
          "A brisket-and-fajita cookout on the river-house patio is the move. Strong Hill Country private-chef and caterer market out of San Antonio and Austin.",
      },
    ],
  },

  // ─── Corpus Christi, TX (Coastal Bend) ────────────────────────────
  {
    id: "corpus-christi-tx",
    city: "Corpus Christi",
    state: "TX",
    region: "South Central",
    tagline: "Coastal Texas golf, deep-sea fishing, and beach-bar nights",
    description:
      "Corpus Christi is the Texas Gulf at its most laid-back: windswept island golf, world-class deep-sea fishing, beach bars on North Padre, and fresh Gulf seafood. A coastal change of pace for a crew that wants golf, water, and a beach-town vibe.",
    population: "medium",
    nearestAirport: {
      code: "CRP",
      name: "Corpus Christi International Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "H-E-B and Total Wine in town; stock the beach house before heading to Padre Island",
    courses: [
      {
        name: "Padre Isles Country Club",
        tier: "premium",
        greenFeeRange: [55, 90],
        holes: 18,
        par: 72,
        yardage: 6907,
        walkable: false,
        style: "coastal",
        driveMinutes: 20,
        url: "https://www.padreislescc.org/",
        highlight:
          "Bruce Devlin / Robert von Hagge island course on North Padre with canals, wind, and Gulf breezes — the marquee round",
        googleRating: 4.3,
      },
      {
        name: "The Club at Rockport Country Club",
        tier: "solid",
        greenFeeRange: [45, 80],
        holes: 18,
        par: 71,
        yardage: 6532,
        walkable: false,
        style: "coastal",
        driveMinutes: 35,
        highlight:
          "Breezy coastal course up the bay in Rockport — easy second round paired with a fishing day",
        googleRating: 4.3,
      },
      {
        name: "Oso Beach Municipal Golf Course",
        tier: "solid",
        greenFeeRange: [25, 45],
        holes: 18,
        par: 70,
        yardage: 6225,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.osobeachgolf.com/",
        highlight:
          "Walkable, well-kept muni along Oso Bay in town — a fun, cheap value round",
        googleRating: 4.2,
      },
      {
        name: "Gabe Lozano Sr. Golf Center",
        tier: "budget",
        greenFeeRange: [20, 40],
        holes: 18,
        par: 72,
        yardage: 6900,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "City muni with a long championship layout and a lit short course — budget golf with a sundown option",
        googleRating: 4.1,
      },
    ],
    lodging: [
      {
        type: "lakehouse",
        sleeps: [12, 18],
        nightlyRange: [400, 1500],
        amenities: [
          "beach/canal access",
          "private dock",
          "pool",
          "deck",
          "boat parking",
        ],
        areaDescription:
          "North Padre Island canal and beachfront homes near Padre Isles",
        searchUrl:
          "https://www.vrbo.com/search?destination=North+Padre+Island%2C+TX&groupSize=16",
        notes:
          "A Padre Island canal home with a dock lets you fish and boat from the doorstep, with the golf course minutes away. Summer is peak — book early.",
        avgRating: 4.5,
        bedsBreakdown: "5-6 bedroom island homes sleep 12-16 at 2/bed",
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [300, 800],
        amenities: ["pool", "full kitchen", "near beach", "garage"],
        areaDescription:
          "Mustang Island / Port Aransas rental homes ~25 min north",
        searchUrl:
          "https://www.vrbo.com/search?destination=Port+Aransas%2C+TX",
        notes:
          "Port Aransas adds a livelier beach-town nightlife and charter-fishing fleet. Take the ferry over for a fishing day.",
        avgRating: 4.5,
      },
    ],
    dining: [
      {
        name: "Water Street Oyster Bar",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Downtown Gulf-seafood institution — oysters, blackened fish, and a big bar",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Republic of Texas Bar & Grill",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Top-floor steakhouse with bayfront skyline views — the splurge dinner",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Snoopy's Pier",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Casual waterfront fried-seafood joint on the JFK causeway — sunset beers and shrimp",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "Cassidy's Irish Pub",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Roomy pub with TVs and a patio — easy casual group night downtown",
        reservationNeeded: false,
        googleRating: 4.4,
      },
    ],
    bars: [
      {
        name: "Executive Surf Club",
        vibe: "dive",
        highlight:
          "Marina-district live-music bar with a laid-back beach-town crowd",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.4,
      },
      {
        name: "Brewster Street Ice House",
        vibe: "honky-tonk",
        highlight:
          "Big indoor-outdoor live-music ice house — the go-to group party venue",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
      {
        name: "Padre Island Burger Company / beach bars",
        vibe: "patio",
        highlight:
          "Cluster of casual beach bars on North Padre for post-round Gulf-side drinks",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.2,
      },
    ],
    activities: [
      {
        name: "Deep-Sea / Bay Fishing Charter",
        type: "fishing",
        duration: "full day",
        pricePerPerson: [125, 300],
        groupFriendly: true,
        highlight:
          "Run offshore for red snapper, kingfish, and tuna, or fish the bay for reds and trout — the trip's signature day",
        bestFor: "rest day",
        provider: "Port Aransas / Corpus charter fleet",
      },
      {
        name: "Padre Island Boat & Jet Ski Rental",
        type: "water-sports",
        duration: "half day",
        pricePerPerson: [50, 130],
        groupFriendly: true,
        highlight:
          "Jet skis, pontoons, and Laguna Madre runs from the island marinas",
        bestFor: "rest day",
      },
      {
        name: "USS Lexington Museum",
        type: "casino",
        duration: "2-3 hours",
        pricePerPerson: [20, 40],
        groupFriendly: true,
        highlight:
          "Tour the WWII aircraft carrier 'Blue Ghost' moored in the bay — a unique arrival-day stop",
        bestFor: "arrival day",
        provider: "USS Lexington",
      },
      {
        name: "Mustang Island Kayak / Beach Day",
        type: "kayaking",
        duration: "half day",
        pricePerPerson: [40, 90],
        groupFriendly: true,
        highlight:
          "Paddle the Mustang Island paddling trail or just claim a stretch of beach",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [12, 32],
        hourlyRate: [130, 300],
        providers: [
          "Corpus Christi Party Bus",
          "Coastal Bend Limousine",
          "South Texas Charters",
        ],
        notes:
          "Book a bus for the spread-out coastal courses, the Port Aransas ferry-and-fishing run, and downtown marina bars. Beach traffic spikes summer weekends.",
        fullDayRate: [1000, 2400],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 175],
        providers: ["Take a Chef", "Cozymeal", "Coastal Bend private chefs"],
        mealTypes: ["fresh-catch seafood boil", "steak dinner", "shrimp & grits"],
        notes:
          "Have a chef cook your charter catch at the beach house — a fresh-fish or shrimp boil on the deck is the high point of a Corpus trip.",
      },
    ],
  },

  // ─── Bentonville, AR (Northwest Arkansas) ─────────────────────────
  {
    id: "bentonville-ar",
    city: "Bentonville",
    state: "AR",
    region: "South Central",
    tagline: "Ozark golf and the country's best mountain biking, with a buzzing downtown",
    description:
      "Bentonville is Northwest Arkansas's surprise hit: Big Sugar Golf Club anchors a quietly strong golf scene, downtown has a genuinely good food-and-bar square, and the area is the mountain-biking capital of the world. Golf, MTB, and a foodie downtown make it a sleeper buddy-trip pick.",
    population: "medium",
    nearestAirport: {
      code: "XNA",
      name: "Northwest Arkansas National Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "Walmart Neighborhood Market everywhere (it's HQ), plus a downtown liquor store — easy stocking",
    courses: [
      {
        name: "Big Sugar Golf Club (Pea Ridge)",
        tier: "premium",
        greenFeeRange: [40, 90],
        holes: 18,
        par: 72,
        yardage: 7201,
        walkable: true,
        style: "links",
        driveMinutes: 20,
        url: "https://bigsugargolf.com/",
        highlight:
          "Beau Welling & Hanse-style rugged public course through the Ozark hills — the area's must-play and a great value",
        googleRating: 4.7,
        hypeTag: "HIDDEN GEM",
      },
      {
        name: "Blessings Golf Club (Fayetteville)",
        tier: "bucket-list",
        greenFeeRange: [120, 250],
        holes: 18,
        par: 72,
        yardage: 7805,
        walkable: false,
        style: "mountain",
        driveMinutes: 40,
        highlight:
          "Robert Trent Jones Jr. monster that hosted the NCAA Championships — limited public access via stay-and-play, but a brute worth chasing",
        googleRating: 4.6,
        rankNote: "Former NCAA Championship host",
      },
      {
        name: "Lost Springs Golf & Athletic Club",
        tier: "solid",
        greenFeeRange: [40, 75],
        holes: 18,
        par: 71,
        yardage: 6500,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "Rolling Ozark daily-fee course near downtown Rogers — easy second round",
        googleRating: 4.3,
      },
      {
        name: "Branchwood / Bella Vista courses",
        tier: "solid",
        greenFeeRange: [35, 70],
        holes: 18,
        par: 72,
        yardage: 6700,
        walkable: false,
        style: "mountain",
        driveMinutes: 20,
        highlight:
          "The Bella Vista club network's hilly Ozark tracks — fun, affordable variety north of town",
        googleRating: 4.2,
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [350, 1100],
        amenities: [
          "full kitchen",
          "deck",
          "near downtown",
          "garage",
          "fire pit",
        ],
        areaDescription:
          "Bentonville / Rogers rental homes near the downtown square and bike trails",
        searchUrl:
          "https://www.vrbo.com/search?destination=Bentonville%2C+AR&groupSize=16",
        notes:
          "Stay near the Bentonville square for walkable dining and bars, with quick drives to golf and the world-class trail network at your doorstep.",
        avgRating: 4.6,
      },
      {
        type: "lakehouse",
        sleeps: [10, 16],
        nightlyRange: [300, 900],
        amenities: ["lake access", "dock", "deck", "fire pit", "boat parking"],
        areaDescription:
          "Beaver Lake homes ~25 min from Bentonville for a lake base",
        searchUrl:
          "https://www.vrbo.com/search?destination=Beaver+Lake%2C+AR",
        notes:
          "Add a Beaver Lake house if the crew wants a boat day — clear Ozark water, great for a rest day between rounds.",
        avgRating: 4.6,
      },
    ],
    dining: [
      {
        name: "The Hive",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Acclaimed 'high south' restaurant at the 21c hotel — the marquee dinner downtown",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Tusk & Trotter",
        style: "southern",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Whole-hog Southern cooking and craft beer on the square — a great group night",
        reservationNeeded: false,
        googleRating: 4.5,
      },
      {
        name: "Wright's Barbecue",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Texas-style brisket that draws lines — the mandatory BBQ lunch",
        reservationNeeded: false,
        googleRating: 4.7,
      },
      {
        name: "Pressroom",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "All-day cafe and bar on the square — easy breakfasts and casual dinners",
        reservationNeeded: false,
        googleRating: 4.4,
      },
    ],
    bars: [
      {
        name: "Bike Rack Brewing Co.",
        vibe: "brewpub",
        highlight:
          "Bentonville's flagship brewery taproom — roomy and built for groups",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
      {
        name: "The Undercroft",
        vibe: "cocktail",
        highlight:
          "Hidden basement speakeasy off the square — a cool late-night cocktail spot",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
      {
        name: "Pedaler's Pub",
        vibe: "sports-bar",
        highlight:
          "Bike-themed pub with patio and TVs — the casual après-ride/round hangout",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.4,
      },
    ],
    activities: [
      {
        name: "Mountain Biking the Coler / Slaughter Pen Trails",
        type: "mountain-biking",
        duration: "half day",
        pricePerPerson: [50, 120],
        groupFriendly: true,
        highlight:
          "Ride the world-renowned NWA trail network with rentals and shuttle — the area's signature activity",
        bestFor: "rest day",
        provider: "Phat Tire Bike Shop",
      },
      {
        name: "Beaver Lake Boat Day",
        type: "boat-rental",
        duration: "full day",
        pricePerPerson: [60, 150],
        groupFriendly: true,
        highlight:
          "Pontoon or wakeboard boat on clear Beaver Lake ~25 min away",
        bestFor: "rest day",
      },
      {
        name: "NWA Sporting Clays",
        type: "shooting",
        duration: "2 hours",
        pricePerPerson: [50, 130],
        groupFriendly: true,
        highlight:
          "Sporting clays and ranges in the Ozark hills around Bentonville",
        bestFor: "arrival day",
      },
      {
        name: "Crystal Bridges Museum",
        type: "casino",
        duration: "2-3 hours",
        pricePerPerson: [0, 30],
        groupFriendly: true,
        highlight:
          "World-class (and free) American art museum in a striking Moshe Safdie building — an easy rest-day culture stop",
        bestFor: "rest day",
        provider: "Crystal Bridges",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [12, 30],
        hourlyRate: [120, 280],
        providers: [
          "NWA Party Bus",
          "Razorback Limousine",
          "Ozark Mountain Transportation",
        ],
        notes:
          "Book a bus for golf days (courses are spread across the metro) plus the downtown square and Beaver Lake runs. Compact area keeps transport costs reasonable.",
        fullDayRate: [900, 2000],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 175],
        providers: ["Take a Chef", "Cozymeal", "NWA private chefs"],
        mealTypes: ["steak dinner", "Ozark BBQ cookout", "breakfast spread"],
        notes:
          "Growing NWA food scene means solid private-chef options — a steak or whole-hog cookout at the rental is an easy group win.",
      },
    ],
  },

  // ─── Bowling Green, KY (Cave Country) ─────────────────────────────
  {
    id: "bowling-green-ky",
    city: "Bowling Green",
    state: "KY",
    region: "South Central",
    tagline: "Corvettes, caves, bourbon, and a sneaky-good golf scene",
    description:
      "Bowling Green is South-Central Kentucky's value play: the championship CrossWinds muni, the nearby private Arthur Hills gem at Olde Stone, the National Corvette Museum and track, Mammoth Cave, and an easy hop onto the Bourbon Trail. A different, gearhead-friendly golf weekend.",
    population: "medium",
    nearestAirport: {
      code: "BNA",
      name: "Nashville International Airport",
      driveMinutes: 70,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "Kroger and Houchens in town; KY package stores for bourbon — stock before a cabin stay",
    courses: [
      {
        name: "CrossWinds Golf Course",
        tier: "premium",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 72,
        yardage: 6766,
        walkable: true,
        style: "links",
        driveMinutes: 10,
        url: "https://www.bgky.org/golf/crosswinds",
        highlight:
          "Award-winning municipal links with some of the biggest bunkers in Kentucky — the area's best public course and an unreal value",
        googleRating: 4.5,
        hypeTag: "BEST VALUE",
      },
      {
        name: "Olde Stone (semi-private guest play)",
        tier: "bucket-list",
        greenFeeRange: [100, 175],
        holes: 18,
        par: 72,
        yardage: 7440,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.olde-stone.com/",
        highlight:
          "Arthur Hills design that consistently tops Kentucky's rankings — private, so chase it via a member or stay-and-play",
        googleRating: 4.7,
        rankNote: "Top course in Kentucky",
      },
      {
        name: "Paul Walker Golf Course",
        tier: "solid",
        greenFeeRange: [25, 45],
        holes: 18,
        par: 71,
        yardage: 6400,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        highlight:
          "Second city muni — walkable and cheap, an easy second round of the day",
        googleRating: 4.2,
      },
      {
        name: "Park Mammoth Resort Golf (Park City)",
        tier: "solid",
        greenFeeRange: [30, 60],
        holes: 18,
        par: 72,
        yardage: 6400,
        walkable: false,
        style: "mountain",
        driveMinutes: 25,
        highlight:
          "Rolling course near Mammoth Cave — pair it with a cave tour and zipline day",
        googleRating: 4.2,
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [300, 900],
        amenities: ["full kitchen", "deck", "pool", "garage", "fire pit"],
        areaDescription:
          "Bowling Green rental homes near downtown and the courses",
        searchUrl:
          "https://www.vrbo.com/search?destination=Bowling+Green%2C+KY&groupSize=16",
        notes:
          "Big suburban homes are reasonably priced here. Base in town for downtown bars and short drives to golf, the Corvette Museum, and Mammoth Cave.",
        avgRating: 4.5,
      },
      {
        type: "cabin",
        sleeps: [10, 16],
        nightlyRange: [250, 700],
        amenities: ["hot tub", "fire pit", "deck", "near caves", "game room"],
        areaDescription:
          "Cave Country / Barren River Lake cabins ~30 min from town",
        searchUrl:
          "https://www.vrbo.com/search?destination=Cave+City%2C+KY",
        notes:
          "Add a Cave Country cabin near Mammoth Cave and Barren River Lake for a quieter base with a lake-day option.",
        avgRating: 4.5,
      },
    ],
    dining: [
      {
        name: "Mariah's Restaurant",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Historic-home fine dining downtown — the marquee group dinner",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Hickory & Oak",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Wood-fired steaks and chops — a solid big-table dinner option",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Smokey Bones / local BBQ",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Kentucky smoked meats for the mandatory BBQ lunch between rounds",
        reservationNeeded: false,
        googleRating: 4.2,
      },
      {
        name: "Mellow Mushroom",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Pizza and a big beer list near downtown — easy casual group night",
        reservationNeeded: false,
        googleRating: 4.3,
      },
    ],
    bars: [
      {
        name: "White Squirrel Brewery",
        vibe: "brewpub",
        highlight:
          "Downtown Bowling Green brewery with a roomy taproom and patio — group HQ",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
      {
        name: "Tidballs",
        vibe: "dive",
        highlight:
          "Beloved divey live-music bar near WKU — late-night character",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
      {
        name: "Steamer Seafood Bar",
        vibe: "patio",
        highlight:
          "Casual downtown bar-and-patio crowd — easy post-round drinks",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.3,
      },
    ],
    activities: [
      {
        name: "National Corvette Museum & Motorsports Park",
        type: "go-karts",
        duration: "half day",
        pricePerPerson: [30, 200],
        groupFriendly: true,
        highlight:
          "Tour the Corvette Museum and assembly plant, then rip laps or karts at the NCM Motorsports Park — the trip's signature gearhead day",
        bestFor: "rest day",
        provider: "National Corvette Museum",
      },
      {
        name: "Mammoth Cave Tour",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [20, 60],
        groupFriendly: true,
        highlight:
          "Explore the world's longest cave system ~30 min north — a unique rest-day activity",
        bestFor: "rest day",
        provider: "Mammoth Cave National Park",
      },
      {
        name: "Kentucky Bourbon Trail Day Trip",
        type: "distillery",
        duration: "full day",
        pricePerPerson: [60, 150],
        groupFriendly: true,
        highlight:
          "Hit Maker's Mark and nearby distilleries on a Bourbon Trail loop from Bowling Green",
        bestFor: "rest day",
      },
      {
        name: "Barren River Lake Boat Day",
        type: "boat-rental",
        duration: "full day",
        pricePerPerson: [50, 130],
        groupFriendly: true,
        highlight:
          "Pontoon or ski boat on Barren River Lake ~30 min from town",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [12, 30],
        hourlyRate: [120, 280],
        providers: [
          "Bowling Green Limousine",
          "Nashville Party Bus (for BNA transfers)",
          "Kentucky Charters",
        ],
        notes:
          "Book a bus for golf days, the Corvette/Mammoth runs, and downtown bars. For the BNA airport transfer (~70 min), a Nashville charter is easiest.",
        fullDayRate: [900, 2000],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 160],
        providers: ["Take a Chef", "Cozymeal", "South-Central KY private chefs"],
        mealTypes: ["steak dinner", "Kentucky BBQ cookout", "breakfast spread"],
        notes:
          "Book a local private chef for a steak-and-bourbon night at the rental or cabin — a fitting cap to a Kentucky golf weekend.",
      },
    ],
  },
];
