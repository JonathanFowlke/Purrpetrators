import { Link, useUrl } from '../../lib/site.jsx';

function TickerItem({ item, fixed }) {
  return (
    <li className="ticker-item" data-fixed={fixed ? 'true' : undefined}>
      <span className="ticker-tag">{item.tag}</span>{' '}
      {item.to ? <Link to={item.to}>{item.text}</Link> : item.text}
    </li>
  );
}

/**
 * Static "PNN LIVE" ticker. public/scripts/ticker.js fetches the headline pool and animates it;
 * without JavaScript the static items remain.
 */
export function Ticker({ fixed, sample, sources = [] }) {
  const url = useUrl();
  return (
    <>
      <section className="ticker" aria-label="PNN news ticker. Fictional headlines for the Broomstick Challenge.">
        <span className="ticker-label">PNN LIVE</span>
        <div className="ticker-window">
          <ul className="ticker-track" data-src={url('data/news-ticker.json')} data-more-src={sources.filter(source => source !== 'data/news-ticker.json').map(url).join(' ') || undefined}>
            {fixed.map((item, i) => <TickerItem key={`f${i}`} item={item} fixed />)}
            {sample.map((item, i) => <TickerItem key={`s${i}`} item={item} />)}
          </ul>
        </div>
        <button type="button" className="ticker-toggle" hidden aria-label="Pause the news ticker">Pause</button>
      </section>
      <script src={url('scripts/ticker.js')} defer />
    </>
  );
}
