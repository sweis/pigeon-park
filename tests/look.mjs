// Quick look-dev captures: node tests/look.mjs [hours...]   (overview, HUD hidden) + a phone shot
import { setup, boot, shot, PHONE } from './lib.mjs';
const hours = process.argv.slice(2).map(Number).filter(n => !isNaN(n));
const { srv, br } = await setup();
const { page, ctx } = await boot(br, srv.url, 'nosave&seed=7');
for (const h of (hours.length ? hours : [12, 16.5, 21, 2])) {
  await page.evaluate((h) => { window.pp.freeze(); window.pp.setTimeOfDay(h); window.pp.cam('overview'); }, h);
  console.log(await shot(page, `look-${String(h).replace('.', '_')}.png`, { hud: false }));
}
await ctx.close();
const ph = await boot(br, srv.url, 'nosave&seed=7&hour=16.5', PHONE);
console.log(await shot(ph.page, 'look-phone.png'));
await br.close(); await srv.close();
