import { NextRequest, NextResponse } from "next/server";
import { getSessionEmail } from "@/lib/auth";
import { getPlan } from "@/lib/kv";
import { allDestinations } from "@/data";
import type { Destination } from "@/data/types";

function findDestination(destId: string): Destination | undefined {
  return allDestinations.find((d) => d.id === destId);
}

export async function POST(req: NextRequest) {
  try {
    const email = await getSessionEmail();
    if (!email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { planId, destLevel } = await req.json();
    if (!planId || !destLevel) {
      return NextResponse.json({ error: "Missing planId or destLevel" }, { status: 400 });
    }

    const plan = await getPlan(planId);
    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    const rec = plan.destinations?.[destLevel as "budget" | "mid" | "premium"];
    if (!rec) {
      return NextResponse.json({ error: "Destination not found in plan" }, { status: 404 });
    }

    const dest = findDestination(rec.destinationId);
    if (!dest) {
      return NextResponse.json({ error: "Destination database entry not found" }, { status: 404 });
    }

    // Return all available alternatives from the database
    const alternatives = {
      courses: dest.courses.map((c) => ({
        name: c.name,
        tier: c.tier,
        greenFeeRange: c.greenFeeRange,
        googleRating: c.googleRating,
        highlight: c.highlight,
        hypeTag: c.hypeTag,
        style: c.style,
        walkable: c.walkable,
        driveMinutes: c.driveMinutes,
        imageUrl: c.imageUrl,
      })),
      lodging: dest.lodging.map((l) => ({
        type: l.type,
        sleeps: l.sleeps,
        nightlyRange: l.nightlyRange,
        amenities: l.amenities,
        areaDescription: l.areaDescription,
        avgRating: l.avgRating,
        bedsBreakdown: l.bedsBreakdown,
        notes: l.notes,
      })),
      dining: dest.dining.map((d) => ({
        name: d.name,
        style: d.style,
        priceRange: d.priceRange,
        capacity: d.capacity,
        highlight: d.highlight,
        googleRating: d.googleRating,
      })),
      bars: dest.bars.map((b) => ({
        name: b.name,
        vibe: b.vibe,
        highlight: b.highlight,
        lateNight: b.lateNight,
        walkableFromDowntown: b.walkableFromDowntown,
        googleRating: b.googleRating,
      })),
    };

    return NextResponse.json({ alternatives });
  } catch (err) {
    console.error("Swap error:", err);
    return NextResponse.json({ error: "Failed to load alternatives" }, { status: 500 });
  }
}
