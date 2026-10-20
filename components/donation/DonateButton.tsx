"use client";

import { buttonVariants, type ButtonVariants } from "@/components/ui/Button";
import { useDonation } from "@/components/donation/DonationProvider";
import { cn } from "@/lib/utils";

/** Any button that opens the donation popup. */
export default function DonateButton({
  children,
  className,
  variant = "accent",
  size,
  onClick,
}: ButtonVariants & { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const { openDonation } = useDonation();
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        openDonation();
      }}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </button>
  );
}
