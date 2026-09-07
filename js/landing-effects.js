/* ==========================================================================
   landing-effects.js — Effets « Apple MacBook Neo » haut de gamme.
   GSAP + ScrollTrigger (CDN) si dispo : pin hero + zoom device, reveals
   cinématiques mot à mot, zoom scrub des visuels, compteurs animés.
   Fallback vanilla (IntersectionObserver) si GSAP absent / reduced-motion /
   prerender (HeadlessChrome) : tout reste visible, zéro page blanche.
   ========================================================================== */
(function () {
  'use strict';

  var reduced = typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var headless = /HeadlessChrome/.test(window.navigator.userAgent);
  var hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  /* ---------- 0. Burger mobile (toujours vanilla) ---------- */
  var burger = document.getElementById('navBurger');
  var menu = document.getElementById('navMenu');
  if (burger && menu) {
    menu.classList.add('is-closed');
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('is-closed') === false;
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.innerHTML = open ? '<i class="bi-x-lg"></i>' : '<i class="bi-list"></i>';
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.add('is-closed');
        burger.setAttribute('aria-expanded', 'false');
        burger.innerHTML = '<i class="bi-list"></i>';
      });
    });
  }

  /* ================= MODE LÉGER (reduced motion / no GSAP) ================= */
  if (reduced || headless || !hasGsap) {
    if (headless) return; // prerender : HTML statique tel quel
    // Fallback : reveals simples + typing, tout est visible par défaut.
    if (!reduced) {
      var verse = document.querySelector('[data-typing]');
      if (verse) {
        var full = verse.getAttribute('data-typing');
        verse.textContent = '';
        var cursor = document.createElement('span');
        cursor.className = 'fx-cursor';
        verse.appendChild(cursor);
        var i = 0;
        var timer = setInterval(function () {
          i += 1;
          cursor.insertAdjacentText('beforebegin', full.charAt(i - 1));
          if (i >= full.length) { clearInterval(timer); setTimeout(function () { if (cursor.parentNode) cursor.remove(); }, 2500); }
        }, 42);
      }
      document.documentElement.classList.add('fx');
      var revealEls = document.querySelectorAll('[data-reveal]');
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var el = entry.target;
              setTimeout(function () { el.classList.add('is-in'); }, parseInt(el.getAttribute('data-reveal-delay') || '0', 10));
              io.unobserve(el);
            }
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
        revealEls.forEach(function (el) { io.observe(el); });
      } else {
        revealEls.forEach(function (el) { el.classList.add('is-in'); });
      }
    }
    return;
  }

  /* ================= MODE LOURD : GSAP + ScrollTrigger ================= */
  gsap.registerPlugin(ScrollTrigger);
  var D = document;

  /* --- 1. Découpage des headlines en mots (reveal cinématique masqué) --- */
  D.querySelectorAll('.fx-h2, .fx-hero-title, .fx-download-title, .fx-final-title, .fx-feature-copy h3').forEach(function (el) {
    var nodes = [];
    Array.prototype.slice.call(el.childNodes).forEach(function (node) {
      if (node.nodeType === 3) {
        node.textContent.split(/(\s+)/).forEach(function (w) {
          if (w.trim() === '') { nodes.push(D.createTextNode(' ')); }
          else { nodes.push(Object.assign(D.createElement('span'), { textContent: w, className: 'fx-word' })); }
        });
      } else if (node.nodeType === 1) {
        if (node.tagName === 'BR') { nodes.push(node); return; }
        var cls = node.className || '';
        node.textContent.split(/(\s+)/).forEach(function (w) {
          if (w.trim() === '') { nodes.push(D.createTextNode(' ')); }
          else {
            var inner = Object.assign(D.createElement('span'), { textContent: w, className: ('fx-word ' + cls).trim() });
            var wrap = D.createElement('span');
            wrap.appendChild(inner);
            nodes.push(wrap);
          }
        });
      }
    });
    el.textContent = '';
    nodes.forEach(function (n) { el.appendChild(n); });
  });

  /* Mots masqués : chaque fx-word dans un cache overflow:hidden si wrappé */
  D.querySelectorAll('span > .fx-word').forEach(function (w) { w.parentNode.style.overflow = 'hidden'; w.parentNode.style.display = 'inline-block'; });

  /* --- 2. Entrée cinématique du hero --- */
  var heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  heroTl
    .from('.fx-eyebrow', { autoAlpha: 0, y: 24, duration: 0.7 })
    .from('.fx-hero-title .fx-word', { yPercent: 115, duration: 1.1, stagger: 0.08 }, '-=0.35')
    .from('.fx-hero-sub', { autoAlpha: 0, y: 26, duration: 0.8 }, '-=0.55')
    .from('.fx-hero-ctas .fx-link-cta', { autoAlpha: 0, y: 18, duration: 0.6, stagger: 0.12 }, '-=0.45')
    .from('.fx-verse-line', { autoAlpha: 0, duration: 0.7 }, '-=0.3')
    .from('.fx-phone', { y: 160, autoAlpha: 0, rotateX: 18, duration: 1.4, ease: 'power3.out', clearProps: 'transform' }, 0.5);

  /* Typing du verset (après l'entrée) */
  var verse = D.querySelector('[data-typing]');
  if (verse) {
    var full = verse.getAttribute('data-typing');
    setTimeout(function () {
      verse.textContent = '';
      var cur = D.createElement('span');
      cur.className = 'fx-cursor';
      verse.appendChild(cur);
      var i = 0;
      var t = setInterval(function () {
        i += 1;
        cur.insertAdjacentText('beforebegin', full.charAt(i - 1));
        if (i >= full.length) { clearInterval(t); setTimeout(function () { if (cur.parentNode) cur.remove(); }, 2500); }
      }, 38);
    }, 1400);
  }

  /* --- 3. HERO épinglé + zoom device (le claquement Apple) --- */
  ScrollTrigger.create({
    trigger: '.fx-hero',
    start: 'top top',
    end: '+=60%',
    pin: true,
    pinSpacing: true,
    scrub: 0.5,
    animation: gsap.timeline()
      .to('.fx-eyebrow, .fx-hero-sub, .fx-hero-ctas, .fx-verse-line', { autoAlpha: 0, y: -50, ease: 'none' }, 0)
      .to('.fx-hero-title', { autoAlpha: 0.15, y: -70, scale: 0.94, ease: 'none' }, 0)
      .fromTo('.fx-phone', { scale: 1 }, { scale: 1.18, ease: 'none' }, 0)
  });

  /* --- 4. Headlines de section : mots qui montent en cascade --- */
  D.querySelectorAll('.fx-section-head .fx-h2').forEach(function (el) {
    gsap.from(el.querySelectorAll('.fx-word'), {
      yPercent: 115,
      duration: 0.9,
      stagger: 0.05,
      ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 82%' }
    });
  });

  /* --- 5. Visuels larges : zoom scrub 0.9 -> 1 (subtil, Apple-like) --- */
  D.querySelectorAll('.fx-visual-wide, .fx-visual-device, .fx-hero-visual').forEach(function (el) {
    gsap.fromTo(el,
      { scale: 0.9, y: 60 },
      {
        scale: 1, y: 0, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 35%', scrub: 0.6 }
      }
    );
  });

  /* --- 6. Features : texte + média alternés en slide doux --- */
  D.querySelectorAll('.fx-feature').forEach(function (row) {
    var copy = row.querySelector('.fx-feature-copy');
    var media = row.querySelector('.fx-feature-media');
    var tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 78%' } });
    tl.from(copy, { autoAlpha: 0, x: row.classList.contains('fx-flip') ? 60 : -60, duration: 0.9, ease: 'power3.out' })
      .from(media, { autoAlpha: 0, x: row.classList.contains('fx-flip') ? -60 : 60, duration: 0.9, ease: 'power3.out' }, '-=0.6');
  });

  /* --- 7. Specs : compteurs animés + cartes qui surgissent --- */
  D.querySelectorAll('.fx-spec').forEach(function (card, idx) {
    gsap.from(card, {
      autoAlpha: 0, y: 46, duration: 0.8, delay: idx * 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: '.fx-specs', start: 'top 82%' }
    });
    var valueEl = card.querySelector('.fx-spec-value');
    if (!valueEl) return;
    var match = valueEl.textContent.trim().match(/^(\d+)/);
    if (!match) return; // « ∞ » reste tel quel
    var target = parseInt(match[1], 10);
    if (target === 0) return; // 0 € / 0 pub : rien à compter
    var suffix = valueEl.textContent.trim().slice(match[1].length);
    var obj = { n: 0 };
    gsap.to(obj, {
      n: target, duration: 1.6, ease: 'power2.out', delay: 0.3 + idx * 0.08,
      scrollTrigger: { trigger: '.fx-specs', start: 'top 82%' },
      onUpdate: function () { valueEl.textContent = Math.round(obj.n) + suffix; }
    });
  });

  /* --- 8. Tuiles vision : apparition en éventail --- */
  gsap.from('.fx-vision > div', {
    autoAlpha: 0, y: 60, rotate: 1.5, duration: 0.9, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: '.fx-vision', start: 'top 82%' }
  });

  /* --- 9. CTA final : titre + badges + QR en cascade --- */
  var finalTl = gsap.timeline({ scrollTrigger: { trigger: '.fx-final', start: 'top 70%' } });
  finalTl.from('.fx-final-title', { autoAlpha: 0, scale: 0.92, duration: 0.9, ease: 'power4.out' })
    .from('.fx-final-sub', { autoAlpha: 0, y: 24, duration: 0.7 }, '-=0.5')
    .from('.fx-store-badge', { autoAlpha: 0, y: 34, duration: 0.7, stagger: 0.15 }, '-=0.4')
    .from('.fx-final-qr', { autoAlpha: 0, y: 30, duration: 0.7 }, '-=0.35');

  /* --- 10. Parallax résiduel sur les éléments data-parallax (subtil) --- */
  D.querySelectorAll('[data-parallax]').forEach(function (el) {
    gsap.fromTo(el, { y: 40 }, {
      y: -40, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
    });
  });

  /* Refresh après chargement complet (vidéos, images) */
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
