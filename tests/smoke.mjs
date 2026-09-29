// Cold boot for ~10 s (the definition-of-done gate): sim time advances, no console errors, a capture.
import { startServer, launch, boot, shot, state, check, failures } from './lib.mjs';
const srv = await startServer({ dist: process.argv.includes('--dist') }); const br = await launch();
const { page, errors, loadMs } = await boot(br, srv.url, 'seed=3&hour=16.5');
const t0 = (await state(page)).t;
await page.waitForTimeout(10000);
const s = await state(page);
console.log('  load ms', loadMs, JSON.stringify({ draws: s.render.drawCalls, tris: s.render.triangles, programs: s.render.programs, gpu: s.render.gpu.slice(0, 40) }));
check(s.t > t0 + 1, `sim time advances (${t0} → ${s.t})`);
check(s.render.programs === s.render.programsAfterBoot, `shader programs constant (${s.render.programs})`);
check(errors.length === 0, 'no console errors ' + errors.join(' | '));
await shot(page, '01-first-boot.png');
await br.close(); await srv.close();
process.exit(failures() ? 1 : 0);
