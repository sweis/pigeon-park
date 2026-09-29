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
const _p = new THREE.Vector3();
export function toScreen(x, y, z, cam, W = innerWidth, H = innerHeight) {
  _p.set(x, y, z).project(cam);
  return { x: (_p.x * .5 + .5) * W, y: (-_p.y * .5 + .5) * H, z: _p.z, ndcX: _p.x, ndcY: _p.y };
}
