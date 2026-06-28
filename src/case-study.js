/**
 * case-study.js — Entry point for the case study template
 */

import './styles/main.css';

import { Nav } from './components/Nav/Nav.js';
import { Footer } from './components/Footer/Footer.js';
import { CaseStudy } from './components/CaseStudy/CaseStudy.js';
import { projects } from './data/projects.js';
import { initRevealObserver } from './lib/observer.js';
import { Engine } from './engine/Engine.js';

function mount() {
  const app = document.getElementById('app');
  if (!app) return;

  app.appendChild(Nav());

  const main = document.createElement('main');
  main.id = 'main-content';
  main.setAttribute('role', 'main');

  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  const project = projects.find(p => p.id === projectId);

  if (project && project.caseStudy) {
    document.title = `${project.title} — Case Study`;
    main.appendChild(CaseStudy(project));
  } else {
    document.title = 'Project Not Found';
    const notFound = document.createElement('div');
    notFound.className = 'container section';
    notFound.innerHTML = `
      <header class="section-header" style="margin-top: 20vh;">
        <h1 class="text-heading-1">Project not found</h1>
        <p class="text-body" style="margin-top: var(--space-4);">
          <a href="index.html#projects" class="project-card__link">Return to projects</a>
        </p>
      </header>
    `;
    main.appendChild(notFound);
  }

  app.appendChild(main);
  app.appendChild(Footer());

  initRevealObserver();

  try {
    window.engine = new Engine();
    window.engine.start();
  } catch (err) {
    console.error('[portfolio] Engine failed to initialize, running in fallback mode.', err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
