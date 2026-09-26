// Pigeon Park — random "happenings": short, weird park events. Pure sim logic (seeded RNG, no DOM).
// Each happening: { label, blurb, when(sim) → eligible?, start(sim) → data | null, tick(sim, h, now) → keep going?, end(sim, h) }.
// Birds taking part get p.busy = kind so their normal think() decisions are skipped until end().

import * as M from './genetics.js';
import { rand } from './rng.js';
import { PARK, FOUNTAIN } from './sim.js';

const pick = (a) => a[Math.floor(rand() * a.length)];
const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const free = (S) => S.pigeons.filter(p => !p.flying && !p.held && !p.courting && !p.busy && !p.visitor);
const say = (S, p, text, secs = 2.4) => { if (p) { p.emote = { kind: 'say', text }; p.emoteUntil = S.t + secs; } };
function enlist(S, list, kind) { for (const p of list) { p.busy = kind; p.stateAt = S.t; } return list.map(p => p.id); }
function release(S, ids) { for (const id of ids || []) { const p = S.byId(id); if (p) { p.busy = null; p.state = 'idle'; p.stateUntil = S.t + .3 + rand(); } } }
const live = (S, ids) => ids.map(id => S.byId(id)).filter(p => p && !p.flying && !p.held && p.busy);

export const HAPPENINGS = {
  bread: {
    label: 'Baguette drop', blurb: 'A tourist drops a baguette. The flock loses its mind.',
    start(S) {
      const [x, z] = S.clampToPark((rand() - .5) * PARK.w * .8, (rand() - .5) * PARK.d * .7);
      S.bread = { x, z, hp: 1, a: rand() * Math.PI };
      const birds = free(S).slice(0, 18);
      S.toast(pick(['A tourist dropped an entire baguette. Chaos is imminent.', 'BREAD. ON THE GROUND. THIS IS NOT A DRILL.', 'A baguette has entered the chat.']), 'event');
      birds.forEach((p, i) => { const a = i / birds.length * Math.PI * 2; S.walkTo(p, x + Math.cos(a) * .45, z + Math.sin(a) * .3, .9); p.state = 'walk'; say(S, p, pick(['BREAD', 'mine', 'MINE', 'crumb!!', 'go go go']), 1.5); });
      return { ids: enlist(S, birds, 'bread'), until: S.t + 40 };
    },
    tick(S, h, now) {
      const B = S.bread, birds = live(S, h.ids);
      let pecking = 0;
      for (const p of birds) {
        const d = Math.hypot(p.x - B.x, p.z - B.z);
        if (d < .75) { if (p.state !== 'peck') { p.state = 'peck'; p.stateAt = now; p.dir = Math.atan2(B.z - p.z, B.x - p.x); } pecking++; }
      }
      B.hp -= pecking * .012;
      if (rand() < .15 && birds.length) say(S, pick(birds), pick(['nom', 'crunch', 'this is my bread now', 'carbs!!', 'mmf']), 1.4);
      return B.hp > 0 && now < h.until && birds.length > 0;
    },
    end(S, h) { S.bread = null; release(S, h.ids); S.toast(pick(['The baguette is gone. It was beautiful.', 'Not a crumb remains. Legends will speak of this.']), 'event'); },
  },

  visitor: {
    label: 'Out-of-town visitor', blurb: 'A rare breed drops in for a while. Clone it before it leaves.',
    start(S) {
      const pool = M.BREEDS.filter(b => b.real && !S.breeds[b.id]);
      const b = pick(pool.length ? pool : M.BREEDS.filter(x => x.real));
      const sm = M.breedSample(b), genome = {};
      for (const l of M.LOCI) genome[l.id] = [sm.e[l.id], sm.e[l.id]];
      if (S.pigeons.filter(p => !p.flying).length >= S.cap) return null;
      const p = S.spawn({ genome, accessory: sm.accessory, name: 'Visiting ' + b.name, adult: true, quiet: true, x: (rand() - .5) * PARK.w * .6, z: (rand() - .2) * PARK.d * .5, dir: Math.PI / 2 });
      p.y = 3.5; p.visitor = { leaveAt: S.t + 50, breed: b.id };
      S.toast(`A ${b.name} is visiting from out of town. Clone it before it leaves!`, 'breed');
      S.sound('chime');
      return { id: p.id, until: S.t + 50 };
    },
    tick(S, h, now) { const p = S.byId(h.id); if (p && now > h.until - 8 && !h.warned) { h.warned = 1; say(S, p, 'well, i must be off', 3); } return !!p && !p.flying && now < h.until; },
    end(S, h) { const p = S.byId(h.id); if (p && !p.flying && !p.held) { S.fly(p, false); S.toast(`${p.name.replace('Visiting ', 'The ')} has gone home. It will not write.`); } },
  },

  goldenegg: {
    label: 'The golden egg', blurb: 'An egg nobody laid. It always hatches something strange.',
    start(S) {
      const parents = S.pigeons.filter(p => !p.flying); if (!parents.length) return null;
      const off = M.offspring(pick(parents).genome, pick(parents).genome, 3).genome;
      // guarantee one expressed oddity: a random mutation-only allele, made homozygous
      const odd = [];
      for (const l of M.LOCI) for (const a of Object.keys(l.mutOnly || {})) odd.push([l.id, a]);
      const [loc, al] = pick(odd); off[loc] = [al, al];
      const [x, z] = S.clampToPark((rand() - .5) * PARK.w * .7, (rand() - .5) * PARK.d * .6);
      S.eggs.push({ id: S.ids++, x, z, genome: off, gen: S.stats.maxGen + 1, laidAt: S.t, hatchAt: S.t + 10, golden: true });
      S.sparkle(x, z, 3);
      S.toast(pick(['A golden egg has appeared. Nobody laid it. Nobody will admit to it.', 'An egg of pure gold sits in the plaza. It hums slightly.']), 'breed');
      return { until: S.t + 11 };
    },
    tick(S, h, now) { return now < h.until; },
    end() {},
  },

  conga: {
    label: 'Conga line', blurb: 'Nobody knows who started it.',
    when: (S) => free(S).length >= 5,
    start(S) {
      const birds = shuffle(free(S)).slice(0, 7);
      const w = PARK.w / 2 - .8, d = PARK.d / 2 - .6;
      S.toast('Conga line! Nobody knows who started it.', 'event');
      return { ids: enlist(S, birds, 'conga'), way: [[w, d], [-w, d], [-w, -d], [w, -d]].map(([x, z]) => S.clampToPark(x, z)), wi: 0, until: S.t + 18 };
    },
    tick(S, h, now) {
      const birds = live(S, h.ids); if (birds.length < 2) return false;
      const lead = birds[0], [wx, wz] = h.way[h.wi % h.way.length];
      if (Math.hypot(lead.x - wx, lead.z - wz) < .3) h.wi++;
      const [tx, tz] = h.way[h.wi % h.way.length];
      S.walkTo(lead, tx, tz, .7);
      for (let i = 1; i < birds.length; i++) {
        const f = birds[i - 1], a = f.dir + Math.PI;
        S.walkTo(birds[i], f.x + Math.cos(a) * .5, f.z + Math.sin(a) * .5, .75);
      }
      if (rand() < .3) say(S, pick(birds), pick(['♪', '♪ ♪', 'da da da da da DAH', 'hup!', 'wooo']), 1.2);
      return now < h.until;
    },
    end(S, h) { release(S, h.ids); },
  },

  gust: {
    label: 'Gust of wind', blurb: 'Everyone is briefly a kite.',
    start(S) {
      const birds = free(S), dx = rand() < .5 ? -1 : 1;
      for (const p of birds) { const [tx, tz] = S.clampToPark(p.x + dx * (1.6 + rand()), p.z + (rand() - .5)); p.tx = tx; p.tz = tz; p.v = 1.5; p.state = 'blown'; }
      for (const p of birds.slice(0, 3)) say(S, p, pick(['WHOA', 'aaaAAA', 'i am a kite now', 'not again']), 1.8);
      S.toast(pick(['A gust of wind. Everyone is briefly a kite.', 'Wind! The flock relocates, involuntarily.']), 'event');
      S.sound('whoosh');
      return { ids: enlist(S, birds, 'gust'), until: S.t + 2.6 };
    },
    tick(S, h, now) { return now < h.until; },
    end(S, h) { release(S, h.ids); },
  },

  statue: {
    label: 'Statue duty', blurb: 'One pigeon practises being a statue. Very seriously.',
    start(S) {
      const p = pick(free(S)); if (!p) return null;
      p.state = 'statue'; say(S, p, 'i am a statue', 3);
      S.toast(`${p.name} is practising for statue duty. Do not disturb.`, 'event');
      return { ids: enlist(S, [p], 'statue'), until: S.t + 14 };
    },
    tick(S, h, now) { const [p] = live(S, h.ids); if (p) p.state = 'statue'; return !!p && now < h.until; },
    end(S, h) { const p = S.byId(h.ids[0]); say(S, p, pick(['ok that was hard', 'nailed it', 'my legs are asleep']), 2); release(S, h.ids); },
  },

  parliament: {
    label: 'Pigeon parliament', blurb: 'The flock convenes at the fountain to vote on bread.',
    when: (S) => free(S).length >= 6,
    start(S) {
      const birds = shuffle(free(S)).slice(0, 14), R = FOUNTAIN.lip + .75;
      birds.forEach((p, i) => { const a = i / birds.length * Math.PI * 2; S.walkTo(p, FOUNTAIN.x + Math.cos(a) * R, FOUNTAIN.z + Math.sin(a) * R, .55); });
      const motion = pick(['more bread', 'ban the seagulls', 'declare the fountain a sea', 'rename Tuesday to Crumbday', 'impeach the statue', 'mandatory naps', 'Gerald for president']);
      S.toast(`The pigeon parliament is now in session. Motion: ${motion}.`, 'event');
      return { ids: enlist(S, birds, 'parliament'), speaker: birds[0].id, motion, phase: 0, until: S.t + 22, voteAt: S.t + 13 };
    },
    tick(S, h, now) {
      const birds = live(S, h.ids); if (birds.length < 3) return false;
      for (const p of birds) if (p.state === 'idle' || (p.state === 'walk' && Math.hypot(p.tx - p.x, p.tz - p.z) < .02)) { p.state = 'idle'; p.dir = Math.atan2(FOUNTAIN.z - p.z, FOUNTAIN.x - p.x); }
      const sp = S.byId(h.speaker);
      if (sp && now < h.voteAt && rand() < .35) say(S, sp, pick(['order! ORDER!', 'the motion is: ' + h.motion, 'i yield my time to crumbs', 'point of order: coo', 'hear hear']), 2.2);
      if (now >= h.voteAt && !h.voted) {
        h.voted = 1; let aye = 0;
        for (const p of birds) { const v = rand() < .65; aye += v; say(S, p, v ? pick(['aye!', 'AYE', 'coo (aye)']) : pick(['nay', 'boo', 'abstain']), 3); }
        h.passed = aye > birds.length / 2;
      }
      return now < h.until;
    },
    end(S, h) {
      S.toast(h.passed ? `Motion passed: ${h.motion}. Democracy prevails.` : `Motion failed: ${h.motion}. The fountain weeps.`, 'event');
      release(S, h.ids);
    },
  },

  crisis: {
    label: 'Existential moment', blurb: 'Everyone stops and stares into the middle distance.',
    start(S) {
      const birds = free(S);
      for (const p of birds) { p.state = 'look'; p.dir = Math.PI / 2 + (rand() - .5) * .6; }
      for (const p of shuffle([...birds]).slice(0, 4)) say(S, p, pick(['…', 'why are we here', 'what is a park', 'are we the baddies', 'the sky is so big', 'hm.']), 4);
      S.toast('An existential moment passes over the park.', 'event');
      return { ids: enlist(S, birds, 'crisis'), until: S.t + 6 };
    },
    tick(S, h, now) { for (const p of live(S, h.ids)) p.state = 'look'; return now < h.until; },
    end(S, h) { release(S, h.ids); S.toast('The moment has passed. Everyone agrees not to talk about it.'); },
  },

  dance: {
    label: 'Dance party', blurb: 'Someone put on a banger. Dancing is mandatory.',
    start(S) {
      const birds = free(S);
      for (const p of birds) p.state = 'dance';
      S.toast(S.night > .5 ? 'Midnight disco! Someone put on a banger.' : 'Someone put on a banger. Dancing is mandatory.', 'event');
      return { ids: enlist(S, birds, 'dance'), until: S.t + 12 };
    },
    tick(S, h, now) {
      const birds = live(S, h.ids);
      for (const p of birds) p.state = 'dance';
      if (rand() < .5 && birds.length) { const p = pick(birds); S.sparkle(p.x, p.z, 2); }
      if (rand() < .25 && birds.length) say(S, pick(birds), pick(['♪', 'woo!', 'this slaps', 'feel the beat', 'my jam', '♪ ♫ ♪']), 1.4);
      if (rand() < .3) S.sound('chime');
      return now < h.until && birds.length > 0;
    },
    end(S, h) { release(S, h.ids); },
  },

  moonwalk: {
    label: 'Moonwalk', blurb: 'At night, someone moonwalks across the plaza.',
    when: (S) => S.night > .5,
    start(S) {
      const p = pick(free(S)); if (!p) return null;
      const [tx, tz] = S.clampToPark(-Math.sign(p.x || 1) * (PARK.w / 2 - 1), p.z);
      p.tx = tx; p.tz = tz; p.v = .45; p.state = 'moonwalk';
      say(S, p, pick(['hee-hee', 'shamone', 'watch this']), 2.4);
      S.toast(`${p.name} is moonwalking. Nobody taught it that.`, 'event');
      return { ids: enlist(S, [p], 'moonwalk'), until: S.t + 14 };
    },
    tick(S, h, now) { const [p] = live(S, h.ids); if (p && Math.hypot(p.tx - p.x, p.tz - p.z) > .05) p.state = 'moonwalk'; return !!p && now < h.until && p.state === 'moonwalk'; },
    end(S, h) { release(S, h.ids); },
  },
};

