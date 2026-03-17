"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Trip } from "@/lib/trips";
import FadeIn from "./FadeIn";
import Gallery from "./Gallery";

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
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[85vh] md:h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src={trip.heroImage}
          alt={`${trip.year} - ${trip.location}`}
          fill
          priority
          sizes="100vw"
          className="object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-bg" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          {trip.upcoming ? (
            <>
              <div className="w-2 h-2 rounded-full bg-accent-light animate-pulse" />
              <span className="text-xs tracking-[0.3em] uppercase text-accent-light font-body">
                Upcoming Trip
              </span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-gold-dim" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold-dim font-body">
                Past Expedition
              </span>
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-4"
        >
          <span className="font-display text-8xl md:text-[12rem] lg:text-[14rem] font-bold text-white leading-[0.8] tracking-tight block">
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
          className="flex flex-wrap items-center gap-6"
        >
          <span className="text-sm text-text-muted tracking-widest uppercase font-body">
            {trip.dates}
          </span>
          <div className="w-px h-4 bg-border hidden md:block" />
          <span className="font-display text-text-muted italic">
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
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-8 h-px bg-gold-dim" />
            <span className="text-xs tracking-[0.3em] uppercase text-text-dim font-body">
              {trip.upcoming ? "The Game Plan" : "How It Went Down"}
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-text mb-16 leading-[0.95]">
            {trip.upcoming ? "The" : "The"}
            <br />
            <span className="italic font-light text-text-muted">
              {trip.upcoming ? "Itinerary" : "Itinerary"}
            </span>
          </h2>
        </FadeIn>

        <div className="space-y-0">
          {trip.schedule.map((day, i) => (
            <FadeIn key={day.day} delay={0.15 + i * 0.08}>
              <div className="border-t border-border py-8 md:py-10 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12">
                <div>
                  <div className="font-display text-2xl text-text font-semibold">
                    {day.day}
                  </div>
                  <div className="text-sm text-text-dim font-body">{day.date}</div>
                </div>
                <div className="space-y-4">
                  {day.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-4">
                      <span className="text-lg mt-[-2px]">{typeIcons[item.type]}</span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          <span className="text-xs text-gold-dim tracking-widest font-body uppercase">
                            {item.time}
                          </span>
                          <span className="font-display text-lg text-text">
                            {item.activity}
                          </span>
                        </div>
                        {item.detail && (
                          <p className="text-sm text-text-dim font-body mt-0.5">
                            {item.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
        <section key={section.label} className="py-24 md:py-32 bg-bg-elevated">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <FadeIn>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-8 h-px bg-gold-dim" />
                <span className="text-xs tracking-[0.3em] uppercase text-text-dim font-body">
                  {trip.upcoming ? "Where We\u2019re Staying" : "Where We Stayed"}
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-5xl md:text-7xl font-bold text-text mb-4 leading-[0.95]">
                {section.label.split(" ")[0]}
                <br />
                <span className="italic font-light text-text-muted">
                  {section.label.split(" ").slice(1).join(" ") || ""}
                </span>
              </h2>
            </FadeIn>
            {trip.lodgingAddress && (
              <FadeIn delay={0.15}>
                <p className="text-sm text-text-dim font-body mb-12 tracking-wide">
                  {trip.lodgingAddress}
                </p>
              </FadeIn>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {section.images.map((src, i) => (
                <FadeIn key={i} delay={0.15 + i * 0.05}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm group">
                    <Image
                      src={src}
                      alt={`${section.label} ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
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
    <section className={`py-24 md:py-32 ${trip.photoSections.length === 0 ? "bg-bg-elevated" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-8 h-px bg-gold-dim" />
            <span className="text-xs tracking-[0.3em] uppercase text-text-dim font-body">
              {trip.upcoming ? "The Courses" : "The Courses"}
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-text mb-16 leading-[0.95]">
            {trip.upcoming ? "Where We\u2019ll" : "Where We"}
            <br />
            <span className="italic font-light text-text-muted">
              {trip.upcoming ? "Play" : "Played"}
            </span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trip.courses.map((course, i) => (
            <FadeIn key={course.name} delay={0.15 + i * 0.08}>
              <div className="bg-bg-card border border-border rounded-sm p-8 hover:border-border-light transition-all group">
                <div className="text-gold-dim text-xs tracking-[0.2em] uppercase mb-3 font-body">
                  Course {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-2xl text-text group-hover:text-gold transition-colors mb-4">
                  {course.name}
                </h3>
                {course.url && (
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-text-dim hover:text-text-muted transition-colors tracking-widest uppercase font-body"
                  >
                    Visit Website
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
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
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-8 h-px bg-gold-dim" />
            <span className="text-xs tracking-[0.3em] uppercase text-text-dim font-body">
              The Evidence
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-text mb-16 leading-[0.95]">
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
    <section className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="py-12 md:py-16 pr-6 md:pr-12">
            {prevTrip ? (
              <Link href={`/trip/${prevTrip.slug}`} className="group block">
                <span className="text-xs tracking-[0.2em] uppercase text-text-dim font-body block mb-2">
                  Previous
                </span>
                <span className="font-display text-2xl md:text-4xl text-text group-hover:text-gold transition-colors">
                  {prevTrip.year}
                </span>
                <span className="block text-sm text-text-muted font-body mt-1">
                  {prevTrip.location}, {prevTrip.state}
                </span>
              </Link>
            ) : (
              <div className="opacity-30">
                <span className="text-xs tracking-[0.2em] uppercase text-text-dim font-body block mb-2">
                  Previous
                </span>
                <span className="font-display text-2xl text-text-dim">
                  The Beginning
                </span>
              </div>
            )}
          </div>
          <div className="py-12 md:py-16 pl-6 md:pl-12 text-right">
            {nextTrip ? (
              <Link href={`/trip/${nextTrip.slug}`} className="group block">
                <span className="text-xs tracking-[0.2em] uppercase text-text-dim font-body block mb-2">
                  Next
                </span>
                <span className="font-display text-2xl md:text-4xl text-text group-hover:text-gold transition-colors">
                  {nextTrip.year}
                </span>
                <span className="block text-sm text-text-muted font-body mt-1">
                  {nextTrip.location}, {nextTrip.state}
                </span>
              </Link>
            ) : (
              <div className="opacity-30">
                <span className="text-xs tracking-[0.2em] uppercase text-text-dim font-body block mb-2">
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
