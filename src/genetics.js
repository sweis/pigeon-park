// Pigeon Park — genetics model, breed registry, copy. Pure data + logic, no DOM.

import { rand } from './rng.js';

export const LOCI = [
  { id: 'base',     alleles: ['ash', 'blue', 'brown'] },
  { id: 'pattern',  alleles: ['tcheck', 'check', 'bar', 'barless'] },
  { id: 'spread',   alleles: ['spread', 'no'] },
  { id: 'dilute',   alleles: ['full', 'dilute'] },
  { id: 'recred',   alleles: ['no', 'red'] },
  { id: 'grizzle',  alleles: ['grizzle', 'no'] },
  { id: 'pied',     alleles: ['solid', 'splash', 'saddle', 'capped', 'white'] },
  { id: 'sheen',    alleles: ['normal', 'bronze', 'opal', 'galaxy'], mutOnly: { galaxy: 1 } },
  { id: 'fantasy',  alleles: ['none', 'gold', 'mint', 'lilac', 'bubblegum', 'void', 'diamond', 'emerald', 'goldore', 'diamondore', 'emeraldore', 'redstoneore', 'ironore', 'lapisore', 'coalore', 'gemore'], mutOnly: { gold: 1, mint: 1, lilac: 1, bubblegum: 1, void: 1, diamond: 1, emerald: 1, goldore: 1, diamondore: 1, emeraldore: 1, redstoneore: 1, ironore: 1, lapisore: 1, coalore: 1, gemore: 1 } },
  { id: 'fpattern', alleles: ['none', 'dots', 'hearts', 'stars'], mutOnly: { dots: 1, hearts: 1, stars: 1 } },
  { id: 'glow',     alleles: ['none', 'glow'], mutOnly: { glow: 1 } },
  { id: 'crest',    alleles: ['none', 'peak', 'shell', 'rose', 'lace'] },
  { id: 'muffs',    alleles: ['clean', 'grouse', 'muffed'] },
  { id: 'tail',     alleles: ['normal', 'fantail'] },
  { id: 'mane',     alleles: ['plain', 'hood', 'cascade'] },
  { id: 'crop',     alleles: ['normal', 'globe'] },
  { id: 'frill',    alleles: ['smooth', 'frill'] },
  { id: 'curl',     alleles: ['straight', 'curly'] },
  { id: 'beak',     alleles: ['medium', 'short'] },
  { id: 'eye',      alleles: ['orange', 'pearl'] },
  { id: 'size',     alleles: ['normal', 'king', 'dinky'] },
  { id: 'behavior', alleles: ['steady', 'tumbler'] },
  { id: 'voice',    alleles: ['coo', 'trumpet'] },
];

const FOUNDER_FREQ = {
  base: { blue: .68, ash: .20, brown: .12 },
  pattern: { bar: .42, check: .36, tcheck: .16, barless: .06 },
  spread: { no: .86, spread: .14 },
  dilute: { full: .85, dilute: .15 },
  recred: { no: .90, red: .10 },
  grizzle: { no: .93, grizzle: .07 },
  pied: { solid: .78, splash: .14, saddle: .03, capped: .03, white: .02 },
  sheen: { normal: .95, bronze: .04, opal: .01 },
  fantasy: { none: 1 },
  fpattern: { none: 1 },
  glow: { none: 1 },
  crest: { none: .82, peak: .12, shell: .04, rose: .01, lace: .01 },
  muffs: { clean: .82, grouse: .12, muffed: .06 },
  tail: { normal: .90, fantail: .10 },
  mane: { plain: .93, hood: .05, cascade: .02 },
  crop: { normal: .93, globe: .07 },
  frill: { smooth: .90, frill: .10 },
  curl: { straight: .93, curly: .07 },
  beak: { medium: .88, short: .12 },
  eye: { orange: .85, pearl: .15 },
  size: { normal: .86, king: .07, dinky: .07 },
  behavior: { steady: .92, tumbler: .08 },
  voice: { coo: .94, trumpet: .06 },
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

export function expressedOf(genome) {
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
  gold: 'Solid Gold', mint: 'Mint', lilac: 'Lilac', bubblegum: 'Bubblegum', void: 'Void',
  diamond: 'Diamond', emerald: 'Emerald', goldore: 'Gold Ore', diamondore: 'Diamond Ore',
  emeraldore: 'Emerald Ore', redstoneore: 'Redstone Ore', ironore: 'Iron Ore', lapisore: 'Lapis Ore',
  coalore: 'Coal Ore', gemore: 'Mixed Gemstone',
};
const PATTERN_LABELS = { tcheck: 'T-Check', check: 'Check', bar: 'Bar', barless: 'Barless' };

export function derivePheno(e, accessory) {
  let colorKey;
  if (e.fantasy !== 'none') colorKey = e.fantasy;
  else if (e.pied === 'white') colorKey = 'white';
  else if (e.recred === 'red') colorKey = e.dilute === 'dilute' ? 'redd' : 'red';
  else colorKey = e.base + (e.spread === 'spread' ? 'S' : '') + (e.dilute === 'dilute' ? 'd' : '');
  const patternVisible = e.fantasy === 'none' && e.pied !== 'white' && e.recred !== 'red' && e.spread !== 'spread';
  let label = COLOR_LABELS[colorKey];
  if (patternVisible) label += ' ' + PATTERN_LABELS[e.pattern];
  if (e.grizzle === 'grizzle' && e.pied !== 'white' && e.fantasy === 'none') label = 'Grizzled ' + label;
  if (e.pied === 'splash') label += ', splashed'; if (e.pied === 'saddle') label += ', saddled'; if (e.pied === 'capped') label += ', capped';
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
        const m = ALLELE_META[l.id + ':' + al];
        if (m) out.push({ label: m.label, tier: m.tier });
      }
    }
  }
  return out;
}

