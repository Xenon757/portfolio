import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line px-2.5 py-1 text-xs leading-none text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Small pill for project status ("In progress") and awards. */
export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-xs leading-none font-medium text-accent-fg",
        className,
      )}
    >
      {children}
    </span>
  );
}
