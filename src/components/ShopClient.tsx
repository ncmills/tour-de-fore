"use client";

import { motion } from "motion/react";
import FadeIn from "./FadeIn";
import Breadcrumbs from "./Breadcrumbs";

// Inline product mockup SVGs with TDF branding
function ZynTinMockup() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full">
      <defs>
        <linearGradient id="tin-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="50%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
        <linearGradient id="lid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#333" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
      </defs>
      {/* Shadow */}
      <ellipse cx="150" cy="255" rx="65" ry="12" fill="rgba(200,121,65,0.06)" />
      {/* Tin body */}
      <rect x="80" y="120" width="140" height="120" rx="12" fill="url(#tin-grad)" stroke="#333" strokeWidth="1" />
      {/* Lid */}
      <rect x="78" y="105" width="144" height="30" rx="12" fill="url(#lid-grad)" stroke="#444" strokeWidth="0.5" />
      {/* Logo - pitchfork */}
      <line x1="150" y1="145" x2="150" y2="210" stroke="#c87941" strokeWidth="2" />
      <path d="M140 150 C140 150 138 155 138 160 C138 163 139 164 140 164 L140 150Z" fill="#c87941" />
      <path d="M160 150 C160 150 162 155 162 160 C162 163 161 164 160 164 L160 150Z" fill="#c87941" />
      <path d="M152 145 L152 155 L162 150 Z" fill="#c87941" />
      <path d="M138 164 C138 164 142 167 150 167 C158 167 162 164 162 164" fill="none" stroke="#c87941" strokeWidth="1.5" />
      {/* Text */}
      <text x="150" y="195" textAnchor="middle" fill="#c9a96e" fontSize="8" fontFamily="serif" letterSpacing="3">TOUR DE FORE</text>
      {/* Rim highlight */}
      <line x1="90" y1="120" x2="210" y2="120" stroke="#444" strokeWidth="0.5" />
    </svg>
  );
}

function BucketHatMockup() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full">
      {/* Shadow */}
      <ellipse cx="150" cy="260" rx="90" ry="10" fill="rgba(200,121,65,0.06)" />
      {/* Brim */}
      <ellipse cx="150" cy="190" rx="110" ry="25" fill="#d4c5a0" stroke="#b8a880" strokeWidth="1" />
      {/* Crown */}
      <path d="M85 190 C85 190 90 120 150 110 C210 120 215 190 215 190" fill="#c8b890" stroke="#b8a880" strokeWidth="1" />
      {/* Brim texture lines */}
      <ellipse cx="150" cy="190" rx="95" ry="18" fill="none" stroke="#b8a880" strokeWidth="0.3" />
      <ellipse cx="150" cy="190" rx="80" ry="14" fill="none" stroke="#b8a880" strokeWidth="0.3" />
      {/* Band */}
      <path d="M90 170 C90 170 100 160 150 155 C200 160 210 170 210 170" fill="none" stroke="#1a1a1a" strokeWidth="8" />
      {/* Logo on band - pitchfork */}
      <line x1="150" y1="160" x2="150" y2="174" stroke="#c87941" strokeWidth="1.5" />
      <path d="M146 162 L146 162 L144 166 L146 166Z" fill="#c87941" />
      <path d="M154 162 L154 162 L156 166 L154 166Z" fill="#c87941" />
      <path d="M151 160 L151 165 L157 162Z" fill="#c87941" />
      {/* Top button */}
      <circle cx="150" cy="112" r="4" fill="#b8a880" stroke="#a89870" strokeWidth="0.5" />
    </svg>
  );
}

function DivotToolMockup() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full">
      <defs>
        <linearGradient id="steel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#555" />
          <stop offset="50%" stopColor="#333" />
          <stop offset="100%" stopColor="#222" />
        </linearGradient>
      </defs>
      {/* Shadow */}
      <ellipse cx="150" cy="260" rx="50" ry="8" fill="rgba(200,121,65,0.06)" />
      {/* Handle */}
      <rect x="140" y="140" width="20" height="110" rx="6" fill="url(#steel-grad)" stroke="#444" strokeWidth="0.5" />
      {/* Left prong */}
      <path d="M130 60 C130 60 126 80 126 100 C126 110 128 115 132 118 L132 140 L140 140 L140 100 C140 85 135 65 130 60Z" fill="url(#steel-grad)" stroke="#444" strokeWidth="0.5" />
      {/* Center prong */}
      <path d="M148 45 L148 140 L152 140 L152 45Z" fill="url(#steel-grad)" stroke="#444" strokeWidth="0.5" />
      {/* Right prong */}
      <path d="M170 60 C170 60 174 80 174 100 C174 110 172 115 168 118 L168 140 L160 140 L160 100 C160 85 165 65 170 60Z" fill="url(#steel-grad)" stroke="#444" strokeWidth="0.5" />
      {/* Flag on center */}
      <path d="M152 45 L152 65 L170 55 Z" fill="#c87941" />
      {/* Logo text on handle */}
      <text x="150" y="200" textAnchor="middle" fill="#c87941" fontSize="6" fontFamily="serif" letterSpacing="2" transform="rotate(0,150,200)">TDF</text>
    </svg>
  );
}

