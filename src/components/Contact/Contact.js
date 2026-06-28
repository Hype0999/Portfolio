/**
 * components/Contact/Contact.js
 *
 * Clean contact section — links only.
 * No form (static site / GitHub Pages — no backend).
 * Future: can add Formspree or similar if a form endpoint is desired.
 *
 * Reads from data/site.js
 */

import { site } from '../../data/site.js';
import './Contact.css';

export function Contact() {
  const section = document.createElement('section');
  section.className = 'contact section';
  section.id = 'contact';
  section.setAttribute('aria-label', 'Contact information');

  const { email, github, youtube, instagram } = site.contact;

  const links = [
    github && {
      label: 'Open Source',
      value: 'GitHub',
      href: github,
      external: true,
      color: '#ffffff',
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="#FFFFFF"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>`
    },
    youtube && {
      label: 'Video Logs',
      value: 'YouTube',
      href: youtube,
      external: true,
      color: '#ff0000',
      icon: `<svg width="28" height="28" viewBox="0 0 24 24"><path d="M21.58 6.42A2.78 2.78 0 0 0 19.63 4.4C17.9 3.94 12 3.94 12 3.94s-5.9 0-7.63.46A2.78 2.78 0 0 0 2.42 6.42C2 8.15 2 12 2 12s0 3.85.42 5.58a2.78 2.78 0 0 0 1.95 2.02c1.73.46 7.63.46 7.63.46s5.9 0 7.63-.46a2.78 2.78 0 0 0 1.95-2.02C22 15.85 22 12 22 12s0-3.85-.42-5.58z" fill="#FF0000" /><path d="M10 15l6-3-6-3v6z" fill="#FFFFFF" /></svg>`
    },
    instagram && {
      label: 'Behind the Scenes',
      value: 'Instagram',
      href: instagram,
      external: true,
      color: '#E1306C',
      icon: `<svg width="28" height="28" viewBox="0 0 24 24"><defs><linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#fee411" /><stop offset="10%" stop-color="#fedb16" /><stop offset="25%" stop-color="#fec125" /><stop offset="40%" stop-color="#fe983d" /><stop offset="55%" stop-color="#fe5f5e" /><stop offset="70%" stop-color="#e33b95" /><stop offset="85%" stop-color="#c42baf" /><stop offset="100%" stop-color="#a41ebf" /></linearGradient></defs><rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig-gradient)" /><path d="M12 7.75A4.25 4.25 0 1 0 16.25 12 4.25 4.25 0 0 0 12 7.75zm0 7.2A2.95 2.95 0 1 1 14.95 12 2.95 2.95 0 0 1 12 14.95z" fill="#fff" /><circle cx="16.5" cy="7.5" r="1.15" fill="#fff" /><path d="M16 5.5H8a2.5 2.5 0 0 0-2.5 2.5v8A2.5 2.5 0 0 0 8 18.5h8A2.5 2.5 0 0 0 18.5 16V8A2.5 2.5 0 0 0 16 5.5zM17.2 16A1.2 1.2 0 0 1 16 17.2H8A1.2 1.2 0 0 1 6.8 16V8A1.2 1.2 0 0 1 8 6.8h8A1.2 1.2 0 0 1 17.2 8z" fill="#fff" /></svg>`
    },
  ]
    .filter(Boolean)
    .map(
      (link, i) => `
    <a
      href="${link.href}"
      class="contact-link liquid-glass liquid-glass-lift tilt-card gradient-border"
      data-tilt
      data-reveal
      data-reveal-delay="${i + 1}"
      ${link.external ? 'target="_blank" rel="noopener noreferrer"' : ''}
      aria-label="${link.label}: ${link.value}"
      style="--brand-color: ${link.color};"
    >
      <div class="contact-link__content">
        <div class="contact-link__icon">
          ${link.icon}
        </div>
        <div class="contact-link__inner">
          <span class="text-label contact-link__label">${link.label}</span>
          <span class="contact-link__value">${link.value}</span>
        </div>
      </div>
      <svg class="contact-link__arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 16L16 4M16 4H7M16 4V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </a>
  `
    )
    .join('');

  section.innerHTML = `
    <div class="container">
      <div class="contact__inner">
        <header class="contact__header" data-reveal>
          <span class="text-label-accent section-header__label">Contact</span>
          <h2 class="contact__statement hl-gradient">
            Let's build<br>something.
          </h2>
          <p class="contact__intro text-body">
            Open to interesting engineering problems, collaborations,
            and conversations about the work.
          </p>
        </header>

        <div class="contact__links">
          ${links}
        </div>
      </div>
    </div>
  `;

  return section;
}
