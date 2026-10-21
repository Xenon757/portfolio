"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

type SmoothScrollApi = {
  /** Scroll to an element id (without "#") or to the top with "top". */
  scrollTo: (target: string) => void;
  /** Lock/unlock page scrolling (e.g. while the menu overlay is open). */
  setLocked: (locked: boolean) => void;
};

const SmoothScrollContext = createContext<SmoothScrollApi | null>(null);

export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) throw new Error("useSmoothScroll must be used inside <SmoothScroll>");
  return ctx;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Reduced motion: no Lenis, native scrolling only.
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ anchors: true, autoRaf: false });
    lenisRef.current = lenis;

    // Drive Lenis from GSAP's ticker so ScrollTrigger and Lenis share one frame loop.
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Next resets window scroll on route change; keep Lenis' internal position in sync.
  useEffect(() => {
    if (!window.location.hash) {
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    }
    ScrollTrigger.refresh();
  }, [pathname]);

  const scrollTo = useCallback((target: string) => {
    const el = target === "top" ? null : document.getElementById(target);
    if (target !== "top" && !el) return;

    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(el ?? 0, { duration: 1.2 });
    } else {
      const behavior = prefersReducedMotion() ? "auto" : "smooth";
      if (el) el.scrollIntoView({ behavior });
      else window.scrollTo({ top: 0, behavior });
    }
  }, []);

  const setLocked = useCallback((locked: boolean) => {
    const lenis = lenisRef.current;
    if (locked) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = locked ? "hidden" : "";
  }, []);

  const api = useMemo(() => ({ scrollTo, setLocked }), [scrollTo, setLocked]);

  return (
    <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>
  );
}
