import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, mkdtemp, rm, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderNewsletter, validateNewsletter, createEdition, generateNewsletters } from './generate-newsletters.mjs';

const root = fileURLToPath(new URL('../',import.meta.url));
const template = await readFile(path.join(root,'scripts/templates/newsletter.html'),'utf8');
const edition = JSON.parse(await readFile(path.join(root,'data/newsletters/001.json'),'utf8'));
const cases = JSON.parse(await readFile(path.join(root,'data/cases.json'),'utf8'));

test('email escapes author text, keeps provider tags, and resolves a single case from source', () => {
  const record = structuredClone(edition);
  record.sections[0].blocks[0].runs = [{text:'<img src=x onerror=alert(1)> & "quoted"'}];
  const renamedCases = cases.map(c => ({...c,incidentTitle:'Updated title & detail'}));
  const html = renderNewsletter(record,renamedCases,template);
  assert.ok(html.includes('&lt;img src=x onerror=alert(1)&gt; &amp; &quot;quoted&quot;'));
  assert.ok(html.includes('Updated title &amp; detail'));
  assert.equal((html.match(/href="https:\/\/purrpetrators.net\/cases\/\d{3}\//g)||[]).length,1);
  for (const tag of ['UnsubscribeURL','RewardsURL']) assert.ok(html.includes(`href="{{${tag}}}"`));
  assert.ok(html.includes('{{SenderInfoLine}}'));
  assert.ok(html.includes(edition.preheader));
  assert.ok(!/<script\b|googletagmanager|\[\[/.test(html));
});

test('invalid case references, content, merge tags and unsafe templates fail', () => {
  for (const mutate of [
    r => {r.id='../002';},
    r => {r.status='sent';},
    r => {r.featuredCase.id='999';},
    r => {r.sections=[];},
    r => {r.sections[0].tone='url(evil)';},
    r => {r.sections[0].blocks[0].runs=[{text:'{{SenderInfoLine}}'}];},
    r => {r.sections[0].blocks[0].type='html';},
  ]) {
    const record=structuredClone(edition);mutate(record);
    assert.throws(()=>validateNewsletter(record,cases));
  }
  assert.throws(()=>validateNewsletter(edition,cases.map(c=>({...c,published:false}))));
  assert.throws(()=>renderNewsletter(edition,cases,template.replace('{{RewardsURL}}','')));
  assert.throws(()=>renderNewsletter(edition,cases,template+'<script>alert(1)</script>'));
});

test('scaffolding refuses overwrites; drafts stay off listing; generation is repeatable', async t => {
  const base=path.resolve(tmpdir());
  const workspace=await mkdtemp(path.join(base,'pnn-newsletter-test-'));
  t.after(async()=>{
    assert.equal(path.dirname(workspace),base);
    assert.ok(path.basename(workspace).startsWith('pnn-newsletter-test-'));
    await rm(workspace,{recursive:true,force:true});
  });
  for(const dir of ['data/newsletters','scripts/templates','newsletter','assets/images','assets/qr']) await mkdir(path.join(workspace,dir),{recursive:true});
  await writeFile(path.join(workspace,'scripts/templates/newsletter.html'),template);
  await writeFile(path.join(workspace,'data/cases.json'),JSON.stringify(cases));
  await writeFile(path.join(workspace,'data/newsletters/001.json'),JSON.stringify(edition));
  for(const asset of ['assets/images/pnn.png','assets/qr/pnn-dispatch-qr.png']) await writeFile(path.join(workspace,asset),'fixture');
  await writeFile(path.join(workspace,'newsletter/index.html'),'KEEP BEFORE\n<!-- BEGIN GENERATED NEWSLETTER EDITIONS -->old<!-- END GENERATED NEWSLETTER EDITIONS -->\nKEEP AFTER');
  await createEdition(workspace,'002');
  await assert.rejects(createEdition(workspace,'002'),{code:'EEXIST'});
  await assert.rejects(createEdition(workspace,'../003'));
  assert.equal(await generateNewsletters(workspace),2);
  await access(path.join(workspace,'newsletter/002/index.html'));
  const listing=await readFile(path.join(workspace,'newsletter/index.html'),'utf8');
  assert.ok(listing.includes('001/index.html'));
  assert.ok(!listing.includes('002/index.html'));
  assert.ok(listing.startsWith('KEEP BEFORE') && listing.endsWith('KEEP AFTER'));
  await generateNewsletters(workspace);
  assert.equal(await readFile(path.join(workspace,'newsletter/index.html'),'utf8'),listing);
  const invalid=structuredClone(edition);invalid.featuredCase.id='999';
  await writeFile(path.join(workspace,'data/newsletters/001.json'),JSON.stringify(invalid));
  const before=await readFile(path.join(workspace,'newsletter/001/index.html'),'utf8');
  await assert.rejects(generateNewsletters(workspace));
  assert.equal(await readFile(path.join(workspace,'newsletter/001/index.html'),'utf8'),before);
});
