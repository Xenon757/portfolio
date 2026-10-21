"use client";

import { ArrowDown, FileText, Mail } from "lucide-react";
import { useRef } from "react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { whenIntroRevealed } from "@/lib/intro";

const headline = ["Software", "Engineer"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const content = "[data-hero]";
      if (prefersReducedMotion()) {
        gsap.set(content, { visibility: "visible" });
        return;
      }
      const tl = gsap
        .timeline({ paused: true, defaults: { ease: "power4.out" } })
        .from("[data-hero-line]", { yPercent: 110, duration: 1.1, stagger: 0.12 })
        .from("[data-hero-fade]", { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 }, "-=0.75");
      // The "from" states above are applied synchronously, so it's safe to un-hide now.
      gsap.set(content, { visibility: "visible" });
      // On a first visit, start as the intro uncovers the page.
      return whenIntroRevealed(() => tl.play());
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh flex-col px-6 pt-28 pb-8 md:px-12 md:pt-32 md:pb-10"
    >
      <div data-hero className="flex flex-1 flex-col">
        <div data-hero-fade>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-bg-elevated px-4 py-2 text-xs tracking-wide text-fg">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {site.status}
          </p>
        </div>

        <div className="my-auto py-12">
          <p data-hero-fade className="mb-4 text-sm tracking-[0.25em] text-muted uppercase md:mb-6">
            Hi, I&apos;m {site.name}
          </p>
          <h1 id="hero-heading" className="font-display text-hero uppercase">
            <span className="sr-only">{site.name}, </span>
            {headline.map((word, i) => (
              // Each line is masked so the word slides up from beneath its own baseline.
              <span key={word} className="block overflow-hidden pb-[0.04em]">
                <span data-hero-line className={i === 1 ? "block text-accent sm:pl-[1.4em]" : "block"}>
                  {word}
                </span>
                {i < headline.length - 1 && " "}
              </span>
            ))}
          </h1>

          <div className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
            <p data-hero-fade className="max-w-md text-base leading-relaxed text-muted md:text-lg">
              {site.intro}
            </p>
            <div data-hero-fade className="flex flex-wrap gap-3">
              <Button variant="primary" href={`mailto:${site.email}`}>
                <Mail className="size-4" aria-hidden="true" />
                Email me
              </Button>
              <Button href={site.github} external>
                <GitHubIcon className="size-4" />
                GitHub
              </Button>
              <Button href={site.linkedin} external>
                <LinkedInIcon className="size-4" />
                LinkedIn
              </Button>
              <Button href={site.resume} external>
                <FileText className="size-4" aria-hidden="true" />
                Résumé
              </Button>
            </div>
          </div>
        </div>

        <div
          data-hero-fade
          className="flex items-center justify-between border-t border-line pt-6 text-xs tracking-[0.2em] text-muted uppercase"
        >
          <span>{site.location}</span>
          <a href="#about" className="hidden items-center gap-2 transition-colors hover:text-fg sm:inline-flex">
            Scroll
            <ArrowDown className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
