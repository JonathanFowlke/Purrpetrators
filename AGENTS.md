# PNN repository guide

## Purpose and scope

PNN means **Purrpetrator News Network**, the fictional news and intelligence arm of **Prowling Purrpetrators**, a pink feline-themed team in the annual **Broomstick Challenge** neighborhood competition. The team tagline is **“Guilty of having a pranking good time.”** The domain is `purrpetrators.net`; the repository is `JonathanFowlke/Purrpetrators`.

Make the site feel like a small, surprisingly polished local newsroom taking ridiculous game events unnecessarily seriously. It serves real neighbors: friendly competition and theatrical mischief must never become humiliation or real-world harm.

This guide covers the whole repository. Inspect the current files and working-tree changes before editing. Implementation facts below describe the current newsroom site; future concepts are requirements for later work, not features already implemented or an instruction to build them now. Preserve unrelated work. Update this guide when architecture or conventions materially change. `CLAUDE.md` points to this file.

## Game context

Couples form teams, receive a color, and choose a name tied to that color. Teams prepare themed costumes, perform pranks, and give treats to women participating in the game before asking whether they are one of the three witches. Successful pranks and finding witches earn points.

The organizers are **Wanda, Hilda, and Glenda**, called the witches in game materials. On the final night, teams hunt for ingredients for the witches' potion, bring themed food and desserts, and share their pranks and experiences at a party. Participants vote in several “best” categories; total points determine the winners of trophies and lifetime bragging rights. Do not invent point values, event dates, team rosters, or additional organizer rules.

### Authoritative prank rules

Preserve these rules and their intent in content, submission review, and any future game features:

1. Teams are encouraged to prank each other to earn maximum points.
2. A team can only prank another team once.
3. Try to choose a team member who has not already been pranked so the fun is shared.
4. A photo or video must be posted to the **game group** as proof to receive prank points. Publication on PNN does not replace this requirement.
5. Nothing may damage or destroy property. Borrowing property is a grey area, not blanket permission.
6. Be considerate of young families. A prank must **not directly target or frighten someone else's child**.
7. Do not perform a prank with the intent of waking someone up or disrupting sleep schedules.
8. Do not sign up, register, or share personal information such as names, addresses, or phone numbers with outside groups or parties who are not participating in the game.
9. Pranks and associated images must be posted **by October 22** to receive points.

The organizing principle is **“Be clever and fun, but don't be mean.”** The supplied deadline has no stated year, time, or timezone; do not infer these from the site's copyright year or silently roll the deadline forward for another competition.

## Content boundaries

Favor funny, clever, theatrical material over anything mean, invasive, or consequential. Never design features or write instructions that encourage harassment, intimidation, frightening children, property damage, sleep disruption, spam, threats, fraud-like behavior, or contacting uninvolved third parties. Do not facilitate fake job applications, service registrations, submitting other people's information to outside organizations, or actions with financial, legal, employment, reputational, or other real-world consequences.

PNN must remain clearly fictional. Do not impersonate businesses, real news organizations, government, police, or other authorities. Fake breaking news, mock “charges,” threat ratings, and official-sounding notices must be recognizable as neighborhood-game fiction. Avoid real accusations or content that could be mistaken for a legal or law-enforcement notice. Where a story, printable notice, or QR landing page can circulate independently, give it enough PNN/game context to remain understandable on its own.

Humor may target game behavior and absurd fictional motives. Do not base jokes on bodies or appearance, family problems, finances, relationships, health, religion, or genuinely embarrassing personal matters. Do not publish private contact information, addresses, unrelated personal details, or information obtained without permission. Review photos for identifying details such as house numbers, license plates, and uninvolved people before publication; use only appropriate, intentionally provided game material.

## Voice and recurring language

Use **“Wanted everywhere, caught nowhere.”** as the current PNN brand line, including the homepage headline and mastheads. Retain **“Guilty of having a pranking good time.”** as the team tagline. Reports go to **Inspector Clueso's office at PNN**, the fictional identity of the team's private review desk. Keep the user-provided spelling **Clueso**; do not silently substitute a franchise character's spelling or imply real police authority. Tally remains the actual submission provider. Updating website copy does not update the separately managed Tally form's introduction, button, or confirmation message.

