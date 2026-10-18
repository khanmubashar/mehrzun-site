import Image from "next/image";
import { FaInstagram as Instagram } from "react-icons/fa6";
import logo from "@/assets/img/logo.png";
import { siteConfig } from "@/config/site";
import { brand } from "@/lib/content";

export default function Footer() {
  const { instagram } = siteConfig.social;
  return (
    <footer className="bg-inverse-deep pt-16 pb-10 text-inverse-muted">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <Image src={logo} alt="Mehrzun emblem" width={72} height={72} className="rounded-full" />
          <p className="font-serif text-3xl text-inverse-foreground">{siteConfig.name}</p>
          <p className="text-inverse-accent">{brand.tagline}</p>
          <nav aria-label="Footer" className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {[...siteConfig.nav, siteConfig.navCta].map((l) => (
              <a key={l.href} href={l.href} className="hover:text-inverse-accent">
                {l.label}
              </a>
            ))}
          </nav>
          <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-sm hover:text-inverse-accent">
            <Instagram size={16} /> {instagram.handle}
          </a>
        </div>
        <div className="mt-12 border-t border-inverse-foreground/10 pt-6 text-center text-xs leading-relaxed text-inverse-muted/70">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
