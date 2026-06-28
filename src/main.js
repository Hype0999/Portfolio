/**
 * main.js — Application Entry Point
 * No 3D Scene per user request.
 */

import './styles/main.css';

import { Nav }         from './components/Nav/Nav.js';
import { Hero }        from './components/Hero/Hero.js';
import { Projects }    from './components/Projects/Projects.js';
import { Philosophy }  from './components/Philosophy/Philosophy.js';
import { Skills }      from './components/Skills/Skills.js';
import { Stack }       from './components/Stack/Stack.js';
import { Timeline }    from './components/Timeline/Timeline.js';
import { Awards }      from './components/Awards/Awards.js';
import { MonsoonLabs } from './components/MonsoonLabs/MonsoonLabs.js';
import { Contact }     from './components/Contact/Contact.js';
import { Footer }      from './components/Footer/Footer.js';

import { initRevealObserver, initMobileHoverObserver } from './lib/observer.js';
import { initTiltCards }      from './lib/tilt.js';

function mount() {
  const app = document.getElementById('app');
  if (!app) return;

  // Nav
  app.appendChild(Nav());

  // Main content
  const main = document.createElement('main');
  main.id = 'main-content';
  main.setAttribute('role', 'main');

  const sections = [
    Hero(),
    Philosophy(),
    Skills(),
    Stack(),
    Timeline(),
    Projects(),
    Awards(),
    MonsoonLabs(),
    Contact(),
  ].filter(Boolean);

  sections.forEach((s) => main.appendChild(s));
  app.appendChild(main);
  app.appendChild(Footer());

  // Utilities
  initRevealObserver();
  initMobileHoverObserver();
  initTiltCards();
  initMagneticButtons();
  initTimelineConnector();
  initCursorGlow();
}

// ── Cursor glow (follows mouse) ──────────────────────────────
function initCursorGlow() {
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.setAttribute('aria-hidden', 'true');
  document.body.appendChild(glow);

  let mx = 0, my = 0, gx = 0, gy = 0;

  window.addEventListener('pointermove', (e) => {
    mx = e.clientX; my = e.clientY;
  }, { passive: true });

  const tick = () => {
    gx += (mx - gx) * 0.08;
    gy += (my - gy) * 0.08;
    glow.style.left = `${gx}px`;
    glow.style.top  = `${gy}px`;
    requestAnimationFrame(tick);
  };
  tick();
}

// ── Magnetic buttons ─────────────────────────────────────────
function initMagneticButtons() {
  document.querySelectorAll('.btn-magnetic').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) * 0.25;
      const dy = (e.clientY - r.top  - r.height / 2) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('pointerleave', () => {
      btn.style.transform = '';
    });
  });
}

// ── Timeline connector fill ──────────────────────────────────
function initTimelineConnector() {
  const track = document.querySelector('.timeline__track');
  const fill  = document.querySelector('.timeline__line-fill');
  if (!track || !fill) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const rect = track.getBoundingClientRect();
        // Start filling when the top of the track reaches 60% down the viewport
        const triggerPoint = window.innerHeight * 0.6;
        let progress = (triggerPoint - rect.top) / rect.height;
        progress = Math.max(0, Math.min(1, progress));
        fill.style.height = `${progress * 100}%`;
        
        // Highlight active cards
        const cards = track.querySelectorAll('.timeline__card');
        const vHeight = window.innerHeight;
        cards.forEach(card => {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.top + cardRect.height / 2;
          if (cardCenter > vHeight * 0.3 && cardCenter < vHeight * 0.8) {
            card.classList.add('timeline__card--highlighted');
          } else {
            card.classList.remove('timeline__card--highlighted');
          }
        });

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
