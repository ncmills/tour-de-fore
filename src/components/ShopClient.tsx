"use client";

import Image from "next/image";
import { motion } from "motion/react";
import FadeIn from "./FadeIn";
import Logo from "./Logo";

const products = [
  {
    name: "TDF Custom Zyn Tin",
    description: "Brushed aluminum with laser-engraved pitchfork. Magnetic lid. Holds 15 pouches.",
    price: "$35",
    tag: "Best Seller",
    colors: ["Matte Black", "Brushed Gold", "Ember"],
    image: "https://glassandgrowlers.com/wp-content/uploads/2020/06/Stainless-Steel-Hip-Flask-8-oz-Matte-Black-01.jpg",
    useAlt: true,
  },
  {
    name: "The Oversized Straw Bucket",
    description: "Huge-brim straw bucket hat with embroidered TDF crest. Maximum shade, maximum presence.",
    price: "$48",
    tag: "Fan Favorite",
    colors: ["Natural Straw", "Dark Straw"],
    image: null,
  },
  {
    name: "Pitchfork Divot Tool",
    description: "Forged steel trident-shaped divot repair tool. Magnetic ball marker with flame logo.",
    price: "$28",
    tag: null,
    colors: ["Blackened Steel", "Antique Brass"],
    image: "https://fullmetalmarkers.com/cdn/shop/files/FullSizeRender_585cb526-265a-403b-af0f-7fcb8914e2d7_300x300.jpg?v=1693576492",
  },
  {
    name: "\"Hell Is Empty\" Tee",
    description: "Heavyweight cotton. Pitchfork pocket print. Full motto across the back.",
    price: "$42",
    tag: "Dropping Soon",
    colors: ["Black", "Vintage White", "Forest"],
    image: null,
  },
  {
    name: "TDF Leather Headcover",
    description: "Full-grain leather driver headcover. Embossed pitchfork with flames. Fits 460cc.",
    price: "$68",
    tag: null,
    colors: ["Black", "Saddle Tan"],
    image: null,
  },
  {
    name: "The Devil's Flask",
    description: "8oz stainless steel. Laser-etched Tour de Fore crest. Slim profile for any bag pocket.",
    price: "$34",
    tag: null,
    colors: ["Matte Black", "Stainless"],
    image: "https://glassandgrowlers.com/wp-content/uploads/2020/06/Stainless-Steel-Hip-Flask-8-oz-Matte-Black-01.jpg",
  },
  {
    name: "TDF Golf Towel",
    description: "Waffle-weave microfiber with carabiner clip. Oversized pitchfork embroidery.",
    price: "$26",
    tag: null,
    colors: ["Black / Ember", "Black / Gold"],
    image: null,
  },
  {
    name: "Snapback Rope Hat",
    description: "Structured five-panel with braided rope detail. Leather TDF patch. Adjustable snap.",
    price: "$38",
    tag: "New",
    colors: ["Black", "Navy", "Olive"],
    image: "https://www.mammothheadwear.com/cdn/shop/files/Blank_black_rope_1_c2d9526e-7069-4ff2-b311-6738b9ab5c40_2000x.jpg?v=1705110552",
  },
  {
    name: "Yeti Colster — TDF Edition",
    description: "Custom-engraved Yeti Colster with Tour de Fore crest. Keeps it cold for all 18.",
    price: "$45",
    tag: null,
    colors: ["Black", "Charcoal"],
    image: null,
  },
];

function ProductImage({ product }: { product: typeof products[0] }) {
  if (product.image) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
        {/* Logo overlay */}
        <div className="absolute bottom-4 right-4 opacity-60 group-hover:opacity-90 transition-opacity duration-500">
          <Logo className="w-10 h-10 text-ember drop-shadow-lg" />
        </div>
        {product.tag && (
          <div className="absolute top-4 left-4">
            <span className="text-[9px] tracking-[0.25em] uppercase font-body font-medium bg-ember/90 text-white px-3 py-1.5 rounded-sm">
              {product.tag}
            </span>
          </div>
        )}
      </div>
    );
  }

  // Fallback: dark product-style background with prominent logo
  return (
    <div className="relative aspect-[4/3] bg-gradient-to-br from-surface via-bg-card to-bg-elevated overflow-hidden flex items-center justify-center">
      <div className="group-hover:scale-110 transition-transform duration-500">
        <Logo className="w-24 h-24 text-ember/20 group-hover:text-ember/35 transition-colors duration-700" />
      </div>
      <div className="absolute bottom-3 left-3 right-3 text-center">
        <span className="text-[8px] tracking-[0.3em] uppercase text-text-dim/40 font-body">
          Product photo coming soon
        </span>
      </div>
      {product.tag && (
        <div className="absolute top-4 left-4">
          <span className="text-[9px] tracking-[0.25em] uppercase font-body font-medium bg-ember/90 text-white px-3 py-1.5 rounded-sm">
            {product.tag}
          </span>
        </div>
      )}
    </div>
  );
}

export default function ShopClient() {
  return (
    <main>
      <section className="pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="flex items-center gap-5 mb-8">
              <div className="w-12 h-px bg-ember-dim" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-ember-dim font-body font-medium">
                Official Gear
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-text leading-[0.9] mb-12">
              Pro
              <br />
              <span className="italic font-light text-text-muted">Shop</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-text-muted text-lg font-body font-light max-w-md">
              Gear for the kind of golfer who plays 36 a day
              and tips like they won the tournament.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-28 md:pb-44">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <FadeIn key={product.name} delay={0.05 + i * 0.04}>
                <motion.div
                  className="bg-bg-card border border-border/30 rounded-sm overflow-hidden group card-hover"
                  whileHover={{ borderColor: "rgba(200, 121, 65, 0.2)" }}
                >
                  <ProductImage product={product} />

                  <div className="p-7">
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <h3 className="font-display text-lg text-text group-hover:text-ember transition-colors duration-300 leading-snug">
                        {product.name}
                      </h3>
                      <span className="font-display text-xl text-gold font-semibold whitespace-nowrap">
                        {product.price}
                      </span>
                    </div>

                    <p className="text-text-dim text-sm font-body font-light mb-6">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-7">
                      {product.colors.map((color) => (
                        <span
                          key={color}
                          className="text-[9px] tracking-[0.15em] uppercase font-body text-text-dim border border-border/40 px-2.5 py-1.5 rounded-sm hover:border-ember/30 hover:text-text-muted transition-colors cursor-pointer"
                        >
                          {color}
                        </span>
                      ))}
                    </div>

                    <motion.button
                      className="w-full py-4 bg-surface border border-border/40 rounded-sm text-[10px] tracking-[0.3em] uppercase font-body font-medium text-text-muted hover:text-ember hover:border-ember/30 transition-all duration-300"
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
