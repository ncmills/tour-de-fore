import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPlan } from "@/lib/kv";
import PlanResultClient from "@/components/PlanResultClient";
import PlanSelectionClient from "@/components/PlanSelectionClient";
import type { TripTier, ThreePlanResult, GeneratedPlan } from "@/lib/plan-types";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tier?: string }>;
}

function getTierPlan(plans: ThreePlanResult, tier: string): GeneratedPlan | null {
  switch (tier) {
    case "imp": return plans.imp;
    case "devil": return plans.devil;
    case "demon-king": return plans.demonKing;
    default: return null;
  }
}

export async function generateMetadata({ params, searchParams }: Props) {
  const { id } = await params;
  const { tier } = await searchParams;
  const stored = await getPlan(id);

  if (!stored) {
    return { title: "Plan Not Found | Tour de Fore" };
  }

  // Use devil tier for metadata by default
  const plan = tier ? getTierPlan(stored.plans, tier) : stored.plans.devil;
  const name = plan?.tripName || "Your Trip Plan";
  const desc = plan?.tagline || "";

  return {
    title: `${name} | Tour de Fore`,
    description: `${desc} — ${plan?.destination || ""}`,
    openGraph: {
      title: `${name} | Tour de Fore`,
      description: `${desc} — ${plan?.destination || ""}`,
    },
  };
}

export default async function PlanResultPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { tier } = await searchParams;
  const stored = await getPlan(id);

  if (!stored) {
    notFound();
  }

  // If no tier selected, show the 3-card selection grid
  if (!tier) {
    return (
      <Suspense>
        <PlanSelectionClient planId={id} plans={stored.plans} />
      </Suspense>
    );
  }

  // Show the selected tier's full plan
  const plan = getTierPlan(stored.plans, tier);
  if (!plan) {
    notFound();
  }

  return (
    <Suspense>
      <PlanResultClient plan={plan} planId={id} tier={tier as TripTier} />
    </Suspense>
  );
}
