// Pigeon Park — random "happenings": short, weird park events. Pure sim logic (seeded RNG, no DOM).
// Each happening: { label, blurb, when(sim) → eligible?, start(sim) → data | null, tick(sim, h, now) → keep going?, end(sim, h) }.
// Birds taking part get p.busy = kind so their normal think() decisions are skipped until end().

import * as M from './genetics.js';
import { rand } from './rng.js';
import { PARK, FOUNTAIN, pureGenome } from './sim.js';

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

Object.assign(HAPPENINGS, {
  seagull: {
    label: 'Seagull sighting', blurb: 'A "seagull" swaggers in. It is a large white pigeon in disguise. The flock panics anyway.',
    start(S) {
      if (S.pigeons.filter(p => !p.flying).length >= S.cap) return null;
      const g = pureGenome({ pied: 'white', size: 'king', beak: 'long', eye: 'pearl' });
      const p = S.spawn({ genome: g, name: 'Definitely A Seagull', adult: true, quiet: true, x: PARK.w / 2 - .6, z: 0, dir: Math.PI });
      p.y = 3; p.visitor = { leaveAt: S.t + 24 }; p.busy = 'seagull';
      say(S, p, 'MINE', 2.5);
      S.toast(pick(['A seagull has landed. Hide your chips.', 'SEAGULL. Everyone act natural.']), 'event');
      return { id: p.id, until: S.t + 22 };
    },
    tick(S, h, now) {
      const g = S.byId(h.id); if (!g || g.flying) return false;
      if (g.state !== 'walk' || Math.hypot(g.tx - g.x, g.tz - g.z) < .1) { const [tx, tz] = S.randomSpot(); S.walkTo(g, tx, tz, .55); }
      if (rand() < .2) say(S, g, pick(['MINE', 'mine?', 'i am a seagull', 'squawk (normal seagull noise)', 'give chips']), 1.8);
      for (const p of free(S)) { // flee
        const d = Math.hypot(p.x - g.x, p.z - g.z);
        if (d < 1.8) { const a = Math.atan2(p.z - g.z, p.x - g.x); S.walkTo(p, p.x + Math.cos(a) * 1.6, p.z + Math.sin(a) * 1.6, .9); if (rand() < .15) say(S, p, pick(['AAA', 'run', 'not today', 'it has a BEAK']), 1.2); }
      }
      return now < h.until;
    },
    end(S, h) {
      const g = S.byId(h.id);
      if (g && !g.flying && !g.held) { g.busy = null; S.fly(g, false); }
      S.toast(pick(['The seagull has left. It was, and we cannot stress this enough, a pigeon.', 'Seagull gone. Nobody mention the costume.']));
    },
  },

  zoomies: {
    label: 'Zoomies', blurb: 'One pigeon does laps around the fountain for no reason.',
    start(S) {
      const p = pick(free(S)); if (!p) return null;
      say(S, p, pick(['NYOOM', 'gotta go fast', 'zoom zoom']), 2);
      S.toast(`${p.name} has the zoomies.`, 'event');
      return { ids: enlist(S, [p], 'zoomies'), a: Math.atan2(p.z - FOUNTAIN.z, p.x - FOUNTAIN.x), until: S.t + 9 };
    },
    tick(S, h, now) {
      const [p] = live(S, h.ids); if (!p) return false;
      h.a += .9; const R = FOUNTAIN.lip + .8;
      S.walkTo(p, FOUNTAIN.x + Math.cos(h.a) * R, FOUNTAIN.z + Math.sin(h.a) * R, 2.2);
      if (rand() < .15) say(S, p, pick(['NYOOM', 'wheee', 'lap ' + Math.ceil((now - h.until + 9) / 1.5)]), 1);
      return now < h.until;
    },
    end(S, h) { const p = S.byId(h.ids[0]); say(S, p, pick(['phew', 'i have no regrets', 'dizzy']), 2); release(S, h.ids); },
  },

  staring: {
    label: 'Staring contest', blurb: 'Two pigeons lock eyes. A crowd gathers. Somebody will blink.',
    when: (S) => free(S).length >= 4,
    start(S) {
      const [a, b, ...rest] = shuffle(free(S));
      const [cx, cz] = S.clampToPark((a.x + b.x) / 2, (a.z + b.z) / 2);
      S.walkTo(a, cx - .3, cz, .6); S.walkTo(b, cx + .3, cz, .6);
      const crowd = rest.slice(0, 7);
      crowd.forEach((p, i) => { const t = i / crowd.length * Math.PI * 2; S.walkTo(p, cx + Math.cos(t) * 1.3, cz + Math.sin(t) * 1.1, .6); });
      S.toast(`Staring contest: ${a.name} vs ${b.name}. Do not blink.`, 'event');
      return { ids: enlist(S, [a, b, ...crowd], 'staring'), a: a.id, b: b.id, cx, cz, at: S.t, until: S.t + 14 };
    },
    tick(S, h, now) {
      const birds = live(S, h.ids), a = S.byId(h.a), b = S.byId(h.b); if (!a || !b || !a.busy || !b.busy) return false;
      for (const p of birds) if (p.state === 'idle') p.dir = Math.atan2(h.cz - p.z, h.cx - p.x);
      if (now - h.at > 3) { a.state = b.state = 'stare'; a.dir = 0; b.dir = Math.PI; }
      if (rand() < .15) say(S, pick(birds.filter(p => p !== a && p !== b)) || a, pick(['ooh', 'intense', 'my money is on the left one', 'dont blink', '…']), 1.3);
      return now < h.until;
    },
    end(S, h) {
      const a = S.byId(h.a), b = S.byId(h.b);
      if (a && b) { const [w, l] = rand() < .5 ? [a, b] : [b, a]; say(S, l, 'i blinked', 2.5); say(S, w, 'victory', 2.5); S.toast(`${w.name} wins the staring contest. ${l.name} blinked first.`, 'event'); }
      release(S, h.ids);
    },
  },

  synchro: {
    label: 'Synchronised pecking', blurb: 'Everyone pecks in perfect unison. They have been practising.',
    start(S) {
      const birds = free(S);
      for (const p of birds) { p.state = 'sync'; p.dir = Math.PI / 2; }
      S.toast('Synchronised pecking. They have clearly been practising.', 'event');
      return { ids: enlist(S, birds, 'synchro'), t0: S.t, until: S.t + 9 };
    },
    tick(S, h, now) { for (const p of live(S, h.ids)) { p.state = 'sync'; p.stateAt = h.t0; } if (rand() < .2) S.sound('pop'); return now < h.until; },
    end(S, h) { release(S, h.ids); S.toast('The judges award it a 9.4.'); },
  },

  ufo: {
    label: 'Close encounter', blurb: 'A flying saucer borrows a pigeon. It comes back with a hat.',
    start(S) {
      const p = pick(free(S)); if (!p) return null;
      S.ufo = { x: p.x, z: p.z, y: 9, beam: 0 };
      p.state = 'abducted'; p.ty = 0;
      S.toast(pick(['A flying saucer is hovering over the park. Stay calm.', 'UFO! Everyone look busy.']), 'event');
      return { ids: enlist(S, [p], 'ufo'), at: S.t, until: S.t + 13 };
    },
    tick(S, h, now) {
      const [p] = live(S, h.ids), U = S.ufo, k = now - h.at; if (!p || !U) return false;
      U.y = Math.max(3.2, 9 - k * 3); U.x += (p.x - U.x) * .3; U.z += (p.z - U.z) * .3;
      U.beam = k > 2 && k < 11 ? 1 : 0;
      p.state = 'abducted';
      if (k < 2) p.ty = 0; else if (k < 6) p.ty = 2.6; else if (k < 7.5) { p.ty = 2.6; if (!h.hat) { h.hat = 1; const acc = pick(Object.keys(M.ACCESSORIES).filter(a => a !== p.accessory)); S.setAccessory(p, acc); } } else p.ty = 0;
      if (k > 3 && k < 4) say(S, p, pick(['take me to your breadder', 'wheeeee', 'hello?']), 1.5);
      return now < h.until;
    },
    end(S, h) {
      const p = S.byId(h.ids[0]); S.ufo = null;
      if (p) { p.ty = 0; say(S, p, pick(['i have seen things', 'they were nice actually', 'do not ask']), 3); S.toast(`${p.name} is back, wearing a ${M.ACCESSORIES[p.accessory]?.label.toLowerCase() || 'new look'}. It will not discuss it.`, 'breed'); }
      release(S, h.ids);
    },
  },

  rain: {
    label: 'Light drizzle', blurb: 'It rains a bit. Everyone turns into a loaf.',
    start(S) {
      const birds = free(S);
      for (const p of birds) p.state = 'loaf';
      S.rain = 1;
      S.toast('A light drizzle. Everyone becomes a loaf.', 'event');
      return { ids: enlist(S, birds, 'rain'), until: S.t + 18 };
    },
    tick(S, h, now) { for (const p of live(S, h.ids)) p.state = 'loaf'; if (rand() < .08) say(S, pick(live(S, h.ids)), pick(['i am a loaf', 'wet', 'this is fine', 'i hate this']), 1.6); return now < h.until; },
    end(S, h) { S.rain = 0; release(S, h.ids); S.toast('The sun is back. Everyone pretends nothing happened.'); },
  },

  runway: {
    label: 'Pigeon Fashion Week', blurb: 'The best-dressed birds strut a runway down the middle of the plaza.',
    when: (S) => free(S).length >= 3,
    start(S) {
      const birds = free(S).sort((a, b) => (b.pheno.traits.length + (b.accessory ? 3 : 0)) - (a.pheno.traits.length + (a.accessory ? 3 : 0))).slice(0, 5);
      birds.forEach((p, i) => { S.walkTo(p, -PARK.w / 2 + .6, -PARK.d / 2 + .8 + i * .15, .7); });
      S.toast('Pigeon Fashion Week begins. Strike a pose.', 'event');
      return { ids: enlist(S, birds, 'runway'), at: S.t, until: S.t + 26 };
    },
    tick(S, h, now) {
      const birds = h.ids.map(id => S.byId(id)); const k = now - h.at;
      birds.forEach((p, i) => {
        if (!p || p.flying || p.held || !p.busy) return;
        const t0 = 4 + i * 3.5;
        if (k > t0 && k < t0 + .5) S.walkTo(p, 0, PARK.d / 2 - .9, .75);                         // down the runway toward us
        if (k > t0 + 5 && k < t0 + 5.5) { p.state = 'idle'; p.dir = Math.PI / 2; say(S, p, pick(['✨ serve ✨', 'werk', 'look at me', 'couture', 'this is vintage']), 1.8); S.sparkle(p.x, p.z, 1); }
        if (k > t0 + 7 && k < t0 + 7.5) S.walkTo(p, PARK.w / 2 - .6, PARK.d / 2 - .8 - i * .2, .75); // and off
      });
      return now < h.until;
    },
    end(S, h) { release(S, h.ids); S.toast('Fashion Week is over. The judges are still crying.'); },
  },
});

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
