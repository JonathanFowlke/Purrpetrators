import { SiteLayout } from '../components/layout/SiteLayout.jsx';
import { useUrl } from '../lib/site.jsx';

// Resolve the deployment root before loading assets at a nested missing URL.
const BASE_SCRIPT = `
    (() => {
      if (location.protocol === 'file:') return;
      const segments = location.pathname.split('/').filter(Boolean);
      const base = location.hostname.endsWith('.github.io') && segments.length ? '/' + segments[0] + '/' : '/';
      const element = document.createElement('base');
      element.href = base;
      document.head.append(element);
    })();
  `;

export function NotFoundPage() {
  const url = useUrl();
  return (
    <SiteLayout
      title="Signal Lost — PNN"
      description="This lead has gone cold. Return to the Purrpetrator News Network."
      robots="noindex"
      mainClassName="error-main"
      head={<script data-first="true" dangerouslySetInnerHTML={{ __html: BASE_SCRIPT }} />}
      scripts={<script src={url('scripts/not-found.js')} defer />}
    >
      <p className="error-code">ERROR 404 / MISSING EVIDENCE</p>
      <h1>This lead has<br /><em>gone cold.</em></h1>
      <p className="intro">The page you're investigating could not be found.<br />Our operatives can neither confirm nor deny involvement.<br />Clueso suspects the pink team. Clueso suspects the pink team of everything, including this.</p>
      <p className="error-quip" id="error-quip">Clueso blames the pink team. Clueso also blames the page.</p>
      <a className="home-link home" href="./">RETURN TO HEADQUARTERS <span aria-hidden="true">↗</span></a>
    </SiteLayout>
  );
}
