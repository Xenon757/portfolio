"use client";

import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type Query = (selector: string) => HTMLElement[];

/**
 * Runs GSAP setup against a server-rendered section, found by its DOM id.
 *
 * Sections are server components so React doesn't have to hydrate their
 * markup; a small client "motion" component calls this to attach animations.
 * Tweens created in `setup` are cleaned up on unmount (useGSAP context).
 * Skipped entirely under prefers-reduced-motion, leaving content as rendered.
 */
export function useSectionMotion(
  id: string,
  setup: (q: Query, root: HTMLElement) => void | (() => void),
) {
  useGSAP(() => {
    const root = document.getElementById(id);
    if (!root || prefersReducedMotion()) return;
    return setup(gsap.utils.selector(root) as Query, root);
  }, []);
}
