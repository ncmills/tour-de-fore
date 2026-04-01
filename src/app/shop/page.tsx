import { Suspense } from "react";
import ExplosionGate from "@/components/ExplosionGate";
import ShopGate from "@/components/ShopGate";

export const metadata = {
  title: "Pro Shop | Tour de Fore",
  description: "Tour de Fore gear — polos, quarter-zips, hats, and caps. Rep the crew on and off the course.",
  alternates: { canonical: "https://tourdefore.com/shop" },
  openGraph: { title: "TDF Pro Shop", description: "Tour de Fore golf gear — polos, quarter-zips, hats." },
};

export default function ShopPage() {
  return (
    <Suspense>
      <ExplosionGate pageKey="shop">
        <ShopGate />
      </ExplosionGate>
    </Suspense>
  );
}
