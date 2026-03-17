"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { trips } from "@/lib/trips";
import FadeIn from "./FadeIn";

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Collage of trip images as background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-0 opacity-40">
          {trips.slice(0, 6).map((trip) => (
            <div key={trip.year} className="relative overflow-hidden">
              <Image
                src={trip.heroImage}
                alt=""
                fill
                sizes="34vw"
                className="object-cover"
                priority
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-bg/80 via-bg/60 to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/40 via-transparent to-bg/40" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-16 h-px bg-gold mb-8 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs tracking-[0.3em] uppercase text-gold mb-6 font-body"
        >
          An Annual Golf Odyssey
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-7xl md:text-[9rem] lg:text-[11rem] font-bold text-white leading-[0.85] tracking-tight"
        >
          Tour
          <br />
          <span className="italic font-light">de Fore</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-16 h-px bg-gold mt-8 mb-8 origin-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-text-muted text-sm md:text-base max-w-lg leading-relaxed font-body"
        >
          Every summer, a group of friends trades the everyday for the fairway.
          Six years. Six states. One tradition that refuses to die.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-transparent via-gold/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}

function ManifestoSection() {
  return (
    <section className="py-24 md:py-40">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-8 h-px bg-gold-dim" />
            <span className="text-xs tracking-[0.3em] uppercase text-text-dim font-body">
              The Ethos
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-text leading-[1] mb-12">
            It started with a tee time.
            <br />
            <span className="italic font-light text-text-muted">
              It became something more.
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="space-y-6 text-text-muted text-lg md:text-xl leading-relaxed font-body max-w-3xl">
            <p>
              Tour de Fore is a yearly pilgrimage &mdash; a few days carved out of the calendar
              where the group chat becomes real life. Different city every year. Different courses.
              Same crew showing up to hack their way through 36 holes a day with zero shame and
              maximum commitment.
            </p>
            <p>
              From the red rocks of St. George to the bluffs of Whistling Straits, the trip has
              grown from 18 guys into a full-blown operation: private chefs, fishing charters,
              ATV runs, and enough bogeys to fill a spreadsheet nobody asked for.
            </p>
            <p className="text-gold italic font-display text-2xl md:text-3xl pt-4">
              It&rsquo;s not about the handicap. It&rsquo;s about the people you play with.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { value: "6", label: "Years" },
    { value: "36+", label: "Rounds Played" },
    { value: "18", label: "Courses" },
    { value: "6", label: "States" },
  ];

  return (
    <section className="border-y border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <span className="font-display text-5xl md:text-6xl font-bold text-gold block">
                  {stat.value}
                </span>
                <span className="text-xs tracking-[0.2em] uppercase text-text-dim mt-2 block font-body">
                  {stat.label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function DestinationMap() {
  const locations = trips.map((t) => ({
    year: t.year,
    city: t.location,
    state: t.state,
    slug: t.slug,
    upcoming: t.upcoming,
  }));

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-8 h-px bg-gold-dim" />
            <span className="text-xs tracking-[0.3em] uppercase text-text-dim font-body">
              Where We&rsquo;ve Been
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-text mb-16 leading-[0.95]">
            The
            <br />
            <span className="italic font-light text-text-muted">Destinations</span>
          </h2>
        </FadeIn>

        {/* Destination list */}
        <div className="space-y-0">
          {locations.map((loc, i) => (
            <FadeIn key={loc.year} delay={0.15 + i * 0.06}>
              <Link
                href={`/trip/${loc.slug}`}
                className="group border-t border-border last:border-b flex items-center justify-between py-6 md:py-8 transition-colors hover:bg-bg-elevated/50 -mx-4 px-4 md:-mx-8 md:px-8"
              >
                <div className="flex items-baseline gap-4 md:gap-8">
                  <span className="font-display text-4xl md:text-6xl font-bold text-text group-hover:text-gold transition-colors leading-none">
                    {loc.year}
                  </span>
                  <div>
                    <span className="font-display text-xl md:text-2xl text-text-muted group-hover:text-text transition-colors">
                      {loc.city}, {loc.state}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {loc.upcoming && (
                    <span className="hidden md:flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-accent-light font-body">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-light animate-pulse" />
                      Upcoming
                    </span>
                  )}
                  {!loc.upcoming && (
                    <span className="hidden md:block text-xs tracking-[0.2em] uppercase text-text-dim font-body">
                      Past
                    </span>
                  )}
                  <svg
                    className="w-5 h-5 text-text-dim group-hover:text-gold group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function UpcomingPreview() {
  const trip = trips[0];

  return (
    <section className="py-24 md:py-32 bg-bg-elevated">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-accent-light animate-pulse" />
            <span className="text-xs tracking-[0.3em] uppercase text-accent-light font-body">
              Up Next
            </span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-6xl md:text-8xl font-bold text-text leading-[0.9] mb-2">
                {trip.year}
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h3 className="font-display text-3xl md:text-4xl font-light text-text-muted italic mb-4">
                {trip.location}, {trip.state}
              </h3>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-sm text-text-dim tracking-widest uppercase font-body mb-6">
                {trip.dates}
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p className="font-display text-xl text-text-muted italic mb-8">
                &ldquo;{trip.tagline}&rdquo;
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="space-y-2 mb-8">
                {trip.courses.map((c) => (
                  <div key={c.name} className="flex items-center gap-3">
                    <span className="text-accent text-sm">&#9971;</span>
                    <span className="text-text font-body text-sm">{c.name}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.35}>
              <Link
                href={`/trip/${trip.slug}`}
                className="inline-flex items-center gap-3 text-sm tracking-widest uppercase text-gold hover:text-gold-dim transition-colors font-body group"
              >
                View Full Trip Details
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </FadeIn>
          </div>

          {/* Lodge preview */}
          <FadeIn delay={0.2} direction="right">
            <div className="grid grid-cols-2 gap-3">
              {trip.photoSections[0]?.images.slice(0, 4).map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden rounded-sm"
                >
                  <Image
                    src={src}
                    alt={`Lodge preview ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-text-dim tracking-widest uppercase font-body mt-3 text-center">
              The Lodge &mdash; {trip.lodgingAddress}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function PastTripsGrid() {
  const pastTrips = trips.filter((t) => !t.upcoming);

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-8 h-px bg-gold-dim" />
            <span className="text-xs tracking-[0.3em] uppercase text-text-dim font-body">
              The Archives
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-text mb-16 leading-[0.95]">
            Past
            <br />
            <span className="italic font-light text-text-muted">Expeditions</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastTrips.map((trip, i) => (
            <FadeIn key={trip.year} delay={0.1 + i * 0.06}>
              <Link href={`/trip/${trip.slug}`} className="block group">
                <div className="relative overflow-hidden rounded-sm aspect-[3/2] mb-4">
                  <Image
                    src={trip.heroImage}
                    alt={`${trip.year} - ${trip.location}, ${trip.state}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="font-display text-5xl font-bold text-white/90 leading-none">
                      {trip.year}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 bg-black/30 px-2 py-1 rounded-sm font-body">
                      Past
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-gold transition-all duration-700" />
                </div>
                <h3 className="font-display text-xl text-text group-hover:text-gold transition-colors">
                  {trip.location}, {trip.state}
                </h3>
                <p className="text-text-dim text-sm font-body mt-1">{trip.dates}</p>
                <p className="font-display text-text-muted italic text-sm mt-1">
                  &ldquo;{trip.tagline}&rdquo;
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomeClient() {
  return (
    <main>
      <HeroSection />
      <ManifestoSection />
      <StatsBar />
      <UpcomingPreview />
      <DestinationMap />
      <PastTripsGrid />
    </main>
  );
}
