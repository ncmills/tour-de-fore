import { Destination } from "./types";
import { southwestDestinations } from "./destinations-southwest";
import { pacificNWDestinations } from "./destinations-pacific-nw";
import { mountainWestDestinations } from "./destinations-mountain-west";
import { midwestDestinations } from "./destinations-midwest";
import { southeastDestinations } from "./destinations-southeast";
import { northeastDestinations } from "./destinations-northeast";
import { southCentralDestinations } from "./destinations-south-central";

export const allDestinations: Destination[] = [
  ...southwestDestinations,
  ...pacificNWDestinations,
  ...mountainWestDestinations,
  ...midwestDestinations,
  ...southeastDestinations,
  ...northeastDestinations,
  ...southCentralDestinations,
];

export type { Destination } from "./types";
