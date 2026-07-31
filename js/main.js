/**
 * Lab Tecnology C.A. — Site interactions
 * Clean, dependency-free progressive enhancement.
 */
(function () {
  "use strict";

  /* Header scroll state --------------------------------------------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
    toggleBackToTop();
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile nav toggle --------------------------------------------------- */
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* Scroll reveal --------------------------------------------------------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Animated stat counters ------------------------------------------------ */
  function animateCount(el) {
    var raw = el.textContent.trim();
    
    var numMatch = raw.match(/\d+/);
    if (!numMatch) return;
    
    var target = parseInt(numMatch[0], 10);
    var start = 0;
    var duration = 1100;
    var startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.floor(eased * target);
      
      el.textContent = "+" + value;
      
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = "+" + target;
    }
    requestAnimationFrame(step);
  }

  var countEls = document.querySelectorAll(".hero__stat .num");
  if ("IntersectionObserver" in window && countEls.length) {
    var countIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    countEls.forEach(function (el) { countIO.observe(el); });
  }

  /* Web3Forms Contact Form Handler con Toast Notification ------------------- */
  var contactForm = document.getElementById("contact-form");

  function showToast(message, type) {
    // Eliminar toast previo si existe
    var existingToast = document.querySelector(".form-toast");
    if (existingToast) existingToast.remove();

    // Crear el elemento toast
    var toast = document.createElement("div");
    toast.className = "form-toast form-toast--" + (type || "success");
    toast.textContent = message;

    document.body.appendChild(toast);

    // Animación de entrada
    requestAnimationFrame(function () {
      toast.classList.add("is-visible");
    });

    // Ocultar y remover después de 4 segundos
    setTimeout(function () {
      toast.classList.remove("is-visible");
      toast.addEventListener("transitionend", function () {
        if (toast.parentNode) toast.remove();
      });
    }, 4000);
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var submitBtn = contactForm.querySelector('button[type="submit"]');
      var originalBtnText = submitBtn ? submitBtn.textContent : "Enviar mensaje";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";
      }

      var formData = new FormData(contactForm);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.success) {
            showToast("¡Mensaje enviado con éxito! Te contactaremos a la brevedad.", "success");
            contactForm.reset();
          } else {
            showToast("Hubo un problema al enviar. Inténtalo nuevamente.", "error");
          }
        })
        .catch(function () {
          showToast("Error de conexión. Revisa tu red e inténtalo de nuevo.", "error");
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
          }
        });
    });
  }

  /* Back to top ------------------------------------------------------------ */
  var backToTop = document.querySelector(".back-to-top");
  function toggleBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle("is-visible", window.scrollY > 480);
  }
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Current year in footer -------------------------------------------------- */
  document.querySelectorAll("[data-current-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Marquee track animation ------------------------------------------------ */
  var track = document.getElementById("marqueeTrack");
  if (track) {
    var originalItems = Array.from(track.children);
    
    for (var i = 0; i < 3; i++) {
      originalItems.forEach(function (item) {
        var clone = item.cloneNode(true);
        track.appendChild(clone);
      });
    }

    var speed = 0.7; 
    var scrollAmount = 0;
    var isPaused = false;
    var maxScroll = 0;

    function calculateWidth() {
      if (!track.children.length) return;
      
      var firstItemRect = track.children[0].getBoundingClientRect();
      var targetItemRect = track.children[originalItems.length].getBoundingClientRect();
      
      maxScroll = targetItemRect.left - firstItemRect.left;
    }

    calculateWidth();
    window.addEventListener("load", calculateWidth);

    function animate() {
      if (!isPaused && maxScroll > 0) {
        scrollAmount += speed;
        
        if (scrollAmount >= maxScroll) {
          scrollAmount -= maxScroll;
        }
        
        track.style.transform = "translateX(-" + scrollAmount + "px)";
      }
      requestAnimationFrame(animate);
    }

    track.addEventListener("mouseenter", function () { isPaused = true; });
    track.addEventListener("mouseleave", function () { isPaused = false; });
    track.addEventListener("touchstart", function () { isPaused = true; }, { passive: true });
    track.addEventListener("touchend", function () { isPaused = false; }, { passive: true });

    requestAnimationFrame(animate);

    var resizeTimeout;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(calculateWidth, 150);
    });
  }

})();