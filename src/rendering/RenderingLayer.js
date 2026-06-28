/**
 * rendering/RenderingLayer.js — Abstract 3D Rendering Interface
 *
 * This is the contract that all WebGL/Three.js scenes must implement.
 * The UI layer never imports Three.js directly. It only talks to this interface.
 *
 * ┌─────────────────────────────────────┐
 * │          UI Components              │
 * │  (Nav, Hero, Projects, etc.)        │
 * └────────────────┬────────────────────┘
 *                  │ getMountPoint()
 *                  ▼
 * ┌─────────────────────────────────────┐
 * │         RenderingLayer (this)       │  ← v1.0: stub / no-op
 * │         ThreeJSScene (future)       │  ← extends RenderingLayer
 * └─────────────────────────────────────┘
 *
 * HOW TO ACTIVATE THREE.JS IN FUTURE:
 *   1. Create `src/rendering/ThreeJSScene.js` that extends RenderingLayer
 *   2. Override init(), render(), resize(), dispose()
 *   3. In main.js, replace `new RenderingLayer(canvas)` with `new ThreeJSScene(canvas)`
 *   4. The UI layer requires zero changes.
 */

export class RenderingLayer {
  /**
   * @param {HTMLCanvasElement} canvas - The canvas element to render into
   * @param {Object} [options] - Scene options
   */
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.options = options;
    this.isActive = false;
    this.animationFrameId = null;
  }

  /**
   * Initialise the rendering context.
   * Override this in ThreeJSScene to set up Three.js renderer, scene, camera.
   *
   * @returns {Promise<void>}
   */
  async init() {
    // No-op in v1.0 stub
    // Three.js implementation: create renderer, scene, camera, load assets
    this.isActive = false;
  }

  /**
   * Start the render loop.
   * Override this to call requestAnimationFrame in Three.js scene.
   */
  start() {
    this.isActive = true;
    // No-op in v1.0
  }

  /**
   * Stop the render loop.
   */
  stop() {
    this.isActive = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Handle canvas/container resize.
   * Override to update renderer size and camera aspect ratio.
   *
   * @param {number} width - New container width in px
   * @param {number} height - New container height in px
   */
  resize(width, height) {
    // No-op in v1.0
  }

  /**
   * Render one frame.
   * Override with renderer.render(scene, camera) in Three.js.
   */
  render() {
    // No-op in v1.0
  }

  /**
   * Clean up all resources.
   * Override to dispose geometries, materials, and renderer in Three.js.
   */
  dispose() {
    this.stop();
    // Three.js implementation: traverse scene and dispose all objects
  }
}
