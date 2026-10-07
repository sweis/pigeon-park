// Seeded RNG shared by genetics + sim so scripted runs replay identically.
// setSeed(n) switches to a deterministic mulberry32 stream; default seed is time-based.

const MUL = 0x6d2b79f5;
const mulberryOut = (s) => {
  let t = s;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
// An independent seeded stream (procedural scenery scatter), separate from the sim's.
export const mulberry32 = (seed) => () => mulberryOut(seed = (seed + MUL) >>> 0);

let state = (Date.now() ^ 0x9e3779b9) >>> 0;
let seeded = false;

export function setSeed(n) { state = (n >>> 0) || 1; seeded = true; }
export function isSeeded() { return seeded; }
// Snapshot / restore the stream (so boot-time warm-up work never shifts a seeded run).
export const rngState = () => state;
export function restoreRng(s) { state = s; }

export function rand() { state = (state + MUL) >>> 0; return mulberryOut(state); }
