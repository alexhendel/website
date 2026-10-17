# Interactions and animation

Every effect follows the same three rules:

1. **Reduced motion:** off when the visitor sets `prefers-reduced-motion: reduce`.
2. **No JavaScript:** the content is still complete and readable.
3. **Pixel timing:** motion uses `steps()` or frame-by-frame updates instead of smooth easing, except the page crossfade.

## Pixel logo — `src/components/PixelLogo.astro`

The sharp logo is the inline SVG. For pixel frames, the script:

1. bakes the current text color into the SVG source (an `<img>` cannot resolve `currentColor`) and loads it as an image,
2. draws it into a tiny canvas (one canvas pixel per block),
3. snaps every block to fully on or off (alpha cutoff `40`), so it looks like real pixel art,
4. scales that up onto the visible canvas with smoothing off.

Levels are block sizes in CSS px:

```ts
const STEPS = [2, 4, 6, 8, 12, 16, 24];
const HOVER_LEVEL = 4; // 8 px blocks
const FRAME_MS = 70;
const INTRO_HOLD_MS = 250;
```

| Trigger | What happens |
|---------|--------------|
| Page load (home, `intro` prop) | Starts at 24 px blocks, holds 250 ms, then steps down to the sharp SVG (about 0.75 s) |
| Mouse enters | Steps up to 8 px blocks and holds |
| Mouse leaves | Steps back to the sharp SVG |
| Tap (touch) | Toggles between sharp and 8 px |
| Theme switch while pixelated | Redraws the frame in the new color |

During the intro, the sharp SVG is hidden by the `intro-pending` class until the first pixel frame is drawn. If loading the image fails, the class is removed and the sharp logo shows.

**Tuning:** a lower alpha cutoff keeps thin strokes connected but makes shapes bolder. More or larger `STEPS` make the intro longer and more abstract.

## Zelda menu — `src/components/Home.astro`

Built as an ARIA tabs widget: a `tablist` of `button role="tab"`, each controlling a `section role="tabpanel"`.

| Input | Result |
|-------|--------|
| Mouse enters an option | Selects it |
| Focus (Tab key) or click | Selects it |
| Arrow keys (all four) | Move the selection and focus, wrapping around |

- The selected option gets `aria-selected="true"`, a `>` cursor (`::before`, hidden from screen readers with `content: ">" / ""`) that bobs in two steps, and full text color.
- Panels share one grid cell, so the box area keeps the size of the largest panel and nothing jumps. The inactive panel is `inert`, invisible and shifted 1.5 rem left; the active one slides in with `steps(6)`.
- Layout: menu column left of the box on wider screens; on phones the options sit in a row above the box, so moving down to the box never crosses the other option.
- Without JS, both panels are shown one under the other.

**Adding an option:** add an entry to `options` in `Home.astro`, a matching `section` with `id="panel-<id>"`, and its title to `site.json` and the `site` schema.

## Theme toggle — `src/components/ThemeToggle.astro`

- Shows a moon in light mode and a sun in dark mode (16×16 pixel paths drawn at 2×).
- Click: flips `data-theme` on `<html>`, saves it to `localStorage`, updates `aria-pressed`, and plays a 4-step rotate/scale "pop".
- The head script in `Base.astro` applies the saved value before first paint.
- Storing the choice is covered in [compliance.md](compliance.md#browser-storage).

## Language button — `src/layouts/Base.astro`

A link styled like the theme toggle. It shows the code of the target language (`EN` on German pages, `DE` on English pages), has `aria-label` "English"/"Deutsch" and `hreflang`, and goes to the same page in the other language.

## Page transitions — `src/styles/global.css`

Cross-document View Transitions, CSS only:

```css
@media (prefers-reduced-motion: no-preference) {
  @view-transition { navigation: auto; }
}
```

- The page crossfades over 350 ms. Header and footer have their own `view-transition-name`, so they stay still.
- Supported in Chromium browsers and Safari 18.2+. Other browsers navigate normally.
- Only same-origin navigations animate; external links are unaffected.
