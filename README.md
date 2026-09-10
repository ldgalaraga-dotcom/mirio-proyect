# Mirio

Landing/inicio de **Mirio**, app de aprendizaje guiado de programación con IA.

Construido con **Nuxt 4** + **Vuetify 3**, siguiendo la propuesta visual de referencia
(fondo oscuro verde-azulado, acentos en verde menta, mascota robot).

## Estructura

- `app/layouts/default.vue` – layout base con la barra superior (`AppNavbar`).
- `app/components/AppNavbar.vue` – logo, tagline y botones de notificación/menú.
- `app/components/HeroSection.vue` – saludo, título y accesos rápidos + mascota con glow.
- `app/components/LearningPathsSection.vue` + `LearningPathCard.vue` – rutas de aprendizaje (Python, JavaScript, HTML, CSS, Bases de datos).
- `app/components/StatsBar.vue` – barra de estadísticas del usuario.
- `app/plugins/vuetify.ts` – configuración del tema oscuro `mirioDark` con la paleta de Mirio.
- `public/images/mirio-mascot.png` – mascota robot (imagen de referencia enviada).

## Desarrollo

```bash
npm install
npm run dev
```

Abre http://localhost:3000
