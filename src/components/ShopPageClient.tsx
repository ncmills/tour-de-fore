"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const PRODUCTS = [
  {
    id: "zyn-tin",
    name: "TDF Custom Zyn Tin",
    desc: "Brushed aluminum. Laser-engraved pitchfork. Magnetic lid.",
    price: 1400,
    display: "$14",
    svg: (
      <svg viewBox="0 0 200 200">
        {/* Tin body */}
        <ellipse cx="100" cy="155" rx="52" ry="10" fill="#1a1a1a" opacity="0.3" />
        <rect x="55" y="85" width="90" height="65" rx="14" fill="#888" stroke="#aaa" strokeWidth="1.5" />
        {/* Brushed metal texture */}
        {[0,1,2,3,4,5,6,7].map(i => (
          <line key={i} x1="60" y1={90+i*8} x2="140" y2={90+i*8} stroke="#999" strokeWidth="0.3" opacity="0.5" />
        ))}
        {/* Lid */}
        <rect x="53" y="72" width="94" height="20" rx="14" fill="#999" stroke="#bbb" strokeWidth="1" />
        <ellipse cx="100" cy="82" rx="45" ry="8" fill="#aaa" />
        {/* Magnetic line */}
        <line x1="62" y1="85" x2="138" y2="85" stroke="#777" strokeWidth="1" strokeDasharray="2 2" />
        {/* Pitchfork engraving */}
        <line x1="100" y1="96" x2="100" y2="132" stroke="#EA580C" strokeWidth="2.5" />
        <path d="M92 100 C92 100 89 108 89 114 C89 118 91 120 92 120 L92 100Z" fill="#EA580C" />
        <path d="M108 100 C108 100 111 108 111 114 C111 118 109 120 108 120 L108 100Z" fill="#EA580C" />
        <line x1="100" y1="96" x2="108" y2="100" stroke="#EA580C" strokeWidth="2" />
        <line x1="100" y1="96" x2="92" y2="100" stroke="#EA580C" strokeWidth="2" />
        {/* TDF text */}
        <text x="100" y="145" textAnchor="middle" fill="#D4A843" fontSize="6" fontFamily="serif" letterSpacing="3" fontWeight="bold">TOUR DE FORE</text>
        {/* Highlight */}
        <line x1="62" y1="90" x2="62" y2="140" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "hell-tee",
    name: '"Hell Is Empty" Tee',
    desc: "Heavyweight cotton. Pitchfork pocket print. Full motto on the back.",
    price: 3200,
    display: "$32",
    svg: (
      <svg viewBox="0 0 200 200">
        {/* Shadow */}
        <ellipse cx="100" cy="185" rx="60" ry="6" fill="#1a1a1a" opacity="0.3" />
        {/* T-shirt body */}
        <path d="M65 65 L65 175 L135 175 L135 65 L118 52 L112 60 L100 56 L88 60 L82 52 Z" fill="#111" stroke="#333" strokeWidth="1.5" />
        {/* Left sleeve */}
        <path d="M65 65 L82 52 L40 38 L35 72 L65 80Z" fill="#111" stroke="#333" strokeWidth="1.5" />
        {/* Right sleeve */}
        <path d="M135 65 L118 52 L160 38 L165 72 L135 80Z" fill="#111" stroke="#333" strokeWidth="1.5" />
        {/* Collar V */}
        <path d="M88 60 L100 56 L112 60 L107 66 L100 63 L93 66Z" fill="#0a0a0a" stroke="#333" strokeWidth="0.5" />
        {/* Pocket with pitchfork */}
        <rect x="108" y="80" width="18" height="16" rx="1.5" fill="none" stroke="#333" strokeWidth="1" />
        <line x1="117" y1="83" x2="117" y2="93" stroke="#EA580C" strokeWidth="1.5" />
        <line x1="117" y1="83" x2="113" y2="86" stroke="#EA580C" strokeWidth="1" />
        <line x1="117" y1="83" x2="121" y2="86" stroke="#EA580C" strokeWidth="1" />
        {/* Back motto text (shown as front preview) */}
        <text x="100" y="125" textAnchor="middle" fill="#333" fontSize="5.5" fontFamily="serif" letterSpacing="1">HELL IS EMPTY</text>
        <text x="100" y="134" textAnchor="middle" fill="#333" fontSize="4.5" fontFamily="serif" letterSpacing="1">AND ALL THE DEVILS</text>
        <text x="100" y="142" textAnchor="middle" fill="#333" fontSize="4.5" fontFamily="serif" letterSpacing="1">ARE HERE</text>
        {/* Fabric folds */}
        <path d="M80 100 Q85 120 80 140" fill="none" stroke="#1a1a1a" strokeWidth="0.8" />
        <path d="M120 95 Q115 115 120 135" fill="none" stroke="#1a1a1a" strokeWidth="0.8" />
      </svg>
    ),
  },
  {
    id: "snapback",
    name: "Snapback Rope Hat",
    desc: "Structured five-panel. Braided rope detail. Leather TDF patch.",
    price: 3800,
    display: "$38",
    svg: (
      <svg viewBox="0 0 200 200">
        {/* Shadow */}
        <ellipse cx="100" cy="175" rx="60" ry="8" fill="#1a1a1a" opacity="0.3" />
        {/* Brim */}
        <path d="M30 130 C30 130 50 145 100 148 C150 145 170 130 170 130 C170 130 155 140 100 143 C45 140 30 130 30 130Z" fill="#1a1612" stroke="#2a2218" strokeWidth="1" />
        {/* Crown */}
        <path d="M55 130 C55 130 60 70 100 58 C140 70 145 130 145 130 C145 130 130 136 100 138 C70 136 55 130 55 130Z" fill="#1a1612" stroke="#2a2218" strokeWidth="1" />
        {/* Panel lines */}
        <path d="M100 58 L100 138" stroke="#2a2218" strokeWidth="0.8" />
        <path d="M78 66 L68 134" stroke="#2a2218" strokeWidth="0.8" />
        <path d="M122 66 L132 134" stroke="#2a2218" strokeWidth="0.8" />
        {/* Rope detail */}
        <path d="M55 127 C55 127 70 122 100 120 C130 122 145 127 145 127" fill="none" stroke="#EA580C" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M55 127 C55 127 70 122 100 120 C130 122 145 127 145 127" fill="none" stroke="#D4A843" strokeWidth="1.5" strokeDasharray="4 3" />
        {/* Leather TDF patch */}
        <rect x="82" y="82" width="36" height="26" rx="4" fill="#3a2a1a" stroke="#5a4a3a" strokeWidth="1" />
        <text x="100" y="100" textAnchor="middle" fill="#EA580C" fontSize="14" fontFamily="serif" fontWeight="bold" letterSpacing="3">TDF</text>
        {/* Button top */}
        <circle cx="100" cy="60" r="4" fill="#2a2218" stroke="#3a3228" strokeWidth="1" />
        {/* Snapback strap hint */}
        <path d="M60 135 C65 140 75 143 80 143" fill="none" stroke="#2a2218" strokeWidth="1.5" />
        <path d="M140 135 C135 140 125 143 120 143" fill="none" stroke="#2a2218" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "headcover",
    name: "TDF Leather Headcover",
    desc: "Full-grain leather driver headcover. Embossed pitchfork with flames.",
    price: 6500,
    display: "$65",
    svg: (
      <svg viewBox="0 0 200 200">
        <defs>
          <linearGradient id="leather" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a3520" />
            <stop offset="100%" stopColor="#2a1a0a" />
          </linearGradient>
        </defs>
        {/* Shadow */}
        <ellipse cx="100" cy="185" rx="35" ry="6" fill="#1a1a1a" opacity="0.3" />
        {/* Headcover body */}
        <path d="M72 55 C62 55 52 85 52 130 C52 170 65 180 100 180 C135 180 148 170 148 130 C148 85 138 55 128 55 C118 55 112 50 100 50 C88 50 82 55 72 55Z" fill="url(#leather)" stroke="#5a4a3a" strokeWidth="1.5" />
        {/* Stitching circle */}
        <ellipse cx="100" cy="120" rx="32" ry="32" fill="none" stroke="#5a4a3a" strokeWidth="1" strokeDasharray="3 2" />
        {/* Pitchfork embossed */}
        <line x1="100" y1="96" x2="100" y2="144" stroke="#EA580C" strokeWidth="2.5" opacity="0.7" />
        <path d="M92 102 C92 102 88 112 88 120 C88 125 91 127 92 127Z" fill="#EA580C" opacity="0.6" />
        <path d="M108 102 C108 102 112 112 112 120 C112 125 109 127 108 127Z" fill="#EA580C" opacity="0.6" />
        <line x1="100" y1="96" x2="92" y2="102" stroke="#EA580C" strokeWidth="2" opacity="0.7" />
        <line x1="100" y1="96" x2="108" y2="102" stroke="#EA580C" strokeWidth="2" opacity="0.7" />
        {/* Flame accents */}
        <path d="M86 130 C84 122 80 118 82 112 C84 118 88 120 86 130Z" fill="#EA580C" opacity="0.3" />
        <path d="M114 130 C116 122 120 118 118 112 C116 118 112 120 114 130Z" fill="#EA580C" opacity="0.3" />
        {/* TDF text */}
        <text x="100" y="158" textAnchor="middle" fill="#EA580C" fontSize="8" fontFamily="serif" letterSpacing="4" opacity="0.6" fontWeight="bold">TDF</text>
        {/* Leather highlight */}
        <path d="M68 70 C64 90 60 110 62 130" fill="none" stroke="#5a4a3a" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
        {/* Fleece lining peek */}
        <path d="M72 55 C80 58 92 52 100 50 C108 52 120 58 128 55" fill="none" stroke="#8a7a6a" strokeWidth="2" />
      </svg>
    ),
  },
];

type CartItem = { id: string; name: string; price: number; quantity: number };

export default function ShopPageClient({ onBack }: { onBack?: () => void }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addToCart = (product: typeof PRODUCTS[number]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev.flatMap((i) => {
        if (i.id !== id) return [i];
        const qty = i.quantity + delta;
        return qty <= 0 ? [] : [{ ...i, quantity: qty }];
      })
    );
  };

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity })),
          successUrl: `${window.location.origin}/shop/success`,
          cancelUrl: `${window.location.origin}/shop`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "#0f1a0f", color: "#fff", position: "relative", overflow: "hidden" }}>

      {/* === PRO SHOP ROOM BACKGROUND === */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", display: "block" }}>
          <defs>
            <linearGradient id="ps-wall" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a2a18" />
              <stop offset="100%" stopColor="#0f1a0f" />
            </linearGradient>
            <linearGradient id="ps-floor" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2a1d10" />
              <stop offset="100%" stopColor="#1a1008" />
            </linearGradient>
            <radialGradient id="ps-spot1" cx="30%" cy="20%">
              <stop offset="0%" stopColor="#f5c842" stopOpacity="0.06" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="ps-spot2" cx="70%" cy="20%">
              <stop offset="0%" stopColor="#f5c842" stopOpacity="0.06" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          {/* Walls */}
          <rect x="0" y="0" width="1200" height="520" fill="url(#ps-wall)" />
          <rect x="0" y="0" width="1200" height="520" fill="url(#ps-spot1)" />
          <rect x="0" y="0" width="1200" height="520" fill="url(#ps-spot2)" />
          {/* Wainscoting */}
          <rect x="0" y="300" width="1200" height="220" fill="#162214" stroke="#1e2e1c" strokeWidth="0.5" />
          <line x1="0" y1="300" x2="1200" y2="300" stroke="#2a3a28" strokeWidth="2" />
          {/* Floor */}
          <rect x="0" y="520" width="1200" height="280" fill="url(#ps-floor)" />
          <line x1="0" y1="520" x2="1200" y2="520" stroke="#3a2a18" strokeWidth="2" />
          {/* Floor boards */}
          {[0,150,300,450,600,750,900,1050].map(x => (
            <line key={x} x1={x} y1="520" x2={x} y2="800" stroke="#2a1d10" strokeWidth="0.5" opacity="0.3" />
          ))}
          {/* "PRO SHOP" sign on wall */}
          <rect x="420" y="40" width="360" height="60" rx="6" fill="#1a2a18" stroke="#2a3a28" strokeWidth="2" />
          <text x="600" y="80" textAnchor="middle" fill="#D4A843" fontSize="32" fontFamily="serif" letterSpacing="8" fontWeight="bold">PRO SHOP</text>
          {/* Display shelf */}
          <rect x="80" y="180" width="1040" height="6" rx="2" fill="#2a1d10" />
          <rect x="80" y="180" width="1040" height="3" fill="#3a2a18" opacity="0.5" />
          {/* Golf bag decoration in corner */}
          <rect x="50" y="200" width="30" height="300" rx="8" fill="#2a1a0a" stroke="#3a2a18" strokeWidth="1" />
          <line x1="60" y1="200" x2="55" y2="150" stroke="#555" strokeWidth="2" />
          <line x1="65" y1="200" x2="62" y2="140" stroke="#666" strokeWidth="2" />
          <line x1="70" y1="200" x2="75" y2="155" stroke="#555" strokeWidth="2" />
        </svg>
      </div>

      {/* Cart button */}
      <div style={{ position: "fixed", top: "1.2rem", right: "clamp(1.5rem, 6vw, 4rem)", zIndex: 100 }}>
        <button
          onClick={() => setCartOpen(true)}
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(212,168,67,0.3)",
            borderRadius: "8px",
            cursor: "pointer",
            color: "#D4A843",
            fontFamily: "inherit",
            fontSize: "0.9rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            padding: "8px 16px",
          }}
        >
          🛒 Cart {totalItems > 0 && <span style={{ color: "#fff", background: "#EA580C", borderRadius: "10px", padding: "2px 8px", marginLeft: "6px", fontSize: "0.8rem" }}>{totalItems}</span>}
        </button>
      </div>

      {/* Back link — goes to bar scene if onBack provided */}
      <div style={{ position: "fixed", top: "1.2rem", left: "clamp(1.5rem, 6vw, 4rem)", zIndex: 100 }}>
        <button
          onClick={() => onBack ? onBack() : (window.location.href = "/?skip=1")}
          style={{ background: "none", border: "none", fontFamily: "var(--font-script), cursive", fontSize: "1.1rem", color: "rgba(255,255,255,0.4)", cursor: "pointer", padding: 0 }}
        >
          ← back
        </button>
      </div>

      {/* === PRODUCT DISPLAY === */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto", padding: "5rem 1.5rem 4rem" }}>

        {/* Subtitle only — "PRO SHOP" is on the wall sign in the background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", fontStyle: "italic" }}>
            Gear for the kind of golfer who plays 36 a day and tips like they won the tournament.
          </p>
        </motion.div>

        {/* Products scattered like in a real shop */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "2rem",
        }}>
          {PRODUCTS.map((p, i) => {
            const inCart = cart.find((c) => c.id === p.id);
            const rotations = [-1.5, 0.8, -0.5, 1.2];
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40, rotate: rotations[i] * 2 }}
                animate={{ opacity: 1, y: 0, rotate: rotations[i] }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
                whileHover={{ scale: 1.03, rotate: 0, y: -4 }}
                style={{
                  background: "rgba(20,30,20,0.85)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "16px",
                  border: "1px solid rgba(212,168,67,0.15)",
                  overflow: "hidden",
                  cursor: "default",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  transition: "box-shadow 0.3s",
                }}
              >
                {/* Product illustration */}
                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  padding: "2rem 2.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottom: "1px solid rgba(212,168,67,0.08)",
                }}>
                  <div style={{ width: "180px", height: "180px" }}>
                    {p.svg}
                  </div>
                </div>

                {/* Product info */}
                <div style={{ padding: "1.5rem" }}>
                  <h3 style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    marginBottom: "0.4rem",
                    color: "#fff",
                  }}>
                    {p.name}
                  </h3>
                  <p style={{
                    fontSize: "0.82rem",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.6,
                    marginBottom: "1.2rem",
                  }}>
                    {p.desc}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{
                      fontSize: "1.4rem",
                      fontWeight: 800,
                      color: "#D4A843",
                      fontFamily: "var(--font-display), sans-serif",
                    }}>
                      {p.display}
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.93 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => addToCart(p)}
                      style={{
                        background: inCart ? "rgba(234,88,12,0.2)" : "#EA580C",
                        color: "#fff",
                        border: inCart ? "1px solid #EA580C" : "none",
                        borderRadius: "8px",
                        padding: "0.6rem 1.4rem",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {inCart ? `In Cart (${inCart.quantity})` : "Add to Cart"}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Price tags scattered decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            textAlign: "center",
            marginTop: "3rem",
            padding: "1.5rem",
            borderTop: "1px solid rgba(212,168,67,0.1)",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
            ALL SALES SUPPORT THE ANNUAL TOUR DE FORE ODYSSEY
          </p>
        </motion.div>
      </div>

      {/* === CART DRAWER === */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200 }}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0,
                width: "min(420px, 100vw)",
                background: "#0f1a0f",
                borderLeft: "1px solid rgba(212,168,67,0.15)",
                zIndex: 201,
                display: "flex", flexDirection: "column",
                padding: "2rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#D4A843" }}>Your Cart</h2>
                <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
              </div>

              {cart.length === 0 ? (
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem" }}>Your cart is empty.</p>
              ) : (
                <>
                  <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {cart.map((item) => (
                      <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(212,168,67,0.08)", paddingBottom: "1.2rem" }}>
                        <div>
                          <p style={{ fontSize: "0.95rem", fontWeight: 500, marginBottom: "0.3rem" }}>{item.name}</p>
                          <p style={{ fontSize: "0.8rem", color: "#D4A843" }}>${((item.price * item.quantity) / 100).toFixed(2)}</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                          <button onClick={() => updateQty(item.id, -1)} style={{ background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.2)", color: "#fff", width: "28px", height: "28px", borderRadius: "6px", cursor: "pointer" }}>−</button>
                          <span style={{ fontSize: "0.9rem", minWidth: "16px", textAlign: "center" }}>{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, 1)} style={{ background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.2)", color: "#fff", width: "28px", height: "28px", borderRadius: "6px", cursor: "pointer" }}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: "1px solid rgba(212,168,67,0.15)", paddingTop: "1.5rem", marginTop: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                      <span style={{ color: "rgba(255,255,255,0.5)" }}>Total</span>
                      <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "#D4A843" }}>${(totalPrice / 100).toFixed(2)}</span>
                    </div>
                    {error && <p style={{ color: "#f87171", fontSize: "0.8rem", marginBottom: "1rem" }}>{error}</p>}
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCheckout}
                      disabled={loading}
                      style={{
                        width: "100%", padding: "1rem",
                        background: "#EA580C", color: "#fff",
                        border: "none", borderRadius: "8px",
                        fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.06em",
                        cursor: loading ? "not-allowed" : "pointer",
                        opacity: loading ? 0.6 : 1,
                      }}
                    >
                      {loading ? "Redirecting..." : "Checkout with Stripe →"}
                    </motion.button>
                    <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: "0.8rem" }}>
                      Powered by Stripe · Secure checkout
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
