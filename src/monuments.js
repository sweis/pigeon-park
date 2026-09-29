// Pigeon Park — achievement monuments: small statues and art that appear on the lawn around the plaza.
// Each is procedural, merged into at most three meshes (stone/clay, metal, glow) that share the prop
// shader programs, so earning one never compiles anything.

import * as THREE from 'three';
import { Static, trs, lumpy, wildPheno } from './world.js';
import { statueGeometry } from './pigeon3d.js';
import { ACHIEVEMENTS, MONUMENT_SLOTS } from './achievements.js';
import { raySphere } from './util.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const col = (h) => new THREE.Color(h);
const lathe = (pts, seg = 28) => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), seg);

const MARBLE = col('#ece6dc'), STONE = col('#cfc5b3'), STONE2 = col('#b7ac98'), BRONZE = col('#a5773c'), GOLD = col('#e8b64c');
const IRON = col('#3e4a3f'), WOOD = col('#8a6a4a');

function plinth(S, h = .6, c = STONE) {
  S.add(new THREE.BoxGeometry(.72, .1, .72), STONE2, trs(V(0, .05, 0)), .2);
  S.add(new THREE.BoxGeometry(.56, h, .56), c, trs(V(0, .1 + h / 2, 0)), .25);
  S.add(new THREE.BoxGeometry(.66, .07, .66), c, trs(V(0, .13 + h, 0)));
  return .165 + h;
}
const bird = (S, y, k, color, yaw = .5) => S.add(statueGeometry(wildPheno()), typeof color === 'function' ? color : () => color, trs(V(0, y, 0), [0, -yaw, 0], [k, k, k]), .1);

