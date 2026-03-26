import { Suspense } from "react";
import ExplosionGate from "@/components/ExplosionGate";
import ShopPageClient from "@/components/ShopPageClient";

export default function ShopPage() {
  return (
    <Suspense>
      <ExplosionGate pageKey="shop">
        <ShopPageClient />
      </ExplosionGate>
    </Suspense>
  );
}
