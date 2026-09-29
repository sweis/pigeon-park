// Look-dev: every breed in the registry (plus accessories), staged in rows, frozen, shot close.
import { startServer, launch, boot, frames, shot } from './lib.mjs';
const srv = await startServer(); const br = await launch();
const { page, errors } = await boot(br, srv.url, 'nosave&seed=5&hour=16.3');
const breeds = await page.evaluate(async () => { const M = await import('/src/genetics.js'); return M.BREEDS.map(b => b.id); });
const groups = []; for (let i = 0; i < breeds.length; i += 8) groups.push(breeds.slice(i, i + 8));
const accs = ['tophat', 'beret', 'cowboy', 'crown', 'monocle', 'sunglasses', 'propeller', 'scarf'];
let n = 0;
for (const g of [...groups, 'acc']) {
  await page.evaluate(({ g, accs }) => {
    const pp = window.pp; pp.clearAll(); pp.freeze();
    const list = g === 'acc' ? accs : g;
    list.forEach((k, i) => {
      const x = .2 + (i % 4) * 1.1 + (i >= 4 ? .55 : 0), z = i < 4 ? -.2 : 1.1;
      if (g === 'acc') pp.spawn({}, { x, z, dir: .45, accessory: k });
      else pp.spawn(k, { x, z, dir: .45 });
    });
    pp.step(2); window.__game.sim.events.length = 0; window.__game.fx.parts.length = 0; window.__game.fx.rings.forEach(r => r.userData.t = 1); window.__game.fx.update(0);
    pp.cam('hero-close', { x: 2.2, z: .45, y: .35, dist: 5.2, az: .12 });
  }, { g, accs });
  await frames(page, 2);
  const names = await page.evaluate(() => window.pp.getState().pigeons.map(p => p.name + ' [' + p.breeds.join(',') + ']'));
  console.log('group', n, names.join(' | '));
  await shot(page, `lineup-${n++}.png`, { hud: false });
}
console.log('errors', errors);
await br.close(); await srv.close();
