import Link from "next/link";
import { allDestinations } from "@/data";
import MulliganButton from "@/components/MulliganButton";
import HomeButton from "@/components/HomeButton";

export const metadata = {
  title: "Bachelor Party Golf Trips — Best Destinations | Tour de Fore",
  description: "Plan the ultimate bachelor party golf trip. Top destinations with the best nightlife, courses, and group-friendly lodging.",
  alternates: { canonical: "https://tourdefore.com/golf-trips/bachelor-party" },
};

export default function BachelorPartyPage() {
  const ranked = allDestinations
    .map((d) => ({
      dest: d,
      score: d.bars.filter((b) => b.lateNight).length * 3 + d.bars.length * 2 + d.activities.length + d.dining.length,
    }))
    .filter((x) => x.dest.population !== "tiny" && x.dest.bars.length >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 6rem)" }}>
      <MulliganButton href="/golf-trips" />
      <HomeButton />
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.5rem" }}>
          Bachelor Party Golf Trips
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "3rem" }}>Top destinations with the best nightlife, courses, and group vibes.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "1rem" }}>
          {ranked.map(({ dest: d }, i) => (
            <Link key={d.id} href={`/golf-trips/${d.id}`} style={{ display: "block", padding: "1.25rem", background: "#111", border: "1px solid #222", borderRadius: 10, textDecoration: "none", color: "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ fontSize: "0.95rem" }}>#{i + 1} {d.city}, {d.state}</strong>
                <span style={{ color: "#EA580C", fontSize: "0.75rem" }}>{d.bars.filter((b) => b.lateNight).length} late-night spots</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", margin: "0.3rem 0" }}>{d.tagline}</p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>{d.courses.length} courses · {d.bars.length} bars · {d.dining.length} restaurants</p>
            </Link>
          ))}
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
