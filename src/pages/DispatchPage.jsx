import { SiteLayout } from '../components/layout/SiteLayout.jsx';
import { Eyebrow } from '../components/ui/Eyebrow.jsx';
import { HomeLink } from '../components/ui/HomeLink.jsx';
import { useUrl } from '../lib/site.jsx';

/** Permanent QR destination. public/scripts/dispatch.js picks a published case on each visit. */
export function DispatchPage() {
  const url = useUrl();
  return (
    <SiteLayout
      title="PNN Dispatch — Opening a case file"
      description="Your dispatch from the Purrpetrator News Network. Neighborhood intelligence from the Broomstick Challenge."
      robots="noindex"
      mainClassName="error-main"
      head={<script src={url('scripts/dispatch.js')} defer />}
    >
      <Eyebrow>PNN Dispatch · Inspector Clueso's office</Eyebrow>
      <h1>A file has<br /><em>your attention.</em></h1>
      <p id="dispatch-status" className="intro" role="status">Opening a case file from the PNN desk…</p>
      <noscript><p>Choose a case from the archive to continue. Automatic dispatch requires JavaScript.</p></noscript>
      <HomeLink to="cases/">Browse the case files →</HomeLink>
    </SiteLayout>
  );
}
