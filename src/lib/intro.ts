// Coordinates the first-visit intro (components/ui/Intro.tsx) with page
// animations such as the hero reveal, which should start as the intro uncovers
// the page. The pre-paint script in app/layout.tsx adds the "intro" class to
// <html> when the intro should play.

export const INTRO_SEEN_KEY = "intro-seen";
/** Matches the safety timeout in the pre-paint script. */
const FALLBACK_MS = 4000;

let revealed = false;
const listeners = new Set<() => void>();

export function introPending() {
  return (
    !revealed &&
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("intro")
  );
}

/** Calls `cb` once the intro starts uncovering the page (or right away if there's no intro). */
export function whenIntroRevealed(cb: () => void) {
  if (!introPending()) {
    cb();
    return () => {};
  }
  listeners.add(cb);
  // Never leave page animations waiting if the intro fails to run. Count only
  // visible time, since the intro itself waits for the tab to be visible.
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const cancelVisible = whenVisible(() => {
    timeout = setTimeout(markIntroRevealed, FALLBACK_MS);
  });
  return () => {
    listeners.delete(cb);
    cancelVisible();
    clearTimeout(timeout);
  };
}

/**
 * Calls `cb` now if the tab is visible, otherwise once it becomes visible.
 * Background tabs pause requestAnimationFrame (and so GSAP), so animations
 * meant to be seen should wait — e.g. a link opened in a new background tab.
 */
export function whenVisible(cb: () => void) {
  if (!document.hidden) {
    cb();
    return () => {};
  }
  const onChange = () => {
    if (document.hidden) return;
    document.removeEventListener("visibilitychange", onChange);
    cb();
  };
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

export function markIntroRevealed() {
  if (revealed) return;
  revealed = true;
  listeners.forEach((cb) => cb());
  listeners.clear();
}
