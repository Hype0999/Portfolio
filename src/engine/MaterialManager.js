import * as THREE from 'three';

/**
 * MaterialManager.js
 * 
 * The single source of truth for every material across the portfolio.
 * All scenes read from here — no inline material definitions anywhere.
 * 
 * Palette: graphite, copper, matte glass, anodised aluminium
 * No random colours. No neon. No rainbow.
 */
export class MaterialManager {
  constructor() {
    this.cache = new Map();
    this._init();
  }

  _init() {
    // ─── Environment ───────────────────────────────────────────
    
    // Vast matte ground plane — precision-machined aluminium feeling
    this.register('env_ground', new THREE.MeshStandardMaterial({
      color: 0x0d0d0d,
      roughness: 0.95,
      metalness: 0.05,
    }));

    // Ultra-thin accent groove lines — barely reflective copper
    this.register('env_accent_line', new THREE.MeshStandardMaterial({
      color: 0x5a3a1a,
      roughness: 0.3,
      metalness: 0.7,
    }));

    // ─── Glass / UI Panels ─────────────────────────────────────
    
    // Frosted glass — Apple VisionOS inspired
    this.register('glass_panel', new THREE.MeshPhysicalMaterial({
      color: 0x1a1a1a,
      roughness: 0.05,
      metalness: 0.0,
      transmission: 0.85,
      thickness: 0.5,
      transparent: true,
      opacity: 0.6,
    }));

    // ─── Engineering Materials ──────────────────────────────────
    
    // Anodised dark aluminium (structural surfaces, card backs)
    this.register('aluminum_dark', new THREE.MeshStandardMaterial({
      color: 0x1c1c1e,
      roughness: 0.6,
      metalness: 0.9,
    }));

    // Copper trace (accent marks, precision lines)
    this.register('copper', new THREE.MeshStandardMaterial({
      color: 0xb87333,
      roughness: 0.25,
      metalness: 1.0,
    }));

    // PCB solder mask — very dark matte green-black
    this.register('pcb_dark', new THREE.MeshStandardMaterial({
      color: 0x0a0e0a,
      roughness: 0.85,
      metalness: 0.1,
    }));

    // ─── Emissive accents ──────────────────────────────────────

    // Status LED green (used minimally — only where meaningful)
    this.register('led_green', new THREE.MeshStandardMaterial({
      color: 0x00e676,
      emissive: 0x00e676,
      emissiveIntensity: 1.5,
      roughness: 0.1,
    }));

    // Status LED amber (system ready state)
    this.register('led_amber', new THREE.MeshStandardMaterial({
      color: 0xff8f00,
      emissive: 0xff8f00,
      emissiveIntensity: 1.2,
      roughness: 0.1,
    }));
  }

  register(id, material) {
    this.cache.set(id, material);
  }

  get(id) {
    if (!this.cache.has(id)) {
      console.warn(`[MaterialManager] '${id}' not found. Check your ID.`);
      return new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true });
    }
    return this.cache.get(id);
  }

  dispose() {
    this.cache.forEach(mat => mat.dispose());
    this.cache.clear();
  }
}
