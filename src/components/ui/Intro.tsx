"use client";

import { useRef } from "react";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { site } from "@/data/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { INTRO_SEEN_KEY, introPending, markIntroRevealed, whenVisible } from "@/lib/intro";

const COLUMNS = 7; // 5 visible on mobile

/**
 * First-visit intro: the name rises in over dark columns, then the columns
 * slide away left to right to uncover the page. Plays once per browser session,
 * skippable by click, key, or scroll. Hidden unless the pre-paint script in
 * layout.tsx adds the "intro" class, so it never shows without JS or under
 * reduced motion.
 */
export function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const { setLocked } = useSmoothScroll();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !introPending()) return;

      try {
        sessionStorage.setItem(INTRO_SEEN_KEY, "1");
      } catch {}

      gsap.set(el, { display: "block" });
      setLocked(true);

      const finish = () => {
        gsap.set(el, { display: "none" });
        document.documentElement.classList.remove("intro");
        setLocked(false);
      };

      const tl = gsap
        .timeline({ paused: true, onComplete: finish })
        // fromTo with explicit y: 0 so GSAP ignores the CSS starting transform.
        .fromTo(
          "[data-intro-name]",
          { y: 0, yPercent: 110 },
          { y: 0, yPercent: 0, duration: 0.65, ease: "power4.out" },
        )
        .addLabel("wipe", "+=0.2")
        .to("[data-intro-name]", { yPercent: -110, duration: 0.5, ease: "power3.in" }, "wipe")
        .to(
          "[data-intro-col]",
          { yPercent: 100, duration: 0.7, stagger: 0.07, ease: "power3.inOut" },
          "wipe+=0.15",
        )
        .call(markIntroRevealed, [], "wipe+=0.35");

      // If the page was opened in a background tab, play once it's actually seen.
      const cancelVisible = whenVisible(() => tl.play());

      // Skip: fast-forward the rest instead of cutting, so it still feels intentional.
      const skip = () => tl.timeScale(4);
      const events = ["pointerdown", "keydown", "wheel", "touchmove"] as const;
      events.forEach((e) => window.addEventListener(e, skip, { once: true, passive: true }));

      // Keep the "intro" class on cleanup: React Strict Mode re-runs this effect in dev,
      // and the second run must still see that the intro is pending.
      return () => {
        events.forEach((e) => window.removeEventListener(e, skip));
        cancelVisible();
        tl.kill();
        gsap.set(el, { display: "none" });
        setLocked(false);
      };
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      data-intro
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] hidden"
    >
      <div className="absolute inset-0 flex">
        {Array.from({ length: COLUMNS }, (_, i) => (
          <div
            key={i}
            data-intro-col
            className={`h-full flex-1 border-t-2 border-r border-t-accent border-r-white/[0.06] bg-intro-col last:border-r-0 ${
              i >= 5 ? "hidden md:block" : ""
            }`}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="overflow-hidden">
          <p
            data-intro-name
            className="font-display text-[clamp(3.5rem,15vw,13rem)] leading-[0.95] whitespace-nowrap uppercase"
          >
            {site.name.split(" ")[0]} <span className="text-accent">{site.name.split(" ")[1]}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
