import { Suspense } from "react";
import ConciergeClient from "@/components/ConciergeClient";

export const metadata = {
  title: "Concierge Service | Tour de Fore",
  description: "Let us book everything, manage everything, and design custom gear for your golf trip.",
};

export default function ConciergePage() {
  return (
    <Suspense>
      <ConciergeClient />
    </Suspense>
  );
}
