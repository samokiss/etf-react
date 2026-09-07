import React from 'react';

const SERVICES = [
  {
    img: '/images/illu_courses.png',
    title: 'Faire les courses',
    text: 'Nous vous proposons de faire les courses pour vous dans un rayon de 10km.',
  },
  {
    img: '/images/illu_food.png',
    title: 'Banque alimentaire',
    text: 'Nous mettons en relation des particuliers qui souhaitent effectuer des dons alimentaires avec les personnes qui en ont besoin.',
  },
  {
    img: '/images/illu_help.png',
    title: 'Aide aux devoirs',
    text: 'Nous vous proposons de soutenir les élèves de primaire et collège à faire leurs devoirs en ligne.',
  },
];

function Services() {
  return (
    <section className="section section--alt" id="services">
      <div className="container">
        <h2 className="section__title reveal">Des services concrets</h2>
        <p className="section__sub reveal">
          Parce que la foi se traduit en actes, nous sommes là pour vous aider au quotidien.
        </p>
        <div className="cards">
          {SERVICES.map((s, i) => (
            <div key={s.title} className="card reveal" data-delay={String(i)}>
              <img src={s.img} alt="" />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
