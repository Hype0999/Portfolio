/**
 * components/Awards/Awards.js
 *
 * Recognition section — conditionally rendered.
 * When the awards array is empty, this component returns null
 * and is not mounted at all. No empty state, no placeholder.
 *
 * Reads from data/awards.js
 */

import { awards } from '../../data/awards.js';
import './Awards.css';

export function Awards() {
  // Hidden entirely when empty — no visual placeholder
  if (awards.length === 0) return null;

  const section = document.createElement('section');
  section.className = 'awards section';
  section.id = 'awards';
  section.setAttribute('aria-label', 'Recognition and awards');

  const items = awards
    .map(
      (award) => `
    <div class="award-item liquid-glass liquid-glass-lift" data-reveal>
      <div class="award-item__header">
        <div>
          ${award.projectName ? `<span class="award-item__project-name tag tag--accent">${award.projectName}</span>` : ''}
          <h3 class="award-item__title">${award.title}</h3>
          <p class="award-item__issuer">${award.issuer}</p>
        </div>
        <span class="text-mono award-item__year">${award.year}</span>
      </div>
      ${award.description ? `<p class="award-item__description">${award.description}</p>` : ''}
      ${award.url ? `<a href="${award.url}" class="award-item__link btn-magnetic" target="_blank" rel="noopener noreferrer">View recognition ↗</a>` : ''}
    </div>
  `
    )
    .join('');

  section.innerHTML = `
    <div class="container" data-scene="awards" data-lighting="ambient" data-camera="perspective" data-animation="true">
      <header class="section-header" data-reveal>
        <span class="text-label section-header__label">Recognition</span>
        <h2 class="text-heading-1 section-header__title">
          Awards.
        </h2>
      </header>
      <div class="awards__list">
        ${items}
      </div>
    </div>
  `;

  return section;
}
