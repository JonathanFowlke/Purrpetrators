// Read and validate the site's data files. Runs in Node at build time; components never touch the filesystem.
import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateNewsletter } from '../../src/email/newsletter.js';

export const projectRoot = fileURLToPath(new URL('../../', import.meta.url));

const json = (root, name) => readFile(path.join(root, 'data', name), 'utf8').then(JSON.parse);

/** Read every data file into one `raw` object (the input to buildModel). */
export async function loadRawData(root = projectRoot) {
  const [cases, teams, tickerPool, dossiers, countdown, dailyTips, tipLine, subscribe, cards, emailTemplate] = await Promise.all([
    json(root, 'cases.json'), json(root, 'teams.json'), json(root, 'news-ticker.json'), json(root, 'team-dossiers.json'),
    json(root, 'countdown.json'), json(root, 'daily-tips.json'), json(root, 'tip-line.json'), json(root, 'newsletter-subscribe.json'),
    json(root, 'cards.json'), readFile(path.join(root, 'src/email/newsletter.html'), 'utf8')
  ]);
  const bonuses = await json(root, 'purr-hiss-bonuses.json').catch(() => []);
  const newsletterDir = path.join(root, 'data/newsletters');
  const newsletters = [];
  for (const name of (await readdir(newsletterDir)).filter(file => file.endsWith('.json')).sort()) {
    const record = JSON.parse(await readFile(path.join(newsletterDir, name), 'utf8'));
    if (name !== `${record.id}.json`) throw new Error(`Filename must match edition ID: ${name}`);
    newsletters.push(record);
  }
  return { cases, teams, bonuses, tickerPool, dossiers, countdown, dailyTips, tipLine, subscribe, cards, newsletters, emailTemplate };
}

const nonEmpty = value => typeof value === 'string' && value.trim();
const publicAsset = (root, rel) => access(path.join(root, 'public', rel));

