import { notFound } from "next/navigation";
import { trips, getTripBySlug } from "@/lib/trips";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TripPageClient from "@/components/TripPageClient";

export function generateStaticParams() {
  return trips.map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) return {};
  return {
    title: `${trip.year} \u2014 ${trip.location}, ${trip.state} | Tour de Fore`,
    description: trip.tagline,
  };
}

export default async function TripPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) notFound();

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
