"use client";

import { ArrowUpRight, Plus } from "lucide-react";
import { useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Experience as Job } from "@/data/experience";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

// Takes the list as a prop (from the server page) so hidden entries never ship to the browser.
export function Experience({ items }: { items: Job[] }) {
  const ref = useRef<HTMLElement>(null);
  // The most recent role with details starts open; the rest are one click away.
  const [open, setOpen] = useState<Set<number>>(() => {
    const first = items.findIndex((job) => job.bullets.length > 0);
    return new Set(first === -1 ? [] : [first]);
  });

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Each divider draws in from the left as its row scrolls into view.
      gsap.utils.toArray<HTMLElement>("[data-exp-line]").forEach((line) => {
        gsap.from(line, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: line, start: "top 90%" },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-exp-row]").forEach((row) => {
        gsap.from(row, {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 90%" },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="experience"
      aria-labelledby="experience-heading"
      className="border-t border-line px-6 py-24 md:px-12 md:py-32"
    >
      <SectionHeading id="experience-heading" label="Experience" title="Where I've worked" />

      <ol>
        {items.map((job, i) => {
          const isOpen = open.has(i);
          const panelId = `exp-panel-${i}`;
          return (
            <li key={job.company} className="relative">
              <span data-exp-line aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line" />
              <div data-exp-row className="py-7 md:py-9">
                <div className="grid gap-x-10 gap-y-2 md:grid-cols-[14rem_1fr_auto] md:items-baseline">
                  <p className="font-mono text-xs tracking-wide text-muted md:text-sm">
                    {job.start} – {job.end}
                  </p>

                  <div>
                    <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-3xl leading-none uppercase md:text-4xl">
                      {job.url ? (
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                        >
                          {job.company}
                          <ArrowUpRight className="size-5" aria-hidden="true" />
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      ) : (
                        job.company
                      )}
                      {job.kind === "volunteer" && (
                        <span className="rounded-full border border-line px-2.5 py-1 font-sans text-xs tracking-normal text-muted normal-case">
                          Volunteer
                        </span>
                      )}
                    </h3>
                    <p className="mt-2 text-sm text-muted md:text-base">
                      {job.role}
                      {job.location && <> · {job.location}</>}
                    </p>
                  </div>

                  {job.bullets.length > 0 && (
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="mt-3 inline-flex items-center gap-2 self-start text-xs tracking-[0.2em] text-muted uppercase transition-colors hover:text-fg md:mt-0"
                    >
                      {isOpen ? "Less" : "Details"}
                      <Plus
                        aria-hidden="true"
                        className={cn("size-4 transition-transform duration-300", isOpen && "rotate-45")}
                      />
                      <span className="sr-only">for {job.company}</span>
                    </button>
                  )}
                </div>

                {job.bullets.length > 0 && (
                  <div
                    id={panelId}
                    hidden={!isOpen}
                    className="motion-safe:animate-[exp-in_0.35s_ease-out] md:pl-[calc(14rem+2.5rem)]"
                  >
                    <ul className="mt-5 max-w-3xl space-y-3">
                      {job.bullets.map((b) => (
                        <li key={b} className="flex gap-4 text-base leading-relaxed text-fg/85">
                          <span className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      <span aria-hidden="true" className="block h-px bg-line" />
    </section>
  );
}
