import { Metadata } from "next";
import { notFound } from "next/navigation";
import { allDestinations } from "@/data";
import MulliganButton from "@/components/MulliganButton";
import HomeButton from "@/components/HomeButton";
import {
  REGION_SLUGS,
  REGION_LABELS,
  STATE_NAMES,
  seasonLabel,
  stateSlug,
  metaDescription,
} from "../../helpers";
import { Region } from "@/data/types";

const ALL_REGION_SLUGS = Object.values(REGION_SLUGS);

export function generateStaticParams() {
  return ALL_REGION_SLUGS.map((r) => ({ region: r }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const label = REGION_LABELS[region];
  if (!label) return {};

  const dests = allDestinations.filter(
    (d) => REGION_SLUGS[d.region] === region
  );
  const states = [...new Set(dests.map((d) => d.state))].sort();

  const title = `${label} Golf Trips — ${states.join(", ")} | Tour de Fore`;
  const description = `Explore ${dests.length} golf trip destinations across the ${label}: ${states.map((s) => STATE_NAMES[s] || s).join(", ")}.`;

  return {
    title,
    description: metaDescription(description),
    alternates: {
      canonical: `https://tourdefore.com/golf-trips/region/${region}`,
    },
    openGraph: { title, description: metaDescription(description), images: ["/icon-fancy.png"] },
  };
}

const card: React.CSSProperties = {
  background: "#111",
  border: "1px solid #222",
  borderRadius: 12,
  padding: "1.25rem",
  textDecoration: "none",
  color: "#fff",
  display: "block",
};

export default async function RegionPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region: regionParam } = await params;
  const label = REGION_LABELS[regionParam];
  if (!label) notFound();

  const dests = allDestinations.filter(
    (d) => REGION_SLUGS[d.region] === regionParam
  );
  if (dests.length === 0) notFound();

  // Group by state
  const byState: Record<string, typeof dests> = {};
  for (const d of dests) {
    if (!byState[d.state]) byState[d.state] = [];
    byState[d.state].push(d);
  }
  const sortedStates = Object.keys(byState).sort();

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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://tourdefore.com" },
              { "@type": "ListItem", position: 2, name: "Golf Trips", item: "https://tourdefore.com/golf-trips" },
              { "@type": "ListItem", position: 3, name: label, item: `https://tourdefore.com/golf-trips/region/${regionParam}` },
            ],
          }),
        }}
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
        <h1
          style={{
            fontFamily: "var(--font-plan-block), sans-serif",
            fontSize: "clamp(2rem, 6vw, 3.2rem)",
            letterSpacing: "0.04em",
            lineHeight: 1.1,
            marginBottom: "0.5rem",
          }}
        >
          {label} Golf Trips
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "#A1A1AA",
            marginBottom: "3rem",
          }}
        >
          {dests.length} destinations across{" "}
          {sortedStates.map((s) => STATE_NAMES[s] || s).join(", ")}
        </p>

        {sortedStates.map((st) => (
          <section key={st} style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-plan-block), sans-serif",
                fontSize: "1.4rem",
                letterSpacing: "0.04em",
                color: "#EA580C",
                marginBottom: "0.75rem",
              }}
            >
              <a
                href={`/golf-trips/state/${stateSlug(st)}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {STATE_NAMES[st] || st}
              </a>
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1rem",
              }}
            >
              {byState[st].map((d) => (
                <a key={d.id} href={`/golf-trips/${d.id}`} style={card}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                    {d.city}, {d.state}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#A1A1AA", marginBottom: "0.5rem" }}>
                    {d.tagline}
                  </p>
                  <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem", color: "#71717A" }}>
                    <span>{d.courses.length} courses</span>
                    <span>{seasonLabel(d.bestSeasons)}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}

        <div style={{ borderTop: "1px solid #222", paddingTop: "1.5rem" }}>
          <a href="/golf-trips" style={{ color: "#EA580C", textDecoration: "none", fontSize: "0.9rem" }}>
            &larr; All destinations
          </a>
        </div>
      </div>
    </main>
  );
}
