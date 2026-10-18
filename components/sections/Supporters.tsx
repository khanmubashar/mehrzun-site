import { HeartHandshake } from "lucide-react";
import { FadeIn } from "@/components/ui/Motion";
import { Container, Eyebrow, Heading, Section } from "@/components/ui/Section";
import { supporters } from "@/lib/content";

/** Placeholder until donor names, logos and publishing permissions are confirmed. */
export default function Supporters() {
  return (
    <Section id="supporters" className="sm:py-28">
      <Container className="max-w-3xl text-center">
        <FadeIn>
          <HeartHandshake className="mx-auto text-accent" size={52} strokeWidth={1.3} />
          <Eyebrow className="mt-6 justify-center">{supporters.eyebrow}</Eyebrow>
          <Heading className="mt-4 text-primary dark:text-foreground">{supporters.title}</Heading>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{supporters.body}</p>
        </FadeIn>
      </Container>
    </Section>
  );
}
