/**
 * Lab Technology C.A. — Catalog engine
 * Fetches /data/products.json and renders category sections, product cards,
 * filter chips and a lightweight quote modal. Framework-free.
 */
(function () {
  "use strict";

  var state = { data: null, activeCategory: "all" };

  var elFilterBar = document.querySelector("#filter-bar");
  var elSections = document.querySelector("#catalog-sections");
  var elNoResults = document.querySelector("#no-results");
  var elModal = document.querySelector("#quote-modal");

  function lang() {
    return (window.LT_I18N && window.LT_I18N.getLang()) || "es";
  }
  function t(key) {
    return window.LT_I18N ? window.LT_I18N.t(key, lang()) : key;
  }

  function iconSymbolFor(categoryIcon) {
    return "#icon-" + categoryIcon;
  }

  function buildFilterBar(categories) {
    var frag = document.createDocumentFragment();

    var allChip = document.createElement("button");
    allChip.className = "filter-chip";
    allChip.type = "button";
    allChip.setAttribute("data-filter", "all");
    allChip.setAttribute("aria-pressed", "true");
    allChip.setAttribute("data-i18n", "catalog.filter.all");
    allChip.textContent = t("catalog.filter.all");
    frag.appendChild(allChip);

    categories.forEach(function (cat) {
      var chip = document.createElement("button");
      chip.className = "filter-chip";
      chip.type = "button";
      chip.setAttribute("data-filter", cat.id);
      chip.setAttribute("aria-pressed", "false");
      chip.textContent = cat[lang()].name;
      frag.appendChild(chip);
    });

    var count = document.createElement("span");
    count.className = "filter-bar__count";
    count.id = "filter-count";
    frag.appendChild(count);

    elFilterBar.innerHTML = "";
    elFilterBar.appendChild(frag);
    updateCount();

    elFilterBar.querySelectorAll(".filter-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        state.activeCategory = chip.getAttribute("data-filter");
        elFilterBar.querySelectorAll(".filter-chip").forEach(function (c) {
          c.setAttribute("aria-pressed", c === chip ? "true" : "false");
        });
        applyFilter();
      });
    });
  }

  function updateCount() {
    var countEl = document.querySelector("#filter-count");
    if (!countEl || !state.data) return;
    var total =
      state.activeCategory === "all"
        ? state.data.products.length
        : state.data.products.filter(function (p) { return p.category === state.activeCategory; }).length;
    countEl.textContent = total + " " + t("catalog.count.suffix");
  }

  function productCard(product) {
    var card = document.createElement("article");
    card.className = "card product-card";
    card.setAttribute("data-reveal", "");
    card.setAttribute("data-product-id", product.id);

    var content = product[lang()];

    var mediaHTML = product.image 
      ? '<img src="' + escapeHtml(product.image) + '" alt="' + escapeHtml(content.name) + '" class="product-card__img" loading="lazy">'
      : '<svg aria-hidden="true"><use href="' + iconSymbolFor(categoryIconOf(product.category)) + '"></use></svg>';

    card.innerHTML =
      '<div class="product-card__media">' +
        '<span class="product-card__brand">' + escapeHtml(product.brand) + '</span>' +
        mediaHTML + 
      "</div>" +
      "<h3>" + escapeHtml(content.name) + "</h3>" +
      "<p>" + escapeHtml(content.description) + "</p>" +
      '<div class="product-card__footer">' +
        '<span class="product-card__tag">' + escapeHtml(categoryNameOf(product.category)) + "</span>" +
        '<button type="button" class="product-card__cta" data-quote-trigger>' +
          t("catalog.card.quote") +
          '<svg aria-hidden="true"><use href="#icon-arrow-right"></use></svg>' +
        "</button>" +
      "</div>";

    card.querySelector("[data-quote-trigger]").addEventListener("click", function () {
      openQuoteModal(product);
    });

    return card;
  }

  function categoryIconOf(catId) {
    var cat = state.data.categories.find(function (c) { return c.id === catId; });
    return cat ? cat.icon : "flask-plus";
  }
  function categoryNameOf(catId) {
    var cat = state.data.categories.find(function (c) { return c.id === catId; });
    return cat ? cat[lang()].name : "";
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function renderSections() {
    elSections.innerHTML = "";
    var frag = document.createDocumentFragment();

    state.data.categories.forEach(function (cat) {
      var products = state.data.products.filter(function (p) { return p.category === cat.id; });
      if (!products.length) return;

      var section = document.createElement("section");
      section.className = "catalog-section";
      section.id = "cat-" + cat.id;
      section.setAttribute("data-category-section", cat.id);

      var headWrap = document.createElement("div");
      headWrap.className = "container";

      var head = document.createElement("div");
      head.className = "catalog-section__head";
      head.innerHTML =
        '<div class="catalog-section__icon"><svg aria-hidden="true"><use href="' + iconSymbolFor(cat.icon) + '"></use></svg></div>' +
        "<div><h2>" + escapeHtml(cat[lang()].name) + "</h2><p>" + escapeHtml(cat[lang()].tagline) + "</p></div>";

      var grid = document.createElement("div");
      grid.className = "product-grid";
      products.forEach(function (p) { grid.appendChild(productCard(p)); });

      headWrap.appendChild(head);
      headWrap.appendChild(grid);
      section.appendChild(headWrap);
      frag.appendChild(section);
    });

    elSections.appendChild(frag);
    observeReveals();
  }

  function applyFilter() {
    var sections = elSections.querySelectorAll("[data-category-section]");
    var visibleCount = 0;
    sections.forEach(function (section) {
      var match = state.activeCategory === "all" || section.getAttribute("data-category-section") === state.activeCategory;
      section.style.display = match ? "" : "none";
      if (match) visibleCount++;
    });
    elNoResults.classList.toggle("is-visible", visibleCount === 0);
    updateCount();
  }

  function observeReveals() {
    var revealEls = elSections.querySelectorAll("[data-reveal]");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }

  /* Quote modal ------------------------------------------------------------ */
  function openQuoteModal(product) {
    if (!elModal) return;
    var content = product[lang()];
    var currentLang = lang(); 

    elModal.querySelector("[data-modal-brand]").textContent = product.brand;
    elModal.querySelector("[data-modal-title]").textContent = content.name;
    elModal.querySelector("[data-modal-desc]").textContent = content.description;

    var whatsappBtn = elModal.querySelector("#modal-whatsapp-btn");
    if (whatsappBtn) {
      var messageText = "";
      if (currentLang === "en") {
        messageText = "Hello Lab Technology, I am interested in requesting a quote for: *" + content.name + "*.";
      } else {
        messageText = "Hola Lab Technology, me interesa solicitar una cotización para el equipo: *" + content.name + "*.";
      }
      
      var encodedMessage = encodeURIComponent(messageText);
      whatsappBtn.href = "https://wa.me/584122542185?text=" + encodedMessage;
    }

    var modalFeaturesEl = elModal.querySelector("[data-modal-features]");
    if (modalFeaturesEl) {
      modalFeaturesEl.innerHTML = "";
      
      var features = content.features; 
      if (features && features.length > 0) {
        features.forEach(function (feature) {
          var li = document.createElement("li");
          li.textContent = "✔ " + feature;
          modalFeaturesEl.appendChild(li);
        });
        modalFeaturesEl.style.display = "block";
      } else {
        modalFeaturesEl.style.display = "none"; 
      }
    }

    var mailtoBtn = elModal.querySelector("[data-modal-mailto]");
    if (mailtoBtn) {
      var subject = t("modal.quote.subject") + " — " + content.name;
      var body = (currentLang === "en" ? "I would like a quote for: " : "Deseo cotizar el equipo: ") + content.name;
      mailtoBtn.setAttribute(
        "href",
        "mailto:labtecnology@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body)
      );
    }

    elModal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    elModal.querySelector(".modal__close").focus();
  }

  function closeQuoteModal() {
    if (!elModal) return;
    elModal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  if (elModal) {
    elModal.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-modal-dismiss")) closeQuoteModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeQuoteModal();
    });
  }

  /* Init --------------------------------------------------------------------- */
  function init(data) {
    state.data = data;
    buildFilterBar(data.categories);
    renderSections();
    applyFilter();
    scrollToRequestedAnchor();
  }

  function scrollToRequestedAnchor() {
    if (!window.location.hash) return;
    var target = document.querySelector(window.location.hash);
    if (target) {
      window.requestAnimationFrame(function () {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  fetch("data/products.json")
    .then(function (res) {
      if (!res.ok) throw new Error("Failed to load products.json");
      return res.json();
    })
    .then(init)
    .catch(function (err) {
      if (elSections) {
        elSections.innerHTML =
          '<div class="container"><p style="padding:3rem 0;color:var(--c-ink-soft)">No se pudo cargar el catálogo. ' +
          "Verifica que el sitio se esté sirviendo mediante un servidor web (no como archivo local). / " +
          "Could not load the catalog. Please make sure the site is served over HTTP.</p></div>";
      }
      console.error(err);
    });

  document.addEventListener("lt:langchange", function () {
    if (!state.data) return;
    buildFilterBar(state.data.categories);
    renderSections();
    applyFilter();
  });
})();
