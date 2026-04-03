import type { MetadataRoute } from "next";
import { allDestinations } from "@/data";
import { REGION_SLUGS, stateSlug, slugify } from "./golf-trips/helpers";

/**
 * Sitemap index: splits 1000+ URLs into multiple sitemaps for faster Google processing.
 * IDs: 0 = static + navigation, 1-7 = one per region (destinations + courses)
 */
const regionIds = Object.values(REGION_SLUGS);

export async function generateSitemaps() {
  return [
    { id: 0 }, // static pages, navigation, tiers, activities, themes
    ...regionIds.map((_, i) => ({ id: i + 1 })),
  ];
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  const base = "https://tourdefore.com";

  // Sitemap 0: static + navigation pages
  if (id === 0) {
    const uniqueStates = [...new Set(allDestinations.map((d) => d.state))];
    const activityTypes = ["atv", "fishing", "shooting", "casino", "brewery", "spa", "water-sports", "horseback", "hiking", "rafting", "zipline", "go-karts", "axe-throwing", "skeet", "boat-rental", "kayaking", "winery", "distillery", "paintball", "mountain-biking"];

    return [
      { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
      { url: `${base}/plan`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
      { url: `${base}/plan-a-trip`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
      { url: `${base}/golf-trips`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
      { url: `${base}/concierge`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
      { url: `${base}/past-trips`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
      { url: `${base}/past-trips/2025`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
      { url: `${base}/past-trips/2024`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
      { url: `${base}/past-trips/2023`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
      { url: `${base}/past-trips/2022`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
      { url: `${base}/past-trips/2021`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
      { url: `${base}/shop`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
      { url: `${base}/site-map`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
      // Regions
      ...regionIds.map((slug) => ({
        url: `${base}/golf-trips/region/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      // States
      ...uniqueStates.map((s) => ({
        url: `${base}/golf-trips/state/${stateSlug(s)}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      // Tiers
      ...["bucket-list", "premium", "solid", "budget"].map((t) => ({
        url: `${base}/golf-trips/courses/${t}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      // Activities
      ...activityTypes.map((t) => ({
        url: `${base}/golf-trips/activities/${t}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
      // Themes
      ...["bachelor-party", "budget", "bucket-list"].map((t) => ({
        url: `${base}/golf-trips/${t}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];
  }

  // Sitemaps 1-7: one per region with destinations + their courses
  const regionSlug = regionIds[id - 1];
  const regionDests = allDestinations.filter(
    (d) => REGION_SLUGS[d.region] === regionSlug
  );

  const entries: MetadataRoute.Sitemap = [];

  for (const d of regionDests) {
    entries.push({
      url: `${base}/golf-trips/${d.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
    for (const c of d.courses) {
      entries.push({
        url: `${base}/golf-trips/${d.id}/courses/${slugify(c.name)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
