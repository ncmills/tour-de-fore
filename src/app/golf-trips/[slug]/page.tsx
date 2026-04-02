import { Metadata } from "next";
import { notFound } from "next/navigation";
import { allDestinations } from "@/data";
import MulliganButton from "@/components/MulliganButton";
import HomeButton from "@/components/HomeButton";
import {
  tierLabel,
  tierColor,
  seasonLabel,
  regionSlug,
  stateSlug,
  STATE_NAMES,
  REGION_LABELS,
} from "../helpers";

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
  const title = `${dest.city} Golf Trip: Courses, Lodging, Nightlife & a Budget That Works | Tour de Fore`;
  const description = dest.description.slice(0, 155);
  return {
    title,
    description,
    alternates: { canonical: `https://tourdefore.com/golf-trips/${dest.id}` },
    openGraph: {
      title,
      description,
    },
  };
}

/* ── Shared inline styles ── */
const card: React.CSSProperties = {
  background: "#111",
  border: "1px solid #222",
  borderRadius: 12,
  padding: "1.25rem",
};

const badge = (bg: string): React.CSSProperties => ({
  display: "inline-block",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.05em",
  padding: "2px 8px",
  borderRadius: 4,
  background: bg,
  color: "#fff",
});

const sectionTitle: React.CSSProperties = {
  fontFamily: "var(--font-plan-block), sans-serif",
  fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
  letterSpacing: "0.04em",
  color: "#EA580C",
  marginBottom: "1rem",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "1rem",
};

