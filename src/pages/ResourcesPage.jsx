import { SiteLayout } from '../components/layout/SiteLayout.jsx';
import { Eyebrow } from '../components/ui/Eyebrow.jsx';
import { Link, useUrl } from '../lib/site.jsx';

function ResourceCard({ id, title, to, linkLabel, children }) {
  return (
    <section className="case-card" aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      {children}
      {to ? <Link to={to}>{linkLabel}</Link> : null}
    </section>
  );
}

/** Unlisted print-resource index: no incoming site links. */
export function ResourcesPage() {
  const url = useUrl();
  return (
    <SiteLayout title="PNN Resources — Print desk" robots="noindex, nofollow" skipLabel="Skip to resources" mainClassName="case-main">
      <Eyebrow>The print desk</Eyebrow>
      <h1>PNN Resources</h1>
      <p className="intro">Field supplies for an unnecessarily thorough investigation.</p>
      <div className="case-list">
        <ResourceCard id="pranked-heading" title="You’ve Been Prowled flier" to="resources/pranked.html" linkLabel="Open the prank flier →">
          <p>A letter-size leave-behind for a completed game prank. Temporary mischief, a very long news cycle.</p>
        </ResourceCard>
        <ResourceCard id="flier-heading" title="Tip Line flier" to="tips/flier.html" linkLabel="Open the printable flier →">
          <p>A letter-size neighborhood flier with a large QR code and the PNN Hotline.</p>
        </ResourceCard>
        <ResourceCard id="cards-heading" title="Printable cards" to="resources/cards.html" linkLabel="Open printable cards →">
          <p>30 windshield cards: parking commentary, compliments, neighborhood notices, and almost-pranked cards. Ten business-size cards (3.5 × 2 inches) per letter-size sheet.</p>
        </ResourceCard>
        <ResourceCard id="qr-heading" title="QR codes">
          <p>Pink SVG artwork with a paw seal. Keep the white margin intact and test your final printed size.</p>
          <ul>
            <li><a href={url('assets/qr/pnn-tips-qr.svg')}>Tip Line QR — view SVG</a> · <a href={url('assets/qr/pnn-tips-qr.svg')} download>Download Tip Line SVG</a></li>
            <li><a href={url('assets/qr/pnn-dispatch-qr.svg')}>Dispatch QR — view SVG</a> · <a href={url('assets/qr/pnn-dispatch-qr.svg')} download>Download Dispatch SVG</a></li>
          </ul>
        </ResourceCard>
      </div>
    </SiteLayout>
  );
}
