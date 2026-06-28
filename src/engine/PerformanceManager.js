import * as THREE from 'three';

export class PerformanceManager {
  static debugMode = false;
  static isMobile = false;
  static prefersReducedMotion = false;
  static stats = { frames: 0, fps: 0, lastTime: performance.now() };

  static init(debug = false) {
    this.debugMode = debug;
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  static getPixelRatio() {
    const maxDPR = this.isMobile ? 1.5 : 2;
    return Math.min(window.devicePixelRatio || 1, maxDPR);
  }

  static shouldUseAntialias() {
    return !this.isMobile;
  }

  static shouldReduceQuality() {
    return this.isMobile;
  }

  static tick() {
    if (!this.debugMode) return;
    this.stats.frames++;
    const now = performance.now();
    if (now >= this.stats.lastTime + 1000) {
      this.stats.fps = Math.round((this.stats.frames * 1000) / (now - this.stats.lastTime));
      this.stats.frames = 0;
      this.stats.lastTime = now;
    }
  }

  static disposeObject(object) {
    if (!object) return;
    object.traverse((child) => {
      if (child.isMesh) {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => this.disposeMaterial(mat));
          } else {
            this.disposeMaterial(child.material);
          }
        }
      }
    });
  }

  static disposeMaterial(material) {
    if (!material) return;
    for (const key in material) {
      const value = material[key];
      if (value && typeof value === 'object' && 'minFilter' in value) {
        value.dispose();
      }
    }
    material.dispose();
  }
}
