import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allDestinations } from "@/data";
import MulliganButton from "@/components/MulliganButton";
import HomeButton from "@/components/HomeButton";
import { NetworkFooter } from "@/components/NetworkFooter";
import { UnsplashHero } from "@/components/UnsplashHero";
import unsplashCache from "@/data/unsplash-cache.json";
import { slugify, tierLabel, tierColor, seasonLabel, STATE_NAMES, REGION_SLUGS } from "../../golf-trips/helpers";
import type { Region } from "@/data/types";

/* ── Guide definitions ── */
interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
}

const GUIDES: Guide[] = [
  {
    slug: "how-to-plan-a-group-golf-trip",
    title: "How to Plan a Group Golf Trip",
    metaTitle: "How to Plan a Group Golf Trip — Step-by-Step Guide | Tour de Fore",
    metaDescription: "Everything you need to plan a group golf trip: choosing a destination, booking courses, lodging for 4-16 guys, budgeting, and building an itinerary.",
    intro: "Planning a group golf trip doesn't have to be a logistical nightmare. Whether you're organizing 4 buddies or 16, here's a step-by-step guide using real data from 133 destinations across America.",
  },
  {
    slug: "best-golf-trip-destinations-by-month",
    title: "Best Golf Trip Destinations by Month",
    metaTitle: "Best Golf Trip Destinations by Month — When to Go Where | Tour de Fore",
    metaDescription: "Find the best golf trip destination for every month. Spring, summer, and fall picks based on weather, course conditions, and pricing across 133 cities.",
    intro: "Timing is everything on a golf trip. Play the wrong destination in the wrong season and you're looking at scorching heat, frozen greens, or peak pricing. Here's where to go, month by month.",
  },
  {
    slug: "best-walkable-golf-courses",
    title: "Best Walkable Golf Courses in America",
    metaTitle: "Best Walkable Golf Courses in America — Save on Cart Fees | Tour de Fore",
    metaDescription: "The best walkable golf courses across America. Save $20-30/round on cart fees and enjoy the course the way it was meant to be played.",
    intro: "Walking a course is the purest way to play golf — and it saves your group $20-30 per person per round on cart fees. Here are the best walkable courses in our database of 133 destinations.",
  },
  {
    slug: "golf-trip-budget-guide",
    title: "Golf Trip Budget Guide — What It Actually Costs",
    metaTitle: "Golf Trip Budget Guide — What a Group Golf Trip Actually Costs | Tour de Fore",
    metaDescription: "Real cost data from 133 golf destinations. Average green fees, lodging per person, dining costs, and total trip estimates for groups of 4, 8, and 12.",
    intro: "\"How much will this trip cost?\" is always the first question. Here's a data-driven answer using real pricing from our database of 133 destinations, 580+ courses, and hundreds of lodging options.",
  },
  {
    slug: "golf-trip-packing-list",
    title: "The Ultimate Golf Trip Packing List",
    metaTitle: "Golf Trip Packing List — What to Pack for a Group Golf Trip | Tour de Fore",
    metaDescription: "The complete golf trip packing list: golf gear, travel essentials, nightlife clothes, and the stuff most guys forget. Built for 3-5 day group trips.",
    intro: "Pack wrong and you're buying a $60 polo at the pro shop or playing in running shoes. Here's everything you actually need for a 3-5 day group golf trip — nothing more, nothing less.",
  },
  {
    slug: "best-golf-trips-under-500",
    title: "Best Golf Trips Under $500 Per Person",
    metaTitle: "Best Golf Trips Under $500 Per Person — Budget Destinations | Tour de Fore",
    metaDescription: "Golf trips that won't break the bank. Destinations where a 3-night, 2-round trip costs under $500/person including lodging, green fees, and food.",
    intro: "You don't need Pebble Beach money to have an incredible golf trip. These destinations deliver great courses, solid lodging, and good food — all for under $500 per person for a 3-night getaway.",
  },
  {
    slug: "desert-vs-coastal-vs-mountain-golf",
    title: "Desert vs Coastal vs Mountain Golf Trips",
    metaTitle: "Desert vs Coastal vs Mountain Golf — Which Style Is Right for You? | Tour de Fore",
    metaDescription: "Compare desert, coastal, and mountain golf trip experiences. Course styles, best seasons, typical pricing, and top destinations for each landscape.",
    intro: "The landscape shapes everything about a golf trip — the course design, the weather windows, the off-course activities, even the vibe. Here's how the three main golf landscapes compare.",
  },
  {
    slug: "best-golf-destinations-for-large-groups",
    title: "Best Golf Destinations for Large Groups (12+)",
    metaTitle: "Best Golf Destinations for Large Groups (12+) | Tour de Fore",
    metaDescription: "Destinations that can handle 12-16+ golfers: houses that sleep everyone, courses that accommodate big tee times, and restaurants for group dinners.",
    intro: "Big groups need destinations that can actually handle them — houses that sleep 12+, courses that won't split your tee times across 3 hours, and restaurants that seat 16 without a 2-week reservation. Here are the best options.",
  },
  {
    slug: "top-bucket-list-golf-courses",
    title: "Top 50 Bucket List Golf Courses You Can Actually Play",
    metaTitle: "Top 50 Bucket List Golf Courses You Can Actually Play | Tour de Fore",
    metaDescription: "The 50 best public-access golf courses in America. Top 100 rankings, PGA Tour hosts, and legendary layouts — all open to the public.",
    intro: "Forget the private clubs you'll never get on. These are the 50 best courses in America that you can actually book a tee time at — ranked by Google ratings, course rankings, and reputation.",
  },
  {
    slug: "first-time-golf-trip-mistakes",
    title: "12 Mistakes First-Time Golf Trip Planners Make",
    metaTitle: "12 Mistakes First-Time Golf Trip Planners Make | Tour de Fore",
    metaDescription: "Avoid the biggest golf trip planning mistakes: overbooking tee times, ignoring lodging logistics, skipping rest days, and 9 more that ruin trips.",
    intro: "After helping plan hundreds of golf trips, we've seen every mistake in the book. Here are the 12 that trip up first-timers — and how to avoid each one.",
  },
  {
    slug: "best-golf-trips-near-airports",
    title: "Best Golf Trips Near Major Airports",
    metaTitle: "Best Golf Trips Near Major Airports — Short Drives, More Golf | Tour de Fore",
    metaDescription: "Golf destinations within 45 minutes of a major airport. Skip the rental car marathon and spend more time on the course.",
    intro: "Nobody wants to land at 11am and tee off at 5pm after a 2-hour rental-car slog. These destinations are all within a 45-minute drive of a major airport — fly in, check in, play 18. Ranked by how quickly you can go from wheels-down to tee box.",
  },
  {
    slug: "best-fall-golf-trip-destinations",
    title: "Best Fall Golf Trip Destinations",
    metaTitle: "Best Fall Golf Trip Destinations — Shoulder Season Deals | Tour de Fore",
    metaDescription: "The best US golf destinations for fall (September-November). Cooler temps, empty courses, peak foliage, and shoulder-season pricing.",
    intro: "Fall is the experienced golfer's secret season — cooler temps, smaller crowds, gorgeous foliage, and meaningfully cheaper lodging at most destinations. Here are the top US spots to book between September and November.",
  },
];

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) return {};
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: `https://tourdefore.com/guides/${guide.slug}` },
    openGraph: { title: guide.metaTitle, description: guide.metaDescription, images: ["/icon-fancy.png"] },
  };
}

