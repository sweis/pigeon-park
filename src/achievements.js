// Pigeon Park — achievements. Each one, once earned, builds a small monument on the lawn around the plaza.
// Pure data + logic (no three.js): test(S) says whether it's earned, progress(S) → [have, need] for the list.

import * as M from './genetics.js';

const nBreeds = (S) => Object.keys(S.breeds).length;
const found = (S, pred) => M.BREEDS.some(b => S.breeds[b.id] && pred(b));
const count = (n, get) => ({ test: (S) => get(S) >= n, progress: (S) => [Math.min(n, get(S)), n] });

export const ACHIEVEMENTS = [
  { id: 'firstbreed', name: 'First Registration', monument: 'statue', how: 'Discover your first breed.',
    blurb: 'A modest stone pigeon, erected by the Pigeon Fanciers’ Society to mark your first entry in the Registry.', ...count(1, nBreeds) },
  { id: 'breeds5', name: 'Budding Fancier', monument: 'birdbath', how: 'Discover 5 breeds.',
    blurb: 'A bronze bird bath. The pigeons refuse to bathe in it. It is for looking at.', ...count(5, nBreeds) },
  { id: 'breeds10', name: 'Serious Fancier', monument: 'topiary', how: 'Discover 10 breeds.',
    blurb: 'A hedge, trimmed lovingly into the shape of a pigeon. The real pigeons find it threatening.', ...count(10, nBreeds) },
  { id: 'breeds25', name: 'Master Breeder', monument: 'gold', how: 'Discover 25 breeds.',
    blurb: 'A solid gold pigeon on a marble plinth. Tourists rub its head for luck. It hates that.', ...count(25, nBreeds) },
  { id: 'breeds50', name: 'Living Legend', monument: 'obelisk', how: 'Discover 50 breeds.',
    blurb: 'An obelisk, visible from space if you squint, topped with a pigeon who is extremely proud of this.', ...count(50, nBreeds) },
  { id: 'allbreeds', name: 'The Complete Registry', monument: 'trophy', how: `Discover all ${M.BREEDS.length} breeds.`,
    blurb: 'The Golden Crumb. Only one exists. It is enormous. It is yours.', ...count(M.BREEDS.length, nBreeds) },
  { id: 'cryptid', name: 'Cryptozoologist', monument: 'runestone', how: 'Discover your first cryptid.',
    blurb: 'A standing stone that hums at night. Nobody installed it. It was simply there one morning.',
    test: (S) => found(S, b => !b.real && !b.legend), progress: (S) => [found(S, b => !b.real && !b.legend) ? 1 : 0, 1] },
  { id: 'legend', name: 'Summoner', monument: 'monolith', how: 'Bring a legendary pigeon into the park.',
    blurb: 'A black monolith full of stars. The pigeons gather at it and coo in a slightly different key.',
    test: (S) => found(S, b => b.legend), progress: (S) => [found(S, b => b.legend) ? 1 : 0, 1] },
  { id: 'exotic', name: 'Globetrotter', monument: 'globe', how: 'Discover an exotic breed.',
    blurb: 'A globe with a pigeon on top, pointing (with its whole body) at somewhere very far away.',
    test: (S) => found(S, b => b.exotic), progress: (S) => [found(S, b => b.exotic) ? 1 : 0, 1] },
  { id: 'naturalist', name: 'Field Naturalist', monument: 'books', how: 'Fill in half of the Pigeonpedia.',
    blurb: 'A stack of field guides in bronze. The top one is open to a page that just says “coo”.',
    ...count(Math.ceil(Object.keys(M.PEDIA).length / 2), (S) => Object.keys(S.discovered).length) },
  { id: 'dynasty', name: 'Dynasty', monument: 'familytree', how: 'Breed a line 10 generations deep.',
    blurb: 'A wrought-iron family tree. The leaves are gold. The drama is also gold.', ...count(10, (S) => S.stats.maxGen) },
  { id: 'hatchery', name: 'The Hatchery', monument: 'egg', how: 'Hatch 100 chicks.',
    blurb: 'A giant marble egg in a bronze nest. Everyone is waiting for it to hatch. It will not.', ...count(100, (S) => S.stats.births) },
  { id: 'fullroost', name: 'Full House', monument: 'minicote', how: 'Fill every perch in the Roost.',
    blurb: 'A tiny dovecote for tiny dignitaries. Mostly used by the Crouton.', ...count(8, (S) => S.roost.length) },
  { id: 'weird', name: 'Weirdness Witness', monument: 'spiral', how: 'Witness 10 weird happenings.',
    blurb: 'A rainbow sculpture of no particular shape. The council calls it “art”. The pigeons call it “a perch”.',
    ...count(10, (S) => S.stats.happenings || 0) },
];

// Lawn spots just outside the plaza curb, clear of benches, lamps and the dovecote; one per achievement.
export const MONUMENT_SLOTS = [
  [-6.75, -2.3], [-6.75, -.5], [-6.75, 3.0], [6.75, -2.3], [6.75, -.7], [6.75, .9], [6.75, 2.5],
  [-4.4, -5.05], [-.2, -5.05], [4.3, -5.05], [-3.3, 4.95], [1.3, 4.95], [5.4, 5.0], [-5.7, 4.95],
];

// Earn anything newly satisfied. quiet: award silently (e.g. catching up an older save), returns new ids.
export function checkAchievements(S, quiet = false) {
  const got = [];
  for (const a of ACHIEVEMENTS) {
    if (S.achievements[a.id] || !a.test(S)) continue;
    S.achievements[a.id] = { at: Date.now() };
    got.push(a.id);
    if (!quiet) {
      const i = ACHIEVEMENTS.indexOf(a), [x, z] = MONUMENT_SLOTS[i];
      S.toast(`🏆 ${a.name} — a monument has appeared at the edge of the park.`, 'breed');
      S.sound('chime'); S.sparkle(x, z, 3);
      S.emit({ type: 'achievement', id: a.id });
    }
  }
  if (quiet && got.length) S.toast(`${got.length} monument${got.length > 1 ? 's were' : ' was'} built in your honour while you were away.`, 'note');
  return got;
}
