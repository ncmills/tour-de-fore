// ── Direct booking / venue deep-link builder ──
//
// Every booking CTA on a generated plan ("Tee Times & Info", "View Menu",
// "Check it Out") should land on the most DIRECT destination available:
//   1. The venue's real URL when we have it (course official site, restaurant
//      reservation page, operator page) — passed straight through.
//   2. Otherwise a constructed best-effort direct link:
//        - golf      → GolfNow tee-time search scoped to that exact course
//        - dining    → OpenTable search scoped to that restaurant + city
//        - else      → Google Maps PLACE search (venue name + city), which is a
//                      map listing, not a bare keyword web search.
//
// No affiliate IDs / tags — clean direct links only. Never returns an empty
// href: when nothing better can be derived it falls back to a Maps place link
// so the CTA is always live and meaningful.

export type BookingKind = "golf" | "dining" | "nightlife" | "activity" | "lodging";

/** A venue/course URL we already trust (official site). Pass-through. */
function normalizeUrl(url: string): string {
  const u = url.trim();
  return u.startsWith("http") ? u : `https://${u}`;
}

/**
 * Pull "City, ST" (or just "City") out of a plan's `destination` string, which
 * is typically "Scottsdale, AZ" or "Bend, Oregon". Returns "" if unusable.
 */
export function locationFromDestination(destination?: string): string {
  if (!destination) return "";
  return destination.replace(/\s+/g, " ").trim();
}

/** Google Maps place search — a map LISTING, not a keyword web search. */
function mapsPlaceLink(name: string, location: string): string {
  const q = [name, location].filter(Boolean).join(" ").trim();
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

/** GolfNow tee-time search scoped to a specific course name + location. */
function golfNowLink(name: string, location: string): string {
  const q = [name, location].filter(Boolean).join(" ").trim();
  return `https://www.golfnow.com/tee-times/search?Keyword=${encodeURIComponent(q)}`;
}

/** OpenTable search scoped to a specific restaurant + location. */
function openTableLink(name: string, location: string): string {
  const q = [name, location].filter(Boolean).join(" ").trim();
  return `https://www.opentable.com/s?term=${encodeURIComponent(q)}`;
}

/**
 * Build the most direct booking/venue link for a plan item.
 *
 * @param kind     category of the item (drives the constructed-link strategy)
 * @param name     venue / course name
 * @param url      the venue's real URL if the data carries one (preferred)
 * @param location "City, ST" string from the plan's destination
 */
export function buildBookingLink(
  kind: BookingKind,
  name: string,
  url?: string,
  location?: string
): string {
  // 1. Real URL wins — direct to the source.
  if (url && url.trim()) return normalizeUrl(url);

  const venue = (name || "").trim();
  const loc = locationFromDestination(location);

  // No name at all — last-ditch generic map of the city.
  if (!venue) return loc ? mapsPlaceLink(loc, "") : "https://www.google.com/maps";

  // 2. Construct the best DIRECT link per category.
  switch (kind) {
    case "golf":
      // Tee-time search scoped to this exact course.
      return golfNowLink(venue, loc);
    case "dining":
      // Reservation listing for this restaurant.
      return openTableLink(venue, loc);
    case "nightlife":
    case "activity":
    case "lodging":
    default:
      // Map listing for the specific venue — better than a keyword web search.
      return mapsPlaceLink(venue, loc);
  }
}

/** CTA label per category, matching the existing copy. */
export function bookingLabel(kind: BookingKind): string {
  switch (kind) {
    case "golf":
      return "Tee Times & Info";
    case "dining":
      return "Reserve a Table";
    case "nightlife":
      return "Check it Out";
    case "activity":
      return "Book / Info";
    case "lodging":
      return "View Listing";
    default:
      return "View";
  }
}
