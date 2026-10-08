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

Make cases funny enough to be worth reading. Friendly embarrassment over game behavior is welcome: bad timing, overconfidence, an elaborate plan defeated by a simple instruction, and trying too hard to recover from an earlier blunder. Treat teams as willing players in the joke. The boundaries above concern personal humiliation and real-world harm, not a pointed roast of an approved game incident. Do not flatten harmless rivalry into cautious corporate copy.

Build a comic narrative from confirmed events. Use a setup, an escalating contrast, and a short payoff. Call back to earlier cases when relevant and link to them through `relatedCaseIds`. For example: last to announce a name, then so eager to recover that the bribes arrive before permission; the comeback earns another trip with treats. Frame invented motives as PNN theories, not facts or participant admissions. Keep Clueso's pink-team fixation as a quick comic aside when the actual story concerns another team.

Public copy should sound like PNN reporting, not an evidence audit or implementation note. Do not interrupt a joke with unsolicited remarks such as "the treats are not pictured," "no evidence supplied connects the pink team," or a list of penalties nobody claimed. Describe the actual artifact accurately, retain necessary reconstruction labels and standalone game context, and quote organizer instructions faithfully. Keep technical limitations and editorial verification in authoring notes or the work summary when needed. Captions can be punch lines: "The paperwork was ready. The witches were not."

## Current implementation

The project is plain HTML, CSS, and browser JavaScript, with a dependency-free Node.js authoring script that generates committed case HTML from JSON. There is no framework, package manifest, dependency installation, deployment build step, general test framework, CI workflow, database, backend, analytics, cookies, external font, or site-owned submission backend. Tally is selected for the Tip Line; the public form URL is configured; live availability depends on deploying the generated tips page. Do not invent npm commands or assume a router exists. The current site works without browser JavaScript.

| Path | Current responsibility |
| --- | --- |
| `index.html` | Live newsroom homepage: masthead, PNN introduction, generated latest case feature, team introduction, footer |
| `404.html` | “Signal Lost” error page with `noindex`, home links, and deployment-aware asset base |
| `assets/css/styles.css` | Shared design tokens, layout, typography, responsive rules, focus and reduced-motion styles |
| `scripts/main.js` | Legacy launch-status animation; no longer loaded by the homepage |
| `tips/index.html` | Tip Line page with a generated Tally embed or honest unconfigured state |
| `tips/flier.html`, `assets/css/flier.css` | Printable letter-size Tip Line flier with a 5.4-inch QR image, large hotline number, and screen-only print controls |
| `resources/cards.html`, `assets/css/cards.css` | 30 printable windshield cards, three letter-size sheets of ten, with unexplained dispatch QR codes |
| `resources/pranked.html`, `assets/css/pranked.css` | Letter-size You've Been Prowled leave-behind with dispatch QR for completed game pranks |
| `resources/index.html` | Unlisted print-resource page linking to the flier and both QR SVGs; no incoming site links, `noindex, nofollow`, no authentication |
| `data/tip-line.json` | Public Tally respondent URL; currently https://tally.so/r/ODWPok |
| `scripts/generate-tips.mjs` | Validates the Tally URL and updates only the marked form region |
| `scripts/generate-cases.mjs` | Node.js authoring command: reads case/team JSON and generates escaped static HTML |
| `cases/index.html`, `cases/001/index.html`, `cases/002/index.html`, `cases/003/index.html` | Generated archive, PNN-001 name reveal, PNN-002 early witch bribe, and PNN-003 dog-walking report |
| `assets/evidence/001/` | PNN-001 media: `black-webb-bandits-panther-reconstruction.mp4` and extracted `black-webb-bandits-panther-reconstruction-poster.jpg` |
| `assets/evidence/002/` | PNN-002 supplied image: `black-webb-bandits-witch-flier.png` |
| `assets/evidence/003/` | AI-generated Operation Loose End comic reconstruction for PNN-003 |
| `assets/evidence/unassigned/` | Supplied media not yet assigned to a case: green/silver videos and red image |
| `assets/images/pnn.svg` | Custom connected PNN lettering, magenta strokes with white inset lines; used in both headers and homepage hero |
| `assets/images/pnn.png` | Transparent 900 × 330 PNG export of the PNN SVG for email mastheads |
| `assets/images/logo.png` | Supplied team artwork, 600 × 516 |
| `assets/images/construction.png` | Existing 1536 × 1024 illustration reused for the newsletter's first-edition placeholder |
| `assets/images/favicon.png` | Supplied feline favicon currently linked by both HTML pages |
| `assets/images/favicon.svg` | Alternate geometric feline icon; currently not linked |
| `assets/images/teams/` | Supplied color-named team logos referenced by `data/teams.json`; case pages display the subject team's logo |
| `assets/images/evidence/` | Legacy empty placeholder; use `assets/evidence/` for new case media |
| `assets/qr/` | Pink dispatch and tips QR SVGs with centered, circle-outlined paws; dispatch PNG derivative for email |
| `assets/downloads/` | Future approved newsletter PDFs |
| `newsletter/index.html` | Newsletter landing page linking to the first HTML email sample; delivery not connected |
| `newsletter/sample-001.html`, `newsletter/sample-001.txt` | Provider-neutral first email sample and plain-text alternative; not sent |
| `dispatch/index.html`, `scripts/dispatch.js` | Permanent QR destination that selects a published case on each visit |
| `scripts/dispatch.test.mjs` | Dependency-free Node tests for dispatch selection and fallback behavior |
| `data/teams.json` | Seven confirmed teams with stable color IDs/slugs, names, colors, logo paths, and an own-team flag |
| `data/stories.json` | Empty array; no story loader or schema yet |
| `data/cases.json` | Structured case records: PNN-001/002 concerning the black team and PNN-003 concerning the white team |
| `pages/` | Empty placeholder for future content pages |
| `CNAME` | Contains `purrpetrators.net` |
| `.nojekyll` | Keeps static deployment from requiring Jekyll processing |
| `README.md` | Local preview and intended GitHub Pages deployment instructions |
| `.gitignore` | Excludes `.idea/`, `.DS_Store`, `Thumbs.db`, and `node_modules/` |

