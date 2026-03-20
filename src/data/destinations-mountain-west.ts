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
];
