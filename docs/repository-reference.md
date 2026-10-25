# PNN supporting repository guidance

These sections supplement the root [AGENTS.md](../AGENTS.md). Follow them for the relevant task; current implementation and editorial rules remain in the root guide.

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

### Suggested data conventions when the first content feature is built

The story fields and team dossier extensions below are proposed conventions; the current team and case contracts are documented above. Establish and document additional required fields, defaults, status values, and validation with their first implementation. Keep JSON valid, use stable string IDs, use ISO-formatted dates, and reference related records by ID rather than duplicating them. Choose slugs that can remain stable after headlines change.

| Collection | Suggested fields |
| --- | --- |
| Stories | `id`, `slug`, `date`, `headline`, `shortHeadline`, `teamId`, `category`, `summary`, `incident`, `suspectedMotive`, `evidence`, `assessment`, `threatLevel`, `image`, `relatedCaseId`, `published`, `featured`, `tags` |
| Team dossier extensions | approved `photo`, fictional `aliases`, `charges`, `strengths`, `weaknesses`, `threatRating`, `notableStoryIds`, submitted `quotes` |

Use a consistent human-readable case-number format, for example `PNN-042`, once selected. Cases and “threat” labels describe playful game fiction, never real criminal or safety judgments. Evidence can use structured entries with an asset path, alt text, caption, and type as needed. Do not fabricate rival teams or seed invented incidents as published facts.

Team dossiers may include intentionally supplied game photos, fictional aliases/charges, playful strengths and weaknesses, approved incidents, and submitted humorous quotes. Exclude addresses, phone numbers, private contacts, sensitive information, and personal details unrelated to the competition.

`data/alerts.json` and `data/newsletter.json` are possible additions, not existing files. Do not store confidential drafts or raw submissions in deployed JSON: a `published: false` flag controls presentation, not access to a public file or repository.

## Hosting and URL handling

The intended setup is a Namecheap-managed domain with DNS pointing to GitHub Pages for `JonathanFowlke/Purrpetrators`. The repository's `origin` matches that repository. `CNAME` records the domain but does not configure DNS or prove that the live deployment is active. Hosting settings and DNS were not verified by repository inspection.

The site is built by `.github/workflows/deploy.yml` (React + Vite prerender into `dist/`) and deployed with GitHub's Pages actions, so the repository's Pages **Source** must be **GitHub Actions**. Keep `public/CNAME`, static assets, relative links, and custom-domain compatibility. Do not introduce a persistent server, database, paid hosting, or complex build infrastructure without a requirement that justifies it.

- Pages compute relative asset and link paths from their output location (`src/lib/site.jsx`).
- `404.html` injects a `<base>` before loading assets: `/` on the custom domain, or the first path segment on a `*.github.io` project site. It skips this behavior for `file:` previews.
- That base logic assumes a GitHub project site, not a `username.github.io` root site; the latter requires `/`. Other subdirectory hosting needs its actual deployment prefix. Preserve nested-error-page asset and home-link behavior when editing it.
- GitHub Pages paths are case-sensitive. Use exact filenames and verify links from each page depth.
- Do not change domain configuration, publish, or add integrations merely because this guide describes them.

## Newsletter, QR pages, and fictional notices

The Tip Line links to `tips/flier.html`, a one-sheet letter portrait flier using `assets/qr/pnn-tips-qr.svg`. Its print stylesheet sets half-inch page margins and hides the screen controls. Preserve the large QR, readable numeric hotline plus vanity spelling, and standalone Broomstick Challenge fictional context. Print at 100% with browser headers/footers disabled; verify the actual print scans before distribution. The page works without JavaScript through the browser's Print command.

`/resources/` is a deliberately unlisted public page for the flier, QR SVG viewing/download links, and printable windshield cards. Do not link to it from other site pages or navigation. It has `noindex, nofollow`, but knowing its URL is not authentication or access control; keep all contents suitable for public viewing. Add card links only when actual approved files exist.

