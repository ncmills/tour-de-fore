"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { trips } from "@/lib/trips";
import FadeIn from "./FadeIn";
import { LogoFull } from "./Logo";

const SQ = "https://images.squarespace-cdn.com/content/v1/62cb87cca6b36f353a2575d5";

const heroImages = [
  `${SQ}/d0910eb3-ce7f-4395-8e75-06414a70a916/DSC01441.JPG`,
  `${SQ}/ff8d47e6-8753-45f8-b511-812d49db7bcd/IMG_0729.jpeg`,
  `${SQ}/40030cd0-2783-4cca-ab1b-ec4b3d674471/a.jpeg`,
  `${SQ}/668ee548-a6f4-4b37-9d7a-18d5fb6a54e3/IMG_0519.jpeg`,
  `${SQ}/0fba83c5-18c2-4f97-9767-cc2571e783cf/IMG_1750.jpeg`,
  `${SQ}/3eba1084-f559-4627-ba67-0764b1858572/IMG_7541.jpeg`,
];

/* ── 1. Hero ── */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const heroImage = heroImages[3];

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src={heroImage}
          alt="Tour de Fore"
          fill
          sizes="100vw"
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0f0f0f]" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <LogoFull className="w-[280px] md:w-[420px] lg:w-[520px] mx-auto drop-shadow-2xl" />
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-[#e85d26] to-transparent mt-10 mb-8 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="font-accent text-xl md:text-2xl lg:text-3xl italic text-white/60 max-w-2xl leading-relaxed"
        >
          hell is empty and all the devils are here
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ── 2. Next Up Banner ── */
function NextUpBanner() {
  const trip = trips[0];
  const photos = trip.photoSections[0]?.images || [];
  const heroPhoto = photos[0] || trip.heroImage;

  return (
    <section className="py-12 md:py-20 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Info */}
          <div>
            <FadeIn>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#e85d26] animate-pulse" />
                <span className="text-[11px] tracking-[0.15em] uppercase text-[#e85d26] font-body font-medium">
                  Next Up
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="font-display text-[5rem] md:text-[8rem] lg:text-[10rem] text-[#c9a84c] leading-[0.9] mb-4">
                {trip.year}
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h3 className="font-body text-xl md:text-2xl text-text font-medium mb-2">
                {trip.location}, {trip.state}
              </h3>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-[#8a8580] font-body text-sm mb-6">
                {trip.dates}
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="text-[#5a5550] font-body text-sm mb-8">
                {trip.courses.length} courses &middot; {trip.schedule.length} days &middot; 16 guys
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Link
                href={`/trip/${trip.slug}`}
                className="btn-primary inline-flex items-center gap-3 group"
              >
                GET THE DETAILS
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </FadeIn>
          </div>

          {/* Right: Photo */}
          <FadeIn delay={0.2} direction="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={heroPhoto}
                alt={`${trip.year} - ${trip.location}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ── 3. The Timeline ── */
function Timeline() {
  const allTrips = [...trips].reverse(); // chronological

  return (
    <section id="destinations" className="py-12 md:py-20 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <h2 className="font-display text-4xl md:text-6xl text-text mb-10">
            THE TIMELINE
          </h2>
        </FadeIn>

        {/* Desktop: horizontal scroll row */}
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-3 lg:grid-cols-6 md:overflow-visible md:pb-0">
          {allTrips.map((trip, i) => (
            <FadeIn key={trip.year} delay={0.05 + i * 0.05} className="snap-start">
              <Link href={`/trip/${trip.slug}`} className="block group flex-shrink-0 w-[220px] md:w-auto">
                <div
                  className={`relative aspect-[3/4] overflow-hidden rounded-lg ${
                    trip.upcoming
                      ? "ring-2 ring-[#e85d26] ring-offset-2 ring-offset-[#0f0f0f]"
                      : ""
                  }`}
                >
                  <Image
                    src={trip.heroImage}
                    alt={`${trip.year} - ${trip.location}`}
                    fill
                    sizes="(max-width: 768px) 220px, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="font-display text-4xl md:text-5xl text-[#c9a84c] leading-none block group-hover:text-[#e85d26] transition-colors duration-300">
                      {trip.year}
                    </span>
                    <span className="text-[11px] text-white/60 font-body mt-1 block">
                      {trip.location}
                    </span>
                  </div>
                  {trip.upcoming && (
                    <div className="absolute top-3 right-3">
                      <span className="w-2 h-2 rounded-full bg-[#e85d26] animate-pulse block" />
                    </div>
                  )}
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 4. The Manifesto ── */
function ManifestoSection() {
  const bgImage = heroImages[0]; // group shot

  return (
    <section className="relative py-12 md:py-20 overflow-hidden">
      {/* Full-bleed background */}
      <div className="absolute inset-0">
        <Image
          src={bgImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="text-text text-base md:text-lg leading-[2] font-body font-light max-w-3xl">
            <p>
              Every summer we pick a town nobody&rsquo;s heard of, rent the biggest house we can find,
              and play <span className="text-[#e85d26] font-medium">108 holes in three days</span>.
              Six rounds. Back to back to back. An absolutely unreasonable amount of golf.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-10 pl-6 md:pl-8 border-l-2 border-[#e85d26]/40">
            <p className="font-accent text-2xl md:text-4xl italic text-white/70 leading-[1.3]">
              It&rsquo;s not about the handicap.
              <br />
              It&rsquo;s about who you&rsquo;re out there with.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── 5. Plan Your Own CTA ── */
function PlanCTA() {
  return (
    <section className="py-12 md:py-20 bg-[#1a1a1a]">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <FadeIn>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-text mb-4">
            PLAN YOUR OWN TRIP
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-[#8a8580] font-body text-base md:text-lg mb-8 max-w-lg mx-auto">
            AI-powered itinerary for your crew. Courses, lodging, dining, budget — the whole game plan.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <Link
            href="/plan"
            className="btn-primary inline-flex items-center gap-3 group px-10 py-4"
          >
            START PLANNING
            <svg
              className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

export default function HomeClient() {
  return (
    <main>
      <HeroSection />
      <NextUpBanner />
      <Timeline />
      <ManifestoSection />
      <PlanCTA />
    </main>
  );
}
