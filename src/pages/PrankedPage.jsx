import { PrintLayout, PrintButton } from '../components/print/PrintLayout.jsx';
import { PrintBrand } from '../components/print/PrintBrand.jsx';
import { Img } from '../lib/site.jsx';
import { SITE } from '../lib/constants.js';

/** "You've Been Prowled" leave-behind for completed game pranks, with the dispatch QR. */
export function PrankedPage() {
  return (
    <PrintLayout
      title="You've Been Prowled — Printable PNN Flier"
      robots="noindex, nofollow"
      styles={['assets/css/flier.css', 'assets/css/pranked.css']}
      bodyClassName="flier-page"
      skipLabel="Skip to flier"
      themeColor={null}
      tools={(
        <div className="print-tools">
          <PrintButton>Print flier</PrintButton>
          <p>Letter (8.5 × 11 inches), portrait, 100% scale. Turn off browser headers and footers. Browser Print also works without JavaScript.</p>
          <p>For participating teams after a friendly game prank. Place without damaging property and test the printed QR before use.</p>
        </div>
      )}
    >
      <main id="main" className="print-flier prank-flier">
        <header>
          <PrintBrand />
          <p className="prank-kicker">LOCAL TEAM BECOMES THE NEWS</p>
          <h1>YOU’VE BEEN<br /><em>PROWLED.</em></h1>
          <p className="prank-lead">Your yard had a quiet life.<br />Then it developed a story arc.</p>
        </header>
        <div className="prank-copy">
          <p>Please take a moment to appreciate the situation.<br />We certainly did.</p>
          <p>PNN intends to document your team’s spectacular misfortune for all to see, for all time. Future generations deserve to know that you were outmaneuvered by people wearing pink.</p>
          <p className="prank-punchline">You may live this down.<br />The print desk is rooting against you.</p>
        </div>
        <Img className="prank-qr" src="assets/qr/pnn-dispatch-qr.svg" width="450" height="450" alt="PNN QR code" />
        <p className="prank-verdict">TEMPORARY MISCHIEF.<br />HISTORICALLY UNFORTUNATE TIMING.</p>
        <p className="prank-signoff">The Prowling Purrpetrators<br /><span>{SITE.teamTagline}</span></p>
        <div className="flier-context">
          <p>PNN · Fictional neighborhood news for the Broomstick Challenge.</p>
          <p>Neighborhood bragging rights. Unnecessarily thorough reporting.</p>
        </div>
      </main>
    </PrintLayout>
  );
}
