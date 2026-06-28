/**
 * data/projects.js — Engineering Project Entries
 *
 * Schema:
 *   id           — URL-safe slug
 *   title        — Project display name
 *   tagline      — Single sentence description (appears on card)
 *   category     — Taxonomy: mechanical | software | systems | electrical | research
 *   year         — Year completed or started
 *   tags         — Up to 5 technology/discipline tags
 *   thumbnail    — Relative path to thumbnail image (optional)
 *   featured     — true: displayed prominently at top of grid
 *   status       — completed | ongoing | archived
 *   visibility   — public | private
 *   caseStudyUrl — URL to the case study page
 *   externalUrl  — Optional external link
 *   caseStudy    — Detailed engineering case study object (used by the Case Study page)
 */

export const projects = [
  {
    id: 'stinky-shoes-deodorizer',
    title: 'Say Goodbye to Stinky Shoes',
    tagline: 'An active thermal drying and deodorizing system for athletic footwear.',
    category: 'electrical',
    year: 2025,
    tags: ['ESP8266', 'Thermal Control', 'Power Efficiency', 'User Comfort'],
    thumbnail: '/assets/stinky-shoes.jpg',
    featured: true,
    status: 'completed',
    visibility: 'public',
    caseStudyUrl: 'case-study.html?id=stinky-shoes-deodorizer',
    externalUrl: null,
    caseStudy: {
      problem: 'Wet and sweaty shoes remain damp for a long time, causing discomfort, odor, and poor hygiene. Traditional drying methods are slow and inconvenient.',
      why_insufficient: 'Passive drying takes too long, and putting shoes in direct sunlight or a tumble dryer often damages the adhesives and synthetic materials.',
      design_decisions: 'The core requirement was to dry shoes quickly using active airflow and precise thermal control without exceeding the safe temperature threshold of shoe materials.',
      prototype_evolution: 'I started by simply pointing fans at the shoes, but realized that without a slight temperature increase and forced internal circulation, the moisture wouldn\'t evaporate effectively.',
      hardware_architecture: 'The system is driven by a NodeMCU ESP8266. A laptop blower fan provides forced air, controlled via a custom PWM circuit. A DHT11 sensor placed inside the shoe provides feedback, while a WS2812 LED indicates system status.',
      firmware_architecture: 'Built on the Arduino Framework in C++, the firmware runs a local web server for mobile app control and executes deterministic logic for the Automatic Smart Mode, processing DHT11 telemetry to adjust fan speed dynamically.',
      challenges: 'Managing the thermal dynamics was difficult. The air needed to be hot enough to evaporate moisture rapidly, but strictly capped to avoid melting shoe adhesives. Tuning the PWM curve to balance noise and airflow was also critical.',
      testing: 'The system was tested extensively on soaked running shoes to verify drying times and ensure the automatic firmware logic behaved correctly under high-humidity conditions.',
      final_implementation: 'The final build includes Wi-Fi app control, a Turbo mode, manual speed control, an Automatic Smart Mode, adjustable ON/OFF timing cycles, and WS2812 status indication.',
      hardware: ['NodeMCU ESP8266', 'Laptop blower fan', 'PWM fan speed control', 'DHT11 sensor inside the shoe', 'WS2812 status LED'],
      software: ['C++ (Arduino Framework)', 'Custom PWM Fan Control', 'Web Server for Mobile App'],
      learned: 'This project solidified my understanding of active thermal management, reading sensor telemetry accurately, and building a responsive mobile interface hosted directly on a microcontroller.',
      future: 'Future upgrades include an ESP32 redesign for better processing and Bluetooth support, OTA firmware updates, automatic foot detection, a better firmware architecture, and more intelligent environmental control.',
      specSheet: {
        status: 'Completed',
        controller: 'NodeMCU ESP8266',
        sensors: 'DHT11 Temp & Humidity',
        communication: 'Wi-Fi (Local Web Server)',
        technologies: 'C++, Arduino Framework, PWM',
        duration: '3 Months',
        currentStage: 'Fully operational prototype'
      },
      architectureDiagram: [
        'Mobile App',
        'NodeMCU ESP8266',
        'PWM Driver',
        'Laptop Blower Fan',
        'Active Airflow'
      ],
      awards: [
        'INSPIRE Award selection',
        'Government Buildathon participation',
        'OP Jindal University Silver Medal (District Level)'
      ],
      media: {
        heroImage: '/assets/stinky-shoes.jpg',
        gallery: [],
        breadboardImages: [],
        pcbRenders: [],
        cadRenders: [],
        testingImages: [],
        finishedProductImages: [],
        videos: []
      }
    }
  },
  {
    id: 'smart-bicycle-indicator',
    title: 'Smart Bicycle Lighting & Safety System',
    tagline: 'A comprehensive lighting and signaling system to improve rider visibility.',
    category: 'systems',
    year: 2023,
    tags: ['Arduino Mega', 'Road Safety', 'Hardware Debouncing', 'User Interface'],
    thumbnail: '/assets/smart-bicycle.jpg',
    featured: true,
    status: 'completed',
    visibility: 'public',
    caseStudyUrl: 'case-study.html?id=smart-bicycle-indicator',
    externalUrl: null,
    caseStudy: {
      problem: 'Cyclists face severe safety risks on roads with poor lighting, struggling to communicate their intentions clearly to surrounding fast-moving traffic.',
      why_insufficient: 'Standard bicycle reflectors are passive and require external light. Existing clip-on lights are easily stolen, easily forgotten, and do not communicate turning intentions.',
      design_decisions: 'The interface needed to be highly intuitive so the rider could focus on the road. The system had to be permanently mounted, reliable, and capable of generating distinct, recognizable visual signals.',
      prototype_evolution: 'Early versions used simple blinkers, but I quickly realized that sequential animations are much more effective at grabbing driver attention and indicating direction.',
      hardware_architecture: 'An Arduino Mega serves as the dedicated controller, providing the massive I/O needed to drive a 20 LED WS2812 strip alongside multiple toggle, slide, and brake switches, and an LDR.',
      firmware_architecture: 'The firmware utilizes strict state machine logic in C/C++ to ensure that inputs from the rider immediately interrupt and alter the lighting animations without being delayed by blocking code loops.',
      challenges: 'The biggest challenge was managing many inputs simultaneously. I implemented hardware debouncing with resistors to ensure clean switch reads, freeing up processor cycles to maintain smooth sequential LED animations.',
      testing: 'The finished prototype was mounted directly to a bicycle and tested under actual night-riding conditions to verify visibility, durability, and switch ergonomics.',
      final_implementation: 'The final system features sequential indicators, a brake light, parking light, hazard mode, Knight Rider mode, automatic DRL (using the LDR), and battery saving modes.',
      hardware: ['Arduino Mega', '20 LED WS2812 strip', 'Dedicated controller', 'Toggle switches', 'Slide switches', 'Brake switch', 'LDR'],
      software: ['C/C++ (Arduino Framework)', 'State Machine Logic'],
      learned: 'I gained deep experience in concurrent input management, hardware-level switch debouncing, and programming non-blocking visual animations for safety applications.',
      future: 'Future upgrades involve an ESP32 migration for a phone application, central locking, remote unlock animation, anti-theft protection, front lighting, a waterproof enclosure, follow-me-home lighting, and OTA updates.',
      specSheet: {
        status: 'Completed',
        controller: 'Arduino Mega',
        sensors: 'LDR, Toggle/Slide/Brake Switches',
        communication: 'Hardwired',
        technologies: 'C/C++, Hardware Debouncing, State Machines',
        duration: '6 Months',
        currentStage: 'Mounted, road-tested prototype'
      },
      architectureDiagram: [
        'Battery',
        'Arduino Mega',
        'Switches',
        'WS2812 LEDs',
        'Indicators / Brake Lights'
      ],
      awards: [
        'First Prize (2023)',
        'Additional district recognition',
        'INSPIRE selection'
      ],
      media: {
        heroImage: '/assets/smart-bicycle.jpg',
        gallery: [],
        breadboardImages: [],
        pcbRenders: [],
        cadRenders: [],
        testingImages: [],
        finishedProductImages: [],
        videos: []
      }
    }
  },
  {
    id: 'pi-control',
    title: 'Pi Control',
    tagline: 'Remote Raspberry Pi Power & Thermal Management System.',
    category: 'systems',
    year: 2024,
    tags: ['ESP32', 'Raspberry Pi', 'Relay Sequencing', 'Power Management'],
    thumbnail: '/assets/pi-control.jpg',
    featured: false,
    status: 'ongoing',
    visibility: 'public',
    caseStudyUrl: 'case-study.html?id=pi-control',
    externalUrl: null,
    caseStudy: {
      problem: 'My Raspberry Pi is installed deep inside a server rack and is not easily accessible. Keeping it powered continuously increases power usage unnecessarily, but improper hard-shutdowns corrupt SD cards and USB boot drives.',
      why_insufficient: 'Smart plugs can cut power remotely, but they cannot tell the Raspberry Pi OS to shut down gracefully first, leading to inevitable filesystem corruption.',
      design_decisions: 'The primary goal was safe power sequencing. I needed an independent, 24/7 low-power microcontroller to act as an intelligent hardware gatekeeper for the high-power Raspberry Pi.',
      prototype_evolution: 'I started with just a relay, manually SSHing into the Pi before cutting power. This was tedious. The project evolved to automate the entire handshake.',
      hardware_architecture: 'The system uses an ESP32 controlling 4 Relay outputs, alongside a laptop cooling fan managed by PWM, an OLED display for local readouts, and WS2812 status LEDs.',
      firmware_architecture: 'The ESP32 runs a local web server and communicates with a custom API script running on the Raspberry Pi. This dual-node architecture ensures the ESP32 always knows the exact state of the Pi.',
      challenges: 'Implementing the asynchronous safe shutdown handshake was difficult. If the Pi takes longer than expected to unmount drives during a heavy I/O load, cutting the relay too early causes the exact corruption I was trying to prevent.',
      testing: 'The power sequencing logic was tested repeatedly by triggering remote shutdowns during high disk I/O, ensuring the 30-second delay was sufficient for complete system halts before relay disengagement.',
      final_implementation: 'The current system features a local dashboard, phone interface, OTA capabilities, safe Raspberry Pi startup, graceful shutdown, automatic power cut after shutdown, and live OLED monitoring of Temperature, RAM, Storage, IP, and Relay status.',
      hardware: ['ESP32', 'Laptop fan', 'PWM', 'OLED', 'WS2812', '4 Relay outputs'],
      software: ['C++', 'Safe Shutdown API', 'Local Web Dashboard'],
      learned: 'This project taught me how to architect multi-device systems where one low-power device acts as an intelligent hardware supervisor for a larger, more complex computer.',
      future: 'This project is actively under development. Future upgrades will include scheduling, automated routines, energy optimization, remote monitoring, and additional relay functions.',
      specSheet: {
        status: 'Ongoing',
        controller: 'ESP32',
        sensors: 'None',
        communication: 'Wi-Fi (Local API / TCP)',
        technologies: 'C++, Safe Shutdown API, Relay Logic',
        duration: 'Active Development',
        currentStage: 'Installed in server rack'
      },
      architectureDiagram: [
        'Web Dashboard',
        'ESP32',
        'Shutdown API Call',
        'Raspberry Pi (Halt)',
        '30s Delay',
        'Relay Power Cut'
      ],
      awards: [],
      media: {
        heroImage: '/assets/pi-control.jpg',
        gallery: [],
        breadboardImages: [],
        pcbRenders: [],
        cadRenders: [],
        testingImages: [],
        finishedProductImages: [],
        videos: []
      }
    }
  },
  {
    id: 'smart-water-tank-monitoring',
    title: 'Smart Water Tank Monitoring & Pump Automation',
    tagline: 'An automated telemetry system for monitoring water levels and protecting pumps.',
    category: 'systems',
    year: 2026,
    tags: ['ESP32', 'Ultrasonic Sensing', 'Automation', 'Motor Protection'],
    thumbnail: '/assets/smart-water-tank.jpg',
    featured: false,
    status: 'ongoing',
    visibility: 'public',
    caseStudyUrl: 'case-study.html?id=smart-water-tank-monitoring',
    externalUrl: null,
    caseStudy: {
      problem: 'Operating a water pump when the tank or bore is empty can cause severe mechanical damage. Monitoring these levels manually is tedious and prone to human error.',
      why_insufficient: 'Standard float switches often fail mechanically over time and provide no granular data on actual water levels or consumption rates.',
      design_decisions: 'I wanted a non-contact measurement solution (ultrasonic) coupled with active current sensing to protect the motor, integrating voice alerts for immediate local feedback.',
      prototype_evolution: 'Early bare-sensor tests failed due to extreme humidity inside the water tank. The project quickly shifted from a purely electronic problem to a mechanical housing problem.',
      hardware_architecture: 'An ESP32 interfaces with a JSN-SR04T waterproof ultrasonic sensor housed inside a special protective PVC pipe enclosure with a ventilation chimney. It also utilizes a current sensing module and a JQ6500 voice module.',
      firmware_architecture: 'The firmware focuses heavily on digital signal processing, applying custom algorithms to filter out acoustic noise and reject false echoes before making automation decisions.',
      challenges: 'Ultrasonic sensors in enclosed tanks frequently bounce false echoes off the walls or condensation droplets. The mechanical chimney effect helped, but I still had to develop multiple software filtering algorithms to ensure reliability.',
      testing: 'The system is currently in beta testing, actively filtering real-world acoustic reflections and measuring current draw to characterize the pump\'s normal load profile in a live environment.',
      final_implementation: 'The beta implementation provides continuous level calculation, automatic motor protection (dry run cut-off), and percentage-based voice announcements.',
      hardware: ['JSN-SR04T waterproof ultrasonic sensor', 'Special protective pipe enclosure', 'Ventilation chimney', 'Current sensing', 'JQ6500 voice module'],
      software: ['C++', 'Signal filtering', 'False echo rejection'],
      learned: 'I gained significant experience in mechanical-electronic integration (specifically fighting condensation) and writing robust digital filters to clean up noisy sensor data.',
      future: 'Future upgrades include usage analytics, graphical data visualization, consumption tracking, a remote application, historical data logging, and industrial refinement. The project remains in beta testing.',
      specSheet: {
        status: 'Beta Testing',
        controller: 'ESP32',
        sensors: 'JSN-SR04T Ultrasonic, Current Sensor',
        communication: 'Serial (JQ6500 Audio)',
        technologies: 'C++, Digital Signal Filtering',
        duration: '4 Months',
        currentStage: 'Live Beta Testing'
      },
      architectureDiagram: [
        'Ultrasonic Pulse',
        'JSN-SR04T',
        'Signal Filter Algorithm',
        'ESP32 Logic',
        'Pump Control / Voice Alert'
      ],
      awards: [],
      media: {
        heroImage: '/assets/smart-water-tank.jpg',
        gallery: [],
        breadboardImages: [],
        pcbRenders: [],
        cadRenders: [],
        testingImages: [],
        finishedProductImages: [],
        videos: []
      }
    }
  }
];
