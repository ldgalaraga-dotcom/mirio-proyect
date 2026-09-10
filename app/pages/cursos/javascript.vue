<template>
  <div class="curso-page">
    <!-- ======================================================= -->
    <!-- COURSE HERO HEADER                                      -->
    <!-- ======================================================= -->
    <section class="curso-hero-wrapper py-3 py-sm-4 px-3 px-sm-6 px-lg-8">
      <div class="curso-hero-card">
        <AppNavbar />

        <v-container fluid class="hero-body px-4 px-md-10 pb-8 pb-md-12 pt-4 pt-md-6">
          <!-- Breadcrumb -->
          <div class="breadcrumb-row mb-4">
            <NuxtLink to="/" class="breadcrumb-link">
              <v-icon icon="mdi-home-variant-outline" size="16" />
              Inicio
            </NuxtLink>
            <v-icon icon="mdi-chevron-right" size="14" class="breadcrumb-sep" />
            <span class="breadcrumb-current">{{ curso.titulo }}</span>
          </div>

          <v-row align="center" no-gutters>
            <!-- Left: Course Info -->
            <v-col cols="12" md="7">
              <div class="curso-badge-row mb-3">
                <span class="curso-badge badge-js">
                  <v-icon icon="mdi-language-javascript" size="16" />
                  JavaScript
                </span>
                <span class="curso-badge badge-duration">
                  <v-icon icon="mdi-clock-outline" size="14" />
                  {{ curso.duracionTotalSemanas }} semanas
                </span>
                <span class="curso-badge badge-level">
                  <v-icon icon="mdi-signal-cellular-2" size="14" />
                  Básico → Intermedio
                </span>
              </div>

              <h1 class="curso-title">{{ curso.titulo }}</h1>
              <p class="curso-audience">{{ curso.publicoObjetivo }}</p>

              <div class="curso-meta-chips mt-4">
                <div class="meta-chip">
                  <v-icon icon="mdi-calendar-clock" size="18" color="#00E699" />
                  <span>{{ curso.intensidadHorariaSemanal }}</span>
                </div>
                <div class="meta-chip">
                  <v-icon icon="mdi-monitor-cellphone" size="18" color="#38BDF8" />
                  <span>{{ curso.modalidad }}</span>
                </div>
              </div>

              <!-- CTA -->
              <div class="hero-cta-row mt-6">
                <v-btn
                  color="#00E699"
                  size="large"
                  rounded="lg"
                  class="cta-btn"
                  prepend-icon="mdi-play-circle-outline"
                  @click="scrollToContent"
                >
                  Comenzar curso
                </v-btn>
                <v-btn
                  variant="outlined"
                  size="large"
                  rounded="lg"
                  class="cta-btn-outline"
                  prepend-icon="mdi-bookmark-outline"
                >
                  Guardar
                </v-btn>
              </div>
            </v-col>

            <!-- Right: Stats Summary -->
            <v-col cols="12" md="5" class="d-none d-md-flex justify-center">
              <div class="curso-stats-visual">
                <div class="stats-ring-wrapper">
                  <div class="stats-ring-bg"></div>
                  <div class="stats-ring-icon">
                    <v-icon icon="mdi-language-javascript" size="64" color="#F59E0B" />
                  </div>
                  <!-- Floating stat pills -->
                  <div class="floating-pill pill-1">
                    <v-icon icon="mdi-book-open-page-variant" size="16" color="#00E699" />
                    <span>{{ totalLecciones }} lecciones</span>
                  </div>
                  <div class="floating-pill pill-2">
                    <v-icon icon="mdi-puzzle-outline" size="16" color="#F59E0B" />
                    <span>{{ totalEjercicios }} ejercicios</span>
                  </div>
                  <div class="floating-pill pill-3">
                    <v-icon icon="mdi-layers-outline" size="16" color="#38BDF8" />
                    <span>{{ totalModulos }} módulos</span>
                  </div>
                  <div class="floating-pill pill-4">
                    <v-icon icon="mdi-trophy-outline" size="16" color="#EC4899" />
                    <span>{{ curso.niveles.length }} niveles</span>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </section>

    <!-- ======================================================= -->
    <!-- COURSE OVERVIEW CARDS (Competencies, Tools, Methodology) -->
    <!-- ======================================================= -->
    <section class="curso-overview-wrapper py-3 px-3 px-sm-6 px-lg-8">
      <div class="overview-grid">
        <!-- Competencias -->
        <div class="overview-card">
          <div class="overview-card-header">
            <v-icon icon="mdi-star-shooting" size="24" color="#00E699" />
            <h3>Competencias finales</h3>
          </div>
          <ul class="overview-list">
            <li v-for="(comp, i) in curso.competenciasFinales" :key="i">
              <v-icon icon="mdi-check-circle" size="16" color="#00E699" class="list-check" />
              {{ comp }}
            </li>
          </ul>
        </div>

        <!-- Herramientas -->
        <div class="overview-card">
          <div class="overview-card-header">
            <v-icon icon="mdi-wrench-outline" size="24" color="#38BDF8" />
            <h3>Herramientas</h3>
          </div>
          <div class="tool-tags">
            <span v-for="(tool, i) in curso.herramientas" :key="i" class="tool-tag">
              {{ tool }}
            </span>
          </div>
        </div>

        <!-- Metodología -->
        <div class="overview-card">
          <div class="overview-card-header">
            <v-icon icon="mdi-strategy" size="24" color="#F59E0B" />
            <h3>Metodología</h3>
          </div>
          <ul class="overview-list">
            <li v-for="(met, i) in curso.metodologia" :key="i">
              <v-icon icon="mdi-lightning-bolt" size="16" color="#F59E0B" class="list-check" />
              {{ met }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ======================================================= -->
    <!-- COURSE CONTENT: Niveles → Módulos → Lecciones           -->
    <!-- ======================================================= -->
    <section id="course-content" class="curso-content-wrapper py-3 px-3 px-sm-6 px-lg-8">
      <div
        v-for="(nivel, nivelIdx) in curso.niveles"
        :key="nivel.nombre"
        class="nivel-section"
      >
        <!-- Nivel Header -->
        <div class="nivel-header">
          <div class="nivel-header-content">
            <div class="nivel-badge-wrapper">
              <span :class="['nivel-badge', nivelIdx === 0 ? 'badge-basico' : 'badge-intermedio']">
                <v-icon :icon="nivelIdx === 0 ? 'mdi-sprout' : 'mdi-rocket-launch-outline'" size="18" />
                Nivel {{ nivel.nombre }}
              </span>
              <span class="nivel-duration">{{ nivel.duracionEstimadaSemanas }} semanas</span>
            </div>
            <p class="nivel-desc">{{ nivel.descripcion }}</p>

            <!-- Nivel objectives -->
            <div class="nivel-objectives">
              <span class="obj-label">Objetivos generales:</span>
              <div class="obj-tags">
                <span v-for="(obj, i) in nivel.objetivosGenerales" :key="i" class="obj-tag">
                  {{ obj }}
                </span>
              </div>
            </div>

            <!-- Prerequisites -->
            <div v-if="nivel.prerrequisitos.length" class="nivel-prereqs mt-3">
              <v-icon icon="mdi-information-outline" size="16" color="#8E9E98" />
              <span>Prerrequisitos: {{ nivel.prerrequisitos.join(' • ') }}</span>
            </div>
          </div>
        </div>

        <!-- Módulos -->
        <div class="modulos-container">
          <div
            v-for="modulo in nivel.modulos"
            :key="modulo.id"
            class="modulo-card"
          >
            <!-- Module Header (clickable to expand) -->
            <button
              class="modulo-header"
              @click="toggleModulo(modulo.id)"
            >
              <div class="modulo-header-left">
                <span class="modulo-id-badge">{{ modulo.id }}</span>
                <div>
                  <h3 class="modulo-title">{{ modulo.titulo }}</h3>
                  <p class="modulo-desc">{{ modulo.descripcion }}</p>
                </div>
              </div>
              <div class="modulo-header-right">
                <span class="modulo-meta-pill">
                  <v-icon icon="mdi-clock-outline" size="14" />
                  {{ modulo.semanasEstimadas }} sem.
                </span>
                <span class="modulo-meta-pill">
                  <v-icon icon="mdi-book-open-page-variant" size="14" />
                  {{ modulo.lecciones.length }} lecciones
                </span>
                <v-icon
                  :icon="expandedModulos.has(modulo.id) ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  size="22"
                  class="expand-icon"
                />
              </div>
            </button>

            <!-- Module Expanded Content -->
            <Transition name="slide-expand">
              <div v-if="expandedModulos.has(modulo.id)" class="modulo-body">
                <!-- Lecciones -->
                <div
                  v-for="leccion in modulo.lecciones"
                  :key="leccion.id"
                  class="leccion-card"
                >
                  <div class="leccion-header">
                    <div class="leccion-header-left">
                      <span class="leccion-id">{{ leccion.id }}</span>
                      <div>
                        <h4 class="leccion-title">{{ leccion.titulo }}</h4>
                        <div class="leccion-meta">
                          <span>
                            <v-icon icon="mdi-clock-outline" size="13" />
                            {{ leccion.duracionMinutos }} min
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Objectives -->
                  <div class="leccion-section">
                    <h5 class="leccion-section-title">
                      <v-icon icon="mdi-target" size="16" color="#00E699" />
                      Objetivos
                    </h5>
                    <ul class="leccion-obj-list">
                      <li v-for="(obj, i) in leccion.objetivos" :key="i">{{ obj }}</li>
                    </ul>
                  </div>

                  <!-- Temas -->
                  <div class="leccion-section">
                    <h5 class="leccion-section-title">
                      <v-icon icon="mdi-format-list-bulleted" size="16" color="#38BDF8" />
                      Temas
                    </h5>
                    <div class="temas-tags">
                      <span v-for="(tema, i) in leccion.temas" :key="i" class="tema-tag">
                        {{ tema }}
                      </span>
                    </div>
                  </div>

                  <!-- Conceptos Clave -->
                  <div class="leccion-section">
                    <h5 class="leccion-section-title">
                      <v-icon icon="mdi-key-variant" size="16" color="#F59E0B" />
                      Conceptos clave
                    </h5>
                    <div class="conceptos-row">
                      <span v-for="(concepto, i) in leccion.conceptosClave" :key="i" class="concepto-chip">
                        {{ concepto }}
                      </span>
                    </div>
                  </div>

                  <!-- Code Example — Interactive Editor -->
                  <div class="leccion-section">
                    <h5 class="leccion-section-title">
                      <v-icon icon="mdi-code-tags" size="16" color="#00E699" />
                      Ejemplo de código — Pruébalo aquí
                    </h5>
                    <ClientOnly>
                      <CourseInlineEditor
                        :initialCode="leccion.ejemploCodigo"
                        language="javascript"
                        :height="Math.max(140, leccion.ejemploCodigo.split('\n').length * 22)"
                      />
                      <template #fallback>
                        <div class="code-block-wrapper">
                          <pre class="code-block"><code>{{ leccion.ejemploCodigo }}</code></pre>
                        </div>
                      </template>
                    </ClientOnly>
                  </div>

                  <!-- Exercises with inline editor -->
                  <div v-if="leccion.ejercicios.length" class="leccion-section">
                    <h5 class="leccion-section-title">
                      <v-icon icon="mdi-puzzle-outline" size="16" color="#EC4899" />
                      Ejercicios
                    </h5>
                    <div class="ejercicios-grid">
                      <div
                        v-for="(ej, i) in leccion.ejercicios"
                        :key="i"
                        class="ejercicio-card"
                      >
                        <div class="ejercicio-header">
                          <span class="ejercicio-title">{{ ej.titulo }}</span>
                          <span :class="['dificultad-badge', `dif-${ej.dificultad}`]">
                            {{ ej.dificultad }}
                          </span>
                        </div>
                        <p class="ejercicio-enunciado">{{ ej.enunciado }}</p>
                        <div v-if="ej.entradaEjemplo || ej.salidaEsperada" class="ejercicio-io">
                          <div v-if="ej.entradaEjemplo" class="io-block">
                            <span class="io-label">Entrada:</span>
                            <code>{{ ej.entradaEjemplo }}</code>
                          </div>
                          <div v-if="ej.salidaEsperada" class="io-block">
                            <span class="io-label">Salida esperada:</span>
                            <code>{{ ej.salidaEsperada }}</code>
                          </div>
                        </div>
                        <!-- Exercise Inline Editor -->
                        <div class="ejercicio-editor-section">
                          <h6 class="ejercicio-editor-label">
                            <v-icon icon="mdi-pencil-box-outline" size="15" color="#00E699" />
                            Tu solución:
                          </h6>
                          <ClientOnly>
                            <CourseInlineEditor
                              :initialCode="`// Ejercicio: ${ej.titulo}\n// ${ej.enunciado}\n\n// Escribe tu solución aquí:\n\n`"
                              language="javascript"
                              :height="140"
                            />
                          </ClientOnly>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Resources -->
                  <div v-if="leccion.recursos?.length" class="leccion-section">
                    <h5 class="leccion-section-title">
                      <v-icon icon="mdi-link-variant" size="16" color="#A855F7" />
                      Recursos de apoyo
                    </h5>
                    <div class="recursos-list">
                      <div v-for="(rec, i) in leccion.recursos" :key="i" class="recurso-item">
                        <v-icon
                          :icon="getRecursoIcon(rec.tipo)"
                          size="18"
                          :color="getRecursoColor(rec.tipo)"
                        />
                        <div>
                          <span class="recurso-titulo">{{ rec.titulo }}</span>
                          <span class="recurso-desc">{{ rec.descripcion }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Module Evaluation -->
                <div class="evaluacion-card">
                  <div class="evaluacion-header">
                    <v-icon icon="mdi-clipboard-check-outline" size="22" color="#00E699" />
                    <div>
                      <h5 class="evaluacion-title">Evaluación: {{ modulo.evaluacion.tipo }}</h5>
                      <p class="evaluacion-desc">{{ modulo.evaluacion.descripcion }}</p>
                    </div>
                    <span class="evaluacion-pct">{{ modulo.evaluacion.porcentaje }}%</span>
                  </div>
                  <div class="evaluacion-criterios">
                    <span class="criterios-label">Criterios de evaluación:</span>
                    <ul>
                      <li v-for="(crit, i) in modulo.evaluacion.criterios" :key="i">
                        <v-icon icon="mdi-check-decagram" size="14" color="#00E699" />
                        {{ crit }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================================================= -->
    <!-- FOOTER CTA                                               -->
    <!-- ======================================================= -->
    <section class="curso-footer-cta py-3 px-3 px-sm-6 px-lg-8 mb-6">
      <div class="footer-cta-card">
        <v-icon icon="mdi-rocket-launch" size="36" color="#00E699" class="mb-2" />
        <h3>¿Listo para comenzar?</h3>
        <p>Empieza tu camino en JavaScript desde cero y conviértete en un desarrollador web.</p>
        <v-btn
          color="#00E699"
          size="large"
          rounded="lg"
          class="cta-btn mt-2"
          prepend-icon="mdi-play-circle-outline"
          @click="scrollToTop"
        >
          Ir al inicio del curso
        </v-btn>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cursoJavaScriptPrincipiantes } from '~/data/cursos/curso_javascript'

// SEO
useHead({
  title: 'JavaScript — Mirio · Aprende. Programa. Crea. Con IA.',
  meta: [
    { name: 'description', content: 'Curso completo de JavaScript para principiantes: aprende desarrollo web desde cero con lecciones interactivas, ejercicios prácticos y proyectos integradores en la plataforma Mirio.' },
  ],
})

const curso = cursoJavaScriptPrincipiantes

// Computed stats
const totalModulos = computed(() =>
  curso.niveles.reduce((sum, n) => sum + n.modulos.length, 0)
)
const totalLecciones = computed(() =>
  curso.niveles.reduce((sum, n) =>
    sum + n.modulos.reduce((s, m) => s + m.lecciones.length, 0), 0)
)
const totalEjercicios = computed(() =>
  curso.niveles.reduce((sum, n) =>
    sum + n.modulos.reduce((s, m) =>
      s + m.lecciones.reduce((e, l) => e + l.ejercicios.length, 0), 0), 0)
)

// Expand/Collapse modules
const expandedModulos = ref<Set<string>>(new Set())

const toggleModulo = (id: string) => {
  if (expandedModulos.value.has(id)) {
    expandedModulos.value.delete(id)
  } else {
    expandedModulos.value.add(id)
  }
  // Force reactivity
  expandedModulos.value = new Set(expandedModulos.value)
}

// Copy code
const copiedCode = ref<string | null>(null)

const copyCode = async (code: string) => {
  try {
    await navigator.clipboard.writeText(code)
    copiedCode.value = code
    setTimeout(() => { copiedCode.value = null }, 2000)
  } catch {
    // fallback
  }
}

// Resource helpers
const getRecursoIcon = (tipo: string) => {
  const icons: Record<string, string> = {
    video: 'mdi-play-circle-outline',
    lectura: 'mdi-book-open-page-variant',
    herramienta: 'mdi-wrench-outline',
    documentacion: 'mdi-file-document-outline',
  }
  return icons[tipo] || 'mdi-link-variant'
}

const getRecursoColor = (tipo: string) => {
  const colors: Record<string, string> = {
    video: '#EC4899',
    lectura: '#38BDF8',
    herramienta: '#F59E0B',
    documentacion: '#A855F7',
  }
  return colors[tipo] || '#8E9E98'
}

const scrollToContent = () => {
  document.getElementById('course-content')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
/* ================================================================ */
/* COURSE PAGE — GLOBAL WRAPPERS                                    */
/* ================================================================ */
.curso-page {
  padding-bottom: 2rem;
}

.curso-hero-wrapper,
.curso-overview-wrapper,
.curso-content-wrapper,
.curso-footer-cta {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

/* ================================================================ */
/* HERO CARD                                                        */
/* ================================================================ */
.curso-hero-card {
  background: linear-gradient(165deg, #061914 0%, #03120e 100%);
  border: 1.5px solid rgba(0, 230, 153, 0.16);
  border-radius: 28px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(0, 230, 153, 0.15);
}

/* Breadcrumb */
.breadcrumb-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
}

.breadcrumb-link {
  color: #8E9E98;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: #00E699;
}

.breadcrumb-sep {
  color: #5C6E67;
}

.breadcrumb-current {
  color: #F0F6F4;
  font-weight: 600;
}

/* Badges row */
.curso-badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.curso-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(0, 230, 153, 0.1);
  border: 1px solid rgba(0, 230, 153, 0.25);
  color: #00E699;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
}

.badge-duration {
  background: rgba(56, 189, 248, 0.1);
  border-color: rgba(56, 189, 248, 0.25);
  color: #38BDF8;
}

.badge-level {
  background: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.25);
  color: #F59E0B;
}

.badge-js {
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.3);
  color: #F59E0B;
}

.curso-title {
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1.2;
  margin-bottom: 0.5rem;
}

.curso-audience {
  color: #8E9E98;
  font-size: 0.95rem;
  line-height: 1.4;
}

.curso-meta-chips {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.meta-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #C3D1CB;
}

/* CTA Buttons */
.hero-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.cta-btn {
  color: #041713 !important;
  font-weight: 700 !important;
  text-transform: none;
  box-shadow: 0 0 20px rgba(0, 230, 153, 0.3) !important;
  transition: all 0.25s ease;
}

.cta-btn:hover {
  box-shadow: 0 0 30px rgba(0, 230, 153, 0.5) !important;
  transform: translateY(-2px);
}

.cta-btn-outline {
  color: #00E699 !important;
  border-color: rgba(0, 230, 153, 0.4) !important;
  text-transform: none;
  font-weight: 700 !important;
}

.cta-btn-outline:hover {
  background: rgba(0, 230, 153, 0.08) !important;
}

/* Stats Visual (Right side) */
.curso-stats-visual {
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.stats-ring-wrapper {
  position: relative;
  width: 280px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stats-ring-bg {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 230, 153, 0.15) 0%, rgba(0, 230, 153, 0.03) 70%, transparent 100%);
  border: 2px solid rgba(0, 230, 153, 0.2);
  animation: ringPulse 4s ease-in-out infinite;
}

@keyframes ringPulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 30px rgba(0, 230, 153, 0.1); }
  50% { transform: scale(1.05); box-shadow: 0 0 50px rgba(0, 230, 153, 0.2); }
}

