"use client";

import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

/** Light/dark switch. Renders nothing unless siteConfig.theme.enableSwitching is true. */
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!siteConfig.theme.enableSwitching || !mounted) return null;

  const dark = resolvedTheme === "dark";
  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid size-10 place-items-center rounded-full text-inverse-foreground transition hover:bg-inverse-foreground/10"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {dark ? <Moon size={20} /> : <Sun size={20} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
