/**
 * components/MonsoonLabs/MonsoonLabs.js
 *
 * A dedicated section explaining the personal engineering initiative.
 */

import './MonsoonLabs.css';
import { site } from '../../data/site.js';

export function MonsoonLabs() {
  const section = document.createElement('section');
  section.className = 'monsoon-labs section';
  section.id = 'monsoon-labs';
  section.setAttribute('data-reveal', '');
  section.setAttribute('data-scene', 'monsoon-labs');
  section.setAttribute('data-lighting', 'ambient');
  section.setAttribute('data-camera', 'perspective');
  section.setAttribute('data-animation', 'true');

  section.innerHTML = `
    <div class="container">
      <div class="monsoon-labs__grid">
        <div class="monsoon-labs__content">
          <header class="section-header">
            <h2 class="text-heading-2"><span class="hl-ps5">The Monsoon Labs</span></h2>
            <p class="text-body text-body--large" style="margin-top: var(--space-4);">
              A personal engineering initiative.
            </p>
          </header>
          
          <div class="monsoon-labs__description">
            <p class="text-body">
              This is not a company or a startup. The Monsoon Labs is my personal engineering initiative—the name I give to my workbench where my hardware experiments and complete engineering projects live.
            </p>
            <p class="text-body">
              Engineering projects and source code will gradually be published through The Monsoon Labs GitHub as they mature. In the future, I plan to open-source my board designs and write detailed documentation to help others build upon my work.
            </p>
          </div>
          
          <div class="monsoon-labs__github-btn" style="margin-top: var(--space-8);">
            <a href="${site.contact.github}" target="_blank" rel="noopener noreferrer" class="contact-link">
              <div class="contact-link__content">
                <div class="contact-link__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke-linejoin="round" stroke-linecap="round"/>
                  </svg>
                </div>
                <div class="contact-link__inner">
                  <span class="contact-link__label">Code & Schematics</span>
                  <span class="contact-link__value">GitHub Repository</span>
                </div>
              </div>
              <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
                <span class="contact-link__arrow" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
                <span class="text-mono" style="color: var(--color-amber); font-size: 0.65rem; letter-spacing: 0.1em; display: flex; align-items: center; gap: 6px;">
                  <span style="width: 6px; height: 6px; background: var(--color-amber); border-radius: 50%; box-shadow: 0 0 8px var(--color-glow-amber); animation: pulse-glow 2s infinite;"></span>
                  PREPARING RELEASE
                </span>
              </div>
            </a>
          </div>
        </div>
        
        <div class="monsoon-labs__visual liquid-glass liquid-glass-lift tilt-card gradient-border" data-tilt>
          <img src="/assets/monsoon-labs.jpg" alt="Monsoon Labs Logo" class="monsoon-labs__img" style="width: 100%; height: 100%; object-fit: cover; display: block; z-index: 2; transition: transform 0.4s ease-out;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          <div class="monsoon-labs__placeholder-art" style="display: none;">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-linejoin="round" stroke-linecap="round"/>
            </svg>
            <span class="text-mono" style="color: var(--color-accent); margin-top: var(--space-4);">[ ML_SYS_INIT ]</span>
          </div>
        </div>
      </div>
    </div>
  `;

  return section;
}