.stats-ring-icon {
  position: relative;
  z-index: 2;
}

.floating-pill {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(8, 33, 27, 0.95);
  border: 1px solid rgba(0, 230, 153, 0.2);
  border-radius: 20px;
  padding: 0.35rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #C3D1CB;
  white-space: nowrap;
  z-index: 3;
  animation: floatPill 5s ease-in-out infinite alternate;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.pill-1 { top: 8%; left: 0; animation-delay: 0s; }
.pill-2 { top: 35%; right: -10px; animation-delay: 1s; }
.pill-3 { bottom: 15%; left: -5px; animation-delay: 2s; }
.pill-4 { bottom: 5%; right: 10%; animation-delay: 0.5s; }

@keyframes floatPill {
  0% { transform: translateY(0); }
  100% { transform: translateY(-8px); }
}

/* ================================================================ */
/* OVERVIEW CARDS                                                   */
/* ================================================================ */
.overview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.overview-card {
  background: linear-gradient(165deg, #061914 0%, #03120e 100%);
  border: 1.5px solid rgba(0, 230, 153, 0.12);
  border-radius: 22px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.overview-card:hover {
  border-color: rgba(0, 230, 153, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 230, 153, 0.08);
}

.overview-card-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.overview-card-header h3 {
  color: #F0F6F4;
  font-size: 1.05rem;
  font-weight: 700;
}

.overview-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.overview-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #C3D1CB;
  line-height: 1.4;
}

.list-check {
  flex-shrink: 0;
  margin-top: 2px;
}

.tool-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tool-tag {
  background: rgba(56, 189, 248, 0.08);
  border: 1px solid rgba(56, 189, 248, 0.2);
  color: #38BDF8;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.35rem 0.7rem;
  border-radius: 10px;
}

/* ================================================================ */
/* NIVEL SECTIONS                                                   */
/* ================================================================ */
.nivel-section {
  margin-bottom: 1.5rem;
}

.nivel-header {
  background: linear-gradient(165deg, #061914 0%, #03120e 100%);
  border: 1.5px solid rgba(0, 230, 153, 0.16);
  border-radius: 22px;
  padding: 1.5rem 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.nivel-badge-wrapper {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 0.6rem;
  flex-wrap: wrap;
}

.nivel-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.88rem;
  font-weight: 800;
  padding: 0.4rem 0.9rem;
  border-radius: 12px;
}

.badge-basico {
  background: rgba(0, 230, 153, 0.12);
  border: 1px solid rgba(0, 230, 153, 0.3);
  color: #00E699;
}

.badge-intermedio {
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.3);
  color: #F59E0B;
}

.nivel-duration {
  color: #8E9E98;
  font-size: 0.82rem;
  font-weight: 600;
}

.nivel-desc {
  color: #C3D1CB;
  font-size: 0.92rem;
  line-height: 1.45;
  margin-bottom: 0.75rem;
}

.nivel-objectives {
  margin-top: 0.5rem;
}

.obj-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: #8E9E98;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.4rem;
  display: block;
}

.obj-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.obj-tag {
  background: rgba(0, 230, 153, 0.06);
  border: 1px solid rgba(0, 230, 153, 0.15);
  color: #C3D1CB;
  font-size: 0.78rem;
  padding: 0.3rem 0.65rem;
  border-radius: 8px;
}

.nivel-prereqs {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: #8E9E98;
}

/* ================================================================ */
/* MODULE CARDS                                                     */
/* ================================================================ */
.modulos-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.modulo-card {
  background: linear-gradient(165deg, #081e18 0%, #041310 100%);
  border: 1px solid rgba(0, 230, 153, 0.12);
  border-radius: 20px;
  overflow: hidden;
  transition: border-color 0.3s;
}

.modulo-card:hover {
  border-color: rgba(0, 230, 153, 0.28);
}

.modulo-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.2rem 1.4rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s;
}

.modulo-header:hover {
  background: rgba(0, 230, 153, 0.04);
}

.modulo-header-left {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex: 1;
  min-width: 0;
}

.modulo-id-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(0, 230, 153, 0.1);
  border: 1px solid rgba(0, 230, 153, 0.25);
  color: #00E699;
  font-weight: 800;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.modulo-title {
  color: #F0F6F4;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.25;
}

.modulo-desc {
  color: #8E9E98;
  font-size: 0.82rem;
  margin: 0;
  line-height: 1.3;
}

.modulo-header-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.modulo-meta-pill {
  display: none;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #8E9E98;
  background: rgba(255, 255, 255, 0.04);
  padding: 0.25rem 0.6rem;
  border-radius: 8px;
  white-space: nowrap;
}

@media (min-width: 768px) {
  .modulo-meta-pill {
    display: inline-flex;
  }
}

.expand-icon {
  color: #5C6E67;
  transition: transform 0.3s ease, color 0.3s;
}

.modulo-card:hover .expand-icon {
  color: #00E699;
}

/* Expand transition */
.slide-expand-enter-active {
  animation: slideDown 0.35s ease-out;
}

.slide-expand-leave-active {
  animation: slideUp 0.25s ease-in;
}

@keyframes slideDown {
  from { max-height: 0; opacity: 0; }
  to { max-height: 5000px; opacity: 1; }
}

@keyframes slideUp {
  from { max-height: 5000px; opacity: 1; }
  to { max-height: 0; opacity: 0; }
}

.modulo-body {
  padding: 0 1.4rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: 1px solid rgba(0, 230, 153, 0.08);
}

/* ================================================================ */
/* LESSON CARDS                                                     */
/* ================================================================ */
.leccion-card {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 230, 153, 0.08);
  border-radius: 16px;
  padding: 1.25rem;
  margin-top: 0.75rem;
}

