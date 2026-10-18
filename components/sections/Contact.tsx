import { FaInstagram as Instagram } from "react-icons/fa6";
import ContactForm from "@/components/sections/ContactForm";
import { FadeIn } from "@/components/ui/Motion";
import { Container, Eyebrow, Heading, Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { contact } from "@/lib/content";

export default function Contact() {
  const { instagram } = siteConfig.social;
  return (
    <Section id="contact">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <FadeIn>
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <Heading className="mt-4 text-primary dark:text-foreground">{contact.title}</Heading>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{contact.body}</p>
          <a
            href={instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 pr-6 transition hover:border-accent/60 hover:shadow-lg"
          >
            <span className="grid size-12 place-items-center rounded-xl bg-primary text-inverse-accent transition-transform group-hover:scale-110">
              <Instagram size={22} />
            </span>
            <span>
              <span className="block text-xs font-semibold tracking-[0.18em] text-accent-text uppercase">Instagram</span>
              <span className="block font-semibold">{instagram.handle}</span>
            </span>
          </a>
        </FadeIn>
        <FadeIn delay={0.15}>
          <ContactForm />
        </FadeIn>
      </Container>
    </Section>
  );
}
