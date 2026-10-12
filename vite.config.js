import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { pnnDevPages } from './scripts/lib/dev-pages.mjs';

// Storybook reuses this config for its component stories; the page-serving dev middleware only runs for `vite`.
const forStorybook = Boolean(process.env.STORYBOOK);

export default defineConfig({
  plugins: [react(), ...(forStorybook ? [] : [pnnDevPages()])],
  publicDir: 'public'
});
