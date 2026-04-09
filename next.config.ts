import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["bcryptjs"],
  poweredByHeader: false,
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
      { protocol: "https", hostname: "erinhills.com" },
      { protocol: "https", hostname: "s7d9.scene7.com" },
      { protocol: "https", hostname: "golfthebull.com" },
      { protocol: "https", hostname: "juniperpreserve.com" },
      { protocol: "https", hostname: "playjuniper.com" },
      { protocol: "https", hostname: "widgi.com" },
      { protocol: "https", hostname: "tetherow.com" },
      { protocol: "https", hostname: "www.uclubkentucky.com" },
      { protocol: "https", hostname: "golfcoursegurus.com" },
      { protocol: "https", hostname: "golf-pass-brightspot.s3.amazonaws.com" },
      { protocol: "https", hostname: "cdn.greaterzion.com" },
      { protocol: "https", hostname: "sunriverres.wpenginepowered.com" },
      { protocol: "https", hostname: "bouldercanyongolf.com" },
      { protocol: "https", hostname: "sundaygolf.com" },
      { protocol: "https", hostname: "www.mammothheadwear.com" },
      { protocol: "https", hostname: "glassandgrowlers.com" },
      { protocol: "https", hostname: "fullmetalmarkers.com" },
      { protocol: "https", hostname: "www.syntin.com" },
      { protocol: "https", hostname: "izzo.com" },
      { protocol: "https", hostname: "www.houseofblanks.com" },
      { protocol: "https", hostname: "blackswing.golf" },
      { protocol: "https", hostname: "playingitforward.shop" },
      { protocol: "https", hostname: "oregoncourses.com" },
      { protocol: "https", hostname: "www.kygolf.org" },
      { protocol: "https", hostname: "www.deadwood.com" },
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
      { protocol: "https", hostname: "fabulouswisconsin.com" },
      { protocol: "https", hostname: "www.americanclubresort.com" },
      { protocol: "https", hostname: "sheboygancharterfishing.com" },
      { protocol: "https", hostname: "www.cherryblossomgolf.com" },
      { protocol: "https", hostname: "www.sunbrookgolf.com" },
      { protocol: "https", hostname: "www.lexingtonky.gov" },
    ],
  },
  rewrites: async () => [
    { source: "/sitemap.xml", destination: "/sitemap-index" },
  ],
  headers: async () => [
    {
      source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|mp4|mp3|woff|woff2)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    {
      // Security headers (moved from middleware to avoid Edge Runtime on every request)
      source: "/((?!api/|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|mov|mp3)).*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
        { key: "X-DNS-Prefetch-Control", value: "on" },
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://js.stripe.com https://us.i.posthog.com https://us-assets.i.posthog.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: blob: https://images.squarespace-cdn.com https://cdn.printful.com https://files.cdn.printful.com https://*.s3.amazonaws.com https://tourdefore.com",
            "media-src 'self' https://tourdefore.com blob:",
            "connect-src 'self' https://api.stripe.com https://checkout.stripe.com https://va.vercel-scripts.com https://vitals.vercel-insights.com https://us.i.posthog.com https://us-assets.i.posthog.com",
            "frame-src https://js.stripe.com",
            "base-uri 'self'",
            "form-action 'self'",
            "upgrade-insecure-requests",
          ].join("; "),
        },
      ],
    },
  ],
};

export default nextConfig;
