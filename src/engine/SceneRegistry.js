export class SceneRegistry {
  constructor(engine) {
    this.engine = engine;
    this.scenes = new Map();
  }

  /**
   * Registers a lazy loader for a scene.
   * @param {string} id - The data-scene id
   * @param {Function} loaderFn - Function returning a Promise that resolves to a Scene instance
   */
  add(id, loaderFn) {
    this.scenes.set(id, { loaderFn, instance: null, isLoading: false });
  }

  async load(id) {
    if (!this.scenes.has(id)) return null;
    
    const entry = this.scenes.get(id);
    
    if (entry.instance) return entry.instance;
    
    if (entry.isLoading) {
      // Poll until loaded (simplified locking)
      return new Promise((resolve) => {
        const check = setInterval(() => {
          if (entry.instance) {
            clearInterval(check);
            resolve(entry.instance);
          }
        }, 50);
      });
    }

    entry.isLoading = true;
    try {
      entry.instance = await entry.loaderFn();
      
      // Register with the actual SceneManager
      this.engine.sceneManager.registerScene(id, entry.instance);
      
      // Pre-warm the shaders to avoid jank on first render
      if (entry.instance.group) {
        this.engine.renderer.instance.compile(entry.instance.group, this.engine.cameraController.instance, this.engine.mainScene);
      }
      
      entry.isLoading = false;
      return entry.instance;
    } catch (e) {
      console.error(`[SceneRegistry] Failed to lazily load scene: ${id}`, e);
      entry.isLoading = false;
      return null;
    }
  }
}