Placeholder directories contain `.gitkeep`. Local `.idea/` files are editor metadata, not application configuration; do not copy their machine-specific details into documentation or commits.

### Existing behavior to preserve

- The site-wide construction notice, launch-status panel, and launch script have been removed from the homepage. The newsletter section and page now link to the first email sample; the landing page retains its construction illustration. The retained `scripts/main.js` is unused legacy code, not a current feature.
- The site pages have skip links, semantic main content, visible keyboard focus, and accessible home-link names. The repeated hero logo is decorative; meaningful images have alt text and explicit dimensions.
- The latest case's poster receives fetch priority; the lower team image is lazy-loaded. Evidence videos have controls and a poster with no autoplay. Preserve image aspect ratios and avoid unintentionally cropping supplied artwork.
- The homepage has canonical-domain Open Graph URL/title/description metadata but no `og:image`. Only add that property when a real share image is available, using an absolute URL.

## Visual direction and assets

Before design or asset work, read the corresponding section in [docs/repository-reference.md](docs/repository-reference.md). Those instructions remain part of this repository guide.

## Future site and content architecture

`data/teams.json` is the source of truth for the seven user-confirmed team names and their logos in `assets/images/teams/`. Use its names rather than transcribing artwork (the green team's canonical name is **Area 51 Bureau**). Each record has required string fields `id`, `slug`, `name`, `color`, and `logo`, plus boolean `isOurTeam`. IDs and slugs are unique lowercase color names; `color` is the display label. Logo paths are relative to the repository/site root, without a leading slash; resolve them against the deployment base when rendering nested pages. Exactly one record, `pink` / Prowling Purrpetrators, has `isOurTeam: true`. Team data is consumed by the static case generator; there is no browser data loader. Preserve exact asset extensions and do not infer members or incidents from illustrations. Supplied Halloween imagery and slogans do not override the game-safety and copy rules above.

Potential areas include Breaking News, Team Reports, PNN Investigations, Suspected Motives, Evidence, Team Dossiers, Tip Line, Newsletter, Alerts, About PNN, and special QR landing pages. The homepage, error page, case index, first case, Tip Line, newsletter, and dispatch pages currently exist; add other areas only when requested.

### Current case authoring contract

Edit `data/cases.json` and run `node scripts/generate-cases.mjs` (validated with Node 24; no npm packages). Commit the generated case HTML and updated homepage so GitHub Pages needs no build command. Do not hand-edit generated case files or the homepage region between `BEGIN GENERATED FEATURED CASE` and `END GENERATED FEATURED CASE`; the newest published case supplies that region. Shared markup belongs in the generator and shared styles in `assets/css/styles.css`. The generator resolves the subject team's name, color, and logo from `data/teams.json` via `suspectTeamId` and displays a subject-team panel above the evidence. Do not duplicate team branding in case records. There is no browser JSON loader.

Case records use a unique three-digit string `id`, matching `caseNumber` (`PNN-001`), ISO `dateOpened` with offset, IANA `timeZone`, `status`, `suspectTeamId`, `incidentTitle`, `summary`, `incidentDescription`, `suspectedMotive`, `evidence`, `investigatorNote`, `threatLevel`, `disposition`, `relatedStoryIds`, and boolean `published`. The first timestamp is `2026-10-04T19:21:00-06:00`, America/Denver. Evidence supports video records with `id`, `type: "video"`, site-root-relative MP4 `src`, local `poster` (JPEG/PNG/WebP), `label`, `description`, and `caption`. Store assigned media under `assets/evidence/<case-id>/` and unassigned media under `assets/evidence/unassigned/`; move media and update references when assigning it. The former `assets/spotlights/` folder has been retired. The still preview is an extracted frame. Use controls and no autoplay, provide descriptive text, and clearly identify fictional reconstruction footage.

Image evidence uses `type: "image"`, `id`, `src` (local PNG/JPEG/WebP), `width` and `height` (positive integer intrinsic dimensions), nonempty `alt`, `label`, `description`, and `caption`. It renders uncropped with a direct-image link and is labeled supplied game material unless optional boolean `reconstruction: true` labels it PNN reconstruction. Generated illustrations must use that flag and clearly identify invented details in their captions and artwork. The homepage uses the first image or video poster with matching dimensions and a media-appropriate link label. An optional `organizerNotice` has nonempty `attribution`, `timeLabel`, and a nonempty array of plain-text `paragraphs`; it renders as an escaped blockquote with paragraph and line breaks. Keep quoted organizer instructions distinct from comic interpretation. PNN-002 records the supplied reminder: wait for instructions before bribing; early bribes receive NO and must be repeated after the announcement. No point deduction was stated. The user confirmed that the incident and reminder occurred October 6, 2026; PNN-002 uses the reminder time, `2026-10-06T20:28:00-06:00`, America/Denver.

Written evidence uses `type: "report"` with nonempty `id`, `label`, `description`, and `caption`, with no media path required. It renders as escaped witness-report text. Summarize approved accounts without identifying private households or submitters; distinguish witness impressions from PNN theories. The homepage uses the first image/video when present, or a text-only feature and witness-report link when none exists. PNN-003 uses the supplied dog-walking account about the Tightie Whities. Its opening timestamp records creation of the case, not the encounter time; the incident date is not yet confirmed.

Optional `relatedCaseIds` is an array of unique existing case IDs, excluding the current case. The generator validates references and links only published related cases, deriving their title and case number from the source records. Use it for callbacks rather than putting HTML or duplicate case titles in JSON.

The generator validates required text, IDs, team references, and media paths, escapes text, and produces `/cases/` and `/cases/<id>/` with relative assets and explicit `index.html` links. Preserve these routes for QR use. Only published cases enter the listing; changing the flag does not delete old generated pages or hide JSON. Explicitly replace a withdrawn case page with an appropriate notice rather than leaving stale content or breaking printed URLs.

Favor static, content-driven implementation with one source of truth, stable IDs, consistent schemas, and reusable rendering. Keep content separate from presentation. Avoid copying story metadata into multiple independently maintained pages. Introduce only the components or templates needed by an actual feature; do not install a framework merely to prepare for possibilities.

Use the Clueso editorial bias above when writing new cases, while preserving the approved facts at each stage.

The homepage introduction, reporting callouts, case archive introduction, and PNN-001 investigator note use this perspective. The Tip Line invites all teams to contribute to Clueso's fictional investigation while continuing to welcome other game reports and corrections. The separately managed Tally form copy is unchanged by these website edits.

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

The user-provided public **PNN Hotline** is **+1 (801) 79-PRANK**, numerically **+1 (801) 797-7265**. All call links must use `tel:+18017977265`; preserve the vanity spelling in visible branding and show numeric dialing instructions on the Tip Line page. It serves Inspector Clueso's office at PNN. Include it in reporting callouts and site footers, including the case generator so regeneration preserves it. The site provides click-to-call only; do not claim SMS, call recording, voicemail configuration, round-the-clock staffing, or anonymous calling without confirmation. The Tally form remains the route for file uploads. Encourage game-related reports, never harassment or private information about uninvolved people.

## Newsletter, QR pages, and fictional notices

Before editing newsletters, printable fliers/cards, QR assets, dispatch, or the unlisted resources page, read the corresponding section in [docs/repository-reference.md](docs/repository-reference.md). Preserve permanent printed URLs, fictional game context, and the resources page's lack of incoming site links.

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

Then visit `http://localhost:8080/` and `http://localhost:8080/404.html`. Use HTTP when testing future JSON fetching. Python's simple server does not automatically serve the custom `404.html` for missing URLs; verify real nested 404 behavior separately on GitHub Pages when deployment work is authorized.

For visual or behavioral changes, check desktop and narrow mobile widths, including around the existing breakpoints; look for clipping and horizontal overflow. Test keyboard access and the skip link, reduced motion, no-JavaScript usability where applicable, console errors, missing assets, links, and any changed content-loading behavior. Check custom-domain and repository-subpath URL assumptions when paths change. Validate changed JSON/SVG syntax and use `git diff --check` for whitespace issues. Dispatch behavior has targeted tests using the built-in Node test runner; do not add a test framework for a documentation-only or simple cosmetic change.

Keep this guide free of secrets, credentials, private personal information, and machine-specific configuration. Document actual implementation separately from proposals so future agents can extend the PNN universe without inventing infrastructure or compromising the neighborhood game.
