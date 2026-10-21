// Pure derivation of everything the pages need from the raw data files. No fs, no React, so
// pages, stories, and tests can all build a model from fixtures.
import { parseTallyFormId, parseEmbedScript } from './embeds.js';

const byDateDesc = (a, b) => Date.parse(b.dateOpened) - Date.parse(a.dateOpened);
const byDateAsc = (a, b) => Date.parse(a.dateOpened) - Date.parse(b.dateOpened);

export function formatCaseDate(record) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short', timeZone: record.timeZone })
    .format(new Date(record.dateOpened)) + ` (${record.timeZone})`;
}

export function formatPartyDate(countdown) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short', timeZone: countdown.timeZone })
    .format(new Date(countdown.target));
}

/** Catnip & Hairball Index: running comedy ratings per team, summed from each published case plus bonuses. */
function buildIndex({ teams, published, bonuses }) {
  const totals = new Map(teams.map(team => [team.id, { team, purrs: 0, hisses: 0, rated: false, note: '' }]));
  for (const record of [...published].sort(byDateAsc)) {
    for (const rating of record.purrHiss || []) {
      const row = totals.get(rating.teamId);
      row.purrs += rating.purrs; row.hisses += rating.hisses; row.rated = true; row.note = rating.note;
    }
  }
  for (const bonus of bonuses) {
    const row = totals.get(bonus.teamId);
    row.purrs += bonus.purrs; row.hisses += bonus.hisses; row.rated = true;
    if (!row.note) row.note = bonus.note;
  }
  const rows = [...totals.values()];
  const scale = Math.max(1, ...rows.map(row => Math.max(row.purrs, row.hisses)));
  // Static order is neutral (alphabetical). public/scripts/catnip-index.js reshuffles the rows each day.
  const sorted = [...rows].sort((a, b) => a.team.name.localeCompare(b.team.name));
  return { totals, rows: sorted, scale };
}

/** Editions that are public in the listing (everything but drafts). */
const liveEditions = newsletters => newsletters.filter(edition => edition.status !== 'draft');

/**
 * Headline pool: the generic items in news-ticker.json plus the `tickerItems` of every published case and every
 * non-draft newsletter edition, so headlines about one case or edition live in its own record.
 * public/scripts/ticker.js applies the same rule in the browser.
 */
export function mergeTickerPool(pool, cases, editions = []) {
  const seen = new Set(pool.map(item => item.text));
  const merged = [...pool];
  const records = [...cases.filter(record => record.published), ...liveEditions(editions)];
  for (const record of records) {
    for (const item of record.tickerItems || []) {
      if (!seen.has(item.text)) { seen.add(item.text); merged.push(item); }
    }
  }
  return merged;
}

/** Ticker: live case headlines and index standings are fixed; the rest is sampled from the pool. */
function buildTicker({ published, rows, pool, editions, now }) {
  const hairLead = [...rows].sort((a, b) => b.hisses - a.hisses)[0];
  const catnipLead = [...rows].sort((a, b) => b.purrs - a.purrs)[0];
  const fixed = [
    ...published.map(record => ({ tag: `CASE FILE ${record.caseNumber}`, text: record.incidentTitle, to: `cases/${record.id}/` })),
    { tag: 'INDEX', text: `${hairLead.team.name} leads the hairballs with ${hairLead.hisses}. ${catnipLead.team.name} leads the catnip with ${catnipLead.purrs}.`, to: 'index.html#catnip-index-heading' }
  ];
  const day = Math.floor(now.getTime() / 86400000);
  const sample = [];
  for (let i = 0; sample.length < 8 && i < 400; i += 1) {
    const item = pool[(day * 11 + i * 7) % pool.length];
    if (!sample.includes(item)) sample.push(item);
  }
  // Files the browser script fetches to rebuild the same merged pool (a browser cannot list a directory).
  const sources = ['data/news-ticker.json', 'data/cases.json', ...liveEditions(editions).map(edition => `data/newsletters/${edition.id}.json`)];
  return { fixed, sample, sources };
}

/** Daily tip: the same day rule as public/scripts/daily-tip.js, so the static fallback matches the build day. */
function buildDailyTip(tips, now) {
  const day = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);
  return { tips, fallback: tips[day % tips.length] };
}

/** Every team a case is about: the lead `suspectTeamId` first, then any optional `coSuspectTeamIds`. */
export const suspectTeamsOf = (record, teamById) =>
  [record.suspectTeamId, ...(record.coSuspectTeamIds ?? [])].map(id => teamById.get(id));

/** Editions shown in the public newsletter listing, newest first. Drafts stay unlisted (though their pages exist). */
export const listedEditions = newsletters => newsletters.filter(edition => edition.status !== 'draft').reverse();

export function buildModel(raw, now = new Date()) {
  const teams = raw.teams;
  const teamById = new Map(teams.map(team => [team.id, team]));
  const cases = raw.cases;
  const caseById = new Map(cases.map(record => [record.id, record]));
  const published = cases.filter(record => record.published).sort(byDateDesc);
  const index = buildIndex({ teams, published, bonuses: raw.bonuses || [] });
  const newsletters = [...(raw.newsletters || [])].sort((a, b) => a.id.localeCompare(b.id));
  return {
    teams,
    teamById,
    teamsByName: [...teams].sort((a, b) => a.name.localeCompare(b.name)),
    teamsByNameLength: [...teams].sort((a, b) => b.name.length - a.name.length),
    cases,
    caseById,
    published,
    latest: published[0],
    index,
    ticker: buildTicker({ published, rows: index.rows, pool: mergeTickerPool(raw.tickerPool, cases, newsletters), editions: newsletters, now }),
    dossiers: raw.dossiers,
    countdown: raw.countdown,
    dailyTip: buildDailyTip(raw.dailyTips, now),
    tallyFormId: parseTallyFormId(raw.tipLine.formUrl),
    subscribe: parseEmbedScript(raw.subscribe.embedSrc),
    newsletters,
    listedNewsletters: listedEditions(newsletters),
    cards: raw.cards,
    emailTemplate: raw.emailTemplate
  };
}
