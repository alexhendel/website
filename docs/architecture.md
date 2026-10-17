# Architecture

## Stack

| Part | Choice | Why |
|------|--------|-----|
| Framework | [Astro](https://astro.build) 7, static output | One real HTML file per route, no JS framework at runtime |
| Styling | Tailwind CSS 4 via `@tailwindcss/vite` | Known from the old site |
| Font | Silkscreen via `@fontsource/silkscreen` (Latin subset, self-hosted) | Pixel look, covers umlauts |
| Language | TypeScript (strict), checked by `astro check` | TypeScript is pinned to 6 because `astro check` refuses TypeScript 7 |
| Content | Astro content collections with zod schemas | Markdown and JSON in the repo, validated at build time |
| Toolchain | Node 24, pnpm 12.14.0, managed by `mise` | Same versions locally and in CI |
| Hosting | GitHub Pages, custom domain `alex-hendel.de` | Free HTTPS, deploy on push |

There are no runtime dependencies in the browser. The only client-side scripts are small Astro `<script>` blocks, bundled by Vite.

## Repo layout

```
.github/workflows/deploy.yml     build + deploy to GitHub Pages
docs/                            these docs; docs/assets/logo.svg is the original logo
public/
  favicon.svg                    copy of the logo
  CNAME                          alex-hendel.de (tells GitHub Pages the domain)
src/
  assets/logo.svg                logo, inlined into the page and used by the pixel effect
  content/
    site.json                    texts and labels per language ("de", "en")
    contact.json                 name, email, phone, profile links (shared)
    legal/{de,en}/*.md           Impressum and Datenschutz per language
  content.config.ts              collection definitions and zod schemas
  i18n.ts                        route table for both languages
  styles/global.css              theme colors, fonts, base styles, page transitions
  layouts/Base.astro             <head>, header (name, language, theme), footer (legal links)
  components/
    Home.astro                   home page: hero + Zelda menu
    Legal.astro                  renders one legal Markdown file
    PixelLogo.astro              logo with pixel lead-in and hover effect
    ThemeToggle.astro            sun/moon button
  pages/                         one thin file per route (see below)
astro.config.mjs                 site URL + Tailwind plugin
mise.toml                        Node + pnpm versions
```

## Routing and languages

Routes are plain files in `src/pages/`. Each page file is three lines that pick a component and a language:

```astro
---
import Legal from "../../components/Legal.astro";
---
<Legal lang="en" page="datenschutz" />
```

`src/i18n.ts` holds the route table. Every page knows its own key (`home`, `impressum`, `datenschutz`), so the header can link to the same page in the other language:

```ts
export const routes = {
  de: { home: "/", impressum: "/impressum/", datenschutz: "/datenschutz/" },
  en: { home: "/en/", impressum: "/en/imprint/", datenschutz: "/en/privacy/" },
} as const;
```

Astro's built-in i18n routing is not used; with two languages and three pages the table is simpler.

`Base.astro` also sets `<html lang>`, `<link rel="canonical">` and `<link rel="alternate" hreflang>` from this table.

**Adding a page:** add a key to both languages in `routes` (the `Page` type follows automatically), then add one page file per language that passes that key to `Base` as `page`.

## Content model

Defined in `src/content.config.ts`:

| Collection | Source | Entries | Schema highlights |
|------------|--------|---------|-------------------|
| `site` | `src/content/site.json` | `de`, `en` | title, description, pitch, services (≥ 1), menu titles, UI labels |
| `contact` | `src/content/contact.json` | `main` | email must be valid, `phoneHref` must be `+` and digits, links need valid URLs |
| `legal` | `src/content/legal/*/*.md` | `de/impressum`, `en/datenschutz`, … | frontmatter `title` |

Components read them with `getEntry("site", lang)`, `getEntry("contact", "main")` and `getEntry("legal", "de/impressum")`. A missing field or wrong type fails `pnpm build`.

## Styling and themes

- Colors are CSS variables in `src/styles/global.css` (`--bg`, `--fg`, `--muted`, `--accent`, `--surface`), with a second set under `:root[data-theme="dark"]`.
- Tailwind's `@theme` maps them to classes (`bg-bg`, `text-fg`, `text-accent`, `shadow-pixel`, `font-pixel`), so components never need `dark:` variants: switching the attribute recolors everything.
- The global link color sits in `@layer base`, so utility classes on a link (e.g. `text-fg`) win.
- Pixel look: `border-[3px] border-fg`, `shadow-pixel` (4 px hard offset shadow), no rounded corners, `steps()` timing for motion.

## Head script and `data-js`

An inline script in `Base.astro` runs before first paint and:

1. sets `data-js` on `<html>`. CSS only hides JS-driven content (inactive menu panel, logo before its lead-in) when this attribute is present, so the page stays complete without JavaScript.
2. applies the saved theme from `localStorage`, wrapped in `try` because storage can be blocked.

Behavior of each interactive part: [interactions.md](interactions.md).
