import LoreClient from "./LoreClient";

export const metadata = {
  title: "The Lore | Tour de Fore",
  description:
    "The lore of Tour de Fore — a golf-trip habit that got out of hand. Six years of annual pilgrimages, one crew, and the receipts to prove it. Est. 2021.",
  alternates: { canonical: "https://tourdefore.com/about" },
};

export default function AboutPage() {
  return <LoreClient />;
}
