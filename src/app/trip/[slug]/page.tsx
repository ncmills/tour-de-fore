import { Suspense } from "react";
import { notFound } from "next/navigation";
import { trips, getTripBySlug } from "@/lib/trips";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TripPageClient from "@/components/TripPageClient";
import PastTripDetailClient from "@/components/PastTripDetailClient";

export function generateStaticParams() {
  return trips.map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) return {};
  const title = `${trip.year} \u2014 ${trip.location}, ${trip.state} | Tour de Fore`;
  const description = trip.tagline || `Tour de Fore ${trip.year} golf trip to ${trip.location}, ${trip.state}.`;
  return {
    title,
    description,
    alternates: { canonical: `https://tourdefore.com/trip/${slug}` },
    openGraph: { title, description, images: ["/icon-fancy.png"] },
    // Live/upcoming trip pages carry guest arrival info (door code, WiFi, guest-portal
    // link) — keep them out of search indexes. Reachable by direct link only.
    ...(trip.upcoming ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function TripPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) notFound();

  // 2026 (Live Trip) uses the new devil-themed layout
  if (trip.upcoming) {
    return (
      <Suspense>
        <PastTripDetailClient trip={trip} isLive />
      </Suspense>
    );
  }

  const currentIndex = trips.findIndex((t) => t.slug === slug);
  const prevTrip = currentIndex < trips.length - 1 ? trips[currentIndex + 1] : null;
  const nextTrip = currentIndex > 0 ? trips[currentIndex - 1] : null;

  return (
    <>
      <Nav />
      <div id="main-content">
        <TripPageClient trip={trip} prevTrip={prevTrip} nextTrip={nextTrip} />
      </div>
      <Footer />
    </>
  );
}