The stable `/newsletter/` page lists numbered editions built from `data/newsletters/<id>.json` by `npm run build`; `npm run new-edition -- 002` scaffolds a draft. Shared markup lives in `src/email/newsletter.html` and `src/email/newsletter.js`. Edition 001 is now `published` at `newsletter/001/index.html`, not a sample. No separate plain-text file is maintained because EmailOctopus generates that alternative. Emails include the three required EmailOctopus footer tags and no website scripts/analytics. They use presentation tables, inline core styles, system fonts, absolute HTTPS links, and PNG/JPEG imagery. Keep copy readable with images blocked and without media queries or JavaScript. **Click-through levers (the newsletter exists to send readers to the site):** the featured-case link is a button with an automatic "N exhibits on file" line (optional `featuredCase.hook` adds a few words), sections may contain `{type: "cta", label, href, note?}` button blocks, and text runs may carry `href` for inline links. Links and buttons may only point at `https://purrpetrators.net/<path>` (no query strings or other hosts; enforced by `validateNewsletter`). **Tracking and images:** every site link in the built email gets `?utm_source=newsletter&utm_medium=email&utm_campaign=edition-<id>&utm_content=<placement>` automatically (authors write clean URLs; JSON never carries UTM). Placements: `logo`, `featured-image`, `featured-button`, `s<section>-button`, `s<section>-link`, `footer-dispatch`, `footer-tips`, `footer-corrections`. The site's Google tag records them as campaign traffic; EmailOctopus reports its own click counts, and security scanners can inflate clicks, so compare the two before trusting a spike. An edition may set `featuredCase.image` (`src` under `assets/email/`, `width`, `height`, `alt`, `caption`) to show a linked thumbnail; make a small JPEG copy (about 1056 px wide, under about 250 KB) of an approved image, never the full evidence file, show no recognizable real people, and state AI reconstructions in the caption. The footer is one Dispatch button, the Tip Line, the Corrections link, the hotline, and the review notice; do not add more competing links. **Experiments:** change one thing per edition and read the `utm_content` split in Google Analytics plus the EmailOctopus click report: teaser length, button label, subject line, and whether the image is present. Vendor claims (button lifts, curiosity-gap gains) are directional; the only controlled test found showed a higher placement and a larger button did not help, so measure before keeping a change. Keep one primary destination per edition (usually the featured case), repeat it as a button after the main feature and near the end, tease rather than summarize the evidence, and say in the `note` that the exhibits live on the site. Draft status hides listing links, not files. Keep the neutral **PNN Newsletter** name and preserve edition URLs. See README for schema and import instructions. Future approved PDFs belong under `public/assets/downloads/`; only link files that exist.

**Established edition format:** every edition opens with the optional `featuredCase` block, rendered first as a short, funny, spoiler-light hint toward the latest published case (not a full case summary) — the generator resolves its case title/number from case data and renders it as the opening headline. The `sections` array supplies the main feature next: a hilarious, exaggerated PNN article in the established mock-institute voice, with invented/comedy statistics where useful. The template then automatically appends the fixed PNN Dispatch and Tip Line/hotline closing block; do not duplicate dispatch or tip-line content inside `sections`. Edition 001's main feature (Go Big or Go Haunt / Pink Advantage spoof science / mascot confidence) was drafted using the supplied numbered reference assets in `unassigned-evidence/` (`6587989890773275282.jpg.jpeg`, `9209352435477332460.png`, `20261007_154710.pdf`) purely as tone/content inspiration. Those three files depict a third-party trademarked cartoon character and a fake research-institute mockup; they are reference material only and must never be embedded, linked, or published on the site or in emails. Future numbered/unlabeled reference assets should be treated the same way unless the user explicitly confirms they are approved game material for publication.

The newsletter sign-up embed lives in `data/newsletter-subscribe.json` (`embedSrc`, empty by default) and renders on `/newsletter/` at build time (`NewsletterIndexPage`). It uses EmailOctopus's official JavaScript form embed (`<script data-form>` from a sharded `eomailN.com` domain), which EmailOctopus's dashboard supplies per form; `src/lib/embeds.js` validates the URL shape and rebuilds the script tag itself rather than trusting pasted HTML, and adds a `<noscript>` fallback pointing to the Tip Line. This is currently the only part of the site that requires browser JavaScript to function. See README for the setup steps.

