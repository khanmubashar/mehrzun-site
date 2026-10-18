# Mehrzun website

Single-page static website for **Mehrzun**, an interest-free microfinance initiative.
Built with Next.js (App Router, static export), Tailwind CSS v4, Motion, next-themes, Lucide, react-hook-form and Zod.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site is written to ./out
```

## Where things live

| Path | What it holds |
| --- | --- |
| `lib/content.ts` | All page copy, one export per section. Edit text here. |
| `config/site.ts` | Site name, navigation, social links, theme settings. |
| `lib/images.ts` | Image imports, alt text and photo credits (generated). |
| `assets/img/` | Logo and photos (imported, so they are optimised and base-path safe). |
| `app/globals.css` | Theme tokens for light and dark, Tailwind setup. |
| `components/sections/` | One file per page section (Hero, About, Founder, Work, Gallery, Supporters, Donate, Contact). |
| `components/layout/` | Header, Footer, ThemeProvider, ThemeToggle. |
| `components/ui/` | Reusable building blocks: Button variants, Section/Container/Eyebrow/Heading, Motion helpers. |
| `scripts/images/` | Playwright scripts used to search and download the Pexels photos. |

## Common changes

**Edit text.** Change `lib/content.ts`. Components read from it.

**Add a section.** Create `components/sections/NewSection.tsx` using `Section`, `Container`, `Eyebrow` and `Heading`.
Add its copy to `lib/content.ts`, add it to the `sections` array in `app/page.tsx`, and add its `#id` to `siteConfig.nav`.

**Turn on dark mode.** In `config/site.ts` set `theme.enableSwitching` to `true`. A sun/moon toggle appears in the header.
Set `defaultTheme` to `"system"` to follow the visitor's OS. Colours for both themes live in `app/globals.css`.
Components only use semantic colour names such as `bg-background`, `text-primary` or `bg-inverse`, never raw hex.

**Change colours.** Edit the CSS variables under `:root` (light) and `[data-theme="dark"]` in `app/globals.css`.

**Replace stock photos.** Drop new files into `assets/img/` with the same names, or update the imports in `lib/images.ts`.
Update alt text and credits there too.

**Connect the contact form.** The form validates but does not send yet, because the official email is not confirmed.
In `components/sections/ContactForm.tsx`, post the data to a form service such as Formspree or Web3Forms inside `onSubmit`.

## Pending content from the brief

These items are intentionally not published until confirmed:
founder photo and story, program eligibility and application steps (no "Apply" button), real program photos,
donor list, payment details, official email, phone/WhatsApp and address, community service section,
and whether "Foundation" or "Society" may be used in the name.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the static export and publishes it to GitHub Pages.
The base path is set automatically. For a custom domain, set it in the repo's Pages settings and add `public/CNAME`.
The `./out` folder can also be uploaded as-is to any static host (Netlify, Cloudflare Pages, Vercel, S3).
