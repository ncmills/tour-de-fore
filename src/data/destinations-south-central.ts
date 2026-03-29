import { Destination } from "./types";

export const southCentralDestinations: Destination[] = [
  {
    id: "horseshoe-bay-tx",
    city: "Horseshoe Bay",
    state: "TX",
    region: "South Central",
    tagline: "Four championship courses on Lake LBJ in the Texas Hill Country",
    description:
      "Horseshoe Bay Resort is the crown jewel of Texas Hill Country golf — four Robert Trent Jones Sr./Sr. courses carved through granite hills and live oaks overlooking Lake LBJ. Stay on-site for seamless golf, then hit the lake for sunset boat cruises. It's resort golf done right without the pretension.",
    population: "tiny",
    nearestAirport: {
      code: "AUS",
      name: "Austin-Bergstrom International Airport",
      driveMinutes: 90,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Horseshoe Bay - Ram Rock",
        tier: "bucket-list",
        greenFeeRange: [125, 210],
        holes: 18,
        par: 71,
        yardage: 6926,
        slope: 137,
        rating: 73.5,
        walkable: false,
        style: "resort",
        driveMinutes: 0,
        url: "https://www.hsbresort.com/golf",
        highlight:
          "Robert Trent Jones Sr.'s Texas masterpiece — carved through solid granite with dramatic forced carries over ravines",
      },
      {
        name: "Horseshoe Bay - Slick Rock",
        tier: "premium",
        greenFeeRange: [100, 175],
        holes: 18,
        par: 72,
        yardage: 6834,
        slope: 131,
        rating: 72.8,
        walkable: false,
        style: "resort",
        driveMinutes: 0,
        url: "https://www.hsbresort.com/golf",
        highlight:
          "Most scenic of the four courses — plays along Slick Rock Creek with waterfalls and wildflowers in spring",
      },
      {
        name: "Horseshoe Bay - Apple Rock",
        tier: "premium",
        greenFeeRange: [100, 175],
        holes: 18,
        par: 72,
        yardage: 6999,
        slope: 136,
        rating: 73.6,
        walkable: false,
        style: "resort",
        driveMinutes: 0,
        url: "https://www.hsbresort.com/golf",
        highlight:
          "The toughest of the four — elevated tees with panoramic Hill Country views and punishing carries",
      },
      {
        name: "Horseshoe Bay - Summit Rock",
        tier: "bucket-list",
        greenFeeRange: [175, 295],
        holes: 18,
        par: 72,
        yardage: 7029,
        slope: 142,
        rating: 74.1,
        walkable: false,
        style: "resort",
        driveMinutes: 5,
        url: "https://www.hsbresort.com/golf",
        highlight:
          "Jack Nicklaus signature design and the newest addition — 400 feet of elevation change with jaw-dropping views of Lake LBJ",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [800, 2500],
        amenities: [
          "lake views",
          "pool access",
          "golf cart",
          "full kitchen",
          "resort amenities",
        ],
        areaDescription: "Horseshoe Bay Resort condos and villas",
        searchUrl: "https://www.hsbresort.com",
        notes:
          "On-resort condos and villas sleep up to 16 when you book multiple units. Golf packages include cart and range. Staying on-site means zero transport headaches.",
      },
      {
        type: "lakehouse",
        sleeps: [12, 20],
        nightlyRange: [700, 2200],
        amenities: [
          "private dock",
          "lake access",
          "hot tub",
          "outdoor kitchen",
          "fire pit",
          "boat lift",
        ],
        areaDescription: "Lake LBJ waterfront homes near Horseshoe Bay",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/texas/horseshoe-bay",
        notes:
          "Lake LBJ houses with private docks are the play for larger groups. Most are 5-10 min from the resort. Book a pontoon boat with the house.",
      },
    ],
    dining: [
      {
        name: "Captain Pete's Boathouse",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Casual lakeside dining on Lake LBJ with great sunset views, fish tacos, and cold beer on tap",
        reservationNeeded: false,
      },
      {
        name: "Horseshoe Bay Resort - Summit Restaurant",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Upscale resort steakhouse with Hill Country views, prime cuts, and an extensive Texas wine list",
        reservationNeeded: true,
      },
      {
        name: "The Lighthouse",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Waterfront bar and grill at the marina with burgers, chicken fried steak, and a dock you can boat up to",
        reservationNeeded: false,
      },
      {
        name: "Russo's Italian Kitchen",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "New York-style pizza and pasta in Marble Falls — solid group dinner option when you want a break from steak",
        reservationNeeded: false,
      },
      {
        name: "River City Grille",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Marble Falls steakhouse with hand-cut steaks, live music on weekends, and a big patio",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Slick Rock Bar & Grill",
        vibe: "patio",
        highlight:
          "19th hole at the resort with cold Lone Stars, a big patio, and post-round debrief vibes",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Flat Creek Estate Winery",
        vibe: "patio",
        highlight:
          "Hill Country winery 15 min from the resort with tastings, a bistro, and vineyard views",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Double Horn Brewing",
        vibe: "brewpub",
        highlight:
          "Marble Falls craft brewery with a taproom, games, and food trucks on weekends",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Woody's Sports Bar",
        vibe: "sports-bar",
        highlight:
          "Marble Falls dive with pool tables, darts, and the kind of late-night energy a golf trip needs",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Lake LBJ Pontoon Boat Rental",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [40, 75],
        groupFriendly: true,
        highlight:
          "Rent a pontoon or party barge on Lake LBJ — swim, fish, and drink on the constant-level lake",
        bestFor: "rest day",
        provider: "Horseshoe Bay Resort Marina",
      },
      {
        name: "Lake LBJ Jet Skiing",
        type: "water-sports",
        duration: "2-3 hours",
        pricePerPerson: [60, 100],
        groupFriendly: true,
        highlight:
          "Jet ski the calm waters of Lake LBJ through granite-lined coves",
        bestFor: "rest day",
      },
      {
        name: "Flat Creek Estate Wine Tasting",
        type: "winery",
        duration: "2-3 hours",
        pricePerPerson: [20, 40],
        groupFriendly: true,
        highlight:
          "Acclaimed Hill Country winery with vineyard tours and Italian varietal tastings",
        bestFor: "arrival day",
        provider: "Flat Creek Estate",
      },
      {
        name: "Horseshoe Bay Resort Spa",
        type: "spa",
        duration: "2-3 hours",
        pricePerPerson: [100, 200],
        groupFriendly: true,
        highlight:
          "Full-service resort spa — massage, steam room, and pool recovery after a 36-hole day",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [12, 16],
        hourlyRate: [125, 200],
        providers: ["Hill Country Shuttle", "Marble Falls Limo"],
        notes:
          "If staying on-resort, you likely won't need transport for golf. Shuttles are useful for wine trail or Marble Falls dinner runs.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 120],
        providers: ["Hill Country Chef", "Texas Personal Chef Service"],
        mealTypes: [
          "Texas BBQ cookout",
          "steak dinner",
          "fajita night",
          "breakfast tacos",
        ],
        notes:
          "Lakehouse kitchens are usually large enough for a chef setup. BBQ cookout on the dock is the signature move. Some chefs will do a whole brisket smoked on-site.",
      },
    ],
  },
  {
    id: "fredericksburg-tx",
    city: "Fredericksburg",
    state: "TX",
    region: "South Central",
    tagline: "Hill Country wine, German heritage, and hidden gem golf",
    description:
      "Fredericksburg is the intersection of Texas wine country and Hill Country golf. Boot Ranch is the star — a private club with limited guest access — but the public options and nearby courses keep it interesting. After golf, hit the 50+ wineries on 290, eat German-Texan BBQ, and wander Main Street. A refined trip with Texas soul.",
    population: "small",
    nearestAirport: {
      code: "SAT",
      name: "San Antonio International Airport",
      driveMinutes: 90,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Boot Ranch Golf Club",
        tier: "bucket-list",
        greenFeeRange: [200, 350],
        holes: 18,
        par: 72,
        yardage: 7180,
        slope: 141,
        rating: 74.2,
        walkable: false,
        style: "resort",
        driveMinutes: 10,
        url: "https://www.bootranch.com",
        highlight:
          "Hal Sutton design through live oaks and granite outcrops — one of the best private courses in Texas with limited reciprocal access",
      },
      {
        name: "Lady Bird Johnson Golf Course",
        tier: "solid",
        greenFeeRange: [35, 60],
        holes: 18,
        par: 72,
        yardage: 6425,
        slope: 120,
        rating: 69.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.fbgtx.org/golf",
        highlight:
          "Affordable municipal course right in town — friendly layout with wildflower-lined fairways in spring",
      },
      {
        name: "Comanche Trace",
        tier: "premium",
        greenFeeRange: [85, 145],
        holes: 27,
        par: 72,
        yardage: 6852,
        slope: 133,
        rating: 72.8,
        walkable: false,
        style: "resort",
        driveMinutes: 10,
        highlight:
          "Tom Kite design with 27 holes through rugged Hill Country terrain — three distinct 9-hole loops with dramatic elevation",
      },
    ],
    lodging: [
      {
        type: "ranch",
        sleeps: [12, 20],
        nightlyRange: [800, 2800],
        amenities: [
          "pool",
          "fire pit",
          "outdoor kitchen",
          "Hill Country views",
          "game room",
          "horseshoe pit",
        ],
        areaDescription: "Wine Road 290 corridor / ranch properties",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/texas/fredericksburg",
        notes:
          "Hill Country ranches and estate homes along the 290 wine corridor are ideal. Many have 10+ acres of privacy and vineyard views. Book 2-3 months ahead for spring.",
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [600, 1800],
        amenities: [
          "hot tub",
          "outdoor grill",
          "covered patio",
          "walkable to Main Street",
        ],
        areaDescription: "Downtown Fredericksburg / Main Street area",
        searchUrl: "https://www.airbnb.com/s/Fredericksburg--TX",
        notes:
          "Downtown properties let you walk Main Street bars and restaurants. German-style Sunday Houses are charming but small — look for larger homes on the outskirts of downtown.",
      },
    ],
    dining: [
      {
        name: "Otto's German Bistro",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "German-Texas fusion fine dining — schnitzel, bratwurst, and Hill Country game with local wine pairings",
        reservationNeeded: true,
      },
      {
        name: "Cranky Frank's BBQ Co.",
        style: "bbq",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Central Texas BBQ with brisket, sausage, and turkey — outdoor picnic tables and BYOB friendly",
        reservationNeeded: false,
      },
      {
        name: "The Beerhive",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Casual Main Street spot with 40+ craft beers, sausage plates, and a great beer garden patio",
        reservationNeeded: false,
      },
      {
        name: "Cabernet Grill",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Texas wine country fine dining with ranch-sourced meats and the deepest Texas wine list in town",
        reservationNeeded: true,
      },
      {
        name: "Hondo's on Main",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Tex-Mex on Main Street with live music, margaritas, and a huge rooftop patio — the group hangout spot",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Hondo's on Main",
        vibe: "rooftop",
        highlight:
          "Rooftop margarita bar with live Texas country music and Main Street views — the move every night",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Auslander",
        vibe: "patio",
        highlight:
          "German beer garden with boots of beer, a biergarten patio, and polka vibes",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Altdorf Biergarten",
        vibe: "patio",
        highlight:
          "Outdoor beer garden with live music, cold German brews, and a chill vibe under the oaks",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Lincoln Street Wine Market",
        vibe: "whiskey-bar",
        highlight:
          "Cozy wine and whiskey bar a block off Main — curated Texas wines and craft cocktails",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "290 Wine Trail Tour",
        type: "winery",
        duration: "full day",
        pricePerPerson: [30, 80],
        groupFriendly: true,
        highlight:
          "Hit 5-6 wineries along the 290 corridor — Grape Creek, Pedernales Cellars, William Chris, Becker Vineyards",
        bestFor: "rest day",
      },
      {
        name: "Garrison Brothers Bourbon Tour",
        type: "distillery",
        duration: "2-3 hours",
        pricePerPerson: [25, 40],
        groupFriendly: true,
        highlight:
          "Texas' first legal bourbon distillery — tour the ranch, taste the barrel proof, and buy bottles",
        bestFor: "arrival day",
        provider: "Garrison Brothers Distillery",
      },
      {
        name: "Horseback Riding in Hill Country",
        type: "horseback",
        duration: "2-3 hours",
        pricePerPerson: [65, 100],
        groupFriendly: true,
        highlight:
          "Guided trail ride through wildflower meadows and live oak groves on a working ranch",
        bestFor: "rest day",
        provider: "Dos Cabezas Ranch",
      },
      {
        name: "Enchanted Rock Hiking",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [8, 15],
        groupFriendly: true,
        highlight:
          "Summit the iconic 425-foot pink granite dome — 360-degree Hill Country views from the top",
        bestFor: "morning before golf",
      },
      {
        name: "Skeet Shooting at Joshua Creek Ranch",
        type: "skeet",
        duration: "2-3 hours",
        pricePerPerson: [100, 175],
        groupFriendly: true,
        highlight:
          "Sporting clays and driven bird shoots on a 1,500-acre ranch — premier shooting experience in Texas",
        bestFor: "rest day",
        provider: "Joshua Creek Ranch",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 22],
        hourlyRate: [200, 350],
        providers: [
          "Fredericksburg Limo & Party Bus",
          "Hill Country Wine Tours",
          "Texas Wine Shuttle",
        ],
        notes:
          "Essential for wine trail days. Many wine tour companies offer all-day packages with driver and cooler. Book 2-3 weeks ahead for weekends.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 130],
        providers: ["Hill Country Personal Chef", "Farm to Fork Fredericksburg"],
        mealTypes: [
          "smoked brisket dinner",
          "Hill Country game dinner",
          "fajita night",
          "German-Texas dinner",
          "breakfast",
        ],
        notes:
          "Ranch kitchens are big enough for full chef setups. Ask for venison, quail, or wild boar — locally sourced game is the move here.",
      },
    ],
  },
  {
    id: "hot-springs-ar",
    city: "Hot Springs",
    state: "AR",
    region: "South Central",
    tagline: "Historic spa town golf in the Ouachita Mountains",
    description:
      "Hot Springs is an underrated golf trip gem — solid mountain courses at low prices, legendary Bathhouse Row for recovery, and Oaklawn racing for a gambling fix. The national park setting adds a unique backdrop, and the lower costs mean you can play more rounds and eat more steak. Old-school Americana with legit golf.",
    population: "small",
    nearestAirport: {
      code: "LIT",
      name: "Bill and Hillary Clinton National Airport",
      driveMinutes: 60,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Hot Springs Country Club - Arlington Course",
        tier: "premium",
        greenFeeRange: [65, 110],
        holes: 18,
        par: 72,
        yardage: 6668,
        slope: 130,
        rating: 72.0,
        walkable: false,
        style: "mountain",
        driveMinutes: 5,
        highlight:
          "Classic 1890s course redesigned by Willie Park Jr. — tight mountain fairways with views of the Ouachita range",
      },
      {
        name: "Hot Springs Country Club - Majestic Course",
        tier: "solid",
        greenFeeRange: [50, 85],
        holes: 18,
        par: 72,
        yardage: 6540,
        slope: 126,
        rating: 70.8,
        walkable: false,
        style: "mountain",
        driveMinutes: 5,
        highlight:
          "Companion course at HSCC — more open and forgiving than the Arlington with some of the same mountain views",
      },
      {
        name: "Mountain Ranch Golf Club",
        tier: "solid",
        greenFeeRange: [40, 65],
        holes: 18,
        par: 71,
        yardage: 6507,
        slope: 124,
        rating: 70.5,
        walkable: false,
        style: "mountain",
        driveMinutes: 15,
        highlight:
          "Mountain target golf with dramatic elevation changes — several blind shots over ridgelines keep it interesting",
      },
      {
        name: "Diamante Golf Club",
        tier: "premium",
        greenFeeRange: [55, 95],
        holes: 18,
        par: 72,
        yardage: 6865,
        slope: 132,
        rating: 73.0,
        walkable: false,
        style: "mountain",
        driveMinutes: 20,
        highlight:
          "Longest and most challenging public course in the area — carved through dense Ouachita forest with water on eight holes",
      },
      {
        name: "Belvedere Country Club",
        tier: "solid",
        greenFeeRange: [35, 55],
        holes: 18,
        par: 72,
        yardage: 6345,
        slope: 121,
        rating: 69.7,
        walkable: true,
        style: "mountain",
        driveMinutes: 10,
        highlight:
          "Classic 1920s course with a throwback feel — short but strategic with small, fast greens",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [400, 1200],
        amenities: [
          "lake views",
          "hot tub",
          "fire pit",
          "game room",
          "deck",
          "grill",
        ],
        areaDescription: "Lake Hamilton waterfront",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/arkansas/hot-springs",
        notes:
          "Lake Hamilton houses are the best option — affordable, waterfront, and 10 min from everything. Many have private docks and boat slips.",
      },
      {
        type: "lodge",
        sleeps: [12, 18],
        nightlyRange: [500, 1400],
        amenities: [
          "mountain views",
          "hot tub",
          "fireplace",
          "outdoor kitchen",
          "screened porch",
        ],
        areaDescription: "Ouachita Mountain area / west of town",
        searchUrl: "https://www.airbnb.com/s/Hot-Springs--AR",
        notes:
          "Mountain lodges offer seclusion and privacy. Slightly further from courses but great for groups wanting a wilderness feel. Very affordable compared to peer destinations.",
      },
    ],
    dining: [
      {
        name: "The Ohio Club",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Oldest bar in Arkansas (1905) now serving steaks — Al Capone used to hang here. Live blues most nights.",
        reservationNeeded: true,
      },
      {
        name: "McClard's Bar-B-Q",
        style: "bbq",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Legendary since 1928 — Bill Clinton's favorite BBQ spot with ribs, tamales, and a secret sauce recipe",
        reservationNeeded: false,
      },
      {
        name: "Fisherman's Wharf",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Lake Hamilton waterfront spot with catfish, crawfish, and sunset views from the dock",
        reservationNeeded: false,
      },
      {
        name: "Rolando's Nuevo Latino Restaurante",
        style: "mexican",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Cuban-Latin fusion in a converted bungalow — creative dishes, strong margaritas, and a cult following",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "The Ohio Club",
        vibe: "whiskey-bar",
        highlight:
          "Oldest bar in Arkansas with original 1905 mahogany bar, live blues, and serious whiskey collection",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Maxine's Live",
        vibe: "dive",
        highlight:
          "Live music venue in a former bathhouse-era bordello — rock, blues, and cheap drinks in a historic space",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Superior Bathhouse Brewery",
        vibe: "brewpub",
        highlight:
          "The only brewery inside a national park — craft beer brewed with Hot Springs thermal water. Not a joke.",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Arlington Lobby Bar",
        vibe: "cocktail",
        highlight:
          "Grand hotel lobby bar with old-school cocktails and a cigar-lounge feel in the iconic Arlington Hotel",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Bathhouse Row Soaking",
        type: "spa",
        duration: "2-3 hours",
        pricePerPerson: [30, 75],
        groupFriendly: true,
        highlight:
          "Soak in natural thermal springs at Buckstaff or Quapaw bathhouses — the ultimate post-round recovery",
        bestFor: "rest day",
        provider: "Quapaw Baths & Spa",
      },
      {
        name: "Oaklawn Racing Casino Resort",
        type: "casino",
        duration: "half day",
        pricePerPerson: [20, 100],
        groupFriendly: true,
        highlight:
          "Live thoroughbred racing Jan-May, full casino year-round — perfect for a group gambling session",
        bestFor: "arrival day",
        provider: "Oaklawn Racing Casino Resort",
      },
      {
        name: "Lake Hamilton Boat Rental",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [35, 65],
        groupFriendly: true,
        highlight:
          "Pontoon or ski boat on Lake Hamilton — 7,000 acres of warm-water lake with coves and swimming spots",
        bestFor: "rest day",
      },
      {
        name: "Hot Springs Mountain Tower Hike",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [8, 12],
        groupFriendly: true,
        highlight:
          "Short hike through Hot Springs National Park to the observation tower — 140-mile views from the top",
        bestFor: "morning before golf",
      },
      {
        name: "Lake Ouachita Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [80, 150],
        groupFriendly: false,
        highlight:
          "Guided bass and striper fishing on crystal-clear Lake Ouachita — 40,000 acres and 690 miles of shoreline",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [12, 18],
        hourlyRate: [100, 175],
        providers: ["Hot Springs Shuttle", "Diamond Lakes Limo"],
        notes:
          "Downtown Hot Springs is walkable at night. Shuttles mainly needed for course-to-course transport and Lake Hamilton runs. Very affordable compared to other destinations.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [50, 90],
        providers: ["Arkansas Private Chef", "Lake Hamilton Catering"],
        mealTypes: [
          "Southern steak dinner",
          "fried catfish cookout",
          "BBQ ribs",
          "breakfast",
        ],
        notes:
          "Fried catfish and BBQ are the local specialties. Lake houses have big kitchens and outdoor spaces perfect for chef setups. Prices are notably lower than Texas or coastal destinations.",
      },
    ],
  },
  {
    id: "branson-mo",
    city: "Branson",
    state: "MO",
    region: "South Central",
    tagline: "Ozarks golf with lake life, live shows, and surprisingly great courses",
    description:
      "Branson is the sleeper pick of South Central golf trips. Top of the Rock is a legitimate bucket-list par-3, the Big Cedar Lodge courses are world-class, and the surrounding Ozark Mountains provide stunning backdrops. Table Rock Lake adds water activities, and the show-and-entertainment scene means there's always something to do after dark.",
    population: "small",
    nearestAirport: {
      code: "SGF",
      name: "Springfield-Branson National Airport",
      driveMinutes: 45,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Top of the Rock - Jack Nicklaus Par-3 Course",
        tier: "bucket-list",
        greenFeeRange: [175, 295],
        holes: 9,
        par: 27,
        yardage: 1305,
        slope: 113,
        rating: 28.4,
        walkable: true,
        style: "mountain",
        driveMinutes: 10,
        url: "https://www.bigcedar.com/golf",
        highlight:
          "Nicklaus-designed par-3 masterpiece at Big Cedar Lodge — caves, waterfalls, and Table Rock Lake views. The 9th hole plays into a natural cave.",
      },
      {
        name: "Branson Hills Golf Club",
        tier: "premium",
        greenFeeRange: [65, 110],
        holes: 18,
        par: 72,
        yardage: 7189,
        slope: 136,
        rating: 74.0,
        walkable: false,
        style: "mountain",
        driveMinutes: 10,
        url: "https://www.bransonhillsgolf.com",
        highlight:
          "Chuck Smith design consistently ranked #1 public course in Missouri — dramatic Ozark terrain with 200 feet of elevation change",
      },
      {
        name: "Payne Stewart Golf Club",
        tier: "solid",
        greenFeeRange: [35, 60],
        holes: 18,
        par: 72,
        yardage: 6404,
        slope: 124,
        rating: 70.2,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.bransonmo.gov/golf",
        highlight:
          "Municipal course named for Branson's most famous golfer — great value with well-maintained fairways and mountain views",
      },
      {
        name: "Thousand Hills Golf Resort",
        tier: "solid",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 64,
        yardage: 4951,
        slope: 115,
        rating: 63.8,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.thousandhills.com",
        highlight:
          "Short executive course perfect for an afternoon round or hangover day — fun layout through Ozark hills",
      },
      {
        name: "LedgeStone Championship Golf Course",
        tier: "premium",
        greenFeeRange: [65, 105],
        holes: 18,
        par: 71,
        yardage: 6876,
        slope: 137,
        rating: 73.2,
        walkable: false,
        style: "mountain",
        driveMinutes: 10,
        url: "https://www.ledgestonegolf.com",
        highlight:
          "Tom Clark design carved through Ozark ridgelines with 250 feet of elevation change — bring your A-game and extra balls",
      },
      {
        name: "Buffalo Ridge Springs - Big Cedar Lodge",
        tier: "bucket-list",
        greenFeeRange: [150, 250],
        holes: 18,
        par: 71,
        yardage: 7036,
        slope: 138,
        rating: 73.5,
        walkable: true,
        style: "mountain",
        driveMinutes: 15,
        url: "https://www.bigcedar.com/golf",
        highlight:
          "Tom Fazio design at Big Cedar — natural springs, Ozark meadows, and bison grazing near the fairways. One of the most scenic courses in the country.",
      },
    ],
    lodging: [
      {
        type: "cabin",
        sleeps: [12, 20],
        nightlyRange: [500, 1600],
        amenities: [
          "hot tub",
          "fire pit",
          "game room",
          "mountain views",
          "deck",
          "pool table",
        ],
        areaDescription: "Table Rock Lake / Indian Point area",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/missouri/branson",
        notes:
          "Large cabins on Table Rock Lake give you lake access and seclusion. Many sleep 16+ with bunk rooms and game rooms. Excellent value — half the price of comparable destinations.",
      },
      {
        type: "lodge",
        sleeps: [10, 16],
        nightlyRange: [600, 1800],
        amenities: [
          "lakefront",
          "dock access",
          "kayaks",
          "outdoor kitchen",
          "hot tub",
          "fire pit",
        ],
        areaDescription: "Big Cedar Lodge / Ridgedale area",
        searchUrl: "https://www.bigcedar.com",
        notes:
          "Big Cedar Lodge cabins and lodges put you on-site for Top of the Rock and Buffalo Ridge. Premium but worth it for the full experience.",
      },
    ],
    dining: [
      {
        name: "Top of the Rock - Osage Restaurant",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Fine dining overlooking Table Rock Lake at Big Cedar — wood-fired steaks and Ozark game dishes with sunset views",
        reservationNeeded: true,
      },
      {
        name: "Danna's BBQ & Burger Shop",
        style: "bbq",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Award-winning Branson BBQ with brisket, burnt ends, and scratch sides — the local favorite",
        reservationNeeded: false,
      },
      {
        name: "Level 2 Steakhouse",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Hilton steakhouse with hand-cut prime beef, a solid bourbon list, and group-friendly private dining",
        reservationNeeded: true,
      },
      {
        name: "Florentina's Ristorante Italiano",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Homemade pasta and family-style Italian platters — big portions for big appetites after 36 holes",
        reservationNeeded: true,
      },
      {
        name: "Fall Creek Steak & Cocktail House",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Classic Ozark steakhouse with a lodge feel, premium cuts, and old-fashioned cocktails",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Waxy O'Shea's Irish Pub",
        vibe: "sports-bar",
        highlight:
          "Irish pub on the Branson Landing with live music, whiskey flights, and a solid beer list",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Andy's Frozen Custard & Bar",
        vibe: "patio",
        highlight:
          "Local institution on the strip — frozen custard and casual drinks with outdoor seating",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Ernie Biggs Piano Bar",
        vibe: "cocktail",
        highlight:
          "Dueling piano bar on Branson Landing — sing-alongs, audience requests, and rowdy group energy",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Clockers Cafe",
        vibe: "dive",
        highlight:
          "No-frills Branson dive with cheap drinks, pool, and the kind of authenticity that's hard to find on the strip",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Table Rock Lake Boat Rental",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [40, 75],
        groupFriendly: true,
        highlight:
          "Pontoon or speedboat on crystal-clear Table Rock Lake — swimming, fishing, and cliff jumping in secluded coves",
        bestFor: "rest day",
        provider: "State Park Marina",
      },
      {
        name: "Branson Zipline at Wolfe Creek",
        type: "zipline",
        duration: "2-3 hours",
        pricePerPerson: [60, 90],
        groupFriendly: true,
        highlight:
          "Seven ziplines over Ozark forests and a blue-water lake — the canopy tour is a rush",
        bestFor: "rest day",
        provider: "Branson Zipline",
      },
      {
        name: "Shepherd of the Hills Fish Hatchery",
        type: "fishing",
        duration: "2-3 hours",
        pricePerPerson: [0, 10],
        groupFriendly: true,
        highlight:
          "Free trout fishing below Table Rock Dam in one of the most productive tailwaters in the Ozarks",
        bestFor: "morning before golf",
      },
      {
        name: "Silver Dollar City",
        type: "zipline",
        duration: "full day",
        pricePerPerson: [55, 80],
        groupFriendly: true,
        highlight:
          "1880s-themed amusement park with coasters, crafts, and seasonal festivals — surprisingly fun for adults",
        bestFor: "rest day",
      },
      {
        name: "Top of the Rock Lost Canyon Cave Trail",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [45, 75],
        groupFriendly: true,
        highlight:
          "Guided cart tour through caves, past waterfalls, and along Ozark cliffs at Big Cedar — a natural wonder",
        bestFor: "arrival day",
        provider: "Big Cedar Lodge",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [12, 20],
        hourlyRate: [100, 175],
        providers: ["Branson Scenic Tours", "Ozark Mountain Shuttle"],
        notes:
          "Courses are spread 10-25 min apart. Group shuttles are affordable and essential. Branson Landing is walkable for nightlife.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [50, 95],
        providers: ["Ozark Chef Co", "Branson Private Dining"],
        mealTypes: [
          "steak dinner",
          "BBQ cookout",
          "Ozark game dinner",
          "breakfast",
        ],
        notes:
          "Cabin kitchens in the Branson area are typically large and well-equipped for chef setups. Smoked trout and Ozark game options are unique to the area. Very affordable rates.",
      },
    ],
  },
  {
    id: "san-antonio-tx",
    city: "San Antonio",
    state: "TX",
    region: "South Central",
    tagline: "PGA Tour golf, River Walk nightlife, and Tex-Mex everything",
    description:
      "San Antonio brings PGA Tour-caliber golf at TPC San Antonio, a unique urban course at The Quarry, and the legendary River Walk for after-dark entertainment. This is a golf trip where the nightlife truly rivals the courses. Tex-Mex, margaritas, and live music keep the energy up between rounds.",
    population: "medium",
    nearestAirport: {
      code: "SAT",
      name: "San Antonio International Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "TPC San Antonio - Oaks Course",
        tier: "bucket-list",
        greenFeeRange: [175, 295],
        holes: 18,
        par: 72,
        yardage: 7435,
        slope: 143,
        rating: 76.2,
        walkable: false,
        style: "resort",
        driveMinutes: 25,
        url: "https://www.tpc.com/san-antonio",
        highlight:
          "Home of the PGA Tour's Valero Texas Open — Greg Norman/Sergio Garcia design with Hill Country terrain and tour-level conditioning",
      },
      {
        name: "TPC San Antonio - Canyons Course",
        tier: "premium",
        greenFeeRange: [125, 210],
        holes: 18,
        par: 72,
        yardage: 7101,
        slope: 138,
        rating: 74.3,
        walkable: false,
        style: "resort",
        driveMinutes: 25,
        url: "https://www.tpc.com/san-antonio",
        highlight:
          "Pete Dye design at TPC — more dramatic elevation and tighter lines than the Oaks course with canyon carries",
      },
      {
        name: "The Quarry Golf Club",
        tier: "premium",
        greenFeeRange: [65, 115],
        holes: 18,
        par: 71,
        yardage: 6740,
        slope: 130,
        rating: 72.3,
        walkable: false,
        style: "desert",
        driveMinutes: 10,
        url: "https://www.quarrygolf.com",
        highlight:
          "Built inside a former quarry with 100-foot limestone walls — the back nine plays through the quarry pit. Totally unique.",
      },
      {
        name: "Briggs Ranch Golf Club",
        tier: "premium",
        greenFeeRange: [70, 125],
        holes: 18,
        par: 72,
        yardage: 7159,
        slope: 133,
        rating: 74.0,
        walkable: false,
        style: "resort",
        driveMinutes: 30,
        url: "https://www.briggsranch.com",
        highlight:
          "South Texas ranch-style golf with mesquite-lined fairways, wildlife crossings, and generous landing areas",
      },
      {
        name: "La Cantera - Palmer Course",
        tier: "premium",
        greenFeeRange: [80, 140],
        holes: 18,
        par: 72,
        yardage: 6926,
        slope: 131,
        rating: 72.8,
        walkable: false,
        style: "resort",
        driveMinutes: 20,
        url: "https://www.lacanteragolfclub.com",
        highlight:
          "Arnold Palmer design on a former quarry site with panoramic Hill Country views and a challenging finishing stretch",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [600, 2000],
        amenities: [
          "pool",
          "hot tub",
          "game room",
          "outdoor kitchen",
          "Hill Country views",
        ],
        areaDescription: "Stone Oak / TPC San Antonio area (north side)",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/texas/san-antonio",
        notes:
          "North-side houses near TPC put you close to courses and 20-25 min from River Walk. Best balance of golf proximity and nightlife access.",
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [500, 1500],
        amenities: [
          "walkable to River Walk",
          "pool",
          "rooftop deck",
          "parking",
        ],
        areaDescription: "Downtown / King William / Southtown area",
        searchUrl: "https://www.airbnb.com/s/San-Antonio--TX",
        notes:
          "Downtown houses and condos put you walking distance to River Walk nightlife. Longer drive to courses but saves on transport for evenings.",
      },
    ],
    dining: [
      {
        name: "Biga on the Banks",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "River Walk fine dining with New American cuisine, private dining room, and one of the best wine lists in the city",
        reservationNeeded: true,
      },
      {
        name: "2M Smokehouse",
        style: "bbq",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Texas Monthly Top 50 BBQ — Central Texas brisket with Tex-Mex twists like barbacoa and jalapeño sausage",
        reservationNeeded: false,
      },
      {
        name: "Mi Tierra Cafe & Bakery",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "24-hour Tex-Mex institution in Market Square since 1941 — mariachi bands, enchiladas, and pan dulce at 2am",
        reservationNeeded: false,
      },
      {
        name: "Bohanan's Prime Steaks & Seafood",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "San Antonio's top steakhouse with a private mezzanine for groups — dry-aged prime beef and a 900-label wine list",
        reservationNeeded: true,
      },
      {
        name: "La Gloria",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Authentic Mexican street food from chef Johnny Hernandez — tacos al pastor, elote, and fresh agua frescas at the Pearl",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "The Esquire Tavern",
        vibe: "whiskey-bar",
        highlight:
          "Longest bar in Texas (100 feet) right on the River Walk — craft cocktails in a 1933 post-Prohibition building",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Friendly Spot Ice House",
        vibe: "patio",
        highlight:
          "Massive outdoor beer garden in Southtown with 300+ beers, food trucks, and games — the ultimate group hangout",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Pat O'Brien's San Antonio",
        vibe: "patio",
        highlight:
          "New Orleans-style River Walk bar with dueling pianos, Hurricanes, and a courtyard fountain",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Busted Sandal Brewing Company",
        vibe: "brewpub",
        highlight:
          "Local craft brewery with a taproom and beer garden — Texas-brewed IPAs and lagers with a casual vibe",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Howl at the Moon",
        vibe: "cocktail",
        highlight:
          "Dueling piano bar on the River Walk — bucket drinks, sing-alongs, and peak golf-trip energy on weekends",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "River Walk Bar Crawl",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [40, 80],
        groupFriendly: true,
        highlight:
          "Walk the 15-mile River Walk hitting bars from Pat O'Brien's to Esquire Tavern — no designated driver needed",
        bestFor: "arrival day",
      },
      {
        name: "Topgolf San Antonio",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [30, 50],
        groupFriendly: true,
        highlight:
          "Multi-level driving range with food and drinks — competitive games for the group between real rounds",
        bestFor: "arrival day",
      },
      {
        name: "San Antonio Sporting Clays",
        type: "shooting",
        duration: "2-3 hours",
        pricePerPerson: [50, 85],
        groupFriendly: true,
        highlight:
          "14-station sporting clays course through South Texas brush country — shotguns and ammo included",
        bestFor: "rest day",
        provider: "National Shooting Complex",
      },
      {
        name: "San Antonio Missions Brewery Tour",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [25, 50],
        groupFriendly: true,
        highlight:
          "Hit Ranger Creek, Freetail, and Busted Sandal breweries with a driver — South Texas craft beer at its best",
        bestFor: "rest day",
      },
      {
        name: "Natural Bridge Caverns",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [25, 40],
        groupFriendly: true,
        highlight:
          "Explore the largest commercial caverns in Texas — underground formations 180 feet below the Hill Country",
        bestFor: "morning before golf",
        provider: "Natural Bridge Caverns",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 28],
        hourlyRate: [200, 375],
        providers: [
          "San Antonio Party Bus",
          "Lux Bus America",
          "Premier Transportation",
        ],
        notes:
          "Essential for connecting north-side courses to River Walk nightlife. Many golf-trip groups use a party bus for the full trip to avoid DUIs on unfamiliar roads.",
      },
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [150, 250],
        providers: ["SA Sprinter", "Texas Shuttle"],
        notes:
          "Sprinter vans are more practical for course-to-course transport. Reserve party bus for big nights on the River Walk.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 110],
        providers: [
          "San Antonio Personal Chef",
          "Take a Chef",
          "Chef's Table SA",
        ],
        mealTypes: [
          "fajita night",
          "Tex-Mex feast",
          "steak dinner",
          "BBQ cookout",
          "breakfast tacos",
        ],
        notes:
          "Fajita night with hand-made tortillas is the signature group meal. Many chefs will bring a portable grill for pool-side cooking. Breakfast tacos the morning after are clutch.",
      },
    ],
  },
  {
    id: "austin-tx",
    city: "Austin",
    state: "TX",
    region: "South Central",
    tagline: "Live music capital meets Hill Country golf and craft beer culture",
    description:
      "Austin delivers an elite off-course experience wrapped around surprisingly strong golf. Barton Creek Resort has 36 holes of championship golf, and the surrounding Hill Country hides gems like Wolfdancer and Falconhead. Between rounds, Sixth Street and Rainey Street provide the kind of nightlife that turns a golf trip into a legendary one. Add world-class BBQ and 70+ craft breweries, and you've got a trip that even the non-golfers in your group will beg to join.",
    population: "medium",
    nearestAirport: {
      code: "AUS",
      name: "Austin-Bergstrom International Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Barton Creek - Fazio Foothills",
        tier: "bucket-list",
        greenFeeRange: [150, 250],
        holes: 18,
        par: 72,
        yardage: 6956,
        slope: 140,
        rating: 74.0,
        walkable: false,
        style: "resort",
        driveMinutes: 20,
        url: "https://www.omnihotels.com/hotels/austin-barton-creek/golf",
        highlight:
          "Tom Fazio masterpiece through Hill Country canyons — hosted the Champions Tour and consistently ranked among Texas' best",
      },
      {
        name: "Barton Creek - Crenshaw Cliffside",
        tier: "premium",
        greenFeeRange: [100, 185],
        holes: 18,
        par: 72,
        yardage: 6652,
        slope: 135,
        rating: 72.5,
        walkable: false,
        style: "resort",
        driveMinutes: 20,
        url: "https://www.omnihotels.com/hotels/austin-barton-creek/golf",
        highlight:
          "Ben Crenshaw and Bill Coore design with dramatic 100-foot cliff drops and native wildflower meadows",
      },
      {
        name: "Wolfdancer Golf Club",
        tier: "premium",
        greenFeeRange: [85, 155],
        holes: 18,
        par: 72,
        yardage: 7029,
        slope: 136,
        rating: 73.6,
        walkable: false,
        style: "resort",
        driveMinutes: 30,
        url: "https://www.hyatt.com/en-US/hotel/texas/hyatt-regency-lost-pines-resort-and-spa/auslp/golf",
        highlight:
          "Hyatt Lost Pines resort course on the Colorado River — natural terrain, wildlife sightings, and a strong finishing stretch",
      },
      {
        name: "Falconhead Golf Club",
        tier: "solid",
        greenFeeRange: [55, 95],
        holes: 18,
        par: 72,
        yardage: 7202,
        slope: 134,
        rating: 74.1,
        walkable: false,
        style: "parkland",
        driveMinutes: 25,
        highlight:
          "Public course in Bee Cave with Hill Country terrain, well-maintained conditions, and a challenging layout at a reasonable price",
      },
      {
        name: "Avery Ranch Golf Club",
        tier: "solid",
        greenFeeRange: [50, 85],
        holes: 18,
        par: 72,
        yardage: 7121,
        slope: 131,
        rating: 73.4,
        walkable: false,
        style: "parkland",
        driveMinutes: 25,
        highlight:
          "North Austin public course with elevation changes, canyon crossings, and some of the best-maintained greens in the city",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [800, 3000],
        amenities: [
          "pool",
          "hot tub",
          "outdoor kitchen",
          "game room",
          "Hill Country views",
        ],
        areaDescription: "Lakeway / Bee Cave / Lake Travis area",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/texas/austin",
        notes:
          "Lake Travis area houses offer pools, privacy, and Hill Country views. 20-30 min from downtown. Best for groups prioritizing golf proximity and house quality over walkable nightlife.",
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [600, 2200],
        amenities: [
          "walkable to bars",
          "rooftop deck",
          "parking",
          "outdoor space",
        ],
        areaDescription: "East Austin / Rainey Street / South Congress area",
        searchUrl: "https://www.airbnb.com/s/Austin--TX",
        notes:
          "East Austin and Rainey Street area houses put you in walking distance of the best bars and restaurants. Farther from courses but saves on transport for nightlife.",
      },
    ],
    dining: [
      {
        name: "Franklin Barbecue",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "The most famous BBQ in America — the brisket is transcendent. Pre-order for groups to skip the 3-hour line.",
        reservationNeeded: true,
      },
      {
        name: "Odd Duck",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Creative farm-to-table with a daily-changing menu of small plates — the best restaurant in Austin by many measures",
        reservationNeeded: true,
      },
      {
        name: "Perry's Steakhouse & Grille",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Upscale Austin steakhouse with the legendary Friday pork chop lunch, private dining rooms, and an excellent wine list",
        reservationNeeded: true,
      },
      {
        name: "Matt's El Rancho",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Austin Tex-Mex institution since 1952 — the Bob Armstrong dip is mandatory and the margaritas are strong",
        reservationNeeded: false,
      },
      {
        name: "la Barbecue",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "East Austin trailer serving world-class brisket and ribs — shorter line than Franklin with equally elite 'cue",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Rainey Street District",
        vibe: "patio",
        highlight:
          "Entire block of converted bungalow bars with patios, food trucks, and live music — the ultimate group bar crawl",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Broken Spoke",
        vibe: "honky-tonk",
        highlight:
          "Last true Texas honky-tonk in Austin — live country, two-stepping, and Lone Stars since 1964",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Lazarus Brewing",
        vibe: "brewpub",
        highlight:
          "East Austin brewery with excellent craft beer, tacos, and a huge shaded patio perfect for groups",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Roosevelt Room",
        vibe: "cocktail",
        highlight:
          "Top-tier cocktail bar on Sixth Street with prohibition-era vibes and some of the best drinks in Texas",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Mean Eyed Cat",
        vibe: "dive",
        highlight:
          "Johnny Cash-themed dive bar with cheap whiskey, a great patio, and jukebox that actually slaps",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Sixth Street Bar Crawl",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [30, 80],
        groupFriendly: true,
        highlight:
          "Walk the legendary Dirty Sixth or classy West Sixth hitting bars, live music venues, and tacos stands",
        bestFor: "arrival day",
      },
      {
        name: "Jester King Brewery",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [20, 45],
        groupFriendly: true,
        highlight:
          "Hill Country farmhouse brewery with wild ales, a pizza kitchen, and acres of outdoor space",
        bestFor: "rest day",
        provider: "Jester King Brewery",
      },
      {
        name: "Lake Travis Boat Rental",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [50, 100],
        groupFriendly: true,
        highlight:
          "Rent a party barge or pontoon on Lake Travis — swim at the Devil's Cove party spot or cruise to a lakeside restaurant",
        bestFor: "rest day",
      },
      {
        name: "COTA Go-Kart Racing",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "High-speed go-karts at the Circuit of the Americas F1 track — competitive racing for the group",
        bestFor: "rest day",
        provider: "Circuit of the Americas",
      },
      {
        name: "Austin Axe Throwing",
        type: "axe-throwing",
        duration: "2-3 hours",
        pricePerPerson: [25, 40],
        groupFriendly: true,
        highlight:
          "BYOB axe throwing lanes — tournaments, team competitions, and trash talk fuel",
        bestFor: "arrival day",
        provider: "Urban Axes Austin",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 30],
        hourlyRate: [225, 400],
        providers: [
          "Austin Party Bus",
          "Lux Bus America",
          "Premier Transportation",
        ],
        notes:
          "Essential for connecting Lake Travis/Bee Cave courses to downtown nightlife. Many companies offer golf trip packages with coolers and course-to-course service.",
      },
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [150, 275],
        providers: ["ATX Sprinter", "Royal Executive Transportation"],
        notes:
          "Sprinters are practical for daytime course shuttles. Save the party bus for Sixth Street and Rainey nights.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 120],
        providers: ["Take a Chef Austin", "Austin Personal Chef Service"],
        mealTypes: [
          "Texas BBQ cookout",
          "fajita night",
          "steak dinner",
          "breakfast tacos",
          "farm-to-table dinner",
        ],
        notes:
          "Austin's food scene attracts serious culinary talent. A private BBQ cookout by the pool is the signature move. Breakfast taco service the morning after a Sixth Street night is non-negotiable.",
      },
    ],
  },
  {
    id: "dallas-fort-worth-tx",
    city: "Dallas-Fort Worth",
    state: "TX",
    region: "South Central",
    tagline: "Big-city golf, world-class steaks, and Deep Ellum nightlife",
    description:
      "The DFW Metroplex has the deepest bench of quality golf courses in Texas — from TPC Craig Ranch (PGA Tour venue) to the Byron Nelson's home turf. Fort Worth's Stockyards add honky-tonk nightlife, Deep Ellum in Dallas brings live music and craft cocktails, and the steakhouse scene rivals any city in the country. This is a trip where you eat, drink, and play at the highest level.",
    population: "medium",
    nearestAirport: {
      code: "DFW",
      name: "Dallas/Fort Worth International Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "TPC Craig Ranch",
        tier: "bucket-list",
        greenFeeRange: [150, 275],
        holes: 18,
        par: 72,
        yardage: 7438,
        slope: 140,
        rating: 75.8,
        walkable: false,
        style: "parkland",
        driveMinutes: 30,
        url: "https://www.tpc.com/craig-ranch",
        highlight:
          "Home of the PGA Tour's CJ Cup Byron Nelson — Tour-level conditioning with strategic bunkering and water hazards on a championship layout",
      },
      {
        name: "Cowboys Golf Club",
        tier: "premium",
        greenFeeRange: [100, 195],
        holes: 18,
        par: 72,
        yardage: 7017,
        slope: 139,
        rating: 74.1,
        walkable: false,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.cowboysgolfclub.com",
        highlight:
          "The only NFL-themed golf course in the world — Dallas Cowboys branding, luxury clubhouse, and a legit championship layout",
      },
      {
        name: "The Tribute Golf Links",
        tier: "premium",
        greenFeeRange: [75, 140],
        holes: 18,
        par: 72,
        yardage: 7002,
        slope: 135,
        rating: 73.6,
        walkable: true,
        style: "links",
        driveMinutes: 35,
        url: "https://www.thetributegc.com",
        highlight:
          "Links-style tribute to the great holes of Scotland and Ireland — pot bunkers, burn crossings, and fescue rough in North Texas",
      },
      {
        name: "Texas Star Golf Course",
        tier: "solid",
        greenFeeRange: [45, 80],
        holes: 18,
        par: 71,
        yardage: 6936,
        slope: 130,
        rating: 73.4,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        highlight:
          "Former NCAA Championship venue in Euless — strong public course with mature trees and excellent conditioning at a fair price",
      },
      {
        name: "Fossil Creek Golf Club",
        tier: "solid",
        greenFeeRange: [40, 75],
        holes: 18,
        par: 72,
        yardage: 6865,
        slope: 129,
        rating: 72.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.fossilcreekgolfclub.com",
        highlight:
          "Arnold Palmer design in Fort Worth with elevation changes, creek crossings, and a challenging back nine through mature oaks",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [700, 2500],
        amenities: [
          "pool",
          "hot tub",
          "game room",
          "outdoor kitchen",
          "media room",
        ],
        areaDescription: "Southlake / Colleyville / Grapevine area",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/texas/dallas",
        notes:
          "Southlake and Grapevine area homes are large, affordable, and centrally located between Dallas and Fort Worth courses. Close to DFW Airport for easy arrivals.",
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [500, 1800],
        amenities: [
          "walkable to Deep Ellum",
          "rooftop",
          "parking",
          "modern finishes",
        ],
        areaDescription: "Deep Ellum / Downtown Dallas / Uptown",
        searchUrl: "https://www.airbnb.com/s/Dallas--TX",
        notes:
          "Downtown Dallas or Uptown properties give walkable access to Deep Ellum bars and Uptown restaurants. Farther from Fort Worth courses but ideal for nightlife-focused trips.",
      },
    ],
    dining: [
      {
        name: "Pappas Bros. Steakhouse",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "One of the best steakhouses in Texas — dry-aged prime cuts, tableside Caesars, and a 3,800-label wine cellar",
        reservationNeeded: true,
      },
      {
        name: "Pecan Lodge",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Deep Ellum BBQ legend with brisket, hot mess (loaded baked potato with brisket), and massive beef ribs",
        reservationNeeded: false,
      },
      {
        name: "Joe T. Garcia's",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Fort Worth institution since 1935 — enchiladas and fajitas served in a sprawling courtyard with fountains. Cash only.",
        reservationNeeded: false,
      },
      {
        name: "Lonesome Dove Western Bistro",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Chef Tim Love's Fort Worth Stockyards showpiece — wild game, exotic meats, and cowboy-chic fine dining",
        reservationNeeded: true,
      },
      {
        name: "Terry Black's Barbecue",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Central Texas BBQ royalty in Deep Ellum — brisket, sausage, and ribs served cafeteria-style with all the fixings",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Deep Ellum Brewing Company",
        vibe: "brewpub",
        highlight:
          "Anchor brewery of the Deep Ellum district with a huge taproom, tours, and rotating food trucks",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Billy Bob's Texas",
        vibe: "honky-tonk",
        highlight:
          "World's largest honky-tonk in the Fort Worth Stockyards — live bull riding, concerts, and 100,000 sq ft of Texas",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "The Rustic",
        vibe: "patio",
        highlight:
          "Massive patio bar in Uptown with live Texas country, craft cocktails, and Southern comfort food",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Midnight Rambler",
        vibe: "cocktail",
        highlight:
          "Basement cocktail lounge in The Joule hotel — dimly lit, vinyl-spinning, and serving some of the best drinks in Dallas",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "White Elephant Saloon",
        vibe: "honky-tonk",
        highlight:
          "Historic Fort Worth Stockyards saloon since 1887 — live music every night and ice-cold Lone Stars",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Fort Worth Stockyards",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [20, 60],
        groupFriendly: true,
        highlight:
          "Watch the daily cattle drive, hit Billy Bob's and White Elephant, and eat at the best steakhouses in Cowtown",
        bestFor: "arrival day",
      },
      {
        name: "Topgolf Dallas",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [30, 50],
        groupFriendly: true,
        highlight:
          "Multiple DFW locations with multi-level driving bays, food, and drinks — great for competitive warm-up",
        bestFor: "arrival day",
        provider: "Topgolf",
      },
      {
        name: "Texas Motor Speedway Go-Karts",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [40, 75],
        groupFriendly: true,
        highlight:
          "High-speed go-kart racing at the Speedway complex — competitive heat races with timing",
        bestFor: "rest day",
        provider: "Dallas Karting Complex",
      },
      {
        name: "Shoot Point Blank Range",
        type: "shooting",
        duration: "2-3 hours",
        pricePerPerson: [40, 75],
        groupFriendly: true,
        highlight:
          "Indoor shooting range with lane rentals, firearm selection, and group packages — air-conditioned alternative to outdoor clays",
        bestFor: "rest day",
        provider: "Shoot Point Blank",
      },
      {
        name: "Deep Ellum Bar Crawl",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [30, 80],
        groupFriendly: true,
        highlight:
          "Walk the muraled streets of Deep Ellum hitting breweries, cocktail bars, and live music venues",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 30],
        hourlyRate: [225, 400],
        providers: [
          "Dallas Party Bus",
          "DFW Party Bus Rental",
          "Lux Bus America",
        ],
        notes:
          "DFW is spread out — a party bus connecting courses, Stockyards, and Deep Ellum is essential. Many companies offer full-day golf trip packages.",
      },
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [150, 275],
        providers: ["DFW Executive Transportation", "Premier Sprinter"],
        notes:
          "Sprinter vans for daytime course transport. Party bus for Fort Worth Stockyards and Deep Ellum nights.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 120],
        providers: ["Take a Chef DFW", "Dallas Personal Chef Service"],
        mealTypes: [
          "prime steak dinner",
          "Texas BBQ cookout",
          "fajita night",
          "breakfast",
          "Tex-Mex feast",
        ],
        notes:
          "DFW houses typically have large kitchens and outdoor spaces perfect for private chef setups. A poolside steak dinner is the signature move for arrival night.",
      },
    ],
  },
  {
    id: "houston-tx",
    city: "Houston",
    state: "TX",
    region: "South Central",
    tagline: "PGA Tour golf, world-class dining, and Space City swagger",
    description:
      "Houston is the most underrated food city in America, and the golf backs it up. Memorial Park just got a $34M Tom Doak renovation for the Houston Open, and courses like Golf Club of Houston (former Shell Houston Open venue) deliver tournament-quality play. Between rounds, the dining scene — from Vietnamese in Midtown to steakhouses in River Oaks — is unmatched in the South Central region. Washington Avenue and Midtown keep the nightlife rolling.",
    population: "medium",
    nearestAirport: {
      code: "IAH",
      name: "George Bush Intercontinental Airport",
      driveMinutes: 25,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Memorial Park Golf Course",
        tier: "bucket-list",
        greenFeeRange: [60, 95],
        holes: 18,
        par: 72,
        yardage: 7412,
        slope: 136,
        rating: 76.1,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.memorialparkgolf.com",
        highlight:
          "Tom Doak redesign hosting the PGA Tour Houston Open — championship golf in the heart of the city at municipal prices. Best value bucket-list course in Texas.",
      },
      {
        name: "Golf Club of Houston",
        tier: "premium",
        greenFeeRange: [75, 135],
        holes: 18,
        par: 72,
        yardage: 7441,
        slope: 137,
        rating: 75.4,
        walkable: false,
        style: "parkland",
        driveMinutes: 30,
        url: "https://www.golfclubofhouston.com",
        highlight:
          "Former Shell Houston Open venue — long, challenging Rees Jones design with tour-level conditioning and huge greens",
      },
      {
        name: "Wildcat Golf Club - Highlands",
        tier: "premium",
        greenFeeRange: [65, 110],
        holes: 18,
        par: 72,
        yardage: 7025,
        slope: 133,
        rating: 73.8,
        walkable: false,
        style: "links",
        driveMinutes: 25,
        highlight:
          "Links-style course in south Houston with mounding, fescue, and strategic bunkering — feels like you left Texas",
      },
      {
        name: "BlackHorse Golf Club - North Course",
        tier: "solid",
        greenFeeRange: [50, 85],
        holes: 18,
        par: 72,
        yardage: 7301,
        slope: 131,
        rating: 74.5,
        walkable: false,
        style: "parkland",
        driveMinutes: 30,
        highlight:
          "Peter Jacobsen design in Cypress — big, bold course with rolling terrain and excellent conditions for the price",
      },
      {
        name: "Moody Gardens Golf Course",
        tier: "solid",
        greenFeeRange: [45, 75],
        holes: 18,
        par: 72,
        yardage: 6800,
        slope: 127,
        rating: 72.0,
        walkable: true,
        style: "coastal",
        driveMinutes: 45,
        highlight:
          "Jacobsen design in Galveston with coastal breezes, marshland views, and pelicans — unique Texas Gulf Coast golf",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [700, 2500],
        amenities: [
          "pool",
          "hot tub",
          "game room",
          "outdoor kitchen",
          "media room",
        ],
        areaDescription: "River Oaks / Upper Kirby / Montrose area",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/texas/houston",
        notes:
          "River Oaks and Montrose area homes put you near Memorial Park and the best restaurants. Large houses with pools are abundant and more affordable than comparable Austin or Dallas properties.",
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [500, 1600],
        amenities: [
          "walkable to Washington Ave",
          "parking",
          "modern finishes",
          "rooftop deck",
        ],
        areaDescription: "Washington Avenue / Heights area",
        searchUrl: "https://www.airbnb.com/s/Houston--TX",
        notes:
          "The Heights and Washington Avenue corridor offer walkable nightlife and restaurant access. Townhome-style rentals with rooftop decks are popular for groups.",
      },
    ],
    dining: [
      {
        name: "Pappas Bros. Steakhouse",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Houston's premier steakhouse with dry-aged prime beef, a legendary wine cellar, and private group dining rooms",
        reservationNeeded: true,
      },
      {
        name: "Truth BBQ",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Texas Monthly #1 BBQ — massive beef ribs, silky brisket, and scratch-made sides in the Heights",
        reservationNeeded: false,
      },
      {
        name: "Underbelly Hospitality - Georgia James",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Whole-animal Texas steakhouse from James Beard winner Chris Shepherd — 44 Farms beef cooked over post oak",
        reservationNeeded: true,
      },
      {
        name: "Ninfa's on Navigation",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "The birthplace of fajitas — Mama Ninfa's original 1973 location with killer tacos al carbon and margaritas",
        reservationNeeded: true,
      },
      {
        name: "Crawfish & Noodles",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Viet-Cajun crawfish that put Houston on the food map — garlic butter, lemongrass, and Old Bay in Chinatown",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Anvil Bar & Refuge",
        vibe: "cocktail",
        highlight:
          "One of the best cocktail bars in America — James Beard-nominated program in Montrose with 100-drink menu",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Saint Arnold Brewing Company",
        vibe: "brewpub",
        highlight:
          "Texas' oldest craft brewery with a massive beer garden, food hall, and weekend tours",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Bobby's Idle Hour",
        vibe: "honky-tonk",
        highlight:
          "Old-school Houston honky-tonk with live country, cheap Lone Stars, and a wood-paneled dance floor",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Lei Low Bar",
        vibe: "tiki",
        highlight:
          "Houston's best tiki bar in the Heights — elaborate rum cocktails, a tropical patio, and Polynesian vibes",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Little Woodrow's",
        vibe: "sports-bar",
        highlight:
          "Houston chain with massive patios, TVs everywhere, and the kind of cold beer and casual energy a golf trip needs",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "NASA Space Center Tour",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [30, 50],
        groupFriendly: true,
        highlight:
          "Tour mission control, see real rockets, and touch a moon rock — surprisingly awesome even for adults",
        bestFor: "rest day",
        provider: "Space Center Houston",
      },
      {
        name: "Washington Avenue Bar Crawl",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [30, 80],
        groupFriendly: true,
        highlight:
          "Walk the Washington corridor hitting craft bars, sports bars, and late-night spots without needing a ride",
        bestFor: "arrival day",
      },
      {
        name: "Topgolf Houston",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [30, 50],
        groupFriendly: true,
        highlight:
          "Three Houston-area locations with driving bays, food, and drinks — competitive group warm-up",
        bestFor: "arrival day",
        provider: "Topgolf",
      },
      {
        name: "Houston Axe Throwing",
        type: "axe-throwing",
        duration: "2-3 hours",
        pricePerPerson: [25, 40],
        groupFriendly: true,
        highlight:
          "BYOB axe throwing with tournament brackets — competitive group activity with trash talk",
        bestFor: "rest day",
        provider: "Urban Axes Houston",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 30],
        hourlyRate: [225, 400],
        providers: [
          "Houston Party Bus",
          "Lux Bus America",
          "ABC Limo Houston",
        ],
        notes:
          "Houston is sprawling — plan on transport between courses and nightlife areas. Party bus for big nights on Washington Ave, sprinter for daytime course shuttles.",
      },
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [150, 275],
        providers: ["Houston Sprinter", "Executive Car Service Houston"],
        notes:
          "Sprinter vans for golf day logistics. Houston traffic can be brutal — allow extra time during rush hours.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 125],
        providers: [
          "Take a Chef Houston",
          "Houston Personal Chef Service",
          "CozyMeal Houston",
        ],
        mealTypes: [
          "Texas BBQ cookout",
          "Gulf seafood boil",
          "fajita night",
          "steak dinner",
          "Viet-Cajun crawfish boil",
          "breakfast tacos",
        ],
        notes:
          "Houston's diverse food culture means chefs here can do things others can't — a Viet-Cajun crawfish boil or Gulf seafood spread is the move. Pool houses are ideal for chef setups.",
      },
    ],
  },
  {
    id: "new-orleans-la",
    city: "New Orleans",
    state: "LA",
    region: "South Central",
    tagline: "Bourbon Street, bayou golf, and the best food city in America",
    description:
      "New Orleans is the ultimate golf trip for groups that want the off-course experience to match the on-course one. TPC Louisiana hosts the PGA Tour, and the English Turn and Bayou Oaks courses deliver solid rounds. But the real draw is everything else: Bourbon Street, the French Quarter, world-class Creole food, and a nightlife culture that treats 2am like happy hour. This trip is a memory machine.",
    population: "medium",
    nearestAirport: {
      code: "MSY",
      name: "Louis Armstrong New Orleans International Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "TPC Louisiana",
        tier: "bucket-list",
        greenFeeRange: [125, 225],
        holes: 18,
        par: 72,
        yardage: 7425,
        slope: 141,
        rating: 76.1,
        walkable: false,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.tpc.com/louisiana",
        highlight:
          "Home of the PGA Tour's Zurich Classic — Pete Dye design through Louisiana wetlands with alligators, cypress trees, and tour-level conditions",
      },
      {
        name: "English Turn Golf & Country Club",
        tier: "premium",
        greenFeeRange: [75, 130],
        holes: 18,
        par: 72,
        yardage: 7078,
        slope: 135,
        rating: 74.0,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        highlight:
          "Jack Nicklaus design and former PGA Tour venue — challenging wetland course with strategic water hazards and mature oaks",
      },
      {
        name: "Bayou Oaks at City Park - Championship Course",
        tier: "premium",
        greenFeeRange: [55, 95],
        holes: 18,
        par: 72,
        yardage: 7100,
        slope: 133,
        rating: 73.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.bayouoaksgolf.com",
        highlight:
          "Rees Jones redesign in City Park — the best public course in New Orleans with live oaks, lagoons, and 10 minutes to the French Quarter",
      },
      {
        name: "Audubon Park Golf Course",
        tier: "solid",
        greenFeeRange: [20, 40],
        holes: 18,
        par: 62,
        yardage: 4220,
        slope: 105,
        rating: 60.2,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.audubongolf.com",
        highlight:
          "Charming par-62 in Uptown New Orleans — perfect for a hangover round under live oaks draped in Spanish moss",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [800, 3500],
        amenities: [
          "walkable to French Quarter",
          "courtyard",
          "balcony",
          "parking",
          "historic architecture",
        ],
        areaDescription: "French Quarter / Marigny / Treme",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/louisiana/new-orleans",
        notes:
          "French Quarter and Marigny houses with courtyards and balconies are the play. Walking distance to everything at night. Check local STR regulations — licensed properties only.",
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [600, 2500],
        amenities: [
          "pool",
          "garden",
          "porch",
          "off-street parking",
          "chef's kitchen",
        ],
        areaDescription: "Garden District / Uptown / Magazine Street",
        searchUrl: "https://www.airbnb.com/s/New-Orleans--LA",
        notes:
          "Garden District and Uptown homes are beautiful, spacious, and slightly cheaper. Streetcar runs to French Quarter in 20 min. Magazine Street has great restaurants and bars.",
      },
    ],
    dining: [
      {
        name: "Commander's Palace",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "The crown jewel of New Orleans dining since 1893 — Creole fine dining, jazz brunch, and 25-cent martini lunches. Private rooms available.",
        reservationNeeded: true,
      },
      {
        name: "Cochon",
        style: "southern",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "James Beard-winning Cajun restaurant — cochon de lait, boudin, and Louisiana heritage dishes in the Warehouse District",
        reservationNeeded: true,
      },
      {
        name: "Acme Oyster House",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "French Quarter institution with chargrilled oysters, po'boys, and a raw bar that keeps groups fed and happy",
        reservationNeeded: false,
      },
      {
        name: "Galatoire's",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Bourbon Street fine dining since 1905 — old-school Creole with jacketed waiters, Friday lunch is legendary",
        reservationNeeded: true,
      },
      {
        name: "Central Grocery",
        style: "casual",
        priceRange: "$",
        capacity: "small",
        highlight:
          "Home of the original muffuletta since 1906 — massive Italian sandwiches with olive salad in the French Quarter",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Pat O'Brien's",
        vibe: "patio",
        highlight:
          "The original Hurricane cocktail bar with dueling pianos and a famous flaming fountain courtyard",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Lafitte's Blacksmith Shop",
        vibe: "dive",
        highlight:
          "Oldest bar in America (1722) — candlelit piano bar in a crumbling French Quarter building. Purple Drank is the move.",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Sazerac Bar",
        vibe: "cocktail",
        highlight:
          "Birthplace of the Sazerac cocktail at The Roosevelt hotel — art deco grandeur and impeccable drinks",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Frenchmen Street",
        vibe: "dive",
        highlight:
          "The real music street — live jazz, brass bands, and funk pouring out of every door. The Spotted Cat and d.b.a. are the anchors.",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Bacchanal Wine",
        vibe: "patio",
        highlight:
          "Bywater wine bar with a legendary backyard courtyard — live jazz, cheese boards, and bottle service under string lights",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Bourbon Street Bar Crawl",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [40, 100],
        groupFriendly: true,
        highlight:
          "Walk Bourbon Street with go-cups hitting Pat O'Brien's, Lafitte's, and the dueling piano bars — open containers are legal",
        bestFor: "arrival day",
      },
      {
        name: "Swamp Tour",
        type: "boat-rental",
        duration: "2-3 hours",
        pricePerPerson: [30, 65],
        groupFriendly: true,
        highlight:
          "Airboat through Louisiana bayous spotting alligators, turtles, and cypress swamps — quintessential NOLA experience",
        bestFor: "rest day",
        provider: "Cajun Encounters",
      },
      {
        name: "Jazz Brunch at Commander's Palace",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [50, 80],
        groupFriendly: true,
        highlight:
          "Live jazz, Creole brunch, and 25-cent martinis — the most civilized way to start a golf day in America",
        bestFor: "morning before golf",
        provider: "Commander's Palace",
      },
      {
        name: "Cajun Food Walking Tour",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [40, 75],
        groupFriendly: true,
        highlight:
          "Guided walking tour through the French Quarter sampling gumbo, beignets, po'boys, and jambalaya",
        bestFor: "rest day",
      },
      {
        name: "Magazine Street Shopping & Bar Crawl",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [30, 70],
        groupFriendly: true,
        highlight:
          "Six miles of shops, restaurants, and bars from the CBD to Audubon — the locals' alternative to Bourbon Street",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 28],
        hourlyRate: [200, 375],
        providers: [
          "NOLA Party Bus",
          "Cajun Country Limo",
          "Big Easy Limousine",
        ],
        notes:
          "French Quarter is walkable for nightlife. Party bus mainly needed for course transport (TPC Louisiana is 25 min out) and plantation/swamp day trips.",
      },
      {
        type: "trolley",
        capacity: [12, 20],
        hourlyRate: [175, 300],
        providers: ["NOLA Trolley Tours", "Cajun Crawler"],
        notes:
          "Trolley-style buses are popular for group brewery crawls and bar tours. Open-air with sound systems and coolers.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 140],
        providers: [
          "NOLA Private Chef",
          "Take a Chef New Orleans",
          "Chef Chris De Barr",
        ],
        mealTypes: [
          "Cajun seafood boil",
          "Creole dinner",
          "crawfish boil",
          "jambalaya cookout",
          "jazz brunch",
        ],
        notes:
          "New Orleans has some of the most talented private chefs in the country. A courtyard crawfish boil is the signature group meal. Book early — NOLA chefs are in high demand.",
      },
    ],
  },
  {
    id: "louisville-ky",
    city: "Louisville",
    state: "KY",
    region: "South Central",
    tagline: "Bourbon Trail golf with Valhalla prestige and Derby City nightlife",
    description:
      "Louisville is a sleeper golf trip anchored by Valhalla's aura and the Urban Bourbon Trail's 40+ stops. The public courses are strong and affordable, the bourbon scene is unmatched anywhere in the world, and the Bardstown Road bar district keeps the nights going. Add in Louisville Slugger Museum, horse racing at Churchill Downs, and genuine Southern hospitality, and you've got a trip that punches way above its weight class.",
    population: "medium",
    nearestAirport: {
      code: "SDF",
      name: "Louisville Muhammad Ali International Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Valhalla Golf Club",
        tier: "bucket-list",
        greenFeeRange: [250, 400],
        holes: 18,
        par: 72,
        yardage: 7458,
        slope: 146,
        rating: 77.2,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.vfriders.com",
        highlight:
          "Jack Nicklaus design and multiple PGA Championship / Ryder Cup host — private but limited guest access through resort packages and charity events",
      },
      {
        name: "Persimmon Ridge Golf Club",
        tier: "premium",
        greenFeeRange: [65, 110],
        holes: 18,
        par: 72,
        yardage: 7031,
        slope: 137,
        rating: 73.8,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        highlight:
          "Arthur Hills design consistently ranked among Kentucky's best — rolling terrain through hardwood forests with excellent conditioning",
      },
      {
        name: "Chariot Run Golf Course",
        tier: "solid",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 72,
        yardage: 7008,
        slope: 131,
        rating: 73.5,
        walkable: false,
        style: "parkland",
        driveMinutes: 35,
        highlight:
          "Horseshoe Casino's course across the river in Indiana — challenging Fuzzy Zoeller/Clyde Johnston design at a great price",
      },
      {
        name: "Quail Chase Golf Club",
        tier: "solid",
        greenFeeRange: [35, 60],
        holes: 27,
        par: 72,
        yardage: 6715,
        slope: 125,
        rating: 71.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "27-hole public facility with three distinct 9-hole loops — friendly layout, good conditions, and the best value in Louisville",
      },
      {
        name: "Heritage Hill Golf Club",
        tier: "solid",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 72,
        yardage: 6860,
        slope: 128,
        rating: 72.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 25,
        highlight:
          "Shepherdsville public course with well-maintained fairways, reasonable rates, and a solid test without the premium price tag",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [600, 2000],
        amenities: [
          "pool",
          "hot tub",
          "bourbon bar setup",
          "game room",
          "outdoor kitchen",
        ],
        areaDescription: "East Louisville / Hurstbourne / Middletown area",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/kentucky/louisville",
        notes:
          "East-side houses near Persimmon Ridge offer large homes with pools at reasonable prices. 20-25 min from Bardstown Road nightlife.",
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [500, 1600],
        amenities: [
          "walkable to Bardstown Road",
          "covered porch",
          "parking",
          "historic architecture",
        ],
        areaDescription: "Bardstown Road / Highlands / NuLu district",
        searchUrl: "https://www.airbnb.com/s/Louisville--KY",
        notes:
          "Highlands and NuLu district properties put you walking distance to Louisville's best bars and restaurants. Beautiful Victorian homes with character.",
      },
    ],
    dining: [
      {
        name: "Jeff Ruby's Steakhouse",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Louisville's premier steakhouse with USDA Prime dry-aged beef, live music, and a swanky atmosphere perfect for a group dinner",
        reservationNeeded: true,
      },
      {
        name: "Feast BBQ",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "NuLu district BBQ with smoked brisket, burnt ends, and a bourbon-heavy bar — unpretentious and group-friendly",
        reservationNeeded: false,
      },
      {
        name: "Hammerheads",
        style: "casual",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Highlands cult favorite with creative sandwiches, smoked meats, and the famous duck fat fries",
        reservationNeeded: false,
      },
      {
        name: "Proof on Main",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Farm-to-table fine dining inside 21c Museum Hotel — creative Kentucky cuisine with a world-class bourbon list",
        reservationNeeded: true,
      },
      {
        name: "Ramiro's Cantina",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Bardstown Road Tex-Mex with strong margaritas, a big patio, and late-night tacos after bar crawls",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Haymarket Whiskey Bar",
        vibe: "whiskey-bar",
        highlight:
          "Over 400 whiskeys on the wall in the Highlands — the bourbon experience Louisville was built for",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Against the Grain Brewery",
        vibe: "brewpub",
        highlight:
          "Craft brewery inside Louisville Slugger Field with creative beers, smoked meats, and a patio overlooking the ballpark",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Holy Grale",
        vibe: "brewpub",
        highlight:
          "Craft beer bar in a converted church on Bardstown Road — stained glass, pews, and 26 taps of rare beers",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Galaxie Bar",
        vibe: "dive",
        highlight:
          "No-frills Bardstown Road dive with cheap bourbon, a jukebox, and the kind of honest bar energy a golf trip needs",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Evan Williams Bourbon Experience",
        vibe: "whiskey-bar",
        highlight:
          "Downtown bourbon tasting experience on Whiskey Row — tour the artisan distillery and taste single-barrel pours",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Urban Bourbon Trail",
        type: "distillery",
        duration: "full day",
        pricePerPerson: [30, 80],
        groupFriendly: true,
        highlight:
          "Hit 40+ bourbon bars and distilleries across Louisville — get your Bourbon Trail passport stamped at each stop",
        bestFor: "rest day",
      },
      {
        name: "Bourbon Distillery Day Trip",
        type: "distillery",
        duration: "full day",
        pricePerPerson: [40, 100],
        groupFriendly: true,
        highlight:
          "Tour Maker's Mark, Woodford Reserve, and Jim Beam on the Kentucky Bourbon Trail — all within 60 min of Louisville",
        bestFor: "rest day",
      },
      {
        name: "Churchill Downs Racing & Museum",
        type: "casino",
        duration: "half day",
        pricePerPerson: [15, 60],
        groupFriendly: true,
        highlight:
          "Tour the home of the Kentucky Derby, bet on live races (spring/fall meets), and walk the hallowed grounds",
        bestFor: "arrival day",
        provider: "Churchill Downs",
      },
      {
        name: "Louisville Slugger Museum & Factory",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [20, 25],
        groupFriendly: true,
        highlight:
          "Tour the factory, swing in the batting cages, and get a free mini-bat — great group activity in the heart of downtown",
        bestFor: "morning before golf",
        provider: "Louisville Slugger Museum",
      },
      {
        name: "Bardstown Road Bar Crawl",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [30, 70],
        groupFriendly: true,
        highlight:
          "Walk Louisville's best bar street hitting Haymarket, Holy Grale, Galaxie, and a dozen more without needing a ride",
        bestFor: "arrival day",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 24],
        hourlyRate: [200, 350],
        providers: [
          "Louisville Party Bus",
          "Derby City Limousine",
          "Mint Julep Experiences",
        ],
        notes:
          "Mint Julep Experiences specializes in bourbon trail party bus tours — they handle the distillery bookings and transport. Essential for bourbon day trips.",
      },
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [150, 250],
        providers: ["Louisville Sprinter", "Bluegrass Limousine"],
        notes:
          "Sprinter vans for course-to-course transport. Bardstown Road is walkable for nightlife.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 110],
        providers: [
          "Take a Chef Louisville",
          "Louisville Personal Chef Service",
        ],
        mealTypes: [
          "bourbon-paired steak dinner",
          "Southern comfort dinner",
          "BBQ cookout",
          "Kentucky Hot Brown dinner",
          "breakfast",
        ],
        notes:
          "A bourbon-paired steak dinner is the signature group meal. Many chefs will bring a bourbon flight to pair with each course. The Kentucky Hot Brown (open-faced turkey sandwich with Mornay sauce) is a local must-try.",
      },
    ],
  },
  {
    id: "tulsa-ok",
    city: "Tulsa",
    state: "OK",
    region: "South Central",
    tagline: "Southern Hills prestige meets Blue Dome nightlife at budget prices",
    description:
      "Tulsa is anchored by the Southern Hills legacy — one of the greatest championship courses in America — and backed by surprisingly strong public options. The Gathering Place park, Blue Dome district nightlife, and Cherry Street restaurant row give you a city with more personality than you'd expect. Green fees are half what you'd pay in Texas for comparable quality, making Tulsa the value play of the region.",
    population: "medium",
    nearestAirport: {
      code: "TUL",
      name: "Tulsa International Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Southern Hills Country Club",
        tier: "bucket-list",
        greenFeeRange: [250, 400],
        holes: 18,
        par: 70,
        yardage: 7060,
        slope: 143,
        rating: 75.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.southernhillscc.com",
        highlight:
          "Perry Maxwell masterpiece and multiple PGA Championship/US Open host — private but limited guest access through member invitation. The crown jewel of Oklahoma golf.",
      },
      {
        name: "The Club at Indian Springs - East Course",
        tier: "premium",
        greenFeeRange: [45, 80],
        holes: 18,
        par: 72,
        yardage: 7117,
        slope: 133,
        rating: 73.6,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        highlight:
          "Bill Coore and Ben Crenshaw design that's become the best public option in Tulsa — rolling terrain with native grasses and smart bunkering",
      },
      {
        name: "Battle Creek Golf Club",
        tier: "solid",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 72,
        yardage: 6852,
        slope: 129,
        rating: 72.6,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "Tulsa's best-kept public secret — mature trees, elevation changes, and excellent conditions at rock-bottom prices",
      },
      {
        name: "Forest Ridge Golf Club",
        tier: "premium",
        greenFeeRange: [50, 90],
        holes: 18,
        par: 71,
        yardage: 7069,
        slope: 134,
        rating: 73.4,
        walkable: false,
        style: "parkland",
        driveMinutes: 25,
        highlight:
          "Randy Heckenkemper design in Broken Arrow with challenging elevation and water features — one of the best-conditioned public courses in Oklahoma",
      },
      {
        name: "Mohawk Park Golf Course",
        tier: "budget",
        greenFeeRange: [20, 35],
        holes: 36,
        par: 72,
        yardage: 6861,
        slope: 118,
        rating: 71.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "Two 18-hole courses at municipal prices — Pecan Valley hosted the 1984 US Amateur. Raw but historic with surprising bones.",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [400, 1400],
        amenities: [
          "pool",
          "hot tub",
          "game room",
          "fire pit",
          "outdoor kitchen",
        ],
        areaDescription: "Midtown / Brookside / Cherry Street area",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/oklahoma/tulsa",
        notes:
          "Midtown and Brookside homes are large, affordable, and close to Cherry Street and Blue Dome nightlife. Prices are significantly lower than comparable Texas destinations.",
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [350, 1100],
        amenities: [
          "walkable to Blue Dome",
          "downtown views",
          "parking",
          "modern finishes",
        ],
        areaDescription: "Downtown / Blue Dome / Arts District",
        searchUrl: "https://www.airbnb.com/s/Tulsa--OK",
        notes:
          "Downtown properties near Blue Dome put you walking distance to Tulsa's best bars. Excellent value compared to any other destination in the region.",
      },
    ],
    dining: [
      {
        name: "Mahogany Prime Steakhouse",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Tulsa's top steakhouse with dry-aged prime cuts, a cigar lounge, and private dining rooms for groups",
        reservationNeeded: true,
      },
      {
        name: "Burn Co. Barbeque",
        style: "bbq",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Tulsa BBQ institution with smoked brisket, burnt ends, and a rotating menu of creative specials",
        reservationNeeded: false,
      },
      {
        name: "Elote Cafe & Catering",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Creative Southwestern cuisine with smoked chicken nachos that have a cult following in Tulsa — casual and group-perfect",
        reservationNeeded: false,
      },
      {
        name: "Juniper Restaurant",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Elevated comfort food with Oklahoma-sourced ingredients — the best fine dining experience in Tulsa",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Valkyrie Bar",
        vibe: "cocktail",
        highlight:
          "Craft cocktail bar in the Blue Dome district — inventive drinks, moody lighting, and bartenders who know their stuff",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Soundpony Lounge",
        vibe: "dive",
        highlight:
          "Tulsa's beloved dive bar with cheap drinks, live music, and a dance floor that gets rowdy after midnight",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Prairie Brewpub",
        vibe: "brewpub",
        highlight:
          "Taproom for Oklahoma's most acclaimed brewery — funky sours, barrel-aged stouts, and a chill downtown space",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Mercury Lounge",
        vibe: "cocktail",
        highlight:
          "Upscale cocktail bar with live jazz and a rooftop patio overlooking downtown Tulsa — the sophisticated group outing",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Cherry Street Bar Crawl",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [25, 60],
        groupFriendly: true,
        highlight:
          "Walk Cherry Street and Brookside hitting local bars, restaurants, and shops — Tulsa's best walkable nightlife strip",
        bestFor: "arrival day",
      },
      {
        name: "Gathering Place Park",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [0, 20],
        groupFriendly: true,
        highlight:
          "USA Today's #1 Best New Attraction — 66-acre riverside park with adventure playgrounds, boathouse, and trails",
        bestFor: "morning before golf",
      },
      {
        name: "Hard Rock Hotel & Casino Tulsa",
        type: "casino",
        duration: "half day",
        pricePerPerson: [20, 100],
        groupFriendly: true,
        highlight:
          "Full casino in nearby Catoosa with poker, table games, and concerts — solid group gambling session",
        bestFor: "rest day",
        provider: "Hard Rock Hotel & Casino Tulsa",
      },
      {
        name: "Keystone Lake Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [60, 120],
        groupFriendly: false,
        highlight:
          "Guided bass fishing on Keystone Lake — 26,000 acres of Oklahoma reservoir fishing 20 min from Tulsa",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 22],
        hourlyRate: [175, 300],
        providers: [
          "Tulsa Party Bus",
          "Oklahoma Limo Service",
          "VIP Tulsa Transportation",
        ],
        notes:
          "Blue Dome and Cherry Street are walkable for nightlife. Party bus mainly needed for course transport and casino trips. Very affordable compared to Texas.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [50, 90],
        providers: ["Take a Chef Tulsa", "Oklahoma Personal Chef"],
        mealTypes: [
          "steak dinner",
          "BBQ cookout",
          "Southwestern dinner",
          "breakfast",
        ],
        notes:
          "Chef rates in Tulsa are some of the lowest in the region. A poolside BBQ cookout or steak dinner is the move. Oklahoma beef is seriously underrated.",
      },
    ],
  },
  {
    id: "oklahoma-city-ok",
    city: "Oklahoma City",
    state: "OK",
    region: "South Central",
    tagline: "Bricktown nightlife, prairie golf, and OKC Thunder energy",
    description:
      "Oklahoma City has quietly built a legit golf trip scene around strong public courses, the revitalized Bricktown entertainment district, and some of the best value in the region. Oak Tree National hosted a PGA Championship, and the public options like Karsten Creek (ranked among the top public courses in America) deliver surprising quality. Bricktown brings restaurants, bars, and a canal-district vibe that keeps the group entertained after dark.",
    population: "medium",
    nearestAirport: {
      code: "OKC",
      name: "Will Rogers World Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Karsten Creek Golf Club",
        tier: "bucket-list",
        greenFeeRange: [175, 300],
        holes: 18,
        par: 72,
        yardage: 7095,
        slope: 142,
        rating: 75.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 75,
        url: "https://www.karstencreek.com",
        highlight:
          "Tom Fazio design ranked among the top 25 public courses in America — home of Oklahoma State golf with stunning lake and prairie views. Worth the 75-min drive.",
      },
      {
        name: "Jimmie Austin OU Golf Club",
        tier: "premium",
        greenFeeRange: [60, 100],
        holes: 18,
        par: 72,
        yardage: 7176,
        slope: 136,
        rating: 74.2,
        walkable: false,
        style: "parkland",
        driveMinutes: 35,
        highlight:
          "Bob Cupp design and home of OU golf — championship layout with Cross Timbers terrain, stone bridges, and excellent conditioning",
      },
      {
        name: "Lincoln Park Golf Course - East Course",
        tier: "solid",
        greenFeeRange: [25, 40],
        holes: 18,
        par: 70,
        yardage: 6505,
        slope: 119,
        rating: 69.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        highlight:
          "Perry Maxwell design from 1929 — the oldest course in OKC with historic bones, good greens, and a walkable layout at municipal prices",
      },
      {
        name: "Earlywine Park Golf Course",
        tier: "solid",
        greenFeeRange: [25, 45],
        holes: 36,
        par: 72,
        yardage: 6900,
        slope: 123,
        rating: 71.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "Two solid 18-hole municipal courses on OKC's south side — well-maintained, affordable, and great for doubling up on rounds",
      },
      {
        name: "The Golf Club of Edmond",
        tier: "premium",
        greenFeeRange: [50, 85],
        holes: 18,
        par: 71,
        yardage: 6903,
        slope: 131,
        rating: 72.8,
        walkable: false,
        style: "parkland",
        driveMinutes: 25,
        highlight:
          "Tom Fazio design in Edmond with rolling Cross Timbers terrain and excellent conditioning — one of the best public courses in the OKC metro",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [400, 1400],
        amenities: [
          "pool",
          "hot tub",
          "game room",
          "fire pit",
          "outdoor kitchen",
        ],
        areaDescription: "Nichols Hills / Lake Hefner area",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/oklahoma/oklahoma-city",
        notes:
          "Nichols Hills and Lake Hefner area homes are large, have pools, and are centrally located. OKC lodging is extremely affordable compared to Texas.",
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [350, 1100],
        amenities: [
          "walkable to Bricktown",
          "parking",
          "modern finishes",
          "city views",
        ],
        areaDescription: "Bricktown / Downtown / Midtown",
        searchUrl: "https://www.airbnb.com/s/Oklahoma-City--OK",
        notes:
          "Downtown and Bricktown properties give walkable access to the entertainment district. Midtown has the restaurant scene. Very affordable.",
      },
    ],
    dining: [
      {
        name: "Mahogany Prime Steakhouse",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "OKC's premier steakhouse with dry-aged prime beef, an extensive wine list, and private group dining",
        reservationNeeded: true,
      },
      {
        name: "Clark Crew BBQ",
        style: "bbq",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Travis Clark's award-winning BBQ with brisket, pulled pork, and scratch sides — the best BBQ in OKC",
        reservationNeeded: false,
      },
      {
        name: "Ted's Cafe Escondido",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Oklahoma Tex-Mex institution with massive portions, table-side guacamole, and a loyal following",
        reservationNeeded: false,
      },
      {
        name: "Vast",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Fine dining on the 49th floor of Devon Tower — Oklahoma's tallest building with 360-degree views and creative American cuisine",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Bricktown Brewery",
        vibe: "brewpub",
        highlight:
          "Oklahoma's original brewpub in the heart of the entertainment district — craft beer, pub food, and patio seating on the canal",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Jones Assembly",
        vibe: "patio",
        highlight:
          "Massive food-and-drink complex with live music, cocktails, and a design-forward industrial space",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Skinny Slim's",
        vibe: "honky-tonk",
        highlight:
          "Oklahoma honky-tonk with live country, pool tables, and ice-cold beers at dive-bar prices",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Ponyboy",
        vibe: "cocktail",
        highlight:
          "Retro cocktail lounge and concert venue with a pool, movie screenings, and Outsiders-themed vibes",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Bricktown Entertainment District",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [30, 70],
        groupFriendly: true,
        highlight:
          "Walk the canal-district hitting breweries, comedy clubs, and restaurants — OKC's answer to the River Walk",
        bestFor: "arrival day",
      },
      {
        name: "Riversport Adventures",
        type: "kayaking",
        duration: "half day",
        pricePerPerson: [25, 55],
        groupFriendly: true,
        highlight:
          "Whitewater rafting, zip lines, and kayaking at the Olympic-level Riversport complex on the Oklahoma River",
        bestFor: "rest day",
        provider: "Riversport OKC",
      },
      {
        name: "Topgolf Oklahoma City",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [30, 50],
        groupFriendly: true,
        highlight:
          "Multi-level driving bays with food and drinks — competitive warm-up before real rounds",
        bestFor: "arrival day",
        provider: "Topgolf",
      },
      {
        name: "Remington Park Casino",
        type: "casino",
        duration: "half day",
        pricePerPerson: [20, 100],
        groupFriendly: true,
        highlight:
          "Horse racing and full casino floor — table games, slots, and live thoroughbred racing in season",
        bestFor: "rest day",
        provider: "Remington Park",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 22],
        hourlyRate: [175, 300],
        providers: [
          "OKC Party Bus",
          "Oklahoma Limo & Party Bus",
          "Premier OKC Transportation",
        ],
        notes:
          "Bricktown is walkable for nightlife. Party bus needed for Karsten Creek day trip (75 min each way) and course transport. Very affordable rates.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [50, 90],
        providers: ["Take a Chef OKC", "Oklahoma Personal Chef Service"],
        mealTypes: [
          "steak dinner",
          "BBQ cookout",
          "Oklahoma onion burgers",
          "breakfast",
        ],
        notes:
          "Oklahoma beef is excellent and chef rates are low. A poolside steak cookout is the move. The Oklahoma onion burger is a regional specialty worth requesting.",
      },
    ],
  },
  {
    id: "shreveport-bossier-la",
    city: "Shreveport-Bossier City",
    state: "LA",
    region: "South Central",
    tagline: "Casino golf on the Red River with budget-friendly everything",
    description:
      "Shreveport-Bossier City is the budget play for a South Central golf trip. The courses are solid and affordable, the casinos add gambling and entertainment, and the overall cost is about half of what you'd spend in Austin or San Antonio. It's not glamorous, but the golf-and-casino combo keeps the group busy, and the savings mean you can play more rounds and bet bigger at the tables.",
    population: "medium",
    nearestAirport: {
      code: "SHV",
      name: "Shreveport Regional Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "The Golf Club at Stonebridge",
        tier: "premium",
        greenFeeRange: [45, 80],
        holes: 18,
        par: 72,
        yardage: 7044,
        slope: 136,
        rating: 73.8,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "Best public course in northwest Louisiana — challenging layout through pine forests with excellent conditioning and low green fees",
      },
      {
        name: "Querbes Park Golf Course",
        tier: "budget",
        greenFeeRange: [15, 30],
        holes: 18,
        par: 71,
        yardage: 6345,
        slope: 118,
        rating: 69.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        highlight:
          "Classic Shreveport muni dating to the 1930s — affordable, walkable, and a solid warm-up round option",
      },
      {
        name: "Northwood Hills Golf Course",
        tier: "solid",
        greenFeeRange: [25, 45],
        holes: 18,
        par: 72,
        yardage: 6725,
        slope: 124,
        rating: 71.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        highlight:
          "Well-maintained municipal course with tree-lined fairways, solid greens, and good value for the money",
      },
      {
        name: "East Ridge Country Club",
        tier: "solid",
        greenFeeRange: [35, 60],
        holes: 18,
        par: 72,
        yardage: 6912,
        slope: 127,
        rating: 72.0,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "Semi-private club with public tee times available — rolling terrain through mature pines with a country club feel at public prices",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [300, 900],
        amenities: [
          "pool",
          "hot tub",
          "game room",
          "fire pit",
          "large yard",
        ],
        areaDescription: "South Shreveport / Ellerbe Road area",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/louisiana/shreveport",
        notes:
          "South Shreveport homes near Stonebridge offer large properties with pools at rock-bottom prices. Some of the cheapest large-group lodging in the entire region.",
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [250, 700],
        amenities: [
          "near casinos",
          "parking",
          "updated interiors",
          "outdoor space",
        ],
        areaDescription: "Bossier City / Casino District",
        searchUrl: "https://www.airbnb.com/s/Bossier-City--LA",
        notes:
          "Bossier City properties near the casino boardwalk keep you close to nightlife. Alternative: book a block of casino hotel rooms for the full degenerate experience.",
      },
    ],
    dining: [
      {
        name: "Herby-K's",
        style: "seafood",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Shreveport institution since 1936 — the Shrimp Buster is legendary and the fried seafood platters feed the whole crew",
        reservationNeeded: false,
      },
      {
        name: "2Johns Steak & Seafood",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Local favorite steakhouse with hand-cut prime beef, a raw bar, and group-friendly private dining",
        reservationNeeded: true,
      },
      {
        name: "Superior Grill",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Massive portions of Tex-Mex, strong margaritas, and a festive atmosphere that works for big groups",
        reservationNeeded: false,
      },
      {
        name: "Shane's Seafood & Barbecue",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Louisiana BBQ and fried catfish combo — a regional hybrid that works. Multiple locations across Shreveport-Bossier.",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Margaritaville Casino",
        vibe: "casino-bar",
        highlight:
          "Jimmy Buffett-themed casino on the Red River with multiple bars, live music, and a party atmosphere",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Horseshoe Casino Bossier City",
        vibe: "casino-bar",
        highlight:
          "The main casino with table games, poker room, and multiple bars — the hub of Bossier nightlife",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Flying Heart Brewing",
        vibe: "brewpub",
        highlight:
          "Bossier City craft brewery with a rotating tap list, food trucks, and a casual taproom vibe",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Noble Savage Tavern",
        vibe: "dive",
        highlight:
          "Downtown Shreveport live music venue and bar with cheap drinks, local bands, and genuine character",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Casino Night on the Boardwalk",
        type: "casino",
        duration: "half day",
        pricePerPerson: [20, 200],
        groupFriendly: true,
        highlight:
          "Hit Horseshoe, Margaritaville, and Sam's Town casinos on the Bossier boardwalk — poker, blackjack, and craps all night",
        bestFor: "arrival day",
      },
      {
        name: "Red River Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [60, 120],
        groupFriendly: false,
        highlight:
          "Guided bass fishing on the Red River and nearby Toledo Bend Reservoir — some of the best bass fishing in the South",
        bestFor: "rest day",
      },
      {
        name: "Bayou Axe Throwing",
        type: "axe-throwing",
        duration: "2-3 hours",
        pricePerPerson: [20, 35],
        groupFriendly: true,
        highlight:
          "BYOB axe throwing with group tournaments — cheap, competitive, and a solid pre-casino warm-up",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [12, 16],
        hourlyRate: [100, 175],
        providers: [
          "Shreveport Party Bus",
          "Ark-La-Tex Limousine",
        ],
        notes:
          "The casino boardwalk is the nightlife hub and most casinos offer free parking. Shuttles mainly needed for course transport. Very affordable.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [45, 80],
        providers: ["Shreveport Personal Chef", "Cajun Country Catering"],
        mealTypes: [
          "Cajun seafood boil",
          "fried catfish dinner",
          "BBQ cookout",
          "breakfast",
        ],
        notes:
          "A Cajun crawfish or shrimp boil is the signature group meal. Prices are the lowest in the region. Many houses have large outdoor spaces ideal for a boil setup.",
      },
    ],
  },
  {
    id: "little-rock-ar",
    city: "Little Rock",
    state: "AR",
    region: "South Central",
    tagline: "River Market nightlife, affordable Ozark-edge golf, and genuine Southern charm",
    description:
      "Little Rock is the capital-city golf trip that nobody has on their radar. The courses are solid and absurdly affordable, the River Market district has legitimate nightlife and restaurants, and the overall cost of the trip is among the lowest in the region. The Arkansas River setting adds character, and the proximity to Hot Springs (60 min) means you can add a day trip for variety. A budget-conscious group's dream.",
    population: "medium",
    nearestAirport: {
      code: "LIT",
      name: "Bill and Hillary Clinton National Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Chenal Country Club",
        tier: "premium",
        greenFeeRange: [55, 95],
        holes: 36,
        par: 72,
        yardage: 7138,
        slope: 135,
        rating: 74.0,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "Robert Trent Jones Jr. 36-hole facility — two championship courses through Ozark foothills with excellent conditioning and resort-quality amenities",
      },
      {
        name: "Rebsamen Park Golf Course",
        tier: "solid",
        greenFeeRange: [20, 35],
        holes: 18,
        par: 72,
        yardage: 6568,
        slope: 121,
        rating: 70.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        highlight:
          "Classic Little Rock muni on the Arkansas River — mature trees, good greens, and the best value in the city",
      },
      {
        name: "Maumelle Country Club",
        tier: "solid",
        greenFeeRange: [35, 55],
        holes: 18,
        par: 72,
        yardage: 6802,
        slope: 126,
        rating: 71.8,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        highlight:
          "Semi-private club with public access — rolling Ozark-edge terrain through pines with reasonable green fees",
      },
      {
        name: "The Alotian Club",
        tier: "bucket-list",
        greenFeeRange: [200, 350],
        holes: 18,
        par: 72,
        yardage: 7414,
        slope: 144,
        rating: 76.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 30,
        highlight:
          "Tom Fazio design ranked among the top 50 courses in America — ultra-private but accessible through member invitations and charity events",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [350, 1100],
        amenities: [
          "pool",
          "hot tub",
          "game room",
          "fire pit",
          "large yard",
        ],
        areaDescription: "West Little Rock / Chenal area",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/arkansas/little-rock",
        notes:
          "West Little Rock homes near Chenal are large, affordable, and close to courses. Some of the best value lodging in the entire region.",
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [300, 900],
        amenities: [
          "walkable to River Market",
          "Arkansas River views",
          "parking",
          "updated finishes",
        ],
        areaDescription: "Downtown / River Market / SoMa district",
        searchUrl: "https://www.airbnb.com/s/Little-Rock--AR",
        notes:
          "Downtown properties near River Market give walkable nightlife access. SoMa (South Main) is the emerging district with restaurants and bars.",
      },
    ],
    dining: [
      {
        name: "Doe's Eat Place",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Arkansas steakhouse legend since 1941 — massive porterhouses cooked in a converted house. Bring your appetite and your group.",
        reservationNeeded: true,
      },
      {
        name: "Whole Hog Cafe",
        style: "bbq",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Little Rock BBQ with seven sauce options and solid smoked meats — multiple locations and reliably group-friendly",
        reservationNeeded: false,
      },
      {
        name: "The Pantry",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "European-Czech inspired farm-to-table in SoMa — creative seasonal menu that's become Little Rock's best fine dining",
        reservationNeeded: true,
      },
      {
        name: "Taqueria El Palenque",
        style: "mexican",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Authentic Mexican in a strip mall — the real deal with street tacos, birria, and cheap margaritas",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "The Library Kitchen + Lounge",
        vibe: "cocktail",
        highlight:
          "Little Rock's best cocktail bar with craft drinks, exposed brick, and a speakeasy atmosphere in River Market",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Flyway Brewing",
        vibe: "brewpub",
        highlight:
          "River Market craft brewery with a big taproom, rooftop patio, and rotating food trucks",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "White Water Tavern",
        vibe: "dive",
        highlight:
          "Little Rock music institution with live bands, cheap beer, and a covered patio — the real Arkansas experience",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Stickyz Rock 'n' Roll Chicken Shack",
        vibe: "sports-bar",
        highlight:
          "Live music, cold beer, and Southern fried chicken in River Market — the group hang spot for a casual night",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "River Market Bar Crawl",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [25, 60],
        groupFriendly: true,
        highlight:
          "Walk the River Market district hitting breweries, cocktail bars, and music venues along the Arkansas River",
        bestFor: "arrival day",
      },
      {
        name: "Big Rock Fun Park",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [25, 50],
        groupFriendly: true,
        highlight:
          "Go-karts, mini golf, and arcade games — competitive group activity that doesn't take itself too seriously",
        bestFor: "rest day",
      },
      {
        name: "Pinnacle Mountain State Park",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 5],
        groupFriendly: true,
        highlight:
          "Short but steep summit hike with panoramic Arkansas River valley views — great morning warm-up before golf",
        bestFor: "morning before golf",
      },
      {
        name: "Oaklawn Racing Casino (Hot Springs Day Trip)",
        type: "casino",
        duration: "full day",
        pricePerPerson: [20, 100],
        groupFriendly: true,
        highlight:
          "60-min drive to Hot Springs for Oaklawn casino, Bathhouse Row, and a different golf course — solid day trip add-on",
        bestFor: "rest day",
        provider: "Oaklawn Racing Casino Resort",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [12, 16],
        hourlyRate: [100, 175],
        providers: ["Little Rock Party Bus", "Arkansas Limo Service"],
        notes:
          "River Market is walkable for nightlife. Shuttles needed for course transport and Hot Springs day trips. Very affordable.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [45, 85],
        providers: ["Arkansas Personal Chef", "Take a Chef Little Rock"],
        mealTypes: [
          "Southern steak dinner",
          "BBQ cookout",
          "fried catfish dinner",
          "breakfast",
        ],
        notes:
          "Chef rates in Little Rock are among the lowest in the region. A Southern steak dinner or fried catfish cookout is the move. Houses in West Little Rock have large outdoor spaces.",
      },
    ],
  },
  {
    id: "baton-rouge-la",
    city: "Baton Rouge",
    state: "LA",
    region: "South Central",
    tagline: "LSU tailgate energy, Cajun food, and bayou golf at bargain prices",
    description:
      "Baton Rouge brings Louisiana flavor to a golf trip at prices that make your wallet smile. The courses are solid and affordable, the Cajun food scene is authentic (not tourist-trap NOLA prices), and the LSU campus area nightlife has real energy — especially during football season. Third Street downtown and the Perkins Road Overpass district have turned Baton Rouge into a legitimate going-out city.",
    population: "medium",
    nearestAirport: {
      code: "BTR",
      name: "Baton Rouge Metropolitan Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "The Island Golf Club at Carter Plantation",
        tier: "premium",
        greenFeeRange: [55, 95],
        holes: 18,
        par: 72,
        yardage: 7043,
        slope: 135,
        rating: 73.5,
        walkable: false,
        style: "parkland",
        driveMinutes: 30,
        url: "https://www.carterplantation.com",
        highlight:
          "David Toms design with island green, Louisiana wetland setting, and excellent conditioning — the best public course near Baton Rouge",
      },
      {
        name: "The Bluffs on Thompson Creek",
        tier: "premium",
        greenFeeRange: [50, 85],
        holes: 18,
        par: 72,
        yardage: 7151,
        slope: 137,
        rating: 74.4,
        walkable: false,
        style: "parkland",
        driveMinutes: 35,
        url: "https://www.thebluffs.com",
        highlight:
          "Arnold Palmer design through Louisiana bluffs and ravines — dramatic 200-foot elevation changes rare for this part of the state",
      },
      {
        name: "Santa Maria Golf Course",
        tier: "solid",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 72,
        yardage: 6832,
        slope: 126,
        rating: 71.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "Robert Trent Jones Sr. design and Baton Rouge's best municipal course — solid layout with mature oaks and good greens",
      },
      {
        name: "Webb Memorial Golf Course",
        tier: "budget",
        greenFeeRange: [15, 30],
        holes: 18,
        par: 72,
        yardage: 6440,
        slope: 117,
        rating: 69.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        highlight:
          "No-frills Baton Rouge muni with honest golf at rock-bottom prices — ideal for the hangover round after a Third Street night",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [350, 1100],
        amenities: [
          "pool",
          "hot tub",
          "game room",
          "fire pit",
          "outdoor kitchen",
        ],
        areaDescription: "South Baton Rouge / Bocage area",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/louisiana/baton-rouge",
        notes:
          "South Baton Rouge homes near LSU are large and very affordable. Close to Perkins Road Overpass bars and Tiger Stadium. Prices are some of the lowest in the region.",
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [300, 900],
        amenities: [
          "near LSU campus",
          "walkable to bars",
          "parking",
          "game day ready",
        ],
        areaDescription: "LSU campus area / Tigerland",
        searchUrl: "https://www.airbnb.com/s/Baton-Rouge--LA",
        notes:
          "LSU-area properties are affordable and close to Tigerland and campus bars. During football season, book months ahead and expect premium pricing.",
      },
    ],
    dining: [
      {
        name: "Ruffino's",
        style: "italian",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Baton Rouge's premier Italian restaurant with handmade pasta, fresh seafood, and private dining rooms for groups",
        reservationNeeded: true,
      },
      {
        name: "Jay's Bar-B-Q",
        style: "bbq",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Louisiana BBQ with a Cajun twist — smoked ribs, boudin, and cracklins in a no-frills setting",
        reservationNeeded: false,
      },
      {
        name: "Parrain's Seafood Restaurant",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Cajun seafood institution with crawfish etouffee, chargrilled oysters, and a massive group-friendly dining room",
        reservationNeeded: true,
      },
      {
        name: "Doe's Eat Place",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Baton Rouge outpost of the legendary Arkansas steakhouse — massive porterhouses in a converted house setting",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "The Bulldog",
        vibe: "patio",
        highlight:
          "Perkins Road Overpass institution with 100+ beers on tap, a dog-friendly patio, and great people-watching",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Tin Roof Brewing Company",
        vibe: "brewpub",
        highlight:
          "Baton Rouge's original craft brewery with a taproom, food trucks, and a laid-back Louisiana vibe",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Fred's Bar",
        vibe: "dive",
        highlight:
          "Tigerland dive bar near LSU — cheap drinks, loud music, and the kind of chaotic energy that makes a golf trip memorable",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Hayride Scandal",
        vibe: "cocktail",
        highlight:
          "Third Street cocktail bar with creative drinks, exposed brick, and the most sophisticated night out in Baton Rouge",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "LSU Campus & Tiger Stadium Tour",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 15],
        groupFriendly: true,
        highlight:
          "Walk the LSU campus, see Death Valley (Tiger Stadium), and visit Mike the Tiger's habitat — free and iconic",
        bestFor: "morning before golf",
      },
      {
        name: "Perkins Road Overpass Bar Crawl",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [25, 60],
        groupFriendly: true,
        highlight:
          "Walk the Perkins Road Overpass district hitting Tin Roof, The Bulldog, and a half-dozen other bars and restaurants",
        bestFor: "arrival day",
      },
      {
        name: "L'Auberge Casino & Hotel",
        type: "casino",
        duration: "half day",
        pricePerPerson: [20, 100],
        groupFriendly: true,
        highlight:
          "Full casino on the river with table games, poker room, and a pool deck — Baton Rouge's entertainment anchor",
        bestFor: "rest day",
        provider: "L'Auberge Casino & Hotel",
      },
      {
        name: "Swamp Tour from Baton Rouge",
        type: "boat-rental",
        duration: "2-3 hours",
        pricePerPerson: [25, 55],
        groupFriendly: true,
        highlight:
          "Airboat through the Atchafalaya Basin spotting alligators and cypress swamps — 30 min from downtown",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [12, 16],
        hourlyRate: [100, 175],
        providers: ["Baton Rouge Party Bus", "Louisiana Limo Service"],
        notes:
          "Perkins Road area is walkable for nightlife. Shuttles needed for course transport (Carter Plantation and Bluffs are 30-35 min out). Affordable rates.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [50, 90],
        providers: ["Baton Rouge Personal Chef", "Cajun Chef Co."],
        mealTypes: [
          "crawfish boil",
          "Cajun seafood dinner",
          "BBQ cookout",
          "jambalaya cookout",
          "breakfast",
        ],
        notes:
          "A backyard crawfish boil is the definitive Baton Rouge group meal. Local chefs do this better and cheaper than anywhere else. Spring crawfish season (March-June) is peak.",
      },
    ],
  },
  {
    id: "lake-of-the-ozarks-mo",
    city: "Lake of the Ozarks",
    state: "MO",
    region: "South Central",
    tagline: "Lake life, party coves, and resort golf in the Missouri Ozarks",
    description:
      "Lake of the Ozarks is the ultimate blend of golf and debauchery in the South Central region. The Lodge of Four Seasons and Old Kinderhook anchor a strong golf scene, and the 1,150-mile shoreline delivers boat parties, party coves, and lakeside bars. The Bagnell Dam Strip has a Spring Break energy that pairs perfectly with a golf trip. It's Branson's wilder, less family-friendly cousin.",
    population: "small",
    nearestAirport: {
      code: "SGF",
      name: "Springfield-Branson National Airport",
      driveMinutes: 120,
    },
    bestSeasons: ["spring", "summer"],
    courses: [
      {
        name: "The Lodge of Four Seasons - Cove Course",
        tier: "premium",
        greenFeeRange: [65, 120],
        holes: 18,
        par: 71,
        yardage: 6557,
        slope: 132,
        rating: 72.0,
        walkable: false,
        style: "resort",
        driveMinutes: 5,
        url: "https://www.4seasonsresort.com/golf",
        highlight:
          "Robert Trent Jones Sr. design overlooking the lake with dramatic cove crossings and mature Ozark forest — the signature course at the lake",
      },
      {
        name: "The Lodge of Four Seasons - Ridge Course",
        tier: "solid",
        greenFeeRange: [45, 80],
        holes: 18,
        par: 72,
        yardage: 6401,
        slope: 125,
        rating: 70.6,
        walkable: false,
        style: "resort",
        driveMinutes: 5,
        url: "https://www.4seasonsresort.com/golf",
        highlight:
          "Ken Kavanaugh design companion to the Cove — more forgiving but still scenic with ridge-top views of the lake",
      },
      {
        name: "Old Kinderhook Golf Course",
        tier: "premium",
        greenFeeRange: [60, 105],
        holes: 18,
        par: 71,
        yardage: 6855,
        slope: 134,
        rating: 73.0,
        walkable: false,
        style: "resort",
        driveMinutes: 15,
        url: "https://www.oldkinderhook.com",
        highlight:
          "Tom Weiskopf design through wooded Ozark terrain with Lake of the Ozarks views — consistently ranked among Missouri's best",
      },
      {
        name: "Sycamore Creek Golf Club",
        tier: "solid",
        greenFeeRange: [35, 60],
        holes: 18,
        par: 72,
        yardage: 6255,
        slope: 122,
        rating: 70.0,
        walkable: false,
        style: "parkland",
        driveMinutes: 10,
        highlight:
          "Affordable Osage Beach course with rolling terrain, good greens, and lake-area convenience at budget prices",
      },
    ],
    lodging: [
      {
        type: "lakehouse",
        sleeps: [12, 22],
        nightlyRange: [600, 2200],
        amenities: [
          "private dock",
          "lake access",
          "hot tub",
          "outdoor kitchen",
          "fire pit",
          "boat slip",
        ],
        areaDescription: "Lake of the Ozarks waterfront homes",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/missouri/lake-ozark",
        notes:
          "Lakefront houses with private docks are the move — rent a boat with the house and cruise to Party Cove and restaurants. Many sleep 16-22 with bunk rooms. Book early for summer.",
      },
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [500, 1500],
        amenities: [
          "pool access",
          "golf cart",
          "marina access",
          "resort amenities",
        ],
        areaDescription: "Lodge of Four Seasons / Old Kinderhook resorts",
        searchUrl: "https://www.4seasonsresort.com",
        notes:
          "On-resort condos and villas at Four Seasons or Old Kinderhook put you on the course with marina access. Golf packages include cart and range.",
      },
    ],
    dining: [
      {
        name: "Baxter's Lakeside Grille",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "The lake's top restaurant with lakeside dining, fresh seafood, and a dock you can boat up to",
        reservationNeeded: true,
      },
      {
        name: "JB Hook's Great Ocean Fish",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Upscale lakeside seafood with a raw bar, steaks, and sunset views over the main channel",
        reservationNeeded: true,
      },
      {
        name: "Dog Days Bar & Grill",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Lake staple with burgers, wings, and cold beer — boat up to the dock or drive in. Classic lake-bar energy.",
        reservationNeeded: false,
      },
      {
        name: "Old Kinderhook Grill Room",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Resort steakhouse with views of the 18th green — hand-cut steaks and a solid bourbon list for the post-round dinner",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Shady Gators",
        vibe: "patio",
        highlight:
          "The legendary lake party bar — massive waterfront deck, live music, and the epicenter of Lake of the Ozarks nightlife",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Backwater Jack's",
        vibe: "patio",
        highlight:
          "Dock bar with a pool, waterslide, and live music — boat up or drive in for all-day lake party vibes",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Brews Brothers Tap Room",
        vibe: "brewpub",
        highlight:
          "Craft beer taproom in Osage Beach with local brews, pub food, and a chill change of pace from the dock bars",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Tucker's Shuckers",
        vibe: "patio",
        highlight:
          "Casual lake bar with oysters, frozen drinks, and a laid-back dock — the afternoon-drink-in-the-sun spot",
        lateNight: false,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Lake of the Ozarks Boat Rental",
        type: "boat-rental",
        duration: "full day",
        pricePerPerson: [50, 100],
        groupFriendly: true,
        highlight:
          "Rent a party barge, pontoon, or speedboat and hit Party Cove, dock bars, and swimming coves along 1,150 miles of shoreline",
        bestFor: "rest day",
      },
      {
        name: "Party Cove",
        type: "water-sports",
        duration: "half day",
        pricePerPerson: [50, 100],
        groupFriendly: true,
        highlight:
          "The legendary lake party spot where boats raft up for music, swimming, and all-day floating — peak golf-trip energy",
        bestFor: "rest day",
      },
      {
        name: "Big Surf Waterpark",
        type: "water-sports",
        duration: "half day",
        pricePerPerson: [25, 40],
        groupFriendly: true,
        highlight:
          "Waterpark in Linn Creek with slides, wave pool, and lazy river — surprisingly fun for adult groups",
        bestFor: "rest day",
      },
      {
        name: "Lake Ozark Strip Bar Crawl",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [25, 60],
        groupFriendly: true,
        highlight:
          "Walk the Bagnell Dam Strip hitting bars, arcades, and souvenir shops — retro lake-town energy with a Spring Break vibe",
        bestFor: "arrival day",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [12, 16],
        hourlyRate: [100, 175],
        providers: ["Lake Ozark Shuttle", "Ozark Transportation"],
        notes:
          "A boat is your primary transport at the lake. Shuttles needed for course-to-course transport and strip bar crawls. Most lake houses are boat-accessible to dock bars.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [55, 95],
        providers: ["Lake Ozark Chef Co", "Missouri Personal Chef Service"],
        mealTypes: [
          "steak dinner",
          "BBQ cookout",
          "fish fry",
          "lakeside breakfast",
        ],
        notes:
          "Lakehouse kitchens and outdoor spaces are perfect for chef setups. A dock-side BBQ cookout after a day on the lake is the signature move. Fish fry with the day's catch is a solid option if anyone actually caught something.",
      },
    ],
  },
  {
    id: "galveston-tx",
    city: "Galveston",
    state: "TX",
    region: "South Central",
    tagline: "Coastal golf, beach bars, and Gulf breezes on a historic island",
    description:
      "Galveston adds a beach-trip element that no other South Central destination can match. The golf is solid (Moody Gardens and nearby courses keep things interesting), but the real play is combining rounds with beach bars, Strand District nightlife, and Gulf fishing. It's a change of pace from Hill Country and Ozark trips — saltwater air, seafood, and sand between rounds.",
    population: "small",
    nearestAirport: {
      code: "IAH",
      name: "George Bush Intercontinental Airport",
      driveMinutes: 75,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Moody Gardens Golf Course",
        tier: "solid",
        greenFeeRange: [45, 75],
        holes: 18,
        par: 72,
        yardage: 6800,
        slope: 127,
        rating: 72.0,
        walkable: true,
        style: "coastal",
        driveMinutes: 10,
        url: "https://www.moodygardens.com/golf",
        highlight:
          "Jacobsen design on Galveston Island with coastal marshland, Gulf breezes, and pelicans — unique Texas Gulf Coast golf",
      },
      {
        name: "Galveston Country Club",
        tier: "premium",
        greenFeeRange: [60, 100],
        holes: 18,
        par: 72,
        yardage: 6870,
        slope: 131,
        rating: 72.5,
        walkable: false,
        style: "coastal",
        driveMinutes: 5,
        highlight:
          "Semi-private island course with Gulf views, sea breezes, and a links-influenced layout — the best golf on the island",
      },
      {
        name: "Wildcat Golf Club - Lakes Course",
        tier: "premium",
        greenFeeRange: [65, 110],
        holes: 18,
        par: 72,
        yardage: 6900,
        slope: 132,
        rating: 73.0,
        walkable: false,
        style: "links",
        driveMinutes: 45,
        highlight:
          "Links-style course in south Houston — add it to a Galveston trip for a quality 36-hole day with a different look",
      },
      {
        name: "Bay Oaks Country Club",
        tier: "solid",
        greenFeeRange: [35, 60],
        holes: 18,
        par: 72,
        yardage: 6518,
        slope: 123,
        rating: 70.5,
        walkable: true,
        style: "coastal",
        driveMinutes: 30,
        highlight:
          "Mainland course near Galveston in Clear Lake — affordable, well-maintained, and a change of pace from island wind",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [600, 2200],
        amenities: [
          "Gulf views",
          "pool",
          "hot tub",
          "deck",
          "outdoor shower",
          "grill",
        ],
        areaDescription: "Galveston beachfront / West End",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/texas/galveston",
        notes:
          "Beachfront houses on the West End offer Gulf views, pools, and direct beach access. Many sleep 16+ with bunk rooms. The beach house golf trip is a different energy.",
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [400, 1400],
        amenities: [
          "walkable to Strand",
          "historic architecture",
          "parking",
          "balcony",
        ],
        areaDescription: "Strand Historic District / Downtown Galveston",
        searchUrl: "https://www.airbnb.com/s/Galveston--TX",
        notes:
          "Strand District properties put you walking distance to restaurants and bars. Historic Victorian homes with character. Less beach, more nightlife convenience.",
      },
    ],
    dining: [
      {
        name: "Gaido's Seafood Restaurant",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Galveston seafood institution since 1911 — fresh Gulf catch, pecan-crusted snapper, and a group-friendly dining room",
        reservationNeeded: true,
      },
      {
        name: "Mosquito Cafe",
        style: "casual",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Beloved Galveston brunch spot with creative sandwiches, fresh salads, and the best coffee on the island",
        reservationNeeded: false,
      },
      {
        name: "Rudy & Paco Restaurant & Bar",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Upscale Latin-influenced steakhouse and seafood — the nicest dinner on the island with a full bar and private dining",
        reservationNeeded: true,
      },
      {
        name: "Shrimp N Stuff",
        style: "seafood",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "No-frills fried shrimp counter with massive platters, hush puppies, and cheap beer — the people's choice",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "The Strand District",
        vibe: "patio",
        highlight:
          "Historic downtown strip with multiple bars, restaurants, and live music venues — walkable pub crawl territory",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Beerfoot Brewery",
        vibe: "brewpub",
        highlight:
          "Galveston craft brewery in the Strand with island-themed beers, a big patio, and Bayou food",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Yaga's Cafe",
        vibe: "sports-bar",
        highlight:
          "Strand District bar with live music, tropical drinks, and a balcony overlooking the street — the late-night anchor",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Murdoch's Beach Retreat",
        vibe: "patio",
        highlight:
          "Beachfront bar on the Seawall with frozen drinks, Gulf views, and sandy feet — the daytime drinking spot",
        lateNight: false,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Deep Sea Fishing Charter",
        type: "fishing",
        duration: "full day",
        pricePerPerson: [100, 200],
        groupFriendly: true,
        highlight:
          "Charter a boat out of Galveston Harbor for red snapper, kingfish, and mahi-mahi in the Gulf of Mexico",
        bestFor: "rest day",
        provider: "Galveston Party Boats",
      },
      {
        name: "Strand District Bar Crawl",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [25, 60],
        groupFriendly: true,
        highlight:
          "Walk the historic Strand hitting bars, breweries, and live music venues in Galveston's entertainment core",
        bestFor: "arrival day",
      },
      {
        name: "Galveston Beach Day",
        type: "water-sports",
        duration: "half day",
        pricePerPerson: [10, 30],
        groupFriendly: true,
        highlight:
          "Beach chairs, boogie boards, and cold beer on the Gulf — the rest-day activity that requires zero effort",
        bestFor: "rest day",
      },
      {
        name: "Galveston Jet Ski Rental",
        type: "water-sports",
        duration: "2-3 hours",
        pricePerPerson: [60, 100],
        groupFriendly: true,
        highlight:
          "Jet ski the Galveston Bay or Gulf side — warm water, dolphins, and competitive racing between buddies",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "trolley",
        capacity: [12, 20],
        hourlyRate: [150, 250],
        providers: ["Galveston Island Trolley", "Island Party Bus"],
        notes:
          "The Strand is walkable for nightlife. Trolley rentals are fun for brewery tours and beach-to-bar transport. Golf course transport is straightforward on the island.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 110],
        providers: ["Island Chef Galveston", "Take a Chef Galveston"],
        mealTypes: [
          "Gulf seafood boil",
          "shrimp and fish cookout",
          "steak dinner",
          "beach BBQ",
          "breakfast",
        ],
        notes:
          "A beachfront Gulf seafood boil is the signature Galveston group meal. Beach houses have outdoor kitchens and decks perfect for chef setups. Fresh Gulf shrimp and fish can be sourced same-day from the harbor.",
      },
    ],
  },
];
