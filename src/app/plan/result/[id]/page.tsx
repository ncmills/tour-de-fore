import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPlan } from "@/lib/kv";
import PlanResultClient from "@/components/PlanResultClient";
import PlanSelectionClient from "@/components/PlanSelectionClient";
import ErrorBoundary from "@/components/ErrorBoundary";
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const stored = await getPlan(id);
  if (!stored) return { title: "Plan Not Found | Tour de Fore" };

  // Pull the headline plan (mid destination, devil tier is the canonical
  // "recommended combo"), falling back to whichever bucket has data.
  const firstDest =
    stored.destinations?.mid ??
    stored.destinations?.budget ??
    stored.destinations?.premium;
  const headline =
    firstDest?.plans?.devil ??
    firstDest?.plans?.imp ??
    firstDest?.plans?.demonKing;
  const preview = stored.freePreviews?.mid ?? stored.freePreviews?.budget;

  const tripName = headline?.tripName || "Your Golf Trip Plan";
  const destination =
    headline?.destination ||
    (preview ? `${preview.city}${preview.state ? `, ${preview.state}` : ""}` : "");

  // 2026-04-11: explicit Open Graph + Twitter cards so the shared link
  // unfurls cleanly in iMessage / WhatsApp / Slack / email previews. The
  // absolute image URL is required because iMessage doesn't resolve relative
  // paths. Ported from the MOH /plan/result/[id] pattern — forwarded plan
  // links are the main sharing surface, so the preview is non-negotiable.
  const title = destination ? `${tripName} · ${destination}` : tripName;
  const description = headline
    ? `The full itinerary — courses, lodging, day-by-day schedule, and group logistics for ${destination || "your trip"}. Built with Tour de Fore.`
    : "Your AI-planned golf trip — courses, lodging, day-by-day schedule, and group logistics. Built with Tour de Fore.";
  const ogUrl = `https://tourdefore.com/plan/result/${id}`;
  const ogImage = `https://tourdefore.com/plan/result/${id}/opengraph-image`;

  return {
    title: `${title} | Tour de Fore`,
    description,
    // Plans are unguessable-UUID links — don't let search engines index them
    robots: { index: false, follow: false },
    alternates: { canonical: ogUrl },
    openGraph: {
      title,
      description,
      url: ogUrl,
      siteName: "Tour de Fore",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/**
 * /plan/result/[id]
 *
 * Publicly viewable by anyone holding the link. `planId` is a
 * `crypto.randomUUID()` (128 bits of entropy) so the URL itself is the
 * capability — this is what lets an organizer drop the link in their group
 * chat and have every buddy open it without friction. Matches the MOH
 * share-plan pattern shipped 2026-04-11.
 *
 * Behavior:
 *   - no `dest` query → show the 3-destination selection grid
 *   - `dest` + `tier` → show the full themed plan for that combo
 */
export default async function PlanResultPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { dest, tier } = await searchParams;
  const stored = await getPlan(id);
  if (!stored) notFound();

  // No dest: show destination cards (all plans are free — no paywall)
  if (!dest) {
    return (
      <Suspense>
        <PlanSelectionClient
          planId={id}
          freePreviews={stored.freePreviews || null}
          paid={true}
          legacyDestinations={stored.destinations}
        />
      </Suspense>
    );
  }

  const destLevel = dest as PriceLevel;

  // Show full plan
  if (stored.destinations?.[destLevel]) {
    const rec = stored.destinations[destLevel];
    const selectedTier = tier || "devil";
    const plan = getTierPlan(rec.plans, selectedTier);
    if (!plan) notFound();

    return (
      <ErrorBoundary fallbackHref={`/plan/result/${id}`}>
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
      </ErrorBoundary>
    );
  }

  // Legacy plans
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

  // Fallback — show selection
  return (
    <Suspense>
      <PlanSelectionClient planId={id} freePreviews={stored.freePreviews || null} paid={true} />
    </Suspense>
  );
}
