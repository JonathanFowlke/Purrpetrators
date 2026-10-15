// Vite dev middleware: renders the same routes the production build writes, on every request, so edits to
// components and data/*.json show up on refresh. Only used by `npm run dev`.
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { loadRawData, validateRawData, projectRoot } from './load-data.mjs';

function routeFile(pathname) {
  const clean = decodeURIComponent(pathname).replace(/^\/+/, '');
  if (clean === '' || clean.endsWith('/')) return `${clean}index.html`;
  return clean;
}

export function pnnDevPages() {
  return {
    name: 'pnn-dev-pages',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          const { pathname } = new URL(req.url, 'http://localhost');
          if (pathname.startsWith('/data/') && pathname.endsWith('.json')) {
            const file = path.join(projectRoot, pathname);
            if ([path.join(projectRoot, 'data'), path.join(projectRoot, 'data', 'newsletters')].includes(path.dirname(file))) {
              res.setHeader('Content-Type', 'application/json');
              res.end(await readFile(file));
              return;
            }
          }
          const wanted = routeFile(pathname);
          if (!wanted.endsWith('.html') && !wanted.endsWith('.xml')) return next();
          const entry = await server.ssrLoadModule('/src/entry-server.jsx');
          const raw = await loadRawData();
          await validateRawData(raw);
          const page = entry.renderSite(raw).find(item => item.file === wanted);
          if (!page) return next();
          res.setHeader('Content-Type', wanted.endsWith('.xml') ? 'application/rss+xml; charset=utf-8' : 'text/html; charset=utf-8');
          res.end(page.html);
        } catch (error) {
          server.ssrFixStacktrace?.(error);
          next(error);
        }
      });
      // Runs after Vite's own middleware, so only requests nothing else served get here. Like GitHub Pages,
      // answer them with a 404 status and the site's 404.html (pages only; missing assets get a bare 404).
      return () => {
        server.middlewares.use(async (req, res, next) => {
          try {
            if (req.method !== 'GET' && req.method !== 'HEAD') return next();
            const { pathname } = new URL(req.url, 'http://localhost');
            res.statusCode = 404;
            if (/\.\w+$/.test(pathname) && !pathname.endsWith('.html')) return res.end('Not found');
            const entry = await server.ssrLoadModule('/src/entry-server.jsx');
            const raw = await loadRawData();
            await validateRawData(raw);
            const page = entry.renderSite(raw).find(item => item.file === '404.html');
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(page.html);
          } catch (error) {
            server.ssrFixStacktrace?.(error);
            next(error);
          }
        });
      };
    }
  };
}
