import { Link } from '../../lib/site.jsx';

/** The filled magenta call-to-action link. */
export function HomeLink({ className = '', ...props }) {
  return <Link className={`home-link${className ? ` ${className}` : ''}`} {...props} />;
}
