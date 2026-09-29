// Pigeon Park — boot, main loop, input, persistence and the debug API (window.pp).

import * as THREE from 'three';
import * as M from './genetics.js';
import { setSeed, isSeeded } from './rng.js';
import { Sim, FIXED_DT, PARK, pureGenome, migrateLegacy } from './sim.js';
import { World } from './world.js';
import { FlockView } from './view.js';
import { makeMaterials, PigeonRig, geometryCacheSize, birdHeight } from './pigeon3d.js';
import { CameraRig } from './camera.js';
import { Fx } from './fx.js';
import { Audio, SONGS, renderMusic } from './audio.js';
import { Portraits } from './portraits.js';
import { UI } from './ui.js';
import { Diagnostics } from './debug.js';
import { startHappening, HAPPENINGS } from './happenings.js';
import { Monuments } from './monuments.js';
import { ACHIEVEMENTS, checkAchievements } from './achievements.js';

const BUILD = typeof __BUILD__ !== 'undefined' ? __BUILD__ : { version: 'dev', hash: 'local', date: '' };
const SAVE_KEY = 'pigeon-park-3d-v1', LEGACY_KEY = 'pigeon-park-save-v1', GFX_KEY = 'pigeon-park-gfx';
const params = new URLSearchParams(location.search);
const flag = (k) => params.has(k) && params.get(k) !== '0';

// ---------- quality tier ----------
function pickQuality() {
  const ua = navigator.userAgent;
  const mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua) || (navigator.maxTouchPoints > 1 && Math.min(innerWidth, innerHeight) < 820);
  let tier = params.get('quality') || (() => { try { return localStorage.getItem(GFX_KEY); } catch { return null; } })() || (mobile ? 'medium' : 'high');
  const Q = {
    // birdShadows: birds cast sun shadows (high only; elsewhere their soft contact shadow does the job)
    high: { tier: 'high', antialias: true, shadows: true, shadowMap: 2048, lampLights: 4, low: false, pr: 2, birdShadows: true },
    medium: { tier: 'medium', antialias: false, shadows: true, shadowMap: 1024, lampLights: 2, low: true, pr: 2, birdShadows: false },
    low: { tier: 'low', antialias: false, shadows: false, shadowMap: 512, lampLights: 0, low: true, pr: 1.5, birdShadows: false },
  };
  return { ...(Q[tier] || Q.high), mobile };
}

class Game {
  constructor() {
    this.q = pickQuality();
    this.version = BUILD;
    this.sim = new Sim();
    this.frozen = false; this.paused = false; this.stepQueue = 0; this.acc = 0; this.time = 0;
    this.simdt = params.has('simdt') ? +params.get('simdt') : null;
    this.frameMs = []; this.lastShaderError = null; this.contextLost = false;
    this.nosave = flag('nosave');
    this.find = null;          // trait finder: { key, until } — birds showing (green) / carrying (yellow) it get marked
    this.keys = new Set();     // held camera keys (desktop WASD / arrows / Q E)
  }

