import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export class PostProcessingManager {
  constructor(renderer, scene, camera, width, height) {
    this.composer = new EffectComposer(renderer.instance);
    
    // 1. Base Render
    this.renderPass = new RenderPass(scene, camera);
    this.composer.addPass(this.renderPass);
    
    // 2. Optimized Bloom (for status LEDs and copper glints)
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.6,  // strength
      0.4,  // radius
      0.85  // threshold (only glow if brighter than this)
    );
    this.composer.addPass(this.bloomPass);

    // 3. Color Management & Tone Mapping Output
    // Replaces renderer.render output encoding
    this.outputPass = new OutputPass();
    this.composer.addPass(this.outputPass);
  }

  resize(width, height) {
    this.composer.setSize(width, height);
  }

  render() {
    this.composer.render();
  }
}
