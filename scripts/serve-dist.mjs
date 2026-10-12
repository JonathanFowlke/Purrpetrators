// Preview the built site: static files from dist/, directory index.html, and 404.html for missing URLs
// (as GitHub Pages does). Usage: npm run preview [-- port]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { projectRoot } from './lib/load-data.mjs';

const dist = path.join(projectRoot, 'dist');
const port = Number(process.argv[2]) || 8080;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.mp4': 'video/mp4', '.txt': 'text/plain' };

async function resolve(urlPath) {
  const target = path.join(dist, decodeURIComponent(urlPath));
  if (!target.startsWith(dist)) return null;
  const info = await stat(target).catch(() => null);
  if (info?.isDirectory()) return resolve(path.posix.join(urlPath, 'index.html'));
  return info ? target : null;
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');
  const file = await resolve(pathname);
  const status = file ? 200 : 404;
  const body = await readFile(file || path.join(dist, '404.html'));
  res.writeHead(status, { 'Content-Type': types[path.extname(file || '404.html')] || 'application/octet-stream' });
  res.end(body);
}).listen(port, () => console.log(`Serving dist/ at http://localhost:${port}/`));
