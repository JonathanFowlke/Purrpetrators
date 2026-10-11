import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { LINES, pickLine } = require('./not-found.js');

test('there are plenty of distinct 404 lines', () => {
  assert.ok(LINES.length >= 12);
  assert.equal(new Set(LINES).size, LINES.length);
});

test('pickLine stays in range for any random value', () => {
  assert.equal(pickLine(LINES, () => 0), LINES[0]);
  assert.equal(pickLine(LINES, () => 0.999999), LINES.at(-1));
});
