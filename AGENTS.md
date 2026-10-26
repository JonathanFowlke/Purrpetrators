# PNN repository guide

## Agent instruction loading

This root `AGENTS.md` is the canonical instruction file for Codex and covers the entire repository. Read it before editing; re-read it after the user changes editorial guidance during a session. `CLAUDE.md` points here rather than maintaining a separate copy. Keep this file below 32 KiB so it fits Codex's default project-instruction budget. Longer supporting guidance lives in `docs/repository-reference.md`; read the relevant sections when a task touches those topics. Keep core editorial rules and the current authoring contract here.

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

### Editorial bias: Clueso versus the Prowling Purrpetrators

Write new cases from Inspector Clueso's perspective: PNN is theatrically biased against its own pink team, the **Prowling Purrpetrators**, whom he regards as elusive prank masterminds who must be caught. His guiding principle is **“Guilty until proven guilty.”** This is a running neighborhood-game joke, not a real accusation or a standard for reviewing submissions. PNN's polished newsroom voice should make his unreasonable certainty funnier: suspiciously confident conclusions, grudging acknowledgment of an effective prank, and administrative frustration when the pink suspects remain uncaught.

Apply this perspective in case headlines, suspected motives, investigator notes, and final assessments. Keep incident descriptions and evidence faithful to approved material; the bias belongs in Clueso's clearly comic interpretation. Cases about other teams can still stand on their own. Keep `suspectTeamId` tied to the actual case subject, and do not invent pink-team involvement or evidence merely to sustain the joke.

Invite other teams to help Clueso build his fictional case by sending game-related sightings, prank reports, and approved evidence to the PNN Tip Line or hotline. Make reporting feel like joining the investigation against the pink team; retain private storage, human review, and approval before publication. The apparent hostility toward our own team may leave participants wondering whether PNN is another team's prank against us. Let that playful ambiguity emerge from the voice, without falsely attributing ownership, statements, or actions to another team or removing the clear PNN/Broomstick Challenge fictional context.

Example voice, not claims about actual incidents:

- “The Prowling Purrpetrators remain guilty until proven guilty. Inspector Clueso considers this an efficient policy.”
- “No pink suspects were caught. Clueso has requested a more cooperative set of facts.”
- “Seen the Prowling Purrpetrators at work? Send game evidence to Inspector Clueso's office at PNN. His theory could use some facts.”

### Friendly roasting and case continuity

Make cases funny enough to be worth reading, and **roast every team involved, pranker and victim alike, hard, except the Prowling Purrpetrators**. **Never roast the pink team: it is our team, so make it look good, in clever, funny ways** (sound like a roast, then turn it into praise). Clueso's failure to catch it is the one allowed joke, since it flatters the team. Friendly embarrassment over game behavior is the goal: bad timing, overconfidence, a grand plan defeated by a simple fact, and overcompensating for an earlier blunder. The boundaries above concern personal humiliation and real-world harm, not a pointed roast of an approved game incident. Never flatten rivalry into cautious corporate copy.

**Comedy bar (PNN-004 is the minimum):** pile on puns tied to the team's name, theme, and the actual artifact (fire team, balloons: "hot air"; secrets team, trash on display: "outed by its own recycling"); give every team at least one roast in the headline, motive, exhibits, note, and disposition; escalate the absurdity each paragraph; end exhibit captions and the disposition on a punch line; make absurd fictional theories the joke, never the participants' bodies, families, money, or private lives. Full checklist: `docs/repository-reference.md`.

Build a comic narrative from confirmed events. Use a setup, an escalating contrast, and a short payoff. Call back to earlier cases when relevant and link to them through `relatedCaseIds`. Frame invented motives as PNN theories, not facts or participant admissions. Keep Clueso's pink-team fixation a quick aside when the story concerns another team.

Public copy should sound like PNN reporting, not an evidence audit or implementation note. Do not interrupt a joke with unsolicited remarks such as "the treats are not pictured," "no evidence supplied connects the pink team," or a list of penalties nobody claimed. Describe the actual artifact accurately, retain necessary reconstruction labels and standalone game context, and quote organizer instructions faithfully. Keep technical limitations and editorial verification in authoring notes or the work summary when needed. Captions can be punch lines: "The paperwork was ready. The witches were not."

## Current implementation

