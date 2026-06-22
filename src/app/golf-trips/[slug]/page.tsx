import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { allDestinations } from "@/data";
import MulliganButton from "@/components/MulliganButton";
import HomeButton from "@/components/HomeButton";
import { UnsplashHero } from "@/components/UnsplashHero";
import ProseOverview from "@/components/ProseOverview";
import unsplashCache from "@/data/unsplash-cache.json";
import Link from "next/link";
import {
  tierLabel,
  tierColor,
  seasonLabel,
  regionSlug,
  stateSlug,
  slugify,
  metaDescription,
  STATE_NAMES,
  REGION_LABELS,
  getComparePartners,
} from "../helpers";

export function generateStaticParams() {
  return allDestinations.map((d) => ({ slug: d.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dest = allDestinations.find((d) => d.id === slug);
  if (!dest) return {};

  const tierRank = { "bucket-list": 0, premium: 1, solid: 2, budget: 3 } as const;
  const ranked = [...dest.courses].sort((a, b) => {
    const t = (tierRank[a.tier] ?? 9) - (tierRank[b.tier] ?? 9);
    return t !== 0 ? t : (b.googleRating ?? 0) - (a.googleRating ?? 0);
  });
  const bucketCount = dest.courses.filter((c) => c.tier === "bucket-list").length;
  const courseCount = dest.courses.length;
  const seasonStr = dest.bestSeasons
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join("/");
  const airport = dest.nearestAirport;

  const courseHook = (c: typeof ranked[number]) => {
    // Strip "(Variant Name)" suffixes (e.g. "We-Ko-Pa Golf Club (Saguaro Course)" → "We-Ko-Pa")
    const baseName = c.name.replace(/\s*\([^)]*\)\s*$/, "").replace(/\s+Golf\s+Club$/i, "");
    const tag = c.rankNote || (c.hypeTag ? c.hypeTag.toLowerCase().replace(/^./, (m) => m.toUpperCase()) : null);
    return tag ? `${baseName} (${tag})` : baseName;
  };
  const topCourses = ranked.slice(0, 2).map(courseHook).join(", ");
  const more = courseCount > 2 ? ` +${courseCount - 2} more` : "";
  const tagline = dest.tagline.replace(/[.!?]?$/, ".");

  const title = bucketCount > 0
    ? `${dest.city} Golf Trip (2026): ${bucketCount} Bucket-List, ${courseCount} Courses | TDF`
    : `${dest.city} Golf Trip (2026): ${courseCount} Courses, ${seasonStr} | TDF`;
  const description = `${tagline} Top: ${topCourses}${more}. ${airport.code} ${airport.driveMinutes}min. Best: ${seasonStr}.`;

  return {
    title,
    description,
    alternates: { canonical: `https://tourdefore.com/golf-trips/${dest.id}` },
    openGraph: {
      type: "website",
      url: `https://tourdefore.com/golf-trips/${dest.id}`,
      title,
      description,
      ...(dest.courses.find((c) => c.imageUrl) ? { images: [dest.courses.find((c) => c.imageUrl)!.imageUrl!] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* ── Shared inline styles ── */
const card: React.CSSProperties = {
  background: "var(--color-bg-card)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  padding: "1.25rem",
};

const badge = (bg: string): React.CSSProperties => ({
  display: "inline-block",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.05em",
  padding: "2px 8px",
  borderRadius: 4,
  background: bg,
  color: "var(--color-text)",
});

const sectionTitle: React.CSSProperties = {
  fontFamily: "var(--font-plan-block), sans-serif",
  fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
  letterSpacing: "0.04em",
  color: "var(--color-accent)",
  marginBottom: "1rem",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "1rem",
  alignItems: "start",
};

const label: React.CSSProperties = {
  fontSize: "0.75rem",
  color: "var(--color-text-muted)",
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
};

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = allDestinations.find((d) => d.id === slug);
  if (!dest) notFound();

  const heroImage = unsplashCache.destinations[dest.id as keyof typeof unsplashCache.destinations] ?? null;
  const regionSlugStr = regionSlug(dest.region);
  const stateSlugStr = stateSlug(dest.state);
  const stateName = STATE_NAMES[dest.state] || dest.state;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: `${dest.city}, ${dest.state}`,
    description: dest.description,
    url: `https://tourdefore.com/golf-trips/${dest.id}`,
    touristType: "Golf",
    containsPlace: dest.courses.map((c) => ({
      "@type": "GolfCourse",
      name: c.name,
      description: c.highlight,
      ...(c.url ? { url: c.url } : {}),
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://tourdefore.com" },
      { "@type": "ListItem", position: 2, name: "Golf Trips", item: "https://tourdefore.com/golf-trips" },
      { "@type": "ListItem", position: 3, name: `${dest.city}, ${dest.state}`, item: `https://tourdefore.com/golf-trips/${dest.id}` },
    ],
  };

  return (
    <main
      id="main-content"
      style={{
        background: "var(--color-bg)",
        color: "var(--color-text)",
        fontFamily: "var(--font-inter), sans-serif",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <MulliganButton href="/golf-trips" />
      <HomeButton />

      <UnsplashHero image={heroImage} alt={`${dest.city}, ${dest.state}`} />

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: heroImage ? "2rem 1.5rem 4rem" : "5rem 1.5rem 4rem",
        }}
      >
        {/* Hero */}
        <h1
          style={{
            fontFamily: "var(--font-plan-block), sans-serif",
            fontSize: "clamp(2rem, 6vw, 3.2rem)",
            letterSpacing: "0.04em",
            lineHeight: 1.1,
            marginBottom: "0.5rem",
          }}
        >
          Plan Your {dest.city} Golf Trip in 60 Seconds
        </h1>

        <p
          style={{
            fontFamily: "var(--font-instrument), serif",
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
            color: "var(--color-gold)",
            fontStyle: "italic",
            marginBottom: "1rem",
          }}
        >
          {dest.tagline}
        </p>

        <p
          style={{
            fontSize: "1rem",
            color: "var(--color-text-muted)",
            lineHeight: 1.7,
            maxWidth: 720,
            marginBottom: "1.5rem",
          }}
        >
          {dest.description}
        </p>

        {/* Optional editorial prose — when populated, breaks template duplication.
            Collapsed by default so course data surfaces fast; full text stays in the DOM. */}
        {dest.proseOverview && (
          <ProseOverview paragraphs={dest.proseOverview.split(/\n\n+/)} />
        )}

        <p
          className="neon-stats neon-stats-text"
          style={{
            fontSize: "0.85rem",
            marginBottom: "1.5rem",
          }}
        >
          The best courses, bars, and rentals in {dest.city} — curated for groups.
        </p>

        {/* Quick stats */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            fontSize: "0.9rem",
            color: "var(--color-text-muted)",
            marginBottom: "3rem",
            paddingBottom: "1.5rem",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <span>
            <strong style={{ color: "var(--color-text)" }}>{dest.courses.length}</strong>{" "}
            courses
          </span>
          <span>
            <strong style={{ color: "var(--color-text)" }}>
              {seasonLabel(dest.bestSeasons)}
            </strong>
          </span>
          <span>
            <strong style={{ color: "var(--color-text)" }}>
              {dest.nearestAirport.code}
            </strong>{" "}
            ({dest.nearestAirport.driveMinutes} min drive)
          </span>
          <span>
            <strong style={{ color: "var(--color-text)" }}>
              {dest.population === "tiny"
                ? "<10k"
                : dest.population === "small"
                  ? "10-50k"
                  : "50-200k"}
            </strong>{" "}
            population
          </span>
        </div>

        {/* ── Courses ── */}
        <h2 style={sectionTitle}>Courses</h2>
        <div style={{ ...grid, marginBottom: "3rem" }}>
          {dest.courses.map((c) => (
            <Link
              key={c.name}
              href={`/golf-trips/${dest.id}/courses/${slugify(c.name)}`}
              style={{ ...card, textDecoration: "none", color: "var(--color-text)", display: "block", padding: 0, overflow: "hidden" }}
            >
              {c.imageUrl && (
                <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden" }}>
                  <Image src={c.imageUrl} alt={c.name} fill sizes="(max-width: 768px) 100vw, 350px" style={{ objectFit: "cover" }} unoptimized />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)" }} />
                </div>
              )}
              <div style={{ padding: "1.25rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.5rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      lineHeight: 1.3,
                      flex: 1,
                    }}
                  >
                    {c.name}
                  </h3>
                  <span style={badge(tierColor(c.tier))}>{tierLabel(c.tier)}</span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "0.75rem" }}>
                  {c.highlight}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                    fontSize: "0.8rem",
                    color: "var(--color-text-dim)",
                  }}
                >
                  <span>
                    ${c.greenFeeRange[0]}-${c.greenFeeRange[1]}
                  </span>
                  <span>{c.style}</span>
                  <span>
                    Par {c.par} · {c.yardage.toLocaleString()} yds
                  </span>
                  {c.walkable && (
                    <span style={{ color: "var(--color-green-light)" }}>Walkable</span>
                  )}
                  {c.hypeTag && (
                    <span style={{ color: "var(--color-gold)" }}>{c.hypeTag}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Lodging ── */}
        {dest.lodging.length > 0 && (
          <>
            <h2 style={sectionTitle}>Where to Stay</h2>
            <div style={{ ...grid, marginBottom: "3rem" }}>
              {dest.lodging.map((l, i) => (
                <div key={i} style={card}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ ...label }}>{l.type.replace("-", " ")}</span>
                    <span style={{ fontSize: "0.8rem", color: "var(--color-text-dim)" }}>
                      Sleeps {l.sleeps[0]}-{l.sleeps[1]}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.95rem", fontWeight: 500, marginBottom: "0.35rem" }}>
                    ${l.nightlyRange[0]}-${l.nightlyRange[1]}/night
                  </p>
                  <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>
                    {l.areaDescription}
                  </p>
                  {l.amenities.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {l.amenities.map((a) => (
                        <span
                          key={a}
                          style={{
                            fontSize: "0.7rem",
                            background: "var(--color-bg)",
                            border: "1px solid var(--color-border)",
                            borderRadius: 4,
                            padding: "2px 6px",
                            color: "var(--color-text-muted)",
                          }}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Dining ── */}
        {dest.dining.length > 0 && (
          <>
            <h2 style={sectionTitle}>Dining</h2>
            <div style={{ ...grid, marginBottom: "3rem" }}>
              {dest.dining.map((d) => (
                <div key={d.name} style={{ ...card, padding: 0, overflow: "hidden" }}>
                  {d.imageUrl && (
                    <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden" }}>
                      <Image src={d.imageUrl} alt={d.name} fill sizes="(max-width: 768px) 100vw, 350px" style={{ objectFit: "cover" }} unoptimized />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)" }} />
                    </div>
                  )}
                  <div style={{ padding: "1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                      <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>{d.name}</h3>
                      <span style={{ fontSize: "0.85rem", color: "var(--color-gold)" }}>{d.priceRange}</span>
                    </div>
                    <span style={label}>{d.style}</span>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginTop: "0.4rem" }}>
                      {d.highlight}
                    </p>
                    {d.googleRating && (
                      <span style={{ fontSize: "0.75rem", color: "var(--color-text-dim)", marginTop: "0.35rem", display: "block" }}>
                        {d.googleRating} stars
                        {d.reviewCount ? ` (${d.reviewCount.toLocaleString()} reviews)` : ""}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Nightlife ── */}
        {dest.bars.length > 0 && (
          <>
            <h2 style={sectionTitle}>Nightlife</h2>
            <div style={{ ...grid, marginBottom: "3rem" }}>
              {dest.bars.map((b) => (
                <div key={b.name} style={{ ...card, padding: 0, overflow: "hidden" }}>
                  {b.imageUrl && (
                    <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden" }}>
                      <Image src={b.imageUrl} alt={b.name} fill sizes="(max-width: 768px) 100vw, 350px" style={{ objectFit: "cover" }} unoptimized />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)" }} />
                    </div>
                  )}
                  <div style={{ padding: "1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                      <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>{b.name}</h3>
                      {b.lateNight && (
                        <span style={badge("var(--color-magenta)")}>Late Night</span>
                      )}
                    </div>
                    <span style={label}>{b.vibe.replace("-", " ")}</span>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginTop: "0.4rem" }}>
                      {b.highlight}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Activities ── */}
        {dest.activities.length > 0 && (
          <>
            <h2 style={sectionTitle}>Activities</h2>
            <div style={{ ...grid, marginBottom: "3rem" }}>
              {dest.activities.map((a) => (
                <div key={a.name} style={card}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                    {a.name}
                  </h3>
                  <div style={{ display: "flex", gap: "0.75rem", fontSize: "0.8rem", color: "var(--color-text-dim)", marginBottom: "0.4rem" }}>
                    <span>{a.type.replace("-", " ")}</span>
                    <span>{a.duration}</span>
                    <span>
                      ${a.pricePerPerson[0]}-${a.pricePerPerson[1]}/pp
                    </span>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                    {a.highlight}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Related Destinations — same region, same state, top peers ── */}
        {(() => {
          const sameRegion = allDestinations
            .filter((d) => d.region === dest.region && d.id !== dest.id)
            .sort((a, b) => b.courses.length - a.courses.length)
            .slice(0, 4);
          // Expose up to 5 compare partners (was 1). Per 05-10 GSC memo,
          // sitemap-only compare children were unindexed at low DA — they
          // need crawl paths from indexed city hubs. Pulls only from
          // pre-existing compare URLs (single source of truth in helpers).
          const partnerIds = getComparePartners(dest.id);
          const compareCandidates = partnerIds
            .map((id) => allDestinations.find((d) => d.id === id))
            .filter((d): d is NonNullable<typeof d> => Boolean(d))
            .sort((a, b) => {
              // Prefer same-state, then same-region, then by course count.
              const aSame = a.state === dest.state ? 2 : a.region === dest.region ? 1 : 0;
              const bSame = b.state === dest.state ? 2 : b.region === dest.region ? 1 : 0;
              if (aSame !== bSame) return bSame - aSame;
              return b.courses.length - a.courses.length;
            })
            .slice(0, 5);
          if (sameRegion.length === 0 && compareCandidates.length === 0) return null;
          return (
            <section style={{ marginTop: "3rem", marginBottom: "2rem" }}>
              <h2 style={sectionTitle}>Similar Golf Trip Destinations</h2>
              <div style={grid}>
                {sameRegion.map((d) => (
                  <a
                    key={d.id}
                    href={`/golf-trips/${d.id}`}
                    style={{ ...card, textDecoration: "none", color: "var(--color-text)", display: "block" }}
                  >
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.3rem" }}>
                      {d.city}, {d.state}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "0.6rem" }}>
                      {d.tagline}
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "var(--color-accent)" }}>
                      {d.courses.length} courses · {d.bars.length} bars · {d.region}
                    </p>
                  </a>
                ))}
              </div>
              {compareCandidates.length > 0 && (
                <div style={{ marginTop: "1.5rem" }}>
                  <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
                    Head-to-head comparisons
                  </h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {compareCandidates.map((d) => (
                      <li key={d.id}>
                        <a
                          href={`/golf-trips/compare/${dest.id}-vs-${d.id}`}
                          style={{
                            color: "var(--color-accent)",
                            textDecoration: "none",
                            fontSize: "0.95rem",
                          }}
                        >
                          {dest.city} vs {d.city} →
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          );
        })()}

        {/* ── CTA ── */}
        <div style={{ textAlign: "center", margin: "3rem 0" }}>
          <a
            href={`/plan-a-trip?dest=${dest.id}`}
            style={{
              display: "inline-block",
              background: "var(--color-accent)",
              color: "var(--color-text)",
              fontFamily: "var(--font-plan-block), sans-serif",
              fontSize: "1.3rem",
              letterSpacing: "0.06em",
              padding: "0.9rem 2.5rem",
              borderRadius: 8,
              textDecoration: "none",
              transition: "background 0.2s",
            }}
          >
            Plan This Trip &rarr;
          </a>
        </div>

        {/* ── Related Guides ── */}
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginBottom: "1.5rem",
          }}
        >
          <a
            href={`/golf-trips/${dest.id}/guide`}
            style={{ padding: "10px 20px", background: "color-mix(in srgb, var(--color-accent) 8%, transparent)", border: "1px solid color-mix(in srgb, var(--color-accent) 30%, transparent)", borderRadius: 8, textDecoration: "none", color: "var(--color-accent)", fontSize: "0.85rem", fontWeight: 600 }}
          >
            Planning Guide
          </a>
          <a
            href={`/golf-trips/${dest.id}/cost`}
            style={{ padding: "10px 20px", background: "color-mix(in srgb, var(--color-success) 8%, transparent)", border: "1px solid color-mix(in srgb, var(--color-success) 30%, transparent)", borderRadius: 8, textDecoration: "none", color: "var(--color-success)", fontSize: "0.85rem", fontWeight: 600 }}
          >
            Cost Breakdown
          </a>
          {dest.bars.length >= 3 && dest.population !== "tiny" && (
            <a
              href={`/golf-trips/${dest.id}/bachelor-party`}
              style={{ padding: "10px 20px", background: "color-mix(in srgb, var(--color-magenta) 8%, transparent)", border: "1px solid color-mix(in srgb, var(--color-magenta) 30%, transparent)", borderRadius: 8, textDecoration: "none", color: "var(--color-magenta)", fontSize: "0.85rem", fontWeight: 600 }}
            >
              Bachelor Party
            </a>
          )}
        </div>

        {/* ── Footer links ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem 1.5rem",
            fontSize: "0.9rem",
            alignItems: "center",
          }}
        >
          <a
            href={`/golf-trips/region/${regionSlugStr}`}
            style={{ color: "var(--color-accent)", textDecoration: "none", padding: "10px 0", minHeight: 44, display: "inline-flex", alignItems: "center" }}
          >
            More {dest.region} trips &rarr;
          </a>
          <a
            href={`/golf-trips/state/${stateSlugStr}`}
            style={{ color: "var(--color-accent)", textDecoration: "none", padding: "10px 0", minHeight: 44, display: "inline-flex", alignItems: "center" }}
          >
            All {stateName} trips &rarr;
          </a>
          <a
            href="/golf-trips"
            style={{ color: "var(--color-text-muted)", textDecoration: "none", padding: "10px 0", minHeight: 44, display: "inline-flex", alignItems: "center" }}
          >
            All destinations
          </a>
        </div>
      </div>
    </main>
  );
}
