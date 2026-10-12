// Strict parsing of third-party embed URLs. Only public form IDs are kept; pasted URLs are never trusted verbatim.

/** Returns the Tally form ID from a published respondent link, '' when unconfigured, or throws. */
export function parseTallyFormId(formUrl) {
  if (typeof formUrl !== 'string') throw new Error('formUrl must be a string.');
  if (!formUrl.trim()) return '';
  const url = new URL(formUrl.trim());
  const match = url.pathname.match(/^\/r\/([A-Za-z0-9]+)\/?$/);
  if (url.origin !== 'https://tally.so' || url.username || url.password || !match) {
    throw new Error('Use the published respondent link: https://tally.so/r/FORM_ID');
  }
  return match[1];
}

/** Returns { src, formId } from an EmailOctopus embed script URL, null when unconfigured, or throws. */
export function parseEmbedScript(embedSrc) {
  if (typeof embedSrc !== 'string') throw new Error('embedSrc must be a string.');
  const value = embedSrc.trim();
  if (!value) return null;
  let url;
  try { url = new URL(value); } catch { throw new Error('embedSrc must be a valid absolute URL.'); }
  // EmailOctopus serves form embeds from sharded eomailN.com domains: https://eomailN.com/form/FORM_ID.js
  const match = url.pathname.match(/^\/form\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.js$/i);
  if (url.protocol !== 'https:' || url.username || url.password || !/^eomail\d+\.com$/i.test(url.hostname) || !match) {
    throw new Error('Use the official EmailOctopus embed script URL: https://eomailN.com/form/FORM_ID.js');
  }
  return { src: url.href, formId: match[1] };
}