Write short, punchy, confident, professionally edited copy. Be clever, mischievous, mysterious, theatrical, witty, deadpan, and mock-official. Let understatement and exaggerated administrative seriousness carry the joke. Avoid walls of text, excessive slang, profanity, frightening content, actual threats, and edgy or humiliating humor. Use feline wordplay selectively rather than in every sentence.

Examples:

- “Team Blue is under investigation.”
- “Suspected motive: attention.”
- “PNN has recovered three pieces of evidence.”
- “PNN assessment: moderately suspicious.”

Avoid copy such as “AHAHAHAHA Team Blue is SO CRAZY!!” Do not turn sample fictional incidents into claims about real participants.

Use names consistently:

| Term | Meaning |
| --- | --- |
| PNN / Purrpetrator News Network | Fictional media and intelligence operation |
| Prowling Purrpetrators | Actual participating team |
| Purrveillance | Fictional observation/investigation motif, not actual tracking |
| Case File | Fictional investigation record |
| Suspected Motive | Absurd explanation for game behavior |
| Evidence | Approved game photos, observations, or provided material |
| Prowl Alert | Breaking announcement |
| PNN Tip Line | `/tips/` submission page; Tally must be configured to accept reports |
| Purrpetrator Post | Possible newsletter name; not final |

## Current implementation

The project is plain HTML, CSS, and browser JavaScript, with a dependency-free Node.js authoring script that generates committed case HTML from JSON. There is no framework, package manifest, dependency installation, deployment build step, general test framework, CI workflow, database, backend, analytics, cookies, external font, or site-owned submission backend. Tally is selected for the Tip Line; the public form URL is configured; live availability depends on deploying the generated tips page. Do not invent npm commands or assume a router exists. The current site works without browser JavaScript.

| Path | Current responsibility |
| --- | --- |
| `index.html` | Live newsroom homepage: masthead, PNN introduction, generated latest case feature, team introduction, footer |
| `404.html` | “Signal Lost” error page with `noindex`, home links, and deployment-aware asset base |
| `assets/css/styles.css` | Shared design tokens, layout, typography, responsive rules, focus and reduced-motion styles |
| `scripts/main.js` | Legacy launch-status animation; no longer loaded by the homepage |
| `tips/index.html` | Tip Line page with a generated Tally embed or honest unconfigured state |
| `data/tip-line.json` | Public Tally respondent URL; currently https://tally.so/r/ODWPok |
| `scripts/generate-tips.mjs` | Validates the Tally URL and updates only the marked form region |
| `scripts/generate-cases.mjs` | Node.js authoring command: reads case/team JSON and generates escaped static HTML |
| `cases/index.html`, `cases/001/index.html` | Generated case index and first case, PNN-001 |
| `assets/evidence/001/` | PNN-001 media: `black001.mp4` and extracted `black001-poster.jpg` |
| `assets/evidence/unassigned/` | Supplied media not yet assigned to a case: green/silver videos and red image |
| `assets/images/pnn.svg` | Custom connected PNN lettering, magenta strokes with white inset lines; used in both headers and homepage hero |
| `assets/images/logo.png` | Supplied team artwork, 600 × 516 |
| `assets/images/construction.png` | Existing 1536 × 1024 illustration reused for the newsletter's first-edition placeholder |
| `assets/images/favicon.png` | Supplied feline favicon currently linked by both HTML pages |
| `assets/images/favicon.svg` | Alternate geometric feline icon; currently not linked |
| `assets/images/teams/` | Supplied color-named team logos referenced by `data/teams.json`; case pages display the subject team's logo |
| `assets/images/evidence/` | Legacy empty placeholder; use `assets/evidence/` for new case media |
| `assets/downloads/` | Printable dispatch QR PNG/SVG; future approved newsletter PDFs belong here |
| `newsletter/index.html` | Newsletter landing page; first edition in preparation, no published PDFs yet |
| `dispatch/index.html`, `scripts/dispatch.js` | Permanent QR destination that selects a published case on each visit |
| `scripts/dispatch.test.mjs` | Dependency-free Node tests for dispatch selection and fallback behavior |
| `data/teams.json` | Seven confirmed teams with stable color IDs/slugs, names, colors, logo paths, and an own-team flag |
| `data/stories.json` | Empty array; no story loader or schema yet |
| `data/cases.json` | Structured case records, currently PNN-001 investigating the black team's late name reveal |
| `pages/` | Empty placeholder for future content pages |
| `CNAME` | Contains `purrpetrators.net` |
| `.nojekyll` | Keeps static deployment from requiring Jekyll processing |
| `README.md` | Local preview and intended GitHub Pages deployment instructions |
| `.gitignore` | Excludes `.idea/`, `.DS_Store`, `Thumbs.db`, and `node_modules/` |

