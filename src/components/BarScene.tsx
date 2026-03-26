"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  onShop: () => void;
  onDrink: () => void;
  isDrunk?: boolean;
}

export default function BarScene({ onShop, onDrink, isDrunk }: Props) {
  // If already drunk (coming back from shop), skip straight to drunk phase with shop bubble
  const [phase, setPhase] = useState<"arrive" | "bubbles" | "drinking" | "drunk" | "shopping">(
    isDrunk ? "drunk" : "arrive"
  );

  useEffect(() => {
    if (isDrunk) return; // skip intro if already drunk
    const t = setTimeout(() => setPhase("bubbles"), 1600);
    return () => clearTimeout(t);
  }, [isDrunk]);

  const handleDrink = () => {
    setPhase("drinking");
    onDrink();
    // After "Cheers" message, show the shop bubble again (beer one is gone)
    setTimeout(() => setPhase("drunk"), 2000);
  };

  const handleShop = () => {
    setPhase("shopping");
    setTimeout(onShop, 1000);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "#1a1610",
        overflow: "hidden",
      }}
    >
      {/* Bar scene SVG — bartender, bar top, bottles, beer */}
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          <linearGradient id="bar-top" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6a4e30" />
            <stop offset="30%" stopColor="#5a3f22" />
            <stop offset="100%" stopColor="#3a2810" />
          </linearGradient>
          <linearGradient id="back-wall" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3a3028" />
            <stop offset="100%" stopColor="#28201a" />
          </linearGradient>
          <linearGradient id="beer-body" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f5c842" />
            <stop offset="50%" stopColor="#e5a820" />
            <stop offset="100%" stopColor="#c8860a" />
          </linearGradient>
          <linearGradient id="glass-shine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.14)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
          </linearGradient>
          <radialGradient id="warm-glow" cx="50%" cy="35%">
            <stop offset="0%" stopColor="#f5c842" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#EA580C" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="bar-lamp" cx="50%" cy="0%">
            <stop offset="0%" stopColor="#f5c842" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#EA580C" stopOpacity="0.12" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* === BACK WALL === */}
        <rect x="0" y="0" width="1200" height="490" fill="url(#back-wall)" />
        <rect x="0" y="0" width="1200" height="490" fill="url(#warm-glow)" />
        <rect x="0" y="0" width="1200" height="490" fill="url(#bar-lamp)" />

        {/* Shelves */}
        <rect x="180" y="110" width="840" height="6" rx="2" fill="#4a3520" />
        <rect x="180" y="250" width="840" height="6" rx="2" fill="#4a3520" />
        <rect x="180" y="116" width="840" height="134" fill="rgba(245,200,66,0.06)" />

        {/* Top shelf bottles */}
        {[240,320,400,480,560,640,720,800,880,940].map((x,i) => {
          const h = 65+(i%3)*18;
          const c = ["#3a6a3a","#7a4a2a","#2a4a7a","#6a3a5a","#3a6a3a","#7a5a2a","#2a5a6a","#6a2a3a","#3a5a2a","#5a3a6a"][i];
          const nk = 14+(i%2)*4;
          return <g key={`t${i}`}><rect x={x-10} y={116-h} width={20} height={h} rx={4} fill={c} opacity="0.95"/><rect x={x-5} y={116-h-nk} width={10} height={nk+2} rx={3} fill={c} opacity="0.85"/><rect x={x-3} y={116-h-nk-4} width={6} height={5} rx={2} fill={c} opacity="0.7"/><rect x={x-7} y={116-h+18} width={14} height={20} rx={1} fill="rgba(255,255,255,0.1)"/></g>;
        })}

        {/* Lower shelf bottles */}
        {[250,340,430,520,610,700,790,870,950].map((x,i) => {
          const h = 55+(i%4)*14;
          const c = ["#7a5a2a","#2a4a4a","#6a2a2a","#3a6a2a","#5a3a6a","#2a6a3a","#7a3a3a","#3a2a6a","#6a5a2a"][i];
          return <g key={`b${i}`}><rect x={x-9} y={256-h} width={18} height={h} rx={3} fill={c} opacity="0.9"/><rect x={x-5} y={256-h-12} width={10} height={14} rx={3} fill={c} opacity="0.75"/></g>;
        })}

        {/* Mirror — warm tinted */}
        <rect x="320" y="140" width="560" height="100" rx="4" fill="rgba(255,240,200,0.04)" stroke="rgba(255,240,200,0.08)" strokeWidth="1.5" />
        {/* Mirror reflection hint */}
        <rect x="325" y="145" width="200" height="90" rx="2" fill="rgba(255,255,255,0.01)" />

        {/* === BARTENDER === */}
        <g>
          {/* Vest / outer layer — dark but visible */}
          <path d="M520 295 C500 295 460 315 450 400 L450 490 L750 490 L750 400 C740 315 700 295 680 295 Z" fill="#2a2420" />
          {/* White dress shirt */}
          <path d="M555 305 C545 310 530 330 525 365 L525 420 L675 420 L675 365 C670 330 655 310 645 305 Z" fill="#e8e4dc" />
          {/* Shirt collar / V */}
          <path d="M565 305 L600 340 L635 305" fill="none" stroke="#c8c4bc" strokeWidth="3" />
          {/* Head — warm skin tone */}
          <ellipse cx="600" cy="268" rx="40" ry="48" fill="#c49470" />
          {/* Hair - dark, slicked */}
          <path d="M560 245 Q600 225 640 245 Q645 240 640 232 Q600 215 560 232 Q555 240 560 245Z" fill="#2a1a0a" />
          {/* Left eye */}
          <ellipse cx="584" cy="262" rx="6" ry="3.5" fill="#1a1008" />
          <circle cx="585" cy="261" r="1.5" fill="rgba(255,255,255,0.25)" />
          {/* Right eye */}
          <ellipse cx="616" cy="262" rx="6" ry="3.5" fill="#1a1008" />
          <circle cx="617" cy="261" r="1.5" fill="rgba(255,255,255,0.25)" />
          {/* Eyebrows */}
          <path d="M576 254 Q584 250 592 253" fill="none" stroke="#2a1a0a" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M608 253 Q616 250 624 254" fill="none" stroke="#2a1a0a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Nose */}
          <path d="M597 270 Q600 280 603 270" fill="none" stroke="#a07050" strokeWidth="1.5" />
          {/* Smirk */}
          <path d="M587 286 Q600 296 613 286" fill="none" stroke="#5a3020" strokeWidth="2.5" strokeLinecap="round" />
          {/* Towel over shoulder */}
          <path d="M510 335 L490 390 L502 393 L520 340 Z" fill="#e8e4dc" opacity="0.6" />
          {/* Apron */}
          <rect x="520" y="380" width="160" height="110" rx="2" fill="#2a2420" stroke="#3a3430" strokeWidth="1" />
          <path d="M560 380 Q600 395 640 380" fill="none" stroke="#3a3430" strokeWidth="1.5" />
        </g>

        {/* === BAR TOP === */}
        <rect x="0" y="475" width="1200" height="45" fill="url(#bar-top)" />
        <line x1="0" y1="485" x2="1200" y2="485" stroke="#4a3a28" strokeWidth="0.5" opacity="0.3" />
        <line x1="0" y1="495" x2="1200" y2="495" stroke="#3a2a18" strokeWidth="0.3" opacity="0.2" />
        <line x1="0" y1="475" x2="1200" y2="475" stroke="#d4a840" strokeWidth="3" />
        <line x1="0" y1="476" x2="1200" y2="476" stroke="#a88030" strokeWidth="1" />
        <line x1="0" y1="520" x2="1200" y2="520" stroke="#1a1208" strokeWidth="2" />

        {/* Below bar — dim lap area */}
        <rect x="0" y="520" width="1200" height="280" fill="#141008" />

        {/* === BEER GLASS === */}
        <g>
          <path d="M438 380 L432 475 L488 475 L482 380 Z" fill="url(#glass-shine)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <path d="M440 400 L434 473 L486 473 L480 400 Z" fill="url(#beer-body)" opacity="0.85" />
          <ellipse cx="460" cy="400" rx="22" ry="7" fill="#f5e8c8" opacity="0.9" />
          <ellipse cx="453" cy="397" rx="7" ry="5" fill="#fffae8" opacity="0.5" />
          <ellipse cx="468" cy="398" rx="6" ry="4" fill="#fffae8" opacity="0.4" />
          <line x1="443" y1="408" x2="437" y2="465" stroke="rgba(255,255,255,0.14)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="448" cy="428" r="2" fill="rgba(255,255,255,0.12)" />
          <circle cx="475" cy="442" r="1.5" fill="rgba(255,255,255,0.1)" />
          <circle cx="445" cy="455" r="1.8" fill="rgba(255,255,255,0.08)" />
        </g>

        {/* Napkin */}
        <rect x="430" y="470" width="60" height="5" rx="1" fill="#d4d0c8" opacity="0.3" />

        {/* TDF coaster */}
        <ellipse cx="760" cy="493" rx="32" ry="7" fill="#3a2a18" stroke="#4a3a28" strokeWidth="1" />
        <text x="760" y="496" textAnchor="middle" fontSize="7" fill="#EA580C" fontFamily="serif" fontWeight="bold" letterSpacing="2" opacity="0.7">TDF</text>

        {/* ===================================================== */}
        {/* LEFT ARM — cartoon first-person, from bottom-left      */}
        {/* Wide forearm → wrist → hand flat on bar                */}
        {/* ===================================================== */}
        <g>
          {/* Polo sleeve — dark green cuff at bottom edge */}
          <path d="M-60 830 L120 740 L160 760 L-20 860 Z" fill="#2a4a2a" stroke="#1a3a1a" strokeWidth="2" />

          {/* Forearm — wide at elbow (bottom), tapers to wrist near bar */}
          {/* Top edge of forearm */}
          <path d="
            M-40 820
            C30 770 120 710 200 660
            C260 630 310 605 350 585
            L370 578
          " fill="none" stroke="#d4a87a" strokeWidth="0" />
          {/* Bottom edge of forearm */}
          <path d="
            M120 900
            C170 850 240 790 310 740
            C350 715 380 695 400 680
            L408 668
          " fill="none" stroke="#b8845a" strokeWidth="0" />
          {/* Forearm fill */}
          <path d="
            M-40 820
            C30 770 120 710 200 660
            C260 630 310 605 350 585
            L370 578 L390 572
            C395 575 400 580 405 588
            L408 668
            C380 695 350 715 310 740
            C240 790 170 850 120 900
            L-60 900
            Z
          " fill="#d4a87a" />
          {/* Underside shadow — gives roundness */}
          <path d="
            M120 900
            C170 850 240 790 310 740
            C350 715 380 695 400 680
            L408 668
          " fill="none" stroke="#b08058" strokeWidth="14" opacity="0.3" strokeLinecap="round" />
          {/* Top highlight — light catching the top of the forearm */}
          <path d="
            M-10 800
            C50 758 140 700 220 652
            C270 628 320 605 360 588
          " fill="none" stroke="#e0be90" strokeWidth="10" opacity="0.3" strokeLinecap="round" />
          {/* Center muscle line */}
          <path d="
            M40 840
            C100 800 180 750 260 700
            C310 675 350 655 380 638
          " fill="none" stroke="#c49060" strokeWidth="3" opacity="0.35" strokeLinecap="round" />

          {/* WRIST — slight narrowing */}
          <path d="M370 578 C378 574 386 572 392 572" fill="none" stroke="#c49464" strokeWidth="2" opacity="0.4" />

          {/* HAND — cartoon style, flat on the bar, fingers pointing right */}
          {/* Palm */}
          <path d="
            M390 572 C398 568 410 564 425 565
            L445 568 L450 575 L447 586
            C440 592 425 596 408 596
            C398 596 390 590 388 584 Z
          " fill="#d4a87a" stroke="#b08058" strokeWidth="1.5" strokeLinejoin="round" />

          {/* Index finger */}
          <path d="M445 568 L472 562 C480 562 484 568 480 574 C476 580 466 582 460 580 L445 576 Z"
            fill="#d4a87a" stroke="#b08058" strokeWidth="1.2" strokeLinejoin="round" />
          {/* Middle finger — longest */}
          <path d="M446 575 L478 570 C486 570 490 576 486 582 C482 588 472 590 466 588 L446 584 Z"
            fill="#d4a87a" stroke="#b08058" strokeWidth="1.2" strokeLinejoin="round" />
          {/* Ring finger */}
          <path d="M444 583 L472 580 C480 580 482 586 478 592 C474 596 466 598 460 596 L444 592 Z"
            fill="#d4a87a" stroke="#b08058" strokeWidth="1.2" strokeLinejoin="round" />
          {/* Pinky — shorter */}
          <path d="M440 590 L462 588 C468 588 470 594 466 598 C462 602 456 603 450 600 L440 596 Z"
            fill="#d4a87a" stroke="#b08058" strokeWidth="1.2" strokeLinejoin="round" />
          {/* Thumb — angled down */}
          <path d="M394 586 C390 592 387 602 392 608 C398 612 406 608 410 600 C414 592 410 584 404 582 Z"
            fill="#d4a87a" stroke="#b08058" strokeWidth="1.2" strokeLinejoin="round" />

          {/* Knuckle bumps */}
          <circle cx="470" cy="564" r="4" fill="rgba(255,255,255,0.07)" />
          <circle cx="476" cy="572" r="4" fill="rgba(255,255,255,0.06)" />
          <circle cx="472" cy="582" r="3.5" fill="rgba(255,255,255,0.05)" />

          {/* Watch */}
          <rect x="310" y="648" width="44" height="34" rx="7" fill="#2a2a2a" stroke="#555" strokeWidth="2" />
          <rect x="318" y="655" width="28" height="20" rx="4" fill="#111" />
          <circle cx="332" cy="665" r="2.5" fill="#4a8" opacity="0.5" />
          <rect x="322" y="640" width="20" height="10" rx="3" fill="#333" />
          <rect x="322" y="680" width="20" height="10" rx="3" fill="#333" />
        </g>

        {/* ===================================================== */}
        {/* RIGHT ARM — cartoon first-person, from bottom-right    */}
        {/* ===================================================== */}
        <g>
          {/* Polo sleeve */}
          <path d="M1260 830 L1080 740 L1040 760 L1220 860 Z" fill="#2a4a2a" stroke="#1a3a1a" strokeWidth="2" />

          {/* Forearm fill */}
          <path d="
            M1240 820
            C1170 770 1080 710 1000 660
            C940 630 890 605 850 585
            L830 578 L810 572
            C805 575 800 580 795 588
            L792 668
            C820 695 850 715 890 740
            C960 790 1030 850 1080 900
            L1260 900
            Z
          " fill="#d4a87a" />
          {/* Underside shadow */}
          <path d="
            M1080 900
            C1030 850 960 790 890 740
            C850 715 820 695 800 680
            L792 668
          " fill="none" stroke="#b08058" strokeWidth="14" opacity="0.3" strokeLinecap="round" />
          {/* Top highlight */}
          <path d="
            M1210 800
            C1150 758 1060 700 980 652
            C930 628 880 605 840 588
          " fill="none" stroke="#e0be90" strokeWidth="10" opacity="0.3" strokeLinecap="round" />
          {/* Center muscle line */}
          <path d="
            M1160 840
            C1100 800 1020 750 940 700
            C890 675 850 655 820 638
          " fill="none" stroke="#c49060" strokeWidth="3" opacity="0.35" strokeLinecap="round" />

          {/* HAND — flat on bar, fingers pointing left */}
          <path d="
            M810 572 C802 568 790 564 775 565
            L755 568 L750 575 L753 586
            C760 592 775 596 792 596
            C802 596 810 590 812 584 Z
          " fill="#d4a87a" stroke="#b08058" strokeWidth="1.5" strokeLinejoin="round" />

          {/* Index */}
          <path d="M755 568 L728 562 C720 562 716 568 720 574 C724 580 734 582 740 580 L755 576 Z"
            fill="#d4a87a" stroke="#b08058" strokeWidth="1.2" strokeLinejoin="round" />
          {/* Middle */}
          <path d="M754 575 L722 570 C714 570 710 576 714 582 C718 588 728 590 734 588 L754 584 Z"
            fill="#d4a87a" stroke="#b08058" strokeWidth="1.2" strokeLinejoin="round" />
          {/* Ring */}
          <path d="M756 583 L728 580 C720 580 718 586 722 592 C726 596 734 598 740 596 L756 592 Z"
            fill="#d4a87a" stroke="#b08058" strokeWidth="1.2" strokeLinejoin="round" />
          {/* Pinky */}
          <path d="M760 590 L738 588 C732 588 730 594 734 598 C738 602 744 603 750 600 L760 596 Z"
            fill="#d4a87a" stroke="#b08058" strokeWidth="1.2" strokeLinejoin="round" />
          {/* Thumb */}
          <path d="M806 586 C810 592 813 602 808 608 C802 612 794 608 790 600 C786 592 790 584 796 582 Z"
            fill="#d4a87a" stroke="#b08058" strokeWidth="1.2" strokeLinejoin="round" />

          {/* Knuckle bumps */}
          <circle cx="730" cy="564" r="4" fill="rgba(255,255,255,0.07)" />
          <circle cx="724" cy="572" r="4" fill="rgba(255,255,255,0.06)" />
        </g>
      </svg>

      {/* === SPEECH BUBBLES === */}
      <AnimatePresence>
        {phase === "bubbles" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: "16%",
              gap: "clamp(1rem, 4vw, 3rem)",
              pointerEvents: "none",
            }}
          >
            <motion.button
              initial={{ opacity: 0, y: 30, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDrink}
              style={{
                pointerEvents: "auto",
                background: "#fff",
                color: "#1a1008",
                padding: "clamp(14px, 2vw, 22px) clamp(20px, 3vw, 36px)",
                borderRadius: "24px 24px 8px 24px",
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "clamp(0.85rem, 1.8vw, 1.2rem)",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)",
                userSelect: "none",
              }}
            >
              🍺 Drink your beer
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 30, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShop}
              style={{
                pointerEvents: "auto",
                background: "#fff",
                color: "#1a1008",
                padding: "clamp(14px, 2vw, 22px) clamp(20px, 3vw, 36px)",
                borderRadius: "24px 24px 24px 8px",
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "clamp(0.85rem, 1.8vw, 1.2rem)",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)",
                userSelect: "none",
              }}
            >
              💰 Spend some cash
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drunk phase — only shop bubble */}
      <AnimatePresence>
        {phase === "drunk" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: "16%",
              pointerEvents: "none",
            }}
          >
            <motion.button
              initial={{ opacity: 0, y: 30, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShop}
              style={{
                pointerEvents: "auto",
                background: "#fff",
                color: "#1a1008",
                padding: "clamp(14px, 2vw, 22px) clamp(20px, 3vw, 36px)",
                borderRadius: "24px 24px 24px 8px",
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "clamp(0.85rem, 1.8vw, 1.2rem)",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)",
                userSelect: "none",
              }}
            >
              💰 Spend some cash
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drinking overlay */}
      <AnimatePresence>
        {phase === "drinking" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              background: "rgba(0,0,0,0.3)",
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontFamily: "var(--font-script), cursive",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                color: "#f5c842",
                textShadow: "0 0 30px rgba(245,200,66,0.3)",
              }}
            >
              Cheers... 🍻
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shopping overlay */}
      <AnimatePresence>
        {phase === "shopping" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              background: "rgba(0,0,0,0.4)",
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontFamily: "var(--font-script), cursive",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                color: "rgba(255,255,255,0.8)",
                textShadow: "0 0 30px rgba(234,88,12,0.3)",
              }}
            >
              Right this way...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
