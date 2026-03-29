import type { Metadata } from "next";
import { Space_Grotesk, Inter, Instrument_Serif, Caveat, Permanent_Marker, Lilita_One, Bebas_Neue, Pacifico, Rye, Lobster } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import DrunkMode from "@/components/DrunkMode";
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
  weight: ["300", "400", "500", "600", "700"],
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

export const metadata: Metadata = {
  title: "Tour de Fore | An Annual Golf Odyssey",
  description:
    "Six years of fairways, friendships, and questionable handicaps. The official home of Tour de Fore.",
  openGraph: {
    title: "Tour de Fore",
    description: "An Annual Golf Odyssey",
    type: "website",
    images: [
      {
        url: "https://tourdefore.com/logo-full.png",
        width: 4504,
        height: 3776,
        alt: "Tour de Fore Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour de Fore",
    description: "An Annual Golf Odyssey",
    images: ["https://tourdefore.com/logo-full.png"],
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
            }),
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${instrumentSerif.variable} ${caveat.variable} ${permanentMarker.variable} ${lilitaOne.variable} ${bebasNeue.variable} ${pacifico.variable} ${rye.variable} ${lobster.variable} antialiased`}
      >
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
        <DrunkMode />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
