// Pigeon Park — flock simulation. Pure logic, no DOM, no three.js.
// Ported from the prototype's 450 ms tick; runs on a fixed timestep in sim-seconds so
// scripted runs (seeded RNG + fixed dt) replay identically.

import * as M from './genetics.js';
import { rand, isSeeded } from './rng.js';
import { tickHappenings, optionOf } from './happenings.js';
import { checkAchievements } from './achievements.js';

export const FIXED_DT = 1 / 30;          // physics step, sim seconds
const THINK_DT = 0.45;            // decision tick, same cadence as the prototype
const DAY_LEN = 170;              // seconds per full day/night cycle (wall clock)
export const PARK = { w: 10.4, d: 6.6 };   // walkable rectangle, metres, centred on origin
export const FOUNTAIN = { x: -1.7, z: -0.8, r: 1.3, lip: 1.42 }; // r: basin wall (visual), lip: outer rim radius
// A bird's footprint for collisions: a segment from tail tip to beak tip, plus half its body width (size 1).
const BODY = { back: .5, front: .31, half: .15 };
const BODY_SIZE = { king: 1.42, dinky: .68, chonk: 1.25 };
function bodyScale(p) { return (BODY_SIZE[p.pheno.e.size] || 1) * (p.jit || 1); }
// Distance from the fountain centre to the nearest point of the bird's body segment, minus what it needs.
// >= 0 means the bird is clear of the rim. Fills `o` (a scratch object by default: per-step callers allocate nothing).
const _fc = {};
export function fountainClearance(p, o = _fc) {
  const k = bodyScale(p), cx = Math.cos(p.dir), cz = Math.sin(p.dir);
  const ax = p.x - cx * BODY.back * k, az = p.z - cz * BODY.back * k;
  const bx = p.x + cx * BODY.front * k, bz = p.z + cz * BODY.front * k;
  const ex = bx - ax, ez = bz - az;
  const t = Math.max(0, Math.min(1, ((FOUNTAIN.x - ax) * ex + (FOUNTAIN.z - az) * ez) / (ex * ex + ez * ez)));
  const qx = ax + ex * t, qz = az + ez * t, d = Math.hypot(qx - FOUNTAIN.x, qz - FOUNTAIN.z);
  o.gap = d - (FOUNTAIN.lip + BODY.half * k); o.qx = qx; o.qz = qz; o.d = d;
  return o;
}
// Bird-to-bird collisions use the body's core (chest to rump; beak and tail tips may brush):
// a capsule along the heading, scaled by breed size and chick age. Pushes are soft: a small overlap is
// allowed (SLOP), a bird standing still can only be nudged a little per pass (MAX_PUSH), and a moving bird
// takes most of the correction itself (it walks around the crowd instead of shoving it along).
const CORE = { back: .3, front: .17, r: .11 };
const SLOP = .02, MAX_PUSH = .01, MOVER_SHARE = .75;
const MOVING = new Set(['walk', 'moonwalk', 'roll', 'blown']);
// Quirky gaits (mutation): walking speed and how long a bird lingers between decisions.
const GAIT_SPEED = { speedy: 1.55, sluggish: .6, strutter: .85 };
const GAIT_PAUSE = { speedy: .6, sluggish: 1.7 };
const byX = (a, b) => a.x - b.x;
export const chickK = (age) => age < 9 ? .58 : age < 18 ? .78 : 1; // chick growth steps (the view draws the same sizes)
export function coreOf(p, t, o = {}) {
  const k = bodyScale(p) * chickK(t - p.born), cx = Math.cos(p.dir), cz = Math.sin(p.dir);
  o.ax = p.x - cx * CORE.back * k; o.az = p.z - cz * CORE.back * k; o.bx = p.x + cx * CORE.front * k; o.bz = p.z + cz * CORE.front * k;
  o.r = CORE.r * k; o.reach = (CORE.back + CORE.r) * k;
  return o;
}
// Closest points between segments a0→a1 and b0→b1 (2D). Fills and returns { d, nx, nz } with n pointing from b
// to a (for crossing segments, d = 0 and n points from b's middle to a's; birds in exactly the same spot: +x).
export function segGap(A, B, o = {}) {
  const ux = A.bx - A.ax, uz = A.bz - A.az, vx = B.bx - B.ax, vz = B.bz - B.az, wx = A.ax - B.ax, wz = A.az - B.az;
  const a = ux * ux + uz * uz, b = ux * vx + uz * vz, c = vx * vx + vz * vz, d = ux * wx + uz * wz, e = vx * wx + vz * wz;
  const D = a * c - b * b;
  let sN = D < 1e-9 ? 0 : clamp((b * e - c * d) / D, 0, 1), tN = c < 1e-9 ? 0 : (b * sN + e) / c;
  if (tN < 0) { tN = 0; sN = a < 1e-9 ? 0 : clamp(-d / a, 0, 1); } else if (tN > 1) { tN = 1; sN = a < 1e-9 ? 0 : clamp((b - d) / a, 0, 1); }
  const px = A.ax + ux * sN - (B.ax + vx * tN), pz = A.az + uz * sN - (B.az + vz * tN), dist = Math.hypot(px, pz);
  if (dist > 1e-6) { o.d = dist; o.nx = px / dist; o.nz = pz / dist; return o; }
  // the body lines cross: separate along the centre-to-centre direction (midpoints), never an arbitrary axis
  const cx = (A.ax + A.bx - B.ax - B.bx) / 2, cz = (A.az + A.bz - B.az - B.bz) / 2, cd = Math.hypot(cx, cz);
  o.d = 0; o.nx = cd > 1e-6 ? cx / cd : 1; o.nz = cd > 1e-6 ? cz / cd : 0;
  return o;
}
export const ROOST_SIZE = 8;
const FESTIVE_HATCH = .03;           // in a holiday season, share of eggs that hatch already in that holiday's costume
export const JACOB_AFTER = 20 * 60;  // seconds of play (wall clock, park running) before Jacob turns up
export const TREE_DEPTH = 3;      // family records kept per bird: parents, grandparents, great-grandparents
export const POOP = { max: 14, life: 30 }; // cosmetic poop: at most this many at once, each lasts `life` sim seconds
export const DOVECOTE = { x: 8.9, z: -6.5 };
const ADULT_AGE = 13;
const PX = 0.0066;                       // prototype pixel → metre (92 px pigeon ≈ 0.6 m)
const SP = 1.4;                          // prototype's internal pace factor

