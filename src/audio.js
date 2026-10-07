// Pigeon Park — all audio is synthesised with WebAudio: coos, UI sounds and a generative soundtrack.
// Routing: sfx → sfxGain ┐
//          music → musicGain → master → speakers      (sound + music toggle/volume independently)
// Unlocked on the first user gesture (browsers block autoplay).

const NOTE = (n) => 440 * Math.pow(2, (n - 69) / 12); // MIDI → Hz

export class Audio {
  constructor() {
    this.ac = null;
    this.sfxOn = true; this.musicOn = true; this.sfxVol = .8; this.musicVol = .55;
    this.lastCoo = 0;
    this.music = null; this.mood = 'day'; this.duck = 1;
  }

  // Create (or resume) the engine — only ever from a user gesture, and only if something is switched on.
  unlock() {
    if (!this.anyOn()) return;
    if (this.ac) { if (this.ac.state !== 'running' && this.ac.state !== 'closed') this.ac.resume(); return; }
    try {
      const ac = new (window.AudioContext || window.webkitAudioContext)();
      this.buildGraph(ac);
      this.applyGains();
      this.music = new Music(this);
      if (this.musicOn) this.music.start();
      // phones can wake a suspended context on their own (iOS after an interruption): if everything is
      // muted when that happens, shut it down again
      ac.onstatechange = () => { if (ac.state === 'running' && !this.anyOn()) this.shutdown(); };
    } catch (e) { this.ac = null; }
  }
  // master → gentle compressor → speakers, so stacked coos + music never clip
  buildGraph(ac) {
    this.ac = ac;
    this.comp = ac.createDynamicsCompressor(); this.comp.threshold.value = -14; this.comp.ratio.value = 4; this.comp.attack.value = .005; this.comp.release.value = .2;
    this.master = ac.createGain(); this.master.gain.value = .9; this.master.connect(this.comp); this.comp.connect(ac.destination);
    this.sfx = ac.createGain(); this.sfx.connect(this.master);
    this.mus = ac.createGain(); this.mus.connect(this.master);
  }
  anyOn() { return (this.sfxOn && this.sfxVol > .02) || (this.musicOn && this.musicVol > .02); }
  // Both muted: close the engine entirely (nothing left to play, schedule or be woken up). Unmuting
  // builds a fresh one from that tap.
  shutdown() {
    if (!this.ac) return;
    this.music?.stop();
    const ac = this.ac; ac.onstatechange = null;
    this.ac = this.music = this.an = this.rainSrc = null;
    this.master?.disconnect();
    ac.close().catch(() => {});
  }
  applyGains() {
    if (!this.ac) return;
    const t = this.ac.currentTime, sfx = this.sfxOn ? this.sfxVol : 0, mus = this.musicOn ? this.musicVol * this.duck : 0;
    for (const [node, v, tc] of [[this.sfx, sfx, .05], [this.mus, mus, .25]]) {
      node.gain.cancelScheduledValues(t);
      if (v === 0) node.gain.setValueAtTime(0, t); // muting is immediate and exact, not a fade toward zero
      else { node.gain.setValueAtTime(node.gain.value, t); node.gain.setTargetAtTime(v, t, tc); }
    }
    if (!this.anyOn()) this.shutdown();
    else if (this.ac.state === 'suspended') this.ac.resume();
  }
  setSfx(on, vol) {
    if (on != null) this.sfxOn = on; if (vol != null) this.sfxVol = vol;
    if (!this.ac) this.unlock(); else this.applyGains(); // turning something on after a full mute: fresh engine
  }
  setMusic(on, vol) {
    if (on != null) this.musicOn = on; if (vol != null) this.musicVol = vol;
    if (!this.ac) { this.unlock(); return; }
    this.applyGains(); if (!this.ac) return;
    if (this.music) { if (this.musicOn) this.music.start(); else this.music.stop(); }
  }
  setMood(mood) { this.mood = mood; }
  // Saved settings (in the save's ui block). applyPrefs also reads saves from before music had its own toggle.
  prefs() { return { sfxOn: this.sfxOn, musicOn: this.musicOn, sfxVol: this.sfxVol, musicVol: this.musicVol }; }
  applyPrefs(p) {
    this.sfxOn = p.sfxOn ?? !p.muted; this.musicOn = p.musicOn ?? true;
    if (p.sfxVol != null) this.sfxVol = p.sfxVol; if (p.musicVol != null) this.musicVol = p.musicVol;
  }
  get songTitle() { return this.music?.timer ? this.music.song.title : null; }
  // Rain: a looping filtered-noise bed on the sfx bus (so muting sounds silences it too).
  setRain(on) {
    if (!this.ac || !this.sfxOn || !!this.rainSrc === on) return;
    if (on) {
      const len = this.ac.sampleRate * 2, buf = this.ac.createBuffer(1, len, this.ac.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      const src = this.rainSrc = this.ac.createBufferSource(); src.buffer = buf; src.loop = true;
      const f = this.filter('lowpass', 1400);
      const g = this.rainGain = this.ac.createGain(); g.gain.setValueAtTime(0, this.ac.currentTime); g.gain.linearRampToValueAtTime(.06, this.ac.currentTime + 1.5);
      src.connect(f); f.connect(g); g.connect(this.sfx); src.start();
    } else {
      const src = this.rainSrc, g = this.rainGain, t = this.ac.currentTime; this.rainSrc = null;
      g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(g.gain.value, t); g.gain.linearRampToValueAtTime(0, t + 1.2); src.stop(t + 1.3);
    }
  }
  setDuck(v) { if (this.duck !== v) { this.duck = v; this.applyGains(); } }
  ok() { return this.ac && this.sfxOn && this.ac.state === 'running'; }

  // one-shot envelope into the sfx bus (or a given destination)
  env(dur, peak, dest = this.sfx, t = this.ac.currentTime, attack = .03) {
    const g = this.ac.createGain();
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + attack); g.gain.exponentialRampToValueAtTime(.001, t + dur);
    g.connect(dest); return g;
  }
  play(name, o = {}) { if (this.ok()) SFX[name]?.(this, o); }

