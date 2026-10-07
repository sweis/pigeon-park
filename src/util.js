// Pigeon Park — small shared helpers for the view / UI side (three.js maths, DOM odds and ends). The sim never
// imports this: it stays free of three.js and the DOM.

import * as THREE from 'three';

// Frame-rate independent exponential smoothing of a toward b.
export const damp = (a, b, k, dt) => a + (b - a) * (1 - Math.exp(-k * dt));
// ...for angles (radians): turns the short way round.
const TAU = Math.PI * 2;
export function angDamp(a, b, k, dt) { const d = ((b - a + Math.PI) % TAU + TAU) % TAU - Math.PI; return a + d * (1 - Math.exp(-k * dt)); }

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

// ---------- UI odds and ends ----------
// A random element for cosmetic choices (UI copy, captions): Math.random, so it never touches the sim's seeded stream.
export const pickUnseeded = (a) => a[Math.floor(Math.random() * a.length)];
// q-th quantile (0..1) of a list of numbers (frame-time readouts).
export function percentile(arr, q) {
  if (!arr.length) return 0;
  const s = [...arr].sort((x, y) => x - y);
  return s[Math.min(s.length - 1, Math.floor(q * s.length))];
}
// "Sir Reginald III" → "sir-reginald-iii" (download file names).
export const fileSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// Make sure the brand fonts are ready before drawing text onto a canvas (falls back to system fonts).
export async function loadFonts(...specs) { try { await Promise.all(specs.map(s => document.fonts.load(s))); } catch (e) { /* system fonts */ } }
export const nextFrame = () => new Promise(r => requestAnimationFrame(r));
// localStorage that never throws (private windows, blocked storage, full quota): JSON in, JSON out.
export const store = {
  get(k, fallback = null) {
    let v; try { v = localStorage.getItem(k); } catch (e) { return fallback; }
    if (v == null) return fallback;
    try { return JSON.parse(v); } catch (e) { return v; } // (a plain string stored by an older build)
  },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } },
  del(k) { try { localStorage.removeItem(k); } catch (e) { /* fine */ } },
};
// What a bird's speech bubble says, and its style (the HUD and the video clips draw the same bubbles).
export const emoteText = (e) => e.kind === 'heart' ? '♥' : e.kind === 'zzz' ? 'z z z' : e.text || '!';
export const emoteKind = (e) => e.kind === 'heart' || e.kind === 'zzz' ? e.kind : 'say';
// Video clip format (clip.js loads lazily; the UI quotes these).
export const CLIP = { w: 1080, h: 1920, fps: 30, secs: 6 };
// Brand colours for canvas-drawn cards and captions (the same tokens as style.css).
export const BRAND = { ink: '#201e1d', paper: '#f5ead8', accent: '#c67139', cream: '#fff7e8' };
