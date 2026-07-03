import type { MetadataRoute } from "next";
import { trips } from "@/lib/trips";

// Personal site — a small flat sitemap of the real pages only. The golf-trip
// planner (wizard, atlas, blog, pSEO) moved to handicaphq.com; those URLs
// 301-redirect there (see next.config.ts) and are intentionally not listed.
const BASE = "https://tourdefore.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pastYears = [...new Set(trips.filter((t) => !t.upcoming).map((t) => t.year))].sort(
    (a, b) => b - a
  );

  return [
    { url: BASE, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/about`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/past-trips`, changeFrequency: "monthly", priority: 0.8 },
    ...pastYears.map((y) => ({
      url: `${BASE}/past-trips/${y}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...trips.map((t) => ({
      url: `${BASE}/trip/${t.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    { url: `${BASE}/shop`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/do-not-sell`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
