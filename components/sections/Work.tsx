import Image from "next/image";
import { HandCoins, Sprout, Store, type LucideIcon } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import { Container, Eyebrow, Heading, Section } from "@/components/ui/Section";
import { work } from "@/lib/content";
import { images } from "@/lib/images";

/** Map of icon names used in content.ts → Lucide icons. Add new ones here. */
const icons: Record<string, LucideIcon> = { "hand-coins": HandCoins, store: Store, sprout: Sprout };

export default function Work() {
  return (
    <Section id="work">
      <Container>
        <div className="grid items-end gap-10 lg:grid-cols-2">
          <FadeIn>
            <Eyebrow>{work.eyebrow}</Eyebrow>
            <Heading className="mt-4 text-primary dark:text-foreground">{work.title}</Heading>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg leading-relaxed text-muted-foreground">{work.body}</p>
          </FadeIn>
        </div>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {work.cards.map((c) => {
            const Icon = icons[c.icon] ?? Sprout;
            return (
              <StaggerItem key={c.title} className="h-full">
                <article className="group h-full rounded-3xl border border-border bg-surface p-8 shadow-sm transition-shadow duration-500 hover:shadow-2xl hover:shadow-black/10">
                  <div className="grid size-14 place-items-center rounded-2xl bg-primary text-inverse-accent transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon size={28} strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl font-semibold">{c.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{c.text}</p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <FadeIn className="mt-14">
          <figure className="relative overflow-hidden rounded-[2rem]">
            <div className="relative aspect-[4/3] sm:aspect-[21/8]">
              <Image src={images.work.src} alt={images.work.alt} fill sizes="100vw" placeholder="blur" className="object-cover object-[50%_20%]" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-deep/90 via-inverse-deep/55 to-inverse-deep/20 sm:bg-gradient-to-r sm:from-inverse-deep/90 sm:via-inverse-deep/50 sm:to-transparent" />
            <figcaption className="absolute inset-0 flex items-end p-6 sm:items-center sm:p-12">
              <p className="max-w-md font-serif text-3xl leading-snug text-inverse-foreground italic sm:text-5xl">{work.quote}</p>
            </figcaption>
          </figure>
        </FadeIn>
      </Container>
    </Section>
  );
}
