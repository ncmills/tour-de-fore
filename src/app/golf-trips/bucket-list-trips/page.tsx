import Link from "next/link";
import { allDestinations } from "@/data";
import { slugify } from "@/app/golf-trips/helpers";
import MulliganButton from "@/components/MulliganButton";
import HomeButton from "@/components/HomeButton";

export const metadata = {
  title: "Bucket List Golf Trips — Top Courses in America | Tour de Fore",
  description: "Play the best courses in America. Destinations with bucket-list tier golf courses, top 100 public courses, and tournament hosts.",
  alternates: { canonical: "https://tourdefore.com/golf-trips/bucket-list-trips" },
  openGraph: {
    title: "Bucket List Golf Trips — Top Courses in America | Tour de Fore",
    description: "Play the best courses in America. Destinations with bucket-list tier golf courses, top 100 public courses, and tournament hosts.",
    images: ["/icon-fancy.png"],
  },
};

export default function BucketListPage() {
  const bucketDests = allDestinations
    .filter((d) => d.courses.some((c) => c.tier === "bucket-list"))
    .map((d) => ({
      dest: d,
      bucketCourses: d.courses.filter((c) => c.tier === "bucket-list"),
    }))
    .sort((a, b) => b.bucketCourses.length - a.bucketCourses.length);

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 6rem)" }}>
      <MulliganButton href="/golf-trips" />
      <HomeButton />
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.5rem" }}>
          Bucket List Golf Trips
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "3rem" }}>Destinations with the most elite courses in America. {bucketDests.length} destinations.</p>

        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1rem", color: "rgba(255,255,255,0.6)" }}>Destinations with Bucket List Courses</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {bucketDests.map(({ dest: d, bucketCourses }) => (
            <div key={d.id} style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "1.5rem" }}>
              <Link href={`/golf-trips/${d.id}`} style={{ textDecoration: "none", color: "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <strong style={{ fontSize: "1.1rem" }}>{d.city}, {d.state}</strong>
                  <span style={{ color: "#D4A843", fontSize: "0.75rem", fontWeight: 700 }}>{bucketCourses.length} BUCKET LIST</span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginBottom: "1rem" }}>{d.tagline}</p>
              </Link>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {bucketCourses.map((c) => (
                  <Link key={c.name} href={`/golf-trips/${d.id}/courses/${slugify(c.name)}`} style={{ padding: "6px 14px", background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.2)", borderRadius: 6, fontSize: "0.75rem", color: "#D4A843", textDecoration: "none" }}>
                    {c.name}{c.googleRating ? ` · ${c.googleRating}★` : ""}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/plan-a-trip" style={{ display: "inline-block", background: "rgba(220,38,38,0.9)", borderRadius: 8, padding: "14px 36px", color: "#fff", fontSize: 17, fontWeight: 700, letterSpacing: "0.06em", textDecoration: "none", textTransform: "uppercase", fontFamily: "var(--font-plan-block), sans-serif" }}>
            Plan a Bucket List Trip →
          </Link>
        </div>
      </div>
    </main>
  );
}
