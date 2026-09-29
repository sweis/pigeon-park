// Shared Playwright harness: start Vite, boot the real page, collect console errors, capture named cameras.
import { createServer, preview } from 'vite';
import { chromium } from 'playwright';
import fs from 'node:fs';

export async function startServer({ dist = false } = {}) {
  const server = dist ? await preview({ preview: { port: 4174, strictPort: true }, logLevel: 'error' })
                      : await createServer({ server: { port: 5174, strictPort: true }, logLevel: 'error' });
  if (!dist) await server.listen();
  const url = dist ? 'http://localhost:4174/' : 'http://localhost:5174/';
  return { url, close: () => (dist ? server.httpServer.close() : server.close()) };
}

export async function launch() {
  // PW_CHROMIUM: use a preinstalled browser when the pinned Playwright build isn't downloaded
  return chromium.launch({ executablePath: process.env.PW_CHROMIUM || undefined, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
}

// Open the game and wait until the debug API is ready and a few frames have been presented.
export async function boot(browser, base, query = '', { viewport = { width: 1280, height: 800 }, mobile = false, clearStorage = true } = {}) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  if (clearStorage) await page.addInitScript(() => { if (!sessionStorage.getItem('pp-cleared')) { localStorage.clear(); sessionStorage.setItem('pp-cleared', '1'); } });
  const t0 = Date.now();
  await page.goto(base + (query ? '?' + query : ''), { waitUntil: 'commit', timeout: 60000 });
  await page.waitForFunction(() => window.ppReady === true, null, { timeout: 60000 });
  await frames(page, 3);
  return { page, ctx, errors, loadMs: Date.now() - t0 };
}

export const frames = (page, n = 3) => page.evaluate((n) => new Promise(r => { let k = 0; const f = () => (++k >= n ? r() : requestAnimationFrame(f)); requestAnimationFrame(f); }), n);
export const state = (page) => page.evaluate(() => window.pp.getState());

export async function shot(page, file, { hud = true } = {}) {
  fs.mkdirSync('captures', { recursive: true });
  if (!hud) await page.evaluate(() => window.pp.hideHud(true));
  await frames(page, 2);
  await page.screenshot({ path: 'captures/' + file });
  if (!hud) await page.evaluate(() => window.pp.hideHud(false));
  return 'captures/' + file;
}

// Blank-frame check on the composited screenshot: mean luma + pixel variance.
export async function frameStats(page) {
  const buf = await page.screenshot();
  return page.evaluate(async (b64) => {
    const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
    const g = c.getContext('2d'); g.drawImage(img, 0, 0);
    const d = g.getImageData(0, 0, c.width, c.height).data;
    let s = 0, s2 = 0, n = 0;
    for (let i = 0; i < d.length; i += 16) { const l = .2126 * d[i] + .7152 * d[i + 1] + .0722 * d[i + 2]; s += l; s2 += l * l; n++; }
    const mean = s / n; return { mean, std: Math.sqrt(Math.max(0, s2 / n - mean * mean)) };
  }, buf.toString('base64'));
}

let fails = 0;
export function check(cond, msg) { console.log((cond ? 'PASS ' : 'FAIL ') + msg); if (!cond) fails++; return cond; }
export const failures = () => fails;
