
class Component extends DCLogic {
  state = { ready: false, selId: null, roostSel: null, dialog: null, muted: false, drag: null, overRoost: false, narrow: typeof window !== 'undefined' && window.innerWidth < 920, pediaSeen: 0, breedsSeen: 0 };
  g = { pigeons: [], eggs: [], poops: [], sparkles: [], toasts: [], roost: [], discovered: {}, breeds: {}, stats: { births: 0, flown: 0, maxGen: 1 }, court: null };
  ids = 1; sprC = new Map(); fw = 800; fh = 440; night = 0; dragCand = null;
  fieldRef = React.createRef(); roostRef = React.createRef();
  KEY = 'pigeon-park-save-v1'; DAY = 170000;

  prop(k, d) { const v = this.props ? this.props[k] : undefined; return v === undefined || v === null ? d : v; }
  cap() { return Math.round(this.prop('maxPigeons', 45)); }
  spd() { return (this.state.speed != null ? this.state.speed : (Number(this.prop('simSpeed', 1)) || 1)) * 1.4; }
  mutF() { return { calm: 0.5, normal: 1, chaos: 3 }[this.state.mut || this.prop('mutationRate', 'normal')] || 1; }

  async componentDidMount() {
    const [M, S] = await Promise.all([import(window.__resources?.genetics || './genetics.js'), import(window.__resources?.sprites || './sprites.js')]);
    this.M = M; this.S = S;
    this.breedSprites = {};
    M.BREEDS.forEach(b => { this.breedSprites[b.id] = S.spriteURI(M.breedSample(b)); });
    const wild = M.derivePheno(Object.fromEntries(M.LOCI.map(l => { const e = {}; return [l.id, l.id === 'base' ? 'blue' : l.id === 'pattern' ? 'bar' : l.id === 'spread' ? 'no' : l.id === 'dilute' ? 'full' : l.id === 'recred' ? 'no' : l.id === 'grizzle' ? 'no' : l.id === 'pied' ? 'solid' : l.id === 'sheen' ? 'normal' : l.id === 'fantasy' ? 'none' : l.id === 'fpattern' ? 'none' : l.id === 'glow' ? 'none' : l.alleles[0]]; })), null);
    this.wildURI = S.spriteURI(wild);
    this.load();
    this.t0 = Date.now() - (this.savedPh != null ? this.savedPh : 0.16) * this.DAY;
    this.timer = setInterval(() => this.tick(), 450);
    this.saveTimer = setInterval(() => this.save(), 6000);
    this.onMove = this.onMove.bind(this); this.onUp = this.onUp.bind(this); this.onResize = this.onResize.bind(this); this.unlockAudio = this.unlockAudio.bind(this);
    window.addEventListener('pointermove', this.onMove);
    window.addEventListener('pointerup', this.onUp);
    window.addEventListener('resize', this.onResize);
    window.addEventListener('pointerdown', this.unlockAudio, { once: true, capture: true });
    this.cheat = '';
    this.onKey = (e) => {
      if (!e.key || e.key.length !== 1 || e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
      this.cheat = (this.cheat + e.key.toLowerCase()).slice(-8);
      if (this.cheat.endsWith('rizz')) { this.cheat = ''; this.summonLegends(); }
      else if (this.cheat.endsWith('ore')) { this.cheat = ''; this.summonOres(); }
    };
    window.addEventListener('keydown', this.onKey);
    this.setState({ ready: true }, () => { this.measure(); this.initFlock(); this.forceUpdate(); requestAnimationFrame(() => { this.measure(); this.forceUpdate(); }); });
  }
  componentWillUnmount() {
    clearInterval(this.timer); clearInterval(this.saveTimer);
    window.removeEventListener('pointermove', this.onMove);
    window.removeEventListener('pointerup', this.onUp);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('keydown', this.onKey);
  }
  pureGenome(over) {
    const M = this.M;
    const g = {};
    for (const l of M.LOCI) g[l.id] = [l.alleles[0], l.alleles[0]];
    g.fantasy = ['none', 'none']; g.fpattern = ['none', 'none']; g.glow = ['none', 'none']; g.sheen = ['normal', 'normal'];
    g.pattern = ['bar', 'bar']; g.spread = ['no', 'no']; g.dilute = ['full', 'full']; g.recred = ['no', 'no'];
    g.grizzle = ['no', 'no']; g.pied = ['solid', 'solid']; g.muffs = ['clean', 'clean']; g.mane = ['plain', 'plain'];
    g.frill = ['smooth', 'smooth']; g.curl = ['straight', 'straight']; g.eye = ['orange', 'orange'];
    for (const [k, v] of Object.entries(over)) g[k] = [v, v];
    return g;
  }
  summonOres() {
    const M = this.M; if (!M) return;
    const ores = [
      ['THE DIAMOND PIGEON', 'diamond'], ['THE EMERALD PIGEON', 'emerald'], ['THE GOLD PIGEON', 'gold'],
      ['THE GOLD ORE PIGEON', 'goldore'], ['THE DIAMOND ORE PIGEON', 'diamondore'], ['THE EMERALD ORE PIGEON', 'emeraldore'],
      ['THE REDSTONE ORE PIGEON', 'redstoneore'], ['THE IRON ORE PIGEON', 'ironore'], ['THE LAPIS ORE PIGEON', 'lapisore'],
      ['THE MIXED GEMSTONE PIGEON', 'gemore'], ['THE COAL ORE PIGEON', 'coalore'],
    ];
    for (const [name, f] of ores) {
      const p = this.spawn({ genome: this.pureGenome({ fantasy: f }), name, gen: this.g.stats.maxGen, adult: true, x: this.fw / 2 + (Math.random() - .5) * this.fw * .7, y: this.fh / 2 + (Math.random() - .5) * this.fh * .5 });
      this.addSparkle(p.x, p.y - 34, 3);
    }
    this.chime();
    this.toast('The mineshaft opens. Eleven ore pigeons surface.', 'breed');
    this.forceUpdate();
  }
  summonLegends() {
    const M = this.M; if (!M) return;
    const mk = (over) => {
      const g = {};
      for (const l of M.LOCI) g[l.id] = [l.alleles[0], l.alleles[0]];
      g.fantasy = ['none', 'none']; g.fpattern = ['none', 'none']; g.glow = ['none', 'none']; g.sheen = ['normal', 'normal'];
      g.pattern = ['bar', 'bar']; g.spread = ['no', 'no']; g.dilute = ['full', 'full']; g.recred = ['no', 'no'];
      g.grizzle = ['no', 'no']; g.pied = ['solid', 'solid']; g.muffs = ['clean', 'clean']; g.mane = ['plain', 'plain'];
      g.frill = ['smooth', 'smooth']; g.curl = ['straight', 'straight']; g.eye = ['orange', 'orange'];
      for (const [k, v] of Object.entries(over)) g[k] = [v, v];
      return g;
    };
    const legends = [
      { name: 'THE VOID PIGEON', g: mk({ fantasy: 'void', glow: 'glow', eye: 'pearl' }) },
      { name: 'THE GALAXY PIGEON', g: mk({ sheen: 'galaxy', fpattern: 'stars', tail: 'fantail' }) },
    ];
    for (const L of legends) {
      const p = this.spawn({ genome: L.g, name: L.name, gen: this.g.stats.maxGen, adult: true, x: this.fw / 2 + (Math.random() - .5) * 120, y: this.fh / 2 });
      this.addSparkle(p.x, p.y - 34, 3);
    }
    this.chime();
    this.toast('W rizz. The legends have descended.', 'breed');
    this.forceUpdate();
  }

  measure() {
    const el = this.fieldRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.width < 50) return;
    if (this.fw && Math.abs(r.width - this.fw) > 2) {
      const kx = r.width / this.fw, ky = r.height / this.fh;
      for (const p of this.g.pigeons) { p.x *= kx; p.y *= ky; p.sx *= kx; p.sy *= ky; }
      for (const e of this.g.eggs) { e.x *= kx; e.y *= ky; }
    }
    this.fw = r.width; this.fh = r.height;
  }
  onResize() { this.measure(); this.setState({ narrow: window.innerWidth < 920 }); }

