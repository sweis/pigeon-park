import { chromium } from 'playwright';
import path from 'node:path';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
await p.goto('file://' + path.resolve('prototype/pigeon-park-prototype.html'));
await p.waitForTimeout(9000);
await p.screenshot({ path: 'captures/00-prototype-before.png' });
await b.close();
