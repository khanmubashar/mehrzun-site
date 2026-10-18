"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { images } from "@/lib/images";

/** Infinite photo marquee. Swap the stock photos in lib/images.ts for program photos when approved. */
export default function Gallery() {
  const reduce = useReducedMotion();
  const row = [...images.gallery, ...images.gallery];
  return (
    <section aria-label="Livelihoods gallery" className="overflow-hidden bg-surface-muted py-14">
      <motion.ul
        className="flex w-max gap-5"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        {row.map((img, i) => (
          <li key={i} aria-hidden={i >= images.gallery.length} className="relative h-56 w-80 shrink-0 overflow-hidden rounded-2xl sm:h-64 sm:w-96">
            <Image src={img.src} alt={i < images.gallery.length ? img.alt : ""} fill sizes="384px" placeholder="blur" className="object-cover transition-transform duration-700 hover:scale-110" />
          </li>
        ))}
      </motion.ul>
    </section>
  );
}
