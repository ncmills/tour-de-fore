"use client";

import { motion, AnimatePresence } from "motion/react";
import { useRef, useState, useCallback, useEffect } from "react";

interface TubeTvProps {
  videoSrc: string;
  onExplodeStart: () => void;
  onComplete: () => void;
}

type TvPhase = "playing" | "ejecting" | "exploding";

export default function TubeTv({ videoSrc, onExplodeStart, onComplete }: TubeTvProps) {
  const isIOS = typeof navigator !== "undefined" &&
    (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
     (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));
  const screenRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [tvPhase, setTvPhase] = useState<TvPhase>("playing");
  const triggered = useRef(false);

  // Keep stable refs to callbacks so trigger() doesn't need to re-register
  const onCompleteRef = useRef(onComplete);
  const onExplodeStartRef = useRef(onExplodeStart);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);
  useEffect(() => { onExplodeStartRef.current = onExplodeStart; }, [onExplodeStart]);

  // Stable trigger — reads everything from refs, no deps needed
  const trigger = useCallback(() => {
    if (triggered.current) return;
    triggered.current = true;
    videoRef.current?.pause();
    setTvPhase("ejecting");
    setTimeout(() => {
      setTvPhase("exploding");
      onExplodeStartRef.current();
      setTimeout(() => onCompleteRef.current(), 900);
    }, 1300);
  }, []);

  // Imperative video creation — the only reliable way to set muted before src on iOS Safari
  useEffect(() => {
    const container = screenRef.current;
    if (!container) return;

    const v = document.createElement("video");
    // Always start muted so autoplay is allowed, then unmute on desktop
    v.muted = true;
    v.setAttribute("muted", "");
    v.setAttribute("autoplay", "");
    v.setAttribute("playsinline", "");
    v.autoplay = true;
    v.playsInline = true;
    v.loop = false;
    v.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;position:absolute;inset:0;";
    v.src = videoSrc;
    v.load();
    v.addEventListener("ended", trigger);

    videoRef.current = v;
    container.appendChild(v);
    v.play().then(() => {
      if (!isIOS) v.muted = false; // unmute after autoplay confirmed on desktop
    }).catch(() => {});

    return () => {
      v.removeEventListener("ended", trigger);
      v.pause();
      if (container.contains(v)) container.removeChild(v);
      videoRef.current = null;
    };
  }, [videoSrc, trigger]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* TV + VCR combo unit */}
      <motion.div
        animate={
          tvPhase === "exploding"
            ? { scale: [1, 1.06, 1.5, 0], opacity: [1, 1, 0.4, 0], filter: ["blur(0px)", "blur(0px)", "blur(4px)", "blur(30px)"], rotate: [0, -2, 3, 0] }
            : tvPhase === "ejecting"
            ? { x: [0, -5, 5, -4, 4, -2, 2, 0] }
            : {}
        }
        transition={
          tvPhase === "exploding"
            ? { duration: 0.9, ease: [0.4, 0, 1, 1], times: [0, 0.2, 0.7, 1] }
            : tvPhase === "ejecting"
            ? { duration: 0.45, delay: 0.8 }
            : {}
        }
        style={{ position: "relative", width: "clamp(240px, 85vw, 500px)" }}
      >
        {/* ── MAIN TV HOUSING ── */}
        <div style={{
          background: "linear-gradient(160deg, #4a4a4a 0%, #2a2a2a 40%, #1a1a1a 100%)",
          borderRadius: "clamp(12px, 2vw, 22px) clamp(12px, 2vw, 22px) clamp(6px, 1vw, 10px) clamp(6px, 1vw, 10px)",
          padding: "clamp(16px, 2.2vw, 28px) clamp(16px, 2.2vw, 28px) clamp(10px, 1.4vw, 16px)",
          boxShadow: [
            "inset 4px 4px 0 rgba(255,255,255,0.09)",
            "inset -4px -4px 0 rgba(0,0,0,0.6)",
            "inset 0 0 60px rgba(0,0,0,0.2)",
            "0 30px 100px rgba(0,0,0,0.95)",
            "0 10px 30px rgba(0,0,0,0.7)",
          ].join(", "),
          position: "relative",
        }}>

          {/* ── CRT SCREEN ── */}
          {/* Outer bezel / frame */}
          <div style={{
            background: "linear-gradient(145deg, #111, #0a0a0a)",
            borderRadius: "clamp(8px, 1.2vw, 14px)",
            padding: "clamp(8px, 1vw, 13px)",
            boxShadow: [
              "inset 0 0 0 2px rgba(0,0,0,0.8)",
              "inset 4px 4px 10px rgba(0,0,0,0.9)",
              "inset -4px -4px 10px rgba(0,0,0,0.7)",
            ].join(", "),
          }}>
            {/* Screen tube — the CRT bulge effect */}
            <div style={{
              position: "relative",
              borderRadius: "clamp(6px, 0.9vw, 12px)",
              overflow: "hidden",
              aspectRatio: "4/3",
              background: "#000",
              boxShadow: [
                "inset 0 0 0 2px rgba(0,0,0,0.9)",
                "inset 8px 8px 20px rgba(0,0,0,0.7)",
                "inset -8px -8px 20px rgba(0,0,0,0.5)",
                "inset 0 0 40px rgba(0,0,0,0.4)",
              ].join(", "),
            }}>
              {/* Video injected imperatively into this div (iOS autoplay fix) */}
              <div ref={screenRef} style={{ position: "absolute", inset: 0 }} />

              {/* Scanlines */}
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.22) 2px, rgba(0,0,0,0.22) 4px)",
              }} />

              {/* Phosphor green-tint glow (subtle) */}
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "radial-gradient(ellipse 90% 85% at 50% 50%, rgba(120,255,120,0.03) 0%, transparent 70%)",
              }} />

              {/* CRT vignette — heavy corners */}
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "radial-gradient(ellipse 80% 75% at 50% 50%, transparent 35%, rgba(0,0,0,0.7) 100%)",
              }} />

              {/* Screen glare / reflection */}
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)",
              }} />
            </div>
          </div>

          {/* ── CONTROL PANEL ── */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "clamp(8px, 1.1vw, 14px)",
            padding: "0 clamp(2px, 0.4vw, 6px)",
          }}>
            {/* Brand + channel */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{
                fontFamily: "monospace",
                fontSize: "clamp(7px, 0.75vw, 10px)",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.2)",
                textTransform: "uppercase",
              }}>TDF</span>
              <span style={{
                fontFamily: "monospace",
                fontSize: "clamp(6px, 0.6vw, 8px)",
                color: "rgba(255,255,255,0.12)",
              }}>CH 03</span>
            </div>

            {/* Power LED */}
            <div style={{
              width: "clamp(5px, 0.55vw, 7px)",
              height: "clamp(5px, 0.55vw, 7px)",
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 6px #22c55e, 0 0 14px rgba(34,197,94,0.5)",
            }} />

            {/* Control knobs */}
            <div style={{ display: "flex", gap: "clamp(6px, 0.8vw, 11px)", alignItems: "center" }}>
              {/* Large tuner knob */}
              <div style={{
                width: "clamp(16px, 1.9vw, 24px)",
                height: "clamp(16px, 1.9vw, 24px)",
                borderRadius: "50%",
                background: "radial-gradient(circle at 30% 30%, #555, #1a1a1a)",
                boxShadow: "0 3px 6px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.07)",
                position: "relative",
              }}>
                <div style={{
                  position: "absolute",
                  top: "50%", left: "50%",
                  width: "1.5px",
                  height: "38%",
                  background: "rgba(255,255,255,0.3)",
                  transform: "translate(-50%, -90%) rotate(15deg)",
                  borderRadius: "1px",
                }} />
              </div>
              {/* Small knobs */}
              {[11, 9].map((size, i) => (
                <div key={i} style={{
                  width: size, height: size,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 32% 32%, #444, #1a1a1a)",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.05)",
                }} />
              ))}
            </div>
          </div>

          {/* ── VCR DECK ── */}
          <div style={{
            marginTop: "clamp(8px, 1vw, 12px)",
            background: "linear-gradient(180deg, #161616, #111)",
            borderRadius: "clamp(4px, 0.5vw, 6px)",
            padding: "clamp(5px, 0.6vw, 8px) clamp(8px, 1vw, 12px)",
            boxShadow: "inset 0 2px 6px rgba(0,0,0,0.95), inset 0 -1px 2px rgba(255,255,255,0.02)",
            display: "flex",
            alignItems: "center",
            gap: "clamp(6px, 0.8vw, 10px)",
            position: "relative",
            overflow: "visible",
          }}>
            {/* VHS slot */}
            <div style={{
              flex: 1,
              height: "clamp(14px, 1.6vw, 20px)",
              background: "linear-gradient(180deg, #050505, #0d0d0d)",
              borderRadius: "clamp(2px, 0.3vw, 4px)",
              boxShadow: "inset 0 3px 8px rgba(0,0,0,0.98)",
              position: "relative",
              overflow: "visible",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <div style={{ width: "25%", height: "1px", background: "rgba(255,255,255,0.04)" }} />

              {/* Ejecting tape */}
              <AnimatePresence>
                {(tvPhase === "ejecting" || tvPhase === "exploding") && (
                  <motion.div
                    key="tape"
                    initial={{ y: 0 }}
                    animate={{ y: "-160%" }}
                    transition={{ duration: 1.1, ease: [0.3, 0, 0.2, 1] }}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "70%",
                      zIndex: 30,
                    }}
                  >
                    <div style={{
                      background: "linear-gradient(150deg, #333, #111)",
                      borderRadius: "clamp(3px, 0.4vw, 5px) clamp(3px, 0.4vw, 5px) 2px 2px",
                      padding: "clamp(6px, 0.8vw, 10px) clamp(8px, 1vw, 14px) clamp(4px, 0.5vw, 7px)",
                      boxShadow: "0 -6px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.5)",
                    }}>
                      <div style={{
                        width: "100%",
                        height: "clamp(10px, 1.1vw, 14px)",
                        background: "linear-gradient(90deg, #1a3a5c, #2e6899, #1a3a5c)",
                        borderRadius: "2px",
                        marginBottom: "clamp(3px, 0.4vw, 5px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        <span style={{
                          fontFamily: "monospace",
                          fontSize: "clamp(4px, 0.45vw, 6px)",
                          color: "rgba(255,255,255,0.7)",
                          letterSpacing: "0.15em",
                        }}>HYPE REEL</span>
                      </div>
                      <div style={{
                        background: "#080808",
                        borderRadius: "3px",
                        padding: "clamp(3px, 0.35vw, 5px) clamp(8px, 1vw, 12px)",
                        display: "flex",
                        justifyContent: "space-around",
                      }}>
                        {[0, 1].map(i => (
                          <div key={i} style={{
                            width: "clamp(13px, 1.5vw, 19px)",
                            height: "clamp(13px, 1.5vw, 19px)",
                            borderRadius: "50%",
                            background: "radial-gradient(circle at 33% 33%, #2e2e2e, #0d0d0d)",
                            border: "2px solid #222",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <div style={{ width: "32%", height: "32%", borderRadius: "50%", background: "#1a1a1a" }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* VCR buttons */}
            <div style={{ display: "flex", gap: "clamp(3px, 0.4vw, 5px)" }}>
              {["▶", "⏹", "⏏"].map((icon, i) => (
                <div key={i} style={{
                  width: "clamp(12px, 1.4vw, 18px)",
                  height: "clamp(10px, 1.1vw, 14px)",
                  background: "linear-gradient(180deg, #333, #1a1a1a)",
                  borderRadius: "2px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}>
                  <span style={{ fontSize: "clamp(4px, 0.45vw, 6px)", color: "rgba(255,255,255,0.4)" }}>{icon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── STAND ── */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{
            width: "clamp(50px, 6.5vw, 80px)",
            height: "clamp(8px, 0.9vw, 12px)",
            background: "linear-gradient(180deg, #2a2a2a, #1a1a1a)",
            borderRadius: "0 0 5px 5px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
          }} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "clamp(30px, 4vw, 50px)", marginTop: "1px" }}>
          {[0, 1].map(i => (
            <div key={i} style={{
              width: "clamp(24px, 2.8vw, 36px)",
              height: "clamp(6px, 0.7vw, 9px)",
              background: "#181818",
              borderRadius: "0 0 5px 5px",
            }} />
          ))}
        </div>
      </motion.div>

      {/* ── SKIP BUTTON ── */}
      <AnimatePresence>
        {tvPhase === "playing" && (
          <motion.button
            key="skip"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ delay: 1.0, duration: 0.4 }}
            onClick={trigger}
            style={{
              marginTop: "clamp(14px, 2vw, 24px)",
              transform: "translateY(-0.25in)",
              fontFamily: "monospace",
              fontSize: "clamp(9px, 0.9vw, 11px)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              background: "none",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "clamp(5px, 0.55vw, 7px) clamp(12px, 1.4vw, 18px)",
              borderRadius: "3px",
              cursor: "pointer",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
          >
            skip hype video
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
