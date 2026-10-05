# PNN — Purrpetrator News Network

A static neighborhood newsroom for **Prowling Purrpetrators** at **purrpetrators.net**. “Guilty of having a pranking good time.”

Plain HTML, CSS, and JavaScript. No deployment build step, npm dependencies, external fonts, analytics, cookies, or backend. A small Node.js script generates committed case pages and the homepage's latest case feature from JSON when content changes. The homepage introduces PNN and the team and features the newest published investigation. Pages remain usable without JavaScript; evidence videos play only on request. The former construction illustration and status script are retained as unused assets.

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
index.html                  Newsroom homepage with generated latest case
404.html                    Themed missing-page screen
assets/css/styles.css       Shared visual identity and responsive layout
assets/images/favicon.png   Supplied PNG favicon
assets/evidence/001/        First case video and poster
assets/evidence/unassigned/ Media awaiting case assignment
assets/downloads/           Future newsletter PDFs
scripts/main.js             Unused former launch-status script
data/stories.json           Empty story collection
data/cases.json             Case records and evidence metadata
data/teams.json             Confirmed team roster and logo paths
scripts/generate-cases.mjs  Generate static case pages from JSON
cases/index.html           Generated case listing
cases/001/index.html       PNN-001: Caught in their own Webb
pages/                      Future static content pages
```

Future stories can use Breaking News, Incident Reports, Suspected Motive, Evidence, and Official PNN Assessment sections. Use `pages/` for stories, investigations, dossiers, alerts, QR landing pages, and citation case pages. Keep stable filenames for printed QR links. Pages nested under `pages/` should use `../assets/` and `../scripts/` paths (adjust for deeper nesting).

`data/teams.json` contains the seven confirmed teams. Each record has a stable lowercase color `id` and `slug`, display `name` and `color`, a site-root-relative `logo` path, and an `isOurTeam` boolean (true only for the pink Prowling Purrpetrators). Resolve logo paths against the deployment base when using them on nested pages. Stories remain an empty array. Cases and team names are read by the case generator, not fetched by the browser. Add tip submission, Google Voice information, and downloadable editions only when ready; a working form will require an explicitly chosen external service or backend.

## Editing case files

Edit `data/cases.json`, then run `node scripts/generate-cases.mjs` with a modern Node.js runtime (validated with Node 24). No npm installation is needed. Commit the generated `cases/index.html`, `cases/<id>/index.html`, and updated homepage alongside the data and any media changes. Edit the generator for shared page markup and `assets/css/styles.css` for styling; do not hand-edit generated case pages or the homepage region between the generated-feature markers. The newest published case supplies the homepage feature.

Case IDs are stable three-digit strings, with matching numbers such as `001` / `PNN-001`. Reference a team by `suspectTeamId`. Store `dateOpened` as an ISO timestamp with an explicit offset and `timeZone` as an IANA zone. PNN-001 opened October 4, 2026, at 7:21 p.m. America/Denver (`-06:00`). Evidence currently supports MP4 video with a JPEG/PNG/WebP poster, descriptive text, a caption, and local asset paths. The video is click-to-play, with no autoplay or initial media preload; its poster supplies the image-like preview.

Preview `/cases/` and `/cases/001/` over HTTP. Explicit `index.html` links also work when opening files directly. Each case displays a subject-team panel using the name, color, and logo resolved from `data/teams.json` through `suspectTeamId`. The first case uses `assets/evidence/001/black001.mp4` and an extracted `black001-poster.jpg`. Store case media under `assets/evidence/<case-id>/`; keep media awaiting assignment in `assets/evidence/unassigned/`. The former spotlight files have been moved into this structure without altering their contents. Update JSON paths when assigning media. The case generator validates required content, team references, unique IDs, and media paths, and escapes rendered text.

Only records with `published: true` appear in the generated listing. This flag does not make JSON private or remove previously generated pages. If withdrawing an existing case, explicitly replace its old page with an appropriate notice while preserving any printed QR URL. Never store private drafts in deployed data.

The Open Graph title and description are ready. Add an absolute `og:image` URL after producing a social preview PNG/JPEG; no broken placeholder image URL is shipped.

## PNN Tip Line / Tally setup

The `/tips/` page is ready for a Tally standard embed, with reporting guidance, private-review expectations, navigation from the homepage and case pages, and a direct Tally fallback link when configured. The published form is configured as https://tally.so/r/ODWPok. The generated page embeds it and provides a direct fallback link. Deploy the updated site files to make this configuration live on the custom domain. A blank form URL returns the page to the not-yet-connected state.

1. Create a form in your own [Tally account](https://tally.so/) named **PNN Tip Line — File a field report**. Use the brief below with Tally AI or build the fields manually.
2. Use these fields: required report type (prank report / suspicious activity / Panther sighting / correction / story idea / other); required long-text description (maximum 2,000 characters); optional approximate date; optional subject-team dropdown; optional name or alias (80 characters); optional file uploads; and required publication-permission choice. Do not collect emails, phone numbers, addresses, or a sign-in.
3. Populate the team dropdown from `data/teams.json`, plus **Unknown / not sure** and **Multiple teams**. The exact names are Black Webb Bandits, Area 51 Bureau, Pyro Posse, Prowling Purrpetrators, The Crimson Crew, Silver Bullets, and Tightie Whities.
4. Add a `/file` block. Allow multiple files, maximum **5**, maximum **10 MB per file**, optional. Allow JPEG/JPG, PNG, WebP, HEIC/HEIF photos and MP4/MOV videos; exclude unrelated documents and executables. Check the resulting allowed extensions and limits manually: Tally AI may not set every option. These are the limits described on the site. [Upload settings](https://tally.so/help/file-uploads).
5. Make publication permission a required single-choice question, with no preselected answer: **PNN may publish my report and attachments after review, without identifying me** or **For private review only — do not publish my report or attachments**. Keep reporter names private in either case. Add a required checkbox confirming the report concerns the game, that the submitter has permission to share the files, and that it contains no private information about others or material targeting children.
6. Add `/recaptcha` immediately above Submit. Set button text to **Send to Inspector Clueso's office**. Use this confirmation: **Report received. Inspector Clueso's office at PNN will review your submission. Nothing is published automatically. Your alibi may now resume.** [Spam protection](https://tally.so/help/recaptcha).
7. Set the form's theme to blush `#fff5f8`, dark berry text `#30212c`, and magenta buttons `#b60060`, with a readable sans-serif font. Leave Tally branding on the free plan. Exact custom CSS and branding removal are optional paid features, not required here.
8. In Settings, enable self email notifications to your account if desired. Keep submissions and any connected spreadsheets private; do not enable public results or automatic publication. Review reports in the form's **Submissions** tab. File links exported into other tools may grant access to anyone who receives those links. [Notifications](https://tally.so/help/email-notifications).
9. Publish the form. Copy its public respondent link (`https://tally.so/r/FORM_ID`), not an editor/dashboard link. Paste it into `formUrl` in `data/tip-line.json` and run `node scripts/generate-tips.mjs`. Commit the config and generated `tips/index.html`. Alternatively, send the public link to the coding agent to complete this step. No password or API key is needed.
10. Test `/tips/` on desktop and phone with one harmless photo. Confirm the submission and attachment arrive privately, permission is recorded, required fields work, unsupported/oversized files are rejected, and the confirmation appears. Delete the test submission afterward. Also check the direct link if an embed/script blocker is enabled. No end-to-end submission has been tested until your real form is connected.

