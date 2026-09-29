// New-feature checks through the real player path: trait finder (inspector chip + Pigeonpedia button),
// family tree dialog, desktop WASD/QE camera. Real mouse + keyboard, getState() assertions, captures.
// Run: node tests/features.mjs [--dist]
import { startServer, launch, boot, frames, state, shot, check, failures } from './lib.mjs';

const dist = process.argv.includes('--dist');
const srv = await startServer({ dist }); const br = await launch();
const poll = async (page, fn, arg, ms = 20000) => { try { await page.waitForFunction(fn, arg, { timeout: ms, polling: 100 }); return true; } catch { return false; } };
const clickSel = async (page, sel) => { const b = await page.locator(sel).first().boundingBox(); await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2); };

// ---------- trait finder ----------
{
  const { page, errors } = await boot(br, srv.url, 'nosave&seed=5&hour=15.5');
  // a staged flock: 3 fantails (show), 4 carriers (hidden), 5 without
  const ids = await page.evaluate(() => {
    const pp = window.pp; pp.clearAll(); pp.freeze();
    const out = { show: [], carry: [], none: [] }; let i = 0;
    const put = (tail, list) => { list.push(pp.spawn({ tail }, { x: -4 + i * .7, z: (i % 3) - 1 })); i++; };
    for (let k = 0; k < 3; k++) put(['fantail', 'fantail'], out.show);
    for (let k = 0; k < 4; k++) put(['normal', 'fantail'], out.carry);
    for (let k = 0; k < 5; k++) put(['normal', 'normal'], out.none);
    pp.render(); return out;
  });
  const show = ids.show[0];
  await page.evaluate((id) => { window.pp.teleport(id, 2.5, 1); window.pp.render(); }, show);
  const p = await page.evaluate((id) => window.pp.screenOf(id), show);
  await page.mouse.click(p.x, p.y);
  await poll(page, () => !document.getElementById('inspector').classList.contains('hidden'));
  const chip = page.locator('#inspector [data-act="find"][data-arg="tail:fantail"]');
  check(await chip.count() === 1, 'inspector trait chips are find buttons (Fantail)');
  await clickSel(page, '#inspector [data-act="find"][data-arg="tail:fantail"]');
  await page.evaluate(() => { window.pp.cam('overview'); window.pp.select(null); });
  let s = await state(page);
  check(s.find === 'tail:fantail' && s.findMarks === 7, `finder marks 3 showing + 4 carrying birds (${s.findMarks})`);
  const banner = await page.textContent('#finder');
  check(/3 show it/.test(banner) && /4 carry it/.test(banner), `finder banner counts (${banner.trim()})`);
  const colors = await page.evaluate(() => { // instance colours are stored linear: back to sRGB hex
    const m = window.__game.flock.findGems, c = [], srgb = (v) => v <= .0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - .055;
    for (let i = 0; i < m.count; i++) c.push('#' + [...m.instanceColor.array.slice(i * 3, i * 3 + 3)].map(v => Math.round(srgb(v) * 255).toString(16).padStart(2, '0')).join(''));
    return c;
  });
  check(colors.filter(c => c === '#3fbf5f').length === 3 && colors.filter(c => c === '#f2c230').length === 4, `3 green (show) and 4 yellow (carry) markers (${colors.join(' ')})`);
  await shot(page, 'feat-finder-overview.png');
  await page.evaluate(() => window.pp.cam('hero-close', { x: -2.5, z: 0, dist: 5, az: .3 }));
  await shot(page, 'feat-finder-close.png');
  // Esc clears it
  await page.keyboard.press('Escape');
  s = await state(page);
  check(s.find === null && (await page.locator('#finder.hidden').count()) === 1, 'Esc stops finding and hides the banner');
  // Pigeonpedia → Find in park
  await clickSel(page, '#b-pedia');
  await poll(page, () => !!document.querySelector('.dialog .grid.pedia'));
  const n = await page.locator('.grid.pedia [data-act="find"]').count();
  check(n >= 1, `Pigeonpedia has Find buttons for observed traits (${n})`);
  await page.evaluate(() => { window.__game.sim.discovered['tail:fantail'] = 1; window.__game.ui.openDialog('pedia'); });
  await clickSel(page, '.grid.pedia [data-act="find"][data-arg="tail:fantail"]');
  s = await state(page);
  check(s.dialog === null && s.find === 'tail:fantail' && s.findMarks === 7, `Pigeonpedia Find closes the book and marks the park (${s.findMarks})`);
  s = await state(page);
  check(s.render.programs === s.render.programsAfterBoot, `finder adds no shader programs (${s.render.programsAfterBoot} → ${s.render.programs})`);
  check(errors.length === 0, `no console errors (finder) ${errors.join(' | ')}`);
  await page.context().close();
}