/* ── Shared styles ── */
const sectionTitle: React.CSSProperties = {
  fontFamily: "var(--font-plan-block), sans-serif",
  fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
  letterSpacing: "0.04em",
  color: "#EA580C",
  marginTop: "2.5rem",
  marginBottom: "0.75rem",
};
const prose: React.CSSProperties = {
  color: "rgba(255,255,255,0.65)",
  fontSize: "0.95rem",
  lineHeight: 1.85,
  maxWidth: 720,
};
const card: React.CSSProperties = {
  background: "#111",
  border: "1px solid #222",
  borderRadius: 10,
  padding: "1rem",
  textDecoration: "none",
  color: "#fff",
  display: "block",
};

function avg(arr: number[]) { return arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0; }

/* ── Guide content renderers ── */

function HowToPlan() {
  const steps = [
    { title: "Pick Your Dates", body: "Lock dates 3-6 months out. Shoulder seasons (late spring, early fall) offer the best combo of weather and pricing. Use our monthly guide to match your window to the right destination." },
    { title: "Choose a Destination", body: `We have ${allDestinations.length} destinations across 7 regions. Filter by budget, course quality, nightlife, or activities. The AI trip planner handles this in 60 seconds.` },
    { title: "Set Your Budget", body: `Average golf trip costs $${avg(allDestinations.flatMap((d) => d.courses.map((c) => c.greenFeeRange[0])))}-$${avg(allDestinations.flatMap((d) => d.courses.map((c) => c.greenFeeRange[1])))}/round for green fees. Lodging runs $${avg(allDestinations.flatMap((d) => d.lodging.map((l) => l.nightlyRange[0])))}-$${avg(allDestinations.flatMap((d) => d.lodging.map((l) => l.nightlyRange[1])))}/night for a group house. Set a per-person target and work backwards.` },
    { title: "Book Lodging First", body: "Group-friendly houses (8-16 sleepers) book fast, especially in popular destinations. Lock this down before courses — tee times are easier to adjust than losing the perfect house." },
    { title: "Plan 2-3 Rounds, Not 4", body: "The biggest mistake is overbooking golf. Two rounds per day sounds fun until day 3. Leave afternoons open for activities, exploring town, or just recovering." },
    { title: "Assign a Trip Captain", body: "One person collects money, makes reservations, and sends the itinerary. Everyone else just shows up. Venmo requests > group texts about splitting costs." },
    { title: "Build Your Itinerary", body: "Our AI planner builds a complete day-by-day itinerary with real courses, restaurants, and bars. Or use the destination guide pages for a DIY approach." },
  ];

  return (
    <>
      {steps.map((s, i) => (
        <div key={i}>
          <h2 style={sectionTitle}>{i + 1}. {s.title}</h2>
          <p style={prose}>{s.body}</p>
        </div>
      ))}
      <h2 style={sectionTitle}>Popular Starting Points</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(250px, 100%), 1fr))", gap: "0.75rem", marginTop: "0.75rem" }}>
        {["scottsdale-az", "myrtle-beach-sc", "pinehurst-nc", "bend-or", "austin-tx", "charleston-sc"].map((id) => {
          const d = allDestinations.find((x) => x.id === id);
          if (!d) return null;
          return (
            <Link key={id} href={`/golf-trips/${id}/guide`} style={card}>
              <strong>{d.city}, {d.state}</strong>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginTop: "0.2rem" }}>{d.courses.length} courses · {d.bars.length} bars</p>
            </Link>
          );
        })}
      </div>
    </>
  );
}

