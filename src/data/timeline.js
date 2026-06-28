/**
 * data/timeline.js — Career Milestones & Engineering Journey
 *
 * Presented as an authentic progression of learning, explaining the 'why' behind each transition.
 */

export const timeline = [
  {
    id: 'milestone-uno',
    title: 'Arduino Uno',
    description: 'Learning electronics fundamentals. I started by driving a 16x2 LCD using full parallel wiring and building simple LED animations, transitioning away from copying tutorials into writing actual embedded code.',
    type: 'Hardware',
    current: false,
  },
  {
    id: 'milestone-mega',
    title: 'Arduino Mega',
    description: 'Adopted specifically because it was required for the Smart Bicycle Indicator System. The Uno lacked the necessary GPIO pins to handle the multiple LEDs, sensors, and modular wiring required for the project.',
    type: 'Hardware',
    current: false,
  },
  {
    id: 'milestone-esp8266',
    title: 'ESP8266 NodeMCU',
    description: 'Transitioned to explore Wi-Fi experimentation, IoT concepts, and wireless control. This board became the foundation for connected projects, eventually serving as the controller for the Smart Shoe deodorizer.',
    type: 'IoT',
    current: false,
  },
  {
    id: 'milestone-pi',
    title: 'Raspberry Pi',
    description: 'Shifted focus to understand Linux, networking, and server development. This platform allowed me to explore higher-level software systems outside of the constrained microcontroller environment.',
    type: 'Systems',
    current: false,
  },
  {
    id: 'milestone-esp32',
    title: 'ESP32',
    description: 'Adopted for its significantly greater processing power, built-in Bluetooth, and dual-core architecture. It provides the headroom necessary for future intelligent embedded systems and more complex software features.',
    type: 'Hardware',
    current: false,
  },
  {
    id: 'milestone-pcb',
    title: 'PCB Design',
    description: 'The transition from prototype wiring to engineered hardware. I stopped connecting ready-made modules together and started designing complete, robust electronic systems from schematic to layout.',
    type: 'Hardware Design',
    current: false,
  },
  {
    id: 'milestone-current',
    title: 'Current Engineering Projects',
    description: 'Combining everything from embedded C++ to custom PCB layout to solve real-world problems. My current focus is on building complete, reliable product prototypes.',
    type: 'Integration',
    current: true,
  }
];
