// Video clips: the real Clip button → filming dialog → preview; plus a small/short clip through the debug
// hook to check the file (container, codecs, duration, frame count) and sampled caption frames.
// Headless Chromium is a software GPU: a full 1080×1920 × 180-frame clip takes minutes there, so the
// button path uses the real pipeline at a reduced size via ?clipscale. Run: node tests/clip.mjs [--dist]
import { startServer, launch, boot, state, shot, check, failures } from './lib.mjs';
import fs from 'node:fs';
import { Input, BufferSource, ALL_FORMATS } from 'mediabunny';

const srv = await startServer({ dist: process.argv.includes('--dist') }); const br = await launch();
const { page, errors } = await boot(br, srv.url, 'nosave&seed=8&hour=15.5');
const sup = await page.evaluate(() => window.pp.clipSupport());
console.log('  encoders:', JSON.stringify(sup));
check(!!sup, 'browser can encode a clip');

// a staged star: a registry breed in the open plaza
const id = await page.evaluate(() => { const id = window.pp.spawn('fantail', { x: 1.5, z: .6, dir: 2.2 }); window.pp.select(id); return id; });
const script = await page.evaluate((id) => window.pp.clipScript(id), id);
check(script.name && script.badge === '★ Fantail' && script.line.length > 10 && script.facts.length >= 2, `caption script (${script.badge} · “${script.line}” · ${script.facts.join(' / ')})`);

// 1. through the debug hook: 360×640, 2 s, sampled frames
const t0 = Date.now();
const r = await page.evaluate((id) => window.pp.clip(id, { w: 360, h: 640, secs: 2, fps: 30, peek: [0, 15, 45, 59], bytes: true }), id);
console.log(`  small clip: ${r.frames} frames in ${((Date.now() - t0) / 1000).toFixed(1)} s → ${r.size} bytes ${r.mime}`);
check(r.frames === 60 && r.size > 20000, `clip encodes 60 frames (${r.size} bytes, ${r.codec}${r.audioCodec ? ' + ' + r.audioCodec : ''})`);
fs.mkdirSync('captures', { recursive: true });
fs.writeFileSync('captures/clip-test' + (r.mime.includes('mp4') ? '.mp4' : '.webm'), Buffer.from(r.b64, 'base64'));
for (const [i, url] of Object.entries(r.peeks)) fs.writeFileSync(`captures/clip-frame-${i}.jpg`, Buffer.from(url.split(',')[1], 'base64'));
// read it back: container, tracks, duration
const input = new Input({ source: new BufferSource(Buffer.from(r.b64, 'base64')), formats: ALL_FORMATS });
const vt = await input.getPrimaryVideoTrack(), at = await input.getPrimaryAudioTrack(), dur = await input.computeDuration();
check(vt && vt.displayWidth === 360 && vt.displayHeight === 640, `file has a 360×640 video track (${vt?.codec})`);
check(!sup.audio || (at && at.numberOfChannels === 2), `file has a stereo audio track (${at?.codec || 'none'})`);
check(Math.abs(dur - 2) < .15, `duration ≈ 2 s (${dur.toFixed(2)})`);
let st = await state(page);
check(st.render.programs === st.render.programsAfterBoot, `recording compiles no new shaders (${st.render.programs})`);
const size = await page.evaluate(() => [window.__game.renderer.domElement.width, innerWidth]);
check(size[0] === size[1], `renderer restored to the window size after filming (${size})`);
const t1 = st.t;
await page.waitForTimeout(1500);
check((await state(page)).t > t1, 'the live park resumes after filming');

// 2. the real button path (Clip in the inspector → progress → video preview with Download)
await page.evaluate(() => { window.__clipOpts = { w: 270, h: 480, secs: 1 }; const g = window.__game, orig = g.clip.bind(g); g.clip = (id, cb) => orig(id, cb, window.__clipOpts); });
await page.evaluate((id) => { window.pp.select(id); window.pp.render(); }, id);
await page.waitForFunction(() => !!document.querySelector('#inspector [data-act="clip"]'), null, { timeout: 15000 });
const b = await page.locator('#inspector [data-act="clip"]').boundingBox();
await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
check(await page.locator('.clip-dlg .clipbar').count() === 1, 'Clip button opens the filming dialog with a progress bar');
const ok = await page.waitForFunction(() => !!document.querySelector('.clip-dlg video'), null, { timeout: 180000, polling: 250 }).then(() => true, () => false);
check(ok, 'the finished clip previews in the dialog');
const foot = ok ? await page.textContent('.clip-dlg .photo-actions .foot') : '';
const dl = ok ? await page.getAttribute('.clip-dlg a[download]', 'download') : '';
check(/^pigeon-.+\.(mp4|webm)$/.test(dl), `Download offers ${dl} (${foot.trim()})`);
await shot(page, 'clip-dialog.png');
check(errors.length === 0, `no console errors ${errors.join(' | ')}`);
await br.close(); await srv.close();
console.log(failures() ? `\n${failures()} FAILED` : '\nall clip checks passed');
process.exit(failures() ? 1 : 0);
