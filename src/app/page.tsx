import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Section shells so the menu has scroll targets. Each one gets its real
// component in later build steps (see CLAUDE.md §3 and §10 build order).
const shells = [
  { id: "about", label: "About me", title: "About" },
  { id: "stack", label: "My stack", title: "Stack" },
  { id: "experience", label: "Experience", title: "Where I've worked" },
  { id: "contact", label: "Contact", title: "Get in touch" },
];

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Projects />

      {shells.map((s) => (
        <section
          key={s.id}
          id={s.id}
          aria-labelledby={`${s.id}-heading`}
          className="min-h-[70svh] border-t border-line px-6 py-24 md:px-12 md:py-32"
        >
          <SectionHeading id={`${s.id}-heading`} label={s.label} title={s.title} />
        </section>
      ))}
    </main>
  );
}
