import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const skip = new Set(['.git', 'node_modules', '.idea', '.claude', '.playwright-mcp']);

async function pages(dir, out = []) {
  for (const name of await readdir(dir)) {
    if (skip.has(name)) continue;
    const full = path.join(dir, name);
    if ((await stat(full)).isDirectory()) await pages(full, out);
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

test('robots.txt blocks all crawlers', async () => {
  const text = await readFile(path.join(root, 'robots.txt'), 'utf8');
  assert.match(text, /User-agent: \*\s+Disallow: \//);
});

test('every HTML page asks search engines not to index it, and keeps the analytics tag where it had one', async () => {
  const files = await pages(root);
  assert.ok(files.length > 10);
  for (const file of files) {
    const html = await readFile(file, 'utf8');
    assert.match(html, /<meta\s+name="robots"\s+content="[^"]*noindex/i, `missing noindex: ${path.relative(root, file)}`);
  }
});

test('the noindex tags do not remove Google Analytics from website pages', async () => {
  const home = await readFile(path.join(root, 'index.html'), 'utf8');
  assert.match(home, /G-KGKE2M052Z/);
  const generator = await readFile(path.join(root, 'scripts/generate-cases.mjs'), 'utf8');
  assert.match(generator, /G-KGKE2M052Z/);
});
