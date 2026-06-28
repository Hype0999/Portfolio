import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollCameraController.js
 *
 * Maps scroll progress (0 → 1) to a CatmullRomCurve3 camera path.
 * The camera glides slowly, heavily damped — luxury automotive pacing.
 *
 * NO snap points. NO dramatic zooms. NO rotations.
 * The camera simply glides.
 *
 * Architecture:
 * - One master spline runs the full height of the page
 * - LookAt targets live on a matching companion spline
 * - GSAP ScrollTrigger drives scroll progress
 * - Three.js lerp applies damping each tick
 */
export class ScrollCameraController {
  constructor(engine) {
    this.engine = engine;
    this.cam = engine.cameraController;

    // Raw scroll progress [0, 1]
    this.rawProgress = 0;
    // Smoothed progress [0, 1] — drives actual camera position
    this.smoothProgress = 0;
    // Damping factor: lower = heavier, more luxurious
    this.damping = 0.04;

    this.cameraPath = null;
    this.lookAtPath = null;

    this._buildPaths();
    this._bindScroll();
  }

  /**
   * Camera travels top-down through sections, with a
   * slight lateral arc to suggest depth and parallax.
   *
   * Section positions in world space (Z-axis is depth):
   *  Hero      → z:  0
   *  Timeline  → z: -20
   *  Projects  → z: -40
   *  Awards    → z: -60
   *  Skills    → z: -80
   *  Monsoon   → z: -100
   */
  _buildPaths() {
    const cameraPoints = [
      new THREE.Vector3(0,   4,  14),   // Hero: slight elevation, pulling back
      new THREE.Vector3(2,   3,  -6),   // Hero→Timeline transition: drifts slightly right
      new THREE.Vector3(-1,  2.5, -26), // Timeline: low, parallel, slight left arc
      new THREE.Vector3(1.5, 3,  -46), // Projects: elevated, slight right
      new THREE.Vector3(-0.5, 2.5, -66), // Awards: centred, calm
      new THREE.Vector3(0,   2,  -86), // Skills: lowest, most intimate
      new THREE.Vector3(0,   3.5, -102), // Monsoon: gentle rise for conclusion
    ];

    const lookAtPoints = [
      new THREE.Vector3(0,  0,   0),   // Hero: looking at origin
      new THREE.Vector3(0,  0,  -16),  // Into Timeline
      new THREE.Vector3(0,  0,  -36),  // Into Projects
      new THREE.Vector3(0,  0,  -56),  // Into Awards
      new THREE.Vector3(0,  0,  -76),  // Into Skills
      new THREE.Vector3(0,  0,  -96),  // Into Monsoon
      new THREE.Vector3(0,  0, -110),  // Final rest
    ];

    this.cameraPath = new THREE.CatmullRomCurve3(cameraPoints, false, 'catmullrom', 0.5);
    this.lookAtPath = new THREE.CatmullRomCurve3(lookAtPoints, false, 'catmullrom', 0.5);
  }

  _bindScroll() {
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        this.rawProgress = self.progress;
      }
    });
  }

  /**
   * Called every tick by Engine.js.
   * Smooth-lerps rawProgress → smoothProgress,
   * then samples both splines to set camera position and lookAt.
   */
  update() {
    // Heavy damping — the camera lags behind scroll intentionally
    this.smoothProgress += (this.rawProgress - this.smoothProgress) * this.damping;

    const p = Math.max(0, Math.min(1, this.smoothProgress));

    const pos = this.cameraPath.getPointAt(p);
    const look = this.lookAtPath.getPointAt(p);

    this.cam.instance.position.copy(pos);
    this.cam.instance.lookAt(look);
  }
}
