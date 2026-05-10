import Link from "next/link";
import { allDestinations } from "@/data";
import MulliganButton from "@/components/MulliganButton";
import HomeButton from "@/components/HomeButton";
import type { Region } from "@/data/types";
import { REGION_SLUGS } from "../helpers";

export const metadata = {
  title: "Bachelor Party Golf Trips — Best Destinations | Tour de Fore",
  description: "Plan the ultimate bachelor party golf trip. Top destinations with the best nightlife, courses, and group-friendly lodging.",
  alternates: { canonical: "https://tourdefore.com/golf-trips/bachelor-party" },
  openGraph: {
    title: "Bachelor Party Golf Trips — Best Destinations | Tour de Fore",
    description: "Plan the ultimate bachelor party golf trip. Top destinations with the best nightlife, courses, and group-friendly lodging.",
    images: ["/icon-fancy.png"],
  },
};

export default function BachelorPartyPage() {
  const eligible = allDestinations
    .map((d) => ({
      dest: d,
      score: d.bars.filter((b) => b.lateNight).length * 3 + d.bars.length * 2 + d.activities.length + d.dining.length,
    }))
    .filter((x) => x.dest.population !== "tiny" && x.dest.bars.length >= 3)
    .sort((a, b) => b.score - a.score);

  const topRanked = eligible.slice(0, 20);

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 6rem)" }}>
      <MulliganButton href="/golf-trips" />
      <HomeButton />
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.5rem" }}>
          Bachelor Party Golf Trips
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem" }}>Top destinations with the best nightlife, courses, and group vibes.</p>

        <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", lineHeight: 1.8, maxWidth: 720, marginBottom: "3rem" }}>
          <p style={{ marginBottom: "0.75rem" }}>
            A bachelor party golf trip is the perfect send-off — competitive rounds during the day, epic nights out after.
            We ranked {eligible.length} destinations by nightlife depth (late-night bars, variety of scenes), dining
            quality, activity options, and of course, the golf itself. Every destination below has at least 3 bars,
            a non-tiny town population, and enough going on to keep your crew entertained from tee time to last call.
          </p>
          <p>
            Each destination has a dedicated bachelor party guide breaking down the full picture: course-by-course details,
            the best group-friendly lodging (houses that sleep 8+), restaurant picks for group dinners, and every bar
            worth hitting. Hit the planner and get a complete bachelor party itinerary in 60 seconds flat.
          </p>
        </div>

        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1rem", color: "rgba(255,255,255,0.6)" }}>Top {topRanked.length} Bachelor Party Destinations</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "1rem" }}>
          {topRanked.map(({ dest: d }, i) => (
            <div key={d.id} style={{ padding: "1.25rem", background: "#111", border: "1px solid #222", borderRadius: 10, color: "#fff" }}>
              <Link href={`/golf-trips/${d.id}/bachelor-party`} style={{ display: "block", textDecoration: "none", color: "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong style={{ fontSize: "0.95rem" }}>#{i + 1} {d.city}, {d.state}</strong>
                  <span style={{ color: "#EA580C", fontSize: "0.75rem" }}>{d.bars.filter((b) => b.lateNight).length} late-night spots</span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", margin: "0.3rem 0" }}>{d.tagline}</p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>{d.courses.length} courses · {d.bars.length} bars · {d.dining.length} restaurants</p>
              </Link>
              <div style={{ marginTop: "0.6rem", display: "flex", gap: "0.75rem", fontSize: "0.7rem" }}>
                <Link href={`/golf-trips/${d.id}/bachelor-party`} style={{ color: "#EA580C", textDecoration: "none", fontWeight: 600 }}>
                  Bachelor party guide →
                </Link>
                <Link href={`/golf-trips/${d.id}`} style={{ color: "rgba(234,88,12,0.7)", textDecoration: "none" }}>
                  Full destination →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* All Bachelor Party Destinations — full crawl-discoverable list */}
        <div style={{ marginTop: "4rem" }}>
          <h2 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.5rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1.5rem" }}>
            All {eligible.length} Bachelor Party Destinations
          </h2>
          {(Object.entries(REGION_SLUGS) as [Region, string][]).map(([regionName, rSlug]) => {
            const regionDests = eligible.filter(({ dest }) => REGION_SLUGS[dest.region] === rSlug).sort((a, b) => a.dest.city.localeCompare(b.dest.city));
            if (regionDests.length === 0) return null;
            return (
              <div key={rSlug} style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "0.85rem", color: "#EA580C", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>{regionName}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {regionDests.map(({ dest: d }) => (
                    <Link key={d.id} href={`/golf-trips/${d.id}/bachelor-party`} style={{ padding: "6px 12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, textDecoration: "none", color: "rgba(255,255,255,0.6)", fontSize: "0.78rem" }}>
                      {d.city}, {d.state}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/plan-a-trip" style={{ display: "inline-block", background: "rgba(220,38,38,0.9)", borderRadius: 8, padding: "14px 36px", color: "#fff", fontSize: 17, fontWeight: 700, letterSpacing: "0.06em", textDecoration: "none", textTransform: "uppercase", fontFamily: "var(--font-plan-block), sans-serif" }}>
            Plan a Bachelor Party Trip →
          </Link>
        </div>
      </div>
    </main>
  );
}
