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
  get songTitle() { return this.music?.timer ? this.music.song.title : null; }
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
  coo(voice, vol = 1, pitch = 1, pan = 0, at) {
    const ac = this.ac, t = at ?? ac.currentTime;
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
// Songs on a 16th-note grid (12 steps a bar for the 3-time ones). Each song: tempo, swing, a chord per bar,
// a generated lead (a rhythm motif per bar, call-and-answer, notes from the song's scale) and a `beat`
// function that plays the band for one step. The park picks a playlist by mood — day songs rotate every
// few bars, night has its own — and happenings cut straight into their own song (UFO, disco, conga line)
// with a short sting, then hand back to the park.
const PENTA = [0, 2, 4, 7, 9], MAJOR = [0, 2, 4, 5, 7, 9, 11], MINOR_P = [0, 3, 5, 7, 10], WHOLE = [0, 2, 4, 6, 8, 10], DORIAN = [0, 2, 3, 5, 7, 9, 10];
const SONGS = {
  strut: { // the original park tune: C – Am – F – G, coo lead, pizzicato bass, peck woodblocks, wing-flap shakers
    title: 'Pigeon Strut', bpm: 104, steps: 16, swing: .08, vol: 1,
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
    title: 'Breadcrumb Waltz', bpm: 150, steps: 12, swing: 0, vol: 1,
    bars: [[53, 57, 60], [50, 53, 57], [55, 58, 62], [48, 52, 55, 58], [53, 57, 60], [58, 62, 65], [48, 52, 55], [53, 57, 60]],
    lead: { inst: 'whistle', scale: MAJOR, root: 77, p: .95, amp: .06, rhythms: [[0, 4, 8], [0, 6, 8], [0, 8, 10], [0, 4, 6, 8], [0]] },
    beat(m, s, t, d, c) {
      if (s === 0) m.pizz(t, NOTE(c[0] - 12), .2);
      if (s === 4 || s === 8) c.slice(0, 3).forEach((n, i) => m.marimba(t + i * .008, NOTE(n), .03));
      if (s === 0 && m.bar % 2) m.flap(t, .02);
    },
  },
  shuffle: { // Bench Shuffle: swung I–vi–ii–V, walking bass, brushes, a kazoo-ish "trumpeter" coo
    title: 'Bench Shuffle', bpm: 96, steps: 16, swing: .2, vol: 1,
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
    title: 'Pigeon Strut (after dark)', bpm: 80, steps: 16, swing: .08, vol: .7,
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
    title: 'Streetlamp Lullaby', bpm: 66, steps: 12, swing: 0, vol: .75,
    bars: [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]],
    lead: { inst: 'musicbox', scale: PENTA, root: 84, p: .8, amp: .05, rhythms: [[0, 2, 4, 6, 8, 10], [0, 4, 6, 10], [0, 2, 6, 8]] },
    beat(m, s, t, d, c) {
      if (s === 0) { m.pad(t, c.map(NOTE), d * 12, .018); m.pizz(t, NOTE(c[0] - 24), .1); }
      if (s === 6) m.pizz(t, NOTE(c[2] - 24), .07);
    },
  },
  ufo: { // Close Encounter: theremin glides over eerie minor chords, a throbbing bass and computer bleeps
    title: 'Close Encounter', bpm: 84, steps: 16, swing: 0, vol: .85, event: 1,
    bars: [[48, 51, 55, 62], [44, 48, 51, 58], [41, 44, 48, 55], [43, 47, 50, 56]],
    lead: { inst: 'theremin', scale: WHOLE, root: 72, p: 1, amp: .06, rhythms: [[0, 8], [0, 6, 12], [0], [0, 4, 8, 12]] },
    beat(m, s, t, d, c) {
      if (s % 2 === 0) m.throb(t, NOTE(c[0] - 12), d * 1.8, s % 8 === 0 ? .14 : .08);
      if (s === 0) m.pad(t, c.map(n => NOTE(n + 12)), d * 16, .02, 'sawtooth');
      if (Math.random() < .22) m.bleep(t, NOTE(84 + WHOLE[Math.floor(Math.random() * 6)]), .02);
    },
  },
  disco: { // Coo Fever: four on the floor, open hats, octave bass, string stabs, a clapping chorus
    title: 'Coo Fever', bpm: 120, steps: 16, swing: 0, vol: .8, event: 1,
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
  },
  conga: { // Conga Line: I–IV–V–IV, congas + cowbell + clave, piano montuno, a big brass "HEY" on every fourth beat
    title: 'Conga Line', bpm: 128, steps: 16, swing: 0, vol: .75, event: 1,
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
  },
};
const PLAYLISTS = { day: ['strut', 'waltz', 'shuffle'], night: ['night', 'lullaby'], dance: ['disco'], conga: ['conga'], ufo: ['ufo'] };
const BARS_PER_SONG = 16;

