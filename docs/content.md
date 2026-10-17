# Editing content

All content lives in `src/content/`. Edit, run `pnpm dev` to check, push to `main` to publish. `pnpm build` fails with a clear message if a JSON field is missing or has the wrong type.

## Where things are

| You want to change… | File |
|---------------------|------|
| Pitch, page title, meta description | `src/content/site.json` → `de` / `en` |
| Services list | `src/content/site.json` → `services` |
| Menu option names ("Leistungen", "Kontakt") | `site.json` → `servicesTitle`, `contactTitle` |
| Button and footer labels | `site.json` → `labels` |
| Email, phone, GitHub/LinkedIn | `src/content/contact.json` (shared by both languages) |
| Impressum, Datenschutz | `src/content/legal/{de,en}/*.md` |
| Logo | `src/assets/logo.svg` and `public/favicon.svg` (single color, uses `currentColor`) |
| Colors | `src/styles/global.css` (`:root` and `:root[data-theme="dark"]`) |

## Examples

**Add a service** (both languages):

```json
// src/content/site.json
"de": { "services": ["Web- und Softwareentwicklung", "IT-Beratung und Support", "Automatisierung und Integration", "Code-Reviews"] },
"en": { "services": ["Web and software development", "IT consulting and support", "Automation and integration", "Code reviews"] }
```

**Add a profile link:**

```json
// src/content/contact.json
"links": [
  { "label": "GitHub", "href": "https://github.com/alexhendel" },
  { "label": "LinkedIn", "href": "https://www.linkedin.com/in/alexhendel/" },
  { "label": "Xing", "href": "https://www.xing.com/profile/..." }
]
```

Links stay plain text links. Do not add embedded widgets or icons loaded from those sites ([compliance.md](compliance.md)).

**Change the phone number:** update both fields, the display form and the dialable form:

```json
"phone": "+49 152 543 584 08",
"phoneHref": "+4915254358408"
```

## Legal pages

Each file has a `title` in the frontmatter and Markdown below:

```md
---
title: Impressum
---

## Angaben gemäß § 5 DDG

Alexander Hendel Software Entwicklung<br>
...
```

- Use `<br>` for line breaks inside an address.
- HTML comments (`<!-- -->`) are not shown on the page; the drafts use one as a reminder.
- Contact data in the legal pages is written out, not pulled from `contact.json`. **When the email, phone or address changes, update `contact.json` and all four legal files.**
- The English files start with a note that the German version is binding. Keep it.

## Checklist after editing

1. `pnpm build` passes.
2. Both languages are updated.
3. If you changed contact data: the legal pages match.
4. If you added anything that loads from another site, read [compliance.md](compliance.md) first.
