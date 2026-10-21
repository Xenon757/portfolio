"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

// Arrow tip, in the SVG's own pixels. The arrow is drawn pointing right.
const TIP_X = 22;
const TIP_Y = 11;
/** Minimum pointer travel (px) between moves before the arrow re-aims. */
const AIM_THRESHOLD = 3;
const INTERACTIVE = "a, button, [role='button'], label, summary";

/**
 * Custom arrow cursor that trails the pointer and turns to face the direction
 * of movement; grows and turns accent-colored over links and buttons. Only on
 * fine pointers with hover (mouse/trackpad). The native cursor is hidden only
 * once this mounts, so without JS the normal cursor stays.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const reduce = prefersReducedMotion();
    const root = document.documentElement;
    root.classList.add("custom-cursor");

    const follow = reduce ? 0 : 0.18;
    const xTo = gsap.quickTo(el, "x", { duration: follow, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: follow, ease: "power3.out" });
    const rotTo = gsap.quickTo(el, "rotation", { duration: reduce ? 0 : 0.35, ease: "power2.out" });

    // Start pointing up-left like a normal cursor (-135° from "right").
    let angle = -135;
    gsap.set(el, { rotation: angle, transformOrigin: `${TIP_X}px ${TIP_Y}px`, autoAlpha: 0 });

    let lastX: number | null = null;
    let lastY: number | null = null;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const x = e.clientX - TIP_X;
      const y = e.clientY - TIP_Y;

      if (!visible) {
        visible = true;
        gsap.set(el, { x, y });
        gsap.to(el, { autoAlpha: 1, duration: 0.2 });
      }
      xTo(x);
      yTo(y);

      if (!reduce && lastX !== null && lastY !== null) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        if (Math.hypot(dx, dy) >= AIM_THRESHOLD) {
          const target = (Math.atan2(dy, dx) * 180) / Math.PI;
          // Turn the short way round so it never spins a full circle.
          const diff = ((target - angle + 540) % 360) - 180;
          angle += diff;
          rotTo(angle);
        }
      }
      lastX = e.clientX;
      lastY = e.clientY;

      const hovering = (e.target as Element | null)?.closest?.(INTERACTIVE);
      el.dataset.hover = hovering ? "true" : "false";
    };

    const hide = () => {
      visible = false;
      lastX = lastY = null;
      gsap.to(el, { autoAlpha: 0, duration: 0.2 });
    };
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) hide();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onOut);
    window.addEventListener("blur", hide);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
      window.removeEventListener("blur", hide);
      root.classList.remove("custom-cursor");
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-hover="false"
      className="group pointer-events-none fixed top-0 left-0 z-[100] invisible opacity-0"
    >
      <svg
        width="24"
        height="22"
        viewBox="0 0 24 22"
        className="block origin-[22px_11px] transition-transform duration-200 group-data-[hover=true]:scale-125"
      >
        <path
          d="M22 11 3.4 2.3c-.9-.4-1.8.5-1.4 1.4L6 11l-4 7.3c-.4.9.5 1.8 1.4 1.4Z"
          strokeLinejoin="round"
          strokeWidth="1.25"
          className="fill-fg stroke-muted transition-colors duration-200 group-data-[hover=true]:fill-accent group-data-[hover=true]:stroke-accent"
        />
      </svg>
    </div>
  );
}
