"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import MulliganButton from "./MulliganButton";
import { SHOP_PRODUCTS } from "@/lib/printful";
import type { ShopProduct } from "@/lib/printful";

type CartItem = {
  productId: string;
  name: string;
  color: string;
  size?: string;
  price: number;
  quantity: number;
};

function ProductCard({
  product,
  onAdd,
  cartCount,
}: {
  product: ShopProduct;
  onAdd: (color: string, size?: string) => void;
  cartCount: number;
}) {
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[0] || undefined);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      style={{
        background: "rgba(20,30,20,0.85)",
        backdropFilter: "blur(8px)",
        borderRadius: 16,
        border: "1px solid rgba(212,168,67,0.15)",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      {/* Product image from Printful */}
      <div style={{
        background: "rgba(255,255,255,0.03)",
        padding: "1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: "1px solid rgba(212,168,67,0.08)",
        minHeight: 200,
      }}>
        <img
          src={product.colorPreviews[color] || product.previewUrl}
          alt={product.name}
          style={{ maxWidth: "100%", maxHeight: 180, objectFit: "contain" }}
        />
      </div>

      {/* Product info */}
      <div style={{ padding: "1.25rem 1.5rem" }}>
        <h3 style={{
          fontFamily: "var(--font-shop-circus), serif",
          fontSize: "1.1rem",
          fontWeight: 700,
          marginBottom: "0.3rem",
          color: "#fff",
          letterSpacing: "0.04em",
        }}>
          {product.name}
        </h3>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.5, marginBottom: "1rem" }}>
          {product.description}
        </p>

        {/* Color selector */}
        <div style={{ marginBottom: "0.75rem" }}>
          <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Color</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.35rem" }}>
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  padding: "4px 10px",
                  borderRadius: 4,
                  border: color === c ? "1px solid #D4A843" : "1px solid rgba(255,255,255,0.1)",
                  background: color === c ? "rgba(212,168,67,0.15)" : "transparent",
                  color: color === c ? "#D4A843" : "rgba(255,255,255,0.5)",
                  fontSize: "0.7rem",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Size selector */}
        {product.sizes.length > 0 && (
          <div style={{ marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Size</span>
            <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.35rem" }}>
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 4,
                    border: size === s ? "1px solid #D4A843" : "1px solid rgba(255,255,255,0.1)",
                    background: size === s ? "rgba(212,168,67,0.15)" : "transparent",
                    color: size === s ? "#D4A843" : "rgba(255,255,255,0.5)",
                    fontSize: "0.7rem",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    minWidth: 36,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price + Add to cart */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{
            fontSize: "1.4rem",
            fontWeight: 800,
            color: "#D4A843",
            fontFamily: "var(--font-shop-script), cursive",
          }}>
            {product.displayPrice}
          </span>
          <motion.button
            whileTap={{ scale: 0.93 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => onAdd(color, size)}
            style={{
              background: cartCount > 0 ? "rgba(234,88,12,0.2)" : "#EA580C",
              color: "#fff",
              border: cartCount > 0 ? "1px solid #EA580C" : "none",
              borderRadius: 8,
              padding: "0.6rem 1.4rem",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {cartCount > 0 ? `In Cart (${cartCount})` : "Add to Cart"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ShopPageClient({ onBack }: { onBack?: () => void }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addToCart = (product: ShopProduct, color: string, size?: string) => {
    const key = `${product.id}-${color}-${size || ""}`;
    setCart((prev) => {
      const existing = prev.find((i) => `${i.productId}-${i.color}-${i.size || ""}` === key);
      if (existing) {
        return prev.map((i) =>
          `${i.productId}-${i.color}-${i.size || ""}` === key
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, {
        productId: product.id,
        name: `${product.name} — ${color}${size ? ` / ${size}` : ""}`,
        color,
        size,
        price: product.price,
        quantity: 1,
      }];
    });
    setCartOpen(true);
  };

  const updateQty = (key: string, delta: number) => {
    setCart((prev) =>
      prev.flatMap((i) => {
        const k = `${i.productId}-${i.color}-${i.size || ""}`;
        if (k !== key) return [i];
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
          items: cart.map((i) => ({
            productId: i.productId,
            color: i.color,
            size: i.size,
            quantity: i.quantity,
          })),
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
      {/* Background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <img src="/proshop-photo.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>

      {/* Cart button */}
      <div style={{ position: "fixed", top: "1.2rem", right: "clamp(1.5rem, 6vw, 4rem)", zIndex: 100 }}>
        <button
          onClick={() => setCartOpen(true)}
          style={{
            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(212,168,67,0.3)", borderRadius: 8,
            cursor: "pointer", color: "#D4A843", fontSize: "0.9rem", fontWeight: 600,
            letterSpacing: "0.08em", padding: "8px 16px",
          }}
        >
          🛒 Cart {totalItems > 0 && <span style={{ color: "#fff", background: "#EA580C", borderRadius: 10, padding: "2px 8px", marginLeft: 6, fontSize: "0.8rem" }}>{totalItems}</span>}
        </button>
      </div>

      <MulliganButton onClick={() => onBack ? onBack() : (window.location.href = "/?skip=1")} />

      {/* Products */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "5rem 1.5rem 4rem" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: "3rem" }}>
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
          <p style={{ fontFamily: "var(--font-shop-script), cursive", color: "rgba(255,255,255,0.45)", fontSize: "clamp(1rem, 2vw, 1.3rem)" }}>
            Spend like you just drank 97 beers over 108 holes and missed every putt.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: "2rem" }}>
          {SHOP_PRODUCTS.map((product, i) => (
            <motion.div key={product.id} transition={{ delay: 0.1 + i * 0.1 }}>
              <ProductCard
                product={product}
                onAdd={(color, size) => addToCart(product, color, size)}
                cartCount={cart.filter((c) => c.productId === product.id).reduce((s, c) => s + c.quantity, 0)}
              />
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} style={{ textAlign: "center", marginTop: "3rem", padding: "1.5rem", borderTop: "1px solid rgba(212,168,67,0.1)" }}>
          <p style={{ fontFamily: "var(--font-shop-circus), serif", color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
            ALL SALES SUPPORT THE ANNUAL TOUR DE FORE ODYSSEY
          </p>
        </motion.div>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200 }} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ ease: [0.25, 0.1, 0.25, 1] }}
              style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(420px, 100vw)", background: "#0f1a0f", borderLeft: "1px solid rgba(212,168,67,0.15)", zIndex: 201, display: "flex", flexDirection: "column", padding: "2rem" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h2 style={{ fontFamily: "var(--font-shop-circus), serif", fontSize: "1.2rem", color: "#D4A843", letterSpacing: "0.06em" }}>Your Cart</h2>
                <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
              </div>

              {cart.length === 0 ? (
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem" }}>Nothing in here yet. The devil&apos;s got deep pockets — fill &apos;em up.</p>
              ) : (
                <>
                  <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {cart.map((item) => {
                      const key = `${item.productId}-${item.color}-${item.size || ""}`;
                      return (
                        <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(212,168,67,0.08)", paddingBottom: "1.2rem" }}>
                          <div>
                            <p style={{ fontSize: "0.9rem", fontWeight: 500, marginBottom: "0.2rem" }}>{item.name}</p>
                            <p style={{ fontSize: "0.8rem", color: "#D4A843" }}>${((item.price * item.quantity) / 100).toFixed(2)}</p>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                            <button onClick={() => updateQty(key, -1)} style={{ background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.2)", color: "#fff", width: 44, height: 44, borderRadius: 6, cursor: "pointer", fontSize: "1.1rem" }}>−</button>
                            <span style={{ fontSize: "0.9rem", minWidth: 16, textAlign: "center" }}>{item.quantity}</span>
                            <button onClick={() => updateQty(key, 1)} style={{ background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.2)", color: "#fff", width: 44, height: 44, borderRadius: 6, cursor: "pointer", fontSize: "1.1rem" }}>+</button>
                          </div>
                        </div>
                      );
                    })}
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
                        border: "none", borderRadius: 8,
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
