/**
 * Site-wide settings. Change behaviour here instead of inside components.
 */
export const siteConfig = {
  name: "Mehrzun",
  description:
    "Mehrzun is an initiative focused on economic empowerment through interest-free microfinance. No Interest. Just Opportunity.",

  /** Main navigation. `href` must match a section id rendered in app/page.tsx. */
  nav: [
    { href: "#about", label: "About" },
    { href: "#founder", label: "Founder" },
    { href: "#work", label: "Our Work" },
    { href: "#supporters", label: "Supporters" },
    { href: "#contact", label: "Contact" },
  ],
  navCta: { href: "#donate", label: "Donate" },

  social: {
    instagram: { handle: "@mehrzun.foundation", url: "https://instagram.com/mehrzun.foundation" },
  },

  /**
   * Theme. Light and dark palettes are both defined in app/globals.css.
   * - defaultTheme: "light" | "dark" | "system"
   * - enableSwitching: false locks the site to defaultTheme and hides the toggle.
   *   Set it to true to show the light/dark toggle in the header.
   */
  theme: {
    defaultTheme: "system" as "light" | "dark" | "system",
    enableSwitching: true,
  },
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
