// Pigeon Park — procedural 3D pigeon, built from a phenotype.
// Every bird is ONE SkinnedMesh (one draw call): parts are merged into a single geometry with
// vertex colours, and each vertex is rigidly bound to one bone (head, wings, legs, tail, eyelids…)
// so the whole flock animates on a single shared shader program. Geometry is cached by phenotype,
// so clones share it.
//
// Local frame: bird faces +X, up is +Y, its right side is +Z. 1 unit = 1 m; a normal bird is ~0.5 m long.

import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { palette, PALETTES, ORE_SPECKS, W1, LEG } from './palette.js';
import { phenoKey } from './genetics.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const col = (hex) => new THREE.Color(hex);
const mix = (a, b, t) => a.clone().lerp(b, t);

// ---------- skeleton ----------
export const BONES = ['root', 'body', 'head', 'wingL', 'wingR', 'legL', 'legR', 'tail', 'eyeL', 'eyeR', 'spin'];
const BI = Object.fromEntries(BONES.map((b, i) => [b, i]));
const PARENT = { body: 'root', head: 'body', wingL: 'body', wingR: 'body', legL: 'root', legR: 'root', tail: 'body', eyeL: 'head', eyeR: 'head', spin: 'head' };
const H = V(.19, .5, 0);                        // head centre
const EYE = [V(H.x + .046, H.y + .022, -.061), V(H.x + .046, H.y + .022, .061)];
const PIVOT = {
  root: V(0, 0, 0), body: V(0, .14, 0), head: V(.11, .33, 0),
  wingL: V(.07, .37, -.1), wingR: V(.07, .37, .1),
  legL: V(.02, .16, -.056), legR: V(.02, .16, .056), tail: V(-.16, .25, 0),
  eyeL: EYE[0], eyeR: EYE[1], spin: V(H.x - .01, H.y + .14, 0),
};

// ---------- small maths helpers ----------
function hash3(x, y, z, s) {
  let h = Math.sin(x * 127.1 + y * 311.7 + z * 74.7 + s * 17.3) * 43758.5453;
  return h - Math.floor(h);
}
function vnoise(p, s) { // smooth-ish value noise
  const fx = Math.floor(p.x), fy = Math.floor(p.y), fz = Math.floor(p.z);
  const tx = p.x - fx, ty = p.y - fy, tz = p.z - fz;
  const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty), sz = tz * tz * (3 - 2 * tz);
  let r = 0;
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) for (let k = 0; k < 2; k++) {
    const w = (i ? sx : 1 - sx) * (j ? sy : 1 - sy) * (k ? sz : 1 - sz);
    r += w * hash3(fx + i, fy + j, fz + k, s);
  }
  return r;
}
function strHash(str) { let h = 0; for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0; return (h >>> 0) % 1000; }

function basis(n, hint) {
  const z = n.clone().normalize();
  const up = hint || (Math.abs(z.y) > .9 ? V(1, 0, 0) : V(0, 1, 0));
  const x = new THREE.Vector3().crossVectors(up, z).normalize();
  const y = new THREE.Vector3().crossVectors(z, x);
  return new THREE.Matrix4().makeBasis(x, y, z);
}
function trs(pos, rot = [0, 0, 0], scl = [1, 1, 1]) {
  const m = new THREE.Matrix4();
  m.compose(pos, new THREE.Quaternion().setFromEuler(new THREE.Euler(rot[0], rot[1], rot[2], 'XYZ')), new THREE.Vector3(...scl));
  return m;
}
// Matrix that maps a primitive's +Y axis onto `dir`, centred at `pos`.
function alongY(pos, dir, scl = [1, 1, 1]) {
  const q = new THREE.Quaternion().setFromUnitVectors(V(0, 1, 0), dir.clone().normalize());
  return new THREE.Matrix4().compose(pos, q, new THREE.Vector3(...scl));
}

