import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Printed QR codes, fliers, and emails point at these URLs. They must keep working after any refactor.
const dist = path.join(fileURLToPath(new URL('../', import.meta.url)), 'dist');
const PERMANENT_FILES = [
  'index.html', '404.html', 'robots.txt', 'CNAME',
  'cases/index.html', 'cases/001/index.html', 'cases/002/index.html', 'cases/003/index.html', 'cases/004/index.html', 'cases/005/index.html', 'cases/006/index.html',
  'teams/index.html', 'teams/black/index.html', 'teams/green/index.html', 'teams/orange/index.html', 'teams/pink/index.html',
  'teams/red/index.html', 'teams/silver/index.html', 'teams/white/index.html',
  'tips/index.html', 'tips/flier.html', 'corrections/index.html',
  'newsletter/index.html', 'newsletter/001/index.html', 'dispatch/index.html',
  'resources/index.html', 'resources/cards.html', 'resources/pranked.html',
  'data/cases.json', 'data/news-ticker.json', 'scripts/ticker.js', 'scripts/dispatch.js',
  'assets/qr/pnn-tips-qr.svg', 'assets/qr/pnn-dispatch-qr.svg', 'assets/qr/pnn-dispatch-qr.png', 'assets/images/pnn.png'
];

test('every permanent URL is present in the built site', async () => {
  for (const file of PERMANENT_FILES) await access(path.join(dist, file));
});

test('the custom domain file is kept', async () => {
  assert.equal((await readFile(path.join(dist, 'CNAME'), 'utf8')).trim(), 'purrpetrators.net');
});

test('pages are static documents: the website ships no React runtime', async () => {
  const home = await readFile(path.join(dist, 'index.html'), 'utf8');
  assert.match(home, /^<!doctype html>/i);
  assert.doesNotMatch(home, /<script[^>]+src="[^"]*(react|chunk|index-[\w-]+\.js)/i);
  assert.doesNotMatch(home, /data-reactroot|__NEXT/);
});

test('the unlisted resources page has no incoming site links', async () => {
  for (const file of ['index.html', 'cases/index.html', 'tips/index.html', 'newsletter/index.html', 'teams/index.html']) {
    assert.doesNotMatch(await readFile(path.join(dist, file), 'utf8'), /resources\/(index|cards|pranked)/, `unexpected link to resources from ${file}`);
  }
});
