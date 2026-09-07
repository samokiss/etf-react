/* ==========================================================================
   landing-effects.js — Effets Apple MacBook Neo pour index.html uniquement.
   Vanilla JS, zéro dépendance. transform/opacity uniquement (60fps).
   Fallback : sans JS, sans html.fx, tout est visible.
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return; // fallback statique complet

  // Autorise les états cachés CSS (reveal) uniquement quand le JS tourne.
  document.documentElement.classList.add('fx');

  /* ---------- 1. Reveal au scroll (IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
          setTimeout(function () { el.classList.add('is-in'); }, delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- 2. Parallax léger (rAF + translateY uniquement) ---------- */
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  if (parallaxEls.length) {
    var ticking = false;
    var update = function () {
      ticking = false;
      var vh = window.innerHeight;
      parallaxEls.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.12;
        var rect = el.getBoundingClientRect();
        // progress -1..1 selon la position dans le viewport
        var p = (rect.top + rect.height / 2 - vh / 2) / vh;
        el.style.transform = 'translate3d(0,' + (p * speed * 100).toFixed(2) + 'px,0)';
      });
    };
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  /* ---------- 3. Typing effect sur le verset du hero ---------- */
  var verse = document.querySelector('[data-typing]');
  if (verse) {
    var full = verse.getAttribute('data-typing');
    // Le HTML contient déjà le verset complet (fallback sans JS).
    // Si le JS tourne, on le retape caractère par caractère.
    verse.textContent = '';
    var cursor = document.createElement('span');
    cursor.className = 'fx-cursor';
    verse.appendChild(cursor);
    var i = 0;
    var timer = setInterval(function () {
      i += 1;
      cursor.insertAdjacentText('beforebegin', full.charAt(i - 1));
      if (i >= full.length) {
        clearInterval(timer);
        setTimeout(function () { if (cursor.parentNode) cursor.remove(); }, 2500);
      }
    }, 42);
  }

  /* ---------- 4. Fade cinématique d'entrée du hero ---------- */
  var heroBits = document.querySelectorAll('[data-hero]');
  heroBits.forEach(function (el) {
    var order = parseInt(el.getAttribute('data-hero'), 10);
    el.style.transitionDelay = (0.12 * order) + 's';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { el.classList.add('is-in'); });
    });
  });
})();