// ---------- geometry builder ----------
class Build {
  constructor(seg) { this.geos = []; this.seg = seg; }
  // Deformed sphere. `deform(u)` maps a unit-sphere point to local shape space;
  // `paint(u)` returns a THREE.Color from the unit-sphere point.
  blob(part, { ws = 24, hs = 16, deform, paint, color, matrix }) {
    ws = Math.max(5, Math.round(ws * this.seg)); hs = Math.max(4, Math.round(hs * this.seg));
    let g = new THREE.SphereGeometry(1, ws, hs);
    g.deleteAttribute('uv'); g.deleteAttribute('normal');
    g = mergeVertices(g);
    const pos = g.attributes.position, n = pos.count;
    const cols = new Float32Array(n * 3), u = new THREE.Vector3();
    for (let i = 0; i < n; i++) {
      u.fromBufferAttribute(pos, i);
      const c = paint ? paint(u) : color;
      cols[i * 3] = c.r; cols[i * 3 + 1] = c.g; cols[i * 3 + 2] = c.b;
      const d = deform(u.clone());
      pos.setXYZ(i, d.x, d.y, d.z);
    }
    g.setAttribute('color', new THREE.BufferAttribute(cols, 3));
    g.computeVertexNormals();
    if (matrix) g.applyMatrix4(matrix);
    return this.push(g, part);
  }
  // Any indexed primitive, flat colour.
  prim(part, geo, color, matrix) {
    let g = geo;
    if (g.attributes.uv) g.deleteAttribute('uv');
    if (!g.index) g = mergeVertices(g);
    const n = g.attributes.position.count, cols = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { cols[i * 3] = color.r; cols[i * 3 + 1] = color.g; cols[i * 3 + 2] = color.b; }
    g.setAttribute('color', new THREE.BufferAttribute(cols, 3));
    if (matrix) g.applyMatrix4(matrix);
    return this.push(g, part);
  }
  ell(part, r, color, matrix, ws = 12, hs = 8) {
    return this.blob(part, { ws, hs, color, deform: (u) => u.set(u.x * r[0], u.y * r[1], u.z * r[2]), matrix });
  }
  push(g, part) {
    const n = g.attributes.position.count;
    const si = new Uint16Array(n * 4), sw = new Float32Array(n * 4);
    for (let i = 0; i < n; i++) { si[i * 4] = BI[part]; sw[i * 4] = 1; }
    g.setAttribute('skinIndex', new THREE.BufferAttribute(si, 4));
    g.setAttribute('skinWeight', new THREE.BufferAttribute(sw, 4));
    this.geos.push(g);
    return g;
  }
  done() {
    const g = mergeGeometries(this.geos, false);
    g.computeBoundingSphere();
    for (const x of this.geos) x.dispose();
    return g;
  }
}

// A deformed ellipsoid "shape" we can place decals on: surface point + normal for a unit direction.
function shape(deform, matrix) {
  const nm = new THREE.Matrix3().getNormalMatrix(matrix);
  return {
    at(dir) {
      const u = dir.clone().normalize();
      const p = deform(u.clone());
      const e = 1e-3;
      const t1 = new THREE.Vector3().crossVectors(u, Math.abs(u.y) > .9 ? V(1, 0, 0) : V(0, 1, 0)).normalize();
      const t2 = new THREE.Vector3().crossVectors(u, t1);
      const a = deform(u.clone().addScaledVector(t1, e).normalize()).sub(p);
      const b = deform(u.clone().addScaledVector(t2, e).normalize()).sub(p);
      const n = new THREE.Vector3().crossVectors(a, b).normalize();
      if (n.dot(u) < 0) n.negate();
      return { p: p.applyMatrix4(matrix), n: n.applyMatrix3(nm).normalize() };
    },
  };
}
// Place a decal primitive on a surface; decal geometry is authored flat in its XY plane, facing +Z.
function onSurface(sh, dir, lift, rotZ = 0, scl = 1, up) {
  const { p, n } = sh.at(dir);
  const m = basis(n, up);
  m.multiply(new THREE.Matrix4().makeRotationZ(rotZ));
  m.multiply(new THREE.Matrix4().makeScale(scl, scl, scl));
  m.setPosition(p.addScaledVector(n, lift));
  return m;
}

// ---------- the pigeon ----------
const FACET = { diamond: 1, emerald: 1, goldore: 1, diamondore: 1, emeraldore: 1, redstoneore: 1, ironore: 1, lapisore: 1, coalore: 1, gemore: 1 };
export function materialKind(pheno) {
  if (pheno.e.glow === 'glow') return pheno.colorKey === 'void' ? 'voidglow' : 'glow';
  if (pheno.colorKey === 'diamond' || pheno.colorKey === 'emerald') return 'gem';
  if (FACET[pheno.colorKey]) return 'facet';
  if (pheno.colorKey === 'gold') return 'metal';
  return 'clay';
}

export function sizeOf(pheno, jit = 1) {
  return (pheno.e.size === 'king' ? 1.42 : pheno.e.size === 'dinky' ? .68 : 1) * jit;
}

const geoCache = new Map();
// lod 0 = full detail, 1 = far (overview distance): ~1/4 the triangles, same silhouette/colours.
export function pigeonGeometry(pheno, lod = 0) {
  const key = phenoKey(pheno) + '|' + lod;
  let g = geoCache.get(key);
  if (!g) { g = buildGeometry(pheno, lod); geoCache.set(key, g); }
  return g;
}
export function geometryCacheSize() { return geoCache.size; }

