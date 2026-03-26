"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import BlackPage from "./BlackPage";

const PRODUCTS = [
  { id: "zyn-tin",      name: "TDF Custom Zyn Tin",       desc: "Brushed aluminum. Laser-engraved pitchfork. Magnetic lid.", price: 1400, display: "$14" },
  { id: "hell-tee",     name: '"Hell Is Empty" Tee',       desc: "Heavyweight cotton. Pitchfork pocket print. Full motto on the back.", price: 3200, display: "$32" },
  { id: "snapback",     name: "Snapback Rope Hat",          desc: "Structured five-panel. Braided rope detail. Leather TDF patch.", price: 3800, display: "$38" },
  { id: "headcover",    name: "TDF Leather Headcover",      desc: "Full-grain leather driver headcover. Embossed pitchfork with flames.", price: 6500, display: "$65" },
];

type CartItem = { id: string; name: string; price: number; quantity: number };

export default function ShopPageClient() {
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
    <BlackPage heading="Shop">
      {/* Cart button — fixed top-right */}
      <div style={{ position: "fixed", top: "1.2rem", right: "clamp(1.5rem, 6vw, 6rem)", zIndex: 100 }}>
        <button
          onClick={() => setCartOpen(true)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontFamily: "inherit", fontSize: "0.85rem", letterSpacing: "0.08em" }}
        >
          Cart {totalItems > 0 && <span style={{ color: "#fff" }}>({totalItems})</span>}
        </button>
      </div>

      {/* Product grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "4rem" }}>
        {PRODUCTS.map((p) => {
          const inCart = cart.find((i) => i.id === p.id);
          return (
            <div key={p.id} style={{ background: "#000", padding: "2rem" }}>
              <p style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", fontWeight: 600, marginBottom: "0.5rem" }}>{p.name}</p>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.2rem", lineHeight: 1.5 }}>{p.desc}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "1.2rem", fontWeight: 700 }}>{p.display}</span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(p)}
                  style={{
                    background: inCart ? "rgba(255,255,255,0.1)" : "#fff",
                    color: inCart ? "#fff" : "#000",
                    border: "none",
                    borderRadius: "4px",
                    padding: "0.5rem 1.2rem",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {inCart ? `In Cart (${inCart.quantity})` : "Add to Cart"}
                </motion.button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart drawer */}
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
              style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(420px, 100vw)", background: "#0a0a0a", borderLeft: "1px solid rgba(255,255,255,0.1)", zIndex: 201, display: "flex", flexDirection: "column", padding: "2rem" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 600 }}>Cart</h2>
                <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
              </div>

              {cart.length === 0 ? (
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem" }}>Your cart is empty.</p>
              ) : (
                <>
                  <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {cart.map((item) => (
                      <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1.2rem" }}>
                        <div>
                          <p style={{ fontSize: "0.95rem", fontWeight: 500, marginBottom: "0.3rem" }}>{item.name}</p>
                          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>${((item.price * item.quantity) / 100).toFixed(2)}</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                          <button onClick={() => updateQty(item.id, -1)} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", width: "28px", height: "28px", borderRadius: "4px", cursor: "pointer" }}>−</button>
                          <span style={{ fontSize: "0.9rem", minWidth: "16px", textAlign: "center" }}>{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, 1)} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", width: "28px", height: "28px", borderRadius: "4px", cursor: "pointer" }}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem", marginTop: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                      <span style={{ color: "rgba(255,255,255,0.5)" }}>Total</span>
                      <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>${(totalPrice / 100).toFixed(2)}</span>
                    </div>
                    {error && <p style={{ color: "#f87171", fontSize: "0.8rem", marginBottom: "1rem" }}>{error}</p>}
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCheckout}
                      disabled={loading}
                      style={{ width: "100%", padding: "1rem", background: "#fff", color: "#000", border: "none", borderRadius: "6px", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.06em", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}
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
    </BlackPage>
  );
}
