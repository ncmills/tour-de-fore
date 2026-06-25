import Link from "next/link";
import { GOLF_ATLAS } from "@/data/golf-atlas";
import MulliganButton from "@/components/MulliganButton";
import HomeButton from "@/components/HomeButton";

export const metadata = {
  title: "The Golf Atlas — The 24 Greatest Golf Trips Worth Planning Your Year Around | Tour de Fore",
  description: "A curated collection of the best golf pilgrimages in the world — Bandon, Pebble Beach, Pinehurst, St Andrews, Royal County Down and more. The trips you plan once and remember forever.",
  alternates: { canonical: "https://tourdefore.com/atlas" },
  openGraph: {
    title: "The Golf Atlas — The Greatest Golf Trips Worth Planning Your Year Around | Tour de Fore",
    description: "A curated collection of the best golf pilgrimages in the world. The trips you plan once and remember forever.",
    images: ["/icon-fancy.png"],
  },
};

const BAND_LABEL: Record<string, string> = {
  splurge: "Splurge",
  premium: "Premium",
  attainable: "Attainable",
};

export default function AtlasPage() {
  const pilgrimages = [...GOLF_ATLAS].sort((a, b) => a.rank - b.rank);

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 6rem)" }}>
      <MulliganButton href="/golf-trips" />
      <HomeButton />
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <p style={{ color: "#EA580C", fontFamily: "var(--font-plan-block), sans-serif", textTransform: "uppercase", letterSpacing: "0.12em", fontSize: "0.8rem", marginBottom: "0.75rem" }}>
          The Golf Atlas
        </p>
        <h1 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.5rem" }}>
          The Trips You Plan Once and Remember Forever
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem" }}>{pilgrimages.length} curated pilgrimages — the very best golf trips on earth.</p>

        <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", lineHeight: 1.8, maxWidth: 720, marginBottom: "3rem" }}>
          <p style={{ marginBottom: "0.75rem" }}>
            Our destination database covers hundreds of golf trips for every group, budget, and weekend. The Atlas
            is different. This is the curated best-of — the handful of pilgrimages serious golfers organize their
            entire year around, hand-ranked by how unforgettable the trip is, not how easy it is to book.
          </p>
          <p>
            Every entry below is a real destination from our database, anchored by its marquee courses and graded
            on budget and best season. Start at the top, or skim for the region calling your name. Click through for
            the editorial case for each pilgrimage, then jump straight to the full trip details and the planner.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {pilgrimages.map((p) => (
            <Link key={p.slug} href={`/atlas/${p.slug}`} style={{ textDecoration: "none", color: "#fff" }}>
              <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.6rem" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
                    <span style={{ color: "#EA580C", fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.4rem", fontWeight: 700, lineHeight: 1 }}>
                      {String(p.rank).padStart(2, "0")}
                    </span>
                    <strong style={{ fontSize: "1.15rem", fontFamily: "var(--font-plan-block), sans-serif", textTransform: "uppercase", letterSpacing: "0.03em" }}>{p.title}</strong>
                  </div>
                  <span style={{ color: "#EA580C", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap", marginTop: "0.25rem" }}>{BAND_LABEL[p.budgetBand]}</span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
                  {p.region} · {p.bestSeason}
                </p>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1rem" }}>{p.blurb}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {p.marqueeCourses.map((c) => (
                    <span key={c} style={{ padding: "5px 12px", background: "rgba(234,88,12,0.1)", border: "1px solid rgba(234,88,12,0.2)", borderRadius: 6, fontSize: "0.72rem", color: "#EA580C" }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/plan-a-trip" style={{ display: "inline-block", background: "rgba(220,38,38,0.9)", borderRadius: 8, padding: "14px 36px", color: "#fff", fontSize: 17, fontWeight: 700, letterSpacing: "0.06em", textDecoration: "none", textTransform: "uppercase", fontFamily: "var(--font-plan-block), sans-serif" }}>
            Plan a Pilgrimage →
          </Link>
        </div>
      </div>
    </main>
  );
}
