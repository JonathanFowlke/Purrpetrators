import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { remaining, elapsed } = require('../public/scripts/countdown.js');
const config = JSON.parse(await readFile(new URL('../data/countdown.json', import.meta.url), 'utf8'));

test('the party is Saturday, October 24, 2026 at 5:30 PM Mountain Time', () => {
  assert.equal(config.timeZone, 'America/Denver');
  const formatted = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short', timeZone: config.timeZone }).format(new Date(config.target));
  assert.match(formatted, /Saturday, October 24, 2026/);
  assert.match(formatted, /5:30\s?PM/);
});

test('remaining time is split into days, hours, minutes, and seconds', () => {
  const target = Date.parse('2026-10-24T17:30:00-06:00');
  const now = Date.parse('2026-10-10T15:00:00-06:00');
  const left = remaining(target, now);
  assert.deepEqual([left.days, left.hours, left.minutes, left.seconds], [14, 2, 30, 0]);
  assert.equal(left.done, false);
});

test('the countdown stops at zero and stays done afterwards', () => {
  const target = Date.parse('2026-10-24T17:30:00-06:00');
  assert.equal(remaining(target, target).done, true);
  assert.equal(remaining(target, target + 86400000).done, true);
  assert.equal(remaining(target, target - 1500).seconds, 1);
});

test('the reign clock counts up from the final result and never goes negative', async () => {
  const results = JSON.parse(await readFile(new URL('../data/final-results.json', import.meta.url), 'utf8'));
  const since = Date.parse(results.decidedAt);
  assert.equal(since, Date.parse('2026-10-24T22:15:00-06:00'));
  const later = elapsed(since, Date.parse('2026-10-26T23:20:05-06:00'));
  assert.deepEqual([later.days, later.hours, later.minutes, later.seconds], [2, 1, 5, 5]);
  assert.deepEqual(Object.values(elapsed(since, since - 5000)), [0, 0, 0, 0]);
});
