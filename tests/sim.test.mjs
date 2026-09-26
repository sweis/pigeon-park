// Headless sim assertions — no browser. Run: node tests/sim.test.mjs
import { Sim, PARK, FOUNTAIN, FIXED_DT, fountainClearance } from '../src/sim.js';
import { setSeed } from '../src/rng.js';
import * as M from '../src/genetics.js';

let fails = 0;
const ok = (c, msg) => { console.log((c ? 'PASS ' : 'FAIL ') + msg); if (!c) fails++; };

let worst = 0;
function run(seed, seconds) {
  setSeed(seed);
  const s = new Sim(); s.initFlock(null);
  const steps = Math.round(seconds / FIXED_DT);
  let maxPop = 0, badPos = 0, nan = 0; worst = 0;
  for (let i = 0; i < steps; i++) {
    s.step();
    for (const p of s.pigeons) {
      if (!Number.isFinite(p.x + p.z + p.y + p.dir)) nan++;
      if (!p.flying && !p.held) {
        if (Math.abs(p.x) > PARK.w / 2 + 1e-6 || Math.abs(p.z) > PARK.d / 2 + 1e-6) badPos++;
        if (fountainClearance(p).gap < -1e-6) { badPos++; worst = Math.min(worst, fountainClearance(p).gap); }
      }
    }
    maxPop = Math.max(maxPop, s.pigeons.length);
  }
  return { s, maxPop, badPos, nan };
}

const a = run(42, 600), b = run(42, 600);
ok(a.nan === 0, `no NaN positions (${a.nan})`);
ok(a.badPos === 0, `no bird body (tail→beak, any size) ever overlaps the fountain rim (${a.badPos} violations, worst ${worst.toFixed(3)} m)`);
ok(a.s.stats.births > 10, `10 min sim hatches chicks (births=${a.s.stats.births})`);
ok(a.maxPop <= a.s.cap + 1, `population respects cap (max ${a.maxPop}/${a.s.cap})`);
ok(a.s.stats.maxGen >= 3, `generations advance (gen ${a.s.stats.maxGen})`);
const sig = (r) => JSON.stringify(r.s.pigeons.map(p => [p.id, p.x.toFixed(4), p.z.toFixed(4)]));
ok(sig(a) === sig(b), 'same seed → identical replay');
const c = run(7, 600);
ok(sig(a) !== sig(c), 'different seed → different run');

// save/restore round-trip
const saved = JSON.parse(JSON.stringify(a.s.serialize()));
const r = new Sim(); r.restore(saved); r.initFlock(saved);
ok(r.pigeons.length === saved.pigeons.length && r.stats.births === a.s.stats.births, `save round-trip (${r.pigeons.length} birds)`);
ok(Math.abs(r.phase() - a.s.phase()) < 1e-6, 'time of day survives save');

// actions
setSeed(1); const s = new Sim(); s.initFlock(null);
const n0 = s.pigeons.length, first = s.pigeons[0];
s.clonePigeon(first.id); ok(s.pigeons.length === n0 + 1, 'clone adds a bird');
ok(JSON.stringify(s.pigeons.at(-1).genome) === JSON.stringify(first.genome), 'clone has identical genome');
s.roostAdd(first.id); ok(s.roost.length === 1 && !s.byId(first.id), 'roost moves bird out of park');
s.releaseRoost(0, false); ok(s.roost.length === 0, 'release returns bird');
s.summonLegends(); ok(!!s.breeds.voidlegend && !!s.breeds.galaxylegend, 'rizz unlocks both legends');
s.summonOres(); ok(s.pigeons.filter(p => p.pheno.e.fantasy !== 'none' && p.name.startsWith('THE ') && !/VOID/.test(p.name)).length === 11, 'ore spawns 11');
ok(M.BREEDS.length >= 55, 'registry has ' + M.BREEDS.length + ' breeds');
// every breed sample actually matches its own breed
const unmatched = M.BREEDS.filter(b => !M.matchBreeds(M.breedSample(b)).some(x => x.id === b.id)).map(b => b.id);
ok(unmatched.length === 0, 'every breed sample matches its breed ' + unmatched.join(','));
s.setTimeOfDay(22); ok(Math.abs(s.hour() - 22) < 1e-6 && s.night === 1, 'setTimeOfDay(22) is night');
s.setTimeOfDay(16.5); ok(s.night === 0, 'setTimeOfDay(16.5) is day');

// genomes saved before the gene expansion (no almond/indigo/wattle/...) still load as wild-type
{
  const old = {}; for (const l of M.LOCI) if (!['almond', 'indigo', 'wattle', 'posture', 'legs', 'feather'].includes(l.id)) old[l.id] = [M.WILD[l.id], M.WILD[l.id]];
  const r2 = new Sim(); r2.initFlock({ pigeons: [{ n: 'Old Timer', g: old, x: 0, z: 0 }] });
  const p = r2.pigeons[0];
  ok(p && p.pheno.e.almond === 'no' && p.pheno.e.wattle === 'small' && p.breeds.length === 0, 'pre-expansion genome loads as wild-type');
}
console.log(fails ? `\n${fails} FAILED` : '\nall sim tests passed');
process.exit(fails ? 1 : 0);
