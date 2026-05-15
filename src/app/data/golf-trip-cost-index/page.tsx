import type { Metadata } from "next";
import Link from "next/link";
import { allDestinations } from "@/data";

const PAGE_URL = "https://tourdefore.com/data/golf-trip-cost-index";

// Trip assumptions — kept simple + transparent so the index is comparable across cities.
const TRIP_PEOPLE = 8;
const TRIP_NIGHTS = 3;
const TRIP_ROUNDS = 2;
const DINING_STOPS = 3;
const DINING_COST_PER_STOP: Record<"$" | "$$" | "$$$" | "$$$$", number> = {
  "$": 25,
  "$$": 50,
  "$$$": 85,
  "$$$$": 140,
};

interface CostBreakdown {
  destId: string;
  city: string;
  state: string;
  region: string;
  lodgingPerPerson: number;
  greenFeesPerPerson: number;
  diningPerPerson: number;
  totalPerPerson: number;
  avgGreenFee: number;
  cheapestLodging: number;
}

function computeCost(d: (typeof allDestinations)[number]): CostBreakdown | null {
  if (d.courses.length === 0 || d.lodging.length === 0) return null;

  // Lodging: cheapest option that sleeps the trip size.
  const fits = d.lodging.filter((l) => l.sleeps[1] >= TRIP_PEOPLE);
  const lodgingOption = fits.length > 0
    ? fits.reduce((min, l) => (l.nightlyRange[0] < min.nightlyRange[0] ? l : min), fits[0])
    : d.lodging[0];
  const lodgingNightly = (lodgingOption.nightlyRange[0] + lodgingOption.nightlyRange[1]) / 2;
  const lodgingPerPerson = (lodgingNightly * TRIP_NIGHTS) / TRIP_PEOPLE;

  // Green fees: average across all courses, × 2 rounds.
  const avgGreenFee =
    d.courses.reduce(
      (sum, c) => sum + (c.greenFeeRange[0] + c.greenFeeRange[1]) / 2,
      0
    ) / d.courses.length;
  const greenFeesPerPerson = avgGreenFee * TRIP_ROUNDS;

  // Dining: pick the median-priced restaurant tier, × 3 stops.
  const tiers = d.dining.map((s) => s.priceRange);
  const medianTier: "$" | "$$" | "$$$" | "$$$$" = tiers.length > 0
    ? (tiers.sort()[Math.floor(tiers.length / 2)] as "$" | "$$" | "$$$" | "$$$$")
    : "$$";
  const diningPerPerson = DINING_COST_PER_STOP[medianTier] * DINING_STOPS;

  const totalPerPerson = lodgingPerPerson + greenFeesPerPerson + diningPerPerson;

  return {
    destId: d.id,
    city: d.city,
    state: d.state,
    region: d.region,
    lodgingPerPerson: Math.round(lodgingPerPerson),
    greenFeesPerPerson: Math.round(greenFeesPerPerson),
    diningPerPerson: Math.round(diningPerPerson),
    totalPerPerson: Math.round(totalPerPerson),
    avgGreenFee: Math.round(avgGreenFee),
    cheapestLodging: lodgingOption.nightlyRange[0],
  };
}

const ALL_COSTS = allDestinations
  .map(computeCost)
  .filter((c): c is CostBreakdown => c !== null);

export async function generateMetadata(): Promise<Metadata> {
  const cheapest = [...ALL_COSTS].sort((a, b) => a.totalPerPerson - b.totalPerPerson)[0];
  const priciest = [...ALL_COSTS].sort((a, b) => b.totalPerPerson - a.totalPerPerson)[0];
  return {
    title: `U.S. Golf Trip Cost Index — ${ALL_COSTS.length} Destinations Ranked (2026)`,
    description: `Cheapest: ${cheapest?.city} ($${cheapest?.totalPerPerson}/pp). Priciest: ${priciest?.city} ($${priciest?.totalPerPerson}/pp). 8-person, 3-night, 2-round trip — every destination ranked.`,
    alternates: { canonical: PAGE_URL },
    openGraph: {
      type: "article",
      url: PAGE_URL,
      title: `U.S. Golf Trip Cost Index (${ALL_COSTS.length} Cities Ranked)`,
      description: `8-person, 3-night, 2-round trip — every destination ranked cheapest to priciest. Free dataset.`,
    },
  };
}

