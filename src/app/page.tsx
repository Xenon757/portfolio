import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

// Section shells so the menu has scroll targets. Each one gets its real
// component in later build steps (see CLAUDE.md §3 and §10 build order).
const shells = [
  { id: "about", label: "About me", title: "About" },
  { id: "stack", label: "My stack", title: "Stack" },
  { id: "experience", label: "Experience", title: "Where I've worked" },
  { id: "projects", label: "Selected projects", title: "Projects" },
  { id: "contact", label: "Contact", title: "Get in touch" },
];

export default function Home() {
  return (
    <main id="main">
      <section id="top" className="flex min-h-svh flex-col justify-center px-6 md:px-12">
        <p className="mb-4 text-sm tracking-[0.2em] text-muted uppercase">{site.name}</p>
        <h1 className="font-display text-hero uppercase">
          Software <span className="text-accent">Engineer</span>
        </h1>
      </section>

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
