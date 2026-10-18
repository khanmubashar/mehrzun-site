import Image from "next/image";
import { FadeIn } from "@/components/ui/Motion";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { donate } from "@/lib/content";
import { images } from "@/lib/images";

/** Payment details stay unpublished until validated (see brief); the CTA leads to Contact. */
export default function Donate() {
  return (
    <Section id="donate" tone="inverse-deep" className="isolate overflow-hidden">
      <Image src={images.donate.src} alt="" fill sizes="100vw" placeholder="blur" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-inverse-deep/80" />
      <Container className="max-w-3xl text-center">
        <FadeIn>
          <Eyebrow inverse className="justify-center">{donate.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-6xl">{donate.title}</h2>
        </FadeIn>
        {donate.body.map((p, i) => (
          <FadeIn key={i} delay={0.1 + i * 0.1}>
            <p className="mt-6 text-lg leading-relaxed text-inverse-muted">{p}</p>
          </FadeIn>
        ))}
        <FadeIn delay={0.35} className="mt-10">
          <ButtonLink href="#contact" variant="accent" className="animate-[pulse-ring_2.4s_ease-out_infinite]">
            {donate.cta}
          </ButtonLink>
          <p className="mt-5 text-sm text-inverse-muted/80">{donate.pending}</p>
        </FadeIn>
      </Container>
    </Section>
  );
}
