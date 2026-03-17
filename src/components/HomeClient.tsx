"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef } from "react";
import { trips } from "@/lib/trips";
import FadeIn from "./FadeIn";

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Use the most dramatic hero image
  const heroTrip = trips[0];

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Single cinematic background image */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image
          src={heroTrip.heroImage}
          alt="Tour de Fore"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-ember font-body font-medium mb-8"
        >
          An Annual Golf Odyssey
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="font-display text-[5rem] md:text-[10rem] lg:text-[13rem] font-bold text-white leading-[0.82] tracking-tight"
        >
          Tour
          <br />
          <span className="italic font-light text-white/90">de Fore</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-20 h-px bg-gradient-to-r from-transparent via-ember to-transparent mt-10 mb-10 origin-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-white/50 text-sm md:text-base max-w-md leading-relaxed font-body font-light tracking-wide"
        >
          Every summer, a crew trades the everyday for the fairway.
          <br className="hidden md:block" />
          Six years. Six states. One tradition.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-white/20 font-body">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-ember/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

function ManifestoSection() {
  return (
    <section className="py-32 md:py-48">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex items-center gap-5 mb-16">
            <div className="w-12 h-px bg-ember-dim" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-ember-dim font-body font-medium">
              The Ethos
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-text leading-[0.95] mb-16">
            It started with
            <br />
            a tee time.
            <br />
            <span className="italic font-light text-text-muted">
              It became something more.
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="space-y-8 text-text-muted text-lg md:text-xl leading-[1.8] font-body font-light max-w-3xl">
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
          </div>
        </FadeIn>

        <FadeIn delay={0.35}>
          <div className="mt-16 pl-8 border-l border-ember/30">
            <p className="text-gold font-display text-3xl md:text-4xl lg:text-5xl italic leading-[1.2] font-light">
              It&rsquo;s not about the handicap.
              <br />
              It&rsquo;s about the people you play with.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="text-center py-4"
    >
      <span className="font-display text-6xl md:text-8xl font-bold text-gold block leading-none">
        {value}
      </span>
      <span className="text-[10px] tracking-[0.35em] uppercase text-text-dim mt-4 block font-body font-medium">
        {label}
      </span>
    </motion.div>
  );
}

function StatsBar() {
  const stats = [
    { value: "6", label: "Years Running" },
    { value: "36+", label: "Rounds Played" },
    { value: "18", label: "Courses Conquered" },
    { value: "6", label: "States Explored" },
  ];

  return (
    <section className="border-y border-border/50 texture-lines">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} {...stat} delay={i * 0.12} />
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
    heroImage: t.heroImage,
  }));

  return (
    <section className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex items-center gap-5 mb-4">
            <div className="w-12 h-px bg-ember-dim" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-ember-dim font-body font-medium">
              Where We&rsquo;ve Been
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-6xl md:text-8xl font-bold text-text mb-20 leading-[0.9]">
            The
            <br />
            <span className="italic font-light text-text-muted">Destinations</span>
          </h2>
        </FadeIn>

        <div className="space-y-0">
          {locations.map((loc, i) => (
            <FadeIn key={loc.year} delay={0.15 + i * 0.06}>
              <Link
                href={`/trip/${loc.slug}`}
                className="group border-t border-border/60 last:border-b flex items-center justify-between py-8 md:py-10 transition-all duration-500 hover:bg-bg-elevated/80 -mx-4 px-4 md:-mx-8 md:px-8"
              >
                <div className="flex items-baseline gap-6 md:gap-10">
                  <span className="font-display text-5xl md:text-8xl font-bold text-text-dim group-hover:text-ember transition-colors duration-500 leading-none tabular-nums">
                    {loc.year}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-display text-xl md:text-3xl text-text-muted group-hover:text-text transition-colors duration-500">
                      {loc.city}
                    </span>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-text-dim font-body mt-1 hidden md:block">
                      {loc.state}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  {loc.upcoming && (
                    <span className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-accent-light font-body font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-light animate-pulse" />
                      Upcoming
                    </span>
                  )}
                  <svg
                    className="w-5 h-5 text-text-dim/50 group-hover:text-ember group-hover:translate-x-2 transition-all duration-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
    <section className="py-32 md:py-48 bg-bg-elevated relative overflow-hidden">
      {/* Subtle background year watermark */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 font-display text-[20rem] md:text-[35rem] font-bold text-white/[0.015] leading-none select-none pointer-events-none">
        {trip.year}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <FadeIn>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent-light animate-pulse" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-accent-light font-body font-medium">
              Up Next
            </span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-8xl md:text-[10rem] font-bold text-text leading-[0.85] mb-4">
                {trip.year}
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h3 className="font-display text-3xl md:text-5xl font-light text-text-muted italic mb-6">
                {trip.location}, {trip.state}
              </h3>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-[10px] text-text-dim tracking-[0.4em] uppercase font-body font-medium mb-8">
                {trip.dates}
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p className="font-display text-2xl text-text-muted italic mb-10 leading-relaxed">
                &ldquo;{trip.tagline}&rdquo;
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="space-y-3 mb-12">
                {trip.courses.map((c) => (
                  <div key={c.name} className="flex items-center gap-4">
                    <div className="w-1 h-1 rounded-full bg-ember" />
                    <span className="text-text font-body text-sm font-light tracking-wide">{c.name}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.35}>
              <Link
                href={`/trip/${trip.slug}`}
                className="inline-flex items-center gap-4 text-[11px] tracking-[0.3em] uppercase text-ember hover:text-gold transition-colors duration-300 font-body font-medium group"
              >
                View Full Trip Details
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

          {/* Lodge preview */}
          <FadeIn delay={0.2} direction="right">
            <div className="grid grid-cols-2 gap-3">
              {trip.photoSections[0]?.images.slice(0, 4).map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden rounded-sm group"
                >
                  <Image
                    src={src}
                    alt={`Lodge preview ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
              ))}
            </div>
            <p className="text-[10px] text-text-dim tracking-[0.3em] uppercase font-body mt-4 text-center">
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
    <section className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex items-center gap-5 mb-4">
            <div className="w-12 h-px bg-ember-dim" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-ember-dim font-body font-medium">
              The Archives
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-6xl md:text-8xl font-bold text-text mb-20 leading-[0.9]">
            Past
            <br />
            <span className="italic font-light text-text-muted">Expeditions</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
          {pastTrips.map((trip, i) => (
            <FadeIn key={trip.year} delay={0.1 + i * 0.08}>
              <Link href={`/trip/${trip.slug}`} className="block group">
                <div className="relative overflow-hidden rounded-sm aspect-[3/2] mb-6">
                  <Image
                    src={trip.heroImage}
                    alt={`${trip.year} - ${trip.location}, ${trip.state}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="font-display text-7xl font-bold text-white/80 leading-none group-hover:text-ember transition-colors duration-500">
                      {trip.year}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-ember to-gold transition-all duration-700" />
                </div>
                <h3 className="font-display text-2xl text-text group-hover:text-ember transition-colors duration-300">
                  {trip.location}, {trip.state}
                </h3>
                <p className="text-text-dim text-[11px] font-body mt-2 tracking-[0.2em] uppercase">{trip.dates}</p>
                <p className="font-display text-text-muted italic text-base mt-2 leading-relaxed">
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
