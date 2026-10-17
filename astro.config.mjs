import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://alex-hendel.de",
  // The whole stylesheet is ~4 KB gzipped: inlining saves a render-blocking request.
  build: { inlineStylesheets: "always" },
  vite: { plugins: [tailwindcss()] },
});