export const ACCESSORIES = {
  tophat: { label: 'Top hat', w: 14 }, beret: { label: 'Beret', w: 14 }, cowboy: { label: 'Cowboy hat', w: 12 },
  monocle: { label: 'Monocle', w: 12 }, sunglasses: { label: 'Sunglasses', w: 16 }, bowtie: { label: 'Bow tie', w: 14 },
  scarf: { label: 'Tiny scarf', w: 10 }, propeller: { label: 'Propeller cap', w: 5 }, crown: { label: 'Crown', w: 3 },
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
  { id: 'disco', name: 'Disco Pigeon', real: 0, req: { sheen: 'galaxy' }, blurb: 'Contains a small nebula. Do not shake.' },
  { id: 'mintcond', name: 'Mint Condition', real: 0, req: { fantasy: 'mint' }, blurb: 'Never removed from original packaging.' },
  { id: 'nightlight', name: 'Night Light', real: 0, req: { glow: 'glow' }, blurb: 'Afraid of the dark. Solved it personally.' },
  { id: 'constellation', name: 'The Constellation', real: 0, req: { fantasy: 'void', fpattern: 'stars' }, blurb: 'Astronomers keep trying to name it.' },
  { id: 'birthday', name: 'Birthday Pigeon', real: 0, req: { fantasy: 'bubblegum', fpattern: 'dots' }, blurb: 'It is always its birthday. Always.' },
  { id: 'majesty', name: 'His Majesty', real: 0, req: { accessory: 'crown' }, blurb: 'Born wearing it. Ask no questions.' },
  { id: 'voidlegend', name: 'THE VOID PIGEON', real: 0, legend: 1, req: { fantasy: 'void', glow: 'glow' }, blurb: 'It coos and reality briefly buffers. Summoned, never bred.' },
  { id: 'galaxylegend', name: 'THE GALAXY PIGEON', real: 0, legend: 1, req: { sheen: 'galaxy', fpattern: 'stars' }, blurb: 'Contains several billion stars and one (1) crumb. Summoned, never bred.' },
];

export function matchBreeds(pheno) {
  return BREEDS.filter(b => Object.entries(b.req).every(([k, v]) => {
    const val = k === 'colorKey' ? pheno.colorKey : k === 'accessory' ? pheno.accessory : pheno.e[k];
    return Array.isArray(v) ? v.includes(val) : val === v;
  }));
}

