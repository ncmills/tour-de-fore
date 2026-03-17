export interface ScheduleItem {
  time: string;
  activity: string;
  detail?: string;
  type: "golf" | "dining" | "activity" | "nightlife";
}

export interface DaySchedule {
  day: string;
  date: string;
  items: ScheduleItem[];
}

export interface Course {
  name: string;
  url?: string;
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
  tagline: string;
  dates: string;
  heroImage: string;
  courses: Course[];
  schedule: DaySchedule[];
  photoSections: PhotoSection[];
  gallery: string[];
  upcoming?: boolean;
  lodgingAddress?: string;
}

const SQ = "https://images.squarespace-cdn.com/content/v1/62cb87cca6b36f353a2575d5";

export const trips: Trip[] = [
  {
    year: 2026,
    slug: "2026",
    location: "Kohler",
    state: "Wisconsin",
    tagline: "Hell is empty, and all 16 devils are here.",
    dates: "July 7 \u2013 12, 2026",
    upcoming: true,
    lodgingAddress: "1489 Shoreline Dr, Kohler, WI",
    heroImage: `${SQ}/b6c09435-bdb9-495f-8c09-90dd2abbf79e/Screenshot+2025-07-05+at+7.21.00%E2%80%AFPM.png`,
    courses: [
      { name: "Erin Hills", url: "https://erinhills.com" },
      { name: "Whistling Straits", url: "https://kohlerwisconsin.com" },
      { name: "Blackwolf Run", url: "https://kohlerwisconsin.com" },
      { name: "Quit Qui Oc" },
      { name: "The Bull at Pinehurst Farms", url: "https://golfthebull.com" },
    ],
    schedule: [
      {
        day: "Wednesday",
        date: "July 8",
        items: [
          { time: "9:00 AM", activity: "Salmon & Trout Fishing Charter", detail: "Lake Michigan", type: "activity" },
          { time: "7:00 PM", activity: "The Blind Horse", detail: "Dinner", type: "dining" },
        ],
      },
      {
        day: "Thursday",
        date: "July 9",
        items: [
          { time: "9:00 AM", activity: "Erin Hills", detail: "18 holes", type: "golf" },
          { time: "2:00 PM", activity: "Quit Qui Oc", detail: "18 holes", type: "golf" },
          { time: "8:00 PM", activity: "Private Chef @ House", detail: "Dinner", type: "dining" },
        ],
      },
      {
        day: "Friday",
        date: "July 10",
        items: [
          { time: "9:00 AM", activity: "Whistling Straits", detail: "18 holes", type: "golf" },
          { time: "2:00 PM", activity: "The Bull at Pinehurst Farms", detail: "18 holes", type: "golf" },
          { time: "8:00 PM", activity: "River Wildlife", detail: "Dinner", type: "dining" },
        ],
      },
      {
        day: "Saturday",
        date: "July 11",
        items: [
          { time: "9:03 AM", activity: "Blackwolf Run", detail: "18 holes", type: "golf" },
          { time: "2:00 PM", activity: "Blackwolf Run", detail: "18 holes", type: "golf" },
          { time: "8:00 PM", activity: "Private Chef @ House", detail: "Dinner", type: "dining" },
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
    tagline: "16 lads with 108 chances to triple bogey.",
    dates: "June 24 \u2013 29, 2025",
    heroImage: `${SQ}/03de264c-9108-4366-8a98-daa0b63fa515/IMG_2259.jpeg`,
    courses: [
      { name: "Boulder Canyon Golf Course" },
      { name: "Elkhorn Ridge Resort" },
      { name: "Spearfish Canyon Golf Course" },
    ],
    schedule: [
      {
        day: "Wednesday",
        date: "June 25",
        items: [
          { time: "12:00 PM", activity: "ATV Shenanigans", detail: "Custer Peak Rd, Deadwood", type: "activity" },
        ],
      },
      {
        day: "Thursday",
        date: "June 26",
        items: [
          { time: "9:10 AM", activity: "Boulder Canyon Golf Course", detail: "18 holes", type: "golf" },
          { time: "2:00 PM", activity: "Boulder Canyon Golf Course", detail: "18 holes", type: "golf" },
          { time: "8:00 PM", activity: "Legends Steakhouse & Casino", detail: "Dinner", type: "dining" },
        ],
      },
      {
        day: "Friday",
        date: "June 27",
        items: [
          { time: "9:00 AM", activity: "Elkhorn Ridge Resort", detail: "18 holes", type: "golf" },
          { time: "2:00 PM", activity: "Elkhorn Ridge Resort", detail: "18 holes", type: "golf" },
          { time: "8:00 PM", activity: "Mavericks Steakhouse & Casino", detail: "Dinner", type: "dining" },
        ],
      },
      {
        day: "Saturday",
        date: "June 28",
        items: [
          { time: "9:03 AM", activity: "Spearfish Canyon Golf Course", detail: "18 holes", type: "golf" },
          { time: "2:00 PM", activity: "Spearfish Canyon Golf Course", detail: "18 holes", type: "golf" },
        ],
      },
      {
        day: "Nightly",
        date: "Wed \u2013 Sat",
        items: [
          { time: "9:00 PM", activity: "Downtown Deadwood", detail: "General Chaos", type: "nightlife" },
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
    ],
  },
  {
    year: 2024,
    slug: "2024",
    location: "Bend",
    state: "Oregon",
    tagline: "16 lads with 108 chances to triple bogey.",
    dates: "August 21 \u2013 25, 2024",
    lodgingAddress: "16155 Skyliners Rd, Bend, OR 97701",
    heroImage: `${SQ}/40030cd0-2783-4cca-ab1b-ec4b3d674471/a.jpeg`,
    courses: [
      { name: "Pronghorn", url: "https://juniperpreserve.com/golf/jack-nicklaus-signature-course/" },
      { name: "Juniper", url: "https://playjuniper.com" },
      { name: "Widgi", url: "https://widgi.com" },
      { name: "Tetherow", url: "https://tetherow.com" },
    ],
    schedule: [
      {
        day: "Thursday",
        date: "August 22",
        items: [
          { time: "9:00 AM", activity: "Pronghorn", detail: "18 holes", type: "golf" },
          { time: "2:00 PM", activity: "Pronghorn", detail: "18 holes", type: "golf" },
        ],
      },
      {
        day: "Friday",
        date: "August 23",
        items: [
          { time: "9:00 AM", activity: "Juniper", detail: "18 holes", type: "golf" },
          { time: "2:00 PM", activity: "Juniper", detail: "18 holes", type: "golf" },
        ],
      },
      {
        day: "Saturday",
        date: "August 24",
        items: [
          { time: "9:00 AM", activity: "Widgi", detail: "18 holes", type: "golf" },
          { time: "2:00 PM", activity: "Tetherow", detail: "18 holes", type: "golf" },
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
    ],
  },
  {
    year: 2023,
    slug: "2023",
    location: "Lexington",
    state: "Kentucky",
    tagline: "24 all-stars (some of whom golf), 6 rounds, 3 days.",
    dates: "June 29 \u2013 July 1, 2023",
    heroImage: `${SQ}/d0910eb3-ce7f-4395-8e75-06414a70a916/DSC01441.JPG`,
    courses: [
      { name: "Kearney Hill Golf Course", url: "https://www.lexingtonky.gov/kearney-hill-golf-links" },
      { name: "Cherry Blossom Golf Course", url: "https://www.cherryblossomgolf.com" },
      { name: "University of Kentucky Club", url: "https://www.uclubkentucky.com" },
    ],
    schedule: [
      {
        day: "Thursday",
        date: "June 29",
        items: [
          { time: "8:50 AM", activity: "Kearney Hill Golf Course", detail: "18 holes", type: "golf" },
          { time: "3:00 PM", activity: "Kearney Hill Golf Course", detail: "18 holes", type: "golf" },
        ],
      },
      {
        day: "Friday",
        date: "June 30",
        items: [
          { time: "9:45 AM", activity: "Cherry Blossom Golf Course", detail: "18 holes", type: "golf" },
          { time: "2:45 PM", activity: "Cherry Blossom Golf Course", detail: "18 holes", type: "golf" },
        ],
      },
      {
        day: "Saturday",
        date: "July 1",
        items: [
          { time: "8:30 AM", activity: "University of Kentucky Club", detail: "18 holes", type: "golf" },
          { time: "2:12 PM", activity: "University of Kentucky Club", detail: "18 holes", type: "golf" },
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
    ],
  },
  {
    year: 2022,
    slug: "2022",
    location: "Boise",
    state: "Idaho",
    tagline: "16 guys, 6 rounds, 3 days.",
    dates: "June 2 \u2013 23, 2022",
    heroImage: `${SQ}/ff8d47e6-8753-45f8-b511-812d49db7bcd/IMG_0729.jpeg`,
    courses: [
      { name: "Falcon Crest Golf Club", url: "https://falconcrestgolf.com" },
      { name: "Quail Hollow Golf Course", url: "https://quailhollowboise.com" },
      { name: "Shadow Valley Golf Course" },
    ],
    schedule: [
      {
        day: "Day 1",
        date: "June 2",
        items: [
          { time: "9:00 AM", activity: "Falcon Crest Golf Club", detail: "18 holes", type: "golf" },
          { time: "2:00 PM", activity: "Falcon Crest Golf Club", detail: "18 holes", type: "golf" },
        ],
      },
      {
        day: "Day 2",
        date: "June 3",
        items: [
          { time: "10:00 AM", activity: "Quail Hollow Golf Course", detail: "18 holes", type: "golf" },
          { time: "3:00 PM", activity: "Quail Hollow Golf Course", detail: "18 holes", type: "golf" },
        ],
      },
      {
        day: "Day 3",
        date: "June 23",
        items: [
          { time: "10:00 AM", activity: "Shadow Valley Golf Course", detail: "18 holes", type: "golf" },
          { time: "3:00 PM", activity: "Shadow Valley Golf Course", detail: "18 holes", type: "golf" },
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
    ],
  },
  {
    year: 2021,
    slug: "2021",
    location: "St. George",
    state: "Utah",
    tagline: "18 guys, 6 rounds, 3 days.",
    dates: "June 24 \u2013 26, 2021",
    heroImage: `${SQ}/668ee548-a6f4-4b37-9d7a-18d5fb6a54e3/IMG_0519.jpeg`,
    courses: [
      { name: "Sunriver Golf Course" },
      { name: "Sunbrooke Golf Course", url: "https://www.sunbrookgolf.com" },
      { name: "Southgate Golf Club", url: "https://southgategc.com" },
    ],
    schedule: [
      {
        day: "Day 1",
        date: "June 24",
        items: [
          { time: "9:00 AM", activity: "Sunriver Golf Course", detail: "18 holes", type: "golf" },
          { time: "2:00 PM", activity: "Sunriver Golf Course", detail: "18 holes", type: "golf" },
        ],
      },
      {
        day: "Day 2",
        date: "June 25",
        items: [
          { time: "9:00 AM", activity: "Sunbrooke Golf Course", detail: "18 holes", type: "golf" },
          { time: "2:00 PM", activity: "Sunbrooke Golf Course", detail: "18 holes", type: "golf" },
        ],
      },
      {
        day: "Day 3",
        date: "June 26",
        items: [
          { time: "10:00 AM", activity: "Southgate Golf Club", detail: "18 holes", type: "golf" },
          { time: "3:00 PM", activity: "Southgate Golf Club", detail: "18 holes", type: "golf" },
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
    ],
  },
];

export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find((t) => t.slug === slug);
}