  async boot() {
    if (params.has('seed')) setSeed(+params.get('seed'));
    const canvas = document.getElementById('c');
    const r = this.renderer = new THREE.WebGLRenderer({ canvas, antialias: this.q.antialias, powerPreference: 'high-performance' });
    r.setPixelRatio(Math.min(devicePixelRatio || 1, this.q.pr));
    r.setSize(innerWidth, innerHeight, false);
    r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.0;
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.shadowMap.enabled = this.q.shadows;
    r.shadowMap.type = THREE.PCFShadowMap; // PCFSoft was removed in r18x; PCF + shadow.radius is soft
    r.debug.onShaderError = (gl, prog, vs, fs) => { this.lastShaderError = (gl.getProgramInfoLog(prog) || 'shader error').slice(0, 300); console.error('[shader]', this.lastShaderError); };
    canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); this.contextLost = true; this.onContextLost(); });
    canvas.addEventListener('webglcontextrestored', () => location.reload());
    const gl = r.getContext(), dbg = gl.getExtension('WEBGL_debug_renderer_info');
    this.gpu = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);

    this.scene = new THREE.Scene();
    this.cam = new CameraRig(innerWidth / innerHeight);
    this.world = new World(r, this.scene, this.q);
    this.mats = makeMaterials();
    this.flock = new FlockView(this.scene, this.mats, this.q);
    this.fx = new Fx(this.scene);
    this.monuments = new Monuments(this.scene, this.world.propMat);
    this.audio = new Audio();
    this.portraits = new Portraits(r, this.q.low);

    this.warmUp();
    this.load();
    this.ui = new UI(this);
    this.ui.seen = { ...this.ui.seen, ...(this.savedUI?.seen || {}) };
    this.ui.introDone = !!this.savedUI?.introDone;
    const su = this.savedUI || {};
    this.audio.sfxOn = su.sfxOn ?? !su.muted; this.audio.musicOn = su.musicOn ?? true;
    if (su.sfxVol != null) this.audio.sfxVol = su.sfxVol; if (su.musicVol != null) this.audio.musicVol = su.musicVol;
    this.ui.renderSound();
    this.monuments.sync(this.sim.achievements, false);
    checkAchievements(this.sim, true); // catch an older save up on anything it has already earned
    this.monuments.sync(this.sim.achievements, false);
    this.diag = new Diagnostics(this, flag('debug'));
    this.bindInput();
    addEventListener('resize', () => this.resize());
    // iOS Safari ignores user-scalable=no for pinch; its non-standard gesture events can still be cancelled
    for (const ev of ['gesturestart', 'gesturechange']) document.addEventListener(ev, (e) => e.preventDefault(), { passive: false });
    document.addEventListener('dblclick', (e) => e.preventDefault(), { passive: false });
    this.saveTimer = setInterval(() => this.save(), 6000);
    document.addEventListener('visibilitychange', () => { if (document.hidden) this.save(); });
    addEventListener('pagehide', () => this.save());
    this.last = performance.now();
    this.render(0);
    this.programsAfterBoot = r.info.programs.length;
    document.getElementById('loading').classList.add('done');
    setTimeout(() => document.getElementById('loading').remove(), 700);
    requestAnimationFrame((t) => this.frame(t));
  }

  // Compile every material/effect behind the loading screen so nothing compiles mid-game.
  warmUp() {
    const kinds = { clay: {}, metal: { fantasy: 'gold' }, glow: { glow: 'glow' }, voidglow: { glow: 'glow', fantasy: 'void' }, facet: { fantasy: 'coalore' }, gem: { fantasy: 'diamond' } };
    const rigs = [];
    Object.values(kinds).forEach((over, i) => {
      const ph = M.computePheno(pureGenome(over), null);
      const rig = new PigeonRig(ph, this.mats);
      rig.group.position.set(i * .8 - 1.6, 0, 2); this.scene.add(rig.group); rigs.push(rig);
      this.portraits.get(ph);
    });
    this.sim.eggs.push({ id: -1, x: 0, z: 2, laidAt: 0, hatchAt: 1, genome: null }, { id: -2, x: .5, z: 2, laidAt: 0, hatchAt: 1, genome: null, golden: true });
    this.sim.bread = { x: 0, z: 2.5, hp: .5, a: 0 }; // bread happening props
    this.sim.ufo = { x: 0, z: 0, y: 4, beam: 1 }; this.sim.rain = 1; this.flock.rainAmt = 1;
    this.fx.burst(0, .5, 2, 3);
    this.sim.spawn({ genome: pureGenome({}), name: 'warm-up', adult: true, quiet: true, x: 0, z: 1 }); // a finder marker target
    this.flock.update(this.sim, 0, 0, null, 'pattern:bar');
    this.sim.family = {}; this.sim.lids = 1; this.sim.ids = 1;
    this.sim.pigeons.length = 0;
    this.flock.halos[0].visible = true;
    this.world.setHour(22, 1);
    this.renderer.compile(this.scene, this.cam.cam);
    this.renderer.render(this.scene, this.cam.cam);
    rigs.forEach(r => { this.scene.remove(r.group); r.dispose(); });
    this.sim.eggs.length = 0; this.sim.bread = null; this.sim.ufo = null; this.sim.rain = 0; this.flock.rainAmt = 0;
    this.flock.update(this.sim, 0, 0);
    this.fx.parts.length = 0; this.fx.update(0);
  }

  // ---------- persistence ----------
  load() {
    let d = null;
    if (!flag('fresh')) {
      try {
        d = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
        if (!d) { d = migrateLegacy(JSON.parse(localStorage.getItem(LEGACY_KEY) || 'null')); if (d) this.migrated = true; }
      } catch (e) { d = null; }
    }
    if (d) { this.sim.restore(d); this.savedUI = d.ui; }
    if (params.has('hour')) this.sim.setTimeOfDay(+params.get('hour'));
    this.sim.initFlock(d);
    this.sim.events.length = 0;
    if (this.migrated) setTimeout(() => this.ui.toast('Your prototype flock has moved into the new park.', 'note'), 600);
  }
  save() {
    if (this.nosave || !this.sim.ready) return; // never write before the flock has loaded
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(this.sim.serialize({ ui: { seen: this.ui?.seen, introDone: this.ui?.introDone, sfxOn: this.audio?.sfxOn, musicOn: this.audio?.musicOn, sfxVol: this.audio?.sfxVol, musicVol: this.audio?.musicVol }, build: BUILD })));
    } catch (e) { /* storage full or blocked — fine */ }
  }
  resetAll() {
    try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
    const keep = { speed: this.sim.speed, mut: this.sim.mut, whimsy: this.sim.whimsy, ph: this.sim.phase() }, nextId = this.sim.ids;
    this.sim.reset(); this.sim.restore(keep);
    this.sim.ids = nextId; // ids keep counting so no new bird inherits an old bird's 3D view
    this.cam.follow = null; this.findTrait(null);
    this.sim.initFlock(null);
    this.monuments.clear();
    this.ui.roostSel = null; this.ui.seen = { pedia: 0, breeds: 0 };
    this.cam.shot('overview', { snap: false });
    this.ui.toast('A fresh delegation of civic pigeons arrives.', 'note');
    this.save();
  }

  // ---------- selection / camera ----------
  select(id, keepRoost) {
    this.sim.selId = id;
    if (!keepRoost) this.ui.roostSel = null;
    if (id == null && this.cam.follow != null) this.cam.shot('overview', { snap: false });
    this.ui.refreshT = 0;
  }
  toggleFollow(id) {
    if (this.cam.follow === id) this.cam.shot('overview', { snap: false });
    else { this.select(id); this.cam.shot('follow', { id, snap: false }); }
    this.ui.refreshT = 0;
  }

  // Trait finder: mark every bird that shows (green) or hides (yellow) a trait for a while. null clears it.
  findTrait(key) {
    this.find = key ? { key, until: performance.now() + FIND_MS } : null;
    this.ui.renderFind();
  }

  // ---------- input ----------
  bindInput() {
    const c = this.renderer.domElement;
    const pointers = new Map();
    let drag = null, cand = null, orbit = null, pinch = null, lastTap = { t: 0, id: null };
    const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const toRay = (x, y) => { ndc.set(x / innerWidth * 2 - 1, -(y / innerHeight) * 2 + 1); ray.setFromCamera(ndc, this.cam.cam); return ray.ray; };
    const ground = (x, y) => { const p = new THREE.Vector3(); return toRay(x, y).intersectPlane(plane, p) ? p : null; };
    // Exact ray hit first; otherwise the nearest bird within a fingertip of the tap (small, distant birds).
    this.pickAt = (x, y, touch = false) => {
      const hit = this.flock.pick(toRay(x, y), this.sim);
      if (hit != null) return hit;
      let best = null, bd = touch ? 34 : 14; const v = new THREE.Vector3();
      for (const p of this.sim.pigeons) {
        const fv = this.flock.view(p.id); if (!fv || p.flying) continue;
        v.set(fv.vis.x, fv.vis.y + .25 * fv.size(p, this.sim.t), fv.vis.z).project(this.cam.cam);
        if (v.z > 1) continue;
        const d = Math.hypot((v.x * .5 + .5) * innerWidth - x, (-v.y * .5 + .5) * innerHeight - y);
        if (d < bd) { bd = d; best = p.id; }
      }
      return best;
    };

    c.addEventListener('pointerdown', (e) => {
      this.audio.unlock();
      c.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2) { // pinch
        cand = null; orbit = null;
        const [a, b] = [...pointers.values()];
        pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2 };
        if (drag) { const p = this.sim.byId(drag.id); if (p) this.sim.drop(drag.id, p.x, p.z); drag = null; this.ui.ghost(null); this.ui.setOverRoost(false); }
        return;
      }
      const id = this.pickAt(e.clientX, e.clientY, e.pointerType === 'touch');
      const mon = id == null ? this.monuments.pick(toRay(e.clientX, e.clientY)) : null;
      if (mon) { this.ui.openAchievement(mon); return; }
      if (id != null) {
        const now = performance.now();
        if (lastTap.id === id && now - lastTap.t < 350) this.toggleFollow(id);
        lastTap = { t: now, id };
        cand = { id, x: e.clientX, y: e.clientY };
        this.select(id);
        const p = this.sim.byId(id); if (p) this.audio.play('coo', { voice: p.pheno.e.voice, vol: .8, pitch: this.cooPitch(p) });
      } else {
        orbit = { x: e.clientX, y: e.clientY, moved: 0, btn: e.button };
      }
    });
    c.addEventListener('pointermove', (e) => {
      const pp = pointers.get(e.pointerId); if (!pp) return;
      const dx = e.clientX - pp.x, dy = e.clientY - pp.y;
      pp.x = e.clientX; pp.y = e.clientY;
      if (pinch && pointers.size === 2) {
        // two fingers: the midpoint pans (the ground follows the fingers), the spread zooms toward them
        const [a, b] = [...pointers.values()], d = Math.hypot(a.x - b.x, a.y - b.y), cx = (a.x + b.x) / 2, cy = (a.y + b.y) / 2;
        const g0 = ground(pinch.cx, pinch.cy), g1 = ground(cx, cy);
        if (g0 && g1) this.cam.pan(g0.x - g1.x, g0.z - g1.z);
        this.cam.zoomAt(pinch.d / Math.max(20, d), ground(cx, cy));
        this.cam.snapTarget();
        pinch.d = d; pinch.cx = cx; pinch.cy = cy;
        return;
      }
      if (cand && !drag && Math.hypot(e.clientX - cand.x, e.clientY - cand.y) > 8) {
        const p = this.sim.grab(cand.id); if (p) drag = { id: cand.id, pheno: p.pheno };
        if (this.cam.follow === cand.id) this.cam.follow = null;
      }
      if (drag) {
        const g = ground(e.clientX, e.clientY);
        if (g) this.sim.carry(drag.id, Math.max(-PARK.w / 2, Math.min(PARK.w / 2, g.x)), Math.max(-PARK.d / 2, Math.min(PARK.d / 2, g.z)));
        const rr = this.ui.roostRect(), over = e.clientX >= rr.left && e.clientX <= rr.right && e.clientY >= rr.top - 10 && e.clientY <= rr.bottom + 10;
        this.ui.setOverRoost(over);
        this.ui.ghost(over ? drag.pheno : null, e.clientX, e.clientY);
      } else if (orbit) {
        orbit.moved += Math.abs(dx) + Math.abs(dy);
        if (orbit.btn === 2 || e.shiftKey) {
          const s = this.cam.cur.dist * .0012, az = this.cam.cur.az;
          this.cam.pan((-dx * Math.cos(az) - dy * Math.sin(az)) * s, (dx * Math.sin(az) - dy * Math.cos(az)) * s);
        } else this.cam.orbit(dx, dy);
      }
    });
    const up = (e) => {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) pinch = null;
      if (drag) {
        const S = this.sim;
        if (this.ui.overRoost) { if (S.roostAdd(drag.id)) { this.ui.roostSel = S.roost.length - 1; this.select(null, true); } else { const p = S.byId(drag.id); if (p) S.drop(drag.id, p.x, p.z); } }
        else { const p = S.byId(drag.id); if (p) S.drop(drag.id, p.x, p.z); }
        this.ui.setOverRoost(false); this.ui.ghost(null);
        drag = null;
      } else if (orbit && orbit.moved < 6 && e.type === 'pointerup') {
        const now = performance.now();
        if (now - (this.lastEmptyTap || 0) < 350 && this.cam.name !== 'overview') this.cam.shot('overview', { snap: false }); // double-tap empty ground: recenter
        this.lastEmptyTap = now;
        this.select(null); this.ui.roostSel = null;
      }
      cand = null; orbit = null;
    };
    c.addEventListener('pointerup', up);
    c.addEventListener('pointercancel', up);
    c.addEventListener('contextmenu', (e) => e.preventDefault());
    c.addEventListener('wheel', (e) => { e.preventDefault(); this.cam.zoomAt(Math.exp(e.deltaY * .0012), ground(e.clientX, e.clientY)); }, { passive: false });

    let cheat = '';
    addEventListener('keyup', (e) => this.keys.delete(e.code));
    addEventListener('blur', () => this.keys.clear());
    addEventListener('keydown', (e) => {
      if (!e.key || (e.target && /INPUT|TEXTAREA/.test(e.target.tagName))) return;
      if (CAM_KEYS[e.code] && !this.ui.dialog && !e.ctrlKey && !e.metaKey && !e.altKey) { this.keys.add(e.code); if (e.code.startsWith('Arrow')) e.preventDefault(); }
      if (e.key === 'Escape') { if (this.ui.dialog) this.ui.closeDialog(); else if (this.find) this.findTrait(null); else if (this.cam.follow != null) this.cam.shot('overview', { snap: false }); else this.select(null); return; }
      if ((e.key === 'p' || e.key === ' ') && !e.repeat) { if (e.key === ' ') e.preventDefault(); this.togglePause(); if (e.key === 'p') cheat = ''; return; }
      if (e.key === '?') { this.ui.dialog === 'help' ? this.ui.closeDialog() : this.ui.openDialog('help'); return; }
      if (e.key.length !== 1) return;
      cheat = (cheat + e.key.toLowerCase()).slice(-12);
      const code = Object.keys(CODES).find(c => cheat.endsWith(c));
      if (code) { cheat = ''; this.enterCode(code); }
      else if (e.key.toLowerCase() === 'f' && this.sim.selId != null) this.toggleFollow(this.sim.selId);
    });
  }

  // Secret codes: typed anywhere on a keyboard, or entered in Settings (phones).
  enterCode(raw) {
    const code = String(raw || '').toLowerCase().replace(/[^a-z]/g, '');
    const fn = CODES[code];
    if (!fn) { this.ui.toast(pick(['Nothing happens. A pigeon somewhere laughs at you.', 'The park does not recognise that word.', 'Incorrect. The pigeons judge you silently.'])); return false; }
    fn(this.sim);
    return true;
  }

  togglePause(v = !this.paused) {
    this.paused = v; this.last = performance.now(); this.acc = 0;
    this.ui?.renderPause();
  }

  resize() {
    this.renderer.setSize(innerWidth, innerHeight, false);
    this.cam.fit(innerWidth / innerHeight);
  }

  onContextLost() {
    try { const t = ['high', 'medium', 'low'], i = t.indexOf(this.q.tier); localStorage.setItem(GFX_KEY, t[Math.min(2, i + 1)]); } catch (e) {}
    const el = document.createElement('div'); el.className = 'ctxlost';
    el.innerHTML = '<div class="card"><b>Graphics reset</b><p>Your device’s GPU took a nap. Tap to reload at a lighter quality.</p></div>';
    el.onclick = () => location.reload();
    document.body.appendChild(el);
  }

  // ---------- loop ----------
  frame(now) {
    requestAnimationFrame((t) => this.frame(t));
    if (this.contextLost) return;
    let dt = Math.min(.25, Math.max(0, (now - this.last) / 1000));
    this.frameMs.push(now - this.last); if (this.frameMs.length > 240) this.frameMs.shift();
    this.last = now;
    if (this.simdt != null) dt = this.simdt;
    this.camDt = Math.min(.1, (performance.now() - (this.camLast || now)) / 1000) || 1 / 60; this.camLast = performance.now();
    this.render(dt);
  }
  render(dt) {
    const S = this.sim;
    if (this.paused && !this.frozen) dt = 0; // paused: the world holds still, the camera still moves
    if (!this.frozen && !this.paused) {
      this.acc += dt; let n = 0;
      while (this.acc >= FIXED_DT && n < 8) { S.step(); this.acc -= FIXED_DT; n++; }
      if (n >= 8) this.acc = 0; // cap catch-up after a stall
    } else {
      while (this.stepQueue > 0) { S.step(); this.stepQueue--; }
      dt = 0;
    }
    this.time += dt;
    this.drainEvents();
    this.world.setHour(S.hour(), S.night);
    this.world.setRain(this.flock.rainAmt || 0);
    this.audio.setRain(!!S.rain);
    this.audio.setMood(EVENT_MUSIC[S.happening?.kind] || (S.night > .55 ? 'night' : 'day'));
    this.audio.setDuck(this.paused ? .35 : 1);
    this.world.update(dt);
    if (this.find && performance.now() > this.find.until) this.findTrait(null);
    this.flock.update(S, dt, this.time, this.cam.cam.position, this.find?.key);
    this.fx.update(dt);
    this.monuments.update();
    if (this.keys.size) { // held keys → camera intent (fwd, right, rotate) for this frame
      let f = 0, r = 0, rot = 0;
      for (const k of this.keys) { const [a, b, c] = CAM_KEYS[k]; f += a; r += b; rot += c; }
      this.cam.keyMove(Math.sign(f), Math.sign(r), Math.sign(rot), this.camDt || 1 / 60);
    }
    let fp = null;
    if (this.cam.follow != null) { const v = this.flock.view(this.cam.follow), p = S.byId(this.cam.follow); if (v && p && !p.flying) fp = v.vis; else this.cam.shot('overview', { snap: false }); }
    this.cam.update(this.camDt || 1 / 60, fp);
    this.world.updateOcclusion(this.cam.cam.position, this.cam.cur.target, this.camDt || 1 / 60);
    this.renderer.render(this.scene, this.cam.cam);
    this.ui?.frame(dt, this.cam.cam);
    this.diag?.frame();
  }
  // Each bird has its own voice: big birds low, small birds high, plus a fixed per-genome offset.
  cooPitch(p) { return ({ king: .78, dinky: 1.32, chonk: .84 }[p.pheno.e.size] || 1) / Math.pow(p.jit || 1, 2.5); }

  // ---------- photo mode ----------
  // Park birds: a one-off high-res render of the real scene from a close three-quarter camera (same
  // scene, same shader programs). Roost birds: a studio portrait. Either way, composed onto a caption card.
  async photo({ id, roost }) {
    const S = this.sim, W = this.q.mobile ? 1600 : 2400;
    let pheno, name, gen, shot;
    if (id != null) {
      const p = S.byId(id), v = this.flock.view(id); if (!p || !v) return null;
      pheno = p.pheno; name = p.name; gen = p.gen;
      // frame the whole bird: aim at half its standing height, back off for tall ones (raised heads, stilts, hats)
      const s = v.size(p, S.t), ht = birdHeight(p.pheno) * s, c = new THREE.Vector3(v.vis.x + Math.cos(p.dir) * .04 * s, v.vis.y + ht * .52, v.vis.z + Math.sin(p.dir) * .04 * s);
      const cam = new THREE.PerspectiveCamera(30, 1, .05, 400), a = p.dir + .8, d = 1.9 * Math.max(ht, .6 * s) + .3;
      cam.position.set(c.x + Math.cos(a) * d, c.y + .12 * s + .12, c.z + Math.sin(a) * d); cam.lookAt(c);
      shot = this.renderView(cam, W, W);
    } else {
      const b = S.roost[roost]; if (!b) return null;
      pheno = M.computePheno(b.genome, b.accessory); name = b.name; gen = b.gen;
      shot = this.portraits.studio(pheno, W);
    }
    this.audio.play('shutter');
    const card = await composeCard(shot, { name, gen, pheno, studio: id == null });
    const blob = await new Promise(res => card.toBlob(res, 'image/png'));
    return { blob, url: URL.createObjectURL(blob), name, file: 'pigeon-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.png', w: card.width, h: card.height };
  }

  // One-off render of the real scene from any camera at any size → canvas (photos, monument pictures).
  // Same scene and shader programs as the game; the drawing buffer is resized for one frame and restored.
  renderView(cam, W, H) {
    const r = this.renderer, pr = r.getPixelRatio(), selVis = this.flock.sel.visible;
    cam.aspect = W / H; cam.updateProjectionMatrix();
    this.flock.sel.visible = false;
    for (const fv of this.flock.views.values()) fv.rig.setLod(0); // full detail (LOD is re-chosen next frame)
    r.setPixelRatio(1); r.setSize(W, H, false);
    r.render(this.scene, cam);
    const out = document.createElement('canvas'); out.width = W; out.height = H;
    out.getContext('2d').drawImage(r.domElement, 0, 0, W, H); // same task as the render: buffer still valid
    r.setPixelRatio(pr); r.setSize(innerWidth, innerHeight, false);
    this.flock.sel.visible = selVis; this.render(0);
    return out;
  }
  monumentPicture(id, W = 720, H = 540) {
    const m = this.monuments.get(id); if (!m) return null;
    const cam = new THREE.PerspectiveCamera(32, W / H, .05, 400), d = new THREE.Vector3(-m.x, 0, -m.z).normalize();
    const dist = 1.6 + m.top * 1.1;
    cam.position.set(m.x + d.x * dist + d.z * .6, m.top * .75 + .5, m.z + d.z * dist - d.x * .6);
    cam.lookAt(m.x, m.top * .5, m.z);
    return this.renderView(cam, W, H).toDataURL('image/jpeg', .9);
  }

  drainEvents() {
    const S = this.sim;
    for (const e of S.events) {
      if (e.type === 'toast') this.ui?.toast(e.msg, e.kind);
      else if (e.type === 'sound') {
        const p = e.id != null && S.byId(e.id), o = { ...e, pitch: p ? this.cooPitch(p) : 1 };
        if (p) { // place the coo where the bird is: pan by screen side, quieter with distance
          const v = new THREE.Vector3(p.x, .3, p.z), d = v.distanceTo(this.cam.cam.position);
          o.pan = v.project(this.cam.cam).x * .8; o.vol = (o.vol ?? 1) * Math.min(1, Math.max(.25, 9 / d));
        }
        this.audio.play(e.name, o);
      }
      else if (e.type === 'sparkle') this.fx.burst(e.x, .45, e.z, e.tier);
      else if (e.type === 'hatch') this.fx.ring(e.x, e.z, '#e8b64c');
      else if (e.type === 'roosted') { this.fx.burst(e.x, .4, e.z, 1); this.ui?.renderRoost(); }
      else if (e.type === 'deselect') this.ui && (this.ui.refreshT = 0);
      else if (e.type === 'achievement') this.monuments.add(e.id, true);
    }
    S.events.length = 0;
  }
}

