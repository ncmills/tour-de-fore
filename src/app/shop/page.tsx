import { Suspense } from "react";
import ExplosionGate from "@/components/ExplosionGate";
import ShopGate from "@/components/ShopGate";

export const metadata = {
  title: "Pro Shop | Tour de Fore",
  description: "Tour de Fore gear — hats, headcovers, and hell tees. Rep the crew on and off the course.",
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
