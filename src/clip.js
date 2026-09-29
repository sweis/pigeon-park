// Pigeon Park — short vertical video clips of one bird, made for TikTok / Instagram Reels / YouTube Shorts.
// 9:16 at 1080×1920, 30 fps, 6 s. Rendered offline frame by frame (never screen-recorded), so the result
// doesn't depend on how fast the device is: each frame steps the real park one tick, renders it from a
// slow orbiting close-up camera, draws the captions over it on a 2D canvas and hands that to WebCodecs.
// The soundtrack is rendered offline too (the park's current song + the coos that happened while filming).
// Muxing uses mediabunny; this whole module (and it) loads only when a clip is made. Output: MP4 (H.264 + AAC, or Opus where the
// browser has no AAC encoder); browsers without H.264 encoding fall back to WebM (VP9 + Opus).

import * as THREE from 'three';
import * as M from './genetics.js';
import { birdHeight } from './pigeon3d.js';
import { renderMusic } from './audio.js';
import { FOUNTAIN } from './sim.js';
// named imports so only the MP4/WebM writers + encoders are bundled (this module itself is loaded lazily)
import { Output, Mp4OutputFormat, WebMOutputFormat, BufferTarget, CanvasSource, AudioBufferSource, getFirstEncodableVideoCodec, getFirstEncodableAudioCodec } from 'mediabunny';

export const CLIP = { w: 1080, h: 1920, fps: 30, secs: 6 };

// Which container/codecs this browser can make, best first. null: no WebCodecs video encoder at all.
export async function clipSupport(w = CLIP.w, h = CLIP.h) {
  if (typeof VideoEncoder === 'undefined') return null;
  const video = await getFirstEncodableVideoCodec(['avc', 'vp9', 'av1', 'vp8'], { width: w, height: h });
  if (!video) return null;
  const mp4 = video === 'avc';
  const audio = typeof AudioEncoder === 'undefined' ? null : await getFirstEncodableAudioCodec(mp4 ? ['aac', 'opus'] : ['opus'], { numberOfChannels: 2, sampleRate: 48000 });
  return { video, audio, container: mp4 ? 'mp4' : 'webm' };
}

// The captions: what flashes up, and when. Pure (no DOM), so tests and notes can print it.
export function clipScript(p) {
  const breed = p.breeds[0], ph = p.pheno;
  const rare = [...ph.traits].sort((a, b) => b.tier - a.tier)[0];
  const hidden = M.carriersOf(p.genome);
  const line = breed ? breed.blurb : rare && M.PEDIA[rare.key] ? M.PEDIA[rare.key] : M.pick(M.THOUGHTS) + '.';
  const shown = breed ? ph.traits.filter(x => !(x.key.split(':')[0] in breed.req)).sort((a, b) => b.tier - a.tier)[0] : rare;
  const facts = [
    `Generation ${p.gen}`,
    shown ? shown.label : ph.label,
    hidden.length ? `Secretly carries ${hidden.length === 1 ? hidden[0].label.toLowerCase() : hidden.length + ' hidden genes'}` : 'Hides nothing. Respect.',
    ph.sparkTier >= 3 ? 'Rarity: impossible' : ph.sparkTier === 2 ? 'Rarity: rare' : null,
  ].filter(Boolean).slice(0, 3);
  return {
    name: p.name,
    badge: breed ? '★ ' + breed.name : ph.label,
    badgeBreed: !!breed,
    line,
    facts,
    beats: { kicker: .25, name: .4, badge: 1.2, line: 2.1, lineOut: 3.9, facts: 3.9, factGap: .38, end: 5.25 },
  };
}

const ease = (k) => 1 - Math.pow(1 - Math.min(1, Math.max(0, k)), 3);
// pop-in: overshoot then settle (0 → 1.08 → 1)
const pop = (k) => k <= 0 ? 0 : k >= 1 ? 1 : k < .6 ? ease(k / .6) * 1.08 : 1.08 - .08 * ease((k - .6) / .4);

