export class SceneManager {
  constructor(mainScene) {
    this.mainScene = mainScene;
    this.activeSceneId = null;
    this.registeredScenes = new Map();
  }

  registerScene(id, sceneClassInstance) {
    if (typeof sceneClassInstance.init !== 'function') {
      console.warn(`[SceneManager] Scene '${id}' missing init() lifecycle method.`);
    }
    
    this.registeredScenes.set(id, sceneClassInstance);
    
    // The main engine expects the scene to expose a root 'group'
    if (sceneClassInstance.group) {
      sceneClassInstance.group.visible = false;
      this.mainScene.add(sceneClassInstance.group);
    }
    
    // Call init lifecycle
    if (sceneClassInstance.init) sceneClassInstance.init();
  }

  activateScene(id) {
    if (this.activeSceneId === id) return;
    
    // Deactivate previous
    if (this.activeSceneId && this.registeredScenes.has(this.activeSceneId)) {
      const prev = this.registeredScenes.get(this.activeSceneId);
      if (prev.group) prev.group.visible = false;
      if (typeof prev.onDeactivate === 'function') prev.onDeactivate();
    }
    
    this.activeSceneId = id;
    
    // Activate new
    if (this.registeredScenes.has(id)) {
      const next = this.registeredScenes.get(id);
      if (next.group) next.group.visible = true;
      if (typeof next.onActivate === 'function') next.onActivate();
    }
  }

  update(time, deltaTime) {
    if (this.activeSceneId && this.registeredScenes.has(this.activeSceneId)) {
      const active = this.registeredScenes.get(this.activeSceneId);
      if (typeof active.update === 'function') {
        active.update(deltaTime, time);
      }
    }
  }

  dispose() {
    this.registeredScenes.forEach(scene => {
      if (typeof scene.dispose === 'function') scene.dispose();
      if (scene.group) this.mainScene.remove(scene.group);
    });
    this.registeredScenes.clear();
  }
}