const pick = (a) => a[Math.floor(Math.random() * a.length)];
const FIND_MS = 30000;
const EVENT_MUSIC = { dance: 'dance', conga: 'conga', ufo: 'ufo' }; // happenings with their own song
// Desktop camera keys by physical position (works on AZERTY too): [forward, right, rotate].
const CAM_KEYS = {
  KeyW: [1, 0, 0], ArrowUp: [1, 0, 0], KeyS: [-1, 0, 0], ArrowDown: [-1, 0, 0],
  KeyA: [0, -1, 0], ArrowLeft: [0, -1, 0], KeyD: [0, 1, 0], ArrowRight: [0, 1, 0],
  KeyQ: [0, 0, 1], KeyE: [0, 0, -1],
};
const CODES = {
  rizz: (S) => S.summonLegends(),
  ore: (S) => S.summonOres(),
  bread: (S) => startHappening(S, 'bread'),
  boogie: (S) => startHappening(S, 'dance'),
};

// Photo card: the picture on top, a caption band with name / colour / breeds and a small footer.
async function composeCard(shot, { name, gen, pheno, studio }) {
  const W = shot.width, cap = Math.round(W * .2), c = document.createElement('canvas');
  c.width = W; c.height = W + cap;
  const g = c.getContext('2d');
  try { await Promise.all([document.fonts.load(`${W * .06}px Caprasimo`), document.fonts.load(`600 ${W * .03}px Figtree`)]); } catch (e) {}
  if (studio) { // soft backdrop + contact shadow for studio portraits
    const bg = g.createRadialGradient(W / 2, W * .42, W * .05, W / 2, W / 2, W * .75);
    bg.addColorStop(0, '#f0fae1'); bg.addColorStop(1, '#ccdbb2'); g.fillStyle = bg; g.fillRect(0, 0, W, W);
    g.fillStyle = 'rgba(46,43,37,.16)'; g.beginPath(); g.ellipse(W / 2, W * .86, W * .26, W * .045, 0, 0, Math.PI * 2); g.fill();
  }
  g.drawImage(shot, 0, 0, W, W);
  g.fillStyle = '#f5ead8'; g.fillRect(0, W, W, cap);
  const pad = W * .05;
  g.fillStyle = '#201e1d'; g.font = `${W * .058}px Caprasimo, serif`; g.textBaseline = 'alphabetic';
  g.fillText(name, pad, W + cap * .38, W - pad * 2);
  g.font = `600 ${W * .027}px Figtree, sans-serif`; g.fillStyle = '#474238';
  g.fillText(`${pheno.label} · Generation ${gen}`, pad, W + cap * .6, W - pad * 2);
  const breeds = M.matchBreeds(pheno).map(b => '★ ' + b.name).join('   ');
  const traits = pheno.traits.slice(0, 5).map(t => t.label).join(' · ');
  g.fillStyle = breeds ? '#c67139' : '#645c50'; g.font = `700 ${W * .024}px Figtree, sans-serif`;
  g.fillText(breeds || traits || 'A perfectly ordinary pigeon', pad, W + cap * .8, W - pad * 2);
  g.textAlign = 'right'; g.fillStyle = 'rgba(32,30,29,.45)'; g.font = `600 ${W * .018}px Figtree, sans-serif`;
  g.fillText('Pigeon Park · pigeonpark.live', W - pad, W + cap * .93);
  return c;
}

