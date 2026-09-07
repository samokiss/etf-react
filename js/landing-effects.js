(function() {
  "use strict";

  var doc = document;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    .matches;
  var nav = doc.querySelector(".site-nav");
  var toggle = doc.querySelector(".nav-toggle");
  var menu = doc.querySelector(".nav-links");
  var reels = Array.prototype.slice.call(doc.querySelectorAll(".reel"));
  var lastScroll = 0;

  doc.getElementById("year").textContent = new Date().getFullYear();

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
      if (nav)
        nav.classList.toggle(
          "is-hidden",
          current > lastScroll &&
            current > 180 &&
            !menu.classList.contains("is-open")
        );
      lastScroll = Math.max(0, current);
    },
    { passive: true }
  );

  if (reels.length) {
    var lastStoryTrigger = null;
    var storyModal = doc.createElement("div");
    storyModal.className = "story-modal";
    storyModal.setAttribute("aria-hidden", "true");
    storyModal.innerHTML =
      '<div class="story-dialog" role="dialog" aria-modal="true" aria-labelledby="story-dialog-title">' +
      '<button class="story-close" type="button" aria-label="Fermer la vidéo">×</button>' +
      '<video controls playsinline></video><p id="story-dialog-title"></p></div>';
    doc.body.appendChild(storyModal);
    var storyPlayer = storyModal.querySelector("video");
    var storyClose = storyModal.querySelector(".story-close");

    function closeStory() {
      storyPlayer.pause();
      storyPlayer.removeAttribute("src");
      storyPlayer.load();
      storyModal.classList.remove("is-open");
      storyModal.setAttribute("aria-hidden", "true");
      doc.body.classList.remove("story-open");
      if (lastStoryTrigger) lastStoryTrigger.focus();
    }

    reels.forEach(function(reel) {
      var preview = reel.querySelector("video");
      var button = reel.querySelector(".reel-card");
      reel.className = "reel";
      reel.removeAttribute("aria-hidden");
      button.tabIndex = 0;
      button.addEventListener("click", function() {
        lastStoryTrigger = button;
        storyPlayer.poster = preview.poster;
        storyPlayer.src = preview.querySelector("source").src;
        storyModal.querySelector("p").textContent = reel.dataset.reelTitle;
        storyModal.classList.add("is-open");
        storyModal.setAttribute("aria-hidden", "false");
        doc.body.classList.add("story-open");
        storyClose.focus();
        storyPlayer.play().catch(function() {});
      });
    });
    storyClose.addEventListener("click", closeStory);
    storyModal.addEventListener("click", function(event) {
      if (event.target === storyModal) closeStory();
    });
    doc.addEventListener("keydown", function(event) {
      if (event.key === "Escape" && storyModal.classList.contains("is-open"))
        closeStory();
    });
  }

  function activateJourney(key) {
    doc.querySelectorAll(".journey-step").forEach(function(step) {
      step.classList.toggle("is-active", step.dataset.step === key);
    });
    doc.querySelectorAll("[data-journey-target]").forEach(function(button) {
      var active = button.dataset.journeyTarget === key;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    doc.querySelectorAll(".journey-video").forEach(function(video) {
      var active = video.dataset.screen === key;
      video.classList.toggle("is-active", active);
      if (active) video.play().catch(function() {});
      else video.pause();
    });
  }

  doc.querySelectorAll("[data-journey-target]").forEach(function(button) {
    button.addEventListener("click", function() {
      var key = button.dataset.journeyTarget;
      var positions = { read: 0.08, mark: 0.5, give: 0.9 };
      var journey = doc.querySelector(".journey");
      var detail = doc.querySelector('[data-step="' + key + '"]');

      activateJourney(key);
      if (reduceMotion) {
        detail.scrollIntoView({ behavior: "auto", block: "center" });
        return;
      }
      var top = journey.getBoundingClientRect().top + window.scrollY;
      var distance = Math.max(0, journey.offsetHeight - window.innerHeight);
      window.scrollTo({
        top: top + distance * positions[key],
        behavior: "smooth"
      });
    });
  });

  function setupFallbackJourney() {
    var journey = doc.querySelector(".journey");
    var phone = doc.querySelector(".phone-journey");
    var progressBar = doc.querySelector(".journey-progress span");
    var framePending = false;
    var currentState = "read";

    if (!journey) return;

    function updateJourney() {
      var rect = journey.getBoundingClientRect();
      var distance = Math.max(1, rect.height - window.innerHeight);
      var progress = Math.max(0, Math.min(1, -rect.top / distance));
      var nextState =
        progress < 0.34 ? "read" : progress < 0.68 ? "mark" : "give";

      if (nextState !== currentState) {
        currentState = nextState;
        activateJourney(nextState);
      }
      if (progressBar) progressBar.style.transform = "scaleY(" + progress + ")";
      if (phone)
        phone.style.transform =
          "rotateY(" +
          (-8 + progress * 16) +
          "deg) scale(" +
          (0.84 + progress * 0.21) +
          ")";
      framePending = false;
    }

    function requestUpdate() {
      if (framePending) return;
      framePending = true;
      window.requestAnimationFrame(updateJourney);
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    updateJourney();
  }

  if (reduceMotion || !window.gsap || !window.ScrollTrigger) {
    doc.querySelectorAll(".reveal-copy").forEach(function(el) {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    if (reduceMotion)
      doc.querySelectorAll("video[autoplay]").forEach(function(video) {
        video.removeAttribute("autoplay");
        video.pause();
      });
    else setupFallbackJourney();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  var mm = gsap.matchMedia();
  var context = gsap.context(function() {
    gsap.set(".hero-copy > *", { opacity: 0, y: 38 });
    gsap.set(".phone-hero", { opacity: 0, y: 180, rotateX: 14, scale: 0.92 });
    gsap
      .timeline({ defaults: { ease: "power4.out" } })
      .to(".hero-copy > *", { opacity: 1, y: 0, duration: 1.15, stagger: 0.13 })
      .to(
        ".phone-hero",
        { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.65 },
        0.35
      )
      .from(
        ".hero-side",
        {
          opacity: 0,
          x: function(i) {
            return i ? 80 : -80;
          },
          duration: 1.3,
          stagger: 0.1
        },
        0.8
      )
      .from(".scroll-cue", { opacity: 0, duration: 0.8 }, 1.25);

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.7
        }
      })
      .to(
        ".hero-copy",
        { yPercent: -34, opacity: 0.05, scale: 0.9, ease: "none" },
        0
      )
      .to(".hero-side-left", { xPercent: -24, ease: "none" }, 0)
      .to(".hero-side-right", { xPercent: 24, ease: "none" }, 0)
      .to(
        ".phone-hero",
        { yPercent: -40, scale: 1.22, rotateX: -4, ease: "none" },
        0
      )
      .to(".hero-aura", { scale: 1.4, opacity: 0.45, ease: "none" }, 0);

    doc.querySelectorAll(".reveal-copy").forEach(function(el) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 84%", once: true }
      });
    });

    var journeyState = "read";
    var journeyTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".journey",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.65,
        onUpdate: function(self) {
          var key =
            self.progress < 0.34
              ? "read"
              : self.progress < 0.68
              ? "mark"
              : "give";
          if (key !== journeyState) {
            journeyState = key;
            activateJourney(key);
          }
        }
      }
    });
    journeyTimeline
      .to(".journey-progress span", { scaleY: 1, ease: "none", duration: 3 }, 0)
      .fromTo(
        ".phone-journey",
        { rotateY: -8, scale: 0.84 },
        { rotateY: 8, scale: 1.05, ease: "none", duration: 3 },
        0
      )
      .to(
        ".journey-heading",
        { y: -90, opacity: 0.18, ease: "none", duration: 1 },
        0.3
      )
      .to(
        ".journey-glow",
        { scale: 1.35, filter: "blur(22px)", ease: "none", duration: 3 },
        0
      )
      .to(".journey-orbit", { rotateZ: 42, ease: "none", duration: 3 }, 0);

    doc.querySelectorAll(".journey-step").forEach(function(step) {
      gsap.set(step, {
        opacity: step.classList.contains("is-active") ? 1 : 0,
        y: step.classList.contains("is-active") ? 0 : 28
      });
    });
    var observer = new MutationObserver(function(entries) {
      entries.forEach(function(entry) {
        var active = entry.target.classList.contains("is-active");
        gsap.to(entry.target, {
          opacity: active ? 1 : 0,
          y: active ? 0 : -24,
          visibility: active ? "visible" : "hidden",
          duration: 0.45,
          ease: "power2.out",
          overwrite: true
        });
      });
    });
    doc.querySelectorAll(".journey-step").forEach(function(step) {
      observer.observe(step, { attributes: true, attributeFilter: ["class"] });
    });

    doc.querySelectorAll(".chapter").forEach(function(chapter, index) {
      var copy = chapter.querySelector(".chapter-copy");
      gsap.from(copy, {
        opacity: 0,
        y: 80,
        duration: 1.15,
        ease: "power4.out",
        scrollTrigger: { trigger: chapter, start: "top 72%" }
      });
      if (index === 0) {
        gsap.from(".verse-sheet", {
          y: 150,
          rotate: -12,
          scale: 0.92,
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: { trigger: chapter, start: "top 65%" }
        });
        gsap.from(".chapter-device", {
          x: 150,
          y: 120,
          rotate: 15,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: { trigger: chapter, start: "top 60%" }
        });
      } else if (index === 1) {
        gsap.from(".message", {
          opacity: 0,
          y: 90,
          rotate: 0,
          duration: 1,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: { trigger: chapter, start: "top 62%" }
        });
      } else {
        gsap.from(".community-portrait img", {
          scale: 1.15,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: chapter, start: "top 65%" }
        });
        gsap.from(".floating-label", {
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          stagger: 0.14,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: chapter, start: "top 55%" }
        });
      }
    });

    gsap.fromTo(
      ".reels-window",
      { scale: 0.97, opacity: 0.4 },
      {
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".reels-window",
          start: "top 92%",
          end: "top 48%",
          scrub: 0.7
        }
      }
    );
    gsap.from(".human-photo-main", {
      x: 130,
      y: 80,
      opacity: 0,
      duration: 1.3,
      ease: "power4.out",
      scrollTrigger: { trigger: ".human-canvas", start: "top 75%" }
    });
    gsap.from(".human-photo-small", {
      x: -100,
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: { trigger: ".human-canvas", start: "top 62%" }
    });
    gsap.from(".human-canvas blockquote", {
      y: 120,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: { trigger: ".human-canvas", start: "top 52%" }
    });
    gsap.to(".human-photo-main", {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: ".human-canvas",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8
      }
    });
    gsap.to(".human-photo-small", {
      y: 55,
      ease: "none",
      scrollTrigger: {
        trigger: ".human-canvas",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8
      }
    });

    gsap.from(".promise h2", {
      scale: 0.82,
      opacity: 0,
      transformOrigin: "left center",
      ease: "none",
      scrollTrigger: {
        trigger: ".promise",
        start: "top 80%",
        end: "center 50%",
        scrub: 0.6
      }
    });
    gsap.from(".promise-inner>p:last-child", {
      x: 70,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".promise", start: "center 72%" }
    });

    gsap.from(".download-copy>*", {
      opacity: 0,
      y: 50,
      duration: 1.05,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: { trigger: ".download", start: "top 65%" }
    });
    gsap.from(".download-phone", {
      y: 300,
      rotate: -14,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: { trigger: ".download", start: "top 70%" }
    });
    gsap.from(".qr-card", {
      opacity: 0,
      scale: 0.75,
      duration: 0.9,
      ease: "back.out(1.4)",
      scrollTrigger: { trigger: ".download", start: "top 48%" }
    });

    mm.add("(max-width: 680px)", function() {
      gsap.set(".hero-side", { clearProps: "all" });
      gsap.to(".download-phone", {
        rotate: -2,
        ease: "none",
        scrollTrigger: {
          trigger: ".download-stage",
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.8
        }
      });
    });
  });

  window.addEventListener("load", function() {
    ScrollTrigger.refresh();
  });
  window.addEventListener("pagehide", function() {
    mm.revert();
    context.revert();
  });
})();
