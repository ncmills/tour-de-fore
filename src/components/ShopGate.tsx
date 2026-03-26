"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import BarScene from "./BarScene";
import ShopPageClient from "./ShopPageClient";

export default function ShopGate() {
  const params = useSearchParams();
  const skip = params.get("skip") === "1";
  const [showShop, setShowShop] = useState(skip);

  const handleDrink = () => {
    window.dispatchEvent(new Event("tdf-drunk"));
  };

  return (
    <>
      {!showShop && <BarScene onShop={() => setShowShop(true)} onDrink={handleDrink} />}
      {showShop && <ShopPageClient onBack={() => setShowShop(false)} />}
    </>
  );
}