export const SPEEDS = [
  { id: 'stroll', label: 'Stroll', v: 0.5 },
  { id: 'normal', label: 'Normal', v: 1 },
  { id: 'bustling', label: 'Bustling', v: 1.7 },
  { id: 'frantic', label: 'Frantic', v: 2.5 },
];
export const MUTATIONS = [
  { id: 'calm', label: 'Calm', v: 0.5 },
  { id: 'normal', label: 'Normal', v: 1 },
  { id: 'chaos', label: 'Chaos', v: 3 },
];

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
// Turn a bird to face a point.
export const face = (p, x, z) => { p.dir = Math.atan2(z - p.z, x - p.x); };
// Nearest bird to (x, z) in `list` within maxD that passes `ok` (the first found wins ties) → { q, d }.
function nearest(list, x, z, maxD = Infinity, ok) {
  let q = null, d = maxD;
  for (const b of list) { if (ok && !ok(b)) continue; const e = Math.hypot(b.x - x, b.z - z); if (e < d) { d = e; q = b; } }
  return { q, d };
}
// "Also Nugget" for a copy — unless that gets too long, then a fresh name.
const cloneName = (name) => { const nm = 'Also ' + name; return nm.length > 30 ? M.randomName() : nm; };

// Night amount 0..1 from day phase (same curve as the prototype).
function nightOf(ph) {
  return ph < .55 ? 0 : ph < .62 ? (ph - .55) / .07 : ph < .88 ? 1 : ph < .95 ? 1 - (ph - .88) / .07 : 0;
}
// Day phase <-> clock hour. Day 07:00–18:00, dusk to 20:00, night to 05:00, dawn to 07:00.
const PH_KEYS = [[0, 7], [.55, 18], [.62, 20], [.88, 29], [1, 31]];
export function phaseToHour(ph) {
  ph = ((ph % 1) + 1) % 1;
  for (let i = 1; i < PH_KEYS.length; i++) {
    const [p0, h0] = PH_KEYS[i - 1], [p1, h1] = PH_KEYS[i];
    if (ph <= p1) return (h0 + (h1 - h0) * (ph - p0) / (p1 - p0)) % 24;
  }
  return 7;
}
function hourToPhase(h) {
  h = ((h % 24) + 24) % 24; if (h < 7) h += 24;
  for (let i = 1; i < PH_KEYS.length; i++) {
    const [p0, h0] = PH_KEYS[i - 1], [p1, h1] = PH_KEYS[i];
    if (h <= h1) return p0 + (p1 - p0) * (h - h0) / (h1 - h0);
  }
  return 0;
}

function genomeHash(genome) {
  let jh = 0; const js = JSON.stringify(genome);
  for (let i = 0; i < js.length; i++) jh = (jh * 31 + js.charCodeAt(i)) | 0;
  return jh >>> 0;
}

export const pureGenome = M.pureGenome; // (lived here first; tests and the debug API still import it from the sim)

export class Sim {
  constructor() { this.reset(); }

  reset() {
    this.t = 0;              // scaled sim time (seconds) — ages, timers
    this.wall = 0;           // unscaled sim time — drives the day cycle
    this.phase0 = 0.16;      // day phase at wall=0
    this.thinkAcc = 0;
    this.ids = 1;
    this.pigeons = []; this.eggs = []; this.poops = [];
    this.roost = []; this.discovered = {}; this.breeds = {};
    // Ancestry: lineage id → { n: name, g: encoded genome, a: accessory, ge: generation, par: [lid, lid] | null,
    // how: 'hatch'|'founder'|'clone'|'registry'|'summoned'|'golden'|'visitor'|'superfan'|'unknown', of: cloned bird's name }.
    // Lineage ids survive save/load (sim ids don't); records outside TREE_DEPTH of anyone alive are pruned.
    this.family = {}; this.lids = 1; this.pruneAt = 60;
    this.stats = { births: 0, flown: 0, maxGen: 1, happenings: 0, playTime: 0, jacob: 0 };
    this.season = isSeeded() ? null : M.seasonOf(); // the real calendar's holiday season (or null); ?season= overrides.
                                                    // Seeded runs ignore the date so they replay the same any day.
    this.achievements = {};  // id → { at }
    this.court = null;
    this.selId = null;
    this.cap = 45;
    this.speed = 1; this.mut = 'normal'; this.poopEnabled = true;
    this.events = [];
    this.ready = false;      // autosave gate: never save before the flock has loaded
    this.happening = null; this.nextHappeningAt = 55; this.whimsy = 'some'; this.bread = null; this.ufo = null; this.goddess = null; this.rain = 0;
    this.replies = [];       // queued "reply" bubbles: { id, at, text }
    this.said = new Map();   // recently said lines per pool (no quick repeats)
    this._rp = new WeakMap(); // roost entry → phenotype (roost entries are plain saved records)
    this.night = nightOf(this.phase());
  }

  // ---------- clocks ----------
  phase() { return (((this.phase0 + this.wall / DAY_LEN) % 1) + 1) % 1; }
  hour() { return phaseToHour(this.phase()); }
  setTimeOfDay(h) { this.phase0 = hourToPhase(h) - this.wall / DAY_LEN; this.night = nightOf(this.phase()); }
  mutF() { return optionOf(MUTATIONS, this.mut).v; }
  age(p) { return this.t - p.born; }
  adult(p) { return this.age(p) > ADULT_AGE; }
  emit(e) { this.events.push(e); if (this.events.length > 200) this.events.shift(); }
  toast(msg, kind = 'plain') { this.emit({ type: 'toast', msg, kind }); }
  sound(name, extra) { this.emit({ type: 'sound', name, ...extra }); }
  sparkle(x, z, tier) { this.emit({ type: 'sparkle', x, z, tier }); }
  byId(id) { return this.pigeons.find(p => p.id === id); }
  // A speech bubble for `secs` sim seconds.
  speak(p, text, secs = 2.4) { if (p) { p.emote = { kind: 'say', text }; p.emoteUntil = this.t + secs; } }
  // ...with a line from a pool (no quick repeats).
  speakFrom(p, pool, secs) { this.speak(p, M.say(pool, this.said), secs); }
  keepInPark(p) { p.x = clamp(p.x, -PARK.w / 2, PARK.w / 2); p.z = clamp(p.z, -PARK.d / 2, PARK.d / 2); }

