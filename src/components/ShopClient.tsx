"use client";

import { useState } from "react";
import { motion } from "motion/react";
import FadeIn from "./FadeIn";
import Breadcrumbs from "./Breadcrumbs";

const heroProducts = [
  {
    name: "TDF Custom Zyn Tin",
    desc: "Brushed aluminum. Laser-engraved pitchfork. Magnetic lid.",
    svg: (
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <defs>
          <linearGradient id="tin-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="50%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#111" />
          </linearGradient>
        </defs>
        <ellipse cx="150" cy="255" rx="65" ry="12" fill="rgba(232,93,38,0.06)" />
        <rect x="80" y="120" width="140" height="120" rx="12" fill="url(#tin-g)" stroke="#333" strokeWidth="1" />
        <rect x="78" y="105" width="144" height="30" rx="12" fill="#222" stroke="#444" strokeWidth="0.5" />
        <line x1="150" y1="145" x2="150" y2="210" stroke="#e85d26" strokeWidth="2" />
        <path d="M140 150 C140 150 138 155 138 160 C138 163 139 164 140 164 L140 150Z" fill="#e85d26" />
        <path d="M160 150 C160 150 162 155 162 160 C162 163 161 164 160 164 L160 150Z" fill="#e85d26" />
        <path d="M152 145 L152 155 L162 150 Z" fill="#e85d26" />
        <text x="150" y="195" textAnchor="middle" fill="#c9a84c" fontSize="8" fontFamily="serif" letterSpacing="3">TOUR DE FORE</text>
      </svg>
    ),
  },
  {
    name: '"Hell Is Empty" Tee',
    desc: "Heavyweight cotton. Pitchfork pocket print. Full motto on the back.",
    svg: (
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <ellipse cx="150" cy="270" rx="70" ry="8" fill="rgba(232,93,38,0.06)" />
        <path d="M100 100 L100 255 L200 255 L200 100 L175 85 L165 95 L150 90 L135 95 L125 85 Z" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />
        <path d="M100 100 L125 85 L70 70 L65 110 L100 120Z" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />
        <path d="M200 100 L175 85 L230 70 L235 110 L200 120Z" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />
        <path d="M135 95 L150 90 L165 95 L160 100 L150 97 L140 100Z" fill="#111" stroke="#2a2a2a" strokeWidth="0.5" />
        <rect x="158" y="120" width="22" height="20" rx="1" fill="none" stroke="#2a2a2a" strokeWidth="0.5" />
        <line x1="169" y1="124" x2="169" y2="136" stroke="#e85d26" strokeWidth="1" />
        <text x="150" y="190" textAnchor="middle" fill="#333" fontSize="5" fontFamily="serif" letterSpacing="1">HELL IS EMPTY</text>
        <text x="150" y="198" textAnchor="middle" fill="#333" fontSize="4" fontFamily="serif" letterSpacing="1">AND ALL THE DEVILS</text>
        <text x="150" y="205" textAnchor="middle" fill="#333" fontSize="4" fontFamily="serif" letterSpacing="1">ARE HERE</text>
      </svg>
    ),
  },
  {
    name: "Snapback Rope Hat",
    desc: "Structured five-panel. Braided rope detail. Leather TDF patch.",
    svg: (
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <ellipse cx="150" cy="255" rx="75" ry="10" fill="rgba(232,93,38,0.06)" />
        <path d="M55 195 C55 195 80 210 150 215 C220 210 245 195 245 195 C245 195 230 205 150 210 C70 205 55 195 55 195Z" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="0.5" />
        <path d="M85 195 C85 195 90 130 150 120 C210 130 215 195 215 195 C215 195 200 200 150 202 C100 200 85 195 85 195Z" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="0.5" />
        <path d="M150 120 L150 202" stroke="#2a2a2a" strokeWidth="0.5" />
        <path d="M118 128 L108 200" stroke="#2a2a2a" strokeWidth="0.5" />
        <path d="M182 128 L192 200" stroke="#2a2a2a" strokeWidth="0.5" />
        <path d="M85 192 C85 192 100 188 150 186 C200 188 215 192 215 192" fill="none" stroke="#e85d26" strokeWidth="2.5" />
        <path d="M85 192 C85 192 100 188 150 186 C200 188 215 192 215 192" fill="none" stroke="#c9a84c" strokeWidth="1" strokeDasharray="4 4" />
        <rect x="130" y="145" width="40" height="28" rx="3" fill="#3a2a1a" stroke="#4a3a2a" strokeWidth="0.5" />
        <text x="150" y="164" textAnchor="middle" fill="#e85d26" fontSize="10" fontFamily="serif" fontWeight="bold" letterSpacing="3">TDF</text>
        <circle cx="150" cy="122" r="4" fill="#2a2a2a" stroke="#333" strokeWidth="0.5" />
      </svg>
    ),
  },
  {
    name: "TDF Leather Headcover",
    desc: "Full-grain leather driver headcover. Embossed pitchfork with flames.",
    svg: (
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <defs>
          <linearGradient id="leath-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3a2a1a" />
            <stop offset="100%" stopColor="#2a1a0a" />
          </linearGradient>
        </defs>
        <ellipse cx="150" cy="265" rx="45" ry="8" fill="rgba(232,93,38,0.06)" />
        <path d="M115 90 C105 90 95 120 95 170 C95 220 110 260 150 260 C190 260 205 220 205 170 C205 120 195 90 185 90 C175 90 165 85 150 85 C135 85 125 90 115 90Z" fill="url(#leath-g)" stroke="#4a3a2a" strokeWidth="1" />
        <ellipse cx="150" cy="165" rx="35" ry="35" fill="none" stroke="#4a3a2a" strokeWidth="0.5" />
        <line x1="150" y1="142" x2="150" y2="188" stroke="#e85d26" strokeWidth="2" opacity="0.7" />
        <path d="M140 148 C140 148 137 155 137 162 C137 166 139 168 140 168Z" fill="#e85d26" opacity="0.6" />
        <path d="M160 148 C160 148 163 155 163 162 C163 166 161 168 160 168Z" fill="#e85d26" opacity="0.6" />
        <text x="150" y="198" textAnchor="middle" fill="#e85d26" fontSize="7" fontFamily="serif" letterSpacing="4" opacity="0.6">TDF</text>
      </svg>
    ),
  },
];

