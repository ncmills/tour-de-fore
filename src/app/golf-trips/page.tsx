import { Metadata } from "next";
import { allDestinations } from "@/data";
import MulliganButton from "@/components/MulliganButton";
import HomeButton from "@/components/HomeButton";
import { REGION_SLUGS, REGION_LABELS } from "./helpers";
import { Region } from "@/data/types";

export const metadata: Metadata = {
  title: "Golf Trip Destinations — 133 Cities Across America | Tour de Fore",
  description:
    "Browse 133 hand-picked golf trip destinations across 7 regions. Courses, lodging, nightlife, and activities — all in one place.",
  alternates: { canonical: "https://tourdefore.com/golf-trips" },
  openGraph: {
    title: "Golf Trip Destinations — 133 Cities | Tour de Fore",
    description:
      "Browse 133 hand-picked golf trip destinations across 7 regions.",
    images: ["/icon-fancy.png"],
  },
};

const card: React.CSSProperties = {
  background: "#111",
  border: "1px solid #222",
  borderRadius: 12,
  padding: "1.5rem",
  textDecoration: "none",
  color: "#fff",
  display: "block",
  transition: "border-color 0.2s",
};

export default function GolfTripsIndex() {
  const regionCounts: Record<string, number> = {};
  const regionStates: Record<string, Set<string>> = {};

  for (const d of allDestinations) {
    const slug = REGION_SLUGS[d.region];
    regionCounts[slug] = (regionCounts[slug] || 0) + 1;
    if (!regionStates[slug]) regionStates[slug] = new Set();
    regionStates[slug].add(d.state);
  }

  const regions = Object.entries(REGION_SLUGS) as [Region, string][];

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
      <MulliganButton href="/?skip=1" />
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
          Golf Trip Destinations
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "#A1A1AA",
            lineHeight: 1.7,
            maxWidth: 640,
            marginBottom: "3rem",
          }}
        >
          133 hand-picked cities across 7 regions. Each destination is loaded with
          courses, lodging, restaurants, nightlife, and activities for the ultimate
          group golf trip.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
          }}
        >
          {regions.map(([regionName, slug]) => (
            <a key={slug} href={`/golf-trips/region/${slug}`} style={card}>
              <h2
                style={{
                  fontFamily: "var(--font-plan-block), sans-serif",
                  fontSize: "1.5rem",
                  letterSpacing: "0.04em",
                  color: "#EA580C",
                  marginBottom: "0.4rem",
                }}
              >
                {regionName}
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#A1A1AA", marginBottom: "0.3rem" }}>
                {regionCounts[slug]} destinations
              </p>
              <p style={{ fontSize: "0.8rem", color: "#71717A" }}>
                {Array.from(regionStates[slug] || [])
                  .sort()
                  .join(", ")}
              </p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
