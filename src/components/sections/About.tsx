"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/data/site";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

export function About() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Statement brightens word by word as it scrolls through the viewport.
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: "[data-statement]", start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
      gsap.from("[data-about-p]", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-about-body]", start: "top 85%" },
      });
    },
    { scope: ref },
  );

  const words = about.statement.split(" ");

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-line px-6 py-24 md:px-12 md:py-32"
    >
      <SectionHeading id="about-heading" label="About me" title="About" />

      <p data-statement className="max-w-5xl text-3xl leading-tight font-medium md:text-5xl md:leading-[1.1]">
        {words.map((word, i) => (
          <span key={i} data-word>
            {word}
            {i < words.length - 1 && " "}
          </span>
        ))}
      </p>

      <div data-about-body className="mt-14 grid gap-8 md:mt-20 md:grid-cols-3 md:gap-10">
        {about.paragraphs.map((p) => (
          <p key={p} data-about-p className="text-base leading-relaxed text-muted md:text-lg">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
