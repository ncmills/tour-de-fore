import { Destination } from "./types";

export const mountainSouthwest2Destinations: Destination[] = [
  // ─── Edwards, CO (Vail Valley) ─────────────────────────────────────
  {
    id: "edwards-co",
    city: "Edwards",
    state: "CO",
    region: "Mountain West",
    tagline: "Vail Valley mountain golf without the Vail Village price tag",
    description:
      "Edwards sits in the heart of the Vail Valley, fifteen minutes downvalley from Vail and Beaver Creek. The public courses run cheaper than the resort towns, the rental homes are bigger, and you're still surrounded by the Gore and Sawatch ranges. A smart base for a high-country buddy trip.",
    population: "small",
    nearestAirport: {
      code: "EGE",
      name: "Eagle County Regional Airport",
      driveMinutes: 20,
    },
    bestSeasons: ["summer", "fall"],
    groceryNotes:
      "City Market and Costco in Avon/Edwards, liquor at Beaver Liquors in Avon — stock up before heading upvalley",
    courses: [
      {
        name: "Sonnenalp Golf Club",
        tier: "premium",
        greenFeeRange: [120, 195],
        holes: 18,
        par: 71,
        yardage: 7059,
        walkable: false,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.sonnenalp.com/golf",
        highlight:
          "Bob Cupp design in the Singletree community, voted a Golf Digest top-100 resort course",
        googleRating: 4.6,
      },
      {
        name: "Eagle Ranch Golf Club",
        tier: "premium",
        greenFeeRange: [90, 165],
        holes: 18,
        par: 72,
        yardage: 7530,
        walkable: false,
        style: "mountain",
        driveMinutes: 25,
        url: "https://www.eagleranchgolf.com",
        highlight:
          "Arnold Palmer design in Eagle with wide fairways and big Rocky Mountain backdrops",
        googleRating: 4.6,
      },
      {
        name: "Gypsum Creek Golf Course",
        tier: "solid",
        greenFeeRange: [55, 95],
        holes: 18,
        par: 72,
        yardage: 6980,
        walkable: true,
        style: "mountain",
        driveMinutes: 30,
        url: "https://www.gypsumcreekgolf.com",
        highlight:
          "Pete Dye–routed mix of mountain and valley holes — the best value in the valley",
        googleRating: 4.4,
        hypeTag: "BEST VALUE",
      },
      {
        name: "EagleVail Golf Club",
        tier: "solid",
        greenFeeRange: [70, 120],
        holes: 18,
        par: 72,
        yardage: 6490,
        walkable: true,
        style: "mountain",
        driveMinutes: 10,
        url: "https://www.eaglevailgolfclub.com",
        highlight:
          "Friendly public championship course plus a nine-hole par-3 for the casual crowd",
        googleRating: 4.4,
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [10, 16],
        nightlyRange: [600, 1800],
        amenities: [
          "hot tub",
          "mountain views",
          "fireplace",
          "big kitchen",
          "game room",
          "ski/golf storage",
        ],
        areaDescription:
          "Singletree, Cordillera Valley Club, or Arrowhead — larger valley homes well under Vail Village pricing",
        searchUrl:
          "https://www.vrbo.com/search?destination=Edwards%2C+CO&groupSize=12",
        notes:
          "Downvalley homes give you more square footage per dollar than Vail or Beaver Creek. Summer rates are a fraction of ski season.",
        avgRating: 4.7,
        bedsBreakdown: "4 kings + 4 queens = 16 guys at 2/bed",
      },
      {
        type: "lodge",
        sleeps: [10, 16],
        nightlyRange: [300, 650],
        amenities: ["spa", "pool", "on-site dining", "shuttle", "concierge"],
        areaDescription:
          "The Lodge & Spa at Cordillera or Westin Riverfront in nearby Avon",
        searchUrl: "https://www.cordilleralodge.com",
        notes:
          "Book a block of rooms at a valley lodge if you want spa/dining onsite. Avon's Westin has a gondola to Beaver Creek.",
        avgRating: 4.6,
      },
    ],
    dining: [
      {
        name: "Vin48 Restaurant & Wine Bar",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Avon small-plates and wine spot that locals book for celebrations",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Gore Range Brewery",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Edwards brewpub with house beers, burgers, and room for the whole crew",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "E-Town",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Edwards favorite for wood-fired pizza, big salads, and a patio",
        reservationNeeded: false,
        googleRating: 4.5,
      },
      {
        name: "Juniper Restaurant",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Riverside Edwards spot doing seasonal mountain cuisine and a strong happy hour",
        reservationNeeded: true,
        googleRating: 4.5,
      },
    ],
    bars: [
      {
        name: "Gore Range Brewery Bar",
        vibe: "brewpub",
        highlight: "House-brewed beer and a packed après crowd in Edwards",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.4,
      },
      {
        name: "Dusty Boot Saloon",
        vibe: "saloon",
        highlight:
          "Western-themed Beaver Creek saloon with margaritas and a rowdy patio",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Bob's Place",
        vibe: "dive",
        highlight:
          "No-frills Edwards locals' bar — pool table, cheap beer, late hours",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Upper Colorado River Rafting",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [80, 130],
        groupFriendly: true,
        highlight:
          "Class II–III floats on the Colorado and Eagle rivers — perfect rest-day cooler trip",
        bestFor: "rest day",
        provider: "Timberline Tours",
      },
      {
        name: "Vail Valley UTV & Jeep Tours",
        type: "atv",
        duration: "half day",
        pricePerPerson: [120, 200],
        groupFriendly: true,
        highlight:
          "High-country off-road tours into the White River National Forest",
        bestFor: "arrival day",
        provider: "Nova Guides",
      },
      {
        name: "Fly Fishing the Eagle River",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [150, 300],
        groupFriendly: true,
        highlight:
          "Guided wade or float trips on Gold Medal trout water minutes from town",
        bestFor: "rest day",
        provider: "Vail Valley Anglers",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [10, 24],
        hourlyRate: [120, 250],
        fullDayRate: [900, 1800],
        canDoGolfAndBars: true,
        providers: ["Vail Valley Transportation", "Mountain Star Transportation", "High Mountain Taxi"],
        notes:
          "Sprinter vans and small buses cover the I-70 corridor from EGE airport to Vail. Book ahead for summer weekends.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [85, 175],
        providers: ["Take a Chef", "Vail Valley Private Chefs", "Cozymeal"],
        mealTypes: ["steak dinner", "Colorado wild game", "breakfast spread"],
        notes:
          "In-home chefs are common in the valley's rental homes — a steak night beats fighting for a table during peak weeks.",
      },
    ],
  },

  // ─── Crested Butte, CO ─────────────────────────────────────────────
  {
    id: "crested-butte-co",
    city: "Crested Butte",
    state: "CO",
    region: "Mountain West",
    tagline: "Wildflower-capital mountain golf at 9,000 feet",
    description:
      "Crested Butte is one of Colorado's last true end-of-the-road ski towns, and in summer it turns into a wildflower-and-mountain-bike paradise. The one big course — Robert Trent Jones Jr.'s Club at Crested Butte — is open to the public, and the Victorian downtown bar scene punches way above the town's size.",
    population: "tiny",
    nearestAirport: {
      code: "GUC",
      name: "Gunnison-Crested Butte Regional Airport",
      driveMinutes: 35,
    },
    bestSeasons: ["summer"],
    groceryNotes:
      "Clark's Market in town; for a bigger run hit City Market in Gunnison 30 min south. Liquor at the Tap House and town liquor stores.",
    courses: [
      {
        name: "The Club at Crested Butte",
        tier: "premium",
        greenFeeRange: [150, 289],
        holes: 18,
        par: 72,
        yardage: 7208,
        walkable: false,
        style: "mountain",
        driveMinutes: 5,
        url: "https://theclubatcrestedbutte.com",
        highlight:
          "Robert Trent Jones Jr. design in the Skyland community with 360-degree mountain views at 9,000 feet",
        googleRating: 4.6,
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "Dos Rios Golf Club",
        tier: "solid",
        greenFeeRange: [50, 85],
        holes: 18,
        par: 72,
        yardage: 6500,
        walkable: true,
        style: "mountain",
        driveMinutes: 30,
        url: "https://www.dosriosgolf.com",
        highlight:
          "Gunnison's friendly riverside public course — the value round to pair with the Club",
        googleRating: 4.4,
        hypeTag: "BEST VALUE",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [500, 1500],
        amenities: [
          "hot tub",
          "mountain views",
          "fireplace",
          "big kitchen",
          "mudroom",
        ],
        areaDescription:
          "Town of Crested Butte (Victorian homes) or Mt. Crested Butte (ski-base condos and homes)",
        searchUrl:
          "https://www.vrbo.com/search?destination=Crested+Butte%2C+CO&groupSize=12",
        notes:
          "In-town Victorians put you walking distance to Elk Avenue bars. Mt. CB up the hill is bigger and cheaper in summer.",
        avgRating: 4.7,
        bedsBreakdown: "3 kings + 4 queens = 14 guys at 2/bed",
      },
      {
        type: "lodge",
        sleeps: [8, 16],
        nightlyRange: [250, 550],
        amenities: ["pool", "hot tub", "on-site dining", "ski-base location"],
        areaDescription: "Mt. Crested Butte base area lodges and condo-hotels",
        searchUrl: "https://www.skicb.com/lodging",
        notes:
          "Book a block of condos at the ski base for an easy group setup with shared common space.",
        avgRating: 4.4,
      },
    ],
    dining: [
      {
        name: "Soupcon",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "small",
        highlight:
          "Tiny chef-driven cabin doing the fanciest dinner in town — book the splurge night early",
        reservationNeeded: true,
        googleRating: 4.7,
      },
      {
        name: "The Secret Stash",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Legendary funky pizza joint with award-winning pies and a big group vibe",
        reservationNeeded: false,
        googleRating: 4.6,
      },
      {
        name: "Montanya Distillers",
        style: "casual",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Rum distillery and tasting room with small plates and serious craft cocktails",
        reservationNeeded: false,
        googleRating: 4.6,
      },
      {
        name: "The Slogar Bar & Restaurant",
        style: "southern",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Historic family-style fried chicken or steak dinner in a Victorian house",
        reservationNeeded: true,
        googleRating: 4.5,
      },
    ],
    bars: [
      {
        name: "Kochevar's Saloon",
        vibe: "saloon",
        highlight:
          "1886 log-cabin saloon on Elk Avenue — pool, shuffleboard, and town history",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
      {
        name: "The Talk of the Town",
        vibe: "dive",
        highlight: "Elk Avenue dive with cheap drinks and a late-night crowd",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Montanya Distillers Tasting Room",
        vibe: "cocktail",
        highlight: "Mountain rum cocktails in a buzzy distillery setting",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.6,
      },
    ],
    activities: [
      {
        name: "Crested Butte Mountain Biking",
        type: "mountain-biking",
        duration: "half day",
        pricePerPerson: [60, 150],
        groupFriendly: true,
        highlight:
          "The town that claims to have invented the sport — guided rides and lift-served downhill",
        bestFor: "rest day",
        provider: "Crested Butte Mountain Resort",
      },
      {
        name: "Wildflower & Alpine Jeep Tours",
        type: "atv",
        duration: "half day",
        pricePerPerson: [90, 180],
        groupFriendly: true,
        highlight:
          "Off-road tours over Schofield Pass through the famous July wildflower meadows",
        bestFor: "arrival day",
        provider: "Crested Butte Mountain Guides",
      },
      {
        name: "Taylor River Fly Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [150, 300],
        groupFriendly: true,
        highlight:
          "Guided trout trips on the Taylor and Gunnison — Gold Medal water nearby",
        bestFor: "rest day",
        provider: "Dragonfly Anglers",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [8, 20],
        hourlyRate: [110, 220],
        fullDayRate: [800, 1600],
        canDoGolfAndBars: true,
        providers: ["Alpine Express", "Dolly's Mountain Shuttle"],
        notes:
          "Alpine Express runs GUC airport shuttles; private vans handle the golf-and-bars loop. Town is small enough to walk Elk Avenue once you're in.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [90, 180],
        providers: ["Take a Chef", "Crested Butte Private Chefs"],
        mealTypes: ["steak dinner", "Colorado game", "breakfast"],
        notes:
          "With limited restaurant capacity for big groups, an in-home chef night is the smart play for 12+.",
      },
    ],
  },

  // ─── Grand Junction, CO ────────────────────────────────────────────
  {
    id: "grand-junction-co",
    city: "Grand Junction",
    state: "CO",
    region: "Mountain West",
    tagline: "Western Slope wine country with Colorado's #1-rated course",
    description:
      "Grand Junction is Colorado's wine country and home to Redlands Mesa, regularly rated the best course in the state. Year-round desert golf, a walkable downtown with breweries, and the Colorado National Monument out the back door make it a sneaky-great low-key buddy trip.",
    population: "medium",
    nearestAirport: {
      code: "GJT",
      name: "Grand Junction Regional Airport",
      driveMinutes: 15,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "City Market, Safeway, and Costco in town; multiple liquor stores downtown",
    courses: [
      {
        name: "Redlands Mesa Golf Course",
        tier: "bucket-list",
        greenFeeRange: [90, 160],
        holes: 18,
        par: 72,
        yardage: 7007,
        walkable: false,
        style: "desert",
        driveMinutes: 15,
        url: "https://redlandsmesa.com",
        highlight:
          "Jim Engh design with canyon views beneath the Colorado National Monument — routinely Colorado's #1 public",
        googleRating: 4.8,
        hypeTag: "TOP 100 PUBLIC",
        rankNote: "Frequently ranked #1 Public in Colorado",
      },
      {
        name: "Tiara Rado Golf Course",
        tier: "solid",
        greenFeeRange: [35, 60],
        holes: 18,
        par: 72,
        yardage: 6308,
        walkable: true,
        style: "parkland",
        driveMinutes: 15,
        url: "https://golfgrandjunction.net/tiara-rado",
        highlight:
          "City-run course bordered by the Colorado National Monument — great value with water in play",
        googleRating: 4.3,
        hypeTag: "BEST VALUE",
      },
      {
        name: "The Golf Club at Bookcliff",
        tier: "solid",
        greenFeeRange: [40, 75],
        holes: 18,
        par: 72,
        yardage: 6800,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.bookcliffcc.com",
        highlight:
          "Mature tree-lined layout with the Bookcliffs as a backdrop — a fair, classic test",
        googleRating: 4.4,
      },
      {
        name: "Chipeta Golf Course",
        tier: "budget",
        greenFeeRange: [30, 50],
        holes: 18,
        par: 70,
        yardage: 6175,
        walkable: true,
        style: "parkland",
        driveMinutes: 12,
        url: "https://chipetagolf.com",
        highlight:
          "Easy-walking municipal track — the warm-up round before you tackle Redlands Mesa",
        googleRating: 4.3,
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [350, 900],
        amenities: ["pool", "hot tub", "big kitchen", "patio", "fire pit"],
        areaDescription:
          "Redlands or downtown-adjacent neighborhoods — close to the course and the wine trail",
        searchUrl:
          "https://www.vrbo.com/search?destination=Grand+Junction%2C+CO&groupSize=12",
        notes:
          "Rental prices here are a bargain compared to the mountain towns. The Redlands keeps you minutes from the #1 course.",
        avgRating: 4.6,
      },
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [200, 400],
        amenities: ["pool", "breakfast", "fitness center", "shuttle"],
        areaDescription: "Downtown Grand Junction hotel block near Main Street",
        searchUrl:
          "https://www.marriott.com/search/findHotels.mi?t=grand+junction+co",
        notes:
          "Book rooms downtown to walk to breweries and restaurants on Main Street after rounds.",
        avgRating: 4.4,
      },
    ],
    dining: [
      {
        name: "Bin 707 Foodbar",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Downtown farm-to-table leader sourcing from the surrounding Palisade farms",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "626 on Rood",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Polished American dinner spot with a strong local-wine list",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Pablo's Pizza",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Quirky downtown pizza joint that easily handles a hungry foursome of foursomes",
        reservationNeeded: false,
        googleRating: 4.5,
      },
      {
        name: "Rockslide Brew Pub",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Main Street brewpub with house beers and pub grub — the easy group default",
        reservationNeeded: false,
        googleRating: 4.3,
      },
    ],
    bars: [
      {
        name: "Kannah Creek Brewing Company",
        vibe: "brewpub",
        highlight: "Local brewery favorite with a roomy taproom and patio",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.5,
      },
      {
        name: "Ramblebine Brewing Company",
        vibe: "brewpub",
        highlight: "Downtown craft taproom that's an easy walking stop",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.6,
      },
      {
        name: "The Garden Bar",
        vibe: "patio",
        highlight:
          "Outdoor downtown drinking garden — the warm-night gathering spot",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Palisade Wine Country Tour",
        type: "winery",
        duration: "half day",
        pricePerPerson: [60, 120],
        groupFriendly: true,
        highlight:
          "Colorado's wine capital is 20 minutes away — tasting-room hop by van",
        bestFor: "rest day",
        provider: "Absolute Prestige Wine Tours",
      },
      {
        name: "Colorado National Monument Drive & Hike",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [0, 25],
        groupFriendly: true,
        highlight:
          "Rim Rock Drive and short canyon hikes through red-rock monoliths",
        bestFor: "morning before golf",
      },
      {
        name: "Colorado River Rafting",
        type: "rafting",
        duration: "half day",
        pricePerPerson: [70, 120],
        groupFriendly: true,
        highlight:
          "Scenic and whitewater floats on the Colorado through Ruby-Horsethief canyons",
        bestFor: "rest day",
        provider: "Adventure Bound USA",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 24],
        hourlyRate: [90, 180],
        fullDayRate: [700, 1400],
        canDoGolfAndBars: true,
        providers: ["Absolute Prestige Limousine", "Grand Valley Transit Charters"],
        notes:
          "Wine-tour shuttles double as your golf-and-bar transport. Palisade tasting loops are the local specialty.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 140],
        providers: ["Take a Chef", "Cozymeal"],
        mealTypes: ["steak dinner", "wine-paired dinner", "breakfast"],
        notes:
          "Pair an in-home chef with bottles from the Palisade wineries for a strong dinner night.",
      },
    ],
  },

  // ─── Montrose, CO ──────────────────────────────────────────────────
  {
    id: "montrose-co",
    city: "Montrose",
    state: "CO",
    region: "Mountain West",
    tagline: "Two Nicklaus-and-links tracks at the gateway to the Black Canyon",
    description:
      "Montrose is the affordable Western Slope base between Telluride and the Black Canyon of the Gunnison. Two strong public courses — a Jack Nicklaus design and a links-style track — anchor a trip that costs a fraction of the nearby resort towns.",
    population: "small",
    nearestAirport: {
      code: "MTJ",
      name: "Montrose Regional Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "City Market and Walmart in town; liquor stores along Townsend Ave",
    courses: [
      {
        name: "The Bridges Golf & Country Club",
        tier: "premium",
        greenFeeRange: [70, 120],
        holes: 18,
        par: 71,
        yardage: 7207,
        walkable: false,
        style: "parkland",
        driveMinutes: 8,
        url: "https://www.bridgesgolfcc.com",
        highlight:
          "Longest course in the area, a Nicklaus Design layout with mountain views and undulating greens",
        googleRating: 4.5,
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "The Links at Cobble Creek",
        tier: "solid",
        greenFeeRange: [50, 80],
        holes: 18,
        par: 72,
        yardage: 6982,
        walkable: true,
        style: "links",
        driveMinutes: 10,
        url: "https://www.cobblecreek.com",
        highlight:
          "Craig Cherry links-style design in the Cobble Creek community — fair, fun, and a great value",
        googleRating: 4.4,
        hypeTag: "BEST VALUE",
      },
      {
        name: "Black Canyon Golf Course",
        tier: "budget",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 72,
        yardage: 6500,
        walkable: true,
        style: "parkland",
        driveMinutes: 8,
        url: "https://www.cityofmontrose.org",
        highlight:
          "City-run track named for the nearby national park — easy walking value round",
        googleRating: 4.3,
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [300, 800],
        amenities: ["hot tub", "big kitchen", "mountain views", "patio"],
        areaDescription:
          "Montrose neighborhoods or the Cobble Creek golf community",
        searchUrl:
          "https://www.vrbo.com/search?destination=Montrose%2C+CO&groupSize=12",
        notes:
          "Rentals here are some of the cheapest on the Western Slope — a base for hitting both courses plus a Telluride day.",
        avgRating: 4.6,
      },
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [150, 350],
        amenities: ["pool", "breakfast", "fitness center"],
        areaDescription: "Townsend Avenue hotel corridor in Montrose",
        searchUrl:
          "https://www.marriott.com/search/findHotels.mi?t=montrose+co",
        notes:
          "Block a few rooms at the chain hotels if you want simple logistics near the highway.",
        avgRating: 4.3,
      },
    ],
    dining: [
      {
        name: "Camp Robber",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Montrose's go-to for Southwest-leaning New American and famous green-chile dishes",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Colorado Boy Pizzeria & Brewery",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Wood-fired pizza and house beer — the easy group dinner downtown",
        reservationNeeded: false,
        googleRating: 4.5,
      },
      {
        name: "Two Rascals Brewing",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Downtown brewery with a beer-garden feel and rotating food",
        reservationNeeded: false,
        googleRating: 4.5,
      },
      {
        name: "Stone House Restaurant",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Steaks and a deep wine list in a historic stone building",
        reservationNeeded: true,
        googleRating: 4.4,
      },
    ],
    bars: [
      {
        name: "Horsefly Brewing Company",
        vibe: "brewpub",
        highlight:
          "Local brewery and pub with a big patio — Montrose's standby hangout",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.5,
      },
      {
        name: "Two Rascals Brewing Taproom",
        vibe: "brewpub",
        highlight: "Walkable downtown taproom with a friendly crowd",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
      {
        name: "The Trough",
        vibe: "dive",
        highlight: "No-frills local bar for cheap drinks and pool",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Black Canyon of the Gunnison Tour",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [0, 30],
        groupFriendly: true,
        highlight:
          "One of the steepest, narrowest gorges in North America, 20 minutes from town",
        bestFor: "morning before golf",
      },
      {
        name: "Gunnison Gorge Rafting",
        type: "rafting",
        duration: "full day",
        pricePerPerson: [120, 200],
        groupFriendly: true,
        highlight:
          "Wilderness whitewater on the Gunnison through a remote red-rock canyon",
        bestFor: "rest day",
        provider: "RIGS Adventure Co.",
      },
      {
        name: "Ridgway Reservoir Boating",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [40, 100],
        groupFriendly: true,
        highlight:
          "Pontoon and kayak rentals on a turquoise reservoir under the San Juans",
        bestFor: "rest day",
        provider: "Ridgway State Park",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [8, 20],
        hourlyRate: [90, 180],
        fullDayRate: [650, 1300],
        canDoGolfAndBars: true,
        providers: ["Telluride Express", "Montrose Charter Service"],
        notes:
          "Telluride Express runs MTJ airport transfers and can be chartered for golf/bar loops or a Telluride day trip.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 140],
        providers: ["Take a Chef", "Cozymeal"],
        mealTypes: ["steak dinner", "green-chile feast", "breakfast"],
        notes:
          "Limited big-group restaurant capacity makes an in-home chef night a good call for 12+.",
      },
    ],
  },

  // ─── Sheridan, WY ──────────────────────────────────────────────────
  {
    id: "sheridan-wy",
    city: "Sheridan",
    state: "WY",
    region: "Mountain West",
    tagline: "Wyoming's #1 course at the foot of the Bighorns",
    description:
      "Sheridan is classic old-Wyoming: a real Main Street, polo grounds, and the Bighorn Mountains rising right out of town. The Powder Horn is consistently ranked the best course in Wyoming, and the historic downtown saloons make for a genuinely Western buddy trip.",
    population: "small",
    nearestAirport: {
      code: "SHR",
      name: "Sheridan County Airport",
      driveMinutes: 10,
    },
    bestSeasons: ["summer"],
    groceryNotes:
      "Albertsons and Walmart in town; liquor at downtown stores along Main",
    courses: [
      {
        name: "The Powder Horn Golf Club",
        tier: "premium",
        greenFeeRange: [90, 125],
        holes: 27,
        par: 72,
        yardage: 7060,
        walkable: false,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.thepowderhorn.com",
        highlight:
          "Dick Bailey–designed 27 holes ranked Wyoming's #1 course by Golfweek, managed by Troon",
        googleRating: 4.7,
        hypeTag: "LOCALS' FAVORITE",
        rankNote: "#1 Course in Wyoming — Golfweek",
      },
      {
        name: "Kendrick Golf Course",
        tier: "solid",
        greenFeeRange: [35, 55],
        holes: 18,
        par: 71,
        yardage: 6500,
        walkable: true,
        style: "parkland",
        driveMinutes: 8,
        url: "https://www.kendrickgolf.com",
        highlight:
          "City-owned course with Bighorn views — the value round to pair with the Powder Horn",
        googleRating: 4.4,
        hypeTag: "BEST VALUE",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [300, 800],
        amenities: ["big kitchen", "patio", "fire pit", "mountain views"],
        areaDescription:
          "Sheridan neighborhoods near downtown or out toward the Powder Horn community",
        searchUrl:
          "https://www.vrbo.com/search?destination=Sheridan%2C+WY&groupSize=12",
        notes:
          "Rentals are affordable and put you minutes from both Main Street and the courses. Book ahead for summer rodeo week.",
        avgRating: 4.6,
      },
      {
        type: "ranch",
        sleeps: [10, 16],
        nightlyRange: [400, 1200],
        amenities: ["acreage", "fishing", "horseback", "big lodge", "fire pit"],
        areaDescription:
          "Guest ranches in the Bighorn foothills outside Sheridan and Big Horn",
        searchUrl: "https://www.vrbo.com/search?destination=Sheridan%2C+WY",
        notes:
          "A foothills ranch gives the full Wyoming experience — fishing and horseback off the back porch.",
        avgRating: 4.7,
      },
    ],
    dining: [
      {
        name: "Frackelton's",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Main Street's polished American spot in a historic building — the dinner-out choice",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Wyoming's Rib & Chop House",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Hearty steaks and ribs that handle a hungry golf crew",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Black Tooth Brewing Company",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Sheridan's flagship brewery with a big taproom and food trucks",
        reservationNeeded: false,
        googleRating: 4.6,
      },
      {
        name: "Birch",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Seasonal small plates and cocktails for the more adventurous night",
        reservationNeeded: true,
        googleRating: 4.6,
      },
    ],
    bars: [
      {
        name: "Mint Bar",
        vibe: "saloon",
        highlight:
          "Iconic 1907 Main Street saloon wallpapered in cattle brands — Wyoming history in a glass",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.6,
      },
      {
        name: "Black Tooth Brewing Taproom",
        vibe: "brewpub",
        highlight: "Locals' brewery taproom with a relaxed crowd",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.6,
      },
      {
        name: "Luminous Brewhouse",
        vibe: "brewpub",
        highlight: "Second Sheridan brewery with a big patio and games",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.6,
      },
    ],
    activities: [
      {
        name: "Bighorn Mountains Jeep & ATV Tour",
        type: "atv",
        duration: "half day",
        pricePerPerson: [120, 220],
        groupFriendly: true,
        highlight:
          "Off-road into the Bighorn National Forest with high-alpine overlooks",
        bestFor: "arrival day",
        provider: "Bighorn Backcountry Tours",
      },
      {
        name: "Tongue River Fly Fishing",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [150, 300],
        groupFriendly: true,
        highlight:
          "Guided trout trips on the Tongue and Bighorn rivers",
        bestFor: "rest day",
        provider: "Fly Shop of the Bighorns",
      },
      {
        name: "Sheridan WYO Rodeo & Polo",
        type: "horseback",
        duration: "2-3 hours",
        pricePerPerson: [20, 60],
        groupFriendly: true,
        highlight:
          "Catch a rodeo or the famous Big Horn polo matches — peak Wyoming spectator sport",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [8, 20],
        hourlyRate: [90, 180],
        fullDayRate: [650, 1300],
        canDoGolfAndBars: true,
        providers: ["Sheridan Shuttle Service", "Bighorn Transportation"],
        notes:
          "Small-town options are limited — book a charter van ahead for airport, golf, and the Main Street bar crawl.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 150],
        providers: ["Take a Chef", "Cozymeal"],
        mealTypes: ["steak dinner", "Wyoming game", "breakfast"],
        notes:
          "A Wyoming-beef steak night at the rental is the move when downtown tables for 12+ are tight.",
      },
    ],
  },

  // ─── Prescott, AZ ──────────────────────────────────────────────────
  {
    id: "prescott-az",
    city: "Prescott",
    state: "AZ",
    region: "Southwest",
    tagline: "Mile-high pines and Whiskey Row, two hours from Phoenix",
    description:
      "Prescott sits a mile high in the pines — cooler than the desert, with a courthouse-square downtown anchored by the legendary Whiskey Row bars. Multiple public courses plus the upscale StoneRidge make it an easy, walkable buddy trip with serious nightlife for a small town.",
    population: "medium",
    nearestAirport: {
      code: "PHX",
      name: "Phoenix Sky Harbor International Airport",
      driveMinutes: 100,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "Fry's, Safeway, and Costco in town; liquor at Total Wine and grocery stores",
    courses: [
      {
        name: "StoneRidge Golf Course",
        tier: "premium",
        greenFeeRange: [60, 110],
        holes: 18,
        par: 72,
        yardage: 6762,
        walkable: false,
        style: "mountain",
        driveMinutes: 20,
        url: "https://www.stoneridgegolfaz.com",
        highlight:
          "Rated the best public course near Prescott — dramatic elevation changes through high-desert terrain",
        googleRating: 4.5,
        hypeTag: "LOCALS' FAVORITE",
      },
      {
        name: "Antelope Hills Golf Courses (North)",
        tier: "solid",
        greenFeeRange: [30, 65],
        holes: 18,
        par: 72,
        yardage: 6778,
        walkable: true,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.antelopehillsgolf.com",
        highlight:
          "Classic Lawrence-designed North course — mature, walkable, and a strong value with dynamic pricing",
        googleRating: 4.4,
        hypeTag: "BEST VALUE",
      },
      {
        name: "Antelope Hills Golf Courses (South)",
        tier: "solid",
        greenFeeRange: [30, 65],
        holes: 18,
        par: 72,
        yardage: 7014,
        walkable: false,
        style: "parkland",
        driveMinutes: 10,
        url: "https://www.antelopehillsgolf.com",
        highlight:
          "Longer Gary Panks design with more water and length than the North — great 36-hole day",
        googleRating: 4.4,
      },
      {
        name: "Prescott Lakes Golf Club",
        tier: "premium",
        greenFeeRange: [70, 120],
        holes: 18,
        par: 72,
        yardage: 7102,
        walkable: false,
        style: "mountain",
        driveMinutes: 8,
        url: "https://www.prescottlakes.com",
        highlight:
          "Hale Irwin design with granite outcroppings and pine-framed holes close to downtown",
        googleRating: 4.4,
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [350, 900],
        amenities: ["hot tub", "big kitchen", "fire pit", "deck", "pines"],
        areaDescription:
          "Downtown-adjacent Prescott or up in the pines toward Prescott Lakes",
        searchUrl:
          "https://www.vrbo.com/search?destination=Prescott%2C+AZ&groupSize=12",
        notes:
          "A downtown-walkable rental is gold here — you can stumble home from Whiskey Row. Cabins in the pines run a bit cheaper.",
        avgRating: 4.6,
      },
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [200, 400],
        amenities: ["pool", "spa", "on-site dining", "fitness center"],
        areaDescription:
          "Prescott Resort & Conference Center on the hill, or downtown hotels",
        searchUrl:
          "https://www.marriott.com/search/findHotels.mi?t=prescott+az",
        notes:
          "Block rooms downtown to stay walkable to the square, or the Prescott Resort for a casino-adjacent setup.",
        avgRating: 4.3,
      },
    ],
    dining: [
      {
        name: "The Palace Restaurant & Saloon",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Arizona's oldest bar (1877) on Whiskey Row — steaks and history under one roof",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "El Gato Azul",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Creekside tapas and creative plates — the dinner-out pick off the square",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Prescott Brewing Company",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Square-side brewpub that easily seats a big golf crew",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "Bill's Pizza",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Beloved downtown pizza joint — the low-key group dinner",
        reservationNeeded: false,
        googleRating: 4.6,
      },
    ],
    bars: [
      {
        name: "The Palace Saloon",
        vibe: "saloon",
        highlight:
          "1877 Whiskey Row institution with the original Brunswick bar — the anchor of any Prescott night",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
      {
        name: "Matt's Saloon",
        vibe: "honky-tonk",
        highlight:
          "Live-music honky-tonk on Whiskey Row where Waylon Jennings once played",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.4,
      },
      {
        name: "Whiskey Row Pub & Distillery",
        vibe: "whiskey-bar",
        highlight:
          "House-distilled spirits steps from the square — start the crawl here",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Hooligan's Pub",
        vibe: "sports-bar",
        highlight:
          "Off-square Irish sports pub for game day and late pours",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Watson Lake Kayaking",
        type: "kayaking",
        duration: "half day",
        pricePerPerson: [30, 70],
        groupFriendly: true,
        highlight:
          "Paddle among the surreal granite Dells boulders just north of town",
        bestFor: "rest day",
        provider: "Prescott Outdoors",
      },
      {
        name: "Prescott National Forest UTV Tour",
        type: "atv",
        duration: "half day",
        pricePerPerson: [120, 200],
        groupFriendly: true,
        highlight:
          "Off-road through the pines and high desert around Prescott",
        bestFor: "arrival day",
        provider: "AZ Snowbowl / local outfitters",
      },
      {
        name: "Bucky's Casino",
        type: "casino",
        duration: "2-3 hours",
        pricePerPerson: [0, 200],
        groupFriendly: true,
        highlight:
          "Tribal casino on the hill for a late-night blackjack and slots run",
        bestFor: "rest day",
        provider: "Yavapai-Prescott Tribe",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 24],
        hourlyRate: [110, 200],
        fullDayRate: [800, 1500],
        canDoGolfAndBars: true,
        providers: ["Prescott Limousine", "Mile High Party Bus", "Arizona Shuttle"],
        notes:
          "Whiskey Row is compact and walkable, but a van handles the PHX transfer and the spread-out courses. Book ahead.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 150],
        providers: ["Take a Chef", "Cozymeal", "Prescott Private Chefs"],
        mealTypes: ["steak dinner", "Southwest BBQ", "breakfast"],
        notes:
          "A chef night at a pines rental pairs perfectly with a Whiskey Row nightcap walk.",
      },
    ],
  },

  // ─── Wickenburg, AZ ────────────────────────────────────────────────
  {
    id: "wickenburg-az",
    city: "Wickenburg",
    state: "AZ",
    region: "Southwest",
    tagline: "Dude-ranch country golf an hour from Phoenix",
    description:
      "Wickenburg is old-West Arizona — dude ranches, a historic main street, and surprisingly excellent golf. Wickenburg Ranch is one of the best courses in the state, and Los Caballeros has a national reputation. A quieter, cheaper alternative to Scottsdale within easy reach of PHX.",
    population: "small",
    nearestAirport: {
      code: "PHX",
      name: "Phoenix Sky Harbor International Airport",
      driveMinutes: 75,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Safeway and Bashas' in town; liquor at the grocery stores",
    courses: [
      {
        name: "Wickenburg Ranch Golf & Social Club (Big Wick)",
        tier: "bucket-list",
        greenFeeRange: [95, 175],
        holes: 18,
        par: 72,
        yardage: 7048,
        walkable: false,
        style: "desert",
        driveMinutes: 10,
        url: "https://www.wickenburgranch.com",
        highlight:
          "A Wendell Pickett desert gem regarded as one of Arizona's best — a fraction of Scottsdale's green fees",
        googleRating: 4.7,
        hypeTag: "HIDDEN GEM",
      },
      {
        name: "Los Caballeros Golf Club",
        tier: "premium",
        greenFeeRange: [85, 160],
        holes: 18,
        par: 72,
        yardage: 6962,
        walkable: false,
        style: "desert",
        driveMinutes: 8,
        url: "https://www.loscaballerosgolf.com",
        highlight:
          "Greg Nash design and past Golfer's Choice U.S. Top 50 — tree-lined desert classic at the dude ranch",
        googleRating: 4.6,
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "Wickenburg Ranch (Li'l Wick par-3)",
        tier: "solid",
        greenFeeRange: [40, 75],
        holes: 9,
        par: 27,
        yardage: 1200,
        walkable: true,
        style: "desert",
        driveMinutes: 10,
        url: "https://www.wickenburgranch.com",
        highlight:
          "Nine-hole par-3 short course — perfect for an evening skins game and beers",
      },
    ],
    lodging: [
      {
        type: "ranch",
        sleeps: [10, 20],
        nightlyRange: [400, 1200],
        amenities: ["horseback", "pool", "on-site dining", "acreage", "spa"],
        areaDescription:
          "Rancho de los Caballeros or Flying E guest ranches outside town",
        searchUrl: "https://www.ranchodeloscaballeros.com",
        notes:
          "A dude ranch stay-and-play (Rancho de los Caballeros) is the signature Wickenburg trip — golf, horses, and meals onsite. Open seasonally Oct–May.",
        avgRating: 4.6,
      },
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [300, 800],
        amenities: ["pool", "hot tub", "big kitchen", "desert views"],
        areaDescription:
          "Homes in or near the Wickenburg Ranch community",
        searchUrl:
          "https://www.vrbo.com/search?destination=Wickenburg%2C+AZ&groupSize=12",
        notes:
          "Rentals inside Wickenburg Ranch put you steps from the course at a fraction of Scottsdale prices.",
        avgRating: 4.6,
      },
    ],
    dining: [
      {
        name: "Anita's Cocina",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Long-running downtown Mexican spot — the easy group dinner with strong margaritas",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "The Local Press Wickenburg",
        style: "casual",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Sandwiches, salads, and a deep beer list downtown",
        reservationNeeded: false,
        googleRating: 4.5,
      },
      {
        name: "Nana's Sandwich Saloon",
        style: "casual",
        priceRange: "$",
        capacity: "medium",
        highlight:
          "Quirky downtown lunch institution — fuel before the round",
        reservationNeeded: false,
        googleRating: 4.5,
      },
      {
        name: "The Dining Room at Rancho de los Caballeros",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Dude-ranch dining room serving Western fine dining (seasonal)",
        reservationNeeded: true,
      },
    ],
    bars: [
      {
        name: "The Saddle Bar (Wickenburg Ranch)",
        vibe: "patio",
        highlight:
          "Clubhouse bar and patio overlooking the course for post-round beers",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "The Local Press Bar",
        vibe: "cocktail",
        highlight:
          "Downtown craft-beer and cocktail spot — your in-town hangout",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
      {
        name: "Rancho Bar 7",
        vibe: "saloon",
        highlight:
          "Old-West main-street saloon vibe for a true Wickenburg nightcap",
        lateNight: true,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Horseback Trail Ride",
        type: "horseback",
        duration: "half day",
        pricePerPerson: [80, 150],
        groupFriendly: true,
        highlight:
          "Guided rides through saguaro desert from a historic dude ranch",
        bestFor: "arrival day",
        provider: "Rancho de los Caballeros",
      },
      {
        name: "Sonoran Desert ATV Tour",
        type: "atv",
        duration: "half day",
        pricePerPerson: [110, 200],
        groupFriendly: true,
        highlight:
          "Off-road through the Hassayampa River corridor and high desert",
        bestFor: "arrival day",
        provider: "BC Jeep Tours",
      },
      {
        name: "Hassayampa River Preserve Hike",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 15],
        groupFriendly: true,
        highlight:
          "Rare desert riparian preserve with cottonwood shade and birdlife",
        bestFor: "morning before golf",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 24],
        hourlyRate: [110, 200],
        fullDayRate: [800, 1500],
        canDoGolfAndBars: true,
        providers: ["Wickenburg Shuttle", "Phoenix Party Bus", "AZ Limo"],
        notes:
          "Most groups bring a van from Phoenix. The town and ranches are spread out, so plan transport for the PHX run and courses.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [80, 160],
        providers: ["Take a Chef", "Cozymeal"],
        mealTypes: ["steak dinner", "Southwest BBQ", "Dutch-oven cowboy cookout"],
        notes:
          "A cowboy-cookout-style chef night fits the dude-ranch theme. Restaurant options in town are limited for big groups.",
      },
    ],
  },

  // ─── Marana / Dove Mountain, AZ ────────────────────────────────────
  {
    id: "marana-az",
    city: "Marana",
    state: "AZ",
    region: "Southwest",
    tagline: "27 holes of Nicklaus tournament golf in the Tortolitas",
    description:
      "Marana, just northwest of Tucson, is home to the Golf Club at Dove Mountain — the Jack Nicklaus 27-hole layout that hosted the WGC Match Play. Tucked in the Tortolita foothills with the Ritz-Carlton on site, it's a resort-grade golf base that's quieter and cheaper than Scottsdale.",
    population: "medium",
    nearestAirport: {
      code: "TUS",
      name: "Tucson International Airport",
      driveMinutes: 45,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Fry's, Safeway, and Costco in Marana/Oro Valley; Total Wine nearby",
    courses: [
      {
        name: "The Golf Club at Dove Mountain (Saguaro/Tortolita)",
        tier: "bucket-list",
        greenFeeRange: [120, 250],
        holes: 18,
        par: 72,
        yardage: 7012,
        walkable: false,
        style: "desert",
        driveMinutes: 5,
        url: "https://www.clubsofdovemountain.com",
        highlight:
          "Jack Nicklaus 27-hole design in the Tortolitas that hosted the WGC Match Play — a true championship test",
        googleRating: 4.5,
        hypeTag: "TOURNAMENT HOST",
        rankNote: "Former WGC-Accenture Match Play host",
      },
      {
        name: "The Gallery Golf Club (South)",
        tier: "premium",
        greenFeeRange: [100, 195],
        holes: 18,
        par: 72,
        yardage: 7400,
        walkable: false,
        style: "desert",
        driveMinutes: 10,
        url: "https://www.gallerygolf.com",
        highlight:
          "John Fought–designed South course in the Tortolita foothills — a past Match Play host in its own right",
        googleRating: 4.6,
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "The Highlands at Dove Mountain",
        tier: "solid",
        greenFeeRange: [50, 95],
        holes: 18,
        par: 71,
        yardage: 6063,
        walkable: false,
        style: "desert",
        driveMinutes: 8,
        url: "https://www.clubsofdovemountain.com",
        highlight:
          "Shorter Fred Couples–signature desert layout — the fun value round in Dove Mountain",
        googleRating: 4.4,
        hypeTag: "BEST VALUE",
      },
      {
        name: "Heritage Highlands Golf Club",
        tier: "solid",
        greenFeeRange: [50, 90],
        holes: 18,
        par: 72,
        yardage: 6904,
        walkable: false,
        style: "desert",
        driveMinutes: 15,
        url: "https://www.heritagehighlandsgolfclub.com",
        highlight:
          "Arthur Hills desert design in nearby Marana with mountain views and strong conditioning",
        googleRating: 4.4,
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [300, 700],
        amenities: [
          "resort pool",
          "on-site golf",
          "spa",
          "multiple restaurants",
          "concierge",
        ],
        areaDescription:
          "The Ritz-Carlton Dove Mountain — block of rooms or villas on the course",
        searchUrl:
          "https://www.ritzcarlton.com/en/hotels/tusrz-the-ritz-carlton-dove-mountain",
        notes:
          "The Ritz on site makes for a self-contained golf weekend with the Nicklaus course out the door. Per-room rates spread across a group.",
        avgRating: 4.6,
      },
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [350, 900],
        amenities: ["pool", "hot tub", "big kitchen", "mountain views"],
        areaDescription:
          "Dove Mountain or Oro Valley rental homes near the courses",
        searchUrl:
          "https://www.vrbo.com/search?destination=Marana%2C+AZ&groupSize=12",
        notes:
          "Rental homes in Dove Mountain and Oro Valley run well below comparable Scottsdale properties.",
        avgRating: 4.6,
      },
    ],
    dining: [
      {
        name: "CORE Kitchen & Wine Bar",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "The Ritz-Carlton's flagship — Southwest fine dining with desert views",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Tohono Chul Garden Bistro",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Botanical-garden dining nearby for a scenic Southwest meal",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "El Charro Café (Oro Valley)",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "America's oldest family-run Mexican restaurant — carne seca and big group tables",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "Brother John's Beer, Bourbon & BBQ (Marana area)",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Smoked meats, bourbon, and a deep tap list — easy crew dinner",
        reservationNeeded: false,
        googleRating: 4.4,
      },
    ],
    bars: [
      {
        name: "Cayton's Burger Bistro (Ritz)",
        vibe: "patio",
        highlight:
          "Resort patio bar overlooking the Nicklaus course for post-round beers",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.4,
      },
      {
        name: "Tucson Hop Shop / Oro Valley taprooms",
        vibe: "brewpub",
        highlight:
          "Craft taproom scene in nearby Oro Valley for a low-key beer run",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Casino Del Sol Bars (Pascua Yaqui)",
        vibe: "casino-bar",
        highlight:
          "Tribal-casino bars and lounges 30 minutes south for a Vegas-lite night",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Tortolita Mountains UTV Tour",
        type: "atv",
        duration: "half day",
        pricePerPerson: [120, 220],
        groupFriendly: true,
        highlight:
          "Off-road through saguaro forest in the Tortolitas behind Dove Mountain",
        bestFor: "arrival day",
        provider: "Sonoran Desert Tours",
      },
      {
        name: "Saguaro National Park Hike",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 25],
        groupFriendly: true,
        highlight:
          "Iconic saguaro-forest trails minutes away — easy morning before golf",
        bestFor: "morning before golf",
      },
      {
        name: "Casino Del Sol Gaming",
        type: "casino",
        duration: "2-3 hours",
        pricePerPerson: [0, 200],
        groupFriendly: true,
        highlight:
          "Full tribal casino with tables, slots, and a sportsbook south of town",
        bestFor: "rest day",
        provider: "Pascua Yaqui Tribe",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [10, 24],
        hourlyRate: [110, 220],
        fullDayRate: [800, 1600],
        canDoGolfAndBars: true,
        providers: ["Tucson Party Bus", "Arizona Stagecoach", "AZ Limo"],
        notes:
          "Book a Tucson-based van for the TUS transfer plus golf and any casino/bar runs. Dove Mountain is self-contained for golf.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [80, 175],
        providers: ["Take a Chef", "Cozymeal", "Tucson Private Chefs"],
        mealTypes: ["steak dinner", "Sonoran BBQ", "Mexican fiesta"],
        notes:
          "An in-home chef at a Dove Mountain rental keeps a big group out of the resort dining lines.",
      },
    ],
  },

  // ─── Tubac, AZ ─────────────────────────────────────────────────────
  {
    id: "tubac-az",
    city: "Tubac",
    state: "AZ",
    region: "Southwest",
    tagline: "Play the Tin Cup course in an artists' village south of Tucson",
    description:
      "Tubac is a tiny artists' colony in the high desert south of Tucson, built around the 27-hole Tubac Golf Resort — the course where Tin Cup was filmed. Mild winter temps, a self-contained resort, and a quirky gallery village make it a relaxed, off-the-beaten-path golf weekend.",
    population: "tiny",
    nearestAirport: {
      code: "TUS",
      name: "Tucson International Airport",
      driveMinutes: 50,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Small markets in Tubac; bigger grocery and liquor runs in Green Valley 15 min north",
    courses: [
      {
        name: "Tubac Golf Resort & Spa (Rancho/Anza)",
        tier: "premium",
        greenFeeRange: [69, 120],
        holes: 18,
        par: 71,
        yardage: 6870,
        walkable: false,
        style: "resort",
        driveMinutes: 2,
        url: "https://troon.com/course/tubac-golf-resort-and-spa",
        highlight:
          "Robert 'Red' Lawrence design (1959) and the filming location for Tin Cup — cottonwood-lined and history-soaked",
        googleRating: 4.5,
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "Tubac Golf Resort & Spa (Otero nine)",
        tier: "solid",
        greenFeeRange: [50, 90],
        holes: 9,
        par: 36,
        yardage: 3200,
        walkable: true,
        style: "resort",
        driveMinutes: 2,
        url: "https://troon.com/course/tubac-golf-resort-and-spa",
        highlight:
          "The third nine for an easy 27-hole day or a relaxed afternoon loop",
      },
      {
        name: "Canoa Ranch Golf Club",
        tier: "solid",
        greenFeeRange: [40, 80],
        holes: 18,
        par: 72,
        yardage: 6610,
        walkable: false,
        style: "desert",
        driveMinutes: 15,
        url: "https://www.canoaranchgolf.com",
        highlight:
          "Green Valley desert course with Santa Rita Mountain views — the value second round",
        googleRating: 4.3,
        hypeTag: "BEST VALUE",
      },
    ],
    lodging: [
      {
        type: "resort-house",
        sleeps: [8, 16],
        nightlyRange: [250, 550],
        amenities: [
          "resort pool",
          "on-site golf",
          "spa",
          "on-site dining",
          "casitas",
        ],
        areaDescription:
          "Tubac Golf Resort casitas and suites right on the course",
        searchUrl: "https://www.tubacgolfresort.com",
        notes:
          "Staying on-resort makes Tubac a self-contained, low-logistics trip — golf, spa, and meals all on one property.",
        avgRating: 4.5,
      },
      {
        type: "house",
        sleeps: [6, 12],
        nightlyRange: [250, 700],
        amenities: ["pool", "hot tub", "patio", "desert views"],
        areaDescription:
          "Rental homes in Tubac village or nearby Green Valley",
        searchUrl:
          "https://www.vrbo.com/search?destination=Tubac%2C+AZ&groupSize=10",
        notes:
          "Limited home inventory in tiny Tubac — Green Valley adds options 15 minutes north.",
        avgRating: 4.5,
      },
    ],
    dining: [
      {
        name: "Stables Ranch Grille (Tubac Resort)",
        style: "upscale",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "The resort's flagship — steaks and Southwest plates in a historic stable building",
        reservationNeeded: true,
        googleRating: 4.4,
      },
      {
        name: "Elvira's",
        style: "mexican",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Upscale Sonoran cuisine known for its mole flights — a destination dinner in the village",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Wisdom's Café (Tumacácori)",
        style: "mexican",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Family-run roadside institution famous for fruit burros — a only-in-Tubac stop",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "Tubac Jack's Saloon & Grill",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Village bar-and-grill with burgers and a patio — the easy group default",
        reservationNeeded: false,
        googleRating: 4.3,
      },
    ],
    bars: [
      {
        name: "Tubac Jack's Saloon",
        vibe: "saloon",
        highlight:
          "The village's main watering hole — live music and a desert patio",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.3,
      },
      {
        name: "Stables Bar (Tubac Resort)",
        vibe: "patio",
        highlight:
          "Resort bar with a course-side patio for post-round drinks",
        lateNight: false,
        walkableFromDowntown: false,
      },
      {
        name: "Italian Peasant Wine Bar",
        vibe: "cocktail",
        highlight:
          "Small village wine bar for a quieter evening among the galleries",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Tubac Art Gallery Walk",
        type: "winery",
        duration: "2-3 hours",
        pricePerPerson: [0, 50],
        groupFriendly: true,
        highlight:
          "Stroll the village's 80+ galleries and tasting rooms between rounds",
        bestFor: "rest day",
      },
      {
        name: "Santa Cruz River & Anza Trail Hike",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 15],
        groupFriendly: true,
        highlight:
          "Shaded riverside trail past the historic Tumacácori mission",
        bestFor: "morning before golf",
      },
      {
        name: "Sonoita Wine Country Tour",
        type: "winery",
        duration: "half day",
        pricePerPerson: [60, 120],
        groupFriendly: true,
        highlight:
          "Arizona wine country tasting loop 45 minutes east in Sonoita/Elgin",
        bestFor: "rest day",
        provider: "Local wine-tour operators",
      },
    ],
    partyBuses: [
      {
        type: "sprinter-van",
        capacity: [8, 20],
        hourlyRate: [110, 200],
        fullDayRate: [800, 1500],
        canDoGolfAndBars: true,
        providers: ["Tucson Party Bus", "Arizona Stagecoach"],
        notes:
          "Bring a Tucson van for the TUS transfer and any Sonoita wine-country day. The village itself is walkable.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [80, 160],
        providers: ["Take a Chef", "Cozymeal"],
        mealTypes: ["steak dinner", "Sonoran Mexican", "breakfast"],
        notes:
          "With limited big-group dining in tiny Tubac, an in-home or casita chef night is a smart play.",
      },
    ],
  },

  // ─── Pinetop-Lakeside, AZ ──────────────────────────────────────────
  {
    id: "pinetop-lakeside-az",
    city: "Pinetop-Lakeside",
    state: "AZ",
    region: "Southwest",
    tagline: "Cool White Mountains pines — Arizona's summer golf escape",
    description:
      "When the desert hits 110, Phoenix golfers escape up to the White Mountains. Pinetop-Lakeside and neighboring Show Low sit at 7,000 feet in tall ponderosa pines, with a cluster of strong public courses led by Silver Creek. It's a cool, green, low-key summer buddy trip.",
    population: "small",
    nearestAirport: {
      code: "PHX",
      name: "Phoenix Sky Harbor International Airport",
      driveMinutes: 180,
    },
    bestSeasons: ["summer", "fall"],
    groceryNotes:
      "Safeway and Walmart in Show Low/Lakeside; liquor at grocery stores",
    courses: [
      {
        name: "Silver Creek Golf Club",
        tier: "premium",
        greenFeeRange: [50, 95],
        holes: 18,
        par: 71,
        yardage: 6813,
        walkable: false,
        style: "mountain",
        driveMinutes: 20,
        url: "https://www.silvercreekgolfclub.org",
        highlight:
          "Gary Panks design in Show Low routinely rated among Arizona's best public values — pines and high-desert holes",
        googleRating: 4.6,
        hypeTag: "BEST VALUE",
      },
      {
        name: "Pinetop Lakes Golf & Country Club",
        tier: "solid",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 63,
        yardage: 4558,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.pinetoplakesgolf.com",
        highlight:
          "Top-rated executive/short course tucked in the pines — a fun, walkable round for the crew",
        googleRating: 4.4,
      },
      {
        name: "Bison Golf Club",
        tier: "solid",
        greenFeeRange: [40, 75],
        holes: 18,
        par: 71,
        yardage: 6400,
        walkable: true,
        style: "mountain",
        driveMinutes: 18,
        url: "https://www.bisongolf.net",
        highlight:
          "Show Low public course winding through ponderosa pines — friendly and walkable",
        googleRating: 4.3,
      },
      {
        name: "Torreon Golf Club (Cabin)",
        tier: "premium",
        greenFeeRange: [70, 130],
        holes: 18,
        par: 72,
        yardage: 7044,
        walkable: false,
        style: "mountain",
        driveMinutes: 15,
        url: "https://www.torreongolf.com",
        highlight:
          "Upscale Show Low mountain layout through tall pines and meadows — the splurge round",
        googleRating: 4.6,
        hypeTag: "DESIGNER CLASSIC",
      },
    ],
    lodging: [
      {
        type: "cabin",
        sleeps: [8, 16],
        nightlyRange: [300, 900],
        amenities: ["hot tub", "fireplace", "big kitchen", "deck", "pines", "game room"],
        areaDescription:
          "Pinetop-Lakeside and Show Low cabins set in the ponderosa pines",
        searchUrl:
          "https://www.vrbo.com/search?destination=Pinetop-Lakeside%2C+AZ&groupSize=12",
        notes:
          "Big pine cabins with decks and hot tubs are the classic White Mountains rental — cool nights and easy course access.",
        avgRating: 4.7,
      },
      {
        type: "lodge",
        sleeps: [10, 16],
        nightlyRange: [200, 450],
        amenities: ["pool", "on-site dining", "fire pit", "fishing nearby"],
        areaDescription:
          "Mountain lodges and the Torreon community in Show Low",
        searchUrl:
          "https://www.vrbo.com/search?destination=Show+Low%2C+AZ&groupSize=12",
        notes:
          "Lodges and Torreon rentals add resort amenities to the pines setting.",
        avgRating: 4.5,
      },
    ],
    dining: [
      {
        name: "Charlie Clark's Steakhouse",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "White Mountains institution since 1938 — steaks and prime rib that handle a big crew",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Darbi's Café",
        style: "casual",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Beloved breakfast-and-lunch spot for fueling before the round",
        reservationNeeded: false,
        googleRating: 4.6,
      },
      {
        name: "The Cabin (Pinetop)",
        style: "bbq",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Smoked meats and a roadhouse vibe — easy group dinner",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "Lotus Garden Asian Bistro",
        style: "sushi",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Surprisingly good mountain-town sushi and Asian fare for a change of pace",
        reservationNeeded: false,
        googleRating: 4.3,
      },
    ],
    bars: [
      {
        name: "Mor Mor Bistro & Bar",
        vibe: "cocktail",
        highlight:
          "Pinetop's upscale bar-and-bistro for cocktails and a relaxed night",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.5,
      },
      {
        name: "Lazy Y Bar",
        vibe: "dive",
        highlight:
          "Classic mountain-town dive — pool, cheap beer, and locals",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "THAT Brewery (Pinetop)",
        vibe: "brewpub",
        highlight:
          "Local brewery taproom with house beer and a patio in the pines",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.5,
      },
    ],
    activities: [
      {
        name: "White Mountains UTV / ATV Tour",
        type: "atv",
        duration: "half day",
        pricePerPerson: [120, 220],
        groupFriendly: true,
        highlight:
          "Ride hundreds of miles of forest roads and trails through the high pines",
        bestFor: "arrival day",
        provider: "White Mountain Powersports rentals",
      },
      {
        name: "Trout Fishing the Mountain Lakes",
        type: "fishing",
        duration: "half day",
        pricePerPerson: [40, 150],
        groupFriendly: true,
        highlight:
          "Stocked-trout lakes (Rainbow, Woodland, Show Low) right in town",
        bestFor: "rest day",
        provider: "Local outfitters",
      },
      {
        name: "Hon-Dah Casino",
        type: "casino",
        duration: "2-3 hours",
        pricePerPerson: [0, 200],
        groupFriendly: true,
        highlight:
          "White Mountain Apache casino for slots, tables, and live music",
        bestFor: "rest day",
        provider: "White Mountain Apache Tribe",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [8, 20],
        hourlyRate: [110, 200],
        fullDayRate: [800, 1500],
        canDoGolfAndBars: true,
        providers: ["White Mountain Shuttle", "Phoenix Party Bus"],
        notes:
          "It's a 3-hour drive from PHX, so most crews self-drive or rent SUVs. A local shuttle can handle the casino-and-bar nights.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 150],
        providers: ["Take a Chef", "Cozymeal"],
        mealTypes: ["steak dinner", "trout fry", "BBQ cookout"],
        notes:
          "A cabin steak-or-trout night with a chef is the move when you've got a big pine-cabin kitchen.",
      },
    ],
  },

  // ─── Moab, UT ──────────────────────────────────────────────────────
  {
    id: "moab-ut",
    city: "Moab",
    state: "UT",
    region: "Southwest",
    tagline: "Red-rock golf between Arches and the Colorado River",
    description:
      "Moab is the adventure capital of the Southwest — Arches and Canyonlands out the door, world-class mountain biking, and Colorado River rafting. The one course, Moab Golf Club, plays against jaw-dropping red sandstone cliffs, making this a golf-plus-adventure trip unlike anywhere else.",
    population: "small",
    nearestAirport: {
      code: "GJT",
      name: "Grand Junction Regional Airport",
      driveMinutes: 110,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "City Market in town; Utah liquor laws mean spirits come from the state liquor store — beer at grocery",
    courses: [
      {
        name: "Moab Golf Club",
        tier: "solid",
        greenFeeRange: [50, 80],
        holes: 18,
        par: 72,
        yardage: 6819,
        walkable: true,
        style: "desert",
        driveMinutes: 8,
        url: "https://moabgolfcourse.com",
        highlight:
          "An 18-hole public course framed by red sandstone cliffs — among the most scenic value rounds in the Southwest",
        googleRating: 4.5,
        hypeTag: "HIDDEN GEM",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [350, 1000],
        amenities: ["pool", "hot tub", "big kitchen", "red-rock views", "patio"],
        areaDescription:
          "Moab neighborhoods or Spanish Valley homes near the course and parks",
        searchUrl:
          "https://www.vrbo.com/search?destination=Moab%2C+UT&groupSize=12",
        notes:
          "Book early — Moab rentals sell out in spring and fall. A home with a pool and red-rock views is the play.",
        avgRating: 4.6,
      },
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [200, 450],
        amenities: ["pool", "hot tub", "on-site dining", "shuttle"],
        areaDescription:
          "Moab resort-style properties (Hoodoo, Sorrel River area) and hotel blocks",
        searchUrl:
          "https://www.marriott.com/search/findHotels.mi?t=moab+ut",
        notes:
          "Resort blocks near downtown simplify logistics if you'd rather not cook.",
        avgRating: 4.4,
      },
    ],
    dining: [
      {
        name: "Desert Bistro",
        style: "upscale",
        priceRange: "$$$$",
        capacity: "medium",
        highlight:
          "Moab's fine-dining standout doing wild game and Southwest plates",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Moab Brewery",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "The town's big brewpub — beers, burgers, and room for the whole crew",
        reservationNeeded: false,
        googleRating: 4.3,
      },
      {
        name: "Antica Forma",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Wood-fired pizza and pasta — the easy post-adventure group dinner",
        reservationNeeded: false,
        googleRating: 4.6,
      },
      {
        name: "Zax",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Downtown pizza-and-pub with a big all-you-can-eat option for hungry crews",
        reservationNeeded: false,
        googleRating: 4.2,
      },
    ],
    bars: [
      {
        name: "Moab Brewery Bar",
        vibe: "brewpub",
        highlight:
          "House-brewed beer and a buzzy après-adventure crowd downtown",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.3,
      },
      {
        name: "Woody's Tavern",
        vibe: "dive",
        highlight:
          "Moab's classic dive with live music and a back patio — the late-night spot",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.4,
      },
      {
        name: "The Blu Pig",
        vibe: "patio",
        highlight:
          "BBQ-and-blues bar with a patio and live music downtown",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.3,
      },
    ],
    activities: [
      {
        name: "Colorado River Whitewater Rafting",
        type: "rafting",
        duration: "full day",
        pricePerPerson: [80, 180],
        groupFriendly: true,
        highlight:
          "Big-water rafting through Westwater or Fisher Towers canyons — the signature Moab day",
        bestFor: "rest day",
        provider: "Western River Expeditions",
      },
      {
        name: "Hell's Revenge 4x4 / UTV Tour",
        type: "atv",
        duration: "half day",
        pricePerPerson: [100, 200],
        groupFriendly: true,
        highlight:
          "Iconic slickrock off-road trail with heart-in-throat climbs and drops",
        bestFor: "arrival day",
        provider: "Moab Adventure Center",
      },
      {
        name: "Arches National Park Tour",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [0, 40],
        groupFriendly: true,
        highlight:
          "Delicate Arch and the windows section minutes from town — bucket-list scenery",
        bestFor: "morning before golf",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 24],
        hourlyRate: [100, 200],
        fullDayRate: [800, 1500],
        canDoGolfAndBars: true,
        providers: ["Moab Luxury Coach", "Roadrunner Shuttle", "Coyote Shuttle"],
        notes:
          "Local shuttles serve adventure trailheads and airports (GJT/Canyonlands). Charter one for golf-and-bar nights.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [80, 160],
        providers: ["Take a Chef", "Moab Private Chefs"],
        mealTypes: ["steak dinner", "Southwest BBQ", "Dutch-oven cookout"],
        notes:
          "A Dutch-oven or steak night at the rental is perfect after a day on the river or trail.",
      },
    ],
  },

  // ─── Cedar City, UT ────────────────────────────────────────────────
  {
    id: "cedar-city-ut",
    city: "Cedar City",
    state: "UT",
    region: "Southwest",
    tagline: "Affordable red-cliff golf and the gateway to Zion country",
    description:
      "Cedar City is a sneaky-good, sneaky-cheap Southern Utah base — red-cliff golf at the city course, the famous Black Desert Resort nearby, and Zion, Bryce, and Cedar Breaks all within an hour. Add the Utah Shakespeare Festival downtown and it's an unexpectedly fun, low-cost trip.",
    population: "small",
    nearestAirport: {
      code: "SGU",
      name: "St. George Regional Airport",
      driveMinutes: 60,
    },
    bestSeasons: ["spring", "summer", "fall"],
    groceryNotes:
      "Smith's and Walmart in town; spirits at the Utah state liquor store, beer at grocery",
    courses: [
      {
        name: "Cedar Ridge Golf Course",
        tier: "solid",
        greenFeeRange: [28, 50],
        holes: 18,
        par: 73,
        yardage: 6750,
        walkable: true,
        style: "desert",
        driveMinutes: 8,
        url: "https://golfcedarridge.com",
        highlight:
          "City-run course against the red hills with five par-5s — one of the best golf values in the West",
        googleRating: 4.4,
        hypeTag: "BEST VALUE",
      },
      {
        name: "Black Desert Resort (Ivins)",
        tier: "bucket-list",
        greenFeeRange: [195, 350],
        holes: 18,
        par: 72,
        yardage: 7371,
        walkable: false,
        style: "desert",
        driveMinutes: 55,
        url: "https://www.blackdesertresort.com",
        highlight:
          "Tom Weiskopf design through black lava fields hosting the PGA Tour's Black Desert Championship",
        googleRating: 4.7,
        hypeTag: "TOURNAMENT HOST",
        rankNote: "PGA Tour host — Black Desert Championship",
      },
      {
        name: "Coral Canyon Golf Course (Washington)",
        tier: "premium",
        greenFeeRange: [80, 160],
        holes: 18,
        par: 72,
        yardage: 7146,
        walkable: false,
        style: "desert",
        driveMinutes: 50,
        url: "https://www.golfcoralcanyon.com",
        highlight:
          "Keith Foster red-rock layout at the doorstep of Zion — a longtime Southern Utah favorite",
        googleRating: 4.6,
        hypeTag: "TOP 100 PUBLIC",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [250, 700],
        amenities: ["hot tub", "big kitchen", "patio", "red-cliff views"],
        areaDescription:
          "Cedar City neighborhoods near downtown and the city course",
        searchUrl:
          "https://www.vrbo.com/search?destination=Cedar+City%2C+UT&groupSize=12",
        notes:
          "Rentals here are among the cheapest in Southern Utah and put you central to Zion, Bryce, and the courses.",
        avgRating: 4.6,
      },
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [150, 350],
        amenities: ["pool", "breakfast", "fitness center"],
        areaDescription:
          "Cedar City hotel block near I-15 and downtown",
        searchUrl:
          "https://www.marriott.com/search/findHotels.mi?t=cedar+city+ut",
        notes:
          "Block rooms downtown to walk to the Shakespeare Festival and dinner spots.",
        avgRating: 4.3,
      },
    ],
    dining: [
      {
        name: "Centro Woodfired Pizzeria",
        style: "italian",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Downtown wood-fired pizza standout — the easy group dinner",
        reservationNeeded: false,
        googleRating: 4.6,
      },
      {
        name: "The Pizza Cart",
        style: "italian",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Cult-favorite wood-fired pies in a casual setting",
        reservationNeeded: false,
        googleRating: 4.6,
      },
      {
        name: "Chef Alfredo Ristorante Italiano",
        style: "italian",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Sit-down Italian for the nicer dinner-out night",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Brick & Cleaver",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Steaks and burgers with a solid bar — handles a hungry foursome of foursomes",
        reservationNeeded: false,
        googleRating: 4.4,
      },
    ],
    bars: [
      {
        name: "Policy Kings Brewery",
        vibe: "brewpub",
        highlight:
          "Downtown craft brewery and taproom — the local hangout",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
      {
        name: "IG Winery & Tasting Room",
        vibe: "cocktail",
        highlight:
          "Downtown wine bar for a quieter night before the round",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.6,
      },
      {
        name: "The Grind Coffeehouse & Bar",
        vibe: "patio",
        highlight:
          "Casual downtown spot that turns into an evening hangout",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Zion National Park Day Trip",
        type: "hiking",
        duration: "full day",
        pricePerPerson: [0, 50],
        groupFriendly: true,
        highlight:
          "Angels Landing and the Narrows under an hour away — a world-class rest-day adventure",
        bestFor: "rest day",
      },
      {
        name: "Cedar Breaks & Brian Head UTV Tour",
        type: "atv",
        duration: "half day",
        pricePerPerson: [120, 220],
        groupFriendly: true,
        highlight:
          "Off-road the high plateau around Cedar Breaks National Monument",
        bestFor: "arrival day",
        provider: "Thunder Mountain Motorsports",
      },
      {
        name: "Utah Shakespeare Festival",
        type: "winery",
        duration: "2-3 hours",
        pricePerPerson: [25, 80],
        groupFriendly: true,
        highlight:
          "Tony Award–winning festival downtown — a only-in-Cedar-City evening (summer/fall)",
        bestFor: "rest day",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [8, 20],
        hourlyRate: [90, 180],
        fullDayRate: [700, 1400],
        canDoGolfAndBars: true,
        providers: ["St. George Shuttle", "Southern Utah Transportation"],
        notes:
          "St. George–based shuttles cover SGU airport runs and can be chartered for the Zion day or golf loops.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 140],
        providers: ["Take a Chef", "Cozymeal"],
        mealTypes: ["steak dinner", "BBQ cookout", "breakfast"],
        notes:
          "An in-home chef at a Cedar City rental is a cheap luxury given the low lodging costs here.",
      },
    ],
  },

  // ─── Boulder City, NV ──────────────────────────────────────────────
  {
    id: "boulder-city-nv",
    city: "Boulder City",
    state: "NV",
    region: "Southwest",
    tagline: "Lake Mead golf 30 minutes from the Strip, minus the chaos",
    description:
      "Boulder City is the small, casino-free town built for Hoover Dam workers, perched above Lake Mead just 30 minutes from Las Vegas. Strong public golf at Boulder Creek and the historic 1936 city course, a charming old downtown, and easy Strip access make it a calmer base with Vegas on tap.",
    population: "small",
    nearestAirport: {
      code: "LAS",
      name: "Harry Reid International Airport",
      driveMinutes: 30,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Albertsons and Smith's in town; liquor at grocery and Total Wine in nearby Henderson",
    courses: [
      {
        name: "Boulder Creek Golf Club",
        tier: "premium",
        greenFeeRange: [60, 110],
        holes: 27,
        par: 72,
        yardage: 7563,
        walkable: false,
        style: "desert",
        driveMinutes: 10,
        url: "https://www.bouldercreekgc.com",
        highlight:
          "27 holes (Desert Hawk, Coyote Run, Eldorado Valley) of well-conditioned desert golf with mountain views",
        googleRating: 4.5,
        hypeTag: "LOCALS' FAVORITE",
      },
      {
        name: "Boulder City Golf Course",
        tier: "solid",
        greenFeeRange: [40, 75],
        holes: 18,
        par: 72,
        yardage: 6561,
        walkable: true,
        style: "parkland",
        driveMinutes: 5,
        url: "https://www.bouldercitygolf.com",
        highlight:
          "Affordable, walkable city course operating since 1936 with wide fairways and two lakes",
        googleRating: 4.3,
        hypeTag: "BEST VALUE",
      },
      {
        name: "Cascata Golf Club (Henderson)",
        tier: "bucket-list",
        greenFeeRange: [225, 400],
        holes: 18,
        par: 72,
        yardage: 7137,
        walkable: false,
        style: "mountain",
        driveMinutes: 20,
        url: "https://www.cascatagolf.com",
        highlight:
          "Rees Jones desert-mountain showpiece with a waterfall through the clubhouse — the splurge round",
        googleRating: 4.7,
        hypeTag: "TOP 100 PUBLIC",
      },
      {
        name: "Reflection Bay Golf Club (Lake Las Vegas)",
        tier: "premium",
        greenFeeRange: [120, 250],
        holes: 18,
        par: 72,
        yardage: 7261,
        walkable: false,
        style: "desert",
        driveMinutes: 20,
        url: "https://www.reflectionbaygolf.com",
        highlight:
          "Jack Nicklaus design with lakeside holes on Lake Las Vegas — resort golf without Strip prices",
        googleRating: 4.5,
        hypeTag: "DESIGNER CLASSIC",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [300, 900],
        amenities: ["pool", "hot tub", "big kitchen", "lake/mountain views", "patio"],
        areaDescription:
          "Boulder City homes near downtown or out toward Lake Mead",
        searchUrl:
          "https://www.vrbo.com/search?destination=Boulder+City%2C+NV&groupSize=12",
        notes:
          "A Boulder City rental keeps you calm and close to golf and the lake, with the Strip a quick drive when you want it.",
        avgRating: 4.6,
      },
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [250, 600],
        amenities: ["resort pool", "spa", "on-site dining", "lake views"],
        areaDescription:
          "Lake Las Vegas resort properties (Westin, Hilton) 20 minutes away",
        searchUrl:
          "https://www.marriott.com/search/findHotels.mi?t=lake+las+vegas",
        notes:
          "Lake Las Vegas resorts offer a Mediterranean-village setting with golf and dining, between Boulder City and Henderson.",
        avgRating: 4.4,
      },
    ],
    dining: [
      {
        name: "Milo's Cellar & Inn",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Downtown wine bar and bistro with a sidewalk patio — the dinner-out pick",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "The Dillinger Food & Drinkery",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Gastropub burgers and a big beer list in historic downtown",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "Forge Social House",
        style: "casual",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Roomy downtown spot for pub fare and group tables",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "Southwest Diner",
        style: "casual",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Hearty breakfast to fuel up before tee time",
        reservationNeeded: false,
        googleRating: 4.5,
      },
    ],
    bars: [
      {
        name: "Boulder Dam Brewing Co.",
        vibe: "brewpub",
        highlight:
          "Downtown brewery and beer garden — the social hub of Boulder City",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
      {
        name: "The Tap (Dillinger)",
        vibe: "sports-bar",
        highlight:
          "Gastropub bar with games on and a deep tap list downtown",
        lateNight: true,
        walkableFromDowntown: true,
      },
      {
        name: "Las Vegas Strip (30 min)",
        vibe: "casino-bar",
        highlight:
          "The full Vegas nightlife arsenal is a short van ride away when you want the big night",
        lateNight: true,
        walkableFromDowntown: false,
      },
    ],
    activities: [
      {
        name: "Lake Mead Boat Rental",
        type: "boat-rental",
        duration: "half day",
        pricePerPerson: [60, 150],
        groupFriendly: true,
        highlight:
          "Rent a pontoon or powerboat on the country's largest reservoir for a cooler day on the water",
        bestFor: "rest day",
        provider: "Lake Mead Mohave Adventures",
      },
      {
        name: "Hoover Dam Tour",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [15, 45],
        groupFriendly: true,
        highlight:
          "Tour one of the great engineering feats of the 20th century, minutes from town",
        bestFor: "morning before golf",
      },
      {
        name: "Black Canyon Kayak Tour",
        type: "kayaking",
        duration: "full day",
        pricePerPerson: [150, 250],
        groupFriendly: true,
        highlight:
          "Paddle the Colorado below Hoover Dam past hot springs and slot canyons",
        bestFor: "rest day",
        provider: "Evolution Expeditions",
      },
    ],
    partyBuses: [
      {
        type: "party-bus",
        capacity: [14, 40],
        hourlyRate: [150, 350],
        fullDayRate: [1200, 2800],
        canDoGolfAndBars: true,
        providers: ["Las Vegas Party Bus", "Presidential Limousine", "AWG Ambassador"],
        notes:
          "Vegas has limitless party-bus inventory — book one for the Strip night and golf shuttle. Plenty of golf-and-bars packages.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [80, 175],
        providers: ["Take a Chef", "Cozymeal", "Las Vegas Private Chefs"],
        mealTypes: ["steak dinner", "Southwest BBQ", "breakfast spread"],
        notes:
          "Tap the deep Vegas private-chef market for a steak night at the rental before or after a Strip outing.",
      },
    ],
  },

  // ─── Taos, NM ──────────────────────────────────────────────────────
  {
    id: "taos-nm",
    city: "Taos",
    state: "NM",
    region: "Southwest",
    tagline: "High-desert golf, adobe art town, and Angel Fire alpine holes",
    description:
      "Taos pairs a centuries-old adobe arts town with high-desert and alpine golf. The 7,300-yard Taos Country Club plays through sagebrush and arroyos, while Angel Fire offers PGA-championship golf at 8,600 feet up the road. Add Rio Grande rafting and a famous plaza bar scene for a distinctive New Mexico trip.",
    population: "small",
    nearestAirport: {
      code: "SAF",
      name: "Santa Fe Regional Airport",
      driveMinutes: 90,
    },
    bestSeasons: ["summer", "fall"],
    groceryNotes:
      "Smith's and Albertsons in town; liquor at grocery and downtown stores",
    courses: [
      {
        name: "Taos Country Club",
        tier: "premium",
        greenFeeRange: [60, 110],
        holes: 18,
        par: 72,
        yardage: 7302,
        walkable: true,
        style: "desert",
        driveMinutes: 10,
        url: "https://www.taoscountryclub.com",
        highlight:
          "Jep Wille high-desert design through sagebrush and arroyos with Sangre de Cristo views — a Golf Digest 4-star",
        googleRating: 4.5,
        hypeTag: "LOCALS' FAVORITE",
      },
      {
        name: "Angel Fire Resort Golf Course",
        tier: "premium",
        greenFeeRange: [70, 130],
        holes: 18,
        par: 72,
        yardage: 6624,
        walkable: false,
        style: "mountain",
        driveMinutes: 35,
        url: "https://www.angelfireresort.com",
        highlight:
          "One of the highest championship courses in the U.S. at 8,600 feet — aspen canyons and links-style back nine",
        googleRating: 4.4,
        hypeTag: "DESIGNER CLASSIC",
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [300, 900],
        amenities: ["hot tub", "kiva fireplace", "big kitchen", "mountain views", "patio"],
        areaDescription:
          "Adobe homes near Taos Plaza or out toward the country club",
        searchUrl:
          "https://www.vrbo.com/search?destination=Taos%2C+NM&groupSize=12",
        notes:
          "A plaza-adjacent adobe puts you walking distance to the bars and galleries. Bigger homes sit out toward the mesa.",
        avgRating: 4.6,
      },
      {
        type: "lodge",
        sleeps: [10, 16],
        nightlyRange: [200, 450],
        amenities: ["pool", "on-site dining", "spa", "ski/golf base"],
        areaDescription:
          "Angel Fire Resort lodging up the road for a golf-and-mountain base",
        searchUrl: "https://www.angelfireresort.com/lodging",
        notes:
          "Angel Fire Resort offers an all-in-one base with golf, dining, and summer mountain activities.",
        avgRating: 4.3,
      },
    ],
    dining: [
      {
        name: "Lambert's of Taos",
        style: "upscale",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Taos's long-standing fine-dining favorite in a historic adobe",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Doc Martin's (Taos Inn)",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Historic-inn restaurant doing New Mexican–leaning seasonal plates",
        reservationNeeded: true,
        googleRating: 4.4,
      },
      {
        name: "Orlando's New Mexican Café",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "The town's beloved red-and-green chile spot — the must-do group meal",
        reservationNeeded: false,
        googleRating: 4.6,
      },
      {
        name: "Taos Mesa Brewing",
        style: "brewpub",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Big brewery taproom with live music and an outdoor stage",
        reservationNeeded: false,
        googleRating: 4.5,
      },
    ],
    bars: [
      {
        name: "Adobe Bar (Taos Inn)",
        vibe: "cocktail",
        highlight:
          "The 'living room of Taos' — margaritas and nightly live music off the plaza",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
      {
        name: "Taos Mesa Brewing Taos Tap Room",
        vibe: "brewpub",
        highlight:
          "Downtown taproom with house beers and a courtyard",
        lateNight: false,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
      {
        name: "The Alley Cantina",
        vibe: "honky-tonk",
        highlight:
          "Live music and dancing in one of the oldest buildings in town — the late-night plaza spot",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.3,
      },
    ],
    activities: [
      {
        name: "Rio Grande del Norte Rafting",
        type: "rafting",
        duration: "full day",
        pricePerPerson: [90, 180],
        groupFriendly: true,
        highlight:
          "Whitewater through the Taos Box gorge of the Rio Grande — the signature adventure day",
        bestFor: "rest day",
        provider: "Los Rios River Runners",
      },
      {
        name: "Taos Pueblo & Plaza Walk",
        type: "hiking",
        duration: "2-3 hours",
        pricePerPerson: [0, 30],
        groupFriendly: true,
        highlight:
          "Visit the 1,000-year-old UNESCO World Heritage pueblo and the historic plaza",
        bestFor: "morning before golf",
      },
      {
        name: "Rio Grande Gorge & Mesa UTV Tour",
        type: "atv",
        duration: "half day",
        pricePerPerson: [110, 200],
        groupFriendly: true,
        highlight:
          "Off-road the high mesa to the dramatic 600-foot Rio Grande Gorge Bridge",
        bestFor: "arrival day",
        provider: "Big Adventures Taos",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [8, 20],
        hourlyRate: [100, 200],
        fullDayRate: [800, 1500],
        canDoGolfAndBars: true,
        providers: ["Taos Shuttle", "Twin Hearts Express", "Santa Fe limo services"],
        notes:
          "Shuttles cover the SAF/ABQ transfers and Angel Fire runs. The plaza bars are walkable once you're parked.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [80, 160],
        providers: ["Take a Chef", "Taos Private Chefs", "Cozymeal"],
        mealTypes: ["steak dinner", "New Mexican chile feast", "breakfast"],
        notes:
          "A chile-forward New Mexican chef night at an adobe rental is the move for a big group.",
      },
    ],
  },

  // ─── Ruidoso, NM ───────────────────────────────────────────────────
  {
    id: "ruidoso-nm",
    city: "Ruidoso",
    state: "NM",
    region: "Southwest",
    tagline: "Cool-pines mountain golf, horse racing, and casino nights",
    description:
      "Ruidoso is a pine-covered mountain town in southern New Mexico — a summer escape from Texas heat with multiple golf courses, the famous Ruidoso Downs horse track, and the Inn of the Mountain Gods casino resort. Cool temps, a walkable Midtown, and a real Vegas-lite casino make it a fun, value-packed buddy trip.",
    population: "small",
    nearestAirport: {
      code: "ELP",
      name: "El Paso International Airport",
      driveMinutes: 130,
    },
    bestSeasons: ["summer", "fall"],
    groceryNotes:
      "Walmart and Lawrence Brothers grocery in town; liquor at grocery and downtown stores",
    courses: [
      {
        name: "The Links at Sierra Blanca",
        tier: "premium",
        greenFeeRange: [60, 90],
        holes: 18,
        par: 72,
        yardage: 6968,
        walkable: false,
        style: "links",
        driveMinutes: 8,
        url: "https://www.thelinksatsierrablanca.com",
        highlight:
          "Jim Colbert/Jeff Bauer Scottish links–style course on the old airport site with big mountain views",
        googleRating: 4.5,
        hypeTag: "LOCALS' FAVORITE",
      },
      {
        name: "The Lodge at Sierra Blanca / Inn of the Mountain Gods Golf",
        tier: "premium",
        greenFeeRange: [80, 140],
        holes: 18,
        par: 72,
        yardage: 6834,
        walkable: false,
        style: "mountain",
        driveMinutes: 10,
        url: "https://www.innofthemountaingods.com",
        highlight:
          "Ted Robinson resort course winding around a mountain lake at the Mescalero Apache casino resort",
        googleRating: 4.5,
        hypeTag: "DESIGNER CLASSIC",
      },
      {
        name: "Cree Meadows Country Club",
        tier: "solid",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 71,
        yardage: 6437,
        walkable: true,
        style: "mountain",
        driveMinutes: 5,
        url: "https://www.creemeadows.com",
        highlight:
          "Affordable, walkable 1947 course in the pines right in town — the value round",
        googleRating: 4.3,
        hypeTag: "BEST VALUE",
      },
    ],
    lodging: [
      {
        type: "cabin",
        sleeps: [8, 16],
        nightlyRange: [250, 800],
        amenities: ["hot tub", "fireplace", "big kitchen", "deck", "pines", "game room"],
        areaDescription:
          "Upper Canyon and Alto cabins set in the ponderosa pines",
        searchUrl:
          "https://www.vrbo.com/search?destination=Ruidoso%2C+NM&groupSize=12",
        notes:
          "Big pine cabins are the classic Ruidoso rental — decks, hot tubs, and cool mountain nights.",
        avgRating: 4.6,
      },
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [200, 450],
        amenities: ["casino", "on-site golf", "spa", "lake", "multiple restaurants"],
        areaDescription:
          "Inn of the Mountain Gods Resort & Casino on the Mescalero reservation",
        searchUrl: "https://www.innofthemountaingods.com",
        notes:
          "The Inn of the Mountain Gods is a self-contained casino-golf-lake resort — block rooms for a low-logistics trip.",
        avgRating: 4.4,
      },
    ],
    dining: [
      {
        name: "Cornerstone Bakery & Café",
        style: "casual",
        priceRange: "$$",
        capacity: "medium",
        highlight:
          "Beloved Midtown breakfast-and-lunch spot to fuel up before tee time",
        reservationNeeded: false,
        googleRating: 4.6,
      },
      {
        name: "Wendell's (Inn of the Mountain Gods)",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "The resort's lakeside steakhouse — the splurge dinner with a view",
        reservationNeeded: true,
        googleRating: 4.4,
      },
      {
        name: "Casa Blanca Restaurant & Cantina",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Margaritas and New Mexican plates with a big patio — the easy group dinner",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "Cattle Baron Steak & Seafood",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Reliable steaks and a salad bar that handles a hungry crew",
        reservationNeeded: false,
        googleRating: 4.4,
      },
    ],
    bars: [
      {
        name: "Quarters Lounge",
        vibe: "honky-tonk",
        highlight:
          "Longtime Ruidoso bar with live music and dancing — the local late-night spot",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.3,
      },
      {
        name: "Casino Bars (Inn of the Mountain Gods)",
        vibe: "casino-bar",
        highlight:
          "Casino floor bars and lounges for a Vegas-lite night with blackjack",
        lateNight: true,
        walkableFromDowntown: false,
      },
      {
        name: "Sacred Grounds / Midtown patios",
        vibe: "patio",
        highlight:
          "Walkable Midtown bars and patios for a relaxed pine-town crawl",
        lateNight: false,
        walkableFromDowntown: true,
      },
    ],
    activities: [
      {
        name: "Inn of the Mountain Gods Casino",
        type: "casino",
        duration: "2-3 hours",
        pricePerPerson: [0, 200],
        groupFriendly: true,
        highlight:
          "Full Mescalero Apache casino with tables, slots, and a sportsbook",
        bestFor: "rest day",
        provider: "Mescalero Apache Tribe",
      },
      {
        name: "Ruidoso Downs Horse Racing",
        type: "horseback",
        duration: "half day",
        pricePerPerson: [10, 50],
        groupFriendly: true,
        highlight:
          "Quarter-horse and thoroughbred racing — home of the world's richest quarter-horse race (summer season)",
        bestFor: "rest day",
      },
      {
        name: "Lincoln National Forest UTV Tour",
        type: "atv",
        duration: "half day",
        pricePerPerson: [110, 200],
        groupFriendly: true,
        highlight:
          "Off-road the high pines around Sierra Blanca peak",
        bestFor: "arrival day",
        provider: "Local outfitters",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [8, 20],
        hourlyRate: [100, 200],
        fullDayRate: [800, 1500],
        canDoGolfAndBars: true,
        providers: ["Ruidoso Shuttle", "El Paso Limousine Service"],
        notes:
          "Most crews drive in from El Paso or Texas. Charter a van for the casino-and-bar nights and course shuttles.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [75, 150],
        providers: ["Take a Chef", "Cozymeal"],
        mealTypes: ["steak dinner", "New Mexican chile feast", "BBQ cookout"],
        notes:
          "A steak or chile night at a big pine cabin is the easy call for a large group.",
      },
    ],
  },

  // ─── Las Cruces, NM ────────────────────────────────────────────────
  {
    id: "las-cruces-nm",
    city: "Las Cruces",
    state: "NM",
    region: "Southwest",
    tagline: "Year-round desert golf under the Organ Mountains",
    description:
      "Las Cruces sits in the Mesilla Valley under the jagged Organ Mountains — warm year-round, cheap, and an hour from El Paso. Award-winning Sonoma Ranch leads a solid public lineup, the historic Mesilla plaza serves the state's best margaritas, and Hatch green chile is everywhere. A great-value Southwest trip.",
    population: "medium",
    nearestAirport: {
      code: "ELP",
      name: "El Paso International Airport",
      driveMinutes: 50,
    },
    bestSeasons: ["spring", "fall"],
    groceryNotes:
      "Albertsons, Walmart, and Sam's Club in town; liquor at grocery and Total Wine in El Paso",
    courses: [
      {
        name: "Sonoma Ranch Golf Course",
        tier: "premium",
        greenFeeRange: [40, 75],
        holes: 18,
        par: 72,
        yardage: 7000,
        walkable: false,
        style: "desert",
        driveMinutes: 12,
        url: "https://sonomaranchgolf.com",
        highlight:
          "Cal Olson rolling-hills design with bent-grass greens and Organ Mountain views — an award-winning value",
        googleRating: 4.5,
        hypeTag: "LOCALS' FAVORITE",
      },
      {
        name: "NMSU Golf Course",
        tier: "solid",
        greenFeeRange: [30, 55],
        holes: 18,
        par: 72,
        yardage: 7040,
        walkable: true,
        style: "desert",
        driveMinutes: 8,
        url: "https://golfcourse.nmsu.edu",
        highlight:
          "Long, mature university course with Organ Mountain views — a strong, affordable test",
        googleRating: 4.4,
        hypeTag: "BEST VALUE",
      },
      {
        name: "Picacho Hills Country Club",
        tier: "solid",
        greenFeeRange: [40, 70],
        holes: 18,
        par: 72,
        yardage: 6917,
        walkable: false,
        style: "desert",
        driveMinutes: 15,
        url: "https://www.picachohills.com",
        highlight:
          "Semi-private hillside layout overlooking the Mesilla Valley — accepts public play",
        googleRating: 4.3,
      },
    ],
    lodging: [
      {
        type: "house",
        sleeps: [8, 14],
        nightlyRange: [250, 700],
        amenities: ["pool", "hot tub", "big kitchen", "mountain views", "patio"],
        areaDescription:
          "Sonoma Ranch or Picacho Hills neighborhoods near the courses",
        searchUrl:
          "https://www.vrbo.com/search?destination=Las+Cruces%2C+NM&groupSize=12",
        notes:
          "Rentals are inexpensive here. A Sonoma Ranch home puts you next to the top course with Mesilla 15 minutes away.",
        avgRating: 4.5,
      },
      {
        type: "resort-house",
        sleeps: [10, 16],
        nightlyRange: [150, 350],
        amenities: ["pool", "breakfast", "fitness center"],
        areaDescription:
          "Las Cruces hotel block near I-25 and downtown",
        searchUrl:
          "https://www.marriott.com/search/findHotels.mi?t=las+cruces+nm",
        notes:
          "Hotel blocks downtown keep you near the breweries and a short ride to Mesilla.",
        avgRating: 4.3,
      },
    ],
    dining: [
      {
        name: "La Posta de Mesilla",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Sprawling historic Mesilla-plaza institution — chile, margaritas, and room for a big crew",
        reservationNeeded: false,
        googleRating: 4.4,
      },
      {
        name: "Double Eagle on the Plaza",
        style: "steakhouse",
        priceRange: "$$$",
        capacity: "large-group",
        highlight:
          "Grand historic-hacienda steakhouse on the Mesilla plaza — the splurge dinner",
        reservationNeeded: true,
        googleRating: 4.5,
      },
      {
        name: "Salud! de Mesilla",
        style: "farm-to-table",
        priceRange: "$$$",
        capacity: "medium",
        highlight:
          "Wine-forward bistro with a creative seasonal menu near the plaza",
        reservationNeeded: true,
        googleRating: 4.6,
      },
      {
        name: "Andele Restaurante",
        style: "mexican",
        priceRange: "$$",
        capacity: "large-group",
        highlight:
          "Local-favorite New Mexican spot with a salsa bar — easy group lunch or dinner",
        reservationNeeded: false,
        googleRating: 4.5,
      },
    ],
    bars: [
      {
        name: "Spotted Dog Brewery",
        vibe: "brewpub",
        highlight:
          "Mesilla-area brewery with house beers and a patio — the local favorite",
        lateNight: false,
        walkableFromDowntown: false,
        googleRating: 4.6,
      },
      {
        name: "Little Toad Creek Brewery & Distillery",
        vibe: "brewpub",
        highlight:
          "Downtown brewery-distillery with beer, cocktails, and live music",
        lateNight: true,
        walkableFromDowntown: true,
        googleRating: 4.5,
      },
      {
        name: "El Patio Cantina (Mesilla)",
        vibe: "patio",
        highlight:
          "Historic Mesilla-plaza cantina with live music and margaritas",
        lateNight: true,
        walkableFromDowntown: false,
        googleRating: 4.4,
      },
    ],
    activities: [
      {
        name: "Organ Mountains–Desert Peaks Hike",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [0, 25],
        groupFriendly: true,
        highlight:
          "Dripping Springs and the dramatic Organ Mountain trails minutes east of town",
        bestFor: "morning before golf",
      },
      {
        name: "White Sands National Park Day Trip",
        type: "hiking",
        duration: "half day",
        pricePerPerson: [0, 40],
        groupFriendly: true,
        highlight:
          "Sled the world's largest gypsum dune field an hour northeast — surreal rest-day scenery",
        bestFor: "rest day",
      },
      {
        name: "Hatch Green Chile & Winery Tour",
        type: "winery",
        duration: "half day",
        pricePerPerson: [40, 100],
        groupFriendly: true,
        highlight:
          "Tour the Mesilla Valley wineries and the chile capital of Hatch by van",
        bestFor: "rest day",
        provider: "Local wine-tour operators",
      },
    ],
    partyBuses: [
      {
        type: "shuttle",
        capacity: [10, 24],
        hourlyRate: [100, 200],
        fullDayRate: [800, 1500],
        canDoGolfAndBars: true,
        providers: ["Las Cruces Shuttle Service", "El Paso Limousine Service", "Sun City Limo"],
        notes:
          "El Paso–based vans handle the ELP transfer; charter for the Mesilla plaza nights and course shuttles.",
      },
    ],
    privateChefs: [
      {
        pricePerPerson: [70, 140],
        providers: ["Take a Chef", "Cozymeal"],
        mealTypes: ["steak dinner", "Hatch green-chile feast", "breakfast"],
        notes:
          "A green-chile-forward chef night with valley wines is a strong, cheap luxury here.",
      },
    ],
  },
];
