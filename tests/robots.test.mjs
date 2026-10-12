import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// These tests check the built site, so run `npm run build` first (`npm test` does).
const dist = path.join(fileURLToPath(new URL('../', import.meta.url)), 'dist');
const emailEditions = /^newsletter\/\d{3}\/index\.html$/;

async function pages(dir, out = []) {
  for (const name of await readdir(dir)) {
    const full = path.join(dir, name);
    if ((await stat(full)).isDirectory()) await pages(full, out);
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

const rel = file => path.relative(dist, file).split(path.sep).join('/');

test('robots.txt blocks all crawlers', async () => {
  const text = await readFile(path.join(dist, 'robots.txt'), 'utf8');
  assert.match(text, /User-agent: \*\s+Disallow: \//);
});

test('every built HTML page asks search engines not to index it', async () => {
  const files = await pages(dist);
  assert.ok(files.length > 10);
  for (const file of files) {
    const html = await readFile(file, 'utf8');
    assert.match(html, /<meta\s+name="robots"\s+content="[^"]*noindex/i, `missing noindex: ${rel(file)}`);
  }
});

test('website pages keep Google Analytics; email editions have no scripts or analytics', async () => {
  for (const file of await pages(dist)) {
    const html = await readFile(file, 'utf8');
    if (emailEditions.test(rel(file))) {
      assert.doesNotMatch(html, /<script\b|googletagmanager|G-KGKE2M052Z/i, `email must not carry scripts: ${rel(file)}`);
    } else {
      assert.match(html, /G-KGKE2M052Z/, `missing analytics tag: ${rel(file)}`);
    }
  }
});
