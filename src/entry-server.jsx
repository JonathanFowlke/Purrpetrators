import { renderToStaticMarkup } from 'react-dom/server';
import { SiteProvider } from './lib/site.jsx';
import { buildModel } from './lib/model.js';
import { getRoutes } from './routes.jsx';

export { buildModel, getRoutes };

/** Render one route to a complete HTML document string. No client React runtime ships with any page. */
function renderRoute(route, model) {
  if (route.html !== undefined) return route.html;
  const markup = renderToStaticMarkup(
    <SiteProvider file={route.file} model={model}>{route.element}</SiteProvider>
  );
  return `<!doctype html>\n${finishHead(markup)}\n`;
}

/**
 * React hoists <link>/<meta>/<title> above other head children and adds image preloads. Two fixes keep the
 * output matching the hand-written pages: drop the automatic image preloads, and let a script marked
 * `data-first` (the 404 page's <base> resolver) run before any relative URL in the head is resolved.
 */
function finishHead(markup) {
  const withoutPreloads = markup.replace(/<link rel="preload" as="image"[^>]*\/>/g, '');
  const first = withoutPreloads.match(/<script data-first="true">[\s\S]*?<\/script>/);
  if (!first) return withoutPreloads;
  return withoutPreloads.replace(first[0], '').replace('<head>', `<head>${first[0].replace(' data-first="true"', '')}`);
}

/** Build the model from raw data and render every route. */
export function renderSite(raw, now = new Date()) {
  const model = buildModel(raw, now);
  return getRoutes(model).map(route => ({ file: route.file, html: renderRoute(route, model) }));
}
