import { notFound } from "next/navigation";
import { getPlan } from "@/lib/kv";
import ShareableTripClient from "@/components/ShareableTripClient";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tier?: string; dest?: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const stored = await getPlan(id);
  if (!stored) return { title: "Trip Not Found | Tour de Fore" };

  const preview = stored.freePreviews?.mid;
  const dest = stored.destinations?.mid;
  const city = preview?.city || dest?.city || "Unknown";
  const state = preview?.state || dest?.state || "";

  const title = `${city}, ${state} Golf Trip | Tour de Fore`;
  const description = `${stored.inputs.groupSize} people, ${stored.inputs.numberOfDays} days — courses, lodging, restaurants, and the full itinerary.`;
  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: { title, description, images: ["/icon-fancy.png"] },
  };
}

export default async function ShareableTripPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { tier, dest } = await searchParams;
  const stored = await getPlan(id);

  if (!stored || !stored.paid || !stored.destinations) {
    notFound();
  }

  const destLevel = (dest as "budget" | "mid" | "premium") || stored.paidDestination || "mid";
  const rec = stored.destinations[destLevel];
  if (!rec) notFound();

  // Use tier from query params, falling back to devil (recommended)
  const selectedTier = tier || "devil";
  const plan = selectedTier === "imp"
    ? rec.plans.imp
    : selectedTier === "demon-king"
      ? rec.plans.demonKing
      : rec.plans.devil;

  return <ShareableTripClient plan={plan} planId={id} selectedOptions={stored.selectedOptions} timing={stored.inputs ? { tripMonth: stored.inputs.tripMonth, preferredSeason: stored.inputs.preferredSeason, flexible: stored.inputs.flexible } : null} />;
}