function buildGeometry(pheno, lod = 0) {
  const e = pheno.e, P = palette(pheno), key = phenoKey(pheno), seed = strHash(key);
  const kind = materialKind(pheno);
  const facet = kind === 'facet' || kind === 'gem';
  const b = new Build((facet ? .42 : 1) * (lod ? .5 : 1));
  const C = {
    body: col(P.body), wing: col(P.wing), head: col(P.head), tail: col(P.tail), pat: col(P.pat),
    beak: col(P.beak), eye: col(P.eye), curl: col(P.curl), white: col(W1), leg: col(LEG),
  };
  const noFantasy = e.fantasy === 'none';
  const galaxy = e.sheen === 'galaxy';
  const GAL = [col('#2e2a5e'), col('#6a3f8f'), col('#35547e')];
  const galAt = (u) => { const t = (u.x + u.y + 2) / 4; return t < .5 ? mix(GAL[0], GAL[1], t * 2) : mix(GAL[1], GAL[2], (t - .5) * 2); };
  const splash = e.pied === 'splash' && noFantasy;
  const grizzle = e.grizzle === 'grizzle' && e.pied !== 'white' && noFantasy;
  const tint = (c, u, s) => { // shared surface treatments: splash, grizzle, galaxy
    let r = c;
    if (splash && vnoise(u.clone().multiplyScalar(2.3).addScalar(seed * .01), seed) > .6) r = C.white;
    if (grizzle && vnoise(u.clone().multiplyScalar(9), seed + s) > .62) r = mix(r, C.white, .75);
    if (galaxy) r = mix(r, galAt(u), .85);
    return r;
  };

  // ---- body ----
  const bodyDef = (u) => {
    const back = Math.max(0, -u.x), t = 1 - .42 * Math.pow(back, 1.4);
    const breast = u.x > 0 ? 1 + .1 * u.x * Math.max(0, 1 - Math.abs(u.y + .1)) : 1;
    return u.set(u.x * .235, u.y * .168 * t * breast, u.z * .158 * t * (u.y < -.3 ? 1.04 : 1));
  };
  const bodyM = trs(V(0, .275, 0), [0, 0, .24]);
  b.blob('body', {
    ws: 32, hs: 22, deform: bodyDef, matrix: bodyM,
    paint: (u) => {
      let c = C.body;
      if (u.y > .35) c = mix(c, C.head, (u.y - .35) * .35);   // darker back
      if (u.y < -.5) c = mix(c, C.white, (-.5 - u.y) * .12);  // pale belly
      return tint(c, u, 1);
    },
  });
  const bodyS = shape(bodyDef, bodyM);
  const sideDir = (x, y, s) => V(x, y, s * Math.sqrt(Math.max(.05, 1 - x * x - y * y)));

  // ---- neck + head (head bone) ----
  const sheen = { normal: ['#55a06b', '#8f5fae', .55], bronze: ['#d08a3e', '#7a4a20', .85], opal: ['#7ec8d8', '#d8a8e8', .85] }[e.sheen];
  const showSheen = noFantasy && e.pied !== 'white' && e.pied !== 'saddle' && !galaxy && sheen;
  const capHead = e.pied === 'capped' && noFantasy ? col(PALETTES[pheno.colorKey === 'white' ? 'blue' : pheno.colorKey].head) : null;
  b.blob('head', {
    ws: 18, hs: 14, matrix: trs(V(.135, .385, 0), [0, 0, -.38]),
    deform: (u) => u.set(u.x * .088, u.y * .135, u.z * .082),
    paint: (u) => {
      let c = capHead ? C.white : C.head;
      if (showSheen && u.y < .5 && u.y > -.85) {
        const t = (u.y + .85) / 1.35, g = mix(col(sheen[0]), col(sheen[1]), t);
        c = mix(c, g, sheen[2] * Math.sin(t * Math.PI));
      }
      return tint(c, u, 2);
    },
  });
  const headDef = (u) => u.set(u.x * .092 * (u.x > 0 ? 1.04 : 1), u.y * .084, u.z * .078);
  const headM = trs(H.clone());
  b.blob('head', { ws: 22, hs: 16, deform: headDef, matrix: headM, paint: (u) => tint(capHead || C.head, u, 3) });
  const headS = shape(headDef, headM);

  // beak + cere
  const bl = e.beak === 'short' ? .048 : .078;
  b.prim('head', new THREE.ConeGeometry(.019, bl, Math.max(6, Math.round(12 * b.seg))), C.beak,
    alongY(V(H.x + .085 + bl / 2 - .012, H.y - .012, 0), V(1, -.14, 0)));
  b.ell('head', [.022, .012, .019], col('#e9e2d4'), trs(V(H.x + .08, H.y + .006, 0), [0, 0, -.25]));

  // eyes (eye bones so they can blink / close)
  const ring = mix(C.head, col('#2a2622'), .35);
  EYE.forEach((E, i) => {
    const s = i ? 1 : -1, part = i ? 'eyeR' : 'eyeL';
    const out = V(.35, .05, s).normalize();
    b.prim(part, new THREE.TorusGeometry(.024, .0055, 6, 18), ring, new THREE.Matrix4().makeBasis(...basisVecs(out)).setPosition(E.clone().addScaledVector(out, -.002)));
    b.ell(part, [.021, .021, .011], C.eye, basis(out).setPosition(E));
    b.ell(part, [.0105, .0105, .006], col('#1d1b1a'), basis(out).setPosition(E.clone().addScaledVector(out, .008).add(V(.003, 0, 0))));
    b.ell(part, [.0038, .0038, .002], col('#ffffff'), basis(out).setPosition(E.clone().addScaledVector(out, .013).add(V(.006, .006, 0))), 6, 4);
  });

  // ---- wings ----
  const wingDef = (u) => {
    const back = Math.max(0, -u.x), t = 1 - .55 * Math.pow(back, 1.25);
    return u.set(u.x * .215, u.y * .1 * t, u.z * .042 * (1 - .3 * back));
  };
  for (const s of [-1, 1]) {
    const part = s > 0 ? 'wingR' : 'wingL';
    const wm = trs(V(-.055, .315, .122 * s), [.08 * s, -.12 * s, .2]);
    b.blob(part, {
      ws: 28, hs: 14, deform: wingDef, matrix: wm,
      paint: (u) => {
        let c = C.wing;
        if (u.x < -.42) c = mix(c, C.pat, .42 + (-.42 - u.x) * .5);     // dark flight feathers
        else if (u.y > .55) c = mix(c, C.body, .4);                       // shoulder
        return tint(c, u, 4 + s);
      },
    });
    const ws = shape(wingDef, wm), side = (x, y) => V(x, y, s * Math.sqrt(Math.max(.02, 1 - x * x - y * y)));
    if (P.showPat && !galaxy) {
      if (e.pattern === 'bar') {
        for (const bx of [-.02, -.26]) b.ell(part, [.055, .013, .006], C.pat, onSurface(ws, side(bx, -.05), .002, Math.PI / 2 + .3 * s, 1));
      } else if (e.pattern === 'check' || e.pattern === 'tcheck') {
        const dense = e.pattern === 'tcheck', rows = dense ? 4 : 3, cols = dense ? 6 : 5, r = dense ? .012 : .0105;
        for (let ri = 0; ri < rows; ri++) for (let ci = 0; ci < cols; ci++) {
          const x = .38 - ci * (dense ? .14 : .17) - (ri % 2) * .07, y = .45 - ri * (dense ? .27 : .34);
          if (x * x + y * y > .8) continue;
          b.ell(part, [r * 1.2, r, .004], C.pat, onSurface(ws, side(x, y), .002, 0, 1), 8, 5);
        }
      }
    }
    if (e.curl === 'curly') {
      for (let i = 0; i < 9; i++) b.prim(part, new THREE.TorusGeometry(.026, .006, 5, 12, Math.PI * 1.4), mix(C.curl, C.wing, .45),
        onSurface(ws, side(.5 - (i % 5) * .22, i < 5 ? .3 : -.25), .001, -.6 + i * .3, 1).multiply(new THREE.Matrix4().makeScale(1, 1, .35)));
    }
    if (galaxy) for (let i = 0; i < 4; i++) b.ell(part, [.004, .004, .003], col('#ffffff'), onSurface(ws, side(.3 - i * .2, (i % 2 ? .3 : -.2)), .002, 0, 1), 6, 4);
  }

  // ---- tail ----
  const tailBand = P.showPat || (e.spread === 'spread' && noFantasy && e.pied !== 'white');
  const tailCol = e.mane === 'cascade' && e.tail !== 'fantail' ? col('#f4f1e7') : C.tail;
  if (e.tail === 'fantail') {
    const piv = V(-.14, .3, 0), n = 17;
    for (let row = 0; row < 2; row++) for (let i = 0; i < n - row * 2; i++) {
      const nn = n - row * 2, a = (-86 + i * 172 / (nn - 1)) * Math.PI / 180;
      const len = row ? .15 : .205, dir = V(-.22, Math.cos(a), Math.sin(a)).normalize();
      const c = row ? C.wing : (i % 2 ? C.wing : tailCol);
      b.blob('tail', {
        ws: 10, hs: 6, matrix: alongY(piv.clone().addScaledVector(dir, len * .9).add(V(row * .012, 0, 0)), dir),
        deform: (u) => u.set(u.x * .05 * (1 - .3 * Math.max(0, -u.y)), u.y * len, u.z * .014),
        paint: (u) => tint(tailBand && u.y > .55 && !row ? mix(c, C.pat, .6) : c, u, 7),
      });
    }
  } else {
    b.blob('tail', {
      ws: 20, hs: 10, matrix: trs(V(-.32, .228, 0), [0, 0, .2]),
      deform: (u) => u.set(u.x * .19, u.y * (.044 - .018 * Math.max(0, -u.x)) + .006 * (1 - u.z * u.z), u.z * (.07 + .06 * Math.max(0, -u.x))),
      paint: (u) => tint(tailBand && u.x < -.5 && u.x > -.8 ? mix(tailCol, C.pat, .75) : tailCol, u, 7),
    });
  }

  // ---- legs & feet ----
  for (const s of [-1, 1]) {
    const part = s > 0 ? 'legR' : 'legL', z = .056 * s;
    b.prim(part, new THREE.CylinderGeometry(.011, .013, .15, 8), C.leg, trs(V(.02, .09, z)));
    for (const a of [-.45, 0, .45]) b.prim(part, new THREE.CapsuleGeometry(.0065, .04, 2, 6), C.leg, trs(V(.045 + Math.cos(a) * .012, .01, z + Math.sin(a) * .018), [0, -a, -Math.PI / 2]));
    b.prim(part, new THREE.CapsuleGeometry(.006, .025, 2, 6), C.leg, trs(V(.0, .01, z), [0, 0, Math.PI / 2]));
    if (e.muffs === 'muffed') {
      [[.03, .035, 0, .042], [.06, .02, .012, .034], [.0, .025, -.01, .03], [.05, .05, -.006, .03]].forEach(([x, y, dz, r], i) =>
        b.ell(part, [r * 1.2, r * .9, r], i % 2 ? C.wing : C.body, trs(V(x, y, z + dz * s)), 10, 7));
    } else if (e.muffs === 'grouse') {
      b.ell(part, [.03, .038, .028], C.body, trs(V(.025, .09, z)), 10, 7);
    }
  }

  // ---- breast / neck ornaments ----
  if (e.crop === 'globe') {
    b.blob('body', {
      ws: 24, hs: 18, matrix: trs(V(.165, .4, 0)),
      deform: (u) => u.set(u.x * .175, u.y * .18, u.z * .165),
      paint: (u) => tint(u.y > .45 && u.x > .1 ? mix(C.body, C.white, .22) : C.body, u, 8),
    });
  }
  if (e.frill === 'frill') {
    for (let i = 0; i < 6; i++) {
      const y = .3 + i * .024, x = e.crop === 'globe' ? .29 - i * .01 : .245 - i * .012;
      b.ell('body', [.012, .01, .026], col('#fdfbf5'), trs(V(x, y, (i % 2 ? .012 : -.012)), [0, 0, .5]), 8, 5);
    }
  }
  if (e.curl === 'curly') {
    for (const s of [-1, 1]) for (let i = 0; i < 4; i++) b.prim('body', new THREE.TorusGeometry(.026, .006, 5, 12, Math.PI * 1.4), mix(C.curl, C.body, .45),
      onSurface(bodyS, sideDir(.3 - i * .25, -.45 + (i % 2) * .15, s), .001, .4 + i, 1).multiply(new THREE.Matrix4().makeScale(1, 1, .35)));
  }
  if (e.mane === 'cascade') {
    // Nicobar hackles: a metallic rainbow cape of long pointed feathers over shoulders and back
    const IR = ['#3fae7e', '#4f86c8', '#c98a4a', '#3fbaa0', '#6b6bc4', '#b88040', '#4fb07a', '#6fd0a0', '#7fa9e6', '#e0a060', '#5fd8be', '#8d8de0', '#d8a050'];
    for (let row = 0; row < 2; row++) for (let i = 0; i < 13; i++) {
      const zf = (i - 6) / 6, len = row ? .13 : .18;
      // root on the nape, lying back over the shoulders and draping down the flanks
      const root = V(.1 - row * .04, .5 - row * .02 - Math.abs(zf) * .03, zf * .06);
      const dir = V(-.85, -.2 - Math.abs(zf) * .55, zf * .9).normalize();
      b.blob('body', {
        ws: 8, hs: 6, matrix: alongY(root.clone().addScaledVector(dir, len * .9), dir),
        deform: (u) => u.set(u.x * .026 * (1 - .6 * Math.max(0, u.y)), u.y * len, u.z * .012), color: col(IR[(i + row * 5) % IR.length]),
      });
    }
  }
  if (e.mane === 'hood') {
    const c0 = V(H.x - .04, H.y - .015, 0);
    for (let ring = 0; ring < 2; ring++) {
      const n = ring ? 9 : 12, r = ring ? .075 : .092;
      for (let i = 0; i < n; i++) {
        const a = (-155 + i * 310 / (n - 1)) * Math.PI / 180, dir = V(-.15, Math.cos(a), Math.sin(a)).normalize();
        b.blob('head', {
          ws: 10, hs: 6, matrix: alongY(c0.clone().addScaledVector(dir, r), dir),
          deform: (u) => u.set(u.x * .014, u.y * (ring ? .055 : .07), u.z * (ring ? .038 : .048)),
          color: ring ? C.wing : C.body,
        });
      }
    }
  }

  // ---- crests ----
  if (e.crest === 'peak') {
    b.prim('head', new THREE.ConeGeometry(.024, .085, 8), C.head, alongY(V(H.x - .07, H.y + .06, 0), V(-.75, 1, 0)));
  } else if (e.crest === 'shell') {
    const c0 = V(H.x - .03, H.y + .005, 0);
    for (let ring = 0; ring < 2; ring++) for (let i = 0; i < 13; i++) {
      const a = (-120 + i * 20) * Math.PI / 180, dir = V(-.75 - ring * .3, Math.cos(a), Math.sin(a)).normalize();
      b.blob('head', {
        ws: 10, hs: 6, matrix: alongY(c0.clone().addScaledVector(dir, .085 - ring * .01), dir),
        deform: (u) => u.set(u.x * .014, u.y * (.05 - ring * .012), u.z * .036),
        paint: (u) => u.y > .2 ? C.wing : mix(C.wing, C.head, .5),
      });
    }
  } else if (e.crest === 'rose') {
    const c0 = V(H.x + .035, H.y + .072, 0);
    for (let i = 0; i < 16; i++) {
      const y = 1 - (i + .5) / 16 * 1.6, r = Math.sqrt(Math.max(0, 1 - y * y)), th = i * 2.4;
      const dir = V(Math.cos(th) * r, Math.abs(y) * .6 + .5, Math.sin(th) * r).normalize();
      b.ell('head', [.026, .048, .012], C.wing, alongY(c0.clone().addScaledVector(dir, .036), dir), 8, 6);
    }
    b.ell('head', [.03, .028, .03], C.head, trs(c0), 10, 7);
  } else if (e.crest === 'lace') {
    const c0 = V(H.x - .015, H.y + .06, 0);
    for (let i = 0; i < 11; i++) {
      const a = (-68 + i * 13.6) * Math.PI / 180, dir = V(-.22, Math.cos(a), Math.sin(a)).normalize();
      b.prim('head', new THREE.CylinderGeometry(.0035, .0045, .14, 5), C.head, alongY(c0.clone().addScaledVector(dir, .07), dir));
      b.ell('head', [.024, .016, .005], col('#f6f3ea'), alongY(c0.clone().addScaledVector(dir, .145), dir, [1, 1, 1]).multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2)), 10, 6);
    }
  }

  // ---- fantasy surface marks ----
  const FP = [[-.15, .35], [.28, -.15], [.45, .4], [-.05, -.4], [.12, .1], [-.4, .05]];
  const bleedingHeart = e.fpattern === 'hearts' && e.pied === 'white' && noFantasy;
  const heart = (sh, dir, scale, c, part = 'body') => {
    const m = onSurface(sh, dir, .006, Math.PI, scale);
    b.ell(part, [.009, .009, .004], c, m.clone().multiply(trs(V(-.0075, .004, 0))), 8, 5);
    b.ell(part, [.009, .009, .004], c, m.clone().multiply(trs(V(.0075, .004, 0))), 8, 5);
    b.prim(part, new THREE.ConeGeometry(.0145, .018, 3), c, m.clone().multiply(trs(V(0, -.007, 0), [0, 0, Math.PI], [1, 1, .3])));
  };
  const star = (sh, dir, scale, c, part = 'body') => {
    const m = onSurface(sh, dir, .005, 0, scale);
    b.ell(part, [.004, .02, .003], c, m.clone(), 6, 4);
    b.ell(part, [.02, .004, .003], c, m.clone(), 6, 4);
  };
  if (e.fpattern !== 'none' && !bleedingHeart) {
    const mc = col('#ffffff');
    for (const s of [-1, 1]) for (const [x, y] of FP) {
      const d = sideDir(x, y, s);
      if (e.fpattern === 'dots') b.ell('body', [.016, .016, .004], mc, onSurface(bodyS, d, .003, 0, 1), 10, 6);
      else if (e.fpattern === 'hearts') heart(bodyS, d, 1.1, mc);
      else star(bodyS, d, 1, mc);
    }
  }
  if (bleedingHeart) heart(bodyS, V(.95, -.05, 0), 2.4, col('#c0392b'));
  if (ORE_SPECKS[pheno.colorKey]) {
    const cs = ORE_SPECKS[pheno.colorKey].map(col); let k = 0;
    for (const s of [-1, 1]) for (const [x, y] of FP) {
      b.prim('body', new THREE.BoxGeometry(.034, .034, .03), cs[k++ % cs.length], onSurface(bodyS, sideDir(x, y, s), -.004, .3 * k, 1));
    }
    for (const s of [-1, 1]) b.prim('head', new THREE.BoxGeometry(.024, .024, .02), cs[(k++) % cs.length], onSurface(headS, V(-.2, .5, s * .8), -.002, .4, 1));
  }
  if (galaxy || pheno.colorKey === 'void') {
    const sc = pheno.colorKey === 'void' ? col('#cfc8f2') : col('#ffffff');
    for (let i = 0; i < 16; i++) {
      const s = i % 2 ? 1 : -1, x = (hash3(i, 1, 2, seed) - .5) * 1.6, y = (hash3(i, 3, 4, seed) - .5) * 1.4;
      b.ell('body', [.005, .005, .003], sc, onSurface(bodyS, sideDir(x, y, s), .002, 0, 1), 6, 4);
    }
    if (galaxy) for (const [c, x, y] of [['#b9a8ff', .1, .2], ['#8fd0ff', -.3, -.1]]) for (const s of [-1, 1]) star(bodyS, sideDir(x, y, s), .8, col(c));
    else star(bodyS, sideDir(.05, .15, 1), .9, sc);
  }

  // ---- accessories ----
  if (pheno.accessory) accessory(b, pheno.accessory, C);

  return { geometry: b.done(), kind };
}