function TShirtMockup() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full">
      {/* Shadow */}
      <ellipse cx="150" cy="270" rx="70" ry="8" fill="rgba(200,121,65,0.06)" />
      {/* Body */}
      <path d="M100 100 L100 255 L200 255 L200 100 L175 85 L165 95 L150 90 L135 95 L125 85 Z" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />
      {/* Left sleeve */}
      <path d="M100 100 L125 85 L70 70 L65 110 L100 120Z" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />
      {/* Right sleeve */}
      <path d="M200 100 L175 85 L230 70 L235 110 L200 120Z" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />
      {/* Collar */}
      <path d="M135 95 L150 90 L165 95 L160 100 L150 97 L140 100Z" fill="#111" stroke="#2a2a2a" strokeWidth="0.5" />
      {/* Pocket logo - pitchfork */}
      <rect x="158" y="120" width="22" height="20" rx="1" fill="none" stroke="#2a2a2a" strokeWidth="0.5" />
      <line x1="169" y1="124" x2="169" y2="136" stroke="#c87941" strokeWidth="1" />
      <path d="M165 126 L165 130 L167 130Z" fill="#c87941" />
      <path d="M173 126 L173 130 L171 130Z" fill="#c87941" />
      <path d="M170 124 L170 128 L175 126Z" fill="#c87941" />
      {/* Back text hint */}
      <text x="150" y="190" textAnchor="middle" fill="#333" fontSize="5" fontFamily="serif" letterSpacing="1">HELL IS EMPTY</text>
      <text x="150" y="198" textAnchor="middle" fill="#333" fontSize="4" fontFamily="serif" letterSpacing="1">AND ALL THE DEVILS</text>
      <text x="150" y="205" textAnchor="middle" fill="#333" fontSize="4" fontFamily="serif" letterSpacing="1">ARE HERE</text>
    </svg>
  );
}

function HeadcoverMockup() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full">
      <defs>
        <linearGradient id="leather-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3a2a1a" />
          <stop offset="100%" stopColor="#2a1a0a" />
        </linearGradient>
      </defs>
      {/* Shadow */}
      <ellipse cx="150" cy="265" rx="45" ry="8" fill="rgba(200,121,65,0.06)" />
      {/* Body */}
      <path d="M115 90 C105 90 95 120 95 170 C95 220 110 260 150 260 C190 260 205 220 205 170 C205 120 195 90 185 90 C175 90 165 85 150 85 C135 85 125 90 115 90Z" fill="url(#leather-grad)" stroke="#4a3a2a" strokeWidth="1" />
      {/* Stitching line */}
      <path d="M115 90 C115 90 130 100 150 100 C170 100 185 90 185 90" fill="none" stroke="#5a4a3a" strokeWidth="0.5" strokeDasharray="3 3" />
      {/* Embossed logo area */}
      <ellipse cx="150" cy="165" rx="35" ry="35" fill="none" stroke="#4a3a2a" strokeWidth="0.5" />
      {/* Pitchfork emboss */}
      <line x1="150" y1="142" x2="150" y2="188" stroke="#c87941" strokeWidth="2" opacity="0.7" />
      <path d="M140 148 C140 148 137 155 137 162 C137 166 139 168 140 168Z" fill="#c87941" opacity="0.6" />
      <path d="M160 148 C160 148 163 155 163 162 C163 166 161 168 160 168Z" fill="#c87941" opacity="0.6" />
      <path d="M152 142 L152 156 L166 149Z" fill="#c87941" opacity="0.7" />
      <path d="M138 168 C138 168 143 172 150 172 C157 172 162 168 162 168" fill="none" stroke="#c87941" strokeWidth="1.5" opacity="0.6" />
      {/* TDF text */}
      <text x="150" y="198" textAnchor="middle" fill="#c87941" fontSize="7" fontFamily="serif" letterSpacing="4" opacity="0.6">TDF</text>
    </svg>
  );
}

