import { NAV_ITEMS, SITE } from '../../lib/constants.js';
import { Img, Link } from '../../lib/site.jsx';

/** Masthead with the PNN wordmark, brand line, and main navigation. `current` marks the active section. */
export function Header({ current = '' }) {
  return (
    <header className="masthead">
      <Link className="wordmark" to="index.html" aria-label="PNN home"><Img src="assets/images/pnn.svg" width="300" height="110" alt="PNN" /></Link>
      <span className="masthead-label">{SITE.brandLine}</span>
      <nav className="site-nav" aria-label="Main navigation">
        {NAV_ITEMS.map(item => <Link key={item.id} to={item.to} aria-current={current === item.id ? 'page' : undefined}>{item.label}</Link>)}
      </nav>
    </header>
  );
}
