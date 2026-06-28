/**
 * lib/observer.js — IntersectionObserver Factory
 *
 * Drives the scroll reveal system. Observes all elements with [data-reveal]
 * and adds 'is-revealed' when they enter the viewport.
 *
 * CSS in animations.css handles the actual animation — this module only
 * manages the class toggle.
 *
 * Usage:
 *   import { initRevealObserver } from '../lib/observer.js';
 *   initRevealObserver(); // call once in main.js after DOM is ready
 */

/**
 * Initialise the reveal observer.
 * Observes all [data-reveal] elements currently in the DOM.
 * Call again after dynamically adding elements to the page.
 *
 * @param {string} [selector='[data-reveal]'] - CSS selector to observe
 * @param {number} [threshold=0.12] - Visibility fraction before triggering
 */
export function initRevealObserver(selector = '[data-reveal]', threshold = 0.12) {
  // Graceful degradation: if IntersectionObserver isn't available, reveal all
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add('is-revealed');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          // Unobserve after reveal — no need to watch further
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold,
      rootMargin: '0px 0px -5% 0px', // Trigger slightly before fully in view
    }
  );

  document.querySelectorAll(selector).forEach((el) => {
    observer.observe(el);
  });

  return observer;
}

/**
 * Observe a specific element immediately (useful for dynamically added content).
 *
 * @param {Element} element - DOM element to observe
 * @param {Function} [onReveal] - Optional callback when element is revealed
 */
export function observeElement(element, onReveal) {
  if (!('IntersectionObserver' in window)) {
    element.classList.add('is-revealed');
    onReveal?.(element);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          onReveal?.(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
  );

  observer.observe(element);
  return observer;
}

/**
 * Initialise mobile auto-hover observer.
 * Observes elements and toggles 'is-mobile-hover' class when they enter/leave 
 * the center of the viewport, intended for touch devices where hover isn't possible.
 */
export function initMobileHoverObserver(selector = '.project-card, .award-item, .contact-link, .philosophy__tile') {
  // Only apply this logic on devices that do not support hover (mobile/touch)
  if (!window.matchMedia('(hover: none)').matches) return;

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-mobile-hover');
        } else {
          entry.target.classList.remove('is-mobile-hover');
        }
      });
    },
    {
      // Trigger when the element hits the absolute center of the viewport
      // This forces the animation to happen directly in front of the user's eyes
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    }
  );

  document.querySelectorAll(selector).forEach((el) => {
    observer.observe(el);
  });

  return observer;
}
