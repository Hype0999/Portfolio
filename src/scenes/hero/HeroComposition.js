import * as THREE from 'three';

/**
 * HeroComposition.js
 * 
 * Generates modular, interchangeable groups for the Hero Scene.
 * Built entirely with procedural primitives and MaterialManager for physical realism.
 * These groups can be easily swapped with .glb assets in the future without breaking animation logic.
 */
export class HeroComposition {
  constructor(materialManager) {
    this.mm = materialManager;
  }

  createBreadboard() {
    const group = new THREE.Group();
    group.name = 'BreadboardNode';

    // Main Plastic Body
    const bodyGeo = new THREE.BoxGeometry(4, 0.5, 8);
    const bodyMesh = new THREE.Mesh(bodyGeo, this.mm.get('breadboard_plastic'));
    group.add(bodyMesh);

    // Procedural Power Rails (Red / Blue lines)
    const redRailGeo = new THREE.BoxGeometry(0.1, 0.51, 7.8);
    const redRail = new THREE.Mesh(redRailGeo, this.mm.get('wire_red'));
    redRail.position.set(-1.8, 0, 0);
    group.add(redRail);

    const blueRail = new THREE.Mesh(redRailGeo, this.mm.get('wire_blue'));
    blueRail.position.set(1.8, 0, 0);
    group.add(blueRail);
    
    return group;
  }

  createJumperWires() {
    const group = new THREE.Group();
    group.name = 'JumperWiresNode';

    // Simple curved wires connecting random points
    const createWire = (start, end, colorId) => {
      const curve = new THREE.QuadraticBezierCurve3(
        start,
        new THREE.Vector3((start.x + end.x) / 2, start.y + 2, (start.z + end.z) / 2),
        end
      );
      const geo = new THREE.TubeGeometry(curve, 10, 0.05, 8, false);
      const mesh = new THREE.Mesh(geo, this.mm.get(colorId));
      return mesh;
    };

    group.add(createWire(new THREE.Vector3(-1.5, 0.25, 2), new THREE.Vector3(0, 0.25, 0), 'wire_red'));
    group.add(createWire(new THREE.Vector3(1.5, 0.25, -2), new THREE.Vector3(0.5, 0.25, 1), 'wire_blue'));
    
    return group;
  }

  createPCB() {
    const group = new THREE.Group();
    group.name = 'PCBNode';

    // Matte Black FR4 Board
    const boardGeo = new THREE.BoxGeometry(3.5, 0.1, 5);
    const board = new THREE.Mesh(boardGeo, this.mm.get('pcb_black'));
    group.add(board);

    // Procedural Copper Traces (Slightly raised)
    const traceGeo = new THREE.BoxGeometry(0.1, 0.12, 3);
    const trace1 = new THREE.Mesh(traceGeo, this.mm.get('copper_trace'));
    trace1.position.set(-1, 0, 0);
    group.add(trace1);
    
    const trace2 = new THREE.Mesh(traceGeo, this.mm.get('copper_trace'));
    trace2.position.set(1, 0, 0);
    group.add(trace2);

    return group;
  }

  createComponents() {
    const group = new THREE.Group();
    group.name = 'ComponentsNode';

    // ESP32 Main Chip (Epoxy Black)
    const chipGeo = new THREE.BoxGeometry(1.2, 0.2, 2.5);
    const chip = new THREE.Mesh(chipGeo, this.mm.get('epoxy_black'));
    chip.position.set(0, 0.1, -0.5);
    
    // Aluminum Heat Shield
    const shieldGeo = new THREE.BoxGeometry(1.0, 0.22, 1.0);
    const shield = new THREE.Mesh(shieldGeo, this.mm.get('aluminum'));
    shield.position.set(0, 0, -0.5);
    chip.add(shield);
    
    group.add(chip);

    // SMD Resistors
    const resGeo = new THREE.BoxGeometry(0.2, 0.15, 0.4);
    const res1 = new THREE.Mesh(resGeo, this.mm.get('epoxy_black'));
    res1.position.set(1.2, 0.1, 1.5);
    group.add(res1);

    // Status LED
    const ledGeo = new THREE.BoxGeometry(0.15, 0.15, 0.15);
    const led = new THREE.Mesh(ledGeo, this.mm.get('led_green'));
    led.position.set(-1.2, 0.1, 2.0);
    led.name = 'StatusLED'; // Tagged for animation logic
    group.add(led);

    return group;
  }
}
