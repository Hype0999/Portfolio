/**
 * components/Nav/Nav.js — Apple Pill Navigation
 *
 * Centered pill nav, liquid glass, active link indicator.
 * Appears/fades after 80px scroll. Mobile: bottom-sheet.
 */

import { site } from '../../data/site.js';
import { navLinks } from '../../data/nav.js';
import './Nav.css';

export function Nav() {
  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.id = 'nav';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Primary navigation');

  const isSubpage  = window.location.pathname.includes('case-study');
  const basePath   = isSubpage ? 'index.html' : '';
  const resolveHref = (href) => href.startsWith('#') ? `${basePath}${href}` : href;
  const wordmarkHref = isSubpage ? 'index.html' : '#';

  nav.innerHTML = `
    <div class="nav__inner">

      <!-- Wordmark -->
      <a href="${wordmarkHref}" class="nav__wordmark" aria-label="Back to top" id="nav-wordmark">
        <span class="nav__wordmark-k">K</span>
        <span class="nav__wordmark-rest">artikeya</span>
      </a>

      <!-- Pill nav container -->
      <div class="nav__pill liquid-glass" id="nav-pill">
        <ul class="nav__links" role="list" id="nav-links">
          ${navLinks
            .map(
              (link, i) => `
            <li>
              <a
                href="${resolveHref(link.href)}"
                class="nav__link"
                id="nav-link-${i}"
                ${link.type === 'external' ? 'target="_blank" rel="noopener noreferrer"' : ''}
              >
                ${link.label}
              </a>
            </li>
          `
            )
            .join('')}
        </ul>
      </div>

      <!-- Right actions -->
      <div class="nav__actions">
        <a href="${site.contact.github}" class="nav__action-btn liquid-glass" target="_blank" rel="noopener" aria-label="GitHub" id="nav-github">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
        </a>

        <!-- Mobile menu toggle -->
        <button
          class="nav__menu-btn"
          id="nav-menu-btn"
          aria-expanded="false"
          aria-controls="nav-mobile-sheet"
          aria-label="Toggle navigation"
        >
          <span class="nav__burger" aria-hidden="true">
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

    </div>

    <!-- Mobile sheet -->
    <div class="nav__mobile-sheet liquid-glass" id="nav-mobile-sheet" aria-hidden="true">
      <ul class="nav__mobile-links" role="list">
        ${navLinks
          .map(
            (link) => `
          <li>
            <a
              href="${resolveHref(link.href)}"
              class="nav__mobile-link"
              ${link.type === 'external' ? 'target="_blank" rel="noopener noreferrer"' : ''}
            >
              ${link.label}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </li>
        `
          )
          .join('')}
      </ul>
    </div>
  `;

  // Scroll behaviour — show/hide nav + active link highlight
  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY > 80;
        nav.classList.toggle('nav--visible', scrolled);
        nav.classList.toggle('nav--scrolled', scrolled);

        // Active link detection
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach((s) => {
          if (window.scrollY >= s.offsetTop - 160) current = s.id;
        });
        nav.querySelectorAll('.nav__link').forEach((link) => {
          const href = link.getAttribute('href');
          link.classList.toggle('nav__link--active', href === `#${current}`);
        });

        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile sheet toggle
  const menuBtn = nav.querySelector('#nav-menu-btn');
  const sheet   = nav.querySelector('#nav-mobile-sheet');

  menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!isOpen));
    sheet.setAttribute('aria-hidden', String(isOpen));
    nav.classList.toggle('nav--sheet-open', !isOpen);
  });

  sheet.querySelectorAll('.nav__mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      menuBtn.setAttribute('aria-expanded', 'false');
      sheet.setAttribute('aria-hidden', 'true');
      nav.classList.remove('nav--sheet-open');
    });
  });

  return nav;
}