function basisVecs(n) {
  const z = n.clone().normalize();
  const x = new THREE.Vector3().crossVectors(V(0, 1, 0), z).normalize();
  const y = new THREE.Vector3().crossVectors(z, x);
  return [x, y, z];
}

function accessory(b, acc, C) {
  const top = V(H.x - .005, H.y + .075, 0);
  const dark = col('#2a2620'), rust = col('#a8453c'), olive = col('#7a8a5e'), goldc = col('#e8b64c');
  switch (acc) {
    case 'tophat': {
      const m = trs(top, [0, 0, .14]);
      b.prim('head', new THREE.CylinderGeometry(.088, .088, .012, 20), dark, m.clone().multiply(trs(V(0, 0, 0))));
      b.prim('head', new THREE.CylinderGeometry(.056, .06, .11, 20), dark, m.clone().multiply(trs(V(0, .06, 0))));
      b.prim('head', new THREE.CylinderGeometry(.0615, .0615, .024, 20), col('#c67139'), m.clone().multiply(trs(V(0, .022, 0))));
      break;
    }
    case 'beret': {
      b.ell('head', [.095, .032, .095], rust, trs(top.clone().add(V(0, -.005, 0)), [.25, 0, .12]), 16, 10);
      b.prim('head', new THREE.CylinderGeometry(.005, .007, .025, 6), rust, trs(top.clone().add(V(0, .035, .008)), [.25, 0, .12]));
      break;
    }
    case 'cowboy': {
      const brown = col('#a97b4a');
      b.blob('head', { ws: 22, hs: 8, color: brown, matrix: trs(top.clone().add(V(0, -.005, 0)), [0, 0, .1]),
        deform: (u) => u.set(u.x * .15, u.y * .012 + (u.z * u.z) * .03, u.z * .13) });
      b.ell('head', [.068, .06, .058], brown, trs(top.clone().add(V(0, .035, 0)), [0, 0, .1]), 16, 10);
      b.prim('head', new THREE.CylinderGeometry(.064, .066, .016, 18), col('#6e4c28'), trs(top.clone().add(V(0, .012, 0)), [0, 0, .1]));
      break;
    }
    case 'crown': {
      const m = trs(top.clone().add(V(0, .0, 0)), [0, 0, .08], [1.35, 1.35, 1.35]);
      b.prim('head', new THREE.CylinderGeometry(.052, .048, .045, 20, 1, true), goldc, m.clone().multiply(trs(V(0, .022, 0))));
      b.prim('head', new THREE.CylinderGeometry(.047, .047, .01, 20), col('#8d3b32'), m.clone().multiply(trs(V(0, .012, 0))));
      for (let i = 0; i < 6; i++) {
        const a = i / 6 * Math.PI * 2;
        b.prim('head', new THREE.ConeGeometry(.015, .04, 4), goldc, m.clone().multiply(trs(V(Math.cos(a) * .05, .062, Math.sin(a) * .05))));
        b.ell('head', [.005, .005, .005], goldc, m.clone().multiply(trs(V(Math.cos(a) * .05, .085, Math.sin(a) * .05))), 6, 4);
        b.ell('head', [.008, .008, .006], i % 2 ? rust : col('#4f7fc0'), m.clone().multiply(trs(V(Math.cos(a) * .053, .024, Math.sin(a) * .053))), 6, 4);
      }
      break;
    }
    case 'monocle': {
      const E = EYE[1], out = V(.35, .05, 1).normalize();
      b.prim('eyeR', new THREE.TorusGeometry(.032, .005, 6, 20), col('#b18f3e'), new THREE.Matrix4().makeBasis(...basisVecs(out)).setPosition(E.clone().addScaledVector(out, .012)));
      b.prim('head', new THREE.CylinderGeometry(.0018, .0018, .12, 4), col('#b18f3e'), trs(E.clone().add(V(-.01, -.07, .02)), [0, 0, .25]));
      break;
    }
    case 'sunglasses': {
      const lens = col('#23212b');
      EYE.forEach((E, i) => {
        const out = V(.35, .05, i ? 1 : -1).normalize();
        b.prim(i ? 'eyeR' : 'eyeL', new THREE.CylinderGeometry(.03, .03, .006, 16), lens, alongY(E.clone().addScaledVector(out, .012), out));
      });
      b.prim('head', new THREE.CylinderGeometry(.004, .004, .1, 6), lens, trs(V(H.x + .07, H.y + .03, 0), [Math.PI / 2, 0, 0]));
      break;
    }
    case 'bowtie': {
      const c0 = V(.215, .34, 0);
      for (const s of [-1, 1]) b.prim('body', new THREE.ConeGeometry(.03, .05, 4), rust, alongY(c0.clone().add(V(0, 0, .024 * s)), V(0, 0, -s), [1, 1, .5]));
      b.ell('body', [.012, .012, .012], col('#7c3129'), trs(c0), 8, 6);
      break;
    }
    case 'scarf': {
      b.prim('body', new THREE.TorusGeometry(.085, .032, 10, 22), olive, trs(V(.125, .385, 0), [Math.PI / 2, -.5, 0]));
      b.blob('body', { ws: 10, hs: 8, color: olive, matrix: trs(V(.16, .3, .085), [.3, 0, -.25]), deform: (u) => u.set(u.x * .03, u.y * .085, u.z * .014) });
      for (const dz of [-.012, .012]) b.prim('body', new THREE.CylinderGeometry(.003, .003, .03, 4), col('#56633f'), trs(V(.14, .21, .09 + dz), [.3, 0, -.25]));
      break;
    }
    case 'propeller': {
      b.blob('head', { ws: 16, hs: 10, color: col('#c85b48'), matrix: trs(top.clone().add(V(0, -.012, 0))),
        deform: (u) => u.set(u.x * .082, Math.max(0, u.y) * .06, u.z * .08) });
      b.prim('head', new THREE.CylinderGeometry(.004, .004, .07, 6), col('#4a4640'), trs(top.clone().add(V(0, .06, 0))));
      const sp = PIVOT.spin;
      b.ell('spin', [.07, .006, .018], goldc, trs(sp.clone().add(V(.06, 0, 0))), 10, 6);
      b.ell('spin', [.07, .006, .018], olive, trs(sp.clone().add(V(-.06, 0, 0))), 10, 6);
      b.ell('spin', [.01, .01, .01], col('#4a4640'), trs(sp.clone()), 6, 4);
      break;
    }
  }
}

