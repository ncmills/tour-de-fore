"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import HomeButton from "@/components/HomeButton";
import MulliganButton from "@/components/MulliganButton";

/* ── palette (brand ember + the site's own ExplosionGate glitch triad) ── */
const EMBER = "#EA580C";
const NEON = "#FF6A28";
const ACID = "#B8FF00";
const MAGENTA = "#FF2D78";
const CYAN = "#00CFFF";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*<>/\\█▓▒░@?!";

/* ───────────────────────── scramble-decode text ───────────────────────── */
function useScramble(target: string, active: boolean) {
  const [out, setOut] = useState(active ? target : target);
  const raf = useRef<number | null>(null);
  const run = useCallback(() => {
    if (!active) { setOut(target); return; }
    const start = performance.now();
    const dur = 620 + target.length * 22;
    const seedArr = target.split("").map(() => Math.random());
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      let s = "";
      for (let i = 0; i < target.length; i++) {
        const reveal = i / target.length;
        if (p >= reveal + 0.12 || target[i] === " ") s += target[i];
        else s += GLYPHS[Math.floor((Math.random() * seedArr[i] * 100 + now / 30 + i) % GLYPHS.length)];
      }
      setOut(s);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setOut(target);
    };
    raf.current = requestAnimationFrame(tick);
  }, [target, active]);
  useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current); }, []);
  return { out, run };
}

function Scramble({ text, active, className, style }: { text: string; active: boolean; className?: string; style?: React.CSSProperties }) {
  const { out, run } = useScramble(text, active);
  const seen = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting && !seen.current) { seen.current = true; run(); } });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [active, run]);
  return (
    <span ref={ref} className={className} style={style} onMouseEnter={active ? run : undefined}>
      {out}
    </span>
  );
}

/* ───────────────────────── cursor-reactive spark field ───────────────────────── */
function SparkField({ intensity, enabled }: { intensity: number; enabled: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const iRef = useRef(intensity);
  useEffect(() => { iRef.current = intensity; }, [intensity]);
  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = 0, h = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = [EMBER, NEON, ACID, MAGENTA, CYAN];
    type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; c: string };
    const parts: P[] = [];
    const spawn = (x: number, y: number, n: number) => {
      for (let k = 0; k < n; k++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 0.4 + Math.random() * (1.6 + iRef.current * 3);
        parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 0.6, life: 0, max: 40 + Math.random() * 60, size: 1 + Math.random() * 2.4, c: cols[Math.floor(Math.random() * (1 + Math.round(iRef.current * 4)))] });
      }
    };
    const onMove = (e: MouseEvent) => spawn(e.clientX, e.clientY, 1 + Math.round(iRef.current * 3));
    window.addEventListener("mousemove", onMove);

    let alive = true;
    const loop = () => {
      if (!alive) return;
      ctx.clearRect(0, 0, w, h);
      const ambRate = 0.15 + iRef.current * 1.4;
      if (Math.random() < ambRate) spawn(Math.random() * w, h + 6, 1);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life++; p.x += p.vx; p.y += p.vy; p.vy += 0.012; p.vx *= 0.99;
        const t = 1 - p.life / p.max;
        if (t <= 0) { parts.splice(i, 1); continue; }
        ctx.globalAlpha = t;
        ctx.fillStyle = p.c;
        ctx.shadowBlur = 8 + iRef.current * 10;
        ctx.shadowColor = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      if (parts.length > 900) parts.splice(0, parts.length - 900);
      requestAnimationFrame(loop);
    };
    loop();
    return () => { alive = false; window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMove); };
  }, [enabled]);
  if (!enabled) return null;
  return <canvas ref={canvasRef} aria-hidden style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }} />;
}

