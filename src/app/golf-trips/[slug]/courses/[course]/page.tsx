import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { allDestinations } from "@/data";
import { slugify, tierLabel, tierColor } from "@/app/golf-trips/helpers";
import MulliganButton from "@/components/MulliganButton";
import HomeButton from "@/components/HomeButton";

interface Props {
  params: Promise<{ slug: string; course: string }>;
}

export async function generateStaticParams() {
  const params: { slug: string; course: string }[] = [];
  for (const dest of allDestinations) {
    for (const c of dest.courses) {
      params.push({ slug: dest.id, course: slugify(c.name) });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props) {
  const { slug, course: courseSlug } = await params;
  const dest = allDestinations.find((d) => d.id === slug);
  if (!dest) return {};
  const course = dest.courses.find((c) => slugify(c.name) === courseSlug);
  if (!course) return {};
  return {
    title: `${course.name} — ${dest.city}, ${dest.state} | Tour de Fore`,
    description: `${course.highlight} Green fees: $${course.greenFeeRange[0]}-$${course.greenFeeRange[1]}. ${tierLabel(course.tier)} tier ${course.style} course in ${dest.city}, ${dest.state}.`,
    alternates: { canonical: `https://tourdefore.com/golf-trips/${slug}/courses/${courseSlug}` },
    openGraph: { title: `${course.name} — ${dest.city}, ${dest.state}`, description: course.highlight, images: [course.imageUrl || "/icon-fancy.png"] },
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug, course: courseSlug } = await params;
  const dest = allDestinations.find((d) => d.id === slug);
  if (!dest) notFound();
  const course = dest.courses.find((c) => slugify(c.name) === courseSlug);
  if (!course) notFound();

  const otherCourses = dest.courses.filter((c) => slugify(c.name) !== courseSlug);

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 6rem)" }}>
      <MulliganButton href={`/golf-trips/${slug}`} />
      <HomeButton />

      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Link href={`/golf-trips/${slug}`} style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", textDecoration: "none", marginBottom: "1rem", display: "inline-block" }}>
          ← {dest.city}, {dest.state}
        </Link>

        {/* Hero image */}
        {course.imageUrl && (
          <div style={{ position: "relative", width: "100%", aspectRatio: "21/9", borderRadius: 12, overflow: "hidden", marginBottom: "2rem", border: "1px solid rgba(255,255,255,0.08)" }}>
            <Image
              src={course.imageUrl}
              alt={course.name}
              fill
              sizes="(max-width: 800px) 100vw, 800px"
              style={{ objectFit: "cover" }}
              priority
              unoptimized
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)" }} />
          </div>
        )}

        <h1 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.5rem" }}>
          {course.name}
        </h1>

        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", marginBottom: "2rem" }}>
          {dest.city}, {dest.state} · <span style={{ color: tierColor(course.tier) }}>{tierLabel(course.tier)}</span> · {course.style}
        </p>

        {/* Stats */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2rem", fontSize: "0.9rem" }}>
          <div><span style={{ color: "rgba(255,255,255,0.4)" }}>Green Fees</span><br /><strong style={{ color: "#EA580C" }}>${course.greenFeeRange[0]}–${course.greenFeeRange[1]}</strong></div>
          <div><span style={{ color: "rgba(255,255,255,0.4)" }}>Holes</span><br /><strong>{course.holes}</strong></div>
          <div><span style={{ color: "rgba(255,255,255,0.4)" }}>Par</span><br /><strong>{course.par}</strong></div>
          <div><span style={{ color: "rgba(255,255,255,0.4)" }}>Yardage</span><br /><strong>{course.yardage.toLocaleString()}</strong></div>
        </div>

        {/* Rating + badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2rem" }}>
          {course.googleRating && (
            <span style={{ background: "rgba(212,168,67,0.15)", color: "#D4A843", padding: "4px 12px", borderRadius: 4, fontSize: "0.8rem", fontWeight: 600 }}>
              {course.googleRating}★{course.reviewCount ? ` (${course.reviewCount.toLocaleString()} reviews)` : ""}
            </span>
          )}
          {course.hypeTag && (
            <span style={{ background: "rgba(234,88,12,0.15)", color: "#EA580C", padding: "4px 12px", borderRadius: 4, fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {course.hypeTag}
            </span>
          )}
          {course.walkable && (
            <span style={{ background: "color-mix(in srgb, var(--color-success) 10%, transparent)", color: "var(--color-success)", padding: "4px 12px", borderRadius: 4, fontSize: "0.75rem" }}>Walkable</span>
          )}
        </div>

        {/* Highlight */}
        <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "1.5rem 2rem", marginBottom: "2rem" }}>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(255,255,255,0.7)" }}>{course.highlight}</p>
        </div>

        {course.rankNote && (
          <p style={{ color: "rgba(212,168,67,0.8)", fontSize: "0.85rem", marginBottom: "2rem", fontStyle: "italic" }}>{course.rankNote}</p>
        )}

        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginBottom: "3rem" }}>
          {course.driveMinutes} min drive from {dest.city} center
        </p>

        {/* Other courses */}
        {otherCourses.length > 0 && (
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.3rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1rem" }}>
              Other Courses in {dest.city}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {otherCourses.map((c) => (
                <Link
                  key={c.name}
                  href={`/golf-trips/${slug}/courses/${slugify(c.name)}`}
                  style={{ display: "block", padding: "1rem 1.25rem", background: "#111", border: "1px solid #222", borderRadius: 8, textDecoration: "none", color: "#fff" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{c.name}</span>
                    <span style={{ color: tierColor(c.tier), fontSize: "0.7rem", textTransform: "uppercase" }}>{tierLabel(c.tier)}</span>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>${c.greenFeeRange[0]}–${c.greenFeeRange[1]}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <Link
            href={`/plan-a-trip?dest=${slug}`}
            style={{ display: "inline-block", background: "rgba(220,38,38,0.9)", borderRadius: 8, padding: "14px 36px", color: "#fff", fontSize: 17, fontWeight: 700, letterSpacing: "0.06em", textDecoration: "none", textTransform: "uppercase", fontFamily: "var(--font-plan-block), sans-serif" }}
          >
            Plan a Trip to {dest.city} →
          </Link>
        </div>
      </div>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "GolfCourse",
            name: course.name,
            address: { "@type": "PostalAddress", addressLocality: dest.city, addressRegion: dest.state, addressCountry: "US" },
            priceRange: `$${course.greenFeeRange[0]}-$${course.greenFeeRange[1]}`,
            ...(course.googleRating ? { aggregateRating: { "@type": "AggregateRating", ratingValue: course.googleRating, reviewCount: course.reviewCount || 1, bestRating: 5 } } : {}),
            description: course.highlight,
            ...(course.imageUrl ? { image: course.imageUrl } : {}),
            ...(course.url ? { url: course.url } : {}),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://tourdefore.com" },
              { "@type": "ListItem", position: 2, name: "Golf Trips", item: "https://tourdefore.com/golf-trips" },
              { "@type": "ListItem", position: 3, name: `${dest.city}, ${dest.state}`, item: `https://tourdefore.com/golf-trips/${slug}` },
              { "@type": "ListItem", position: 4, name: course.name, item: `https://tourdefore.com/golf-trips/${slug}/courses/${courseSlug}` },
            ],
          }),
        }}
      />
    </main>
  );
}
