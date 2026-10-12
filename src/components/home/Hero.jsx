import { Img, Link } from '../../lib/site.jsx';
import { Eyebrow } from '../ui/Eyebrow.jsx';

/** Homepage hero. The featured case (children) sits beside the headline. */
export function Hero({ children }) {
  return (
    <section className="hero" aria-labelledby="headline">
      <div className="hero-copy">
        <div className="eyebrow"><span className="small-rule"></span> Big news. Small neighborhood.</div>
        <p className="network-logo" aria-hidden="true"><Img src="assets/images/pnn.svg" width="300" height="110" alt="" /></p>
        <p className="network-name">PURRPETRATOR<br />NEWS NETWORK</p>
        <h1 id="headline">Wanted everywhere.<br /><em>Caught nowhere.</em></h1>
        <p className="intro">Inspector Clueso has his eye on the Prowling Purrpetrators.<br />Guilty until proven guilty. His words.</p>
        <p className="game-context">Dispatches from the Broomstick Challenge neighborhood game.</p>
        <div className="hero-actions"><Link className="home-link" to="tips/">Report suspicious activity →</Link><Link to="cases/">Explore the case files</Link></div>
      </div>
      {children}
    </section>
  );
}
