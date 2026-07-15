/**
 * Lab Technology C.A. — i18n engine
 * Lightweight ES/EN translation layer. No external dependencies.
 * Usage: elements marked with data-i18n="key" get their textContent replaced.
 * data-i18n-html="key"  -> innerHTML (only for trusted, static markup in the dictionary)
 * data-i18n-attr="attr:key" -> sets a given attribute instead of text
 */
(function () {
  "use strict";

  var STORAGE_KEY = "lt-lang";
  var DEFAULT_LANG = "es";

  var dict = {
    es: {
      "meta.title.home": "Lab Technology C.A. | Equipos e insumos para laboratorios clínicos en Venezuela",
      "meta.desc.home": "Lab Technology C.A. comercializa reactivos, equipos de laboratorio, equipos médicos y mobiliario clínico de marcas como Mindray, Beckman Coulter, Werfen, Abbott y Biobase, con servicio técnico especializado en Venezuela.",
      "meta.title.catalog": "Catálogo de Productos | Lab Technology C.A.",
      "meta.desc.catalog": "Explora el catálogo completo de equipos de laboratorio, reactivos y equipos médicos de Lab Technology C.A.: hematología, química sanguínea, gases arteriales, inmunoanálisis, coagulación y más.",

      "nav.home": "Inicio",
      "nav.about": "Nosotros",
      "nav.mission": "Misión y Visión",
      "nav.brands": "Marcas",
      "nav.catalog": "Catálogo",
      "nav.contact": "Contáctanos",
      "nav.cta": "Solicitar cotización",
      "nav.toggle": "Abrir menú",

      "hero.eyebrow": "Distribuidor autorizado de insumos clínicos",
      "hero.title.html": "Tecnología de laboratorio que <span class=\"accent\">cuida cada diagnóstico</span>",
      "hero.lede": "Comercializamos reactivos, equipos médicos y de laboratorio, material descartable y mobiliario clínico. Realizamos servicio técnico especializado, instalación y mantenimiento preventivo.",
      "hero.cta.catalog": "Ver catálogo completo",
      "hero.cta.contact": "Hablar con un asesor",
      "hero.stat1.num": "+100",
      "hero.stat1.label": "Clientes satisfechos",
      "hero.stat2.num": "+40",
      "hero.stat2.label": "Productos en catálogo",
      "hero.stat3.num": "+10",
      "hero.stat3.label": "Años en el mercado",

      "about.eyebrow": "¿Quiénes somos?",
      "about.title": "Soluciones integrales para laboratorios clínicos.",
      "about.p1": "Nos especializamos en la comercialización de insumos para laboratorios clínicos: reactivos, equipos médicos, material descartable y mobiliario clínico.",
      "about.p2": "Brindamos servicio técnico especializado, instalación, mantenimiento preventivo y correctivo de equipos de laboratorio, así como el suministro continuo de insumos, materiales y accesorios.",
      "about.p3": "Distribuimos productos fabricados en Estados Unidos, China, Alemania, Argentina y España, por marcas que avalan la excelente calidad de sus mercancías con ensayos clínicos y certificados.",
      "about.origin1": "Fabricado en EE. UU.",
      "about.origin2": "Fabricado en China",
      "about.origin3": "Fabricado en Alemania",
      "about.origin4": "Fabricado en Argentina",
      "about.origin5": "Fabricado en España",
      "about.brandlabel": "Marcas representadas",

      "mission.eyebrow": "Lo que nos mueve",
      "mission.title": "Misión, visión y valores",
      "mission.subtitle": "Los principios que guían cada equipo que instalamos y cada relación que construimos.",
      "mission.card.title": "MISIÓN",
      "mission.card.text": "Impulsar el desarrollo del sector salud mediante la comercialización de equipos médicos, equipos de laboratorio, reactivos e insumos clínicos de la más alta calidad, respaldados por un servicio técnico especializado, asesoría profesional y soluciones integrales que garanticen precisión diagnóstica, eficiencia operativa y excelencia en cada proceso de nuestros clientes. Nos comprometemos a establecer relaciones comerciales sólidas basadas en la confianza, la innovación y la mejora continua.",
      "vision.card.title": "VISIÓN",
      "vision.card.text": "Consolidarnos como una de las empresas líderes en la distribución de equipos médicos, tecnología para laboratorios clínicos, reactivos e insumos especializados en Venezuela y Latinoamérica, siendo reconocidos por nuestra innovación, calidad de servicio, respaldo técnico y compromiso con el fortalecimiento del sistema de salud, contribuyendo al bienestar de las personas mediante soluciones tecnológicas confiables y de alto desempeño.",
      "values.card.title": "VALORES",
      "values.v1": "Responsabilidad y dedicación para superar las expectativas de nuestros clientes.",
      "values.v2": "Innovación tecnológica para ofrecer soluciones eficientes al sector salud.",
      "values.v3": "Ética y transparencia en cada una de nuestras relaciones comerciales.",
      "values.v4": "Asesoría personalizada enfocada en las necesidades de cada cliente.",
      "values.v5": "Calidad y confiabilidad para cumplir con los mas altos estándares.",

      "brands.eyebrow": "Respaldo internacional",
      "brands.title": "Marcas comercializadas",
      "brands.subtitle": "Trabajamos con fabricantes líderes a nivel mundial que avalan la calidad de cada equipo con ensayos clínicos y certificaciones internacionales.",
      "brands.note": "Ofrecemos a nuestros clientes insumos y equipos de alta calidad, eficiencia en la cadena de suministro, una plataforma logística robusta y flexible, y una excelente relación fabricante–distribuidor a precios competitivos.",

      "catteaser.eyebrow": "Catálogo de productos",
      "catteaser.title": "Un catálogo completo para tu laboratorio",
      "catteaser.subtitle": "Explora nuestras diferentes categorias de productos: desde analizadores hematológicos hasta equipos de quirófano y neonatología.",
      "catteaser.viewall": "Ver catálogo completo",

      "cat.diagnostico.name": "Diagnóstico clínico",
      "cat.diagnostico.tagline": "Analizadores hematológicos automatizados",
      "cat.especializado.name": "Análisis especializado",
      "cat.especializado.tagline": "Analizadores de bioquímica clínica",
      "cat.laboratorio.name": "Equipos de laboratorio",
      "cat.laboratorio.tagline": "Análisis de gases y electrólitos en sangre",
      "cat.reactivosinsumos.name": "Reactivos e insumos",
      "cat.reactivosinsumos.tagline": "Inmunoensayo, ELISA y electroquimioluminiscencia",
      "cat.hospitalarios.name": "Equipos médicos hospitalarios",
      "cat.hospitalarios.tagline": "Analizadores de hemostasia",
      "cat.monitoreo.name": "Diagnóstico y monitoreo médico",
      "cat.monitoreo.tagline": "Centrífugas, baños de maría y pipetas",

      "cta.title": "¿Listo para equipar tu laboratorio?",
      "cta.text": "Escríbenos y te ayudamos a encontrar el equipo, reactivo o insumo ideal para tu institución, con asesoría técnica personalizada.",
      "cta.action1": "Ver catálogo",
      "cta.action2": "Contactar por WhatsApp",

      "contact.eyebrow": "Estamos para ayudarte",
      "contact.title": "Contáctanos",
      "contact.subtitle": "Recibe asesoría personalizada para equipar tu laboratorio con los mejores insumos y reactivos.",
      "contact.phone.label": "Teléfono",
      "contact.mail.label": "Correo electrónico",
      "contact.ig.label": "Instagram",
      "contact.form.name": "Nombre completo",
      "contact.form.email": "Correo electrónico",
      "contact.form.institution": "Institución / Laboratorio",
      "contact.form.message": "Mensaje",
      "contact.form.message.placeholder": "Cuéntanos qué equipo, reactivo o insumo necesitas…",
      "contact.form.submit": "Enviar mensaje",
      "contact.form.note": "Al enviar este formulario se abrirá tu cliente de correo con los datos completados hacia labtecnology@gmail.com.",

      "footer.tagline": "Insumos y equipos de alta calidad para laboratorios clínicos, con servicio técnico especializado en toda Venezuela.",
      "footer.nav.title": "Navegación",
      "footer.cat.title": "Categorías",
      "footer.contact.title": "Contacto",
      "footer.rights": "© 2026 Lab Tecnology C.A. — RIF: J504074810. Todos los derechos reservados.",
      "footer.credit": "Diseñado con precisión clínica.",

      "backtotop.label": "Volver arriba",

      "catalog.crumb.home": "Inicio",
      "catalog.crumb.current": "Catálogo",
      "catalog.title": "Catálogo de productos",
      "catalog.subtitle": "Equipos de laboratorio, equipos médicos, reactivos y pruebas rápidas, organizados por especialidad para que encuentres exactamente lo que tu laboratorio necesita.",
      "catalog.filter.all": "Todas las categorías",
      "catalog.count.suffix": "productos",
      "catalog.card.quote": "Cotizar",
      "catalog.noresults": "No se encontraron productos en esta categoría.",

      "modal.quote.subject": "Cotización",
      "modal.quote.cta": "Solicitar cotización",
      "modal.close": "Cerrar"
    },

    en: {
      "meta.title.home": "Lab Technology C.A. | Clinical Laboratory Equipment & Supplies in Venezuela",
      "meta.desc.home": "Lab Technology C.A. distributes reagents, laboratory equipment, medical devices and clinical furniture from brands like Mindray, Beckman Coulter, Werfen, Abbott and Biobase, with specialized technical service in Venezuela.",
      "meta.title.catalog": "Product Catalog | Lab Technology C.A.",
      "meta.desc.catalog": "Browse the full catalog of laboratory equipment, reagents and medical devices from Lab Technology C.A.: hematology, blood chemistry, blood gases, immunoassay, coagulation and more.",

      "nav.home": "Home",
      "nav.about": "About Us",
      "nav.mission": "Mission & Vision",
      "nav.brands": "Brands",
      "nav.catalog": "Catalog",
      "nav.contact": "Contact",
      "nav.cta": "Request a quote",
      "nav.toggle": "Open menu",

      "hero.eyebrow": "Authorized distributor of clinical supplies",
      "hero.title.html": "Laboratory technology that <span class=\"accent\">protects every diagnosis</span>",
      "hero.lede": "We commercialize reagents, medical and laboratory equipment, disposable materials and clinical furniture. We provide specialized technical service, installation and preventive maintenance.",
      "hero.cta.catalog": "View full catalog",
      "hero.cta.contact": "Talk to an advisor",
      "hero.stat1.num": "+100",
      "hero.stat1.label": "Satisfied clients",
      "hero.stat2.num": "+40",
      "hero.stat2.label": "Products in catalog",
      "hero.stat3.num": "+10",
      "hero.stat3.label": "Years in the market",

      "about.eyebrow": "About us",
      "about.title": "Integral solutions for clinical laboratories.",
      "about.p1": "We specialize in the distribution of supplies for clinical laboratories: reagents, medical equipment, disposables, and clinical furniture.",
      "about.p2": "We provide specialized technical service, installation, and preventive and corrective maintenance of laboratory equipment, along with a continuous supply of consumables, materials and accessories.",
      "about.p3": "Our products are manufactured in the United States, China, Germany, Argentina and Spain, by brands that back the excellent quality of their goods with clinical trials and certifications issued by competent authorities.",
      "about.origin1": "Made in the USA",
      "about.origin2": "Made in China",
      "about.origin3": "Made in Germany",
      "about.origin4": "Made in Argentina",
      "about.origin5": "Made in Spain",
      "about.brandlabel": "Brands represented",

      "mission.eyebrow": "What drives us",
      "mission.title": "Mission, vision and values",
      "mission.subtitle": "The principles that guide every piece of equipment we install and every relationship we build.",
      "mission.card.title": "MISSION",
      "mission.card.text": "To drive the development of the healthcare sector through the commercialization of top-quality medical devices, laboratory equipment, reagents, and clinical supplies, backed by specialized technical service, professional guidance, and comprehensive solutions that ensure diagnostic accuracy, operational efficiency, and excellence in every process of our clients. We are committed to building solid business relationships based on trust, innovation, and continuous improvement.",
      "vision.card.title": "VISION",
      "vision.card.text": "To consolidate our position as one of the leading companies in the distribution of medical devices, clinical laboratory technology, reagents, and specialized supplies in Venezuela and Latin America, being recognized for our innovation, quality of service, technical support, and commitment to strengthening the healthcare system, contributing to people's well-being through reliable and high-performance technological solutions.",
      "values.card.title": "VALUES",
      "values.v1": "Responsibility and dedication to exceed our clients' expectations.",
      "values.v2": "Technological innovation to deliver efficient solutions to the healthcare sector.",
      "values.v3": "Ethics and transparency in each of our business relationships.",
      "values.v4": "Personalized guidance focused on the specific needs of each client.",
      "values.v5": "Quality and reliability to meet the highest standards.",

      "brands.eyebrow": "International backing",
      "brands.title": "Brands we distribute",
      "brands.subtitle": "We work with leading global manufacturers that back the quality of every device with clinical trials and international certifications.",
      "brands.note": "We offer our clients high-quality supplies and equipment, efficient supply chain management, a robust and flexible logistics platform, and an excellent manufacturer–distributor relationship at competitive prices.",

      "catteaser.eyebrow": "Product catalog",
      "catteaser.title": "A complete catalog for your laboratory",
      "catteaser.subtitle": "Explore our different product lines: from hematology analyzers to operating room and neonatology equipment.",
      "catteaser.viewall": "View full catalog",

      "cat.diagnostico.name": "Clinical Diagnostics",
      "cat.diagnostico.tagline": "Automated hematology analyzers",
      "cat.especializado.name": "Specialized Analysis",
      "cat.especializado.tagline": "Clinical chemistry analyzers",
      "cat.laboratorio.name": "Laboratory Equipment",
      "cat.laboratorio.tagline": "Blood gas and electrolyte analysis",
      "cat.reactivosinsumos.name": "Reagents and Supplies",
      "cat.reactivosinsumos.tagline": "Immunoassay, ELISA and electrochemiluminescence",
      "cat.hospitalarios.name": "Medical and Hospital Equipment",
      "cat.hospitalarios.tagline": "Hemostasis analyzers",
      "cat.monitoreo.name": "Medical Diagnostics and Monitoring",
      "cat.monitoreo.tagline": "Centrifuges, water baths and pipettes",

      "cta.title": "Ready to equip your laboratory?",
      "cta.text": "Reach out and we'll help you find the ideal equipment, reagent or supply for your institution, with personalized technical guidance.",
      "cta.action1": "View catalog",
      "cta.action2": "Contact via WhatsApp",

      "contact.eyebrow": "We're here to help",
      "contact.title": "Contact us",
      "contact.subtitle": "Our team is ready to advise you on the equipment, reagent or supply your laboratory needs.",
      "contact.phone.label": "Phone",
      "contact.mail.label": "Email",
      "contact.ig.label": "Instagram",
      "contact.form.name": "Full name",
      "contact.form.email": "Email address",
      "contact.form.institution": "Institution / Laboratory",
      "contact.form.message": "Message",
      "contact.form.message.placeholder": "Tell us which equipment, reagent or supply you need…",
      "contact.form.submit": "Send message",
      "contact.form.note": "Submitting this form opens your email client with the details filled in to labtecnology@gmail.com.",

      "footer.tagline": "High-quality supplies and equipment for clinical laboratories, with specialized technical service across Venezuela.",
      "footer.nav.title": "Navigation",
      "footer.cat.title": "Categories",
      "footer.contact.title": "Contact",
      "footer.rights": "© 2026 Lab Tecnology C.A. — RIF: J504074810. All rights reserved.",
      "footer.credit": "Designed with clinical precision.",

      "backtotop.label": "Back to top",

      "catalog.crumb.home": "Home",
      "catalog.crumb.current": "Catalog",
      "catalog.title": "Product catalog",
      "catalog.subtitle": "Laboratory equipment, medical devices, reagents and rapid tests, organized by specialty so you find exactly what your laboratory needs.",
      "catalog.filter.all": "All categories",
      "catalog.count.suffix": "products",
      "catalog.card.quote": "Quote",
      "catalog.noresults": "No products were found in this category.",

      "modal.quote.subject": "Quote request",
      "modal.quote.cta": "Request a quote",
      "modal.close": "Close"
    }
  };

  function getLang() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    return stored === "en" || stored === "es" ? stored : DEFAULT_LANG;
  }

  function setLang(lang) {
    if (lang !== "en" && lang !== "es") return;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    applyLang(lang);
    document.dispatchEvent(new CustomEvent("lt:langchange", { detail: { lang: lang } }));
  }

  function t(key, lang) {
    lang = lang || getLang();
    var table = dict[lang] || dict[DEFAULT_LANG];
    return Object.prototype.hasOwnProperty.call(table, key) ? table[key] : key;
  }

  function applyLang(lang) {
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"), lang);
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"), lang);
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var parts = pair.split(":");
        if (parts.length !== 2) return;
        el.setAttribute(parts[0].trim(), t(parts[1].trim(), lang));
      });
    });

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang") === lang ? "true" : "false");
    });

    var titleKey = document.body.getAttribute("data-title-key");
    var descKey = document.body.getAttribute("data-desc-key");
    if (titleKey) document.title = t(titleKey, lang);
    if (descKey) {
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", t(descKey, lang));
    }
  }

  window.LT_I18N = { getLang: getLang, setLang: setLang, t: t, applyLang: applyLang };

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(getLang());
    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang"));
      });
    });
  });
})();