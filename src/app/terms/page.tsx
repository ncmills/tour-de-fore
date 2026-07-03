import HomeButton from "@/components/HomeButton";
import MulliganButton from "@/components/MulliganButton";

export const metadata = {
  title: "Terms of Use | Tour de Fore",
  description: "Tour de Fore terms of use — who runs it, what you're buying from the pro shop, and the rules of the road.",
  alternates: { canonical: "https://tourdefore.com/terms" },
};

export default function TermsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem)" }}>
      <MulliganButton />
      <HomeButton />
      <div style={{ maxWidth: 700, margin: "0 auto", lineHeight: 1.8, fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>
        <h1 style={{ fontFamily: "var(--font-plan-groovy), cursive", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", marginBottom: "2rem" }}>
          Terms of Use
        </h1>
        <p style={{ color: "rgba(255,255,255,0.3)", marginBottom: "2rem" }}>Last updated: July 3, 2026</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>Who Runs This</h2>
        <p>Tour de Fore is a personal golf site and pro shop operated by Belmont Mills LLC, a New York limited liability company. It&rsquo;s where we keep a record of our annual golf trips and sell a bit of merch. Belmont Mills is the merchant of record on every Stripe checkout. Using the site means you accept these terms; if you don&rsquo;t, don&rsquo;t use it.</p>
        <p>The AI golf-trip planner that used to live here moved to <a href="https://handicaphq.com" style={{ color: "rgba(220,38,38,0.9)" }}>Handicap HQ</a>. Those terms apply over there, not here.</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>The Pro Shop</h2>
        <p>Pro-shop checkout runs through Stripe. Belmont Mills LLC is the merchant; Stripe handles cards and we never see them. Sales tax is calculated automatically at checkout. We ship to US addresses only. No account is required — you check out as a guest.</p>
        <p>Embroidered hats, polos, and the rest of the merch are made-to-order and drop-shipped from Printful after you pay. Because every item is custom-produced, <strong style={{ color: "#fff" }}>all sales are final — no refunds, exchanges, or returns</strong>. You agree to this on the Stripe checkout page before payment. The one exception: if Printful damages or loses your order in transit, email us with photos and we&rsquo;ll reship at our cost.</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>Content</h2>
        <p>The trip writeups, photos, and merch designs on Tour de Fore are © Belmont Mills LLC. They document our own trips — enjoy them, but don&rsquo;t republish them as your own, scrape the site at machine scale, or resell access. Third-party courses, lodging, and bars mentioned in our trip recaps are not affiliated with Tour de Fore.</p>
        <p>The site is for adults — some of what we write about involves bars and other 21+ contexts. By using the site you confirm you&rsquo;re 18 or older.</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>Disclaimers and Liability</h2>
        <p>The site and the pro shop are provided as-is. We don&rsquo;t warrant that the site will be free of downtime, bugs, or errors, or that every product will always be in stock.</p>
        <p>To the maximum extent allowed by law, Belmont Mills LLC is not liable for indirect, incidental, consequential, or punitive damages arising from your use of the site or anything generated through it. Where liability can&rsquo;t be fully disclaimed, our total aggregate liability is capped at the greater of (a) the amount you paid us in the twelve months before the claim or (b) one hundred US dollars.</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>Governing Law</h2>
        <p>These terms are governed by the laws of the State of New York. Any dispute will be brought in the state or federal courts of New York County, New York, and you consent to that forum. Small-claims remedies in your home state stay available where statute permits.</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>Changes</h2>
        <p>We update these terms when the service changes — pricing, scope, fulfillment, the operating entity. Material changes will be reflected with a new &ldquo;last updated&rdquo; date at the top of this page. Continued use after a change is acceptance.</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>Contact</h2>
        <p>Questions, billing problems, shipping issues, or anything else — email <a href="mailto:info@tourdefore.com" style={{ color: "rgba(220,38,38,0.9)" }}>info@tourdefore.com</a>. Operating entity: Belmont Mills LLC.</p>
      </div>
    </main>
  );
}
