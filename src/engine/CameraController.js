import * as THREE from 'three';

export class CameraController {
  constructor(aspectRatio) {
    this.instance = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
    this.instance.position.set(0, 0, 10);
    
    this.targetPosition = new THREE.Vector3(0, 0, 10);
    this.targetLookAt = new THREE.Vector3(0, 0, 0);
    this.currentLookAt = new THREE.Vector3(0, 0, 0);
    
    this.dampingFactor = 0.05;
    
    // Path routing
    this.currentPath = null;
    this.pathProgress = 0; // 0 to 1
    
    // Configurable camera presets for different scenes
    this.presets = new Map();
  }

  resize(width, height) {
    this.instance.aspect = width / height;
    this.instance.updateProjectionMatrix();
  }

  registerPreset(id, position, lookAt) {
    this.presets.set(id, { 
      position: new THREE.Vector3().copy(position), 
      lookAt: new THREE.Vector3().copy(lookAt) 
    });
  }

  applyPreset(id, instant = false) {
    if (!this.presets.has(id)) return;
    const preset = this.presets.get(id);
    
    this.setTarget(preset.position, preset.lookAt);
    
    if (instant) {
      this.instance.position.copy(preset.position);
      this.currentLookAt.copy(preset.lookAt);
      this.instance.lookAt(this.currentLookAt);
    }
  }

  setTarget(position, lookAt) {
    if (position) {
      this.targetPosition.copy(position);
      this.currentPath = null; // Clear path if setting a direct target
    }
    if (lookAt) this.targetLookAt.copy(lookAt);
  }

  setPath(curve, progress = 0) {
    this.currentPath = curve;
    this.pathProgress = progress;
    this.updatePathPosition();
  }

  setPathProgress(progress) {
    if (!this.currentPath) return;
    this.pathProgress = Math.max(0, Math.min(1, progress));
    this.updatePathPosition();
  }

  updatePathPosition() {
    this.currentPath.getPointAt(this.pathProgress, this.targetPosition);
  }

  setDamping(factor) {
    this.dampingFactor = factor;
  }

  update() {
    this.instance.position.lerp(this.targetPosition, this.dampingFactor);
    this.currentLookAt.lerp(this.targetLookAt, this.dampingFactor);
    this.instance.lookAt(this.currentLookAt);
  }
}