const game = new Game();
window.__game = game;
game.boot().then(() => { window.pp = makeDebugApi(game); window.ppReady = true; }).catch((e) => {
  console.error(e);
  document.getElementById('loading').innerHTML = '<div class="card"><b>The pigeons could not commute.</b><p>' + String(e.message || e) + '</p></div>';
});

// ---------- debug API ----------
function makeDebugApi(g) {
  const S = g.sim;
  const pct = (a, p) => { if (!a.length) return 0; const s = [...a].sort((x, y) => x - y); return +s[Math.min(s.length - 1, Math.floor(p * s.length))].toFixed(2); };
  const api = {
    build: BUILD,
    getState() {
      const info = g.renderer.info;
      return {
        t: +S.t.toFixed(3), wall: +S.wall.toFixed(3), hour: +S.hour().toFixed(2), night: S.night, frozen: g.frozen, seeded: isSeeded(),
        speed: S.speed, mut: S.mut, whimsy: S.whimsy, paused: g.paused, happening: S.happening?.kind || null, bread: S.bread ? +S.bread.hp.toFixed(2) : null, cap: S.cap, selId: S.selId, follow: g.cam.follow, cam: g.cam.name,
        pop: S.alive(), eggs: S.eggs.length, poops: S.poops.length, court: !!S.court,
        find: g.find?.key || null, findMarks: g.flock.findGems.count, camAz: +g.cam.cur.az.toFixed(3), camTarget: g.cam.cur.target.toArray().map(v => +v.toFixed(2)), dialog: g.ui.dialog, familySize: Object.keys(S.family).length,
        roost: S.roost.map(r => r.name), stats: { ...S.stats },
        breedsFound: Object.keys(S.breeds), breedsTotal: M.BREEDS.length, traitsFound: Object.keys(S.discovered).length, traitsTotal: Object.keys(M.PEDIA).length,
        pigeons: S.pigeons.map(p => ({ id: p.id, lid: p.lid, name: p.name, x: +p.x.toFixed(3), y: +p.y.toFixed(3), z: +p.z.toFixed(3), dir: +p.dir.toFixed(2), state: p.state, flying: p.flying, held: p.held, gen: p.gen, label: p.pheno.label, breeds: p.breeds.map(b => b.id) })),
        render: {
          frameMsP50: pct(g.frameMs, .5), frameMsP99: pct(g.frameMs, .99), drawCalls: info.render.calls, triangles: info.render.triangles,
          programs: info.programs.length, programsAfterBoot: g.programsAfterBoot, geometries: info.memory.geometries, textures: info.memory.textures,
          pigeonGeoCache: geometryCacheSize(), gpu: g.gpu, quality: g.q.tier, pixelRatio: g.renderer.getPixelRatio(),
          contextLost: g.contextLost, lastShaderError: g.lastShaderError,
        },
      };
    },
    freeze() { g.frozen = true; }, resume() { g.frozen = false; g.last = performance.now(); },
    step(n = 1) { g.stepQueue += n; if (!g.frozen) g.frozen = true; g.render(0); },
    setTimeOfDay(h) { S.setTimeOfDay(h); g.render(0); },
    setSeed(n) { setSeed(n); },
    setSpeed(v) { S.speed = v; },
    happen(kind) { const ok = startHappening(S, kind); g.render(0); return ok; },
    happenings: () => Object.keys(HAPPENINGS),
    achievements: () => ({ earned: Object.keys(S.achievements), built: [...g.monuments.built.keys()], total: ACHIEVEMENTS.length }),
    monumentScreen(id) { const m = g.monuments.get(id); if (!m) return null; const w = new THREE.Vector3(m.x, m.cy, m.z).project(g.cam.cam); return { x: (w.x * .5 + .5) * innerWidth, y: (-w.y * .5 + .5) * innerHeight }; },
    version: () => BUILD,
    code: (c) => g.enterCode(c),
    trees: () => g.world.treeOpacity(),
    pause(v = true) { g.togglePause(v); return g.paused; },
    // kind: 'founder' | 'legends' | 'ores' | breed id | genome overrides object
    spawn(kind = 'founder', at) {
      const pos = at || {};
      if (kind === 'legends') return S.summonLegends();
      if (kind === 'ores') return S.summonOres();
      const b = M.BREEDS.find(x => x.id === kind);
      let genome;
      if (b) { const bg = M.breedGenome(b); return S.spawn({ ...bg, name: b.name, adult: true, x: pos.x, z: pos.z, dir: pos.dir }).id; }
      genome = typeof kind === 'object' ? pureGenome(kind) : M.founderGenome();
      return S.spawn({ genome, accessory: pos.accessory || null, name: M.randomName(), adult: true, x: pos.x, z: pos.z, dir: pos.dir }).id;
    },
    clearAll() { S.pigeons.length = 0; S.eggs.length = 0; S.poops.length = 0; S.court = null; S.selId = null; S.events.length = 0; g.fx.parts.length = 0; g.fx.rings.forEach(r => { r.userData.t = 1; }); g.render(0); },
    teleport(id, x, z) { const p = S.byId(id); if (p) { [p.x, p.z] = S.clampToPark(x, z); p.tx = p.x; p.tz = p.z; p.state = 'idle'; } g.render(0); },
    select(id) { g.select(id); g.render(0); },
    cam(name, opts) { g.cam.shot(name, opts); g.render(0); return g.cam.name; },
    screenOf(id) { // screen position of a bird's body centre, for real-input tests
      const v = g.flock.view(id), p = S.byId(id); if (!v || !p) return null;
      const s = v.size(p, S.t), w = new THREE.Vector3(v.vis.x + .03 * s, v.vis.y + .3 * s, v.vis.z).project(g.cam.cam);
      return { x: (w.x * .5 + .5) * innerWidth, y: (-w.y * .5 + .5) * innerHeight, onScreen: Math.abs(w.x) < 1 && Math.abs(w.y) < 1 && w.z < 1 };
    },
    screenOfWorld(x, y, z) { const w = new THREE.Vector3(x, y, z).project(g.cam.cam); return { x: (w.x * .5 + .5) * innerWidth, y: (-w.y * .5 + .5) * innerHeight }; },
    pickAt(x, y) { return g.pickAt(x, y); },
    find(key) { g.findTrait(key); g.render(0); return g.flock.findGems.count; },
    family(id) { const p = S.byId(id); return p ? S.familyTree(p.lid) : null; },
    win() { for (const b of M.BREEDS) S.breeds[b.id] ||= { by: 'debug', at: Date.now() }; for (const k of Object.keys(M.PEDIA)) S.discovered[k] = 1; },
    lose() { api.clearAll(); S.roost.length = 0; },
    render() { g.render(0); },
    async photo(id) { const r = await g.photo({ id }); return r && { w: r.w, h: r.h, size: r.blob.size, file: r.file }; },
    audio: () => ({ unlocked: !!g.audio.ac, sfxOn: g.audio.sfxOn, musicOn: g.audio.musicOn, sfxVol: g.audio.sfxVol, musicVol: g.audio.musicVol, mood: g.audio.mood, song: g.audio.music?.songId || null, songTitle: g.audio.songTitle, notes: g.audio.music?.notes || 0, musicRunning: !!g.audio.music?.timer, state: g.audio.ac?.state }),
    audioLevel() { // RMS of the master output right now (verifies sound is actually produced)
      const A = g.audio; if (!A.ac) return null;
      if (!A.an) { A.an = A.ac.createAnalyser(); A.an.fftSize = 2048; A.master.connect(A.an); }
      const d = new Float32Array(A.an.fftSize); A.an.getFloatTimeDomainData(d);
      let s2 = 0; for (const x of d) s2 += x * x; return Math.sqrt(s2 / d.length);
    },
    cooPitches() { return S.pigeons.map(p => +g.cooPitch(p).toFixed(3)); },
    songs: () => Object.keys(SONGS),
    async songLevel(id, secs = 8) { // offline render → RMS / peak, so every song can be checked without speakers
      const { buffer, notes } = await renderMusic(id, secs); const d = buffer.getChannelData(0);
      let s2 = 0, pk = 0; for (const x of d) { s2 += x * x; pk = Math.max(pk, Math.abs(x)); }
      return { id, title: SONGS[id].title, rms: +Math.sqrt(s2 / d.length).toFixed(4), peak: +pk.toFixed(3), notes };
    },
    hideHud(v = true) { document.getElementById('hud').style.display = v ? 'none' : ''; },
  };
  return api;
}
