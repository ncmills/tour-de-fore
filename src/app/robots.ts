import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/plan/result/",
          "/plan/build",
          "/plan/gallery",
          "/plan/itinerary",
          "/login",
          "/my-trips",
          "/trip/plan/",
          "/set-password",
          "/shop/success",
          "/concierge/success",
        ],
      },
    ],
    sitemap: "https://tourdefore.com/sitemap.xml",
  };
}
