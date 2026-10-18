import Image from "next/image";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import { Container, Eyebrow, Heading, Section } from "@/components/ui/Section";
import { about, brand } from "@/lib/content";
import { images } from "@/lib/images";

export default function About() {
  return (
    <Section id="about">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <FadeIn x={-40} y={0} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-black/20">
            <Image
              src={images.about.src}
              alt={images.about.alt}
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              placeholder="blur"
              className="object-cover transition-transform duration-[1500ms] hover:scale-105"
            />
          </div>
          <div className="absolute -right-2 -bottom-6 rounded-2xl bg-inverse px-6 py-5 text-inverse-foreground shadow-xl sm:-right-8">
            <p className="font-serif text-2xl text-inverse-accent italic">{brand.meaning}</p>
            <p className="mt-1 text-xs tracking-[0.2em] text-inverse-muted uppercase">The meaning of Mehrzun</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <Heading className="mt-4 text-primary dark:text-foreground">{about.title}</Heading>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{about.body}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{brand.explanation}</p>
          <Stagger className="mt-8 flex flex-wrap gap-3">
            {about.values.map((v) => (
              <StaggerItem key={v}>
                <span className="inline-block rounded-md border border-accent/50 bg-surface px-4 py-1.5 font-serif text-lg">{v}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </FadeIn>
      </Container>
    </Section>
  );
}
