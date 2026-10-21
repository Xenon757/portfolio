import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Stack } from "@/components/sections/Stack";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Projects />
      <About />
      <Stack />
      <Experience items={experience} />

      {/* Contact shell until the Contact/Footer step (CLAUDE.md §10 build order). */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="min-h-[70svh] border-t border-line px-6 py-24 md:px-12 md:py-32"
      >
        <SectionHeading id="contact-heading" label="Contact" title="Get in touch" />
      </section>
    </main>
  );
}
