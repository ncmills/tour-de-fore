"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import MulliganButton from "./MulliganButton";

const PRODUCTS = [
  {
    id: "quarterzip",
    name: "TDF Quarter-Zip",
    desc: "Performance stretch fleece. Embroidered pitchfork on chest. Devil-red zipper pull.",
    price: 7200,
    display: "$72",
    svg: (
      <svg viewBox="0 0 200 200">
        <ellipse cx="100" cy="188" rx="55" ry="5" fill="#1a1a1a" opacity="0.3" />
        <path d="M60 55 L60 180 L140 180 L140 55 L125 42 L115 50 L100 45 L85 50 L75 42Z" fill="#1a2a18" stroke="#2a3a28" strokeWidth="1.5" />
        <path d="M60 55 L75 42 L35 30 L30 68 L60 75Z" fill="#1a2a18" stroke="#2a3a28" strokeWidth="1.5" />
        <path d="M140 55 L125 42 L165 30 L170 68 L140 75Z" fill="#1a2a18" stroke="#2a3a28" strokeWidth="1.5" />
        <path d="M85 50 L100 45 L115 50 L110 58 L100 54 L90 58Z" fill="#162214" stroke="#2a3a28" strokeWidth="0.5" />
        <line x1="100" y1="45" x2="100" y2="85" stroke="#EA580C" strokeWidth="2.5" />
        <rect x="97" y="45" width="6" height="8" rx="1" fill="#D4A843" stroke="#B8922F" strokeWidth="0.5" />
        <line x1="100" y1="95" x2="100" y2="108" stroke="#EA580C" strokeWidth="2" />
        <line x1="100" y1="95" x2="95" y2="100" stroke="#EA580C" strokeWidth="1.5" />
        <line x1="100" y1="95" x2="105" y2="100" stroke="#EA580C" strokeWidth="1.5" />
        <text x="100" y="145" textAnchor="middle" fill="#D4A843" fontSize="5.5" fontFamily="serif" letterSpacing="3" fontWeight="bold">TOUR DE FORE</text>
      </svg>
    ),
  },
  {
    id: "zyn-tin",
    name: "TDF Custom Zyn Tin",
    desc: "Brushed aluminum. Laser-engraved pitchfork. Magnetic lid.",
    price: 1400,
    display: "$14",
    svg: (
      <svg viewBox="0 0 200 200">
        <ellipse cx="100" cy="155" rx="52" ry="10" fill="#1a1a1a" opacity="0.3" />
        <rect x="55" y="85" width="90" height="65" rx="14" fill="#888" stroke="#aaa" strokeWidth="1.5" />
        {[0,1,2,3,4,5,6,7].map(i => (
          <line key={i} x1="60" y1={90+i*8} x2="140" y2={90+i*8} stroke="#999" strokeWidth="0.3" opacity="0.5" />
        ))}
        <rect x="53" y="72" width="94" height="20" rx="14" fill="#999" stroke="#bbb" strokeWidth="1" />
        <ellipse cx="100" cy="82" rx="45" ry="8" fill="#aaa" />
        <line x1="62" y1="85" x2="138" y2="85" stroke="#777" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="100" y1="96" x2="100" y2="132" stroke="#EA580C" strokeWidth="2.5" />
        <path d="M92 100 C92 100 89 108 89 114 C89 118 91 120 92 120 L92 100Z" fill="#EA580C" />
        <path d="M108 100 C108 100 111 108 111 114 C111 118 109 120 108 120 L108 100Z" fill="#EA580C" />
        <line x1="100" y1="96" x2="108" y2="100" stroke="#EA580C" strokeWidth="2" />
        <line x1="100" y1="96" x2="92" y2="100" stroke="#EA580C" strokeWidth="2" />
        <text x="100" y="145" textAnchor="middle" fill="#D4A843" fontSize="6" fontFamily="serif" letterSpacing="3" fontWeight="bold">TOUR DE FORE</text>
      </svg>
    ),
  },
  {
    id: "putter",
    name: "TDF Blade Putter",
    desc: "Milled 303 stainless. Devil-red alignment line. Custom pitchfork sole stamp.",
    price: 24900,
    display: "$249",
    svg: (
      <svg viewBox="0 0 200 200">
        <ellipse cx="100" cy="190" rx="40" ry="4" fill="#1a1a1a" opacity="0.3" />
        <line x1="100" y1="30" x2="100" y2="145" stroke="#888" strokeWidth="3" strokeLinecap="round" />
        <line x1="100" y1="30" x2="100" y2="50" stroke="#333" strokeWidth="8" strokeLinecap="round" />
        <rect x="62" y="145" width="76" height="18" rx="4" fill="#666" stroke="#888" strokeWidth="1" />
        <rect x="62" y="145" width="76" height="8" rx="3" fill="#777" />
        <line x1="95" y1="150" x2="105" y2="150" stroke="#EA580C" strokeWidth="2" />
        <line x1="100" y1="158" x2="100" y2="168" stroke="#EA580C" strokeWidth="1.5" />
        <line x1="100" y1="158" x2="96" y2="162" stroke="#EA580C" strokeWidth="1" />
        <line x1="100" y1="158" x2="104" y2="162" stroke="#EA580C" strokeWidth="1" />
        <text x="100" y="180" textAnchor="middle" fill="#D4A843" fontSize="5" fontFamily="serif" letterSpacing="3" fontWeight="bold">TDF</text>
      </svg>
    ),
  },
  {
    id: "bucket-hat",
    name: "TDF Bucket Hat",
    desc: "Washed canvas. Embroidered pitchfork. Wide brim for those long 19th-hole sessions.",
    price: 3400,
    display: "$34",
    svg: (
      <svg viewBox="0 0 200 200">
        <ellipse cx="100" cy="170" rx="70" ry="10" fill="#1a1a1a" opacity="0.3" />
        <ellipse cx="100" cy="130" rx="70" ry="14" fill="#1a1612" stroke="#2a2218" strokeWidth="1.5" />
        <path d="M50 130 C50 130 55 80 100 68 C145 80 150 130 150 130" fill="#1a1612" stroke="#2a2218" strokeWidth="1.5" />
        <path d="M100 68 L100 128" stroke="#2a2218" strokeWidth="0.6" />
        <path d="M75 74 L60 126" stroke="#2a2218" strokeWidth="0.6" />
        <path d="M125 74 L140 126" stroke="#2a2218" strokeWidth="0.6" />
        <line x1="100" y1="88" x2="100" y2="108" stroke="#EA580C" strokeWidth="2" />
        <line x1="100" y1="88" x2="95" y2="93" stroke="#EA580C" strokeWidth="1.5" />
        <line x1="100" y1="88" x2="105" y2="93" stroke="#EA580C" strokeWidth="1.5" />
        <ellipse cx="100" cy="130" rx="65" ry="10" fill="none" stroke="#D4A843" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="100" y="155" textAnchor="middle" fill="#D4A843" fontSize="5.5" fontFamily="serif" letterSpacing="3" fontWeight="bold">TOUR DE FORE</text>
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
        <img
          src="/proshop-photo.png"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
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

      <MulliganButton onClick={() => onBack ? onBack() : (window.location.href = "/?skip=1")} />

      {/* === PRODUCT DISPLAY === */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto", padding: "5rem 1.5rem 4rem" }}>

        {/* PRO SHOP heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <h1 style={{
            fontFamily: "var(--font-shop-circus), serif",
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            color: "#D4A843",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textShadow: "0 2px 12px rgba(212,168,67,0.3)",
            marginBottom: "0.5rem",
          }}>
            Pro Shop
          </h1>
          <p style={{
            fontFamily: "var(--font-shop-script), cursive",
            color: "rgba(255,255,255,0.45)",
            fontSize: "clamp(1rem, 2vw, 1.3rem)",
          }}>
            Spend like you just drank 97 beers over 108 holes and missed every putt.
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
                    fontFamily: "var(--font-shop-circus), serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    marginBottom: "0.4rem",
                    color: "#fff",
                    letterSpacing: "0.04em",
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
                      fontFamily: "var(--font-shop-script), cursive",
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
          <p style={{ fontFamily: "var(--font-shop-circus), serif", color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
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
                <h2 style={{ fontFamily: "var(--font-shop-circus), serif", fontSize: "1.2rem", fontWeight: 600, color: "#D4A843", letterSpacing: "0.06em" }}>Your Cart</h2>
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