The site is a **React + Vite static site**: React components render every page to plain HTML at build time (`npm run build` writes `dist/`), and a GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys `dist/` to GitHub Pages. **Generated HTML is not committed.** No React runtime ships to browsers; pages are static documents, and the existing vanilla scripts in `public/scripts/` provide the progressive enhancements. There is no router, database, backend, external font, or site-owned submission backend. Tally is selected for the Tip Line; the public form URL is configured in `data/tip-line.json`. The site works without browser JavaScript, except the newsletter page's EmailOctopus sign-up embed (has a noscript fallback); the news ticker, countdown numbers, 404 one-liners, homepage daily tip, and Catnip & Hairball Index enhancements run with JavaScript and otherwise fall back to a static tip and exact, alphabetically ordered static bars. Google Analytics uses the supplied Google tag with measurement ID `G-KGKE2M052Z` (`SITE.gaId` in `src/lib/constants.js`, emitted by `src/components/layout/Document.jsx`) on every website page, including print/resource pages and cases; the importable newsletter email is excluded. Analytics loads an external Google script and can use cookies; there is no site consent UI or custom event instrumentation.

### Source layout and commands

| Path | Responsibility |
| --- | --- |
| `data/*.json` | Single source of truth for content (cases, teams, dossiers, tips, ticker, countdown, final results, newsletters, printable cards, Tally and EmailOctopus settings). Also copied to `dist/data/` because browser scripts fetch `data/cases.json` and `data/news-ticker.json`. |
| `src/components/` | Reusable, **pure** React components (props in, markup out; they never read files or JSON). Groups: `layout/`, `ui/` (shared primitives such as `Callout`, `HotlinePanel`, `PageHeading`, `ListingCard`), `case/`, `team/`, `home/`, `forms/`, `print/`, each with a `*.stories.jsx`. Compose existing primitives before adding markup. |
| `src/pages/` | One component per route; pages read the model from context and compose components. |
| `src/routes.jsx` | Every public file the site produces (`getRoutes`). URLs are printed on QR codes and must not change. |
| `src/lib/` | `model.js` (pure derived data: index, ticker, daily tip), `site.jsx` (relative-URL context, `Link`, `Img`), `prose.jsx` (case authoring markup), `constants.js` (hotline, nav, brand), `embeds.js` (Tally/EmailOctopus URLs). |
| `src/email/` | Newsletter email rendering (`newsletter.js`) and shell (`newsletter.html`). String templates (email clients need inline-styled tables); never scripts or analytics. |
| `scripts/` | `build.mjs` (validate, render, write `dist/`), `lib/load-data.mjs` (read and validate data), `lib/dev-pages.mjs`, `serve-dist.mjs`, `new-edition.mjs`. |
| `public/` | Copied verbatim into `dist/`: `assets/`, browser scripts in `scripts/`, `CNAME`, `robots.txt`. |
| `tests/` | `node --test` suites; the robots, analytics, and permanent-URL checks run against `dist/`. |

