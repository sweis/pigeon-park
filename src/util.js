// Pigeon Park — small shared helpers (three.js math used by several modules).

import * as THREE from 'three';

// Frame-rate independent exponential smoothing of a toward b.
export const damp = (a, b, k, dt) => a + (b - a) * (1 - Math.exp(-k * dt));

// Distance along a normalised ray to a sphere's near surface, or Infinity if it misses / is behind.
const _oc = new THREE.Vector3();
export function raySphere(ray, c, r) {
  _oc.subVectors(ray.origin, c);
  const b = _oc.dot(ray.direction), d = b * b - (_oc.lengthSq() - r * r);
  if (d < 0) return Infinity;
  const t = -b - Math.sqrt(d);
  return t > 0 ? t : Infinity;
}

// World point → CSS pixels for a camera filling the window. z > 1 means behind the camera.
// Returns a shared object (valid until the next call) — hot per-frame callers allocate nothing.
const _p = new THREE.Vector3(), _s = { x: 0, y: 0, z: 0, ndcX: 0, ndcY: 0 };
export function toScreen(x, y, z, cam, W = innerWidth, H = innerHeight) {
  _p.set(x, y, z).project(cam);
  _s.x = (_p.x * .5 + .5) * W; _s.y = (-_p.y * .5 + .5) * H; _s.z = _p.z; _s.ndcX = _p.x; _s.ndcY = _p.y;
  return _s;
}
