(function() {
  "use strict";

  var doc = document;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    .matches;
  var nav = doc.querySelector(".site-nav");
  var toggle = doc.querySelector(".nav-toggle");
  var menu = doc.querySelector(".nav-links");
  var year = doc.getElementById("year");
  var lastScroll = 0;

  if (year) year.textContent = new Date().getFullYear();

  if (toggle && menu) {
    toggle.addEventListener("click", function() {
      var isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute(
        "aria-label",
        isOpen ? "Fermer le menu" : "Ouvrir le menu"
      );
    });

    menu.querySelectorAll("a").forEach(function(link) {
      link.addEventListener("click", function() {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Ouvrir le menu");
      });
    });
  }

  window.addEventListener(
    "scroll",
    function() {
      var current = window.scrollY;
      if (nav && menu) {
        nav.classList.toggle(
          "is-hidden",
          current > lastScroll &&
            current > 180 &&
            !menu.classList.contains("is-open")
        );
      }
      lastScroll = Math.max(0, current);
    },
    { passive: true }
  );

  if (reduceMotion || !window.gsap || !window.ScrollTrigger) {
    doc.querySelectorAll(".about-reveal").forEach(function(element) {
      element.style.opacity = "1";
      element.style.transform = "none";
    });
    if (reduceMotion) {
      doc.querySelectorAll("video[autoplay]").forEach(function(video) {
        video.removeAttribute("autoplay");
        video.pause();
      });
    }
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  var context = gsap.context(function() {
    gsap.set(".about-hero-copy > *", { opacity: 0, y: 42 });
    gsap.set(".about-phone", { opacity: 0, y: 130, rotate: 12, scale: 0.9 });

    gsap
      .timeline({ defaults: { ease: "power4.out" } })
      .to(".about-hero-copy > *", {
        opacity: 1,
        y: 0,
        duration: 1.15,
        stagger: 0.11
      })
      .to(
        ".about-phone",
        {
          opacity: 1,
          y: 0,
          rotate: 5,
          scale: 1,
          duration: 1.55
        },
        0.25
      )
      .from(
        ".about-orbit",
        {
          opacity: 0,
          scale: 0.72,
          duration: 1.4,
          stagger: 0.12
        },
        0.55
      )
      .from(
        ".about-pill",
        {
          opacity: 0,
          scale: 0.75,
          duration: 0.7,
          stagger: 0.12
        },
        0.8
      );

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".about-hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.7
        }
      })
      .to(".about-hero-copy", { yPercent: -22, opacity: 0.12, ease: "none" }, 0)
      .to(
        ".about-phone",
        { yPercent: -28, rotate: -2, scale: 1.08, ease: "none" },
        0
      )
      .to(".about-orbit-one", { rotate: 42, scale: 1.15, ease: "none" }, 0)
      .to(".about-orbit-two", { rotate: -35, scale: 0.9, ease: "none" }, 0);

    doc.querySelectorAll(".about-reveal").forEach(function(element) {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 1.05,
        ease: "power4.out",
        scrollTrigger: { trigger: element, start: "top 86%", once: true }
      });
    });

    gsap.to(".statement-media img", {
      scale: 1.12,
      yPercent: 6,
      ease: "none",
      scrollTrigger: {
        trigger: ".about-statement",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8
      }
    });

    gsap.to(".reach-marquee", {
      xPercent: -38,
      ease: "none",
      scrollTrigger: {
        trigger: ".about-reach",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8
      }
    });
  });

  window.addEventListener("load", function() {
    ScrollTrigger.refresh();
  });

  window.addEventListener("pagehide", function() {
    context.revert();
  });
})();
