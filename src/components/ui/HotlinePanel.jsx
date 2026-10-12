import { OperationLabel } from './OperationLabel.jsx';

/** Panel with copy on the left and a prominent contact (or embed) on the right. */
export function HotlinePanel({ id, label, title, children, aside }) {
  return (
    <section className="hotline-panel" aria-labelledby={id}>
      <div>
        <OperationLabel>{label}</OperationLabel>
        <h2 id={id}>{title}</h2>
        {children}
      </div>
      {aside}
    </section>
  );
}

/** The large contact link inside a HotlinePanel: a phone number or email address. */
export function ContactLink({ href, ariaLabel, text, note }) {
  return (
    <div className="hotline-number">
      <a href={href} aria-label={ariaLabel}>{text}</a>
      <span>{note}</span>
    </div>
  );
}
