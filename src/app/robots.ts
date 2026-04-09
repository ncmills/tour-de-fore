import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/plan/result/", "/subscribe/success", "/plan/unlock-success", "/set-password", "/shop/success", "/concierge/success"],
      },
    ],
    sitemap: "https://tourdefore.com/sitemap.xml",
  };
}
