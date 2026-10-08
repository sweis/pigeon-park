// New-feature checks through the real player path: trait finder (inspector chip + Pigeonpedia button),
// family tree dialog, desktop WASD/QE camera. Real mouse + keyboard, getState() assertions, captures.
// Run: node tests/features.mjs [--dist]
import { setup, finish, boot, frames, state, shot, check, checkNoErrors, checkPrograms, clickSel, poll, screenOf, PHONE } from './lib.mjs';

const { srv, br } = await setup();

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
  const p = await screenOf(page, show);
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
  await checkPrograms(page, 'finder adds no shader programs');
  checkNoErrors(errors, '(finder)');
  await page.context().close();
}

// ---------- family tree ----------
{
  const { page, errors } = await boot(br, srv.url, 'nosave&seed=42&hour=14');
  // let the park breed for ~15 sim-minutes (Frantic), then pick the bird with the deepest known ancestry
  await page.evaluate(() => { window.pp.setSpeed(2.5); window.pp.step(Math.round(900 / 2.5 * 30)); });
  const pick = await page.evaluate(() => {
    return window.pp.deepestLineage();
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
  checkNoErrors(errors, '(family)');
  await page.context().close();
  // phone layout
  const ph = await boot(br, srv.url, 'nosave&seed=42&hour=14', PHONE);
  await ph.page.evaluate(() => { window.pp.setSpeed(2.5); window.pp.step(Math.round(900 / 2.5 * 30)); });
  await ph.page.evaluate(() => { const { id } = window.pp.deepestLineage(), p = window.__game.sim.byId(id); window.pp.select(id); window.__game.ui.openFamily(p.lid); });
  await frames(ph.page, 2);
  await shot(ph.page, 'feat-family-phone.png');
  const over = await ph.page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  check(!over, 'family tree does not scroll the page sideways on a phone');
  await ph.ctx.close();
}

// ---------- phone: toasts never cover the bird card ----------
{
  const { page, errors, ctx } = await boot(br, srv.url, 'nosave&seed=4&hour=15', PHONE);
  const id = await page.evaluate(() => { const p = window.__game.sim.pigeons[0]; window.pp.teleport(p.id, 0, 0); return p.id; });
  const p = await screenOf(page, id);
  await page.touchscreen.tap(p.x, p.y);
  await poll(page, () => !document.getElementById('inspector').classList.contains('hidden'));
  await page.evaluate(() => window.__game.ui.toast('A test toast that should float above the card.'));
  await page.waitForTimeout(700); await frames(page, 2); // let the slide-in animation finish
  const r = await page.evaluate(() => { const i = document.getElementById('inspector').getBoundingClientRect(), t = document.getElementById('toasts').getBoundingClientRect(); return { insTop: Math.round(i.top), toastBottom: Math.round(t.bottom) }; }); // (the column: a toast mid slide-in sits lower)
  check(r.toastBottom <= r.insTop, `phone: toast sits above the bird card (toast bottom ${r.toastBottom} ≤ card top ${r.insTop})`);
  await shot(page, 'feat-phone-toast.png');
  await page.evaluate(() => window.pp.select(null)); await page.evaluate(() => { window.__game.ui.introDone = true; window.__game.ui.refreshT = 0; }); await frames(page, 3);
  await page.evaluate(() => window.__game.ui.toast('Another toast, card closed.')); await page.waitForTimeout(500);
  // (the toast column itself: a toast still sliding in is drawn a few px lower for a moment)
  const g = await page.evaluate(() => { const t = document.getElementById('toasts').getBoundingClientRect(), r = document.getElementById('roost').getBoundingClientRect(); return { t: Math.round(t.bottom), r: Math.round(r.top) }; });
  check(g.t <= g.r && g.r - g.t < 40, `with the card closed, toasts sit just above the roost bar (toast bottom ${g.t}, roost top ${g.r})`);
  checkNoErrors(errors, '(phone toasts)');
  await ctx.close();
}

// ---------- roost bar + toasts at desktop widths, full roost ----------
{
  const { page, errors, ctx } = await boot(br, srv.url, 'nosave&seed=3&hour=16');
  for (const w of [1440, 1280, 1024, 900]) {
    await page.setViewportSize({ width: w, height: 800 });
    const r = await page.evaluate(() => {
      const S = window.__game.sim; while (S.roost.length < 8 && S.pigeons.length) S.roostAdd(S.pigeons[0].id);
      window.__game.ui.toast('A remarkable hatch: Grizzled Almond.', 'note'); window.pp.render();
      return new Promise(res => requestAnimationFrame(() => requestAnimationFrame(() => {
        const rb = document.getElementById('roost').getBoundingClientRect(), t = document.getElementById('toasts').getBoundingClientRect();
        res({ h: Math.round(rb.height), top: Math.round(rb.top), toast: Math.round(t.bottom), hint: getComputedStyle(document.querySelector('.roost-hint')).display, hintW: Math.round(document.querySelector('.roost-hint').getBoundingClientRect().width) });
      })));
    });
    check(r.h <= 70 && r.toast <= r.top && (r.hint === 'none' || r.hintW >= 140), `${w} px: full roost bar is one slim row (${r.h} px, hint ${r.hint === 'none' ? 'hidden' : r.hintW + ' px'}), toasts above it`);
  }
  await shot(page, 'feat-roost-desktop.png');
  checkNoErrors(errors, '(roost bar)');
  await ctx.close();
}

// ---------- Pigeonpedia sections ----------
{
  const { page, errors, ctx } = await boot(br, srv.url, 'nosave&seed=3&hour=16');
  await page.evaluate(() => { window.pp.spawn({ gait: 'jumpy' }); window.pp.spawn({ voice: 'trumpet' }); window.pp.render(); });
  await clickSel(page, '#b-pedia');
  await clickSel(page, '.pedia-tabs [data-arg="behaviour"]');
  const r = await page.evaluate(() => ({ tab: document.querySelector('.pedia-tabs .on').textContent, n: document.querySelectorAll('.grid.pedia .entry').length,
    got: [...document.querySelectorAll('.grid.pedia .entry:not(.dim) b')].map(b => b.textContent) }));
  check(/Behaviour 2\/9/.test(r.tab) && r.n === 9 && r.got.includes('Jumpy') && r.got.includes('Trumpeter voice'), `Pigeonpedia Behaviour tab lists the 9 behaviours, 2 seen (${r.tab}: ${r.got.join(', ')})`);
  await shot(page, 'feat-pedia-behaviour.png');
  checkNoErrors(errors, '(pedia)');
  await ctx.close();
}

// ---------- Breed Registry: clone several in a row ----------
{
  const { page, errors, ctx } = await boot(br, srv.url, 'nosave&seed=3&hour=16');
  await page.evaluate(() => { window.pp.win(); window.pp.render(); });
  const pop0 = (await state(page)).pop;
  await clickSel(page, '#b-breeds');
  for (let i = 0; i < 2; i++) await clickSel(page, '.grid.breeds [data-act="clone-breed"][data-arg="fantail"]');
  await page.waitForTimeout(300);
  const s = await state(page);
  const r = await page.evaluate(() => { const t = [...document.querySelectorAll('#toasts .toast')].pop(), b = t.getBoundingClientRect();
    // (toasts ignore the pointer, so elementFromPoint can't see them: compare stacking within the HUD instead)
    const z = (id) => +getComputedStyle(document.getElementById(id)).zIndex || 0, d = document.getElementById('dialog');
    return { label: document.querySelector('[data-act="clone-breed"][data-arg="fantail"]').textContent.trim(), onTop: z('toasts') > z('dialog') && !d.classList.contains('hidden') && b.height > 0 }; });
  check(s.dialog === 'breeds' && s.pop === pop0 + 2, `cloning from the registry keeps it open for more (${pop0} → ${s.pop} birds, dialog ${s.dialog})`);
  check(r.label === 'Added to the park' && r.onTop, `the button confirms and the toast shows above the dialog (“${r.label}”)`);
  await shot(page, 'feat-registry-clone.png');
  checkNoErrors(errors, '(registry clone)');
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
  checkNoErrors(errors, '(keyboard)');
  await page.context().close();
}

await finish(br, srv, 'feature');
