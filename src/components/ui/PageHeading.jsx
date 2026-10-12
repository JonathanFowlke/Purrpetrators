import { Eyebrow } from './Eyebrow.jsx';

/** Opening block of a content page: eyebrow, h1, intro, and any extra copy as children. */
export function PageHeading({ className = 'tip-heading', eyebrow, title, intro, signature = false, children }) {
  return (
    <header className={className}>
      <Eyebrow rule>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      {intro ? <p className="intro">{intro}</p> : null}
      {children}
      {signature ? <p className="signature">— Inspector Clueso, PNN</p> : null}
    </header>
  );
}
