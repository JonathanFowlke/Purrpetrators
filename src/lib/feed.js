// Single RSS 2.0 feed of published cases and published newsletter editions. Pure: model in, XML string out.
// Items carry the summary only, so readers click through to the page (full text, evidence, analytics).
import { SITE } from './constants.js';

const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const stripMarkup = value => String(value).replace(/\*\*?([^*]+)\*\*?/g, '$1').replace(/\s*\n\s*/g, ' ').trim();

function item({ title, link, description, date }) {
  return `    <item>
      <title>${escape(title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(date).toUTCString()}</pubDate>
      <description>${escape(description)}</description>
    </item>`;
}

/** Feed items, newest first: published cases (dateOpened) and published newsletter editions (date). */
export function feedItems(model) {
  const cases = model.published.map(record => ({
    title: `${record.caseNumber}: ${record.incidentTitle}`,
    link: `${SITE.origin}/cases/${record.id}/`,
    description: stripMarkup(record.summary),
    date: record.dateOpened
  }));
  const editions = model.newsletters.filter(edition => edition.status === 'published').map(edition => ({
    title: `PNN Newsletter ${edition.id}: ${edition.title}`,
    link: `${SITE.origin}/newsletter/${edition.id}/`,
    description: stripMarkup(edition.preheader),
    date: edition.date
  }));
  return [...cases, ...editions].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function renderFeed(model) {
  const items = feedItems(model);
  // The newest item's date, not the build time, keeps the output the same until content changes.
  const lastBuild = items.length ? `\n    <lastBuildDate>${new Date(items[0].date).toUTCString()}</lastBuildDate>` : '';
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(SITE.name)}</title>
    <link>${SITE.origin}/</link>
    <atom:link href="${SITE.origin}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>${escape(`${SITE.brandLine} Case files and newsletters from PNN, the fictional news arm of the Prowling Purrpetrators, for the Broomstick Challenge neighborhood game.`)}</description>
    <language>en-us</language>${lastBuild}
${items.map(item).join('\n')}
  </channel>
</rss>
`;
}
