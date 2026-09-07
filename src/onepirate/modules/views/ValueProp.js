import React from 'react';

const WORDS = [
  { t: 'La', }, { t: 'foi', }, { t: 'se', }, { t: 'vit', },
  { t: 'ensemble,', }, { t: 'partagée', }, { t: 'et', },
  { t: 'mise', }, { t: 'au', }, { t: 'service', },
  { t: 'des', }, { t: 'autres.', accent: true },
];

function ValueProp() {
  return (
    <section className="value">
      <div className="container">
        <p className="value__line">
          {WORDS.map((w, i) => (
            <span
              key={i}
              className={`w${w.accent ? ' w--accent' : ''}`}
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              {w.t}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

export default ValueProp;
