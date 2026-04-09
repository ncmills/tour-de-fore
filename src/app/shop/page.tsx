import { Suspense } from "react";
import ExplosionGate from "@/components/ExplosionGate";
import ShopGate from "@/components/ShopGate";

export const metadata = {
  title: "Golf Trip Gear & Apparel — Pro Shop | Tour de Fore",
  description: "Tour de Fore golf gear — polos, quarter-zips, hats, and caps. Rep the crew on and off the course. Free shipping included.",
  alternates: { canonical: "https://tourdefore.com/shop" },
  openGraph: { title: "TDF Pro Shop", description: "Tour de Fore golf gear — polos, quarter-zips, hats." },
};

export default function ShopPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://tourdefore.com" },
              { "@type": "ListItem", position: 2, name: "Pro Shop", item: "https://tourdefore.com/shop" },
            ],
          }),
        }}
      />
      <Suspense>
        <ExplosionGate pageKey="shop">
          <ShopGate />
        </ExplosionGate>
      </Suspense>
    </>
  );
}
