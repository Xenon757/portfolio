"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

type Dot = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  /** Twinkle phase and speed. */
  phase: number;
  speed: number;
  /** Scroll parallax factor — bigger dots sit "closer" and move more. */
  depth: number;
};

/** Pixels of viewport area per dot. */
const AREA_PER_DOT = 9000;
const MAX_DOTS = 140;

/**
 * Fixed full-screen canvas of faint drifting, twinkling dots behind the page,
 * with light scroll parallax. Decorative only. Under reduced motion the dots
 * are drawn once and don't move.
 */
export function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = prefersReducedMotion();
    const color = getComputedStyle(document.documentElement).getPropertyValue("--fg").trim();
    let w = 0;
    let h = 0;
    let dots: Dot[] = [];
    let raf = 0;

    const makeDot = (): Dot => {
      const r = Math.random() * 1.1 + 0.4;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r,
        vx: (Math.random() - 0.5) * 0.08,
        vy: -(Math.random() * 0.12 + 0.03),
        alpha: Math.random() * 0.45 + 0.15,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.005,
        depth: 0.04 + (r - 0.4) * 0.12,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      const scroll = window.scrollY;
      for (const d of dots) {
        const y = (((d.y - scroll * d.depth) % h) + h) % h;
        ctx.globalAlpha = d.alpha * (0.6 + 0.4 * Math.sin(d.phase));
        ctx.beginPath();
        ctx.arc(d.x, y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Keep existing dots (mobile URL-bar show/hide fires resize while scrolling);
      // only add or drop dots to match the new area. Positions wrap via % w / % h.
      const count = Math.min(MAX_DOTS, Math.round((w * h) / AREA_PER_DOT));
      dots = dots.slice(0, count);
      while (dots.length < count) dots.push(makeDot());
      draw();
    };

    const tick = () => {
      for (const d of dots) {
        d.x = (d.x + d.vx + w) % w;
        d.y = (d.y + d.vy + h) % h;
        d.phase += d.speed;
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    resize();
    window.addEventListener("resize", onResize);
    if (!still) raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