// designs: (stone, metal, glow) → build into the three Static collectors
const DESIGNS = {
  statue(S) { const y = plinth(S); bird(S, y, 1.25, (x, yy) => (yy - y) / 1.25 > .42 ? STONE2 : STONE); },
  birdbath(S, Mt) {
    S.add(lathe([[0, 0], [.3, 0], [.28, .06], [.1, .12], [.08, .7], [.14, .78], [0, .78]]), STONE, trs(V(0, 0, 0)), .25);
    Mt.add(lathe([[0, 0], [.1, 0], [.5, .1], [.56, .2], [.5, .22], [.1, .12], [0, .12]], 32), BRONZE, trs(V(0, .76, 0)));
    Mt.add(statueGeometry(wildPheno()), () => BRONZE, trs(V(.36, .95, 0), [0, -1.7, 0], [.75, .75, .75]));
  },
  topiary(S) {
    S.add(new THREE.BoxGeometry(.8, .4, .6), WOOD, trs(V(0, .2, 0)), .3);
    const g = statueGeometry(wildPheno()), p = g.attributes.position, v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) { v.fromBufferAttribute(p, i); v.multiplyScalar(1 + .06 * Math.sin(v.x * 60) * Math.cos(v.y * 55 + v.z * 40)); p.setXYZ(i, v.x, v.y, v.z); }
    g.computeVertexNormals();
    S.add(g, (x, y, z) => col('#6f8f4c').lerp(col('#94ad6a'), Math.max(0, Math.min(1, (y - .4) / 1.4))), trs(V(0, .38, 0), [0, -.5, 0], [2.2, 2.2, 2.2]));
  },
  gold(S, Mt) { const y = plinth(S, .7, MARBLE); Mt.add(statueGeometry(wildPheno()), () => GOLD, trs(V(0, y, 0), [0, -.5, 0], [1.35, 1.35, 1.35])); },
  obelisk(S, Mt) {
    const g = new THREE.CylinderGeometry(.16, .26, 2.1, 4, 1); g.rotateY(Math.PI / 4);
    S.add(new THREE.BoxGeometry(.7, .16, .7), STONE2, trs(V(0, .08, 0)), .2);
    S.add(g, STONE, trs(V(0, 1.21, 0)), .3);
    S.add(new THREE.ConeGeometry(.19, .22, 4).rotateY(Math.PI / 4), STONE2, trs(V(0, 2.37, 0)));
    Mt.add(statueGeometry(wildPheno()), () => GOLD, trs(V(0, 2.44, 0), [0, -.5, 0], [.7, .7, .7]));
  },
  trophy(S, Mt) {
    const y = plinth(S, .5, MARBLE);
    Mt.add(lathe([[0, 0], [.22, 0], [.2, .04], [.06, .1], [.05, .38], [.12, .44], [.3, .62], [.34, .95], [.3, .95], [.26, .66], [.1, .5], [0, .5]], 32), GOLD, trs(V(0, y, 0)));
    for (const s of [-1, 1]) Mt.add(new THREE.TorusGeometry(.13, .025, 8, 16, Math.PI), GOLD, trs(V(.33 * s, y + .72, 0), [0, 0, -Math.PI / 2 * s]));
    Mt.add(statueGeometry(wildPheno()), () => GOLD, trs(V(0, y + .93, 0), [0, -.5, 0], [.5, .5, .5]));
  },
  runestone(S, Mt, G) {
    const g = lumpy(.5, 2, .25, 7); g.scale(.8, 2.1, .55);
    S.add(g, (x, y) => col('#6d6478').lerp(col('#8e8499'), Math.min(1, y / 1.8)), trs(V(0, .95, 0)), .3);
    for (let i = 0; i < 6; i++) G.add(new THREE.BoxGeometry(.06, .12, .03), col('#b89cff'), trs(V(-.12 + (i % 2) * .24, .6 + i * .22, .27), [0, 0, (i % 3 - 1) * .5]));
  },
  monolith(S, Mt, G) {
    S.add(new THREE.BoxGeometry(.55, 1.9, .16), col('#16151c'), trs(V(0, .95, 0)));
    for (let i = 0; i < 18; i++) G.add(new THREE.OctahedronGeometry(.018), col('#ffffff'), trs(V(Math.sin(i * 12.9898) * .24, .15 + ((i * .618) % 1) * 1.65, .085)));
  },
  globe(S, Mt) {
    Mt.add(lathe([[0, 0], [.26, 0], [.22, .05], [.06, .12], [.05, .6], [0, .6]]), BRONZE, trs(V(0, 0, 0)));
    Mt.add(new THREE.TorusGeometry(.5, .018, 6, 40, Math.PI), BRONZE, trs(V(0, 1.1, 0), [0, 0, Math.PI / 2 + .4]));
    const g = new THREE.SphereGeometry(.44, 32, 20);
    S.add(g, (x, y, z) => (Math.sin(x * 9) + Math.cos(z * 8 + y * 5) + Math.sin(y * 11)) > .7 ? col('#7f9c5a') : col('#6a9fd0'), trs(V(0, 1.1, 0), [.4, 0, 0]));
    S.add(statueGeometry(wildPheno()), (x, y) => STONE, trs(V(0, 1.52, 0), [0, -1.3, 0], [.6, .6, .6]));
  },
  books(S, Mt) {
    const cs = ['#8c3b32', '#3f5f8c', '#6e7f3b', '#b07b2e'];
    cs.forEach((c, i) => S.add(new THREE.BoxGeometry(.8 - i * .06, .15, .55 - i * .03), col(c), trs(V(0, .075 + i * .155, 0), [0, i * .15 - .2, 0])));
    for (const s of [-1, 1]) S.add(new THREE.BoxGeometry(.34, .03, .46), col('#f3ead6'), trs(V(.17 * s, .66, 0), [0, .1, .12 * s]));
    Mt.add(new THREE.ConeGeometry(.02, .5, 6), BRONZE, trs(V(.15, .88, .1), [.5, 0, -.6]));
  },
  familytree(S, Mt) {
    S.add(new THREE.CylinderGeometry(.3, .34, .12, 20), STONE2, trs(V(0, .06, 0)));
    Mt.add(new THREE.CylinderGeometry(.05, .08, 1.3, 8), IRON, trs(V(0, .75, 0)));
    const r = (a, b) => Math.sin(a * 91.7 + b * 17.3) * .5 + .5;
    for (let i = 0; i < 7; i++) {
      const a = i / 7 * Math.PI * 2, len = .45 + r(i, 1) * .3, tip = V(Math.cos(a) * len, 1.25 + r(i, 2) * .5, Math.sin(a) * len);
      const base = V(0, 1.0 + i * .06, 0), d = tip.clone().sub(base);
      Mt.add(new THREE.CylinderGeometry(.02, .03, d.length(), 6), IRON, new THREE.Matrix4().compose(base.clone().addScaledVector(d, .5), new THREE.Quaternion().setFromUnitVectors(V(0, 1, 0), d.clone().normalize()), V(1, 1, 1)));
      for (let k = 0; k < 3; k++) Mt.add(new THREE.SphereGeometry(.06, 10, 8), GOLD, trs(tip.clone().add(V((r(i, k + 3) - .5) * .2, (r(i, k + 6) - .5) * .15, (r(i, k + 9) - .5) * .2))));
    }
  },
  egg(S, Mt) {
    Mt.add(new THREE.TorusGeometry(.42, .12, 10, 28), BRONZE, trs(V(0, .14, 0), [Math.PI / 2, 0, 0]));
    S.add(new THREE.SphereGeometry(1, 28, 20).scale(.4, .56, .4), MARBLE, trs(V(0, .62, 0)), .15);
  },
  minicote(S) {
    S.add(new THREE.CylinderGeometry(.05, .06, 1.2, 8), WOOD, trs(V(0, .6, 0)));
    S.add(new THREE.BoxGeometry(.55, .4, .42), col('#efe7d8'), trs(V(0, 1.38, 0)), .15);
    S.add(new THREE.ConeGeometry(.46, .32, 4).rotateY(Math.PI / 4), col('#b7593f'), trs(V(0, 1.74, 0)));
    for (let i = 0; i < 2; i++) S.add(new THREE.CylinderGeometry(.06, .06, .02, 12), col('#3a302a'), trs(V(-.12 + i * .24, 1.42, .215), [Math.PI / 2, 0, 0]));
  },
  spiral(S) {
    S.add(new THREE.CylinderGeometry(.3, .34, .14, 20), STONE2, trs(V(0, .07, 0)));
    const g = new THREE.TorusKnotGeometry(.32, .07, 120, 10, 2, 3);
    S.add(g, (x, y, z) => new THREE.Color().setHSL(((Math.atan2(z, x) / Math.PI + 1) / 2 + y * .3) % 1, .75, .6), trs(V(0, .75, 0), [.3, 0, .2]));
  },
};

