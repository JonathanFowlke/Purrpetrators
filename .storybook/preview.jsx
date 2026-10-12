import { useEffect } from 'react';
import { SiteProvider } from '../src/lib/site.jsx';
import { model } from './fixtures.js';

// The site's page scripts (public/scripts) run on load against server-rendered markup. React never executes
// <script> tags it renders on the client, so stories list the scripts they need in `parameters.scripts`
// and this decorator runs them after the story mounts. Cache-busting makes them run again per story.
function RunScripts({ scripts = [], children }) {
  useEffect(() => {
    const added = scripts.map(src => {
      const el = document.createElement('script');
      el.src = `/${src}?t=${Date.now()}`;
      document.body.append(el);
      return el;
    });
    return () => added.forEach(el => el.remove());
  }, [scripts.join()]);
  return children;
}

// Every story renders inside the site provider (relative URLs, model) and the shared page shell width.
export const decorators = [
  (Story, context) => (
    <SiteProvider file="index.html" model={model}>
      <div className="site-shell"><RunScripts scripts={context.parameters.scripts}><Story /></RunScripts></div>
    </SiteProvider>
  )
];

export const parameters = {
  layout: 'fullscreen',
  controls: { matchers: { color: /(background|color)$/i } },
  a11y: { test: 'todo' }
};
