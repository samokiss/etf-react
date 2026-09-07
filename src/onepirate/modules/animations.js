import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * true si on doit désactiver les animations :
 * - prefers-reduced-motion (accessibilité)
 * - prerender react-snap (HeadlessChrome) : le HTML statique capturé
 *   doit rester pleinement visible (fallback sans JS).
 */
export function animationsDisabled() {
  if (typeof window === 'undefined') return true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  return /HeadlessChrome/.test(window.navigator.userAgent);
}

export { gsap, ScrollTrigger };
