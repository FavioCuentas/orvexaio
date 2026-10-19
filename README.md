# Orbexa IO

Home público en React + TypeScript y Vite. Cinco marcas, Bento adaptable, ilustraciones SVG originales y páginas internas en preparación. Nano Chapelete enlaza a https://nanochapelete.orvexaio.com/#soluciones en una pestaña nueva.

## Desarrollo

```sh
npm install
npm run dev
```

## Validación y producción

```sh
npm run check
npm run build
npm run preview
```

El resultado se genera en `dist/`. El alojamiento debe redirigir rutas no correspondientes a archivos hacia `index.html` para permitir abrir directamente `/marcas/lectoria`, `/marcas/faviax`, `/marcas/fc-tecnologia` y `/marcas/orbexa-gestion`. Vite admite estas rutas durante desarrollo y preview.

## Contenido editable

- `src/data.ts`: nombres, categorías, descripciones, etiquetas, visuales, destinos, estado y acciones de las cinco marcas. `Orbexa Gestión` es provisional; su nombre, alcance y acción están centralizados aquí.
- `site.url`: reservado para el dominio confirmado; permanece vacío y no genera un canonical ficticio.
- `site.contactEmail`: vacío hasta confirmar el contacto. Al configurarlo se muestra un enlace de correo real.
- `src/styles.css`: tokens de color, radios y espaciado, retícula y adaptaciones a 1000 y 640 px.
- `src/Illustration.tsx`: ilustraciones conceptuales decorativas; no son capturas de productos.

## Pendientes de contenido

Confirmar nombre y alcance de Orbexa Gestión, destinos definitivos, dominio, logotipos de las marcas y datos de contacto. El logo de Orbexa IO proporcionado se muestra en encabezado y pie de página; su lámina original se conserva en `public/orbexa-brand-original.png`. La imagen de referencia no estaba disponible en los archivos recibidos; el diseño sigue la dirección estética del texto.

## Accesibilidad

HTML semántico, enlace de salto, navegación con teclado, foco visible, menú móvil con `aria-expanded`, SVG decorativos excluidos del árbol accesible, animaciones desactivadas con movimiento reducido. Las marcas usan enlaces reales y los destinos desconocidos muestran una página de error con regreso al inicio.

## Pruebas de navegador

`npm test` comprueba cinco destinos, anclas internas, teclado, menú móvil, movimiento reducido y ausencia de desbordamiento a 390, 768 y 1440 px. Requiere Google Chrome instalado.

En esta sesión la compilación y la comprobación de tipos iniciales pasaron. La validación visual no pudo completarse: Chrome agotó 180 segundos al iniciar, antes de abrir la página. No se confirmó visualmente el diseño ni la ausencia de errores de consola.
