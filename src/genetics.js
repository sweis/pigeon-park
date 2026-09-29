// Pigeon Park — genetics model, breed registry, copy. Pure data + logic, no DOM.

import { rand } from './rng.js';

export const LOCI = [
  { id: 'base',     alleles: ['ash', 'blue', 'brown'] },
  { id: 'pattern',  alleles: ['tcheck', 'check', 'bar', 'barless'] },
  { id: 'spread',   alleles: ['spread', 'no'] },
  { id: 'dilute',   alleles: ['full', 'dilute'] },
  { id: 'recred',   alleles: ['no', 'red'] },
  { id: 'grizzle',  alleles: ['grizzle', 'no'] },
  { id: 'pied',     alleles: ['solid', 'splash', 'rosewing', 'saddle', 'capped', 'baldhead', 'beard', 'magpie', 'gazzi', 'shield', 'white'] },
  { id: 'almond',   alleles: ['almond', 'no'] },
  { id: 'indigo',   alleles: ['indigo', 'no'] },
  { id: 'sheen',    alleles: ['normal', 'bronze', 'opal', 'galaxy'], mutOnly: { galaxy: 1 } },
  { id: 'fantasy',  alleles: ['none', 'gold', 'mint', 'lilac', 'bubblegum', 'void', 'diamond', 'emerald', 'goldore', 'diamondore', 'emeraldore', 'redstoneore', 'ironore', 'lapisore', 'coalore', 'gemore', 'rainbow', 'toast', 'zebra', 'sunset'], mutOnly: { rainbow: 1, toast: 1, zebra: 1, sunset: 1, gold: 1, mint: 1, lilac: 1, bubblegum: 1, void: 1, diamond: 1, emerald: 1, goldore: 1, diamondore: 1, emeraldore: 1, redstoneore: 1, ironore: 1, lapisore: 1, coalore: 1, gemore: 1 } },
  { id: 'fpattern', alleles: ['none', 'dots', 'hearts', 'stars'], mutOnly: { dots: 1, hearts: 1, stars: 1 } },
  { id: 'glow',     alleles: ['none', 'glow'], mutOnly: { glow: 1 } },
  { id: 'crest',    alleles: ['none', 'peak', 'shell', 'rose', 'lace', 'double', 'horn'], mutOnly: { horn: 1 } },
  { id: 'muffs',    alleles: ['clean', 'grouse', 'muffed'] },
  { id: 'tail',     alleles: ['normal', 'fantail'] },
  { id: 'mane',     alleles: ['plain', 'hood', 'cascade'] },
  { id: 'crop',     alleles: ['normal', 'globe'] },
  { id: 'frill',    alleles: ['smooth', 'frill'] },
  { id: 'curl',     alleles: ['straight', 'curly'] },
  { id: 'beak',     alleles: ['medium', 'long', 'short', 'stubby', 'duck'], mutOnly: { duck: 1 } },
  { id: 'wattle',   alleles: ['small', 'large'] },
  { id: 'eye',      alleles: ['orange', 'pearl', 'bull', 'googly'], mutOnly: { googly: 1 } },
  { id: 'size',     alleles: ['normal', 'king', 'dinky', 'chonk'], mutOnly: { chonk: 1 } },
  { id: 'neck',     alleles: ['normal', 'noodle'], mutOnly: { noodle: 1 } },
  { id: 'posture',  alleles: ['normal', 'upright'] },
  { id: 'legs',     alleles: ['normal', 'long'] },
  { id: 'feather',  alleles: ['normal', 'silky'] },
  { id: 'behavior', alleles: ['steady', 'tumbler', 'parlor'] },
  { id: 'voice',    alleles: ['coo', 'trumpet', 'laugher'] },
];

// Wild-type expression for every locus (a plain blue-bar feral). Used to fill in genes that an
// older save doesn't have, and as the base for breed samples and summoned birds.
export const WILD = {
  base: 'blue', pattern: 'bar', spread: 'no', dilute: 'full', recred: 'no', grizzle: 'no', pied: 'solid',
  almond: 'no', indigo: 'no', sheen: 'normal', fantasy: 'none', fpattern: 'none', glow: 'none', crest: 'none',
  muffs: 'clean', tail: 'normal', mane: 'plain', crop: 'normal', frill: 'smooth', curl: 'straight', beak: 'medium',
  wattle: 'small', eye: 'orange', size: 'normal', neck: 'normal', posture: 'normal', legs: 'normal', feather: 'normal',
  behavior: 'steady', voice: 'coo',
};
export function normalizeGenome(g) {
  for (const l of LOCI) if (!Array.isArray(g[l.id]) || g[l.id].length !== 2 || !g[l.id].every(a => l.alleles.includes(a))) g[l.id] = [WILD[l.id], WILD[l.id]];
  return g;
}

const FOUNDER_FREQ = {
  base: { blue: .68, ash: .20, brown: .12 },
  pattern: { bar: .42, check: .36, tcheck: .16, barless: .06 },
  spread: { no: .86, spread: .14 },
  dilute: { full: .85, dilute: .15 },
  recred: { no: .90, red: .10 },
  grizzle: { no: .93, grizzle: .07 },
  pied: { solid: .74, splash: .12, rosewing: .03, saddle: .025, capped: .025, baldhead: .02, beard: .015, magpie: .01, gazzi: .01, shield: .01, white: .015 },
  almond: { no: .97, almond: .03 },
  indigo: { no: .96, indigo: .04 },
  sheen: { normal: .95, bronze: .04, opal: .01 },
  fantasy: { none: 1 },
  fpattern: { none: 1 },
  glow: { none: 1 },
  crest: { none: .8, peak: .12, shell: .04, rose: .015, lace: .01, double: .015 },
  muffs: { clean: .82, grouse: .12, muffed: .06 },
  tail: { normal: .90, fantail: .10 },
  mane: { plain: .93, hood: .05, cascade: .02 },
  crop: { normal: .93, globe: .07 },
  frill: { smooth: .90, frill: .10 },
  curl: { straight: .93, curly: .07 },
  beak: { medium: .84, long: .05, short: .09, stubby: .02 },
  wattle: { small: .93, large: .07 },
  eye: { orange: .82, pearl: .14, bull: .04 },
  size: { normal: .86, king: .07, dinky: .07 },
  neck: { normal: 1 },
  posture: { normal: .93, upright: .07 },
  legs: { normal: .94, long: .06 },
  feather: { normal: .95, silky: .05 },
  behavior: { steady: .9, tumbler: .07, parlor: .03 },
  voice: { coo: .92, trumpet: .05, laugher: .03 },
};

