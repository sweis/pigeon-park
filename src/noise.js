// Pigeon Park — deterministic hash / value noise for procedural colour and shape (no RNG state touched).

export function hash3(x, y, z, s) {
  const h = Math.sin(x * 127.1 + y * 311.7 + z * 74.7 + s * 17.3) * 43758.5453;
  return h - Math.floor(h);
}
const smooth = (t) => t * t * (3 - 2 * t);
// Smooth-ish 3D value noise at point p ({x, y, z}), seed s → 0..1.
export function vnoise3(p, s) {
  const fx = Math.floor(p.x), fy = Math.floor(p.y), fz = Math.floor(p.z);
  const sx = smooth(p.x - fx), sy = smooth(p.y - fy), sz = smooth(p.z - fz);
  let r = 0;
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) for (let k = 0; k < 2; k++) {
    const w = (i ? sx : 1 - sx) * (j ? sy : 1 - sy) * (k ? sz : 1 - sz);
    r += w * hash3(fx + i, fy + j, fz + k, s);
  }
  return r;
}
// 2D value noise (terrain tints, lumpy rocks and bushes).
export function vnoise2(x, y, s = 0) {
  const h = (i, j) => { const v = Math.sin(i * 127.1 + j * 311.7 + s * 91.3) * 43758.5453; return v - Math.floor(v); };
  const fx = Math.floor(x), fy = Math.floor(y), sx = smooth(x - fx), sy = smooth(y - fy);
  return (h(fx, fy) * (1 - sx) + h(fx + 1, fy) * sx) * (1 - sy) + (h(fx, fy + 1) * (1 - sx) + h(fx + 1, fy + 1) * sx) * sy;
}
