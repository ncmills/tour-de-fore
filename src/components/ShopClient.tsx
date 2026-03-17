"use client";

import { motion } from "motion/react";
import FadeIn from "./FadeIn";
import Logo from "./Logo";

const products = [
  {
    name: "TDF Custom Zyn Tin",
    description: "Brushed aluminum container with laser-engraved pitchfork logo. Magnetic lid. Holds 15 pouches.",
    price: "$35",
    tag: "Best Seller",
    colors: ["Matte Black", "Brushed Gold", "Ember"],
    emoji: "🔥",
  },
  {
    name: "The Oversized Straw Bucket",
    description: "Huge-brim straw bucket hat with embroidered TDF crest. Maximum shade, maximum presence.",
    price: "$48",
    tag: "Fan Favorite",
    colors: ["Natural Straw", "Dark Straw"],
    emoji: "🎩",
  },
  {
    name: "Pitchfork Divot Tool",
    description: "Forged steel trident-shaped divot repair tool. Magnetic ball marker with flame logo.",
    price: "$28",
    tag: null,
    colors: ["Blackened Steel", "Antique Brass"],
    emoji: "🔱",
  },
  {
    name: "\"Hell Is Empty\" Tee",
    description: "Heavyweight 100% cotton. Pitchfork logo on front pocket. Full motto across the back.",
    price: "$42",
    tag: "Dropping Soon",
    colors: ["Black", "Vintage White", "Forest"],
    emoji: "👕",
  },
  {
    name: "TDF Leather Headcover",
    description: "Full-grain leather driver headcover. Embossed pitchfork with flames. Fits 460cc.",
    price: "$68",
    tag: null,
    colors: ["Black", "Saddle Tan"],
    emoji: "🏌️",
  },
  {
    name: "The Devil's Flask",
    description: "8oz stainless steel. Laser-etched Tour de Fore crest. Slim profile for any bag pocket.",
    price: "$34",
    tag: null,
    colors: ["Matte Black", "Stainless"],
    emoji: "🥃",
  },
  {
    name: "TDF Golf Towel",
    description: "Waffle-weave microfiber with carabiner clip. Oversized pitchfork embroidery. Absurdly plush.",
    price: "$26",
    tag: null,
    colors: ["Black / Ember", "Black / Gold"],
    emoji: "🏳️",
  },
  {
    name: "Snapback Rope Hat",
    description: "Structured five-panel with braided rope detail. Leather TDF patch. Adjustable snapback.",
    price: "$38",
    tag: "New",
    colors: ["Black", "Navy", "Olive"],
    emoji: "🧢",
  },
  {
    name: "Yeti Colster — TDF Edition",
    description: "Custom-engraved Yeti Colster with Tour de Fore crest. Keeps it cold for 18 holes and beyond.",
    price: "$45",
    tag: null,
    colors: ["Black", "Charcoal"],
    emoji: "🍺",
  },
];

export default function ShopClient() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="flex items-center gap-5 mb-6">
              <div className="w-12 h-px bg-ember-dim" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-ember-dim font-body font-medium">
                Official Gear
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-text leading-[0.9] mb-8">
              Pro
              <br />
              <span className="italic font-light text-text-muted">Shop</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-text-muted text-lg font-body font-light max-w-md leading-relaxed">
              Gear for the kind of golfer who plays 36 a day
              and tips like they won the tournament.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-28 md:pb-44">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <FadeIn key={product.name} delay={0.05 + i * 0.04}>
                <motion.div
                  className="bg-bg-card border border-border/30 rounded-sm overflow-hidden group card-hover"
                  whileHover={{ borderColor: "rgba(200, 121, 65, 0.2)" }}
                >
                  {/* Product visual */}
                  <div className="relative aspect-[4/3] bg-surface overflow-hidden flex items-center justify-center">
                    <span className="text-7xl group-hover:scale-110 transition-transform duration-500">
                      {product.emoji}
                    </span>
                    <div className="absolute bottom-3 right-3 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                      <Logo className="w-12 h-12 text-ember" />
                    </div>

                    {product.tag && (
                      <div className="absolute top-3 left-3">
                        <span className="text-[9px] tracking-[0.25em] uppercase font-body font-medium bg-ember/90 text-white px-3 py-1.5 rounded-sm">
                          {product.tag}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-display text-lg text-text group-hover:text-ember transition-colors duration-300 leading-snug">
                        {product.name}
                      </h3>
                      <span className="font-display text-xl text-gold font-semibold whitespace-nowrap">
                        {product.price}
                      </span>
                    </div>

                    <p className="text-text-dim text-sm font-body font-light leading-relaxed mb-5">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {product.colors.map((color) => (
                        <span
                          key={color}
                          className="text-[9px] tracking-[0.15em] uppercase font-body text-text-dim border border-border/40 px-2 py-1 rounded-sm hover:border-ember/30 hover:text-text-muted transition-colors cursor-pointer"
                        >
                          {color}
                        </span>
                      ))}
                    </div>

                    <motion.button
                      className="w-full py-3 bg-surface border border-border/40 rounded-sm text-[10px] tracking-[0.3em] uppercase font-body font-medium text-text-muted hover:text-ember hover:border-ember/30 transition-all duration-300"
                      whileTap={{ scale: 0.98 }}
                    >
                      Coming Soon
                    </motion.button>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
