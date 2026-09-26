// Pigeon Park — renders sim state: animated pigeon rigs, eggs, poop, contact shadows, selection ring.

import * as THREE from 'three';
import { PigeonRig, sizeOf } from './pigeon3d.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const TAU = Math.PI * 2;
const damp = (a, b, k, dt) => a + (b - a) * (1 - Math.exp(-k * dt));
function angDamp(a, b, k, dt) { let d = ((b - a + Math.PI) % TAU + TAU) % TAU - Math.PI; return a + d * (1 - Math.exp(-k * dt)); }

function radialTexture(inner, outer) {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, inner); gr.addColorStop(1, outer);
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function chickScale(age) { return age < 9 ? .58 : age < 18 ? .78 : 1; }

class PigeonView {
  constructor(p, mats) {
    this.pid = p.id;
    this.rig = new PigeonRig(p.pheno, mats);
    this.g = this.rig.group;
    this.b = this.rig.bones; this.rest = this.rig.rest; this.restRot = this.rig.restRot;
    this.vis = V(p.x, p.y, p.z);
    this.yaw = -p.dir;
    this.walkPh = 0; this.seed = (p.id * 7.31) % 10;
    this.blinkAt = 1 + Math.random() * 3; this.blinkT = 0;
    this.glow = p.pheno.e.glow === 'glow';
    this.baseSize = sizeOf(p.pheno, p.jit);
  }
  size(p, simT) { return this.baseSize * chickScale(simT - p.born); }
  update(p, simT, dt, t) {
    const b = this.b, R = this.rest;
    // position/heading smoothing (sim runs at 30 Hz, render at display rate)
    const tgt = V(p.x, p.y, p.z);
    if (tgt.distanceTo(this.vis) > 1.2) this.vis.copy(tgt);
    else { this.vis.x = damp(this.vis.x, tgt.x, 18, dt); this.vis.y = damp(this.vis.y, tgt.y, 18, dt); this.vis.z = damp(this.vis.z, tgt.z, 18, dt); }
    this.yaw = angDamp(this.yaw, -p.dir, p.flying ? 4 : 11, dt);
    const s = this.size(p, simT), age = simT - p.born;
    this.g.position.copy(this.vis);
    this.g.rotation.set(0, this.yaw, 0);
    this.g.scale.setScalar(s);
    // reset pose
    for (const n of ['body', 'head', 'wingL', 'wingR', 'legL', 'legR', 'tail', 'eyeL', 'eyeR']) { b[n].position.copy(R[n]); b[n].rotation.copy(this.restRot[n]); b[n].scale.set(1, 1, 1); }
    b.root.rotation.set(0, 0, 0); b.root.position.set(0, 0, 0);
    const headK = age < 9 ? 1.32 : age < 18 ? 1.16 : 1;
    b.head.scale.setScalar(headK);

    const st = p.state, moving = st === 'walk' && Math.hypot(p.tx - p.x, p.tz - p.z) > .005;
    const breathe = Math.sin(t * 2.3 + this.seed) * .5 + .5;
    let eyesOpen = 1;
    if (p.flying) {
      const f = Math.sin(t * 24 + this.seed);
      b.wingL.rotation.x = 1.0 + f * .85; b.wingR.rotation.x = -(1.0 + f * .85);
      b.legL.rotation.z = b.legR.rotation.z = -1.1;
      b.body.rotation.z = .25;
      b.tail.rotation.z = -.2;
    } else if (p.held) {
      const f = Math.sin(t * 13 + this.seed);
      b.wingL.rotation.x = .55 + f * .45; b.wingR.rotation.x = -(.55 + f * .45);
      b.legL.rotation.z = -.35 + Math.sin(t * 5) * .2; b.legR.rotation.z = -.35 - Math.sin(t * 5) * .2;
      b.root.rotation.x = Math.sin(t * 3) * .12;
      b.head.rotation.y = Math.sin(t * 4) * .4;
    } else if (st === 'tumble') {
      const k = Math.min(1, (simT - p.stateAt) / .75);
      const th = k * TAU, c = .28; // backflip about the body centre, with a hop
      b.root.rotation.z = th;
      b.root.position.set(c * Math.sin(th), c - c * Math.cos(th) + Math.sin(k * Math.PI) * .32, 0);
      b.wingL.rotation.x = .6; b.wingR.rotation.x = -.6;
    } else if (st === 'roll') { // parlor roller: two forward somersaults along the ground
      const k = Math.min(1, (simT - p.stateAt) / 1.1), th = -k * TAU * 2, c = .24;
      b.root.rotation.z = th;
      b.root.position.set(c * Math.sin(th), c - c * Math.cos(th), 0);
      b.head.rotation.z = -.6; b.legL.rotation.z = b.legR.rotation.z = -.9;
    } else if (st === 'sleep') {
      b.head.rotation.z += .5; b.head.position.y -= .045; b.head.position.x -= .03;
      b.body.scale.set(1.04, 1.02 + breathe * .03, 1.06);
      b.body.position.y -= .02;
      b.legL.scale.y = b.legR.scale.y = .8;
      eyesOpen = 0;
    } else if (moving || st === 'walk') {
      if (moving) this.walkPh += dt * (p.v / .5) * 13;
      const ph = this.walkPh, sw = Math.sin(ph);
      b.legL.rotation.z = sw * .6; b.legR.rotation.z = -sw * .6;
      b.body.position.y += Math.abs(Math.cos(ph)) * .012;
      b.body.rotation.x = sw * .05;
      // the pigeon head-bob: thrust forward fast, hold while the body catches up
      const f = ((ph / Math.PI) % 1 + 1) % 1;
      b.head.position.x += (f < .28 ? f / .28 : 1 - (f - .28) / .72) * .042 - .02;
      b.tail.rotation.z = -Math.cos(ph) * .06;
    } else if (st === 'peck') {
      const k = ((simT - p.stateAt) * 1.25 + this.seed) % 1;
      const dip = k < .25 ? k / .25 : k < .4 ? 1 : Math.max(0, 1 - (k - .4) / .3);
      b.head.rotation.z += -dip * 1.05;
      b.head.position.x += dip * .02;
      b.body.rotation.z = -dip * .12;
      b.tail.rotation.z = dip * .15;
    } else if (st === 'court') {
      const k = Math.max(0, Math.sin(t * 4.5 + this.seed));
      b.body.scale.set(1.06, 1.1, 1.1);
      b.head.rotation.z = -k * .45; b.head.position.y += .01;
      b.tail.rotation.z = .25 + k * .1;
      b.wingL.rotation.x = .15 * k; b.wingR.rotation.x = -.15 * k;
      b.root.rotation.y = Math.sin(t * 1.3 + this.seed) * .25;
    } else { // idle
      b.body.scale.y = 1 + breathe * .02;
      b.head.rotation.y = Math.sin(t * .6 + this.seed * 3) * .45 * Math.max(0, Math.sin(t * .23 + this.seed));
      b.head.rotation.z = Math.sin(t * .9 + this.seed) * .06;
    }
    // blinks
    if (eyesOpen) {
      this.blinkAt -= dt;
      if (this.blinkAt < 0) { this.blinkT = .13; this.blinkAt = 2 + Math.random() * 4; }
      if (this.blinkT > 0) { this.blinkT -= dt; eyesOpen = 0; }
    }
    b.eyeL.scale.y = b.eyeR.scale.y = eyesOpen ? 1 : .12;
    b.spin.rotation.y += dt * 18;
    return s;
  }
  dispose() { this.rig.dispose(); }
}

