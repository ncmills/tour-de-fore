import HomeButton from "@/components/HomeButton";
import MulliganButton from "@/components/MulliganButton";

export const metadata = {
  title: "Terms of Use | Tour de Fore",
  description: "Tour de Fore terms of use — who runs it, what you're buying, the AI trip-plan disclaimer, and the rules of the road.",
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
        <p style={{ color: "rgba(255,255,255,0.3)", marginBottom: "2rem" }}>Last updated: May 20, 2026</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>Who Runs This</h2>
        <p>Tour de Fore is a golf-trip planning site and pro shop operated by Belmont Mills LLC, a New York limited liability company. Belmont Mills is the merchant of record on every Stripe checkout. Using the site means you accept these terms; if you don&rsquo;t, don&rsquo;t use it.</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>Accounts</h2>
        <p>An account is optional. You can browse all 133 destinations, generate a trip plan, and check out from the pro shop without one. If you do create an account (to save plans, invite attendees, or come back to a draft), keep your email and password to yourself. Reset at <a href="/login" style={{ color: "rgba(220,38,38,0.9)" }}>/login</a> or email <a href="mailto:info@tourdefore.com" style={{ color: "rgba(220,38,38,0.9)" }}>info@tourdefore.com</a> if something looks off.</p>
        <p>We can suspend accounts that scrape the site, evade rate limits, abuse the AI planner, or otherwise grief the service.</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>The Pro Shop</h2>
        <p>Pro-shop checkout runs through Stripe. Belmont Mills LLC is the merchant; Stripe handles cards and we never see them. Sales tax is calculated automatically at checkout. We ship to US addresses only.</p>
        <p>Embroidered hats, polos, and the rest of the merch are made-to-order and drop-shipped from Printful after you pay. Because every item is custom-produced, <strong style={{ color: "#fff" }}>all sales are final — no refunds, exchanges, or returns</strong>. You agree to this on the Stripe checkout page before payment. The one exception: if Printful damages or loses your order in transit, email us with photos and we&rsquo;ll reship at our cost.</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>Concierge Service</h2>
        <p>If you book the full-service concierge tier (priced at 20% of total trip cost), Belmont Mills coordinates bookings, gear, custom site, and mobile app for your trip. Concierge fees are non-refundable once the work begins, but cancellation before kickoff gets a full refund. Actual hotel, course, and transport bookings are between you and those vendors — Belmont Mills facilitates but is not the counterparty on those reservations.</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>AI Trip Plans</h2>
        <p>The trip-planning wizard generates itineraries using Anthropic&rsquo;s Claude. Every plan is a generated draft, not a curated recommendation. The model can be wrong about tee-time availability, green fees, hours, dress codes, food&amp;bev minimums, course conditions, age policies, or whether a venue still exists. <strong style={{ color: "#fff" }}>Confirm everything with the actual course, hotel, restaurant, or transport operator before you book a single thing.</strong></p>
        <p>Third-party courses, lodging, bars, and activity operators are not affiliated with Tour de Fore. We don&rsquo;t guarantee their availability, quality, pricing, or that they&rsquo;ll honor a tee time we mentioned. Their cancellation, refund, and behavior policies are between you and them.</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>Content and Use</h2>
        <p>Destination data, course writeups, guides, and comparison pages on Tour de Fore are © Belmont Mills LLC. Use them to plan your own trip — share generated plans with your crew, print itineraries, screenshot the cost pages. Don&rsquo;t republish the atlas as your own content, scrape it at machine scale, or resell access.</p>
        <p>The site is for adults. Recommended venues include bars, casinos, and other 21+ contexts. By using the site you confirm you&rsquo;re 18 or older.</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>Disclaimers and Liability</h2>
        <p>The site, the atlas, the AI plans, and the pro shop are provided as-is. We don&rsquo;t warrant that data is current to the day, that any course will be open when you arrive, that an itinerary will execute as drafted, or that the site will be free of downtime, bugs, or errors.</p>
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
