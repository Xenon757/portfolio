"use client";

import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { nav, site, socials } from "@/data/site";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Menu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { scrollTo, setLocked } = useSmoothScroll();

  const rootRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .to(overlayRef.current, { autoAlpha: 1, duration: 0.35, ease: "power2.out" })
        .fromTo(
          "[data-menu-item]",
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: "power3.out" },
          "-=0.15",
        );
    },
    { scope: rootRef },
  );

  const close = useCallback(() => setOpen(false), []);

  // Play/reverse the overlay, lock scrolling, and manage focus.
  useEffect(() => {
    setLocked(open);
    if (open) {
      tl.current?.timeScale(prefersReducedMotion() ? 100 : 1).play();
      // Wait a frame so GSAP has made the overlay visible (hidden elements can't take focus).
      const id = requestAnimationFrame(() =>
        overlayRef.current?.querySelector<HTMLElement>("nav a")?.focus(),
      );
      return () => cancelAnimationFrame(id);
    } else {
      // Closing runs faster than opening.
      tl.current?.timeScale(prefersReducedMotion() ? 100 : 2.5).reverse();
      if (overlayRef.current?.contains(document.activeElement)) toggleRef.current?.focus();
    }
  }, [open, setLocked]);

  // Close when the route changes (e.g. navigating to "/" from a project page).
  useEffect(() => close(), [pathname, close]);

  // Esc closes; Tab cycles focus within the toggle button + overlay.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        toggleRef.current?.focus();
        close();
        return;
      }
      if (e.key !== "Tab" || !rootRef.current) return;
      const items = [...rootRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  const onNavClick = (e: React.MouseEvent, id: string) => {
    // Off the home page, let the link navigate to "/#id" normally.
    if (!isHome) return;
    e.preventDefault();
    setLocked(false);
    close();
    scrollTo(id);
    history.replaceState(null, "", id === "top" ? "/" : `#${id}`);
  };

  return (
    <div ref={rootRef}>
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="group fixed top-5 right-5 z-50 flex size-14 items-center justify-center rounded-full border border-line bg-bg-elevated/80 backdrop-blur transition-colors hover:border-accent md:top-8 md:right-8"
      >
        <span className="relative block h-3 w-6" aria-hidden="true">
          <span
            className={cn(
              "absolute left-0 block h-0.5 w-6 bg-fg transition-transform duration-300",
              open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
            )}
          />
          <span
            className={cn(
              "absolute left-0 block h-0.5 w-6 bg-fg transition-transform duration-300",
              open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
            )}
          />
        </span>
      </button>

      <div
        ref={overlayRef}
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        data-lenis-prevent
        className="invisible fixed inset-0 z-40 overflow-y-auto bg-bg opacity-0"
      >
        <div className="mx-auto grid min-h-full max-w-6xl content-center gap-12 px-6 py-28 md:grid-cols-[1fr_2fr_1.2fr] md:gap-16 md:px-12">
          <div>
            <p data-menu-item className="mb-6 text-xs tracking-[0.2em] text-muted uppercase">
              Social
            </p>
            <ul className="space-y-3">
              {socials.map((s) => (
                <li key={s.label} data-menu-item>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-lg transition-colors hover:text-accent"
                  >
                    {s.label}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Main" className="order-first md:order-none">
            <p data-menu-item className="mb-6 text-xs tracking-[0.2em] text-muted uppercase">
              Menu
            </p>
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.id} data-menu-item>
                  <a
                    href={item.id === "top" ? "/" : `/#${item.id}`}
                    onClick={(e) => onNavClick(e, item.id)}
                    className="group/link relative inline-block font-display text-5xl uppercase transition-colors hover:text-accent focus-visible:text-accent md:text-6xl"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-1/2 -left-5 size-2 -translate-y-1/2 rounded-full bg-accent opacity-0 transition-opacity group-hover/link:opacity-100 group-focus-visible/link:opacity-100"
                    />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p data-menu-item className="mb-6 text-xs tracking-[0.2em] text-muted uppercase">
              Get in touch
            </p>
            <div data-menu-item>
              <a
                href={`mailto:${site.email}`}
                className="text-lg break-all transition-colors hover:text-accent"
              >
                {site.email}
              </a>
            </div>
            <p data-menu-item className="mt-3 text-sm text-muted">
              {site.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
