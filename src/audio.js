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
  get muted() { return !this.sfxOn; }                  // legacy name (old saves / callers)
  set muted(v) { this.sfxOn = !v; this.applyGains(); }

  // Create (or resume) the engine — only ever from a user gesture, and only if something is switched on.
  unlock() {
    if (!this.anyOn()) return;
    if (this.ac) { if (this.ac.state !== 'running' && this.ac.state !== 'closed') this.ac.resume(); return; }
    try {
      const ac = this.ac = new (window.AudioContext || window.webkitAudioContext)();
      // master → gentle compressor → speakers, so stacked coos + music never clip
      this.comp = ac.createDynamicsCompressor(); this.comp.threshold.value = -14; this.comp.ratio.value = 4; this.comp.attack.value = .005; this.comp.release.value = .2;
      this.master = ac.createGain(); this.master.gain.value = .9; this.master.connect(this.comp); this.comp.connect(ac.destination);
      this.sfx = ac.createGain(); this.sfx.connect(this.master);
      this.mus = ac.createGain(); this.mus.connect(this.master);
      this.applyGains();
      this.music = new Music(this);
      if (this.musicOn) this.music.start();
      // phones can wake a suspended context on their own (iOS after an interruption): if everything is
      // muted when that happens, shut it down again
      ac.onstatechange = () => { if (ac.state === 'running' && !this.anyOn()) this.shutdown(); };
    } catch (e) { this.ac = null; }
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
  // Rain: a looping filtered-noise bed on the sfx bus (so muting sounds silences it too).
  setRain(on) {
    if (!this.ac || !this.sfxOn || !!this.rainSrc === on) return;
    if (on) {
      const len = this.ac.sampleRate * 2, buf = this.ac.createBuffer(1, len, this.ac.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      const src = this.rainSrc = this.ac.createBufferSource(); src.buffer = buf; src.loop = true;
      const f = this.ac.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1400;
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
  play(name, o = {}) {
    if (!this.ok()) return;
    if (name === 'coo') return this.coo(o.voice, o.vol, o.pitch, o.pan);
    if (name === 'chime') return this.chime();
    if (name === 'pop') return this.pop();
    if (name === 'whoosh') return this.whoosh();
    if (name === 'shutter') return this.shutter();
  }

  // ---------- coos ----------
  // A pigeon coo is a breathy, throaty "oo" that GLIDES — not a clean tone that steps between notes
  // (clean stepped tones from many birds read as a slow melody). Source: sawtooth + sine through an
  // "oo" vowel formant, a little breath noise, a slight rattle, and small random pitch wobble.
  // pitch: per-bird multiplier (big birds low, dinky birds high). pan/dist: where the bird is.
  coo(voice, vol = 1, pitch = 1, pan = 0) {
    const ac = this.ac, t = ac.currentTime;
    if (t - this.lastCoo < .12) return; this.lastCoo = t;
    const out = ac.createStereoPanner ? ac.createStereoPanner() : ac.createGain();
    if (out.pan) out.pan.value = Math.max(-.85, Math.min(.85, pan));
    out.connect(this.sfx);
    if (voice === 'laugher') return this.laugh(t, vol, pitch, out);
    if (voice === 'trumpet') return this.trumpet(t, vol, pitch, out);
    const base = (255 + Math.random() * 70) * pitch;
    const j = () => 1 + (Math.random() - .5) * .06; // a few percent of wobble, so nothing lands on a scale
    // one syllable: glide up to a peak then sag, with a rattle
    const syll = (at, dur, amp, rise, sag, rattle) => {
      const f0 = base * j(), pk = f0 * rise * j(), f2 = f0 * sag * j();
      const saw = ac.createOscillator(), sin = ac.createOscillator();
      saw.type = 'sawtooth'; sin.type = 'sine';
      for (const o of [saw, sin]) {
        o.frequency.setValueAtTime(f0, at);
        o.frequency.exponentialRampToValueAtTime(pk, at + dur * .3);
        o.frequency.exponentialRampToValueAtTime(f2, at + dur * .95);
      }
      const vowel = ac.createBiquadFilter(); vowel.type = 'bandpass'; vowel.frequency.value = 480 * pitch; vowel.Q.value = 2.2;
      const soft = ac.createBiquadFilter(); soft.type = 'lowpass'; soft.frequency.value = 900;
      const sg = ac.createGain(); sg.gain.value = .35;
      const g = this.env(dur, amp * vol, out, at, .05);
      const am = ac.createGain(); am.gain.value = 1 - rattle * .5;
      const lfo = ac.createOscillator(), lg = ac.createGain(); lfo.frequency.value = 22 + Math.random() * 14; lg.gain.value = rattle * .5;
      lfo.connect(lg); lg.connect(am.gain);
      saw.connect(vowel); vowel.connect(am); sin.connect(sg); sg.connect(soft); soft.connect(am); am.connect(g);
      // breath: band-limited noise under the voice
      const br = this.noise(dur), bf = ac.createBiquadFilter(); bf.type = 'bandpass'; bf.frequency.value = 420 * pitch; bf.Q.value = 1.2;
      br.connect(bf); bf.connect(this.env(dur, amp * vol * .45, out, at, .06));
      for (const o of [saw, sin, lfo]) { o.start(at); o.stop(at + dur + .03); } br.start(at);
    };
    const shapes = ['coo', 'coo', 'double', 'long', 'rattle', 'grumble'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    if (shape === 'coo') syll(t, .42, .16, 1.1, .82, .25);
    else if (shape === 'double') { syll(t, .2, .12, 1.06, .9, .2); syll(t + .24, .45, .16, 1.12, .8, .3); }
    else if (shape === 'long') syll(t, .75, .15, 1.14, .78, .35);
    else if (shape === 'rattle') syll(t, .5, .15, 1.08, .85, .75);
    else syll(t, .38, .13, 1.02, .88, .55); // low grumble
  }
  trumpet(t, vol, pitch, out = this.sfx) {
    const ac = this.ac, o = ac.createOscillator(), f = ac.createBiquadFilter();
    o.type = 'sawtooth'; o.frequency.setValueAtTime(210 * pitch, t); o.frequency.linearRampToValueAtTime(160 * pitch, t + .4);
    const lfo = ac.createOscillator(), lg = ac.createGain(); lfo.frequency.value = 7; lg.gain.value = 6; lfo.connect(lg); lg.connect(o.frequency); // drumroll wobble
    f.type = 'lowpass'; f.frequency.value = 620;
    o.connect(f); f.connect(this.env(.55, .07 * vol, out)); o.start(t); o.stop(t + .56); lfo.start(t); lfo.stop(t + .56);
  }
  laugh(t, vol, pitch, out = this.sfx) { // a rapid descending "hoo-hoo-hoo-hoo"
    const ac = this.ac;
    for (let i = 0; i < 5; i++) {
      const o = ac.createOscillator(), f = ac.createBiquadFilter(), t0 = t + i * .085;
      o.type = 'sine'; o.frequency.setValueAtTime((520 - i * 30) * pitch, t0); o.frequency.exponentialRampToValueAtTime((380 - i * 25) * pitch, t0 + .07);
      f.type = 'lowpass'; f.frequency.value = 1000;
      o.connect(f); f.connect(this.env(.08, .09 * vol, out, t0, .015)); o.start(t0); o.stop(t0 + .09);
    }
  }
  chime() { const t = this.ac.currentTime; [740, 1108].forEach((fr, i) => { const o = this.ac.createOscillator(); o.type = 'triangle'; o.frequency.value = fr; o.connect(this.env(.7 + i * .2, .1, this.sfx, t + i * .09)); o.start(t + i * .09); o.stop(t + 1); }); }
  pop() { const t = this.ac.currentTime, o = this.ac.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(300, t); o.frequency.exponentialRampToValueAtTime(90, t + .12); o.connect(this.env(.14, .16)); o.start(t); o.stop(t + .15); }
  noise(dur) {
    const ac = this.ac, len = Math.max(1, Math.floor(ac.sampleRate * dur)), buf = ac.createBuffer(1, len, ac.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ac.createBufferSource(); src.buffer = buf; return src;
  }
  whoosh() { const src = this.noise(.3), f = this.ac.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 700; src.connect(f); f.connect(this.env(.3, .12)); src.start(); }
  shutter() { const t = this.ac.currentTime; [0, .07].forEach((d) => { const src = this.noise(.05), f = this.ac.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 2500; src.connect(f); f.connect(this.env(.05, .25, this.sfx, t + d, .003)); src.start(t + d); }); }
}

// ---------- generative soundtrack ----------
// A four-bar loop (C – Am – F – G) on a 16th-note grid. Instruments are all pigeon-flavoured:
// a "coo" lead that swoops into each note, a pizzicato bass, beak-peck woodblocks, wing-flap shakers,
// a marimba for chords. The mood (day / night / dance) changes tempo, density and the drums.
const CHORDS = [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]]; // C, Am, F, G
const PENTA = [0, 2, 4, 7, 9];
const RHYTHMS = [ // lead onsets per bar (16ths)
  [0, 4, 6, 8, 12], [0, 3, 6, 10, 12, 14], [0, 2, 4, 8, 11], [0, 6, 8, 10, 12], [2, 4, 8, 12, 13, 14],
];
const MOODS = {
  day: { bpm: 104, leadP: 1, bass: [0, 6, 8, 12], peck: [4, 12], flap: [2, 6, 10, 14], kick: [], marimba: [0, 8], vol: 1 },
  night: { bpm: 80, leadP: .55, bass: [0, 8], peck: [12], flap: [], kick: [], marimba: [0], vol: .7 },
  dance: { bpm: 122, leadP: 1, bass: [0, 3, 6, 8, 11, 14], peck: [4, 12], flap: [2, 6, 10, 14], kick: [0, 4, 8, 12], marimba: [0, 4, 8, 12], vol: 1.1 },
};

class Music {
  constructor(audio) { this.a = audio; this.ac = audio.ac; this.timer = null; this.step = 0; this.bar = 0; this.next = 0; this.motif = null; }
  start() {
    if (this.timer) return;
    this.next = this.ac.currentTime + .1; this.step = 0;
    this.timer = setInterval(() => this.schedule(), 30);
  }
  stop() { clearInterval(this.timer); this.timer = null; }
  schedule() {
    const ac = this.ac;
    // Background tabs throttle timers to ~1 s, so look further ahead there or the music stutters.
    const ahead = document.hidden ? 1.6 : .15;
    while (this.next < ac.currentTime + ahead) {
      const M = MOODS[this.a.mood] || MOODS.day, dur16 = 60 / M.bpm / 4;
      if (this.step % 16 === 0) this.newBar(M);
      this.play(this.step % 16, this.next, dur16, M);
      this.next += dur16 * (this.step % 2 ? .92 : 1.08); // a little swing: pigeons strut
      this.step++;
    }
  }
  newBar(M) {
    this.bar = (this.bar + 1) % 4;
    // call-and-answer: bars 0 & 2 share a motif, 1 & 3 get a fresh one
    if (this.bar % 2 === 0 || !this.motif) this.motif = { r: RHYTHMS[Math.floor(Math.random() * RHYTHMS.length)], seed: Math.random() };
    this.chord = CHORDS[this.bar];
    this.lead = this.motif.r.filter(() => Math.random() < M.leadP).map((s, i) => {
      const deg = PENTA[Math.floor((this.motif.seed * 7 + i * 1.7) % PENTA.length)];
      const tone = i === 0 ? this.chord[Math.floor(this.motif.seed * 3)] + 12 : 72 + deg + (this.bar === 3 && i > 2 ? 2 : 0);
      return { s, n: tone, len: i === this.motif.r.length - 1 ? 3 : 1.6 };
    });
  }
  play(s, t, d, M) {
    const v = M.vol;
    for (const L of this.lead) if (L.s === s) this.cooLead(t, NOTE(L.n), d * L.len, .07 * v);
    if (M.bass.includes(s)) this.pizz(t, NOTE(this.chord[0] - 24 + (s === 6 || s === 14 ? 7 : 0)), .16 * v);
    if (M.marimba.includes(s)) this.chord.forEach((n, i) => this.marimba(t + i * .012, NOTE(n), .035 * v));
    if (M.peck.includes(s)) this.peck(t, .09 * v);
    if (M.flap.includes(s)) this.flap(t, .025 * v);
    if (M.kick.includes(s)) this.kick(t, .22);
    if (this.a.mood === 'night' && s === 0 && this.bar === 0) this.owl(t);
  }
  out(dur, peak, t, attack = .01) { return this.a.env(dur, peak * 2.5, this.a.mus, t, attack); }
  cooLead(t, f, dur, amp) { // swoops up into the note from below, like a coo
    const o = this.ac.createOscillator(), vib = this.ac.createOscillator(), vg = this.ac.createGain();
    o.type = 'triangle'; o.frequency.setValueAtTime(f * .88, t); o.frequency.exponentialRampToValueAtTime(f, t + .06);
    vib.frequency.value = 5.5; vg.gain.value = f * .012; vib.connect(vg); vg.connect(o.frequency);
    const fl = this.ac.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = 2200;
    o.connect(fl); fl.connect(this.out(dur + .15, amp, t, .03));
    o.start(t); o.stop(t + dur + .2); vib.start(t); vib.stop(t + dur + .2);
  }
  pizz(t, f, amp) { const o = this.ac.createOscillator(), fl = this.ac.createBiquadFilter(); o.type = 'triangle'; o.frequency.value = f; fl.type = 'lowpass'; fl.frequency.value = 600; o.connect(fl); fl.connect(this.out(.25, amp, t, .005)); o.start(t); o.stop(t + .3); }
  marimba(t, f, amp) { const o = this.ac.createOscillator(); o.type = 'sine'; o.frequency.value = f * 2; o.connect(this.out(.35, amp, t, .004)); o.start(t); o.stop(t + .4); }
  peck(t, amp) { const o = this.ac.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(1900, t); o.frequency.exponentialRampToValueAtTime(1200, t + .02); o.connect(this.out(.04, amp, t, .002)); o.start(t); o.stop(t + .05); }
  flap(t, amp) { const src = this.a.noise(.06), f = this.ac.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 5000; src.connect(f); f.connect(this.out(.06, amp, t, .004)); src.start(t); }
  kick(t, amp) { const o = this.ac.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(130, t); o.frequency.exponentialRampToValueAtTime(45, t + .12); o.connect(this.out(.2, amp, t, .003)); o.start(t); o.stop(t + .22); }
  owl(t) { [0, .35].forEach((d, i) => this.cooLead(t + d, NOTE(i ? 64 : 67), .3, .03)); } // a far-off night coo
}
