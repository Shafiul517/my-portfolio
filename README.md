# Shafiul Islam — Portfolio

This is a static HTML, CSS and JavaScript portfolio. It does not require a framework, package installation or build step.

## What changed in this edition

- Uses Geist Sans for all website text, loaded with `font-display: swap` from Google Fonts and system fallbacks.
- Adds an app-like bottom navigation on mobile, with safe-area spacing for modern phones.
- Centers the WhatsApp, LinkedIn (when configured), Email and Copy Email actions in the “Let’s talk” card, with Download CV centered below them.
- Reduces background animation work: the particle canvas is desktop-only, particle count is capped, and animation pauses when the tab is hidden.
- Uses a responsive single-column layout on mobile, accessible focus styles, improved menu/accordion states, and clipboard fallback behavior.
- Keeps the profile photo, CV and other site assets local; the hero photo uses the WebP asset where supported.

## Before publishing

1. Keep the existing Vercel project root setting. Replace the files in the folder that currently contains `index.html` with the files from this project folder.
2. Commit the changed files to the connected GitHub branch to trigger a Vercel deployment.
3. The LinkedIn URL is intentionally left blank in `script.js`. Add your public profile URL to the `LINKEDIN` constant when you have it; the LinkedIn icons remain hidden until a real URL is set.
4. Test the CV download and contact actions on the live HTTPS website after deployment.

## Files

- `index.html` — page content and metadata
- `style.css` — responsive design and shared Geist Sans typography
- `script.js` — navigation, reveal effects, counters, background effect and email copy action
- `photo.webp` / `photo.jpg` — optimized hero photo plus fallback
- `Shafiul_Islam_CV.pdf` — downloadable CV
- `logo-mark.png`, `favicon.png`, `apple-touch-icon.png` — brand assets