export const WHIMSY = [
  { id: 'off', label: 'Off', gap: Infinity },
  { id: 'some', label: 'Some', gap: 1 },
  { id: 'lots', label: 'Lots', gap: .4 },
];

// Called from Sim.think(): runs the active happening, or maybe starts a new one.
export function tickHappenings(S) {
  const now = S.t, H = S.happening;
  if (H) {
    let keep = false;
    try { keep = HAPPENINGS[H.kind].tick(S, H, now); } catch (e) { keep = false; }
    if (!keep) { HAPPENINGS[H.kind].end(S, H); S.happening = null; S.nextHappeningAt = now + gapFor(S); }
    return;
  }
  if (now < S.nextHappeningAt || S.pigeons.filter(p => !p.flying).length < 3) return;
  const kinds = Object.keys(HAPPENINGS).filter(k => !HAPPENINGS[k].when || HAPPENINGS[k].when(S));
  startHappening(S, pick(kinds));
}
export function startHappening(S, kind) {
  if (!HAPPENINGS[kind]) return false;
  if (S.happening) { HAPPENINGS[S.happening.kind].end(S, S.happening); S.happening = null; }
  const data = HAPPENINGS[kind].start(S);
  S.nextHappeningAt = S.t + gapFor(S);
  if (!data) return false;
  S.happening = { kind, at: S.t, ...data };
  S.emit({ type: 'happening', kind });
  return true;
}
export function gapFor(S) {
  const g = (WHIMSY.find(w => w.id === S.whimsy) || WHIMSY[1]).gap;
  return g === Infinity ? Infinity : (70 + rand() * 70) * g;
}
