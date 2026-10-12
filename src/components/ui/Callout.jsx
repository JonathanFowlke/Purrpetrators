import { HomeLink } from './HomeLink.jsx';
import { OperationLabel } from './OperationLabel.jsx';

/**
 * Teaser panel with a label, heading, body copy, and one call-to-action link.
 * `tip` adds the tip-callout styling used for Tip Line prompts.
 */
export function Callout({ id, label, title, tip = false, action, children }) {
  return (
    <section className={`case-teaser${tip ? ' tip-callout' : ''}`} aria-labelledby={id}>
      <div>
        <OperationLabel>{label}</OperationLabel>
        <h2 id={id}>{title}</h2>
        {children}
      </div>
      <HomeLink to={action.to}>{action.label}</HomeLink>
    </section>
  );
}
