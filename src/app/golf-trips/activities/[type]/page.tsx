import Link from "next/link";
import { notFound } from "next/navigation";
import { allDestinations } from "@/data";
import type { ActivityType } from "@/data/types";
import MulliganButton from "@/components/MulliganButton";
import HomeButton from "@/components/HomeButton";

const ACTIVITY_LABELS: Record<string, string> = {
  atv: "ATV Tours", fishing: "Fishing", shooting: "Shooting", casino: "Casino",
  brewery: "Brewery Tours", spa: "Spa", "water-sports": "Water Sports",
  horseback: "Horseback Riding", hiking: "Hiking", rafting: "Rafting",
  zipline: "Zipline", "go-karts": "Go-Karts & Top Golf", "axe-throwing": "Axe Throwing",
  skeet: "Skeet Shooting", "boat-rental": "Boat Rentals", kayaking: "Kayaking",
  winery: "Winery Tours", distillery: "Distillery Tours", paintball: "Paintball",
  "mountain-biking": "Mountain Biking",
};

const ALL_TYPES = Object.keys(ACTIVITY_LABELS);

interface Props { params: Promise<{ type: string }> }

export function generateStaticParams() {
  return ALL_TYPES.map((t) => ({ type: t }));
}

export async function generateMetadata({ params }: Props) {
  const { type } = await params;
  const label = ACTIVITY_LABELS[type];
  if (!label) return {};
  return {
    title: `Golf Trips with ${label} — Best Destinations | Tour de Fore`,
    description: `Find the best golf trip destinations that offer ${label.toLowerCase()}. Plan a group golf getaway with ${label.toLowerCase()} included.`,
    alternates: { canonical: `https://tourdefore.com/golf-trips/activities/${type}` },
    openGraph: {
      type: "website",
      url: `https://tourdefore.com/golf-trips/activities/${type}`,
      title: `Golf Trips with ${label} — Best Destinations | Tour de Fore`,
      description: `Find the best golf trip destinations that offer ${label.toLowerCase()}.`,
      images: ["/icon-fancy.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `Golf Trips with ${label} — Best Destinations | Tour de Fore`,
      description: `Find the best golf trip destinations that offer ${label.toLowerCase()}.`,
    },
  };
}

export default async function ActivityPage({ params }: Props) {
  const { type } = await params;
  const label = ACTIVITY_LABELS[type];
  if (!label) notFound();

  const matches = allDestinations
    .filter((d) => d.activities.some((a) => a.type === type as ActivityType))
    .map((d) => ({
      dest: d,
      activity: d.activities.find((a) => a.type === type as ActivityType)!,
    }));

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
              { "@type": "ListItem", position: 3, name: label, item: `https://tourdefore.com/golf-trips/activities/${type}` },
            ],
          }),
        }}
      />
      <MulliganButton href="/golf-trips" />
      <HomeButton />
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.5rem" }}>
          Golf Trips with {label}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem" }}>{matches.length} destinations offer {label.toLowerCase()}</p>

        <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", lineHeight: 1.8, maxWidth: 720, marginBottom: "3rem" }}>
          <p style={{ marginBottom: "0.75rem" }}>
            The best golf trips go beyond the fairway. {label} adds a dimension to your group getaway
            that turns a good trip into one everyone talks about for years. {matches.length > 10
              ? `We've curated ${matches.length} destinations across America where world-class golf meets top-tier ${label.toLowerCase()} — so your crew never has to choose between a great round and a great time.`
              : `These ${matches.length} destinations pair outstanding golf with genuine ${label.toLowerCase()} experiences — not tourist traps, but spots the locals actually recommend.`}
          </p>
          <p>
            Every destination below includes detailed course breakdowns, lodging options for groups, restaurant
            picks, and nightlife — plus specific {label.toLowerCase()} venues with pricing, duration, and what to expect.
            Hit the planner to build a complete itinerary around your group&apos;s priorities in under 60 seconds.
          </p>
        </div>

        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1rem", color: "rgba(255,255,255,0.6)" }}>Best Destinations for Golf + {label}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "1rem" }}>
          {matches.map(({ dest: d, activity: a }) => (
            <Link key={d.id} href={`/golf-trips/${d.id}`} style={{ display: "block", padding: "1.25rem", background: "#111", border: "1px solid #222", borderRadius: 10, textDecoration: "none", color: "#fff" }}>
              <strong style={{ fontSize: "0.95rem" }}>{d.city}, {d.state}</strong>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", margin: "0.3rem 0" }}>{d.tagline}</p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>{a.name} · {a.duration}{a.pricePerPerson ? ` · $${a.pricePerPerson[0]}-$${a.pricePerPerson[1]}/pp` : ""}</p>
              <p style={{ color: "#EA580C", fontSize: "0.75rem", marginTop: "0.3rem" }}>{d.courses.length} courses</p>
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
