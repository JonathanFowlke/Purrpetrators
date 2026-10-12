import { Link } from '../../lib/site.jsx';
import { OperationLabel } from '../ui/OperationLabel.jsx';

// Re-run Tally's embed loader once its script has loaded (replaces an inline onload attribute).
const LOAD_EMBEDS = "document.getElementById('tally-embed-script').addEventListener('load',function(){Tally.loadEmbeds()});";

/** Placeholder shown while a form provider has not been configured. */
export function OfflineNotice({ label, title, children, link }) {
  return (
    <div className="tip-offline">
      <OperationLabel>{label}</OperationLabel>
      <h3>{title}</h3>
      {children}
      {link ? <Link to={link.to}>{link.label}</Link> : null}
    </div>
  );
}

/**
 * Tally form embed with a direct-form fallback link. Only the public form ID is used; nothing is submitted
 * by this site and nothing is published automatically. Renders the offline notice when `formId` is empty.
 */
export function TallyEmbed({ formId, title, linkLabel, offline }) {
  if (!formId) return offline;
  return (
    <>
      <p className="tip-form-help">Form not loading? <a href={`https://tally.so/r/${formId}`} target="_blank" rel="noopener noreferrer">{linkLabel}</a>.</p>
      <iframe data-tally-src={`https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`} loading="lazy" width="100%" height="900" title={title} className="tip-embed" />
      <noscript><p>Enable JavaScript to use the embedded form, or use the direct form link above.</p></noscript>
      <script src="https://tally.so/widgets/embed.js" defer id="tally-embed-script" />
      <script dangerouslySetInnerHTML={{ __html: LOAD_EMBEDS }} />
    </>
  );
}
