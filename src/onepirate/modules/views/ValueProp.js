import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, animationsDisabled } from '../animations';

const WORDS = [
  'La', 'foi', 'se', 'vit', 'ensemble,', 'partagée',
  'et', 'mise', 'au', 'service', 'des', 'autres.',
];

function ValueProp() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || animationsDisabled()) return undefined;

    const ctx = gsap.context(() => {
      // Scrub façon Apple : chaque mot s'allume progressivement
      // au fil du scroll, puis la phrase entière s'estompe en sortant.
      gsap.fromTo(
        el.querySelectorAll('.w'),
        { opacity: 0.12, y: 0 },
        {
          opacity: 1,
          stagger: 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            end: 'top 15%',
            scrub: 0.5,
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="value" ref={ref}>
      <div className="container">
        <p className="value__line">
          {WORDS.map((w, i) => (
            <span key={i} className={`w${i === WORDS.length - 1 ? ' w--accent' : ''}`}>
              {w}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

export default ValueProp;
