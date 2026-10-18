"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { siteConfig } from "@/config/site";

/**
 * Light/dark theme via next-themes (sets data-theme on <html>).
 * While siteConfig.theme.enableSwitching is false, the theme is forced to defaultTheme.
 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { defaultTheme, enableSwitching } = siteConfig.theme;
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme={defaultTheme}
      enableSystem={defaultTheme === "system"}
      forcedTheme={enableSwitching ? undefined : defaultTheme === "system" ? undefined : defaultTheme}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
