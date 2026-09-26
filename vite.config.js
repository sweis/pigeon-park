import { defineConfig } from 'vite';

// `npm run build` writes the site to docs/, which GitHub Pages serves for pigeonpark.live.
// public/ (CNAME, .nojekyll) is copied into docs/ on every build.
export default defineConfig({
  base: './',
  server: { port: 5173, strictPort: true },
  build: { outDir: 'docs', emptyOutDir: true, target: 'es2022', chunkSizeWarningLimit: 900, assetsInlineLimit: 0 },
});
