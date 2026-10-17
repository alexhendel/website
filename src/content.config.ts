import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

// One entry per language ("de", "en"): page texts and UI labels.
const site = defineCollection({
  loader: file("src/content/site.json"),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pitch: z.string(),
    servicesTitle: z.string(),
    services: z.array(z.string()).min(1),
    contactTitle: z.string(),
    labels: z.object({
      email: z.string(),
      phone: z.string(),
      imprint: z.string(),
      privacy: z.string(),
      theme: z.string(),
      otherLanguage: z.string(),
    }),
  }),
});

// Single entry "main": contact data shared by both languages.
const contact = defineCollection({
  loader: file("src/content/contact.json"),
  schema: z.object({
    name: z.string(),
    email: z.email(),
    phone: z.string(),
    phoneHref: z.string().regex(/^\+\d+$/),
    links: z.array(z.object({ label: z.string(), href: z.url() })),
  }),
});

// Ids are "<lang>/<doc>", e.g. "de/impressum".
const legal = defineCollection({
  loader: glob({ pattern: "*/*.md", base: "src/content/legal" }),
  schema: z.object({ title: z.string() }),
});

export const collections = { site, contact, legal };
