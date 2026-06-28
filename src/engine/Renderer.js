import * as THREE from 'three';
import { PerformanceManager } from './PerformanceManager.js';

export class Renderer {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'engine-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.pointerEvents = 'none';
    
    document.body.appendChild(this.canvas);

    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: PerformanceManager.shouldUseAntialias(),
      powerPreference: 'high-performance'
    });

    // Modern Three.js Color Management
    THREE.ColorManagement.enabled = true;
    this.instance.outputColorSpace = THREE.SRGBColorSpace;
    this.instance.toneMapping = THREE.ACESFilmicToneMapping;
    this.instance.toneMappingExposure = 1.0;
    
    this.instance.setClearColor(0x000000, 0); // Transparent
    this.instance.shadowMap.enabled = false;

    // Resize Observer instead of window resize event
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(document.body);
    
    this.resize();
  }

  resize() {
    // Body dimensions are more stable than window innerWidth/Height, especially on mobile
    const width = document.body.clientWidth;
    const height = window.innerHeight;
    this.instance.setSize(width, height);
    this.instance.setPixelRatio(PerformanceManager.getPixelRatio());
  }

  render(scene, camera) {
    this.instance.render(scene, camera);
  }

  destroy() {
    this.resizeObserver.disconnect();
    this.instance.dispose();
    if (this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}
