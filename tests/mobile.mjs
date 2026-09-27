// Phone: every corner of the park (and a bird hidden behind the fountain) can be reached and selected
// with phone gestures only — one-finger orbit, two-finger pan/pinch, tap. Real multi-touch via CDP
// Input.dispatchTouchEvent (the browser's own input pipeline, not synthetic DOM events).
import { startServer, launch, boot, frames, shot, state, check, failures } from './lib.mjs';

const srv = await startServer({ dist: process.argv.includes('--dist') }); const br = await launch();
const { page, errors } = await boot(br, srv.url, 'nosave&seed=21&hour=15', { viewport: { width: 390, height: 844 }, mobile: true });
const cdp = await page.context().newCDPSession(page);
const touch = (type, pts) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: pts.map(([x, y], id) => ({ x, y, id })) });
const wait = (ms) => page.waitForTimeout(ms);
const settle = async () => { await wait(450); await frames(page, 2); };
async function pinch(cx, cy, from, to, dx = 0, dy = 0, steps = 10) {
  await touch('touchStart', [[cx - from, cy], [cx + from, cy]]);
  for (let i = 1; i <= steps; i++) { const r = from + (to - from) * i / steps, ox = dx * i / steps, oy = dy * i / steps; await touch('touchMove', [[cx - r + ox, cy + oy], [cx + r + ox, cy + oy]]); await wait(16); }
  await touch('touchEnd', []); await settle();
}
async function drag1(x, y, dx, dy, steps = 10) {
  await touch('touchStart', [[x, y]]);
  for (let i = 1; i <= steps; i++) { await touch('touchMove', [[x + dx * i / steps, y + dy * i / steps]]); await wait(16); }
  await touch('touchEnd', []); await settle();
}
const tap = async (x, y) => { await touch('touchStart', [[x, y]]); await wait(40); await touch('touchEnd', []); await settle(); };
const scr = (id) => page.evaluate((id) => window.pp.screenOf(id), id);
const recenter = async () => { await page.evaluate(() => window.pp.cam('overview')); await settle(); };

// stage: birds in the four plaza corners + one behind the fountain (hidden from the default phone camera)
const targets = await page.evaluate(() => {
  const S = window.__game.sim, pp = window.pp; pp.clearAll();
  for (let i = 0; i < 12; i++) pp.spawn('founder');
  const spots = { 'far-left corner': [-5, -3.1], 'far-right corner': [5, -3.1], 'near-left corner': [-5, 3.1], 'near-right corner': [5, 3.1], 'behind the fountain': [-3.95, -.8] };
  const out = {};
  S.pigeons.slice(0, 5).forEach((p, i) => { const [name, [x, z]] = Object.entries(spots)[i]; pp.teleport(p.id, x, z); p.stateUntil = 1e9; out[name] = p.id; });
  for (const p of S.pigeons.slice(5)) pp.teleport(p.id, (Math.random() - .5) * 3 + 1.5, (Math.random() - .5) * 2);
  pp.freeze(); pp.cam('overview'); return out;
});
await settle();
check(await page.evaluate(() => innerWidth) === 390, 'phone viewport');

const center = { x: 195, y: 420 };
for (const [where, id] of Object.entries(targets)) {
  await recenter();
  let p = await scr(id), orbits = 0, pans = 0;
  // like a player: drag the park with two fingers until the bird is near the middle, zoom in, orbit if hidden
  for (let i = 0; i < 5; i++) {
    p = await scr(id);
    const off = Math.hypot(p.x - center.x, p.y - center.y);
    if (p.onScreen && off < 90) break;
    const dx = Math.max(-230, Math.min(230, center.x - p.x)), dy = Math.max(-300, Math.min(300, center.y - p.y));
    await pinch(center.x - dx / 2, center.y - dy / 2, 50, 50, dx, dy, 12); pans++;
  }
  await pinch(center.x, center.y, 40, 120, 0, 0, 10); // zoom in on it
  for (let i = 0; i < 5; i++) { // re-centre after the zoom
    p = await scr(id);
    if (p.onScreen && Math.hypot(p.x - center.x, p.y - center.y) < 90) break;
    const dx = Math.max(-230, Math.min(230, center.x - p.x)), dy = Math.max(-300, Math.min(300, center.y - p.y));
    await pinch(center.x - dx / 2, center.y - dy / 2, 50, 50, dx, dy, 12); pans++;
  }
  for (let i = 0; i < 4; i++) { // hidden behind something? walk around it
    p = await scr(id);
    const hit = await page.evaluate(({ x, y }) => window.pp.pickAt(x, y), p);
    if (hit === id) break;
    await drag1(300, 600, -120, 0); orbits++;
  }
  p = await scr(id);
  const size = await page.evaluate((id) => { const g = window.__game, v = g.flock.view(id), pp = window.pp; const a = pp.screenOfWorld(v.vis.x, 0, v.vis.z), b = pp.screenOfWorld(v.vis.x, .5, v.vis.z); return Math.abs(a.y - b.y); }, id);
  await tap(p.x, p.y);
  const sel = (await state(page)).selId;
  check(sel === id && p.onScreen, `${where}: reached with ${pans} pan${pans === 1 ? '' : 's'}${orbits ? ` + ${orbits} orbit${orbits > 1 ? 's' : ''}` : ''} and selected by tap (bird ~${size.toFixed(0)} px tall)`);
}

