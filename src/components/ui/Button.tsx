import { cn } from "@/lib/utils";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "ghost";
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean;
};

/** Link styled as a pill button. */
export function Button({ variant = "ghost", external, className, children, ...props }: Props) {
  return (
    <a
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
      className={cn(
        "inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-medium tracking-wide transition-colors",
        variant === "primary"
          ? "bg-accent text-accent-fg hover:bg-fg"
          : "border border-line text-fg hover:border-fg",
        className,
      )}
    >
      {children}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}
