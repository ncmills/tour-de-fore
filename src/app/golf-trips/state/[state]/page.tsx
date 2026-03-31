import { Metadata } from "next";
import { notFound } from "next/navigation";
import { allDestinations } from "@/data";
import MulliganButton from "@/components/MulliganButton";
import HomeButton from "@/components/HomeButton";
import {
  STATE_NAMES,
  stateSlug,
  seasonLabel,
  regionSlug,
} from "../../helpers";

export function generateStaticParams() {
  const states = [...new Set(allDestinations.map((d) => d.state))];
  return states.map((s) => ({ state: stateSlug(s) }));
}

function findState(slug: string): string | undefined {
  return Object.entries(STATE_NAMES).find(
    ([abbr, name]) => stateSlug(abbr) === slug
  )?.[0];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const abbr = findState(state);
  if (!abbr) return {};
  const name = STATE_NAMES[abbr] || abbr;
  const dests = allDestinations.filter((d) => d.state === abbr);
  const title = `Best Golf Trips in ${name} | Tour de Fore`;
  const description = `Explore ${dests.length} golf trip destinations in ${name}. Courses, lodging, nightlife, and activities for your group golf getaway.`;
  return {
    title,
    description: description.slice(0, 155),
    alternates: {
      canonical: `https://tourdefore.com/golf-trips/state/${state}`,
    },
    openGraph: { title, description: description.slice(0, 155), images: ["/icon-fancy.png"] },
  };
}

const card: React.CSSProperties = {
  background: "#111",
  border: "1px solid #222",
  borderRadius: 12,
  padding: "1.25rem",
  textDecoration: "none",
  color: "#fff",
  display: "block",
};

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: stateParam } = await params;
  const abbr = findState(stateParam);
  if (!abbr) notFound();

  const name = STATE_NAMES[abbr] || abbr;
  const dests = allDestinations.filter((d) => d.state === abbr);
  if (dests.length === 0) notFound();

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
      <MulliganButton href="/golf-trips" />
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
          Best Golf Trips in {name}
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "#A1A1AA",
            marginBottom: "3rem",
          }}
        >
          {dests.length} destination{dests.length > 1 ? "s" : ""} in {name}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            marginBottom: "3rem",
          }}
        >
          {dests.map((d) => (
            <a key={d.id} href={`/golf-trips/${d.id}`} style={card}>
              <h2 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                {d.city}, {d.state}
              </h2>
              <p style={{ fontSize: "0.85rem", color: "#A1A1AA", marginBottom: "0.5rem" }}>
                {d.tagline}
              </p>
              <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem", color: "#71717A" }}>
                <span>{d.courses.length} courses</span>
                <span>{seasonLabel(d.bestSeasons)}</span>
                <span>{d.nearestAirport.code}</span>
              </div>
            </a>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid #222",
            paddingTop: "1.5rem",
            display: "flex",
            gap: "1.5rem",
            fontSize: "0.9rem",
          }}
        >
          <a
            href={`/golf-trips/region/${regionSlug(dests[0].region)}`}
            style={{ color: "#EA580C", textDecoration: "none" }}
          >
            &larr; {dests[0].region} trips
          </a>
          <a
            href="/golf-trips"
            style={{ color: "#A1A1AA", textDecoration: "none" }}
          >
            All destinations
          </a>
        </div>
      </div>
    </main>
  );
}
