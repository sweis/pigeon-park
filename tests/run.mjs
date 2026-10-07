// npm test: the headless sim suite, the smoke boot, then every other suite in tests/ one at a time (they share fixed
// ports). Args pass through (e.g. `npm test -- --dist` tests the production build). Exit code: failed suite count.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';

const TOOLS = new Set(['run', 'lib', 'assert', 'lineup', 'look', 'perf', 'shoot-prototype']); // helpers + look-dev scripts, not suites
const found = fs.readdirSync('tests').filter(f => f.endsWith('.mjs')).map(f => f.slice(0, -4)).filter(f => !TOOLS.has(f));
const SUITES = ['sim.test', 'smoke', ...found.filter(f => f !== 'sim.test' && f !== 'smoke').sort()];
const args = process.argv.slice(2), failed = [];
for (const s of SUITES) {
  const t0 = Date.now();
  console.log(`\n▶ ${s}`);
  const r = spawnSync(process.execPath, [`tests/${s}.mjs`, ...args], { stdio: 'inherit' });
  console.log(`  ${r.status === 0 ? '✓' : '✗'} ${s} (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
  if (r.status !== 0) failed.push(s);
}
console.log(failed.length ? `\nFAILED: ${failed.join(', ')}` : `\nall ${SUITES.length} suites passed`);
process.exit(failed.length);