.leccion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.leccion-header-left {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.leccion-id {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.2);
  color: #38BDF8;
  font-weight: 800;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.leccion-title {
  color: #F0F6F4;
  font-size: 0.95rem;
  font-weight: 700;
}

.leccion-meta {
  display: flex;
  gap: 0.6rem;
  margin-top: 0.15rem;
}

.leccion-meta span {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #8E9E98;
}

/* Lesson Sections */
.leccion-section {
  margin-top: 1rem;
}

.leccion-section-title {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  font-weight: 700;
  color: #C3D1CB;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.leccion-obj-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.leccion-obj-list li {
  position: relative;
  padding-left: 1rem;
  font-size: 0.84rem;
  color: #C3D1CB;
  line-height: 1.5;
  margin-bottom: 0.3rem;
}

.leccion-obj-list li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #00E699;
  font-weight: bold;
}

.temas-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tema-tag {
  background: rgba(56, 189, 248, 0.06);
  border: 1px solid rgba(56, 189, 248, 0.15);
  color: #9CCFEB;
  font-size: 0.78rem;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
}

.conceptos-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.concepto-chip {
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.2);
  color: #F59E0B;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.3rem 0.65rem;
  border-radius: 8px;
}

/* ================================================================ */
/* CODE BLOCK                                                       */
/* ================================================================ */
.code-block-wrapper {
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(0, 230, 153, 0.12);
  background: #020d09;
}

