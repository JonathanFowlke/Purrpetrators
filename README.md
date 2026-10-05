# PNN — Purrpetrator News Network

A static launch site for **Prowling Purrpetrators** at **purrpetrators.net**. “Guilty of having a pranking good time.”

Plain HTML, CSS, and JavaScript. No build step, dependencies, external fonts, analytics, cookies, or backend. The landing page uses the supplied `assets/images/logo.png` and `assets/images/construction.png` artwork. The favicon is a separate original SVG. The page remains usable without JavaScript and respects reduced-motion preferences.

## Local development

Open `index.html` directly in a browser, or serve the repository with Python:

```sh
python -m http.server 8080
```

Visit http://localhost:8080. Edit files and refresh. Preview `404.html` directly; Python's server does not automatically use GitHub Pages' custom error document.

## GitHub Pages deployment

1. Push these files to your GitHub repository.
2. In **Settings → Pages**, select **Deploy from a branch**, your default branch (usually `main`), and **/ (root)**. Save.
3. For the intended custom domain, set **purrpetrators.net** in the Pages settings. The included `CNAME` records that domain; it does not configure DNS. Follow GitHub's current custom-domain instructions linked from those settings to configure your DNS provider and verify domain ownership.
4. Once DNS is verified and a certificate is available, enable **Enforce HTTPS**.

To use only a `github.io` project URL initially, remove `CNAME`, clear the custom domain setting, and change `og:url` in `index.html` to the deployed URL. Main-page asset paths are relative and support a repository subdirectory. The 404 page resolves shared assets from the custom-domain root or the first path segment on a `github.io` project site. For a `username.github.io` root site, set its `base` expression to `'/'`. Other subdirectory hosts should set that base to their deployment prefix.

## Structure and future content

```text
index.html                  Coming-soon homepage
404.html                    Themed missing-page screen
assets/css/styles.css       Shared visual identity and responsive layout
assets/images/favicon.svg   Replaceable original SVG favicon
assets/images/evidence/     Future photos and evidence
assets/downloads/           Future newsletter PDFs
scripts/main.js             Decorative status messages
data/stories.json           Empty story collection
data/cases.json             Empty case collection
data/teams.json             Empty team collection
pages/                      Future static content pages
```

Future stories can use Breaking News, Incident Reports, Suspected Motive, Evidence, and Official PNN Assessment sections. Use `pages/` for stories, investigations, dossiers, alerts, QR landing pages, and citation case pages. Keep stable filenames for printed QR links. Pages nested under `pages/` should use `../assets/` and `../scripts/` paths (adjust for deeper nesting).

The JSON files are intentionally empty arrays, with no loader or schema imposed yet. Choose IDs, slugs, dates, and content fields when the first content feature is built. Add tip submission, Google Voice information, and downloadable editions only when ready; a working form will require an explicitly chosen external service or backend.

The Open Graph title and description are ready. Add an absolute `og:image` URL after producing a social preview PNG/JPEG; no broken placeholder image URL is shipped.

## Quick checks before publishing

- Preview desktop and narrow mobile widths; verify no horizontal scrolling.
- Tab to the skip link and verify keyboard focus is visible.
- Enable reduced motion; the scan and status rotation should stop.
- Confirm the favicon, styles, and scripts load under the deployed URL.
- Open a nonexistent nested URL on GitHub Pages to check the 404 page.

## Color palette

Inspired by the [Pink Panther character palette on SchemeColor](https://www.schemecolor.com/pink-panther-colors.php): pink #F699BE, magenta #EA0085, and pale pink #FFDEED, paired with charcoal #101014 and off-white #F2EFEE. These are reference palette values, not a verified official digital brand specification. The team logo and construction illustration are supplied project assets, preserved without cropping.
