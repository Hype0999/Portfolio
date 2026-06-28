/**
 * components/Projects/ProjectCard.js — Magazine-style card
 *
 * Apple.com-inspired project cards:
 * - Large project number (01, 02...)
 * - Liquid glass surface with tilt effect
 * - Gradient border on hover (gradient-border class)
 * - Bold title, category label, tags, CTA link
 */

export function ProjectCard(project, index = 0) {
  const isLocked  = project.visibility === 'private';
  const num       = String((index || 0) + 1).padStart(2, '0');

  const article = document.createElement('article');
  article.className = [
    'project-card',
    'liquid-glass',
    'tilt-card',
    'gradient-border',
    project.featured ? 'project-card--featured' : '',
    isLocked        ? 'project-card--locked' : '',
  ].filter(Boolean).join(' ');
  article.setAttribute('data-reveal', 'scale');
  article.setAttribute('data-reveal-delay', String((index % 4) + 1));

  const tags = (project.tags || [])
    .slice(0, 4)
    .map((tag) => `<span class="project-card__tag">${tag}</span>`)
    .join('');

  const linkAttr = project.caseStudyUrl
    ? `href="${project.caseStudyUrl}"`
    : project.externalUrl
    ? `href="${project.externalUrl}" target="_blank" rel="noopener noreferrer"`
    : '';

  article.innerHTML = `
    <!-- Project number — editorial accent -->
    <div class="project-card__num" aria-hidden="true">${num}</div>

    <!-- Thumbnail -->
    <div class="project-card__thumb">
      ${project.thumbnail
        ? `<img src="${project.thumbnail}" alt="${project.title} thumbnail" loading="lazy" class="project-card__img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
           <div class="project-card__thumb-placeholder" aria-hidden="true" style="display: none; align-items: center; justify-content: center; width: 100%; height: 100%; background: var(--color-surface-0);">
             <span style="font-family: var(--font-display); font-size: 8rem; font-weight: 900; color: var(--color-text-primary); opacity: 0.03; user-select: none;">${num}</span>
           </div>`
        : `<div class="project-card__thumb-placeholder" aria-hidden="true" style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; background: var(--color-surface-0);">
             <span style="font-family: var(--font-display); font-size: 8rem; font-weight: 900; color: var(--color-text-primary); opacity: 0.03; user-select: none;">${num}</span>
           </div>`}
      ${isLocked ? `<div class="project-card__lock">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="3" y="7" width="10" height="8" rx="2" stroke="currentColor" stroke-width="1.2"/>
          <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
        </svg>
      </div>` : ''}
    </div>

    <!-- Body -->
    <div class="project-card__body">

      <!-- Meta -->
      <div class="project-card__meta">
        <span class="project-card__category text-label-accent">${project.category}</span>
        <span class="project-card__year text-caption">${project.year}</span>
      </div>

      <!-- Title -->
      <h3 class="project-card__title ${isLocked ? 'project-card__title--blur' : ''}">
        ${isLocked ? 'Confidential' : project.title}
      </h3>

      <!-- Tagline -->
      <p class="project-card__tagline text-body-sm ${isLocked ? 'project-card__tagline--blur' : ''}">
        ${isLocked ? 'Details not publicly available.' : (project.tagline || '')}
      </p>

      <!-- Tags -->
      ${tags ? `<div class="project-card__tags">${tags}</div>` : ''}

      <!-- Footer -->
      <div class="project-card__footer">
        <span class="project-card__status project-card__status--${project.status}">
          <span class="project-card__status-dot"></span>
          ${{ completed: 'Completed', ongoing: 'Ongoing', archived: 'Archived' }[project.status] || project.status}
        </span>
        ${!isLocked && linkAttr
          ? `<a ${linkAttr} class="project-card__link" aria-label="View ${project.title}">
               Case Study
               <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                 <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
               </svg>
             </a>`
          : ''}
      </div>
    </div>
  `;

  return article;
}
