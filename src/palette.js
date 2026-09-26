// Pigeon Park — colour palettes per phenotype (ported from the prototype's sprites.js).

export const STONE = { body: '#9b988f', wing: '#b6b3aa', head: '#84817a', pat: '#6b6862' };
export const ORE_SPECKS = {
  goldore: ['#f2c94c'], diamondore: ['#7de8e4'], emeraldore: ['#3bd970'], redstoneore: ['#e8402f'],
  ironore: ['#dcae86'], lapisore: ['#2f55d4'], coalore: ['#33322f'],
  gemore: ['#7de8e4', '#3bd970', '#e8402f', '#f2c94c', '#2f55d4', '#c95fd6'],
};
export const PALETTES = {
  blue:    { body: '#97a2b8', wing: '#c3cad7', head: '#77839c', pat: '#34363f' },
  blueS:   { body: '#42454f', wing: '#4b4e59', head: '#383b44', pat: '#303239' },
  blued:   { body: '#c7ccd8', wing: '#e2e5ec', head: '#a8afc0', pat: '#8b90a2' },
  blueSd:  { body: '#dbe1e8', wing: '#e8edf2', head: '#c6cfda', pat: '#b6c1cd' },
  ash:     { body: '#ddc9bc', wing: '#eee2d7', head: '#d3b9a9', pat: '#b5593e' },
  ashS:    { body: '#c7bcc7', wing: '#d4cbd4', head: '#b5a7b5', pat: '#a89aa8' },
  ashd:    { body: '#ecdfc9', wing: '#f5ecdc', head: '#e2d0b0', pat: '#d19c58' },
  ashSd:   { body: '#e0d9df', wing: '#eae4e9', head: '#cfc5ce', pat: '#bdb1bc' },
  brown:   { body: '#a3876b', wing: '#c1aa8f', head: '#86694f', pat: '#5f422a' },
  brownS:  { body: '#64503c', wing: '#6d5947', head: '#55432f', pat: '#4a3826' },
  brownd:  { body: '#c6b096', wing: '#d9c8b2', head: '#ad9578', pat: '#96795c' },
  brownSd: { body: '#d8c8b1', wing: '#e3d6c3', head: '#c4b198', pat: '#b3a28b' },
  red:     { body: '#ad5338', wing: '#c16a4e', head: '#94432c', pat: '#8f3d28' },
  redd:    { body: '#d8a264', wing: '#e4bc88', head: '#c08d4f', pat: '#b08040' },
  white:   { body: '#f7f4ec', wing: '#fbf9f4', head: '#f2eee4', pat: '#dcd6c8' },
  almond:  { body: '#d4a063', wing: '#e0b67a', head: '#c48c50', pat: '#4a3020' },
  indigo:  { body: '#8e93a8', wing: '#b0b2c0', head: '#6c6f86', pat: '#9a4e2c' },
  indigoS: { body: '#5f6478', wing: '#6d7286', head: '#51556a', pat: '#4a4e60' },
  rainbow: { body: '#f2b4c4', wing: '#bfe3f0', head: '#c9b6f0', pat: '#8f6fc0' },
  toast:   { body: '#e2b373', wing: '#ecc88e', head: '#c98c4a', pat: '#8a5226' },
  zebra:   { body: '#f4f1ea', wing: '#f4f1ea', head: '#f4f1ea', pat: '#222020' },
  sunset:  { body: '#f7a86b', wing: '#f6c27a', head: '#e0708a', pat: '#9a5ab0' },
  gold:    { body: '#e5b34d', wing: '#f1d283', head: '#cf9a36', pat: '#b8871f' },
  mint:    { body: '#a9d8b8', wing: '#c9ead4', head: '#8cc4a1', pat: '#609e7c' },
  lilac:   { body: '#c3aade', wing: '#dcccf0', head: '#a98cc9', pat: '#8465a8' },
  bubblegum: { body: '#f2a9c4', wing: '#f9cadb', head: '#e58bad', pat: '#c9648f' },
  void:    { body: '#2c2541', wing: '#3a3158', head: '#221c33', pat: '#8f86c0' },
  diamond: { body: '#bdeef0', wing: '#e0fbfa', head: '#93dade', pat: '#4db6bd' },
  emerald: { body: '#5ecb8a', wing: '#93e2b2', head: '#41b06e', pat: '#1f8a4c' },
  goldore: STONE, diamondore: STONE, emeraldore: STONE, redstoneore: STONE,
  ironore: STONE, lapisore: STONE, coalore: STONE, gemore: STONE,
};
export const W1 = '#f7f4ec', W2 = '#fbf9f4', LEG = '#cf6a5f';
const DARK_HEADS = { blue: 1, blueS: 1, brown: 1, brownS: 1, void: 1, red: 1, indigoS: 1 };

export function palette(pheno) {
  const P = PALETTES[pheno.colorKey] || PALETTES.blue;
  const e = pheno.e;
  let body = P.body, wing = P.wing, head = P.head, tail = P.head, pat = P.pat;
  let showPat = pheno.patternVisible;
  if (e.fantasy === 'none') {
    if (e.pied === 'saddle') { body = W1; head = W1; tail = '#efeadd'; }
    else if (e.pied === 'capped') { body = W1; wing = W2; showPat = false; }
    else if (e.pied === 'white') showPat = false;
    else if (e.pied === 'gazzi') { body = W1; }                                   // coloured head, wings, tail
    else if (e.pied === 'shield') { body = W1; head = W1; tail = '#efeadd'; }     // coloured wing shields only
    else if (e.pied === 'magpie') { wing = W2; showPat = false; }                  // white wings + belly
  }
  const beak = DARK_HEADS[pheno.colorKey] ? '#3a3a42' : '#c4b39e';
  let eye = e.eye === 'pearl' ? '#dfdbe8' : e.eye === 'bull' ? '#2b2224' : '#e8912d';
  if (e.pied === 'white' && e.fantasy === 'none') eye = '#3a3644';
  if (pheno.colorKey === 'void') eye = '#f0edff';
  return { body, wing, head, tail, pat, showPat, beak, eye, curl: P.pat };
}