/** Validate every record before any page is written. Throws on the first problem. */
export async function validateRawData(raw, root = projectRoot) {
  const { cases, teams, bonuses, tickerPool, dossiers, countdown, dailyTips, cards, newsletters } = raw;
  const teamById = new Map(teams.map(team => [team.id, team]));
  const caseById = new Map(cases.map(record => [record.id, record]));

  for (const team of teams) {
    const d = dossiers[team.id];
    if (!d || ['codename', 'tagline', 'threatLevel', 'file', 'advice'].some(key => !nonEmpty(d[key])) ||
        ['knownFor', 'strengths', 'weaknesses'].some(key => !Array.isArray(d[key]) || !d[key].length || d[key].some(item => !nonEmpty(item)))) throw new Error('Incomplete dossier for ' + team.id);
  }
  if (!nonEmpty(countdown.target) || isNaN(Date.parse(countdown.target)) || !nonEmpty(countdown.timeZone) || !nonEmpty(countdown.label)) throw new Error('Invalid countdown.json.');
  if (!Array.isArray(tickerPool) || tickerPool.length < 30 || tickerPool.some(item => !nonEmpty(item.tag) || !nonEmpty(item.text))) throw new Error('news-ticker.json needs at least 30 {tag, text} items.');
  if (!Array.isArray(bonuses) || bonuses.some(bonus => !teamById.has(bonus.teamId) ||
      ['purrs', 'hisses'].some(key => !Number.isInteger(bonus[key]) || bonus[key] < 0 || bonus[key] > 5) || !nonEmpty(bonus.note))) throw new Error('Invalid purr-hiss-bonuses.json.');
  if (!Array.isArray(dailyTips) || dailyTips.length < 20) throw new Error('daily-tips.json needs at least 20 tips.');
  const seenTips = new Set();
  for (const tip of dailyTips) {
    for (const key of ['topic', 'text']) if (!nonEmpty(tip[key])) throw new Error(`Each tip needs a nonempty ${key}.`);
    if (seenTips.has(tip.text)) throw new Error(`Duplicate tip: ${tip.text.slice(0, 40)}`);
    seenTips.add(tip.text);
  }
  if (!Array.isArray(cards.sheets) || !cards.sheets.length || cards.sheets.some(sheet => !nonEmpty(sheet.title) || !Array.isArray(sheet.cards) || !sheet.cards.length ||
      sheet.cards.some(card => !nonEmpty(card.title) || !nonEmpty(card.message)))) throw new Error('Invalid cards.json.');

  const ids = new Set();
  // Generic, per-case, and per-edition ticker headlines must stay unique, and each live record needs a few of its own.
  const tickerTexts = new Set(tickerPool.map(item => item.text));
  const checkTickerItems = (record, label, minimum) => {
    const items = record.tickerItems ?? [];
    if (!Array.isArray(items) || items.length < minimum ||
        items.some(item => !nonEmpty(item.tag) || !nonEmpty(item.text) || item.text.length > 170 || tickerTexts.has(item.text))) {
      throw new Error(`${label} needs at least ${minimum} unique {tag, text} tickerItems (text up to 170 characters).`);
    }
    for (const item of items) tickerTexts.add(item.text);
  };
  for (const record of cases) {
    if (!/^\d{3}$/.test(record.id) || ids.has(record.id)) throw new Error('Case IDs must be unique three-digit strings.');
    ids.add(record.id);
    if (record.caseNumber !== `PNN-${record.id}` || !teamById.has(record.suspectTeamId)) throw new Error(`Invalid case/team reference: ${record.id}`);
    const team = teamById.get(record.suspectTeamId);
    if (!/^assets\/[\w/.-]+\.(jpe?g|png|webp|svg)$/.test(team.logo) || team.logo.split('/').includes('..')) throw new Error(`Invalid team logo: ${record.id}`);
    await publicAsset(root, team.logo);
    if (typeof record.published !== 'boolean') throw new Error(`Missing publication flag: ${record.id}`);
    for (const field of ['dateOpened', 'timeZone', 'status', 'incidentTitle', 'summary', 'incidentDescription', 'suspectedMotive', 'investigatorNote', 'threatLevel', 'disposition']) {
      if (!nonEmpty(record[field])) throw new Error(`Missing ${field}: ${record.id}`);
    }
    new Intl.DateTimeFormat('en-US', { timeZone: record.timeZone }).format(new Date(record.dateOpened));
    checkTickerItems(record, `case ${record.id}`, record.published ? 3 : 0);
    if (record.relatedCaseIds !== undefined && (!Array.isArray(record.relatedCaseIds) ||
        new Set(record.relatedCaseIds).size !== record.relatedCaseIds.length ||
        record.relatedCaseIds.some(id => typeof id !== 'string' || id === record.id || !caseById.has(id)))) throw new Error(`Invalid related cases: ${record.id}`);
    if (record.series !== undefined && (!record.series || !nonEmpty(record.series.name) || !nonEmpty(record.series.blurb) ||
        !caseById.has(record.series.startCaseId))) throw new Error(`Invalid series: ${record.id}`);
    if (record.purrHiss !== undefined) {
      if (!Array.isArray(record.purrHiss) || !record.purrHiss.length) throw new Error(`Invalid purrHiss ratings: ${record.id}`);
      const rated = new Set();
      for (const rating of record.purrHiss) {
        if (!teamById.has(rating.teamId) || rated.has(rating.teamId)) throw new Error(`Invalid purrHiss team: ${record.id}`);
        rated.add(rating.teamId);
        for (const key of ['purrs', 'hisses']) if (!Number.isInteger(rating[key]) || rating[key] < 0 || rating[key] > 5) throw new Error(`purrHiss ${key} must be an integer 0-5: ${record.id}`);
        if (!nonEmpty(rating.note)) throw new Error(`Missing purrHiss note: ${record.id}`);
      }
    }
    if (record.organizerNotice) {
      const notice = record.organizerNotice;
      if (!['attribution', 'timeLabel'].every(field => nonEmpty(notice[field])) || !Array.isArray(notice.paragraphs) || !notice.paragraphs.length ||
          notice.paragraphs.some(text => !nonEmpty(text))) throw new Error(`Invalid organizer notice: ${record.id}`);
    }
    if (!Array.isArray(record.evidence) || !record.evidence.length) throw new Error(`Missing evidence: ${record.id}`);
    for (const item of record.evidence) {
      for (const field of ['id', 'label', 'description', 'caption']) if (!nonEmpty(item[field])) throw new Error(`Missing evidence ${field}: ${record.id}`);
      if (item.type === 'report') continue;
      const mediaPattern = item.type === 'video' ? /^assets\/[\w/.-]+\.mp4$/ : item.type === 'image' ? /^assets\/[\w/.-]+\.(png|jpe?g|webp)$/ : null;
      if (!mediaPattern || !mediaPattern.test(item.src) || item.src.split('/').includes('..')) throw new Error(`Invalid evidence path: ${record.id}`);
      await publicAsset(root, item.src);
      if (item.type === 'image') {
        if (item.reconstruction !== undefined && typeof item.reconstruction !== 'boolean') throw new Error(`Invalid reconstruction flag: ${record.id}`);
        if (!nonEmpty(item.alt) || !Number.isSafeInteger(item.width) || item.width <= 0 || !Number.isSafeInteger(item.height) || item.height <= 0) throw new Error(`Invalid image details: ${record.id}`);
        continue;
      }
      if (!/^assets\/[\w/.-]+\.(jpg|png|webp)$/.test(item.poster) || item.poster.split('/').includes('..')) throw new Error(`Invalid poster: ${record.id}`);
      await publicAsset(root, item.poster);
    }
  }

  for (const asset of ['assets/images/pnn.png', 'assets/qr/pnn-dispatch-qr.png']) await publicAsset(root, asset);
  for (const edition of newsletters) {
    validateNewsletter(edition, cases);
    if (edition.featuredCase?.image) await publicAsset(root, edition.featuredCase.image.src);
    checkTickerItems(edition, `newsletter ${edition.id}`, edition.status === 'draft' ? 0 : 2);
  }
}
