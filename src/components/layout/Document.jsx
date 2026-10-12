import { SITE } from '../../lib/constants.js';
import { useUrl } from '../../lib/site.jsx';

// Google tag (gtag.js). Present on every website page; never on the email edition.
const GTAG_INIT = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${SITE.gaId}');
  `;

/**
 * The <html> document: head metadata, analytics, stylesheets, and body.
 * Every page keeps a noindex robots tag (see tests/robots.test.mjs).
 */
export function Document({
  title,
  description,
  robots = 'noindex, nofollow, noarchive',
  og,
  themeColor = SITE.themeColor,
  styles = ['assets/css/styles.css'],
  head,
  bodyClassName,
  children
}) {
  const url = useUrl();
  return (
    <html lang="en">
      <head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`} />
        <script dangerouslySetInnerHTML={{ __html: GTAG_INIT }} />
        <meta charSet="utf-8" />
        <meta name="robots" content={robots} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {themeColor ? <meta name="theme-color" content={themeColor} /> : null}
        <title>{title}</title>
        {description ? <meta name="description" content={description} /> : null}
        {og ? (
          <>
            {og.type ? <meta property="og:type" content={og.type} /> : null}
            <meta property="og:title" content={og.title} />
            <meta property="og:description" content={og.description} />
            <meta property="og:url" content={`${SITE.origin}${og.path}`} />
            {og.siteName ? <meta property="og:site_name" content={og.siteName} /> : null}
          </>
        ) : null}
        <link rel="alternate" type="application/rss+xml" title={`${SITE.name} feed`} href={`${SITE.origin}/feed.xml`} />
        {head}
        <link rel="icon" href={url('assets/images/favicon.png')} type="image/png" />
        {styles.map(href => <link key={href} rel="stylesheet" href={url(href)} />)}
      </head>
      <body className={bodyClassName}>{children}</body>
    </html>
  );
}
