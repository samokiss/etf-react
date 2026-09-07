import React from 'react';

const VALUES = [
  { img: '/images/1.png', title: 'Confiance' },
  { img: '/images/2.png', title: 'Solidarité' },
  { img: '/images/3.png', title: 'Engagement' },
  { img: '/images/4.png', title: 'Amour' },
];

function Values() {
  return (
    <section className="section section--tint">
      <div className="container">
        <h2 className="section__title reveal">Nos valeurs</h2>
        <p className="section__sub reveal">Quatre piliers qui guident chacune de nos actions.</p>
        <div className="values-grid">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className="value-tile reveal"
              data-delay={String(i % 4)}
              style={{ backgroundImage: `url(${v.img})` }}
            >
              <span>{v.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Values;
