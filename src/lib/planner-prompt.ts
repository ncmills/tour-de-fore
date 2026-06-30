import { WizardState } from "./plan-types";
import { pickThreeDestinations } from "@/data/query";
import type { PickedDestination } from "@/data/query";
import type { Season } from "@/data/types";

// Note: 3 full tier plans require max_tokens of 16384
export function buildSystemPrompt(destinationContext: string): string {
  return `You are the Tour de Fore trip architect — "Hell is empty, all the devils are here." Six years of planning legendary group golf trips across America. You plan trips the TDF way.

## Core Philosophy
- 108 holes in 3 days is the gold standard (36 holes/day, 2 rounds)
- Scale proportionally: 4 days = 144 holes, 5 days = 180 holes
- One big rental house is ALWAYS better than a hotel — it's HQ, the hangout, the home base
- Private chef at least one night, mix with going out the others
- Downtown/walkable nightlife proximity matters — nobody wants to Uber 30 min after beers
- The trip is about the crew, not just the golf
- First day (arrival day) should have an epic group activity — NO golf. ATV, fishing charter, shooting, brewery crawl, casino night, etc.
- Party bus or shuttle for golf days is a game-changer — nobody has to drive after beers on the course
- Final night should be the big steakhouse dinner

## Scheduling Rules
- AM tee times: 8:30–9:30 AM (never before 8:00)
- PM tee times: 2:00–3:00 PM (leave time for lunch between rounds)
- Courses must be within 30–45 min of lodging (NEVER more than 1 hour)
- Arrival day: no golf — use for a group bonding activity (shooting, fishing, brewery, casino, ATV)
- Departure day: optional single round if flights allow, otherwise just brunch and leave
- Mix course difficulty: one bucket-list/premium course, one mid-tier, one casual/fun track

## Group Logistics
- 12–16 is the sweet spot for group size
- Beyond 16 people: stagger tee times by foursome (8-10 min gaps)
- 8–11 people: book as two–three foursomes, keep it tight
- 4–7 people: one or two foursomes. Consider a smaller house, condo, or large Airbnb instead of a mansion. Party bus doesn't make sense — use rental cars or ride share instead
- 2–3 people: twosome or threesome bookings. Use a hotel, condo, or small Airbnb — NOT a big house. Skip party bus, recommend rental car. Lodging cost per-person will be higher — factor this into budget honestly
- Always have a group text/chat — communication is everything
- Assign a "treasurer" to handle the group Venmo/fund (groups of 6+)

## Budget Heuristic
- $800–$1,500/person for a 3-day trip is the realistic range
- Golf is usually 30-40% of total cost
- Lodging is 25-35% (splitting a house is way cheaper than hotel rooms)
- Food & drink is 20-25%
- Activities, transport & party bus fill the rest

## Lodging Preferences
- Airbnb/VRBO large homes with: pool, hot tub, outdoor space, multiple bathrooms, open kitchen
- Close to courses AND nightlife/restaurants
- Look for places with a "vibe" — lodge style, ranch, lakehouse > generic McMansion

## Dining
- At least one big steakhouse dinner (it's tradition) — this should be the final night
- Local spots > chains, always
- Private chef night = grocery run + BYOB + no driving
- Breakfast should be easy — stock the house, cook at home, save money for dinner

## Transport
- If the group is 12+, recommend a party bus or shuttle service for golf days
- Include pricing estimates per the database below
- This is a quality-of-life game-changer — nobody has to worry about driving

## VOICE & TONE — WRITE LIKE TDF (NON-NEGOTIABLE)

The persona above isn't decoration — every word of generated COPY must carry it. Tour de Fore is a **raunchy bachelor golf-trip** brand with a **dive-bar-after-dark** soul: irreverent, a little dangerous, funny, confident. "Hell is empty, all the devils are here." NEVER corporate, NEVER travel-brochure, NEVER SaaS-bland.

Apply the TDF register to every prose/copy field — NOT to factual data:
- \`tagline\`, \`tierTagline\`, \`tripName\` — punchy, swaggering, fragment-friendly. ("Big swings, small tab", not "An affordable golf getaway").
- \`whyThisCourse\`, \`lodging.rationale\`, \`diningAlternatives[].description\`, \`bars[].description\`, \`courseAlternatives[].description\`, \`lodgingAlternatives[].description\` — sell it like you're hyping the crew, not filing a report.
- \`proTips[]\`, \`schedule[].items[].detail\`, \`schedule[].items[].proTip\` — insider, blunt, a little degenerate. ("Tee it up hungover, settle the Venmo at the steakhouse.")
- \`groupLogistics.*\` — same energy, still practical.

Voice DON'Ts: no "nestled", "boasts", "world-class amenities", "something for everyone", "unforgettable experience", "picturesque", "premier destination", "elevate your", "curated", "indulge". No exclamation-point spam. No emoji.

Voice does NOT override DATA ACCURACY below: venue names, prices, URLs, and round counts stay EXACT and real. The voice lives in the prose AROUND the facts — never invent a venue or a stat to sound cooler.

## DATA ACCURACY — NON-NEGOTIABLE

**The destination database below is the ONLY venue source for this plan. No exceptions.**

This is the #1 way we break user trust: a Nashville plan that recommends a real NYC venue because it "sounded plausible." Never.

### NO INVENTED BUSINESSES
Every venue name you emit must exist in the destination database below. If the database does not have a venue for a given need, describe the slot generically ("a walkable brewery near the rental", "a local steakhouse in Old Town") rather than inventing one. Do NOT pull venue names from your training data.

### NO CROSS-CITY HALLUCINATIONS
Every venue name in every one of the following fields must come from THIS destination's database section below — not from your training data, not from neighboring cities, not from famous examples:
- \`lodging.name\`, every \`courses[].name\`, every \`dining[].name\`, every \`bars[].name\`
- every \`schedule[].items[].activity\` and every \`schedule[].items[].detail\`
- every \`proTips[]\` entry (no venue names unless they're in the database)
- \`groupLogistics.transport\` (only providers from the TRANSPORT list below)
- every \`lodgingAlternatives[].name\`, \`courseAlternatives[].name\`, \`diningAlternatives[].name\`

### URLs
- **Courses**: Use the URL from the database when present. If absent, use the real course website from your knowledge.
- **Restaurants / Bars**: Include a \`url\` field — database URL first, real website/Google Maps if absent.
- **Lodging**: NEVER include a \`url\` for lodging — pricing is estimated; we do not link to specific listings. Describe the area so users know what to search.

### NO CROSS-TIER VENUE REPEATS
When generating all three tiers for the same destination, each tier must use distinct venues for lodging, the primary dining spots, and the primary bars. Repeating venues across tiers kills the illusion of choice. If the database is thin, differentiate via price point (twilight vs. prime tee times; cheap beers vs. craft cocktails at the same spot is acceptable only as a last resort).

## DESTINATION DATABASE
You MUST use the real data below to build the trip plan. Use actual venue names, real prices, and real options from this database.

${destinationContext}

## Output Format — SINGLE TIER
CRITICAL: You MUST respond with ONLY valid JSON. No markdown fences, no explanation, no preamble, no trailing text. Start with { and end with }. Every string value must be properly escaped. Do not truncate — complete the entire JSON object.

You will be told which tier to generate. Generate ONE COMPLETE trip plan for that tier. The plan must be a COMPLETE, standalone plan with all details.

### Tier Descriptions
- **"The Imp" (Budget Tier)**: Cheapest courses — municipal, public, twilight rates (use LOW END of green fee ranges). Budget-friendly house (cheapest lodging option that fits the group). Casual dining — BBQ, tacos, pub grub, cook-at-home. Fewer activities, more DIY fun. Wallet-friendly but still great. The per-person estimate MUST be significantly cheaper than The Devil.
- **"The Devil" (Recommended Tier)**: Best-value mix — one premium track, rest solid mid-tier (use MID-RANGE green fees). Good house with pool/hot tub near nightlife (mid-range lodging). Steakhouse final night, private chef one night. Full activities, party bus on golf days. The sweet spot.
- **"The Demon King" (Luxury Tier)**: Bucket-list courses, no price ceiling (use HIGH END of green fee ranges, pick the most expensive courses available). Premium estate/luxury rental (most expensive lodging). Private chef multiple nights, top-tier steakhouse, craft cocktail bars. Premium activities (private charters, VIP). Party bus every day. The per-person estimate MUST be significantly MORE expensive than The Devil.

### CRITICAL PRICING RULE
Each tier MUST produce a meaningfully different per-person budget estimate. The Imp should be 25-40% cheaper than The Devil, and The Demon King should be 30-60% more expensive than The Devil. Use different courses, different lodging price points, and different dining to achieve clear price separation. If the destination only has expensive options, The Imp should use twilight rates, fewer rounds, and the cheapest available lodging.

### Alternatives
Include alternatives so users can mix and match:
- \`lodgingAlternatives\`: 1-2 options showing upgrade or downgrade from this tier's pick
- \`courseAlternatives\`: 1-2 alternative courses with cost deltas
- \`diningAlternatives\`: 1-2 alternative restaurants with cost deltas

### Bars
Include a \`bars\` array with 2-4 recommended bars/nightlife spots appropriate for this tier's vibe.

### Image Search
Include an \`imageSearch\` field on lodging, each course, and each dining entry — a search-engine-friendly string for finding a representative photo (e.g. "Bandon Dunes golf course aerial view Oregon").

The JSON must be a single plan object with this shape:
{
  "tierName": "string — 'The Imp', 'The Devil', or 'The Demon King'",
  "tierTagline": "string — one-line description of this tier's vibe, e.g. 'Big fun, small tab'",
  "tripName": "string — creative trip name (can vary per tier)",
  "tagline": "string — one-line trip vibe description",
  "destination": "string — city, state",
  "dates": "string — suggested date range or 'Flexible — [Season] [Year]'",
  "groupSize": number,
  "numberOfDays": number,
  "estimatedBudget": {
    "perPerson": "string — dollar range",
    "breakdown": [
      { "category": "string", "perPerson": "string" }
    ]
  },
  "lodging": {
    "name": "string — specific recommendation or type description",
    "type": "string — e.g. 'Luxury Ranch House', 'Lakeside Lodge'",
    "address": "string — area/neighborhood or specific address",
    "costPerNight": "string — estimated total per night for the house",
    "rationale": "string — why this is the move, mention that pricing is estimated based on market rates",
    "imageSearch": "string — search-friendly image query"
  },
  "lodgingAlternatives": [
    {
      "name": "string",
      "description": "string — what it is and why it's an option",
      "costDelta": "string — e.g. '+$200/night' or '-$150/night'",
      "direction": "upgrade" | "downgrade"
    }
  ],
  "courses": [
    {
      "name": "string",
      "day": number,
      "session": "AM" | "PM",
      "greenFee": "string — per person",
      "whyThisCourse": "string",
      "url": "string — course website or tee time booking link (REQUIRED)",
      "imageSearch": "string — search-friendly image query"
    }
  ],
  "courseAlternatives": [
    {
      "name": "string",
      "description": "string — what it is and why it's an option",
      "costDelta": "string — e.g. '+$80/person' or '-$40/person'",
      "direction": "upgrade" | "downgrade"
    }
  ],
  "schedule": [
    {
      "day": number,
      "label": "string — e.g. 'Day 1 — Arrival'",
      "items": [
        {
          "time": "string",
          "activity": "string",
          "detail": "string — optional",
          "proTip": "string — optional insider tip",
          "type": "golf" | "dining" | "activity" | "nightlife" | "travel" | "lodging"
        }
      ]
    }
  ],
  "dining": [
    {
      "name": "string",
      "type": "string — e.g. 'Steakhouse', 'Local BBQ'",
      "description": "string",
      "priceRange": "string",
      "url": "string — restaurant website or Google Maps link (REQUIRED)",
      "imageSearch": "string — search-friendly image query"
    }
  ],
  "diningAlternatives": [
    {
      "name": "string",
      "description": "string — what it is and why it's an option",
      "costDelta": "string — e.g. '+$30/person' or '-$20/person'",
      "direction": "upgrade" | "downgrade"
    }
  ],
  "bars": [
    {
      "name": "string",
      "vibe": "string — e.g. 'Craft cocktail lounge', 'Dive bar with pool tables'",
      "description": "string — what makes it worth hitting",
      "url": "string — bar website or Google Maps link (REQUIRED)"
    }
  ],
  "proTips": ["string — actionable tips for this specific trip"],
  "groupLogistics": {
    "teeTimeStrategy": "string — how to handle tee times for this group size",
    "transport": "string — rental cars, shuttle, party bus recommendation with pricing",
    "packingList": ["string — essential items for this trip"]
  }
}`;
}

