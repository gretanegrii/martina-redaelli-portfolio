# Martina Redaelli — Portfolio

Portfolio website for **Martina Redaelli**, a conceptual artist, writer and curator based in Milan. A bilingual (IT / EN) digital catalogue bringing together her three practices — works, essays and curatorial projects — in one editorial space.

🔗 **Live:** https://martinaredaelli.vercel.app/

## About

Designed and developed from scratch for a real client. The brief: a calm, editorial space where the concept behind each work carries as much weight as the image — not a gallery of silent pictures.

## Built with

- **HTML** — semantic markup
- **CSS** — custom properties (design tokens), no framework
- **Vanilla JavaScript** — no framework, no dependencies
- **Fonts:** IBM Plex Mono, IBM Plex Sans, Jost
- **Hosting:** Vercel (static site)

## Features

- Bilingual IT / EN — separate localized pages with `hreflang` (not a client-side text swap)
- Editorial catalogue layout (works, essays, exhibitions)
- Custom-built image viewer — click-to-navigate, zoom, keyboard controls, accessibility (ARIA, focus handling)
- Multi-page with real URLs; fully hand-coded, no build step

## Project structure

```
├── index.html        # home (Italian)
├── works/            # individual work pages
├── essays/           # long-form essay pages
├── exhibitions/      # curatorial projects / exhibitions
├── en/               # full English version of the site
├── src/
│   ├── css/          # base + per-section styles
│   └── js/           # viewer + interactions
└── assets/           # fonts + images
```

## Run locally

Static site — no build step required.

```bash
git clone https://github.com/gretanegrii/martina-redaelli-portfolio.git
# then open index.html, or serve it locally:
npx serve
```

## Credits

- **Design & development:** [Greta Negri](https://portfolio-gretanegri.vercel.app/)
- **Artwork, essays & content:** © Martina Redaelli