  // ---------- geometry ----------
  // Keep a point (a walk target, spawn or drop spot) in the park and a comfortable step off the fountain.
  clampToPark(x, z) {
    x = clamp(x, -PARK.w / 2, PARK.w / 2); z = clamp(z, -PARK.d / 2, PARK.d / 2);
    const R = FOUNTAIN.lip + .3, dx = x - FOUNTAIN.x, dz = z - FOUNTAIN.z, d = Math.hypot(dx, dz);
    if (d < R) {
      const k = R / (d || 1);
      x = FOUNTAIN.x + (d ? dx : 1) * k; z = FOUNTAIN.z + dz * k;
    }
    return [x, z];
  }
  // Push a bird's whole body (tail to beak, at its size and heading) clear of the fountain rim.
  keepOut(p) {
    const fx = p.x - FOUNTAIN.x, fz = p.z - FOUNTAIN.z, far = FOUNTAIN.lip + 1.3; // > longest tail + half-width of any bird
    if (fx * fx + fz * fz > far * far) return false; // nowhere near the rim
    const c = fountainClearance(p);
    if (c.gap >= 0) return false;
    let nx = c.qx - FOUNTAIN.x, nz = c.qz - FOUNTAIN.z, n = c.d;
    if (n < 1e-6) { nx = p.x - FOUNTAIN.x; nz = p.z - FOUNTAIN.z; n = Math.hypot(nx, nz) || 1; }
    p.x += nx / n * -c.gap; p.z += nz / n * -c.gap;
    this.keepInPark(p);
    return true;
  }
  // A random open spot. Spots inside the fountain are re-rolled (not pushed onto the rim — that sent one
  // trip in seven to the same thin ring and piled birds up around the basin).
  randomSpot() {
    for (let k = 0; k < 6; k++) {
      const x = (rand() - .5) * PARK.w, z = (rand() - .5) * PARK.d;
      if (Math.hypot(x - FOUNTAIN.x, z - FOUNTAIN.z) > FOUNTAIN.lip + .5) return this.clampToPark(x, z);
    }
    return this.clampToPark((rand() - .5) * PARK.w, (rand() - .5) * PARK.d);
  }

  // ---------- flock ----------
  spawn({ genome, accessory = null, name, gen = 1, adult = false, x, z, quiet = false, dir, lid, how = 'founder', par = null, of }) {
    M.normalizeGenome(genome); // older saves predate some genes
    const pheno = M.computePheno(genome, accessory);
    if (x === undefined || z === undefined) [x, z] = this.randomSpot(); else [x, z] = this.clampToPark(x, z);
    const p = {
      id: this.ids++, name, genome, accessory, pheno, gen,
      jit: .93 + (genomeHash(genome) % 1000) / 1000 * .16,
      born: adult ? this.t - 60 : this.t,
      x, z, y: 0, tx: x, tz: z, v: 0,
      dir: dir !== undefined ? dir : (rand() < .5 ? 0 : Math.PI),
      state: 'idle', stateUntil: this.t + .4 + rand() * 1.5, stateAt: this.t,
      emote: null, emoteUntil: 0, courting: false, flying: false, flyAt: 0, held: false,
      breeds: null,
      lid: lid ?? this.lids++,
    };
    p.breeds = this.breedsOf(p);
    if (!this.family[p.lid]) this.family[p.lid] = { n: name, g: M.encodeGenome(genome), a: accessory, ge: gen, par, how, ...(of ? { of } : {}) };
    this.keepOut(p);
    this.pigeons.push(p);
    this.stats.maxGen = Math.max(this.stats.maxGen, p.gen);
    if (!quiet) this.notice(p);
    return p;
  }

  notice(p) {
    for (const t of p.pheno.traits) {
      if (M.PEDIA[t.key] && !this.discovered[t.key]) {
        this.discovered[t.key] = 1;
        this.toast('Field note unlocked: ' + t.label, 'note');
      }
    }
    for (const b of p.breeds) {
      if (!this.breeds[b.id]) {
        this.breeds[b.id] = { by: p.name, at: Date.now() };
        this.toast('BREED DISCOVERED — ' + b.name + '!', 'breed');
        this.sound('chime');
        this.sparkle(p.x, p.z, 3);
        this.emit({ type: 'breed', id: b.id, pid: p.id });
      }
    }
  }

  initFlock(saved) {
    this.ready = true;
    if (saved && saved.pigeons && saved.pigeons.length) {
      saved.pigeons.slice(0, this.cap).forEach(sp => {
        const q = this.spawn({ genome: sp.g, accessory: sp.a, name: sp.n, gen: sp.ge || 1, adult: true, quiet: true, x: sp.x, z: sp.z, lid: sp.l, how: 'unknown' });
        if (sp.d != null) q.dir = sp.d;
      });
      // accessories already in the park / roost count as observed (field notes for them were added in v0.9)
      for (const a of [...this.pigeons, ...this.roost].flatMap(b => M.accList(b.accessory))) this.discovered['acc:' + a] = 1;
      return;
    }
    for (let i = 0; i < 7; i++) {
      const g = M.founderGenome();
      if (i === 1) g.crest = ['none', 'shell'];
      if (i === 2) g.tail = ['normal', 'fantail'];
      if (i === 3) g.dilute = ['full', 'dilute'];
      if (i === 4) g.pied = ['splash', 'splash'];
      if (i === 5) g.muffs = ['clean', 'muffed'];
      this.spawn({ genome: g, name: M.randomName(), gen: 1, adult: true, quiet: true });
    }
  }

