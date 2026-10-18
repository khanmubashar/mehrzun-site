import { cn } from "@/lib/utils";

const tones = {
  default: "bg-background text-foreground",
  muted: "bg-surface-muted text-foreground",
  inverse: "bg-inverse text-inverse-foreground",
  "inverse-deep": "bg-inverse-deep text-inverse-foreground",
} as const;

/** Page section wrapper: consistent spacing, background tone and anchor id. */
export function Section({
  id,
  tone = "default",
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLElement> & { tone?: keyof typeof tones }) {
  return (
    <section id={id} className={cn("relative py-24 sm:py-32", tones[tone], className)} {...rest}>
      {children}
    </section>
  );
}

export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)} {...props} />;
}

/** Small gold label above a heading. */
export function Eyebrow({ className, inverse, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { inverse?: boolean }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase before:h-px before:w-8 before:content-['']",
        inverse ? "text-inverse-accent before:bg-inverse-accent" : "text-accent-text before:bg-accent",
        className
      )}
      {...props}
    />
  );
}

export function Heading({ className, as: Tag = "h2", ...props }: React.HTMLAttributes<HTMLHeadingElement> & { as?: "h1" | "h2" | "h3" }) {
  return <Tag className={cn("font-serif text-4xl leading-tight font-semibold md:text-5xl", className)} {...props} />;
}
