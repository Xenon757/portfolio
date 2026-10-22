import { AboutMotion } from "@/components/motion/SectionMotion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/data/site";

export function About() {
  const words = about.statement.split(" ");

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-line px-6 py-24 md:px-12 md:py-32"
    >
      <AboutMotion />
      <SectionHeading id="about-heading" label="About me" title="About" />

      <p data-statement className="max-w-5xl text-3xl leading-tight font-medium md:text-5xl md:leading-[1.1]">
        {words.map((word, i) => (
          <span key={i} data-word>
            {word}
            {i < words.length - 1 && " "}
          </span>
        ))}
      </p>

      <div data-about-body className="mt-14 grid max-w-5xl gap-8 md:mt-20 md:grid-cols-2 md:gap-x-16 md:gap-y-10">
        {about.paragraphs.map((p) => (
          <p key={p} data-about-p className="text-base leading-relaxed text-muted md:text-lg">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
