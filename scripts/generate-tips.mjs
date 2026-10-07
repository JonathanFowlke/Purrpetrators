// Configure data/tip-line.json, then commit the generated region in tips/index.html.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export function renderTipForm(config) {
  if (typeof config.formUrl !== 'string') throw new Error('formUrl must be a string.');
  if (!config.formUrl.trim()) return `<div class="tip-offline">
  <p class="operation-label">Transmission pending</p>
  <h3>The tip desk is getting connected.</h3>
  <p>Online reports aren't open yet. Check back soon. Nothing can be submitted or uploaded from this page until the form is available.</p>
  <a href="../cases/index.html">Browse the open case files →</a>
</div>`;
  const url = new URL(config.formUrl.trim());
  const match = url.pathname.match(/^\/r\/([A-Za-z0-9]+)\/?$/);
  if (url.origin !== 'https://tally.so' || url.username || url.password || !match) {
    throw new Error('Use the published respondent link: https://tally.so/r/FORM_ID');
  }
  const formId = match[1];
  // Only the public form ID is retained; editor URLs and tracking parameters are not embedded.
  return `<p class="tip-form-help">Form not loading? <a href="https://tally.so/r/${formId}" target="_blank" rel="noopener noreferrer">Open the PNN Tip Line (new tab)</a>.</p>
<iframe data-tally-src="https://tally.so/embed/${formId}?alignLeft=1&amp;hideTitle=1&amp;transparentBackground=1&amp;dynamicHeight=1"
  loading="lazy" width="100%" height="900" title="PNN Tip Line — report game activity" class="tip-embed"></iframe>
<noscript><p>Enable JavaScript to use the embedded form, or use the direct form link above.</p></noscript>
<script src="https://tally.so/widgets/embed.js" defer onload="Tally.loadEmbeds()"></script>`;
}

if (path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const config = JSON.parse(await readFile(path.join(root, 'data/tip-line.json'), 'utf8'));
  const rendered = renderTipForm(config);
  const pagePath = path.join(root, 'tips/index.html');
  const page = await readFile(pagePath, 'utf8');
  const region = /<!-- BEGIN GENERATED TIP FORM -->[\s\S]*?<!-- END GENERATED TIP FORM -->/;
  if (!region.test(page)) throw new Error('Tip form markers are missing.');
  await writeFile(pagePath, page.replace(region, `<!-- BEGIN GENERATED TIP FORM -->\n${rendered}\n          <!-- END GENERATED TIP FORM -->`));
  console.log(config.formUrl.trim() ? 'Tally embed configured. Test the published form before launch.' : 'Tip Line generated in the not-yet-connected state.');
}
