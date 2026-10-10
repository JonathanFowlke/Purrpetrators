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

The README documents **Deploy from a branch**, using the default branch and repository root. Keep `.nojekyll`, static assets, and custom-domain compatibility. Do not introduce a persistent server, database, paid hosting, or complex build infrastructure without a requirement that justifies it.

- Root-page assets use relative paths such as `assets/css/styles.css`; pages under `pages/` need `../assets/` and `../scripts/`, adjusted for depth.
- `404.html` injects a `<base>` before loading assets: `/` on the custom domain, or the first path segment on a `*.github.io` project site. It skips this behavior for `file:` previews.
- That base logic assumes a GitHub project site, not a `username.github.io` root site; the latter requires `/`. Other subdirectory hosting needs its actual deployment prefix. Preserve nested-error-page asset and home-link behavior when editing it.
- GitHub Pages paths are case-sensitive. Use exact filenames and verify links from each page depth.
- Do not change domain configuration, publish, or add integrations merely because this guide describes them.

## Newsletter, QR pages, and fictional notices

The Tip Line links to `tips/flier.html`, a one-sheet letter portrait flier using `assets/qr/pnn-tips-qr.svg`. Its print stylesheet sets half-inch page margins and hides the screen controls. Preserve the large QR, readable numeric hotline plus vanity spelling, and standalone Broomstick Challenge fictional context. Print at 100% with browser headers/footers disabled; verify the actual print scans before distribution. The page works without JavaScript through the browser's Print command.

`/resources/` is a deliberately unlisted public page for the flier, QR SVG viewing/download links, and printable windshield cards. Do not link to it from other site pages or navigation. It has `noindex, nofollow`, but knowing its URL is not authentication or access control; keep all contents suitable for public viewing. Add card links only when actual approved files exist.

The stable `/newsletter/` page lists numbered editions generated from `data/newsletters/<id>.json`. Run `node scripts/generate-newsletters.mjs` to update `newsletter/<id>/index.html` and the marked listing; `--new 002` scaffolds a draft. Shared markup lives in `scripts/templates/newsletter.html`. Edition 001 is now `published` at `newsletter/001/index.html`, not a sample. No separate plain-text file is maintained because EmailOctopus generates that alternative. Emails include the three required EmailOctopus footer tags and no website scripts/analytics. They use presentation tables, inline core styles, system fonts, absolute HTTPS links, and PNG/JPEG imagery. Keep copy readable with images blocked and without media queries or JavaScript. Draft status hides listing links, not files. Keep the neutral **PNN Newsletter** name and preserve edition URLs. See README for schema and import instructions. Future approved PDFs belong under `assets/downloads/`; only link files that exist.

**Established edition format:** every edition opens with the optional `featuredCase` block, rendered first as a short, funny, spoiler-light hint toward the latest published case (not a full case summary) — the generator resolves its case title/number from case data and renders it as the opening headline. The `sections` array supplies the main feature next: a hilarious, exaggerated PNN article in the established mock-institute voice, with invented/comedy statistics where useful. The template then automatically appends the fixed PNN Dispatch and Tip Line/hotline closing block; do not duplicate dispatch or tip-line content inside `sections`. Edition 001's main feature (Go Big or Go Haunt / Pink Advantage spoof science / mascot confidence) was drafted using the supplied numbered reference assets in `assets/evidence/unassigned/` (`6587989890773275282.jpg.jpeg`, `9209352435477332460.png`, `20261007_154710.pdf`) purely as tone/content inspiration. Those three files depict a third-party trademarked cartoon character and a fake research-institute mockup; they are reference material only and must never be embedded, linked, or published on the site or in emails. Future numbered/unlabeled reference assets should be treated the same way unless the user explicitly confirms they are approved game material for publication.

The newsletter sign-up embed lives in `data/newsletter-subscribe.json` (`embedSrc`, empty by default) and renders into the marked region on `newsletter/index.html` via `node scripts/generate-newsletter-subscribe.mjs`. It uses EmailOctopus's official JavaScript form embed (`<script data-form>` from a sharded `eomailN.com` domain), which EmailOctopus's dashboard supplies per form; the generator validates the URL shape and rebuilds the script tag itself rather than trusting pasted HTML, and adds a `<noscript>` fallback pointing to the Tip Line. This is currently the only part of the site that requires browser JavaScript to function. See README for the setup steps.

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

1. **Both teams get roasted.** The pranker's overreach, branding, or gap between boast and delivery is a target. The victim's theme, reputation, or predicament is a target. Neither team gets a pass for being the "winner."
2. **Puns tied to the real artifact.** Build jokes from the team's name and theme plus the actual evidence. PNN-004: a fire-themed team that delivered balloons became "hot air" and "a Five-Alarm Party Store Run"; a secrets-themed team with decorated garbage cans was "outed by its own recycling," "Unidentified Flaming Objects, identified," and "bin there, done that." Aim for several distinct puns per case, not one.
3. **Escalate.** Each paragraph should be more absurd than the last: setup, a contrast with the team's own self-image, a ridiculous PNN theory, then a short payoff.
4. **Every section lands a joke.** Headline, summary, incident description, suspected motive, each exhibit label/description/caption, investigator note, threat level, and disposition. Captions and the disposition end on punch lines.
5. **Mock-official deadpan.** Absurd administrative seriousness, invented classifications (for example "Medium rare, mostly hot air"), and "pending appeal" style rulings. Quote the team's own statement when it supplies the joke.
6. **Clueso aside.** One quick line of his pink-team fixation, never a replacement for the actual story.
7. **Stay in bounds.** Joke about the prank, themes, props, boasts, and fictional motives. Not bodies or appearance, families, money, relationships, health, religion, or private matters. No real fire advice or encouragement: if a theme involves fire, joke that the flames were decorative and that the game does not include fire. Identifiable faces stay out of evidence unless intentionally supplied for publication; use bins, props, and artwork instead.
8. **Facts stay faithful.** Dates, who did what, and quoted statements come from approved material. Roast the interpretation, not invented claims. Incident dates go in the description in absolute form (for example "On the night of October 8, 2026"); `dateOpened` records when PNN opened the case.
9. **Self-check.** If a team could read the case and not wince happily, sharpen it. A toothless draft is not finished.
