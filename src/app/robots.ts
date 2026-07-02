import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/shop/success"],
      },
    ],
    sitemap: "https://tourdefore.com/sitemap.xml",
  };
}