  // ---------- synth building blocks (shared with the soundtrack, which reaches them through `this.a`) ----------
  osc(type, f, t, stop) { const o = this.ac.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, t); o.start(t); o.stop(stop); return o; }
  filter(type, f, q = 1) { const b = this.ac.createBiquadFilter(); b.type = type; b.frequency.value = f; b.Q.value = q; return b; }
  gain(v) { const g = this.ac.createGain(); g.gain.value = v; return g; }
  // a sine LFO wobbling `param` by ±depth; returns its depth gain so callers can ramp it
  vibrato(param, rate, depth, t, stop) { const g = this.gain(depth); this.osc('sine', rate, t, stop).connect(g); g.connect(param); return g; }
  // filtered noise burst starting at t; returns the filter to connect onward
  noiseBurst(t, dur, type, f, q = 1) { const src = this.noise(dur), b = this.filter(type, f, q); src.connect(b); src.start(t); return b; }
  // stereo position on the sfx bus (plain gain where StereoPanner is missing)
  panner(pan = 0) {
    const out = this.ac.createStereoPanner ? this.ac.createStereoPanner() : this.ac.createGain();
    if (out.pan) out.pan.value = Math.max(-.85, Math.min(.85, pan)); out.connect(this.sfx); return out;
  }

  // ---------- coos ----------
  // A pigeon coo is a breathy, throaty "oo" that GLIDES — not a clean tone that steps between notes
  // (clean stepped tones from many birds read as a slow melody). Source: sawtooth + sine through an
  // "oo" vowel formant, a little breath noise, a slight rattle, and small random pitch wobble.
  // pitch: per-bird multiplier (big birds low, dinky birds high). pan/dist: where the bird is.
  coo(voice, vol = 1, pitch = 1, pan = 0, at) {
    const ac = this.ac, t = at ?? ac.currentTime;
    if (t - this.lastCoo < .12) return; this.lastCoo = t;
    const out = this.panner(pan);
    if (voice === 'laugher') return this.laugh(t, vol, pitch, out);
    if (voice === 'trumpet') return this.trumpet(t, vol, pitch, out);
    const base = (255 + Math.random() * 70) * pitch;
    const j = () => 1 + (Math.random() - .5) * .06; // a few percent of wobble, so nothing lands on a scale
    // one syllable: glide up to a peak then sag, with a rattle
    const syll = (at, dur, amp, rise, sag, rattle) => {
      const f0 = base * j(), pk = f0 * rise * j(), f2 = f0 * sag * j();
      const saw = this.osc('sawtooth', f0, at, at + dur + .03), sin = this.osc('sine', f0, at, at + dur + .03);
      for (const o of [saw, sin]) {
        o.frequency.exponentialRampToValueAtTime(pk, at + dur * .3);
        o.frequency.exponentialRampToValueAtTime(f2, at + dur * .95);
      }
      const vowel = this.filter('bandpass', 480 * pitch, 2.2), soft = this.filter('lowpass', 900), sg = this.gain(.35);
      const am = this.gain(1 - rattle * .5);
      this.vibrato(am.gain, 22 + Math.random() * 14, rattle * .5, at, at + dur + .03); // the rattle
      saw.connect(vowel); vowel.connect(am); sin.connect(sg); sg.connect(soft); soft.connect(am); am.connect(this.env(dur, amp * vol, out, at, .05));
      // breath: band-limited noise under the voice
      this.noiseBurst(at, dur, 'bandpass', 420 * pitch, 1.2).connect(this.env(dur, amp * vol * .45, out, at, .06));
    };
    const shapes = ['coo', 'coo', 'double', 'long', 'rattle', 'grumble'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    if (shape === 'coo') syll(t, .42, .16, 1.1, .82, .25);
    else if (shape === 'double') { syll(t, .2, .12, 1.06, .9, .2); syll(t + .24, .45, .16, 1.12, .8, .3); }
    else if (shape === 'long') syll(t, .75, .15, 1.14, .78, .35);
    else if (shape === 'rattle') syll(t, .5, .15, 1.08, .85, .75);
    else syll(t, .38, .13, 1.02, .88, .55); // low grumble
  }
  trumpet(t, vol, pitch, out) {
    const o = this.osc('sawtooth', 210 * pitch, t, t + .56), f = this.filter('lowpass', 620);
    o.frequency.linearRampToValueAtTime(160 * pitch, t + .4);
    this.vibrato(o.frequency, 7, 6, t, t + .56); // drumroll wobble
    o.connect(f); f.connect(this.env(.55, .07 * vol, out, t));
  }
  laugh(t, vol, pitch, out) { // a rapid descending "hoo-hoo-hoo-hoo"
    for (let i = 0; i < 5; i++) {
      const t0 = t + i * .085, o = this.osc('sine', (520 - i * 30) * pitch, t0, t0 + .09), f = this.filter('lowpass', 1000);
      o.frequency.exponentialRampToValueAtTime((380 - i * 25) * pitch, t0 + .07);
      o.connect(f); f.connect(this.env(.08, .09 * vol, out, t0, .015));
    }
  }
  noise(dur) {
    const ac = this.ac, len = Math.max(1, Math.floor(ac.sampleRate * dur)), buf = ac.createBuffer(1, len, ac.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ac.createBufferSource(); src.buffer = buf; return src;
  }
}

// UI and park sound effects, by event name: (audio, options) → schedules the sound now.
const SFX = {
  coo: (a, o) => a.coo(o.voice, o.vol, o.pitch, o.pan),
  chime: (a, o, t = a.ac.currentTime) => [740, 1108].forEach((f, i) => a.osc('triangle', f, t + i * .09, t + 1).connect(a.env(.7 + i * .2, .1, a.sfx, t + i * .09))),
  pop: (a, o, t = a.ac.currentTime) => { const g = a.osc('sine', 300, t, t + .15); g.frequency.exponentialRampToValueAtTime(90, t + .12); g.connect(a.env(.14, .16)); },
  whoosh: (a, o, t = a.ac.currentTime) => a.noiseBurst(t, .3, 'bandpass', 700).connect(a.env(.3, .12, a.sfx, t)),
  shutter: (a, o, t = a.ac.currentTime) => { for (const d of [0, .07]) a.noiseBurst(t + d, .05, 'highpass', 2500).connect(a.env(.05, .25, a.sfx, t + d, .003)); },
  flap: (a, o, t = a.ac.currentTime) => { // a short hop: three soft wingbeats, quieter than a take-off whoosh
    const out = a.panner(o.pan);
    for (let i = 0; i < 3; i++) a.noiseBurst(t + i * .085, .07, 'bandpass', 900 + i * 120, .8).connect(a.env(.07, .05 * (o.vol ?? 1), out, t + i * .085, .01));
  },
};

// ---------- generative soundtrack ----------
// Songs on a 16th-note grid (12 steps a bar for the 3-time ones). Each song: tempo, swing, a chord per bar,
// a generated lead (a rhythm motif per bar, call-and-answer, notes from the song's scale) and a `beat`
// function that plays the band for one step. The park picks a playlist by mood — day songs rotate every
// few bars, night has its own — and happenings cut straight into their own song (UFO, disco, conga line)
// with a short sting, then hand back to the park.
const PENTA = [0, 2, 4, 7, 9], MAJOR = [0, 2, 4, 5, 7, 9, 11], MINOR_P = [0, 3, 5, 7, 10], WHOLE = [0, 2, 4, 6, 8, 10], DORIAN = [0, 2, 3, 5, 7, 9, 10];
const SONGS = {
  strut: { // the original park tune: C – Am – F – G, coo lead, pizzicato bass, peck woodblocks, wing-flap shakers
    title: 'Pigeon Strut', mood: 'day', bpm: 104, steps: 16, swing: .08, vol: 1,
    bars: [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]],
    lead: { inst: 'coo', scale: PENTA, root: 72, p: 1, amp: .07, hold: 1.6, rhythms: [[0, 4, 6, 8, 12], [0, 3, 6, 10, 12, 14], [0, 2, 4, 8, 11], [0, 6, 8, 10, 12], [2, 4, 8, 12, 13, 14]] },
    beat(m, s, t, d, c) {
      if ([0, 6, 8, 12].includes(s)) m.pizz(t, NOTE(c[0] - 24 + (s === 6 ? 7 : 0)), .16);
      if (s === 0 || s === 8) c.forEach((n, i) => m.marimba(t + i * .012, NOTE(n), .035));
      if (s === 4 || s === 12) m.peck(t, .09);
      if (s % 4 === 2) m.flap(t, .025);
    },
  },
  waltz: { // Breadcrumb Waltz: oom-pah-pah in F, a whistled tune over it
    title: 'Breadcrumb Waltz', mood: 'day', bpm: 150, steps: 12, swing: 0, vol: 1,
    bars: [[53, 57, 60], [50, 53, 57], [55, 58, 62], [48, 52, 55, 58], [53, 57, 60], [58, 62, 65], [48, 52, 55], [53, 57, 60]],
    lead: { inst: 'whistle', scale: MAJOR, root: 77, p: .95, amp: .06, rhythms: [[0, 4, 8], [0, 6, 8], [0, 8, 10], [0, 4, 6, 8], [0]] },
    beat(m, s, t, d, c) {
      if (s === 0) m.pizz(t, NOTE(c[0] - 12), .2);
      if (s === 4 || s === 8) c.slice(0, 3).forEach((n, i) => m.marimba(t + i * .008, NOTE(n), .03));
      if (s === 0 && m.bar % 2) m.flap(t, .02);
    },
  },
  shuffle: { // Bench Shuffle: swung I–vi–ii–V, walking bass, brushes, a kazoo-ish "trumpeter" coo
    title: 'Bench Shuffle', mood: 'day', bpm: 96, steps: 16, swing: .2, vol: 1,
    bars: [[60, 64, 67, 69], [57, 61, 64, 67], [50, 53, 57, 60], [55, 59, 62, 65]],
    lead: { inst: 'kazoo', scale: [0, 3, 4, 7, 9, 10], root: 72, p: .8, amp: .05, rhythms: [[0, 3, 6, 8], [2, 4, 6, 10, 12], [0, 6, 8, 14], [0, 2, 3, 6]] },
    beat(m, s, t, d, c) {
      if (s % 4 === 0) m.pizz(t, NOTE(c[s / 4] - 24), .17); // walk up the chord
      if (s === 4 || s === 12) m.brush(t, .05);
      if (s % 4 === 0 || s % 4 === 3) m.hat(t, .022, false);
      if (s === 6 || s === 14) c.forEach((n, i) => m.marimba(t + i * .01, NOTE(n), .02));
    },
  },
  night: { // the original night variant: slower, sparser, an owl-ish coo at the top
    title: 'Pigeon Strut (after dark)', mood: 'night', bpm: 80, steps: 16, swing: .08, vol: .7,
    bars: [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]],
    lead: { inst: 'coo', scale: PENTA, root: 72, p: .55, amp: .07, hold: 1.6, rhythms: [[0, 4, 6, 8, 12], [0, 3, 6, 10, 12, 14], [0, 2, 4, 8, 11], [0, 6, 8, 10, 12]] },
    beat(m, s, t, d, c) {
      if (s === 0 || s === 8) m.pizz(t, NOTE(c[0] - 24), .16);
      if (s === 0) c.forEach((n, i) => m.marimba(t + i * .012, NOTE(n), .035));
      if (s === 12) m.peck(t, .09);
      if (s === 0 && m.bar === 0) m.owl(t);
    },
  },
  lullaby: { // Streetlamp Lullaby: 6/8 music box over a soft pad
    title: 'Streetlamp Lullaby', mood: 'night', bpm: 66, steps: 12, swing: 0, vol: .75,
    bars: [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]],
    lead: { inst: 'musicbox', scale: PENTA, root: 84, p: .8, amp: .05, rhythms: [[0, 2, 4, 6, 8, 10], [0, 4, 6, 10], [0, 2, 6, 8]] },
    beat(m, s, t, d, c) {
      if (s === 0) { m.pad(t, c.map(NOTE), d * 12, .018); m.pizz(t, NOTE(c[0] - 24), .1); }
      if (s === 6) m.pizz(t, NOTE(c[2] - 24), .07);
    },
  },
  ufo: { // Close Encounter: theremin glides over eerie minor chords, a throbbing bass and computer bleeps
    title: 'Close Encounter', mood: 'ufo', bpm: 84, steps: 16, swing: 0, vol: .85,
    bars: [[48, 51, 55, 62], [44, 48, 51, 58], [41, 44, 48, 55], [43, 47, 50, 56]],
    lead: { inst: 'theremin', scale: WHOLE, root: 72, p: 1, amp: .06, rhythms: [[0, 8], [0, 6, 12], [0], [0, 4, 8, 12]] },
    beat(m, s, t, d, c) {
      if (s % 2 === 0) m.throb(t, NOTE(c[0] - 12), d * 1.8, s % 8 === 0 ? .14 : .08);
      if (s === 0) m.pad(t, c.map(n => NOTE(n + 12)), d * 16, .02, 'sawtooth');
      if (Math.random() < .22) m.bleep(t, NOTE(84 + WHOLE[Math.floor(Math.random() * 6)]), .02);
    },
    sting(m, t) { // a descending saucer whine
      const o = m.osc('sine', 1400, t, t + 1.1); m.vibrato(o.frequency, 9, 60, t, t + 1.1);
      o.frequency.exponentialRampToValueAtTime(180, t + 1); o.connect(m.out(1.05, .07, t, .05));
    },
  },
  disco: { // Coo Fever: four on the floor, open hats, octave bass, string stabs, a clapping chorus
    title: 'Coo Fever', mood: 'dance', bpm: 120, steps: 16, swing: 0, vol: .8,
    bars: [[57, 60, 64, 67], [50, 54, 57, 60], [57, 60, 64, 67], [50, 54, 57, 60]],
    lead: { inst: 'strings', scale: DORIAN, root: 69, p: .9, amp: .04, rhythms: [[0, 3, 6, 10], [2, 6, 8, 11, 14], [0, 8, 10, 12]] },
    beat(m, s, t, d, c) {
      if (s % 4 === 0) m.kick(t, .24);
      if (s % 4 === 2) m.hat(t, .035, true); else m.hat(t, .014, false);
      if (s === 4 || s === 12) m.clap(t, .07);
      if (s % 2 === 0) m.bass(t, NOTE(c[0] - 24 + (s % 4 === 2 ? 12 : 0)), d * 1.6, .13);
      if (s === 3 || s === 11) m.stab(t, c.map(NOTE), .028);
      if (s === 0 && m.bar === 0) m.swoop(t, .03);
    },
    sting(m, t) { m.noiseHit(t, .25, .12, 'bandpass', 900, 2.5); m.swoop(t, .04); }, // needle drop
  },
  conga: { // Conga Line: I–IV–V–IV, congas + cowbell + clave, piano montuno, a big brass "HEY" on every fourth beat
    title: 'Conga Line', mood: 'conga', bpm: 128, steps: 16, swing: 0, vol: .75,
    bars: [[60, 64, 67], [53, 57, 60], [55, 59, 62], [53, 57, 60]],
    lead: { inst: 'brass', scale: MAJOR, root: 72, p: .7, amp: .045, rhythms: [[0, 2, 4, 6], [0, 3, 6]] },
    beat(m, s, t, d, c) {
      // the conga-line step: one, two, three, KICK (on the and of four)
      if (s === 0 || s === 4 || s === 8) m.conga(t, 180, .14, false);
      if (s === 2 || s === 6 || s === 10) m.conga(t, 260, .08, true);
      if (s === 14) { m.conga(t, 150, .2, false); m.kick(t, .2); m.stab(t, c.map(n => NOTE(n + 12)), .04, 'brass'); }
      if (s % 4 === 0) m.cowbell(t, .035);
      if ((m.bar % 2 ? [4, 8] : [0, 6, 12]).includes(s)) m.clave(t, .05); // 3-2 son clave across two bars
      if ([0, 3, 6, 8, 11].includes(s)) c.forEach((n, i) => m.piano(t, NOTE(n + (s % 2 ? 12 : 0)), .022)); // montuno
      if (s === 6 || s === 12) m.pizz(t, NOTE(c[s === 6 ? 0 : 2] - 24), .2); // tumbao: anticipate the bar
    },
    sting(m, t) { // a referee's whistle
      const o = m.osc('sine', 2600, t, t + .5); m.a.osc('square', 28, t, t + .5).connect(m.a.gain(220)).connect(o.frequency);
      o.connect(m.out(.45, .05, t, .01));
    },
  },
  goddess: { // Heavenly Coo: a slow choir of "aah"s over harp arpeggios and temple bells
    title: 'Heavenly Coo', mood: 'goddess', bpm: 66, steps: 12, swing: 0, vol: .9,
    bars: [[53, 57, 60, 64], [57, 60, 64, 67], [58, 62, 65, 69], [48, 52, 55, 58]],
    lead: { inst: 'choir', scale: MAJOR, root: 72, p: .9, amp: .045, rhythms: [[0, 6], [0], [0, 4, 8]] },
    beat(m, s, t, d, c) {
      if (s % 2 === 0) m.harp(t, NOTE(c[(s / 2) % c.length] + (s >= 6 ? 12 : 0)), .05);
      if (s === 0) { m.pad(t, c.map(n => NOTE(n)), d * 12, .016); m.pizz(t, NOTE(c[0] - 24), .1); }
      if (s === 0 && m.bar % 2 === 0) m.bell(t, NOTE(c[2] + 24), .03);
    },
    sting(m, t) { for (let i = 0; i < 10; i++) m.harp(t + i * .045, NOTE(60 + [0, 4, 7, 11, 12, 16, 19, 23, 24, 28][i]), .04); }, // harp glissando
  },
};
// Mood → songs, in table order. 'day' and 'night' rotate; any other mood is a happening's kind, whose song cuts
// in straight away (with its `sting`). A happening gets its own music by adding a SONGS entry with `mood: <kind>`.
export const PLAYLISTS = {};
for (const [id, S] of Object.entries(SONGS)) (PLAYLISTS[S.mood] ||= []).push(id);
const isEvent = (S) => S.mood !== 'day' && S.mood !== 'night';
const BARS_PER_SONG = 16;

