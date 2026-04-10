import Image from "next/image";
import type { UnsplashCacheEntry } from "@/lib/unsplash";

interface UnsplashHeroProps {
  image: UnsplashCacheEntry | null | undefined;
  alt: string;
  /** Optional fallback image to render if no Unsplash entry is cached. */
  fallbackSrc?: string;
}

/**
 * Full-bleed hero image with Unsplash-TOS-compliant attribution.
 *
 * Renders nothing if no image is available and no fallback is provided —
 * pages stay safe even if the cache is empty for a slug.
 */
export function UnsplashHero({ image, alt, fallbackSrc }: UnsplashHeroProps) {
  const src = image?.url || fallbackSrc;
  if (!src) return null;

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(220px, 38vh, 420px)",
        overflow: "hidden",
        marginBottom: "0",
        background: "#000",
      }}
    >
      <Image
        src={src}
        alt={image?.alt || alt}
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
      {/* Bottom + top gradient so the page header text remains legible above */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.55) 80%, #000 100%)",
        }}
      />
      {/* Neon orange accent line at the bottom — matches brand */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 2,
          background:
            "linear-gradient(90deg, transparent, #EA580C 50%, transparent)",
        }}
      />
      {image && (
        <div
          style={{
            position: "absolute",
            right: 12,
            bottom: 8,
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.55)",
            background: "rgba(0,0,0,0.45)",
            padding: "3px 8px",
            borderRadius: 4,
            letterSpacing: "0.02em",
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          Photo by{" "}
          <a
            href={image.photographerUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ color: "rgba(255,255,255,0.85)", textDecoration: "underline" }}
          >
            {image.photographerName}
          </a>{" "}
          on{" "}
          <a
            href={image.unsplashUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ color: "rgba(255,255,255,0.85)", textDecoration: "underline" }}
          >
            Unsplash
          </a>
        </div>
      )}
    </section>
  );
}
