import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderNewsletter, validateNewsletter } from '../src/email/newsletter.js';
import { listedEditions } from '../src/lib/model.js';
import { createEdition } from '../scripts/new-edition.mjs';

const root = fileURLToPath(new URL('../',import.meta.url));
const template = await readFile(path.join(root,'src/email/newsletter.html'),'utf8');
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

test('scaffolding refuses overwrites and bad IDs; drafts stay off the listing', async t => {
  const base=path.resolve(tmpdir());
  const workspace=await mkdtemp(path.join(base,'pnn-newsletter-test-'));
  t.after(async()=>{
    assert.equal(path.dirname(workspace),base);
    assert.ok(path.basename(workspace).startsWith('pnn-newsletter-test-'));
    await rm(workspace,{recursive:true,force:true});
  });
  await createEdition(workspace,'002');
  await assert.rejects(createEdition(workspace,'002'),{code:'EEXIST'});
  await assert.rejects(createEdition(workspace,'../003'));
  const draft=JSON.parse(await readFile(path.join(workspace,'data/newsletters/002.json'),'utf8'));
  validateNewsletter(draft,cases);
  assert.deepEqual(listedEditions([edition,draft]).map(item=>item.id),['001']);
});

test('buttons and inline links render, stay on the PNN site, and the featured case is one button with an exhibit count', () => {
  const record = structuredClone(edition);
  record.featuredCase.hook = 'including a suspect sketch';
  record.sections[0].blocks.push({ type: 'cta', label: 'Open the file', href: 'https://purrpetrators.net/cases/005/', note: 'Evidence is on the site.' });
  record.sections[0].blocks[0].runs = [{ text: 'Read ' }, { text: 'PNN-005', bold: true, href: 'https://purrpetrators.net/cases/005/' }];
  const html = renderNewsletter(record, cases, template);
  const featured = cases.find(c => c.id === record.featuredCase.id);
  assert.ok(html.includes(`${featured.evidence.length} exhibits on file, including a suspect sketch.`));
  assert.ok(html.includes('>Open the file</a>') && html.includes('Evidence is on the site.'));
  assert.ok(html.includes('href="https://purrpetrators.net/cases/005/?utm_source=newsletter&amp;utm_medium=email&amp;utm_campaign=edition-001&amp;utm_content=s0-link" style="color:'));
  assert.ok(html.includes('bgcolor="#f699be"') && html.includes('bgcolor="#b60060"'));
  for (const bad of ['https://example.com/', 'http://purrpetrators.net/', 'https://purrpetrators.net.evil.test/', 'https://purrpetrators.net/a?b=c', 'javascript:alert(1)']) {
    const withRun = structuredClone(edition);
    withRun.sections[0].blocks[0].runs = [{ text: 'x', href: bad }];
    assert.throws(() => validateNewsletter(withRun, cases), undefined, `run link ${bad}`);
    const withCta = structuredClone(edition);
    withCta.sections[0].blocks.push({ type: 'cta', label: 'x', href: bad });
    assert.throws(() => validateNewsletter(withCta, cases), undefined, `button link ${bad}`);
  }
});

test('every site link is tagged with the edition and placement, and provider links are left alone', () => {
  const html = renderNewsletter(structuredClone(edition), cases, template);
  const siteLinks = html.match(/href="https:\/\/purrpetrators\.net[^"]*"/g) || [];
  assert.ok(siteLinks.length >= 5);
  for (const link of siteLinks) assert.ok(link.includes('?utm_source=newsletter&amp;utm_medium=email&amp;utm_campaign=edition-001&amp;utm_content='), link);
  for (const name of ['logo', 'featured-button', 'footer-dispatch', 'footer-tips', 'footer-corrections']) assert.ok(html.includes('utm_content=' + name + '"'), name);
  assert.ok(html.includes('href="{{UnsubscribeURL}}"') && html.includes('href="tel:+18017977265"'));
});

test('a featured image links to the case, carries alt text and a caption, and must be an email-sized asset', () => {
  const record = structuredClone(edition);
  record.featuredCase.image = { src: 'assets/email/004-suspect-composite.jpg', width: 1056, height: 792, alt: 'A sketch.', caption: 'AI-generated reconstruction.' };
  const html = renderNewsletter(record, cases, template);
  assert.ok(html.includes('src="https://purrpetrators.net/assets/email/004-suspect-composite.jpg" width="528" height="396" alt="A sketch."'));
  assert.ok(html.includes('utm_content=featured-image') && html.includes('AI-generated reconstruction.'));
  for (const bad of [{ src: 'assets/evidence/008/pyro-posse-doorstep-suspect-composite.png' }, { src: 'https://example.com/x.jpg' }, { alt: '' }, { caption: '' }, { width: 0 }]) {
    const broken = structuredClone(record);
    Object.assign(broken.featuredCase.image, bad);
    assert.throws(() => validateNewsletter(broken, cases), undefined, JSON.stringify(bad));
  }
});

test('the footer has one dispatch button and no QR code', () => {
  const html = renderNewsletter(structuredClone(edition), cases, template);
  assert.ok(!html.includes('pnn-dispatch-qr'));
  assert.equal((html.match(/utm_content=footer-dispatch/g) || []).length, 1);
  assert.ok(html.includes('tel:+18017977265') && html.includes('Open the Corrections Desk'));
});