class Music {
  // audio: anything with { ac, mus, env(), noise() } — the live engine, or an offline one for video clips.
  constructor(audio) { this.a = audio; this.ac = audio.ac; this.timer = null; this.step = 0; this.bar = -1; this.next = 0; this.motif = null; this.notes = 0; this.songId = null; this.moodNow = null; }
  start() {
    if (this.timer) return;
    this.next = this.ac.currentTime + .1; this.step = 0; this.bar = -1;
    this.timer = setInterval(() => this.schedule(), 30);
  }
  stop() { clearInterval(this.timer); this.timer = null; }
  get song() { return SONGS[this.songId] || SONGS.strut; }
  // Background tabs throttle timers to ~1 s, so look further ahead there or the music stutters.
  schedule(until = this.ac.currentTime + (document.hidden ? 1.6 : .15)) {
    while (this.next < until) {
      this.pickSong();
      const S = this.song, n = S.steps, s = this.step % n, dur16 = 60 / S.bpm / 4;
      if (s === 0) this.newBar();
      this.play(s, this.next, dur16);
      this.next += dur16 * (1 + (this.step % 2 ? -S.swing : S.swing)); // swing: pigeons strut
      this.step++;
    }
  }
  // Mood → song. Happenings cut in right away (with a sting); anything else waits for the end of the bar.
  pickSong() {
    const mood = PLAYLISTS[this.a.mood] ? this.a.mood : 'day', S = this.song;
    const atBar = this.step % S.steps === 0;
    if (mood !== this.moodNow && (atBar || PLAYLISTS[mood].length === 1 || isEvent(S))) {
      const list = PLAYLISTS[mood];
      const id = list.includes(this.lastIn?.[mood]) ? this.lastIn[mood] : list[Math.floor(Math.random() * list.length)];
      if (this.songId) SONGS[id].sting?.(this, this.next);
      this.setSong(id, mood);
    } else if (atBar && this.barsIn >= BARS_PER_SONG && PLAYLISTS[mood].length > 1) { // rotate the playlist
      const list = PLAYLISTS[mood];
      this.setSong(list[(list.indexOf(this.songId) + 1) % list.length], mood);
    }
  }
  setSong(id, mood) {
    this.songId = id; this.moodNow = mood; this.step = 0; this.bar = -1; this.barsIn = 0; this.motif = null;
    (this.lastIn ||= {})[mood] = id;
  }
  newBar() {
    const S = this.song, L = S.lead;
    this.bar = (this.bar + 1) % S.bars.length; this.barsIn++;
    // call-and-answer: even bars pick a motif, odd bars get a fresh one
    if (this.bar % 2 === 0 || !this.motif) this.motif = { r: L.rhythms[Math.floor(Math.random() * L.rhythms.length)], seed: Math.random() };
    this.chord = S.bars[this.bar];
    const sc = L.scale, last = this.bar === S.bars.length - 1;
    this.lead = this.motif.r.filter(() => Math.random() < L.p).map((st, i, arr) => {
      const deg = sc[Math.floor((this.motif.seed * 7 + i * 1.7) % sc.length)];
      const tone = i === 0 ? this.chord[Math.floor(this.motif.seed * 3)] + 12 * Math.round((L.root - this.chord[0]) / 12) : L.root + deg + (last && i > 2 ? 2 : 0);
      const nextSt = arr[i + 1] ?? S.steps;
      return { s: st, n: tone, len: i === arr.length - 1 ? Math.min(3, S.steps - st) : Math.min(L.hold ?? 3, Math.max(1, (nextSt - st) * .8)) };
    });
  }
  play(s, t, d) {
    const S = this.song, v = S.vol;
    this.vol = v;
    for (const L of this.lead) if (L.s === s) LEADS[S.lead.inst](this, t, NOTE(L.n), d * L.len, S.lead.amp);
    S.beat(this, s, t, d, this.chord);
  }
  // one note's envelope into the music bus (scaled by the song's level)
  out(dur, peak, t, attack = .01) { this.notes++; return this.a.env(dur, peak * 2.5 * (this.vol ?? 1), this.a.mus, t, attack); }
  osc(type, f, t, stop) { return this.a.osc(type, f, t, stop); }
  lp(f, q = .7) { return this.a.filter('lowpass', f, q); }
  vibrato(param, rate, depth, t, stop) { return this.a.vibrato(param, rate, depth, t, stop); }
  // a lead note that lifts into its pitch from `from`, with vibrato (coo / whistle / kazoo / theremin)
  glide(type, from, f, t, lift, rate, depth, stop) {
    const o = this.osc(type, from, t, stop);
    o.frequency.exponentialRampToValueAtTime(f, t + lift);
    return { o, vib: this.vibrato(o.frequency, rate, depth, t, stop) };
  }
  // a plucked/struck note: the fundamental plus one quieter, shorter partial (music box, harp, piano)
  pluck(t, f, amp, dur, type, attack, ratio, hGain, hDur) {
    const e = this.out(dur, amp, t, attack);
    this.osc(type, f, t, t + dur + .05).connect(e);
    this.osc('sine', f * ratio, t, t + hDur).connect(this.a.gain(hGain)).connect(e);
  }
  cooLead(t, f, dur, amp) { // swoops up into the note from below, like a coo
    const { o } = this.glide('triangle', f * .88, f, t, .06, 5.5, f * .012, t + dur + .2);
    const fl = this.lp(2200); o.connect(fl); fl.connect(this.out(dur + .15, amp, t, .03));
  }
  pad(t, fs, dur, amp, type = 'triangle') { // soft sustained chord
    const g = this.ac.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(amp * 2.5 * (this.vol ?? 1), t + dur * .3); g.gain.linearRampToValueAtTime(0, t + dur);
    const fl = this.lp(type === 'sawtooth' ? 900 : 1600); fl.connect(g); g.connect(this.a.mus); this.notes++;
    fs.forEach((f, i) => { for (const det of [-4, 4]) { const o = this.osc(type, f, t, t + dur + .05); o.detune.value = det + i; o.connect(fl); } });
  }
  harp(t, f, amp) { this.pluck(t, f, amp, 1.1, 'triangle', .002, 2, .2, .5); }
  bell(t, f, amp) { const e = this.out(2.2, amp, t, .002); for (const [r, g] of [[1, 1], [2.76, .4], [5.4, .2]]) this.osc('sine', f * r, t, t + 2.3).connect(this.a.gain(g)).connect(e); }
  pizz(t, f, amp) { const o = this.osc('triangle', f, t, t + .3), fl = this.lp(600); o.connect(fl); fl.connect(this.out(.25, amp, t, .005)); }
  bass(t, f, dur, amp) { const o = this.osc('sawtooth', f, t, t + dur + .05), fl = this.lp(420, 2); o.connect(fl); fl.connect(this.out(dur, amp, t, .005)); }
  throb(t, f, dur, amp) { const o = this.osc('sine', f, t, t + dur + .05); o.frequency.exponentialRampToValueAtTime(f * .985, t + dur); o.connect(this.out(dur, amp, t, .02)); }
  marimba(t, f, amp) { this.osc('sine', f * 2, t, t + .4).connect(this.out(.35, amp, t, .004)); }
  piano(t, f, amp) { this.pluck(t, f, amp, .4, 'triangle', .003, 2, .3, .2); }
  stab(t, fs, amp, kind = 'strings', dur = .18) { // detuned saws through a closing filter: strings (soft) or brass (bright)
    const brass = kind === 'brass', fl = this.lp(brass ? 3200 : 2000, brass ? 3 : 1), e = this.out(dur + .08, amp, t, brass ? .025 : .012);
    fl.frequency.setValueAtTime(brass ? 3200 : 2000, t); fl.frequency.exponentialRampToValueAtTime(brass ? 900 : 1200, t + dur + .08); fl.connect(e);
    fs.forEach(f => { for (const det of [-7, 7]) { const o = this.osc('sawtooth', f, t, t + dur + .1); o.detune.value = det; o.connect(fl); } });
  }
  swoop(t, amp) { const o = this.osc('sawtooth', NOTE(57), t, t + .5), fl = this.lp(2400); o.frequency.exponentialRampToValueAtTime(NOTE(81), t + .45); o.connect(fl); fl.connect(this.out(.5, amp, t, .2)); }
  peck(t, amp) { const o = this.osc('sine', 1900, t, t + .05); o.frequency.exponentialRampToValueAtTime(1200, t + .02); o.connect(this.out(.04, amp, t, .002)); }
  noiseHit(t, dur, amp, type, f, q = 1, attack = .003) { this.a.noiseBurst(t, dur, type, f, q).connect(this.out(dur, amp, t, attack)); }
  flap(t, amp) { this.noiseHit(t, .06, amp, 'highpass', 5000, .7, .004); }
  hat(t, amp, open) { this.noiseHit(t, open ? .22 : .045, amp, 'highpass', 7000); }
  brush(t, amp) { this.noiseHit(t, .16, amp, 'bandpass', 3200, .6, .02); }
  clap(t, amp) { for (const k of [0, .012, .026]) this.noiseHit(t + k, .09, amp, 'bandpass', 1500, 1.2); }
  kick(t, amp) { const o = this.osc('sine', 130, t, t + .22); o.frequency.exponentialRampToValueAtTime(45, t + .12); o.connect(this.out(.2, amp, t, .003)); }
  conga(t, f, amp, slap) { const o = this.osc('sine', f * 1.5, t, t + .3); o.frequency.exponentialRampToValueAtTime(f, t + .03); o.connect(this.out(slap ? .12 : .26, amp, t, .002)); if (slap) this.noiseHit(t, .03, amp * .5, 'bandpass', 2500, 1); }
  cowbell(t, amp) { const b = this.a.filter('bandpass', 800, 2); b.connect(this.out(.22, amp, t, .002)); for (const f of [587, 845]) this.osc('square', f, t, t + .25).connect(b); }
  clave(t, amp) { this.osc('sine', 2500, t, t + .08).connect(this.out(.06, amp, t, .001)); }
  bleep(t, f, amp) { const o = this.osc('square', f, t, t + .07), fl = this.lp(3000); o.connect(fl); fl.connect(this.out(.06, amp, t, .002)); }
  owl(t) { [0, .35].forEach((dd, i) => this.cooLead(t + dd, NOTE(i ? 64 : 67), .3, .03)); } // a far-off night coo
}
export { SONGS };

