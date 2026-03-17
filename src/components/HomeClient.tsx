"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";
import { trips } from "@/lib/trips";
import FadeIn from "./FadeIn";
import Logo from "./Logo";
import USMap from "./USMap";

const SQ = "https://images.squarespace-cdn.com/content/v1/62cb87cca6b36f353a2575d5";

// Curated hero images — best group/golf/landscape shots from across all trips
const heroImages = [
  `${SQ}/d0910eb3-ce7f-4395-8e75-06414a70a916/DSC01441.JPG`,     // 2023 group
  `${SQ}/03de264c-9108-4366-8a98-daa0b63fa515/IMG_2259.jpeg`,    // 2025 hero
  `${SQ}/ff8d47e6-8753-45f8-b511-812d49db7bcd/IMG_0729.jpeg`,    // 2022 hero
  `${SQ}/40030cd0-2783-4cca-ab1b-ec4b3d674471/a.jpeg`,           // 2024 hero
  `${SQ}/668ee548-a6f4-4b37-9d7a-18d5fb6a54e3/IMG_0519.jpeg`,    // 2021 hero
  `${SQ}/0fba83c5-18c2-4f97-9767-cc2571e783cf/IMG_1750.jpeg`,    // 2022 golf
];

// Scrolling photo strip images — mix of the best from each year
const photoStripImages = [
  `${SQ}/382ad51c-10e2-4785-95eb-30449cb51ec7/IMG_2614.jpeg`,
  `${SQ}/c64adefd-fb38-4a79-bb9e-5b62c158af92/IMG_7841.jpeg`,
  `${SQ}/0fba83c5-18c2-4f97-9767-cc2571e783cf/IMG_1750.jpeg`,
  `${SQ}/69047b6b-5c54-4eac-8b67-736cf758c345/IMG_1736.jpeg`,
  `${SQ}/a560dd9a-d1e6-495c-87f9-a5892e234d21/IMG_2202.jpeg`,
  `${SQ}/781a6a3b-6cb4-4b79-b958-e3af20976225/EC5E9F54-04A6-4318-AAC3-ED50581CADB9.jpeg`,
  `${SQ}/3eba1084-f559-4627-ba67-0764b1858572/IMG_7541.jpeg`,
  `${SQ}/20b19d4c-0746-4f50-8c25-91c795c87e6f/IMG_1716.jpeg`,
  `${SQ}/d47ad341-f26b-4642-b8ea-2992d589a9bb/IMG_0507.jpeg`,
  `${SQ}/4bb37462-115b-46fb-934d-eb09882f3abd/IMG_1605.jpeg`,
  `${SQ}/8e2f1d09-48e3-401a-b1a1-e65627c37fe3/IMG_3459.jpeg`,
  `${SQ}/5b43f12a-0419-457d-a408-872f4fd26e8f/IMG_2621.jpeg`,
  `${SQ}/3ace7ab5-b502-48ac-9dff-5223b62dca4f/IMG_1597.jpeg`,
  `${SQ}/9a8233a5-d8e7-4898-acf3-2f22c09f4197/IMG_0807.JPG`,
  `${SQ}/02f1892e-2200-4caa-905d-ae4ebe3f2380/IMG_1695.jpeg`,
  `${SQ}/aafbcb8a-2e77-4f53-9944-6a45e267788a/IMG_3492.jpeg`,
];

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Rotating background images */}
      <motion.div className="absolute inset-0" style={{ y }}>
        {heroImages.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: i === currentImage ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover scale-105"
              priority={i === 0}
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Logo className="w-16 h-16 md:w-20 md:h-20 text-ember mb-6 mx-auto" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-display text-[4.5rem] md:text-[9rem] lg:text-[12rem] font-bold text-white leading-[0.82] tracking-tight"
        >
          Tour
          <br />
          <span className="italic font-light text-white/90">de Fore</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-ember to-transparent mt-8 mb-6 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="font-display text-xl md:text-2xl lg:text-3xl italic text-white/60 max-w-2xl leading-relaxed font-light"
        >
          Hell is empty, and all the devils are here.
        </motion.p>

        {/* Image indicator dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex gap-2 mt-10"
        >
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                i === currentImage
                  ? "bg-ember w-6"
                  : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-white/20 font-body">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-ember/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

// Continuous scrolling photo strip
function PhotoStrip() {
  return (
    <section className="py-16 overflow-hidden border-y border-border/30">
      <div className="relative">
        <motion.div
          className="flex gap-4"
          animate={{ x: [0, -(photoStripImages.length * 280)] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {[...photoStripImages, ...photoStripImages].map((src, i) => (
            <div
              key={i}
              className="relative w-[260px] h-[180px] flex-shrink-0 overflow-hidden rounded-sm group"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="260px"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
            </div>
          ))}
        </motion.div>
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}

function ManifestoSection() {
  return (
    <section className="py-24 md:py-36">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex items-center gap-5 mb-12">
            <div className="w-12 h-px bg-ember-dim" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-ember-dim font-body font-medium">
              The Ethos
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-text leading-[0.95] mb-12">
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
          <div className="space-y-6 text-text-muted text-lg md:text-xl leading-[1.8] font-body font-light max-w-3xl">
            <p>
              Tour de Fore is a yearly pilgrimage &mdash; a few days carved out of the calendar
              where the group chat becomes real life. Different city every year. Different courses.
              Same crew showing up to hack their way through 36 holes a day with zero shame and
              maximum commitment.
            </p>
            <p>
              Every year we pick a small town none of us have ever been to &mdash; and probably
              won&rsquo;t ever go back to. For one week, we descend on some unsuspecting corner
              of America like a 16-man traveling circus. By the time we leave, every bartender
              knows our names, every starter has a story, and we&rsquo;ve played
              <span className="text-ember font-medium"> 108 holes in three days</span>.
              That&rsquo;s six rounds. Back to back to back. An absolutely
              unreasonable amount of golf &mdash; and we wouldn&rsquo;t have it any other way.
            </p>
            <p>
              From the red rocks of St. George to the bluffs of Whistling Straits, the trip has
              grown from 18 guys into a full-blown operation: private chefs, fishing charters,
              ATV runs, and enough bogeys to fill a spreadsheet nobody asked for.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.35}>
          <div className="mt-12 pl-6 md:pl-8 border-l-2 border-ember/40">
            <p className="text-gold font-display text-2xl md:text-4xl italic leading-[1.3] font-light">
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
      className="text-center py-4 group"
    >
      <motion.span
        className="font-display text-5xl md:text-7xl font-bold text-gold block leading-none group-hover:text-ember transition-colors duration-500"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {value}
      </motion.span>
      <span className="text-[10px] tracking-[0.35em] uppercase text-text-dim mt-3 block font-body font-medium">
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
    <section className="border-y border-border/40 texture-lines">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} {...stat} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DestinationMap() {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const locations = trips.map((t) => ({
    year: t.year,
    city: t.location,
    state: t.state,
    slug: t.slug,
    upcoming: t.upcoming,
    heroImage: t.heroImage,
  }));

  return (
    <section className="py-24 md:py-36">
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
          <h2 className="font-display text-5xl md:text-7xl font-bold text-text mb-16 leading-[0.9]">
            The
            <br />
            <span className="italic font-light text-text-muted">Destinations</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* List */}
          <div className="space-y-0">
            {locations.map((loc, i) => (
              <FadeIn key={loc.year} delay={0.15 + i * 0.06}>
                <Link
                  href={`/trip/${loc.slug}`}
                  className="group border-t border-border/50 last:border-b flex items-center justify-between py-6 md:py-8 transition-all duration-500 hover:bg-bg-elevated/80 -mx-4 px-4 md:-mx-6 md:px-6"
                  onMouseEnter={() => setHoveredYear(loc.year)}
                  onMouseLeave={() => setHoveredYear(null)}
                >
                  <div className="flex items-baseline gap-5 md:gap-8">
                    <span className="font-display text-4xl md:text-6xl font-bold text-text-dim group-hover:text-ember transition-colors duration-500 leading-none tabular-nums">
                      {loc.year}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-display text-lg md:text-2xl text-text-muted group-hover:text-text transition-colors duration-500">
                        {loc.city}
                      </span>
                      <span className="text-[10px] tracking-[0.3em] uppercase text-text-dim font-body mt-0.5 hidden md:block">
                        {loc.state}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {loc.upcoming && (
                      <span className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-accent-light font-body font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-light animate-pulse" />
                        Upcoming
                      </span>
                    )}
                    <motion.svg
                      className="w-5 h-5 text-text-dim/30 group-hover:text-ember transition-colors duration-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ x: 4 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          {/* Hover preview image - desktop only */}
          <div className="hidden lg:block relative">
            <div className="sticky top-32">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-bg-card">
                <AnimatePresence mode="wait">
                  {hoveredYear && (
                    <motion.div
                      key={hoveredYear}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={locations.find((l) => l.year === hoveredYear)?.heroImage || ""}
                        alt=""
                        fill
                        sizes="400px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="font-display text-4xl font-bold text-white">
                          {hoveredYear}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {!hoveredYear && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-text-dim text-sm font-body italic">Hover a destination</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UpcomingPreview() {
  const trip = trips[0];
  const [activePhoto, setActivePhoto] = useState(0);
  const photos = trip.photoSections[0]?.images || [];

  // Auto-rotate lodge photos
  useEffect(() => {
    if (photos.length === 0) return;
    const interval = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <section className="py-24 md:py-36 bg-bg-elevated relative overflow-hidden">
      {/* Background year watermark */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 font-display text-[16rem] md:text-[30rem] font-bold text-white/[0.015] leading-none select-none pointer-events-none">
        {trip.year}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-accent-light animate-pulse" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-accent-light font-body font-medium">
              Up Next
            </span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-7xl md:text-9xl font-bold text-text leading-[0.85] mb-3">
                {trip.year}
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h3 className="font-display text-3xl md:text-4xl font-light text-text-muted italic mb-4">
                {trip.location}, {trip.state}
              </h3>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-[10px] text-text-dim tracking-[0.4em] uppercase font-body font-medium mb-6">
                {trip.dates}
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p className="font-display text-xl text-text-muted italic mb-8 leading-relaxed">
                &ldquo;{trip.tagline}&rdquo;
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="space-y-3 mb-10">
                {trip.courses.map((c, i) => (
                  <motion.div
                    key={c.name}
                    className="flex items-center gap-4 group cursor-default"
                    whileHover={{ x: 8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-ember group-hover:bg-gold transition-colors" />
                    <span className="text-text font-body text-sm font-light tracking-wide group-hover:text-ember transition-colors duration-300">
                      {c.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.35}>
              <Link
                href={`/trip/${trip.slug}`}
                className="inline-flex items-center gap-4 text-[11px] tracking-[0.3em] uppercase font-body font-medium group"
              >
                <motion.span
                  className="text-ember group-hover:text-gold transition-colors duration-300"
                  whileHover={{ letterSpacing: "0.35em" }}
                >
                  View Full Trip Details
                </motion.span>
                <svg
                  className="w-4 h-4 text-ember group-hover:text-gold group-hover:translate-x-2 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </FadeIn>
          </div>

          {/* Lodge preview - rotating */}
          <FadeIn delay={0.2} direction="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhoto}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  {photos[activePhoto] && (
                    <Image
                      src={photos[activePhoto]}
                      alt={`Lodge preview`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              {/* Photo dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-400 ${
                      i === activePhoto ? "bg-ember w-4" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-[10px] text-text-dim tracking-[0.3em] uppercase font-body mt-3 text-center">
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
    <section className="py-24 md:py-36">
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
          <h2 className="font-display text-5xl md:text-7xl font-bold text-text mb-16 leading-[0.9]">
            Past
            <br />
            <span className="italic font-light text-text-muted">Expeditions</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastTrips.map((trip, i) => (
            <FadeIn key={trip.year} delay={0.1 + i * 0.08}>
              <Link href={`/trip/${trip.slug}`} className="block group">
                <motion.div
                  className="relative overflow-hidden rounded-sm aspect-[3/2] mb-5"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Image
                    src={trip.heroImage}
                    alt={`${trip.year} - ${trip.location}, ${trip.state}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="font-display text-6xl font-bold text-white/80 leading-none group-hover:text-ember transition-colors duration-500">
                      {trip.year}
                    </span>
                  </div>
                  {/* Hover reveal border */}
                  <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-ember to-gold transition-all duration-700" />
                  {/* Corner accent on hover */}
                  <div className="absolute top-0 right-0 w-0 h-0 group-hover:w-12 group-hover:h-12 transition-all duration-500 overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-ember/20" />
                  </div>
                </motion.div>
                <h3 className="font-display text-xl text-text group-hover:text-ember transition-colors duration-300">
                  {trip.location}, {trip.state}
                </h3>
                <p className="text-text-dim text-[11px] font-body mt-1.5 tracking-[0.2em] uppercase">{trip.dates}</p>
                <p className="font-display text-text-muted italic text-sm mt-1.5 leading-relaxed">
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

// Interactive US Map section
function MapSection() {
  return (
    <section className="py-24 md:py-36 bg-bg-elevated">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex items-center gap-5 mb-4">
            <div className="w-12 h-px bg-ember-dim" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-ember-dim font-body font-medium">
              The Trail
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-text mb-4 leading-[0.9]">
            Across
            <br />
            <span className="italic font-light text-text-muted">America</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-text-muted text-base font-body font-light max-w-lg mb-12 leading-relaxed">
            Six years, six states, one crew leaving a trail of divots and bar tabs
            from coast to coast. Hover to explore.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <USMap />
        </FadeIn>
      </div>
    </section>
  );
}

// Motto / closing banner
function MottoBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-28 border-t border-border/30 relative overflow-hidden">
      <div className="absolute inset-0 texture-lines" />
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <Logo className="w-10 h-10 text-ember/40 mx-auto mb-6" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display text-3xl md:text-5xl lg:text-6xl italic text-text-muted font-light leading-[1.2]"
        >
          &ldquo;Hell is empty, and all the devils are here.&rdquo;
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-16 h-px bg-ember/40 mx-auto mt-8"
        />
      </div>
    </section>
  );
}

export default function HomeClient() {
  return (
    <main>
      <HeroSection />
      <PhotoStrip />
      <ManifestoSection />
      <StatsBar />
      <UpcomingPreview />
      <MapSection />
      <DestinationMap />
      <PastTripsGrid />
      <MottoBanner />
    </main>
  );
}
