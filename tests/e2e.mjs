// End-to-end checks through the real player path: real mouse/touch/keyboard, getState() assertions,
// composited screenshots. Run: node tests/e2e.mjs  (add --dist to test the production build)
import { startServer, launch, boot, frames, state, shot, frameStats, check, failures } from './lib.mjs';

const dist = process.argv.includes('--dist');
const srv = await startServer({ dist }); const br = await launch();
const poll = async (page, fn, arg, ms = 15000) => { try { await page.waitForFunction(fn, arg, { timeout: ms, polling: 100 }); return true; } catch { return false; } };
const shots = [];

// ---------- 1. cold boot: cleared storage, no dev flags ----------
{
  const { page, errors, loadMs } = await boot(br, srv.url, '');
  const s0 = await state(page);
  await page.waitForTimeout(10000);
  const s1 = await state(page);
  check(s1.t > s0.t + 3, `sim time advances on cold boot (${s0.t} → ${s1.t})`);
  check(errors.length === 0, `no console errors on cold boot ${errors.join(' | ')}`);
  check(s1.pop >= 5, `founder flock present (${s1.pop})`);
  check(s1.render.programs === s1.render.programsAfterBoot, `shader programs constant after boot (${s1.render.programsAfterBoot} → ${s1.render.programs})`);
  check(!s1.render.contextLost && !s1.render.lastShaderError, 'no context loss / shader errors');
  const hit = await page.evaluate(() => [[.5, .5], [.12, .45], [.88, .45], [.5, .3]].map(([x, y]) => document.elementFromPoint(innerWidth * x, innerHeight * y)?.id));
  check(hit.every(h => h === 'c'), `canvas receives input at centre/sides (${hit})`);
  const fs = await frameStats(page);
  check(fs.mean > 20 && fs.std > 8, `composited frame not blank (luma ${fs.mean.toFixed(0)}, std ${fs.std.toFixed(0)})`);
  shots.push(await shot(page, 'e2e-cold-boot.png'));
  console.log(`  load ${loadMs} ms · draws ${s1.render.drawCalls} · tris ${s1.render.triangles} · programs ${s1.render.programs} · gpu ${s1.render.gpu.slice(0, 40)}`);
  await page.context().close();
}

// ---------- 2. birds actually render (pixel diff with the flock hidden) ----------
{
  const { page } = await boot(br, srv.url, 'nosave&seed=11&hour=16');
  const res = await page.evaluate(() => {
    const g = window.__game; window.pp.freeze();
    g.sim.pigeons.forEach((p, i) => window.pp.teleport(p.id, 1 + (i % 4) * 1.1, -1.5 + Math.floor(i / 4) * 1.6)); // open plaza, nothing in front
    g.render(0); g.render(0);
    const gl = g.renderer.getContext();
    const read = (s) => { const px = new Uint8Array(4 * 16 * 16); gl.readPixels(Math.round(s.x) - 8, Math.round(innerHeight - s.y) - 8, 16, 16, gl.RGBA, gl.UNSIGNED_BYTE, px); return px; };
    const spots = g.sim.pigeons.map(p => window.pp.screenOf(p.id)).filter(s => s.onScreen);
    g.renderer.render(g.scene, g.cam.cam); const a = spots.map(read);
    g.flock.root.visible = false; g.renderer.render(g.scene, g.cam.cam); const b = spots.map(read); g.flock.root.visible = true;
    return a.map((x, i) => { let d = 0; for (let k = 0; k < x.length; k++) d += Math.abs(x[k] - b[i][k]); return d / x.length; });
  });
  const shown = res.filter(d => d > 6).length;
  check(res.length >= 5 && shown >= res.length - 1, `pigeons render: ${shown}/${res.length} birds differ from background (${res.map(d => d.toFixed(0)).join(',')})`);
  await page.context().close();
}

