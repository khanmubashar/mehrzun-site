"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades and slides children in once, when they scroll into view. */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 28,
  x = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.14 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/** Staggers its <StaggerItem> children into view one after another. */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={item} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      {children}
    </motion.div>
  );
}
