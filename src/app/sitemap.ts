import type { MetadataRoute } from "next";
import { allDestinations } from "@/data";
import { REGION_SLUGS, stateSlug } from "./golf-trips/helpers";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tourdefore.com";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/plan`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/plan-a-trip`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/past-trips`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/past-trips/2025`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/past-trips/2024`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/past-trips/2023`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/past-trips/2022`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/past-trips/2021`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/shop`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/concierge`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  // Golf trips index
  const golfTripsIndex: MetadataRoute.Sitemap = [
    { url: `${base}/golf-trips`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];

  // Destination pages
  const destinationPages: MetadataRoute.Sitemap = allDestinations.map((d) => ({
    url: `${base}/golf-trips/${d.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Region pages
  const regionSlugs = [...new Set(Object.values(REGION_SLUGS))];
  const regionPages: MetadataRoute.Sitemap = regionSlugs.map((slug) => ({
    url: `${base}/golf-trips/region/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // State pages
  const uniqueStates = [...new Set(allDestinations.map((d) => d.state))];
  const statePages: MetadataRoute.Sitemap = uniqueStates.map((s) => ({
    url: `${base}/golf-trips/state/${stateSlug(s)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...golfTripsIndex,
    ...destinationPages,
    ...regionPages,
    ...statePages,
  ];
}
