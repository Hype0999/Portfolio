/**
 * data/nav.js — Navigation Link Definitions
 *
 * Drives the Nav component. To add or reorder links, edit this file only.
 * The Nav component reads this array and renders automatically.
 *
 * FIELD REFERENCE:
 *   label  — Display text
 *   href   — Anchor link (#section-id) or external URL
 *   type   — 'internal' | 'external'
 */

export const navLinks = [
  { label: 'Projects', href: '#projects', type: 'internal' },
  { label: 'Timeline', href: '#timeline', type: 'internal' },
  { label: 'Philosophy', href: '#philosophy', type: 'internal' },
  { label: 'Stack', href: '#stack', type: 'internal' },
  { label: 'Monsoon Labs', href: '#monsoon-labs', type: 'internal' },
  { label: 'Contact', href: '#contact', type: 'internal' },
];
