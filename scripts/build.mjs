// Build the static site into dist/: validate data, render every route with React, copy public files and data.
//   npm run build
import { build } from 'vite';
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadRawData, validateRawData, projectRoot } from './lib/load-data.mjs';

const serverDir = path.join(projectRoot, '.build');
const dist = path.join(projectRoot, 'dist');

// 1. Compile the React pages for Node (Vite's SSR build).
await build({
  root: projectRoot,
  logLevel: 'warn',
  configFile: path.join(projectRoot, 'vite.config.js'),
  build: { ssr: 'src/entry-server.jsx', outDir: serverDir, emptyOutDir: true, copyPublicDir: false }
});
const entry = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href);

// 2. Validate the data, then render every route.
const raw = await loadRawData();
await validateRawData(raw);
const pages = entry.renderSite(raw);

// 3. Write dist/: public files, the JSON the browser scripts fetch, then the pages.
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(path.join(projectRoot, 'public'), dist, { recursive: true, filter: src => path.basename(src) !== 'package.json' });
await cp(path.join(projectRoot, 'data'), path.join(dist, 'data'), { recursive: true });
for (const { file, html } of pages) {
  const target = path.join(dist, file);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html);
}
await rm(serverDir, { recursive: true, force: true });
console.log(`Built ${pages.length} pages into dist/.`);
