import React from 'react';
import './styles.css';
import useReveal from './modules/useReveal';
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
  const rootRef = useReveal();
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
