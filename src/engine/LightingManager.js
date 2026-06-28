import * as THREE from 'three';

export class LightingManager {
  constructor(scene) {
    this.mainScene = scene;
    
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    this.mainScene.add(this.ambientLight);
    
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    this.directionalLight.position.set(5, 5, 5);
    this.mainScene.add(this.directionalLight);

    this.envMap = null;
    this.presets = new Map();
  }

  setEnvironment(texture) {
    this.envMap = texture;
    this.mainScene.environment = texture;
  }

  registerPreset(id, config) {
    this.presets.set(id, config);
  }

  applyPreset(id) {
    if (!this.presets.has(id)) return;
    const config = this.presets.get(id);
    
    if (config.ambientIntensity !== undefined) {
      this.ambientLight.intensity = config.ambientIntensity;
    }
    if (config.directionalIntensity !== undefined) {
      this.directionalLight.intensity = config.directionalIntensity;
    }
    if (config.directionalPosition) {
      this.directionalLight.position.copy(config.directionalPosition);
    }
    if (config.directionalColor) {
      this.directionalLight.color.set(config.directionalColor);
    }
  }
}