// tier: 0 common, 1 uncommon, 2 rare, 3 impossible (fantasy)
export const ALLELE_META = {
  'base:ash': { label: 'Ash-red', tier: 1 }, 'base:brown': { label: 'Brown', tier: 1 },
  'pattern:tcheck': { label: 'T-check', tier: 1 }, 'pattern:barless': { label: 'Barless', tier: 2 },
  'spread:spread': { label: 'Spread', tier: 1 },
  'dilute:dilute': { label: 'Dilute', tier: 1 },
  'recred:red': { label: 'Recessive red', tier: 1 },
  'grizzle:grizzle': { label: 'Grizzle', tier: 1 },
  'pied:splash': { label: 'Splash', tier: 1 }, 'pied:saddle': { label: 'Saddle', tier: 2 },
  'pied:capped': { label: 'Capped', tier: 2 }, 'pied:white': { label: 'All-white', tier: 2 },
  'pied:rosewing': { label: 'Rosewing', tier: 1 }, 'pied:baldhead': { label: 'Baldhead', tier: 2 },
  'pied:beard': { label: 'Bearded', tier: 2 }, 'pied:magpie': { label: 'Magpie-marked', tier: 2 },
  'pied:gazzi': { label: 'Gazzi-marked', tier: 2 }, 'pied:shield': { label: 'Wing shield', tier: 2 },
  'almond:almond': { label: 'Almond', tier: 2 }, 'indigo:indigo': { label: 'Indigo', tier: 1 },
  'crest:double': { label: 'Double crest', tier: 2 },
  'beak:long': { label: 'Long beak', tier: 1 }, 'beak:stubby': { label: 'Button beak', tier: 2 },
  'wattle:large': { label: 'Wattled', tier: 2 }, 'eye:bull': { label: 'Bull eyes', tier: 1 },
  'posture:upright': { label: 'Upright stance', tier: 1 }, 'legs:long': { label: 'Stilt legs', tier: 2 },
  'feather:silky': { label: 'Silky feathers', tier: 2 }, 'behavior:parlor': { label: 'Parlor roller', tier: 2 },
  'voice:laugher': { label: 'Laugher voice', tier: 2 },
  'sheen:bronze': { label: 'Bronze sheen', tier: 2 }, 'sheen:opal': { label: 'Opal sheen', tier: 2 },
  'sheen:galaxy': { label: 'Galaxy sheen', tier: 3 },
  'fantasy:gold': { label: 'Solid gold', tier: 3 }, 'fantasy:mint': { label: 'Mint', tier: 3 },
  'fantasy:lilac': { label: 'Lilac', tier: 3 }, 'fantasy:bubblegum': { label: 'Bubblegum', tier: 3 },
  'fantasy:void': { label: 'Void', tier: 3 },
  'fantasy:diamond': { label: 'Diamond', tier: 3 }, 'fantasy:emerald': { label: 'Emerald', tier: 3 },
  'fantasy:goldore': { label: 'Gold ore', tier: 3 }, 'fantasy:diamondore': { label: 'Diamond ore', tier: 3 },
  'fantasy:emeraldore': { label: 'Emerald ore', tier: 3 }, 'fantasy:redstoneore': { label: 'Redstone ore', tier: 3 },
  'fantasy:ironore': { label: 'Iron ore', tier: 3 }, 'fantasy:lapisore': { label: 'Lapis ore', tier: 3 },
  'fantasy:coalore': { label: 'Coal ore', tier: 3 }, 'fantasy:gemore': { label: 'Mixed gemstone', tier: 3 },
  'fantasy:rainbow': { label: 'Rainbow', tier: 3 }, 'fantasy:toast': { label: 'Toasted', tier: 3 },
  'fantasy:zebra': { label: 'Zebra stripes', tier: 3 }, 'fantasy:sunset': { label: 'Sunset', tier: 3 },
  'crest:horn': { label: 'Unicorn horn', tier: 3 }, 'beak:duck': { label: 'Duck bill', tier: 3 },
  'eye:googly': { label: 'Googly eyes', tier: 3 }, 'size:chonk': { label: 'Absolute unit', tier: 3 },
  'neck:noodle': { label: 'Noodle neck', tier: 3 },
  'fpattern:dots': { label: 'Polka dots', tier: 3 }, 'fpattern:hearts': { label: 'Heart-marked', tier: 3 },
  'fpattern:stars': { label: 'Star-spangled', tier: 3 },
  'glow:glow': { label: 'Bioluminescent', tier: 3 },
  'crest:peak': { label: 'Peak crest', tier: 1 }, 'crest:shell': { label: 'Shell crest', tier: 2 },
  'crest:rose': { label: 'Rose crest', tier: 2 }, 'crest:lace': { label: 'Lace crown', tier: 2 },
  'muffs:grouse': { label: 'Grouse legs', tier: 1 }, 'muffs:muffed': { label: 'Muffed feet', tier: 1 },
  'tail:fantail': { label: 'Fantail', tier: 2 },
  'mane:hood': { label: 'Feathered hood', tier: 2 }, 'mane:cascade': { label: 'Neck hackles', tier: 2 },
  'crop:globe': { label: 'Inflated crop', tier: 2 },
  'frill:frill': { label: 'Breast frill', tier: 1 },
  'curl:curly': { label: 'Curled feathers', tier: 2 },
  'beak:short': { label: 'Short beak', tier: 1 },
  'eye:pearl': { label: 'Pearl eyes', tier: 1 },
  'size:king': { label: 'Very large', tier: 2 }, 'size:dinky': { label: 'Very small', tier: 2 },
  'behavior:tumbler': { label: 'Tumbler', tier: 2 },
  'voice:trumpet': { label: 'Trumpeter voice', tier: 2 },
};

function pickWeighted(weights) {
  let sum = 0; for (const k in weights) sum += weights[k];
  let r = rand() * sum;
  for (const k in weights) { r -= weights[k]; if (r <= 0) return k; }
  return Object.keys(weights)[0];
}

export function founderGenome() {
  const g = {};
  for (const l of LOCI) g[l.id] = [pickWeighted(FOUNDER_FREQ[l.id]), pickWeighted(FOUNDER_FREQ[l.id])];
  return g;
}

// mutFactor: 0.5 calm / 1 normal / 3 chaos
export function offspring(gA, gB, mutFactor = 1) {
  const g = {}, mutated = [];
  for (const l of LOCI) {
    const pair = [gA[l.id][rand() < .5 ? 0 : 1], gB[l.id][rand() < .5 ? 0 : 1]];
    if (rand() < 0.022 * mutFactor) {
      const w = {};
      l.alleles.forEach((a, i) => { w[a] = (l.mutOnly && l.mutOnly[a]) ? 0.05 : (i === l.alleles.length - 1 || i === 0 ? 0.8 : 1); });
      const na = pickWeighted(w);
      const slot = rand() < .5 ? 0 : 1;
      if (pair[slot] !== na) { pair[slot] = na; mutated.push(l.id + ':' + na); }
    }
    g[l.id] = pair;
  }
  return { genome: g, mutated };
}

function expressedOf(genome) {
  const e = {};
  for (const l of LOCI) {
    const [a, b] = genome[l.id];
    e[l.id] = l.alleles[Math.min(l.alleles.indexOf(a), l.alleles.indexOf(b))];
  }
  return e;
}