class Music {
  // audio: anything with { ac, mus, env(), noise() } — the live engine, or an offline one for video clips.
  constructor(audio) { this.a = audio; this.ac = audio.ac; this.timer = null; this.step = 0; this.bar = -1; this.next = 0; this.motif = null; this.notes = 0; this.songId = null; this.moodNow = null; this.plays = {}; }
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
    if (mood !== this.moodNow && (atBar || PLAYLISTS[mood].length === 1 || S.event)) {
      const list = PLAYLISTS[mood];
      const id = list.includes(this.lastIn?.[mood]) ? this.lastIn[mood] : list[Math.floor(Math.random() * list.length)];
      if (SONGS[id].event && this.songId) this.sting(id, this.next);
      this.setSong(id, mood);
    } else if (atBar && this.barsIn >= BARS_PER_SONG && PLAYLISTS[mood].length > 1) { // rotate the playlist
      const list = PLAYLISTS[mood];
      this.setSong(list[(list.indexOf(this.songId) + 1) % list.length], mood);
    }
  }
  setSong(id, mood) {
    this.songId = id; this.moodNow = mood; this.step = 0; this.bar = -1; this.barsIn = 0; this.motif = null;
    (this.lastIn ||= {})[mood] = id; this.plays[id] = (this.plays[id] || 0) + 1;
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
    for (const L of this.lead) if (L.s === s) this.leadNote(S.lead.inst, t, NOTE(L.n), d * L.len, S.lead.amp);
    S.beat(this, s, t, d, this.chord);
  }
  leadNote(inst, t, f, dur, amp) {
    if (inst === 'coo') return this.cooLead(t, f, dur, amp);
    if (inst === 'whistle') return this.whistle(t, f, dur, amp);
    if (inst === 'kazoo') return this.kazoo(t, f, dur, amp);
    if (inst === 'musicbox') return this.musicbox(t, f, amp);
    if (inst === 'theremin') return this.theremin(t, f, dur, amp);
    if (inst === 'strings') return this.stab(t, [f], amp, 'strings', dur);
    if (inst === 'brass') return this.stab(t, [f], amp, 'brass', dur * .8);
  }
  // one note's envelope into the music bus (scaled by the song's level)
  out(dur, peak, t, attack = .01) { this.notes++; return this.a.env(dur, peak * 2.5 * (this.vol ?? 1), this.a.mus, t, attack); }
  osc(type, f, t, stop) { const o = this.ac.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, t); o.start(t); o.stop(stop); return o; }
  lp(f, q = .7) { const b = this.ac.createBiquadFilter(); b.type = 'lowpass'; b.frequency.value = f; b.Q.value = q; return b; }
  cooLead(t, f, dur, amp) { // swoops up into the note from below, like a coo
    const o = this.osc('triangle', f * .88, t, t + dur + .2), vib = this.osc('sine', 5.5, t, t + dur + .2), vg = this.ac.createGain();
    o.frequency.exponentialRampToValueAtTime(f, t + .06);
    vg.gain.value = f * .012; vib.connect(vg); vg.connect(o.frequency);
    const fl = this.lp(2200); o.connect(fl); fl.connect(this.out(dur + .15, amp, t, .03));
  }
  whistle(t, f, dur, amp) { // a pure whistled note with a little lift and vibrato
    const o = this.osc('sine', f * .97, t, t + dur + .15), vib = this.osc('sine', 6, t, t + dur + .15), vg = this.ac.createGain();
    o.frequency.exponentialRampToValueAtTime(f, t + .04);
    vg.gain.setValueAtTime(0, t); vg.gain.linearRampToValueAtTime(f * .01, t + .2); vib.connect(vg); vg.connect(o.frequency);
    o.connect(this.out(dur + .1, amp, t, .04));
  }
  kazoo(t, f, dur, amp) { // buzzy muted-trumpet coo for the shuffle
    const o = this.osc('sawtooth', f * .94, t, t + dur + .1), vib = this.osc('sine', 5, t, t + dur + .1), vg = this.ac.createGain();
    o.frequency.exponentialRampToValueAtTime(f, t + .05);
    vg.gain.value = f * .015; vib.connect(vg); vg.connect(o.frequency);
    const bp = this.ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1100; bp.Q.value = 1.4;
    const fl = this.lp(2600); o.connect(bp); bp.connect(fl); fl.connect(this.out(dur + .08, amp, t, .02));
  }
  musicbox(t, f, amp) { const e = this.out(1.3, amp, t, .002); this.osc('sine', f, t, t + 1.35).connect(e); const h = this.ac.createGain(); h.gain.value = .25; this.osc('sine', f * 4, t, t + .4).connect(h); h.connect(e); }
  theremin(t, f, dur, amp) { // glides from the last note, wide slow vibrato
    const from = this.lastTheremin || f; this.lastTheremin = f;
    const o = this.osc('sine', from, t, t + dur + .3), vib = this.osc('sine', 5.8, t, t + dur + .3), vg = this.ac.createGain();
    o.frequency.exponentialRampToValueAtTime(f, t + Math.min(.25, dur * .4));
    vg.gain.setValueAtTime(f * .006, t); vg.gain.linearRampToValueAtTime(f * .03, t + dur); vib.connect(vg); vg.connect(o.frequency);
    o.connect(this.out(dur + .25, amp, t, .08));
  }
  pad(t, fs, dur, amp, type = 'triangle') { // soft sustained chord
    const g = this.ac.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(amp * 2.5 * (this.vol ?? 1), t + dur * .3); g.gain.linearRampToValueAtTime(0, t + dur);
    const fl = this.lp(type === 'sawtooth' ? 900 : 1600); fl.connect(g); g.connect(this.a.mus); this.notes++;
    fs.forEach((f, i) => { for (const det of [-4, 4]) { const o = this.osc(type, f, t, t + dur + .05); o.detune.value = det + i; o.connect(fl); } });
  }
  pizz(t, f, amp) { const o = this.osc('triangle', f, t, t + .3), fl = this.lp(600); o.connect(fl); fl.connect(this.out(.25, amp, t, .005)); }
  bass(t, f, dur, amp) { const o = this.osc('sawtooth', f, t, t + dur + .05), fl = this.lp(420, 2); o.connect(fl); fl.connect(this.out(dur, amp, t, .005)); }
  throb(t, f, dur, amp) { const o = this.osc('sine', f, t, t + dur + .05); o.frequency.exponentialRampToValueAtTime(f * .985, t + dur); o.connect(this.out(dur, amp, t, .02)); }
  marimba(t, f, amp) { this.osc('sine', f * 2, t, t + .4).connect(this.out(.35, amp, t, .004)); }
  piano(t, f, amp) { const e = this.out(.4, amp, t, .003); this.osc('triangle', f, t, t + .45).connect(e); const h = this.ac.createGain(); h.gain.value = .3; this.osc('sine', f * 2, t, t + .2).connect(h); h.connect(e); }
  stab(t, fs, amp, kind = 'strings', dur = .18) { // detuned saws through a closing filter: strings (soft) or brass (bright)
    const brass = kind === 'brass', fl = this.lp(brass ? 3200 : 2000, brass ? 3 : 1), e = this.out(dur + .08, amp, t, brass ? .025 : .012);
    fl.frequency.setValueAtTime(brass ? 3200 : 2000, t); fl.frequency.exponentialRampToValueAtTime(brass ? 900 : 1200, t + dur + .08); fl.connect(e);
    fs.forEach(f => { for (const det of [-7, 7]) { const o = this.osc('sawtooth', f, t, t + dur + .1); o.detune.value = det; o.connect(fl); } });
  }
  swoop(t, amp) { const o = this.osc('sawtooth', NOTE(57), t, t + .5), fl = this.lp(2400); o.frequency.exponentialRampToValueAtTime(NOTE(81), t + .45); o.connect(fl); fl.connect(this.out(.5, amp, t, .2)); }
  peck(t, amp) { const o = this.osc('sine', 1900, t, t + .05); o.frequency.exponentialRampToValueAtTime(1200, t + .02); o.connect(this.out(.04, amp, t, .002)); }
  noiseHit(t, dur, amp, type, f, q = 1, attack = .003) { const src = this.a.noise(dur), b = this.ac.createBiquadFilter(); b.type = type; b.frequency.value = f; b.Q.value = q; src.connect(b); b.connect(this.out(dur, amp, t, attack)); src.start(t); }
  flap(t, amp) { this.noiseHit(t, .06, amp, 'highpass', 5000, .7, .004); }
  hat(t, amp, open) { this.noiseHit(t, open ? .22 : .045, amp, 'highpass', 7000); }
  brush(t, amp) { this.noiseHit(t, .16, amp, 'bandpass', 3200, .6, .02); }
  clap(t, amp) { for (const k of [0, .012, .026]) this.noiseHit(t + k, .09, amp, 'bandpass', 1500, 1.2); }
  kick(t, amp) { const o = this.osc('sine', 130, t, t + .22); o.frequency.exponentialRampToValueAtTime(45, t + .12); o.connect(this.out(.2, amp, t, .003)); }
  conga(t, f, amp, slap) { const o = this.osc('sine', f * 1.5, t, t + .3); o.frequency.exponentialRampToValueAtTime(f, t + .03); o.connect(this.out(slap ? .12 : .26, amp, t, .002)); if (slap) this.noiseHit(t, .03, amp * .5, 'bandpass', 2500, 1); }
  cowbell(t, amp) { const e = this.out(.22, amp, t, .002), b = this.ac.createBiquadFilter(); b.type = 'bandpass'; b.frequency.value = 800; b.Q.value = 2; b.connect(e); for (const f of [587, 845]) this.osc('square', f, t, t + .25).connect(b); }
  clave(t, amp) { this.osc('sine', 2500, t, t + .08).connect(this.out(.06, amp, t, .001)); }
  bleep(t, f, amp) { const o = this.osc('square', f, t, t + .07), fl = this.lp(3000); o.connect(fl); fl.connect(this.out(.06, amp, t, .002)); }
  owl(t) { [0, .35].forEach((dd, i) => this.cooLead(t + dd, NOTE(i ? 64 : 67), .3, .03)); } // a far-off night coo
  // A short cut-in as a happening grabs the music.
  sting(id, t) {
    if (id === 'ufo') { const o = this.osc('sine', 1400, t, t + 1.1), v = this.osc('sine', 9, t, t + 1.1), vg = this.ac.createGain(); vg.gain.value = 60; v.connect(vg); vg.connect(o.frequency); o.frequency.exponentialRampToValueAtTime(180, t + 1); o.connect(this.out(1.05, .07, t, .05)); }
    else if (id === 'disco') { this.noiseHit(t, .25, .12, 'bandpass', 900, 2.5); this.swoop(t, .04); } // needle drop
    else if (id === 'conga') { const o = this.osc('sine', 2600, t, t + .5), v = this.osc('square', 28, t, t + .5), vg = this.ac.createGain(); vg.gain.value = 220; v.connect(vg); vg.connect(o.frequency); o.connect(this.out(.45, .05, t, .01)); } // whistle
  }
}
export { SONGS, PLAYLISTS, Music };

// Render music offline (no speakers, faster than real time) — the soundtrack for video clips, and a way to
// measure each song's level in tests. `song` forces a song id; `extras(audio)` can schedule coos etc.
export async function renderMusic(song, seconds, { sampleRate = 48000, extras } = {}) {
  const ac = new OfflineAudioContext(2, Math.ceil(sampleRate * seconds), sampleRate);
  const a = new Audio(); a.buildGraph(ac); a.lastCoo = -1;
  a.sfx.gain.value = .8; a.mus.gain.value = .6;
  a.mood = Object.keys(PLAYLISTS).find(k => PLAYLISTS[k].includes(song)) || 'day';
  const m = new Music(a); m.setSong(song, a.mood); m.next = .02;
  m.schedule(seconds);
  extras?.(a);
  const fade = a.master.gain; fade.setValueAtTime(.9, Math.max(0, seconds - .6)); fade.linearRampToValueAtTime(0, seconds); // tail out
  return { buffer: await ac.startRendering(), notes: m.notes };
}
