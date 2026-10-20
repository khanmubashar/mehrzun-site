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

  /**
   * Donation popup. Shown when a visitor clicks a Donate button.
   * Fill in the real bank account before deploying; any empty value is hidden.
   */
  donation: {
    currency: "PKR",
    bank: {
      bankName: "Bank name (to be confirmed)",
      accountTitle: "Account title (to be confirmed)",
      accountNumber: "0000 0000 0000 0000",
      iban: "PK00 XXXX 0000 0000 0000 0000",
    },
    /** Largest screenshot accepted, in MB (Netlify Forms allows up to 8 MB per submission). */
    maxScreenshotMB: 5,
  },

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
