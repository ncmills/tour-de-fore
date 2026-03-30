import MulliganButton from "@/components/MulliganButton";

export const metadata = {
  title: "Privacy Policy | Tour de Fore",
  description: "Tour de Fore privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem)" }}>
      <MulliganButton />
      <div style={{ maxWidth: 700, margin: "0 auto", lineHeight: 1.8, fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>
        <h1 style={{ fontFamily: "var(--font-plan-groovy), cursive", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", marginBottom: "2rem" }}>
          Privacy Policy
        </h1>
        <p style={{ color: "rgba(255,255,255,0.3)", marginBottom: "2rem" }}>Last updated: March 30, 2026</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>What We Collect</h2>
        <p>When you use Tour de Fore, we collect:</p>
        <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
          <li><strong style={{ color: "#fff" }}>Name and email</strong> — provided when you generate a trip plan or sign in.</li>
          <li><strong style={{ color: "#fff" }}>Trip preferences</strong> — destination, group size, budget, and other wizard inputs used to generate your plan.</li>
          <li><strong style={{ color: "#fff" }}>Payment info</strong> — processed securely by Stripe. We never see or store your card number.</li>
          <li><strong style={{ color: "#fff" }}>Usage data</strong> — which destinations you view and select, used to improve recommendations.</li>
        </ul>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>How We Use It</h2>
        <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
          <li>Generate personalized trip plans based on your preferences.</li>
          <li>Send you your trip plan and attendee invites via email.</li>
          <li>Improve our recommendation engine based on aggregate usage patterns.</li>
          <li>Process payments for premium plan features.</li>
        </ul>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>How We Store It</h2>
        <p>Your data is stored in encrypted cloud databases (Redis Cloud) with automatic expiration. Trip plans are retained for 90 days. Account data is retained for 1 year of inactivity.</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>Third Parties</h2>
        <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
          <li><strong style={{ color: "#fff" }}>Stripe</strong> — payment processing</li>
          <li><strong style={{ color: "#fff" }}>Resend</strong> — transactional email delivery</li>
          <li><strong style={{ color: "#fff" }}>Anthropic (Claude)</strong> — AI-powered trip plan generation</li>
          <li><strong style={{ color: "#fff" }}>Vercel</strong> — hosting and analytics</li>
        </ul>
        <p>We do not sell your data to third parties.</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>Your Rights</h2>
        <p>You can request deletion of your data at any time by emailing <a href="mailto:info@tourdefore.com" style={{ color: "rgba(220,38,38,0.9)" }}>info@tourdefore.com</a>.</p>

        <h2 style={{ color: "#fff", fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>Contact</h2>
        <p>Questions about this policy? Email <a href="mailto:info@tourdefore.com" style={{ color: "rgba(220,38,38,0.9)" }}>info@tourdefore.com</a>.</p>
      </div>
    </main>
  );
}
