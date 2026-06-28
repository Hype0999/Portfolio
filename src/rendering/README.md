# How to Add Three.js to a Section

This document explains how to activate the 3D rendering layer in a future specification.

## Current State (v1.0)

The `RenderingLayer` base class and `SceneManager` are fully stubbed.  
Canvas mount points exist in the Hero section (`#hero-canvas-mount`).  
No Three.js dependency is installed — zero bundle weight in v1.0.

## Adding Three.js

### Step 1 — Install Three.js

```bash
npm install three
```

### Step 2 — Create a Scene

Create `src/rendering/HeroScene.js`:

```js
import * as THREE from 'three';
import { RenderingLayer } from './RenderingLayer.js';

export class HeroScene extends RenderingLayer {
  async init() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,          // Transparent background — UI sits on top
      antialias: true,
    });
    this.scene    = new THREE.Scene();
    this.camera   = new THREE.PerspectiveCamera(45, this.canvas.width / this.canvas.height, 0.1, 100);
    this.camera.position.z = 5;

    // ... build your scene here

    this.isActive = true;
    this._loop();
  }

  _loop() {
    if (!this.isActive) return;
    this.animationFrameId = requestAnimationFrame(() => this._loop());
    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  resize(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  dispose() {
    super.dispose();
    this.renderer.dispose();
    // Traverse scene and dispose geometries/materials
  }
}
```

### Step 3 — Mount the Scene in main.js

Uncomment the rendering block in `src/main.js`:

```js
import { HeroScene } from './rendering/HeroScene.js';

// Inside mount():
const heroCanvas = document.createElement('canvas');
const mountPoint = getHeroCanvasMountPoint();
if (mountPoint) {
  mountPoint.appendChild(heroCanvas);
  const scene = new HeroScene(heroCanvas);
  await scene.init();
  scene.start();
}
```

### Step 4 — Style the Canvas

The canvas mount already has `position: absolute; inset: 0; z-index: -1` — it sits behind the UI content.  
No CSS changes needed in the UI layer.

## Design Rules for 3D Scenes

- Use `alpha: true` so scenes blend with the dark background
- Use `--canvas-blend-mode` CSS token for blend modes
- Access brand colors via `getAccentHex()` from `src/lib/theme.js`
- Respect `prefers-reduced-motion` — pause animations if user has set this preference
- Dispose all Three.js resources when the section leaves viewport (use SceneManager)

## File Locations

| File | Purpose |
|---|---|
| `src/rendering/RenderingLayer.js` | Abstract base class — always extend this |
| `src/rendering/SceneManager.js` | Lifecycle manager for multiple scenes |
| `src/rendering/HeroScene.js` | (Future) Hero section 3D scene |
| `src/lib/theme.js` | Token → JS color conversion utilities |
