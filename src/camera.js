// Pigeon Park — orbit/zoom camera with named fixed shots for comparable captures.

import * as THREE from 'three';
import { PARK, FOUNTAIN, DOVECOTE } from './sim.js';
// how far the camera may pan: out to the monument ring
const REACH = { x: PARK.w / 2 + 4.6, z: PARK.d / 2 + 4.6 }; // a little past the monument ring, so edge pieces can be centred

const damp = (a, b, k, dt) => a + (b - a) * (1 - Math.exp(-k * dt));
const TAU = Math.PI * 2;

export class CameraRig {
  constructor(aspect) {
    this.cam = new THREE.PerspectiveCamera(34, aspect, .1, 400);
    this.want = { az: 0, pol: .98, dist: 16, target: new THREE.Vector3(0, 0, .1) };
    this.cur = { ...this.want, target: this.want.target.clone() };
    this.follow = null;   // pigeon id to follow
    this.name = 'overview';
    this.fit(aspect);
    this.snap();
  }
  // distance that fits the plaza (plus a margin) in view for the current aspect
  fitDist(aspect) {
    const vf = THREE.MathUtils.degToRad(this.cam.fov), hf = 2 * Math.atan(Math.tan(vf / 2) * aspect);
    // portrait screens look down the plaza's long axis (see overviewAz), so swap the extents
    const port = aspect < .8, w = (port ? PARK.d : PARK.w) + .9, d = (port ? PARK.w : PARK.d) + 1.2;
    return Math.max((w / 2) / Math.tan(hf / 2), (d * (port ? .5 : .62)) / Math.tan(vf / 2)) + 1.5;
  }
  fit(aspect) {
    this.cam.aspect = aspect; this.cam.updateProjectionMatrix();
    this.home = this.fitDist(aspect);
    this.overviewAz = aspect < .8 ? Math.PI / 2 : 0;
    if (this.name === 'overview') this.want.az = this.overviewAz;
    this.maxDist = this.home * 1.6; // pull back far enough to see the whole monument ring
    if (this.name === 'overview') this.want.dist = this.home;
  }
  snap() { this.cur = { ...this.want, target: this.want.target.clone() }; this.apply(); }
  // The equivalent of azimuth `a` nearest to where the camera is now, so a shot after spinning the
  // camera round a few times doesn't unwind every turn.
  nearAz(a) { return a + Math.round((this.cur.az - a) / TAU) * TAU; }
  shot(name, opts = {}) {
    this.name = name; this.follow = null;
    const W = this.want;
    if (name === 'overview' || name === 'hud-check') Object.assign(W, { az: this.overviewAz, pol: .98, dist: this.home, target: new THREE.Vector3(0, 0, .1) });
    else if (name === 'fountain') Object.assign(W, { az: .35, pol: 1.05, dist: 7.5, target: new THREE.Vector3(FOUNTAIN.x, .6, FOUNTAIN.z) });
    else if (name === 'dovecote') Object.assign(W, { az: -.55, pol: 1.15, dist: 6, target: new THREE.Vector3(DOVECOTE.x, 1.8, DOVECOTE.z) });
    else if (name === 'hero-close') Object.assign(W, { az: opts.az ?? .5, pol: 1.3, dist: opts.dist ?? 2.1, target: new THREE.Vector3(opts.x ?? 0, opts.y ?? .28, opts.z ?? 0) });
    else if (name === 'follow') { Object.assign(W, { pol: 1.12, dist: opts.dist ?? 3.6 }); this.follow = opts.id; }
    W.az = this.nearAz(W.az);
    if (opts.snap !== false) this.snap();
  }
  orbit(dx, dy) {
    this.want.az -= dx * .005; // all the way round: the park is dressed on every side
    this.want.pol = THREE.MathUtils.clamp(this.want.pol - dy * .004, .45, 1.38);
    this.name = 'custom';
  }
  // Keyboard (desktop): fwd/right in -1..1 pan relative to where the camera faces, rot turns it (Q/E).
  // Pan speed scales with zoom so it feels the same close up and from the overview.
  keyMove(fwd, right, rot, dt) {
    if (fwd || right) {
      const az = this.want.az, s = this.want.dist * .75 * dt;
      this.pan((-Math.sin(az) * fwd + Math.cos(az) * right) * s, (-Math.cos(az) * fwd - Math.sin(az) * right) * s);
    }
    if (rot) { this.want.az += rot * 1.7 * dt; if (this.follow == null) this.name = 'custom'; }
  }
  zoom(f) {
    // (zoom stays anchored where the user points — see zoomAt — with no pull back toward the centre:
    // that fought two-finger pans, whose spread always jitters, and kept the monument ring out of reach)
    this.want.dist = THREE.MathUtils.clamp(this.want.dist * f, 1.6, this.maxDist);
    this.name = 'custom';
  }
  // Zoom keeping a ground point (under the cursor / between the fingers) where it is on screen.
  zoomAt(f, gp) {
    const d0 = this.want.dist;
    this.zoom(f);
    if (!gp || this.follow) return;
    const k = 1 - this.want.dist / d0; // >0 zooming in: move focus toward the point; <0: away from it
    const t = this.want.target;
    t.x = THREE.MathUtils.clamp(t.x + (gp.x - t.x) * k, -REACH.x, REACH.x);
    t.z = THREE.MathUtils.clamp(t.z + (gp.z - t.z) * k, -REACH.z, REACH.z);
  }
  pan(dx, dz) {
    const t = this.want.target;
    t.x = THREE.MathUtils.clamp(t.x + dx, -REACH.x, REACH.x);
    t.z = THREE.MathUtils.clamp(t.z + dz, -REACH.z, REACH.z);
    this.follow = null; this.name = 'custom';
  }
  // Pans driven by fingers should track 1:1, not lag behind the smoothing.
  snapTarget() { this.cur.target.copy(this.want.target); this.cur.dist = this.want.dist; this.apply(); }
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
