import { OperationLabel } from '../ui/OperationLabel.jsx';

/** Two-column layout: guidance aside on the left, form panel on the right. */
export function TipLayout({ children }) {
  return <div className="tip-layout">{children}</div>;
}

/** Guidance aside made of GuidanceSections. */
export function GuidanceAside({ label, children }) {
  return <aside className="tip-guidance" aria-label={label}>{children}</aside>;
}

export function GuidanceSection({ label, title, children }) {
  return (
    <section>
      {label ? <OperationLabel>{label}</OperationLabel> : null}
      <h2>{title}</h2>
      {children}
    </section>
  );
}

/** Panel that holds a form embed, its privacy note, and a heading. */
export function TipPanel({ id, title, privacy, children }) {
  return (
    <section className="tip-panel" aria-labelledby={id}>
      <OperationLabel>Inspector Clueso's office · PNN</OperationLabel>
      <h2 id={id}>{title}</h2>
      <p className="tip-privacy">{privacy}</p>
      {children}
    </section>
  );
}
