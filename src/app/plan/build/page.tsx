import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPlan } from "@/lib/kv";
import TripBuilderClient from "@/components/TripBuilderClient";
import ErrorBoundary from "@/components/ErrorBoundary";
import type { TripTier, PriceLevel, ThreePlanResult, GeneratedPlan } from "@/lib/plan-types";
import { allDestinations } from "@/data/index";
import { buildInsightsContext } from "@/lib/insights";

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
  const rawPlan = (rec.plans as any)[tierKey];
  if (!rawPlan) notFound();

  // Sanitize plan data — Claude's JSON repair can produce partial objects
  const plan: GeneratedPlan = {
    ...rawPlan,
    lodging: rawPlan.lodging || { name: "Lodging TBD", type: "House", address: "", costPerNight: "$0", rationale: "" },
    courses: Array.isArray(rawPlan.courses) ? rawPlan.courses : [],
    dining: Array.isArray(rawPlan.dining) ? rawPlan.dining : [],
    bars: Array.isArray(rawPlan.bars) ? rawPlan.bars : [],
    schedule: Array.isArray(rawPlan.schedule) ? rawPlan.schedule : [],
    proTips: Array.isArray(rawPlan.proTips) ? rawPlan.proTips : [],
    estimatedBudget: rawPlan.estimatedBudget || { perPerson: "$0", breakdown: [] },
    groupLogistics: rawPlan.groupLogistics || { teeTimeStrategy: "", transport: "", packingList: [] },
    numberOfDays: rawPlan.numberOfDays || rawPlan.schedule?.length || 3,
    groupSize: rawPlan.groupSize || stored.inputs?.groupSize || 12,
    destination: rawPlan.destination || rec.city || "",
  };

  // Look up destination data for smart insights
  const destination = allDestinations.find((d) => d.id === rec.destinationId);
  const insights = destination
    ? buildInsightsContext(destination, stored.inputs?.groupSize || 12)
    : null;

  return (
    <ErrorBoundary fallbackHref={`/plan/result/${planId}`}>
      <Suspense>
        <TripBuilderClient
          plan={plan}
          allPlans={rec.plans}
          planId={planId}
          tier={tier as TripTier}
          dest={dest}
          insights={insights}
        />
      </Suspense>
    </ErrorBoundary>
  );
}
