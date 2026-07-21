import { Suspense } from "react";
import { trips } from "@/lib/trips";
import { notFound } from "next/navigation";
import PastTripDetailClient from "@/components/PastTripDetailClient";

// Derived from the trip data so a newly-past trip (upcoming flag removed) gets a
// /past-trips/<year> page automatically — no hardcoded year list to update.
const VALID_YEARS = trips.filter((t) => !t.upcoming).map((t) => t.year);

export function generateStaticParams() {
  return VALID_YEARS.map((y) => ({ year: String(y) }));
}

export async function generateMetadata({ params }: { params: Promise<{ year: string }> }) {
  const { year: yearStr } = await params;
  const year = parseInt(yearStr);
  const trip = trips.find((t) => t.year === year);
  const dest = trip ? `${trip.location}` : `${yearStr}`;
  return {
    title: `${dest} ${yearStr} | Tour de Fore`,
    description: `Tour de Fore ${yearStr} trip to ${dest} — courses, nightlife, and memories from the annual golf odyssey.`,
    alternates: { canonical: `https://tourdefore.com/past-trips/${yearStr}` },
    openGraph: {
      title: `${dest} ${yearStr} | Tour de Fore`,
      description: `Tour de Fore ${yearStr} trip to ${dest} — courses, nightlife, and memories from the annual golf odyssey.`,
      images: ["/icon-fancy.png"],
    },
  };
}

export default async function YearPage({ params }: { params: Promise<{ year: string }> }) {
  const { year: yearStr } = await params;
  const year = parseInt(yearStr);
  if (!VALID_YEARS.includes(year)) notFound();

  const trip = trips.find((t) => t.year === year);
  if (!trip) notFound();

  return (
    <Suspense>
        <PastTripDetailClient trip={trip} />
      </Suspense>
  );
}
