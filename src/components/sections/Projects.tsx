"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge, Tag } from "@/components/ui/Tag";
import { projects } from "@/data/projects";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const PREVIEW_W = 360; // px; thumbnails are 16:10

/**
 * Numbered project list. On mouse/trackpad devices, hovering a row shows a
 * floating thumbnail that follows the cursor.
 */
export function Projects() {
  const listRef = useRef<HTMLUListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [canPreview, setCanPreview] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanPreview(mq.matches);
    const onChange = () => setCanPreview(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!canPreview || !list || !preview) return;

    const lag = prefersReducedMotion() ? 0 : 0.5;
    const xTo = gsap.quickTo(preview, "x", { duration: lag, ease: "power3.out" });
    const yTo = gsap.quickTo(preview, "y", { duration: lag, ease: "power3.out" });

    // Sit the preview up and to the right of the pointer so the row text stays
    // readable, flipping/clamping so it never leaves the viewport.
    const place = (e: PointerEvent) => {
      const h = PREVIEW_W * 0.625;
      const x = e.clientX + 24 + PREVIEW_W > window.innerWidth ? e.clientX - 24 - PREVIEW_W : e.clientX + 24;
      const y = Math.max(16, e.clientY - h - 24);
      return { x, y };
    };
    const onMove = (e: PointerEvent) => {
      const { x, y } = place(e);
      xTo(x);
      yTo(y);
    };
    const onEnter = (e: PointerEvent) => gsap.set(preview, place(e));
    list.addEventListener("pointermove", onMove);
    list.addEventListener("pointerenter", onEnter);
    return () => {
      list.removeEventListener("pointermove", onMove);
      list.removeEventListener("pointerenter", onEnter);
    };
  }, [canPreview]);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    const quick = prefersReducedMotion();
    gsap.to(preview, {
      autoAlpha: active === null ? 0 : 1,
      scale: active === null ? 0.9 : 1,
      duration: quick ? 0 : 0.3,
      ease: "power2.out",
    });
  }, [active]);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-t border-line px-6 py-24 md:px-12 md:py-32"
    >
      <SectionHeading id="projects-heading" label="Selected projects" title="Things I've built" />

      <ul ref={listRef} onPointerLeave={() => setActive(null)} className="border-t border-line">
        {projects.map((project, i) => (
          <li key={project.slug} className="border-b border-line">
            <Link
              href={`/projects/${project.slug}`}
              onPointerEnter={() => canPreview && setActive(i)}
              onFocus={() => canPreview && setActive(i)}
              onBlur={() => setActive(null)}
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

      {/* Floating preview (desktop only). All thumbnails are rendered so swapping is instant. */}
      {canPreview && (
        <div
          ref={previewRef}
          aria-hidden="true"
          style={{ width: PREVIEW_W }}
          className="pointer-events-none invisible fixed top-0 left-0 z-30 aspect-[16/10] overflow-hidden rounded-xl border border-line opacity-0 shadow-2xl shadow-black/50"
        >
          {projects.map((project, i) => (
            <Image
              key={project.slug}
              src={project.thumbnail.src}
              alt=""
              fill
              sizes={`${PREVIEW_W}px`}
              className={cn(
                "object-cover object-top transition-opacity duration-300",
                active === i ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}
