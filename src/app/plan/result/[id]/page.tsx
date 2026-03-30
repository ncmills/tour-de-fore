import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPlan } from "@/lib/kv";
import PlanResultClient from "@/components/PlanResultClient";
import PlanSelectionClient from "@/components/PlanSelectionClient";
import type {
  TripTier,
  ThreePlanResult,
  GeneratedPlan,
  PriceLevel,
} from "@/lib/plan-types";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ dest?: string; tier?: string }>;
}

function getTierPlan(plans: ThreePlanResult, tier: string): GeneratedPlan | null {
  switch (tier) {
    case "imp": return plans.imp;
    case "devil": return plans.devil;
    case "demon-king": return plans.demonKing;
    default: return null;
  }
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const stored = await getPlan(id);
  if (!stored) return { title: "Plan Not Found | Tour de Fore" };

  const preview = stored.freePreviews?.mid;
  if (preview) {
    return {
      title: `${preview.city}, ${preview.state} Trip Plan | Tour de Fore`,
      description: `Plan your golf trip to ${preview.city} — ${preview.groupSize} people, ${preview.numberOfDays} days.`,
    };
  }

  const plan = stored.destinations?.mid?.plans?.devil || stored.plans?.devil;
  return {
    title: `${plan?.tripName || "Your Trip Plan"} | Tour de Fore`,
    description: plan?.tagline || "",
  };
}

export default async function PlanResultPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { dest, tier } = await searchParams;
  const stored = await getPlan(id);
  if (!stored) notFound();

  // ── No dest: show destination cards with inline previews + unlock CTAs ──
  if (!dest) {
    return (
      <Suspense>
        <PlanSelectionClient
          planId={id}
          freePreviews={stored.freePreviews || null}
          paid={stored.paid}
          paidDestination={stored.paidDestination}
          legacyDestinations={stored.destinations}
        />
      </Suspense>
    );
  }

  const destLevel = dest as PriceLevel;

  // ── Paid: show full plan directly (default to devil tier, user can toggle) ──
  if (stored.paid && stored.destinations?.[destLevel]) {
    const rec = stored.destinations[destLevel];
    const selectedTier = tier || "devil";
    const plan = getTierPlan(rec.plans, selectedTier);
    if (!plan) notFound();

    // Pass all 3 tier plans so the component can render tier tabs
    return (
      <Suspense>
        <PlanResultClient
          plan={plan}
          allPlans={rec.plans}
          planId={id}
          tier={selectedTier as TripTier}
          dest={dest}
          paid={true}
        />
      </Suspense>
    );
  }

  // ── Not paid: redirect back to destination cards (unlock happens there now) ──
  // Legacy support for old plans
  if (stored.plans) {
    const selectedTier = tier || "devil";
    const plan = getTierPlan(stored.plans, selectedTier);
    if (!plan) notFound();
    return (
      <Suspense>
        <PlanResultClient plan={plan} planId={id} tier={selectedTier as TripTier} dest={dest} paid={true} />
      </Suspense>
    );
  }

  // Unpaid user trying to access dest directly — send back to cards
  return (
    <Suspense>
      <PlanSelectionClient
        planId={id}
        freePreviews={stored.freePreviews || null}
        paid={false}
      />
    </Suspense>
  );
}
