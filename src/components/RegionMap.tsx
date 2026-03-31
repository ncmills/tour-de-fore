"use client";

// State paths for a complete US map (lower 48)
const STATES: Record<string, string> = {
  WA: "M115,30 L175,28 180,42 190,70 178,74 155,70 118,72 112,48Z",
  OR: "M80,72 L118,72 155,70 178,74 180,85 175,112 118,115 105,90Z",
  CA: "M65,100 L105,90 118,115 120,145 118,175 110,210 95,245 80,235 62,195 55,150Z",
  NV: "M118,115 L160,112 152,185 120,185 118,175 120,145Z",
  ID: "M160,50 L195,48 205,70 200,112 175,112 180,85 178,74 190,70Z",
  MT: "M200,32 L295,28 292,78 200,82 205,70 195,48Z",
  WY: "M200,82 L292,78 290,130 200,134Z",
  UT: "M152,130 L200,134 200,185 175,185 152,185Z",
  CO: "M200,140 L290,136 288,195 200,198Z",
  AZ: "M120,185 L152,185 175,185 178,260 125,258 110,225Z",
  NM: "M178,198 L268,195 272,268 178,270Z",
  ND: "M295,28 L385,25 388,72 295,75Z",
  SD: "M295,75 L388,72 390,118 295,122Z",
  NE: "M295,122 L390,118 395,165 295,170Z",
  KS: "M295,170 L395,165 398,218 295,222Z",
  OK: "M295,222 L365,220 398,218 400,242 350,245 348,268 295,270Z",
  TX: "M268,268 L348,268 350,245 400,242 408,280 395,345 355,375 310,365 275,335 260,300Z",
  MN: "M390,25 L445,28 450,40 462,42 460,110 390,112Z",
  IA: "M395,112 L460,110 465,162 395,165Z",
  MO: "M395,165 L465,162 475,172 478,225 440,228 395,218Z",
  AR: "M440,228 L478,225 482,275 442,278Z",
  LA: "M442,278 L482,275 488,310 478,325 455,328 448,310Z",
  WI: "M450,40 L462,42 505,48 500,110 460,112Z",
  IL: "M478,112 L500,110 505,118 510,175 498,195 478,195Z",
  MI: "M495,32 L510,28 535,55 538,62 535,95 530,120 512,125 505,118 500,110 505,48Z",
  IN: "M510,118 L530,120 532,185 510,188Z",
  OH: "M535,108 L575,100 580,135 572,168 540,172 532,145Z",
  KY: "M505,188 L572,168 580,185 575,198 518,210Z",
  TN: "M505,210 L575,198 588,210 585,230 510,232Z",
  MS: "M455,245 L488,242 495,310 462,315Z",
  AL: "M488,242 L525,238 530,305 495,310Z",
  GA: "M525,238 L568,232 575,280 560,305 530,305Z",
  FL: "M530,305 L560,305 575,280 582,295 580,330 568,370 548,395 535,370 528,338Z",
  SC: "M568,218 L610,202 618,225 585,245 568,232Z",
  NC: "M575,195 L638,178 645,198 618,225 610,202 568,218 585,210Z",
  VA: "M575,165 L638,155 645,178 638,178 575,195Z",
  WV: "M572,138 L590,132 598,158 580,168Z",
  PA: "M580,90 L645,82 650,118 585,128Z",
  NY: "M595,40 L660,35 670,52 668,90 650,95 630,88 610,82Z",
  VT: "M655,28 L668,25 672,52 660,55Z",
  NH: "M668,25 L682,22 680,52 672,52Z",
  ME: "M682,8 L710,12 705,52 680,52Z",
  MA: "M670,60 L700,55 705,72 672,75Z",
  CT: "M660,72 L672,70 675,85 662,88Z",
  RI: "M675,68 L685,66 686,78 676,80Z",
  NJ: "M650,95 L662,92 665,125 650,122Z",
  DE: "M650,118 L660,115 662,132 652,130Z",
  MD: "M598,130 L650,118 652,138 600,148Z",
};

// Every state assigned to a region
const REGION_STATES: Record<string, string[]> = {
  "Pacific NW": ["WA", "OR", "ID"],
  "Southwest": ["CA", "NV", "AZ", "NM", "UT"],
  "Mountain West": ["MT", "WY", "CO", "ND", "SD", "NE"],
  "South Central": ["TX", "OK", "KS", "AR", "LA", "MO"],
  "Midwest": ["MN", "IA", "WI", "IL", "IN", "MI", "OH"],
  "Southeast": ["KY", "TN", "MS", "AL", "GA", "FL", "SC", "NC", "VA", "WV"],
  "Northeast": ["PA", "NY", "VT", "NH", "ME", "MA", "CT", "RI", "NJ", "DE", "MD"],
};

const STATE_TO_REGION: Record<string, string> = {};
for (const [region, states] of Object.entries(REGION_STATES)) {
  for (const st of states) STATE_TO_REGION[st] = region;
}

export default function RegionMapThumb({ region, selected }: { region: string; selected: boolean }) {
  const highlightColor = selected ? "rgba(0,0,0,0.6)" : "#EA580C";
  const bgColor = selected ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)";
  const strokeColor = selected ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)";
  const regionStates = REGION_STATES[region] || [];

  // Combine all state paths in this region into one <path> element
  const combinedRegionPath = regionStates
    .map((st) => STATES[st])
    .filter(Boolean)
    .join(" ");

  return (
    <svg viewBox="40 0 690 410" style={{ width: "100%", height: "auto", maxHeight: 70 }}>
      {/* Background: all states as dim outlines */}
      {Object.entries(STATES).map(([state, path]) => (
        <path
          key={state}
          d={path}
          fill={bgColor}
          stroke={strokeColor}
          strokeWidth="1"
          strokeLinejoin="round"
        />
      ))}
      {/* Highlighted region: single combined path with thick stroke to fill gaps */}
      {combinedRegionPath && (
        <path
          d={combinedRegionPath}
          fill={highlightColor}
          stroke={highlightColor}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