  // ---------- persistence ----------
  save() {
    if (!this.M || !this.flockReady) return;
    try {
      localStorage.setItem(this.KEY, JSON.stringify({
        pigeons: this.g.pigeons.filter(p => !p.flying).map(p => { const c = this.posNow(p); return { n: p.name, g: p.genome, a: p.accessory, ge: p.gen, x: Math.round(c.x), y: Math.round(c.y), f: p.facing }; }),
        roost: this.g.roost, disc: this.g.discovered, breeds: this.g.breeds, stats: this.g.stats,
        muted: this.state.muted, pediaSeen: this.state.pediaSeen, breedsSeen: this.state.breedsSeen,
        speed: this.state.speed, mut: this.state.mut,
        ph: ((Date.now() - this.t0) / this.DAY) % 1,
      }));
    } catch (e) { /* storage full or blocked — fine */ }
  }
  load() {
    try {
      const d = JSON.parse(localStorage.getItem(this.KEY) || 'null');
      if (d && d.pigeons) {
        this.saved = d;
        if (d.ph != null) this.savedPh = d.ph;
        this.setState({ muted: !!d.muted, pediaSeen: d.pediaSeen || 0, breedsSeen: d.breedsSeen || 0, speed: d.speed != null ? d.speed : null, mut: d.mut || null });
      }
    } catch (e) { /* corrupt save — start fresh */ }
  }
  initFlock() {
    const M = this.M;
    this.flockReady = true;
    if (this.saved) {
      const d = this.saved;
      this.g.roost = d.roost || []; this.g.discovered = d.disc || {}; this.g.breeds = d.breeds || {}; this.g.stats = d.stats || this.g.stats;
      d.pigeons.slice(0, this.cap()).forEach(sp => { const q = this.spawn({ genome: sp.g, accessory: sp.a, name: sp.n, gen: sp.ge || 1, adult: true, quiet: true, x: sp.x, y: sp.y }); if (sp.f) q.facing = sp.f; });
      if (d.pigeons.length) return;
    }
    for (let i = 0; i < 7; i++) {
      const g = M.founderGenome();
      if (i === 1) g.crest = ['none', 'shell'];
      if (i === 2) g.tail = ['normal', 'fantail'];
      if (i === 3) g.dilute = ['full', 'dilute'];
      if (i === 4) g.pied = ['splash', 'splash'];
      if (i === 5) g.muffs = ['clean', 'muffed'];
      this.spawn({ genome: g, name: M.randomName(), gen: 1, adult: true, quiet: true });
    }
  }
  resetAll = () => {
    try { localStorage.removeItem(this.KEY); } catch (e) {}
    this.saved = null;
    this.g = { pigeons: [], eggs: [], poops: [], sparkles: [], toasts: [], roost: [], discovered: {}, breeds: {}, stats: { births: 0, flown: 0, maxGen: 1 }, court: null };
    this.setState({ selId: null, roostSel: null, pediaSeen: 0, breedsSeen: 0 });
    this.initFlock();
    this.toast('A fresh delegation of civic pigeons arrives.', 'note');
    this.forceUpdate();
  };

