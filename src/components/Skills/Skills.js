/**
 * components/Skills/Skills.js — Tag Cloud Layout
 *
 * Skills rendered as category groups with glowing pill chips.
 * Each group has a big category header and flowing tag chips.
 * Not a bar chart. Not a bullet list. Premium and readable.
 */

import { skills } from '../../data/skills.js';
import './Skills.css';

// Accent color cycling per group
const GROUP_ACCENTS = ['violet', 'amber', 'violet', 'amber'];

function SkillGroup(group, index) {
  const accent  = GROUP_ACCENTS[index % GROUP_ACCENTS.length];
  const el      = document.createElement('div');
  el.className  = `skill-group skill-group--${accent}`;
  el.setAttribute('data-reveal', '');
  el.setAttribute('data-reveal-delay', String((index % 4) + 1));

  el.innerHTML = `
    <div class="skill-group__header">
      <span class="skill-group__number text-caption">${String(index + 1).padStart(2, '0')}</span>
      <h3 class="skill-group__category">${group.category}</h3>
    </div>
    ${group.description ? `<p class="skill-group__description text-body-sm">${group.description}</p>` : ''}
    <div class="skill-group__chips" role="list">
      ${group.items
        .map(
          (item) => `
        <span class="skill-chip skill-chip--${accent} liquid-glass" role="listitem">${item}</span>
      `
        )
        .join('')}
    </div>
  `;

  return el;
}

export function Skills() {
  const section = document.createElement('section');
  section.className = 'skills section';
  section.id = 'skills';
  section.setAttribute('aria-label', 'Engineering disciplines');

  const grid = document.createElement('div');
  grid.className = 'skills__grid';

  skills.forEach((group, i) => {
    grid.appendChild(SkillGroup(group, i));
  });

  section.innerHTML = `
    <div class="container">
      <header class="section-header" data-reveal>
        <span class="text-label-accent section-header__label">Disciplines</span>
        <h2 class="text-heading-1 section-header__title">
          Areas of practice.
        </h2>
      </header>
    </div>
  `;

  const container = section.querySelector('.container');
  container.appendChild(grid);

  return section;
}
