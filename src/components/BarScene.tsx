"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  onShop: () => void;
}

export default function BarScene({ onShop }: Props) {
  const router = useRouter();
  const [phase, setPhase] = useState<"arrive" | "bubbles" | "drinking" | "shopping">("arrive");

  useEffect(() => {
    const t = setTimeout(() => setPhase("bubbles"), 1600);
    return () => clearTimeout(t);
  }, []);

  const handleDrink = () => {
    setPhase("drinking");
    // Activate drunk mode
    sessionStorage.setItem("tdf-drunk", "1");
    window.dispatchEvent(new Event("tdf-drunk"));
    // Brief pause so "Cheers" shows, then navigate to homepage with drunk effect active
    setTimeout(() => {
      router.push("/?skip=1");
    }, 1500);
  };

  const handleShop = () => {
    setPhase("shopping");
    setTimeout(() => onShop(), 1000);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "#0a0806",
        overflow: "hidden",
      }}
    >
      {/* Bar scene */}
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          <linearGradient id="bar-top" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a3520" />
            <stop offset="30%" stopColor="#3d2b1a" />
            <stop offset="100%" stopColor="#1a1008" />
          </linearGradient>
          <linearGradient id="back-wall" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1c1814" />
            <stop offset="100%" stopColor="#0d0b08" />
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
            <stop offset="0%" stopColor="#EA580C" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="bar-lamp" cx="50%" cy="0%">
            <stop offset="0%" stopColor="#f5c842" stopOpacity="0.12" />
            <stop offset="60%" stopColor="#EA580C" stopOpacity="0.04" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          {/* Skin tones */}
          <linearGradient id="skin-top" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#deb888" />
            <stop offset="100%" stopColor="#c9a070" />
          </linearGradient>
          <linearGradient id="skin-bottom" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c49464" />
            <stop offset="100%" stopColor="#a87850" />
          </linearGradient>
        </defs>

        {/* === BACK WALL === */}
        <rect x="0" y="0" width="1200" height="490" fill="url(#back-wall)" />
        <rect x="0" y="0" width="1200" height="490" fill="url(#warm-glow)" />
        <rect x="0" y="0" width="1200" height="490" fill="url(#bar-lamp)" />

        {/* Back bar shelves */}
        <rect x="180" y="110" width="840" height="6" rx="2" fill="#2a1d10" />
        <rect x="180" y="250" width="840" height="6" rx="2" fill="#2a1d10" />
        <rect x="180" y="116" width="840" height="134" fill="rgba(234,88,12,0.03)" />

        {/* Top shelf bottles */}
        {[240,320,400,480,560,640,720,800,880,940].map((x,i) => {
          const h = 65 + (i%3)*18;
          const c = ["#2a4a2a","#5a2a1a","#1a2a4a","#4a2a3a","#2a4a2a","#5a3a1a","#1a3a4a","#4a1a2a","#2a3a1a","#3a2a4a"][i];
          const nk = 14 + (i%2)*4;
          return <g key={`t${i}`}><rect x={x-10} y={116-h} width={20} height={h} rx={4} fill={c} opacity="0.85"/><rect x={x-5} y={116-h-nk} width={10} height={nk+2} rx={3} fill={c} opacity="0.7"/><rect x={x-3} y={116-h-nk-4} width={6} height={5} rx={2} fill={c} opacity="0.5"/><rect x={x-7} y={116-h+18} width={14} height={20} rx={1} fill="rgba(255,255,255,0.05)"/></g>;
        })}

        {/* Lower shelf bottles */}
        {[250,340,430,520,610,700,790,870,950].map((x,i) => {
          const h = 55 + (i%4)*14;
          const c = ["#5a3a1a","#1a2a2a","#4a1a1a","#2a4a1a","#3a2a4a","#1a4a2a","#5a2a2a","#2a1a4a","#4a3a1a"][i];
          return <g key={`b${i}`}><rect x={x-9} y={256-h} width={18} height={h} rx={3} fill={c} opacity="0.75"/><rect x={x-5} y={256-h-12} width={10} height={14} rx={3} fill={c} opacity="0.55"/></g>;
        })}

        {/* Mirror */}
        <rect x="320" y="140" width="560" height="100" rx="4" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

        {/* === BARTENDER === */}
        <g>
          <path d="M520 295 C500 295 460 315 450 400 L450 490 L750 490 L750 400 C740 315 700 295 680 295 Z" fill="#1a1612" />
          <path d="M555 305 C545 310 530 330 525 365 L525 420 L675 420 L675 365 C670 330 655 310 645 305 Z" fill="#222018" />
          <path d="M565 305 L600 340 L635 305" fill="none" stroke="#2a2620" strokeWidth="3" />
          <ellipse cx="600" cy="268" rx="40" ry="48" fill="#3d2d20" />
          <path d="M560 245 Q600 225 640 245 Q645 240 640 232 Q600 215 560 232 Q555 240 560 245Z" fill="#1a1008" />
          <ellipse cx="584" cy="262" rx="6" ry="3.5" fill="#0f0a06" />
          <circle cx="585" cy="261" r="1" fill="rgba(255,255,255,0.15)" />
          <ellipse cx="616" cy="262" rx="6" ry="3.5" fill="#0f0a06" />
          <circle cx="617" cy="261" r="1" fill="rgba(255,255,255,0.15)" />
          <path d="M576 254 Q584 250 592 253" fill="none" stroke="#1a1008" strokeWidth="2" strokeLinecap="round" />
          <path d="M608 253 Q616 250 624 254" fill="none" stroke="#1a1008" strokeWidth="2" strokeLinecap="round" />
          <path d="M598 268 Q600 278 602 268" fill="none" stroke="#2a1a10" strokeWidth="1.5" />
          <path d="M587 286 Q600 296 613 286" fill="none" stroke="#1a1008" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M510 335 L490 390 L502 393 L520 340 Z" fill="#d4d0c8" opacity="0.25" />
          <rect x="520" y="380" width="160" height="110" rx="2" fill="#1a1612" stroke="#2a2218" strokeWidth="0.5" />
          <path d="M560 380 Q600 395 640 380" fill="none" stroke="#2a2218" strokeWidth="1.5" />
        </g>

        {/* === BAR TOP === */}
        <rect x="0" y="475" width="1200" height="45" fill="url(#bar-top)" />
        <line x1="0" y1="485" x2="1200" y2="485" stroke="#4a3a28" strokeWidth="0.5" opacity="0.3" />
        <line x1="0" y1="495" x2="1200" y2="495" stroke="#3a2a18" strokeWidth="0.3" opacity="0.2" />
        <line x1="0" y1="475" x2="1200" y2="475" stroke="#c4a040" strokeWidth="3" />
        <line x1="0" y1="476" x2="1200" y2="476" stroke="#8a7030" strokeWidth="1" />
        <line x1="0" y1="520" x2="1200" y2="520" stroke="#0a0806" strokeWidth="2" />

        {/* Below bar */}
        <rect x="0" y="520" width="1200" height="280" fill="#070604" />

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
        <rect x="430" y="470" width="60" height="5" rx="1" fill="#d4d0c8" opacity="0.12" />

        {/* TDF coaster */}
        <ellipse cx="760" cy="493" rx="32" ry="7" fill="#2a1d10" stroke="#3a2a18" strokeWidth="1" />
        <text x="760" y="496" textAnchor="middle" fontSize="7" fill="#EA580C" fontFamily="serif" fontWeight="bold" letterSpacing="2" opacity="0.5">TDF</text>

        {/* ======================================================= */}
        {/* LEFT ARM — massive beefy forearm, first-person POV      */}
        {/* Comes from bottom-left, hand rests on bar near center   */}
        {/* ======================================================= */}
        <g>
          {/* Main forearm mass — THICK. ~180px wide at elbow, tapers to ~80px at wrist */}
          <path d="
            M-80 900
            C-40 860 40 780 120 700
            C180 640 240 600 310 570
            C340 558 365 552 390 550
            C400 548 408 555 408 565
            L405 572
            C395 578 370 582 340 590
            C280 612 200 660 140 720
            C80 780 20 840 -10 880
            L-80 900 Z
          " fill="url(#skin-top)" />
          {/* Underside — darker, shows arm thickness */}
          <path d="
            M120 900
            C140 870 180 820 230 770
            C280 720 320 680 370 648
            C390 638 400 632 408 628
            C414 625 418 630 416 638
            L410 646
            C400 650 384 658 362 670
            C310 700 260 740 220 790
            C180 840 150 870 140 900
            Z
          " fill="url(#skin-bottom)" />

          {/* Muscle ridge — brachioradialis bulge running along the top */}
          <path d="M60 790 C100 745 160 695 230 655 C270 635 300 620 330 608"
            fill="none" stroke="#d4a87a" strokeWidth="6" strokeLinecap="round" opacity="0.35" />

          {/* Secondary muscle — extensor group on top */}
          <path d="M30 810 C70 770 130 725 200 680 C240 660 280 642 310 630"
            fill="none" stroke="#ddb888" strokeWidth="3" strokeLinecap="round" opacity="0.2" />

          {/* Shadow crease between muscle groups */}
          <path d="M80 830 C110 795 160 750 220 710 C260 690 300 670 340 655"
            fill="none" stroke="#a07040" strokeWidth="3" strokeLinecap="round" opacity="0.25" />

          {/* Vein — runs from mid-forearm to wrist */}
          <path d="M150 780 C180 755 220 725 270 695 C300 678 330 665 355 655"
            fill="none" stroke="#b07848" strokeWidth="2" opacity="0.3" />

          {/* Wrist tendons */}
          <path d="M360 618 C370 612 382 608 392 605" fill="none" stroke="#b08058" strokeWidth="1.5" opacity="0.35" />
          <path d="M365 625 C375 618 385 614 395 612" fill="none" stroke="#b08058" strokeWidth="1" opacity="0.25" />

          {/* HAND — big, meaty, resting on bar surface */}
          {/* Palm */}
          <path d="
            M390 550 C395 546 402 544 412 544
            L428 546 L435 552 L432 564
            C425 572 410 576 395 576
            C385 576 378 570 378 562
            L390 550 Z
          " fill="#d4a87a" stroke="#b08058" strokeWidth="1" />

          {/* Index finger */}
          <path d="M428 546 L452 540 C458 540 462 544 460 550
            C458 556 450 558 444 558 L428 554 Z" fill="#d4a87a" stroke="#b08058" strokeWidth="0.8" />
          {/* Middle finger — longest */}
          <path d="M430 552 L458 548 C464 548 468 552 466 558
            C464 564 456 566 450 566 L430 562 Z" fill="#d4a87a" stroke="#b08058" strokeWidth="0.8" />
          {/* Ring finger */}
          <path d="M428 560 L452 558 C458 558 462 562 460 568
            C458 572 452 574 446 574 L428 570 Z" fill="#d4a87a" stroke="#b08058" strokeWidth="0.8" />
          {/* Pinky — shorter */}
          <path d="M424 568 L442 566 C448 566 450 570 448 574
            C446 578 440 580 436 578 L424 574 Z" fill="#d4a87a" stroke="#b08058" strokeWidth="0.8" />
          {/* Thumb — angled out */}
          <path d="M385 558 C380 564 376 574 380 580
            C384 586 392 584 396 578 C400 572 400 562 394 556 Z" fill="#d4a87a" stroke="#b08058" strokeWidth="0.8" />

          {/* Knuckle bumps */}
          <circle cx="450" cy="542" r="3.5" fill="rgba(255,255,255,0.06)" />
          <circle cx="456" cy="550" r="3.5" fill="rgba(255,255,255,0.05)" />
          <circle cx="452" cy="560" r="3" fill="rgba(255,255,255,0.05)" />
          <circle cx="444" cy="568" r="2.5" fill="rgba(255,255,255,0.04)" />

          {/* Watch on wrist */}
          <rect x="295" y="645" width="42" height="32" rx="6" fill="#222" stroke="#444" strokeWidth="2" />
          <rect x="302" y="651" width="28" height="20" rx="3" fill="#0a0a0a" />
          <rect x="306" y="639" width="20" height="8" rx="2" fill="#333" />
          <rect x="306" y="675" width="20" height="8" rx="2" fill="#333" />
          <circle cx="316" cy="661" r="2" fill="#4a8" opacity="0.4" />

          {/* Polo sleeve at edge */}
          <path d="M-80 900 L-10 880 C10 870 30 855 45 842 L70 858 C50 872 25 888 0 900 Z" fill="#1a2a1a" />
        </g>

        {/* ======================================================= */}
        {/* RIGHT ARM — matching beefy forearm, from bottom-right   */}
        {/* ======================================================= */}
        <g>
          {/* Main forearm mass */}
          <path d="
            M1280 900
            C1240 860 1160 780 1080 700
            C1020 640 960 600 890 570
            C860 558 835 552 810 550
            C800 548 792 555 792 565
            L795 572
            C805 578 830 582 860 590
            C920 612 1000 660 1060 720
            C1120 780 1180 840 1210 880
            L1280 900 Z
          " fill="url(#skin-top)" />
          {/* Underside */}
          <path d="
            M1080 900
            C1060 870 1020 820 970 770
            C920 720 880 680 830 648
            C810 638 800 632 792 628
            C786 625 782 630 784 638
            L790 646
            C800 650 816 658 838 670
            C890 700 940 740 980 790
            C1020 840 1050 870 1060 900
            Z
          " fill="url(#skin-bottom)" />

          {/* Muscle ridge */}
          <path d="M1140 790 C1100 745 1040 695 970 655 C930 635 900 620 870 608"
            fill="none" stroke="#d4a87a" strokeWidth="6" strokeLinecap="round" opacity="0.35" />

          {/* Secondary muscle */}
          <path d="M1170 810 C1130 770 1070 725 1000 680 C960 660 920 642 890 630"
            fill="none" stroke="#ddb888" strokeWidth="3" strokeLinecap="round" opacity="0.2" />

          {/* Shadow crease */}
          <path d="M1120 830 C1090 795 1040 750 980 710 C940 690 900 670 860 655"
            fill="none" stroke="#a07040" strokeWidth="3" strokeLinecap="round" opacity="0.25" />

          {/* Vein */}
          <path d="M1050 780 C1020 755 980 725 930 695 C900 678 870 665 845 655"
            fill="none" stroke="#b07848" strokeWidth="2" opacity="0.3" />

          {/* Wrist tendons */}
          <path d="M840 618 C830 612 818 608 808 605" fill="none" stroke="#b08058" strokeWidth="1.5" opacity="0.35" />

          {/* HAND — resting near beer glass */}
          <path d="
            M810 550 C805 546 798 544 788 544
            L772 546 L765 552 L768 564
            C775 572 790 576 805 576
            C815 576 822 570 822 562
            L810 550 Z
          " fill="#d4a87a" stroke="#b08058" strokeWidth="1" />

          {/* Index */}
          <path d="M772 546 L748 540 C742 540 738 544 740 550
            C742 556 750 558 756 558 L772 554 Z" fill="#d4a87a" stroke="#b08058" strokeWidth="0.8" />
          {/* Middle */}
          <path d="M770 552 L742 548 C736 548 732 552 734 558
            C736 564 744 566 750 566 L770 562 Z" fill="#d4a87a" stroke="#b08058" strokeWidth="0.8" />
          {/* Ring */}
          <path d="M772 560 L748 558 C742 558 738 562 740 568
            C742 572 748 574 754 574 L772 570 Z" fill="#d4a87a" stroke="#b08058" strokeWidth="0.8" />
          {/* Pinky */}
          <path d="M776 568 L758 566 C752 566 750 570 752 574
            C754 578 760 580 764 578 L776 574 Z" fill="#d4a87a" stroke="#b08058" strokeWidth="0.8" />
          {/* Thumb */}
          <path d="M815 558 C820 564 824 574 820 580
            C816 586 808 584 804 578 C800 572 800 562 806 556 Z" fill="#d4a87a" stroke="#b08058" strokeWidth="0.8" />

          {/* Knuckle bumps */}
          <circle cx="750" cy="542" r="3.5" fill="rgba(255,255,255,0.06)" />
          <circle cx="744" cy="550" r="3.5" fill="rgba(255,255,255,0.05)" />
          <circle cx="748" cy="560" r="3" fill="rgba(255,255,255,0.05)" />

          {/* Polo sleeve at edge */}
          <path d="M1280 900 L1210 880 C1190 870 1170 855 1155 842 L1130 858 C1150 872 1175 888 1200 900 Z" fill="#1a2a1a" />
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
