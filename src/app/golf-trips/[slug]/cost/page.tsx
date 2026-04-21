import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allDestinations } from "@/data";
import MulliganButton from "@/components/MulliganButton";
import HomeButton from "@/components/HomeButton";
import {
  tierLabel,
  tierColor,
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
  const cheapest = Math.min(...dest.courses.map((c) => c.greenFeeRange[0]));
  const title = `${dest.city} Golf Trip Cost — Budget Breakdown Per Person | Tour de Fore`;
  const description = `How much does a ${dest.city} golf trip cost? Green fees from $${cheapest}, group lodging options, dining estimates, and total per-person budgets for groups of 4, 8, and 12.`;
  return {
    title,
    description: metaDescription(description),
    alternates: { canonical: `https://tourdefore.com/golf-trips/${dest.id}/cost` },
    openGraph: {
      type: "article",
      url: `https://tourdefore.com/golf-trips/${dest.id}/cost`,
      title,
      description: metaDescription(description),
      images: ["/icon-fancy.png"],
    },
    twitter: { card: "summary_large_image", title, description: metaDescription(description) },
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
const prose: React.CSSProperties = {
  color: "rgba(255,255,255,0.6)",
  fontSize: "0.95rem",
  lineHeight: 1.8,
  maxWidth: 720,
};

function avg(arr: number[]) {
  return arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;
}

export default async function CostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = allDestinations.find((d) => d.id === slug);
  if (!dest) notFound();

  const stateName = STATE_NAMES[dest.state] || dest.state;

  // Course costs by tier
  const tiers = ["budget", "solid", "premium", "bucket-list"] as const;
  const coursesByTier = tiers.map((t) => ({
    tier: t,
    courses: dest.courses.filter((c) => c.tier === t),
  })).filter((t) => t.courses.length > 0);

  // Lodging cost per person for different group sizes
  const lodgingOptions = dest.lodging.map((l) => ({
    ...l,
    perPerson4: Math.round(l.nightlyRange[0] / 4),
    perPerson8: Math.round(l.nightlyRange[0] / Math.min(8, l.sleeps[1])),
    perPerson12: Math.round(l.nightlyRange[0] / Math.min(12, l.sleeps[1])),
  }));

  // Budget tiers: budget, mid-range, premium
  const budgetCourses = dest.courses.filter((c) => c.tier === "budget" || c.tier === "solid");
  const premiumCourses = dest.courses.filter((c) => c.tier === "premium" || c.tier === "bucket-list");
  const cheapestGreen = Math.min(...dest.courses.map((c) => c.greenFeeRange[0]));
  const midGreen = avg(dest.courses.map((c) => (c.greenFeeRange[0] + c.greenFeeRange[1]) / 2));
  const topGreen = Math.max(...dest.courses.map((c) => c.greenFeeRange[1]));

  const cheapestLodging = dest.lodging.length > 0 ? Math.min(...dest.lodging.map((l) => l.nightlyRange[0])) : 200;
  const midLodging = dest.lodging.length > 0 ? avg(dest.lodging.map((l) => (l.nightlyRange[0] + l.nightlyRange[1]) / 2)) : 350;
  const topLodging = dest.lodging.length > 0 ? Math.max(...dest.lodging.map((l) => l.nightlyRange[1])) : 600;

  // 3-night, 2-round trip for group of 8
  const budgetTotal = cheapestGreen * 2 + (cheapestLodging * 3) / 8 + 40 * 3;
  const midTotal = midGreen * 2 + (midLodging * 3) / 8 + 60 * 3;
  const premiumTotal = topGreen * 2 + (topLodging * 3) / 8 + 90 * 3;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://tourdefore.com" },
      { "@type": "ListItem", position: 2, name: "Golf Trips", item: "https://tourdefore.com/golf-trips" },
      { "@type": "ListItem", position: 3, name: `${dest.city}, ${dest.state}`, item: `https://tourdefore.com/golf-trips/${dest.id}` },
      { "@type": "ListItem", position: 4, name: "Cost & Budget", item: `https://tourdefore.com/golf-trips/${dest.id}/cost` },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much does a golf trip to ${dest.city} cost?`,
        acceptedAnswer: { "@type": "Answer", text: `A ${dest.city} golf trip costs approximately $${Math.round(budgetTotal)} (budget), $${Math.round(midTotal)} (mid-range), or $${Math.round(premiumTotal)} (premium) per person for 3 nights and 2 rounds with a group of 8. Green fees range from $${cheapestGreen} to $${topGreen}.` },
      },
      {
        "@type": "Question",
        name: `What are green fees in ${dest.city}?`,
        acceptedAnswer: { "@type": "Answer", text: `Green fees in ${dest.city} range from $${cheapestGreen} to $${topGreen} per round with cart across ${dest.courses.length} courses. The average is around $${midGreen}.` },
      },
      {
        "@type": "Question",
        name: `How much is lodging for a golf group in ${dest.city}?`,
        acceptedAnswer: { "@type": "Answer", text: dest.lodging.length > 0 ? `Group lodging in ${dest.city} starts at $${cheapestLodging}/night for the whole house. Split among 8 guys, that's $${Math.round(cheapestLodging / 8)}/person/night.` : `Lodging data for ${dest.city} is coming soon.` },
      },
    ],
  };

  return (
    <main id="main-content" style={{ background: "#000", color: "#fff", fontFamily: "var(--font-inter), sans-serif", minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <MulliganButton href={`/golf-trips/${dest.id}`} />
      <HomeButton />

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "5rem 1.5rem 4rem" }}>
        <h1 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", letterSpacing: "0.04em", lineHeight: 1.15, marginBottom: "0.75rem" }}>
          {dest.city} Golf Trip Cost
        </h1>
        <p style={{ ...prose, marginBottom: "2rem" }}>
          What does a {dest.city}, {stateName} golf trip actually cost? We broke it down using real pricing from
          {" "}{dest.courses.length} courses, {dest.lodging.length} lodging options, and {dest.dining.length} restaurants.
          All estimates are per person for a 3-night, 2-round trip with a group of 8.
        </p>

        {/* Summary Table */}
        <div style={section}>
          <h2 style={sectionTitle}>Per-Person Estimate (3 Nights, 2 Rounds, Group of 8)</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
            {[
              { label: "Budget", total: budgetTotal, green: cheapestGreen, lodging: Math.round((cheapestLodging * 3) / 8), food: 40 * 3, color: "#4ade80" },
              { label: "Mid-Range", total: midTotal, green: midGreen, lodging: Math.round((midLodging * 3) / 8), food: 60 * 3, color: "#EA580C" },
              { label: "Premium", total: premiumTotal, green: topGreen, lodging: Math.round((topLodging * 3) / 8), food: 90 * 3, color: "#D4A843" },
            ].map((tier) => (
              <div key={tier.label} style={{ background: "#111", border: `1px solid ${tier.color}40`, borderRadius: 10, padding: "1.25rem" }}>
                <span style={{ fontSize: "0.7rem", color: tier.color, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.06em" }}>{tier.label}</span>
                <p style={{ fontSize: "2rem", fontWeight: 700, color: tier.color, margin: "0.25rem 0 0.75rem" }}>${Math.round(tier.total)}</p>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <span>Golf (2 rounds): ${tier.green * 2}</span>
                  <span>Lodging (3 nights): ${tier.lodging}</span>
                  <span>Food & Drinks: ${tier.food}</span>
                </div>
              </div>
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", marginTop: "0.75rem" }}>
            Estimates exclude flights, car rental, and activities. Based on real venue pricing in our database.
          </p>
        </div>

        {/* Green Fee Breakdown */}
        <div style={section}>
          <h2 style={sectionTitle}>Green Fee Breakdown</h2>
          <p style={{ ...prose, marginBottom: "1rem" }}>
            {dest.courses.length} courses ranging from ${cheapestGreen} to ${topGreen} per round with cart.
          </p>
          {coursesByTier.map(({ tier, courses }) => (
            <div key={tier} style={{ marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: tierColor(tier), textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>
                {tierLabel(tier)} ({courses.length} course{courses.length > 1 ? "s" : ""})
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {courses.map((c) => (
                  <div key={c.name} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", padding: "0.4rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>{c.name}</span>
                    <span style={{ color: tierColor(tier), fontWeight: 600 }}>${c.greenFeeRange[0]}–${c.greenFeeRange[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Lodging Cost by Group Size */}
        {dest.lodging.length > 0 && (
          <div style={section}>
            <h2 style={sectionTitle}>Lodging Cost Per Person</h2>
            <p style={{ ...prose, marginBottom: "1rem" }}>
              Splitting a rental house is almost always cheaper than individual hotel rooms for golf groups.
              Here&apos;s what it looks like per person per night.
            </p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #333" }}>
                    <th style={{ textAlign: "left", padding: "0.5rem", color: "#A1A1AA" }}>Option</th>
                    <th style={{ textAlign: "right", padding: "0.5rem", color: "#A1A1AA" }}>Sleeps</th>
                    <th style={{ textAlign: "right", padding: "0.5rem", color: "#A1A1AA" }}>$/night (total)</th>
                    <th style={{ textAlign: "right", padding: "0.5rem", color: "#A1A1AA" }}>4 guys</th>
                    <th style={{ textAlign: "right", padding: "0.5rem", color: "#A1A1AA" }}>8 guys</th>
                    <th style={{ textAlign: "right", padding: "0.5rem", color: "#A1A1AA" }}>12 guys</th>
                  </tr>
                </thead>
                <tbody>
                  {lodgingOptions.map((l, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "0.5rem", color: "rgba(255,255,255,0.7)" }}>{l.type.replace("-", " ")}</td>
                      <td style={{ padding: "0.5rem", textAlign: "right", color: "rgba(255,255,255,0.5)" }}>{l.sleeps[0]}–{l.sleeps[1]}</td>
                      <td style={{ padding: "0.5rem", textAlign: "right", color: "rgba(255,255,255,0.5)" }}>${l.nightlyRange[0]}–${l.nightlyRange[1]}</td>
                      <td style={{ padding: "0.5rem", textAlign: "right", color: "#4ade80" }}>${l.perPerson4}/pp</td>
                      <td style={{ padding: "0.5rem", textAlign: "right", color: "#EA580C" }}>${l.perPerson8}/pp</td>
                      <td style={{ padding: "0.5rem", textAlign: "right", color: "#D4A843" }}>${l.perPerson12}/pp</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Activity Costs */}
        {dest.activities.length > 0 && (
          <div style={section}>
            <h2 style={sectionTitle}>Activity Costs</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {dest.activities.map((a) => (
                <div key={a.name} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div>
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>{a.name}</span>
                    <span style={{ color: "rgba(255,255,255,0.3)", marginLeft: "0.5rem" }}>{a.duration}</span>
                  </div>
                  <span style={{ color: "#EA580C", fontWeight: 600 }}>${a.pricePerPerson[0]}–${a.pricePerPerson[1]}/pp</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Money-Saving Tips */}
        <div style={section}>
          <h2 style={sectionTitle}>Money-Saving Tips for {dest.city}</h2>
          <ul style={{ ...prose, paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {dest.courses.some((c) => c.walkable) && (
              <li>Walk instead of riding — {dest.courses.filter((c) => c.walkable).length} courses here are walkable, saving $20-30/round on cart fees.</li>
            )}
            <li>Book a house that sleeps your full group — per-person lodging drops dramatically with 8+ people.</li>
            {dest.bestSeasons.length < 3 && (
              <li>Travel in the shoulder season (just before or after {dest.bestSeasons.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join("/")}) for lower rates on everything.</li>
            )}
            {dest.dining.some((d) => d.priceRange === "$" || d.priceRange === "$$") && (
              <li>Mix in casual spots — {dest.dining.filter((d) => d.priceRange === "$" || d.priceRange === "$$").length} restaurants here are under $30/person.</li>
            )}
            {dest.privateChefs?.length > 0 && (
              <li>Hire a private chef for one night — often cheaper than a $$$$ restaurant for large groups, and the house becomes the venue.</li>
            )}
            <li>Use the planner to compare different course/lodging combos and find the sweet spot for your budget.</li>
          </ul>
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
          <Link href={`/golf-trips/${dest.id}/guide`} style={{ color: "#EA580C", textDecoration: "none" }}>
            {dest.city} Planning Guide &rarr;
          </Link>
          <Link href={`/golf-trips/${dest.id}`} style={{ color: "#EA580C", textDecoration: "none" }}>
            Full Destination Page &rarr;
          </Link>
          <Link href="/golf-trips/budget-trips" style={{ color: "#A1A1AA", textDecoration: "none" }}>
            All Budget Trips
          </Link>
        </div>
      </div>
    </main>
  );
}
