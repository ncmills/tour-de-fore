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
];
