import React from 'react';

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
    flip: true,
  },
];

function Features() {
  return (
    <section className="section section--tint" id="features">
      <div className="container">
        <h2 className="section__title reveal">Pensé pour ta vie de tous les jours</h2>
        <p className="section__sub reveal">
          Trois façons simples de faire entrer la foi dans ton quotidien.
        </p>
        {FEATURES.map((f) => (
          <div key={f.title} className={`feature reveal${f.flip ? ' feature--flip' : ''}`}>
            <div className="feature__media" aria-hidden="true">{f.emoji}</div>
            <div>
              <div className="feature__emoji" aria-hidden="true">{f.emoji}</div>
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
