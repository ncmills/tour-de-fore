/**
 * Unsplash API helper.
 *
 * Used at build time by scripts/fetch-unsplash-images.ts to populate
 * src/data/unsplash-cache.json — the cache is then read by pages so that
 * runtime never hits the Unsplash API.
 *
 * Attribution requirements (Unsplash TOS):
 *   - Credit photographer with link to their profile
 *   - Link "Unsplash" back to the photo page
 *   - Append ?utm_source=tour_de_fore&utm_medium=referral to both links
 * The UnsplashHero component handles rendering this.
 */

const UTM = "utm_source=tour_de_fore&utm_medium=referral";

export interface UnsplashCacheEntry {
  url: string;
  alt: string;
  photographerName: string;
  photographerUrl: string;
  unsplashUrl: string;
  query: string;
  fetchedAt: string;
}

export interface UnsplashSearchResult {
  entry: UnsplashCacheEntry | null;
  ratelimitRemaining: number;
}

interface UnsplashApiPhoto {
  id: string;
  alt_description: string | null;
  description: string | null;
  urls: { raw: string; full: string; regular: string; small: string };
  user: {
    name: string;
    username: string;
    links: { html: string };
  };
  links: { html: string };
}

interface UnsplashApiResponse {
  total: number;
  total_pages: number;
  results: UnsplashApiPhoto[];
}

export class UnsplashRateLimitError extends Error {
  constructor(public remaining: number) {
    super(`Unsplash rate limit nearly exhausted (${remaining} remaining)`);
    this.name = "UnsplashRateLimitError";
  }
}

/**
 * Searches Unsplash and returns the top landscape result.
 * Always returns the X-Ratelimit-Remaining header value so callers can
 * decide when to stop. Returns entry: null if no photo matched.
 */
export async function searchUnsplash(
  query: string,
  accessKey: string,
): Promise<UnsplashSearchResult> {
  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", query);
  url.searchParams.set("orientation", "landscape");
  url.searchParams.set("per_page", "5");
  url.searchParams.set("content_filter", "high");

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
      "Accept-Version": "v1",
    },
  });

  const remainingHeader = res.headers.get("x-ratelimit-remaining");
  const ratelimitRemaining = remainingHeader ? parseInt(remainingHeader, 10) : Number.NaN;

  if (!res.ok) {
    if (res.status === 403 && !Number.isNaN(ratelimitRemaining) && ratelimitRemaining <= 0) {
      throw new UnsplashRateLimitError(0);
    }
    throw new Error(`Unsplash API error ${res.status}: ${await res.text()}`);
  }

  const data = (await res.json()) as UnsplashApiResponse;
  const photo = data.results[0];

  if (!photo) {
    return { entry: null, ratelimitRemaining };
  }

  const entry: UnsplashCacheEntry = {
    url: photo.urls.regular,
    alt: photo.alt_description || photo.description || query,
    photographerName: photo.user.name,
    photographerUrl: `https://unsplash.com/@${photo.user.username}?${UTM}`,
    unsplashUrl: `${photo.links.html}?${UTM}`,
    query,
    fetchedAt: new Date().toISOString(),
  };

  return { entry, ratelimitRemaining };
}
