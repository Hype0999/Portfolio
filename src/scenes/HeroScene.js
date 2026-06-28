/**
 * HeroScene.js — Floating Custom PCB
 *
 * A real 3D engineering object: a custom PCB with copper traces,
 * SMD components, a WiFi antenna, and pulsing status LEDs.
 *
 * Reacts to mouse with spring physics (not simple lerp).
 * Rotates slowly and confidently, like a product reveal.
 *
 * This is NOT a background. This IS the hero object.
 */
import * as THREE from 'three';

export class HeroScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.mouse = { x: 0, y: 0 };
    this.spring = { x: 0, y: 0, vx: 0, vy: 0 };
    this.k = 0.08; // Spring stiffness
    this.d = 0.75; // Damping

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(canvas.clientWidth || 500, canvas.clientHeight || 500);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.4;
    THREE.ColorManagement.enabled = true;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    this.camera.position.set(0, 1.5, 10);
    this.camera.lookAt(0, 0, 0);

    this._buildLighting();
    this._buildPCB();
    this._bindMouse();
    this._bindResize();
    this._loop();
  }

  _buildLighting() {
    // Strong warm key light — PCB shows off copper
    const key = new THREE.DirectionalLight(0xfff0d0, 3.5);
    key.position.set(5, 8, 6);
    this.scene.add(key);

    // Cool back light — separation and depth
    const back = new THREE.DirectionalLight(0x7eb8ff, 1.5);
    back.position.set(-5, -3, -4);
    this.scene.add(back);

    // Bottom fill — removes harsh shadows on PCB underside
    const fill = new THREE.DirectionalLight(0xffffff, 0.4);
    fill.position.set(0, -5, 3);
    this.scene.add(fill);

    // Ambient — keeps everything readable
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    // LED point lights (animated)
    this.led1Light = new THREE.PointLight(0x00ff88, 2.5, 3);
    this.led1Light.position.set(-1.2, 0.2, 0.3);
    this.scene.add(this.led1Light);

    this.led2Light = new THREE.PointLight(0xff6600, 1.8, 2.5);
    this.led2Light.position.set(0.8, 0.2, 0.6);
    this.scene.add(this.led2Light);
  }

  _buildPCB() {
    this.pcbGroup = new THREE.Group();
    this.scene.add(this.pcbGroup);

    // ── PCB BOARD ─────────────────────────────────────────────
    const boardMat = new THREE.MeshStandardMaterial({
      color: 0x0a1a0a,  // Dark PCB green-black
      roughness: 0.7,
      metalness: 0.1,
    });
    const board = new THREE.Mesh(new THREE.BoxGeometry(5, 0.18, 3.2), boardMat);
    this.pcbGroup.add(board);

    // ── COPPER TRACES ──────────────────────────────────────────
    const traceMat = new THREE.MeshStandardMaterial({
      color: 0xb87333,
      roughness: 0.15,
      metalness: 1.0,
      emissive: 0x3a1500,
      emissiveIntensity: 0.3,
    });

    // Horizontal traces
    const hTraces = [
      { x: 0, z: -0.8, w: 3.2 },
      { x: -0.5, z: 0.4, w: 2.0 },
      { x: 0.8, z: 0.8, w: 1.5 },
    ];
    hTraces.forEach(t => {
      const geo = new THREE.BoxGeometry(t.w, 0.025, 0.04);
      const mesh = new THREE.Mesh(geo, traceMat);
      mesh.position.set(t.x, 0.1, t.z);
      this.pcbGroup.add(mesh);
    });

    // Vertical traces
    const vTraces = [
      { x: -1.5, z: 0, h: 2.0 },
      { x: 0.8, z: 0, h: 1.6 },
      { x: 1.8, z: 0, h: 1.2 },
    ];
    vTraces.forEach(t => {
      const geo = new THREE.BoxGeometry(0.04, 0.025, t.h);
      const mesh = new THREE.Mesh(geo, traceMat);
      mesh.position.set(t.x, 0.1, t.z);
      this.pcbGroup.add(mesh);
    });

    // ── MAIN CHIP (ESP32-like) ─────────────────────────────────
    const chipMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.3,
      metalness: 0.2,
    });
    const metalShield = new THREE.MeshStandardMaterial({
      color: 0x888888,
      roughness: 0.3,
      metalness: 0.95,
    });

    // Chip body
    const chip = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.2, 1.0), chipMat);
    chip.position.set(0, 0.19, 0);
    this.pcbGroup.add(chip);

    // Metal RF shield on chip
    const shield = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.18, 0.65), metalShield);
    shield.position.set(0.1, 0.29, 0.05);
    this.pcbGroup.add(shield);

    // Pin rows on chip
    const pinMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.2, metalness: 1.0 });
    for (let i = 0; i < 12; i++) {
      const pin = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.14, 0.06), pinMat);
      pin.position.set(-0.6 + i * 0.11, 0.1, 0.56);
      this.pcbGroup.add(pin);

      const pin2 = pin.clone();
      pin2.position.z = -0.56;
      this.pcbGroup.add(pin2);
    }

    // ── SMD RESISTORS / CAPS ───────────────────────────────────
    const smdMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.5 });
    const smds = [
      { x: -1.8, z: -0.9, w: 0.22, h: 0.12 },
      { x: -1.4, z: -0.9, w: 0.22, h: 0.12 },
      { x: -1.0, z: -0.9, w: 0.22, h: 0.12 },
      { x: -2.0, z: 0.2,  w: 0.22, h: 0.14 },
      { x: 2.0,  z: -0.5, w: 0.22, h: 0.14 },
      { x: 2.0,  z: 0.2,  w: 0.22, h: 0.12 },
    ];
    smds.forEach(s => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(s.w, 0.12, s.h), smdMat.clone());
      mesh.position.set(s.x, 0.15, s.z);
      this.pcbGroup.add(mesh);
    });

    // ── WIFI ANTENNA ───────────────────────────────────────────
    const antMat = new THREE.MeshStandardMaterial({
      color: 0xccaa44,
      roughness: 0.2,
      metalness: 0.9,
    });
    // Vertical antenna rod
    const ant = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.8, 0.04), antMat);
    ant.position.set(-2.3, 0.5, -1.2);
    this.pcbGroup.add(ant);
    // Horizontal top
    const antH = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.04, 0.04), antMat);
    antH.position.set(-2.15, 0.9, -1.2);
    this.pcbGroup.add(antH);

    // ── STATUS LEDs ────────────────────────────────────────────
    this.leds = [];
    const ledPositions = [
      { x: -1.2, z: 0.9, color: 0x00ff88, emissive: 0x00ff88 },  // Green power
      { x: -0.8, z: 0.9, color: 0xff8800, emissive: 0xff6600 },  // Amber status
      { x: -0.4, z: 0.9, color: 0x00aaff, emissive: 0x0066ff },  // Blue activity
    ];
    ledPositions.forEach(l => {
      const mat = new THREE.MeshStandardMaterial({
        color: l.color,
        emissive: l.emissive,
        emissiveIntensity: 2.5,
        roughness: 0.1,
      });
      const led = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 0.12), mat);
      led.position.set(l.x, 0.18, l.z);
      this.pcbGroup.add(led);
      this.leds.push({ mesh: led, mat, phase: Math.random() * Math.PI * 2 });
    });

    // ── USB-C CONNECTOR ────────────────────────────────────────
    const usbMat = new THREE.MeshStandardMaterial({ color: 0x777788, roughness: 0.3, metalness: 0.9 });
    const usb = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.22, 0.55), usbMat);
    usb.position.set(2.6, 0.1, 0);
    this.pcbGroup.add(usb);

    // ── HEADER PINS ────────────────────────────────────────────
    const headerMat = new THREE.MeshStandardMaterial({ color: 0xffdd88, roughness: 0.1, metalness: 1.0 });
    for (let i = 0; i < 8; i++) {
      const pin = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.35, 0.06), headerMat);
      pin.position.set(-2.2, 0.27, -1.0 + i * 0.25);
      this.pcbGroup.add(pin);
    }

    // Initial tilt — feels like you're looking at a product
    this.pcbGroup.rotation.x = -0.25;
    this.pcbGroup.rotation.y = 0.3;
  }

  _bindMouse() {
    window.addEventListener('pointermove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      // Map mouse to [-1, 1] relative to viewport center
      this.mouse.x = ((e.clientX / window.innerWidth) - 0.5) * 2;
      this.mouse.y = ((e.clientY / window.innerHeight) - 0.5) * -2;
    }, { passive: true });
  }

  _bindResize() {
    new ResizeObserver(() => {
      const w = this.canvas.clientWidth;
      const h = this.canvas.clientHeight;
      this.renderer.setSize(w, h);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }).observe(this.canvas);
  }

  _loop() {
    const tick = () => {
      const t = Date.now() * 0.001;

      // ── Spring physics for mouse tilt ──────────────────────
      const targetX = this.mouse.y * 0.25;
      const targetY = this.mouse.x * 0.35 + t * 0.08; // Slow auto-rotate Y

      const ax = (targetX - this.spring.x) * this.k;
      const ay = (targetY - this.spring.y) * this.k;

      this.spring.vx = this.spring.vx * this.d + ax;
      this.spring.vy = this.spring.vy * this.d + ay;

      this.spring.x += this.spring.vx;
      this.spring.y += this.spring.vy;

      this.pcbGroup.rotation.x = -0.25 + this.spring.x;
      this.pcbGroup.rotation.y = this.spring.y;

      // Subtle float up and down
      this.pcbGroup.position.y = Math.sin(t * 0.5) * 0.12;

      // ── LED pulsing ────────────────────────────────────────
      this.leds.forEach((led, i) => {
        const pulse = 0.5 + Math.sin(t * (2.5 + i * 0.7) + led.phase) * 0.5;
        led.mat.emissiveIntensity = 1.5 + pulse * 2.5;
      });

      // LED lights pulse too
      if (this.led1Light) {
        this.led1Light.intensity = 1.5 + Math.sin(t * 2.5) * 1.2;
      }
      if (this.led2Light) {
        this.led2Light.intensity = 1.0 + Math.sin(t * 1.8 + 1.0) * 0.8;
      }

      this.renderer.render(this.scene, this.camera);
      this._rafId = requestAnimationFrame(tick);
    };
    tick();
  }

  destroy() {
    cancelAnimationFrame(this._rafId);
    this.renderer.dispose();
  }
}
