/**
 * components/Stack/Stack.js
 *
 * Engineering Stack toolkit section.
 * Organizes tools into categories without progress bars or ratings.
 *
 * Reads from data/stack.js
 */

import { stack } from '../../data/stack.js';
import './Stack.css';

function StackCategory(category, index) {
  const el = document.createElement('div');
  el.className = 'stack-category';
  el.setAttribute('data-reveal', 'fade-up');
  el.setAttribute('data-reveal-delay', String((index % 4) + 1));

  el.innerHTML = `
    <h3 class="text-heading-3 stack-category__title">${category.category}</h3>
    <ul class="stack-category__items" role="list">
      ${category.items.map(item => `<li class="stack-category__item text-body">${item}</li>`).join('')}
    </ul>
  `;

  return el;
}

export function Stack() {
  const section = document.createElement('section');
  section.className = 'stack section';
  section.id = 'stack';
  section.setAttribute('aria-label', 'Engineering Stack');

  const container = document.createElement('div');
  container.className = 'container';
  container.setAttribute('data-scene', 'stack');
  container.setAttribute('data-lighting', 'ambient');
  container.setAttribute('data-camera', 'perspective');
  container.setAttribute('data-animation', 'true');

  container.innerHTML = `
    <header class="section-header" data-reveal>
      <span class="text-label section-header__label">Toolkit</span>
      <h2 class="text-heading-1 section-header__title">
        Engineering Stack.
      </h2>
    </header>
  `;

  const grid = document.createElement('div');
  grid.className = 'stack__grid';
  
  stack.forEach((cat, index) => {
    grid.appendChild(StackCategory(cat, index));
  });

  container.appendChild(grid);
  section.appendChild(container);

  return section;
}
