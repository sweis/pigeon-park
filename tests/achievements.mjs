// Achievements in-game: monuments appear on the lawn, clicking one (real mouse) opens its pane; no shader compiles.
import { startServer, launch, boot, frames, shot, state, check, failures } from './lib.mjs';
const srv = await startServer({ dist: process.argv.includes('--dist') }); const br = await launch();
const { page, errors } = await boot(br, srv.url, 'nosave&seed=6&hour=16.5');
const p0 = (await state(page)).render.programs;
await page.keyboard.type('rizz');
await page.waitForTimeout(2500);
let a = await page.evaluate(() => window.pp.achievements());
check(a.built.includes('legend') && a.built.includes('firstbreed') && a.built.length === a.earned.length, `rizz earns achievements and builds their monuments (${a.built.join(', ')})`);
// the monument ring sits beyond the default framing: zoom out with the real wheel, like a player would
await page.evaluate(() => window.pp.cam('overview')); await page.waitForTimeout(300);
await page.mouse.move(640, 400); for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, 300); await page.waitForTimeout(80); }
await page.waitForTimeout(900);
const m = await page.evaluate(() => window.pp.monumentScreen('legend'));
check(m.x > 0 && m.x < 1280 && m.y > 60 && m.y < 700, `zooming out brings the monument ring into view (monolith at ${m.x.toFixed(0)}, ${m.y.toFixed(0)})`);
await page.mouse.click(m.x, m.y);
await page.waitForSelector('.ach-dlg', { timeout: 10000 });
check((await page.textContent('.ach-dlg .dlg-title')) === 'Summoner', 'clicking the monolith opens the Summoner pane');
check(await page.evaluate(() => { const i = document.querySelector('.ach-hero img'); return i && i.complete && i.naturalWidth > 400; }), 'pane shows a rendered picture of the monument');
check(await page.locator('.ach-list .ach').count() === a.total, `pane lists all ${a.total} achievements with progress`);
await shot(page, 'ach-pane.png');
await page.keyboard.press('Escape');
// everything at once: all monuments on the lawn
await page.evaluate(() => { window.pp.win(); const S = window.__game.sim; S.stats.maxGen = 10; S.stats.births = 100; S.stats.happenings = 10; for (let i = 0; i < 8; i++) S.roost.push({ ...S.roost[0] || { name: 'x', genome: S.pigeons[0].genome, accessory: null, gen: 1 } }); });
await page.waitForTimeout(2500);
a = await page.evaluate(() => window.pp.achievements());
check(a.built.length === a.total, `all ${a.total} monuments built`);
await page.evaluate(() => { window.pp.freeze(); window.pp.cam('overview'); }); await frames(page, 3);
await shot(page, 'ach-all-overview.png', { hud: false });
await page.evaluate(() => { const c = window.__game.cam; c.want.dist = c.maxDist; c.snap(); window.pp.render(); }); await frames(page, 2);
await shot(page, 'ach-all-zoomed-out.png', { hud: false });
for (const [n, az] of [['left', -1.1], ['right', 1.1], ['back', 0]]) {
  await page.evaluate(({ az, n }) => window.pp.cam('hero-close', n === 'back' ? { x: 0, z: -6.6, y: .8, dist: 9, az: .0 } : { x: az < 0 ? -8.4 : 8.4, z: .9, y: .8, dist: 9, az: az * .9 }), { az, n });
  await frames(page, 2); await shot(page, `ach-${n}.png`, { hud: false });
}
const s = await state(page);
check(s.render.programs === p0, `monuments compile no new shaders (${p0} → ${s.render.programs})`);
check(errors.length === 0, 'no console errors ' + errors.join(' | '));
console.log('version', JSON.stringify(await page.evaluate(() => window.pp.version())));
await br.close(); await srv.close();
process.exit(failures() ? 1 : 0);
