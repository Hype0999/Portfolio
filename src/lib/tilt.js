/**
 * tilt.js
 *
 * Premium 3D card tilt driven entirely by CSS custom properties.
 * NO JavaScript animation loops — pointer events write to 
 * --tilt-x, --tilt-y, --tilt-glow-x, --tilt-glow-y and CSS does the rest.
 *
 * Apply to any element with the class 'tilt-card'.
 *
 * Philosophy: satisfying hover that feels designed, never gimmicky.
 * Max tilt: 6 degrees — subtle, premium, never toy-like.
 */
export function initTiltCards(container = document) {
  const cards = container.querySelectorAll('.tilt-card');
  const MAX_TILT = 6; // degrees

  cards.forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Normalised [-1, 1]
      const nx = (e.clientX - cx) / (rect.width / 2);
      const ny = (e.clientY - cy) / (rect.height / 2);

      const tiltX = (-ny * MAX_TILT).toFixed(2);
      const tiltY = (nx * MAX_TILT).toFixed(2);

      // Glow position (percentage)
      const gx = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
      const gy = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);

      card.style.setProperty('--tilt-x', `${tiltX}deg`);
      card.style.setProperty('--tilt-y', `${tiltY}deg`);
      card.style.setProperty('--tilt-glow-x', `${gx}%`);
      card.style.setProperty('--tilt-glow-y', `${gy}%`);
      card.classList.remove('tilt-card--reset');
    }, { passive: true });

    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      card.style.setProperty('--tilt-glow-x', '50%');
      card.style.setProperty('--tilt-glow-y', '50%');
      card.classList.add('tilt-card--reset');
    }, { passive: true });
  });
}
