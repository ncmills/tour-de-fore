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

  // ─── Las Vegas, NV ──────────────────────────────────────────────────
  {
    id: "las-vegas-nv",
    city: "Las Vegas",
    state: "NV",
    region: "Southwest",
    tagline: "The ultimate boys-trip city with world-class desert golf",
    description:
      "Vegas needs no introduction for a group trip. Stack it with bucket-list golf at Shadow Creek or TPC Las Vegas, endless dining, and a nightlife scene that never stops. LAS is the airport, everything is close, and the Airbnb mansion game is elite.",
    population: "medium",
    nearestAirport: {
      code: "LAS",
      name: "Harry Reid International Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Shadow Creek",
        tier: "bucket-list",
        greenFeeRange: [500, 600],
        holes: 18,
        par: 72,
        yardage: 7560,
        slope: 140,
        rating: 75.2,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.shadowcreek.com",
        highlight:
          "Tom Fazio masterpiece built from flat desert into a lush Carolina-style paradise — limo ride included",
      },
      {
        name: "TPC Las Vegas (Canyon Course)",
        tier: "premium",
        greenFeeRange: [150, 250],
        holes: 18,
        par: 71,
        yardage: 7104,
        slope: 135,
        rating: 73.6,
        walkable: false,
        style: "desert",
        driveMinutes: 25,
        url: "https://www.tpc.com/las-vegas",
        highlight:
          "Former PGA Tour stop in the Summerlin foothills with dramatic canyon views on the back nine",
      },
      {
        name: "Paiute Golf Resort (Wolf Course)",
        tier: "premium",
        greenFeeRange: [100, 200],
        holes: 18,
        par: 72,
        yardage: 7604,
        slope: 136,
        rating: 75.2,
        walkable: false,
        style: "desert",
        driveMinutes: 30,
        url: "https://www.lvpaiutegolf.com",
        highlight:
          "Pete Dye design with 45 holes on site — Wolf is the beast, Snow Mountain and Sun Mountain round out the trio",
      },
      {
        name: "Bali Hai Golf Club",
        tier: "premium",
        greenFeeRange: [150, 300],
        holes: 18,
        par: 71,
        yardage: 7002,
        slope: 130,
        rating: 73.0,
        walkable: false,
        style: "resort",
        driveMinutes: 5,
        url: "https://www.balihaigolfclub.com",
        highlight:
          "Tropical-themed course steps from the Strip — palm trees, white sand, and convenience you can not beat",
      },
      {
        name: "Cascata Golf Club",
        tier: "bucket-list",
        greenFeeRange: [250, 450],
        holes: 18,
        par: 72,
        yardage: 7137,
        slope: 143,
        rating: 74.6,
        walkable: false,
        style: "desert",
        driveMinutes: 35,
        url: "https://www.cascatagolf.com",
        highlight:
          "Rees Jones design in Boulder City with a 418-foot waterfall behind the clubhouse — pure spectacle",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [800, 3000],
        amenities: [
          "private pool",
          "hot tub",
          "game room",
          "home theater",
          "putting green",
          "BBQ grill",
        ],
        areaDescription:
          "Summerlin, Henderson, or Southwest Las Vegas — luxury vacation rental mansions with pools",
        searchUrl:
          "https://www.vrbo.com/search?destination=Las+Vegas%2C+NV&groupSize=16",
        notes:
          "Vegas mansion rentals are the move for 12-20 guys. Summerlin is closest to the golf. Many come with private pools, poker tables, and home theaters.",
      },
      {
        type: "resort-house",
        sleeps: [8, 16],
        nightlyRange: [600, 2000],
        amenities: [
          "Strip access",
          "pool",
          "concierge",
          "valet parking",
        ],
        areaDescription:
          "The Strip or Downtown — hotel villa suites or multi-bedroom party suites",
        notes:
          "Cosmopolitan, Encore, and Aria offer connected suites that sleep groups. More expensive per night but you are on the Strip with zero Uber logistics.",
      },
    ],
    dining: [
      {
        name: "STK Las Vegas",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "High-energy steakhouse inside the Cosmopolitan with DJ and lounge vibes — perfect group dinner",
        reservationNeeded: true,
      },
      {
        name: "Herbs & Rye",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Off-Strip speakeasy with half-price steaks during happy hour and world-class cocktails",
        reservationNeeded: false,
      },
      {
        name: "Tacos El Gordo",
        style: "mexican",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Tijuana-style street tacos on the Strip — the 3 AM move after the clubs",
        reservationNeeded: false,
      },
      {
        name: "AYCE Buffet (Palms)",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "All-you-can-eat spread with carving stations and seafood — classic Vegas fuel",
        reservationNeeded: false,
      },
      {
        name: "Bavette's Park MGM",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Moody, dimly-lit Chicago-style steakhouse with incredible bone marrow and live jazz",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "The Chandelier (Cosmopolitan)",
        vibe: "cocktail",
        highlight:
          "Three-story cocktail bar in the center of the Cosmo — order the verbena cocktail that numbs your tongue",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Atomic Liquors",
        vibe: "dive",
        highlight:
          "The oldest freestanding bar in Vegas, now a craft cocktail spot in the Fremont East district",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Skyfall Lounge (Delano)",
        vibe: "rooftop",
        highlight:
          "64th-floor views of the entire Strip — expensive but the panoramic sunset is unbeatable",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Gold Spike",
        vibe: "dive",
        highlight:
          "Downtown social club with giant Jenga, beer pong, and a backyard patio — zero pretense",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Topgolf Las Vegas",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [35, 65],
        groupFriendly: true,
        highlight:
          "Four-story Topgolf right off the Strip with a pool and concert stage — the ultimate group warm-up",
        bestFor: "arrival day",
        provider: "Topgolf",
      },
      {
        name: "Battlefield Vegas",
        type: "shooting",
        duration: "1-2 hours",
        pricePerPerson: [100, 500],
        groupFriendly: true,
        highlight:
          "Shoot machine guns, miniguns, and grenade launchers — the most Vegas activity imaginable",
        bestFor: "rest day",
        provider: "Battlefield Vegas",
      },
      {
        name: "Vegas Casino Crawl",
        type: "casino",
        duration: "4-8 hours",
        pricePerPerson: [0, 500],
        groupFriendly: true,
        highlight:
          "Hit the tables at Bellagio, Wynn, and Aria — poker, blackjack, and craps with the crew",
        bestFor: "arrival day",
      },
      {
        name: "SpeedVegas",
        type: "go-karts",
        duration: "1-2 hours",
        pricePerPerson: [200, 700],
        groupFriendly: true,
        highlight:
          "Drive Lamborghinis and Ferraris on a real track at 150 mph — bachelor-party energy",
        bestFor: "rest day",
        provider: "SpeedVegas",
      },
      {
        name: "Red Rock Canyon Hiking",
        type: "hiking",
        duration: "2-4 hours",
        pricePerPerson: [0, 15],
        groupFriendly: true,
        highlight:
          "Stunning red sandstone formations 20 minutes from the Strip — Calico Tanks trail for the group photo",
        bestFor: "morning before golf",
      },
      {
        name: "Vegas Strip Helicopter Tour",
        type: "zipline",
        duration: "30-60 minutes",
        pricePerPerson: [100, 250],
        groupFriendly: true,
        highlight:
          "Night flight over the Strip in a helicopter — absolutely electric for a group",
        bestFor: "arrival day",
        provider: "Maverick Helicopters",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [12, 40],
        hourlyRate: [200, 500],
        providers: ["Vegas Party Bus", "Presidential Limousine", "Tux Limo"],
        notes:
          "Vegas party buses are an industry. LED lights, sound systems, and Strip loops are standard. Book early for weekends.",
      },
      {
        type: "limo",
        capacity: [8, 16],
        hourlyRate: [150, 400],
        providers: ["AWG Ambassador", "Presidential Limousine"],
        notes:
          "Stretch limos and Hummer limos are classic Vegas. Great for a dinner-to-club transfer.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 175],
        providers: ["Take a Chef", "Cozymeal", "Vegas Private Chefs"],
        mealTypes: ["steak dinner", "BBQ cookout", "brunch", "sushi night"],
        notes:
          "Deep chef pool in Vegas. A private chef at the mansion with wagyu and whiskey is the ultimate night-in move.",
      },
    ],
  },

  // ─── Reno, NV ───────────────────────────────────────────────────────
  {
    id: "reno-nv",
    city: "Reno",
    state: "NV",
    region: "Southwest",
    tagline: "Mountain golf, casinos, and craft beer in the Biggest Little City",
    description:
      "Reno punches way above its weight for a golf trip. Mountain courses with Sierra views, a revitalized Midtown bar scene, and casino nightlife without the Vegas price tag. Fly direct into RNO and you are 10 minutes from everything.",
    population: "medium",
    nearestAirport: {
      code: "RNO",
      name: "Reno-Tahoe International Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Wolf Run Golf Club",
        tier: "premium",
        greenFeeRange: [75, 140],
        holes: 18,
        par: 71,
        yardage: 6907,
        slope: 135,
        rating: 72.6,
        walkable: true,
        style: "mountain",
        driveMinutes: 15,
        url: "https://www.wolfrungolfclub.com",
        highlight:
          "Challenging mountain layout with Sierra Nevada views and some of the best conditioning in northern Nevada",
      },
      {
        name: "ArrowCreek Golf Club (Legend Course)",
        tier: "premium",
        greenFeeRange: [80, 150],
        holes: 18,
        par: 72,
        yardage: 7100,
        slope: 138,
        rating: 73.4,
        walkable: false,
        style: "mountain",
        driveMinutes: 20,
        url: "https://www.arrowcreek.com",
        highlight:
          "Arnold Palmer design perched above the city with panoramic views of Reno and the Truckee Meadows",
      },
      {
        name: "Lakeridge Golf Course",
        tier: "solid",
        greenFeeRange: [50, 95],
        holes: 18,
        par: 71,
        yardage: 6717,
        slope: 131,
        rating: 71.3,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.lakeridgegolf.com",
        highlight:
          "Robert Trent Jones II design with an island green par-3 — best value in the Reno area",
      },
      {
        name: "Montreux Golf & Country Club",
        tier: "bucket-list",
        greenFeeRange: [175, 300],
        holes: 18,
        par: 72,
        yardage: 7472,
        slope: 142,
        rating: 75.4,
        walkable: false,
        style: "mountain",
        driveMinutes: 25,
        url: "https://www.montreuxgolf.com",
        highlight:
          "Jack Nicklaus design that hosted the PGA Tour Barracuda Championship — private but resort access available",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [400, 1200],
        amenities: [
          "hot tub",
          "mountain views",
          "game room",
          "BBQ grill",
          "fire pit",
        ],
        areaDescription:
          "South Reno or Galena Forest — mountain-adjacent homes near ArrowCreek and Montreux",
        searchUrl:
          "https://www.vrbo.com/search?destination=Reno%2C+NV&groupSize=16",
        notes:
          "South Reno has the best large home inventory near the golf. Alternatively, Midtown condos put you walking distance from bars.",
      },
      {
        type: "lodge",
        sleeps: [8, 14],
        nightlyRange: [300, 900],
        amenities: [
          "pool",
          "casino access",
          "restaurant",
          "valet parking",
        ],
        areaDescription:
          "Downtown Reno — casino hotel suites at Grand Sierra, Peppermill, or Atlantis",
        notes:
          "Casino resorts offer connected suites and group rates. The Peppermill is the standout with its retro-chic vibe.",
      },
    ],
    dining: [
      {
        name: "Brasserie Saint James",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Elevated French-American cuisine in a beautifully restored Midtown building — great group energy",
        reservationNeeded: true,
      },
      {
        name: "Louis' Basque Corner",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Family-style Basque dinner with picon punch, lamb, and communal tables — a Reno institution since 1967",
        reservationNeeded: true,
      },
      {
        name: "The Depot Craft Brewery Distillery",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "House-brewed beers and spirits in a converted railroad depot — great food menu too",
        reservationNeeded: false,
      },
      {
        name: "Sterling's Seafood Steakhouse",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Classic high-end steakhouse inside Silver Legacy with big-group private dining",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Death & Taxes",
        vibe: "cocktail",
        highlight:
          "Speakeasy-style craft cocktail bar in Midtown — dark, moody, and excellent drinks",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "The Emerson",
        vibe: "patio",
        highlight:
          "Midtown hangout with a big patio, fire pits, and strong cocktails — the group pre-game spot",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Peppermill Fireside Lounge",
        vibe: "cocktail",
        highlight:
          "Iconic 70s lounge with fire pits, neon, and scorpion bowls — a must-visit Reno landmark",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Grand Sierra Resort Casino",
        type: "casino",
        duration: "3-6 hours",
        pricePerPerson: [0, 300],
        groupFriendly: true,
        highlight:
          "Massive casino resort with bowling, movie theater, and driving range on site",
        bestFor: "arrival day",
        provider: "Grand Sierra Resort",
      },
      {
        name: "Truckee River Whitewater Rafting",
        type: "rafting",
        duration: "2-3 hours",
        pricePerPerson: [40, 80],
        groupFriendly: true,
        highlight:
          "Class 2-3 rapids right through downtown Reno — a surprisingly fun half-day add",
        bestFor: "rest day",
        provider: "Truckee River Raft Company",
      },
      {
        name: "Reno Brewing District Tour",
        type: "brewery",
        duration: "3-4 hours",
        pricePerPerson: [0, 50],
        groupFriendly: true,
        highlight:
          "Walk between IMBIB, Lead Dog, and Pigeon Head in Midtown — the craft beer scene is legit",
        bestFor: "rest day",
      },
      {
        name: "Sage Street Clay Sports",
        type: "shooting",
        duration: "2-3 hours",
        pricePerPerson: [40, 100],
        groupFriendly: true,
        highlight:
          "Sporting clays and trap shooting with mountain backdrop — great group competition",
        bestFor: "morning before golf",
        provider: "Sage Street Clay Sports",
      },
      {
        name: "Lake Tahoe Day Trip",
        type: "hiking",
        duration: "full day",
        pricePerPerson: [0, 30],
        groupFriendly: true,
        highlight:
          "45 minutes to the most beautiful lake in America — Sand Harbor beach or Emerald Bay hike",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [12, 24],
        hourlyRate: [175, 400],
        providers: ["Reno Tahoe Limousine", "Sierra West Limousine"],
        notes:
          "Party buses for Midtown bar crawls or Reno-to-Tahoe transfers. Book early in summer.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 140],
        providers: ["Take a Chef", "Cozymeal"],
        mealTypes: ["steak dinner", "BBQ cookout", "brunch"],
        notes:
          "Solid chef pool thanks to Reno-Tahoe's food scene. A mountain-house cookout with local craft beer is the play.",
      },
    ],
  },

  // ─── Phoenix / Mesa, AZ ─────────────────────────────────────────────
  {
    id: "phoenix-mesa-az",
    city: "Phoenix / Mesa",
    state: "AZ",
    region: "Southwest",
    tagline: "Massive metro, massive course list, zero pretense",
    description:
      "Phoenix is Scottsdale's blue-collar neighbor with just as much great golf at half the price. Papago is a municipal legend, We-Ko-Pa is 30 minutes east, and the East Valley (Mesa, Gilbert, Chandler) has dozens of playable tracks. The nightlife skews more sports-bar than bottle-service, which is exactly what most groups want.",
    population: "medium",
    nearestAirport: {
      code: "PHX",
      name: "Phoenix Sky Harbor International Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Papago Golf Course",
        tier: "solid",
        greenFeeRange: [45, 80],
        holes: 18,
        par: 72,
        yardage: 7068,
        slope: 131,
        rating: 73.0,
        walkable: true,
        style: "desert",
        driveMinutes: 10,
        url: "https://www.papagogolfcourse.net",
        highlight:
          "Iconic Phoenix muni nestled between the Papago Buttes — where the locals play and the views punch way above the green fee",
      },
      {
        name: "ASU Karsten Golf Course",
        tier: "solid",
        greenFeeRange: [40, 75],
        holes: 18,
        par: 72,
        yardage: 7002,
        slope: 131,
        rating: 72.9,
        walkable: true,
        style: "desert",
        driveMinutes: 15,
        url: "https://www.asukarsten.com",
        highlight:
          "Pete Dye design for ASU — sneaky tough college course with great conditioning for the price",
      },
      {
        name: "Longbow Golf Club",
        tier: "solid",
        greenFeeRange: [50, 95],
        holes: 18,
        par: 71,
        yardage: 6750,
        slope: 128,
        rating: 71.5,
        walkable: false,
        style: "desert",
        driveMinutes: 25,
        url: "https://www.longbowgolf.com",
        highlight:
          "Ken Kavanaugh design in Mesa with water on 13 holes and mountain backdrops — great value",
      },
      {
        name: "We-Ko-Pa Golf Club (Cholla Course)",
        tier: "premium",
        greenFeeRange: [130, 240],
        holes: 18,
        par: 72,
        yardage: 7225,
        slope: 145,
        rating: 74.5,
        walkable: false,
        style: "desert",
        driveMinutes: 35,
        url: "https://www.wekopa.com",
        highlight:
          "Scott Miller design on Fort McDowell Yavapai land — wide fairways framed by untouched Sonoran Desert",
      },
      {
        name: "Aguila Golf Course",
        tier: "budget",
        greenFeeRange: [25, 50],
        holes: 18,
        par: 72,
        yardage: 6701,
        slope: 119,
        rating: 70.6,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "No-frills Phoenix muni that is perfect for a warm-up round or a hangover special",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [500, 1800],
        amenities: [
          "private pool",
          "hot tub",
          "game room",
          "BBQ grill",
          "fire pit",
        ],
        areaDescription:
          "East Valley (Mesa, Gilbert, Chandler) for course proximity, or Central Phoenix/Tempe for nightlife access",
        searchUrl:
          "https://www.vrbo.com/search?destination=Phoenix%2C+AZ&groupSize=16",
        notes:
          "Massive rental inventory keeps prices 30-50% below equivalent Scottsdale homes. East Valley homes are closer to courses; Tempe Mill Ave area is better for nightlife.",
      },
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [300, 1000],
        amenities: [
          "private pool",
          "putting green",
          "outdoor kitchen",
          "mountain views",
        ],
        areaDescription:
          "Mesa near Longbow or Superstition Springs — newer communities with golf course homes",
        notes:
          "Mesa has great golf community homes with pools and putting greens at budget-friendly prices.",
      },
    ],
    dining: [
      {
        name: "Steak 44",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "One of the Valley's best steakhouses with tableside prep and a buzzing bar scene",
        reservationNeeded: true,
      },
      {
        name: "Rustler's Rooste",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Mountaintop BBQ spot with rattlesnake appetizers, a slide entrance, and panoramic city views",
        reservationNeeded: true,
      },
      {
        name: "Los Dos Molinos",
        style: "mexican",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "New Mexican-style heat that will humble your spice-tough buddy — the green chile is legendary",
        reservationNeeded: false,
      },
      {
        name: "Pizzeria Bianco",
        style: "italian",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "James Beard Award-winning pizza in Heritage Square — worth the wait",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Casey Moore's Oyster House",
        vibe: "patio",
        highlight:
          "Legendary Tempe patio bar in a haunted 1910 house — cheap pitchers and big energy",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Bitter & Twisted Cocktail Parlour",
        vibe: "cocktail",
        highlight:
          "Award-winning cocktail bar in a former Prohibition headquarters — creative drinks in a speakeasy vibe",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Whining Pig",
        vibe: "sports-bar",
        highlight:
          "Self-pour beer wall with 40 taps and big screens — the group picks their own pours",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Salt River Tubing",
        type: "water-sports",
        duration: "3-4 hours",
        pricePerPerson: [20, 25],
        groupFriendly: true,
        highlight:
          "Float the Salt River with coolers of beer on a hot Arizona day — peak rest-day activity",
        bestFor: "rest day",
        provider: "Salt River Tubing & Recreation",
      },
      {
        name: "Topgolf Scottsdale",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "Climate-controlled driving range bays with food and drinks — great for arrival day",
        bestFor: "arrival day",
        provider: "Topgolf",
      },
      {
        name: "Arizona Hiking — Camelback Mountain",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 0],
        groupFriendly: true,
        highlight:
          "Iconic Phoenix summit hike with 360-degree Valley views — bring water and start early",
        bestFor: "morning before golf",
      },
      {
        name: "Octane Raceway",
        type: "go-karts",
        duration: "1-2 hours",
        pricePerPerson: [25, 50],
        groupFriendly: true,
        highlight:
          "Indoor electric kart racing in Scottsdale — competitive and air-conditioned",
        bestFor: "arrival day",
        provider: "Octane Raceway",
      },
      {
        name: "Ben Avery Shooting Facility",
        type: "shooting",
        duration: "2-3 hours",
        pricePerPerson: [30, 80],
        groupFriendly: true,
        highlight:
          "World-class public shooting facility with trap, skeet, and rifle ranges",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [12, 30],
        hourlyRate: [175, 400],
        providers: ["AZ Limo", "Phoenix Party Bus", "Mirage Limousines"],
        notes:
          "The Valley is spread out — a party bus or sprinter van keeps the group together and avoids 30-minute Ubers between courses and nightlife.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [55, 130],
        providers: ["Take a Chef", "Cozymeal", "Hire a Chef Phoenix"],
        mealTypes: ["steak dinner", "BBQ cookout", "southwest brunch"],
        notes:
          "Deep chef pool in the Phoenix metro. A private poolside cookout at your rental is the move.",
      },
    ],
  },

  // ─── Albuquerque, NM ────────────────────────────────────────────────
  {
    id: "albuquerque-nm",
    city: "Albuquerque",
    state: "NM",
    region: "Southwest",
    tagline: "High desert golf with craft beer and green chile on everything",
    description:
      "Albuquerque sits at 5,000 feet with year-round sunshine and a quietly excellent golf scene. UNM Championship is a top-tier college course, Paako Ridge is a hidden gem in the Sandia foothills, and the food scene revolves around Hatch green chile on literally everything. Nonstop flights from most hubs and prices well below Arizona.",
    population: "medium",
    nearestAirport: {
      code: "ABQ",
      name: "Albuquerque International Sunport",
      driveMinutes: 10,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "UNM Championship Golf Course",
        tier: "premium",
        greenFeeRange: [50, 95],
        holes: 18,
        par: 72,
        yardage: 7248,
        slope: 136,
        rating: 74.5,
        walkable: true,
        style: "desert",
        driveMinutes: 10,
        url: "https://unmgolf.com",
        highlight:
          "Red Ryder designed this monster for the Lobos — long, demanding, and one of the best college courses in the West",
      },
      {
        name: "Paako Ridge Golf Club",
        tier: "premium",
        greenFeeRange: [80, 150],
        holes: 27,
        par: 72,
        yardage: 7562,
        slope: 140,
        rating: 74.8,
        walkable: false,
        style: "mountain",
        driveMinutes: 35,
        url: "https://www.paakoridge.com",
        highlight:
          "Ken Dye design carved through juniper-studded foothills east of ABQ — 27 holes of pure high-desert beauty",
      },
      {
        name: "Sandia Golf Club",
        tier: "premium",
        greenFeeRange: [60, 120],
        holes: 18,
        par: 72,
        yardage: 7752,
        slope: 137,
        rating: 76.1,
        walkable: false,
        style: "desert",
        driveMinutes: 15,
        url: "https://www.sandiagolf.com",
        highlight:
          "Scott Miller design at Sandia Resort with Sandia Mountain views and a casino next door",
      },
      {
        name: "Twin Warriors Golf Club",
        tier: "premium",
        greenFeeRange: [60, 110],
        holes: 18,
        par: 72,
        yardage: 7036,
        slope: 132,
        rating: 73.5,
        walkable: false,
        style: "desert",
        driveMinutes: 20,
        url: "https://www.twinwarriorsgolf.com",
        highlight:
          "Gary Panks design at Hyatt Regency Tamaya on Santa Ana Pueblo land — dramatic mesa and mountain backdrops",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 18],
        nightlyRange: [300, 1200],
        amenities: [
          "hot tub",
          "mountain views",
          "fire pit",
          "game room",
          "BBQ grill",
        ],
        areaDescription:
          "Northeast Heights or Sandia foothills — views of the Sandias and close to courses",
        searchUrl:
          "https://www.vrbo.com/search?destination=Albuquerque%2C+NM&groupSize=16",
        notes:
          "ABQ is affordable. Large homes in the foothills with mountain views run well under Scottsdale prices. North Valley adobe homes add local character.",
      },
      {
        type: "resort-house",
        sleeps: [8, 16],
        nightlyRange: [400, 1500],
        amenities: [
          "casino access",
          "spa",
          "pool",
          "on-site dining",
        ],
        areaDescription:
          "Sandia Resort & Casino or Hyatt Regency Tamaya — resort base with golf attached",
        notes:
          "Splitting resort rooms works well here since both Sandia and Tamaya have courses on-site. Casino perks sweeten the deal.",
      },
    ],
    dining: [
      {
        name: "Vernon's Speakeasy",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Hidden steakhouse behind a bookcase door in a strip mall — excellent cuts and old-school cocktails",
        reservationNeeded: true,
      },
      {
        name: "El Pinto Restaurant",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Sprawling hacienda with patios, fire pits, and New Mexican food that is as authentic as it gets",
        reservationNeeded: true,
      },
      {
        name: "Frontier Restaurant",
        style: "casual",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "UNM institution since 1971 — giant breakfast burritos smothered in green chile for $8",
        reservationNeeded: false,
      },
      {
        name: "Seasons Rotisserie & Grill",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Old Town fine dining with rooftop patio views and a rotating seasonal menu",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Marble Brewery",
        vibe: "brewpub",
        highlight:
          "ABQ's flagship craft brewery with a huge outdoor patio and rotating local food trucks",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Anodyne",
        vibe: "cocktail",
        highlight:
          "Pool tables, craft cocktails, and a chill neighborhood vibe in Nob Hill",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Sister Bar",
        vibe: "dive",
        highlight:
          "Downtown dive with live music, cheap drinks, and genuine local character",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Sandia Peak Tramway",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [25, 35],
        groupFriendly: true,
        highlight:
          "Longest aerial tram in the Americas — ride to 10,378 feet for panoramic views of the Rio Grande Valley",
        bestFor: "rest day",
        provider: "Sandia Peak Tramway",
      },
      {
        name: "Sandia Resort Casino",
        type: "casino",
        duration: "2-4 hours",
        pricePerPerson: [0, 300],
        groupFriendly: true,
        highlight:
          "Full casino floor with poker, table games, and sports betting right next to the golf course",
        bestFor: "arrival day",
        provider: "Sandia Resort & Casino",
      },
      {
        name: "Rio Grande Brewing & Distillery Tour",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [15, 40],
        groupFriendly: true,
        highlight:
          "Hit Marble, La Cumbre, and Bow & Arrow on a self-guided brewery crawl through downtown ABQ",
        bestFor: "rest day",
      },
      {
        name: "Petroglyph National Monument",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 0],
        groupFriendly: true,
        highlight:
          "Volcanic escarpment with 24,000+ ancient petroglyphs and easy mesa-top trails",
        bestFor: "morning before golf",
      },
      {
        name: "ABQ BioPark & Botanic Garden",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [15, 15],
        groupFriendly: true,
        highlight:
          "Zoo, aquarium, and botanic garden along the Rio Grande — relaxed rest-day option",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [10, 16],
        hourlyRate: [125, 275],
        providers: ["ABQ Trolley Co.", "Duke City Limousine"],
        notes:
          "ABQ is spread out but courses are mostly north/northeast. A sprinter keeps the group together for brewery crawls and course transfers.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [50, 115],
        providers: ["Take a Chef", "Cozymeal"],
        mealTypes: ["green chile steak dinner", "BBQ cookout", "New Mexican brunch"],
        notes:
          "Request a chef who does New Mexican cuisine — a Hatch green chile-themed dinner at your rental is the play.",
      },
    ],
  },

  // ─── Lake Havasu City, AZ ───────────────────────────────────────────
  {
    id: "lake-havasu-city-az",
    city: "Lake Havasu City",
    state: "AZ",
    region: "Southwest",
    tagline: "Spring break energy meets desert golf on the Colorado River",
    description:
      "Lake Havasu City is famous for its relocated London Bridge and party-friendly lake scene. The golf is solid budget desert fare, and the real draw is combining morning rounds with afternoon lake activities — boats, jet skis, and sandbar hangouts. Fly into Vegas and drive two hours south.",
    population: "small",
    nearestAirport: {
      code: "LAS",
      name: "Harry Reid International Airport (Las Vegas)",
      driveMinutes: 150,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "London Bridge Golf Club (East Course)",
        tier: "solid",
        greenFeeRange: [35, 70],
        holes: 18,
        par: 71,
        yardage: 6616,
        slope: 123,
        rating: 70.6,
        walkable: true,
        style: "desert",
        driveMinutes: 5,
        highlight:
          "Well-maintained desert muni with mountain views — the best value in town",
      },
      {
        name: "London Bridge Golf Club (West Course)",
        tier: "solid",
        greenFeeRange: [30, 60],
        holes: 18,
        par: 71,
        yardage: 6438,
        slope: 117,
        rating: 69.3,
        walkable: true,
        style: "desert",
        driveMinutes: 5,
        highlight:
          "Shorter sister course — wide open, forgiving, and perfect for a warm-up or hangover round",
      },
      {
        name: "Havasu Island Golf Course",
        tier: "budget",
        greenFeeRange: [25, 50],
        holes: 9,
        par: 36,
        yardage: 3200,
        slope: 113,
        rating: 35.5,
        walkable: true,
        style: "desert",
        driveMinutes: 10,
        highlight:
          "Quick 9-hole loop that leaves the afternoon free for lake activities",
      },
      {
        name: "Emerald Canyon Golf Course",
        tier: "premium",
        greenFeeRange: [45, 90],
        holes: 18,
        par: 72,
        yardage: 6643,
        slope: 130,
        rating: 71.3,
        walkable: false,
        style: "desert",
        driveMinutes: 40,
        url: "https://www.emeraldcanyongolf.com",
        highlight:
          "Stunning canyon course in Parker with 300-foot elevation drops to the Colorado River — worth the 40-minute drive",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [400, 1500],
        amenities: [
          "private pool",
          "boat dock",
          "lake views",
          "BBQ grill",
          "hot tub",
        ],
        areaDescription:
          "Lake-access homes on the channel or near London Bridge — walk to restaurants and bars",
        searchUrl:
          "https://www.vrbo.com/search?destination=Lake+Havasu+City%2C+AZ&groupSize=16",
        notes:
          "Waterfront homes with private docks are the play — rent a boat and tie up at your house. Spring is peak season so book early.",
      },
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [250, 900],
        amenities: [
          "private pool",
          "game room",
          "mountain views",
          "fire pit",
        ],
        areaDescription:
          "Off-water homes in residential areas — cheaper and still 10 minutes from everything",
        notes:
          "Non-waterfront homes are significantly cheaper. Everything in Havasu is a short drive.",
      },
    ],
    dining: [
      {
        name: "Shugrue's Restaurant",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Waterfront dining with views of London Bridge — the best sit-down dinner in Havasu",
        reservationNeeded: true,
      },
      {
        name: "College Street Brewhouse & Pub",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Local craft brewery with pub food and a solid tap list — chill group dinner spot",
        reservationNeeded: false,
      },
      {
        name: "Juicy's River Cafe",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Massive portions of burgers and comfort food — the locals' breakfast and lunch favorite",
        reservationNeeded: false,
      },
      {
        name: "Angelina's Italian Kitchen",
        style: "italian",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Family-run Italian with generous portions and a loyal local following",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Kokomo Havasu",
        vibe: "patio",
        highlight:
          "Open-air tiki-style bar on the channel with live music, boat parking, and spring-break energy",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Sandbar & Grill",
        vibe: "sports-bar",
        highlight:
          "Casual waterside sports bar with cheap drinks and TVs — the late-night default",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Heat Hotel Rooftop Bar",
        vibe: "rooftop",
        highlight:
          "Rooftop pool bar overlooking the Bridgewater Channel — day-drinking with a view",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Jet Ski Rental on Lake Havasu",
        type: "water-sports",
        duration: "2-4 hours",
        pricePerPerson: [75, 150],
        groupFriendly: true,
        highlight:
          "Rip around the lake and hit the sandbars — peak rest-day activity",
        bestFor: "rest day",
        provider: "Havasu Jet Ski Rentals",
      },
      {
        name: "Pontoon Boat Rental",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [40, 80],
        groupFriendly: true,
        highlight:
          "Rent a pontoon, load the cooler, and cruise to Copper Canyon or the sandbar",
        bestFor: "rest day",
        provider: "Lake Havasu Boat Rentals",
      },
      {
        name: "London Bridge Walking Tour",
        type: "hiking",
        duration: "1-2 hours",
        pricePerPerson: [0, 0],
        groupFriendly: true,
        highlight:
          "Walk across the actual 1830s London Bridge relocated from England — weird and cool",
        bestFor: "arrival day",
      },
      {
        name: "Desert Hills Shooting Range",
        type: "shooting",
        duration: "2-3 hours",
        pricePerPerson: [30, 75],
        groupFriendly: true,
        highlight:
          "Outdoor desert shooting range with rifle, pistol, and shotgun options",
        bestFor: "rest day",
      },
      {
        name: "Topock Gorge Kayaking",
        type: "kayaking",
        duration: "half day",
        pricePerPerson: [50, 90],
        groupFriendly: true,
        highlight:
          "Paddle through scenic Topock Gorge on the Colorado River — calm water and canyon walls",
        bestFor: "rest day",
        provider: "Western Arizona Canoe & Kayak",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 16],
        hourlyRate: [100, 200],
        providers: ["Havasu Party Bus", "Lake Havasu Shuttle"],
        notes:
          "Havasu is small — most things are 10 minutes apart. A rented 15-passenger van works for most groups. Party buses available for bar crawls along the channel.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [55, 125],
        providers: ["Take a Chef", "Cozymeal"],
        mealTypes: ["steak dinner", "BBQ cookout", "lakeside brunch"],
        notes:
          "Limited local chef pool — book early or look for Phoenix-based chefs willing to travel. A poolside BBQ at a waterfront rental is the ideal setup.",
      },
    ],
  },

  // ─── Laughlin, NV ───────────────────────────────────────────────────
  {
    id: "laughlin-nv",
    city: "Laughlin",
    state: "NV",
    region: "Southwest",
    tagline: "Cheap casino town on the Colorado with sneaky good golf",
    description:
      "Laughlin is a low-key casino town on the Colorado River with surprisingly good golf. Mojave Resort is a top-notch course, the casinos keep drinks cheap and tables running, and the whole trip costs a fraction of Vegas. Fly into Vegas and drive 90 minutes south or into Laughlin-Bullhead City Airport.",
    population: "small",
    nearestAirport: {
      code: "IFP",
      name: "Laughlin/Bullhead International Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Mojave Resort Golf Club",
        tier: "premium",
        greenFeeRange: [50, 110],
        holes: 18,
        par: 72,
        yardage: 6939,
        slope: 131,
        rating: 72.9,
        walkable: false,
        style: "resort",
        driveMinutes: 10,
        highlight:
          "Best course in the Laughlin area — well-conditioned resort layout with mountain and river valley views",
      },
      {
        name: "Emerald River Golf Course",
        tier: "solid",
        greenFeeRange: [30, 65],
        holes: 18,
        par: 72,
        yardage: 6301,
        slope: 118,
        rating: 69.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        highlight:
          "Flat and forgiving course right in Laughlin — cheap, walkable, and perfect for a warm-up round",
      },
      {
        name: "Rio Vista Golf Club",
        tier: "solid",
        greenFeeRange: [25, 55],
        holes: 9,
        par: 34,
        yardage: 2900,
        slope: 110,
        rating: 34.0,
        walkable: true,
        style: "desert",
        driveMinutes: 15,
        highlight:
          "Quick 9-hole loop across the river in Bullhead City — budget-friendly twilight option",
      },
      {
        name: "Chaparral Country Club",
        tier: "solid",
        greenFeeRange: [35, 70],
        holes: 18,
        par: 72,
        yardage: 6600,
        slope: 122,
        rating: 70.5,
        walkable: true,
        style: "desert",
        driveMinutes: 15,
        highlight:
          "Semi-private course in Bullhead City with mature trees and a well-maintained layout",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [300, 900],
        amenities: [
          "private pool",
          "river views",
          "BBQ grill",
          "game room",
        ],
        areaDescription:
          "Bullhead City across the river — vacation rentals with pools and river access",
        searchUrl:
          "https://www.vrbo.com/search?destination=Laughlin%2C+NV&groupSize=16",
        notes:
          "Most rental homes are in Bullhead City, AZ across the river (5-minute drive). Casino hotel rooms at Harrah's, Aquarius, or Don Laughlin's run $40-80/night and are the easy alternative.",
      },
      {
        type: "lodge",
        sleeps: [8, 16],
        nightlyRange: [200, 600],
        amenities: [
          "casino access",
          "pool",
          "on-site dining",
          "river views",
        ],
        areaDescription:
          "Casino hotels along the Laughlin Strip — Harrah's, Aquarius, Don Laughlin's Riverside",
        notes:
          "Splitting 8 casino hotel rooms at $50/night is extremely budget-friendly. Everything is walkable along the riverwalk.",
      },
    ],
    dining: [
      {
        name: "The Range Steakhouse (Harrah's)",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Best steakhouse in Laughlin — Harrah's in-house spot with river views and solid cuts",
        reservationNeeded: true,
      },
      {
        name: "Joe's Crab Shack",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Riverfront seafood with a loud, fun vibe — buckets of crab and cold beer",
        reservationNeeded: false,
      },
      {
        name: "The Gourmet Room (Don Laughlin's Riverside)",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Old-school fine dining in the original Laughlin casino — surprisingly good for a small town",
        reservationNeeded: true,
      },
      {
        name: "Pints Brewery & Sports Bar",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Local brewpub with house-made beers and pub food — good casual group dinner option",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Aquarius Casino Bar",
        vibe: "casino-bar",
        highlight:
          "Biggest casino floor in Laughlin with cheap drinks, live entertainment, and a lively crowd",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Losers Bar (Harrah's)",
        vibe: "dive",
        highlight:
          "No-frills casino bar with the cheapest drinks on the strip — embrace the name",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Splash Cabaret (Aquarius)",
        vibe: "casino-bar",
        highlight:
          "Late-night lounge with live music and entertainment — Laughlin's closest thing to a nightclub",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Casino Hopping on the Riverwalk",
        type: "casino",
        duration: "3-5 hours",
        pricePerPerson: [0, 300],
        groupFriendly: true,
        highlight:
          "Walk the mile-long riverwalk hitting Harrah's, Aquarius, Edgewater, and Don Laughlin's — cheap tables and free drinks",
        bestFor: "arrival day",
      },
      {
        name: "Jet Ski Rental on Colorado River",
        type: "water-sports",
        duration: "2-4 hours",
        pricePerPerson: [60, 120],
        groupFriendly: true,
        highlight:
          "Rip around the Colorado River between the casinos — surprisingly scenic canyon waters",
        bestFor: "rest day",
        provider: "Fun Country Marine",
      },
      {
        name: "Lake Mohave Kayaking",
        type: "kayaking",
        duration: "half day",
        pricePerPerson: [40, 80],
        groupFriendly: true,
        highlight:
          "Paddle through slot canyons on Lake Mohave — turquoise water and canyon walls",
        bestFor: "rest day",
        provider: "Desert River Outfitters",
      },
      {
        name: "Route 66 Day Trip to Oatman",
        type: "hiking",
        duration: "3-4 hours",
        pricePerPerson: [0, 20],
        groupFriendly: true,
        highlight:
          "Ghost town on old Route 66 with wild burros, saloons, and staged gunfights — 30 minutes from Laughlin",
        bestFor: "rest day",
      },
      {
        name: "Laughlin River Lodge Shooting Range",
        type: "shooting",
        duration: "2-3 hours",
        pricePerPerson: [30, 70],
        groupFriendly: true,
        highlight:
          "Desert shooting range near Bullhead City with pistol and rifle options",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 16],
        hourlyRate: [80, 175],
        providers: ["Laughlin Shuttle", "Las Vegas Limousine Service"],
        notes:
          "Laughlin is tiny and the casino strip is walkable. Main need is airport transfer from Vegas or a shuttle to courses. Rent a 15-passenger van for the trip.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [50, 115],
        providers: ["Take a Chef", "Cozymeal"],
        mealTypes: ["steak dinner", "BBQ cookout", "breakfast"],
        notes:
          "Very limited local chefs — most will come from Vegas or Phoenix. Casino dining is the easier path for group dinners.",
      },
    ],
  },

  // ─── Payson, AZ ─────────────────────────────────────────────────────
  {
    id: "payson-az",
    city: "Payson",
    state: "AZ",
    region: "Southwest",
    tagline: "Mountain escape golf 90 minutes north of Phoenix",
    description:
      "Payson sits at 5,000 feet under the Mogollon Rim, 20 degrees cooler than Phoenix in summer. Three excellent courses make it a legit golf destination, and the pine forests and mountain air feel like a different state. It is the anti-Scottsdale — small-town, laid-back, and built around the outdoors.",
    population: "small",
    nearestAirport: {
      code: "PHX",
      name: "Phoenix Sky Harbor International Airport",
      driveMinutes: 90,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "Payson Golf Club",
        tier: "solid",
        greenFeeRange: [45, 85],
        holes: 18,
        par: 71,
        yardage: 6483,
        slope: 131,
        rating: 70.5,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        highlight:
          "Public mountain course with ponderosa pines lining every fairway — gorgeous and affordable",
      },
      {
        name: "The Rim Golf Club",
        tier: "premium",
        greenFeeRange: [80, 150],
        holes: 18,
        par: 72,
        yardage: 7005,
        slope: 143,
        rating: 73.5,
        walkable: false,
        style: "mountain",
        driveMinutes: 10,
        highlight:
          "Tom Weiskopf design perched below the Mogollon Rim — dramatic elevation changes through pristine pine forest",
      },
      {
        name: "Chaparral Pines Golf Club",
        tier: "premium",
        greenFeeRange: [75, 140],
        holes: 18,
        par: 71,
        yardage: 6800,
        slope: 139,
        rating: 72.0,
        walkable: false,
        style: "mountain",
        driveMinutes: 10,
        highlight:
          "Semi-private David Graham & Gary Panks design through thick pine and juniper forest — a hidden gem",
      },
    ],
    lodging: [
      {
        type: "cabin",
        sleeps: [10, 16],
        nightlyRange: [350, 1200],
        amenities: [
          "hot tub",
          "fire pit",
          "pine forest setting",
          "game room",
          "BBQ grill",
        ],
        areaDescription:
          "Cabins in the pines east of town near Rim Club and Chaparral Pines",
        searchUrl:
          "https://www.vrbo.com/search?destination=Payson%2C+AZ&groupSize=16",
        notes:
          "Large pine-forest cabins are the play here. The mountain setting makes it feel like a retreat. Book early for summer when Phoenix residents flee the heat.",
      },
      {
        type: "lodge",
        sleeps: [8, 16],
        nightlyRange: [200, 600],
        amenities: [
          "restaurant on-site",
          "pool",
          "fire pit",
          "mountain views",
        ],
        areaDescription:
          "Mazatzal Hotel & Casino or local lodges along Highway 87",
        notes:
          "Mazatzal Casino has a hotel with a small casino and affordable rooms. Splitting lodge rooms works for smaller groups.",
      },
    ],
    dining: [
      {
        name: "Fargo's Steakhouse",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Payson's go-to steakhouse with a saloon vibe, big cuts, and a solid whiskey selection",
        reservationNeeded: true,
      },
      {
        name: "Macky's Grill",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Local favorite with burgers, ribs, and a sports bar atmosphere — perfect post-round spot",
        reservationNeeded: false,
      },
      {
        name: "La Sierra Mexican Restaurant",
        style: "mexican",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Family-run Mexican joint with massive portions and cold margaritas at small-town prices",
        reservationNeeded: false,
      },
      {
        name: "Buffalo Bar & Grill",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Smoked meats and cold beer in a no-frills mountain bar — exactly what you want after 36 holes",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Buffalo Bar & Grill",
        vibe: "saloon",
        highlight:
          "Classic Western bar with mounted game, pool tables, and a porch under the pines",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Mazatzal Casino Bar",
        vibe: "casino-bar",
        highlight:
          "Small tribal casino with cheap drinks, slots, and poker — the late-night option in Payson",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Olde Payson Pub",
        vibe: "dive",
        highlight:
          "No-frills local pub with darts, pool, and the kind of regulars who buy you a round",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Mogollon Rim Overlook Hike",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 0],
        groupFriendly: true,
        highlight:
          "Walk to the edge of the 2,000-foot Mogollon Rim for jaw-dropping views across the Tonto Basin",
        bestFor: "rest day",
      },
      {
        name: "Tonto Creek Fishing",
        type: "fishing",
        duration: "3-4 hours",
        pricePerPerson: [0, 40],
        groupFriendly: true,
        highlight:
          "Stocked trout creek running through pine forest — bring a rod or hire a local guide",
        bestFor: "morning before golf",
      },
      {
        name: "Mazatzal Casino",
        type: "casino",
        duration: "2-4 hours",
        pricePerPerson: [0, 200],
        groupFriendly: true,
        highlight:
          "Small Tonto Apache tribal casino with slots, poker, and table games",
        bestFor: "arrival day",
        provider: "Mazatzal Hotel & Casino",
      },
      {
        name: "Horseback Riding at Kohl's Ranch",
        type: "horseback",
        duration: "2-3 hours",
        pricePerPerson: [60, 120],
        groupFriendly: true,
        highlight:
          "Trail rides through ponderosa pine forest below the Mogollon Rim",
        bestFor: "rest day",
        provider: "Kohl's Ranch Lodge",
      },
      {
        name: "ATV Trails on the Rim",
        type: "atv",
        duration: "3-4 hours",
        pricePerPerson: [75, 150],
        groupFriendly: true,
        highlight:
          "Rent ATVs and rip through miles of forest trails in the Tonto National Forest",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 16],
        hourlyRate: [80, 175],
        providers: ["Payson Shuttle", "Rim Country Transit"],
        notes:
          "Payson is a small town — everything is 10 minutes apart. Rent a couple SUVs or a 15-passenger van. For the Phoenix airport transfer, book a shuttle in advance.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [55, 125],
        providers: ["Take a Chef", "Cozymeal"],
        mealTypes: ["steak dinner", "BBQ cookout", "mountain breakfast"],
        notes:
          "Limited local options — most chefs come from Phoenix. A cabin cookout with steaks on the grill under the pines is the ideal setup. Book well in advance.",
      },
    ],
  },
];
