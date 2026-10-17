# DSGVO and legal compliance

The business is German, so the site must meet the DSGVO (GDPR), the TDDDG (formerly TTDSG) and the DDG (formerly TMG). This page records what the site does to meet them and what to check before changing anything.

> This is a technical record, not legal advice.

## Current state

| Rule | Status |
|------|--------|
| No third-party requests (no Google Fonts, CDNs, analytics, embeds) | ✅ Checked: every request goes to the site's own domain |
| No cookies, so no consent banner | ✅ |
| Impressum per § 5 DDG, linked on every page | ✅ Generator text (Datenschutz-Generator.de, 17.10.2026) |
| Datenschutzerklärung, linked on every page | ✅ Generator text (Datenschutz-Generator.de, 17.10.2026) with documented additions and changes |
| Hosting (GitHub Pages) named in the Datenschutzerklärung | ✅ |
| Browser storage for the theme named in the Datenschutzerklärung | ✅ |
| WCAG 2.1 AA basics | ✅ Contrast, keyboard, focus, reduced motion, labels |

## Hosting

GitHub Pages logs visitor IP addresses and request data. GitHub Inc. is in the USA and certified under the EU-US Data Privacy Framework, so the transfer rests on the EU adequacy decision (Art. 45 DSGVO). Legal basis: Art. 6(1)(f) DSGVO. Both privacy pages say this.

## Browser storage

The theme toggle stores `theme` = `light` or `dark` in `localStorage`, **only after the visitor clicks it**. This is storage for a feature the visitor explicitly asked for, so it needs no consent (§ 25(2) Nr. 2 TDDDG). It is named in the Datenschutzerklärung.

Nothing else is stored. The logo lead-in plays on every home page visit on purpose: remembering "already seen" would need another storage entry.

## Fonts and assets

Silkscreen is bundled from `@fontsource/silkscreen` and served from the site itself. Loading fonts from Google's servers sends the visitor's IP to Google and was ruled unlawful (LG München I, 20.01.2022, 3 O 17493/20).

## Legal texts

### Datenschutzerklärung

`src/content/legal/de/datenschutz.md` is the output of Datenschutz-Generator.de (Dr. Thomas Schwenke), generated 17.10.2026 and converted to Markdown. `en/datenschutz.md` is a full translation of it.

Added by hand (marked `Ergänzt` in HTML comments in the German file):
- Controller details (the generator left placeholders)
- A **GitHub Pages** entry under webhosting (the generator names no hoster)
- A **color scheme storage** entry under cookies (`localStorage`, § 25(2) Nr. 2 TDDDG)
- A **GitHub profile** entry under social media (the generator has no GitHub module)

Changed by hand (marked `Angepasst`), because the generator text did not match the site:
- **Employees and whistleblowers** removed from the overview and the glossary (sole trader, no staff).
- **Third-country transfers:** the claim that standard contractual clauses were concluded with every US provider is replaced by "DPF first; standard contractual clauses or other legal safeguards if a provider is not DPF-certified".
- **Log retention:** the generator default "at most 30 days" is replaced by "stored by the host, retention per the host's privacy policy", since GitHub publishes no period for Pages logs.

Keep the generator credit at the end: the free version requires it.

When regenerating: replace the German file, re-apply the additions and changes above, then update the English translation.

### Impressum

`src/content/legal/de/impressum.md` is the output of the free Impressum generator of Datenschutz-Generator.de, generated 17.10.2026 and converted to Markdown without changes. `en/impressum.md` is a translation. Keep the generator credit at the end.

It also covers the GitHub and LinkedIn profiles ("Dieses Impressum gilt auch für…"). If you add or remove a profile link in `contact.json`, regenerate.

Compared with my earlier draft, the generator left out three things. As I understand it, none is required here:
- **Business name** "Alexander Hendel Software Entwicklung": a sole trader must give their own name, which it does; a business name is optional.
- **Responsible for content (§ 18(2) MStV):** only needed for journalistic or editorial content, which this site does not have.
- **Consumer dispute resolution statement (§ 36 VSBG):** only required from businesses with more than 10 employees.

## Before adding anything

| You want to add… | Consequence |
|------------------|-------------|
| Analytics (even cookieless, e.g. GoatCounter, Plausible EU) | Name it in the Datenschutzerklärung; with cookies or fingerprinting it needs a consent banner |
| A contact form | Needs a backend or a form service (a processor with a data processing agreement, AVV) and a privacy section |
| Embedded video, map or social widget | Loads from a third party: needs consent before loading (two-click solution) |
| Fonts or scripts from a CDN | Don't. Bundle them via npm instead |
| Another `localStorage` entry | Only for something the visitor explicitly asked for; name it in the Datenschutzerklärung |
| A new email address or phone number | Update `contact.json` and all four legal files |

## Accessibility (BFSG)

The Barrierefreiheitsstärkungsgesetz most likely does not apply (micro-business offering services), but the site aims for WCAG 2.1 AA anyway. Details in [requirements.md](requirements.md#non-functional-requirements).
