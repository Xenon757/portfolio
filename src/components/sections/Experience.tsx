import { ArrowUpRight, Plus } from "lucide-react";
import { ExperienceMotion } from "@/components/motion/SectionMotion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Experience as Job } from "@/data/experience";

// Server component. Details expand with native <details> (keyboard-accessible,
// works without JS). Takes the list as a prop so hidden entries stay on the server.
export function Experience({ items }: { items: Job[] }) {
  // The most recent role with details starts open.
  const openIndex = items.findIndex((job) => job.bullets.length > 0);

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-t border-line px-6 py-24 md:px-12 md:py-32"
    >
      <ExperienceMotion />
      <SectionHeading id="experience-heading" label="Experience" title="Where I've worked" />

      <ol>
        {items.map((job, i) => (
          <li key={job.company} className="relative">
            <span data-exp-line aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line" />
            <div data-exp-row className="relative py-7 md:py-9">
              <div className="grid gap-x-10 gap-y-2 md:grid-cols-[14rem_1fr] md:items-baseline md:pr-32">
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
              </div>

              {job.bullets.length > 0 && (
                <details className="group" open={i === openIndex}>
                  <summary className="mt-4 inline-flex cursor-pointer list-none items-center gap-2 text-xs tracking-[0.2em] text-muted uppercase transition-colors hover:text-fg md:absolute md:top-9 md:right-0 md:mt-2 [&::-webkit-details-marker]:hidden">
                    <span className="group-open:hidden">Details</span>
                    <span className="hidden group-open:inline">Less</span>
                    <Plus aria-hidden="true" className="size-4 transition-transform duration-300 group-open:rotate-45" />
                    <span className="sr-only">for {job.company}</span>
                  </summary>
                  <ul className="mt-5 max-w-3xl space-y-3 motion-safe:group-open:animate-[exp-in_0.35s_ease-out] md:pl-[calc(14rem+2.5rem)]">
                    {job.bullets.map((b) => (
                      <li key={b} className="flex gap-4 text-base leading-relaxed text-fg/85">
                        <span className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          </li>
        ))}
      </ol>
      <span aria-hidden="true" className="block h-px bg-line" />
    </section>
  );
}