function wrap(g, text, maxW) {
  const words = String(text).split(/\s+/), lines = []; let cur = '';
  for (const w of words) { const t = cur ? cur + ' ' + w : w; if (g.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; }
  if (cur) lines.push(cur);
  return lines;
}
function rrect(g, x, y, w, h, r) { g.beginPath(); g.roundRect(x, y, w, h, r); }

// A tilted "sticker": rounded card with a drop shadow, text inside. (x, y) = top-left before transform.
function sticker(g, lines, { x, y, font, lh, pad, bg, fg, rot = 0, s = 1, a = 1, maxW }) {
  if (s <= 0 || a <= 0) return 0;
  g.save(); g.font = font;
  const w = Math.min(maxW, Math.max(...lines.map(l => g.measureText(l).width))) + pad * 2, h = lines.length * lh + pad * 1.4;
  g.globalAlpha = a; g.translate(x + w / 2, y + h / 2); g.rotate(rot); g.scale(s, s); g.translate(-w / 2, -h / 2);
  g.shadowColor = 'rgba(32,30,29,.28)'; g.shadowBlur = 24; g.shadowOffsetY = 8;
  g.fillStyle = bg; rrect(g, 0, 0, w, h, Math.min(28, h / 2)); g.fill();
  g.shadowColor = 'transparent'; g.fillStyle = fg; g.textBaseline = 'alphabetic';
  lines.forEach((l, i) => g.fillText(l, pad, pad * .7 + lh * (i + .78), maxW));
  g.restore();
  return h;
}

// Draw the captions for time t (seconds) over the frame. Layout keeps clear of the platforms' own UI:
// nothing in the top ~6 %, the bottom ~18 % or the right ~14 % (like / share buttons).
export function drawCaptions(g, sc, t, W, H) {
  const u = W / 1080, L = 72 * u, maxW = 820 * u, B = sc.beats;
  const out = t > B.end ? 1 - ease((t - B.end) / .25) : 1; // everything clears for the end card
  // corner bug: small "Pigeon Park" pill for the whole clip
  sticker(g, ['Pigeon Park'], { x: L, y: 130 * u, font: `${34 * u}px Caprasimo, serif`, lh: 40 * u, pad: 22 * u, bg: 'rgba(245,234,216,.92)', fg: '#201e1d', s: pop((t - .05) / .35), a: out, maxW });
  // lower block
  let y = 1020 * u;
  sticker(g, ['MEET'], { x: L, y, font: `800 ${30 * u}px Figtree, sans-serif`, lh: 34 * u, pad: 16 * u, bg: '#201e1d', fg: '#f5ead8', rot: -.05, s: pop((t - B.kicker) / .3), a: out, maxW });
  y += 70 * u;
  g.font = `${88 * u}px Caprasimo, serif`;
  const nameLines = wrap(g, sc.name, maxW - 60 * u).slice(0, 2);
  y += sticker(g, nameLines, { x: L, y, font: `${88 * u}px Caprasimo, serif`, lh: 96 * u, pad: 30 * u, bg: '#f5ead8', fg: '#201e1d', rot: -.015, s: pop((t - B.name) / .4), a: out, maxW }) + 22 * u;
  const bs = pop((t - B.badge) / .35);
  y += sticker(g, [sc.badge], { x: L + 12 * u, y, font: `800 ${46 * u}px Figtree, sans-serif`, lh: 54 * u, pad: 24 * u, bg: sc.badgeBreed ? '#c67139' : '#7a8a5e', fg: '#fff7e8', rot: .03, s: bs, a: out, maxW }) + 26 * u;
  // the funny line, then the facts one after another in its place
  if (t < B.lineOut + .3) {
    g.font = `600 ${40 * u}px Figtree, sans-serif`;
    const k = t < B.lineOut ? pop((t - B.line) / .35) : 1 - ease((t - B.lineOut) / .3);
    sticker(g, wrap(g, sc.line, maxW - 50 * u).slice(0, 4), { x: L, y, font: `600 ${40 * u}px Figtree, sans-serif`, lh: 50 * u, pad: 26 * u, bg: 'rgba(249,244,237,.95)', fg: '#2e2b25', rot: -.012, s: k, a: out * Math.min(1, k * 2), maxW });
  } else {
    sc.facts.forEach((f, i) => {
      const k = pop((t - B.facts - .15 - i * B.factGap) / .3);
      y += sticker(g, [f], { x: L + (i % 2 ? 26 : 0) * u, y, font: `700 ${40 * u}px Figtree, sans-serif`, lh: 48 * u, pad: 22 * u, bg: i === 2 ? '#2c2541' : '#f0fae1', fg: i === 2 ? '#e3dcff' : '#3d472b', rot: (i % 2 ? .025 : -.02), s: k, a: out, maxW }) * Math.min(1, k) + 14 * u;
    });
  }
  // end card
  if (t > B.end) {
    const k = pop((t - B.end - .12) / .4);
    g.save(); g.globalAlpha = Math.min(1, (t - B.end) / .3) * .5; g.fillStyle = '#201e1d'; g.fillRect(0, 0, W, H); g.restore();
    const y0 = H * .4;
    sticker(g, ['Pigeon Park'], { x: W / 2 - 330 * u, y: y0, font: `${110 * u}px Caprasimo, serif`, lh: 118 * u, pad: 40 * u, bg: '#f5ead8', fg: '#201e1d', rot: -.03, s: k, maxW: 900 * u });
    sticker(g, ['breed your own → pigeonpark.live'], { x: W / 2 - 330 * u, y: y0 + 210 * u, font: `800 ${40 * u}px Figtree, sans-serif`, lh: 46 * u, pad: 24 * u, bg: '#c67139', fg: '#fff7e8', rot: .02, s: pop((t - B.end - .3) / .35), maxW: 900 * u });
  }
}

// Camera path: orbit angle a(k) = a0 - .55k at distance d(k) around the bird, k = 0..1 over the clip.
const pathAt = (a0, d0, k) => ({ a: a0 - .55 * ease(k), d: d0 * (1 - .2 * ease(k)) });
// Clearance of the camera→bird sight line from the fountain (the one big thing in the plaza), in metres.
function sightClear(cx, cz, tx, tz) {
  const ex = tx - cx, ez = tz - cz, L = ex * ex + ez * ez || 1;
  const k = Math.max(0, Math.min(1, ((FOUNTAIN.x - cx) * ex + (FOUNTAIN.z - cz) * ez) / L));
  return Math.hypot(cx + ex * k - FOUNTAIN.x, cz + ez * k - FOUNTAIN.z) - (FOUNTAIN.lip + .2);
}
// Start from the bird's three-quarter front if the whole orbit sees past the fountain; otherwise the
// nearest start angle that does (or the least blocked one).
function pickOrbit(x, z, dir, d0) {
  let best = null;
  for (let j = 0; j < 18; j++) {
    const a0 = dir + .85 + (j % 2 ? 1 : -1) * Math.ceil(j / 2) * .35;
    let worst = Infinity;
    for (let k = 0; k <= 1; k += .125) { const { a, d } = pathAt(a0, d0, k); worst = Math.min(worst, sightClear(x + Math.cos(a) * d, z + Math.sin(a) * d, x, z)); }
    if (worst >= 0) return a0;
    if (!best || worst > best.worst) best = { a0, worst };
  }
  return best.a0;
}

// Birds that would block the shot this frame (between the camera and the star, or right at the lens):
// a film crew would shoo them; we hide them for the one render.
function hideBlockers(g, S, id, cam, tgt) {
  const out = [], ex = tgt.x - cam.x, ez = tgt.z - cam.z, L = ex * ex + ez * ez || 1;
  for (const p of S.pigeons) {
    if (p.id === id) continue;
    const v = g.flock.view(p.id); if (!v || !v.g.visible) continue;
    const k = ((v.vis.x - cam.x) * ex + (v.vis.z - cam.z) * ez) / L;
    if (k > .8) continue; // at or behind the star: part of the scene
    const qx = cam.x + ex * Math.max(0, k), qz = cam.z + ez * Math.max(0, k), s = v.size(p, S.t);
    if (Math.hypot(v.vis.x - qx, v.vis.z - qz) < .45 * s + .25 * Math.max(0, k) + .12) { v.g.visible = false; out.push(v); }
  }
  return out;
}

// Speech bubbles (thoughts, hearts, zzz) as the HUD shows them, drawn into the frame at each bird's head.
const _v = new THREE.Vector3();
function drawBubbles(g, S, flock, cam, W, H) {
  const u = W / 1080;
  g.save(); g.font = `700 ${34 * u}px Figtree, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
  for (const p of S.pigeons) {
    if (!p.emote || p.flying) continue;
    const v = flock.view(p.id); if (!v || !v.g.visible) continue;
    _v.set(v.vis.x, v.vis.y + .72 * v.size(p, S.t), v.vis.z).project(cam);
    if (_v.z > 1 || Math.abs(_v.x) > 1.1 || Math.abs(_v.y) > 1.1) continue;
    const x = (_v.x * .5 + .5) * W, y = (-_v.y * .5 + .5) * H;
    const text = p.emote.kind === 'heart' ? '♥' : p.emote.kind === 'zzz' ? 'z z z' : p.emote.text || '!';
    const tw = g.measureText(text).width + 36 * u, th = 56 * u;
    g.shadowColor = 'rgba(32,30,29,.25)'; g.shadowBlur = 10 * u; g.shadowOffsetY = 3 * u;
    g.fillStyle = '#f9f4ed'; rrect(g, x - tw / 2, y - th, tw, th, th / 2); g.fill();
    g.shadowColor = 'transparent'; g.fillStyle = p.emote.kind === 'heart' ? '#c64a5a' : '#2e2b25';
    g.fillText(text, x, y - th / 2 + 2 * u);
  }
  g.restore();
}

// Record a clip of park bird `id`. onProgress(0..1). opts: { w, h, fps, secs } for tests. Returns
// { blob, url, file, mime, w, h, codec, audioCodec, frames } — or throws if the browser can't encode video.
export async function recordClip(game, id, { w = CLIP.w, h = CLIP.h, fps = CLIP.fps, secs = CLIP.secs, onProgress, peek } = {}) {
  const g = game, S = g.sim, p0 = S.byId(id);
  if (!p0 || p0.flying) throw new Error('That pigeon has left the park.');
  const sup = await clipSupport(w, h);
  if (!sup) throw new Error('This browser can’t make videos (no WebCodecs video encoder). Try a recent Chrome, Edge or Safari.');
  try { await Promise.all([document.fonts.load(`${88 * w / 1080}px Caprasimo`), document.fonts.load(`800 ${40 * w / 1080}px Figtree`)]); } catch (e) { /* fall back to system fonts */ }
  const sc = clipScript(p0), N = Math.round(secs * fps);
  const output = new Output({
    format: sup.container === 'mp4' ? new Mp4OutputFormat({ fastStart: 'in-memory' }) : new WebMOutputFormat(),
    target: new BufferTarget(),
  });
  const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h;
  const c2 = canvas.getContext('2d');
  const video = new CanvasSource(canvas, { codec: sup.video, bitrate: 8e6, keyFrameInterval: 2 });
  output.addVideoTrack(video, { frameRate: fps });
  const audio = sup.audio ? new AudioBufferSource({ codec: sup.audio, bitrate: 160e3 }) : null;
  if (audio) output.addAudioTrack(audio);
  await output.start();
  try { return await film(); } catch (e) { await output.cancel().catch(() => {}); throw e; } // never leave an encoder open

  async function film() {
  // take over the renderer: the live loop pauses, the drawing buffer becomes the clip frame
  // (while g.recording: no resize, photos or monument pictures touch it, and the finder draws nothing)
  const r = g.renderer, pr = r.getPixelRatio();
  const cam = new THREE.PerspectiveCamera(40, w / h, .05, 400);
  cam.setViewOffset(w, h, 0, h * .16, w, h); // the bird sits in the upper half; captions own the lower half
  const sfx = [];
  g.recording = true; g.clipSfx = (e, t) => sfx.push({ ...e, t });
  r.setPixelRatio(1); r.setSize(w, h, false);
  const tgt = new THREE.Vector3(), look = new THREE.Vector3(), peeks = {};
  let acc = 0, a0 = 0, d0 = 1;
  try {
    for (let i = 0; i < N; i++) {
      const t = i / fps;
      if (i) { acc += 1 / fps; while (acc >= 1 / 30 - 1e-9) { S.step(); acc -= 1 / 30; } } // the park keeps living
      g.clipTime = t;
      const p = S.byId(id), v = g.flock.view(id);
      // camera: a slow push-in orbit from the bird's three-quarter front, easing along with it as it walks
      if (p && v) {
        const s = v.size(p, S.t), ht = birdHeight(p.pheno) * s;
        look.set(v.vis.x, v.vis.y + ht * .5, v.vis.z);
        if (i === 0) tgt.copy(look); else tgt.lerp(look, .12);
        // start near the bird's three-quarter front (like photos), swing round toward its face while closing in
        // (a 9:16 frame is narrow: distance is set by the bird's length, not its height)
        if (i === 0) { d0 = Math.max(3.1 * s, 2.4 * ht) + .45; a0 = pickOrbit(tgt.x, tgt.z, p0.dir, d0); }
        const { a, d } = pathAt(a0, d0, t / secs);
        let cx = tgt.x + Math.cos(a) * d, cz = tgt.z + Math.sin(a) * d;
        const fx = cx - FOUNTAIN.x, fz = cz - FOUNTAIN.z, fr = Math.hypot(fx, fz), R = FOUNTAIN.lip + .35;
        if (fr < R) { cx = FOUNTAIN.x + fx / (fr || 1) * R; cz = FOUNTAIN.z + fz / (fr || 1) * R; } // never inside the basin
        cam.position.set(cx, tgt.y + .2 + .35 * s * (1 - ease(t / secs)), cz);
        cam.lookAt(tgt);
      }
      g.animate(i ? 1 / fps : 0, cam.position);
      g.flock.sel.visible = false;
      g.world.updateOcclusion(cam.position, tgt, 1 / fps);
      for (const fv of g.flock.views.values()) fv.rig.setLod(0);
      const hidden = hideBlockers(g, S, id, cam.position, tgt);
      r.render(g.scene, cam);
      c2.drawImage(r.domElement, 0, 0, w, h);
      drawBubbles(c2, S, g.flock, cam, w, h);
      for (const fv of hidden) fv.g.visible = true;
      drawCaptions(c2, sc, t, w, h);
      if (peek?.includes(i)) peeks[i] = canvas.toDataURL('image/jpeg', .85); // test hook: sampled frames
      await video.add(t, 1 / fps);
      onProgress?.((i + 1) / N * (audio ? .9 : 1));
      if (i % 3 === 2) await new Promise(res => setTimeout(res, 0)); // let the progress bar paint
    }
  } finally {
    g.recording = false; g.clipSfx = null; g.last = performance.now();
    r.setPixelRatio(pr); g.resize(); // back to the window (it may have been rotated meanwhile)
  }
  video.close();
  if (audio) {
    const song = g.audio.music?.songId || (S.night > .55 ? 'night' : 'strut');
    const pitch = g.cooPitch(p0);
    const { buffer } = await renderMusic(song, secs, {
      extras: (a) => {
        // the star coos on cue; everything the park said while filming comes in at its own moment.
        // In time order: coo() skips anything within 0.12 s after the last one it scheduled.
        const coos = [{ t: .55, voice: p0.pheno.e.voice, vol: 1.1, pitch }, { t: 3.3, voice: p0.pheno.e.voice, vol: .9, pitch }];
        for (const e of sfx) if (e.name === 'coo' && e.t > .8) coos.push({ t: e.t, voice: e.voice, vol: (e.vol ?? 1) * .5, pitch: e.pitch || 1, pan: e.pan || 0 });
        coos.sort((x, y) => x.t - y.t).forEach(c => a.coo(c.voice, c.vol, c.pitch, c.pan || 0, c.t));
      },
    });
    await audio.add(buffer);
    audio.close();
  }
  await output.finalize();
  onProgress?.(1);
  const mime = output.format.mimeType, ext = output.format.fileExtension;
  const blob = new Blob([output.target.buffer], { type: mime });
  const slug = p0.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return { blob, url: URL.createObjectURL(blob), file: `pigeon-${slug}${ext}`, mime, w, h, codec: sup.video, audioCodec: sup.audio, frames: N, name: p0.name, peeks };
  }
}