// two-finger pan moves the view without zooming much
await recenter();
await pinch(195, 420, 60, 60, 0, 0, 1);
await pinch(195, 420, 60, 70, -140, 0, 12);
const s1 = await page.evaluate(() => ({ ...window.__game.cam.want.target, name: window.__game.cam.name }));
check(Math.abs(s1.x) + Math.abs(s1.z) > .4, `two-finger drag pans the camera (target ${s1.x.toFixed(2)}, ${s1.z.toFixed(2)})`);

// recenter button appears once the camera has moved, and brings it back
await page.evaluate(() => window.pp.render()); await wait(500); await page.evaluate(() => window.pp.render());
const rb = await page.locator('#recenter');
check(await rb.isVisible(), 'recenter button shows after moving the camera');
const b = await rb.boundingBox(); await tap(b.x + b.width / 2, b.y + b.height / 2);
check((await page.evaluate(() => window.__game.cam.name)) === 'overview', 'recenter button returns to the overview');

// secret codes on a phone: Settings → Secret code → type → Go
{
  const sb = await page.locator('#b-settings').boundingBox(); await tap(sb.x + sb.width / 2, sb.y + sb.height / 2);
  await page.evaluate(() => window.pp.render());
  const ib = await page.locator('#settings .code input').boundingBox(); await tap(ib.x + ib.width / 2, ib.y + ib.height / 2);
  await page.keyboard.type('boogie'); await page.keyboard.press('Enter'); await settle();
  check((await state(page)).happening === 'dance', 'phone: Secret code "boogie" in settings starts a disco');
  await page.evaluate(() => { const S = window.__game.sim; S.happening = null; for (const p of S.pigeons) p.busy = null; });
  await tap(sb.x + sb.width / 2, sb.y + sb.height / 2); await page.evaluate(() => window.pp.render());
  const ib2 = await page.locator('#settings .code input').boundingBox(); await tap(ib2.x + ib2.width / 2, ib2.y + ib2.height / 2);
  await page.keyboard.type('bread'); await page.keyboard.press('Enter'); await settle();
  check((await state(page)).happening === 'bread', 'phone: Secret code "bread" drops a baguette');
  await page.evaluate(() => { const S = window.__game.sim; S.happening = null; S.bread = null; for (const p of S.pigeons) p.busy = null; });
}

// the page itself never zooms: viewport locked, controls use touch-action manipulation, and double-tapping
// the top-bar buttons leaves the page at scale 1 with the controls still on screen
{
  const z = await page.evaluate(() => ({ meta: document.querySelector('meta[name=viewport]').content, ta: getComputedStyle(document.querySelector('#b-settings')).touchAction, input: getComputedStyle(document.querySelector('#settings .code input') || document.body).fontSize }));
  check(/maximum-scale=1/.test(z.meta) && /user-scalable=no/.test(z.meta) && z.ta === 'manipulation', `page zoom locked (viewport + touch-action ${z.ta})`);
  for (const sel of ['#b-pedia', '#b-pause', '#b-settings']) { const b = await page.locator(sel).boundingBox(); for (let i = 0; i < 2; i++) { await touch('touchStart', [[b.x + b.width / 2, b.y + b.height / 2]]); await touch('touchEnd', []); await wait(60); } await wait(250); await page.keyboard.press('Escape'); }
  const vv = await page.evaluate(() => ({ scale: visualViewport.scale, top: document.querySelector('#b-settings').getBoundingClientRect().top }));
  check(vv.scale === 1 && vv.top >= 0 && vv.top < 60, `double-tapping controls doesn't zoom the page (scale ${vv.scale}, controls at ${vv.top.toFixed(0)} px)`);
  await page.evaluate(() => { document.querySelector('#settings').classList.add('hidden'); window.__game.ui.closeDialog(); if (window.__game.paused) window.__game.togglePause(false); });
}
// compact layout: one-row top bar, sheet ≤ 40% of the screen
await page.evaluate((id) => { window.pp.select(id); window.pp.render(); }, targets['near-right corner']);
await wait(500); await page.evaluate(() => window.pp.render());
const lay = await page.evaluate(() => {
  const r = (s) => document.querySelector(s).getBoundingClientRect();
  const mids = [...document.querySelectorAll('.topbar > *')].filter(e => e.offsetParent).map(e => { const b = e.getBoundingClientRect(); return (b.top + b.bottom) / 2; });
  return { rows: Math.max(...mids) - Math.min(...mids) < 12 ? 1 : 2, bar: r('.topbar').bottom, sheet: r('#inspector').height / innerHeight, roost: r('#roost').height, overflow: document.documentElement.scrollWidth > innerWidth };
});
check(lay.rows === 1 && lay.bar < 50, `top bar is one row (${lay.bar.toFixed(0)} px tall)`);
check(lay.sheet <= .4, `bird sheet ≤ 40% of the screen (${(lay.sheet * 100).toFixed(0)}%)`);
check(lay.roost <= 46 && !lay.overflow, `slim roost bar (${lay.roost.toFixed(0)} px), no horizontal overflow`);
await shot(page, 'phone-compact.png');
check(errors.length === 0, 'no console errors ' + errors.join(' | '));
await br.close(); await srv.close();
process.exit(failures() ? 1 : 0);
