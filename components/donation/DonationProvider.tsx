"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { X } from "lucide-react";
import { createContext, useCallback, useContext, useState } from "react";
import logo from "@/assets/img/logo.png";
import DonationForm from "@/components/donation/DonationForm";
import { donationForm } from "@/lib/content";

type DonationContextValue = { openDonation: () => void };
const DonationContext = createContext<DonationContextValue | null>(null);

/** Use inside any client component to open the donation popup. */
export function useDonation() {
  const ctx = useContext(DonationContext);
  if (!ctx) throw new Error("useDonation must be used inside <DonationProvider>");
  return ctx;
}

/** Holds the donation popup (Radix Dialog) once for the whole page. */
export default function DonationProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openDonation = useCallback(() => setOpen(true), []);

  return (
    <DonationContext.Provider value={{ openDonation }}>
      {children}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <AnimatePresence>
          {open && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </Dialog.Overlay>
              <Dialog.Content asChild forceMount aria-describedby="donation-intro">
                <motion.div
                  className="fixed inset-x-3 top-1/2 z-[70] mx-auto max-h-[92dvh] w-auto max-w-2xl overflow-y-auto rounded-2xl bg-surface text-foreground shadow-2xl outline-none sm:inset-x-6"
                  initial={{ opacity: 0, y: "-46%", scale: 0.97 }}
                  animate={{ opacity: 1, y: "-50%", scale: 1 }}
                  exit={{ opacity: 0, y: "-46%", scale: 0.97 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-surface/95 px-5 py-4 backdrop-blur sm:px-7">
                    <div className="flex items-center gap-3">
                      <Image src={logo} alt="" width={36} height={36} className="rounded-full" />
                      <Dialog.Title className="font-serif text-2xl font-semibold">{donationForm.title}</Dialog.Title>
                    </div>
                    <Dialog.Close className="rounded-lg p-2 text-muted-foreground transition hover:bg-surface-muted hover:text-foreground" aria-label="Close">
                      <X size={22} />
                    </Dialog.Close>
                  </div>
                  <div className="px-5 py-6 sm:px-7">
                    <DonationForm onDone={() => setOpen(false)} />
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </DonationContext.Provider>
  );
}
