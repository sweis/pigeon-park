// Headless sim assertions — no browser. Run: node tests/sim.test.mjs
import { Sim, PARK, FOUNTAIN, FIXED_DT, TREE_DEPTH, fountainClearance, coreOf, segGap } from '../src/sim.js';
import { setSeed } from '../src/rng.js';
import * as M from '../src/genetics.js';
import { HAPPENINGS, startHappening } from '../src/happenings.js';
import { ACHIEVEMENTS, MONUMENT_SLOTS, checkAchievements } from '../src/achievements.js';

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
// every happening starts, runs to completion without errors, and hands its birds back
for (const kind of Object.keys(HAPPENINGS)) {
  setSeed(3); const h = new Sim(); h.initFlock(null);
  for (let i = 0; i < 12; i++) h.spawn({ genome: M.founderGenome(), name: 'x', adult: true });
  if (kind === 'moonwalk') h.setTimeOfDay(23);
  h.nextHappeningAt = Infinity;
  let err = null, started = false;
  try { started = startHappening(h, kind); for (let i = 0; i < 70 / FIXED_DT && h.happening; i++) h.step(); } catch (e) { err = e; }
  const stuck = h.pigeons.filter(p => p.busy).length;
  ok(!err && started && !h.happening && stuck === 0, `happening "${kind}" runs and ends cleanly${err ? ' — ' + err.message : ''}${stuck ? ` (${stuck} birds still busy)` : ''}`);
  if (kind === 'goldenegg') ok(h.pigeons.some(p => M.LOCI.some(l => l.mutOnly && l.mutOnly[p.pheno.e[l.id]])), 'golden egg hatches a bird showing a mutation-only trait');
  if (kind === 'ufo') ok(h.pigeons.some(p => p.rev > 0 && p.accessory), 'UFO returns its abductee wearing a hat');
  if (kind === 'visitor') ok(!h.pigeons.some(p => p.visitor && !p.flying), 'visitor leaves when its time is up');
}
{ // happenings fire on their own at "some", never at "off"
  const run = (w) => { setSeed(9); const h = new Sim(); h.initFlock(null); h.whimsy = w; if (w === 'off') h.nextHappeningAt = Infinity; let n = 0; const orig = h.emit.bind(h); h.emit = (e) => { if (e.type === 'happening') n++; orig(e); }; for (let i = 0; i < 600 / FIXED_DT; i++) h.step(); return n; };
  const some = run('some'), off = run('off');
  ok(some >= 3 && off === 0, `happenings happen on their own (10 min: ${some} at "some", ${off} at "off")`);
}
// birds don't pass through each other: body capsules may touch for a frame or two (a push resolves within
// ~2 steps) but no pair stays overlapped. Gusts (everyone blown into a pile on purpose) are exempt.
{
  const measure = (seed, secs, setup) => {
    setSeed(seed); const S = new Sim(); S.initFlock(null); setup?.(S);
    const run = new Map(); let longest = 0, worst = 0;
    for (let i = 0; i < secs / FIXED_DT; i++) {
      S.step(); const seen = new Set(), C = S.court;
      const L = S.pigeons.filter(p => !p.flying && !p.held && p.state !== 'abducted' && p.y < .3);
      for (let a = 0; a < L.length; a++) for (let b = a + 1; b < L.length; b++) {
        const p = L[a], q = L[b];
        if (C && [C.a, C.b].includes(p.id) && [C.a, C.b].includes(q.id)) continue;
        if (p.state === 'blown' || q.state === 'blown') continue;
        const A = coreOf(p, S.t), B = coreOf(q, S.t), o = A.r + B.r - segGap(A, B).d;
        worst = Math.max(worst, o);
        if (o > .03) { const k = p.id + ':' + q.id; seen.add(k); const n = (run.get(k) || 0) + 1; run.set(k, n); longest = Math.max(longest, n); }
      }
      for (const k of run.keys()) if (!seen.has(k)) run.delete(k);
    }
    return { longest, worst };
  };
  for (const seed of [42, 7]) {
    const m = measure(seed, 600);
    ok(m.longest <= 3, `seed ${seed}, 10 min: birds never stay inside each other (longest overlap ${m.longest} steps, worst single-frame ${(m.worst * 100).toFixed(1)} cm)`);
  }
  for (const kind of ['bread', 'parliament', 'conga', 'staring', 'runway']) {
    const c = measure(5, 45, (S) => { for (let i = 0; i < 25; i++) S.spawn({ genome: M.founderGenome(), name: 'x', adult: true, quiet: true }); S.nextHappeningAt = Infinity; startHappening(S, kind); });
    ok(c.longest <= 3, `${kind} crowd: no birds passing through each other (longest overlap ${c.longest} steps, worst ${(c.worst * 100).toFixed(1)} cm)`);
  }
}
// speech: big pools, and no line comes back until much of its pool has been used
{
  setSeed(11); const S = new Sim(); S.initFlock(null);
  const said = [];
  for (let i = 0; i < 1200 / FIXED_DT; i++) { S.step(); for (const p of S.pigeons) if (p.emote?.text && p.emote.text !== p._last) { said.push(p.emote.text); p._last = p.emote.text; } }
  const thoughts = said.filter(t => M.THOUGHTS.includes(t));
  let quick = 0; for (let i = 0; i < thoughts.length; i++) if (thoughts.slice(Math.max(0, i - 40), i).includes(thoughts[i])) quick++;
  ok(M.THOUGHTS.length >= 120 && thoughts.length > 40 && quick === 0, `birds don't repeat a thought within 40 lines (${thoughts.length} thoughts in 20 min, ${new Set(thoughts).size} different, ${quick} quick repeats)`);
}
// roosting (or grabbing) one of a courting pair frees the other to get on with its day
{
  setSeed(3); const S = new Sim(); S.initFlock(null);
  let i = 0; while (!S.court && i++ < 30000) S.step();
  const { a, b } = S.court, partner = S.byId(b);
  S.roostAdd(a);
  ok(!S.court && partner && !partner.courting, `roosting a courting bird releases its partner (court ${S.court}, partner courting ${partner?.courting})`);
}
// family tree: hatchlings record their parents, clones share them, records survive save/load and stay bounded
{
  const s = run(42, 1200).s;
  const hatched = s.pigeons.filter(p => s.family[p.lid]?.how === 'hatch');
  ok(hatched.length > 0 && hatched.every(p => s.family[p.lid].par.length === 2), `hatchlings record both parents (${hatched.length} in park)`);
  const deep = hatched.find(p => { const t = s.familyTree(p.lid).root; return t.par.some(q => q && q.par && q.par.some(Boolean)); });
  ok(!!deep, 'some bird has a known grandparent after 20 sim-minutes');
  const g = M.decodeGenome(M.encodeGenome(hatched[0].genome));
  ok(JSON.stringify(g) === JSON.stringify(hatched[0].genome), 'ancestor genome codec round-trips');
  const src = hatched[0], q = s.clonePigeon(src.id);
  ok(q && s.family[q.lid].how === 'clone' && JSON.stringify(s.family[q.lid].par) === JSON.stringify(s.family[src.lid].par), 'a clone records the original as its source and shares its parents');
  const n0 = Object.keys(s.family).length;
  const saved = JSON.parse(JSON.stringify(s.serialize()));
  const n1 = Object.keys(saved.family).length;
  ok(n1 <= n0 && n1 <= (s.pigeons.length + s.roost.length) * 15, `ancestry is pruned to ${TREE_DEPTH} generations (${n0} → ${n1} records, ${JSON.stringify(saved.family).length} bytes)`);
  const b = new Sim(); b.restore(saved); b.initFlock(saved);
  const bb = b.pigeons.find(p => p.name === deep.name && p.gen === deep.gen);
  ok(bb && JSON.stringify(b.familyTree(bb.lid).root) === JSON.stringify(s.familyTree(deep.lid).root), 'family tree survives save/load');
  const nb = b.spawn({ genome: M.founderGenome(), name: 'New' });
  ok(!s.pigeons.some(p => p.lid === nb.lid) && !b.pigeons.some(p => p !== nb && p.lid === nb.lid), 'new lineage ids never collide with loaded ones');
  s.roostAdd(src.id); const back = s.releaseRoost(s.roost.length - 1, false);
  ok(back && back.lid === src.lid, 'a bird released from the roost keeps its lineage');
}
// achievements: earned from play, saved, and caught up quietly for older saves
{
  ok(MONUMENT_SLOTS.length >= ACHIEVEMENTS.length, `every achievement has a monument slot (${ACHIEVEMENTS.length} / ${MONUMENT_SLOTS.length})`);
  setSeed(2); const a = new Sim(); a.initFlock(null);
  const got = []; const orig = a.emit.bind(a); a.emit = (e) => { if (e.type === 'achievement') got.push(e.id); orig(e); };
  a.summonLegends(); a.step(); for (let i = 0; i < 20; i++) a.step();
  ok(got.includes('firstbreed') && got.includes('legend') && got.includes('cryptid'), `summoning legends earns First Registration, Summoner, Cryptozoologist (${got.join(', ')})`);
  const saved = JSON.parse(JSON.stringify(a.serialize()));
  const b = new Sim(); b.restore(saved); b.initFlock(saved);
  ok(Object.keys(b.achievements).length === Object.keys(a.achievements).length, 'achievements survive save/load');
  const old = { ...saved, ach: undefined }; const c = new Sim(); c.restore(old); c.initFlock(old);
  const caught = checkAchievements(c, true);
  ok(caught.length === got.length && !c.events.some(e => e.type === 'achievement'), `an older save is caught up quietly (${caught.length} awarded, one toast)`);
}
console.log(fails ? `\n${fails} FAILED` : '\nall sim tests passed');
process.exit(fails ? 1 : 0);
