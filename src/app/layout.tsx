import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import DrunkMode from "@/components/DrunkMode";
import GlobalFire from "@/components/GlobalFire";
import PostHogProvider from "@/components/PostHogProvider";
import "./globals.css";

// Self-hosted (src/fonts) so builds never fetch from Google.
const spaceGrotesk = localFont({
  src: [
    { path: "../fonts/space-grotesk/space-grotesk-variable.woff2", weight: "500", style: "normal" },
    { path: "../fonts/space-grotesk/space-grotesk-variable.woff2", weight: "600", style: "normal" },
    { path: "../fonts/space-grotesk/space-grotesk-variable.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-space",
  display: "swap",
});

const inter = localFont({
  src: [
    { path: "../fonts/inter/inter-variable.woff2", weight: "400", style: "normal" },
    { path: "../fonts/inter/inter-variable.woff2", weight: "500", style: "normal" },
    { path: "../fonts/inter/inter-variable.woff2", weight: "600", style: "normal" },
    { path: "../fonts/inter/inter-variable.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const caveat = localFont({
  src: [
    { path: "../fonts/caveat/caveat-variable.woff2", weight: "400", style: "normal" },
    { path: "../fonts/caveat/caveat-variable.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-script",
  display: "swap",
  preload: false,
});

const instrumentSerif = localFont({
  src: [
    { path: "../fonts/instrument-serif/instrument-serif-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/instrument-serif/instrument-serif-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
  preload: false,
});

const permanentMarker = localFont({
  src: [
    { path: "../fonts/permanent-marker/permanent-marker.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-scrawl",
  display: "swap",
  preload: false,
});

const lilitaOne = localFont({
  src: [
    { path: "../fonts/lilita-one/lilita-one.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-plan-groovy",
  display: "swap",
  preload: false,
});

const bebasNeue = localFont({
  src: [
    { path: "../fonts/bebas-neue/bebas-neue.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-plan-block",
  display: "swap",
  preload: false,
});

const pacifico = localFont({
  src: [
    { path: "../fonts/pacifico/pacifico.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-plan-script",
  display: "swap",
  preload: false,
});

const rye = localFont({
  src: [
    { path: "../fonts/rye/rye.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-shop-circus",
  display: "swap",
  preload: false,
});

const lobster = localFont({
  src: [
    { path: "../fonts/lobster/lobster.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-shop-script",
  display: "swap",
  preload: false,
});

const alfaSlabOne = localFont({
  src: [
    { path: "../fonts/alfa-slab-one/alfa-slab-one.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-slab-cold",
  display: "swap",
  preload: false,
});

const blakaHollow = localFont({
  src: [
    { path: "../fonts/blaka-hollow/blaka-hollow.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-blackletter",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tourdefore.com"),
  title: "Tour de Fore | Hell is empty, all the devils are here.",
  description:
    "Hell is empty, all the devils are here. Six years of fairways, friendships, and questionable handicaps. The official home of Tour de Fore.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
  openGraph: {
    siteName: "Tour de Fore",
    title: "Tour de Fore",
    description: "Hell is empty, all the devils are here.",
    type: "website",
    url: "https://tourdefore.com",
    images: [
      {
        url: "https://tourdefore.com/icon-fancy.png",
        width: 1024,
        height: 1024,
        alt: "Tour de Fore Logo",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-fancy.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://tourdefore.com/icon-fancy.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://us.i.posthog.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://us.i.posthog.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://tourdefore.com/#org",
              name: "Tour de Fore",
              description: "Hell is empty, all the devils are here. Six years of fairways, friendships, and questionable handicaps.",
              url: "https://tourdefore.com",
              foundingDate: "2021",
              logo: {
                "@type": "ImageObject",
                url: "https://tourdefore.com/icon-fancy.png",
                width: 1024,
                height: 1024,
              },
              sameAs: [
                "https://www.instagram.com/tourdefore",
              ],
            }),
          }}
        />
        {/* WebSite schema — pairs with Organization so Google models the site as a
            named entity (helps a low-authority new domain establish identity).
            Invisible; no SearchAction since there's no site-search endpoint. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://tourdefore.com/#website",
              name: "Tour de Fore",
              alternateName: "Tour de Fore — Annual Golf Trip",
              description: "The home of Tour de Fore: an annual buddies golf trip since 2021 — the body of work, the lore, and the pro shop. Hell is empty, all the devils are here.",
              url: "https://tourdefore.com",
              publisher: { "@id": "https://tourdefore.com/#org" },
              inLanguage: "en-US",
            }),
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${instrumentSerif.variable} ${caveat.variable} ${permanentMarker.variable} ${lilitaOne.variable} ${bebasNeue.variable} ${pacifico.variable} ${rye.variable} ${lobster.variable} ${alfaSlabOne.variable} ${blakaHollow.variable} antialiased`}
      >
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <PostHogProvider>
          <GlobalFire />
          {/* SURFACE-SWEEP 2026-10-16: the skip link above needs a target on every page; only
              /trip/[slug] had one. A div, not <main>: pages render their own <main>. */}
          <div id="main-content" tabIndex={-1} className="focus:outline-none">
            {children}
          </div>
          <DrunkMode />
        </PostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
