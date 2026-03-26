import BlackPage from "@/components/BlackPage";

export default function ShopSuccessPage() {
  return (
    <BlackPage heading="Order Confirmed">
      <div style={{ maxWidth: "480px", paddingBottom: "4rem" }}>
        <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, marginBottom: "1rem" }}>Order confirmed.</h2>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem", lineHeight: 1.7 }}>
          You'll get a confirmation email shortly. Thanks for repping TDF.
        </p>
      </div>
    </BlackPage>
  );
}
