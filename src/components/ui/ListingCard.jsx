import { Link } from '../../lib/site.jsx';
import { OperationLabel } from './OperationLabel.jsx';

/** Card for archive listings (cases, newsletter editions): label, linked title, then body copy. */
export function ListingCard({ label, title, to, children }) {
  return (
    <article className="case-card">
      <OperationLabel>{label}</OperationLabel>
      <h2><Link to={to}>{title}</Link></h2>
      {children}
    </article>
  );
}

/** Grid wrapper for ListingCards with a fallback line when there is nothing to list. */
export function CardList({ empty, children, items }) {
  return <div className="case-list">{items && items.length ? children : empty}</div>;
}
