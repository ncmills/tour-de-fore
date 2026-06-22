import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allDestinations } from "@/data";
import MulliganButton from "@/components/MulliganButton";
import HomeButton from "@/components/HomeButton";
import { metaDescription, REGION_SLUGS, generateComparePairs, getComparePartners } from "../../helpers";
import type { Destination } from "@/data/types";

const PAIRS = generateComparePairs();

export function generateStaticParams() {
  return PAIRS.map((p) => ({ matchup: `${p.slug1}-vs-${p.slug2}` }));
}

function parseSlugs(matchup: string): [string, string] | null {
  const parts = matchup.split("-vs-");
  if (parts.length !== 2) return null;
  return [parts[0], parts[1]];
}

export async function generateMetadata({ params }: { params: Promise<{ matchup: string }> }): Promise<Metadata> {
  const { matchup } = await params;
  const slugs = parseSlugs(matchup);
  if (!slugs) return {};
  const [d1, d2] = slugs.map((s) => allDestinations.find((d) => d.id === s));
  if (!d1 || !d2) return {};
  // Pack real numbers into the snippet so it promises a specific
  // verdict rather than a generic "compare side by side". GSC 2026-05-15:
  // /golf-trips/compare/scottsdale-az-vs-myrtle-beach-sc was at pos 5.2 with
  // 40 imp / 0 clk — page 1, no clicks → snippet bug, not ranking bug.
  const d1Green = avg(d1.courses.map((c) => (c.greenFeeRange[0] + c.greenFeeRange[1]) / 2));
  const d2Green = avg(d2.courses.map((c) => (c.greenFeeRange[0] + c.greenFeeRange[1]) / 2));
  const title = `${d1.city} vs ${d2.city} Golf Trip: Courses, Cost & Verdict (2026)`;
  const description = `${d1.city}: ${d1.courses.length} courses, $${d1Green} avg green fee. ${d2.city}: ${d2.courses.length} courses, $${d2Green} avg. Head-to-head on lodging, nightlife, and the verdict for your crew.`;
  return {
    title,
    description: metaDescription(description),
    alternates: { canonical: `https://tourdefore.com/golf-trips/compare/${matchup}` },
    openGraph: {
      type: "article",
      url: `https://tourdefore.com/golf-trips/compare/${matchup}`,
      title,
      description: metaDescription(description),
      images: ["/icon-fancy.png"],
    },
    twitter: { card: "summary_large_image", title, description: metaDescription(description) },
  };
}

function avg(arr: number[]) {
  return arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;
}

function CompareRow({ label: rowLabel, left, right, winner }: { label: string; left: string; right: string; winner: "left" | "right" | "tie" }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "1rem", padding: "0.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)", alignItems: "center" }}>
      <span style={{ color: winner === "left" ? "var(--color-success)" : "rgba(255,255,255,0.5)", fontSize: "0.9rem", fontWeight: winner === "left" ? 600 : 400 }}>{left}</span>
      <span style={{ fontSize: "0.7rem", color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700, textAlign: "center", minWidth: 120 }}>{rowLabel}</span>
      <span style={{ color: winner === "right" ? "var(--color-success)" : "rgba(255,255,255,0.5)", fontSize: "0.9rem", fontWeight: winner === "right" ? 600 : 400, textAlign: "right" }}>{right}</span>
    </div>
  );
}