/* ───────────────────────── draggable lore artifacts ───────────────────────── */
const ARTIFACTS = [
  { e: "⛳", top: "16%", left: "6%", r: -12 },
  { e: "🍺", top: "42%", left: "88%", r: 14 },
  { e: "🏆", top: "68%", left: "4%", r: -8 },
  { e: "🔥", top: "84%", left: "90%", r: 10 },
  { e: "🏌️", top: "30%", left: "92%", r: -16 },
];
function Artifacts({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  return (
    <div aria-hidden className="lore-artifacts" style={{ position: "fixed", inset: 0, zIndex: 6, pointerEvents: "none" }}>
      {ARTIFACTS.map((a, i) => (
        <motion.div
          key={i}
          drag
          dragMomentum
          dragElastic={0.5}
          whileDrag={{ scale: 1.35, rotate: a.r * 3 }}
          animate={{ y: [0, -14, 0], rotate: [a.r, a.r + 6, a.r] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", top: a.top, left: a.left,
            fontSize: "clamp(1.8rem, 4vw, 3rem)", cursor: "grab", pointerEvents: "auto",
            filter: "drop-shadow(0 0 12px rgba(234,88,12,0.6))", userSelect: "none",
          }}
        >
          {a.e}
        </motion.div>
      ))}
    </div>
  );
}

/* ───────────────────────── the page ───────────────────────── */
const TICKER = [
  "108 HOLES", "THREE DAYS", "ZERO PARS", "SIX YEARS RUNNING", "HANDICAPS ARE LIES",
  "EST. 2021", "A FELONY'S WORTH OF MEMORIES", "NOBODY HAS BROKEN PAR", "THE SEVENTH IS BOOKED",
  "ONE BAD IDEA, REPEATED ANNUALLY", "BROWN BUTTER CAKE", "MORE MEMORIES THAN MOST MAKE IN A LIFETIME",
];

function chromatic(px: number): string {
  return `${px}px 0 ${CYAN}, -${px}px 0 ${MAGENTA}, 0 0 ${8 + px * 3}px rgba(255,106,40,0.6)`;
}

export default function LoreClient() {
  const reduce = useReducedMotion();
  const fx = !reduce; // effects on only when motion allowed
  const [chaos, setChaos] = useState(0.35); // 0..1  → "CRANK THE LORE"

  // chromatic-aberration offset scales with chaos; gentle jitter on headings via CSS var
  const ca = fx ? 1 + chaos * 3 : 0;
  const dial = Math.round(chaos * 11);

  return (
    <main
      style={{
        position: "relative", minHeight: "100vh", background: "#000", color: "#fff",
        overflowX: "clip",
        // @ts-expect-error custom prop
        "--ca": `${ca}px`,
      }}
    >
      <MulliganButton />
      <HomeButton />

      {/* ambient layers */}
      <SparkField intensity={chaos} enabled={fx} />
      <div aria-hidden className="lore-scan" />
      <div aria-hidden className="lore-vignette" />

      {/* top chyron */}
      <div className="lore-chyron" aria-hidden>
        <div className="lore-chyron-track" style={{ animationDuration: `${fx ? Math.max(8, 34 - chaos * 24) : 30}s` }}>
          {[0, 1].map((dup) => (
            <span key={dup} className="lore-chyron-inner">
              {TICKER.map((t, i) => (
                <span key={i} className="lore-chyron-item">
                  <span style={{ color: [ACID, MAGENTA, CYAN, NEON][i % 4] }}>◆</span> {t}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <article className="lore-stage" style={{ position: "relative", zIndex: 3, maxWidth: 860, margin: "0 auto", padding: "clamp(4.5rem, 9vw, 7rem) clamp(1.1rem, 4vw, 3rem) 6rem" }}>
        <Artifacts enabled={fx} />

        {/* masthead */}
        <p className="lore-eyebrow" style={{ color: "rgba(255,255,255,0.4)" }}>Est. 2021 · Belmont Mills LLC · The Official Record</p>
        <h1 className="lore-masthead" data-text="THE LORE" style={{ fontFamily: "var(--font-blackletter), sans-serif" }}>
          THE LORE
        </h1>

        {/* hero thesis */}
        <h2 className="lore-h1" style={{ textShadow: chromatic(ca) }}>
          <Scramble text="We planned ours." active={fx} />
        </h2>
        <p className="lore-lede">
          Tour de Fore started as one group text and a shared spreadsheet. It is now six years of
          annual golf trips, a felony&rsquo;s worth of memories, and a pro shop. This is where it lives.
        </p>

        {/* clear, top-of-page pointer to the spun-off AI planner */}
        <a href="https://handicaphq.com" className="lore-relocate">
          <span className="lore-relocate-tag">⛳ The planner moved</span>
          <span className="lore-relocate-msg">
            Looking to plan your own golf trip? Our AI planner now lives at{" "}
            <strong>Handicap&nbsp;HQ</strong> — handicaphq.com.
          </span>
          <span className="lore-relocate-go">Plan a trip&nbsp;→</span>
        </a>

        <div className="lore-rule" />

        {/* Chapter I */}
        <section className="lore-chapter">
          <p className="lore-eyebrow"><span className="lore-numeral">I</span> How it started</p>
          <h3 className="lore-h2" style={{ textShadow: chromatic(ca) }}>
            <Scramble text="Six friends. One bad idea. Repeated annually." active={fx} />
          </h3>
          <p className="lore-body">
            In 2021 a handful of us decided a normal weekend wasn&rsquo;t enough and booked a golf
            trip with roughly the planning discipline of a fraternity formal. Something about 108
            holes in three days, zero adult supervision, and a fish fry that ended in a chef&rsquo;s
            brown butter cake made us do it again. And again.
          </p>
          <p className="lore-body">
            We&rsquo;ve gone every year since — six trips now, the seventh already on the calendar.
            The handicaps got worse. The itineraries got better. Nobody has broken par, which is not
            the point and never was.
          </p>
        </section>

        {/* Chapter II */}
        <section className="lore-chapter">
          <p className="lore-eyebrow"><span className="lore-numeral">II</span> What this is</p>
          <h3 className="lore-h2" style={{ textShadow: chromatic(ca) }}>
            <Scramble text="The clubhouse, not the concierge." active={fx} />
          </h3>
          <p className="lore-body">
            tourdefore.com is our clubhouse. Two doors off the lobby. The{" "}
            <Link href="/past-trips" className="lore-link">Body of Work</Link> is the receipts — every
            trip we&rsquo;ve actually taken, course by course, meal by meal, hangover by hangover. The{" "}
            <Link href="/shop" className="lore-link">Pro Shop</Link> is where you put the colors on:
            embroidered hats, polos, the works, made to order.
          </p>
          <p className="lore-body">
            That&rsquo;s it. No membership, no manifesto, no newsletter you have to unsubscribe from
            three times. Just the trips and the merch.
          </p>
        </section>

        {/* Chapter III */}
        <section className="lore-chapter">
          <p className="lore-eyebrow"><span className="lore-numeral">III</span> Want your own?</p>
          <h3 className="lore-h2" style={{ textShadow: chromatic(ca) }}>
            <Scramble text="We built a robot for that. It moved out." active={fx} />
          </h3>
          <p className="lore-body">
            Planning these trips got obsessive enough that we built a machine to do it — an AI that
            spits out a full golf-trip itinerary from a few answers. It got big enough to need its
            own building, so it moved out. It lives at{" "}
            <a href="https://handicaphq.com" className="lore-link">Handicap HQ</a> now. Go let it plan
            your version — then come back here and show us the scorecard.
          </p>
        </section>

        <div className="lore-rule" />

        <p className="lore-signoff">Onwards and upwards. Or at least onwards to the next tee.</p>

        <div className="lore-ctas">
          <Link href="/past-trips" className="lore-cta lore-cta--solid">See the Body of Work</Link>
          <Link href="/shop" className="lore-cta lore-cta--ghost">Enter the Pro Shop</Link>
        </div>
      </article>

      {/* ── SIGNATURE: CRANK THE LORE ── */}
      {fx && (
        <div className="lore-meter" role="group" aria-label="Crank the lore">
          <div className="lore-meter-label">
            <span>CRANK</span><span>THE LORE</span>
          </div>
          <input
            type="range" min={0} max={1} step={0.01} value={chaos}
            aria-label="Lore intensity"
            onChange={(e) => setChaos(parseFloat(e.target.value))}
            className="lore-meter-slider"
            style={{ accentColor: dial > 8 ? MAGENTA : dial > 4 ? EMBER : ACID }}
          />
          <div className="lore-meter-read" style={{ color: dial > 8 ? MAGENTA : dial > 4 ? NEON : ACID }}>
            {dial}<span style={{ opacity: 0.4 }}>/11</span>
          </div>
        </div>
      )}
    </main>
  );
}
