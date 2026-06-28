/**
 * components/Projects/Projects.js
 *
 * Magazine-style project showcase.
 * Featured projects render full-width first.
 * Standard projects in 2-column grid with index passed for editorial numbers.
 */

import { projects } from '../../data/projects.js';
import { ProjectCard } from './ProjectCard.js';
import { EmptyState } from './EmptyState.js';
import './Projects.css';

export function Projects() {
  const section = document.createElement('section');
  section.className = 'projects section';
  section.id = 'projects';
  section.setAttribute('aria-label', 'Engineering projects');

  section.innerHTML = `
    <div class="container">
      <header class="section-header" data-reveal data-reveal-delay="1">
        <span class="text-label-accent section-header__label">Work</span>
        <h2 class="text-heading-1 section-header__title">
          Engineering Projects.
        </h2>
      </header>
    </div>
  `;

  const body = document.createElement('div');
  body.className = 'container';

  if (projects.length === 0) {
    body.appendChild(EmptyState());
  } else {
    const featured = projects.filter((p) => p.featured);
    const rest     = projects.filter((p) => !p.featured);

    if (featured.length > 0) {
      const featuredGrid = document.createElement('div');
      featuredGrid.className = 'projects__grid projects__grid--featured';
      featured.forEach((p, i) => featuredGrid.appendChild(ProjectCard(p, i)));
      body.appendChild(featuredGrid);
    }

    if (rest.length > 0) {
      const grid = document.createElement('div');
      grid.className = 'projects__grid projects__grid--standard';
      rest.forEach((p, i) => grid.appendChild(ProjectCard(p, featured.length + i)));
      body.appendChild(grid);
    }
  }

  section.appendChild(body);
  return section;
}