export default async function ComparePage({ params }: { params: Promise<{ matchup: string }> }) {
  const { matchup } = await params;
  const slugs = parseSlugs(matchup);
  if (!slugs) notFound();
  const [dest1, dest2] = slugs.map((s) => allDestinations.find((d) => d.id === s)) as [Destination | undefined, Destination | undefined];
  if (!dest1 || !dest2) notFound();

  const d1AvgGreen = avg(dest1.courses.map((c) => (c.greenFeeRange[0] + c.greenFeeRange[1]) / 2));
  const d2AvgGreen = avg(dest2.courses.map((c) => (c.greenFeeRange[0] + c.greenFeeRange[1]) / 2));
  const d1CheapLodging = dest1.lodging.length > 0 ? Math.min(...dest1.lodging.map((l) => l.nightlyRange[0])) : 0;
  const d2CheapLodging = dest2.lodging.length > 0 ? Math.min(...dest2.lodging.map((l) => l.nightlyRange[0])) : 0;
  const d1BucketList = dest1.courses.filter((c) => c.tier === "bucket-list").length;
  const d2BucketList = dest2.courses.filter((c) => c.tier === "bucket-list").length;
  const d1LateNight = dest1.bars.filter((b) => b.lateNight).length;
  const d2LateNight = dest2.bars.filter((b) => b.lateNight).length;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://tourdefore.com" },
      { "@type": "ListItem", position: 2, name: "Golf Trips", item: "https://tourdefore.com/golf-trips" },
      { "@type": "ListItem", position: 3, name: `${dest1.city} vs ${dest2.city}`, item: `https://tourdefore.com/golf-trips/compare/${matchup}` },
    ],
  };

  return (
    <main id="main-content" style={{ background: "#000", color: "#fff", fontFamily: "var(--font-inter), sans-serif", minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <MulliganButton href="/golf-trips" />
      <HomeButton />

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "5rem 1.5rem 4rem" }}>
        <h1 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(1.6rem, 4.5vw, 2.6rem)", letterSpacing: "0.04em", lineHeight: 1.15, marginBottom: "0.75rem" }}>
          {dest1.city} vs {dest2.city}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 720 }}>
          Two great golf trip destinations — but which one is right for your crew?
          Here&apos;s a head-to-head comparison using real data from our database.
        </p>

        {/* Header row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "1rem", marginBottom: "0.5rem", padding: "0 0 0.75rem", borderBottom: "1px solid #333" }}>
          <Link href={`/golf-trips/${dest1.id}`} style={{ color: "#EA580C", textDecoration: "none", fontWeight: 700, fontSize: "1.1rem" }}>
            {dest1.city}, {dest1.state}
          </Link>
          <span style={{ color: "#A1A1AA", fontSize: "0.8rem", fontWeight: 700 }}>VS</span>
          <Link href={`/golf-trips/${dest2.id}`} style={{ color: "#EA580C", textDecoration: "none", fontWeight: 700, fontSize: "1.1rem", textAlign: "right" }}>
            {dest2.city}, {dest2.state}
          </Link>
        </div>

        {/* Comparison rows */}
        <CompareRow label="Courses" left={`${dest1.courses.length}`} right={`${dest2.courses.length}`} winner={dest1.courses.length > dest2.courses.length ? "left" : dest2.courses.length > dest1.courses.length ? "right" : "tie"} />
        <CompareRow label="Bucket List Courses" left={`${d1BucketList}`} right={`${d2BucketList}`} winner={d1BucketList > d2BucketList ? "left" : d2BucketList > d1BucketList ? "right" : "tie"} />
        <CompareRow label="Avg Green Fee" left={`$${d1AvgGreen}`} right={`$${d2AvgGreen}`} winner={d1AvgGreen < d2AvgGreen ? "left" : d2AvgGreen < d1AvgGreen ? "right" : "tie"} />
        <CompareRow label="Lodging From" left={d1CheapLodging ? `$${d1CheapLodging}/night` : "N/A"} right={d2CheapLodging ? `$${d2CheapLodging}/night` : "N/A"} winner={d1CheapLodging && d2CheapLodging ? (d1CheapLodging < d2CheapLodging ? "left" : d2CheapLodging < d1CheapLodging ? "right" : "tie") : "tie"} />
        <CompareRow label="Restaurants" left={`${dest1.dining.length}`} right={`${dest2.dining.length}`} winner={dest1.dining.length > dest2.dining.length ? "left" : dest2.dining.length > dest1.dining.length ? "right" : "tie"} />
        <CompareRow label="Bars" left={`${dest1.bars.length}`} right={`${dest2.bars.length}`} winner={dest1.bars.length > dest2.bars.length ? "left" : dest2.bars.length > dest1.bars.length ? "right" : "tie"} />
        <CompareRow label="Late Night Bars" left={`${d1LateNight}`} right={`${d2LateNight}`} winner={d1LateNight > d2LateNight ? "left" : d2LateNight > d1LateNight ? "right" : "tie"} />
        <CompareRow label="Activities" left={`${dest1.activities.length}`} right={`${dest2.activities.length}`} winner={dest1.activities.length > dest2.activities.length ? "left" : dest2.activities.length > dest1.activities.length ? "right" : "tie"} />
        <CompareRow label="Best Seasons" left={dest1.bestSeasons.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(", ")} right={dest2.bestSeasons.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(", ")} winner="tie" />
        <CompareRow label="Nearest Airport" left={`${dest1.nearestAirport.code} (${dest1.nearestAirport.driveMinutes} min)`} right={`${dest2.nearestAirport.code} (${dest2.nearestAirport.driveMinutes} min)`} winner={dest1.nearestAirport.driveMinutes < dest2.nearestAirport.driveMinutes ? "left" : dest2.nearestAirport.driveMinutes < dest1.nearestAirport.driveMinutes ? "right" : "tie"} />

        {/* Verdict */}
        <div style={{ marginTop: "2.5rem", marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.5rem", color: "#EA580C", marginBottom: "1rem" }}>The Verdict</h2>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.8 }}>
            <p style={{ marginBottom: "0.75rem" }}>
              <strong style={{ color: "#fff" }}>Choose {dest1.city} if</strong> you want
              {d1AvgGreen < d2AvgGreen ? " lower green fees," : ""}
              {dest1.courses.length > dest2.courses.length ? " more course variety," : ""}
              {d1BucketList > d2BucketList ? " more bucket-list courses," : ""}
              {dest1.bars.length > dest2.bars.length ? " more nightlife," : ""}
              {dest1.activities.length > dest2.activities.length ? " more activities," : ""}
              {" "}or you&apos;re drawn to {dest1.region} golf.
            </p>
            <p>
              <strong style={{ color: "#fff" }}>Choose {dest2.city} if</strong> you want
              {d2AvgGreen < d1AvgGreen ? " lower green fees," : ""}
              {dest2.courses.length > dest1.courses.length ? " more course variety," : ""}
              {d2BucketList > d1BucketList ? " more bucket-list courses," : ""}
              {dest2.bars.length > dest1.bars.length ? " more nightlife," : ""}
              {dest2.activities.length > dest1.activities.length ? " more activities," : ""}
              {" "}or you prefer {dest2.region} golf.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", margin: "2rem 0" }}>
          <Link href={`/golf-trips/${dest1.id}/guide`} style={{ display: "inline-block", background: "#EA580C", color: "#fff", fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1rem", letterSpacing: "0.06em", padding: "0.75rem 1.5rem", borderRadius: 8, textDecoration: "none" }}>
            Plan {dest1.city} &rarr;
          </Link>
          <Link href={`/golf-trips/${dest2.id}/guide`} style={{ display: "inline-block", background: "#EA580C", color: "#fff", fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1rem", letterSpacing: "0.06em", padding: "0.75rem 1.5rem", borderRadius: 8, textDecoration: "none" }}>
            Plan {dest2.city} &rarr;
          </Link>
        </div>

        {/* See-also compare pages — surfaces sibling matchups so each
            compare page acts as a crawl-graph hub. Per 05-10 GSC memo:
            compare pages need internal-linking density to escape sitemap-
            only purgatory at low domain authority. */}
        {(() => {
          const d1Partners = getComparePartners(dest1.id).filter((id) => id !== dest2.id);
          const d2Partners = getComparePartners(dest2.id).filter((id) => id !== dest1.id);
          const d1Picks = d1Partners.slice(0, 4).map((id) => allDestinations.find((d) => d.id === id)).filter(Boolean);
          const d2Picks = d2Partners.slice(0, 4).map((id) => allDestinations.find((d) => d.id === id)).filter(Boolean);
          if (d1Picks.length === 0 && d2Picks.length === 0) return null;
          return (
            <div style={{ borderTop: "1px solid #222", paddingTop: "2rem", marginTop: "2rem" }}>
              <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>
                Compare other golf trip destinations
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem 2rem" }}>
                {d1Picks.length > 0 && (
                  <div>
                    <p style={{ fontSize: "0.8rem", color: "#A1A1AA", marginBottom: "0.5rem" }}>
                      Other {dest1.city} matchups
                    </p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      {d1Picks.map((p) => (
                        <li key={p!.id}>
                          <Link
                            href={`/golf-trips/compare/${dest1.id}-vs-${p!.id}`}
                            style={{ color: "#EA580C", textDecoration: "none", fontSize: "0.9rem" }}
                          >
                            {dest1.city} vs {p!.city} →
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {d2Picks.length > 0 && (
                  <div>
                    <p style={{ fontSize: "0.8rem", color: "#A1A1AA", marginBottom: "0.5rem" }}>
                      Other {dest2.city} matchups
                    </p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      {d2Picks.map((p) => (
                        <li key={p!.id}>
                          <Link
                            href={`/golf-trips/compare/${dest2.id}-vs-${p!.id}`}
                            style={{ color: "#EA580C", textDecoration: "none", fontSize: "0.9rem" }}
                          >
                            {dest2.city} vs {p!.city} →
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* Related */}
        <div style={{ borderTop: "1px solid #222", paddingTop: "1.5rem", marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "1rem 1.5rem", fontSize: "0.9rem" }}>
          <Link href={`/golf-trips/${dest1.id}`} style={{ color: "#EA580C", textDecoration: "none" }}>{dest1.city} Details &rarr;</Link>
          <Link href={`/golf-trips/${dest2.id}`} style={{ color: "#EA580C", textDecoration: "none" }}>{dest2.city} Details &rarr;</Link>
          <Link href="/golf-trips" style={{ color: "#A1A1AA", textDecoration: "none" }}>All Destinations</Link>
        </div>
      </div>
    </main>
  );
}
