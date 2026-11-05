# Plastika LVP redesign

Front-end redesign pitch for [plastika-lvp.si](https://www.plastika-lvp.si/) (L.V.P. d.o.o., Ravne na Koroškem). Static HTML, CSS and JS; no build step.

## Run locally

```bash
node serve.mjs site
```

Then open http://localhost:4760 (set `PORT` to change it).

## Structure

- `site/` the website: `index.html`, `izdelki.html`, `tehnologija.html`, `kakovost.html`, `o-nas.html`, `kontakt.html`
- `site/assets/css/style.css` all styles
- `site/assets/js/layout.js` shared header, mega menu, mobile menu and footer
- `site/assets/js/machines.js` machine park data for the tables
- `site/assets/js/main.js` motion (GSAP, ScrollTrigger, Lenis), filters, form
- `site/assets/img`, `site/assets/video` client photos plus Higgsfield generated stills (`gen-*.jpg`) and loops

## Fonts (not in git)

The site uses Maison Neue, a licensed font, so the files are not committed. Copy these into `site/assets/fonts/` before running or deploying:

- `MaisonNeue-Light.otf`, `MaisonNeue-Book.otf`, `MaisonNeue-Medium.otf`, `MaisonNeue-Demi.otf`, `MaisonNeue-Bold.otf`
- `MaisonNeueMono-Regular.otf`

Without them the site falls back to Helvetica Neue.

## Open items

- EN and DE language versions are placeholders.
- The contact form validates and shows a thank-you state but does not send anything yet.
- Hero and granulate loops are 720p.