The site generator supplies the standard embed with a hidden duplicate form title, transparent background, left alignment, and dynamic height. You do not need to paste Tally's embed code. It uses the official widget script only on the configured tips page; the direct link remains available if that script fails. The widget can forward the page URL/query parameters, so do not place personal information in tip-page URLs or add identity/tracking hidden fields. [Embed documentation](https://developers.tally.so/widgets/embeds).

For form introductory text, use: **A suspicious prank. An unexplained paw print. An alibi with too many details. Tell Inspector Clueso's office at PNN what happened. This is part of the Broomstick Challenge neighborhood game, not an emergency reporting service. Reports and files are stored by Tally for private PNN review. Nothing is automatically published. Leave out addresses, phone numbers, license plates, and uninvolved people's information. Posting here does not replace proof in the game group for prank points.**

Only approved reports with publication permission should be copied into public case data. Raw submissions, private-only reports, reporter identities, and exported attachment-access links do not belong in this repository. Moderators should check media and metadata before publishing a selected copy under `assets/evidence/<case-id>/`.

## Newsletter and print editions

`newsletter/index.html` is the stable `/newsletter/` landing page, linked from all main navigation and a homepage section. It currently uses the existing `assets/images/construction.png` illustration while the first edition is prepared. This is newsletter-specific; the rest of the newsroom remains open. No edition or PDF download is advertised as available yet.

