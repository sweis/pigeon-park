// Pigeon Park — DOM HUD over the 3D canvas. Plain DOM, event delegation via data-act attributes.

import * as THREE from 'three';
import * as M from './genetics.js';
import { SPEEDS, MUTATIONS, ROOST_SIZE, phaseToHour } from './sim.js';
import { HAPPENINGS, WHIMSY, gapFor } from './happenings.js';
import { ACHIEVEMENTS } from './achievements.js';

const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const svg = (d, w = 16) => `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const I = {
  book: svg('<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>'),
  award: svg('<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>'),
  sound: svg('<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>'),
  mute: svg('<path d="M11 5 6 9H2v6h4l5 4z"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/>'),
  sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-7.1-17.1 1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>', 15),
  moon: svg('<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>', 15),
  clone: svg('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>', 14),
  roost: svg('<path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>', 14),
  gear: svg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>'),
  help: svg('<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>'),
  x: svg('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>', 15),
  music: svg('<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>'),
  musicOff: svg('<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/><line x1="3" y1="3" x2="21" y2="21"/>'),
  camera: svg('<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>', 14),
  download: svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>', 14),
  copy: svg('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>', 14),
  share: svg('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>', 14),
  target: svg('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="1" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="23"/><line x1="1" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="23" y2="12"/>'),
  pause: svg('<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>'),
  play: svg('<polygon points="6 4 20 12 6 20 6 4"/>'),
  eye: svg('<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>', 14),
};

const TIER_NAME = { 1: 'uncommon', 2: 'rare', 3: 'impossible' };
function chip(tier) { return tier >= 3 ? 'chip-t3' : tier === 2 ? 'chip-t2' : 'chip-t1'; }
function fmtAge(s) { if (s < 20) return 'freshly hatched'; if (s < 60) return 'a chick'; const m = Math.floor(s / 60); return m < 60 ? m + 'm in the park' : Math.floor(m / 60) + 'h in the park'; }
function fmtHour(h) { const hh = Math.floor(h), mm = Math.floor((h - hh) * 60 / 15) * 15; const ap = hh >= 12 ? 'pm' : 'am'; return ((hh + 11) % 12 + 1) + ':' + String(mm).padStart(2, '0') + ' ' + ap; }

const CONTROLS = [
  ['Tap / click a pigeon', 'Inspect it: colours, traits, hidden DNA'],
  ['Drag a pigeon', 'Carry it somewhere. Drop it on the Roost to keep it'],
  ['Drag the park', 'Orbit the camera'],
  ['Scroll / pinch', 'Zoom in and out'],
  ['Double-click a pigeon · F', 'Follow it around with the camera'],
  ['P · Space', 'Pause / resume the park'],
  ['Esc', 'Close a panel, stop following, deselect'],
  ['?', 'This help sheet'],
];

export class UI {
  constructor(game) {
    this.g = game; this.sim = game.sim;
    this.root = document.getElementById('hud');
    this.seen = { pedia: 0, breeds: 0 };
    this.dialog = null; this.roostSel = null; this.introDone = false;
    this.bubbles = new Map();
    this.refreshT = 0;
    this.build();
    this.root.addEventListener('click', (e) => this.onClick(e));
    this.root.addEventListener('pointerdown', (e) => e.stopPropagation());
    // Click-off: a press that starts outside an open panel closes it (capture phase, so it also
    // works when the press lands on the 3D canvas). The panel's own toggle button is left alone.
    document.addEventListener('pointerdown', (e) => {
      const t = e.target;
      this.suppressClick = false; // a new press: only the click ending a click-off press is ignored
      const set = this.$('settings');
      if (!set.classList.contains('hidden') && !set.contains(t) && !t.closest('[data-act="settings"]')) set.classList.add('hidden');
      if (this.dialog && !t.closest('.dialog')) { this.closeDialog(); this.suppressClick = true; }
    }, true);
  }

  build() {
    this.root.innerHTML = `
      <header class="topbar">
        <div class="brand panel">
          <div class="title">Pigeon Park</div>
          <div class="tagline">a gentle genetics catastrophe</div>
        </div>
        <span class="pill panel" id="pop">…</span>
        <span class="spacer"></span>
        <span class="pill panel clock" id="clock" title="time of day"></span>
        <button class="btn panel" data-act="pedia" id="b-pedia" aria-label="Pigeonpedia">${I.book}<span class="lbl">Pigeonpedia</span><i class="dot"></i></button>
        <button class="btn panel" data-act="breeds" id="b-breeds" aria-label="Breed Registry">${I.award}<span class="lbl">Breeds</span> <span class="count" id="breedcount"></span><i class="dot"></i></button>
        <button class="btn icon panel" data-act="pause" id="b-pause" aria-label="Pause" title="Pause (P / Space)"></button>
        <button class="btn icon panel desk" data-act="sfx" id="b-sfx" aria-label="Sound effects" title="Sound effects"></button>
        <button class="btn icon panel desk" data-act="music" id="b-music" aria-label="Music" title="Music"></button>
        <button class="btn icon panel" data-act="settings" id="b-settings" aria-label="Settings">${I.gear}</button>
        <button class="btn icon panel desk" data-act="help" aria-label="Help">${I.help}</button>
      </header>
      <div id="bubbles"></div>
      <button id="recenter" class="btn icon panel hidden" data-act="recenter" aria-label="Recenter camera" title="Recenter camera (double-tap the ground)">${I.target}</button>
      <button id="paused" class="pill panel hidden" data-act="pause">${I.play}<span>Paused — tap to resume</span></button>
      <aside id="inspector" class="card panel hidden"></aside>
      <div id="settings" class="card panel pop hidden"></div>
      <div id="intro" class="card panel hidden">
        <div class="card-title">Tap a pigeon. Any pigeon.</div>
        <p>They wander, they flirt, they multiply. Every egg reshuffles real pigeon DNA — dominant and recessive — so the rare stuff hides for generations.</p>
        <p><strong>Clone</strong> a bird to flood the gene pool with its DNA. <strong>Dismiss</strong> the ones holding the flock back. <strong>Drag</strong> anyone onto the Roost to keep them.</p>
        <button class="btn ghost" data-act="intro-ok">Got it</button>
      </div>
      <footer class="roostbar panel" id="roost"></footer>
      <div id="toasts"></div>
      <div id="dialog" class="backdrop hidden" data-act="backdrop"></div>
      <img id="ghost" class="dragghost hidden" alt="">
    `;
    this.$ = (id) => document.getElementById(id);
    this.renderRoost(); this.renderSound(); this.renderPause();
    // volume sliders (live while dragging; the settings panel is not rebuilt underneath them)
    this.root.addEventListener('input', (e) => {
      const a = e.target.closest('[data-act]'); if (!a) return;
      const v = +a.value / 100, on = v > .02; // a finger rarely lands on exactly 0: the first few % count as off
      if (a.dataset.act === 'sfxvol') this.g.audio.setSfx(on, v);
      if (a.dataset.act === 'musicvol') this.g.audio.setMusic(on, v);
      this.renderSound();
    });
    this.root.addEventListener('submit', (e) => {
      const f = e.target.closest('form[data-code]'); if (!f) return;
      e.preventDefault(); this.g.audio.unlock();
      const inp = f.querySelector('input'), ok = this.g.enterCode(inp.value);
      inp.value = ''; if (ok) this.$('settings').classList.add('hidden');
    });
    this.root.addEventListener('change', (e) => { if (e.target.closest('[data-act$="vol"]')) { this.g.save(); if (e.target.dataset.act === 'sfxvol') this.g.audio.play('coo', { vol: .8 }); } });
  }

  // ---------- events from game ----------
  toast(msg, kind = 'plain') {
    const box = this.$('toasts'), el = document.createElement('div');
    el.className = 'toast t-' + kind; el.textContent = msg;
    box.appendChild(el);
    while (box.children.length > 3) box.firstChild.remove();
    setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 300); }, 4200);
  }
  onClick(e) {
    if (this.suppressClick) { this.suppressClick = false; return; } // the click finishing a click-off press
    const a = e.target.closest('[data-act]'); if (!a) return;
    const act = a.dataset.act, arg = a.dataset.arg, g = this.g, S = this.sim;
    g.audio.unlock();
    if (act === 'backdrop' && e.target !== a) return;
    switch (act) {
      case 'pedia': this.openDialog('pedia'); break;
      case 'breeds': this.openDialog('breeds'); break;
      case 'help': this.openDialog('help'); break;
      case 'backdrop': case 'close': this.closeDialog(); break;
      case 'pause': g.togglePause(); break;
      case 'recenter': g.cam.shot('overview', { snap: false }); break;
      case 'whimsy': S.whimsy = arg; S.nextHappeningAt = S.t + gapFor(S); this.renderSettings(true); g.save(); break;
      case 'sfx': g.audio.setSfx(!g.audio.sfxOn); if (g.audio.sfxOn && g.audio.sfxVol < .05) g.audio.setSfx(true, .8); this.renderSound(); this.renderSettings(true); g.save(); break;
      case 'music': g.audio.setMusic(!g.audio.musicOn); if (g.audio.musicOn && g.audio.musicVol < .05) g.audio.setMusic(true, .55); this.renderSound(); this.renderSettings(true); g.save(); break;
      case 'settings': this.$('settings').classList.toggle('hidden'); this.renderSettings(true); break;
      case 'photo': this.openPhoto({ id: +arg }); break;
      case 'photo-roost': this.openPhoto({ roost: +arg }); break;
      case 'share': this.sharePhoto(); break;
      case 'copy-photo': this.copyPhoto(a); break;
      case 'speed': S.speed = +arg; this.renderSettings(true); g.save(); break;
      case 'mut': S.mut = arg; this.renderSettings(true); g.save(); break;
      case 'reset': // two-tap confirm; the armed state lives here because the panel re-renders every 0.4 s
        if (this.resetArmed && performance.now() - this.resetArmed < 5000) { this.resetArmed = 0; g.resetAll(); this.$('settings').classList.add('hidden'); }
        else { this.resetArmed = performance.now(); this.renderSettings(true); setTimeout(() => this.renderSettings(true), 5100); }
        break;
      case 'intro-ok': this.introDone = true; this.$('intro').classList.add('hidden'); g.save(); break;
      case 'clone': { const q = S.clonePigeon(+arg); if (q) g.select(q.id); break; }
      case 'roost-add': S.roostAdd(+arg); this.roostSel = S.roost.length - 1; g.select(null, true); break;
      case 'dismiss': S.dismissPigeon(+arg); g.select(null); break;
      case 'follow': g.toggleFollow(+arg); break;
      case 'deselect': g.select(null); this.roostSel = null; break;
      case 'perch': if (S.roost[+arg]) { this.roostSel = +arg; g.select(null, true); } break;
      case 'release': { const p = S.releaseRoost(+arg, false); if (p) { this.roostSel = null; g.select(p.id); } break; }
      case 'clone-out': { const p = S.releaseRoost(+arg, true); if (p) g.select(p.id); break; }
      case 'let-go': S.removeRoost(+arg); this.roostSel = null; break;
      case 'clone-breed': { const p = S.cloneBreed(arg); if (p) { this.closeDialog(); g.select(p.id); } break; }
    }
    this.renderRoost();
    this.refreshT = 0;
  }

  renderPause() {
    const p = this.g.paused;
    this.$('b-pause').innerHTML = p ? I.play : I.pause;
    this.$('b-pause').classList.toggle('on', p);
    this.$('paused').classList.toggle('hidden', !p);
  }
  renderSound() {
    const A = this.g.audio;
    this.$('b-sfx').innerHTML = A.sfxOn ? I.sound : I.mute;
    this.$('b-music').innerHTML = A.musicOn ? I.music : I.musicOff;
    this.$('b-sfx').classList.toggle('off', !A.sfxOn); this.$('b-music').classList.toggle('off', !A.musicOn);
  }

  // ---------- roost ----------
  renderRoost() {
    const S = this.sim, P = this.g.portraits;
    const key = JSON.stringify([S.roost.map(r => r.name), this.roostSel, this.overRoost]);
    if (key === this._roostKey) return; this._roostKey = key;
    let h = `<div class="roost-title">The&nbsp;Roost</div><div class="perches">`;
    for (let i = 0; i < ROOST_SIZE; i++) {
      const r = S.roost[i];
      if (!r) { h += `<div class="perch empty" title="empty perch"></div>`; continue; }
      h += `<button class="perch ${this.roostSel === i ? 'on' : ''}" data-act="perch" data-arg="${i}" title="${esc(r.name)}"><img src="${P.get(M.computePheno(r.genome, r.accessory))}" alt=""></button>`;
    }
    h += `</div><div class="roost-hint">Drag a favorite here to keep it forever. Or at least until you change your mind.</div>`;
    const el = this.$('roost'); el.innerHTML = h;
    el.classList.toggle('over', !!this.overRoost);
  }
  roostRect() { return this.$('roost').getBoundingClientRect(); }
  setOverRoost(v) { if (this.overRoost !== v) { this.overRoost = v; this.renderRoost(); } }
  ghost(pheno, x, y) {
    const el = this.$('ghost');
    if (!pheno) { el.classList.add('hidden'); return; }
    el.src = this.g.portraits.get(pheno); el.classList.remove('hidden');
    el.style.transform = `translate(${x - 38}px, ${y - 56}px) rotate(-6deg)`;
  }

  // ---------- inspector ----------
  renderInspector() {
    const S = this.sim, P = this.g.portraits, el = this.$('inspector');
    let d = null;
    const sel = S.selId != null ? S.byId(S.selId) : null;
    if (sel && !sel.flying) {
      const carries = M.carriersOf(sel.genome);
      d = { img: P.get(sel.pheno), kicker: 'Specimen no. ' + String(sel.id).padStart(3, '0'), name: sel.name,
        meta: 'Generation ' + sel.gen + ' · ' + fmtAge(S.age(sel)), color: sel.pheno.label, breeds: sel.breeds, traits: sel.pheno.traits, carries,
        actions: `<button class="btn primary" data-act="clone" data-arg="${sel.id}">${I.clone} Clone</button>
                  <button class="btn" data-act="roost-add" data-arg="${sel.id}">${I.roost} Roost</button>
                  <button class="btn ghost" data-act="dismiss" data-arg="${sel.id}">Dismiss<span class="opt"> politely</span></button>`,
        follow: sel.id, photo: `data-act="photo" data-arg="${sel.id}"` };
    } else if (this.roostSel != null && S.roost[this.roostSel]) {
      const i = this.roostSel, r = S.roost[i], ph = M.computePheno(r.genome, r.accessory);
      d = { img: P.get(ph), kicker: 'Roost resident', name: r.name, meta: 'Generation ' + r.gen + ' · kept bird', color: ph.label,
        breeds: M.matchBreeds(ph), traits: ph.traits, carries: M.carriersOf(r.genome),
        actions: `<button class="btn primary" data-act="clone-out" data-arg="${i}">${I.clone} Clone into park</button>
                  <button class="btn" data-act="release" data-arg="${i}">Release to park</button>
                  <button class="btn ghost" data-act="let-go" data-arg="${i}">Let go</button>`, photo: `data-act="photo-roost" data-arg="${i}"` };
    }
    if (!d) { el.classList.add('hidden'); this._insKey = null; return; }
    const key = JSON.stringify([d.kicker, d.name, d.meta, this.g.cam.follow]);
    if (key === this._insKey) return; this._insKey = key;
    el.classList.remove('hidden');
    el.innerHTML = `
      <button class="btn icon close" data-act="deselect" aria-label="Close">${I.x}</button>
      <div class="ins-head">
        <div class="portrait"><img src="${d.img}" alt=""></div>
        <div class="ins-id"><div class="kicker">${esc(d.kicker)}</div><h3>${esc(d.name)}</h3><div class="meta">${esc(d.meta)}</div></div>
      </div>
      <div class="colorlabel">${esc(d.color)}</div>
      ${d.breeds.length ? `<div class="chips">${d.breeds.map(b => `<span class="chip chip-breed">★ ${esc(b.name)}</span>`).join('')}</div>` : ''}
      ${d.traits.length ? `<div class="chips">${d.traits.map(t => `<span class="chip ${chip(t.tier)}">${esc(t.label)}</span>`).join('')}</div>` : ''}
      ${d.carries.length ? `<div><div class="label">Hidden in the DNA</div><div class="chips">${d.carries.map(c => `<span class="chip chip-carry">½ ${esc(c.label)}</span>`).join('')}</div></div>` : ''}
      <div class="actions">${d.actions}<button class="btn ghost" ${d.photo} title="Take a high-res photo">${I.camera}<span class="opt"> Photo</span></button>${d.follow ? `<button class="btn ghost ${this.g.cam.follow === d.follow ? 'on' : ''}" data-act="follow" data-arg="${d.follow}" title="Follow with camera (F)">${I.eye}<span class="opt"> ${this.g.cam.follow === d.follow ? 'Following' : 'Follow'}</span></button>` : ''}</div>`;
  }

  // ---------- settings ----------
  // full=true rebuilds the panel (on open / after a change); otherwise only the live stats update,
  // so a slider being dragged is never replaced underneath the pointer.
  renderSettings(full) {
    const S = this.sim, el = this.$('settings');
    if (el.classList.contains('hidden')) return;
    const alive = S.alive();
    const stats = `<div><b>${alive}</b><span>residents</span></div><div><b>${S.stats.births}</b><span>hatched</span></div>
        <div><b>${S.stats.flown}</b><span>departed</span></div><div><b>gen ${S.stats.maxGen}</b><span>deepest line</span></div>`;
    if (!full && el.querySelector('.stats')) { const st = el.querySelector('.stats'); if (st.innerHTML !== stats) st.innerHTML = stats; return; }
    const A = this.g.audio, vol = (act, v, on) => `<input type="range" min="0" max="100" value="${on ? Math.round(v * 100) : 0}" data-act="${act}" aria-label="${act}">`;
    const seg = (list, cur, act) => `<div class="seg">${list.map(o => `<button class="${cur(o) ? 'on' : ''}" data-act="${act}" data-arg="${act === 'speed' ? o.v : o.id}">${o.label}</button>`).join('')}</div>`;
    el.innerHTML = `
      <div class="row phone"><button class="btn icon ${A.sfxOn ? '' : 'off'}" data-act="sfx" aria-label="Sound effects">${A.sfxOn ? I.sound : I.mute}</button>
        <button class="btn icon ${A.musicOn ? '' : 'off'}" data-act="music" aria-label="Music">${A.musicOn ? I.music : I.musicOff}</button>
        <span class="spacer"></span><button class="btn small" data-act="help">${I.help} Help</button></div>
      <div class="row"><div class="label">Music</div>${vol('musicvol', A.musicVol, A.musicOn)}</div>
      <div class="row"><div class="label">Sounds</div>${vol('sfxvol', A.sfxVol, A.sfxOn)}</div>
      <div class="row"><div class="label">Park speed</div>${seg(SPEEDS, o => Math.abs(S.speed - o.v) < .05, 'speed')}</div>
      <div class="row"><div class="label">Mutations</div>${seg(MUTATIONS, o => S.mut === o.id, 'mut')}</div>
      <div class="row"><div class="label">Weirdness</div>${seg(WHIMSY, o => S.whimsy === o.id, 'whimsy')}</div>
      <div class="stats">${stats}</div>
      <form class="row code" data-code><input name="code" placeholder="Secret code" autocomplete="off" autocapitalize="none" spellcheck="false" enterkeyhint="go" aria-label="Secret code"><button class="btn small" type="submit">Enter</button></form>
      <button class="btn ghost small" data-act="reset">${this.resetArmed && performance.now() - this.resetArmed < 5000 ? 'Really? Tap again to start over' : 'Start over with fresh ferals'}</button>`;
  }

  // ---------- dialogs ----------
  openDialog(kind) {
    const S = this.sim;
    this.dialog = kind;
    if (kind === 'pedia') this.seen.pedia = Object.keys(S.discovered).length;
    if (kind === 'breeds') this.seen.breeds = Object.keys(S.breeds).length;
    this.g.save();
    const el = this.$('dialog'); el.classList.remove('hidden');
    el.innerHTML = `<div class="dialog card" role="dialog">${this['dlg_' + kind]()}</div>`;
  }
  openAchievement(id) {
    const A = ACHIEVEMENTS.find(a => a.id === id), S = this.sim; if (!A) return;
    this.dialog = 'achievement';
    const el = this.$('dialog'); el.classList.remove('hidden');
    const img = this.g.monumentPicture(id), got = S.achievements[id], n = Object.keys(S.achievements).length;
    const list = ACHIEVEMENTS.map(a => {
      const [have, need] = a.progress(S), done = !!S.achievements[a.id];
      return `<div class="ach ${done ? 'done' : ''} ${a.id === id ? 'this' : ''}"><div class="ach-top"><b>${done ? esc(a.name) : '???'}</b><span>${done ? '🏆' : `${have} / ${need}`}</span></div>
        <div class="note">${esc(a.how)}</div>${done ? '' : `<div class="bar"><i style="width:${Math.round(have / need * 100)}%"></i></div>`}</div>`;
    }).join('');
    el.innerHTML = `<div class="dialog card ach-dlg" role="dialog">${this.dlgHead(esc(A.name), `<span class="chip chip-breed">🏆 ${n} / ${ACHIEVEMENTS.length}</span>`)}
      <div class="ach-body">
        <div class="ach-hero">${img ? `<img src="${img}" alt="">` : ''}
          <p class="ach-blurb">${esc(A.blurb)}</p>
          <div class="foot">${esc(A.how)}${got ? ` · Earned ${new Date(got.at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}` : ''}</div></div>
        <div class="ach-list">${list}</div>
      </div></div>`;
  }
  async openPhoto(target) {
    this.dialog = 'photo';
    const el = this.$('dialog'); el.classList.remove('hidden');
    el.innerHTML = `<div class="dialog card photo-dlg" role="dialog">${this.dlgHead('Photo', '')}<div class="photo-wrap"><div class="developing">Developing…</div></div></div>`;
    await new Promise(r => requestAnimationFrame(r));
    const res = await this.g.photo(target);
    if (this.dialog !== 'photo') return;
    if (!res) { this.closeDialog(); return; }
    if (this.photoRes) URL.revokeObjectURL(this.photoRes.url);
    this.photoRes = res;
    const canCopy = !!(window.ClipboardItem && navigator.clipboard?.write);
    const canShare = !!(navigator.canShare && navigator.canShare({ files: [new File([res.blob], res.file, { type: 'image/png' })] }));
    el.querySelector('.photo-wrap').innerHTML = `<img src="${res.url}" alt="${esc(res.name)}" class="photo-img">`;
    el.querySelector('.dialog').insertAdjacentHTML('beforeend', `<div class="actions photo-actions">
        <a class="btn primary" href="${res.url}" download="${esc(res.file)}" data-act="download">${I.download} Download PNG</a>
        ${canCopy ? `<button class="btn" data-act="copy-photo">${I.copy} <span>Copy image</span></button>` : ''}
        ${canShare ? `<button class="btn" data-act="share">${I.share} Share</button>` : ''}
        <span class="foot">${res.w} × ${res.h} px</span></div>`);
  }
  // Put the picture itself on the clipboard (paste straight into chats, docs, email).
  async copyPhoto(btn) {
    const r = this.photoRes; if (!r) return;
    const label = btn.querySelector('span');
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': r.blob })]);
      label.textContent = 'Copied!'; this.toast('Photo copied to the clipboard.', 'note');
    } catch (e) { label.textContent = 'Copy failed'; }
    setTimeout(() => { if (label.isConnected) label.textContent = 'Copy image'; }, 1800);
  }
  async sharePhoto() {
    const r = this.photoRes; if (!r) return;
    try { await navigator.share({ files: [new File([r.blob], r.file, { type: 'image/png' })], title: r.name, text: r.name + ' — Pigeon Park' }); } catch (e) { /* cancelled */ }
  }
  closeDialog() { this.dialog = null; this.$('dialog').classList.add('hidden'); this.$('dialog').innerHTML = ''; }
  dlgHead(title, tag) { return `<div class="dlg-head"><div class="dlg-title">${title}</div>${tag}<span class="spacer"></span><button class="btn icon" data-act="close" aria-label="Close">${I.x}</button></div>`; }
  dlg_pedia() {
    const S = this.sim, keys = Object.keys(M.PEDIA);
    const items = keys.map(k => {
      const meta = M.ALLELE_META[k] || { label: k, tier: 1 }, got = !!S.discovered[k];
      return { k, got, tier: meta.tier, title: got ? meta.label : '???', note: got ? M.PEDIA[k] : 'Not yet observed in your park.' };
    }).sort((a, b) => (b.got - a.got) || (a.tier - b.tier) || (a.title > b.title ? 1 : -1));
    const n = keys.filter(k => S.discovered[k]).length;
    return this.dlgHead('The Pigeonpedia', `<span class="chip chip-t1">${n} / ${keys.length} observed</span>`) +
      `<div class="grid pedia">${items.map(i => `<div class="entry ${i.got ? '' : 'dim'}"><div class="entry-top"><b>${esc(i.title)}</b><span class="chip ${chip(i.tier)} tiny">${TIER_NAME[i.tier] || 'odd'}</span></div><div class="note">${esc(i.note)}</div></div>`).join('')}</div>
       <div class="foot">Field notes are written the first time a trait hatches in your park.</div>`;
  }
  // Trait groups a breed needs that the player hasn't observed yet (each group: any one allele counts).
  missingTraits(b) {
    const S = this.sim;
    const groups = [];
    for (const [k, v] of Object.entries(b.req)) {
      if (k === 'accessory') continue;
      if (k === 'colorKey') { for (const t of M.colorTraits(Array.isArray(v) ? v[0] : v)) groups.push([t]); continue; }
      const keys = (Array.isArray(v) ? v : [v]).map(x => k + ':' + x).filter(key => M.ALLELE_META[key]);
      if (keys.length) groups.push(keys);
    }
    return groups.filter(g => !g.some(key => S.discovered[key]));
  }
  dlg_breeds() {
    const S = this.sim, P = this.g.portraits;
    const list = M.BREEDS.map(b => ({ b, got: S.breeds[b.id] })).sort((x, y) => (!!y.got - !!x.got));
    const n = Object.keys(S.breeds).length;
    return this.dlgHead('Breed Registry', `<span class="chip chip-breed">${n} / ${M.BREEDS.length} discovered</span>`) +
      `<div class="grid breeds">${list.map(({ b, got }) => `
        <div class="entry breed">
          <img src="${P.get(M.breedSample(b))}" class="${got ? '' : 'silhouette'}" alt="">
          <b>${got ? esc(b.name) : '???'}</b>
          <span class="chip tiny ${b.legend ? 'chip-breed' : b.real ? 'chip-t1' : 'chip-t3'}">${b.legend ? 'legendary' : b.real ? (b.exotic ? 'exotic' : 'real breed') : 'cryptid'}</span>
          <div class="note">${got ? esc(b.blurb) : b.legend ? 'Whispered of in park lore. There is a word…' : (() => { const n = this.missingTraits(b).length; return n ? `Recipe unknown — needs ${n} trait${n > 1 ? 's' : ''} you haven't observed yet.` : 'Recipe: ' + esc(M.breedHint(b)) + '.'; })()}</div>
          ${got ? `<div class="by">first bred by ${esc(got.by)}</div><button class="btn small" data-act="clone-breed" data-arg="${b.id}">${I.clone} Clone into park</button>` : ''}
        </div>`).join('')}</div>
       <div class="foot">Match a real fancy-pigeon breed to register it. The cryptids are your problem.</div>`;
  }
  dlg_help() {
    const S = this.sim;
    return this.dlgHead('How the park works', '') + `
      <div class="help">
        <section><h4>The idea</h4>
          <p>The pigeons run the place. They wander, court, lay eggs and hatch chicks entirely on their own — you shape <em>who</em> gets to breed.
          Every chick gets one copy of each of ${M.LOCI.length} genes from each parent. Recessive traits only show with two copies, so they can hide for generations.</p>
          <p>Goal: discover all <b>${M.BREEDS.length} breeds</b> in the Breed Registry and fill all <b>${Object.keys(M.PEDIA).length} field notes</b> in the Pigeonpedia.</p></section>
        <section><h4>Controls</h4><table>${CONTROLS.map(([k, v]) => `<tr><td><kbd>${esc(k)}</kbd></td><td>${esc(v)}</td></tr>`).join('')}</table></section>
        <section><h4>Weird things happen</h4><ul>${Object.values(HAPPENINGS).map(h => `<li><b>${esc(h.label)}.</b> ${esc(h.blurb)}</li>`).join('')}</ul>
          <p>Turn them up or down with <b>Weirdness</b> in settings.</p></section>
        <section><h4>Tips</h4><ul>
          <li><b>Clone</b> birds that carry what you want (check “Hidden in the DNA”) to flood the gene pool.</li>
          <li><b>Dismiss</b> birds that dilute it. The park holds ${S.cap}; when it fills up, birds fly off on their own.</li>
          <li>The <b>Roost</b> keeps ${ROOST_SIZE} favourites safe. Release or clone them back any time.</li>
          <li>A registry card reveals its recipe once you've observed every trait it needs. Found breeds can be cloned straight into the park.</li>
          <li>Fantasy colours only appear through mutation — turn Mutations up to <b>${MUTATIONS[2].label}</b> to fish for them.</li>
          <li>Park speed goes from ${SPEEDS[0].label} to ${SPEEDS[SPEEDS.length - 1].label}. It's fine to just leave the park running.</li>
          <li>Tap <b>Photo</b> on any bird for a high-res picture card you can download or share.</li>
          <li>Music and sound effects have separate buttons in the top bar and volume sliders in settings.</li>
          <li>Milestones build <b>monuments</b> on the lawn around the plaza. Tap one to see what it's for and how close you are to the rest.</li>
          <li>Some words, typed while the park is open (or entered under <b>Secret code</b> in settings), do things.</li>
        </ul></section>
      </div>
      <div class="foot version">Pigeon Park v${esc(this.g.version.version)} · build ${esc(this.g.version.hash)}${this.g.version.date ? ' · ' + esc(this.g.version.date) : ''}</div>`;
  }

  // ---------- per frame ----------
  frame(dt, cam) {
    const S = this.sim;
    this.refreshT -= dt;
    if (this.refreshT <= 0) {
      this.refreshT = .4;
      const alive = S.alive();
      this.$('pop').textContent = alive + ' / ' + S.cap + ' pigeons';
      const h = phaseToHour(S.phase());
      this.$('clock').innerHTML = (S.night > .5 ? I.moon : I.sun) + `<span>${fmtHour(h)}</span>`;
      const nB = Object.keys(S.breeds).length, nP = Object.keys(S.discovered).length;
      this.$('breedcount').textContent = nB + '/' + M.BREEDS.length;
      this.$('b-breeds').classList.toggle('new', nB > this.seen.breeds);
      this.$('b-pedia').classList.toggle('new', nP > this.seen.pedia);
      this.renderInspector(); this.renderSettings(); this.renderRoost();
      this.$('intro').classList.toggle('hidden', this.introDone || S.selId != null || this.roostSel != null || !!this.dialog);
    }
    const rc = this.g.cam.name === 'overview' || this.g.cam.name === 'hud-check';
    if (rc !== this._rcHidden) { this._rcHidden = rc; this.$('recenter').classList.toggle('hidden', rc); }
    this.renderBubbles(cam);
  }
  renderBubbles(cam) {
    const S = this.sim, box = this.$('bubbles'), seen = new Set(), v = new THREE.Vector3();
    const W = innerWidth, Hh = innerHeight;
    for (const p of S.pigeons) {
      const isSel = p.id === S.selId;
      if (!p.emote && !isSel) continue;
      const view = this.g.flock.view(p.id); if (!view) continue;
      const s = view.size(p, S.t);
      v.set(view.vis.x, view.vis.y + .72 * s, view.vis.z).project(cam);
      if (v.z > 1) continue;
      const x = (v.x * .5 + .5) * W, y = (-v.y * .5 + .5) * Hh;
      if (p.emote) {
        seen.add(p.id);
        let b = this.bubbles.get(p.id);
        const text = p.emote.kind === 'heart' ? '♥' : p.emote.kind === 'zzz' ? 'z z z' : p.emote.text || '!';
        if (!b) { b = document.createElement('div'); box.appendChild(b); this.bubbles.set(p.id, b); }
        if (b.textContent !== text) { b.textContent = text; b.className = 'bubble ' + (p.emote.kind === 'heart' ? 'heart' : p.emote.kind === 'zzz' ? 'zzz' : 'say'); }
        b.style.transform = `translate(${x}px, ${y}px) translate(-50%, -100%)`;
      }
      if (isSel) {
        let n = this.nameTag;
        if (!n) { n = this.nameTag = document.createElement('div'); n.className = 'nametag'; box.appendChild(n); }
        v.set(view.vis.x, view.vis.y, view.vis.z).project(cam);
        n.textContent = p.name; n.style.display = '';
        n.style.transform = `translate(${(v.x * .5 + .5) * W}px, ${(-v.y * .5 + .5) * Hh + 10}px) translate(-50%, 0)`;
      }
    }
    if (this.nameTag && (S.selId == null || !S.byId(S.selId))) this.nameTag.style.display = 'none';
    for (const [id, b] of this.bubbles) if (!seen.has(id)) { b.remove(); this.bubbles.delete(id); }
  }
}
