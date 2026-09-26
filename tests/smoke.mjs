import { startServer, launch, boot, shot, state } from './lib.mjs';
const srv = await startServer(); const br = await launch();
const { page, errors, loadMs } = await boot(br, srv.url, 'nosave&seed=3&debug&hour=16.5');
console.log('load ms', loadMs);
await shot(page, '01-first-boot.png');
console.log(JSON.stringify((await state(page)).render, null, 1));
console.log('errors:', errors);
await br.close(); await srv.close();
