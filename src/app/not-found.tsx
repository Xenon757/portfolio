import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-svh flex-col items-start justify-center px-6 md:px-12">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="mt-3 font-display text-[clamp(3rem,10vw,8rem)] leading-[0.9] uppercase">
        Page not <span className="text-accent">found</span>
      </h1>
      <p className="mt-6 max-w-md text-muted">That page doesn&apos;t exist. It may have moved.</p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center rounded-full bg-accent px-6 text-sm font-medium text-accent-fg transition-colors hover:bg-fg"
      >
        Back home
      </Link>
    </main>
  );
}
