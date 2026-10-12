import { Document } from './Document.jsx';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import { Ticker } from './Ticker.jsx';
import { useSite } from '../../lib/site.jsx';

/**
 * A full website page: document head, skip link, shared masthead, ticker, <main>, and footer.
 * `title` is the complete <title>. `current` marks the nav section. `scripts` render after the shell.
 */
export function SiteLayout({
  title,
  description,
  og,
  current = '',
  mainClassName,
  isHome = false,
  head,
  scripts,
  skipLabel = 'Skip to content',
  robots,
  children
}) {
  const { model } = useSite();
  return (
    <Document title={title} description={description} og={og} head={head} robots={robots}>
      <a className="skip-link" href="#main">{skipLabel}</a>
      <div className="site-shell">
        <Header current={current} />
        {model ? <Ticker {...model.ticker} /> : null}
        <main id="main" className={mainClassName}>{children}</main>
        <Footer isHome={isHome} />
      </div>
      {scripts}
    </Document>
  );
}
