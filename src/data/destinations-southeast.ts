import { Destination } from "./types";

export const southeastDestinations: Destination[] = [
  // ────────────────────────────────────────────────
  // 1. Pinehurst, NC
  // ────────────────────────────────────────────────
  {
    id: "pinehurst-nc",
    city: "Pinehurst",
    state: "NC",
    region: "Southeast",
    tagline: "The Cradle of American Golf",
    description:
      "Pinehurst is THE golf destination in America. With nine courses on the resort alone plus world-class daily-fee tracks like Tobacco Road and Mid Pines within minutes, a group of 12-16 can play a different course every day and never run out of elite options. The village is walkable, the vibe is pure golf, and the US Open keeps coming back for a reason.",
    population: "small",
    nearestAirport: {
      code: "RDU",
      name: "Raleigh-Durham International Airport",
      driveMinutes: 75,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Pinehurst No. 2",
        tier: "bucket-list",
        greenFeeRange: [395, 595],
        holes: 18,
        par: 72,
        yardage: 7588,
        slope: 137,
        rating: 76.1,
        walkable: true,
        style: "parkland",
        driveMinutes: 0,
        url: "https://www.pinehurst.com/golf/courses/no-2/",
        highlight:
          "Donald Ross masterpiece. Host of multiple US Opens. The crowned, turtle-back greens are the ultimate test.",
      },
      {
        name: "Pinehurst No. 4",
        tier: "premium",
        greenFeeRange: [225, 375],
        holes: 18,
        par: 72,
        yardage: 7117,
        slope: 138,
        rating: 74.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 0,
        url: "https://www.pinehurst.com/golf/courses/no-4/",
        highlight:
          "Gil Hanse redesign with sandy waste areas and wide fairways. Many say it rivals No. 2.",
      },
      {
        name: "Pinehurst No. 8",
        tier: "premium",
        greenFeeRange: [175, 295],
        holes: 18,
        par: 72,
        yardage: 7092,
        slope: 135,
        rating: 74.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 0,
        url: "https://www.pinehurst.com/golf/courses/no-8/",
        highlight:
          "Tom Fazio's Centennial course. Wide fairways, dramatic elevation changes, and pristine conditioning.",
      },
      {
        name: "Mid Pines Inn & Golf Club",
        tier: "premium",
        greenFeeRange: [150, 250],
        holes: 18,
        par: 72,
        yardage: 6515,
        slope: 130,
        rating: 72.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.midpinesinn.com/",
        highlight:
          "Donald Ross gem restored by Kyle Franz. Understated elegance, incredible green complexes, walkable perfection.",
      },
      {
        name: "Pine Needles Lodge & Golf Club",
        tier: "premium",
        greenFeeRange: [150, 275],
        holes: 18,
        par: 71,
        yardage: 7015,
        slope: 135,
        rating: 73.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.pineneedles-midpines.com/",
        highlight:
          "Host of multiple US Women's Opens. Another Ross classic with towering longleaf pines framing every hole.",
      },
      {
        name: "Tobacco Road Golf Club",
        tier: "premium",
        greenFeeRange: [100, 195],
        holes: 18,
        par: 71,
        yardage: 6554,
        slope: 150,
        rating: 73.2,
        walkable: false,
        style: "links",
        driveMinutes: 25,
        url: "https://www.tobaccoroadgolf.com/",
        highlight:
          "Mike Strantz's wild, love-it-or-hate-it masterpiece. Blind shots, massive dunes, and 150 slope. Unforgettable.",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [600, 1400],
        amenities: [
          "pool",
          "hot tub",
          "full kitchen",
          "multiple bedrooms",
          "golf cart parking",
        ],
        areaDescription: "Pinehurst Village & surrounding golf communities",
        searchUrl:
          "https://www.vrbo.com/search?destination=Pinehurst%2C+NC&adults=16",
        notes:
          "Book houses in Pinehurst Village or the resort communities. Many include golf cart access to courses. Book 3-6 months ahead for peak season.",
      },
      {
        type: "resort-house",
        sleeps: [8, 12],
        nightlyRange: [800, 2000],
        amenities: [
          "resort access",
          "spa access",
          "pool",
          "concierge",
          "shuttle to courses",
        ],
        areaDescription: "Pinehurst Resort condos and villas",
        searchUrl: "https://www.pinehurst.com/accommodations/",
        notes:
          "Resort condos and villas get you access to all resort amenities. May need two units for 12-16 but the convenience is unmatched.",
      },
    ],
    dining: [
      {
        name: "The Carolina Dining Room",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Pinehurst Resort's flagship. White-tablecloth Southern elegance with a jacket-suggested dress code.",
        reservationNeeded: true,
      },
      {
        name: "1895 Grille",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Resort steakhouse with a clubby atmosphere. Great for the big group dinner.",
        reservationNeeded: true,
      },
      {
        name: "Dugan's Pub",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Village pub with solid food and cold beer. The go-to casual spot after a round.",
        reservationNeeded: false,
      },
      {
        name: "The Drum",
        style: "bbq",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Craft cocktails and wood-fired fare in a laid-back setting. Best cocktail bar in the village.",
        reservationNeeded: false,
      },
      {
        name: "Theo's Taverna",
        style: "italian",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Mediterranean-influenced spot in the village. Unexpectedly great pasta and seafood.",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Dugan's Pub",
        vibe: "sports-bar",
        highlight:
          "The village watering hole. Every golf trip ends up here at some point.",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Ryder Cup Lounge",
        vibe: "cocktail",
        highlight:
          "Inside the Carolina Hotel. Old-school cocktails surrounded by golf history.",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Drum",
        vibe: "cocktail",
        highlight:
          "Best craft cocktails in the Sandhills. Lively atmosphere on weekends.",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Pinehurst Brewing Company",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [10, 30],
        groupFriendly: true,
        highlight:
          "Local craft brewery right in the village. Great spot for a rest day afternoon.",
        bestFor: "rest day",
      },
      {
        name: "Sandhills Sporting Clays",
        type: "shooting",
        duration: "2-3 hours",
        pricePerPerson: [45, 75],
        groupFriendly: true,
        highlight:
          "14-station sporting clays course plus five-stand. Guns and ammo available to rent.",
        bestFor: "rest day",
      },
      {
        name: "Pinehurst Spa",
        type: "spa",
        duration: "2-3 hours",
        pricePerPerson: [100, 250],
        groupFriendly: true,
        highlight:
          "Full-service spa at the resort. Book deep tissue after walking No. 2.",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [150, 250],
        providers: [
          "Sandhills Limo & Shuttle",
          "Diamond Limousine",
          "Carolina Luxury Transportation",
        ],
        notes:
          "Sprinter vans work best for shuttling between village lodging and courses. Most courses are within 30 minutes.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 125],
        providers: [
          "Take It From Here Chef Services",
          "Sandhills Private Dining",
        ],
        mealTypes: [
          "steak dinner",
          "Southern BBQ cookout",
          "breakfast spread",
          "lowcountry boil",
        ],
        notes:
          "Private chefs are common for golf groups in Pinehurst. Book at least 2 weeks out for peak season.",
      },
    ],
  },

  // ────────────────────────────────────────────────
  // 2. Kiawah Island, SC
  // ────────────────────────────────────────────────
  {
    id: "kiawah-island-sc",
    city: "Kiawah Island",
    state: "SC",
    region: "Southeast",
    tagline: "Where the Ocean Course meets the Atlantic",
    description:
      "Kiawah Island is the ultimate beach-and-golf combo. The Ocean Course, perennially ranked top-10 in the world and host of the 2021 PGA Championship, is the headliner, but four other resort courses offer variety for every handicap. Rent a massive beach house, play world-class golf by day, and listen to the waves at night.",
    population: "tiny",
    nearestAirport: {
      code: "CHS",
      name: "Charleston International Airport",
      driveMinutes: 45,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "The Ocean Course",
        tier: "bucket-list",
        greenFeeRange: [350, 500],
        holes: 18,
        par: 72,
        yardage: 7356,
        slope: 144,
        rating: 77.2,
        walkable: true,
        style: "links",
        driveMinutes: 5,
        url: "https://kiawahresort.com/golf/the-ocean-course/",
        highlight:
          "Every hole has an ocean view. Host of the 1991 Ryder Cup War by the Shore and 2012/2021 PGA Championships. Bucket list.",
      },
      {
        name: "Osprey Point",
        tier: "premium",
        greenFeeRange: [150, 275],
        holes: 18,
        par: 72,
        yardage: 6932,
        slope: 131,
        rating: 73.2,
        walkable: false,
        style: "parkland",
        driveMinutes: 5,
        url: "https://kiawahresort.com/golf/osprey-point/",
        highlight:
          "Tom Fazio design winding through lakes, oaks, and marshland. Most forgiving of the five courses.",
      },
      {
        name: "Turtle Point",
        tier: "premium",
        greenFeeRange: [150, 275],
        holes: 18,
        par: 72,
        yardage: 7054,
        slope: 136,
        rating: 73.9,
        walkable: false,
        style: "coastal",
        driveMinutes: 5,
        url: "https://kiawahresort.com/golf/turtle-point/",
        highlight:
          "Jack Nicklaus design with three holes along the Atlantic. Recently renovated with stunning ocean views.",
      },
      {
        name: "Cougar Point",
        tier: "solid",
        greenFeeRange: [125, 225],
        holes: 18,
        par: 72,
        yardage: 6861,
        slope: 129,
        rating: 72.6,
        walkable: false,
        style: "coastal",
        driveMinutes: 5,
        url: "https://kiawahresort.com/golf/cougar-point/",
        highlight:
          "Gary Player redesign hugging the Kiawah River. Beautiful marsh views and excellent conditioning.",
      },
      {
        name: "Oak Point",
        tier: "solid",
        greenFeeRange: [100, 175],
        holes: 18,
        par: 72,
        yardage: 6759,
        slope: 127,
        rating: 72.0,
        walkable: false,
        style: "parkland",
        driveMinutes: 10,
        url: "https://kiawahresort.com/golf/oak-point/",
        highlight:
          "Clyde Johnston design just off-island. Great value play with Kiawah-caliber conditioning at lower rates.",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [1200, 4000],
        amenities: [
          "ocean view",
          "private pool",
          "hot tub",
          "full kitchen",
          "multiple master suites",
          "beach access",
        ],
        areaDescription: "Kiawah Island beachfront and golf-course communities",
        searchUrl: "https://www.kiawahisland.com/vacation-rentals",
        notes:
          "Large beach houses on Kiawah are the move. 6-8 bedroom homes available for big groups. Book 4-6 months out for spring and fall.",
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [800, 2500],
        amenities: [
          "pool",
          "full kitchen",
          "golf course views",
          "gated community",
          "bike access",
        ],
        areaDescription:
          "Seabrook Island (adjacent island, 5 min from Kiawah)",
        searchUrl:
          "https://www.vrbo.com/search?destination=Seabrook+Island%2C+SC&adults=16",
        notes:
          "Seabrook Island homes offer similar quality at lower prices. Quick drive to Kiawah courses.",
      },
    ],
    dining: [
      {
        name: "The Atlantic Room",
        style: "seafood",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Ocean Course clubhouse restaurant. Fine dining with panoramic Atlantic views. The splurge dinner.",
        reservationNeeded: true,
      },
      {
        name: "Tomasso",
        style: "italian",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Upscale Italian at the Sanctuary Hotel. Handmade pastas, great wine list.",
        reservationNeeded: true,
      },
      {
        name: "The Ryder Cup Bar",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Ocean Course 19th hole. Burgers, sandwiches, and cold beer after your round with ocean views.",
        reservationNeeded: false,
      },
      {
        name: "Husk",
        style: "southern",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Sean Brock's farm-to-table Southern icon in downtown Charleston. Worth the 45-minute drive for one big dinner.",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "The Ryder Cup Bar",
        vibe: "patio",
        highlight:
          "Post-round beers overlooking the 18th of the Ocean Course and the Atlantic. Doesn't get better.",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "The Loggerhead Bar",
        vibe: "cocktail",
        highlight:
          "Sanctuary Hotel lobby bar. Craft cocktails in a sophisticated beach resort setting.",
        lateNight: false,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Kiawah Island Kayak & Paddleboard",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [50, 85],
        groupFriendly: true,
        highlight:
          "Guided kayak tours through salt marshes. Dolphins, birds, and stunning lowcountry scenery.",
        bestFor: "rest day",
      },
      {
        name: "Bohicket Marina Fishing Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [125, 250],
        groupFriendly: true,
        highlight:
          "Inshore and offshore charters out of Bohicket Marina. Redfish, flounder, and shark.",
        bestFor: "rest day",
        provider: "Bohicket Charters",
      },
      {
        name: "Kiawah Beach Bike Tour",
        type: "mountain-biking",
        duration: "2-3 hours",
        pricePerPerson: [25, 45],
        groupFriendly: true,
        highlight:
          "30+ miles of paved bike trails across the island. Rent bikes and explore at your own pace.",
        bestFor: "morning before golf",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [175, 300],
        providers: [
          "Charleston Black Cab",
          "Charleston Style Limo",
          "Lowcountry Valet & Shuttle",
        ],
        notes:
          "Sprinter vans for airport transfers and nights out in Charleston. Book early for peak season.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 150],
        providers: [
          "Charleston Chef Services",
          "Lowcountry Private Chefs",
          "CozyMeal Charleston",
        ],
        mealTypes: [
          "lowcountry boil",
          "shrimp and grits dinner",
          "steak dinner",
          "oyster roast",
          "Southern brunch",
        ],
        notes:
          "A private lowcountry boil on the deck of your beach house is a must. Charleston has a deep chef pool.",
      },
    ],
  },

  // ────────────────────────────────────────────────
  // 3. Hilton Head, SC
  // ────────────────────────────────────────────────
  {
    id: "hilton-head-sc",
    city: "Hilton Head",
    state: "SC",
    region: "Southeast",
    tagline: "Island golf with a side of beach bars",
    description:
      "Hilton Head packs more golf per square mile than almost anywhere in the country. Harbour Town is the crown jewel -- home of the RBC Heritage each spring with its iconic lighthouse finish -- but the island has 20+ courses ranging from bucket-list to budget. Add world-class beaches, a killer restaurant scene, and a laid-back vibe, and you've got a trip that keeps everyone happy.",
    population: "small",
    nearestAirport: {
      code: "HHH",
      name: "Hilton Head Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Harbour Town Golf Links",
        tier: "bucket-list",
        greenFeeRange: [300, 450],
        holes: 18,
        par: 71,
        yardage: 7099,
        slope: 136,
        rating: 74.4,
        walkable: true,
        style: "coastal",
        driveMinutes: 10,
        url: "https://www.seapines.com/golf/harbour-town-golf-links/",
        highlight:
          "Pete Dye and Jack Nicklaus co-design. Home of the RBC Heritage. The lighthouse behind 18 is one of golf's most iconic images.",
      },
      {
        name: "Heron Point by Pete Dye",
        tier: "premium",
        greenFeeRange: [150, 275],
        holes: 18,
        par: 72,
        yardage: 7017,
        slope: 140,
        rating: 74.2,
        walkable: false,
        style: "coastal",
        driveMinutes: 10,
        url: "https://www.seapines.com/golf/heron-point/",
        highlight:
          "Another Pete Dye gem at Sea Pines. Tight, challenging, and winding through lagoons and live oaks.",
      },
      {
        name: "Atlantic Dunes by Davis Love III",
        tier: "premium",
        greenFeeRange: [125, 225],
        holes: 18,
        par: 72,
        yardage: 6841,
        slope: 131,
        rating: 72.9,
        walkable: false,
        style: "coastal",
        driveMinutes: 10,
        url: "https://www.seapines.com/golf/atlantic-dunes/",
        highlight:
          "Davis Love III redesign with ocean breezes and sandy waste areas. Sea Pines' most fun layout.",
      },
      {
        name: "Palmetto Dunes - Robert Trent Jones Course",
        tier: "premium",
        greenFeeRange: [120, 210],
        holes: 18,
        par: 72,
        yardage: 7005,
        slope: 132,
        rating: 73.4,
        walkable: false,
        style: "resort",
        driveMinutes: 8,
        url: "https://www.palmettodunes.com/golf/rtj-course/",
        highlight:
          "Classic RTJ design with wide fairways, big greens, and lagoons on 11 holes. Great resort course.",
      },
      {
        name: "Palmetto Dunes - Arthur Hills Course",
        tier: "solid",
        greenFeeRange: [100, 180],
        holes: 18,
        par: 72,
        yardage: 6651,
        slope: 127,
        rating: 71.8,
        walkable: false,
        style: "resort",
        driveMinutes: 8,
        url: "https://www.palmettodunes.com/golf/arthur-hills-course/",
        highlight:
          "Smaller greens and tighter fairways than its RTJ neighbor. A thinking player's course.",
      },
      {
        name: "Palmetto Hall - Arthur Hills",
        tier: "solid",
        greenFeeRange: [80, 150],
        holes: 18,
        par: 72,
        yardage: 6918,
        slope: 132,
        rating: 73.2,
        walkable: false,
        style: "parkland",
        driveMinutes: 12,
        url: "https://www.palmettohallgolf.com/",
        highlight:
          "Excellent value with top-notch conditioning. The island's best-kept secret.",
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
          "beach access",
          "full kitchen",
          "multiple master suites",
          "bike rentals",
        ],
        areaDescription: "Sea Pines Resort and Palmetto Dunes",
        searchUrl:
          "https://www.vrbo.com/search?destination=Hilton+Head+Island%2C+SC&adults=16",
        notes:
          "Sea Pines has the best location (walking distance to Harbour Town). Palmetto Dunes is more affordable. Both are gated resort communities.",
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [600, 1800],
        amenities: [
          "pool",
          "full kitchen",
          "golf cart",
          "tennis courts",
          "beach shuttle",
        ],
        areaDescription: "Shipyard and Port Royal plantations",
        searchUrl:
          "https://www.airbnb.com/s/Hilton-Head-Island--SC/homes?adults=16",
        notes:
          "Shipyard and Port Royal are mid-island with good access to everything. Slightly lower prices than Sea Pines.",
      },
    ],
    dining: [
      {
        name: "Michael Anthony's Cucina Italiana",
        style: "italian",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Best restaurant on the island, period. House-made pastas, incredible wine cellar. Book the private room for 16.",
        reservationNeeded: true,
      },
      {
        name: "Hudson's Seafood House on the Docks",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Waterfront institution since 1967. Fresh-off-the-boat seafood with sunset views over the marsh.",
        reservationNeeded: true,
      },
      {
        name: "One Hot Mama's",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Award-winning ribs and wings in a rowdy, fun atmosphere. Perfect for a group of 16.",
        reservationNeeded: false,
      },
      {
        name: "Lucky Rooster Kitchen + Bar",
        style: "southern",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Southern comfort food elevated. Fried chicken, shrimp and grits, and an excellent bourbon list.",
        reservationNeeded: true,
      },
      {
        name: "Skull Creek Boathouse",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Waterfront seafood with the best sunset on the island. Get the raw bar and a bucket of beers.",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "The Salty Dog Cafe",
        vibe: "patio",
        highlight:
          "Iconic Hilton Head spot in South Beach Marina. Grab the t-shirt, it's the law.",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Tiki Hut",
        vibe: "tiki",
        highlight:
          "Beach bar at Palmetto Dunes. Frozen drinks, live music, sand between your toes.",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "One Hot Mama's",
        vibe: "sports-bar",
        highlight:
          "Great late-night spot with TVs, pool tables, and strong drinks. Gets rowdy after 10pm.",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "The Jazz Corner",
        vibe: "cocktail",
        highlight:
          "Live jazz every night. Upscale cocktails and a sophisticated vibe for the one classy evening.",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Hilton Head Island Fishing Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [100, 200],
        groupFriendly: true,
        highlight:
          "Inshore charters for redfish, trout, and flounder in the marshes. Multiple boats for big groups.",
        bestFor: "rest day",
        provider: "Outcast Sport Fishing",
      },
      {
        name: "Harbour Town Yacht Basin Boat Rental",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [75, 150],
        groupFriendly: true,
        highlight:
          "Rent a pontoon or deck boat and cruise the Calibogue Sound. Bring your own cooler.",
        bestFor: "rest day",
      },
      {
        name: "Hilton Head Brewing Company",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [15, 35],
        groupFriendly: true,
        highlight:
          "Island brewery with a tasting room and outdoor patio. Great post-golf stop.",
        bestFor: "arrival day",
      },
      {
        name: "Hilton Head Kayak Tours",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [45, 75],
        groupFriendly: true,
        highlight:
          "Guided kayak tours through the salt marshes. Dolphin sightings nearly guaranteed.",
        bestFor: "morning before golf",
      },
    ],
    partyBuses: [
      {
        type: "trolley",
        capacity: [14, 22],
        hourlyRate: [200, 350],
        providers: [
          "Island Limo & Tours",
          "Low Country Shuttle",
          "Hilton Head Island Shuttle",
        ],
        notes:
          "Trolley-style shuttles are popular for bar-hopping on the island. Most courses offer shuttle service for resort guests.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 130],
        providers: [
          "Lowcountry Private Chefs",
          "CozyMeal Hilton Head",
          "Hilton Head Private Dining",
        ],
        mealTypes: [
          "lowcountry boil",
          "seafood feast",
          "steak dinner",
          "oyster roast",
          "Southern brunch",
        ],
        notes:
          "An oyster roast or lowcountry boil on the back porch of your beach house is a must-do. Book 2+ weeks out.",
      },
    ],
  },

  // ────────────────────────────────────────────────
  // 4. Reynolds Lake Oconee, GA
  // ────────────────────────────────────────────────
  {
    id: "reynolds-lake-oconee-ga",
    city: "Greensboro",
    state: "GA",
    region: "Southeast",
    tagline: "Six courses, one lake, zero distractions",
    description:
      "Reynolds Lake Oconee is a private-club paradise that opens its gates to resort guests. Six championship courses by Nicklaus, Fazio, Engh, Watson, and Cupp spread across 10,000 acres of Georgia pines and Lake Oconee shoreline. Rent a massive lake house, play 36 a day, boat in between, and never leave the property. It's the ultimate guys' trip compound.",
    population: "tiny",
    nearestAirport: {
      code: "ATL",
      name: "Hartsfield-Jackson Atlanta International Airport",
      driveMinutes: 90,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Great Waters",
        tier: "bucket-list",
        greenFeeRange: [225, 350],
        holes: 18,
        par: 72,
        yardage: 7048,
        slope: 142,
        rating: 74.6,
        walkable: false,
        style: "parkland",
        driveMinutes: 0,
        url: "https://www.reynoldslakeoconee.com/golf/great-waters",
        highlight:
          "Jack Nicklaus design with nine holes along Lake Oconee. Recently renovated, top-100 caliber. The signature course.",
      },
      {
        name: "The Oconee",
        tier: "premium",
        greenFeeRange: [175, 275],
        holes: 18,
        par: 72,
        yardage: 7029,
        slope: 138,
        rating: 74.0,
        walkable: false,
        style: "parkland",
        driveMinutes: 0,
        url: "https://www.reynoldslakeoconee.com/golf/the-oconee",
        highlight:
          "Rees Jones design at The Ritz-Carlton. Dramatic elevation changes and lake views throughout.",
      },
      {
        name: "The Landing",
        tier: "premium",
        greenFeeRange: [150, 250],
        holes: 18,
        par: 72,
        yardage: 6900,
        slope: 135,
        rating: 73.5,
        walkable: false,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.reynoldslakeoconee.com/golf/the-landing",
        highlight:
          "Bob Cupp design winding through hardwoods. Tight, strategic, and beautifully conditioned.",
      },
      {
        name: "The National",
        tier: "premium",
        greenFeeRange: [150, 250],
        holes: 18,
        par: 72,
        yardage: 7015,
        slope: 140,
        rating: 74.2,
        walkable: false,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.reynoldslakeoconee.com/golf/the-national",
        highlight:
          "Tom Fazio design. Wide fairways but devious greens. The most playable of the six for higher handicaps.",
      },
      {
        name: "Creek Club",
        tier: "premium",
        greenFeeRange: [175, 275],
        holes: 18,
        par: 72,
        yardage: 7043,
        slope: 139,
        rating: 74.1,
        walkable: false,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.reynoldslakeoconee.com/golf/creek-club",
        highlight:
          "Jim Engh design -- the wildest of the six. Huge elevation changes, creative bunkering, and surprise views.",
      },
      {
        name: "The Preserve",
        tier: "solid",
        greenFeeRange: [100, 175],
        holes: 18,
        par: 72,
        yardage: 6698,
        slope: 132,
        rating: 72.2,
        walkable: false,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.reynoldslakeoconee.com/golf/the-preserve",
        highlight:
          "Bob Cupp design through pine forests. Shortest of the six and the best warm-up round.",
      },
    ],
    lodging: [
      {
        type: "lakehouse",
        sleeps: [12, 20],
        nightlyRange: [1000, 3500],
        amenities: [
          "private dock",
          "boat slip",
          "pool",
          "hot tub",
          "full kitchen",
          "multiple master suites",
          "lake views",
        ],
        areaDescription:
          "Reynolds Lake Oconee gated communities along the lake",
        searchUrl:
          "https://www.vrbo.com/search?destination=Greensboro%2C+GA&adults=16",
        notes:
          "Lake houses with private docks are the way to go. Many include boat slips. The bigger homes on the water book fast -- reserve 3-6 months ahead.",
      },
      {
        type: "resort-house",
        sleeps: [8, 12],
        nightlyRange: [600, 1500],
        amenities: [
          "Ritz-Carlton access",
          "spa",
          "pool",
          "concierge",
          "golf cart",
        ],
        areaDescription: "Ritz-Carlton Reynolds, Lake Oconee",
        searchUrl:
          "https://www.ritzcarlton.com/en/hotels/ahsro-the-ritz-carlton-reynolds-lake-oconee/",
        notes:
          "The Ritz is on-property and can handle large groups across multiple rooms. Gets expensive but the service is unmatched.",
      },
    ],
    dining: [
      {
        name: "Linger Longer Steakhouse",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "The Ritz's flagship restaurant. Dry-aged steaks, lake views, and an excellent bourbon selection.",
        reservationNeeded: true,
      },
      {
        name: "Georgia's Bistro",
        style: "southern",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Casual Southern fare at the Ritz. Great burgers, salads, and outdoor seating overlooking the lake.",
        reservationNeeded: false,
      },
      {
        name: "The Gaby Brasserie",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "French-inspired bistro at the Ritz. A nice change of pace from Southern food.",
        reservationNeeded: true,
      },
      {
        name: "Yesterday Cafe",
        style: "southern",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Greensboro institution. Massive portions of home-cooked Southern food. Breakfast here is mandatory.",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Linger Longer Lounge",
        vibe: "whiskey-bar",
        highlight:
          "Ritz-Carlton bar with deep bourbon and whiskey selection. Leather chairs, lake views, cigars on the patio.",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "The Clubhouse Bars",
        vibe: "patio",
        highlight:
          "Each course clubhouse has a solid 19th hole. Great Waters' is the best of the bunch.",
        lateNight: false,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Lake Oconee Boat Rental",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [60, 120],
        groupFriendly: true,
        highlight:
          "Rent a pontoon or ski boat and cruise the 19,000-acre lake. Bring a cooler and speakers.",
        bestFor: "rest day",
        provider: "Lake Oconee Boat Rentals",
      },
      {
        name: "Lake Oconee Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [100, 200],
        groupFriendly: true,
        highlight:
          "Largemouth bass fishing on Lake Oconee. Guided trips or fish off your dock.",
        bestFor: "morning before golf",
        provider: "Oconee Guide Service",
      },
      {
        name: "Ritz-Carlton Spa",
        type: "spa",
        duration: "2-3 hours",
        pricePerPerson: [125, 275],
        groupFriendly: true,
        highlight:
          "Full-service spa at the Ritz. Indoor/outdoor pools, steam rooms, and lakeside treatment rooms.",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [150, 250],
        providers: [
          "Lake Country Limo",
          "Athens Limo Service",
          "Atlanta Sprinter Rentals",
        ],
        notes:
          "Most groups rent golf carts on-property and don't need transport within Reynolds. Sprinter for ATL airport runs.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 140],
        providers: [
          "Lake Oconee Private Chefs",
          "CozyMeal Atlanta",
          "ATL Personal Chef Services",
        ],
        mealTypes: [
          "steak dinner",
          "Southern BBQ cookout",
          "fish fry",
          "breakfast spread",
          "oyster roast",
        ],
        notes:
          "Private chef cooking at your lake house is the Reynolds move. Many chefs drive from Atlanta. Book 2-3 weeks out.",
      },
    ],
  },

  // ────────────────────────────────────────────────
  // 5. Gulf Shores, AL
  // ────────────────────────────────────────────────
  {
    id: "gulf-shores-al",
    city: "Gulf Shores",
    state: "AL",
    region: "Southeast",
    tagline: "Beach golf on a budget",
    description:
      "Gulf Shores and Orange Beach deliver a legit golf trip at half the price of the Carolinas. Kiva Dunes is the headliner -- a Jerry Pate design ranked among Alabama's best -- and several other solid courses round out a 3-4 day trip. The beaches are sugar-white, the seafood is fresh off the boat, and the bars don't quit. Perfect for the group that wants golf, beach, and nightlife without breaking the bank.",
    population: "small",
    nearestAirport: {
      code: "PNS",
      name: "Pensacola International Airport",
      driveMinutes: 30,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Kiva Dunes Golf Course",
        tier: "premium",
        greenFeeRange: [85, 145],
        holes: 18,
        par: 72,
        yardage: 7092,
        slope: 134,
        rating: 74.0,
        walkable: true,
        style: "links",
        driveMinutes: 10,
        url: "https://www.kivadunes.com/golf/",
        highlight:
          "Jerry Pate links-style design right on the Gulf. Ranked #1 public course in Alabama. Dunes, wind, and ocean views.",
      },
      {
        name: "Craft Farms - Cotton Creek",
        tier: "solid",
        greenFeeRange: [60, 110],
        holes: 18,
        par: 72,
        yardage: 7028,
        slope: 131,
        rating: 73.5,
        walkable: false,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.craftfarms.com/golf/cotton-creek/",
        highlight:
          "Arnold Palmer design with wide fairways and generous greens. The most forgiving of the area courses.",
      },
      {
        name: "Craft Farms - Cypress Bend",
        tier: "solid",
        greenFeeRange: [60, 110],
        holes: 18,
        par: 72,
        yardage: 6946,
        slope: 133,
        rating: 73.2,
        walkable: false,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.craftfarms.com/golf/cypress-bend/",
        highlight:
          "Tighter and more demanding than its Cotton Creek sibling. Water on 15 holes keeps you honest.",
      },
      {
        name: "Peninsula Golf & Racquet Club",
        tier: "solid",
        greenFeeRange: [55, 100],
        holes: 27,
        par: 72,
        yardage: 6849,
        slope: 128,
        rating: 72.4,
        walkable: false,
        style: "resort",
        driveMinutes: 8,
        url: "https://www.peninsulagolfclub.com/",
        highlight:
          "Earl Stone design with 27 holes in three 9-hole loops. Marshes, lakes, and great value.",
      },
      {
        name: "Glenlakes Golf Club",
        tier: "solid",
        greenFeeRange: [50, 90],
        holes: 18,
        par: 72,
        yardage: 6954,
        slope: 130,
        rating: 73.0,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.glenlakesgolf.com/",
        highlight:
          "Bruce Devlin design north of town. Consistently well-maintained and the best pure value in the area.",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [400, 1200],
        amenities: [
          "private pool",
          "hot tub",
          "beachfront",
          "full kitchen",
          "multiple bedrooms",
          "balcony",
        ],
        areaDescription: "Gulf Shores and Orange Beach beachfront",
        searchUrl:
          "https://www.vrbo.com/search?destination=Gulf+Shores%2C+AL&adults=16",
        notes:
          "Beach houses and large condos are abundant and affordable compared to the Carolinas. Beachfront houses for 16 are very doable under $1000/night.",
      },
    ],
    dining: [
      {
        name: "Fisher's at Orange Beach Marina",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Upscale seafood with marina views. Best fine-dining seafood in the area.",
        reservationNeeded: true,
      },
      {
        name: "The Gulf",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Shipping-container restaurant right on the beach. Fresh seafood, craft cocktails, and the best sunset spot.",
        reservationNeeded: false,
      },
      {
        name: "LuLu's",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Lucy Buffett's (Jimmy's sister) waterfront spot. Massive, lively, and built for groups. Get the Cheeseburger in Paradise.",
        reservationNeeded: false,
      },
      {
        name: "Cobalt The Restaurant",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Elevated coastal cuisine at the Perdido Beach Resort. Panoramic Gulf views and creative cocktails.",
        reservationNeeded: true,
      },
      {
        name: "Original Oyster House",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "A Gulf Shores institution on the bayou. Oysters every way, fried seafood platters, and sweet tea.",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Flora-Bama",
        vibe: "dive",
        highlight:
          "Legendary roadside honky-tonk straddling the AL/FL line. Multiple stages, bushwackers, and pure chaos. A must.",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "The Hangout",
        vibe: "sports-bar",
        highlight:
          "Beachfront bar and restaurant with live music, games, and a massive patio. Family-friendly until it's not.",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Tacky Jacks",
        vibe: "patio",
        highlight:
          "Waterfront bar on the back bay. Frozen drinks, live music, and a laid-back vibe.",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "The Flying Harpoon",
        vibe: "sports-bar",
        highlight:
          "Orange Beach sports bar with craft beer, bar games, and late-night karaoke. Gets rowdy.",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Gulf Shores Deep Sea Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [100, 200],
        groupFriendly: true,
        highlight:
          "Charter boats out of Orange Beach Marina. Red snapper, amberjack, and grouper. Split into multiple boats for 16.",
        bestFor: "rest day",
        provider: "Distraction Charters",
      },
      {
        name: "Jet Ski Rental",
        type: "water-sports",
        duration: "2-3 hours",
        pricePerPerson: [75, 150],
        groupFriendly: true,
        highlight:
          "Jet ski rentals along the beach. Race your buddies on the Gulf.",
        bestFor: "rest day",
      },
      {
        name: "Big Beach Brewing Company",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [10, 30],
        groupFriendly: true,
        highlight:
          "Gulf Shores' best craft brewery. Great beer, food trucks, and a dog-friendly patio.",
        bestFor: "arrival day",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 24],
        hourlyRate: [150, 275],
        providers: [
          "Beach Express Shuttle",
          "Gulf Coast Party Bus",
          "Coastal Limo & Shuttle",
        ],
        notes:
          "Party buses are popular for the Flora-Bama run. Also useful for PNS airport pickup.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [50, 100],
        providers: [
          "Gulf Coast Private Chefs",
          "CozyMeal Gulf Shores",
          "Beach House Chef Services",
        ],
        mealTypes: [
          "seafood boil",
          "fish fry",
          "BBQ cookout",
          "steak dinner",
          "breakfast spread",
        ],
        notes:
          "Great value for private chef services. A seafood boil on the deck of your beach house is a no-brainer.",
      },
    ],
  },

  // ────────────────────────────────────────────────
  // 6. Savannah, GA
  // ────────────────────────────────────────────────
  {
    id: "savannah-ga",
    city: "Savannah",
    state: "GA",
    region: "Southeast",
    tagline: "The best food scene in the South, plus golf",
    description:
      "Savannah isn't a golf-first destination, but it's a trip-first destination. The courses are solid, the food scene is the best in the South, the historic district is walkable and stunning, and the open-container laws mean you can walk around with a cocktail. For the group that wants incredible dinners, late nights on River Street, and a few rounds of golf mixed in, Savannah is the call.",
    population: "medium",
    nearestAirport: {
      code: "SAV",
      name: "Savannah/Hilton Head International Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "The Club at Savannah Harbor",
        tier: "premium",
        greenFeeRange: [100, 185],
        holes: 18,
        par: 72,
        yardage: 7288,
        slope: 135,
        rating: 74.8,
        walkable: false,
        style: "coastal",
        driveMinutes: 10,
        url: "https://www.theclubatsavannahharbor.com/",
        highlight:
          "Robert Cupp and Sam Snead design on Hutchinson Island. Marsh and river views, formerly hosted a PGA Tour event.",
      },
      {
        name: "Savannah Quarters Country Club",
        tier: "solid",
        greenFeeRange: [65, 110],
        holes: 18,
        par: 72,
        yardage: 7070,
        slope: 132,
        rating: 73.5,
        walkable: false,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.savannahquarters.com/",
        highlight:
          "Greg Norman design in Pooler. Well-maintained, generous fairways, and excellent value.",
      },
      {
        name: "Crosswinds Golf Club",
        tier: "solid",
        greenFeeRange: [40, 75],
        holes: 18,
        par: 72,
        yardage: 6800,
        slope: 126,
        rating: 71.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        url: "https://crosswindsgolf.com/",
        highlight:
          "Municipal course punching above its weight. Best pure value in the Savannah area.",
      },
      {
        name: "Henderson Golf Club",
        tier: "solid",
        greenFeeRange: [45, 85],
        holes: 18,
        par: 72,
        yardage: 6707,
        slope: 129,
        rating: 72.0,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        highlight:
          "Mike Young design with rolling terrain and mature trees. Solid daily-fee option.",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [800, 2500],
        amenities: [
          "historic charm",
          "full kitchen",
          "courtyard",
          "walkable to River Street",
          "multiple floors",
        ],
        areaDescription: "Savannah Historic District",
        searchUrl:
          "https://www.vrbo.com/search?destination=Savannah%2C+GA&adults=16",
        notes:
          "Historic row houses in the district are the move. You can walk to every bar and restaurant. Book 2-3 months out for spring.",
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [500, 1500],
        amenities: [
          "pool",
          "full kitchen",
          "parking",
          "quiet neighborhood",
          "short drive to downtown",
        ],
        areaDescription: "Savannah suburbs (Pooler, Wilmington Island)",
        searchUrl:
          "https://www.airbnb.com/s/Savannah--GA/homes?adults=16",
        notes:
          "Suburban homes are much cheaper and have pools/parking. 15-20 minute drive to downtown. Need transport.",
      },
    ],
    dining: [
      {
        name: "The Grey",
        style: "southern",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Mashama Bailey's masterpiece in a restored Greyhound station. James Beard Award winner. The best restaurant in Savannah.",
        reservationNeeded: true,
      },
      {
        name: "Elizabeth on 37th",
        style: "southern",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Elegant Southern cuisine in a historic mansion. White-tablecloth perfection for the big splurge dinner.",
        reservationNeeded: true,
      },
      {
        name: "Mrs. Wilkes' Dining Room",
        style: "southern",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Communal tables, all-you-can-eat fried chicken, collards, and sweet tea. Line up early. A Savannah institution.",
        reservationNeeded: false,
      },
      {
        name: "The Olde Pink House",
        style: "southern",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "18th-century mansion with Southern classics done right. Crispy flounder, she-crab soup, and live piano downstairs.",
        reservationNeeded: true,
      },
      {
        name: "Husk Savannah",
        style: "southern",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Sean Brock's farm-to-table concept in a historic building. Seasonal menu that changes daily.",
        reservationNeeded: true,
      },
      {
        name: "Zunzi's",
        style: "casual",
        priceRange: "$",
        capacity: "medium",
        highlight:
          "South African-Italian sandwich shop. The Conquistador is the best sandwich you'll ever eat. No debate.",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Artillery",
        vibe: "cocktail",
        highlight:
          "Craft cocktail bar in a former armory. Best cocktails in Savannah, full stop.",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Pinkie Master's",
        vibe: "dive",
        highlight:
          "Legendary Savannah dive bar. Cheap drinks, great jukebox, and pure locals' vibes.",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Treylor Park",
        vibe: "patio",
        highlight:
          "Funky bar with creative drinks and bar food. Great outdoor patio for warm nights.",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "River Street bars (various)",
        vibe: "sports-bar",
        highlight:
          "River Street is a strip of bars along the waterfront. Touristy but fun for a pub crawl. Open containers legal.",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Alley Cat Lounge",
        vibe: "cocktail",
        highlight:
          "Speakeasy-style bar down an alley. Inventive cocktails and a moody, intimate vibe.",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Savannah Riverboat Cruises",
        type: "boat-rental",
        duration: "2-3 hours",
        pricePerPerson: [40, 75],
        groupFriendly: true,
        highlight:
          "Dinner or cocktail cruise on the Savannah River. Great group activity for an evening off.",
        bestFor: "rest day",
        provider: "Savannah Riverboat Cruises",
      },
      {
        name: "Savannah Brewery Crawl",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [15, 40],
        groupFriendly: true,
        highlight:
          "Hit Service Brewing, Two Tides, Southbound, and Moon River in a walkable loop. Open containers help.",
        bestFor: "arrival day",
      },
      {
        name: "Tybee Island Fishing Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [100, 200],
        groupFriendly: true,
        highlight:
          "Inshore and offshore charters out of Tybee Island, 25 minutes from downtown. Redfish, flounder, shark.",
        bestFor: "rest day",
        provider: "Miss Judy Charters",
      },
    ],
    partyBuses: [
      {
        type: "trolley",
        capacity: [14, 28],
        hourlyRate: [175, 350],
        providers: [
          "Savannah Pedicab",
          "Old Town Trolley",
          "Savannah Party Bus",
        ],
        notes:
          "Trolley bar crawls are popular. Downtown is walkable though, so you may not need transport unless going to Tybee or courses.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 125],
        providers: [
          "Savannah Private Dining",
          "CozyMeal Savannah",
          "Chef Darin's Coastal Kitchen",
        ],
        mealTypes: [
          "lowcountry boil",
          "Southern feast",
          "steak dinner",
          "oyster roast",
          "brunch",
        ],
        notes:
          "With Savannah's food scene, you may want to eat out more than in. But a lowcountry boil in your courtyard is special.",
      },
    ],
  },

  // ────────────────────────────────────────────────
  // 7. Lexington, KY (TDF Tested 2023)
  // ────────────────────────────────────────────────
  {
    id: "lexington-ky",
    city: "Lexington",
    state: "KY",
    region: "Southeast",
    tagline: "Bourbon, bluegrass, and birdies",
    description:
      "Lexington is an underrated golf trip that Tour de Fore tested in 2023 and loved. The courses are solid and affordable, but the real draw is what you do between rounds: bourbon distillery tours on the Kentucky Bourbon Trail, horse farm visits, and a surprisingly good food and bar scene downtown. It's a trip with built-in variety that keeps everyone engaged.",
    population: "medium",
    tdfTested: true,
    tdfYear: 2023,
    nearestAirport: {
      code: "LEX",
      name: "Blue Grass Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Kearney Hill Golf Links",
        tier: "solid",
        greenFeeRange: [35, 65],
        holes: 18,
        par: 72,
        yardage: 6971,
        slope: 130,
        rating: 73.0,
        walkable: true,
        style: "links",
        driveMinutes: 15,
        highlight:
          "P.B. Dye links-style muni with great bones. Rolling terrain, fescue, and the best value in Lexington.",
      },
      {
        name: "Cherry Blossom Golf Course",
        tier: "solid",
        greenFeeRange: [35, 60],
        holes: 18,
        par: 72,
        yardage: 6847,
        slope: 126,
        rating: 72.2,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        highlight:
          "Jack Ridge design in Georgetown. Wide fairways, mature trees, and excellent public-course conditioning.",
      },
      {
        name: "University Club of Kentucky - Big Blue",
        tier: "premium",
        greenFeeRange: [65, 115],
        holes: 18,
        par: 72,
        yardage: 7059,
        slope: 135,
        rating: 74.0,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "UK's championship course. Hosted NCAA championships and SEC events. The area's best pure test of golf.",
      },
      {
        name: "Keene Trace Golf Club - Champions Course",
        tier: "premium",
        greenFeeRange: [75, 125],
        holes: 18,
        par: 72,
        yardage: 7145,
        slope: 137,
        rating: 74.5,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        highlight:
          "Arthur Hills design through horse country. Rolling hills, creeks, and pristine conditioning. Semi-private, guest access available.",
      },
      {
        name: "Griffin Gate Golf Club",
        tier: "solid",
        greenFeeRange: [55, 95],
        holes: 18,
        par: 72,
        yardage: 6801,
        slope: 128,
        rating: 72.4,
        walkable: false,
        style: "resort",
        driveMinutes: 10,
        url: "https://www.marriott.com/en-us/hotels/lexlr-griffin-gate-marriott-resort-and-spa/experiences/",
        highlight:
          "Rees Jones design at the Marriott resort. Convenient location and solid conditioning. Good for day 1.",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [500, 1500],
        amenities: [
          "full kitchen",
          "game room",
          "pool",
          "bourbon bar area",
          "parking",
          "fire pit",
        ],
        areaDescription: "Lexington suburbs and horse country",
        searchUrl:
          "https://www.vrbo.com/search?destination=Lexington%2C+KY&adults=16",
        notes:
          "Large homes in the horse-country suburbs work well. Some horse farm properties available for rent. 10-15 min to downtown.",
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [400, 1000],
        amenities: [
          "walkable to downtown",
          "full kitchen",
          "parking",
          "historic charm",
        ],
        areaDescription: "Downtown Lexington / University area",
        searchUrl:
          "https://www.airbnb.com/s/Lexington--KY/homes?adults=16",
        notes:
          "Downtown houses let you walk to bars and restaurants. Harder to find 16-person capacity but possible with multiple units.",
      },
    ],
    dining: [
      {
        name: "Malone's",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Lexington's premier steakhouse. Prime steaks, great bourbon selection, and a private dining room for groups.",
        reservationNeeded: true,
      },
      {
        name: "County Club",
        style: "southern",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Southern comfort food and creative cocktails. Hot chicken, pimento cheese, and bourbon flights.",
        reservationNeeded: true,
      },
      {
        name: "Winchell's Restaurant",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Chef-driven farm-to-table in a cozy setting. The best fine dining in Lexington.",
        reservationNeeded: true,
      },
      {
        name: "Ramsey's Diner",
        style: "southern",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Meat-and-three with massive portions. The beer cheese is legendary. Perfect post-round fuel.",
        reservationNeeded: false,
      },
      {
        name: "Tony's of Lexington",
        style: "steakhouse",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Old-school steaks and seafood since 1952. No-frills, big portions, and a loaded baked potato the size of your head.",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Ethereal Brewing",
        vibe: "brewpub",
        highlight:
          "Best craft brewery in Lexington. Great taproom with a rotation of Belgian-inspired and experimental beers.",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Bluegrass Tavern",
        vibe: "whiskey-bar",
        highlight:
          "200+ bourbons behind the bar. The definitive bourbon bar in the bourbon capital of the world.",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Burl",
        vibe: "dive",
        highlight:
          "Live music venue and bar in a converted warehouse. Great local acts and cheap drinks.",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "McCarthy's Irish Bar",
        vibe: "sports-bar",
        highlight:
          "Downtown Irish pub. Pool tables, darts, and a solid late-night crew. Good for the inevitable 1am session.",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Kentucky Bourbon Trail",
        type: "distillery",
        duration: "full day",
        pricePerPerson: [50, 150],
        groupFriendly: true,
        highlight:
          "Hit Woodford Reserve (30 min), Buffalo Trace (40 min), and Wild Turkey (45 min) in a single day. Book a van.",
        bestFor: "rest day",
      },
      {
        name: "Woodford Reserve Distillery Tour",
        type: "distillery",
        duration: "2-3 hours",
        pricePerPerson: [20, 50],
        groupFriendly: true,
        highlight:
          "The most photogenic distillery on the trail. Stone buildings, copper pot stills, and excellent tastings.",
        bestFor: "rest day",
        provider: "Woodford Reserve",
      },
      {
        name: "Keeneland Race Track",
        type: "horseback",
        duration: "half day",
        pricePerPerson: [5, 50],
        groupFriendly: true,
        highlight:
          "World-class thoroughbred racing in April and October. Even without races, the grounds and morning workouts are special.",
        bestFor: "morning before golf",
        provider: "Keeneland",
      },
      {
        name: "Horse Farm Tours",
        type: "horseback",
        duration: "2-3 hours",
        pricePerPerson: [25, 50],
        groupFriendly: true,
        highlight:
          "Tour working thoroughbred farms and see retired Triple Crown winners. Uniquely Kentucky.",
        bestFor: "morning before golf",
        provider: "Horse Country Tours",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 24],
        hourlyRate: [150, 275],
        providers: [
          "Bluegrass Party Bus",
          "Mint Julep Experiences",
          "Lexington Party Bus",
        ],
        notes:
          "A party bus for the bourbon trail day is essential. Mint Julep Experiences specializes in bourbon tour transport with built-in itineraries.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [55, 110],
        providers: [
          "CozyMeal Lexington",
          "Bluegrass Catering",
          "The Chef's Table Lexington",
        ],
        mealTypes: [
          "bourbon-paired steak dinner",
          "Southern BBQ cookout",
          "Kentucky hot brown spread",
          "breakfast",
        ],
        notes:
          "A bourbon-paired dinner at your rental is a great way to put those trail purchases to work. Good chef availability.",
      },
    ],
  },

  // ────────────────────────────────────────────────
  // 8. Asheville, NC
  // ────────────────────────────────────────────────
  {
    id: "asheville-nc",
    city: "Asheville",
    state: "NC",
    region: "Southeast",
    tagline: "Mountain golf and more breweries than you can handle",
    description:
      "Asheville sits in the Blue Ridge Mountains and offers a completely different vibe from the coastal Southeast. The courses are mountain-style -- elevation changes, dramatic views, and cooler temperatures even in summer. Off the course, Asheville has more breweries per capita than any city in America, a world-class food scene, and the Blue Ridge Parkway at your doorstep. It's the golf trip for the group that also wants to eat, drink, and explore.",
    population: "medium",
    nearestAirport: {
      code: "AVL",
      name: "Asheville Regional Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "The Omni Grove Park Inn Golf Course",
        tier: "premium",
        greenFeeRange: [100, 195],
        holes: 18,
        par: 70,
        yardage: 6520,
        slope: 131,
        rating: 71.6,
        walkable: false,
        style: "mountain",
        driveMinutes: 10,
        url: "https://www.omnihotels.com/hotels/asheville-grove-park/golf",
        highlight:
          "Donald Ross design clinging to the mountainside. Stunning Blue Ridge views from every hole. Resort-convenient and historic.",
      },
      {
        name: "Biltmore Forest Country Club",
        tier: "premium",
        greenFeeRange: [125, 200],
        holes: 18,
        par: 72,
        yardage: 6692,
        slope: 133,
        rating: 72.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        highlight:
          "Donald Ross design on the Biltmore Estate. Private but guest access available through the estate. Classic mountain parkland.",
      },
      {
        name: "The Cliffs at Walnut Cove",
        tier: "premium",
        greenFeeRange: [150, 275],
        holes: 18,
        par: 72,
        yardage: 7091,
        slope: 141,
        rating: 74.5,
        walkable: false,
        style: "mountain",
        driveMinutes: 25,
        highlight:
          "Jack Nicklaus design in a private mountain community. Dramatic elevation changes and Appalachian views. Guest access through real estate or member.",
      },
      {
        name: "Sequoyah National Golf Club",
        tier: "solid",
        greenFeeRange: [55, 95],
        holes: 18,
        par: 72,
        yardage: 6655,
        slope: 129,
        rating: 72.0,
        walkable: false,
        style: "mountain",
        driveMinutes: 45,
        url: "https://www.sequoyahnational.com/",
        highlight:
          "Robert Trent Jones II mountain design near Cherokee. Dramatic mountain scenery and excellent value. Worth the drive.",
      },
    ],
    lodging: [
      {
        type: "cabin",
        sleeps: [12, 20],
        nightlyRange: [600, 2000],
        amenities: [
          "mountain views",
          "hot tub",
          "fire pit",
          "full kitchen",
          "game room",
          "multiple decks",
          "pool table",
        ],
        areaDescription: "Blue Ridge mountain cabins (Black Mountain, Fairview, Weaverville)",
        searchUrl:
          "https://www.vrbo.com/search?destination=Asheville%2C+NC&adults=16",
        notes:
          "Large mountain cabins are plentiful and come with killer views. Many have game rooms, hot tubs, and fire pits. 15-30 min from downtown.",
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [500, 1500],
        amenities: [
          "walkable to downtown",
          "full kitchen",
          "parking",
          "historic character",
        ],
        areaDescription: "Downtown Asheville / West Asheville",
        searchUrl:
          "https://www.airbnb.com/s/Asheville--NC/homes?adults=16",
        notes:
          "Downtown homes let you walk to breweries and restaurants. Smaller than mountain cabins but the location is worth it.",
      },
    ],
    dining: [
      {
        name: "Bouchon",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "French bistro that's been one of Asheville's best for 20+ years. Excellent wine list and private dining available.",
        reservationNeeded: true,
      },
      {
        name: "Buxton Hall Barbecue",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Whole-hog BBQ from James Beard-nominated chef. The pulled pork and smoked chicken are the real deal.",
        reservationNeeded: false,
      },
      {
        name: "Curate",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Spanish tapas from James Beard Award-winning chef Katie Button. Order for the table and share everything.",
        reservationNeeded: true,
      },
      {
        name: "12 Bones Smokehouse",
        style: "bbq",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Obama ate here twice. The blueberry chipotle ribs are legendary. Cash only, long lines, worth it.",
        reservationNeeded: false,
      },
      {
        name: "Rhubarb",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "John Fleer's farm-to-table American cuisine on Pack Square. Seasonal menu showcasing Appalachian ingredients.",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Wicked Weed Brewing",
        vibe: "brewpub",
        highlight:
          "Asheville's most famous brewery. The Funkatorium sour beer taproom downstairs is a must-visit.",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Burial Beer Co.",
        vibe: "brewpub",
        highlight:
          "Adventurous, experimental beers in a gritty South Slope taproom. The best pure beer in Asheville.",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Crow & Quill",
        vibe: "cocktail",
        highlight:
          "Intimate speakeasy-style cocktail bar. Excellent craft cocktails and a moody, literary vibe.",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Sovereign Remedies",
        vibe: "cocktail",
        highlight:
          "Farm-to-glass cocktails using foraged and local ingredients. Asheville's most creative drinks.",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Sierra Nevada Taproom",
        vibe: "brewpub",
        highlight:
          "Massive East Coast brewery and taproom. Tours, tastings, and a full restaurant. The campus is stunning.",
        lateNight: false,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Asheville Brewery Crawl",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [20, 50],
        groupFriendly: true,
        highlight:
          "Hit 5-6 breweries on the South Slope in a walkable loop. Wicked Weed, Burial, Green Man, Catawba, Twin Leaf, and more.",
        bestFor: "rest day",
      },
      {
        name: "Blue Ridge Parkway Drive",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [0, 10],
        groupFriendly: true,
        highlight:
          "America's most scenic drive is right here. Stop at overlooks, grab short hikes, and take in the mountain views.",
        bestFor: "arrival day",
      },
      {
        name: "Biltmore Estate Tour",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [60, 90],
        groupFriendly: true,
        highlight:
          "America's largest home. Tour the 250-room mansion, taste wine at the on-site winery, and explore the gardens.",
        bestFor: "rest day",
        provider: "Biltmore",
      },
      {
        name: "French Broad River Tubing",
        type: "water-sports",
        duration: "2-3 hours",
        pricePerPerson: [25, 40],
        groupFriendly: true,
        highlight:
          "Lazy river tubing through the mountains with a cooler strapped to your tube. Perfect for a hot summer rest day.",
        bestFor: "rest day",
        provider: "Zen Tubing",
      },
    ],
    partyBuses: [
      {
        type: "trolley",
        capacity: [14, 28],
        hourlyRate: [175, 325],
        providers: [
          "Amazing Pubcycle",
          "Asheville Brewery Tours",
          "Asheville Party Bus",
        ],
        notes:
          "Brewery tour shuttles are huge here. Several companies offer pre-built brewery crawl routes with transport.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 130],
        providers: [
          "Asheville Private Chef",
          "CozyMeal Asheville",
          "Mountain Chef Services",
        ],
        mealTypes: [
          "farm-to-table dinner",
          "Southern BBQ cookout",
          "steak dinner",
          "brunch",
          "Appalachian feast",
        ],
        notes:
          "Asheville has a deep farm-to-table chef pool. A dinner at your mountain cabin with local ingredients is special.",
      },
    ],
  },

  // ────────────────────────────────────────────────
  // 9. Destin / 30A, FL
  // ────────────────────────────────────────────────
  {
    id: "destin-30a-fl",
    city: "Destin",
    state: "FL",
    region: "Southeast",
    tagline: "Beach, nightlife, and golf on the Emerald Coast",
    description:
      "The Destin / 30A stretch of the Florida Panhandle gives you the beach-golf-nightlife trifecta. Sandestin Resort alone has four courses, and tracks like Regatta Bay and Burnt Pine elevate the golf beyond your typical beach-town fare. The emerald-green water and sugar-white sand are world-class, the seafood is incredible, and Destin's HarborWalk Village delivers a legit nightlife scene. It's the total-package trip.",
    population: "small",
    nearestAirport: {
      code: "VPS",
      name: "Destin-Fort Walton Beach Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Regatta Bay Golf & Country Club",
        tier: "premium",
        greenFeeRange: [85, 165],
        holes: 18,
        par: 72,
        yardage: 6894,
        slope: 140,
        rating: 73.6,
        walkable: false,
        style: "coastal",
        driveMinutes: 10,
        url: "https://www.regattabay.com/",
        highlight:
          "Robert Walker design on Choctawhatchee Bay. Dramatic water views, challenging layout, and the area's best conditioning.",
      },
      {
        name: "Kelly Plantation Golf Club",
        tier: "premium",
        greenFeeRange: [80, 150],
        holes: 18,
        par: 72,
        yardage: 7099,
        slope: 138,
        rating: 74.2,
        walkable: false,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.kellyplantationgolf.com/",
        highlight:
          "Fred Couples and Gene Bates design along Choctawhatchee Bay. Beautiful routing through wetlands and hardwoods.",
      },
      {
        name: "Burnt Pine Golf Club",
        tier: "premium",
        greenFeeRange: [150, 250],
        holes: 18,
        par: 72,
        yardage: 7046,
        slope: 143,
        rating: 74.8,
        walkable: false,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.sandestin.com/golf/burnt-pine/",
        highlight:
          "Rees Jones design and the crown jewel of Sandestin. Semi-private, immaculate conditioning, and the area's toughest test.",
      },
      {
        name: "Sandestin - Raven Golf Club",
        tier: "solid",
        greenFeeRange: [60, 120],
        holes: 18,
        par: 72,
        yardage: 6899,
        slope: 134,
        rating: 73.0,
        walkable: false,
        style: "resort",
        driveMinutes: 5,
        url: "https://www.sandestin.com/golf/raven/",
        highlight:
          "Robert Trent Jones Jr. design at Sandestin Resort. Mature oaks, rolling terrain, and resort convenience.",
      },
      {
        name: "Sandestin - Links Course",
        tier: "solid",
        greenFeeRange: [50, 100],
        holes: 18,
        par: 72,
        yardage: 6710,
        slope: 130,
        rating: 72.2,
        walkable: true,
        style: "links",
        driveMinutes: 5,
        url: "https://www.sandestin.com/golf/links/",
        highlight:
          "Tom Jackson links-style design. Open, breezy, and the most walkable course at Sandestin.",
      },
      {
        name: "Sandestin - Baytowne Golf Club",
        tier: "solid",
        greenFeeRange: [45, 90],
        holes: 18,
        par: 72,
        yardage: 6569,
        slope: 125,
        rating: 71.4,
        walkable: false,
        style: "resort",
        driveMinutes: 5,
        url: "https://www.sandestin.com/golf/baytowne/",
        highlight:
          "Tom Jackson resort course. The shortest and most forgiving at Sandestin. Good warm-up round.",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 22],
        nightlyRange: [600, 2500],
        amenities: [
          "private pool",
          "beachfront or beach access",
          "hot tub",
          "full kitchen",
          "multiple master suites",
          "balcony with Gulf views",
        ],
        areaDescription: "Destin, Crystal Beach, Miramar Beach",
        searchUrl:
          "https://www.vrbo.com/search?destination=Destin%2C+FL&adults=16",
        notes:
          "Large beach houses along Scenic Hwy 98 and Crystal Beach. Gulf-front homes go fast -- book 3-4 months ahead for spring/fall.",
      },
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [800, 3000],
        amenities: [
          "beach access",
          "community pool",
          "full kitchen",
          "bikes",
          "golf cart",
          "30A charm",
        ],
        areaDescription: "30A communities (Rosemary Beach, Alys Beach, Watercolor, Seaside)",
        searchUrl:
          "https://www.vrbo.com/search?destination=Santa+Rosa+Beach%2C+FL&adults=16",
        notes:
          "30A is more upscale and quieter than Destin. Rosemary Beach and Watercolor homes are stunning. 20-30 min east of Destin.",
      },
    ],
    dining: [
      {
        name: "Boshamps Seafood & Oyster House",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Harborfront seafood with sunset views over Destin Harbor. Fresh oysters, grilled grouper, and a buzzy atmosphere.",
        reservationNeeded: true,
      },
      {
        name: "Jackacuda's Seafood & Sushi",
        style: "sushi",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Creative sushi and seafood on HarborWalk. Great happy hour and a lively bar scene.",
        reservationNeeded: true,
      },
      {
        name: "The Back Porch",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Beachfront institution since 1974. Chargrilled amberjack and grouper with your feet almost in the sand.",
        reservationNeeded: false,
      },
      {
        name: "Brotula's Seafood House & Steamer",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "HarborWalk Village spot with excellent steamed seafood combos. Raw bar is top-notch.",
        reservationNeeded: true,
      },
      {
        name: "George's at Alys Beach",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Upscale dining in the stunning Alys Beach community on 30A. Worth the drive for the splurge night.",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "AJ's Seafood & Oyster Bar",
        vibe: "patio",
        highlight:
          "Destin Harbor landmark. Multiple levels, live music, and the famous AJ's Jumbotron. Gets rowdy after dark.",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "HarborWalk Village Bars",
        vibe: "sports-bar",
        highlight:
          "The HarborWalk strip has a dozen bars within stumbling distance. Something for every vibe.",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Red Door Saloon",
        vibe: "dive",
        highlight:
          "Low-key dive bar in Destin. Strong drinks, pool tables, and no pretense. The antidote to tourist bars.",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Grayton Beer Company",
        vibe: "brewpub",
        highlight:
          "Taproom and brewery on 30A. Excellent craft beer, food truck, and a chill outdoor vibe.",
        lateNight: false,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Destin Deep Sea Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [100, 225],
        groupFriendly: true,
        highlight:
          "Destin is the 'World's Luckiest Fishing Village.' Charter boats for red snapper, grouper, mahi, and more.",
        bestFor: "rest day",
        provider: "Destin Charter Fishing",
      },
      {
        name: "Crab Island Boat Rental",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [60, 120],
        groupFriendly: true,
        highlight:
          "Rent a pontoon and anchor up at Crab Island -- the famous sandbar party spot. Bring a cooler.",
        bestFor: "rest day",
        provider: "Destin Pontoon Rentals",
      },
      {
        name: "Jet Ski Tours",
        type: "water-sports",
        duration: "2-3 hours",
        pricePerPerson: [75, 150],
        groupFriendly: true,
        highlight:
          "Guided jet ski tours through Destin Harbor and the Gulf. Dolphin sightings common.",
        bestFor: "morning before golf",
      },
      {
        name: "Grayton Beer Company Tour",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [10, 25],
        groupFriendly: true,
        highlight:
          "30A's local brewery with tours and tastings. Chill afternoon spot with food trucks and outdoor games.",
        bestFor: "arrival day",
        provider: "Grayton Beer Company",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 24],
        hourlyRate: [175, 325],
        providers: [
          "Destin Party Bus",
          "Emerald Coast Limo",
          "Beach Boys Shuttle",
        ],
        notes:
          "Party buses are popular for HarborWalk Village nights and Crab Island trips. Also useful for 30A exploration.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 120],
        providers: [
          "Emerald Coast Private Chefs",
          "CozyMeal Destin",
          "30A Chef Services",
        ],
        mealTypes: [
          "Gulf seafood feast",
          "steak dinner",
          "fish tacos and margaritas",
          "brunch",
          "lowcountry boil",
        ],
        notes:
          "A Gulf seafood cookout at your beach house is the move. Fresh catch from the harbor delivered to your door.",
      },
    ],
  },
];
