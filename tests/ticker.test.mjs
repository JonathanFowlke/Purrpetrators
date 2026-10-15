import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { buildSequence, shuffle, mergePool } = require('../public/scripts/ticker.js');
const { mergeTickerPool } = await import('../src/lib/model.js');
const readJson = async path => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));
const generic = await readJson('../data/news-ticker.json');
const cases = await readJson('../data/cases.json');
const editions = await Promise.all(['001', '002', '003'].map(id => readJson(`../data/newsletters/${id}.json`)));
const pool = mergePool(generic, cases, editions);

test('the headline pool is large, well formed, and free of duplicates', () => {
  assert.ok(pool.length >= 100);
  assert.equal(new Set(pool.map(item => item.text)).size, pool.length);
  for (const item of pool) {
    assert.ok(item.tag.trim() && item.text.trim());
    assert.ok(item.text.length <= 170, `too long: ${item.text}`);
  }
});

test('shuffle keeps every item exactly once', () => {
  const out = shuffle([1, 2, 3, 4, 5, 6], Math.random);
  assert.deepEqual([...out].sort(), [1, 2, 3, 4, 5, 6]);
});

test('every fixed headline appears, spread among a random sample of pool items', () => {
  const fixed = [{ tag: 'CASE FILE PNN-001', text: 'one' }, { tag: 'CASE FILE PNN-002', text: 'two' }, { tag: 'INDEX', text: 'three' }];
  const seq = buildSequence(fixed, pool, 24, Math.random);
  assert.equal(seq.filter(step => step.fixed).length, 3);
  assert.equal(seq.filter(step => !step.fixed).length, 24);
  const positions = seq.map((step, index) => (step.fixed ? index : -1)).filter(index => index >= 0);
  assert.ok(positions[2] - positions[0] >= 4, 'fixed items should be spread out');
  assert.equal(new Set(seq.filter(step => !step.fixed).map(step => step.item.text)).size, 24);
});

test('works with no fixed items or a tiny pool', () => {
  assert.equal(buildSequence([], pool, 5, Math.random).length, 5);
  assert.equal(buildSequence([{ tag: 'A', text: 'b' }], pool.slice(0, 2), 24, Math.random).length, 3);
});

test('every published case and every listed edition carries its own ticker headlines', () => {
  for (const record of cases.filter(item => item.published)) assert.ok((record.tickerItems || []).length >= 3, `case ${record.id} needs 3+ tickerItems`);
  for (const edition of editions.filter(item => item.status !== 'draft')) assert.ok((edition.tickerItems || []).length >= 2, `edition ${edition.id} needs 2+ tickerItems`);
});

test('headlines about a case or edition live in its record, not the generic pool', () => {
  const owned = [...cases, ...editions].flatMap(record => (record.tickerItems || []).map(item => item.text));
  assert.equal(new Set(owned).size, owned.length, 'owned ticker items must be unique');
  for (const text of owned) assert.ok(!generic.some(item => item.text === text), `also in news-ticker.json: ${text}`);
});

test('merging adds published cases and non-draft editions once, after the generic pool', () => {
  const base = [{ tag: 'A', text: 'one' }];
  const records = [
    { published: true, tickerItems: [{ tag: 'B', text: 'two' }, { tag: 'B', text: 'one' }] },
    { published: false, tickerItems: [{ tag: 'C', text: 'three' }] },
    { published: true }
  ];
  const issues = [
    { status: 'published', tickerItems: [{ tag: 'D', text: 'four' }] },
    { status: 'draft', tickerItems: [{ tag: 'E', text: 'five' }] }
  ];
  const expected = ['one', 'two', 'four'];
  assert.deepEqual(mergePool(base, records, issues).map(item => item.text), expected);
  assert.deepEqual(mergeTickerPool(base, records, issues).map(item => item.text), expected);
});

test('the build-time merge and the browser merge agree on the real data', () => {
  assert.deepEqual(mergeTickerPool(generic, cases, editions), pool);
});
