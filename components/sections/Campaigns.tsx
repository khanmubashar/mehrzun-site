"use client";

import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import DonateButton from "@/components/donation/DonateButton";
import { campaigns } from "@/lib/content";
import { images } from "@/lib/images";

/**
 * Campaign posters carousel (Splide). Three posters on desktop with the centre one full size and its
 * neighbours scaled down; one poster with a peek of the next on phones. Loops and autoplays, pausing on
 * hover/focus; Splide turns autoplay off for visitors who prefer reduced motion.
 * Posters live in assets/img/campaign and are listed in lib/images.ts.
 */
export default function Campaigns() {
  return (
    <section id="campaigns" aria-labelledby="campaigns-title" className="mz-campaigns overflow-hidden bg-showcase py-20 sm:py-24">
      <h2 id="campaigns-title" className="sr-only">
        {campaigns.title}
      </h2>

      <Splide
        aria-label={campaigns.title}
        options={{
          type: "loop",
          focus: "center",
          perPage: 3,
          gap: "2.5rem",
          padding: "4%",
          speed: 700,
          easing: "cubic-bezier(0.25, 1, 0.5, 1)",
          autoplay: true,
          interval: 4500,
          pauseOnHover: true,
          pauseOnFocus: true,
          arrows: true,
          pagination: true,
          breakpoints: {
            1024: { perPage: 3, gap: "1.25rem", padding: "2%" },
            767: { perPage: 1, gap: "1rem", padding: "14%" },
          },
        }}
      >
        {images.campaigns.map((img) => (
          <SplideSlide key={img.alt}>
            <div className="mz-campaigns__card overflow-hidden shadow-2xl shadow-black/30">
              <Image src={img.src} alt={img.alt} sizes="(max-width: 767px) 72vw, 30vw" placeholder="blur" className="block h-auto w-full" />
            </div>
          </SplideSlide>
        ))}
      </Splide>

      <div className="mt-12 flex justify-center">
        <DonateButton className="rounded-full px-10 py-3.5 text-base tracking-[0.18em] uppercase">{campaigns.cta}</DonateButton>
      </div>
    </section>
  );
}
