/**
 * Cross-site footer links — EVENTS / GROUP-TRIP CLUSTER (funnel).
 *
 * Network footers are siloed by topic so links stay topically relevant and don't
 * read as a cross-niche link scheme. Equity funnels UPSTREAM toward higher-priority
 * sites only. Cluster priority: offsiteoutpost > bestmanhq > maidofhonorhq > tourdefore.
 * This site (tourdefore, priority 4 / lowest) links to all sites above it.
 */
export interface NetworkSite {
  domain: string; // bare domain, no protocol
  label: string; // display label
  tagline: string; // short description (4-8 words)
}

export const NETWORK_SITES: NetworkSite[] = [
  { domain: "offsiteoutpost.com", label: "Offsite Outpost", tagline: "Corporate retreats & team offsites" },
  { domain: "bestmanhq.com", label: "BESTMAN HQ", tagline: "Bachelor party planner" },
  { domain: "maidofhonorhq.com", label: "Maid of Honor HQ", tagline: "Bachelorette party planner" },
];

/** Returns sites excluding the current domain (prevents self-linking). */
export function getNetworkSites(currentDomain: string): NetworkSite[] {
  return NETWORK_SITES.filter((s) => s.domain !== currentDomain);
}
