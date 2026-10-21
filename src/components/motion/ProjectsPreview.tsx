"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const PREVIEW_W = 360; // px; thumbnails are 16:10

/**
 * Floating thumbnail that follows the cursor over the server-rendered project
 * rows ([data-project-index] inside #projects). Mouse/trackpad devices only.
 */
export function ProjectsPreview({ thumbnails }: { thumbnails: string[] }) {
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
    const list = document.querySelector<HTMLElement>("#projects [data-project-list]");
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
    const rowIndex = (target: EventTarget | null) => {
      const row = (target as Element | null)?.closest?.("[data-project-index]");
      return row ? Number((row as HTMLElement).dataset.projectIndex) : null;
    };

    const onMove = (e: PointerEvent) => {
      const { x, y } = place(e);
      xTo(x);
      yTo(y);
      setActive(rowIndex(e.target));
    };
    const onEnter = (e: PointerEvent) => gsap.set(preview, place(e));
    const onLeave = () => setActive(null);
    const onFocusIn = (e: FocusEvent) => setActive(rowIndex(e.target));
    const onFocusOut = () => setActive(null);

    list.addEventListener("pointermove", onMove);
    list.addEventListener("pointerenter", onEnter);
    list.addEventListener("pointerleave", onLeave);
    list.addEventListener("focusin", onFocusIn);
    list.addEventListener("focusout", onFocusOut);
    return () => {
      list.removeEventListener("pointermove", onMove);
      list.removeEventListener("pointerenter", onEnter);
      list.removeEventListener("pointerleave", onLeave);
      list.removeEventListener("focusin", onFocusIn);
      list.removeEventListener("focusout", onFocusOut);
    };
  }, [canPreview]);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    gsap.to(preview, {
      autoAlpha: active === null ? 0 : 1,
      scale: active === null ? 0.9 : 1,
      duration: prefersReducedMotion() ? 0 : 0.3,
      ease: "power2.out",
    });
  }, [active]);

  if (!canPreview) return null;

  return (
    <div
      ref={previewRef}
      aria-hidden="true"
      style={{ width: PREVIEW_W }}
      className="pointer-events-none invisible fixed top-0 left-0 z-30 aspect-[16/10] overflow-hidden rounded-xl border border-line opacity-0 shadow-2xl shadow-black/50"
    >
      {thumbnails.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes={`${PREVIEW_W}px`}
          className={cn("object-cover object-top transition-opacity duration-300", active === i ? "opacity-100" : "opacity-0")}
        />
      ))}
    </div>
  );
}
