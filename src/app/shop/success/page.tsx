import { Suspense } from "react";
import HomeButton from "@/components/HomeButton";
import MulliganButton from "@/components/MulliganButton";
import OrderVerifier from "@/components/OrderVerifier";

export const metadata = {
  title: "Order Confirmed | Tour de Fore",
  description: "Your Tour de Fore order has been confirmed.",
};

export default function ShopSuccessPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
      <MulliganButton href="/shop" />
      <HomeButton />
      <div style={{ maxWidth: "480px" }}>
        <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, marginBottom: "1rem" }}>Order confirmed.</h2>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem", lineHeight: 1.7 }}>
          You&apos;ll get a confirmation email shortly. Thanks for repping TDF.
        </p>
      </div>
      <Suspense>
        <OrderVerifier />
      </Suspense>
    </main>
  );
}
