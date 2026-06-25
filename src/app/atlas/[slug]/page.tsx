import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GOLF_ATLAS, GOLF_ATLAS_BY_SLUG } from "@/data/golf-atlas";
import { metaDescription } from "@/app/golf-trips/helpers";
import MulliganButton from "@/components/MulliganButton";
import HomeButton from "@/components/HomeButton";

const BAND_LABEL: Record<string, string> = {
  splurge: "Splurge",
  premium: "Premium",
  attainable: "Attainable",
};

export function generateStaticParams() {
  return GOLF_ATLAS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = GOLF_ATLAS_BY_SLUG[slug];
  if (!p) {
    return { title: "Pilgrimage Not Found | Tour de Fore" };
  }
  const title = `${p.title} — Golf Atlas | Tour de Fore`;
  const description = metaDescription(p.blurb);
  return {
    title,
    description,
    alternates: { canonical: `https://tourdefore.com/atlas/${p.slug}` },
    openGraph: {
      title,
      description,
      images: ["/icon-fancy.png"],
    },
  };
}

export default async function AtlasDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = GOLF_ATLAS_BY_SLUG[slug];
  if (!p) notFound();

  const meta: { label: string; value: string }[] = [
    { label: "Rank", value: `#${p.rank} in the Atlas` },
    { label: "Region", value: p.region },
    { label: "Budget", value: BAND_LABEL[p.budgetBand] },
    { label: "Best Season", value: p.bestSeason },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 6rem)" }}>
      <MulliganButton href="/atlas" />
      <HomeButton />
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <Link href="/atlas" style={{ color: "#EA580C", fontFamily: "var(--font-plan-block), sans-serif", textTransform: "uppercase", letterSpacing: "0.12em", fontSize: "0.8rem", textDecoration: "none" }}>
          The Golf Atlas
        </Link>
        <h1 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(2rem, 5vw, 3.25rem)", textTransform: "uppercase", letterSpacing: "0.04em", margin: "0.75rem 0 1rem" }}>
          {p.title}
        </h1>

        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "2rem" }}>{p.blurb}</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1px", background: "#222", border: "1px solid #222", borderRadius: 12, overflow: "hidden", marginBottom: "2.5rem" }}>
          {meta.map((m) => (
            <div key={m.label} style={{ background: "#111", padding: "1rem 1.25rem" }}>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem" }}>{m.label}</div>
              <div style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 600 }}>{m.value}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.6)", marginBottom: "1rem" }}>
          Why It's a Pilgrimage
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", lineHeight: 1.85, marginBottom: "2.5rem" }}>{p.whyPilgrimage}</p>

        <h2 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.6)", marginBottom: "1rem" }}>
          The Marquee Courses
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "3rem" }}>
          {p.marqueeCourses.map((c) => (
            <span key={c} style={{ padding: "8px 16px", background: "rgba(234,88,12,0.1)", border: "1px solid rgba(234,88,12,0.25)", borderRadius: 8, fontSize: "0.85rem", color: "#EA580C" }}>
              {c}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", marginTop: "1rem" }}>
          <Link href={`/golf-trips/${p.destinationId}`} style={{ display: "inline-block", background: "rgba(220,38,38,0.9)", borderRadius: 8, padding: "14px 36px", color: "#fff", fontSize: 17, fontWeight: 700, letterSpacing: "0.06em", textDecoration: "none", textTransform: "uppercase", fontFamily: "var(--font-plan-block), sans-serif" }}>
            See the Full Trip →
          </Link>
          <Link href="/plan-a-trip" style={{ display: "inline-block", background: "transparent", border: "1px solid rgba(234,88,12,0.5)", borderRadius: 8, padding: "14px 36px", color: "#EA580C", fontSize: 17, fontWeight: 700, letterSpacing: "0.06em", textDecoration: "none", textTransform: "uppercase", fontFamily: "var(--font-plan-block), sans-serif" }}>
            Plan This Trip
          </Link>
        </div>
      </div>
    </main>
  );
}
