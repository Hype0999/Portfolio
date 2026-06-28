/**
 * Hero.js — Apple-Grade Editorial Hero (No 3D)
 */

import { site } from '../../data/site.js';
import './Hero.css';

export function Hero() {
  const section = document.createElement('section');
  section.className = 'hero';
  section.id = 'hero';
  section.setAttribute('aria-label', 'Introduction');

  section.innerHTML = `
    <!-- Ambient CSS Blobs -->
    <div class="hero__blob hero__blob--violet" aria-hidden="true"></div>
    <div class="hero__blob hero__blob--amber" aria-hidden="true"></div>
    
    <div class="hero__grid" aria-hidden="true"></div>

    <div class="hero__content">
      
      <div class="hero__meta animate-fade-up stagger-1">
        <span class="hero__meta-dot"></span>
        <span>Class XI</span>
      </div>

      <h1 class="hero__headline animate-fade-up stagger-2">
        Hi, I'm<br>
        <span class="hl-gradient">Kartikeya.</span>
      </h1>

      <p class="hero__desc animate-fade-up stagger-3">
        I build <span class="hl-inline">embedded systems</span> & turn raw curiosity 
        into <span class="hl-inline">physical, working hardware.</span>
      </p>
      
      <p class="hero__desc-small animate-fade-up stagger-4">
        What started as Arduino experiments evolved into designing complete 
        electronic systems — schematic to PCB. I document everything under 
        <span class="hl-underline">Monsoon Labs</span>.
      </p>

      <div class="hero__stats animate-fade-up stagger-5">
        <div class="hero__stat-box liquid-glass liquid-glass-lift tilt-card" data-tilt>
          <span class="hero__stat-val" style="font-size: 1.8rem;">Many</span>
          <span class="hero__stat-label">Projects</span>
        </div>
        <div class="hero__stat-box liquid-glass liquid-glass-lift tilt-card" data-tilt>
          <span class="hero__stat-val">4</span>
          <span class="hero__stat-label">Years</span>
        </div>
        <div class="hero__stat-box liquid-glass liquid-glass-lift tilt-card" data-tilt>
          <span class="hero__stat-val">∞</span>
          <span class="hero__stat-label">Curiosity</span>
        </div>
      </div>

      <div class="hero__actions animate-fade-up stagger-6">
        <a href="#projects" class="hero__btn hero__btn--primary btn-magnetic" id="hero-cta-projects">
          View Projects
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a href="${site.contact.github}" class="hero__btn hero__btn--ghost btn-magnetic" target="_blank" rel="noopener">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
          GitHub
        </a>
      </div>

    </div>
    
    <div class="hero__scroll"></div>
  `;

  return section;
}