  walkTo(p, tx, tz, speed) {
    [tx, tz] = this.clampToPark(tx, tz);
    p.tx = tx; p.tz = tz; p.v = speed * (GAIT_SPEED[p.pheno.e.gait] || 1);
    const d = Math.hypot(tx - p.x, tz - p.z);
    p.state = 'walk'; p.stateAt = this.t;
    p.stateUntil = this.t + Math.max(.4, d / speed);
    if (d > .01) face(p, tx, tz);
  }

  fly(p, withToast) {
    p.flying = true; p.flyAt = this.t; p.state = 'fly'; p.emote = null; p.courting = false; p.held = false;
    p.fdx = rand() < .5 ? -1 : 1;
    this.stats.flown++;
    this.sound('whoosh');
    if (withToast) this.toast(M.copy('flyoff', p.name));
    if (this.selId === p.id) { this.selId = null; this.emit({ type: 'deselect' }); }
  }

  // ---------- stepping ----------
  // Advance by one fixed step (FIXED_DT wall seconds, scaled by park speed for gameplay).
  step() {
    const dt = FIXED_DT * this.speed;
    this.wall += FIXED_DT;
    this.stats.playTime += FIXED_DT;
    this.t += dt;
    this.move(dt);
    this.thinkAcc += dt;
    while (this.thinkAcc >= THINK_DT) {
      this.thinkAcc -= THINK_DT; this.think();
      for (const p of this.pigeons) if (!p.flying && !p.held) this.keepOut(p); // think() may have turned birds
      this.separate(false); // ...or placed / turned them into a neighbour
    }
  }

  move(dt) {
    for (const p of this.pigeons) {
      if (p.held) continue;
      if (p.flying) {
        const k = (this.t - p.flyAt);
        p.y = 0.2 + k * k * 2.2 + k * 1.2;
        p.x += p.fdx * dt * 1.6; p.z -= dt * 1.1;
        p.dir = p.fdx > 0 ? -0.35 : Math.PI + 0.35;
        continue;
      }
      if (p.state === 'abducted') { p.y += ((p.ty || 0) - p.y) * Math.min(1, dt * 1.6); continue; } // beamed up (and back down)
      if (p.state === 'hop' && p.hop) { // flutter along an arc to the landing spot
        const H = p.hop, k = Math.min(1, (this.t - H.at) / H.dur);
        p.x = H.x0 + (p.tx - H.x0) * k; p.z = H.z0 + (p.tz - H.z0) * k; p.y = Math.sin(k * Math.PI) * H.h;
        if (k >= 1) { p.y = 0; p.hop = null; p.state = 'idle'; p.stateUntil = this.t + .6 + rand(); this.keepOut(p); }
        continue;
      }
      if (p.y > 0) p.y = Math.max(0, p.y - dt * 3);
      if (MOVING.has(p.state)) {
        const x0 = p.x, z0 = p.z;
        const dx = p.tx - p.x, dz = p.tz - p.z, d = Math.hypot(dx, dz);
        const s = p.v * dt;
        if (d <= s) { p.x = p.tx; p.z = p.tz; if (!p.courting && (p.state === 'walk' || p.state === 'moonwalk')) p.state = 'idle'; }
        else { p.x += dx / d * s; p.z += dz / d * s; if (p.state === 'walk') p.dir = Math.atan2(dz, dx); else if (p.state === 'moonwalk') p.dir = Math.atan2(dz, dx) + Math.PI; }
        this.keepInPark(p);
        // sliding around the rim: face the way we actually moved, not into the stone
        if (this.keepOut(p) && p.state === 'walk') {
          const mx = p.x - x0, mz = p.z - z0;
          if (Math.hypot(mx, mz) > s * .3) { p.dir = Math.atan2(mz, mx); this.keepOut(p); }
        }
      } else this.keepOut(p); // turning in place (courting, pecking) can swing a tail or beak into the rim
    }
    this.separate();
  }

  // Birds don't walk through each other: overlapping body capsules are pushed apart along the gap (half
  // by share, capped), a few passes per step.
  // countStuck: once per sim step (the extra pass after a think tick doesn't count toward "stuck").
  separate(countStuck = true) {
    const list = this._solid || (this._solid = []), cores = this._cores || (this._cores = []), g = this._gap || (this._gap = {});
    list.length = 0;
    for (const p of this.pigeons) if (!p.flying && !p.held && p.state !== 'abducted' && p.y < .3) list.push(p);
    const n = list.length, C = this.court;
    // a few relaxation passes; the fountain and park edge are applied inside each pass so a bird pinned
    // against the rim doesn't get shoved back into its neighbour afterwards (the neighbour moves instead).
    // Sweep along x: sorted by x, a pair further apart in x than the two largest reaches can't touch.
    for (let pass = 0; pass < 3; pass++) {
      list.sort(byX);
      let maxReach = 0;
      for (let i = 0; i < n; i++) { cores[i] = coreOf(list[i], this.t, cores[i]); maxReach = Math.max(maxReach, cores[i].reach); }
      let moved = false;
      for (let i = 0; i < n; i++) {
        const p = list[i], A = cores[i], xEnd = p.x + A.reach + maxReach;
        for (let j = i + 1; j < n; j++) {
          const q = list[j]; if (q.x > xEnd) break;
          const B = cores[j], lim = A.reach + B.reach, dx = p.x - q.x, dz = p.z - q.z;
          if (dx * dx + dz * dz > lim * lim) continue;
          if (C && ((C.a === p.id && C.b === q.id) || (C.a === q.id && C.b === p.id))) continue; // a courting pair gets close on purpose
          segGap(A, B, g); const over = A.r + B.r - SLOP - g.d;
          if (over <= 0) continue;
          // a moving bird takes most of the correction (it steers round); a bird standing still is only nudged
          const mp = MOVING.has(p.state), mq = MOVING.has(q.state), sp = mp === mq ? .5 : mp ? MOVER_SHARE : 1 - MOVER_SHARE;
          const hp = mp ? over * sp : Math.min(over * sp, MAX_PUSH), hq = mq ? over * (1 - sp) : Math.min(over * (1 - sp), MAX_PUSH);
          p.x += g.nx * hp; p.z += g.nz * hp; q.x -= g.nx * hq; q.z -= g.nz * hq;
          p.bump = q.bump = true; moved = true;
        }
      }
      if (!moved) break;
      for (const p of list) if (p.bump) { this.keepInPark(p); this.keepOut(p); p.blockedNow = true; p.bump = false; }
    }
    // Stuck → hop somewhere quieter: a walker jostled without getting any closer to where it's going for
    // ~1 s (sliding round a neighbour is progress, not stuck), or a bird squeezed standing still for ~2.5 s.
    if (!countStuck) { for (const p of list) p.blockedNow = false; return; }
    for (const p of list) {
      const walking = p.state === 'walk', d = walking ? Math.hypot(p.tx - p.x, p.tz - p.z) : 0;
      const progress = walking && p.prevD != null ? p.prevD - d : 0; p.prevD = walking ? d : null;
      const jammed = p.blockedNow && (!walking || progress < p.v * FIXED_DT * this.speed * .25);
      p.blockedNow = false;
      if (!jammed || p.courting || p.busy || p.visitor || p.state === 'sleep' || p.state === 'hop') { if (p.stuck) p.stuck = Math.max(0, p.stuck - 2); continue; }
      p.stuck = (p.stuck || 0) + 1;
      if (p.stuck > (walking ? 30 : 75)) {
        p.stuck = 0; p.prevD = null;
        // first try another way (a fresh destination, away from the blockage); jammed again soon after → hop
        if (walking && !(this.t - (p.reroutedAt ?? -99) < 6)) { p.reroutedAt = this.t; const [tx, tz] = this.randomSpot(); this.walkTo(p, tx, tz, p.v); this.keepOut(p); } // (turning can swing a tail into the rim)
        else this.hop(p);
      }
    }
  }