Place approved print-ready PDFs in `assets/downloads/` with stable edition filenames, then add real dated edition/download links on the newsletter page. Keep historical edition links working. The final publication name is still undecided; the current page uses **PNN Newsletter**. Do not create empty PDFs or links to files that do not exist.

## Printed QR dispatch

Print the QR for **https://purrpetrators.net/dispatch/**. This permanent PNN-branded URL chooses a random published case on every visit without exposing selection logic in the URL. The ready-to-use assets are `assets/downloads/pnn-dispatch-qr.svg` (preferred for print) and `assets/downloads/pnn-dispatch-qr.png`. Both encode that exact HTTPS URL with a white quiet zone and high error correction. Do not crop the white margin, stretch the image, or print too small; test the actual printed piece on a phone after deployment.

`dispatch/index.html` loads `scripts/dispatch.js`, which fetches `data/cases.json` with `cache: 'no-store'`, filters for `published: true` and valid three-digit IDs, and uses `location.replace` to open a local case. Drafts and invalid IDs are excluded; a case can repeat on consecutive scans. With one published case, all scans open it. No cookies, tracking, or third-party redirect service are used.

To add a case, update the case JSON, run `node scripts/generate-cases.mjs`, and deploy the JSON and generated case pages together. New published cases then enter the QR selection without reprinting anything. Keep `/dispatch/` permanently stable. Missing/invalid data, an empty collection, a slow request, or disabled JavaScript leave a readable PNN page with a case-archive link rather than a redirect loop. Run `node --test scripts/dispatch.test.mjs` to verify selection and failure handling.

QR images were generated once using Segno in a temporary tooling directory; neither Python QR dependencies nor a QR generation service are needed to run or deploy the site. QR artwork only needs regeneration if the encoded URL deliberately changes, which would require replacing printed copies.

## Quick checks before publishing

- Preview desktop and narrow mobile widths; verify no horizontal scrolling.
- Tab to the skip link and verify keyboard focus is visible.
- Confirm videos remain paused until activated and keyboard controls are accessible.
- Confirm the favicon, styles, and scripts load under the deployed URL.
- Open a nonexistent nested URL on GitHub Pages to check the 404 page.

## Color palette

Inspired by the [Pink Panther character palette on SchemeColor](https://www.schemecolor.com/pink-panther-colors.php): pink #F699BE, magenta #EA0085, and pale pink #FFDEED, paired with charcoal #101014 and off-white #F2EFEE. These are reference palette values, not a verified official digital brand specification. The team logo and construction illustration are supplied project assets, preserved without cropping.

The current theme uses a light blush background and dark berry text, with 18px body text and no informational text below 16px. The supplied image files are preserved as provided.

## PNN telephone hotline

The public hotline is **+1 (801) 79-PRANK**, which dials **+1 (801) 797-7265**. Click-to-call links use `tel:+18017977265`. It appears in the homepage reporting callout, the Tip Line call panel, case reporting callouts, and all page footers. Case links are maintained in the generator. Tally remains the photo/video submission channel; phone-service settings are managed outside this repository. No calls were placed during site verification.