export class FlockView {
  constructor(scene, mats, quality) {
    this.scene = scene; this.mats = mats; this.q = quality;
    this.views = new Map();
    this.root = new THREE.Group(); scene.add(this.root);
    // contact shadows: one instanced blob per bird (1 draw call)
    const shTex = radialTexture('rgba(40,34,28,0.55)', 'rgba(40,34,28,0)');
    this.shadows = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ map: shTex, transparent: true, depthWrite: false }), 80);
    this.shadows.frustumCulled = false; this.shadows.renderOrder = 1;
    scene.add(this.shadows);
    // glow halos: pooled sprites (created up front)
    const haloMat = new THREE.SpriteMaterial({ map: radialTexture('rgba(234,246,168,0.9)', 'rgba(234,246,168,0)'), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true });
    this.halos = Array.from({ length: 12 }, () => { const s = new THREE.Sprite(haloMat); s.visible = false; scene.add(s); return s; });
    this.haloMat = haloMat;
    // eggs (pooled)
    this.eggGeo = new THREE.SphereGeometry(1, 16, 12).scale(.07, .09, .07);
    this.eggMat = new THREE.MeshStandardMaterial({ color: '#fbf3e0', roughness: .55 });
    const nest = new THREE.TorusGeometry(.12, .045, 6, 16).rotateX(Math.PI / 2);
    const np = nest.attributes.position; for (let i = 0; i < np.count; i++) np.setY(i, np.getY(i) * .6 + Math.sin(i * 2.7) * .008);
    nest.computeVertexNormals();
    this.nestGeo = nest; this.nestMat = new THREE.MeshStandardMaterial({ color: '#b08d5a', roughness: 1 });
    this.eggPool = [];
    this.eggViews = new Map();
    // poop
    this.poop = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 8, 5).scale(.05, .012, .04), new THREE.MeshStandardMaterial({ color: '#f1ece0', roughness: .7 }), 16);
    this.poop.frustumCulled = false; this.poop.receiveShadow = true;
    scene.add(this.poop);
    // selection ring
    this.sel = new THREE.Mesh(new THREE.RingGeometry(.3, .34, 40, 1).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: '#c67139', transparent: true, opacity: .9, depthWrite: false }));
    const dash = new THREE.Mesh(new THREE.RingGeometry(.37, .39, 40, 1, 0, Math.PI * 1.6).rotateX(-Math.PI / 2), this.sel.material);
    this.sel.add(dash); this.selDash = dash;
    this.sel.visible = false; this.sel.renderOrder = 2;
    scene.add(this.sel);
  }

  view(id) { return this.views.get(id); }

  update(sim, dt, t, camPos) {
    const seen = new Set(), m = new THREE.Matrix4(), q = new THREE.Quaternion();
    let si = 0, hi = 0;
    for (const p of sim.pigeons) {
      seen.add(p.id);
      let v = this.views.get(p.id);
      if (!v) { v = new PigeonView(p, this.mats); this.views.set(p.id, v); this.root.add(v.g); }
      const s = v.update(p, sim.t, dt, t);
      if (camPos) v.rig.setLod(camPos.distanceTo(v.vis) > 7.5 * Math.max(1, s) ? 1 : 0);
      // contact shadow shrinks + fades with height
      const h = v.vis.y, ss = s * .62 * Math.max(.3, 1 - h * .5);
      m.compose(V(v.vis.x + .02 * s, .004, v.vis.z), q, V(ss * 1.2, 1, ss));
      if (!p.flying || h < 3) this.shadows.setMatrixAt(si++, m);
      if (v.glow && hi < this.halos.length) {
        const hs = this.halos[hi++]; hs.visible = true;
        hs.position.set(v.vis.x, v.vis.y + .3 * s, v.vis.z);
        const k = s * (.8 + sim.night * .9);
        hs.scale.set(k, k, k);
      }
    }
    this.shadows.count = si; this.shadows.instanceMatrix.needsUpdate = true;
    this.haloMat.opacity = .12 + sim.night * .7;
    for (let i = hi; i < this.halos.length; i++) this.halos[i].visible = false;
    for (const [id, v] of this.views) if (!seen.has(id)) { this.root.remove(v.g); v.dispose(); this.views.delete(id); }
    this.mats.glow.emissiveIntensity = .08 + sim.night * 1.2;
    this.mats.voidglow.emissiveIntensity = .15 + sim.night * .6;

    // eggs
    const eseen = new Set();
    for (const eg of sim.eggs) {
      eseen.add(eg.id);
      let ev = this.eggViews.get(eg.id);
      if (!ev) {
        ev = this.eggPool.pop() || this.makeEgg();
        ev.visible = true; this.eggViews.set(eg.id, ev);
      }
      ev.position.set(eg.x, 0, eg.z);
      const k = Math.max(0, (sim.t - eg.laidAt) / (eg.hatchAt - eg.laidAt));
      const wob = Math.sin(t * (6 + k * 16)) * (.08 + k * .3);
      ev.children[1].rotation.set(wob * .6, 0, wob);
      ev.scale.setScalar(Math.min(1, (sim.t - eg.laidAt) * 4 + .2));
    }
    for (const [id, ev] of this.eggViews) if (!eseen.has(id)) { ev.visible = false; this.eggPool.push(ev); this.eggViews.delete(id); }

    // poop
    let pi = 0;
    for (const pp of sim.poops) {
      const fade = Math.max(.05, 1 - (sim.t - pp.at) / 30);
      m.compose(V(pp.x, .002, pp.z), q.setFromAxisAngle(V(0, 1, 0), pp.r * 6), V(fade, 1, fade));
      this.poop.setMatrixAt(pi++, m);
    }
    this.poop.count = pi; this.poop.instanceMatrix.needsUpdate = true;

    // selection ring
    const sp = sim.selId != null ? sim.byId(sim.selId) : null, sv = sp && this.views.get(sp.id);
    this.sel.visible = !!sv && !sp.flying;
    if (this.sel.visible) {
      const s = sv.size(sp, sim.t);
      this.sel.position.set(sv.vis.x, .012, sv.vis.z);
      this.sel.scale.setScalar(s * 1.1);
      this.selDash.rotation.y = t * .8;
    }
  }

  makeEgg() {
    const g = new THREE.Group();
    const nest = new THREE.Mesh(this.nestGeo, this.nestMat); nest.position.y = .02; nest.receiveShadow = nest.castShadow = true;
    const egg = new THREE.Mesh(this.eggGeo, this.eggMat); egg.position.y = .085; egg.castShadow = true;
    g.add(nest, egg); this.scene.add(g);
    return g;
  }

  // Ray pick against a bounding sphere per bird. Returns sim pigeon id or null.
  pick(ray, sim) {
    let best = null, bt = Infinity;
    const c = new THREE.Vector3();
    for (const p of sim.pigeons) {
      const v = this.views.get(p.id); if (!v || p.flying) continue;
      const s = v.size(p, sim.t);
      c.set(v.vis.x + .03 * s, v.vis.y + .3 * s, v.vis.z);
      const r = .3 * s + .06;
      const oc = ray.origin.clone().sub(c), bq = oc.dot(ray.direction), cq = oc.lengthSq() - r * r, d = bq * bq - cq;
      if (d < 0) continue;
      const tt = -bq - Math.sqrt(d);
      if (tt > 0 && tt < bt) { bt = tt; best = p.id; }
    }
    return best;
  }
}