// ---------- family tree ----------
{
  const { page, errors } = await boot(br, srv.url, 'nosave&seed=42&hour=14');
  // let the park breed for ~15 sim-minutes (Frantic), then pick the bird with the deepest known ancestry
  await page.evaluate(() => { window.pp.setSpeed(2.5); window.pp.step(Math.round(900 / 2.5 * 30)); });
  const pick = await page.evaluate(() => {
    const S = window.__game.sim, depth = (n) => !n ? 0 : 1 + Math.max(0, ...(n.par || []).map(depth));
    let best = null, bd = 0;
    for (const p of S.pigeons) { if (p.flying) continue; const d = depth(S.familyTree(p.lid).root); if (d > bd) { bd = d; best = p.id; } }
    return { id: best, depth: bd };
  });
  check(pick.depth >= 3, `after breeding, some bird has grandparents on record (depth ${pick.depth})`);
  await page.evaluate((id) => { window.pp.teleport(id, 2.5, 1.2); window.pp.select(id); window.pp.cam('overview'); window.pp.setSpeed(1); }, pick.id);
  await poll(page, () => !!document.querySelector('#inspector [data-act="family"]'));
  await clickSel(page, '#inspector [data-act="family"]');
  await poll(page, () => !!document.querySelector('.fam-dlg'));
  const nodes = await page.locator('.ftree .ft-node:not(.unknown)').count();
  check(nodes >= 5, `family dialog shows the bird and its ancestors (${nodes} relatives)`);
  const sum = await page.textContent('.fam-sum');
  check(/Hatched in the park to/.test(sum), `family summary names the parents (${sum.slice(0, 80)}…)`);
  await shot(page, 'feat-family-desktop.png');
  // a live relative is clickable and jumps to it
  const live = page.locator('.ftree .ft-node.live[data-act="ft-go"]');
  if (await live.count()) {
    const lid = +(await live.first().getAttribute('data-arg'));
    await clickSel(page, '.ftree .ft-node.live[data-act="ft-go"]');
    const s = await state(page);
    const want = s.pigeons.find(p => p.lid === lid);
    check(s.dialog === null && (want ? s.selId === want.id : true), `tapping a living relative selects it (lid ${lid})`);
  } else check(true, 'no living ancestor to tap (all flown off) — skipped');
  check(errors.length === 0, `no console errors (family) ${errors.join(' | ')}`);
  await page.context().close();
  // phone layout
  const ph = await boot(br, srv.url, 'nosave&seed=42&hour=14', { viewport: { width: 390, height: 844 }, mobile: true });
  await ph.page.evaluate(() => { window.pp.setSpeed(2.5); window.pp.step(Math.round(900 / 2.5 * 30)); });
  await ph.page.evaluate(() => { const S = window.__game.sim, depth = (n) => !n ? 0 : 1 + Math.max(0, ...(n.par || []).map(depth)); const b = S.pigeons.filter(p => !p.flying).sort((a, b) => depth(S.familyTree(b.lid).root) - depth(S.familyTree(a.lid).root))[0]; window.pp.select(b.id); window.__game.ui.openFamily(b.lid); });
  await frames(ph.page, 2);
  await shot(ph.page, 'feat-family-phone.png');
  const over = await ph.page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  check(!over, 'family tree does not scroll the page sideways on a phone');
  await ph.ctx.close();
}