  // A short flutter to the emptiest of a few random spots (a stuck bird's way out of a jam).
  hop(p) {
    let best = null, bestGap = -1;
    for (let k = 0; k < 8; k++) {
      const [x, z] = this.randomSpot(), dd = Math.hypot(x - p.x, z - p.z);
      if (dd < 1.2) continue; // somewhere else, not next door
      const gap = nearest(this.pigeons, x, z, Infinity, q => q !== p && !q.flying).d;
      if (gap > bestGap) { bestGap = gap; best = [x, z]; }
    }
    if (!best) return;
    const [tx, tz] = best, d = Math.hypot(tx - p.x, tz - p.z);
    p.state = 'hop'; p.courting = false;
    p.hop = { x0: p.x, z0: p.z, at: this.t, dur: .7 + d * .22, h: .35 + d * .1 };
    face(p, tx, tz); p.tx = tx; p.tz = tz;
    p.stateUntil = this.t + p.hop.dur + .5;
    if (!p.emote && rand() < .4) this.speakFrom(p, M.BUMP_LINES, 1.6);
    this.sound('flap', { id: p.id });
  }

  think() {
    const now = this.t, cap = this.cap;
    this.night = nightOf(this.phase());
    // remove flown
    this.pigeons = this.pigeons.filter(p => !(p.flying && now - p.flyAt > 1.5));
    const pop = this.pigeons.length;
    tickHappenings(this);
    // replies: a neighbour answers a thought a moment later
    if (this.replies.length) this.replies = this.replies.filter(r => { if (now < r.at) return true; const q = this.byId(r.id); if (q && !q.flying && !q.emote) this.speak(q, r.text, 2.2); return false; });
    for (const p of this.pigeons) {
      if (p.flying || p.held) continue;
      if (p.emote && now > p.emoteUntil) p.emote = null;
      if (p.visitor && now > p.visitor.leaveAt && !p.busy) { this.fly(p, false); continue; }
      if (p.courting || p.busy || p.state === 'hop') continue;
      if (now >= p.stateUntil) {
        const sleepy = this.night > .6, r = rand(), gait = p.pheno.e.gait, pause = GAIT_PAUSE[gait] || 1;
        p.stateAt = now;
        if (sleepy && r < .55) { p.state = 'sleep'; p.stateUntil = now + 3 + rand() * 5; p.emote = { kind: 'zzz' }; p.emoteUntil = p.stateUntil; }
        else if (p.pheno.e.behavior === 'tumbler' && r < .08) { p.state = 'tumble'; p.stateUntil = now + .75; }
        else if (p.pheno.e.behavior === 'parlor' && r < .1) {
          // parlor roller: somersaults along the ground in the direction it faces
          p.state = 'roll'; p.stateUntil = now + 1.1;
          [p.tx, p.tz] = this.clampToPark(p.x + Math.cos(p.dir) * .6, p.z + Math.sin(p.dir) * .6); p.v = .55;
        }
        else if (gait === 'jumpy' && r < .14) { p.state = 'jump'; p.stateUntil = now + .55; }           // a startled little hop
        else if (gait === 'twirly' && r < .1) { p.state = 'twirl'; p.stateUntil = now + .9; }           // an unprompted pirouette
        else if (gait === 'sluggish' && r < .06) { p.state = 'sleep'; p.stateUntil = now + 4 + rand() * 4; p.emote = { kind: 'zzz' }; p.emoteUntil = p.stateUntil; } // dozes off by day
        else if (r < (sleepy ? .8 : .5)) {
          const [tx, tz] = this.randomSpot();
          this.walkTo(p, tx, tz, 42 * PX * SP);
        }
        else if (r < .8) { p.state = 'peck'; p.stateUntil = now + (1.2 + rand() * 1.8) * pause; }
        else { p.state = 'idle'; p.stateUntil = now + (.9 + rand() * 2.2) * pause; }
      }
      if (!p.emote && p.state !== 'sleep' && rand() < .004) {
        this.speakFrom(p, this.night > .5 && rand() < .4 ? M.NIGHT_THOUGHTS : M.THOUGHTS, 2.6);
        if (rand() < .3) { // someone nearby has opinions
          const { q } = nearest(this.pigeons, p.x, p.z, 1.6, q => q !== p && !q.flying && !q.held);
          if (q) this.replies.push({ id: q.id, at: now + .9 + rand() * .6, text: M.say(M.REPLIES, this.said) });
        }
      }
      // ambient cooing: about the same park-wide rate whether there are 8 birds or 45
      if (rand() < .012 * Math.min(1, 9 / pop)) this.sound('coo', { voice: p.pheno.e.voice, vol: .5, id: p.id });
    }
    // courtship
    if (!this.court && pop >= 2 && pop < cap && rand() < (0.10 * (1 - pop / cap) + 0.02) * SP) {
      const adults = this.pigeons.filter(p => this.adult(p) && !p.flying && !p.held && !p.busy && !p.visitor && p.state !== 'sleep' && p.state !== 'hop');
      if (adults.length >= 2) {
        const a = M.pick(adults), { q: b } = nearest(adults, a.x, a.z, Infinity, q => q !== a);
        if (b) {
          let [mx, mz] = this.clampToPark((a.x + b.x) / 2, (a.z + b.z) / 2);
          mx = clamp(mx, -PARK.w / 2 + .3, PARK.w / 2 - .3);
          this.court = { a: a.id, b: b.id, mx, mz, until: now + 12, eggAt: 0 };
          a.courting = b.courting = true;
          this.walkTo(a, mx - .24, mz, 56 * PX * SP);
          if (rand() < .45) this.speakFrom(a, M.COURT_LINES, 2.4);
          this.walkTo(b, mx + .24, mz, 56 * PX * SP);
        }
      }
    }
    if (this.court) {
      const C = this.court, a = this.byId(C.a), b = this.byId(C.b);
      if (!a || !b || a.flying || b.flying || a.held || b.held || now > C.until) {
        this.endCourt();
      } else {
        const close = Math.hypot(a.x - (C.mx - .24), a.z - C.mz) < .2 && Math.hypot(b.x - (C.mx + .24), b.z - C.mz) < .2;
        if (close) { a.dir = 0; b.dir = Math.PI; a.state = b.state = 'court'; }
        if (close && !C.eggAt) {
          C.eggAt = now + 1.6;
          a.emote = { kind: 'heart' }; a.emoteUntil = now + 1.6;
          b.emote = { kind: 'heart' }; b.emoteUntil = now + 1.6;
          this.sound('coo', { voice: a.pheno.e.voice, vol: .8, id: a.id });
        }
        if (C.eggAt && now >= C.eggAt) {
          const off = M.offspring(a.genome, b.genome, this.mutF(), this.season);
          if (this.season && rand() < FESTIVE_HATCH) off.genome.outfit = [this.season, this.season]; // in season, some chicks hatch in costume
          this.eggs.push({ id: this.ids++, x: C.mx, z: C.mz + .12, genome: off.genome, gen: Math.max(a.gen, b.gen) + 1, laidAt: now, hatchAt: now + 6 + rand() * 3.5, parents: [a.lid, b.lid] });
          this.sound('pop');
          a.courting = b.courting = false; a.stateUntil = b.stateUntil = now; a.state = b.state = 'idle';
          this.court = null;
        }
      }
    }
    // eggs (hatched in laying order)
    for (let i = 0; i < this.eggs.length; i++) {
      const eg = this.eggs[i];
      if (now >= eg.hatchAt) {
        this.eggs.splice(i--, 1);
        const acc = M.rollAccessory(0.02);
        const baby = this.spawn({ genome: eg.genome, accessory: acc, name: M.randomName(), gen: eg.gen, x: eg.x, z: eg.z, dir: Math.PI / 2, how: eg.golden ? 'golden' : 'hatch', par: eg.parents || null });
        if (rand() < .6) this.speakFrom(baby, M.BABY_LINES, 2.6);
        if (eg.golden) { this.sparkle(eg.x, eg.z, 3); this.toast('The golden egg hatched… something: ' + baby.pheno.label + (baby.breeds.length ? ' (' + baby.breeds.map(b => b.name).join(', ') + ')' : '') + '.', 'breed'); }
        this.stats.births++;
        this.sound('pop');
        this.emit({ type: 'hatch', x: eg.x, z: eg.z, pid: baby.id });
        const tier = baby.pheno.sparkTier;
        if (tier >= 1) this.sparkle(eg.x, eg.z, tier);
        if (tier >= 2) this.toast('A remarkable hatch: ' + baby.pheno.label + '.', 'note');
        else if (rand() < .13) this.toast(M.pick(M.COPY.birth));
      }
    }
    // fly-offs: gentle pressure as the park fills, forced when over capacity
    const n = this.pigeons.length, over = n > cap;
    if (n > 4 && (over ? rand() < .5 : rand() < 0.10 * Math.pow(n / cap, 3) * SP)) {
      const cands = this.pigeons.filter(p => !p.flying && !p.held && !p.courting && !p.busy && !p.visitor && p.id !== this.selId && this.adult(p) && !M.accList(p.accessory).some(a => M.ACCESSORIES[a].stays)); // superfans never leave
      if (cands.length) this.fly(M.pick(cands), rand() < .5);
    }
    // poop (cosmetic)
    if (this.poopEnabled && rand() < .05 && this.pigeons.length) {
      const p = M.pick(this.pigeons);
      if (!p.flying && !p.held) {
        this.poops.push({ id: this.ids++, x: p.x - Math.cos(p.dir) * .22, z: p.z - Math.sin(p.dir) * .22, at: now, r: rand() });
        if (this.poops.length > POOP.max) this.poops.shift();
      }
    }
    while (this.poops.length && now - this.poops[0].at >= POOP.life) this.poops.shift(); // oldest first
    checkAchievements(this);
    if (!this.stats.jacob && this.stats.playTime >= JACOB_AFTER && this.alive() < this.cap && !this.happening) this.jacobArrives();
    if (now >= this.pruneAt) { this.pruneFamily(); this.pruneAt = now + 60; } // also on save; this keeps ?nosave runs bounded
  }

