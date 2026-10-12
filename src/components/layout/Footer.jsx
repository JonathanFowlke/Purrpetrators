import { HOTLINE, SITE } from '../../lib/constants.js';
import { Link } from '../../lib/site.jsx';

/** Site footer: brand line on top, then one row of links (home, feed, hotline). The homepage shows the domain instead of a link back to itself. */
export function Footer({ isHome = false }) {
  return (
    <footer>
      <p>© {SITE.copyrightYear} {SITE.name}<span>An operation of the Prowling Purrpetrators · Fictional news for the Broomstick Challenge neighborhood game.</span></p>
      <nav className="footer-links" aria-label="Footer">
        {isHome
          ? <span className="footer-domain">PURRPETRATORS.NET <span aria-hidden="true">↗</span></span>
          : <Link to="index.html">Back to headquarters</Link>}
        <Link to="feed.xml">RSS feed</Link>
        <a className="footer-hotline" href={HOTLINE.tel} aria-label={HOTLINE.aria}>PNN Hotline: {HOTLINE.vanity}</a>
      </nav>
    </footer>
  );
}
