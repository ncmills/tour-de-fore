import type { Metadata } from "next";
import { Space_Grotesk, Inter, Instrument_Serif, Caveat, Permanent_Marker, Lilita_One, Bebas_Neue, Pacifico, Rye, Lobster, Alfa_Slab_One, Blaka_Hollow } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import DrunkMode from "@/components/DrunkMode";
import PostHogProvider from "@/components/PostHogProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  variable: "--font-scrawl",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const lilitaOne = Lilita_One({
  variable: "--font-plan-groovy",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-plan-block",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const pacifico = Pacifico({
  variable: "--font-plan-script",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const rye = Rye({
  variable: "--font-shop-circus",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const lobster = Lobster({
  variable: "--font-shop-script",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const alfaSlabOne = Alfa_Slab_One({
  variable: "--font-slab-cold",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const blakaHollow = Blaka_Hollow({
  variable: "--font-blackletter",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tour de Fore | An Annual Golf Odyssey",
  description:
    "Six years of fairways, friendships, and questionable handicaps. The official home of Tour de Fore.",
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
  openGraph: {
    title: "Tour de Fore",
    description: "An Annual Golf Odyssey",
    type: "website",
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
    title: "Tour de Fore",
    description: "An Annual Golf Odyssey",
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
        <link rel="preload" href="/logo-full.webp" as="image" type="image/webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Tour de Fore",
              description: "An Annual Golf Odyssey — six years of fairways, friendships, and questionable handicaps.",
              url: "https://tourdefore.com",
              foundingDate: "2021",
              sameAs: [
                "https://idonthaveawill.com",
                "https://whatpeptidesdo.com",
                "https://doppelwriter.com",
                "https://imfrustrated.org",
              ],
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
          {children}
          <DrunkMode />
        </PostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
