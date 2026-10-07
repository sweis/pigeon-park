// Budget census for a full park (45 birds): draw calls + triangles (overview and close-up), programs, geometry /
// texture counts, and a CPU micro-benchmark of the per-frame JS work (sim step + flock animation + lighting + FX +
// UI), no GPU. Run: node tests/perf.mjs [--dist] [--medium]
import { setup, boot, state } from './lib.mjs';
const { srv, br } = await setup();
const { page, errors } = await boot(br, srv.url, 'nosave&seed=9&hour=16.5' + (process.argv.includes('--medium') ? '&quality=medium' : ''));
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
console.log(JSON.stringify({ birds: (await state(page)).pigeons.length, overview: { draws: over.drawCalls, tris: over.triangles }, close: { draws: close.drawCalls, tris: close.triangles },
  programs: over.programs, boot: over.programsAfterBoot, geoCache: over.pigeonGeoCache, geometries: over.geometries, textures: over.textures, cpuMsPerFrame: +cpu.toFixed(3), errors }));
await br.close(); await srv.close();
