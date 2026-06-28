/**
 * TimelineScene.js — Hardware Era Morphing
 *
 * As the user scrolls through each milestone, the 3D object
 * CHANGES to represent the actual hardware of that era.
 *
 * Arduino Uno  → Simple large rectangular board, big headers
 * Arduino Mega → Wider board, more pins
 * ESP8266      → Small WiFi module, compact
 * Raspberry Pi → Larger board, USB ports, HDMI
 * ESP32        → Medium chip with RF shield
 * PCB Design   → Custom streamlined PCB, polished
 * Current      → Custom PCB + glowing assembled state
 *
 * Each object floats, rotates slowly, reacts to mouse.
 * Spring physics for transition.
 */
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class TimelineScene {
  constructor(canvas, milestoneCount) {
    this.canvas = canvas;
    this.milestoneCount = milestoneCount;
    this.currentMilestone = -1;
    this.mouse = { x: 0, y: 0 };
    this.spring = { x: 0, y: 0, vx: 0, vy: 0 };
    this.k = 0.06;
    this.d = 0.78;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(canvas.clientWidth || 300, canvas.clientHeight || 500);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.3;
    THREE.ColorManagement.enabled = true;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.scene  = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    this.camera.position.set(0, 1.8, 10);
    this.camera.lookAt(0, 0, 0);

    this.objects = []; // All hardware representations
    this.activeGroup = null;

    this._buildLighting();
    this._buildAllHardware();
    this._bindScroll();
    this._bindMouse();
    this._bindResize();
    this._showMilestone(0);
    this._loop();
  }

  _buildLighting() {
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const key = new THREE.DirectionalLight(0xfff0d0, 3.0);
    key.position.set(4, 7, 5);
    this.scene.add(key);

    const back = new THREE.DirectionalLight(0x8ab0ff, 1.2);
    back.position.set(-5, -2, -3);
    this.scene.add(back);

    const fill = new THREE.DirectionalLight(0xffffff, 0.5);
    fill.position.set(0, -4, 4);
    this.scene.add(fill);

    this.glowLight = new THREE.PointLight(0xff8c00, 0, 5);
    this.glowLight.position.set(0, 1, 2);
    this.scene.add(this.glowLight);
  }

  // ── SHARED MATERIALS ───────────────────────────────────────

  _boardMat(color = 0x103510) {
    return new THREE.MeshStandardMaterial({ color, roughness: 0.7, metalness: 0.05 });
  }
  _chipMat() {
    return new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.3, metalness: 0.2 });
  }
  _pinMat() {
    return new THREE.MeshStandardMaterial({ color: 0xd4aa44, roughness: 0.15, metalness: 1.0 });
  }
  _copperMat() {
    return new THREE.MeshStandardMaterial({ color: 0xb87333, roughness: 0.2, metalness: 1.0, emissive: 0x3a1200, emissiveIntensity: 0.2 });
  }
  _ledMat(color, emissive) {
    return new THREE.MeshStandardMaterial({ color, emissive, emissiveIntensity: 2.5, roughness: 0.1 });
  }

  _addHeaderPins(group, count, x, y, z, dir = 'z') {
    const mat = this._pinMat();
    for (let i = 0; i < count; i++) {
      const pin = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.3, 0.06), mat);
      pin.position.set(
        dir === 'x' ? x + i * 0.18 : x,
        y,
        dir === 'z' ? z + i * 0.18 : z
      );
      group.add(pin);
    }
  }

  // ── MILESTONE 0: Arduino Uno ────────────────────────────────
  _buildArduinoUno() {
    const g = new THREE.Group();
    g.name = 'ArduinoUno';

    // Large teal board
    g.add(new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.2, 3.2), this._boardMat(0x006060)));

    // ATmega328 chip
    g.add(this._addBox(g, 0, 0.2, 0, 1.0, 0.22, 0.9, this._chipMat()));

    // Power barrel jack
    const jack = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.35, 12), new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.4, metalness: 0.5 }));
    jack.rotation.z = Math.PI / 2;
    jack.position.set(-2.0, 0.12, -1.2);
    g.add(jack);

    // USB-B connector
    const usb = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.35, 0.55), new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.3, metalness: 0.9 }));
    usb.position.set(-2.0, 0.18, 0.3);
    g.add(usb);

    // Header pins
    this._addHeaderPins(g, 14, -1.5, 0.28, -1.5, 'x');  // Digital
    this._addHeaderPins(g, 6,   0.8, 0.28, -1.5, 'x');  // Analog

    // Power LED
    const pwrLed = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.1), this._ledMat(0x00ff00, 0x00ff00));
    pwrLed.position.set(-0.4, 0.2, -1.4);
    g.add(pwrLed);
    this.activeLeds = [{ mat: pwrLed.material }];

    return g;
  }

  // ── MILESTONE 1: Arduino Mega ───────────────────────────────
  _buildArduinoMega() {
    const g = new THREE.Group();
    g.name = 'ArduinoMega';

    g.add(new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.2, 3.5), this._boardMat(0x004a70)));

    // ATmega2560
    this._addBox(g, 0, 0.2, 0.3, 1.3, 0.22, 1.0, this._chipMat());

    // USB-B
    const usb = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.35, 0.55), new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.3, metalness: 0.9 }));
    usb.position.set(-2.5, 0.18, 0.5);
    g.add(usb);

    // Larger header count
    this._addHeaderPins(g, 18, -2.0, 0.28, -1.6, 'x');
    this._addHeaderPins(g, 18, -2.0, 0.28,  1.5, 'x');
    this._addHeaderPins(g, 8,  1.5, 0.28, -1.6, 'x');

    const led = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.1), this._ledMat(0x00ff00, 0x00ff00));
    led.position.set(-1.0, 0.2, -1.5);
    g.add(led);
    this.activeLeds = [{ mat: led.material }];

    return g;
  }

  // ── MILESTONE 2: ESP8266 NodeMCU ────────────────────────────
  _buildESP8266() {
    const g = new THREE.Group();
    g.name = 'ESP8266';

    // Small compact module
    g.add(new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.18, 3.8), this._boardMat(0x0a1a0a)));

    // Module can (metal RF shield)
    const can = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.25, 1.5), new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.2, metalness: 0.95 }));
    can.position.set(0, 0.22, -0.3);
    g.add(can);

    // Antenna trace on board
    this._addBox(g, 1.0, 0.1, -1.5, 0.08, 0.02, 0.8, this._copperMat());
    this._addBox(g, 1.0, 0.1, -1.1, 0.5, 0.02, 0.08, this._copperMat());

    // Header rows both sides
    this._addHeaderPins(g, 11, -1.0, 0.22, -1.8, 'z');
    this._addHeaderPins(g, 11, 0.8, 0.22, -1.8, 'z');

    // Micro USB
    const usb = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.18, 0.4), new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.9, roughness: 0.2 }));
    usb.position.set(0, 0.18, 1.9);
    g.add(usb);

    // WiFi glow (emissive blue)
    const wifiGlow = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), this._ledMat(0x4488ff, 0x2255ff));
    wifiGlow.position.set(1.0, 0.25, -1.6);
    g.add(wifiGlow);
    this.activeLeds = [{ mat: wifiGlow.material }];

    return g;
  }

  // ── MILESTONE 3: Raspberry Pi ────────────────────────────────
  _buildRaspberryPi() {
    const g = new THREE.Group();
    g.name = 'RaspberryPi';

    // Red-ish board
    g.add(new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.2, 3.2), this._boardMat(0x2a0808)));

    // Main SoC
    this._addBox(g, 0.2, 0.2, 0, 1.1, 0.22, 1.1, this._chipMat());

    // RAM chip on top
    const ram = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.18, 0.8), new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.4 }));
    ram.position.set(0.2, 0.41, 0);
    g.add(ram);

    // 4x USB ports
    for (let i = 0; i < 4; i++) {
      const usbPort = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.4, 0.5), new THREE.MeshStandardMaterial({ color: 0x222244, roughness: 0.3, metalness: 0.7 }));
      usbPort.position.set(i % 2 === 0 ? 1.8 : 1.8, 0.2, -0.8 + (i * 0.45));
      g.add(usbPort);
    }

    // HDMI
    const hdmi = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.3, 0.45), new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8, roughness: 0.2 }));
    hdmi.position.set(-0.5, 0.18, 1.6);
    g.add(hdmi);

    // GPIO header 40-pin
    this._addHeaderPins(g, 20, -1.8, 0.28, -1.5, 'x');
    this._addHeaderPins(g, 20, -1.8, 0.28, -1.3, 'x');

    const led1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.1), this._ledMat(0xff0000, 0xff0000));
    const led2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.1), this._ledMat(0x00ff00, 0x00ff00));
    led1.position.set(-2.0, 0.2, 0.2); led2.position.set(-2.0, 0.2, 0.5);
    g.add(led1); g.add(led2);
    this.activeLeds = [{ mat: led1.material }, { mat: led2.material }];

    return g;
  }

  // ── MILESTONE 4: ESP32 ──────────────────────────────────────
  _buildESP32() {
    const g = new THREE.Group();
    g.name = 'ESP32';

    g.add(new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.18, 4.2), this._boardMat(0x0a1a0a)));

    // WROOM module
    const module = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.28, 1.8), new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.3, metalness: 0.5 }));
    module.position.set(0, 0.23, -0.5);
    g.add(module);

    // Metal shield on module
    const shield = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.22, 1.5), new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.2, metalness: 0.95 }));
    shield.position.set(0, 0.34, -0.5);
    g.add(shield);

    // Antenna at top
    this._addBox(g, 0.7, 0.1, -1.85, 0.06, 0.02, 0.9, this._copperMat());
    this._addBox(g, 0.7, 0.1, -1.4, 0.5, 0.02, 0.06, this._copperMat());

    // 2x header rows
    this._addHeaderPins(g, 15, -1.2, 0.22, -2.0, 'z');
    this._addHeaderPins(g, 15, 0.9, 0.22, -2.0, 'z');

    // USB-C
    const usbc = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.2, 0.4), new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.9, roughness: 0.2 }));
    usbc.position.set(0, 0.18, 2.1);
    g.add(usbc);

    // Dual LEDs (represents dual-core)
    const led1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.1), this._ledMat(0x00ff88, 0x00ff88));
    const led2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.1), this._ledMat(0xff8800, 0xff4400));
    led1.position.set(-0.3, 0.2, 1.5); led2.position.set(0.1, 0.2, 1.5);
    g.add(led1); g.add(led2);
    this.activeLeds = [{ mat: led1.material }, { mat: led2.material }];

    return g;
  }

  // ── MILESTONE 5: PCB Design ─────────────────────────────────
  _buildCustomPCB() {
    const g = new THREE.Group();
    g.name = 'CustomPCB';

    // Dark, precise custom board — smaller, engineered
    g.add(new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.14, 2.8), this._boardMat(0x050f05)));

    // Dense copper trace network
    const traces = [
      { x: 0, z: -0.6, w: 2.5, h: 0.04 }, { x: -1.0, z: 0.2, w: 0.04, h: 1.2 },
      { x: 1.0, z: 0.2, w: 0.04, h: 1.0 }, { x: 0.4, z: 0.7, w: 1.8, h: 0.04 },
      { x: -0.6, z: -0.1, w: 0.04, h: 0.6 }, { x: 0.8, z: -0.3, w: 0.04, h: 0.5 },
    ];
    traces.forEach(t => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(t.w, 0.02, t.h), this._copperMat());
      m.position.set(t.x, 0.08, t.z);
      g.add(m);
    });

    // Custom chip
    this._addBox(g, 0, 0.17, 0, 0.9, 0.2, 0.7, this._chipMat());

    // Mounted passives (very small, precise)
    const passMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.5 });
    [[-1.4, -0.7], [-1.1, -0.7], [-0.8, -0.7], [1.2, 0.2], [1.2, 0.5]].forEach(([x, z]) => {
      g.add(new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.12), passMat));
      g.children[g.children.length - 1].position.set(x, 0.12, z);
    });

    // 3 precision LEDs
    const ledColors = [[0x00ff88, 0x00ff88], [0xff8800, 0xff4400], [0x4488ff, 0x2255ff]];
    this.activeLeds = ledColors.map(([c, e], i) => {
      const mat = this._ledMat(c, e);
      const led = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.1), mat);
      led.position.set(-1.6 + i * 0.25, 0.15, 1.1);
      g.add(led);
      return { mat };
    });

    // USB-C, precise
    const usbc = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.2, 0.38), new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.95, roughness: 0.15 }));
    usbc.position.set(1.9, 0.13, 0);
    g.add(usbc);

    return g;
  }

  // ── MILESTONE 6: Current (Assembled + Glowing) ──────────────
  _buildCurrentState() {
    const g = this._buildCustomPCB();
    g.name = 'CurrentState';

    // Extra glow — all copper traces lit up bright
    g.traverse(child => {
      if (child.isMesh && child.material.metalness === 1.0) {
        child.material = child.material.clone();
        child.material.emissiveIntensity = 0.8;
        child.material.emissive = new THREE.Color(0x8a3a00);
      }
    });

    // Boost all LEDs
    this.activeLeds.forEach(l => {
      l.mat.emissiveIntensity = 4.0;
    });

    return g;
  }

  // Helper
  _addBox(group, x, y, z, w, h, d, mat) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    group.add(mesh);
    return mesh;
  }

  _buildAllHardware() {
    const builders = [
      () => this._buildArduinoUno(),
      () => this._buildArduinoMega(),
      () => this._buildESP8266(),
      () => this._buildRaspberryPi(),
      () => this._buildESP32(),
      () => this._buildCustomPCB(),
      () => this._buildCurrentState(),
    ];

    builders.forEach((builder, i) => {
      const grp = builder();
      grp.visible = false;
      // Initial float position
      grp.position.y = -0.3;
      this.scene.add(grp);
      this.objects.push(grp);
    });
  }

  _showMilestone(index) {
    const i = Math.min(index, this.objects.length - 1);
    if (i === this.currentMilestone) return;

    const prev = this.currentMilestone >= 0 ? this.objects[this.currentMilestone] : null;
    const next = this.objects[i];

    this.currentMilestone = i;
    this.activeGroup = next;

    // Rebuild activeLeds ref (rebuilt each time)
    this.activeLeds = [];
    next.traverse(child => {
      if (child.isMesh && child.material.emissiveIntensity > 1) {
        this.activeLeds.push({ mat: child.material });
      }
    });

    // Animate out old
    if (prev) {
      gsap.to(prev.position, { y: -3, duration: 0.5, ease: 'power2.in', onComplete: () => { prev.visible = false; } });
      gsap.to(prev.rotation, { y: prev.rotation.y + 0.5, duration: 0.5, ease: 'power2.in' });
    }

    // Animate in new
    next.visible = true;
    next.position.y = 3;
    next.rotation.y = -0.5;
    gsap.to(next.position, { y: 0, duration: 0.7, ease: 'power2.out', delay: 0.15 });
    gsap.to(next.rotation, { y: 0, duration: 0.7, ease: 'power2.out', delay: 0.15 });
  }

  _bindScroll() {
    const section = document.getElementById('timeline');
    if (!section) return;

    // Each milestone entry drives the 3D object swap
    const entries = section.querySelectorAll('[data-timeline-index]');
    entries.forEach((entry, i) => {
      ScrollTrigger.create({
        trigger: entry,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => this._showMilestone(i),
        onEnterBack: () => this._showMilestone(i),
      });
    });
  }

  _bindMouse() {
    window.addEventListener('pointermove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouse.y = (e.clientY / window.innerHeight - 0.5) * -2;
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

      if (this.activeGroup) {
        // Spring mouse tilt
        const tx = this.mouse.y * 0.2;
        const ty = this.mouse.x * 0.25 + t * 0.05;

        const ax = (tx - this.spring.x) * this.k;
        const ay = (ty - this.spring.y) * this.k;
        this.spring.vx = this.spring.vx * this.d + ax;
        this.spring.vy = this.spring.vy * this.d + ay;
        this.spring.x += this.spring.vx;
        this.spring.y += this.spring.vy;

        this.activeGroup.rotation.x = -0.2 + this.spring.x;
        this.activeGroup.rotation.y = this.spring.y;

        // Float
        this.activeGroup.position.y += (Math.sin(t * 0.6) * 0.12 - this.activeGroup.position.y) * 0.03;
      }

      // LED animations
      if (this.activeLeds) {
        this.activeLeds.forEach((led, i) => {
          const pulse = 0.5 + Math.sin(t * (2.0 + i * 0.9) + i) * 0.5;
          led.mat.emissiveIntensity = 1.5 + pulse * 2.5;
        });
      }

      // Glow light follows active LEDs
      if (this.glowLight) {
        this.glowLight.intensity = 1.5 + Math.sin(t * 2.0) * 1.0;
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
