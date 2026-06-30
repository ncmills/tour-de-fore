import { Destination } from "./types";
import { tdfDestinations } from "shared-data";
import { applyProseOverlay } from "./prose-overlay";

// TDF's golf-trip destinations now live in the shared universe (shared-data),
// tagged sites:[tdf]. They were extracted verbatim from the old local
// destinations-*.ts files (one-time scripts/_extract-tdf-destinations.ts); the
// SEO prose overlay stays local and is applied here exactly as before.
export const allDestinations: Destination[] = applyProseOverlay(
  tdfDestinations() as unknown as Destination[],
);

export type { Destination } from "./types";
