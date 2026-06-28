/**
 * components/Projects/EmptyState.js
 *
 * Displayed when the projects array is empty.
 * Intentionally designed — not a placeholder apology.
 * Communicates that work is curated and forthcoming.
 */

import './Projects.css';

export function EmptyState() {
  const el = document.createElement('div');
  el.className = 'projects-empty';
  el.setAttribute('role', 'status');
  el.setAttribute('aria-label', 'Projects coming soon');

  el.innerHTML = `
    <div class="projects-empty__inner">
      <div class="projects-empty__mark" aria-hidden="true">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="7.25" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <path d="M13 20H27M20 13V27" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>
      <p class="text-label projects-empty__label">Projects</p>
      <h3 class="projects-empty__heading">Work in progress.</h3>
      <p class="text-body projects-empty__body">
        Engineering projects are being documented and will appear here shortly.
        Each entry will include full case studies and technical detail.
      </p>
    </div>
  `;

  return el;
}
