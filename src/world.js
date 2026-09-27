// Pigeon Park — the park diorama: plaza, fountain, lawn, trees, props, sky and the day/night rig.
// Look: matte clay. Static props are merged into one vertex-coloured mesh; repeated small things
// (paving stones, grass tufts, flowers, droplets) are instanced. Light count never changes at runtime.

import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { PARK, FOUNTAIN } from './sim.js';
import { statueGeometry } from './pigeon3d.js';
import { computePheno, WILD, LOCI } from './genetics.js';

export const wildPheno = () => computePheno(Object.fromEntries(LOCI.map(l => [l.id, [WILD[l.id], WILD[l.id]]])), null);

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const col = (h) => new THREE.Color(h);

// deterministic scatter RNG (independent of the sim's RNG)
function mulberry(seed) { return () => { seed = (seed + 0x6d2b79f5) >>> 0; let t = seed; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function vnoise2(x, y, s = 0) {
  const h = (i, j) => { const v = Math.sin(i * 127.1 + j * 311.7 + s * 91.3) * 43758.5453; return v - Math.floor(v); };
  const fx = Math.floor(x), fy = Math.floor(y), tx = x - fx, ty = y - fy;
  const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty);
  return (h(fx, fy) * (1 - sx) + h(fx + 1, fy) * sx) * (1 - sy) + (h(fx, fy + 1) * (1 - sx) + h(fx + 1, fy + 1) * sx) * sy;
}

// Collects vertex-coloured geometry and merges it into one static mesh.
export class Static {
  constructor() { this.geos = []; }
  add(geo, color, matrix, ao = 0) {
    let g = geo;
    if (g.attributes.uv) g.deleteAttribute('uv');
    if (g.attributes.uv1) g.deleteAttribute('uv1');
    g = g.index ? g.toNonIndexed() : g;
    if (matrix) g.applyMatrix4(matrix);
    g.computeBoundingBox();
    const pos = g.attributes.position, n = pos.count, cols = new Float32Array(n * 3);
    const c = typeof color === 'function' ? null : color;
    const { min, max } = g.boundingBox, hgt = Math.max(1e-3, max.y - min.y);
    for (let i = 0; i < n; i++) {
      const cc = c || color(pos.getX(i), pos.getY(i), pos.getZ(i));
      // cheap baked AO: darken toward the bottom of each piece
      const k = ao ? 1 - ao * (1 - Math.min(1, (pos.getY(i) - min.y) / hgt)) : 1;
      cols[i * 3] = cc.r * k; cols[i * 3 + 1] = cc.g * k; cols[i * 3 + 2] = cc.b * k;
    }
    g.setAttribute('color', new THREE.BufferAttribute(cols, 3));
    this.geos.push(g);
  }
  mesh(material) {
    const g = mergeGeometries(this.geos, false);
    for (const x of this.geos) x.dispose();
    g.computeBoundingSphere();
    const m = new THREE.Mesh(g, material);
    m.castShadow = true; m.receiveShadow = true;
    return m;
  }
}
export const trs = (p, r = [0, 0, 0], s = [1, 1, 1]) => new THREE.Matrix4().compose(p, new THREE.Quaternion().setFromEuler(new THREE.Euler(...r)), new THREE.Vector3(...s));

export function lumpy(radius, detail, amp, seed) {
  let g = new THREE.IcosahedronGeometry(radius, detail);
  g.deleteAttribute('uv'); g.deleteAttribute('normal');
  g = mergeVertices(g);
  const p = g.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const n = vnoise2(v.x * 2.2 + seed, v.z * 2.2 + v.y * 1.7, seed) - .5;
    v.multiplyScalar(1 + n * amp);
    if (v.y < -radius * .35) v.y = -radius * .35 + (v.y + radius * .35) * .4; // flatter bottoms
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

// ---------- time-of-day keyframes ----------
// hour, sun elevation°, sun colour, sun intensity, hemi sky, hemi ground, hemi intensity, sky top, horizon, env
const KEYS = [
  [0, 40, '#8ea8ee', .8, '#27345f', '#0f1118', .45, '#0d1330', '#27305a', .06],
  [4.8, 32, '#8ea8ee', .75, '#2a3764', '#10121a', .45, '#141b3a', '#323a66', .06],
  [5.8, 3, '#ffb08a', .9, '#8f94b8', '#5a4c44', .7, '#6878aa', '#f2b597', .25],
  [7.5, 16, '#ffdcb2', 2.4, '#b4c8e4', '#7b6a55', .9, '#7fa9d6', '#efdcc4', .45],
  [11, 42, '#fff1dc', 2.55, '#c4d8ee', '#86745c', .82, '#6fa3d8', '#dfe6df', .42],
  [15, 36, '#ffe6c2', 2.8, '#c0d2e6', '#8a7458', .88, '#76a4d4', '#ecdfc6', .45],
  [17, 16, '#ffcf96', 2.9, '#b8bfd6', '#8a6a4c', .85, '#7c98c6', '#f4cf9e', .45],
  [18.4, 3, '#ff9564', 1.4, '#8e8cb0', '#5e4a3c', .7, '#5d6a9c', '#f1a07a', .3],
  [19.6, 32, '#8ea8ee', .6, '#34406e', '#15151c', .5, '#1d2550', '#454c80', .1],
  [24, 40, '#8ea8ee', .8, '#27345f', '#0f1118', .45, '#0d1330', '#27305a', .06],
];
function sampleKeys(h) {
  h = ((h % 24) + 24) % 24;
  let i = 1; while (i < KEYS.length - 1 && KEYS[i][0] < h) i++;
  const a = KEYS[i - 1], b = KEYS[i], t = (h - a[0]) / Math.max(1e-6, b[0] - a[0]);
  const L = (x, y) => x + (y - x) * t, C = (x, y) => col(x).lerp(col(y), t);
  return { el: L(a[1], b[1]), sun: C(a[2], b[2]), sunI: L(a[3], b[3]), hs: C(a[4], b[4]), hg: C(a[5], b[5]), hI: L(a[6], b[6]), top: C(a[7], b[7]), hor: C(a[8], b[8]), env: L(a[9], b[9]) };
}
function isMoon(h) { h = ((h % 24) + 24) % 24; return h >= 19.3 || h < 5.2; }

export class World {
  constructor(renderer, scene, quality) {
    this.renderer = renderer; this.scene = scene; this.q = quality;
    this.t = 0;
    this.propMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .86, metalness: 0 });
    this.buildLights();
    this.buildSky();
    this.buildGround();
    this.buildPlaza();
    this.buildFountain();
    this.buildProps();
    this.buildLawnScatter();
    this.buildSkyline();
    scene.add(this.static.mesh(this.propMat));
    const pm = new THREE.PMREMGenerator(renderer);
    scene.environment = pm.fromScene(new RoomEnvironment(), .04).texture;
    pm.dispose();
    this.setHour(16.5, 0);
  }

  buildLights() {
    const s = this.scene;
    this.hemi = new THREE.HemisphereLight('#c0d2e6', '#8a7458', 1);
    s.add(this.hemi);
    const sun = this.sun = new THREE.DirectionalLight('#ffe6c2', 3);
    sun.castShadow = this.q.shadows;
    const sz = this.q.shadowMap;
    sun.shadow.mapSize.set(sz, sz);
    const c = sun.shadow.camera; c.left = -10.5; c.right = 10.5; c.top = 8; c.bottom = -8; c.near = 1; c.far = 70;
    sun.shadow.bias = -.0004; sun.shadow.normalBias = .03;
    sun.shadow.radius = 3;
    s.add(sun); s.add(sun.target);
    // lamp lights: fixed count, intensity 0 by day (never toggled → no shader recompiles)
    this.lampLights = [];
    this.lampSpots = [V(-PARK.w / 2 - .9, 0, PARK.d / 2 + .9), V(PARK.w / 2 + .9, 0, PARK.d / 2 + .9), V(-PARK.w / 2 - .9, 0, -PARK.d / 2 - .9), V(PARK.w / 2 + .9, 0, -PARK.d / 2 - .9)];
    for (let i = 0; i < this.q.lampLights; i++) {
      const L = new THREE.PointLight('#ffc27a', 0, 6.5, 2);
      L.position.copy(this.lampSpots[i]).setY(2.35);
      s.add(L); this.lampLights.push(L);
    }
  }

  buildSky() {
    const u = this.skyU = { top: { value: col('#76a4d4') }, hor: { value: col('#ecdfc6') }, bot: { value: col('#c9c0a8') }, sunDir: { value: V(0, 1, 0) }, sunCol: { value: col('#ffffff') }, sunGlow: { value: 1 } };
    const m = new THREE.ShaderMaterial({
      uniforms: u, side: THREE.BackSide, depthWrite: false, fog: false,
      vertexShader: 'varying vec3 vDir; void main(){ vDir = normalize(position); vec4 p = modelViewMatrix*vec4(position,1.); gl_Position = projectionMatrix*p; gl_Position.z = gl_Position.w; }',
      fragmentShader: `uniform vec3 top, hor, bot, sunDir, sunCol; uniform float sunGlow; varying vec3 vDir;
        void main(){ float h = vDir.y; vec3 c = h > 0. ? mix(hor, top, pow(clamp(h*1.6,0.,1.), .7)) : mix(hor, bot, clamp(-h*5.,0.,1.));
          float s = max(dot(normalize(vDir), sunDir), 0.); c += sunCol * (pow(s, 12.) * .35 + pow(s, 400.) * 1.2) * sunGlow;
          gl_FragColor = vec4(c, 1.); }`,
    });
    this.sky = new THREE.Mesh(new THREE.SphereGeometry(150, 32, 16), m);
    this.sky.renderOrder = -10; this.sky.frustumCulled = false;
    this.scene.add(this.sky);
    // stars
    const r = mulberry(7), n = 500, pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const th = r() * Math.PI * 2, y = .08 + r() * .92, rr = Math.sqrt(1 - y * y);
      pos.set([Math.cos(th) * rr * 140, y * 140, Math.sin(th) * rr * 140], i * 3);
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.starMat = new THREE.PointsMaterial({ color: '#fff4dc', size: 1.3, sizeAttenuation: false, transparent: true, opacity: 0, depthWrite: false, fog: false });
    this.stars = new THREE.Points(g, this.starMat); this.stars.frustumCulled = false;
    this.scene.add(this.stars);
    this.scene.fog = new THREE.Fog('#ecdfc6', 38, 120);
  }

  buildGround() {
    const g = new THREE.PlaneGeometry(160, 160, 72, 72); // the far hills don't need more; the plaza sits on top
    g.rotateX(-Math.PI / 2);
    const p = g.attributes.position, cols = new Float32Array(p.count * 3);
    const a = col('#93a86b'), b = col('#b4c285'), d = col('#76905a'), far = col('#a3ac80');
    const c = new THREE.Color();
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), z = p.getZ(i);
      const n1 = vnoise2(x * .09, z * .09, 1), n2 = vnoise2(x * .5, z * .5, 2);
      c.copy(a).lerp(b, n1 * .8).lerp(d, Math.max(0, n2 - .55) * 1.2);
      const r = Math.hypot(x, z * 1.3);
      c.lerp(far, Math.min(1, Math.max(0, (r - 25) / 40)));
      // gentle rolling hills far away
      if (r > 30) p.setY(i, Math.pow((r - 30) / 50, 2) * 6 * (.6 + vnoise2(x * .05, z * .05, 3)));
      else p.setY(i, -.035);
      cols.set([c.r, c.g, c.b], i * 3);
    }
    g.setAttribute('color', new THREE.BufferAttribute(cols, 3));
    g.computeVertexNormals();
    const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .95 }));
    m.receiveShadow = true;
    this.scene.add(m);
  }

  buildPlaza() {
    const W = PARK.w + 1.4, D = PARK.d + 1.4, sz = .46, gap = .035;
    const geo = new THREE.BoxGeometry(sz - gap, .06, sz - gap);
    // bevel-ish: pull top corners in a bit for a softer read
    const pp = geo.attributes.position;
    for (let i = 0; i < pp.count; i++) if (pp.getY(i) > 0) { pp.setX(i, pp.getX(i) * .93); pp.setZ(i, pp.getZ(i) * .93); }
    geo.computeVertexNormals();
    const spots = [], r = mulberry(11);
    for (let row = 0, z = -D / 2 + sz / 2; z < D / 2; z += sz, row++) {
      for (let x = -W / 2 + sz / 2 + (row % 2) * sz / 2; x < W / 2; x += sz) {
        if (Math.hypot(x - FOUNTAIN.x, z - FOUNTAIN.z) < FOUNTAIN.r + .05) continue;
        const cx = Math.max(-W / 2 + .2, Math.min(W / 2 - .2, x));
        spots.push([cx, z, r()]);
      }
    }
    const mat = new THREE.MeshStandardMaterial({ roughness: .9 });
    const inst = new THREE.InstancedMesh(geo, mat, spots.length);
    const m = new THREE.Matrix4(), c = new THREE.Color();
    const tones = ['#cfc3ad', '#c5b79f', '#d6ccb9', '#bcae96', '#cbbda4'].map(col);
    spots.forEach(([x, z, k], i) => {
      m.compose(V(x, -.03 + k * .006, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, (k - .5) * .06, 0)), V(1, 1, 1));
      inst.setMatrixAt(i, m);
      const n = vnoise2(x * .35, z * .35, 5);
      c.copy(tones[Math.floor(k * tones.length)]).lerp(col('#b3a58b'), n * .45);
      inst.setColorAt(i, c);
    });
    inst.receiveShadow = true; inst.castShadow = false;
    this.scene.add(inst);
    this.plaza = inst;
    // curb
    this.static = new Static();
    const curbC = col('#bfb29c');
    const curb = (x, z, w, d) => this.static.add(new THREE.BoxGeometry(w, .12, d), curbC, trs(V(x, .0, z)), .25);
    curb(0, -D / 2 - .09, W + .36, .18); curb(0, D / 2 + .09, W + .36, .18);
    curb(-W / 2 - .09, 0, .18, D); curb(W / 2 + .09, 0, .18, D);
  }

  buildFountain() {
    const S = this.static, F = FOUNTAIN, stone = col('#d9d0c0'), stone2 = col('#c9bfad');
    const lathe = (pts, seg = 40) => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), seg);
    S.add(lathe([[0, 0], [F.r + .08, 0], [F.r + .1, .08], [F.r, .44], [F.r + .1, .5], [F.r + .06, .56], [F.r - .16, .56], [F.r - .18, .12], [0, .12]]), (x, y) => y > .5 ? stone : stone2, trs(V(F.x, 0, F.z)), .3);
    S.add(lathe([[0, 0], [.34, 0], [.28, .2], [.2, .35], [.18, .9], [.24, 1.02], [0, 1.02]], 20), stone2, trs(V(F.x, .1, F.z)), .3);
    S.add(lathe([[0, 0], [.2, 0], [.62, .12], [.72, .26], [.66, .3], [.2, .2], [0, .2]], 28), stone, trs(V(F.x, 1.0, F.z)), .2);
    // crown of the fountain: a short column, a plinth, and a stone pigeon statue that spits into the upper bowl
    S.add(lathe([[0, 0], [.1, 0], [.085, .12], [.085, .2], [.16, .24], [.17, .3], [0, .3]], 20), stone, trs(V(F.x, 1.18, F.z)), .2);
    const statue = statueGeometry(wildPheno());
    const SY = 1.48, SK = 1.25, yaw = .35; // stands on the plinth in three-quarter profile
    this.statue = { x: F.x, y: SY, z: F.z, k: SK, yaw };
    const statueStone = col('#cfc5b3'), statueDark = col('#b7ac98');
    S.add(statue, (x, y) => (y - SY) / SK > .42 ? statueDark : statueStone, trs(V(F.x, SY, F.z), [0, -yaw, 0], [SK, SK, SK]), .15);
    const water = new THREE.MeshStandardMaterial({ color: '#86bfcf', roughness: .08, metalness: .05, transparent: true, opacity: .88 });
    this.waterMat = water;
    const w1 = new THREE.Mesh(new THREE.CircleGeometry(F.r - .15, 40), water); w1.rotation.x = -Math.PI / 2; w1.position.set(F.x, .44, F.z); w1.receiveShadow = true;
    const w2 = new THREE.Mesh(new THREE.CircleGeometry(.62, 28), water); w2.rotation.x = -Math.PI / 2; w2.position.set(F.x, 1.27, F.z);
    this.scene.add(w1, w2);
    // droplets: one instanced mesh, animated on the CPU along parabolas
    const n = this.q.low ? 40 : 90;
    this.drops = new THREE.InstancedMesh(new THREE.SphereGeometry(.028, 6, 4), new THREE.MeshStandardMaterial({ color: '#cfeaf0', roughness: .1, transparent: true, opacity: .85 }), n);
    this.drops.frustumCulled = false;
    const r = mulberry(3);
    this.dropData = Array.from({ length: n }, (_, i) => ({ a: r() * Math.PI * 2, ph: r(), tier: i % 3 === 0 ? 0 : 1, sp: .8 + r() * .4 }));
    this.scene.add(this.drops);
    // ripple rings
    this.ripples = new THREE.InstancedMesh(new THREE.RingGeometry(.9, 1, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: '#e6f4f6', transparent: true, opacity: .35, depthWrite: false }), 4);
    this.ripples.frustumCulled = false;
    this.scene.add(this.ripples);
  }

  buildProps() {
    const S = this.static;
    const wood = col('#b87a48'), wood2 = col('#a86c3d'), iron = col('#3e4a3f'), trunk = col('#7c5b41');
    // benches along the long edges, facing the plaza
    const bench = (x, z, rot) => {
      const base = trs(V(x, 0, z), [0, rot, 0]);
      const add = (g, c, p, r = [0, 0, 0]) => S.add(g, c, base.clone().multiply(trs(p, r)), .15);
      for (let i = 0; i < 3; i++) add(new THREE.BoxGeometry(1.7, .045, .12), i % 2 ? wood : wood2, V(0, .46, -.14 + i * .14));
      for (let i = 0; i < 2; i++) add(new THREE.BoxGeometry(1.7, .11, .04), i % 2 ? wood : wood2, V(0, .66 + i * .15, -.25), [-.18, 0, 0]);
      for (const sx of [-.7, .7]) {
        add(new THREE.BoxGeometry(.06, .46, .06), iron, V(sx, .23, .1));
        add(new THREE.BoxGeometry(.06, .85, .06), iron, V(sx, .42, -.22), [-.12, 0, 0]);
        add(new THREE.BoxGeometry(.06, .05, .46), iron, V(sx, .44, -.05));
      }
    };
    const bz = PARK.d / 2 + .95;
    bench(-2.6, -bz, 0); bench(2.2, -bz, 0); bench(-.8, bz + .1, Math.PI); bench(3.4, bz + .1, Math.PI);
    bench(-PARK.w / 2 - 1.05, 1.6, Math.PI / 2);
    // lamp posts
    for (const p of this.lampSpots) {
      const b = trs(p);
      S.add(new THREE.CylinderGeometry(.16, .2, .25, 12), iron, b.clone().multiply(trs(V(0, .12, 0))), .2);
      S.add(new THREE.CylinderGeometry(.045, .06, 2.1, 10), iron, b.clone().multiply(trs(V(0, 1.2, 0))));
      S.add(new THREE.CylinderGeometry(.2, .08, .1, 8), iron, b.clone().multiply(trs(V(0, 2.2, 0))));
      S.add(new THREE.ConeGeometry(.24, .22, 8), iron, b.clone().multiply(trs(V(0, 2.62, 0))));
    }
    this.globeMat = new THREE.MeshStandardMaterial({ color: '#fff3d6', emissive: new THREE.Color('#ffc27a'), emissiveIntensity: 0, roughness: .4 });
    const globes = new THREE.InstancedMesh(new THREE.SphereGeometry(.17, 16, 12), this.globeMat, this.lampSpots.length);
    this.lampSpots.forEach((p, i) => globes.setMatrixAt(i, trs(V(p.x, 2.38, p.z))));
    this.scene.add(globes);
    // dovecote (the Roost) — back-right corner
    const dv = this.dovecote = V(PARK.w / 2 + 1.9, 0, -PARK.d / 2 - 1.5);
    const db = trs(dv, [0, -.6, 0]);
    const white = col('#efe7d8'), roof = col('#b7593f'), hole = col('#3a302a');
    S.add(new THREE.CylinderGeometry(.08, .1, 2.2, 10), col('#8a6a4a'), db.clone().multiply(trs(V(0, 1.1, 0))));
    S.add(new THREE.BoxGeometry(1.1, .8, .8), white, db.clone().multiply(trs(V(0, 2.55, 0))), .15);
    S.add(new THREE.ConeGeometry(.9, .6, 4), roof, db.clone().multiply(trs(V(0, 3.25, 0), [0, Math.PI / 4, 0])));
    for (let i = 0; i < 4; i++) {
      const hx = -.36 + i * .24;
      S.add(new THREE.CylinderGeometry(.075, .075, .02, 14), hole, db.clone().multiply(trs(V(hx, 2.62, .405), [Math.PI / 2, 0, 0])));
      S.add(new THREE.BoxGeometry(.2, .03, .12), col('#8a6a4a'), db.clone().multiply(trs(V(hx, 2.46, .46))));
    }
    S.add(new THREE.BoxGeometry(1.3, .04, .34), col('#8a6a4a'), db.clone().multiply(trs(V(0, 2.13, .5))));
    this.dovecoteMatrix = db;
    // trees
    const r = mulberry(21);
    const greens = ['#7f9c5a', '#6c8a4b', '#93ad6a', '#86a15f'].map(col);
    // Trees are separate meshes (not merged) so one standing between the camera and the park can fade out.
    this.trees = [];
    const tree = (x, z, s) => {
      const T = new Static();
      const b = trs(V(x, 0, z), [0, r() * 6, 0], [s, s, s]);
      T.add(new THREE.CylinderGeometry(.13, .22, 2.2, 9), trunk, b.clone().multiply(trs(V(0, 1.1, 0), [(r() - .5) * .1, 0, (r() - .5) * .1])), .35);
      const blobs = 5 + Math.floor(r() * 3);
      for (let i = 0; i < blobs; i++) {
        const a = i / blobs * Math.PI * 2 + r(), rr = i === 0 ? 0 : .55 + r() * .35;
        const g = lumpy(.75 + r() * .35, 2, .35, r() * 50);
        const cc = greens[Math.floor(r() * greens.length)];
        T.add(g, (px, py) => cc.clone().multiplyScalar(.8 + .25 * Math.min(1, Math.max(0, (py - 2) / 2.4))), b.clone().multiply(trs(V(Math.cos(a) * rr, 2.6 + (i === 0 ? .7 : r() * .6), Math.sin(a) * rr))));
      }
      // always "transparent" (opacity 1 when solid) so fading never changes the shader program
      const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .86, transparent: true, opacity: 1 });
      const mesh = T.mesh(mat); this.scene.add(mesh);
      this.trees.push({ mesh, mat, c: V(x, 3.1 * s, z), r: 1.75 * s, o: 1 });
    };
    const TREES = [[-9.2, -6.2, 1.25], [-4.8, -7.6, 1.05], [1.4, -8.3, 1.3], [6.2, -7.8, 1.1], [10.4, -5.4, 1.2], [-10.8, -1.2, 1.1], [11.4, 1.2, 1.05], [-9.6, 5.4, .95], [10.2, 6.8, 1.0], [-13, -9, 1.4], [14, -10, 1.5], [-2, -12, 1.6], [7, -13, 1.4]];
    for (const [x, z, s] of TREES) tree(x, z, s);
    // hedges along the back
    for (let i = 0; i < 30; i++) {
      const x = -12 + i * .85, z = -PARK.d / 2 - 2.6 - Math.sin(i * .7) * .25;
      if (Math.abs(x - dv.x) < 1.1) continue;
      S.add(lumpy(.55 + r() * .15, 1, .3, i * 3.1), greens[i % 4].clone().multiplyScalar(.85), trs(V(x, .35, z), [0, r() * 3, 0], [1, .85, 1]), .35);
    }
    // bushes + flower beds at the front corners
    for (const [x, z] of [[-7.4, 4.9], [-6.3, 5.5], [7.6, 5.0], [6.6, 5.6], [-8.2, -3.6], [8.4, -2.8]]) {
      S.add(lumpy(.5 + r() * .2, 1, .35, x * z), greens[Math.floor(r() * 4)], trs(V(x, .3, z)), .4);
    }
  }

  buildLawnScatter() {
    const r = mulberry(33);
    // grass tufts: 3 thin blades per tuft
    const blade = new THREE.ConeGeometry(.025, .22, 3); blade.translate(0, .11, 0);
    const tuft = mergeGeometries([0, 1, 2].map(i => blade.clone().applyMatrix4(trs(V((i - 1) * .03, 0, 0), [0, i * 2, (i - 1) * .35]))));
    const spots = [];
    while (spots.length < (this.q.low ? 350 : 900)) {
      const x = (r() - .5) * 34, z = (r() - .5) * 24;
      if (Math.abs(x) < PARK.w / 2 + 1.1 && Math.abs(z) < PARK.d / 2 + 1.1) continue;
      spots.push([x, z]);
    }
    const inst = new THREE.InstancedMesh(tuft, new THREE.MeshStandardMaterial({ roughness: .9 }), spots.length);
    const c = new THREE.Color(), gA = col('#7f9a58'), gB = col('#a9bd7c');
    spots.forEach(([x, z], i) => {
      const s = .7 + r() * .7;
      inst.setMatrixAt(i, trs(V(x, -.03, z), [0, r() * 6, 0], [s, s * (.8 + r() * .5), s]));
      inst.setColorAt(i, c.copy(gA).lerp(gB, r()));
    });
    inst.receiveShadow = true;
    this.scene.add(inst);
    // flowers
    const fl = [], fc = ['#f2c94c', '#f6f1e6', '#e58bad', '#c95f5f', '#a98cc9'].map(col);
    for (const [cx, cz, n] of [[-7, 5.2, 26], [7.1, 5.3, 26], [-8.4, -3.2, 14], [8.6, -2.4, 14], [-3, 6.4, 18], [3.4, 6.6, 18]]) {
      for (let i = 0; i < n; i++) fl.push([cx + (r() - .5) * 2.2, cz + (r() - .5) * 1.1, fc[Math.floor(r() * fc.length)]]);
    }
    const fi = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.07, 0), new THREE.MeshStandardMaterial({ roughness: .7 }), fl.length);
    fl.forEach(([x, z, cc], i) => { fi.setMatrixAt(i, trs(V(x, .12 + r() * .08, z))); fi.setColorAt(i, cc); });
    fi.castShadow = true;
    this.scene.add(fi);
  }

  buildSkyline() {
    // hazy city silhouettes far behind the park; windows glow at night
    const r = mulberry(55), S = new Static(), wins = [];
    const tones = ['#b9b3c4', '#c7bfb8', '#aeb0bf', '#c2b6ad'].map(col);
    for (let i = 0; i < 26; i++) {
      const x = -60 + i * 4.8 + r() * 2, z = -48 - r() * 14, w = 3 + r() * 3, h = 6 + r() * 16, d = 3 + r() * 2;
      S.add(new THREE.BoxGeometry(w, h, d), tones[i % 4], trs(V(x, h / 2 - .5, z)));
      if (r() < .4) S.add(new THREE.ConeGeometry(w * .6, 2.5, 4), tones[(i + 1) % 4], trs(V(x, h + 0.7, z), [0, Math.PI / 4, 0]));
      for (let wy = 2; wy < h - 1; wy += 1.6) for (let wx = -w / 2 + .6; wx < w / 2 - .4; wx += 1) if (r() < .45) wins.push(V(x + wx, wy, z + d / 2 + .02));
    }
    const m = S.mesh(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 }));
    m.castShadow = m.receiveShadow = false;
    this.scene.add(m);
    this.winMat = new THREE.MeshBasicMaterial({ color: '#ffd28a', transparent: true, opacity: 0, fog: true });
    const wi = new THREE.InstancedMesh(new THREE.PlaneGeometry(.45, .6), this.winMat, wins.length);
    wins.forEach((p, i) => wi.setMatrixAt(i, trs(p)));
    this.scene.add(wi);
  }

  // ---------- per-frame ----------
  setHour(h, night) {
    // the sky changes slowly: skip the (allocating) keyframe blend unless the time moved a little
    if (this.hour !== undefined && Math.abs(h - this.hour) < .01 && night === this.night && !this.dirtyLight) return;
    this.dirtyLight = false;
    const k = sampleKeys(h), moon = isMoon(h);
    this.hour = h; this.night = night;
    // sun sweeps east→west across the camera-facing half of the sky; moon parks high front-left
    const az = moon ? 2.1 : THREE.MathUtils.degToRad(30 + (THREE.MathUtils.clamp(h, 5, 19.5) - 8) / 8.5 * 120);
    const el = THREE.MathUtils.degToRad(Math.max(2, k.el));
    const dir = V(Math.cos(az) * Math.cos(el), Math.sin(el), Math.sin(az) * Math.cos(el)).normalize();
    this.sunDir = dir;
    this.sun.position.copy(dir).multiplyScalar(30);
    this.sun.target.position.set(0, 0, 0);
    this.sun.color.copy(k.sun); this.sun.intensity = k.sunI;
    this.hemi.color.copy(k.hs); this.hemi.groundColor.copy(k.hg); this.hemi.intensity = k.hI;
    this.scene.environmentIntensity = k.env;
    this.skyU.top.value.copy(k.top); this.skyU.hor.value.copy(k.hor);
    this.skyU.bot.value.copy(k.hor).lerp(col('#8c9a6c'), .5);
    this.skyU.sunDir.value.copy(dir); this.skyU.sunCol.value.copy(k.sun); this.skyU.sunGlow.value = moon ? .25 : 1;
    this.scene.fog.color.copy(k.hor);
    this.starMat.opacity = night * .9;
    const lamp = THREE.MathUtils.clamp(night * 1.2, 0, 1);
    this.globeMat.emissiveIntensity = .15 + lamp * 2.2;
    for (const L of this.lampLights) L.intensity = lamp * 5;
    this.winMat.opacity = lamp * .9;
  }

  // Drizzle: dim and grey the light (called after setHour each frame).
  setRain(r) {
    if (r <= .001) return;
    this.dirtyLight = true; // rain edits the lights in place; recompute the clean values next frame
    const grey = col('#9aa3aa');
    this.sun.intensity *= 1 - .6 * r; this.hemi.intensity *= 1 - .2 * r;
    this.skyU.top.value.lerp(grey, .7 * r); this.skyU.hor.value.lerp(col('#c3c7c6'), .6 * r); this.skyU.sunGlow.value *= 1 - r;
    this.scene.fog.color.lerp(col('#c3c7c6'), .6 * r);
  }

  // Fade any tree whose canopy sits between the camera and what it's looking at (target + plaza corners).
  updateOcclusion(camPos, target, dt) {
    const ends = this._ends || (this._ends = [null, V(-PARK.w / 2, .3, -PARK.d / 2), V(PARK.w / 2, .3, -PARK.d / 2), V(-PARK.w / 2, .3, PARK.d / 2), V(PARK.w / 2, .3, PARK.d / 2)]);
    ends[0] = target;
    const seg = this._seg || (this._seg = new THREE.Line3()), q = this._q || (this._q = new THREE.Vector3());
    for (const T of this.trees) {
      let block = camPos.distanceTo(T.c) < T.r * 1.3;
      for (const e of ends) {
        if (block) break;
        seg.set(camPos, e); seg.closestPointToPoint(T.c, true, q);
        block = q.distanceTo(T.c) < T.r && q.distanceTo(e) > .5;
      }
      const want = block ? .18 : 1;
      T.o += (want - T.o) * Math.min(1, dt * 6 || 1);
      T.mat.opacity = T.o; T.mat.depthWrite = T.o > .95;
    }
  }
  treeOpacity() { return this.trees.map(t => +t.o.toFixed(2)); }

  update(dt) {
    this.t += dt;
    const F = FOUNTAIN, m = this._m || (this._m = new THREE.Matrix4()), t = this.t;
    const Q = this._qi || (this._qi = new THREE.Quaternion()), P = this._p || (this._p = new THREE.Vector3()), Sc = this._sc || (this._sc = new THREE.Vector3());
    this.dropData.forEach((d, i) => {
      const k = (t * d.sp * .8 + d.ph) % 1;
      let x, y, z;
      if (d.tier === 0) { // a stream from the statue's beak arcing down into the upper bowl
        const st = this.statue, ca = Math.cos(st.yaw), sa = Math.sin(st.yaw);
        const bx = st.x + ca * .29 * st.k, bz = st.z + sa * .29 * st.k, by = st.y + .485 * st.k;
        const j = (d.a - Math.PI) * .01, h = .03 + k * .26;
        x = bx + ca * h - sa * j; z = bz + sa * h + ca * j; y = by + k * .28 - k * k * (by + .28 - 1.27);
        m.compose(P.set(x, y, z), Q, Sc.set(.6, .6, .6)); this.drops.setMatrixAt(i, m); return;
      } else {            // spill from upper bowl rim to lower pool
        const rr = .72 + k * .35; x = F.x + Math.cos(d.a) * rr; z = F.z + Math.sin(d.a) * rr; y = 1.28 - k * k * .84;
      }
      m.makeTranslation(x, y, z);
      this.drops.setMatrixAt(i, m);
    });
    this.drops.instanceMatrix.needsUpdate = true;
    for (let i = 0; i < 4; i++) {
      const k = (t * .35 + i / 4) % 1, s = .85 + k * .45;
      m.compose(P.set(F.x, .445, F.z), Q, Sc.set(s, 1, s));
      this.ripples.setMatrixAt(i, m);
    }
    this.ripples.instanceMatrix.needsUpdate = true;
  }
}