// ---------- 3. real mouse: select, clone button, drag to roost, orbit, zoom, dialogs, cheats ----------
{
  const { page, errors } = await boot(br, srv.url, 'nosave&seed=21&hour=15');
  await page.evaluate(() => { window.pp.freeze(); });
  // stage a bird in open plaza so the click target is unambiguous
  const id = await page.evaluate(() => { const id = window.__game.sim.pigeons[0].id; window.pp.teleport(id, 2.2, .8); return id; });
  const p = await page.evaluate((id) => window.pp.screenOf(id), id);
  await page.mouse.click(p.x, p.y);
  let s = await state(page);
  check(s.selId === id, `click on a bird selects it (sel ${s.selId}, want ${id})`);
  await frames(page, 2); await page.evaluate(() => window.pp.render());
  await poll(page, () => !document.getElementById('inspector').classList.contains('hidden'));
  const insName = await page.textContent('#inspector h3');
  check(insName === s.pigeons.find(q => q.id === id).name, `inspector shows the bird (${insName})`);
  shots.push(await shot(page, 'e2e-selected.png'));

  // Clone via the real button
  const pop0 = s.pop;
  const cb = await page.locator('#inspector [data-act="clone"]').boundingBox();
  await page.mouse.click(cb.x + cb.width / 2, cb.y + cb.height / 2);
  s = await state(page);
  check(s.pop === pop0 + 1, `Clone button adds a bird (${pop0} → ${s.pop})`);

  // Drag the selected bird onto the roost
  await page.evaluate(() => window.pp.render());
  const q = await page.evaluate((id) => window.pp.screenOf(id), s.selId);
  const rb = await page.locator('#roost').boundingBox();
  const target = { x: rb.x + rb.width * .45, y: rb.y + rb.height / 2 };
  const dragId = s.selId;
  await page.mouse.move(q.x, q.y); await page.mouse.down();
  for (let i = 1; i <= 12; i++) { await page.mouse.move(q.x + (target.x - q.x) * i / 12, q.y + (target.y - q.y) * i / 12); await page.evaluate(() => window.pp.render()); }
  const held = (await state(page)).pigeons.find(b => b.id === dragId)?.held;
  check(held === true, 'dragging lifts the bird');
  await page.mouse.up();
  s = await state(page);
  check(s.roost.length === 1 && !s.pigeons.find(b => b.id === dragId), `drop on roost keeps the bird (roost ${s.roost.length})`);
  await page.evaluate(() => window.pp.render()); await frames(page, 2);
  check(await page.locator('#roost .perch img').count() === 1, 'roost perch shows a portrait');

  // Drag a bird across the plaza (not onto roost) → it lands where dropped
  const other = s.pigeons.find(b => !b.flying).id;
  await page.evaluate((id) => window.pp.teleport(id, -3.5, 1.5), other);
  const o = await page.evaluate((id) => window.pp.screenOf(id), other);
  const dest = await page.evaluate(() => window.pp.screenOfWorld(3.5, 0, -1));
  await page.mouse.move(o.x, o.y); await page.mouse.down();
  for (let i = 1; i <= 10; i++) await page.mouse.move(o.x + (dest.x - o.x) * i / 10, o.y + (dest.y - o.y) * i / 10);
  await page.mouse.up();
  const ob = (await state(page)).pigeons.find(b => b.id === other);
  check(ob && Math.abs(ob.x - 3.5) < .6 && Math.abs(ob.z + 1) < .6 && !ob.held, `drag-drop moves a bird (${ob?.x}, ${ob?.z})`);

  // Orbit by dragging empty ground; wheel zoom
  await page.evaluate(() => window.pp.cam('overview'));
  const empty = await page.evaluate(() => window.pp.screenOfWorld(4.6, 0, 2.8));
  const az0 = await page.evaluate(() => window.__game.cam.want.az);
  await page.mouse.move(empty.x, empty.y); await page.mouse.down();
  for (let i = 1; i <= 6; i++) await page.mouse.move(empty.x - i * 25, empty.y);
  await page.mouse.up();
  const az1 = await page.evaluate(() => window.__game.cam.want.az);
  check(Math.abs(az1 - az0) > .3, `drag on empty ground orbits the camera (az ${az0.toFixed(2)} → ${az1.toFixed(2)})`);
  const d0 = await page.evaluate(() => window.__game.cam.want.dist);
  await page.mouse.move(640, 400); await page.mouse.wheel(0, -400);
  const d1 = await page.evaluate(() => window.__game.cam.want.dist);
  check(d1 < d0 * .8, `wheel zooms in (${d0.toFixed(1)} → ${d1.toFixed(1)})`);
  await page.evaluate(() => window.pp.cam('overview'));

  // Dialogs: Breeds button, Escape, '?' help
  const bb = await page.locator('#b-breeds').boundingBox();
  await page.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2);
  check(await page.locator('.dialog .dlg-title').textContent() === 'Breed Registry', 'Breeds button opens the registry');
  { const nb = (await state(page)).breedsTotal; const cnt = await page.locator('.grid.breeds .entry').count(); check(cnt >= 55 && (nb == null || cnt === nb), `registry lists every breed (${cnt})`); }
  shots.push(await shot(page, 'e2e-registry.png'));
  await page.keyboard.press('Escape');
  check(await page.locator('#dialog').evaluate(e => e.classList.contains('hidden')), 'Escape closes the dialog');
  await page.keyboard.press('?');
  check((await page.locator('.dialog .dlg-title').textContent()) === 'How the park works', '? opens the help sheet');
  shots.push(await shot(page, 'e2e-help.png'));
  await page.keyboard.press('Escape');

  // Start over: gear → tap "Start over" → wait for the panel to re-render → tap again
  {
    const gb = await page.locator('#b-settings').boundingBox();
    await page.mouse.click(gb.x + gb.width / 2, gb.y + gb.height / 2);
    await page.evaluate(() => window.pp.render());
    const rb1 = await page.locator('#settings [data-act="reset"]').boundingBox();
    await page.mouse.click(rb1.x + rb1.width / 2, rb1.y + rb1.height / 2);
    await page.evaluate(() => { window.pp.resume(); }); await page.waitForTimeout(900); await page.evaluate(() => window.pp.freeze());
    check((await page.locator('#settings [data-act="reset"]').textContent()).startsWith('Really'), 'first tap arms Start over (survives panel re-render)');
    const rb2 = await page.locator('#settings [data-act="reset"]').boundingBox();
    await page.mouse.click(rb2.x + rb2.width / 2, rb2.y + rb2.height / 2);
    const r = await state(page);
    check(r.roost.length === 0 && r.stats.births === 0 && r.pop === 7 && r.breedsFound.length === 0, `second tap starts over (pop ${r.pop}, roost ${r.roost.length}, births ${r.stats.births})`);
    const views = await page.evaluate(() => { const g = window.__game; g.render(0); return [...g.flock.views.keys()].every(id => g.sim.byId(id)) && g.flock.views.size === g.sim.pigeons.length; });
    check(views, 'fresh flock has its own 3D views');
  }

  // Click-off closes panels: settings popover (press on the park) and each dialog (press outside the card)
  {
    const gb = await page.locator('#b-settings').boundingBox();
    await page.mouse.click(gb.x + gb.width / 2, gb.y + gb.height / 2);
    check(await page.locator('#settings').isVisible(), 'gear opens settings');
    const off = await page.evaluate(() => window.pp.screenOfWorld(4.6, 0, 2.8));
    await page.mouse.click(off.x, off.y);
    check(!(await page.locator('#settings').isVisible()), 'clicking the park closes settings');
    for (const btn of ['[data-act="help"]', '#b-breeds', '#b-pedia']) {
      const b = await page.locator('#hud ' + btn).first().boundingBox();
      await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
      const dlg = await page.locator('.dialog').boundingBox();
      await page.mouse.click(Math.max(5, dlg.x - 12), dlg.y + dlg.height / 2);
      check(await page.locator('#dialog').evaluate(e => e.classList.contains('hidden')), `clicking outside closes ${btn}`);
    }
    // the next real click still works (click-off must not swallow it)
    await page.mouse.click(gb.x + gb.width / 2, gb.y + gb.height / 2);
    check(await page.locator('#settings').isVisible(), 'next click after a click-off still works');
    await page.mouse.click(gb.x + gb.width / 2, gb.y + gb.height / 2);
  }

  // Cheats typed on the real keyboard
  const n0 = (await state(page)).pigeons.length;
  await page.keyboard.type('rizz');
  s = await state(page);
  check(s.pigeons.length === n0 + 2 && s.breedsFound.includes('voidlegend') && s.breedsFound.includes('galaxylegend'), 'typing "rizz" summons both legends');
  await page.keyboard.type('ore');
  s = await state(page);
  check(s.pigeons.filter(b => /^THE .*(ORE|DIAMOND|EMERALD|GOLD|GEMSTONE) PIGEON$/.test(b.name)).length === 11, 'typing "ore" summons 11 ore pigeons');
  await page.evaluate(() => { window.pp.step(3); window.pp.cam('overview'); });
  shots.push(await shot(page, 'e2e-cheats.png'));
  check(errors.length === 0, `no console errors during interaction ${errors.join(' | ')}`);
  await page.context().close();
}

