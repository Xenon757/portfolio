"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stack } from "@/data/stack";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function Stack() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-stack-item]");
      gsap.set(items, { y: 20, opacity: 0 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: "power3.out" }),
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="stack"
      aria-labelledby="stack-heading"
      className="border-t border-line px-6 py-24 md:px-12 md:py-32"
    >
      <SectionHeading id="stack-heading" label="My stack" title="Tools I use" />

      <div className="divide-y divide-line border-y border-line">
        {stack.map((group) => (
          <div key={group.label} className="grid gap-5 py-8 md:grid-cols-[14rem_1fr] md:gap-10 md:py-10">
            <h3 className="text-xs tracking-[0.2em] text-muted uppercase md:pt-3">{group.label}</h3>
            <ul className="flex flex-wrap gap-3">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  data-stack-item
                  className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-bg-elevated/60 px-4 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent md:text-base"
                >
                  {item.logo && (
                    // Monochrome logo tinted with the text color via a CSS mask.
                    <span
                      aria-hidden="true"
                      className="size-5 shrink-0 bg-current"
                      style={{
                        maskImage: `url(/logos/${item.logo}.svg)`,
                        WebkitMaskImage: `url(/logos/${item.logo}.svg)`,
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                      }}
                    />
                  )}
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
