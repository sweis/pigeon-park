// Pigeon Park — procedural pigeon sprite renderer. Pure string SVG, facing right, viewBox 0 0 120 120.

const STONE = { body: '#9b988f', wing: '#b6b3aa', head: '#84817a', pat: '#6b6862' };
const ORE_SPECKS = {
  goldore: ['#f2c94c'], diamondore: ['#7de8e4'], emeraldore: ['#3bd970'], redstoneore: ['#e8402f'],
  ironore: ['#dcae86'], lapisore: ['#2f55d4'], coalore: ['#33322f'],
  gemore: ['#7de8e4', '#3bd970', '#e8402f', '#f2c94c', '#2f55d4', '#c95fd6'],
};
const PALETTES = {
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
const W1 = '#f7f4ec', W2 = '#fbf9f4', LEG = '#cf6a5f';
const DARK_HEADS = { blue: 1, blueS: 1, brown: 1, brownS: 1, void: 1, red: 1 };

export function palette(pheno) {
  const P = PALETTES[pheno.colorKey] || PALETTES.blue;
  const e = pheno.e;
  let body = P.body, wing = P.wing, head = P.head, tail = P.head, pat = P.pat;
  let showPat = pheno.patternVisible;
  if (e.fantasy === 'none') {
    if (e.pied === 'saddle') { body = W1; head = W1; tail = '#efeadd'; }
    else if (e.pied === 'capped') { body = W1; wing = W2; showPat = false; }
    else if (e.pied === 'white') showPat = false;
  }
  const beak = DARK_HEADS[pheno.colorKey] ? '#3a3a42' : '#c4b39e';
  let eye = e.eye === 'pearl' ? '#dfdbe8' : '#e8912d';
  if (e.pied === 'white' && e.fantasy === 'none') eye = '#3a3644';
  if (pheno.colorKey === 'void') eye = '#f0edff';
  return { body, wing, head, tail, pat, showPat, beak, eye, curl: P.pat };
}

const FPOS = [[44, 60], [55, 70], [63, 57], [48, 72], [59, 64], [40, 67]];

export function spriteSVG(pheno, opts = {}) {
  const { wing = 'fold', sleep = false, shadow = true } = opts;
  const e = pheno.e, C = palette(pheno);
  const flying = wing === 'up';
  const p = [];
  const defs = [];
  // glow aura
  if (e.glow === 'glow') {
    defs.push('<radialGradient id="gl"><stop offset="0" stop-color="#eaf6a8" stop-opacity=".6"/><stop offset="1" stop-color="#eaf6a8" stop-opacity="0"/></radialGradient>');
    p.push('<ellipse cx="58" cy="60" rx="46" ry="40" fill="url(#gl)"/>');
  }
  if (shadow && !flying) p.push('<ellipse cx="58" cy="104" rx="25" ry="4.5" fill="rgba(46,43,37,.12)"/>');
  // tail
  if (e.tail === 'fantail') {
    const f = [];
    for (let i = 0; i < 9; i++) {
      const a = -80 + i * 20;
      f.push(`<ellipse transform="rotate(${a})" cx="0" cy="-17" rx="5.5" ry="17" fill="${i % 2 ? C.wing : C.tail}"/>`);
    }
    p.push(`<g transform="translate(33,60)">${f.join('')}<circle cx="0" cy="2" r="6" fill="${C.body}"/></g>`);
  } else {
    p.push(`<path d="M38,54 C24,55 11,59 3,66 L10,75 C20,74 30,74 40,77 Z" fill="${C.tail}"/>`);
  }
  // legs (far)
  const legAndFoot = (x) => `<path d="M${x},84 L${x},100 M${x},100 l-5,4 M${x},100 l1,5 M${x},100 l6,3" stroke="${LEG}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  const muff = (x) => e.muffs === 'muffed'
    ? `<ellipse cx="${x}" cy="88" rx="7" ry="9.5" fill="${C.body}"/><ellipse cx="${x}" cy="96" rx="5" ry="6" fill="${C.wing}"/>`
    : e.muffs === 'grouse' ? `<ellipse cx="${x}" cy="87" rx="4.5" ry="6" fill="${C.body}"/>` : '';
  if (!flying) { p.push(legAndFoot(50)); p.push(muff(50)); }
  // body
  p.push(`<ellipse cx="54" cy="66" rx="27" ry="20" transform="rotate(-8 54 66)" fill="${C.body}"/>`);
  if (e.pied === 'splash' && e.fantasy === 'none') {
    p.push(`<ellipse cx="46" cy="62" rx="8" ry="5.5" transform="rotate(-10 46 62)" fill="${W1}"/><ellipse cx="60" cy="74" rx="6.5" ry="4.5" fill="${W1}"/>`);
  }
  // crop globe
  if (e.crop === 'globe') p.push(`<circle cx="71" cy="55" r="13" fill="${C.body}"/><ellipse cx="75" cy="49" rx="5" ry="3.5" fill="#fff" opacity=".22"/>`);
  // wing
  if (flying) {
    p.push(`<ellipse cx="62" cy="34" rx="10" ry="22" transform="rotate(14 62 34)" fill="${C.wing}"/><ellipse cx="62" cy="24" rx="7" ry="10" transform="rotate(14 62 24)" fill="${C.body}" opacity=".35"/>`);
  } else {
    const inner = [];
    inner.push(`<ellipse cx="50" cy="64" rx="18" ry="11" fill="${C.wing}"/>`);
    if (C.showPat) {
      if (e.pattern === 'bar') inner.push(`<g clip-path="url(#wc)"><rect x="31" y="60" width="35" height="4" rx="2" fill="${C.pat}"/><rect x="34" y="67" width="33" height="4" rx="2" fill="${C.pat}"/></g>`);
      else if (e.pattern === 'check') {
        const d = [];
        for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) d.push(`<circle cx="${36 + c * 7 + (r % 2) * 3}" cy="${57 + r * 6}" r="2.4" fill="${C.pat}"/>`);
        inner.push(`<g clip-path="url(#wc)">${d.join('')}</g>`);
      } else if (e.pattern === 'tcheck') {
        const d = [];
        for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) d.push(`<circle cx="${34 + c * 5.6 + (r % 2) * 2.6}" cy="${55.5 + r * 5.4}" r="3" fill="${C.pat}"/>`);
        inner.push(`<g clip-path="url(#wc)">${d.join('')}</g>`);
      }
    }
    if (e.curl === 'curly') {
      const cs = [];
      for (let i = 0; i < 5; i++) cs.push(`<path d="M${37 + i * 5.5},56.5 q5,4 0,9.5" stroke="${C.curl}" stroke-width="2.1" fill="none" opacity=".8"/>`);
      inner.push(`<g clip-path="url(#wc)">${cs.join('')}</g>`);
      p.push(`<path d="M40,80 q3,-5 -1,-8 M50,82 q3,-5 -1,-8 M60,81 q3,-5 -1,-8" stroke="${C.curl}" stroke-width="1.8" fill="none" opacity=".55"/>`);
    }
    defs.push('<clipPath id="wc"><ellipse cx="50" cy="64" rx="18" ry="11"/></clipPath>');
    p.push(`<g transform="rotate(-14 50 64)">${inner.join('')}</g>`);
  }
  // galaxy overlay
  if (e.sheen === 'galaxy') {
    defs.push('<linearGradient id="gal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2e2a5e"/><stop offset=".5" stop-color="#6a3f8f"/><stop offset="1" stop-color="#35547e"/></linearGradient>');
    p.push('<ellipse cx="54" cy="65" rx="27" ry="20" transform="rotate(-8 54 65)" fill="url(#gal)" opacity=".82"/>');
    p.push('<g fill="#fff"><circle cx="44" cy="60" r=".9"/><circle cx="56" cy="70" r=".8"/><circle cx="62" cy="58" r="1"/><circle cx="48" cy="72" r=".7"/><circle cx="38" cy="66" r=".8"/><circle cx="58" cy="63" r=".6"/></g><circle cx="52" cy="62" r="1.4" fill="#b9a8ff"/><circle cx="64" cy="68" r="1.2" fill="#8fd0ff"/>');
  }
  if (pheno.colorKey === 'gold') p.push('<g transform="rotate(24 50 64)" opacity=".35" fill="#fff"><rect x="42" y="44" width="9" height="42"/><rect x="56" y="44" width="4" height="42"/></g>');
  if (pheno.colorKey === 'diamond' || pheno.colorKey === 'emerald') p.push('<g transform="rotate(24 50 64)" opacity=".4" fill="#fff"><rect x="44" y="44" width="7" height="42"/><rect x="56" y="44" width="3" height="42"/></g>');
  if (ORE_SPECKS[pheno.colorKey]) {
    const cols = ORE_SPECKS[pheno.colorKey];
    const spots = [[46, 60], [57, 69], [63, 57], [49, 71], [40, 66], [59, 63]];
    p.push('<g>' + spots.map(([x, y], i) => `<rect x="${x - 2.3}" y="${y - 2.3}" width="4.6" height="4.6" fill="${cols[i % cols.length]}" opacity=".95"/>`).join('') + '</g>');
  }
  if (pheno.colorKey === 'void') p.push('<g fill="#cfc8f2"><circle cx="46" cy="62" r=".9"/><circle cx="58" cy="70" r=".8"/><circle cx="62" cy="59" r=".7"/><circle cx="50" cy="73" r=".7"/><polygon points="54,60 55,62.4 54,64.8 53,62.4"/></g>');
  // fantasy patterns
  const bleedingHeart = e.fpattern === 'hearts' && e.pied === 'white' && e.fantasy === 'none';
  if (e.fpattern !== 'none' && !bleedingHeart) {
    const marks = FPOS.map(([x, y]) => {
      if (e.fpattern === 'dots') return `<circle cx="${x}" cy="${y}" r="2.6"/>`;
      if (e.fpattern === 'hearts') return `<g transform="translate(${x},${y})"><circle cx="-1.3" cy="-0.5" r="1.5"/><circle cx="1.3" cy="-0.5" r="1.5"/><polygon points="-2.6,0.4 0,3.6 2.6,0.4"/></g>`;
      return `<g transform="translate(${x},${y})"><polygon points="0,-3.4 1.1,0 0,3.4 -1.1,0"/><polygon points="-3.4,0 0,-1.1 3.4,0 0,1.1"/></g>`;
    });
    p.push(`<g fill="#fff" opacity=".9">${marks.join('')}</g>`);
  }
  // grizzle streaks
  if (e.grizzle === 'grizzle' && e.pied !== 'white' && e.fantasy === 'none') {
    p.push('<g stroke="#f6f2e8" stroke-width="1.8" fill="none" opacity=".75" stroke-linecap="round"><path d="M40,60 q6,-2 12,-1"/><path d="M42,67 q6,2 12,1"/><path d="M52,54 q6,-2 10,0"/></g>');
  }
  // near leg
  if (!flying) { p.push(legAndFoot(62)); p.push(muff(62)); }
  // hood (jacobin) — behind neck+head
  if (e.mane === 'hood') {
    const petals = [-15, -45, -75, -105, -135, -165].map(a => `<ellipse transform="rotate(${a})" cx="0" cy="-13.5" rx="4.4" ry="8.5" fill="${C.body}"/>`).join('');
    const inner = [-30, -70, -110, -150].map(a => `<ellipse transform="rotate(${a})" cx="0" cy="-11" rx="3.4" ry="6.5" fill="${C.wing}"/>`).join('');
    p.push(`<g transform="translate(80,31)">${petals}${inner}</g>`);
  }
  // nicobar hackles — a metallic rainbow cape draping down the back of the neck
  if (e.mane === 'cascade') {
    const IR = ['#2f8f68', '#3f6fae', '#a2622f', '#2f9c86', '#54549e', '#8a5a2b', '#3d8f5f'];
    const IR2 = ['#4fc08e', '#6f9fd8', '#d08a4a', '#54c8ae', '#7d7dc8', '#b8804a', '#5fb98a'];
    const hk = [], hk2 = [];
    for (let i = 0; i < 7; i++) {
      const a = 170 + i * 15;
      hk.push(`<ellipse transform="rotate(${a})" cx="0" cy="-15.5" rx="3" ry="13" fill="${IR[i]}"/>`);
      hk2.push(`<ellipse transform="rotate(${a + 3})" cx="0" cy="-17.5" rx="1.3" ry="8" fill="${IR2[i]}" opacity=".85"/>`);
    }
    if (e.tail !== 'fantail') p.push('<path d="M38,54 C24,55 11,59 3,66 L10,75 C20,74 30,74 40,77 Z" fill="#f4f1e7" opacity=".95"/>');
    p.push(`<g transform="translate(75,41)">${hk.join('')}${hk2.join('')}</g>`);
  }
  // crest — behind head
  if (e.crest === 'peak') p.push(`<path d="M71,21 q-7,-3 -9,-9 q8,0 12,5 z" fill="${C.head}"/>`);
  if (e.crest === 'shell') {
    const petals = [-30, -55, -80, -105, -130].map(a => `<ellipse transform="rotate(${a})" cx="0" cy="-12.5" rx="3.6" ry="7" fill="${C.wing}" stroke="${C.head}" stroke-width=".7"/>`).join('');
    p.push(`<g transform="translate(80,31)">${petals}</g>`);
  }
  if (e.crest === 'rose') {
    const petals = [0, 45, 90, 135, 180, 225, 270, 315].map(a => `<ellipse transform="rotate(${a})" cx="0" cy="-5.5" rx="2.6" ry="5.5" fill="${C.wing}" stroke="${C.head}" stroke-width=".6"/>`).join('');
    p.push(`<g transform="translate(70,21)">${petals}<circle r="2.6" fill="${C.head}"/></g>`);
  }
  if (e.crest === 'lace') {
    const fil = [];
    for (let i = 0; i < 9; i++) {
      const a = (-160 + i * 17.5) * Math.PI / 180;
      const x2 = (80 + 17 * Math.cos(a)).toFixed(1), y2 = (27 + 17 * Math.sin(a)).toFixed(1);
      fil.push(`<line x1="80" y1="27" x2="${x2}" y2="${y2}" stroke="${C.head}" stroke-width="1.1"/><circle cx="${x2}" cy="${y2}" r="1.9" fill="#f6f3ea" stroke="${C.head}" stroke-width=".6"/>`);
    }
    p.push(`<g opacity=".95">${fil.join('')}</g>`);
  }
  // neck + sheen
  p.push(`<ellipse cx="69" cy="49" rx="10.5" ry="15" transform="rotate(18 69 49)" fill="${C.head}"/>`);
  if (e.fantasy === 'none' && e.pied !== 'white' && e.sheen !== 'galaxy') {
    const grads = { normal: ['#55a06b', '#8f5fae', .5], bronze: ['#d08a3e', '#7a4a20', .85], opal: ['#7ec8d8', '#d8a8e8', .85] };
    const g = grads[e.sheen];
    if (g && !(e.pied === 'saddle')) {
      defs.push(`<linearGradient id="ir" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${g[0]}"/><stop offset="1" stop-color="${g[1]}"/></linearGradient>`);
      p.push(`<ellipse cx="69" cy="50" rx="7.5" ry="11" transform="rotate(18 69 50)" fill="url(#ir)" opacity="${g[2]}"/>`);
    }
  } else if (e.sheen === 'galaxy') {
    p.push('<ellipse cx="69" cy="49" rx="8" ry="12" transform="rotate(18 69 49)" fill="url(#gal)" opacity=".7"/>');
  }
  // frill
  if (e.frill === 'frill') p.push('<path d="M75,41 l3.5,2.5 l-5,2 l4.5,2.5 l-5,2 l3.5,2.5" stroke="#fdfbf5" stroke-width="2" fill="none" opacity=".9" stroke-linecap="round"/>');
  // luzon bleeding-heart — one crimson wound-mark on the breast
  if (bleedingHeart) p.push('<g fill="#c0392b" transform="translate(67,55) scale(1.4)"><circle cx="-1.3" cy="-0.5" r="1.5"/><circle cx="1.3" cy="-0.5" r="1.5"/><polygon points="-2.6,0.4 0,3.6 2.6,0.4"/></g>');
  // head
  p.push(`<circle cx="80" cy="31" r="11.5" fill="${e.pied === 'capped' && e.fantasy === 'none' ? PALETTES[pheno.colorKey === 'white' ? 'blue' : pheno.colorKey].head : C.head}"/>`);
  if (ORE_SPECKS[pheno.colorKey]) {
    const cols = ORE_SPECKS[pheno.colorKey];
    p.push(`<rect x="75.5" y="27" width="3.6" height="3.6" fill="${cols[0]}" opacity=".95"/><rect x="81.5" y="33" width="3.2" height="3.2" fill="${cols[cols.length > 1 ? 1 : 0]}" opacity=".95"/>`);
  }
  if (e.grizzle === 'grizzle' && e.pied !== 'white' && e.fantasy === 'none') {
    p.push('<g stroke="#f6f2e8" stroke-width="1.6" fill="none" opacity=".75" stroke-linecap="round"><path d="M74,26 q4,-2 8,-1"/><path d="M75,34 q4,2 8,1"/></g>');
  }
  // beak + cere
  const bx = e.beak === 'short' ? 97 : 102;
  p.push(`<path d="M90.5,28.5 L${bx},31.5 L90.5,35 Z" fill="${C.beak}"/><ellipse cx="90" cy="27.6" rx="3" ry="2" fill="#e9e2d4"/>`);
  // eye
  if (sleep) p.push('<path d="M81.5,28.5 q3,3 6,0" stroke="#201e1d" stroke-width="1.6" fill="none" stroke-linecap="round"/>');
  else p.push(`<circle cx="84.5" cy="28.5" r="4" fill="none" stroke="rgba(32,30,29,.18)" stroke-width="1.4"/><circle cx="84.5" cy="28.5" r="2.9" fill="${C.eye}"/><circle cx="84.8" cy="28.2" r="1.3" fill="#201e1d"/>`);
  // accessory
  if (pheno.accessory) p.push(ACC_SVG[pheno.accessory] || '');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs>${defs.join('')}</defs>${p.join('')}</svg>`;
}

const ACC_SVG = {
  tophat: '<g><rect x="66" y="16" width="28" height="5" rx="2.5" fill="#2a2620"/><rect x="71" y="1" width="18" height="16" rx="2.5" fill="#2a2620"/><rect x="71" y="12" width="18" height="4" fill="#c67139"/></g>',
  beret: '<g transform="rotate(-9 78 15)"><ellipse cx="78" cy="15" rx="13.5" ry="6" fill="#a8453c"/><line x1="78" y1="8" x2="78" y2="5" stroke="#a8453c" stroke-width="2.4" stroke-linecap="round"/></g>',
  cowboy: '<g><ellipse cx="79" cy="17" rx="17" ry="5.5" fill="#a97b4a"/><path d="M70,17 q9,-15 18,0 z" fill="#a97b4a"/><rect x="70" y="13" width="18" height="3.4" rx="1.7" fill="#6e4c28"/></g>',
  crown: '<g><path d="M70,10 l4.5,7 l5.5,-9 l5.5,9 l4.5,-7 l0,11 l-20,0 z" fill="#e8b64c" stroke="#c9992f" stroke-width="1.2"/><circle cx="75" cy="17" r="1.2" fill="#a8453c"/><circle cx="85" cy="17" r="1.2" fill="#7a8a5e"/></g>',
  monocle: '<g><circle cx="84.5" cy="28.5" r="6.2" fill="rgba(255,255,255,.22)" stroke="#b18f3e" stroke-width="1.8"/><path d="M88.5,33.5 q4,7 -1,12" stroke="#b18f3e" stroke-width="1.4" fill="none"/></g>',
  sunglasses: '<g><circle cx="84.5" cy="28.5" r="5.2" fill="#23212b"/><path d="M79.5,27 L70,24" stroke="#23212b" stroke-width="2"/><circle cx="83" cy="27" r="1.4" fill="#5a5866"/></g>',
  bowtie: '<g transform="translate(72,46) rotate(12)"><polygon points="0,0 -9,-5.5 -9,5.5" fill="#a8453c"/><polygon points="0,0 9,-5.5 9,5.5" fill="#a8453c"/><circle r="2.2" fill="#7c3129"/></g>',
  scarf: '<g><ellipse cx="70" cy="45" rx="9.5" ry="4.2" transform="rotate(18 70 45)" fill="#7a8a5e"/><rect x="63" y="46" width="6" height="13" rx="3" fill="#7a8a5e"/><line x1="64.5" y1="56" x2="64.5" y2="58.5" stroke="#56633f" stroke-width="1.4"/><line x1="67.5" y1="56" x2="67.5" y2="58.5" stroke="#56633f" stroke-width="1.4"/></g>',
  propeller: '<g><ellipse cx="66" cy="10" rx="9" ry="2.8" fill="#e8b64c"/><ellipse cx="94" cy="10" rx="9" ry="2.8" fill="#7a8a5e"/><line x1="80" y1="15" x2="80" y2="10" stroke="#4a4640" stroke-width="2"/><path d="M70,20 a10,9 0 0 1 20,0 z" fill="#c85b48"/><circle cx="80" cy="10" r="2" fill="#4a4640"/></g>',
};

export function spriteURI(pheno, opts) {
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(spriteSVG(pheno, opts));
}
