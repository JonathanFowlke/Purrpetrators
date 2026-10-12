import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildModel } from '../src/lib/model.js';
import { feedItems, renderFeed } from '../src/lib/feed.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
const json = async file => JSON.parse(await readFile(path.join(root, file), 'utf8'));
const model = buildModel({
  teams: await json('data/teams.json'), cases: await json('data/cases.json'), bonuses: [], tickerPool: ['x'],
  dossiers: [], countdown: {}, dailyTips: ['x'], tipLine: { formUrl: '' }, subscribe: { embedSrc: '' }, cards: [],
  newsletters: [await json('data/newsletters/001.json'), await json('data/newsletters/002.json')], emailTemplate: ''
});

test('feed lists published cases and published editions, newest first', () => {
  const items = feedItems(model);
  assert.equal(items.length, model.published.length + 2);
  const dates = items.map(item => Date.parse(item.date));
  assert.deepEqual(dates, [...dates].sort((a, b) => b - a));
  assert.ok(items.every(item => item.link.startsWith('https://purrpetrators.net/')));
});

test('draft editions stay out of the feed', () => {
  const draft = { ...model.newsletters[0], id: '009', status: 'draft', date: undefined };
  const feed = renderFeed({ ...model, newsletters: [...model.newsletters, draft] });
  assert.ok(!feed.includes('/newsletter/009/'));
});

test('feed text is XML-escaped', () => {
  const tricky = { ...model, published: [{ ...model.published[0], incidentTitle: 'A <b> & "C"' }] };
  const feed = renderFeed(tricky);
  assert.ok(feed.includes('A &lt;b&gt; &amp; &quot;C&quot;'));
  assert.doesNotMatch(feed, /<b>/);
});

test('built site ships feed.xml and advertises it', async () => {
  const feed = await readFile(path.join(dist, 'feed.xml'), 'utf8');
  assert.match(feed, /^<\?xml/);
  assert.match(feed, /<atom:link href="https:\/\/purrpetrators\.net\/feed\.xml"/);
  const home = await readFile(path.join(dist, 'index.html'), 'utf8');
  assert.match(home, /rel="alternate" type="application\/rss\+xml"/);
});
