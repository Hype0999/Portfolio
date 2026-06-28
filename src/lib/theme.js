/**
 * lib/theme.js — Design Token Runtime Utilities
 *
 * Reads CSS custom properties at runtime.
 * Useful for passing token values to JavaScript (e.g., Three.js scene colors).
 *
 * This module is the bridge between the CSS token system and any
 * JavaScript that needs visual values — especially the future rendering layer.
 */

/**
 * Read a CSS custom property value from :root at runtime.
 *
 * @param {string} token - Token name including leading '--' (e.g. '--color-accent')
 * @param {Element} [element=document.documentElement] - Element to read from
 * @returns {string} Resolved value, trimmed
 */
export function getToken(token, element = document.documentElement) {
  return getComputedStyle(element).getPropertyValue(token).trim();
}

/**
 * Read multiple tokens at once.
 *
 * @param {string[]} tokens - Array of token names
 * @returns {Object} Map of token name to resolved value
 */
export function getTokens(tokens) {
  return tokens.reduce((acc, token) => {
    acc[token] = getToken(token);
    return acc;
  }, {});
}

/**
 * Convert a CSS hsl() value to a hex string.
 * Useful for passing colors to Canvas/WebGL contexts.
 *
 * @param {string} hslString - e.g. 'hsl(38, 65%, 58%)'
 * @returns {string} Hex color string e.g. '#d4a04a'
 */
export function hslToHex(hslString) {
  // Parse hsl(...) or h s% l% formats
  const match = hslString.match(/[\d.]+/g);
  if (!match || match.length < 3) return '#ffffff';

  let [h, s, l] = match.map(Number);
  s /= 100;
  l /= 100;

  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));

  const toHex = (v) => v.toString(16).padStart(2, '0');
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

/**
 * Get the resolved accent color as a hex value.
 * Convenience method for passing the brand accent to WebGL scenes.
 *
 * @returns {string} Hex color string
 */
export function getAccentHex() {
  return hslToHex(getToken('--color-accent'));
}