  // After a bird's genes or accessories change: new phenotype, maybe new breeds; the view rebuilds on p.rev.
  refresh(p) {
    p.pheno = M.computePheno(p.genome, p.accessory); p.breeds = this.breedsOf(p);
    p.rev = (p.rev || 0) + 1;
    this.notice(p);
  }
  // Swap a bird's accessories (UFO / goddess gifts).
  setAccessory(p, acc) {
    p.accessory = acc;
    if (this.family[p.lid]) this.family[p.lid].a = acc;
    this.refresh(p);
  }

  // Call off the current courtship: both birds stop courting and pick something new to do.
  endCourt() {
    const C = this.court; if (!C) return;
    for (const id of [C.a, C.b]) { const p = this.byId(id); if (p) { p.courting = false; p.stateUntil = this.t; } }
    this.court = null;
  }

  // Pigeon Park Superfan #1: turns up once, after a good while of play, and stays.
  jacobArrives() {
    this.stats.jacob = 1;
    const { genome, accessory } = M.breedGenome(M.BREEDS.find(b => b.id === 'jacob'));
    const p = this.spawn({ genome, accessory, name: 'Jacob', gen: this.stats.maxGen, adult: true, x: -PARK.w / 2 + .6, z: PARK.d / 2 - .6, dir: -.6, how: 'superfan' });
    this.speak(p, 'GO PIGEON PARK!!', 3.5);
    this.sparkle(p.x, p.z, 3); this.sound('chime');
    this.toast("Jacob has arrived. He's been here every day since opening. Pigeon Park Superfan #1!", 'breed');
    return p;
  }