export default function ShopClient() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <main className="bg-[#0f0f0f]">
      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-8">
            <Breadcrumbs crumbs={[{ label: "Shop" }]} />
          </div>
          <FadeIn>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-text leading-tight mb-4">
              PRO SHOP
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-[#8a8580] text-base md:text-lg font-body max-w-md leading-[1.8]">
              Gear for the kind of golfer who plays 36 a day
              and tips like they won the tournament.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Product Concepts */}
      <section className="pb-16 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {heroProducts.map((product, i) => (
              <FadeIn key={product.name} delay={0.05 + i * 0.06}>
                <div className="bg-[#1f1f1f] rounded-lg border border-[#2a2a2a] overflow-hidden group hover:border-[#e85d26]/30 transition-colors duration-300">
                  <div className="relative aspect-[4/3] bg-[#1a1a1a] flex items-center justify-center p-12">
                    <div className="w-full h-full max-w-[240px] group-hover:scale-105 transition-transform duration-500">
                      {product.svg}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="font-body text-lg text-text font-semibold mb-3">
                      {product.name}
                    </h3>
                    <p className="text-[#5a5550] text-sm font-body">
                      {product.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-16 md:py-28 bg-[#1a1a1a]">
        <div className="max-w-xl mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl text-text mb-4">
              COMING SOON
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-[#8a8580] font-body text-base mb-8">
              Drop your email to get first access when the shop goes live.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[#e85d26] font-body font-medium"
              >
                You&rsquo;re on the list. We&rsquo;ll be in touch.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-[#0f0f0f] border border-[#2a2a2a] rounded-md px-5 py-3.5 text-text font-body text-sm placeholder:text-[#5a5550] focus:border-[#e85d26] focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="btn-primary px-6 py-3.5 whitespace-nowrap"
                >
                  NOTIFY ME
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
