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
      "meta.title.home": "Lab Tecnology C.A. | Equipos e insumos para laboratorios clínicos en Venezuela",
      "meta.desc.home": "Lab Tecnology C.A. comercializa reactivos, equipos de laboratorio, equipos médicos y mobiliario clínico de marcas como Mindray, Beckman Coulter, Werfen, Abbott y Biobase, con servicio técnico especializado en Venezuela.",
      "meta.title.catalog": "Catálogo de Productos | Lab Tecnology C.A.",
      "meta.desc.catalog": "Explora el catálogo completo de equipos de laboratorio, reactivos y equipos médicos de Lab Tecnology C.A.: hematología, química sanguínea, gases arteriales, inmunoanálisis, coagulación y más.",

      "nav.home": "Inicio",
      "nav.about": "Nosotros",
      "nav.mission": "Misión y Visión",
      "nav.brands": "Marcas",
      "nav.catalog": "Catálogo",
      "nav.contact": "Contáctanos",
      "nav.cta": "Solicitar cotización",
      "nav.toggle": "Abrir menú",

      /* Hero */
      "hero.eyebrow": "Distribuidor autorizado de insumos médicos",
      "hero.title.html": "Venta de equipos de laboratorio clínico, insumos <span class=\"accent\">y reactivos médicos en Venezuela</span>",
      "hero.lede": "Comercializamos equipos médicos y de laboratorio, material descartable y mobiliario clínico. Realizamos servicio técnico especializado, instalación y mantenimiento preventivo.",
      "hero.cta.catalog": "Ver catálogo completo",
      "hero.cta.contact": "Hablar con un asesor",
      "hero.stat1.num": "+100",
      "hero.stat1.label": "Clientes satisfechos",
      "hero.stat2.num": "+40",
      "hero.stat2.label": "Productos en catálogo",
      "hero.stat3.num": "+4",
      "hero.stat3.label": "Años en el mercado",

      /* Nosotros */
      "about.eyebrow": "¿Quiénes somos?",
      "about.title": "Soluciones integrales para laboratorios clínicos en Venezuela.",
      "about.p1": "Nos especializamos en la comercialización de insumos para laboratorios clínicos: reactivos, equipos médicos, material descartable y mobiliario clínico.",
      "about.p2": "Brindamos servicio técnico especializado, instalación, mantenimiento preventivo y correctivo de equipos de laboratorio, así como el suministro continuo de insumos, materiales y accesorios.",
      "about.p3": "Distribuimos productos fabricados en Estados Unidos, China, Alemania, Argentina y España, por marcas que avalan la excelente calidad de sus mercancías con ensayos clínicos y certificados.",
      "about.origin1": "Fabricado en EE. UU.",
      "about.origin2": "Fabricado en China",
      "about.origin3": "Fabricado en Alemania",
      "about.origin4": "Fabricado en Argentina",
      "about.origin5": "Fabricado en España",
      "about.brandlabel": "Marcas representadas",

      /* Misión / Visión */
      "mission.eyebrow": "Lo que nos mueve",
      "mission.title": "Misión, visión y valores de Lab Tecnology.",
      "mission.subtitle": "Los principios que guían cada equipo que instalamos y cada relación que construimos.",
      "mission.card.title": "MISIÓN",
      "mission.card.text": "Impulsar el desarrollo del sector salud mediante la comercialización de equipos médicos, equipos de laboratorio, reactivos e insumos clínicos de la más alta calidad, respaldados por un servicio técnico especializado, asesoría profesional y soluciones integrales que garanticen precisión diagnóstica, eficiencia operativa y excelencia en cada proceso de nuestros clientes. Nos comprometemos a establecer relaciones comerciales sólidas basadas en la confianza, la innovación y la mejora continua.",
      "vision.card.title": "VISIÓN",
      "vision.card.text": "Consolidarnos como una de las empresas líderes en la distribución de equipos médicos, tecnología para laboratorios clínicos, reactivos e insumos especializados en Venezuela y Latinoamérica, siendo reconocidos por nuestra innovación, calidad de servicio, respaldo técnico y compromiso con el fortalecimiento del sistema de salud, contribuyendo al bienestar de las personas mediante soluciones tecnológicas confiables y de alto desempeño.",
      "values.card.title": "VALORES",
      "values.v1": "Responsabilidad para superar las expectativas de nuestros clientes.",
      "values.v2": "Innovación tecnológica para ofrecer soluciones eficientes al sector salud.",
      "values.v3": "Ética y transparencia en cada una de nuestras relaciones comerciales.",
      "values.v4": "Asesoría personalizada enfocada en las necesidades de cada cliente.",
      "values.v5": "Calidad y confiabilidad para cumplir con los más altos estándares.",

      /* Marcas */
      "brands.eyebrow": "Respaldo internacional",
      "brands.title": "Comercialización y soporte técnico de Biobase y Edan en Venezuela.",
      "brands.subtitle": "Trabajamos con fabricantes líderes a nivel mundial que avalan la calidad de cada equipo con ensayos clínicos y certificaciones internacionales.",
      "brands.note": "Ofrecemos a nuestros clientes insumos y equipos de alta calidad, eficiencia en la cadena de suministro, una plataforma logística robusta y flexible, y una excelente relación fabricante–distribuidor a precios competitivos.",

      /* Catálogo Teaser */
      "catteaser.eyebrow": "Catálogo de productos",
      "catteaser.title": "Catálogo de equipos de laboratorio y reactivos clínicos.",
      "catteaser.subtitle": "Explora nuestras diferentes categorías de productos: desde analizadores hematológicos hasta equipos de quirófano y neonatología.",
      "catteaser.viewall": "Ver catálogo completo",

      "cat.diagnostico.name": "Diagnóstico clínico",
      "cat.diagnostico.tagline": "Analizadores hematológicos automatizados",
      "cat.gasesarteriales.name": "Gases arteriales",
      "cat.gasesarteriales.tagline": "Análisis de gases y electrólitos en sangre",
      "cat.laboratorio.name": "Equipos de laboratorio",
      "cat.laboratorio.tagline": "Equipos de laboratorio de alta calidad",
      "cat.reactivosinsumos.name": "Reactivos e insumos",
      "cat.reactivosinsumos.tagline": "Inmunoensayo, ELISA y electroquimioluminiscencia",
      "cat.hospitalarios.name": "Equipos médicos hospitalarios",
      "cat.hospitalarios.tagline": "Analizadores de hemostasia",
      "cat.monitoreo.name": "Diagnóstico y monitoreo médico",
      "cat.monitoreo.tagline": "Centrífugas, baños de maría y pipetas",

      /* CTA Banner */
      "cta.title": "¿Listo para equipar tu laboratorio?",
      "cta.text": "Escríbenos y te ayudamos a encontrar el equipo, reactivo o insumo ideal para tu institución, con asesoría técnica personalizada.",
      "cta.action1": "Ver catálogo",
      "cta.action2": "Contactar por WhatsApp",

      /* Contacto */
      "contact.eyebrow": "Estamos para ayudarte",
      "contact.title": "Solicita una asesoría técnica para equipar tu laboratorio en Venezuela.",
      "contact.subtitle": "Atención personalizada para equipar tu laboratorio con los mejores insumos y reactivos.",
      "contact.phone.label": "Teléfono",
      "contact.mail.label": "Correo electrónico",
      "contact.ig.label": "Instagram",
      "contact.form.name": "Nombre completo",
      "contact.form.email": "Correo electrónico",
      "contact.form.institution": "Institución / Laboratorio",
      "contact.form.message": "Mensaje",
      "contact.form.message.placeholder": "Cuéntanos qué equipo, reactivo o insumo necesitas…",
      "contact.form.submit": "Enviar mensaje",

      /* FAQ Section */
      "faq.eyebrow": "Resolvemos tus dudas",
      "faq.title": "Preguntas frecuentes sobre nuestros equipos e insumos.",
      "faq.subtitle": "Todo lo que necesitas saber sobre nuestra distribución, marcas y servicio técnico en Venezuela.",
      "faq.q1": "¿Dónde distribuyen los equipos de laboratorio clínico?",
      "faq.a1": "Lab Tecnology C.A. suministra equipos de laboratorio clínico en Caracas y en toda Venezuela, con entrega, instalación y servicio técnico incluido.",
      "faq.q2": "¿Qué marcas de insumos médicos distribuyen en Venezuela?",
      "faq.a2": "Comercialización de productos de las siguientes marcas: Mindray, Beckman Coulter, Werfen, Abbott y Biobase, todas respaldadas por ensayos clínicos y certificaciones internacionales de calidad, disponibles a través de Lab Tecnology C.A. en Venezuela.",
      "faq.q3": "¿Ofrecen servicio técnico de equipos de laboratorio en Venezuela?",
      "faq.a3": "Ofrecemos servicio técnico de equipos de laboratorio en Venezuela, incluyendo instalación, mantenimiento preventivo y correctivo para todas las marcas que comercializamos.",
      "faq.q4": "¿Venden equipos médicos hospitalarios en Venezuela?",
      "faq.a4": "Lab Tecnology C.A. comercializa equipos médicos hospitalarios en Venezuela, incluyendo analizadores de hemostasia y equipos de diagnóstico y monitoreo para clínicas y hospitales.",
      "faq.q5": "¿Venden mobiliario clínico para laboratorio?",
      "faq.a5": "Ofrecemos mobiliario clínico para laboratorio de alta calidad, diseñado para equipar de forma completa e integral las instalaciones de tu institución de salud.",

      /* Footer */
      "footer.tagline": "Insumos y equipos de alta calidad para laboratorios clínicos, con servicio técnico especializado en toda Venezuela.",
      "footer.nav.title": "Navegación",
      "footer.cat.title": "Categorías",
      "footer.contact.title": "Contacto",
      "nav.faq": "Preguntas frecuentes",
      "footer.rights": "© 2026 Lab Tecnology C.A. — RIF: J504074810. Todos los derechos reservados.",
      "footer.credit": "Diseñado con precisión clínica.",

      "backtotop.label": "Volver arriba",

      /* Catálogo Page */
      "catalog.crumb.home": "Inicio",
      "catalog.crumb.current": "Catálogo",
      "catalog.title": "Catálogo de equipos de laboratorio y reactivos clínicos en Venezuela",
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
      "meta.title.home": "Lab Tecnology C.A. | Clinical Laboratory Equipment & Supplies in Venezuela",
      "meta.desc.home": "Lab Tecnology C.A. distributes reagents, laboratory equipment, medical devices and clinical furniture from brands like Mindray, Beckman Coulter, Werfen, Abbott and Biobase, with specialized technical service in Venezuela.",
      "meta.title.catalog": "Product Catalog | Lab Tecnology C.A.",
      "meta.desc.catalog": "Browse the full catalog of laboratory equipment, reagents and medical devices from Lab Tecnology C.A.: hematology, blood chemistry, blood gases, immunoassay, coagulation and more.",

      "nav.home": "Home",
      "nav.about": "About Us",
      "nav.mission": "Mission & Vision",
      "nav.brands": "Brands",
      "nav.catalog": "Catalog",
      "nav.contact": "Contact",
      "nav.cta": "Request a quote",
      "nav.toggle": "Open menu",

      /* Hero English */
      "hero.eyebrow": "Authorized distributor of medical supplies",
      "hero.title.html": "Sale of clinical laboratory equipment, supplies <span class=\"accent\">and medical reagents in Venezuela</span>",
      "hero.lede": "We commercialize medical and laboratory equipment, disposable materials and clinical furniture. We provide specialized technical service, installation and preventive maintenance.",
      "hero.cta.catalog": "View full catalog",
      "hero.cta.contact": "Talk to an advisor",
      "hero.stat1.num": "+100",
      "hero.stat1.label": "Satisfied clients",
      "hero.stat2.num": "+40",
      "hero.stat2.label": "Products in catalog",
      "hero.stat3.num": "+4",
      "hero.stat3.label": "Years in the market",

      /* About English */
      "about.eyebrow": "About us",
      "about.title": "Integral solutions for clinical laboratories in Venezuela.",
      "about.p1": "We specialize in the distribution of supplies for clinical laboratories: reagents, medical equipment, disposables, and clinical furniture.",
      "about.p2": "We provide specialized technical service, installation, and preventive and corrective maintenance of laboratory equipment, along with a continuous supply of consumables, materials and accessories.",
      "about.p3": "Our products are manufactured in the United States, China, Germany, Argentina and Spain, by brands that back the excellent quality of their goods with clinical trials and certifications issued by competent authorities.",
      "about.origin1": "Made in the USA",
      "about.origin2": "Made in China",
      "about.origin3": "Made in Germany",
      "about.origin4": "Made in Argentina",
      "about.origin5": "Made in Spain",
      "about.brandlabel": "Brands represented",

      /* Mission English */
      "mission.eyebrow": "What drives us",
      "mission.title": "Mission, vision and values of Lab Tecnology.",
      "mission.subtitle": "The principles that guide every piece of equipment we install and every relationship we build.",
      "mission.card.title": "MISSION",
      "mission.card.text": "To drive the development of the healthcare sector through the commercialization of top-quality medical devices, laboratory equipment, reagents, and clinical supplies, backed by specialized technical service, professional guidance, and comprehensive solutions that ensure diagnostic accuracy, operational efficiency, and excellence in every process of our clients. We are committed to building solid business relationships based on trust, innovation, and continuous improvement.",
      "vision.card.title": "VISION",
      "vision.card.text": "To consolidate our position as one of the leading companies in the distribution of medical devices, clinical laboratory technology, reagents, and specialized supplies in Venezuela and Latin America, being recognized for our innovation, quality of service, technical support, and commitment to strengthening the healthcare system, contributing to people's well-being through reliable and high-performance technological solutions.",
      "values.card.title": "VALUES",
      "values.v1": "Responsibility to exceed our clients' expectations.",
      "values.v2": "Technological innovation to deliver efficient solutions to the healthcare sector.",
      "values.v3": "Ethics and transparency in each of our business relationships.",
      "values.v4": "Personalized guidance focused on the specific needs of each client.",
      "values.v5": "Quality and reliability to meet the highest standards.",

      /* Brands English */
      "brands.eyebrow": "International backing",
      "brands.title": "Marketing and technical support for Biobase and Edan in Venezuela.",
      "brands.subtitle": "We work with leading global manufacturers that back the quality of every device with clinical trials and international certifications.",
      "brands.note": "We offer our clients high-quality supplies and equipment, efficient supply chain management, a robust and flexible logistics platform, and an excellent manufacturer–distributor relationship at competitive prices.",

      /* Catalog Teaser English */
      "catteaser.eyebrow": "Product catalog",
      "catteaser.title": "Catalog of laboratory equipment and clinical reagents.",
      "catteaser.subtitle": "Explore our different product lines: from hematology analyzers to operating room and neonatology equipment.",
      "catteaser.viewall": "View full catalog",

      "cat.diagnostico.name": "Clinical Diagnostics",
      "cat.diagnostico.tagline": "Automated hematology analyzers",
      "cat.gasesarteriales.name": "Arterial blood gases",
      "cat.gasesarteriales.tagline": "Blood gas and electrolyte analysis",
      "cat.laboratorio.name": "Laboratory Equipment",
      "cat.laboratorio.tagline": "High-quality laboratory equipment",
      "cat.reactivosinsumos.name": "Reagents and Supplies",
      "cat.reactivosinsumos.tagline": "Immunoassay, ELISA and electrochemiluminescence",
      "cat.hospitalarios.name": "Medical and Hospital Equipment",
      "cat.hospitalarios.tagline": "Hemostasis analyzers",
      "cat.monitoreo.name": "Medical Diagnostics and Monitoring",
      "cat.monitoreo.tagline": "Centrifuges, water baths and pipettes",

      /* CTA Banner English */
      "cta.title": "Ready to equip your laboratory?",
      "cta.text": "Reach out and we'll help you find the ideal equipment, reagent or supply for your institution, with personalized technical guidance.",
      "cta.action1": "View catalog",
      "cta.action2": "Contact via WhatsApp",

      /* Contact English */
      "contact.eyebrow": "We're here to help",
      "contact.title": "Request technical guidance to equip your laboratory in Venezuela.",
      "contact.subtitle": "Personalized attention to equip your laboratory with the best supplies and reagents.",
      "contact.phone.label": "Phone",
      "contact.mail.label": "Email",
      "contact.ig.label": "Instagram",
      "contact.form.name": "Full name",
      "contact.form.email": "Email address",
      "contact.form.institution": "Institution / Laboratory",
      "contact.form.message": "Message",
      "contact.form.message.placeholder": "Tell us which equipment, reagent or supply you need…",
      "contact.form.submit": "Send message",

      /* FAQ Section English */
      "faq.eyebrow": "Frequently Asked Questions",
      "faq.title": "Frequently asked questions about our equipment and supplies.",
      "faq.subtitle": "Everything you need to know about our distribution, brands, and technical service in Venezuela.",
      "faq.q1": "Where do you distribute clinical laboratory equipment?",
      "faq.a1": "Lab Tecnology C.A. supplies clinical laboratory equipment in Caracas and throughout Venezuela, including delivery, installation, and technical service.",
      "faq.q2": "What brands of medical supplies do you distribute in Venezuela?",
      "faq.a2": "Marketing of products from the following brands Mindray, Beckman Coulter, Werfen, Abbott, and Biobase, all backed by clinical trials and international quality certifications, available through Lab Tecnology C.A. in Venezuela.",
      "faq.q3": "Do you offer technical service for laboratory equipment in Venezuela?",
      "faq.a3": "We offer technical service for laboratory equipment in Venezuela, including installation, preventive maintenance, and corrective repairs for all brands we commercialize.",
      "faq.q4": "Do you sell hospital medical equipment in Venezuela?",
      "faq.a4": "Lab Tecnology C.A. sells hospital medical devices in Venezuela, including hemostasis analyzers as well as diagnostic and monitoring equipment for clinics and hospitals.",
      "faq.q5": "Do you sell clinical laboratory furniture?",
      "faq.a5": "We offer high-quality clinical laboratory furniture designed to fully equip your healthcare institution's facilities.",

      /* Footer English */
      "footer.tagline": "High-quality supplies and equipment for clinical laboratories, with specialized technical service across Venezuela.",
      "footer.nav.title": "Navigation",
      "footer.cat.title": "Categories",
      "footer.contact.title": "Contact",
      "nav.faq": "FAQ",
      "footer.rights": "© 2026 Lab Tecnology C.A. — RIF: J504074810. All rights reserved.",
      "footer.credit": "Designed with clinical precision.",

      "backtotop.label": "Back to top",

      /* Catalog Page English */
      "catalog.crumb.home": "Home",
      "catalog.crumb.current": "Catalog",
      "catalog.title": "Catalog of laboratory equipment and clinical reagents in Venezuela",
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
    if (stored === "en" || stored === "es") return stored;
    
    var htmlLang = document.documentElement.getAttribute("lang");
    return htmlLang === "en" || htmlLang === "es" ? htmlLang : DEFAULT_LANG;
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