import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPlan } from "@/lib/kv";
import ItineraryClient from "@/components/ItineraryClient";
import type { TripTier, PriceLevel } from "@/lib/plan-types";

interface Props {
  searchParams: Promise<{ planId?: string; dest?: string; tier?: string }>;
}

export const metadata = {
  title: "Your Itinerary | Tour de Fore",
  description: "Your complete golf trip itinerary — day-by-day schedule, pricing, and sharing.",
};

export default async function ItineraryPage({ searchParams }: Props) {
  const { planId, dest, tier } = await searchParams;

  if (!planId || !dest || !tier) notFound();

  const stored = await getPlan(planId);
  if (!stored || !stored.paid || !stored.destinations) notFound();

  const destLevel = dest as PriceLevel;
  const rec = stored.destinations[destLevel];
  if (!rec) notFound();

  const tierKey = tier === "demon-king" ? "demonKing" : tier;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const plan = (rec.plans as any)[tierKey];
  if (!plan) notFound();

  const selectedOptions = stored.selectedOptions || null;

  return (
    <Suspense>
      <ItineraryClient
        plan={plan}
        selectedOptions={selectedOptions}
        planId={planId}
        tier={tier as TripTier}
        dest={dest}
      />
    </Suspense>
  );
}
