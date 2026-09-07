import React from 'react';

const TEAM = [
  {
    img: '/images/IMG_5522.JPG',
    name: 'Samuel Gomis',
    role: 'Fondateur',
    bio: "Visionnaire du concept d'ETF©, je suis un homme engagé dans différents milieux, pourvu d'une grande sensibilité envers ceux qui sont dans le besoin.",
  },
  {
    img: '/images/IMG_5515.JPG',
    name: 'Alex Pepin',
    role: 'Co-fondateur',
    bio: "Moi c'est Alex, entrepreneur social dans le domaine de l'informatique, motivé par le désir de démocratiser l'accès à la formation de base aux outils numériques.",
  },
  {
    img: '/images/IMG_5517.JPG',
    name: 'Laia Gomis',
    role: 'Membre',
    bio: "Je suis une femme investie et empathique, je soutiens la vision d'Exprime Ta Foi et contribue à son développement.",
  },
];

function Team() {
  return (
    <section className="section section--alt" id="equipe">
      <div className="container">
        <h2 className="section__title reveal">Notre équipe</h2>
        <p className="section__sub reveal">Des visages, une même vision.</p>
        <div className="team-grid">
          {TEAM.map((m, i) => (
            <div key={m.name} className="team-card reveal" data-delay={String(i)}>
              <img src={m.img} alt={m.name} />
              <div className="team-card__body">
                <h3>{m.name}</h3>
                <div className="role">{m.role}</div>
                <p>{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