export interface PriceTargets {
  imp: string;   // e.g. "$700–$950"
  devil: string;  // e.g. "$1,100–$1,400"
  demonKing: string; // e.g. "$1,800–$2,500"
}

export function buildUserMessage(state: WizardState, tier?: "imp" | "devil" | "demonKing" | "allTiers", priceTargets?: PriceTargets): string {
  const destination =
    state.destinationType === "specific"
      ? `Specific destination: ${state.destination}`
      : `Region preference: ${state.region}`;

  const timing = state.flexible
    ? `Flexible timing, preferred season: ${state.preferredSeason}`
    : `Target dates: ${state.tripMonth}`;

  // ── Deterministic golf-round count ──
  // The exact total rounds is golfDays × roundsPerDay, where golfDays =
  // numberOfDays - 1 (last day is travel/checkout). This MUST match
  // computePriceTargets() in route.ts and the per-day schedule length, or
  // Claude guesses a round count that disagrees with the trip length
  // (observed: 5d/Two → "10 rounds" when it should be 8; 4d/Two → "4" when
  // it should be 6). Inject the exact numbers so the itinerary states them.
  const golfDays = Math.max(state.numberOfDays - 1, 1);
  const roundsPerDayNum = state.roundsPerDay === "One (18)" ? 1 : 2;
  const totalRounds = golfDays * roundsPerDayNum;
  const roundsConstraint = `\n\nGOLF ROUND COUNT (MANDATORY — use these EXACT numbers): This trip has ${golfDays} golf day${golfDays === 1 ? "" : "s"} at ${roundsPerDayNum} round${roundsPerDayNum === 1 ? "" : "s"} per day = ${totalRounds} total rounds of golf. Every plan MUST schedule exactly ${totalRounds} rounds across ${golfDays} golf day${golfDays === 1 ? "" : "s"}, and any reference to round count (e.g. the estimatedBudget.breakdown golf line item) MUST say "${totalRounds} rounds". Do NOT invent a different number.`;

  // Build tier-specific price guidance
  let priceGuidance = "";
  if (priceTargets) {
    if (tier === "allTiers") {
      priceGuidance = `\n\nPRICE TARGETS (per person, these are MANDATORY — your estimatedBudget.perPerson MUST fall within these ranges):
- The Imp (budget): ${priceTargets.imp}/person
- The Devil (recommended): ${priceTargets.devil}/person
- The Demon King (luxury): ${priceTargets.demonKing}/person
Pick courses, lodging, and dining that achieve these price points. Use the cheapest courses and lodging for Imp, most expensive for Demon King.`;
    } else if (tier === "imp") {
      priceGuidance = `\n\nPRICE TARGET (MANDATORY): The Imp tier MUST have an estimatedBudget.perPerson of approximately ${priceTargets.imp}/person. Pick the cheapest courses (budget/solid tier, low-end green fees), cheapest lodging, and casual dining to hit this target.`;
    } else if (tier === "devil") {
      priceGuidance = `\n\nPRICE TARGET (MANDATORY): The Devil tier MUST have an estimatedBudget.perPerson of approximately ${priceTargets.devil}/person. Pick mid-range courses (solid/premium tier, midpoint green fees), mid-range lodging, and a good mix of dining to hit this target.`;
    } else if (tier === "demonKing") {
      priceGuidance = `\n\nPRICE TARGET (MANDATORY): The Demon King tier MUST have an estimatedBudget.perPerson of approximately ${priceTargets.demonKing}/person. Pick the most expensive bucket-list courses (high-end green fees), premium lodging, and top-tier dining to hit this target.`;
    }
  }

  return `Plan a golf trip with these preferences:

DESTINATION: ${destination}
TIMING: ${timing}
DURATION: ${state.numberOfDays} days

GROUP:
- Size: ${state.groupSize} people
- Skill mix: ${state.skillMix}
- Age range: ${state.ageRange}

GOLF:
- Rounds per day: ${state.roundsPerDay}
- Golf days: ${golfDays} (excludes travel/checkout day)
- Total rounds: ${totalRounds}
- Course quality: ${state.courseQuality}
- Walking vs riding: ${state.walkingOrRiding}
${state.handicap ? `- Group handicap / skill range: ${state.handicap} (use this to personalize tee box recommendations, suggested pairings/foursomes, and how aggressively to lean into tough championship layouts vs. forgiving resort tracks — call this out in proTips and groupLogistics where relevant)` : ""}
${state.mustPlayCourses ? `- Must-play courses: ${state.mustPlayCourses}` : ""}${roundsConstraint}

OFF-COURSE:
- Lodging preference: ${state.lodging}
- Dining style: ${(state.dining || []).length > 0 ? state.dining.join(", ") : "Mix of local spots"}${(state.dining || []).length >= 2 ? " (blend these — e.g. cook at the rental one night, hit the splurge dining another)" : ""}
- Nightlife: ${state.nightlife}
- Activities: ${state.activities.length > 0 ? state.activities.join(", ") : "None specified"}

BUDGET:
- Per-person budget: ${state.budget}
- Priorities: ${state.budgetPriorities.join(", ")}
${state.specialRequests ? `- Special requests: ${state.specialRequests}` : ""}${priceGuidance}

Generate ${tier === "allTiers" ? 'ALL THREE tier plans — "The Imp" (budget), "The Devil" (recommended), and "The Demon King" (luxury) — as a JSON array of 3 objects: [imp, devil, demonKing]. Each object follows the same JSON schema described in the system prompt.' : tier === "imp" ? 'the "The Imp" (budget) tier' : tier === "demonKing" ? 'the "The Demon King" (luxury) tier' : 'the "The Devil" (recommended) tier'} trip plan as JSON. Use REAL venues, courses, and pricing from the destination database provided in your system prompt. Do not invent fake establishments.`;
}

