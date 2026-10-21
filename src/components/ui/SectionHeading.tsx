import { cn } from "@/lib/utils";

type Props = {
  label: string;
  title: string;
  id?: string;
  className?: string;
};

/** Small uppercase label above a large uppercase section title. */
export function SectionHeading({ label, title, id, className }: Props) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <p className="mb-3 flex items-center gap-3 text-xs tracking-[0.2em] text-muted uppercase">
        <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
        {label}
      </p>
      <h2 id={id} className="font-display text-5xl leading-none uppercase md:text-7xl">
        {title}
      </h2>
    </div>
  );
}