  // ---------- flock ----------
  spawn({ genome, accessory, name, gen, adult, x, y, quiet }) {
    const M = this.M, now = Date.now();
    const pheno = M.computePheno(genome, accessory);
    let jh = 0; const js = JSON.stringify(genome);
    for (let i = 0; i < js.length; i++) jh = (jh * 31 + js.charCodeAt(i)) | 0;
    const p = {
      jit: .93 + ((jh >>> 0) % 1000) / 1000 * .16,
      id: this.ids++, name, genome, accessory: accessory || null, pheno, gen: gen || 1,
      born: adult ? now - 60000 : now,
      x: x !== undefined ? x : 30 + Math.random() * (this.fw - 60),
      y: y !== undefined ? y : 50 + Math.random() * (this.fh - 70),
      sx: 0, sy: 0, moveAt: now, tdur: 0, state: 'idle', stateUntil: now + 400 + Math.random() * 1500,
      facing: Math.random() < .5 ? 1 : -1, emote: null, emoteUntil: 0, courting: false, flying: false, held: false,
      breeds: M.matchBreeds(pheno),
    };
    p.sx = p.x; p.sy = p.y;
    this.g.pigeons.push(p);
    this.g.stats.maxGen = Math.max(this.g.stats.maxGen, p.gen);
    if (!quiet) this.notice(p);
    return p;
  }
  notice(p) {
    const M = this.M;
    for (const t of p.pheno.traits) {
      if (M.PEDIA[t.key] && !this.g.discovered[t.key]) {
        this.g.discovered[t.key] = 1;
        this.toast('Field note unlocked: ' + t.label, 'note');
      }
    }
    for (const b of p.breeds) {
      if (!this.g.breeds[b.id]) {
        this.g.breeds[b.id] = { by: p.name, at: Date.now() };
        this.toast('BREED DISCOVERED \u2014 ' + b.name + '!', 'breed');
        this.chime();
        this.addSparkle(p.x, p.y - 40, 3);
      }
    }
  }
  posNow(p) {
    if (p.state === 'walk' && p.tdur > 0) {
      const k = Math.min(1, (Date.now() - p.moveAt) / (p.tdur * 1000));
      return { x: p.sx + (p.x - p.sx) * k, y: p.sy + (p.y - p.sy) * k };
    }
    return { x: p.x, y: p.y };
  }
  walkTo(p, tx, ty, pxps) {
    const c = this.posNow(p), now = Date.now();
    tx = Math.max(26, Math.min(this.fw - 26, tx)); ty = Math.max(46, Math.min(this.fh - 14, ty));
    const d = Math.hypot(tx - c.x, ty - c.y), dur = Math.max(.4, d / pxps);
    p.sx = c.x; p.sy = c.y; p.x = tx; p.y = ty; p.moveAt = now; p.tdur = dur;
    p.state = 'walk'; p.stateUntil = now + dur * 1000; p.facing = tx >= c.x ? 1 : -1;
  }
  age(p) { return Date.now() - p.born; }
  adult(p) { return this.age(p) > 13000; }