const COLOR_LABELS = {
  blue: 'Blue', blueS: 'Black', blued: 'Silver', blueSd: 'Ice',
  ash: 'Ash-Red', ashS: 'Lavender', ashd: 'Cream', ashSd: 'Pale Lavender',
  brown: 'Brown', brownS: 'Chocolate', brownd: 'Khaki', brownSd: 'Café-au-lait',
  red: 'Red', redd: 'Golden Yellow', white: 'White',
  almond: 'Almond', indigo: 'Indigo', indigoS: 'Andalusian Slate',
  gold: 'Solid Gold', mint: 'Mint', lilac: 'Lilac', bubblegum: 'Bubblegum', void: 'Void',
  diamond: 'Diamond', emerald: 'Emerald', goldore: 'Gold Ore', diamondore: 'Diamond Ore',
  emeraldore: 'Emerald Ore', redstoneore: 'Redstone Ore', ironore: 'Iron Ore', lapisore: 'Lapis Ore',
  coalore: 'Coal Ore', gemore: 'Mixed Gemstone', rainbow: 'Rainbow', toast: 'Toasted', zebra: 'Zebra', sunset: 'Sunset',
};
const PATTERN_LABELS = { tcheck: 'T-Check', check: 'Check', bar: 'Bar', barless: 'Barless' };

function derivePheno(e, accessory) {
  let colorKey;
  if (e.fantasy !== 'none') colorKey = e.fantasy;
  else if (e.pied === 'white') colorKey = 'white';
  else if (e.recred === 'red') colorKey = e.dilute === 'dilute' ? 'redd' : 'red';
  else if (e.almond === 'almond') colorKey = 'almond';
  else if (e.indigo === 'indigo' && e.base === 'blue') colorKey = e.spread === 'spread' ? 'indigoS' : 'indigo';
  else colorKey = e.base + (e.spread === 'spread' ? 'S' : '') + (e.dilute === 'dilute' ? 'd' : '');
  const patternVisible = e.fantasy === 'none' && e.pied !== 'white' && e.recred !== 'red' && e.spread !== 'spread' && e.almond !== 'almond';
  let label = COLOR_LABELS[colorKey];
  if (patternVisible) label += ' ' + PATTERN_LABELS[e.pattern];
  if (e.grizzle === 'grizzle' && e.pied !== 'white' && e.fantasy === 'none') label = 'Grizzled ' + label;
  const PIED_SUFFIX = { splash: 'splashed', saddle: 'saddled', capped: 'capped', rosewing: 'rosewinged', baldhead: 'baldheaded', beard: 'bearded', magpie: 'magpie-marked', gazzi: 'gazzi-marked', shield: 'wing-shielded' };
  if (PIED_SUFFIX[e.pied] && e.fantasy === 'none') label += ', ' + PIED_SUFFIX[e.pied];
  const traits = [], keys = [];
  for (const l of LOCI) {
    const m = ALLELE_META[l.id + ':' + e[l.id]];
    if (m) { traits.push({ key: l.id + ':' + e[l.id], label: m.label, tier: m.tier }); keys.push(l.id + ':' + e[l.id]); }
  }
  if (accessory) traits.push({ key: 'acc:' + accessory, label: ACCESSORIES[accessory].label, tier: 2 });
  const sparkTier = traits.reduce((m, t) => Math.max(m, t.tier), 0);
  return { e, accessory: accessory || null, colorKey, label, patternVisible, traits, sparkTier };
}

export function computePheno(genome, accessory) { return derivePheno(expressedOf(genome), accessory); }

export function phenoKey(pheno) {
  return LOCI.map(l => pheno.e[l.id]).join('|') + '|' + (pheno.accessory || '-');
}

export function carriersOf(genome) {
  const out = [];
  for (const l of LOCI) {
    const [a, b] = genome[l.id];
    const ei = Math.min(l.alleles.indexOf(a), l.alleles.indexOf(b));
    for (const al of new Set([a, b])) {
      if (l.alleles.indexOf(al) > ei) {
        const key = l.id + ':' + al, m = ALLELE_META[key];
        if (m) out.push({ key, label: m.label, tier: m.tier });
      }
    }
  }
  return out;
}

// Does a bird show a trait (2), only carry it hidden (1), or neither (0)? key: 'locus:allele' or 'acc:name'.
let _tsKey = null, _tsLoc = '', _tsAl = ''; // the finder asks about one key for every bird, every frame
export function traitStatus(genome, pheno, key) {
  if (key !== _tsKey) { _tsKey = key; [_tsLoc, _tsAl] = key.split(':'); }
  const loc = _tsLoc, al = _tsAl;
  if (loc === 'acc') return pheno.accessory === al ? 2 : 0;
  if (pheno.e[loc] === al) return 2;
  const pair = genome[loc];
  return pair && (pair[0] === al || pair[1] === al) ? 1 : 0;
}

// Compact genome string for ancestry records: two base-36 allele indices per locus, in LOCI order.
// Loci added later decode as wild type, so old records stay readable.
export function encodeGenome(g) {
  return LOCI.map(l => g[l.id].map(a => Math.max(0, l.alleles.indexOf(a)).toString(36)).join('')).join('');
}
export function decodeGenome(s) {
  const g = {};
  LOCI.forEach((l, i) => {
    const a = l.alleles[parseInt(s[i * 2], 36)], b = l.alleles[parseInt(s[i * 2 + 1], 36)];
    g[l.id] = a && b ? [a, b] : [WILD[l.id], WILD[l.id]];
  });
  return g;
}

export const ACCESSORIES = {
  tophat: { label: 'Top hat', w: 14 }, beret: { label: 'Beret', w: 14 }, cowboy: { label: 'Cowboy hat', w: 12 },
  monocle: { label: 'Monocle', w: 12 }, sunglasses: { label: 'Sunglasses', w: 16 }, bowtie: { label: 'Bow tie', w: 14 },
  scarf: { label: 'Tiny scarf', w: 10 }, propeller: { label: 'Propeller cap', w: 5 }, crown: { label: 'Crown', w: 3 },
  partyhat: { label: 'Party hat', w: 8 }, chefhat: { label: 'Chef hat', w: 6 }, mustache: { label: 'Magnificent moustache', w: 7 },
};
export function rollAccessory(chance = 0.02) {
  if (rand() > chance) return null;
  const w = {}; for (const k in ACCESSORIES) w[k] = ACCESSORIES[k].w;
  return pickWeighted(w);
}

