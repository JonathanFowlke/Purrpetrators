import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { buildSequence, shuffle } = require('./ticker.js');
const pool = JSON.parse(await readFile(new URL('../data/news-ticker.json', import.meta.url), 'utf8'));

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