  // ---------- simulation ----------
  tick() {
    if (!this.M) return;
    const M = this.M, now = Date.now(), sp = this.spd(), cap = this.cap();
    this.measure();
    const ph = ((now - this.t0) / this.DAY) % 1;
    this.night = ph < .55 ? 0 : ph < .62 ? (ph - .55) / .07 : ph < .88 ? 1 : ph < .95 ? 1 - (ph - .88) / .07 : 0;
    const G = this.g;
    // remove flown
    G.pigeons = G.pigeons.filter(p => !(p.flying && now > p.flyEnd));
    const pop = G.pigeons.length;
    // per-pigeon behavior
    for (const p of G.pigeons) {
      if (p.flying || p.held) continue;
      if (p.emote && now > p.emoteUntil) p.emote = null;
      if (p.courting) continue;
      if (now >= p.stateUntil) {
        const sleepy = this.night > .6, r = Math.random();
        if (sleepy && r < .55) { p.state = 'sleep'; p.stateUntil = now + 3000 + Math.random() * 5000; p.emote = { kind: 'zzz' }; p.emoteUntil = p.stateUntil; }
        else if (p.pheno.e.behavior === 'tumbler' && r < .08) { p.state = 'tumble'; p.stateUntil = now + 750; }
        else if (r < (sleepy ? .8 : .5)) this.walkTo(p, Math.random() * this.fw, Math.random() * this.fh, 42 * sp);
        else if (r < .8) { p.state = 'peck'; p.stateUntil = now + 1200 + Math.random() * 1800; }
        else { p.state = 'idle'; p.stateUntil = now + 900 + Math.random() * 2200; }
      }
      if (!p.emote && p.state !== 'sleep' && Math.random() < .004) {
        p.emote = { kind: 'say', text: M.pick(M.THOUGHTS) }; p.emoteUntil = now + 2600;
      }
      if (Math.random() < .012) this.coo(p.pheno.e.voice, .5);
    }
    // courtship
    if (!G.court && pop >= 2 && pop < cap && Math.random() < (0.10 * (1 - pop / cap) + 0.02) * sp) {
      const adults = G.pigeons.filter(p => this.adult(p) && !p.flying && !p.held && p.state !== 'sleep');
      if (adults.length >= 2) {
        const a = adults[Math.floor(Math.random() * adults.length)];
        let b = null, bd = 1e9;
        for (const q of adults) { if (q === a) continue; const d = Math.hypot(q.x - a.x, q.y - a.y); if (d < bd) { bd = d; b = q; } }
        if (b) {
          const pa = this.posNow(a), pb = this.posNow(b);
          const mx = (pa.x + pb.x) / 2, my = (pa.y + pb.y) / 2;
          G.court = { a: a.id, b: b.id, mx, my, until: now + 12000, eggAt: 0 };
          a.courting = b.courting = true;
          this.walkTo(a, mx - 16, my, 56 * sp); a.courting = true;
          this.walkTo(b, mx + 16, my, 56 * sp); b.courting = true;
          a.facing = 1; b.facing = -1;
        }
      }
    }
    if (G.court) {
      const a = G.pigeons.find(p => p.id === G.court.a), b = G.pigeons.find(p => p.id === G.court.b);
      if (!a || !b || a.flying || b.flying || now > G.court.until) {
        if (a) { a.courting = false; a.stateUntil = now; } if (b) { b.courting = false; b.stateUntil = now; }
        G.court = null;
      } else {
        const pa = this.posNow(a), pb = this.posNow(b);
        const close = Math.hypot(pa.x - G.court.mx, pa.y - G.court.my) < 26 && Math.hypot(pb.x - G.court.mx, pb.y - G.court.my) < 26;
        if (close && !G.court.eggAt) {
          G.court.eggAt = now + 1600;
          a.emote = { kind: 'heart' }; a.emoteUntil = now + 1600;
          b.emote = { kind: 'heart' }; b.emoteUntil = now + 1600;
          this.coo(a.pheno.e.voice, .8);
        }
        if (G.court.eggAt && now >= G.court.eggAt) {
          const off = M.offspring(a.genome, b.genome, this.mutF());
          G.eggs.push({ id: this.ids++, x: G.court.mx, y: G.court.my + 6, genome: off.genome, gen: Math.max(a.gen, b.gen) + 1, hatchAt: now + 6000 + Math.random() * 3500 });
          a.courting = b.courting = false; a.stateUntil = b.stateUntil = now;
          G.court = null;
        }
      }
    }
    // eggs
    for (const eg of [...G.eggs]) {
      if (now >= eg.hatchAt) {
        G.eggs = G.eggs.filter(x => x !== eg);
        const acc = M.rollAccessory(0.02);
        const baby = this.spawn({ genome: eg.genome, accessory: acc, name: M.randomName(), gen: eg.gen, x: eg.x, y: eg.y });
        G.stats.births++;
        this.pop_();
        const tier = baby.pheno.sparkTier;
        if (tier >= 1) this.addSparkle(eg.x, eg.y - 30, tier);
        if (tier >= 2) this.toast('A remarkable hatch: ' + baby.pheno.label + '.', 'note');
        else if (Math.random() < .13) this.toast(M.pick(M.COPY.birth), 'plain');
      }
    }
    // fly-offs
    const over = G.pigeons.length > cap;
    if (G.pigeons.length > 4 && (over ? Math.random() < .5 : Math.random() < 0.10 * Math.pow(G.pigeons.length / cap, 3) * sp)) {
      const cands = G.pigeons.filter(p => !p.flying && !p.held && !p.courting && p.id !== this.state.selId && this.adult(p));
      if (cands.length) this.fly(cands[Math.floor(Math.random() * cands.length)], Math.random() < .5);
    }
    // poop
    if (this.prop('poopEnabled', true) && Math.random() < .05 && G.pigeons.length) {
      const p = G.pigeons[Math.floor(Math.random() * G.pigeons.length)];
      if (!p.flying && !p.held) {
        const c = this.posNow(p);
        G.poops.push({ id: this.ids++, x: c.x + 6, y: c.y, at: now });
        if (G.poops.length > 14) G.poops.shift();
      }
    }
    G.poops = G.poops.filter(pp => now - pp.at < 30000);
    G.toasts = G.toasts.filter(t => now - t.at < 4200);
    G.sparkles = G.sparkles.filter(s => now - s.at < 1300);
    this.forceUpdate();
  }
  fly(p, withToast) {
    const now = Date.now();
    p.flying = true; p.flyEnd = now + 1500; p.state = 'fly'; p.emote = null; p.courting = false;
    this.g.stats.flown++;
    this.whoosh();
    if (withToast) this.toast(this.M.pick(this.M.COPY.flyoff).replace('{n}', p.name), 'plain');
    if (this.state.selId === p.id) this.setState({ selId: null });
  }
  addSparkle(x, y, tier) {
    const cols = tier >= 3 ? ['#e8b64c', '#c67139', '#7a8a5e', '#8f5fae', '#5aa2c8', '#fff7e0'] : tier === 2 ? ['#e8b64c', '#c67139', '#fff7e0'] : ['#e8b64c', '#fff7e0'];
    const n = tier >= 3 ? 13 : tier === 2 ? 9 : 6;
    const parts = [];
    for (let i = 0; i < n; i++) parts.push({
      anim: 'pp-spark' + (i % 8) + ' .85s ease-out', delay: (i % 3) * .07,
      color: cols[i % cols.length], size: 5 + Math.random() * (tier >= 3 ? 5 : 3),
      ox: (Math.random() - .5) * 12, oy: (Math.random() - .5) * 12,
    });
    this.g.sparkles.push({ id: this.ids++, x, y, tier, at: Date.now(), parts, ring: tier >= 2 });
  }
  toast(msg, kind) {
    this.g.toasts.push({ id: this.ids++, msg, kind: kind || 'plain', at: Date.now() });
    if (this.g.toasts.length > 3) this.g.toasts.shift();
  }

