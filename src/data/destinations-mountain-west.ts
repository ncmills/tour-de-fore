import { Destination } from "./types";

export const mountainWestDestinations: Destination[] = [
  // ── Whitefish, MT ──────────────────────────────────────────────────
  {
    id: "whitefish-mt",
    city: "Whitefish",
    state: "MT",
    region: "Mountain West",
    tagline: "Mountain golf on the doorstep of Glacier National Park",
    description:
      "Whitefish is a charming ski-town-turned-summer-haven with knockout mountain courses, a walkable downtown strip, and Glacier National Park 30 minutes away. The combination of affordable mountain golf, jaw-dropping scenery, and genuine Montana hospitality makes it a sleeper TDF pick.",
    population: "small",
    nearestAirport: {
      code: "GPI",
      name: "Glacier Park International Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["summer"],
    courses: [
      {
        name: "Whitefish Lake Golf Club - North",
        tier: "premium",
        greenFeeRange: [75, 99],
        holes: 18,
        par: 72,
        yardage: 6556,
        slope: 133,
        rating: 71.2,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.golfwhitefish.com",
        highlight:
          "Classic 36-hole facility with the North course winding through towering pines along Whitefish Lake",
      },
      {
        name: "Whitefish Lake Golf Club - South",
        tier: "solid",
        greenFeeRange: [55, 79],
        holes: 18,
        par: 71,
        yardage: 6063,
        slope: 125,
        rating: 68.8,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.golfwhitefish.com",
        highlight:
          "Shorter but sneaky; more open layout with Flathead Valley views",
      },
      {
        name: "Meadow Lake Golf Resort",
        tier: "solid",
        greenFeeRange: [49, 79],
        holes: 18,
        par: 72,
        yardage: 6700,
        slope: 128,
        rating: 71.0,
        walkable: true,
        style: "mountain",
        driveMinutes: 20,
        url: "https://www.meadowlakegolf.com",
        highlight:
          "Resort course near Columbia Falls with wide fairways and mountain panoramas",
      },
      {
        name: "Eagle Bend Golf Club",
        tier: "premium",
        greenFeeRange: [65, 95],
        holes: 27,
        par: 72,
        yardage: 6800,
        slope: 131,
        rating: 71.8,
        walkable: false,
        style: "mountain",
        driveMinutes: 30,
        url: "https://www.eaglebendgolfclub.com",
        highlight:
          "Jack Nicklaus-influenced 27 holes on Flathead Lake — the largest natural freshwater lake west of the Mississippi",
      },
      {
        name: "Northern Pines Golf Club",
        tier: "solid",
        greenFeeRange: [45, 65],
        holes: 18,
        par: 72,
        yardage: 6500,
        slope: 126,
        rating: 70.2,
        walkable: true,
        style: "mountain",
        driveMinutes: 10,
        url: "https://www.northernpinesgolf.com",
        highlight:
          "Well-conditioned daily-fee course through dense Montana forest; great value",
      },
    ],
    lodging: [
      {
        type: "lodge",
        sleeps: [10, 16],
        nightlyRange: [800, 1800],
        amenities: [
          "hot tub",
          "fire pit",
          "full kitchen",
          "mountain views",
          "game room",
          "grill",
        ],
        areaDescription: "Whitefish Mountain Resort / Big Mountain area",
        searchUrl:
          "https://www.vrbo.com/search?destination=Whitefish%2C+Montana&guests=16",
        notes:
          "Ski chalets convert to summer lodges with great rates; many sleep 12-16 with multiple levels",
      },
      {
        type: "cabin",
        sleeps: [8, 14],
        nightlyRange: [500, 1400],
        amenities: [
          "lakefront",
          "dock",
          "kayaks",
          "hot tub",
          "full kitchen",
          "fire pit",
        ],
        areaDescription: "Whitefish Lake / City Beach area",
        searchUrl:
          "https://www.airbnb.com/s/Whitefish--Montana/homes?adults=14",
        notes:
          "Lakefront cabins book early for summer; combine two neighboring cabins for bigger groups",
      },
    ],
    dining: [
      {
        name: "Whitefish Lake Restaurant",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Iconic lakeside fine dining in a restored 1930s building; phenomenal steaks and fresh trout",
        reservationNeeded: true,
      },
      {
        name: "Tupelo Grille",
        style: "southern",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Southern-meets-Montana with Cajun influences; great bourbon list and gumbo",
        reservationNeeded: true,
      },
      {
        name: "Craggy Range Bar & Grill",
        style: "steakhouse",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Local favorite for big groups; hand-cut steaks and excellent whiskey selection",
        reservationNeeded: false,
      },
      {
        name: "Pescado Blanco",
        style: "mexican",
        priceRange: "$$",
        capacity: "medium",
        highlight: "Baja-style tacos and margaritas on Central Avenue; fun patio scene",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Great Northern Bar & Grill",
        vibe: "dive",
        highlight:
          "The soul of Whitefish — live music, cheap drinks, packed dance floor on weekends",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Casey's Bar",
        vibe: "dive",
        highlight:
          "No-frills Montana bar; pool tables, jukebox, and zero pretension since 1945",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Bonsai Brewing Project",
        vibe: "brewpub",
        highlight:
          "Local craft brewery with rotating taps and a big outdoor patio; family-friendly early, rowdy late",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Glacier National Park - Going-to-the-Sun Road",
        type: "hiking",
        duration: "full day",
        pricePerPerson: [0, 35],
        groupFriendly: true,
        highlight:
          "One of the most spectacular drives in America; combine with a short hike to Avalanche Lake",
        bestFor: "rest day",
      },
      {
        name: "Whitefish Lake Boat Rental",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [40, 80],
        groupFriendly: true,
        highlight:
          "Rent a pontoon and cruise Whitefish Lake with coolers full of Montana beer",
        bestFor: "arrival day",
        provider: "Whitefish Marine",
      },
      {
        name: "Flathead River Fly Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [150, 275],
        groupFriendly: true,
        highlight:
          "World-class trout fishing on the Flathead; guided drift boat trips for all skill levels",
        bestFor: "rest day",
        provider: "Glacier Guides",
      },
      {
        name: "Whitefish Mountain Resort Alpine Slide & Zipline",
        type: "zipline",
        duration: "2-3 hours",
        pricePerPerson: [25, 55],
        groupFriendly: true,
        highlight:
          "Summer activities at the ski resort — alpine slide, zipline tours, scenic chairlift rides",
        bestFor: "arrival day",
        provider: "Whitefish Mountain Resort",
      },
      {
        name: "Horseback Trail Ride",
        type: "horseback",
        duration: "2-3 hours",
        pricePerPerson: [65, 120],
        groupFriendly: true,
        highlight:
          "Ride through Flathead Valley with mountain views; perfect for groups with mixed interests",
        bestFor: "rest day",
        provider: "Bar W Guest Ranch",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [125, 175],
        providers: [
          "Flathead Valley Shuttle",
          "Glacier Taxi & Shuttle",
        ],
        notes:
          "Sprinter vans are the norm here; book early for summer season. Some providers do full-day golf packages.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 120],
        providers: ["Take a Chef", "Montana Private Chef Services"],
        mealTypes: [
          "elk steak dinner",
          "Montana BBQ cookout",
          "trout and game dinner",
          "breakfast spread",
        ],
        notes:
          "Montana private chef scene is growing; many specialize in wild game and locally sourced ingredients",
      },
    ],
  },

  // ── Big Sky, MT ────────────────────────────────────────────────────
  {
    id: "big-sky-mt",
    city: "Big Sky",
    state: "MT",
    region: "Mountain West",
    tagline: "Resort mountain golf under the biggest sky you've ever seen",
    description:
      "Big Sky delivers elite mountain golf surrounded by the most dramatic scenery in Montana. The Reserve at Moonlight Basin is a true bucket-list track, and the town has quietly built out a serious dining and nightlife scene to match. Combine with Bozeman's airport and you've got easy logistics for an unforgettable trip.",
    population: "tiny",
    nearestAirport: {
      code: "BZN",
      name: "Bozeman Yellowstone International Airport",
      driveMinutes: 50,
    },
    bestSeasons: ["summer"],
    courses: [
      {
        name: "The Reserve at Moonlight Basin",
        tier: "bucket-list",
        greenFeeRange: [200, 350],
        holes: 18,
        par: 72,
        yardage: 7500,
        slope: 142,
        rating: 74.5,
        walkable: false,
        style: "mountain",
        driveMinutes: 10,
        url: "https://www.moonlightbasin.com/golf",
        highlight:
          "Jack Nicklaus Signature course at 7,500 feet with staggering views of Lone Mountain; one of the best mountain courses in America",
      },
      {
        name: "Big Sky Resort Golf Course",
        tier: "premium",
        greenFeeRange: [100, 175],
        holes: 18,
        par: 72,
        yardage: 6800,
        slope: 132,
        rating: 71.4,
        walkable: false,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.bigskyresort.com/golf",
        highlight:
          "Arnold Palmer design weaving through the Gallatin Canyon; elk and moose regularly cross fairways",
      },
      {
        name: "Riverside Country Club",
        tier: "solid",
        greenFeeRange: [55, 85],
        holes: 18,
        par: 72,
        yardage: 6584,
        slope: 125,
        rating: 70.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 50,
        url: "https://www.riversidecc.net",
        highlight:
          "Classic Bozeman club along the Gallatin River; walkable and well-conditioned with mountain backdrop",
      },
    ],
    lodging: [
      {
        type: "lodge",
        sleeps: [10, 16],
        nightlyRange: [1200, 3500],
        amenities: [
          "hot tub",
          "mountain views",
          "ski-in/ski-out",
          "full kitchen",
          "game room",
          "fire pit",
          "multiple living areas",
        ],
        areaDescription: "Big Sky Mountain Village / Meadow Village",
        searchUrl:
          "https://www.vrbo.com/search?destination=Big+Sky%2C+Montana&guests=16",
        notes:
          "Summer rates are 40-60% less than ski season; large ski lodges perfect for groups with tons of space",
      },
      {
        type: "cabin",
        sleeps: [8, 12],
        nightlyRange: [600, 1800],
        amenities: [
          "hot tub",
          "fireplace",
          "full kitchen",
          "deck",
          "mountain views",
        ],
        areaDescription: "Gallatin Canyon / Moonlight Basin",
        searchUrl:
          "https://www.airbnb.com/s/Big-Sky--Montana/homes?adults=12",
        notes:
          "Moonlight Basin cabins offer proximity to The Reserve; may need two for 16",
      },
    ],
    dining: [
      {
        name: "Horn & Cantle",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Lone Mountain Ranch's signature restaurant; farm-to-table Montana steaks in a stunning ranch setting",
        reservationNeeded: true,
      },
      {
        name: "Olive B's Bistro",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Big Sky's best upscale-casual spot; creative seasonal menu with an excellent wine list",
        reservationNeeded: true,
      },
      {
        name: "Lone Peak Brewery",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Big Sky's original brewery; solid pub food and house-brewed beers in a big lively space",
        reservationNeeded: false,
      },
      {
        name: "Buck's T-4 Lodge",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Montana institution since 1946; game meats, prime rib, and a legendary bar scene",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Lone Peak Brewery Taproom",
        vibe: "brewpub",
        highlight:
          "Big Sky's go-to watering hole; house beers, pub grub, and a great patio",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Carabiner Lounge",
        vibe: "cocktail",
        highlight:
          "Upscale lodge bar at The Summit Hotel with craft cocktails and Lone Mountain views",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Scissorbills Saloon",
        vibe: "saloon",
        highlight:
          "Après-golf dive with live music, cheap drinks, and a wild local crowd in ski season and summer alike",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Gallatin River Whitewater Rafting",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [65, 110],
        groupFriendly: true,
        highlight:
          "Class III-IV rapids through Gallatin Canyon — the same river from A River Runs Through It",
        bestFor: "rest day",
        provider: "Geyser Whitewater",
      },
      {
        name: "Fly Fishing the Gallatin",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [200, 350],
        groupFriendly: true,
        highlight:
          "Blue-ribbon trout stream with guided wade and float trips through stunning canyon scenery",
        bestFor: "rest day",
        provider: "Gallatin River Guides",
      },
      {
        name: "Horseback Riding at 320 Guest Ranch",
        type: "horseback",
        duration: "2-3 hours",
        pricePerPerson: [75, 140],
        groupFriendly: true,
        highlight:
          "Trail rides through Gallatin Canyon with mountain meadow views; all experience levels welcome",
        bestFor: "rest day",
        provider: "320 Guest Ranch",
      },
      {
        name: "Zipline Tour",
        type: "zipline",
        duration: "2-3 hours",
        pricePerPerson: [80, 120],
        groupFriendly: true,
        highlight:
          "Five ziplines across the mountain with views of Lone Mountain and the Spanish Peaks",
        bestFor: "arrival day",
        provider: "Big Sky Resort",
      },
      {
        name: "Mountain Biking at Big Sky Resort",
        type: "mountain-biking",
        duration: "half day",
        pricePerPerson: [50, 85],
        groupFriendly: true,
        highlight:
          "Lift-served downhill and cross-country trails with rentals available at the base",
        bestFor: "rest day",
        provider: "Big Sky Resort",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [150, 225],
        providers: [
          "Skyline Bus",
          "Big Sky Transportation",
        ],
        notes:
          "Essential for the 50-min Bozeman airport run; many providers do full-day golf shuttles between Big Sky and Bozeman courses",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [80, 150],
        providers: [
          "Big Sky Private Chefs",
          "Take a Chef",
          "Montana Chef Services",
        ],
        mealTypes: [
          "bison and elk game dinner",
          "ranch BBQ cookout",
          "steakhouse dinner",
          "breakfast spread",
        ],
        notes:
          "Private chef scene is well-developed in Big Sky due to the resort crowd; book 2-3 weeks ahead in summer",
      },
    ],
  },

  // ── Steamboat Springs, CO ──────────────────────────────────────────
  {
    id: "steamboat-springs-co",
    city: "Steamboat Springs",
    state: "CO",
    region: "Mountain West",
    tagline: "Mountain town golf with hot springs and real cowboy culture",
    description:
      "Steamboat is the rare Colorado mountain town that still feels like a working Western community — ranches, rodeos, and hot springs mixed with world-class golf. Three excellent courses sit at 6,700 feet, the hot springs are perfect for post-round recovery, and Lincoln Avenue delivers a walkable downtown with real character.",
    population: "small",
    nearestAirport: {
      code: "HDN",
      name: "Yampa Valley Regional Airport",
      driveMinutes: 30,
    },
    bestSeasons: ["summer"],
    courses: [
      {
        name: "Haymaker Golf Course",
        tier: "premium",
        greenFeeRange: [85, 145],
        holes: 18,
        par: 72,
        yardage: 7308,
        slope: 139,
        rating: 73.5,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.haymakergolf.com",
        highlight:
          "Keith Foster design rated among Colorado's best public courses; wide valleys with the Yampa River in play and Sleeping Giant mountain as backdrop",
      },
      {
        name: "Rollingstone Ranch Golf Club",
        tier: "premium",
        greenFeeRange: [79, 135],
        holes: 18,
        par: 72,
        yardage: 6902,
        slope: 137,
        rating: 72.2,
        walkable: false,
        style: "mountain",
        driveMinutes: 10,
        url: "https://www.rollingstoneranchgc.com",
        highlight:
          "Robert Trent Jones Jr. design at the Sheraton; dramatic elevation changes and views of the Flat Tops Wilderness",
      },
      {
        name: "Catamount Ranch & Club",
        tier: "premium",
        greenFeeRange: [95, 165],
        holes: 18,
        par: 72,
        yardage: 7083,
        slope: 140,
        rating: 73.0,
        walkable: false,
        style: "mountain",
        driveMinutes: 15,
        url: "https://www.catamountranch.com",
        highlight:
          "Tom Weiskopf design through sage meadows and aspen groves; semi-private with limited public access",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [600, 2000],
        amenities: [
          "hot tub",
          "mountain views",
          "full kitchen",
          "game room",
          "multiple bedrooms",
          "garage",
        ],
        areaDescription: "Steamboat Mountain / Ski Area base",
        searchUrl:
          "https://www.vrbo.com/search?destination=Steamboat+Springs%2C+Colorado&guests=16",
        notes:
          "Summer rates are 50-70% off ski season; large ski homes perfect for golf groups with tons of space and gear storage",
      },
      {
        type: "ranch",
        sleeps: [12, 20],
        nightlyRange: [800, 2500],
        amenities: [
          "horses",
          "private land",
          "hot tub",
          "fire pit",
          "full kitchen",
          "views",
        ],
        areaDescription: "Elk River Valley / Clark area",
        searchUrl:
          "https://www.airbnb.com/s/Steamboat-Springs--Colorado/homes?adults=16",
        notes:
          "Working ranch properties available north of town; incredible setting but 20-30 min from courses",
      },
    ],
    dining: [
      {
        name: "Laundry Kitchen & Cocktails",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Steamboat's best restaurant in a converted laundry building; seasonal menu with Colorado lamb and craft cocktails",
        reservationNeeded: true,
      },
      {
        name: "Ore House at the Pine Grove",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Classic Steamboat steakhouse since the 1970s; prime rib and big group energy",
        reservationNeeded: true,
      },
      {
        name: "Carl's Tavern",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Elevated pub food with great burgers and a bourbon collection; big patio on Lincoln Ave",
        reservationNeeded: false,
      },
      {
        name: "Mambo Italiano",
        style: "italian",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Reliable Italian spot on the mountain; hearty portions perfect for carb-loading between rounds",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "The Tap House",
        vibe: "sports-bar",
        highlight:
          "40+ beers on tap, big screens everywhere, and a rowdy late-night scene on Lincoln Ave",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Schmiggity's Live Music Dance Bar",
        vibe: "dive",
        highlight:
          "Steamboat's late-night institution with live music and a packed dance floor",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Storm Peak Brewing",
        vibe: "brewpub",
        highlight:
          "Small-batch craft brewery with a big local following; rotating taps and food trucks",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Cabin Bar",
        vibe: "saloon",
        highlight:
          "Cozy Western bar that feels like a mountain lodge; whiskey flights and a fireplace",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Old Town Hot Springs",
        type: "spa",
        duration: "2-3 hours",
        pricePerPerson: [15, 25],
        groupFriendly: true,
        highlight:
          "Natural mineral hot springs with a water slide and lap pool; perfect post-round recovery",
        bestFor: "arrival day",
        provider: "Old Town Hot Springs",
      },
      {
        name: "Strawberry Park Hot Springs",
        type: "spa",
        duration: "2-3 hours",
        pricePerPerson: [20, 30],
        groupFriendly: true,
        highlight:
          "Rustic natural hot springs in the forest outside town; clothing-optional after dark",
        bestFor: "rest day",
        provider: "Strawberry Park Hot Springs",
      },
      {
        name: "Yampa River Tubing",
        type: "water-sports",
        duration: "2-3 hours",
        pricePerPerson: [20, 35],
        groupFriendly: true,
        highlight:
          "Float through downtown Steamboat on the Yampa River; the ultimate lazy summer afternoon",
        bestFor: "arrival day",
        provider: "Backdoor Sports",
      },
      {
        name: "Horseback Riding",
        type: "horseback",
        duration: "2-3 hours",
        pricePerPerson: [75, 130],
        groupFriendly: true,
        highlight:
          "Trail rides through the Elk River Valley with real working cowboys as guides",
        bestFor: "rest day",
        provider: "Saddleback Ranch",
      },
      {
        name: "Guided Fly Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [175, 300],
        groupFriendly: true,
        highlight:
          "Float the Yampa or Elk River for wild trout; less crowded than the famous Colorado rivers",
        bestFor: "rest day",
        provider: "Steamboat Flyfisher",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 14],
        hourlyRate: [100, 160],
        providers: [
          "Go Alpine",
          "Storm Mountain Express",
        ],
        notes:
          "HDN airport is 30 min; if flying into DEN, Go Alpine runs shared shuttles (3.5 hrs). Local shuttles available for course transport.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 130],
        providers: [
          "Take a Chef",
          "Steamboat Private Chef Co.",
        ],
        mealTypes: [
          "Colorado lamb dinner",
          "Western BBQ cookout",
          "steakhouse dinner",
          "brunch spread",
        ],
        notes:
          "Private chef availability is solid in summer; many ski-season chefs stay through golf season",
      },
    ],
  },

  // ── Durango, CO ────────────────────────────────────────────────────
  {
    id: "durango-co",
    city: "Durango",
    state: "CO",
    region: "Mountain West",
    tagline: "Southwest Colorado mountain golf with a Wild West soul",
    description:
      "Durango blends the rugged beauty of the San Juan Mountains with a thriving downtown of breweries, restaurants, and shops along Main Avenue. The Durango & Silverton narrow-gauge railroad, world-class rafting on the Animas River, and three distinct golf experiences make this a TDF destination that punches way above its weight.",
    population: "small",
    nearestAirport: {
      code: "DRO",
      name: "Durango-La Plata County Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Dalton Ranch Golf Club",
        tier: "premium",
        greenFeeRange: [85, 139],
        holes: 18,
        par: 72,
        yardage: 6934,
        slope: 136,
        rating: 72.0,
        walkable: false,
        style: "mountain",
        driveMinutes: 10,
        url: "https://www.daltonranch.com",
        highlight:
          "Ken Dye design carved along the Animas River valley with red-rock cliffs and mountain views; best public course in southwest Colorado",
      },
      {
        name: "Glacier Club",
        tier: "bucket-list",
        greenFeeRange: [150, 250],
        holes: 18,
        par: 72,
        yardage: 7045,
        slope: 144,
        rating: 73.4,
        walkable: false,
        style: "mountain",
        driveMinutes: 25,
        url: "https://www.theglacierlodge.com",
        highlight:
          "Ultra-private club with limited resort access; 9,000-foot elevation with jaw-dropping San Juan views and immaculate conditioning",
      },
      {
        name: "Hillcrest Golf Club",
        tier: "solid",
        greenFeeRange: [49, 75],
        holes: 18,
        par: 71,
        yardage: 6817,
        slope: 129,
        rating: 70.8,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.hillcrestgolfclubdurango.com",
        highlight:
          "Classic muni perched above town at Fort Lewis College; cheap, walkable, and stunning panoramic views",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [500, 1500],
        amenities: [
          "hot tub",
          "mountain views",
          "full kitchen",
          "fire pit",
          "multiple bedrooms",
          "deck",
        ],
        areaDescription: "North Durango / Animas Valley",
        searchUrl:
          "https://www.vrbo.com/search?destination=Durango%2C+Colorado&guests=16",
        notes:
          "Animas Valley properties between town and Purgatory offer the best combination of space and proximity to courses",
      },
      {
        type: "cabin",
        sleeps: [8, 14],
        nightlyRange: [400, 1200],
        amenities: [
          "river access",
          "fire pit",
          "hot tub",
          "full kitchen",
          "deck",
        ],
        areaDescription: "Vallecito Lake / Lemon Reservoir area",
        searchUrl:
          "https://www.airbnb.com/s/Durango--Colorado/homes?adults=14",
        notes:
          "Lake cabins are 30-40 min from town but offer incredible seclusion; great for groups wanting a true mountain retreat",
      },
    ],
    dining: [
      {
        name: "Ore House",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Durango's legendary steakhouse since 1972; prime rib, big groups welcome, and a bar that gets rowdy",
        reservationNeeded: true,
      },
      {
        name: "El Moro Spirits & Tavern",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Craft cocktails and elevated bar food in a beautifully restored historic building on Main Ave",
        reservationNeeded: true,
      },
      {
        name: "Steamworks Brewing Company",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Award-winning brewery with a massive space; nachos the size of your head and excellent pale ales",
        reservationNeeded: false,
      },
      {
        name: "Ken & Sue's",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Creative American cuisine and a patio on Main Ave; the pan-seared trout is a must",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "El Rancho Tavern",
        vibe: "dive",
        highlight:
          "Durango's original dive bar; cheap drinks, pool tables, and zero pretension since the 1940s",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Diamond Belle Saloon",
        vibe: "saloon",
        highlight:
          "Ragtime piano, Victorian decor, and strong drinks in the historic Strater Hotel; a must-visit",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Ska Brewing Tasting Room",
        vibe: "brewpub",
        highlight:
          "Iconic Durango brewery with a fun tasting room; Modus Hoperandi is a classic",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Office Spiritorium",
        vibe: "cocktail",
        highlight:
          "Speakeasy-style cocktail bar above Main Ave; creative drinks and a sophisticated vibe",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Durango & Silverton Narrow Gauge Railroad",
        type: "hiking",
        duration: "full day",
        pricePerPerson: [100, 200],
        groupFriendly: true,
        highlight:
          "Historic steam train through the San Juan Mountains to the old mining town of Silverton; an absolute bucket-list experience",
        bestFor: "rest day",
        provider: "Durango & Silverton Railroad",
      },
      {
        name: "Animas River Rafting",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [50, 95],
        groupFriendly: true,
        highlight:
          "Class II-III rapids right through downtown Durango; fun, accessible, and you can walk to lunch after",
        bestFor: "arrival day",
        provider: "Mild to Wild Rafting",
      },
      {
        name: "ATV San Juan Mountain Tour",
        type: "atv",
        duration: "half day",
        pricePerPerson: [100, 175],
        groupFriendly: true,
        highlight:
          "Ride through old mining roads above 10,000 feet with views of Engineer Pass and the San Juans",
        bestFor: "rest day",
        provider: "Durango Rivertrippers",
      },
      {
        name: "Fly Fishing the Animas",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [175, 300],
        groupFriendly: true,
        highlight:
          "Gold Medal trout waters on the Animas River with guided wade trips steps from downtown",
        bestFor: "morning before golf",
        provider: "Duranglers",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [12, 15],
        hourlyRate: [100, 150],
        providers: [
          "Durango Transportation",
          "Buck Horn Limousine",
        ],
        notes:
          "Small town but shuttle services are available; helpful for Glacier Club which is 25 min from town",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 120],
        providers: ["Take a Chef", "Durango Personal Chef Services"],
        mealTypes: [
          "Colorado elk dinner",
          "mountain BBQ",
          "steakhouse dinner",
          "Southwestern brunch",
        ],
        notes:
          "Limited but growing private chef options; book well in advance for summer dates",
      },
    ],
  },

  // ── Park City, UT ──────────────────────────────────────────────────
  {
    id: "park-city-ut",
    city: "Park City",
    state: "UT",
    region: "Mountain West",
    tagline: "Mountain resort golf with SLC nightlife 30 minutes away",
    description:
      "Park City delivers the rare combination of elite mountain golf, a walkable Main Street packed with restaurants and bars, and the convenience of being 30 minutes from a major international airport. Utah's liquor laws are quirky but manageable, and the sheer density of quality courses within a short drive makes planning a multi-round trip dead simple.",
    population: "small",
    nearestAirport: {
      code: "SLC",
      name: "Salt Lake City International Airport",
      driveMinutes: 35,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Canyons Golf Course",
        tier: "premium",
        greenFeeRange: [85, 135],
        holes: 18,
        par: 72,
        yardage: 7100,
        slope: 138,
        rating: 72.6,
        walkable: false,
        style: "mountain",
        driveMinutes: 10,
        url: "https://www.parkcitygolf.com",
        highlight:
          "Dramatic elevation changes and ridgeline views at the Park City Mountain Resort; signature holes perched above the Wasatch",
      },
      {
        name: "Jeremy Ranch Golf & Country Club",
        tier: "premium",
        greenFeeRange: [75, 120],
        holes: 18,
        par: 72,
        yardage: 7129,
        slope: 135,
        rating: 73.0,
        walkable: true,
        style: "mountain",
        driveMinutes: 15,
        url: "https://www.jeremyranch.com",
        highlight:
          "Arnold Palmer design winding through a gorgeous mountain valley; one of the best public-access courses in Utah",
      },
      {
        name: "Park City Golf Club",
        tier: "solid",
        greenFeeRange: [45, 75],
        holes: 18,
        par: 72,
        yardage: 6735,
        slope: 130,
        rating: 71.2,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.parkcitygolf.org",
        highlight:
          "Muni course right in town with walkable terrain and mountain views; incredible value for the area",
      },
      {
        name: "Promontory Club (Pete Dye)",
        tier: "bucket-list",
        greenFeeRange: [200, 350],
        holes: 18,
        par: 72,
        yardage: 7680,
        slope: 147,
        rating: 75.2,
        walkable: false,
        style: "mountain",
        driveMinutes: 20,
        url: "https://www.promontoryclub.com",
        highlight:
          "Ultra-exclusive Pete Dye design at 6,800 feet; member access only but worth calling for reciprocal play — absolute world-class track",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [800, 2500],
        amenities: [
          "hot tub",
          "mountain views",
          "full kitchen",
          "theater room",
          "game room",
          "heated garage",
          "multiple living areas",
        ],
        areaDescription: "Old Town / Park City Mountain Resort base",
        searchUrl:
          "https://www.vrbo.com/search?destination=Park+City%2C+Utah&guests=16",
        notes:
          "Summer rates are 50-70% off Sundance/ski season; massive ski homes with 6-8 bedrooms that are perfect for groups",
      },
      {
        type: "lodge",
        sleeps: [10, 16],
        nightlyRange: [600, 2000],
        amenities: [
          "hot tub",
          "ski-in/ski-out",
          "full kitchen",
          "fire pit",
          "mountain views",
        ],
        areaDescription: "Deer Valley / Silver Lake Village",
        searchUrl:
          "https://www.airbnb.com/s/Park-City--Utah/homes?adults=16",
        notes:
          "Deer Valley properties are upscale but pricey; walkability to Main Street depends on exact location",
      },
    ],
    dining: [
      {
        name: "Handle",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Small-plates concept on Main Street with a phenomenal cocktail program; best food in Park City",
        reservationNeeded: true,
      },
      {
        name: "Grappa Italian Restaurant",
        style: "italian",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Upscale Italian with a gorgeous patio and wine cellar; private dining available for groups",
        reservationNeeded: true,
      },
      {
        name: "Butcher's Chophouse & Bar",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Prime dry-aged steaks and an impressive bourbon bar; the definitive Park City steakhouse",
        reservationNeeded: true,
      },
      {
        name: "Silver Star Cafe",
        style: "casual",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Beloved locals' spot for creative breakfasts and lunches; get there early or wait",
        reservationNeeded: false,
      },
      {
        name: "HSL (Handle Salt Lake)",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Sister restaurant to Handle with seasonal American cuisine; excellent wine list",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "No Name Saloon",
        vibe: "saloon",
        highlight:
          "Park City's most iconic bar on Main Street; buffalo burgers, stuffed animals on the walls, and a rooftop deck",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Spur Bar & Grill",
        vibe: "sports-bar",
        highlight:
          "Live music venue and rowdy bar on Main Street; the best late-night energy in town",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "High West Distillery & Saloon",
        vibe: "whiskey-bar",
        highlight:
          "Utah's first legal distillery since 1870; whiskey flights and a historic saloon setting — do not miss",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "O'Shucks Bar & Grill",
        vibe: "dive",
        highlight:
          "The locals' dive on Main Street; pool, darts, and cheap drinks with zero attitude",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Alpine Coaster & Mountain Activities",
        type: "zipline",
        duration: "2-3 hours",
        pricePerPerson: [25, 65],
        groupFriendly: true,
        highlight:
          "Park City Mountain Resort summer activities including alpine coaster, zipline, and scenic gondola rides",
        bestFor: "arrival day",
        provider: "Park City Mountain Resort",
      },
      {
        name: "Fly Fishing the Provo River",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [200, 350],
        groupFriendly: true,
        highlight:
          "Blue Ribbon trout stream 20 minutes from Park City; guided wade trips with views of the Wasatch",
        bestFor: "rest day",
        provider: "Park City Fly Fishing Guides",
      },
      {
        name: "Mountain Biking at Deer Valley",
        type: "mountain-biking",
        duration: "half day",
        pricePerPerson: [50, 90],
        groupFriendly: true,
        highlight:
          "Lift-served flow trails and cross-country singletrack; all skill levels with rental packages",
        bestFor: "rest day",
        provider: "Deer Valley Resort",
      },
      {
        name: "Horseback Riding",
        type: "horseback",
        duration: "2-3 hours",
        pricePerPerson: [80, 140],
        groupFriendly: true,
        highlight:
          "Trail rides through Wasatch Mountain meadows with views of the Jordanelle Reservoir",
        bestFor: "rest day",
        provider: "Red Pine Adventures",
      },
      {
        name: "Distillery & Brewery Tour",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [15, 40],
        groupFriendly: true,
        highlight:
          "Hit High West Distillery and local breweries; Utah's liquor laws keep ABV low but the quality is legit",
        bestFor: "arrival day",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [125, 200],
        providers: [
          "Canyon Transportation",
          "Park City Transportation",
        ],
        notes:
          "SLC airport is only 35 min; many services run regular shuttles. Great for course-hopping between Park City, Jeremy Ranch, and Canyons.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 140],
        providers: [
          "Park City Private Chefs",
          "Take a Chef",
          "Summit Chef Services",
        ],
        mealTypes: [
          "prime steakhouse dinner",
          "mountain BBQ",
          "brunch spread",
          "sushi night",
        ],
        notes:
          "Well-established private chef market due to the Sundance/resort crowd; excellent quality and availability in summer",
      },
    ],
  },

  // ── Jackson Hole, WY ──────────────────────────────────────────────
  {
    id: "jackson-hole-wy",
    city: "Jackson",
    state: "WY",
    region: "Mountain West",
    tagline: "Elite mountain golf in the shadow of the Tetons",
    description:
      "Jackson Hole is the undisputed heavyweight of mountain golf destinations. The Teton Range provides the most dramatic backdrop in American golf, and the courses here match the scenery — exclusive, immaculate, and unforgettable. It's expensive, but this is the trip your group will talk about for decades. The Town Square nightlife is surprisingly rowdy for a place this upscale.",
    population: "small",
    nearestAirport: {
      code: "JAC",
      name: "Jackson Hole Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["summer"],
    courses: [
      {
        name: "Jackson Hole Golf & Tennis Club",
        tier: "bucket-list",
        greenFeeRange: [250, 400],
        holes: 18,
        par: 72,
        yardage: 7168,
        slope: 140,
        rating: 73.4,
        walkable: true,
        style: "mountain",
        driveMinutes: 10,
        url: "https://www.jhgtc.com",
        highlight:
          "Robert Trent Jones Jr. design with the Grand Teton as your backdrop on nearly every hole; the iconic mountain golf experience in America",
      },
      {
        name: "Teton Pines Resort & Country Club",
        tier: "bucket-list",
        greenFeeRange: [200, 350],
        holes: 18,
        par: 72,
        yardage: 7412,
        slope: 139,
        rating: 74.2,
        walkable: true,
        style: "mountain",
        driveMinutes: 15,
        url: "https://www.tetonpines.com",
        highlight:
          "Arnold Palmer/Ed Seay design through wetlands and aspens with the Tetons looming; resort guests can access this semi-private gem",
      },
      {
        name: "Snake River Sporting Club",
        tier: "bucket-list",
        greenFeeRange: [275, 450],
        holes: 18,
        par: 72,
        yardage: 7100,
        slope: 143,
        rating: 73.8,
        walkable: false,
        style: "mountain",
        driveMinutes: 20,
        url: "https://www.snakeriversc.com",
        highlight:
          "Tom Fazio design along the Snake River; ultra-private with limited access but absolutely world-class conditioning and views",
      },
      {
        name: "3 Creek Ranch Golf Club",
        tier: "bucket-list",
        greenFeeRange: [300, 500],
        holes: 18,
        par: 72,
        yardage: 7100,
        slope: 141,
        rating: 73.6,
        walkable: false,
        style: "mountain",
        driveMinutes: 10,
        url: "https://www.3creekranch.com",
        highlight:
          "Rees Jones design for the ultra-elite; member-only with rare guest access. If you can get on, it's top-100 worthy.",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [1500, 5000],
        amenities: [
          "hot tub",
          "Teton views",
          "full kitchen",
          "fire pit",
          "game room",
          "multiple living areas",
          "heated garage",
        ],
        areaDescription: "Jackson Town / Teton Village corridor",
        searchUrl:
          "https://www.vrbo.com/search?destination=Jackson%2C+Wyoming&guests=16",
        notes:
          "Jackson is expensive — budget $2,000-4,000/night for a house that sleeps 16. Summer is peak season so book 3-6 months ahead.",
      },
      {
        type: "cabin",
        sleeps: [8, 14],
        nightlyRange: [800, 3000],
        amenities: [
          "river access",
          "Teton views",
          "hot tub",
          "full kitchen",
          "fire pit",
        ],
        areaDescription: "Wilson / Teton Pass area",
        searchUrl:
          "https://www.airbnb.com/s/Jackson--Wyoming/homes?adults=14",
        notes:
          "Wilson is 10 min from town and often cheaper; closer to Teton Village and the mountain courses",
      },
    ],
    dining: [
      {
        name: "The Kitchen",
        style: "farm-to-table",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Jackson's best restaurant with a chef's table experience and hyper-local sourcing; wine list is extraordinary",
        reservationNeeded: true,
      },
      {
        name: "Snake River Grill",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Town Square institution with elk tenderloin, bison short ribs, and a wood-burning oven; essential Jackson dining",
        reservationNeeded: true,
      },
      {
        name: "Local Restaurant & Bar",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Elevated casual with a great group scene; locally sourced menu and excellent cocktails in a fun atmosphere",
        reservationNeeded: true,
      },
      {
        name: "Hatch Taqueria & Tequilas",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Upscale tacos and an absurd tequila selection; perfect for a rowdy group dinner before hitting the bars",
        reservationNeeded: false,
      },
      {
        name: "Bin22",
        style: "upscale",
        priceRange: "$$$",
        capacity: "small",
        highlight:
          "Wine bar and small plates in an intimate setting; phenomenal wine list curated by Jackson's best sommelier",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Million Dollar Cowboy Bar",
        vibe: "saloon",
        highlight:
          "The most famous bar in Wyoming — saddle barstools, live country music, and a raucous dance floor on the Town Square",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Silver Dollar Bar",
        vibe: "whiskey-bar",
        highlight:
          "2,032 silver dollars inlaid in the bar top at the Wort Hotel; classic cocktails and live music",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Rose",
        vibe: "cocktail",
        highlight:
          "Jackson's best cocktail bar tucked behind Pink Garter Theatre; craft cocktails and a sophisticated vibe",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Roadhouse Brewing",
        vibe: "brewpub",
        highlight:
          "Craft brewery with a big patio and Jackson's best IPA; chill vibe before the Town Square gets rowdy",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Snake River Whitewater Rafting",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [75, 130],
        groupFriendly: true,
        highlight:
          "Class III rapids through the Snake River Canyon with Teton views; the classic Jackson Hole adventure",
        bestFor: "rest day",
        provider: "Dave Hansen Whitewater",
      },
      {
        name: "Grand Teton National Park Tour",
        type: "hiking",
        duration: "full day",
        pricePerPerson: [0, 35],
        groupFriendly: true,
        highlight:
          "Drive the Teton Park Road with stops at Jenny Lake and the Cathedral Group turnouts; wildlife everywhere",
        bestFor: "rest day",
      },
      {
        name: "Snake River Fly Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [275, 450],
        groupFriendly: true,
        highlight:
          "World-class cutthroat trout fishing on the Snake River with Teton views; bucket-list fly fishing",
        bestFor: "rest day",
        provider: "Jackson Hole Anglers",
      },
      {
        name: "Horseback Trail Ride",
        type: "horseback",
        duration: "2-3 hours",
        pricePerPerson: [85, 150],
        groupFriendly: true,
        highlight:
          "Ride through Bridger-Teton National Forest with Grand Teton views; cowboy culture at its finest",
        bestFor: "rest day",
        provider: "Spring Creek Ranch",
      },
      {
        name: "Shooting Range Experience",
        type: "shooting",
        duration: "2-3 hours",
        pricePerPerson: [100, 200],
        groupFriendly: true,
        highlight:
          "Sporting clays and rifle range in the Wyoming wilderness; a natural fit for the cowboy setting",
        bestFor: "morning before golf",
        provider: "Jackson Hole Shooting Experience",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [175, 275],
        providers: [
          "Jackson Hole Limo & Transportation",
          "Teton Luxury Transportation",
        ],
        notes:
          "JAC airport is only 10 min from town — rare for a mountain destination. Sprinter vans are essential for course access as most clubs are 15-20 min from town.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [100, 200],
        providers: [
          "Jackson Hole Private Chefs",
          "Take a Chef",
          "Teton Chef Co.",
        ],
        mealTypes: [
          "bison tenderloin dinner",
          "elk and game feast",
          "ranch BBQ",
          "gourmet brunch",
          "sushi and raw bar",
        ],
        notes:
          "Excellent private chef scene catering to the ultra-wealthy Jackson crowd; expect to pay premium prices but get extraordinary quality",
      },
    ],
  },

  // ── Deadwood, SD ───────────────────────────────────────────────────
  {
    id: "deadwood-sd",
    city: "Deadwood",
    state: "SD",
    region: "Mountain West",
    tdfTested: true,
    tdfYear: 2025,
    tagline: "Wild West casino town with Black Hills golf and zero pretension",
    description:
      "Deadwood is the ultimate TDF sleeper — a historic Wild West gambling town in the Black Hills with surprisingly solid golf, casino nightlife that runs til 2am, and a price point that makes the whole trip absurdly affordable. We tested it in 2025 and the boys couldn't stop talking about it. ATVs, casinos, steaks, and golf for half the price of Colorado.",
    population: "tiny",
    nearestAirport: {
      code: "RAP",
      name: "Rapid City Regional Airport",
      driveMinutes: 55,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Boulder Canyon Country Club",
        tier: "solid",
        greenFeeRange: [45, 75],
        holes: 9,
        par: 36,
        yardage: 3200,
        slope: 123,
        rating: 35.4,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.bouldercanyoncc.com",
        highlight:
          "Tight 9-hole gem carved through Boulder Canyon; play it twice for a quick 18 with ponderosa pines and creek crossings",
      },
      {
        name: "Elkhorn Ridge Golf Club",
        tier: "premium",
        greenFeeRange: [55, 89],
        holes: 9,
        par: 36,
        yardage: 3400,
        slope: 127,
        rating: 36.2,
        walkable: true,
        style: "mountain",
        driveMinutes: 20,
        highlight:
          "Beautiful Black Hills 9-hole course with dramatic elevation changes and ponderosa forests",
      },
      {
        name: "Spearfish Canyon Country Club",
        tier: "solid",
        greenFeeRange: [40, 65],
        holes: 18,
        par: 71,
        yardage: 6138,
        slope: 121,
        rating: 69.0,
        walkable: true,
        style: "mountain",
        driveMinutes: 25,
        highlight:
          "Scenic course in Spearfish Canyon; shorter but character-filled with creek crossings and canyon walls",
      },
      {
        name: "Hart Ranch Golf Course",
        tier: "solid",
        greenFeeRange: [39, 59],
        holes: 18,
        par: 72,
        yardage: 6452,
        slope: 126,
        rating: 70.2,
        walkable: true,
        style: "parkland",
        driveMinutes: 55,
        url: "https://www.hartranchgolf.com",
        highlight:
          "Best full 18 in the area; well-maintained Rapid City course with a links feel on the back nine",
      },
    ],
    lodging: [
      {
        type: "lodge",
        sleeps: [10, 16],
        nightlyRange: [400, 1200],
        amenities: [
          "hot tub",
          "game room",
          "full kitchen",
          "fire pit",
          "deck",
          "mountain views",
        ],
        areaDescription: "Deadwood Gulch / Upper Main Street",
        searchUrl:
          "https://www.vrbo.com/search?destination=Deadwood%2C+South+Dakota&guests=16",
        notes:
          "Large cabin-style lodges in the Black Hills near Deadwood; very affordable compared to other mountain destinations",
      },
      {
        type: "cabin",
        sleeps: [8, 14],
        nightlyRange: [250, 800],
        amenities: [
          "hot tub",
          "fire pit",
          "full kitchen",
          "deck",
          "forest setting",
        ],
        areaDescription: "Lead / Terry Peak area",
        searchUrl:
          "https://www.airbnb.com/s/Deadwood--South-Dakota/homes?adults=14",
        notes:
          "Lead is 5 min from Deadwood with great cabin options; Terry Peak ski area has large properties at summer discount prices",
      },
    ],
    dining: [
      {
        name: "Deadwood Legends Steakhouse",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Prime steaks in the Franklin Hotel; old-school steakhouse with big group capacity and a historic setting",
        reservationNeeded: true,
      },
      {
        name: "Mustang Sally's",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Solid BBQ and big portions in a fun saloon atmosphere; great for groups that want meat and beer",
        reservationNeeded: false,
      },
      {
        name: "The Deadwood Social Club",
        style: "italian",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Upscale Italian above the historic Saloon #10; surprisingly excellent pasta and wine in the Wild West",
        reservationNeeded: true,
      },
      {
        name: "Cheyenne Crossing",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Legendary Black Hills stop for Indian tacos, burgers, and pie in Spearfish Canyon; worth the drive",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Saloon #10",
        vibe: "saloon",
        highlight:
          "Where Wild Bill Hickok was shot; sawdust floors, live reenactments, and the most famous bar in the Dakotas",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Mustang Sally's Bar",
        vibe: "dive",
        highlight:
          "Rowdy dive bar with live music, cheap drinks, and a packed dance floor on weekends",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Cadillac Jack's Casino & Bar",
        vibe: "casino-bar",
        highlight:
          "The biggest casino in Deadwood with slots, table games, and a sports bar; easy to lose a whole night here",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Tin Lizzie Gaming Resort Bar",
        vibe: "casino-bar",
        highlight:
          "Casino bar with sports betting, cocktails, and a more upscale vibe than the Main Street dives",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Black Hills ATV Tours",
        type: "atv",
        duration: "half day",
        pricePerPerson: [75, 150],
        groupFriendly: true,
        highlight:
          "Rip through the Black Hills on ATVs with canyon views and old mining trails; the boys' favorite activity from the 2025 trip",
        bestFor: "rest day",
        provider: "Mad Mountain Adventures",
      },
      {
        name: "Casino Crawl on Main Street",
        type: "casino",
        duration: "2-3 hours",
        pricePerPerson: [0, 100],
        groupFriendly: true,
        highlight:
          "Walk Main Street and hit 20+ casinos; low-stakes blackjack, poker, and slots everywhere",
        bestFor: "arrival day",
      },
      {
        name: "Mount Rushmore & Crazy Horse Tour",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [10, 30],
        groupFriendly: true,
        highlight:
          "Both monuments are within 30-45 min; combine for a half-day of Black Hills sightseeing",
        bestFor: "rest day",
      },
      {
        name: "Mickelson Trail Mountain Biking",
        type: "mountain-biking",
        duration: "half day",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "109-mile converted railroad trail through tunnels and trestles; rent bikes and ride the best sections",
        bestFor: "rest day",
        provider: "Deadwood Bikes",
      },
      {
        name: "Broken Boot Gold Mine Tour",
        type: "hiking",
        duration: "1-2 hours",
        pricePerPerson: [10, 15],
        groupFriendly: true,
        highlight:
          "Quick underground mine tour in Deadwood; fun history and a chance to pan for gold",
        bestFor: "morning before golf",
        provider: "Broken Boot Gold Mine",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [12, 15],
        hourlyRate: [80, 130],
        providers: [
          "Deadwood Trolley",
          "Black Hills Transportation",
        ],
        notes:
          "Deadwood trolley runs through town but private shuttles are best for course transport. RAP airport is 55 min.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [50, 95],
        providers: ["Take a Chef", "Black Hills Catering"],
        mealTypes: [
          "bison steakhouse dinner",
          "BBQ cookout",
          "breakfast spread",
          "South Dakota game dinner",
        ],
        notes:
          "Limited private chef options but local catering companies fill the gap well; very affordable compared to resort towns",
      },
    ],
  },

  // ── McCall, ID ─────────────────────────────────────────────────────
  {
    id: "mccall-id",
    city: "McCall",
    state: "ID",
    region: "Mountain West",
    tagline: "Tiny mountain lake town with perfect TDF energy",
    description:
      "McCall is a hidden gem on Payette Lake in the Idaho mountains — a tiny town with a spectacular lakefront, two golf options, and the kind of laid-back mountain vibe that makes a TDF trip feel like a vacation instead of a production. The course selection is limited, but the lake activities, fishing, and sheer beauty make up for it. This is for groups that want to unplug.",
    population: "tiny",
    nearestAirport: {
      code: "BOI",
      name: "Boise Airport",
      driveMinutes: 150,
    },
    bestSeasons: ["summer"],
    courses: [
      {
        name: "McCall Golf Club",
        tier: "solid",
        greenFeeRange: [45, 75],
        holes: 18,
        par: 72,
        yardage: 6527,
        slope: 126,
        rating: 70.4,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.mccallgolfclub.com",
        highlight:
          "Classic mountain muni with ponderosa pines, a creek running through, and views of the surrounding peaks; walkable and well-conditioned",
      },
      {
        name: "Whitetail Club",
        tier: "premium",
        greenFeeRange: [100, 175],
        holes: 18,
        par: 72,
        yardage: 6858,
        slope: 134,
        rating: 72.0,
        walkable: false,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.whitetailclub.com",
        highlight:
          "Private club with limited guest access through Shore Lodge; Gene Bates design with lakefront holes and mountain backdrops",
      },
    ],
    lodging: [
      {
        type: "lakehouse",
        sleeps: [10, 16],
        nightlyRange: [500, 1800],
        amenities: [
          "lake access",
          "dock",
          "kayaks",
          "hot tub",
          "full kitchen",
          "fire pit",
          "mountain views",
        ],
        areaDescription: "Payette Lake / West side",
        searchUrl:
          "https://www.vrbo.com/search?destination=McCall%2C+Idaho&guests=16",
        notes:
          "Lakefront properties book fast for summer; Payette Lake is stunning and having a dock is a game-changer for the group",
      },
      {
        type: "cabin",
        sleeps: [8, 14],
        nightlyRange: [300, 1000],
        amenities: [
          "hot tub",
          "fire pit",
          "full kitchen",
          "mountain views",
          "deck",
        ],
        areaDescription: "Downtown McCall / Lake Street area",
        searchUrl:
          "https://www.airbnb.com/s/McCall--Idaho/homes?adults=14",
        notes:
          "Downtown cabins put you walking distance to restaurants and bars; smaller but convenient",
      },
    ],
    dining: [
      {
        name: "The Narrows Steakhouse",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Shore Lodge's signature restaurant overlooking Payette Lake; prime steaks and fresh Idaho trout with lake views",
        reservationNeeded: true,
      },
      {
        name: "Salmon River Brewery",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "McCall's craft brewery with solid pub food and house beers; the gathering spot for locals and visitors",
        reservationNeeded: false,
      },
      {
        name: "Rupert's at Hotel McCall",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Lakefront dining with a creative seasonal menu; excellent brunch on the patio overlooking the lake",
        reservationNeeded: true,
      },
      {
        name: "My Father's Place",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "McCall institution for burgers, steaks, and cold beer; nothing fancy but the groups love it",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "The Yacht Club",
        vibe: "dive",
        highlight:
          "McCall's legendary dive bar right on the lake; pool tables, cheap drinks, and a patio with lake views",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Salmon River Brewery Taproom",
        vibe: "brewpub",
        highlight:
          "Rotating taps of house-brewed beers in a laid-back setting; the default pre-dinner stop",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Stacey's Bar",
        vibe: "dive",
        highlight:
          "No-frills local bar with karaoke nights and a jukebox; the kind of place where everyone knows each other",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Payette Lake Boat Rental",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [40, 80],
        groupFriendly: true,
        highlight:
          "Rent a pontoon or speedboat and cruise the crystal-clear waters of Payette Lake; bring coolers",
        bestFor: "rest day",
        provider: "McCall Boat Rentals",
      },
      {
        name: "Kayaking Payette Lake",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [25, 50],
        groupFriendly: true,
        highlight:
          "Paddle the shoreline of one of Idaho's clearest mountain lakes with views of the surrounding peaks",
        bestFor: "morning before golf",
        provider: "Backwoods Adventures",
      },
      {
        name: "Fly Fishing the South Fork",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [175, 300],
        groupFriendly: true,
        highlight:
          "Guided trips on the South Fork of the Salmon River for wild trout; remote and beautiful",
        bestFor: "rest day",
        provider: "McCall Angler",
      },
      {
        name: "Horseback Trail Ride",
        type: "horseback",
        duration: "2-3 hours",
        pricePerPerson: [65, 120],
        groupFriendly: true,
        highlight:
          "Ride through the Payette National Forest with meadow and mountain views; all skill levels",
        bestFor: "rest day",
        provider: "Warren Wagon Road Outfitters",
      },
      {
        name: "Brundage Mountain Hiking",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [0, 20],
        groupFriendly: true,
        highlight:
          "Take the scenic chairlift up Brundage Mountain for wildflower hiking with panoramic valley views",
        bestFor: "rest day",
        provider: "Brundage Mountain Resort",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 14],
        hourlyRate: [100, 150],
        providers: ["McCall Shuttle", "Salmon River Shuttle"],
        notes:
          "The 2.5 hour drive from Boise is the biggest logistics challenge; arrange airport shuttle in advance. Once in McCall, everything is 5-10 min away.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 110],
        providers: ["Take a Chef", "McCall Private Dining"],
        mealTypes: [
          "Idaho trout dinner",
          "mountain BBQ cookout",
          "steakhouse dinner",
          "lakeside brunch",
        ],
        notes:
          "Small private chef market but growing; Shore Lodge concierge can help arrange in-cabin dining for groups",
      },
    ],
  },

  // ── Bozeman, MT ─────────────────────────────────────────────────────
  {
    id: "bozeman-mt",
    city: "Bozeman",
    state: "MT",
    region: "Mountain West",
    tagline: "College-town energy meets world-class Montana golf",
    description:
      "Bozeman has exploded in recent years but kept its Montana soul — a legit downtown bar scene, multiple solid courses within 20 minutes, and Yellowstone an hour south. The Bridger Range backdrop is unreal, and the restaurant scene punches way above its weight for a town this size.",
    population: "medium",
    nearestAirport: {
      code: "BZN",
      name: "Bozeman Yellowstone International Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Bridger Creek Golf Course",
        tier: "solid",
        greenFeeRange: [42, 62],
        holes: 18,
        par: 71,
        yardage: 6544,
        slope: 128,
        rating: 70.1,
        walkable: true,
        style: "mountain",
        driveMinutes: 10,
        url: "https://www.bridgercreek.com",
        highlight:
          "Best public value in the valley; Bridger Mountain views from every hole and a fun, rolling layout",
      },
      {
        name: "Valley View Golf Course",
        tier: "budget",
        greenFeeRange: [28, 42],
        holes: 18,
        par: 72,
        yardage: 6300,
        slope: 119,
        rating: 68.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.valleyviewgolfcourse.com",
        highlight:
          "Budget-friendly muni with wide fairways; perfect warm-up or hangover round",
      },
      {
        name: "Cottonwood Hills Golf Course",
        tier: "solid",
        greenFeeRange: [45, 65],
        holes: 18,
        par: 70,
        yardage: 6326,
        slope: 125,
        rating: 69.4,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.cottonwoodhills.com",
        highlight:
          "Tight tree-lined fairways with a links-style finish; the most centrally located course in Bozeman",
      },
      {
        name: "Riverside Country Club",
        tier: "premium",
        greenFeeRange: [70, 95],
        holes: 18,
        par: 72,
        yardage: 6800,
        slope: 131,
        rating: 71.6,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.riversidecountryclub.com",
        highlight:
          "Semi-private gem along the East Gallatin River; best-conditioned greens in the valley",
      },
      {
        name: "Black Bull Golf Community",
        tier: "premium",
        greenFeeRange: [85, 135],
        holes: 18,
        par: 72,
        yardage: 7100,
        slope: 138,
        rating: 73.4,
        walkable: false,
        style: "mountain",
        driveMinutes: 10,
        url: "https://www.blackbullgolf.com",
        highlight:
          "Tom Weiskopf design with dramatic elevation changes and panoramic Gallatin Valley views; limited public times",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [600, 1600],
        amenities: [
          "hot tub",
          "fire pit",
          "full kitchen",
          "mountain views",
          "game room",
          "garage",
        ],
        areaDescription: "South Bozeman / Meadow Village area",
        searchUrl:
          "https://www.vrbo.com/search?destination=Bozeman%2C+Montana&guests=16",
        notes:
          "Big houses available in the newer developments south of town; 10-15 min to downtown and courses",
      },
      {
        type: "lodge",
        sleeps: [12, 20],
        nightlyRange: [900, 2200],
        amenities: [
          "hot tub",
          "fire pit",
          "full kitchen",
          "mountain views",
          "multiple living areas",
          "grill",
        ],
        areaDescription: "Gallatin Gateway / Gallatin Canyon",
        searchUrl:
          "https://www.airbnb.com/s/Bozeman--Montana/homes?adults=16",
        notes:
          "River lodges along the Gallatin Canyon offer seclusion and stunning scenery; 20-30 min to town",
      },
    ],
    dining: [
      {
        name: "Open Range",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Montana-raised beef in a rustic-elegant downtown space; large party reservations available upstairs",
        reservationNeeded: true,
      },
      {
        name: "Blackbird Kitchen",
        style: "italian",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Wood-fired pizzas and handmade pasta with a killer cocktail program; downtown staple",
        reservationNeeded: true,
      },
      {
        name: "Montana Ale Works",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Massive converted railroad warehouse; craft beer, elevated pub food, and room for big groups",
        reservationNeeded: false,
      },
      {
        name: "Revelry",
        style: "farm-to-table",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Bozeman's best fine dining; seasonal tasting menus with local ingredients and an outstanding wine list",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "The Haufbrau",
        vibe: "dive",
        highlight:
          "Legendary Main Street dive since 1969; cheap drinks, pool tables, and zero attitude",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Plonk Wine Bar",
        vibe: "cocktail",
        highlight:
          "Upscale wine and cocktail bar with a sophisticated vibe; great for a post-dinner nightcap",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Bozeman Brewing Company",
        vibe: "brewpub",
        highlight:
          "Local craft brewery with a big taproom and outdoor space; Bozone Amber is a classic",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Bar IX",
        vibe: "cocktail",
        highlight:
          "Craft cocktails in a speakeasy-inspired space; late-night DJ sets and dancing on weekends",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Gallatin River Whitewater Rafting",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [55, 95],
        groupFriendly: true,
        highlight:
          "Class III-IV rapids through the Gallatin Canyon made famous by A River Runs Through It",
        bestFor: "rest day",
        provider: "Montana Whitewater",
      },
      {
        name: "Gallatin River Fly Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [175, 300],
        groupFriendly: true,
        highlight:
          "Blue-ribbon trout water with guided wade or float trips; incredible summer hatches",
        bestFor: "rest day",
        provider: "Montana Angler",
      },
      {
        name: "Bozeman Brewery Trail",
        type: "brewery",
        duration: "3-4 hours",
        pricePerPerson: [20, 50],
        groupFriendly: true,
        highlight:
          "Hit 5+ craft breweries all within a short walk or ride; MAP Brewing has the best patio in town",
        bestFor: "arrival day",
      },
      {
        name: "Yellowstone National Park Day Trip",
        type: "hiking",
        duration: "full day",
        pricePerPerson: [0, 35],
        groupFriendly: true,
        highlight:
          "North entrance of Yellowstone is about 90 minutes south; geysers, wildlife, and bragging rights",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [125, 175],
        providers: [
          "Bozeman Party Bus",
          "Greater Yellowstone Transportation",
        ],
        notes:
          "Sprinter vans are the standard; some providers offer dedicated golf packages with cooler service",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 120],
        providers: ["Take a Chef", "Bozeman Private Chef Co."],
        mealTypes: [
          "Montana bison steak dinner",
          "BBQ cookout",
          "trout and game dinner",
          "brunch spread",
        ],
        notes:
          "Growing private chef market; farm-to-table focus with local bison, elk, and trout",
      },
    ],
  },

  // ── Missoula, MT ────────────────────────────────────────────────────
  {
    id: "missoula-mt",
    city: "Missoula",
    state: "MT",
    region: "Mountain West",
    tagline: "Blue-collar cool with sneaky-good mountain golf",
    description:
      "Missoula is a funky college town at the confluence of three rivers with a surprisingly deep golf scene, a bar district that rages, and some of the best fly fishing on Earth within minutes. The University of Montana energy keeps the nightlife lively and the prices reasonable.",
    population: "medium",
    nearestAirport: {
      code: "MSO",
      name: "Missoula Montana Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Canyon River Golf Club",
        tier: "premium",
        greenFeeRange: [55, 85],
        holes: 18,
        par: 71,
        yardage: 6800,
        slope: 132,
        rating: 71.8,
        walkable: false,
        style: "mountain",
        driveMinutes: 15,
        url: "https://www.canyonrivergc.com",
        highlight:
          "Stunning Steve Jones design along the Clark Fork River; risk/reward layout with canyon views",
      },
      {
        name: "The Ranch Club Golf Course",
        tier: "solid",
        greenFeeRange: [45, 72],
        holes: 18,
        par: 72,
        yardage: 6602,
        slope: 127,
        rating: 70.2,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.theranchclub.net",
        highlight:
          "Well-conditioned course through ponderosa pines with a great practice facility and affordable rates",
      },
      {
        name: "Larchmont Golf Course",
        tier: "budget",
        greenFeeRange: [30, 45],
        holes: 18,
        par: 72,
        yardage: 7100,
        slope: 124,
        rating: 72.4,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.larchmontgolf.com",
        highlight:
          "Missoula's beloved muni; deceptively long and great value, right in town",
      },
      {
        name: "King Ranch Golf Course",
        tier: "solid",
        greenFeeRange: [40, 60],
        holes: 18,
        par: 72,
        yardage: 6600,
        slope: 126,
        rating: 70.0,
        walkable: true,
        style: "mountain",
        driveMinutes: 25,
        url: "https://www.kingranchgolf.com",
        highlight:
          "Hidden gem in the Bitterroot Valley with mountain views and a challenging layout",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [500, 1300],
        amenities: [
          "hot tub",
          "full kitchen",
          "fire pit",
          "mountain views",
          "game room",
          "grill",
        ],
        areaDescription: "South Hills / Rattlesnake neighborhood",
        searchUrl:
          "https://www.vrbo.com/search?destination=Missoula%2C+Montana&guests=16",
        notes:
          "Large homes in the hillside neighborhoods offer mountain views and are 10 min to downtown and courses",
      },
      {
        type: "cabin",
        sleeps: [8, 14],
        nightlyRange: [400, 1100],
        amenities: [
          "riverfront",
          "hot tub",
          "full kitchen",
          "fire pit",
          "kayaks",
          "grill",
        ],
        areaDescription: "Bitterroot Valley / Clark Fork River",
        searchUrl:
          "https://www.airbnb.com/s/Missoula--Montana/homes?adults=14",
        notes:
          "River cabins south along the Bitterroot offer great fishing access; combine two for bigger groups",
      },
    ],
    dining: [
      {
        name: "The Pearl Cafe",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Missoula's best restaurant; locally sourced seasonal menus in an intimate downtown space",
        reservationNeeded: true,
      },
      {
        name: "Scotty's Table",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "French-inspired American cuisine with excellent charcuterie and a solid wine list; private dining available",
        reservationNeeded: true,
      },
      {
        name: "Iron Horse Brew Pub",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Massive downtown brewpub with house beers, big burgers, and space for 16 easy",
        reservationNeeded: false,
      },
      {
        name: "Biga Pizza",
        style: "italian",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Legendary wood-fired pizza on the Hip Strip; always packed for a reason",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "The Rhino",
        vibe: "dive",
        highlight:
          "Missoula's best dive bar; strong pours, live music, and a crowd that doesn't want to go home",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Top Hat Lounge",
        vibe: "cocktail",
        highlight:
          "Live music venue with craft cocktails and a great patio; indie acts and local bands",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Draught Works Brewery",
        vibe: "brewpub",
        highlight:
          "Huge outdoor beer garden with food trucks and live music; the summer hangout in Missoula",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Charlie B's",
        vibe: "dive",
        highlight:
          "Classic Missoula institution; cheap beer, strong community vibes, open late every night",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Clark Fork River Float",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [0, 25],
        groupFriendly: true,
        highlight:
          "Float right through downtown Missoula on tubes or kayaks; beer in hand optional but recommended",
        bestFor: "arrival day",
      },
      {
        name: "Blackfoot River Fly Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [175, 300],
        groupFriendly: true,
        highlight:
          "THE river from A River Runs Through It; guided trips on legendary trout water",
        bestFor: "rest day",
        provider: "Grizzly Hackle Fly Shop",
      },
      {
        name: "Missoula Brewery Tour",
        type: "brewery",
        duration: "3-4 hours",
        pricePerPerson: [15, 40],
        groupFriendly: true,
        highlight:
          "10+ breweries within walking distance downtown; self-guided crawl or hire a van",
        bestFor: "arrival day",
      },
      {
        name: "Alberton Gorge Whitewater Rafting",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [55, 90],
        groupFriendly: true,
        highlight:
          "Class III rapids through a stunning canyon 30 min west of town; a perfect group activity",
        bestFor: "rest day",
        provider: "Montana River Guides",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [110, 160],
        providers: [
          "Missoula Party Bus",
          "Adventure Shuttle",
        ],
        notes:
          "Smaller market than Bozeman but sprinter vans are available; book 2-3 weeks ahead in summer",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 110],
        providers: ["Take a Chef", "Missoula Private Dining"],
        mealTypes: [
          "Montana steak dinner",
          "river fish cookout",
          "BBQ spread",
          "brunch",
        ],
        notes:
          "Smaller private chef scene; several local catering companies also do in-home group dinners",
      },
    ],
  },

  // ── Colorado Springs, CO ────────────────────────────────────────────
  {
    id: "colorado-springs-co",
    city: "Colorado Springs",
    state: "CO",
    region: "Mountain West",
    tagline: "Military-town muscle with championship courses at altitude",
    description:
      "Colorado Springs has elite golf pedigree — The Broadmoor has hosted multiple majors — plus a deep bench of public courses, a revitalized downtown, and Pikes Peak as the backdrop. It's one of the most accessible Mountain West destinations with a direct airport and big-city amenities at mountain-town prices.",
    population: "medium",
    nearestAirport: {
      code: "COS",
      name: "Colorado Springs Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "The Broadmoor Golf Club - East Course",
        tier: "bucket-list",
        greenFeeRange: [200, 350],
        holes: 18,
        par: 72,
        yardage: 7091,
        slope: 142,
        rating: 73.2,
        walkable: false,
        style: "resort",
        driveMinutes: 10,
        url: "https://www.broadmoor.com/golf",
        highlight:
          "Host of multiple major championships; Robert Trent Jones Sr. design with Cheyenne Mountain views",
      },
      {
        name: "The Broadmoor Golf Club - West Course",
        tier: "premium",
        greenFeeRange: [150, 250],
        holes: 18,
        par: 72,
        yardage: 6781,
        slope: 137,
        rating: 72.0,
        walkable: false,
        style: "mountain",
        driveMinutes: 10,
        url: "https://www.broadmoor.com/golf",
        highlight:
          "Mountain course with dramatic elevation changes; tighter and more demanding than the East",
      },
      {
        name: "Cheyenne Shadows Golf Course",
        tier: "solid",
        greenFeeRange: [35, 55],
        holes: 18,
        par: 72,
        yardage: 6781,
        slope: 130,
        rating: 71.0,
        walkable: true,
        style: "mountain",
        driveMinutes: 15,
        url: "https://www.myairforcelife.com/golf",
        highlight:
          "Fort Carson military course open to public; outstanding mountain views and incredible value",
      },
      {
        name: "Garden of the Gods Club",
        tier: "premium",
        greenFeeRange: [100, 175],
        holes: 18,
        par: 72,
        yardage: 6650,
        slope: 134,
        rating: 71.5,
        walkable: false,
        style: "mountain",
        driveMinutes: 10,
        url: "https://www.gardenofthegodsclub.com",
        highlight:
          "Stunning red rock formations backdrop; resort course with jaw-dropping scenery on every hole",
      },
      {
        name: "Patty Jewett Golf Course",
        tier: "budget",
        greenFeeRange: [28, 45],
        holes: 18,
        par: 72,
        yardage: 6900,
        slope: 126,
        rating: 70.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.pattyjewett.com",
        highlight:
          "Historic muni opened in 1898; one of the oldest public courses west of the Mississippi",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [500, 1500],
        amenities: [
          "hot tub",
          "mountain views",
          "full kitchen",
          "game room",
          "fire pit",
          "garage",
        ],
        areaDescription: "Broadmoor / Cheyenne Canyon area",
        searchUrl:
          "https://www.vrbo.com/search?destination=Colorado+Springs%2C+Colorado&guests=16",
        notes:
          "Large luxury homes near The Broadmoor with mountain views; great selection for big groups",
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [400, 1100],
        amenities: [
          "hot tub",
          "full kitchen",
          "mountain views",
          "grill",
          "fire pit",
          "patio",
        ],
        areaDescription: "Old Colorado City / Manitou Springs area",
        searchUrl:
          "https://www.airbnb.com/s/Colorado-Springs--Colorado/homes?adults=16",
        notes:
          "Funky homes near Manitou Springs with walkable bars and restaurants; 15 min to courses",
      },
    ],
    dining: [
      {
        name: "The Rabbit Hole",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Multi-level downtown space with creative cocktails and elevated American fare; private event space upstairs",
        reservationNeeded: true,
      },
      {
        name: "Joseph's Fine Dining",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Classic fine dining steakhouse in downtown; prime cuts and a deep wine cellar",
        reservationNeeded: true,
      },
      {
        name: "Shuga's",
        style: "casual",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Funky downtown spot with creative cocktails and eclectic food; the mixology is world-class",
        reservationNeeded: false,
      },
      {
        name: "Front Range Barbeque",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Texas-style smoked meats in a casual setting; can handle big groups with platters to share",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Jack Quinn's Irish Pub",
        vibe: "sports-bar",
        highlight:
          "Massive Irish pub downtown with live music, multiple bars, and a rooftop patio; handles 16 easy",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Oskar Blues Grill & Brew",
        vibe: "brewpub",
        highlight:
          "The original Oskar Blues location; Dale's Pale Ale on tap with a big patio and live music",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Copperhead Road Bar & Nightclub",
        vibe: "honky-tonk",
        highlight:
          "Country bar with live music, line dancing, and a big dance floor; gets rowdy on weekends",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Tony's A Downtown Bar",
        vibe: "dive",
        highlight:
          "Classic downtown dive with cheap drinks and a no-frills vibe; the late-night move",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Garden of the Gods",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 0],
        groupFriendly: true,
        highlight:
          "Iconic red rock formations with easy trails and stunning photo ops; free admission",
        bestFor: "morning before golf",
      },
      {
        name: "Pikes Peak Cog Railway",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [40, 60],
        groupFriendly: true,
        highlight:
          "Ride the cog railway to the 14,115-foot summit of Pikes Peak; America's Mountain",
        bestFor: "rest day",
        provider: "Broadmoor Manitou & Pikes Peak Cog Railway",
      },
      {
        name: "Whitewater Rafting on the Arkansas River",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [55, 100],
        groupFriendly: true,
        highlight:
          "Bighorn Sheep Canyon offers Class III rapids an hour from town; great group activity",
        bestFor: "rest day",
        provider: "Echo Canyon River Expeditions",
      },
      {
        name: "Shooting Range at Dragonman's",
        type: "shooting",
        duration: "2-3 hours",
        pricePerPerson: [30, 80],
        groupFriendly: true,
        highlight:
          "Legendary outdoor range with machine gun rentals and a military museum; only in Colorado Springs",
        bestFor: "arrival day",
        provider: "Dragonman's",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 30],
        hourlyRate: [175, 300],
        providers: [
          "Colorado Springs Party Bus",
          "Peak View Limousine",
          "Front Range Party Bus",
        ],
        notes:
          "Full-size party buses available; bigger market than most mountain towns with more options and competitive pricing",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [55, 100],
        providers: ["Take a Chef", "Table Mountain Chef", "Colorado Private Chef"],
        mealTypes: [
          "Colorado lamb dinner",
          "steak cookout",
          "BBQ spread",
          "brunch",
        ],
        notes:
          "Solid private chef market due to Broadmoor area wealth; many cater to large group events",
      },
    ],
  },

  // ── Breckenridge, CO ────────────────────────────────────────────────
  {
    id: "breckenridge-co",
    city: "Breckenridge",
    state: "CO",
    region: "Mountain West",
    tagline: "High-altitude golf in Colorado's most iconic ski town",
    description:
      "Breck's walkable Main Street, deep bar scene, and stunning mountain setting make it an elite summer golf trip base. You're playing at 9,300+ feet — the ball flies forever — and the town has more restaurants and nightlife per capita than almost anywhere in the Rockies. Jack Nicklaus designed the crown jewel course here.",
    population: "tiny",
    nearestAirport: {
      code: "DEN",
      name: "Denver International Airport",
      driveMinutes: 120,
    },
    bestSeasons: ["summer"],
    courses: [
      {
        name: "Breckenridge Golf Club",
        tier: "premium",
        greenFeeRange: [80, 155],
        holes: 27,
        par: 72,
        yardage: 7279,
        slope: 146,
        rating: 73.6,
        walkable: false,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.breckenridgegolfclub.com",
        highlight:
          "Jack Nicklaus design at 9,324 feet; 27 holes with the Bear nine delivering the most dramatic mountain golf in Colorado",
      },
      {
        name: "Keystone Ranch Golf Course",
        tier: "premium",
        greenFeeRange: [70, 140],
        holes: 18,
        par: 72,
        yardage: 7090,
        slope: 140,
        rating: 72.5,
        walkable: false,
        style: "mountain",
        driveMinutes: 20,
        url: "https://www.keystoneresort.com/golf",
        highlight:
          "Robert Trent Jones Jr. design through sage meadows and aspen groves; elk sightings common",
      },
      {
        name: "The River Course at Keystone",
        tier: "solid",
        greenFeeRange: [55, 110],
        holes: 18,
        par: 71,
        yardage: 6886,
        slope: 130,
        rating: 70.5,
        walkable: false,
        style: "mountain",
        driveMinutes: 20,
        url: "https://www.keystoneresort.com/golf",
        highlight:
          "More forgiving sister course along the Snake River; great mountain scenery with less intimidation",
      },
      {
        name: "Copper Creek Golf Course",
        tier: "solid",
        greenFeeRange: [50, 99],
        holes: 18,
        par: 70,
        yardage: 6094,
        slope: 131,
        rating: 68.5,
        walkable: false,
        style: "mountain",
        driveMinutes: 25,
        url: "https://www.coppercolorado.com/golf",
        highlight:
          "Copper Mountain's Pete and Perry Dye design; short but tricky with stunning Gore Range views",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [800, 2500],
        amenities: [
          "hot tub",
          "ski-in/ski-out",
          "full kitchen",
          "mountain views",
          "game room",
          "multiple living areas",
        ],
        areaDescription: "Peak 7/8 neighborhood",
        searchUrl:
          "https://www.vrbo.com/search?destination=Breckenridge%2C+Colorado&guests=16",
        notes:
          "Massive ski chalets convert to summer lodges; summer rates are 40-50% less than ski season. Shuttle to Main Street.",
      },
      {
        type: "lodge",
        sleeps: [10, 16],
        nightlyRange: [600, 1800],
        amenities: [
          "hot tub",
          "full kitchen",
          "mountain views",
          "fire pit",
          "grill",
          "game room",
        ],
        areaDescription: "Main Street / Downtown Breckenridge",
        searchUrl:
          "https://www.airbnb.com/s/Breckenridge--Colorado/homes?adults=16",
        notes:
          "Walkable-to-downtown lodges are pricier but worth it for the nightlife access; book early for summer",
      },
    ],
    dining: [
      {
        name: "Hearthstone Restaurant",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Historic Victorian home with Colorado-inspired fine dining; large group reservations available in the garden room",
        reservationNeeded: true,
      },
      {
        name: "Relish",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Breck's premier steakhouse with prime cuts, creative sides, and a deep wine list",
        reservationNeeded: true,
      },
      {
        name: "Breckenridge Brewery & Pub",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "The original Breckenridge Brewery location; massive space with house beers and pub grub",
        reservationNeeded: false,
      },
      {
        name: "Downstairs at Eric's",
        style: "casual",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Underground sports bar with 100+ beers, arcade games, and pizza; the ultimate group hangout",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Cecilia's",
        vibe: "cocktail",
        highlight:
          "Speakeasy-style bar on Main Street with craft cocktails and a sexy vibe; find the hidden entrance",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Gold Pan Saloon",
        vibe: "saloon",
        highlight:
          "Oldest bar west of the Mississippi (continuous liquor license since 1879); cheap shots and big energy",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Broken Compass Brewing",
        vibe: "brewpub",
        highlight:
          "Local craft brewery with creative flavors (coconut porter is legendary); chill taproom vibes",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Burke & Riley's Irish Pub",
        vibe: "sports-bar",
        highlight:
          "Big screens, whiskey selection, and a fun crowd; gets packed and loud on weekends",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Breckenridge Epic Discovery",
        type: "zipline",
        duration: "3-4 hours",
        pricePerPerson: [35, 75],
        groupFriendly: true,
        highlight:
          "Alpine coaster, ziplines, and scenic chairlift rides at the ski resort; classic group fun",
        bestFor: "arrival day",
        provider: "Breckenridge Ski Resort",
      },
      {
        name: "Blue River Fly Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [150, 275],
        groupFriendly: true,
        highlight:
          "Gold Medal trout water minutes from Main Street; guided wade trips available",
        bestFor: "rest day",
        provider: "Breckenridge Outfitters",
      },
      {
        name: "ATV Mountain Tour",
        type: "atv",
        duration: "3-4 hours",
        pricePerPerson: [100, 180],
        groupFriendly: true,
        highlight:
          "Ride above timberline to 12,000+ feet on old mining roads with Continental Divide views",
        bestFor: "rest day",
        provider: "Breckenridge Adventure Company",
      },
      {
        name: "Summit County Brewery Crawl",
        type: "brewery",
        duration: "3-4 hours",
        pricePerPerson: [15, 40],
        groupFriendly: true,
        highlight:
          "Hit Broken Compass, Breckenridge Brewery, Angry James, and more — all walkable on Main Street",
        bestFor: "arrival day",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 14],
        hourlyRate: [100, 160],
        providers: [
          "Summit Express",
          "Mountain Limo",
          "Fresh Tracks Transportation",
        ],
        notes:
          "Free town shuttle covers Main Street; private shuttles needed for Keystone/Copper courses. Book early for peak summer.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 130],
        providers: ["Take a Chef", "Mountain Top Chef", "Summit Private Chef"],
        mealTypes: [
          "Colorado elk dinner",
          "steak cookout",
          "mountain brunch",
          "fondue night",
        ],
        notes:
          "Good private chef options in Summit County; many service both Breck and Keystone properties",
      },
    ],
  },

  // ── Vail, CO ────────────────────────────────────────────────────────
  {
    id: "vail-co",
    city: "Vail",
    state: "CO",
    region: "Mountain West",
    tagline: "Alpine luxury with championship mountain golf",
    description:
      "Vail is the gold standard of Colorado mountain resort towns — world-class everything from dining to nightlife to golf. The courses in the Eagle Valley are immaculate, the Bavarian-village pedestrian core is walkable and packed with bars, and the lodging options for groups are elite. Not cheap, but worth every penny.",
    population: "tiny",
    nearestAirport: {
      code: "EGE",
      name: "Eagle County Regional Airport",
      driveMinutes: 35,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Vail Golf Club",
        tier: "premium",
        greenFeeRange: [100, 185],
        holes: 18,
        par: 71,
        yardage: 7100,
        slope: 138,
        rating: 72.5,
        walkable: false,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.vailgolfclub.net",
        highlight:
          "Municipal course that plays like a resort; tight fairways along Gore Creek with spectacular mountain walls",
      },
      {
        name: "Eagle-Vail Golf Club",
        tier: "solid",
        greenFeeRange: [65, 110],
        holes: 18,
        par: 72,
        yardage: 6819,
        slope: 133,
        rating: 71.0,
        walkable: true,
        style: "mountain",
        driveMinutes: 15,
        url: "https://www.eaglevailgolfclub.com",
        highlight:
          "Classic mountain course between Vail and Beaver Creek; great conditioning and more affordable than Vail GC",
      },
      {
        name: "Sonnenalp Golf Club",
        tier: "premium",
        greenFeeRange: [90, 165],
        holes: 18,
        par: 71,
        yardage: 7059,
        slope: 140,
        rating: 73.0,
        walkable: false,
        style: "mountain",
        driveMinutes: 10,
        url: "https://www.sonnenalp.com/golf",
        highlight:
          "Bob Cupp design with stunning Gore Range views; long and demanding with immaculate conditioning",
      },
      {
        name: "Beaver Creek Golf Club",
        tier: "bucket-list",
        greenFeeRange: [175, 275],
        holes: 18,
        par: 70,
        yardage: 6784,
        slope: 142,
        rating: 72.2,
        walkable: false,
        style: "mountain",
        driveMinutes: 15,
        url: "https://www.beavercreek.com/golf",
        highlight:
          "Robert Trent Jones Jr. design at 8,400 feet; Tom Kite called it 'Augusta at altitude'",
      },
      {
        name: "Cotton Ranch Golf Club",
        tier: "solid",
        greenFeeRange: [55, 99],
        holes: 18,
        par: 72,
        yardage: 6902,
        slope: 130,
        rating: 70.8,
        walkable: true,
        style: "mountain",
        driveMinutes: 30,
        url: "https://www.cottonranch.com",
        highlight:
          "Pete Dye design in Gypsum with great valley views; less crowded and more affordable alternative to Vail courses",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [1000, 3500],
        amenities: [
          "hot tub",
          "mountain views",
          "full kitchen",
          "game room",
          "multiple living areas",
          "shuttle access",
        ],
        areaDescription: "West Vail / Intermountain area",
        searchUrl:
          "https://www.vrbo.com/search?destination=Vail%2C+Colorado&guests=16",
        notes:
          "Summer rates are dramatically less than ski season; huge chalets in West Vail are 5 min to the village",
      },
      {
        type: "lodge",
        sleeps: [10, 16],
        nightlyRange: [800, 2800],
        amenities: [
          "hot tub",
          "full kitchen",
          "mountain views",
          "fire pit",
          "grill",
          "ski storage",
        ],
        areaDescription: "Vail Village / Lionshead",
        searchUrl:
          "https://www.airbnb.com/s/Vail--Colorado/homes?adults=16",
        notes:
          "Walkable-to-village properties command a premium but the nightlife access is unbeatable",
      },
    ],
    dining: [
      {
        name: "Mountain Standard",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Lively Vail Village spot with craft cocktails, creative small plates, and a buzzy patio scene",
        reservationNeeded: true,
      },
      {
        name: "Sweet Basil",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Vail's most acclaimed restaurant since 1977; inventive American cuisine with a legendary wine list",
        reservationNeeded: true,
      },
      {
        name: "Elway's Vail",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "John Elway's steakhouse in Vail Village; prime aged beef, big group energy, and Colorado legend status",
        reservationNeeded: true,
      },
      {
        name: "Vendetta's Italian Restaurant",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Old-school Italian in Bridge Street; big portions, reasonable prices by Vail standards, and great for groups",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "The George",
        vibe: "patio",
        highlight:
          "Massive outdoor patio in Lionshead with fire pits, cocktails, and a see-and-be-seen crowd",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Shakedown Bar",
        vibe: "dive",
        highlight:
          "The late-night move in Vail Village; cheap-ish drinks by Vail standards and packed until 2am",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Garfinkel's",
        vibe: "sports-bar",
        highlight:
          "Classic Vail sports bar with big screens, pub food, and a raucous atmosphere on event nights",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Red Lion",
        vibe: "patio",
        highlight:
          "Iconic Vail après spot since the 1960s; live music on the outdoor stage and legendary energy",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Zip Line Adventure Tour",
        type: "zipline",
        duration: "2-3 hours",
        pricePerPerson: [75, 130],
        groupFriendly: true,
        highlight:
          "Soar over the Eagle River Valley with views of the Gore Range; multiple lines and a suspension bridge",
        bestFor: "arrival day",
        provider: "Zip Adventures",
      },
      {
        name: "Vail Mountain Bike Park",
        type: "mountain-biking",
        duration: "half day",
        pricePerPerson: [40, 80],
        groupFriendly: true,
        highlight:
          "Lift-served mountain biking at Vail Resort; trails for all levels and bike rentals at the base",
        bestFor: "rest day",
        provider: "Vail Mountain Resort",
      },
      {
        name: "Eagle River Fly Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [175, 300],
        groupFriendly: true,
        highlight:
          "Gold Medal water with excellent trout fishing; guided wade and float trips available",
        bestFor: "rest day",
        provider: "Fly Fishing Outfitters",
      },
      {
        name: "Vail Brewery Tour",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [15, 40],
        groupFriendly: true,
        highlight:
          "Hit Vail Brewing Co., The Vail Ale House, and more; all walkable in the village",
        bestFor: "arrival day",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [12, 16],
        hourlyRate: [125, 200],
        providers: [
          "Epic Mountain Express",
          "Vail Valley Shuttle",
          "Colorado Mountain Express",
        ],
        notes:
          "Free in-town bus runs through Vail Village/Lionshead; private shuttles for courses outside the valley",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [80, 150],
        providers: ["Take a Chef", "Vail Private Chefs", "Elevated Eats Vail"],
        mealTypes: [
          "Colorado rack of lamb",
          "prime steak dinner",
          "alpine fondue night",
          "mountain brunch",
        ],
        notes:
          "Strong private chef market in Vail; many experienced with large groups in luxury chalets",
      },
    ],
  },

  // ── Telluride, CO ───────────────────────────────────────────────────
  {
    id: "telluride-co",
    city: "Telluride",
    state: "CO",
    region: "Mountain West",
    tagline: "Bucket-list beauty in Colorado's most jaw-dropping box canyon",
    description:
      "Telluride is arguably the most beautiful town in Colorado — a box canyon with 13,000-foot peaks on three sides, a free gondola, and a Main Street loaded with great restaurants and bars. The golf is limited to one stunning course but it's a true bucket-list experience, and you can supplement with courses in Montrose 65 minutes away.",
    population: "tiny",
    nearestAirport: {
      code: "TEX",
      name: "Telluride Regional Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["summer"],
    courses: [
      {
        name: "Telluride Golf Club",
        tier: "bucket-list",
        greenFeeRange: [175, 295],
        holes: 18,
        par: 71,
        yardage: 6739,
        slope: 136,
        rating: 71.0,
        walkable: false,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.telluridegolfclub.com",
        highlight:
          "Possibly the most scenic course in America; San Juan Mountains tower over every hole at 9,500 feet",
      },
      {
        name: "The Divide Ranch & Club",
        tier: "solid",
        greenFeeRange: [55, 95],
        holes: 18,
        par: 72,
        yardage: 7038,
        slope: 128,
        rating: 71.5,
        walkable: true,
        style: "mountain",
        driveMinutes: 40,
        url: "https://www.thedivideclub.com",
        highlight:
          "High mesa course near Ridgway with sweeping views of the Sneffels Range; excellent value alternative",
      },
      {
        name: "The Links at Cobble Creek",
        tier: "solid",
        greenFeeRange: [50, 85],
        holes: 18,
        par: 72,
        yardage: 6800,
        slope: 127,
        rating: 70.2,
        walkable: true,
        style: "links",
        driveMinutes: 65,
        url: "https://www.cobblecreekgolf.com",
        highlight:
          "Jim Engh design in Montrose; links-style through desert mesa terrain — totally different from Telluride GC",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [900, 3000],
        amenities: [
          "hot tub",
          "mountain views",
          "full kitchen",
          "game room",
          "fire pit",
          "multiple levels",
        ],
        areaDescription: "Town of Telluride / West End",
        searchUrl:
          "https://www.vrbo.com/search?destination=Telluride%2C+Colorado&guests=16",
        notes:
          "Walkable-to-Main-Street homes are premium but worth it; summer rates are 50%+ off ski season",
      },
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [700, 2200],
        amenities: [
          "hot tub",
          "mountain views",
          "full kitchen",
          "game room",
          "shuttle",
          "ski storage",
        ],
        areaDescription: "Mountain Village (gondola access)",
        searchUrl:
          "https://www.airbnb.com/s/Telluride--Colorado/homes?adults=16",
        notes:
          "Mountain Village houses are larger and cheaper; free gondola to town runs until midnight",
      },
    ],
    dining: [
      {
        name: "Allred's Restaurant",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Fine dining at the top of the free gondola with panoramic views; Colorado lamb and elk are highlights",
        reservationNeeded: true,
      },
      {
        name: "Brown Dog Pizza",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Best pizza in the San Juans; huge slices, local beer, and a casual vibe perfect for groups",
        reservationNeeded: false,
      },
      {
        name: "221 South Oak",
        style: "farm-to-table",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Intimate fine dining with a seasonal tasting menu; Telluride's special-occasion spot",
        reservationNeeded: true,
      },
      {
        name: "Smuggler Union Restaurant & Brewery",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Massive historic building with house beers, elevated pub food, and a huge patio",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "There Bar",
        vibe: "cocktail",
        highlight:
          "Trendy cocktail bar on Main Street with creative drinks and a sleek mountain vibe",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Last Dollar Saloon",
        vibe: "saloon",
        highlight:
          "Telluride's iconic dive; cheap beer, pool tables, and locals who've been coming for decades",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Telluride Brewing Company",
        vibe: "brewpub",
        highlight:
          "Face Down Brown is a Colorado legend; big taproom with cornhole and a dog-friendly patio",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The New Sheridan Bar",
        vibe: "whiskey-bar",
        highlight:
          "Historic hotel bar since 1895; excellent whiskey selection and old-Western ambiance",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Via Ferrata at Telluride",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [125, 200],
        groupFriendly: true,
        highlight:
          "Iron-runged cliff route high above town with stunning exposure; guides make it safe for beginners",
        bestFor: "rest day",
        provider: "Telluride Adventure Center",
      },
      {
        name: "San Miguel River Rafting",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [65, 110],
        groupFriendly: true,
        highlight:
          "Scenic Class II-III float through the San Miguel Valley; mellow enough for everyone",
        bestFor: "rest day",
        provider: "Telluride Outside",
      },
      {
        name: "Mountain Village Gondola & Hike",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 0],
        groupFriendly: true,
        highlight:
          "Free gondola ride with access to alpine hiking trails; Bear Creek Falls is a 2-mile stunner",
        bestFor: "morning before golf",
      },
      {
        name: "ATV San Juan Mountain Tour",
        type: "atv",
        duration: "half day",
        pricePerPerson: [125, 200],
        groupFriendly: true,
        highlight:
          "Ride to the top of Imogene Pass at 13,114 feet on old mining roads; the views are unreal",
        bestFor: "rest day",
        provider: "Telluride Outside",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 14],
        hourlyRate: [100, 175],
        providers: [
          "Telluride Express",
          "Skip's Taxi & Shuttle",
        ],
        notes:
          "Free gondola between town and Mountain Village; private shuttle needed for courses outside town. Small market, book early.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [80, 150],
        providers: ["Take a Chef", "Telluride Private Chef"],
        mealTypes: [
          "Colorado lamb dinner",
          "elk steak night",
          "mountain brunch",
          "wine-paired dinner",
        ],
        notes:
          "Small but high-quality private chef market; many cater to the luxury vacation home crowd",
      },
    ],
  },

  // ── Fort Collins, CO ────────────────────────────────────────────────
  {
    id: "fort-collins-co",
    city: "Fort Collins",
    state: "CO",
    region: "Mountain West",
    tagline: "Craft beer capital with surprising Front Range golf",
    description:
      "Fort Collins is Colorado's best-kept golf secret — a college town with 300+ days of sunshine, an absurd brewery density, and multiple quality courses at very reasonable prices. Old Town's walkable bar and restaurant district rivals any mountain town, and you're only an hour from Denver's airport.",
    population: "medium",
    nearestAirport: {
      code: "DEN",
      name: "Denver International Airport",
      driveMinutes: 75,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "Mariana Butte Golf Course",
        tier: "solid",
        greenFeeRange: [42, 68],
        holes: 18,
        par: 72,
        yardage: 6572,
        slope: 130,
        rating: 70.4,
        walkable: false,
        style: "mountain",
        driveMinutes: 15,
        url: "https://www.lovelandgolf.com",
        highlight:
          "Jack Nicklaus-designed city course with dramatic red rock outcroppings and Horsetooth Reservoir views",
      },
      {
        name: "Collindale Golf Course",
        tier: "solid",
        greenFeeRange: [35, 55],
        holes: 18,
        par: 71,
        yardage: 6440,
        slope: 125,
        rating: 69.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.fcgov.com/golf/collindale",
        highlight:
          "Fort Collins' best muni; mature trees, tight fairways, and always in great shape",
      },
      {
        name: "Pelican Lakes Golf Club",
        tier: "premium",
        greenFeeRange: [55, 89],
        holes: 27,
        par: 72,
        yardage: 7063,
        slope: 136,
        rating: 72.8,
        walkable: false,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.pelicanlakesgolf.com",
        highlight:
          "27 holes of Jack Nicklaus design in Windsor; water on nearly every hole and championship conditioning",
      },
      {
        name: "Southridge Golf Club",
        tier: "budget",
        greenFeeRange: [28, 45],
        holes: 18,
        par: 71,
        yardage: 6357,
        slope: 120,
        rating: 68.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.fcgov.com/golf/southridge",
        highlight:
          "Wide-open muni perfect for the hungover round; great value and quick pace of play",
      },
      {
        name: "Highland Meadows Golf Course",
        tier: "premium",
        greenFeeRange: [60, 95],
        holes: 18,
        par: 72,
        yardage: 7009,
        slope: 137,
        rating: 72.5,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.highlandmeadowsgolf.com",
        highlight:
          "Former Korn Ferry Tour host; championship layout with elevation changes and a serious test of golf",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [400, 1100],
        amenities: [
          "hot tub",
          "full kitchen",
          "game room",
          "grill",
          "fire pit",
          "patio",
        ],
        areaDescription: "Old Town / Downtown Fort Collins",
        searchUrl:
          "https://www.vrbo.com/search?destination=Fort+Collins%2C+Colorado&guests=16",
        notes:
          "Walkable-to-Old-Town homes are the play; brewery crawl distance and easy Uber/Lyft coverage",
      },
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [500, 1400],
        amenities: [
          "hot tub",
          "full kitchen",
          "mountain views",
          "game room",
          "grill",
          "garage",
        ],
        areaDescription: "Horsetooth / West Fort Collins",
        searchUrl:
          "https://www.airbnb.com/s/Fort-Collins--Colorado/homes?adults=16",
        notes:
          "Larger homes near Horsetooth Reservoir with mountain views and outdoor space; 10 min to Old Town",
      },
    ],
    dining: [
      {
        name: "The Melting Pot",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Fondue chain done right; perfect for a group dinner with shared pots and great wine pairings",
        reservationNeeded: true,
      },
      {
        name: "Austin's American Grill",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Old Town steakhouse with a massive patio and private dining rooms; great for 16",
        reservationNeeded: true,
      },
      {
        name: "Coopersmith's Pub & Brewing",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Old Town institution since 1989; house beers, pub food, and a pool hall next door",
        reservationNeeded: false,
      },
      {
        name: "Rare Italian",
        style: "italian",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Handmade pasta and craft cocktails in a beautifully restored Old Town building",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "New Belgium Brewing",
        vibe: "brewpub",
        highlight:
          "Iconic Fat Tire brewery with a massive taproom, tours, and a riverside patio; a pilgrimage for beer lovers",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Odell Brewing Company",
        vibe: "brewpub",
        highlight:
          "One of Colorado's OG craft breweries; gorgeous taproom with a huge outdoor area and food trucks",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Lucky Joe's Sidewalk Saloon",
        vibe: "dive",
        highlight:
          "The late-night move in Old Town; strong drinks, live music, and zero pretension",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Social",
        vibe: "cocktail",
        highlight:
          "Craft cocktails and a sophisticated vibe in Old Town; rooftop deck with mountain views",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Horsetooth Reservoir Boat Day",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "Rent a pontoon and cruise Horsetooth Reservoir with mountain views and cliff jumping spots",
        bestFor: "rest day",
        provider: "Inlet Bay Marina",
      },
      {
        name: "Fort Collins Brewery Tour",
        type: "brewery",
        duration: "3-4 hours",
        pricePerPerson: [15, 40],
        groupFriendly: true,
        highlight:
          "20+ craft breweries in town; hit New Belgium, Odell, Horse & Dragon, and Funkwerks in one crawl",
        bestFor: "arrival day",
      },
      {
        name: "Cache la Poudre River Rafting",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [50, 90],
        groupFriendly: true,
        highlight:
          "Colorado's only Wild & Scenic river with Class III-IV rapids in Poudre Canyon",
        bestFor: "rest day",
        provider: "A-1 Wildwater Rafting",
      },
      {
        name: "Axe Throwing at Ace Axe Throwing",
        type: "axe-throwing",
        duration: "1-2 hours",
        pricePerPerson: [25, 40],
        groupFriendly: true,
        highlight:
          "Walk-in axe throwing lanes in Old Town; perfect pre-dinner group activity",
        bestFor: "arrival day",
        provider: "Ace Axe Throwing",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 24],
        hourlyRate: [150, 250],
        providers: [
          "Fort Collins Party Bus",
          "Shamrock Shuttle",
          "NoCo Party Bus",
        ],
        notes:
          "Old Town brewery crawl is walkable, but party bus/trolley for course-hopping and reservoir trips. Good availability.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [50, 95],
        providers: ["Take a Chef", "Fort Collins Private Chef"],
        mealTypes: [
          "steak cookout",
          "BBQ spread",
          "beer-paired dinner",
          "brunch",
        ],
        notes:
          "Growing private chef scene; many will do beer-pairing dinners with local brewery selections",
      },
    ],
  },

  // ── Glenwood Springs, CO ────────────────────────────────────────────
  {
    id: "glenwood-springs-co",
    city: "Glenwood Springs",
    state: "CO",
    region: "Mountain West",
    tagline: "Hot springs, mountain golf, and Roaring Fork Valley vibes",
    description:
      "Glenwood Springs sits at the confluence of the Colorado and Roaring Fork rivers with natural hot springs, a lively downtown, and access to quality courses in the valley. It's more affordable than Aspen just 40 minutes up-valley and has a real working-town character with excellent bars and restaurants.",
    population: "small",
    nearestAirport: {
      code: "EGE",
      name: "Eagle County Regional Airport",
      driveMinutes: 55,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Glenwood Springs Golf Club",
        tier: "solid",
        greenFeeRange: [40, 65],
        holes: 18,
        par: 71,
        yardage: 6160,
        slope: 124,
        rating: 68.5,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.glenwoodgolf.com",
        highlight:
          "Charming city course perched above the Colorado River with panoramic valley views; great value",
      },
      {
        name: "River Valley Ranch Golf Club",
        tier: "premium",
        greenFeeRange: [75, 130],
        holes: 18,
        par: 72,
        yardage: 7098,
        slope: 137,
        rating: 72.3,
        walkable: false,
        style: "mountain",
        driveMinutes: 15,
        url: "https://www.rvrgolf.com",
        highlight:
          "Jay Morrish design in Carbondale along the Crystal River; roaring fork valley views and excellent conditioning",
      },
      {
        name: "Aspen Golf Club",
        tier: "premium",
        greenFeeRange: [80, 150],
        holes: 18,
        par: 71,
        yardage: 7131,
        slope: 131,
        rating: 72.0,
        walkable: true,
        style: "mountain",
        driveMinutes: 40,
        url: "https://www.aspengolf.com",
        highlight:
          "Municipal course in Aspen at 7,800 feet; jaw-dropping mountain scenery and surprisingly affordable for Aspen",
      },
      {
        name: "Ironbridge Golf Club",
        tier: "premium",
        greenFeeRange: [85, 150],
        holes: 18,
        par: 72,
        yardage: 7100,
        slope: 140,
        rating: 73.0,
        walkable: false,
        style: "mountain",
        driveMinutes: 10,
        url: "https://www.ironbridgegc.com",
        highlight:
          "Arthur Hills design carved through red rock cliffs along the Roaring Fork; stunning and challenging",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [500, 1400],
        amenities: [
          "hot tub",
          "full kitchen",
          "mountain views",
          "fire pit",
          "grill",
          "game room",
        ],
        areaDescription: "West Glenwood / No Name area",
        searchUrl:
          "https://www.vrbo.com/search?destination=Glenwood+Springs%2C+Colorado&guests=16",
        notes:
          "Homes along the Colorado River corridor offer great views and are 5-10 min to downtown",
      },
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [600, 1600],
        amenities: [
          "hot tub",
          "full kitchen",
          "mountain views",
          "fire pit",
          "game room",
          "multiple levels",
        ],
        areaDescription: "Carbondale / Crystal River Valley",
        searchUrl:
          "https://www.airbnb.com/s/Glenwood-Springs--Colorado/homes?adults=16",
        notes:
          "Carbondale is 15 min south with a great dining scene of its own; closer to River Valley Ranch GC",
      },
    ],
    dining: [
      {
        name: "Riviera Supper Club",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Retro supper club vibes with prime steaks, strong cocktails, and live jazz; handles groups well",
        reservationNeeded: true,
      },
      {
        name: "Slope & Hatch",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "New Mexican-inspired with great margaritas and a rooftop patio overlooking the Colorado River",
        reservationNeeded: false,
      },
      {
        name: "Juicy Lucy's Steakhouse",
        style: "steakhouse",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Local favorite for big, juicy burgers and steaks in a casual, group-friendly setting",
        reservationNeeded: false,
      },
      {
        name: "The Pullman",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Glenwood's upscale option with seasonal menus and an excellent wine list; in a converted train car",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Glenwood Canyon Brewing Company",
        vibe: "brewpub",
        highlight:
          "Solid house beers and pub grub in a big downtown space; the patio overlooks the river",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Doc Holliday's Tavern",
        vibe: "saloon",
        highlight:
          "Named for the legendary gunslinger buried in town; cheap beer, pool tables, and Western vibes",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Polaris Bar",
        vibe: "dive",
        highlight:
          "The late-night local spot; strong drinks, a jukebox, and no tourists",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Casey Brewing & Blending",
        vibe: "brewpub",
        highlight:
          "World-class sour beer program; tiny tasting room with big flavors and a cult following",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Glenwood Hot Springs Pool",
        type: "spa",
        duration: "2-3 hours",
        pricePerPerson: [25, 40],
        groupFriendly: true,
        highlight:
          "World's largest hot springs pool; soak sore golf muscles in mineral water with mountain views",
        bestFor: "arrival day",
        provider: "Glenwood Hot Springs Resort",
      },
      {
        name: "Glenwood Canyon Rafting",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [55, 90],
        groupFriendly: true,
        highlight:
          "Float through the stunning Glenwood Canyon on the Colorado River; Class III rapids",
        bestFor: "rest day",
        provider: "Defiance Rafting",
      },
      {
        name: "Iron Mountain Hot Springs",
        type: "spa",
        duration: "2-3 hours",
        pricePerPerson: [30, 45],
        groupFriendly: true,
        highlight:
          "16 individual soaking pools along the Colorado River; more upscale and relaxing than the big pool",
        bestFor: "arrival day",
        provider: "Iron Mountain Hot Springs",
      },
      {
        name: "Glenwood Caverns Adventure Park",
        type: "zipline",
        duration: "half day",
        pricePerPerson: [40, 75],
        groupFriendly: true,
        highlight:
          "Mountain-top theme park with cave tours, a giant canyon swing, and an alpine coaster",
        bestFor: "rest day",
        provider: "Glenwood Caverns Adventure Park",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 14],
        hourlyRate: [100, 160],
        providers: [
          "Roaring Fork Transportation Authority",
          "Colorado Mountain Express",
        ],
        notes:
          "RFTA public buses connect Glenwood-Carbondale-Aspen; private shuttles for golf courses and group outings",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 120],
        providers: ["Take a Chef", "Roaring Fork Private Chef"],
        mealTypes: [
          "Colorado steak dinner",
          "BBQ cookout",
          "mountain brunch",
          "wine-paired dinner",
        ],
        notes:
          "Roaring Fork Valley has a strong culinary scene; private chefs often source from local farms in Carbondale",
      },
    ],
  },

  // ── Pagosa Springs, CO ──────────────────────────────────────────────
  {
    id: "pagosa-springs-co",
    city: "Pagosa Springs",
    state: "CO",
    region: "Mountain West",
    tagline: "Hot springs hideaway with a legit 27-hole golf resort",
    description:
      "Pagosa Springs is a sleeper pick in southern Colorado — the world's deepest geothermal hot spring, a quality 27-hole golf resort, and a chill small-town vibe with enough bars and restaurants to keep the crew happy. The San Juan Mountains backdrop is stunning, and prices are very reasonable compared to the I-70 corridor towns.",
    population: "tiny",
    nearestAirport: {
      code: "DRO",
      name: "Durango-La Plata County Airport",
      driveMinutes: 60,
    },
    bestSeasons: ["summer"],
    courses: [
      {
        name: "Pagosa Springs Golf Club - Ponderosa/Pinon",
        tier: "solid",
        greenFeeRange: [55, 89],
        holes: 18,
        par: 71,
        yardage: 6806,
        slope: 128,
        rating: 70.2,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.golfpagosa.com",
        highlight:
          "27-hole facility with mountain and meadow holes; three distinct nine-hole loops at 7,300 feet",
      },
      {
        name: "Pagosa Springs Golf Club - Meadows",
        tier: "solid",
        greenFeeRange: [55, 89],
        holes: 9,
        par: 36,
        yardage: 3400,
        slope: 130,
        rating: 35.5,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.golfpagosa.com",
        highlight:
          "The third nine weaves through open meadows with long views; combine with either loop for 18",
      },
      {
        name: "Dalton Ranch Golf Club",
        tier: "premium",
        greenFeeRange: [70, 120],
        holes: 18,
        par: 72,
        yardage: 6934,
        slope: 136,
        rating: 72.0,
        walkable: false,
        style: "mountain",
        driveMinutes: 55,
        url: "https://www.daltonranch.com",
        highlight:
          "Ken Dye design along the Animas River near Durango; worth the drive for the setting alone",
      },
    ],
    lodging: [
      {
        type: "cabin",
        sleeps: [10, 16],
        nightlyRange: [400, 1100],
        amenities: [
          "hot tub",
          "full kitchen",
          "mountain views",
          "fire pit",
          "grill",
          "game room",
        ],
        areaDescription: "Pagosa Springs / Lake Pagosa area",
        searchUrl:
          "https://www.vrbo.com/search?destination=Pagosa+Springs%2C+Colorado&guests=16",
        notes:
          "Mountain cabins and homes with great rates; many near the San Juan River with hot springs access nearby",
      },
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [500, 1300],
        amenities: [
          "hot tub",
          "full kitchen",
          "mountain views",
          "fire pit",
          "game room",
          "multiple levels",
        ],
        areaDescription: "Upper Blanco / Highway 84 corridor",
        searchUrl:
          "https://www.airbnb.com/s/Pagosa-Springs--Colorado/homes?adults=16",
        notes:
          "Larger homes available in the surrounding area; slightly more secluded with bigger footprints",
      },
    ],
    dining: [
      {
        name: "Alley House Grille",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Pagosa's best restaurant; locally sourced seasonal menus in a charming downtown space",
        reservationNeeded: true,
      },
      {
        name: "Riff Raff Brewing Company",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Local craft brewery with solid food and a big patio; the group hangout in Pagosa",
        reservationNeeded: false,
      },
      {
        name: "Boss Hogg's Restaurant & Saloon",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "BBQ and steaks in a saloon setting; big portions, cold beer, and a rowdy atmosphere",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Riff Raff Brewing Company",
        vibe: "brewpub",
        highlight:
          "Pagosa's brewery hub with rotating taps and a lively patio scene; the social center of town",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Pagosa Bar",
        vibe: "dive",
        highlight:
          "Classic small-town dive with pool tables, cheap drinks, and a jukebox; the late-night spot",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Mountain Pizza & Taproom",
        vibe: "sports-bar",
        highlight:
          "Pizza, pool tables, and a big tap list; casual and fun for groups",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "The Springs Resort Hot Springs",
        type: "spa",
        duration: "2-3 hours",
        pricePerPerson: [35, 55],
        groupFriendly: true,
        highlight:
          "25+ soaking pools fed by the world's deepest geothermal hot spring; the must-do activity in Pagosa",
        bestFor: "arrival day",
        provider: "The Springs Resort & Spa",
      },
      {
        name: "San Juan River Fly Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [150, 250],
        groupFriendly: true,
        highlight:
          "Quality water flows right through town; guided wade trips for all skill levels",
        bestFor: "rest day",
        provider: "Pagosa Outside",
      },
      {
        name: "Piedra River Rafting",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [60, 100],
        groupFriendly: true,
        highlight:
          "Class II-III rapids through a gorgeous canyon; a fun and accessible group activity",
        bestFor: "rest day",
        provider: "Pagosa Outside",
      },
      {
        name: "ATV San Juan Mountain Trails",
        type: "atv",
        duration: "half day",
        pricePerPerson: [100, 175],
        groupFriendly: true,
        highlight:
          "Ride old mining roads through the San Juans with alpine meadows and mountain passes",
        bestFor: "rest day",
        provider: "Pagosa ATV Rentals",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [8, 14],
        hourlyRate: [80, 140],
        providers: [
          "Mountain Express",
          "Pagosa Cab",
        ],
        notes:
          "Very small transportation market; most groups rent a 15-passenger van from Durango airport or use personal vehicles",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 110],
        providers: ["Take a Chef"],
        mealTypes: [
          "steak dinner",
          "BBQ cookout",
          "mountain brunch",
          "trout dinner",
        ],
        notes:
          "Limited private chef market; the Alley House Grille team sometimes does private events",
      },
    ],
  },

  // ── Salida, CO ──────────────────────────────────────────────────────
  {
    id: "salida-co",
    city: "Salida",
    state: "CO",
    region: "Mountain West",
    tagline: "Arkansas River town with cheap golf and big adventure",
    description:
      "Salida is a funky arts-and-adventure town on the Arkansas River with a surprisingly vibrant downtown, quality golf for pennies, and some of the best whitewater rafting in the country. The creative class has revitalized this old railroad town with breweries, galleries, and restaurants that punch above the weight class.",
    population: "tiny",
    nearestAirport: {
      code: "COS",
      name: "Colorado Springs Airport",
      driveMinutes: 135,
    },
    bestSeasons: ["summer"],
    courses: [
      {
        name: "Salida Golf Club",
        tier: "budget",
        greenFeeRange: [30, 50],
        holes: 18,
        par: 70,
        yardage: 5698,
        slope: 119,
        rating: 66.0,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.salidagolfclub.com",
        highlight:
          "Charming mountain course at 7,000 feet with stunning Collegiate Peaks views; incredible value",
      },
      {
        name: "Collegiate Peaks Golf Course",
        tier: "solid",
        greenFeeRange: [35, 55],
        holes: 18,
        par: 72,
        yardage: 6630,
        slope: 124,
        rating: 69.8,
        walkable: true,
        style: "mountain",
        driveMinutes: 25,
        url: "https://www.collegiatepeaksgolf.com",
        highlight:
          "Well-maintained course in Buena Vista with 14,000-foot peaks as the backdrop; the ball absolutely flies at altitude",
      },
      {
        name: "Mt. Massive Golf Course",
        tier: "budget",
        greenFeeRange: [25, 42],
        holes: 18,
        par: 72,
        yardage: 6374,
        slope: 119,
        rating: 68.5,
        walkable: true,
        style: "mountain",
        driveMinutes: 40,
        url: "https://www.mtmassivegolf.com",
        highlight:
          "The highest course on the Arkansas River at 10,200 feet near Leadville; balls fly 15% farther",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [350, 900],
        amenities: [
          "hot tub",
          "full kitchen",
          "mountain views",
          "fire pit",
          "grill",
          "patio",
        ],
        areaDescription: "Downtown Salida / F Street area",
        searchUrl:
          "https://www.vrbo.com/search?destination=Salida%2C+Colorado&guests=16",
        notes:
          "Walkable-to-downtown homes with mountain views; very affordable compared to I-70 corridor towns",
      },
      {
        type: "cabin",
        sleeps: [8, 14],
        nightlyRange: [300, 800],
        amenities: [
          "hot tub",
          "full kitchen",
          "mountain views",
          "fire pit",
          "grill",
          "river access",
        ],
        areaDescription: "Arkansas River corridor / Poncha Springs",
        searchUrl:
          "https://www.airbnb.com/s/Salida--Colorado/homes?adults=14",
        notes:
          "River cabins along the Arkansas offer great access to rafting put-ins and fishing; combine two for bigger groups",
      },
    ],
    dining: [
      {
        name: "The Fritz",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Salida's best restaurant; seasonal Colorado cuisine in a hip downtown space with craft cocktails",
        reservationNeeded: true,
      },
      {
        name: "Moonlight Pizza & Brewpub",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Big downtown brewpub with wood-fired pizza, house beers, and a massive patio; perfect for groups",
        reservationNeeded: false,
      },
      {
        name: "Amicas Pizza",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Beloved community pizza joint with great salads and microbrews; always lively",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Benson's Tavern",
        vibe: "dive",
        highlight:
          "The late-night spot on F Street; shuffleboard, cheap beer, and locals who know your name by round two",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Soulcraft Brewing",
        vibe: "brewpub",
        highlight:
          "Craft brewery in a converted garage with creative beers and a dog-friendly patio",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Elevation Beer Co.",
        vibe: "brewpub",
        highlight:
          "Excellent craft brewery with strong Belgian-style beers; taproom in Poncha Springs with food trucks",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "The Vic Tavern",
        vibe: "saloon",
        highlight:
          "Historic bar in a renovated theater; live music, good cocktails, and a great patio scene",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Arkansas River Whitewater Rafting",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [55, 110],
        groupFriendly: true,
        highlight:
          "Browns Canyon National Monument has world-class Class III-IV rapids; the signature Salida experience",
        bestFor: "rest day",
        provider: "Independent Whitewater",
      },
      {
        name: "Mt. Princeton Hot Springs",
        type: "spa",
        duration: "2-3 hours",
        pricePerPerson: [25, 35],
        groupFriendly: true,
        highlight:
          "Natural hot springs pools with creekside soaking at the base of Mt. Princeton; the ultimate post-golf recovery",
        bestFor: "arrival day",
        provider: "Mt. Princeton Hot Springs Resort",
      },
      {
        name: "Arkansas River Fly Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [150, 250],
        groupFriendly: true,
        highlight:
          "Gold Medal trout water right through town; guided wade and float trips available",
        bestFor: "rest day",
        provider: "Ark Anglers",
      },
      {
        name: "Monarch Mountain Biking",
        type: "mountain-biking",
        duration: "half day",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "Excellent singletrack trails up Monarch Pass; rentals available in town",
        bestFor: "rest day",
        provider: "Absolute Bikes",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [8, 14],
        hourlyRate: [80, 130],
        providers: [
          "Salida Shuttle",
        ],
        notes:
          "Very small market; most groups rent a 15-passenger van. Downtown is very walkable so transportation mainly needed for courses.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [55, 100],
        providers: ["Take a Chef"],
        mealTypes: [
          "steak dinner",
          "BBQ cookout",
          "mountain brunch",
        ],
        notes:
          "Tiny private chef market; local catering companies like Sweetie's Salida can handle group dinners",
      },
    ],
  },

  // ── Cody, WY ────────────────────────────────────────────────────────
  {
    id: "cody-wy",
    city: "Cody",
    state: "WY",
    region: "Mountain West",
    tagline: "Wild West golf at the gateway to Yellowstone",
    description:
      "Cody is the real-deal Western town Buffalo Bill built — a nightly rodeo, world-class museum, and golf courses with views of the Absaroka Range. It's the east entrance to Yellowstone and has a surprisingly fun Main Street bar scene with genuine cowboy culture you can't fake.",
    population: "small",
    nearestAirport: {
      code: "COD",
      name: "Yellowstone Regional Airport",
      driveMinutes: 5,
    },
    bestSeasons: ["summer"],
    courses: [
      {
        name: "Olive Glenn Golf & Country Club",
        tier: "solid",
        greenFeeRange: [50, 75],
        holes: 18,
        par: 72,
        yardage: 6832,
        slope: 128,
        rating: 71.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.oliveglenn.com",
        highlight:
          "Historic Bob Baldock design with mature cottonwoods and Shoshone River views; the social hub of Cody golf",
      },
      {
        name: "Cody Golf Club (Buffalo Bill Cody Golf Club)",
        tier: "budget",
        greenFeeRange: [25, 40],
        holes: 18,
        par: 72,
        yardage: 6291,
        slope: 118,
        rating: 68.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.codygolfclub.com",
        highlight:
          "Affordable muni with Absaroka Range views from every hole; great pace of play and value",
      },
      {
        name: "Powell Golf Club",
        tier: "budget",
        greenFeeRange: [25, 38],
        holes: 18,
        par: 72,
        yardage: 6794,
        slope: 120,
        rating: 69.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.powellgolfclub.com",
        highlight:
          "Hidden gem in the neighboring town of Powell; surprisingly long and well-maintained for the price",
      },
    ],
    lodging: [
      {
        type: "lodge",
        sleeps: [10, 16],
        nightlyRange: [500, 1200],
        amenities: [
          "hot tub",
          "full kitchen",
          "mountain views",
          "fire pit",
          "grill",
          "Western decor",
        ],
        areaDescription: "West Cody / Yellowstone Highway",
        searchUrl:
          "https://www.vrbo.com/search?destination=Cody%2C+Wyoming&guests=16",
        notes:
          "Western lodges and ranch homes along the Yellowstone Highway; real cowboy vibes with modern amenities",
      },
      {
        type: "ranch",
        sleeps: [12, 20],
        nightlyRange: [600, 1500],
        amenities: [
          "horseback riding",
          "full kitchen",
          "mountain views",
          "fire pit",
          "grill",
          "river access",
        ],
        areaDescription: "South Fork / North Fork Shoshone River",
        searchUrl:
          "https://www.airbnb.com/s/Cody--Wyoming/homes?adults=16",
        notes:
          "Guest ranches along the Shoshone River offer the full Wyoming experience; some do group buyouts",
      },
    ],
    dining: [
      {
        name: "The Local",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Cody's best restaurant; locally sourced seasonal menus with excellent bison and elk preparations",
        reservationNeeded: true,
      },
      {
        name: "Pat O'Hara Brewing Company",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Craft brewery with elevated pub food and a big patio; the group dinner spot in Cody",
        reservationNeeded: false,
      },
      {
        name: "Wyoming's Rib & Chop House",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Prime ribs and chops in a Western-lodge setting; can handle big groups with advance notice",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "The Irma Hotel Bar",
        vibe: "saloon",
        highlight:
          "Buffalo Bill's original hotel with a cherrywood bar gifted by Queen Victoria; truly historic",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Silver Dollar Bar",
        vibe: "saloon",
        highlight:
          "Classic Western saloon with silver dollars embedded in the bar top; live music and dancing",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Pat O'Hara Brewing Company",
        vibe: "brewpub",
        highlight:
          "Cody's craft brewery with rotating taps and a chill taproom; the pre-dinner beer spot",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Cody Nite Rodeo",
        type: "horseback",
        duration: "2-3 hours",
        pricePerPerson: [25, 35],
        groupFriendly: true,
        highlight:
          "Nightly rodeo every summer since 1938; bull riding, barrel racing, and genuine Western entertainment",
        bestFor: "arrival day",
        provider: "Cody Stampede",
      },
      {
        name: "Yellowstone National Park Day Trip",
        type: "hiking",
        duration: "full day",
        pricePerPerson: [0, 35],
        groupFriendly: true,
        highlight:
          "East entrance of Yellowstone is 50 miles; geysers, Yellowstone Lake, and wildlife galore",
        bestFor: "rest day",
      },
      {
        name: "Buffalo Bill Center of the West",
        type: "hiking",
        duration: "3-4 hours",
        pricePerPerson: [20, 25],
        groupFriendly: true,
        highlight:
          "Five museums in one; Western art, firearms, natural history, and Plains Indian culture. World-class.",
        bestFor: "rest day",
      },
      {
        name: "Shoshone River Fly Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [175, 300],
        groupFriendly: true,
        highlight:
          "Guided float trips on the North Fork with Absaroka Range views; excellent cutthroat trout fishing",
        bestFor: "rest day",
        provider: "North Fork Anglers",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [8, 14],
        hourlyRate: [80, 130],
        providers: [
          "Cody Shuttle Service",
          "Yellowstone Tour Guides",
        ],
        notes:
          "Small market; most groups rent a 15-passenger van at the airport. Downtown is walkable for bars and restaurants.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 110],
        providers: ["Take a Chef"],
        mealTypes: [
          "bison steak dinner",
          "Western BBQ cookout",
          "elk and game dinner",
          "cowboy breakfast",
        ],
        notes:
          "Small private chef market; ranch lodges often have catering connections for group meals",
      },
    ],
  },

  // ── Rapid City, SD ──────────────────────────────────────────────────
  {
    id: "rapid-city-sd",
    city: "Rapid City",
    state: "SD",
    region: "Mountain West",
    tagline: "Black Hills golf with Mount Rushmore as the side quest",
    description:
      "Rapid City is the gateway to the Black Hills with a surprising number of quality golf courses, a revitalized downtown with great restaurants and bars, and Mount Rushmore and Crazy Horse as rest-day destinations. The value here is absurd — championship golf for half the price of Colorado resort towns.",
    population: "medium",
    nearestAirport: {
      code: "RAP",
      name: "Rapid City Regional Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Hart Ranch Golf Course",
        tier: "solid",
        greenFeeRange: [45, 72],
        holes: 18,
        par: 72,
        yardage: 6843,
        slope: 130,
        rating: 71.5,
        walkable: false,
        style: "mountain",
        driveMinutes: 15,
        url: "https://www.hartranchgolf.com",
        highlight:
          "Beautiful Black Hills course winding through ponderosa pines and red rock canyons; the best public track in the area",
      },
      {
        name: "Meadowbrook Golf Course",
        tier: "solid",
        greenFeeRange: [35, 52],
        holes: 18,
        par: 72,
        yardage: 7054,
        slope: 128,
        rating: 72.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.meadowbrookgc.com",
        highlight:
          "Rapid City's best muni; long, mature, and always well-conditioned with Rapid Creek running through",
      },
      {
        name: "Red Rocks Golf Course",
        tier: "budget",
        greenFeeRange: [25, 40],
        holes: 9,
        par: 36,
        yardage: 3300,
        slope: 120,
        rating: 35.0,
        walkable: true,
        style: "mountain",
        driveMinutes: 10,
        highlight:
          "Fun 9-hole track carved into red rock formations; unique scenery and excellent for a quick round",
      },
      {
        name: "Golf Club at Red Rock",
        tier: "premium",
        greenFeeRange: [55, 85],
        holes: 18,
        par: 72,
        yardage: 6700,
        slope: 133,
        rating: 71.0,
        walkable: false,
        style: "mountain",
        driveMinutes: 10,
        url: "https://www.golfclubredrock.com",
        highlight:
          "Dramatic layout through red rock canyon terrain with elevation changes and stunning Black Hills views",
      },
      {
        name: "The Golf Club at Devils Tower",
        tier: "solid",
        greenFeeRange: [40, 60],
        holes: 18,
        par: 72,
        yardage: 6600,
        slope: 125,
        rating: 69.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 40,
        url: "https://www.sundancegolfclub.com",
        highlight:
          "Play golf with a view of Devils Tower in the distance; worth the drive for the novelty and solid course",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [350, 900],
        amenities: [
          "hot tub",
          "full kitchen",
          "mountain views",
          "fire pit",
          "grill",
          "game room",
        ],
        areaDescription: "West Rapid City / Chapel Lane area",
        searchUrl:
          "https://www.vrbo.com/search?destination=Rapid+City%2C+South+Dakota&guests=16",
        notes:
          "Large homes in the western hills area offer Black Hills views and are 10 min to downtown; great value",
      },
      {
        type: "cabin",
        sleeps: [12, 18],
        nightlyRange: [400, 1100],
        amenities: [
          "hot tub",
          "full kitchen",
          "mountain views",
          "fire pit",
          "grill",
          "deck",
          "multiple levels",
        ],
        areaDescription: "Black Hills / Keystone / Hill City area",
        searchUrl:
          "https://www.airbnb.com/s/Rapid-City--South-Dakota/homes?adults=16",
        notes:
          "Black Hills cabins near Keystone/Hill City are 20-30 min from RC but closer to Rushmore and Custer State Park",
      },
    ],
    dining: [
      {
        name: "Delmonico Grill",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Downtown steakhouse with prime cuts, seafood, and a swanky vibe; private dining available for groups",
        reservationNeeded: true,
      },
      {
        name: "Firehouse Brewing Co.",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "South Dakota's oldest brewpub in a restored 1915 firehouse; great pub food and house beers",
        reservationNeeded: false,
      },
      {
        name: "Tally's Silver Spoon",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Beloved local breakfast and lunch spot; massive portions and a diner vibe that's pure South Dakota",
        reservationNeeded: false,
      },
      {
        name: "Que Pasa Mexican Cafe",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Huge portions of New Mexican-style food with strong margaritas; great for groups",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Murphy's Pub & Grill",
        vibe: "sports-bar",
        highlight:
          "Downtown sports bar with a big patio, TVs everywhere, and a late-night crowd; the group spot",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Hay Camp Brewing Company",
        vibe: "brewpub",
        highlight:
          "Local craft brewery with solid IPAs and a chill taproom; food trucks on weekends",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Paddy O'Neill's Pub",
        vibe: "sports-bar",
        highlight:
          "Irish pub with live music, trivia nights, and a great whiskey selection; always a fun crowd",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Independent Ale House",
        vibe: "brewpub",
        highlight:
          "40+ taps of craft beer in a downtown taproom; the beer nerd's paradise in Rapid City",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Mount Rushmore National Memorial",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 10],
        groupFriendly: true,
        highlight:
          "The iconic American landmark 25 minutes from town; evening lighting ceremony is unforgettable",
        bestFor: "rest day",
      },
      {
        name: "Custer State Park Wildlife Loop",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [0, 20],
        groupFriendly: true,
        highlight:
          "Drive through herds of bison, pronghorn, and wild burros; Needles Highway is a must-drive",
        bestFor: "rest day",
      },
      {
        name: "Crazy Horse Memorial",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [15, 30],
        groupFriendly: true,
        highlight:
          "The world's largest sculpture-in-progress; mountain carving with museum and cultural center",
        bestFor: "rest day",
      },
      {
        name: "Downtown Rapid City Art Walk",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [0, 20],
        groupFriendly: true,
        highlight:
          "Bronze presidential statues on every corner plus galleries, shops, and brewery stops",
        bestFor: "arrival day",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 14],
        hourlyRate: [100, 160],
        providers: [
          "Black Hills Party Bus",
          "Affordable Limo & Car Service",
        ],
        notes:
          "Party bus and shuttle options available; book ahead for summer peak season near Sturgis Rally week",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [50, 90],
        providers: ["Take a Chef"],
        mealTypes: [
          "bison steak dinner",
          "BBQ cookout",
          "South Dakota pheasant dinner",
          "breakfast spread",
        ],
        notes:
          "Small private chef market but bison and game are the local specialties; some catering companies do in-home events",
      },
    ],
  },

  // ── Keystone / Custer, SD ───────────────────────────────────────────
  {
    id: "keystone-custer-sd",
    city: "Keystone / Custer",
    state: "SD",
    region: "Mountain West",
    tagline: "Deep Black Hills immersion with Rushmore next door",
    description:
      "Base camp in the heart of the Black Hills puts you minutes from Mount Rushmore, Custer State Park, and surprising golf value. Keystone is the tourist hub and Custer is the charming small town — together they offer lodging options in the pines, a handful of good restaurants, and unbeatable access to the region's best attractions.",
    population: "tiny",
    nearestAirport: {
      code: "RAP",
      name: "Rapid City Regional Airport",
      driveMinutes: 40,
    },
    bestSeasons: ["summer"],
    courses: [
      {
        name: "Southern Hills Golf Course",
        tier: "solid",
        greenFeeRange: [40, 60],
        holes: 18,
        par: 70,
        yardage: 6200,
        slope: 125,
        rating: 68.5,
        walkable: true,
        style: "mountain",
        driveMinutes: 20,
        url: "https://www.southernhillsgolf.com",
        highlight:
          "Beautiful course through the ponderosa pines of Hot Springs; the best track in the southern Black Hills",
      },
      {
        name: "Hart Ranch Golf Course",
        tier: "solid",
        greenFeeRange: [45, 72],
        holes: 18,
        par: 72,
        yardage: 6843,
        slope: 130,
        rating: 71.5,
        walkable: false,
        style: "mountain",
        driveMinutes: 35,
        url: "https://www.hartranchgolf.com",
        highlight:
          "Best public course in the Black Hills; ponderosa pines and red rock canyons create a stunning layout",
      },
      {
        name: "Meadowbrook Golf Course",
        tier: "solid",
        greenFeeRange: [35, 52],
        holes: 18,
        par: 72,
        yardage: 7054,
        slope: 128,
        rating: 72.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 40,
        url: "https://www.meadowbrookgc.com",
        highlight:
          "Rapid City's top muni; long and mature with Rapid Creek flowing through. Worth the drive.",
      },
    ],
    lodging: [
      {
        type: "cabin",
        sleeps: [12, 20],
        nightlyRange: [500, 1400],
        amenities: [
          "hot tub",
          "full kitchen",
          "mountain views",
          "fire pit",
          "grill",
          "multiple levels",
          "game room",
        ],
        areaDescription: "Black Hills / Custer area",
        searchUrl:
          "https://www.vrbo.com/search?destination=Custer%2C+South+Dakota&guests=16",
        notes:
          "Large Black Hills cabins nestled in ponderosa pines; many sleep 16-20 and are minutes from Custer State Park",
      },
      {
        type: "lodge",
        sleeps: [10, 16],
        nightlyRange: [400, 1000],
        amenities: [
          "hot tub",
          "full kitchen",
          "mountain views",
          "fire pit",
          "grill",
          "deck",
        ],
        areaDescription: "Keystone / Hill City area",
        searchUrl:
          "https://www.airbnb.com/s/Keystone--South-Dakota/homes?adults=16",
        notes:
          "Keystone lodges are closest to Rushmore; Hill City has a more charming downtown with restaurants",
      },
    ],
    dining: [
      {
        name: "Sage Creek Grille",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Custer's best restaurant; bison steaks, elk medallions, and a Western-lodge atmosphere",
        reservationNeeded: true,
      },
      {
        name: "Alpine Inn",
        style: "steakhouse",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Hill City institution serving one thing — filet mignon with all the fixings, cash only, one seating",
        reservationNeeded: false,
      },
      {
        name: "Desperados Cowboy Restaurant",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Western-themed BBQ and steaks in Hill City; big portions and a fun cowboy atmosphere",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Laughing Water Brewing",
        vibe: "brewpub",
        highlight:
          "Custer's craft brewery with a nice taproom and outdoor seating; the local social hub",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Miner Brewing Company",
        vibe: "brewpub",
        highlight:
          "Hill City brewery with solid beers and live music on the patio; family-friendly turning rowdy later",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Gold Pan Saloon",
        vibe: "saloon",
        highlight:
          "Keystone's most iconic bar; Western saloon vibes with live music and dancing in summer",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Mount Rushmore National Memorial",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 10],
        groupFriendly: true,
        highlight:
          "5 minutes from Keystone; the iconic American landmark with the Presidential Trail hike",
        bestFor: "rest day",
      },
      {
        name: "Custer State Park Wildlife Loop & Needles Highway",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [0, 20],
        groupFriendly: true,
        highlight:
          "Bison herds, stunning granite spires, and one-lane tunnels; the best scenic drive in the Black Hills",
        bestFor: "rest day",
      },
      {
        name: "Mickelson Trail Mountain Biking",
        type: "mountain-biking",
        duration: "3-4 hours",
        pricePerPerson: [20, 45],
        groupFriendly: true,
        highlight:
          "109-mile converted rail trail through the Black Hills; ride any section with shuttle service available",
        bestFor: "rest day",
        provider: "Rabbit Bicycle",
      },
      {
        name: "Horseback Riding in Custer State Park",
        type: "horseback",
        duration: "2-3 hours",
        pricePerPerson: [50, 90],
        groupFriendly: true,
        highlight:
          "Trail rides through the park with bison and pronghorn sightings; real Western cowboy experience",
        bestFor: "rest day",
        provider: "Blue Bell Stables",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [8, 14],
        hourlyRate: [80, 140],
        providers: [
          "Black Hills Party Bus",
        ],
        notes:
          "Limited options in the deep Black Hills; most groups rent a 15-passenger van at Rapid City airport. Courses and attractions are spread out.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [55, 100],
        providers: ["Take a Chef"],
        mealTypes: [
          "bison steak dinner",
          "Black Hills BBQ cookout",
          "campfire dinner",
          "breakfast spread",
        ],
        notes:
          "Very small private chef market; lodge kitchens are well-equipped for DIY cookouts. Some Rapid City chefs will travel.",
      },
    ],
  },
];
