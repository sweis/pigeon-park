// Pigeon Park — orbit/zoom camera with named fixed shots for comparable captures.

import * as THREE from 'three';
import { PARK, FOUNTAIN } from './sim.js';

const damp = (a, b, k, dt) => a + (b - a) * (1 - Math.exp(-k * dt));

export class CameraRig {
  constructor(aspect) {
    this.cam = new THREE.PerspectiveCamera(34, aspect, .1, 400);
    this.target = new THREE.Vector3(0, 0, -.2);
    this.want = { az: 0, pol: .98, dist: 16, target: new THREE.Vector3(0, 0, .1) };
    this.cur = { ...this.want, target: this.target.clone() };
    this.follow = null;   // pigeon id to follow
    this.name = 'overview';
    this.fit(aspect);
    this.snap();
  }
  // distance that fits the plaza (plus a margin) in view for the current aspect
  fitDist(aspect) {
    const vf = THREE.MathUtils.degToRad(this.cam.fov), hf = 2 * Math.atan(Math.tan(vf / 2) * aspect);
    const w = PARK.w + .9, d = PARK.d + 1.2;
    return Math.max((w / 2) / Math.tan(hf / 2), (d * .62) / Math.tan(vf / 2)) + 1.5;
  }
  fit(aspect) {
    this.cam.aspect = aspect; this.cam.updateProjectionMatrix();
    this.home = this.fitDist(aspect);
    this.maxDist = this.home * 1.35;
    if (this.name === 'overview') this.want.dist = this.home;
  }
  snap() { this.cur = { ...this.want, target: this.want.target.clone() }; this.apply(); }
  shot(name, opts = {}) {
    this.name = name; this.follow = null;
    const W = this.want;
    if (name === 'overview' || name === 'hud-check') Object.assign(W, { az: 0, pol: .98, dist: this.home, target: new THREE.Vector3(0, 0, .1) });
    else if (name === 'fountain') Object.assign(W, { az: .35, pol: 1.05, dist: 7.5, target: new THREE.Vector3(FOUNTAIN.x, .6, FOUNTAIN.z) });
    else if (name === 'dovecote') Object.assign(W, { az: -.55, pol: 1.15, dist: 6, target: new THREE.Vector3(PARK.w / 2 + 1.9, 1.8, -PARK.d / 2 - 1.5) });
    else if (name === 'hero-close') Object.assign(W, { az: opts.az ?? .5, pol: 1.3, dist: opts.dist ?? 2.1, target: new THREE.Vector3(opts.x ?? 0, opts.y ?? .28, opts.z ?? 0) });
    else if (name === 'follow') { Object.assign(W, { pol: 1.12, dist: opts.dist ?? 3.6 }); this.follow = opts.id; }
    if (opts.snap !== false) this.snap();
  }
  orbit(dx, dy) {
    this.want.az = THREE.MathUtils.clamp(this.want.az - dx * .005, -1.25, 1.25);
    this.want.pol = THREE.MathUtils.clamp(this.want.pol - dy * .004, .45, 1.38);
    this.name = 'custom';
  }
  zoom(f) {
    this.want.dist = THREE.MathUtils.clamp(this.want.dist * f, 1.6, this.maxDist);
    if (this.want.dist > this.home * .8 && !this.follow) {
      // drift the focus back toward the park centre as we pull out
      this.want.target.lerp(new THREE.Vector3(0, 0, -.2), .25);
    }
    this.name = 'custom';
  }
  pan(dx, dz) {
    const t = this.want.target;
    t.x = THREE.MathUtils.clamp(t.x + dx, -PARK.w / 2, PARK.w / 2);
    t.z = THREE.MathUtils.clamp(t.z + dz, -PARK.d / 2, PARK.d / 2);
    this.follow = null; this.name = 'custom';
  }
  update(dt, followPos) {
    if (this.follow != null && followPos) this.want.target.set(followPos.x, .3 + followPos.y * .5, followPos.z);
    const C = this.cur, W = this.want, k = 7;
    C.az = damp(C.az, W.az, k, dt); C.pol = damp(C.pol, W.pol, k, dt); C.dist = damp(C.dist, W.dist, k, dt);
    C.target.x = damp(C.target.x, W.target.x, k, dt); C.target.y = damp(C.target.y, W.target.y, k, dt); C.target.z = damp(C.target.z, W.target.z, k, dt);
    this.apply();
  }
  apply() {
    const C = this.cur, s = Math.sin(C.pol);
    this.cam.position.set(C.target.x + Math.sin(C.az) * s * C.dist, C.target.y + Math.cos(C.pol) * C.dist, C.target.z + Math.cos(C.az) * s * C.dist);
    this.cam.lookAt(C.target);
  }
}
