import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
      { protocol: "https", hostname: "erinhills.com" },
      { protocol: "https", hostname: "s7d9.scene7.com" },
      { protocol: "https", hostname: "golfthebull.com" },
      { protocol: "https", hostname: "juniperpreserve.com" },
      { protocol: "https", hostname: "playjuniper.com" },
      { protocol: "https", hostname: "widgi.com" },
      { protocol: "https", hostname: "tetherow.com" },
      { protocol: "https", hostname: "www.uclubkentucky.com" },
      { protocol: "https", hostname: "golfcoursegurus.com" },
      { protocol: "https", hostname: "golf-pass-brightspot.s3.amazonaws.com" },
      { protocol: "https", hostname: "cdn.greaterzion.com" },
      { protocol: "https", hostname: "sunriverres.wpenginepowered.com" },
      { protocol: "https", hostname: "bouldercanyongolf.com" },
    ],
  },
};

export default nextConfig;
