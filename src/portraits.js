// Pigeon Park — renders a 3D pigeon to a cached PNG data URL for the HUD (inspector, roost, registry).
// One read-back per new phenotype, never per frame. Warmed up at boot so its programs exist early.

import * as THREE from 'three';
import { PigeonRig, makeMaterials } from './pigeon3d.js';
import { phenoKey } from './genetics.js';

export class Portraits {
  constructor(renderer, lowQ) {
    // Own material instances: sharing materials between scenes with different light rigs leaves
    // three.js's per-material light/uniform cache stale (birds rendered invisible in the park).
    this.r = renderer; this.mats = makeMaterials();
    this.size = 176;
    this.rt = new THREE.WebGLRenderTarget(this.size, this.size, { samples: lowQ ? 0 : 4 });
    this.rt.texture.colorSpace = THREE.SRGBColorSpace;
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.HemisphereLight('#dfe8f4', '#8a7458', 1.1));
    const key = new THREE.DirectionalLight('#fff0dc', 2.1); key.position.set(2, 3, 2.5); this.scene.add(key);
    this.scene.environment = null;
    this.cam = new THREE.PerspectiveCamera(30, 1, .05, 20);
    this.cache = new Map();
    this.buf = new Uint8Array(this.size * this.size * 4);
    this.canvas = document.createElement('canvas'); this.canvas.width = this.canvas.height = this.size;
    this.ctx = this.canvas.getContext('2d');
  }
  get(pheno, { sleep = false } = {}) {
    const k = phenoKey(pheno) + (sleep ? '|s' : '');
    let url = this.cache.get(k);
    if (url) return url;
    const rig = new PigeonRig(pheno, this.mats);
    if (sleep) { rig.bones.eyeL.scale.y = rig.bones.eyeR.scale.y = .12; }
    const tall = pheno.e.neck === 'noodle' || pheno.e.crest === 'horn' || pheno.accessory === 'chefhat' || pheno.accessory === 'partyhat' || pheno.e.crest === 'lace' || pheno.e.mane === 'hood' || pheno.e.tail === 'fantail' || pheno.accessory === 'tophat';
    rig.group.rotation.y = -.55;
    this.scene.add(rig.group);
    const cy = tall ? .34 : .3, d = tall ? 1.72 : 1.5;
    this.cam.position.set(.1 + d * .2, cy + .28, d);
    this.cam.lookAt(0, cy, 0);
    const r = this.r, prevT = r.getRenderTarget(), prevC = r.getClearColor(new THREE.Color()), prevA = r.getClearAlpha();
    r.setRenderTarget(this.rt); r.setClearColor(0x000000, 0); r.clear();
    r.render(this.scene, this.cam);
    r.readRenderTargetPixels(this.rt, 0, 0, this.size, this.size, this.buf);
    r.setRenderTarget(prevT); r.setClearColor(prevC, prevA);
    this.scene.remove(rig.group); rig.dispose();
    // flip Y into a canvas → PNG
    const img = this.ctx.createImageData(this.size, this.size), row = this.size * 4;
    for (let y = 0; y < this.size; y++) img.data.set(this.buf.subarray((this.size - 1 - y) * row, (this.size - y) * row), y * row);
    this.ctx.putImageData(img, 0, 0);
    url = this.canvas.toDataURL('image/png');
    this.cache.set(k, url);
    return url;
  }
}
