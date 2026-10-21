import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ProjectsPreview } from "@/components/motion/ProjectsPreview";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge, Tag } from "@/components/ui/Tag";
import { projects } from "@/data/projects";

/**
 * Numbered project list (server component). On mouse/trackpad devices,
 * ProjectsPreview shows a floating thumbnail that follows the cursor.
 */
export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-t border-line px-6 py-24 md:px-12 md:py-32"
    >
      <SectionHeading id="projects-heading" label="Selected projects" title="Things I've built" />

      <ul data-project-list className="border-t border-line">
        {projects.map((project, i) => (
          <li key={project.slug} className="border-b border-line">
            <Link
              href={`/projects/${project.slug}`}
              data-project-index={i}
              className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-4 gap-y-3 py-8 md:grid-cols-[5rem_1fr_auto] md:items-center md:py-10"
            >
              <span className="pt-2 font-mono text-sm text-muted md:pt-0">
                _{String(i + 1).padStart(2, "0")}.
              </span>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <h3 className="font-display text-4xl leading-none uppercase transition-colors group-hover:text-accent group-focus-visible:text-accent md:text-6xl">
                    {project.name}
                  </h3>
                  {project.status === "in-progress" && <Badge>In progress</Badge>}
                  {project.award && <Badge>{project.award}</Badge>}
                </div>
                <p className="mt-3 max-w-2xl text-sm text-muted md:text-base">{project.tagline}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech used">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              </div>

              <ArrowUpRight
                aria-hidden="true"
                className="mt-2 size-6 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent md:mt-0 md:size-8"
              />
            </Link>
          </li>
        ))}
      </ul>

      <ProjectsPreview thumbnails={projects.map((p) => p.thumbnail.src)} />
    </section>
  );
}
