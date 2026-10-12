import { PrintLayout, PrintButton } from '../components/print/PrintLayout.jsx';
import { PrintBrand } from '../components/print/PrintBrand.jsx';
import { Img, Link } from '../lib/site.jsx';
import { HOTLINE, SITE } from '../lib/constants.js';

/** Printable letter-size Tip Line flier with the QR code and hotline. */
export function TipFlierPage() {
  return (
    <PrintLayout
      title="Print the PNN Tip Line flier"
      description="A letter-size PNN Tip Line flier for the Broomstick Challenge neighborhood game."
      styles={['assets/css/flier.css']}
      bodyClassName="flier-page"
      skipLabel="Skip to flier"
      tools={(
        <div className="print-tools">
          <Link to="tips/">← PNN Tip Line</Link>
          <PrintButton>Print flier</PrintButton>
          <p>Letter (8.5 × 11 inches), portrait, 100% scale. Turn off browser headers and footers. You can also use your browser’s Print command.</p>
        </div>
      )}
    >
      <main id="main" className="print-flier">
        <header>
          <PrintBrand />
          <h1>SEEN SOME MISCHIEF?</h1>
          <p className="flier-deck">Pranks spotted. People sneaking around or messing with yards.<br />Toilet papering. Team caravans. Covered doorbell cameras.<br />Report Broomstick Challenge activity from any team to Inspector Clueso.</p>
        </header>
        <a className="flier-qr" href={`${SITE.origin}/tips/`} aria-label="Open the PNN Tip Line">
          <Img src="assets/qr/pnn-tips-qr.svg" width="410" height="410" alt="Scan this QR code to send a game report to the PNN Tip Line." />
        </a>
        <p className="flier-action">SCAN TO SEND TIPS &amp; PHOTOS</p>
        <p className="flier-url">purrpetrators.net/tips/</p>
        <p className="flier-call">OR CALL THE PNN HOTLINE</p>
        <a className="flier-phone" href={HOTLINE.tel} aria-label={`Call the PNN hotline: ${HOTLINE.vanity}`}>{HOTLINE.vanity}</a>
        <p className="flier-vanity">Inspector Clueso’s office</p>
        <div className="flier-context">
          <p>Fictional investigations for the Broomstick Challenge neighborhood game.</p>
          <p>Game mischief only. Not an emergency service. Scan when safely stopped.</p>
        </div>
      </main>
    </PrintLayout>
  );
}
