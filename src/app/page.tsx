import { Suspense } from "react";
import HomeClient from "@/components/HomeClient";

export const metadata = {
  title: "Tour de Fore | Plan Your Epic Group Golf Trip",
  description:
    "AI-powered golf trip planner with 135+ destinations across America. Plan the perfect group golf getaway — courses, lodging, nightlife, and activities all in one place.",
  alternates: { canonical: "https://tourdefore.com" },
};

export default function Home() {
  return (
    <Suspense>
      <HomeClient />
    </Suspense>
  );
}
