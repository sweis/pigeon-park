// Before/after numbers for the perf pass: draw calls + triangles (full park, overview and close-up) and a CPU
// micro-benchmark of the per-frame JS work (sim step + flock animation + lighting + FX + UI), no GPU.
import { startServer, launch, boot, state } from './lib.mjs';
const srv = await startServer({ dist: process.argv.includes('--dist') }); const br = await launch();
const { page } = await boot(br, srv.url, 'nosave&seed=9&hour=16.5' + (process.argv.includes('--medium') ? '&quality=medium' : ''));
await page.evaluate(() => { const pp = window.pp; for (let i = 0; i < 38; i++) pp.spawn('founder'); pp.spawn('legends'); pp.step(3); pp.cam('overview'); });
const over = (await state(page)).render;
await page.evaluate(() => window.pp.cam('hero-close', { x: 1, z: 0, dist: 3 }));
const close = (await state(page)).render;
const cpu = await page.evaluate(() => {
  const g = window.__game, S = g.sim; window.pp.cam('overview'); g.frozen = false; g.paused = false;
  const cam = g.cam.cam, pos = cam.position;
  const run = () => { S.step(); g.world.setHour(S.hour(), S.night); g.world.update(1 / 60); g.flock.update(S, 1 / 60, performance.now() / 1000, pos); g.fx.update(1 / 60); g.world.updateOcclusion(pos, g.cam.cur.target, 1 / 60); g.ui.frame(1 / 60, cam); };
  for (let i = 0; i < 120; i++) run(); // warm JIT
  const t0 = performance.now(); for (let i = 0; i < 600; i++) run(); return (performance.now() - t0) / 600;
});
console.log(JSON.stringify({ birds: (await state(page)).pigeons.length, overview: { draws: over.drawCalls, tris: over.triangles }, close: { draws: close.drawCalls, tris: close.triangles }, programs: over.programs, geometries: over.geometries, cpuMsPerFrame: +cpu.toFixed(3) }));
await br.close(); await srv.close();
