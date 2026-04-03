import { Metadata } from "next";
import { allDestinations } from "@/data";
import { REGION_SLUGS, slugify, STATE_NAMES, stateSlug } from "../golf-trips/helpers";
import { Region } from "@/data/types";
import MulliganButton from "@/components/MulliganButton";
import HomeButton from "@/components/HomeButton";

export const metadata: Metadata = {
  title: "Site Map | Tour de Fore",
  description: "Complete directory of all pages on Tour de Fore — golf destinations, courses, regions, states, activities, and more.",
  alternates: { canonical: "https://tourdefore.com/site-map" },
};

const heading: React.CSSProperties = {
  fontFamily: "var(--font-plan-block), sans-serif",
  fontSize: "1.3rem",
  color: "#EA580C",
  letterSpacing: "0.04em",
  marginTop: "2.5rem",
  marginBottom: "0.75rem",
};

const subheading: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#EA580C",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
  marginTop: "1.5rem",
  marginBottom: "0.5rem",
};

const linkStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.6)",
  textDecoration: "none",
  fontSize: "0.82rem",
  padding: "4px 0",
  display: "inline-block",
};

export default function SiteMapPage() {
  const regions = Object.entries(REGION_SLUGS) as [Region, string][];
  const uniqueStates = [...new Set(allDestinations.map((d) => d.state))].sort(
    (a, b) => (STATE_NAMES[a] || a).localeCompare(STATE_NAMES[b] || b)
  );
  const activityTypes = [
    "atv", "fishing", "shooting", "casino", "brewery", "spa",
    "water-sports", "horseback", "hiking", "rafting", "zipline",
    "go-karts", "axe-throwing", "skeet", "boat-rental", "kayaking",
    "winery", "distillery", "paintball", "mountain-biking",
  ];

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

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 1.5rem 4rem" }}>
        <h1
          style={{
            fontFamily: "var(--font-plan-block), sans-serif",
            fontSize: "clamp(2rem, 6vw, 3.2rem)",
            letterSpacing: "0.04em",
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}
        >
          Site Map
        </h1>

        {/* Main Pages */}
        <h2 style={heading}>Main Pages</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <a href="/" style={linkStyle}>Home</a>
          <a href="/golf-trips" style={linkStyle}>Golf Trip Destinations</a>
          <a href="/plan-a-trip" style={linkStyle}>Plan a Trip</a>
          <a href="/shop" style={linkStyle}>Pro Shop</a>
          <a href="/concierge" style={linkStyle}>Concierge</a>
          <a href="/past-trips" style={linkStyle}>Past Trips</a>
          {[2025, 2024, 2023, 2022, 2021].map((y) => (
            <a key={y} href={`/past-trips/${y}`} style={{ ...linkStyle, paddingLeft: "1rem" }}>{y} Trips</a>
          ))}
          <a href="/privacy" style={linkStyle}>Privacy Policy</a>
        </div>

        {/* Regions */}
        <h2 style={heading}>Regions</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {regions.map(([name, slug]) => (
            <a key={slug} href={`/golf-trips/region/${slug}`} style={linkStyle}>{name}</a>
          ))}
        </div>

        {/* States */}
        <h2 style={heading}>States</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem 1rem" }}>
          {uniqueStates.map((s) => (
            <a key={s} href={`/golf-trips/state/${stateSlug(s)}`} style={linkStyle}>
              {STATE_NAMES[s] || s}
            </a>
          ))}
        </div>

        {/* Destinations & Courses by Region */}
        <h2 style={heading}>All Destinations & Courses</h2>
        {regions.map(([regionName, rSlug]) => {
          const regionDests = allDestinations
            .filter((d) => REGION_SLUGS[d.region] === rSlug)
            .sort((a, b) => a.city.localeCompare(b.city));
          return (
            <div key={rSlug}>
              <h3 style={subheading}>{regionName}</h3>
              {regionDests.map((d) => (
                <div key={d.id} style={{ marginBottom: "0.75rem" }}>
                  <a href={`/golf-trips/${d.id}`} style={{ ...linkStyle, color: "#fff", fontWeight: 500 }}>
                    {d.city}, {d.state}
                  </a>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem 0.75rem", paddingLeft: "1rem" }}>
                    {d.courses.map((c) => (
                      <a
                        key={c.name}
                        href={`/golf-trips/${d.id}/courses/${slugify(c.name)}`}
                        style={linkStyle}
                      >
                        {c.name}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        {/* Course Tiers */}
        <h2 style={heading}>Course Tiers</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 1rem" }}>
          {["bucket-list", "premium", "solid", "budget"].map((t) => (
            <a key={t} href={`/golf-trips/courses/${t}`} style={linkStyle}>
              {t.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </a>
          ))}
        </div>

        {/* Activities */}
        <h2 style={heading}>Activities</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem 1rem" }}>
          {activityTypes.map((a) => (
            <a key={a} href={`/golf-trips/activities/${a}`} style={linkStyle}>
              {a.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </a>
          ))}
        </div>

        {/* Collections */}
        <h2 style={heading}>Collections</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 1rem" }}>
          <a href="/golf-trips/bachelor-party" style={linkStyle}>Bachelor Party</a>
          <a href="/golf-trips/budget-trips" style={linkStyle}>Budget Trips</a>
          <a href="/golf-trips/bucket-list-trips" style={linkStyle}>Bucket List Trips</a>
        </div>
      </div>
    </main>
  );
}
