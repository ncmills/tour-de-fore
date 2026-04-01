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

        {/* Browse by Course Tier */}
        <div style={{ marginTop: "4rem" }}>
          <h2 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.5rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1.5rem" }}>Browse by Course Tier</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {[{ slug: "bucket-list", label: "Bucket List", color: "#D4A843" }, { slug: "premium", label: "Premium", color: "#EA580C" }, { slug: "solid", label: "Solid", color: "#3a7050" }, { slug: "budget", label: "Budget", color: "#71717A" }].map((t) => (
              <a key={t.slug} href={`/golf-trips/courses/${t.slug}`} style={{ padding: "10px 24px", background: "rgba(255,255,255,0.04)", border: `1px solid ${t.color}40`, borderRadius: 8, textDecoration: "none", color: t.color, fontSize: "0.9rem", fontWeight: 600 }}>{t.label}</a>
            ))}
          </div>
        </div>

        {/* Popular Collections */}
        <div style={{ marginTop: "3rem" }}>
          <h2 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.5rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1.5rem" }}>Popular Collections</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <a href="/golf-trips/bachelor-party" style={{ padding: "10px 24px", background: "rgba(234,88,12,0.08)", border: "1px solid rgba(234,88,12,0.3)", borderRadius: 8, textDecoration: "none", color: "#EA580C", fontSize: "0.9rem", fontWeight: 600 }}>Bachelor Party</a>
            <a href="/golf-trips/budget-trips" style={{ padding: "10px 24px", background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 8, textDecoration: "none", color: "#4ade80", fontSize: "0.9rem", fontWeight: 600 }}>Budget Friendly</a>
            <a href="/golf-trips/bucket-list-trips" style={{ padding: "10px 24px", background: "rgba(212,168,67,0.08)", border: "1px solid rgba(212,168,67,0.3)", borderRadius: 8, textDecoration: "none", color: "#D4A843", fontSize: "0.9rem", fontWeight: 600 }}>Bucket List</a>
          </div>
        </div>

        {/* Browse by Activity */}
        <div style={{ marginTop: "3rem", marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.5rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1.5rem" }}>Browse by Activity</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {["fishing", "casino", "brewery", "spa", "hiking", "atv", "shooting", "water-sports", "winery", "rafting"].map((a) => (
              <a key={a} href={`/golf-trips/activities/${a}`} style={{ padding: "6px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, textDecoration: "none", color: "rgba(255,255,255,0.6)", fontSize: "0.8rem" }}>{a.replace(/-/g, " ")}</a>
            ))}
          </div>
        </div>

        {/* Crawlable intro */}
        <div style={{ marginTop: "4rem", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2rem" }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", lineHeight: 1.8, maxWidth: 700 }}>
            Tour de Fore&apos;s AI-powered golf trip planner covers 133 destinations across America. Browse courses, lodging, dining, nightlife, and activities — then build a custom itinerary for your crew. Plan your next group golf getaway in minutes.
          </p>
        </div>
      </div>
    </main>
  );
}