The printed QR destination is **https://purrpetrators.net/dispatch/**. Keep that path permanent and use PNN Dispatch wording; do not rename it to `random-case`. The printable dispatch SVG lives at `assets/qr/pnn-dispatch-qr.svg`. The redirect script fetches current case JSON without cache, randomly selects among unique valid IDs with `published: true`, and uses `location.replace` to avoid Back-button redirect loops. New cases become eligible when the data and generated case pages are deployed together; no QR regeneration is needed. Repeats are allowed. Empty, invalid, or unavailable collections and disabled JavaScript retain an archive link. The selection tests use `node --test scripts/dispatch.test.mjs`. Dispatch selection adds no persistent tracking or external redirect infrastructure; website pages separately include the Google Analytics tag documented in README.

The newsletter may be named **Purrpetrator News** or **Purrpetrator Post**; the final name is undecided. It can reuse approved website stories, investigations, motives, corrections, alerts, photos, selected tips, absurd statistics, mock classifieds, and clearly fictional, friendly “most wanted” game material. Keep the same PNN voice and avoid maintaining conflicting copies of the underlying content. `assets/downloads/` is available for future editions.


Themed print assets are `assets/qr/pnn-dispatch-qr.svg` and `assets/qr/pnn-tips-qr.svg`, encoding the permanent `https://purrpetrators.net/dispatch/` and `https://purrpetrators.net/tips/` URLs. They are square QR-only artwork: dark magenta modules on white with an enlarged original pink feline paw inside a magenta circle on a central white inset, without surrounding labels or frames. High error correction and an unobstructed four-module quiet zone are retained. Keep the central inset small enough to preserve scan reliability. Preserve the code geometry and quiet zone when editing artwork; independently decode the rendered result and test the final printed size on a phone. The SVGs are the canonical QR artwork. `assets/qr/pnn-dispatch-qr.png` is a 900 x 900 email derivative of the dispatch SVG, displayed at 225 x 225 in the sample. It preserves the paw and quiet zone and was independently decoded at both sizes. Re-render and decode it if the source changes. Plain variants remain retired.

Printed QR codes may link to stories, cases, team dossiers, tips, the hotline, notices, editions, or temporary announcements. Candidate paths include `/news`, `/cases/042`, `/teams/blue`, `/hotline`, `/report`, `/alert`, and `/purrpetrator-post`; **these routes do not currently exist**.

Use stable, memorable destinations and keep them working after printing. Change content behind a URL instead of renaming it; retain an appropriate landing page or static redirect if a destination moves. A root directory with `index.html` can support a clean GitHub Pages path; the existing `pages/` directory is also available for explicit static page URLs. Resolve this deliberately when adding a route. Do not assume server rewrites or an SPA fallback. Test the exact URL, including directory/trailing-slash behavior, before printing. QR destinations must not trigger third-party actions involving a target's personal information.

Removable vehicle prank cards may say “PNN Surveillance Notice,” “Purrpetrator Citation,” “Prowling Violation,” “Security Audit Failed,” “Vehicle Compromised,” “Person of Interest,” or “You've Been Prowled.” These are theatrical labels only. Cards for participating teams' street-parked vehicles must be non-damaging, removable, obviously fictional once read, unlike real legal citations, and placed without obstructing visibility. Avoid adhesives on paint or glass unless explicitly safe and appropriate. QR-linked case pages must preserve that fictional context and must not expose vehicle owners' private information.

### Windshield card printing

`resources/cards.html` contains 30 static cards in three US Letter portrait sheets of ten (two columns, five rows), styled by `assets/css/cards.css`. Each card is standard business-card size, 3.5 by 2 inches within half-inch page margins. Print at 100%, one-sided, without browser headers/footers; cut on dotted borders. Sheet 1 contains parking roasts and compliments; sheet 2 has compliments and neighborhood notices; sheet 3 has neighborhood notices followed by six almost-pranked jokes for participating teams. Every card has standalone fictional Broomstick Challenge context and the existing dispatch QR SVG, with no visible caption or explanation of its destination: the scan is a surprise. Preserve the QR quiet zone. The resources index links to the cards; do not add a backlink from cards or any other page to the unlisted resources index.

