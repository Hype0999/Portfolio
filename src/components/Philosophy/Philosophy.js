/**
 * components/Philosophy/Philosophy.js — Apple Bento Grid
 *
 * Philosophy statement as a full-width featured tile.
 * 4 principles in a 2×2 bento grid with liquid glass.
 * Each tile has an SVG icon and hover lift effect.
 */

import { site } from '../../data/site.js';
import './Philosophy.css';

// Icon SVGs per principle
const ICONS = [
  // Precision — target/crosshair
  `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="14" cy="14" r="10"/><circle cx="14" cy="14" r="4"/><line x1="14" y1="1" x2="14" y2="4"/><line x1="14" y1="24" x2="14" y2="27"/><line x1="1" y1="14" x2="4" y2="14"/><line x1="24" y1="14" x2="27" y2="14"/>
  </svg>`,
  // Craftsmanship — tool/wrench
  `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21.5 6.5a5 5 0 0 1-6.2 7.8L8 22a2.1 2.1 0 1 1-3-3l8.2-7.3A5 5 0 0 1 21.5 6.5z"/><path d="M21.5 6.5L18 10l-2-2 3.5-3.5"/>
  </svg>`,
  // Simplicity — minimal circle
  `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
    <circle cx="14" cy="14" r="10"/><path d="M10 14h8M14 10v8"/>
  </svg>`,
  // Systems thinking — network nodes
  `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
    <circle cx="14" cy="5" r="2.5"/><circle cx="5" cy="21" r="2.5"/><circle cx="23" cy="21" r="2.5"/><path d="M14 7.5L5 18.5M14 7.5L23 18.5M5 21h18"/>
  </svg>`,
];

export function Philosophy() {
  const section = document.createElement('section');
  section.className = 'philosophy section';
  section.id = 'philosophy';
  section.setAttribute('aria-label', 'Engineering philosophy');

  // Premium "Plasma" Palette - highly distinct and vibrant, but not cheap.
  // We use rich jewel tones with a diffused glow to look like high-end glowing hardware.
  const tileColors = [
    { color: '#00e5ff', glow: 'rgba(0, 229, 255, 0.35)' }, // Precision - Cyber Cyan
    { color: '#ff6600', glow: 'rgba(255, 102, 0, 0.35)' }, // Craftsmanship - Molten Orange
    { color: '#00fa9a', glow: 'rgba(0, 250, 154, 0.35)' }, // Simplicity - Spring Mint
    { color: '#c026d3', glow: 'rgba(192, 38, 211, 0.35)' } // Systems - Fuchsia Violet
  ];

  const principles = site.philosophy.principles
    .map(
      (p, i) => `
      <div class="philosophy__tile liquid-glass liquid-glass-lift tilt-card" style="--tile-color: ${tileColors[i].color}; --tile-glow: ${tileColors[i].glow};" data-reveal data-reveal-delay="${i + 1}">
        <div class="philosophy__tile-icon">${ICONS[i] || ICONS[0]}</div>
        <h3 class="philosophy__tile-title">${p.title}</h3>
        <p class="philosophy__tile-body text-body-sm">${p.body}</p>
        <div class="philosophy__tile-num text-caption">${String(i + 1).padStart(2, '0')}</div>
      </div>
    `
    )
    .join('');

  section.innerHTML = `
    <div class="container">

      <header class="section-header" data-reveal>
        <span class="text-label-accent section-header__label">Philosophy</span>
        <h2 class="text-heading-1 section-header__title">
          How I think about<br>engineering.
        </h2>
      </header>

      <!-- Featured statement tile -->
      <div class="philosophy__statement-tile liquid-glass" data-reveal data-reveal-delay="1">
        <div class="philosophy__statement-tag text-label-accent">Core belief</div>
        <blockquote class="philosophy__statement">
          <p>${site.philosophy.statement}</p>
        </blockquote>
        <div class="philosophy__statement-deco" aria-hidden="true">
          <span class="philosophy__quote-mark">"</span>
        </div>
      </div>

      <!-- 2×2 Bento grid -->
      <div class="philosophy__bento">
        ${principles}
      </div>

    </div>
  `;

  return section;
}
