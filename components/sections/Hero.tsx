"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ChevronDown, Heart } from "lucide-react";
import { useRef } from "react";
import logo from "@/assets/img/logo.png";
import { images } from "@/lib/images";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { brand, hero } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;
const leaves = Array.from({ length: 9 }, (_, i) => ({
  left: `${8 + ((i * 37) % 86)}%`,
  size: 10 + ((i * 7) % 14),
  duration: 14 + ((i * 5) % 10),
  delay: (i * 1.7) % 9,
}));

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const words = hero.headline.split(" ");

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-inverse-deep">
      {/* Parallax photo + brand-tinted overlay */}
      <motion.div className="absolute inset-0 -z-20" style={{ y: bgY }}>
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease }}
        >
          <Image src={images.hero.src} alt={images.hero.alt} fill priority sizes="100vw" className="object-cover" placeholder="blur" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-inverse-deep/95 via-inverse-deep/80 to-inverse/55" />

      {/* Drifting gold leaves */}
      {leaves.map((l, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -z-10 block rounded-[0_70%_0_70%] bg-accent/40"
          style={{ left: l.left, width: l.size, height: l.size * 1.6 }}
          animate={{ y: ["0vh", "-115vh"], x: [0, 30, -20, 10], rotate: [0, 180, 320], opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: l.duration, delay: l.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pt-28 pb-20 sm:px-6 lg:grid-cols-[1.25fr_1fr]"
      >
        <div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3, ease }}>
            <Eyebrow inverse>{brand.tagline}</Eyebrow>
          </motion.div>
          <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.05] font-semibold text-inverse-foreground sm:text-6xl lg:text-7xl">
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span
                  className={`inline-block ${hero.highlight.includes(w) ? "italic text-inverse-accent" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.45 + i * 0.08, ease }}
                >
                  {w}&nbsp;
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-inverse-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease }}
          >
            {hero.sub}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease }}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <ButtonLink href={hero.primary.href} variant="accent" className="group">
                {hero.primary.label}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </ButtonLink>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <ButtonLink href={hero.secondary.href} variant="ghost">
                <Heart size={18} />
                {hero.secondary.label}
              </ButtonLink>
            </motion.div>
          </motion.div>
        </div>

        {/* Emblem: gentle float inside a slowly turning gold ring */}
        <motion.div
          className="relative mx-auto hidden aspect-square w-full max-w-[420px] lg:block"
          initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease }}
        >
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-dashed border-accent/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-6 rounded-full bg-accent/20 blur-2xl"
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-8"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image src={logo} alt="Mehrzun emblem" fill sizes="360px" className="rounded-full drop-shadow-2xl" priority />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-inverse-muted"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={30} />
      </motion.a>
    </section>
  );
}