### Prank leave-behind flier

`resources/pranked.html` is a letter portrait flier for a completed prank on a participating team, linked only from the resources index. It uses the shared flier print rules plus `assets/css/pranked.css`, the PNN SVG logo, and the dispatch QR. The archival boast is playful editorial intent, not automatic publication or a claim that a case already exists; actual publication still requires approval. Preserve the standalone Broomstick Challenge context and keep the roasting about the game outcome. Print at 100% with browser headers/footers disabled.

## Case comedy and roasting checklist

Cases must embarrass **every team involved**, the pranker and the victim, at the level of PNN-004 or higher. Run this checklist on every new or revised case before finishing, and again after any user request for more or less roasting.

1. **Both teams get roasted, except pink.** The Prowling Purrpetrators are our team: never roast them; make them look good in clever, funny ways, often by setting up a roast and turning it into praise ("Charges: excellence"), with Clueso's failure to catch them as the one allowed joke. For every other team: The pranker's overreach, branding, or gap between boast and delivery is a target. The victim's theme, reputation, or predicament is a target. Neither team gets a pass for being the "winner."
2. **Puns tied to the real artifact.** Build jokes from the team's name and theme plus the actual evidence. PNN-004: a fire-themed team that delivered balloons became "hot air" and "a Five-Alarm Party Store Run"; a secrets-themed team with decorated garbage cans was "outed by its own recycling," "Unidentified Flaming Objects, identified," and "bin there, done that." Aim for several distinct puns per case, not one.
3. **Escalate.** Each paragraph should be more absurd than the last: setup, a contrast with the team's own self-image, a ridiculous PNN theory, then a short payoff.
4. **Every section lands a joke.** Headline, summary, incident description, suspected motive, each exhibit label/description/caption, investigator note, threat level, and disposition. Captions and the disposition end on punch lines.
5. **Mock-official deadpan.** Absurd administrative seriousness, invented classifications (for example "Medium rare, mostly hot air"), and "pending appeal" style rulings. Quote the team's own statement when it supplies the joke.
6. **Clueso aside.** One quick line of his pink-team fixation, never a replacement for the actual story.
7. **Stay in bounds.** Joke about the prank, themes, props, boasts, and fictional motives. Not bodies or appearance, families, money, relationships, health, religion, or private matters. No real fire advice or encouragement: if a theme involves fire, joke that the flames were decorative and that the game does not include fire. Identifiable faces stay out of evidence unless intentionally supplied for publication; use bins, props, and artwork instead.
8. **Facts stay faithful.** Dates, who did what, and quoted statements come from approved material. Roast the interpretation, not invented claims. Incident dates go in the description in absolute form (for example "On the night of October 8, 2026"); `dateOpened` records when PNN opened the case.
9. **Format for reading.** Use the prose markup, not walls of text: **bold** beats and punch lines, *italic* asides, `- ` bullet lists for timelines, suspects, theories, and findings, and a `> ` quote block for a short key statement. Do not nest emphasis (`**a *b* c**` does not parse).
10. **Self-check.** If a team could read the case and not wince happily, sharpen it. A toothless draft is not finished.

## File inventory

Moved from `AGENTS.md`. Page paths are public URLs produced by `src/routes.jsx`. Where a row names `scripts/generate-*.mjs`, `BEGIN/END GENERATED` regions, or `scripts/<client>.js`, read it as the matching React component under `src/components/` (see AGENTS.md, Source layout) and `public/scripts/<client>.js`; assets are under `public/assets/`.

