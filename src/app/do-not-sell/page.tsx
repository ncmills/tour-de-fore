import HomeButton from "@/components/HomeButton";
import MulliganButton from "@/components/MulliganButton";
import DoNotSellClient from "./DoNotSellClient";

export const metadata = {
  title: "Do Not Sell or Share My Personal Information | Tour de Fore",
  description:
    "Opt out of the sale or sharing of your personal information with Tour de Fore vendors and partners.",
  alternates: { canonical: "https://tourdefore.com/do-not-sell" },
  robots: { index: false, follow: true },
};

export default function DoNotSellPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem)" }}>
      <MulliganButton />
      <HomeButton />
      <div style={{ maxWidth: 700, margin: "0 auto", lineHeight: 1.8, fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>
        <h1 style={{ fontFamily: "var(--font-plan-groovy), cursive", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", marginBottom: "1.5rem" }}>
          Do Not Sell or Share My Personal Information
        </h1>

        <p style={{ marginBottom: "1.5rem" }}>
          Tour de Fore may share or sell personal information (name, email,
          phone, and your trip profile) with relevant vendors and partners. You
          can opt out at any time. Enter the email you used and we&rsquo;ll flag
          every record tied to it as do-not-sell and do-not-share — across Tour
          de Fore and our sister sites.
        </p>

        <DoNotSellClient />

        <p style={{ marginTop: "2rem", fontSize: "0.85rem" }}>
          We also honor the{" "}
          <a
            href="https://globalprivacycontrol.org"
            target="_blank"
            rel="noopener"
            style={{ color: "rgba(220,38,38,0.9)" }}
          >
            Global Privacy Control
          </a>{" "}
          (GPC) signal automatically — if your browser sends it, we treat your
          submissions as do-not-sell without any extra step. Questions? Email{" "}
          <a href="mailto:info@tourdefore.com" style={{ color: "rgba(220,38,38,0.9)" }}>
            info@tourdefore.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
