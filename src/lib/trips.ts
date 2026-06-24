export interface ScheduleItem {
  time: string;
  activity: string;
  detail?: string;
  type: "golf" | "dining" | "activity" | "nightlife";
  image?: string;
  /** e.g. "arrive 6:30 AM" — shown inline next to tee time */
  arriveTime?: string;
  /** Short one-line vibe / description quote */
  description?: string;
  /** e.g. "$400 per player × 18 = $7,200" */
  cost?: string;
  /** Course architect / designer for golf items */
  architect?: string;
  /** e.g. "~30 min drive from Meadow Valleys" */
  driveTime?: string;
  /** Location / city */
  location?: string;
  /** Bullet facts (amenities, quirks) */
  facts?: string[];
}

export interface DaySchedule {
  day: string;
  date: string;
  items: ScheduleItem[];
  /** e.g. "$9,000" — total cost for the day */
  dayTotal?: string;
  /** e.g. "$500" — per-person cost for the day */
  perPerson?: string;
  /** Optional heading subtitle for the day */
  subtitle?: string;
}

export interface Course {
  name: string;
  url?: string;
  image?: string;
  description?: string;
  holes?: number;
  location?: string;
  designer?: string;
  phone?: string;
  greenFee?: string;
  amenities?: string;
  notes?: string;
}

export interface Restaurant {
  name: string;
  url?: string;
  image?: string;
  cuisine?: string;
  note?: string;
}

export interface TripTransport {
  name: string;
  contact?: string;
  vehicle?: string;
  phones?: string[];
  address?: string;
}

export interface Bar {
  name: string;
  /** City, e.g. "Sheboygan" / "Kohler" */
  location?: string;
  /** Short vibe tag, e.g. "Cocktails · till midnight" */
  vibe?: string;
  description: string;
  url?: string;
}

export interface MenuCourse {
  /** e.g. "Starters", "Mains", "Sides", "Dessert" */
  heading: string;
  items: { name: string; detail?: string }[];
}

export interface PrivateDiningMenu {
  /** Menu name, e.g. "Steak Night" */
  title: string;
  /** Human date, e.g. "Thursday, July 9" */
  date: string;
  /** Caterer / chef line */
  caterer?: string;
  catererUrl?: string;
  courses: MenuCourse[];
  pricePerPerson?: string;
  serviceFee?: string;
  gratuity?: string;
  total?: string;
  /** Footnote, e.g. deposit / card-fee terms */
  terms?: string;
}

export interface PhotoSection {
  label: string;
  images: string[];
}

export interface Trip {
  year: number;
  slug: string;
  location: string;
  state: string;
  stateAbbr: string;
  tagline: string;
  dates: string;
  heroImage: string;
  courses: Course[];
  restaurants: Restaurant[];
  schedule: DaySchedule[];
  photoSections: PhotoSection[];
  gallery: string[];
  upcoming?: boolean;
  lodgingAddress?: string;
  lodgingBookingUrl?: string;
  lodgingImage?: string;
  /** Property name shown in the arrival panel, e.g. "Malibu House" */
  lodgingName?: string;
  /** Check-in / check-out window, e.g. "07 Jul 2026 → 12 Jul 2026" */
  lodgingStayDates?: string;
  /** Hostaway (or similar) guest portal — reservation details + exact address */
  lodgingGuestPortalUrl?: string;
  /** Door / smart-lock access code for check-in */
  lodgingDoorCode?: string;
  /** WiFi SSID */
  lodgingWifiNetwork?: string;
  /** WiFi password */
  lodgingWifiPassword?: string;
  /** Digital guidebook (how-to videos, house rules, local recs) */
  lodgingGuidebookUrl?: string;
  /** Private chef / catered dinners with full menus */
  privateDining?: PrivateDiningMenu[];
  /** Nightlife / bar options */
  bars?: Bar[];
  /** Ground transportation / driver contact */
  transport?: TripTransport;
}

const SQ = "https://images.squarespace-cdn.com/content/v1/62cb87cca6b36f353a2575d5";