// ---------- 4. save → reload restores flock, roost and time of day ----------
{
  const { page, ctx } = await boot(br, srv.url, 'seed=31&hour=10');
  await page.evaluate(() => { const g = window.__game; g.sim.roostAdd(g.sim.pigeons[0].id); window.pp.step(30); g.save(); });
  const a = await state(page);
  await page.reload();
  await page.waitForFunction(() => window.ppReady === true);
  const b = await state(page);
  check(b.pop === a.pop, `reload keeps the flock (${a.pop} → ${b.pop})`);
  check(b.roost.length === 1 && b.roost[0] === a.roost[0], 'reload keeps the roost');
  check(Math.abs(b.hour - a.hour) < .2, `reload keeps time of day (${a.hour} → ${b.hour})`);
  const near = a.pigeons.filter(p => !p.flying).every(p => b.pigeons.some(q => q.name === p.name && Math.hypot(q.x - p.x, q.z - p.z) < .05));
  check(near, 'reload keeps bird positions');
  await ctx.close();
}

// ---------- 5. legacy prototype save is imported ----------
{
  const ctx = await br.newContext({ viewport: { width: 1280, height: 800 } }), page = await ctx.newPage();
  await page.addInitScript(() => {
    if (sessionStorage.getItem('seeded')) return; sessionStorage.setItem('seeded', 1); localStorage.clear();
    const g = {}; const L = { base: 'blue', pattern: 'bar', spread: 'no', dilute: 'full', recred: 'no', grizzle: 'no', pied: 'solid', sheen: 'normal', fantasy: 'none', fpattern: 'none', glow: 'none', crest: 'none', muffs: 'clean', tail: 'fantail', mane: 'plain', crop: 'normal', frill: 'smooth', curl: 'straight', beak: 'medium', eye: 'orange', size: 'normal', behavior: 'steady', voice: 'coo' };
    for (const k in L) g[k] = [L[k], L[k]];
    localStorage.setItem('pigeon-park-save-v1', JSON.stringify({ pigeons: [{ n: 'Gerald the Legacy', g, a: null, ge: 4, x: 400, y: 220, f: 1 }], roost: [], disc: {}, breeds: { fantail: { by: 'Gerald', at: 1 } }, stats: { births: 9, flown: 2, maxGen: 4 }, speed: 1.7, mut: 'chaos', ph: .3 }));
  });
  await page.goto(srv.url); await page.waitForFunction(() => window.ppReady === true);
  const s = await state(page);
  check(s.pigeons.some(p => p.name === 'Gerald the Legacy') && s.breedsFound.includes('fantail') && s.mut === 'chaos' && s.speed === 1.7, 'prototype save migrates into the new park');
  await ctx.close();
}

