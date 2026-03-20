import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
        className={`${cormorant.variable} ${outfit.variable} antialiased`}
      >
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
