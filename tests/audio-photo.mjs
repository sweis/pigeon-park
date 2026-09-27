// Music + sound controls and photo mode, through the real UI.
import { startServer, launch, boot, frames, shot, state, check, failures } from './lib.mjs';
import fs from 'node:fs';
const srv = await startServer({ dist: process.argv.includes('--dist') }); const br = await launch();
const { page, errors } = await boot(br, srv.url, 'seed=5&hour=15', { viewport: { width: 1280, height: 800 } });
const A = () => page.evaluate(() => window.pp.audio());
// peak RMS over ~1 s of 50 ms windows (a single window can fall between notes)
const level = async (ms = 1200) => { await page.evaluate(() => window.pp.audioLevel()); await page.waitForTimeout(ms);
  let mx = 0; for (let i = 0; i < 20; i++) { mx = Math.max(mx, await page.evaluate(() => window.pp.audioLevel())); await page.waitForTimeout(50); } return mx; };

// first gesture unlocks audio; music starts on its own
await page.mouse.click(1100, 700);
await page.waitForTimeout(300);
let a = await A();
check(a.unlocked && a.state === 'running' && a.musicRunning, `first click unlocks audio and starts music (${a.state}, music ${a.musicRunning})`);
const onLvl = await level();
check(onLvl > .002, `music is audible (rms ${onLvl?.toFixed(4)})`);

// both toggles off → silence; music toggle alone → music back
const click = async (sel) => { const b = await page.locator(sel).boundingBox(); await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2); };
await click('#b-music'); await click('#b-sfx');
a = await A();
const offLvl = await level(1200);
check(!a.musicOn && !a.sfxOn && offLvl < .0005, `music + sound buttons silence everything (rms ${offLvl?.toFixed(5)})`);
await click('#b-music');
const musicOnly = await level();
check((await A()).musicOn && !(await A()).sfxOn && musicOnly > .002, `music toggles back on independently (rms ${musicOnly?.toFixed(4)})`);

// with music muted and sounds on, no music notes are scheduled at all (only coos)
{
  const r = await page.evaluate(async () => {
    const A = window.__game.audio, M = A.music; A.setMusic(false); A.setSfx(true);
    let notes = 0; const f = M.cooLead.bind(M); M.cooLead = (...a) => { notes++; return f(...a); };
    await new Promise(res => setTimeout(res, 2500)); M.cooLead = f;
    return { notes, timer: !!M.timer };
  });
  check(r.notes === 0 && !r.timer, `muted music schedules nothing while sounds stay on (${r.notes} notes)`);
}
// a hidden (background) tab schedules music far enough ahead to survive 1 s timer throttling
{
  const ahead = await page.evaluate(async () => {
    const A = window.__game.audio; A.setMusic(true);
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
    await new Promise(res => setTimeout(res, 300));
    const a = A.music.next - A.ac.currentTime;
    delete document.hidden; return a;
  });
  check(ahead > 1.2, `background tab: music scheduled ${ahead.toFixed(2)} s ahead`);
}
// volume sliders in settings, by real clicks on the track
await click('#b-settings');
const mv = await page.locator('#settings [data-act="musicvol"]').boundingBox();
await page.mouse.click(mv.x + mv.width * .25, mv.y + mv.height / 2);
await page.waitForTimeout(700); // the panel refreshes stats meanwhile; the slider must survive
const mv2 = await page.locator('#settings [data-act="musicvol"]').boundingBox();
await page.mouse.click(mv2.x + mv2.width * .3, mv2.y + mv2.height / 2);
a = await A();
check(Math.abs(a.musicVol - .3) < .08, `music slider sets volume (${a.musicVol.toFixed(2)})`);
const sv = await page.locator('#settings [data-act="sfxvol"]').boundingBox();
await page.mouse.click(sv.x + sv.width * .6, sv.y + sv.height / 2);
a = await A();
check(a.sfxOn && Math.abs(a.sfxVol - .6) < .08, `sound slider turns sounds back on at that volume (${a.sfxVol.toFixed(2)})`);
await click('#b-settings');

// settings survive a reload
await page.evaluate(() => window.__game.save());
await page.reload(); await page.waitForFunction(() => window.ppReady === true);
a = await A();
check(Math.abs(a.musicVol - .3) < .08 && Math.abs(a.sfxVol - .6) < .08 && a.musicOn && a.sfxOn, 'sound settings are saved');

// every bird has its own coo pitch
const pitches = await page.evaluate(() => window.pp.cooPitches());
check(new Set(pitches).size >= Math.min(5, pitches.length), `birds coo at different pitches (${[...new Set(pitches)].slice(0, 6).join(', ')})`);

// photo of a park bird via the real Photo button → download
await page.evaluate(() => { window.pp.freeze(); const id = window.__game.sim.pigeons[0].id; window.pp.teleport(id, 2.2, .8); window.pp.select(id); window.pp.render(); });
await frames(page, 2);
const p0 = (await state(page)).render.programs;
await click('#inspector [data-act="photo"]');
await page.waitForSelector('.photo-img', { timeout: 30000 });
const dim = await page.evaluate(() => { const i = document.querySelector('.photo-img'); return [i.naturalWidth, i.naturalHeight]; });
check(dim[0] >= 1600 && dim[1] > dim[0], `photo card is high-res (${dim.join('×')})`);
const dl = page.waitForEvent('download');
await click('.photo-actions [data-act="download"]');
const d = await dl; const path = 'captures/photo-park.png'; await d.saveAs(path);
check(fs.statSync(path).size > 200000 && d.suggestedFilename().startsWith('pigeon-'), `Download PNG saves ${d.suggestedFilename()} (${(fs.statSync(path).size / 1e6).toFixed(1)} MB)`);
await shot(page, 'photo-dialog.png');
await page.keyboard.press('Escape');

// photo of a roost bird (studio portrait)
await page.evaluate(() => { const S = window.__game.sim; S.roostAdd(S.pigeons.find(p => p.pheno.traits.length).id || S.pigeons[1].id); window.pp.render(); });
await page.evaluate(() => window.pp.render()); await frames(page, 2);
await click('#roost .perch img');
await page.evaluate(() => window.pp.render());
await click('#inspector [data-act="photo-roost"]');
await page.waitForSelector('.photo-img', { timeout: 30000 });
const dl2 = page.waitForEvent('download');
await click('.photo-actions [data-act="download"]');
await (await dl2).saveAs('captures/photo-roost.png');
check(fs.statSync('captures/photo-roost.png').size > 100000, 'roost bird studio photo downloads');
const s = await state(page);
check(s.render.programs === p0 && s.render.programs === s.render.programsAfterBoot, `photo mode compiles no new shaders (${s.render.programs})`);
check(errors.length === 0, 'no console errors ' + errors.join(' | '));
await br.close(); await srv.close();
process.exit(failures() ? 1 : 0);
