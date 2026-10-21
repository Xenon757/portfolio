import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { Badge, Tag } from "@/components/ui/Tag";
import { getProject, projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline,
    openGraph: {
      title: project.name,
      description: project.tagline,
      images: [{ url: project.thumbnail.src, width: 2880, height: 1800, alt: project.thumbnail.alt }],
    },
  };
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  const id = title.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <section aria-labelledby={id} className="grid gap-6 border-t border-line py-14 md:grid-cols-[14rem_1fr] md:gap-12 md:py-20">
      <h2 id={id} className="flex items-baseline gap-3 text-xs tracking-[0.2em] text-muted uppercase">
        <span className="font-mono text-accent">{String(n).padStart(2, "0")}</span>
        {title}
      </h2>
      <div className="max-w-3xl">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-4 text-base leading-relaxed md:text-lg">
          <span className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  let n = 0;
  const step = () => ++n;

  return (
    <main id="main" className="px-6 pt-28 pb-16 md:px-12 md:pt-32">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-muted uppercase transition-colors hover:text-fg"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        All projects
      </Link>

      <header className="mt-10 md:mt-14">
        <p className="font-mono text-sm text-muted">_{String(index + 1).padStart(2, "0")}.</p>
        <h1 className="mt-3 font-display text-[clamp(3.5rem,11vw,9rem)] leading-[0.9] uppercase">{project.name}</h1>
        {(project.status || project.award) && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.status === "in-progress" && <Badge>In progress</Badge>}
            {project.award && <Badge>{project.award}</Badge>}
          </div>
        )}
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">{project.tagline}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech used">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.live && (
            <Button variant="primary" href={project.live} external>
              <ArrowUpRight className="size-4" aria-hidden="true" />
              Live site
            </Button>
          )}
          {project.source && (
            <Button href={project.source} external>
              <GitHubIcon className="size-4" />
              Source
            </Button>
          )}
          {project.links?.map((link) => (
            <Button key={link.href} href={link.href} external>
              {link.label}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Button>
          ))}
        </div>
        {project.liveNote && <p className="mt-4 text-sm text-muted">{project.liveNote}</p>}

        {project.team && (
          <p className="mt-8 max-w-3xl border-l-2 border-accent pl-4 text-sm leading-relaxed text-fg/90 md:text-base">
            {project.team}
          </p>
        )}
      </header>

      <div className="mt-12 overflow-hidden rounded-2xl border border-line md:mt-16">
        <Image
          src={project.thumbnail.src}
          alt={project.thumbnail.alt}
          width={2880}
          height={1800}
          priority
          sizes="(min-width: 1280px) 1184px, 100vw"
          className="h-auto w-full"
        />
      </div>

      <div className="mt-16 md:mt-24">
        <Section n={step()} title="Problem">
          <div className="space-y-5 text-base leading-relaxed md:text-lg">
            {project.problem.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Section>

        <Section n={step()} title="What I built">
          <Bullets items={project.built} />
        </Section>

        <Section n={step()} title="How it works">
          <div className="space-y-10">
            {project.how.map((h) => (
              <div key={h.title}>
                <h3 className="font-display text-2xl uppercase md:text-3xl">{h.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-fg/85 md:text-lg">{h.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {project.images.length > 0 && (
          <div className="grid gap-6 border-t border-line py-14 md:py-20">
            {project.images.map((img) => (
              <figure key={img.src}>
                <div className="overflow-hidden rounded-2xl border border-line">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={2880}
                    height={1800}
                    sizes="(min-width: 1280px) 1184px, 100vw"
                    className="h-auto w-full"
                  />
                </div>
                {img.caption && <figcaption className="mt-3 text-sm text-muted">{img.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}

        <Section n={step()} title="My role">
          <Bullets items={project.role} />
        </Section>

        {project.next.length > 0 && (
          <Section n={step()} title="What's next">
            <Bullets items={project.next} />
          </Section>
        )}
      </div>

      <nav aria-label="More projects" className="mt-8 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
        <Link href={`/projects/${prev.slug}`} className="group rounded-2xl border border-line p-6 transition-colors hover:border-fg">
          <span className="flex items-center gap-2 text-xs tracking-[0.2em] text-muted uppercase">
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Previous
          </span>
          <span className="mt-3 block font-display text-3xl uppercase transition-colors group-hover:text-accent md:text-4xl">
            {prev.name}
          </span>
        </Link>
        <Link
          href={`/projects/${next.slug}`}
          className="group rounded-2xl border border-line p-6 text-right transition-colors hover:border-fg"
        >
          <span className="flex items-center justify-end gap-2 text-xs tracking-[0.2em] text-muted uppercase">
            Next
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </span>
          <span className="mt-3 block font-display text-3xl uppercase transition-colors group-hover:text-accent md:text-4xl">
            {next.name}
          </span>
        </Link>
      </nav>
    </main>
  );
}
