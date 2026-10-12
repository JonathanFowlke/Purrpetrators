import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Redaction bars replace names and identifying detail. The markup must render as bars, never as literal [[redacted]] text.
const dist = path.join(fileURLToPath(new URL('../', import.meta.url)), 'dist');
const read = file => readFile(path.join(dist, file), 'utf8');
const widths = html => [...html.matchAll(/--redacted-w:([\d.]+)em/g)].map(match => match[1]);

test('case pages render redaction bars with the REDACTED stamp', async () => {
  for (const id of ['003', '005']) {
    const html = await read(`cases/${id}/index.html`);
    assert.match(html, /class="redacted"/, `case ${id} has a redaction bar`);
    assert.match(html, />REDACTED</);
    assert.doesNotMatch(html, /\[\[\s*redacted/i, `case ${id} leaks raw markup`);
  }
});

test('bars on one page vary in width', async () => {
  const found = widths(await read('cases/005/index.html'));
  assert.ok(found.length >= 3);
  assert.ok(new Set(found).size > 1, `expected varied widths, got ${found}`);
});

test('the Tip Line page redacts the submitter in the file', async () => {
  assert.match(await read('tips/index.html'), /class="redacted"/);
});
