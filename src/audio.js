// Pigeon Park — synth coos and UI sounds (ported from the prototype). Unlocked on first gesture.

export class Audio {
  constructor() { this.ac = null; this.muted = false; this.lastCoo = 0; }
  unlock() {
    if (this.ac) { if (this.ac.state === 'suspended') this.ac.resume(); return; }
    try {
      this.ac = new (window.AudioContext || window.webkitAudioContext)();
      this.master = this.ac.createGain(); this.master.gain.value = .5; this.master.connect(this.ac.destination);
    } catch (e) { this.ac = null; }
  }
  ok() { return this.ac && !this.muted && this.ac.state === 'running'; }
  env(dur, peak) {
    const g = this.ac.createGain(), t = this.ac.currentTime;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + .03); g.gain.exponentialRampToValueAtTime(.001, t + dur);
    g.connect(this.master); return g;
  }
  play(name, o = {}) {
    if (!this.ok()) return;
    if (name === 'coo') return this.coo(o.voice, o.vol);
    if (name === 'chime') return this.chime();
    if (name === 'pop') return this.pop();
    if (name === 'whoosh') return this.whoosh();
  }
  coo(voice, vol = 1) {
    const ac = this.ac, t = ac.currentTime;
    if (t - this.lastCoo < .08) return; this.lastCoo = t;
    const o = ac.createOscillator(), f = ac.createBiquadFilter(); f.type = 'lowpass';
    if (voice === 'trumpet') {
      o.type = 'sawtooth'; o.frequency.setValueAtTime(210, t); o.frequency.linearRampToValueAtTime(160, t + .4); f.frequency.value = 620;
      o.connect(f); f.connect(this.env(.5, .07 * vol)); o.start(t); o.stop(t + .5);
    } else {
      const base = 400 + Math.random() * 60;
      o.type = 'sine'; o.frequency.setValueAtTime(base, t); o.frequency.exponentialRampToValueAtTime(base * .74, t + .1); o.frequency.exponentialRampToValueAtTime(base * .93, t + .22); f.frequency.value = 900;
      o.connect(f); f.connect(this.env(.3, .12 * vol)); o.start(t); o.stop(t + .32);
    }
  }
  chime() { const t = this.ac.currentTime; [740, 1108].forEach((fr, i) => { const o = this.ac.createOscillator(); o.type = 'triangle'; o.frequency.value = fr; o.connect(this.env(.7 + i * .2, .1)); o.start(t + i * .09); o.stop(t + 1); }); }
  pop() { const t = this.ac.currentTime, o = this.ac.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(300, t); o.frequency.exponentialRampToValueAtTime(90, t + .12); o.connect(this.env(.14, .16)); o.start(t); o.stop(t + .15); }
  whoosh() {
    const ac = this.ac, len = ac.sampleRate * .3, buf = ac.createBuffer(1, len, ac.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ac.createBufferSource(); src.buffer = buf;
    const f = ac.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 700;
    src.connect(f); f.connect(this.env(.3, .12)); src.start();
  }
}
