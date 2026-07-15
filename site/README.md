# Lab Technology C.A. — Sitio Web Corporativo

Sitio web bilingüe (ES/EN) para **Lab Technology C.A.**, distribuidor de reactivos, equipos
de laboratorio, equipos médicos y mobiliario clínico en Venezuela.

## 🧱 Arquitectura de carpetas

```
site/
├── index.html              # Página de inicio (Nosotros, Misión/Visión, Marcas, CTA, Contacto)
├── catalogo.html            # Catálogo completo de productos (9 categorías, ~47 productos)
├── robots.txt                # Directivas para motores de búsqueda
├── sitemap.xml                # Mapa del sitio para indexación SEO
├── data/
│   └── products.json          # Fuente única de verdad: categorías y productos (ES/EN)
└── assets/
    ├── css/
    │   ├── base.css            # Tokens de diseño (colores, tipografía, espaciado), reset
    │   ├── components.css       # Botones, header/nav, cards, footer, animaciones reveal
    │   ├── home.css              # Hero, secciones de la home (Nosotros, Misión, Marcas, CTA, Contacto)
    │   └── catalog.css            # Página de catálogo, filtros, grid de productos, modal
    ├── js/
    │   ├── i18n.js                 # Motor de traducción ES/EN (diccionario + aplicación al DOM)
    │   ├── main.js                  # Interacciones compartidas: nav, scroll, reveal, contador, formulario
    │   └── catalog.js                # Renderizado de categorías/productos, filtros, modal de cotización
    └── img/
        └── brand/
            ├── logo.png                # Logotipo oficial (fondo transparente)
            ├── marcas.png                # Collage de marcas comercializadas
            └── favicon-*.png               # Set de favicons generado a partir del logo

```

## 🎨 Sistema de diseño

- **Paleta de colores**: blanco/paper, verdes y azules extraídos directamente del logotipo
  de Lab Technology (ver variables `--c-green-*`, `--c-blue-*` en `base.css`). No se usa
  ningún color fuera de esta paleta.
- **Tipografía**: Space Grotesk (títulos), Inter (texto), IBM Plex Mono (datos técnicos /
  etiquetas), cargadas vía Google Fonts.
- **Motivo visual**: el sitio usa el símbolo atómico del logo como elemento decorativo
  animado (órbitas girando en el hero) y un panel de "lectura de instrumento" con línea de
  escaneo, evocando los analizadores de laboratorio del catálogo.
- **Iconografía**: sprite SVG propio (inline en cada página), sin dependencias externas ni
  íconos de terceros con derechos reservados.

## 🌐 Internacionalización (ES/EN)

Todo el copy vive en `assets/js/i18n.js` dentro de un diccionario `dict.es` / `dict.en`.
Los elementos HTML se marcan con:

- `data-i18n="clave"` → reemplaza `textContent`
- `data-i18n-html="clave"` → reemplaza `innerHTML` (para markup controlado, como el
  `<span class="accent">` del título del hero)
- `data-i18n-attr="atributo:clave"` → reemplaza un atributo (ej. `aria-label`, `placeholder`)

El idioma se persiste en `localStorage` y el catálogo se re-renderiza automáticamente al
cambiar de idioma (evento `lt:langchange`).

## 🗂️ Catálogo de productos

El catálogo se genera dinámicamente desde `data/products.json`, que contiene:

- `categories`: 9 líneas de producto (hematología, química sanguínea, electrólitos y gases
  arteriales, inmunoanálisis, coagulación, equipos auxiliares, reactivos y pruebas rápidas,
  quirófano/UCI/hospitalización, obstetricia/neonatología/ECG).
- `products`: ~47 productos extraídos del catálogo PDF proporcionado, cada uno con nombre,
  marca y descripción optimizada para SEO en español e inglés.

Para agregar o editar un producto, solo se debe modificar `data/products.json` — el HTML y
JS no requieren cambios.

## ⚙️ Cómo ejecutar el sitio localmente

`catalogo.html` carga los productos vía `fetch('data/products.json')`, lo que requiere que
el sitio se sirva por HTTP (no abriendo el archivo directamente con `file://`, por
restricciones CORS del navegador). Para probarlo localmente:

```bash
cd site
python3 -m http.server 8080
# luego abrir http://localhost:8080
```

## 🚀 Despliegue

El sitio es 100% estático (HTML/CSS/JS, sin build step). Puede subirse directamente a
cualquier hosting estático (Netlify, Vercel, GitHub Pages, cPanel, etc.). Antes de publicar:

1. Reemplazar el dominio de ejemplo `https://www.labtechnology.com.ve/` en:
   - `index.html` y `catalogo.html` (`<link rel="canonical">`, Open Graph, JSON-LD)
   - `robots.txt` y `sitemap.xml`
2. Actualizar el número de WhatsApp/teléfono si cambia.
3. Confirmar el correo de contacto `labtecnology@gmail.com`.

## ✅ SEO implementado

- Metadatos únicos por página (`title`, `description`, `keywords`, Open Graph, Twitter Card).
- Datos estructurados JSON-LD (`MedicalBusiness` en home, `BreadcrumbList` en catálogo).
- HTML semántico (`header`, `main`, `section`, `footer`, jerarquía de encabezados `h1`–`h3`).
- `robots.txt` + `sitemap.xml`.
- Texto alternativo descriptivo en todas las imágenes.
- URLs limpias, enlaces internos entre home y catálogo, anclas por categoría
  (`/catalogo.html#cat-hematologia`, etc.).
- Rendimiento: sin frameworks pesados, CSS/JS propios y minimalistas, fuentes con
  `preconnect`, animaciones respetando `prefers-reduced-motion`.
