// Pigeon Park — shared three.js helpers for procedural geometry (birds, park props, monuments, markers).

import * as THREE from 'three';

export const V = (x, y, z) => new THREE.Vector3(x, y, z);
export const col = (hex) => new THREE.Color(hex);
// A parsed colour per hex string, shared and read-only (for per-vertex paint callbacks: no allocation).
const HEX = new Map();
export const hex = (h) => HEX.get(h) || (HEX.set(h, new THREE.Color(h)), HEX.get(h));
export const mix = (a, b, t) => a.clone().lerp(b, t);

// Translate · rotate (Euler XYZ) · scale.
export function trs(pos, rot = [0, 0, 0], scl = [1, 1, 1]) {
  return new THREE.Matrix4().compose(pos, new THREE.Quaternion().setFromEuler(new THREE.Euler(rot[0], rot[1], rot[2])), new THREE.Vector3(...scl));
}
// `m` followed by a local trs (a piece placed relative to its parent's frame).
export const rel = (m, pos, rot, scl) => m.clone().multiply(trs(pos, rot, scl));
// Matrix that maps a primitive's +Y axis onto `dir`, centred at `pos`.
export function alongY(pos, dir, scl = [1, 1, 1]) {
  const q = new THREE.Quaternion().setFromUnitVectors(V(0, 1, 0), dir.clone().normalize());
  return new THREE.Matrix4().compose(pos, q, new THREE.Vector3(...scl));
}
// Rotation whose +Z is `n` (a decal or disc facing outward); `hint` is the rough up direction.
export function basis(n, hint) {
  const z = n.clone().normalize();
  const up = hint || (Math.abs(z.y) > .9 ? V(1, 0, 0) : V(0, 1, 0));
  const x = new THREE.Vector3().crossVectors(up, z).normalize();
  const y = new THREE.Vector3().crossVectors(z, x);
  return new THREE.Matrix4().makeBasis(x, y, z);
}
export const lathe = (pts, seg = 28) => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), seg);
// A flat ring lying on the ground (XZ plane).
export const groundRing = (inner, outer, seg = 32, arc = Math.PI * 2) => new THREE.RingGeometry(inner, outer, seg, 1, 0, arc).rotateX(-Math.PI / 2);
// A fixed-size instanced pool drawn in one call; `count` starts at 0 and callers fill it per frame.
export function pooled(scene, geo, mat, max, { colors = false } = {}) {
  const m = new THREE.InstancedMesh(geo, mat, max);
  m.frustumCulled = false; m.count = 0;
  if (colors) m.setColorAt(0, new THREE.Color()); // allocate instanceColor up front
  scene.add(m);
  return m;
}
// Fill a non-indexed or indexed geometry's vertex colours: one colour, or color(x, y, z) per vertex,
// darkened toward the bottom of the piece by `ao` (cheap baked occlusion).
export function paintVertices(g, color, ao = 0) {
  const pos = g.attributes.position, n = pos.count, cols = new Float32Array(n * 3), fn = typeof color === 'function';
  let y0 = 0, hgt = 1;
  if (ao) { g.computeBoundingBox(); y0 = g.boundingBox.min.y; hgt = Math.max(1e-3, g.boundingBox.max.y - y0); }
  for (let i = 0; i < n; i++) {
    const c = fn ? color(pos.getX(i), pos.getY(i), pos.getZ(i)) : color;
    const k = ao ? 1 - ao * (1 - Math.min(1, (pos.getY(i) - y0) / hgt)) : 1;
    cols[i * 3] = c.r * k; cols[i * 3 + 1] = c.g * k; cols[i * 3 + 2] = c.b * k;
  }
  g.setAttribute('color', new THREE.BufferAttribute(cols, 3));
  return g;
}
