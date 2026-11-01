"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useReducedMotion } from "motion/react";
import "@splidejs/react-splide/css/core";
import { FadeIn } from "@/components/ui/Motion";
import { Container, Eyebrow, Heading, Section } from "@/components/ui/Section";
import { field } from "@/lib/content";
import { images } from "@/lib/images";

/**
 * "From the Field" photo slider (Splide). Every photo is sized from its own shape (same height, or narrower
 * than the screen on phones), so nothing is ever cropped. An item with `video` plays as a silent looping clip
 * (paused with controls for visitors who prefer reduced motion). Loops and autoplays, pausing on hover/focus;
 * Splide turns autoplay off for visitors who prefer reduced motion.
 * Photos live in assets/img/field and are listed in lib/images.ts.
 */
export default function Field() {
  const reduce = useReducedMotion();
  return (
    <Section id="field" tone="muted" aria-labelledby="field-title" className="mz-field overflow-hidden">
      <Container>
        <FadeIn className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">{field.eyebrow}</Eyebrow>
          <Heading id="field-title" className="mt-4 text-primary dark:text-foreground">
            {field.title}
          </Heading>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{field.body}</p>
        </FadeIn>
      </Container>

      <FadeIn delay={0.1} className="mt-14">
        <Splide
          aria-label={field.title}
          onMounted={(splide: { root: HTMLElement }) => playClones(splide.root, !reduce)}
          options={{
            type: "loop",
            autoWidth: true,
            focus: "center",
            gap: "1.5rem",
            speed: 700,
            easing: "cubic-bezier(0.25, 1, 0.5, 1)",
            autoplay: true,
            interval: 4000,
            pauseOnHover: true,
            pauseOnFocus: true,
            arrows: true,
            pagination: true,
            breakpoints: { 767: { gap: "1rem" } },
          }}
        >
          {images.field.map((img) => (
            <SplideSlide key={img.alt}>
              <figure className="mz-field__card">
                <div
                  className="mz-field__photo relative overflow-hidden rounded-2xl"
                  style={{ "--ratio": img.src.width / img.src.height, aspectRatio: `${img.src.width} / ${img.src.height}` } as React.CSSProperties}
                >
                  {img.video ? (
                    <FieldVideo src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${img.video}`} poster={img.src.src} label={img.alt} autoplay={!reduce} />
                  ) : (
                    <Image src={img.src} alt={img.alt} fill sizes="(max-width: 767px) 85vw, 40vw" placeholder="blur" className="object-cover" />
                  )}
                </div>
                <figcaption className="mt-3 text-sm text-muted-foreground">{img.caption}</figcaption>
              </figure>
            </SplideSlide>
          ))}
        </Splide>
      </FadeIn>
    </Section>
  );
}

/** Splide copies the edge slides to loop; those copies are plain DOM, so start their videos here too. */
function playClones(root: HTMLElement, autoplay: boolean) {
  root.querySelectorAll<HTMLVideoElement>(".splide__slide--clone video").forEach((v) => {
    v.muted = true;
    if (autoplay) v.play().catch(() => {});
  });
}

/**
 * Silent looping clip. React does not write the `muted` attribute into the HTML, and browsers only autoplay
 * muted video, so mute and start it from code. With reduced motion it stays paused and shows controls.
 * Plays the smaller WebM copy (same name, .webm) where supported and falls back to the MP4.
 */
function FieldVideo({ src, poster, label, autoplay }: { src: string; poster: string; label: string; autoplay: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (autoplay) v.play().catch(() => {});
    else v.pause();
  }, [autoplay]);
  return (
    <video
      ref={ref}
      poster={poster}
      aria-label={label}
      controls={!autoplay}
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 size-full object-cover"
    >
      <source src={src.replace(/\.mp4$/, ".webm")} type="video/webm" />
      <source src={src} type="video/mp4" />
    </video>
  );
}