export const BREEDS = [
  { id: 'fantail', name: 'Fantail', real: 1, req: { tail: 'fantail', mane: 'plain', crop: 'normal' }, blurb: 'Thirty tail feathers and the confidence to use them.' },
  { id: 'jacobin', name: 'Jacobin', real: 1, req: { mane: 'hood' }, blurb: 'Cannot see sideways. Refuses to discuss it.' },
  { id: 'frillback', name: 'Frillback', real: 1, req: { curl: 'curly' }, blurb: 'Woke up like this. Every feather, a decision.' },
  { id: 'pouter', name: 'English Pouter', real: 1, req: { crop: 'globe' }, blurb: 'Mostly balloon. Legally a bird.' },
  { id: 'ogowl', name: 'Old German Owl', real: 1, req: { beak: 'short', frill: 'frill', crest: 'shell' }, blurb: 'A small opinionated cloud with a cravat.' },
  { id: 'afowl', name: 'African Owl', real: 1, req: { beak: 'short', frill: 'frill', crest: 'none' }, blurb: 'The cravat, without the hat.' },
  { id: 'nun', name: 'Nun', real: 1, req: { pied: 'capped', crest: 'shell' }, blurb: 'Took vows. Mostly of cooing.' },
  { id: 'helmet', name: 'Helmet', real: 1, req: { pied: 'capped', crest: 'none' }, blurb: 'Safety first, since the 1500s.' },
  { id: 'fairyswallow', name: 'Saxon Fairy Swallow', real: 1, req: { pied: 'saddle', muffs: 'muffed' }, blurb: 'Wears slippers at all times. House rules.' },
  { id: 'lahore', name: 'Lahore', real: 1, req: { pied: 'saddle', size: 'king' }, blurb: 'Large, gentle, immaculately two-toned.' },
  { id: 'ice', name: 'Ice Pigeon', real: 1, req: { colorKey: 'blueSd', muffs: ['grouse', 'muffed'] }, blurb: 'Kept in the fridge overnight. Perfect.' },
  { id: 'archangel', name: 'Archangel', real: 1, req: { sheen: 'bronze', crest: 'peak' }, blurb: 'Polished daily by unseen forces.' },
  { id: 'trumpeter', name: 'English Trumpeter', real: 1, req: { voice: 'trumpet', crest: 'rose' }, blurb: 'The neighbors have filed a petition.' },
  { id: 'roller', name: 'Birmingham Roller', real: 1, req: { behavior: 'tumbler' }, blurb: 'Falls with style. On purpose, allegedly.' },
  { id: 'king', name: 'Show King', real: 1, req: { size: 'king', pied: 'white' }, blurb: 'Enormous. Spotless. Judges wept.' },
  { id: 'modena', name: 'Modena', real: 1, req: { size: 'dinky', pattern: ['tcheck', 'check'], spread: 'no' }, blurb: 'A teacup of a pigeon. Espresso, technically.' },
  { id: 'indianfantail', name: 'Indian Fantail', real: 1, req: { tail: 'fantail', crest: 'peak', muffs: ['grouse', 'muffed'] }, blurb: 'The fantail, but with slippers and a hat.' },
  { id: 'satinette', name: 'Oriental Frill', real: 1, req: { beak: 'short', frill: 'frill', pied: 'saddle' }, blurb: 'Hand-painted wings. The beak did the painting.' },
  { id: 'brunner', name: 'Brunner Pouter', real: 1, req: { crop: 'globe', size: 'dinky' }, blurb: 'A party balloon that learned to strut.' },
  { id: 'damascene', name: 'Damascene', real: 1, req: { colorKey: 'blued' }, blurb: 'Milk-blue since antiquity. Still smug about it.' },
  { id: 'nicobar', name: 'Nicobar Pigeon', real: 1, exotic: 1, req: { mane: 'cascade' }, sample: { spread: 'spread', sheen: 'bronze' }, blurb: 'Wears every necklace it owns. Simultaneously.' },
  { id: 'victoria', name: 'Victoria Crowned Pigeon', real: 1, exotic: 1, req: { crest: 'lace', size: 'king' }, sample: { dilute: 'dilute' }, blurb: 'The largest pigeon on Earth. The doily is load-bearing.' },
  { id: 'bleedingheart', name: 'Luzon Bleeding-heart', real: 1, exotic: 1, req: { fpattern: 'hearts', pied: 'white' }, blurb: 'It is fine. It has always looked like this. It is fine.' },
  { id: 'magpie', name: 'Magpie', real: 1, req: { pied: 'magpie' }, blurb: 'Dressed for a gala. Attends none of them.' },
  { id: 'gazzimodena', name: 'Gazzi Modena', real: 1, req: { pied: 'gazzi', size: 'dinky' }, blurb: 'The Modena, but it read a fashion magazine.' },
  { id: 'danzig', name: 'Danzig Highflyer', real: 1, req: { pied: 'baldhead', beak: 'long' }, blurb: 'White-headed, long-nosed, flies until it forgets why.' },
  { id: 'bearded', name: 'Bearded Tumbler', real: 1, req: { pied: 'beard', behavior: 'tumbler' }, blurb: 'Grows a beard. Does flips. Has a podcast, probably.' },
  { id: 'turbit', name: 'Turbit', real: 1, req: { pied: 'shield', crest: 'peak', frill: 'frill' }, blurb: 'Coloured wings, white everything else, a cowlick for flair.' },
  { id: 'rosewing', name: 'Rosewing Roller', real: 1, req: { pied: 'rosewing', behavior: 'tumbler' }, blurb: 'Roses on the shoulders, chaos in the sky.' },
  { id: 'almondtumbler', name: 'Almond Tumbler', real: 1, req: { almond: 'almond', beak: 'stubby' }, blurb: 'Flecked like a biscotti. Beak like a button. Beloved of Victorians.' },
  { id: 'budapest', name: 'Budapest Short-face', real: 1, req: { beak: 'stubby', posture: 'upright' }, blurb: 'Stands to attention. Has almost no face to stand behind.' },
  { id: 'carrier', name: 'English Carrier', real: 1, req: { wattle: 'large', beak: 'long' }, blurb: 'A beak with a pigeon attached. Wattled for gravitas.' },
  { id: 'barb', name: 'Barb', real: 1, req: { wattle: 'large', beak: 'short' }, blurb: 'A stubby beak and enormous spectacles. Very studious.' },
  { id: 'dragoon', name: 'Dragoon', real: 1, req: { wattle: 'large', size: 'king' }, blurb: 'Big, wattled, and technically a cavalry unit.' },
  { id: 'scandaroon', name: 'Scandaroon', real: 1, req: { beak: 'long', posture: 'upright' }, blurb: 'Nose held high. It has a lot of nose to hold.' },
  { id: 'maltese', name: 'Maltese', real: 1, req: { legs: 'long', posture: 'upright' }, blurb: 'A pigeon on stilts pretending to be a chicken.' },
  { id: 'andalusian', name: 'Andalusian', real: 1, req: { colorKey: 'indigoS' }, blurb: 'Slate-blue, dramatic, would like to be painted.' },
  { id: 'lacefantail', name: 'Lace Fantail', real: 1, req: { tail: 'fantail', feather: 'silky' }, blurb: 'A fantail that went through a tumble dryer. Gloriously.' },
  { id: 'parlorroller', name: 'Parlor Roller', real: 1, req: { behavior: 'parlor' }, blurb: 'Cannot fly. Rolls across the floor instead. Wins anyway.' },
  { id: 'lotan', name: 'Indian Lotan', real: 1, req: { behavior: 'parlor', pied: 'white' }, blurb: 'A white ground-roller. Shake it gently and it somersaults.' },
  { id: 'laugher', name: 'Arabian Laugher', real: 1, req: { voice: 'laugher' }, blurb: 'Laughs at everything. Especially you.' },
  { id: 'bokhara', name: 'Bokhara Trumpeter', real: 1, req: { voice: 'trumpet', crest: 'double', muffs: 'muffed' }, blurb: 'Two crests, full slippers, one very long drumroll.' },
  { id: 'capuchine', name: 'Old Dutch Capuchine', real: 1, req: { mane: 'hood', pied: 'baldhead' }, blurb: 'A monastic hood, a white face, strong opinions.' },
  { id: 'pomeranian', name: 'Pomeranian Pouter', real: 1, req: { crop: 'globe', legs: 'long', muffs: 'muffed' }, blurb: 'Balloon, stilts and slippers. A complete outfit.' },
  { id: 'norwich', name: 'Norwich Cropper', real: 1, req: { crop: 'globe', posture: 'upright' }, blurb: 'Inflates, stands up straight, awaits applause.' },
  { id: 'kite', name: 'Kite Tumbler', real: 1, req: { spread: 'spread', sheen: 'bronze', behavior: 'tumbler' }, blurb: 'Black with bronze wings. Falls out of the sky elegantly.' },
  { id: 'priest', name: 'Saxon Priest', real: 1, req: { pied: 'baldhead', crest: 'double' }, blurb: 'Two crests and a white skullcap. Delivers sermons on seeds.' },
  { id: 'disco', name: 'Disco Pigeon', real: 0, req: { sheen: 'galaxy' }, blurb: 'Contains a small nebula. Do not shake.' },
  { id: 'mintcond', name: 'Mint Condition', real: 0, req: { fantasy: 'mint' }, blurb: 'Never removed from original packaging.' },
  { id: 'nightlight', name: 'Night Light', real: 0, req: { glow: 'glow' }, blurb: 'Afraid of the dark. Solved it personally.' },
  { id: 'constellation', name: 'The Constellation', real: 0, req: { fantasy: 'void', fpattern: 'stars' }, blurb: 'Astronomers keep trying to name it.' },
  { id: 'birthday', name: 'Birthday Pigeon', real: 0, req: { fantasy: 'bubblegum', fpattern: 'dots' }, blurb: 'It is always its birthday. Always.' },
  { id: 'majesty', name: 'His Majesty', real: 0, req: { accessory: 'crown' }, blurb: 'Born wearing it. Ask no questions.' },
  { id: 'pigeonicorn', name: 'Pigeonicorn', real: 0, req: { crest: 'horn', pied: 'white' }, blurb: 'Grants one wish per day. The wish must be bread.' },
  { id: 'narwhal', name: 'Sky Narwhal', real: 0, req: { crest: 'horn', colorKey: ['blueS', 'blueSd'] }, blurb: 'Lost at sea. Found in a park. Refuses to elaborate.' },
  { id: 'rubberducky', name: 'Rubber Ducky', real: 0, req: { beak: 'duck', colorKey: 'redd' }, blurb: 'Squeaks when stepped on. Please do not test this.' },
  { id: 'platypigeon', name: 'Platypigeon', real: 0, req: { beak: 'duck', colorKey: ['brown', 'brownS'] }, blurb: 'Lays eggs, which is normal. Everything else is not.' },
  { id: 'googler', name: 'The Googler', real: 0, req: { eye: 'googly' }, blurb: 'Sees everything. Understands nothing. Wobbles.' },
  { id: 'lochness', name: 'Loch Ness Pigeon', real: 0, req: { neck: 'noodle', fantasy: ['mint', 'emerald'] }, blurb: 'Only ever photographed blurry. Stands perfectly still for the camera anyway.' },
  { id: 'noodle', name: 'Noodle', real: 0, req: { neck: 'noodle' }, blurb: 'Can see over hedges. Mostly uses this to find bread.' },
  { id: 'absoluteunit', name: 'Absolute Unit', real: 0, req: { size: 'chonk' }, blurb: 'In awe at the size of this lad.' },
  { id: 'chonkasaurus', name: 'Chonkasaurus', real: 0, req: { size: 'chonk', neck: 'noodle' }, blurb: 'Palaeontologists have been informed. They are coming.' },
  { id: 'toast', name: 'French Toast', real: 0, req: { fantasy: 'toast' }, blurb: 'Golden brown. Texture like sun. Smells faintly of cinnamon.' },
  { id: 'crouton', name: 'The Crouton', real: 0, req: { fantasy: 'toast', size: 'dinky' }, blurb: 'Bite-sized. Please do not put it in a salad.' },
  { id: 'rainbowroad', name: 'Rainbow Road', real: 0, req: { fantasy: 'rainbow', tail: 'fantail' }, blurb: 'Do not fall off it. Every child of the 90s knows why.' },
  { id: 'prismatic', name: 'Prism Pigeon', real: 0, req: { fantasy: 'rainbow' }, blurb: 'Splits sunlight into seven feelings.' },
  { id: 'zebreon', name: 'Zebreon', real: 0, req: { fantasy: 'zebra' }, blurb: 'Is it a white pigeon with black stripes? It will not say.' },
  { id: 'sunsetstrip', name: 'Sunset Strip', real: 0, req: { fantasy: 'sunset', sheen: 'opal' }, blurb: 'Permanently golden hour. Influencers follow it everywhere.' },
  { id: 'partyanimal', name: 'Party Animal', real: 0, req: { accessory: 'partyhat', fpattern: 'dots' }, blurb: 'Arrived in 1987. The party never ended.' },
  { id: 'chef', name: 'Chef Pigeonnaire', real: 0, req: { accessory: 'chefhat' }, blurb: 'Specialises in crumbs. Michelin inspectors are too scared to visit.' },
  { id: 'mustachio', name: 'Signor Mustachio', real: 0, req: { accessory: 'mustache', voice: 'trumpet' }, blurb: 'Sings opera at dawn. The moustache is load-bearing.' },
  { id: 'voidlegend', name: 'THE VOID PIGEON', real: 0, legend: 1, req: { fantasy: 'void', glow: 'glow' }, blurb: 'It coos and reality briefly buffers. Summoned, never bred.' },
  { id: 'galaxylegend', name: 'THE GALAXY PIGEON', real: 0, legend: 1, req: { sheen: 'galaxy', fpattern: 'stars' }, blurb: 'Contains several billion stars and one (1) crumb. Summoned, never bred.' },
];

