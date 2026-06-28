import * as THREE from 'three';
import gsap from 'gsap';
import { PerformanceManager } from './PerformanceManager.js';
import { Renderer } from './Renderer.js';
import { CameraController } from './CameraController.js';
import { SceneManager } from './SceneManager.js';
import { LightingManager } from './LightingManager.js';
import { AssetManager } from './AssetManager.js';
import { SceneRegistry } from './SceneRegistry.js';
import { MaterialManager } from './MaterialManager.js';
import { PostProcessingManager } from './PostProcessingManager.js';
import { EnvironmentManager } from './EnvironmentManager.js';
import { ScrollCameraController } from './ScrollCameraController.js';

export class Engine {
  constructor(options = {}) {
    PerformanceManager.init(options.debug || false);
    
    this.renderer = new Renderer();
    this.cameraController = new CameraController(window.innerWidth / window.innerHeight);
    this.mainScene = new THREE.Scene();
    
    // Core systems
    this.materialManager = new MaterialManager();
    this.sceneManager = new SceneManager(this.mainScene);
    this.lightingManager = new LightingManager(this.mainScene);
    this.assetManager = new AssetManager();
    this.sceneRegistry = new SceneRegistry(this);

    // Post-processing
    this.postProcessing = new PostProcessingManager(
      this.renderer,
      this.mainScene,
      this.cameraController.instance,
      window.innerWidth,
      window.innerHeight
    );

    // Unified world environment
    this.environmentManager = new EnvironmentManager(this);
    this.environmentManager.build();

    // Scroll-driven camera (replaces preset-based system)
    this.scrollCameraController = new ScrollCameraController(this);
    
    this.clock = new THREE.Clock();
    this.isRunning = false;
    this.isTabVisible = true;
    this.tickBind = this.tick.bind(this);
    
    window.addEventListener('resize', this.onResize.bind(this));
    document.addEventListener('visibilitychange', this.onVisibilityChange.bind(this));
    
    if (PerformanceManager.debugMode) {
      this._initDebugUI();
    }
  }

  onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.cameraController.resize(w, h);
    this.postProcessing.resize(w, h);
  }

  onVisibilityChange() {
    this.isTabVisible = document.visibilityState === 'visible';
    if (!this.isTabVisible && this.isRunning) {
      gsap.ticker.remove(this.tickBind);
    } else if (this.isTabVisible && this.isRunning) {
      this.clock.start();
      gsap.ticker.add(this.tickBind);
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.clock.start();
    if (this.isTabVisible) {
      gsap.ticker.add(this.tickBind);
    }
  }

  stop() {
    this.isRunning = false;
    gsap.ticker.remove(this.tickBind);
  }

  tick() {
    if (!this.isRunning || !this.isTabVisible) return;

    const deltaTime = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    PerformanceManager.tick();

    // Scroll camera drives position — CameraController.update() intentionally NOT called
    this.scrollCameraController.update();

    // Update the unified environment
    this.environmentManager.update(elapsedTime, deltaTime);

    // Update active scene if any
    this.sceneManager.update(elapsedTime, deltaTime);

    // Render via post-processing composer
    this.postProcessing.render();

    if (PerformanceManager.debugMode) {
      this._updateDebugUI();
    }
  }

  _initDebugUI() {
    this.debugEl = document.createElement('div');
    Object.assign(this.debugEl.style, {
      position: 'fixed', top: '10px', left: '10px',
      background: 'rgba(0,0,0,0.85)', color: '#00e676',
      fontFamily: 'monospace', fontSize: '11px',
      padding: '10px 14px', pointerEvents: 'none',
      zIndex: '9999', lineHeight: '1.8',
      border: '1px solid #1a3a2a', borderRadius: '4px'
    });
    document.body.appendChild(this.debugEl);
  }

  _updateDebugUI() {
    if (!this.debugEl) return;
    const info = this.renderer.instance.info;
    const cam = this.cameraController.instance.position;
    this.debugEl.innerHTML = `
      FPS: ${PerformanceManager.stats.fps}<br>
      Scroll: ${(this.scrollCameraController.smoothProgress * 100).toFixed(1)}%<br>
      Cam: ${cam.x.toFixed(2)}, ${cam.y.toFixed(2)}, ${cam.z.toFixed(2)}<br>
      Geometries: ${info.memory.geometries}<br>
      Textures: ${info.memory.textures}<br>
      DrawCalls: ${info.render.calls}
    `;
  }
}
