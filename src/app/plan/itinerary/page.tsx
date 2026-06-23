import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPlan } from "@/lib/kv";
import ItineraryClient from "@/components/ItineraryClient";
import ErrorBoundary from "@/components/ErrorBoundary";
import type { TripTier, PriceLevel, ThreePlanResult } from "@/lib/plan-types";

interface Props {
  searchParams: Promise<{ planId?: string; dest?: string; tier?: string }>;
}

export const metadata = {
  title: "Your Itinerary | Tour de Fore",
  description: "Your complete golf trip itinerary — day-by-day schedule, pricing, and sharing.",
  robots: { index: false, follow: false },
};

export default async function ItineraryPage({ searchParams }: Props) {
  const { planId, dest, tier } = await searchParams;

  if (!planId || !dest || !tier) notFound();

  const stored = await getPlan(planId);
  if (!stored || !stored.paid || !stored.destinations) notFound();

  const destLevel = dest as PriceLevel;
  const rec = stored.destinations[destLevel];
  if (!rec) notFound();

  const tierKey = (tier === "demon-king" ? "demonKing" : tier) as keyof ThreePlanResult;
  const plan = rec.plans[tierKey];
  if (!plan) notFound();

  const selectedOptions = stored.selectedOptions || null;

  return (
    <ErrorBoundary fallbackHref={`/plan/build?planId=${planId}&dest=${dest}&tier=${tier}`}>
      <Suspense>
        <ItineraryClient
          plan={plan}
          selectedOptions={selectedOptions}
          planId={planId}
          tier={tier as TripTier}
          dest={dest}
          timing={stored.inputs ? {
            tripMonth: stored.inputs.tripMonth,
            preferredSeason: stored.inputs.preferredSeason,
            flexible: stored.inputs.flexible,
          } : null}
        />
      </Suspense>
    </ErrorBoundary>
  );
}
