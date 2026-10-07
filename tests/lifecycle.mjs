// Capture the breeding loop: courtship hearts → egg in nest → hatch → chick. Real-time frames.
import { setup, finish, boot, shot, check, checkNoErrors } from './lib.mjs';
const { srv, br } = await setup();
const { page, errors } = await boot(br, srv.url, 'nosave&seed=4&hour=16.5');
await page.evaluate(() => { window.pp.setSpeed(2.5); });
await page.waitForFunction(() => !!window.__game.sim.court, null, { timeout: 60000, polling: 100 });
const c = await page.evaluate(() => { const C = window.__game.sim.court; return { x: C.mx, z: C.mz }; });
await page.evaluate((c) => window.pp.cam('hero-close', { x: c.x, z: c.z + .05, y: .25, dist: 2.6, az: .25 }), c);
const out = [];
let sawHeart = false, sawEgg = false, sawChick = false;
for (let i = 0; i < 70; i++) {
  await page.waitForTimeout(250);
  const s = await page.evaluate(() => { const S = window.__game.sim; return { court: !!S.court, eggs: S.eggs.length, hearts: S.pigeons.filter(p => p.emote?.kind === 'heart').length, births: S.stats.births, t: S.t }; });
  if (s.hearts && !sawHeart) { sawHeart = true; out.push(await shot(page, 'life-1-hearts.png', { hud: true })); }
  if (s.eggs && !sawEgg) { sawEgg = true; await page.waitForTimeout(600); out.push(await shot(page, 'life-2-egg.png', { hud: false })); }
  if (sawEgg && s.births > 0 && !sawChick) { sawChick = true; await page.waitForTimeout(700); out.push(await shot(page, 'life-3-chick.png', { hud: false })); break; }
}
check(sawHeart, 'courting pair shows hearts'); check(sawEgg, 'an egg is laid'); check(sawChick, 'the egg hatches');
checkNoErrors(errors);
console.log(out.join('\n'));
await finish(br, srv, 'lifecycle');
