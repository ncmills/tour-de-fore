import { Suspense } from "react";
import HomeClient from "@/components/HomeClient";

export const metadata = {
  title: "Tour de Fore",
  description: "Hell is empty, all the devils are here.",
  alternates: { canonical: "https://tourdefore.com" },
  openGraph: {
    type: "website",
    url: "https://tourdefore.com",
    title: "Tour de Fore",
    description: "Hell is empty, all the devils are here.",
  },
};

// HomeClient reads useSearchParams() (for ?skip=1), which forces Next to bail
// the whole subtree to client-side-only rendering during static generation —
// it renders the Suspense fallback and nothing else until JS hydrates. Without
// a real fallback here, no-JS clients (curl, some crawlers, JS-disabled/slow
// devices) get an empty page: nothing past "Skip to content". This fallback is
// plain, server-rendered, real content — same copy/links as the animated
// experience — so it's never blank, and it's replaced by HomeClient's full
// intro animation the moment JS hydrates. See feedback_scroll_reveal_invisible_no_js_print.
function HomeFallback() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        padding: "3rem 1.5rem",
        textAlign: "center",
        background: "var(--color-bg, #18181B)",
        color: "rgba(255,255,255,0.85)",
      }}
    >
      <h1 style={{ fontFamily: "var(--font-blackletter), cursive", fontSize: "clamp(2rem, 6vw, 3.5rem)", margin: 0 }}>
        Tour de Fore
      </h1>
      <p style={{ maxWidth: "38rem", fontSize: "1.05rem", lineHeight: 1.5 }}>
        Hell is empty, all the devils are here. An annual buddies golf trip since
        2021 — six years of fairways, friendships, and questionable handicaps.
      </p>
      <nav
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem 2rem",
          justifyContent: "center",
          fontFamily: "var(--font-blackletter), cursive",
          fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
        }}
      >
        <a href="/shop" className="home-link">Pro Shop</a>
        <a href="/past-trips" className="home-link">Body of Work</a>
        <a href="/about" className="home-link">The Lore</a>
      </nav>
      <p style={{ maxWidth: "34rem", fontSize: "0.9rem", lineHeight: 1.5, opacity: 0.75 }}>
        Pro Shop: apparel from the Tour de Fore pro shop, printed and shipped by
        Printful. Body of Work: recaps, photos, and stats from every trip.
        The Lore: the traditions, the evidence, and why it holds.
      </p>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HomeFallback />}>
      <HomeClient />
    </Suspense>
  );
}
