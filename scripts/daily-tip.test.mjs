import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';

const require = createRequire(import.meta.url);
const { pickTip } = require('./daily-tip.js');
const tips = JSON.parse(await readFile(new URL('../data/daily-tips.json', import.meta.url), 'utf8'));

test('the tip list is large enough and well formed', () => {
  assert.ok(tips.length >= 20);
  assert.equal(new Set(tips.map(tip => tip.text)).size, tips.length);
  for (const tip of tips) assert.ok(tip.topic.trim() && tip.text.trim());
});

test('consecutive days show different tips and the list cycles', () => {
  const first = new Date(2026, 9, 10);
  const seen = new Set();
  for (let i = 0; i < tips.length; i += 1) seen.add(pickTip(tips, new Date(2026, 9, 10 + i)).text);
  assert.equal(seen.size, tips.length);
  assert.notEqual(pickTip(tips, first).text, pickTip(tips, new Date(2026, 9, 11)).text);
  assert.equal(pickTip(tips, first).text, pickTip(tips, new Date(2026, 9, 10 + tips.length)).text);
});

test('an empty list yields no tip', () => {
  assert.equal(pickTip([], new Date()), null);
});

test('the browser script swaps in the tip and keeps the fallback on bad data', async () => {
  const source = await readFile(new URL('./daily-tip.js', import.meta.url), 'utf8');
  const run = json => {
    const els = { 'daily-tips-data': { textContent: json }, 'daily-tip-topic': { textContent: 'fallback topic' }, 'daily-tip-text': { textContent: 'fallback text' } };
    runInNewContext(source, { window: { document: { getElementById: id => els[id] } }, document: { getElementById: id => els[id] }, Date });
    return els;
  };
  const good = run(JSON.stringify(tips));
  assert.notEqual(good['daily-tip-text'].textContent, 'fallback text');
  const bad = run('not json');
  assert.equal(bad['daily-tip-text'].textContent, 'fallback text');
});