// Lead instruments: (music, t, freq, dur, amp). A song names one in `lead.inst`.
const LEADS = {
  coo: (m, t, f, dur, amp) => m.cooLead(t, f, dur, amp),
  whistle: (m, t, f, dur, amp) => { // a pure whistled note with a little lift; the vibrato fades in
    const { o, vib } = m.glide('sine', f * .97, f, t, .04, 6, 0, t + dur + .15);
    vib.gain.setValueAtTime(0, t); vib.gain.linearRampToValueAtTime(f * .01, t + .2);
    o.connect(m.out(dur + .1, amp, t, .04));
  },
  kazoo: (m, t, f, dur, amp) => { // buzzy muted-trumpet coo for the shuffle
    const { o } = m.glide('sawtooth', f * .94, f, t, .05, 5, f * .015, t + dur + .1);
    const bp = m.a.filter('bandpass', 1100, 1.4), fl = m.lp(2600); o.connect(bp); bp.connect(fl); fl.connect(m.out(dur + .08, amp, t, .02));
  },
  musicbox: (m, t, f, dur, amp) => m.pluck(t, f, amp, 1.3, 'sine', .002, 4, .25, .4),
  theremin: (m, t, f, dur, amp) => { // glides from the last note; the vibrato widens
    const from = m.lastTheremin || f; m.lastTheremin = f;
    const { o, vib } = m.glide('sine', from, f, t, Math.min(.25, dur * .4), 5.8, f * .006, t + dur + .3);
    vib.gain.setValueAtTime(f * .006, t); vib.gain.linearRampToValueAtTime(f * .03, t + dur);
    o.connect(m.out(dur + .25, amp, t, .08));
  },
  strings: (m, t, f, dur, amp) => m.stab(t, [f], amp, 'strings', dur),
  brass: (m, t, f, dur, amp) => m.stab(t, [f], amp, 'brass', dur * .8),
  choir: (m, t, f, dur, amp) => { // an "aah": two detuned saws through vowel formants, slow swell, gentle vibrato
    const e = m.out(dur + .5, amp, t, Math.min(.35, dur * .4)), vg = m.a.gain(f * .008);
    m.osc('sine', 5, t, t + dur + .6).connect(vg);
    for (const [fq, q, g] of [[800, 6, 1], [1150, 8, .6]]) {
      const bp = m.a.filter('bandpass', fq, q);
      for (const det of [-6, 6]) { const o = m.osc('sawtooth', f, t, t + dur + .6); o.detune.value = det; vg.connect(o.frequency); o.connect(bp); }
      bp.connect(m.a.gain(g)).connect(e);
    }
  },
};

// Render music offline (no speakers, faster than real time) — the soundtrack for video clips, and a way to
// measure each song's level in tests. `song` forces a song id; `extras(audio)` can schedule coos etc.
export async function renderMusic(song, seconds, { sampleRate = 48000, extras } = {}) {
  const ac = new OfflineAudioContext(2, Math.ceil(sampleRate * seconds), sampleRate);
  const a = new Audio(); a.buildGraph(ac); a.lastCoo = -1;
  a.sfx.gain.value = .8; a.mus.gain.value = .6;
  a.mood = SONGS[song]?.mood || 'day';
  const m = new Music(a); m.setSong(song, a.mood); m.next = .02;
  m.schedule(seconds);
  extras?.(a);
  const fade = a.master.gain; fade.setValueAtTime(.9, Math.max(0, seconds - .6)); fade.linearRampToValueAtTime(0, seconds); // tail out
  return { buffer: await ac.startRendering(), notes: m.notes };
}
