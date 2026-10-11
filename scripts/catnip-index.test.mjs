import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { dailyOffset, springWidth, adjustedTarget, dayKeyFor, MAX_DRIFT } = require('./catnip-index.js');

test('daily drift is deterministic, bounded, and changes from day to day', () => {
  assert.equal(dailyOffset('2026-10-10', 'orange|left'), dailyOffset('2026-10-10', 'orange|left'));
  const offsets = new Set();
  for (let day = 1; day <= 30; day += 1) {
    const offset = dailyOffset(`2026-10-${day}`, 'orange|left');
    assert.ok(Math.abs(offset) <= MAX_DRIFT);
    offsets.add(offset.toFixed(3));
  }
  assert.ok(offsets.size > 25);
  assert.notEqual(dailyOffset('2026-10-10', 'orange|left'), dailyOffset('2026-10-10', 'white|left'));
});

test('empty bars stay empty and adjusted bars stay on the scale', () => {
  assert.equal(adjustedTarget(0, '2026-10-10', 'pink|left'), 0);
  for (const base of [5, 50, 100]) {
    const value = adjustedTarget(base, '2026-10-10', 'x|right');
    assert.ok(value >= 2 && value <= 100);
  }
});

test('the spring starts at zero, bounces past the target, and settles on it', () => {
  const target = 60;
  assert.equal(springWidth(0, target, 7, 0.15), 0);
  let peak = 0;
  for (let t = 0; t < 2; t += 0.01) peak = Math.max(peak, springWidth(t, target, 7, 0.15));
  assert.ok(peak > target + 3, 'expected an overshoot');
  assert.ok(Math.abs(springWidth(6, target, 7, 0.15) - target) < 0.2);
  assert.equal(springWidth(1, 0, 7, 0.15), 0);
});

test('day keys use the local calendar date', () => {
  assert.equal(dayKeyFor(new Date(2026, 9, 10, 23, 59)), '2026-10-10');
  assert.equal(dayKeyFor(new Date(2026, 9, 11, 0, 1)), '2026-10-11');
});

test('the team order is a permutation that changes from day to day', () => {
  const { orderForDay } = require('./catnip-index.js');
  const teams = ['black', 'green', 'orange', 'pink', 'red', 'silver', 'white'];
  const orders = new Set();
  for (let day = 1; day <= 14; day += 1) {
    const order = orderForDay(`2026-10-${day}`, teams);
    assert.deepEqual([...order].sort(), [...teams].sort());
    orders.add(order.join());
  }
  assert.ok(orders.size >= 12);
  assert.equal(orderForDay('2026-10-10', teams).join(), orderForDay('2026-10-10', teams).join());
});
