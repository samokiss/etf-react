import React from 'react';

const STEPS = [
  {
    icon: '/images/icon_coordonnee.png',
    title: '1. Exprimez votre besoin',
    text: "Vous exprimez votre besoin ou renseignez ce que vous souhaitez donner en prenant contact avec nous via le formulaire ci-dessous afin d'être recontacté.",
  },
  {
    icon: '/images/icon_plan.png',
    title: '2. Nous étudions',
    text: "Nous étudions la faisabilité de votre projet et vous recontactons afin de vous faire part des modalités d'exécution du service. Pour les dons alimentaires, votre promesse de don est enregistrée jusqu'à ce qu'un preneur se manifeste.",
  },
  {
    icon: '/images/icon_help.png',
    title: '3. Nous agissons',
    text: 'Nous planifions ensemble un rendez-vous (avec le bénévole le plus proche de chez vous). Nous sommes votre interlocuteur unique, toutes les demandes sont centralisées par notre équipe.',
  },
];

function HowItWorks() {
  return (
    <section className="section section--tint" id="comment">
      <div className="container">
        <h2 className="section__title reveal">Comment ça marche ?</h2>
        <p className="section__sub reveal">Trois étapes simples, une équipe dédiée.</p>
        <div className="cards">
          {STEPS.map((s, i) => (
            <div key={s.title} className="card reveal" data-delay={String(i)}>
              <img src={s.icon} alt="" style={{ height: 64 }} />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
