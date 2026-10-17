# Requirements

Who uses the site:

- **Visitor:** a potential client, recruiter or contact, often coming from a business card, invoice or LinkedIn.
- **Owner:** Alex, who keeps the content up to date.

Each story has acceptance criteria (AC). ✅ = implemented and checked in a browser.

## 1. Reaching me

**US-1.1: See who is behind the site.** As a visitor, I want to see the name, logo and a one-line pitch first, so I know right away whose site this is.
- ✅ Logo, name and pitch are centered at the top of the home page.
- ✅ The page title and meta description name the business.

**US-1.2: Find contact details fast.** As a visitor, I want email and phone in one place, so I can get in touch without searching.
- ✅ The "Kontakt" menu option shows email (`mailto:`), phone (`tel:`), GitHub and LinkedIn.
- ✅ Email and phone are plain text links, not hidden or obfuscated (decision #7).
- ✅ The Impressum also lists them (it is linked on every page).

**US-1.3: Know what I offer.** As a visitor, I want a short list of services, so I can tell if it fits my need.
- ✅ The "Leistungen" option shows the service list and is selected when the page loads.

**US-1.4: Read it in my language.** As a visitor who does not speak German, I want an English version.
- ✅ Every page exists in German and English.
- ✅ The language button switches to the same page in the other language.
- ✅ The English legal pages say the German version is binding.

## 2. Look and feel

**US-2.1: Pixel-art identity.** As the owner, I want the site to show my love of pixel art, so it is memorable.
- ✅ Headings and menu use the Silkscreen pixel font; boxes have hard borders and offset shadows.
- ✅ The logo pixelates on hover and sharpens again when the mouse leaves (tap on touch screens).
- ✅ On the home page the logo starts fully pixelated and resolves to the sharp logo (lead-in).

**US-2.2: Game-style menu.** As a visitor, I want to browse services and contact like a menu in an old Zelda game.
- ✅ Options are plain text; the selected one gets a blinking `>` cursor.
- ✅ Hover, focus, click and arrow keys move the cursor; the details box slides out.
- ✅ The layout does not jump when switching options.

**US-2.3: Light and dark mode.** As a visitor, I want to switch to a dark theme and have it remembered.
- ✅ Light is the default; a sun/moon pixel button switches the theme.
- ✅ The choice survives a reload and applies before first paint (no flash).

**US-2.4: Smooth navigation.** As a visitor, I want soft transitions between pages.
- ✅ Pages crossfade (350 ms); header and footer stay in place. Browsers without View Transitions switch instantly.

## 3. Legal and privacy

**US-3.1: Lawful German business site.** As the owner, I need an Impressum and a Datenschutzerklärung that meet German law.
- ✅ Both pages exist and are linked from the footer of every page.
- ✅ Both texts come from Datenschutz-Generator.de; the English pages are translations.
- ✅ Site-specific changes to the generator text are documented ([compliance.md](compliance.md#datenschutzerklärung)).

**US-3.2: No tracking.** As a visitor, I want to browse without being tracked or asked for consent.
- ✅ No cookies, no analytics, no consent banner.
- ✅ No request leaves the site's own domain (checked with headless Chrome).
- ✅ Fonts are self-hosted.

## 4. Maintaining the site

**US-4.1: Edit content without touching code.** As the owner, I want texts in Markdown and JSON.
- ✅ All texts live in `src/content/` ([content.md](content.md)).
- ✅ A typo in the JSON structure fails the build instead of breaking the live site (zod schemas).

**US-4.2: Deploy by pushing.** As the owner, I want a push to `main` to publish the site.
- ✅ GitHub Actions builds and deploys to GitHub Pages ([deployment.md](deployment.md)).
- ⬜ First deploy not done yet (no remote repo).

**US-4.3: Reproducible toolchain.** As the owner, I want one command to install the right Node and pnpm.
- ✅ `mise install` installs the versions CI uses.

## Non-functional requirements

| Area | Requirement | How it is met |
|------|-------------|---------------|
| Accessibility | WCAG 2.1 AA | Contrast checked for both themes, keyboard-usable menu (tabs pattern), visible focus outline, `aria-label` on icon buttons |
| Reduced motion | No animation when the visitor asks for it | Logo effect, lead-in, menu slide, cursor blink and page transitions are off with `prefers-reduced-motion: reduce` |
| No JavaScript | Content stays readable | Logo shows sharp, both menu panels show stacked, links work |
| Performance | Static, small pages | Plain HTML per route; about 6 KB of JS (logo, menu, toggles); one font file |
| Mobile | Works at 375 px wide | No horizontal scroll; menu options sit side by side above the details |
| Privacy | No third-party requests | See [compliance.md](compliance.md) |

## Out of scope

Blog, contact form, analytics, newsletter, embedded social widgets. Adding any of them changes the privacy situation; read [compliance.md](compliance.md) first.
