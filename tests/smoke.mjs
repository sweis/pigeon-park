// Cold boot for ~10 s (the definition-of-done gate): sim time advances, no console errors, a capture.
import { setup, finish, boot, shot, state, check, checkNoErrors, checkPrograms } from './lib.mjs';
const { srv, br } = await setup();
const { page, errors, loadMs } = await boot(br, srv.url, 'seed=3&hour=16.5');
const t0 = (await state(page)).t;
await page.waitForTimeout(10000);
const s = await state(page);
console.log('  load ms', loadMs, JSON.stringify({ draws: s.render.drawCalls, tris: s.render.triangles, programs: s.render.programs, gpu: s.render.gpu.slice(0, 40) }));
check(s.t > t0 + 1, `sim time advances (${t0} → ${s.t})`);
await checkPrograms(page, 'shader programs constant');
checkNoErrors(errors);
await shot(page, '01-first-boot.png');
await finish(br, srv, 'smoke');
