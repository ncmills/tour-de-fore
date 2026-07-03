import HomeButton from "@/components/HomeButton";
import MulliganButton from "@/components/MulliganButton";

export const metadata = {
  title: "Shop Terms | Tour de Fore",
  description: "Tour de Fore pro-shop terms — who runs it, and the made-to-order, all-sales-final policy you agree to at checkout.",
  alternates: { canonical: "https://tourdefore.com/terms" },
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem)" }}>
      <MulliganButton />
      <HomeButton />
      <div style={{ maxWidth: 700, margin: "0 auto", lineHeight: 1.8, fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>
        <h1 style={{ fontFamily: "var(--font-plan-groovy), cursive", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", marginBottom: "0.5rem" }}>
          Shop Terms
        </h1>
        <p style={{ color: "rgba(255,255,255,0.3)", marginBottom: "2rem" }}>The rules for the Tour de Fore pro shop. Last updated: July 3, 2026.</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>Who Runs This</h2>
        <p>Tour de Fore is a personal golf site with a small pro shop, operated by Belmont Mills LLC, a New York limited liability company. Belmont Mills is the merchant of record on every Stripe checkout.</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>The Pro Shop</h2>
        <p>Checkout runs through Stripe. Belmont Mills LLC is the merchant; Stripe handles cards and we never see them. Sales tax is calculated automatically at checkout, and we ship to US addresses only. No account is required — you check out as a guest.</p>
        <p>Every item is embroidered and made-to-order, then drop-shipped from Printful after you pay. Because each one is custom-produced, <strong style={{ color: "#fff" }}>all sales are final — no refunds, exchanges, or returns</strong>. You agree to this on the Stripe checkout page before payment. The one exception: if Printful damages or loses your order in transit, email us with photos and we&rsquo;ll reship at our cost.</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>The Basics</h2>
        <p>The shop is provided as-is; we don&rsquo;t warrant that every product is always in stock or that the site is free of downtime or bugs. These terms are governed by the laws of the State of New York.</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>Contact</h2>
        <p>Order, shipping, or billing questions — email <a href="mailto:info@tourdefore.com" style={{ color: "rgba(220,38,38,0.9)" }}>info@tourdefore.com</a>. Operating entity: Belmont Mills LLC.</p>
      </div>
    </main>
  );
}
