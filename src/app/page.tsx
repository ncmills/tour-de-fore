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

export default function Home() {
  return (
    <Suspense>
      <HomeClient />
    </Suspense>
  );
}
