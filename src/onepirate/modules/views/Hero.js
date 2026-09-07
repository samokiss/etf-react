import React, { useEffect, useRef, useState } from 'react';

const VERSE = '« Je puis tout par celui qui me fortifie. »';
const VERSE_REF = 'Philippiens 4:13';

function Hero() {
  const [typed, setTyped] = useState('');
  const phoneRef = useRef(null);
  const rafRef = useRef(null);

  // Typing effect (désactivé si prefers-reduced-motion)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
        <div>
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
