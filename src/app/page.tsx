import { site } from "@/data/site";

// Placeholder until the real sections land (see CLAUDE.md §3).
export default function Home() {
  return (
    <main className="flex min-h-svh flex-col justify-center px-6 md:px-12">
      <p className="mb-4 text-sm tracking-[0.2em] text-muted uppercase">
        {site.name}
      </p>
      <h1 className="font-display text-hero uppercase">
        Software <span className="text-accent">Engineer</span>
      </h1>
    </main>
  );
}