export class Monuments {
  constructor(scene, propMat) {
    this.scene = scene;
    this.mats = {
      stone: propMat,
      metal: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .3, metalness: .85 }),
      glow: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .6, emissive: new THREE.Color('#ffffff'), emissiveIntensity: .8 }),
    };
    this.built = new Map(); // id → { group, born, x, z }
  }
  // Build (or skip if already built). animate: pop up with a bounce.
  add(id, animate) {
    if (this.built.has(id)) return;
    const i = ACHIEVEMENTS.findIndex(a => a.id === id); if (i < 0) return;
    const A = ACHIEVEMENTS[i], [x, z] = MONUMENT_SLOTS[i];
    const S = new Static(), Mt = new Static(), G = new Static();
    DESIGNS[A.monument](S, Mt, G);
    const group = new THREE.Group();
    for (const [c, m] of [[S, this.mats.stone], [Mt, this.mats.metal], [G, this.mats.glow]]) if (c.geos.length) group.add(c.mesh(m));
    group.position.set(x, 0, z);
    group.rotation.y = Math.atan2(-x, -z) + .3; // face the plaza, slightly turned
    const box = new THREE.Box3().setFromObject(group);
    if (animate) group.scale.setScalar(.001);
    this.scene.add(group);
    this.built.set(id, { group, born: animate ? performance.now() : 0, x, z, top: box.max.y, cy: (box.max.y + box.min.y) / 2 });
  }
  sync(achievements, animateNew = true) { for (const id of Object.keys(achievements)) if (!this.built.has(id)) this.add(id, animateNew); }
  clear() { for (const m of this.built.values()) this.scene.remove(m.group); this.built.clear(); }
  update() {
    const now = performance.now();
    for (const m of this.built.values()) {
      if (!m.born) continue;
      const k = Math.min(1, (now - m.born) / 1100), s = k < 1 ? 1 + Math.sin(k * Math.PI * 2.5) * (1 - k) * .35 * Math.min(1, k * 4) : 1;
      m.group.scale.setScalar(Math.max(.001, k < .15 ? k / .15 * .6 : s));
      if (k >= 1) m.born = 0;
    }
  }
  // Ray pick against a capsule-ish bounding sphere per monument → achievement id
  pick(ray) {
    let best = null, bt = Infinity; const c = this._c || (this._c = new THREE.Vector3());
    for (const [id, m] of this.built) {
      const t = raySphere(ray, c.set(m.x, m.cy, m.z), Math.max(.6, m.top * .55));
      if (t < bt) { bt = t; best = id; }
    }
    return best;
  }
  get(id) { return this.built.get(id); }
}
