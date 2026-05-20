import { Metadata } from "next";
import { notFound } from "next/navigation";
import { allDestinations } from "@/data";
import type { Destination } from "@/data/types";
import MulliganButton from "@/components/MulliganButton";
import HomeButton from "@/components/HomeButton";
import {
  STATE_NAMES,
  stateSlug,
  seasonLabel,
  regionSlug,
  metaDescription,
} from "../../helpers";

export function generateStaticParams() {
  const states = [...new Set(allDestinations.map((d) => d.state))];
  return states.map((s) => ({ state: stateSlug(s) }));
}

function findState(slug: string): string | undefined {
  return Object.entries(STATE_NAMES).find(
    ([abbr, name]) => stateSlug(abbr) === slug
  )?.[0];
}

function avgGreenFee(d: Destination): number {
  if (d.courses.length === 0) return 0;
  const mids = d.courses.map((c) => (c.greenFeeRange[0] + c.greenFeeRange[1]) / 2);
  return Math.round(mids.reduce((a, b) => a + b, 0) / mids.length);
}

function cheapestLodging(d: Destination): number {
  if (d.lodging.length === 0) return 0;
  return Math.min(...d.lodging.map((l) => l.nightlyRange[0]));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const abbr = findState(state);
  if (!abbr) return {};
  const name = STATE_NAMES[abbr] || abbr;
  const dests = allDestinations.filter((d) => d.state === abbr);
  // If the state has 2+ destinations with green-fee data, pack the cheap/expensive
  // delta into the snippet so the page can match "cheaper than [anchor city]"
  // long-tail queries (e.g. "arizona golf trips cheaper than scottsdale" was
  // stuck at position ~70 with 0 clicks per GSC 2026-05-20).
  let description = `Explore ${dests.length} golf trip destinations in ${name}. Courses, lodging, nightlife, and activities for your group golf getaway.`;
  const withFees = dests.filter((d) => avgGreenFee(d) > 0);
  if (withFees.length >= 2) {
    const sorted = [...withFees].sort((a, b) => avgGreenFee(b) - avgGreenFee(a));
    const anchor = sorted[0];
    const cheapest = sorted[sorted.length - 1];
    const delta = avgGreenFee(anchor) - avgGreenFee(cheapest);
    if (delta >= 20) {
      description = `${dests.length} golf trip cities in ${name}. ${cheapest.city} averages $${delta} cheaper in green fees than ${anchor.city} — full course, lodging, and nightlife breakdowns inside.`;
    }
  }
  const title = `Best Golf Trips in ${name} | Tour de Fore`;
  return {
    title,
    description: metaDescription(description),
    alternates: {
      canonical: `https://tourdefore.com/golf-trips/state/${state}`,
    },
    openGraph: {
      type: "website",
      url: `https://tourdefore.com/golf-trips/state/${state}`,
      title,
      description: metaDescription(description),
      images: ["/icon-fancy.png"],
    },
    twitter: { card: "summary_large_image", title, description: metaDescription(description) },
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

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: stateParam } = await params;
  const abbr = findState(stateParam);
  if (!abbr) notFound();

  const name = STATE_NAMES[abbr] || abbr;
  const dests = allDestinations.filter((d) => d.state === abbr);
  if (dests.length === 0) notFound();

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
              { "@type": "ListItem", position: 3, name, item: `https://tourdefore.com/golf-trips/state/${stateParam}` },
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
          Best Golf Trips in {name}
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "#A1A1AA",
            marginBottom: "3rem",
          }}
        >
          {dests.length} destination{dests.length > 1 ? "s" : ""} in {name}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            marginBottom: "3rem",
          }}
        >
          {dests.map((d) => (
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
                <span>{d.nearestAirport.code}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Cheaper-alternatives block. Targets long-tail comparison intent
            like "arizona golf trips cheaper than scottsdale" — which was
            stuck at position ~70 with 0 clicks (GSC 2026-05-20). We
            anchor on the priciest city in the state, then surface the
            cheaper ones with explicit green-fee deltas and direct links
            to the existing /compare pages so link equity flows to the
            same-state matchups the compare-page generator already builds. */}
        {(() => {
          const withFees = dests.filter((d) => avgGreenFee(d) > 0);
          if (withFees.length < 2) return null;
          const sorted = [...withFees].sort((a, b) => avgGreenFee(b) - avgGreenFee(a));
          const anchor = sorted[0];
          const alternatives = sorted.slice(1);
          const anchorFee = avgGreenFee(anchor);
          const maxDelta = anchorFee - avgGreenFee(alternatives[alternatives.length - 1]);
          if (maxDelta < 20) return null;
          return (
            <div style={{ marginBottom: "3rem" }}>
              <h2
                style={{
                  fontFamily: "var(--font-plan-block), sans-serif",
                  fontSize: "1.5rem",
                  letterSpacing: "0.04em",
                  marginBottom: "0.5rem",
                }}
              >
                Cheaper {name} alternatives to {anchor.city}
              </h2>
              <p style={{ fontSize: "0.95rem", color: "#A1A1AA", lineHeight: 1.6, marginBottom: "1.5rem", maxWidth: 720 }}>
                {anchor.city} averages ${anchorFee} per round across {anchor.courses.length} tracked courses. Same state, smaller bill — here&apos;s how the other {name} golf-trip cities stack up.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {alternatives.map((alt) => {
                  const altFee = avgGreenFee(alt);
                  const delta = anchorFee - altFee;
                  const altLodging = cheapestLodging(alt);
                  return (
                    <div
                      key={alt.id}
                      style={{
                        background: "#0a0a0a",
                        border: "1px solid #222",
                        borderRadius: 10,
                        padding: "1rem 1.25rem",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.75rem 1.25rem",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ flex: "1 1 220px", minWidth: 0 }}>
                        <div style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.2rem" }}>
                          {alt.city}, {alt.state}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#A1A1AA" }}>
                          {alt.tagline}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "1.25rem", fontSize: "0.85rem", color: "#A1A1AA" }}>
                        <div>
                          <div style={{ color: "#4ade80", fontWeight: 700, fontSize: "0.95rem" }}>
                            ${delta} cheaper
                          </div>
                          <div style={{ fontSize: "0.7rem", color: "#71717A", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                            avg green fee
                          </div>
                        </div>
                        <div>
                          <div style={{ color: "#fff", fontWeight: 600 }}>${altFee}/round</div>
                          <div style={{ fontSize: "0.7rem", color: "#71717A", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                            {alt.courses.length} courses
                          </div>
                        </div>
                        {altLodging > 0 && (
                          <div>
                            <div style={{ color: "#fff", fontWeight: 600 }}>${altLodging}/night</div>
                            <div style={{ fontSize: "0.7rem", color: "#71717A", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                              lodging from
                            </div>
                          </div>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: "0.75rem", flex: "1 1 100%", borderTop: "1px solid #1a1a1a", paddingTop: "0.6rem", marginTop: "0.1rem" }}>
                        <a
                          href={`/golf-trips/${alt.id}`}
                          style={{ color: "#EA580C", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600 }}
                        >
                          {alt.city} details &rarr;
                        </a>
                        <a
                          href={`/golf-trips/compare/${anchor.id}-vs-${alt.id}`}
                          style={{ color: "#EA580C", textDecoration: "none", fontSize: "0.85rem" }}
                        >
                          {anchor.city} vs {alt.city} &rarr;
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        <div
          style={{
            borderTop: "1px solid #222",
            paddingTop: "1.5rem",
            display: "flex",
            gap: "1.5rem",
            fontSize: "0.9rem",
          }}
        >
          <a
            href={`/golf-trips/region/${regionSlug(dests[0].region)}`}
            style={{ color: "#EA580C", textDecoration: "none" }}
          >
            &larr; {dests[0].region} trips
          </a>
          <a
            href="/golf-trips"
            style={{ color: "#A1A1AA", textDecoration: "none" }}
          >
            All destinations
          </a>
        </div>
      </div>
    </main>
  );
}
