"use client";

import { motion } from "motion/react";
import FadeIn from "./FadeIn";
import Logo from "./Logo";

const products = [
  {
    name: "Tour de Fore Zyn Container",
    description: "Custom brushed aluminum zyn container. Engraved pitchfork logo. Holds 15 pouches. The only accessory that matters on the course.",
    price: "$35",
    tag: "Best Seller",
    colors: ["Matte Black", "Brushed Gold", "Ember Orange"],
  },
  {
    name: "The Bucket Hat",
    description: "Oversized straw bucket hat with embroidered Tour de Fore logo. UV protection meets unhinged style. Massive brim energy.",
    price: "$45",
    tag: "New",
    colors: ["Natural Straw", "Black Straw"],
  },
  {
    name: "Devil's Divot Tool",
    description: "Forged steel divot tool shaped like a miniature pitchfork. Magnetic ball marker with the flame logo. Fix your marks, leave your mark.",
    price: "$28",
    tag: null,
    colors: ["Blackened Steel", "Antique Brass"],
  },
  {
    name: "The Headcover",
    description: "Premium leather driver headcover. Embossed pitchfork with flames. Fits up to 460cc. Let them know you're here.",
    price: "$65",
    tag: null,
    colors: ["Black Leather", "Saddle Tan"],
  },
  {
    name: "Hell Is Empty Tee",
    description: "Heavyweight cotton tee. \"Hell is empty, and all the devils are here\" across the back. Pitchfork logo front pocket print.",
    price: "$40",
    tag: "Dropping Soon",
    colors: ["Black", "Vintage White", "Forest Green"],
  },
  {
    name: "The Flask",
    description: "8oz stainless steel flask. Laser-etched with the full Tour de Fore crest. Slim profile fits any golf bag pocket.",
    price: "$32",
    tag: null,
    colors: ["Matte Black", "Stainless"],
  },
];

export default function ShopClient() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="flex items-center gap-5 mb-4">
              <div className="w-12 h-px bg-ember-dim" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-ember-dim font-body font-medium">
                Official Gear
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-text leading-[0.9] mb-6">
              The
              <br />
              <span className="italic font-light text-text-muted">Pro Shop</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-text-muted text-lg font-body font-light max-w-xl leading-relaxed">
              Gear for the crew. Every piece designed for the kind of golfer who plays
              36 holes, eats like a king, and doesn&rsquo;t remember how they got home.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-24 md:pb-36">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <FadeIn key={product.name} delay={0.1 + i * 0.06}>
                <motion.div
                  className="bg-bg-card border border-border/40 rounded-sm overflow-hidden group card-hover relative"
                  whileHover={{ borderColor: "rgba(200, 121, 65, 0.25)" }}
                >
                  {/* Placeholder image area */}
                  <div className="relative aspect-square bg-surface overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Logo className="w-20 h-20 text-border-light group-hover:text-ember/20 transition-colors duration-700" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent opacity-50" />

                    {product.tag && (
                      <div className="absolute top-4 left-4">
                        <span className="text-[9px] tracking-[0.3em] uppercase font-body font-medium bg-ember/90 text-white px-3 py-1.5 rounded-sm">
                          {product.tag}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="font-display text-xl text-text group-hover:text-ember transition-colors duration-300">
                        {product.name}
                      </h3>
                      <span className="font-display text-2xl text-gold font-semibold whitespace-nowrap">
                        {product.price}
                      </span>
                    </div>

                    <p className="text-text-dim text-sm font-body font-light leading-relaxed mb-4">
                      {product.description}
                    </p>

                    {/* Color options */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {product.colors.map((color) => (
                        <span
                          key={color}
                          className="text-[9px] tracking-[0.2em] uppercase font-body text-text-dim border border-border/50 px-2.5 py-1 rounded-sm hover:border-ember/30 hover:text-text-muted transition-colors cursor-pointer"
                        >
                          {color}
                        </span>
                      ))}
                    </div>

                    <motion.button
                      className="w-full py-3 bg-surface border border-border/50 rounded-sm text-[10px] tracking-[0.3em] uppercase font-body font-medium text-text-muted hover:text-ember hover:border-ember/30 transition-all duration-300"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
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

      {/* Motto banner */}
      <section className="py-16 border-t border-border/30 texture-lines">
        <div className="text-center">
          <p className="font-display text-2xl md:text-3xl italic text-text-dim font-light">
            &ldquo;Hell is empty, and all the devils are here.&rdquo;
          </p>
        </div>
      </section>
    </main>
  );
}
