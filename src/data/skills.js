/**
 * data/skills.js — Areas of Practice
 *
 * Represents engineering discipline areas.
 * Emphasizes what is built, problems solved, and experience gained using authentic engineering language.
 */

export const skills = [
  {
    id: 'discipline-embedded',
    category: 'Embedded Systems',
    description: 'I enjoy writing low-level code that connects software logic directly to the physical world. I approach problems by balancing processing power with power efficiency, focusing on real-time execution and sensor fusion.',
    items: ['Microcontroller Programming', 'Real-time Sensor Integration', 'Motor Control & Actuation', 'C / C++ Development'],
  },
  {
    id: 'discipline-hardware',
    category: 'Hardware Design',
    description: 'I turn theoretical circuits into reliable physical boards. I focus on moving past messy breadboards to design complete, compact electronic systems, treating hardware constraints as necessary design parameters rather than limitations.',
    items: ['Schematic Capture', 'PCB Layout', 'Component Selection', 'Signal Routing'],
  },
  {
    id: 'discipline-iot',
    category: 'IoT & Connected Devices',
    description: 'I build devices that extract telemetry and communicate over networks. I solve the challenge of making resource-constrained hardware talk securely to dashboards and servers, exploring lightweight embedded intelligence.',
    items: ['Wireless Telemetry (Wi-Fi/BLE)', 'MQTT Protocol', 'Networked Sensor Arrays', 'Power Efficiency'],
  },
  {
    id: 'discipline-product',
    category: 'Engineering Product Development',
    description: 'I don\'t just build projects to prove a concept; I engineer them to solve practical, everyday problems. I focus heavily on the iteration process, reliability testing, and how a user will actually interact with the final physical device.',
    items: ['Problem Identification', 'User-Centric Hardware', 'Reliability Testing', 'System Architecture'],
  },
];
