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
];