const label: React.CSSProperties = {
  fontSize: "0.75rem",
  color: "#A1A1AA",
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
};

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = allDestinations.find((d) => d.id === slug);
  if (!dest) notFound();

  const regionSlugStr = regionSlug(dest.region);
  const stateSlugStr = stateSlug(dest.state);
  const stateName = STATE_NAMES[dest.state] || dest.state;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: `${dest.city}, ${dest.state}`,
    description: dest.description,
    url: `https://tourdefore.com/golf-trips/${dest.id}`,
    touristType: "Golf",
    containsPlace: dest.courses.map((c) => ({
      "@type": "GolfCourse",
      name: c.name,
      description: c.highlight,
      ...(c.url ? { url: c.url } : {}),
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://tourdefore.com" },
      { "@type": "ListItem", position: 2, name: "Golf Trips", item: "https://tourdefore.com/golf-trips" },
      { "@type": "ListItem", position: 3, name: `${dest.city}, ${dest.state}`, item: `https://tourdefore.com/golf-trips/${dest.id}` },
    ],
  };

  return (
    <main
      id="main-content"
      style={{
        background: "#000",
        color: "#fff",
        fontFamily: "var(--font-inter), sans-serif",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <MulliganButton href="/golf-trips" />
      <HomeButton />

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "5rem 1.5rem 4rem",
        }}
      >
        {/* Hero */}
        <h1
          style={{
            fontFamily: "var(--font-plan-block), sans-serif",
            fontSize: "clamp(2rem, 6vw, 3.2rem)",
            letterSpacing: "0.04em",
            lineHeight: 1.1,
            marginBottom: "0.5rem",
          }}
        >
          Plan Your {dest.city} Golf Trip in 60 Seconds
        </h1>

        <p
          style={{
            fontFamily: "var(--font-instrument), serif",
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
            color: "#D4A843",
            fontStyle: "italic",
            marginBottom: "1rem",
          }}
        >
          {dest.tagline}
        </p>

        <p
          style={{
            fontSize: "1rem",
            color: "#A1A1AA",
            lineHeight: 1.7,
            maxWidth: 720,
            marginBottom: "1.5rem",
          }}
        >
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
            textShadow: "0 0 7px rgba(255,106,40,0.9), 0 0 20px rgba(255,60,20,0.6), 0 0 40px rgba(255,40,10,0.3)",
            marginBottom: "1.5rem",
          }}
        >
          The best courses, bars, and rentals in {dest.city} — curated for groups.
        </p>

        {/* Quick stats */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            fontSize: "0.9rem",
            color: "#A1A1AA",
            marginBottom: "3rem",
            paddingBottom: "1.5rem",
            borderBottom: "1px solid #222",
          }}
        >
          <span>
            <strong style={{ color: "#fff" }}>{dest.courses.length}</strong>{" "}
            courses
          </span>
          <span>
            <strong style={{ color: "#fff" }}>
              {seasonLabel(dest.bestSeasons)}
            </strong>
          </span>
          <span>
            <strong style={{ color: "#fff" }}>
              {dest.nearestAirport.code}
            </strong>{" "}
            ({dest.nearestAirport.driveMinutes} min drive)
          </span>
          <span>
            <strong style={{ color: "#fff" }}>
              {dest.population === "tiny"
                ? "<10k"
                : dest.population === "small"
                  ? "10-50k"
                  : "50-200k"}
            </strong>{" "}
            population
          </span>
        </div>

        {/* ── Courses ── */}
        <h2 style={sectionTitle}>Courses</h2>
        <div style={{ ...grid, marginBottom: "3rem" }}>
          {dest.courses.map((c) => (
            <div key={c.name} style={card}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "0.5rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    lineHeight: 1.3,
                    flex: 1,
                  }}
                >
                  {c.name}
                </h3>
                <span style={badge(tierColor(c.tier))}>{tierLabel(c.tier)}</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "#A1A1AA", marginBottom: "0.75rem" }}>
                {c.highlight}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  fontSize: "0.8rem",
                  color: "#71717A",
                }}
              >
                <span>
                  ${c.greenFeeRange[0]}-${c.greenFeeRange[1]}
                </span>
                <span>{c.style}</span>
                <span>
                  {c.rating} / {c.slope} slope
                </span>
                {c.walkable && (
                  <span style={{ color: "#3a7050" }}>Walkable</span>
                )}
                {c.hypeTag && (
                  <span style={{ color: "#D4A843" }}>{c.hypeTag}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Lodging ── */}
        {dest.lodging.length > 0 && (
          <>
            <h2 style={sectionTitle}>Where to Stay</h2>
            <div style={{ ...grid, marginBottom: "3rem" }}>
              {dest.lodging.map((l, i) => (
                <div key={i} style={card}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ ...label }}>{l.type.replace("-", " ")}</span>
                    <span style={{ fontSize: "0.8rem", color: "#71717A" }}>
                      Sleeps {l.sleeps[0]}-{l.sleeps[1]}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.95rem", fontWeight: 500, marginBottom: "0.35rem" }}>
                    ${l.nightlyRange[0]}-${l.nightlyRange[1]}/night
                  </p>
                  <p style={{ fontSize: "0.85rem", color: "#A1A1AA", marginBottom: "0.5rem" }}>
                    {l.areaDescription}
                  </p>
                  {l.amenities.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {l.amenities.map((a) => (
                        <span
                          key={a}
                          style={{
                            fontSize: "0.7rem",
                            background: "#1a1a1a",
                            border: "1px solid #333",
                            borderRadius: 4,
                            padding: "2px 6px",
                            color: "#A1A1AA",
                          }}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Dining ── */}
        {dest.dining.length > 0 && (
          <>
            <h2 style={sectionTitle}>Dining</h2>
            <div style={{ ...grid, marginBottom: "3rem" }}>
              {dest.dining.map((d) => (
                <div key={d.name} style={card}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>{d.name}</h3>
                    <span style={{ fontSize: "0.85rem", color: "#D4A843" }}>{d.priceRange}</span>
                  </div>
                  <span style={label}>{d.style}</span>
                  <p style={{ fontSize: "0.85rem", color: "#A1A1AA", marginTop: "0.4rem" }}>
                    {d.highlight}
                  </p>
                  {d.googleRating && (
                    <span style={{ fontSize: "0.75rem", color: "#71717A", marginTop: "0.35rem", display: "block" }}>
                      {d.googleRating} stars
                      {d.reviewCount ? ` (${d.reviewCount.toLocaleString()} reviews)` : ""}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Nightlife ── */}
        {dest.bars.length > 0 && (
          <>
            <h2 style={sectionTitle}>Nightlife</h2>
            <div style={{ ...grid, marginBottom: "3rem" }}>
              {dest.bars.map((b) => (
                <div key={b.name} style={card}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>{b.name}</h3>
                    {b.lateNight && (
                      <span style={badge("#7c3aed")}>Late Night</span>
                    )}
                  </div>
                  <span style={label}>{b.vibe.replace("-", " ")}</span>
                  <p style={{ fontSize: "0.85rem", color: "#A1A1AA", marginTop: "0.4rem" }}>
                    {b.highlight}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Activities ── */}
        {dest.activities.length > 0 && (
          <>
            <h2 style={sectionTitle}>Activities</h2>
            <div style={{ ...grid, marginBottom: "3rem" }}>
              {dest.activities.map((a) => (
                <div key={a.name} style={card}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                    {a.name}
                  </h3>
                  <div style={{ display: "flex", gap: "0.75rem", fontSize: "0.8rem", color: "#71717A", marginBottom: "0.4rem" }}>
                    <span>{a.type.replace("-", " ")}</span>
                    <span>{a.duration}</span>
                    <span>
                      ${a.pricePerPerson[0]}-${a.pricePerPerson[1]}/pp
                    </span>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "#A1A1AA" }}>
                    {a.highlight}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── CTA ── */}
        <div style={{ textAlign: "center", margin: "3rem 0" }}>
          <a
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
              transition: "background 0.2s",
            }}
          >
            Plan This Trip &rarr;
          </a>
        </div>

        {/* ── Footer links ── */}
        <div
          style={{
            borderTop: "1px solid #222",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem 1.5rem",
            fontSize: "0.9rem",
            alignItems: "center",
          }}
        >
          <a
            href={`/golf-trips/region/${regionSlugStr}`}
            style={{ color: "#EA580C", textDecoration: "none", padding: "10px 0", minHeight: 44, display: "inline-flex", alignItems: "center" }}
          >
            More {dest.region} trips &rarr;
          </a>
          <a
            href={`/golf-trips/state/${stateSlugStr}`}
            style={{ color: "#EA580C", textDecoration: "none", padding: "10px 0", minHeight: 44, display: "inline-flex", alignItems: "center" }}
          >
            All {stateName} trips &rarr;
          </a>
          <a
            href="/golf-trips"
            style={{ color: "#A1A1AA", textDecoration: "none", padding: "10px 0", minHeight: 44, display: "inline-flex", alignItems: "center" }}
          >
            All destinations
          </a>
        </div>
      </div>
    </main>
  );
}
