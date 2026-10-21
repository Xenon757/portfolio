"use client";

import { ArrowDown, FileText, Mail } from "lucide-react";
import { useRef } from "react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { site, stats } from "@/data/site";
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
        .from("[data-hero-fade]", { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 }, "-=0.75")
        .fromTo(
          "[data-count]",
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
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
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
            </div>

            <dl className="grid grid-cols-3 gap-4 lg:grid-cols-1 lg:gap-7 lg:text-right">
              {stats.map((stat) => (
                <div key={stat.label} data-hero-fade className="flex flex-col-reverse justify-end gap-1">
                  <dt className="text-xs leading-snug text-muted md:text-sm lg:ml-auto lg:max-w-44">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-4xl leading-none text-accent md:text-5xl">
                    <span data-count={stat.value}>{stat.value}</span>
                    {stat.suffix}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

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
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line pt-6 text-xs tracking-[0.2em] text-muted uppercase"
        >
          <span>{site.location}</span>
          <a href="#projects" className="inline-flex items-center gap-2 text-fg transition-colors hover:text-accent">
            View projects
            <ArrowDown className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
