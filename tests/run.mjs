// npm test: the headless sim suite, then every browser suite one at a time (they share fixed ports).
// Args pass through (e.g. `npm test -- --dist` tests the production build). Exit code: number of failed suites.
import { spawnSync } from 'node:child_process';

const SUITES = ['sim.test', 'smoke', 'e2e', 'features', 'happenings', 'achievements', 'audio-photo', 'audio-mute', 'fountain', 'lifecycle', 'mobile', 'clip'];
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
