// Draw-call / triangle / program census with a full park (45 birds + eggs), overview and close cams.
import { startServer, launch, boot, state } from './lib.mjs';
const srv = await startServer({ dist: process.argv.includes('--dist') }); const br = await launch();
const { page, errors } = await boot(br, srv.url, 'nosave&seed=9&hour=16.5');
await page.evaluate(() => { const pp = window.pp; pp.freeze(); for (let i = 0; i < 38; i++) pp.spawn('founder'); pp.spawn('legends'); pp.step(3); pp.cam('overview'); });
const over = (await state(page)).render;
await page.evaluate(() => { window.pp.cam('hero-close', { x: 1, z: 0, dist: 3 }); });
const close = (await state(page)).render;
const s = await state(page);
console.log(JSON.stringify({ birds: s.pigeons.length, overview: { draws: over.drawCalls, tris: over.triangles }, close: { draws: close.drawCalls, tris: close.triangles }, programs: over.programs, boot: over.programsAfterBoot, geoCache: over.pigeonGeoCache, geometries: over.geometries, textures: over.textures, errors }));
await br.close(); await srv.close();
