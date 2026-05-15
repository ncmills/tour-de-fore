import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Golf Trip Data — Cost Index, Course Rankings | Tour de Fore",
  description:
    "Open datasets on U.S. golf-trip destinations: per-person trip cost index, green-fee rankings, course tier breakdowns. Free to cite or embed. Sourced from venue pricing pages.",
  alternates: { canonical: "https://tourdefore.com/data" },
};

const DATASETS = [
  {
    slug: "golf-trip-cost-index",
    title: "U.S. Golf Trip Cost Index",
    summary:
      "Every destination ranked by estimated per-person trip cost (lodging + green fees + dining) for an 8-person, 3-night, 2-round trip. Apples-to-apples comparison across 90+ cities.",
    coverage: "90+ destinations",
    available: true,
  },
];

export default function DataIndexPage() {
  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", padding: "5rem 1.5rem 4rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "0.75rem", letterSpacing: "0.14em", color: "#A1A1AA", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          Open Data Library
        </p>
        <h1 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.02em", lineHeight: 1.1, marginBottom: "1rem" }}>
          Open data on U.S. golf trips.
        </h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.6, color: "rgba(255,255,255,0.7)", maxWidth: 640 }}>
          Citable, embed-friendly datasets on golf-trip destinations across
          North America — sourced from venue pricing pages, refreshed
          annually, published in plain HTML so anyone can link to them,
          screenshot them, or cite them in a buyer&apos;s guide or roundup.
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: "3rem 0 0", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {DATASETS.filter((d) => d.available).map((d) => (
            <li key={d.slug} style={{ border: "1px solid #222", padding: "1.5rem", background: "rgba(255,255,255,0.02)" }}>
              <Link href={`/data/${d.slug}`} style={{ color: "#fff", textDecoration: "none" }}>
                <p style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "0.7rem", letterSpacing: "0.14em", color: "#A1A1AA", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  {d.coverage}
                </p>
                <h2 style={{ fontFamily: "var(--font-plan-block), sans-serif", fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                  {d.title}
                </h2>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.55, color: "rgba(255,255,255,0.6)" }}>
                  {d.summary}
                </p>
                <p style={{ marginTop: "0.75rem", color: "#EA580C", fontSize: "0.85rem" }}>View dataset →</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