  // ---------- actions ----------
  select(id) { this.setState({ selId: id, roostSel: null }); }
  clonePigeon(id) {
    const p = this.g.pigeons.find(x => x.id === id); if (!p) return;
    if (this.g.pigeons.length >= this.cap()) { this.toast(this.M.pick(this.M.COPY.full), 'plain'); return; }
    let nm = 'Also ' + p.name; if (nm.length > 30) nm = this.M.randomName();
    const c = this.posNow(p);
    const q = this.spawn({ genome: JSON.parse(JSON.stringify(p.genome)), accessory: p.accessory, name: nm, gen: p.gen, adult: true, x: c.x + 34, y: c.y + 10 });
    this.g.stats.births++;
    this.addSparkle(q.x, q.y - 30, 1);
    this.pop_();
    this.toast(this.M.pick(this.M.COPY.clone).replace('{n}', p.name), 'plain');
    this.forceUpdate();
  }
  dismissPigeon(id) {
    const p = this.g.pigeons.find(x => x.id === id); if (!p) return;
    this.fly(p, false);
    this.toast(this.M.pick(this.M.COPY.dismiss).replace('{n}', p.name), 'plain');
    this.forceUpdate();
  }
  roostAdd(id) {
    const p = this.g.pigeons.find(x => x.id === id); if (!p) return;
    if (this.g.roost.length >= 8) { this.toast(this.M.pick(this.M.COPY.roostFull), 'plain'); return; }
    this.g.roost.push({ name: p.name, genome: p.genome, accessory: p.accessory, gen: p.gen });
    this.g.pigeons = this.g.pigeons.filter(x => x.id !== id);
    if (this.g.court && (this.g.court.a === id || this.g.court.b === id)) this.g.court = null;
    this.addSparkle(p.x, p.y - 30, 1);
    this.toast(this.M.pick(this.M.COPY.roosted).replace('{n}', p.name), 'note');
    this.setState({ selId: null, roostSel: this.g.roost.length - 1 });
    this.coo(p.pheno.e.voice, .7);
  }
  releaseRoost(i, keep) {
    const r = this.g.roost[i]; if (!r) return;
    if (this.g.pigeons.length >= this.cap()) { this.toast(this.M.pick(this.M.COPY.full), 'plain'); return; }
    const p = this.spawn({ genome: JSON.parse(JSON.stringify(r.genome)), accessory: r.accessory, name: keep ? 'Also ' + r.name : r.name, gen: r.gen, adult: true });
    this.g.stats.births += keep ? 1 : 0;
    this.addSparkle(p.x, p.y - 30, 1);
    this.pop_();
    if (!keep) { this.g.roost.splice(i, 1); this.setState({ roostSel: null, selId: p.id }); }
    this.forceUpdate();
  }
  cloneBreed(id) {
    const M = this.M, b = M.BREEDS.find(x => x.id === id);
    if (!b || !this.g.breeds[id]) return;
    if (this.g.pigeons.length >= this.cap()) { this.toast(M.pick(M.COPY.full), 'plain'); return; }
    const sample = M.breedSample(b);
    const genome = {};
    for (const l of M.LOCI) genome[l.id] = [sample.e[l.id], sample.e[l.id]];
    const p = this.spawn({ genome, accessory: sample.accessory, name: M.randomName(), gen: this.g.stats.maxGen, adult: true });
    this.g.stats.births++;
    this.addSparkle(p.x, p.y - 30, 2);
    this.pop_();
    this.toast('One ' + b.name + ', made to order.', 'note');
    this.setState({ selId: p.id });
  }
  removeRoost(i) {
    const r = this.g.roost[i]; if (!r) return;
    this.g.roost.splice(i, 1);
    this.toast(r.name + ' retired from public life.', 'plain');
    this.setState({ roostSel: null });
  }

  // ---------- input ----------
  pigeonDown(id, e) {
    e.stopPropagation();
    this.dragCand = { id, x: e.clientX, y: e.clientY };
    this.select(id);
    const p = this.g.pigeons.find(x => x.id === id);
    if (p) this.coo(p.pheno.e.voice, .8);
  }
  fieldDown = (e) => { if (e.target === this.fieldRef.current) this.setState({ selId: null, roostSel: null }); };
  onMove(e) {
    if (this.dragCand && !this.state.drag) {
      if (Math.hypot(e.clientX - this.dragCand.x, e.clientY - this.dragCand.y) > 10) {
        const p = this.g.pigeons.find(x => x.id === this.dragCand.id);
        if (p) { p.held = true; p.tdur = 0; const c = this.posNow(p); p.x = c.x; p.y = c.y; p.sx = c.x; p.sy = c.y; p.state = 'idle'; p.stateUntil = Date.now() + 500; p.courting = false; }
        this.setState({ drag: { id: this.dragCand.id, x: e.clientX, y: e.clientY } });
      }
    } else if (this.state.drag) {
      const rr = this.roostRef.current ? this.roostRef.current.getBoundingClientRect() : null;
      const over = rr && e.clientX >= rr.left && e.clientX <= rr.right && e.clientY >= rr.top - 8 && e.clientY <= rr.bottom + 8;
      this.setState({ drag: { ...this.state.drag, x: e.clientX, y: e.clientY }, overRoost: !!over });
    }
  }
  onUp(e) {
    if (this.state.drag) {
      const id = this.state.drag.id;
      const p = this.g.pigeons.find(x => x.id === id);
      if (p) {
        p.held = false;
        if (this.state.overRoost) this.roostAdd(id);
        else {
          const fr = this.fieldRef.current.getBoundingClientRect();
          p.x = Math.max(26, Math.min(this.fw - 26, e.clientX - fr.left));
          p.y = Math.max(46, Math.min(this.fh - 14, e.clientY - fr.top));
          p.sx = p.x; p.sy = p.y; p.tdur = 0; p.state = 'idle'; p.stateUntil = Date.now() + 700;
        }
      }
      this.setState({ drag: null, overRoost: false });
    }
    this.dragCand = null;
  }

