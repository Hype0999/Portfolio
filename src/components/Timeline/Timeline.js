/**
 * components/Timeline/Timeline.js — Vertical Timeline
 *
 * Centered vertical connector with alternating left/right entries.
 * Pure CSS/SVG animated connector — no Three.js canvas.
 * Liquid glass entry cards with year badges.
 */

import { timeline } from '../../data/timeline.js';
import './Timeline.css';

function TimelineEntry(entry, index) {
  const side = index % 2 === 0 ? 'left' : 'right';
  const el   = document.createElement('div');
  el.className = `timeline__entry timeline__entry--${side}`;
  el.setAttribute('data-reveal', side);
  el.setAttribute('data-reveal-delay', String((index % 4) + 1));

  const isCurrent = entry.current;

  el.innerHTML = `
    <!-- Connector node -->
    <div class="timeline__node ${isCurrent ? 'timeline__node--active' : ''}">
      <div class="timeline__node-dot"></div>
    </div>

    <!-- Card -->
    <div class="timeline__card liquid-glass liquid-glass-lift ${isCurrent ? 'timeline__card--current' : ''} tilt-card">
      <div class="timeline__card-meta">
        ${(entry.period || entry.year)
          ? `<span class="timeline__year text-label-accent">${entry.period || entry.year}</span>`
          : ''}
        <span class="timeline__type tag ${isCurrent ? 'tag--accent' : ''}">${entry.type}</span>
        ${isCurrent ? '<span class="timeline__current-badge">Now</span>' : ''}
      </div>

      <h3 class="timeline__title ${isCurrent ? 'hl-gradient' : ''}">${entry.title}</h3>

      ${entry.organisation
        ? `<p class="timeline__org text-body-sm">${entry.organisation}</p>`
        : ''}

      ${entry.description
        ? `<p class="timeline__description text-body-sm">${entry.description}</p>`
        : ''}
    </div>
  `;

  return el;
}

export function Timeline() {
  const section = document.createElement('section');
  section.className = 'timeline section';
  section.id = 'timeline';
  section.setAttribute('aria-label', 'Engineering journey');

  section.innerHTML = `
    <div class="container">
      <header class="section-header" data-reveal>
        <span class="text-label-accent section-header__label">Journey</span>
        <h2 class="text-heading-1 section-header__title">Timeline.</h2>
      </header>

      <div class="timeline__track" role="list" aria-label="Engineering milestones">
        <!-- Animated vertical connector line -->
        <div class="timeline__line" aria-hidden="true">
          <div class="timeline__line-fill"></div>
        </div>
      </div>
    </div>
  `;

  const track = section.querySelector('.timeline__track');
  [...timeline].forEach((entry, i) => {
    track.appendChild(TimelineEntry(entry, i));
  });

  return section;
}
