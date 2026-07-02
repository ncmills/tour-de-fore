import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["shared-data"],
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
      { protocol: "https", hostname: "autumnridgegolfcourse.com" },
      { protocol: "https", hostname: "kohlerwisconsin.com" },
      { protocol: "https", hostname: "quitquiocgolf.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  redirects: async () => [
    {
      source: "/:path*",
      has: [{ type: "host", value: "www.tourdefore.com" }],
      destination: "https://tourdefore.com/:path*",
      permanent: true,
    },

    // ── Legacy planner redirects (kept; retargeted to handicaphq). These must
    //    stay ABOVE the /plan/:path* catch-all so they win by first-match. ──
    { source: "/plan/auto-generate", destination: "https://handicaphq.com/plan-a-trip", permanent: true },
    { source: "/plan/unlock-success", destination: "https://handicaphq.com/", permanent: true },
    { source: "/subscribe", destination: "https://handicaphq.com/", permanent: true },
    { source: "/subscribe/success", destination: "https://handicaphq.com/", permanent: true },

    // ── 2026-07-02 split: the golf-trip PLANNER moved to handicaphq.com.
    //    301 all old planner / SEO / wizard / blog URLs to their handicaphq
    //    equivalents so no search equity or bookmark leaks. tourdefore.com is
    //    now a personal site (home, past-trips, personal trip pages, pro shop). ──
    { source: "/plan", destination: "https://handicaphq.com/plan", permanent: true },
    { source: "/plan/:path*", destination: "https://handicaphq.com/plan/:path*", permanent: true },
    { source: "/plan-a-trip", destination: "https://handicaphq.com/plan-a-trip", permanent: true },
    { source: "/golf-trips", destination: "https://handicaphq.com/golf-trips", permanent: true },
    { source: "/golf-trips/:path*", destination: "https://handicaphq.com/golf-trips/:path*", permanent: true },
    { source: "/atlas", destination: "https://handicaphq.com/atlas", permanent: true },
    { source: "/atlas/:path*", destination: "https://handicaphq.com/atlas/:path*", permanent: true },
    { source: "/guides", destination: "https://handicaphq.com/guides", permanent: true },
    { source: "/guides/:path*", destination: "https://handicaphq.com/guides/:path*", permanent: true },
    { source: "/blog", destination: "https://handicaphq.com/blog", permanent: true },
    { source: "/blog/:path*", destination: "https://handicaphq.com/blog/:path*", permanent: true },
    { source: "/data", destination: "https://handicaphq.com/data", permanent: true },
    { source: "/data/:path*", destination: "https://handicaphq.com/data/:path*", permanent: true },
    { source: "/my-trips", destination: "https://handicaphq.com/my-trips", permanent: true },
    { source: "/trip/plan", destination: "https://handicaphq.com/trip/plan", permanent: true },
    { source: "/trip/plan/:path*", destination: "https://handicaphq.com/trip/plan/:path*", permanent: true },
    { source: "/login", destination: "https://handicaphq.com/login", permanent: true },
    { source: "/set-password", destination: "https://handicaphq.com/set-password", permanent: true },
    { source: "/site-map", destination: "https://handicaphq.com/site-map", permanent: true },
    // Concierge was dropped on handicaphq (planner-only, no Stripe) — send to home.
    { source: "/concierge", destination: "https://handicaphq.com/", permanent: true },
    { source: "/concierge/:path*", destination: "https://handicaphq.com/", permanent: true },
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
            // img-src allows any HTTPS host because course/dining/bar images are
            // loaded with `unoptimized` directly from third-party venue/CDN hosts
            // (Troon, wixstatic, restaurant sites, etc.). These hosts are too
            // numerous and volatile to enumerate, and the pages are public-only
            // marketing content with no auth/PII risk from third-party imagery.
            "img-src 'self' data: blob: https:",
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
