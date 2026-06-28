/**
 * components/CaseStudy/CaseStudy.js
 *
 * Renders a full engineering case study for a project.
 * Adheres to Book I architecture and design system.
 */

import './CaseStudy.css';

function renderListSection(title, items) {
  if (!items || items.length === 0) return '';
  return `
    <div class="case-study__section" data-reveal>
      <h3 class="case-study__section-title">${title}</h3>
      <ul class="case-study__list" role="list">
        ${items.map(item => `<li class="case-study__list-item">${item}</li>`).join('')}
      </ul>
    </div>
  `;
}

function renderTextSection(title, text) {
  if (!text) return '';
  return `
    <div class="case-study__section" data-reveal>
      <h3 class="case-study__section-title">${title}</h3>
      <p class="case-study__text">${text}</p>
    </div>
  `;
}

function renderSpecSheet(specSheet) {
  if (!specSheet) return '';
  const items = Object.entries(specSheet).map(([key, value]) => {
    const label = key.replace(/([A-Z])/g, ' $1').trim();
    return `
      <div class="case-study__spec-item">
        <span class="case-study__spec-label">${label}</span>
        <span class="case-study__spec-value">${value}</span>
      </div>
    `;
  }).join('');

  return `
    <div class="case-study__section" data-reveal>
      <h3 class="case-study__section-title">Engineering Overview</h3>
      <div class="case-study__spec-sheet">
        ${items}
      </div>
    </div>
  `;
}

function renderArchitectureDiagram(diagram) {
  if (!diagram || diagram.length === 0) return '';
  
  const nodes = diagram.map((node, index) => {
    const isLast = index === diagram.length - 1;
    return `
      <span class="case-study__arch-node">${node}</span>
      ${!isLast ? `<span class="case-study__arch-arrow" aria-hidden="true">→</span>` : ''}
    `;
  }).join('');

  return `
    <div class="case-study__section" data-reveal>
      <h3 class="case-study__section-title">System Architecture</h3>
      <div class="case-study__architecture">
        ${nodes}
      </div>
    </div>
  `;
}

function renderMediaGallery(media) {
  if (!media) return '';
  
  const allMedia = [
    media.heroImage,
    ...(media.gallery || []),
    ...(media.breadboardImages || []),
    ...(media.pcbRenders || []),
    ...(media.cadRenders || []),
    ...(media.testingImages || []),
    ...(media.finishedProductImages || []),
    ...(media.videos || [])
  ].filter(Boolean);

  if (allMedia.length === 0) return '';

  return `
    <div class="case-study__media" data-reveal>
      ${allMedia.map(src => `<div class="case-study__media-item"><img src="${src}" alt="Project media" loading="lazy"></div>`).join('')}
    </div>
  `;
}

export function CaseStudy(project) {
  const section = document.createElement('section');
  section.className = 'case-study section';
  
  const cs = project.caseStudy || {};
  
  const tags = (project.tags || [])
    .map(tag => `<span class="tag">${tag}</span>`)
    .join('');

  section.innerHTML = `
    <div class="container" data-scene="case-study" data-lighting="ambient" data-camera="perspective" data-animation="true">
      <header class="case-study__header" data-reveal>
        <div class="case-study__meta">
          <span class="text-label">${project.category}</span>
          <span class="text-mono case-study__year">${project.year}</span>
        </div>
        <h1 class="text-hero case-study__title">${project.title}</h1>
        <p class="case-study__tagline">${project.tagline}</p>
        <div class="case-study__tags">${tags}</div>
      </header>

      <div class="case-study__content">
        <div class="case-study__main-col">
          ${renderSpecSheet(cs.specSheet)}
          ${renderArchitectureDiagram(cs.architectureDiagram)}
          ${renderTextSection('Problem', cs.problem)}
          ${renderTextSection('Why existing solutions were insufficient', cs.why_insufficient)}
          ${renderTextSection('Design decisions', cs.design_decisions)}
          ${renderTextSection('Prototype evolution', cs.prototype_evolution)}
          ${renderTextSection('Hardware architecture', cs.hardware_architecture)}
          ${renderTextSection('Firmware architecture', cs.firmware_architecture)}
          ${renderTextSection('Engineering challenges', cs.challenges)}
          ${renderTextSection('Testing process', cs.testing)}
          ${renderTextSection('Final implementation', cs.final_implementation)}
          ${renderTextSection('Lessons learned', cs.learned)}
          ${renderTextSection('Future roadmap', cs.future)}
          ${renderListSection('Recognition', cs.awards)}
        </div>
        
        <aside class="case-study__side-col">
          ${renderListSection('Hardware', cs.hardware)}
          ${renderListSection('Software', cs.software)}
        </aside>
      </div>

      ${renderMediaGallery(cs.media)}
    </div>
  `;

  return section;
}
