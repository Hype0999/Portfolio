import * as THREE from 'three';

/**
 * EnvironmentManager.js
 * 
 * Builds and manages ONE unified, abstract 3D environment
 * that spans the entire portfolio. The camera travels through
 * this single world as the user scrolls.
 * 
 * Philosophy:
 * - No literal objects (no breadboards, no floating PCBs)
 * - Large matte surfaces, precise geometry, copper accents
 * - Atmosphere and depth only — content is always king
 * - Every element exists to support the DOM, not compete with it
 */
export class EnvironmentManager {
  constructor(engine) {
    this.engine = engine;
    this.group = new THREE.Group();
    this.group.name = 'Environment';
  }

  build() {
    this._buildGroundPlane();
    this._buildPrecisionGrid();
    this._buildAccentLines();
    this._buildAmbientVolumes();

    this.engine.mainScene.add(this.group);
  }

  /**
   * A vast, matte graphite ground plane that catches soft HDRI reflections.
   * Think precision-machined aluminium table surface.
   */
  _buildGroundPlane() {
    const geo = new THREE.PlaneGeometry(80, 200, 1, 1);
    const mat = this.engine.materialManager.get('env_ground');
    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = 'GroundPlane';
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -3;
    this.group.add(mesh);
  }

  /**
   * A barely-visible engineering grid stamped into the ground plane.
   * 1px lines on 4-unit intervals, PCB-trace inspired.
   */
  _buildPrecisionGrid() {
    const helper = new THREE.GridHelper(200, 50, 0x1a1a1a, 0x141414);
    helper.name = 'PrecisionGrid';
    helper.position.y = -2.99;
    helper.material.transparent = true;
    helper.material.opacity = 0.35;
    this.group.add(helper);
  }

  /**
   * Thin horizontal accent lines running through the scene.
   * These catch the HDRI light like precision CNC grooves on aluminum.
   */
  _buildAccentLines() {
    const lineMat = this.engine.materialManager.get('env_accent_line');
    const positions = [-8, 8];

    positions.forEach((z) => {
      const geo = new THREE.PlaneGeometry(40, 0.008, 1, 1);
      const line = new THREE.Mesh(geo, lineMat);
      line.name = 'AccentLine';
      line.rotation.x = -Math.PI / 2;
      line.position.set(0, -2.98, z);
      this.group.add(line);
    });
  }

  /**
   * Large, invisible box volumes for ambient fog variation.
   * These are fully transparent — they exist purely as positional anchors
   * for future per-region lighting adjustments.
   */
  _buildAmbientVolumes() {
    const sections = ['hero', 'timeline', 'projects', 'awards', 'skills', 'contact'];
    sections.forEach((id, i) => {
      const anchor = new THREE.Object3D();
      anchor.name = `AmbientAnchor_${id}`;
      anchor.position.set(0, 0, -i * 20);
      this.group.add(anchor);
    });
  }

  update(time, delta) {
    // Intentionally minimal — no constant movement.
    // Environment only reacts to camera and lighting changes driven by scroll.
  }

  dispose() {
    this.group.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
    });
    this.engine.mainScene.remove(this.group);
  }
}
