/**
 * components/Footer/Footer.js
 *
 * Minimal footer — copyright + essential links.
 * Reads from data/site.js
 */

import { site } from '../../data/site.js';
import './Footer.css';

export function Footer() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.setAttribute('role', 'contentinfo');

  footer.innerHTML = `
    <div class="container footer__inner">
      <p class="text-mono footer__copyright">${site.footer.copyright}</p>
      <p class="text-mono footer__note">${site.footer.note}</p>
    </div>
  `;

  return footer;
}
