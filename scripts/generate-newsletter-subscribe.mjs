// Configure data/newsletter-subscribe.json, then commit the generated region in newsletter/index.html.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export function renderSubscribe(config) {
  if (typeof config.embedSrc !== 'string') throw new Error('embedSrc must be a string.');
  const value = config.embedSrc.trim();
  if (!value) return `<div class="tip-offline">
  <p class="operation-label">Mailing list pending</p>
  <h3>The subscription desk is getting connected.</h3>
  <p>Email sign-up isn't open yet. Preview the editions above until a sign-up form is published.</p>
</div>`;
  let url;
  try { url = new URL(value); } catch { throw new Error('embedSrc must be a valid absolute URL.'); }
  // EmailOctopus serves form embeds from sharded eomailN.com domains: https://eomailN.com/form/FORM_ID.js
  const match = url.pathname.match(/^\/form\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.js$/i);
  if (url.protocol !== 'https:' || url.username || url.password || !/^eomail\d+\.com$/i.test(url.hostname) || !match) {
    throw new Error('Use the official EmailOctopus embed script URL: https://eomailN.com/form/FORM_ID.js');
  }
  const formId = match[1];
  // Only the public embed script/form ID is rebuilt here; pasted HTML is never trusted verbatim.
  return `<script async src="${url.href}" data-form="${formId}"></script>
<noscript><p>Enable JavaScript to use the sign-up form above, or <a href="../tips/index.html">send your email through the PNN Tip Line</a> to be added manually.</p></noscript>`;
}

if (path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const config = JSON.parse(await readFile(path.join(root, 'data/newsletter-subscribe.json'), 'utf8'));
  const rendered = renderSubscribe(config);
  const pagePath = path.join(root, 'newsletter/index.html');
  const page = await readFile(pagePath, 'utf8');
  const region = /<!-- BEGIN GENERATED NEWSLETTER SUBSCRIBE -->[\s\S]*?<!-- END GENERATED NEWSLETTER SUBSCRIBE -->/;
  if (!region.test(page)) throw new Error('Newsletter subscribe markers are missing.');
  await writeFile(pagePath, page.replace(region, `<!-- BEGIN GENERATED NEWSLETTER SUBSCRIBE -->\n${rendered}\n        <!-- END GENERATED NEWSLETTER SUBSCRIBE -->`));
  console.log(config.embedSrc.trim() ? 'EmailOctopus embed form configured. Test sign-up before launch.' : 'Newsletter subscribe section generated in the not-yet-connected state.');
}
