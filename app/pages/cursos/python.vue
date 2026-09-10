<template>
  <div class="curso-page curso-python-theme">
    <!-- Ambient glowing backgrounds inspired by reference image -->
    <div class="ambient-glow glow-top-left" />
    <div class="ambient-glow glow-top-right" />
    <div class="ambient-glow glow-center" />

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

          <v-row align="center" no-gutters class="hero-main-row">
            <!-- Left: Course Info & Mirio Speech -->
            <v-col cols="12" lg="7" class="hero-left-col">
              <!-- Official Mirio 2 Brand Pill from Reference Image -->
              <div class="brand-hero-tag mb-3">
                <img
                  src="/images/python/mirio-brand-logo.png"
                  alt="Mirio 2 - Aprende · Programa · Crea - Con IA"
                  class="brand-badge-img"
                />
                <span class="python-edition-chip">
                  <img src="/images/python/python-snakes-icon.png" class="mini-py-icon" alt="Python" />
                  Especialización Python 3.12
                </span>
              </div>

              <!-- Course Badges Row -->
              <div class="curso-badge-row mb-3">
                <span class="curso-badge badge-py">
                  <img src="/images/python/python-snakes-icon.png" class="badge-py-icon" alt="" />
                  Python Core
                </span>
                <span class="curso-badge badge-duration">
                  <v-icon icon="mdi-clock-outline" size="14" />
                  {{ curso.duracionTotalSemanas }} semanas
                </span>
                <span class="curso-badge badge-level">
                  <img src="/images/python/icon-cap.png" class="badge-cap-icon" alt="" />
                  Básico → Intermedio
                </span>
                <span class="curso-badge badge-ia">
                  <v-icon icon="mdi-robot-outline" size="14" color="#FFD43B" />
                  Con Tutor Mirio 2
                </span>
              </div>

              <h1 class="curso-title">
                Domina Python con <span class="gradient-text-py">Mirio 2</span>
              </h1>
              <p class="curso-audience">{{ curso.publicoObjetivo }}</p>

              <!-- Speech Bubble from the reference image -->
              <div class="mirio-hero-bubble-card mt-4 mb-4">
                <div class="bubble-avatar-box">
                  <img
                    :src="`/images/python/${activeEmotion.avatar}`"
                    :alt="activeEmotion.label"
                    class="bubble-avatar-img"
                  />
                  <span class="bubble-online-dot" />
                </div>
                <div class="bubble-content">
                  <div class="bubble-header-row">
                    <span class="bubble-name">Mirio 2 • Tu Compañero de Código</span>
                    <span class="bubble-status-tag">{{ activeEmotion.tag }}</span>
                  </div>
                  <p class="bubble-quote-text">
                    "{{ currentSpeech }}"
                  </p>
                </div>
              </div>

              <!-- Interactive Emotions Bar (Row 3 from image) -->
              <div class="emotions-interactive-bar mb-4">
                <span class="emotions-title">
                  <v-icon icon="mdi-emoticon-outline" size="15" color="#FFD43B" />
                  Interactúa con Mirio:
                </span>
                <div class="emotions-chips-scroll">
                  <button
                    v-for="em in emotionsList"
                    :key="em.id"
                    :class="['emotion-chip-btn', { 'is-active': activeEmotion.id === em.id }]"
                    :title="em.label"
                    @click="setEmotion(em)"
                  >
                    <img :src="`/images/python/${em.avatar}`" :alt="em.label" class="emotion-chip-img" />
                    <span class="emotion-chip-name">{{ em.label }}</span>
                  </button>
                </div>
              </div>

              <!-- Meta Chips -->
              <div class="curso-meta-chips mt-2">
                <div class="meta-chip">
                  <v-icon icon="mdi-calendar-clock" size="18" color="#38BDF8" />
                  <span>{{ curso.intensidadHorariaSemanal }}</span>
                </div>
                <div class="meta-chip">
                  <v-icon icon="mdi-monitor-cellphone" size="18" color="#FFD43B" />
                  <span>{{ curso.modalidad }}</span>
                </div>
                <div class="meta-chip">
                  <v-icon icon="mdi-certificate-outline" size="18" color="#00D2FF" />
                  <span>Certificado al completar proyectos</span>
                </div>
              </div>

              <!-- CTA Row -->
              <div class="hero-cta-row mt-6">
                <v-btn
                  size="large"
                  rounded="lg"
                  class="cta-btn-gradient"
                  prepend-icon="mdi-play-circle"
                  @click="scrollToContent"
                >
                  Comenzar curso con Mirio
                </v-btn>
                <NuxtLink to="/practicar" class="text-decoration-none">
                  <v-btn
                    variant="outlined"
                    size="large"
                    rounded="lg"
                    class="cta-btn-gold"
                    prepend-icon="mdi-code-tags"
                  >
                    Práctica en Vivo
                  </v-btn>
                </NuxtLink>
                <v-btn
                  variant="text"
                  size="large"
                  rounded="lg"
                  class="cta-btn-speech"
                  prepend-icon="mdi-volume-high"
                  @click="cycleMirioTip"
                >
                  Consejo de Mirio
                </v-btn>
              </div>
            </v-col>

            <!-- Right: Mirio Robot Visual & UI Widgets from Reference Image -->
            <v-col cols="12" lg="5" class="d-flex flex-column align-center justify-center mt-8 mt-lg-0 hero-right-col">
              <div class="mirio-stage-container">
                <!-- Circular Python Halo Background -->
                <div class="mirio-halo-ring">
                  <div class="halo-glow-core" />
                  <div class="halo-orbit-particle p1" />
                  <div class="halo-orbit-particle p2" />
                  <div class="halo-orbit-particle p3" />
                </div>

                <!-- Mascot Main Image with dynamic pose switching -->
                <div class="mirio-mascot-wrapper" :key="activeMascotPose">
                  <img
                    :src="`/images/python/${activeMascotPose}`"
                    alt="Robot Mirio Python"
                    class="mirio-mascot-img"
                  />
                  <!-- Shadow beneath mascot -->
                  <div class="mirio-ground-shadow" />
                </div>

                <!-- Mascot Pose Quick Switcher -->
                <div class="pose-switcher-dock">
                  <button
                    v-for="p in mascotPoses"
                    :key="p.file"
                    :class="['pose-btn', { 'is-active': activeMascotPose === p.file }]"
                    :title="p.label"
                    @click="activeMascotPose = p.file"
                  >
                    <v-icon :icon="p.icon" size="18" />
                  </button>
                </div>

                <!-- FLOATING UI WIDGETS DIRECTLY FROM REFERENCE IMAGE -->
                <!-- 1. Progress Card: Python Lenguaje en progreso 88% -->
                <div class="ui-card-floating card-progress-pill">
                  <img src="/images/python/python-snakes-icon.png" class="floating-py-icon" alt="" />
                  <div class="progress-pill-info">
                    <div class="d-flex align-center justify-space-between ga-2">
                      <span class="progress-pill-title">Python</span>
                      <span class="progress-pill-pct">88%</span>
                    </div>
                    <span class="progress-pill-sub">Lenguaje en progreso...</span>
                    <div class="progress-pill-bar">
                      <div class="progress-pill-fill" style="width: 88%;" />
                    </div>
                  </div>
                </div>

                <!-- 2. Completed Badge: Lección completada 100% -->
                <div class="ui-card-floating card-completed-pill">
                  <div class="completed-check-icon">
                    <v-icon icon="mdi-check-bold" size="14" color="#03122A" />
                  </div>
                  <div class="completed-info">
                    <span class="completed-title">Lección completada 🎉</span>
                    <div class="completed-bar">
                      <div class="completed-fill" />
                    </div>
                  </div>
                  <span class="completed-badge-100">100%</span>
                </div>

                <!-- 3. Terminal Snippet Box: print("Aprende") print("Practica") print("Crea") -->
                <div class="ui-card-floating card-terminal-preview">
                  <div class="terminal-dots">
                    <span class="tdot tdot-red" />
                    <span class="tdot tdot-yellow" />
                    <span class="tdot tdot-green" />
                    <span class="terminal-title">mirio.py</span>
                  </div>
                  <pre class="terminal-code"><code><span class="t-fn">print</span>(<span class="t-str">"Aprende"</span>)
