// Crowd the fountain (incl. very large birds) and shoot it: nobody should poke into the rim.
import { startServer, launch, boot, shot, check, failures } from './lib.mjs';
const srv = await startServer(); const br = await launch();
const { page, errors } = await boot(br, srv.url, 'nosave&seed=12&hour=16.5');
const gaps = await page.evaluate(async () => {
  const pp = window.pp, g = window.__game, S = g.sim; pp.clearAll(); pp.freeze();
  const F = { x: -1.7, z: -.8 };
  for (let i = 0; i < 14; i++) {
    const a = i / 14 * Math.PI * 2, kind = i % 4 === 0 ? 'king' : i % 5 === 0 ? 'dragoon' : 'founder';
    const id = pp.spawn(kind, { x: F.x + Math.cos(a) * 1.5, z: F.z + Math.sin(a) * 1.5, dir: a + (i % 3) * 2.1 });
    const p = S.byId(id); S.walkTo(p, F.x, F.z, .35); // everyone tries to walk into the fountain
  }
  pp.step(150);
  const { fountainClearance } = await import('/src/sim.js');
  return S.pigeons.map(p => fountainClearance(p).gap);
});
check(Math.min(...gaps) >= -1e-6, `all ${gaps.length} crowding birds clear the rim (min gap ${Math.min(...gaps).toFixed(3)} m)`);
await page.evaluate(() => { window.pp.cam('fountain'); });
console.log(await shot(page, 'fountain-crowd.png', { hud: false }));
await page.evaluate(() => { window.pp.cam('hero-close', { x: -1.7, z: .9, y: .3, dist: 4.2, az: .05 }); });
console.log(await shot(page, 'fountain-crowd-close.png', { hud: false }));
check(errors.length === 0, 'no console errors');
await br.close(); await srv.close();
process.exit(failures() ? 1 : 0);
