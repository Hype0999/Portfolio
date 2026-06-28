/**
 * data/site.js — Site-wide metadata
 *
 * This file is the single source of truth for:
 * - Site identity
 * - Social links
 * - Contact information
 * - Brand copy
 */

export const site = {
  // Identity
  name: 'Kartikeya Saini',
  nameShort: 'Kartikeya Saini',
  discipline: 'Embedded Systems & Hardware Design',
  tagline: 'Engineering portfolio — documenting my process from raw breadboards to finished circuits.',
  location: 'Earth',

  // Hero — the first thing a visitor reads
  hero: {
    eyebrow: 'Personal Portfolio',
    headline: 'Hi, I am Kartikeya',
    subheadline: 'I am a hardcore hardware guy. I love taking things apart, fixing them, and figuring out exactly how they tick.',
    description:
      'Welcome to my workbench. I’m not a traditional pro code writer—I’m a "vibe coder" who pieces logic together by intuition to make my circuits come alive. My true passion is the physical realm: opening things up, reverse-engineering, and building tangible systems. I document my builds and teardowns under <a href="#monsoon-labs" class="hl-ps5" data-reveal>The Monsoon Labs</a>.',
    cta: {
      label: 'View Projects',
      href: '#projects',
    },
  },

  // Philosophy — woven into identity
  philosophy: {
    statement:
      'The best way to understand a machine is to take it completely apart and put it back together.',
    principles: [
      {
        title: 'Hardware First',
        body: 'Code is just the glue. The real magic happens when traces on a PCB start routing electricity to make physical things move and light up.',
      },
      {
        title: 'Tinkering & Reverse Engineering',
        body: 'If it’s broken, it’s an invitation to open it up. Figuring out how something was originally built is the fastest way to learn how to build it better.',
      },
      {
        title: 'Vibe Coding',
        body: 'I don’t write software like a textbook computer scientist. I write code by feeling, intuition, and trial-and-error until the hardware perfectly responds.',
      },
      {
        title: 'Hands-on Obsession',
        body: 'Theory is fine, but I prefer the smell of solder. I learn by breaking, fixing, and experimenting constantly in the real world.',
      },
    ],
  },

  // Contact
  contact: {
    email: 'TODO: Add Email',
    github: 'https://github.com/themonsoonlabs',
    youtube: 'https://www.youtube.com/@TheMonsoonLabs',
    instagram: 'https://www.instagram.com/themonsoonlabs/?__pwa=1',
  },

  // Social preview
  social: {
    ogTitle: 'Kartikeya Saini — Engineering Portfolio',
    ogDescription: 'Engineering portfolio — precision, craftsmanship, and thoughtful design.',
    ogImage: './og-image.jpg',
    siteUrl: 'https://TODO-USERNAME.github.io',
  },

  // Footer copy
  footer: {
    copyright: `© ${new Date().getFullYear()} Kartikeya Saini`,
    note: 'Projects built and documented under The Monsoon Labs initiative.',
  },
};
