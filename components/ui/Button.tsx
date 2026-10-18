import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** Shared button styles. Use on <a> or <button> via buttonVariants(), or the <ButtonLink> helper. */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background,color,box-shadow,border-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        accent: "bg-accent text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover",
        ghost: "border border-inverse-foreground/40 text-inverse-foreground hover:bg-inverse-foreground/10",
        link: "text-accent-text underline-offset-4 hover:underline",
      },
      size: {
        sm: "px-5 py-2 text-sm",
        md: "px-6 py-3 text-[0.95rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & ButtonVariants) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