.code-block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.8rem;
  background: rgba(0, 230, 153, 0.06);
  border-bottom: 1px solid rgba(0, 230, 153, 0.1);
}

.code-lang-label {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #00E699;
}

.code-copy-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.72rem;
  font-weight: 600;
  color: #8E9E98;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.25rem 0.6rem;
  cursor: pointer;
  transition: all 0.2s;
}

.code-copy-btn:hover {
  background: rgba(0, 230, 153, 0.1);
  color: #00E699;
  border-color: rgba(0, 230, 153, 0.3);
}

.code-block {
  margin: 0;
  padding: 1rem;
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 0.82rem;
  line-height: 1.6;
  color: #E0F0EA;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

.code-block code {
  background: none;
  padding: 0;
}

/* ================================================================ */
/* EXERCISES                                                        */
/* ================================================================ */
.ejercicios-grid {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.ejercicio-card {
  background: rgba(236, 72, 153, 0.04);
  border: 1px solid rgba(236, 72, 153, 0.12);
  border-radius: 14px;
  padding: 1rem;
}

.ejercicio-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.ejercicio-title {
  color: #F0F6F4;
  font-weight: 700;
  font-size: 0.9rem;
}

.dificultad-badge {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  text-transform: capitalize;
}

.dif-fácil {
  background: rgba(0, 230, 153, 0.12);
  color: #00E699;
}

.dif-media {
  background: rgba(245, 158, 11, 0.12);
  color: #F59E0B;
}

.dif-alta {
  background: rgba(236, 72, 153, 0.12);
  color: #EC4899;
}

.ejercicio-enunciado {
  color: #C3D1CB;
  font-size: 0.84rem;
  line-height: 1.45;
  margin-bottom: 0.5rem;
}

.ejercicio-io {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.io-block {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
}

.io-label {
  color: #8E9E98;
  font-weight: 600;
}

.io-block code {
  background: rgba(0, 230, 153, 0.08);
  color: #00E699;
  padding: 0.15rem 0.45rem;
  border-radius: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
}

/* ================================================================ */
/* RESOURCES                                                        */
/* ================================================================ */
.recursos-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.recurso-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.8rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
}

.recurso-titulo {
  color: #F0F6F4;
  font-weight: 600;
  font-size: 0.84rem;
  display: block;
}

.recurso-desc {
  color: #8E9E98;
  font-size: 0.78rem;
  display: block;
}

/* ================================================================ */
/* EVALUATION                                                       */
/* ================================================================ */
.evaluacion-card {
  background: rgba(0, 230, 153, 0.04);
  border: 1px solid rgba(0, 230, 153, 0.15);
  border-radius: 16px;
  padding: 1.2rem;
  margin-top: 0.5rem;
}

.evaluacion-header {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.evaluacion-title {
  color: #F0F6F4;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: capitalize;
  margin: 0;
}

.evaluacion-desc {
  color: #8E9E98;
  font-size: 0.82rem;
  margin: 0;
}

.evaluacion-pct {
  margin-left: auto;
  background: rgba(0, 230, 153, 0.12);
  color: #00E699;
  font-weight: 800;
  font-size: 0.88rem;
  padding: 0.35rem 0.75rem;
  border-radius: 10px;
  flex-shrink: 0;
}

.evaluacion-criterios {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(0, 230, 153, 0.1);
}

.criterios-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #8E9E98;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  display: block;
  margin-bottom: 0.4rem;
}

.evaluacion-criterios ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.evaluacion-criterios li {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: #C3D1CB;
  margin-bottom: 0.25rem;
}

/* ================================================================ */
/* FOOTER CTA                                                       */
/* ================================================================ */
.footer-cta-card {
  background: linear-gradient(165deg, #061914 0%, #03120e 100%);
  border: 1.5px solid rgba(0, 230, 153, 0.16);
  border-radius: 24px;
  padding: 2.5rem 1.5rem;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
}

.footer-cta-card h3 {
  color: #FFFFFF;
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 0.4rem;
}

.footer-cta-card p {
  color: #8E9E98;
  font-size: 0.92rem;
  max-width: 500px;
  margin: 0 auto;
}

/* ================================================================ */
/* EXERCISE INLINE EDITOR                                           */
/* ================================================================ */
.ejercicio-editor-section {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(0, 230, 153, 0.06);
}

.ejercicio-editor-label {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: #00E699;
  margin-bottom: 0.4rem;
}

/* ================================================================ */
/* RESPONSIVE                                                       */
/* ================================================================ */

/* Tablets */
@media (max-width: 960px) {
  .overview-grid {
    grid-template-columns: 1fr;
  }

  .stats-ring-wrapper {
    width: 220px;
    height: 220px;
  }

  .stats-ring-bg {
    width: 160px;
    height: 160px;
  }

  .floating-pill {
    font-size: 0.7rem;
    padding: 0.3rem 0.6rem;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .curso-hero-wrapper,
  .curso-overview-wrapper,
  .curso-content-wrapper,
  .curso-footer-cta {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .curso-hero-card {
    border-radius: 20px;
  }

  .curso-title {
    font-size: clamp(1.3rem, 6vw, 1.8rem);
  }

  .curso-audience {
    font-size: 0.85rem;
  }

  .curso-badge-row {
    gap: 0.35rem;
  }

  .curso-badge {
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
  }

  .hero-cta-row {
    flex-direction: column;
    gap: 0.5rem;
  }

  .hero-cta-row .v-btn {
    width: 100%;
  }

  .nivel-header {
    padding: 1rem;
    border-radius: 16px;
  }

  .nivel-badge {
    font-size: 0.8rem;
    padding: 0.3rem 0.7rem;
  }

  .nivel-desc {
    font-size: 0.84rem;
  }

  .modulo-card {
    border-radius: 16px;
  }

  .modulo-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 1rem;
  }

  .modulo-header-right {
    width: 100%;
    justify-content: flex-end;
  }

  .modulo-body {
    padding: 0 1rem 1rem;
  }

  .modulo-title {
    font-size: 0.9rem;
  }

  .modulo-desc {
    font-size: 0.78rem;
  }

  .leccion-card {
    padding: 1rem;
    border-radius: 14px;
  }

  .leccion-title {
    font-size: 0.88rem;
  }

  .leccion-header-left {
    gap: 0.5rem;
  }

  .leccion-id {
    width: 30px;
    height: 30px;
    font-size: 0.68rem;
    border-radius: 8px;
  }

  .leccion-section-title {
    font-size: 0.78rem;
  }

  .overview-card {
    border-radius: 18px;
    padding: 1.2rem;
  }

  .overview-card-header h3 {
    font-size: 0.95rem;
  }

  .overview-list li {
    font-size: 0.8rem;
  }

  .footer-cta-card {
    border-radius: 18px;
    padding: 1.5rem 1rem;
  }

  .footer-cta-card h3 {
    font-size: 1.15rem;
  }

  .footer-cta-card p {
    font-size: 0.84rem;
  }

  .ejercicio-card {
    padding: 0.8rem;
    border-radius: 12px;
  }

  .ejercicio-title {
    font-size: 0.82rem;
  }

  .ejercicio-enunciado {
    font-size: 0.78rem;
  }

  .ejercicio-io {
    flex-direction: column;
    gap: 0.4rem;
  }

  .evaluacion-card {
    padding: 1rem;
    border-radius: 14px;
  }

  .evaluacion-header {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .evaluacion-pct {
    font-size: 0.8rem;
  }
}

/* Very small phones */
@media (max-width: 400px) {
  .curso-hero-wrapper,
  .curso-overview-wrapper,
  .curso-content-wrapper,
  .curso-footer-cta {
    padding-left: 0.35rem;
    padding-right: 0.35rem;
  }

  .curso-hero-card {
    border-radius: 16px;
  }

  .curso-title {
    font-size: clamp(1.1rem, 5.5vw, 1.5rem);
  }

  .curso-badge {
    font-size: 0.65rem;
    padding: 0.15rem 0.4rem;
  }

  .nivel-header {
    padding: 0.75rem;
    border-radius: 14px;
  }

  .modulo-header {
    padding: 0.75rem;
  }

  .modulo-body {
    padding: 0 0.75rem 0.75rem;
  }

  .leccion-card {
    padding: 0.75rem;
    border-radius: 12px;
  }

  .overview-card {
    border-radius: 14px;
    padding: 1rem;
  }

  .footer-cta-card {
    border-radius: 14px;
    padding: 1.25rem 0.75rem;
  }

  .obj-tags {
    gap: 0.3rem;
  }

  .obj-tag {
    font-size: 0.72rem;
    padding: 0.25rem 0.5rem;
  }
}

/* Ultra-wide screens */
@media (min-width: 1800px) {
  .curso-hero-wrapper,
  .curso-overview-wrapper,
  .curso-content-wrapper,
  .curso-footer-cta {
    max-width: 1600px;
  }

  .curso-title {
    font-size: 2.8rem;
  }
}
</style>