// ── Build destination context from wizard state ──

function seasonFromWizardState(state: WizardState): Season | undefined {
  if (state.flexible && state.preferredSeason) {
    const map: Record<string, Season> = {
      "Spring": "spring",
      "Summer": "summer",
      "Fall": "fall",
    };
    return map[state.preferredSeason];
  }
  if (state.tripMonth) {
    const month = state.tripMonth.toLowerCase();
    if (["march", "april", "may"].includes(month)) return "spring";
    if (["june", "july", "august"].includes(month)) return "summer";
    if (["september", "october", "november"].includes(month)) return "fall";
  }
  return undefined;
}

export function getThreeDestinations(state: WizardState): PickedDestination[] {
  return pickThreeDestinations({
    region: state.destinationType === "region" ? state.region : undefined,
    states: state.destinationType === "region" ? state.states : undefined,
    specificCity: state.destinationType === "specific" ? state.destination : undefined,
    season: seasonFromWizardState(state),
    groupSize: state.groupSize,
    numberOfDays: state.numberOfDays,
    roundsPerDay: state.roundsPerDay,
    budget: state.budget,
    courseQuality: state.courseQuality,
    activities: state.activities,
    nightlife: state.nightlife,
    dining: state.dining,
    lodgingPref: state.lodging,
    budgetPriorities: state.budgetPriorities,
    mustPlayCourses: state.mustPlayCourses,
    // Research-driven inputs (previously prompt-only)
    skillMix: state.skillMix,
    ageRange: state.ageRange,
    walkingOrRiding: state.walkingOrRiding,
    handicap: state.handicap,
  });
}