function FlaskMockup() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full">
      <defs>
        <linearGradient id="flask-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="30%" stopColor="#3a3a3a" />
          <stop offset="70%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
      </defs>
      {/* Shadow */}
      <ellipse cx="150" cy="270" rx="40" ry="6" fill="rgba(200,121,65,0.06)" />
      {/* Body */}
      <rect x="110" y="90" width="80" height="170" rx="8" fill="url(#flask-grad)" stroke="#444" strokeWidth="0.5" />
      {/* Cap */}
      <rect x="138" y="65" width="24" height="30" rx="4" fill="#333" stroke="#444" strokeWidth="0.5" />
      <rect x="135" y="85" width="30" height="10" rx="3" fill="#2a2a2a" stroke="#444" strokeWidth="0.5" />
      {/* Engraved logo */}
      <line x1="150" y1="140" x2="150" y2="210" stroke="#c87941" strokeWidth="1.5" opacity="0.5" />
      <path d="M142 146 C142 146 139 152 139 158 C139 161 140 162 142 162Z" fill="#c87941" opacity="0.4" />
      <path d="M158 146 C158 146 161 152 161 158 C161 161 160 162 158 162Z" fill="#c87941" opacity="0.4" />
      <path d="M151 140 L151 152 L163 146Z" fill="#c87941" opacity="0.5" />
      <path d="M140 162 C140 162 144 166 150 166 C156 166 160 162 160 162" fill="none" stroke="#c87941" strokeWidth="1" opacity="0.4" />
      <text x="150" y="190" textAnchor="middle" fill="#c9a96e" fontSize="5" fontFamily="serif" letterSpacing="2" opacity="0.5">TOUR DE FORE</text>
      <text x="150" y="200" textAnchor="middle" fill="#c9a96e" fontSize="4" fontFamily="serif" letterSpacing="1" opacity="0.3">EST. 2021</text>
    </svg>
  );
}

function GolfTowelMockup() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full">
      {/* Shadow */}
      <ellipse cx="150" cy="270" rx="70" ry="8" fill="rgba(200,121,65,0.06)" />
      {/* Towel body */}
      <path d="M80 70 L80 260 C80 260 90 265 100 260 C110 255 115 260 125 260 L220 260 L220 70 C220 65 210 60 200 65 C190 70 185 65 180 65 L80 70Z" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />
      {/* Waffle texture */}
      {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
        <line key={`h${i}`} x1="85" y1={80 + i * 18} x2="215" y2={80 + i * 18} stroke="#222" strokeWidth="0.3" />
      ))}
      {[0,1,2,3,4,5,6,7].map(i => (
        <line key={`v${i}`} x1={90 + i * 18} y1="70" x2={90 + i * 18} y2="260" stroke="#222" strokeWidth="0.3" />
      ))}
      {/* Carabiner */}
      <circle cx="90" cy="75" r="8" fill="none" stroke="#555" strokeWidth="2" />
      <line x1="86" y1="68" x2="94" y2="68" stroke="#555" strokeWidth="2" />
      {/* Embroidered logo */}
      <line x1="150" y1="130" x2="150" y2="200" stroke="#c87941" strokeWidth="3" />
      <path d="M136 140 C136 140 132 150 132 160 C132 166 135 168 136 168Z" fill="#c87941" />
      <path d="M164 140 C164 140 168 150 168 160 C168 166 165 168 164 168Z" fill="#c87941" />
      <path d="M152 130 L152 150 L172 140Z" fill="#c87941" />
      <path d="M134 168 C134 168 140 174 150 174 C160 174 166 168 166 168" fill="none" stroke="#c87941" strokeWidth="2" />
    </svg>
  );
}