export function matchBreeds(pheno) {
  return BREEDS.filter(b => Object.entries(b.req).every(([k, v]) => {
    const val = k === 'colorKey' ? pheno.colorKey : k === 'accessory' ? pheno.accessory : pheno.e[k];
    return Array.isArray(v) ? v.includes(val) : val === v;
  }));
}

// Genes that produce a given colour key (inverse of derivePheno's colour logic).
function colorGenes(key) {
  if (key === 'red' || key === 'redd') return { recred: 'red', dilute: key === 'redd' ? 'dilute' : 'full' };
  if (key === 'indigo' || key === 'indigoS') return { base: 'blue', indigo: 'indigo', spread: key === 'indigoS' ? 'spread' : 'no' };
  const m = /^(blue|ash|brown)(S?)(d?)$/.exec(key);
  if (m) return { base: m[1], spread: m[2] ? 'spread' : 'no', dilute: m[3] ? 'dilute' : 'full' };
  return {};
}
// Trait keys (as recorded in the Pigeonpedia) a colour key needs.
export function colorTraits(key) {
  return Object.entries(colorGenes(key)).map(([l, a]) => l + ':' + a).filter(t => ALLELE_META[t]);
}
const REQ_HINTS = {
  colorKey: { blueSd: 'an icy color (blue + spread + dilute, all at once)', blued: 'a silvery color (blue + dilute, no spread)', indigoS: 'a slate color (indigo + spread on a blue bird)',
    blueS: 'a black or icy color (blue + spread)', redd: 'a golden-yellow color (recessive red + dilute)', brown: 'a brown color' },
  accessory: { crown: 'be born wearing a very specific hat', partyhat: 'be born ready to party (hat included)', chefhat: 'hatch already employed in hospitality', mustache: 'grow a truly magnificent moustache' },
};
export function breedHint(b) {
  return Object.entries(b.req).map(([k, v]) => {
    if (REQ_HINTS[k] && REQ_HINTS[k][Array.isArray(v) ? v[0] : v]) return REQ_HINTS[k][Array.isArray(v) ? v[0] : v];
    const vals = Array.isArray(v) ? v : [v];
    const parts = vals.map(x => { const m = ALLELE_META[k + ':' + x]; return m ? m.label.toLowerCase() : (x === 'none' || x === 'plain' || x === 'normal' || x === 'no' || x === 'clean' ? 'no ' + k : x); });
    return parts.join(' or ');
  }).join(' + ');
}