  // A bird's breeds: some depend on more than looks (the Omnipigeon needs generation 10 and The Anomaly first).
  // Takes a bird, or any { pheno, gen } (a roost entry, an ancestor record).
  breedsOf({ pheno, gen = 1 }) { return M.matchBreeds(pheno, { gen, found: this.breeds }); }

  // Change a bird's genes in place (the goddess's mutations).
  regene(p, genome) {
    p.genome = M.normalizeGenome(genome);
    if (this.family[p.lid]) this.family[p.lid].g = M.encodeGenome(p.genome);
    this.refresh(p);
  }

  // ---------- player actions ----------
  alive() { let n = 0; for (const p of this.pigeons) if (!p.flying) n++; return n; }
  full() { if (this.alive() >= this.cap) { this.toast(M.copy('full')); return true; } return false; }

  clonePigeon(id) {
    const p = this.byId(id); if (!p || p.flying || this.full()) return null;
    const q = this.spawn({ genome: structuredClone(p.genome), accessory: p.accessory, name: cloneName(p.name), gen: p.gen, adult: true, x: p.x + .45, z: p.z + .15, dir: p.dir, how: 'clone', of: p.name, par: this.family[p.lid]?.par || null });
    this.stats.births++;
    this.sparkle(q.x, q.z, 1);
    this.sound('pop');
    this.toast(M.copy('clone', p.name));
    return q;
  }
  dismissPigeon(id) {
    const p = this.byId(id); if (!p || p.flying) return;
    this.fly(p, false);
    this.toast(M.copy('dismiss', p.name));
  }
  roostAdd(id) {
    const p = this.byId(id); if (!p || p.flying) return false;
    if (this.roost.length >= ROOST_SIZE) { this.toast(M.copy('roostFull')); return false; }
    this.roost.push({ name: p.name, genome: p.genome, accessory: p.accessory, gen: p.gen, lid: p.lid });
    this.pigeons = this.pigeons.filter(x => x.id !== id);
    if (this.court && (this.court.a === id || this.court.b === id)) this.endCourt(); // the partner goes back to its day
    if (this.selId === id) this.selId = null;
    this.emit({ type: 'roosted', x: p.x, z: p.z });
    this.toast(M.copy('roosted', p.name), 'note');
    this.sound('coo', { voice: p.pheno.e.voice, vol: .7 });
    return true;
  }
  releaseRoost(i, keep) {
    const r = this.roost[i]; if (!r || this.full()) return null;
    const p = this.spawn({ genome: structuredClone(r.genome), accessory: r.accessory, name: keep ? cloneName(r.name) : r.name, gen: r.gen, adult: true,
      ...(keep ? { how: 'clone', of: r.name, par: this.family[r.lid]?.par || null } : { lid: r.lid, how: 'unknown' }) });
    if (keep) this.stats.births++;
    this.sparkle(p.x, p.z, 1);
    this.sound('pop');
    if (!keep) this.roost.splice(i, 1);
    return p;
  }
  roostPheno(r) { let ph = this._rp.get(r); if (!ph) this._rp.set(r, ph = M.computePheno(r.genome, r.accessory)); return ph; }
  removeRoost(i) {
    const r = this.roost[i]; if (!r) return;
    this.roost.splice(i, 1);
    this.toast(r.name + ' retired from public life.');
  }
  cloneBreed(id) {
    const b = M.BREEDS.find(x => x.id === id);
    if (!b || !this.breeds[id] || this.full()) return null;
    const { genome, accessory } = M.breedGenome(b);
    const p = this.spawn({ genome, accessory, name: M.randomName(), gen: this.stats.maxGen, adult: true, how: 'registry', of: b.name });
    this.stats.births++;
    this.sparkle(p.x, p.z, 2);
    this.sound('pop');
    this.toast('One ' + b.name + ', made to order.', 'note');
    return p;
  }
  // Secret-code birds: [name, genome overrides] each, at spot() → [x, z].
  summon(list, spot, msg) {
    for (const [name, over] of list) {
      const [x, z] = spot();
      const p = this.spawn({ genome: pureGenome(over), name, gen: this.stats.maxGen, adult: true, x, z, how: 'summoned' });
      this.sparkle(p.x, p.z, 3);
    }
    this.sound('chime');
    this.toast(msg, 'breed');
  }
  summonLegends() {
    this.summon([
      ['THE VOID PIGEON', { fantasy: 'void', glow: 'glow', eye: 'pearl' }],
      ['THE GALAXY PIGEON', { sheen: 'galaxy', fpattern: 'stars', tail: 'fantail' }],
    ], () => [(rand() - .5) * 2, 1 + rand()], 'W rizz. The legends have descended.');
  }
  summonOres() {
    const ores = [
      ['THE DIAMOND PIGEON', 'diamond'], ['THE EMERALD PIGEON', 'emerald'], ['THE GOLD PIGEON', 'gold'],
      ['THE GOLD ORE PIGEON', 'goldore'], ['THE DIAMOND ORE PIGEON', 'diamondore'], ['THE EMERALD ORE PIGEON', 'emeraldore'],
      ['THE REDSTONE ORE PIGEON', 'redstoneore'], ['THE IRON ORE PIGEON', 'ironore'], ['THE LAPIS ORE PIGEON', 'lapisore'],
      ['THE MIXED GEMSTONE PIGEON', 'gemore'], ['THE COAL ORE PIGEON', 'coalore'],
    ];
    this.summon(ores.map(([name, f]) => [name, { fantasy: f }]), () => [(rand() - .5) * PARK.w * .7, (rand() - .5) * PARK.d * .5],
      'The mineshaft opens. Eleven ore pigeons surface.');
  }

