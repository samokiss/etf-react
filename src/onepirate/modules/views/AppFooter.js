import React from 'react';

const SOCIALS = [
  { href: 'https://www.facebook.com/exprimetafoi', label: 'Facebook', icon: 'f' },
  { href: 'https://twitter.com/exprimetafoi', label: 'Twitter', icon: '𝕏' },
  { href: 'https://www.instagram.com/exprimetafoi', label: 'Instagram', icon: '◎' },
  { href: 'https://www.youtube.com/channel/UCSrY37mnEwKp8TghRBkt70g', label: 'YouTube', icon: '▶' },
];

function AppFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__social">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer">
              {s.icon}
            </a>
          ))}
        </div>
        <div className="footer__links">
          <a href="/CGU.pdf">CGU</a>
          <a href="/A_PROPOS.pdf">À propos</a>
        </div>
        <div>© Exprime Ta Foi - {new Date().getFullYear()}</div>
      </div>
    </footer>
  );
}

export default AppFooter;
