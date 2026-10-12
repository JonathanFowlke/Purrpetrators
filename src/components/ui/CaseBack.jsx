import { Link } from '../../lib/site.jsx';

/** "← All case files" style back link. */
export function CaseBack({ to, children }) {
  return <Link className="case-back" to={to}>{children}</Link>;
}
