// Pigeon Park — flock simulation. Pure logic, no DOM, no three.js.
// Ported from the prototype's 450 ms tick; runs on a fixed timestep in sim-seconds so
// scripted runs (seeded RNG + fixed dt) replay identically.

import * as M from './genetics.js';
import { rand } from './rng.js';
import { tickHappenings } from './happenings.js';
import { checkAchievements } from './achievements.js';

export const FIXED_DT = 1 / 30;          // physics step, sim seconds
const THINK_DT = 0.45;            // decision tick, same cadence as the prototype
const DAY_LEN = 170;              // seconds per full day/night cycle (wall clock)
export const PARK = { w: 10.4, d: 6.6 };   // walkable rectangle, metres, centred on origin
export const FOUNTAIN = { x: -1.7, z: -0.8, r: 1.3, lip: 1.42 }; // r: basin wall (visual), lip: outer rim radius
// A bird's footprint for collisions: a segment from tail tip to beak tip, plus half its body width (size 1).
const BODY = { back: .5, front: .31, half: .15 };
function bodyScale(p) { return ({ king: 1.42, dinky: .68, chonk: 1.25 }[p.pheno.e.size] || 1) * (p.jit || 1); }
// Distance from the fountain centre to the nearest point of the bird's body segment, minus what it needs.
// >= 0 means the bird is clear of the rim.
export function fountainClearance(p) {
  const k = bodyScale(p), cx = Math.cos(p.dir), cz = Math.sin(p.dir);
  const ax = p.x - cx * BODY.back * k, az = p.z - cz * BODY.back * k;
  const bx = p.x + cx * BODY.front * k, bz = p.z + cz * BODY.front * k;
  const ex = bx - ax, ez = bz - az;
  const t = Math.max(0, Math.min(1, ((FOUNTAIN.x - ax) * ex + (FOUNTAIN.z - az) * ez) / (ex * ex + ez * ez)));
  const qx = ax + ex * t, qz = az + ez * t, d = Math.hypot(qx - FOUNTAIN.x, qz - FOUNTAIN.z);
  return { gap: d - (FOUNTAIN.lip + BODY.half * k), qx, qz, d };
}
export const ROOST_SIZE = 8;
export const TREE_DEPTH = 3;      // family records kept per bird: parents, grandparents, great-grandparents
// Park layout outside the plaza, in rings: benches/lamps → open lawn → monument ring → hedges, bushes, trees.
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

