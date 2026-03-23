"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { StoredPlan } from "@/lib/plan-types";
import FadeIn from "./FadeIn";
import PlanUpsellSection from "./PlanUpsellSection";
import Nav from "./Nav";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";

const typeIcons: Record<string, string> = {
  golf: "\u26f3",
  dining: "\ud83c\udf7d\ufe0f",
  activity: "\ud83c\udfaf",
  nightlife: "\ud83c\udf19",
  travel: "\u2708\ufe0f",
  lodging: "\ud83c\udfe0",
};

export default function PlanResultClient({ stored }: { stored: StoredPlan }) {
  const { plan, id } = stored;
  const [copied, setCopied] = useState(false);
  const [emailSent, setEmailSent] = useState(stored.emailsSent);
  const [sending, setSending] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendEmails = async () => {
    setSending(true);
    try {
      const res = await fetch("/api/send-plan-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: id }),
      });
      if (res.ok) {
        setEmailSent(true);
      }
    } catch {
      // silent fail
    } finally {
      setSending(false);
    }
  };

  return (
    <>
    <Nav />
    <main id="main-content" className="bg-bg">
      {/* Hero */}
      <section className="relative pt-28 pb-12 md:pt-40 md:pb-20 overflow-hidden bg-bg-alt">
        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-8">
            <Breadcrumbs crumbs={[{ label: "Plan a Trip", href: "/plan" }, { label: plan.tripName }]} />
          </div>
          <FadeIn>
            <div className="flex items-center gap-6 mb-6">
              <div className="w-12 h-px bg-accent" />
              <span className="text-xs tracking-[0.15em] uppercase text-accent font-body font-medium">
                Your Trip Plan
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-text leading-tight mb-6">
              {plan.tripName}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-accent text-xl md:text-2xl italic text-text-muted">
              &ldquo;{plan.tagline}&rdquo;
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Trip Overview Card */}
      <section className="py-12 md:py-16 bg-bg">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="bg-bg-card rounded-lg border border-border p-8 md:p-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
                {[
                  { label: "Destination", value: plan.destination },
                  { label: "Dates", value: plan.dates },
                  { label: "Group Size", value: `${plan.groupSize} people` },
                  { label: "Per Person", value: plan.estimatedBudget.perPerson },
                ].map((item) => (
                  <div key={item.label} className="text-center md:text-left">
                    <span className="text-xs tracking-[0.15em] uppercase text-accent font-body font-medium block mb-2">
                      {item.label}
                    </span>
                    <span className="font-display text-xl md:text-2xl text-text">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Lodging */}
      <section className="py-20 md:py-32 bg-bg-alt">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl text-text mb-14">
              The Lodging
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="bg-bg-card rounded-lg border border-border p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                <div>
                  <h3 className="font-body text-xl md:text-2xl text-text font-semibold mb-2">
                    {plan.lodging.name}
                  </h3>
                  <p className="text-xs tracking-[0.1em] uppercase text-text-dim font-body">
                    {plan.lodging.type} &mdash; {plan.lodging.address}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-display text-2xl text-accent">
                    {plan.lodging.costPerNight}
                  </span>
                  <span className="text-text-dim text-sm font-body block">/night</span>
                </div>
              </div>
              <p className="text-text-muted font-body leading-relaxed">
                {plan.lodging.rationale}
              </p>
              {plan.lodging.url && (
                <a
                  href={plan.lodging.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center gap-2 mt-6 text-xs tracking-[0.15em] uppercase font-body font-medium"
                >
                  View Listing
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 md:py-32 bg-bg">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl text-text mb-14">
              The Courses
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plan.courses.map((course, i) => (
              <FadeIn key={course.name} delay={0.1 + i * 0.06}>
                <motion.div
                  className="bg-bg-card rounded-lg border border-border overflow-hidden group h-full flex flex-col hover:border-accent/30 transition-colors duration-300"
                >
                  <div className="p-8 flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs tracking-[0.1em] uppercase text-accent font-body font-medium">
                        Day {course.day} &mdash; {course.session}
                      </span>
                      <span className="text-accent text-sm font-body font-medium">
                        {course.greenFee}
                      </span>
                    </div>
                    <h3 className="font-body text-lg text-text font-semibold group-hover:text-accent transition-colors duration-300 mb-4">
                      {course.name}
                    </h3>
                    <p className="text-text-dim font-body text-sm leading-relaxed">
                      {course.whyThisCourse}
                    </p>
                  </div>
                  {course.url && (
                    <div className="px-8 pb-8 pt-0">
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-body font-medium"
                      >
                        Tee Times & Info
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section className="py-20 md:py-32 bg-bg-alt">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl text-text mb-14">
              The Itinerary
            </h2>
          </FadeIn>

          <div className="space-y-0">
            {plan.schedule.map((day, i) => (
              <FadeIn key={day.day} delay={0.1 + i * 0.06}>
                <div className="border-t border-border py-8 md:py-10 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12">
                  <div>
                    <div className="font-body text-lg text-text font-semibold">
                      {day.label}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {day.items.map((item, j) => (
                      <div key={j} className="group">
                        <div className="flex items-start gap-4">
                          <span className="text-lg mt-[-2px]">
                            {typeIcons[item.type] || "\ud83d\udccc"}
                          </span>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                              <span className="text-xs text-accent tracking-[0.1em] font-body uppercase font-medium">
                                {item.time}
                              </span>
                              <span className="font-body text-base text-text font-medium">
                                {item.activity}
                              </span>
                            </div>
                            {item.detail && (
                              <p className="text-sm text-text-dim font-body mt-1.5">
                                {item.detail}
                              </p>
                            )}
                            {item.proTip && (
                              <p className="text-sm text-accent/70 font-body mt-1.5 italic">
                                {"\ud83d\udca1"} {item.proTip}
                              </p>
                            )}
                          </div>
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

      {/* Dining & Nightlife */}
      {plan.dining.length > 0 && (
        <section className="py-20 md:py-32 bg-bg">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <FadeIn>
              <h2 className="font-display text-4xl md:text-6xl text-text mb-14">
                Dining & Nightlife
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {plan.dining.map((spot, i) => (
                <FadeIn key={spot.name} delay={0.1 + i * 0.06}>
                  <div className="bg-bg-card rounded-lg border border-border p-8 group hover:border-accent/30 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs tracking-[0.1em] uppercase text-accent font-body font-medium">
                        {spot.type}
                      </span>
                      <span className="text-text-dim text-sm font-body">
                        {spot.priceRange}
                      </span>
                    </div>
                    <h3 className="font-body text-lg text-text font-semibold group-hover:text-accent transition-colors duration-300 mb-3">
                      {spot.name}
                    </h3>
                    <p className="text-text-dim font-body text-sm leading-relaxed">
                      {spot.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Budget Breakdown */}
      <section className="py-20 md:py-32 bg-bg-alt">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl text-text mb-14">
              Budget Breakdown
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-bg-card rounded-lg border border-border overflow-hidden">
              <div className="p-8 border-b border-border flex items-center justify-between">
                <span className="font-body text-lg text-text font-semibold">Total Per Person</span>
                <span className="font-display text-3xl text-accent">
                  {plan.estimatedBudget.perPerson}
                </span>
              </div>
              <div className="divide-y divide-border">
                {plan.estimatedBudget.breakdown.map((item) => (
                  <div
                    key={item.category}
                    className="px-8 py-5 flex items-center justify-between hover:bg-bg-alt transition-colors"
                  >
                    <span className="font-body text-text-muted text-sm">{item.category}</span>
                    <span className="font-body text-text font-medium">{item.perPerson}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pro Tips */}
      {plan.proTips.length > 0 && (
        <section className="py-20 md:py-32 bg-bg">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <FadeIn>
              <h2 className="font-display text-4xl md:text-6xl text-text mb-14">
                Pro Tips
              </h2>
            </FadeIn>

            <div className="space-y-6">
              {plan.proTips.map((tip, i) => (
                <FadeIn key={i} delay={0.1 + i * 0.04}>
                  <div className="flex items-start gap-6 border-l-2 border-accent pl-6 py-2">
                    <span className="font-display text-2xl text-accent leading-none mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-text-muted font-body leading-relaxed">
                      {tip}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Group Logistics */}
      <section className="py-20 md:py-32 bg-bg-alt">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl text-text mb-14">
              Group Logistics
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn delay={0.1}>
              <div className="bg-bg-card rounded-lg border border-border p-8">
                <h3 className="font-body text-lg text-text font-semibold mb-4">Tee Time Strategy</h3>
                <p className="text-text-muted font-body text-sm leading-relaxed">
                  {plan.groupLogistics.teeTimeStrategy}
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="bg-bg-card rounded-lg border border-border p-8">
                <h3 className="font-body text-lg text-text font-semibold mb-4">Transport</h3>
                <p className="text-text-muted font-body text-sm leading-relaxed">
                  {plan.groupLogistics.transport}
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div className="bg-bg-card rounded-lg border border-border p-8 mt-5">
              <h3 className="font-body text-lg text-text font-semibold mb-5">Packing List</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {plan.groupLogistics.packingList.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-text-muted font-body text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Upsell */}
      <PlanUpsellSection planId={id} />

      {/* Share Bar */}
      <section className="py-12 border-t border-border bg-bg">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={copyLink}
              className="btn-outline inline-flex items-center gap-3 px-6 py-3 font-body text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              {copied ? "Copied!" : "Copy Link"}
            </button>

            <button
              onClick={sendEmails}
              disabled={emailSent || sending}
              className={`btn-primary inline-flex items-center gap-3 px-6 py-3 font-body text-sm ${
                emailSent ? "opacity-70 cursor-default" : ""
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {emailSent ? "Sent to Crew \u2713" : sending ? "Sending..." : "Send to All Attendees"}
            </button>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
