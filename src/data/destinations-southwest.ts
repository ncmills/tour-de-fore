import { Destination } from "./types";

export const southwestDestinations: Destination[] = [
  // ─── Scottsdale, AZ ───────────────────────────────────────────────
  {
    id: "scottsdale-az",
    city: "Scottsdale",
    state: "AZ",
    region: "Southwest",
    tagline: "Desert golf royalty meets Old Town nightlife",
    description:
      "The undisputed king of buddy-trip golf. Five-star desert courses by day, Michelin-level steaks and a raging Old Town bar scene by night. PHX is 20 minutes away and the Airbnb game is strong.",
    population: "medium",
    nearestAirport: {
      code: "PHX",
      name: "Phoenix Sky Harbor International Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "TPC Scottsdale (Stadium Course)",
        tier: "bucket-list",
        greenFeeRange: [200, 350],
        holes: 18,
        par: 71,
        yardage: 7261,
        slope: 135,
        rating: 74.4,
        walkable: false,
        style: "desert",
        driveMinutes: 15,
        url: "https://www.tpc.com/scottsdale",
        highlight:
          "Home of the WM Phoenix Open and the legendary Stadium Hole 16",
      },
      {
        name: "We-Ko-Pa Golf Club (Saguaro Course)",
        tier: "bucket-list",
        greenFeeRange: [150, 280],
        holes: 18,
        par: 72,
        yardage: 6966,
        slope: 141,
        rating: 73.5,
        walkable: false,
        style: "desert",
        driveMinutes: 30,
        url: "https://www.wekopa.com",
        highlight:
          "Bill Coore & Ben Crenshaw design on Fort McDowell Yavapai Nation land with jaw-dropping Sonoran views",
      },
      {
        name: "Troon North Golf Club (Monument Course)",
        tier: "bucket-list",
        greenFeeRange: [175, 325],
        holes: 18,
        par: 72,
        yardage: 7028,
        slope: 147,
        rating: 73.9,
        walkable: false,
        style: "desert",
        driveMinutes: 25,
        url: "https://www.troonnorthgolf.com",
        highlight:
          "Tom Weiskopf masterpiece nestled against Pinnacle Peak with the iconic Monument boulder",
      },
      {
        name: "Grayhawk Golf Club (Raptor Course)",
        tier: "premium",
        greenFeeRange: [150, 275],
        holes: 18,
        par: 72,
        yardage: 7135,
        slope: 143,
        rating: 74.1,
        walkable: false,
        style: "desert",
        driveMinutes: 15,
        url: "https://www.grayhawkgolf.com",
        highlight:
          "Tom Fazio design with killer post-round scene at Phil's Grill on the patio",
      },
      {
        name: "Quintero Golf Club",
        tier: "bucket-list",
        greenFeeRange: [130, 250],
        holes: 18,
        par: 72,
        yardage: 7035,
        slope: 149,
        rating: 74.0,
        walkable: false,
        style: "desert",
        driveMinutes: 55,
        url: "https://www.quinterogolf.com",
        highlight:
          "Rees Jones design carved through Hieroglyphic Mountains — remote but worth every minute of the drive",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [800, 2500],
        amenities: [
          "private pool",
          "hot tub",
          "putting green",
          "outdoor kitchen",
          "game room",
          "fire pit",
        ],
        areaDescription:
          "North Scottsdale near Kierland or Grayhawk — big luxury homes with pools and mountain views",
        searchUrl:
          "https://www.vrbo.com/search?destination=Scottsdale%2C+AZ&groupSize=16",
        notes:
          "Tons of 5-6 bed luxury homes with resort-style pools. Book early for spring season. Old Town proximity adds Uber costs but North Scottsdale is closer to courses.",
      },
    ],
    dining: [
      {
        name: "Mastro's City Hall Steakhouse",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Iconic Scottsdale steakhouse with a live piano bar and butter cake that ends the night right",
        reservationNeeded: true,
      },
      {
        name: "Steak 44",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Locally loved upscale steakhouse with tableside Caesar salad and a buzzing dining room",
        reservationNeeded: true,
      },
      {
        name: "Diego Pops",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Colorful modern Mexican with killer tacos, margaritas, and a great Old Town patio",
        reservationNeeded: false,
      },
      {
        name: "Grimaldi's Coal Brick-Oven Pizzeria",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Brooklyn-style coal-fired pizza — perfect low-key group dinner after a long day on the course",
        reservationNeeded: false,
      },
      {
        name: "Hash Kitchen",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Boozy brunch paradise with a DIY Bloody Mary bar and oversized breakfast plates",
        reservationNeeded: true,
      },
      {
        name: "Toca Madera",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Trendy Mexican-Asian fusion with craft cocktails and a nightclub-adjacent energy",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Coach House",
        vibe: "dive",
        highlight:
          "No-frills Old Town dive that has been the official post-round watering hole since 1959",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Bottled Blonde",
        vibe: "rooftop",
        highlight:
          "Pizza and bottle service on a packed rooftop patio — peak Old Town energy on weekend nights",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Riot House",
        vibe: "rooftop",
        highlight:
          "Multi-level rooftop bar with DJs, bottle service, and a party crowd",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Dierks Bentley's Whiskey Row",
        vibe: "honky-tonk",
        highlight:
          "Country star's bar with live music, strong pours, and a mechanical bull",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Salty Senorita",
        vibe: "patio",
        highlight:
          "Massive margaritas and a chill outdoor patio — great for warming up before Old Town gets wild",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Desert Dog ATV / Jeep Tours",
        type: "atv",
        duration: "2-3 hours",
        pricePerPerson: [130, 200],
        groupFriendly: true,
        highlight:
          "Sonoran Desert ATV or Jeep tours through saguaro-studded trails — perfect arrival-day activity",
        bestFor: "arrival day",
        provider: "Desert Dog Adventures",
      },
      {
        name: "Topgolf Scottsdale",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [35, 65],
        groupFriendly: true,
        highlight:
          "Three-story driving range with games, food, and drinks — great for a competitive warm-up night",
        bestFor: "arrival day",
        provider: "Topgolf",
      },
      {
        name: "Salt River Tubing",
        type: "water-sports",
        duration: "3-4 hours",
        pricePerPerson: [20, 25],
        groupFriendly: true,
        highlight:
          "Float the Lower Salt River with a cooler of beers through desert canyon scenery (summer only)",
        bestFor: "rest day",
        provider: "Salt River Tubing & Recreation",
      },
      {
        name: "Scottsdale Gun Club",
        type: "shooting",
        duration: "1-2 hours",
        pricePerPerson: [50, 150],
        groupFriendly: true,
        highlight:
          "Indoor shooting range with a huge selection of firearms — machine guns available",
        bestFor: "arrival day",
        provider: "Scottsdale Gun Club",
      },
      {
        name: "Arizona Spa & Wellness",
        type: "spa",
        duration: "2-3 hours",
        pricePerPerson: [150, 350],
        groupFriendly: true,
        highlight:
          "Multiple resort spas in the area (Sanctuary, Civana) for the crew that needs recovery",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 40],
        hourlyRate: [200, 400],
        providers: [
          "Scottsdale Party Bus",
          "AZ Limo",
          "Prestige Limousine & Car Service",
          "Mirage Limousines",
        ],
        notes:
          "Old Town Scottsdale is party bus central. Tons of options and most offer golf course shuttle packages. Book 2-3 months ahead for spring season.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 150],
        providers: [
          "Take a Chef",
          "Cozymeal",
          "Front Burner Society",
          "Scottsdale Private Chef Co.",
        ],
        mealTypes: [
          "steak dinner",
          "Southwest BBQ cookout",
          "breakfast spread",
          "Mexican fiesta",
        ],
        notes:
          "Tons of private chef options in Scottsdale. Steak night at the Airbnb with a chef is a trip highlight. Book at least 2 weeks ahead.",
      },
    ],
  },

  // ─── Sedona, AZ ────────────────────────────────────────────────────
  {
    id: "sedona-az",
    city: "Sedona",
    state: "AZ",
    region: "Southwest",
    tagline: "Red rock golf in one of the most stunning landscapes on earth",
    description:
      "Limited courses but every swing has a postcard backdrop. Sedona is a stretch golf destination — you come for the scenery, the Jeep tours, the hiking, and a few incredible rounds. Pair it with Flagstaff courses to fill a 3-day trip.",
    population: "small",
    nearestAirport: {
      code: "PHX",
      name: "Phoenix Sky Harbor International Airport",
      driveMinutes: 120,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Seven Canyons Golf Club",
        tier: "bucket-list",
        greenFeeRange: [200, 350],
        holes: 18,
        par: 70,
        yardage: 6836,
        slope: 143,
        rating: 72.4,
        walkable: false,
        style: "desert",
        driveMinutes: 10,
        url: "https://www.sevencanyons.com",
        highlight:
          "Tom Weiskopf design carved through red rock canyons — ultra-exclusive and jaw-dropping",
      },
      {
        name: "Sedona Golf Resort",
        tier: "premium",
        greenFeeRange: [100, 200],
        holes: 18,
        par: 71,
        yardage: 6646,
        slope: 129,
        rating: 70.8,
        walkable: false,
        style: "desert",
        driveMinutes: 5,
        url: "https://www.sedonagolfresort.com",
        highlight:
          "The signature 10th hole frames Cathedral Rock — one of the most photographed golf holes in America",
      },
      {
        name: "Oak Creek Country Club",
        tier: "solid",
        greenFeeRange: [70, 130],
        holes: 18,
        par: 72,
        yardage: 6824,
        slope: 130,
        rating: 72.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.oakcreekcc.com",
        highlight:
          "Robert Trent Jones Sr. design with creek crossings and red rock views at a fraction of the price",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [600, 2000],
        amenities: [
          "hot tub",
          "red rock views",
          "fire pit",
          "outdoor deck",
          "game room",
        ],
        areaDescription:
          "West Sedona or Village of Oak Creek — large homes with panoramic red rock views",
        searchUrl:
          "https://www.vrbo.com/search?destination=Sedona%2C+AZ&groupSize=16",
        notes:
          "Big houses exist but inventory is tighter than Scottsdale. Book 3-4 months out. West Sedona has the best access to courses and Uptown restaurants.",
      },
    ],
    dining: [
      {
        name: "Mariposa Latin Inspired Grill",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Stunning panoramic red rock views with upscale Latin-American cuisine — the special-night spot",
        reservationNeeded: true,
      },
      {
        name: "Elote Cafe",
        style: "mexican",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "James Beard-nominated Southwest Mexican. The fire-roasted elote and smoked pork cheeks are legendary",
        reservationNeeded: true,
      },
      {
        name: "Hideaway House",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Pizza and Italian with a huge creekside patio overlooking red rocks — great casual group dinner",
        reservationNeeded: false,
      },
      {
        name: "Cowboy Club Grille & Spirits",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Uptown Sedona icon serving rattlesnake bites, buffalo burgers, and prime cuts with Western flair",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Mooney's Irish Pub",
        vibe: "sports-bar",
        highlight:
          "The only real bar-bar in Sedona — TVs, pool tables, and locals who can drink",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Vino Di Sedona",
        vibe: "cocktail",
        highlight:
          "Relaxed wine bar with live music and a solid beer selection — mellower pace for Sedona",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Olde Sedona Bar & Grill",
        vibe: "sports-bar",
        highlight:
          "Cold beers, bar food, and sports on TV in West Sedona — the group hangout spot",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Pink Jeep Tours",
        type: "atv",
        duration: "2-3 hours",
        pricePerPerson: [100, 150],
        groupFriendly: true,
        highlight:
          "The original Sedona Jeep tour company — off-road through Broken Arrow trail and red rock formations",
        bestFor: "arrival day",
        provider: "Pink Jeep Tours",
      },
      {
        name: "Sedona ATV Rentals",
        type: "atv",
        duration: "2-4 hours",
        pricePerPerson: [100, 200],
        groupFriendly: true,
        highlight:
          "Rent UTVs and rip through Diamondback Gulch and Outlaw Trail on your own",
        bestFor: "rest day",
        provider: "Sedona ATV Rentals",
      },
      {
        name: "Devil's Bridge Hike",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 0],
        groupFriendly: true,
        highlight:
          "Iconic natural sandstone arch hike — moderate difficulty, elite photo op",
        bestFor: "morning before golf",
      },
      {
        name: "Sedona Shooting Range",
        type: "shooting",
        duration: "1-2 hours",
        pricePerPerson: [50, 100],
        groupFriendly: true,
        highlight:
          "Outdoor shooting experience in the red rocks",
        bestFor: "arrival day",
        provider: "Sedona Outdoor Shooting",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [12, 16],
        hourlyRate: [150, 300],
        providers: ["Sedona Trolley", "Arizona Shuttle", "Red Rock Limo"],
        notes:
          "Party bus options are limited in Sedona. Sprinter vans and trolleys are the main group transport. Book well ahead — this is a small town.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 160],
        providers: ["Take a Chef", "Cozymeal", "Sedona Private Chef"],
        mealTypes: [
          "steak dinner",
          "Southwest BBQ cookout",
          "farm-to-table dinner",
        ],
        notes:
          "Fewer options than Scottsdale but private chefs do operate here. Book 3+ weeks ahead. Steak night on the patio with red rock sunset views is unbeatable.",
      },
    ],
  },

  // ─── Tucson, AZ ────────────────────────────────────────────────────
  {
    id: "tucson-az",
    city: "Tucson",
    state: "AZ",
    region: "Southwest",
    tagline: "Desert golf, Mexican food, and a chill pace",
    description:
      "Tucson flies under the radar compared to Scottsdale but has legit courses, the best Mexican food in the state, and a laid-back vibe that keeps costs down. Dove Mountain and Ventana Canyon are world-class.",
    population: "medium",
    nearestAirport: {
      code: "TUS",
      name: "Tucson International Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Ventana Canyon Golf & Racquet Club (Mountain Course)",
        tier: "premium",
        greenFeeRange: [100, 225],
        holes: 18,
        par: 72,
        yardage: 6948,
        slope: 149,
        rating: 73.8,
        walkable: false,
        style: "desert",
        driveMinutes: 20,
        url: "https://www.ventanacanyonclub.com",
        highlight:
          "Tom Fazio design in the Santa Catalina foothills — the 3rd hole island green is unforgettable",
      },
      {
        name: "The Golf Club at Dove Mountain",
        tier: "premium",
        greenFeeRange: [80, 200],
        holes: 18,
        par: 72,
        yardage: 7049,
        slope: 145,
        rating: 73.6,
        walkable: false,
        style: "desert",
        driveMinutes: 35,
        url: "https://www.dovemountain.com",
        highlight:
          "Jack Nicklaus design and former host of the WGC-Match Play. Stunning Tortolita Mountain setting.",
      },
      {
        name: "Sewailo Golf Club",
        tier: "solid",
        greenFeeRange: [40, 90],
        holes: 18,
        par: 72,
        yardage: 7158,
        slope: 133,
        rating: 73.5,
        walkable: true,
        style: "resort",
        driveMinutes: 10,
        url: "https://www.casinodelsol.com/sewailo-golf-club",
        highlight:
          "Notah Begay III design at Casino Del Sol — great value with a casino and resort next door",
      },
      {
        name: "Arizona National Golf Club",
        tier: "solid",
        greenFeeRange: [50, 120],
        holes: 18,
        par: 71,
        yardage: 6785,
        slope: 137,
        rating: 72.3,
        walkable: false,
        style: "desert",
        driveMinutes: 15,
        url: "https://www.arizonanationalgolfclub.com",
        highlight:
          "Robert Trent Jones Jr. design near Saguaro National Park — great desert golf at mid-range pricing",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 18],
        nightlyRange: [500, 1600],
        amenities: [
          "private pool",
          "hot tub",
          "mountain views",
          "outdoor kitchen",
          "fire pit",
        ],
        areaDescription:
          "Catalina Foothills or Oro Valley — big homes with Catalina Mountain views and pool setups",
        searchUrl:
          "https://www.vrbo.com/search?destination=Tucson%2C+AZ&groupSize=16",
        notes:
          "More affordable than Scottsdale for comparable houses. Catalina Foothills puts you close to Ventana Canyon and great dining on Campbell Ave.",
      },
    ],
    dining: [
      {
        name: "El Charro Cafe",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Oldest continuously operated Mexican restaurant in the US — famous for carne seca and chimichanga origins",
        reservationNeeded: true,
      },
      {
        name: "Vivace Restaurant",
        style: "italian",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Upscale Italian with a gorgeous Foothills patio — the bolognese and wine list are top tier",
        reservationNeeded: true,
      },
      {
        name: "Mi Nidito",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Legendary South Tucson Mexican spot that even presidents have visited — the combo plate is iconic",
        reservationNeeded: false,
      },
      {
        name: "Fleming's Prime Steakhouse",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Reliable upscale chain steakhouse for the group steak night — private dining available",
        reservationNeeded: true,
      },
      {
        name: "Barrio Bread & Baja Cafe",
        style: "casual",
        priceRange: "$",
        capacity: "medium",
        highlight:
          "Tucson breakfast institutions — fuel up before morning rounds with huevos rancheros and fresh tortillas",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Ermanos Craft Beer & Wine Bar",
        vibe: "brewpub",
        highlight:
          "Chill downtown beer bar with an excellent local and craft selection — low-key group hangout",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Playground Bar & Lounge",
        vibe: "cocktail",
        highlight:
          "Creative cocktails in a sleek downtown space with a fun party vibe on weekends",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Thunder Canyon Brewstillery",
        vibe: "brewpub",
        highlight:
          "Tucson-brewed beers and spirits with pub food — great for a low-key group night",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Tap & Bottle",
        vibe: "patio",
        highlight:
          "Curated craft beer bottle shop with a patio — bring your own food, drink great beer",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Desert Diamond Casino",
        type: "casino",
        duration: "2-4 hours",
        pricePerPerson: [0, 200],
        groupFriendly: true,
        highlight:
          "Full casino floor with table games, slots, and poker room — solid arrival-night action",
        bestFor: "arrival day",
        provider: "Desert Diamond Casino",
      },
      {
        name: "Arizona-Sonora Desert Museum",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [25, 25],
        groupFriendly: true,
        highlight:
          "Part zoo, part botanical garden, part museum — a surprisingly awesome desert experience",
        bestFor: "rest day",
      },
      {
        name: "Saguaro National Park",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 15],
        groupFriendly: true,
        highlight:
          "Easy desert hikes among massive saguaro cactus forests — iconic Southwest scenery",
        bestFor: "morning before golf",
      },
      {
        name: "Tucson Trap & Skeet Club",
        type: "shooting",
        duration: "1-2 hours",
        pricePerPerson: [30, 75],
        groupFriendly: true,
        highlight:
          "Outdoor clay shooting in the desert — competitive and affordable for a group",
        bestFor: "arrival day",
        provider: "Tucson Trap & Skeet Club",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [12, 30],
        hourlyRate: [175, 350],
        providers: [
          "Tucson Party Bus",
          "Old Pueblo Trolley Co.",
          "VIP Tucson Limo",
        ],
        notes:
          "Fewer options than Phoenix/Scottsdale but party buses and sprinter vans are available. 4th Avenue bar district is walkable, so you may only need transport to courses.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [55, 130],
        providers: ["Take a Chef", "Cozymeal", "Chef's Roll Tucson"],
        mealTypes: [
          "steak dinner",
          "Southwest BBQ cookout",
          "Mexican fiesta",
          "breakfast spread",
        ],
        notes:
          "Tucson has a serious food scene and private chefs are available at lower prices than Scottsdale. Sonoran-style Mexican feast at the house is a must.",
      },
    ],
  },

  // ─── St. George, UT ────────────────────────────────────────────────
  {
    id: "st-george-ut",
    city: "St. George",
    state: "UT",
    region: "Southwest",
    tagline: "TDF-tested red rock golf at the Utah-Arizona border",
    description:
      "The crew went in 2021 and it delivered. Sand Hollow is a top-10 public course in the country, the red rock scenery is insane, and the whole town is built for golf. Budget-friendly with a surprising amount of course variety.",
    population: "medium",
    tdfTested: true,
    tdfYear: 2021,
    nearestAirport: {
      code: "SGU",
      name: "St. George Regional Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Sand Hollow Golf Resort (Championship Course)",
        tier: "bucket-list",
        greenFeeRange: [80, 175],
        holes: 18,
        par: 72,
        yardage: 7315,
        slope: 136,
        rating: 74.2,
        walkable: false,
        style: "desert",
        driveMinutes: 15,
        url: "https://www.sandhollowresort.com",
        highlight:
          "John Fought design through red sandstone formations — a top-25 public course in the US and worth the trip alone",
      },
      {
        name: "Entrada at Snow Canyon Country Club",
        tier: "premium",
        greenFeeRange: [100, 200],
        holes: 18,
        par: 72,
        yardage: 7062,
        slope: 139,
        rating: 73.1,
        walkable: false,
        style: "desert",
        driveMinutes: 10,
        url: "https://www.entradaatsnowcanyon.com",
        highlight:
          "Johnny Miller design with lava rock, red sand, and Snow Canyon State Park views — absolutely unique",
      },
      {
        name: "Sunbrook Golf Club",
        tier: "solid",
        greenFeeRange: [45, 85],
        holes: 27,
        par: 72,
        yardage: 6800,
        slope: 130,
        rating: 71.5,
        walkable: true,
        style: "desert",
        driveMinutes: 5,
        url: "https://www.sunbrookgolf.com",
        highlight:
          "27 holes with three distinct 9s — great value and the Black Rock 9 has dramatic lava rock scenery",
      },
      {
        name: "SunRiver Golf Club",
        tier: "solid",
        greenFeeRange: [40, 75],
        holes: 18,
        par: 72,
        yardage: 7001,
        slope: 125,
        rating: 72.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        highlight:
          "Wide fairways and gentle layout — a great warm-up round or hangover-recovery course",
      },
      {
        name: "Southgate Golf Club",
        tier: "budget",
        greenFeeRange: [30, 60],
        holes: 18,
        par: 70,
        yardage: 6132,
        slope: 115,
        rating: 68.2,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        highlight:
          "Short and affordable muni — good for an extra round or a quick morning scramble",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [400, 1400],
        amenities: [
          "private pool",
          "hot tub",
          "red rock views",
          "game room",
          "fire pit",
          "BBQ grill",
        ],
        areaDescription:
          "Entrada community or near Sand Hollow reservoir — large vacation homes with dramatic red rock backdrops",
        searchUrl:
          "https://www.vrbo.com/search?destination=St.+George%2C+UT&groupSize=16",
        notes:
          "Excellent VRBO inventory for big groups at reasonable prices. Entrada area homes are close to courses and have the best scenery. Book 2 months ahead for spring.",
      },
    ],
    dining: [
      {
        name: "George's Corner Restaurant & Pub",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Downtown St. George staple with a solid menu, great patio, and cold local beers on tap",
        reservationNeeded: true,
      },
      {
        name: "Painted Pony",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Fine dining in Ancestor Square — the best restaurant in town for the splurge dinner night",
        reservationNeeded: true,
      },
      {
        name: "Xetava Gardens Cafe",
        style: "farm-to-table",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Hidden gem near Kayenta with garden seating and creative Southwest dishes",
        reservationNeeded: true,
      },
      {
        name: "Wood Ash Rye",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Wood-fired cooking with craft cocktails — the newer elevated dining spot in town",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "George's Corner",
        vibe: "patio",
        highlight:
          "Best downtown bar with a big patio, live music on weekends, and a relaxed vibe",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "One & Only Bar & Grill",
        vibe: "dive",
        highlight:
          "The local dive with cheap drinks and a no-pretense crowd — Utah's idea of late-night",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Zion Brewery",
        vibe: "brewpub",
        highlight:
          "Local craft brewery with solid beers and pub grub — great for a post-round group session",
        lateNight: false,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Sand Hollow State Park",
        type: "atv",
        duration: "3-4 hours",
        pricePerPerson: [75, 175],
        groupFriendly: true,
        highlight:
          "Rent ATVs or UTVs and tear through red sand dunes at the reservoir — an absolute blast",
        bestFor: "rest day",
        provider: "Sand Hollow ATV Rentals",
      },
      {
        name: "Snow Canyon State Park",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 10],
        groupFriendly: true,
        highlight:
          "Lava tubes, red rock canyons, and easy-to-moderate trails — underrated Utah state park",
        bestFor: "morning before golf",
      },
      {
        name: "Zion National Park Day Trip",
        type: "hiking",
        duration: "full day",
        pricePerPerson: [0, 35],
        groupFriendly: true,
        highlight:
          "Only 45 minutes away — Angels Landing or The Narrows for the ambitious rest day",
        bestFor: "rest day",
      },
      {
        name: "Coral Canyon Shooting Range",
        type: "shooting",
        duration: "1-2 hours",
        pricePerPerson: [30, 80],
        groupFriendly: true,
        highlight:
          "Outdoor shooting in the red rocks — skeet and rifle ranges available",
        bestFor: "arrival day",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [12, 20],
        hourlyRate: [125, 250],
        providers: [
          "Red Rock Shuttle & Tours",
          "St. George Shuttle",
          "Southern Utah Limousine",
        ],
        notes:
          "Limited party bus options in a small Utah town but shuttles and sprinter vans are available. Most groups just pile into a couple large SUVs or rent a 15-passenger van. Utah liquor laws apply — no open containers in vehicles.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 130],
        providers: ["Take a Chef", "Cozymeal"],
        mealTypes: ["steak dinner", "BBQ cookout", "Southwest dinner"],
        notes:
          "Fewer chef options than metro areas but the platforms service St. George. A steak night at the rental house is the move since dining options close early. Book 3+ weeks ahead.",
      },
    ],
  },

  // ─── Mesquite, NV ──────────────────────────────────────────────────
  {
    id: "mesquite-nv",
    city: "Mesquite",
    state: "NV",
    region: "Southwest",
    tagline: "Budget desert golf with casino-town swagger",
    description:
      "Wolf Creek alone is worth the trip — it is a top-50 public course in the country carved through insane desert canyons. Mesquite adds casinos, cheap eats, and a few more solid courses. Fly into Vegas and drive 80 minutes for a fraction of Scottsdale pricing.",
    population: "small",
    nearestAirport: {
      code: "LAS",
      name: "Harry Reid International Airport (Las Vegas)",
      driveMinutes: 80,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Wolf Creek Golf Club",
        tier: "bucket-list",
        greenFeeRange: [100, 250],
        holes: 18,
        par: 72,
        yardage: 6939,
        slope: 150,
        rating: 73.8,
        walkable: false,
        style: "desert",
        driveMinutes: 5,
        url: "https://www.golfwolfcreek.com",
        highlight:
          "Dramatic canyon-to-canyon holes with 100-foot elevation changes — one of the most visually stunning courses in America",
      },
      {
        name: "CasaBlanca Golf Club",
        tier: "solid",
        greenFeeRange: [50, 100],
        holes: 18,
        par: 72,
        yardage: 6883,
        slope: 130,
        rating: 72.3,
        walkable: true,
        style: "resort",
        driveMinutes: 5,
        url: "https://www.casablancaresort.com/golf",
        highlight:
          "Well-maintained resort course at the CasaBlanca hotel — great value with casino and dining attached",
      },
      {
        name: "Palms Golf Club",
        tier: "solid",
        greenFeeRange: [40, 80],
        holes: 18,
        par: 72,
        yardage: 6919,
        slope: 126,
        rating: 71.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        highlight:
          "Wide-open and forgiving layout — the ideal warm-up or hangover round",
      },
      {
        name: "Falcon Ridge Golf Club",
        tier: "solid",
        greenFeeRange: [50, 95],
        holes: 18,
        par: 72,
        yardage: 6546,
        slope: 133,
        rating: 71.0,
        walkable: false,
        style: "desert",
        driveMinutes: 5,
        highlight:
          "Hilly desert layout with canyon views and some dramatic forced carries",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [350, 1000],
        amenities: [
          "private pool",
          "hot tub",
          "golf course views",
          "game room",
          "BBQ grill",
        ],
        areaDescription:
          "Sun City Mesquite or near CasaBlanca — golf community homes and larger vacation rentals",
        searchUrl:
          "https://www.vrbo.com/search?destination=Mesquite%2C+NV&groupSize=16",
        notes:
          "Inventory is more limited than bigger cities but affordable large homes exist. Casino hotel rooms at CasaBlanca or Eureka are a viable alternative at $60-100/night per room.",
      },
    ],
    dining: [
      {
        name: "Katherine's Steakhouse",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "CasaBlanca's in-house steakhouse — the best sit-down dinner option in Mesquite with solid cuts",
        reservationNeeded: true,
      },
      {
        name: "Eureka Casino Buffet",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Classic casino buffet with prime rib on weekends — cheap, filling, and no reservation needed",
        reservationNeeded: false,
      },
      {
        name: "Peggy Sue's Diner",
        style: "casual",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Old-school 50s-themed diner with big breakfasts and milkshakes — perfect pre-round fuel",
        reservationNeeded: false,
      },
      {
        name: "Roberto's Taco Shop",
        style: "mexican",
        priceRange: "$",
        capacity: "medium",
        highlight:
          "Fast casual Mexican that is a Nevada institution — carne asada burritos at 1 AM after the casino",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "CasaBlanca Casino Bar",
        vibe: "casino-bar",
        highlight:
          "Casino floor bar with sports betting, cocktails, and the energy of a small-town Vegas",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Eureka Casino Bar",
        vibe: "casino-bar",
        highlight:
          "The other casino bar in town — cheaper drinks and a more locals-heavy crowd",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Virgin River Hotel Casino Sports Bar",
        vibe: "sports-bar",
        highlight:
          "Sports betting and TVs everywhere — the spot for watching games between casino sessions",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "CasaBlanca Casino",
        type: "casino",
        duration: "2-5 hours",
        pricePerPerson: [0, 300],
        groupFriendly: true,
        highlight:
          "Table games, slots, and sports betting — the main nightlife in Mesquite",
        bestFor: "arrival day",
        provider: "CasaBlanca Resort & Casino",
      },
      {
        name: "Eureka Casino",
        type: "casino",
        duration: "2-5 hours",
        pricePerPerson: [0, 300],
        groupFriendly: true,
        highlight:
          "Second casino option with poker room and lower-limit tables — good for the budget gamblers",
        bestFor: "arrival day",
        provider: "Eureka Casino Hotel",
      },
      {
        name: "Valley of Fire State Park",
        type: "hiking",
        duration: "3-4 hours",
        pricePerPerson: [0, 15],
        groupFriendly: true,
        highlight:
          "Stunning red rock formations 30 minutes south — Fire Wave trail is a must-see",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [12, 16],
        hourlyRate: [100, 200],
        providers: ["Mesquite Shuttle", "Las Vegas Limousine Service"],
        notes:
          "Mesquite is tiny — everything is within a 5-minute drive. Most groups just rent a couple large SUVs or a 15-passenger van. For the Vegas-to-Mesquite transfer, book a shuttle or sprinter in advance.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [55, 120],
        providers: ["Take a Chef", "Cozymeal"],
        mealTypes: ["steak dinner", "BBQ cookout", "breakfast spread"],
        notes:
          "Limited local chef options but platforms can connect you with Las Vegas-based chefs willing to travel. Book well in advance. Casino dining is the easier fallback.",
      },
    ],
  },

  // ─── Santa Fe, NM ──────────────────────────────────────────────────
  {
    id: "santa-fe-nm",
    city: "Santa Fe",
    state: "NM",
    region: "Southwest",
    tagline: "Art, adobe, and high-altitude mountain golf",
    description:
      "Santa Fe brings a totally different flavor to the Southwest trip — 7,000-foot elevation, world-class art galleries, legendary New Mexican cuisine, and a few solid mountain courses. It is more of a culture-forward trip with golf mixed in.",
    population: "medium",
    nearestAirport: {
      code: "ABQ",
      name: "Albuquerque International Sunport",
      driveMinutes: 65,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "Marty Sanchez Links de Santa Fe",
        tier: "solid",
        greenFeeRange: [40, 75],
        holes: 18,
        par: 72,
        yardage: 7091,
        slope: 131,
        rating: 72.8,
        walkable: true,
        style: "links",
        driveMinutes: 10,
        url: "https://www.linksdesantafe.com",
        highlight:
          "Muni-priced links course with panoramic Sangre de Cristo mountain views — best value in Santa Fe",
      },
      {
        name: "Black Mesa Golf Club",
        tier: "premium",
        greenFeeRange: [60, 120],
        holes: 18,
        par: 72,
        yardage: 7307,
        slope: 137,
        rating: 74.2,
        walkable: false,
        style: "desert",
        driveMinutes: 25,
        url: "https://www.blackmesagolfclub.com",
        highlight:
          "Baxter Spann design on Pueblo land with dramatic mesas and arroyos — the best course near Santa Fe",
      },
      {
        name: "Towa Golf Resort",
        tier: "solid",
        greenFeeRange: [50, 100],
        holes: 18,
        par: 72,
        yardage: 7068,
        slope: 133,
        rating: 72.9,
        walkable: false,
        style: "mountain",
        driveMinutes: 30,
        url: "https://www.towagolf.com",
        highlight:
          "Hale Irwin design at Buffalo Thunder Resort with juniper-studded mountain terrain and casino on-site",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [500, 1800],
        amenities: [
          "hot tub",
          "mountain views",
          "kiva fireplace",
          "outdoor patio",
          "adobe architecture",
        ],
        areaDescription:
          "East side near Canyon Road or north side near Tesuque — large adobe-style homes with mountain views",
        searchUrl:
          "https://www.vrbo.com/search?destination=Santa+Fe%2C+NM&groupSize=16",
        notes:
          "Inventory for 12-16 is tighter than Arizona. Look for compound-style properties with casitas. Book 3+ months out for fall season when aspens turn gold.",
      },
    ],
    dining: [
      {
        name: "The Shed",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Iconic Santa Fe New Mexican restaurant since 1953 — the red chile enchiladas are mandatory",
        reservationNeeded: true,
      },
      {
        name: "Geronimo",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Fine dining in a 1756 adobe on Canyon Road — elk tenderloin and the best special-occasion meal in town",
        reservationNeeded: true,
      },
      {
        name: "La Choza",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Sister restaurant to The Shed with equally legendary green chile — less tourist-heavy and bigger space",
        reservationNeeded: false,
      },
      {
        name: "Tomasita's",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Railyard district New Mexican staple with potent margaritas and posole that cures all ills",
        reservationNeeded: false,
      },
      {
        name: "Andiamo!",
        style: "italian",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Northern Italian in a cozy adobe space — handmade pasta and an excellent wine list",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Matador",
        vibe: "saloon",
        highlight:
          "Dark, narrow old-school saloon on Galisteo — the locals' bar with strong pours and zero pretense",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Secreto Lounge",
        vibe: "cocktail",
        highlight:
          "Craft cocktails at Hotel St. Francis with a sexy candlelit vibe — the elevated night out",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Evangelo's Cocktail Lounge",
        vibe: "dive",
        highlight:
          "Live music, pool tables, and a late-night crowd — the enduring dive on the Plaza since 1971",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Santa Fe Brewing Company (HQ Taproom)",
        vibe: "brewpub",
        highlight:
          "Santa Fe's own craft brewery with a sprawling south-side taproom and food trucks",
        lateNight: false,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Canyon Road Art Galleries",
        type: "winery",
        duration: "2-3 hours",
        pricePerPerson: [0, 0],
        groupFriendly: true,
        highlight:
          "Half-mile stretch of 100+ art galleries and studios — free to browse and unexpectedly fun as a group",
        bestFor: "rest day",
      },
      {
        name: "Meow Wolf (House of Eternal Return)",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [35, 45],
        groupFriendly: true,
        highlight:
          "Immersive psychedelic art installation unlike anything you have ever seen — yes, even for golf bros",
        bestFor: "arrival day",
        provider: "Meow Wolf",
      },
      {
        name: "Santa Fe Skeet & Trap Club",
        type: "skeet",
        duration: "1-2 hours",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "Outdoor skeet and trap shooting in the high desert — competitive and easy to organize",
        bestFor: "arrival day",
        provider: "Santa Fe Skeet & Trap Club",
      },
      {
        name: "Ski Santa Fe / Mountain Hiking",
        type: "hiking",
        duration: "3-4 hours",
        pricePerPerson: [0, 20],
        groupFriendly: true,
        highlight:
          "Aspen-covered trails at 10,000+ feet in the Sangre de Cristo range — stunning in fall",
        bestFor: "rest day",
      },
      {
        name: "Buffalo Thunder Casino",
        type: "casino",
        duration: "2-4 hours",
        pricePerPerson: [0, 200],
        groupFriendly: true,
        highlight:
          "Full casino at the Hilton Buffalo Thunder — table games and slots 20 minutes from the Plaza",
        bestFor: "arrival day",
        provider: "Hilton Buffalo Thunder",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [12, 16],
        hourlyRate: [150, 275],
        providers: [
          "Santa Fe Party Bus",
          "New Mexico Limo",
          "Capital City Cab & Shuttle",
        ],
        notes:
          "Smaller market with limited flashy options. Sprinter vans are the best bet for group transport. The Plaza area is very walkable for bars and restaurants.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 140],
        providers: [
          "Take a Chef",
          "Cozymeal",
          "Santa Fe School of Cooking (private events)",
        ],
        mealTypes: [
          "New Mexican feast",
          "steak dinner",
          "green chile brunch",
          "Southwest farm-to-table",
        ],
        notes:
          "Santa Fe has a serious culinary scene and private chefs here are legit. A New Mexican feast with fresh green chile, posole, and local wines at the adobe rental is peak Santa Fe.",
      },
    ],
  },

  // ─── Flagstaff, AZ ─────────────────────────────────────────────────
  {
    id: "flagstaff-az",
    city: "Flagstaff",
    state: "AZ",
    region: "Southwest",
    tagline: "Mountain pines and cool air — Arizona's altitude play",
    description:
      "At 7,000 feet in the Coconino National Forest, Flagstaff is the anti-desert Arizona golf trip. Cool mountain air, ponderosa pines, and a fun college-town bar scene at Northern Arizona University. Pair with a Sedona day trip for the best of both worlds.",
    population: "medium",
    nearestAirport: {
      code: "FLG",
      name: "Flagstaff Pulliam Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Elephant Rocks Golf Course",
        tier: "solid",
        greenFeeRange: [40, 75],
        holes: 9,
        par: 34,
        yardage: 2871,
        slope: 117,
        rating: 34.0,
        walkable: true,
        style: "mountain",
        driveMinutes: 25,
        highlight:
          "Unique 9-hole course weaving through massive boulder formations near Williams — play it twice for 18",
      },
      {
        name: "Continental Country Club",
        tier: "solid",
        greenFeeRange: [45, 90],
        holes: 18,
        par: 72,
        yardage: 6891,
        slope: 130,
        rating: 71.5,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.continentalgolfclub.com",
        highlight:
          "Tree-lined mountain course with elk sightings and pine-scented fairways at 7,000 feet",
      },
      {
        name: "Pine Canyon Club",
        tier: "premium",
        greenFeeRange: [100, 200],
        holes: 18,
        par: 72,
        yardage: 7100,
        slope: 140,
        rating: 73.5,
        walkable: false,
        style: "mountain",
        driveMinutes: 10,
        highlight:
          "Jay Morrish private club that occasionally opens to resort guests — stunning ponderosa pine routing",
      },
    ],
    lodging: [
      {
        type: "cabin",
        sleeps: [10, 16],
        nightlyRange: [400, 1200],
        amenities: [
          "hot tub",
          "fire pit",
          "mountain views",
          "game room",
          "deck",
          "fireplaces",
        ],
        areaDescription:
          "Flagstaff Ranch or Kachina Village — large mountain cabins and lodge-style homes in the pines",
        searchUrl:
          "https://www.vrbo.com/search?destination=Flagstaff%2C+AZ&groupSize=16",
        notes:
          "Big cabin rentals are available but book fast in summer. Mountain lodge vibes are different from the desert trip — think fireplaces, pine trees, and cooler nights.",
      },
    ],
    dining: [
      {
        name: "Brix Restaurant & Wine Bar",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Best restaurant in Flagstaff — farm-to-table American with a serious wine list in a renovated carriage house",
        reservationNeeded: true,
      },
      {
        name: "Coppa Cafe",
        style: "italian",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Cozy Italian bistro with handmade pasta and a great wine selection — perfect date-night-level meal",
        reservationNeeded: true,
      },
      {
        name: "Salsa Brava",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Local go-to for big plates of New Mexican-style food with roasted green chile",
        reservationNeeded: false,
      },
      {
        name: "Diablo Burger",
        style: "casual",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Local grass-fed beef burgers on English muffin buns with Belgian fries — a Flagstaff cult favorite",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "The Monte Vista Lounge",
        vibe: "dive",
        highlight:
          "Historic hotel bar at the allegedly haunted Hotel Monte Vista — live music and a legendary late-night scene",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Hops on Birch",
        vibe: "brewpub",
        highlight:
          "Massive rotating tap list with 100+ craft beers in a rustic downtown space",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Rendezvous Coffee House & Cocktails",
        vibe: "cocktail",
        highlight:
          "Coffee by day, craft cocktails by night in a vintage building on Route 66",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Mother Road Brewing Company",
        vibe: "brewpub",
        highlight:
          "Popular Flagstaff brewery with a chill taproom and food trucks — Tower Station IPA is the move",
        lateNight: false,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Grand Canyon Day Trip",
        type: "hiking",
        duration: "full day",
        pricePerPerson: [0, 35],
        groupFriendly: true,
        highlight:
          "South Rim is only 80 minutes away — a bucket-list side trip for the rest day",
        bestFor: "rest day",
      },
      {
        name: "Arizona Snowbowl Scenic Chairlift",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [20, 35],
        groupFriendly: true,
        highlight:
          "Ride the chairlift to 11,500 feet for panoramic views of the San Francisco Peaks and beyond",
        bestFor: "morning before golf",
        provider: "Arizona Snowbowl",
      },
      {
        name: "Historic Brewing Company Brewery Tour",
        type: "brewery",
        duration: "1-2 hours",
        pricePerPerson: [15, 25],
        groupFriendly: true,
        highlight:
          "Tour and tasting at a local Flagstaff brewery — easy arrival-day warm-up",
        bestFor: "arrival day",
        provider: "Historic Brewing Company",
      },
      {
        name: "Flagstaff Extreme Adventure Course",
        type: "zipline",
        duration: "2-3 hours",
        pricePerPerson: [45, 55],
        groupFriendly: true,
        highlight:
          "Treetop obstacle course and ziplines through the ponderosa pines — competitive and hilarious with a group",
        bestFor: "rest day",
        provider: "Flagstaff Extreme",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [12, 16],
        hourlyRate: [125, 250],
        providers: [
          "Arizona Shuttle",
          "Flagstaff Shuttle & Charter",
          "Groome Transportation",
        ],
        notes:
          "Downtown Flagstaff bar district is very walkable. Shuttle mainly needed for course transport. Limited party bus inventory — sprinter vans are the realistic option.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 130],
        providers: ["Take a Chef", "Cozymeal"],
        mealTypes: [
          "steak dinner",
          "mountain BBQ cookout",
          "breakfast spread",
        ],
        notes:
          "Smaller market but chefs from Sedona and Phoenix are often willing to travel. A cookout at the cabin with steaks and local craft beers is the mountain lodge move.",
      },
    ],
  },
];
