import { useEffect, useRef } from 'react';

/**
 * Attache un IntersectionObserver qui ajoute la classe `is-visible`
 * aux éléments portant .reveal / .value__line dès qu'ils entrent dans
 * le viewport. Fallback : sans IntersectionObserver, tout est visible.
 */
export default function useReveal() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const targets = root.querySelectorAll('.reveal, .value__line');
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return rootRef;
}
