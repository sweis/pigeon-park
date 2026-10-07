// Pigeon Park — renders a 3D pigeon to a cached PNG data URL for the HUD (inspector, roost, registry).
// One read-back per new phenotype, never per frame. Warmed up at boot so its programs exist early.

import * as THREE from 'three';
import { PigeonRig, makeMaterials, birdHeight } from './pigeon3d.js';
import { phenoKey } from './genetics.js';

export class Portraits {
  constructor(renderer, lowQ) {
    // Own material instances: sharing materials between scenes with different light rigs leaves
    // three.js's per-material light/uniform cache stale (birds rendered invisible in the park).
    this.r = renderer; this.mats = makeMaterials(); this.samples = lowQ ? 0 : 4; // no MSAA targets on phones
    this.size = 176;
    this.rt = new THREE.WebGLRenderTarget(this.size, this.size, { samples: this.samples });
    this.rt.texture.colorSpace = THREE.SRGBColorSpace;
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.HemisphereLight('#dfe8f4', '#8a7458', 1.1));
    const key = new THREE.DirectionalLight('#fff0dc', 2.1); key.position.set(2, 3, 2.5); this.scene.add(key);
    this.cam = new THREE.PerspectiveCamera(30, 1, .05, 20);
    this.cache = new Map();
    this.buf = new Uint8Array(this.size * this.size * 4);
    this.canvas = document.createElement('canvas'); this.canvas.width = this.canvas.height = this.size;
    this.ctx = this.canvas.getContext('2d');
  }
  // High-res studio render (transparent background) for photo mode; a temporary target, one read-back.
  studio(pheno, size) {
    const rt = new THREE.WebGLRenderTarget(size, size, { samples: this.samples }); rt.texture.colorSpace = THREE.SRGBColorSpace;
    const buf = new Uint8Array(size * size * 4), canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    this.draw(pheno, rt, buf, size);
    rt.dispose();
    flipInto(canvas.getContext('2d'), buf, size);
    return canvas;
  }
  draw(pheno, rt, buf, size) {
    const rig = new PigeonRig(pheno, this.mats);
    rig.group.rotation.y = -.55;
    this.scene.add(rig.group);
    const ht = birdHeight(pheno), cy = ht * .5, d = 1.5 * Math.max(1, ht / .6);
    this.cam.position.set(.1 + d * .2, cy + .28, d);
    this.cam.lookAt(0, cy, 0);
    const r = this.r, prevT = r.getRenderTarget(), prevC = r.getClearColor(new THREE.Color()), prevA = r.getClearAlpha();
    r.setRenderTarget(rt); r.setClearColor(0x000000, 0); r.clear();
    r.render(this.scene, this.cam);
    r.readRenderTargetPixels(rt, 0, 0, size, size, buf);
    r.setRenderTarget(prevT); r.setClearColor(prevC, prevA);
    this.scene.remove(rig.group); rig.dispose();
  }
  get(pheno) {
    const k = phenoKey(pheno);
    let url = this.cache.get(k);
    if (url) return url;
    this.draw(pheno, this.rt, this.buf, this.size);
    flipInto(this.ctx, this.buf, this.size);
    url = this.canvas.toDataURL('image/png');
    this.cache.set(k, url);
    if (this.cache.size > 300) this.cache.delete(this.cache.keys().next().value); // oldest first; a long session sees thousands of looks
    return url;
  }
}

// GL read-backs are bottom-up: copy rows flipped into a 2D canvas.
function flipInto(ctx, buf, size) {
  const img = ctx.createImageData(size, size), row = size * 4;
  for (let y = 0; y < size; y++) img.data.set(buf.subarray((size - 1 - y) * row, (size - y) * row), y * row);
  ctx.putImageData(img, 0, 0);
}
