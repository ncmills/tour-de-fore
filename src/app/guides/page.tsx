import { Metadata } from "next";
import Link from "next/link";
import MulliganButton from "@/components/MulliganButton";
import HomeButton from "@/components/HomeButton";

export const metadata: Metadata = {
  title: "Golf Trip Guides — Planning Tips & Destination Picks | Tour de Fore",
  description: "Expert guides for planning the perfect group golf trip. Budget breakdowns, packing lists, destination picks by month, and common mistakes to avoid.",
  alternates: { canonical: "https://tourdefore.com/guides" },
  openGraph: {
    title: "Golf Trip Guides | Tour de Fore",
    description: "Expert guides for planning the perfect group golf trip.",
    images: ["/icon-fancy.png"],
  },
};

const guides = [
  { slug: "how-to-plan-a-group-golf-trip", title: "How to Plan a Group Golf Trip", desc: "Step-by-step guide for organizing 4-16 golfers" },
  { slug: "best-golf-trip-destinations-by-month", title: "Best Destinations by Month", desc: "Where to go in spring, summer, and fall" },
  { slug: "golf-trip-budget-guide", title: "Golf Trip Budget Guide", desc: "Real cost data from 133 destinations" },
  { slug: "best-golf-trips-under-500", title: "Best Trips Under $500/Person", desc: "Budget-friendly destinations that don't sacrifice quality" },
  { slug: "top-bucket-list-golf-courses", title: "Top 50 Bucket List Courses", desc: "The best public-access courses in America" },
  { slug: "best-walkable-golf-courses", title: "Best Walkable Golf Courses", desc: "Save on cart fees, play the way it was meant to be" },
  { slug: "best-golf-destinations-for-large-groups", title: "Best Destinations for Large Groups", desc: "Lodging for 12+, courses that handle big tee sheets" },
  { slug: "desert-vs-coastal-vs-mountain-golf", title: "Desert vs Coastal vs Mountain Golf", desc: "Compare golf landscapes and find your style" },
  { slug: "golf-trip-packing-list", title: "The Ultimate Packing List", desc: "Everything you need, nothing you don't" },
  { slug: "first-time-golf-trip-mistakes", title: "12 First-Timer Mistakes", desc: "Avoid the traps that ruin trips" },
];

export default function GuidesIndex() {
  return (
    <main id="main-content" style={{ background: "#000", color: "#fff", fontFamily: "var(--font-inter), sans-serif", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://tourdefore.com" },
              { "@type": "ListItem", position: 2, name: "Guides", item: "https://tourdefore.com/guides" },
            ],
          }),
        }}
      />
      <MulliganButton href="/?skip=1" />
      <HomeButton />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "5rem 1.5rem 4rem" }}>
        <h1 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.04em", marginBottom: "1rem" }}>
          Golf Trip Guides
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 640 }}>
          Everything you need to plan the perfect group golf trip — from choosing a destination to packing your bag.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {guides.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} style={{ display: "block", padding: "1.25rem", background: "#111", border: "1px solid #222", borderRadius: 10, textDecoration: "none", color: "#fff" }}>
              <h2 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.25rem" }}>{g.title}</h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>{g.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