Placeholder directories contain `.gitkeep`. Local `.idea/` files are editor metadata, not application configuration; do not copy their machine-specific details into documentation or commits.

### Existing behavior to preserve

- The site-wide construction notice, launch-status panel, and launch script have been removed from the homepage. Construction messaging is now limited to the newsletter section and page while its first edition is prepared. The retained `scripts/main.js` is unused legacy code, not a current feature.
- The site pages have skip links, semantic main content, visible keyboard focus, and accessible home-link names. The repeated hero logo is decorative; meaningful images have alt text and explicit dimensions.
- The latest case's poster receives fetch priority; the lower team image is lazy-loaded. Evidence videos have controls and a poster with no autoplay. Preserve image aspect ratios and avoid unintentionally cropping supplied artwork.
- The homepage has canonical-domain Open Graph URL/title/description metadata but no `og:image`. Only add that property when a real share image is available, using an absolute URL.

## Visual direction and assets

The desired identity combines hot pink/magenta, near-black, off-white neutrals, restrained noir/newsroom presentation, case files, surveillance framing, paw prints, and subtle feline or construction motifs. Aim for **professional enough that the absurdity becomes funnier**. Avoid making childish cartoons the primary UI language.

The current site uses a **light blush theme**, dark berry text, bold Arial/Helvetica typography, rounded panels, and pink shadows. Preserve this working design unless a redesign is requested; noir inspiration is not an instruction to switch every page to a dark theme.

Current CSS tokens are the implementation source of truth:

| Token | Value |
| --- | --- |
| `--bg` | `#fff5f8` |
| `--text` | `#30212c` |
| `--muted` | `#65515f` |
| `--pink` | `#f699be` |
| `--magenta` | `#b60060` |
| `--pale-pink` | `#ffdeed` |
| `--line` | `#dbb8c9` |

The README's reference palette differs from these current styles. Reuse CSS variables rather than treating those reference colors as current tokens. The external SVG wordmark contains its own hard-coded magenta and white strokes; a deliberate palette change must account for it separately.

The layout uses a 1440px maximum shell, an 18px base font, and responsive breakpoints at 1050px, 760px, and 400px. The hero becomes one column at 760px. Preserve readable typography, keyboard focus, contrast, and reduced-motion handling when evolving the design.

The supplied PNGs visibly resemble Pink Panther character artwork; their presence does not establish original authorship or licensing. Preserve existing files during unrelated work, but do not expand dependence on copyrighted Pink Panther artwork. For new branding or an asset refresh, prefer original silhouettes, paws, eyes, claws, geometric feline motifs, typography, patterns, and illustrations. The current PNN SVG uses CNN-inspired connected linework; this is an existing implementation, not permission to copy commercial logos or imply affiliation. Develop PNN's own recognizable identity.

## Future site and content architecture

