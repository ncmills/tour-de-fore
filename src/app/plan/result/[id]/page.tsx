import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPlan } from "@/lib/kv";
import PlanResultClient from "@/components/PlanResultClient";
import PlanSelectionClient from "@/components/PlanSelectionClient";
import TierSelectionClient from "@/components/TierSelectionClient";
import type {
  TripTier,
  ThreePlanResult,
  GeneratedPlan,
  PriceLevel,
  DestinationRecommendation,
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

function getDestination(
  stored: { destinations?: { budget: DestinationRecommendation; mid: DestinationRecommendation; premium: DestinationRecommendation }; plans?: ThreePlanResult },
  dest: string
): DestinationRecommendation | null {
  if (stored.destinations) {
    const level = dest as PriceLevel;
    if (level === "budget" || level === "mid" || level === "premium") {
      return stored.destinations[level];
    }
  }
  // Legacy support: old plans without destinations
  if (stored.plans) {
    return {
      destinationId: "legacy",
      city: stored.plans.devil.destination.split(",")[0]?.trim() || "Unknown",
      state: stored.plans.devil.destination.split(",")[1]?.trim() || "",
      tagline: stored.plans.devil.tagline,
      priceLevel: "mid",
      plans: stored.plans,
    };
  }
  return null;
}

export async function generateMetadata({ params, searchParams }: Props) {
  const { id } = await params;
  const { dest, tier } = await searchParams;
  const stored = await getPlan(id);

  if (!stored) {
    return { title: "Plan Not Found | Tour de Fore" };
  }

  const rec = stored.destinations?.mid;
  const plan = rec
    ? (tier ? getTierPlan(rec.plans, tier) : rec.plans.devil)
    : stored.plans?.devil;

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
  const { dest, tier } = await searchParams;
  const stored = await getPlan(id);

  if (!stored) {
    notFound();
  }

  // ── No dest param: show destination picker (3 city cards) ──
  if (!dest) {
    if (stored.destinations) {
      return (
        <Suspense>
          <PlanSelectionClient planId={id} destinations={stored.destinations} />
        </Suspense>
      );
    }
    // Legacy: old single-destination plans — show as tier picker
    if (stored.plans) {
      const legacyRec: DestinationRecommendation = {
        destinationId: "legacy",
        city: stored.plans.devil.destination.split(",")[0]?.trim() || "Unknown",
        state: stored.plans.devil.destination.split(",")[1]?.trim() || "",
        tagline: stored.plans.devil.tagline,
        priceLevel: "mid",
        plans: stored.plans,
      };
      return (
        <Suspense>
          <TierSelectionClient planId={id} dest="mid" recommendation={legacyRec} />
        </Suspense>
      );
    }
    notFound();
  }

  // ── Has dest but no tier: show tier picker ──
  if (!tier) {
    const rec = getDestination(stored, dest);
    if (!rec) notFound();
    return (
      <Suspense>
        <TierSelectionClient planId={id} dest={dest as PriceLevel} recommendation={rec} />
      </Suspense>
    );
  }

  // ── Has both dest and tier: show full plan ──
  const rec = getDestination(stored, dest);
  if (!rec) notFound();

  const plan = getTierPlan(rec.plans, tier);
  if (!plan) notFound();

  return (
    <Suspense>
      <PlanResultClient plan={plan} planId={id} tier={tier as TripTier} dest={dest} />
    </Suspense>
  );
}
