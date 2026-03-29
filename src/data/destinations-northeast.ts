import { Destination } from "./types";

export const northeastDestinations: Destination[] = [
  {
    id: "cape-cod-ma",
    city: "Cape Cod",
    state: "MA",
    region: "Northeast",
    tagline: "Coastal New England golf with lobster and ocean breezes",
    description:
      "Cape Cod delivers a unique combo of links-style coastal golf, world-class seafood, and classic beach-town nightlife. Play oceanfront rounds in the morning, hit a raw bar for lunch, and bar-hop through Hyannis or Chatham at night. Perfect for a group that wants golf without giving up the beach.",
    population: "medium",
    nearestAirport: {
      code: "HYA",
      name: "Barnstable Municipal Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Ocean Edge Resort - Nicklaus Course",
        tier: "premium",
        greenFeeRange: [125, 195],
        holes: 18,
        par: 72,
        yardage: 6665,
        slope: 131,
        rating: 72.2,
        walkable: false,
        style: "coastal",
        driveMinutes: 15,
        url: "https://www.oceanedge.com/golf",
        highlight:
          "Jack Nicklaus signature design winding through cranberry bogs and Cape Cod pines",
      },
      {
        name: "Cranberry Valley Golf Course",
        tier: "solid",
        greenFeeRange: [55, 85],
        holes: 18,
        par: 72,
        yardage: 6745,
        slope: 129,
        rating: 72.4,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.cranberryvalleygolfcourse.com",
        highlight:
          "Top-rated municipal course consistently ranked among the best public tracks in Massachusetts",
      },
      {
        name: "Dennis Pines Golf Course",
        tier: "solid",
        greenFeeRange: [45, 72],
        holes: 18,
        par: 72,
        yardage: 7029,
        slope: 133,
        rating: 73.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.dennisgolf.com",
        highlight:
          "Longest public course on the Cape — tight, tree-lined fairways that demand accuracy",
      },
      {
        name: "Willowbend Country Club",
        tier: "bucket-list",
        greenFeeRange: [175, 275],
        holes: 27,
        par: 72,
        yardage: 7002,
        slope: 138,
        rating: 73.8,
        walkable: false,
        style: "parkland",
        driveMinutes: 10,
        highlight:
          "Ultra-exclusive private club occasionally available through resort stay packages",
      },
      {
        name: "Pinehills Golf Club - Jones Course",
        tier: "premium",
        greenFeeRange: [95, 160],
        holes: 18,
        par: 72,
        yardage: 6797,
        slope: 135,
        rating: 73.1,
        walkable: false,
        style: "heathland",
        driveMinutes: 35,
        url: "https://www.pinehillsgolf.com",
        highlight:
          "Rees Jones design in Plymouth with dramatic elevation changes and pristine conditioning",
      },
      {
        name: "Pinehills Golf Club - Nicklaus Course",
        tier: "premium",
        greenFeeRange: [95, 160],
        holes: 18,
        par: 72,
        yardage: 6996,
        slope: 137,
        rating: 73.6,
        walkable: false,
        style: "heathland",
        driveMinutes: 35,
        url: "https://www.pinehillsgolf.com",
        highlight:
          "Nicklaus design at Pinehills — wider fairways but well-guarded greens through pine and scrub oak",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [800, 2500],
        amenities: [
          "pool",
          "hot tub",
          "outdoor grill",
          "ocean views",
          "multiple decks",
        ],
        areaDescription: "Hyannis Port / Yarmouth waterfront",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/massachusetts/cape-cod",
        notes:
          "Book 4-6 months ahead for summer. Shoulder season (Sept-Oct) has great availability and lower rates. Look for homes near Hyannis Main Street for walkable nightlife.",
      },
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [1200, 3500],
        amenities: [
          "private beach access",
          "pool",
          "game room",
          "chef kitchen",
          "water views",
        ],
        areaDescription: "Chatham / Harwich waterfront estates",
        searchUrl: "https://www.airbnb.com/s/Chatham--MA",
        notes:
          "High-end area with upscale dining nearby. More secluded than Hyannis but quieter nightlife scene.",
      },
    ],
    dining: [
      {
        name: "The Raw Bar",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Waterfront oyster bar on Hyannis Harbor — laid-back vibe, towers of shellfish, frozen drinks",
        reservationNeeded: false,
      },
      {
        name: "Naked Oyster Bistro",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Upscale seafood in downtown Hyannis with an excellent raw bar and creative cocktails",
        reservationNeeded: true,
      },
      {
        name: "The Impudent Oyster",
        style: "seafood",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Chatham institution since 1979 — international seafood dishes in a cozy cellar setting",
        reservationNeeded: true,
      },
      {
        name: "Cooke's Seafood",
        style: "seafood",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "No-frills fried clams and lobster rolls — the classic Cape Cod lunch spot",
        reservationNeeded: false,
      },
      {
        name: "Pain D'Avignon",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "French-inspired bistro in Hyannis with artisan breads and elevated farm-to-table dining",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "The Quarterdeck Lounge",
        vibe: "dive",
        highlight:
          "Cash-only Falmouth dive bar — sticky floors, strong pours, zero pretense",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Embargo",
        vibe: "cocktail",
        highlight:
          "Tiki-influenced cocktail bar on Hyannis Main Street with inventive rum drinks",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Cape Cod Beer",
        vibe: "brewpub",
        highlight:
          "Local craft brewery in Hyannis with a taproom, cornhole, and rotating food trucks",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "The Chatham Squire",
        vibe: "dive",
        highlight:
          "Legendary Chatham tavern since 1968 — two sides: restaurant and raucous bar",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Deep Sea Fishing Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [100, 175],
        groupFriendly: true,
        highlight:
          "Charter out of Hyannis Harbor for striped bass, bluefish, and tuna",
        bestFor: "rest day",
        provider: "Hy-Line Fishing",
      },
      {
        name: "Kayaking the Cape Cod Salt Marshes",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [45, 75],
        groupFriendly: true,
        highlight:
          "Guided paddle through tidal estuaries spotting seals, osprey, and horseshoe crabs",
        bestFor: "morning before golf",
      },
      {
        name: "Cape Cod Brewery Trail",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "Hit 4-5 craft breweries across the mid-Cape including Devil's Purse, Hog Island, and Barnstable Brewing",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [175, 250],
        providers: ["Cape Cod Car Service", "King Limo Cape Cod"],
        notes:
          "Essential for course-hopping. Sprinter vans work well on the narrow Cape roads. Book early for summer.",
      },
      {
        type: "trolley",
        capacity: [16, 24],
        hourlyRate: [250, 375],
        providers: ["Cape Cod Trolley Co"],
        notes:
          "Vintage trolley is a fun group option for bar crawls on Hyannis Main Street",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 140],
        providers: ["Cape Cod Personal Chef", "Culinarie Kit"],
        mealTypes: ["lobster bake", "clambake", "surf and turf", "breakfast"],
        notes:
          "Traditional New England clambake is the move — lobster, clams, corn, potatoes done on-site. Book 2-3 weeks ahead in summer.",
      },
    ],
  },
  {
    id: "lake-placid-ny",
    city: "Lake Placid",
    state: "NY",
    region: "Northeast",
    tagline: "Adirondack mountain golf with Olympic village charm",
    description:
      "Lake Placid offers stunning mountain golf surrounded by the Adirondack high peaks, with a charming Olympic village for apres-golf. Play tree-lined courses with mountain backdrops, then hit Main Street for craft beer and steaks. Best in summer when the weather is perfect and the courses are pristine.",
    population: "tiny",
    nearestAirport: {
      code: "SLK",
      name: "Adirondack Regional Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Whiteface Club & Resort",
        tier: "premium",
        greenFeeRange: [89, 139],
        holes: 18,
        par: 72,
        yardage: 6490,
        slope: 128,
        rating: 71.4,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.whitefaceclub.com",
        highlight:
          "Classic 1898 Walter Hagen layout on the shores of Lake Placid with Adirondack peak views",
      },
      {
        name: "Lake Placid Club - Links Course",
        tier: "premium",
        greenFeeRange: [79, 125],
        holes: 18,
        par: 71,
        yardage: 6236,
        slope: 129,
        rating: 70.8,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.lakeplacidcp.com",
        highlight:
          "Seymour Dunn design with panoramic mountain views from nearly every hole",
      },
      {
        name: "Lake Placid Club - Peaks Course",
        tier: "solid",
        greenFeeRange: [59, 95],
        holes: 18,
        par: 70,
        yardage: 6017,
        slope: 122,
        rating: 68.9,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        highlight:
          "Shorter companion course at LPC — great for an afternoon round with forgiving fairways",
      },
      {
        name: "Craig Wood Golf Course",
        tier: "solid",
        greenFeeRange: [42, 65],
        holes: 18,
        par: 72,
        yardage: 6554,
        slope: 125,
        rating: 70.9,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.craigwoodgolfclub.com",
        highlight:
          "Municipal gem named after the 1941 Masters champ — affordable mountain golf with tight tree-lined fairways",
      },
    ],
    lodging: [
      {
        type: "lodge",
        sleeps: [12, 20],
        nightlyRange: [900, 2200],
        amenities: [
          "lakefront",
          "fire pit",
          "hot tub",
          "canoes/kayaks",
          "game room",
          "wraparound deck",
        ],
        areaDescription: "Lake Placid lakefront / Mirror Lake area",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/new-york/lake-placid",
        notes:
          "Adirondack lodges on or near Mirror Lake are ideal. Many have private docks. Book 3-4 months ahead for July-August.",
      },
      {
        type: "cabin",
        sleeps: [10, 16],
        nightlyRange: [600, 1500],
        amenities: [
          "mountain views",
          "fireplace",
          "hot tub",
          "BBQ grill",
          "game room",
        ],
        areaDescription: "Saranac Lake / Ray Brook area (10 min from town)",
        searchUrl: "https://www.airbnb.com/s/Lake-Placid--NY",
        notes:
          "Slightly more affordable options in nearby Saranac Lake. Still close to all courses and Main Street.",
      },
    ],
    dining: [
      {
        name: "The Cottage at Mirror Lake Inn",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "AAA Four Diamond lakeside fine dining — the best dinner in town with a dress code",
        reservationNeeded: true,
      },
      {
        name: "Smoke Signals",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Texas-style BBQ in the Adirondacks with brisket, ribs, and a solid bourbon list",
        reservationNeeded: false,
      },
      {
        name: "Big Slide Brewery & Public House",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Lake Placid's craft brewery with elevated pub food and a great outdoor patio",
        reservationNeeded: false,
      },
      {
        name: "Lisa G's",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Hearty Italian on Main Street — big portions, casual vibe, perfect post-round refuel",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Lake Placid Pub & Brewery",
        vibe: "brewpub",
        highlight:
          "Original Lake Placid brewery right on Main Street — Ubu Ale is the flagship",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Zig Zags",
        vibe: "dive",
        highlight:
          "Legendary late-night spot with pool tables, darts, and cheap drinks after midnight",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Keg Lounge",
        vibe: "sports-bar",
        highlight:
          "No-frills sports bar tucked in a hotel basement — locals and visitors mix it up",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Dancing Bears Lounge",
        vibe: "cocktail",
        highlight:
          "Cozy upscale lounge at the High Peaks Resort with craft cocktails and live music weekends",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Adirondack Brewery Tour",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [25, 50],
        groupFriendly: true,
        highlight:
          "Hit Lake Placid Pub & Brewery, Big Slide, and Great Adirondack Brewing in one loop",
        bestFor: "rest day",
      },
      {
        name: "Lake Placid Boat Tour",
        type: "boat-rental",
        duration: "2-3 hours",
        pricePerPerson: [35, 60],
        groupFriendly: true,
        highlight:
          "Pontoon boat cruise on Mirror Lake or Lake Placid with mountain scenery",
        bestFor: "arrival day",
        provider: "Captain Marney's Boat Rentals",
      },
      {
        name: "Olympic Bobsled Experience",
        type: "zipline",
        duration: "2-3 hours",
        pricePerPerson: [75, 95],
        groupFriendly: true,
        highlight:
          "Ride the actual 1980 Olympic bobsled track on a wheeled summer bobsled — pure adrenaline",
        bestFor: "rest day",
        provider: "Whiteface Mountain / Olympic Sites",
      },
      {
        name: "Ausable River Fly Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [150, 250],
        groupFriendly: false,
        highlight:
          "Guided fly fishing on one of the best trout streams in the Northeast",
        bestFor: "morning before golf",
        provider: "Ausable River Two Fly Shop",
      },
      {
        name: "High Falls Gorge Hike",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [15, 20],
        groupFriendly: true,
        highlight:
          "Easy group-friendly hike along the Ausable River with four major waterfalls",
        bestFor: "morning before golf",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [150, 225],
        providers: ["Adirondack Limo", "Lake Placid Car Service"],
        notes:
          "Smaller vehicles are better for Adirondack mountain roads. Most courses are within 10 minutes so transport costs are low.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 120],
        providers: ["Adirondack Chef Co", "Take a Bite Catering"],
        mealTypes: [
          "steak dinner",
          "Adirondack game dinner",
          "BBQ cookout",
          "breakfast",
        ],
        notes:
          "Elk, venison, and trout are popular local options. Most lodge kitchens can handle a private chef setup. Book 2 weeks ahead.",
      },
    ],
  },
  {
    id: "williamsburg-va",
    city: "Williamsburg",
    state: "VA",
    region: "Northeast",
    tagline: "Historic Virginia golf with colonial charm and championship courses",
    description:
      "Williamsburg delivers serious golf with a side of American history. Kingsmill's three courses anchor the scene, but Golden Horseshoe and Ford's Colony round out a deep rotation. After your rounds, hit the colonial taverns and craft beer spots along DoG Street. A refined trip that still gets rowdy.",
    population: "small",
    nearestAirport: {
      code: "PHF",
      name: "Newport News/Williamsburg International Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Kingsmill Resort - River Course",
        tier: "bucket-list",
        greenFeeRange: [175, 295],
        holes: 18,
        par: 71,
        yardage: 6831,
        slope: 137,
        rating: 73.4,
        walkable: false,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.kingsmill.com/golf",
        highlight:
          "Former PGA Tour stop on the James River — Pete Dye design with iconic finishing holes along the bluffs",
      },
      {
        name: "Kingsmill Resort - Plantation Course",
        tier: "premium",
        greenFeeRange: [95, 155],
        holes: 18,
        par: 72,
        yardage: 6603,
        slope: 130,
        rating: 71.8,
        walkable: false,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.kingsmill.com/golf",
        highlight:
          "Arnold Palmer design weaving through ravines and hardwoods — the more playable Kingsmill track",
      },
      {
        name: "Kingsmill Resort - Woods Course",
        tier: "solid",
        greenFeeRange: [65, 100],
        holes: 18,
        par: 72,
        yardage: 6784,
        slope: 126,
        rating: 72.1,
        walkable: false,
        style: "parkland",
        driveMinutes: 10,
        highlight:
          "Tom Clark design with wider fairways — great warm-up round or hangover-day option",
      },
      {
        name: "Golden Horseshoe - Gold Course",
        tier: "bucket-list",
        greenFeeRange: [130, 215],
        holes: 18,
        par: 71,
        yardage: 6817,
        slope: 144,
        rating: 73.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.colonialwilliamsburgresort.com/golf",
        highlight:
          "Robert Trent Jones Sr. masterpiece — dramatic elevation changes and the legendary island-green 16th",
      },
      {
        name: "Golden Horseshoe - Green Course",
        tier: "premium",
        greenFeeRange: [75, 125],
        holes: 18,
        par: 72,
        yardage: 7120,
        slope: 134,
        rating: 73.9,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        highlight:
          "Rees Jones design — longer and more modern than the Gold with generous fairways through mature pines",
      },
      {
        name: "Ford's Colony - Marsh Hawk Course",
        tier: "premium",
        greenFeeRange: [70, 115],
        holes: 18,
        par: 72,
        yardage: 6769,
        slope: 132,
        rating: 72.6,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.fordscolony.com/golf",
        highlight:
          "Dan Maples design with water on 14 holes — target golf through wetlands and Virginia hardwoods",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 16],
        nightlyRange: [600, 1800],
        amenities: [
          "pool",
          "hot tub",
          "game room",
          "golf course views",
          "large kitchen",
        ],
        areaDescription: "Kingsmill Resort / Ford's Colony communities",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/virginia/williamsburg",
        notes:
          "Rental homes inside Kingsmill or Ford's Colony give you golf-course proximity and resort amenities. Great value in spring and fall.",
      },
      {
        type: "resort-house",
        sleeps: [10, 14],
        nightlyRange: [800, 2000],
        amenities: [
          "resort pool access",
          "spa access",
          "concierge",
          "shuttle to courses",
          "fitness center",
        ],
        areaDescription: "Colonial Williamsburg / DoG Street area",
        searchUrl: "https://www.colonialwilliamsburgresort.com",
        notes:
          "Colonial Williamsburg resort properties put you walking distance to historic taverns and restaurants.",
      },
    ],
    dining: [
      {
        name: "Fat Canary",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Williamsburg's best fine dining on Merchants Square — seasonal American cuisine with an award-winning wine list",
        reservationNeeded: true,
      },
      {
        name: "Chowning's Tavern",
        style: "southern",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "18th-century colonial tavern in CW serving ale and pub grub — the Gambols night music is a blast",
        reservationNeeded: false,
      },
      {
        name: "Cochon on 2nd",
        style: "southern",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Cajun-Southern fusion in New Town with excellent pork dishes and creative cocktails",
        reservationNeeded: true,
      },
      {
        name: "Waypoint Seafood & Grill",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Fresh Chesapeake Bay seafood with a raw bar and solid steak options for the non-fish crowd",
        reservationNeeded: true,
      },
      {
        name: "Pierce's Pitt Bar-B-Que",
        style: "bbq",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Legendary roadside BBQ since 1971 — pulled pork and ribs slow-smoked over oak and hickory",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Precarious Beer Project",
        vibe: "brewpub",
        highlight:
          "Williamsburg's best craft brewery with a huge taproom, outdoor seating, and rotating IPAs",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "The Hound's Tale",
        vibe: "cocktail",
        highlight:
          "Speakeasy-style cocktail bar in Merchants Square with craft drinks and colonial ambiance",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Paul's Deli",
        vibe: "dive",
        highlight:
          "William & Mary dive bar institution — cheap beer, loud music, zero pretension",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Amber Ox Public House",
        vibe: "patio",
        highlight:
          "Gastropub with craft beer garden, bocce courts, and a great outdoor scene",
        lateNight: false,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Colonial Williamsburg Historic Tour",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [20, 45],
        groupFriendly: true,
        highlight:
          "Walk the 18th-century streets, hit the colonial taverns, and watch blacksmithing demos",
        bestFor: "rest day",
      },
      {
        name: "Jamestown & Yorktown Battlefield Tour",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [15, 25],
        groupFriendly: true,
        highlight:
          "Visit the first permanent English settlement and the Revolutionary War battlefield",
        bestFor: "rest day",
      },
      {
        name: "James River Kayaking",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [40, 65],
        groupFriendly: true,
        highlight:
          "Paddle the James River past Kingsmill bluffs and colonial-era plantation sites",
        bestFor: "morning before golf",
        provider: "Back Creek Outfitters",
      },
      {
        name: "Go Ape Zipline & Adventure Park",
        type: "zipline",
        duration: "2-3 hours",
        pricePerPerson: [55, 65],
        groupFriendly: true,
        highlight:
          "Treetop zipline course through the forest canopy at Freedom Park",
        bestFor: "rest day",
        provider: "Go Ape",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [14, 20],
        hourlyRate: [150, 250],
        providers: [
          "Williamsburg Chauffeur Service",
          "James River Limo",
          "Gotta Ride Transportation",
        ],
        notes:
          "Courses are spread out 10-20 min from each other. Shuttle is essential. Colonial area is walkable at night.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 110],
        providers: ["Virginia Personal Chef Service", "Chef's Market Catering"],
        mealTypes: [
          "Virginia ham dinner",
          "Chesapeake crab feast",
          "steak dinner",
          "BBQ cookout",
          "breakfast",
        ],
        notes:
          "Chesapeake blue crab feast is the signature move here. Local chefs can source fresh crab and oysters daily.",
      },
    ],
  },
  {
    id: "myrtle-beach-sc",
    city: "Myrtle Beach",
    state: "SC",
    region: "Northeast",
    tagline: "80+ courses, budget-friendly packages, and legendary golf trip nightlife",
    description:
      "Myrtle Beach is the ultimate volume golf destination — more than 80 courses from bucket-list to budget, all-inclusive stay-and-play packages, and a nightlife strip that's purpose-built for golf trips. Caledonia and True Blue are the headliners, but the sheer variety means you can play a different course every day for a week and never get bored.",
    population: "medium",
    nearestAirport: {
      code: "MYR",
      name: "Myrtle Beach International Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["spring", "fall"],
    courses: [
      {
        name: "Caledonia Golf & Fish Club",
        tier: "bucket-list",
        greenFeeRange: [150, 250],
        holes: 18,
        par: 72,
        yardage: 6526,
        slope: 140,
        rating: 72.1,
        walkable: true,
        style: "coastal",
        driveMinutes: 25,
        url: "https://www.caledoniagolfandfishclub.com",
        highlight:
          "Mike Strantz masterpiece through live oaks and rice paddies — consistently ranked #1 in Myrtle Beach",
      },
      {
        name: "True Blue Golf Club",
        tier: "bucket-list",
        greenFeeRange: [100, 185],
        holes: 18,
        par: 72,
        yardage: 7126,
        slope: 140,
        rating: 74.5,
        walkable: true,
        style: "coastal",
        driveMinutes: 25,
        url: "https://www.truebluegolf.com",
        highlight:
          "Caledonia's sister course — massive waste bunkers and wide fairways on a former indigo plantation",
      },
      {
        name: "TPC Myrtle Beach",
        tier: "premium",
        greenFeeRange: [100, 175],
        holes: 18,
        par: 72,
        yardage: 6950,
        slope: 133,
        rating: 73.4,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.tpc.com/myrtle-beach",
        highlight:
          "Tom Fazio design in the TPC network — tournament-quality conditioning with strategic bunkering",
      },
      {
        name: "Tidewater Golf Club",
        tier: "premium",
        greenFeeRange: [85, 160],
        holes: 18,
        par: 72,
        yardage: 7044,
        slope: 134,
        rating: 73.8,
        walkable: false,
        style: "coastal",
        driveMinutes: 20,
        url: "https://www.tidewatergolf.com",
        highlight:
          "Perched on a bluff between the Intracoastal Waterway and Cherry Grove inlet — stunning water views on multiple holes",
      },
      {
        name: "Barefoot Resort - Dye Course",
        tier: "premium",
        greenFeeRange: [80, 150],
        holes: 18,
        par: 72,
        yardage: 7343,
        slope: 143,
        rating: 75.3,
        walkable: false,
        style: "coastal",
        driveMinutes: 15,
        url: "https://www.barefootgolf.com",
        highlight:
          "Pete Dye at his most diabolical — island greens, railroad ties, and water everywhere. Bring extra balls.",
      },
      {
        name: "Barefoot Resort - Love Course",
        tier: "premium",
        greenFeeRange: [75, 140],
        holes: 18,
        par: 72,
        yardage: 7047,
        slope: 131,
        rating: 73.5,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.barefootgolf.com",
        highlight:
          "Davis Love III design — the most playable of the four Barefoot courses with wide landing areas",
      },
      {
        name: "Barefoot Resort - Fazio Course",
        tier: "premium",
        greenFeeRange: [80, 145],
        holes: 18,
        par: 72,
        yardage: 6834,
        slope: 130,
        rating: 72.5,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.barefootgolf.com",
        highlight:
          "Tom Fazio's sculpted bunker design through wetlands — beautiful and strategic",
      },
      {
        name: "Barefoot Resort - Norman Course",
        tier: "premium",
        greenFeeRange: [80, 145],
        holes: 18,
        par: 72,
        yardage: 7200,
        slope: 135,
        rating: 74.4,
        walkable: false,
        style: "coastal",
        driveMinutes: 15,
        url: "https://www.barefootgolf.com",
        highlight:
          "Greg Norman Aussie-links style with natural waste areas and firm playing conditions",
      },
      {
        name: "Dunes Golf & Beach Club",
        tier: "bucket-list",
        greenFeeRange: [175, 300],
        holes: 18,
        par: 72,
        yardage: 7165,
        slope: 138,
        rating: 74.6,
        walkable: true,
        style: "coastal",
        driveMinutes: 10,
        highlight:
          "Robert Trent Jones Sr. classic from 1948 — the original Myrtle Beach championship course with the famous 'Waterloo' 13th hole",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [500, 1800],
        amenities: [
          "pool",
          "hot tub",
          "golf cart",
          "outdoor kitchen",
          "game room",
        ],
        areaDescription:
          "North Myrtle Beach / Barefoot Resort area",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/south-carolina/myrtle-beach",
        notes:
          "Houses inside Barefoot Resort or Tidewater give you on-site course access. North Myrtle is less touristy than the main strip. Great stay-and-play deals available.",
      },
      {
        type: "house",
        sleeps: [14, 22],
        nightlyRange: [400, 1400],
        amenities: [
          "private pool",
          "ocean views",
          "multiple levels",
          "large deck",
          "parking for multiple cars",
        ],
        areaDescription: "Surfside Beach / Garden City area near Caledonia",
        searchUrl: "https://www.airbnb.com/s/Myrtle-Beach--SC",
        notes:
          "Surfside area puts you close to Caledonia and True Blue. More residential feel, slightly cheaper than oceanfront Myrtle.",
      },
    ],
    dining: [
      {
        name: "The Wicked Tuna",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Waterfront Murrell's Inlet spot with sushi-grade tuna, outdoor decks, and great sunset views",
        reservationNeeded: true,
      },
      {
        name: "Rioz Brazilian Steakhouse",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "All-you-can-eat Brazilian rodizio — perfect for a hungry group after 36 holes",
        reservationNeeded: true,
      },
      {
        name: "Prosser's BBQ",
        style: "bbq",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Mustard-based SC BBQ buffet since 1971 — whole hog, hash, and sweet tea. Cash only.",
        reservationNeeded: false,
      },
      {
        name: "Dead Dog Saloon",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Murrell's Inlet creek-front bar and grill with live music, steamer pots, and frozen drinks",
        reservationNeeded: false,
      },
      {
        name: "Greg Norman's Australian Grille",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Shark-themed upscale steakhouse at Barefoot Landing with dry-aged beef and ocean views",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Bowery",
        vibe: "honky-tonk",
        highlight:
          "Legendary Myrtle Beach dive where Alabama was discovered — live country music every night since 1944",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Tin Roof",
        vibe: "sports-bar",
        highlight:
          "Live music venue on the Boardwalk with cold beer, bar games, and a rowdy atmosphere",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Suck Bang Blow",
        vibe: "dive",
        highlight:
          "Biker bar in Murrell's Inlet with live rock, cheap drinks, and zero rules — a trip institution",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "LandShark Bar & Grill",
        vibe: "patio",
        highlight:
          "Margaritaville-affiliated oceanfront bar with frozen drinks and beach views",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Crooked Hammock Brewery",
        vibe: "brewpub",
        highlight:
          "Beach-themed craft brewery with hammock garden, fire pits, and solid IPAs at Barefoot Landing",
        lateNight: false,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Deep Sea Fishing Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [80, 150],
        groupFriendly: true,
        highlight:
          "Charter out of Little River for king mackerel, red drum, and shark",
        bestFor: "rest day",
        provider: "Hurricane Fleet",
      },
      {
        name: "TopGolf Myrtle Beach",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [30, 50],
        groupFriendly: true,
        highlight:
          "Multi-level driving range with food, drinks, and competitive games between rounds",
        bestFor: "arrival day",
      },
      {
        name: "Broadway at the Beach Go-Karts & Attractions",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [25, 45],
        groupFriendly: true,
        highlight:
          "Go-karts, mini golf, and arcade games at the main entertainment complex",
        bestFor: "arrival day",
      },
      {
        name: "Jet Ski Rentals",
        type: "water-sports",
        duration: "2-3 hours",
        pricePerPerson: [60, 100],
        groupFriendly: true,
        highlight:
          "Jet ski the Intracoastal Waterway and open ocean — multiple rental spots along the coast",
        bestFor: "rest day",
        provider: "Action Water Sportz",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 28],
        hourlyRate: [175, 350],
        providers: [
          "Myrtle Beach Party Bus",
          "Coastal Ride",
          "Diamond Limousine",
        ],
        notes:
          "Party buses are huge here — many are golf-trip specific with coolers and speaker systems. Courses are spread out so transport is essential.",
      },
      {
        type: "shuttle",
        capacity: [12, 20],
        hourlyRate: [125, 225],
        providers: ["Coastline Shuttle", "Beach Ride"],
        notes:
          "Many stay-and-play packages include shuttle service to partner courses. Ask when booking.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [50, 95],
        providers: [
          "Myrtle Beach Private Chef",
          "CoastalChefs SC",
          "Take a Chef",
        ],
        mealTypes: [
          "Lowcountry boil",
          "seafood dinner",
          "steak dinner",
          "BBQ cookout",
          "breakfast",
        ],
        notes:
          "Lowcountry boil is the quintessential group meal here — shrimp, sausage, corn, and potatoes dumped on a newspaper-covered table. Most chefs will set up on a deck or by the pool.",
      },
    ],
  },
  {
    id: "saratoga-springs-ny",
    city: "Saratoga Springs",
    state: "NY",
    region: "Northeast",
    tagline: "Horse racing, healing springs, and championship golf in upstate elegance",
    description:
      "Saratoga Springs pairs world-class horse racing with surprisingly excellent golf in a walkable, bar-heavy downtown. Play rounds on pristine parkland courses in the morning, hit the track in the afternoon, and crawl Broadway's packed bar scene at night. The perfect guys' trip cocktail of sport, gambling, and nightlife.",
    population: "small",
    nearestAirport: {
      code: "ALB",
      name: "Albany International Airport",
      driveMinutes: 35,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Saratoga National Golf Club",
        tier: "premium",
        greenFeeRange: [99, 175],
        holes: 18,
        par: 72,
        yardage: 7265,
        slope: 140,
        rating: 75.1,
        walkable: false,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.golfsaratoga.com",
        highlight:
          "Roger Rulewich design ranked among the best public courses in New York — stunning water features throughout",
      },
      {
        name: "Saratoga Spa Golf Course",
        tier: "solid",
        greenFeeRange: [39, 62],
        holes: 18,
        par: 72,
        yardage: 7141,
        slope: 130,
        rating: 73.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.saratogaspagolf.com",
        highlight:
          "Classic state park course inside Saratoga Spa State Park — great value with mature tree-lined fairways",
      },
      {
        name: "Ballston Spa Country Club",
        tier: "solid",
        greenFeeRange: [45, 75],
        holes: 18,
        par: 71,
        yardage: 6374,
        slope: 125,
        rating: 70.2,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        highlight:
          "Semi-private club with public tee times — tight, strategic layout that rewards shot-making",
      },
      {
        name: "Airway Meadows Golf Club",
        tier: "budget",
        greenFeeRange: [29, 49],
        holes: 18,
        par: 72,
        yardage: 6500,
        slope: 122,
        rating: 69.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "Affordable local favorite with wide fairways — good warm-up or cool-down round",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [600, 1800],
        amenities: ["pool", "hot tub", "outdoor grill", "game room", "fire pit"],
        areaDescription: "Saratoga Lake / Route 9P waterfront",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/new-york/saratoga-springs",
        notes:
          "Saratoga Lake houses offer space and privacy, 10 min from downtown. Book well ahead if visiting during racing season (late July-early Sept).",
      },
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [500, 1400],
        amenities: ["walkable to Broadway", "parking", "chef kitchen", "multiple bedrooms"],
        areaDescription: "Downtown Saratoga / East Side",
        searchUrl: "https://www.airbnb.com/s/Saratoga-Springs--NY",
        notes:
          "Downtown rentals mean walking to bars and restaurants. Smaller groups fit better here.",
      },
    ],
    dining: [
      {
        name: "Prime at Saratoga National",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Upscale steakhouse overlooking the 18th green — filet and lobster tail after your round",
        reservationNeeded: true,
      },
      {
        name: "Salt & Char",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Downtown chophouse with dry-aged steaks and a killer bourbon list on Broadway",
        reservationNeeded: true,
      },
      {
        name: "Hattie's Restaurant",
        style: "southern",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Famous southern comfort food since 1938 — fried chicken that's worth the wait",
        reservationNeeded: true,
      },
      {
        name: "Druthers Brewing Company",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Broadway brewpub with house-brewed beers, burgers, and a huge patio",
        reservationNeeded: false,
      },
      {
        name: "Fish at 30 Lake",
        style: "seafood",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Fresh seafood and raw bar in an intimate downtown setting",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "The Saratoga City Tavern",
        vibe: "sports-bar",
        highlight:
          "Multi-level bar on Caroline Street with rooftop deck and beer pong — the center of Saratoga nightlife",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Gaffney's",
        vibe: "dive",
        highlight:
          "Caroline Street institution — packed house, strong drinks, live music on weekends",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Parting Glass",
        vibe: "dive",
        highlight:
          "Classic Irish pub with live Celtic music and a loyal locals crowd",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Henry Street Taproom",
        vibe: "cocktail",
        highlight:
          "Craft cocktails and curated beer list in a chill brick-walled space",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Saratoga Race Course",
        type: "casino",
        duration: "half day",
        pricePerPerson: [5, 50],
        groupFriendly: true,
        highlight:
          "America's oldest sporting venue — bet the ponies during summer racing season (July-Sept)",
        bestFor: "rest day",
        provider: "NYRA",
      },
      {
        name: "Saratoga Casino Hotel",
        type: "casino",
        duration: "2-3 hours",
        pricePerPerson: [0, 100],
        groupFriendly: true,
        highlight:
          "Harness racing, slots, and table games year-round when the big track is closed",
        bestFor: "arrival day",
      },
      {
        name: "Saratoga Spa State Park",
        type: "spa",
        duration: "2-3 hours",
        pricePerPerson: [30, 75],
        groupFriendly: true,
        highlight:
          "Historic Roosevelt Baths with natural mineral spring soaking — oddly great for a guys' trip recovery day",
        bestFor: "rest day",
      },
      {
        name: "Saratoga Brewery Trail",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [25, 60],
        groupFriendly: true,
        highlight:
          "Hit Druthers, Artisanal Brew Works, and Walt & Whitman in one afternoon",
        bestFor: "rest day",
      },
      {
        name: "Adirondack Adventure Center",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [55, 95],
        groupFriendly: true,
        highlight:
          "White water rafting on the Sacandaga River — Class II-III rapids perfect for groups",
        bestFor: "rest day",
        provider: "Adirondack Adventure Center",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [150, 225],
        providers: ["Saratoga Luxury Limousine", "Upstate Transit"],
        notes:
          "Essential for getting between courses and Saratoga Lake lodging. Book early during racing season.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 130],
        providers: ["Take a Bite Catering", "Mazzone Hospitality"],
        mealTypes: ["steak dinner", "BBQ cookout", "brunch", "Italian feast"],
        notes:
          "Mazzone is the premier local caterer — their steak and seafood dinner setup is top-notch for lake house events.",
      },
    ],
  },
  {
    id: "finger-lakes-ny",
    city: "Finger Lakes",
    state: "NY",
    region: "Northeast",
    tagline: "Wine country golf with lake views and gorge hikes",
    description:
      "The Finger Lakes region offers rolling vineyard golf, 100+ wineries, and stunning lake scenery. Play courses carved through glacial terrain with lake panoramas, then spend afternoons tasting world-class Rieslings. It is a refined trip for groups that want golf plus something beyond the usual bar crawl.",
    population: "small",
    nearestAirport: {
      code: "ROC",
      name: "Frederick Douglass Greater Rochester International Airport",
      driveMinutes: 60,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Bristol Harbour Golf Club",
        tier: "premium",
        greenFeeRange: [69, 109],
        holes: 18,
        par: 72,
        yardage: 6700,
        slope: 132,
        rating: 72.3,
        walkable: false,
        style: "mountain",
        driveMinutes: 10,
        url: "https://www.bristolharbour.com/golf",
        highlight:
          "Robert Trent Jones Sr. design perched above Canandaigua Lake with jaw-dropping elevation changes",
      },
      {
        name: "Ravenwood Golf Club",
        tier: "solid",
        greenFeeRange: [39, 65],
        holes: 18,
        par: 72,
        yardage: 6800,
        slope: 128,
        rating: 72.1,
        walkable: true,
        style: "parkland",
        driveMinutes: 25,
        url: "https://www.ravenwoodgolf.com",
        highlight:
          "Well-conditioned public course in Victor with a links-style back nine and solid pace of play",
      },
      {
        name: "Seneca Lake Country Club",
        tier: "solid",
        greenFeeRange: [35, 55],
        holes: 18,
        par: 70,
        yardage: 6200,
        slope: 123,
        rating: 69.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "Charming semi-private track overlooking Seneca Lake — great views and honest golf",
      },
      {
        name: "Reservoir Creek Golf Club",
        tier: "solid",
        greenFeeRange: [35, 59],
        holes: 18,
        par: 72,
        yardage: 6600,
        slope: 126,
        rating: 71.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 30,
        highlight:
          "Hidden gem near Watkins Glen — hilly terrain, well-maintained greens, very affordable",
      },
    ],
    lodging: [
      {
        type: "lakehouse",
        sleeps: [10, 18],
        nightlyRange: [600, 2000],
        amenities: ["lake access", "dock", "hot tub", "fire pit", "outdoor grill", "kayaks"],
        areaDescription: "Seneca Lake / Keuka Lake waterfront",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/new-york/finger-lakes",
        notes:
          "Lakefront houses are the way to go here. Seneca Lake is centrally located for wineries and courses. Book 2-3 months ahead for summer.",
      },
      {
        type: "lodge",
        sleeps: [8, 16],
        nightlyRange: [500, 1500],
        amenities: ["pool", "restaurant", "fire pit", "vineyard views"],
        areaDescription: "Canandaigua / Geneva area",
        searchUrl: "https://www.airbnb.com/s/Finger-Lakes--NY",
        notes:
          "Geneva has the best walkable downtown for dining. Canandaigua is closer to Bristol Harbour golf.",
      },
    ],
    dining: [
      {
        name: "FLX Table",
        style: "farm-to-table",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Communal 14-seat tasting menu experience in Geneva — perfect for a group dinner if you can book it",
        reservationNeeded: true,
      },
      {
        name: "Kindred Fare",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Farm-to-table bistro in Geneva with local ingredients and solid cocktail program",
        reservationNeeded: true,
      },
      {
        name: "Dano's Heuriger on Seneca",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Austrian-inspired wine bar and restaurant on the Seneca Lake wine trail",
        reservationNeeded: true,
      },
      {
        name: "Stonecat Cafe",
        style: "farm-to-table",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Relaxed farm-to-table spot near Hector with great local wine pairings and outdoor seating",
        reservationNeeded: false,
      },
      {
        name: "The Red Dove Tavern",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Creative American menu in Geneva — duck confit, pork belly, and an impressive wine list",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "FLX Wienery",
        vibe: "brewpub",
        highlight:
          "Casual craft beer and gourmet hot dogs in downtown Geneva — exactly what it sounds like",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Lake Drum Brewing",
        vibe: "brewpub",
        highlight:
          "Geneva craft brewery with rotating taps and a chill taproom vibe",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Twisted Rail Brewing",
        vibe: "brewpub",
        highlight:
          "Canandaigua brewpub with a big beer selection and pub grub",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Seneca Lake Wine Trail",
        type: "winery",
        duration: "half day",
        pricePerPerson: [20, 60],
        groupFriendly: true,
        highlight:
          "30+ wineries on Seneca Lake alone — world-class Riesling, plus cideries and distilleries mixed in",
        bestFor: "rest day",
      },
      {
        name: "Watkins Glen State Park",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 10],
        groupFriendly: true,
        highlight:
          "Gorge trail with 19 waterfalls in 2 miles — one of the most stunning hikes in the Northeast",
        bestFor: "morning before golf",
      },
      {
        name: "Finger Lakes Distillery Tour",
        type: "distillery",
        duration: "2-3 hours",
        pricePerPerson: [15, 40],
        groupFriendly: true,
        highlight:
          "Hit Finger Lakes Distilling, Black Button, and more for bourbon, gin, and grappa tastings",
        bestFor: "rest day",
      },
      {
        name: "Seneca Lake Boat Rental",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [50, 100],
        groupFriendly: true,
        highlight:
          "Pontoon or speedboat rental on Seneca Lake — cruise the deepest Finger Lake with beers in hand",
        bestFor: "rest day",
        provider: "Seneca Lake Boat Rentals",
      },
      {
        name: "Watkins Glen International",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [30, 75],
        groupFriendly: true,
        highlight:
          "Drive the famous NASCAR track in a pace car or hit the go-kart track next door",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [10, 14],
        hourlyRate: [150, 225],
        providers: ["Finger Lakes Wine Tours", "Luxury Wine Tours FLX"],
        notes:
          "A wine trail shuttle is practically required — distances between wineries and courses add up. Most services know the route cold.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 120],
        providers: ["Finger Lakes Personal Chef", "Chef-Driven Catering"],
        mealTypes: ["farm-to-table dinner", "BBQ cookout", "wine pairing dinner", "breakfast"],
        notes:
          "The farm-to-table scene here is legit — chefs source from local farms and pair with FLX wines. A lakehouse dinner is the highlight of the trip.",
      },
    ],
  },
  {
    id: "poconos-pa",
    city: "Poconos",
    state: "PA",
    region: "Northeast",
    tagline: "Mountain resort golf with casino nights and adventure parks",
    description:
      "The Poconos deliver affordable mountain golf, multiple casinos, and endless group activities within 2 hours of NYC and Philly. Play resort courses through forested mountain terrain, hit Mount Airy Casino at night, and fill rest days with go-karts, paintball, and whitewater rafting. Maximum bang for the buck.",
    population: "small",
    nearestAirport: {
      code: "AVP",
      name: "Wilkes-Barre/Scranton International Airport",
      driveMinutes: 45,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "Mount Airy Casino Resort Golf Course",
        tier: "premium",
        greenFeeRange: [79, 129],
        holes: 18,
        par: 72,
        yardage: 7123,
        slope: 137,
        rating: 74.0,
        walkable: false,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.mountairycasino.com/golf",
        highlight:
          "Hal Purdy design carved through Pocono Mountain forests — casino resort amenities included",
      },
      {
        name: "Shawnee Inn & Golf Resort",
        tier: "premium",
        greenFeeRange: [69, 119],
        holes: 27,
        par: 72,
        yardage: 6889,
        slope: 130,
        rating: 72.6,
        walkable: true,
        style: "resort",
        driveMinutes: 25,
        url: "https://www.shawneeinn.com/golf",
        highlight:
          "A.W. Tillinghast design on the Delaware River — 27 holes of classic resort golf with mountain views",
      },
      {
        name: "Great Bear Golf Club",
        tier: "premium",
        greenFeeRange: [75, 125],
        holes: 18,
        par: 72,
        yardage: 6928,
        slope: 141,
        rating: 73.4,
        walkable: false,
        style: "mountain",
        driveMinutes: 15,
        url: "https://www.greatbeargc.com",
        highlight:
          "Jack Nicklaus signature course at Shawnee Mountain — dramatic elevation changes and forest corridors",
      },
      {
        name: "Buck Hill Golf Club",
        tier: "solid",
        greenFeeRange: [39, 65],
        holes: 27,
        par: 72,
        yardage: 6600,
        slope: 125,
        rating: 71.0,
        walkable: true,
        style: "mountain",
        driveMinutes: 20,
        highlight:
          "Historic 27-hole facility with Donald Ross roots and solid mountain views at a budget price",
      },
    ],
    lodging: [
      {
        type: "cabin",
        sleeps: [10, 20],
        nightlyRange: [400, 1500],
        amenities: ["hot tub", "game room", "fire pit", "pool table", "multiple decks"],
        areaDescription: "Mount Pocono / Tobyhanna area",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/pennsylvania/poconos",
        notes:
          "Cabins are the play here — tons of options sleeping 12-20 with hot tubs and game rooms. Very affordable compared to other NE destinations.",
      },
      {
        type: "lodge",
        sleeps: [12, 16],
        nightlyRange: [500, 1200],
        amenities: ["pool", "restaurant", "spa", "golf on-site"],
        areaDescription: "Shawnee on Delaware / Marshalls Creek",
        notes:
          "Shawnee Inn is a full resort with lodging packages that include golf. Good for groups wanting everything in one place.",
      },
    ],
    dining: [
      {
        name: "Saen Thai Cuisine",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Surprising gem — some of the best Thai food in rural PA, with group-friendly space",
        reservationNeeded: false,
      },
      {
        name: "The Gem & Keystone Brewpub",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Pocono brewpub with house beers, pub food, and live music weekends",
        reservationNeeded: false,
      },
      {
        name: "Desaki Restaurant",
        style: "sushi",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Hibachi and sushi in a lodge-like setting — fun group dinner with tableside cooking",
        reservationNeeded: true,
      },
      {
        name: "Guy Fieri's Mt. Pocono Kitchen",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Celebrity chef spot at Mount Airy Casino — over-the-top burgers, wings, and trash can nachos",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Mount Airy Casino Bars",
        vibe: "casino-bar",
        highlight:
          "Multiple bars and lounges inside the casino — play blackjack with a cocktail in hand",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Barley Creek Brewing Company",
        vibe: "brewpub",
        highlight:
          "Tannersville craft brewery with 12+ house taps, pub food, and a solid patio",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Pocono Brewing Company",
        vibe: "brewpub",
        highlight:
          "Swiftwater nano-brewery with creative small-batch beers and a casual taproom",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Sarah Street Grill",
        vibe: "sports-bar",
        highlight:
          "Stroudsburg sports bar with craft beers, big screens, and a late-night crowd",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Mount Airy Casino",
        type: "casino",
        duration: "2-3 hours",
        pricePerPerson: [0, 200],
        groupFriendly: true,
        highlight:
          "Full casino floor with table games, slots, poker room, and sportsbook",
        bestFor: "arrival day",
      },
      {
        name: "Pocono Whitewater Rafting",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [55, 95],
        groupFriendly: true,
        highlight:
          "Class II-III rapids on the Lehigh River — guides handle everything, just show up",
        bestFor: "rest day",
        provider: "Pocono Whitewater",
      },
      {
        name: "Skirmish Paintball",
        type: "paintball",
        duration: "half day",
        pricePerPerson: [35, 60],
        groupFriendly: true,
        highlight:
          "50+ playing fields making it one of the largest paintball facilities in the world",
        bestFor: "rest day",
        provider: "Skirmish USA",
      },
      {
        name: "Camelback Mountain Adventures",
        type: "zipline",
        duration: "2-3 hours",
        pricePerPerson: [45, 85],
        groupFriendly: true,
        highlight:
          "Zip lines, mountain coaster, and treetop obstacle course — summer adventure park",
        bestFor: "rest day",
        provider: "Camelback Resort",
      },
      {
        name: "Pocono Go-Karts & Play Park",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [20, 50],
        groupFriendly: true,
        highlight:
          "Go-karts, bumper boats, mini golf — cheesy but fun after a few beers",
        bestFor: "arrival day",
      },
      {
        name: "Bushkill Falls Hike",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [15, 15],
        groupFriendly: true,
        highlight:
          "The Niagara of Pennsylvania — 8 waterfalls along well-maintained trails",
        bestFor: "morning before golf",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 22],
        hourlyRate: [175, 300],
        providers: ["Pocono Limo", "Lehigh Valley Limo"],
        notes:
          "Casino shuttle services are also available from most resorts. Party bus is great for course-to-casino runs.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [55, 110],
        providers: ["Pocono Personal Chef", "Cabin Catering Co"],
        mealTypes: ["steak dinner", "BBQ cookout", "breakfast", "pasta night"],
        notes:
          "Cabin BBQ cookouts are the move here — grill setup on the deck with mountain views. Most chefs bring everything including charcoal.",
      },
    ],
  },
  {
    id: "berkshires-ma",
    city: "Berkshires",
    state: "MA",
    region: "Northeast",
    tagline: "Refined New England golf wrapped in art, culture, and mountain scenery",
    description:
      "The Berkshires offer a surprisingly upscale golf trip with rolling mountain courses, world-class arts venues, and a farm-to-table food scene rivaling any major city. Play courses through the Taconic Range, catch live music at Tanglewood, and dine at James Beard-recognized restaurants. A more refined trip that still delivers on the golf.",
    population: "small",
    nearestAirport: {
      code: "ALB",
      name: "Albany International Airport",
      driveMinutes: 50,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Taconic Golf Club",
        tier: "premium",
        greenFeeRange: [85, 140],
        holes: 18,
        par: 71,
        yardage: 6640,
        slope: 134,
        rating: 72.4,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        highlight:
          "Wayne Stiles classic set against Mount Greylock — one of the best public courses in New England",
      },
      {
        name: "Cranwell Resort Golf Course",
        tier: "premium",
        greenFeeRange: [75, 125],
        holes: 18,
        par: 71,
        yardage: 6387,
        slope: 131,
        rating: 71.2,
        walkable: false,
        style: "resort",
        driveMinutes: 10,
        url: "https://www.miraval.com/berkshires/activities/golf",
        highlight:
          "Stiles & Van Kleek design on the grounds of a former Gilded Age estate — now part of Miraval Resort",
      },
      {
        name: "Waubeeka Golf Links",
        tier: "solid",
        greenFeeRange: [45, 75],
        holes: 18,
        par: 72,
        yardage: 6324,
        slope: 127,
        rating: 70.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "Williamstown gem in the shadow of the Green Mountains — friendly layout with excellent fall foliage",
      },
      {
        name: "Wahconah Country Club",
        tier: "solid",
        greenFeeRange: [40, 65],
        holes: 18,
        par: 71,
        yardage: 6506,
        slope: 128,
        rating: 71.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "Semi-private course in Dalton with tree-lined fairways and a classic New England feel",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [600, 2000],
        amenities: ["pool", "hot tub", "mountain views", "fire pit", "chef kitchen"],
        areaDescription: "Lenox / Great Barrington area",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/massachusetts/berkshires",
        notes:
          "Lenox is central to most courses and restaurants. Great Barrington has a more lively downtown scene. Book ahead for Tanglewood season (June-Aug).",
      },
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [500, 1600],
        amenities: ["lake access", "kayaks", "fire pit", "multiple bedrooms"],
        areaDescription: "Stockbridge / Lee area",
        searchUrl: "https://www.airbnb.com/s/Berkshires--MA",
        notes:
          "Stockbridge is Norman Rockwell charming. Lee offers good proximity to both courses and I-90 access.",
      },
    ],
    dining: [
      {
        name: "Nudel",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Lenox gem with a rotating farm-to-table menu — tiny space, huge flavors, excellent wine list",
        reservationNeeded: true,
      },
      {
        name: "The Old Inn on the Green",
        style: "farm-to-table",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Candlelit prix-fixe dinners in a 1760 stagecoach inn — unforgettable group dining experience",
        reservationNeeded: true,
      },
      {
        name: "Trattoria Rustica",
        style: "italian",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Pittsfield Italian with handmade pasta and a great patio — hearty portions for hungry golfers",
        reservationNeeded: true,
      },
      {
        name: "SoCo Creamery & Cafe",
        style: "casual",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Great Barrington lunch spot with creative sandwiches and house-made ice cream",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "The Well",
        vibe: "cocktail",
        highlight:
          "Great Barrington cocktail bar with craft drinks, small plates, and a moody vibe",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Brick House Pub",
        vibe: "dive",
        highlight:
          "Housatonic dive bar with live music, cheap beers, and zero pretense",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Barrington Brewery",
        vibe: "brewpub",
        highlight:
          "Farm brewery in Great Barrington with house ales, pub food, and a big outdoor space",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Tanglewood Music Festival",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [25, 100],
        groupFriendly: true,
        highlight:
          "Boston Symphony summer home — lawn seats with wine and a picnic is a quintessential Berkshires experience",
        bestFor: "rest day",
      },
      {
        name: "Mount Greylock Summit Hike",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [0, 0],
        groupFriendly: true,
        highlight:
          "Highest point in Massachusetts — drive up or hike for panoramic views of 5 states",
        bestFor: "morning before golf",
      },
      {
        name: "Berkshire Brewing Company Tour",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [10, 25],
        groupFriendly: true,
        highlight:
          "South Deerfield brewery with tours, tastings, and a loyal following for their Steel Rail pale ale",
        bestFor: "rest day",
      },
      {
        name: "Jiminy Peak Mountain Adventure",
        type: "zipline",
        duration: "2-3 hours",
        pricePerPerson: [35, 70],
        groupFriendly: true,
        highlight:
          "Summer mountain coaster, zip line, and aerial park at a ski resort",
        bestFor: "rest day",
        provider: "Jiminy Peak",
      },
      {
        name: "Berkshire Scenic Railway",
        type: "winery",
        duration: "2-3 hours",
        pricePerPerson: [20, 45],
        groupFriendly: true,
        highlight:
          "Wine train experience through the Berkshire countryside — tasting room on rails",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [10, 14],
        hourlyRate: [150, 225],
        providers: ["Berkshire Limousine", "Abbott's Limousine"],
        notes:
          "Courses and restaurants are spread out, so transport is key. Sprinter vans handle the winding mountain roads well.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 140],
        providers: ["Berkshire Chef Services", "Farm & Table Catering"],
        mealTypes: ["farm-to-table dinner", "brunch", "steak dinner", "wine pairing dinner"],
        notes:
          "The farm-to-table chef experience here is outstanding — local farms supply everything. A private wine-paired dinner at your rental is worth every penny.",
      },
    ],
  },
  {
    id: "stowe-vt",
    city: "Stowe",
    state: "VT",
    region: "Northeast",
    tagline: "Mountain village golf with craft beer, covered bridges, and peak foliage",
    description:
      "Stowe is Vermont's premier resort town with mountain golf, a thriving craft beer scene, and some of the best fall foliage in America. Play courses framed by Mount Mansfield, hit the Stowe Recreation Path for morning runs, and spend evenings at farm-to-table restaurants and cozy brewpubs. Peak foliage season (late Sept-mid Oct) is unforgettable.",
    population: "tiny",
    nearestAirport: {
      code: "BTV",
      name: "Burlington International Airport",
      driveMinutes: 45,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Stowe Country Club",
        tier: "premium",
        greenFeeRange: [89, 145],
        holes: 18,
        par: 72,
        yardage: 6206,
        slope: 129,
        rating: 70.7,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.stowe.com/golf",
        highlight:
          "Classic mountain course with Mount Mansfield as the backdrop — immaculate conditioning and challenging greens",
      },
      {
        name: "Stowe Mountain Lodge Golf Club",
        tier: "premium",
        greenFeeRange: [109, 179],
        holes: 18,
        par: 72,
        yardage: 6400,
        slope: 133,
        rating: 71.5,
        walkable: false,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.destinationhotels.com/stowe-mountain-lodge",
        highlight:
          "Bob Cupp design at the base of Spruce Peak with resort luxury and spectacular mountain views",
      },
      {
        name: "Copley Country Club",
        tier: "solid",
        greenFeeRange: [39, 65],
        holes: 9,
        par: 34,
        yardage: 3000,
        slope: 118,
        rating: 68.5,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        highlight:
          "Charming 9-hole course right in Stowe village — quick round with Vermont village charm",
      },
      {
        name: "Country Club of Vermont",
        tier: "solid",
        greenFeeRange: [55, 85],
        holes: 18,
        par: 71,
        yardage: 6279,
        slope: 126,
        rating: 70.3,
        walkable: true,
        style: "mountain",
        driveMinutes: 20,
        highlight:
          "Waterbury semi-private course — solid value with rolling terrain and mountain views",
      },
    ],
    lodging: [
      {
        type: "cabin",
        sleeps: [10, 16],
        nightlyRange: [600, 2200],
        amenities: ["hot tub", "fire pit", "mountain views", "ski-in access", "game room"],
        areaDescription: "Mountain Road / Stowe Mountain Resort area",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/vermont/stowe",
        notes:
          "Mountain Road chalets and cabins are the classic Stowe experience. Book 3+ months ahead for foliage season. Summer rates are much more reasonable.",
      },
      {
        type: "lodge",
        sleeps: [8, 14],
        nightlyRange: [500, 1500],
        amenities: ["restaurant", "spa", "pool", "fire pit"],
        areaDescription: "Stowe Village / Route 100",
        searchUrl: "https://www.airbnb.com/s/Stowe--VT",
        notes:
          "Stowe Village lodges offer walkability to restaurants and bars. Green Mountain Inn and Stoweflake are solid group options.",
      },
    ],
    dining: [
      {
        name: "Hen of the Wood",
        style: "farm-to-table",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "James Beard-nominated restaurant in a restored grist mill — mushroom toast is legendary",
        reservationNeeded: true,
      },
      {
        name: "Doc Ponds",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Stowe local favorite with smash burgers, craft beer, and a killer patio scene",
        reservationNeeded: false,
      },
      {
        name: "The Bench",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Upscale pub food and cocktails on Mountain Road — group-friendly with big tables",
        reservationNeeded: true,
      },
      {
        name: "Michael's on the Hill",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "European-inspired fine dining with panoramic mountain views — big-night dinner spot",
        reservationNeeded: true,
      },
      {
        name: "Piecasso Pizzeria & Lounge",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Wood-fired pizza and cocktails in Stowe Village — casual group dinner that always delivers",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "The Matterhorn",
        vibe: "dive",
        highlight:
          "Legendary Stowe bar since the 1960s — sushi upstairs, live music and dancing downstairs",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Idletyme Brewing Company",
        vibe: "brewpub",
        highlight:
          "Stowe Village craft brewery with house beers and a cozy taproom vibe",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Alchemist Brewery",
        vibe: "brewpub",
        highlight:
          "Home of the legendary Heady Topper DIPA — the beer pilgrimage alone is worth the trip",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Charlie B's at Stoweflake",
        vibe: "sports-bar",
        highlight:
          "Low-key resort bar with craft cocktails, pub games, and big screens for game nights",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "The Alchemist Brewery Visit",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [10, 30],
        groupFriendly: true,
        highlight:
          "Pilgrimage for Heady Topper and Focal Banger — the best IPA in America brewed right here",
        bestFor: "rest day",
      },
      {
        name: "Stowe Recreation Path",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 0],
        groupFriendly: true,
        highlight:
          "5.3-mile paved path along the West Branch River — walk, run, or bike past covered bridges",
        bestFor: "morning before golf",
      },
      {
        name: "Stowe Zip Line & Canopy Tour",
        type: "zipline",
        duration: "2-3 hours",
        pricePerPerson: [65, 95],
        groupFriendly: true,
        highlight:
          "Zip through the forest canopy with views of Mount Mansfield — 2+ hours of high-wire fun",
        bestFor: "rest day",
        provider: "Stowe Mountain Resort",
      },
      {
        name: "Cold Hollow Cider Mill",
        type: "distillery",
        duration: "1-2 hours",
        pricePerPerson: [0, 20],
        groupFriendly: true,
        highlight:
          "Free cider tastings and fresh cider donuts — essential Vermont stop on the drive in",
        bestFor: "arrival day",
      },
      {
        name: "Fly Fishing the Lamoille River",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [150, 250],
        groupFriendly: false,
        highlight:
          "Guided fly fishing for brown and rainbow trout on Vermont's best river",
        bestFor: "rest day",
        provider: "Green Mountain Fly Fishing",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [10, 14],
        hourlyRate: [150, 225],
        providers: ["Green Mountain Limo", "Stowe Cab & Shuttle"],
        notes:
          "Mountain Road is long and courses are spread out — a shuttle is very helpful. Brewery runs practically require one.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 140],
        providers: ["Stowe Personal Chef", "Vermont Farm Table Catering"],
        mealTypes: ["farm-to-table dinner", "BBQ cookout", "Vermont maple brunch", "steak dinner"],
        notes:
          "Vermont farm-to-table chefs are incredible — local beef, cheese, and maple everything. A cabin dinner with local craft beer pairings is the peak Stowe experience.",
      },
    ],
  },
  {
    id: "portland-me",
    city: "Portland",
    state: "ME",
    region: "Northeast",
    tagline: "Foodie capital of New England with oceanfront golf and craft beer overload",
    description:
      "Portland packs more restaurants, breweries, and bars per capita than almost any US city, with quality coastal golf minutes from the Old Port. Play links-style courses with ocean views, then dive into one of America's best food scenes — lobster rolls, oyster bars, and James Beard-winning restaurants everywhere. The bar crawl potential is elite.",
    population: "medium",
    nearestAirport: {
      code: "PWM",
      name: "Portland International Jetport",
      driveMinutes: 10,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Purpoodock Club",
        tier: "premium",
        greenFeeRange: [85, 140],
        holes: 18,
        par: 71,
        yardage: 6346,
        slope: 130,
        rating: 71.0,
        walkable: true,
        style: "coastal",
        driveMinutes: 15,
        highlight:
          "Cape Elizabeth beauty with ocean glimpses — semi-private with limited public tee times",
      },
      {
        name: "Sable Oaks Golf Club",
        tier: "solid",
        greenFeeRange: [55, 89],
        holes: 18,
        par: 70,
        yardage: 6359,
        slope: 132,
        rating: 71.2,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.sableoaks.com",
        highlight:
          "South Portland's best public course — tight fairways through mature pines, challenging for all levels",
      },
      {
        name: "Nonesuch River Golf Club",
        tier: "solid",
        greenFeeRange: [49, 79],
        holes: 18,
        par: 70,
        yardage: 6208,
        slope: 126,
        rating: 69.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.nonesuchgolf.com",
        highlight:
          "Well-maintained Scarborough course with water features and a fair test of golf at a good price",
      },
      {
        name: "Val Halla Golf Course",
        tier: "solid",
        greenFeeRange: [38, 60],
        holes: 18,
        par: 72,
        yardage: 6574,
        slope: 128,
        rating: 71.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        highlight:
          "Cumberland municipal course ranked among Maine's best public tracks — outstanding value",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [600, 2200],
        amenities: ["ocean views", "deck", "outdoor grill", "parking", "walkable to Old Port"],
        areaDescription: "West End / East End waterfront",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/maine/portland",
        notes:
          "Downtown Portland houses are walkable to everything. East End and West End neighborhoods are best. Prices spike in summer — book 3+ months ahead.",
      },
      {
        type: "house",
        sleeps: [12, 18],
        nightlyRange: [800, 2800],
        amenities: ["waterfront", "private dock", "hot tub", "fire pit", "kayaks"],
        areaDescription: "Cape Elizabeth / Scarborough coast",
        searchUrl: "https://www.airbnb.com/s/Portland--ME",
        notes:
          "Coastal homes south of Portland offer more space and ocean access but require driving to the bar scene.",
      },
    ],
    dining: [
      {
        name: "Eventide Oyster Co.",
        style: "seafood",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "James Beard Award-winning oyster bar — brown butter lobster roll is a bucket-list meal",
        reservationNeeded: true,
      },
      {
        name: "Fore Street",
        style: "farm-to-table",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Sam Hayward's wood-fired kitchen — the restaurant that put Portland on the national food map",
        reservationNeeded: true,
      },
      {
        name: "Scales",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Waterfront seafood on Maine Wharf with raw bar, whole fish, and harbor views",
        reservationNeeded: true,
      },
      {
        name: "Duckfat",
        style: "casual",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Belgian frites, paninis, and duck fat milkshakes — cult lunch spot in the Old Port",
        reservationNeeded: false,
      },
      {
        name: "Holy Donut",
        style: "casual",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Maine potato donuts in wild flavors — essential hangover cure breakfast",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Novare Res Bier Cafe",
        vibe: "brewpub",
        highlight:
          "Hidden courtyard beer bar with 500+ bottles and 33 taps — the beer nerd holy grail",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Portland Hunt + Alpine Club",
        vibe: "cocktail",
        highlight:
          "Scandinavian-inspired cocktail bar with creative drinks and aquavit flights",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Gritty McDuff's",
        vibe: "dive",
        highlight:
          "Maine's original brewpub since 1988 — no-frills pub with house ales and a local crowd",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Liquid Riot Bottling Company",
        vibe: "brewpub",
        highlight:
          "Waterfront brewery + distillery combo — beer, spirits, and food all made in-house",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Portland Brewery Trail",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [20, 50],
        groupFriendly: true,
        highlight:
          "20+ breweries in Greater Portland including Allagash, Bissell Brothers, Foundation, and Austin Street",
        bestFor: "rest day",
      },
      {
        name: "Casco Bay Island Ferry",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [15, 35],
        groupFriendly: true,
        highlight:
          "Ferry to Peaks Island for a bike ride and beers at the Inn — classic Maine day trip",
        bestFor: "rest day",
        provider: "Casco Bay Lines",
      },
      {
        name: "Deep Sea Fishing Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [100, 175],
        groupFriendly: true,
        highlight:
          "Charter out of Portland Harbor for striped bass, bluefish, and mackerel",
        bestFor: "rest day",
      },
      {
        name: "Portland Food Tour",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [50, 85],
        groupFriendly: true,
        highlight:
          "Guided walking tour of Old Port restaurants — lobster, oysters, donuts, and craft beer included",
        bestFor: "arrival day",
        provider: "Maine Food for Thought Tours",
      },
      {
        name: "Sea Kayaking Casco Bay",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [50, 80],
        groupFriendly: true,
        highlight:
          "Paddle around Portland Harbor islands with views of lighthouses and lobster boats",
        bestFor: "morning before golf",
        provider: "Portland Paddle",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [150, 225],
        providers: ["VIP Tour Bus Maine", "Northeast Charter & Tour"],
        notes:
          "Great for brewery trail runs. Old Port is walkable for bar crawls, but courses require transport.",
      },
      {
        type: "trolley",
        capacity: [16, 24],
        hourlyRate: [225, 350],
        providers: ["Portland Discovery Land & Sea Tours"],
        notes:
          "Vintage trolley brewery tour is a fun group option — they know all the best stops.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 150],
        providers: ["Portland Personal Chef", "The Thirsty Pig Catering"],
        mealTypes: ["lobster bake", "seafood boil", "farm-to-table dinner", "brunch"],
        notes:
          "A traditional Maine lobster bake at your rental is the ultimate group meal — lobster, clams, corn, and potatoes cooked in seaweed. Book 2 weeks ahead in summer.",
      },
    ],
  },
  {
    id: "kennebunkport-me",
    city: "Kennebunkport",
    state: "ME",
    region: "Northeast",
    tagline: "Preppy coastal golf with lobster shacks and New England charm",
    description:
      "Kennebunkport is a quintessential Maine coastal town with surprisingly strong golf, amazing seafood, and a laid-back but upscale vibe. Play courses with ocean breezes, eat lobster at waterfront shacks, and stroll Dock Square for cocktails. It is more relaxed than Portland but delivers on every front.",
    population: "tiny",
    nearestAirport: {
      code: "PWM",
      name: "Portland International Jetport",
      driveMinutes: 35,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Webhannet Golf Club",
        tier: "premium",
        greenFeeRange: [95, 155],
        holes: 18,
        par: 71,
        yardage: 6159,
        slope: 127,
        rating: 70.0,
        walkable: true,
        style: "coastal",
        driveMinutes: 10,
        highlight:
          "Walter Travis links design with ocean views — tight, windy, and beautifully maintained since 1902",
      },
      {
        name: "Cape Arundel Golf Club",
        tier: "premium",
        greenFeeRange: [80, 135],
        holes: 18,
        par: 69,
        yardage: 5870,
        slope: 126,
        rating: 68.9,
        walkable: true,
        style: "coastal",
        driveMinutes: 5,
        highlight:
          "The Bush family's home course — charming, walkable layout with Kennebunk River views",
      },
      {
        name: "Dutch Elm Golf Course",
        tier: "solid",
        greenFeeRange: [40, 65],
        holes: 18,
        par: 72,
        yardage: 6239,
        slope: 121,
        rating: 69.9,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.dutchelmgolf.com",
        highlight:
          "Arundel municipal course with wide fairways — good warm-up round at a great price",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [700, 2500],
        amenities: ["ocean views", "deck", "outdoor grill", "beach access", "parking"],
        areaDescription: "Goose Rocks Beach / Cape Porpoise",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/maine/kennebunkport",
        notes:
          "Goose Rocks Beach houses offer the best combo of space and ocean access. Book 4-6 months ahead for summer.",
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [900, 3000],
        amenities: ["waterfront", "hot tub", "kayaks", "chef kitchen", "multiple decks"],
        areaDescription: "Kennebunk River / Dock Square area",
        searchUrl: "https://www.airbnb.com/s/Kennebunkport--ME",
        notes:
          "River and harbor-area homes are pricier but walkable to Dock Square restaurants and bars.",
      },
    ],
    dining: [
      {
        name: "The Clam Shack",
        style: "seafood",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Legendary fried clam and lobster roll stand on the bridge — cash only, worth every penny",
        reservationNeeded: false,
      },
      {
        name: "Bandaloop",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Dock Square fine dining with creative seafood and an excellent wine list",
        reservationNeeded: true,
      },
      {
        name: "Earth at Hidden Pond",
        style: "farm-to-table",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Hidden Pond resort restaurant with a chef's garden and tasting menus — top-tier dining experience",
        reservationNeeded: true,
      },
      {
        name: "Alisson's Restaurant",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Dock Square staple with pub fare, local seafood, and a fun bar scene downstairs",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Alisson's Pub",
        vibe: "dive",
        highlight:
          "Downstairs from the restaurant — the closest thing to a dive bar in Kennebunkport",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Old Vines Wine Bar",
        vibe: "cocktail",
        highlight:
          "Chic wine bar in Dock Square with craft cocktails and a lovely garden patio",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Batson River Brewing",
        vibe: "brewpub",
        highlight:
          "Kennebunk craft brewery and distillery with a hip tasting room and creative cocktails",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Lobster Boat Tour",
        type: "fishing",
        duration: "2-3 hours",
        pricePerPerson: [40, 65],
        groupFriendly: true,
        highlight:
          "Watch lobstermen haul traps and learn the trade — you might pull up your own dinner",
        bestFor: "rest day",
        provider: "First Chance Whale Watch",
      },
      {
        name: "Whale Watching Charter",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [50, 75],
        groupFriendly: true,
        highlight:
          "Spot humpbacks, finbacks, and minke whales in the Gulf of Maine",
        bestFor: "rest day",
        provider: "First Chance Whale Watch",
      },
      {
        name: "Sea Kayaking Cape Porpoise",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [50, 80],
        groupFriendly: true,
        highlight:
          "Paddle past Goat Island Lighthouse and through the Cape Porpoise harbor",
        bestFor: "morning before golf",
        provider: "Coastal Maine Kayak",
      },
      {
        name: "Marginal Way Walk",
        type: "hiking",
        duration: "1-2 hours",
        pricePerPerson: [0, 0],
        groupFriendly: true,
        highlight:
          "Scenic 1.25-mile cliff walk in nearby Ogunquit with stunning ocean views",
        bestFor: "morning before golf",
      },
      {
        name: "Kennebunkport Brewing Company Tour",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [15, 35],
        groupFriendly: true,
        highlight:
          "Federal Jack's brewpub and KBC tasting room — craft beer and waterfront views",
        bestFor: "arrival day",
        provider: "Kennebunkport Brewing Co.",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [10, 14],
        hourlyRate: [150, 225],
        providers: ["Kennebunk Transportation", "Atlantic Limo Maine"],
        notes:
          "Courses and beaches are spread out along Route 9. A shuttle is helpful but Dock Square is walkable for nightlife.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [80, 160],
        providers: ["Maine Private Chef", "Seaside Catering Kennebunk"],
        mealTypes: ["lobster bake", "clambake", "seafood dinner", "brunch"],
        notes:
          "A beachside or backyard lobster bake is the signature Kennebunkport group meal. Chefs bring the seaweed, lobsters, clams, corn, and potatoes.",
      },
    ],
  },
  {
    id: "newport-ri",
    city: "Newport",
    state: "RI",
    region: "Northeast",
    tagline: "Gilded Age mansions, ocean golf, and a legendary sailing-town bar scene",
    description:
      "Newport combines oceanfront golf with a walkable downtown packed with bars, restaurants, and historic mansions. Play courses along the rocky Rhode Island coast, tour Gilded Age estates, and hit Thames Street for one of the best bar crawls in New England. The sailing culture adds a preppy edge that makes the whole trip feel elevated.",
    population: "small",
    nearestAirport: {
      code: "PVD",
      name: "T.F. Green International Airport",
      driveMinutes: 35,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Newport National Golf Club",
        tier: "premium",
        greenFeeRange: [125, 195],
        holes: 18,
        par: 72,
        yardage: 7244,
        slope: 143,
        rating: 75.2,
        walkable: true,
        style: "links",
        driveMinutes: 10,
        url: "https://www.newportnational.com",
        highlight:
          "Arthur Hills links design with Sakonnet River views — wide-open, windswept, and top 100 caliber",
      },
      {
        name: "Green Valley Country Club",
        tier: "solid",
        greenFeeRange: [45, 75],
        holes: 18,
        par: 71,
        yardage: 6262,
        slope: 124,
        rating: 69.8,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "Friendly public course in Portsmouth with solid conditioning and a good pace of play",
      },
      {
        name: "Montaup Country Club",
        tier: "solid",
        greenFeeRange: [50, 85],
        holes: 18,
        par: 71,
        yardage: 6440,
        slope: 129,
        rating: 71.2,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "Semi-private Portsmouth course with challenging layout and Narragansett Bay views on the back nine",
      },
      {
        name: "Wanumetonomy Golf & Country Club",
        tier: "solid",
        greenFeeRange: [40, 65],
        holes: 18,
        par: 69,
        yardage: 5800,
        slope: 118,
        rating: 67.5,
        walkable: true,
        style: "coastal",
        driveMinutes: 5,
        highlight:
          "Short but strategic Middletown course right on the island — ocean breezes make it play longer than the card",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [800, 3000],
        amenities: ["ocean views", "deck", "outdoor grill", "hot tub", "parking"],
        areaDescription: "Middletown / Second Beach area",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/rhode-island/newport",
        notes:
          "Middletown houses near Second Beach offer space and beach access with a 5-min drive to downtown. Summer rates are steep — fall is a much better value.",
      },
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [700, 2500],
        amenities: ["walkable to Thames Street", "historic charm", "parking", "multiple bedrooms"],
        areaDescription: "Downtown Newport / Historic Hill",
        searchUrl: "https://www.airbnb.com/s/Newport--RI",
        notes:
          "Downtown rentals mean walking to every bar and restaurant. Smaller groups fit better here — larger groups need Middletown.",
      },
    ],
    dining: [
      {
        name: "The Mooring Seafood Kitchen & Bar",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Waterfront seafood on Sayer's Wharf with harbor views and a raw bar",
        reservationNeeded: true,
      },
      {
        name: "The Black Pearl",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Newport institution on Bannister's Wharf — clam chowder is legendary, Commodore Room for upscale dining",
        reservationNeeded: true,
      },
      {
        name: "Midtown Oyster Bar",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Thames Street raw bar with oysters, craft cocktails, and a rooftop deck",
        reservationNeeded: false,
      },
      {
        name: "Diego's",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Thames Street Mexican with strong margaritas and a rooftop that packs out on weekends",
        reservationNeeded: false,
      },
      {
        name: "Bouchard Inn & Restaurant",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "French fine dining in a Victorian mansion — the big-night splurge dinner",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "The Fastnet Pub",
        vibe: "dive",
        highlight:
          "Irish pub on Broadway with live music, strong pours, and a rowdy late-night crowd",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "One Pelham East",
        vibe: "sports-bar",
        highlight:
          "Thames Street institution — live music, dancing, and the epicenter of Newport nightlife",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Roof Deck at Hotel Viking",
        vibe: "rooftop",
        highlight:
          "Rooftop cocktail bar with panoramic harbor views — sunset drinks are a must",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Pour Judgement Bar & Grill",
        vibe: "dive",
        highlight:
          "Broadway dive with cheap beers, jukeboxes, and a loyal locals scene",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Mansion Tours (The Breakers, Marble House)",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [25, 50],
        groupFriendly: true,
        highlight:
          "Tour the Vanderbilt mansions — absurdly opulent Gilded Age estates on the cliffs",
        bestFor: "rest day",
        provider: "Preservation Society of Newport County",
      },
      {
        name: "Newport Cliff Walk",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 0],
        groupFriendly: true,
        highlight:
          "3.5-mile coastal trail past mansions and ocean cliffs — the best free activity in Newport",
        bestFor: "morning before golf",
      },
      {
        name: "12 Meter Sailing Charter",
        type: "boat-rental",
        duration: "2-3 hours",
        pricePerPerson: [60, 95],
        groupFriendly: true,
        highlight:
          "Sail a former America's Cup yacht in Narragansett Bay — legitimately cool group experience",
        bestFor: "rest day",
        provider: "12 Meter Charters",
      },
      {
        name: "Newport Distilling Company",
        type: "distillery",
        duration: "1-2 hours",
        pricePerPerson: [15, 30],
        groupFriendly: true,
        highlight:
          "Thomas Tew rum and Sea Fog vodka tastings at the Thames Street distillery",
        bestFor: "arrival day",
        provider: "Newport Craft Brewing & Distilling",
      },
      {
        name: "Newport Polo",
        type: "horseback",
        duration: "2-3 hours",
        pricePerPerson: [15, 25],
        groupFriendly: true,
        highlight:
          "Saturday afternoon polo matches with a tailgate — bring a cooler and enjoy the scene",
        bestFor: "rest day",
        provider: "Newport Polo",
      },
    ],
    partyBuses: [
      {
        type: "trolley",
        capacity: [14, 22],
        hourlyRate: [200, 325],
        providers: ["Newport Trolley Tours", "Viking Tours Newport"],
        notes:
          "Trolley is the classic Newport move — mansion tour by day, bar crawl by night. Thames Street is walkable though.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [80, 160],
        providers: ["Newport Private Chef", "Blackstone Caterers"],
        mealTypes: ["lobster bake", "clambake", "seafood dinner", "brunch"],
        notes:
          "A New England clambake at your rental is quintessential Newport — lobster, clams, and chowder with ocean views.",
      },
    ],
  },
  {
    id: "atlantic-city-nj",
    city: "Atlantic City",
    state: "NJ",
    region: "Northeast",
    tagline: "Casino nightlife meets surprisingly solid South Jersey golf",
    description:
      "Atlantic City is the ultimate degenerate-friendly golf trip — quality courses by day, full-scale casino action and nightlife by night. Play well-conditioned South Jersey courses through pine barrens terrain, then hit the boardwalk casinos for table games, steakhouses, and clubs. It is not fancy, but it is an absolute blast for a guys' weekend.",
    population: "medium",
    nearestAirport: {
      code: "ACY",
      name: "Atlantic City International Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "Shore Gate Golf Club",
        tier: "premium",
        greenFeeRange: [69, 119],
        holes: 18,
        par: 72,
        yardage: 7200,
        slope: 137,
        rating: 74.3,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.shoregategolfclub.com",
        highlight:
          "Ron Forse design through South Jersey pine barrens — links-style bunkering with parkland routing",
      },
      {
        name: "Blue Heron Pines Golf Club",
        tier: "premium",
        greenFeeRange: [65, 109],
        holes: 18,
        par: 72,
        yardage: 6774,
        slope: 133,
        rating: 72.4,
        walkable: false,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.blueheronpines.com",
        highlight:
          "Steve Smyers design consistently ranked among New Jersey's best public courses — immaculate conditioning",
      },
      {
        name: "Twisted Dune Golf Club",
        tier: "premium",
        greenFeeRange: [59, 99],
        holes: 18,
        par: 72,
        yardage: 7248,
        slope: 134,
        rating: 74.6,
        walkable: false,
        style: "links",
        driveMinutes: 15,
        url: "https://www.twisteddune.com",
        highlight:
          "Scottish-style links built on actual sand dunes — feels like you're playing in Ireland, not New Jersey",
      },
      {
        name: "McCullough's Emerald Golf Links",
        tier: "solid",
        greenFeeRange: [35, 59],
        holes: 18,
        par: 71,
        yardage: 6535,
        slope: 124,
        rating: 70.8,
        walkable: true,
        style: "links",
        driveMinutes: 10,
        url: "https://www.mcculloughsgolf.com",
        highlight:
          "Affordable links-style course right in Egg Harbor Township — great value to round out the trip",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [400, 1400],
        amenities: ["ocean views", "deck", "outdoor grill", "beach access", "parking"],
        areaDescription: "Margate / Longport (south of AC)",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/new-jersey/atlantic-city",
        notes:
          "Margate and Longport are nicer beach towns just south of AC — 10-min Uber to the boardwalk casinos. Much better vibe for a group house.",
      },
      {
        type: "resort-house",
        sleeps: [8, 16],
        nightlyRange: [300, 800],
        amenities: ["casino access", "pool", "spa", "restaurants", "nightlife"],
        areaDescription: "Boardwalk / Marina District",
        notes:
          "Casino hotel suites can work for groups — book multiple connecting rooms at Borgata, Hard Rock, or Ocean Casino. Comp rooms are possible for gamblers.",
      },
    ],
    dining: [
      {
        name: "Dock's Oyster House",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "AC institution since 1897 — raw bar, whole lobsters, and classic seafood in a white-tablecloth setting",
        reservationNeeded: true,
      },
      {
        name: "Borgata Steakhouse (Old Homestead)",
        style: "steakhouse",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "High-end casino steakhouse with dry-aged prime cuts and a power-dinner atmosphere",
        reservationNeeded: true,
      },
      {
        name: "Chef Vola's",
        style: "italian",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Secret basement Italian restaurant — BYOB, cash only, no sign. The most legendary meal in AC.",
        reservationNeeded: true,
      },
      {
        name: "Tony's Baltimore Grill",
        style: "italian",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "24-hour Italian joint on Atlantic Ave — pizza, subs, and neon lights since 1927",
        reservationNeeded: false,
      },
      {
        name: "Buddakan",
        style: "sushi",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Stephen Starr's Asian fusion spectacle at the Playground Pier — group-friendly with a scene",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Borgata Beer Garden",
        vibe: "patio",
        highlight:
          "Outdoor beer garden at the Borgata with live DJs, fire pits, and pool parties in summer",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Hard Rock Casino Bars",
        vibe: "casino-bar",
        highlight:
          "Multiple bars inside Hard Rock — Center Bar is the action spot, Lobby Bar for cocktails",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Tennessee Avenue Beer Hall",
        vibe: "brewpub",
        highlight:
          "Craft beer hall off the boardwalk with long tables, German-style brews, and a laid-back vibe",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "The Irish Pub",
        vibe: "dive",
        highlight:
          "Classic AC dive on St. James Place — open since Prohibition ended, cheap drinks, zero frills",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Borgata Casino",
        type: "casino",
        duration: "2-3 hours",
        pricePerPerson: [0, 500],
        groupFriendly: true,
        highlight:
          "The best casino in AC — premium table games, poker room, and sportsbook",
        bestFor: "arrival day",
      },
      {
        name: "Hard Rock Casino",
        type: "casino",
        duration: "2-3 hours",
        pricePerPerson: [0, 500],
        groupFriendly: true,
        highlight:
          "Boardwalk casino with great nightlife, live music, and a massive gaming floor",
        bestFor: "rest day",
      },
      {
        name: "Steel Pier Amusement Park",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [20, 50],
        groupFriendly: true,
        highlight:
          "Classic boardwalk rides, go-karts, and games — goofy fun between casino sessions",
        bestFor: "rest day",
      },
      {
        name: "Deep Sea Fishing Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [80, 150],
        groupFriendly: true,
        highlight:
          "Charter out of AC Marina for flounder, sea bass, and bluefish",
        bestFor: "rest day",
      },
      {
        name: "AC Shooting Range",
        type: "shooting",
        duration: "2-3 hours",
        pricePerPerson: [40, 80],
        groupFriendly: true,
        highlight:
          "Indoor range with pistol and rifle lanes — competitive group shooting is a blast",
        bestFor: "arrival day",
        provider: "Shore Shot Pistol Range",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 24],
        hourlyRate: [175, 300],
        providers: ["AC Party Bus", "J&J Transportation"],
        notes:
          "Party bus from Margate house to boardwalk casinos is the classic move. Some services include VIP casino entry.",
      },
      {
        type: "limo",
        capacity: [8, 14],
        hourlyRate: [150, 250],
        providers: ["Atlantic City Limo", "Prestige Limousine"],
        notes:
          "Stretch limo for the full AC experience — airport pickup to casino to courses.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [55, 110],
        providers: ["AC Personal Chef", "Shore Catering Co"],
        mealTypes: ["steak dinner", "Italian feast", "BBQ cookout", "breakfast"],
        notes:
          "Beach house cookout in Margate before hitting the casinos is a solid play. Most chefs serve the shore house rental crowd all summer.",
      },
    ],
  },
  {
    id: "hershey-pa",
    city: "Hershey",
    state: "PA",
    region: "Northeast",
    tagline: "Chocolate-town resort golf with surprising depth and amusement park thrills",
    description:
      "Hershey is an underrated golf trip with two excellent resort courses, a lively dining scene on Chocolate Avenue, and Hersheypark for adrenaline junkies. Play well-manicured courses on the grounds of the Hotel Hershey, eat at surprisingly good restaurants, and fill rest days with the amusement park, go-karts, and craft beer. It is family-resort infrastructure repurposed perfectly for a guys' trip.",
    population: "small",
    nearestAirport: {
      code: "MDT",
      name: "Harrisburg International Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "Hershey Country Club - East Course",
        tier: "premium",
        greenFeeRange: [89, 149],
        holes: 18,
        par: 71,
        yardage: 7061,
        slope: 137,
        rating: 73.5,
        walkable: false,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.hersheycc.com",
        highlight:
          "Maurice McCarthy design with Hershey resort pedigree — the best course in the area with tournament conditioning",
      },
      {
        name: "Hershey Country Club - West Course",
        tier: "solid",
        greenFeeRange: [59, 99],
        holes: 18,
        par: 73,
        yardage: 6860,
        slope: 131,
        rating: 72.4,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.hersheycc.com",
        highlight:
          "Shorter companion course with more forgiving fairways — great second-day round for the group",
      },
      {
        name: "Hershey Links",
        tier: "solid",
        greenFeeRange: [35, 59],
        holes: 18,
        par: 72,
        yardage: 6600,
        slope: 124,
        rating: 71.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        highlight:
          "Affordable links-inspired public course — good warmup round with open fairways",
      },
      {
        name: "Iron Valley Golf Club",
        tier: "solid",
        greenFeeRange: [39, 69],
        holes: 18,
        par: 70,
        yardage: 6371,
        slope: 126,
        rating: 70.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        highlight:
          "Cornwall course with nice elevation changes and woods — punches above its weight for the price",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [400, 1200],
        amenities: ["pool", "hot tub", "game room", "outdoor grill", "fire pit"],
        areaDescription: "Hershey / Hummelstown area",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/pennsylvania/hershey",
        notes:
          "Vacation rentals in Hershey are very affordable compared to other NE destinations. Close to everything and well-maintained.",
      },
      {
        type: "resort-house",
        sleeps: [8, 12],
        nightlyRange: [350, 800],
        amenities: ["resort pool", "spa", "restaurants", "golf on-site"],
        areaDescription: "Hotel Hershey / Hershey Lodge",
        notes:
          "Hotel Hershey cottages or Hershey Lodge suites work for groups wanting resort amenities and on-site golf access. Book packages for best rates.",
      },
    ],
    dining: [
      {
        name: "The Circular at Hotel Hershey",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Elegant resort dining room with regional cuisine and a renowned Sunday brunch",
        reservationNeeded: true,
      },
      {
        name: "Devon Seafood + Steak",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Hershey outpost of the Philly steakhouse chain — prime cuts, raw bar, and craft cocktails",
        reservationNeeded: true,
      },
      {
        name: "Tröegs Independent Brewing",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "World-class brewery with a full scratch kitchen — Perpetual IPA and Troegenator are legendary",
        reservationNeeded: false,
      },
      {
        name: "Piazza Sorrento",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Hershey Italian with generous portions, garlic knots, and a solid red sauce game",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Tröegs Brewery Taproom",
        vibe: "brewpub",
        highlight:
          "24-tap brewery with tours, tastings, and a beer garden — the main event for beer lovers",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "The Vineyard & Brewery at Hershey",
        vibe: "patio",
        highlight:
          "Wine and craft beer on a scenic patio with vineyard views — relaxed afternoon vibes",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Sly Fox Taphouse",
        vibe: "sports-bar",
        highlight:
          "Craft beer bar with 20+ taps, pub food, and big screens for games",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Hersheypark",
        type: "go-karts",
        duration: "half day",
        pricePerPerson: [55, 80],
        groupFriendly: true,
        highlight:
          "Full amusement park with 15 roller coasters — grown men screaming on the Candymonium is part of the experience",
        bestFor: "rest day",
      },
      {
        name: "Tröegs Brewery Tour",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [10, 25],
        groupFriendly: true,
        highlight:
          "Behind-the-scenes tour of one of America's best craft breweries with generous tastings",
        bestFor: "rest day",
        provider: "Tröegs Independent Brewing",
      },
      {
        name: "Hershey Chocolate World",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [0, 25],
        groupFriendly: true,
        highlight:
          "Free chocolate tour ride plus make-your-own-bar experience — surprisingly fun even for adults",
        bestFor: "arrival day",
      },
      {
        name: "Hollywood Casino at Penn National",
        type: "casino",
        duration: "2-3 hours",
        pricePerPerson: [0, 200],
        groupFriendly: true,
        highlight:
          "Table games, slots, and sportsbook 20 minutes from Hershey — solid evening activity",
        bestFor: "arrival day",
      },
      {
        name: "Hershey Axe Throwing",
        type: "axe-throwing",
        duration: "2-3 hours",
        pricePerPerson: [25, 45],
        groupFriendly: true,
        highlight:
          "Competitive axe throwing with BYOB — tournament format is perfect for groups",
        bestFor: "arrival day",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [150, 225],
        providers: ["Premiere Transportation", "Hershey Limo"],
        notes:
          "Helpful for getting between courses, Tröegs, and the casino. Hershey itself is relatively compact.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [55, 110],
        providers: ["Hershey Personal Chef", "Central PA Catering"],
        mealTypes: ["steak dinner", "BBQ cookout", "breakfast", "pasta night"],
        notes:
          "Backyard BBQ at the rental is a great way to kick off the trip. Most chefs serve the Hershey vacation rental crowd regularly.",
      },
    ],
  },
  {
    id: "ocean-city-md",
    city: "Ocean City",
    state: "MD",
    region: "Northeast",
    tagline: "Boardwalk beach town with quality golf and non-stop group energy",
    description:
      "Ocean City Maryland delivers a classic East Coast beach golf trip with well-maintained courses, a 3-mile boardwalk, and a deep bar scene. Play resort courses through coastal marshland, spend afternoons on the beach or at the fishing pier, and hit the strip for bar-hopping at night. It is affordable, accessible, and built for groups who want golf plus a party.",
    population: "medium",
    nearestAirport: {
      code: "SBY",
      name: "Salisbury-Ocean City Wicomico Regional Airport",
      driveMinutes: 30,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "Rum Pointe Seaside Golf Links",
        tier: "premium",
        greenFeeRange: [69, 119],
        holes: 18,
        par: 72,
        yardage: 7001,
        slope: 134,
        rating: 73.2,
        walkable: false,
        style: "links",
        driveMinutes: 15,
        url: "https://www.rumpointe.com",
        highlight:
          "Pete Dye/P.B. Dye design with Sinepuxent Bay views — the best public course near OC with true links character",
      },
      {
        name: "Lighthouse Sound Golf Course",
        tier: "premium",
        greenFeeRange: [65, 109],
        holes: 18,
        par: 72,
        yardage: 7017,
        slope: 133,
        rating: 73.0,
        walkable: false,
        style: "links",
        driveMinutes: 10,
        url: "https://www.lighthousesound.com",
        highlight:
          "Arthur Hills design through coastal marshland with Assawoman Bay views on nearly every hole",
      },
      {
        name: "Eagle's Landing Golf Course",
        tier: "solid",
        greenFeeRange: [49, 89],
        holes: 18,
        par: 72,
        yardage: 7003,
        slope: 131,
        rating: 73.0,
        walkable: false,
        style: "links",
        driveMinutes: 10,
        url: "https://www.eagleslandinggolf.com",
        highlight:
          "Clive Clark design with dramatic water carries and coastal wind — excellent value for the quality",
      },
      {
        name: "Glen Riddle Golf Club - War Admiral",
        tier: "premium",
        greenFeeRange: [59, 105],
        holes: 18,
        par: 72,
        yardage: 7068,
        slope: 136,
        rating: 73.6,
        walkable: false,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.glenriddlegolf.com",
        highlight:
          "Rick Jacobson design through mature pines and wetlands — tournament conditioning at a public price",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [12, 20],
        nightlyRange: [400, 1800],
        amenities: ["ocean views", "pool", "hot tub", "multiple decks", "outdoor grill"],
        areaDescription: "North OC / Fenwick Island area",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/maryland/ocean-city",
        notes:
          "North OC beach houses are more residential and quieter. Great for larger groups wanting space. 5-10 min drive to the boardwalk.",
      },
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [500, 1500],
        amenities: ["beach access", "parking", "deck", "close to boardwalk"],
        areaDescription: "Midtown OC / Boardwalk area",
        searchUrl: "https://www.airbnb.com/s/Ocean-City--MD",
        notes:
          "Midtown condos and houses are walkable to the boardwalk and bar scene. More action but noisier.",
      },
    ],
    dining: [
      {
        name: "Hooked",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Upscale seafood on 81st Street with creative coastal dishes and a strong cocktail program",
        reservationNeeded: true,
      },
      {
        name: "Fager's Island",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Bayside fine dining with sunset views, live music, and a famous Sunday brunch — the see-and-be-seen spot",
        reservationNeeded: true,
      },
      {
        name: "Crabcake Factory",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "OC's best crabcakes — jumbo lump, all crab, no filler. Multiple locations.",
        reservationNeeded: false,
      },
      {
        name: "Fractured Prune Donuts",
        style: "casual",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Build-your-own hot donuts — essential morning-after fuel for the group",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Seacrets",
        vibe: "tiki",
        highlight:
          "Jamaica-themed mega-bar complex on the bay — multiple bars, live music, DJs, and a sand beach. THE OC nightlife destination.",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Fish Tales Bar & Grill",
        vibe: "patio",
        highlight:
          "Boardwalk bar with live music, bay views, and a party atmosphere — great for groups",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Macky's Bayside Bar & Grill",
        vibe: "sports-bar",
        highlight:
          "54th Street bar with craft beers, tiki drinks, and a chill bayside vibe",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Pickles Pub",
        vibe: "sports-bar",
        highlight:
          "706 Philadelphia Ave sports bar — big screens, buckets of beer, and a rowdy crowd",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Deep Sea Fishing Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [80, 150],
        groupFriendly: true,
        highlight:
          "OC is the White Marlin Capital of the World — charter out of the inlet for marlin, tuna, and mahi",
        bestFor: "rest day",
      },
      {
        name: "OC Boardwalk & Amusements",
        type: "go-karts",
        duration: "2-3 hours",
        pricePerPerson: [15, 40],
        groupFriendly: true,
        highlight:
          "Classic boardwalk with go-karts, rides, mini golf, and funnel cakes — cheesy fun",
        bestFor: "arrival day",
      },
      {
        name: "OC Brewing Company",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [15, 35],
        groupFriendly: true,
        highlight:
          "Local craft brewery with tours, tastings, and a solid taproom scene",
        bestFor: "rest day",
        provider: "OC Brewing Company",
      },
      {
        name: "Kayaking the Back Bays",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [40, 70],
        groupFriendly: true,
        highlight:
          "Paddle through the Assawoman Bay — spot dolphins, herons, and osprey in the marshes",
        bestFor: "morning before golf",
      },
      {
        name: "Axe Throwing OC",
        type: "axe-throwing",
        duration: "2-3 hours",
        pricePerPerson: [25, 45],
        groupFriendly: true,
        highlight:
          "Competitive axe throwing with group tournaments — BYOB at some locations",
        bestFor: "arrival day",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 22],
        hourlyRate: [175, 300],
        providers: ["OC Party Bus", "Shore Transit Limo"],
        notes:
          "Party bus from the beach house to courses and Seacrets is the classic OC move. Essential for larger groups staying in North OC.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [55, 110],
        providers: ["OC Chef Service", "Shore Catering MD"],
        mealTypes: ["crab feast", "seafood boil", "BBQ cookout", "breakfast"],
        notes:
          "A Maryland crab feast at the beach house is mandatory — steamed blue crabs, Old Bay, corn, and cold beer on newspaper-covered tables.",
      },
    ],
  },
  {
    id: "catskills-ny",
    city: "Catskills",
    state: "NY",
    region: "Northeast",
    tagline: "Mountain resort revival golf just 2 hours from NYC",
    description:
      "The Catskills are experiencing a massive revival with new restaurants, breweries, and lodges reinvigorating the classic mountain resort region. Play quality courses through rolling mountain terrain, hit revitalized Main Streets in towns like Windham and Hunter, and enjoy a landscape that screams weekend getaway. Just 2 hours from NYC makes it perfect for metro-area groups.",
    population: "tiny",
    nearestAirport: {
      code: "ALB",
      name: "Albany International Airport",
      driveMinutes: 60,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Windham Mountain Golf Club",
        tier: "premium",
        greenFeeRange: [69, 109],
        holes: 18,
        par: 71,
        yardage: 6035,
        slope: 129,
        rating: 69.8,
        walkable: false,
        style: "mountain",
        driveMinutes: 5,
        highlight:
          "Ski-resort mountain course with dramatic elevation changes and Catskill views on every hole",
      },
      {
        name: "Rip Van Winkle Country Club",
        tier: "solid",
        greenFeeRange: [35, 59],
        holes: 9,
        par: 35,
        yardage: 3100,
        slope: 120,
        rating: 68.5,
        walkable: true,
        style: "mountain",
        driveMinutes: 15,
        highlight:
          "Charming 9-hole course in Palenville with mountain views — short but sweet with tight fairways",
      },
      {
        name: "Thunderhart Golf Course",
        tier: "solid",
        greenFeeRange: [35, 55],
        holes: 18,
        par: 72,
        yardage: 6500,
        slope: 124,
        rating: 70.3,
        walkable: true,
        style: "mountain",
        driveMinutes: 25,
        highlight:
          "Freehold public course with rolling terrain and a great layout for the price",
      },
      {
        name: "Christman's Windham House Golf Course",
        tier: "budget",
        greenFeeRange: [25, 45],
        holes: 18,
        par: 71,
        yardage: 6100,
        slope: 119,
        rating: 68.5,
        walkable: true,
        style: "mountain",
        driveMinutes: 10,
        highlight:
          "Classic mountain resort course — old-school Catskills golf at a budget-friendly price",
      },
    ],
    lodging: [
      {
        type: "cabin",
        sleeps: [10, 18],
        nightlyRange: [500, 1800],
        amenities: ["hot tub", "fire pit", "mountain views", "game room", "creek access"],
        areaDescription: "Windham / Hunter Mountain area",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/new-york/catskills",
        notes:
          "Mountain cabins near Windham or Hunter are the play — tons of options with hot tubs, game rooms, and great views. Very affordable off-season.",
      },
      {
        type: "lodge",
        sleeps: [8, 14],
        nightlyRange: [400, 1200],
        amenities: ["pool", "restaurant", "bar", "fire pit"],
        areaDescription: "Tannersville / Phoenicia area",
        searchUrl: "https://www.airbnb.com/s/Catskills--NY",
        notes:
          "Boutique lodges have been popping up everywhere. The Roxbury, Scribner's Lodge, and Eastwind are excellent group options.",
      },
    ],
    dining: [
      {
        name: "Jessie's Harvest House",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Tannersville farm-to-table restaurant with excellent cocktails and a warm mountain lodge vibe",
        reservationNeeded: true,
      },
      {
        name: "Peekamoose Restaurant",
        style: "farm-to-table",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Big Indian Creek-side fine dining — seasonal tasting menus in a stunning woodland setting",
        reservationNeeded: true,
      },
      {
        name: "Mama's Boy Burgers",
        style: "casual",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Tannersville burger joint with creative smash burgers and loaded fries — post-golf perfection",
        reservationNeeded: false,
      },
      {
        name: "Prospect",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Catskill village restaurant with a daily-changing menu focused on local farms and foraging",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Hunter Mountain Brewery",
        vibe: "brewpub",
        highlight:
          "Craft brewery at the base of Hunter Mountain with house ales and a festive vibe",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "The Deer Mountain Inn Bar",
        vibe: "cocktail",
        highlight:
          "Upscale cocktail lounge in a renovated mountain inn — craft drinks with Catskill views",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Pancho Villa's",
        vibe: "dive",
        highlight:
          "Tannersville Mexican restaurant with a surprisingly rowdy bar scene on weekends",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Kaaterskill Falls Hike",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 0],
        groupFriendly: true,
        highlight:
          "Two-tiered 260-foot waterfall — one of the most photographed spots in the Catskills",
        bestFor: "morning before golf",
      },
      {
        name: "Catskill Mountain Tubing",
        type: "water-sports",
        duration: "2-3 hours",
        pricePerPerson: [25, 45],
        groupFriendly: true,
        highlight:
          "Lazy river tubing down Esopus Creek with beers in hand — peak summer day",
        bestFor: "rest day",
        provider: "Town Tinker Tube Rental",
      },
      {
        name: "Catskill Distilling Company",
        type: "distillery",
        duration: "2-3 hours",
        pricePerPerson: [15, 35],
        groupFriendly: true,
        highlight:
          "Bethel distillery making whiskey, gin, and vodka — tours and tastings at the old dance hall",
        bestFor: "rest day",
        provider: "Catskill Distilling Company",
      },
      {
        name: "Hunter Mountain Zipline",
        type: "zipline",
        duration: "2-3 hours",
        pricePerPerson: [45, 75],
        groupFriendly: true,
        highlight:
          "Longest zipline canopy tour in North America — 3+ hours soaring through the forest",
        bestFor: "rest day",
        provider: "Hunter Mountain",
      },
      {
        name: "Emerson Resort Spa",
        type: "spa",
        duration: "2-3 hours",
        pricePerPerson: [40, 100],
        groupFriendly: false,
        highlight:
          "Full spa with mineral pools and mountain views — surprisingly good recovery day option",
        bestFor: "rest day",
        provider: "Emerson Resort & Spa",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [10, 14],
        hourlyRate: [150, 250],
        providers: ["Catskill Car Service", "Kingston Limo"],
        notes:
          "Mountain roads and brewery hopping make a shuttle very helpful. Distances between towns add up fast.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 130],
        providers: ["Catskill Mountain Chef", "Mountain House Catering"],
        mealTypes: ["farm-to-table dinner", "BBQ cookout", "brunch", "steak dinner"],
        notes:
          "Cabin BBQ with local beef and craft beer is the quintessential Catskills group meal. Many chefs source from nearby farms.",
      },
    ],
  },
  {
    id: "bretton-woods-nh",
    city: "Bretton Woods",
    state: "NH",
    region: "Northeast",
    tagline: "Grand hotel mountain golf in the White Mountains with old-money elegance",
    description:
      "Bretton Woods revolves around the historic Omni Mount Washington Resort, offering championship mountain golf with Presidential Range views. Play courses with Mount Washington looming overhead, dine at the grand hotel, and explore White Mountain activities on rest days. It is a resort-centric trip with a sense of grandeur you cannot get anywhere else in New England.",
    population: "tiny",
    nearestAirport: {
      code: "MHT",
      name: "Manchester-Boston Regional Airport",
      driveMinutes: 140,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Mount Washington Golf Course",
        tier: "premium",
        greenFeeRange: [99, 165],
        holes: 18,
        par: 71,
        yardage: 6638,
        slope: 133,
        rating: 71.8,
        walkable: true,
        style: "resort",
        driveMinutes: 0,
        url: "https://www.omnihotels.com/hotels/bretton-woods-mount-washington/golf",
        highlight:
          "Donald Ross design on the grounds of the grand hotel — Mount Washington as your backdrop on every hole",
      },
      {
        name: "Mount Pleasant Golf Course",
        tier: "solid",
        greenFeeRange: [49, 79],
        holes: 9,
        par: 35,
        yardage: 3025,
        slope: 119,
        rating: 68.0,
        walkable: true,
        style: "resort",
        driveMinutes: 0,
        highlight:
          "Companion 9-hole course at the resort — shorter but scenic and a great warm-up",
      },
      {
        name: "Bethlehem Country Club",
        tier: "solid",
        greenFeeRange: [35, 55],
        holes: 18,
        par: 70,
        yardage: 5800,
        slope: 118,
        rating: 67.5,
        walkable: true,
        style: "mountain",
        driveMinutes: 20,
        highlight:
          "Donald Ross design from 1898 — one of the oldest courses in NH with classic mountain golf charm",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [8, 16],
        nightlyRange: [600, 1800],
        amenities: ["resort pool", "spa", "restaurants", "golf on-site", "mountain views"],
        areaDescription: "Omni Mount Washington Resort",
        notes:
          "The resort itself is the lodging play — book a block of rooms or suites. The grand hotel experience is half the trip. Ask about golf packages.",
      },
      {
        type: "cabin",
        sleeps: [10, 16],
        nightlyRange: [400, 1400],
        amenities: ["hot tub", "fire pit", "mountain views", "game room", "ski-in access"],
        areaDescription: "Twin Mountain / Crawford Notch area",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/new-hampshire/white-mountains",
        notes:
          "Mountain cabins near the resort offer more space and privacy. 5-15 min drive to the courses.",
      },
    ],
    dining: [
      {
        name: "The Main Dining Room at Mount Washington",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Grand hotel dining room with jacket-required dress code — classic New England fine dining with Presidential Range views",
        reservationNeeded: true,
      },
      {
        name: "Stickney's Restaurant",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Casual resort restaurant with pub fare, craft beer, and a relaxed vibe after golf",
        reservationNeeded: false,
      },
      {
        name: "Fabyans Station",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Historic train depot turned restaurant — burgers, beers, and mountain views on the patio",
        reservationNeeded: false,
      },
      {
        name: "Cold Mountain Cafe",
        style: "farm-to-table",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Bethlehem farm-to-table spot with creative breakfast and lunch — perfect post-round fuel",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "The Cave at the Omni",
        vibe: "whiskey-bar",
        highlight:
          "Speakeasy-style bar in the basement of the grand hotel — cocktails, live music, and old-world ambiance",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Stickney's Bar",
        vibe: "sports-bar",
        highlight:
          "Casual resort bar with craft beer, pub games, and a friendly crowd",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Rek-Lis Brewing Company",
        vibe: "brewpub",
        highlight:
          "Bethlehem craft brewery with rotating IPAs and a mountain lodge taproom",
        lateNight: false,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Mount Washington Cog Railway",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [60, 85],
        groupFriendly: true,
        highlight:
          "World's first mountain-climbing cog railway — ride a steam train to the summit of the Northeast's highest peak",
        bestFor: "rest day",
        provider: "Mount Washington Cog Railway",
      },
      {
        name: "Bretton Woods Canopy Tour",
        type: "zipline",
        duration: "2-3 hours",
        pricePerPerson: [65, 95],
        groupFriendly: true,
        highlight:
          "Zip lines through the White Mountain canopy with views of Mount Washington",
        bestFor: "rest day",
        provider: "Bretton Woods",
      },
      {
        name: "Ammonoosuc River Fly Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [150, 250],
        groupFriendly: false,
        highlight:
          "Guided fly fishing for brook trout in pristine White Mountain streams",
        bestFor: "rest day",
        provider: "Tall Timber Lodge Guides",
      },
      {
        name: "Presidential Range Hiking",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [0, 0],
        groupFriendly: true,
        highlight:
          "Hike the Appalachian Trail through Crawford Notch — stunning views of the Presidentials",
        bestFor: "morning before golf",
      },
      {
        name: "Omni Mount Washington Spa",
        type: "spa",
        duration: "2-3 hours",
        pricePerPerson: [50, 120],
        groupFriendly: true,
        highlight:
          "Full spa with mineral pools and mountain views — surprisingly great recovery day for the group",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [10, 14],
        hourlyRate: [175, 275],
        providers: ["White Mountain Limo", "North Country Transit"],
        notes:
          "If staying at the resort, transport is less critical as golf is on-site. Helpful for off-site brewery runs and hiking trailheads.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 140],
        providers: ["White Mountain Chef", "North Country Catering"],
        mealTypes: ["steak dinner", "New England lobster bake", "breakfast", "BBQ cookout"],
        notes:
          "Cabin dinners with local sourcing are excellent here. The resort dining is so good though that many groups skip the private chef.",
      },
    ],
  },
  {
    id: "bar-harbor-me",
    city: "Bar Harbor",
    state: "ME",
    region: "Northeast",
    tagline: "Acadia National Park gateway with coastal golf and lobster everything",
    description:
      "Bar Harbor is the gateway to Acadia National Park with surprising golf options, incredible seafood, and a compact walkable downtown. Play courses with ocean views, spend a day hiking Cadillac Mountain or biking the carriage roads, and eat your weight in lobster. It is more outdoorsy than a typical golf trip but the scenery is unmatched on the East Coast.",
    population: "tiny",
    nearestAirport: {
      code: "BHB",
      name: "Hancock County-Bar Harbor Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Kebo Valley Golf Club",
        tier: "premium",
        greenFeeRange: [79, 135],
        holes: 18,
        par: 70,
        yardage: 6131,
        slope: 130,
        rating: 70.0,
        walkable: true,
        style: "coastal",
        driveMinutes: 5,
        url: "https://www.kebovalleyclub.com",
        highlight:
          "8th oldest golf club in America — stunning mountain and ocean views from a Herbert Leeds design inside Acadia",
      },
      {
        name: "Bar Harbor Golf Course",
        tier: "solid",
        greenFeeRange: [35, 60],
        holes: 18,
        par: 70,
        yardage: 6100,
        slope: 121,
        rating: 68.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        highlight:
          "Trenton course with great views of Cadillac Mountain — solid value round right outside town",
      },
      {
        name: "Northeast Harbor Golf Club",
        tier: "solid",
        greenFeeRange: [45, 75],
        holes: 18,
        par: 69,
        yardage: 5500,
        slope: 118,
        rating: 66.5,
        walkable: true,
        style: "coastal",
        driveMinutes: 20,
        highlight:
          "Charming Seal Harbor course with ocean views — short but strategic, open to the public on select days",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [500, 2000],
        amenities: ["ocean views", "deck", "fire pit", "parking", "kayaks"],
        areaDescription: "Bar Harbor / Hulls Cove area",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/maine/bar-harbor",
        notes:
          "Waterfront homes near Bar Harbor are limited and book fast — reserve 4-6 months ahead for summer. Hulls Cove is close to Acadia's entrance.",
      },
      {
        type: "cabin",
        sleeps: [10, 16],
        nightlyRange: [400, 1500],
        amenities: ["hot tub", "fire pit", "mountain views", "hiking access", "game room"],
        areaDescription: "Mount Desert Island / Southwest Harbor",
        searchUrl: "https://www.airbnb.com/s/Bar-Harbor--ME",
        notes:
          "Southwest Harbor side is quieter and more affordable with great hiking access. 20-min drive to Bar Harbor downtown.",
      },
    ],
    dining: [
      {
        name: "Burning Tree Restaurant",
        style: "seafood",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Otter Creek seafood institution with locally caught fish, garden vegetables, and BYOB — a local favorite",
        reservationNeeded: true,
      },
      {
        name: "Havana",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Latin-inspired fine dining on Main Street with creative cocktails and a great patio",
        reservationNeeded: true,
      },
      {
        name: "Side Street Cafe",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Bar Harbor pub with seafood, burgers, and big portions — group-friendly and reliably good",
        reservationNeeded: false,
      },
      {
        name: "Thurston's Lobster Pound",
        style: "seafood",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Waterfront lobster shack in Bernard — pick your lobster from the trap, eat on the dock",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Thirsty Whale Tavern",
        vibe: "dive",
        highlight:
          "Bar Harbor's best late-night spot — live music, cheap drinks, and a packed summer crowd",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Atlantic Brewing Company",
        vibe: "brewpub",
        highlight:
          "Town Hill brewery with house ales, BBQ, and a family-friendly beer garden",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Geddy's Pub",
        vibe: "sports-bar",
        highlight:
          "Main Street pub with craft beers, live music, and a rooftop deck overlooking the harbor",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Acadia National Park - Cadillac Mountain",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [0, 35],
        groupFriendly: true,
        highlight:
          "Drive or hike to the first place in the US to see sunrise — 360-degree views of the Atlantic and MDI",
        bestFor: "morning before golf",
      },
      {
        name: "Acadia Carriage Road Biking",
        type: "mountain-biking",
        duration: "half day",
        pricePerPerson: [30, 60],
        groupFriendly: true,
        highlight:
          "45 miles of crushed-stone carriage roads through forests and around lakes — rent bikes in town",
        bestFor: "rest day",
        provider: "Acadia Bike Rentals",
      },
      {
        name: "Sea Kayaking Frenchman Bay",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [55, 85],
        groupFriendly: true,
        highlight:
          "Paddle past Porcupine Islands with views of Cadillac Mountain — seals, eagles, and pristine water",
        bestFor: "rest day",
        provider: "National Park Sea Kayak Tours",
      },
      {
        name: "Whale Watching Tour",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [55, 80],
        groupFriendly: true,
        highlight:
          "Spot humpbacks, finbacks, and minke whales in the Gulf of Maine",
        bestFor: "rest day",
        provider: "Bar Harbor Whale Watch Co.",
      },
      {
        name: "Lobster Boat Tour",
        type: "fishing",
        duration: "2-3 hours",
        pricePerPerson: [40, 60],
        groupFriendly: true,
        highlight:
          "Haul lobster traps with a real lobsterman — learn the trade and maybe pull up dinner",
        bestFor: "rest day",
        provider: "Lulu Lobster Boat Ride",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [10, 14],
        hourlyRate: [150, 250],
        providers: ["Acadia Transport", "Bar Harbor Shuttle"],
        notes:
          "Helpful for getting to Southwest Harbor courses and activities. Downtown Bar Harbor is walkable for nightlife.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [80, 160],
        providers: ["Acadia Private Chef", "MDI Catering"],
        mealTypes: ["lobster bake", "clambake", "seafood dinner", "breakfast"],
        notes:
          "A traditional Maine lobster bake on the shore or at your rental is the ultimate Bar Harbor group meal. Book 2+ weeks ahead in summer.",
      },
    ],
  },
  {
    id: "burlington-vt",
    city: "Burlington",
    state: "VT",
    region: "Northeast",
    tagline: "Lake Champlain waterfront vibes with craft beer capital golf",
    description:
      "Burlington is the craft beer capital of the East Coast with a walkable waterfront downtown, quality golf, and Lake Champlain water sports. Play courses with Adirondack and Green Mountain views, then hit the Church Street pedestrian mall for one of the best bar crawls in New England. The brewery scene alone is worth the trip.",
    population: "medium",
    nearestAirport: {
      code: "BTV",
      name: "Burlington International Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Vermont National Country Club",
        tier: "premium",
        greenFeeRange: [89, 149],
        holes: 18,
        par: 72,
        yardage: 6812,
        slope: 137,
        rating: 73.0,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.vtnational.com",
        highlight:
          "Jack Nicklaus design with Lake Champlain and Adirondack views — the best public course in Vermont",
      },
      {
        name: "Links at Lang Farm",
        tier: "solid",
        greenFeeRange: [39, 65],
        holes: 18,
        par: 72,
        yardage: 6300,
        slope: 124,
        rating: 70.0,
        walkable: true,
        style: "links",
        driveMinutes: 10,
        url: "https://www.langfarmgolf.com",
        highlight:
          "Links-style course on former farmland in Essex — open layout with solid conditioning and great value",
      },
      {
        name: "Rocky Ridge Golf Club",
        tier: "solid",
        greenFeeRange: [35, 55],
        holes: 18,
        par: 72,
        yardage: 6289,
        slope: 122,
        rating: 69.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "St. George course with rolling terrain and Green Mountain views — reliable and affordable",
      },
      {
        name: "Kwiniaska Golf Club",
        tier: "solid",
        greenFeeRange: [45, 75],
        holes: 18,
        par: 72,
        yardage: 6556,
        slope: 127,
        rating: 71.3,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        highlight:
          "Shelburne course with Lake Champlain views — well-maintained semi-private club with public tee times",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [500, 1800],
        amenities: ["lake views", "deck", "outdoor grill", "hot tub", "parking"],
        areaDescription: "South Burlington / Shelburne waterfront",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/vermont/burlington",
        notes:
          "Shelburne and South Burlington houses offer lake views and are 10 min from Church Street. Summer is peak season — book 2-3 months ahead.",
      },
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [400, 1200],
        amenities: ["walkable to Church Street", "parking", "multiple bedrooms", "patio"],
        areaDescription: "Downtown Burlington / Hill Section",
        searchUrl: "https://www.airbnb.com/s/Burlington--VT",
        notes:
          "Downtown Burlington rentals mean walking to every bar and restaurant. Smaller groups fit better in the Hill Section neighborhood.",
      },
    ],
    dining: [
      {
        name: "Hen of the Wood Burlington",
        style: "farm-to-table",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Burlington outpost of the legendary Stowe restaurant — mushroom dishes, local sourcing, and a stunning cocktail program",
        reservationNeeded: true,
      },
      {
        name: "Farmhouse Tap & Grill",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Church Street burger spot with local beef, craft beers, and a big patio — perfect post-golf meal",
        reservationNeeded: false,
      },
      {
        name: "Leunig's Bistro",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "French bistro on Church Street with outdoor seating — mussels, steak frites, and people watching",
        reservationNeeded: true,
      },
      {
        name: "American Flatbread",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Wood-fired flatbreads with local ingredients and Zero Gravity craft beer brewed on-site",
        reservationNeeded: false,
      },
      {
        name: "Misery Loves Co.",
        style: "casual",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Winooski creative diner with a cult following — small but mighty with inventive dishes",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Foam Brewers",
        vibe: "brewpub",
        highlight:
          "Waterfront brewery with some of the best hazy IPAs in the country and Lake Champlain views",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Zero Gravity Craft Brewery",
        vibe: "brewpub",
        highlight:
          "Pine Street brewery with a huge tap list and an industrial-chic taproom",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Nectar's",
        vibe: "dive",
        highlight:
          "Where Phish got their start — legendary Burlington music venue and bar with gravy fries",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Radio Bean",
        vibe: "cocktail",
        highlight:
          "Bohemian coffeehouse-bar hybrid with live music every night and a loyal locals scene",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Burlington Brewery Trail",
        type: "brewery",
        duration: "half day",
        pricePerPerson: [20, 50],
        groupFriendly: true,
        highlight:
          "Foam, Zero Gravity, Burlington Beer Co., Switchback, and more — one of the best brewery walks in America",
        bestFor: "rest day",
      },
      {
        name: "Lake Champlain Boat Cruise",
        type: "boat-rental",
        duration: "2-3 hours",
        pricePerPerson: [25, 50],
        groupFriendly: true,
        highlight:
          "Sunset cruise on Lake Champlain with views of the Adirondacks and Green Mountains",
        bestFor: "rest day",
        provider: "Lake Champlain Cruises",
      },
      {
        name: "Shelburne Farms Tour",
        type: "winery",
        duration: "2-3 hours",
        pricePerPerson: [15, 30],
        groupFriendly: true,
        highlight:
          "Historic 1,400-acre working farm with cheese tastings, walking trails, and lake views",
        bestFor: "rest day",
        provider: "Shelburne Farms",
      },
      {
        name: "Church Street Pedestrian Mall",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [0, 50],
        groupFriendly: true,
        highlight:
          "4-block pedestrian mall with shops, restaurants, street performers, and bar-hopping — the heart of Burlington",
        bestFor: "arrival day",
      },
      {
        name: "Lake Champlain Kayaking",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [40, 70],
        groupFriendly: true,
        highlight:
          "Paddle the Burlington waterfront with mountain views in every direction",
        bestFor: "morning before golf",
        provider: "True North Kayak Tours",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [150, 225],
        providers: ["Green Mountain Limo", "VT Brewery Bus"],
        notes:
          "Church Street is walkable for bar crawls, but the brewery trail and courses require transport. Brewery shuttle services are available.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 130],
        providers: ["Vermont Farm Table Chef", "Burlington Chef Services"],
        mealTypes: ["farm-to-table dinner", "BBQ cookout", "Vermont maple brunch", "steak dinner"],
        notes:
          "Burlington's farm-to-table scene is legit — local beef, cheese, and produce with Vermont craft beer pairings. A lake-view dinner is the move.",
      },
    ],
  },
  {
    id: "cooperstown-ny",
    city: "Cooperstown",
    state: "NY",
    region: "Northeast",
    tagline: "Baseball Hall of Fame village with classic upstate golf and lakefront charm",
    description:
      "Cooperstown is a dream trip for groups who love golf and sports history. Play well-maintained courses through central New York farmland and forests, spend a day at the Baseball Hall of Fame, and enjoy Otsego Lake for water sports. The town is small but charming, with a surprising brewery scene and lakefront dining. Not a rager, but a deeply satisfying guys' trip.",
    population: "tiny",
    nearestAirport: {
      code: "ALB",
      name: "Albany International Airport",
      driveMinutes: 90,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Leatherstocking Golf Course",
        tier: "premium",
        greenFeeRange: [89, 145],
        holes: 18,
        par: 72,
        yardage: 6482,
        slope: 131,
        rating: 71.5,
        walkable: true,
        style: "resort",
        driveMinutes: 0,
        url: "https://www.otesaga.com/golf",
        highlight:
          "Devereux Emmet design on the shores of Otsego Lake — resort golf at The Otesaga with lake views on nearly every hole",
      },
      {
        name: "Cooperstown Country Club",
        tier: "solid",
        greenFeeRange: [35, 55],
        holes: 18,
        par: 72,
        yardage: 6300,
        slope: 124,
        rating: 70.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        highlight:
          "Affordable local course with well-maintained greens and classic upstate New York golf charm",
      },
      {
        name: "Christman's Golf Course",
        tier: "budget",
        greenFeeRange: [20, 35],
        holes: 18,
        par: 72,
        yardage: 6100,
        slope: 118,
        rating: 68.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "Family-run course near Schuyler Lake — honest golf at rock-bottom prices",
      },
    ],
    lodging: [
      {
        type: "lakehouse",
        sleeps: [10, 16],
        nightlyRange: [500, 1800],
        amenities: ["lake access", "dock", "kayaks", "fire pit", "outdoor grill"],
        areaDescription: "Otsego Lake / Springfield Center",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/new-york/cooperstown",
        notes:
          "Otsego Lake houses are the play — dock access, kayaks, and a lakefront fire pit for evening beers. Book 2-3 months ahead for Hall of Fame induction weekend.",
      },
      {
        type: "lodge",
        sleeps: [8, 14],
        nightlyRange: [400, 1200],
        amenities: ["restaurant", "golf on-site", "spa", "lake views"],
        areaDescription: "Cooperstown Village / The Otesaga",
        notes:
          "The Otesaga resort is the premier option — on-site golf, lake views, and walkable to the Hall of Fame. Book suites for group rates.",
      },
    ],
    dining: [
      {
        name: "The Hawkeye Bar & Grill",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Otesaga resort's casual dining — pub fare with lake views on the terrace",
        reservationNeeded: false,
      },
      {
        name: "Sal's Pizzeria",
        style: "italian",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Main Street pizza joint that's been feeding Hall of Fame visitors for decades — simple and satisfying",
        reservationNeeded: false,
      },
      {
        name: "Nicoletta's Italian Cafe",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Cooperstown Italian with homemade pasta, red sauce classics, and a warm family atmosphere",
        reservationNeeded: true,
      },
      {
        name: "The Glimmerglass Festival Tent",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Pre-opera dinners at Glimmerglass during summer festival season — surprisingly great group dining",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Brewery Ommegang",
        vibe: "brewpub",
        highlight:
          "Belgian-style farmstead brewery on a former hop farm — taproom, tours, and outdoor festivals are world-class",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "The Pit at Cooperstown",
        vibe: "dive",
        highlight:
          "Basement bar on Main Street — dive-bar vibes with baseball memorabilia and cheap beers",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Templeton Hall",
        vibe: "cocktail",
        highlight:
          "Farm brewery and taproom in a restored barn — craft ales and a scenic patio",
        lateNight: false,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "National Baseball Hall of Fame",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [25, 35],
        groupFriendly: true,
        highlight:
          "The reason Cooperstown exists — plaques, memorabilia, and baseball history that even non-fans enjoy",
        bestFor: "rest day",
        provider: "National Baseball Hall of Fame",
      },
      {
        name: "Brewery Ommegang Tour",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [15, 30],
        groupFriendly: true,
        highlight:
          "Tour a world-class Belgian brewery on a scenic hop farm — generous tastings and a beautiful campus",
        bestFor: "rest day",
        provider: "Brewery Ommegang",
      },
      {
        name: "Otsego Lake Boat Rental",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [40, 80],
        groupFriendly: true,
        highlight:
          "Pontoon or kayak rental on Otsego Lake — James Fenimore Cooper's Glimmerglass with beers and swimming",
        bestFor: "rest day",
      },
      {
        name: "Cooperstown Bat Company Factory Tour",
        type: "brewery",
        duration: "1-2 hours",
        pricePerPerson: [12, 20],
        groupFriendly: true,
        highlight:
          "Watch custom baseball bats being turned on a lathe — get a personalized souvenir bat",
        bestFor: "arrival day",
        provider: "Cooperstown Bat Company",
      },
      {
        name: "Glimmerglass State Park",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 10],
        groupFriendly: true,
        highlight:
          "Swim, hike, and grill at the north end of Otsego Lake — perfect half-day with a group",
        bestFor: "morning before golf",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [10, 14],
        hourlyRate: [150, 225],
        providers: ["Cooperstown Coach", "Upstate Shuttle"],
        notes:
          "Helpful for getting to Ommegang brewery and off-site courses. Downtown Cooperstown is easily walkable.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [60, 120],
        providers: ["Cooperstown Chef", "Otsego Lake Catering"],
        mealTypes: ["steak dinner", "BBQ cookout", "lakeside fish fry", "breakfast"],
        notes:
          "A lakeside BBQ cookout is the Cooperstown move — grill out on the dock with local craft beer and lake views at sunset.",
      },
    ],
  },
  {
    id: "cape-may-nj",
    city: "Cape May",
    state: "NJ",
    region: "Northeast",
    tagline: "Victorian beach town with underrated golf and a wine trail scene",
    description:
      "Cape May is a charming Victorian beach town at the southern tip of New Jersey with solid golf, a growing wine trail, and a walkable downtown packed with restaurants and bars. Play courses through pine barrens and coastal terrain, tour wineries on the Cape May Wine Trail, and hit the Washington Street Mall for seafood and cocktails. More refined than the rest of the Jersey Shore.",
    population: "tiny",
    nearestAirport: {
      code: "ACY",
      name: "Atlantic City International Airport",
      driveMinutes: 55,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Cape May National Golf Club",
        tier: "premium",
        greenFeeRange: [59, 99],
        holes: 18,
        par: 71,
        yardage: 6905,
        slope: 133,
        rating: 72.8,
        walkable: false,
        style: "coastal",
        driveMinutes: 10,
        url: "https://www.capemaynational.com",
        highlight:
          "Karl Litton/Robert Mullock design through wetlands and pines — consistently ranked among NJ's best public courses",
      },
      {
        name: "Avalon Golf Club",
        tier: "solid",
        greenFeeRange: [49, 85],
        holes: 18,
        par: 71,
        yardage: 6301,
        slope: 126,
        rating: 70.2,
        walkable: true,
        style: "coastal",
        driveMinutes: 20,
        highlight:
          "Bob Hendricks design in Swainton with coastal wind and well-maintained greens — solid shore golf",
      },
      {
        name: "Sand Barrens Golf Club",
        tier: "solid",
        greenFeeRange: [39, 69],
        holes: 27,
        par: 72,
        yardage: 6800,
        slope: 128,
        rating: 71.5,
        walkable: false,
        style: "links",
        driveMinutes: 25,
        url: "https://www.sandbarrensgolf.com",
        highlight:
          "27 holes through South Jersey pine barrens — waste bunkers and sandy soil give it a true links feel",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [700, 2500],
        amenities: ["ocean views", "pool", "deck", "outdoor grill", "beach access"],
        areaDescription: "Cape May Beach / West Cape May",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/new-jersey/cape-may",
        notes:
          "Beach houses in Cape May book extremely early for summer. Fall is gorgeous and much more affordable. Look for West Cape May for more space.",
      },
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [500, 1800],
        amenities: ["walkable to Washington Street", "parking", "deck", "historic charm"],
        areaDescription: "Downtown Cape May / Victorian District",
        searchUrl: "https://www.airbnb.com/s/Cape-May--NJ",
        notes:
          "Downtown rentals near the Washington Street Mall mean walking to every restaurant and bar. More historic charm, less beach house vibe.",
      },
    ],
    dining: [
      {
        name: "The Lobster House",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Cape May institution on the fishing wharf — massive seafood menu, raw bar, and the Schooner Bar on a docked ship",
        reservationNeeded: true,
      },
      {
        name: "The Ebbitt Room",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "large-group",
        highlight:
          "Virginia Hotel fine dining with seasonal farm-to-table menus — the big-night dinner spot",
        reservationNeeded: true,
      },
      {
        name: "Lucky Bones Backwater Grille",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Casual seafood and pub fare near the harbor — group-friendly with house-brewed beer",
        reservationNeeded: false,
      },
      {
        name: "George's Place",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Greek-influenced breakfast and lunch spot — best pancakes and omelets in Cape May",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Cape May Brewing Company",
        vibe: "brewpub",
        highlight:
          "Craft brewery at the airport with a huge tasting room, food trucks, and outdoor games",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "The Rusty Nail",
        vibe: "patio",
        highlight:
          "Beach Ave bar with live music, outdoor seating, and sunset views — the summer nightlife hotspot",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Carriage House Cafe & Grill",
        vibe: "cocktail",
        highlight:
          "Washington Street cocktail bar with a speakeasy vibe and creative drinks",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Cape May Wine Trail",
        type: "winery",
        duration: "half day",
        pricePerPerson: [20, 50],
        groupFriendly: true,
        highlight:
          "6+ wineries within 15 minutes — Willow Creek, Natali, and Cape May Winery are the highlights",
        bestFor: "rest day",
      },
      {
        name: "Cape May Whale Watching",
        type: "boat-rental",
        duration: "2-3 hours",
        pricePerPerson: [35, 55],
        groupFriendly: true,
        highlight:
          "Dolphin and whale watching cruises from the Cape May harbor — high hit rate for dolphin pods",
        bestFor: "rest day",
        provider: "Cape May Whale Watcher",
      },
      {
        name: "Cape May Brewing Tour",
        type: "brewery",
        duration: "2-3 hours",
        pricePerPerson: [15, 30],
        groupFriendly: true,
        highlight:
          "Tour and tastings at one of NJ's best craft breweries — their King Porter Stomp is legendary",
        bestFor: "arrival day",
        provider: "Cape May Brewing Company",
      },
      {
        name: "Deep Sea Fishing Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [80, 150],
        groupFriendly: true,
        highlight:
          "Charter out of the Cape May harbor for flounder, sea bass, and bluefish",
        bestFor: "rest day",
      },
      {
        name: "Cape May Point Lighthouse & Bunker",
        type: "hiking",
        duration: "1-2 hours",
        pricePerPerson: [8, 15],
        groupFriendly: true,
        highlight:
          "Climb the lighthouse for panoramic views, then explore the WWII bunker on the beach",
        bestFor: "morning before golf",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [10, 14],
        hourlyRate: [150, 225],
        providers: ["Cape May Limo", "South Jersey Shuttle"],
        notes:
          "Wine trail shuttles are popular and some include tastings. Downtown Cape May is walkable for bar crawls.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 140],
        providers: ["Cape May Chef", "Shore Chef Services"],
        mealTypes: ["seafood dinner", "lobster bake", "BBQ cookout", "brunch"],
        notes:
          "A seafood dinner on the deck with Cape May wine pairings is the signature group meal. Many chefs source directly from the fishing fleet.",
      },
    ],
  },
  {
    id: "mystic-ct",
    city: "Mystic",
    state: "CT",
    region: "Northeast",
    tagline: "Coastal Connecticut charm with casino backup plans and quality golf",
    description:
      "Mystic offers a New England coastal golf trip with a secret weapon: two massive casinos (Mohegan Sun and Foxwoods) just 15 minutes away. Play quality courses through Connecticut's rolling terrain, explore the charming downtown with great restaurants and bars, and hit the casinos for table games and shows at night. It is a best-of-both-worlds trip.",
    population: "tiny",
    nearestAirport: {
      code: "BDL",
      name: "Bradley International Airport",
      driveMinutes: 75,
    },
    bestSeasons: ["summer", "fall"],
    courses: [
      {
        name: "Shennecossett Golf Course",
        tier: "solid",
        greenFeeRange: [39, 65],
        holes: 18,
        par: 71,
        yardage: 6517,
        slope: 128,
        rating: 71.0,
        walkable: true,
        style: "coastal",
        driveMinutes: 10,
        highlight:
          "Donald Ross design overlooking the Thames River and Long Island Sound — a public treasure with ocean views",
      },
      {
        name: "Lake of Isles Golf Course",
        tier: "premium",
        greenFeeRange: [89, 149],
        holes: 18,
        par: 72,
        yardage: 7252,
        slope: 143,
        rating: 75.6,
        walkable: false,
        style: "parkland",
        driveMinutes: 15,
        url: "https://www.lakeofisles.com",
        highlight:
          "Rees Jones championship design at Foxwoods — top 100 you can play, with a world-class practice facility",
      },
      {
        name: "Elmridge Golf Course",
        tier: "solid",
        greenFeeRange: [35, 55],
        holes: 27,
        par: 72,
        yardage: 6600,
        slope: 125,
        rating: 70.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        highlight:
          "27-hole Pawcatuck facility with three distinct nines — great value and good conditioning for the price",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [600, 2000],
        amenities: ["waterfront", "deck", "outdoor grill", "kayaks", "fire pit"],
        areaDescription: "Mystic / Noank waterfront",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/connecticut/mystic",
        notes:
          "Waterfront homes near Mystic Seaport are charming but book early for summer. Noank is a quiet alternative with great water access.",
      },
      {
        type: "resort-house",
        sleeps: [8, 16],
        nightlyRange: [300, 700],
        amenities: ["casino access", "pool", "spa", "restaurants", "entertainment"],
        areaDescription: "Mohegan Sun / Foxwoods Casino Resorts",
        notes:
          "Casino resort rooms are an option for groups wanting nightlife on-site. Book connecting suites. Foxwoods is closer to Lake of Isles golf.",
      },
    ],
    dining: [
      {
        name: "Oyster Club",
        style: "seafood",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Farm-to-sea restaurant in downtown Mystic — raw bar, creative seafood, and excellent cocktails",
        reservationNeeded: true,
      },
      {
        name: "Engine Room",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Mystic gastropub in a converted factory — craft beer, burgers, and a fun industrial vibe",
        reservationNeeded: false,
      },
      {
        name: "Frank Pepe Pizzeria Napoletana",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Mystic outpost of the legendary New Haven pizza — white clam pie is a must",
        reservationNeeded: false,
      },
      {
        name: "Mystic Pizza",
        style: "italian",
        priceRange: "$",
        capacity: "large-group",
        highlight:
          "Yes, it's from the movie. Decent pizza, fun novelty stop — just embrace it",
        reservationNeeded: false,
      },
    ],
    bars: [
      {
        name: "Bank & Bridge Brewing Co.",
        vibe: "brewpub",
        highlight:
          "Mystic craft brewery with rotating taps in a converted bank building — cozy taproom with good vibes",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "Mohegan Sun Casino Bars",
        vibe: "casino-bar",
        highlight:
          "Multiple bars and clubs inside the casino — Casino of the Earth bar and the Wolf Den for live shows",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Foxwoods Casino Bars",
        vibe: "casino-bar",
        highlight:
          "Multiple lounges and bars including Scorpion Bar and the High Rollers luxury lounge",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Mohegan Sun Casino",
        type: "casino",
        duration: "2-3 hours",
        pricePerPerson: [0, 300],
        groupFriendly: true,
        highlight:
          "1,600 slot machines, 300+ table games, sportsbook, and comedy/concert venue — the full casino experience",
        bestFor: "arrival day",
      },
      {
        name: "Foxwoods Resort Casino",
        type: "casino",
        duration: "2-3 hours",
        pricePerPerson: [0, 300],
        groupFriendly: true,
        highlight:
          "One of the largest casinos in the world — endless gaming floor, restaurants, and entertainment",
        bestFor: "rest day",
      },
      {
        name: "Mystic Seaport Museum",
        type: "boat-rental",
        duration: "2-3 hours",
        pricePerPerson: [25, 35],
        groupFriendly: true,
        highlight:
          "America's leading maritime museum — tall ships, historic buildings, and hands-on exhibits",
        bestFor: "rest day",
        provider: "Mystic Seaport Museum",
      },
      {
        name: "Mystic River Kayaking",
        type: "kayaking",
        duration: "2-3 hours",
        pricePerPerson: [40, 65],
        groupFriendly: true,
        highlight:
          "Paddle the Mystic River past the seaport and drawbridge — relaxed morning activity",
        bestFor: "morning before golf",
      },
      {
        name: "Captain John's Fishing Charter",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [80, 140],
        groupFriendly: true,
        highlight:
          "Charter out of Mystic for striped bass, bluefish, and fluke in Long Island Sound",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 22],
        hourlyRate: [175, 300],
        providers: ["Mystic Luxury Rides", "Premier CT Limo"],
        notes:
          "Casino shuttle is the main use case — Mohegan and Foxwoods both offer free shuttles from area hotels too.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [65, 130],
        providers: ["Mystic Chef Services", "CT Coast Catering"],
        mealTypes: ["lobster bake", "clambake", "seafood dinner", "steak dinner"],
        notes:
          "A New England clambake at a waterfront rental is the peak Mystic group meal. Many chefs work the coastal rental circuit all summer.",
      },
    ],
  },
  {
    id: "hudson-valley-ny",
    city: "Hudson Valley",
    state: "NY",
    region: "Northeast",
    tagline: "NYC's backyard with farm-to-table dining, craft distilleries, and valley golf",
    description:
      "The Hudson Valley offers a polished golf trip just 90 minutes from NYC with some of the best farm-to-table restaurants, craft distilleries, and scenic courses in the Northeast. Play courses through rolling Hudson River terrain, tour distilleries and cideries, and dine at restaurants that rival anything in Manhattan. Ideal for metro-area groups wanting an accessible escape.",
    population: "small",
    nearestAirport: {
      code: "SWF",
      name: "Stewart International Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["spring", "summer", "fall"],
    courses: [
      {
        name: "Garrison Golf Club",
        tier: "premium",
        greenFeeRange: [75, 125],
        holes: 18,
        par: 72,
        yardage: 6470,
        slope: 130,
        rating: 71.5,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        url: "https://www.garrisongolfclub.com",
        highlight:
          "Stunning Hudson River views from every hole — the course where they filmed The Irishman",
      },
      {
        name: "Casperkill Golf Club",
        tier: "solid",
        greenFeeRange: [39, 65],
        holes: 18,
        par: 71,
        yardage: 6300,
        slope: 126,
        rating: 70.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        highlight:
          "Poughkeepsie course with rolling terrain and mature trees — solid public golf at a good price",
      },
      {
        name: "Beekman Country Club",
        tier: "solid",
        greenFeeRange: [45, 75],
        holes: 27,
        par: 72,
        yardage: 6600,
        slope: 127,
        rating: 71.0,
        walkable: true,
        style: "parkland",
        driveMinutes: 20,
        highlight:
          "27-hole facility in Hopewell Junction — three distinct nines with good variety and solid conditioning",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [600, 2200],
        amenities: ["pool", "hot tub", "Hudson views", "fire pit", "game room"],
        areaDescription: "Beacon / Cold Spring area",
        searchUrl: "https://www.vrbo.com/vacation-rentals/usa/new-york/hudson-valley",
        notes:
          "Beacon and Cold Spring are the most charming towns with walkable Main Streets. Book 2-3 months ahead for fall foliage season.",
      },
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [500, 1600],
        amenities: ["farmhouse charm", "fire pit", "chef kitchen", "mountain views"],
        areaDescription: "Rhinebeck / Hudson area",
        searchUrl: "https://www.airbnb.com/s/Hudson-Valley--NY",
        notes:
          "Rhinebeck and Hudson have the best restaurant scenes. Hudson is having a major moment with new bars and restaurants opening constantly.",
      },
    ],
    dining: [
      {
        name: "The Roundhouse",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Beacon waterfall restaurant with creative American cuisine and a stunning industrial setting",
        reservationNeeded: true,
      },
      {
        name: "Terrapin Restaurant",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Rhinebeck farm-to-table with locally sourced everything — a Hudson Valley dining staple",
        reservationNeeded: true,
      },
      {
        name: "Grazin' Diner",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Hudson organic diner with grass-fed burgers and farm-fresh shakes — the best casual meal in town",
        reservationNeeded: false,
      },
      {
        name: "Fish & Game",
        style: "farm-to-table",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "James Beard Award-winning restaurant in Hudson — wood-fired cooking and hyper-local ingredients",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "Denning's Point Distillery",
        vibe: "cocktail",
        highlight:
          "Beacon craft distillery in a restored warehouse — gin, vodka, and whiskey tastings with river views",
        lateNight: false,
        walkableFromDowntown: true,
      },
      {
        name: "The Anchor",
        vibe: "dive",
        highlight:
          "Hudson dive bar with craft beer, late-night food, and a local crowd that keeps things real",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Industrial Arts Brewing Company",
        vibe: "brewpub",
        highlight:
          "Garnerville craft brewery with outstanding hazy IPAs and a big beer hall",
        lateNight: false,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Hudson Valley Distillery Trail",
        type: "distillery",
        duration: "half day",
        pricePerPerson: [25, 60],
        groupFriendly: true,
        highlight:
          "Hit Denning's Point, Tuthilltown (makers of Hudson Whiskey), and more in one afternoon",
        bestFor: "rest day",
      },
      {
        name: "Storm King Art Center",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [20, 20],
        groupFriendly: true,
        highlight:
          "500-acre outdoor sculpture park — massive art installations in rolling Hudson Valley hills",
        bestFor: "rest day",
        provider: "Storm King Art Center",
      },
      {
        name: "Breakneck Ridge Hike",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 0],
        groupFriendly: true,
        highlight:
          "Scramble up the most popular hike in the Valley for panoramic Hudson River views",
        bestFor: "morning before golf",
      },
      {
        name: "Cidery & Orchard Tour",
        type: "winery",
        duration: "half day",
        pricePerPerson: [15, 40],
        groupFriendly: true,
        highlight:
          "Hit Pennings Farm Cidery, Angry Orchard, and Fishkill Farms for tastings and orchard walks",
        bestFor: "rest day",
      },
      {
        name: "Dia Beacon Museum",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [18, 18],
        groupFriendly: true,
        highlight:
          "World-class contemporary art museum in a massive former Nabisco factory — surprisingly engaging",
        bestFor: "rest day",
        provider: "Dia Beacon",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [12, 14],
        hourlyRate: [175, 275],
        providers: ["Hudson Valley Luxury Transportation", "Prestige Limo NY"],
        notes:
          "Distillery and cidery hopping requires transport — towns are spread along the valley. A sprinter with a planned route is the way to go.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 140],
        providers: ["Hudson Valley Chef", "Farm & Fork Catering"],
        mealTypes: ["farm-to-table dinner", "BBQ cookout", "brunch", "Italian feast"],
        notes:
          "The farm-to-table chef scene here is exceptional — chefs source from Fishkill Farms, Glynwood, and local dairies. A house dinner paired with local wines is the quintessential HV experience.",
      },
    ],
  },
];