function RopeHatMockup() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full">
      {/* Shadow */}
      <ellipse cx="150" cy="255" rx="75" ry="10" fill="rgba(200,121,65,0.06)" />
      {/* Brim */}
      <path d="M55 195 C55 195 80 210 150 215 C220 210 245 195 245 195 C245 195 230 205 150 210 C70 205 55 195 55 195Z" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="0.5" />
      {/* Crown panels */}
      <path d="M85 195 C85 195 90 130 150 120 C210 130 215 195 215 195 C215 195 200 200 150 202 C100 200 85 195 85 195Z" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="0.5" />
      {/* Panel seams */}
      <path d="M150 120 L150 202" stroke="#2a2a2a" strokeWidth="0.5" />
      <path d="M118 128 L108 200" stroke="#2a2a2a" strokeWidth="0.5" />
      <path d="M182 128 L192 200" stroke="#2a2a2a" strokeWidth="0.5" />
      {/* Rope braid */}
      <path d="M85 192 C85 192 100 188 150 186 C200 188 215 192 215 192" fill="none" stroke="#c87941" strokeWidth="2.5" />
      <path d="M85 192 C85 192 100 188 150 186 C200 188 215 192 215 192" fill="none" stroke="#c9a96e" strokeWidth="1" strokeDasharray="4 4" />
      {/* Leather patch */}
      <rect x="130" y="145" width="40" height="28" rx="3" fill="#3a2a1a" stroke="#4a3a2a" strokeWidth="0.5" />
      {/* TDF on patch */}
      <text x="150" y="164" textAnchor="middle" fill="#c87941" fontSize="10" fontFamily="serif" fontWeight="bold" letterSpacing="3">TDF</text>
      {/* Button top */}
      <circle cx="150" cy="122" r="4" fill="#2a2a2a" stroke="#333" strokeWidth="0.5" />
      {/* Snapback hint */}
      <path d="M120 210 C120 220 135 228 150 228 C165 228 180 220 180 210" fill="none" stroke="#2a2a2a" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}

function YetiMockup() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full">
      <defs>
        <linearGradient id="yeti-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="40%" stopColor="#3a3a3a" />
          <stop offset="100%" stopColor="#222" />
        </linearGradient>
      </defs>
      {/* Shadow */}
      <ellipse cx="150" cy="268" rx="38" ry="6" fill="rgba(200,121,65,0.06)" />
      {/* Body */}
      <path d="M115 75 L110 260 L190 260 L185 75Z" fill="url(#yeti-grad)" stroke="#444" strokeWidth="0.5" />
      {/* Top rim */}
      <ellipse cx="150" cy="75" rx="36" ry="8" fill="#333" stroke="#444" strokeWidth="0.5" />
      {/* Bottom */}
      <ellipse cx="150" cy="260" rx="40" ry="6" fill="#2a2a2a" stroke="#444" strokeWidth="0.5" />
      {/* Rubber grip ring */}
      <rect x="112" y="200" width="76" height="15" rx="2" fill="#222" stroke="#333" strokeWidth="0.5" />
      {/* Logo engraving */}
      <line x1="150" y1="110" x2="150" y2="170" stroke="#c87941" strokeWidth="1.5" opacity="0.5" />
      <path d="M142 116 C142 116 139 122 139 128 C139 131 140 132 142 132Z" fill="#c87941" opacity="0.4" />
      <path d="M158 116 C158 116 161 122 161 128 C161 131 160 132 158 132Z" fill="#c87941" opacity="0.4" />
      <path d="M151 110 L151 120 L163 115Z" fill="#c87941" opacity="0.5" />
      <path d="M140 132 C140 132 144 136 150 136 C156 136 160 132 160 132" fill="none" stroke="#c87941" strokeWidth="1" opacity="0.4" />
      <text x="150" y="158" textAnchor="middle" fill="#c9a96e" fontSize="5" fontFamily="serif" letterSpacing="2" opacity="0.5">TOUR DE FORE</text>
    </svg>
  );
}

const mockups = [ZynTinMockup, BucketHatMockup, DivotToolMockup, TShirtMockup, HeadcoverMockup, FlaskMockup, GolfTowelMockup, RopeHatMockup, YetiMockup];

