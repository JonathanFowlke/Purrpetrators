// EmailOctopus newsletter rendering: pure functions from an edition record to standalone email HTML.
// Email clients need inline-styled tables, so this is a string template rather than React markup.
// The shell lives in src/email/newsletter.html; the site chrome, scripts, and analytics never appear here.
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const lines = value => escape(value).replace(/\n/g, '<br>');
const richLines = value => lines(value).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>');
const tones = {dark:'#30212c', white:'#ffffff', blush:'#fff5f8', pink:'#ffdeed'};
const paragraphStyle = 'margin:0 0 16px;font-size:18px;line-height:28px;';
const labelStyle = 'margin:0 0 12px;font-size:16px;line-height:22px;font-weight:bold;letter-spacing:2px;';

function text(value, name) {
  if (typeof value !== 'string' || !value.trim() || /\{\{|\{%|\[\[/.test(value)) throw new Error(`Invalid ${name}`);
}

export function validateNewsletter(record, cases) {
  if (typeof record.id !== 'string' || !/^\d{3}$/.test(record.id)) throw new Error('Edition ID must be a three-digit string.');
  if (!['draft','sample','published'].includes(record.status)) throw new Error(`Invalid status: ${record.id}`);
  for (const key of ['title','subject','preheader']) text(record[key], key);
  if (!Array.isArray(record.sections) || !record.sections.length) throw new Error('At least one section is required.');
  for (const section of record.sections) {
    if (!Object.hasOwn(tones, section.tone)) throw new Error('Invalid section tone.');
    text(section.heading, 'section heading');
    if (section.kicker !== undefined) text(section.kicker, 'section kicker');
    if (!Array.isArray(section.blocks) || !section.blocks.length) throw new Error('Section blocks are required.');
    for (const block of section.blocks) {
      if (block.type === 'paragraph') {
        if (!Array.isArray(block.runs) || !block.runs.length || !block.runs.some(run => typeof run.text === 'string' && run.text.trim())) throw new Error('Paragraph text is required.');
        for (const run of block.runs) {
          if (typeof run.text !== 'string' || /\{\{|\{%|\[\[/.test(run.text)) throw new Error('Invalid text run.');
          for (const flag of ['bold','italic']) if (run[flag] !== undefined && typeof run[flag] !== 'boolean') throw new Error(`Invalid ${flag} flag.`);
        }
      } else if (block.type === 'stats') {
        if (!Array.isArray(block.items) || !block.items.length) throw new Error('Statistics items are required.');
        for (const item of block.items) {text(item.value, 'statistic value');text(item.text, 'statistic explanation');}
      } else throw new Error(`Unsupported block type: ${block.type}`);
    }
  }
  if (record.featuredCase !== undefined) {
    const feature = record.featuredCase;
    if (!feature || typeof feature.id !== 'string' || !/^\d{3}$/.test(feature.id) || !cases.some(c => c.id === feature.id && c.published)) throw new Error('Featured case must reference a published case.');
    text(feature.teaser, 'case teaser');text(feature.linkLabel, 'case link label');
  }
}

function renderSection(section, index, isFirst) {
  const light = section.tone !== 'dark';
  const accent = light ? '#b60060' : '#f699be';
  const heading = isFirst ? 'h1' : 'h2';
  const blocks = section.blocks.map(block => {
    if (block.type === 'paragraph') {
      const content = block.runs.map(run => {
        let value = lines(run.text);
        if (run.bold) value = `<strong>${value}</strong>`;
        if (run.italic) value = `<em>${value}</em>`;
        return value;
      }).join('');
      return `<p style="${paragraphStyle}">${content}</p>`;
    }
    return `<table role="presentation" width="100%" style="width:100%;">${block.items.map(item => `<tr><td style="padding:14px 0;border-top:1px solid #dbb8c9;font-size:18px;line-height:27px;"><strong style="font-size:30px;color:${accent};">${escape(item.value)}</strong><br>${richLines(item.text)}</td></tr>`).join('')}</table>`;
  }).join('\n');
  return `<tr><td class="pad" style="padding:28px 36px;background-color:${tones[section.tone]};color:${light ? '#30212c' : '#ffffff'};">
${section.kicker ? `<p style="${labelStyle}color:${accent};">${escape(section.kicker)}</p>` : ''}
<${heading}${isFirst ? ' class="headline"' : ''} style="margin:0 0 18px;font-size:${isFirst ? '46' : '28'}px;line-height:${isFirst ? '49' : '32'}px;">${lines(section.heading)}</${heading}>
${blocks}
</td></tr>`;
}

export function renderNewsletter(record, cases, template) {
  validateNewsletter(record, cases);
  const hasFeature = Boolean(record.featuredCase);
  // The edition opens with a quick, spoiler-light hint toward the latest case before the main comedic feature.
  let content = '';
  if (hasFeature) {
    const feature = record.featuredCase;
    const item = cases.find(c => c.id === feature.id);
    content += `<tr><td class="pad" style="padding:28px 36px;background-color:#30212c;color:#ffffff;border-bottom:4px solid #b60060;">
<p style="${labelStyle}color:#f699be;">LATEST CASE FILE / ${escape(item.caseNumber)}</p>
<h1 class="headline" style="margin:0 0 18px;font-size:46px;line-height:49px;">${escape(item.incidentTitle)}</h1>
<p style="${paragraphStyle}">${richLines(feature.teaser)}</p>
<p style="margin:0;font-size:18px;line-height:27px;"><a href="https://purrpetrators.net/cases/${feature.id}/" style="color:#f699be;text-decoration:underline;font-weight:bold;">${escape(feature.linkLabel)}</a></p>
</td></tr>`;
  }
  content += record.sections.map((section, index) => renderSection(section, index, !hasFeature && index === 0)).join('\n');
  const values = {ID:record.id, TITLE:escape(record.title), SUBJECT:escape(record.subject), PREHEADER:escape(record.preheader), STATUS:record.status.toUpperCase(), CONTENT:content,
    SAMPLE_NOTICE:record.status === 'published' ? '' : `<p style="margin:0;font-size:16px;line-height:24px;">${record.status === 'draft' ? 'Draft' : 'Sample'} edition for review. No email subscription is created by viewing this page.</p>`};
  for (const key of Object.keys(values)) if (!template.includes(`[[${key}]]`)) throw new Error(`Template is missing ${key}.`);
  const html = template.replace(/\[\[(\w+)\]\]/g, (_, key) => {
    if (!Object.hasOwn(values, key)) throw new Error(`Unknown template token: ${key}`);
    return values[key];
  });
  for (const tag of ['UnsubscribeURL','RewardsURL']) if (!html.includes(`href="{{${tag}}}"`)) throw new Error(`Missing EmailOctopus link: ${tag}`);
  if (!html.includes('{{SenderInfoLine}}')) throw new Error('Missing sender-info tag.');
  if (/<script\b|googletagmanager/i.test(html)) throw new Error('Scripts and website analytics do not belong in email HTML.');
  return html;
}