<span class="t-fn">print</span>(<span class="t-str">"Practica"</span>)
<span class="t-fn">print</span>(<span class="t-str">"Crea"</span>)</code></pre>
                  <button class="terminal-mini-run" @click="runTerminalDemo">
                    <v-icon :icon="terminalRan ? 'mdi-check' : 'mdi-play'" size="13" />
                    {{ terminalRan ? '¡Excelente!' : 'Probar' }}
                  </button>
                </div>

                <!-- 4. Quote Card: Python es el inicio de grandes ideas -->
                <div class="ui-card-floating card-quote-pill">
                  <span class="quote-bulb">💡</span>
                  <div class="quote-text">
                    <strong>Python</strong> es el inicio<br />de grandes ideas 🏆
                  </div>
                </div>
              </div>

              <!-- Quick stats pills under mascot -->
              <div class="hero-stats-row-py mt-4">
                <div class="stat-pill-py">
                  <img src="/images/python/icon-cap.png" class="stat-icon-img" alt="" />
                  <span>{{ totalLecciones }} lecciones</span>
                </div>
                <div class="stat-pill-py">
                  <img src="/images/python/icon-code-brackets.png" class="stat-icon-img" alt="" />
                  <span>{{ totalEjercicios }} ejercicios</span>
                </div>
                <div class="stat-pill-py">
                  <img src="/images/python/icon-gear.png" class="stat-icon-img" alt="" />
                  <span>{{ totalModulos }} módulos</span>
                </div>
                <div class="stat-pill-py">
                  <img src="/images/python/icon-trophy.png" class="stat-icon-img" alt="" />
                  <span>{{ curso.niveles.length }} niveles</span>
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
        <div class="overview-card py-overview-card">
          <div class="overview-card-header">
            <div class="header-icon-box">
              <img src="/images/python/icon-trophy.png" class="card-title-icon" alt="" />
            </div>
            <div>
              <h3>Competencias finales</h3>
              <span class="card-subtitle-py">Lo que lograrás con Mirio 2</span>
            </div>
          </div>
          <ul class="overview-list">
            <li v-for="(comp, i) in curso.competenciasFinales" :key="i">
              <v-icon icon="mdi-check-decagram" size="18" color="#38BDF8" class="list-check" />
              <span>{{ comp }}</span>
            </li>
          </ul>
        </div>

        <!-- Herramientas -->
        <div class="overview-card py-overview-card">
          <div class="overview-card-header">
            <div class="header-icon-box">
              <img src="/images/python/icon-terminal.png" class="card-title-icon" alt="" />
            </div>
            <div>
              <h3>Herramientas y Ecosistema</h3>
              <span class="card-subtitle-py">Tecnologías estándar de la industria</span>
            </div>
          </div>
          <div class="tool-tags-grid">
            <div v-for="(tool, i) in curso.herramientas" :key="i" class="tool-tag-py">
              <img src="/images/python/python-snakes-icon.png" class="tool-py-snakes" alt="" />
              <span>{{ tool }}</span>
            </div>
          </div>
          <div class="tool-footer-hint mt-3">
            <img src="/images/python/icon-database.png" class="hint-icon" alt="" />
            <span>Incluye entorno de ejecución integrado Pyodide</span>
          </div>
        </div>

        <!-- Metodología -->
        <div class="overview-card py-overview-card">
          <div class="overview-card-header">
            <div class="header-icon-box">
              <img src="/images/python/icon-rocket.png" class="card-title-icon" alt="" />
            </div>
            <div>
              <h3>Metodología Mirio IA</h3>
              <span class="card-subtitle-py">Aprende · Programa · Crea</span>
            </div>
          </div>
          <ul class="overview-list">
            <li v-for="(met, i) in curso.metodologia" :key="i">
              <v-icon icon="mdi-lightning-bolt" size="18" color="#FFD43B" class="list-check" />
              <span>{{ met }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ======================================================= -->
    <!-- INTERACTIVE MIRIO LEARNING BANNER                       -->
    <!-- ======================================================= -->
    <section class="curso-mirio-banner py-2 px-3 px-sm-6 px-lg-8">
      <div class="mirio-study-banner">
        <div class="banner-left">
          <img src="/images/python/mirio-reading.png" alt="Mirio estudiando Python" class="banner-mascot-img" />
          <div class="banner-text-block">
            <div class="d-flex align-center ga-2 mb-1">
              <span class="banner-pill">Ruta guiada por IA</span>
              <span class="banner-pill-sub">Nivel 1 & 2</span>
            </div>
            <h3 class="banner-title">Aprende haciendo: Cada módulo tiene ejercicios ejecutables</h3>
            <p class="banner-desc">
              Pruébalos directamente en tu navegador sin instalar nada, con retroalimentación instantánea de Mirio.
            </p>
          </div>
        </div>
        <div class="banner-right">
          <NuxtLink to="/practicar" class="text-decoration-none">
            <v-btn color="#FFD43B" class="banner-btn-py" prepend-icon="mdi-code-braces">
              Abrir Playground Python
            </v-btn>
          </NuxtLink>
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
        <div class="nivel-header py-nivel-header">
          <div class="d-flex flex-column flex-md-row align-start align-md-center justify-space-between ga-4">
            <div class="nivel-header-left">
              <div class="nivel-badge-wrapper">
                <span :class="['nivel-badge', nivelIdx === 0 ? 'badge-basico-py' : 'badge-intermedio-py']">
                  <img
                    :src="nivelIdx === 0 ? '/images/python/icon-cap.png' : '/images/python/icon-rocket.png'"
                    class="nivel-badge-icon"
                    alt=""
                  />
                  Nivel {{ nivel.nombre }}
                </span>
                <span class="nivel-duration-py">
                  <v-icon icon="mdi-calendar-range" size="15" color="#38BDF8" />
                  {{ nivel.duracionEstimadaSemanas }} semanas recomendadas
                </span>
              </div>
              <p class="nivel-desc">{{ nivel.descripcion }}</p>

              <!-- Nivel objectives -->
              <div class="nivel-objectives">
                <span class="obj-label">Objetivos principales del nivel:</span>
                <div class="obj-tags">
                  <span v-for="(obj, i) in nivel.objetivosGenerales" :key="i" class="obj-tag-py">
                    <v-icon icon="mdi-check" size="13" color="#38BDF8" />
                    {{ obj }}
                  </span>
                </div>
              </div>

              <!-- Prerequisites -->
              <div v-if="nivel.prerrequisitos.length" class="nivel-prereqs mt-3">
                <v-icon icon="mdi-information-outline" size="16" color="#94A3B8" />
                <span>Prerrequisitos: {{ nivel.prerrequisitos.join(' • ') }}</span>
              </div>
            </div>

            <!-- Mascot illustration badge per nivel -->
            <div class="nivel-header-mascot d-none d-md-flex align-center justify-center">
              <div class="nivel-mascot-card">
                <img
                  :src="nivelIdx === 0 ? '/images/python/mirio-thumbs-up.png' : '/images/python/mirio-superhero.png'"
                  :alt="`Mirio Nivel ${nivel.nombre}`"
                  class="nivel-mascot-figure"
                />
                <span class="nivel-mascot-label">{{ nivelIdx === 0 ? '¡Fundamentos!' : '¡Superpoderes!' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Módulos -->
        <div class="modulos-container">
          <div
            v-for="modulo in nivel.modulos"
            :key="modulo.id"
            :class="['modulo-card', 'py-modulo-card', { 'is-expanded': expandedModulos.has(modulo.id) }]"
          >
            <!-- Module Header (clickable to expand) -->
            <button
              class="modulo-header py-modulo-header"
              @click="toggleModulo(modulo.id)"
            >
              <div class="modulo-header-left">
                <span class="modulo-id-badge py-id-badge">
                  <img src="/images/python/python-snakes-icon.png" class="module-snakes-logo" alt="" />
                  {{ modulo.id }}
                </span>
                <div>
                  <h3 class="modulo-title">{{ modulo.titulo }}</h3>
                  <p class="modulo-desc">{{ modulo.descripcion }}</p>
                </div>
              </div>
              <div class="modulo-header-right">
                <span class="modulo-meta-pill py-meta-pill">
                  <v-icon icon="mdi-clock-outline" size="14" color="#38BDF8" />
                  {{ modulo.semanasEstimadas }} sem.
                </span>
                <span class="modulo-meta-pill py-meta-pill">
                  <v-icon icon="mdi-book-open-page-variant" size="14" color="#FFD43B" />
                  {{ modulo.lecciones.length }} lecciones
                </span>
                <v-icon
                  :icon="expandedModulos.has(modulo.id) ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  size="24"
                  class="expand-icon py-expand-icon"
                />
              </div>
            </button>

            <!-- Module Expanded Content -->
            <Transition name="slide-expand">
              <div v-if="expandedModulos.has(modulo.id)" class="modulo-body py-modulo-body">
                <!-- Lecciones -->
                <div
                  v-for="leccion in modulo.lecciones"
                  :key="leccion.id"
                  class="leccion-card py-leccion-card"
                >
                  <div class="leccion-header">
                    <div class="leccion-header-left">
                      <span class="leccion-id py-leccion-id">{{ leccion.id }}</span>
                      <div>
                        <h4 class="leccion-title">{{ leccion.titulo }}</h4>
                        <div class="leccion-meta">
                          <span>
                            <v-icon icon="mdi-clock-outline" size="13" color="#38BDF8" />
                            {{ leccion.duracionMinutos }} min estimados
                          </span>
                          <span class="leccion-status-pill">
                            <v-icon icon="mdi-check-circle" size="13" color="#38BDF8" />
                            Disponible
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Lesson Completed Pill from Reference Image -->
                    <div class="mini-completed-pill d-none d-sm-flex align-center ga-2">
                      <v-icon icon="mdi-check-circle" size="16" color="#38BDF8" />
                      <span>Lección lista</span>
                    </div>
                  </div>

                  <!-- Objectives -->
                  <div class="leccion-section">
                    <h5 class="leccion-section-title py-section-title">
                      <v-icon icon="mdi-target" size="16" color="#38BDF8" />
                      Objetivos de aprendizaje
                    </h5>
                    <ul class="leccion-obj-list">
                      <li v-for="(obj, i) in leccion.objetivos" :key="i">{{ obj }}</li>
                    </ul>
                  </div>

                  <!-- Temas -->
                  <div class="leccion-section">
                    <h5 class="leccion-section-title py-section-title">
                      <v-icon icon="mdi-format-list-bulleted" size="16" color="#FFD43B" />
                      Temas cubiertos
                    </h5>
                    <div class="temas-tags">
                      <span v-for="(tema, i) in leccion.temas" :key="i" class="tema-tag py-tema-tag">
                        {{ tema }}
                      </span>
                    </div>
                  </div>

                  <!-- Conceptos Clave -->
                  <div class="leccion-section">
                    <h5 class="leccion-section-title py-section-title">
                      <v-icon icon="mdi-key-variant" size="16" color="#00D2FF" />
                      Conceptos clave
                    </h5>
                    <div class="conceptos-row">
                      <span v-for="(concepto, i) in leccion.conceptosClave" :key="i" class="concepto-chip py-concepto-chip">
                        {{ concepto }}
                      </span>
                    </div>
                  </div>

                  <!-- Code Example — Interactive Editor Styled like Reference Image Terminal -->
                  <div class="leccion-section">
                    <div class="d-flex align-center justify-space-between mb-2">
                      <h5 class="leccion-section-title py-section-title mb-0">
                        <img src="/images/python/icon-code-brackets.png" class="section-icon-img" alt="" />
                        Ejemplo de código en vivo — Pruébalo aquí
                      </h5>
                      <span class="py-terminal-tag">
                        <img src="/images/python/python-snakes-icon.png" class="tag-snakes" alt="" />
                        Python 3
                      </span>
                    </div>

                    <div class="py-editor-wrapper">
                      <ClientOnly>
                        <CourseInlineEditor
                          :initialCode="leccion.ejemploCodigo"
                          language="python"
                          :height="Math.max(140, leccion.ejemploCodigo.split('\n').length * 22)"
                        />
                        <template #fallback>
                          <div class="code-block-wrapper py-code-block-wrapper">
                            <pre class="code-block"><code>{{ leccion.ejemploCodigo }}</code></pre>
                          </div>
                        </template>
                      </ClientOnly>
                    </div>
                  </div>

                  <!-- Exercises with inline editor -->
                  <div v-if="leccion.ejercicios.length" class="leccion-section">
                    <h5 class="leccion-section-title py-section-title">
                      <img src="/images/python/icon-bulb.png" class="section-icon-img" alt="" />
                      Desafíos Prácticos de Python
                    </h5>
                    <div class="ejercicios-grid">
                      <div
                        v-for="(ej, i) in leccion.ejercicios"
                        :key="i"
                        class="ejercicio-card py-ejercicio-card"
                      >
                        <div class="ejercicio-header">
                          <span class="ejercicio-title">{{ ej.titulo }}</span>
                          <span :class="['dificultad-badge', `dif-${ej.dificultad}`]">
                            {{ ej.dificultad }}
                          </span>
                        </div>
                        <p class="ejercicio-enunciado">{{ ej.enunciado }}</p>
                        <div v-if="ej.entradaEjemplo || ej.salidaEsperada" class="ejercicio-io py-io-box">
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
                          <h6 class="ejercicio-editor-label py-editor-label">
                            <v-icon icon="mdi-pencil-box-outline" size="15" color="#FFD43B" />
                            Tu solución con Mirio:
                          </h6>
                          <div class="py-editor-wrapper">
                            <ClientOnly>
                              <CourseInlineEditor
                                :initialCode="`# Ejercicio: ${ej.titulo}\n# ${ej.enunciado}\n\n# Escribe tu solución aquí:\n\n`"
                                language="python"
                                :height="140"
                              />
                            </ClientOnly>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Resources -->
                  <div v-if="leccion.recursos?.length" class="leccion-section">
                    <h5 class="leccion-section-title py-section-title">
                      <v-icon icon="mdi-link-variant" size="16" color="#38BDF8" />
                      Recursos de apoyo recomendados
                    </h5>
                    <div class="recursos-list">
                      <div v-for="(rec, i) in leccion.recursos" :key="i" class="recurso-item py-recurso-item">
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
                <div class="evaluacion-card py-evaluacion-card">
                  <div class="evaluacion-header">
                    <div class="eval-icon-box">
                      <img src="/images/python/icon-cap.png" class="eval-icon-img" alt="" />
                    </div>
                    <div class="flex-grow-1">
                      <h5 class="evaluacion-title">Evaluación del Módulo: {{ modulo.evaluacion.tipo }}</h5>
                      <p class="evaluacion-desc">{{ modulo.evaluacion.descripcion }}</p>
                    </div>
                    <span class="evaluacion-pct py-eval-pct">{{ modulo.evaluacion.porcentaje }}%</span>
                  </div>
                  <div class="evaluacion-criterios">
                    <span class="criterios-label">Criterios de evaluación calificados por Mirio:</span>
                    <ul>
                      <li v-for="(crit, i) in modulo.evaluacion.criterios" :key="i">
                        <v-icon icon="mdi-check-decagram" size="14" color="#38BDF8" />
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
    <!-- FOOTER CTA WITH CELEBRATING MIRIO TROPHY                -->
    <!-- ======================================================= -->
    <section class="curso-footer-cta py-4 px-3 px-sm-6 px-lg-8 mb-6">
      <div class="footer-cta-card py-footer-card">
        <div class="footer-mascot-stage">
          <img src="/images/python/mirio-trophy.png" alt="Mirio celebrando con trofeo" class="footer-trophy-img" />
          <div class="footer-badge-wrap">
            <span class="footer-star-pill">
              <img src="/images/python/icon-star.png" class="star-icon-img" alt="" />
              ¡Certificación Oficial!
            </span>
          </div>
        </div>

        <h3 class="footer-cta-title">¿Listo para programar tu futuro en Python?</h3>
        <p class="footer-cta-desc">
          Únete a Mirio 2 en esta aventura de aprendizaje. Aprende desde cero, resuelve ejercicios prácticos y construye proyectos de portafolio reales.
        </p>

        <div class="d-flex flex-wrap align-center justify-center ga-3 mt-4">
          <v-btn
            size="large"
            rounded="lg"
            class="cta-btn-gradient"
            prepend-icon="mdi-play-circle"
            @click="scrollToTop"
          >
            Ir al inicio del curso
          </v-btn>
          <NuxtLink to="/practicar" class="text-decoration-none">
            <v-btn
              variant="outlined"
              size="large"
              rounded="lg"
              class="cta-btn-gold"
              prepend-icon="mdi-code-braces"
            >
              Probar Editor Libre
            </v-btn>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ======================================================= -->
    <!-- FLOATING MIRIO ASSISTANT BUDDY                          -->
    <!-- ======================================================= -->
    <div :class="['floating-mirio-buddy', { 'is-minimized': isBuddyMinimized }]">
      <!-- Balloon tip -->
      <Transition name="fade-bubble">
        <div v-if="!isBuddyMinimized && showBuddyBubble" class="buddy-bubble">
          <div class="d-flex align-center justify-space-between ga-2 mb-1">
            <span class="buddy-title">Mirio 2 Asistente</span>
            <button class="buddy-close-bubble" @click="showBuddyBubble = false">✕</button>
          </div>
          <p class="buddy-text">{{ currentSpeech }}</p>
          <div class="buddy-actions">
            <button class="buddy-act-btn" @click="cycleMirioTip">Otro consejo</button>
            <NuxtLink to="/practicar" class="buddy-act-link">Ir a Practicar</NuxtLink>
          </div>
        </div>
      </Transition>

      <!-- Mascot Button -->
      <button class="buddy-trigger-btn" @click="toggleBuddy" :title="isBuddyMinimized ? 'Abrir Mirio 2' : 'Minimizar Mirio 2'">
        <img
          :src="`/images/python/${activeEmotion.avatar}`"
          alt="Mirio 2"
          class="buddy-mascot-avatar"
        />
        <span class="buddy-pulse-ring" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cursoPythonPrincipiantes } from '~/data/cursos/curso_python'

// SEO
useHead({
  title: 'Curso de Python — Mirio 2 · Aprende · Programa · Crea Con IA',
  meta: [
    {
      name: 'description',
      content: 'Curso completo de Python con Mirio 2: aprende programación desde cero con lecciones interactivas, tutor inteligente, ejercicios prácticos y proyectos reales.'
    },
    {
      name: 'theme-color',
      content: '#071333'
    }
  ],
})

const curso = cursoPythonPrincipiantes

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
const expandedModulos = ref<Set<string>>(new Set(['M1'])) // Expand Module 1 by default

const toggleModulo = (id: string) => {
  if (expandedModulos.value.has(id)) {
    expandedModulos.value.delete(id)
  } else {
    expandedModulos.value.add(id)
  }
  expandedModulos.value = new Set(expandedModulos.value)
}

// -------------------------------------------------------------
// MASCOT POSES & EMOTIONS (FROM REFERENCE IMAGE)
// -------------------------------------------------------------
const activeMascotPose = ref<string>('mirio-coding.png')

const mascotPoses = [
  { label: 'Programando', file: 'mirio-coding.png', icon: 'mdi-laptop' },
  { label: 'Despegue', file: 'mirio-rocket.png', icon: 'mdi-rocket-launch' },
  { label: 'Bienvenida', file: 'mirio-thumbs-up.png', icon: 'mdi-thumb-up' },
  { label: 'Gran Idea', file: 'mirio-idea.png', icon: 'mdi-lightbulb' },
  { label: 'Zen & Calma', file: 'mirio-zen.png', icon: 'mdi-meditation' },
  { label: 'Celebración', file: 'mirio-trophy.png', icon: 'mdi-trophy' },
  { label: 'Superhéroe', file: 'mirio-superhero.png', icon: 'mdi-shield-star' },
]

interface EmotionItem {
  id: string
  label: string
  tag: string
  avatar: string
  associatedPose: string
  quote: string
}

const emotionsList: EmotionItem[] = [
  {
    id: 'happy',
    label: 'Motivado',
    tag: '¡Tú puedes!',
    avatar: 'mirio-face-happy.png',
    associatedPose: 'mirio-coding.png',
    quote: '¡Tú puedes! Sigue aprendiendo, yo te acompaño en cada línea de código. 💛',
  },
  {
    id: 'cool',
    label: 'Modo Pro',
    tag: 'Clean Code',
    avatar: 'mirio-face-cool.png',
    associatedPose: 'mirio-thumbs-up.png',
    quote: 'Python es elegante, legible y poderoso. Programa con estilo. 😎',
  },
  {
    id: 'stars',
    label: 'Inspirado',
    tag: 'Grandes Metas',
    avatar: 'mirio-face-stars.png',
    associatedPose: 'mirio-idea.png',
    quote: '¡Cada error en Python es una oportunidad para aprender algo nuevo! ✨',
  },
  {
    id: 'joy',
    label: 'Feliz',
    tag: '¡Eureka!',
    avatar: 'mirio-face-joy.png',
    associatedPose: 'mirio-trophy.png',
    quote: '¡Excelente avance! Resolver ejercicios te convertirá en un gran desarrollador. 🎉',
  },
  {
    id: 'peaceful',
    label: 'Zen',
    tag: 'Enfoque Total',
    avatar: 'mirio-face-peaceful.png',
    associatedPose: 'mirio-zen.png',
    quote: 'Respira hondo: la lógica de programación se construye paso a paso con paciencia. 🧘',
  },
  {
    id: 'wink',
    label: 'Cómplice',
    tag: 'Tip Pro',
    avatar: 'mirio-face-wink.png',
    associatedPose: 'mirio-reading.png',
    quote: 'Recuerda: la indentación en Python no es solo estilo, ¡es la clave de la sintaxis! 😉',
  },
  {
    id: 'hearts',
    label: 'Amor al código',
    tag: 'Pasión Python',
    avatar: 'mirio-face-hearts.png',
    associatedPose: 'mirio-greeting.png',
    quote: '¡Me encanta programar contigo! Python es el inicio de grandes ideas. 💛',
  },
  {
    id: 'determined',
    label: 'Decidido',
    tag: 'Reto Aceptado',
    avatar: 'mirio-face-determined.png',
    associatedPose: 'mirio-rocket.png',
    quote: '¡Ningún algoritmo nos detendrá! Vamos a resolver ese problema juntos. 🚀',
  },
  {
    id: 'surprised',
    label: 'Asombro',
    tag: 'Magia de la IA',
    avatar: 'mirio-face-surprised.png',
    associatedPose: 'mirio-idea.png',
    quote: '¡Mira todo lo que puedes construir con unas cuantas líneas en Python! 💡',
  },
]

const activeEmotion = ref<EmotionItem>(emotionsList[0])
const currentSpeech = ref<string>(emotionsList[0].quote)

const setEmotion = (em: EmotionItem) => {
  activeEmotion.value = em
  currentSpeech.value = em.quote
  activeMascotPose.value = em.associatedPose
}

const mirioTips = [
  'Python usa sangría (indentación) en lugar de llaves {} para definir bloques. ¡Mantenlo limpio!',
  'Utiliza variables con nombres descriptivos como `total_estudiantes` en lugar de una simple `x`.',
  'Las listas en Python son dinámicas: puedes almacenar números, textos o incluso otras listas.',
  'Usa `print()` y `type()` cuando tengas dudas sobre qué valor o tipo tiene una variable.',
  'Los bucles `for elemento in lista:` son la forma más pitónica de recorrer datos.',
  '¡Python es el lenguaje número uno en Inteligencia Artificial y Ciencia de Datos!',
]

let tipIndex = 0
const cycleMirioTip = () => {
  tipIndex = (tipIndex + 1) % mirioTips.length
  currentSpeech.value = mirioTips[tipIndex]
  activeEmotion.value = emotionsList[tipIndex % emotionsList.length]
}

// Mini terminal preview runner
const terminalRan = ref(false)
const runTerminalDemo = () => {
  terminalRan.value = true
  currentSpeech.value = '¡Excelente! print() imprime mensajes en consola: Aprende, Practica y Crea. 🚀'
  setTimeout(() => {
    terminalRan.value = false
  }, 3500)
}

// Floating buddy
const isBuddyMinimized = ref(false)
const showBuddyBubble = ref(true)

const toggleBuddy = () => {
  if (isBuddyMinimized.value) {
    isBuddyMinimized.value = false
    showBuddyBubble.value = true
  } else {
    showBuddyBubble.value = !showBuddyBubble.value
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
    video: '#38BDF8',
    lectura: '#FFD43B',
    herramienta: '#00D2FF',
    documentacion: '#93C5FD',
  }
  return colors[tipo] || '#94A3B8'
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
/* PYTHON THEME — PALETTE FROM REFERENCE IMAGE                      */
/* Primary: Electric Cyan (#00D2FF, #38BDF8)                        */
/* Accent: Python Yellow (#FFD43B, #FACC15, #F59E0B)                */
/* Deep Navy: #050B1A, #081432, #0B1E4A, #0F275E                    */
/* ================================================================ */

.curso-python-theme {
  position: relative;
  background-color: #050B1A;
  color: #E2E8F0;
  min-height: 100vh;
  padding-bottom: 3rem;
  overflow-x: hidden;
}

/* Ambient glow orbs matching space blue and cyan from image */
.ambient-glow {
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  filter: blur(120px);
  z-index: 0;
}

.glow-top-left {
  top: 0;
  left: -100px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%);
}

.glow-top-right {
  top: 100px;
  right: -80px;
  width: 550px;
  height: 550px;
  background: radial-gradient(circle, rgba(255, 212, 59, 0.12) 0%, rgba(37, 99, 235, 0.15) 60%, transparent 75%);
}

.glow-center {
  top: 900px;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(14, 40, 94, 0.35) 0%, transparent 70%);
}

.curso-hero-wrapper,
.curso-overview-wrapper,
.curso-mirio-banner,
.curso-content-wrapper,
.curso-footer-cta {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
}

/* ================================================================ */
/* HERO CARD — DEEP NAVY BLUE WITH CYAN & GOLD HIGHLIGHTS           */
/* ================================================================ */
.curso-hero-card {
  background: linear-gradient(160deg, #09173B 0%, #061026 50%, #030817 100%);
  border: 1.5px solid rgba(56, 189, 248, 0.28);
  border-radius: 32px;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 25px 60px rgba(2, 6, 23, 0.85),
    inset 0 1px 2px rgba(56, 189, 248, 0.3),
    0 0 35px rgba(56, 189, 248, 0.1);
}

/* Breadcrumb */
.breadcrumb-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
}

.breadcrumb-link {
  color: #94A3B8;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: #38BDF8;
}

.breadcrumb-sep {
  color: #475569;
}

.breadcrumb-current {
  color: #F8FAFC;
  font-weight: 700;
}

/* Mirio 2 Brand Hero Tag */
.brand-hero-tag {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.brand-badge-img {
  height: 48px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.5));
}

