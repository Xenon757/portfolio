"use client";

import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { whenIntroRevealed } from "@/lib/intro";

/** Hero load-in: masked headline lines, fades, and stat counters. */
export function HeroMotion() {
  useGSAP(() => {
    const root = document.getElementById("top");
    if (!root) return;
    const q = gsap.utils.selector(root);
    const content = q("[data-hero]");
    if (prefersReducedMotion()) {
      gsap.set(content, { visibility: "visible" });
      return;
    }
    const tl = gsap
      .timeline({ paused: true, defaults: { ease: "power4.out" } })
      .from(q("[data-hero-line]"), { yPercent: 110, duration: 1.1, stagger: 0.12 })
      .from(q("[data-hero-fade]"), { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 }, "-=0.75")
      .fromTo(
        q("[data-count]"),
        { innerText: 0 },
        {
          // Read the target from data-count, not the text, which may already be mid-tween.
          innerText: (_: number, el: HTMLElement) => Number(el.dataset.count),
          snap: { innerText: 1 },
          duration: 1.4,
          ease: "power2.out",
          stagger: 0.1,
        },
        "<0.2",
      );
    // The "from" states above are applied synchronously, so it's safe to un-hide now.
    gsap.set(content, { visibility: "visible" });
    // On a first visit, start as the intro uncovers the page.
    return whenIntroRevealed(() => tl.play());
  }, []);

  return null;
}
