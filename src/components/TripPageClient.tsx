"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Trip } from "@/lib/trips";
import FadeIn from "./FadeIn";
import Gallery from "./Gallery";
import Breadcrumbs from "./Breadcrumbs";

interface Props {
  trip: Trip;
  prevTrip: Trip | null;
  nextTrip: Trip | null;
}

function TripHero({ trip }: { trip: Trip }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image
          src={trip.heroImage}
          alt={`${trip.year} - ${trip.location}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
      </motion.div>

      {/* Year watermark */}
      <div className="absolute bottom-0 right-0 translate-y-[15%] translate-x-[5%] font-display text-[16rem] md:text-[26rem] lg:text-[34rem] font-bold text-white/[0.03] leading-none select-none pointer-events-none">
        {trip.year}
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-14 md:pb-20 px-6 md:px-12 max-w-7xl mx-auto"
      >
        <div className="mb-6">
          <Breadcrumbs
            crumbs={[
              { label: trip.upcoming ? "Upcoming" : "Past Trips", href: "/#destinations" },
              { label: `${trip.year} — ${trip.location}` },
            ]}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex items-center gap-3 mb-6"
        >
          {trip.upcoming ? (
            <>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-body font-medium">
                Upcoming Trip
              </span>
            </>
          ) : (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-white/60 font-body font-medium">
                Past Expedition
              </span>
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-3"
        >
          <span className="font-display text-[6rem] md:text-[11rem] lg:text-[15rem] font-bold text-white leading-[0.88] tracking-tight block">
            {trip.year}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-white/90 italic mb-4">
            {trip.location}, {trip.state}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center gap-5"
        >
          <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase font-body font-medium">
            {trip.dates}
          </span>
          <div className="w-5 h-px bg-white/30 hidden md:block" />
          <span className="font-display text-white/50 italic text-lg">
            &ldquo;{trip.tagline}&rdquo;
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ScheduleSection({ trip }: { trip: Trip }) {
  const typeIcons: Record<string, string> = {
    golf: "\u26f3",
    dining: "\ud83c\udf7d\ufe0f",
    activity: "\ud83c\udfaf",
    nightlife: "\ud83c\udf19",
  };

  return (
    <section className="py-24 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex items-center gap-5 mb-4">
            <div className="w-12 h-px bg-accent" />
            <span className="text-[11px] tracking-[0.15em] uppercase text-accent font-body font-medium">
              {trip.upcoming ? "The Game Plan" : "How It Went Down"}
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-text mb-16 leading-tight">
            The
            <br />
            <span className="italic font-light text-text-muted">Itinerary</span>
          </h2>
        </FadeIn>

        <div className="space-y-0">
          {trip.schedule.map((day, i) => (
            <FadeIn key={day.day} delay={0.15 + i * 0.08}>
              <motion.div
                className="border-t border-border py-10 md:py-12 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-5 md:gap-14"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <div className="font-display text-2xl text-text font-semibold">
                    {day.day}
                  </div>
                  <div className="text-[10px] text-text-dim font-body tracking-[0.3em] uppercase mt-1">
                    {day.date}
                  </div>
                </div>
                <div className="space-y-5">
                  {day.items.map((item, j) => (
                    <motion.div
                      key={j}
                      className="flex items-start gap-4 group"
                      whileHover={{ x: 6 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <span className="text-lg mt-[-2px]">{typeIcons[item.type]}</span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          <span className="text-[11px] text-accent tracking-[0.15em] font-body uppercase font-medium">
                            {item.time}
                          </span>
                          <span className="font-display text-lg text-text group-hover:text-accent transition-colors duration-300">
                            {item.activity}
                          </span>
                        </div>
                        {item.detail && (
                          <p className="text-sm text-text-dim font-body mt-1.5 font-light">
                            {item.detail}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </FadeIn>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}

function PhotoSections({ trip }: { trip: Trip }) {
  if (trip.photoSections.length === 0) return null;

  return (
    <>
      {trip.photoSections.map((section) => (
        <section key={section.label} className="py-24 md:py-40 bg-bg-warm">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <FadeIn>
              <div className="flex items-center gap-5 mb-4">
                <div className="w-12 h-px bg-accent" />
                <span className="text-[11px] tracking-[0.15em] uppercase text-accent font-body font-medium">
                  {trip.upcoming ? "Where We\u2019re Staying" : "Where We Stayed"}
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-5xl md:text-7xl font-bold text-text mb-4 leading-tight">
                {section.label.split(" ")[0]}
                <br />
                <span className="italic font-light text-text-muted">
                  {section.label.split(" ").slice(1).join(" ") || ""}
                </span>
              </h2>
            </FadeIn>
            {trip.lodgingAddress && (
              <FadeIn delay={0.15}>
                <p className="text-[10px] text-text-dim font-body mb-12 tracking-[0.3em] uppercase">
                  {trip.lodgingAddress}
                </p>
              </FadeIn>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {section.images.map((src, i) => (
                <FadeIn key={i} delay={0.15 + i * 0.05}>
                  <motion.div
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl group"
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <Image
                      src={src}
                      alt={`${section.label} ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

function CoursesSection({ trip }: { trip: Trip }) {
  return (
    <section className={`py-24 md:py-40 ${trip.photoSections.length === 0 ? "bg-bg-warm" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex items-center gap-5 mb-6">
            <div className="w-12 h-px bg-accent" />
            <span className="text-[11px] tracking-[0.15em] uppercase text-accent font-body font-medium">
              The Courses
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-text mb-20 leading-tight">
            {trip.upcoming ? "Where We\u2019ll" : "Where We"}
            <br />
            <span className="italic font-light text-text-muted">
              {trip.upcoming ? "Play" : "Played"}
            </span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trip.courses.map((course, i) => (
            <FadeIn key={course.name} delay={0.15 + i * 0.08}>
              <motion.div
                className="bg-white rounded-2xl shadow-lg shadow-black/5 border border-border overflow-hidden group"
                whileHover={{ borderColor: "rgba(207, 128, 24, 0.3)" }}
              >
                {/* Course image */}
                {course.image && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}

                <div className="p-8">
                  <div className="text-[11px] tracking-[0.15em] uppercase text-accent mb-3 font-body font-medium">
                    Course {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display text-2xl text-text group-hover:text-accent transition-colors duration-300 mb-6">
                    {course.name}
                  </h3>
                  {course.url && (
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline inline-flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase font-body font-medium group/link"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      Tee Times & Info
                      <svg className="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection({ trip }: { trip: Trip }) {
  if (trip.gallery.length === 0) return null;

  return (
    <section className="py-24 md:py-40 bg-bg-warm">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex items-center gap-5 mb-4">
            <div className="w-12 h-px bg-accent" />
            <span className="text-[11px] tracking-[0.15em] uppercase text-accent font-body font-medium">
              The Evidence
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-text mb-16 leading-tight">
            Trip
            <br />
            <span className="italic font-light text-text-muted">Gallery</span>
          </h2>
        </FadeIn>

        <Gallery images={trip.gallery} />
      </div>
    </section>
  );
}

function TripNav({ prevTrip, nextTrip }: { prevTrip: Trip | null; nextTrip: Trip | null }) {
  return (
    <section className="bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="py-14 md:py-20 pr-6 md:pr-12">
            {prevTrip ? (
              <Link href={`/trip/${prevTrip.slug}`} className="group block">
                <span className="text-[10px] tracking-[0.3em] uppercase text-text-dim font-body font-medium block mb-2">
                  Previous
                </span>
                <motion.span
                  className="font-display text-3xl md:text-5xl text-text group-hover:text-accent transition-colors duration-300 block"
                  whileHover={{ x: -4 }}
                >
                  {prevTrip.year}
                </motion.span>
                <span className="block text-sm text-text-muted font-body mt-1.5 font-light">
                  {prevTrip.location}, {prevTrip.state}
                </span>
              </Link>
            ) : (
              <div className="opacity-20">
                <span className="text-[10px] tracking-[0.3em] uppercase text-text-dim font-body block mb-2">
                  Previous
                </span>
                <span className="font-display text-2xl text-text-dim">
                  The Beginning
                </span>
              </div>
            )}
          </div>
          <div className="py-14 md:py-20 pl-6 md:pl-12 text-right">
            {nextTrip ? (
              <Link href={`/trip/${nextTrip.slug}`} className="group block">
                <span className="text-[10px] tracking-[0.3em] uppercase text-text-dim font-body font-medium block mb-2">
                  Next
                </span>
                <motion.span
                  className="font-display text-3xl md:text-5xl text-text group-hover:text-accent transition-colors duration-300 block"
                  whileHover={{ x: 4 }}
                >
                  {nextTrip.year}
                </motion.span>
                <span className="block text-sm text-text-muted font-body mt-1.5 font-light">
                  {nextTrip.location}, {nextTrip.state}
                </span>
              </Link>
            ) : (
              <div className="opacity-20">
                <span className="text-[10px] tracking-[0.3em] uppercase text-text-dim font-body block mb-2">
                  Next
                </span>
                <span className="font-display text-2xl text-text-dim">
                  Stay Tuned
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TripPageClient({ trip, prevTrip, nextTrip }: Props) {
  return (
    <main>
      <TripHero trip={trip} />
      <ScheduleSection trip={trip} />
      <PhotoSections trip={trip} />
      <CoursesSection trip={trip} />
      <GallerySection trip={trip} />
      <TripNav prevTrip={prevTrip} nextTrip={nextTrip} />
    </main>
  );
}
