import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tourdefore.com";

  return [
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
}