const products = [
  {
    name: "TDF Custom Zyn Tin",
    description: "Brushed aluminum with laser-engraved pitchfork. Magnetic lid. Holds 15 pouches.",
    price: "$35",
    tag: "Best Seller",
    colors: ["Matte Black", "Brushed Gold", "Ember"],
  },
  {
    name: "The Oversized Straw Bucket",
    description: "Huge-brim straw bucket hat with embroidered TDF crest. Maximum shade, maximum presence.",
    price: "$48",
    tag: "Fan Favorite",
    colors: ["Natural Straw", "Dark Straw"],
  },
  {
    name: "Pitchfork Divot Tool",
    description: "Forged steel trident-shaped divot repair tool. Magnetic ball marker with flame logo.",
    price: "$28",
    tag: null,
    colors: ["Blackened Steel", "Antique Brass"],
  },
  {
    name: "\"Hell Is Empty\" Tee",
    description: "Heavyweight cotton. Pitchfork pocket print. Full motto across the back.",
    price: "$42",
    tag: "Dropping Soon",
    colors: ["Black", "Vintage White", "Forest"],
  },
  {
    name: "TDF Leather Headcover",
    description: "Full-grain leather driver headcover. Embossed pitchfork with flames. Fits 460cc.",
    price: "$68",
    tag: null,
    colors: ["Black", "Saddle Tan"],
  },
  {
    name: "The Devil's Flask",
    description: "8oz stainless steel. Laser-etched Tour de Fore crest. Slim profile for any bag pocket.",
    price: "$34",
    tag: null,
    colors: ["Matte Black", "Stainless"],
  },
  {
    name: "TDF Golf Towel",
    description: "Waffle-weave microfiber with carabiner clip. Oversized pitchfork embroidery.",
    price: "$26",
    tag: null,
    colors: ["Black / Ember", "Black / Gold"],
  },
  {
    name: "Snapback Rope Hat",
    description: "Structured five-panel with braided rope detail. Leather TDF patch. Adjustable snap.",
    price: "$38",
    tag: "New",
    colors: ["Black", "Navy", "Olive"],
  },
  {
    name: "Yeti Colster — TDF Edition",
    description: "Custom-engraved Yeti Colster with Tour de Fore crest. Keeps it cold for all 18.",
    price: "$45",
    tag: null,
    colors: ["Black", "Charcoal"],
  },
];

export default function ShopClient() {
  return (
    <main className="bg-white">
      <section className="pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-8">
            <Breadcrumbs crumbs={[{ label: "Shop" }]} />
          </div>
          <FadeIn>
            <div className="flex items-center gap-5 mb-6">
              <div className="w-12 h-px bg-accent" />
              <span className="text-[11px] tracking-[0.15em] uppercase text-accent font-body font-medium">
                Official Gear
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-text leading-tight mb-10">
              Pro
              <br />
              <span className="italic font-light text-text-muted">Shop</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-text-muted text-lg font-body font-light max-w-md leading-[2]">
              Gear for the kind of golfer who plays 36 a day
              and tips like they won the tournament.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-28 md:pb-44">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => {
              const Mockup = mockups[i];
              return (
                <FadeIn key={product.name} delay={0.05 + i * 0.04}>
                  <motion.div
                    className="bg-white rounded-2xl shadow-lg shadow-black/5 border border-border overflow-hidden group"
                    whileHover={{ borderColor: "rgba(207, 128, 24, 0.3)" }}
                  >
                    <div className="relative aspect-[4/3] bg-bg-warm overflow-hidden rounded-t-2xl flex items-center justify-center p-8">
                      <div className="w-full h-full group-hover:scale-105 transition-transform duration-500">
                        <Mockup />
                      </div>

                      {product.tag && (
                        <div className="absolute top-3 left-3">
                          <span className="text-[9px] tracking-[0.25em] uppercase font-body font-medium bg-accent text-white px-3 py-1 rounded-full">
                            {product.tag}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-8">
                      <div className="flex items-start justify-between gap-3 mb-5">
                        <h3 className="font-display text-lg text-text group-hover:text-accent transition-colors duration-300 leading-snug">
                          {product.name}
                        </h3>
                        <span className="font-display text-xl text-accent font-semibold whitespace-nowrap">
                          {product.price}
                        </span>
                      </div>

                      <p className="text-text-dim text-sm font-body font-light leading-[1.9] mb-7">
                        {product.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {product.colors.map((color) => (
                          <span
                            key={color}
                            className="text-[9px] tracking-[0.15em] uppercase font-body text-text-dim border border-border rounded-full px-3 py-1 hover:border-accent/40 hover:text-text-muted transition-colors cursor-pointer"
                          >
                            {color}
                          </span>
                        ))}
                      </div>

                      <div
                        className="w-full py-3.5 bg-gray-100 border border-border rounded-full text-[10px] tracking-[0.3em] uppercase font-body font-medium text-text-dim text-center select-none"
                      >
                        Coming Soon
                      </div>
                    </div>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
