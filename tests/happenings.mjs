// Capture each happening in the real game (dev server), check it starts/ends and shaders never recompile.
import { setup, finish, boot, shot, state, check, checkNoErrors, checkPrograms, clickSel, poll } from './lib.mjs';
const { srv, br } = await setup();
const { page, errors } = await boot(br, srv.url, 'nosave&seed=8&hour=16.5');
await page.evaluate(() => { for (let i = 0; i < 12; i++) window.pp.spawn('founder'); window.pp.setSpeed(1); });
const kinds = await page.evaluate(() => window.pp.happenings());
const out = [];
for (const k of kinds) {
  await page.evaluate((k) => { if (k === 'moonwalk' || k === 'dance') window.pp.setTimeOfDay(k === 'dance' ? 22 : 23); else window.pp.setTimeOfDay(16.5); const g = window.__game; g.sim.nextHappeningAt = Infinity; window.pp.cam('overview'); }, k);
  const ok = await page.evaluate((k) => window.pp.happen(k), k);
  await page.waitForTimeout(k === 'gust' ? 700 : k === 'goldenegg' ? 500 : k === 'ufo' ? 5000 : k === 'runway' ? 11000 : k === 'staring' ? 5000 : 3500);
  const s = await state(page);
  check(ok && (s.happening === k || k === 'gust'), `${k} starts in-game (${s.happening})`);
  out.push(await shot(page, `happen-${k}.png`));
  // let it run out on its own, at Frantic speed so long ones (visitor: 50 sim-s) finish on slow machines too
  await page.evaluate(() => { const g = window.__game; if (g.sim.happening) { g.sim.nextHappeningAt = Infinity; g.sim.speed = 2.5; } });
  await poll(page, () => !window.__game.sim.happening, null, 120000);
  await page.evaluate(() => { window.__game.sim.speed = 1; });
  check(!(await state(page)).happening, `${k} ends`);
}
// pause: real button, sim time stops, resumes
await clickSel(page, '#b-pause');
const t0 = (await state(page)).t; await page.waitForTimeout(1500); const t1 = (await state(page)).t;
check((await state(page)).paused && t1 === t0, `pause button stops the park (t ${t0} → ${t1})`);
out.push(await shot(page, 'paused.png'));
await page.keyboard.press('p');
await poll(page, (t1) => window.pp.getState().t > t1, t1, 15000);
check(!(await state(page)).paused && (await state(page)).t > t1, 'P resumes the park');
await checkPrograms(page, 'no shader recompiles across all happenings');
checkNoErrors(errors);
console.log(out.join('\n'));
await finish(br, srv, 'happening');
