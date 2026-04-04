import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allDestinations } from "@/data";
import MulliganButton from "@/components/MulliganButton";
import HomeButton from "@/components/HomeButton";
import { slugify, metaDescription, tierColor, tierLabel } from "../../helpers";

// Only generate for destinations with 3+ bars
const bachelorDests = allDestinations.filter(
  (d) => d.bars.length >= 3 && d.population !== "tiny"
);

export function generateStaticParams() {
  return bachelorDests.map((d) => ({ slug: d.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dest = bachelorDests.find((d) => d.id === slug);
  if (!dest) return {};
  const lateNight = dest.bars.filter((b) => b.lateNight).length;
  const title = `${dest.city} Bachelor Party Golf Trip — Courses, Bars & Itinerary | Tour de Fore`;
  const description = `Plan a bachelor party golf trip to ${dest.city}: ${dest.courses.length} courses, ${dest.bars.length} bars${lateNight > 0 ? ` (${lateNight} open late)` : ""}, group lodging, and a day-by-day itinerary built for the boys.`;
  return {
    title,
    description: metaDescription(description),
    alternates: { canonical: `https://tourdefore.com/golf-trips/${dest.id}/bachelor-party` },
    openGraph: { title, description: metaDescription(description), images: ["/icon-fancy.png"] },
  };
}

const section: React.CSSProperties = { marginBottom: "3rem" };
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

export default async function BachelorPartyDestPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = bachelorDests.find((d) => d.id === slug);
  if (!dest) notFound();

  const lateNightBars = dest.bars.filter((b) => b.lateNight);
  const groupLodging = dest.lodging.filter((l) => l.sleeps[1] >= 8);
  const topCourses = [...dest.courses].sort((a, b) => (b.googleRating || 0) - (a.googleRating || 0));
  const competitiveCourses = dest.courses.filter((c) => c.tier === "premium" || c.tier === "bucket-list");

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://tourdefore.com" },
      { "@type": "ListItem", position: 2, name: "Golf Trips", item: "https://tourdefore.com/golf-trips" },
      { "@type": "ListItem", position: 3, name: `${dest.city}, ${dest.state}`, item: `https://tourdefore.com/golf-trips/${dest.id}` },
      { "@type": "ListItem", position: 4, name: "Bachelor Party", item: `https://tourdefore.com/golf-trips/${dest.id}/bachelor-party` },
    ],
  };

  return (
    <main id="main-content" style={{ background: "#000", color: "#fff", fontFamily: "var(--font-inter), sans-serif", minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <MulliganButton href={`/golf-trips/${dest.id}`} />
      <HomeButton />

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "5rem 1.5rem 4rem" }}>
        <h1 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", letterSpacing: "0.04em", lineHeight: 1.15, marginBottom: "0.75rem" }}>
          {dest.city} Bachelor Party Golf Trip
        </h1>

        <p style={{ ...prose, marginBottom: "0.5rem" }}>
          {dest.city} checks every box for a bachelor party golf trip: {dest.courses.length} courses for competitive rounds,
          {" "}{dest.bars.length} bars for the nights{lateNightBars.length > 0 ? ` (${lateNightBars.length} open past midnight)` : ""},
          {" "}{dest.dining.length} group-friendly restaurants, and {dest.activities.length} off-course activities when you need a break from the links.
        </p>

        <p className="neon-stats neon-stats-text" style={{ fontSize: "0.85rem", marginBottom: "2rem" }}>
          {dest.courses.length} courses · {lateNightBars.length} late-night bars · {dest.activities.length} activities
        </p>

        {/* Bachelor Party Itinerary */}
        <div style={section}>
          <h2 style={sectionTitle}>Sample Bachelor Party Weekend</h2>
          <p style={{ ...prose, marginBottom: "1.5rem" }}>
            A 3-day bachelor party itinerary using real venues in {dest.city}. Adjust to your crew&apos;s vibe.
          </p>

          {[
            { day: "Day 1 — Arrival & Night Out", morning: null, afternoon: dest.activities[0], dinner: dest.dining.find((d) => d.style === "steakhouse" || d.style === "bbq") || dest.dining[0], bar: lateNightBars[0] || dest.bars[0] },
            { day: "Day 2 — Main Event", morning: topCourses[0], afternoon: topCourses[1], dinner: dest.dining.find((d) => d.priceRange === "$$$" || d.priceRange === "$$$$") || dest.dining[1], bar: lateNightBars[1] || dest.bars[1] },
            { day: "Day 3 — Last Round", morning: topCourses[2] || topCourses[0], afternoon: null, dinner: null, bar: null },
          ].map(({ day, morning, afternoon, dinner, bar }) => (
            <div key={day} style={{ ...card, marginBottom: "1rem" }}>
              <h3 style={{ color: "#EA580C", fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.1rem", marginBottom: "0.75rem" }}>
                {day}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.9rem" }}>
                {morning && "greenFeeRange" in morning && (
                  <div>
                    <span style={label}>Morning — Golf</span>
                    <p style={{ color: "#fff", fontWeight: 500 }}>{morning.name} — ${morning.greenFeeRange[0]}–${morning.greenFeeRange[1]}</p>
                  </div>
                )}
                {afternoon && "greenFeeRange" in afternoon && (
                  <div>
                    <span style={label}>Afternoon — Golf</span>
                    <p style={{ color: "#fff", fontWeight: 500 }}>{afternoon.name} — ${afternoon.greenFeeRange[0]}–${afternoon.greenFeeRange[1]}</p>
                  </div>
                )}
                {afternoon && "pricePerPerson" in afternoon && (
                  <div>
                    <span style={label}>Afternoon — Activity</span>
                    <p style={{ color: "#fff", fontWeight: 500 }}>{afternoon.name} — {afternoon.duration}, ${afternoon.pricePerPerson[0]}–${afternoon.pricePerPerson[1]}/pp</p>
                  </div>
                )}
                {dinner && (
                  <div>
                    <span style={label}>Dinner</span>
                    <p style={{ color: "#fff", fontWeight: 500 }}>{dinner.name} — {dinner.style.replace("-", " ")}, {dinner.priceRange}</p>
                  </div>
                )}
                {bar && (
                  <div>
                    <span style={label}>After Dark</span>
                    <p style={{ color: "#fff", fontWeight: 500 }}>{bar.name} — {bar.vibe.replace("-", " ")}{bar.lateNight ? " · Open late" : ""}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Late Night Bar Guide */}
        {dest.bars.length > 0 && (
          <div style={section}>
            <h2 style={sectionTitle}>Bar Guide</h2>
            <p style={{ ...prose, marginBottom: "1rem" }}>
              {lateNightBars.length > 0
                ? `${lateNightBars.length} spots stay open past midnight — critical for a proper bachelor party.`
                : `${dest.bars.length} bars worth hitting. Plan to start early if you want a full night.`}
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

        {/* Group Lodging */}
        {groupLodging.length > 0 && (
          <div style={section}>
            <h2 style={sectionTitle}>Group Lodging (Sleeps 8+)</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "0.75rem" }}>
              {groupLodging.map((l, i) => (
                <div key={i} style={card}>
                  <span style={label}>{l.type.replace("-", " ")} · Sleeps {l.sleeps[0]}–{l.sleeps[1]}</span>
                  <p style={{ fontSize: "1rem", fontWeight: 600, margin: "0.25rem 0" }}>${l.nightlyRange[0]}–${l.nightlyRange[1]}/night</p>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>{l.areaDescription}</p>
                  {l.amenities.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginTop: "0.4rem" }}>
                      {l.amenities.map((a) => (
                        <span key={a} style={{ fontSize: "0.7rem", background: "#1a1a1a", border: "1px solid #333", borderRadius: 4, padding: "2px 6px", color: "#A1A1AA" }}>{a}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Courses for Competition */}
        <div style={section}>
          <h2 style={sectionTitle}>Best Courses for the Competition</h2>
          <p style={{ ...prose, marginBottom: "1rem" }}>
            {competitiveCourses.length > 0
              ? `${competitiveCourses.length} premium/bucket-list courses for the main event rounds.`
              : `${dest.courses.length} courses to choose from. Pick the toughest layout for the competition round.`}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {topCourses.slice(0, 5).map((c) => (
              <Link key={c.name} href={`/golf-trips/${dest.id}/courses/${slugify(c.name)}`} style={{ ...card, textDecoration: "none", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontWeight: 600 }}>{c.name}</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginLeft: "0.5rem" }}>Par {c.par} · {c.yardage.toLocaleString()} yds</span>
                </div>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: tierColor(c.tier), color: "#fff" }}>{tierLabel(c.tier)}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Party Bus */}
        {dest.partyBuses && dest.partyBuses.length > 0 && (
          <div style={section}>
            <h2 style={sectionTitle}>Transportation</h2>
            {dest.partyBuses.map((pb, i) => (
              <div key={i} style={{ ...card, marginBottom: "0.75rem" }}>
                <span style={label}>{pb.type.replace("-", " ")}</span>
                <p style={{ fontSize: "0.95rem", fontWeight: 500, margin: "0.25rem 0" }}>
                  ${pb.hourlyRate[0]}–${pb.hourlyRate[1]}/hr · Fits {pb.capacity[0]}–{pb.capacity[1]}
                </p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
                  Providers: {pb.providers.join(", ")}
                  {pb.canDoGolfAndBars ? " · Can do golf AM + bars PM" : ""}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div style={{ textAlign: "center", margin: "3rem 0 2rem" }}>
          <Link href={`/plan-a-trip?dest=${dest.id}`} style={{ display: "inline-block", background: "#EA580C", color: "#fff", fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.3rem", letterSpacing: "0.06em", padding: "0.9rem 2.5rem", borderRadius: 8, textDecoration: "none" }}>
            Plan This Bachelor Party &rarr;
          </Link>
        </div>

        {/* Related */}
        <div style={{ borderTop: "1px solid #222", paddingTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "1rem 1.5rem", fontSize: "0.9rem" }}>
          <Link href={`/golf-trips/${dest.id}/guide`} style={{ color: "#EA580C", textDecoration: "none" }}>{dest.city} Planning Guide &rarr;</Link>
          <Link href={`/golf-trips/${dest.id}/cost`} style={{ color: "#EA580C", textDecoration: "none" }}>{dest.city} Cost Breakdown &rarr;</Link>
          <Link href="/golf-trips/bachelor-party" style={{ color: "#A1A1AA", textDecoration: "none" }}>All Bachelor Party Destinations</Link>
        </div>
      </div>
    </main>
  );
}
