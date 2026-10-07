// Look-dev: every breed in the registry (plus accessories), staged in rows, frozen, shot close.
import { setup, boot, frames, shot } from './lib.mjs';
const { srv, br } = await setup();
const { page, errors } = await boot(br, srv.url, 'nosave&seed=5&hour=16.3');
const breeds = await page.evaluate(async () => { const M = await import('/src/genetics.js'); return M.BREEDS.map(b => b.id); });
const groups = []; for (let i = 0; i < breeds.length; i += 8) groups.push(breeds.slice(i, i + 8));
const accs = await page.evaluate(async () => Object.keys((await import('/src/genetics.js')).ACCESSORIES)); // every hat, 8 a row
let n = 0;
const accRows = []; for (let i = 0; i < accs.length; i += 8) accRows.push(accs.slice(i, i + 8));
for (const g of [...groups, ...accRows.map(r => ({ acc: r }))]) {
  await page.evaluate(({ g, accs }) => {
    const pp = window.pp; pp.clearAll(); pp.freeze();
    const list = g.acc || g;
    list.forEach((k, i) => {
      const x = .2 + (i % 4) * 1.1 + (i >= 4 ? .55 : 0), z = i < 4 ? -.2 : 1.1;
      if (g.acc) pp.spawn({}, { x, z, dir: .45, accessory: k });
      else pp.spawn(k, { x, z, dir: .45 });
    });
    pp.step(2); pp.clearFx();
    pp.cam('hero-close', { x: 2.2, z: .45, y: .35, dist: 5.2, az: .12 });
  }, { g });
  await frames(page, 2);
  const names = await page.evaluate(() => window.pp.getState().pigeons.map(p => p.name + ' [' + p.breeds.join(',') + ']'));
  console.log('group', n, names.join(' | '));
  await shot(page, `lineup-${n++}.png`, { hud: false });
}
console.log('errors', errors);
await br.close(); await srv.close();
