/**
 * rendering/SceneManager.js — Scene Lifecycle Manager
 *
 * Manages multiple rendering scenes: their creation, activation,
 * transitions, and disposal. In v1.0 this is a stub.
 *
 * In future, this allows different sections to have their own WebGL scenes
 * that are activated as the user scrolls.
 *
 * Usage (future):
 *   const manager = new SceneManager();
 *   manager.register('hero', new HeroScene(canvas));
 *   manager.activate('hero');
 */

import { RenderingLayer } from './RenderingLayer.js';

export class SceneManager {
  constructor() {
    /** @type {Map<string, RenderingLayer>} */
    this.scenes = new Map();
    this.activeSceneId = null;
  }

  /**
   * Register a named scene.
   *
   * @param {string} id - Unique scene identifier (matches section id)
   * @param {RenderingLayer} scene - Scene instance
   */
  register(id, scene) {
    if (!(scene instanceof RenderingLayer)) {
      throw new Error(`Scene "${id}" must extend RenderingLayer`);
    }
    this.scenes.set(id, scene);
  }

  /**
   * Activate a scene by id. Deactivates the previously active scene.
   *
   * @param {string} id - Scene to activate
   * @returns {Promise<void>}
   */
  async activate(id) {
    if (!this.scenes.has(id)) {
      console.warn(`SceneManager: No scene registered with id "${id}"`);
      return;
    }

    // Deactivate current
    if (this.activeSceneId && this.activeSceneId !== id) {
      const current = this.scenes.get(this.activeSceneId);
      current?.stop();
    }

    const scene = this.scenes.get(id);
    if (!scene.isActive) {
      await scene.init();
      scene.start();
    }

    this.activeSceneId = id;
  }

  /**
   * Dispose all scenes and clean up.
   */
  disposeAll() {
    this.scenes.forEach((scene) => scene.dispose());
    this.scenes.clear();
    this.activeSceneId = null;
  }
}
