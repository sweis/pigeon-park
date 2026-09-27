// Muting both sound + music must be absolute: engine suspended, and not a single audio source started —
// whichever way the player mutes (buttons, sliders, before first tap, after a reload).
import { startServer, launch, check, failures } from './lib.mjs';
const srv = await startServer({ dist: process.argv.includes('--dist') }); const br = await launch();

async function open(ctx, clear) {
  const page = await ctx.newPage();
  await page.addInitScript((clear) => {
    if (clear && !sessionStorage.getItem('c')) { localStorage.clear(); sessionStorage.setItem('c', 1); }
    window.__starts = 0; const o = AudioScheduledSourceNode.prototype.start;
    AudioScheduledSourceNode.prototype.start = function (...a) { window.__starts++; return o.apply(this, a); };
  }, clear);
  await page.goto(srv.url + '?seed=5&hour=15', { waitUntil: 'commit' });
  await page.waitForFunction(() => window.ppReady === true, null, { timeout: 60000 });
  await page.evaluate(() => { for (let i = 0; i < 25; i++) window.pp.spawn('founder'); window.pp.setSpeed(2.5); });
  return page;
}
const click = async (page, sel) => { const b = await page.locator(sel).boundingBox(); await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2); };
// count sources started over a window while also tapping birds (which normally coo)
async function silentFor(page, ms) {
  await page.waitForTimeout(300);
  const s0 = await page.evaluate(() => window.__starts);
  for (let i = 0; i < 4; i++) {
    const p = await page.evaluate((i) => window.pp.screenOf(window.__game.sim.pigeons[i].id), i);
    if (p?.onScreen) await page.mouse.click(p.x, p.y);
    await page.waitForTimeout(ms / 4);
  }
  return { started: (await page.evaluate(() => window.__starts)) - s0, state: await page.evaluate(() => window.__game.audio.ac?.state || 'none'), music: await page.evaluate(() => !!window.__game.audio.music?.timer) };
}

{ // A: unlock by playing, then mute both with the top-bar buttons
  const ctx = await br.newContext({ viewport: { width: 1280, height: 800 } }), page = await open(ctx, true);
  await page.mouse.click(1100, 700); await page.waitForTimeout(800);
  const before = await page.evaluate(() => window.__starts);
  check(before > 0, `sound is playing before muting (${before} sources)`);
  await click(page, '#b-sfx'); await click(page, '#b-music');
  const r = await silentFor(page, 4000);
  check(r.started === 0 && r.state === 'none' && !r.music, `A · buttons: both muted → ${r.started} sources in 4 s, engine ${r.state === 'none' ? 'closed' : r.state}`);
  await click(page, '#b-sfx');
  const back = await silentFor(page, 2000);
  check(back.started > 0 && back.state === 'running' && !back.music, `A · unmuting sounds brings coos back, music stays off (${back.started} sources)`);
  await ctx.close();
}
{ // B: mute before the first sound ever plays (first interaction is the mute buttons)
  const ctx = await br.newContext({ viewport: { width: 1280, height: 800 } }), page = await open(ctx, true);
  await click(page, '#b-music'); await click(page, '#b-sfx');
  const r = await silentFor(page, 4000);
  check(r.started === 0 && r.state !== 'running', `B · muted as first action → ${r.started} sources, engine ${r.state}`);
  await ctx.close();
}
{ // C: both sliders dragged to zero
  const ctx = await br.newContext({ viewport: { width: 1280, height: 800 } }), page = await open(ctx, true);
  await page.mouse.click(1100, 700); await page.waitForTimeout(500);
  await click(page, '#b-settings');
  for (const s of ['musicvol', 'sfxvol']) { const b = await page.locator(`#settings [data-act="${s}"]`).boundingBox(); await page.mouse.click(b.x + 1, b.y + b.height / 2); }
  await click(page, '#b-settings');
  const r = await silentFor(page, 4000);
  check(r.started === 0 && r.state === 'none', `C · sliders at zero → ${r.started} sources, engine ${r.state === 'none' ? 'closed' : r.state}`);
  // D: reload with both saved off, then play normally
  await page.evaluate(() => window.__game.save());
  await page.reload({ waitUntil: 'commit' }); await page.waitForFunction(() => window.ppReady === true);
  await page.evaluate(() => { for (let i = 0; i < 25; i++) window.pp.spawn('founder'); window.pp.setSpeed(2.5); });
  await page.mouse.click(1100, 700);
  const d = await silentFor(page, 5000);
  check(d.started === 0 && d.state !== 'running', `D · after reload (saved muted) → ${d.started} sources, engine ${d.state}`);
  await ctx.close();
}
{ // E: phone — mute both from the Settings panel's phone row, with real taps
  const ctx = await br.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }), page = await open(ctx, true);
  const tapSel = async (sel) => { const b = await page.locator(sel).first().boundingBox(); await page.touchscreen.tap(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(200); };
  await page.touchscreen.tap(200, 500); await page.waitForTimeout(800);
  await tapSel('#b-settings'); await tapSel('#settings .row.phone [data-act="sfx"]'); await tapSel('#settings .row.phone [data-act="music"]');
  const s0 = await page.evaluate(() => window.__starts);
  for (let i = 0; i < 5; i++) { const p = await page.evaluate((i) => window.pp.screenOf(window.__game.sim.pigeons[i].id), i); await page.touchscreen.tap(p.x, p.y); await page.waitForTimeout(700); }
  const r = await page.evaluate((s0) => ({ started: window.__starts - s0, ac: !!window.__game.audio.ac }), s0);
  check(r.started === 0 && !r.ac, `E · phone Settings row: both muted → ${r.started} sources while tapping birds, engine closed`);
  await ctx.close();
}
await br.close(); await srv.close();
process.exit(failures() ? 1 : 0);
