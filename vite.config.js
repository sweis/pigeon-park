import { defineConfig } from 'vite';
import { execSync } from 'node:child_process';
import pkg from './package.json' with { type: 'json' };

// Build stamp shown in the Help panel: package version + git commit + build date.
const hash = (() => { try { return execSync('git rev-parse --short HEAD').toString().trim(); } catch { return 'local'; } })();
const BUILD = { version: pkg.version, hash, date: new Date().toISOString().slice(0, 10) };

// `npm run build` writes the site to docs/, which GitHub Pages serves for pigeonpark.live.
// public/ (CNAME, .nojekyll) is copied into docs/ on every build.
export default defineConfig({
  base: './',
  define: { __BUILD__: JSON.stringify(BUILD) },
  server: { port: 5173, strictPort: true },
  build: { outDir: 'docs', emptyOutDir: true, target: 'es2022', chunkSizeWarningLimit: 900, assetsInlineLimit: 0 },
});
