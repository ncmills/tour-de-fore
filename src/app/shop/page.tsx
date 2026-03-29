import { Suspense } from "react";
import ExplosionGate from "@/components/ExplosionGate";
import ShopGate from "@/components/ShopGate";

export default function ShopPage() {
  return (
    <Suspense>
      <ExplosionGate pageKey="shop">
        <ShopGate />
      </ExplosionGate>
    </Suspense>
  );
}
