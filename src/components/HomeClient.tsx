"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect, useMemo } from "react";
import { trips } from "@/lib/trips";
import FadeIn from "./FadeIn";
import Logo from "./Logo";
import USMap from "./USMap";

const SQ = "https://images.squarespace-cdn.com/content/v1/62cb87cca6b36f353a2575d5";

// Curated hero images — best landscape/group/golf shots
const heroImages = [
  `${SQ}/d0910eb3-ce7f-4395-8e75-06414a70a916/DSC01441.JPG`,     // 2023 - group shot
  `${SQ}/ff8d47e6-8753-45f8-b511-812d49db7bcd/IMG_0729.jpeg`,    // 2022 - course vista
  `${SQ}/40030cd0-2783-4cca-ab1b-ec4b3d674471/a.jpeg`,           // 2024 - Bend landscape
  `${SQ}/668ee548-a6f4-4b37-9d7a-18d5fb6a54e3/IMG_0519.jpeg`,    // 2021 - St George red rock
  `${SQ}/0fba83c5-18c2-4f97-9767-cc2571e783cf/IMG_1750.jpeg`,    // 2022 - crew on course
  `${SQ}/3eba1084-f559-4627-ba67-0764b1858572/IMG_7541.jpeg`,    // 2025 - golf action
];

// Scrolling photo strip — all action/people shots, no lodging screenshots
const photoStripImages = [
  `${SQ}/382ad51c-10e2-4785-95eb-30449cb51ec7/IMG_2614.jpeg`,    // 2023
  `${SQ}/c64adefd-fb38-4a79-bb9e-5b62c158af92/IMG_7841.jpeg`,    // 2023
  `${SQ}/0fba83c5-18c2-4f97-9767-cc2571e783cf/IMG_1750.jpeg`,    // 2022
  `${SQ}/69047b6b-5c54-4eac-8b67-736cf758c345/IMG_1736.jpeg`,    // 2022
  `${SQ}/a560dd9a-d1e6-495c-87f9-a5892e234d21/IMG_2202.jpeg`,    // 2021
  `${SQ}/3eba1084-f559-4627-ba67-0764b1858572/IMG_7541.jpeg`,    // 2025
  `${SQ}/20b19d4c-0746-4f50-8c25-91c795c87e6f/IMG_1716.jpeg`,    // 2022
  `${SQ}/d47ad341-f26b-4642-b8ea-2992d589a9bb/IMG_0507.jpeg`,    // 2021
  `${SQ}/4bb37462-115b-46fb-934d-eb09882f3abd/IMG_1605.jpeg`,    // 2022
  `${SQ}/8e2f1d09-48e3-401a-b1a1-e65627c37fe3/IMG_3459.jpeg`,    // 2021
  `${SQ}/5b43f12a-0419-457d-a408-872f4fd26e8f/IMG_2621.jpeg`,    // 2023
  `${SQ}/3ace7ab5-b502-48ac-9dff-5223b62dca4f/IMG_1597.jpeg`,    // 2022
  `${SQ}/9a8233a5-d8e7-4898-acf3-2f22c09f4197/IMG_0807.JPG`,     // 2021
  `${SQ}/02f1892e-2200-4caa-905d-ae4ebe3f2380/IMG_1695.jpeg`,    // 2022
  `${SQ}/aafbcb8a-2e77-4f53-9944-6a45e267788a/IMG_3492.jpeg`,    // 2021
  `${SQ}/ca56fbd1-0812-44cd-a55e-ba9ee3bf5876/IMG_7539.jpeg`,    // 2025
];

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Static hero — guy in foreground with sun behind (St. George 2021)
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-bg" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Logo className="w-16 h-16 md:w-20 md:h-20 text-ember mb-8 mx-auto" />
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
          className="w-24 h-px bg-gradient-to-r from-transparent via-ember to-transparent mt-10 mb-8 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="font-display text-xl md:text-2xl lg:text-3xl italic text-white/60 max-w-2xl leading-relaxed font-light"
        >
          Hell is empty, and all the devils are here.
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
          className="w-px h-8 bg-gradient-to-b from-ember/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

