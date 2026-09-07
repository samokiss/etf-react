import React, { useState } from 'react';

function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="nav">
      <div className="nav__inner">
        <a href="#top" className="nav__logo" onClick={close}>
          <img src="/images/etf.png" alt="Exprime Ta Foi" />
        </a>
        <button
          className="nav__burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? '✕' : '☰'}
        </button>
        <div className={`nav__links${open ? ' is-open' : ''}`}>
          <a href="#features" onClick={close}>L'app</a>
          <a href="#services" onClick={close}>Services</a>
          <a href="#equipe" onClick={close}>Équipe</a>
          <a href="#contact" className="nav__cta" onClick={close}>Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
