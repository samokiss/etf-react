import React, { useEffect, useRef, useState } from 'react';
import { gsap, animationsDisabled } from '../animations';

const VERSE = '« Je puis tout par celui qui me fortifie. »';
const VERSE_REF = 'Philippiens 4:13';

function Hero() {
  const [typed, setTyped] = useState('');
  const textRef = useRef(null);
  const phoneRef = useRef(null);
  const rafRef = useRef(null);

  // Entrée cinématique du hero (timeline GSAP)
  useEffect(() => {
    if (animationsDisabled()) return undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero__badge', { autoAlpha: 0, y: 20, duration: 0.6 })
        .from('.hero__title', { autoAlpha: 0, y: 44, duration: 0.9 }, '-=0.25')
        .from('.hero__sub', { autoAlpha: 0, y: 30, duration: 0.7 }, '-=0.5')
        .from('.hero__ctas .btn', { autoAlpha: 0, y: 24, duration: 0.6, stagger: 0.12 }, '-=0.4')
        .from('.hero__phone', { autoAlpha: 0, y: 90, scale: 0.9, rotateY: -18, duration: 1.1, clearProps: 'transform' }, 0.4);
    });
    return () => ctx.revert();
  }, []);

  // Typing effect (désactivé si prefers-reduced-motion)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || /HeadlessChrome/.test(window.navigator.userAgent);
    if (reduced) {
      setTyped(VERSE);
      return undefined;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(VERSE.slice(0, i));
      if (i >= VERSE.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, []);

  // Parallax léger sur le téléphone (transform uniquement, 60fps)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !phoneRef.current) return undefined;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 800);
        phoneRef.current.style.transform = `translateY(${y * -0.08}px)`;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <header className="hero" id="top">
      <div className="hero__inner">
        <div ref={textRef}>
          <span className="hero__badge">Gratuit · Sans pub</span>
          <h1 className="hero__title">
            Exprime <em>ta foi.</em>
            <br />
            Transforme des vies.
          </h1>
          <p className="hero__sub">
            Une plateforme créée par des jeunes chrétiens pour venir en aide à
            ceux qui en ont réellement besoin.
          </p>
          <div className="hero__ctas">
            <a href="#contact" className="btn btn--primary">Rejoindre le mouvement</a>
            <a href="#features" className="btn btn--ghost">Découvrir</a>
          </div>
        </div>
        <div className="hero__phone-wrap">
          <div className="hero__phone" ref={phoneRef}>
            <div className="hero__phone-notch" />
            <div className="hero__verse-label">Verset du jour</div>
            <p className="hero__verse">
              {typed}
              <span className="hero__verse-cursor" />
            </p>
            <div className="hero__verse-ref">{typed.length >= VERSE.length ? VERSE_REF : ''}</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Hero;
