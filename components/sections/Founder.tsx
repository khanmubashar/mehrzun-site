import Image from "next/image";
import { Quote } from "lucide-react";
import logo from "@/assets/img/logo.png";
import { FadeIn } from "@/components/ui/Motion";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { founder } from "@/lib/content";

/** Founder photo is pending (see brief), so the emblem stands in for now. */
export default function Founder() {
  return (
    <Section id="founder" tone="inverse" className="overflow-hidden">
      <div aria-hidden className="absolute -top-40 -right-40 size-[28rem] rounded-full bg-accent/10 blur-3xl" />
      <Container className="relative max-w-4xl text-center">
        <FadeIn>
          <Eyebrow inverse className="justify-center">{founder.eyebrow}</Eyebrow>
          <Quote className="mx-auto mt-8 text-accent" size={48} strokeWidth={1.25} />
        </FadeIn>
        <blockquote className="mt-6 space-y-6">
          {founder.quote.map((p, i) => (
            <FadeIn key={i} delay={0.1 * i}>
              <p className={i === 0 ? "font-serif text-2xl leading-snug sm:text-3xl" : "font-serif text-xl leading-snug text-inverse-muted sm:text-2xl"}>{p}</p>
            </FadeIn>
          ))}
        </blockquote>
        <FadeIn delay={0.3} className="mt-10 flex items-center justify-center gap-4">
          <Image src={logo} alt="" width={56} height={56} className="rounded-full" />
          <p className="text-left">
            <span className="block h-px w-10 bg-accent" />
            <span className="mt-2 block text-sm font-semibold tracking-[0.18em] text-inverse-accent uppercase">— {founder.signature}</span>
          </p>
        </FadeIn>
      </Container>
    </Section>
  );
}
