"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useSectionMotion } from "@/lib/motion";

// Small client components that attach scroll animations to server-rendered
// sections (see useSectionMotion). Each renders nothing.

/** About: statement brightens word by word; paragraphs fade up. */
export function AboutMotion() {
  useSectionMotion("about", (q) => {
    gsap.fromTo(
      q("[data-word]"),
      // 0.4 keeps dimmed words at >= 3:1 contrast (WCAG large text) before they light up.
      { opacity: 0.4 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: { trigger: q("[data-statement]")[0], start: "top 80%", end: "bottom 45%", scrub: true },
      },
    );
    gsap.from(q("[data-about-p]"), {
      y: 24,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: q("[data-about-body]")[0], start: "top 85%" },
    });
  });
  return null;
}

/** Stack: chips fade up in batches as they enter. */
export function StackMotion() {
  useSectionMotion("stack", (q) => {
    const items = q("[data-stack-item]");
    gsap.set(items, { y: 20, opacity: 0 });
    ScrollTrigger.batch(items, {
      start: "top 90%",
      once: true,
      onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: "power3.out" }),
    });
  });
  return null;
}

/** Experience: dividers draw in from the left; rows fade up. */
export function ExperienceMotion() {
  useSectionMotion("experience", (q) => {
    for (const line of q("[data-exp-line]")) {
      gsap.from(line, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: { trigger: line, start: "top 90%" },
      });
    }
    for (const row of q("[data-exp-row]")) {
      gsap.from(row, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: row, start: "top 90%" },
      });
    }
  });
  return null;
}

/** Contact: masked headline lines rise in, then the rest fades up. */
export function ContactMotion() {
  useSectionMotion("contact", (q) => {
    const heading = q("[data-contact-heading]")[0];
    gsap.from(q("[data-contact-line]"), {
      yPercent: 110,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: { trigger: heading, start: "top 85%" },
    });
    gsap.from(q("[data-contact-fade]"), {
      y: 24,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: heading, start: "top 70%" },
    });
  });
  return null;
}