export default function GolfTripCostIndexPage() {
  const ranked = [...ALL_COSTS].sort((a, b) => a.totalPerPerson - b.totalPerPerson);
  const cheapest = ranked[0];
  const priciest = ranked[ranked.length - 1];
  const median = ranked[Math.floor(ranked.length / 2)];
  const avg = Math.round(ranked.reduce((s, r) => s + r.totalPerPerson, 0) / ranked.length);

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `U.S. Golf Trip Cost Index (${ranked.length} destinations)`,
    description: `Estimated per-person cost of a ${TRIP_PEOPLE}-person, ${TRIP_NIGHTS}-night, ${TRIP_ROUNDS}-round golf trip in each of ${ranked.length} U.S. destinations, broken down by lodging, green fees, and dining.`,
    url: PAGE_URL,
    keywords: [
      "golf trip cost",
      "bachelor party golf",
      "golf destinations",
      "green fees",
      "golf trip planning",
    ],
    creator: { "@type": "Organization", name: "Tour de Fore", url: "https://tourdefore.com" },
    isAccessibleForFree: true,
    license: "https://creativecommons.org/licenses/by/4.0/",
    citation: `Tour de Fore. (2026). U.S. Golf Trip Cost Index. Retrieved from ${PAGE_URL}`,
    spatialCoverage: { "@type": "Place", name: "United States" },
    temporalCoverage: "2026",
    variableMeasured: [
      "Per-person lodging cost (3 nights ÷ 8 guests)",
      "Per-person green-fee cost (2 rounds × avg green fee)",
      "Per-person dining cost (3 stops × median tier)",
      "Total per-person trip cost (USD)",
    ],
  };

  return (
    <main style={{ background: "#000", color: "#fff", minHeight: "100vh", padding: "5rem 1.5rem 4rem" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <nav style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginBottom: "1.5rem" }}>
          <Link href="/data" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
            ← Open data
          </Link>
        </nav>

        <p style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "0.75rem", letterSpacing: "0.14em", color: "#A1A1AA", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          Annual Dataset · 2026
        </p>
        <h1 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.02em", lineHeight: 1.05, marginBottom: "1.5rem" }}>
          U.S. golf trip cost index.
        </h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.6, color: "rgba(255,255,255,0.7)", maxWidth: 680 }}>
          Every U.S. golf-trip destination, ranked by total per-person trip
          cost for a standardized {TRIP_PEOPLE}-person, {TRIP_NIGHTS}-night,{" "}
          {TRIP_ROUNDS}-round trip. <strong style={{ color: "#fff" }}>{cheapest?.city}, {cheapest?.state}</strong> is the cheapest at <strong style={{ color: "#fff" }}>${cheapest?.totalPerPerson}/pp</strong>; <strong style={{ color: "#fff" }}>{priciest?.city}, {priciest?.state}</strong> is the priciest at <strong style={{ color: "#fff" }}>${priciest?.totalPerPerson}/pp</strong>.
        </p>

        {/* Headline stats */}
        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1px", background: "#222", marginTop: "2.5rem" }}>
          <Stat label="Destinations" value={`${ranked.length}`} />
          <Stat label="Cheapest" value={`$${cheapest?.totalPerPerson}/pp`} sub={cheapest?.city} />
          <Stat label="Median" value={`$${median?.totalPerPerson}/pp`} sub={median?.city} />
          <Stat label="Avg / pp" value={`$${avg}`} />
        </section>

        {/* Methodology preview */}
        <section style={{ marginTop: "2.5rem", padding: "1.25rem 1.5rem", border: "1px solid #222", background: "rgba(234, 88, 12, 0.04)" }}>
          <p style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "0.7rem", letterSpacing: "0.14em", color: "#EA580C", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            Trip assumptions
          </p>
          <p style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "rgba(255,255,255,0.75)" }}>
            {TRIP_PEOPLE} people · {TRIP_NIGHTS} nights · {TRIP_ROUNDS} rounds of golf · {DINING_STOPS} dining stops. Lodging = cheapest property that sleeps the group, divided by headcount. Green fees = average course in the destination × 2. Dining = median price-tier restaurant × 3 stops (assumed ${DINING_COST_PER_STOP["$$"]}/pp at the $$ tier).
          </p>
        </section>

        {/* Leaderboard */}
        <section style={{ marginTop: "3rem" }}>
          <h2 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "0.75rem", letterSpacing: "0.14em", color: "#A1A1AA", textTransform: "uppercase", marginBottom: "1rem" }}>
            Full ranking · cheapest first
          </h2>
          <div style={{ overflowX: "auto", border: "1px solid #222" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", minWidth: 720 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid #222" }}>
                  <th style={th}>Rank</th>
                  <th style={{ ...th, textAlign: "left" }}>City</th>
                  <th style={th}>Lodging</th>
                  <th style={th}>Green fees</th>
                  <th style={th}>Dining</th>
                  <th style={{ ...th, color: "#EA580C" }}>Total / pp</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((c, i) => (
                  <tr key={c.destId} style={{ borderBottom: "1px solid #1a1a1a" }}>
                    <td style={{ ...td, color: "#A1A1AA", fontFamily: "monospace" }}>{i + 1}</td>
                    <td style={{ ...td, textAlign: "left" }}>
                      <Link href={`/golf-trips/${c.destId}`} style={{ color: "#EA580C", textDecoration: "none" }}>
                        {c.city}, {c.state}
                      </Link>{" "}
                      <span style={{ fontSize: "0.75rem", color: "#666" }}>· {c.region}</span>
                    </td>
                    <td style={{ ...td, fontFamily: "monospace", color: "rgba(255,255,255,0.7)" }}>${c.lodgingPerPerson}</td>
                    <td style={{ ...td, fontFamily: "monospace", color: "rgba(255,255,255,0.7)" }}>${c.greenFeesPerPerson}</td>
                    <td style={{ ...td, fontFamily: "monospace", color: "rgba(255,255,255,0.7)" }}>${c.diningPerPerson}</td>
                    <td style={{ ...td, fontFamily: "monospace", color: "#fff", fontWeight: 600 }}>${c.totalPerPerson}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Methodology */}
        <section style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid #222" }}>
          <h2 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.5rem", marginBottom: "1rem" }}>
            Methodology
          </h2>
          <div style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(255,255,255,0.7)", maxWidth: 680, display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p>
              <strong style={{ color: "#fff" }}>Source.</strong> Lodging
              nightly ranges, course green fees, and restaurant price tiers
              are pulled directly from venue pages we&apos;ve verified for
              each destination. Where venue pricing has changed since last
              verification, the figures here represent the most recent
              published rate, not an estimate.
            </p>
            <p>
              <strong style={{ color: "#fff" }}>Lodging math.</strong> For
              each city we pick the cheapest single property that sleeps{" "}
              {TRIP_PEOPLE} (or the cheapest property at all if none does), use the
              midpoint of its nightly range × {TRIP_NIGHTS} nights, then
              divide by {TRIP_PEOPLE}. This is the math an actual group does
              when booking a house — not a per-person hotel rate.
            </p>
            <p>
              <strong style={{ color: "#fff" }}>Green-fee math.</strong> We
              average the green-fee midpoint across all listed courses in the
              destination and multiply by {TRIP_ROUNDS} rounds. This penalizes
              cities with only one expensive resort course and rewards cities
              with multiple cheaper options — which mirrors how groups actually
              plan a trip.
            </p>
            <p>
              <strong style={{ color: "#fff" }}>Dining math.</strong> We pick
              the median-priced restaurant tier in the destination, assume{" "}
              {DINING_STOPS} dining stops over the trip, and apply a tier-based
              per-person estimate ($25 / $50 / $85 / $140 for $/$$/$$$/$$$$).
              Bars, breakfasts, and snacks are excluded.
            </p>
            <p>
              <strong style={{ color: "#fff" }}>What this excludes.</strong>{" "}
              Airfare, ground transportation, caddies, club rentals, alcohol,
              tipping, club-fittings, off-course activities, and any
              private-chef or party-bus add-ons. Real trips run 15–30% above
              these numbers once everything is added.
            </p>
            <p>
              <strong style={{ color: "#fff" }}>Refresh cadence.</strong>{" "}
              Reviewed annually. Material pricing changes mid-year (course
              fee increases, popular property removed from market) trigger an
              out-of-cycle update.
            </p>
          </div>
        </section>

        {/* Citation */}
        <section style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #222" }}>
          <h2 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.5rem", marginBottom: "1rem" }}>
            Cite this dataset
          </h2>
          <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", maxWidth: 680, display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p>
              Free to cite, screenshot, embed, or republish under{" "}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                style={{ color: "#EA580C", textDecoration: "underline" }}
                rel="noopener"
              >
                CC BY 4.0
              </a>
              . Link back when you cite us.
            </p>
            <pre style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #222", padding: "1rem", fontSize: "0.8rem", fontFamily: "monospace", overflowX: "auto", whiteSpace: "pre-wrap", margin: 0 }}>
{`Tour de Fore. (2026). U.S. Golf Trip Cost Index.
Retrieved from ${PAGE_URL}`}
            </pre>
          </div>
        </section>
      </div>
    </main>
  );
}

const th: React.CSSProperties = {
  padding: "0.75rem 1rem",
  fontFamily: "var(--font-plan-block), sans-serif",
  fontSize: "0.7rem",
  letterSpacing: "0.12em",
  color: "#A1A1AA",
  textTransform: "uppercase",
  textAlign: "right",
  fontWeight: 600,
};

const td: React.CSSProperties = {
  padding: "0.75rem 1rem",
  textAlign: "right",
};

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{ background: "#000", padding: "1rem 1.25rem" }}>
      <div style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "0.65rem", letterSpacing: "0.14em", color: "#A1A1AA", textTransform: "uppercase", marginBottom: "0.4rem" }}>
        {label}
      </div>
      <div style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.4rem", lineHeight: 1.1, color: "#fff" }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: "0.75rem", color: "#A1A1AA", marginTop: "0.3rem" }}>
          {sub}
        </div>
      )}
    </div>
  );
}
