import React, { useEffect, useRef } from 'react';
import './styles.css';
import { gsap, animationsDisabled } from './modules/animations';
import Nav from './modules/views/Nav';
import Hero from './modules/views/Hero';
import ValueProp from './modules/views/ValueProp';
import Features from './modules/views/Features';
import Services from './modules/views/Services';
import Values from './modules/views/Values';
import Team from './modules/views/Team';
import Stats from './modules/views/Stats';
import HowItWorks from './modules/views/HowItWorks';
import ContactForm from './modules/views/ContactForm';
import AppFooter from './modules/views/AppFooter';

function Index() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || animationsDisabled()) return undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: Number(el.dataset.delay || 0) * 0.12,
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <Nav />
      <Hero />
      <ValueProp />
      <Features />
      <Services />
      <Values />
      <Team />
      <Stats />
      <HowItWorks />
      <ContactForm />
      <AppFooter />
    </div>
  );
}

export default Index;
