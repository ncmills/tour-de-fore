import { Destination } from "./types";
import { southwestDestinations } from "./destinations-southwest";
import { pacificNWDestinations } from "./destinations-pacific-nw";
import { mountainWestDestinations } from "./destinations-mountain-west";
import { midwestDestinations } from "./destinations-midwest";
import { southeastDestinations } from "./destinations-southeast";
import { northeastDestinations } from "./destinations-northeast";
import { southCentralDestinations } from "./destinations-south-central";
import { californiaDestinations } from "./destinations-california";
import { internationalDestinations } from "./destinations-international";
import { southeast2Destinations } from "./destinations-southeast-2";
import { midwest2Destinations } from "./destinations-midwest-2";
import { mountainSouthwest2Destinations } from "./destinations-mountain-southwest-2";
import { northeastSouthCentral2Destinations } from "./destinations-northeast-southcentral-2";
import { pacificNwCalifornia2Destinations } from "./destinations-pacificnw-california-2";
import { applyProseOverlay } from "./prose-overlay";

export const allDestinations: Destination[] = applyProseOverlay([
  ...southwestDestinations,
  ...pacificNWDestinations,
  ...mountainWestDestinations,
  ...midwestDestinations,
  ...southeastDestinations,
  ...northeastDestinations,
  ...southCentralDestinations,
  ...californiaDestinations,
  ...internationalDestinations,
  ...southeast2Destinations,
  ...midwest2Destinations,
  ...mountainSouthwest2Destinations,
  ...northeastSouthCentral2Destinations,
  ...pacificNwCalifornia2Destinations,
]);

export type { Destination } from "./types";