Commands (Node 24): `npm ci`; `npm run dev` (renders pages on demand at http://localhost:5173/, edit components or `data/*.json` and refresh); `npm run build`; `npm run preview` (serves `dist/` at http://localhost:8080/ with a real 404.html); `npm test` (builds, then runs all tests); `npm run storybook` (component stories at http://localhost:6006/); `npm run new-edition -- 002`; `npm run update` (`npx --yes npm-check-updates -u`, then install).

The full file-by-file inventory (public URLs, data files, and each feature's constraints) lives in [docs/repository-reference.md](docs/repository-reference.md#file-inventory); read it before changing a feature. Its paths for pages are public URLs; where it names `scripts/generate-*.mjs` or `BEGIN/END GENERATED` regions, read the matching React component under `src/components/`.

Placeholder directories contain `.gitkeep`. Local `.idea/` files are editor metadata, not application configuration; do not copy their machine-specific details into documentation or commits.

### Existing behavior to preserve

- The homepage has no construction notice or launch-status panel; it links to numbered newsletter editions.
- The site pages have skip links, semantic main content, visible keyboard focus, and accessible home-link names. The repeated hero logo is decorative; meaningful images have alt text and explicit dimensions.
- The latest case's poster receives fetch priority; the lower team image is lazy-loaded. Evidence videos have controls and a poster with no autoplay. Preserve image aspect ratios and avoid unintentionally cropping supplied artwork.
- The homepage has canonical-domain Open Graph URL/title/description metadata but no `og:image`. Only add that property when a real share image is available, using an absolute URL.

## Visual direction and assets

Before design or asset work, read the corresponding section in [docs/repository-reference.md](docs/repository-reference.md). Those instructions remain part of this repository guide.

## Future site and content architecture

`data/teams.json` is the source of truth for the seven user-confirmed team names and their logos in `assets/images/teams/`. Use its names rather than transcribing artwork (the green team's canonical name is **Area 51 Bureau**). Each record has required string fields `id`, `slug`, `name`, `color`, and `logo`, plus boolean `isOurTeam`. IDs and slugs are unique lowercase color names; `color` is the display label. Logo paths are relative to the repository/site root, without a leading slash; resolve them against the deployment base when rendering nested pages. Exactly one record, `pink` / Prowling Purrpetrators, has `isOurTeam: true`. Team data is consumed by the static case generator; there is no browser data loader. Preserve exact asset extensions and do not infer members or incidents from illustrations. Supplied Halloween imagery and slogans do not override the game-safety and copy rules above.

Potential areas include Breaking News, Team Reports, PNN Investigations, Suspected Motives, Evidence, Team Dossiers, Tip Line, Newsletter, Alerts, About PNN, and special QR landing pages. The homepage, error page, case index, first case, Tip Line, newsletter, and dispatch pages currently exist; add other areas only when requested.

### Current case authoring contract

Edit `data/cases.json` and run `npm run build` (or `npm run dev` and refresh). Do not commit generated HTML; CI builds and deploys it from `main`. Markup lives in the React components (`src/components/case/`, `src/pages/CasePage.jsx`) and shared styles in `public/assets/css/styles.css`. The model resolves the subject team's name, color, and logo from `data/teams.json` via `suspectTeamId` and the case page displays a subject-team panel above the evidence. Do not duplicate team branding in case records. The homepage feature is the newest published case, rendered by `src/components/home/FeaturedCase.jsx`. There is no browser JSON loader except the dispatch and ticker scripts.

Case records use a unique three-digit string `id`, matching `caseNumber` (`PNN-001`), ISO `dateOpened` with offset, IANA `timeZone`, `status`, `suspectTeamId`, opt. `coSuspectTeamIds`, `incidentTitle`, `summary`, `incidentDescription`, `suspectedMotive`, `evidence`, `investigatorNote`, `threatLevel`, `disposition`, `relatedStoryIds`, and boolean `published`. The first timestamp is `2026-10-04T19:21:00-06:00`, America/Denver. Evidence supports video records with `id`, `type: "video"`, site-root-relative MP4 `src`, local `poster` (JPEG/PNG/WebP), `label`, `description`, and `caption`. Store assigned media under `assets/evidence/<case-id>/` and unassigned media under `resources`; move media and update references when assigning it. The former `assets/spotlights/` folder has been retired. The still preview is an extracted frame. Use controls and no autoplay, provide descriptive text, and clearly identify fictional reconstruction footage. Blank lines inside `incidentDescription`, `suspectedMotive`, `investigatorNote`, and `disposition` render as separate paragraphs. Blur license plates, house addresses, agent or other third-party contact details, and people before assigning photos.

Image, written-report (`type: "report"`), organizer-notice, and reconstruction-flag rules for evidence are in [docs/repository-reference.md](docs/repository-reference.md#case-record-details); read them before adding evidence. Generated illustrations must set `reconstruction: true` and say so in the caption.

Written evidence uses `type: "report"` with nonempty `id`, `label`, `description`, and `caption`, with no media path required. It renders as escaped witness-report text. Summarize approved accounts without identifying private households or submitters; distinguish witness impressions from PNN theories. The homepage uses the first image/video when present, or a text-only feature and witness-report link when none exists. PNN-003 uses the supplied dog-walking account about the Tightie Whities. Its opening timestamp records creation of the case, not the encounter time; the incident date is not yet confirmed.

Optional `purrHiss` ratings feed the **Catnip & Hairball Index** (comedy only; never game points, standings, or votes; the daily order shuffle must not imply a ranking). Details, data keys, and bonuses are in [docs/repository-reference.md](docs/repository-reference.md#case-record-details). Optional `relatedCaseIds` links callbacks to earlier published cases.

Optional `relatedCaseIds` is an array of unique existing case IDs, excluding the current case. The generator validates references and links only published related cases, deriving their title and case number from the source records. Use it for callbacks rather than putting HTML or duplicate case titles in JSON. Optional `series` (`{name, blurb, startCaseId}`) on the newest case adds a homepage "Start at" link. Each published case and non-draft newsletter edition carries its own ticker headlines in `tickerItems` (`{tag, text}`; 3+ per case, 2+ per edition), merged with the generic `data/news-ticker.json` pool.

The generator validates required text, IDs, team references, and media paths, escapes text, and produces `/cases/` and `/cases/<id>/` with relative assets and explicit `index.html` links. Preserve these routes for QR use. Only published cases enter the listing; changing the flag does not delete old generated pages or hide JSON. Explicitly replace a withdrawn case page with an appropriate notice rather than leaving stale content or breaking printed URLs.

Favor static, content-driven implementation with one source of truth, stable IDs, consistent schemas, and reusable rendering. Keep content separate from presentation. Avoid copying story metadata into multiple independently maintained pages. Introduce only the components or templates needed by an actual feature; do not install a framework merely to prepare for possibilities.

The recurring editorial structure is:

**Real team prank → PNN incident report → investigation → suspected motive → evidence → official PNN assessment.**

### Suggested data conventions when the first content feature is built

Before new story collections or team dossiers, read the corresponding section in [docs/repository-reference.md](docs/repository-reference.md). Those instructions remain part of this repository guide.

## Submissions, moderation, and hotline

Possible submissions include suspicious-activity reports, Panther sightings, evidence, game tips, funny observations, corrections, and story suggestions. Treat all submissions as untrusted content.

Required submission workflow:

**Public submission → private storage → human review → approval → published content.**

Never allow random users to publish directly to the public site. Validate types, sizes, lengths, and allowed fields; render text safely and sanitize any supported rich content. Validate uploaded files and URLs. Do not insert untrusted markup with `innerHTML`. Collect only necessary information, keep submitter identity private by default, and reject abusive material or game-rule violations. Human review must include privacy and photo suitability, not just spelling.

GitHub Pages does not provide private submission storage. Tally is the selected provider. The site has a `/tips/` page, linked from homepage and case navigation, that stays explicitly unconfigured while `data/tip-line.json` has an empty `formUrl`. Set it to the published `https://tally.so/r/FORM_ID` link and run `node scripts/generate-tips.mjs`; commit the generated tips page. Edit page copy outside the generated markers normally, and edit `renderTipForm` for embed markup. The configured page uses Tally's official widget for dynamic height and provides a direct-form fallback. It never handles uploads itself or automatically publishes submissions. No API keys are needed. The widget is an external script limited to this page and may forward URL parameters; never put private data in those parameters. See README for the exact Tally fields, 5-file/10-MB limits, consent choices, moderation workflow, and manual activation checklist. End-to-end uploads require testing against the owner's real published form. Never put service secrets, raw reports, private contact details, or moderation records in public assets or client code.

The Corrections Desk (`/corrections/`) takes factual corrections and replies from any team named in a case, through its own private Tally form or `clueso@purrpetrators.net`. It follows the same rule as tips: private review first, publication only with the submitter's permission, no private details. The form deliberately lists no specific cases or editions.

The user-provided public **PNN Hotline** is **+1 (801) 79-PRANK**, numerically **+1 (801) 797-7265**. All call links must use `tel:+18017977265`; preserve the vanity spelling in visible branding and show numeric dialing instructions on the Tip Line page. It serves Inspector Clueso's office at PNN. Include it in reporting callouts and site footers, including the case generator so regeneration preserves it. The site provides click-to-call only; do not claim SMS, call recording, voicemail configuration, round-the-clock staffing, or anonymous calling without confirmation. The Tally form remains the route for file uploads. Encourage game-related reports, never harassment or private information about uninvolved people.

## Newsletter, QR pages, and fictional notices

Edit `data/newsletters/<id>.json` and run `npm run build`; use `npm run new-edition -- 002` to scaffold a draft without overwriting existing source. Editions are built to `dist/newsletter/<id>/index.html` by `src/email/newsletter.js` from the shell `src/email/newsletter.html`; nothing is hand-edited. Drafts are omitted from the `/newsletter/` listing but remain public files; samples and published editions are listed. Keep the PNN Newsletter name and at most one featured case. The shared template supplies the logo, Dispatch button, hidden preheader, and EmailOctopus `{{SenderInfoLine}}`, `{{UnsubscribeURL}}`, and `{{RewardsURL}}` tags. No scripts/analytics or separate `.txt` files belong in email editions; EmailOctopus generates plain text (`tests/robots.test.mjs` enforces the no-script rule on the built email). Preserve old edition URLs. Non-draft editions require an ISO `date` with offset, which becomes the `/feed.xml` item date. Import the built file into EmailOctopus (download the `dist/` artifact from the workflow, or run `npm run build` locally); see README.

**Established edition format, effective with edition 001:** `featuredCase`, when present, always renders first as a short, funny, spoiler-light hint toward the latest published case, not a full recap. `sections` then supplies the main feature: a hilarious, exaggerated PNN article in the mock-institute voice with comedy statistics where useful. The template automatically appends the fixed Dispatch/Tip Line ending; never duplicate that in `sections`. Treat unlabeled or purely numbered reference assets (for example `resources`) as tone/content inspiration only, never publishable or embeddable material, especially if third-party trademarked characters appear.

New subscribers are collected by EmailOctopus directly; this repo only stores the public embed-form script URL in `data/newsletter-subscribe.json` (`embedSrc`), rendered via `node scripts/generate-newsletter-subscribe.mjs` as EmailOctopus's official `<script data-form>` embed plus a noscript Tip Line fallback. See README for setup.

Before editing newsletters, printable fliers/cards, QR assets, dispatch, or the unlisted resources page, read the corresponding section in [docs/repository-reference.md](docs/repository-reference.md). Preserve permanent printed URLs, fictional game context, and the resources page's lack of incoming site links.

## Shared site chrome

Every website page except the print-only pages (`tips/flier.html`, `resources/cards.html`, `resources/pranked.html`, which use `PrintLayout`) and the email editions under `newsletter/<id>/` shares one masthead, one news ticker, and one footer through `SiteLayout` (`src/components/layout/`: `Header`, `Ticker`, `Footer`). Change chrome markup there, never per page. The current nav section is set with `current` on `SiteLayout` and rendered with `aria-current`. Mobile rules: the five-link nav is a balanced 3 + 2 grid below 1200px (never a lone orphan link), the countdown stays on one row of four boxes, and no page may scroll horizontally from 320 px up.

## Search-engine privacy

The site is meant for the game, not for search results. `robots.txt` disallows all crawlers (plus named AI and archive bots), and every HTML page, including the email template, carries `<meta name="robots" content="noindex, nofollow, noarchive">`. Both are requests that well-behaved crawlers honor, not access control. Google Analytics and other client-side scripts are unaffected. New pages must go through `Document` (which emits the meta tag); `npm test` (`tests/robots.test.mjs`) fails if any built HTML page lacks it. Caveat: if a crawler ever lists a bare URL because the page was linked publicly, remove the `Disallow: /` rule temporarily so the crawler can fetch the pages and see `noindex`.

## Hosting and URL handling

Before hosting, deployment, or URL-path changes, read the corresponding section in [docs/repository-reference.md](docs/repository-reference.md). Those instructions remain part of this repository guide.

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

Use `npm run dev` for editing, and `npm run preview` after `npm run build` to check the built output, including a real nested 404 (it serves `404.html` for missing URLs as GitHub Pages does). Verify the first deployment on GitHub Pages when deployment work is authorized.

For visual or behavioral changes, check desktop and narrow mobile widths, including around the existing breakpoints; look for clipping and horizontal overflow. Test keyboard access and the skip link, reduced motion, no-JavaScript usability where applicable, console errors, missing assets, links, and any changed content-loading behavior. Check custom-domain and repository-subpath URL assumptions when paths change. Validate changed JSON/SVG syntax and use `git diff --check` for whitespace issues. Dispatch behavior has targeted tests using the built-in Node test runner; do not add a test framework for a documentation-only or simple cosmetic change.

Keep this guide free of secrets, credentials, private personal information, and machine-specific configuration. Document actual implementation separately from proposals so future agents can extend the PNN universe without inventing infrastructure or compromising the neighborhood game.
