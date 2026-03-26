import { Suspense } from "react";
import ShopGate from "@/components/ShopGate";

export default function ShopPage() {
  return (
    <Suspense>
      <ShopGate />
    </Suspense>
  );
}