function PhotoStrip() {
  return (
    <section className="py-10 overflow-hidden border-y border-border/20">
      <div className="relative">
        <motion.div
          className="flex gap-3"
          animate={{ x: [0, -(photoStripImages.length * 276)] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {[...photoStripImages, ...photoStripImages].map((src, i) => (
            <div
              key={i}
              className="relative w-[260px] h-[170px] flex-shrink-0 overflow-hidden rounded-sm group"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="260px"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
            </div>
          ))}
        </motion.div>
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-bg to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-bg to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section className="py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
          <div>
            <FadeIn>
              <div className="flex items-center gap-5 mb-6">
                <div className="w-12 h-px bg-ember-dim" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-ember-dim font-body font-medium">
                  The Trail
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-5xl md:text-7xl font-bold text-text mb-8 leading-[0.9]">
                Across
                <br />
                <span className="italic font-light text-text-muted">America</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-text-muted text-lg font-body font-light leading-relaxed">
                Six states. Six small towns none of us had ever set foot in &mdash; and most
                will never see us coming again. Hover the map to explore every stop.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <USMap />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ManifestoSection() {
  return (
    <section className="py-28 md:py-44">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex items-center gap-5 mb-14">
            <div className="w-12 h-px bg-ember-dim" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-ember-dim font-body font-medium">
              The Ethos
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-text leading-[0.95] mb-14">
            One week a year,
            <br />
            <span className="italic font-light text-text-muted">
              the group chat becomes real life.
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="space-y-8 text-text-muted text-lg md:text-xl leading-[2.1] font-body font-light max-w-3xl">
            <p>
              Every summer we pick a town nobody&rsquo;s heard of, rent the biggest house we can find,
              and play <span className="text-ember font-medium">108 holes in three days</span>.
              Six rounds. Back to back to back. An absolutely unreasonable amount of golf.
            </p>
            <p>
              By the time we leave, every bartender knows our names, every starter has a story,
              and the local economy has been single-handedly stimulated by 16 guys who tip too
              much and putt too little.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.35}>
          <div className="mt-14 pl-6 md:pl-8 border-l-2 border-ember/40">
            <p className="text-gold font-display text-2xl md:text-4xl italic leading-[1.3] font-light">
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

function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="text-center py-6 group"
    >
      <motion.span
        className="font-display text-5xl md:text-7xl font-bold text-gold block leading-none group-hover:text-ember transition-colors duration-500"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {value}
      </motion.span>
      <span className="text-[10px] tracking-[0.35em] uppercase text-text-dim mt-4 block font-body font-medium">
        {label}
      </span>
    </motion.div>
  );
}

function StatsBar() {
  const stats = [
    { value: "6", label: "Years" },
    { value: "648", label: "Holes Played" },
    { value: "18", label: "Courses" },
    { value: "6", label: "States" },
  ];

  return (
    <section className="border-y border-border/30 texture-lines">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} {...stat} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}

function UpcomingPreview() {
  const trip = trips[0];
  const [activePhoto, setActivePhoto] = useState(0);
  const photos = trip.photoSections[0]?.images || [];

  useEffect(() => {
    if (photos.length === 0) return;
    const interval = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <section className="py-28 md:py-44 bg-bg-elevated relative overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 font-display text-[16rem] md:text-[30rem] font-bold text-white/[0.012] leading-none select-none pointer-events-none">
        {trip.year}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <FadeIn>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent-light animate-pulse" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-accent-light font-body font-medium">
              Next Expedition
            </span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-7xl md:text-9xl font-bold text-text leading-[0.85] mb-4">
                {trip.year}
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h3 className="font-display text-3xl md:text-4xl font-light text-text-muted italic mb-5">
                {trip.location}, {trip.state}
              </h3>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-[10px] text-text-dim tracking-[0.4em] uppercase font-body font-medium mb-8">
                {trip.dates}
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p className="font-display text-xl text-text-muted italic mb-10 leading-relaxed">
                &ldquo;{trip.tagline}&rdquo;
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="space-y-4 mb-12">
                {trip.courses.map((c) => (
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
                className="inline-flex items-center gap-4 text-[11px] tracking-[0.3em] uppercase font-body font-medium text-ember hover:text-gold transition-colors duration-300 group"
              >
                Full Details
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
                      alt="Lodge preview"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    className={`h-1 rounded-full transition-all duration-400 ${
                      i === activePhoto ? "bg-ember w-5" : "bg-white/30 w-1.5"
                    }`}
                  />
                ))}
              </div>
            </div>
            {trip.lodgingAddress && (
              <p className="text-[10px] text-text-dim tracking-[0.3em] uppercase font-body mt-4 text-center">
                {trip.lodgingAddress}
              </p>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function DestinationList() {
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
    <section className="py-28 md:py-44">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex items-center gap-5 mb-6">
            <div className="w-12 h-px bg-ember-dim" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-ember-dim font-body font-medium">
              Every Year
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-text mb-20 leading-[0.9]">
            All
            <br />
            <span className="italic font-light text-text-muted">Destinations</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
          <div className="space-y-0">
            {locations.map((loc, i) => (
              <FadeIn key={loc.year} delay={0.15 + i * 0.06}>
                <Link
                  href={`/trip/${loc.slug}`}
                  className="group border-t border-border/40 last:border-b flex items-center justify-between py-7 md:py-9 transition-all duration-500 hover:bg-bg-elevated/60 -mx-4 px-4 md:-mx-6 md:px-6 rounded-sm"
                  onMouseEnter={() => setHoveredYear(loc.year)}
                  onMouseLeave={() => setHoveredYear(null)}
                >
                  <div className="flex items-baseline gap-5 md:gap-8">
                    <span className="font-display text-4xl md:text-6xl font-bold text-text-dim group-hover:text-ember transition-colors duration-500 leading-none tabular-nums">
                      {loc.year}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-display text-lg md:text-2xl text-text-muted group-hover:text-text transition-colors duration-500">
                        {loc.city}
                      </span>
                      <span className="text-[10px] tracking-[0.3em] uppercase text-text-dim font-body hidden md:block">
                        {loc.state}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {loc.upcoming && (
                      <span className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-accent-light font-body font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-light animate-pulse" />
                        Next
                      </span>
                    )}
                    <svg
                      className="w-5 h-5 text-text-dim/20 group-hover:text-ember group-hover:translate-x-2 transition-all duration-500"
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

function PastTripsGrid() {
  const pastTrips = trips.filter((t) => !t.upcoming);

  return (
    <section className="py-28 md:py-44">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex items-center gap-5 mb-6">
            <div className="w-12 h-px bg-ember-dim" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-ember-dim font-body font-medium">
              The Archives
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-text mb-20 leading-[0.9]">
            Previous
            <br />
            <span className="italic font-light text-text-muted">Chapters</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastTrips.map((trip, i) => (
            <FadeIn key={trip.year} delay={0.1 + i * 0.08}>
              <Link href={`/trip/${trip.slug}`} className="block group">
                <motion.div
                  className="relative overflow-hidden rounded-sm aspect-[3/2] mb-6"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Image
                    src={trip.heroImage}
                    alt={`${trip.year} - ${trip.location}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="font-display text-6xl font-bold text-white/80 leading-none group-hover:text-ember transition-colors duration-500">
                      {trip.year}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-ember to-gold transition-all duration-700" />
                </motion.div>
                <h3 className="font-display text-xl text-text group-hover:text-ember transition-colors duration-300">
                  {trip.location}, {trip.state}
                </h3>
                <p className="text-text-dim text-[11px] font-body mt-2 tracking-[0.2em] uppercase">
                  {trip.dates}
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function MottoBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 border-t border-border/20 relative overflow-hidden">
      <div className="absolute inset-0 texture-lines" />
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <Logo className="w-10 h-10 text-ember/30 mx-auto mb-8" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display text-3xl md:text-5xl italic text-text-dim font-light leading-[1.3]"
        >
          See you on the first tee.
        </motion.p>
      </div>
    </section>
  );
}

export default function HomeClient() {
  return (
    <main>
      <HeroSection />
      <PhotoStrip />
      <MapSection />
      <ManifestoSection />
      <StatsBar />
      <UpcomingPreview />
      <DestinationList />
      <PastTripsGrid />
      <MottoBanner />
    </main>
  );
}
