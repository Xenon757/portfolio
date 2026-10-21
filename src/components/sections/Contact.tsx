"use client";

import { ArrowUp, Check, Copy, FileText } from "lucide-react";
import { useRef, useState } from "react";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

const headline = ["Have an", "opportunity", "in mind?"];

/** Site-wide footer: contact call to action, links, and credits. */
export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-contact-line]", {
        yPercent: 110,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: "[data-contact-heading]", start: "top 85%" },
      });
      gsap.from("[data-contact-fade]", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-contact-heading]", start: "top 70%" },
      });
    },
    { scope: ref },
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context): the mailto link still works.
    }
  };

  return (
    <footer
      ref={ref}
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-line px-6 pt-24 pb-8 md:px-12 md:pt-32 md:pb-10"
    >
      <p data-contact-fade className="mb-6 flex items-center gap-3 text-xs tracking-[0.2em] text-muted uppercase">
        <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
        Contact
      </p>

      <h2
        id="contact-heading"
        data-contact-heading
        className="font-display text-[clamp(3rem,10vw,9rem)] leading-[0.9] uppercase"
      >
        {headline.map((line, i) => (
          <span key={line} className="block overflow-hidden pb-[0.04em]">
            <span data-contact-line className={i === 1 ? "block text-accent" : "block"}>
              {line}
            </span>
            {i < headline.length - 1 && " "}
          </span>
        ))}
      </h2>

      <p data-contact-fade className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
        I&apos;m {site.status.charAt(0).toLowerCase() + site.status.slice(1)}. The quickest way to reach me is
        email.
      </p>

      <div data-contact-fade className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
        <a
          href={`mailto:${site.email}`}
          className="font-display text-3xl break-all uppercase underline decoration-line decoration-2 underline-offset-8 transition-colors hover:text-accent hover:decoration-accent md:text-5xl"
        >
          {site.email}
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-xs tracking-wide text-muted transition-colors hover:border-fg hover:text-fg"
        >
          {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
          {copied ? "Copied" : "Copy email"}
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? "Email address copied to clipboard" : ""}
        </span>
      </div>

      <div data-contact-fade className="mt-10 flex flex-wrap gap-3">
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

      <div className="mt-24 flex flex-col gap-4 border-t border-line pt-6 text-xs tracking-[0.15em] text-muted uppercase md:mt-32 md:flex-row md:items-center md:justify-between">
        <p>Designed &amp; built by {site.name}</p>
        <p>{site.location}</p>
        <button
          type="button"
          onClick={() => scrollTo("top")}
          className="inline-flex items-center gap-2 self-start uppercase transition-colors hover:text-fg md:self-auto"
        >
          Back to top
          <ArrowUp className="size-3.5" aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