.python-edition-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255, 212, 59, 0.12);
  border: 1px solid rgba(255, 212, 59, 0.35);
  color: #FFD43B;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
}

.mini-py-icon {
  width: 16px;
  height: 16px;
}

/* Course Badges Row */
.curso-badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.curso-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.32rem 0.75rem;
  border-radius: 20px;
}

.badge-py {
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.35);
  color: #38BDF8;
}

.badge-py-icon {
  width: 15px;
  height: 15px;
}

.badge-duration {
  background: rgba(30, 58, 138, 0.4);
  border: 1px solid rgba(56, 189, 248, 0.25);
  color: #BAE6FD;
}

.badge-level {
  background: rgba(255, 212, 59, 0.12);
  border: 1px solid rgba(255, 212, 59, 0.3);
  color: #FFD43B;
}

.badge-cap-icon {
  width: 16px;
  height: 16px;
}

.badge-ia {
  background: rgba(0, 210, 255, 0.12);
  border: 1px solid rgba(0, 210, 255, 0.3);
  color: #E0F2FE;
}

/* Title & Audience */
.curso-title {
  font-size: clamp(2rem, 3.8vw, 3rem);
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1.15;
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
}

.gradient-text-py {
  background: linear-gradient(135deg, #00D2FF 0%, #38BDF8 50%, #FFD43B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.curso-audience {
  color: #94A3B8;
  font-size: 1rem;
  line-height: 1.5;
  max-width: 650px;
}

/* Mirio Speech Bubble Card (from Reference Image) */
.mirio-hero-bubble-card {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
  background: rgba(11, 26, 62, 0.75);
  border: 1.5px solid rgba(56, 189, 248, 0.35);
  border-radius: 20px;
  padding: 0.9rem 1.1rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 25px rgba(3, 8, 24, 0.5), 0 0 15px rgba(56, 189, 248, 0.15);
  max-width: 620px;
}

.bubble-avatar-box {
  position: relative;
  flex-shrink: 0;
}

.bubble-avatar-img {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  object-fit: contain;
  background: #0B193D;
  border: 1.5px solid #38BDF8;
  padding: 2px;
}

.bubble-online-dot {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #FFD43B;
  border: 2px solid #071333;
}

.bubble-content {
  flex: 1;
  min-width: 0;
}

.bubble-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.bubble-name {
  font-size: 0.78rem;
  font-weight: 700;
  color: #38BDF8;
}

.bubble-status-tag {
  font-size: 0.68rem;
  font-weight: 800;
  background: rgba(255, 212, 59, 0.18);
  border: 1px solid rgba(255, 212, 59, 0.4);
  color: #FFD43B;
  padding: 1px 7px;
  border-radius: 8px;
}

.bubble-quote-text {
  font-size: 0.88rem;
  color: #F1F5F9;
  font-weight: 600;
  line-height: 1.4;
  margin: 0;
}

/* Emotions Interactive Bar */
.emotions-interactive-bar {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.emotions-title {
  font-size: 0.78rem;
  font-weight: 700;
  color: #94A3B8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.emotions-chips-scroll {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  overflow-x: auto;
  padding-bottom: 4px;
}

.emotions-chips-scroll::-webkit-scrollbar {
  height: 4px;
}

.emotions-chips-scroll::-webkit-scrollbar-thumb {
  background: #1E3A8A;
  border-radius: 4px;
}

.emotion-chip-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(11, 26, 62, 0.6);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 18px;
  padding: 0.25rem 0.6rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.emotion-chip-btn:hover {
  background: rgba(30, 58, 138, 0.4);
  border-color: #38BDF8;
  transform: translateY(-2px);
}

.emotion-chip-btn.is-active {
  background: rgba(56, 189, 248, 0.2);
  border-color: #38BDF8;
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
}

.emotion-chip-img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.emotion-chip-name {
  font-size: 0.74rem;
  font-weight: 700;
  color: #E2E8F0;
}

/* Meta Chips */
.curso-meta-chips {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.meta-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.85rem;
  color: #CBD5E1;
}

/* Hero CTA Buttons */
.hero-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  align-items: center;
}

.cta-btn-gradient {
  background: linear-gradient(135deg, #00D2FF 0%, #2563EB 100%) !important;
  color: #FFFFFF !important;
  font-weight: 800 !important;
  box-shadow: 0 0 25px rgba(0, 210, 255, 0.45) !important;
  transition: all 0.25s ease;
}

.cta-btn-gradient:hover {
  box-shadow: 0 0 35px rgba(0, 210, 255, 0.7) !important;
  transform: translateY(-2px);
}

.cta-btn-gold {
  color: #FFD43B !important;
  border-color: rgba(255, 212, 59, 0.5) !important;
  font-weight: 800 !important;
  background: rgba(255, 212, 59, 0.06) !important;
}

.cta-btn-gold:hover {
  background: rgba(255, 212, 59, 0.16) !important;
  box-shadow: 0 0 20px rgba(255, 212, 59, 0.35) !important;
}

.cta-btn-speech {
  color: #BAE6FD !important;
  font-weight: 700 !important;
}

/* ================================================================ */
/* RIGHT COLUMN: MIRIO STAGE & FLOATING REFERENCE IMAGE WIDGETS     */
/* ================================================================ */
.mirio-stage-container {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 440px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Halo ring */
.mirio-halo-ring {
  position: absolute;
  width: 330px;
  height: 330px;
  border-radius: 50%;
  border: 2px dashed rgba(56, 189, 248, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: rotateHalo 30s linear infinite;
}

.halo-glow-core {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(255, 212, 59, 0.08) 50%, transparent 75%);
  filter: blur(20px);
}

.halo-orbit-particle {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #FFD43B;
  box-shadow: 0 0 10px #FFD43B;
}

.halo-orbit-particle.p1 { top: 0; left: 50%; }
.halo-orbit-particle.p2 { bottom: 20px; left: 20px; background: #00D2FF; box-shadow: 0 0 10px #00D2FF; }
.halo-orbit-particle.p3 { top: 60px; right: 10px; }

@keyframes rotateHalo {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Mascot Center Figure */
.mirio-mascot-wrapper {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: mirioFloat 4s ease-in-out infinite alternate;
}

.mirio-mascot-img {
  width: 230px;
  height: auto;
  max-height: 270px;
  object-fit: contain;
  filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 20px rgba(56, 189, 248, 0.35));
}

.mirio-ground-shadow {
  width: 140px;
  height: 16px;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.6) 0%, transparent 70%);
  border-radius: 50%;
  margin-top: -6px;
}

@keyframes mirioFloat {
  0% { transform: translateY(0); }
  100% { transform: translateY(-12px); }
}

/* Pose Quick Switcher Dock */
.pose-switcher-dock {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.35rem;
  background: rgba(11, 26, 62, 0.85);
  border: 1px solid rgba(56, 189, 248, 0.3);
  padding: 4px;
  border-radius: 24px;
  z-index: 6;
  backdrop-filter: blur(8px);
}

.pose-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: #94A3B8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.pose-btn:hover {
  background: rgba(56, 189, 248, 0.2);
  color: #38BDF8;
}

.pose-btn.is-active {
  background: #38BDF8;
  color: #03122A;
  box-shadow: 0 0 10px #38BDF8;
}

/* Floating UI Widgets from Reference Image */
.ui-card-floating {
  position: absolute;
  background: rgba(11, 26, 62, 0.88);
  border: 1.5px solid rgba(56, 189, 248, 0.35);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 25px rgba(2, 6, 23, 0.65), 0 0 18px rgba(56, 189, 248, 0.15);
  z-index: 4;
}

/* 1. Progress card: top-left */
.card-progress-pill {
  top: 10px;
  left: -20px;
  padding: 0.5rem 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-width: 190px;
  animation: floatCard1 6s ease-in-out infinite alternate;
}

.floating-py-icon {
  width: 26px;
  height: 26px;
}

.progress-pill-info {
  flex: 1;
}

.progress-pill-title {
  font-size: 0.78rem;
  font-weight: 800;
  color: #FFFFFF;
}

.progress-pill-pct {
  font-size: 0.78rem;
  font-weight: 800;
  color: #FFD43B;
}

.progress-pill-sub {
  font-size: 0.68rem;
  color: #94A3B8;
  display: block;
  margin-bottom: 3px;
}

.progress-pill-bar {
  width: 100%;
  height: 5px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.progress-pill-fill {
  height: 100%;
  background: linear-gradient(90deg, #38BDF8 0%, #FFD43B 100%);
  border-radius: 4px;
}

/* 2. Completed card: top-right */
.card-completed-pill {
  top: 25px;
  right: -25px;
  padding: 0.5rem 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: floatCard2 5s ease-in-out infinite alternate;
}

.completed-check-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #38BDF8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.completed-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.completed-title {
  font-size: 0.74rem;
  font-weight: 700;
  color: #FFFFFF;
}

.completed-bar {
  width: 65px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.completed-fill {
  width: 100%;
  height: 100%;
  background: #38BDF8;
}

.completed-badge-100 {
  font-size: 0.72rem;
  font-weight: 800;
  color: #38BDF8;
}

/* 3. Terminal code preview: bottom-left */
.card-terminal-preview {
  bottom: 50px;
  left: -25px;
  padding: 0.5rem 0.75rem;
  background: #060F26;
  border-color: rgba(56, 189, 248, 0.4);
  animation: floatCard3 7s ease-in-out infinite alternate;
}

.terminal-dots {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
}

.tdot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.tdot-red { background: #EF4444; }
.tdot-yellow { background: #F59E0B; }
.tdot-green { background: #10B981; }

.terminal-title {
  font-size: 0.65rem;
  color: #64748B;
  font-family: monospace;
  margin-left: 4px;
}

.terminal-code {
  margin: 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  line-height: 1.35;
}

.t-fn { color: #38BDF8; font-weight: bold; }
.t-str { color: #FFD43B; }

.terminal-mini-run {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  background: rgba(56, 189, 248, 0.2);
  border: 1px solid rgba(56, 189, 248, 0.4);
  color: #38BDF8;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 5px;
  transition: all 0.2s;
}

.terminal-mini-run:hover {
  background: #38BDF8;
  color: #060F26;
}

/* 4. Quote card: bottom-right */
.card-quote-pill {
  bottom: 40px;
  right: -20px;
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: floatCard4 6.5s ease-in-out infinite alternate;
}

.quote-bulb {
  font-size: 1.2rem;
}

.quote-text {
  font-size: 0.72rem;
  color: #E2E8F0;
  line-height: 1.3;
}

@keyframes floatCard1 { 0% { transform: translateY(0); } 100% { transform: translateY(-7px); } }
@keyframes floatCard2 { 0% { transform: translateY(0); } 100% { transform: translateY(8px); } }
@keyframes floatCard3 { 0% { transform: translateY(0); } 100% { transform: translateY(-6px); } }
@keyframes floatCard4 { 0% { transform: translateY(0); } 100% { transform: translateY(7px); } }

/* Hero stats row under mascot */
.hero-stats-row-py {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  max-width: 440px;
}

.stat-pill-py {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(11, 26, 62, 0.7);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 12px;
  padding: 0.35rem 0.75rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: #CBD5E1;
}

.stat-icon-img {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

/* ================================================================ */
/* OVERVIEW CARDS (Competencies, Tools, Methodology)                */
/* ================================================================ */
.overview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
}

@media (max-width: 960px) {
  .overview-grid {
    grid-template-columns: 1fr;
  }
}

.py-overview-card {
  background: linear-gradient(165deg, #09183E 0%, #050E24 100%);
  border: 1.5px solid rgba(56, 189, 248, 0.2);
  border-radius: 24px;
  padding: 1.6rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.py-overview-card:hover {
  border-color: rgba(56, 189, 248, 0.45);
  transform: translateY(-3px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(56, 189, 248, 0.15);
}

.overview-card-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.2rem;
}

.header-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-title-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.overview-card-header h3 {
  color: #FFFFFF;
  font-size: 1.1rem;
  font-weight: 800;
  margin: 0;
}

.card-subtitle-py {
  font-size: 0.76rem;
  color: #94A3B8;
}

.overview-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.overview-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  font-size: 0.88rem;
  color: #CBD5E1;
  line-height: 1.45;
}

.list-check {
  flex-shrink: 0;
  margin-top: 2px;
}

.tool-tags-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 0.5rem;
}

.tool-tag-py {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(14, 34, 82, 0.6);
  border: 1px solid rgba(56, 189, 248, 0.22);
  color: #38BDF8;
  font-size: 0.82rem;
  font-weight: 700;
  padding: 0.45rem 0.75rem;
  border-radius: 12px;
}

.tool-py-snakes {
  width: 16px;
  height: 16px;
}

.tool-footer-hint {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  color: #94A3B8;
}

.hint-icon {
  width: 16px;
  height: 16px;
}

/* ================================================================ */
/* STUDY BANNER                                                     */
/* ================================================================ */
.mirio-study-banner {
  background: linear-gradient(135deg, rgba(16, 40, 100, 0.8) 0%, rgba(9, 22, 56, 0.9) 100%);
  border: 1.5px solid rgba(56, 189, 248, 0.35);
  border-radius: 24px;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  box-shadow: 0 15px 35px rgba(2, 6, 23, 0.6);
}

@media (max-width: 768px) {
  .mirio-study-banner {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.2rem;
  }
}

.banner-left {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.banner-mascot-img {
  width: 80px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.4));
}

.banner-pill {
  background: rgba(56, 189, 248, 0.2);
  color: #38BDF8;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 8px;
  text-transform: uppercase;
}

.banner-pill-sub {
  color: #FFD43B;
  font-size: 0.75rem;
  font-weight: 700;
}

.banner-title {
  color: #FFFFFF;
  font-size: 1.15rem;
  font-weight: 800;
  margin-bottom: 0.3rem;
}

.banner-desc {
  color: #94A3B8;
  font-size: 0.88rem;
  margin: 0;
  line-height: 1.4;
}

.banner-btn-py {
  font-weight: 800 !important;
  color: #03122A !important;
}

/* ================================================================ */
/* NIVEL SECTIONS                                                   */
/* ================================================================ */
.nivel-section {
  margin-bottom: 2rem;
}

.py-nivel-header {
  background: linear-gradient(165deg, #0A1C47 0%, #050F26 100%);
  border: 1.5px solid rgba(56, 189, 248, 0.25);
  border-radius: 24px;
  padding: 1.6rem;
  margin-bottom: 1.2rem;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.5);
}

.nivel-badge-wrapper {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.6rem;
  flex-wrap: wrap;
}

.nivel-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.92rem;
  font-weight: 800;
  padding: 0.45rem 1rem;
  border-radius: 14px;
}

.badge-basico-py {
  background: rgba(56, 189, 248, 0.16);
  border: 1px solid rgba(56, 189, 248, 0.4);
  color: #38BDF8;
}

.badge-intermedio-py {
  background: rgba(255, 212, 59, 0.16);
  border: 1px solid rgba(255, 212, 59, 0.4);
  color: #FFD43B;
}

.nivel-badge-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.nivel-duration-py {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: #BAE6FD;
  font-size: 0.84rem;
  font-weight: 600;
}

.nivel-desc {
  color: #CBD5E1;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 0.8rem;
}

.nivel-objectives {
  margin-top: 0.5rem;
}

.obj-label {
  font-size: 0.78rem;
  font-weight: 800;
  color: #94A3B8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.45rem;
  display: block;
}

.obj-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.obj-tag-py {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: rgba(14, 34, 82, 0.65);
  border: 1px solid rgba(56, 189, 248, 0.2);
  color: #E2E8F0;
  font-size: 0.8rem;
  padding: 0.32rem 0.7rem;
  border-radius: 10px;
}

.nivel-prereqs {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: #94A3B8;
}

.nivel-mascot-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(11, 26, 62, 0.6);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 20px;
  padding: 1rem;
}

.nivel-mascot-figure {
  width: 95px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.6));
}

.nivel-mascot-label {
  font-size: 0.72rem;
  font-weight: 800;
  color: #FFD43B;
  margin-top: 0.3rem;
}

/* ================================================================ */
/* MODULE CARDS                                                     */
/* ================================================================ */
.modulos-container {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.py-modulo-card {
  background: linear-gradient(165deg, #09173A 0%, #050D21 100%);
  border: 1.5px solid rgba(56, 189, 248, 0.18);
  border-radius: 22px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.py-modulo-card:hover {
  border-color: rgba(56, 189, 248, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(56, 189, 248, 0.1);
}

.py-modulo-card.is-expanded {
  border-color: rgba(56, 189, 248, 0.45);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(56, 189, 248, 0.15);
}

.py-modulo-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.6rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s;
}

.py-modulo-header:hover {
  background: rgba(56, 189, 248, 0.05);
}

.modulo-header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  min-width: 0;
}

.py-id-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(14, 34, 82, 0.85);
  border: 1.5px solid rgba(56, 189, 248, 0.35);
  color: #38BDF8;
  font-weight: 800;
  font-size: 0.82rem;
  flex-shrink: 0;
}

.module-snakes-logo {
  width: 18px;
  height: 18px;
  margin-bottom: 2px;
}

.modulo-title {
  color: #F8FAFC;
  font-size: 1.05rem;
  font-weight: 800;
  line-height: 1.3;
  margin: 0;
}

.modulo-desc {
  color: #94A3B8;
  font-size: 0.84rem;
  margin: 2px 0 0;
  line-height: 1.35;
}

.modulo-header-right {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
}

.py-meta-pill {
  display: none;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.78rem;
  color: #CBD5E1;
  background: rgba(14, 34, 82, 0.6);
  border: 1px solid rgba(56, 189, 248, 0.2);
  padding: 0.3rem 0.75rem;
  border-radius: 10px;
  white-space: nowrap;
}

@media (min-width: 768px) {
  .py-meta-pill {
    display: inline-flex;
  }
}

.py-expand-icon {
  color: #38BDF8;
  transition: transform 0.3s ease;
}

.py-modulo-card.is-expanded .py-expand-icon {
  color: #FFD43B;
}

/* Modulo body */
.py-modulo-body {
  padding: 0 1.6rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  border-top: 1px solid rgba(56, 189, 248, 0.15);
}

/* ================================================================ */
/* LESSON CARDS                                                     */
/* ================================================================ */
.py-leccion-card {
  background: rgba(7, 18, 44, 0.75);
  border: 1.5px solid rgba(56, 189, 248, 0.2);
  border-radius: 18px;
  padding: 1.4rem;
  margin-top: 0.8rem;
}

.leccion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.1rem;
}

.leccion-header-left {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.py-leccion-id {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.3);
  color: #38BDF8;
  font-weight: 800;
  font-size: 0.78rem;
  flex-shrink: 0;
}

.leccion-title {
  color: #FFFFFF;
  font-size: 1rem;
  font-weight: 800;
  margin: 0;
}

.leccion-meta {
  display: flex;
  gap: 0.8rem;
  margin-top: 0.2rem;
}

.leccion-meta span {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.78rem;
  color: #94A3B8;
}

.leccion-status-pill {
  color: #38BDF8 !important;
}

.mini-completed-pill {
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.3);
  color: #38BDF8;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.3rem 0.7rem;
  border-radius: 14px;
}

/* Lesson Sections */
.leccion-section {
  margin-top: 1.2rem;
}

.py-section-title {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.82rem;
  font-weight: 800;
  color: #CBD5E1;
  margin-bottom: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.section-icon-img {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.leccion-obj-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.leccion-obj-list li {
  position: relative;
  padding-left: 1.1rem;
  font-size: 0.88rem;
  color: #CBD5E1;
  line-height: 1.5;
  margin-bottom: 0.35rem;
}

.leccion-obj-list li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #38BDF8;
  font-weight: bold;
}

.py-tema-tag {
  background: rgba(30, 58, 138, 0.35);
  border: 1px solid rgba(56, 189, 248, 0.25);
  color: #BAE6FD;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.32rem 0.65rem;
  border-radius: 8px;
}

.py-concepto-chip {
  background: rgba(255, 212, 59, 0.1);
  border: 1px solid rgba(255, 212, 59, 0.3);
  color: #FFD43B;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.32rem 0.7rem;
  border-radius: 8px;
}

.py-terminal-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #94A3B8;
  background: rgba(14, 34, 82, 0.6);
  padding: 2px 8px;
  border-radius: 8px;
  border: 1px solid rgba(56, 189, 248, 0.2);
}

.tag-snakes {
  width: 14px;
  height: 14px;
}

.py-editor-wrapper {
  border-radius: 14px;
  overflow: hidden;
  border: 1.5px solid rgba(56, 189, 248, 0.3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.py-code-block-wrapper {
  background: #060E24;
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 14px;
  overflow: hidden;
}

/* Exercises */
.py-ejercicio-card {
  background: rgba(11, 26, 62, 0.6);
  border: 1.5px solid rgba(56, 189, 248, 0.25);
  border-radius: 16px;
  padding: 1.2rem;
  margin-bottom: 0.8rem;
}

.ejercicio-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.6rem;
}

.ejercicio-title {
  color: #FFFFFF;
  font-weight: 800;
  font-size: 0.95rem;
}

.dificultad-badge {
  font-size: 0.72rem;
  font-weight: 800;
  padding: 0.25rem 0.65rem;
  border-radius: 8px;
  text-transform: capitalize;
}

.dif-fácil {
  background: rgba(56, 189, 248, 0.15);
  color: #38BDF8;
  border: 1px solid rgba(56, 189, 248, 0.3);
}

.dif-media {
  background: rgba(255, 212, 59, 0.15);
  color: #FFD43B;
  border: 1px solid rgba(255, 212, 59, 0.3);
}

.dif-alta {
  background: rgba(249, 115, 22, 0.15);
  color: #FB923C;
  border: 1px solid rgba(249, 115, 22, 0.3);
}

.ejercicio-enunciado {
  color: #CBD5E1;
  font-size: 0.88rem;
  line-height: 1.5;
  margin-bottom: 0.8rem;
}

.py-io-box {
  background: rgba(6, 15, 38, 0.8);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 10px;
  padding: 0.6rem 0.9rem;
  margin-bottom: 0.8rem;
}

.io-block {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
}

.io-label {
  color: #94A3B8;
  font-weight: 700;
}

.io-block code {
  color: #FFD43B;
  background: none;
  font-family: monospace;
}

.py-editor-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  font-weight: 700;
  color: #E2E8F0;
  margin-bottom: 0.4rem;
}

/* Resources */
.recursos-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.py-recurso-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(14, 34, 82, 0.45);
  border: 1px solid rgba(56, 189, 248, 0.18);
  border-radius: 12px;
  padding: 0.7rem 1rem;
}

.recurso-titulo {
  color: #FFFFFF;
  font-size: 0.88rem;
  font-weight: 700;
  display: block;
}

.recurso-desc {
  color: #94A3B8;
  font-size: 0.78rem;
}

/* Module Evaluation */
.py-evaluacion-card {
  background: linear-gradient(160deg, #0C1E47 0%, #061026 100%);
  border: 1.5px solid rgba(56, 189, 248, 0.35);
  border-radius: 18px;
  padding: 1.4rem;
  margin-top: 1rem;
}

.evaluacion-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.eval-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.eval-icon-img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.evaluacion-title {
  color: #FFFFFF;
  font-size: 1rem;
  font-weight: 800;
  margin: 0;
}

.evaluacion-desc {
  color: #94A3B8;
  font-size: 0.84rem;
  margin: 2px 0 0;
}

.py-eval-pct {
  font-size: 1.15rem;
  font-weight: 900;
  color: #FFD43B;
  background: rgba(255, 212, 59, 0.12);
  border: 1px solid rgba(255, 212, 59, 0.35);
  padding: 0.35rem 0.85rem;
  border-radius: 12px;
}

.evaluacion-criterios {
  border-top: 1px solid rgba(56, 189, 248, 0.15);
  padding-top: 0.8rem;
}

.criterios-label {
  font-size: 0.78rem;
  font-weight: 800;
  color: #94A3B8;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  display: block;
}

.evaluacion-criterios ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.evaluacion-criterios li {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.85rem;
  color: #CBD5E1;
}

/* ================================================================ */
/* FOOTER CTA                                                       */
/* ================================================================ */
.py-footer-card {
  background: linear-gradient(165deg, #0A1B45 0%, #050E24 100%);
  border: 1.5px solid rgba(56, 189, 248, 0.35);
  border-radius: 32px;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(56, 189, 248, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-mascot-stage {
  position: relative;
  margin-bottom: 1.2rem;
}

.footer-trophy-img {
  width: 140px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 0 20px rgba(255, 212, 59, 0.5));
}

.footer-badge-wrap {
  margin-top: 0.5rem;
}

.footer-star-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(255, 212, 59, 0.15);
  border: 1px solid rgba(255, 212, 59, 0.4);
  color: #FFD43B;
  font-size: 0.8rem;
  font-weight: 800;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
}

.star-icon-img {
  width: 16px;
  height: 16px;
}

.footer-cta-title {
  color: #FFFFFF;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 800;
  margin-bottom: 0.6rem;
}

.footer-cta-desc {
  color: #94A3B8;
  font-size: 1rem;
  max-width: 600px;
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

/* ================================================================ */
/* FLOATING MIRIO ASSISTANT BUDDY                                   */
/* ================================================================ */
.floating-mirio-buddy {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
}

.buddy-bubble {
  background: rgba(10, 25, 60, 0.95);
  border: 1.5px solid rgba(56, 189, 248, 0.4);
  border-radius: 18px;
  padding: 0.85rem 1rem;
  max-width: 280px;
  box-shadow: 0 15px 35px rgba(2, 6, 23, 0.8), 0 0 20px rgba(56, 189, 248, 0.25);
  backdrop-filter: blur(12px);
}

.buddy-title {
  font-size: 0.76rem;
  font-weight: 800;
  color: #38BDF8;
}

.buddy-close-bubble {
  background: none;
  border: none;
  color: #64748B;
  font-size: 0.85rem;
  cursor: pointer;
}

.buddy-close-bubble:hover {
  color: #F1F5F9;
}

.buddy-text {
  font-size: 0.82rem;
  color: #F8FAFC;
  font-weight: 600;
  line-height: 1.35;
  margin: 0.3rem 0 0.6rem;
}

.buddy-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.buddy-act-btn {
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.35);
  color: #38BDF8;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.buddy-act-btn:hover {
  background: #38BDF8;
  color: #050B1A;
}

.buddy-act-link {
  color: #FFD43B;
  font-size: 0.72rem;
  font-weight: 700;
  text-decoration: none;
}

.buddy-act-link:hover {
  text-decoration: underline;
}

.buddy-trigger-btn {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #0B1D45;
  border: 2px solid #38BDF8;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.7), 0 0 20px rgba(56, 189, 248, 0.4);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.buddy-trigger-btn:hover {
  transform: scale(1.1);
}

.buddy-mascot-avatar {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.buddy-pulse-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid #38BDF8;
  opacity: 0.4;
  animation: buddyPulse 2.5s ease-out infinite;
}

@keyframes buddyPulse {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.35); opacity: 0; }
}

/* Transitions */
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

.fade-bubble-enter-active,
.fade-bubble-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}

.fade-bubble-enter-from,
.fade-bubble-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
