// Pigeon Park — event-driven sparkles and pop rings (pooled, fixed-size instanced meshes).

import * as THREE from 'three';

const COLS = { 1: ['#e8b64c', '#fff7e0'], 2: ['#e8b64c', '#c67139', '#fff7e0'], 3: ['#e8b64c', '#c67139', '#7a8a5e', '#8f5fae', '#5aa2c8', '#fff7e0'] };

export class Fx {
  constructor(scene) {
    this.N = 220;
    this.mesh = new THREE.InstancedMesh(new THREE.OctahedronGeometry(1, 0), new THREE.MeshBasicMaterial({ toneMapped: false }), this.N);
    this.mesh.frustumCulled = false; this.mesh.count = 0;
    this.mesh.setColorAt(0, new THREE.Color());
    scene.add(this.mesh);
    this.parts = [];
    this.rings = Array.from({ length: 6 }, () => {
      const m = new THREE.Mesh(new THREE.RingGeometry(.9, 1, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: '#c67139', transparent: true, depthWrite: false, toneMapped: false }));
      m.visible = false; m.renderOrder = 3; scene.add(m); m.userData.t = 1;
      return m;
    });
  }
  burst(x, y, z, tier = 1) {
    const cols = COLS[Math.min(3, Math.max(1, tier))], n = tier >= 3 ? 26 : tier === 2 ? 16 : 9;
    for (let i = 0; i < n; i++) {
      if (this.parts.length >= this.N) this.parts.shift();
      const a = Math.random() * Math.PI * 2, up = .8 + Math.random() * 1.6, sp = .5 + Math.random() * (tier >= 3 ? 1.6 : 1);
      this.parts.push({
        p: new THREE.Vector3(x, y, z), v: new THREE.Vector3(Math.cos(a) * sp, up, Math.sin(a) * sp),
        life: 0, max: .8 + Math.random() * .5, s: .025 + Math.random() * (tier >= 3 ? .035 : .02),
        c: new THREE.Color(cols[i % cols.length]), rot: Math.random() * 6,
      });
    }
    if (tier >= 2) this.ring(x, z, tier >= 3 ? '#8f5fae' : '#c67139');
  }
  ring(x, z, color = '#c67139') {
    const r = this.rings.find(m => m.userData.t >= 1) || this.rings[0];
    r.material.color.set(color); r.position.set(x, .02, z); r.userData.t = 0; r.visible = true;
  }
  update(dt) {
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3();
    this.parts = this.parts.filter(p => (p.life += dt) < p.max);
    this.parts.forEach((p, i) => {
      p.v.y -= 2.8 * dt; p.v.multiplyScalar(1 - 1.8 * dt);
      p.p.addScaledVector(p.v, dt); p.rot += dt * 6;
      const k = 1 - p.life / p.max;
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), p.rot);
      m.compose(p.p, q, s.setScalar(p.s * (.3 + k)));
      this.mesh.setMatrixAt(i, m); this.mesh.setColorAt(i, p.c);
    });
    this.mesh.count = this.parts.length;
    this.mesh.instanceMatrix.needsUpdate = true;
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
    for (const r of this.rings) {
      if (r.userData.t >= 1) { r.visible = false; continue; }
      r.userData.t = Math.min(1, r.userData.t + dt / .9);
      const t = r.userData.t;
      r.scale.setScalar(.15 + t * .75);
      r.material.opacity = .9 * (1 - t);
    }
  }
}
