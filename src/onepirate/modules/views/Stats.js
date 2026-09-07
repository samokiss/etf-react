import React, { useEffect, useRef, useState } from 'react';

const QUOTES = [
  {
    text: "« Aider, c'est déjà prier. Chaque service rendu est une main tendue. »",
    author: 'L’esprit d’Exprime Ta Foi',
  },
  {
    text: "« Nous croyons qu'aucun besoin n'est trop petit, et qu'aucune main tendue n'est inutile. »",
    author: 'L’équipe ETF',
  },
  {
    text: "« La solidarité n'a pas d'âge : elle a simplement des bras. »",
    author: 'L’équipe ETF',
  },
];

const STATS = [
  { value: 3, suffix: '', label: 'services gratuits' },
  { value: 100, suffix: '%', label: 'bénévole & sans pub' },
  { value: 10, suffix: ' km', label: 'autour de Clamart & Saint-Cyr' },
];

function useCounter(target, started) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setValue(target);
      return undefined;
    }
    const duration = 1400;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, started]);
  return value;
}

function Stat({ value, suffix, label, started }) {
  const n = useCounter(value, started);
  return (
    <div>
      <div className="stat__num">{n}{suffix}</div>
      <div className="stat__label">{label}</div>
    </div>
  );
}

function Stats() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) {
      setStarted(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      }),
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section stats-band" ref={ref}>
      <div className="container">
        <div className="stats reveal">
          {STATS.map((s) => <Stat key={s.label} {...s} started={started} />)}
        </div>
        <div className="quote reveal">
          <p className="quote__text">{QUOTES[index].text}</p>
          <p className="quote__author">{QUOTES[index].author}</p>
        </div>
      </div>
    </section>
  );
}

export default Stats;