| Path | Current responsibility |
| --- | --- |
| `index.html` | Live newsroom homepage: masthead, PNN introduction, generated latest case feature, team introduction, footer |
| `feed.xml` | Single RSS 2.0 feed (`src/lib/feed.js`): published cases (`dateOpened`) and published newsletter editions (`date`), summaries only, newest first. Advertised by a `<link rel="alternate">` in every page head and an "RSS feed" footer link. Permanent URL |
| `404.html` | “Signal Lost” error page with `noindex`, home links, and deployment-aware asset base |
| `assets/css/styles.css` | Shared design tokens, layout, typography, responsive rules, focus and reduced-motion styles |
| `tips/index.html` | Tip Line page with a generated Tally embed or honest unconfigured state |
| `corrections/index.html` | Corrections Desk: hand-written page embedding the Tally form `dWLPKV` (https://tally.so/r/dWLPKV) plus the `clueso@purrpetrators.net` email option; linked from the main nav, tips page, case callouts, and newsletter footer. Mailbox/forwarding for that address is configured outside this repo and must be confirmed before launch. |
| `tips/flier.html`, `assets/css/flier.css` | Printable letter-size Tip Line flier with a 5.4-inch QR image, large hotline number, and screen-only print controls |
| `resources/cards.html`, `assets/css/cards.css` | 30 printable windshield cards, three letter-size sheets of ten, with unexplained dispatch QR codes |
| `resources/pranked.html`, `assets/css/pranked.css` | Letter-size You've Been Prowled leave-behind with dispatch QR for completed game pranks |
| `resources/index.html` | Unlisted print-resource page linking to the flier and both QR SVGs; no incoming site links, `noindex, nofollow`, no authentication |
| `data/tip-line.json` | Public Tally respondent URL; currently https://tally.so/r/ODWPok |
| `scripts/generate-tips.mjs` | Validates the Tally URL and updates only the marked form region |
| `scripts/generate-cases.mjs` | Node.js authoring command: reads case/team JSON and generates escaped static HTML, plus the homepage featured case and the Catnip & Hairball Index |
| `data/news-ticker.json`, `scripts/ticker.js`, `scripts/ticker.test.mjs` | Pool of 100+ fictional `{tag, text}` headlines for the "PNN LIVE" ticker under the masthead of the homepage and generated case pages. The generator renders a static ticker (live case headlines, an index-standings line, and a sample of pool items) between `BEGIN/END GENERATED TICKER` on the homepage and in `page()`; `ticker.js` fetches the pool, mixes in a random sample on each visit, scrolls it, and adds a pause button (hidden without JS; no animation under `prefers-reduced-motion`). Headlines must stay obviously fictional, make no claims about real people or real organizations, invent no point values or dates, and claim no hotline staffing, recording, or SMS. **Where headlines live:** `data/news-ticker.json` holds only generic items. A headline about one case or newsletter edition belongs in that record's optional `tickerItems` array (`{tag, text}`, text up to 170 characters, unique across all ticker data); each published case needs at least 3 and each non-draft edition at least 2, enforced by `validateRawData`. `mergeTickerPool` in `src/lib/model.js` builds the static ticker from the generic pool plus published cases and non-draft editions, and `ticker.js` rebuilds the same pool in the browser from the files listed in the track's `data-more-src` (`cases.json`, then each `data/newsletters/<id>.json`; any that fail to load are skipped). Unpublished cases and draft editions contribute nothing, and the email HTML never renders `tickerItems`. |
| `teams/index.html`, `teams/<slug>/index.html`, `data/team-dossiers.json` | Generated team dossier room: one page per team in `data/teams.json` with codename, tagline, threat level, known-for bullets, a long roasting file, strengths, weaknesses, Clueso's advice, case history, and index standing. Dossiers are written only from approved case material and the teams' own statements; they must not invent rosters, members, incidents, or private details, and every team gets roasted. Team names in case text, ratings, the subject panel, and the homepage index link to these pages; `PNN-00X` mentions in dossiers link to cases. |
| `data/countdown.json`, `scripts/countdown.js`, `scripts/countdown.test.mjs` | Homepage party countdown between `BEGIN/END GENERATED COUNTDOWN`. The user supplied the date: Saturday, October 24, 2026 at 5:30 PM, America/Denver (`2026-10-24T17:30:00-06:00`). Copy mentions time running out to prank and bribe a witch, and repeats only the known October 22 prank/photo deadline. Once `data/final-results.json` exists, the same section becomes a "reign clock" counting up from its `decidedAt` (the pink team's win, 10:15 PM October 24, 2026); `countdown.js` exports `elapsed` for that mode. |
| `data/final-results.json`, `src/components/home/FinalResults.jsx` | Homepage final scoreboard for the 2026 season, placed under the hero: standings (every team once, points high to low, shared ranks for ties), the identical 22-point base, category winners (ties listed), and a link to the final case (`caseId`, PNN-021). Validated by `validateFinalResults` in `scripts/lib/load-data.mjs`. Transcribed from the witches' scoresheet, which is kept in `unassigned-evidence/` and is never published because it shows the witches' real names; public copy uses Wanda, Hilda, and Glenda. |
| `scripts/not-found.js`, `scripts/not-found.test.mjs` | A random Clueso one-liner on the 404 page; a static line is the no-JS fallback. |
| `data/daily-tips.json`, `scripts/generate-daily-tip.mjs`, `scripts/daily-tip.js`, `scripts/daily-tip.test.mjs` | At least 20 `{topic, text}` tips for the homepage Daily Tip-Off. The generator embeds the list and a static fallback tip between `BEGIN/END GENERATED DAILY TIP`; the browser script shows a different tip each local day. Tips must repeat only the real game rules. |
| `cases/index.html`, `cases/001/index.html`, `cases/002/index.html`, `cases/003/index.html`, `cases/004/index.html`, `cases/005/index.html` | Generated archive, PNN-001 name reveal, PNN-002 early witch bribe, PNN-003 dog-walking report, PNN-004 Area 51 Bureau dumpster fire, and PNN-005 Pyro Posse laundry night |
| `assets/evidence/001/` | PNN-001 media: `black-webb-bandits-panther-reconstruction.mp4` and extracted `black-webb-bandits-panther-reconstruction-poster.jpg` |
| `assets/evidence/002/` | PNN-002 supplied image: `black-webb-bandits-witch-flier.png` |
| `assets/evidence/003/` | AI-generated Operation Loose End comic reconstruction for PNN-003 |
| `unassigned-evidence/` | Supplied media not yet assigned to a case. Lives outside `public/` so it is not deployed; move an item to `public/assets/evidence/<case-id>/` when assigning it. |
| `assets/images/pnn.svg` | Custom connected PNN lettering, magenta strokes with white inset lines; used in both headers and homepage hero |
| `assets/images/pnn.png` | Transparent 900 × 330 PNG export of the PNN SVG for email mastheads |
| `assets/images/logo.png` | Supplied team artwork, 600 × 516 |
| `assets/images/favicon.png` | Supplied feline favicon currently linked by both HTML pages |
| `assets/images/teams/` | Supplied color-named team logos referenced by `data/teams.json`; case pages display the subject team's logo |
| `assets/images/evidence/` | Legacy empty placeholder; use `assets/evidence/` for new case media |
| `assets/email/` | Small email-sized thumbnails referenced by `featuredCase.image` in newsletter editions |
| `assets/qr/` | Pink dispatch and tips QR SVGs with centered, circle-outlined paws; dispatch PNG derivative for email |
| `assets/downloads/` | Future approved newsletter PDFs |
| `newsletter/index.html` | Newsletter landing page linking to published editions, with a generated EmailOctopus sign-up region |
| `newsletter/001/index.html` | Published EmailOctopus edition; no scripts or analytics |
| `data/newsletters/`, `scripts/generate-newsletters.mjs`, `scripts/templates/newsletter.html` | Edition JSON, authoring/scaffolding command, shared email shell |
| `data/newsletter-subscribe.json`, `scripts/generate-newsletter-subscribe.mjs` | EmailOctopus embed-form script URL and the generator that renders it (with a noscript fallback) into `newsletter/index.html` |
| `dispatch/index.html`, `scripts/dispatch.js` | Permanent QR destination that selects a published case on each visit |
| `scripts/dispatch.test.mjs` | Dependency-free Node tests for dispatch selection and fallback behavior |
| `data/teams.json` | Seven confirmed teams with stable color IDs/slugs, names, colors, logo paths, and an own-team flag |
| `data/cases.json` | Structured case records: PNN-001/002 concerning the black team and PNN-003 concerning the white team |
| `CNAME` | Contains `purrpetrators.net` |
| `README.md` | Local preview and intended GitHub Pages deployment instructions |
| `.gitignore` | Excludes `.idea/`, `.DS_Store`, `Thumbs.db`, and `node_modules/` |

## Case record details

Moved from `AGENTS.md`.

Image evidence uses `type: "image"`, `id`, `src` (local PNG/JPEG/WebP), `width` and `height` (positive integer intrinsic dimensions), nonempty `alt`, `label`, `description`, and `caption`. It renders uncropped with a direct-image link and is labeled supplied game material unless optional boolean `reconstruction: true` labels it PNN reconstruction. Generated illustrations must use that flag and clearly identify invented details in their captions and artwork. The homepage uses the first image or video poster with matching dimensions and a media-appropriate link label. An optional `organizerNotice` has nonempty `attribution`, `timeLabel`, and a nonempty array of plain-text `paragraphs`; it renders as an escaped blockquote with paragraph and line breaks. Keep quoted organizer instructions distinct from comic interpretation. PNN-002 records the supplied reminder: wait for instructions before bribing; early bribes receive NO and must be repeated after the announcement. No point deduction was stated. The user confirmed that the incident and reminder occurred October 6, 2026; PNN-002 uses the reminder time, `2026-10-06T20:28:00-06:00`, America/Denver.

Optional `coSuspectTeamIds` is a non-empty array of other team IDs (unique, not the lead) for a case about several teams, such as a suspected alliance. `suspectTeamId` stays the lead subject. The case page shows one subject-team panel per team (lead first), the homepage feature names every team, and each team's dossier lists the case. The build validates the IDs and logos.

Optional `purrHiss` is an array of `{teamId, purrs, hisses, note}` comedy ratings (integers 0-5, unique team per case, short joke note) that feed **The Catnip & Hairball Index** on the homepage (data keys keep their original names: `purrs` is catnip, `hisses` is hairballs) (between `BEGIN/END GENERATED PURR-HISS INDEX`) and a ratings list on the case page. Catnip rewards clever, well-run mischief; hairballs mark hot air, bad timing, and laundry catastrophes. The index is clearly labeled comedy, never game points, standings, or votes, and must not invent point values. `data/purr-hiss-bonuses.json` holds credit not tied to one case, such as the pink team's media campaign (running PNN itself, which the site footer already discloses). Teams without any rating render as unrated. The exact totals are static text; `scripts/catnip-index.js` (tested by `scripts/catnip-index.test.mjs`) shuffles the team order each day with no explanation on the page, nudges bar lengths by a small deterministic daily drift (empty bars stay empty), and plays a bouncy spring fill when the section scrolls into view, honoring `prefers-reduced-motion`. Do not add any text implying the order is a ranking. Run `node scripts/generate-daily-tip.mjs` after editing tips.

### Redactions

Anywhere public copy quotes or could reference a person (names, witnesses, quote attributions, submitters, households), black it out instead of writing it. Never put real personal information in the app.

- In case/dossier prose, write `[[redacted]]` (auto width) or `[[redacted:8]]` (about 8 characters wide). `src/lib/prose.jsx` renders it as `<Redacted>` (`src/components/ui/Redacted.jsx`). Use it in JSX directly with `<Redacted chars={9} />`.
- Widths are deterministic and vary per bar so they read as different-length words. Use `chars` to force one.
- The bar is shorter than the line box (`.redacted` in `styles.css`), so line height is unchanged. The word REDACTED stays in the DOM, barely visible.
- Only in fields rendered through `Prose`/`Inline`. Do not use in `incidentTitle` or `summary` (plain text, also shown on the homepage, ticker, and newsletter) or in the ticker JSON.
- Report-type evidence automatically shows a redacted `Source:` line.
