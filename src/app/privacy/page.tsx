import HomeButton from "@/components/HomeButton";
import MulliganButton from "@/components/MulliganButton";

export const metadata = {
  title: "Privacy Policy | Tour de Fore",
  description: "Tour de Fore privacy policy — how we collect, use, and protect your data.",
  alternates: { canonical: "https://tourdefore.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem)" }}>
      <MulliganButton />
      <HomeButton />
      <div style={{ maxWidth: 700, margin: "0 auto", lineHeight: 1.8, fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>
        <h1 style={{ fontFamily: "var(--font-plan-groovy), cursive", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", marginBottom: "2rem" }}>
          Privacy Policy
        </h1>
        <p style={{ color: "rgba(255,255,255,0.3)", marginBottom: "2rem" }}>Last updated: July 3, 2026</p>

        <p style={{ marginBottom: "1rem" }}>Tour de Fore is a personal golf site and pro shop. The only time we collect your personal information is when you place a pro-shop order. (The AI trip planner that used to live here moved to <a href="https://handicaphq.com" style={{ color: "rgba(220,38,38,0.9)" }}>Handicap HQ</a> — its data practices are covered by its own privacy policy.)</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>What We Collect</h2>
        <p>When you check out from the pro shop, we collect:</p>
        <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
          <li><strong style={{ color: "#fff" }}>Name and email</strong> — to confirm your order and email you a receipt and shipping updates.</li>
          <li><strong style={{ color: "#fff" }}>Shipping address</strong> — to produce and deliver your merch.</li>
          <li><strong style={{ color: "#fff" }}>Payment info</strong> — processed securely by Stripe. We never see or store your card number.</li>
        </ul>
        <p>Browsing the site otherwise — the home page, past trips, the shop — doesn&rsquo;t require an account and doesn&rsquo;t collect personal information beyond standard hosting analytics.</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>How We Use It</h2>
        <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
          <li>Process your payment and produce your order.</li>
          <li>Ship your merch and email you a receipt and tracking.</li>
          <li>Handle any damage, loss, or support issue with your order.</li>
        </ul>
        <p>That&rsquo;s the whole list. We use your order information to fill your order — nothing else.</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>Third Parties</h2>
        <p>We share order information with the vendors that make checkout and fulfillment work, and only for that purpose:</p>
        <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
          <li><strong style={{ color: "#fff" }}>Stripe</strong> — payment processing</li>
          <li><strong style={{ color: "#fff" }}>Printful</strong> — made-to-order production and drop-shipping of your merch</li>
          <li><strong style={{ color: "#fff" }}>Resend</strong> — transactional email delivery</li>
          <li><strong style={{ color: "#fff" }}>Vercel</strong> — hosting and analytics</li>
        </ul>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>We Don&rsquo;t Sell Your Information</h2>
        <p style={{ marginBottom: "1rem" }}>
          We do not sell or share your personal information for anyone else&rsquo;s marketing. Your order details go only to the vendors above, only to fulfill your order. If you interacted with the older trip planner while it lived on this site and want any record opted out of sale or sharing, you can do that at our{" "}
          <a href="/do-not-sell" style={{ color: "rgba(220,38,38,0.9)" }}>Do Not Sell or Share My Personal Information</a>{" "}
          page. We also honor a Global Privacy Control (GPC) signal automatically.
        </p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>Your Rights</h2>
        <p>You can request deletion of your data at any time by emailing <a href="mailto:info@tourdefore.com" style={{ color: "rgba(220,38,38,0.9)" }}>info@tourdefore.com</a>. We don&rsquo;t sell or share your information, but if you&rsquo;d like to be certain no legacy record is ever sold or shared, you can opt out at <a href="/do-not-sell" style={{ color: "rgba(220,38,38,0.9)" }}>/do-not-sell</a> or via a Global Privacy Control signal.</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>Contact</h2>
        <p>Questions about this policy? Email <a href="mailto:info@tourdefore.com" style={{ color: "rgba(220,38,38,0.9)" }}>info@tourdefore.com</a>.</p>
      </div>
    </main>
  );
}
