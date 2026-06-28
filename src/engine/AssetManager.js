import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

export class AssetManager {
  constructor() {
    this.models = new Map();
    this.textures = new Map();
    
    this.loadingManager = new THREE.LoadingManager(
      () => { if (this.onLoadComplete) this.onLoadComplete(); },
      (url, itemsLoaded, itemsTotal) => { if (this.onProgress) this.onProgress(url, itemsLoaded, itemsTotal); },
      (url) => { console.error(`[AssetManager] Failed to load: ${url}`); if (this.onError) this.onError(url); }
    );

    this.gltfLoader = new GLTFLoader(this.loadingManager);
    this.textureLoader = new THREE.TextureLoader(this.loadingManager);
    this.cubeTextureLoader = new THREE.CubeTextureLoader(this.loadingManager);
    this.rgbeLoader = new RGBELoader(this.loadingManager);
    
    // Draco configuration for highly compressed meshes
    this.dracoLoader = new DRACOLoader(this.loadingManager);
    this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    this.dracoLoader.setDecoderConfig({ type: 'js' });
    this.gltfLoader.setDRACOLoader(this.dracoLoader);
  }

  async loadModel(id, url) {
    if (this.models.has(id)) return this.models.get(id);

    return new Promise((resolve, reject) => {
      this.gltfLoader.load(url, (gltf) => {
        this.models.set(id, gltf);
        resolve(gltf);
      }, undefined, reject);
    });
  }

  async loadTexture(id, url) {
    if (this.textures.has(id)) return this.textures.get(id);

    return new Promise((resolve, reject) => {
      this.textureLoader.load(url, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        this.textures.set(id, texture);
        resolve(texture);
      }, undefined, reject);
    });
  }

  async loadHDRI(id, url, renderer) {
    if (this.textures.has(id)) return this.textures.get(id);

    return new Promise((resolve, reject) => {
      this.rgbeLoader.load(url, (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        // Optionally pre-compile environment mapping via PMREMGenerator if needed here, 
        // but passing it to Scene.environment handles it internally in modern Three.js
        this.textures.set(id, texture);
        resolve(texture);
      }, undefined, reject);
    });
  }

  getModel(id) {
    return this.models.get(id);
  }

  getTexture(id) {
    return this.textures.get(id);
  }

  dispose() {
    this.textures.forEach(tex => tex.dispose());
    this.textures.clear();
    
    // Models contain multiple resources (materials, geometries, textures)
    // The PerformanceManager recursive disposal handles deeper destruction if needed.
    this.models.clear();
  }
}
