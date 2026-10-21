import test from 'node:test';
import assert from 'node:assert/strict';
import { suspectTeamsOf } from '../src/lib/model.js';
import { loadRawData, validateRawData } from '../scripts/lib/load-data.mjs';

const teamById = new Map(['black', 'green', 'pink'].map(id => [id, { id }]));

test('a case with no co-suspects has one subject team', () => {
  assert.deepEqual(suspectTeamsOf({ suspectTeamId: 'black' }, teamById).map(t => t.id), ['black']);
});

test('co-suspects follow the lead subject, in order', () => {
  assert.deepEqual(suspectTeamsOf({ suspectTeamId: 'black', coSuspectTeamIds: ['green', 'pink'] }, teamById).map(t => t.id), ['black', 'green', 'pink']);
});

test('validation accepts valid co-suspects and rejects bad ones', async () => {
  const raw = await loadRawData();
  const record = raw.cases[0];
  const original = record.coSuspectTeamIds;
  const check = ids => { record.coSuspectTeamIds = ids; return validateRawData(raw); };
  await check(['green']);
  await assert.rejects(check([]), /coSuspectTeamIds/);
  await assert.rejects(check([record.suspectTeamId]), /coSuspectTeamIds/);
  await assert.rejects(check(['green', 'green']), /coSuspectTeamIds/);
  await assert.rejects(check(['purple']), /coSuspectTeamIds/);
  if (original === undefined) delete record.coSuspectTeamIds; else record.coSuspectTeamIds = original;
});
