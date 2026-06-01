import { Suspense } from "react";
import HomeClient from "@/components/HomeClient";

// Title is keyword-led for search (the #1 on-page signal); the brand quote stays
// in the description (still shows in SERP) and across the visible page + OG. This
// is metadata only — the rendered homepage is unchanged. (SEO pass 2026-06-01.)
export const metadata = {
  title: "Golf Trip Planner: 133 Destinations, Every Course & Stay | Tour de Fore",
  description:
    "Hell is empty, all the devils are here. Plan a golf trip across 133 destinations — every course, stay, bar, and bus. Bachelor parties, buddy trips, and bucket-list runs for crews of 4 to 32.",
  alternates: { canonical: "https://tourdefore.com" },
  openGraph: {
    type: "website",
    url: "https://tourdefore.com",
    title: "Tour de Fore — Golf Trip Planner | 133 Destinations, Courses & Stays",
    description:
      "Hell is empty, all the devils are here. 133 destinations, every course, lodging, bar, and bus — built for the crew that takes golf trips seriously.",
  },
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
        <h1>Tour de Fore — Hell is empty, all the devils are here.</h1>
        <p>From tee times to bar tabs — every detail, handled. Tour de Fore covers 133 destinations across 7 regions in America with detailed course data, lodging options, dining recommendations, nightlife guides, and group activities. Whether you&apos;re planning a bachelor party golf trip, a budget-friendly golf weekend, or a bucket-list golf odyssey, the planner builds custom day-by-day itineraries for groups of 4 to 32.</p>
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
          <a href="/golf-trips/state/arizona">Arizona Golf Trips (Cheaper Scottsdale Alternatives)</a>
          <a href="/golf-trips/state/utah">Utah Golf Trips</a>
          <a href="/golf-trips/state/nevada">Nevada Golf Trips</a>
          <a href="/golf-trips/state/california">California Golf Trips</a>
          <a href="/golf-trips/state/north-carolina">North Carolina Golf Trips</a>
          <a href="/golf-trips/state/south-carolina">South Carolina Golf Trips</a>
          <a href="/golf-trips/state/oregon">Oregon Golf Trips</a>
          <a href="/golf-trips/compare/scottsdale-az-vs-tucson-az">Scottsdale vs Tucson</a>
          <a href="/golf-trips/compare/scottsdale-az-vs-sedona-az">Scottsdale vs Sedona</a>
          <a href="/plan-a-trip">Plan a Golf Trip</a>
          <a href="/past-trips">Past Golf Trips</a>
          <a href="/shop">Pro Shop</a>
        </nav>
      </section>
    </>
  );
}
