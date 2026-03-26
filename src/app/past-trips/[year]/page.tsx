import { Suspense } from "react";
import { trips } from "@/lib/trips";
import { notFound } from "next/navigation";
import PastTripDetailClient from "@/components/PastTripDetailClient";

const VALID_YEARS = [2021, 2022, 2023, 2024, 2025];

export function generateStaticParams() {
  return VALID_YEARS.map((y) => ({ year: String(y) }));
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
