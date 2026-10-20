import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Donate from "@/components/sections/Donate";
import Founder from "@/components/sections/Founder";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import Supporters from "@/components/sections/Supporters";
import Work from "@/components/sections/Work";
import DonationProvider from "@/components/donation/DonationProvider";

/**
 * Page order. To add a section: create components/sections/<Name>.tsx, add its copy to lib/content.ts,
 * add it here, and (if it should be in the menu) add its #id to siteConfig.nav.
 * Community Service is planned for later (see brief) and slots in the same way.
 */
const sections = [Hero, About, Founder, Work, Gallery, Supporters, Donate, Contact];

export default function Home() {
  return (
    <DonationProvider>
      <Header />
      <main>
        {sections.map((S) => (
          <S key={S.name} />
        ))}
      </main>
      <Footer />
    </DonationProvider>
  );
}
