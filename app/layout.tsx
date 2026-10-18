import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import ThemeProvider from "@/components/layout/ThemeProvider";
import { siteConfig } from "@/config/site";
import { brand } from "@/lib/content";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: `${siteConfig.name} | Interest-Free Microfinance`,
  description: siteConfig.description,
  openGraph: { title: `${siteConfig.name} | ${brand.tagline}`, description: siteConfig.description, type: "website" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1d3b2a" },
    { media: "(prefers-color-scheme: dark)", color: "#08100b" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: next-themes sets data-theme before React hydrates.
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
