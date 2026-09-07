import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, animationsDisabled } from '../animations';

const FEATURES = [
  {
    emoji: '📖',
    title: 'Lecture guidée & plans',
    text: "Des plans de lecture et des parcours guidés pour faire grandir ta foi chaque jour, à ton rythme, avec des repères clairs.",
  },
  {
    emoji: '🤝',
    title: 'Communauté & partage',
    text: "Échange avec une communauté de jeunes chrétiens : partages, entraide concrète (courses, banque alimentaire, aide aux devoirs) et prière ensemble.",
  },
  {
    emoji: '✨',
    title: 'Versets visuels',
    text: "Crée de magnifiques visuels à partir des versets qui t'inspirent et partage-les directement sur Instagram pour faire rayonner ta foi.",
  },
];

function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || animationsDisabled()) return undefined;

    const slides = section.querySelectorAll('.feature-slide');
    const ctx = gsap.context(() => {
      // Scroll-scrub : le panneau est épinglé, les 3 features se
      // crossfadent + scale en fonction de la progression du scroll.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      });

      slides.forEach((slide, i) => {
        if (i === 0) return;
        tl.fromTo(
          slide,
          { autoAlpha: 0, scale: 0.92, y: 40 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: 'power2.out' },
          i * 2 - 0.5
        );
        tl.to(slide, { autoAlpha: 0, scale: 0.96, y: -30, duration: 1, ease: 'power2.in' }, i * 2 + 1.5);
      });

      // Le téléphone du panneau glisse en parallax pendant le scrub
      tl.fromTo(
        section.querySelectorAll('.feature-slide__media'),
        { rotate: -2 },
        { rotate: 2, duration: slides.length * 2, ease: 'none' },
        0
      );

      // Barre de progression
      tl.fromTo(
        section.querySelector('.features__progress'),
        { scaleY: 0 },
        { scaleY: 1, duration: slides.length * 2, ease: 'none' },
        0
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="features" id="features" ref={sectionRef}>
      <div className="features__pin">
        <div className="features__progress-wrap" aria-hidden="true">
          <div className="features__progress" />
        </div>
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            className={`feature-slide${i > 0 ? ' is-hidden' : ''}`}
            aria-hidden={i > 0}
          >
            <div className="feature-slide__media" aria-hidden="true">{f.emoji}</div>
            <div className="feature-slide__text">
              <div className="feature__emoji">{f.emoji}</div>
              <h3 className="feature__title">{f.title}</h3>
              <p className="feature__text">{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
