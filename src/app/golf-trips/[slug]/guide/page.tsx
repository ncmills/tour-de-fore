import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allDestinations } from "@/data";
import MulliganButton from "@/components/MulliganButton";
import HomeButton from "@/components/HomeButton";
import {
  tierLabel,
  tierColor,
  seasonLabel,
  slugify,
  metaDescription,
  regionSlug,
  stateSlug,
  STATE_NAMES,
} from "../../helpers";

export function generateStaticParams() {
  return allDestinations.map((d) => ({ slug: d.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dest = allDestinations.find((d) => d.id === slug);
  if (!dest) return {};
  const title = `${dest.city} Golf Trip Planning Guide — Courses, Lodging & Itinerary | Tour de Fore`;
  const description = `Plan your ${dest.city}, ${dest.state} golf trip: ${dest.courses.length} courses, group lodging from $${Math.min(...dest.lodging.map((l) => l.nightlyRange[0]))}/night, ${dest.dining.length} restaurants, and ${dest.bars.length} bars. Sample 3-day itinerary included.`;
  return {
    title,
    description: metaDescription(description),
    alternates: { canonical: `https://tourdefore.com/golf-trips/${dest.id}/guide` },
    openGraph: { title, description: metaDescription(description), images: ["/icon-fancy.png"] },
  };
}

const section: React.CSSProperties = {
  marginBottom: "3rem",
};

const sectionTitle: React.CSSProperties = {
  fontFamily: "var(--font-plan-block), sans-serif",
  fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
  letterSpacing: "0.04em",
  color: "#EA580C",
  marginBottom: "1rem",
};

const card: React.CSSProperties = {
  background: "#111",
  border: "1px solid #222",
  borderRadius: 10,
  padding: "1.25rem",
};

const label: React.CSSProperties = {
  fontSize: "0.7rem",
  color: "#A1A1AA",
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
  fontWeight: 700,
};

const prose: React.CSSProperties = {
  color: "rgba(255,255,255,0.6)",
  fontSize: "0.95rem",
  lineHeight: 1.8,
  maxWidth: 720,
};

function priceLabel(range: string) {
  switch (range) {
    case "$": return "Under $15/person";
    case "$$": return "$15-30/person";
    case "$$$": return "$30-60/person";
    case "$$$$": return "$60+/person";
    default: return range;
  }
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = allDestinations.find((d) => d.id === slug);
  if (!dest) notFound();

  const stateName = STATE_NAMES[dest.state] || dest.state;
  const cheapestGreen = Math.min(...dest.courses.map((c) => c.greenFeeRange[0]));
  const pricestGreen = Math.max(...dest.courses.map((c) => c.greenFeeRange[1]));
  const cheapestLodging = dest.lodging.length > 0 ? Math.min(...dest.lodging.map((l) => l.nightlyRange[0])) : 0;
  const lateNightBars = dest.bars.filter((b) => b.lateNight);
  const walkableCourses = dest.courses.filter((c) => c.walkable);
  const bucketListCourses = dest.courses.filter((c) => c.tier === "bucket-list");

  // Budget estimate for 4 guys, 3 nights, 2 rounds
  const budgetPerPerson = cheapestGreen * 2 + (cheapestLodging * 3) / 4 + 50 * 3; // 50/day food estimate

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://tourdefore.com" },
      { "@type": "ListItem", position: 2, name: "Golf Trips", item: "https://tourdefore.com/golf-trips" },
      { "@type": "ListItem", position: 3, name: `${dest.city}, ${dest.state}`, item: `https://tourdefore.com/golf-trips/${dest.id}` },
      { "@type": "ListItem", position: 4, name: "Planning Guide", item: `https://tourdefore.com/golf-trips/${dest.id}/guide` },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the best time to visit ${dest.city} for a golf trip?`,
        acceptedAnswer: { "@type": "Answer", text: `The best seasons for golf in ${dest.city} are ${seasonLabel(dest.bestSeasons)}. Course conditions and pricing are typically optimal during these months.` },
      },
      {
        "@type": "Question",
        name: `How many golf courses are in ${dest.city}?`,
        acceptedAnswer: { "@type": "Answer", text: `${dest.city} has ${dest.courses.length} courses in our database, with green fees ranging from $${cheapestGreen} to $${pricestGreen} per round.${bucketListCourses.length > 0 ? ` ${bucketListCourses.length} are bucket-list tier courses.` : ""}` },
      },
      {
        "@type": "Question",
        name: `How much does a ${dest.city} golf trip cost per person?`,
        acceptedAnswer: { "@type": "Answer", text: `A budget ${dest.city} golf trip runs approximately $${Math.round(budgetPerPerson)} per person for 3 nights and 2 rounds (group of 4). This includes green fees from $${cheapestGreen}, lodging from $${cheapestLodging}/night, and an estimated $50/day for food and drinks.` },
      },
      {
        "@type": "Question",
        name: `What airport do you fly into for a ${dest.city} golf trip?`,
        acceptedAnswer: { "@type": "Answer", text: `The nearest airport is ${dest.nearestAirport.name} (${dest.nearestAirport.code}), which is a ${dest.nearestAirport.driveMinutes}-minute drive to ${dest.city}.` },
      },
      ...(dest.lodging.length > 0 ? [{
        "@type": "Question",
        name: `Where should a golf group stay in ${dest.city}?`,
        acceptedAnswer: { "@type": "Answer", text: `${dest.city} has ${dest.lodging.length} group-friendly lodging options starting at $${cheapestLodging}/night. Most groups rent a house that sleeps ${dest.lodging[0].sleeps[0]}-${dest.lodging[0].sleeps[1]} to keep everyone together.` },
      }] : []),
    ],
  };

  // Build sample 3-day itinerary from real data
  const topCourses = [...dest.courses].sort((a, b) => (b.googleRating || 0) - (a.googleRating || 0)).slice(0, 3);
  const topDining = dest.dining.slice(0, 3);
  const topBars = dest.bars.slice(0, 3);
  const topActivities = dest.activities.slice(0, 2);

  return (
    <main
      id="main-content"
      style={{
        background: "#000",
        color: "#fff",
        fontFamily: "var(--font-inter), sans-serif",
        minHeight: "100vh",
      }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <MulliganButton href={`/golf-trips/${dest.id}`} />
      <HomeButton />

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "5rem 1.5rem 4rem" }}>
        {/* Hero */}
        <h1
          style={{
            fontFamily: "var(--font-plan-block), sans-serif",
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
            letterSpacing: "0.04em",
            lineHeight: 1.15,
            marginBottom: "0.75rem",
          }}
        >
          {dest.city} Golf Trip Planning Guide
        </h1>

        <p style={{ ...prose, marginBottom: "0.5rem" }}>
          {dest.description}
        </p>

        <p
          className="neon-stats"
          style={{
            fontSize: "0.85rem",
            color: "#ff6a28",
            fontFamily: "var(--font-plan-block), sans-serif",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            textShadow: "0 0 7px rgba(255,106,40,0.9), 0 0 20px rgba(255,60,20,0.6)",
            marginBottom: "2rem",
          }}
        >
          {dest.courses.length} courses · {dest.dining.length} restaurants · {dest.bars.length} bars · {dest.activities.length} activities
        </p>

        {/* Quick Facts */}
        <div style={{ ...section }}>
          <h2 style={sectionTitle}>Quick Facts</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.75rem" }}>
            {[
              { label: "Best Time to Visit", value: seasonLabel(dest.bestSeasons) },
              { label: "Nearest Airport", value: `${dest.nearestAirport.code} (${dest.nearestAirport.driveMinutes} min drive)` },
              { label: "Green Fees", value: `$${cheapestGreen}–$${pricestGreen}` },
              { label: "Lodging From", value: cheapestLodging > 0 ? `$${cheapestLodging}/night` : "N/A" },
              { label: "Walkable Courses", value: `${walkableCourses.length} of ${dest.courses.length}` },
              { label: "Budget Est. (4 guys, 3 nights)", value: `~$${Math.round(budgetPerPerson)}/person` },
            ].map((item) => (
              <div key={item.label} style={card}>
                <span style={label}>{item.label}</span>
                <p style={{ fontSize: "1.1rem", fontWeight: 600, marginTop: "0.25rem" }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sample 3-Day Itinerary */}
        <div style={section}>
          <h2 style={sectionTitle}>Sample 3-Day Itinerary</h2>
          <p style={{ ...prose, marginBottom: "1.5rem" }}>
            Here&apos;s a realistic 3-day itinerary for a group golf trip to {dest.city}. Every venue below is real
            and pulled from our curated database — no filler.
          </p>

          {[1, 2, 3].map((day) => {
            const course = topCourses[day - 1];
            const restaurant = topDining[day - 1];
            const bar = topBars[day - 1];
            const activity = day === 2 ? topActivities[0] : day === 3 ? topActivities[1] : null;

            return (
              <div key={day} style={{ ...card, marginBottom: "1rem" }}>
                <h3 style={{ color: "#EA580C", fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.1rem", marginBottom: "0.75rem" }}>
                  Day {day}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.9rem" }}>
                  {course && (
                    <div>
                      <span style={label}>Morning — Golf</span>
                      <p style={{ color: "#fff", fontWeight: 500 }}>
                        <Link href={`/golf-trips/${dest.id}/courses/${slugify(course.name)}`} style={{ color: "#fff", textDecoration: "underline", textDecorationColor: "rgba(255,255,255,0.2)" }}>
                          {course.name}
                        </Link>
                        {" "}— {course.style}, ${course.greenFeeRange[0]}–${course.greenFeeRange[1]}
                        {course.googleRating ? ` · ${course.googleRating}★` : ""}
                      </p>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>{course.highlight}</p>
                    </div>
                  )}
                  {activity && (
                    <div style={{ marginTop: "0.25rem" }}>
                      <span style={label}>Afternoon — Activity</span>
                      <p style={{ color: "#fff", fontWeight: 500 }}>
                        {activity.name} — {activity.duration}, ${activity.pricePerPerson[0]}–${activity.pricePerPerson[1]}/pp
                      </p>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>{activity.highlight}</p>
                    </div>
                  )}
                  {restaurant && (
                    <div style={{ marginTop: "0.25rem" }}>
                      <span style={label}>Dinner</span>
                      <p style={{ color: "#fff", fontWeight: 500 }}>
                        {restaurant.name} — {restaurant.style.replace("-", " ")}, {restaurant.priceRange}
                        {restaurant.googleRating ? ` · ${restaurant.googleRating}★` : ""}
                      </p>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>{restaurant.highlight}</p>
                    </div>
                  )}
                  {bar && (
                    <div style={{ marginTop: "0.25rem" }}>
                      <span style={label}>After Dark</span>
                      <p style={{ color: "#fff", fontWeight: 500 }}>
                        {bar.name} — {bar.vibe.replace("-", " ")}
                        {bar.lateNight ? " · Open late" : ""}
                      </p>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>{bar.highlight}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Course Guide */}
        <div style={section}>
          <h2 style={sectionTitle}>Course-by-Course Guide</h2>
          <p style={{ ...prose, marginBottom: "1.5rem" }}>
            {dest.city} has {dest.courses.length} courses worth playing
            {bucketListCourses.length > 0 ? `, including ${bucketListCourses.length} bucket-list tier layout${bucketListCourses.length > 1 ? "s" : ""}` : ""}.
            {walkableCourses.length > 0 ? ` ${walkableCourses.length} are walkable if you want to save on cart fees.` : ""}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {dest.courses.map((c) => (
              <Link
                key={c.name}
                href={`/golf-trips/${dest.id}/courses/${slugify(c.name)}`}
                style={{ ...card, textDecoration: "none", color: "#fff", display: "block" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 600, flex: 1 }}>{c.name}</h3>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: tierColor(c.tier), color: "#fff" }}>
                    {tierLabel(c.tier)}
                  </span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>{c.highlight}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", fontSize: "0.8rem", color: "#71717A" }}>
                  <span>${c.greenFeeRange[0]}–${c.greenFeeRange[1]}</span>
                  <span>{c.style}</span>
                  <span>Par {c.par} · {c.yardage.toLocaleString()} yds</span>
                  <span>{c.rating}/{c.slope} slope</span>
                  {c.walkable && <span style={{ color: "#3a7050" }}>Walkable</span>}
                  {c.googleRating && <span style={{ color: "#D4A843" }}>{c.googleRating}★{c.reviewCount ? ` (${c.reviewCount.toLocaleString()})` : ""}</span>}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Where to Stay */}
        {dest.lodging.length > 0 && (
          <div style={section}>
            <h2 style={sectionTitle}>Where to Stay</h2>
            <p style={{ ...prose, marginBottom: "1.5rem" }}>
              {dest.city} has {dest.lodging.length} group-friendly lodging option{dest.lodging.length > 1 ? "s" : ""} in our database,
              starting at ${cheapestLodging}/night for the whole house.
              {dest.lodging.some((l) => l.amenities.includes("hot tub")) ? " Several options include hot tubs — a non-negotiable for most groups." : ""}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "0.75rem" }}>
              {dest.lodging.map((l, i) => (
                <div key={i} style={card}>
                  <span style={label}>{l.type.replace("-", " ")}</span>
                  <p style={{ fontSize: "1rem", fontWeight: 600, margin: "0.25rem 0" }}>
                    ${l.nightlyRange[0]}–${l.nightlyRange[1]}/night
                  </p>
                  <p style={{ fontSize: "0.85rem", color: "#A1A1AA", marginBottom: "0.4rem" }}>
                    Sleeps {l.sleeps[0]}–{l.sleeps[1]} · {l.areaDescription}
                  </p>
                  {l.amenities.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                      {l.amenities.map((a) => (
                        <span key={a} style={{ fontSize: "0.7rem", background: "#1a1a1a", border: "1px solid #333", borderRadius: 4, padding: "2px 6px", color: "#A1A1AA" }}>
                          {a}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dining */}
        {dest.dining.length > 0 && (
          <div style={section}>
            <h2 style={sectionTitle}>Group Dining Guide</h2>
            <p style={{ ...prose, marginBottom: "1.5rem" }}>
              {dest.dining.length} restaurant{dest.dining.length > 1 ? "s" : ""} vetted for group golf trips.
              {dest.dining.some((d) => d.capacity === "large-group") ? " Several can handle large parties without a reservation headache." : ""}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: "0.75rem" }}>
              {dest.dining.map((d) => (
                <div key={d.name} style={card}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 600 }}>{d.name}</h3>
                    <span style={{ color: "#D4A843", fontSize: "0.85rem" }}>{d.priceRange}</span>
                  </div>
                  <span style={label}>{d.style.replace("-", " ")}</span>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginTop: "0.3rem" }}>{d.highlight}</p>
                  <div style={{ display: "flex", gap: "0.75rem", fontSize: "0.75rem", color: "#71717A", marginTop: "0.35rem" }}>
                    {d.googleRating && <span>{d.googleRating}★</span>}
                    <span>{priceLabel(d.priceRange)}</span>
                    {d.reservationNeeded && <span style={{ color: "#EA580C" }}>Reservation needed</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nightlife */}
        {dest.bars.length > 0 && (
          <div style={section}>
            <h2 style={sectionTitle}>Nightlife</h2>
            <p style={{ ...prose, marginBottom: "1.5rem" }}>
              {dest.bars.length} bar{dest.bars.length > 1 ? "s" : ""} curated for groups.
              {lateNightBars.length > 0 ? ` ${lateNightBars.length} stay open past midnight.` : ""}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: "0.75rem" }}>
              {dest.bars.map((b) => (
                <div key={b.name} style={card}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 600 }}>{b.name}</h3>
                    {b.lateNight && <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: "#7c3aed", color: "#fff" }}>Late Night</span>}
                  </div>
                  <span style={label}>{b.vibe.replace("-", " ")}</span>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginTop: "0.3rem" }}>{b.highlight}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activities */}
        {dest.activities.length > 0 && (
          <div style={section}>
            <h2 style={sectionTitle}>Activities Beyond Golf</h2>
            <p style={{ ...prose, marginBottom: "1.5rem" }}>
              {dest.activities.length} off-course activit{dest.activities.length > 1 ? "ies" : "y"} for rest days or afternoons.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: "0.75rem" }}>
              {dest.activities.map((a) => (
                <div key={a.name} style={card}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.3rem" }}>{a.name}</h3>
                  <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.8rem", color: "#71717A", marginBottom: "0.3rem" }}>
                    <span>{a.type.replace("-", " ")}</span>
                    <span>{a.duration}</span>
                    <span>${a.pricePerPerson[0]}–${a.pricePerPerson[1]}/pp</span>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>{a.highlight}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Getting There */}
        <div style={section}>
          <h2 style={sectionTitle}>Getting There</h2>
          <p style={prose}>
            Fly into <strong>{dest.nearestAirport.name}</strong> ({dest.nearestAirport.code}) — it&apos;s a {dest.nearestAirport.driveMinutes}-minute
            drive to {dest.city}. For groups of 8+, consider booking a shuttle or party bus from the airport
            {dest.partyBuses?.length ? ` (local providers include ${dest.partyBuses[0].providers.slice(0, 2).join(" and ")})` : ""}.
            Renting two SUVs usually works for groups of 4-8.
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", margin: "3rem 0 2rem" }}>
          <Link
            href={`/plan-a-trip?dest=${dest.id}`}
            style={{
              display: "inline-block",
              background: "#EA580C",
              color: "#fff",
              fontFamily: "var(--font-plan-block), sans-serif",
              fontSize: "1.3rem",
              letterSpacing: "0.06em",
              padding: "0.9rem 2.5rem",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            Plan This Trip &rarr;
          </Link>
        </div>

        {/* Related Links */}
        <div style={{ borderTop: "1px solid #222", paddingTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "1rem 1.5rem", fontSize: "0.9rem" }}>
          <Link href={`/golf-trips/${dest.id}`} style={{ color: "#EA580C", textDecoration: "none" }}>
            Full {dest.city} Destination Page &rarr;
          </Link>
          <Link href={`/golf-trips/${dest.id}/cost`} style={{ color: "#EA580C", textDecoration: "none" }}>
            {dest.city} Cost Breakdown &rarr;
          </Link>
          <Link href={`/golf-trips/region/${regionSlug(dest.region)}`} style={{ color: "#A1A1AA", textDecoration: "none" }}>
            {dest.region} Trips
          </Link>
          <Link href={`/golf-trips/state/${stateSlug(dest.state)}`} style={{ color: "#A1A1AA", textDecoration: "none" }}>
            {stateName} Trips
          </Link>
        </div>
      </div>
    </main>
  );
}
