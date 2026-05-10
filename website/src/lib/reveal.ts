/**
 * reveal.ts — tiny IntersectionObserver that toggles `data-in="true"`
 * on any element with `data-reveal`.
 *
 * Pair with the CSS in global.css ([data-reveal] { opacity:0; ... }).
 * Use `style="--reveal-delay: 100ms"` to stagger sibling elements.
 *
 * Respects `prefers-reduced-motion` — if reduced, immediately marks every
 * element as `data-in="true"` (no transition since CSS is collapsed too).
 */
export function initReveal(root: ParentNode = document) {
  const els = root.querySelectorAll<HTMLElement>('[data-reveal]:not([data-in])');
  if (!els.length) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach((el) => (el.dataset.in = 'true'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.in = 'true';
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
  );

  els.forEach((el) => io.observe(el));
}

// Auto-init when imported as a module-script.
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initReveal());
  } else {
    initReveal();
  }
}
