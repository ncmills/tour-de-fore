"use client";

import { useEffect, useRef } from "react";

export default function FireBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      hue: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnFlame = (baseX: number) => {
      const count = 3 + Math.floor(Math.random() * 4);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: baseX + (Math.random() - 0.5) * 60,
          y: canvas.height + 10,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -(2 + Math.random() * 4),
          life: 0,
          maxLife: 40 + Math.random() * 60,
          size: 20 + Math.random() * 40,
          hue: 10 + Math.random() * 30, // orange-red range
        });
      }
    };

    // Spawn points across the bottom
    const spawnPoints = Array.from({ length: 12 }, (_, i) => {
      return (i / 11) * (canvas.width * 0.9) + canvas.width * 0.05;
    });

    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new flames continuously
      frame++;
      if (frame % 2 === 0) {
        const idx = Math.floor(Math.random() * spawnPoints.length);
        spawnFlame(spawnPoints[idx]);
      }

      // Extra random spawns for fullness
      if (frame % 3 === 0) {
        spawnFlame(Math.random() * canvas.width);
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx + Math.sin(p.life * 0.1) * 0.8; // flicker sideways
        p.y += p.vy;
        p.vy *= 0.99; // slow down as they rise
        p.vx += (Math.random() - 0.5) * 0.3; // random horizontal drift

        const progress = p.life / p.maxLife;

        if (progress >= 1) {
          particles.splice(i, 1);
          continue;
        }

        // Flame opacity curve: ramp up fast, sustain, fade out
        let alpha: number;
        if (progress < 0.1) {
          alpha = progress / 0.1;
        } else if (progress < 0.4) {
          alpha = 1;
        } else {
          alpha = 1 - (progress - 0.4) / 0.6;
        }
        alpha *= 0.18; // overall opacity control

        // Size shrinks as flame rises
        const size = p.size * (1 - progress * 0.6);

        // Color shifts from bright yellow → orange → dark red as it rises
        const hue = p.hue - progress * 15;
        const sat = 100;
        const light = 55 - progress * 25;

        // Draw flame blob with soft edges
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
        gradient.addColorStop(0, `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`);
        gradient.addColorStop(0.4, `hsla(${hue - 5}, ${sat}%, ${light - 10}%, ${alpha * 0.6})`);
        gradient.addColorStop(1, `hsla(${hue - 10}, ${sat}%, ${light - 20}%, 0)`);

        ctx.beginPath();
        // Elongated vertically to look like flame tongues
        ctx.ellipse(p.x, p.y, size * 0.6, size, 0, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Base glow along the bottom
      const baseGrad = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - 200);
      baseGrad.addColorStop(0, "rgba(255, 60, 0, 0.12)");
      baseGrad.addColorStop(0.5, "rgba(255, 40, 0, 0.05)");
      baseGrad.addColorStop(1, "transparent");
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, canvas.height - 200, canvas.width, 200);

      // Ember particles (tiny bright dots)
      for (let i = 0; i < 3; i++) {
        if (Math.random() < 0.3) {
          particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: -(1 + Math.random() * 2),
            life: 0,
            maxLife: 80 + Math.random() * 80,
            size: 2 + Math.random() * 3,
            hue: 30 + Math.random() * 20,
          });
        }
      }

      // Cap particles for performance
      if (particles.length > 500) {
        particles = particles.slice(-400);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
