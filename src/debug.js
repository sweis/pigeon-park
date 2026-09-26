// Pigeon Park — on-screen diagnostics overlay (?debug). Works on phones; tap it to cycle cameras.

const CAMS = ['overview', 'fountain', 'dovecote', 'hero-close'];

export class Diagnostics {
  constructor(game, on) {
    this.g = game; this.on = on; this.t = 0;
    if (!on) return;
    const el = this.el = document.createElement('pre');
    el.id = 'diag';
    document.body.appendChild(el);
    let ci = 0;
    el.addEventListener('click', () => { ci = (ci + 1) % CAMS.length; game.cam.shot(CAMS[ci]); });
  }
  frame() {
    if (!this.on) return;
    const now = performance.now(); if (now - this.t < 250) return; this.t = now;
    const g = this.g, i = g.renderer.info, a = [...g.frameMs].sort((x, y) => x - y);
    const p = (q) => a.length ? a[Math.min(a.length - 1, Math.floor(q * a.length))].toFixed(1) : '-';
    this.el.textContent = [
      `gpu   ${String(g.gpu).slice(0, 48)}`,
      `tier  ${g.q.tier}  dpr ${g.renderer.getPixelRatio()}  shadows ${g.q.shadows ? 'on' : 'off'}`,
      `frame p50 ${p(.5)} ms  p99 ${p(.99)} ms`,
      `draws ${i.render.calls}  tris ${(i.render.triangles / 1000).toFixed(1)}k  programs ${i.programs.length} (boot ${g.programsAfterBoot})`,
      `birds ${g.sim.pigeons.length}  eggs ${g.sim.eggs.length}  t ${g.sim.t.toFixed(1)}  ${g.sim.hour().toFixed(1)}h`,
      `cam   ${g.cam.name}${g.frozen ? '  FROZEN' : ''}`,
      g.lastShaderError ? `SHADER ${g.lastShaderError.slice(0, 80)}` : '',
    ].join('\n');
  }
}
