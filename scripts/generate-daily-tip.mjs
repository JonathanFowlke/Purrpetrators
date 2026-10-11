// Render the homepage daily-tip region from data/daily-tips.json. No npm dependencies.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const tips = JSON.parse(await readFile(path.join(root, 'data', 'daily-tips.json'), 'utf8'));

if (!Array.isArray(tips) || tips.length < 20) throw new Error('daily-tips.json needs at least 20 tips.');
const seen = new Set();
for (const tip of tips) {
  for (const key of ['topic', 'text']) if (typeof tip[key] !== 'string' || !tip[key].trim()) throw new Error(`Each tip needs a nonempty ${key}.`);
  if (seen.has(tip.text)) throw new Error(`Duplicate tip: ${tip.text.slice(0, 40)}`);
  seen.add(tip.text);
}

// The same rule as scripts/daily-tip.js, so the static fallback matches the day the page was generated.
const now = new Date();
const day = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);
const fallback = tips[day % tips.length];
const data = JSON.stringify(tips).replace(/</g, '\\u003c');

const region = `<!-- BEGIN GENERATED DAILY TIP -->
        <section class="daily-tip" aria-labelledby="daily-tip-heading">
          <p class="operation-label">Clueso's Daily Tip-Off · <span id="daily-tip-topic">${escape(fallback.topic)}</span></p>
          <h2 id="daily-tip-heading">Today's tip from Inspector Clueso</h2>
          <p class="daily-tip-text" id="daily-tip-text">${escape(fallback.text)}</p>
          <script type="application/json" id="daily-tips-data">${data}</script>
          <script src="scripts/daily-tip.js" defer></script>
        </section>
        <!-- END GENERATED DAILY TIP -->`;

const homePath = path.join(root, 'index.html');
const home = await readFile(homePath, 'utf8');
const pattern = /<!-- BEGIN GENERATED DAILY TIP -->[\s\S]*?<!-- END GENERATED DAILY TIP -->/;
if (!pattern.test(home)) throw new Error('Homepage daily-tip markers are missing.');
await writeFile(homePath, home.replace(pattern, () => region));
console.log(`Rendered the daily tip region from ${tips.length} tips.`);