  // ---------- drag (player carries a bird) ----------
  grab(id) {
    const p = this.byId(id); if (!p || p.flying) return null;
    p.held = true; p.courting = false; p.state = 'held'; p.busy = null;
    this.speakFrom(p, M.HELD_LINES, 2.4);
    if (this.court && (this.court.a === id || this.court.b === id)) this.endCourt();
    return p;
  }
  dropInPlace(id) { const p = this.byId(id); if (p) this.drop(id, p.x, p.z); } // let go of a carried bird where it is
  carry(id, x, z) { const p = this.byId(id); if (p && p.held) { p.x = x; p.z = z; p.y = .55; } }
  drop(id, x, z) {
    const p = this.byId(id); if (!p) return;
    p.held = false;
    [p.x, p.z] = this.clampToPark(x, z); this.keepOut(p); p.tx = p.x; p.tz = p.z;
    p.y = .55; p.state = 'idle'; p.stateUntil = this.t + .7;
  }

  // ---------- family tree ----------
  // Drop ancestry records nobody alive (park, roost, eggs) can reach within TREE_DEPTH generations.
  pruneFamily() {
    const F = this.family, keep = new Set();
    const walk = (lid, depth) => {
      if (lid == null || !F[lid] || depth > TREE_DEPTH) return;
      keep.add(String(lid));
      if (F[lid].par) for (const q of F[lid].par) walk(q, depth + 1);
    };
    for (const p of this.pigeons) walk(p.lid, 0);
    for (const r of this.roost) walk(r.lid, 0);
    for (const e of this.eggs) for (const q of e.parents || []) walk(q, 1);
    for (const k of Object.keys(F)) if (!keep.has(k)) delete F[k];
    return F;
  }
  // Where a lineage id is now: a bird in the park, a roost perch, or gone.
  whereIs(lid) {
    const p = this.pigeons.find(q => q.lid === lid && !q.flying);
    if (p) return { park: p.id };
    const i = this.roost.findIndex(r => r.lid === lid);
    return i >= 0 ? { roost: i } : null;
  }
  // Ancestor tree to TREE_DEPTH for a lineage id: { lid, rec, par: [node|null, node|null] } — plus
  // how many of its chicks / grandchicks are in the park right now.
  familyTree(lid) {
    const F = this.family;
    const node = (id, d) => {
      const rec = F[id]; if (!rec) return null;
      return { lid: id, rec, par: d < TREE_DEPTH && rec.par ? rec.par.map(q => node(q, d + 1)) : null };
    };
    // chicks / grandchicks: birds hatched to it / to its chicks (a clone shares parents but wasn't hatched)
    const kids = new Set(), grand = new Set(), hatched = Object.entries(F).filter(([, r]) => r.how === 'hatch' && r.par);
    for (const [k, r] of hatched) if (r.par.includes(lid)) kids.add(+k);
    for (const [k, r] of hatched) if (r.par.some(q => kids.has(q))) grand.add(+k);
    const inPark = (set) => this.pigeons.filter(p => !p.flying && set.has(p.lid)).length;
    return { root: node(lid, 0), chicks: inPark(kids), grandchicks: inPark(grand) };
  }

  // ---------- persistence ----------
  serialize(extra) {
    return {
      v: 1,
      pigeons: this.pigeons.filter(p => !p.flying && !p.visitor).map(p => ({ n: p.name, g: p.genome, a: p.accessory, ge: p.gen, x: +p.x.toFixed(3), z: +p.z.toFixed(3), d: +p.dir.toFixed(3), l: p.lid })),
      roost: this.roost, disc: this.discovered, breeds: this.breeds, stats: this.stats, ach: this.achievements,
      family: this.pruneFamily(), lids: this.lids,
      speed: this.speed, mut: this.mut, whimsy: this.whimsy, ph: this.phase(), ...extra,
    };
  }
  restore(d) {
    if (!d) return;
    this.roost = (d.roost || []).map(r => ({ ...r, genome: M.normalizeGenome(r.genome) })); this.discovered = d.disc || {}; this.breeds = d.breeds || {};
    this.stats = { ...this.stats, ...(d.stats || {}) };
    this.achievements = d.ach || {};
    this.family = d.family || {};
    if (d.lids) this.lids = Math.max(this.lids, d.lids);
    if (d.speed != null) this.speed = d.speed;
    if (d.mut) this.mut = d.mut;
    if (d.whimsy) this.whimsy = d.whimsy;
    if (d.ph != null) { this.phase0 = d.ph - this.wall / DAY_LEN; this.night = nightOf(this.phase()); }
  }
}

// Map a prototype (v1, pixel-space) save into world coordinates.
export function migrateLegacy(d) {
  if (!d || !d.pigeons) return null;
  const fw = 800, fh = 440;
  return {
    ...d,
    speed: typeof d.speed === 'number' ? d.speed : 1,
    pigeons: d.pigeons.map(p => ({ n: p.n, g: p.g, a: p.a, ge: p.ge, x: ((p.x ?? fw / 2) / fw - .5) * PARK.w, z: ((p.y ?? fh / 2) / fh - .5) * PARK.d, d: p.f === -1 ? Math.PI : 0 })),
  };
}