// ---------- 6. determinism: same seed + fixed steps → identical state ----------
{
  const run = async () => { const { page, ctx } = await boot(br, srv.url, 'nosave&seed=42&hour=9&simdt=0'); const r = await page.evaluate(() => { window.pp.freeze(); window.pp.step(1800); return JSON.stringify(window.pp.getState().pigeons.map(p => [p.id, p.x, p.z, p.state])); }); await ctx.close(); return r; };
  const a = await run(), b = await run();
  check(a === b, 'seeded 60 s scripted run replays identically');
}

// ---------- 7. time-of-day stills sweep ----------
{
  const { page, ctx, errors } = await boot(br, srv.url, 'nosave&seed=7');
  for (const h of [5.5, 8, 12, 16.5, 18.6, 21, 2]) {
    await page.evaluate((h) => { window.pp.freeze(); window.pp.setTimeOfDay(h); window.pp.cam('overview'); }, h);
    const fs = await frameStats(page);
    check(fs.mean > 12 && fs.std > 6, `hour ${h}: frame not blank (luma ${fs.mean.toFixed(0)}, std ${fs.std.toFixed(0)})`);
    shots.push(await shot(page, `e2e-hour-${String(h).replace('.', '_')}.png`, { hud: false }));
  }
  const s = await state(page);
  check(s.render.programs === s.render.programsAfterBoot, `no shader recompiles across day/night (${s.render.programs})`);
  check(errors.length === 0, 'no console errors in sweep');
  await ctx.close();
}

// ---------- 8. phone: touch tap selects, layout fits ----------
{
  const { page, ctx, errors } = await boot(br, srv.url, 'nosave&seed=21&hour=16', { viewport: { width: 390, height: 844 }, mobile: true });
  await page.evaluate(() => { window.pp.freeze(); const id = window.__game.sim.pigeons[0].id; window.pp.teleport(id, 1, .5); });
  const id = await page.evaluate(() => window.__game.sim.pigeons[0].id);
  const p = await page.evaluate((id) => window.pp.screenOf(id), id);
  check(p.onScreen, 'bird on screen on a phone');
  await page.touchscreen.tap(p.x, p.y);
  check((await state(page)).selId === id, 'touch tap selects a bird');
  await page.evaluate(() => window.pp.render()); await frames(page, 2);
  const over = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
  check(over, 'no horizontal overflow on phone');
  shots.push(await shot(page, 'e2e-phone.png'));
  check(errors.length === 0, 'no console errors on phone');
  await ctx.close();
}

await br.close(); await srv.close();
console.log('\ncaptures:\n  ' + shots.join('\n  '));
console.log(failures() ? `\n${failures()} FAILED` : '\nall e2e checks passed');
process.exit(failures() ? 1 : 0);
