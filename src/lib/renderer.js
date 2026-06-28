/**
 * lib/renderer.js — DOM Rendering Helpers
 *
 * Lightweight utilities for creating and populating DOM elements.
 * These keep component code readable without introducing a framework.
 *
 * All functions are pure: they receive data, return DOM nodes.
 * They never read from or write to global state.
 */

/**
 * Create a DOM element with optional properties.
 *
 * @param {string} tag - HTML tag name
 * @param {Object} [props] - Properties to assign
 * @param {string} [props.className] - CSS class string
 * @param {string} [props.id] - Element ID
 * @param {Object} [props.dataset] - data-* attributes
 * @param {Object} [props.attrs] - Any other HTML attributes
 * @param {string|Element|Element[]} [props.children] - Child content
 * @returns {HTMLElement}
 */
export function el(tag, props = {}) {
  const element = document.createElement(tag);

  const { className, id, dataset, attrs, children, ...rest } = props;

  if (className) element.className = className;
  if (id) element.id = id;

  if (dataset) {
    Object.entries(dataset).forEach(([key, value]) => {
      element.dataset[key] = value;
    });
  }

  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  // Append children
  if (children) {
    const items = Array.isArray(children) ? children : [children];
    items.forEach((child) => {
      if (child === null || child === undefined) return;
      if (typeof child === 'string') {
        element.insertAdjacentHTML('beforeend', child);
      } else {
        element.appendChild(child);
      }
    });
  }

  return element;
}

/**
 * Render a list of items using a render function.
 * Returns a DocumentFragment for efficient DOM insertion.
 *
 * @param {Array} items - Array of data objects
 * @param {Function} renderFn - Function(item, index) => Element
 * @returns {DocumentFragment}
 */
export function renderList(items, renderFn) {
  const fragment = document.createDocumentFragment();
  items.forEach((item, index) => {
    const rendered = renderFn(item, index);
    if (rendered) fragment.appendChild(rendered);
  });
  return fragment;
}

/**
 * Clear all children of an element.
 *
 * @param {Element} element
 */
export function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Safely set innerHTML (for trusted static content only).
 * Never use this with user-supplied input.
 *
 * @param {Element} element
 * @param {string} html - Trusted HTML string
 */
export function setHTML(element, html) {
  element.innerHTML = html;
}