export const trips: Trip[] = [
  {
    year: 2026,
    slug: "2026",
    location: "Kohler",
    state: "Wisconsin",
    stateAbbr: "WI",
    tagline: "Hell is empty, and all 16 devils are here.",
    dates: "July 7 \u2013 12, 2026",
    upcoming: true,
    lodgingAddress: "1489 Lakeshore Drive, Cleveland, WI 53015",
    lodgingBookingUrl: "https://www.airbnb.com/trips/shared/874073c7-812c-457d-97c4-feec6f41e3e9",
    lodgingImage: "/photos/2026/kohler-lodging.png",
    lodgingName: "Malibu House",
    lodgingStayDates: "07 Jul 2026 → 12 Jul 2026",
    lodgingGuestPortalUrl: "https://guest-portal.hostaway.com/44557834/XhbT-V5X",
    lodgingDoorCode: "4891",
    lodgingWifiNetwork: "Wisconsin Getaways",
    lodgingWifiPassword: "Vacation!",
    lodgingGuidebookUrl: "https://bit.ly/themalibuhouse",
    heroImage: "/photos/2026/whistling-straits-hero.jpg",
    courses: [
      {
        name: "Blackwolf Run — Meadow Valleys",
        url: "https://kohlerwisconsin.com/golf/blackwolf-run/the-meadow-valleys",
        image: "/photos/2026/blackwolf-run.jpg",
        description: "Pete Dye stitched the original Blackwolf front nine to a new nine and forged something genuinely different — the front plays open prairie with wide fairways, then the back drops into glacier-carved ravines and dense north woods where the Sheboygan River hijacks the closing stretch. The 14th is the standout, a left-to-right dogleg where the river runs the entire length of the hole before spilling under a train car bridge to a near-peninsular green WiscoGolfAddict called \"the most beautiful golf hole I've ever seen.\" Golf Digest ranks it 74th among U.S. public courses, but the back nine alone — culminating in a forced carry over the Sheboygan at 18 — earns its place on any serious Wisconsin trip.",
        holes: 18,
        location: "1111 W. Riverside Drive, Kohler, WI 53044",
        designer: "Pete Dye",
        phone: "(866) 847-4856",
        greenFee: "$400/player (cart included)",
        amenities: "Cart included, on-site dining",
      },
      {
        name: "Quit Qui Oc Golf Club",
        url: "https://quitquiocgolf.com",
        image: "https://golf-pass-brightspot.s3.amazonaws.com/80/9d/6542d1de0b2e9fe08f22713b5d4a/5836.jpg",
        description: "Tom Bendelow laid out the original routing in 1923 on the rolling hills of the Northern Kettle Moraine — the same landscape carved by glaciers 13,000 years ago — and the Wiese family rebuilt the back nine after WWII, then added a third nine in 2001 that leans into that glacial theme explicitly. The course plays tighter than anything at Kohler: small bent-grass greens framed hard by mature trees, abundant bunkers demanding precision, and a par-4 15th with a full blind tee shot past a wall of oaks to an elevated green that punishes the ambitious. At the green fees it runs, it's the best bang-for-dollar stop between the Kohler resorts and the Road America crowds that fill Elkhart Lake on race weekends.",
        holes: 18,
        location: "500 Quit Qui Oc Lane, Elkhart Lake, WI 53020",
        phone: "(920) 876-2833",
        greenFee: "$100/player (cart included)",
        amenities: "On-site restaurant, 27-hole facility",
      },
      {
        name: "The Bull at Pinehurst Farms",
        url: "https://golfthebull.com",
        image: "https://golfthebull.com/wp-content/uploads/hdr-golf-course-2025.jpg",
        description: "Wisconsin's only Jack Nicklaus Signature design opened in 2003 on a former cattle ranch and has cracked Golf Digest's top 100 public courses in the country, ranked in the top 15 in-state on every major list. The layout earns that rep on the back of its ravine holes: the par-4 5th — the course's number-one handicap — demands a tee shot over a ravine followed by an approach across wetlands to a buttressed green hanging over the Onion River valley, while the par-3 6th drops through timber to a tiered green with a ravine lurking short-left. WiscoGolfAddict called it \"one of the most demanding and dramatic par fours in the whole state\" — it's the answer for anyone who wants Nicklaus-scale strategy instead of another Dye grind.",
        holes: 18,
        location: "9425 Highway 32, Sheboygan Falls, WI 53085",
        designer: "Jack Nicklaus (Signature Design)",
        phone: "(920) 467-1500",
        greenFee: "$200/player (cart included)",
        notes: "Unforgiving greens, elevation drama",
      },
      {
        name: "The Baths at Blackwolf Run",
        url: "https://kohlerwisconsin.com/golf",
        image: "/photos/2026/kohler-hero.jpg",
        description: "Opened in 2021 on 27 acres tucked between the first and eleventh holes of Meadow Valleys, this 10-hole par-3 by Dye disciple Chris Lutzke is a condensed tour of Golden Age green templates most Midwest golfers have only read about — a Punchbowl at 4, a Dell modeled after Lahinch's famous fifth at 6, and a fully blind Alps at 8 that Herb Kohler himself called the hole he was most excited to see. Holes 60 to 160 yards, a figure-eight routing you can play in 3-, 6-, or 10-hole loops, and clay-lined swimming holes alongside the fairways make this feel less like a warm-up and more like a standalone destination. Walking only, and it routinely books out before the championship courses do.",
        holes: 10,
        location: "N8501 Lakeshore Road, Kohler, WI 53044",
        phone: "(866) 847-4856",
        greenFee: "$150/player (walking only)",
        amenities: "Outdoor bar, natural hot springs, 1-acre putting green",
      },
      {
        name: "Autumn Ridge Golf Club",
        url: "https://autumnridgegolfcourse.com",
        image: "https://autumnridgegolfcourse.com/wp-content/uploads/2022/10/course_1.jpg",
        description: "Ernie Schrock's 1996 design earns a Golf Digest 4-star and a Milwaukee Journal Sentinel \"best in Wisconsin\" citation on a par-70 that runs only 6,027 yards but plays harder than the numbers suggest: narrow bent-grass fairways, blind approaches off elevation changes, and greens that GolfPass reviewers consistently note \"seem to play uphill\" no matter which way you're headed. It sits 15 minutes north of Destination Kohler, which makes it the ideal Sunday finisher for a trip that spent two days paying Whistling Straits rates. At country-club conditions for public prices, Autumn Ridge is what locals play when they're tired of watching out-of-towners discover their backyard.",
        holes: 18,
        location: "1 Straight Drive, Valders, WI 54245",
        phone: "(920) 758-3333",
        greenFee: "$80/player (cart included)",
        notes: "Bent grass fairways, manicured greens",
      },
      {
        name: "Whistling Straits — Irish Course",
        url: "https://kohlerwisconsin.com/golf",
        image: "/photos/2026/whistling-straits.jpg",
        description: "Pete and Alice Dye opened the Irish in 2000 as the inland companion to the Straits, and while it doesn't have holes along Lake Michigan, the 11th on the back nine delivers panoramic lake views and sits at the start of what reviewers consistently call the best four-hole stretch on the property. The 13th — \"Blind Man's Bluff\" — is styled after the Dell at Lahinch: 183 yards from an elevated tee to the course's largest green, ringed by more than a dozen bunkers and barely visible until you crest the sand hills. Scottish Blackface sheep roam the rough, the clubhouse bathrooms are labeled \"Lads\" and \"Lassies,\" and it's considerably more approachable than the Straits — the right play the day before you tackle 1,012 bunkers next door.",
        holes: 18,
        location: "N8501 Lakeshore Road, Kohler, WI 53044",
        designer: "Pete Dye",
        phone: "(866) 847-4856",
        greenFee: "$450/player (cart included, no caddie)",
      },
    ],
    restaurants: [
      { name: "Sundance Saloon", cuisine: "Bar & Grill", url: "https://www.facebook.com/SundanceSaloonBarAndGrill/", note: "Wednesday — first-night burgers, beer, and live music in Sheboygan" },
      { name: "Umi Sushi & Steak House", cuisine: "Sushi & Hibachi", note: "Friday — straight from the course, downtown Sheboygan" },
      { name: "Chef Natalie — Nosh Custom Catering", cuisine: "Private Chef · Family Style", url: "https://www.noshcustomcatering.com/", note: "Thursday & Saturday — cooks our Lake Michigan catch at the lodge" },
    ],
    privateDining: [
      {
        title: "Steak Night",
        date: "Thursday, July 9",
        caterer: "NOSH Private Dining · Chef Natalie",
        catererUrl: "https://www.noshcustomcatering.com/",
        courses: [
          {
            heading: "Starters / Amuse Bouche",
            items: [
              { name: "Brat Meatball", detail: "Sheboygan County's infamous brat turned into a meatball, served on stone ground mustard with haystack onion garnish" },
            ],
          },
          {
            heading: "Mains",
            items: [
              { name: "Pan Seared Ribeye Steaks", detail: "Kerrygold butter, maldon sea salt, + fresh herbs (cooked to medium rare unless otherwise requested). Chimichurri + house steak sauce served on side" },
              { name: "Filet Mignon", detail: "Pan seared filets with Kerrygold butter, maldon sea salt, + fresh herbs. Served with a whiskey peppercorn sauce (cooked to medium rare unless otherwise requested)" },
              { name: "Bread Service", detail: "House brioche rolls, foccacia, + sourdough served with house compound butter, house whipped honey butter, and balsamic + olive oil" },
            ],
          },
          {
            heading: "Sides",
            items: [
              { name: "Truffle Mashed Potatoes", detail: "Truffle infused mashed potatoes with rosemary, pecorino Romano, roasted garlic + finished with crispy shallots" },
              { name: "Baked French Onion Mac + Cheese", detail: "Caramelized onions in a fontina, Parmesan, + Gruyère cream sauce with cavatappi noodles. Topped with brown butter toasted breadcrumbs + more Gruyère cheese + broiled until golden brown" },
              { name: "Sautéed Mushrooms + Onions", detail: "Cremini + Oyster mushrooms sautéed with sweet vidalia onion, garlic, butter + fresh herbs" },
            ],
          },
          {
            heading: "Dessert",
            items: [
              { name: "Brown Butter Cake", detail: "Chef Natalie's infamous ooey gooey brown butter cake served warm with bourbon vanilla bean whipped mascarpone + topped with fresh macerated peaches + candied pecans" },
            ],
          },
        ],
        pricePerPerson: "$150",
        serviceFee: "$200",
        gratuity: "$650",
        total: "$3,250",
        terms: "50% deposit due upon booking · Square charges a 3% fee for card transactions",
      },
      {
        title: "Wisconsin Fish Fry Night",
        date: "Saturday, July 11",
        caterer: "NOSH Private Dining · Chef Natalie",
        catererUrl: "https://www.noshcustomcatering.com/",
        courses: [
          {
            heading: "Starters",
            items: [
              { name: "Charcuterie Board", detail: "Locally sourced artisanal meats + cheeses with assorted nuts, artisan crackers, dips + spreads" },
            ],
          },
          {
            heading: "Mains",
            items: [
              { name: "Grilled Market Fish", detail: "Prepared according to what you bring back from the fishing trip" },
              { name: "Beer Battered Walleye Fish Fry", detail: "Large walleye filets in a house Blue Moon beer batter + deep fried until perfectly crispy" },
              { name: "Panko Breaded Perch Fish Fry", detail: "Local perch filets breaded with a house seasoned panko breading + fried until golden perfection" },
            ],
          },
          {
            heading: "Sides",
            items: [
              { name: "Hand Cut French Fries", detail: "Fried until golden brown and served with a trio of dipping sauces" },
              { name: "Bacon Baked Beans", detail: "Thick cut smoked bacon with sweet and tangy baked beans" },
              { name: "Corn on the Cob", detail: "Locally harvested sweet corn grilled and served with butter" },
            ],
          },
          {
            heading: "Dessert",
            items: [
              { name: "Apple Pie Cheesecake", detail: "An entire apple pie baked into a cheesecake. Served with house whipped cream, salted caramel sauce, + streusel topping" },
            ],
          },
        ],
        pricePerPerson: "$125",
        serviceFee: "$200",
      },
    ],
    bars: [
      {
        name: "GM's",
        location: "Sheboygan",
        vibe: "Downtown · the popular one",
        description: "Sheboygan's go-to night out — the bar everyone ends up at, the kind of place locals pile into after a wedding. The path of least resistance for getting fifteen guys in one room with a beer in hand.",
        url: "https://www.google.com/maps/search/?api=1&query=GM%27s%20Bar%20Sheboygan%20WI",
      },
      {
        name: "Urbane",
        location: "Sheboygan",
        vibe: "Cocktails · open till midnight",
        description: "The classier downtown option — a proper cocktail bar open till midnight. The civilized first stop for a good drink before the night picks a direction of its own.",
        url: "https://www.google.com/maps/search/?api=1&query=Urbane%20Sheboygan%20WI",
      },
      {
        name: "Limelight",
        location: "Sheboygan",
        vibe: "Local favorite · small",
        description: "A small neighborhood favorite a little off the main downtown drag — more local's pick than scene. Worth the detour if you want a tighter, lower-key room.",
        url: "https://www.google.com/maps/search/?api=1&query=Limelight%20Sheboygan%20WI",
      },
      {
        name: "Rewind",
        location: "Sheboygan",
        vibe: "Dive · gets loose",
        description: "The no-frills throwback dive for when the night goes sideways and nobody's ready to call it. Exactly the energy you'd expect from the last bar standing.",
        url: "https://www.google.com/maps/search/?api=1&query=Rewind%20Bar%20Sheboygan%20WI",
      },
      {
        name: "Olive & Ash",
        location: "Kohler",
        vibe: "Cigar lounge · open late",
        description: "Cigar bar and lounge right in Kohler, open late — the closest nightcap to the lodge and the move for anyone who wants to end the night with a smoke instead of a shot.",
        url: "https://www.google.com/maps/search/?api=1&query=Olive%20%26%20Ash%20Kohler%20WI",
      },
    ],
    transport: {
      name: "Santana's Limo",
      contact: "Santana",
      vehicle: "20-passenger minibus",
      phones: ["920-912-6940", "920-698-6082", "920-917-4546"],
      address: "2724 Main Avenue, Sheboygan, WI 53083",
    },
    schedule: [
      {
        day: "Tuesday",
        date: "July 7",
        subtitle: "Arrival & settle in at the Shoreline Dr lodge",
        items: [
          { time: "—", activity: "Arrive in Kohler", detail: "✈️ Fly in", type: "activity" as const, location: "Kohler, WI" },
        ],
      },
      {
        day: "Wednesday",
        date: "July 8",
        subtitle: "Dawn charter · house & lake all day · Sundance Saloon and local bars at night — 🚗 rental cars today, no bus",
        items: [
          {
            time: "5:00 AM",
            activity: "Salmon & Trout Fishing Charter",
            detail: "Lake Michigan",
            type: "activity",
            image: "https://sheboygancharterfishing.com/wp-content/uploads/2025/02/2024salmonfishing.jpg",
            location: "Sheboygan, WI",
            description: "Pre-dawn launch out of Sheboygan, trolling for king salmon, coho, and lake trout with a licensed charter captain. We drive the rental cars to the harbor — no bus today. Whatever we land gets cleaned dockside and goes straight to Chef Natalie for Thursday's family-style dinner.",
            facts: ["Gear provided", "Up to 6 per boat", "Catch cleaned dockside", "Goes to Chef Natalie"],
          },
          {
            time: "11:00 AM",
            activity: "House & Lake",
            detail: "Swim, grill, recover",
            type: "activity",
            description: "Back to the lodge for the rest of the day — swim, lounge on the Lake Michigan shoreline, fire up the grill, and recover before the golf grind starts Thursday.",
          },
          {
            time: "7:00 PM",
            activity: "Sundance Saloon",
            detail: "Dinner",
            type: "dining",
            location: "1509 S 12th St, Sheboygan, WI",
            description: "Sheboygan bar-and-grill for an easy first night — burgers, comfort food, cold beer, and live music. No reservations, no dress code.",
          },
          {
            time: "9:30 PM",
            activity: "Local Bars",
            detail: "Sheboygan",
            type: "nightlife",
            description: "Out into Sheboygan's bar scene from there — GM's, Urbane, and the rest of the Last Call lineup — to close out the rest day.",
          },
        ],
      },
      {
        day: "Thursday",
        date: "July 9",
        subtitle: "Day 1 — Pete Dye's heathland + Elkhart Lake — 🚌 bus to and from every stop",
        items: [
          {
            time: "7:10 AM",
            arriveTime: "arrive 6:30 AM",
            activity: "Blackwolf Run — Meadow Valleys",
            detail: "18 holes",
            type: "golf",
            location: "Kohler, WI",
            architect: "Pete Dye",
            description: "Pete Dye stitched the original Blackwolf front nine to a new nine and forged something different — the front plays open prairie, then the back drops into glacier-carved ravines and dense north woods where the Sheboygan River hijacks the closing stretch. The 14th is the standout, a left-to-right dogleg where the river runs the entire length before spilling under a train car bridge to a near-peninsular green. Golf Digest ranks it 74th among U.S. public courses, and the back nine alone — culminating in a forced carry over the Sheboygan at 18 — earns its place on any Wisconsin trip.",
            cost: "$400/player × 18 = $7,200",
            facts: ["Cart included", "On-site dining", "Lunch at Blackwolf facility after round"],
          },
          {
            time: "2:30 PM",
            arriveTime: "arrive 2:00 PM",
            activity: "Quit Qui Oc Golf Club",
            detail: "18 holes",
            type: "golf",
            location: "Elkhart Lake, WI",
            description: "Tom Bendelow laid out the original 1923 routing on the rolling Northern Kettle Moraine and the Wiese family added a third nine in 2001 that leans into the glacial terrain explicitly. It plays tighter than anything at Kohler — small bent-grass greens framed hard by mature trees, abundant bunkers, and a par-4 15th with a full blind tee shot past a wall of oaks to an elevated green. Best bang-for-dollar stop between the Kohler resorts and the Road America crowds that fill Elkhart Lake on race weekends.",
            cost: "$100/player × 18 = $1,800",
            driveTime: "~30 min drive from Meadow Valleys",
            facts: ["27-hole facility", "On-site restaurant"],
          },
          {
            time: "8:00 PM",
            activity: "Chef Natalie — Nosh Custom Catering",
            detail: "Dinner · family style",
            type: "dining",
            location: "At the lodge · Cleveland, WI",
            description: "Chef Natalie of Nosh Custom Catering cooks Wednesday's catch and serves it family style at the lodge — no drive, no wait, no menu. The bus brings everyone back from Elkhart Lake straight to the table.",
          },
        ],
        dayTotal: "$9,000",
        perPerson: "$500",
      },
      {
        day: "Friday",
        date: "July 10",
        subtitle: "Day 2 — Nicklaus bull run + par-3 sunset at The Baths — 🚌 bus all day, straight to Umi after golf",
        items: [
          {
            time: "9:10 AM",
            arriveTime: "arrive 8:30 AM",
            activity: "The Bull at Pinehurst Farms",
            detail: "18 holes",
            type: "golf",
            location: "Sheboygan Falls, WI",
            architect: "Jack Nicklaus (Signature Design)",
            description: "Wisconsin's only Nicklaus Signature design opened in 2003 on a former cattle ranch and has cracked Golf Digest's top 100 public courses in the country. The ravine holes are the draw — the par-4 5th demands a tee shot over a ravine followed by an approach across wetlands to a buttressed green hanging over the Onion River valley, and the par-3 6th drops through timber to a tiered green with a ravine lurking short-left. WiscoGolfAddict called the 5th \"one of the most demanding and dramatic par fours in the whole state.\"",
            cost: "$200/player × 18 = $3,600",
            facts: ["Unforgiving greens", "Elevation drama"],
          },
          {
            time: "5:00 PM",
            arriveTime: "arrive 4:00 PM",
            activity: "The Baths at Blackwolf Run",
            detail: "10 holes (par-3)",
            type: "golf",
            location: "Kohler, WI",
            description: "Opened in 2021 on 27 acres between holes 1 and 11 of Meadow Valleys, this 10-hole par-3 by Dye disciple Chris Lutzke is a condensed tour of Golden Age green templates — a Punchbowl at 4, a Dell modeled after Lahinch's fifth at 6, and a fully blind Alps at 8 that Herb Kohler himself called the hole he was most excited to see. Holes run 60 to 160 yards, the figure-eight routing lets you play 3, 6, or 10 holes, and clay-lined swimming holes run alongside the fairways. Walking only, and it routinely books out before the championship courses do.",
            cost: "$150/player × 18 = $2,700",
            driveTime: "~20 min drive from The Bull",
            facts: ["Outdoor bar", "Natural hot springs", "1-acre putting green", "Walking only"],
          },
          {
            time: "8:30 PM",
            activity: "Umi Sushi & Steak House",
            detail: "Dinner · hibachi",
            type: "dining",
            location: "519 N 8th St, Sheboygan, WI",
            description: "Straight from The Baths to downtown Sheboygan — the bus drops us at Umi for hibachi: teppanyaki chefs cooking at the table, plus a full sushi and steak menu. Late seating, so no rush off the par-3.",
          },
        ],
        dayTotal: "$6,300",
        perPerson: "$350",
      },
      {
        day: "Saturday",
        date: "July 11",
        subtitle: "Day 3 — Hidden gem sunrise + Top-50 Whistling Straits finale — 🚌 bus to and from every stop",
        items: [
          {
            time: "8:00 AM",
            arriveTime: "arrive 7:30 AM",
            activity: "Autumn Ridge Golf Club",
            detail: "18 holes",
            type: "golf",
            location: "Valders, WI",
            description: "Ernie Schrock's 1996 design earns a Golf Digest 4-star on a par-70 that runs only 6,027 yards but plays harder than the numbers suggest — narrow bent-grass fairways, blind approaches off elevation changes, and greens GolfPass reviewers consistently note \"seem to play uphill\" no matter which way you're headed. Sits 15 minutes north of Destination Kohler, which makes it the ideal finisher for a trip that already paid Whistling Straits rates twice. Country-club conditions for public prices — what locals play when they're tired of watching out-of-towners discover their backyard.",
            cost: "$80/player × 18 = $1,440",
            facts: ["Bent grass fairways", "Golf Digest 4-star"],
          },
          {
            time: "3:27 PM",
            arriveTime: "arrive 2:30 PM",
            activity: "Whistling Straits — Irish Course",
            detail: "18 holes",
            type: "golf",
            location: "Kohler, WI",
            architect: "Pete Dye (Links-Inspired)",
            description: "Pete and Alice Dye opened the Irish in 2000 as the inland companion to the Straits, and while it has no Lake Michigan holes, the 11th on the back nine delivers panoramic lake views at the start of what reviewers call the best four-hole stretch on the property. The 13th — \"Blind Man's Bluff\" — is styled after the Dell at Lahinch: 183 yards from an elevated tee to the largest green on the course, ringed by a dozen bunkers and barely visible until you crest the sand hills. Scottish Blackface sheep roam the rough, and it's considerably more approachable than the Straits — the right play the day before you tackle 1,012 bunkers next door.",
            cost: "$450/player × 18 = $8,100",
            driveTime: "~30 min drive from Autumn Ridge",
            facts: ["Top 50 in U.S.", "Cart included", "No caddie required"],
          },
          {
            time: "8:00 PM",
            activity: "Chef Natalie — Nosh Custom Catering",
            detail: "Dinner · family style",
            type: "dining",
            location: "At the lodge · Cleveland, WI",
            description: "Closing night — Chef Natalie back at the lodge with the last of the catch, served family style. Trophies, cigars, and lies about the day's scores.",
          },
        ],
        dayTotal: "$9,540",
        perPerson: "$530",
      },
      {
        day: "Sunday",
        date: "July 12",
        subtitle: "Depart — 100 holes, 5 courses, 3 days in the books",
        items: [
          { time: "—", activity: "Depart Kohler", detail: "✈️ Fly out", type: "activity" as const, location: "Kohler, WI" },
        ],
      },
    ],
    photoSections: [
      {
        label: "The Lodge",
        images: [
          `${SQ}/b6c09435-bdb9-495f-8c09-90dd2abbf79e/Screenshot+2025-07-05+at+7.21.00%E2%80%AFPM.png`,
          `${SQ}/24f16517-4c64-4dff-9526-638e05991073/Screenshot+2025-07-05+at+7.21.07%E2%80%AFPM.png`,
          `${SQ}/e2d0e7b5-0e5d-425a-97d0-5d9423e60d19/Screenshot+2025-07-05+at+7.21.13%E2%80%AFPM.png`,
          `${SQ}/098e7d7a-b457-48df-8ea7-9b772c65140a/Screenshot+2025-07-05+at+7.20.51%E2%80%AFPM.png`,
          `${SQ}/b8d93ec8-0323-4946-8521-9bed1ddace07/Screenshot+2025-07-05+at+7.20.45%E2%80%AFPM.png`,
          `${SQ}/fa2a382c-600f-480d-9f59-d7b5061b1b17/Screenshot+2025-07-05+at+7.20.37%E2%80%AFPM.png`,
          `${SQ}/9c331ff9-ff00-4128-93b8-052c5f6161ad/Screenshot+2025-07-05+at+7.20.26%E2%80%AFPM.png`,
          `${SQ}/6e4ed24f-2dac-4adf-a633-b4f82a3d973b/Screenshot+2025-07-05+at+7.20.18%E2%80%AFPM.png`,
        ],
      },
    ],
    gallery: [],
  },
  {
    year: 2025,
    slug: "2025",
    location: "Deadwood",
    state: "South Dakota",
    stateAbbr: "SD",
    tagline: "16 lads with 108 chances to triple bogey.",
    dates: "June 24 \u2013 29, 2025",
    heroImage: `${SQ}/03de264c-9108-4366-8a98-daa0b63fa515/IMG_2259.jpeg`,
    courses: [
      { name: "Boulder Canyon Golf Course", image: "https://bouldercanyongolf.com/wp-content/uploads/2023/02/video-still.jpg", description: "The original nine dates to 1948 and plays through open rolling hills above US-14A between Sturgis and Deadwood, but the back nine added in 2018 brings tighter fairways, native grass rough, and multiple pond carries that completely change the character of the round. Hole 12 is the one people talk about — a 160-plus-yard forced carry over water to an island green that has reportedly frozen more than a few confident players on the tee box. With over $2 million in improvements since 2021 and cart paths now paved on the back, this is the most polished layout in the Deadwood corridor.", holes: 18 },
      { name: "Elkhorn Ridge Resort", image: "https://golf-pass-brightspot.s3.amazonaws.com/b8/3a/2113ec00a01c967a20239afde369/110120.jpg", description: "Patrick Wyss designed Elkhorn Ridge on the historic Frawley Ranch, and the front nine plays across the face of a mountain with 285-plus feet of elevation change and wide Centennial Valley panoramas opening up on nearly every tee shot — club selection becomes a guessing game when you're hitting into or off a slope that drops multiple stories. The back nine pivots entirely, dropping into Polo Creek Canyon where rock walls frame the fairways and the prairie-meets-mountains geography creates something closer to a Colorado resort layout than anything else in the Dakotas. Blind tee shots and mandatory layups punish the impatient — treat the first loop as a reconnaissance mission.", holes: 18 },
      { name: "Spearfish Canyon Golf Course", image: "https://golf-pass-brightspot.s3.amazonaws.com/96/98/04e3f2cf8173d0ad41094946eb1f/44360.jpg", description: "Built in 1920 and expanded to 18 holes in 1988, Spearfish Canyon plays a split personality — the front nine is classic tight tree-lined routing through ponderosa pine and spruce with push-up greens and punishing elevation shifts, while the back nine opens into a rolling, links-style design woven through an oak-laden creek bed with greens reviewers call the truest-rolling in the Black Hills. Elevated tee boxes drop 100-plus feet to fairways below, making distance control the real challenge rather than raw length. At a slope of 128 and rating of 72.4 from the tips, the numbers don't scare — but the terrain does.", holes: 18 },
    ],
    restaurants: [
      { name: "Legends Steakhouse & Casino", cuisine: "Steakhouse", image: "https://www.deadwood.com/wp/wp-content/uploads/2017/07/SilveradoFranklin_Legends_2026.jpg" },
      { name: "Mavericks Steakhouse & Casino", cuisine: "Steakhouse", image: "https://cdn.prod.website-files.com/6877da935f9923a29c53c54c/6877da935f9923a29c53c6b7_mavs.jpg" },
    ],
    schedule: [
      {
        day: "Tuesday",
        date: "June 24",
        subtitle: "Arrival in the Black Hills",
        items: [
          { time: "—", activity: "Arrive in Deadwood", detail: "✈️ Fly in", type: "activity" as const, location: "Deadwood, SD" },
        ],
      },
      {
        day: "Wednesday",
        date: "June 25",
        subtitle: "Rest day — mountain shenanigans before the golf grind",
        items: [
          {
            time: "12:00 PM",
            activity: "ATV Shenanigans",
            detail: "Custer Peak Rd, Deadwood",
            type: "activity",
            image: "https://www.deadwood.com/wp/wp-content/uploads/2024/03/recreation-homepageimage-summer.jpg",
            location: "Custer Peak Rd, Deadwood",
            description: "Half-day ATV tour into the Black Hills backcountry — fire roads, creek crossings, and zero cell service.",
            facts: ["Helmets + gloves included", "Driver briefing on-site"],
          },
        ],
      },
      {
        day: "Thursday",
        date: "June 26",
        subtitle: "Day 1 — 36 at Boulder Canyon",
        items: [
          {
            time: "9:10 AM",
            activity: "Boulder Canyon Golf Course",
            detail: "18 holes",
            type: "golf",
            location: "Deadwood, SD",
            description: "The original nine dates to 1948 and plays through open rolling hills above US-14A, but the 2018 back nine brings tighter fairways, native grass rough, and multiple pond carries that completely change the character of the round. Hole 12 is the one people talk about — a 160-plus-yard forced carry over water to an island green that has frozen more than a few confident players on the tee. With over $2 million in improvements since 2021, it's the most polished layout in the Deadwood corridor.",
            facts: ["Cart included", "36 in one day"],
          },
          {
            time: "2:00 PM",
            activity: "Boulder Canyon Golf Course",
            detail: "18 holes (afternoon loop)",
            type: "golf",
            location: "Deadwood, SD",
            description: "Same front nine, different shadows — the canyon walls swallow the sun by the back nine.",
          },
          {
            time: "8:00 PM",
            activity: "Legends Steakhouse & Casino",
            detail: "Dinner",
            type: "dining",
            image: "https://www.deadwood.com/wp/wp-content/uploads/2017/07/SilveradoFranklin_Legends_2026.jpg",
            location: "Silverado-Franklin, Deadwood",
            description: "Old-west steakhouse inside the Silverado-Franklin — bone-in ribeye, bison, and the casino floor one hallway over.",
          },
        ],
      },
      {
        day: "Friday",
        date: "June 27",
        subtitle: "Day 2 — Mountain resort golf at Elkhorn",
        items: [
          {
            time: "9:00 AM",
            activity: "Elkhorn Ridge Resort",
            detail: "18 holes",
            type: "golf",
            location: "Spearfish, SD",
            description: "Patrick Wyss designed this on the historic Frawley Ranch, and the front nine plays across the face of a mountain with 285-plus feet of elevation change and wide Centennial Valley panoramas opening on nearly every tee. The back nine pivots entirely, dropping into Polo Creek Canyon where rock walls frame the fairways and the prairie-meets-mountains geography creates something closer to a Colorado resort layout than anything else in the Dakotas. Blind tee shots and mandatory layups punish the impatient — treat the first loop as a reconnaissance mission.",
            facts: ["Resort course", "Elevation swings"],
          },
          {
            time: "2:00 PM",
            activity: "Elkhorn Ridge Resort",
            detail: "18 holes (afternoon loop)",
            type: "golf",
            location: "Spearfish, SD",
            description: "Back out for the afternoon loop — the wind off the ridge picks up by 3 PM.",
          },
          {
            time: "8:00 PM",
            activity: "Mavericks Steakhouse & Casino",
            detail: "Dinner",
            type: "dining",
            image: "https://cdn.prod.website-files.com/6877da935f9923a29c53c54c/6877da935f9923a29c53c6b7_mavs.jpg",
            location: "Main Street, Deadwood",
            description: "Classic Deadwood steakhouse on Main Street — prime rib, cocktails, and the saloon vibe the town was built on.",
          },
        ],
      },
      {
        day: "Saturday",
        date: "June 28",
        subtitle: "Day 3 — Creek crossings and canyon walls",
        items: [
          {
            time: "9:03 AM",
            activity: "Spearfish Canyon Golf Course",
            detail: "18 holes",
            type: "golf",
            location: "Spearfish, SD",
            description: "Built in 1920 and expanded to 18 holes in 1988, Spearfish Canyon plays a split personality — the front is classic tight tree-lined routing through ponderosa pine and spruce with push-up greens and punishing elevation shifts, while the back opens into a rolling, links-style design through an oak-laden creek bed with greens reviewers call the truest-rolling in the Black Hills. Elevated tee boxes drop 100-plus feet to fairways below, making distance control the real challenge rather than raw length. At a slope of 128 and rating of 72.4 from the tips, the numbers don't scare — but the terrain does.",
            facts: ["Canyon floor routing", "Creek crossings"],
          },
          {
            time: "2:00 PM",
            activity: "Spearfish Canyon Golf Course",
            detail: "18 holes (afternoon loop)",
            type: "golf",
            location: "Spearfish, SD",
            description: "Finale round — the sun drops behind the canyon walls early, so the back nine plays in golden hour.",
          },
        ],
      },
      {
        day: "Sunday",
        date: "June 29",
        subtitle: "Depart — 108 holes in 3 days",
        items: [
          { time: "—", activity: "Depart Deadwood", detail: "✈️ Fly out", type: "activity" as const, location: "Deadwood, SD" },
        ],
      },
    ],
    photoSections: [
      {
        label: "The Lodging",
        images: [
          `${SQ}/b5f3dce1-fc16-4c01-930d-15903326f1f6/Screenshot+2025-01-24+at+2.59.51%E2%80%AFPM.png`,
          `${SQ}/a147e85d-417b-4e7a-8798-a72d8be64e1b/Screenshot+2025-01-24+at+3.20.55%E2%80%AFPM.png`,
          `${SQ}/9defe4fb-a69a-46db-aa6b-46de60d51f5e/Screenshot+2025-01-24+at+3.00.07%E2%80%AFPM.png`,
          `${SQ}/f6000322-0bd3-4367-abee-8ae259025027/Screenshot+2025-01-24+at+3.21.42%E2%80%AFPM.png`,
          `${SQ}/68ba90f5-90dc-4b0d-9f3c-023a62439fd8/Screenshot+2025-01-24+at+3.21.57%E2%80%AFPM.png`,
          `${SQ}/c1cf12c0-20d9-41ec-80b4-7771eaa049c1/Screenshot+2025-01-24+at+3.22.20%E2%80%AFPM.png`,
          `${SQ}/c8dbaf12-7380-4d55-ba15-bcfb5748b90e/Screenshot+2025-01-24+at+3.22.39%E2%80%AFPM.png`,
        ],
      },
    ],
    gallery: [
      `${SQ}/03de264c-9108-4366-8a98-daa0b63fa515/IMG_2259.jpeg`,
      `${SQ}/3eba1084-f559-4627-ba67-0764b1858572/IMG_7541.jpeg`,
      `${SQ}/ca56fbd1-0812-44cd-a55e-ba9ee3bf5876/IMG_7539.jpeg`,
      `${SQ}/f52bff67-f402-4766-99e9-c50ebb3ae4ec/IMG_7512.jpeg`,
      `${SQ}/0817b6b5-1454-4d26-be26-e0c4cc440992/IMG_7507.jpeg`,
      `${SQ}/4b4ff262-fb80-47ea-b8af-d52a3dff7a90/IMG_7500.jpeg`,
      `${SQ}/75d3fa8c-42bc-4015-be02-023eb452570f/IMG_7494.jpeg`,
      `${SQ}/4cb4e398-59e0-47c2-ba99-d73572be84a4/IMG_7480.jpeg`,
      `${SQ}/756f6075-dd93-4cb1-8445-2ff39ab466e7/IMG_7473.jpeg`,
      `${SQ}/8dce44b5-4089-4155-9414-41ce3dcf0668/IMG_5112.jpeg`,
      `${SQ}/c8c9fcdc-1bbf-4b06-91db-ca841f0c2253/IMG_5107+%281%29.jpeg`,
      `${SQ}/08c34da4-5651-43f8-b1cd-a95f8fc2507c/IMG_7445.jpeg`,
      `${SQ}/557c8865-258d-4be3-9590-c488b97e53e1/IMG_5099.jpeg`,
      `${SQ}/b197c0e4-6ceb-4565-ae19-565430f90df7/IMG_7416.jpeg`,
      `${SQ}/c6a1535e-38a1-472d-a7d4-d1294ee487cc/IMG_9333.jpeg`,
      `${SQ}/59dea9d3-9505-4b6f-8791-f98de60db857/IMG_9320.jpeg`,
      `${SQ}/e04432d5-2534-4292-b5d1-6875383dc2e8/IMG_9304.jpeg`,
      `${SQ}/4c32baaa-b276-4941-a670-bd4b157592e0/IMG_2786.jpeg`,
      `${SQ}/ac2618b4-a523-458c-b649-6123bf3f3e35/IMG_2780.jpeg`,
      `${SQ}/2fa6ded4-8d78-45a1-aeaa-4c0cc9f3f243/IMG_2776.jpeg`,
      `${SQ}/9a3a2824-380c-47f1-ac37-c146e9b65006/IMG_2761.jpeg`,
      `${SQ}/12fb4ddd-190b-4a62-9932-8656d3313d46/IMG_2748.jpeg`,
      `${SQ}/2336f6a7-4f2d-4137-a527-d977a8666618/IMG_2742.jpeg`,
      "/photos/2025/IMG_1450.jpeg",
      "/photos/2025/IMG_2089.jpeg",
      "/photos/2025/IMG_2101b.jpeg",
      "/photos/2025/IMG_2101.jpeg",
      "/photos/2025/IMG_2119.jpeg",
      "/photos/2025/IMG_2134.jpeg",
      "/photos/2025/IMG_2207.jpeg",
      "/photos/2025/IMG_2247.jpeg",
      "/photos/2025/IMG_4610.jpeg",
      "/photos/2025/IMG_4617.jpeg",
      "/photos/2025/IMG_4672.jpeg",
      "/photos/2025/IMG_4746.jpeg",
      "/photos/2025/IMG_4789.jpeg",
      "/photos/2025/IMG_4804.jpeg",
      "/photos/2025/IMG_4805.jpeg",
      "/photos/2025/IMG_4808.jpeg",
      "/photos/2025/IMG_5171.jpeg",
      "/photos/2025/IMG_5277.jpeg",
      "/photos/2025/IMG_5288.jpeg",
      "/photos/2025/IMG_5294.jpeg",
      "/photos/2025/IMG_5301.jpeg",
      "/photos/2025/IMG_5332.jpeg",
      "/photos/2025/IMG_5381.jpeg",
      "/photos/2025/IMG_5415.jpeg",
      "/photos/2025/IMG_5751.jpeg",
      "/photos/2025/IMG_5806.jpeg",
      "/photos/2025/IMG_5808.jpeg",
      "/photos/2025/IMG_6044.jpeg",
      "/photos/2025/IMG_9706.jpeg",
    ],
  },
  {
    year: 2024,
    slug: "2024",
    location: "Bend",
    state: "Oregon",
    stateAbbr: "OR",
    tagline: "16 lads with 108 chances to triple bogey.",
    dates: "August 21 \u2013 25, 2024",
    lodgingAddress: "16155 Skyliners Rd, Bend, OR 97701",
    lodgingBookingUrl: "https://www.airbnb.com/rooms/42360205",
    heroImage: `${SQ}/40030cd0-2783-4cca-ab1b-ec4b3d674471/a.jpeg`,
    courses: [
      { name: "Pronghorn", url: "https://juniperpreserve.com/golf/jack-nicklaus-signature-course/", image: "https://juniperpreserve.com/wp-content/uploads/2025/08/1-pronghorn-nickalus-at-juniper-ridge-2025-OAR.jpg", description: "The back nine is carved directly out of a volcanic lava flow, and nowhere is that more literal than the par-3 8th, where the tee shot flies across a 45-foot canyon over an exposed lava tube — one of the stranger holes you'll find in American golf. Nicklaus loaded the design with split fairways, crowned greens, and blind shots that demand commitment rather than swing mechanics, and the conditioning runs firm and fast in classic high-desert fashion. Ranked No. 42 on Golf Digest's America's 100 Greatest Public Courses, this is the marquee tee time in Central Oregon and it earns that status.", holes: 18 },
      { name: "Juniper", url: "https://playjuniper.com", image: "https://playjuniper.com/images/slideshows/banner_1.jpg", description: "John Harbottle took a minimalist approach here — he let the lava rock outcroppings, native sagebrush, and juniper stands do the work, preserving them as active hazards rather than decorative framing. From the back tees it stretches to 7,200 yards with a 74.0 course rating, and the full Cascade panorama (Bachelor, Broken Top, the Sisters, Washington) never lets you forget you're deep in the Oregon high desert. Golf Digest named it one of America's Best New Courses in 2006, and the pricing makes it the easiest must-play decision on a Central Oregon itinerary.", holes: 18 },
      { name: "Widgi", url: "https://widgi.com", image: "https://golf-pass.brightspotcdn.com/dims4/default/31371fc/2147483647/strip/true/crop/1400x1050+0+0/resize/1920x1440!/quality/90/?url=https%3A%2F%2Fphotos-us.bazaarvoice.com%2Fphoto%2F2%2FcGhvdG86Z29sZm5vdw%2Fcb94eca9-1d12-56f9-b888-a5329559171d", description: "Robert Muir Graves routed all 18 holes through a dense ponderosa pine forest along the rim of the Deschutes River Canyon, which makes Widgi Creek a completely different visual and strategic experience from the open-desert courses a few miles away. The par-3 5th is the signature local oddity — a green that wraps around four massive pines, the \"Widgi Pines,\" that function as living obstacles right in the putting surface's footprint. Golf Digest called it \"the sleeper in Central Oregon,\" and the tight shotmaker's layout backed by Audubon Sanctuary certification gives it a substance that justifies the reputation.", holes: 18 },
      { name: "Tetherow", url: "https://tetherow.com", image: "https://oregoncourses.com/wp-content/uploads/2018/09/DSCN2442-2000x1200.jpg", description: "David McLay Kidd built Tetherow in 2008 as a genuine links-style course on 700 high-desert acres — wide fescue corridors, firm fairways that reward ground-game routing, and greens that punish anyone trying to fly the ball to the pin. It's the only course in Central Oregon where you can legitimately bump-and-run off the turf the way you would at Lahinch, and the panoramic sightlines to Three Sisters, Broken Top, and Mt. Bachelor don't hurt the case. Ranked No. 57 by Golf Digest and a perennial Golfweek Top Resort Course, it's essential for anyone who wants to understand what Kidd was doing before Bandon Dunes made him famous.", holes: 18 },
    ],
    restaurants: [],
    schedule: [
      {
        day: "Wednesday",
        date: "August 21",
        subtitle: "Arrival in the high desert",
        items: [
          { time: "—", activity: "Arrive in Bend", detail: "✈️ Fly in", type: "activity" as const, location: "Bend, OR" },
        ],
      },
      {
        day: "Thursday",
        date: "August 22",
        subtitle: "Day 1 — Nicklaus signature at Juniper Preserve",
        items: [
          {
            time: "9:00 AM",
            activity: "Pronghorn",
            detail: "18 holes",
            type: "golf",
            location: "Bend, OR",
            architect: "Jack Nicklaus (Signature)",
            description: "The back nine is carved out of a volcanic lava flow, and nowhere is that more literal than the par-3 8th, where the tee shot flies across a 45-foot canyon over an exposed lava tube — one of the stranger holes in American golf. Nicklaus loaded the design with split fairways, crowned greens, and blind shots that demand commitment rather than swing mechanics, and the conditioning runs firm and fast. Ranked No. 42 on Golf Digest's America's 100 Greatest Public Courses — the marquee tee time in Central Oregon.",
            facts: ["Nicklaus Signature", "Cascade views"],
          },
          {
            time: "2:00 PM",
            activity: "Pronghorn",
            detail: "18 holes (afternoon loop)",
            type: "golf",
            location: "Bend, OR",
            description: "Back out for the afternoon loop — desert wind picks up and the greens get faster as they dry.",
          },
        ],
      },
      {
        day: "Friday",
        date: "August 23",
        subtitle: "Day 2 — Juniper's mature pines",
        items: [
          {
            time: "9:00 AM",
            activity: "Juniper",
            detail: "18 holes",
            type: "golf",
            location: "Redmond, OR",
            description: "John Harbottle took a minimalist approach here — he let the lava rock outcroppings, native sagebrush, and juniper stands do the work, preserving them as active hazards rather than decorative framing. From the back tees it stretches to 7,200 yards with a 74.0 rating, and the full Cascade panorama (Bachelor, Broken Top, the Sisters, Washington) never lets you forget you're deep in the Oregon high desert. Golf Digest named it one of America's Best New Courses in 2006 — the easiest must-play decision on a Central Oregon itinerary.",
            facts: ["Mature junipers", "Cascade views"],
          },
          {
            time: "2:00 PM",
            activity: "Juniper",
            detail: "18 holes (afternoon loop)",
            type: "golf",
            location: "Redmond, OR",
            description: "Same routing, different shadows — the lava outcrops throw long stripes across the fairways by late afternoon.",
          },
        ],
      },
      {
        day: "Saturday",
        date: "August 24",
        subtitle: "Day 3 — Pine forest morning, links finale",
        items: [
          {
            time: "9:00 AM",
            activity: "Widgi",
            detail: "18 holes",
            type: "golf",
            location: "Bend, OR",
            architect: "Robert Muir Graves",
            description: "Graves routed all 18 holes through a dense ponderosa pine forest along the rim of the Deschutes River Canyon, which makes Widgi Creek a completely different visual and strategic experience from the open-desert courses a few miles away. The par-3 5th is the signature local oddity — a green that wraps around four massive pines, the \"Widgi Pines,\" that function as living obstacles inside the putting surface's footprint. Golf Digest called it \"the sleeper in Central Oregon\" and the tight shotmaker's layout justifies the reputation.",
            facts: ["Deschutes Nat'l Forest", "Creek routing"],
          },
          {
            time: "2:00 PM",
            activity: "Tetherow",
            detail: "18 holes",
            type: "golf",
            location: "Bend, OR",
            architect: "David McLay Kidd",
            description: "Kidd built Tetherow in 2008 as a genuine links-style course on 700 high-desert acres — wide fescue corridors, firm fairways that reward ground-game routing, and greens that punish anyone trying to fly the ball to the pin. It's the only course in Central Oregon where you can legitimately bump-and-run off the turf the way you would at Lahinch, and the sightlines to Three Sisters, Broken Top, and Mt. Bachelor don't hurt the case. Ranked No. 57 by Golf Digest — essential for anyone who wants to understand what Kidd was doing before Bandon Dunes made him famous.",
            facts: ["Links-style", "Fescue rough", "Volcanic features"],
          },
        ],
      },
      {
        day: "Sunday",
        date: "August 25",
        subtitle: "Depart — 72 holes, 4 courses",
        items: [
          { time: "—", activity: "Depart Bend", detail: "✈️ Fly out", type: "activity" as const, location: "Bend, OR" },
        ],
      },
    ],
    photoSections: [
      {
        label: "The Lodging",
        images: [
          `${SQ}/ee5a7082-f772-4f00-991e-527158c2a03b/house+yes.png`,
          `${SQ}/86635c19-183f-425c-94a0-d0263082a6ac/house.png`,
          `${SQ}/e9c797b7-f2b9-4e64-994f-ffa6f969881a/Screenshot+2024-03-31+at+8.57.53%E2%80%AFPM.png`,
        ],
      },
    ],
    gallery: [
      `${SQ}/40030cd0-2783-4cca-ab1b-ec4b3d674471/a.jpeg`,
      `${SQ}/a42a2f23-6374-421b-9710-b785184577c3/b.jpeg`,
      `${SQ}/03de264c-9108-4366-8a98-daa0b63fa515/IMG_2259.jpeg`,
      "/photos/2024/IMG_0209.jpeg",
      "/photos/2024/IMG_0244.jpeg",
      "/photos/2024/IMG_0375.jpeg",
      "/photos/2024/IMG_0406.jpeg",
      "/photos/2024/IMG_0477.jpeg",
      "/photos/2024/IMG_0492.jpeg",
      "/photos/2024/IMG_1594.jpeg",
      "/photos/2024/IMG_1664.jpeg",
      "/photos/2024/IMG_3667.jpeg",
      "/photos/2024/IMG_3707.jpeg",
      "/photos/2024/IMG_6034.jpeg",
      "/photos/2024/IMG_6039.jpeg",
      "/photos/2024/IMG_6042.jpeg",
      "/photos/2024/IMG_7771.jpeg",
      "/photos/2024/IMG_9721.jpeg",
      "/photos/2024/IMG_0237.mp4",
      "/photos/2024/IMG_3598.mp4",
      "/photos/2024/IMG_3610.mp4",
      "/photos/2024/IMG_3618.mp4",
      "/photos/2024/IMG_3639.mp4",
      "/photos/2024/IMG_5026.mp4",
      "/photos/2024/IMG_6525.mp4",
    ],
  },
  {
    year: 2023,
    slug: "2023",
    location: "Lexington",
    state: "Kentucky",
    stateAbbr: "KY",
    tagline: "24 all-stars (some of whom golf), 6 rounds, 3 days.",
    dates: "June 29 \u2013 July 1, 2023",
    heroImage: `${SQ}/d0910eb3-ce7f-4395-8e75-06414a70a916/DSC01441.JPG`,
    courses: [
      { name: "Kearney Hill Golf Course", url: "https://www.lexingtonky.gov/kearney-hill-golf-links", image: "https://www.kygolf.org/images/uploads/photos/KH_1.JPG", description: "Pete and P.B. Dye built this 1989 municipal layout on hilly northwest Fayette County terrain and stacked it with every trick in the family arsenal — railroad ties framing water hazards, ten bunkers on a single par-4, and rough so thick the Worldgolfer reviewer called it some of the thickest he'd played on any public or private course in the country. The signature 16th is a 368-yard par-4 where railroad ties and water guard the left side from tee to green — could have been lifted straight from Sawgrass. It hosted the Senior PGA Tour eight straight years and produced a U.S. Amateur Public Links champion; at weekday rates under $30, it's the rare municipal that punches way above its price class.", holes: 18 },
      { name: "Cherry Blossom Golf Course", url: "https://www.cherryblossom.golf", image: "https://golf-pass.brightspotcdn.com/dims4/default/f2425e3/2147483647/strip/true/crop/1400x1050+0+0/resize/1920x1440!/quality/90/?url=https%3A%2F%2Fphotos-us.bazaarvoice.com%2Fphoto%2F2%2FcGhvdG86Z29sZm5vdw%2Fdcbcf6e8-1e6c-584b-9f6c-9b237021a99a", description: "Clyde Johnston routed this 2001 layout across 178 acres of rolling Bluegrass Country just outside Georgetown, and the horse-farm landscape does most of the visual work — gently undulating bentgrass fairways framed by mature tree lines with the feel of land that's always been meant for something unhurried and precise. Golfweek ranked it the #1 public course in Kentucky five consecutive years, and the course plays to that reputation: a 73.6 rating and 135 slope from 6,866 yards with a peninsula green at the par-3 12th that forces a real decision. Conditioning is consistently praised in recent reviews — the polished, well-kept counterpoint to the Dye brutalism down the road.", holes: 18 },
      { name: "University of Kentucky Club", url: "https://www.uclubkentucky.com", image: "https://www.uclubkentucky.com/wp-content/uploads/sites/9762/2025/09/90_3.jpeg?w=1024", description: "Owner-designer Danny McQueen built this 1991 layout on the northwest edge of Lexington as the home course for UK's men's and women's golf programs, and Arthur Hills came back in 1998 to sharpen the greens and tee complexes without blowing up the original routing. The back nine is where it turns serious — holes 14-16 run water around the green, water the entire left side for 464 yards, and a 565-yard par-5 that loops the same pond system; the PGA head pro on site calls it \"one of the hardest stretches you'll find around Lexington.\" With 46 white-sand bunkers, two island greens, and a 74.6 rating from 6,992 yards, it's a strong closer on any multi-course Lexington trip.", holes: 18 },
    ],
    restaurants: [],
    schedule: [
      {
        day: "Wednesday",
        date: "June 28",
        subtitle: "Arrival in bluegrass country",
        items: [
          { time: "—", activity: "Arrive in Lexington", detail: "✈️ Fly in", type: "activity" as const, location: "Lexington, KY" },
        ],
      },
      {
        day: "Thursday",
        date: "June 29",
        subtitle: "Day 1 — Public links at Kearney Hill",
        items: [
          {
            time: "8:50 AM",
            activity: "Kearney Hill Golf Course",
            detail: "18 holes",
            type: "golf",
            location: "Lexington, KY",
            description: "Pete and P.B. Dye built this 1989 municipal and stacked it with every trick in the family arsenal — railroad ties framing water hazards, ten bunkers on a single par-4, and rough a Worldgolfer reviewer called some of the thickest he'd played on any public or private course in the country. The signature 16th is a 368-yard par-4 where railroad ties and water guard the left side from tee to green — could have been lifted straight from Sawgrass. It hosted the Senior PGA Tour eight straight years; at weekday rates under $30, a municipal that punches way above its price class.",
            facts: ["Pete Dye / P.B. Dye design", "Municipal"],
          },
          {
            time: "3:00 PM",
            activity: "Kearney Hill Golf Course",
            detail: "18 holes (afternoon loop)",
            type: "golf",
            location: "Lexington, KY",
            description: "Second loop — the greens firm up and the wind across the open routing gets honest.",
          },
        ],
      },
      {
        day: "Friday",
        date: "June 30",
        subtitle: "Day 2 — Hardwoods and horse country",
        items: [
          {
            time: "9:45 AM",
            activity: "Cherry Blossom Golf Course",
            detail: "18 holes",
            type: "golf",
            location: "Georgetown, KY",
            architect: "Clyde Johnston",
            description: "Clyde Johnston routed this 2001 layout across 178 acres of rolling Bluegrass Country outside Georgetown, and the horse-farm landscape does the visual work — gently undulating bentgrass fairways framed by mature tree lines. Golfweek ranked it the #1 public course in Kentucky five consecutive years, and it plays to that reputation: a 73.6 rating and 135 slope from 6,866 yards with a peninsula green at the par-3 12th that forces a real decision. The polished counterpoint to the Dye brutalism down the road.",
            facts: ["Bent grass tee-to-green", "Golfweek #1 KY public"],
          },
          {
            time: "2:45 PM",
            activity: "Cherry Blossom Golf Course",
            detail: "18 holes (afternoon loop)",
            type: "golf",
            location: "Georgetown, KY",
            description: "Afternoon loop through the same hardwoods — shadows get long on the fairways by hole 15.",
          },
        ],
      },
      {
        day: "Saturday",
        date: "July 1",
        subtitle: "Day 3 — Big Blue country finale",
        items: [
          {
            time: "8:30 AM",
            activity: "University of Kentucky Club",
            detail: "18 holes",
            type: "golf",
            location: "Lexington, KY",
            description: "Owner-designer Danny McQueen built this 1991 layout as the home course for UK's men's and women's golf programs, and Arthur Hills came back in 1998 to sharpen the greens and tee complexes without blowing up the routing. Holes 14-16 are where it turns serious — water around the green, water the entire left side for 464 yards, and a 565-yard par-5 that loops the same pond system; the head pro calls it \"one of the hardest stretches you'll find around Lexington.\" With 46 white-sand bunkers, two island greens, and a 74.6 rating from 6,992 yards, it's a strong closer on any multi-course Lexington trip.",
            facts: ["Private / UK-affiliated", "Tournament conditions"],
          },
          {
            time: "2:12 PM",
            activity: "University of Kentucky Club",
            detail: "18 holes (afternoon loop)",
            type: "golf",
            location: "Lexington, KY",
            description: "Closing round of the trip — 108 holes deep, nobody's hitting it straight anymore.",
          },
        ],
      },
      {
        day: "Sunday",
        date: "July 2",
        subtitle: "Depart — 108 holes, 3 courses",
        items: [
          { time: "—", activity: "Depart Lexington", detail: "✈️ Fly out", type: "activity" as const, location: "Lexington, KY" },
        ],
      },
    ],
    photoSections: [],
    gallery: [
      `${SQ}/d0910eb3-ce7f-4395-8e75-06414a70a916/DSC01441.JPG`,
      `${SQ}/382ad51c-10e2-4785-95eb-30449cb51ec7/IMG_2614.jpeg`,
      `${SQ}/5b43f12a-0419-457d-a408-872f4fd26e8f/IMG_2621.jpeg`,
      `${SQ}/c64adefd-fb38-4a79-bb9e-5b62c158af92/IMG_7841.jpeg`,
      `${SQ}/6f4b562e-db27-4e3c-9ea6-eacb9a7ae0ab/IMG_7824.jpeg`,
      `${SQ}/8dc641b7-e59c-456c-96b0-0d968ad3f838/IMG_7807.jpeg`,
      `${SQ}/3ef66c51-14c6-49d8-ade3-097775ca0f88/70997011136__8B08B046-FDBD-43CE-A596-F5AB372A7B81.jpeg`,
      `${SQ}/07ae833d-32c0-44a5-bd69-a61ae5c7f9fb/IMG_2083.jpeg`,
      `${SQ}/3bc96040-e8c4-4d09-96e0-ab024e506b6b/IMG_4235.jpeg`,
      `${SQ}/40bd124a-a158-4670-af78-a147bfb51e88/IMG_4274.jpeg`,
      `${SQ}/d88d2f43-8643-40cb-934e-4e9d28477b09/IMG_4233.jpeg`,
      `${SQ}/b302d9d7-c771-4b51-ba51-5c9389306d41/IMG_4194.jpeg`,
      `${SQ}/447090fe-6103-4bee-8221-7566f35ee6e1/IMG_4185.jpeg`,
      `${SQ}/6b49345c-514d-4565-9c7b-638ea0c63235/IMG_4182.jpeg`,
      `${SQ}/b91e6498-f946-4dbf-8d20-901795d4e4ca/IMG_4142.jpeg`,
      `${SQ}/a5b57d4c-f9cf-4cd8-943d-b2ca12632864/IMG_4139.jpeg`,
      `${SQ}/9863c893-e9ff-4a18-a238-c18099c0a8d4/IMG_4119.jpeg`,
      `${SQ}/c914fe61-d66b-4767-a74d-915e35d840c8/IMG_4130.jpeg`,
      `${SQ}/312e11a2-2cfd-4cc4-846f-96f7054fdbff/IMG_6985.jpeg`,
      `${SQ}/974265b0-e7ee-451b-96f3-4277d9f4c684/IMG_6983.jpeg`,
      `${SQ}/452f8b52-8446-4190-a053-864f12903dbf/IMG_6967.jpeg`,
      `${SQ}/a2c0663a-c407-4cec-a5f9-92aaf62436dc/IMG_2648.jpeg`,
      `${SQ}/1ca019bc-ad90-42dd-9a86-f71a29a9d1c3/IMG_2634.jpeg`,
      `${SQ}/79013a92-889a-4507-bbf7-1fea247b8efa/IMG_2630.jpeg`,
      "/photos/2023/70987827393__F5FE2068-E0F7-4D61-A049-B2E858726DFB.jpeg",
      "/photos/2023/70996826242__F65B9E9D-BE36-42DE-A14C-DCA935699B67.jpeg",
      "/photos/2023/DSC01440.jpeg",
      "/photos/2023/DSC01442.jpeg",
      "/photos/2023/DSC01476.jpeg",
      "/photos/2023/DSC01482.jpeg",
      "/photos/2023/DSC01502.jpeg",
      "/photos/2023/DSC01503.jpeg",
      "/photos/2023/DSC01504.jpeg",
      "/photos/2023/DSC01558.jpeg",
      "/photos/2023/DSC01578.jpeg",
      "/photos/2023/DSC01586.jpeg",
      "/photos/2023/DSC01598.jpeg",
      "/photos/2023/DSC01627.jpeg",
      "/photos/2023/IMG_1916.jpeg",
      "/photos/2023/IMG_2041.jpeg",
      "/photos/2023/IMG_2044.jpeg",
      "/photos/2023/IMG_2065.jpeg",
      "/photos/2023/IMG_2076.jpeg",
      "/photos/2023/IMG_2084.jpeg",
      "/photos/2023/IMG_2635.jpeg",
      "/photos/2023/IMG_2667.jpeg",
      "/photos/2023/IMG_3996.jpeg",
      "/photos/2023/IMG_4105.jpeg",
      "/photos/2023/IMG_4120.jpeg",
      "/photos/2023/IMG_4137.jpeg",
      "/photos/2023/IMG_4150.jpeg",
      "/photos/2023/IMG_4161.jpeg",
      "/photos/2023/IMG_4162.jpeg",
      "/photos/2023/IMG_4164.jpeg",
      "/photos/2023/IMG_4195.jpeg",
      "/photos/2023/IMG_4198.jpeg",
      "/photos/2023/IMG_4208.jpeg",
      "/photos/2023/IMG_4228.jpeg",
      "/photos/2023/IMG_4238.jpeg",
      "/photos/2023/IMG_4258.jpeg",
      "/photos/2023/IMG_4260.jpeg",
      "/photos/2023/IMG_4261.jpeg",
      "/photos/2023/IMG_4292.jpeg",
      "/photos/2023/IMG_6460.jpeg",
      "/photos/2023/IMG_6966.jpeg",
      "/photos/2023/IMG_7805.jpeg",
      "/photos/2023/IMG_7862.jpeg",
      "/photos/2023/IMG_7871.jpeg",
      "/photos/2023/IMG_7883.jpeg",
      "/photos/2023/IMG_8562.jpeg",
      "/photos/2023/IMG_8590.jpeg",
      "/photos/2023/IMG_8596.jpeg",
      "/photos/2023/IMG_8605.jpeg",
      "/photos/2023/IMG_4103.mp4",
      "/photos/2023/IMG_4108.mp4",
      "/photos/2023/IMG_4113.mp4",
    ],
  },
  {
    year: 2022,
    slug: "2022",
    location: "Boise",
    state: "Idaho",
    stateAbbr: "ID",
    tagline: "16 guys, 6 rounds, 3 days.",
    dates: "June 2 \u2013 23, 2022",
    heroImage: `${SQ}/ff8d47e6-8753-45f8-b511-812d49db7bcd/IMG_0729.jpeg`,
    lodgingBookingUrl: "https://www.airbnb.com/rooms/42715072",
    lodgingImage: "/photos/2022/boise-lodging.png",
    courses: [
      { name: "Falcon Crest Golf Club", url: "https://falconcrestgolf.com", image: "https://golfcoursegurus.com/photos/idaho/falconcrest/large/Falcon-Crest-18th-tee.jpg", description: "Landscape architect and club owner Hans Borbonus designed this 2001 layout around 11 lakes that come into play on over half the holes, threading farm-country flatness with manufactured elevation drops of 40–70 feet that hit you without warning. The closing par-4 18th is the gut-check — water runs the entire left side, pools in front of the green, and the approach demands a 200-yard carry to finish; a genuinely heroic hole that earns its reputation as one of Idaho's hardest closers. With train trestle bridges, blind hazards, and greens running near 9.5 on the stimpmeter, this course rewards players who came to compete, not cruise.", holes: 18 },
      { name: "Quail Hollow Golf Course", url: "https://quailhollowboise.com", image: "https://golf-pass-brightspot.s3.amazonaws.com/d9/56/c33878e5da4fc805683db81dc69c/90495.jpg", description: "Bruce Devlin and Robert von Hagge built this 1982 par-70 into Boise's foothills so aggressively that the blue tees turn routine iron shots into forced carries — hole 11, for instance, demands a 224-yard 3-wood where the whites play a 7-iron approach. The 15th is a 239-yard downhill par-3 where a hillside physically blocks your sight line to the green, and the 18th fires from an elevated tee over a pond into a shared green that also serves hole 5. At 6,325 yards it reads short on paper, but Golf Digest's 4-star rating reflects what the terrain extracts from that modest distance.", holes: 18 },
      { name: "Shadow Valley Golf Course", image: "https://golf-pass-brightspot.s3.amazonaws.com/9a/c3/3c3439206aae6ec98a6887fabda9/93751.jpg", description: "C. Edward Trout built this 1973 layout into the foothills north of Boise along the Horseshoe Bend corridor, carving the front nine into rolling high-desert terrain with a dozen distinct elevation shifts, including the par-3 6th which is literally cut from the side of a foothill. The front and back nines play like two different courses — the opening side features exposed greens, blind second shots, and aggressive OB stakes on three sides of several holes, while the tree-lined back flattens out into a dogleg-heavy finishing run. Reviewers consistently flag the bunker conditions as the best-maintained sand in the Treasure Valley.", holes: 18 },
    ],
    restaurants: [],
    schedule: [
      {
        day: "Arrival",
        date: "June 1",
        subtitle: "Arrival in the Treasure Valley",
        items: [
          { time: "—", activity: "Arrive in Boise", detail: "✈️ Fly in", type: "activity" as const, location: "Boise, ID" },
        ],
      },
      {
        day: "Day 1",
        date: "June 2",
        subtitle: "Day 1 — Desert canyon golf at Falcon Crest",
        items: [
          {
            time: "9:00 AM",
            activity: "Falcon Crest Golf Club",
            detail: "18 holes",
            type: "golf",
            location: "Kuna, ID",
            description: "Landscape architect and club owner Hans Borbonus designed this 2001 layout around 11 lakes that come into play on over half the holes, with manufactured elevation drops of 40–70 feet that hit you without warning. The closing par-4 18th is the gut-check — water runs the entire left side, pools in front of the green, and the approach demands a 200-yard carry to finish. Train trestle bridges, blind hazards, and greens running near 9.5 on the stimpmeter — rewards players who came to compete, not cruise.",
            facts: ["Desert layout", "Foothills views"],
          },
          {
            time: "2:00 PM",
            activity: "Falcon Crest Golf Club",
            detail: "18 holes (afternoon loop)",
            type: "golf",
            location: "Kuna, ID",
            description: "Back for the afternoon loop — wind through the canyon picks up every day by 2 PM, no exceptions.",
          },
        ],
      },
      {
        day: "Day 2",
        date: "June 3",
        subtitle: "Day 2 — Foothills and valley views at Quail Hollow",
        items: [
          {
            time: "10:00 AM",
            activity: "Quail Hollow Golf Course",
            detail: "18 holes",
            type: "golf",
            location: "Boise, ID",
            description: "Bruce Devlin and Robert von Hagge built this 1982 par-70 into Boise's foothills so aggressively that the blue tees turn routine iron shots into forced carries — hole 11, for instance, demands a 224-yard 3-wood where the whites play a 7-iron approach. The 15th is a 239-yard downhill par-3 where a hillside physically blocks your sight line to the green, and the 18th fires from an elevated tee over a pond into a shared green that also serves hole 5. At 6,325 yards it reads short, but Golf Digest's 4-star rating reflects what the terrain extracts from that modest distance.",
            facts: ["Foothills routing", "Municipal"],
          },
          {
            time: "3:00 PM",
            activity: "Quail Hollow Golf Course",
            detail: "18 holes (afternoon loop)",
            type: "golf",
            location: "Boise, ID",
            description: "Afternoon loop — the sun sets behind the foothills and the final four holes play in dusk.",
          },
        ],
      },
      {
        day: "Day 3",
        date: "June 23",
        subtitle: "Day 3 — Elevation and Snake River views",
        items: [
          {
            time: "10:00 AM",
            activity: "Shadow Valley Golf Course",
            detail: "18 holes",
            type: "golf",
            location: "Boise, ID",
            description: "C. Edward Trout built this 1973 layout into the foothills north of Boise along the Horseshoe Bend corridor, carving the front nine into rolling high-desert terrain with a dozen distinct elevation shifts, including the par-3 6th which is literally cut from the side of a foothill. The front and back nines play like two different courses — exposed greens, blind second shots, and aggressive OB stakes on three sides of several holes up front, then a tree-lined, dogleg-heavy finishing run on the back. Reviewers consistently flag the bunker conditions as the best-maintained sand in the Treasure Valley.",
            facts: ["Elevation changes", "Snake River views"],
          },
          {
            time: "3:00 PM",
            activity: "Shadow Valley Golf Course",
            detail: "18 holes (afternoon loop)",
            type: "golf",
            location: "Boise, ID",
            description: "Final round of the trip — legs are toast, swings are loose, scores are unprintable.",
          },
        ],
      },
      {
        day: "Departure",
        date: "June 24",
        subtitle: "Depart — 108 holes, 3 courses",
        items: [
          { time: "—", activity: "Depart Boise", detail: "✈️ Fly out", type: "activity" as const, location: "Boise, ID" },
        ],
      },
    ],
    photoSections: [],
    gallery: [
      `${SQ}/ff8d47e6-8753-45f8-b511-812d49db7bcd/IMG_0729.jpeg`,
      `${SQ}/0fba83c5-18c2-4f97-9767-cc2571e783cf/IMG_1750.jpeg`,
      `${SQ}/69047b6b-5c54-4eac-8b67-736cf758c345/IMG_1736.jpeg`,
      `${SQ}/20b19d4c-0746-4f50-8c25-91c795c87e6f/IMG_1716.jpeg`,
      `${SQ}/02f1892e-2200-4caa-905d-ae4ebe3f2380/IMG_1695.jpeg`,
      `${SQ}/4bb37462-115b-46fb-934d-eb09882f3abd/IMG_1605.jpeg`,
      `${SQ}/3ace7ab5-b502-48ac-9dff-5223b62dca4f/IMG_1597.jpeg`,
      `${SQ}/2e9d8fc5-98f6-4222-917f-fae284621d0f/IMG_3762.jpeg`,
      `${SQ}/224a2100-d5e7-4153-8805-73463b55579d/IMG_1575.jpeg`,
      `${SQ}/61cc2e8d-d30d-4f91-8b5a-8612c8f1820a/IMG_1572.jpeg`,
      `${SQ}/ccab3ef3-ea27-4930-b0f1-c79f88e366a2/IMG_1565.jpeg`,
      `${SQ}/6311c12e-d5ca-493a-8d08-2bace7fdf034/IMG_1548.jpeg`,
      `${SQ}/48d9e5c1-bffb-4e36-8a97-31d08c51b571/IMG_1547.jpeg`,
      `${SQ}/3ed65ee4-a94d-40b3-9b53-15e25b88c79b/IMG_1462.jpeg`,
      `${SQ}/be2d4b80-65f2-41cf-af24-025e6c420af7/IMG_1451.jpeg`,
      `${SQ}/68334147-ecf1-446e-93d2-7574c2661a61/IMG_3729.jpeg`,
      `${SQ}/8b4d56c9-c866-4dbb-bef5-7d62f596d757/IMG_1788.jpeg`,
      `${SQ}/af729e88-7938-4e9e-99e6-9101cac02bca/IMG_0697.jpeg`,
      `${SQ}/4e47d677-3c90-459b-bead-d7da32b24c3e/IMG_2032.jpeg`,
      `${SQ}/37deb6ef-410c-48d9-9f42-70349babc49b/IMG_1783.jpeg`,
      `${SQ}/2afe1d70-df8b-45ce-972f-8de1fde4acfa/IMG_3706.jpeg`,
      `${SQ}/91317f6a-fa06-47af-89ca-594cb7bd0856/IMG_1441.jpeg`,
      `${SQ}/0e44dfd6-7afe-44a4-ba1b-c372542296b0/IMG_1777.jpeg`,
      `${SQ}/664b0a2d-ec85-49c0-b4a5-10a7688dff0e/IMG_1757.jpeg`,
      "/photos/2022/IMG_0880.jpeg",
      "/photos/2022/IMG_0915.jpeg",
      "/photos/2022/IMG_0924.jpeg",
      "/photos/2022/IMG_1442.jpeg",
      "/photos/2022/IMG_1463.jpeg",
      "/photos/2022/IMG_1577.jpeg",
      "/photos/2022/IMG_1634.jpeg",
      "/photos/2022/IMG_1692.jpeg",
      "/photos/2022/IMG_1754.jpeg",
      "/photos/2022/IMG_1762.jpeg",
      "/photos/2022/IMG_1895.jpeg",
      "/photos/2022/IMG_2031.jpeg",
      "/photos/2022/IMG_2058.jpeg",
      "/photos/2022/IMG_2076.jpeg",
      "/photos/2022/IMG_5526.jpeg",
      "/photos/2022/IMG_5533.jpeg",
      "/photos/2022/IMG_5536.jpeg",
      "/photos/2022/IMG_5539.jpeg",
      "/photos/2022/IMG_6383.jpeg",
      "/photos/2022/IMG_9078.jpeg",
      "/photos/2022/IMG_0879.mp4",
      "/photos/2022/IMG_0906.mp4",
      "/photos/2022/IMG_0939.mp4",
      "/photos/2022/IMG_0959.mp4",
      "/photos/2022/IMG_0976.mp4",
      "/photos/2022/IMG_1776.mp4",
      "/photos/2022/IMG_5525.mp4",
      "/photos/2022/IMG_5543.mp4",
      "/photos/2022/IMG_6337.mp4",
      "/photos/2022/IMG_6400.mp4",
    ],
  },
  {
    year: 2021,
    slug: "2021",
    location: "St. George",
    state: "Utah",
    stateAbbr: "UT",
    tagline: "18 guys, 6 rounds, 3 days.",
    dates: "June 24 \u2013 26, 2021",
    heroImage: `${SQ}/668ee548-a6f4-4b37-9d7a-18d5fb6a54e3/IMG_0519.jpeg`,
    lodgingBookingUrl: "https://www.airbnb.com/rooms/49259696",
    lodgingImage: "/photos/2021/st-george-lodging.png",
    courses: [
      { name: "Sunriver Golf Course", image: "https://sunriverres.wpenginepowered.com/wp-content/uploads/2024/06/SRR_Meadows-Golf_Fall-2022_Wicked_ARR_DJI_0014.jpg", description: "William Neff's 2000 design sits at the south end of St. George inside the SunRiver master-planned community, with the red sandstone walls of Snow Canyon framing the back nine from the west on clear days. The course plays 7,020 yards from the tips (slope 126) and leans on strategic waste areas and a split personality between a flat, pond-threaded front and a more exposed, challenging back — the par-5 17th at 514 yards is the honest closer you earn. Not the flashiest track in the valley, but a warm-up round with forgiving fairways, legit bent-grass greens, and a fraction of the green fee.", holes: 18 },
      { name: "Sunbrooke Golf Course", url: "https://www.sunbrookgolf.com", image: "https://cdn.greaterzion.com/wp-content/uploads/2019/04/22154748/golf-course-sunbrook1.jpg", description: "Ted Robinson Sr. designed all 27 holes here in 1990, and the three distinct nines — Pointe, Woodbridge, and Blackrock — each read like a different course: Pointe pushes out into canyon plateaus, Woodbridge plays through cottonwoods with a legitimate island-green par-3, and Blackrock carves directly through ancient lava fields where missing the fairway means cracked rock, not rough. Golf Digest handed it a 4-star rating and ranked it among the top 50 municipal courses in the country, and GolfWeek slots it No. 8 in Utah. Playing 36 here in a single day — any two nines you want — is the kind of value decision that makes a serious golf trip itinerary look smart.", holes: 18 },
      { name: "Southgate Golf Club", url: "https://southgategc.com", image: "https://cdn.greaterzion.com/wp-content/uploads/2019/04/22153624/golf-course-southgate1.jpg", description: "Opened in 1965 and renovated by John Lagant in 2006, Southgate is a city-owned layout that earns its place not on pedigree but on drama — the front nine hugs the Santa Clara River with eight of nine holes carrying water, while the back climbs into Black Hill's volcanic terrain with elevation swings, desert washes, and canyon-wall sightlines toward Snow Canyon State Park. At 6,270 yards (par 71) it plays shorter than it looks, but the transition from river-valley target golf to lava-rock hillside holes mid-round is genuinely disorienting in the best way. For a municipal course at municipal prices, the variety of terrain punches well above the green fee.", holes: 18 },
    ],
    restaurants: [],
    schedule: [
      {
        day: "Arrival",
        date: "June 23",
        subtitle: "Arrival in red rock country",
        items: [
          { time: "—", activity: "Arrive in St. George", detail: "✈️ Fly in", type: "activity" as const, location: "St. George, UT" },
        ],
      },
      {
        day: "Day 1",
        date: "June 24",
        subtitle: "Day 1 — Red sandstone and Snow Canyon views",
        items: [
          {
            time: "9:00 AM",
            activity: "Sunriver Golf Course",
            detail: "18 holes",
            type: "golf",
            location: "St. George, UT",
            description: "William Neff's 2000 design sits at the south end of St. George, with the red sandstone walls of Snow Canyon framing the back nine from the west on clear days. Plays 7,020 yards from the tips (slope 126) and leans on strategic waste areas and a split personality between a flat, pond-threaded front and a more exposed, challenging back. The par-5 17th at 514 yards is the honest closer you earn — forgiving fairways, legit bent-grass greens, and a fraction of the green fee.",
            facts: ["Desert links", "Snow Canyon views"],
          },
          {
            time: "2:00 PM",
            activity: "Sunriver Golf Course",
            detail: "18 holes (afternoon loop)",
            type: "golf",
            location: "St. George, UT",
            description: "Second loop under the desert sun — bring more water than you think you need.",
          },
        ],
      },
      {
        day: "Day 2",
        date: "June 25",
        subtitle: "Day 2 — Lava fields and three distinct nines",
        items: [
          {
            time: "9:00 AM",
            activity: "Sunbrooke Golf Course",
            detail: "18 holes",
            type: "golf",
            location: "St. George, UT",
            description: "Ted Robinson Sr. designed all 27 holes here in 1990, and the three nines — Pointe, Woodbridge, and Blackrock — each read like a different course: Pointe pushes out into canyon plateaus, Woodbridge plays through cottonwoods with a legitimate island-green par-3, and Blackrock carves directly through ancient lava fields where missing the fairway means cracked rock, not rough. Golf Digest handed it a 4-star rating and ranked it among the top 50 municipal courses in the country, and GolfWeek slots it No. 8 in Utah. Playing 36 in a single day here — any two nines you want — is the kind of value decision that makes a trip look smart.",
            facts: ["27-hole facility", "Lava field routing"],
          },
          {
            time: "2:00 PM",
            activity: "Sunbrooke Golf Course",
            detail: "18 holes (afternoon loop)",
            type: "golf",
            location: "St. George, UT",
            description: "Afternoon loop on a different pairing of nines — the black lava bakes and the greens get glassy.",
          },
        ],
      },
      {
        day: "Day 3",
        date: "June 26",
        subtitle: "Day 3 — Dramatic canyon walls at Southgate",
        items: [
          {
            time: "10:00 AM",
            activity: "Southgate Golf Club",
            detail: "18 holes",
            type: "golf",
            location: "St. George, UT",
            description: "Opened in 1965 and renovated by John Lagant in 2006, Southgate is a city-owned layout that earns its place not on pedigree but on drama — the front nine hugs the Santa Clara River with eight of nine holes carrying water, while the back climbs into Black Hill's volcanic terrain with elevation swings, desert washes, and canyon-wall sightlines toward Snow Canyon State Park. At 6,270 yards (par 71) it plays shorter than it looks, but the transition from river-valley target golf to lava-rock hillside holes mid-round is genuinely disorienting in the best way. Variety of terrain that punches well above the municipal green fee.",
            facts: ["Canyon walls", "Municipal"],
          },
          {
            time: "3:00 PM",
            activity: "Southgate Golf Club",
            detail: "18 holes (afternoon loop)",
            type: "golf",
            location: "St. George, UT",
            description: "Final round — red walls turn orange, then blood red, as the sun drops behind them.",
          },
        ],
      },
      {
        day: "Departure",
        date: "June 27",
        subtitle: "Depart — 108 holes, 3 courses",
        items: [
          { time: "—", activity: "Depart St. George", detail: "✈️ Fly out", type: "activity" as const, location: "St. George, UT" },
        ],
      },
    ],
    photoSections: [],
    gallery: [
      `${SQ}/668ee548-a6f4-4b37-9d7a-18d5fb6a54e3/IMG_0519.jpeg`,
      `${SQ}/a560dd9a-d1e6-495c-87f9-a5892e234d21/IMG_2202.jpeg`,
      `${SQ}/d47ad341-f26b-4642-b8ea-2992d589a9bb/IMG_0507.jpeg`,
      `${SQ}/9a8233a5-d8e7-4898-acf3-2f22c09f4197/IMG_0807.JPG`,
      `${SQ}/98bf3675-644e-40f0-b2af-f4b3010991bd/IMG_0788.jpeg`,
      `${SQ}/a2b4c577-36fa-470f-a6f5-1911cab3240e/IMG_2204.jpeg`,
      `${SQ}/8e2f1d09-48e3-401a-b1a1-e65627c37fe3/IMG_3459.jpeg`,
      `${SQ}/aafbcb8a-2e77-4f53-9944-6a45e267788a/IMG_3492.jpeg`,
      `${SQ}/7eab2fc0-cb43-497d-8b9d-076c6fd53296/IMG_3500.jpeg`,
      `${SQ}/ae0984a5-620a-411b-ac18-23e46eae0bae/IMG_3505.jpeg`,
      `${SQ}/26051ec9-9c37-4c26-b9a3-d5af97470c90/IMG_0524.jpeg`,
      `${SQ}/bb7b29d0-a1e7-4fd0-8624-f8eb2dbd0ff4/IMG_2206.jpeg`,
      `${SQ}/b772b9ae-d9c0-455b-b398-7da97c95f060/IMG_0527.jpeg`,
      `${SQ}/88932243-0deb-44be-81e7-af2993828c16/IMG_2210.jpeg`,
      `${SQ}/919c5304-c64d-4c4b-8a20-b5e918a0e8e0/IMG_3510.jpeg`,
      `${SQ}/28fb0e52-8fe2-41f8-bbb8-a4eb2d3efe03/IMG_2213.jpeg`,
      `${SQ}/32906f2b-9891-496e-966f-8c68f3017c20/IMG_3516.jpeg`,
      `${SQ}/569bd678-66eb-4d56-820b-7e0c1758a215/IMG_2209.jpeg`,
      `${SQ}/de5327cc-44ca-4919-b8ed-dbcc1d1facc8/IMG_2218.jpeg`,
      `${SQ}/b674cf2e-b5bb-4406-bfe5-abc5ece0eb3e/IMG_3518.jpeg`,
      `${SQ}/b11fae26-d3d4-4cda-be02-0e871c24165f/IMG_3520.jpeg`,
      `${SQ}/f9b8af98-7e3e-4dbd-bced-9174968f5a32/IMG_3522.jpeg`,
      `${SQ}/8f9db074-48ca-4f9c-b45f-6a630b554056/IMG_2223.jpeg`,
      `${SQ}/800c670d-5bc9-4532-9a24-8f9a9e37dd05/IMG_3524.jpeg`,
      "/photos/2021/IMG_0097.jpeg",
      "/photos/2021/IMG_0104.jpeg",
      "/photos/2021/IMG_0119.jpeg",
      "/photos/2021/IMG_0520.jpeg",
      "/photos/2021/IMG_0533.jpeg",
      "/photos/2021/IMG_0789.jpeg",
      "/photos/2021/IMG_2239.jpeg",
      "/photos/2021/IMG_3602.jpeg",
      "/photos/2021/IMG_7044.jpeg",
    ],
  },
];

export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find((t) => t.slug === slug);
}