// Build a representative expressed-map for a breed (for silhouettes)
export function breedSample(b) {
  const e = { ...WILD };
  let accessory = null;
  for (const [k, v] of Object.entries(b.req)) {
    const val = Array.isArray(v) ? v[0] : v;
    if (k === 'colorKey') Object.assign(e, colorGenes(val));
    else if (k === 'accessory') accessory = val;
    else e[k] = val;
  }
  if (b.sample) for (const [k, v] of Object.entries(b.sample)) e[k] = v;
  return derivePheno(e, accessory);
}
// A true-breeding (homozygous) genome for a breed's sample look: registry clones, visitors, debug spawns.
export function breedGenome(b) {
  const sm = breedSample(b), genome = {};
  for (const l of LOCI) genome[l.id] = [sm.e[l.id], sm.e[l.id]];
  return { genome, accessory: sm.accessory };
}

export const PEDIA = {
  'base:ash': 'Ash-red. The color of a brick that has seen things.',
  'base:brown': 'Brown. Not to be confused with other browns. It insists.',
  'pattern:tcheck': 'T-check. So many checks the wing is basically plaid.',
  'pattern:barless': 'Barless. The wing equivalent of forgetting your keys.',
  'spread:spread': 'Spread. One color, applied with total commitment.',
  'dilute:dilute': 'Dilute. Same pigeon, 40% more pastel.',
  'recred:red': 'Recessive red. Paints over everything. The HOA is furious.',
  'grizzle:grizzle': 'Grizzle. Salt and pepper, hold the salt shaker lid.',
  'pied:splash': 'Splash. An accident at the paint factory, worn proudly.',
  'pied:saddle': 'Saddle. White bird, colored wings. Very business casual.',
  'pied:capped': 'Capped. Wears its color like a tiny swim cap.',
  'pied:white': 'All-white. Suspiciously innocent.',
  'pied:rosewing': 'Rosewing. A little bouquet of white on each shoulder.',
  'pied:baldhead': 'Baldhead. Not bald. White-headed. Please stop saying bald.',
  'pied:beard': 'Bearded. A white bib under the beak, like it just ate yogurt.',
  'pied:magpie': 'Magpie-marked. Tuxedo up top, white underneath. Black tie optional.',
  'pied:gazzi': 'Gazzi. Coloured head, wings and tail on a white body. Paint-by-numbers.',
  'pied:shield': 'Wing shield. White bird, coloured wing shields. Heraldically correct.',
  'almond:almond': 'Almond. Speckled like a biscotti. Changes a little every moult.',
  'indigo:indigo': 'Indigo. Blue with rusty bars. Looks like it slept in the garden.',
  'crest:double': 'Double crest. One crest on the head, another on the nose. Maximalist.',
  'beak:long': 'Long beak. Can reach the crumbs other pigeons only dream of.',
  'beak:stubby': 'Button beak. So short it is mostly a suggestion.',
  'wattle:large': 'Wattled. Big warty spectacles and a nose to match. Distinguished.',
  'eye:bull': 'Bull eyes. Dark, deep, unreadable. Probably thinking about bread.',
  'posture:upright': 'Upright stance. Stands like it is about to give a toast.',
  'legs:long': 'Stilt legs. Sees over the other pigeons. Tells them what it sees.',
  'feather:silky': 'Silky feathers. Soft, fluffy, completely useless for flying. Worth it.',
  'behavior:parlor': 'Parlor roller. Somersaults along the ground. Nobody asked it to.',
  'voice:laugher': 'Laugher voice. Coos like a sitcom audience.',
  'sheen:bronze': 'Bronze sheen. Third place, permanently, gloriously.',
  'sheen:opal': 'Opal sheen. Shimmers when it thinks nobody is looking.',
  'sheen:galaxy': 'Galaxy sheen. NASA has been notified. They said "wow".',
  'fantasy:gold': 'Solid gold. Do not take to a pawn shop.',
  'fantasy:mint': 'Mint. Smells faintly of victory and toothpaste.',
  'fantasy:lilac': 'Lilac. Botanists deny involvement.',
  'fantasy:bubblegum': 'Bubblegum. Pink beyond all reason or precedent.',
  'fantasy:void': 'Void. Light goes in. Coos come out.',
  'fantasy:diamond': 'Diamond. Hardest known pigeon. Do not sit on.',
  'fantasy:emerald': 'Emerald. Villagers keep trying to trade for it.',
  'fantasy:goldore': 'Gold ore. Still embedded in the rock. Refuses smelting.',
  'fantasy:diamondore': 'Diamond ore. Mine with an iron beak or better.',
  'fantasy:emeraldore': 'Emerald ore. Found exactly one per mountain.',
  'fantasy:redstoneore': 'Redstone ore. Glows when stepped on. Powers nothing.',
  'fantasy:ironore': 'Iron ore. Sturdy. Slightly magnetic. Very proud.',
  'fantasy:lapisore': 'Lapis ore. Enchanting to be around.',
  'fantasy:coalore': 'Coal ore. Burns for eight coos exactly.',
  'fantasy:gemore': 'Mixed gemstone. The whole quarry in one bird.',
  'fpattern:dots': 'Polka dots. Genetically ready for any party.',
  'fpattern:hearts': 'Heart-marked. Loves you. Has proof.',
  'fpattern:stars': 'Star-spangled. Hums anthems at dawn.',
  'glow:glow': 'Bioluminescent. Reading lamp of the flock.',
  'crest:peak': 'Peak crest. A single decisive cowlick.',
  'crest:shell': 'Shell crest. A feathered headrest, always deployed.',
  'crest:rose': 'Rose crest. A pompom, grown in-house.',
  'crest:lace': 'Lace crown. Royalty, but doily.',
  'muffs:grouse': 'Grouse legs. Ankle warmers, non-removable.',
  'muffs:muffed': 'Muffed feet. Walks around in slippers. Zero regrets.',
  'tail:fantail': 'Fantail. A hand of cards, all of them winning.',
  'mane:hood': 'Feathered hood. Peripheral vision traded for drama.',
  'mane:cascade': 'Neck hackles. A private waterfall of feathers.',
  'crop:globe': 'Inflated crop. 60% pigeon, 40% party balloon.',
  'frill:frill': 'Breast frill. A jabot. Yes, it knows the word.',
  'curl:curly': 'Curled feathers. Permanent perm. No appointment needed.',
  'beak:short': 'Short beak. Boops at maximum efficiency.',
  'eye:pearl': 'Pearl eyes. Sees you. Judges gently.',
  'size:king': 'Very large. Technically still fits in one hand. Whose hand, unclear.',
  'size:dinky': 'Very small. Travel-sized for your convenience.',
  'behavior:tumbler': 'Tumbler. Does a little flip. Nobody knows why. Science gave up.',
  'voice:trumpet': 'Trumpeter voice. Jazz, unfortunately.',
  'fantasy:rainbow': 'Rainbow. Every colour, none of the restraint.',
  'fantasy:toast': 'Toasted. Crispy at the edges. Do not add butter.',
  'fantasy:zebra': 'Zebra stripes. Confuses predators and, frankly, everyone.',
  'fantasy:sunset': 'Sunset. Permanently 7:42pm on a nice evening in June.',
  'crest:horn': 'Unicorn horn. Magical, allegedly. Mostly used to open bread bags.',
  'beak:duck': 'Duck bill. Identity crisis in progress. Quack pending.',
  'eye:googly': 'Googly eyes. Wobble when it walks. Wobble when it thinks.',
  'size:chonk': 'Absolute unit. Structurally more loaf than bird.',
  'neck:noodle': 'Noodle neck. Head is in a different postcode to the feet.',
};

