# Mirio 2 — Aprende · Programa · Crea Con IA

Plataforma educativa interactiva de **Mirio**, app de aprendizaje guiado de programación con IA.

Construido con **Nuxt 4** + **Vuetify 3**, con estética inmersiva, mascota robot interactiva y editor de código en vivo.

## Características

- 🤖 **Robot Mirio 2** — Mascota interactiva con 9 emociones y múltiples poses
- 🐍 **Curso de Python** — Completo con módulos, lecciones, ejercicios y editor en vivo
- 💻 **Editor de código integrado** — Monaco Editor con ejecución Python (Pyodide)
- 🎨 **Tema Python** — Estética navy/cyan inspirada en diseño de referencia
- ✨ **Animaciones y microinteracciones** — Glassmorphism, floating cards, ambient glow

## Estructura

- `app/layouts/default.vue` – layout base con la barra superior (`AppNavbar`).
- `app/components/AppNavbar.vue` – logo, tagline y botones de notificación/menú.
- `app/components/HeroSection.vue` – saludo, título y accesos rápidos + mascota con glow.
- `app/components/LearningPathsSection.vue` + `LearningPathCard.vue` – rutas de aprendizaje.
- `app/components/CourseInlineEditor.vue` – editor Monaco con ejecución Python en vivo.
- `app/pages/cursos/python.vue` – curso completo de Python con robot Mirio integrado.
- `app/data/cursos/curso_python.ts` – datos estructurados del curso de Python.
- `public/images/python/` – 38 sprites del robot Mirio Python con fondo transparente.

## Desarrollo

```bash
npm install
npm run dev
```

Abre http://localhost:3000