// Wild-type genome with some loci overridden: an allele (homozygous) or an explicit [a, b] pair.
export function pureGenome(over) {
  const g = {};
  for (const l of M.LOCI) g[l.id] = [M.WILD[l.id], M.WILD[l.id]];
  for (const [k, v] of Object.entries(over)) g[k] = Array.isArray(v) ? [...v] : [v, v];
  return g;
}

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
    // how: 'hatch'|'founder'|'clone'|'registry'|'summoned'|'golden'|'visitor'|'unknown', of: cloned bird's name }.
    // Lineage ids survive save/load (sim ids don't); records outside TREE_DEPTH of anyone alive are pruned.
    this.family = {}; this.lids = 1;
    this.stats = { births: 0, flown: 0, maxGen: 1, happenings: 0 };
    this.achievements = {};  // id → { at }
    this.court = null;
    this.selId = null;
    this.cap = 45;
    this.speed = 1; this.mut = 'normal'; this.poopEnabled = true;
    this.events = [];
    this.ready = false;      // autosave gate: never save before the flock has loaded
    this.happening = null; this.nextHappeningAt = 55; this.whimsy = 'some'; this.bread = null; this.ufo = null; this.rain = 0;
    this.replies = [];       // queued "reply" bubbles: { id, at, text }
    this.night = nightOf(this.phase());
  }

  // ---------- clocks ----------
  phase() { return (((this.phase0 + this.wall / DAY_LEN) % 1) + 1) % 1; }
  hour() { return phaseToHour(this.phase()); }
  setTimeOfDay(h) { this.phase0 = hourToPhase(h) - this.wall / DAY_LEN; this.night = nightOf(this.phase()); }
  mutF() { return (MUTATIONS.find(m => m.id === this.mut) || MUTATIONS[1]).v; }
  age(p) { return this.t - p.born; }
  adult(p) { return this.age(p) > ADULT_AGE; }
  emit(e) { this.events.push(e); if (this.events.length > 200) this.events.shift(); }
  toast(msg, kind = 'plain') { this.emit({ type: 'toast', msg, kind }); }
  sound(name, extra) { this.emit({ type: 'sound', name, ...extra }); }
  sparkle(x, z, tier) { this.emit({ type: 'sparkle', x, z, tier }); }
  byId(id) { return this.pigeons.find(p => p.id === id); }

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
    p.x = clamp(p.x, -PARK.w / 2, PARK.w / 2); p.z = clamp(p.z, -PARK.d / 2, PARK.d / 2);
    return true;
  }
  randomSpot() {
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
      breeds: M.matchBreeds(pheno),
      lid: lid ?? this.lids++,
    };
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
    p.tx = tx; p.tz = tz; p.v = speed;
    const d = Math.hypot(tx - p.x, tz - p.z);
    p.state = 'walk'; p.stateAt = this.t;
    p.stateUntil = this.t + Math.max(.4, d / speed);
    if (d > .01) p.dir = Math.atan2(tz - p.z, tx - p.x);
  }

  fly(p, withToast) {
    p.flying = true; p.flyAt = this.t; p.state = 'fly'; p.emote = null; p.courting = false; p.held = false;
    p.fdx = rand() < .5 ? -1 : 1;
    this.stats.flown++;
    this.sound('whoosh');
    if (withToast) this.toast(M.pick(M.COPY.flyoff).replace('{n}', p.name));
    if (this.selId === p.id) { this.selId = null; this.emit({ type: 'deselect' }); }
  }

  // ---------- stepping ----------
  // Advance by one fixed step (FIXED_DT wall seconds, scaled by park speed for gameplay).
  step() {
    const dt = FIXED_DT * this.speed;
    this.wall += FIXED_DT;
    this.t += dt;
    this.move(dt);
    this.thinkAcc += dt;
    while (this.thinkAcc >= THINK_DT) {
      this.thinkAcc -= THINK_DT; this.think();
      for (const p of this.pigeons) if (!p.flying && !p.held) this.keepOut(p); // think() may have turned birds
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
      if (p.y > 0) p.y = Math.max(0, p.y - dt * 3);
      if (p.state === 'walk' || p.state === 'roll' || p.state === 'blown' || p.state === 'moonwalk') {
        const x0 = p.x, z0 = p.z;
        const dx = p.tx - p.x, dz = p.tz - p.z, d = Math.hypot(dx, dz);
        const s = p.v * dt;
        if (d <= s) { p.x = p.tx; p.z = p.tz; if (!p.courting && (p.state === 'walk' || p.state === 'moonwalk')) p.state = 'idle'; }
        else { p.x += dx / d * s; p.z += dz / d * s; if (p.state === 'walk') p.dir = Math.atan2(dz, dx); else if (p.state === 'moonwalk') p.dir = Math.atan2(dz, dx) + Math.PI; }
        p.x = clamp(p.x, -PARK.w / 2, PARK.w / 2); p.z = clamp(p.z, -PARK.d / 2, PARK.d / 2);
        // sliding around the rim: face the way we actually moved, not into the stone
        if (this.keepOut(p) && p.state === 'walk') {
          const mx = p.x - x0, mz = p.z - z0;
          if (Math.hypot(mx, mz) > s * .3) { p.dir = Math.atan2(mz, mx); this.keepOut(p); }
        }
      } else this.keepOut(p); // turning in place (courting, pecking) can swing a tail or beak into the rim
    }
  }

  think() {
    const now = this.t, sp = SP, cap = this.cap;
    this.night = nightOf(this.phase());
    // remove flown
    this.pigeons = this.pigeons.filter(p => !(p.flying && now - p.flyAt > 1.5));
    const pop = this.pigeons.length;
    tickHappenings(this);
    // replies: a neighbour answers a thought a moment later
    this.replies = this.replies.filter(r => { if (now < r.at) return true; const q = this.byId(r.id); if (q && !q.flying && !q.emote) { q.emote = { kind: 'say', text: r.text }; q.emoteUntil = now + 2.2; } return false; });
    for (const p of this.pigeons) {
      if (p.flying || p.held) continue;
      if (p.emote && now > p.emoteUntil) p.emote = null;
      if (p.visitor && now > p.visitor.leaveAt && !p.busy) { this.fly(p, false); continue; }
      if (p.courting || p.busy) continue;
      if (now >= p.stateUntil) {
        const sleepy = this.night > .6, r = rand();
        p.stateAt = now;
        if (sleepy && r < .55) { p.state = 'sleep'; p.stateUntil = now + 3 + rand() * 5; p.emote = { kind: 'zzz' }; p.emoteUntil = p.stateUntil; }
        else if (p.pheno.e.behavior === 'tumbler' && r < .08) { p.state = 'tumble'; p.stateUntil = now + .75; }
        else if (p.pheno.e.behavior === 'parlor' && r < .1) {
          // parlor roller: somersaults along the ground in the direction it faces
          p.state = 'roll'; p.stateUntil = now + 1.1;
          [p.tx, p.tz] = this.clampToPark(p.x + Math.cos(p.dir) * .6, p.z + Math.sin(p.dir) * .6); p.v = .55;
        }
        else if (r < (sleepy ? .8 : .5)) {
          const [tx, tz] = this.randomSpot();
          this.walkTo(p, tx, tz, 42 * PX * sp);
        }
        else if (r < .8) { p.state = 'peck'; p.stateUntil = now + 1.2 + rand() * 1.8; }
        else { p.state = 'idle'; p.stateUntil = now + .9 + rand() * 2.2; }
      }
      if (!p.emote && p.state !== 'sleep' && rand() < .004) {
        p.emote = { kind: 'say', text: this.night > .5 && rand() < .4 ? M.pick(M.NIGHT_THOUGHTS) : M.pick(M.THOUGHTS) }; p.emoteUntil = now + 2.6;
        if (rand() < .3) { // someone nearby has opinions
          let best = null, bd = 1.6;
          for (const q of this.pigeons) { if (q === p || q.flying || q.held) continue; const d = Math.hypot(q.x - p.x, q.z - p.z); if (d < bd) { bd = d; best = q; } }
          if (best) this.replies.push({ id: best.id, at: now + .9 + rand() * .6, text: M.pick(M.REPLIES) });
        }
      }
      // ambient cooing: about the same park-wide rate whether there are 8 birds or 45
      if (rand() < .012 * Math.min(1, 9 / pop)) this.sound('coo', { voice: p.pheno.e.voice, vol: .5, id: p.id });
    }
    // courtship
    if (!this.court && pop >= 2 && pop < cap && rand() < (0.10 * (1 - pop / cap) + 0.02) * sp) {
      const adults = this.pigeons.filter(p => this.adult(p) && !p.flying && !p.held && !p.busy && !p.visitor && p.state !== 'sleep');
      if (adults.length >= 2) {
        const a = adults[Math.floor(rand() * adults.length)];
        let b = null, bd = 1e9;
        for (const q of adults) { if (q === a) continue; const d = Math.hypot(q.x - a.x, q.z - a.z); if (d < bd) { bd = d; b = q; } }
        if (b) {
          let [mx, mz] = this.clampToPark((a.x + b.x) / 2, (a.z + b.z) / 2);
          mx = clamp(mx, -PARK.w / 2 + .3, PARK.w / 2 - .3);
          this.court = { a: a.id, b: b.id, mx, mz, until: now + 12, eggAt: 0 };
          a.courting = b.courting = true;
          this.walkTo(a, mx - .24, mz, 56 * PX * sp);
          if (rand() < .45) { a.emote = { kind: 'say', text: M.pick(M.COURT_LINES) }; a.emoteUntil = now + 2.4; }
          this.walkTo(b, mx + .24, mz, 56 * PX * sp);
        }
      }
    }
    if (this.court) {
      const C = this.court, a = this.byId(C.a), b = this.byId(C.b);
      if (!a || !b || a.flying || b.flying || a.held || b.held || now > C.until) {
        if (a) { a.courting = false; a.stateUntil = now; } if (b) { b.courting = false; b.stateUntil = now; }
        this.court = null;
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
          const off = M.offspring(a.genome, b.genome, this.mutF());
          this.eggs.push({ id: this.ids++, x: C.mx, z: C.mz + .12, genome: off.genome, gen: Math.max(a.gen, b.gen) + 1, laidAt: now, hatchAt: now + 6 + rand() * 3.5, parents: [a.lid, b.lid] });
          this.sound('pop');
          a.courting = b.courting = false; a.stateUntil = b.stateUntil = now; a.state = b.state = 'idle';
          this.court = null;
        }
      }
    }
    // eggs
    for (const eg of [...this.eggs]) {
      if (now >= eg.hatchAt) {
        this.eggs = this.eggs.filter(x => x !== eg);
        const acc = M.rollAccessory(0.02);
        const baby = this.spawn({ genome: eg.genome, accessory: acc, name: M.randomName(), gen: eg.gen, x: eg.x, z: eg.z, dir: Math.PI / 2, how: eg.golden ? 'golden' : 'hatch', par: eg.parents || null });
        if (rand() < .6) { baby.emote = { kind: 'say', text: M.pick(M.BABY_LINES) }; baby.emoteUntil = now + 2.6; }
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
    if (n > 4 && (over ? rand() < .5 : rand() < 0.10 * Math.pow(n / cap, 3) * sp)) {
      const cands = this.pigeons.filter(p => !p.flying && !p.held && !p.courting && !p.busy && !p.visitor && p.id !== this.selId && this.adult(p));
      if (cands.length) this.fly(cands[Math.floor(rand() * cands.length)], rand() < .5);
    }
    // poop (cosmetic)
    if (this.poopEnabled && rand() < .05 && this.pigeons.length) {
      const p = this.pigeons[Math.floor(rand() * this.pigeons.length)];
      if (!p.flying && !p.held) {
        this.poops.push({ id: this.ids++, x: p.x - Math.cos(p.dir) * .22, z: p.z - Math.sin(p.dir) * .22, at: now, r: rand() });
        if (this.poops.length > 14) this.poops.shift();
      }
    }
    this.poops = this.poops.filter(pp => now - pp.at < 30);
    checkAchievements(this);
  }

  // Swap a bird's accessory (UFO gift): new phenotype, maybe new breeds; the view rebuilds on p.rev.
  setAccessory(p, acc) {
    p.accessory = acc; p.pheno = M.computePheno(p.genome, acc); p.breeds = M.matchBreeds(p.pheno);
    if (this.family[p.lid]) this.family[p.lid].a = acc;
    p.rev = (p.rev || 0) + 1;
    this.notice(p);
  }

  // ---------- player actions ----------
  alive() { let n = 0; for (const p of this.pigeons) if (!p.flying) n++; return n; }
  full() { if (this.alive() >= this.cap) { this.toast(M.pick(M.COPY.full)); return true; } return false; }

  clonePigeon(id) {
    const p = this.byId(id); if (!p || p.flying || this.full()) return null;
    let nm = 'Also ' + p.name; if (nm.length > 30) nm = M.randomName();
    const q = this.spawn({ genome: structuredClone(p.genome), accessory: p.accessory, name: nm, gen: p.gen, adult: true, x: p.x + .45, z: p.z + .15, dir: p.dir, how: 'clone', of: p.name, par: this.family[p.lid]?.par || null });
    this.stats.births++;
    this.sparkle(q.x, q.z, 1);
    this.sound('pop');
    this.toast(M.pick(M.COPY.clone).replace('{n}', p.name));
    return q;
  }
  dismissPigeon(id) {
    const p = this.byId(id); if (!p || p.flying) return;
    this.fly(p, false);
    this.toast(M.pick(M.COPY.dismiss).replace('{n}', p.name));
  }
  roostAdd(id) {
    const p = this.byId(id); if (!p || p.flying) return false;
    if (this.roost.length >= ROOST_SIZE) { this.toast(M.pick(M.COPY.roostFull)); return false; }
    this.roost.push({ name: p.name, genome: p.genome, accessory: p.accessory, gen: p.gen, lid: p.lid });
    this.pigeons = this.pigeons.filter(x => x.id !== id);
    if (this.court && (this.court.a === id || this.court.b === id)) this.court = null;
    if (this.selId === id) this.selId = null;
    this.emit({ type: 'roosted', x: p.x, z: p.z });
    this.toast(M.pick(M.COPY.roosted).replace('{n}', p.name), 'note');
    this.sound('coo', { voice: p.pheno.e.voice, vol: .7 });
    return true;
  }
  releaseRoost(i, keep) {
    const r = this.roost[i]; if (!r || this.full()) return null;
    const p = this.spawn({ genome: structuredClone(r.genome), accessory: r.accessory, name: keep ? 'Also ' + r.name : r.name, gen: r.gen, adult: true,
      ...(keep ? { how: 'clone', of: r.name, par: this.family[r.lid]?.par || null } : { lid: r.lid, how: 'unknown' }) });
    if (keep) this.stats.births++;
    this.sparkle(p.x, p.z, 1);
    this.sound('pop');
    if (!keep) this.roost.splice(i, 1);
    return p;
  }
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
  summonLegends() {
    const legends = [
      { name: 'THE VOID PIGEON', g: pureGenome({ fantasy: 'void', glow: 'glow', eye: 'pearl' }) },
      { name: 'THE GALAXY PIGEON', g: pureGenome({ sheen: 'galaxy', fpattern: 'stars', tail: 'fantail' }) },
    ];
    for (const L of legends) {
      const p = this.spawn({ genome: L.g, name: L.name, gen: this.stats.maxGen, adult: true, x: (rand() - .5) * 2, z: 1 + rand(), how: 'summoned' });
      this.sparkle(p.x, p.z, 3);
    }
    this.sound('chime');
    this.toast('W rizz. The legends have descended.', 'breed');
  }
  summonOres() {
    const ores = [
      ['THE DIAMOND PIGEON', 'diamond'], ['THE EMERALD PIGEON', 'emerald'], ['THE GOLD PIGEON', 'gold'],
      ['THE GOLD ORE PIGEON', 'goldore'], ['THE DIAMOND ORE PIGEON', 'diamondore'], ['THE EMERALD ORE PIGEON', 'emeraldore'],
      ['THE REDSTONE ORE PIGEON', 'redstoneore'], ['THE IRON ORE PIGEON', 'ironore'], ['THE LAPIS ORE PIGEON', 'lapisore'],
      ['THE MIXED GEMSTONE PIGEON', 'gemore'], ['THE COAL ORE PIGEON', 'coalore'],
    ];
    for (const [name, f] of ores) {
      const p = this.spawn({ genome: pureGenome({ fantasy: f }), name, gen: this.stats.maxGen, adult: true, x: (rand() - .5) * PARK.w * .7, z: (rand() - .5) * PARK.d * .5, how: 'summoned' });
      this.sparkle(p.x, p.z, 3);
    }
    this.sound('chime');
    this.toast('The mineshaft opens. Eleven ore pigeons surface.', 'breed');
  }

  // ---------- drag (player carries a bird) ----------
  grab(id) {
    const p = this.byId(id); if (!p || p.flying) return null;
    p.held = true; p.courting = false; p.state = 'held'; p.busy = null;
    p.emote = { kind: 'say', text: M.pick(M.HELD_LINES) }; p.emoteUntil = this.t + 2.4;
    if (this.court && (this.court.a === id || this.court.b === id)) {
      const o = this.byId(this.court.a === id ? this.court.b : this.court.a);
      if (o) { o.courting = false; o.stateUntil = this.t; }
      this.court = null;
    }
    return p;
  }
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
    const kids = new Set(), grand = new Set();
    for (const [k, r] of Object.entries(F)) if (r.par && r.par.includes(lid) && r.how === 'hatch') kids.add(+k);
    for (const [k, r] of Object.entries(F)) if (r.par && r.par.some(q => kids.has(q))) grand.add(+k);
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
