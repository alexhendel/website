# alex-hendel.de: project docs

The personal website of **Alexander Hendel Software Entwicklung**, a freelance software development and IT business run on the side. The site does one job: show who I am, what I offer and how to reach me, in a pixel-art style, with no tracking.

- **Live:** https://alex-hendel.de (GitHub Pages)
- **Languages:** German (default, `/`) and English (`/en/`)
- **Stack:** Astro 7, Tailwind CSS 4, TypeScript, content as Markdown and JSON in the repo
- **Old site:** https://github.com/alexhendel/website (Vite + React). Only the logo was carried over.

## Pages

| German | English | Content |
|--------|---------|---------|
| `/` | `/en/` | Logo, name, pitch, menu with "Services" and "Contact" |
| `/impressum/` | `/en/imprint/` | Legal notice (§ 5 DDG) |
| `/datenschutz/` | `/en/privacy/` | Privacy policy (DSGVO) |
| `/404.html` | (same file) | Not-found page in both languages |

## Docs

| Document | Read it when you want to… |
|----------|---------------------------|
| [requirements.md](requirements.md) | know what the site must do (user stories, acceptance criteria) |
| [architecture.md](architecture.md) | understand the stack, repo layout, routing and content model |
| [interactions.md](interactions.md) | change the pixel logo, menu, toggles or page transitions |
| [content.md](content.md) | edit texts, services, contact data or legal pages |
| [deployment.md](deployment.md) | set up a machine, build, deploy or fix a failed deploy |
| [compliance.md](compliance.md) | check DSGVO/legal rules before adding anything |
| [DECISIONS.md](DECISIONS.md) | see why the stack and design were chosen |

## Quick start

```sh
mise trust && mise install   # Node 24 + pnpm 12.14.0
pnpm install
pnpm dev                     # http://localhost:4321
```

A push to `main` builds and deploys the site. Details: [deployment.md](deployment.md).

## Status (2026-10-17)

Done:
- All pages in both languages, light/dark theme, pixel logo with lead-in and hover effect, Zelda-style menu, page transitions
- Deploy workflow and `mise` toolchain