const FIRSTS = ['Nugget', 'Crumbsworth', 'Sir Reginald', 'Baguette', 'Sprinkles', 'Dave', 'Lord Coo', 'Madame Flapsby', 'Pigeon', 'Toast', 'Gregory', 'Beatrice', 'Waffles', 'Montgomery', 'Deborah', 'Captain', 'Gerald', 'Brenda', 'Kevin', 'Susan', 'Barry', 'Doreen', 'Nigel', 'Pam', 'Clive', 'Beryl', 'Trevor', 'Maude', 'Colin', 'Agnes', 'Derek', 'Gladys', 'Norman', 'Edith', 'Roger', 'Mavis', 'Keith', 'Olive', 'Alan', 'Joan', 'Gary', 'Ethel', 'Dennis', 'Vera', 'Stanley', 'Enid', 'Reginald', 'Petunia', 'Bartholomew', 'Wilhelmina', 'Chad', 'Karen', 'Steve', 'Linda'];
const EPITHETS = ['the Unwise', 'the Damp', 'of the Gutter', 'III', ', Esq.', 'the Round', 'the Crumbless', 'who Screams', 'the Prophet', 'of the Bakery', 'the Unbothered', 'the Moist', 'Jr. Jr.', 'the Statue Fancier', 'of Bench Fame', 'the Twice-Blessed', 'the Suspicious', 'Breadwinner', 'the Vertical', 'the Auditor', 'von Coo', 'the Slightly Late', 'of the Roundabout', 'the Magnificent',
  'the Lesser', 'the Greater', 'Who Has Seen Things', 'of the Bin', 'the Legally Distinct', 'the Unemployed', 'Destroyer of Chips',
  'the Undercover Cop', 'the Unhinged', 'PhD', 'of LinkedIn', 'the Influencer', 'the Chronically Online', 'the Wet',
  'Who Owes Money', 'the Theatre Kid', 'the Accountant', 'of the Car Park', 'the Twelfth', 'Formerly of the Zoo'];
export function randomName() {
  const f = FIRSTS[Math.floor(rand() * FIRSTS.length)];
  if (rand() < .55) {
    const e = EPITHETS[Math.floor(rand() * EPITHETS.length)];
    return e.startsWith(',') ? f + e : f + ' ' + e;
  }
  return f;
}

export const THOUGHTS = ['crumb?', 'the void coos back', 'bread is a construct', 'i am the moment', 'statue duty at 3', 'seeds. seeds. seeds.', 'who is Gerald', 'my feet are warm', 'behold me', 'i forgot the sky', 'benches fear me', 'crumb.', 'today i strut', 'the fountain lies', 'wing day', 'coo occurred',
  'is this a bench', 'i could fly. i choose not to', 'my neck does the thing', 'bread. bread?? BREAD', 'i have no thoughts only coo', 'the sidewalk is my rival',
  'i was a dinosaur once', 'do NOT look at my feet', 'who put this park here', 'im not a spy', 'i know what you did', 'mortgage??',
  'the statue is my ex', 'must. find. chip.', 'i am in my flop era', 'i pay no taxes', 'everything is crumb', 'crunch time',
  'wait whose egg', 'i am legally a dove', 'the fountain knows', 'emotionally, i am a swan', 'i just remembered the sky',
  'what if bread... but more', 'no thoughts, head smooth', 'coo coo ca-choo', 'is anyone else vibrating', 'i peaked in 2019',
  'loaf mode: activated', 'let me be clear: crumb', 'i think my feet are shoes', 'the pavement speaks to me', 'bench? bench.',
  'a single fry. at last.', 'i have seen a sandwich', 'plot twist: i can read', 'reply all', 'per my last coo',
  'this is my good side', 'i would die for a crust', 'somebody has to be the main character', 'i have beef with that duck',
  'i contain multitudes (crumbs)', 'the ground is lava (it is not)', 'i should start a podcast', 'who is walking who here',
  'my aura is 90% grey', 'i left the oven on. i do not have an oven', 'i am the pigeon your pigeon warned you about',
  'if i fits i sits', 'tiny dinosaur, big dreams', 'my ancestors were in world war one', 'the benches are unionising',
  'i saw a crumb in 2021 and never recovered', 'is it bread o\'clock', 'i have a very specific set of skills (pecking)',
  'somebody said bagel', 'i believe in gravel', 'neck forward. neck back. neck forward', 'i am simply vibing',
  'the humans think they run this place', 'what is my purpose. oh. bread', 'we should unionise', 'i am in my villain arc',
  'crumb economics', 'tell my wife i said coo', 'i am not lost i am exploring', 'this fountain is giving', 'i would like a refund on the sky',
  'the squirrels are hiding something', 'i have 3 brain cells and they are all busy', 'my left foot is my favourite',
  'hot take: seeds', 'i am absolutely unbothered', 'i am absolutely bothered', 'look at this pavement. incredible',
  'does anyone want to fight (politely)', 'im going to walk in a small circle', 'who moved my crumb', 'every day is leg day',
  'certified bench inspector', 'i am 40% feathers', 'the wind has betrayed me', 'i know kung coo', 'crumbs are just bread confetti',
  'i will be a statue one day', 'trust no seagull', 'i should call my mother', 'i think i am famous', 'this is a pigeon-only zone',
  'i am the chosen crumb finder', 'my other car is a bench', 'rent is due. rent is always due', 'i have never seen a baby pigeon. suspicious',
  'please clap', 'i am once again asking for bread', 'what if the park is inside ME', 'thinking about that one fry',
  'i accidentally walked backwards', 'i am speed (walking)', 'does this bench make me look fat', 'i was here first',
  'is that a hawk or a bag', 'i have a meeting at the fountain', 'ok but hear me out: toast', 'i nodded 400 times today',
  'feathers are just fancy hair', 'my horoscope said crumbs', 'im just a little guy', 'i demand to see the pigeon manager',
  'wings are optional', 'i am doing my best', 'this is my personality now', 'i got here by walking. all of it'];