const REQ_HINTS = {
  colorKey: { blueSd: 'an icy color (blue + spread + dilute, all at once)', blued: 'a silvery color (blue + dilute, no spread)' },
  accessory: { crown: 'be born wearing a very specific hat' },
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
  const e = {}; for (const l of LOCI) e[l.id] = l.alleles[l.alleles.length === 2 && l.id === 'spread' ? 1 : 0];
  e.base = 'blue'; e.pattern = 'bar'; e.spread = 'no'; e.dilute = 'full'; e.recred = 'no'; e.grizzle = 'no'; e.pied = 'solid';
  e.sheen = 'normal'; e.fantasy = 'none'; e.fpattern = 'none'; e.glow = 'none'; e.crest = 'none'; e.muffs = 'clean';
  e.tail = 'normal'; e.mane = 'plain'; e.crop = 'normal'; e.frill = 'smooth'; e.curl = 'straight'; e.beak = 'medium';
  e.eye = 'orange'; e.size = 'normal'; e.behavior = 'steady'; e.voice = 'coo';
  let accessory = null;
  for (const [k, v] of Object.entries(b.req)) {
    const val = Array.isArray(v) ? v[0] : v;
    if (k === 'colorKey') {
      if (val === 'blueSd') { e.base = 'blue'; e.spread = 'spread'; e.dilute = 'dilute'; }
      if (val === 'blued') { e.base = 'blue'; e.spread = 'no'; e.dilute = 'dilute'; }
    }
    else if (k === 'accessory') accessory = val;
    else e[k] = val;
  }
  if (b.sample) for (const [k, v] of Object.entries(b.sample)) e[k] = v;
  return derivePheno(e, accessory);
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
};

const FIRSTS = ['Gerald', 'Brenda', 'Kevin', 'Susan', 'Barry', 'Doreen', 'Nigel', 'Pam', 'Clive', 'Beryl', 'Trevor', 'Maude', 'Colin', 'Agnes', 'Derek', 'Gladys', 'Norman', 'Edith', 'Roger', 'Mavis', 'Keith', 'Olive', 'Alan', 'Joan', 'Gary', 'Ethel', 'Dennis', 'Vera', 'Stanley', 'Enid', 'Reginald', 'Petunia', 'Bartholomew', 'Wilhelmina', 'Chad', 'Karen', 'Steve', 'Linda'];
const EPITHETS = ['the Unwise', 'the Damp', 'of the Gutter', 'III', ', Esq.', 'the Round', 'the Crumbless', 'who Screams', 'the Prophet', 'of the Bakery', 'the Unbothered', 'the Moist', 'Jr. Jr.', 'the Statue Fancier', 'of Bench Fame', 'the Twice-Blessed', 'the Suspicious', 'Breadwinner', 'the Vertical', 'the Auditor', 'von Coo', 'the Slightly Late', 'of the Roundabout', 'the Magnificent'];
export function randomName() {
  const f = FIRSTS[Math.floor(rand() * FIRSTS.length)];
  if (rand() < .55) {
    const e = EPITHETS[Math.floor(rand() * EPITHETS.length)];
    return e.startsWith(',') ? f + e : f + ' ' + e;
  }
  return f;
}

export const THOUGHTS = ['crumb?', 'the void coos back', 'bread is a construct', 'i am the moment', 'statue duty at 3', 'seeds. seeds. seeds.', 'who is Gerald', 'my feet are warm', 'behold me', 'i forgot the sky', 'benches fear me', 'crumb.', 'today i strut', 'the fountain lies', 'wing day', 'coo occurred'];

export const COPY = {
  birth: ['A pigeon has occurred.', 'New pigeon. It knows nothing.', 'The egg has opinions now.', 'One (1) pigeon, freshly issued.', 'A pigeon manifests, blinking.', 'Fresh pigeon. Handle with awe.'],
  flyoff: ['{n} remembered an appointment.', '{n} left to pursue jazz.', '{n} has ascended. Normal reasons.', '{n} heard a distant sandwich.', '{n} left no forwarding address.', '{n} is now a sky problem.'],
  dismiss: ['{n} was politely asked to leave.', '{n} has been un-invited.', '{n} will speak to a manager elsewhere.', '{n} — escorted to the sky.', '{n} is pursuing other flocks.'],
  clone: ['{n} has been xeroxed.', 'Science forgives us: {n} ×2.', 'The lab regrets nothing. Hello, {n}.', '{n}, but again.'],
  full: ['No vacancy. The park has bylaws.', 'The park is at capacity. Someone must ascend first.', 'Fire code says no. The park is full.'],
  roostFull: ['The roost is full. Curate ruthlessly.', 'No perch left. Evict a favorite first.'],
  roosted: ['{n} moved into the roost. Rent: one coo.', '{n} is now a kept bird.', '{n} accepted the penthouse perch.'],
};
export function pick(arr) { return arr[Math.floor(rand() * arr.length)]; }
