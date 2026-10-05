import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

const source = await readFile(new URL('./dispatch.js', import.meta.url), 'utf8');
async function visit(records, random = 0, fail = false) {
  let destination;
  let request;
  let cleared = false;
  const status = { textContent: '' };
  runInNewContext(source, {
    URL, AbortController, Math: { random: () => random, floor: Math.floor },
    document: { currentScript: { src: 'https://example.test/Purrpetrators/scripts/dispatch.js' }, getElementById: () => status },
    window: { setTimeout: () => 1, clearTimeout: () => { cleared = true; }, location: { replace: url => { destination = url; } } },
    fetch: async (url, options) => {
      request = { url: url.href, cache: options.cache };
      if (fail) throw new Error('Offline');
      return { ok: true, json: async () => records };
    }
  });
  await new Promise(resolve => setImmediate(resolve));
  return { destination, request, status: status.textContent, cleared };
}

test('new published cases are eligible; drafts, malformed IDs, and duplicates are excluded', async () => {
  const records = [{ id: '001', published: true }, { id: '002', published: false },
    { id: '../evil', published: true }, { id: '003', published: true },
    { id: '001', published: true }, null, { id: '004', published: 'true' }];
  const first = await visit(records, 0);
  const last = await visit(records, .999);
  assert.equal(first.destination, 'https://example.test/Purrpetrators/cases/001/index.html');
  assert.equal(last.destination, 'https://example.test/Purrpetrators/cases/003/index.html');
  assert.equal(first.request.cache, 'no-store');
  assert.equal(first.request.url, 'https://example.test/Purrpetrators/data/cases.json');
  assert.equal(first.cleared, true);
});

test('empty and unavailable collections leave a useful fallback rather than redirecting', async () => {
  for (const result of [await visit([]), await visit({}, 0), await visit([], 0, true)]) {
    assert.equal(result.destination, undefined);
    assert.ok(result.status.length > 0);
    assert.equal(result.cleared, true);
  }
});