export const REPLIES = ['same', 'source?', 'ok gerald', 'valid', 'coo.', 'real', 'no', 'bestie…', 'and?', 'we know', 'shh', 'this', 'mood', 'huh', 'go off', 'bread?', 'ratio', 'wow', 'i also have feet',
  'big if true', 'citation needed', 'deeply relatable', 'sir this is a fountain', 'noted', 'the audacity', 'i was just thinking that',
  'lol', 'say less', 'not now', 'rude', 'respectfully, no', 'ok boomer', 'tell me more', 'huge', 'blocked', 'unfollowed',
  'i disagree but politely', 'fair', 'go on…', 'coo coo (agreed)', 'we are so back', 'it\'s so over', 'touch grass', 'bold of you'];
export const NIGHT_THOUGHTS = ['is the moon bread', 'the lamps are watching', 'sleep is for doves', 'what is a star but a far crumb', 'the fountain whispers at night', 'nocturnal era', 'who turned the sky off',
  'the moon looks like a crumb i knew', 'night shift, baby', 'i can see my house from here (no)', 'the stars are just far-away pigeons',
  'shh the lamps are sleeping', 'why is it so dark (it is night)', 'i am an owl now', 'the benches are cold', 'dream of bread',
  'bedtime is a social construct', 'is anyone else awake', 'something rustled', 'i will sleep when i am a statue',
  'the fountain sounds louder at night', 'counting crumbs to fall asleep', 'midnight snack?', 'i heard a hoot. rival.',
  'the dark is just the sky resting', 'tomorrow: bread'];
export const HELD_LINES = ['PUT ME DOWN', 'i am flying (not)', 'unhand me', 'this is kidnapping', 'wheee', 'i did not consent to this altitude', 'am i the chosen one', 'finally, recognition', 'my lawyer will hear of this', 'is this heaven',
  'i can see the whole park', 'help (not really)', 'this is my first time flying first class', 'excuse me??', 'i am a very important bird',
  'higher! higher!', 'where are we going', 'i will remember this', 'i knew you would pick me', 'mind the feathers', 'hands off the merch',
  'is this about the crumb', 'weeeeee', 'i am being abducted (by a human)', 'call my agent'];
export const BABY_LINES = ['where am i', 'what is a pigeon', 'mama?', 'i know nothing', 'hello world', 'first coo!!', 'what are feet', 'i am new here',
  'is that bread', 'big world', 'am i a pigeon', 'hi!!!!', 'what year is it', 'who are all these birds', 'i have questions',
  'is the ground always this big', 'coo? coo!', 'i can walk?!', 'where is the manual', 'who ordered me', 'i am baby', 'feathers, huh'];
export const COURT_LINES = ['nice feet', 'u come here often', 'u like crumbs?', 'is that a bread in ur pocket', 'your coo is so loud', 'hey', 'marry me (for tax reasons)', 'wanna see my bench',
  'are you a crumb because i want you', 'i would share my fry with you', 'your feathers are so grey', 'you had me at coo',
  'let me buy you a seed', 'nice neck shimmer', 'i like the way you bob', 'is this seat taken', 'you + me + bench?',
  'i saved you a crust', 'my heart goes coo coo', 'we should nest sometime', 'you look like a statue (compliment)'];
// Said when two birds bump into each other in a crowd.
export const BUMP_LINES = ['excuse me', 'oof', 'watch it', 'sorry!', 'personal space', 'rude', 'after you', 'no, after YOU', 'beep beep', 'coming through',
  'hey!', 'do you mind', 'pardon me', 'traffic', 'move', 'we are touching', 'mind the wing', 'bonk', 'i was walking here'];

// Pick a line from a pool without repeating anything said recently (the last ~half of the pool is held
// back), so small pools don't loop and big ones feel fresh. Seeded like everything else.
// `said` holds the history (a Map, one per park — the Sim owns it, so seeded replays stay identical).
export function say(pool, said = new Map()) {
  let r = said.get(pool); if (!r) said.set(pool, r = []);
  const hold = Math.min(r.length, Math.floor(pool.length / 2));
  let line, tries = 0;
  do { line = pool[Math.floor(rand() * pool.length)]; } while (r.lastIndexOf(line) >= r.length - hold && ++tries < 12);
  r.push(line); if (r.length > pool.length) r.shift();
  return line;
}

export const COPY = {
  birth: ['A chick has been released into the wild. The wild is a car park.', 'Congratulations, it is a pigeon.', 'Another one. Nobody asked, everyone is delighted.', 'A pigeon has occurred.', 'New pigeon. It knows nothing.', 'The egg has opinions now.', 'One (1) pigeon, freshly issued.', 'A pigeon manifests, blinking.', 'Fresh pigeon. Handle with awe.'],
  flyoff: ['{n} has joined a band.', '{n} went to find itself. It was in Belgium.', '{n} has been headhunted.', '{n} is off to haunt a train station.', '{n} remembered an appointment.', '{n} left to pursue jazz.', '{n} has ascended. Normal reasons.', '{n} heard a distant sandwich.', '{n} left no forwarding address.', '{n} is now a sky problem.'],
  dismiss: ['{n} was politely asked to leave.', '{n} has been un-invited.', '{n} will speak to a manager elsewhere.', '{n} — escorted to the sky.', '{n} is pursuing other flocks.'],
  clone: ['{n} has been xeroxed.', 'Science forgives us: {n} ×2.', 'The lab regrets nothing. Hello, {n}.', '{n}, but again.'],
  full: ['No vacancy. The park has bylaws.', 'The park is at capacity. Someone must ascend first.', 'Fire code says no. The park is full.'],
  roostFull: ['The roost is full. Curate ruthlessly.', 'No perch left. Evict a favorite first.'],
  roosted: ['{n} moved into the roost. Rent: one coo.', '{n} is now a kept bird.', '{n} accepted the penthouse perch.'],
};
export function pick(arr) { return arr[Math.floor(rand() * arr.length)]; }
