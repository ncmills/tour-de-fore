"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#0f0f0f]" />
      </motion.div>

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
              <div className="w-2 h-2 rounded-full bg-[#e85d26] animate-pulse" />
              <span className="text-[11px] tracking-[0.15em] uppercase text-[#e85d26] font-body font-medium">
                Upcoming Trip
              </span>
            </>
          ) : (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <span className="text-[11px] tracking-[0.15em] uppercase text-white/60 font-body font-medium">
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
          <span className="font-display text-[6rem] md:text-[11rem] lg:text-[15rem] text-[#c9a84c] leading-[0.88] tracking-tight block">
            {trip.year}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h1 className="font-body text-2xl md:text-4xl lg:text-5xl font-medium text-white/90 mb-4">
            {trip.location}, {trip.state}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center gap-5"
        >
          <span className="text-[11px] text-white/40 tracking-[0.15em] uppercase font-body font-medium">
            {trip.dates}
          </span>
          <div className="w-5 h-px bg-white/30 hidden md:block" />
          <span className="font-accent text-white/50 italic text-lg">
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
    <section className="py-12 md:py-20 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <h2 className="font-display text-4xl md:text-6xl text-text mb-10">
            {trip.upcoming ? "THE GAME PLAN" : "THE ITINERARY"}
          </h2>
        </FadeIn>

        <div className="space-y-0">
          {trip.schedule.map((day, i) => (
            <FadeIn key={day.day} delay={0.1 + i * 0.06}>
              <motion.div
                className="border-t border-[#2a2a2a] py-6 md:py-8 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-14"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <div className="font-body text-lg text-text font-semibold">
                    {day.day}
                  </div>
                  <div className="text-[11px] text-[#5a5550] font-body tracking-[0.1em] uppercase mt-1">
                    {day.date}
                  </div>
                </div>
                <div className="space-y-4">
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
                          <span className="text-[11px] text-[#e85d26] tracking-[0.1em] font-body uppercase font-medium">
                            {item.time}
                          </span>
                          <span className="font-body text-base text-text font-medium group-hover:text-[#e85d26] transition-colors duration-300">
                            {item.activity}
                          </span>
                        </div>
                        {item.detail && (
                          <p className="text-sm text-[#5a5550] font-body mt-1.5">
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
          <div className="border-t border-[#2a2a2a]" />
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
        <section key={section.label} className="py-12 md:py-20 bg-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <FadeIn>
              <h2 className="font-display text-4xl md:text-6xl text-text mb-4">
                {trip.upcoming ? "WHERE WE'RE STAYING" : "WHERE WE STAYED"}
              </h2>
            </FadeIn>
            {trip.lodgingAddress && (
              <FadeIn delay={0.1}>
                <p className="text-[11px] text-[#5a5550] font-body mb-10 tracking-[0.1em] uppercase">
                  {trip.lodgingAddress}
                </p>
              </FadeIn>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {section.images.map((src, i) => (
                <FadeIn key={i} delay={0.1 + i * 0.04}>
                  <motion.div
                    className="relative aspect-[4/3] overflow-hidden rounded-lg group"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <Image
                      src={src}
                      alt={`${section.label} ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
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
    <section className="py-12 md:py-20 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <h2 className="font-display text-4xl md:text-6xl text-text mb-12">
            {trip.upcoming ? "WHERE WE'LL PLAY" : "WHERE WE PLAYED"}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {trip.courses.map((course, i) => (
            <FadeIn key={course.name} delay={0.1 + i * 0.06}>
              <motion.div
                className="bg-[#1f1f1f] rounded-lg border border-[#2a2a2a] overflow-hidden group hover:border-[#e85d26]/40 transition-colors duration-300"
              >
                {course.image && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="font-body text-lg text-text font-semibold group-hover:text-[#e85d26] transition-colors duration-300 mb-4">
                    {course.name}
                  </h3>
                  {course.url && (
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline inline-flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase font-body font-medium group/link"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      Tee Times & Info
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
    <section className="py-12 md:py-20 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <h2 className="font-display text-4xl md:text-6xl text-text mb-10">
            THE EVIDENCE
          </h2>
        </FadeIn>

        <Gallery images={trip.gallery} />
      </div>
    </section>
  );
}

function TripNav({ prevTrip, nextTrip }: { prevTrip: Trip | null; nextTrip: Trip | null }) {
  return (
    <section className="bg-[#0f0f0f] border-t border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 divide-x divide-[#2a2a2a]">
          <div className="py-10 md:py-16 pr-6 md:pr-12">
            {prevTrip ? (
              <Link href={`/trip/${prevTrip.slug}`} className="group block">
                <span className="text-[11px] tracking-[0.15em] uppercase text-[#5a5550] font-body font-medium block mb-2">
                  Previous
                </span>
                <motion.span
                  className="font-display text-3xl md:text-5xl text-text group-hover:text-[#e85d26] transition-colors duration-300 block"
                  whileHover={{ x: -4 }}
                >
                  {prevTrip.year}
                </motion.span>
                <span className="block text-sm text-[#8a8580] font-body mt-1.5">
                  {prevTrip.location}, {prevTrip.state}
                </span>
              </Link>
            ) : (
              <div className="opacity-20">
                <span className="text-[11px] tracking-[0.15em] uppercase text-[#5a5550] font-body block mb-2">
                  Previous
                </span>
                <span className="font-display text-2xl text-[#5a5550]">
                  THE BEGINNING
                </span>
              </div>
            )}
          </div>
          <div className="py-10 md:py-16 pl-6 md:pl-12 text-right">
            {nextTrip ? (
              <Link href={`/trip/${nextTrip.slug}`} className="group block">
                <span className="text-[11px] tracking-[0.15em] uppercase text-[#5a5550] font-body font-medium block mb-2">
                  Next
                </span>
                <motion.span
                  className="font-display text-3xl md:text-5xl text-text group-hover:text-[#e85d26] transition-colors duration-300 block"
                  whileHover={{ x: 4 }}
                >
                  {nextTrip.year}
                </motion.span>
                <span className="block text-sm text-[#8a8580] font-body mt-1.5">
                  {nextTrip.location}, {nextTrip.state}
                </span>
              </Link>
            ) : (
              <div className="opacity-20">
                <span className="text-[11px] tracking-[0.15em] uppercase text-[#5a5550] font-body block mb-2">
                  Next
                </span>
                <span className="font-display text-2xl text-[#5a5550]">
                  STAY TUNED
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
