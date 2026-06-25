import { Destination } from "./types";

// ── Tour de Fore — International Golf-Trip Destinations ──
// Region: "International" (new region wired separately in the Region union).
// USD-equivalent green fees & nightly ranges (GBP×~1.27, EUR×~1.08).
// state field = country/region. nearestAirport = real international airport.
// Real, verifiable courses only. Where a 2026 Google rating could not be
// reliably confirmed it is omitted rather than fabricated.

export const internationalDestinations: Destination[] = [
  {
    id: "st-andrews-scotland",
    city: "St Andrews",
    state: "Scotland",
    region: "International",
    tagline: "The Home of Golf — bucket-list pilgrimage on the Fife coast",
    description:
      "Where the game was born. Walk the Swilcan Bridge on the Old Course, play four more Links Trust courses plus Kingsbarns and Carnoustie nearby, then pile into a 300-malt pub. The single most important golf trip a foursome can take.",
    population: "small",
    nearestAirport: {
      code: "EDI",
      name: "Edinburgh Airport",
      driveMinutes: 75,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "Tesco and Morrisons in town; Luvians Bottle Shop for whisky. Most rentals are walkable to the courses and pubs.",
    courses: [
      {
        name: "Old Course at St Andrews",
        tier: "bucket-list",
        greenFeeRange: [420, 440],
        holes: 18,
        par: 72,
        yardage: 6721,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://www.standrews.com",
        highlight:
          "The Home of Golf — Swilcan Bridge, the Road Hole, and the Valley of Sin. Closed Sundays; book via the ballot or advance reservation",
        hypeTag: "BUCKET LIST",
        rankNote: "Open Championship venue — 30+ times",
      },
      {
        name: "New Course at St Andrews",
        tier: "premium",
        greenFeeRange: [180, 215],
        holes: 18,
        par: 71,
        yardage: 6625,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://www.standrews.com",
        highlight:
          "Old Tom Morris 1895 design that many locals quietly prefer to the Old Course",
        hypeTag: "LOCALS' FAVORITE",
      },
      {
        name: "Jubilee Course at St Andrews",
        tier: "premium",
        greenFeeRange: [180, 215],
        holes: 18,
        par: 72,
        yardage: 6742,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://www.standrews.com",
        highlight:
          "The toughest of the Links Trust courses — closest to the sea and most exposed to the wind",
      },
      {
        name: "Kingsbarns Golf Links",
        tier: "bucket-list",
        greenFeeRange: [505, 620],
        holes: 18,
        par: 72,
        yardage: 7227,
        walkable: true,
        style: "links",
        driveMinutes: 15,
        url: "https://www.kingsbarns.com",
        highlight:
          "Modern links where every single hole has a sea view — a Dunhill Links Championship venue",
        hypeTag: "BUCKET LIST",
        rankNote: "Top 100 in the World — multiple panels",
      },
      {
        name: "Carnoustie Golf Links (Championship)",
        tier: "bucket-list",
        greenFeeRange: [455, 460],
        holes: 18,
        par: 72,
        yardage: 6945,
        walkable: true,
        style: "links",
        driveMinutes: 50,
        url: "https://www.carnoustiegolflinks.com",
        highlight:
          '"Carnasty" — widely considered the toughest finish in Open Championship golf',
        hypeTag: "TOURNAMENT HOST",
        rankNote: "Open Championship venue",
      },
      {
        name: "Castle Course at St Andrews",
        tier: "premium",
        greenFeeRange: [215, 235],
        holes: 18,
        par: 71,
        yardage: 6759,
        walkable: true,
        style: "links",
        driveMinutes: 8,
        url: "https://www.standrews.com",
        highlight:
          "Dramatic 2008 clifftop course with sweeping views back across the bay to the town",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [12, 18],
        nightlyRange: [655, 865],
        amenities: [
          "on-site golf",
          "spa",
          "multiple restaurants",
          "Road Hole views",
          "concierge",
        ],
        areaDescription:
          "Old Course Hotel — five-star property overlooking the famous Road Hole, steps from the first tee",
        searchUrl: "https://www.oldcoursehotel.co.uk",
        notes:
          "Book a block of rooms at the Old Course Hotel for the full pilgrimage experience. Per-room pricing makes it workable for a group; on-property dining simplifies logistics.",
        avgRating: 4.6,
      },
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [400, 1200],
        amenities: [
          "town-center location",
          "full kitchen",
          "walkable to courses",
          "walkable to pubs",
        ],
        areaDescription:
          "Town-center stone townhouses and apartments within walking distance of the Old Course and the pubs",
        searchUrl: "https://www.airbnb.com/st-andrews-united-kingdom/stays",
        notes:
          "Plenty of multi-bedroom townhouses in the old town — the move for a self-catering group that wants to walk everywhere. Book a year ahead for Dunhill Links week.",
        avgRating: 4.7,
      },
    ],
    dining: [
      {
        name: "The Seafood Ristorante",
        style: "seafood",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Glass-walled dining room over the West Sands with Italian-leaning seafood and sunset views",
        reservationNeeded: true,
        googleRating: 4.3,
      },
      {
        name: "Haar",
        style: "upscale",
        priceRange: "$$$",
        capacity: "small",
        highlight:
          "Chef Dean Banks' modern Scottish tasting menus — the town's serious foodie reservation",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Mitchells St Andrews",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "All-day British brasserie that easily handles a hungry foursome after 36 holes",
        reservationNeeded: false,
        googleRating: 4.1,
      },
    ],
    bars: [
      {
        name: "The Dunvegan Hotel Bar",
        vibe: "whiskey-bar",
        highlight:
          'The famous "19th hole" — walls plastered with golf memorabilia and the caddie crowd',
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Keys Bar",
        vibe: "whiskey-bar",
        highlight:
          "Pub serving since 1858 with 300+ single malts behind the bar",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Central Bar",
        vibe: "dive",
        highlight:
          "Classic town pub pulling Belhaven ales — the no-frills local where everyone ends up",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Luvians Whisky Tasting",
        type: "distillery",
        duration: "1-2 hours",
        pricePerPerson: [30, 70],
        groupFriendly: true,
        highlight:
          "Guided single-malt flights at the town's legendary bottle shop — perfect arrival-night warm-up",
        bestFor: "arrival day",
        provider: "Luvians Bottle Shop",
      },
      {
        name: "Fife Coastal Path & St Andrews Castle",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [10, 15],
        groupFriendly: true,
        highlight:
          "Walk the cliff path to the ruined castle and cathedral on a rare non-golf morning",
        bestFor: "rest day",
        provider: "Historic Environment Scotland",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [4, 16],
        hourlyRate: [80, 150],
        providers: ["St Andrews Shuttle", "Fife Golf Travel"],
        notes:
          "Dedicated golf shuttles with bag space run players between St Andrews, Kingsbarns and Carnoustie. Book the full-day driver — far easier than parking at each course.",
        fullDayRate: [500, 900],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [90, 150],
        providers: ["Take a Chef", "Fife Private Dining"],
        mealTypes: ["Scottish steak dinner", "seafood spread", "full breakfast"],
        notes:
          "Book an in-villa chef for a steak-and-whisky night at the rental — a great alternative to fighting for a 16-top in town. Book 2+ weeks ahead.",
      },
    ],
  },
  {
    id: "troon-ayrshire-scotland",
    city: "Troon",
    state: "Scotland",
    region: "International",
    tagline: "Ayrshire's Open links — Royal Troon, Turnberry, and Prestwick",
    description:
      "Scotland's west-coast links coast. Royal Troon's Postage Stamp, Turnberry's clifftop Ailsa, and Prestwick — birthplace of the Open in 1860 — all within a short drive of each other. Raw, windswept, bucket-list golf.",
    population: "small",
    nearestAirport: {
      code: "GLA",
      name: "Glasgow Airport",
      driveMinutes: 40,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "Tesco and Morrisons in Troon and Ayr; whisky everywhere. Prestwick Airport (PIK) is ~10 min if flying in regional.",
    courses: [
      {
        name: "Royal Troon Golf Club (Old Course)",
        tier: "bucket-list",
        greenFeeRange: [300, 360],
        holes: 18,
        par: 71,
        yardage: 7261,
        walkable: true,
        style: "links",
        driveMinutes: 5,
        url: "https://www.royaltroon.co.uk",
        highlight:
          'Host of the 2024 Open and home of the "Postage Stamp" 8th — the most famous par 3 in Britain',
        hypeTag: "TOURNAMENT HOST",
        rankNote: "Open Championship venue — 2024",
      },
      {
        name: "Trump Turnberry (Ailsa Course)",
        tier: "bucket-list",
        greenFeeRange: [600, 660],
        holes: 18,
        par: 71,
        yardage: 7489,
        walkable: true,
        style: "links",
        driveMinutes: 35,
        url: "https://www.turnberry.co.uk",
        highlight:
          'Clifftop "Duel in the Sun" links beneath the lighthouse — routinely ranked top-10 in the world',
        hypeTag: "BUCKET LIST",
        rankNote: "Top 10 in the World — multiple panels",
      },
      {
        name: "Prestwick Golf Club",
        tier: "bucket-list",
        greenFeeRange: [400, 432],
        holes: 18,
        par: 71,
        yardage: 6908,
        walkable: true,
        style: "links",
        driveMinutes: 12,
        url: "https://www.prestwickgc.co.uk",
        highlight:
          "Birthplace of the Open Championship (1860) — blind shots, stone walls, and history on every hole",
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "Western Gailes Golf Club",
        tier: "premium",
        greenFeeRange: [254, 286],
        holes: 18,
        par: 71,
        yardage: 7014,
        walkable: true,
        style: "links",
        driveMinutes: 10,
        url: "https://www.westerngailes.com",
        highlight:
          "Pure traditional out-and-back links squeezed between the railway and the sea — a hidden gem",
        hypeTag: "HIDDEN GEM",
      },
      {
        name: "Dundonald Links",
        tier: "premium",
        greenFeeRange: [430, 546],
        holes: 18,
        par: 72,
        yardage: 7300,
        walkable: true,
        style: "links",
        driveMinutes: 12,
        url: "https://www.dundonaldlinks.com",
        highlight:
          "Modern Kyle Phillips championship links with a top-tier clubhouse and lodge for groups",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [250, 400],
        amenities: [
          "overlooks Royal Troon",
          "restaurant",
          "bar",
          "spa",
          "walkable to course",
        ],
        areaDescription:
          "Marine Troon (Marine & Lawn) — landmark hotel directly over Royal Troon's 18th",
        searchUrl: "https://www.marineandlawn.com/marine-troon",
        notes:
          "Book a room block at the Marine — you can roll out of bed onto Royal Troon. Per-room pricing works well for a group of 8-16.",
        avgRating: 4.4,
      },
      {
        type: "resort-house",
        sleeps: [12, 20],
        nightlyRange: [500, 1100],
        amenities: [
          "on-site Ailsa course",
          "lighthouse halfway house",
          "spa",
          "multiple restaurants",
          "ocean views",
        ],
        areaDescription:
          "Trump Turnberry resort — anchor stay if you're playing the Ailsa",
        searchUrl: "https://www.turnberry.co.uk",
        notes:
          "Stay-and-play at Turnberry is the splurge move. Big rooms and on-property dining; book well ahead in summer.",
        avgRating: 4.6,
      },
    ],
    dining: [
      {
        name: "MacCallum's Oyster Bar",
        style: "seafood",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Harbourside seafood at Troon — oysters and the day's catch straight off the boats",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Scott's Troon",
        style: "upscale",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Buzzy modern Scottish brasserie at Troon Yacht Haven with marina views",
        reservationNeeded: true,
        googleRating: 4.2,
      },
      {
        name: "Lochgreen House Hotel",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Three-rosette fine dining in a country house — the special-occasion dinner of the trip",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "MacIntyre's",
        vibe: "dive",
        highlight:
          "Traditional Troon local for an honest pint after the round",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Lonsdale Bar",
        vibe: "sports-bar",
        highlight:
          "No-frills bar with pool and music — group-friendly and loud on a weekend",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Lido Troon",
        vibe: "cocktail",
        highlight:
          "Upmarket café-bar for cocktails when you want something a notch above the pub",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Arran Whisky Distillery Tour (Lochranza)",
        type: "distillery",
        duration: "half day",
        pricePerPerson: [10, 40],
        groupFriendly: true,
        highlight:
          "Ferry to the Isle of Arran for a tour and tasting at Lochranza Distillery — a great rest-day adventure",
        bestFor: "rest day",
        provider: "Isle of Arran Distillers",
      },
      {
        name: "Culzean Castle & Country Park",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [20, 25],
        groupFriendly: true,
        highlight:
          "Clifftop castle and grounds on the Ayrshire coast — National Trust for Scotland",
        bestFor: "rest day",
        provider: "National Trust for Scotland",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [4, 16],
        hourlyRate: [80, 160],
        providers: ["McLaren Travel", "Ayrshire Golf Scotland"],
        notes:
          "Local golf transport runs groups between Royal Troon, Turnberry, Prestwick and the airport with bag space. Book the full-day driver.",
        fullDayRate: [500, 950],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [90, 150],
        providers: ["Take a Chef", "Ayrshire Private Dining"],
        mealTypes: ["Scottish steak dinner", "seafood spread", "full breakfast"],
        notes:
          "In-villa chefs serve the Ayrshire coast — a steak night at the rental beats hunting for a large-group table. Book 2+ weeks ahead.",
      },
    ],
  },
  {
    id: "gullane-east-lothian-scotland",
    city: "Gullane",
    state: "Scotland",
    region: "International",
    tagline: "Scotland's Golf Coast — Muirfield, North Berwick, and the Renaissance Club",
    description:
      'East Lothian packs more world-class links into a few coastal miles than anywhere on earth. Muirfield, the quirky North Berwick West Links, Gullane, and Tom Doak\'s Renaissance Club. Drier and sunnier than the rest of Scotland — they call it "Scotland\'s Golf Coast."',
    population: "tiny",
    nearestAirport: {
      code: "EDI",
      name: "Edinburgh Airport",
      driveMinutes: 40,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "Co-op and Tesco in Gullane and North Berwick. The coast gets roughly a third less rain than the Scottish average.",
    courses: [
      {
        name: "Muirfield (Honourable Company of Edinburgh Golfers)",
        tier: "bucket-list",
        greenFeeRange: [413, 502],
        holes: 18,
        par: 71,
        yardage: 7245,
        walkable: true,
        style: "links",
        driveMinutes: 3,
        url: "https://www.muirfield.org.uk",
        highlight:
          "16-time Open host with a unique two-loop routing. Visitors Tuesday and Thursday only — book ~a year ahead",
        hypeTag: "TOURNAMENT HOST",
        rankNote: "Open Championship venue — 16 times",
      },
      {
        name: "North Berwick Golf Club (West Links)",
        tier: "bucket-list",
        greenFeeRange: [380, 406],
        holes: 18,
        par: 71,
        yardage: 6420,
        walkable: true,
        style: "links",
        driveMinutes: 10,
        url: "https://www.northberwickgolfclub.com",
        highlight:
          'Gloriously quirky 1832 links — home of the original "Redan" hole copied around the world',
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "Gullane Golf Club (No. 1 Course)",
        tier: "premium",
        greenFeeRange: [267, 318],
        holes: 18,
        par: 71,
        yardage: 6873,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://www.gullanegolfclub.com",
        highlight:
          "Climbs Gullane Hill for panoramic Firth of Forth views before tumbling back to the sea",
      },
      {
        name: "The Renaissance Club",
        tier: "bucket-list",
        greenFeeRange: [381, 450],
        holes: 18,
        par: 71,
        yardage: 7303,
        walkable: true,
        style: "links",
        driveMinutes: 5,
        url: "https://www.trcaa.com",
        highlight:
          "Tom Doak design and Genesis Scottish Open host. Visitors Monday and Wednesday only",
        hypeTag: "TOURNAMENT HOST",
      },
      {
        name: "Archerfield Links (Fidra Course)",
        tier: "premium",
        greenFeeRange: [200, 254],
        holes: 18,
        par: 72,
        yardage: 6560,
        walkable: true,
        style: "links",
        driveMinutes: 6,
        url: "https://www.archerfieldgolfclub.com",
        highlight:
          "36 holes weaving between coastal dunes and pine forest at a private-feeling estate",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [8, 14],
        nightlyRange: [170, 400],
        amenities: [
          "overlooks Muirfield",
          "Chez Roux restaurant",
          "garden",
          "fine dining on-site",
        ],
        areaDescription:
          "Greywalls Hotel — Edwardian Lutyens house overlooking Muirfield with the Chez Roux restaurant",
        searchUrl: "https://www.greywalls.co.uk",
        notes:
          "The classic Muirfield-week stay. Small and characterful — book a room block early. Walking distance to the first tee.",
        avgRating: 4.6,
      },
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [210, 400],
        amenities: [
          "seaside",
          "walkable to West Links",
          "restaurant",
          "bar",
        ],
        areaDescription:
          "Marine North Berwick (Marine & Lawn) — boutique seaside hotel walkable to the West Links",
        searchUrl: "https://www.marineandlawn.com/marine-north-berwick",
        notes:
          "Great base for the eastern courses with the town's pubs and restaurants on foot. Per-room pricing suits a group.",
        avgRating: 4.4,
      },
    ],
    dining: [
      {
        name: "The Bonnie Badger",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Tom Kitchin's village inn in Gullane — refined modern Scottish, MICHELIN Guide listed",
        reservationNeeded: true,
      },
      {
        name: "Osteria North Berwick",
        style: "italian",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Consistently the top-rated table in North Berwick — proper Italian and seafood",
        reservationNeeded: true,
        googleRating: 4.7,
      },
      {
        name: "La Potinière",
        style: "upscale",
        priceRange: "$$$",
        capacity: "small",
        highlight:
          "Long-running Scottish-French fine dining in Gullane for the celebration dinner",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "The Ship Inn",
        vibe: "patio",
        highlight:
          "Seaside North Berwick pub with renowned fish and chips and harbour views",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.4,
      },
      {
        name: "The Old Clubhouse",
        vibe: "dive",
        highlight:
          "Traditional Gullane village pub in the Good Beer Guide — the post-round local",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Castle Inn Dirleton",
        vibe: "patio",
        highlight:
          "Country inn on the green overlooking Dirleton Castle — a scenic pint between rounds",
        lateNight: false,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Bass Rock Seabird Cruise",
        type: "boat-rental",
        duration: "2-3 hours",
        pricePerPerson: [40, 50],
        groupFriendly: true,
        highlight:
          "Catamaran cruise out to the gannet-covered Bass Rock from the Scottish Seabird Centre",
        bestFor: "rest day",
        provider: "Scottish Seabird Centre",
      },
      {
        name: "Glenkinchie Distillery Tour",
        type: "distillery",
        duration: "half day",
        pricePerPerson: [25, 45],
        groupFriendly: true,
        highlight:
          'Tour and tasting at "the Edinburgh Malt" just inland from the coast',
        bestFor: "rest day",
        provider: "Glenkinchie Distillery",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [4, 12],
        hourlyRate: [80, 150],
        providers: ["Gullane Golf Travel", "Edinburgh Golf Chauffeur"],
        notes:
          "Village-based golf transport handles small groups between the East Lothian courses and Edinburgh airport with bag space.",
        fullDayRate: [450, 850],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [90, 160],
        providers: ["Jo's Kitchen (East Lothian)", "Take a Chef"],
        mealTypes: ["Scottish steak dinner", "seafood spread", "full breakfast"],
        notes:
          "Local East Lothian private chefs will cook in your rental — ideal after a hard day of links golf. Book 2+ weeks ahead.",
      },
    ],
  },
  {
    id: "ballybunion-southwest-ireland",
    city: "Ballybunion",
    state: "Ireland",
    region: "International",
    tagline: "Southwest Ireland's links cathedral — Ballybunion, Lahinch, Tralee, Waterville",
    description:
      "The wildest links golf on earth. Towering Atlantic dunes at Ballybunion (Tom Watson's favorite), MacKenzie's quirky Lahinch, clifftop Tralee, and Payne Stewart's beloved Waterville. Base in Killarney for the pubs and trad music between rounds.",
    population: "tiny",
    nearestAirport: {
      code: "SNN",
      name: "Shannon Airport",
      driveMinutes: 105,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "SuperValu and Tesco in Killarney and Tralee. Courses are spread across Kerry and Clare — a driver or rental van is essential.",
    courses: [
      {
        name: "Ballybunion Golf Club (Old Course)",
        tier: "bucket-list",
        greenFeeRange: [432, 486],
        holes: 18,
        par: 72,
        yardage: 6802,
        walkable: true,
        style: "links",
        driveMinutes: 0,
        url: "https://www.ballybuniongolfclub.com",
        highlight:
          "Tom Watson's favorite course in the world — towering dunes hard against the Atlantic",
        hypeTag: "BUCKET LIST",
        rankNote: "Top 25 in the World — multiple panels",
      },
      {
        name: "Lahinch Golf Club (Old Course)",
        tier: "bucket-list",
        greenFeeRange: [430, 486],
        holes: 18,
        par: 72,
        yardage: 6950,
        walkable: true,
        style: "links",
        driveMinutes: 90,
        url: "https://www.lahinchgolf.com",
        highlight:
          'The "St Andrews of Ireland" — Alister MacKenzie\'s blind Klondyke and Dell holes, with goats forecasting the weather',
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "Tralee Golf Club",
        tier: "bucket-list",
        greenFeeRange: [270, 486],
        holes: 18,
        par: 72,
        yardage: 6947,
        walkable: true,
        style: "links",
        driveMinutes: 45,
        url: "https://www.traleegolfclub.com",
        highlight:
          "Ireland's first Arnold Palmer design — a dramatic clifftop front nine over the Atlantic",
      },
      {
        name: "Waterville Golf Links",
        tier: "bucket-list",
        greenFeeRange: [432, 459],
        holes: 18,
        par: 72,
        yardage: 7347,
        walkable: true,
        style: "links",
        driveMinutes: 105,
        url: "https://www.watervillegolflinks.ie",
        highlight:
          "Ring-of-Kerry classic that Payne Stewart adored — there's a bronze statue of him at the club",
        hypeTag: "BUCKET LIST",
      },
      {
        name: "Trump International Golf Links Doonbeg",
        tier: "premium",
        greenFeeRange: [405, 567],
        holes: 18,
        par: 72,
        yardage: 6885,
        walkable: true,
        style: "links",
        driveMinutes: 75,
        url: "https://www.trumpgolfireland.com",
        highlight:
          "Greg Norman design in colossal dunes with a five-star resort on site",
      },
      {
        name: "Old Head Golf Links",
        tier: "bucket-list",
        greenFeeRange: [486, 567],
        holes: 18,
        par: 72,
        yardage: 7215,
        walkable: true,
        style: "links",
        driveMinutes: 165,
        url: "https://www.oldhead.com",
        highlight:
          "A clifftop headland 300 feet above the Atlantic — a once-in-a-lifetime day trip toward Cork",
        hypeTag: "BUCKET LIST",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [10, 18],
        nightlyRange: [350, 650],
        amenities: [
          "5-star",
          "town center",
          "spa",
          "restaurant",
          "concierge",
        ],
        areaDescription:
          "The Killarney Park Hotel — five-star base in the center of Killarney for the Kerry courses",
        searchUrl: "https://www.killarneyparkhotel.ie",
        notes:
          "Killarney is the natural hub — pubs and trad music on foot, courses a drive away. Block-book rooms for the group.",
        avgRating: 4.7,
      },
      {
        type: "resort-house",
        sleeps: [8, 16],
        nightlyRange: [300, 600],
        amenities: [
          "on-site links",
          "5-star lodge",
          "spa",
          "restaurant",
          "ocean views",
        ],
        areaDescription:
          "Trump International Doonbeg — best base in Clare, on the links and close to Lahinch",
        searchUrl: "https://www.trumpgolfireland.com",
        notes:
          "Stay-and-play at Doonbeg puts you on the dunes. Pair with Lahinch for a two-day Clare leg.",
        avgRating: 4.5,
      },
    ],
    dining: [
      {
        name: "The Peregrine (Killarney Park)",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Killarney's top fine-dining room, MICHELIN Guide listed — the trip's celebration dinner",
        reservationNeeded: true,
      },
      {
        name: "Cronin's Restaurant",
        style: "seafood",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Refined traditional Irish and seafood, a Killarney institution since 1957",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Bricín",
        style: "casual",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Cozy, authentic Irish cooking — boxty pancakes and Kerry scallops",
        reservationNeeded: true,
        googleRating: 4.5,
      },
    ],
    bars: [
      {
        name: "The Danny Mann",
        vibe: "honky-tonk",
        highlight:
          "Award-winning Killarney trad-music pub with live sessions nightly",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Murphy's Bar Killarney",
        vibe: "dive",
        highlight:
          "Killarney institution since 1955 — the place for a proper trad session",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "O'Flaherty's (Dingle)",
        vibe: "honky-tonk",
        highlight:
          "A mecca for live traditional music if the crew day-trips the Dingle Peninsula",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Cliffs of Moher",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [10, 20],
        groupFriendly: true,
        highlight:
          "Ireland's most famous sea cliffs — an easy add-on when you're playing Lahinch in Clare",
        bestFor: "rest day",
        provider: "Cliffs of Moher Visitor Experience",
      },
      {
        name: "Kerry Sea Angling Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [65, 110],
        groupFriendly: true,
        highlight:
          "Boat out of the Kerry coast for pollock, mackerel and the chance at a shark — great rest-day adventure",
        bestFor: "rest day",
        provider: "Kerry Sea Angling charters",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [4, 16],
        hourlyRate: [90, 180],
        providers: ["Setanta Chauffeur Tours", "Flynn's Coaches"],
        notes:
          "Dedicated golf transport with Mercedes vans and coaches links the scattered Kerry and Clare courses. A full-day driver is the only sane way to do this trip.",
        fullDayRate: [550, 1100],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [90, 160],
        providers: ["Truffle Honey (Killarney)", "Take a Chef"],
        mealTypes: ["Irish steak dinner", "seafood spread", "full Irish breakfast"],
        notes:
          "Hire a chef to cook in the rental or golf lodge — a calm night in after a long day of links golf. Book ahead in summer.",
      },
    ],
  },
  {
    id: "portmarnock-dublin-ireland",
    city: "Portmarnock",
    state: "Ireland",
    region: "International",
    tagline: "Dublin's links coast — Portmarnock, The Island, and County Louth",
    description:
      "World-class links 15 minutes from Dublin Airport. Play the storied Portmarnock, the dune-framed Island, and Tom Simpson's County Louth at Baltray — then sink into Dublin's pubs at night. The easiest big-time links trip to reach from the US.",
    population: "small",
    nearestAirport: {
      code: "DUB",
      name: "Dublin Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "SuperValu and Tesco in Malahide and Donabate. Dublin city center is a 30-minute drive for nightlife.",
    courses: [
      {
        name: "Portmarnock Golf Club",
        tier: "bucket-list",
        greenFeeRange: [515, 575],
        holes: 18,
        par: 72,
        yardage: 7466,
        walkable: true,
        style: "links",
        driveMinutes: 5,
        url: "https://www.portmarnockgolfclub.ie",
        highlight:
          "130-year-old links on a sandy peninsula — host of 19 Irish Opens and the 1991 Walker Cup",
        hypeTag: "BUCKET LIST",
        rankNote: "Top 100 in the World — multiple panels",
      },
      {
        name: "The Island Golf Club",
        tier: "bucket-list",
        greenFeeRange: [350, 420],
        holes: 18,
        par: 72,
        yardage: 7257,
        walkable: true,
        style: "links",
        driveMinutes: 15,
        url: "https://www.theislandgolfclub.com",
        highlight:
          "Dramatic dune-framed links across the estuary from Malahide — wild and underrated",
        hypeTag: "HIDDEN GEM",
      },
      {
        name: "County Louth Golf Club (Baltray)",
        tier: "bucket-list",
        greenFeeRange: [350, 410],
        holes: 18,
        par: 72,
        yardage: 7031,
        walkable: true,
        style: "links",
        driveMinutes: 45,
        url: "https://www.countylouthgolfclub.com",
        highlight:
          "Tom Simpson 1938 masterpiece with some of the best greens in Ireland — a two-time Irish Open host",
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "Jameson Golf Links (Portmarnock Resort)",
        tier: "premium",
        greenFeeRange: [162, 345],
        holes: 18,
        par: 71,
        yardage: 7124,
        walkable: true,
        style: "links",
        driveMinutes: 3,
        url: "https://www.portmarnock.com/golf",
        highlight:
          "Dublin's only true beachfront links, recently redesigned, with a resort and spa on site",
      },
      {
        name: "Royal Dublin Golf Club",
        tier: "premium",
        greenFeeRange: [240, 320],
        holes: 18,
        par: 72,
        yardage: 7269,
        walkable: true,
        style: "links",
        driveMinutes: 20,
        url: "https://www.theroyaldublingolfclub.com",
        highlight:
          "Historic Bull Island links minutes from the city — Christy O'Connor Sr.'s home club",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [10, 18],
        nightlyRange: [200, 350],
        amenities: [
          "beachfront",
          "on-site links",
          "spa",
          "restaurant",
          "15 min from airport",
        ],
        areaDescription:
          "Portmarnock Resort & Jameson Golf Links — beachfront resort with its own links, 15 min from DUB",
        searchUrl: "https://www.portmarnock.com",
        notes:
          "Easiest base for the Dublin links cluster. On-site golf and dining; block-book rooms for the group.",
        avgRating: 4.5,
      },
      {
        type: "resort-house",
        sleeps: [8, 16],
        nightlyRange: [170, 300],
        amenities: [
          "village center",
          "restaurant",
          "bar",
          "near The Island",
        ],
        areaDescription:
          "Grand Hotel Malahide — four-star in upmarket Malahide village, ~10 min to The Island and Portmarnock",
        searchUrl: "https://www.thegrand.ie",
        notes:
          "Malahide is a lively coastal village with pubs and restaurants on foot. Per-room pricing suits a group.",
        avgRating: 4.4,
      },
    ],
    dining: [
      {
        name: "Fish Shack Malahide",
        style: "seafood",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Fresh seafood in the heart of Malahide village — a reliable group dinner",
        reservationNeeded: true,
        googleRating: 4.4,
      },
      {
        name: "Beef and Lobster Malahide",
        style: "seafood",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Surf-and-turf specialist — exactly what the crew wants after 18 holes",
        reservationNeeded: true,
        googleRating: 4.4,
      },
      {
        name: "Sale e Pepe",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Long-running Malahide Italian that handles a big table well",
        reservationNeeded: false,
        googleRating: 4.4,
      },
    ],
    bars: [
      {
        name: "Gibney's of Malahide",
        vibe: "dive",
        highlight:
          "Landmark multi-room Malahide local — craic, pints and fish and chips",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Abbey Tavern (Howth)",
        vibe: "honky-tonk",
        highlight:
          "16th-century pub with turf fires and famous live trad-music nights since 1963",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "The Temple Bar (Dublin)",
        vibe: "honky-tonk",
        highlight:
          "The most famous pub in Ireland — touristy but mandatory for a Dublin night out",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Jameson Distillery Bow St. Tour",
        type: "distillery",
        duration: "1-2 hours",
        pricePerPerson: [28, 45],
        groupFriendly: true,
        highlight:
          "Flagship whiskey tour and tasting in central Dublin — a perfect arrival-day activity",
        bestFor: "arrival day",
        provider: "Jameson Distillery Bow St.",
      },
      {
        name: "Guinness Storehouse",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [28, 40],
        groupFriendly: true,
        highlight:
          "Pour your own pint in the Gravity Bar with 360° views over Dublin",
        bestFor: "arrival day",
        provider: "Guinness Storehouse",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [4, 16],
        hourlyRate: [90, 180],
        providers: ["Premier Chauffeur Drive Dublin", "Flynn's Coaches"],
        notes:
          "Dublin golf-transport firms run Mercedes vans and coaches to all the links and into the city for nights out, with bag space.",
        fullDayRate: [500, 1000],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [85, 160],
        providers: ["Take a Chef", "Dublin Private Dining"],
        mealTypes: ["Irish steak dinner", "seafood spread", "full Irish breakfast"],
        notes:
          "Plenty of Dublin private chefs will cook in the rental — a relaxed night in before a city night out. Book ahead.",
      },
    ],
  },
  {
    id: "newcastle-northern-ireland",
    city: "Newcastle",
    state: "Northern Ireland",
    region: "International",
    tagline: "Royal County Down & Royal Portrush — two of the world's best",
    description:
      "Northern Ireland is home to two of the highest-ranked links on the planet: Royal County Down beneath the Mountains of Mourne, and Royal Portrush, host of the 2019 and 2025 Opens. Add Portstewart and the Giant's Causeway and you have a perfect long weekend.",
    population: "small",
    nearestAirport: {
      code: "BFS",
      name: "Belfast International Airport",
      driveMinutes: 75,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "Tesco and SuperValu in Newcastle and Coleraine. Newcastle and Portrush are ~2 hours apart — many groups split the stay between the two.",
    courses: [
      {
        name: "Royal County Down (Championship Links)",
        tier: "bucket-list",
        greenFeeRange: [565, 575],
        holes: 18,
        par: 71,
        yardage: 7206,
        walkable: true,
        style: "links",
        driveMinutes: 5,
        url: "https://www.royalcountydown.org",
        highlight:
          "Ranked the #1 course in the world by multiple panels — blind shots and gorse beneath the Mountains of Mourne",
        hypeTag: "BUCKET LIST",
        rankNote: "#1 in the World — Golf Digest panels",
      },
      {
        name: "Royal Portrush (Dunluce Links)",
        tier: "bucket-list",
        greenFeeRange: [530, 535],
        holes: 18,
        par: 72,
        yardage: 6867,
        walkable: true,
        style: "links",
        driveMinutes: 120,
        url: "https://www.royalportrushgolfclub.com",
        highlight:
          'Host of the 2019 and 2025 Opens — "Calamity Corner" and the iconic White Rocks finish',
        hypeTag: "TOURNAMENT HOST",
        rankNote: "Open Championship venue — 2019 & 2025",
      },
      {
        name: "Portstewart Golf Club (Strand Course)",
        tier: "premium",
        greenFeeRange: [89, 425],
        holes: 18,
        par: 71,
        yardage: 7118,
        walkable: true,
        style: "links",
        driveMinutes: 125,
        url: "https://www.portstewartgc.co.uk",
        highlight:
          'Front nine through "Thistly Hollow" — one of the great opening stretches in links golf; 2017 Irish Open host',
      },
      {
        name: "Ardglass Golf Club",
        tier: "premium",
        greenFeeRange: [114, 318],
        holes: 18,
        par: 70,
        yardage: 6200,
        walkable: true,
        style: "links",
        driveMinutes: 25,
        url: "https://www.ardglassgolfclub.com",
        highlight:
          "Clifftop links with a 15th-century castle clubhouse — the perfect pairing-day with Royal County Down",
        hypeTag: "HIDDEN GEM",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [10, 18],
        nightlyRange: [230, 400],
        amenities: [
          "seafront",
          "adjacent to RCD",
          "spa",
          "restaurant",
          "Mourne Mountain views",
        ],
        areaDescription:
          "Slieve Donard (Hastings) — seafront grande-dame hotel right beside Royal County Down",
        searchUrl: "https://www.hastingshotels.com/slieve-donard",
        notes:
          "The base for the Newcastle leg — roll out of bed onto RCD. Block-book rooms; pair with Ardglass.",
        avgRating: 4.5,
      },
      {
        type: "resort-house",
        sleeps: [8, 16],
        nightlyRange: [150, 300],
        amenities: [
          "near Whiterocks Beach",
          "restaurant",
          "near Royal Portrush",
        ],
        areaDescription:
          "Portrush hotels near Whiterocks Beach — base for Royal Portrush and Portstewart",
        searchUrl: "https://www.airbnb.com/portrush-united-kingdom/stays",
        notes:
          "Split the stay: a couple of nights in Newcastle, a couple in Portrush. Plenty of group rentals along the north coast.",
        avgRating: 4.4,
      },
    ],
    dining: [
      {
        name: "The Bushmills Inn",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Refined Irish cooking in a historic coaching inn near Royal Portrush",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Basalt (Ramore, Portrush)",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Buzzy modern restaurant in the Ramore complex over Portrush harbour — easy for a big table",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "The Percy French",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Seafront pub-restaurant at Newcastle with Mourne views, beside Slieve Donard",
        reservationNeeded: false,
        googleRating: 4.3,
      },
    ],
    bars: [
      {
        name: "The Harbour Bar (Portrush)",
        vibe: "dive",
        highlight:
          "Traditional harbour-front bar pouring one of the best pints of Guinness on the coast",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Bush House (Bushmills)",
        vibe: "dive",
        highlight:
          'Cozy local near the distillery — locals swear it\'s "the best pint on the north coast"',
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Ramore Wine Bar (Portrush)",
        vibe: "patio",
        highlight:
          "Busy food-and-drink hub on Portrush harbour — the lively spot to start the night",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Giant's Causeway",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [15, 25],
        groupFriendly: true,
        highlight:
          "UNESCO basalt columns 15 minutes from Portrush — the iconic Northern Ireland day trip",
        bestFor: "rest day",
        provider: "National Trust",
      },
      {
        name: "Old Bushmills Distillery Tour",
        type: "distillery",
        duration: "1-2 hours",
        pricePerPerson: [15, 25],
        groupFriendly: true,
        highlight:
          "Tour and tasting at the world's oldest licensed whiskey distillery, minutes from Royal Portrush",
        bestFor: "rest day",
        provider: "Old Bushmills Distillery",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [4, 16],
        hourlyRate: [90, 180],
        providers: ["NI Chauffeurs", "Five Star Luxury Transfers"],
        notes:
          "Northern Ireland golf-transport firms run luxury vehicles with golf-bag trailers between RCD, Portrush, Portstewart and the airports.",
        fullDayRate: [550, 1100],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [85, 170],
        providers: ["Take a Chef", "Dineindulge (Causeway Coast)"],
        mealTypes: ["Irish steak dinner", "seafood spread", "full Ulster fry"],
        notes:
          "Private chefs serve both the Newcastle and Causeway coast areas — cook in the rental between rounds. Book ahead.",
      },
    ],
  },
  {
    id: "los-cabos-mexico",
    city: "Los Cabos",
    state: "Mexico",
    region: "International",
    tagline: "Desert-meets-Pacific golf at the tip of Baja",
    description:
      "Where the Sonoran Desert tumbles into the Sea of Cortez. Tiger, Nicklaus, Norman and Davis Love III all built here — Diamante's Dunes, clifftop Quivira, and Cabo del Sol. World-class courses by day, El Squid Roe and tequila by night. Two flights from most of the US.",
    population: "medium",
    nearestAirport: {
      code: "SJD",
      name: "Los Cabos International Airport",
      driveMinutes: 35,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Walmart, Soriana and La Comer along the corridor; Costco near San José. Most courses require a cart or forecaddie.",
    courses: [
      {
        name: "Diamante (Dunes Course)",
        tier: "bucket-list",
        greenFeeRange: [300, 475],
        holes: 18,
        par: 72,
        yardage: 7317,
        walkable: false,
        style: "coastal",
        driveMinutes: 25,
        url: "https://www.diamantecabosanlucas.com",
        highlight:
          "Davis Love III's Pacific-dunes links — routinely ranked among the best courses in the world",
        hypeTag: "BUCKET LIST",
        rankNote: "Top 100 in the World — multiple panels",
      },
      {
        name: "Quivira Golf Club",
        tier: "bucket-list",
        greenFeeRange: [233, 380],
        holes: 18,
        par: 72,
        yardage: 7085,
        walkable: false,
        style: "coastal",
        driveMinutes: 30,
        url: "https://www.quiviraloscabos.com",
        highlight:
          "Jack Nicklaus's most dramatic clifftop routing in Cabo — holes perched hundreds of feet over the Pacific",
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "Diamante (El Cardonal)",
        tier: "premium",
        greenFeeRange: [300, 400],
        holes: 18,
        par: 72,
        yardage: 7374,
        walkable: false,
        style: "desert",
        driveMinutes: 25,
        url: "https://www.diamantecabosanlucas.com",
        highlight:
          "Tiger Woods's first-ever course design — wide, fun and inspired by old-school desert golf",
      },
      {
        name: "Cabo del Sol (Desert Course)",
        tier: "premium",
        greenFeeRange: [200, 350],
        holes: 18,
        par: 72,
        yardage: 7049,
        walkable: false,
        style: "desert",
        driveMinutes: 20,
        url: "https://www.cabodelsol.com",
        highlight:
          "The publicly accessible Cabo del Sol course — desert golf with Sea of Cortez glimpses",
      },
      {
        name: "Cabo Real Golf Club",
        tier: "premium",
        greenFeeRange: [170, 290],
        holes: 18,
        par: 72,
        yardage: 7037,
        walkable: false,
        style: "desert",
        driveMinutes: 20,
        url: "https://www.questrogolf.com/cabo-real/",
        highlight:
          "Robert Trent Jones II layout with three holes running right along the Sea of Cortez",
      },
      {
        name: "Puerto Los Cabos Golf Club",
        tier: "premium",
        greenFeeRange: [205, 285],
        holes: 18,
        par: 72,
        yardage: 7348,
        walkable: false,
        style: "desert",
        driveMinutes: 30,
        url: "https://www.puertoloscabos.com/golf/",
        highlight:
          "27 holes by Norman and Nicklaus with free food-and-drink palapas dotted around the course",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [8, 14],
        nightlyRange: [1200, 5000],
        amenities: [
          "private pool",
          "ocean views",
          "staff",
          "chef-ready kitchen",
          "concierge",
        ],
        areaDescription:
          "Tourist Corridor villas (Pedregal, Palmilla, Querencia) — multi-bedroom luxury homes with staff",
        searchUrl: "https://www.vrbo.com/search?destination=Los+Cabos%2C+Mexico",
        notes:
          "Group villas with private pools and on-call staff are the move in Cabo. Cabo Villas and Cabo Platinum manage the high-end inventory. Book early for spring.",
        avgRating: 4.7,
      },
      {
        type: "resort-house",
        sleeps: [8, 16],
        nightlyRange: [400, 1200],
        amenities: [
          "resort pool",
          "multiple restaurants",
          "spa",
          "beach access",
          "concierge",
        ],
        areaDescription:
          "Corridor resorts between San José and Cabo San Lucas — book a block of rooms or suites",
        searchUrl: "https://www.marriott.com/search/findHotels.mi?t=los+cabos",
        notes:
          "Per-room resort pricing is competitive for a group and simplifies dining and transport. Central to most courses.",
        avgRating: 4.5,
      },
    ],
    dining: [
      {
        name: "El Farallón (Waldorf Pedregal)",
        style: "seafood",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Cliffside sea-to-table seafood with a champagne terrace over crashing surf",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Sunset Monalisa",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Mediterranean and Baja seafood with the best sunset view of Land's End in Cabo",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Flora's Field Kitchen",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Wood-fired farm-to-table on a working farm outside San José — relaxed and easy for a group",
        reservationNeeded: true,
        googleRating: 4.6,
      },
    ],
    bars: [
      {
        name: "Cabo Wabo Cantina",
        vibe: "honky-tonk",
        highlight:
          "Sammy Hagar's tequila-and-live-rock institution in downtown Cabo San Lucas",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "El Squid Roe",
        vibe: "tiki",
        highlight:
          "Three-story downtown party club since 1989 — the bachelor-party headquarters of Cabo",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Office on the Beach",
        vibe: "tiki",
        highlight:
          "Toes-in-the-sand palapa beach bar on Medano Beach for daytime margaritas",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Deep-Sea Fishing Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [84, 400],
        groupFriendly: true,
        highlight:
          "Cabo is the marlin capital of the world — charter a boat for a half-day on the Sea of Cortez",
        bestFor: "rest day",
        provider: "Pisces Sportfishing",
      },
      {
        name: "Sunset Catamaran Cruise",
        type: "boat-rental",
        duration: "2-3 hours",
        pricePerPerson: [89, 199],
        groupFriendly: true,
        highlight:
          "Open-bar sail past El Arco at sunset — the classic Cabo group activity",
        bestFor: "arrival day",
        provider: "Cabo Adventures",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [6, 20],
        hourlyRate: [80, 200],
        providers: ["Transcabo", "Cabo Platinum Transport"],
        notes:
          "Private Sprinter vans and shuttles handle airport transfers, golf runs and downtown bar crawls. Pre-book — don't rely on street taxis with clubs.",
        fullDayRate: [500, 1200],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 175],
        providers: ["Eat Cabo Catering", "Cabo Platinum", "Take a Chef"],
        mealTypes: ["steak dinner", "fresh-catch seafood", "taco fiesta", "breakfast spread"],
        notes:
          "An in-villa chef for a steak-and-tequila night is a Cabo trip highlight. Most villas are set up for it. Book 1-2 weeks ahead.",
      },
    ],
  },
  {
    id: "punta-cana-dominican-republic",
    city: "Punta Cana",
    state: "Dominican Republic",
    region: "International",
    tagline: "Caribbean ocean-holes and all-inclusive nights",
    description:
      "The Caribbean's golf capital. Punta Espada's eight ocean holes, the PGA Tour's Corales, and P.B. Dye's La Cana — all backed by all-inclusive resorts, casinos and Coco Bongo. Four hours from the East Coast and warm year-round.",
    population: "medium",
    nearestAirport: {
      code: "PUJ",
      name: "Punta Cana International Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Jumbo and Plaza Uvero Alto for groceries. Most golf and dining is inside the resort enclaves; all courses require a cart.",
    courses: [
      {
        name: "Punta Espada Golf Club (Cap Cana)",
        tier: "bucket-list",
        greenFeeRange: [395, 495],
        holes: 18,
        par: 72,
        yardage: 7396,
        walkable: false,
        style: "coastal",
        driveMinutes: 15,
        url: "https://www.puntaespadagolf.com",
        highlight:
          "Jack Nicklaus design with eight holes on the Caribbean — long ranked the #1 course in the region",
        hypeTag: "BUCKET LIST",
        rankNote: "#1 in the Caribbean — GolfWeek",
      },
      {
        name: "Corales Golf Club (Puntacana Resort)",
        tier: "bucket-list",
        greenFeeRange: [395, 495],
        holes: 18,
        par: 72,
        yardage: 7670,
        walkable: false,
        style: "coastal",
        driveMinutes: 10,
        url: "https://www.puntacana.com/en/golf/corales-golf-course",
        highlight:
          'Tom Fazio design and PGA Tour host — the "Devil\'s Elbow" closing stretch plays over Caribbean coves',
        hypeTag: "TOURNAMENT HOST",
        rankNote: "PGA Tour host — Corales Puntacana Championship",
      },
      {
        name: "La Cana Golf Club (Puntacana Resort)",
        tier: "premium",
        greenFeeRange: [185, 260],
        holes: 18,
        par: 72,
        yardage: 7159,
        walkable: false,
        style: "resort",
        driveMinutes: 10,
        url: "https://www.puntacana.com/en/golf/la-cana-golf-course",
        highlight:
          "P.B. Dye 27-hole resort course with ocean views on 14 holes — the Caribbean's first paspalum course",
      },
      {
        name: "Hard Rock Golf Club at Cana Bay",
        tier: "premium",
        greenFeeRange: [200, 250],
        holes: 18,
        par: 72,
        yardage: 7253,
        walkable: false,
        style: "resort",
        driveMinutes: 20,
        url: "https://hotel.hardrock.com/punta-cana/hard-rock-golf.aspx",
        highlight:
          "Jack Nicklaus design where every hole is named for a rock song on the GPS — fee includes cart and range",
      },
      {
        name: "Iberostar Bávaro Golf Club",
        tier: "solid",
        greenFeeRange: [70, 196],
        holes: 18,
        par: 72,
        yardage: 6718,
        walkable: false,
        style: "resort",
        driveMinutes: 25,
        url: "https://www.iberostar.com/en/golf/bavaro-golf-club",
        highlight:
          "P.B. Dye resort course with a signature waterfall hole and strong guest-rate value",
        hypeTag: "BEST VALUE",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [12, 24],
        nightlyRange: [306, 700],
        amenities: [
          "all-inclusive",
          "on-site casino",
          "on-site golf",
          "multiple restaurants",
          "nightclub",
        ],
        areaDescription:
          "Hard Rock Hotel & Casino Punta Cana (Bávaro) — all-inclusive with casino, golf and party energy",
        searchUrl: "https://hotel.hardrock.com/punta-cana",
        notes:
          "All-inclusive plus casino plus on-site golf makes the logistics dead simple for a big group. Per-room pricing.",
        avgRating: 4.5,
      },
      {
        type: "resort-house",
        sleeps: [8, 16],
        nightlyRange: [1000, 5000],
        amenities: [
          "private pool",
          "oceanfront",
          "full staff",
          "chef-ready",
          "gated enclave",
        ],
        areaDescription:
          "Cap Cana luxury villas — gated oceanfront enclave next to Punta Espada with full-staff homes",
        searchUrl: "https://www.vrbo.com/search?destination=Punta+Cana%2C+Dominican+Republic",
        notes:
          "Full-staff villas in Cap Cana put you steps from Punta Espada with privacy and a chef. The splurge play.",
        avgRating: 4.7,
      },
    ],
    dining: [
      {
        name: "La Yola",
        style: "seafood",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Over-the-water Mediterranean seafood at the Puntacana marina — boat-shaped dining room",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Citrus",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Ceviche, sushi and lobster in Cortecito — a reliable big-group dinner outside the resorts",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Soles",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Caribbean beach dining on Cortecito sand — easy lunch or sunset dinner for the crew",
        reservationNeeded: false,
        googleRating: 4.3,
      },
    ],
    bars: [
      {
        name: "Coco Bongo",
        vibe: "tiki",
        highlight:
          "High-energy mega-club with Vegas-style acrobatic live shows — the big night out in Punta Cana",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Imagine Punta Cana",
        vibe: "tiki",
        highlight:
          "Nightclub set inside a real natural cavern — a genuinely unique party setting",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Soles Beach Bar",
        vibe: "tiki",
        highlight:
          "Bohemian Cortecito beach bar for sunset cocktails before the night kicks off",
        lateNight: false,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Deep-Sea Fishing Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [100, 200],
        groupFriendly: true,
        highlight:
          "Half-day charter for marlin, mahi and tuna off the Punta Cana coast",
        bestFor: "rest day",
        provider: "Big Marlin Charters",
      },
      {
        name: "Catamaran Party Cruise",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [65, 120],
        groupFriendly: true,
        highlight:
          "Open-bar catamaran with snorkeling stops and a natural pool — the classic group day",
        bestFor: "arrival day",
        provider: "Happy Fish Catamarans",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [10, 40],
        hourlyRate: [100, 250],
        providers: ["Dominican Airport Shuttle", "Punta Cana DR Transfer"],
        notes:
          "Luxury limo-buses and party buses handle airport transfers, golf runs and club nights for groups of up to 40+.",
        fullDayRate: [600, 1400],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 140],
        providers: ["Chef Punta Cana", "Take a Chef"],
        mealTypes: ["steak dinner", "fresh-catch seafood", "Dominican feast", "breakfast spread"],
        notes:
          "In-villa chefs cover Bávaro, Cocotal and Cap Cana — a private dinner at the villa is an easy upgrade. Book ahead.",
      },
    ],
  },
  {
    id: "algarve-portugal",
    city: "Algarve",
    state: "Portugal",
    region: "International",
    tagline: "Europe's sunbelt golf — Monte Rei, Quinta do Lago, San Lorenzo",
    description:
      "Southern Portugal is Europe's best-value golf coast: Nicklaus's #1-ranked Monte Rei, the championship Quinta do Lago South, and San Lorenzo running along the Ria Formosa lagoon. Mild winters, great seafood, and Faro Airport 20 minutes away.",
    population: "medium",
    nearestAirport: {
      code: "FAO",
      name: "Faro Airport",
      driveMinutes: 25,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Continente and Pingo Doce supermarkets throughout; Apolónia for upscale near Quinta do Lago. Many courses include a buggy.",
    courses: [
      {
        name: "Monte Rei Golf & Country Club (North Course)",
        tier: "bucket-list",
        greenFeeRange: [189, 322],
        holes: 18,
        par: 72,
        yardage: 7182,
        walkable: false,
        style: "parkland",
        driveMinutes: 45,
        url: "https://www.monte-rei.com",
        highlight:
          "Jack Nicklaus Signature design — Portugal's perennial #1, with water in play on 11 holes",
        hypeTag: "BUCKET LIST",
        rankNote: "#1 in Portugal — multiple panels",
      },
      {
        name: "Quinta do Lago (South Course)",
        tier: "bucket-list",
        greenFeeRange: [154, 200],
        holes: 18,
        par: 72,
        yardage: 7092,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.quintadolago.com",
        highlight:
          "Eight-time Portuguese Open host, recently renovated — the Algarve's championship benchmark",
        hypeTag: "TOURNAMENT HOST",
      },
      {
        name: "San Lorenzo Golf Course",
        tier: "premium",
        greenFeeRange: [149, 220],
        holes: 18,
        par: 72,
        yardage: 6824,
        walkable: false,
        style: "coastal",
        driveMinutes: 20,
        url: "https://www.sanlorenzogolfcourse.com",
        highlight:
          "Pine-lined holes finishing along the Ria Formosa lagoon and the Atlantic — consistently top-rated in Europe",
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "Dom Pedro Old Course (Vilamoura)",
        tier: "premium",
        greenFeeRange: [163, 210],
        holes: 18,
        par: 73,
        yardage: 6842,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.dompedrogolf.com",
        highlight:
          "The Algarve's original course, winding through towering umbrella pines",
      },
      {
        name: "Vale do Lobo (Royal Course)",
        tier: "premium",
        greenFeeRange: [79, 146],
        holes: 18,
        par: 72,
        yardage: 6629,
        walkable: false,
        style: "coastal",
        driveMinutes: 20,
        url: "https://www.valedolobo.com",
        highlight:
          "Home of the par-3 16th over the cliffs — the most-photographed hole in Portuguese golf",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [8, 14],
        nightlyRange: [260, 510],
        amenities: [
          "5-star",
          "spa",
          "multiple restaurants",
          "near Quinta do Lago",
          "concierge",
        ],
        areaDescription:
          "Conrad Algarve (Almancil) — the area's marquee five-star, minutes from Quinta do Lago and San Lorenzo",
        searchUrl: "https://www.hilton.com/en/hotels/faocici-conrad-algarve",
        notes:
          "Central luxury base for the Quinta do Lago cluster. Block-book rooms or suites for the group.",
        avgRating: 4.6,
      },
      {
        type: "house",
        sleeps: [8, 16],
        nightlyRange: [400, 1500],
        amenities: [
          "private pool",
          "full kitchen",
          "near courses",
          "golf-resort enclave",
        ],
        areaDescription:
          "Quinta do Lago and Vilamoura villas — private-pool homes inside the golf resorts",
        searchUrl: "https://www.vrbo.com/search?destination=Algarve%2C+Portugal",
        notes:
          "Self-catering villas with pools are the value play in the Algarve and put you on the courses. Book early for spring.",
        avgRating: 4.6,
      },
    ],
    dining: [
      {
        name: "Willie's Restaurant",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "small",
        highlight:
          "Modern international cooking near Almancil with one Michelin star — the celebration dinner",
        reservationNeeded: true,
        googleRating: 4.4,
      },
      {
        name: "Bovino Steakhouse",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Dry-aged steaks at Quinta do Lago — exactly what the crew wants after 18",
        reservationNeeded: true,
        googleRating: 4.2,
      },
      {
        name: "Casa do Lago",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Lakeside Mediterranean seafood at Quinta do Lago — relaxed and easy for a big table",
        reservationNeeded: true,
        googleRating: 4.2,
      },
    ],
    bars: [
      {
        name: "The Argo Cocktail Bar (Tivoli Marina)",
        vibe: "cocktail",
        highlight:
          "Upscale marina-view cocktails in Vilamoura — named a best hotel bar at the Lisbon Bar Show",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Vintage Gin & Cocktail Bar",
        vibe: "cocktail",
        highlight:
          "Lively craft-gin bar in Vilamoura with a huge list — a great pre-dinner spot",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Kadoc",
        vibe: "tiki",
        highlight:
          "One of the Algarve's biggest nightclubs with multiple dance floors — the late-night blowout",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Big-Game Fishing Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [120, 180],
        groupFriendly: true,
        highlight:
          "Offshore charter out of Vilamoura marina for marlin, dorado and tuna",
        bestFor: "rest day",
        provider: "Watersports Vilamoura",
      },
      {
        name: "Benagil Caves Boat Trip",
        type: "boat-rental",
        duration: "2-3 hours",
        pricePerPerson: [40, 70],
        groupFriendly: true,
        highlight:
          "Boat tour to the famous Benagil sea cave and along the dramatic Algarve cliffs",
        bestFor: "rest day",
        provider: "Bom Dia Boat Trips",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [6, 20],
        hourlyRate: [70, 160],
        providers: ["Golf-Drives", "Algarve Golf Transfers"],
        notes:
          "Golf-transport firms run Faro airport and course transfers with free golf-bag allowance and full-day driver hire for groups.",
        fullDayRate: [400, 900],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [55, 120],
        providers: ["Take a Chef", "Algarve Private Chefs"],
        mealTypes: ["Portuguese seafood", "steak dinner", "breakfast spread"],
        notes:
          "In-villa chefs are affordable in the Algarve — a cataplana-and-vinho-verde night at the villa is a highlight. Book ahead.",
      },
    ],
  },
  {
    id: "costa-del-sol-spain",
    city: "Costa del Sol",
    state: "Spain",
    region: "International",
    tagline: "Marbella & Sotogrande — Valderrama, Finca Cortesin, sun and beach clubs",
    description:
      "Spain's golf riviera. Play Ryder Cup host Valderrama, Solheim Cup host Finca Cortesin, and Robert Trent Jones's Sotogrande — then hit Marbella's beach clubs and Michelin tables. Málaga Airport, 320 days of sun a year, and a winter-golf bolt-hole.",
    population: "medium",
    nearestAirport: {
      code: "AGP",
      name: "Málaga Airport",
      driveMinutes: 45,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Mercadona and El Corte Inglés throughout Marbella and Sotogrande. Most courses allow walking; buggies are extra. Gibraltar (GIB) is also a viable arrival airport for Sotogrande.",
    courses: [
      {
        name: "Real Club Valderrama",
        tier: "bucket-list",
        greenFeeRange: [648, 724],
        holes: 18,
        par: 71,
        yardage: 6951,
        walkable: false,
        style: "parkland",
        driveMinutes: 60,
        url: "https://www.valderrama.com",
        highlight:
          "Host of the 1997 Ryder Cup — Spain's most famous course, with a mandatory forecaddie",
        hypeTag: "BUCKET LIST",
        rankNote: "1997 Ryder Cup host",
      },
      {
        name: "Finca Cortesin Golf Club",
        tier: "bucket-list",
        greenFeeRange: [405, 460],
        holes: 18,
        par: 72,
        yardage: 7500,
        walkable: false,
        style: "parkland",
        driveMinutes: 50,
        url: "https://www.fincacortesin.com/golf",
        highlight:
          "Host of the 2023 Solheim Cup, the first ever in Spain — immaculate and brutally long from the tips",
        hypeTag: "TOURNAMENT HOST",
        rankNote: "2023 Solheim Cup host",
      },
      {
        name: "Real Club de Golf Sotogrande",
        tier: "bucket-list",
        greenFeeRange: [270, 302],
        holes: 18,
        par: 72,
        yardage: 7099,
        walkable: true,
        style: "parkland",
        driveMinutes: 60,
        url: "https://www.golfsotogrande.com",
        highlight:
          "A Robert Trent Jones Sr. masterpiece he counted among his five personal favorites",
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "La Reserva Club Sotogrande",
        tier: "premium",
        greenFeeRange: [118, 283],
        holes: 18,
        par: 72,
        yardage: 7349,
        walkable: false,
        style: "parkland",
        driveMinutes: 60,
        url: "https://www.lareservaclubsotogrande.com",
        highlight:
          "Hillside layout with sweeping sea-to-mountain vistas and a Platinum Clubs pedigree",
      },
      {
        name: "Los Naranjos Golf Club",
        tier: "premium",
        greenFeeRange: [150, 191],
        holes: 18,
        par: 72,
        yardage: 7143,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.losnaranjos.com",
        highlight:
          'Classic orange-grove parkland in Marbella\'s "Golf Valley" — central and great value',
        googleRating: 4.4,
        reviewCount: 1235,
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [8, 14],
        nightlyRange: [700, 1100],
        amenities: [
          "luxury estate",
          "on-site Solheim course",
          "spa",
          "multiple restaurants",
          "beach club",
        ],
        areaDescription:
          "Finca Cortesin Hotel, Golf & Spa (Casares) — luxury estate anchoring the Solheim Cup course",
        searchUrl: "https://www.fincacortesin.com",
        notes:
          "The splurge base between Marbella and Sotogrande. Stay-and-play on the Solheim course; block-book rooms.",
        avgRating: 4.7,
      },
      {
        type: "house",
        sleeps: [8, 16],
        nightlyRange: [400, 2000],
        amenities: [
          "private pool",
          "full kitchen",
          "Golden Mile location",
          "beach access",
        ],
        areaDescription:
          "Marbella Golden Mile and Sotogrande villas — private-pool homes near the courses and beach clubs",
        searchUrl: "https://www.vrbo.com/search?destination=Marbella%2C+Spain",
        notes:
          "Marbella villas put you near nightlife; Sotogrande villas put you near the marquee courses. Pick by priority.",
        avgRating: 4.6,
      },
    ],
    dining: [
      {
        name: "Skina",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "small",
        highlight:
          "Two-Michelin-star contemporary Andalusian in Marbella old town — the trip's blowout dinner",
        reservationNeeded: true,
      },
      {
        name: "Nobu Marbella",
        style: "sushi",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Nikkei Japanese-Peruvian at Puente Romano — black cod and a scene to match",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "LEÑA by Dani García",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Wood-fired steakhouse from a three-star chef — built for a hungry foursome",
        reservationNeeded: true,
        googleRating: 4.5,
      },
    ],
    bars: [
      {
        name: "Boho Club (Bernie's Bar)",
        vibe: "cocktail",
        highlight:
          "Boutique hippie-chic bar on the Golden Mile with sunset DJ sets and bookable daybeds",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Cipriani Marbella",
        vibe: "cocktail",
        highlight:
          "Glossy designer cocktail bar at Puente Romano with a resident jazz quartet",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "El Panamé",
        vibe: "patio",
        highlight:
          "Relaxed terrace bar at Marbella marina with nightly DJ and sunset views",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Gibraltar Day Trip",
        type: "hiking",
        duration: "full day",
        pricePerPerson: [80, 150],
        groupFriendly: true,
        highlight:
          "Cable car up the Rock, the apes and the views across to Africa — an easy add from Sotogrande",
        bestFor: "rest day",
        provider: "Marbella Sun Trips",
      },
      {
        name: "Catamaran Charter from Marbella",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [80, 150],
        groupFriendly: true,
        highlight:
          "Charter a catamaran along the Costa del Sol with drinks and a swim stop",
        bestFor: "rest day",
        provider: "Royal Catamaran Marbella",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [6, 20],
        hourlyRate: [80, 180],
        providers: ["Golf-Drives", "Costa Sol Transport"],
        notes:
          "Golf-transport firms cover Málaga airport, the Sotogrande and Marbella courses, and night runs into Marbella with bag space.",
        fullDayRate: [450, 1000],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 160],
        providers: ["Private Chef Marbella", "Take a Chef"],
        mealTypes: ["Spanish seafood & paella", "steak dinner", "breakfast spread"],
        notes:
          "In-villa chefs serve Marbella, Sotogrande and La Zagaleta — a paella-and-Rioja night at the villa is the move. Book ahead.",
      },
    ],
  },
  {
    id: "nassau-bahamas",
    city: "Nassau",
    state: "Bahamas",
    region: "International",
    tagline: "Nicklaus & Weiskopf links a short hop from the US",
    description:
      "Bahamian golf with a casino chaser. Royal Blue at Baha Mar — the only Nicklaus Signature course in the country — and Tom Weiskopf's oceanside Ocean Club on Paradise Island, both backed by mega-resorts, casinos and beach bars. A 45-minute flight from Miami.",
    population: "medium",
    nearestAirport: {
      code: "NAS",
      name: "Lynden Pindling International Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Solomon's and Super Value markets on New Providence. Golf is on the resort properties; carts are essentially required in the heat.",
    courses: [
      {
        name: "Royal Blue Golf Course at Baha Mar",
        tier: "bucket-list",
        greenFeeRange: [275, 325],
        holes: 18,
        par: 72,
        yardage: 7153,
        walkable: false,
        style: "resort",
        driveMinutes: 12,
        url: "https://www.bahamar.com/reservations/golf/",
        highlight:
          "The only Jack Nicklaus Signature course in the Bahamas — restored and reopened with the Baha Mar resort",
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "Ocean Club Golf Course",
        tier: "premium",
        greenFeeRange: [140, 225],
        holes: 18,
        par: 72,
        yardage: 7159,
        walkable: false,
        style: "coastal",
        driveMinutes: 25,
        url: "https://www.oceanclubgolfcourse.com",
        highlight:
          "Tom Weiskopf peninsula course on Paradise Island — often called the prettiest in the Bahamas; a Korn Ferry Tour host",
        hypeTag: "TOURNAMENT HOST",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [10, 20],
        nightlyRange: [314, 700],
        amenities: [
          "on-site casino",
          "Royal Blue course on-site",
          "beach",
          "multiple restaurants",
          "pools",
        ],
        areaDescription:
          "Grand Hyatt Baha Mar (Cable Beach) — casino and the Royal Blue course on property; the golf-centric base",
        searchUrl: "https://www.bahamar.com",
        notes:
          "Best golf base on New Providence — course and casino on site. Per-room pricing; add the resort fee to the math.",
        avgRating: 4.5,
      },
      {
        type: "resort-house",
        sleeps: [10, 20],
        nightlyRange: [400, 900],
        amenities: [
          "casino",
          "water park",
          "aquarium",
          "near Ocean Club course",
          "multiple restaurants",
        ],
        areaDescription:
          "Atlantis Paradise Island — casino, water park and the Ocean Club course nearby",
        searchUrl: "https://www.atlantisbahamas.com",
        notes:
          "Bigger and more chaotic than Baha Mar, but unbeatable for a group that wants the casino-and-waterpark scene next to the Ocean Club course.",
        avgRating: 4.3,
      },
    ],
    dining: [
      {
        name: "Marcus at Baha Mar",
        style: "seafood",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Marcus Samuelsson's fish-and-chops rooftop spot at Baha Mar — the standout resort dinner",
        reservationNeeded: true,
        googleRating: 4.4,
      },
      {
        name: "Graycliff Restaurant",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Fine dining in a 1700s downtown Nassau mansion with one of the great wine cellars in the world",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Dune (Four Seasons Ocean Club)",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Jean-Georges beachfront French-Asian on Paradise Island — the celebration dinner near the Ocean Club course",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Martini Bar at the Ocean Club",
        vibe: "cocktail",
        highlight:
          "Cinematic Paradise Island bar where James Bond ordered his martini in Casino Royale",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "The Out Island Bar (Baha Mar)",
        vibe: "tiki",
        highlight:
          "Open-air beachside bar at Baha Mar with a 1950s-Nassau feel",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "John Watling's Distillery",
        vibe: "patio",
        highlight:
          "Historic estate distillery downtown for rum tours and tastings on the veranda",
        lateNight: false,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Exuma Swimming Pigs Day Trip",
        type: "boat-rental",
        duration: "full day",
        pricePerPerson: [180, 500],
        groupFriendly: true,
        highlight:
          "Fly or boat to the Exumas to swim with the famous pigs and snorkel the cays — a bucket-list rest day",
        bestFor: "rest day",
        provider: "Exuma Water Tours",
      },
      {
        name: "Baha Mar & Atlantis Casinos",
        type: "casino",
        duration: "half day",
        pricePerPerson: [0, 0],
        groupFriendly: true,
        highlight:
          "Two full Vegas-style casinos on the island — free entry, open late, steps from your room",
        bestFor: "arrival day",
        provider: "Baha Mar Casino / Atlantis Casino",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [6, 16],
        hourlyRate: [80, 180],
        providers: ["Simon's Transport Bahamas", "Bahamas Executive Tours"],
        notes:
          "Pre-book private transfers from NAS to Baha Mar or Atlantis with meet-and-greet — far smoother than the taxi line with golf clubs.",
        fullDayRate: [450, 1000],
        canDoGolfAndBars: true,
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [85, 175],
        providers: ["Private Chef Nassau", "Take a Chef"],
        mealTypes: ["fresh-catch seafood", "Bahamian feast", "steak dinner", "breakfast spread"],
        notes:
          "If the group rents a villa, an in-villa chef will cook conch and fresh catch on site. Book ahead in high season.",
      },
    ],
  },
];
