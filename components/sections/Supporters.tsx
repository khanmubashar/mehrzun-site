import { HeartHandshake } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import { Container, Eyebrow, Heading, Section } from "@/components/ui/Section";
import { supporters } from "@/lib/content";

/** Initials for the monogram badge, e.g. "Mian Salman Asghar" → "MA". */
function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

/** Supporter names as monogram cards. Add or remove names in lib/content.ts (supporters.names). */
export default function Supporters() {
  return (
    <Section id="supporters" className="sm:py-28">
      <Container>
        <FadeIn className="mx-auto max-w-3xl text-center">
          <HeartHandshake className="mx-auto text-accent" size={52} strokeWidth={1.3} />
          <Eyebrow className="mt-6 justify-center">{supporters.eyebrow}</Eyebrow>
          <Heading className="mt-4 text-primary dark:text-foreground">{supporters.title}</Heading>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{supporters.body}</p>
        </FadeIn>

        <Stagger className="mt-12 grid grid-cols-2 gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-4">
          {supporters.names.map((name) => (
            <StaggerItem key={name} className="h-full">
              <article className="group flex h-full flex-col items-center rounded-3xl border border-border bg-surface px-3 py-7 text-center sm:px-6 sm:py-8 shadow-sm transition-shadow duration-500 hover:shadow-2xl hover:shadow-black/10">
                <div
                  aria-hidden
                  className="grid size-16 place-items-center rounded-full bg-primary font-serif text-2xl font-semibold text-inverse-accent ring-1 ring-accent/40 ring-offset-4 ring-offset-surface transition-transform duration-500 group-hover:scale-110"
                >
                  {initials(name)}
                </div>
                <h3 className="mt-5 font-serif text-lg leading-snug font-semibold sm:text-xl">{name}</h3>
                <span className="mt-3 block h-px w-8 bg-accent" />
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