// ---------- phone: toasts never cover the bird card ----------
{
  const { page, errors, ctx } = await boot(br, srv.url, 'nosave&seed=4&hour=15', { viewport: { width: 390, height: 844 }, mobile: true });
  const id = await page.evaluate(() => { const p = window.__game.sim.pigeons[0]; window.pp.teleport(p.id, 0, 0); return p.id; });
  const p = await page.evaluate((id) => window.pp.screenOf(id), id);
  await page.touchscreen.tap(p.x, p.y);
  await poll(page, () => !document.getElementById('inspector').classList.contains('hidden'));
  await page.evaluate(() => window.__game.ui.toast('A test toast that should float above the card.'));
  await page.waitForTimeout(700); await frames(page, 2); // let the slide-in animation finish
  const r = await page.evaluate(() => { const i = document.getElementById('inspector').getBoundingClientRect(), t = document.querySelector('#toasts .toast').getBoundingClientRect(); return { insTop: Math.round(i.top), toastBottom: Math.round(t.bottom) }; });
  check(r.toastBottom <= r.insTop, `phone: toast sits above the bird card (toast bottom ${r.toastBottom} ≤ card top ${r.insTop})`);
  await shot(page, 'feat-phone-toast.png');
  await page.evaluate(() => window.pp.select(null)); await page.evaluate(() => { window.__game.ui.introDone = true; window.__game.ui.refreshT = 0; }); await frames(page, 3);
  const b = await page.evaluate(() => document.getElementById('toasts').style.bottom);
  check(b === '', `toasts drop back to their usual spot when the card closes (${b || 'default'})`);
  check(errors.length === 0, `no console errors (phone toasts) ${errors.join(' | ')}`);
  await ctx.close();
}

// ---------- desktop keyboard camera ----------
{
  const { page, errors } = await boot(br, srv.url, 'nosave&seed=3&hour=16.5');
  await page.mouse.click(640, 400); // focus the page (click on empty ground or a bird — either is fine)
  await page.keyboard.press('Escape');
  const s0 = await state(page);
  await page.keyboard.down('w');
  await poll(page, (z0) => window.pp.getState().camTarget[2] < z0 - .6, s0.camTarget[2]);
  await page.keyboard.up('w');
  const s1 = await state(page);
  check(s1.camTarget[2] < s0.camTarget[2] - .6 && Math.abs(s1.camTarget[0] - s0.camTarget[0]) < .3, `W pans forward, into the park (z ${s0.camTarget[2]} → ${s1.camTarget[2]})`);
  await page.keyboard.down('d');
  await poll(page, (x0) => window.pp.getState().camTarget[0] > x0 + .6, s1.camTarget[0]);
  await page.keyboard.up('d');
  const s2 = await state(page);
  check(s2.camTarget[0] > s1.camTarget[0] + .6, `D pans right (x ${s1.camTarget[0]} → ${s2.camTarget[0]})`);
  // W+A together: diagonal
  await page.keyboard.down('w'); await page.keyboard.down('a');
  await poll(page, (t) => { const c = window.pp.getState().camTarget; return c[0] < t[0] - .4 && c[2] < t[2] - .4; }, s2.camTarget);
  await page.keyboard.up('w'); await page.keyboard.up('a');
  const s3 = await state(page);
  check(s3.camTarget[0] < s2.camTarget[0] - .4 && s3.camTarget[2] < s2.camTarget[2] - .4, 'W+A pans diagonally forward-left');
  // E held: rotate past the old ±72° orbit limit, all the way round to the far side
  await page.evaluate(() => window.pp.cam('overview'));
  await page.keyboard.down('e');
  const turned = await poll(page, () => window.pp.getState().camAz < -Math.PI * .9, null, 60000);
  await page.keyboard.up('e');
  const s4 = await state(page);
  check(turned, `E rotates the camera all the way round (az ${s4.camAz})`);
  await page.evaluate(() => { const g = window.__game; g.cam.want.az = -Math.PI; g.cam.snap(); });
  await shot(page, 'feat-camera-far-side.png');
  await page.keyboard.down('q');
  await poll(page, (a) => window.pp.getState().camAz > a + .5, s4.camAz);
  await page.keyboard.up('q');
  check((await state(page)).camAz > s4.camAz + .5, 'Q rotates back the other way');
  // overview after spinning doesn't unwind: nearest equivalent angle
  await page.evaluate(() => { const g = window.__game; g.cam.cur.az = g.cam.want.az = 4 * Math.PI + .2; g.cam.shot('overview'); });
  check(Math.abs((await state(page)).camAz - 4 * Math.PI) < 1e-3, 'recentring after several turns takes the short way');
  check(errors.length === 0, `no console errors (keyboard) ${errors.join(' | ')}`);
  await page.context().close();
}

await br.close(); await srv.close();
console.log(failures() ? `\n${failures()} FAILED` : '\nall feature checks passed');
process.exit(failures() ? 1 : 0);