// ---------- materials (shared; created once so program count stays constant) ----------
export function makeMaterials() {
  const base = { vertexColors: true, roughness: .78, metalness: 0 };
  const clay = new THREE.MeshStandardMaterial(base);
  const metal = new THREE.MeshStandardMaterial({ ...base, roughness: .3, metalness: .85 });
  const glow = new THREE.MeshStandardMaterial({ ...base, emissive: new THREE.Color('#dff08a'), emissiveIntensity: .12 });
  const voidglow = new THREE.MeshStandardMaterial({ ...base, emissive: new THREE.Color('#7a5cff'), emissiveIntensity: .12 });
  const facet = new THREE.MeshStandardMaterial({ ...base, flatShading: true, roughness: .85 });
  const gem = new THREE.MeshStandardMaterial({ ...base, flatShading: true, roughness: .12, metalness: .35 });
  return { clay, metal, glow, voidglow, facet, gem };
}

// ---------- instance ----------
export class PigeonRig {
  constructor(pheno, materials) {
    const { geometry, kind } = pigeonGeometry(pheno);
    this.kind = kind;
    const bones = {}, list = [];
    for (const name of BONES) {
      const bone = new THREE.Bone(); bone.name = name;
      const par = PARENT[name];
      bone.position.copy(PIVOT[name]).sub(par ? PIVOT[par] : V(0, 0, 0));
      bones[name] = bone; list.push(bone);
      if (par) bones[par].add(bone);
    }
    this.rest = Object.fromEntries(BONES.map(n => [n, bones[n].position.clone()]));
    this.pheno = pheno; this.lod = 0;
    const mesh = new THREE.SkinnedMesh(geometry, materials[kind]);
    mesh.add(bones.root);
    mesh.updateMatrixWorld(true);
    mesh.bind(new THREE.Skeleton(list));
    mesh.castShadow = true; mesh.receiveShadow = true; mesh.frustumCulled = false;
    this.mesh = mesh; this.bones = bones;
    this.group = new THREE.Group(); this.group.add(mesh);
  }
  setLod(lod) { if (lod !== this.lod) { this.lod = lod; this.mesh.geometry = pigeonGeometry(this.pheno, lod).geometry; } }
  dispose() { this.mesh.skeleton.dispose(); /* geometry is cached/shared */ }
}
