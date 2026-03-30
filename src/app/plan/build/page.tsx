import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPlan } from "@/lib/kv";
import TripBuilderClient from "@/components/TripBuilderClient";
import type { TripTier, PriceLevel } from "@/lib/plan-types";

interface Props {
  searchParams: Promise<{ planId?: string; dest?: string; tier?: string }>;
}

export const metadata = {
  title: "Build Your Trip | Tour de Fore",
  description: "Customize your golf trip — pick lodging, courses, restaurants, and more.",
};

export default async function BuildPage({ searchParams }: Props) {
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

  return (
    <Suspense>
      <TripBuilderClient plan={plan} planId={planId} tier={tier as TripTier} dest={dest} />
    </Suspense>
  );
}
