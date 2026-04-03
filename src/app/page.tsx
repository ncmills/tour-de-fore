import { Suspense } from "react";
import HomeClient from "@/components/HomeClient";

export const metadata = {
  title: "Tour de Fore | Plan Your Epic Group Golf Trip",
  description:
    "AI-powered golf trip planner with 133 destinations across America. Plan the perfect group golf getaway — courses, lodging, nightlife, and activities all in one place.",
  alternates: { canonical: "https://tourdefore.com" },
};

export default function Home() {
  return (
    <>
      <Suspense>
        <HomeClient />
      </Suspense>

      {/* Hidden SEO content — crawlable by Google, invisible to users */}
      <section
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }}
      >
        <h1>Tour de Fore — AI-Powered Golf Trip Planner</h1>
        <p>From tee times to bar tabs — every detail, handled. Tour de Fore covers 133 destinations across 7 regions in America with detailed course data, lodging options, dining recommendations, nightlife guides, and group activities. Whether you&apos;re planning a bachelor party golf trip, a budget-friendly golf weekend, or a bucket-list golf odyssey, our AI planner builds custom day-by-day itineraries for groups of 4 to 32.</p>
        <p>Browse golf courses by tier — from budget-friendly public courses to bucket-list championship venues. Compare green fees, ratings, and course styles including links, desert, parkland, mountain, and coastal layouts. Each destination includes lodging recommendations for large group houses, dining options from casual to upscale steakhouses, and nightlife from dive bars to rooftop lounges.</p>
        <p>Featured regions: Southwest golf trips (Scottsdale, Sedona, Las Vegas), Southeast golf trips (Pinehurst, Kiawah Island, Myrtle Beach), Pacific Northwest golf trips (Bend, Bandon Dunes), Mountain West golf trips (Steamboat Springs, Park City), Midwest golf trips (Kohler, Traverse City), Northeast golf trips (Cape Cod, Newport, Nantucket), and South Central golf trips (Austin, San Antonio).</p>

        <nav>
          <h2>Golf Trip Destinations</h2>
          <a href="/golf-trips">All 133 Destinations</a>
          <a href="/golf-trips/region/southwest">Southwest Golf Trips</a>
          <a href="/golf-trips/region/southeast">Southeast Golf Trips</a>
          <a href="/golf-trips/region/pacific-nw">Pacific Northwest Golf Trips</a>
          <a href="/golf-trips/region/mountain-west">Mountain West Golf Trips</a>
          <a href="/golf-trips/region/midwest">Midwest Golf Trips</a>
          <a href="/golf-trips/region/northeast">Northeast Golf Trips</a>
          <a href="/golf-trips/region/south-central">South Central Golf Trips</a>
          <a href="/golf-trips/courses/bucket-list">Bucket List Courses</a>
          <a href="/golf-trips/courses/premium">Premium Courses</a>
          <a href="/golf-trips/bachelor-party">Bachelor Party Golf Trips</a>
          <a href="/golf-trips/budget-trips">Budget Golf Trips</a>
          <a href="/golf-trips/bucket-list-trips">Bucket List Golf Trips</a>
          <a href="/golf-trips/scottsdale-az">Scottsdale Golf Trip</a>
          <a href="/golf-trips/bend-or">Bend Golf Trip</a>
          <a href="/golf-trips/pinehurst-nc">Pinehurst Golf Trip</a>
          <a href="/golf-trips/kohler-wi">Kohler Golf Trip</a>
          <a href="/plan-a-trip">Plan a Golf Trip</a>
          <a href="/past-trips">Past Golf Trips</a>
          <a href="/shop">Pro Shop</a>
        </nav>
      </section>
    </>
  );
}
