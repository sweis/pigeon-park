// Headless sim assertions — no browser. Run: node tests/sim.test.mjs
import { Sim, PARK, FOUNTAIN, FIXED_DT, TREE_DEPTH, fountainClearance, coreOf, segGap, pureGenome as pureG } from '../src/sim.js';
import { setSeed } from '../src/rng.js';
import * as M from '../src/genetics.js';
import { HAPPENINGS, startHappening } from '../src/happenings.js';
import { ACHIEVEMENTS, MONUMENT_SLOTS, checkAchievements } from '../src/achievements.js';
import { check as ok, failures } from './assert.mjs';

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
      if (!p.flying && !p.held && p.state !== 'hop') { // (a hop flutters over the fountain on purpose)
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
// birds don't pass through each other. Collisions are soft (a moving bird steers round, a still one is only
// nudged, 2 cm of slop), so brief shallow contact is fine — but no pair stays more than 5 cm into each other
// for over half a second. Gusts (everyone blown into a pile on purpose) and mid-air hops are exempt.
{
  const measure = (seed, secs, setup) => {
    setSeed(seed); const S = new Sim(); S.initFlock(null); setup?.(S);
    const run = new Map(); let longest = 0, worst = 0;
    for (let i = 0; i < secs / FIXED_DT; i++) {
      S.step(); const seen = new Set(), C = S.court;
      const L = S.pigeons.filter(p => !p.flying && !p.held && p.state !== 'abducted' && p.state !== 'hop' && p.y < .3);
      for (let a = 0; a < L.length; a++) for (let b = a + 1; b < L.length; b++) {
        const p = L[a], q = L[b];
        if (C && [C.a, C.b].includes(p.id) && [C.a, C.b].includes(q.id)) continue;
        if (p.state === 'blown' || q.state === 'blown') continue;
        const A = coreOf(p, S.t), B = coreOf(q, S.t), o = A.r + B.r - segGap(A, B).d;
        worst = Math.max(worst, o);
        if (o > .05) { const k = p.id + ':' + q.id; seen.add(k); const n = (run.get(k) || 0) + 1; run.set(k, n); longest = Math.max(longest, n); }
      }
      for (const k of run.keys()) if (!seen.has(k)) run.delete(k);
    }
    return { longest, worst, S };
  };
  for (const seed of [42, 7]) {
    const m = measure(seed, 600);
    ok(m.longest <= 15, `seed ${seed}, 10 min: birds never stay inside each other (longest > 5 cm overlap ${m.longest} steps, worst single frame ${(m.worst * 100).toFixed(1)} cm)`);
  }
  for (const kind of ['bread', 'parliament', 'conga', 'staring', 'runway']) {
    const c = measure(5, 45, (S) => { for (let i = 0; i < 25; i++) S.spawn({ genome: M.founderGenome(), name: 'x', adult: true, quiet: true }); S.nextHappeningAt = Infinity; startHappening(S, kind); });
    ok(c.longest <= 15, `${kind} crowd: no birds passing through each other (longest > 5 cm overlap ${c.longest} steps, worst ${(c.worst * 100).toFixed(1)} cm)`);
  }
  // a full park doesn't jam: stuck birds find a way out (reroute, then hop), and hops stay occasional
  {
    setSeed(42); const S = new Sim(); S.initFlock(null); S.whimsy = 'off'; S.nextHappeningAt = Infinity;
    while (S.alive() < 44) S.spawn({ genome: M.founderGenome(), name: 'x', adult: true, quiet: true });
    let hops = 0, stalled = 0, walkers = 0; const last = new Map();
    for (let i = 0; i < 300 / FIXED_DT; i++) {
      S.step();
      for (const p of S.pigeons) { if (p.state === 'hop' && !p._h) { hops++; p._h = 1; } else if (p.state !== 'hop') p._h = 0; }
      if (i % 30) continue;
      for (const p of S.pigeons) if (p.state === 'walk' && !p.busy) { walkers++; const l = last.get(p.id); if (l && l[2] === 'walk' && Math.hypot(l[0] - p.x, l[1] - p.z) < .05) stalled++; last.set(p.id, [p.x, p.z, p.state]); } else last.set(p.id, [p.x, p.z, p.state]);
    }
    ok(stalled / walkers < .05 && hops > 0 && hops < 120, `full park, 5 min: walkers rarely stall (${(stalled / walkers * 100).toFixed(1)}% not moving over 1 s), stuck birds hop out (${hops} hops)`);
  }
}
// v0.9: accessories by slot (hat + glasses + chain), the Homey Pigeon combo, clothes, gaits, the goddess
{
  ok(M.withAccessory('goldchain', 'blackhat') === 'blackhat+goldchain' && M.withAccessory('blackhat+goldchain', 'tophat') === 'tophat+goldchain', 'accessories stack by slot (a new hat replaces the old hat, the chain stays)');
  const homey = M.computePheno(pureG({}), 'blackhat+goldchain'), hatOnly = M.computePheno(pureG({}), 'blackhat');
  ok(M.matchBreeds(homey).some(b => b.id === 'homey') && !M.matchBreeds(hatOnly).some(b => b.id === 'homey'), 'black fedora + gold chain = Homey Pigeon (the hat alone is not)');
  ok(M.matchBreeds(M.computePheno(pureG({ outfit: 'suit' }), 'tophat')).some(b => b.id === 'ceo'), 'suit + top hat = The CEO');
  const carrier = { ...pureG({}), outfit: ['none', 'elvis'] };
  ok(M.computePheno(carrier, null).e.outfit === 'none' && M.carriersOf(carrier).some(c => c.key === 'outfit:elvis'), 'clothes are recessive: one copy is carried, not worn');
  setSeed(6); const S = new Sim(); S.initFlock(null);
  const p = S.spawn({ genome: pureG({ outfit: 'punk' }), accessory: M.withAccessory(M.withAccessory('goldchain', 'blackhat'), 'sunglasses'), name: 'Z', adult: true });
  const saved = JSON.parse(JSON.stringify(S.serialize())), b = new Sim(); b.restore(saved); b.initFlock(saved);
  const q = b.pigeons.find(x => x.name === 'Z');
  ok(q && q.accessory === 'blackhat+sunglasses+goldchain' && q.pheno.e.outfit === 'punk', `outfits and stacked accessories survive save/load (${q?.accessory})`);
  // gaits: speedy birds cover more ground than sluggish ones; jumpy birds jump; twirly birds twirl
  const walkRun = (gait) => {
    setSeed(31); const W = new Sim(); W.initFlock(null); W.pigeons.length = 0; W.whimsy = 'off'; W.nextHappeningAt = Infinity;
    const birds = Array.from({ length: 6 }, (_, i) => W.spawn({ genome: pureG({ gait }), name: 'g' + i, adult: true, quiet: true }));
    let dist = 0; const states = new Set(); const last = birds.map(b => [b.x, b.z]);
    for (let i = 0; i < 120 / FIXED_DT; i++) { W.step(); birds.forEach((b, k) => { dist += Math.hypot(b.x - last[k][0], b.z - last[k][1]); last[k] = [b.x, b.z]; states.add(b.state); }); }
    return { dist, states };
  };
  const fast = walkRun('speedy'), slow = walkRun('sluggish'), norm = walkRun('normal'), jumpy = walkRun('jumpy'), twirly = walkRun('twirly');
  ok(fast.dist > norm.dist * 1.2 && slow.dist < norm.dist * .8, `speedy birds roam further, sluggish ones less (2 min: ${fast.dist.toFixed(0)} / ${norm.dist.toFixed(0)} / ${slow.dist.toFixed(0)} m)`);
  ok(jumpy.states.has('jump') && twirly.states.has('twirl') && !norm.states.has('jump') && !norm.states.has('twirl'), 'jumpy birds jump and twirly birds twirl (ordinary birds do neither)');
  // the goddess blesses a few birds and leaves
  setSeed(8); const G = new Sim(); G.initFlock(null); for (let i = 0; i < 8; i++) G.spawn({ genome: M.founderGenome(), name: 'x', adult: true, quiet: true });
  const before = JSON.stringify(G.pigeons.map(b => [b.genome, b.accessory]));
  ok(startHappening(G, 'goddess') && !!G.goddess, 'the goddess descends');
  for (let i = 0; i < 20 / FIXED_DT; i++) G.step();
  const blessed = G.pigeons.filter(b => (b.rev || 0) > 0).length;
  ok(blessed >= 3 && !G.goddess && !G.happening && JSON.stringify(G.pigeons.map(b => [b.genome, b.accessory])) !== before, `the goddess blesses ${blessed} birds with mutations or finery, then ascends`);
}
// v0.9.1: seasons, Jacob, cryptid stacks, accessory field notes
{
  ok(M.seasonOf(new Date(2026, 9, 31)) === 'halloween' && M.seasonOf(new Date(2026, 11, 24)) === 'christmas' && M.seasonOf(new Date(2027, 2, 26)) === 'easter' && M.seasonOf(new Date(2026, 6, 4)) === null, 'holiday seasons follow the calendar (Easter moves with Easter Sunday)');
  const carriers = (season) => { setSeed(4); let n = 0; for (let i = 0; i < 40000; i++) { const g = M.offspring(pureG({}), pureG({}), 1, season).genome; if (g.outfit.includes('halloween')) n++; } return n; };
  const inSeason = carriers('halloween'), outSeason = carriers(null);
  ok(inSeason > outSeason * 6 && outSeason > 0, `Halloween costumes mutate in far more often in season, still possible out of it (${inSeason} vs ${outSeason} in 40k eggs)`);
  ok(!Array.from({ length: 20000 }, () => M.offspring(pureG({}), pureG({}), 3).genome.outfit).flat().includes('jersey'), "Jacob's jersey never turns up as a random mutation");
  { setSeed(12); const F = new Sim(); F.initFlock(null); F.season = 'christmas'; F.whimsy = 'off'; F.nextHappeningAt = Infinity; let dressed = 0; const seen = new Set();
    for (let i = 0; i < 1800 / FIXED_DT; i++) { F.step(); for (const b of F.pigeons) if (!seen.has(b.id)) { seen.add(b.id); if (b.pheno.e.outfit === 'christmas') dressed++; } }
    ok(dressed > 0, `in Christmas season some chicks hatch in Santa suits (${dressed} of ${F.stats.births} births in 30 min)`); }
  // Jacob: not before 20 minutes of play, then once
  setSeed(3); const J = new Sim(); J.initFlock(null); J.whimsy = 'off'; J.nextHappeningAt = Infinity;
  for (let i = 0; i < 19 * 60 / FIXED_DT; i++) J.step();
  const early = J.pigeons.some(b => b.name === 'Jacob');
  for (let i = 0; i < 3 * 60 / FIXED_DT; i++) J.step();
  const jacobs = J.pigeons.filter(b => b.name === 'Jacob');
  ok(!early && jacobs.length === 1 && J.breeds.jacob && jacobs[0].pheno.e.outfit === 'jersey', `Jacob (Pigeon Park Superfan #1) arrives once, after ${Math.round(J.stats.playTime / 60)} min of play, and registers`);
  const saved = JSON.parse(JSON.stringify(J.serialize())), J2 = new Sim(); J2.restore(saved); J2.initFlock(saved);
  for (let i = 0; i < 60 / FIXED_DT; i++) J2.step();
  ok(J2.pigeons.filter(b => b.name === 'Jacob').length === 1 && J2.stats.playTime > J.stats.playTime, 'play time is saved and Jacob comes only once');
  // cryptid stacks: The Anomaly at 6 cryptid traits; the Omnipigeon at 9, generation 10+, Anomaly first
  const six = pureG({ fantasy: 'void', fpattern: 'stars', glow: 'glow', crest: 'horn', eye: 'googly', beak: 'duck' });
  const nine = { ...six, ...pureG({ fantasy: 'void', fpattern: 'stars', glow: 'glow', crest: 'horn', eye: 'googly', beak: 'duck', neck: 'noodle', size: 'chonk', sheen: 'galaxy' }) };
  setSeed(5); const C = new Sim(); C.initFlock(null);
  const a6 = C.spawn({ genome: six, name: 'a', gen: 4, adult: true }), n9early = C.spawn({ genome: structuredClone(nine), name: 'b', gen: 4, adult: true });
  ok(a6.pheno.cryptids === 6 && a6.breeds.some(b => b.id === 'anomaly') && !n9early.breeds.some(b => b.id === 'omnipigeon'), 'six cryptid traits make The Anomaly; nine at generation 4 are not yet the Omnipigeon');
  const n9 = C.spawn({ genome: structuredClone(nine), name: 'c', gen: 10, adult: true });
  ok(n9.breeds.some(b => b.id === 'omnipigeon') && C.breeds.omnipigeon, 'nine cryptid traits at generation 10, after The Anomaly → The Omnipigeon');
  // accessories are field notes, and loading a save catches up on ones already present
  const hat = C.spawn({ genome: pureG({}), accessory: 'blackhat', name: 'h', adult: true });
  ok(C.discovered['acc:blackhat'] && Object.keys(M.ACCESSORIES).every(a => M.PEDIA['acc:' + a]), 'every accessory has a field note, unlocked when first seen');
  const old = JSON.parse(JSON.stringify(C.serialize())); old.disc = {}; const C2 = new Sim(); C2.restore(old); C2.initFlock(old);
  ok(C2.discovered['acc:blackhat'] && !Object.keys(C2.discovered).some(k => !k.startsWith('acc:')), 'an older save quietly notes the accessories already in the park');
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
// v0.9.2 cleanup: registries line up, determinism doesn't depend on the date, LOD/caching
{
  const P = await import('../src/pigeon3d.js');
  const outfits = M.LOCI.find(l => l.id === 'outfit').alleles.filter(a => a !== 'none');
  ok(Object.keys(M.ACCESSORIES).every(a => P.ACCESSORY_BUILDERS[a]) && outfits.every(o => P.OUTFIT_LOOKS[o]), `every accessory has a builder and every outfit a look (${Object.keys(M.ACCESSORIES).length} + ${outfits.length})`);
  ok(Object.keys(M.SEASONS).every(k => outfits.includes(k) && M.BREEDS.some(b => b.seasonal === k)), 'every season has its costume allele and a seasonal breed');
  setSeed(5); ok(new Sim().season === null, 'a seeded park ignores the calendar (same replay any day)');
  const A = { ax: 0, az: 0, bx: .4, bz: 0 }, g = segGap(A, { ...A });
  ok(Math.hypot(g.nx, g.nz) > .99, 'two birds in exactly the same spot still get pushed apart');
  ok(!M.MUT_ONLY.some(([l, a]) => l === 'outfit' && a === 'jersey') && M.MUT_ONLY.length > 30, `the golden egg / goddess pool never includes Jacob's jersey (${M.MUT_ONLY.length} cryptid alleles)`);
  setSeed(8); const S = new Sim(); S.initFlock(null);
  for (let i = 0; i < 6; i++) { startHappening(S, 'goldenegg'); for (let k = 0; k < 400; k++) S.step(); }
  ok(!S.pigeons.some(p => p.genome.outfit.includes('jersey')), 'golden eggs never hatch a superfan jersey');
  const curly = M.computePheno(pureG({ curl: 'curly' }), null), mats = P.makeMaterials(), rig = new P.PigeonRig(curly, mats, false, 1);
  const t1 = rig.mesh.geometry.index.count / 3; rig.setLod(0); const t0 = rig.mesh.geometry.index.count / 3;
  ok(t1 < t0 * .35, `far LOD is light even for frillbacks (${t1} vs ${t0} triangles)`);
  new P.PigeonRig(M.computePheno(pureG({ crest: 'rose' }), null), mats, false, 1).setLod(0); // a second look, not live
  const n0 = P.geometryCacheSize(); P.pruneGeometryCache(new Set([rig.key]));
  ok(P.geometryCacheSize() === 2, `the cache prune keeps both LODs of a live look (${n0} → ${P.geometryCacheSize()})`);
}
console.log(failures() ? `\n${failures()} FAILED` : '\nall sim tests passed');
process.exit(failures() ? 1 : 0);
