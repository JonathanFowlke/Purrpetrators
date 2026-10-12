import { createContext, useContext } from 'react';

// Pages keep relative URLs with explicit index.html links so the site works from a custom domain,
// a repository subpath, or file://. `prefix` climbs from the current page to the site root.
const SiteContext = createContext({ prefix: '', model: null });

export function SiteProvider({ file = 'index.html', model = null, children }) {
  const depth = file.split('/').length - 1;
  return <SiteContext.Provider value={{ prefix: '../'.repeat(depth), model, file }}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);

/** Resolve a site-root path to a link from the current page. 'cases/001/' becomes '<prefix>cases/001/index.html'. */
function resolveUrl(prefix, to = '') {
  if (/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(to)) return to;
  const path = to === '' || to.endsWith('/') ? `${to}index.html` : to;
  return prefix + path;
}

export function useUrl() {
  const { prefix } = useSite();
  return to => resolveUrl(prefix, to);
}

/** Internal link. `to` is a site-root path such as 'cases/001/' or 'tips/flier.html'. */
export function Link({ to, ...props }) {
  const url = useUrl();
  return <a href={url(to)} {...props} />;
}

/** Site-root asset such as an image, QR code, or script. */
export function Img({ src, ...props }) {
  const url = useUrl();
  return <img src={url(src)} {...props} />;
}