function ByMonth() {
  const months = [
    { month: "March–May (Spring)", seasons: ["spring"] as string[], note: "The sweet spot for most of America. Courses are fresh, prices are reasonable, weather is ideal." },
    { month: "June–August (Summer)", seasons: ["summer"] as string[], note: "Mountain and northern destinations peak. Avoid desert in summer unless you want to melt." },
    { month: "September–November (Fall)", seasons: ["fall"] as string[], note: "Shoulder season deals, cooler temps, and empty courses. The experienced golfer's favorite window." },
  ];

  return (
    <>
      {months.map(({ month, seasons, note }) => {
        const dests = allDestinations
          .filter((d) => seasons.some((s) => d.bestSeasons.includes(s as "spring" | "summer" | "fall")))
          .sort((a, b) => b.courses.length - a.courses.length)
          .slice(0, 8);
        return (
          <div key={month}>
            <h2 style={sectionTitle}>{month}</h2>
            <p style={{ ...prose, marginBottom: "1rem" }}>{note}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(250px, 100%), 1fr))", gap: "0.75rem" }}>
              {dests.map((d) => (
                <Link key={d.id} href={`/golf-trips/${d.id}`} style={card}>
                  <strong>{d.city}, {d.state}</strong>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginTop: "0.2rem" }}>{d.courses.length} courses · {seasonLabel(d.bestSeasons)}</p>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

function WalkableCourses() {
  const walkable = allDestinations
    .flatMap((d) => d.courses.filter((c) => c.walkable).map((c) => ({ course: c, dest: d })))
    .sort((a, b) => (b.course.googleRating || 0) - (a.course.googleRating || 0))
    .slice(0, 50);

  return (
    <>
      <p style={{ ...prose, marginBottom: "1.5rem" }}>
        {walkable.length} walkable courses across our database. Sorted by Google rating.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {walkable.map(({ course: c, dest: d }, i) => (
          <Link key={`${d.id}-${c.name}`} href={`/golf-trips/${d.id}/courses/${slugify(c.name)}`} style={{ ...card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", marginRight: "0.5rem" }}>#{i + 1}</span>
              <strong style={{ fontSize: "0.9rem" }}>{c.name}</strong>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginLeft: "0.5rem" }}>{d.city}, {d.state}</span>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", fontSize: "0.8rem", color: "#71717A", flexShrink: 0 }}>
              {c.googleRating && <span style={{ color: "#D4A843" }}>{c.googleRating}★</span>}
              <span>${c.greenFeeRange[0]}–${c.greenFeeRange[1]}</span>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: tierColor(c.tier), color: "#fff" }}>{tierLabel(c.tier)}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

function BudgetGuide() {
  const allGreenFees = allDestinations.flatMap((d) => d.courses.map((c) => (c.greenFeeRange[0] + c.greenFeeRange[1]) / 2));
  const allLodging = allDestinations.flatMap((d) => d.lodging.map((l) => l.nightlyRange[0]));
  const regions = Object.entries(REGION_SLUGS) as [Region, string][];

  return (
    <>
      <h2 style={sectionTitle}>National Averages</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.75rem" }}>
        {[
          { label: "Avg Green Fee", value: `$${avg(allGreenFees)}` },
          { label: "Cheapest Green Fee", value: `$${Math.min(...allDestinations.flatMap((d) => d.courses.map((c) => c.greenFeeRange[0])))}` },
          { label: "Avg Lodging/Night", value: `$${avg(allLodging)}` },
          { label: "Destinations", value: `${allDestinations.length}` },
        ].map((item) => (
          <div key={item.label} style={card}>
            <span style={{ fontSize: "0.7rem", color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.06em" }}>{item.label}</span>
            <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#EA580C", marginTop: "0.2rem" }}>{item.value}</p>
          </div>
        ))}
      </div>

      <h2 style={sectionTitle}>Cost by Region</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {regions.map(([name, rSlug]) => {
          const rDests = allDestinations.filter((d) => REGION_SLUGS[d.region] === rSlug);
          const rGreenAvg = avg(rDests.flatMap((d) => d.courses.map((c) => (c.greenFeeRange[0] + c.greenFeeRange[1]) / 2)));
          const rLodgingAvg = avg(rDests.flatMap((d) => d.lodging.map((l) => l.nightlyRange[0])));
          return (
            <Link key={rSlug} href={`/golf-trips/region/${rSlug}`} style={{ ...card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong>{name}</strong>
              <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
                <span>Avg green fee: <strong style={{ color: "#EA580C" }}>${rGreenAvg}</strong></span>
                <span>Lodging from: <strong style={{ color: "#4ade80" }}>${rLodgingAvg}/night</strong></span>
              </div>
            </Link>
          );
        })}
      </div>

      <h2 style={sectionTitle}>10 Cheapest Destinations</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(250px, 100%), 1fr))", gap: "0.75rem" }}>
        {allDestinations
          .filter((d) => d.lodging.length > 0)
          .map((d) => ({ dest: d, score: Math.min(...d.courses.map((c) => c.greenFeeRange[0])) + Math.min(...d.lodging.map((l) => l.nightlyRange[0])) / 8 }))
          .sort((a, b) => a.score - b.score)
          .slice(0, 10)
          .map(({ dest: d }) => (
            <Link key={d.id} href={`/golf-trips/${d.id}/cost`} style={card}>
              <strong>{d.city}, {d.state}</strong>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginTop: "0.2rem" }}>
                Green fees from ${Math.min(...d.courses.map((c) => c.greenFeeRange[0]))} · Lodging from ${Math.min(...d.lodging.map((l) => l.nightlyRange[0]))}/night
              </p>
            </Link>
          ))}
      </div>
    </>
  );
}

function PackingList() {
  const categories = [
    { name: "Golf Gear", items: ["Golf clubs (or plan to rent — $50-75/round)", "Golf shoes", "Golf gloves (bring 2-3)", "Tees, ball markers, divot tool", "Golf balls (1 dozen minimum — you will lose some)", "Rangefinder or GPS watch", "Rain jacket (packable)", "Golf towel"] },
    { name: "Clothing", items: ["Collared shirts/polos (1 per round + 1 spare)", "Golf shorts or pants (2-3 pairs)", "Belt", "Athletic socks (moisture-wicking)", "Base layer if playing in cool weather", "Going-out clothes for dinners (2-3 outfits)", "Comfortable shoes for walking around town", "Swimsuit (for the pool/hot tub at the house)"] },
    { name: "Travel Essentials", items: ["Phone charger + portable battery", "Sunscreen (SPF 50+ — you're outside for 4+ hours)", "Sunglasses", "Hat or visor", "Ibuprofen (your back will thank you on day 3)", "Lip balm with SPF", "Travel-size toiletries", "Cooler bag for course beverages"] },
    { name: "Group Trip Must-Haves", items: ["Venmo/Cash App for splitting costs", "Bluetooth speaker (for the house, not the course)", "Card games / poker chips", "Custom trip swag (optional but legendary)", "Printed or shared itinerary", "Contact info for all reservations"] },
    { name: "What NOT to Pack", items: ["Full-size shampoo bottles (the house will have them)", "More than 14 clubs (check your bag)", "Dress shoes (nowhere requires them)", "A laptop (you're on vacation)", "Expectations of playing well on day 3"] },
  ];

  return (
    <>
      {categories.map((cat) => (
        <div key={cat.name}>
          <h2 style={sectionTitle}>{cat.name}</h2>
          <ul style={{ ...prose, paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            {cat.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      ))}
    </>
  );
}

function Under500() {
  const budgetDests = allDestinations
    .filter((d) => d.lodging.length > 0)
    .map((d) => {
      const cheapGreen = Math.min(...d.courses.map((c) => c.greenFeeRange[0]));
      const cheapLodging = Math.min(...d.lodging.map((l) => l.nightlyRange[0]));
      const estimate = cheapGreen * 2 + (cheapLodging * 3) / 8 + 40 * 3; // 2 rounds, 3 nights, 8 guys, $40/day food
      return { dest: d, estimate, cheapGreen, cheapLodging };
    })
    .filter((x) => x.estimate < 500)
    .sort((a, b) => a.estimate - b.estimate);

  return (
    <>
      <p style={{ ...prose, marginBottom: "1.5rem" }}>
        {budgetDests.length} destinations where a 3-night, 2-round trip costs under $500/person (group of 8).
        Estimates include green fees, lodging split, and $40/day for food and drinks.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: "0.75rem" }}>
        {budgetDests.map(({ dest: d, estimate, cheapGreen, cheapLodging }) => (
          <Link key={d.id} href={`/golf-trips/${d.id}/cost`} style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
              <strong>{d.city}, {d.state}</strong>
              <span style={{ color: "#4ade80", fontWeight: 700 }}>${Math.round(estimate)}/pp</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>
              Green fees from ${cheapGreen} · Lodging from ${cheapLodging}/night · {d.courses.length} courses
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}

function DesertVsCoastalVsMountain() {
  const styles = [
    { style: "desert", label: "Desert Golf", description: "Target golf through cacti and red rock. Dramatic elevation changes, firm fairways, and no rough — just sand. Best in spring and fall when temps are bearable.", color: "#EA580C" },
    { style: "coastal", label: "Coastal Golf", description: "Wind-swept links and ocean views. Firm, fast playing surfaces with natural contours. The closest thing to Scottish golf in America.", color: "#38bdf8" },
    { style: "mountain", label: "Mountain Golf", description: "Elevation means distance — your 7-iron suddenly goes 165. Stunning mountain backdrops, cool summer temps, and courses carved through pine forests.", color: "#4ade80" },
  ];

  return (
    <>
      {styles.map(({ style, label: styleLabel, description, color }) => {
        const courses = allDestinations
          .flatMap((d) => d.courses.filter((c) => c.style === style).map((c) => ({ course: c, dest: d })))
          .sort((a, b) => (b.course.googleRating || 0) - (a.course.googleRating || 0));
        const topDests = [...new Set(courses.map((c) => c.dest.id))]
          .map((id) => allDestinations.find((d) => d.id === id)!)
          .slice(0, 6);

        return (
          <div key={style}>
            <h2 style={{ ...sectionTitle, color }}>{styleLabel} ({courses.length} courses)</h2>
            <p style={{ ...prose, marginBottom: "1rem" }}>{description}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(250px, 100%), 1fr))", gap: "0.75rem" }}>
              {topDests.map((d) => (
                <Link key={d.id} href={`/golf-trips/${d.id}`} style={card}>
                  <strong>{d.city}, {d.state}</strong>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginTop: "0.2rem" }}>
                    {d.courses.filter((c) => c.style === style).length} {style} courses · {seasonLabel(d.bestSeasons)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

function LargeGroups() {
  const dests = allDestinations
    .filter((d) => d.lodging.some((l) => l.sleeps[1] >= 12) && d.courses.length >= 3)
    .sort((a, b) => Math.max(...b.lodging.map((l) => l.sleeps[1])) - Math.max(...a.lodging.map((l) => l.sleeps[1])))
    .slice(0, 20);

  return (
    <>
      <p style={{ ...prose, marginBottom: "1.5rem" }}>{dests.length} destinations with lodging for 12+ and at least 3 courses.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: "0.75rem" }}>
        {dests.map((d) => {
          const maxSleep = Math.max(...d.lodging.map((l) => l.sleeps[1]));
          return (
            <Link key={d.id} href={`/golf-trips/${d.id}/guide`} style={card}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{d.city}, {d.state}</strong>
                <span style={{ color: "#D4A843", fontSize: "0.8rem" }}>Sleeps {maxSleep}</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginTop: "0.2rem" }}>
                {d.courses.length} courses · {d.dining.length} restaurants · {d.bars.length} bars
              </p>
            </Link>
          );
        })}
      </div>
    </>
  );
}

function BucketListCourses() {
  const courses = allDestinations
    .flatMap((d) => d.courses.filter((c) => c.tier === "bucket-list").map((c) => ({ course: c, dest: d })))
    .sort((a, b) => (b.course.googleRating || 0) - (a.course.googleRating || 0))
    .slice(0, 50);

  return (
    <>
      <p style={{ ...prose, marginBottom: "1.5rem" }}>{courses.length} bucket-list courses ranked by rating. Every one is open to the public.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {courses.map(({ course: c, dest: d }, i) => (
          <Link key={`${d.id}-${c.name}`} href={`/golf-trips/${d.id}/courses/${slugify(c.name)}`} style={{ ...card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", marginRight: "0.5rem" }}>#{i + 1}</span>
              <strong style={{ fontSize: "0.9rem" }}>{c.name}</strong>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginLeft: "0.5rem" }}>{d.city}, {d.state}</span>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", fontSize: "0.8rem", color: "#71717A", flexShrink: 0 }}>
              {c.googleRating && <span style={{ color: "#D4A843" }}>{c.googleRating}★</span>}
              <span>${c.greenFeeRange[0]}–${c.greenFeeRange[1]}</span>
              {c.rankNote && <span style={{ color: "#D4A843", fontSize: "0.7rem" }}>{c.rankNote}</span>}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

function Mistakes() {
  const mistakes = [
    { title: "Booking Too Many Rounds", fix: "Plan 2 rounds per day max. Your body, your friendships, and your scores will thank you. Leave afternoons for activities or pool time." },
    { title: "Ignoring the Airport-to-Course Drive", fix: `Some destinations are 2+ hours from the nearest airport. Check drive times before booking — ${allDestinations.filter((d) => d.nearestAirport.driveMinutes > 90).length} of our destinations are 90+ minutes from the airport.` },
    { title: "Splitting Into Separate Hotels", fix: "The group house IS the trip. Splitting into hotel rooms kills the vibe. Budget an extra $20/person/night to stay together." },
    { title: "Not Designating a Trip Captain", fix: "Without one person in charge, every decision becomes a 12-person group text. Pick a captain, give them Venmo authority, and let them lead." },
    { title: "Choosing a Destination That's Too Small", fix: `Tiny towns (<10K population) often lack restaurant variety and nightlife. ${allDestinations.filter((d) => d.population === "tiny").length} of our destinations are tiny — perfect for golf purists, but not for groups that want a scene.` },
    { title: "Only Playing Premium Courses", fix: "Mix in a budget/solid round. The group will have more fun on a casual course where nobody's stressed about a $300 green fee." },
    { title: "Forgetting Rest Days", fix: "On a 4-night trip, skip golf one afternoon. Hit a brewery, go fishing, or just sit by the pool. The day 3 comeback is real." },
    { title: "Not Checking Course Dress Codes", fix: "Some bucket-list courses require collared shirts, no jeans, no cargo shorts. Check before you pack." },
    { title: "Booking Restaurants Last Minute", fix: "Group dinners at good restaurants need reservations, especially 8+ people. Book a week in advance minimum." },
    { title: "Ignoring Walkability", fix: `${allDestinations.flatMap((d) => d.courses.filter((c) => c.walkable)).length} courses in our database are walkable. Walking saves $20-30/round and is more fun.` },
    { title: "Flying Everyone In From Different Cities", fix: "Pick a destination that's a reasonable flight from where most of the group lives. Check our state and region pages to find central options." },
    { title: "Planning Without Real Data", fix: "Guessing on course pricing, lodging costs, and restaurant availability leads to blown budgets. Use our destination pages or AI planner for real numbers." },
  ];

  return (
    <>
      {mistakes.map((m, i) => (
        <div key={i}>
          <h2 style={sectionTitle}>{i + 1}. {m.title}</h2>
          <p style={prose}>{m.fix}</p>
        </div>
      ))}
    </>
  );
}

function NearAirports() {
  const dests = allDestinations
    .filter((d) => d.nearestAirport && d.nearestAirport.driveMinutes <= 45 && d.courses.length >= 2)
    .sort((a, b) => a.nearestAirport.driveMinutes - b.nearestAirport.driveMinutes);

  return (
    <>
      <p style={{ ...prose, marginBottom: "1.5rem" }}>
        {dests.length} destinations within a 45-minute drive of a major airport. Sorted shortest drive first.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {dests.map((d) => (
          <Link key={d.id} href={`/golf-trips/${d.id}/guide`} style={{ ...card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <strong>{d.city}, {d.state}</strong>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginTop: "0.2rem" }}>
                {d.courses.length} courses · {d.nearestAirport.code} ({d.nearestAirport.name})
              </p>
            </div>
            <span style={{ color: "#EA580C", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0 }}>{d.nearestAirport.driveMinutes} min</span>
          </Link>
        ))}
      </div>
      <h2 style={sectionTitle}>Why Airport Proximity Matters</h2>
      <p style={prose}>
        Every extra hour of rental-car drive is an hour not playing golf, not drinking beer, and not relaxing at the house.
        On a 3-night trip, a destination that&rsquo;s 30 minutes from the airport gives you an extra round over one
        that&rsquo;s 2+ hours away. It also means the &ldquo;travel day&rdquo; doesn&rsquo;t eat a full afternoon &mdash;
        land at 11am, tee off by 2pm.
      </p>
      <h2 style={sectionTitle}>What to Look For</h2>
      <p style={prose}>
        Drive time beats airport size. A regional airport 20 minutes from your lodging is better than a hub 90 minutes away.
        Check airline coverage from your city &mdash; some destinations on this list are one nonstop from everywhere,
        others require a connection. Use the destination pages for full airport details.
      </p>
    </>
  );
}

function FallDestinations() {
  const dests = allDestinations
    .filter((d) => d.bestSeasons.includes("fall") && d.lodging.length > 0)
    .sort((a, b) => b.courses.length - a.courses.length)
    .slice(0, 24);

  return (
    <>
      <p style={{ ...prose, marginBottom: "1.5rem" }}>
        {dests.length} top destinations that peak in September&ndash;November. Ranked by course count.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: "0.75rem" }}>
        {dests.map((d) => (
          <Link key={d.id} href={`/golf-trips/${d.id}`} style={card}>
            <strong>{d.city}, {d.state}</strong>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginTop: "0.2rem" }}>
              {d.courses.length} courses · {d.lodging.length} lodging options · {seasonLabel(d.bestSeasons)}
            </p>
          </Link>
        ))}
      </div>
      <h2 style={sectionTitle}>Why Fall Is the Best Golf Season</h2>
      <p style={prose}>
        Summer tourists are gone, kids are back in school, and courses that cost $200 in July drop to $120 in October.
        Temperatures are cooler, which means you&rsquo;re not melting by hole 13. Mountain and Northeast destinations
        add fall foliage on top of great golf. Humidity drops. Bugs disappear. Greens firm up. It&rsquo;s the most
        underrated window of the year.
      </p>
      <h2 style={sectionTitle}>When to Book</h2>
      <p style={prose}>
        Fall rates typically drop the week after Labor Day at most destinations and hold through mid-November.
        The sweet spot is late September through late October. Book lodging 6&ndash;8 weeks out for the best
        house selection &mdash; group houses in popular destinations still move fast even in shoulder season.
      </p>
      <h2 style={sectionTitle}>What to Pack</h2>
      <p style={prose}>
        Layers. Morning tee times can start in the 50s and reach the 80s by afternoon in many regions. Bring
        a quarter-zip, a lightweight rain jacket, and a knit hat for early rounds. See our{' '}
        <Link href="/guides/golf-trip-packing-list" style={{ color: "#EA580C", textDecoration: "underline" }}>full packing list</Link>
        {' '}for details.
      </p>
    </>
  );
}

/* ── Route content by slug ── */
const CONTENT_MAP: Record<string, () => React.ReactNode> = {
  "how-to-plan-a-group-golf-trip": HowToPlan,
  "best-golf-trip-destinations-by-month": ByMonth,
  "best-walkable-golf-courses": WalkableCourses,
  "golf-trip-budget-guide": BudgetGuide,
  "golf-trip-packing-list": PackingList,
  "best-golf-trips-under-500": Under500,
  "desert-vs-coastal-vs-mountain-golf": DesertVsCoastalVsMountain,
  "best-golf-destinations-for-large-groups": LargeGroups,
  "top-bucket-list-golf-courses": BucketListCourses,
  "first-time-golf-trip-mistakes": Mistakes,
  "best-golf-trips-near-airports": NearAirports,
  "best-fall-golf-trip-destinations": FallDestinations,
};

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) notFound();

  const ContentComponent = CONTENT_MAP[slug];
  if (!ContentComponent) notFound();

  const heroImage = unsplashCache.guides[slug as keyof typeof unsplashCache.guides] ?? null;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://tourdefore.com" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://tourdefore.com/guides" },
      { "@type": "ListItem", position: 3, name: guide.title, item: `https://tourdefore.com/guides/${guide.slug}` },
    ],
  };

  return (
    <main id="main-content" style={{ background: "#000", color: "#fff", fontFamily: "var(--font-inter), sans-serif", minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <MulliganButton href="/golf-trips" />
      <HomeButton />

      <UnsplashHero image={heroImage} alt={guide.title} />

      <div style={{ maxWidth: 800, margin: "0 auto", padding: heroImage ? "2rem 1.5rem 4rem" : "5rem 1.5rem 4rem" }}>
        <h1 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", letterSpacing: "0.04em", lineHeight: 1.15, marginBottom: "1rem" }}>
          {guide.title}
        </h1>
        <p style={{ ...prose, marginBottom: "2rem" }}>{guide.intro}</p>

        <ContentComponent />

        {/* CTA */}
        <div style={{ textAlign: "center", margin: "3rem 0 2rem" }}>
          <Link href="/plan-a-trip" style={{ display: "inline-block", background: "#EA580C", color: "#fff", fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.3rem", letterSpacing: "0.06em", padding: "0.9rem 2.5rem", borderRadius: 8, textDecoration: "none" }}>
            Plan a Trip &rarr;
          </Link>
        </div>

        {/* Other Guides */}
        <div style={{ borderTop: "1px solid #222", paddingTop: "1.5rem" }}>
          <h2 style={{ fontSize: "0.85rem", color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700, marginBottom: "0.75rem" }}>More Guides</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {GUIDES.filter((g) => g.slug !== slug).map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} style={{ padding: "6px 12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, textDecoration: "none", color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>
                {g.title}
              </Link>
            ))}
          </div>
        </div>

        <NetworkFooter currentDomain="tourdefore.com" />
      </div>
    </main>
  );
}
