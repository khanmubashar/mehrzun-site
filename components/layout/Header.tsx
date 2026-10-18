"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/img/logo.png";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Header() {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const close = () => setOpen(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open ? "bg-inverse-deep/95 shadow-lg shadow-black/20 backdrop-blur" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-3" onClick={close}>
          <Image src={logo} alt="" width={44} height={44} priority className="rounded-full" />
          <span className="font-serif text-2xl font-semibold tracking-wide text-inverse-foreground">{siteConfig.name}</span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-medium text-inverse-foreground/85 transition-colors hover:text-inverse-foreground"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
          <ThemeToggle />
          <ButtonLink href={siteConfig.navCta.href} variant="accent" size="sm">
            {siteConfig.navCta.label}
          </ButtonLink>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            className="rounded-full p-2 text-inverse-foreground"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Reading-progress bar */}
      <motion.div className="h-0.5 origin-left bg-accent" style={{ scaleX: scrollYProgress }} />

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100dvh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden bg-inverse-deep md:hidden"
          >
            <motion.ul
              className="flex flex-col gap-2 px-6 pt-8"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            >
              {[...siteConfig.nav, siteConfig.navCta].map((l) => (
                <motion.li key={l.href} variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
                  <a href={l.href} onClick={close} className="block border-b border-inverse-foreground/10 py-4 font-serif text-3xl text-inverse-foreground">
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