  // ---------- audio ----------
  unlockAudio() { try { this.ac = new (window.AudioContext || window.webkitAudioContext)(); this.master = this.ac.createGain(); this.master.gain.value = .5; this.master.connect(this.ac.destination); } catch (e) {} }
  env(dur, peak) { const g = this.ac.createGain(); g.gain.setValueAtTime(0, this.ac.currentTime); g.gain.linearRampToValueAtTime(peak, this.ac.currentTime + .03); g.gain.exponentialRampToValueAtTime(.001, this.ac.currentTime + dur); g.connect(this.master); return g; }
  coo(voice, vol) {
    if (!this.ac || this.state.muted) return;
    const t = this.ac.currentTime;
    if (voice === 'trumpet') {
      const o = this.ac.createOscillator(); o.type = 'sawtooth';
      o.frequency.setValueAtTime(210, t); o.frequency.linearRampToValueAtTime(160, t + .4);
      const f = this.ac.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 620;
      o.connect(f); f.connect(this.env(.5, .07 * (vol || 1))); o.start(t); o.stop(t + .5);
    } else {
      const o = this.ac.createOscillator(); o.type = 'sine';
      o.frequency.setValueAtTime(430, t); o.frequency.exponentialRampToValueAtTime(320, t + .1); o.frequency.exponentialRampToValueAtTime(400, t + .22);
      const f = this.ac.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 900;
      o.connect(f); f.connect(this.env(.3, .12 * (vol || 1))); o.start(t); o.stop(t + .32);
    }
  }
  chime() { if (!this.ac || this.state.muted) return; const t = this.ac.currentTime; [740, 1108].forEach((fr, i) => { const o = this.ac.createOscillator(); o.type = 'triangle'; o.frequency.value = fr; o.connect(this.env(.7 + i * .2, .1)); o.start(t + i * .09); o.stop(t + 1); }); }
  pop_() { if (!this.ac || this.state.muted) return; const t = this.ac.currentTime; const o = this.ac.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(300, t); o.frequency.exponentialRampToValueAtTime(90, t + .12); o.connect(this.env(.14, .16)); o.start(t); o.stop(t + .15); }
  whoosh() { if (!this.ac || this.state.muted) return; const len = this.ac.sampleRate * .3; const buf = this.ac.createBuffer(1, len, this.ac.sampleRate); const d = buf.getChannelData(0); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len); const src = this.ac.createBufferSource(); src.buffer = buf; const f = this.ac.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 700; src.connect(f); f.connect(this.env(.3, .12)); src.start(); }
  toggleMute = () => this.setState({ muted: !this.state.muted }, () => this.save());

  // ---------- rendering ----------
  sprite(pheno, o) {
    const key = this.M.phenoKey(pheno) + '|' + (o && o.sleep ? 's' : '') + (o && o.wing === 'up' ? 'u' : '');
    if (!this.sprC.has(key)) this.sprC.set(key, this.S.spriteURI(pheno, o));
    return this.sprC.get(key);
  }
  chipStyle(tier) {
    return tier >= 3 ? { bg: '#2c2541', fg: '#cfc8f2' } : tier === 2 ? { bg: 'var(--color-accent-100)', fg: 'var(--color-accent-800)' } : { bg: 'var(--color-accent-2-100)', fg: 'var(--color-accent-2-800)' };
  }
  fmtAge(ms) { if (ms < 20000) return 'freshly hatched'; if (ms < 60000) return 'a chick'; const m = Math.floor(ms / 60000); return m < 60 ? m + 'm in the park' : Math.floor(m / 60) + 'h in the park'; }
  openPedia = () => { this.setState({ dialog: 'pedia', pediaSeen: Object.keys(this.g.discovered).length }, () => this.save()); };
  openBreeds = () => { this.setState({ dialog: 'breeds', breedsSeen: Object.keys(this.g.breeds).length }, () => this.save()); };
  closeDialog = () => this.setState({ dialog: null });
  stopProp = (e) => e.stopPropagation();

  renderVals() {
    const S = this.state, M = this.M, now = Date.now();
    const lay = S.narrow
      ? { wrap: 'wrap', mainOv: 'auto', colFlex: '1 1 100%', fieldMinH: '54vh', insFlex: '1 1 100%' }
      : { wrap: 'nowrap', mainOv: 'hidden', colFlex: '1 1 560px', fieldMinH: '240px', insFlex: '0 0 330px' };
    const base = {
      lay, loading: !M, popLabel: '\u2026', isNight: false, isDay: true, nightOv: 0, starOv: 0,
      pigeons: [], eggs: [], poops: [], sparks: [], rings: [], toasts: [], roost: [], stats: [],
      hasSel: false, noSel: true, sel: {}, emptyUri: '', roostBg: 'var(--color-surface)',
      showPedia: false, showBreeds: false, pedia: [], breeds: [], pediaCount: '0/0', breedCount: '0/31',
      pediaNew: false, breedsNew: false, soundOn: !S.muted, soundOff: S.muted,
      hasDrag: false, drag: {}, speedOpts: [], mutOpts: [],
      fieldRef: this.fieldRef, roostRef: this.roostRef, fieldDown: this.fieldDown,
      openPedia: this.openPedia, openBreeds: this.openBreeds, closeDialog: this.closeDialog,
      stopProp: this.stopProp, toggleMute: this.toggleMute, resetAll: this.resetAll,
    };
    if (!M || !S.ready) return base;
    const G = this.g, cap = this.cap(), night = this.night;
    base.loading = false;
    base.popLabel = G.pigeons.filter(p => !p.flying).length + ' / ' + cap + ' pigeons';
    base.isNight = night > .5; base.isDay = night <= .5;
    base.nightOv = night * .45; base.starOv = night * .9;
    base.emptyUri = this.wildURI;
    base.roostBg = S.overRoost ? 'var(--color-accent-100)' : 'var(--color-surface)';
    base.pigeons = G.pigeons.map(p => {
      const chick = this.age(p) < 18000;
      const scale = (p.pheno.e.size === 'king' ? 1.42 : p.pheno.e.size === 'dinky' ? .68 : 1) * (p.jit || 1) * (this.age(p) < 9000 ? .58 : chick ? .78 : 1);
      const w = Math.round(92 * scale);
      const sleep = p.state === 'sleep';
      const anim = p.flying ? 'pp-fly 1.5s ease-in forwards' : p.state === 'tumble' ? 'pp-tumble .75s linear' : p.state === 'walk' ? 'pp-bob .55s ease-in-out infinite' : p.state === 'peck' ? (p.facing === 1 ? 'pp-peck' : 'pp-peckL') + ' .8s ease-in-out infinite' : sleep ? 'pp-breathe 2.6s ease-in-out infinite' : 'pp-breathe 2.8s ease-in-out infinite';
      const glow = p.pheno.e.glow === 'glow';
      const em = p.emote;
      return {
        id: p.id, left: Math.round(p.x - w / 2), top: Math.round(p.y - w * .87), w,
        tdur: p.state === 'walk' ? +p.tdur.toFixed(2) : 0, z: p.flying ? 600 : Math.round(p.y),
        op: p.held ? .3 : 1, uri: this.sprite(p.pheno, { sleep, wing: p.flying ? 'up' : 'fold' }),
        flip: p.facing, anim, sel: S.selId === p.id, name: p.name,
        filter: glow ? 'drop-shadow(0 0 ' + Math.round(5 + 7 * night) + 'px rgba(222,243,150,' + (.4 + .5 * night).toFixed(2) + '))' : 'none',
        hasEmote: !!em,
        emoteText: em ? (em.kind === 'heart' ? '\u2665' : em.kind === 'zzz' ? 'z z z' : em.text || '!') : '',
        emoteBg: em && em.kind === 'heart' ? '#fff' : 'var(--color-surface)',
        emoteFg: em && em.kind === 'heart' ? '#c0504a' : 'var(--color-text)',
        down: (e) => this.pigeonDown(p.id, e),
      };
    });
    base.eggs = G.eggs.map(eg => ({ id: eg.id, left: Math.round(eg.x - 9), top: Math.round(eg.y - 22), z: Math.round(eg.y) }));
    base.poops = G.poops.map(pp => ({ id: pp.id, left: Math.round(pp.x), top: Math.round(pp.y - 3), op: Math.max(0, 1 - (now - pp.at) / 30000) * .9 }));
    const sparks = [], rings = [];
    for (const s of G.sparkles) {
      s.parts.forEach((pt, i) => sparks.push({ id: s.id + '-' + i, left: Math.round(s.x + pt.ox), top: Math.round(s.y + pt.oy), size: Math.round(pt.size), color: pt.color, anim: pt.anim, delay: pt.delay }));
      if (s.ring) rings.push({ id: 'r' + s.id, left: Math.round(s.x), top: Math.round(s.y), color: s.tier >= 3 ? '#8f5fae' : 'var(--color-accent)' });
    }
    base.sparks = sparks; base.rings = rings;
    base.toasts = G.toasts.map(t => ({
      id: t.id, msg: t.msg,
      bg: t.kind === 'breed' ? 'var(--color-accent)' : t.kind === 'note' ? 'var(--color-accent-2-800)' : 'var(--color-neutral-900)',
      fg: t.kind === 'breed' ? 'var(--color-bg)' : '#f9f4ed',
    }));
    base.roost = Array.from({ length: 8 }, (_, i) => {
      const r = G.roost[i];
      if (!r) return { id: 'e' + i, filled: false, bg: 'transparent', bd: '2px dashed var(--color-neutral-400)', ring: 'none', cur: 'default', name: 'empty perch', uri: '', click: () => {} };
      const pheno = M.computePheno(r.genome, r.accessory);
      return {
        id: 'r' + i, filled: true, bg: 'var(--color-neutral-100)', bd: '2px solid transparent',
        ring: S.roostSel === i ? '0 0 0 3px var(--color-accent)' : 'var(--shadow-sm)', cur: 'pointer',
        name: r.name, uri: this.sprite(pheno, {}), click: () => this.setState({ roostSel: i, selId: null }),
      };
    });
    // inspector
    let sel = null;
    if (S.selId != null) {
      const p = G.pigeons.find(x => x.id === S.selId && !x.flying);
      if (p) {
        const carries = M.carriersOf(p.genome);
        sel = {
          uri: this.sprite(p.pheno, {}), kicker: 'Specimen no. ' + String(p.id).padStart(3, '0'), name: p.name,
          meta: 'Generation ' + p.gen + ' \u00b7 ' + this.fmtAge(this.age(p)), color: p.pheno.label,
          breeds: p.breeds.map(b => ({ name: b.name })), hasBreeds: p.breeds.length > 0,
          chips: p.pheno.traits.map(t => ({ label: t.label, ...this.chipStyle(t.tier) })), hasChips: p.pheno.traits.length > 0,
          carries: carries.map(c => ({ label: c.label })), hasCarries: carries.length > 0,
          isField: true, isRoost: false,
          actClone: () => this.clonePigeon(p.id), actRoost: () => this.roostAdd(p.id), actDismiss: () => this.dismissPigeon(p.id),
        };
      }
    } else if (S.roostSel != null && G.roost[S.roostSel]) {
      const r = G.roost[S.roostSel], i = S.roostSel;
      const pheno = M.computePheno(r.genome, r.accessory);
      const carries = M.carriersOf(r.genome);
      sel = {
        uri: this.sprite(pheno, {}), kicker: 'Roost resident', name: r.name,
        meta: 'Generation ' + r.gen + ' \u00b7 kept bird', color: pheno.label,
        breeds: M.matchBreeds(pheno).map(b => ({ name: b.name })), hasBreeds: M.matchBreeds(pheno).length > 0,
        chips: pheno.traits.map(t => ({ label: t.label, ...this.chipStyle(t.tier) })), hasChips: pheno.traits.length > 0,
        carries: carries.map(c => ({ label: c.label })), hasCarries: carries.length > 0,
        isField: false, isRoost: true,
        actRelease: () => this.releaseRoost(i, false), actCloneOut: () => this.releaseRoost(i, true), actRemove: () => this.removeRoost(i),
      };
    }
    base.hasSel = !!sel; base.noSel = !sel; base.sel = sel || {};
    const segBtn = (on) => on ? { bg: 'var(--color-accent)', fg: 'var(--color-bg)' } : { bg: 'transparent', fg: 'var(--color-text)' };
    const curSpd = S.speed != null ? S.speed : (Number(this.prop('simSpeed', 1)) || 1);
    base.speedOpts = [{ label: 'Stroll', v: .5 }, { label: 'Normal', v: 1 }, { label: 'Bustling', v: 1.7 }, { label: 'Frantic', v: 2.5 }].map(o => ({
      id: 'sp' + o.v, label: o.label, ...segBtn(Math.abs(curSpd - o.v) < .2),
      click: () => this.setState({ speed: o.v }, () => this.save()),
    }));
    const curMut = S.mut || this.prop('mutationRate', 'normal');
    base.mutOpts = [{ label: 'Calm', v: 'calm' }, { label: 'Normal', v: 'normal' }, { label: 'Chaos', v: 'chaos' }].map(o => ({
      id: 'mu' + o.v, label: o.label, ...segBtn(curMut === o.v),
      click: () => this.setState({ mut: o.v }, () => this.save()),
    }));
    base.stats = [
      { v: String(G.pigeons.filter(p => !p.flying).length), l: 'residents' },
      { v: String(G.stats.births), l: 'hatched' },
      { v: String(G.stats.flown), l: 'departed' },
      { v: 'gen ' + G.stats.maxGen, l: 'deepest line' },
    ];
    const discN = Object.keys(G.discovered).length, pediaTotal = Object.keys(M.PEDIA).length;
    const brN = Object.keys(G.breeds).length;
    base.pediaCount = discN + ' / ' + pediaTotal;
    base.breedCount = brN + '/' + M.BREEDS.length;
    base.pediaNew = discN > S.pediaSeen; base.breedsNew = brN > S.breedsSeen;
    base.showPedia = S.dialog === 'pedia'; base.showBreeds = S.dialog === 'breeds';
    if (base.showPedia) {
      const tierName = { 1: 'uncommon', 2: 'rare', 3: 'impossible' };
      base.pedia = Object.keys(M.PEDIA).map(k => {
        const meta = M.ALLELE_META[k] || { label: k, tier: 1 };
        const got = !!G.discovered[k];
        const cs = this.chipStyle(meta.tier);
        return { id: k, title: got ? meta.label : '???', note: got ? M.PEDIA[k] : 'Not yet observed in your park.', tier: tierName[meta.tier] || 'odd', bg: cs.bg, fg: cs.fg, op: got ? 1 : .55, _t: meta.tier, _g: got ? 0 : 1 };
      }).sort((a, b) => a._g - b._g || a._t - b._t || (a.title > b.title ? 1 : -1));
    }
    if (base.showBreeds) {
      base.breeds = M.BREEDS.map(b => {
        const got = G.breeds[b.id];
        return {
          id: b.id, img: this.breedSprites[b.id],
          filter: got ? 'none' : 'brightness(0) opacity(.32)',
          title: got ? b.name : '???',
          sub: got ? b.blurb : b.legend ? 'Whispered of in park lore. There is a word\u2026' : 'Recipe: ' + M.breedHint(b) + '.',
          tag: b.legend ? 'legendary' : b.real ? 'real breed' : 'cryptid',
          tagBg: b.legend ? 'var(--color-accent)' : b.real ? 'var(--color-accent-2-100)' : '#2c2541',
          tagFg: b.legend ? 'var(--color-bg)' : b.real ? 'var(--color-accent-2-800)' : '#cfc8f2',
          hasBy: !!got, by: got ? got.by : '', canClone: !!got, clone: () => this.cloneBreed(b.id), _g: got ? 0 : 1,
        };
      }).sort((a, b) => a._g - b._g);
    }
    if (S.drag) {
      const p = G.pigeons.find(x => x.id === S.drag.id);
      if (p) {
        base.hasDrag = true;
        base.drag = { uri: this.sprite(p.pheno, {}), x: S.drag.x, y: S.drag.y, w: 76, flip: p.facing };
      }
    }
    return base;
  }
}
