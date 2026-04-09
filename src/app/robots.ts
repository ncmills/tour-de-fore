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
    sitemap: [
      "https://tourdefore.com/sitemap/0.xml",
      "https://tourdefore.com/sitemap/1.xml",
      "https://tourdefore.com/sitemap/2.xml",
      "https://tourdefore.com/sitemap/3.xml",
      "https://tourdefore.com/sitemap/4.xml",
      "https://tourdefore.com/sitemap/5.xml",
      "https://tourdefore.com/sitemap/6.xml",
      "https://tourdefore.com/sitemap/7.xml",
      "https://tourdefore.com/sitemap/8.xml",
      "https://tourdefore.com/sitemap/9.xml",
    ],
  };
}
