export const routes = {
  de: { home: "/", impressum: "/impressum/", datenschutz: "/datenschutz/" },
  en: { home: "/en/", impressum: "/en/imprint/", datenschutz: "/en/privacy/" },
} as const;

export type Lang = keyof typeof routes;
export type Page = keyof (typeof routes)["de"];

export const otherLang = (lang: Lang): Lang => (lang === "de" ? "en" : "de");
