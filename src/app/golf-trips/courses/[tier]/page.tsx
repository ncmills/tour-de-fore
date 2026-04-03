import Link from "next/link";
import { allDestinations } from "@/data";
import { slugify, tierLabel, tierColor } from "@/app/golf-trips/helpers";
import MulliganButton from "@/components/MulliganButton";
import HomeButton from "@/components/HomeButton";

const TIERS = ["bucket-list", "premium", "solid", "budget"] as const;

interface Props {
  params: Promise<{ tier: string }>;
}

export function generateStaticParams() {
  return TIERS.map((t) => ({ tier: t }));
}

export async function generateMetadata({ params }: Props) {
  const { tier } = await params;
  const label = tierLabel(tier);
  return {
    title: `${label} Golf Courses Across America | Tour de Fore`,
    description: `Browse all ${label.toLowerCase()} tier golf courses in our database of 133+ destinations. Find the perfect course for your next group golf trip.`,
    alternates: { canonical: `https://tourdefore.com/golf-trips/courses/${tier}` },
    openGraph: {
      title: `${label} Golf Courses Across America | Tour de Fore`,
      description: `Browse all ${label.toLowerCase()} tier golf courses in our database of 133+ destinations.`,
      images: ["/icon-fancy.png"],
    },
  };
}

export default async function TierCoursesPage({ params }: Props) {
  const { tier } = await params;
  const label = tierLabel(tier);
  const color = tierColor(tier);

  const courses: { course: { name: string; greenFeeRange: [number, number]; googleRating?: number; highlight: string; style: string }; dest: { id: string; city: string; state: string } }[] = [];
  for (const dest of allDestinations) {
    for (const c of dest.courses) {
      if (c.tier === tier) {
        courses.push({ course: c, dest: { id: dest.id, city: dest.city, state: dest.state } });
      }
    }
  }

  courses.sort((a, b) => (b.course.googleRating || 0) - (a.course.googleRating || 0));

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 6rem)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://tourdefore.com" },
              { "@type": "ListItem", position: 2, name: "Golf Trips", item: "https://tourdefore.com/golf-trips" },
              { "@type": "ListItem", position: 3, name: `${label} Courses`, item: `https://tourdefore.com/golf-trips/courses/${tier}` },
            ],
          }),
        }}
      />
      <MulliganButton href="/golf-trips" />
      <HomeButton />

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.5rem" }}>
          <span style={{ color }}>{label}</span> Golf Courses
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem" }}>{courses.length} courses across America</p>

        <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", lineHeight: 1.8, maxWidth: 720, marginBottom: "3rem" }}>
          {tier === "bucket-list" && <p>These are the courses every golfer dreams about — Top 100 public courses, PGA Tour hosts, and layouts designed by legends like Pete Dye, Tom Fazio, and Jack Nicklaus. Expect championship conditions, premium green fees ($150–$500+), and rounds you&apos;ll remember forever. Worth every penny for a once-in-a-lifetime group trip.</p>}
          {tier === "premium" && <p>Premium courses strike the sweet spot between elite quality and reasonable pricing. You&apos;re getting well-maintained layouts, challenging designs, and memorable settings — without the sticker shock of bucket-list venues. Green fees typically run $80–$200, making these ideal for groups that want great golf without blowing the entire trip budget on one round.</p>}
          {tier === "solid" && <p>Solid tier courses are the backbone of a great golf trip. Well-maintained, enjoyable layouts that won&apos;t drain your wallet. Green fees typically run $40–$120, and many of these tracks surprise you with views, conditions, and designs that punch well above their price point. Perfect for groups playing 36 a day or fitting in extra rounds between activities.</p>}
          {tier === "budget" && <p>Budget courses prove you don&apos;t need to spend big to have a blast on the course. Under $60 green fees with courses that are still well-maintained, fun to play, and perfect for groups focused on the overall trip experience. Many are walkable, most have solid practice facilities, and they free up cash for everything else your crew wants to do.</p>}
        </div>

        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1rem", color: "rgba(255,255,255,0.6)" }}>Browse by Tier</h2>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          {TIERS.map((t) => (
            <Link key={t} href={`/golf-trips/courses/${t}`} style={{ padding: "6px 16px", borderRadius: 4, fontSize: "0.75rem", fontWeight: 600, textDecoration: "none", background: tier === t ? tierColor(t) : "rgba(255,255,255,0.05)", color: tier === t ? "#fff" : "rgba(255,255,255,0.4)", border: tier === t ? "none" : "1px solid rgba(255,255,255,0.1)" }}>
              {tierLabel(t)}
            </Link>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "1rem" }}>
          {courses.map(({ course: c, dest: d }) => (
            <Link key={`${d.id}-${c.name}`} href={`/golf-trips/${d.id}/courses/${slugify(c.name)}`} style={{ display: "block", padding: "1.25rem", background: "#111", border: "1px solid #222", borderRadius: 10, textDecoration: "none", color: "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <strong style={{ fontSize: "0.95rem" }}>{c.name}</strong>
                {c.googleRating && <span style={{ color: "#D4A843", fontSize: "0.8rem" }}>{c.googleRating}★</span>}
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginBottom: "0.5rem" }}>{d.city}, {d.state}</p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", lineHeight: 1.5 }}>{c.highlight}</p>
              <p style={{ color, fontSize: "0.75rem", marginTop: "0.5rem" }}>${c.greenFeeRange[0]}–${c.greenFeeRange[1]} · {c.style}</p>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/plan-a-trip" style={{ display: "inline-block", background: "rgba(220,38,38,0.9)", borderRadius: 8, padding: "14px 36px", color: "#fff", fontSize: 17, fontWeight: 700, letterSpacing: "0.06em", textDecoration: "none", textTransform: "uppercase", fontFamily: "var(--font-plan-block), sans-serif" }}>
            Plan a Trip →
          </Link>
        </div>
      </div>
    </main>
  );
}
