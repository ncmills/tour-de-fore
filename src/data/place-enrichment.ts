/**
 * Place-enrichment overlay — per-venue social-proof fields auto-populated
 * by the Google Places API batch script.
 *
 * JSON file: src/data/place-enrichment.json  (git-tracked, script-generated)
 * Script:    scripts/enrich-places.ts
 * Usage:     npx tsx scripts/enrich-places.ts --help
 *
 * Keys follow the format:  "${destinationId}::${category}::${index}"
 *   category = "dining" | "bars" | "activities" | "lodging"
 *   index    = 0-based position in the destination's venue array
 *
 * NOTE: Golf courses (GolfCourse) already have googleRating / reviewCount /
 * hypeTag / rankNote populated directly in the source data files. The script
 * skips courses by default (--skip-enriched). This overlay targets the other
 * four categories that lack systematic enrichment.
 *
 * Manual edits to the underlying data files always win — this overlay only
 * fills in fields that are NOT already set on the source venue object.
 *
 * When the JSON is empty ({}) every call is a no-op with zero overhead.
 */

import enrichmentData from "./place-enrichment.json";

export type PlaceEnrichment = {
  googleRating?: number;
  reviewCount?: number;
  hypeTag?: string;
  rankNote?: string;
};

export type TdfCategory = "dining" | "bars" | "activities" | "lodging";

export type PlaceEnrichmentKey = `${string}::${TdfCategory}::${number}`;

export const PLACE_ENRICHMENT: Record<string, PlaceEnrichment> =
  enrichmentData as Record<string, PlaceEnrichment>;

const IS_EMPTY = Object.keys(PLACE_ENRICHMENT).length === 0;

/**
 * Merge place-enrichment overlay onto a venue object.
 * Fields already set on the source venue are never overwritten.
 * Returns the original reference unchanged when the JSON is empty or
 * no overlay exists for the given key.
 */
export function enrichVenue<T extends object>(
  destinationId: string,
  category: TdfCategory,
  index: number,
  venue: T,
): T & PlaceEnrichment {
  if (IS_EMPTY) return venue as T & PlaceEnrichment;

  const key: PlaceEnrichmentKey = `${destinationId}::${category}::${index}`;
  const overlay = PLACE_ENRICHMENT[key];
  if (!overlay) return venue as T & PlaceEnrichment;

  // Overlay only merges fields not already set in the source data.
  // Manual edits always win over auto-enrichment.
  return {
    ...venue,
    googleRating:
      (venue as unknown as PlaceEnrichment).googleRating ?? overlay.googleRating,
    reviewCount:
      (venue as unknown as PlaceEnrichment).reviewCount ?? overlay.reviewCount,
    hypeTag:
      (venue as unknown as PlaceEnrichment).hypeTag ?? overlay.hypeTag,
    rankNote:
      (venue as unknown as PlaceEnrichment).rankNote ?? overlay.rankNote,
  };
}