`data/teams.json` is the source of truth for the seven user-confirmed team names and their logos in `assets/images/teams/`. Use its names rather than transcribing artwork (the green team's canonical name is **Area 51 Bureau**). Each record has required string fields `id`, `slug`, `name`, `color`, and `logo`, plus boolean `isOurTeam`. IDs and slugs are unique lowercase color names; `color` is the display label. Logo paths are relative to the repository/site root, without a leading slash; resolve them against the deployment base when rendering nested pages. Exactly one record, `pink` / Prowling Purrpetrators, has `isOurTeam: true`. Team data is consumed by the static case generator; there is no browser data loader. Preserve exact asset extensions and do not infer members or incidents from illustrations. Supplied Halloween imagery and slogans do not override the game-safety and copy rules above.

Potential areas include Breaking News, Team Reports, PNN Investigations, Suspected Motives, Evidence, Team Dossiers, Tip Line, Newsletter, Alerts, About PNN, and special QR landing pages. The homepage, error page, case index, first case, Tip Line, newsletter, and dispatch pages currently exist; add other areas only when requested.

### Current case authoring contract

Edit `data/cases.json` and run `node scripts/generate-cases.mjs` (validated with Node 24; no npm packages). Commit the generated case HTML and updated homepage so GitHub Pages needs no build command. Do not hand-edit generated case files or the homepage region between `BEGIN GENERATED FEATURED CASE` and `END GENERATED FEATURED CASE`; the newest published case supplies that region. Shared markup belongs in the generator and shared styles in `assets/css/styles.css`. The generator resolves the subject team's name, color, and logo from `data/teams.json` via `suspectTeamId` and displays a subject-team panel above the evidence. Do not duplicate team branding in case records. There is no browser JSON loader.

Case records use a unique three-digit string `id`, matching `caseNumber` (`PNN-001`), ISO `dateOpened` with offset, IANA `timeZone`, `status`, `suspectTeamId`, `incidentTitle`, `summary`, `incidentDescription`, `suspectedMotive`, `evidence`, `investigatorNote`, `threatLevel`, `disposition`, `relatedStoryIds`, and boolean `published`. The first timestamp is `2026-10-04T19:21:00-06:00`, America/Denver. Evidence currently supports video records with `id`, `type: "video"`, site-root-relative MP4 `src`, local `poster` (JPEG/PNG/WebP), `label`, `description`, and `caption`. Store assigned media under `assets/evidence/<case-id>/` and unassigned media under `assets/evidence/unassigned/`; move media and update references when assigning it. The former `assets/spotlights/` folder has been retired. The still preview is an extracted frame. Use controls and no autoplay, provide descriptive text, and clearly identify fictional reconstruction footage.

The generator validates required text, IDs, team references, and media paths, escapes text, and produces `/cases/` and `/cases/<id>/` with relative assets and explicit `index.html` links. Preserve these routes for QR use. Only published cases enter the listing; changing the flag does not delete old generated pages or hide JSON. Explicitly replace a withdrawn case page with an appropriate notice rather than leaving stale content or breaking printed URLs.

Favor static, content-driven implementation with one source of truth, stable IDs, consistent schemas, and reusable rendering. Keep content separate from presentation. Avoid copying story metadata into multiple independently maintained pages. Introduce only the components or templates needed by an actual feature; do not install a framework merely to prepare for possibilities.

The recurring editorial structure is:

**Real team prank → PNN incident report → investigation → suspected motive → evidence → official PNN assessment.**

### Suggested data conventions when the first content feature is built

The story fields and team dossier extensions below are proposed conventions; the current team and case contracts are documented above. Establish and document additional required fields, defaults, status values, and validation with their first implementation. Keep JSON valid, use stable string IDs, use ISO-formatted dates, and reference related records by ID rather than duplicating them. Choose slugs that can remain stable after headlines change.

| Collection | Suggested fields |
| --- | --- |
| Stories | `id`, `slug`, `date`, `headline`, `shortHeadline`, `teamId`, `category`, `summary`, `incident`, `suspectedMotive`, `evidence`, `assessment`, `threatLevel`, `image`, `relatedCaseId`, `published`, `featured`, `tags` |
| Team dossier extensions | approved `photo`, fictional `aliases`, `charges`, `strengths`, `weaknesses`, `threatRating`, `notableStoryIds`, submitted `quotes` |

Use a consistent human-readable case-number format, for example `PNN-042`, once selected. Cases and “threat” labels describe playful game fiction, never real criminal or safety judgments. Evidence can use structured entries with an asset path, alt text, caption, and type as needed. Do not fabricate rival teams or seed invented incidents as published facts.

Team dossiers may include intentionally supplied game photos, fictional aliases/charges, playful strengths and weaknesses, approved incidents, and submitted humorous quotes. Exclude addresses, phone numbers, private contacts, sensitive information, and personal details unrelated to the competition.

`data/alerts.json` and `data/newsletter.json` are possible additions, not existing files. Do not store confidential drafts or raw submissions in deployed JSON: a `published: false` flag controls presentation, not access to a public file or repository.

## Submissions, moderation, and hotline

Possible submissions include suspicious-activity reports, Panther sightings, evidence, game tips, funny observations, corrections, and story suggestions. Treat all submissions as untrusted content.

Required submission workflow:

**Public submission → private storage → human review → approval → published content.**

Never allow random users to publish directly to the public site. Validate types, sizes, lengths, and allowed fields; render text safely and sanitize any supported rich content. Validate uploaded files and URLs. Do not insert untrusted markup with `innerHTML`. Collect only necessary information, keep submitter identity private by default, and reject abusive material or game-rule violations. Human review must include privacy and photo suitability, not just spelling.

GitHub Pages does not provide private submission storage. Tally is the selected provider. The site has a `/tips/` page, linked from homepage and case navigation, that stays explicitly unconfigured while `data/tip-line.json` has an empty `formUrl`. Set it to the published `https://tally.so/r/FORM_ID` link and run `node scripts/generate-tips.mjs`; commit the generated tips page. Edit page copy outside the generated markers normally, and edit `renderTipForm` for embed markup. The configured page uses Tally's official widget for dynamic height and provides a direct-form fallback. It never handles uploads itself or automatically publishes submissions. No API keys are needed. The widget is an external script limited to this page and may forward URL parameters; never put private data in those parameters. See README for the exact Tally fields, 5-file/10-MB limits, consent choices, moderation workflow, and manual activation checklist. End-to-end uploads require testing against the owner's real published form. Never put service secrets, raw reports, private contact details, or moderation records in public assets or client code.

The user-provided public **PNN Hotline** is **+1 (801) 79-PRANK**, numerically **+1 (801) 797-7265**. All call links must use `tel:+18017977265`; preserve the vanity spelling in visible branding and show numeric dialing instructions on the Tip Line page. It serves Inspector Clueso's office at PNN. Include it in reporting callouts and site footers, including the case generator so regeneration preserves it. The site provides click-to-call only; do not claim SMS, call recording, voicemail configuration, round-the-clock staffing, or anonymous calling without confirmation. The Tally form remains the route for file uploads. Encourage game-related reports, never harassment or private information about uninvolved people.

## Newsletter, QR pages, and fictional notices

The stable `/newsletter/` page and homepage newsletter section reuse `assets/images/construction.png`. They clearly state that the first edition is being prepared, without nonexistent download links. Keep the current neutral **PNN Newsletter** title until a final publication name is chosen. Store approved PDFs under `assets/downloads/`, add dated edition links when actual files exist, and preserve old edition URLs.

The printed QR destination is **https://purrpetrators.net/dispatch/**. Keep that path permanent and use PNN Dispatch wording; do not rename it to `random-case`. Printable PNG and SVG QR files live at `assets/downloads/pnn-dispatch-qr.*`. The redirect script fetches current case JSON without cache, randomly selects among unique valid IDs with `published: true`, and uses `location.replace` to avoid Back-button redirect loops. New cases become eligible when the data and generated case pages are deployed together; no QR regeneration is needed. Repeats are allowed. Empty, invalid, or unavailable collections and disabled JavaScript retain an archive link. The selection tests use `node --test scripts/dispatch.test.mjs`. No persistent tracking or external redirect infrastructure is involved.

The newsletter may be named **Purrpetrator News** or **Purrpetrator Post**; the final name is undecided. It can reuse approved website stories, investigations, motives, corrections, alerts, photos, selected tips, absurd statistics, mock classifieds, and clearly fictional, friendly “most wanted” game material. Keep the same PNN voice and avoid maintaining conflicting copies of the underlying content. `assets/downloads/` is available for future editions.

Printed QR codes may link to stories, cases, team dossiers, tips, the hotline, notices, editions, or temporary announcements. Candidate paths include `/news`, `/cases/042`, `/teams/blue`, `/hotline`, `/report`, `/alert`, and `/purrpetrator-post`; **these routes do not currently exist**.

Use stable, memorable destinations and keep them working after printing. Change content behind a URL instead of renaming it; retain an appropriate landing page or static redirect if a destination moves. A root directory with `index.html` can support a clean GitHub Pages path; the existing `pages/` directory is also available for explicit static page URLs. Resolve this deliberately when adding a route. Do not assume server rewrites or an SPA fallback. Test the exact URL, including directory/trailing-slash behavior, before printing. QR destinations must not trigger third-party actions involving a target's personal information.

Removable vehicle prank cards may say “PNN Surveillance Notice,” “Purrpetrator Citation,” “Prowling Violation,” “Security Audit Failed,” “Vehicle Compromised,” “Person of Interest,” or “You've Been Prowled.” These are theatrical labels only. Cards for participating teams' street-parked vehicles must be non-damaging, removable, obviously fictional once read, unlike real legal citations, and placed without obstructing visibility. Avoid adhesives on paint or glass unless explicitly safe and appropriate. QR-linked case pages must preserve that fictional context and must not expose vehicle owners' private information.

## Hosting and URL handling

The intended setup is a Namecheap-managed domain with DNS pointing to GitHub Pages for `JonathanFowlke/Purrpetrators`. The repository's `origin` matches that repository. `CNAME` records the domain but does not configure DNS or prove that the live deployment is active. Hosting settings and DNS were not verified by repository inspection.

The README documents **Deploy from a branch**, using the default branch and repository root. Keep `.nojekyll`, static assets, and custom-domain compatibility. Do not introduce a persistent server, database, paid hosting, or complex build infrastructure without a requirement that justifies it.

- Root-page assets use relative paths such as `assets/css/styles.css`; pages under `pages/` need `../assets/` and `../scripts/`, adjusted for depth.
- `404.html` injects a `<base>` before loading assets: `/` on the custom domain, or the first path segment on a `*.github.io` project site. It skips this behavior for `file:` previews.
- That base logic assumes a GitHub project site, not a `username.github.io` root site; the latter requires `/`. Other subdirectory hosting needs its actual deployment prefix. Preserve nested-error-page asset and home-link behavior when editing it.
- GitHub Pages paths are case-sensitive. Use exact filenames and verify links from each page depth.
- Do not change domain configuration, publish, or add integrations merely because this guide describes them.

## Engineering workflow and validation

1. Inspect the relevant HTML, CSS, JavaScript, assets, data, README, and working-tree diff. Preserve working behavior and unrelated edits.
2. Make the smallest coherent change. Prefer semantic HTML, shared CSS tokens/classes, and small browser scripts; avoid unnecessary dependencies or abstractions.
3. Keep assets local where practical, pages fast, and images appropriately sized. Preserve alt text, explicit dimensions, responsive layouts, visible focus, and reduced-motion support. New forms need accessible labels and errors.
4. Keep content and presentation separate when implementing content features. Validate JSON and ID references; handle missing images, empty collections, and absent optional fields sensibly.
5. Check game rules, fictional framing, privacy, and tone for every public-content change.
6. Run checks appropriate to the change and state what was actually verified. Update documentation when behavior or setup changes; do not claim browser tests or deployment verification that did not occur.

For local preview, open `index.html` directly or, with Python installed, run from the repository root:

```sh
python -m http.server 8080
```

Then visit `http://localhost:8080/` and `http://localhost:8080/404.html`. Use HTTP when testing future JSON fetching. Python's simple server does not automatically serve the custom `404.html` for missing URLs; verify real nested 404 behavior separately on GitHub Pages when deployment work is authorized.

For visual or behavioral changes, check desktop and narrow mobile widths, including around the existing breakpoints; look for clipping and horizontal overflow. Test keyboard access and the skip link, reduced motion, no-JavaScript usability where applicable, console errors, missing assets, links, and any changed content-loading behavior. Check custom-domain and repository-subpath URL assumptions when paths change. Validate changed JSON/SVG syntax and use `git diff --check` for whitespace issues. Dispatch behavior has targeted tests using the built-in Node test runner; do not add a test framework for a documentation-only or simple cosmetic change.

Keep this guide free of secrets, credentials, private personal information, and machine-specific configuration. Document actual implementation separately from proposals so future agents can extend the PNN universe without inventing infrastructure or compromising the neighborhood game.
